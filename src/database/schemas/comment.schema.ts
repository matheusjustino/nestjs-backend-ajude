import { Schema } from 'mongoose';

const CommentSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    responses: []
});

export default CommentSchema;