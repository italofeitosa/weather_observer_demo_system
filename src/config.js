import dotenv from "dotenv";

dotenv.config({
  path: process.env === "dev" ? ".env.testing" : ".env",
});

const Config = {

  env: process.env.NODE_ENV,

  portServer: process.env.PORT,

  allowedOrigins: process.env.ALLOWED_ORIGINS,

  database: process.env.DB,

  databaseName: process.env.DB_NAME,

  databaseUser: process.env.DB_USER,

  databasePassword: process.env.DB_PASS,

  databaseHost: process.env.DB_HOST,

  databaseUrl: process.env.DB_URL_1 + process.env.DB_USER + ":" + process.env.DB_PASS + process.env.DB_URL_2 + process.env.DB_NAME + process.env.DB_URL_3,

  openWeatherHost: process.env.API_HOST,

  openWeatherAppId: process.env.API_ID,

  HTTP_STATUS_OK: process.env.HTTP_STATUS_OK,

  secret: process.env.SECRET,
  
  timeExpires: process.env.TIME_EXPIRES,

  celsiusTemp: process.env.CELSIUS_TEMP_UNIT,

  fahrenheitTemp: process.env.FAHRENHEIT_TEMP_UNIT,

  kelvinTemp: process.env.KELVIN_TEMP_UNIT,

};

export default Config;
