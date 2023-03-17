import "./InputField.scss"
import { useState } from "react";
import axios from "axios";
import Editor from "../Editor/Editor";

const InputField = ({fetchData, numWords}) => {

    // const [input, setInput] = useState();
    const [hasStarted, setHasStarted] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [timeTaken, setTimeTaken] = useState(null)

    // console.log(input)

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("Send", input, editor)

        if (hasStarted === false) {
            setStartTime(Date.now())
            setTimeTaken(null)
            setHasStarted(true)
        } else {
            // On the Submit will trigger the score calc
            axios.post(`http://localhost:8080/scores`,
            {
                name: "NG",
                score: 100
            })
            .then(() => {
                console.log("POST Request")
                fetchData()
                event.target.reset()
            })
            .catch((error) => console.log(error))
            event.target.reset()
            setTimeTaken(Math.round((Date.now() - startTime)/10)/100)
            setHasStarted(false)
        }

        
    }

      // Editor
    const [editor, setEditor] = useState('');
    console.log("HTML", editor[0])

    return (
            <section className="input">
                <form 
                    className='input__form'
                    onSubmit={handleSubmit}
                >
                    <label className='input__heading'>INPUT FIELD</label>
                    {/* <textarea 
                        onChange={(event) => {setInput(event.target.value)}} 
                        value={input} 
                        className='input__box'>
                    </textarea> */}
                      <Editor 
                        // language="xml"
                        // language="css"
                        language="javascript"
                        onChange={setEditor}
                        value={editor}
                    />
                    <button className='input__btn'>START/STOP</button>
                </form>
                {(hasStarted)&&
                <>
                    <p className="input__time">Timer started. GO GO GO!</p>
                </>}
                {(timeTaken)&&
                <>
                    <p className="input__time">Time taken: {timeTaken} sec</p>
                    <p className="input__time input__time--bottom">{`Score (WPM): ${Math.round(numWords/timeTaken * 60)}`}</p>
                </>
                }
            </section>
    );
};

export default InputField;