const logger = (req, res, next) => {
    console.log("Headers: ...")
    console.log(req.headers);
    console.log("Method: ...");
    console.log(req.method);
    console.log("Url: ...");
    console.log(req.url);
    // console.log(req);
    next();
}

module.exports = logger