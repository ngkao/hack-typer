import ScoreTableItem from '../ScoreTableItem/ScoreTableItem';
import "./ScoreTable.scss"
import axios from 'axios';
import { useEffect, useState } from 'react';
import InputField from '../InputField/InputField';

const ScoreTable = ({scoreData}) => {


    // //Hide and Show Score Table
    // const [show, setShow] = useState(true);


    return (
        <>
            {/* <div className="toggle">
                <button onClick={()=>setShow(true)}>SHOW RESULTS</button>
                <button onClick={()=>setShow(false)}>HIDE RESULTS</button>
            </div> */}
            <div className='score-table'>
                <h2 className="score-table__title">Score Table</h2>
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