 const authenticateSession = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).json({ 
      ok : false,
      status : 401,
      message : 'You are unauthorized.'
    });
  }
};
module.exports = authenticateSession
