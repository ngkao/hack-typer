
const ScoreTableItem = ({name, score}) => {

    // Thats where we can map though the History score data
    return (
        <div className='score-table__item'>
            <p>{name}</p>
            <p>{score}</p>
        </div>
    );
};

export default ScoreTableItem;