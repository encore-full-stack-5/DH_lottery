import "./OrderHistoryDetailItem.css";

const OrderHistoryDetailItem = (props) => {
    const resulttoText = ["경기전", "빗나감", "빗나감", "무승부", "경기취소"];
    
    return (
        <div className="order-box-betting-detail-item">
            <div className="order-box-betting-detail-item-head">
                <div className="order-box-betting-detail-item-head-team">
                    <div>홈팀</div>
                    <div>{props.data.teamHome}</div>
                </div>
                <div>vs</div>
                <div className="order-box-betting-detail-item-head-team">
                    <div>원정팀</div>
                    <div>{props.data.teamAway}</div>
                </div>
            </div>
            <div className="order-box-betting-detail-item-result">
                <div>
                    <div>{`배팅: ${props.data.team == 1 ? "홈팀" : "원정팀"}`}</div>
                    <div>{`결과: ${props.data.result == props.data.team ? "적중" : resulttoText[props.data.result]}`}</div>
                </div>
                <div>{`배율 ${props.data.gameRtp}배`}</div>
            </div>
        </div>
    );
};

export default OrderHistoryDetailItem;