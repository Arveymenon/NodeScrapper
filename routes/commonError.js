var createError = require('http-errors');

function CommonError(router) {

    // catch 404 and forward to error handler
    router.use(function(req, res, next) {
        next(createError(404));
    });
    
    // c053b682-b617-4722-b25a-953b6d5fcd5e
    // error handler
    router.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.json({message: 'unknown error'});
    });    
}

module.exports = CommonError;