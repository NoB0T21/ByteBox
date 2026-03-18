import { CookieOptions, Request } from "express"
import { findUser, findUsersByid, getUsersByid, registerUser } from "../services/user.service"
import {OAuth2Client} from 'google-auth-library'
import userModel  from '../Models/user.model'
import jwt from 'jsonwebtoken'
import uuid4 from "uuid4"
import supabase from "../Db/supabase"
import redis from "../Db/redis";

const client = new OAuth2Client(process.env.GOOGLE_ID)

interface User {
    _id:string,
    name:string,
    email:string,
    password:string
}

export const register = async (request: Request, response: any) => {
    const file = request.file as Express.Multer.File;
    const {name, email, password, picture,type} = request.body
    if(!name||!email||!password){
        return response.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }
    try {
        const existingUsers = await findUser({email})
        if(existingUsers){
            if(type==='google'){
                const token = request.headers.authorization
                let accessToken = token?.split(' ')[1];
                if(accessToken === 'undefined'){
                    return response.status(409).json({
                        message: "Error Occure",
                        success: false,
                    })
                }
                const job = {
                    type: "sendEmail",
                    to: email,
                    subject: `👋 Welcome Back ${existingUsers.name}`,
                    html:`<table cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:auto;font-family:Arial,sans-serif:padding:40px;">
    
      <tr>
         <td style="vertical-align:middle;padding:0 6px 0 0;width:60px;">
          <img src="https://res.cloudinary.com/deweuhoti/image/upload/v1770377099/Logo_y1ovdx.png"
               alt="ByteBox Logo"
               width="60"
               style="display:block;">
        </td>
        <td style="vertical-align:middle;padding:0;">
          <h1 style="margin:0;font-size:22px;font-weight:700;line-height:1.2;">
            ByteBox ☁️
          </h1>
        </td>
      </tr>
    </table>
    <h2>Welcome back ${name} 👋</h2>
        <p>We’re glad to see you again ☁️</p>
        <p>
            Your files are safe and right where you left them.<br>
            Jump back in to upload, organize, and share anytime 🚀
        </p>
        <p><strong>✨ What you can do now:</strong></p>
        <p>
            • Access your saved files instantly 📂<br>
            • Upload new photos, videos, or documents ⬆️<br>
            • Share securely with anyone 🔐<br>
            • Enjoy fast and smooth cloud storage
        </p>
        <p style="margin:24px 0;">
            <a href="https://bytebox.app" 
                style="display:inline-block;padding:12px 22px;background:#4F46E5;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
                Open ByteBox
            </a>
        </p>
        <p>
            Need help? Just reply to this email — we’re here for you 😊
        </p>
        <p>
            <strong>— Team ByteBox</strong><br>
            Secure • Fast • Simple ☁️
        </p>
    `
                };
                await redis.lpush("jobs", JSON.stringify(job))
                return response.status(202).json({
                    message: "email already exists, Please Sign-in",
                    user: existingUsers,
                    token:accessToken,
                    success: false,
                })
            }
        }
            
        let publicUrlData;
        let user;
            
        if(!picture){
            const files = file?.originalname.split(" ").join("");
            const uniqueFilename = `${uuid4()}-${files}`;
            const { data, error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET || '')
                .upload(uniqueFilename, file?.buffer, {
                    contentType: file?.mimetype,
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
            publicUrlData = await supabase.storage
                .from(process.env.SUPABASE_BUCKET || '')
                .getPublicUrl(`${uniqueFilename}`);
            const hashPassword = await userModel.hashpassword(password)
            user = await registerUser({
                name,
                email,
                picture:publicUrlData?.data.publicUrl || "",
                password:hashPassword})
        }else{
            const hashPassword = await userModel.hashpassword(password)
            user = await registerUser({
                name,
                email,
                picture:picture,
                password:hashPassword})
        }
        

        if(!user){
            return response.status(500).json({
                message: "Some Error occure",
                success: false,
        })}
        const token = await user.generateToken()
        const job = {
            type: "sendEmail",
            to: email,
            subject: '🎉 Your ByteBox is Ready!',
            html:`<table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:auto;font-family:Arial,sans-serif:padding:40px;">

  <tr>
     <td style="vertical-align:middle;padding:0 6px 0 0;width:60px;">
      <img src="https://res.cloudinary.com/deweuhoti/image/upload/v1770377099/Logo_y1ovdx.png"
           alt="ByteBox Logo"
           width="60"
           style="display:block;">
    </td>
    <td style="vertical-align:middle;padding:0;">
      <h1 style="margin:0;font-size:22px;font-weight:700;line-height:1.2;">
        ByteBox ☁️
      </h1>
    </td>
  </tr>
</table>
<h2>Welcome to ByteBox ${name} 👋</h2>
    <p>Your personal cloud space is ready ☁️</p>
    <p>
        Start uploading, organizing, and sharing your files securely — anytime, anywhere 🚀
    </p>
    <p><strong>🗂️ What you can do with ByteBox:</strong></p>
    <p>
        • Upload photos, videos, and documents<br>
        • Access your files from any device 📱💻<br>
        • Share instantly with secure links 🔐<br>
        • Enjoy a fast, smooth, and safe experience
    </p>
    <p style="margin:24px 0;">
        <a href="https://bytebox.app"
            style="display:inline-block;padding:12px 22px;background:#4F46E5;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
            Get Started
        </a>
    </p>
    <p>
        Need help? Just reply to this email — we’re happy to assist 😊
    </p>
    <p>
        <strong>— Team ByteBox</strong><br>
        Secure • Fast • Simple ☁️
    </p>
`
            };
        await redis.lpush("jobs", JSON.stringify(job))
        return response.status(201).json({
            message: "User created successfully",
            user,
            token,
            success: true,
        });
    } catch (error) {
        console.error("Register Error:", error);
        return response.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}

export const login = async (request: Request, response:any) => {
    const {email, password} = request.body
    if(!email||!password){
        return response.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const user = await findUser({email})
        if(!user){
            return response.status(202).json({
                message: "password or email is incorrect",
                success: false,
        })}
        const isMatch = await user.comparePassword(password, user.password)
        if(!isMatch){
            return response.status(202).json({
                message: "password or email is incorrect",
                success: false,
        })}
        const token = await user.generateToken()
        const job = {
            type: "sendEmail",
            to: email,
            subject: 'Wellcome back',
        };
        await redis.lpush("jobs", JSON.stringify(job));
        return response.status(201).json({
            message: "User login successfully",
            user,
            token,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}

export const valid = async (req: Request, res:any) => {
    const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Access Token required' });
        return;
      }
    
      const accessToken = authHeader.split(' ')[1];
      try {
        const user = jwt.verify(accessToken, process.env.SECRET_KEY || 'default');
        if(!user){
            return res.status(200).json({
                message: "not verified",
                success: false,
            })
        }
        return res.status(200).json({
            message: "verified",
            success: true,
        })
      } catch (err) {
        try {
          const googleInfo = await client.getTokenInfo(accessToken);
          if(!googleInfo){
            return res.status(200).json({
                message: "not verified",
                success: false,
            })
        }
        return res.status(200).json({
            message: "verified",
            success: true,
        })
        } catch (err) {
           return res.status(200).json({
                message: "not verified",
                success: false,
            })
        }
      }
}

export const getUser = async (request: Request, response:any) => {
    const email = request.user.email
    if(!email){
        return response.status(400).json({
        message: 'Require all fields',
        success: false
    })}
    const user = await findUser({email})
    const userid = user?._id||''
    try {
        const user = await findUsersByid({shareuser:userid})
        if(!user){
            return response.status(200).json({
                message: "password or email is incorrect",
                success: false,
        })}
        return response.status(200).json({
            message: "IDs",
            file: user,
            success: true,
        })
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}

export const getuserbyid = async (request: Request, response:any) => {
    const userid = request.params.id
    
    if(!userid){
        return response.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const user = await findUsersByid({shareuser:userid})
        if(!user){
            return response.status(200).json({
                message: "password or email is incorrect",
                success: false,
        })}
        return response.status(200).json({
            message: "IDs",
            data: user,
            success: true,
        })
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}

export const getuser = async (request: Request, response:any) => {
    const userid = request.body
    if(!userid){
        return response.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const user = await getUsersByid({shareuser:userid})
        if(!user){
            return response.status(200).json({
                message: "password or email is incorrect",
                data: user,
                success: false,
        })}
        return response.status(200).json({
            message: "IDs",
            data: user,
            success: true,
        })
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}