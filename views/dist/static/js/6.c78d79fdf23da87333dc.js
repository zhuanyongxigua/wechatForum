webpackJsonp([6],{"+f9w":function(t,e,n){var o=n("xyLT"),a=o.JSON||(o.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}},"89l1":function(t,e,n){"use strict";var o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[n("div",{staticClass:"foot_menu"},[n("router-link",{attrs:{to:"/001-home"}},[n("span",{class:{ripple_box:!0,selected:"1"==t.myTab},attrs:{id:"column1"}},[t._v("首页")])]),t._v(" "),n("router-link",{attrs:{to:"/002-score"}},[n("span",{class:{ripple_box:!0,selected:"2"==t.myTab},attrs:{id:"column2"}},[t._v("赚积分")])]),t._v(" "),n("router-link",{attrs:{to:"/003-send"}},[n("span",{class:{ripple_box:!0,selected:"3"==t.myTab},attrs:{id:"column3"}},[t._v("发帖")])]),t._v(" "),n("router-link",{attrs:{to:"/004-my"}},[n("span",{class:{ripple_box:!0,selected:"4"==t.myTab},attrs:{id:"column4"}},[t._v("我的")])]),t._v(" "),n("router-link",{attrs:{to:"/019-chat"}},[n("span",{class:{ripple_box:!0,selected:"5"==t.myTab},attrs:{id:"column5"}},[t._v("聊天室")])])],1)])},staticRenderFns:[]};e.a=o},"9j6s":function(t,e,n){"use strict";var o=(n("fDr8"),n("mzkE"));e.a={data:function(){return{oFormInfo:{typeCode:"",title:"",content:""},aFileImage:[],aFileImageInServer:[],oAudio:{},aType:[],sWechatServerAudioId:"",oLocalWechatAudioInfo:{},bIsShowHtmlAudioTag:!1,loc:location.href.split("#")[0],bRecording:!1,bIsShowDelay:!1,oSelectedFile:{}}},created:function(){this.fnGetType(),this.$route.query.id&&this.fnGetPostDetails()},components:{"my-footer":o.a},methods:{fnGetPostDetails:function(){var t=this;this.aFileImage=[],axios.get("api/getPostDtl?id="+this.$route.query.id).then(function(e){var n=R.clone(e.data.row);t.oPostDetails=n,t.oFormInfo.typeCode=n.typeCode,t.oFormInfo.title=n.title,t.oFormInfo.content=n.content,t.aFileList=n.tFileVos,t.aFileImage=R.clone(n.tFileVos),t.aFileImageInServer=R.clone(n.tFileVos)}).catch(function(t){console.log(t)})},fnGetType:function(){var t=this;axios.post("api/getRoleType",{type:"TopicType"}).then(function(e){return t.aType=R.clone(e.data)}).catch(console.log)},fnPublishPost:function(){var t=this,e={},n="api/";if(this.fnValidate(this.oFormInfo)){e.type=this.aType.find(function(e){return e.id==t.oFormInfo.typeCode}).name,e.typeCode=this.oFormInfo.typeCode,e.title=this.oFormInfo.title,e.content=this.oFormInfo.content,e.tFileVos=[];var o=new FormData;if(this.$route.query.mode){var a=R.differenceWith(R.eqProps("id"),this.aFileImage,this.aFileImageInServer),i=R.differenceWith(R.eqProps("id"),this.aFileImageInServer,this.aFileImage);n+="modifyPost",e.postId=this.$route.query.id,e.aNew=a,e.aDel=i,a.forEach(function(t){return o.append("file",t,t.name)})}else n+="addUserPost",this.aFileImage.forEach(function(t){return o.append("file",t,t.name)});axios.post("api/uploadImage",o,{onUploadProgress:function(t){console.log("upload progress: "+Math.round(t.loaded/t.total*100)+"%")}}).then(function(t){return t.data.rows.forEach(function(t){return e.tFileVos.push({id:t._id})}),axios.post(n,e)}).then(function(e){e.data.success?($.hideLoading(),$.alert({title:"提示",text:"提交成功"+(e.data.message?"，"+e.data.message:"")+"!",onOK:function(){t.$router.push("001-home"),localStorage.removeItem("oCurPageOperateRecord")}}),localStorage.removeItem("aFileImage")):"USER_BAN_CODE"===e.data.message?$.alert("账户禁用，无法操作"):$.alert({title:"提示",text:"发帖失败"})}).catch(function(t){$.hideLoading(),console.log(t),"status"in t.response&&(403===t.response.status||401===t.response.status)?$.alert("请登录之后再发帖"):$.alert("提交失败")}),$.showLoading("正在提交")}},fnValidate:function(t){var e=function(t){this._value=t};e.of=function(t){return new e(t)},R.selectChannel=function(t){return function(n){return n.constructor===e?n:t(n)}};var n=function(t){return function(n){return function(o){return o[t]||0===o[t]?o:e.of(n)}}};return R.compose(function(t){return t.constructor!==e||($.alert(t._value),!1)},R.selectChannel(n("content")("请填写内容")),R.selectChannel(n("title")("请填写标题")),R.selectChannel(n("typeCode")("请选择类型")))(t)},fnSelectFile:function(t){this.oSelectedFile=t.target.files[0];var e=(window.URL||window.webkitURL||window.mozURL).createObjectURL(this.oSelectedFile);this.oSelectedFile.path=e,this.oSelectedFile.myType="local",this.aFileImage.push(this.oSelectedFile),t.target.value=""}},mounted:function(){},updated:function(){this.$nextTick(function(){var t=$(window).get(0).innerWidth;$(".post_img").css("height",.94*t*.23),$(".post_img img").css("height",.94*t*.23),$(".add_img_btn").css("height",.94*t*.23),$(".ts_box").css("height",.94*t*.23)})}}},PmFl:function(t,e,n){(t.exports=n("5gvp")(!0)).push([t.i,".foot_menu span[data-v-5d5e8482]{width:20%}","",{version:3,sources:["/Users/yuxin/Documents/code/wechatForum/views/src/components/footer.vue"],names:[],mappings:"AACA,iCACI,SAAW,CACd",file:"footer.vue",sourcesContent:["\n.foot_menu span[data-v-5d5e8482] {\n    width: 20%;\n}\n"],sourceRoot:""}])},Tq9c:function(t,e,n){var o=n("PmFl");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals),n("P+mm")("bbcd5598",o,!0,{})},UTkq:function(t,e,n){(t.exports=n("5gvp")(!0)).push([t.i,".add_img_btn[data-v-1da7a15e]{border:none}.add_img_btn input[data-v-1da7a15e]{height:80px}.stop_record[data-v-1da7a15e]{background-color:#0aa5df}.post_textarea[data-v-1da7a15e],.post_title_input[data-v-1da7a15e]{margin-left:0}.medias_tab_btn[data-v-1da7a15e]{float:left;margin-left:5px}[v-cloak][data-v-1da7a15e]{display:none}","",{version:3,sources:["/Users/yuxin/Documents/code/wechatForum/views/src/pages/003-send.vue"],names:[],mappings:"AACA,8BACI,WAAa,CAChB,AACD,oCACI,WAAa,CAChB,AACD,8BACI,wBAA0B,CAC7B,AACD,mEAEE,aAAiB,CAClB,AACD,iCACI,WAAY,AACZ,eAAiB,CACpB,AACD,2BACI,YAAc,CACjB",file:"003-send.vue",sourcesContent:["\n.add_img_btn[data-v-1da7a15e] {\n    border: none;\n}\n.add_img_btn input[data-v-1da7a15e] {\n    height: 80px;\n}\n.stop_record[data-v-1da7a15e] {\n    background-color: #0aa5df;\n}\n.post_title_input[data-v-1da7a15e],\n.post_textarea[data-v-1da7a15e] {\n  margin-left: 0px;\n}\n.medias_tab_btn[data-v-1da7a15e] {\n    float: left;\n    margin-left: 5px;\n}\n[v-cloak][data-v-1da7a15e] {\n    display: none;\n}\n"],sourceRoot:""}])},XcQt:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("9j6s"),a=n("ywB5"),i=function(t){n("pKLC")},s=n("U5Ua")(o.a,a.a,!1,i,"data-v-1da7a15e",null);e.default=s.exports},fDr8:function(t,e,n){"use strict";function o(){this.baseUrl="http://localhost:3000/"}n.d(e,"a",function(){return s});var a=n("qWzu"),i=n.n(a);o.prototype.ajax=function(t,e,n,o,a){var s=this.fnCreateXHR(),r="";r="http"===n.toLowerCase().slice(0,4)?n:this.baseUrl+n,"get"===t.toLowerCase()&&(r+=e?"?"+i()(e):""),s.open(t,r,!0),"get"!==t.toLowerCase()&&s.setRequestHeader("Content-type","application/json"),s.withCredentials=a||!1,s.onreadystatechange=function(){4===s.readyState&&/^2\d{2}$/.test(s.status)&&o(JSON.parse(s.responseText))},s.send(i()(e)||null)},o.prototype.fnCreateXHR=function(){for(var t=!1,e=null,n=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")}],o=0,a=n.length;o<a;o++){var i=n[o];try{e=i(),this.fnCreateXHR=i,t=!0;break}catch(t){}}if(!t)throw new Error("不支持ajax哦亲！您使用的可能是传说中的浏览器");return e},o.prototype.fnAllImgDelayLoad=function(t){var e=document.getElementsByTagName("img");for(var n in e)isNaN(n)||e[n].isLoaded||function(e){var n=e.getAttribute("true-src"),o=new Image;n&&(o.src=n,o.onload=function(){if(e.src=n,e.isLoaded=!0,t&&"A"===e.parentNode.tagName){var a=o.width+"x"+o.height;e.parentNode.setAttribute("data-size",a),e.parentNode.setAttribute("data-med-size",a)}o=null})}(e[n])},o.prototype.rippleFunction=function(t){var e=t.target;if(-1===e.className.indexOf("ripple_box"))return!1;var n=e.getBoundingClientRect(),o=e.querySelector(".ripple");o||((o=document.createElement("span")).className="ripple",o.style.height=o.style.width=Math.max(n.width,n.height)+"px",e.appendChild(o)),o.classList.remove("show");var a=t.pageY-n.top-o.offsetHeight/2-document.body.scrollTop,i=t.pageX-n.left-o.offsetWidth/2-document.body.scrollLeft;return o.style.top=a+"px",o.style.left=i+"px",o.classList.add("show"),!1},o.prototype.GetArgsFromHref=function(t,e){var n=t.split("?"),o="";if(n[0]==t)return o;var a=n[1];n=a.split("&");for(var i=0;i<n.length;i++){var s=(a=n[i]).split("=");s.length<=1||s[0]==e&&(o=s[1])}return o},o.prototype.verifyIsNull=function(t){return void 0==(t=t.replace(/\s+/g,""))||""==t||null==t},o.prototype.isPassive=function(){var t=!1;try{addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){t=!0}}))}catch(t){}return t};var s=new o;document.ready=function(){},document.addEventListener("click",s.rippleFunction,!1)},gizR:function(t,e,n){"use strict";e.a={data:function(){return{}},props:["myTab"],created:function(){},methods:{},mounted:function(){},updated:function(){}}},mzkE:function(t,e,n){"use strict";var o=n("gizR"),a=n("89l1"),i=function(t){n("Tq9c")},s=n("U5Ua")(o.a,a.a,!1,i,"data-v-5d5e8482",null);e.a=s.exports},pKLC:function(t,e,n){var o=n("UTkq");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals),n("P+mm")("7b248b22",o,!0,{})},qWzu:function(t,e,n){t.exports={default:n("+f9w"),__esModule:!0}},xyLT:function(t,e){var n=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=n)},ywB5:function(t,e,n){"use strict";var o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"send"}},[n("div",{staticClass:"send_top"},[n("div",[n("select",{directives:[{name:"model",rawName:"v-model",value:t.oFormInfo.typeCode,expression:"oFormInfo.typeCode"}],staticClass:"post_title_input",staticStyle:{"padding-left":"0px"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.oFormInfo,"typeCode",e.target.multiple?n:n[0])}}},[n("option",{attrs:{value:""}},[t._v("请选择类别")]),t._v(" "),t._l(t.aType,function(e){return n("option",{domProps:{value:e.id,textContent:t._s(e.name)}})})],2)]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.oFormInfo.title,expression:"oFormInfo.title"}],staticClass:"post_title_input",attrs:{placeholder:"请输入标题"},domProps:{value:t.oFormInfo.title},on:{input:function(e){e.target.composing||t.$set(t.oFormInfo,"title",e.target.value)}}}),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.oFormInfo.content,expression:"oFormInfo.content"}],staticClass:"post_textarea",attrs:{placeholder:"请输入内容"},domProps:{value:t.oFormInfo.content},on:{input:function(e){e.target.composing||t.$set(t.oFormInfo,"content",e.target.value)}}}),t._v(" "),n("div",{staticClass:"post_medias"},t._l(t.aFileImage,function(e,o){return n("div",{staticClass:"post_img"},[n("img",{attrs:{id:"imgID"+o,src:e.path}}),t._v(" "),n("span",{staticClass:"delete_img_btn ripple_box",on:{click:function(e){t.aFileImage.splice(o,1)}}})])}))]),t._v(" "),n("div",{staticClass:"send_bottom"},[n("div",{staticClass:"medias_tab_btns"},[n("span",{staticClass:"medias_tab_btn selected",on:{click:function(e){t.fnChangeTab(1)}}},[n("i",{staticClass:"ion-android-image"})])]),t._v(" "),n("div",{staticClass:"post_medias"},[n("div",[n("span",{staticClass:"add_img_btn"},[n("input",{attrs:{id:"fileImage",name:"file",type:"file",accept:"image/*",multiple:""},on:{change:t.fnSelectFile}})])])])]),t._v(" "),n("span",{staticClass:"send_btn ripple_box",on:{click:t.fnPublishPost}},[t._v("确认发送")]),t._v(" "),n("div",{staticStyle:{height:"50px",width:"100%",float:"left"}}),t._v(" "),n("my-footer",{attrs:{"my-tab":"3"}})],1)},staticRenderFns:[]};e.a=o}});