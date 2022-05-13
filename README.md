
<h1 align="center"> Weather Observer Demo System</h1>

Table of contents
=================
<!--ts-->
   * [About](#About)
   * [Technologies](#Technologies)
   * [Installation](#Installation)
     * [Installation by Chocolatey](#Installation-by-chocolatey)
     * [Normal installation without Chocolatey](#normal-installation-without-chocolatey)
   * [How to use](#how-to-use)
      * [Pre Requirements](#pre-Requirements)
      * [.env File](#.env-file)
      * [Install Project Dependencies](#install-project-dependencies)
      * [Start the Application in DEV mode](#start-the-application-in-dev-mode)      
  * [Using the APIs](#using-the-apis)
      * [Authentication and User](#authentication-and-user)
<!--te-->

## **About**
----------
Application created in NodeJs to observe the temperature variation of selected cities.

## **Technologies**
The application uses the following technologies:

* [JavaScript](https://ecmascript.org/)
* [MongoDB](https://www.mongodb.com/en)
* [TypeORM](https://typeorm.io/)
* [Yarn](https://yarnpkg.com/)
* [Node.js](https://nodejs.org/en/)
  * Express
  * Json Web Token -> jsonwebtoken
  * Axios
  * Cors
  * Cron
  * Eslint
  * Validator
  * Babel
  * Nodemon


## **Installation**
----------
For the application to work, you will need to install Nojde.js and Yarn. To facilitate the installation, we use the [Chocolatey](https://chocolatey.org/) package manager to install whatever is necessary for the application.

### **Installation by Chocolatey**

* You can [install Chocolatey](https://chocolatey.org/install) through this tutorial;
* To install Node.js LTS open your PowerShell as administrator and run the following code:
  
  ```> choco install nodejs-lts```

  If you prefer access link:[Install Node.js LTS](https://community.chocolatey.org/packages/nodejs-lts)
  
* To install YARN open your PowerShell as administrator and run the following code:

    ```> choco install yarn```
 
    If you prefer access link: [Install YARN](https://community.chocolatey.org/packages/yarn)


### **Normal installation without Chocolatey**

* You can install Node.js via the [link](https://nodejs.org/en/download/).
 
    I recommend the LTS version

* You can install YARN by following the tutorial via the [link](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).
  
    It is necessary to try to have installed Node with npm package manager


## **How to use**
----------
### **Pre Requirements**

#### **.env File**
For the application to work it is necessary to have an .env file containing the URLs, Database Url, User Settings and etc...

The application used the following template .env file:
```
# Server Environment
NODE_ENV=test
PORT=3000
ALLOWED_ORIGINS=http://localhost/

# Auth Sing User
SECRET=
TIME_EXPIRES=

# Database Configuration
DB=mongodb
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_URL_1=
DB_URL_2=
DB_URL_3=

# API OpenWeather connection
API_HOST=
API_ID=
CELSIUS_TEMP_UNIT=
FAHRENHEIT_TEMP_UNIT=
KELVIN_TEMP_UNIT=

# Status Request
HTTP_STATUS_OK=
```

Note 1: Attention! If you already have an .env file, don't forget to put it in the project root and check if the file has a dot at the beginning.

Note 2: About the Bank Connection Url, you can see in the project's [config.js](https://github.com/italofeitosa/weather_observer_demo_system/blob/main/src/config.js) file.

#### **Install Project Dependencies**
After configuring the .env, we will need to install the project's dependencies.
Open the terminal inside the project and run the following command:

```
> yarn 
``` 
or 

```
> yarn install 
```

#### **Start the Application in DEV mode**
After installing the project's dependencies, you can start your application server.
To do this, run the following command:

```
> yarn start:dev
```
After the command is executed, your finish will print something like this, meaning that the application server is running.

```
yarn run v1.22.15
$ nodemon --exec babel-node ./src/index.js
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node ./src/index.js`
(node:4708) [MONGODB DRIVER] Warning: Top-level use of w, wtimeout, j. Use writeConcern instead.
(Use `node --trace-warnings ...` to show where the warning was created)
DB started...
Job is Running...
Server running on port 3000...
```
It is possible to verify that the Database was started, Job is running and the Server is running.


## **Using the APIs**
----------
For API calls, the Google Chrome plugin **Talend API Tester - Free Edition** was used to test. In the Tester API we were able to create a project with all the server's endPoits.

**To install the Plugin**, just click on the [Link](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=pt-BR) and add it to Google Chrome

![API Tester](https://lh3.googleusercontent.com/ME7HkZgscZ8PHVRcqp7sS4XjRrR_YcD6UDTtB53OMZKm1TTB_DNkJ1vnPt3MvdsnND_SeHKNaYyqoXTta1jRuM4qIjE=w640-h400-e365-rj-sc0x00ffffff)

Follow the [Link](https://github.com/italofeitosa/weather_observer_demo_system/blob/main/examples/wods_project.json) of the **Api Tester project**, just import the Json.

**If you choose Postman**, no problem, both work similarly. You can use the same examples.


### **Authentication and User**
----------
![Authentication/User](https://github.com/italofeitosa/weather_observer_demo_system/blob/main/examples/authentication_user.PNG)
#### **API authentication**
Api to log in, in it you will pass the user password in the body to authenticate and get the authorization token to use in other requests.

Ex: Send in Body:
``` json
{

 "email": "email@gmail.com",
 "password": "teste@123456"
  
}
```

![Request Authentication](https://github.com/italofeitosa/weather_observer_demo_system/blob/main/examples/api_authentication.PNG)

You can get the Token in the Response Header, as shown in the image:

![Response Authentication](https://github.com/italofeitosa/weather_observer_demo_system/blob/main/examples/response_authentication.PNG)


follow the json response [Link](https://github.com/italofeitosa/weather_observer_demo_system/blob/main/examples/login.json).