import { Outlet, useMatch } from "react-router-dom";
import Input from "../Input";
import List from "../List";
import Logo from "./components/Logo";
import Menu from "./components/Menu";

const Header = () => {
  const style = {
    itemStyle: "h-full",
    listStyle: "flex items-center h-full",
  };
  return (
    <div className="pt-16 md:pt-20">
      <header className="fixed top-0 flex item-center justify-between w-full h-16 md:h-20 bg-black">
        <List
          styles={style}
          contents={[
            <Logo />,
            <Menu title={"Movie"} path={"movies"} />,
            <Menu title={"TV"} path={"tvs"} />,
          ]}
        />
        <Input />
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
