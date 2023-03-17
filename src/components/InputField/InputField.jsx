import "./InputField.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "../Editor/Editor";

const InputField = ({fetchData, numWords}) => {

    // const [input, setInput] = useState();
    const [hasStarted, setHasStarted] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [timeTaken, setTimeTaken] = useState(null)
    const [score, setScore] = useState(null)

    // console.log(input)

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("Send", input, editor)

        if (hasStarted === false) {
            setStartTime(Date.now())
            setTimeTaken(null)
            setHasStarted(true)
        } else {
            event.target.reset()
            setTimeTaken(Math.round((Date.now() - startTime)/10)/100)
            setHasStarted(false)
        }        
    }

    function publishScore() {
        if (score) {
            axios.post(`http://localhost:8080/scores`,
            {
                name: "NG",
                score: score
            })
            .then(() => {
                console.log("POST Request")
                fetchData()
            })
            .catch((error) => console.log(error))
        }
    }

    function resetScore() {
        
        axios.put(`http://localhost:8080/scores`,
        {
            name: "NG",
            score: score
        })
        .then(() => {
            console.log("PUT (RESET) Request")
            fetchData()
        })
        .catch((error) => console.log(error))
    
    }

    useEffect((() => {
        if (timeTaken) {
            setScore(Math.round(numWords/timeTaken * 60))
        } else {
            setScore(null)
        }
    }), [timeTaken, numWords])

      // Editor
    const [editor, setEditor] = useState('');
    // console.log("HTML", editor[0])

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
                    <button onClick={publishScore} type="button" className='input__btn'>PUBLISH SCORE</button>
                    <button onClick={resetScore} type="button" className='input__btn'>RESET SCORES</button>
                </form>
                {(hasStarted)&&
                <>
                    <p className="input__time">Timer started. GO GO GO!</p>
                </>}
                {(timeTaken)&&
                <>
                    <p className="input__time">Time taken: {timeTaken} sec</p>
                    <p className="input__time input__time--bottom">{score && `Score (WPM): ${score}`}</p>
                </>
                }
            </section>
    );
};

export default InputField;