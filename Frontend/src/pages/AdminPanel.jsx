import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect,useState } from 'react';

const columns = [
  { field: 'name', headerName: 'Customer Name', width: 180 },
  { field: 'organisation', headerName: 'Organisation Name', width: 250 },
  { field: 'mobileNo', headerName: 'Contact Number', width: 180 },
  { field: 'message', headerName: 'Message by Customer', width: 380},

];

const paginationModel = { page: 0, pageSize: 5 };

export default function AdminPanel() {
let [data,setData]=useState([]);
let [rows,setRows]=useState([]);

  const getdata=async()=>{
    try{
const response=await axios.get("http://localhost:8080/contact");
console.log(response.data.data);
if(response.data)
{
  setData(response.data.data);
}
    }
    catch(err)
    {
      console.log(err);
    }
  }
    useEffect(()=>{
      getdata();
    
    },[]);


  useEffect(() => {
    if (data.length > 0) {
      const mappedRows = data.map((item, index) => ({
        id:item._id,
        name: item.name,
        organisation: item.organisation,
        mobileNo: item.mobileNo,
        message: item.message,
       
      }));
      setRows(mappedRows);
    }
  }, [data]);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
