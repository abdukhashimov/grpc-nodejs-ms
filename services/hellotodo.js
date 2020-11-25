const grpc = require("@grpc/grpc-js");
const logger = require("../config/logger");
const helloStorage = require("../storage/mongo/hellotodo");

export let createHello = async (call, callback) => {
  logger.debug("Hello Create Request", { label: "hello", request: call.request });
  try {
    const response = await helloStorage.create(call.request);
    callback(null, { id: response });
  } catch (error) {
    logger.error(error.message, { function: "service.hello.create", request: call.request });
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
};

export let findHello = async (call, callback) => {
  logger.debug("Find hello request", { label: "hello", request: call.request });
  try {
    const response = await helloStorage.find(call.request);
    callback(null, response);
  } catch (error) {
    logger.error(error.message, { function: "service.hello.find", request: call.request });
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
};
