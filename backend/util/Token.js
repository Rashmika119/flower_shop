import jwt from "jsonwebtoken"

export function signAccessToken(userId) {
  return jwt.sign({ id: userId,type:"access" }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function signRefreshToken(userId) {
  return jwt.sign(
    { id: userId, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn:"7d",
    }
  );
}

export function verifyAccess(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefresh(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}