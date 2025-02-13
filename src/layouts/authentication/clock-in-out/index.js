/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import PropTypes from "prop-types";
import {format} from 'date-fns';

import {serverAddress, serverPort} from "App.js"

function Basic({employee}) {
  // rememberMe is from the template
  /*
  const [rememberMe, setRememberMe] = useState(false); 

  const handleSetRememberMe = () => setRememberMe(!rememberMe); */

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const [absency, setAbsency] = useState([]); // today's absency data so that we know who has clocked in / out

  const [timeDiff, setTimeDiff] = useState(0); // time since clock in

  // get today's absency data to determine if an employee has clocked in and when
  useEffect(() => {
    fetch(`http://${serverAddress}:${serverPort}/get-today`)
      .then(res => res.json())
      .then(data => setAbsency(data))
      .catch(error => console.error(error));
  }, [])

  // callback function to handle when an employee clocks in
  function handleClockin(){
    // request clock in to the database
    fetch(`http://${serverAddress}:${serverPort}/clockin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          location,
        }),
      }
    )
      .then(() => {
        // send the message to the database (if exists)
        if(message){
          fetch(`http://${serverAddress}:${serverPort}/message`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userID,
                message,
              }),
            }
          )
        }
      })
      .then(() => fetch(`http://${serverAddress}:${serverPort}/get-today`)) // get the updated absency data
      .then(res => res.json())
      .then(data => setAbsency(data)) // update the absency data
      .then(() => {
        // empty the form
        setName("");
        setLocation("");
        setMessage("");
      })
      .catch(error => console.error(error));
  }

  // callback function to handle when an employee clocks out
  function handleClockout(){
    // request clockout to the database
    fetch(`http://${serverAddress}:${serverPort}/clockout`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
        }),
      }
    )
      .then(() => {
        // empty the form
        setName("");
        setLocation("");
        setMessage("");
      })
      .catch(error => console.error(error));
  }

  // callback function to handle when an employee sends message
  function handleSendMessage(){
    // send message to the database
    fetch(`http://${serverAddress}:${serverPort}/message`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          message,
        }),
      }
    )
      .then(() => {
        // empty the form
        setName("");
        setLocation("");
        setMessage("");
      })
      .catch(error => console.error(error));
  }

  // check if the name in the form matches an employee name
  let match = false;
  let userID = "";
  employee.forEach(e => {
    if(e.name === name){
      match = true;
      userID = e.id;
    }
  });

  // check if the employee has clocked in and record the clock in time
  let hasClockin = false;
  let time;
  if(match){
    absency.forEach(a => {
      // if the user has clocked in
      if(a.employeeID === userID && a.clockin){
        hasClockin = true;
        time = new Date(a.clockin);
      }
    })
  }

  // calculate the time since clock in
  useEffect(() => {
    const id = setInterval(() => {
      if(hasClockin){
        setTimeDiff(new Date() - time);
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  },[hasClockin, time])

  // convert the time since clock in into hours, minutes, and seconds
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Clock in / Clock out
          </MDTypography>
          {/*
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                type="text" 
                label="Name" 
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="text" 
                label="Location" 
                fullWidth
                value={location}
                onChange={e => setLocation(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="text" 
                label="Message" 
                fullWidth
                value={message}
                onChange={e => setMessage(e.target.value)} />
            </MDBox>
            {/*
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth />
            </MDBox>*/}
            {/*
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            */}
            <MDBox mt={4} mb={1}>
              {match && 
              (hasClockin ? 
                (<><MDTypography>Current Session: {hours}h {minutes}m {seconds}s </MDTypography>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleClockout}>clock out</MDButton></>):
                <MDButton variant="gradient" color="info" fullWidth onClick={handleClockin}>clock in</MDButton>  
              )}
            </MDBox>
            <MDBox mt={4} mb={1}>
              {match && !location && <MDButton variant="gradient" color="info" fullWidth onClick={handleSendMessage}>send message</MDButton>}
            </MDBox>
            {/*
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

Basic.propTypes = {
  employee: PropTypes.array
};

export default Basic;
