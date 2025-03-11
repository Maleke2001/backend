// middleware/authenticate.js
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, errors: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_ecom'); 

    req.user = decoded.user;
    next();

  } catch (error) {
    res.status(401).json({ success: false, errors: "Token is not valid" });
  }
};

export default authenticate;