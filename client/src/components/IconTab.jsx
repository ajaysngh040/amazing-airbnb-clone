import { Tabs } from "antd";

import { locationsTab } from "../assets/mock-data";

const items = locationsTab.map((item) => {
  return {
    key: item.id,
    label: (
      <div className="flex flex-col items-center justify-center">
        <span className="">{item.icon}</span>
        <span className="text-sm font-base">{item.label}</span>
      </div>
    ),
  };
});
const IconTab = () => {
  return (
    <div className="w-full fixed top-11 left-0 z-50 bg-white px-12 mt-8 ">
      <Tabs items={items} className="w-full" />
    </div>
  );
};
export default IconTab;
