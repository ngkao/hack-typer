import "./InputField.scss"

const InputField = () => {
    return (
        <section className="input">
            <form className='input__form'>
                <label className='input__heading'>Input Field</label>
                <textarea className='input__box'>
                </textarea>
                <button className='input__btn'>START/STOP</button>
            </form>

        </section>
    );
};

export default InputField;