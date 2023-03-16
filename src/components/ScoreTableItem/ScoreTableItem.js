
const ScoreTableItem = ({name, score}) => {

    // Thats where we can map though the History score data
    return (
        <div className='score__item'>
            <p>Name: {name}</p>
            <p>ScoreNumber: {score}</p>
        </div>
    );
};

export default ScoreTableItem;