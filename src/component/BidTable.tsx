import * as React from "react";
import AxiosPost from "../tool/AxiosTool";
import { BidAPIUrl } from "../config";
import storage from "local-storage-fallback";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function BidTable({ data }: any) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "categoryFk",
      headerName: "Category",
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.categoryFk.name,
    },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params: GridRenderEditCellParams) => (
        <img src={params.row.image} alt="" width="80" height="80" />
      ),
    },
    { field: "productName", headerName: "Product Name", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "deadline", headerName: "Deadline", width: 180 },
    {
      field: "lastPrice",
      headerName: "Last Price",
      type: "number",
      width: 180,
      renderCell: (params: GridRenderEditCellParams) => (
        <div id={"product-" + params.row.id + "-last-price"}>
          {params.row.lastPrice
            ? "HKD " + params.row.lastPrice
            : "No One Bid Now"}
        </div>
      ),
    },
    {
      field: "myBidPrice",
      headerName: "My bid Price",
      type: "number",
      width: 180,
      editable: true,
    },
    {
      field: "",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderEditCellParams) => (
        <Button
          // id={params.id}
          onClick={(e) => {
            handleBid(params.row.id, params.row.myBidPrice);
          }}
          variant="contained"
        >
          bid now!!
        </Button>
      ),
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const navigate = useNavigate();
  function handleBid(productId: any, bidPrice: any) {
    console.log(`productId: ${productId}`);
    console.log(`bidPrice: ${bidPrice}`);
    AxiosPost(BidAPIUrl(), {
      token: storage.getItem("token"),
      productId: parseInt(productId),
      bidPrice: parseFloat(bidPrice),
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
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        rowHeight={100}
      />
    </div>
  );
}

export default BidTable;
