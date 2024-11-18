import express from "express";
import { getPosts, createPost, getPostById, deletePostById } from "../db/posts";
import { getUserBySessionToken } from '../db/users';

export const getAllPosts = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const posts = await getPosts().sort({createdAt:-1});

        return res.status(200).json(posts);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const createNewPost = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const currentUser = await getUserBySessionToken(sessionToken);

        if(!currentUser){
            return res.sendStatus(403);
        }

        const {title, content} = req.body;

        if (!title || !content){
            return res.sendStatus(400);
        }

        const author = currentUser.username;

        const post = await createPost({
            title,
            content,
            author,
        });

        return res.status(200).json(post).end;
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updatePost = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;
        const {title, content} = req.body;

        if(!title || !content){
            return res.sendStatus(400);
        }

        const post = await getPostById(id);

        post.title = title;
        post.content = content;

        await post.save();

        return res.status(200).json(post).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deletePost = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const deletedPost = await deletePostById(id);

        return res.json(deletedPost);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getPost = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const post = await getPostById(id);

        if(!post){
            return res.sendStatus(404);
        }

        return res.status(200).json(post);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};