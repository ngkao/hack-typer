import "./InputField.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "../Editor/Editor";

const InputField = ({fetchData, numWords, templates, setShow}) => {

    // const [input, setInput] = useState();
    const [hasStarted, setHasStarted] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [timeTaken, setTimeTaken] = useState(null)
    const [score, setScore] = useState(null)
    const [borderClass, setBorderClass] = useState('input__btn')

      // Editor
    const [editor, setEditor] = useState('');
  
    let totalChar = templates.lines.join("")

    let templateChar = totalChar.replaceAll(' ','')

    console.log("TemplateCount", templateChar.length)
    let editorChar = ((editor.replaceAll(' ','')).length) - (templates.lines.length - 1)
    console.log("editorChar", editorChar)

    // console.log(input)

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("Send", input, editor)

        if (hasStarted === false) {
            setStartTime(Date.now())
            setTimeTaken(null)
            setHasStarted(true)
            // setBorderClass('input__btn')
        } else {
            if (templateChar.length===editorChar) {
                event.target.reset()
                setTimeTaken(Math.round((Date.now() - startTime)/10)/100)
                setHasStarted(false)
                setEditor('')
                console.log('valid')
                setBorderClass('input__btn')
            } else {
                console.log('invalid')
                setBorderClass('input__btn input__btn--wrong')
                setTimeout(console.log(borderClass), 100)
            }
        }        
    }

    function publishScore(event) {
        event.preventDefault()
        const newName = event.target.name.value
        if (score) {
            axios.post(`http://localhost:8080/scores`,
            {
                name: newName,
                score: score
            })
            .then(() => {
                console.log("POST Request")
                fetchData()
                setShow(true)
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
                    <button className={borderClass}>START/STOP</button>
                    
                    
                </form>

                <form onSubmit={publishScore} className="input__btn-box">
                    <input 
                        className="input__name-field" 
                        name='name' 
                        type='text' 
                        placeholder="Enter name" 
                        required>
                    </input>
                    <button className='input__btn'>PUBLISH SCORE</button>
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