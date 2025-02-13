/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useState, useEffect, useRef } from "react";

import {format} from 'date-fns';

import {serverAddress, serverPort} from "App.js"

// a function to convert date to MySQL format
function getDate(date){
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`
}

export default function data(employee, chosenDate) {

  const [absency, setAbsency] = useState([]); // used to store the absency data for a given date
  const abortControllerRef = useRef(null); // used for the cleanup function for fetching data from the server inside useEffect()

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  // part of the template in case it is useful
  /*const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );*/

  // the absency data from all employees to be displayed
  const employeeAbsency = employee.map(e => {
    const absencyData = absency.filter(a => a.employeeID === e.id) // get the absency data for a given employee

    let absencyDisplay = {}; // the absency data for a given employee converted into a format to be displayed

    // if absency data for that employee exists
    if(absencyData[0]){
      // the clockin and clockout times (if exists)
      const clockin = absencyData[0].clockin && new Date(absencyData[0].clockin);
      const clockout = absencyData[0].clockout && new Date(absencyData[0].clockout);

      // calculate duration if both clockin and clockout are recorded
      let duration;
      if(clockin && clockout){
        let timeDiff = clockout.getTime() - clockin.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        duration = hours + " h " + minutes + " m " + seconds + " s";
      }

      absencyDisplay = {
        clockin: clockin ? format(clockin, "HH:mm:ss") : "-",
        clockout: clockout ? format(clockout, "HH:mm:ss") : "-",
        duration: duration ?? "-",
        location: absencyData[0].location ? (absencyData[0].location.valueOf() ?? "-") : "-",
        message: absencyData[0].message ? (absencyData[0].message.valueOf() ?? "-") : "-",
      }
    }else{
      absencyDisplay = {
        clockin: "-",
        clockout: "-",
        duration: "-",
        location: "-",
        message: "-",
      }
    }

    return {
      name: <Author image={team2} name={e.name} email="example@gmail.com" />,
      ...absencyDisplay,
    }
  })

  const date = getDate(chosenDate); // convert the chosenDate to MySQL format

  // everytime the chosen date changes, fetch absency data from that date from the database
  useEffect(() => {
    fetch(`http://${serverAddress}:${serverPort}/get-absency${date}`,{credentials: 'include'})
      .then(res => res.json())
      .then(data => setAbsency(data))
      .catch(error => console.error(error));

    // clean up fetch
    return () => {
      if(abortControllerRef.current){
        abortControllerRef.current.abort();
      }
    }
  }, [date]);

  abortControllerRef.current = new AbortController;

  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "clock in", accessor: "clockin", align: "center" },
      { Header: "clock out", accessor: "clockout", align: "center" },
      { Header: "duration", accessor: "duration", align: "center" },
      { Header: "location", accessor: "location", align: "center" },
      { Header: "message", accessor: "message", align: "center" },
    ],
    rows: employeeAbsency
  }

  // part of the template  in case it is useful
  /*
  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
      { Header: "act", accessor: "act", align: "center" },
    ],

    rows: [
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        function: <Job title="Manager" description="Organization" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            new author
          </MDTypography>
        ),
      },
    ],
  };*/
}
