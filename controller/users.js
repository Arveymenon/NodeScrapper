const UserModel = require("../models/UserModel");
const validateEntry = require("./controllerServices.js/validator");

function GetAll(req, res) {
        res.status(202)
        return res.json({message: 'User not found. Well yet'});
}

async function AddUsers(req, res) {
    res.status(202)
    let user = new UserModel({...req.body});
    if(validateEntry(res, user)){
        // await user.init().then(()=>UserModel.create(user),(error)=>{}).catch(err => {
        //     // console.log(err);
        // });
        // user.
        res.json({message: 'Users Added Successfully'});
    }
}

module.exports = { GetAll, AddUsers };