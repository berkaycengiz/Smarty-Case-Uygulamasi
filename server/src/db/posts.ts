import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, reqired: true},
    author: {type: String, required: true}
}, { timestamps: true });

export const PostModel = mongoose.model('Post', postSchema);

export const getPosts = () => PostModel.find();
export const getPostById = (id: string) => PostModel.findById(id);
export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((post) => post.toObject());
export const updatePostById = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate(id, values);
export const deletePostById = (id: string) => PostModel.findOneAndDelete({_id: id});