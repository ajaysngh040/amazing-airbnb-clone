import { Tabs, Button } from "antd";

import { locationsTab } from "../assets/mock-data";

const operations = (
  <Button size="large" className="text-sm font-light">
    Filter
  </Button>
);

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
    <div className="w-full fixed top-11 left-0 z-50 bg-white pl-10  mt-8 hidden sm:block">
      <Tabs tabBarExtraContent={operations} items={items} className="w-11/12" />
    </div>
  );
};
export default IconTab;
