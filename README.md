# Clock in Clock out Client
The template is from https://www.creative-tim.com/product/material-dashboard-react. There are some codes commented out with block comments. These codes are from the template that is not used right now but may be useful as a reference later. The readme file from the template is preserved in README-template.md.

## src/index.js
Contains the createRoot() and root.render() functions.

## src/app.js
The component called from src/index.js. The server address and port number are defined as a global constant here and exported to be used by the other components. Most of the contents of this file is from the template. The change I made here was I added useEffect() to fetch the employees names and ids from the server and pass them as props to the other components.

## src/routes.js
This defines the routes to the other components. Billing, RTL, and Notifications are from the template and are commented out.

## src/layouts/authentication/add-employee/index.js
This component is for adding a new employee to the database. It contains a form to send employee name to the server to be stored in the database. The username and password fields are not used yet.

## src/layouts/authentication/clock-in-out/index.js
This is to simulate clocking in and out. What this component does right now is it first queries the database for absency data from the server and displays the appropriate information based on the name input on the form (if the employee has clocked in, it displays the time since clock in). The user can then clock in / out and send their location and message to the server.

## src/layouts/authentication/sign-in/index.js
This contains a form with username and password. The username and password can then be sent to the server for the server to authenticate.

## src/layouts/authentication/components
preserved from the template

## src/layouts/authentication/reset-password
preserved from the template

## src/layouts/tables/index.js
Displays the table from src/layouts/tables/data/authorsTableData.js.

## src/layouts/tables/data/authorsTableData.js
Fetches absency data from the server for a given date. Every time the chosen date changes, it fetches new data from the server. It then transforms the data into a format to be displayed.

## src/layouts/tables/data/projectsTableData.js
preserved from the template

## src/layouts/profile/index.js
Just experimenting with fetching absency data from a given employee.

## src/layouts/qrcode/index.js
Fetches a QR code from the server every 10 seconds and displays it.

## src/examples/Navbars/DefaultNavbar/index.js
Displays the navbar for the add-employee, clock-in-clock-out, and sign-in pages.
 
