function validateEntry(res, entry) {
    let validation = entry.validateSync()
    if(validation){
        let errors = Object.values(validation.errors);
        res.status(422)
        res.json({errors: errors});
        return false
    }else {
        return true
    }

}

module.exports = validateEntry;