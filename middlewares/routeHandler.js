const routeHandler = (req, res) => {
  res.json(404).json({
    success: false,
    message: "route not found on server, please check.",
  });
};

module.exports = { routeHandler };
