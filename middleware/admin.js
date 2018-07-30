function admin(req, res, next) {
  if (!req.user.isAdmin)
    return res.status(401).send("Access Denied. User is not Admin.");
  next();
}
module.exports = admin;
