import ReportValidator from "../validation";
import ReportService from "../service";

import config from "../../../config";
const { HTTP_STATUS_OK } = config;

export default class ReportController {
    static reportByCity = async (req, res) => {
        try {
            const {email, city} = req.params;
            
            const validation = ReportValidator.validationReportByCityParams({email, city});
            if(validation) throw validation;

            const reportList = await ReportService.findReport({email, city});
            if(reportList.errmsg) throw reportList;            

            return res.status(parseInt(HTTP_STATUS_OK)).json(reportList);
            
        } catch (error) {
            console.log(error);
            return res.status(parseInt(400)).json(error);
        }
    };

}