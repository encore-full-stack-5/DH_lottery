import { useState } from "react";
import OrderHistoryDetailItem from "./OrderHistoryDetailItem";
import "./OrderHistoryItem.css";
import { useEffect } from "react";

const OrderHistoryItem = (props) => {
    const [showDetail, setShowDetail] = useState(false);
    const [bettingResult, setBettingResult] = useState("");
    const [rtp, setRtp] = useState(0);
    const daytoText = ["일", "월", "화", "수", "목", "금", "토"];
    

    const changeShowDetail = () => {
        setShowDetail(!showDetail);
    }

    const SetBettingDetail = () => {
        return (
            <div className="order-box-betting-detail-box">
                {props.bettingGames.map((e,i) => (
                    <OrderHistoryDetailItem 
                        key={i}
                        data={e}
                    />
                ))}
            </div>
        );
    }

    const RtpAndResult = () => {
        let rtpCalc = 1;
        let isWin = 1;
        props.bettingGames.forEach(e => {
            // if (e.result < 3) rtpCalc *= e.gameRtp;
            rtpCalc *= e.gameRtp;
            if (e.result == 0) isWin *= 0;
            else if (e.result != 3 && e.result != 4 && e.result != e.team) isWin *= 2;
        });
        if (isWin == 0) setBettingResult("두근두근");
        else if (isWin == 1) setBettingResult("적☆중");
        else setBettingResult("꽝ㅋㅋ");
        setRtp(Math.round(rtpCalc*100)/100);
    }

    useEffect(() => {
        RtpAndResult();
    },[]);

    return (
        <div className="order-box-betting-item">
            <div className="order-box-betting-item-col">
                <div>
                    {`${props.date.getMonth()+1}.${props.date.getDate()}(${daytoText[props.date.getDay()]})`}
                </div>
                <div>
                    {props.amount + "원"}
                </div>
            </div>
            <div className="order-box-betting-item-col">
                <div>
                    {`총 ${props.bettingGames.length} 경기 ${rtp}배`}
                </div>
                <div>
                    {bettingResult}
                </div>
            </div>
            <div className="order-box-betting-item-col" onClick={changeShowDetail}>{showDetail?"△":"▽"}</div>
            {showDetail ? <SetBettingDetail /> : ""}
        </div>
    );
};

export default OrderHistoryItem;