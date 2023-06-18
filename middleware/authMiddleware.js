// Ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Ensure user is an admin during login
exports.ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.redirect("/login");
};

// Ensure user is a client during login
exports.ensureClient = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "client") {
    return next();
  }
  res.redirect("/login");
};
