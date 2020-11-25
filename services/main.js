import { createHello, deleteHello, findHello, getHello, updateHello } from "./hellotodo";

export const HelloService = {
  Create: createHello(call, callback),
  Find: findHello(call, callback),
  Get: getHello(call, callback),
  Update: updateHello(call, callback),
  Delete: deleteHello(call, callback),
};
