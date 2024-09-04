import React, { useEffect } from 'react';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
    useEffect(()=>{
        const alreadyInitialized = document.getElementById('realtimeEditor').nextSibling;
        if (!alreadyInitialized) {
            codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });
        }
    },[]);
  return<textarea id="realtimeEditor"></textarea>;
};

export default Editor