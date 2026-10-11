import mongoose from 'mongoose';
// import interviewReportModel from './docModel';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interviewReportModel' // Must match the model name 'Profile'
    }]
});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;
