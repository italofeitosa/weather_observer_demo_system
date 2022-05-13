
import ReportController from "./controller";
import Security from "../security";

const ReportRouter = (app) => {
   app.get('/report/reportbycity/:email/:city', Security.verifyJWT, ReportController.reportByCity);
}

export default ReportRouter;
