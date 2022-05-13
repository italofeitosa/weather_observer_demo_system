import { ObjectIdColumn } from "typeorm";
import DBConnector from "../../../db_connector";

const ReportService = {
  createReport: async (report) => {
    try {
      delete report.id;
      const reportRepository = await DBConnector.getReportRepository();
      const reportCreated = reportRepository
        .save({
          city_name: report.city_name,
          id_city: report.id_city,
          email: report.email,
          variation_temp: report.variation_temp,
          current_temp: report.current_temp,
          diff_temp: report.diff_temp,
          observe_date: report.observe_date,
        })
        .then((report) => {
          console.log("Report of City has been Created: ", report);
          return report;
        })
        .catch((error) => Promise.reject(error));

      return reportCreated;
    } catch (error) {
      console.log(error);
      return error.writeErrors[0];
    }
  },

  findReport: async (report) => {
    try {
      const reportRepository = await DBConnector.getReportRepository();
      const reportListCities = await reportRepository
        .find({
          email: report.email,
          city_name: report.city,
        })
        .then((listCity) => {
          return listCity;
        })
        .catch((error) => Promise.reject(error));

      reportListCities.forEach((item) => {
        delete item.id;
        delete item.id_city;
        delete item.email;
        delete item.createdAt;
      });

      return reportListCities;
    } catch (error) {
      console.log(error);
      return error.writeErrors[0];
    }
  },

  deleteById: async (id) => {
    try {
      console.log("deleteById...");
      const reportRepository = await DBConnector.getReportRepository();
      let deleteMessage = {delete: "ok", message: "The report associated with the city has been deleted"};

      const report = await reportRepository.findOne({
        id_city: ObjectIdColumn(id)
      }).then((report) => {
        return report;
      })
      .catch((error) => Promise.reject(error));

      if(!report) throw {delete: "not found", message: "There is no Report associated with the city not found!!"}

      console.log("find Report: " + report);
      const reportDeleted = await reportRepository
        .delete({city_name: ObjectIdColumn(report.city_name)})
        .then((reportDeleted) => {
          return reportDeleted;
        })
        .catch((error) => Promise.reject(error));

      if (reportDeleted.affected == 0) throw {delete: "not found", message: "There is no Report associated with the city to delete!"}
      
      return deleteMessage;

    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default ReportService;
