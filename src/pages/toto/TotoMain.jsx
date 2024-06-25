import React, { useEffect, useState } from "react";
import "./TotoStyle.css";
import GameListItem from "../../components/toto/GameListItem";
import OrderCartItem from "../../components/toto/OrderCartItem";
import GameCalenderItem from "../../components/toto/GameCalenderItem";
import axios from "axios";

const TotoMain = () => {
    const [selectedDay, setSelectedDay] = useState(new Date().getDay()+1);
    const [selectedWeek, setSelectedWeek] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
    const [selectedCart, setSelectedCart] = useState(0);
    const [bettingOrder, setBettingOrder] = useState({});
    const [orderSum, setOrderSum] = useState();
    const [gameData, setGameData] = useState();
    const [pageData, setPageData] = useState();
    const daytoText = ["일", "월", "화", "수", "목", "금", "토"];
    const serverAddr = "http://192.168.0.16:8000/api/v1/toto";

    const testUUIDToken = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJleHAiOjE3MTkzMzMyODR9.zb_cj5O2Yf18LrwvJERlTk-y2nEDaqUATfYqbsPy2RuEMEK2ut5Up6bRef1oW0mN";

    const changeWeek = (e = 0) => {
        if(e != 0) changeDay(-1);

        const gameCalender = document.getElementById("g-calender-head");
        const date = new Date(new Date(selectedWeek).setDate(selectedWeek.getDate() + e));
        setSelectedWeek(new Date(new Date(selectedWeek).setDate(selectedWeek.getDate() + e)));

        for(let i=0; i<7; i++) {
            gameCalender.children[i+1].innerText = `${date.getMonth()+1}.${date.getDate()} ${daytoText[date.getDay()]}`;
            date.setDate(date.getDate()+1);
        }
    }
    const changeDay = (e) => {
        const gameCalender = document.getElementById("g-calender-head");
        setSelectedDay(e);
        getGameData(new Date(new Date(selectedWeek).setDate(selectedWeek.getDate() + e - 1)).toISOString().split('T')[0]);

        if (e != selectedDay && selectedDay != -1) {
            gameCalender.children[selectedDay].style.backgroundColor = null;
            gameCalender.children[selectedDay].style.color = 'white';
            gameCalender.children[selectedDay].style.fontWeight = 'normal';
        }
        if(e != -1) {
            gameCalender.children[e].style.backgroundColor = 'white';
            gameCalender.children[e].style.color = 'black';
            gameCalender.children[e].style.fontWeight = 'bold';
        }
    }
    const changeCart = (e) => {
        const orderBoxHeader = document.getElementById("o-box-header");
        setSelectedCart(e);

        if(selectedCart != e) {
            orderBoxHeader.children[selectedCart].style.border = null;
            orderBoxHeader.children[selectedCart].style.backgroundColor = null;
        }
        orderBoxHeader.children[e].style.borderBottom = "3px solid #47b0ec";
        orderBoxHeader.children[e].style.backgroundColor = "white";
    }
    const changeOrder = (e) => {
        let bettingOrderChange = bettingOrder;
        if(e.state == 0) {
            delete bettingOrderChange[e.gameId];
        } else {
            bettingOrderChange[e.gameId] = {
                gameId: e.gameId,
                team: e.state,
                teamName: e.teamName,
                teamRtp: e.teamRtp
            }
        }
        setBettingOrder(bettingOrderChange);
        changeOrderSum();
    }
    const changeOrderSum = () => {
        if(!orderSum) {
            setOrderSum({
                count: 0,
                rtp: 0,
                result: document.getElementById("betting-amount").value
            });
            return;
        }
        let sumRtp = 1;
        Object.keys(bettingOrder).forEach(e => {
            sumRtp *= bettingOrder[e].teamRtp;
        });
        setOrderSum({
            count: Object.keys(bettingOrder).length,
            rtp: Math.round(sumRtp*100)/100,
            result: Math.round(document.getElementById("betting-amount").value * sumRtp)
        });
    }

    const SetGameCalender = () => {
        return (
            <div className="game-calender-games">
                {gameData?.map((e,i) => (
                    <GameCalenderItem 
                        key={i}
                        teamHome={e.teamHome}
                        teamAway={e.teamAway}
                        gameStart={new Date(e.gameStartAt)}
                    />
                ))}
            </div>
        );
    }
    const SetGameList = () => {
        return (
            <>
                {gameData?.map((e,i) => (
                    <GameListItem
                        key={i}
                        gameId={e.gameId}
                        teamHomeId={e.teamHomeId}
                        teamAwayId={e.teamAwayId}
                        teamHome={e.teamHome}
                        teamAway={e.teamAway}
                        rtpHome={e.rtpHome}
                        rtpAway={e.rtpAway}
                        gameStart={new Date(e.gameStartAt)}
                        bettingEnd={new Date(e.betEndAt)}
                        result={e.result}
                        bettingState={bettingOrder[e.gameId] ? bettingOrder[e.gameId].team : 0}
                        setBetting={changeOrder}
                    />
                ))}
            </>
        )
    }
    const SetCartOrder = () => {
        return (
            <div className="order-box-cart-box">
                {Object.keys(bettingOrder).map((e,i) => {
                    const betting = bettingOrder[e];
                    return (
                        <OrderCartItem 
                            key={i}
                            gameId={betting.gameId}
                            team={betting.teamName}
                            rtp={betting.teamRtp}
                            removeBetting={changeOrder}
                        />
                    )
                })}
            </div>
        );
    }
    const SetMoreGame = () => {
        let innerText = "";
        if(gameData && gameData.length != pageData.totalElements) {
            innerText = `더보기 (${gameData.length}/${pageData.totalElements}) ▼`
        }
        return (
            <>
                {innerText == "" ? 
                    <div style={{height:"10px"}}/>
                 : 
                    <div className="game-list-more" onClick={() => getGameData(new Date(new Date(selectedWeek).setDate(selectedWeek.getDate() + selectedDay - 1)).toISOString().split('T')[0], pageData.page+1)}>
                        {innerText}
                    </div>}
            </>
        );
    }

    const getGameData = async (date = null, page = 0) => {
        try{
            let url = serverAddr + "/games?page=" + page;
            url += date == null ? "" : "&date="+date;
            const response = await axios.get(url);
            if (page == 0) {
                setGameData(response.data.content);
            } else {
                const beforeData = gameData ? gameData : [];
                setGameData([...beforeData, ...response.data.content]);
            }
            setPageData(response.data.pageInfo);
            // console.log(response.data);
        } catch(error) {
            alert(error);
        }
    }
    const sendBettingData = async () => {
        try {
            if (Object.keys(bettingOrder).length == 0) throw new Error("선택한 경기가 없습니다.");
            if (document.getElementById("betting-amount").value < 1000) throw new Error("1000원 이상 배팅해 주세요.");
            const bettingList = {
                pointAmount: document.getElementById("betting-amount").value,
                bettingGames: Object.keys(bettingOrder).map(e => {
                    if (bettingOrder[e].isEnd) throw new Error("배팅이 종료된 경기를 제외해 주세요.");
                    return {
                        gameId: e,
                        team: bettingOrder[e].team
                    };
                })
            }
            await axios.post(
                "http://localhost:8000/api/v1/toto/betting",
                bettingList,
                { headers: { Authorization: testUUIDToken }}
            );
            alert("구매가 완료되었습니다.");
            setBettingOrder({});
            document.getElementById("betting-amount").value = 0;
            setOrderSum({
                count: 0,
                rtp: 0,
                result: 0
            });
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getGameData();

        changeDay(selectedDay);
        changeWeek();
        changeCart(selectedCart);
        changeOrderSum();
    },[])
    

    return (
        <div className="toto-main">
            <div className="toto-box">
                <div id="g-calender" className="game-calender">
                    <div id="g-calender-head" className="game-calender-head">
                        <div className="game-calender-arrow t-c"
                            style={{fontSize:"9pt", paddingBottom:"2px"}}
                            // onClick={() => changeWeek(new Date(selectedWeek.setDate(selectedWeek.getDate()-14)))}>
                            onClick={() => changeWeek(-7)}>
                            ◀
                        </div>
                        <div className="game-calender-head-item t-c" onClick={() => changeDay(1)}/>
                        <div className="game-calender-head-item t-c" onClick={() => changeDay(2)}/>
                        <div className="game-calender-head-item t-c" onClick={() => changeDay(3)}/>
                        <div className="game-calender-head-item t-c" onClick={() => changeDay(4)}/>
                        <div className="game-calender-head-item t-c" onClick={() => changeDay(5)}/>
                        <div className="game-calender-head-item t-c" onClick={() => changeDay(6)}/>
                        <div className="game-calender-head-item t-c" onClick={() => changeDay(7)}/>
                        <div className="game-calender-arrow t-c"
                            style={{fontSize:"9pt", paddingBottom:"2px"}}
                            // onClick={() => changeWeek(new Date(selectedWeek.setDate(selectedWeek.getDate()+7)))}>
                            onClick={() => changeWeek(7)}>
                            ▶
                        </div>
                    </div>
                    <SetGameCalender />
                </div>
                <div id="g-list" className="game-list">
                    <div className="game-list-head">
                        날짜
                    </div>
                    <div className="game-list-box">
                        <div className="game-list-box-head">
                            <div style={{flex:"1"}}>번호</div>
                            <div style={{flex:"2"}}>마감</div>
                            <div style={{flex:"5"}}>　홈팀vs원정팀</div>
                            <div style={{flex:"3"}}>배당선택</div>
                            <div style={{flex:"2"}}>경기일시</div>
                            <div style={{flex:"1"}}>정보</div>
                        </div>
                        <SetGameList />
                        <SetMoreGame />
                    </div>
                </div>
            </div>
            <div className="order-box">
                <div className="order-box2">
                    <div id="o-box-header" className="order-box-header">
                        <div onClick={() => changeCart(0)}>
                            구매하기
                        </div>
                        <div onClick={() => changeCart(1)}>
                            구매내역
                        </div>
                    </div>
                    <div className="order-box-cart">
                        <SetCartOrder />
                        <div className="order-box-cart-sum">
                            <div>
                                <div style={{flex:3}}>선택경기수</div>
                                <div style={{flex:3}}>{orderSum?.count}</div>
                                <div style={{flex:1}}>경기</div>
                            </div>
                            <div>
                                <div style={{flex:3}}>예상적중배당률</div>
                                <div style={{flex:3}}>{orderSum?.rtp}</div>
                                <div style={{flex:1}}>배</div>
                            </div>
                            <div>
                                <div style={{flex:3}}>개별투표금액</div>
                                <div style={{flex:3}}>
                                    <input id="betting-amount"
                                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "")}
                                        onChange={changeOrderSum}
                                        defaultValue={0}/>
                                </div>
                                <div style={{flex:1}}>원</div>
                            </div>
                            <div>
                                <div style={{flex:3}}>예상적중금액</div>
                                <div style={{flex:3}}>{orderSum?.result}</div>
                                <div style={{flex:1}}>원</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-box-buy" onClick={sendBettingData}>
                    구매하기
                </div>
            </div>
        </div>
    );
};

export default TotoMain;