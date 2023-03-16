import "./InputField.scss"
import { useState } from "react";
import axios from "axios";

const InputField = ({fetchData}) => {

    const [input, setInput] = useState();
    console.log(input)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Send", input)

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
 
    }



    return (
        <>
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

        </>
    );
};

export default InputField;