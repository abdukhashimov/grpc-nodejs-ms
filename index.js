const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");
const logger = require("./config/logger.js");
const cfg = require("./config");
const { HelloService } = require("./services/main.js");

// loading proto file
const PROTO_URL = __dirname + "/protos/hello_service/hello.proto";

const packageDefinition = protoLoader.loadSync(PROTO_URL, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

function main() {
  logger.info("Main function is running");

  //Connecting to database

  const mongoDBUrl =
    "mongodb://" +
    cfg.mongoUser +
    ":" +
    cfg.mongoPassword +
    "@" +
    cfg.mongoHost +
    ":" +
    cfg.mongoPort +
    "/" +
    cfg.mongoDatabase;

  // let mongoDBUrl = "mongodb://localhost:27017/payment_service";
  logger.info("Connecting to db: " + mongoDBUrl);

  mongoose.connect(
    mongoDBUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        logger.error("There is an error in connecting db (" + mongoDBUrl + "): " + err.message);
      }
    }
  );

  mongoose.connection.once("open", function () {
    logger.info("Connected to the databasee");

    setTimeout(() => {}, 1000);
  });

  // gRPC server
  var server = new grpc.Server();

  server.addService(helloProto.HelloService.service, HelloService);

  server.bind("0.0.0.0:" + cfg.RPCPort, grpc.ServerCredentials.createInsecure());

  server.start();
  logger.info("grpc server is running at %s", cfg.RPCPort);
}

main();
