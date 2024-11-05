const jwt = require('jsonwebtoken')

//middleware create

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwt middleware");
    //get the token from req header's authorization key    
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    // verify steps
    if(token)
    {
        try
    {
        const jwtResponse = jwt.verify(token, process.env.JWT_PASSWORD)
        console.log(jwtResponse);
        req.userId = jwtResponse.userId
        next()  //moves the contgroller to next middleware
    }
    catch
    {
        res.status(401).json("Authentication failed. Please login to add tasks")
        
    }
    }
    else
    {
        res.status(406).json(" AUTHENTICATION TOKEN MISSING")
    }

}

module.exports = jwtMiddleware