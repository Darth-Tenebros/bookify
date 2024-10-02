const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecuresecretkey';


const verifyTokenMiddleWare = (req, res, next) => {
    let token = req.headers['authorization'];

    if(!token){
        return res.status(403)
                .send({
                    message: "no token provided"
                });
    }

    token = token.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401)
                    .send({
                        message: "unauthorised"
                    })
        }

        req.user = decoded;
        next();
    })
}

const authorizeRolesMiddleware = (roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403)
                    .send({
                        message: "forbidden"
                    })
        }
        next();
    }
}

module.exports = {verifyTokenMiddleWare, authorizeRolesMiddleware}