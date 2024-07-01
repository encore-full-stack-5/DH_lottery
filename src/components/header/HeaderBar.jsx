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
              <Link to="/payment" className="header-button">
                충전
              </Link>
              <Link to="/withdraw" className="header-button">
                출금
              </Link>
            </li>
            <li>
              <Link to="/login" className="header-button">
                로그인
              </Link>
              <a className="h-bar"> | </a>
            </li>
            <li>
              <Link to="/login" className="header-button">
                로그아웃
              </Link>
              <a className="h-bar"> | </a>
            </li>
            <li>
              <Link to="/myPage" className="header-right-button">
                마이페이지
              </Link>
            </li>
            <li>
              <Link to="/myPage" className="header-right-button">
                고객센터
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <main></main>
    </div>
  );
};

export default HeaderBar;
