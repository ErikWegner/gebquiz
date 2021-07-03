const PROXY_CONFIG = [
  {
    context: [
      "/authentication",
      "/gameround",
      "/answer",
      "/highscore",
      "/users",
    ],
    target: "http://localhost:3030",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
