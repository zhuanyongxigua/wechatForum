/*
2018.01.19，于鑫，整理
*/

function GlobalConstructorFunction() {
    this.baseurl = 'http://localhost:3000';
}

GlobalConstructorFunction.prototype.ajax = function(_sAjaxType, _oAjaxPostData, _sAjaxUrl, _fnAjaxSuccess) {
    $.ajax({
        type: _sAjaxType,
        url: this.baseurl + _sAjaxUrl,
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(_oAjaxPostData),
        success: function(data) {
            _fnAjaxSuccess(data);
        }
    });
}

/*
2018.02.24，于鑫
原生的实现，无jQuer依赖，兼容IE6及以上
*/
GlobalConstructorFunction.prototype.ajaxNative = function(_sAjaxType, _oAjaxPostData, _sAjaxUrl, _fnAjaxSuccess) {
    var _xhr = this.fnCreateXHR();
    _xhr.open(_sAjaxType, this.baseurl + _sAjaxUrl, true);
    if (_sAjaxType !== "GET" && _sAjaxType !== "get") {
        _xhr.setRequestHeader("Content-type","application/json");
    }

    _xhr.onreadystatechange = function(){
      if (_xhr.readyState === 4 && /^2\d{2}$/.test(_xhr.status)){
          _fnAjaxSuccess(JSON.parse(_xhr.responseText));
      }
    }
    _xhr.send(JSON.stringify(_oAjaxPostData) || null);
}

/*
2018.02.24，于鑫
懒加载判断浏览器对ajax的兼容性，兼容IE6及以上，以下不行
*/
GlobalConstructorFunction.prototype.fnCreateXHR = function(_sAjaxType, _oAjaxPostData, _sAjaxUrl, _fnAjaxSuccess) {
    var flag = false,
        xhr = null,
        ary = [function () {
          return new XMLHttpRequest;
          }, function () {
              return new ActiveXObject("Microsoft.XMLHTTP");
          }, function () {
              return new ActiveXObject("Msxml2.XMLHTTP");
          }, function () {
              return new ActiveXObject("Msxml3.XMLHTTP");
        }];
    for (var i = 0, len = ary.length; i < len; i++) {
        var temp = ary[i];
        try {
            xhr = temp();
            this.prototype.fnCreateXHR = temp;
            console.log(this.fnCreateXHR);
            flag = true;
            break;
        } catch (e) {

        }
    }
    if (!flag) {
        throw new Error("不支持ajax哦亲！您使用的可能是传说中的浏览器");
    }
    return xhr;
}

/*
2018.01.20，于鑫
图片的延时加载方法
使用方法：
1.将需要延时的img标签加上true-src自定义属性，将图片实际路径填入此处；
2.调用此函数，为使延时加载有意义，请确保其在其他数据请求之后执行，一般情况下在setTimeout中执行；
3.如在vue中使用，可以在vue的updated钩子下的nextTrick函数中调用，无需使用setTimeout；
4.由于与photoswipe一块使用时设置a标签的属性有些繁琐，所以在此方法中加入设置父级a标签属性的功能，可以设置的属性只有data-size和data-med-size。
  如果需要此功能，需传入参数布尔值true，这样无需再调用auto_data_size函数，不需要则不用传入参数或传入布尔值false。
  如果项目局部需要设置更多属性或有其他需求，建议在项目局部重写。
5.如需在真正图片显示前的等待效果更好，可以加gif等待提示，路径放在src中，待真正图片加载完成，src会被自动替代，
  也可以使用css的background加等待gif，这时记得在img标签中加alt属性，已确保阻止浏览器默认的坏图片标志闪出。
*/
GlobalConstructorFunction.prototype.fnAllImgDelayLoad = function(_isUseWithPhotoSwipe) {
    var _oAllImgTag = document.getElementsByTagName('img');

    function _fnDelayCurImg(_oCurImgNode) {
        var sTrueSrc = _oCurImgNode.getAttribute('true-src');
        var oImg = new Image;
        if (sTrueSrc) {
            oImg.src = sTrueSrc;
            oImg.onload = function() {
                _oCurImgNode.src = sTrueSrc;
                _oCurImgNode.isLoaded = true;
                if (_isUseWithPhotoSwipe && _oCurImgNode.parentNode.tagName === 'A') {
                    var size = oImg.width + 'x' + oImg.height;
                    _oCurImgNode.parentNode.setAttribute('data-size', size);
                    _oCurImgNode.parentNode.setAttribute('data-med-size', size);
                }
                oImg = null;
            }
        }
    }
    for (var _key in _oAllImgTag) {
        if (!isNaN(_key) && !_oAllImgTag[_key].isLoaded) {
            _fnDelayCurImg(_oAllImgTag[_key]);
        }
    }
}

GlobalConstructorFunction.prototype.rippleFunction = function(_rippleFunctionEvent) {
    var target = _rippleFunctionEvent.target;
    if(target.className.indexOf("ripple_box") !== -1) {} else return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = _rippleFunctionEvent.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = _rippleFunctionEvent.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
}


