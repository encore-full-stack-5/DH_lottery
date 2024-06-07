import MyPageSideBar from "../../components/sidebar/MyPageSideBar";
import "./Withdraw.css";
import React from "react";
const Withdraw = () => {
  return (
    <>
      <main>
        <MyPageSideBar />
        <div className="header_article">
          <h3 className="sub_title">출금하기</h3>
          <div className="content_wrap">
            <div className="group_content">
              <h5 className="tab_box"></h5>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Withdraw;
