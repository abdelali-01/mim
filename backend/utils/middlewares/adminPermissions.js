export const rolePermissions = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasPermission = roles.some((role) => user.roles.includes(role));
    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export const addAdminPermissions = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.body?.isAdmin && req.body?.isAdmin === true && user.role !== "super") {
    return res
      .status(403)
      .json({
        message:
          "Forbidden , you can't add an admin ! as the super admin for that",
      });
  }

  next();
};
