const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "supersecuresecretkey";

const userModel = require('../../models/user_model');

const getUserByEMail = (email) => {
    return userModel.findOne({email:email});
}

const generateJWTToken = async (user) => {
    const user = await getUserByEMail(user);

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