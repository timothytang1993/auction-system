import AxiosPost from "../tool/AxiosTool";
import { BidAPIUrl } from "../config";
import storage from "local-storage-fallback";
import { useNavigate } from "react-router-dom";

function BidItem({ data }: any) {
  const navigate = useNavigate();
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const productId = (e.target as HTMLButtonElement).id;
    AxiosPost(BidAPIUrl(), {
      token: storage.getItem("token"),
      productId: parseInt(productId),
      bidPrice: parseFloat(
        (document.getElementById(`bid-${productId}`) as HTMLInputElement).value
      ),
    }).then((res) => {
      if (res.data.code === "S000") {
        console.log("success order bid");
        window.location.reload();
      } else {
        console.log("fail order bid");
        navigate("/error");
      }
    });
  }

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.categoryFk.name}</td>
      <td>
        <img src={data.image} alt="" width="200" height="200" />
      </td>
      <td>{data.productName}</td>
      <td>{data.description}</td>
      <td>{data.deadline}</td>
      <td id={"product-" + data.id + "-last-price"}>
        {data.lastPrice ? "HKD " + data.lastPrice : "No One Bid Now"}
      </td>
      <td>
        HKD
        <input
          id={`bid-${data.id}`}
          type="number"
          min="0.01"
          step="0.01"
          defaultValue={data.deadline}
        />
      </td>
      <td>
        <button
          id={data.id}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          I want to bid now!!
        </button>
      </td>
    </tr>
  );
}

export default BidItem;
