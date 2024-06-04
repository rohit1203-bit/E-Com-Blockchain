const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  const token = req.cookies?.jwt;
  const id = req.body;

  console.log(id)
  if (!token) {

    console.log('Unauthorized')
    res.status(403).json({
      results: 0,
      data: {
        error: "Unauthorized",
      },
      success: false
    })
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('here')
    req.body.owner = decoded.userName;
    req.body.email = decoded.email;
    console.log(req.body.email)
    next();
  } catch (err) {
    console.error(err.message);
    res.json({
      results: 0,
      data: {
        error: err.message,
      },
      success: false
    })
    return;
  }
}

module.exports = requireAuth