import storage from "local-storage-fallback";
import { useEffect, useState } from "react";
import BidItem from "../component/BidItem";
import LogoutButton from "../component/LogoutButton";
import { AxiosGet } from "../tool/AxiosTool";
import { ProductsAPIUrl, WebSocketUrl, ProductWebSocketUrn } from "../config";
import { over } from "stompjs";
import SockJS from "sockjs-client";

interface CategoryFk {
  id: number;
  enable: string;
  name: string;
}

interface Product {
  id: number;
  enable: string;
  productName: string;
  description: string;
  image: string;
  deadline: string;
  categoryFk: CategoryFk;
}

function Bid() {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    AxiosGet(ProductsAPIUrl()).then((res) => {
      if (res.data.code === "S000") {
        console.log("success get products list");
        setData(res.data.products);
      } else {
        console.log("fail get products list");
      }
    });
  }, []);

  if (data === undefined) {
    return <>Still loading...</>;
  }

  const socket = new SockJS(WebSocketUrl());
  const stompClient = over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe(ProductWebSocketUrn(), function (data) {
      let feedback = JSON.parse(data.body);
      if (feedback["code"] == "S000") {
        (
          document.getElementById(
            `product-${feedback["id"]}-last-price`
          ) as HTMLDivElement
        ).innerHTML = "HKD " + feedback["lastPrice"];
      }
    });
  });
  return (
    <div className="Bid">
      {storage.getItem("name") && <div>{storage.getItem("name")}</div>}
      <LogoutButton></LogoutButton>
      <table>
        <tbody>
          <tr>
            <td>id</td>
            <td>category</td>
            <td>image</td>
            <td>Product Name</td>
            <td>Description</td>
            <td>Deadline</td>
            <td>Last Price</td>
            <td>My bid Price</td>
            <td>Action</td>
          </tr>
          {data.map((d: any) => (
            <BidItem key={d.id} data={d} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bid;
