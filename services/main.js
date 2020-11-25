import { createHello, findHello } from "./hellotodo";

export const HelloService = {
  Create: createHello(call, callback),
  Find: findHello(call, callback),
  Get: async (data, data2) => {},
  Update: async (data, data2) => {},
  Delete: async (data, data2) => {},
};
