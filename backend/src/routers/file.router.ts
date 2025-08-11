import express from "express";
import middleware from "../middleware/user.middleware";
import { uploadFile, getfile, renamefile, deletefile, sharefile, updatesharefile } from "../controller/file.controller";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', middleware,upload.single('file'), uploadFile)
router.get('/getfile',middleware,getfile)
router.post('/rename/:id',middleware,renamefile)
router.post('/share/:id',middleware,sharefile)
router.post('/updateshare/:id',middleware,updatesharefile)
router.delete('/delete/:id',middleware,deletefile)

export default router;