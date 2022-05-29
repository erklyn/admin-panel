import { Layout, Menu, Breadcrumb, Descriptions, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import React, { PropsWithChildren, useState } from "react";
import { RequestDetailsPropTypes } from "../../types";
import RequestDetails from "../RequestDetails";
import RequestTable from "../RequestTable";
import { useCookies } from "react-cookie";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Etkinlik İstekleri", "1", <PieChartOutlined />),
  getItem("Yeni Yönetici oluştur", "2", <DesktopOutlined />),
];

const LayoutComponent: React.FC<PropsWithChildren<RequestDetailsPropTypes>> = ({
  children,
  setLoggedIn,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [navigationKey, setNavigationKey] = useState("1");
  const [showTable, setShowTable] = useState(true);
  const [currentRequestID, setCurrentRequestID] = useState(0);
  const handleOnClick: MenuProps["onClick"] = (e) => {
    setNavigationKey(e.key);
  };

  const handleExit = () => {
    removeCookie("token");
    if (setLoggedIn) setLoggedIn(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" />
        <Menu
          onClick={handleOnClick}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            fontSize: "2rem",
            color: "white",
            fontFamily: "monospace",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {" "}
          Belediyem Yönetici Paneli{" "}
          <Button type="primary" onClick={handleExit}>
            {" "}
            Çıkış{" "}
          </Button>
        </Header>
        <Content style={{ margin: "16px 16px" }}>
          {showTable || currentRequestID === 0 ? (
            <RequestTable
              setShowTable={setShowTable}
              setCurrentRequestID={setCurrentRequestID}
            />
          ) : (
            <RequestDetails
              RequestDetailID={currentRequestID}
              setCurrentRequestId={setCurrentRequestID}
            />
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>Takos Company @2022</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
