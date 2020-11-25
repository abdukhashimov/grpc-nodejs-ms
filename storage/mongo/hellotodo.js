const logger = require("../../config/logger");
const { helloValidationSchema, HelloSchema } = require("../../models/hellotodo");

const helloStorage = {
  create: async (data) => {
    date.created_at = Date.now();

    const { error, value } = helloValidationSchema.validate(data);
    if (error) {
      logger.error("Error while validating data", { label: "hello.create", error: error });
      return new Error(error.message);
    }

    let hello = new HelloSchema(value);
    try {
      const response = await hello.save();
      logger.debug(`Hello with id: ${response.id} is created`, {
        label: "hello",
        result: response,
      });
    } catch (error) {
      logger.error("Error while creating a transaction", { label: "hello", error: error });
    }
  },
  find: async (data) => {},
  get: async (data) => {},
  update: async (data) => {},
  delete: async (data) => {},
};
