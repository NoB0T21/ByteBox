import { Request, Response } from "express";
import uuid from "uuid4";
import supabase from "../Db/supabase";
import { createfile, deletefiles, getfileBySearch, getfiles, getfiless, renamefiles, sharefiles, updatesharefiles } from "../services/file.service";
import {findUser, findUsers} from "../services/user.service"

export const uploadFile = async (request: Request, response: Response) => {
    const { file } = request;
    const { owner } = request.body;
    if (!file || !owner) {
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }


    try {
        const files = file.originalname.split(" ").join("");
        const uniqueFilename = `${uuid()}-${files}`;

        const { data, error } = await supabase.storage
            .from("box")
            .upload(uniqueFilename, file.buffer, {
                contentType: file.mimetype,
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            response.status(500).json({
                message: "Server error",
                success: false,
            });
            return
        }

        const publicUrlData = await supabase.storage
            .from("box")
            .getPublicUrl(`${uniqueFilename}`);

        const newFile = await createfile({
            owner: owner,
            path: uniqueFilename,
            originalname: file?.originalname || "",
            imageURL: publicUrlData.data.publicUrl || "",
            fileType: file?.mimetype || "",
            fileSize: file.size
        });

        response.status(200).json({
            message: "File Uploaded successfully",
            newFile,
            success: true,
        });
        return
    } catch (error) {
        response.status(500).json({
            message: "Internal server error",
            success: false,
        });
        return
    }
};

export const getfile = async (request: Request, response: any) => {
    const email = request.user.email
    let q = typeof request.query?.q === 'string' ? request.query.q : '';
    let sort =typeof request.query?.sort === 'string' ? request.query.sort : '';
    let sortedFiles
    let query = '';
    if (typeof q === 'string') {
        query = q;
    } else if (Array.isArray(q) && typeof q[0] === 'string') {
        query = q[0];
    } else {
        query = ''; 
    }

    const user = await findUser({email})
    const id = user?._id

    if(query){
        const file = await getfileBySearch({query:query,id:id})
        return response.status(200).json({
            message: "File Present",
            file,
            success: true,
        });
    }else{
        if(!email){
            response.status(400).json({
                message: "Require all fields",
                success: false,
            });
            return
        }
    
        const file:any = await getfiles({id})
        if (sort==='A-Zasc') {
            sortedFiles = file.sort((a:any, b:any) => 
                a.originalname.localeCompare(b.originalname)
            );
        }else if(sort==='A-Zdesc') {
            sortedFiles = file.sort((a:any, b:any) => 
                b.originalname.localeCompare(a.originalname)
            );
        }else if(sort==='Date-desc') {
            sortedFiles = file.sort((a:any, b:any) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
        } else {
            sortedFiles = file.sort((a:any, b:any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
        if(!file){
            response.status(400).json({
                message: "Require all fields",
                success: false,
            });
            return
        }
        return response.status(200).json({
            message: "File Present",
            file:sortedFiles,
            success: true,
        });
    }
}

export const renamefile = async (request: Request, response: any) => {
    const id = request.params.id
    const originalname = request.body.name
    if(!id){
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }

    const file = await renamefiles({id,originalname})
    if(!file){
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }
    return response.status(200).json({
        message: "File Renamed",
        file,
        success: true,
    });
}

export const sharefile = async (request: Request, response: any) => {
    const id = request.params.id
    const shareuser = request.body.shareuser
    if(!id){
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }
    const user = await findUsers({shareuser})
    const userIs: string[] = user.map((u) => u._id);
    
    const file = await sharefiles({id,userIs})
    return response.status(200).json({
        message: "User Added",
        success: true,
    });
}

export const updatesharefile = async (request: Request, response: any) => {
    const id = request.params.id
    const shareuser = request.body.shareuser
    if(!id){
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }
    const file = await updatesharefiles({id,shareuser})
    return response.status(200).json({
        message: "User Added",
        success: true,
    });
}

export const deletefile = async (request: Request, response: any) => {
    const id = request.params.id
    if(!id){
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }

    const file = await getfiless({id})
    if(!file){
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }

    const {data,error} = await supabase
        .storage
        .from('box')
        .remove([file.path]);
                
    if (error) {
        response.status(400).json({
            message: error,
            success: false,
        });
        return
    }

    const files = await deletefiles({id})
    if(!files){
        response.status(400).json({
            message: "Require all fields",
            success: false,
        });
        return
    }
    return response.status(200).json({
        message: "File Deleted",
        success: true,
    });
}