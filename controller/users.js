const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const validateEntry = require("./controllerServices.js/validator");

function GetUser(req, res) {
    UserModel.findOne({player_id: req.params.id},(err, user)=>{
        if(err){
            res.status(400)
            res.json({message: 'Something went wrong'});
        }
        res.status(202)
            if(user){
                return res.json({response: user, exists: true});
            }else{
                return res.json({response: "User not found", exists: false});
            }
        })
}

async function AddUsers(req, res) {
    res.status(202)
    try{
        UserModel.init()
        let user = new UserModel({_id: new mongoose.Types.ObjectId(), ...req.body});

        if(validateEntry(res, user)){
            user.save().then(()=>{
                res.json({message: 'Users Added Successfully'});
            }).catch(err => {dbError(res,err); console.log(err)})
        }
    } catch(err) {
        dbError(res);
    }
}

async function dbError(res,err){
    res.status(500)
    res.json({message: 'Something went wrong. DB error'});
}

module.exports = { GetUser, AddUsers };