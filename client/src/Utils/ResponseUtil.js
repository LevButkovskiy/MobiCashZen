const ResponseSuccess = (callback, data) => {
    callback(true, data);
}

const ResponseError = (callback, data) => {
    callback(false, {
        error: {
            key: data.error.key,
            message: data.error.message
        }
    });
}

export const CreateError = (errorKey, errorMessage) => {
    return {
        error: {
            key: errorKey,
            message: errorMessage
        }
    };
}

export const Response = (callback, data) => {
    if (data.error) {
        console.log(data.error.message);
        errorHandler(data.error.key);
        ResponseError(callback, data)
    }
    else { 
        console.log(data);
        ResponseSuccess(callback, data)
    }
}

const errorHandler = (errorKey) => {
}
