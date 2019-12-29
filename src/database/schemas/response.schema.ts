import { Schema } from 'mongoose';

const ResponseSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

export default ResponseSchema;