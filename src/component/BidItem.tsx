import AxiosPost from "../tool/AxiosTool";
import { BidAPIUrl } from "../config";
import storage from "local-storage-fallback";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import NumberFormat, { InputAttributes } from "react-number-format";

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
        alert("success to bid");
        console.log("success order bid");
      } else {
        alert("fail to bid");
        console.log("fail order bid");
        navigate("/error");
      }
    });
  }

  // function NumberFormatCustom(props: any, ref: any) {
  //   const { onChange, ...other } = props;

  //   return (
  //     <NumberFormat
  //       {...other}
  //       getInputRef={ref}
  //       // onValueChange={(values) => {
  //       //   onChange({
  //       //     target: {
  //       //       name: props.name,
  //       //       value: values.value,
  //       //     },
  //       //   });
  //       // }}
  //       thousandSeparator
  //       isNumericString
  //       prefix="$"
  //     />
  //   );
  // }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          <TableRow
            key={`bid-${data.id}`}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {data.id}
            </TableCell>
            <TableCell align="right">{data.categoryFk.name}</TableCell>
            <TableCell align="right">
              <img src={data.image} alt="" width="200" height="200" />
            </TableCell>
            <TableCell align="right">{data.productName}</TableCell>
            <TableCell align="right">{data.description}</TableCell>
            <TableCell align="right">{data.deadline}</TableCell>
            <TableCell align="right" id={"product-" + data.id + "-last-price"}>
              {data.lastPrice ? "HKD " + data.lastPrice : "No One Bid Now"}
            </TableCell>
            <TableCell align="right">
              <TextField
                label="react-number-format"
                name="numberformat"
                id="formatted-numberformat-input"
                // InputProps={{
                //   inputComponent: NumberFormatCustom as any,
                // }}
                variant="standard"
              />
            </TableCell>
            <TableCell align="right">{data.deadline}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  // return (
  //   <tr>
  //     <td>{data.id}</td>
  //     <td>{data.categoryFk.name}</td>
  //     <td>
  //       <img src={data.image} alt="" width="200" height="200" />
  //     </td>
  //     <td>{data.productName}</td>
  //     <td>{data.description}</td>
  //     <td>{data.deadline}</td>
  //     <td id={"product-" + data.id + "-last-price"}>
  //       {data.lastPrice ? "HKD " + data.lastPrice : "No One Bid Now"}
  //     </td>
  //     <td>
  //       HKD
  // <input
  //   id={`bid-${data.id}`}
  //   type="number"
  //   min="0.01"
  //   step="0.01"
  //   defaultValue={data.deadline}
  // />
  //     </td>
  //     <td>
  //       <button
  //         id={data.id}
  // onClick={(e) => {
  //   handleClick(e);
  // }}
  //       >
  //         I want to bid now!!
  //       </button>
  //     </td>
  //   </tr>
  // );
}

export default BidItem;
