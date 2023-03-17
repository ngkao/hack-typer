import React from 'react';
import "./Editor.scss"
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import {Controlled as ControlledEditor} from 'react-codemirror2';


const Editor = ({language, value, onChange}) => {

    function handleChange(value) {
        onChange(value)
    }

    return (
        <div className="editor">
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="editor__controller"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true}}
            />
        </div>
    );
};

export default Editor;