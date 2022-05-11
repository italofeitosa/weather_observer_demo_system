import Server from './server';
import DBConnector from './db_connector';
import { CronJob } from 'cron';

DBConnector.createConnection().then(async () => {
    try {       
        console.log("DB started...");       
        
        //TODO CronJob
        new CronJob(
            //`00 ${this.hour} * * *`,
            `0-59/5 * * * *`, //Reunning every 5 minutes
            () =>{console.log("Job is Running...")},
            null,
            true,
            'America/Fortaleza',
          );

        Server.start();

    } catch (error) {
        console.log(error);
    }
});