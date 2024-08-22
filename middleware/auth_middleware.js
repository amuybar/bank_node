const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      res
        .status(401)
        .send({ error: "Token expired. Please authenticate again." });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).send({ error: "Invalid token. Please authenticate." });
    } else {
      res.status(401).send({ error: "Please authenticate." });
    }
  }
};

exports.authorize = async (req, res, next) => {
  try {
    const allowedRoles = req.route.path.includes("admin")
      ? ["admin"]
      : ["user"];
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).send({
        error: "Forbidden: You do not have permission to access this resource.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res
      .status(403)
      .send({ error: "You do not have permission to access this resource." });
  }
};
