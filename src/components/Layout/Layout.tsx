import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";

const Layout: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Layout;
