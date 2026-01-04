import mongoose, { model } from "mongoose";


const UserSchema = mongoose.Schema({
    email: {type: String, require: true},
    password: { type: String, require: true},
    username: {type: String, require: true},
    fullname: {type: String, require: true},
    age: {type: String, require: true},
    bloodType: {type: String, require: true},
    location: {type: String, require: true},
    phone: {type: String},
    userType: {
        type: String,
        require: true
    },
    status: { type: String, default: 'active'}
},{ timestamps: true })


export default model('User', UserSchema)