import express from "express"
import { getAllPosts, createNewPost, updatePost, deletePost, getPost } from "../controllers/posts";
import { isAuthenticated, isPostOwner } from "../middlewares";

export default (router: express.Router) => {
    router.get('/posts', getAllPosts);
    router.get('/posts/:id', getPost);
    router.post('/posts', isAuthenticated, createNewPost);
    router.patch('/posts/:id', isAuthenticated, isPostOwner, updatePost);
    router.delete('/posts/:id', isAuthenticated, isPostOwner, deletePost);
};