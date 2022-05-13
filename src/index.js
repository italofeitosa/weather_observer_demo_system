import Server from "./server";
import DBConnector from "./db_connector";
import { CronJob } from "cron";
import CronJobConsultTemp from "./module/cron_job";

DBConnector.createConnection().then(async () => {
  try {
    console.log("DB started...");
    new CronJob(
      //`00 ${this.hour} * * *`,
      `0-59/5 * * * *`, //Reunning every 5 minutes
      ()=>{CronJobConsultTemp.consultTempCityObserver()},
      null,
      true,
      "America/Fortaleza"
    );
    console.log("Job is Running...")

    Server.start();

  } catch (error) {
    console.log(error);
  }
});
