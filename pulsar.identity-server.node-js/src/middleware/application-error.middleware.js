function errorHandling(err, req, res,next) {
    console.log(err);
    res.status(500).send("Server Error" + err.message);
}


module.exports = {
    errorHandling: errorHandling
}