export const resolveWithError = (res, err) => {
  if (!err.status || !err.message) throw new Error("Invalid Error Object");

  return res.status(err.status || 500).json({ ...err, stack: err.stack });
};
