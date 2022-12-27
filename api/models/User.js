const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        require:true
    }
    
})

// const User = new mongoose.model('User', UserSchema)

// module.exports = User
export default UserSchema