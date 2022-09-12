"use strict";
var _this = this;
exports.__esModule = true;
exports.getRequestParams = exports.formatDate = exports.trimNulls = exports.jsonArrayToObjectArray = exports.formatBankCard = exports.longPress = exports.FloatAdd = exports.FloatSub = exports.addClass = exports.isArray = exports.forEach = exports.formatSeconds = exports.prefixInteger = exports.isNumberic = exports.getType = exports.bind = exports.extend = exports.toPercentageAndFixed = exports.formatMoney = exports.throttle = exports.debounce = exports.deepCopy = void 0;
/**
 * 深拷贝
 */
var deepCopy = function (obj) {
    var str, newobj;
    if (typeof obj !== 'object') {
        return;
    }
    else if (window.JSON) {
        str = JSON.stringify(obj),
            newobj = JSON.parse(str);
    }
    else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? (0, exports.deepCopy)(obj[i]) : obj[i];
        }
    }
    return newobj;
};
exports.deepCopy = deepCopy;
/**
 * 防抖函数 在wait毫秒内没有新事件则执行fn
 * @param fn
 * @param wait
 * @param scope
 * @returns {Function}
 */
var debounce = function (fn, wait, scope) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var ctx = scope || _this;
        var later = function () {
            timeout = null;
            fn.apply(ctx, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
exports.debounce = debounce;
/**
 * 节流函数 在threshhold毫秒内没有事件更新则执行fn，默认至少执行一次
 * @param fn
 * @param threshhold
 * @param scope
 * @returns {Function}
 */
var throttle = function (fn, threshhold, scope) {
    if (threshhold === void 0) { threshhold = 200; }
    var last, deferTimer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var ctx = scope || _this;
        var now = +new Date();
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(ctx, args);
            }, threshhold);
        }
        else {
            last = now;
            fn.apply(ctx, args);
        }
    };
};
exports.throttle = throttle;
/**
 * 格式化千分位
 * @param value 需要格式化千分位的值
 * @param precision 保留有效小数位
 */
var formatMoney = function (value, precision) {
    if (!(0, exports.isNumberic)(value)) {
        return value;
    }
    if (!(typeof value === 'string')) {
        value = value.toString();
    }
    var newValue = value.split(".");
    var nv1 = newValue[0] + ".0";
    var nv2 = newValue[1] != null ? newValue[1] : 0;
    var val = "";
    while (/\d{4}(\.|,)/.test(nv1)) {
        nv1 = nv1.replace(/(\d)(\d{3}(\.|,))/, "$1,$2");
    }
    nv1 = (nv1.split("."))[0];
    nv2 = "0." + nv2;
    nv2 = parseFloat(nv2).toFixed(precision) + "";
    nv2 = (nv2.split("."))[1];
    if (!nv1) {
        nv1 = "0";
    }
    if (nv2 != null) {
        val = nv1 + "." + nv2;
    }
    else {
        val = nv1;
    }
    return val;
};
exports.formatMoney = formatMoney;
/**
 * 转为百分数并保留小数,返回结果为number,没加百分号
 * @param value 需要转为百分比的值
 * @param precision 保留有效小数位
 */
var toPercentageAndFixed = function (value, precision) {
    return Number((value * 100).toFixed(precision));
};
exports.toPercentageAndFixed = toPercentageAndFixed;
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
var extend = function (a, b, thisArg) {
    (0, exports.forEach)(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = (0, exports.bind)(val, thisArg);
        }
        else {
            a[key] = val;
        }
    });
    return a;
};
exports.extend = extend;
var bind = function (fn, thisArg) {
    return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
};
exports.bind = bind;
/**
 * 获取JS对象类型
 * @param obj
 */
var getType = function (obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
};
exports.getType = getType;
/**
 * 是否是数字
 * @param val
 */
