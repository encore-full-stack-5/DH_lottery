import { useEffect, useState } from "react";
import "./GameResultPopup.css";
import axios from "axios";

const GameResultPopup = (props) => {
    const daytoText = ["일", "월", "화", "수", "목", "금", "토"];
    const [resultData, setResultData] = useState();
    const serverAddr = "http://192.168.0.16:8000/api/v1/toto"

    const ResultList = () => {
        if (!resultData) {
            return(
                <div className="game-result-popup-item-empty">불러오는중...</div>
            );
        }
        if (resultData.length == 0) {
            return(
                <div className="game-result-popup-item-empty">기록이 없습니다.</div>
            );
        }
        const resulttoText = ["경기전", props.home+" 승", props.away+" 승", "무승부", "경기취소"];
        return (
            resultData?.map((e,i) => {
                const startDate = new Date(e.startAt);
                return (
                <div className="game-result-popup-item" key={i}>
                    <div style={{flex:1}}>{e.gameId}</div>
                    <div style={{flex:1}}>{`${startDate.getMonth()}.${startDate.getDate()}(${daytoText[startDate.getDay()]})`}</div>
                    <div style={{flex:3}}>{resulttoText[e.result]}</div>
                </div>)
            })
        );
    }

    const setWinRate = (data) => {
        let homeRate = 0;
        let awayRate = 0;
        if (data.length > 0) {
            data.forEach(e => {
                if(e.result == 1) homeRate += 1;
                else if(e.result == 2) awayRate += 1;
            });
            homeRate = Math.round(homeRate / data.length * 100);
            awayRate = Math.round(awayRate / data.length * 100);
        }
        document.getElementById("winrate").children[0].innerText = homeRate+"%";
        document.getElementById("winrate").children[1].innerText = awayRate+"%";
    }

    const getData = async () => {
        try {
            const response = await axios.get(serverAddr + "/games/" + props.gameId);
            setResultData(response.data);
            setWinRate(response.data);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <div className="game-result-popup-back" onClick={props.close}>
            <div className="game-result-popup-box">
                <div className="game-result-winrate">
                    <div className="game-result-winrate-team">
                        <div>{props.home}</div>
                        <div style={{width:"0%", fontWeight:"normal"}}>vs</div>
                        <div>{props.away}</div>
                    </div>
                    <div id="winrate" className="game-result-winrate-rate">
                        <div>계산중</div>
                        <div>계산중</div>
                    </div>
                </div>
                <div className="game-result-popup-head">
                    <div style={{flex:1}}>번호</div>
                    <div style={{flex:1}}>날짜</div>
                    <div style={{flex:3}}>결과</div>
                </div>
                <div className="game-result-popup-body">
                    <ResultList />
                </div>
            </div>
        </div>
    );
};

export default GameResultPopup;