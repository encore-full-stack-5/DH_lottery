import "./GameListItem.css";

const GameListItem = (props) => {
    const daytoText = ["일", "월", "화", "수", "목", "금", "토"];

    const ClickMoreGameInfo = () => {
        alert(`gameID: ${props.gameId}`);
    }

    return (
        <div className="game-list-item">
            <div style={{flex:"1"}}>{props.gameId}</div>
            <div style={{flex:"2"}} className="game-list-item-time">
                <div>{`${props.bettingEnd.getMonth()+1}.${props.bettingEnd.getDate()} (${daytoText[props.bettingEnd.getDay()]})`}</div>
                <div>{`${props.bettingEnd.getHours()}:${props.bettingEnd.getMinutes()}`}</div>
            </div>
            <div style={{flex:"4"}}>{props.teamHome} : {props.teamAway}</div>
            <div style={{flex:"3"}}>
                <div className="game-list-item-rtp">
                    <div>홈 승</div>
                    <div>{`${props.rtpHome}`}</div>
                </div>
                <div style={{width:"4px"}}/>
                <div className="game-list-item-rtp">
                    <div>원정 승</div>
                    <div>{`${props.rtpAway}`}</div>
                </div>
            </div>
            <div style={{flex:"2"}} className="game-list-item-time">
                <div>{`${props.gameStart.getMonth()+1}.${props.gameStart.getDate()} (${daytoText[props.gameStart.getDay()]})`}</div>
                <div>{`${props.gameStart.getHours()}:${props.gameStart.getMinutes()}`}</div>
            </div>
            <div style={{flex:"1"}} onClick={ClickMoreGameInfo}>
                <div/>
            </div>
        </div>
    );
}
export default GameListItem;