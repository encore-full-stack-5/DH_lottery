import React, { useEffect, useState } from "react";
import "./TotoStyle.css";
import GameListItem from "../../components/toto/GameListItem";
import OrderCartItem from "../../components/toto/OrderCartItem";
import GameCalenderItem from "../../components/toto/GameCalenderItem";

const TotoMain = () => {
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());
    const [selectedWeek, setSelectedWeek] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
    const daytoText = ["일", "월", "화", "수", "목", "금", "토"];

    const testGameArray = [];
    const testBettingArray = [];

    const changeWeek = (e) => {
        const gameCalender = document.getElementById("g-calender-head")
        if(selectedWeek != e) {
            changeDay(-1);
        }
        setSelectedWeek(e);

        const date = e;
        for(let i=0; i<7; i++) {
            const temp = new Date(date.setDate(date.getDate()+1));
            gameCalender.children[i+1].innerText = `${date.getMonth()+1}.${temp.getDate()} ${daytoText[temp.getDay()]}`;
        }
    }
    const changeDay = (e) => {
        const gameCalender = document.getElementById("g-calender-head")
        setSelectedDay(e);

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

    useEffect(() => {
        changeDay(selectedDay);
        changeWeek(selectedWeek);
    },[])
    

    return (
        <div className="toto-main">
            <div className="toto-box">
                <div id="g-calender" className="game-calender">
                    <div id="g-calender-head" className="game-calender-head">
                        <div className="game-calender-arrow t-c"
                            style={{fontSize:"9pt", paddingBottom:"2px"}}
                            onClick={() => changeWeek(new Date(selectedWeek.setDate(selectedWeek.getDate()-14)))}>
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
                            onClick={() => changeWeek(new Date(selectedWeek.setDate(selectedWeek.getDate()+7)))}>
                            ▶
                        </div>
                    </div>
                    <div className="game-calender-games">
                        <GameCalenderItem 
                            teamHome="분도 라이더스"
                            teamAway="희서 양키스"
                            gameStart={new Date()}
                        />
                    </div>
                </div>
                <div id="g-list" className="game-list">
                    <div className="game-list-head">
                        날짜
                    </div>
                    <div className="game-list-box">
                        <div className="game-list-box-head">
                            <div style={{flex:"1"}}>번호</div>
                            <div style={{flex:"2"}}>마감시간</div>
                            <div style={{flex:"4"}}>홈팀vs원정팀</div>
                            <div style={{flex:"3"}}>배당선택</div>
                            <div style={{flex:"2"}}>경기일시</div>
                            <div style={{flex:"1"}}>정보</div>
                        </div>
                        <GameListItem
                            gameId="101"
                            teamHome="분도 라이더스"
                            teamAway="희서 양키스"
                            rtpHome="9.99"
                            rtpAway="1.01"
                            gameStart={new Date()}
                            bettingEnd={new Date()}
                        />
                        <div className="game-list-more">
                            더보기 {`(${1}/${10})`} ▼
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-box">
                <div className="order-box2">
                    <div className="order-box-header">
                        <div>
                            구매하기
                        </div>
                        <div>
                            구매내역
                        </div>
                    </div>
                    <div className="order-box-cart">
                        <div className="order-box-cart-box">
                            <OrderCartItem 
                                gameId="101"
                                team="희서 양키스"
                                rtp="1.01"
                            />
                        </div>
                        <div className="order-box-cart-sum">
                            <div>
                                <div style={{flex:3}}>선택경기수</div>
                                <div style={{flex:3}}>{1}</div>
                                <div style={{flex:1}}>경기</div>
                            </div>
                            <div>
                                <div style={{flex:3}}>예상적중배당률</div>
                                <div style={{flex:3}}>{2.5}</div>
                                <div style={{flex:1}}>배</div>
                            </div>
                            <div>
                                <div style={{flex:3}}>개별투표금액</div>
                                <div style={{flex:3}}>
                                    <input/>
                                </div>
                                <div style={{flex:1}}>원</div>
                            </div>
                            <div>
                                <div style={{flex:3}}>예상적중금액</div>
                                <div style={{flex:3}}>{1000}</div>
                                <div style={{flex:1}}>원</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-box-buy">
                    구매하기
                </div>
            </div>
        </div>
    );
};

export default TotoMain;