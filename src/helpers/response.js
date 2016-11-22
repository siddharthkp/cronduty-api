'use strict';

let handler = (status, content, cb) => {
    let response = {
        statusCode: status,
        body: JSON.stringify(content)
    };

    cb(null, response);
};

module.exports = handler;
