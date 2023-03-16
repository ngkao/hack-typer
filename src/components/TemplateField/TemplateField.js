import "./TemplateField.scss"
import axios from "axios"
import { useEffect, useState } from 'react'

const TemplateField = () => {

    const [templates, setTemplates] = useState(null)
    const [currentLine, setCurrentLine] = useState(0)

    const getTemplates = () => {
        axios.get(`http://localhost:8080/templates`)
            .then((response) => {
                setTemplates(response.data)
            })
    }

    function giveLines() {
        console.log(templates)
        
        const lines = []
        let templateLines = templates[1].lines
        for (let i=0; i<templateLines.length; i++) {
            if (i===currentLine) {
                lines.push(<p key={i} className="template__line template__line--selected">{templateLines[i]}</p>)
            } else {
                lines.push(<p key={i} className="template__line">{templateLines[i]}</p>)
            }
        }
        return <>{lines}</>
    }

    useEffect(() => {
        getTemplates();
    },[])

    if (!templates) {
        return <h3>Loading...</h3>
    }

    return (
        <section className="template">
            <h2 className='template__heading'>TYPE THIS PROGRAM</h2>
            <article className='template__box'>
            {giveLines()}
            </article>
        </section>
    );
};

export default TemplateField;