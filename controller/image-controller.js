import File from '../models/file.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const uploadImage = async (req, res) => {
    const fileObj = {
        path: req.file.path,
        name: req.file.originalname,
    }
    
    try {
        // const responsePath = `http://localhost:${process.env.PORT}`
        const file = await File.create(fileObj);
        res.status(200).json({ path: `${process.env.RESPONSE_PATH}/${file._id}`});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

export const getImage = async (req, res) => {
    try {   
        const file = await File.findById(req.params.fileId);
        
        file.downloadCount++;

        await file.save();

        res.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
}