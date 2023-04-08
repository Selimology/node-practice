import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

 export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashThePassword = (password) => {
  return bcrypt.hash(password,10);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  //check if any bearer exists
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  //first deconstructed is bearer which is not necessary, but second is token
  const [, token] = bearer.split(' '); //"Bearer tokenInTheSecondPart"

  if (!token) {
    res.status(401);
    res.json({ message: "Not valid Token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.json({ message: "Not valid token!" });
    return;
  }
};
