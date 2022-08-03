# DevStudy Client

This application is the client for the FixMyVars study.
The source code can be found in the **src** directory.

## Instructions

1. Use the **.env** file to configure the application.
    - Set the entry **REACT_APP_API_ORIGIN** to the URL of the backend server (if you want to use mock requests for testing, leave this field empty: REACT_APP_API_ORIGIN= ).
    - If you want to host the client on a different basename (e.g. www.fixmyvars.de/study), set the **REACT_APP_BASENAME** entry to **study**.
2. Run the following command to install all required dependencies.
```
npm install
```
3. Run the following command to build the production-ready application.
```
npm run build
```
4. Using a webserver of your choice, you can now serve the **build** folder, which contains the production-ready application.

\
Instead of using a webserver, a development server can be started by running the following command after step 2:
```
npm start
```
This will automatically open a browser window containing the application. Remember to set REACT_APP_API_ORIGIN to an empty value to use mock requests. 


