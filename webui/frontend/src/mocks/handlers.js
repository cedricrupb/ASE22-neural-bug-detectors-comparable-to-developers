import { rest } from 'msw';

const testCode = 'public void setBindingMatch(BindingMatch<?> bindingMatch) {\n    if (bindingMatch == null) return;\n    // Test\n    UriPattern pattern = bindingMatch.matched();\n    if (pattern == null) return;\n    Map<String, Object> combinedDimensions = new HashMap<>(requestDimensions);\n    combinedDimensions.put(Metrics.HANDLER_DIMENSION, bindingMatch.toString());\n    this.context = metric.createContext(combinedDimensions);\n}';

export const handlers = [
    rest.get('/sessionid', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.text('123abc')
        );
    }),

    rest.post('/survey', (req, res, ctx) => {
        return res(
            ctx.status(200)
        );
    }),

    rest.get('/score.json', (req, res, ctx) => {
        sessionStorage.setItem('tasksSubmitted', 0);
        return res(
            ctx.status(200),
            ctx.json({
                correctTasks: 8,
                correctLinenumbers: 3
            })
        );
    }),

    rest.get('/status.json', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                timeExpired: 5,
                tasksDone: Number(sessionStorage.getItem('tasksSubmitted')) ?? 0
            })
        );
    }),

    rest.get('/task.json', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                code: testCode
            })
        );
    }),

    rest.post('/result', (req, res, ctx) => {
        sessionStorage.setItem('tasksSubmitted', Number(sessionStorage.getItem('tasksSubmitted')) + 1 ?? 1);
        return res(
            ctx.status(200),
            ctx.text('Answer received!')
        );
    })

];