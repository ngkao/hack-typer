import ScoreTableItem from '../ScoreTableItem/ScoreTableItem';
import "./ScoreTable.scss"

const ScoreTable = () => {

    const [scoreData, setScoreData] = useState(null)
    // const [names, setName] = useState(null);
    // const [scores, setScore] = useState(null);

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

    if (!scoreData) {
        return <h3>Loading</h3>
    }

    return (
        <>
            <div className='score-table'>
                <h2 className="score-table__title">Score Leaderboard</h2>
                <div className="score-table__outline">
                    <div className="score-table__heading-ctr">
                        <h3>NAME</h3>
                        <h3>SCORE</h3>
                    </div>
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
            </div>
        </>
    );
};

export default ScoreTable;