const game = {
  getGame: (req, res, next) => {
    console.log("GAME");
    res.render("game");
  },
};

module.exports = game;
