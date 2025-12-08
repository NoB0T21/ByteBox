import express from "express";
import middleware from "../middleware/user.middleware";
import { uploadFile, getfile, renamefile, deletefile, sharefile, updatesharefile, getfilell } from "../controller/file.controller";
import multer from "multer";
import cachData from "../middleware/cach.data";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', middleware,upload.single('file'), uploadFile)
router.get('/getfile',middleware,cachData,getfile)
router.get('/getfile/ll',middleware,cachData,getfilell)
router.post('/rename/:id',middleware,renamefile)
router.post('/share/:id',middleware,sharefile)
router.post('/updateshare/:id',middleware,updatesharefile)
router.delete('/delete/:id',middleware,deletefile)

export default router;