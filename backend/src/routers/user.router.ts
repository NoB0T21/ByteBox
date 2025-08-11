import express from "express";
import {getUser, getuser, getuserbyid, login, register, valid} from "../controller/user.controller";
import middleware from "../middleware/user.middleware";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/signup',upload.single('file'),register)
router.post('/signin',login)
router.get('/valid',valid)
router.get('/getuser/:id',middleware,getuserbyid)
router.get('/getuser',middleware,getUser)
router.post('/getshareUSer',middleware,getuser)

export default router;