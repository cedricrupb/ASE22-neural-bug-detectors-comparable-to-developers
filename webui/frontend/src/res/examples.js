export const EXAMPLE_1 = {
    wrong: true,
    code: '    private List<T> toList(Enumeration<T> first, Enumeration<T> second)\n    {\n        List<T> list = emptyListField.copy();\n        while (first!=null && first.hasMoreElements())\n            list.add(second.nextElement());\n        while (second!=null && second.hasMoreElements())\n            list.add(second.nextElement());\n        return list;\n    }\n',
    correctCode: '    private List<URL> toList(Enumeration<URL> e, Enumeration<URL> e2)\n    {\n        List<URL> list = new ArrayList<URL>();\n        while (e!=null && e.hasMoreElements())\n            list.add(e.nextElement());\n        while (e2!=null && e2.hasMoreElements())\n            list.add(e.nextElement());\n            list.add(e2.nextElement());\n        return list;\n    }',
    wrongLine: 7,
    wrongLineContent: 'list.add(e.nextElement());',
    explanation: 'This code snippet contains a bug. Lines 6 and 7 are intended to perform the same iteration as lines 4 and 5, but now on <span class="monospace">e2</span> instead of <span class="monospace">e</span>. While the condition in the loop has been changed from <span class="monospace">e</span> to <span class="monospace">e2</span>, the argument to add has not.'
};

export const EXAMPLE_2 = {
    wrong: false,
    code: '    public void locate(String uuid, Async async) {\n        AtmosphereResource r = find(uuid);\n        if (r != null) {\n            async.available(r);\n        }\n    }\n',
    correctCode: '    public void locate(String uuid, Async async) {\n        AtmosphereResource r = find(uuid);\n        if (r != null) {\n            async.available(r);\n        }\n    }\n',
    wrongLine: -2,
    wrongLineContent: '',
    explanation: "This code snippet is correct. The variable name <span class='monospace'>uuid</span> hints to the variable's usage as a UUID which is typically used to find a resource, as also done here. If the resource is found, it is made available to <span class='monospace'>async</span>."
};

export const EXAMPLE_3 = {
    wrong: true,
    code: '    private Viewport computeScrollViewport(float x, float y) {\n        Viewport maxViewport = getMaximumViewport();\n        Viewport currentViewport = getCurrentViewport();\n        Viewport scrollViewport = new Viewport(currentViewport);\n\n        if (maxViewport.contains(x, y)) {\n            final float width = currentViewport.width();\n            final float height = currentViewport.height();\n\n            final float halfWidth = width / 2;\n            final float halfHeight = height / 2;\n\n            float left = x - halfWidth;\n            float top = y + halfHeight;\n\n            left = Math.max(maxViewport.left, Math.min(left, maxViewport.right - width));\n            top = Math.max(maxViewport.bottom + height, Math.min(top, maxViewport.top));\n\n            scrollViewport.set(left, top, left + height, top - height);\n        }\n\n        return scrollViewport;\n    }\n',
    correctCode: '    private Viewport computeScrollViewport(float x, float y) {\n        Viewport maxViewport = getMaximumViewport();\n        Viewport currentViewport = getCurrentViewport();\n        Viewport scrollViewport = new Viewport(currentViewport);\n\n        if (maxViewport.contains(x, y)) {\n            final float width = currentViewport.width();\n            final float height = currentViewport.height();\n\n            final float halfWidth = width / 2;\n            final float halfHeight = height / 2;\n\n            float left = x - halfWidth;\n            float top = y + halfHeight;\n\n            left = Math.max(maxViewport.left, Math.min(left, maxViewport.right - width));\n            top = Math.max(maxViewport.bottom + height, Math.min(top, maxViewport.top));\n\n            scrollViewport.set(left, top, left + height, top - height);\n            scrollViewport.set(left, top, left + width, top - height);\n        }\n\n        return scrollViewport;\n    }',
    wrongLine: 19,
    wrongLineContent: 'scrollViewport.set(left, top, left + height, top - height);',
    explanation: 'This code snippet contains a bug. The arguments to set in line 19 specify positions, where <span class="monospace">left</span> concerns a horizontal position. The corresponding position right is however falsely calculated as <span class="monospace">left + height</span>, whereas it should be <span class="monospace">left + width</span>.'
};

