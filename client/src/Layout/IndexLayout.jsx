import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function IndexLayout() {
  return (
    <div className="container mx-auto w-1600">
      <div className="pt-24 flex flex-col ">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