/*
2018.01.20，于鑫，整理
根据图片大小设定data-size和data-med-size，使用photoswipe库时使用
如需根据屏幕大小调整预览图片为正方形，需要额外增加代码，例子如下，请根据需要调整
var w = $(window).get(0).innerWidth;
$('.card_img').css('height', w * 0.92 * 0.303333);
$('.card_talk_img').css('height', (w * 0.92 - 62) * 0.303333);
如在vue中使用上述代码，请加在vue的updated钩子下的nextTrick函数中。
*/
GlobalConstructorFunction.prototype.auto_data_size = function() {
    var size = null;
    if ($(".card_img")) {
        $(".card_img").each(function() {
            var img = new Image();
            img.src = $(this).attr("src");

            var theA = $(this).parent("a");

            // 定时执行获取宽高
            var check = function() {
                size = img.width + 'x' + img.height;
                theA.attr("data-size", size).attr("data-med-size", size);
            };

            var set = setInterval(check, 40);

            // 加载完成获取宽高
            img.onload = function() {
                size = img.width + 'x' + img.height;
                theA.attr("data-size", size).attr("data-med-size", size);

                // 取消定时获取宽高
                clearInterval(set);
            };
        });
    }
}

//DOM2级事件各浏览器是否支持第三个参数为对象的有效性验证，使用iscroll库时使用
GlobalConstructorFunction.prototype.isPassive = function() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassiveOption = true;
            }
        }));
    } catch (e) {}
    return supportsPassiveOption;
}

//禁止微信浏览器下拉
GlobalConstructorFunction.prototype.preventPullDown = function () {
    var lastY; //最后一次y坐标点
    $(document.body).on('touchstart', function(event) {
        lastY = event.originalEvent.changedTouches[0].clientY; //点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function(event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度
        if (y >= lastY && st <= 10) { //如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;
    });
}

GlobalConstructorFunction.prototype.verifyIsNull = function(valStr) {
    valStr = valStr.replace(/\s+/g, "");
    if (valStr == undefined || valStr == "" || valStr == null) {
        return true;
    }
    return false;
}

GlobalConstructorFunction.prototype.GetArgsFromHref = function (sHref, sArgName) {
    var args = sHref.split("?");
    var retval = "";
    if (args[0] == sHref) {
        return retval;
    }
    var str = args[1];
    args = str.split("&");
    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.split("=");
        if (arg.length <= 1) {
            continue;
        }
        if (arg[0] == sArgName) {
            retval = arg[1];
        }
    }
    return retval;
}

GlobalConstructorFunction.prototype.covNull = function(valStr) {
    if (valStr == undefined || valStr == "" || valStr == null) {
        return "";
    }
    return valStr;
}

//设置cookie
GlobalConstructorFunction.prototype.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURI(encodeURI(cvalue)) + "; " + expires;
}

//获得cookie
GlobalConstructorFunction.prototype.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1)
            return decodeURI(c.substring(name.length, c.length));
    }
    return "";
}

GlobalConstructorFunction.prototype.clearCookie = function(name) {
    this.setCookie(name, "", -1);
}

GlobalConstructorFunction.prototype.encode = function(str) {
    return encodeURI(encodeURI(str));
}

GlobalConstructorFunction.prototype.decode = function(str) {
    return decodeURI(str);
}

GlobalConstructorFunction.prototype.removeAllChild = function(id) {
    var div = document.getElementById(id);
    while (div.hasChildNodes()) { //当div下还存在子节点时 循环继续
        div.removeChild(div.firstChild);
    }
}

GlobalConstructorFunction.prototype.isNum = function(value) {
    if (this.verifyIsNull(value)) {
        return false;
    }

    var reg = /^\d+(\.\d+)?$/;
    if (!value.match(reg)) {
        return false;
    }
    return true;
}

GlobalConstructorFunction.prototype.uncheckedError = function(id, alertText, isFocus) {
    $("#" + id).tips({
        side: 2,
        msg: alertText,
        bg: '#AE81FF',
        time: 3
    });

    if (isFocus) {
        $("#" + id).focus();
    }
}

GlobalConstructorFunction.prototype.unsuccessfulAlert = function(id, alertText, isFocus) {
    $("#" + id).tips({
        side: 1,
        msg: alertText,
        bg: '#FF5080',
        time: 3
    });

    if (isFocus) {
        $("#" + id).focus();
    }
}

var global = new GlobalConstructorFunction;

document.ready = function() {
    // global.preventPullDown();
    // global.auto_data_size();
};

document.addEventListener('click', global.rippleFunction, false);


/*
2018.02.25，于鑫
es6的import引入方式，如果在html的script标签中使用，需要将此代码注释掉，否则会报错。
*/
export {global}
/*
2018.02.25，于鑫
commonJS的require引入方式，如果在html的script标签中使用，需要将此代码注释掉，否则会报错。
*/
// exports = global;
