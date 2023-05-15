async function getCurrent(req, res, next) {
  const { login, _id: id } = req.user;
  return res.json({
    data: {
      id,
      login,
    },
  });
}

module.exports = {
  getCurrent,
};
