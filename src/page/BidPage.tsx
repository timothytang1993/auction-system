import storage from "local-storage-fallback";
import BidItem from "../component/BidItem";
import LogoutButton from "../component/LogoutButton";
import data from "../component/data.json";

function Bid() {
  return (
    <div className="Bid">
      {storage.getItem("name") && <div>{storage.getItem("name")}</div>}
      <LogoutButton></LogoutButton>
      <table>
        <tbody>
          <tr>
            <td>id</td>
            <td>Product Name</td>
            <td>Image</td>
            <td>Last price</td>
            <td>My bid Price</td>
            <td>Action</td>
          </tr>
          {data.map((d) => (
            <BidItem key={d.id} data={d} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bid;
