"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _youch = _interopRequireDefault(require("youch"));
require("express-async-errors");
require("dotenv/config");
var _routes = require("./routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class App {
  constructor() {
    this.server = void 0;
    this.server = (0, _express.default)();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }
  middlewares() {
    this.server.use(_express.default.json());
    this.server.use((0, _cors.default)());
    this.server.disable('x-powered-by');
  }
  routes() {
    this.server.use('/', _routes.router);
  }
  exceptionHandler() {
    this.server.use(async (err, req, res) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new _youch.default(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({
        error: 'Internal server error'
      });
    });
  }
}
const app = new App().server;
exports.app = app;