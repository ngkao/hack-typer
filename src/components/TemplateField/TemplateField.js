import "./TemplateField.scss"
// import { useState } from 'react'

const TemplateField = ({templates, tempIndex, cycleTemplate, localHighScore}) => {

    // const [currentLine, setCurrentLine] = useState(0)


    function giveLines() {
        // console.log(templates)
        
        const lines = []
        let templateLines = templates[tempIndex].lines
        for (let i=0; i<templateLines.length; i++) {
            if (i===0) {
                lines.push(<p key={i} className="template__line">{templateLines[i]}</p>)
                // add class template__line--selected when we implement line by line
            } else {
                lines.push(<p key={i} className="template__line">{templateLines[i]}</p>)
            }
        }

        return <>{lines}</>
    }


    if (!templates) {
        return <h3>Loading...</h3>
    }

    return (
        <>  
            
            <section className="score">
                <h2 className="score__heading">YOUR HIGH SCORE</h2>
                <p className="score__number">{localHighScore}</p>
            </section>
            <button onClick={cycleTemplate} className='input__btn input__btn--next'>NEXT PROGRAM</button>
            <section className="template">
                <h2 className='template__heading'>TYPE THIS PROGRAM</h2>
                <article className='template__box'>
                {giveLines()}
                </article>
            </section>
        </>

    );
};

export default TemplateField;