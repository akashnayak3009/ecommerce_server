//Not found error handler

export const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404).json({ error: error.message });
    next(error);
  };
  
  //handle error
export const handleError =(err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        status:false,
        message:err?.message,
        stack:err?.stack,
    })
}