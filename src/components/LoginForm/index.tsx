import React, { FC } from "react";
import { Form, Input, Button, Layout } from "antd";

import { useCookies } from "react-cookie";
import axios from "axios";

const { Header, Content } = Layout;

const LoginForm: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const onFinish = (values: any) => {
    console.log(values);
    axios
      .post(
        "http://localhost:8080/api/user/login",
        JSON.stringify({
          username: values.username,
          password: values.password,
        })
      )
      .then((response) => {
        setCookie("token", response.data.token, {
          path: "/",
          secure: false,
        });
      })
      .catch((err) => console.error(err));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed at login", errorInfo);
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header
        style={{
          color: "white",
          fontSize: "2rem",
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        Belediyem Admin Panel
      </Header>
      <Content style={{ marginTop: "15vh" }}>
        <Form
          name="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Kullanıcı Adı"
            name={"username"}
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı giriniz" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name={"password"}
            rules={[
              { required: true, message: "Şifrenizi girmeniz gerekmektedir." },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default LoginForm;
