import './App.scss';
import InputField from './components/InputField/InputField';
import ScoreTable from './components/ScoreTable/ScoreTable';
import TemplateField from './components/TemplateField/TemplateField';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [scoreData, setScoreData] = useState(null)
  const [templates, setTemplates] = useState(null)

  const fetchScoreData = () => {
      axios.get(`http://localhost:8080/scores`)
          .then((response) => {
              setScoreData(response.data)
          })
          .catch((error) => console.log(error))
  }

  const getTemplates = () => {
    axios.get(`http://localhost:8080/templates`)
        .then((response) => {
            setTemplates(response.data)
        })
}

  useEffect(() => {
      fetchScoreData();
      getTemplates();
  },[])


   //Hide and Show Score Table
   const [show, setShow] = useState(false);

   const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
  }
  const scrollToBottom = () => {
    window.scrollTo({
      top: 9999999999,
      behavior: "smooth",
  })
  }

  const getNumWords = (lines) => {
    let acc = 0
    lines.forEach((line) => {
      acc += line.length
    })
    return acc/5
  }

  useEffect(()=>{
    if (show === true) {
      scrollToBottom()
    } else {
      scrollToTop();
    }

  },[show])

  const handleShow = () => {
    setShow(true);
  }

  const handleHide = () => {
    setShow(false);
  }


  if (!scoreData || !templates) {
    return <h3>Loading..</h3>
  }

  return (
    <div className="App">
      <section className="header">
          <h1>APP NAME</h1>
      </section>
      <TemplateField 
      templates={templates}
      />
      <InputField
        fetchData={fetchScoreData}
        numWords={getNumWords(templates[1].lines)}
      />
      <div className="toggle">
        <button className="toggle__btn" onClick={handleShow}>SHOW RESULTS</button>
        <button className="toggle__btn" onClick={handleHide}>HIDE RESULTS</button>
      </div>
      {show? <ScoreTable scoreData={scoreData} /> : null}
    </div>
  );
}

export default App;
