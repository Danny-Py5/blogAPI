class CustomAPIError extends Error{
    constructor(errorCode, message){
        super(message);
        this.errorCode = errorCode;
    };
};
// a function to  generate instance of the custom error;
const createCustomAPIError = (code, msg) => {
    return new CustomAPIError(code, msg);
}; 

module.exports = {
    CustomAPIError,
    createCustomAPIError,
};
