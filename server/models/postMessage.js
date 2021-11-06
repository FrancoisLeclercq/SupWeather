import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    city: String,
    country: String,
    name: String,
    creator: String,
    data: [String],
    selectedFile: String,
    favorite: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;