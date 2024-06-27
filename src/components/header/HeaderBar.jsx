import { Link } from "react-router-dom";
import "./HeaderBar.css";
const HeaderBar = () => {
  return (
    <div>
      <header className="header-content">
        <Link to="/">
          <img src="logo.png" className="logo-image" />
        </Link>
        <div class="top-menu">
          <ul>
            <li>
              <span className="username">박현서님</span>
            </li>
            <li className="money">
              <span className="won">￦ 예치금</span>
              <a className="price">0원</a>
              <a href="/payment" className="header-button">
                충전
              </a>
              <a href="/withdraw" className="header-button">
                출금
              </a>
            </li>
            <li>
              <a href="/login" className="header-button">
                로그인
              </a>
              <a className="h-bar"> | </a>
            </li>
            <li>
              <a href="/logout" className="header-button">
                로그아웃
              </a>
              <a className="h-bar"> | </a>
            </li>
            <li>
              <a href="/myPage" className="header-right-button">
                마이페이지
              </a>
            </li>
            <li>
              <a href="/logout" className="header-right-button">
                고객센터
              </a>
            </li>
          </ul>
        </div>
      </header>
      <main></main>
    </div>
  );
};

export default HeaderBar;