var isNumberic = function (val) {
    var num = Number(val), type = typeof val;
    return val != null && type != 'boolean' &&
        (type != 'string' || val.length) &&
        !isNaN(num) && isFinite(num) || false;
};
exports.isNumberic = isNumberic;
//数字前自动补零
var prefixInteger = function (num, length) {
    var decimal = num / Math.pow(10, length);
    //toFixed指定保留几位小数
    var str = decimal.toFixed(length) + "";
    return str.substr(str.indexOf(".") + 1);
};
exports.prefixInteger = prefixInteger;
//秒数转换为时分秒
var formatSeconds = function (ms) {
    var fmt = '';
    var second = ms;
    var minute = 0;
    var hour = 0;
    if (second <= 60) {
        fmt = second < 10 ? "00:00:0".concat(second) : "00:00:".concat(second);
    }
    else if (second <= 60 * 60) {
        minute = Math.floor(second / 60);
        minute = minute < 10 ? "0".concat(minute) : minute;
        second = Math.floor(second % 60);
        second = second < 10 ? "0".concat(second) : second;
        fmt = "00:".concat(minute, ":").concat(second);
    }
    else {
        hour = Math.floor(second / 3600);
        hour = hour < 10 ? "0".concat(hour) : hour;
        second = Math.floor(second % 3600);
        minute = Math.floor(second / 60);
        minute = minute < 10 ? "0".concat(minute) : minute;
        second = Math.floor(second % 60);
        second = second < 10 ? "0".concat(second) : second;
        fmt = "".concat(hour, ":").concat(minute, ":").concat(second);
    }
    return fmt;
};
exports.formatSeconds = formatSeconds;
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
var forEach = function (obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }
    if ((0, exports.isArray)(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    }
    else {
        // Iterate over object keys
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
};
exports.forEach = forEach;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
var isArray = function (val) {
    return toString.call(val) === '[object Array]';
};
exports.isArray = isArray;
//jquery addClass
var addClass = function (obj, cls) {
    var obj_class = obj.className, //获取 class 内容.
    blank = (obj_class != '') ? ' ' : ''; //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = obj_class + blank + cls; //组合原来的 class 和需要添加的 class.
    obj.className = added; //替换原来的 class.
};
exports.addClass = addClass;
//浮点数减法
var FloatSub = function (arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度  
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
};
exports.FloatSub = FloatSub;
//浮点数加法
var FloatAdd = function (arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    var n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m + arg2 * m) / m).toFixed(n));
};
exports.FloatAdd = FloatAdd;
// 移动端的长按事件
var longPress = function (id, func) {
    var timeOutEvent;
    document.querySelector('#' + id).addEventListener('touchstart', function (e) {
        // 开启定时器前先清除定时器，防止重复触发
        clearTimeout(timeOutEvent);
        // 开启延时定时器
        timeOutEvent = setTimeout(function () {
            // 调用长按之后的逻辑函数func
            func();
        }, 300); // 长按时间为300ms，可以自己设置
    });
    document.querySelector('#' + id).addEventListener('touchmove', function (e) {
        // 长按过程中，手指是不能移动的，若移动则清除定时器，中断长按逻辑
        clearTimeout(timeOutEvent);
        /* e.preventDefault() --> 若阻止默认事件，则在长按元素上滑动时，页面是不滚动的，按需求设置吧 */
    });
    document.querySelector('#' + id).addEventListener('touchend', function (e) {
        // 若手指离开屏幕时，时间小于我们设置的长按时间，则为点击事件，清除定时器，结束长按逻辑
        clearTimeout(timeOutEvent);
    });
};
exports.longPress = longPress;
//格式化银行卡
var formatBankCard = function (value) {
    return value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
};
exports.formatBankCard = formatBankCard;
var jsonArrayToObjectArray = function (json, X) {
    var temp = [];
    if (json) {
        var len = json.length;
        for (var i = 0; i < len; i++) {
            temp.push(new X(json[i]));
        }
    }
    return temp;
};
exports.jsonArrayToObjectArray = jsonArrayToObjectArray;
var trimNulls = function (data) {
    var y;
    for (var x in data) {
        y = data[x];
        // if (y instanceof Object) y = trimNulls(y);
        if (y === "null" || y === null || y === "" || typeof y === "undefined" || (y instanceof Object && Object.keys(y).length == 0)) {
            delete data[x];
        }
    }
    return data;
};
exports.trimNulls = trimNulls;
// 格式 YYYY/yyyy表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
var formatDate = function (date, dateString) {
    var str = dateString;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth() + 1);
    str = str.replace(/w|W/g, Week[date.getDay()]);
    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());
    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());
    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());
    return str;
};
exports.formatDate = formatDate;
/**
 * 获取链接参数
 */
var getRequestParams = function () {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) { //判断是否有参数
        var theRequest = new Object();
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var sts = strs[i].split("=");
            theRequest[sts[0]] = unescape(sts[1]);
        }
        return theRequest;
    }
    return null;
};
exports.getRequestParams = getRequestParams;
exports["default"] = {
    deepCopy: exports.deepCopy,
    debounce: exports.debounce,
    throttle: exports.throttle,
    formatMoney: exports.formatMoney,
    isNumberic: exports.isNumberic,
    prefixInteger: exports.prefixInteger,
    formatSeconds: exports.formatSeconds,
    addClass: exports.addClass,
    longPress: exports.longPress,
    formatBankCard: exports.formatBankCard,
    jsonArrayToObjectArray: exports.jsonArrayToObjectArray,
    formatDate: exports.formatDate,
    trimNulls: exports.trimNulls,
    getRequestParams: exports.getRequestParams
};
