import { Schema } from 'mongoose';
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        default: ''
    },
    lastName: {
        type: String,
        require: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        dropDups: true,
        default: ''
    },
    creditCard: {
        type: String,
        require: true,
        default: ''
    },
    password: {
        type: String,
        require: true,
        default: ''
    },
    campaingsThatHelped: [{
        idCampaing: String
    }]
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next: any) {
    const user: any = this;
    const hash = await bcrypt.hash(user.password, 12);
    user.password = hash;
    next();
});

export default UserSchema;