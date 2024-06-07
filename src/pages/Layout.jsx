import { Outlet } from "react-router-dom";
import HeaderBar from "../components/header/HeaderBar";
import NavBar from "../components/nav/NavBar";
import MyPageSideBar from "../components/sidebar/MyPageSideBar";
const Layout = () => {
  return (
    <div>
      <header>
        <HeaderBar />
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
