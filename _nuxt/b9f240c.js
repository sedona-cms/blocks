(window.webpackJsonp=window.webpackJsonp||[]).push([[3,4],{198:function(e,t,l){"use strict";l.r(t);var n={name:"Color",mixins:[l(214).c],props:{value:{type:String,required:!0}},data:function(){return{color:this.value}},watch:{color:function(e){this.$emit("change",e)}}},o=l(7),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("q-field",{attrs:{label:e.title,outlined:"","stack-label":"",dark:""},scopedSlots:e._u([{key:"control",fn:function(){return[l("div",{staticClass:"self-center full-width no-outline",attrs:{tabindex:"0"}},[l("select",{directives:[{name:"model",rawName:"v-model",value:e.color,expression:"color"}],staticClass:"full-width text-black",on:{change:function(t){var l=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.color=t.target.multiple?l:l[0]}}},[l("option",{attrs:{value:"red"}},[e._v("Red")]),e._v(" "),l("option",{attrs:{value:"green"}},[e._v("Green")]),e._v(" "),l("option",{attrs:{value:"blue"}},[e._v("Blue")])])])]},proxy:!0}])})}),[],!1,null,null,null);t.default=component.exports}}]);