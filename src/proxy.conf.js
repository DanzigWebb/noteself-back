const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://94.228.115.150:3000/",
    secure: false,
  }
]

module.exports = PROXY_CONFIG;
