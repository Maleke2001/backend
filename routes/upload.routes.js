// routes/product.route.js
import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';  


const router = express.Router();

router.post('/upload', upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: 'No file uploaded' });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:5000/upload/images/${req.file.filename}`
  });
  
});

export default router;
