// centralised error handling

const errorhandling=(err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).json({
        status:500,
        message:"Somethimng went wrong",
        error:err.message,
    });
}

export default errorhandling;