var jwt = require('jsonwebtoken');
const JwtSecret = 'Sagarisagoodboy'

const fetchUser = (req, res, next) => {
   const token = req.header('authorization')

   if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
   }

   try {
    const decoded = jwt.verify(token, JwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = fetchUser