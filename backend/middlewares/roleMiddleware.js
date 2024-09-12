// Middleware to verify the role
const roleMiddleware = (req, res, next) => {
  const user = req.user;

  const allowedRoles = ["@voiaxisadmin.com", "@voiaxismoderator.com"];

  // Extract domain from the email
  const emailDomain = user.email.substring(user.email.lastIndexOf("@"));

  // Check if the user is an admin or moderator based on email domain
  if (allowedRoles.includes(emailDomain)) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden: Insufficient permissions" });
  }
};

module.exports = roleMiddleware;
