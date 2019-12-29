import { Schema } from 'mongoose';

const CampaingSchema = new Schema({
    shortName: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: "Active"
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true,
        default: 0
    },
    amountCollected: {
        type: Number,
        default: 0
    },
    donors: [],
    owner: {
        type: String,
        required: true
    },
    comments: [],
    totalLikes: {
        type: Number,
        default: 0
    },
    totalDislikes: {
        type: Number,
        default: 0
    },
    likesAndDislikes: [{
        owner: String,
        value: Number
    }]
});

export default CampaingSchema;