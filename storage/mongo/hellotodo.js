const logger = require("../../config/logger");
const { helloValidationSchema, Hello } = require("../../models/hellotodo");

const helloStorage = {
  create: async (data) => {
    date.created_at = Date.now();

    const { error, value } = helloValidationSchema.validate(data);
    if (error) {
      logger.error("Error while validating data", { label: "hello.create", error: error });
      return new Error(error.message);
    }

    let hello = new Hello(value);
    try {
      const response = await hello.save();
      logger.debug(`Hello with id: ${response.id} is created`, {
        label: "hello",
        result: response,
      });
    } catch (error) {
      logger.error("Error while creating a hellos", { label: "hello", error: error });
      return error;
    }
  },
  find: async (data) => {
    logger.debug("Find request for hello db", { label: "hello", request: data });
    try {
      const count = await Hello.countDocuments();
      const response = await Hello.find();
      return {
        hello_todos: response,
        count: count,
      };
    } catch (error) {
      logger.error("Error while finding a hellos", { label: "hello", error: error });
      return new Error(error.message);
    }
  },
  get: async (data) => {},
  update: async (data) => {},
  delete: async (data) => {},
};

module.exports = helloStorage;
