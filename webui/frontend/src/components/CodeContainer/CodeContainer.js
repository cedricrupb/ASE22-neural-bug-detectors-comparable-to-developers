import React, { useLayoutEffect, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { LIGHT_HIGHLIGHT as lightStyle } from '../../res/highlighting/lightHighlight';
import { DARK_HIGHLIGHT as darkStyle } from '../../res/highlighting/darkHighlight';
import useStyles from './CodeContainer.styles';

const CodeContainer = ({ code = '', selectedLine = -1, setSelectedLine = () => {}, clickable = true, greenLine = -1, redLine = -1, darkMode = false, example = false }) => {
    const classes = useStyles();

    // Add a - before the deleted and a + before the inserted line
    // Furthermore, decrease line count for lines after by one
    useLayoutEffect(() => {
        const lines = Array.from(document.querySelectorAll('.linenumber'));
        lines.forEach(line => {
            if (line.textContent === redLine.toString()) line.textContent = '-';
            if (line.textContent === greenLine.toString()) line.textContent = '+';
            if (Number(line.textContent) > Number(greenLine)) line.textContent = Number(line.textContent - 1);
        });
    }, [greenLine, redLine]);

    useEffect(() => {
        if (example) return;

        const scrollContainer = document.querySelector('#scrollContainer');
        if (scrollContainer) scrollContainer.scrollTo(0, 0);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    const selectLineColor = (lineNumber) => {
        switch (lineNumber) {
            case greenLine: return 'rgba(36, 204, 36, 0.5)';
            case redLine: return 'rgba(204, 36, 36, 0.5)';
            default: return 'transparent'
        }
    };

    return (
        <div className={classes.scrollContainer} id="scrollContainer">
            <SyntaxHighlighter
                language="java" 
                style={darkMode ? darkStyle : lightStyle} 
                customStyle={{
                    fontSize: '17px',
                    overflowX: 'unset',
                    overflowY: 'unset'
                }}
                showLineNumbers
                wrapLines
                // wrapLongLines
                lineProps={(lineNumber) => ({
                    style: { 
                        // whiteSpace: 'pre-wrap',
                        // wordBreak: 'break-all',
                        display: 'table', 
                        cursor: clickable ? 'pointer' : 'unset', 
                        border: lineNumber === selectedLine ? `1px dashed ${darkMode ? 'white' : 'black'}` : '1px solid transparent',
                        borderRadius: '5px',
                        borderCollapse: 'separate',
                        backgroundColor: selectLineColor(lineNumber),
                        width: '100%'
                    },
                    onClick() {
                        if (!clickable) return;
                        setSelectedLine(lineNumber);
                    },
                })} 
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeContainer;
