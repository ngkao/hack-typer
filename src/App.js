import './App.scss';
import InputField from './components/InputField/InputField';
import ScoreTable from './components/ScoreTable/ScoreTable';
import TemplateField from './components/TemplateField/TemplateField';
import axios from 'axios';
import { useEffect, useState } from 'react';




function App() {

  const [scoreData, setScoreData] = useState(null)

  const fetchData = () => {
      axios.get(`http://localhost:8080/scores`)
          .then((response) => {
              setScoreData(response.data)
          })
          .catch((error) => console.log(error))
  }

  useEffect(() => {
      fetchData();
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

  useEffect(()=>{
    if (show == true) {
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


  if (!scoreData) {
    return <h3>Loading..</h3>
  }

  return (
    <div className="App">
      <section className="header">
          <h1>APP NAME</h1>
      </section>
      <TemplateField />
      <InputField
        fetchData={fetchData}
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
