export const rolePermissions = (roles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient privileges",
      });
    }

    next();
  };
};

export const addAdminPermissions = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  if (
    req.body?.isAdmin &&
    req.body?.isAdmin === true &&
    req.user?.role !== "super"
  ) {
    return res.status(403).json({
      message:
        "Forbidden , you can't add an admin ! as the super admin for that",
    });
  }

  next();
};
