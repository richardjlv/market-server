"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
const router = (0, _express.Router)();
exports.router = router;
router.get('/products', (request, response) => {
  return response.json({
    message: 'Hello World'
  });
});