var log4js = require('log4js');
var logger = log4js.getLogger();

const LOGGER_NAME = "MOBILOGGER 1.0";
var LOGGER_DELIMETER = " > ";

class mobiLogger {
    info(req, status, infoArr = []) {
        let linkTx = req.header('user-link') || "unknown user";
        let ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
        this.printInfo('INFO', status, linkTx, ip, [req.method, req.baseUrl, req._parsedUrl.path], infoArr)
    }

    error(req, status, infoArr = []) {
        let linkTx = req.header('user-link') || "unknown user";
        let ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
        
        this.printInfo('ERROR', status, linkTx, ip, [req.method, req.baseUrl, req._parsedUrl.path], infoArr)
    }

    printInfo(status, statusCode, linkTx, ip, requestArr, infoArr) {
        let exportStr = LOGGER_NAME + LOGGER_DELIMETER + status + LOGGER_DELIMETER + statusCode + LOGGER_DELIMETER + linkTx + LOGGER_DELIMETER + ip;
        requestArr.forEach(element => {
            exportStr += LOGGER_DELIMETER;
            exportStr += element;
        });
        infoArr.forEach(element => {
            exportStr += LOGGER_DELIMETER;
            exportStr += element;
        });
        logger.info(exportStr)
    }
}

module.exports = new mobiLogger();
