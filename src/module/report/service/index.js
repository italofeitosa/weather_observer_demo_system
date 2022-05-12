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
};

export default ReportService;
