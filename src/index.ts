/**
 * 深拷贝
 */
 export const deepCopy = (obj) => {
    let str, newobj;
    if (typeof obj !== 'object') {
        return;
    }
    else if (window.JSON) {
        str = JSON.stringify(obj),
        newobj = JSON.parse(str);
    }
    else {
        for (const i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
        }
    }
    return newobj;
}
/**
 * 防抖函数 在wait毫秒内没有新事件则执行fn
 * @param fn
 * @param wait 
 * @param scope
 * @returns {Function}
 */
export const debounce = (fn, wait, scope) => {
    let timeout;
    return (...args) => {
        let ctx = scope || this;
        let later = () => {
            timeout = null;
            fn.apply(ctx, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数 在threshhold毫秒内没有事件更新则执行fn，默认至少执行一次
 * @param fn 
 * @param threshhold 
 * @param scope 
 * @returns {Function}
 */
export const throttle = (fn, threshhold = 200, scope?: any) => {
    let last, deferTimer;
    return (...args) => {
        const ctx = scope || this;
        const now = +new Date();
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                fn.apply(ctx, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(ctx, args);
        }
    }
}

/**
 * 格式化千分位
 * @param value 需要格式化千分位的值
 * @param precision 保留有效小数位
 */
export const formatMoney = (value, precision: number) => {
    if (!isNumberic(value)) {
        return value;
    }
    if (!(typeof value === 'string')) {
        value = value.toString();
    }
    let newValue = value.split(".");
    let nv1 = newValue[0] + ".0";
    let nv2 = newValue[1] != null ? newValue[1] : 0;
    let val = "";
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
    } else {
        val = nv1;
    }
    return val;
}
/**
 * 转为百分数并保留小数,返回结果为number,没加百分号
 * @param value 需要转为百分比的值
 * @param precision 保留有效小数位
 */
export const toPercentageAndFixed=(value:number,precision:number):number=>{
    return Number((value*100).toFixed(precision));
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
export const extend = (a: any, b: any, thisArg?: any) => {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}

export const bind = (fn, thisArg) => {
    return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
};

/**
 * 获取JS对象类型
 * @param obj 
 */
export const getType = (obj) => {
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}
/**
 * 是否是数字
 * @param val 
 */
export const isNumberic = (val) => {
    var num = Number(val), type = typeof val
    return val != null && type != 'boolean' &&
        (type != 'string' || val.length) &&
        !isNaN(num) && isFinite(num) || false
}

//数字前自动补零
export const prefixInteger = (num:number, length:number) => {
    const decimal = num / Math.pow(10, length);
    //toFixed指定保留几位小数
    const str = decimal.toFixed(length) + "";
    return str.substr(str.indexOf(".")+1);
}

//秒数转换为时分秒
export const formatSeconds = (ms:number) => {
    let fmt:any = '';
    let second:any = ms;
    let minute:any = 0;
    let hour:any = 0;

    if (second <= 60) {
        fmt = second < 10 ? `00:00:0${second}` : `00:00:${second}`;
    }else if(second <= 60 * 60){
        minute = Math.floor(second / 60);
        minute = minute < 10 ? `0${minute}` : minute;
        second = Math.floor(second % 60);
        second = second < 10 ? `0${second}` : second;
        fmt = `00:${minute}:${second}`;
    }else {
        hour = Math.floor(second / 3600);
        hour = hour < 10 ? `0${hour}` : hour;
        second = Math.floor(second % 3600);
        minute = Math.floor(second / 60);
        minute = minute < 10 ? `0${minute}` : minute;
        second = Math.floor(second % 60);
        second = second < 10 ? `0${second}` : second;
        fmt = `${hour}:${minute}:${second}`;
    }
    return fmt;
}

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
export const forEach = (obj, fn) => {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }

    if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export const isArray = (val) => {
    return toString.call(val) === '[object Array]';
}
//jquery addClass
export const addClass = (obj, cls) => {
    let obj_class = obj.className,//获取 class 内容.
        blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    let added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
}

//浮点数减法
export const FloatSub = (arg1, arg2) => {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度  
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

//浮点数加法
export const FloatAdd = (arg1, arg2) => {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    let n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m + arg2 * m) / m).toFixed(n));
}

// 移动端的长按事件
export const longPress = (id, func) => {
    let timeOutEvent;
    document.querySelector('#' + id).addEventListener('touchstart', function (e) {
        // 开启定时器前先清除定时器，防止重复触发
        clearTimeout(timeOutEvent);
        // 开启延时定时器
        timeOutEvent = setTimeout(function () {
            // 调用长按之后的逻辑函数func
            func();
        }, 300);  // 长按时间为300ms，可以自己设置
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
}
//格式化银行卡
export const formatBankCard = (value) => {
    return value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
}

export const jsonArrayToObjectArray = <T>(json: any, X: any): T[] => {
    const temp: T[] = [];
    if (json) {
        const len = json.length;
        for (let i = 0; i < len; i++) {
            temp.push(new X(json[i]));
        }
    }
    return temp;
}

export const trimNulls = (data:Object) => {
    let y;
    for (const x in data) {
        y = data[x];
        // if (y instanceof Object) y = trimNulls(y);
        if (y === "null" || y === null || y === "" || typeof y === "undefined" || (y instanceof Object && Object.keys(y).length == 0)) {
            delete data[x];
        }
    }
    return data;
}


// 格式 YYYY/yyyy表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
export const formatDate = (date:Date,dateString) => {
    var str = dateString;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, date.getFullYear());

    str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth()+1).toString() : '0' + (date.getMonth()+1));
    str = str.replace(/M/g, date.getMonth()+1);


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
}

/**
 * 获取链接参数
 */
export const getRequestParams = () => {
    let url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) {    //判断是否有参数
        let theRequest = new Object();
        let str = url.substr(1);
        let strs = str.split("&");
        for(let i = 0; i < strs.length; i ++) {
            let sts = strs[i].split("=");
            theRequest[sts[0]] = unescape(sts[1]);
        }
        return theRequest;
    }
    return null;
}


export default {
    deepCopy,
    debounce,
    throttle,
    formatMoney,
    isNumberic,
    prefixInteger,
    formatSeconds,
    addClass,
    longPress,
    formatBankCard,
    jsonArrayToObjectArray,
    formatDate,
    trimNulls,
    getRequestParams,
}