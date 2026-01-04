import express from 'express';
import { analyzeImage } from '../controllers/analyzeController';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

router.post('/analyze', upload.single('image'), analyzeImage);

export default router;
