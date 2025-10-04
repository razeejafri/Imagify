import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized. Please log in again.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      req.userId = decoded.id; // ✅ Attach userId here
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.',
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed: ' + error.message,
    });
  }
};

export default userAuth;
