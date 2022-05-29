import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

const { Column, ColumnGroup } = Table;

interface DataType {
  ID: number;
  title: string;
  description: string;
  town: string;
  peoplelimit: number;
  requester: {
    name: string;
    surname: string;
  };
}
const RequestTable: FC<{
  setShowTable: Dispatch<SetStateAction<boolean>>;
  setCurrentRequestID: Dispatch<SetStateAction<number>>;
}> = ({ setShowTable, setCurrentRequestID }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const fetchData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:8080/secured/eventrequests")
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
        removeCookie("token");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Table
      dataSource={data}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (rowIndex) {
              setCurrentRequestID(record.ID);
              console.log(record.ID);
              setShowTable(false);
            }
          },
        };
      }}
    >
      <Column title={"İsim"} dataIndex={"title"} />
      <Column title={"Açıklama"} dataIndex={"description"} />
      <Column title={"Kontenjan"} dataIndex={"peoplelimit"} />
      <Column title={"Belediye"} dataIndex={"town"} />
      <Column title={"Etkinlik Türü"} dataIndex={"eventType"} />
    </Table>
  );
};

export default RequestTable;
