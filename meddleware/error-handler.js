const {CustomAPIError} = require('../error/customeError.js');

const errorHandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomAPIError){
        // i used errorCode instead of statusCode
        return res.status(err.errorCode).json({success: false, msg: err.message});
    }
    // if (err.name === 'CastError'){
    //     return res.status(400).json({success: false, msg: `request is bad`})
    // }
    return res.status(500).json({success: false, err });
}

 
module.exports = errorHandlerMiddleWare;
