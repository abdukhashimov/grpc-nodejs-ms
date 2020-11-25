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
