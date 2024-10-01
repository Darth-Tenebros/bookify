const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "supersecuresecretkey";

const userModel = require('../../models/user_model');

const getUserByEmail = (email) => {
    return userModel.findOne({email:email});
}

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const generateJWTToken = async (user) => {

    return jwt.sign({
            id: user._id,
            role: user.role
        },
        SECRET_KEY,
        {
            expiresIn: '1h',
        }
    );
}


const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || ! password){
        return res.status(400).send({
            message: "you need to provide all details"
        })
    }

    let user = await getUserByEmail(email);
    user = user._doc;
    if(!user){
        return res.status(404).send({
            message: `no user with email ${email} has been found`
        })
    }

    
    const isValid = bcrypt.compareSync(password, user.password);
    if(isValid){
        const token = await generateJWTToken(user);
        
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 3600000
        })
        return res.status(200)
        .json({
            data: user.role,
            token: token
        })
    }

    return res.status(401)
    .send({
        message: "invalid credentials"
    });
}
module.exports = {login, generateJWTToken, hashPassword}