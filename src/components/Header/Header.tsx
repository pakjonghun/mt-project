import { Outlet } from "react-router-dom";
import Input from "./components/Input";
import List from "../List";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import { KeyRouters } from "../../router/types";

const Header = () => {
  const style = {
    itemStyle: "h-full",
    listStyle: "flex items-center h-full",
  };
  return (
    //header height-size must pt-size
    <div className="pt-20 md:pt-24">
      <header className="fixed top-0 flex item-center justify-between w-full h-20 md:h-24 bg-black">
        <List
          styles={style}
          contents={[
            <Logo />,
            <Menu title={"Movie"} path={KeyRouters.movies} />,
            <Menu title={"TV"} path={KeyRouters.tvs} />,
          ]}
        />
        <Input />
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
