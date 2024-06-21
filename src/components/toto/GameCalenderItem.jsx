import "./GameCalenderItem.css";

const GameCalenderItem = (props) => {
    return (
        <div className="game-calender-games-item">
            <div>{`${props.gameStart.getHours()}:${props.gameStart.getMinutes()}`}</div>
            <div>{props.teamHome}</div>
            <div>vs</div>
            <div>{props.teamAway}</div>
        </div>
    );
}
export default GameCalenderItem;