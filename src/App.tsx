import "./App.css";
import "antd/dist/antd.css";
import { Col, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import LoginForm from "./components/LoginForm";
import RequestDetails from "./components/RequestDetails";
import RequestTable from "./components/RequestTable";
import axios from "axios";
import LayoutComponent from "./components/Layout";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [requests, setRequests] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    //check cookies
    if (cookies.token) {
      setIsLoggedIn(true);
      axios.defaults.headers.common["Authorization"] = cookies.token;
      axios.defaults.baseURL = "http://localhost:8080/";
      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    }
    //fetch event requests
    axios.get("secured/eventrequests").then((response) => {
      setRequests(response.data);
    });
  }, [cookies.token]);

  if (!isLoggedIn) {
    return <LoginForm />;
  }
  return (
    <LayoutComponent
      setLoggedIn={setIsLoggedIn}
      RequestDetail={requests[id] ?? []}
      RequestDetailID={1}
    />
  );
}

export default App;
