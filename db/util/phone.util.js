exports = updatePhoneById = (phoneID, updateObject) => {
    return new Promise((resolve, reject) => {
        Article.findOneAndUpdate(
            {_id: phoneID}, 
            {$set: updateObject},
            {new: true}, 
            (err, updatedPhone) => {
            if (err) {
                reject(err);
            } else {
                resolve(updatedPhone);
            }
        });
    });
}