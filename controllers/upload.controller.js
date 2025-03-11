export const uploadImage = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    
    res.json({
      success: 1,
      image_url: `http://localhost:5000/images/${req.file.filename}` // You can replace localhost with your server IP/hostname
    });
  };
  