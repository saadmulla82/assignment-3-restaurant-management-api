const logger = (request, response, next) => {
    console.log(`${request.method} ${request.url} at ${new Date().toISOString()}`);
    next();
};

module.exports = logger;
