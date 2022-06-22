const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
      try{
        const{email, password} = req.body;

        if(!(email && password)){
           return res.status(400).json({
                message: 'please fill require data'
            })
        }
        
        
        const user = await User.findOne({email})

     

        if(user &&(await bcrypt.compare(password, user.password))){
            const token = jwt.sign({user_id: user._id}, 'secretkey',{expiresIn:'7h'});
            const {_id, name, email} = user;
            
            return res.status(400).json({token,user: {_id, name, email}})
        }
        res.status(401).json({
            message: 'invalid email or password'
        })
      }  catch(err){
        console.log(err)
      }
    
}