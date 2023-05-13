import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "./App.css";
import BinanceWithdraw from "./components/BinanceWithdraw";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Binance withdraw`,
    children: <BinanceWithdraw />,
  },
  {
    key: "2",
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];

const App: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;

export default App;
