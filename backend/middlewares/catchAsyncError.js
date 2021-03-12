module.exports = (error) => (req, res, next) => {
  Promise.resolve(error(req, res, next)).catch(next);
};
