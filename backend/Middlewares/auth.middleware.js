const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const User = require('../Models/user.model')

const authUser = async (req,res,next) =>
{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try
        {
            const token = req.headers.authorization.split(" ")[1];
            // console.log(token);
            const decoded = jwt.verify(token, secretKey);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        catch(error)
        {
            res.send('Token failed');
        }
    }
    else
    {
        res.send('Invalid token');
    }
}

module.exports = authUser;