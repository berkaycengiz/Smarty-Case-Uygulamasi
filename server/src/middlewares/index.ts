import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken, getUserById } from '../db/users';
import { getPostById } from '../db/posts';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> =>{
    try{
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId){ 
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403);
        }

        next();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isPostOwner = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try{
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        const currentUser = await getUserById(currentUserId);

        if(!currentUserId){
            return res.sendStatus(403);
        }

        const post = await getPostById(id);

        if(!post){
            return res.sendStatus(404);
        }
        
        if(post.author.toString() !== currentUser.username.toString()){
            return res.sendStatus(403);
        }

        return next();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});
        return next();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};