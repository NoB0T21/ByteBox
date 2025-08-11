import mongoose, { Document, Schema , Model} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface user extends Document{
    name: string,
    email: string,
    picture: string,
    password: string,
    generateToken(): Promise<string>;
    comparePassword(password:string, hash:string): Promise<boolean>
}

interface UserModel extends Model<user> {
    hashpassword(password: string): Promise<string>;
}

const userSchema: Schema<user> = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    picture:{
        type: String,
        default: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1075179906.1732978659&semt=ais_hybrid&w=740'
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.methods.generateToken = async function (): Promise<string> {
    const key: string | undefined = process.env.SECRET_KEY || 'default'
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    },key,{expiresIn: '1d'})
    return token
}

userSchema.methods.comparePassword = async function(password:string, hash:string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

userSchema.statics.hashpassword = async function(password:string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    return hash;
}

const user= mongoose.model<user, UserModel>('user',userSchema);
export default user