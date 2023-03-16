import "./InputField.scss"
import { useState } from "react";

const InputField = () => {

    const [input, setInput] = useState();
    console.log(input)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Send", input)
    }


    return (
        <section className="input">
            <form 
                className='input__form'
                onSubmit={handleSubmit}
            >
                <label className='input__heading'>Input Field</label>
                <textarea 
                    onChange={(event) => {setInput(event.target.value)}} 
                    value={input} 
                    className='input__box'>
                </textarea>
                <button className='input__btn'>START/STOP</button>
            </form>

        </section>
    );
};

export default InputField;