const jwt = require('jsonwebtoken');

const User = require('../model/user')


module.exports = async (req ,res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

         jwt.verify(req.token, 'secretkey')

            const promise = new Promise((resolve, reject) => {   
                if(req.token === 'undefined'){
                    reject(res.json({
                        message: 'invalid token'
                    }))
                }else {
                    const verifuUser = User.findOne({_id: User._id})
                    if(verifuUser){
                        resolve(next())
                    }else{
                        reject({
                            message: 'no user'
                        })
                    }
                }
            })
        promise.then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    

      }

    else {
        res.status(403).json({ message: 'token is not available' });
    }
}

        // let promise = new  Promise((resolve, reject) => {
        //     const verifyUser =  User.findOne({_id: verifyToken._id})
        //     if(verifyUser)
        //     resolve(verifyUser)
           
        // });
        // promise.then((result) => console.log(result))
        
          


    //         if (err) {
    //             return res.status(400).json({ message: 'invalid token' });
    //         } else {
    //           const login =  User.findOne({_id: userData._id})
    //             if(login){ 
    //                next()
    //             }
    //           else{
    //               res.status(401).json({
    //                   message: 'no users'
                      
    //               })
    //           }
    //         } 
    //     }); 
      
        
        
