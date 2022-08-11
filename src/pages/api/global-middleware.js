const { JWT_SECRET } = process.env;

const resolveWithError = (res, err) => {
  if (!err.status || !err.message) throw new Error("Invalid Error Object");

  res.status(err.status || 500).json({ ...err, stack: err.stack });
};

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return resolveWithError(res, { status: 401, message: "token required for this resource" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return resolveWithError(res, { status: 401, message: "token invalid", stack: err.stack });
  });

  // just continue to next lines in execution since no error was thrown
};

module.exports = { restricted, resolveWithError };
