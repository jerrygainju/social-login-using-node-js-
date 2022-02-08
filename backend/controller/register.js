
const User = require('../model/user')
const bcrypt = require('bcrypt')
const validator = require('email-validator');

module.exports = async (req,res) => {
    try {
        
        const { name, email, password } = req.body;
        
        if (!(email && password && name)) {
            res.status(400).json({
                message:"All input are required"});
        }
        if(validator.validate(email)){
        const oldUser = await User.findOne({ email });
               
        if (oldUser) {
            return res.status(409).json({
                message:'User already regisered, please login'});
        }
    }else{
        return res.status(400).json({message: 'invalid email'})
    }
     
       const encryptedPassword = await bcrypt.hash(password, 10);
       
    
        const user = await User.create({
            name,
            email,
            password: encryptedPassword,
        });
        return res.status(401).json(user);
        
    
    } catch (err) {
        console.log(err);
    }
}