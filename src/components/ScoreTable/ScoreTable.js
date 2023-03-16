import ScoreTableItem from '../ScoreTableItem/ScoreTableItem';
import "./ScoreTable.scss"
import axios from 'axios';
import { useEffect, useState } from 'react';


const ScoreTable = () => {

    const [scoreData, setScoreData] = useState(null)
    // const [names, setName] = useState(null);
    // const [scores, setScore] = useState(null);

    const fetchData = () => {
        axios.get(`http://localhost:8080/scores`)
            .then((response) => {
                setScoreData(response.data)
            })
    }

    useEffect(() => {
        fetchData();
    },[])

    if (!scoreData) {
        return <h3>Loading..</h3>
    }

    return (
        <div className='score'>
            <h2>Score Table</h2>
            {scoreData.sort((a,b) => b.score -a.score).map(scoreItem => {
                return (
                    <ScoreTableItem
                    key = {scoreItem.id}
                    name ={scoreItem.name}
                    score ={scoreItem.score}
                    />
                )
            })}
        </div>
    );
};

export default ScoreTable;