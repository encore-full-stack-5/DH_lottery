import { Outlet } from "react-router-dom";
import HeaderBar from "../components/header/HeaderBar";
const Layout = () => {
  return (
    <div>
      <header>
        <HeaderBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
