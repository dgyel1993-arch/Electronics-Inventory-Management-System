function requireAdmin(req, res, next) {
  if (!req.auth?.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }

  return next();
}

module.exports = requireAdmin;
