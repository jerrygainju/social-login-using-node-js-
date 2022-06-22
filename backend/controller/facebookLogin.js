

const User = require('../model/user');
const jwt = require('jsonwebtoken');

const fetch = require('node-fetch');
module.exports = async (req, res) =>{
    try{
        const { userID, accessToken } = req.body;
        let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
        await fetch(urlGraphFacebook, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                const { name, email } = response;
                User.findOne({ email }).exec((err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'something is wrong'
                        })
                    } else {
                        if (user) {
                            const token = jwt.sign({ user_id: user._id }, 'secretkey', { expiresIn: '2h' })
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
                                        error: "error"         
                                    })
                                    // console.log(err)
                                    
                                }
                                const token = jwt.sign({ user_id: data._id }, 'secretkey', { expiresIn: '2h' })
                                const { _id, name, email } = data;

                                res.json({
                                    token,
                                    user: { _id, name, email }
                                })
                            })

                        }
                    }
                });

            });

            console.log(accessToken)
    } 
    catch(err){
        console.log(err)
    }
    
   }

