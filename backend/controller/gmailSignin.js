const User = require('../model/user')
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports =  (req,res) => {
    try{
    const { tokenId } = req.body;

   client.verifyIdToken({ idToken: tokenId, audience: process.env.CLIENT_ID })
        .then(response => {
            const { email_verified, name, email } = response.payload;
            console.log(response.payload)
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: "something is wrong"
                        })
                    } else {
                        if (user) {
                            const token = jwt.sign({ user_id: user._id }, 'secretkey', { expiresIn: '30s' })
                            const { _id, name, email } = user;

                           return res.json({
                                token,
                                user: { _id, name, email, }
                            })
                        } else {
                            //let password = email+'secretkey';
                            let newUser = new User({ name, email });
                            newUser.save((err, data) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: "something is wrong"
                                    })
                                }
                                const token = jwt.sign({ user_id: data._id }, 'secretkey', { expiresIn: '30s' })
                                const { _id, name, email } = newUser;

                                res.json({
                                    token,
                                    user: { _id, name, email  }
                                })
                            })

                        }
                    }
                })
            }
        })
        console.log(tokenId);
    }catch(err){
        console.log(err)
    }
    
    
}