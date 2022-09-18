"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./index.scss");
function index(props) {
    var _a = props.fill, fill = _a === void 0 ? '#ccc' : _a, _b = props.fillOpacity, fillOpacity = _b === void 0 ? 0.2 : _b, _c = props.fontSize, fontSize = _c === void 0 ? '30px' : _c, _d = props.content, content = _d === void 0 ? 'WaterMark' : _d, _e = props.rotate, rotate = _e === void 0 ? 'rotate(-45, 30 0)' : _e, _f = props.width, width = _f === void 0 ? '200' : _f, _g = props.height, height = _g === void 0 ? '160' : _g;
    var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"400\" height=\"300\" viewBox=\"0 0 300 160\">\n    <text x=\"0\" y=\"200\" \n        text-anchor=\"middle\" \n        fill=".concat(fill, "\n        fill-opacity=").concat(fillOpacity, " \n        transform=\"rotate(-45, 30 0)\" \n        style=").concat(fontSize, "\n    >").concat(content, "</text>\n    </svg>");
    var url = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='".concat(width, "px' height='").concat(height, "px' viewBox='0 0 200 160'%3E %3Ctext x='-100' y='-30' fill='").concat(encodeURIComponent(fill), "' transform = 'rotate(-35 240 -200)' fill-opacity='").concat(fillOpacity, " ' font-size='").concat(fontSize, "'%3E").concat(content, "%3C/text%3E %3C/svg%3E \")");
    return <div className="WaterMark" style={{ backgroundImage: url }}></div>;
}
exports["default"] = index;
