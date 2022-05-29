import { Button, Card, Descriptions, Layout } from "antd";
import React, { CSSProperties, FC, useEffect, useState } from "react";
import { RequestDetail, RequestDetailsPropTypes } from "../../types";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";

const { Content } = Layout;

const gridStyle: CSSProperties = {
  width: "%25",
  textAlign: "center",
};

const RequestDetails: FC<RequestDetailsPropTypes> = ({
  RequestDetailID,
  setCurrentRequestId,
}) => {
  const [requestDetail, setRequestDetail] = useState<RequestDetail>(
    {} as RequestDetail
  );
  const getRequestDetails = async () => {
    try {
      const response = await axios.get(
        `secured/eventrequests/${RequestDetailID}`
      );
      setRequestDetail(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequestDetails();
  }, [RequestDetailID]);
  return (
    <Layout>
      <Content>
        <Button
          style={{ margin: "8px 8px " }}
          type="primary"
          shape="circle"
          size="large"
          icon={<LeftOutlined />}
          onClick={() => {
            if (setCurrentRequestId) {
              setCurrentRequestId(0);
            }
          }}
        ></Button>
        <Card title="Etkinlik Başvurusu" bordered={true}>
          <Card type="inner" title="Etkinlik İsmi">
            {requestDetail?.title}
          </Card>
          <Card type="inner" title="Açıklama">
            {requestDetail?.description}
          </Card>
          <Card type="inner" title="Etkinlik Tipi">
            {requestDetail?.eventType}
          </Card>
          <Card type="inner" title="Kontenjan">
            {requestDetail?.peoplelimit}
          </Card>
          <Card type="inner" title="Telefon Numarası">
            {requestDetail?.requester?.phone}
          </Card>
          <Card type="inner" title="Başvuran Vatandaş İsim Soyisim">
            {requestDetail?.requester?.name} {requestDetail?.requester?.surname}
          </Card>
          <Button style={{ margin: "15px 15px" }} type="primary">
            Etkinliği Sisteme Ekle
          </Button>
          <Button style={{ margin: "15px 15px" }} type="primary">
            Etkinliği Sil
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default RequestDetails;
