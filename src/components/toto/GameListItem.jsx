import { useEffect, useState } from "react";
import "./GameListItem.css";

const GameListItem = (props) => {
    const daytoText = ["일", "월", "화", "수", "목", "금", "토"];

    const ClickMoreGameInfo = () => {
        alert(`gameID: ${props.gameId}`);
    }

    const setBetting = (e) => {
        if (e == props.bettingState) e = 0;
        const bettingTeam = {
            gameId: props.gameId,
            state: e,
            teamName: e==1 ? props.teamHome : props.teamAway,
            teamRtp: e==1 ? props.rtpHome : props.rtpAway,
        };
        props.setBetting(bettingTeam);
    }

    useEffect(() => {
        document.getElementById("rtp-home"+props.gameId).style.backgroundColor = null;
        document.getElementById("rtp-home"+props.gameId).style.color = null
        document.getElementById("rtp-away"+props.gameId).style.backgroundColor = null;
        document.getElementById("rtp-away"+props.gameId).style.color = null
        if(props.bettingState == 1) {
            document.getElementById("rtp-home"+props.gameId).style.backgroundColor = "orange";
            document.getElementById("rtp-home"+props.gameId).style.color = "white";
        } else if(props.bettingState == 2) {
            document.getElementById("rtp-away"+props.gameId).style.backgroundColor = "orange";
            document.getElementById("rtp-away"+props.gameId).style.color = "white";
        }
    },[props.bettingState])

    return (
        <div className="game-list-item">
            <div style={{flex:"1"}}>{props.gameId}</div>
            <div style={{flex:"2"}} className="game-list-item-time">
                <div>{`${props.bettingEnd.getMonth()+1}.${props.bettingEnd.getDate()} (${daytoText[props.bettingEnd.getDay()]})`}</div>
                <div>{`${props.bettingEnd.getHours()}:${props.bettingEnd.getMinutes()<10 ? '0' + props.bettingEnd.getMinutes() : props.bettingEnd.getMinutes()}`}</div>
            </div>
            <div className="game-list-item-team" style={{flex:"5"}}>
                <div>{props.teamHome}</div>
                <div>:</div>
                <div>{props.teamAway}</div>
            </div>
            <div style={{flex:"3"}}>
                <div className="game-list-item-rtp" id={"rtp-home" + props.gameId} onClick={() => setBetting(1)}>
                    <div>홈 승</div>
                    <div>{`${props.rtpHome}`}</div>
                </div>
                <div style={{width:"4px"}}/>
                <div className="game-list-item-rtp" id={"rtp-away" + props.gameId} onClick={() => setBetting(2)}>
                    <div>원정 승</div>
                    <div>{`${props.rtpAway}`}</div>
                </div>
            </div>
            <div style={{flex:"2"}} className="game-list-item-time">
                <div>{`${props.gameStart.getMonth()+1}.${props.gameStart.getDate()} (${daytoText[props.gameStart.getDay()]})`}</div>
                <div>{`${props.gameStart.getHours()}:${props.gameStart.getMinutes()<10 ? '0' + props.gameStart.getMinutes() : props.gameStart.getMinutes()}`}</div>
            </div>
            <div style={{flex:"1"}}>
                <div onClick={ClickMoreGameInfo}/>
            </div>
        </div>
    );
}
export default GameListItem;