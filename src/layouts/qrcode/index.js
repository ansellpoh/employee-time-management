const { useEffect, useState } = require("react");
import { Card } from "@mui/material";
import { serverAddress, serverPort } from "App";
import MDBox from "components/MDBox";

// fetch QR code from the server and display it
function QrCode(){
  const [qrCode, setQrCode] = useState(null);

  // every 10 seconds, fetch a new QR code from the server
  useEffect(()=>{
    const id = setInterval(() => {
      fetch(`http://${serverAddress}:${serverPort}/generate-qr`)
        .then(res => res.json())
        .then(qr => setQrCode(qr.qrCode))
        .catch(error => console.error(error));
    }, 1000 * 10);
    return () => {
      clearInterval(id);
    };
  },[])
  console.log(qrCode);

  return(
    <Card>
      <MDBox mx={5} mt={5} p={10} mb={5} textAlign="center">
        {qrCode && <img src={qrCode} alt="QR Code" />}
      </MDBox>
    </Card>
  )
}

export default QrCode;