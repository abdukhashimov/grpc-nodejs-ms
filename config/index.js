require("dotenv").config({path: "../.env"});

const config = {
  environment: getConf("NODE_ENV", "dev"),

  maxAllowedUsers: getConf("MAX_USERS", 3),
  tokenSecretKey: getConf("TOKEN_SECRET_KEY", "i am a secret key"),

  mongoHost: getConf("MONGO_HOST", "111.111.111.111"),
  mongoPort: getConf("MONGO_PORT", "27017"),
  mongoUser: getConf("MONGO_USER", "hello_world_service"),
  mongoPassword: getConf("MONGO_PASSWORD", "supersecret_password"),
  mongoDatabase: getConf("MONGO_DATABASE", "payment_service"),

  RPCPort: getConf("RPC_PORT", 6061),

  lang: getConf("DEFAULT_LANG", "ru")
};

function getConf(name, def = "") {
  if (process.env[name]) {
    return process.env[name];
  }
  return def;
}

module.exports = config;

