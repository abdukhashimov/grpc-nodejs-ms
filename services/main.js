const { createHello, deleteHello, findHello, getHello, updateHello } = require("./hellotodo");

const HelloService = {
  Create: (call, callback) => createHello(call, callback),
  Find: (call, callback) => findHello(call, callback),
  Get: (call, callback) => getHello(call, callback),
  Update: (call, callback) => updateHello(call, callback),
  Delete: (call, callback) => deleteHello(call, callback),
};

module.exports.HelloService = HelloService;
