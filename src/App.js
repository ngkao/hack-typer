import './App.scss';
import InputField from './components/InputField/InputField';
import ScoreTable from './components/ScoreTable/ScoreTable';
import TemplateField from './components/TemplateField/TemplateField';

function App() {
  return (
    <div className="App">
      <section className="header">
          <h1>NAME</h1>
      </section>
      <section className="score">
          <h2>SCORE</h2>
      </section>
      <TemplateField />
      <InputField />
      <ScoreTable />
    </div>
  );
}

export default App;
