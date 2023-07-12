const reset = require('./modelos/ResetPassword');

async function  getResetRequest(id) {
    const thisRequest = await reset.find({id: id}, (error,data) =>{
        if(error){
            console.log(error)
        } else {
            console.log(data)
        }
    })
    return thisRequest;
}

module.exports = {
    getResetRequest
}