const logger = require("../../config/logger");
const { helloValidationSchema, Hello } = require("../../models/hellotodo");

const helloStorage = {
  create: async (data) => {
    date.created_at = Date.now();

    const { error, value } = helloValidationSchema.validate(data);
    if (error) {
      logger.error("Error while validating data", { label: "hello.create", error: error });
      throw new Error(error.message);
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
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  },
  get: async (data) => {
    if (!("id" in data)) {
      throw new Error("Id is required");
    }
    logger.debug("Get request for hello db", { label: "hello", request: data });
    try {
      const count = await Hello.countDocuments();
      const response = await Hello.find();
      return {
        hello_todos: response,
        count: count,
      };
    } catch (error) {
      logger.error(`Error while retreiving a hello with id: ${data.id}`, {
        label: "hello",
        error: error,
      });
      throw new Error(error.message);
    }
  },
  update: async (data) => {},
  delete: async (data) => {},
};

module.exports = helloStorage;
