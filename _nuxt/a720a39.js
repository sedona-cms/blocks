(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{230:function(e,t,n){var map={"./props/color":[198,0,1,3],"./props/color.vue":[198,0,1,3],"./views/edit-post":[213,0,1,5],"./views/edit-post.vue":[213,0,1,5]};function o(e){if(!n.o(map,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=map[e],o=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(o)}))}o.keys=function(){return Object.keys(map)},o.id=230,e.exports=o},346:function(e,t,n){},355:function(e,t,n){"use strict";n.r(t),n.d(t,"AdminPanel",(function(){return k}));var o=n(15),r=n(6),l=(n(16),n(2)),c=n(0),d=n(232),f=(n(50),n(25),n(22),n(14),n(44),n(18)),v=n(200),h=n(102);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function w(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(f.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var O,y,P=c.a.extend({name:"MainToolbar",methods:{buttonClick:function(e){h.eventBus.emit("core:navigate",e)},goHome:function(){h.eventBus.emit("core:navigate","tab-home")}},render:function(){var e=this,t=arguments[0],n=[];return this.$sedona.config.toolBar.showHome&&n.push(t("q-btn",{attrs:{flat:!0,round:!0,dense:!0},class:"q-mr-sm",on:{click:this.goHome}},[t("q-icon",{attrs:{name:"home"}}),t("q-tooltip",{attrs:{"content-class":"bg-amber text-black shadow-4"}},["Home"])])),this.$sedona.config.toolBar.buttons.forEach((function(button){var title=(null==button?void 0:button.title)||!1,o=(null==button?void 0:button.icon)||"extension",r=Object(v.a)();n.push(t("q-btn",{attrs:{flat:!0,round:!0,dense:!0},class:"q-mr-sm",on:{click:function(){return e.buttonClick(w({id:r,type:"item"},button))}}},[t("q-icon",{attrs:{name:o}}),title?t("q-tooltip",[button.title]):""]))})),""!==this.$sedona.config.toolBar.title&&n.push(t("q-toolbar-title",[this.$sedona.config.toolBar.title])),t("q-toolbar",{class:"bg-grey-7",style:{width:"auto"}},[n])}}),x=(n(51),n(52),c.a.extend({name:"SavePanel",props:{label:{type:String,default:"Save"},color:{type:String,default:"primary"},size:{type:String,default:"lg",validator:function(e){return["xs","sm","md","lg","xl"].includes(e)}}},data:function(){return{loading:!1,disable:!1}},mounted:function(){h.eventBus.on("core:save-loading",this.__saveLoading),h.eventBus.on("core:save-disable",this.__saveDisable)},beforeDestroy:function(){h.eventBus.off("core:save-loading",this.__saveLoading),h.eventBus.off("core:save-disable",this.__saveDisable)},methods:{__saveLoading:function(e){this.loading=Boolean(null==e?void 0:e[0])},__saveDisable:function(e){this.disable=Boolean(null==e?void 0:e[0])}},render:function(){var e=arguments[0];return e("div",{class:"q-pa-md full-width"},[e("q-btn",{attrs:{label:this.label,color:this.color,size:this.size,loading:this.loading,disable:this.disable},class:"full-width",on:{click:function(){return h.eventBus.emit("core:save-click")}}})])}})),j=n(231),k=(n(346),c.a.extend({name:"AdminPanel",components:{RouterView:d.a,MainToolbar:P,SavePanel:x},data:function(){return{isPanelOpen:!1,savePanel:!1}},mounted:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$nextTick();case 2:if(O=document.querySelector("#q-app"),y=document.querySelector("#__nuxt"),null!==O){t.next=6;break}throw new Error("No element with #q-app selector");case 6:if(null!==y){t.next=8;break}throw new Error("No element with #__nuxt selector");case 8:JSON.parse(localStorage.getItem("sedona-panel-open")||"false")&&(n=setTimeout((function(){clearTimeout(n),e.open()}),600)),h.eventBus.on("core:navigate",e.initSavePanel);case 11:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){h.eventBus.off("core:navigate",this.initSavePanel)},methods:{toggle:function(){this.isPanelOpen?this.close():this.open()},open:function(){null!==O&&(O.style.left="0px"),null!==y&&(y.style.paddingLeft="300px"),this.isPanelOpen=!0,localStorage.setItem("sedona-panel-open",String(!0))},close:function(){null!==O&&(O.style.left="-300px"),null!==y&&(y.style.paddingLeft="unset"),this.isPanelOpen=!1,localStorage.setItem("sedona-panel-open",String(!1))},initSavePanel:function(e){if(!j.c.lock){this.savePanel=!1;var t=Object(r.a)(e,1)[0];"object"===Object(o.a)(t)&&"item"===t.type&&(this.savePanel=t.save||!1)}}},render:function(e){var t;if(this.savePanel){var n={};"object"===Object(o.a)(this.savePanel)&&(n=this.savePanel),t=e("save-panel",{props:n})}return e("div",{attrs:{id:"q-app"},class:"admin-panel q-dark",style:"left: -300px;"},[e("div",{class:"admin-panel--inner fit text-white q-gutter-y-sm shadow-5",style:"z-index:1000"},[e("q-btn",{attrs:{color:"dark",icon:this.isPanelOpen?"menu_open":"menu",round:!0},class:"toggle-button",on:{click:this.toggle}}),e("div",{class:"fit"},[e("main-toolbar"),e("router-view"),t])])])}}))}}]);