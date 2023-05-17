async function getCurrent(req, res, next) {
  const { login, _id: id } = req.user;
  return res.json({
    message: "User updated",
    user: { login, id },
  });
}

module.exports = {
  getCurrent,
};
