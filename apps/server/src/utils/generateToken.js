import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

export default generateToken;