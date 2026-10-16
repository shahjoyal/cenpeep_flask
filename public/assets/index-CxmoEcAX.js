(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();var uc={exports:{}},To={},cc={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ds=Symbol.for("react.element"),uf=Symbol.for("react.portal"),cf=Symbol.for("react.fragment"),df=Symbol.for("react.strict_mode"),pf=Symbol.for("react.profiler"),ff=Symbol.for("react.provider"),mf=Symbol.for("react.context"),hf=Symbol.for("react.forward_ref"),gf=Symbol.for("react.suspense"),xf=Symbol.for("react.memo"),yf=Symbol.for("react.lazy"),Di=Symbol.iterator;function vf(e){return e===null||typeof e!="object"?null:(e=Di&&e[Di]||e["@@iterator"],typeof e=="function"?e:null)}var dc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},pc=Object.assign,fc={};function hr(e,n,t){this.props=e,this.context=n,this.refs=fc,this.updater=t||dc}hr.prototype.isReactComponent={};hr.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};hr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function mc(){}mc.prototype=hr.prototype;function Al(e,n,t){this.props=e,this.context=n,this.refs=fc,this.updater=t||dc}var Tl=Al.prototype=new mc;Tl.constructor=Al;pc(Tl,hr.prototype);Tl.isPureReactComponent=!0;var zi=Array.isArray,hc=Object.prototype.hasOwnProperty,Ol={current:null},gc={key:!0,ref:!0,__self:!0,__source:!0};function xc(e,n,t){var r,o={},a=null,l=null;if(n!=null)for(r in n.ref!==void 0&&(l=n.ref),n.key!==void 0&&(a=""+n.key),n)hc.call(n,r)&&!gc.hasOwnProperty(r)&&(o[r]=n[r]);var i=arguments.length-2;if(i===1)o.children=t;else if(1<i){for(var u=Array(i),d=0;d<i;d++)u[d]=arguments[d+2];o.children=u}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)o[r]===void 0&&(o[r]=i[r]);return{$$typeof:ds,type:e,key:a,ref:l,props:o,_owner:Ol.current}}function bf(e,n){return{$$typeof:ds,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Fl(e){return typeof e=="object"&&e!==null&&e.$$typeof===ds}function kf(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Ri=/\/+/g;function Xo(e,n){return typeof e=="object"&&e!==null&&e.key!=null?kf(""+e.key):n.toString(36)}function Us(e,n,t,r,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case ds:case uf:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Xo(l,0):r,zi(o)?(t="",e!=null&&(t=e.replace(Ri,"$&/")+"/"),Us(o,n,t,"",function(d){return d})):o!=null&&(Fl(o)&&(o=bf(o,t+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(Ri,"$&/")+"/")+e)),n.push(o)),1;if(l=0,r=r===""?".":r+":",zi(e))for(var i=0;i<e.length;i++){a=e[i];var u=r+Xo(a,i);l+=Us(a,n,t,u,o)}else if(u=vf(e),typeof u=="function")for(e=u.call(e),i=0;!(a=e.next()).done;)a=a.value,u=r+Xo(a,i++),l+=Us(a,n,t,u,o);else if(a==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return l}function bs(e,n,t){if(e==null)return e;var r=[],o=0;return Us(e,r,"","",function(a){return n.call(t,a,o++)}),r}function wf(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ze={current:null},Vs={transition:null},Cf={ReactCurrentDispatcher:ze,ReactCurrentBatchConfig:Vs,ReactCurrentOwner:Ol};function yc(){throw Error("act(...) is not supported in production builds of React.")}ee.Children={map:bs,forEach:function(e,n,t){bs(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return bs(e,function(){n++}),n},toArray:function(e){return bs(e,function(n){return n})||[]},only:function(e){if(!Fl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ee.Component=hr;ee.Fragment=cf;ee.Profiler=pf;ee.PureComponent=Al;ee.StrictMode=df;ee.Suspense=gf;ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cf;ee.act=yc;ee.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=pc({},e.props),o=e.key,a=e.ref,l=e._owner;if(n!=null){if(n.ref!==void 0&&(a=n.ref,l=Ol.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(u in n)hc.call(n,u)&&!gc.hasOwnProperty(u)&&(r[u]=n[u]===void 0&&i!==void 0?i[u]:n[u])}var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){i=Array(u);for(var d=0;d<u;d++)i[d]=arguments[d+2];r.children=i}return{$$typeof:ds,type:e.type,key:o,ref:a,props:r,_owner:l}};ee.createContext=function(e){return e={$$typeof:mf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ff,_context:e},e.Consumer=e};ee.createElement=xc;ee.createFactory=function(e){var n=xc.bind(null,e);return n.type=e,n};ee.createRef=function(){return{current:null}};ee.forwardRef=function(e){return{$$typeof:hf,render:e}};ee.isValidElement=Fl;ee.lazy=function(e){return{$$typeof:yf,_payload:{_status:-1,_result:e},_init:wf}};ee.memo=function(e,n){return{$$typeof:xf,type:e,compare:n===void 0?null:n}};ee.startTransition=function(e){var n=Vs.transition;Vs.transition={};try{e()}finally{Vs.transition=n}};ee.unstable_act=yc;ee.useCallback=function(e,n){return ze.current.useCallback(e,n)};ee.useContext=function(e){return ze.current.useContext(e)};ee.useDebugValue=function(){};ee.useDeferredValue=function(e){return ze.current.useDeferredValue(e)};ee.useEffect=function(e,n){return ze.current.useEffect(e,n)};ee.useId=function(){return ze.current.useId()};ee.useImperativeHandle=function(e,n,t){return ze.current.useImperativeHandle(e,n,t)};ee.useInsertionEffect=function(e,n){return ze.current.useInsertionEffect(e,n)};ee.useLayoutEffect=function(e,n){return ze.current.useLayoutEffect(e,n)};ee.useMemo=function(e,n){return ze.current.useMemo(e,n)};ee.useReducer=function(e,n,t){return ze.current.useReducer(e,n,t)};ee.useRef=function(e){return ze.current.useRef(e)};ee.useState=function(e){return ze.current.useState(e)};ee.useSyncExternalStore=function(e,n,t){return ze.current.useSyncExternalStore(e,n,t)};ee.useTransition=function(){return ze.current.useTransition()};ee.version="18.3.1";cc.exports=ee;var S=cc.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jf=S,Sf=Symbol.for("react.element"),Nf=Symbol.for("react.fragment"),Lf=Object.prototype.hasOwnProperty,Ef=jf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Af={key:!0,ref:!0,__self:!0,__source:!0};function vc(e,n,t){var r,o={},a=null,l=null;t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(l=n.ref);for(r in n)Lf.call(n,r)&&!Af.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:Sf,type:e,key:a,ref:l,props:o,_owner:Ef.current}}To.Fragment=Nf;To.jsx=vc;To.jsxs=vc;uc.exports=To;var s=uc.exports,bc={exports:{}},nn={},kc={exports:{}},wc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(L,D){var H=L.length;L.push(D);e:for(;0<H;){var N=H-1>>>1,T=L[N];if(0<o(T,D))L[N]=D,L[H]=T,H=N;else break e}}function t(L){return L.length===0?null:L[0]}function r(L){if(L.length===0)return null;var D=L[0],H=L.pop();if(H!==D){L[0]=H;e:for(var N=0,T=L.length,q=T>>>1;N<q;){var R=2*(N+1)-1,x=L[R],O=R+1,z=L[O];if(0>o(x,H))O<T&&0>o(z,x)?(L[N]=z,L[O]=H,N=O):(L[N]=x,L[R]=H,N=R);else if(O<T&&0>o(z,H))L[N]=z,L[O]=H,N=O;else break e}}return D}function o(L,D){var H=L.sortIndex-D.sortIndex;return H!==0?H:L.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,i=l.now();e.unstable_now=function(){return l.now()-i}}var u=[],d=[],h=1,g=null,f=3,y=!1,k=!1,C=!1,P=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(L){for(var D=t(d);D!==null;){if(D.callback===null)r(d);else if(D.startTime<=L)r(d),D.sortIndex=D.expirationTime,n(u,D);else break;D=t(d)}}function v(L){if(C=!1,m(L),!k)if(t(u)!==null)k=!0,V(E);else{var D=t(d);D!==null&&J(v,D.startTime-L)}}function E(L,D){k=!1,C&&(C=!1,p(j),j=-1),y=!0;var H=f;try{for(m(D),g=t(u);g!==null&&(!(g.expirationTime>D)||L&&!K());){var N=g.callback;if(typeof N=="function"){g.callback=null,f=g.priorityLevel;var T=N(g.expirationTime<=D);D=e.unstable_now(),typeof T=="function"?g.callback=T:g===t(u)&&r(u),m(D)}else r(u);g=t(u)}if(g!==null)var q=!0;else{var R=t(d);R!==null&&J(v,R.startTime-D),q=!1}return q}finally{g=null,f=H,y=!1}}var A=!1,w=null,j=-1,_=5,I=-1;function K(){return!(e.unstable_now()-I<_)}function X(){if(w!==null){var L=e.unstable_now();I=L;var D=!0;try{D=w(!0,L)}finally{D?Y():(A=!1,w=null)}}else A=!1}var Y;if(typeof c=="function")Y=function(){c(X)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,B=Z.port2;Z.port1.onmessage=X,Y=function(){B.postMessage(null)}}else Y=function(){P(X,0)};function V(L){w=L,A||(A=!0,Y())}function J(L,D){j=P(function(){L(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(L){L.callback=null},e.unstable_continueExecution=function(){k||y||(k=!0,V(E))},e.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<L?Math.floor(1e3/L):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return t(u)},e.unstable_next=function(L){switch(f){case 1:case 2:case 3:var D=3;break;default:D=f}var H=f;f=D;try{return L()}finally{f=H}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(L,D){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var H=f;f=L;try{return D()}finally{f=H}},e.unstable_scheduleCallback=function(L,D,H){var N=e.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?N+H:N):H=N,L){case 1:var T=-1;break;case 2:T=250;break;case 5:T=1073741823;break;case 4:T=1e4;break;default:T=5e3}return T=H+T,L={id:h++,callback:D,priorityLevel:L,startTime:H,expirationTime:T,sortIndex:-1},H>N?(L.sortIndex=H,n(d,L),t(u)===null&&L===t(d)&&(C?(p(j),j=-1):C=!0,J(v,H-N))):(L.sortIndex=T,n(u,L),k||y||(k=!0,V(E))),L},e.unstable_shouldYield=K,e.unstable_wrapCallback=function(L){var D=f;return function(){var H=f;f=D;try{return L.apply(this,arguments)}finally{f=H}}}})(wc);kc.exports=wc;var Tf=kc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Of=S,en=Tf;function F(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Cc=new Set,Qr={};function Tt(e,n){or(e,n),or(e+"Capture",n)}function or(e,n){for(Qr[e]=n,e=0;e<n.length;e++)Cc.add(n[e])}var Bn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ta=Object.prototype.hasOwnProperty,Ff=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ui={},Vi={};function Pf(e){return Ta.call(Vi,e)?!0:Ta.call(Ui,e)?!1:Ff.test(e)?Vi[e]=!0:(Ui[e]=!0,!1)}function If(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Mf(e,n,t,r){if(n===null||typeof n>"u"||If(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function Re(e,n,t,r,o,a,l){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=a,this.removeEmptyString=l}var Oe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Oe[e]=new Re(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];Oe[n]=new Re(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Oe[e]=new Re(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Oe[e]=new Re(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Oe[e]=new Re(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Oe[e]=new Re(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Oe[e]=new Re(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Oe[e]=new Re(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Oe[e]=new Re(e,5,!1,e.toLowerCase(),null,!1,!1)});var Pl=/[\-:]([a-z])/g;function Il(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Pl,Il);Oe[n]=new Re(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Pl,Il);Oe[n]=new Re(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Pl,Il);Oe[n]=new Re(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Oe[e]=new Re(e,1,!1,e.toLowerCase(),null,!1,!1)});Oe.xlinkHref=new Re("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Oe[e]=new Re(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ml(e,n,t,r){var o=Oe.hasOwnProperty(n)?Oe[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Mf(n,t,o,r)&&(t=null),r||o===null?Pf(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):o.mustUseProperty?e[o.propertyName]=t===null?o.type===3?!1:"":t:(n=o.attributeName,r=o.attributeNamespace,t===null?e.removeAttribute(n):(o=o.type,t=o===3||o===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Un=Of.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ks=Symbol.for("react.element"),Rt=Symbol.for("react.portal"),Ut=Symbol.for("react.fragment"),_l=Symbol.for("react.strict_mode"),Oa=Symbol.for("react.profiler"),jc=Symbol.for("react.provider"),Sc=Symbol.for("react.context"),Bl=Symbol.for("react.forward_ref"),Fa=Symbol.for("react.suspense"),Pa=Symbol.for("react.suspense_list"),Dl=Symbol.for("react.memo"),Wn=Symbol.for("react.lazy"),Nc=Symbol.for("react.offscreen"),Hi=Symbol.iterator;function Cr(e){return e===null||typeof e!="object"?null:(e=Hi&&e[Hi]||e["@@iterator"],typeof e=="function"?e:null)}var ge=Object.assign,Zo;function Ir(e){if(Zo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Zo=n&&n[1]||""}return`
`+Zo+e}var qo=!1;function ea(e,n){if(!e||qo)return"";qo=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(d){var r=d}Reflect.construct(e,[],n)}else{try{n.call()}catch(d){r=d}e.call(n.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var o=d.stack.split(`
`),a=r.stack.split(`
`),l=o.length-1,i=a.length-1;1<=l&&0<=i&&o[l]!==a[i];)i--;for(;1<=l&&0<=i;l--,i--)if(o[l]!==a[i]){if(l!==1||i!==1)do if(l--,i--,0>i||o[l]!==a[i]){var u=`
`+o[l].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=l&&0<=i);break}}}finally{qo=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Ir(e):""}function _f(e){switch(e.tag){case 5:return Ir(e.type);case 16:return Ir("Lazy");case 13:return Ir("Suspense");case 19:return Ir("SuspenseList");case 0:case 2:case 15:return e=ea(e.type,!1),e;case 11:return e=ea(e.type.render,!1),e;case 1:return e=ea(e.type,!0),e;default:return""}}function Ia(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ut:return"Fragment";case Rt:return"Portal";case Oa:return"Profiler";case _l:return"StrictMode";case Fa:return"Suspense";case Pa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Sc:return(e.displayName||"Context")+".Consumer";case jc:return(e._context.displayName||"Context")+".Provider";case Bl:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Dl:return n=e.displayName||null,n!==null?n:Ia(e.type)||"Memo";case Wn:n=e._payload,e=e._init;try{return Ia(e(n))}catch{}}return null}function Bf(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ia(n);case 8:return n===_l?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function at(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Lc(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Df(e){var n=Lc(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var o=t.get,a=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,a.call(this,l)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function ws(e){e._valueTracker||(e._valueTracker=Df(e))}function Ec(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Lc(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function eo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ma(e,n){var t=n.checked;return ge({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function $i(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=at(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Ac(e,n){n=n.checked,n!=null&&Ml(e,"checked",n,!1)}function _a(e,n){Ac(e,n);var t=at(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Ba(e,n.type,t):n.hasOwnProperty("defaultValue")&&Ba(e,n.type,at(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Gi(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Ba(e,n,t){(n!=="number"||eo(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Mr=Array.isArray;function Zt(e,n,t,r){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&r&&(e[t].defaultSelected=!0)}else{for(t=""+at(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function Da(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(F(91));return ge({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Wi(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(F(92));if(Mr(t)){if(1<t.length)throw Error(F(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:at(t)}}function Tc(e,n){var t=at(n.value),r=at(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function Ji(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Oc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function za(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Oc(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Cs,Fc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Cs=Cs||document.createElement("div"),Cs.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Cs.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Yr(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var zr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},zf=["Webkit","ms","Moz","O"];Object.keys(zr).forEach(function(e){zf.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),zr[n]=zr[e]})});function Pc(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||zr.hasOwnProperty(e)&&zr[e]?(""+n).trim():n+"px"}function Ic(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,o=Pc(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,o):e[t]=o}}var Rf=ge({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ra(e,n){if(n){if(Rf[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(F(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(F(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(F(61))}if(n.style!=null&&typeof n.style!="object")throw Error(F(62))}}function Ua(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Va=null;function zl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ha=null,qt=null,er=null;function Qi(e){if(e=ms(e)){if(typeof Ha!="function")throw Error(F(280));var n=e.stateNode;n&&(n=Mo(n),Ha(e.stateNode,e.type,n))}}function Mc(e){qt?er?er.push(e):er=[e]:qt=e}function _c(){if(qt){var e=qt,n=er;if(er=qt=null,Qi(e),n)for(e=0;e<n.length;e++)Qi(n[e])}}function Bc(e,n){return e(n)}function Dc(){}var na=!1;function zc(e,n,t){if(na)return e(n,t);na=!0;try{return Bc(e,n,t)}finally{na=!1,(qt!==null||er!==null)&&(Dc(),_c())}}function Kr(e,n){var t=e.stateNode;if(t===null)return null;var r=Mo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(F(231,n,typeof t));return t}var $a=!1;if(Bn)try{var jr={};Object.defineProperty(jr,"passive",{get:function(){$a=!0}}),window.addEventListener("test",jr,jr),window.removeEventListener("test",jr,jr)}catch{$a=!1}function Uf(e,n,t,r,o,a,l,i,u){var d=Array.prototype.slice.call(arguments,3);try{n.apply(t,d)}catch(h){this.onError(h)}}var Rr=!1,no=null,to=!1,Ga=null,Vf={onError:function(e){Rr=!0,no=e}};function Hf(e,n,t,r,o,a,l,i,u){Rr=!1,no=null,Uf.apply(Vf,arguments)}function $f(e,n,t,r,o,a,l,i,u){if(Hf.apply(this,arguments),Rr){if(Rr){var d=no;Rr=!1,no=null}else throw Error(F(198));to||(to=!0,Ga=d)}}function Ot(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Rc(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Yi(e){if(Ot(e)!==e)throw Error(F(188))}function Gf(e){var n=e.alternate;if(!n){if(n=Ot(e),n===null)throw Error(F(188));return n!==e?null:e}for(var t=e,r=n;;){var o=t.return;if(o===null)break;var a=o.alternate;if(a===null){if(r=o.return,r!==null){t=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===t)return Yi(o),e;if(a===r)return Yi(o),n;a=a.sibling}throw Error(F(188))}if(t.return!==r.return)t=o,r=a;else{for(var l=!1,i=o.child;i;){if(i===t){l=!0,t=o,r=a;break}if(i===r){l=!0,r=o,t=a;break}i=i.sibling}if(!l){for(i=a.child;i;){if(i===t){l=!0,t=a,r=o;break}if(i===r){l=!0,r=a,t=o;break}i=i.sibling}if(!l)throw Error(F(189))}}if(t.alternate!==r)throw Error(F(190))}if(t.tag!==3)throw Error(F(188));return t.stateNode.current===t?e:n}function Uc(e){return e=Gf(e),e!==null?Vc(e):null}function Vc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Vc(e);if(n!==null)return n;e=e.sibling}return null}var Hc=en.unstable_scheduleCallback,Ki=en.unstable_cancelCallback,Wf=en.unstable_shouldYield,Jf=en.unstable_requestPaint,be=en.unstable_now,Qf=en.unstable_getCurrentPriorityLevel,Rl=en.unstable_ImmediatePriority,$c=en.unstable_UserBlockingPriority,ro=en.unstable_NormalPriority,Yf=en.unstable_LowPriority,Gc=en.unstable_IdlePriority,Oo=null,Ln=null;function Kf(e){if(Ln&&typeof Ln.onCommitFiberRoot=="function")try{Ln.onCommitFiberRoot(Oo,e,void 0,(e.current.flags&128)===128)}catch{}}var vn=Math.clz32?Math.clz32:qf,Xf=Math.log,Zf=Math.LN2;function qf(e){return e>>>=0,e===0?32:31-(Xf(e)/Zf|0)|0}var js=64,Ss=4194304;function _r(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function so(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,l=t&268435455;if(l!==0){var i=l&~o;i!==0?r=_r(i):(a&=l,a!==0&&(r=_r(a)))}else l=t&~o,l!==0?r=_r(l):a!==0&&(r=_r(a));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,a=n&-n,o>=a||o===16&&(a&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-vn(n),o=1<<t,r|=e[t],n&=~o;return r}function em(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function nm(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-vn(a),i=1<<l,u=o[l];u===-1?(!(i&t)||i&r)&&(o[l]=em(i,n)):u<=n&&(e.expiredLanes|=i),a&=~i}}function Wa(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Wc(){var e=js;return js<<=1,!(js&4194240)&&(js=64),e}function ta(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function ps(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-vn(n),e[n]=t}function tm(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var o=31-vn(t),a=1<<o;n[o]=0,r[o]=-1,e[o]=-1,t&=~a}}function Ul(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-vn(t),o=1<<r;o&n|e[r]&n&&(e[r]|=n),t&=~o}}var oe=0;function Jc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Qc,Vl,Yc,Kc,Xc,Ja=!1,Ns=[],Zn=null,qn=null,et=null,Xr=new Map,Zr=new Map,Qn=[],rm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xi(e,n){switch(e){case"focusin":case"focusout":Zn=null;break;case"dragenter":case"dragleave":qn=null;break;case"mouseover":case"mouseout":et=null;break;case"pointerover":case"pointerout":Xr.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zr.delete(n.pointerId)}}function Sr(e,n,t,r,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},n!==null&&(n=ms(n),n!==null&&Vl(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function sm(e,n,t,r,o){switch(n){case"focusin":return Zn=Sr(Zn,e,n,t,r,o),!0;case"dragenter":return qn=Sr(qn,e,n,t,r,o),!0;case"mouseover":return et=Sr(et,e,n,t,r,o),!0;case"pointerover":var a=o.pointerId;return Xr.set(a,Sr(Xr.get(a)||null,e,n,t,r,o)),!0;case"gotpointercapture":return a=o.pointerId,Zr.set(a,Sr(Zr.get(a)||null,e,n,t,r,o)),!0}return!1}function Zc(e){var n=vt(e.target);if(n!==null){var t=Ot(n);if(t!==null){if(n=t.tag,n===13){if(n=Rc(t),n!==null){e.blockedOn=n,Xc(e.priority,function(){Yc(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Hs(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Qa(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);Va=r,t.target.dispatchEvent(r),Va=null}else return n=ms(t),n!==null&&Vl(n),e.blockedOn=t,!1;n.shift()}return!0}function Zi(e,n,t){Hs(e)&&t.delete(n)}function om(){Ja=!1,Zn!==null&&Hs(Zn)&&(Zn=null),qn!==null&&Hs(qn)&&(qn=null),et!==null&&Hs(et)&&(et=null),Xr.forEach(Zi),Zr.forEach(Zi)}function Nr(e,n){e.blockedOn===n&&(e.blockedOn=null,Ja||(Ja=!0,en.unstable_scheduleCallback(en.unstable_NormalPriority,om)))}function qr(e){function n(o){return Nr(o,e)}if(0<Ns.length){Nr(Ns[0],e);for(var t=1;t<Ns.length;t++){var r=Ns[t];r.blockedOn===e&&(r.blockedOn=null)}}for(Zn!==null&&Nr(Zn,e),qn!==null&&Nr(qn,e),et!==null&&Nr(et,e),Xr.forEach(n),Zr.forEach(n),t=0;t<Qn.length;t++)r=Qn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<Qn.length&&(t=Qn[0],t.blockedOn===null);)Zc(t),t.blockedOn===null&&Qn.shift()}var nr=Un.ReactCurrentBatchConfig,oo=!0;function am(e,n,t,r){var o=oe,a=nr.transition;nr.transition=null;try{oe=1,Hl(e,n,t,r)}finally{oe=o,nr.transition=a}}function lm(e,n,t,r){var o=oe,a=nr.transition;nr.transition=null;try{oe=4,Hl(e,n,t,r)}finally{oe=o,nr.transition=a}}function Hl(e,n,t,r){if(oo){var o=Qa(e,n,t,r);if(o===null)pa(e,n,r,ao,t),Xi(e,r);else if(sm(o,e,n,t,r))r.stopPropagation();else if(Xi(e,r),n&4&&-1<rm.indexOf(e)){for(;o!==null;){var a=ms(o);if(a!==null&&Qc(a),a=Qa(e,n,t,r),a===null&&pa(e,n,r,ao,t),a===o)break;o=a}o!==null&&r.stopPropagation()}else pa(e,n,r,null,t)}}var ao=null;function Qa(e,n,t,r){if(ao=null,e=zl(r),e=vt(e),e!==null)if(n=Ot(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Rc(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return ao=e,null}function qc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qf()){case Rl:return 1;case $c:return 4;case ro:case Yf:return 16;case Gc:return 536870912;default:return 16}default:return 16}}var Kn=null,$l=null,$s=null;function ed(){if($s)return $s;var e,n=$l,t=n.length,r,o="value"in Kn?Kn.value:Kn.textContent,a=o.length;for(e=0;e<t&&n[e]===o[e];e++);var l=t-e;for(r=1;r<=l&&n[t-r]===o[a-r];r++);return $s=o.slice(e,1<r?1-r:void 0)}function Gs(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ls(){return!0}function qi(){return!1}function tn(e){function n(t,r,o,a,l){this._reactName=t,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(a):a[i]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ls:qi,this.isPropagationStopped=qi,this}return ge(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ls)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ls)},persist:function(){},isPersistent:Ls}),n}var gr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gl=tn(gr),fs=ge({},gr,{view:0,detail:0}),im=tn(fs),ra,sa,Lr,Fo=ge({},fs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Lr&&(Lr&&e.type==="mousemove"?(ra=e.screenX-Lr.screenX,sa=e.screenY-Lr.screenY):sa=ra=0,Lr=e),ra)},movementY:function(e){return"movementY"in e?e.movementY:sa}}),eu=tn(Fo),um=ge({},Fo,{dataTransfer:0}),cm=tn(um),dm=ge({},fs,{relatedTarget:0}),oa=tn(dm),pm=ge({},gr,{animationName:0,elapsedTime:0,pseudoElement:0}),fm=tn(pm),mm=ge({},gr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),hm=tn(mm),gm=ge({},gr,{data:0}),nu=tn(gm),xm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ym={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function bm(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=vm[e])?!!n[e]:!1}function Wl(){return bm}var km=ge({},fs,{key:function(e){if(e.key){var n=xm[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Gs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ym[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wl,charCode:function(e){return e.type==="keypress"?Gs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Gs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),wm=tn(km),Cm=ge({},Fo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tu=tn(Cm),jm=ge({},fs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wl}),Sm=tn(jm),Nm=ge({},gr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Lm=tn(Nm),Em=ge({},Fo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Am=tn(Em),Tm=[9,13,27,32],Jl=Bn&&"CompositionEvent"in window,Ur=null;Bn&&"documentMode"in document&&(Ur=document.documentMode);var Om=Bn&&"TextEvent"in window&&!Ur,nd=Bn&&(!Jl||Ur&&8<Ur&&11>=Ur),ru=" ",su=!1;function td(e,n){switch(e){case"keyup":return Tm.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function rd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Vt=!1;function Fm(e,n){switch(e){case"compositionend":return rd(n);case"keypress":return n.which!==32?null:(su=!0,ru);case"textInput":return e=n.data,e===ru&&su?null:e;default:return null}}function Pm(e,n){if(Vt)return e==="compositionend"||!Jl&&td(e,n)?(e=ed(),$s=$l=Kn=null,Vt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return nd&&n.locale!=="ko"?null:n.data;default:return null}}var Im={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ou(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Im[e.type]:n==="textarea"}function sd(e,n,t,r){Mc(r),n=lo(n,"onChange"),0<n.length&&(t=new Gl("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Vr=null,es=null;function Mm(e){hd(e,0)}function Po(e){var n=Gt(e);if(Ec(n))return e}function _m(e,n){if(e==="change")return n}var od=!1;if(Bn){var aa;if(Bn){var la="oninput"in document;if(!la){var au=document.createElement("div");au.setAttribute("oninput","return;"),la=typeof au.oninput=="function"}aa=la}else aa=!1;od=aa&&(!document.documentMode||9<document.documentMode)}function lu(){Vr&&(Vr.detachEvent("onpropertychange",ad),es=Vr=null)}function ad(e){if(e.propertyName==="value"&&Po(es)){var n=[];sd(n,es,e,zl(e)),zc(Mm,n)}}function Bm(e,n,t){e==="focusin"?(lu(),Vr=n,es=t,Vr.attachEvent("onpropertychange",ad)):e==="focusout"&&lu()}function Dm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Po(es)}function zm(e,n){if(e==="click")return Po(n)}function Rm(e,n){if(e==="input"||e==="change")return Po(n)}function Um(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var kn=typeof Object.is=="function"?Object.is:Um;function ns(e,n){if(kn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var o=t[r];if(!Ta.call(n,o)||!kn(e[o],n[o]))return!1}return!0}function iu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function uu(e,n){var t=iu(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=iu(t)}}function ld(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?ld(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function id(){for(var e=window,n=eo();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=eo(e.document)}return n}function Ql(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Vm(e){var n=id(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&ld(t.ownerDocument.documentElement,t)){if(r!==null&&Ql(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=t.textContent.length,a=Math.min(r.start,o);r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=uu(t,a);var l=uu(t,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(n),e.extend(l.node,l.offset)):(n.setEnd(l.node,l.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Hm=Bn&&"documentMode"in document&&11>=document.documentMode,Ht=null,Ya=null,Hr=null,Ka=!1;function cu(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ka||Ht==null||Ht!==eo(r)||(r=Ht,"selectionStart"in r&&Ql(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Hr&&ns(Hr,r)||(Hr=r,r=lo(Ya,"onSelect"),0<r.length&&(n=new Gl("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Ht)))}function Es(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var $t={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionend:Es("Transition","TransitionEnd")},ia={},ud={};Bn&&(ud=document.createElement("div").style,"AnimationEvent"in window||(delete $t.animationend.animation,delete $t.animationiteration.animation,delete $t.animationstart.animation),"TransitionEvent"in window||delete $t.transitionend.transition);function Io(e){if(ia[e])return ia[e];if(!$t[e])return e;var n=$t[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in ud)return ia[e]=n[t];return e}var cd=Io("animationend"),dd=Io("animationiteration"),pd=Io("animationstart"),fd=Io("transitionend"),md=new Map,du="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ut(e,n){md.set(e,n),Tt(n,[e])}for(var ua=0;ua<du.length;ua++){var ca=du[ua],$m=ca.toLowerCase(),Gm=ca[0].toUpperCase()+ca.slice(1);ut($m,"on"+Gm)}ut(cd,"onAnimationEnd");ut(dd,"onAnimationIteration");ut(pd,"onAnimationStart");ut("dblclick","onDoubleClick");ut("focusin","onFocus");ut("focusout","onBlur");ut(fd,"onTransitionEnd");or("onMouseEnter",["mouseout","mouseover"]);or("onMouseLeave",["mouseout","mouseover"]);or("onPointerEnter",["pointerout","pointerover"]);or("onPointerLeave",["pointerout","pointerover"]);Tt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Tt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Tt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Tt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Tt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Tt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Br="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Wm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Br));function pu(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,$f(r,n,void 0,e),e.currentTarget=null}function hd(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],o=r.event;r=r.listeners;e:{var a=void 0;if(n)for(var l=r.length-1;0<=l;l--){var i=r[l],u=i.instance,d=i.currentTarget;if(i=i.listener,u!==a&&o.isPropagationStopped())break e;pu(o,i,d),a=u}else for(l=0;l<r.length;l++){if(i=r[l],u=i.instance,d=i.currentTarget,i=i.listener,u!==a&&o.isPropagationStopped())break e;pu(o,i,d),a=u}}}if(to)throw e=Ga,to=!1,Ga=null,e}function ue(e,n){var t=n[nl];t===void 0&&(t=n[nl]=new Set);var r=e+"__bubble";t.has(r)||(gd(n,e,2,!1),t.add(r))}function da(e,n,t){var r=0;n&&(r|=4),gd(t,e,r,n)}var As="_reactListening"+Math.random().toString(36).slice(2);function ts(e){if(!e[As]){e[As]=!0,Cc.forEach(function(t){t!=="selectionchange"&&(Wm.has(t)||da(t,!1,e),da(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[As]||(n[As]=!0,da("selectionchange",!1,n))}}function gd(e,n,t,r){switch(qc(n)){case 1:var o=am;break;case 4:o=lm;break;default:o=Hl}t=o.bind(null,n,t,e),o=void 0,!$a||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function pa(e,n,t,r,o){var a=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var i=r.stateNode.containerInfo;if(i===o||i.nodeType===8&&i.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var u=l.tag;if((u===3||u===4)&&(u=l.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;l=l.return}for(;i!==null;){if(l=vt(i),l===null)return;if(u=l.tag,u===5||u===6){r=a=l;continue e}i=i.parentNode}}r=r.return}zc(function(){var d=a,h=zl(t),g=[];e:{var f=md.get(e);if(f!==void 0){var y=Gl,k=e;switch(e){case"keypress":if(Gs(t)===0)break e;case"keydown":case"keyup":y=wm;break;case"focusin":k="focus",y=oa;break;case"focusout":k="blur",y=oa;break;case"beforeblur":case"afterblur":y=oa;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=eu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=cm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Sm;break;case cd:case dd:case pd:y=fm;break;case fd:y=Lm;break;case"scroll":y=im;break;case"wheel":y=Am;break;case"copy":case"cut":case"paste":y=hm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=tu}var C=(n&4)!==0,P=!C&&e==="scroll",p=C?f!==null?f+"Capture":null:f;C=[];for(var c=d,m;c!==null;){m=c;var v=m.stateNode;if(m.tag===5&&v!==null&&(m=v,p!==null&&(v=Kr(c,p),v!=null&&C.push(rs(c,v,m)))),P)break;c=c.return}0<C.length&&(f=new y(f,k,null,t,h),g.push({event:f,listeners:C}))}}if(!(n&7)){e:{if(f=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",f&&t!==Va&&(k=t.relatedTarget||t.fromElement)&&(vt(k)||k[Dn]))break e;if((y||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,y?(k=t.relatedTarget||t.toElement,y=d,k=k?vt(k):null,k!==null&&(P=Ot(k),k!==P||k.tag!==5&&k.tag!==6)&&(k=null)):(y=null,k=d),y!==k)){if(C=eu,v="onMouseLeave",p="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(C=tu,v="onPointerLeave",p="onPointerEnter",c="pointer"),P=y==null?f:Gt(y),m=k==null?f:Gt(k),f=new C(v,c+"leave",y,t,h),f.target=P,f.relatedTarget=m,v=null,vt(h)===d&&(C=new C(p,c+"enter",k,t,h),C.target=m,C.relatedTarget=P,v=C),P=v,y&&k)n:{for(C=y,p=k,c=0,m=C;m;m=_t(m))c++;for(m=0,v=p;v;v=_t(v))m++;for(;0<c-m;)C=_t(C),c--;for(;0<m-c;)p=_t(p),m--;for(;c--;){if(C===p||p!==null&&C===p.alternate)break n;C=_t(C),p=_t(p)}C=null}else C=null;y!==null&&fu(g,f,y,C,!1),k!==null&&P!==null&&fu(g,P,k,C,!0)}}e:{if(f=d?Gt(d):window,y=f.nodeName&&f.nodeName.toLowerCase(),y==="select"||y==="input"&&f.type==="file")var E=_m;else if(ou(f))if(od)E=Rm;else{E=Dm;var A=Bm}else(y=f.nodeName)&&y.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(E=zm);if(E&&(E=E(e,d))){sd(g,E,t,h);break e}A&&A(e,f,d),e==="focusout"&&(A=f._wrapperState)&&A.controlled&&f.type==="number"&&Ba(f,"number",f.value)}switch(A=d?Gt(d):window,e){case"focusin":(ou(A)||A.contentEditable==="true")&&(Ht=A,Ya=d,Hr=null);break;case"focusout":Hr=Ya=Ht=null;break;case"mousedown":Ka=!0;break;case"contextmenu":case"mouseup":case"dragend":Ka=!1,cu(g,t,h);break;case"selectionchange":if(Hm)break;case"keydown":case"keyup":cu(g,t,h)}var w;if(Jl)e:{switch(e){case"compositionstart":var j="onCompositionStart";break e;case"compositionend":j="onCompositionEnd";break e;case"compositionupdate":j="onCompositionUpdate";break e}j=void 0}else Vt?td(e,t)&&(j="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(j="onCompositionStart");j&&(nd&&t.locale!=="ko"&&(Vt||j!=="onCompositionStart"?j==="onCompositionEnd"&&Vt&&(w=ed()):(Kn=h,$l="value"in Kn?Kn.value:Kn.textContent,Vt=!0)),A=lo(d,j),0<A.length&&(j=new nu(j,e,null,t,h),g.push({event:j,listeners:A}),w?j.data=w:(w=rd(t),w!==null&&(j.data=w)))),(w=Om?Fm(e,t):Pm(e,t))&&(d=lo(d,"onBeforeInput"),0<d.length&&(h=new nu("onBeforeInput","beforeinput",null,t,h),g.push({event:h,listeners:d}),h.data=w))}hd(g,n)})}function rs(e,n,t){return{instance:e,listener:n,currentTarget:t}}function lo(e,n){for(var t=n+"Capture",r=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=Kr(e,t),a!=null&&r.unshift(rs(e,a,o)),a=Kr(e,n),a!=null&&r.push(rs(e,a,o))),e=e.return}return r}function _t(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function fu(e,n,t,r,o){for(var a=n._reactName,l=[];t!==null&&t!==r;){var i=t,u=i.alternate,d=i.stateNode;if(u!==null&&u===r)break;i.tag===5&&d!==null&&(i=d,o?(u=Kr(t,a),u!=null&&l.unshift(rs(t,u,i))):o||(u=Kr(t,a),u!=null&&l.push(rs(t,u,i)))),t=t.return}l.length!==0&&e.push({event:n,listeners:l})}var Jm=/\r\n?/g,Qm=/\u0000|\uFFFD/g;function mu(e){return(typeof e=="string"?e:""+e).replace(Jm,`
`).replace(Qm,"")}function Ts(e,n,t){if(n=mu(n),mu(e)!==n&&t)throw Error(F(425))}function io(){}var Xa=null,Za=null;function qa(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var el=typeof setTimeout=="function"?setTimeout:void 0,Ym=typeof clearTimeout=="function"?clearTimeout:void 0,hu=typeof Promise=="function"?Promise:void 0,Km=typeof queueMicrotask=="function"?queueMicrotask:typeof hu<"u"?function(e){return hu.resolve(null).then(e).catch(Xm)}:el;function Xm(e){setTimeout(function(){throw e})}function fa(e,n){var t=n,r=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(r===0){e.removeChild(o),qr(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=o}while(t);qr(n)}function nt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function gu(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var xr=Math.random().toString(36).slice(2),Nn="__reactFiber$"+xr,ss="__reactProps$"+xr,Dn="__reactContainer$"+xr,nl="__reactEvents$"+xr,Zm="__reactListeners$"+xr,qm="__reactHandles$"+xr;function vt(e){var n=e[Nn];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Dn]||t[Nn]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=gu(e);e!==null;){if(t=e[Nn])return t;e=gu(e)}return n}e=t,t=e.parentNode}return null}function ms(e){return e=e[Nn]||e[Dn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Gt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(F(33))}function Mo(e){return e[ss]||null}var tl=[],Wt=-1;function ct(e){return{current:e}}function ce(e){0>Wt||(e.current=tl[Wt],tl[Wt]=null,Wt--)}function ie(e,n){Wt++,tl[Wt]=e.current,e.current=n}var lt={},Me=ct(lt),Ge=ct(!1),St=lt;function ar(e,n){var t=e.type.contextTypes;if(!t)return lt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in t)o[a]=n[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function We(e){return e=e.childContextTypes,e!=null}function uo(){ce(Ge),ce(Me)}function xu(e,n,t){if(Me.current!==lt)throw Error(F(168));ie(Me,n),ie(Ge,t)}function xd(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(F(108,Bf(e)||"Unknown",o));return ge({},t,r)}function co(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||lt,St=Me.current,ie(Me,e),ie(Ge,Ge.current),!0}function yu(e,n,t){var r=e.stateNode;if(!r)throw Error(F(169));t?(e=xd(e,n,St),r.__reactInternalMemoizedMergedChildContext=e,ce(Ge),ce(Me),ie(Me,e)):ce(Ge),ie(Ge,t)}var Pn=null,_o=!1,ma=!1;function yd(e){Pn===null?Pn=[e]:Pn.push(e)}function e0(e){_o=!0,yd(e)}function dt(){if(!ma&&Pn!==null){ma=!0;var e=0,n=oe;try{var t=Pn;for(oe=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Pn=null,_o=!1}catch(o){throw Pn!==null&&(Pn=Pn.slice(e+1)),Hc(Rl,dt),o}finally{oe=n,ma=!1}}return null}var Jt=[],Qt=0,po=null,fo=0,on=[],an=0,Nt=null,In=1,Mn="";function gt(e,n){Jt[Qt++]=fo,Jt[Qt++]=po,po=e,fo=n}function vd(e,n,t){on[an++]=In,on[an++]=Mn,on[an++]=Nt,Nt=e;var r=In;e=Mn;var o=32-vn(r)-1;r&=~(1<<o),t+=1;var a=32-vn(n)+o;if(30<a){var l=o-o%5;a=(r&(1<<l)-1).toString(32),r>>=l,o-=l,In=1<<32-vn(n)+o|t<<o|r,Mn=a+e}else In=1<<a|t<<o|r,Mn=e}function Yl(e){e.return!==null&&(gt(e,1),vd(e,1,0))}function Kl(e){for(;e===po;)po=Jt[--Qt],Jt[Qt]=null,fo=Jt[--Qt],Jt[Qt]=null;for(;e===Nt;)Nt=on[--an],on[an]=null,Mn=on[--an],on[an]=null,In=on[--an],on[an]=null}var qe=null,Ze=null,fe=!1,yn=null;function bd(e,n){var t=ln(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function vu(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,qe=e,Ze=nt(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,qe=e,Ze=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Nt!==null?{id:In,overflow:Mn}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=ln(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,qe=e,Ze=null,!0):!1;default:return!1}}function rl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function sl(e){if(fe){var n=Ze;if(n){var t=n;if(!vu(e,n)){if(rl(e))throw Error(F(418));n=nt(t.nextSibling);var r=qe;n&&vu(e,n)?bd(r,t):(e.flags=e.flags&-4097|2,fe=!1,qe=e)}}else{if(rl(e))throw Error(F(418));e.flags=e.flags&-4097|2,fe=!1,qe=e}}}function bu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;qe=e}function Os(e){if(e!==qe)return!1;if(!fe)return bu(e),fe=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!qa(e.type,e.memoizedProps)),n&&(n=Ze)){if(rl(e))throw kd(),Error(F(418));for(;n;)bd(e,n),n=nt(n.nextSibling)}if(bu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(F(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){Ze=nt(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}Ze=null}}else Ze=qe?nt(e.stateNode.nextSibling):null;return!0}function kd(){for(var e=Ze;e;)e=nt(e.nextSibling)}function lr(){Ze=qe=null,fe=!1}function Xl(e){yn===null?yn=[e]:yn.push(e)}var n0=Un.ReactCurrentBatchConfig;function Er(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(F(309));var r=t.stateNode}if(!r)throw Error(F(147,e));var o=r,a=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===a?n.ref:(n=function(l){var i=o.refs;l===null?delete i[a]:i[a]=l},n._stringRef=a,n)}if(typeof e!="string")throw Error(F(284));if(!t._owner)throw Error(F(290,e))}return e}function Fs(e,n){throw e=Object.prototype.toString.call(n),Error(F(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function ku(e){var n=e._init;return n(e._payload)}function wd(e){function n(p,c){if(e){var m=p.deletions;m===null?(p.deletions=[c],p.flags|=16):m.push(c)}}function t(p,c){if(!e)return null;for(;c!==null;)n(p,c),c=c.sibling;return null}function r(p,c){for(p=new Map;c!==null;)c.key!==null?p.set(c.key,c):p.set(c.index,c),c=c.sibling;return p}function o(p,c){return p=ot(p,c),p.index=0,p.sibling=null,p}function a(p,c,m){return p.index=m,e?(m=p.alternate,m!==null?(m=m.index,m<c?(p.flags|=2,c):m):(p.flags|=2,c)):(p.flags|=1048576,c)}function l(p){return e&&p.alternate===null&&(p.flags|=2),p}function i(p,c,m,v){return c===null||c.tag!==6?(c=ka(m,p.mode,v),c.return=p,c):(c=o(c,m),c.return=p,c)}function u(p,c,m,v){var E=m.type;return E===Ut?h(p,c,m.props.children,v,m.key):c!==null&&(c.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Wn&&ku(E)===c.type)?(v=o(c,m.props),v.ref=Er(p,c,m),v.return=p,v):(v=Zs(m.type,m.key,m.props,null,p.mode,v),v.ref=Er(p,c,m),v.return=p,v)}function d(p,c,m,v){return c===null||c.tag!==4||c.stateNode.containerInfo!==m.containerInfo||c.stateNode.implementation!==m.implementation?(c=wa(m,p.mode,v),c.return=p,c):(c=o(c,m.children||[]),c.return=p,c)}function h(p,c,m,v,E){return c===null||c.tag!==7?(c=Ct(m,p.mode,v,E),c.return=p,c):(c=o(c,m),c.return=p,c)}function g(p,c,m){if(typeof c=="string"&&c!==""||typeof c=="number")return c=ka(""+c,p.mode,m),c.return=p,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case ks:return m=Zs(c.type,c.key,c.props,null,p.mode,m),m.ref=Er(p,null,c),m.return=p,m;case Rt:return c=wa(c,p.mode,m),c.return=p,c;case Wn:var v=c._init;return g(p,v(c._payload),m)}if(Mr(c)||Cr(c))return c=Ct(c,p.mode,m,null),c.return=p,c;Fs(p,c)}return null}function f(p,c,m,v){var E=c!==null?c.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return E!==null?null:i(p,c,""+m,v);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ks:return m.key===E?u(p,c,m,v):null;case Rt:return m.key===E?d(p,c,m,v):null;case Wn:return E=m._init,f(p,c,E(m._payload),v)}if(Mr(m)||Cr(m))return E!==null?null:h(p,c,m,v,null);Fs(p,m)}return null}function y(p,c,m,v,E){if(typeof v=="string"&&v!==""||typeof v=="number")return p=p.get(m)||null,i(c,p,""+v,E);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ks:return p=p.get(v.key===null?m:v.key)||null,u(c,p,v,E);case Rt:return p=p.get(v.key===null?m:v.key)||null,d(c,p,v,E);case Wn:var A=v._init;return y(p,c,m,A(v._payload),E)}if(Mr(v)||Cr(v))return p=p.get(m)||null,h(c,p,v,E,null);Fs(c,v)}return null}function k(p,c,m,v){for(var E=null,A=null,w=c,j=c=0,_=null;w!==null&&j<m.length;j++){w.index>j?(_=w,w=null):_=w.sibling;var I=f(p,w,m[j],v);if(I===null){w===null&&(w=_);break}e&&w&&I.alternate===null&&n(p,w),c=a(I,c,j),A===null?E=I:A.sibling=I,A=I,w=_}if(j===m.length)return t(p,w),fe&&gt(p,j),E;if(w===null){for(;j<m.length;j++)w=g(p,m[j],v),w!==null&&(c=a(w,c,j),A===null?E=w:A.sibling=w,A=w);return fe&&gt(p,j),E}for(w=r(p,w);j<m.length;j++)_=y(w,p,j,m[j],v),_!==null&&(e&&_.alternate!==null&&w.delete(_.key===null?j:_.key),c=a(_,c,j),A===null?E=_:A.sibling=_,A=_);return e&&w.forEach(function(K){return n(p,K)}),fe&&gt(p,j),E}function C(p,c,m,v){var E=Cr(m);if(typeof E!="function")throw Error(F(150));if(m=E.call(m),m==null)throw Error(F(151));for(var A=E=null,w=c,j=c=0,_=null,I=m.next();w!==null&&!I.done;j++,I=m.next()){w.index>j?(_=w,w=null):_=w.sibling;var K=f(p,w,I.value,v);if(K===null){w===null&&(w=_);break}e&&w&&K.alternate===null&&n(p,w),c=a(K,c,j),A===null?E=K:A.sibling=K,A=K,w=_}if(I.done)return t(p,w),fe&&gt(p,j),E;if(w===null){for(;!I.done;j++,I=m.next())I=g(p,I.value,v),I!==null&&(c=a(I,c,j),A===null?E=I:A.sibling=I,A=I);return fe&&gt(p,j),E}for(w=r(p,w);!I.done;j++,I=m.next())I=y(w,p,j,I.value,v),I!==null&&(e&&I.alternate!==null&&w.delete(I.key===null?j:I.key),c=a(I,c,j),A===null?E=I:A.sibling=I,A=I);return e&&w.forEach(function(X){return n(p,X)}),fe&&gt(p,j),E}function P(p,c,m,v){if(typeof m=="object"&&m!==null&&m.type===Ut&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ks:e:{for(var E=m.key,A=c;A!==null;){if(A.key===E){if(E=m.type,E===Ut){if(A.tag===7){t(p,A.sibling),c=o(A,m.props.children),c.return=p,p=c;break e}}else if(A.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Wn&&ku(E)===A.type){t(p,A.sibling),c=o(A,m.props),c.ref=Er(p,A,m),c.return=p,p=c;break e}t(p,A);break}else n(p,A);A=A.sibling}m.type===Ut?(c=Ct(m.props.children,p.mode,v,m.key),c.return=p,p=c):(v=Zs(m.type,m.key,m.props,null,p.mode,v),v.ref=Er(p,c,m),v.return=p,p=v)}return l(p);case Rt:e:{for(A=m.key;c!==null;){if(c.key===A)if(c.tag===4&&c.stateNode.containerInfo===m.containerInfo&&c.stateNode.implementation===m.implementation){t(p,c.sibling),c=o(c,m.children||[]),c.return=p,p=c;break e}else{t(p,c);break}else n(p,c);c=c.sibling}c=wa(m,p.mode,v),c.return=p,p=c}return l(p);case Wn:return A=m._init,P(p,c,A(m._payload),v)}if(Mr(m))return k(p,c,m,v);if(Cr(m))return C(p,c,m,v);Fs(p,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,c!==null&&c.tag===6?(t(p,c.sibling),c=o(c,m),c.return=p,p=c):(t(p,c),c=ka(m,p.mode,v),c.return=p,p=c),l(p)):t(p,c)}return P}var ir=wd(!0),Cd=wd(!1),mo=ct(null),ho=null,Yt=null,Zl=null;function ql(){Zl=Yt=ho=null}function ei(e){var n=mo.current;ce(mo),e._currentValue=n}function ol(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function tr(e,n){ho=e,Zl=Yt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&($e=!0),e.firstContext=null)}function cn(e){var n=e._currentValue;if(Zl!==e)if(e={context:e,memoizedValue:n,next:null},Yt===null){if(ho===null)throw Error(F(308));Yt=e,ho.dependencies={lanes:0,firstContext:e}}else Yt=Yt.next=e;return n}var bt=null;function ni(e){bt===null?bt=[e]:bt.push(e)}function jd(e,n,t,r){var o=n.interleaved;return o===null?(t.next=t,ni(n)):(t.next=o.next,o.next=t),n.interleaved=t,zn(e,r)}function zn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var Jn=!1;function ti(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Sd(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function _n(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function tt(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,zn(e,t)}return o=r.interleaved,o===null?(n.next=n,ni(r)):(n.next=o.next,o.next=n),r.interleaved=n,zn(e,t)}function Ws(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Ul(e,t)}}function wu(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var o=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?o=a=l:a=a.next=l,t=t.next}while(t!==null);a===null?o=a=n:a=a.next=n}else o=a=n;t={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function go(e,n,t,r){var o=e.updateQueue;Jn=!1;var a=o.firstBaseUpdate,l=o.lastBaseUpdate,i=o.shared.pending;if(i!==null){o.shared.pending=null;var u=i,d=u.next;u.next=null,l===null?a=d:l.next=d,l=u;var h=e.alternate;h!==null&&(h=h.updateQueue,i=h.lastBaseUpdate,i!==l&&(i===null?h.firstBaseUpdate=d:i.next=d,h.lastBaseUpdate=u))}if(a!==null){var g=o.baseState;l=0,h=d=u=null,i=a;do{var f=i.lane,y=i.eventTime;if((r&f)===f){h!==null&&(h=h.next={eventTime:y,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var k=e,C=i;switch(f=n,y=t,C.tag){case 1:if(k=C.payload,typeof k=="function"){g=k.call(y,g,f);break e}g=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=C.payload,f=typeof k=="function"?k.call(y,g,f):k,f==null)break e;g=ge({},g,f);break e;case 2:Jn=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,f=o.effects,f===null?o.effects=[i]:f.push(i))}else y={eventTime:y,lane:f,tag:i.tag,payload:i.payload,callback:i.callback,next:null},h===null?(d=h=y,u=g):h=h.next=y,l|=f;if(i=i.next,i===null){if(i=o.shared.pending,i===null)break;f=i,i=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(!0);if(h===null&&(u=g),o.baseState=u,o.firstBaseUpdate=d,o.lastBaseUpdate=h,n=o.shared.interleaved,n!==null){o=n;do l|=o.lane,o=o.next;while(o!==n)}else a===null&&(o.shared.lanes=0);Et|=l,e.lanes=l,e.memoizedState=g}}function Cu(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=t,typeof o!="function")throw Error(F(191,o));o.call(r)}}}var hs={},En=ct(hs),os=ct(hs),as=ct(hs);function kt(e){if(e===hs)throw Error(F(174));return e}function ri(e,n){switch(ie(as,n),ie(os,e),ie(En,hs),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:za(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=za(n,e)}ce(En),ie(En,n)}function ur(){ce(En),ce(os),ce(as)}function Nd(e){kt(as.current);var n=kt(En.current),t=za(n,e.type);n!==t&&(ie(os,e),ie(En,t))}function si(e){os.current===e&&(ce(En),ce(os))}var me=ct(0);function xo(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ha=[];function oi(){for(var e=0;e<ha.length;e++)ha[e]._workInProgressVersionPrimary=null;ha.length=0}var Js=Un.ReactCurrentDispatcher,ga=Un.ReactCurrentBatchConfig,Lt=0,he=null,je=null,Ne=null,yo=!1,$r=!1,ls=0,t0=0;function Fe(){throw Error(F(321))}function ai(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!kn(e[t],n[t]))return!1;return!0}function li(e,n,t,r,o,a){if(Lt=a,he=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Js.current=e===null||e.memoizedState===null?a0:l0,e=t(r,o),$r){a=0;do{if($r=!1,ls=0,25<=a)throw Error(F(301));a+=1,Ne=je=null,n.updateQueue=null,Js.current=i0,e=t(r,o)}while($r)}if(Js.current=vo,n=je!==null&&je.next!==null,Lt=0,Ne=je=he=null,yo=!1,n)throw Error(F(300));return e}function ii(){var e=ls!==0;return ls=0,e}function Sn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?he.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function dn(){if(je===null){var e=he.alternate;e=e!==null?e.memoizedState:null}else e=je.next;var n=Ne===null?he.memoizedState:Ne.next;if(n!==null)Ne=n,je=e;else{if(e===null)throw Error(F(310));je=e,e={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},Ne===null?he.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function is(e,n){return typeof n=="function"?n(e):n}function xa(e){var n=dn(),t=n.queue;if(t===null)throw Error(F(311));t.lastRenderedReducer=e;var r=je,o=r.baseQueue,a=t.pending;if(a!==null){if(o!==null){var l=o.next;o.next=a.next,a.next=l}r.baseQueue=o=a,t.pending=null}if(o!==null){a=o.next,r=r.baseState;var i=l=null,u=null,d=a;do{var h=d.lane;if((Lt&h)===h)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var g={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(i=u=g,l=r):u=u.next=g,he.lanes|=h,Et|=h}d=d.next}while(d!==null&&d!==a);u===null?l=r:u.next=i,kn(r,n.memoizedState)||($e=!0),n.memoizedState=r,n.baseState=l,n.baseQueue=u,t.lastRenderedState=r}if(e=t.interleaved,e!==null){o=e;do a=o.lane,he.lanes|=a,Et|=a,o=o.next;while(o!==e)}else o===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function ya(e){var n=dn(),t=n.queue;if(t===null)throw Error(F(311));t.lastRenderedReducer=e;var r=t.dispatch,o=t.pending,a=n.memoizedState;if(o!==null){t.pending=null;var l=o=o.next;do a=e(a,l.action),l=l.next;while(l!==o);kn(a,n.memoizedState)||($e=!0),n.memoizedState=a,n.baseQueue===null&&(n.baseState=a),t.lastRenderedState=a}return[a,r]}function Ld(){}function Ed(e,n){var t=he,r=dn(),o=n(),a=!kn(r.memoizedState,o);if(a&&(r.memoizedState=o,$e=!0),r=r.queue,ui(Od.bind(null,t,r,e),[e]),r.getSnapshot!==n||a||Ne!==null&&Ne.memoizedState.tag&1){if(t.flags|=2048,us(9,Td.bind(null,t,r,o,n),void 0,null),Le===null)throw Error(F(349));Lt&30||Ad(t,n,o)}return o}function Ad(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=he.updateQueue,n===null?(n={lastEffect:null,stores:null},he.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Td(e,n,t,r){n.value=t,n.getSnapshot=r,Fd(n)&&Pd(e)}function Od(e,n,t){return t(function(){Fd(n)&&Pd(e)})}function Fd(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!kn(e,t)}catch{return!0}}function Pd(e){var n=zn(e,1);n!==null&&bn(n,e,1,-1)}function ju(e){var n=Sn();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:is,lastRenderedState:e},n.queue=e,e=e.dispatch=o0.bind(null,he,e),[n.memoizedState,e]}function us(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=he.updateQueue,n===null?(n={lastEffect:null,stores:null},he.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Id(){return dn().memoizedState}function Qs(e,n,t,r){var o=Sn();he.flags|=e,o.memoizedState=us(1|n,t,void 0,r===void 0?null:r)}function Bo(e,n,t,r){var o=dn();r=r===void 0?null:r;var a=void 0;if(je!==null){var l=je.memoizedState;if(a=l.destroy,r!==null&&ai(r,l.deps)){o.memoizedState=us(n,t,a,r);return}}he.flags|=e,o.memoizedState=us(1|n,t,a,r)}function Su(e,n){return Qs(8390656,8,e,n)}function ui(e,n){return Bo(2048,8,e,n)}function Md(e,n){return Bo(4,2,e,n)}function _d(e,n){return Bo(4,4,e,n)}function Bd(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Dd(e,n,t){return t=t!=null?t.concat([e]):null,Bo(4,4,Bd.bind(null,n,e),t)}function ci(){}function zd(e,n){var t=dn();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ai(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Rd(e,n){var t=dn();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ai(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Ud(e,n,t){return Lt&21?(kn(t,n)||(t=Wc(),he.lanes|=t,Et|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,$e=!0),e.memoizedState=t)}function r0(e,n){var t=oe;oe=t!==0&&4>t?t:4,e(!0);var r=ga.transition;ga.transition={};try{e(!1),n()}finally{oe=t,ga.transition=r}}function Vd(){return dn().memoizedState}function s0(e,n,t){var r=st(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Hd(e))$d(n,t);else if(t=jd(e,n,t,r),t!==null){var o=De();bn(t,e,r,o),Gd(t,n,r)}}function o0(e,n,t){var r=st(e),o={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Hd(e))$d(n,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=n.lastRenderedReducer,a!==null))try{var l=n.lastRenderedState,i=a(l,t);if(o.hasEagerState=!0,o.eagerState=i,kn(i,l)){var u=n.interleaved;u===null?(o.next=o,ni(n)):(o.next=u.next,u.next=o),n.interleaved=o;return}}catch{}finally{}t=jd(e,n,o,r),t!==null&&(o=De(),bn(t,e,r,o),Gd(t,n,r))}}function Hd(e){var n=e.alternate;return e===he||n!==null&&n===he}function $d(e,n){$r=yo=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Gd(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Ul(e,t)}}var vo={readContext:cn,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useInsertionEffect:Fe,useLayoutEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useMutableSource:Fe,useSyncExternalStore:Fe,useId:Fe,unstable_isNewReconciler:!1},a0={readContext:cn,useCallback:function(e,n){return Sn().memoizedState=[e,n===void 0?null:n],e},useContext:cn,useEffect:Su,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Qs(4194308,4,Bd.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Qs(4194308,4,e,n)},useInsertionEffect:function(e,n){return Qs(4,2,e,n)},useMemo:function(e,n){var t=Sn();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Sn();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=s0.bind(null,he,e),[r.memoizedState,e]},useRef:function(e){var n=Sn();return e={current:e},n.memoizedState=e},useState:ju,useDebugValue:ci,useDeferredValue:function(e){return Sn().memoizedState=e},useTransition:function(){var e=ju(!1),n=e[0];return e=r0.bind(null,e[1]),Sn().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=he,o=Sn();if(fe){if(t===void 0)throw Error(F(407));t=t()}else{if(t=n(),Le===null)throw Error(F(349));Lt&30||Ad(r,n,t)}o.memoizedState=t;var a={value:t,getSnapshot:n};return o.queue=a,Su(Od.bind(null,r,a,e),[e]),r.flags|=2048,us(9,Td.bind(null,r,a,t,n),void 0,null),t},useId:function(){var e=Sn(),n=Le.identifierPrefix;if(fe){var t=Mn,r=In;t=(r&~(1<<32-vn(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=ls++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=t0++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},l0={readContext:cn,useCallback:zd,useContext:cn,useEffect:ui,useImperativeHandle:Dd,useInsertionEffect:Md,useLayoutEffect:_d,useMemo:Rd,useReducer:xa,useRef:Id,useState:function(){return xa(is)},useDebugValue:ci,useDeferredValue:function(e){var n=dn();return Ud(n,je.memoizedState,e)},useTransition:function(){var e=xa(is)[0],n=dn().memoizedState;return[e,n]},useMutableSource:Ld,useSyncExternalStore:Ed,useId:Vd,unstable_isNewReconciler:!1},i0={readContext:cn,useCallback:zd,useContext:cn,useEffect:ui,useImperativeHandle:Dd,useInsertionEffect:Md,useLayoutEffect:_d,useMemo:Rd,useReducer:ya,useRef:Id,useState:function(){return ya(is)},useDebugValue:ci,useDeferredValue:function(e){var n=dn();return je===null?n.memoizedState=e:Ud(n,je.memoizedState,e)},useTransition:function(){var e=ya(is)[0],n=dn().memoizedState;return[e,n]},useMutableSource:Ld,useSyncExternalStore:Ed,useId:Vd,unstable_isNewReconciler:!1};function gn(e,n){if(e&&e.defaultProps){n=ge({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function al(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:ge({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Do={isMounted:function(e){return(e=e._reactInternals)?Ot(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=De(),o=st(e),a=_n(r,o);a.payload=n,t!=null&&(a.callback=t),n=tt(e,a,o),n!==null&&(bn(n,e,o,r),Ws(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=De(),o=st(e),a=_n(r,o);a.tag=1,a.payload=n,t!=null&&(a.callback=t),n=tt(e,a,o),n!==null&&(bn(n,e,o,r),Ws(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=De(),r=st(e),o=_n(t,r);o.tag=2,n!=null&&(o.callback=n),n=tt(e,o,r),n!==null&&(bn(n,e,r,t),Ws(n,e,r))}};function Nu(e,n,t,r,o,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,l):n.prototype&&n.prototype.isPureReactComponent?!ns(t,r)||!ns(o,a):!0}function Wd(e,n,t){var r=!1,o=lt,a=n.contextType;return typeof a=="object"&&a!==null?a=cn(a):(o=We(n)?St:Me.current,r=n.contextTypes,a=(r=r!=null)?ar(e,o):lt),n=new n(t,a),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Do,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),n}function Lu(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Do.enqueueReplaceState(n,n.state,null)}function ll(e,n,t,r){var o=e.stateNode;o.props=t,o.state=e.memoizedState,o.refs={},ti(e);var a=n.contextType;typeof a=="object"&&a!==null?o.context=cn(a):(a=We(n)?St:Me.current,o.context=ar(e,a)),o.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(al(e,n,a,t),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&Do.enqueueReplaceState(o,o.state,null),go(e,t,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function cr(e,n){try{var t="",r=n;do t+=_f(r),r=r.return;while(r);var o=t}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:n,stack:o,digest:null}}function va(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function il(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var u0=typeof WeakMap=="function"?WeakMap:Map;function Jd(e,n,t){t=_n(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){ko||(ko=!0,yl=r),il(e,n)},t}function Qd(e,n,t){t=_n(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){il(e,n)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){il(e,n),typeof r!="function"&&(rt===null?rt=new Set([this]):rt.add(this));var l=n.stack;this.componentDidCatch(n.value,{componentStack:l!==null?l:""})}),t}function Eu(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new u0;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(t)||(o.add(t),e=C0.bind(null,e,n,t),n.then(e,e))}function Au(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Tu(e,n,t,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=_n(-1,1),n.tag=2,tt(t,n,1))),t.lanes|=1),e)}var c0=Un.ReactCurrentOwner,$e=!1;function Be(e,n,t,r){n.child=e===null?Cd(n,null,t,r):ir(n,e.child,t,r)}function Ou(e,n,t,r,o){t=t.render;var a=n.ref;return tr(n,o),r=li(e,n,t,r,a,o),t=ii(),e!==null&&!$e?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Rn(e,n,o)):(fe&&t&&Yl(n),n.flags|=1,Be(e,n,r,o),n.child)}function Fu(e,n,t,r,o){if(e===null){var a=t.type;return typeof a=="function"&&!yi(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=a,Yd(e,n,a,r,o)):(e=Zs(t.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(a=e.child,!(e.lanes&o)){var l=a.memoizedProps;if(t=t.compare,t=t!==null?t:ns,t(l,r)&&e.ref===n.ref)return Rn(e,n,o)}return n.flags|=1,e=ot(a,r),e.ref=n.ref,e.return=n,n.child=e}function Yd(e,n,t,r,o){if(e!==null){var a=e.memoizedProps;if(ns(a,r)&&e.ref===n.ref)if($e=!1,n.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&($e=!0);else return n.lanes=e.lanes,Rn(e,n,o)}return ul(e,n,t,r,o)}function Kd(e,n,t){var r=n.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},ie(Xt,Xe),Xe|=t;else{if(!(t&1073741824))return e=a!==null?a.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,ie(Xt,Xe),Xe|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:t,ie(Xt,Xe),Xe|=r}else a!==null?(r=a.baseLanes|t,n.memoizedState=null):r=t,ie(Xt,Xe),Xe|=r;return Be(e,n,o,t),n.child}function Xd(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function ul(e,n,t,r,o){var a=We(t)?St:Me.current;return a=ar(n,a),tr(n,o),t=li(e,n,t,r,a,o),r=ii(),e!==null&&!$e?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Rn(e,n,o)):(fe&&r&&Yl(n),n.flags|=1,Be(e,n,t,o),n.child)}function Pu(e,n,t,r,o){if(We(t)){var a=!0;co(n)}else a=!1;if(tr(n,o),n.stateNode===null)Ys(e,n),Wd(n,t,r),ll(n,t,r,o),r=!0;else if(e===null){var l=n.stateNode,i=n.memoizedProps;l.props=i;var u=l.context,d=t.contextType;typeof d=="object"&&d!==null?d=cn(d):(d=We(t)?St:Me.current,d=ar(n,d));var h=t.getDerivedStateFromProps,g=typeof h=="function"||typeof l.getSnapshotBeforeUpdate=="function";g||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==r||u!==d)&&Lu(n,l,r,d),Jn=!1;var f=n.memoizedState;l.state=f,go(n,r,l,o),u=n.memoizedState,i!==r||f!==u||Ge.current||Jn?(typeof h=="function"&&(al(n,t,h,r),u=n.memoizedState),(i=Jn||Nu(n,t,i,r,f,u,d))?(g||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(n.flags|=4194308)):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),l.props=r,l.state=u,l.context=d,r=i):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{l=n.stateNode,Sd(e,n),i=n.memoizedProps,d=n.type===n.elementType?i:gn(n.type,i),l.props=d,g=n.pendingProps,f=l.context,u=t.contextType,typeof u=="object"&&u!==null?u=cn(u):(u=We(t)?St:Me.current,u=ar(n,u));var y=t.getDerivedStateFromProps;(h=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==g||f!==u)&&Lu(n,l,r,u),Jn=!1,f=n.memoizedState,l.state=f,go(n,r,l,o);var k=n.memoizedState;i!==g||f!==k||Ge.current||Jn?(typeof y=="function"&&(al(n,t,y,r),k=n.memoizedState),(d=Jn||Nu(n,t,d,r,f,k,u)||!1)?(h||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,k,u),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,k,u)),typeof l.componentDidUpdate=="function"&&(n.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=k),l.props=r,l.state=k,l.context=u,r=d):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&f===e.memoizedState||(n.flags|=1024),r=!1)}return cl(e,n,t,r,a,o)}function cl(e,n,t,r,o,a){Xd(e,n);var l=(n.flags&128)!==0;if(!r&&!l)return o&&yu(n,t,!1),Rn(e,n,a);r=n.stateNode,c0.current=n;var i=l&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&l?(n.child=ir(n,e.child,null,a),n.child=ir(n,null,i,a)):Be(e,n,i,a),n.memoizedState=r.state,o&&yu(n,t,!0),n.child}function Zd(e){var n=e.stateNode;n.pendingContext?xu(e,n.pendingContext,n.pendingContext!==n.context):n.context&&xu(e,n.context,!1),ri(e,n.containerInfo)}function Iu(e,n,t,r,o){return lr(),Xl(o),n.flags|=256,Be(e,n,t,r),n.child}var dl={dehydrated:null,treeContext:null,retryLane:0};function pl(e){return{baseLanes:e,cachePool:null,transitions:null}}function qd(e,n,t){var r=n.pendingProps,o=me.current,a=!1,l=(n.flags&128)!==0,i;if((i=l)||(i=e!==null&&e.memoizedState===null?!1:(o&2)!==0),i?(a=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),ie(me,o&1),e===null)return sl(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(l=r.children,e=r.fallback,a?(r=n.mode,a=n.child,l={mode:"hidden",children:l},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=Uo(l,r,0,null),e=Ct(e,r,t,null),a.return=n,e.return=n,a.sibling=e,n.child=a,n.child.memoizedState=pl(t),n.memoizedState=dl,e):di(n,l));if(o=e.memoizedState,o!==null&&(i=o.dehydrated,i!==null))return d0(e,n,l,r,i,o,t);if(a){a=r.fallback,l=n.mode,o=e.child,i=o.sibling;var u={mode:"hidden",children:r.children};return!(l&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=u,n.deletions=null):(r=ot(o,u),r.subtreeFlags=o.subtreeFlags&14680064),i!==null?a=ot(i,a):(a=Ct(a,l,t,null),a.flags|=2),a.return=n,r.return=n,r.sibling=a,n.child=r,r=a,a=n.child,l=e.child.memoizedState,l=l===null?pl(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~t,n.memoizedState=dl,r}return a=e.child,e=a.sibling,r=ot(a,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function di(e,n){return n=Uo({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Ps(e,n,t,r){return r!==null&&Xl(r),ir(n,e.child,null,t),e=di(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function d0(e,n,t,r,o,a,l){if(t)return n.flags&256?(n.flags&=-257,r=va(Error(F(422))),Ps(e,n,l,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(a=r.fallback,o=n.mode,r=Uo({mode:"visible",children:r.children},o,0,null),a=Ct(a,o,l,null),a.flags|=2,r.return=n,a.return=n,r.sibling=a,n.child=r,n.mode&1&&ir(n,e.child,null,l),n.child.memoizedState=pl(l),n.memoizedState=dl,a);if(!(n.mode&1))return Ps(e,n,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var i=r.dgst;return r=i,a=Error(F(419)),r=va(a,r,void 0),Ps(e,n,l,r)}if(i=(l&e.childLanes)!==0,$e||i){if(r=Le,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,zn(e,o),bn(r,e,o,-1))}return xi(),r=va(Error(F(421))),Ps(e,n,l,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=j0.bind(null,e),o._reactRetry=n,null):(e=a.treeContext,Ze=nt(o.nextSibling),qe=n,fe=!0,yn=null,e!==null&&(on[an++]=In,on[an++]=Mn,on[an++]=Nt,In=e.id,Mn=e.overflow,Nt=n),n=di(n,r.children),n.flags|=4096,n)}function Mu(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),ol(e.return,n,t)}function ba(e,n,t,r,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:o}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=t,a.tailMode=o)}function ep(e,n,t){var r=n.pendingProps,o=r.revealOrder,a=r.tail;if(Be(e,n,r.children,t),r=me.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Mu(e,t,n);else if(e.tag===19)Mu(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ie(me,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&xo(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),ba(n,!1,o,t,a);break;case"backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&xo(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}ba(n,!0,t,null,a);break;case"together":ba(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ys(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Rn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Et|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(F(153));if(n.child!==null){for(e=n.child,t=ot(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=ot(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function p0(e,n,t){switch(n.tag){case 3:Zd(n),lr();break;case 5:Nd(n);break;case 1:We(n.type)&&co(n);break;case 4:ri(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;ie(mo,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(ie(me,me.current&1),n.flags|=128,null):t&n.child.childLanes?qd(e,n,t):(ie(me,me.current&1),e=Rn(e,n,t),e!==null?e.sibling:null);ie(me,me.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return ep(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),ie(me,me.current),r)break;return null;case 22:case 23:return n.lanes=0,Kd(e,n,t)}return Rn(e,n,t)}var np,fl,tp,rp;np=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};fl=function(){};tp=function(e,n,t,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,kt(En.current);var a=null;switch(t){case"input":o=Ma(e,o),r=Ma(e,r),a=[];break;case"select":o=ge({},o,{value:void 0}),r=ge({},r,{value:void 0}),a=[];break;case"textarea":o=Da(e,o),r=Da(e,r),a=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=io)}Ra(t,r);var l;t=null;for(d in o)if(!r.hasOwnProperty(d)&&o.hasOwnProperty(d)&&o[d]!=null)if(d==="style"){var i=o[d];for(l in i)i.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Qr.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var u=r[d];if(i=o!=null?o[d]:void 0,r.hasOwnProperty(d)&&u!==i&&(u!=null||i!=null))if(d==="style")if(i){for(l in i)!i.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in u)u.hasOwnProperty(l)&&i[l]!==u[l]&&(t||(t={}),t[l]=u[l])}else t||(a||(a=[]),a.push(d,t)),t=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,i=i?i.__html:void 0,u!=null&&i!==u&&(a=a||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Qr.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&ue("scroll",e),a||i===u||(a=[])):(a=a||[]).push(d,u))}t&&(a=a||[]).push("style",t);var d=a;(n.updateQueue=d)&&(n.flags|=4)}};rp=function(e,n,t,r){t!==r&&(n.flags|=4)};function Ar(e,n){if(!fe)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Pe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function f0(e,n,t){var r=n.pendingProps;switch(Kl(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pe(n),null;case 1:return We(n.type)&&uo(),Pe(n),null;case 3:return r=n.stateNode,ur(),ce(Ge),ce(Me),oi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Os(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,yn!==null&&(kl(yn),yn=null))),fl(e,n),Pe(n),null;case 5:si(n);var o=kt(as.current);if(t=n.type,e!==null&&n.stateNode!=null)tp(e,n,t,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(F(166));return Pe(n),null}if(e=kt(En.current),Os(n)){r=n.stateNode,t=n.type;var a=n.memoizedProps;switch(r[Nn]=n,r[ss]=a,e=(n.mode&1)!==0,t){case"dialog":ue("cancel",r),ue("close",r);break;case"iframe":case"object":case"embed":ue("load",r);break;case"video":case"audio":for(o=0;o<Br.length;o++)ue(Br[o],r);break;case"source":ue("error",r);break;case"img":case"image":case"link":ue("error",r),ue("load",r);break;case"details":ue("toggle",r);break;case"input":$i(r,a),ue("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},ue("invalid",r);break;case"textarea":Wi(r,a),ue("invalid",r)}Ra(t,a),o=null;for(var l in a)if(a.hasOwnProperty(l)){var i=a[l];l==="children"?typeof i=="string"?r.textContent!==i&&(a.suppressHydrationWarning!==!0&&Ts(r.textContent,i,e),o=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(a.suppressHydrationWarning!==!0&&Ts(r.textContent,i,e),o=["children",""+i]):Qr.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&ue("scroll",r)}switch(t){case"input":ws(r),Gi(r,a,!0);break;case"textarea":ws(r),Ji(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=io)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Oc(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(t,{is:r.is}):(e=l.createElement(t),t==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,t),e[Nn]=n,e[ss]=r,np(e,n,!1,!1),n.stateNode=e;e:{switch(l=Ua(t,r),t){case"dialog":ue("cancel",e),ue("close",e),o=r;break;case"iframe":case"object":case"embed":ue("load",e),o=r;break;case"video":case"audio":for(o=0;o<Br.length;o++)ue(Br[o],e);o=r;break;case"source":ue("error",e),o=r;break;case"img":case"image":case"link":ue("error",e),ue("load",e),o=r;break;case"details":ue("toggle",e),o=r;break;case"input":$i(e,r),o=Ma(e,r),ue("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=ge({},r,{value:void 0}),ue("invalid",e);break;case"textarea":Wi(e,r),o=Da(e,r),ue("invalid",e);break;default:o=r}Ra(t,o),i=o;for(a in i)if(i.hasOwnProperty(a)){var u=i[a];a==="style"?Ic(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Fc(e,u)):a==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Yr(e,u):typeof u=="number"&&Yr(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Qr.hasOwnProperty(a)?u!=null&&a==="onScroll"&&ue("scroll",e):u!=null&&Ml(e,a,u,l))}switch(t){case"input":ws(e),Gi(e,r,!1);break;case"textarea":ws(e),Ji(e);break;case"option":r.value!=null&&e.setAttribute("value",""+at(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Zt(e,!!r.multiple,a,!1):r.defaultValue!=null&&Zt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=io)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return Pe(n),null;case 6:if(e&&n.stateNode!=null)rp(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(F(166));if(t=kt(as.current),kt(En.current),Os(n)){if(r=n.stateNode,t=n.memoizedProps,r[Nn]=n,(a=r.nodeValue!==t)&&(e=qe,e!==null))switch(e.tag){case 3:Ts(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ts(r.nodeValue,t,(e.mode&1)!==0)}a&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Nn]=n,n.stateNode=r}return Pe(n),null;case 13:if(ce(me),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(fe&&Ze!==null&&n.mode&1&&!(n.flags&128))kd(),lr(),n.flags|=98560,a=!1;else if(a=Os(n),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(F(318));if(a=n.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(F(317));a[Nn]=n}else lr(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;Pe(n),a=!1}else yn!==null&&(kl(yn),yn=null),a=!0;if(!a)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||me.current&1?Se===0&&(Se=3):xi())),n.updateQueue!==null&&(n.flags|=4),Pe(n),null);case 4:return ur(),fl(e,n),e===null&&ts(n.stateNode.containerInfo),Pe(n),null;case 10:return ei(n.type._context),Pe(n),null;case 17:return We(n.type)&&uo(),Pe(n),null;case 19:if(ce(me),a=n.memoizedState,a===null)return Pe(n),null;if(r=(n.flags&128)!==0,l=a.rendering,l===null)if(r)Ar(a,!1);else{if(Se!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(l=xo(e),l!==null){for(n.flags|=128,Ar(a,!1),r=l.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)a=t,e=r,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return ie(me,me.current&1|2),n.child}e=e.sibling}a.tail!==null&&be()>dr&&(n.flags|=128,r=!0,Ar(a,!1),n.lanes=4194304)}else{if(!r)if(e=xo(l),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Ar(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!fe)return Pe(n),null}else 2*be()-a.renderingStartTime>dr&&t!==1073741824&&(n.flags|=128,r=!0,Ar(a,!1),n.lanes=4194304);a.isBackwards?(l.sibling=n.child,n.child=l):(t=a.last,t!==null?t.sibling=l:n.child=l,a.last=l)}return a.tail!==null?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=be(),n.sibling=null,t=me.current,ie(me,r?t&1|2:t&1),n):(Pe(n),null);case 22:case 23:return gi(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?Xe&1073741824&&(Pe(n),n.subtreeFlags&6&&(n.flags|=8192)):Pe(n),null;case 24:return null;case 25:return null}throw Error(F(156,n.tag))}function m0(e,n){switch(Kl(n),n.tag){case 1:return We(n.type)&&uo(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ur(),ce(Ge),ce(Me),oi(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return si(n),null;case 13:if(ce(me),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(F(340));lr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return ce(me),null;case 4:return ur(),null;case 10:return ei(n.type._context),null;case 22:case 23:return gi(),null;case 24:return null;default:return null}}var Is=!1,Ie=!1,h0=typeof WeakSet=="function"?WeakSet:Set,U=null;function Kt(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){xe(e,n,r)}else t.current=null}function ml(e,n,t){try{t()}catch(r){xe(e,n,r)}}var _u=!1;function g0(e,n){if(Xa=oo,e=id(),Ql(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var l=0,i=-1,u=-1,d=0,h=0,g=e,f=null;n:for(;;){for(var y;g!==t||o!==0&&g.nodeType!==3||(i=l+o),g!==a||r!==0&&g.nodeType!==3||(u=l+r),g.nodeType===3&&(l+=g.nodeValue.length),(y=g.firstChild)!==null;)f=g,g=y;for(;;){if(g===e)break n;if(f===t&&++d===o&&(i=l),f===a&&++h===r&&(u=l),(y=g.nextSibling)!==null)break;g=f,f=g.parentNode}g=y}t=i===-1||u===-1?null:{start:i,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(Za={focusedElem:e,selectionRange:t},oo=!1,U=n;U!==null;)if(n=U,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,U=e;else for(;U!==null;){n=U;try{var k=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var C=k.memoizedProps,P=k.memoizedState,p=n.stateNode,c=p.getSnapshotBeforeUpdate(n.elementType===n.type?C:gn(n.type,C),P);p.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var m=n.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(v){xe(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,U=e;break}U=n.return}return k=_u,_u=!1,k}function Gr(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&ml(n,t,a)}o=o.next}while(o!==r)}}function zo(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function hl(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function sp(e){var n=e.alternate;n!==null&&(e.alternate=null,sp(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Nn],delete n[ss],delete n[nl],delete n[Zm],delete n[qm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function op(e){return e.tag===5||e.tag===3||e.tag===4}function Bu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||op(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=io));else if(r!==4&&(e=e.child,e!==null))for(gl(e,n,t),e=e.sibling;e!==null;)gl(e,n,t),e=e.sibling}function xl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(xl(e,n,t),e=e.sibling;e!==null;)xl(e,n,t),e=e.sibling}var Ee=null,xn=!1;function $n(e,n,t){for(t=t.child;t!==null;)ap(e,n,t),t=t.sibling}function ap(e,n,t){if(Ln&&typeof Ln.onCommitFiberUnmount=="function")try{Ln.onCommitFiberUnmount(Oo,t)}catch{}switch(t.tag){case 5:Ie||Kt(t,n);case 6:var r=Ee,o=xn;Ee=null,$n(e,n,t),Ee=r,xn=o,Ee!==null&&(xn?(e=Ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):Ee.removeChild(t.stateNode));break;case 18:Ee!==null&&(xn?(e=Ee,t=t.stateNode,e.nodeType===8?fa(e.parentNode,t):e.nodeType===1&&fa(e,t),qr(e)):fa(Ee,t.stateNode));break;case 4:r=Ee,o=xn,Ee=t.stateNode.containerInfo,xn=!0,$n(e,n,t),Ee=r,xn=o;break;case 0:case 11:case 14:case 15:if(!Ie&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var a=o,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&ml(t,n,l),o=o.next}while(o!==r)}$n(e,n,t);break;case 1:if(!Ie&&(Kt(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(i){xe(t,n,i)}$n(e,n,t);break;case 21:$n(e,n,t);break;case 22:t.mode&1?(Ie=(r=Ie)||t.memoizedState!==null,$n(e,n,t),Ie=r):$n(e,n,t);break;default:$n(e,n,t)}}function Du(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new h0),n.forEach(function(r){var o=S0.bind(null,e,r);t.has(r)||(t.add(r),r.then(o,o))})}}function hn(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];try{var a=e,l=n,i=l;e:for(;i!==null;){switch(i.tag){case 5:Ee=i.stateNode,xn=!1;break e;case 3:Ee=i.stateNode.containerInfo,xn=!0;break e;case 4:Ee=i.stateNode.containerInfo,xn=!0;break e}i=i.return}if(Ee===null)throw Error(F(160));ap(a,l,o),Ee=null,xn=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(d){xe(o,n,d)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)lp(n,e),n=n.sibling}function lp(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(hn(n,e),wn(e),r&4){try{Gr(3,e,e.return),zo(3,e)}catch(C){xe(e,e.return,C)}try{Gr(5,e,e.return)}catch(C){xe(e,e.return,C)}}break;case 1:hn(n,e),wn(e),r&512&&t!==null&&Kt(t,t.return);break;case 5:if(hn(n,e),wn(e),r&512&&t!==null&&Kt(t,t.return),e.flags&32){var o=e.stateNode;try{Yr(o,"")}catch(C){xe(e,e.return,C)}}if(r&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,l=t!==null?t.memoizedProps:a,i=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{i==="input"&&a.type==="radio"&&a.name!=null&&Ac(o,a),Ua(i,l);var d=Ua(i,a);for(l=0;l<u.length;l+=2){var h=u[l],g=u[l+1];h==="style"?Ic(o,g):h==="dangerouslySetInnerHTML"?Fc(o,g):h==="children"?Yr(o,g):Ml(o,h,g,d)}switch(i){case"input":_a(o,a);break;case"textarea":Tc(o,a);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var y=a.value;y!=null?Zt(o,!!a.multiple,y,!1):f!==!!a.multiple&&(a.defaultValue!=null?Zt(o,!!a.multiple,a.defaultValue,!0):Zt(o,!!a.multiple,a.multiple?[]:"",!1))}o[ss]=a}catch(C){xe(e,e.return,C)}}break;case 6:if(hn(n,e),wn(e),r&4){if(e.stateNode===null)throw Error(F(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(C){xe(e,e.return,C)}}break;case 3:if(hn(n,e),wn(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{qr(n.containerInfo)}catch(C){xe(e,e.return,C)}break;case 4:hn(n,e),wn(e);break;case 13:hn(n,e),wn(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(mi=be())),r&4&&Du(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(Ie=(d=Ie)||h,hn(n,e),Ie=d):hn(n,e),wn(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(U=e,h=e.child;h!==null;){for(g=U=h;U!==null;){switch(f=U,y=f.child,f.tag){case 0:case 11:case 14:case 15:Gr(4,f,f.return);break;case 1:Kt(f,f.return);var k=f.stateNode;if(typeof k.componentWillUnmount=="function"){r=f,t=f.return;try{n=r,k.props=n.memoizedProps,k.state=n.memoizedState,k.componentWillUnmount()}catch(C){xe(r,t,C)}}break;case 5:Kt(f,f.return);break;case 22:if(f.memoizedState!==null){Ru(g);continue}}y!==null?(y.return=f,U=y):Ru(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{o=g.stateNode,d?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(i=g.stateNode,u=g.memoizedProps.style,l=u!=null&&u.hasOwnProperty("display")?u.display:null,i.style.display=Pc("display",l))}catch(C){xe(e,e.return,C)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(C){xe(e,e.return,C)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:hn(n,e),wn(e),r&4&&Du(e);break;case 21:break;default:hn(n,e),wn(e)}}function wn(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(op(t)){var r=t;break e}t=t.return}throw Error(F(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Yr(o,""),r.flags&=-33);var a=Bu(e);xl(e,a,o);break;case 3:case 4:var l=r.stateNode.containerInfo,i=Bu(e);gl(e,i,l);break;default:throw Error(F(161))}}catch(u){xe(e,e.return,u)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function x0(e,n,t){U=e,ip(e)}function ip(e,n,t){for(var r=(e.mode&1)!==0;U!==null;){var o=U,a=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||Is;if(!l){var i=o.alternate,u=i!==null&&i.memoizedState!==null||Ie;i=Is;var d=Ie;if(Is=l,(Ie=u)&&!d)for(U=o;U!==null;)l=U,u=l.child,l.tag===22&&l.memoizedState!==null?Uu(o):u!==null?(u.return=l,U=u):Uu(o);for(;a!==null;)U=a,ip(a),a=a.sibling;U=o,Is=i,Ie=d}zu(e)}else o.subtreeFlags&8772&&a!==null?(a.return=o,U=a):zu(e)}}function zu(e){for(;U!==null;){var n=U;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:Ie||zo(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!Ie)if(t===null)r.componentDidMount();else{var o=n.elementType===n.type?t.memoizedProps:gn(n.type,t.memoizedProps);r.componentDidUpdate(o,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=n.updateQueue;a!==null&&Cu(n,a,r);break;case 3:var l=n.updateQueue;if(l!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Cu(n,l,t)}break;case 5:var i=n.stateNode;if(t===null&&n.flags&4){t=i;var u=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var d=n.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&qr(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}Ie||n.flags&512&&hl(n)}catch(f){xe(n,n.return,f)}}if(n===e){U=null;break}if(t=n.sibling,t!==null){t.return=n.return,U=t;break}U=n.return}}function Ru(e){for(;U!==null;){var n=U;if(n===e){U=null;break}var t=n.sibling;if(t!==null){t.return=n.return,U=t;break}U=n.return}}function Uu(e){for(;U!==null;){var n=U;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{zo(4,n)}catch(u){xe(n,t,u)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(u){xe(n,o,u)}}var a=n.return;try{hl(n)}catch(u){xe(n,a,u)}break;case 5:var l=n.return;try{hl(n)}catch(u){xe(n,l,u)}}}catch(u){xe(n,n.return,u)}if(n===e){U=null;break}var i=n.sibling;if(i!==null){i.return=n.return,U=i;break}U=n.return}}var y0=Math.ceil,bo=Un.ReactCurrentDispatcher,pi=Un.ReactCurrentOwner,un=Un.ReactCurrentBatchConfig,te=0,Le=null,ke=null,Te=0,Xe=0,Xt=ct(0),Se=0,cs=null,Et=0,Ro=0,fi=0,Wr=null,He=null,mi=0,dr=1/0,Fn=null,ko=!1,yl=null,rt=null,Ms=!1,Xn=null,wo=0,Jr=0,vl=null,Ks=-1,Xs=0;function De(){return te&6?be():Ks!==-1?Ks:Ks=be()}function st(e){return e.mode&1?te&2&&Te!==0?Te&-Te:n0.transition!==null?(Xs===0&&(Xs=Wc()),Xs):(e=oe,e!==0||(e=window.event,e=e===void 0?16:qc(e.type)),e):1}function bn(e,n,t,r){if(50<Jr)throw Jr=0,vl=null,Error(F(185));ps(e,t,r),(!(te&2)||e!==Le)&&(e===Le&&(!(te&2)&&(Ro|=t),Se===4&&Yn(e,Te)),Je(e,r),t===1&&te===0&&!(n.mode&1)&&(dr=be()+500,_o&&dt()))}function Je(e,n){var t=e.callbackNode;nm(e,n);var r=so(e,e===Le?Te:0);if(r===0)t!==null&&Ki(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&Ki(t),n===1)e.tag===0?e0(Vu.bind(null,e)):yd(Vu.bind(null,e)),Km(function(){!(te&6)&&dt()}),t=null;else{switch(Jc(r)){case 1:t=Rl;break;case 4:t=$c;break;case 16:t=ro;break;case 536870912:t=Gc;break;default:t=ro}t=gp(t,up.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function up(e,n){if(Ks=-1,Xs=0,te&6)throw Error(F(327));var t=e.callbackNode;if(rr()&&e.callbackNode!==t)return null;var r=so(e,e===Le?Te:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=Co(e,r);else{n=r;var o=te;te|=2;var a=dp();(Le!==e||Te!==n)&&(Fn=null,dr=be()+500,wt(e,n));do try{k0();break}catch(i){cp(e,i)}while(!0);ql(),bo.current=a,te=o,ke!==null?n=0:(Le=null,Te=0,n=Se)}if(n!==0){if(n===2&&(o=Wa(e),o!==0&&(r=o,n=bl(e,o))),n===1)throw t=cs,wt(e,0),Yn(e,r),Je(e,be()),t;if(n===6)Yn(e,r);else{if(o=e.current.alternate,!(r&30)&&!v0(o)&&(n=Co(e,r),n===2&&(a=Wa(e),a!==0&&(r=a,n=bl(e,a))),n===1))throw t=cs,wt(e,0),Yn(e,r),Je(e,be()),t;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(F(345));case 2:xt(e,He,Fn);break;case 3:if(Yn(e,r),(r&130023424)===r&&(n=mi+500-be(),10<n)){if(so(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){De(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=el(xt.bind(null,e,He,Fn),n);break}xt(e,He,Fn);break;case 4:if(Yn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var l=31-vn(r);a=1<<l,l=n[l],l>o&&(o=l),r&=~a}if(r=o,r=be()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*y0(r/1960))-r,10<r){e.timeoutHandle=el(xt.bind(null,e,He,Fn),r);break}xt(e,He,Fn);break;case 5:xt(e,He,Fn);break;default:throw Error(F(329))}}}return Je(e,be()),e.callbackNode===t?up.bind(null,e):null}function bl(e,n){var t=Wr;return e.current.memoizedState.isDehydrated&&(wt(e,n).flags|=256),e=Co(e,n),e!==2&&(n=He,He=t,n!==null&&kl(n)),e}function kl(e){He===null?He=e:He.push.apply(He,e)}function v0(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var o=t[r],a=o.getSnapshot;o=o.value;try{if(!kn(a(),o))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Yn(e,n){for(n&=~fi,n&=~Ro,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-vn(n),r=1<<t;e[t]=-1,n&=~r}}function Vu(e){if(te&6)throw Error(F(327));rr();var n=so(e,0);if(!(n&1))return Je(e,be()),null;var t=Co(e,n);if(e.tag!==0&&t===2){var r=Wa(e);r!==0&&(n=r,t=bl(e,r))}if(t===1)throw t=cs,wt(e,0),Yn(e,n),Je(e,be()),t;if(t===6)throw Error(F(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,xt(e,He,Fn),Je(e,be()),null}function hi(e,n){var t=te;te|=1;try{return e(n)}finally{te=t,te===0&&(dr=be()+500,_o&&dt())}}function At(e){Xn!==null&&Xn.tag===0&&!(te&6)&&rr();var n=te;te|=1;var t=un.transition,r=oe;try{if(un.transition=null,oe=1,e)return e()}finally{oe=r,un.transition=t,te=n,!(te&6)&&dt()}}function gi(){Xe=Xt.current,ce(Xt)}function wt(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Ym(t)),ke!==null)for(t=ke.return;t!==null;){var r=t;switch(Kl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&uo();break;case 3:ur(),ce(Ge),ce(Me),oi();break;case 5:si(r);break;case 4:ur();break;case 13:ce(me);break;case 19:ce(me);break;case 10:ei(r.type._context);break;case 22:case 23:gi()}t=t.return}if(Le=e,ke=e=ot(e.current,null),Te=Xe=n,Se=0,cs=null,fi=Ro=Et=0,He=Wr=null,bt!==null){for(n=0;n<bt.length;n++)if(t=bt[n],r=t.interleaved,r!==null){t.interleaved=null;var o=r.next,a=t.pending;if(a!==null){var l=a.next;a.next=o,r.next=l}t.pending=r}bt=null}return e}function cp(e,n){do{var t=ke;try{if(ql(),Js.current=vo,yo){for(var r=he.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}yo=!1}if(Lt=0,Ne=je=he=null,$r=!1,ls=0,pi.current=null,t===null||t.return===null){Se=1,cs=n,ke=null;break}e:{var a=e,l=t.return,i=t,u=n;if(n=Te,i.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,h=i,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var y=Au(l);if(y!==null){y.flags&=-257,Tu(y,l,i,a,n),y.mode&1&&Eu(a,d,n),n=y,u=d;var k=n.updateQueue;if(k===null){var C=new Set;C.add(u),n.updateQueue=C}else k.add(u);break e}else{if(!(n&1)){Eu(a,d,n),xi();break e}u=Error(F(426))}}else if(fe&&i.mode&1){var P=Au(l);if(P!==null){!(P.flags&65536)&&(P.flags|=256),Tu(P,l,i,a,n),Xl(cr(u,i));break e}}a=u=cr(u,i),Se!==4&&(Se=2),Wr===null?Wr=[a]:Wr.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,n&=-n,a.lanes|=n;var p=Jd(a,u,n);wu(a,p);break e;case 1:i=u;var c=a.type,m=a.stateNode;if(!(a.flags&128)&&(typeof c.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(rt===null||!rt.has(m)))){a.flags|=65536,n&=-n,a.lanes|=n;var v=Qd(a,i,n);wu(a,v);break e}}a=a.return}while(a!==null)}fp(t)}catch(E){n=E,ke===t&&t!==null&&(ke=t=t.return);continue}break}while(!0)}function dp(){var e=bo.current;return bo.current=vo,e===null?vo:e}function xi(){(Se===0||Se===3||Se===2)&&(Se=4),Le===null||!(Et&268435455)&&!(Ro&268435455)||Yn(Le,Te)}function Co(e,n){var t=te;te|=2;var r=dp();(Le!==e||Te!==n)&&(Fn=null,wt(e,n));do try{b0();break}catch(o){cp(e,o)}while(!0);if(ql(),te=t,bo.current=r,ke!==null)throw Error(F(261));return Le=null,Te=0,Se}function b0(){for(;ke!==null;)pp(ke)}function k0(){for(;ke!==null&&!Wf();)pp(ke)}function pp(e){var n=hp(e.alternate,e,Xe);e.memoizedProps=e.pendingProps,n===null?fp(e):ke=n,pi.current=null}function fp(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=m0(t,n),t!==null){t.flags&=32767,ke=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Se=6,ke=null;return}}else if(t=f0(t,n,Xe),t!==null){ke=t;return}if(n=n.sibling,n!==null){ke=n;return}ke=n=e}while(n!==null);Se===0&&(Se=5)}function xt(e,n,t){var r=oe,o=un.transition;try{un.transition=null,oe=1,w0(e,n,t,r)}finally{un.transition=o,oe=r}return null}function w0(e,n,t,r){do rr();while(Xn!==null);if(te&6)throw Error(F(327));t=e.finishedWork;var o=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(F(177));e.callbackNode=null,e.callbackPriority=0;var a=t.lanes|t.childLanes;if(tm(e,a),e===Le&&(ke=Le=null,Te=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Ms||(Ms=!0,gp(ro,function(){return rr(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=un.transition,un.transition=null;var l=oe;oe=1;var i=te;te|=4,pi.current=null,g0(e,t),lp(t,e),Vm(Za),oo=!!Xa,Za=Xa=null,e.current=t,x0(t),Jf(),te=i,oe=l,un.transition=a}else e.current=t;if(Ms&&(Ms=!1,Xn=e,wo=o),a=e.pendingLanes,a===0&&(rt=null),Kf(t.stateNode),Je(e,be()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)o=n[t],r(o.value,{componentStack:o.stack,digest:o.digest});if(ko)throw ko=!1,e=yl,yl=null,e;return wo&1&&e.tag!==0&&rr(),a=e.pendingLanes,a&1?e===vl?Jr++:(Jr=0,vl=e):Jr=0,dt(),null}function rr(){if(Xn!==null){var e=Jc(wo),n=un.transition,t=oe;try{if(un.transition=null,oe=16>e?16:e,Xn===null)var r=!1;else{if(e=Xn,Xn=null,wo=0,te&6)throw Error(F(331));var o=te;for(te|=4,U=e.current;U!==null;){var a=U,l=a.child;if(U.flags&16){var i=a.deletions;if(i!==null){for(var u=0;u<i.length;u++){var d=i[u];for(U=d;U!==null;){var h=U;switch(h.tag){case 0:case 11:case 15:Gr(8,h,a)}var g=h.child;if(g!==null)g.return=h,U=g;else for(;U!==null;){h=U;var f=h.sibling,y=h.return;if(sp(h),h===d){U=null;break}if(f!==null){f.return=y,U=f;break}U=y}}}var k=a.alternate;if(k!==null){var C=k.child;if(C!==null){k.child=null;do{var P=C.sibling;C.sibling=null,C=P}while(C!==null)}}U=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,U=l;else e:for(;U!==null;){if(a=U,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Gr(9,a,a.return)}var p=a.sibling;if(p!==null){p.return=a.return,U=p;break e}U=a.return}}var c=e.current;for(U=c;U!==null;){l=U;var m=l.child;if(l.subtreeFlags&2064&&m!==null)m.return=l,U=m;else e:for(l=c;U!==null;){if(i=U,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:zo(9,i)}}catch(E){xe(i,i.return,E)}if(i===l){U=null;break e}var v=i.sibling;if(v!==null){v.return=i.return,U=v;break e}U=i.return}}if(te=o,dt(),Ln&&typeof Ln.onPostCommitFiberRoot=="function")try{Ln.onPostCommitFiberRoot(Oo,e)}catch{}r=!0}return r}finally{oe=t,un.transition=n}}return!1}function Hu(e,n,t){n=cr(t,n),n=Jd(e,n,1),e=tt(e,n,1),n=De(),e!==null&&(ps(e,1,n),Je(e,n))}function xe(e,n,t){if(e.tag===3)Hu(e,e,t);else for(;n!==null;){if(n.tag===3){Hu(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(rt===null||!rt.has(r))){e=cr(t,e),e=Qd(n,e,1),n=tt(n,e,1),e=De(),n!==null&&(ps(n,1,e),Je(n,e));break}}n=n.return}}function C0(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=De(),e.pingedLanes|=e.suspendedLanes&t,Le===e&&(Te&t)===t&&(Se===4||Se===3&&(Te&130023424)===Te&&500>be()-mi?wt(e,0):fi|=t),Je(e,n)}function mp(e,n){n===0&&(e.mode&1?(n=Ss,Ss<<=1,!(Ss&130023424)&&(Ss=4194304)):n=1);var t=De();e=zn(e,n),e!==null&&(ps(e,n,t),Je(e,t))}function j0(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),mp(e,t)}function S0(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(n),mp(e,t)}var hp;hp=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||Ge.current)$e=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return $e=!1,p0(e,n,t);$e=!!(e.flags&131072)}else $e=!1,fe&&n.flags&1048576&&vd(n,fo,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Ys(e,n),e=n.pendingProps;var o=ar(n,Me.current);tr(n,t),o=li(null,n,r,e,o,t);var a=ii();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,We(r)?(a=!0,co(n)):a=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,ti(n),o.updater=Do,n.stateNode=o,o._reactInternals=n,ll(n,r,e,t),n=cl(null,n,r,!0,a,t)):(n.tag=0,fe&&a&&Yl(n),Be(null,n,o,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Ys(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=L0(r),e=gn(r,e),o){case 0:n=ul(null,n,r,e,t);break e;case 1:n=Pu(null,n,r,e,t);break e;case 11:n=Ou(null,n,r,e,t);break e;case 14:n=Fu(null,n,r,gn(r.type,e),t);break e}throw Error(F(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:gn(r,o),ul(e,n,r,o,t);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:gn(r,o),Pu(e,n,r,o,t);case 3:e:{if(Zd(n),e===null)throw Error(F(387));r=n.pendingProps,a=n.memoizedState,o=a.element,Sd(e,n),go(n,r,null,t);var l=n.memoizedState;if(r=l.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},n.updateQueue.baseState=a,n.memoizedState=a,n.flags&256){o=cr(Error(F(423)),n),n=Iu(e,n,r,t,o);break e}else if(r!==o){o=cr(Error(F(424)),n),n=Iu(e,n,r,t,o);break e}else for(Ze=nt(n.stateNode.containerInfo.firstChild),qe=n,fe=!0,yn=null,t=Cd(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(lr(),r===o){n=Rn(e,n,t);break e}Be(e,n,r,t)}n=n.child}return n;case 5:return Nd(n),e===null&&sl(n),r=n.type,o=n.pendingProps,a=e!==null?e.memoizedProps:null,l=o.children,qa(r,o)?l=null:a!==null&&qa(r,a)&&(n.flags|=32),Xd(e,n),Be(e,n,l,t),n.child;case 6:return e===null&&sl(n),null;case 13:return qd(e,n,t);case 4:return ri(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=ir(n,null,r,t):Be(e,n,r,t),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:gn(r,o),Ou(e,n,r,o,t);case 7:return Be(e,n,n.pendingProps,t),n.child;case 8:return Be(e,n,n.pendingProps.children,t),n.child;case 12:return Be(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,a=n.memoizedProps,l=o.value,ie(mo,r._currentValue),r._currentValue=l,a!==null)if(kn(a.value,l)){if(a.children===o.children&&!Ge.current){n=Rn(e,n,t);break e}}else for(a=n.child,a!==null&&(a.return=n);a!==null;){var i=a.dependencies;if(i!==null){l=a.child;for(var u=i.firstContext;u!==null;){if(u.context===r){if(a.tag===1){u=_n(-1,t&-t),u.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?u.next=u:(u.next=h.next,h.next=u),d.pending=u}}a.lanes|=t,u=a.alternate,u!==null&&(u.lanes|=t),ol(a.return,t,n),i.lanes|=t;break}u=u.next}}else if(a.tag===10)l=a.type===n.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(F(341));l.lanes|=t,i=l.alternate,i!==null&&(i.lanes|=t),ol(l,t,n),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===n){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}Be(e,n,o.children,t),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,tr(n,t),o=cn(o),r=r(o),n.flags|=1,Be(e,n,r,t),n.child;case 14:return r=n.type,o=gn(r,n.pendingProps),o=gn(r.type,o),Fu(e,n,r,o,t);case 15:return Yd(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:gn(r,o),Ys(e,n),n.tag=1,We(r)?(e=!0,co(n)):e=!1,tr(n,t),Wd(n,r,o),ll(n,r,o,t),cl(null,n,r,!0,e,t);case 19:return ep(e,n,t);case 22:return Kd(e,n,t)}throw Error(F(156,n.tag))};function gp(e,n){return Hc(e,n)}function N0(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ln(e,n,t,r){return new N0(e,n,t,r)}function yi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function L0(e){if(typeof e=="function")return yi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Bl)return 11;if(e===Dl)return 14}return 2}function ot(e,n){var t=e.alternate;return t===null?(t=ln(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Zs(e,n,t,r,o,a){var l=2;if(r=e,typeof e=="function")yi(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Ut:return Ct(t.children,o,a,n);case _l:l=8,o|=8;break;case Oa:return e=ln(12,t,n,o|2),e.elementType=Oa,e.lanes=a,e;case Fa:return e=ln(13,t,n,o),e.elementType=Fa,e.lanes=a,e;case Pa:return e=ln(19,t,n,o),e.elementType=Pa,e.lanes=a,e;case Nc:return Uo(t,o,a,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case jc:l=10;break e;case Sc:l=9;break e;case Bl:l=11;break e;case Dl:l=14;break e;case Wn:l=16,r=null;break e}throw Error(F(130,e==null?e:typeof e,""))}return n=ln(l,t,n,o),n.elementType=e,n.type=r,n.lanes=a,n}function Ct(e,n,t,r){return e=ln(7,e,r,n),e.lanes=t,e}function Uo(e,n,t,r){return e=ln(22,e,r,n),e.elementType=Nc,e.lanes=t,e.stateNode={isHidden:!1},e}function ka(e,n,t){return e=ln(6,e,null,n),e.lanes=t,e}function wa(e,n,t){return n=ln(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function E0(e,n,t,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ta(0),this.expirationTimes=ta(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ta(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function vi(e,n,t,r,o,a,l,i,u){return e=new E0(e,n,t,i,u),n===1?(n=1,a===!0&&(n|=8)):n=0,a=ln(3,null,null,n),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},ti(a),e}function A0(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rt,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function xp(e){if(!e)return lt;e=e._reactInternals;e:{if(Ot(e)!==e||e.tag!==1)throw Error(F(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(We(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(F(171))}if(e.tag===1){var t=e.type;if(We(t))return xd(e,t,n)}return n}function yp(e,n,t,r,o,a,l,i,u){return e=vi(t,r,!0,e,o,a,l,i,u),e.context=xp(null),t=e.current,r=De(),o=st(t),a=_n(r,o),a.callback=n??null,tt(t,a,o),e.current.lanes=o,ps(e,o,r),Je(e,r),e}function Vo(e,n,t,r){var o=n.current,a=De(),l=st(o);return t=xp(t),n.context===null?n.context=t:n.pendingContext=t,n=_n(a,l),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=tt(o,n,l),e!==null&&(bn(e,o,l,a),Ws(e,o,l)),l}function jo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function $u(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function bi(e,n){$u(e,n),(e=e.alternate)&&$u(e,n)}function T0(){return null}var vp=typeof reportError=="function"?reportError:function(e){console.error(e)};function ki(e){this._internalRoot=e}Ho.prototype.render=ki.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(F(409));Vo(e,n,null,null)};Ho.prototype.unmount=ki.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;At(function(){Vo(null,e,null,null)}),n[Dn]=null}};function Ho(e){this._internalRoot=e}Ho.prototype.unstable_scheduleHydration=function(e){if(e){var n=Kc();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Qn.length&&n!==0&&n<Qn[t].priority;t++);Qn.splice(t,0,e),t===0&&Zc(e)}};function wi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function $o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Gu(){}function O0(e,n,t,r,o){if(o){if(typeof r=="function"){var a=r;r=function(){var d=jo(l);a.call(d)}}var l=yp(n,r,e,0,null,!1,!1,"",Gu);return e._reactRootContainer=l,e[Dn]=l.current,ts(e.nodeType===8?e.parentNode:e),At(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var i=r;r=function(){var d=jo(u);i.call(d)}}var u=vi(e,0,!1,null,null,!1,!1,"",Gu);return e._reactRootContainer=u,e[Dn]=u.current,ts(e.nodeType===8?e.parentNode:e),At(function(){Vo(n,u,t,r)}),u}function Go(e,n,t,r,o){var a=t._reactRootContainer;if(a){var l=a;if(typeof o=="function"){var i=o;o=function(){var u=jo(l);i.call(u)}}Vo(n,l,e,o)}else l=O0(t,n,e,o,r);return jo(l)}Qc=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=_r(n.pendingLanes);t!==0&&(Ul(n,t|1),Je(n,be()),!(te&6)&&(dr=be()+500,dt()))}break;case 13:At(function(){var r=zn(e,1);if(r!==null){var o=De();bn(r,e,1,o)}}),bi(e,1)}};Vl=function(e){if(e.tag===13){var n=zn(e,134217728);if(n!==null){var t=De();bn(n,e,134217728,t)}bi(e,134217728)}};Yc=function(e){if(e.tag===13){var n=st(e),t=zn(e,n);if(t!==null){var r=De();bn(t,e,n,r)}bi(e,n)}};Kc=function(){return oe};Xc=function(e,n){var t=oe;try{return oe=e,n()}finally{oe=t}};Ha=function(e,n,t){switch(n){case"input":if(_a(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var o=Mo(r);if(!o)throw Error(F(90));Ec(r),_a(r,o)}}}break;case"textarea":Tc(e,t);break;case"select":n=t.value,n!=null&&Zt(e,!!t.multiple,n,!1)}};Bc=hi;Dc=At;var F0={usingClientEntryPoint:!1,Events:[ms,Gt,Mo,Mc,_c,hi]},Tr={findFiberByHostInstance:vt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},P0={bundleType:Tr.bundleType,version:Tr.version,rendererPackageName:Tr.rendererPackageName,rendererConfig:Tr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Un.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Uc(e),e===null?null:e.stateNode},findFiberByHostInstance:Tr.findFiberByHostInstance||T0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _s=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_s.isDisabled&&_s.supportsFiber)try{Oo=_s.inject(P0),Ln=_s}catch{}}nn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F0;nn.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!wi(n))throw Error(F(200));return A0(e,n,null,t)};nn.createRoot=function(e,n){if(!wi(e))throw Error(F(299));var t=!1,r="",o=vp;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=vi(e,1,!1,null,null,t,!1,r,o),e[Dn]=n.current,ts(e.nodeType===8?e.parentNode:e),new ki(n)};nn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(F(188)):(e=Object.keys(e).join(","),Error(F(268,e)));return e=Uc(n),e=e===null?null:e.stateNode,e};nn.flushSync=function(e){return At(e)};nn.hydrate=function(e,n,t){if(!$o(n))throw Error(F(200));return Go(null,e,n,!0,t)};nn.hydrateRoot=function(e,n,t){if(!wi(e))throw Error(F(405));var r=t!=null&&t.hydratedSources||null,o=!1,a="",l=vp;if(t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),n=yp(n,null,e,1,t??null,o,!1,a,l),e[Dn]=n.current,ts(e),r)for(e=0;e<r.length;e++)t=r[e],o=t._getVersion,o=o(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o);return new Ho(n)};nn.render=function(e,n,t){if(!$o(n))throw Error(F(200));return Go(null,e,n,!1,t)};nn.unmountComponentAtNode=function(e){if(!$o(e))throw Error(F(40));return e._reactRootContainer?(At(function(){Go(null,null,e,!1,function(){e._reactRootContainer=null,e[Dn]=null})}),!0):!1};nn.unstable_batchedUpdates=hi;nn.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!$o(t))throw Error(F(200));if(e==null||e._reactInternals===void 0)throw Error(F(38));return Go(e,n,t,!1,r)};nn.version="18.3.1-next-f1338f8080-20240426";function bp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bp)}catch(e){console.error(e)}}bp(),bc.exports=nn;var kp=bc.exports,wp,Wu=kp;wp=Wu.createRoot,Wu.hydrateRoot;const Ci="authToken",Cp="authUser",I0="qwertyuiopasdfghjklzxcvbnm123456",jp="1234567890123456";function Sp(){return sessionStorage.getItem(Ci)}function M0(e,n){sessionStorage.setItem(Ci,e),n&&sessionStorage.setItem(Cp,JSON.stringify(n)),sessionStorage.setItem("loggedIn","true")}function Np(){sessionStorage.removeItem(Ci),sessionStorage.removeItem(Cp),sessionStorage.removeItem("loggedIn")}function _0(){return!!Sp()}const So=new TextEncoder,B0=new TextDecoder;let Ca=null;function Lp(){return Ca||(Ca=crypto.subtle.importKey("raw",So.encode(I0),{name:"AES-CBC"},!1,["encrypt","decrypt"])),Ca}function D0(e){return Array.from(new Uint8Array(e),n=>n.toString(16).padStart(2,"0")).join("")}function z0(e){if(e.length%2)throw new Error("Invalid encrypted payload.");const n=new Uint8Array(e.length/2);for(let t=0;t<n.length;t++)n[t]=parseInt(e.substr(t*2,2),16);return n}async function R0(e){const n=await Lp(),t=await crypto.subtle.encrypt({name:"AES-CBC",iv:So.encode(jp)},n,So.encode(JSON.stringify(e)));return D0(t)}async function U0(e){const n=await Lp(),t=await crypto.subtle.decrypt({name:"AES-CBC",iv:So.encode(jp)},n,z0(e));return JSON.parse(B0.decode(t))}function Ep(){window.location.hash="#/"}function V0(){Np(),sessionStorage.removeItem("boilerType"),Ep()}async function Ap(e,n,t){const r=new Headers(n.headers||{});let o=n.body;if(typeof o=="string"&&(r.get("Content-Type")||"").includes("application/json")&&(o=JSON.stringify({encryptedData:await R0(JSON.parse(o))})),t){const i=Sp();i&&r.set("Authorization",`Bearer ${i}`)}const a=await fetch(e,{...n,headers:r,body:o});if(t&&a.status===401)throw Np(),Ep(),new Error("Session expired — redirecting to login.");const l=a.json.bind(a);return a.json=async function(){const i=await l();return i&&typeof i.encryptedData=="string"?U0(i.encryptedData):i},a}function Qe(e,n={}){return Ap(e,n,!0)}function H0(e,n={}){return Ap(e,n,!1)}function Ju(){const n=(window.location.hash||"#/").replace(/^#/,"")||"/";return n.startsWith("/")?n:"/"+n}function Tp(e){window.location.hash="#"+e}function $0(){const[e,n]=S.useState(Ju());return S.useEffect(()=>{const t=()=>n(Ju());return window.addEventListener("hashchange",t),()=>window.removeEventListener("hashchange",t)},[]),e}function G0({to:e,className:n,children:t,...r}){return s.jsx("a",{href:"#"+e,className:n,...r,children:t})}const W0=`/* Copied verbatim from the <style> block of public/index.html (login page). */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --accent: #3b82f6;
  --accent2: #60a5fa;
  --text: #f1f5f9;
  --muted: #94a3b8;
  --muted2: #64748b;
  --border: rgba(148,163,184,0.16);
}

body {
  font-family: 'Outfit', sans-serif;
  background: #0A132B;
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 45% at 12% -8%, rgba(255,255,255,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 55% 40% at 92% 15%, rgba(96,165,250,0.14) 0%, transparent 60%),
    radial-gradient(ellipse 60% 45% at 75% 105%, rgba(37,99,235,0.16) 0%, transparent 60%),
    linear-gradient(180deg, #0A132B 0%, #101d42 55%, #0A132B 100%);
  pointer-events: none;
  z-index: 0;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 48%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.05) 52%, transparent 70%);
  background-size: 220% 220%;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: screen;
}

#bg-particles { opacity: 0.85; }

.screen {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
}

/* ── Left brand panel ─────────────────────────────────────────── */
.brand-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  position: relative;
}

.brand-logo-ring {
  width: 108px;
  height: 108px;
  margin-bottom: 28px;
  animation: logoFloat 3.8s ease-in-out infinite;
  filter: drop-shadow(0 8px 24px rgba(37,99,235,0.35));
}
.brand-logo-ring .inner {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.brand-logo-ring img { width: 100%; height: 100%; object-fit: contain; }

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

.brand-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -1px;
  line-height: 1.15;
  margin-bottom: 6px;
  opacity: 0;
  animation: fadeUp 0.7s 0.1s ease forwards;
}
.brand-title .accent {
  background: linear-gradient(135deg, #60a5fa, #93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand-rule {
  width: 56px; height: 3px; border-radius: 2px; margin: 16px 0 20px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  opacity: 0;
  animation: fadeUp 0.7s 0.2s ease forwards;
}

.brand-sub {
  max-width: 380px;
  text-align: center;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 44px;
  opacity: 0;
  animation: fadeUp 0.7s 0.3s ease forwards;
}

.stat-row { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; opacity: 0; animation: fadeUp 0.7s 0.4s ease forwards; }
.stat-chip {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  backdrop-filter: blur(14px);
  border-radius: 14px;
  padding: 14px 20px;
  min-width: 130px;
  animation: floatChip 4.5s ease-in-out infinite;
}
.stat-chip:nth-child(2) { animation-delay: 0.6s; }
.stat-chip:nth-child(3) { animation-delay: 1.2s; }
.stat-chip .n { font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 700; color: #93c5fd; }
.stat-chip .l { font-size: 11px; color: var(--muted2); text-transform: uppercase; letter-spacing: 0.6px; margin-top: 4px; }

@keyframes floatChip { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

/* ── Right login panel ────────────────────────────────────────── */
.form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-box {
  background: rgba(15,22,45,0.55);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 44px 40px 34px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 24px 60px -12px rgba(0,0,0,0.55);
  opacity: 0;
  animation: fadeUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) forwards;
}

.login-logo-icon {
  width: 80px; height: 80px;
  margin: 0 auto 20px;
  display: flex; align-items: center; justify-content: center;
  animation: logoFloat 3.8s ease-in-out infinite;
  filter: drop-shadow(0 6px 18px rgba(37,99,235,0.4));
}
.login-logo-icon img { width: 100%; height: 100%; object-fit: contain; }

.login-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 25px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 6px;
}
.login-sub {
  font-size: 13.5px;
  color: var(--muted);
  text-align: center;
  margin-bottom: 16px;
}
.login-divider {
  width: 44px; height: 2px; margin: 0 auto 26px; border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
}

.error-msg {
  display: none;
  background: rgba(239,68,68,0.12);
  border: 1px solid rgba(248,113,113,0.35);
  color: #fca5a5;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 10px;
  margin-bottom: 16px;
  font-weight: 500;
  text-align: center;
}
.error-msg.show { display: block; animation: shake 0.35s ease; }
@keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }

.form-group { margin-bottom: 16px; position: relative; }
.form-group .icon {
  position: absolute; left: 15px; top: 50%; transform: translateY(-50%);
  color: var(--muted); pointer-events: none; display: flex;
}
.form-group input {
  width: 100%;
  padding: 13px 14px 13px 44px;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  font-family: 'Outfit', sans-serif;
  font-size: 14.5px;
  color: var(--text);
  background: rgba(255,255,255,0.03);
  outline: none;
  transition: all 0.2s;
}
.form-group input::placeholder { color: var(--muted2); }
.form-group input:focus {
  border-color: var(--accent);
  background: rgba(59,130,246,0.06);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.14);
}
.toggle-eye {
  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer; color: var(--muted);
  padding: 4px; display: flex; transition: color 0.2s;
}
.toggle-eye:hover { color: var(--text); }

.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 24px rgba(59,130,246,0.35);
  margin-top: 8px;
}
.btn-login:hover { transform: translateY(-1px); box-shadow: 0 10px 32px rgba(59,130,246,0.45); }
.btn-login:active { transform: scale(0.98); }

.login-footer {
  text-align: center;
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  font-size: 12.5px;
  color: var(--muted2);
}
.login-footer b { color: #93c5fd; font-weight: 700; }

/* ── Boiler-type selection (shown right after login) ─────────────── */
.boiler-box { display: none; }
.boiler-box.show { display: block; }
.boiler-icon {
  width: 64px; height: 64px;
  margin: 0 auto 18px;
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.18), rgba(96,165,250,0.10));
  border: 1px solid rgba(96,165,250,0.3);
  color: #93c5fd;
}
.form-group label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: 8px;
  letter-spacing: 0.2px;
}
.select-wrap { position: relative; }
.select-wrap select {
  width: 100%;
  padding: 13px 40px 13px 14px;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  font-family: 'Outfit', sans-serif;
  font-size: 14.5px;
  color: var(--text);
  background: rgba(255,255,255,0.03);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: all 0.2s;
}
.select-wrap select:focus {
  border-color: var(--accent);
  background: rgba(59,130,246,0.06);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.14);
}
.select-wrap select option { background: #101d42; color: var(--text); }
.select-wrap::after {
  content: '';
  position: absolute; right: 16px; top: 50%;
  width: 9px; height: 9px;
  border-right: 2px solid var(--muted);
  border-bottom: 2px solid var(--muted);
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}

@media (max-width: 880px) {
  .screen { grid-template-columns: 1fr; }
  .brand-panel { display: none; }
  .form-panel { padding: 24px; }
}
`;function Op(e,n){S.useLayoutEffect(()=>{const t=e.map((r,o)=>{const a=document.createElement("style");return a.setAttribute("data-app-style",n+"-"+o),a.textContent=r,document.head.appendChild(a),a});return()=>t.forEach(r=>r.remove())},[n])}function Fp(){const e=S.useRef(null);return S.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,t=e.current,r=t.getContext("2d");let o,a,l,i,u;function d(){i=Math.min(window.devicePixelRatio||1,2),o=window.innerWidth,a=window.innerHeight,t.width=o*i,t.height=a*i,t.style.width=o+"px",t.style.height=a+"px",r.setTransform(i,0,0,i,0,0);const g=Math.max(28,Math.min(70,Math.round(o*a/26e3)));l=Array.from({length:g},()=>({x:Math.random()*o,y:Math.random()*a,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.4+.6}))}function h(){r.clearRect(0,0,o,a);const g=Math.min(150,o/6);for(const f of l)f.x+=f.vx,f.y+=f.vy,(f.x<0||f.x>o)&&(f.vx*=-1),(f.y<0||f.y>a)&&(f.vy*=-1);for(let f=0;f<l.length;f++)for(let y=f+1;y<l.length;y++){const k=l[f],C=l[y],P=k.x-C.x,p=k.y-C.y,c=Math.sqrt(P*P+p*p);c<g&&(r.strokeStyle=`rgba(96,165,250,${.16*(1-c/g)})`,r.lineWidth=1,r.beginPath(),r.moveTo(k.x,k.y),r.lineTo(C.x,C.y),r.stroke())}for(const f of l)r.beginPath(),r.arc(f.x,f.y,f.r,0,Math.PI*2),r.fillStyle="rgba(147,197,253,0.55)",r.fill();n||(u=requestAnimationFrame(h))}return window.addEventListener("resize",d),d(),h(),()=>{window.removeEventListener("resize",d),cancelAnimationFrame(u)}},[]),s.jsx("canvas",{id:"bg-particles",ref:e,style:{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}})}const J0=e=>s.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M3 3v18h18"}),s.jsx("path",{d:"M18 17V9"}),s.jsx("path",{d:"M13 17V5"}),s.jsx("path",{d:"M8 17v-3"})]}),Q0=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),s.jsx("polyline",{points:"17 8 12 3 7 8"}),s.jsx("line",{x1:"12",x2:"12",y1:"3",y2:"15"})]}),Y0=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),s.jsx("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),s.jsx("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),s.jsx("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]}),gs=e=>s.jsx("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",...e,children:s.jsx("polygon",{points:"5 3 19 12 5 21 5 3"})}),xs=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M3 12a9 9 0 1 0 2.64-6.36"}),s.jsx("path",{d:"M3 4v5h5"})]}),Pp=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"}),s.jsx("path",{d:"M17 21v-8H7v8"}),s.jsx("path",{d:"M7 3v5h8"})]}),No=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),s.jsx("polyline",{points:"7 10 12 15 17 10"}),s.jsx("line",{x1:"12",x2:"12",y1:"15",y2:"3"})]}),Wo=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}),s.jsx("path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}),s.jsx("line",{x1:"16",x2:"8",y1:"13",y2:"13"}),s.jsx("line",{x1:"16",x2:"8",y1:"17",y2:"17"}),s.jsx("line",{x1:"10",x2:"8",y1:"9",y2:"9"})]}),K0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),s.jsx("path",{d:"m2 7 10 6 10-6"})]}),X0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),s.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),Ip=e=>s.jsxs("svg",{width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M3 15h18"}),s.jsx("path",{d:"M5 15V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9"}),s.jsx("path",{d:"M8 15v4"}),s.jsx("path",{d:"M16 15v4"}),s.jsx("path",{d:"M9 8h.01"}),s.jsx("path",{d:"M13 8h.01"})]}),Z0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.6 20.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a20.6 20.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),s.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}),q0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"}),s.jsx("circle",{cx:"12",cy:"12",r:"3"})]});function eh(){S.useEffect(()=>{document.title="Boiler Efficiency Calculator"},[]),Op([W0],"login");const[e,n]=S.useState(""),[t,r]=S.useState(""),[o,a]=S.useState(!1),[l,i]=S.useState(!1),[u,d]=S.useState({text:"Incorrect username or password!",show:!1,n:0}),h=f=>d(y=>({text:f||y.text,show:!0,n:y.n+1})),g=async()=>{if(!e||!t){h("Enter your username and password.");return}i(!0);try{const f=await H0("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})}),y=await f.json();if(!f.ok||!y.ok){h(y.error||"Incorrect username or password!");return}M0(y.token,y.user),Tp("/calculator")}catch{h("Could not reach the server. Please try again.")}finally{i(!1)}};return s.jsxs(s.Fragment,{children:[s.jsx(Fp,{}),s.jsxs("div",{className:"screen",onKeyDown:f=>{f.key==="Enter"&&g()},children:[s.jsxs("div",{className:"brand-panel",children:[s.jsx("div",{className:"brand-logo-ring",children:s.jsx("div",{className:"inner",children:s.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})})}),s.jsxs("div",{className:"brand-title",children:["Boiler ",s.jsx("span",{className:"accent",children:"Efficiency"})," Calculator"]}),s.jsx("div",{className:"brand-rule"}),s.jsxs("div",{className:"stat-row",children:[s.jsxs("div",{className:"stat-chip",children:[s.jsx("div",{className:"n",children:"87%"}),s.jsx("div",{className:"l",children:"Boiler Eff."})]}),s.jsxs("div",{className:"stat-chip",children:[s.jsx("div",{className:"n",children:"5.8%"}),s.jsx("div",{className:"l",children:"Dry Gas Loss"})]}),s.jsxs("div",{className:"stat-chip",children:[s.jsx("div",{className:"n",children:"1.2%"}),s.jsx("div",{className:"l",children:"Unburnt C"})]})]})]}),s.jsx("div",{className:"form-panel",children:s.jsxs("div",{className:"login-box",id:"loginBox",children:[s.jsx("div",{className:"login-logo-icon",children:s.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),s.jsx("div",{className:"login-title",children:"Welcome"}),s.jsx("div",{className:"login-sub",children:"Sign in to access the Efficiency Calculator"}),s.jsx("div",{className:"login-divider"}),s.jsx("div",{className:"error-msg"+(u.show?" show":""),id:"errorMsg",children:u.text},u.n),s.jsxs("div",{className:"form-group",children:[s.jsx("span",{className:"icon",children:s.jsx(K0,{})}),s.jsx("input",{type:"text",id:"username",placeholder:"Username",autoComplete:"username",value:e,onChange:f=>n(f.target.value)})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("span",{className:"icon",children:s.jsx(X0,{})}),s.jsx("input",{type:o?"text":"password",id:"password",placeholder:"Password",autoComplete:"current-password",value:t,onChange:f=>r(f.target.value)}),s.jsx("button",{type:"button",className:"toggle-eye",id:"toggleEye","aria-label":"Show password",onClick:()=>a(f=>!f),children:o?s.jsx(Z0,{}):s.jsx(q0,{})})]}),s.jsx("button",{className:"btn-login",disabled:l,onClick:g,children:"Login"}),s.jsxs("div",{className:"login-footer",children:["Powered by ",s.jsx("b",{children:"ABHITECH EnergyCon Ltd."})]})]})})]})]})}const nh=`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

.navbar {
  background: rgba(10,19,43,0.72);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 0 28px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
}
.nav-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav-logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  animation: navLogoFloat 3.5s ease-in-out infinite;
}
.nav-logo-icon img { width: 100%; height: 100%; object-fit: contain; display: block; }
@keyframes navLogoFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}
.nav-logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.2px;
  line-height: 1.15;
}
.nav-logo-text small {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  font-weight: 500;
  color: var(--muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.boiler-type-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #93c5fd;
  background: rgba(59,130,246,0.12);
  border: 1px solid rgba(96,165,250,0.3);
  padding: 4px 10px;
  border-radius: 999px;
  margin-left: 6px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 4px;
  border-radius: 12px;
}
.nav-link {
  padding: 7px 18px;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
  transition: all 0.25s;
  position: relative;
}
.nav-link:hover { background: rgba(148,163,184,0.08); color: var(--text2); }
.nav-link.active {
  background: linear-gradient(135deg, rgba(59,130,246,0.9), rgba(96,165,250,0.85));
  color: #fff;
  box-shadow: 0 2px 12px rgba(59,130,246,0.4);
}
.nav-logout {
  padding: 8px 18px;
  background: transparent;
  border: 1.5px solid rgba(148,163,184,0.18);
  border-radius: 9px;
  font-family: 'Outfit', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
}
.nav-logout:hover {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.35);
  color: var(--red);
}

:root {
  --bg: #0A132B;
  --bg2: #101d42;
  --surface: rgba(255,255,255,0.05);
  --surface2: rgba(255,255,255,0.04);
  --border: rgba(255,255,255,0.12);
  --border2: rgba(255,255,255,0.22);
  --accent: #60a5fa;
  --accent-light: rgba(96,165,250,0.14);
  --accent2: #7dd3fc;
  --green: #4ade80;
  --green-light: rgba(74,222,128,0.12);
  --amber: #fbbf24;
  --amber-light: rgba(251,191,36,0.12);
  --red: #f87171;
  --red-light: rgba(248,113,113,0.12);
  --blue: #60a5fa;
  --blue-light: rgba(96,165,250,0.14);
  --text: #f1f5f9;
  --text-bright: #ffffff;
  --text2: #cbd5e1;
  --muted: #94a3b8;
  --muted2: #64748b;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.18);
  --shadow: 0 8px 20px -4px rgba(0,0,0,0.35), 0 2px 8px -2px rgba(0,0,0,0.22);
  --shadow-lg: 0 20px 40px -8px rgba(0,0,0,0.45), 0 8px 16px -4px rgba(0,0,0,0.28);
  --radius: 16px;
  --radius-sm: 10px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  font-size: 15px;
  line-height: 1.6;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 45% at 15% -8%, rgba(255,255,255,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 55% 40% at 88% 12%, rgba(96,165,250,0.14) 0%, transparent 60%),
    radial-gradient(ellipse 60% 45% at 80% 105%, rgba(37,99,235,0.16) 0%, transparent 60%),
    linear-gradient(180deg, #0A132B 0%, #101d42 55%, #0A132B 100%);
  pointer-events: none;
  z-index: 0;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 48%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 52%, transparent 70%);
  background-size: 220% 220%;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: screen;
}

#bg-particles { opacity: 0.7; }

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;
  position: relative;
  z-index: 1;
}

header {
  background: rgba(10,19,43,0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 18px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo { display: flex; align-items: center; gap: 14px; }

.logo-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(37,99,235,0.3);
}

.logo-text h1 {
  font-size: 19px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.5px;
}

.logo-text p {
  font-size: 11px;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.header-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--accent);
  border: 1.5px solid var(--accent-light);
  background: var(--accent-light);
  padding: 5px 12px;
  border-radius: 20px;
  letter-spacing: 1px;
  font-weight: 600;
}

.tab-nav {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 0 4px;
  border-radius: var(--radius) var(--radius) 0 0;
  margin-top: 28px;
}

.tab-btn {
  padding: 16px 28px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.3px;
  text-transform: uppercase;
  transition: all 0.2s;
  border-bottom: 2.5px solid transparent;
  margin-bottom: -1px;
  border-radius: 8px 8px 0 0;
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  background: var(--accent-light);
}

.tab-btn:hover:not(.active) {
  color: var(--text2);
  background: var(--surface2);
}

.tab-btn .tab-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--muted2);
  margin-right: 8px;
  font-weight: 500;
}

.tab-btn.active .tab-num { color: var(--accent); opacity: 0.7; }

.page { display: none; padding: 24px 0 48px; }
.page.active { display: block; }

.section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  margin-top: 36px;
}

.section-header:first-child { margin-top: 0; }

/* ── Premium collapsible section cards ──────────────────────────────────
   All .section-card tiles sit in a responsive grid (.section-cards-grid)
   so the whole set reads compactly — one or two rows instead of a long
   vertical stack. Each card's onclick uses its data-target to reveal the
   matching .input-grid, which lives below the grid (not inside a single
   card), so opening one section doesn't reflow the others. Everything is
   collapsed on load to keep the page short until the user interacts. */
.section-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 10px;
}

/* ── "Design Conditions — for APH Correction" block on the Results tab —
   its own bordered panel so it reads as a distinct section instead of
   butting straight up against the Process Inputs/Comparison boxes below
   it when its two grids are collapsed (their default state). ──────────── */
.design-conditions-block {
  background: rgba(96,165,250,0.03);
  border: 1.5px dashed rgba(96,165,250,0.25);
  border-radius: var(--radius);
  padding: 20px 20px 22px;
  margin-top: 4px;
  margin-bottom: 28px;
}
.design-conditions-block .section-header { margin-top: 0; margin-bottom: 14px; }
.design-conditions-block .input-grid:last-child { margin-bottom: 0; }

.section-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
}

.section-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  opacity: 0;
  transition: opacity 0.2s;
}

.section-card:hover {
  transform: translateY(-2px);
  border-color: rgba(96,165,250,0.35);
  box-shadow: var(--shadow), 0 0 0 1px rgba(96,165,250,0.12);
}

.section-card:hover::before { opacity: 1; }

.section-card.open {
  border-color: rgba(96,165,250,0.45);
  background: rgba(96,165,250,0.06);
  box-shadow: var(--shadow), 0 0 0 1px rgba(96,165,250,0.18);
}

.section-card.open::before { opacity: 1; }

.section-card-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--accent2);
  border-radius: 9px;
  background: var(--accent-light);
  border: 1.5px solid rgba(96,165,250,0.25);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.section-card.open .section-card-icon,
.section-card:hover .section-card-icon {
  border-color: rgba(96,165,250,0.4);
  transform: scale(1.04);
}

.section-card-body { flex: 1; min-width: 0; }

.section-card-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 2px;
}

.section-card-sub {
  font-size: 10px;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  font-weight: 500;
}

.section-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-left: auto;
  border-radius: 50%;
  border: 1.5px solid var(--border2);
  color: var(--muted);
  font-size: 11px;
  transition: transform 0.25s ease, background 0.2s, color 0.2s, border-color 0.2s;
}

.section-card.open .section-toggle {
  transform: rotate(90deg);
  color: var(--accent2);
  border-color: rgba(96,165,250,0.4);
  background: rgba(96,165,250,0.1);
}

.input-grid.is-collapsed {
  display: none;
}

.input-grid:not(.is-collapsed) {
  margin-top: 14px;
  margin-bottom: 4px;
  animation: fadeUp 0.35s cubic-bezier(0.16,1,0.3,1);
}

@media (max-width: 640px) {
  .section-cards-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 420px) {
  .section-cards-grid { grid-template-columns: 1fr; }
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border2), transparent);
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--accent2);
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 12px;
  border: 1.5px solid rgba(8,145,178,0.2);
  background: rgba(8,145,178,0.06);
  border-radius: 20px;
  font-weight: 600;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  margin-bottom: 8px;
}

.field {
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}

.field:hover { border-color: var(--border2); box-shadow: var(--shadow); transform: translateY(-1px); }
.field:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.14), var(--shadow);
}

.field-formula {
  border-color: rgba(8,145,178,0.35) !important;
  background: rgba(8,145,178,0.03) !important;
}

.field-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.field-name {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
  flex: 1;
  padding-right: 8px;
  font-weight: 500;
}

.field-sym {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--accent);
  background: var(--accent-light);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}

.field-bottom {
  display: flex;
  align-items: center;
  gap: 10px;
}

.field-input {
  flex: 1;
  background: var(--surface2);
  border: 1.5px solid var(--border);
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 500;
  padding: 7px 11px;
  border-radius: var(--radius-sm);
  outline: none;
  transition: all 0.2s;
  width: 100%;
}

.field-input:focus {
  border-color: var(--accent);
  background: rgba(59,130,246,0.06);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
}

.formula-input {
  background: rgba(8,145,178,0.06) !important;
  color: var(--accent2) !important;
  cursor: not-allowed;
  font-weight: 600 !important;
}

/* ── Upload detection state (set by initUpload() in script.js) ─────────────
   .field-detected — value was found on the selected sheet and applied.
   .field-missing  — required field was NOT found anywhere in the workbook,
                      so it still needs to be entered by hand.
   Cleared and re-applied on every new upload; not applied at all until a
   file has been uploaded at least once. */
.field-input.field-detected {
  border-color: #4ade80;
  background: rgba(74,222,128,0.10);
}

.field-input.field-missing {
  border-color: #f87171;
  background: rgba(248,113,113,0.08);
}

.formula-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  background: var(--accent2);
  color: #0A132B;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 5px;
  vertical-align: middle;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* ── Manual-entry fields (Design — Proximate) ───────────────────────────────
   Same card/theme as every other field, but with the amber accent instead
   of the default border, and a dashed border to read as "you type this,
   nothing will ever auto-fill it" — as opposed to the solid cyan
   .field-formula treatment used for AUTO/computed fields. */
.field-manual {
  border-style: dashed !important;
  border-color: rgba(217,119,6,0.4) !important;
  background: rgba(217,119,6,0.04) !important;
}

.manual-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  background: var(--amber);
  color: #1a1300;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 5px;
  vertical-align: middle;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.field-uom {
  font-size: 11px;
  color: var(--muted2);
  white-space: nowrap;
  font-family: 'JetBrains Mono', monospace;
  min-width: 46px;
  text-align: right;
  font-weight: 500;
}

/* ── Enthalpy auto-calc (T & P → enthalpy), BS-2885 only ────────────────────
   Small sub-row under Feedwater/Drum/Steam enthalpy fields. Leave both
   boxes empty to type the enthalpy by hand as before; fill both and the
   enthalpy field above fills itself in (see initEnthalpyAutoCalc() in
   script1.js) and picks up .field-computed until either box is cleared. */
.field-calc {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--border);
}

.field-calc-label {
  font-size: 10px;
  color: var(--muted2);
  white-space: nowrap;
  font-weight: 500;
}

.field-calc-input {
  flex: 1;
  min-width: 0;
  background: var(--surface2);
  border: 1.5px solid var(--border);
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;
}

.field-calc-input::placeholder { color: var(--muted2); opacity: 0.8; }

.field-calc-input:focus {
  border-color: var(--accent2);
  box-shadow: 0 0 0 3px rgba(8,145,178,0.12);
}

/* .field-computed — enthalpy value was filled in from Temperature &
   Pressure rather than typed or detected from an upload. Cleared the
   moment either T or P box is emptied out. */
.field-input.field-computed {
  border-color: var(--accent2);
  background: rgba(8,145,178,0.08);
}

.action-bar {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  margin: 0 0 22px;
  box-shadow: var(--shadow-sm);
}

.action-bar .btn { flex: 0 0 auto; }

.btn {
  padding: 13px 28px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
}

.icon-svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  margin-right: 7px;
  vertical-align: -2px;
}

.btn-upload .icon-svg,
.process-section-title strong .icon-svg {
  color: currentColor;
}

.process-section-title strong {
  display: flex;
  align-items: center;
}

.btn-primary {
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(59,130,246,0.35);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 26px rgba(59,130,246,0.45);
}

.btn-primary:active { transform: scale(0.98); }

.btn-secondary {
  background: transparent;
  color: var(--accent2);
  border: 1.5px solid var(--accent2);
}

.btn-secondary:hover { background: rgba(8,145,178,0.06); }

.btn-ghost {
  background: transparent;
  color: var(--muted);
  border: 1.5px solid var(--border);
  font-size: 13px;
}

.btn-ghost:hover { color: var(--text2); border-color: var(--border2); background: var(--surface2); }

.output-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 28px;
}

@media (max-width: 500px) { .output-summary { grid-template-columns: 1fr; } }

.kpi-card {
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.kpi-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(96,165,250,0.15);
  border-color: rgba(96,165,250,0.3);
}

.kpi-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: var(--radius) var(--radius) 0 0;
}

.kpi-card.kpi-green::before { background: var(--green); }
.kpi-card.kpi-blue::before { background: var(--blue); }
.kpi-card.kpi-amber::before { background: var(--amber); }
.kpi-card.kpi-red::before { background: var(--red); }

.kpi-label {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 10px;
}

.kpi-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 30px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.kpi-card.kpi-green .kpi-value { color: var(--green); }
.kpi-card.kpi-blue .kpi-value { color: var(--blue); }
.kpi-card.kpi-amber .kpi-value { color: var(--amber); }
.kpi-card.kpi-red .kpi-value { color: var(--red); }

.kpi-value .kpi-unit {
  font-size: 14px;
  color: var(--muted2);
  margin-left: 3px;
  font-weight: 400;
}

.kpi-sub {
  font-size: 11px;
  color: var(--muted2);
  margin-top: 8px;
  font-weight: 400;
}

/* ── Reminder note shown at the bottom of the "Boiler Efficiency Corrected"
   card once APH Correction has been applied. ───────────────────────────── */
.kpi-note {
  font-size: 11px;
  line-height: 1.5;
  color: var(--accent2);
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--border);
}

.kpi-card .lrad-input {
  background: var(--surface2);
  border: 1.5px solid var(--border2);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 26px;
  font-weight: 700;
  color: var(--red);
  width: 130px;
  outline: none;
  transition: all 0.2s;
  margin-top: 8px;
}

.kpi-card .lrad-input:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.15);
  background: rgba(220,38,38,0.05);
}

/* ── "Apply GCV/APH Correction" buttons — rendered as kpi-cards so they sit
   in the same row as the Boiler Efficiency / Delta Difference cards. ────── */
button.kpi-card.kpi-action {
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  display: block;
  width: 100%;
}

button.kpi-card.kpi-action .kpi-action-value {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--accent2);
}

button.kpi-card.kpi-action.applied { border-color: var(--green); }
button.kpi-card.kpi-action.applied::before { background: var(--green); }
button.kpi-card.kpi-action.applied .kpi-action-value { color: var(--green); }

.cmp-badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 20px;
  background: var(--accent-light);
  color: var(--accent2);
  vertical-align: middle;
  margin-left: 4px;
}

/* ── Collapsible output-section headers (Process Inputs / Process Comparison) ── */
.output-section-head.collapsible-head {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}

.output-section-head.collapsible-head:hover { background: rgba(255,255,255,0.06); }

.collapse-chevron {
  color: var(--muted);
  font-size: 13px;
  transition: transform 0.2s;
}

/* Per-process date-range subline under each column header in Process Inputs */
.cmp-th-date {
  font-size: 10px;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: var(--muted2);
  margin-top: 3px;
  font-family: 'JetBrains Mono', monospace;
}

.output-section {
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.output-section-head {
  background: var(--surface2);
  border-bottom: 1.5px solid var(--border);
  padding: 12px 22px;
}

.output-section-head span {
  font-size: 11px;
  color: var(--accent2);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
}

.output-row {
  display: grid;
  grid-template-columns: 1fr 100px 110px 70px;
  border-bottom: 1px solid rgba(148,163,184,0.15);
  padding: 11px 22px;
  align-items: center;
  transition: background 0.15s;
}

.output-row:last-child { border-bottom: none; }
.output-row:hover { background: var(--surface2); }

.output-row.header-row {
  background: var(--surface2);
  font-size: 10px;
  color: var(--muted2);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  padding: 8px 22px;
  border-bottom: 1.5px solid var(--border);
}

.out-name { font-size: 13px; color: var(--text2); font-weight: 500; }
.out-sym { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent); text-align: center; font-weight: 600; }
.out-val { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: var(--text); text-align: right; font-weight: 600; }
.out-uom { font-size: 11px; color: var(--muted2); text-align: right; font-family: 'JetBrains Mono', monospace; }

.highlight-row { background: var(--green-light) !important; }
.highlight-row .out-val { color: var(--green); }
.highlight-row2 { background: var(--blue-light) !important; }
.highlight-row2 .out-val { color: var(--accent); }

.download-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1.5px solid var(--border);
}

.hidden { display: none !important; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--muted2); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(59,130,246,0.08), 0 4px 14px rgba(37,99,235,0.25); }
  50%      { box-shadow: 0 0 0 6px rgba(59,130,246,0.14), 0 4px 22px rgba(37,99,235,0.4); }
}

@keyframes floatChip {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

.animate-in { animation: fadeUp 0.4s ease forwards; }

.page.active { animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1); }

.kpi-card, .session-card, .field {
  animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) backwards;
}
.input-grid .field:nth-child(1) { animation-delay: 0.02s; }
.input-grid .field:nth-child(2) { animation-delay: 0.05s; }
.input-grid .field:nth-child(3) { animation-delay: 0.08s; }
.input-grid .field:nth-child(4) { animation-delay: 0.11s; }
.input-grid .field:nth-child(5) { animation-delay: 0.14s; }
.input-grid .field:nth-child(6) { animation-delay: 0.17s; }
.input-grid .field:nth-child(7) { animation-delay: 0.2s; }
.output-summary .kpi-card:nth-child(1) { animation-delay: 0.02s; }
.output-summary .kpi-card:nth-child(2) { animation-delay: 0.06s; }
.output-summary .kpi-card:nth-child(3) { animation-delay: 0.1s; }
.output-summary .kpi-card:nth-child(4) { animation-delay: 0.14s; }
.output-summary .kpi-card:nth-child(5) { animation-delay: 0.18s; }
.output-summary .kpi-card:nth-child(6) { animation-delay: 0.22s; }
.session-grid .session-card:nth-child(1) { animation-delay: 0.02s; }
.session-grid .session-card:nth-child(2) { animation-delay: 0.06s; }
.session-grid .session-card:nth-child(3) { animation-delay: 0.1s; }
.session-grid .session-card:nth-child(4) { animation-delay: 0.14s; }

@media (prefers-reduced-motion: reduce) {
  .page.active, .kpi-card, .session-card, .field { animation: none; }
}

@media (max-width: 768px) {
  .container { padding: 0 16px; }
  .input-grid { grid-template-columns: 1fr; }
  .tab-btn { padding: 14px 16px; font-size: 12px; }
  .output-row { grid-template-columns: 1fr 80px 90px 60px; }
  .header-badge { display: none; }
}
/* ── Excel Upload Banner ────────────────────────────────────────── */
.upload-banner {
  background: linear-gradient(135deg, rgba(37,99,235,0.06), rgba(8,145,178,0.06));
  border: 1.5px dashed rgba(37,99,235,0.35);
  border-radius: var(--radius);
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  transition: border-color 0.2s, background 0.2s;
}
.upload-banner:hover {
  border-color: var(--accent);
  background: linear-gradient(135deg, rgba(37,99,235,0.09), rgba(8,145,178,0.09));
}
.upload-banner-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--accent-light);
  border: 1.5px solid rgba(96,165,250,0.25);
  color: var(--accent2);
}
.upload-banner-icon svg { width: 19px; height: 19px; }
.upload-banner-text { flex: 1; min-width: 180px; }
.upload-banner-text strong { display: block; font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.upload-banner-text span { font-size: 12px; color: var(--muted); }
.upload-banner-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
#upload-file-input { display: none; }
.btn-upload {
  padding: 10px 20px;
  background: linear-gradient(135deg, var(--accent), #1d4ed8);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(37,99,235,0.3);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
}
.btn-upload:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(37,99,235,0.38); }
.upload-status {
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  white-space: nowrap;
}
.upload-status.loading { background: rgba(251,191,36,0.14); color: #fcd34d; }
.upload-status.success { background: rgba(74,222,128,0.14); color: #86efac; }
.upload-status.error   { background: rgba(248,113,113,0.14); color: #fca5a5; }

/* ── DB status pill in navbar ───────────────────────────────────── */
.db-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 20px;
  margin-left: 8px;
}
.db-pill.online  { background: rgba(74,222,128,0.14); color: #86efac; }
.db-pill.offline { background: rgba(248,113,113,0.14); color: #fca5a5; }
.db-pill.checking{ background: rgba(251,191,36,0.14); color: #fcd34d; }

/* ── Save session confirmation toast ────────────────────────────── */
.toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  padding: 14px 22px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.3s ease;
  pointer-events: none;
}
.toast.show { opacity: 1; transform: translateY(0); }
.toast.toast-success { background: #059669; }
.toast.toast-error   { background: #dc2626; }

/* ── Sessions page ──────────────────────────────────────────────── */
.sessions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0 20px;
  flex-wrap: wrap;
  gap: 12px;
}
.sessions-header h2 { font-size: 20px; font-weight: 800; color: var(--text); }
.sessions-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  background: var(--surface2);
  border: 1px solid var(--border);
  padding: 4px 12px;
  border-radius: 20px;
}
.session-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
  margin-bottom: 60px;
}
.session-card {
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
  cursor: pointer;
  position: relative;
}
.session-card:hover {
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(96,165,250,0.15);
  transform: translateY(-3px);
  border-color: rgba(96,165,250,0.3);
}
.session-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.session-card-title { font-size: 14px; font-weight: 700; color: var(--text); }
.session-card-date { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--muted2); margin-top: 3px; }
.session-card-source {
  font-size: 10px;
  background: var(--accent-light);
  color: var(--accent);
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.session-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
.session-kpi { background: var(--surface2); border-radius: var(--radius-sm); padding: 10px 14px; border: 1px solid var(--border); }
.session-kpi-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 4px; }
.session-kpi-value { font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700; }
.session-kpi-value.green { color: var(--green); }
.session-kpi-value.blue  { color: var(--blue); }
.session-kpi-value.red   { color: var(--red); }
.session-kpi-value.amber { color: var(--amber); }
.session-card-delete {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--muted2);
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.2s;
  opacity: 0;
}
.session-card:hover .session-card-delete { opacity: 1; }
.session-card-delete:hover { background: var(--red-light); color: var(--red); }

.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center; }
.empty-icon { font-size: 64px; margin-bottom: 20px; }
.empty-title { font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.empty-sub { font-size: 14px; color: var(--muted); max-width: 320px; }

/* Session detail modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(15,23,42,0.55); backdrop-filter: blur(4px);
  z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px;
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
}
.modal-overlay.open { opacity: 1; pointer-events: all; }
.modal {
  background: #101d42; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border);
  border-radius: var(--radius); box-shadow: var(--shadow-lg);
  width: 100%; max-width: 700px; max-height: 88vh; overflow-y: auto;
  transform: translateY(24px); transition: transform 0.25s;
}
.modal-overlay.open .modal { transform: translateY(0); }
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 26px 16px; border-bottom: 1px solid var(--border); position: sticky; top: 0;
  background: var(--surface); z-index: 1;
}
.modal-header h3 { font-size: 17px; font-weight: 800; color: var(--text); }
.modal-close { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--muted); padding: 4px 8px; border-radius: 6px; transition: all 0.2s; }
.modal-close:hover { background: var(--surface2); color: var(--text); }
.modal-body { padding: 22px 26px; }
.modal-section-title {
  font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--accent2);
  letter-spacing: 2px; text-transform: uppercase; font-weight: 700;
  margin: 20px 0 10px; padding-bottom: 6px; border-bottom: 1px solid var(--border);
}
.modal-section-title:first-child { margin-top: 0; }
.modal-row {
  display: grid; grid-template-columns: 1fr auto auto;
  gap: 8px; padding: 7px 0; border-bottom: 1px solid rgba(148,163,184,0.12);
  font-size: 13px; align-items: center;
}
.modal-row:last-child { border-bottom: none; }
.modal-row-name { color: var(--text2); }
.modal-row-val { font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--text); text-align: right; }
.modal-row-uom { font-size: 11px; color: var(--muted2); text-align: right; font-family: 'JetBrains Mono', monospace; min-width: 46px; }
.modal-highlight { background: var(--green-light) !important; border-radius: 6px; padding: 10px 12px !important; margin: 4px 0; }
.modal-highlight .modal-row-val { color: var(--green); font-size: 16px; }
.modal-highlight2 { background: var(--blue-light) !important; border-radius: 6px; padding: 10px 12px !important; margin: 4px 0; }
.modal-highlight2 .modal-row-val { color: var(--accent); font-size: 16px; }
/* ══════════════════════════════════════════════════════════════════════
   Date-wise Processes — multi-date-range selection + calendar picker +
   comparison table (see public/script.js: addProcess/openDatePicker/
   renderComparison)
   ══════════════════════════════════════════════════════════════════════ */
.process-section {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  margin-bottom: 28px;
}
.process-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.process-section-title { display: flex; flex-direction: column; gap: 3px; }
.process-section-title strong { font-size: 14px; color: var(--text); }
.process-section-sub { font-size: 12px; color: var(--muted); }
#process-list { margin-top: 14px; display: flex; flex-direction: column; gap: 10px; }
.process-empty {
  font-size: 12px;
  color: var(--muted2);
  font-style: italic;
  padding: 6px 2px;
}
.process-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background: var(--surface2);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
}
.process-title-input {
  flex: 1 1 160px;
  min-width: 140px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 8px 10px;
  color: var(--text-bright);
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  outline: none;
}
.process-title-input:focus { border-color: var(--accent); }
.process-date-btn {
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--text2);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
  white-space: nowrap;
}
.process-date-btn:hover { border-color: var(--accent); color: var(--text-bright); }
.process-date-sep { color: var(--muted2); font-size: 13px; }
.process-row-count {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  margin-left: auto;
}
.process-remove-btn {
  background: transparent;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  color: var(--muted);
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.15s;
  flex-shrink: 0;
}
.process-remove-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-light); }

/* ── Calendar popup ──────────────────────────────────────────────── */
.date-picker-popup {
  position: absolute;
  z-index: 10000;
  background: var(--bg2);
  border: 1.5px solid var(--border2);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  padding: 12px;
  width: 240px;
  font-family: 'Outfit', sans-serif;
}
.dp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.dp-month { font-size: 13px; font-weight: 700; color: var(--text-bright); }
.dp-nav {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text2);
  width: 26px;
  height: 26px;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
}
.dp-nav:hover { border-color: var(--accent); color: var(--accent2); }
.dp-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  text-align: center;
}
.dp-dow { margin-bottom: 4px; }
.dp-dow span { font-size: 10px; color: var(--muted2); font-weight: 600; }
.dp-cell {
  position: relative;
  padding: 6px 0;
  font-size: 12px;
  color: var(--text2);
  border-radius: 6px;
  cursor: pointer;
}
.dp-cell:hover { background: var(--accent-light); color: var(--text-bright); }
.dp-cell.dp-empty { cursor: default; }
.dp-cell.dp-empty:hover { background: transparent; }
.dp-cell.dp-selected { background: var(--accent); color: #fff; font-weight: 700; }
.dp-dot {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--red);
}
.dp-cell.dp-selected .dp-dot { background: #fff; }
.dp-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}
.dp-legend {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: var(--muted);
}
.dp-legend .dp-dot { position: static; transform: none; display: inline-block; }
.dp-clear {
  background: transparent;
  border: none;
  color: var(--accent2);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.dp-clear:hover { text-decoration: underline; }

/* ── Comparison table (multi-process results) ───────────────────── */
.cmp-table-wrap { overflow-x: auto; }
.cmp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.cmp-table th, .cmp-table td {
  padding: 8px 14px;
  text-align: right;
  white-space: nowrap;
  border-bottom: 1px solid var(--border);
}
.cmp-table th:first-child, .cmp-table td:first-child { text-align: left; }
.cmp-table thead th {
  color: var(--accent2);
  font-weight: 700;
  border-bottom: 1.5px solid var(--border2);
}
.cmp-table td.cmp-metric { color: var(--muted); font-weight: 600; }
.cmp-table tbody tr:hover { background: var(--surface2); }
.cmp-note {
  font-size: 11px;
  color: var(--muted2);
  padding: 10px 14px 2px;
  font-style: italic;
}`,th=`/* ════════════════════════════════════════════════════════════════════
   style1.css — BS-2885 tab only
   Loaded after style.css on tab1.html. Everything here is additive:
   it only styles the couple of things tab1.html introduces that don't
   already exist in style.css (the loss-breakdown tables on the Results
   page, and a small note banner under the input form — same visual
   language as style3.css's .bee-note for BEE). Nothing in style.css is
   overridden — CENPEEP / ASME-PTC 4.1 / BEE keep their exact current look.
   ════════════════════════════════════════════════════════════════════ */

.output-table-wrap {
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 10px;
  background: var(--surface2);
}
.output-table-wrap h3 {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.2px;
}
.output-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}
.output-table th,
.output-table td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}
.output-table th {
  color: var(--muted);
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.output-table td {
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
}
.output-table td:first-child {
  font-family: 'Outfit', sans-serif;
  color: var(--muted);
}
.output-table tbody tr:last-child td { border-bottom: none; }

/* Note banner under the BS-2885 input form — same treatment as
   style3.css's .bee-note for the BEE tab. */
.bs-note {
  margin-top: 16px;
  padding: 12px 16px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-left: 3px solid var(--accent);
  border-radius: 8px;
  background: var(--surface2);
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.6;
}
.bs-note strong { color: var(--text); }
.bs-note code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  background: rgba(148, 163, 184, 0.14);
  padding: 1px 5px;
  border-radius: 4px;
}`,rh=`/* ════════════════════════════════════════════════════════════════════
   style3.css — BEE tab only
   Loaded after style.css on tab3.html. Everything here is additive:
   it only styles the couple of things tab3.html introduces that don't
   already exist in style.css (an "info only" field tag for General
   Data, and a small note banner under the input form). Nothing in
   style.css is overridden — BS-2885 / ASME-PTC 4.1 / CENPEEP keep
   their exact current look.
   ════════════════════════════════════════════════════════════════════ */

/* "INFO ONLY" tag — Boiler Load / Steam Pressure aren't used by the
   BEE-2 Indirect formula, only carried for the report header. Same
   visual language as the existing .manual-tag / .formula-tag pills,
   just a neutral color so it doesn't read as "needs attention". */
.info-tag {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.4px;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 6px;
  background: rgba(148, 163, 184, 0.16);
  color: var(--muted);
  vertical-align: middle;
}

.field.field-info {
  opacity: 0.85;
}

/* Note banner under the BEE input form, explaining what's informational
   vs what actually feeds the calculation, and pointing at script3.js
   for the two formula quirks carried over from the reference sheet. */
.bee-note {
  margin-top: 16px;
  padding: 12px 16px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-left: 3px solid var(--accent);
  border-radius: 8px;
  background: var(--surface2);
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.6;
}
.bee-note strong {
  color: var(--text);
}
.bee-note code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  background: rgba(148, 163, 184, 0.14);
  padding: 1px 5px;
  border-radius: 4px;
}`,sh=`/* ════════════════════════════════════════════════════════════════════
   style4.css — IS-13890 tab only (loaded after style.css; additive).
   Uses the reference workbook's own colour convention so the screen reads
   like the sheet:
       ORANGE  #FAC090  = INPUT cells
       GREEN   #D7E4BD  = CALCULATED cells (formulas)
   Colours are for understanding only — detection is done by the ML model.
   ════════════════════════════════════════════════════════════════════ */
.is-page { --is-in: #FAC090; --is-in-bg: rgba(250,192,144,0.13); --is-calc: #D7E4BD; --is-calc-bg: rgba(215,228,189,0.12); }

/* legend */
.is-legend { display: flex; flex-wrap: wrap; gap: 10px 22px; align-items: center; margin: 0 0 16px; padding: 10px 16px;
  border: 1px solid rgba(148,163,184,0.18); border-radius: 10px; background: var(--surface2); font-size: 12.5px; color: var(--muted); }
.is-legend b { color: var(--text); font-weight: 600; }
.is-swatch { display: inline-block; width: 22px; height: 14px; border-radius: 3px; vertical-align: -2px; margin-right: 8px; border: 1px solid rgba(0,0,0,0.25); }
.is-swatch.in { background: var(--is-in); }
.is-swatch.calc { background: var(--is-calc); }

/* input page fields */
.is-page .field.is-input { border-left: 4px solid var(--is-in); }
.is-page .field.is-input .field-input { background: var(--is-in-bg); border-color: rgba(250,192,144,0.45); }
.is-page .field.is-input .field-input:focus { border-color: var(--is-in); background: rgba(250,192,144,0.2); box-shadow: 0 0 0 3px rgba(250,192,144,0.18); }
.is-page .field.is-calc { border-left: 4px solid var(--is-calc); }
.is-page .field.is-calc .field-input.formula-input { background: var(--is-calc-bg) !important; color: var(--is-calc) !important; border-color: rgba(215,228,189,0.4); }
/* "detected from your file" must not look like the green CALC colour on this tab */
.is-page .field-input.field-detected { border-color: var(--is-in) !important; background: rgba(250,192,144,0.26) !important; box-shadow: 0 0 0 2px rgba(250,192,144,0.18); }
.is-page .field-input.field-missing { border-color: #f87171 !important; background: rgba(248,113,113,0.1) !important; }

/* detection summary + warnings */
.is-detect { font-size: 12px; }
.is-detect table { width: 100%; border-collapse: collapse; margin-top: 4px; }
.is-detect th { color: #94a3b8; text-align: left; font-weight: 600; }
.is-detect td, .is-detect th { padding: 2px 8px 2px 0; }
.is-warn { margin-top: 10px; padding: 10px 14px; border: 1px solid rgba(251,191,36,0.3); border-left: 3px solid var(--amber); border-radius: 8px;
  background: var(--amber-light); color: var(--text2); font-size: 12.5px; line-height: 1.55; }
.is-warn ul { margin: 4px 0 0 18px; padding: 0; }
.is-note { margin-top: 16px; padding: 12px 16px; border: 1px solid rgba(148,163,184,0.18); border-left: 3px solid var(--accent); border-radius: 8px;
  background: var(--surface2); color: var(--muted); font-size: 12.5px; line-height: 1.6; }
.is-note strong { color: var(--text); }
.is-note label { display: flex; gap: 8px; align-items: flex-start; margin-top: 6px; cursor: pointer; color: var(--text2); }

/* results — worksheet view */
.is-sheet { margin-top: 18px; border: 1px solid rgba(148,163,184,0.2); border-radius: 10px; overflow: hidden; background: var(--surface2); }
.is-sheet h3 { margin: 0; padding: 11px 16px; font-size: 13px; font-weight: 600; color: var(--text); background: var(--surface); border-bottom: 1px solid var(--border); }
.is-sheet .scroll { overflow-x: auto; }
.is-sheet table { width: 100%; border-collapse: collapse; font-size: 12.5px; min-width: 820px; table-layout: fixed; }
.is-sheet th:nth-child(1) { width: 34%; } .is-sheet th:nth-child(2) { width: 8%; } .is-sheet th:nth-child(3) { width: 9%; }
.is-sheet th:nth-child(4) { width: 11%; } .is-sheet th:nth-child(5) { width: 38%; }
.is-sheet th { text-align: left; color: var(--muted2); font-size: 10px; letter-spacing: 1.4px; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;
  padding: 8px 12px; border-bottom: 1.5px solid var(--border); }
.is-sheet td { padding: 7px 12px; border-bottom: 1px solid rgba(148,163,184,0.12); color: var(--text2); vertical-align: middle; }
.is-sheet tr:last-child td { border-bottom: none; }
.is-sheet td.sym { font-family: 'JetBrains Mono', monospace; color: var(--accent); text-align: center; font-weight: 600; }
.is-sheet td.uom { font-family: 'JetBrains Mono', monospace; color: var(--muted2); font-size: 11px; }
.is-sheet td.formula { color: var(--muted); font-size: 11.5px; }
.is-sheet td.val { font-family: 'JetBrains Mono', monospace; font-weight: 600; text-align: right; color: #1f2937; white-space: nowrap; }
.is-sheet td.val.in { background: var(--is-in); }
.is-sheet td.val.calc { background: var(--is-calc); }
.is-sheet tr.bold td.name { font-weight: 700; color: var(--text); }
.is-sheet tr.total td.name { font-weight: 700; color: var(--text); }
.is-sheet tr.eff td { font-size: 14px; padding: 10px 12px; }
.is-sheet tr.eff td.name { font-weight: 800; color: var(--text-bright); }
.is-sheet tr.eff td.val { font-size: 17px; }
.is-sheet .excluded { opacity: .75; }
.is-sheet .tagx { font-size: 9.5px; margin-left: 6px; padding: 1px 6px; border-radius: 4px; background: rgba(148,163,184,0.2); color: var(--muted); letter-spacing: .5px; }
`,oh=`/* Copied verbatim from the injected <style> in public/boiler-gate.js */
      /* ── Locked state: tab switching + upload disabled until a boiler
         type is picked for this session ───────────────────────────── */
      body.boiler-locked .nav-link,
      body.boiler-locked .tab-btn,
      body.boiler-locked .btn-upload {
        pointer-events: none;
        opacity: 0.4;
        filter: grayscale(0.4);
        cursor: not-allowed;
      }
      body.boiler-locked #upload-file-input { pointer-events: none; }

      /* ── "Select Boiler Type" banner ──────────────────────────────── */
      .boiler-lock-banner {
        display: none;
        align-items: center;
        gap: 14px;
        background: var(--accent-light, rgba(96,165,250,0.14));
        border: 1.5px solid var(--border, rgba(255,255,255,0.12));
        border-radius: var(--radius, 16px);
        padding: 14px 18px;
        margin: 0 0 20px;
      }
      .boiler-lock-banner-icon {
        width: 40px; height: 40px; flex-shrink: 0;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(96,165,250,0.18);
        border: 1px solid rgba(96,165,250,0.3);
        color: #93c5fd;
      }
      .boiler-lock-banner-text { flex: 1 1 auto; min-width: 180px; }
      .boiler-lock-banner-text strong { display: block; font-size: 14.5px; color: var(--text, #f1f5f9); margin-bottom: 2px; }
      .boiler-lock-banner-text span { font-size: 13px; color: var(--muted, #94a3b8); }
      .boiler-lock-banner .btn { flex-shrink: 0; }

      /* ── Boiler-type popup card (reuses the app's existing modal look) ── */
      .boiler-select-modal { max-width: 400px; text-align: center; }
      .boiler-select-modal .modal-body { padding: 26px 28px 30px; }
      .boiler-select-icon {
        width: 56px; height: 56px; margin: 0 auto 16px;
        border-radius: 14px;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, rgba(59,130,246,0.18), rgba(96,165,250,0.10));
        border: 1px solid rgba(96,165,250,0.3);
        color: #93c5fd;
      }
      .boiler-select-sub { font-size: 13.5px; color: var(--muted, #94a3b8); margin-bottom: 20px; }
      .boiler-select-field { text-align: left; margin-bottom: 20px; }
      .boiler-select-field label {
        display: block; font-size: 12.5px; font-weight: 600;
        color: var(--muted, #94a3b8); margin-bottom: 8px; letter-spacing: 0.2px;
      }
      .select-wrap { position: relative; }
      .select-wrap select {
        width: 100%;
        padding: 13px 40px 13px 14px;
        border: 1.5px solid var(--border, rgba(255,255,255,0.12));
        border-radius: 12px;
        font-family: 'Outfit', sans-serif;
        font-size: 14.5px;
        color: var(--text, #f1f5f9);
        background: rgba(255,255,255,0.03);
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
        transition: all 0.2s;
      }
      .select-wrap select:focus {
        border-color: var(--accent, #60a5fa);
        background: rgba(59,130,246,0.06);
        box-shadow: 0 0 0 3px rgba(59,130,246,0.14);
      }
      .select-wrap select option { background: #101d42; color: var(--text, #f1f5f9); }
      .select-wrap::after {
        content: '';
        position: absolute; right: 16px; top: 50%;
        width: 9px; height: 9px;
        border-right: 2px solid var(--muted, #94a3b8);
        border-bottom: 2px solid var(--muted, #94a3b8);
        transform: translateY(-70%) rotate(45deg);
        pointer-events: none;
      }
      #boilerSelectOk { width: 100%; justify-content: center; }
    `,Mp=S.createContext(()=>{}),yr=()=>S.useContext(Mp);function ah({children:e}){const[n,t]=S.useState({msg:"",type:"success",show:!1}),r=S.useRef(null),o=S.useCallback((a,l="success")=>{t({msg:a,type:l,show:!0}),clearTimeout(r.current),r.current=setTimeout(()=>t(i=>({...i,show:!1})),3200)},[]);return S.useEffect(()=>()=>clearTimeout(r.current),[]),s.jsxs(Mp.Provider,{value:o,children:[e,s.jsx("div",{className:n.show?`toast toast-${n.type} show`:"toast",id:"toast",children:n.msg})]})}const _p=S.createContext({boilerType:null,setBoilerType:()=>{}}),ji=()=>S.useContext(_p);function lh({children:e}){const[n,t]=S.useState(()=>sessionStorage.getItem("boilerType")),r=S.useCallback(o=>{sessionStorage.setItem("boilerType",o),t(o)},[]);return S.useEffect(()=>(document.body.classList.toggle("boiler-locked",!n),()=>document.body.classList.remove("boiler-locked")),[n]),s.jsx(_p.Provider,{value:{boilerType:n,setBoilerType:r},children:e})}const sr=["A","VM","M","FC","SUC","GCV","S","T","Tdb","Twb","O2","CO2","CO","N2","BL","ER","Wze","UBA","UFA"],ih={A:"Ash",VM:"Volatile Matter",M:"Moisture",FC:"Fixed Carbon",SUC:"Sucrose",GCV:"Gross Calorific Value",S:"Sulphur",T:"Avg Flue Gas O/L Temp",Tdb:"Ambient Temp (Dry bulb)",Twb:"Ambient Temp (Wet Bulb)",O2:"O₂ at APH Inlet",CO2:"CO₂ at APH Inlet",CO:"CO at APH Inlet",N2:"N₂ at APH Inlet",BL:"Boiler Load",ER:"Evaporation Ratio",Wze:"Quantity of Atomizing Steam",UBA:"Unburnts in Bottom Ash",UFA:"Unburnts in Fly Ash"},Bp={A:1.9140136577858815,VM:1.87711659409782,M:50.5,FC:45.7088697481163,SUC:2.34,GCV:2248.92,S:0,T:182.83,Tdb:26,Twb:18,O2:8.97,CO2:11.7649,CO:.0651,N2:79.2,BL:32e3,ER:2,Wze:0,UBA:84.78368970661371,UFA:78.84463722397473},wl={radiationInTotal:!1,hrwFromMoisture:!0},Cn=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t},yt=(e,n)=>n===0?NaN:e/n;function Dp(e){const n=Cn(e,"A"),t=Cn(e,"VM"),r=Cn(e,"M"),o=Cn(e,"FC"),a=Cn(e,"S"),l=o+.9*(t-14),i=t*(7.35/(t+10)-.013),u=2.1-.012*t,d=100-l-i-a-u-n-r,h=(Cn(e,"Tdb")+Cn(e,"Twb"))/2,g=yt(Cn(e,"BL"),Cn(e,"ER"));return{C:l,H:i,N:u,O:d,t:h,Bagasse:g}}function zp(e,n=wl){const t={...wl,...n},r=le=>Cn(e,le),{C:o,H:a,N:l,O:i,t:u,Bagasse:d}=Dp(e),h=r("A"),g=r("M"),f=r("S"),y=r("GCV"),k=r("T"),C=r("O2"),P=r("CO2"),p=r("CO"),c=r("N2"),m=r("UBA"),v=r("UFA"),E=r("Wze"),A=d*h/100,w=d,j=yt(A,w),_=70/100*h/100*v/100*8078+h/100*30/100*m/100*8078,I=j*_,K=o/100-j*_/8078,X=yt(44.01*P+32*C+28.02*c+28.01*p,12.01*(P+p))*(K+f/267),Y=1.01/4.186,Z=X*Y*(k-u),B=g/100,V=(2501+1.88*k)/4.186,J=t.hrwFromMoisture?B:u,L=B*(V-J),D=8.936*a/100*(V-J),H=yt(E*(V-J),d),N=yt(p,P+p)*5644*K,T=0,q=0,R=1.5*y/100,x=I+Z+L+D+H+N+T+q+(t.radiationInTotal?R:0),O=yt(x,y)*100,z=100-O,$=le=>yt(le,y)*100,de=Number.isFinite(z),pe={ultimate:[{key:"C",name:"Carbon",sym:"C",uom:"%",val:o,formula:"(Fixed Carbon) + 0.9 × (Volatile Matter − 14)"},{key:"H",name:"Hydrogen",sym:"H",uom:"%",val:a,formula:"VM × (7.35 / (VM + 10) − 0.013)"},{key:"N",name:"Nitrogen",sym:"N",uom:"%",val:l,formula:"2.1 − 0.012 × VM"},{key:"O",name:"Oxygen",sym:"O",uom:"%",val:i,formula:"100 − C − H − S − N − Ash − Moisture"}],boiler:[{key:"t",name:"Ambient Temp (Dry bulb + Wet bulb)/2",sym:"t",uom:"°C",val:u,formula:"(Dry bulb + Wet bulb) / 2"},{key:"Bagasse",name:"Bagasse Consumption",sym:"",uom:"kg/h",val:d,formula:"Boiler Load / Evaporation Ratio"}],tabulation:[{key:"Luc",name:"Loss due to Unburned carbon",sym:"Luc",uom:"kcal/kg",val:I,loss:!0,bold:!0,formula:"kg of total dry refuse per kg of AF fuel × HHV of total dry refuse"},{key:"Wdp",name:"kg of total dry refuse per kg of AF fuel",sym:"Wd'p'",uom:"kg/kg",val:j,formula:"Weight of dry refuse collected / Measured fuel rate"},{key:"Wdpe",name:"Weight of dry refuse collected",sym:"Wd'p'e",uom:"kg/h",val:A,formula:"Bagasse Consumption × Ash / 100"},{key:"Wfe",name:"Measured fuel rate",sym:"Wfe",uom:"kg/h",val:w,formula:"Bagasse Consumption"},{key:"Hdp",name:"HHV of total dry refuse",sym:"Hd'p'",uom:"kcal/kg",val:_,formula:"(70/100 × Ash/100 × UFA/100 × 8078) + (Ash/100 × 30/100 × UBA/100 × 8078)"},{key:"Lg",name:"Loss due to Dry flue gas",sym:"Lg",uom:"kcal/kg",val:Z,loss:!0,bold:!0,formula:"Weight of dry gas per kg of AF fuel × Mean Sp. Heat of dry flue gas × (Avg Flue Gas O/L Temp − t)"},{key:"Cb",name:"kg of carbon burnt per kg of AF fuel",sym:"Cb",uom:"kg/kg",val:K,formula:"Carbon / 100 − (Wd'p' × Hd'p' / 8078)"},{key:"WG",name:"Weight of dry gas leaving unit per kg of AF fuel",sym:"WG'",uom:"kg/kg",val:X,formula:"((44.01·CO2 + 32·O2 + 28.02·N2 + 28.01·CO) / (12.01·(CO2 + CO))) × (Cb + Sulphur/267)"},{key:"CpG",name:"Mean Sp. Heat of dry Flue Gas",sym:"CpG'",uom:"kcal/kg°C",val:Y,formula:"1.01 / 4.186"},{key:"Lmf",name:"Loss due to moisture in fuel",sym:"Lmf",uom:"kcal/kg",val:L,loss:!0,bold:!0,formula:"kg of moisture/kg of AF fuel × (Vapour Enthalpy at 0.07 kgf/cm² at APH o/l − Enthalpy of saturated liquid at t)"},{key:"mf",name:"kg of moisture/kg of AF fuel",sym:"mf",uom:"kg/kg",val:B,formula:"Moisture / 100"},{key:"Hv",name:"Vapour Enthalpy at 0.07 kgf/cm² at APH o/l",sym:"Wfe",uom:"kcal/kg",val:V,formula:"(2501 + 1.88 × Temp at APH O/L) / 4.186"},{key:"HRw",name:"Enthalpy of saturated liquid at t",sym:"HRw",uom:"kcal/kg",val:J,formula:t.hrwFromMoisture?"kg of moisture/kg of AF fuel  (as in the workbook, cell E48)":"Ambient t (hᵍ ≈ t kcal/kg)"},{key:"Lh",name:"Loss due to moisture in Hydrogen",sym:"Lh",uom:"kcal/kg",val:D,loss:!0,bold:!0,formula:"8.936 × Hydrogen / 100 × (Vapour Enthalpy − Enthalpy of saturated liquid)"},{key:"Lz",name:"Loss due to atomizing steam",sym:"Lz",uom:"kcal/kg",val:H,loss:!0,bold:!0,formula:"Atomizing steam × (Vapour Enthalpy − Enthalpy of saturated liquid) / Bagasse Consumption"},{key:"Lco",name:"Loss due to formation of CO",sym:"Lco",uom:"kcal/kg",val:N,loss:!0,bold:!0,formula:"CO / (CO2 + CO) × 5644 × kg of carbon burnt per kg of AF fuel"},{key:"Luh",name:"Loss due to unburned hydrogen",sym:"Luh",uom:"kcal/kg",val:T,loss:!0,bold:!0,formula:"0 Value"},{key:"Luhc",name:"Loss due to Unburned Hydrocarbons",sym:"Luhc",uom:"kcal/kg",val:q,loss:!0,bold:!0,formula:"0 Value"},{key:"Lbeta",name:"Loss due to radiation & convection",sym:"Lβ",uom:"kcal/kg",val:R,loss:!0,bold:!0,notInTotal:!t.radiationInTotal,formula:"1.5 × Gross Calorific Value / 100"},{key:"TotalLossKcal",name:"Total Loss kcal/kg",sym:"",uom:"kcal/kg",val:x,total:!0,formula:"Luc + Lg + Lmf + Lh + Lz + Lco + Luh + Luhc"+(t.radiationInTotal?" + Lβ":"")},{key:"TotalLossPct",name:"Total Loss %",sym:"",uom:"%",val:O,total:!0,formula:"Total Loss kcal/kg / Gross Calorific Value × 100"}]};return{ok:de,C:o,H:a,N:l,O:i,t:u,Bagasse:d,Wdp:j,Wdpe:A,Wfe:w,Hdp:_,Cb:K,WG:X,CpG:Y,mf:B,Hv:V,HRw:J,Luc:I,Lg:Z,Lmf:L,Lh:D,Lz:H,Lco:N,Luh:T,Luhc:q,Lbeta:R,TotalLossKcal:x,TotalLossPct:O,BoilerEff:z,pct:{Luc:$(I),Lg:$(Z),Lmf:$(L),Lh:$(D),Lz:$(H),Lco:$(N),Lbeta:$(R)},rows:pe,options:t,inputs:sr.map(le=>({id:le,label:ih[le]||le,value:e[le]}))}}const Ve="IS-13890",uh="/is-13890",Ce=(e,n,t,r,o={})=>({id:e,name:n,sym:t,uom:r,kind:"is-input",value:String(Bp[e]??""),readonly:!1,step:"any",...o}),Bt=(e,n,t,r)=>({id:e,name:n,sym:t,uom:r,kind:"is-calc",value:"",readonly:!0,formula:!0}),ja=(e,n="manual-tag")=>({tag:{cls:n,text:e}}),ch=[{target:"grid-proximate",icon:"PA",title:"Proximate Analysis — As Fired",sub:"6 inputs"},{target:"grid-ultimate",icon:"UA",title:"Ultimate Analysis — As Fired",sub:"1 input · 4 calculated"},{target:"grid-boiler",icon:"BP",title:"Boiler Parameters",sub:"10 inputs · 2 calculated"},{target:"grid-loi",icon:"LO",title:"LOI — Unburnts in Ash",sub:"2 inputs"}],Si={"grid-proximate":[Ce("A","Ash","A","%"),Ce("VM","Volatile Matter","VM","%"),Ce("M","Moisture","M","%"),Ce("FC","Fixed Carbon","FC","%"),Ce("SUC","Sucrose","","%",ja("INFO","formula-tag")),Ce("GCV","Gross Calorific Value","GCV","kcal/kg")],"grid-ultimate":[Ce("S","Sulphur","S","%"),Bt("C","Carbon","C","%"),Bt("H","Hydrogen","H","%"),Bt("N","Nitrogen","N","%"),Bt("O","Oxygen","O","%")],"grid-boiler":[Ce("T","Avg Flue Gas O/L Temp","T","°C"),Ce("Tdb","Ambient Temp (Dry bulb)","","°C"),Ce("Twb","Ambient Temp (Wet Bulb)","","°C"),Bt("t","Ambient Temp (Dry + Wet)/2","t","°C"),Ce("O2","O₂ at APH Inlet","O2","%"),Ce("CO2","CO₂ at APH Inlet","CO2","%"),Ce("CO","CO at APH Inlet","CO","%"),Ce("N2","N₂ at APH Inlet","N2","%"),Ce("BL","Boiler Load","kg/h","kg/h",ja("FIX")),Ce("ER","Evaporation Ratio","","kg/kg",ja("FIX")),Bt("Bagasse","Bagasse Consumption","","kg/h"),Ce("Wze","Quantity of Atomizing Steam","Wze","kg/h")],"grid-loi":[Ce("UBA","Unburnts in Bottom Ash","UBA","%"),Ce("UFA","Unburnts in Fly Ash","UFA","%")]},dh=[{to:"/calculator",label:"CENPEEP"},{to:"/bs-2885",label:"BS-2885"},{to:"/asme-ptc-4-1",label:"ASME-PTC 4.1"},{to:"/bee",label:"BEE"},{to:uh,label:Ve},{to:"/summary",label:"Summary"},{to:"/sessions",label:"Sessions"}];function ph({active:e}){const{boilerType:n}=ji();return s.jsx("nav",{className:"navbar",children:s.jsxs("div",{className:"nav-inner",children:[s.jsxs("div",{className:"nav-logo",children:[s.jsx("div",{className:"nav-logo-icon",children:s.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),s.jsxs("span",{className:"nav-logo-text",children:["Boiler",s.jsx("small",{children:"Efficiency Calculator"})]}),n&&s.jsx("span",{id:"boiler-type-badge",className:"boiler-type-badge",title:"Boiler type selected at login",children:n})]}),s.jsx("div",{className:"nav-links",children:dh.map(t=>s.jsx(G0,{to:t.to,className:"nav-link"+(e===t.to?" active":""),children:t.label},t.to))}),s.jsx("button",{className:"nav-logout",onClick:()=>V0(),children:"Logout"})]})})}const Sa=["CFBC","Pulverized Coal","AFBC","Bagasse Fired"];function Ft(){const{boilerType:e}=ji();return s.jsxs("div",{className:"boiler-lock-banner",id:"boiler-lock-banner",style:{display:e?"none":"flex"},children:[s.jsx("div",{className:"boiler-lock-banner-icon",children:s.jsx(Ip,{width:"20",height:"20"})}),s.jsxs("div",{className:"boiler-lock-banner-text",children:[s.jsx("strong",{children:"Boiler type not selected"}),s.jsx("span",{children:"Select your boiler type to unlock uploads and tab switching."})]}),s.jsx("button",{type:"button",className:"btn btn-primary",id:"boiler-select-trigger",onClick:()=>window.dispatchEvent(new CustomEvent("open-boiler-modal")),children:"Select Boiler Type"})]})}function fh(){const{boilerType:e,setBoilerType:n}=ji(),[t,r]=S.useState(!1),[o,a]=S.useState(e&&Sa.includes(e)?e:Sa[0]);return mh(()=>r(!0)),s.jsx("div",{className:"modal-overlay"+(t?" open":""),id:"boilerSelectOverlay",onClick:l=>{l.target===l.currentTarget&&r(!1)},children:s.jsxs("div",{className:"modal boiler-select-modal",children:[s.jsxs("div",{className:"modal-header",children:[s.jsx("h3",{children:"Select Your Boiler Type"}),s.jsx("button",{className:"modal-close",id:"boilerSelectClose","aria-label":"Close",type:"button",onClick:()=>r(!1),children:"×"})]}),s.jsxs("div",{className:"modal-body",children:[s.jsx("div",{className:"boiler-select-icon",children:s.jsx(Ip,{width:"26",height:"26"})}),s.jsx("div",{className:"boiler-select-sub",children:"This helps tailor the calculation to your plant"}),s.jsxs("div",{className:"boiler-select-field",children:[s.jsx("label",{htmlFor:"boilerTypeSelect",children:"Boiler Type"}),s.jsx("div",{className:"select-wrap",children:s.jsx("select",{id:"boilerTypeSelect",value:o,onChange:l=>a(l.target.value),children:Sa.map(l=>s.jsx("option",{value:l,children:l},l))})})]}),s.jsx("button",{type:"button",className:"btn btn-primary",id:"boilerSelectOk",onClick:()=>{n(o),r(!1)},children:"OK"})]})]})})}function mh(e){S.useEffect(()=>(window.addEventListener("open-boiler-modal",e),()=>window.removeEventListener("open-boiler-modal",e)))}const Qu={bs2885:th,bee:rh,is13890:sh};function Pt({active:e,extraStyle:n,children:t}){return Op([nh,...Qu[n]?[Qu[n]]:[],oh],"app-"+(n||"base")),s.jsx(lh,{children:s.jsxs(ah,{children:[s.jsx(Fp,{}),s.jsx(ph,{active:e}),t,s.jsx(fh,{})]})})}function vr({description:e,onFile:n,status:t,buttonLabel:r="Upload Excel Sheet"}){const o=S.useRef(null);return s.jsxs("div",{className:"upload-banner",id:"upload-banner",children:[s.jsx("div",{className:"upload-banner-icon",children:s.jsx(J0,{})}),s.jsxs("div",{className:"upload-banner-text",children:[s.jsx("strong",{children:"Import from Excel"}),s.jsx("span",{children:e})]}),s.jsxs("div",{className:"upload-banner-actions",children:[s.jsx("input",{type:"file",id:"upload-file-input",accept:".xlsx,.xls,.xlsm",ref:o,onChange:a=>{const l=a.target.files[0];l&&Promise.resolve(n(l)).finally(()=>{o.current&&(o.current.value="")})}}),s.jsxs("button",{className:"btn-upload",onClick:()=>o.current&&o.current.click(),children:[s.jsx(Q0,{}),r]}),t&&s.jsx("span",{className:"upload-status "+t.cls,id:"upload-status",style:{display:"inline-block"},children:t.node!==void 0?t.node:t.text})]})]})}const Rp={cenpeep_column:"CenPeep layout",raw_tabular:"raw data, averaged",raw_tabular_ml:"raw data + AI field detection",raw_tabular_chunked:"large sheet, chunked",raw_tabular_ml_chunked:"large sheet, chunked + AI field detection",unrecognized:"no fields found"},hh={...Rp,generic_row_layout:"labeled-row layout",label_value_layout:"label/value form layout"},Up=Rp;function Ni({data:e,populated:n,fieldDetail:t,missingFieldsList:r,strategyLabel:o,derivedLabel:a,bee:l}){const i=e.sheetResults||[],u=e.primarySheet||"",d=i.find(P=>P.sheetName===u),h=d?o[d.strategy]||d.strategy:"",g=Object.entries(t).sort(([,P],[,p])=>(P.label||"").localeCompare(p.label||"")).map(([P,p])=>{const c=typeof p.confidence=="number"?`${Math.round(p.confidence*100)}%`:"—",m=p.source==="ml"?"🤖 AI-detected":p.source==="cenpeep_column"?"CenPeep layout":p.source==="derived_fallback"?a:"exact match",v=p.header?`"${p.header}"`:p.label||P;return s.jsxs("tr",{children:[s.jsx("td",{children:p.label||P}),s.jsx("td",{children:v}),s.jsx("td",{children:m}),s.jsx("td",{children:c})]},P)}),f=r.map(P=>P.label||P.id||P);let y;f.length?y=s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsxs("small",{style:{color:"#f87171"},children:["⚠ Not detected — enter manually: ",f.join(", ")]})]}):!l||n?y=s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("small",{style:{color:"#4ade80"},children:"✓ All required fields detected"})]}):y=s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("small",{style:{color:"#94a3b8"},children:"BEE field detection isn't wired up on the server yet — enter values manually below."})]});const k=e.parseTimeMs?` in ${(e.parseTimeMs/1e3).toFixed(1)}s`:"",C=l?n===1?"":"s":"";return s.jsxs(s.Fragment,{children:[l?n?"✓":"ℹ":"✓"," ",s.jsxs("b",{children:[n," field",l?C:"s"]}),' auto-populated from "',e.filename,'" (',e.fileSizeMB||"?"," MB)",k,s.jsx("br",{}),s.jsxs("small",{style:{color:"#94a3b8"},children:["📄 Selected sheet: ",s.jsx("b",{children:u})," (",h,") — out of ",i.length," sheet(s) scanned"]}),g.length>0&&s.jsxs("table",{style:{width:"100%",fontSize:"12px",borderCollapse:"collapse",marginTop:"4px"},children:[s.jsx("thead",{children:s.jsxs("tr",{style:{color:"#94a3b8",textAlign:"left"},children:[s.jsx("th",{children:"Field"}),s.jsx("th",{children:"Detected From"}),s.jsx("th",{children:"Method"}),s.jsx("th",{children:"Confidence"})]})}),s.jsx("tbody",{children:g})]}),y]})}function gh({anchorEl:e,selected:n,availableDates:t,onSelect:r,onClose:o}){const a=new Set(t||[]),l=n?new Date(n+"T00:00:00"):t&&t.length?new Date(t[t.length-1]+"T00:00:00"):new Date,[i,u]=S.useState({y:l.getFullYear(),m:l.getMonth()}),d=S.useRef(null),[h,g]=S.useState({top:0,left:0});S.useLayoutEffect(()=>{const c=e.getBoundingClientRect();g({top:window.scrollY+c.bottom+6,left:window.scrollX+c.left})},[e]),S.useEffect(()=>{const c=v=>{d.current&&!d.current.contains(v.target)&&v.target!==e&&o()},m=setTimeout(()=>document.addEventListener("mousedown",c),0);return()=>{clearTimeout(m),document.removeEventListener("mousedown",c)}},[e,o]);const f=new Date(i.y,i.m,1),y=f.getDay(),k=new Date(i.y,i.m+1,0).getDate(),C=f.toLocaleString("default",{month:"long"}),P=c=>u(({y:m,m:v})=>{let E=v+c,A=m;return E<0&&(E=11,A--),E>11&&(E=0,A++),{y:A,m:E}}),p=[];for(let c=0;c<y;c++)p.push(s.jsx("span",{className:"dp-cell dp-empty"},"e"+c));for(let c=1;c<=k;c++){const m=`${i.y}-${String(i.m+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,v=a.has(m),E=n===m;p.push(s.jsxs("span",{className:"dp-cell"+(v?" dp-has-data":"")+(E?" dp-selected":""),"data-date":m,onClick:()=>{r(m),o()},children:[c,v&&s.jsx("i",{className:"dp-dot"})]},m))}return kp.createPortal(s.jsxs("div",{className:"date-picker-popup",ref:d,style:{top:h.top+"px",left:h.left+"px"},children:[s.jsxs("div",{className:"dp-head",children:[s.jsx("button",{type:"button",className:"dp-nav",onClick:()=>P(-1),children:"‹"}),s.jsxs("span",{className:"dp-month",children:[C," ",i.y]}),s.jsx("button",{type:"button",className:"dp-nav",onClick:()=>P(1),children:"›"})]}),s.jsxs("div",{className:"dp-grid dp-dow",children:[s.jsx("span",{children:"S"}),s.jsx("span",{children:"M"}),s.jsx("span",{children:"T"}),s.jsx("span",{children:"W"}),s.jsx("span",{children:"T"}),s.jsx("span",{children:"F"}),s.jsx("span",{children:"S"})]}),s.jsx("div",{className:"dp-grid",children:p}),s.jsxs("div",{className:"dp-foot",children:[s.jsxs("span",{className:"dp-legend",children:[s.jsx("i",{className:"dp-dot"})," data available"]}),s.jsx("button",{type:"button",className:"dp-clear",onClick:()=>{r(null),o()},children:"Clear"})]})]}),document.body)}const it=(e,n=4)=>typeof e=="number"&&!isNaN(e)?e.toFixed(n):"—",M=e=>it(e,2),xh=(e,n=4)=>typeof e=="number"&&!isNaN(e)&&isFinite(e)?e.toFixed(n):"—",sn=e=>xh(e,2),yh=(e,n=2)=>typeof e=="number"&&!isNaN(e)?(e>=0?"+":"")+e.toFixed(n):"—";function Ye(e){if(!e)return"—";const n=new Date(e+"T00:00:00");return isNaN(n.getTime())?e:n.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}const ht=(e,n)=>parseFloat(e[n])||0;function Cl(e,n,t,r){return(e&&e.datedRows||[]).concat(r||[]).filter(a=>a.date&&(!n||a.date>=n)&&(!t||a.date<=t))}function Li(e,n,t,r=!1){const o=r?Object.values(e&&e.beeOverridesDated||{}).flat():[],a=Cl(e,n,t,o),l={},i={};a.forEach(d=>Object.entries(d.values).forEach(([h,g])=>{l[h]=(l[h]||0)+g,i[h]=(i[h]||0)+1}));const u={};return Object.keys(l).forEach(d=>{u[d]=l[d]/i[d]}),{avg:u,rowCount:Cl(e,n,t).length}}const Vp="cenpeep_lastUpload";function br(e,n){try{sessionStorage.setItem(Vp,JSON.stringify({filename:e.filename,primarySheet:e.primarySheet,sheetNameBS2885:e.sheetNameBS2885,extracted:e.extracted||{},extractedBS2885:e.extractedBS2885||{},extractedIS13890:e.extractedIS13890||{},sheetNameIS13890:e.sheetNameIS13890,sourceTab:n,savedAt:Date.now()}))}catch{}}function jt(e,n){const t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=n,t.click()}function Ei({uploadData:e,processes:n,onAdd:t,onRemove:r,onTitle:o,onDate:a}){const[l,i]=S.useState(null),u=S.useCallback(()=>i(null),[]),d=!!(e&&e.dateFilteringAvailable&&e.availableDates&&e.availableDates.length);let h="Optional — split this file into named date ranges and compare results side by side.";if(d){const f=e.availableDates;h=`Dated data found from ${f[0]} to ${f[f.length-1]} (${f.length} day${f.length===1?"":"s"} with readings) on "${e.primarySheet||""}".`}const g=l?n.find(f=>f.id===l.id):null;return s.jsxs("div",{className:"process-section",id:"process-section",style:{display:d?"":"none"},children:[s.jsxs("div",{className:"process-section-head",children:[s.jsxs("div",{className:"process-section-title",children:[s.jsxs("strong",{children:[s.jsx(Y0,{}),"Date-wise Processes"]}),s.jsx("span",{className:"process-section-sub",id:"process-hint",children:h})]}),s.jsx("button",{type:"button",className:"btn btn-secondary",id:"add-process-btn",onClick:t,children:"+ Add Process"})]}),s.jsx("div",{id:"process-list",children:n.length?n.map(f=>{const y=Cl(e,f.start,f.end).length;return s.jsxs("div",{className:"process-row","data-id":f.id,children:[s.jsx("input",{type:"text",className:"process-title-input",value:f.title,placeholder:"Process title",onChange:k=>o(f.id,k.target.value)}),s.jsx("button",{type:"button",className:"process-date-btn","data-role":"start",onClick:k=>i({id:f.id,role:"start",el:k.currentTarget}),children:f.start||"Start date"}),s.jsx("span",{className:"process-date-sep",children:"→"}),s.jsx("button",{type:"button",className:"process-date-btn","data-role":"end",onClick:k=>i({id:f.id,role:"end",el:k.currentTarget}),children:f.end||"End date"}),s.jsxs("span",{className:"process-row-count",children:[y," row",y===1?"":"s"," in range"]}),s.jsx("button",{type:"button",className:"process-remove-btn",onClick:()=>r(f.id),title:"Remove process",children:"✕"})]},f.id)}):s.jsx("div",{className:"process-empty",children:"No processes added — Calculate will use the whole file's average, same as today."})}),l&&g&&s.jsx(gh,{anchorEl:l.el,selected:g[l.role],availableDates:e&&e.availableDates||[],onSelect:f=>a(l.id,l.role,f),onClose:u})]})}function Ai(){const[e,n]=S.useState([]),[t,r]=S.useState(0);return{processes:e,setProcesses:n,add:()=>{const o=t+1;r(o),n(a=>[...a,{id:"proc"+o,title:`Process ${a.length+1}`,start:null,end:null}])},remove:o=>n(a=>a.filter(l=>l.id!==o)),setTitle:(o,a)=>n(l=>l.map(i=>i.id===o?{...i,title:a}:i)),setDate:(o,a,l)=>n(i=>i.map(u=>u.id===o?{...u,[a]:l}:u))}}function pr({cards:e,open:n,onToggle:t}){return s.jsx("div",{className:"section-cards-grid",children:e.map(r=>s.jsxs("div",{className:"section-card"+(n[r.target]?" open":""),"data-target":r.target,onClick:()=>t(r.target),children:[s.jsx("div",{className:"section-card-icon",children:r.icon}),s.jsxs("div",{className:"section-card-body",children:[s.jsx("div",{className:"section-card-title",children:r.title}),s.jsx("div",{className:"section-card-sub",children:r.sub})]}),s.jsx("span",{className:"section-toggle",children:"▸"})]},r.target))})}function fr({id:e,fields:n,open:t,values:r,derived:o={},onChange:a,detected:l,missing:i}){return s.jsx("div",{className:"input-grid"+(t?"":" is-collapsed"),id:e,children:n.map(u=>{const d=["field-input"];u.formula&&d.push("formula-input"),l.has(u.id)&&d.push("field-detected"),i.has(u.id)&&d.push("field-missing");const h=u.readonly?o[u.id]??"":r[u.id]??"";return s.jsxs("div",{className:"field"+(u.kind?" "+u.kind:""),children:[s.jsxs("div",{className:"field-top",children:[s.jsxs("span",{className:"field-name",children:[u.name,u.tag&&s.jsxs(s.Fragment,{children:[" ",s.jsx("span",{className:u.tag.cls,children:u.tag.text})]})]}),s.jsx("span",{className:"field-sym",children:u.sym})]}),s.jsxs("div",{className:"field-bottom",children:[s.jsx("input",{className:d.join(" "),id:u.id,type:"number",value:h,step:u.step,readOnly:u.readonly,onChange:u.readonly?void 0:g=>a(u.id,g.target.value)}),s.jsx("span",{className:"field-uom",children:u.uom})]})]},u.id)})})}const Hp={cenpeep:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, Design conditions, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, Design conditions, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual/Design inputs."},asme:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual inputs."},bee:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual inputs."}},Ae=({cls:e,label:n,children:t,sub:r,style:o})=>s.jsxs("div",{className:"kpi-card "+e,style:o,children:[s.jsx("div",{className:"kpi-label",children:n}),t,r!==void 0&&s.jsx("div",{className:"kpi-sub",children:r})]}),se=({name:e,sym:n,val:t,uom:r})=>s.jsxs("div",{className:"output-row",children:[s.jsx("span",{className:"out-name",children:e}),s.jsx("span",{className:"out-sym",children:n}),s.jsx("span",{className:"out-val",children:M(t)}),s.jsx("span",{className:"out-uom",children:r})]}),mr=({a:e="Parameter",b:n="Symbol",c:t="Value",d:r="UoM"})=>s.jsxs("div",{className:"output-row header-row",children:[s.jsx("span",{children:e}),s.jsx("span",{style:{textAlign:"right"},children:n}),s.jsx("span",{style:{textAlign:"right"},children:t}),s.jsx("span",{style:{textAlign:"right"},children:r})]}),Lo=({open:e,onClick:n,children:t})=>s.jsxs("div",{className:"output-section-head collapsible-head"+(e?" open":""),onClick:n,children:[s.jsx("span",{children:t}),s.jsx("span",{className:"collapse-chevron",children:e?"▾":"▸"})]});function Ti({p1:e,p2:n,eff1:t,eff2:r,suffix:o=""}){const a=r-t;return s.jsxs("div",{className:"kpi-card "+(a>=0?"kpi-green":"kpi-red"),children:[s.jsx("div",{className:"kpi-label",children:"Delta Difference"}),s.jsxs("div",{className:"kpi-value",children:[yh(a),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[n.title," − ",e.title," (Boiler Eff.",o,")"]})]})}function Oi({list:e,perProcessIds:n,labels:t,open:r,onToggle:o,page:a,thBadge:l,flag:i}){const u=Hp[a];return s.jsxs("div",{className:"output-section",children:[s.jsx(Lo,{open:r,onClick:o,children:"Process Inputs"}),r&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"cmp-table-wrap",children:s.jsxs("table",{className:"cmp-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"From the dated log — varies per process"}),e.map((d,h)=>s.jsxs("th",{children:[d.title,l&&l(d),s.jsxs("div",{className:"cmp-th-date",children:[Ye(d.start)," → ",Ye(d.end)]})]},h))]})}),s.jsx("tbody",{children:n.length?n.map(d=>s.jsxs("tr",{children:[s.jsx("td",{className:"cmp-metric",children:t[d]||d}),e.map((h,g)=>{const f=h.result.inputs.find(y=>y.id===d);return s.jsxs("td",{children:[it(f?f.value:0,3),i&&i(h,d)]},g)})]},d)):s.jsx("tr",{children:s.jsx("td",{colSpan:e.length+1,children:u.noDate})})})]})}),s.jsx("div",{className:"cmp-note",children:u.inputsNote})]})]})}function Fi({list:e,rows:n,open:t,onToggle:r,page:o,thBadge:a}){return s.jsxs("div",{className:"output-section",children:[s.jsx(Lo,{open:t,onClick:r,children:"Process Comparison"}),t&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"cmp-table-wrap",children:s.jsxs("table",{className:"cmp-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{}),e.map((l,i)=>s.jsxs("th",{children:[l.title,a&&a(l)]},i))]})}),s.jsx("tbody",{children:n.map(([l,i])=>s.jsxs("tr",{children:[s.jsx("td",{className:"cmp-metric",children:l}),e.map((u,d)=>s.jsx("td",{children:i(u)},d))]},l))})]})}),s.jsx("div",{className:"cmp-note",children:Hp[o].comparisonNote})]})]})}const Dt=({children:e})=>s.jsxs(s.Fragment,{children:[" ",s.jsx("span",{className:"cmp-badge",children:e})]});function vh(e){const n=ht(e,"O2in"),t=ht(e,"O2out"),r=ht(e,"Md"),o=ht(e,"Ad"),a=ht(e,"VMd"),l=ht(e,"FCd"),i=ht(e,"Sd"),u=l/(1-1.1*o/100-r/100),d=100-u,h=u+.9*(d-14),g=d*(7.35/(d+10)-.013),f=2.1-.012*d,y=(a+l)/(d+u),k=h*y,C=g*y,P=f*y,p=r,c=o,m=100-k-i-C-p-P-c;return{CO2in:(19.3-n).toFixed(2),CO2out:(19.3-t).toFixed(2),Cd:M(k),Hd:M(C),Nd:M(P),Od:M(m),Md2:M(p),Ad2:M(c)}}const jl=["L","Ffw","Fin","Cba","Cfa","Pfa","Pba","M","A","VM","FC","GCV","S","O2in","CO2in","COin","O2out","CO2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa","Tref","Md","Ad","VMd","FCd","Cd","Sd","Hd","Md2","Nd","Od","Ad2","GCVd","Trad","Mwvd"],$p={L:"Unit Load (MW)",Ffw:"Steam Flow (T/hr)",Fin:"Total Coal Flow (T/hr)",Cba:"Unburnt C Bottom Ash (%)",Cfa:"Unburnt C Fly Ash (%)",Pfa:"% Fly Ash",Pba:"% Bottom Ash",M:"Moisture (%)",A:"Ash (%)",VM:"Volatile Matter (%)",FC:"Fixed Carbon (%)",GCV:"GCV (kcal/kg)",S:"Sulfur (%)",O2in:"O2 APH In (%)",CO2in:"CO2 APH In (%)",COin:"CO APH In (ppm)",O2out:"O2 APH Out (%)",CO2out:"CO2 APH Out (%)",COout:"CO APH Out (ppm)",Tgi:"FG Temp APH In (°C)",Tgo:"FG Temp APH Out (°C)",Tpai:"PA Temp In (°C)",Tpao:"PA Temp Out (°C)",Tsai:"SA Temp In (°C)",Tsao:"SA Temp Out (°C)",Fsa:"SA Flow (TPH)",Fpa:"PA Flow (TPH)",Tref:"Ambient Temp (°C)",Md:"Moisture Design (%)",Ad:"Ash Design (%)",VMd:"VM Design (%)",FCd:"FC Design (%)",Cd:"Carbon Design (%)",Sd:"Sulfur Design (%)",Hd:"Hydrogen Design (%)",Md2:"Moisture Design Ultimate (%)",Nd:"Nitrogen Design (%)",Od:"Oxygen Design (%)",Ad2:"Ash Design Ultimate (%)",GCVd:"GCV Design (kcal/kg)",Trad:"Ref Air Temp Design (°C)",Mwvd:"Moisture in Air Design (kg/kg)"},Gn=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function bh(e){const n={...e},t=Gn(n,"O2in"),r=Gn(n,"O2out");n.CO2in=19.3-t,n.CO2out=19.3-r;const o=Gn(n,"Md"),a=Gn(n,"Ad"),l=Gn(n,"VMd"),i=Gn(n,"FCd"),u=Gn(n,"Sd"),d=i/(1-1.1*a/100-o/100),h=100-d,g=d+.9*(h-14),f=h*(7.35/(h+10)-.013),y=2.1-.012*h,k=(l+i)/(h+d);return n.Cd=g*k,n.Hd=f*k,n.Nd=y*k,n.Md2=o,n.Ad2=a,n.Od=100-n.Cd-u-n.Hd-n.Md2-n.Nd-n.Ad2,n}function zt(e){const n=bh(e),t=Mt=>Gn(n,Mt),r=t("M"),o=t("A"),a=t("VM"),l=t("FC"),i=t("GCV"),u=t("S")||.3,d=t("O2in"),h=t("O2out"),g=t("COout");t("COin");const f=t("Tgi"),y=t("Tgo");t("Tpai"),t("Tpao");const k=t("Tsai");t("Tsao"),t("Fsa"),t("Fpa");const C=t("Cba"),P=t("Cfa"),p=t("Pfa")||80,c=t("Pba")||20,m=t("Lrad")||1.09,v=t("Trad")||35,E=30.6,A=.0166,w=g/1e6*100,j=.97*l+.7*(a+.1*o)-r*(.6-.01*r),_=.036*l+.086*(a-.1*o)-.0035*r*r*(1-.02*r),I=2.1-.02*a,K=100-r-o-j-_-u-I,X=k,Y=19.3-d,Z=18.5-h,B=100-(h+Z+w),V=p/100*P+c/100*C,J=o/100*V/(100-V),L=(h-d)/(21-h)*.9*100,D=L*.24*(y-X)/(100*.13286)+y,H=(v*(f-D)+f*(D-X))/(f-X),N=H-v,T=(11.6*j+34.8*(_-K/8)+4.35*u)/100,R=(1+h/(21-h)*100/100)*T,O=(j/100*44/12+I/100+R*77/100+(R-T)*23/100)*.24*N/i*100,z=9*(_/100)*(584+.45*N)/i*100,$=r/100*(584+.45*N)/i*100,de=R*.01765*.45*N/i*100,pe=Z+w>0?w*j/100/(w+Z)*5744/i*100:0,le=(o*c/100*C/(100*(100-C))+o*p/100*P/(100*(100-P)))*8084*100/i,rn=100-(O+z+$+de+pe+m+le),An=(2.66*(j-J*100)+7.937*_+.996*u-K)/23.2,pt=1+(h-w/2)/(.2682*B-(h-w)),kr=An*pt*A,Vn=(j+u/2.67-100*J)/(12*Z),Ue=Vn*E*(y-X),Tn=1.88*(y-25)+2442+4.2*(25-X),Qo=D,ft=t("Cd"),ys=t("Sd"),wr=t("Hd"),Yo=t("Od"),It=t("Ad2"),pn=t("GCVd"),b=t("Mwvd"),W=t("Md2"),G=2415,Q=(Y-Z)*.9*100/Z,ae=(v*(f-y)+f*(y-X))/(f-X),re=(ft+ys/2.67-100*J)/(12*Z)*E*(ae-v)*100/(pn*4.186),_e=Math.exp(.225*ft/wr)-Math.exp(.225*j/_),Hn=t("VMd")<17?.013*(It*i/(o*pn))*_e:0,Ke=le*(It*i/(o*pn))+Hn,fn=1.88*(ae-25)+2442+4.2*(25-v),mt=fn*W/(pn*4.186),vs=9*wr*fn/(pn*4.186),mn=w*7*G*(ft-100*J)/3/(Z+w)/pn,Ko=(2.66*(ft-J*100)+7.937*wr+.996*ys-Yo)/23.2,af=1+(h-w/2)/(.2682*B-(h-w)),Bi=Ko*af*b*1.88*(ae-v)*100/(pn*4.186),lf=100-(re+Ke+mt+vs+mn+Bi+m);return{CO2in:Y,CO2out:Z,COoutp:w,Trai:X,Cash:V,U:J,N2out:B,Sa:An,Ea:pt,Ma:kr,Wd:Vn,Sh:Ue,Sw:Tn,Ldg:O,Luc:le,Lmf:$,Lhf:z,Lco:pe,Lma:de,Lrad:m,BoilerEff:rn,AL:L,Tgnl:Qo,Tgc:H,ALd:Q,Tgcd:ae,Ldgc:re,Lucc:Ke,Lmfc:mt,Lhfc:vs,Lcoc:mn,Lmac:Bi,BoilerEffCorr:lf,inputs:jl.map(Mt=>({id:Mt,label:$p[Mt]||Mt,value:n[Mt]}))}}const Gp=[{target:"grid-general",icon:"GD",title:"General Data",sub:"7 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis — As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters — APH",sub:"15 parameters"},{target:"grid-design-prox",icon:"DP",title:"Design Conditions — Proximate",sub:"4 parameters"},{target:"grid-design-ult",icon:"DU",title:"Design Conditions — Ultimate Analysis",sub:"10 parameters"}],Sl={"grid-general":[{id:"L",name:"Unit Load",sym:"L",uom:"MW",kind:"",value:"210",readonly:!1},{id:"Ffw",name:"Steam Flow",sym:"Ffw",uom:"T/hr",kind:"",value:"615",readonly:!1},{id:"Fin",name:"Total Coal Flow",sym:"Fin",uom:"T/hr",kind:"",value:"140",readonly:!1},{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2in",name:"Avg. Flue Gas O₂ — APH In",sym:"O2in",uom:"%",kind:"",value:"3.5",readonly:!1},{id:"CO2in",name:"Avg. Flue Gas CO₂ — APH In",sym:"CO2in",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COin",name:"Avg. Flue Gas CO — APH In",sym:"COin",uom:"ppm",kind:"field-manual",value:"39",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"O2out",name:"Avg. Flue Gas O₂ — APH Out",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1},{id:"CO2out",name:"Avg. Flue Gas CO₂ — APH Out",sym:"CO2out",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COout",name:"Avg. Flue Gas CO — APH Out",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1},{id:"Tgi",name:"Avg. Flue Gas Temp — APH In",sym:"Tgi",uom:"°C",kind:"",value:"350",readonly:!1},{id:"Tgo",name:"Avg. Flue Gas Temp — APH Out",sym:"Tgo",uom:"°C",kind:"",value:"135",readonly:!1},{id:"Tpai",name:"Primary Air to APH Temp In",sym:"Tpai",uom:"°C",kind:"",value:"40",readonly:!1},{id:"Tpao",name:"Primary Air from APH Temp Out",sym:"Tpao",uom:"°C",kind:"",value:"325",readonly:!1},{id:"Tsai",name:"Secondary Air to APH Temp In",sym:"Tsai",uom:"°C",kind:"",value:"34",readonly:!1},{id:"Tsao",name:"Secondary Air from APH Temp Out",sym:"Tsao",uom:"°C",kind:"",value:"325",readonly:!1},{id:"Fsa",name:"Total Secondary Air Flow",sym:"Fsa",uom:"TPH",kind:"",value:"450",readonly:!1},{id:"Fpa",name:"Total Primary Air Flow",sym:"Fpa",uom:"TPH",kind:"",value:"250",readonly:!1},{id:"Tref",name:"Design Ambient / Ref Air Temp",sym:"Tref",uom:"°C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-prox":[{id:"Md",name:"Moisture — Design",sym:"Md",uom:"%",kind:"field-manual",value:"13",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Ad",name:"Ash — Design",sym:"Ad",uom:"%",kind:"field-manual",value:"40",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"VMd",name:"Volatile Matter — Design",sym:"VMd",uom:"%",kind:"field-manual",value:"24",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"FCd",name:"Fixed Carbon — Design",sym:"FCd",uom:"%",kind:"field-manual",value:"23",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-ult":[{id:"Cd",name:"Carbon — Design",sym:"Cd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Sd",name:"Sulfur — Design",sym:"Sd",uom:"%",kind:"field-manual",value:"0.3",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Hd",name:"Hydrogen — Design",sym:"Hd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Md2",name:"Moisture — Design (Ultimate)",sym:"Md2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Nd",name:"Nitrogen — Design",sym:"Nd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Od",name:"Oxygen — Design",sym:"Od",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Ad2",name:"Ash — Design (Ultimate)",sym:"Ad2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"GCVd",name:"GCV — Design",sym:"GCVd",uom:"kcal/kg",kind:"field-manual",value:"3300",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Trad",name:"Ref. Air Temp — Design",sym:"Trad",uom:"°C",kind:"field-manual",value:"38",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Mwvd",name:"Moisture in Air — Design",sym:"Mwvd",uom:"kg/kg",kind:"field-manual",value:"0.013",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},kh=Gp.slice(0,3),wh=Gp.slice(3),Wp=["grid-general","grid-proximate","grid-plant"],Jp=["grid-design-prox","grid-design-ult"],Pi=[...Wp,...Jp].flatMap(e=>Sl[e]),Ch=Object.fromEntries(Pi.map(e=>[e.id,e.value??""])),jh=new Set(Pi.filter(e=>!e.readonly).map(e=>e.id)),Yu=["M","A","VM","FC","GCV"],Sh={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},Na=[["Date Range",e=>`${Ye(e.start)} → ${Ye(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>M(e.result.BoilerEff)],["Boiler Efficiency Corrected (%)",e=>M(e.result.BoilerEffCorr)],["Dry Gas Loss (%)",e=>M(e.result.Ldg)],["Unburnt Carbon Loss (%)",e=>M(e.result.Luc)],["Moisture Fuel Loss (%)",e=>M(e.result.Lmf)],["Hydrogen Fuel Loss (%)",e=>M(e.result.Lhf)],["CO Loss (%)",e=>it(e.result.Lco)],["Moisture Air Loss (%)",e=>M(e.result.Lma)],["Radiation & Unaccounted Loss (%)",e=>M(e.result.Lrad)],["CO₂ — APH In (%)",e=>M(e.result.CO2in)],["CO₂ — APH Out (%)",e=>M(e.result.CO2out)]],Ku=e=>e.start||e.end||null;function Nh(){const e=yr();S.useEffect(()=>{document.title="Boiler Efficiency Calculator — CENPEEP"},[]);const[n,t]=S.useState("input"),[r,o]=S.useState(Ch),[a,l]=S.useState(new Set),[i,u]=S.useState(new Set),[d,h]=S.useState({}),[g,f]=S.useState(null),[y,k]=S.useState(null),[C,P]=S.useState(null),p=Ai(),[c,m]=S.useState(null),[v,E]=S.useState(null),[A,w]=S.useState(!1),[j,_]=S.useState(null),[I,K]=S.useState(null),[X,Y]=S.useState(!1),[Z,B]=S.useState(!1),[V,J]=S.useState({processInputsOpen:!1,processComparisonOpen:!1}),L=S.useMemo(()=>vh(r),[r]),D=(b,W)=>o(G=>({...G,[b]:W})),H=b=>h(W=>({...W,[b]:!W[b]})),N=(b=j)=>{const W={...r,...L},G={};return jl.forEach(Q=>{G[Q]=W[Q]!==void 0?W[Q]:0}),G.Lrad=b!==null?parseFloat(b)||0:1.2,G},T=(b,W)=>Li(y,b,W),q=async b=>{f({cls:"loading",text:"⏳ Parsing all sheets…"});const W=new FormData;W.append("file",b);try{const Q=await(await Qe("/api/upload",{method:"POST",body:W})).json();if(!Q.ok)throw new Error(Q.error||"Upload failed");br(Q,"CENPEEP");const ae=Q.extracted||{},ye={...r},we=new Set;let re=0;for(const[Ke,fn]of Object.entries(ae))jh.has(Ke)&&(ye[Ke]=String(typeof fn=="number"?parseFloat(fn.toFixed(6)):fn),we.add(Ke),re++);const _e=Q.missingFields||[],Hn=new Set;for(const Ke of _e){const fn=Ke.id||Ke;Pi.some(mt=>mt.id===fn)&&Hn.add(fn)}o(ye),l(we),u(Hn),P(Q.filename),k(Q),p.setProcesses([]),E(null),w(!1),f({cls:"success",node:Ni({data:Q,populated:re,fieldDetail:Q.fieldDetail||{},missingFieldsList:_e,strategyLabel:Up,derivedLabel:"↳ defaulted from Secondary Air",bee:!1})}),e(`Excel imported — ${re} fields auto-populated from "${Q.primarySheet||""}"`,"success")}catch(G){f({cls:"error",text:`✗ ${G.message}`}),e(G.message,"error")}},R=()=>{const b=p.processes.filter(Q=>Q.start||Q.end);if(K(null),Y(!1),B(!1),!b.length){w(!1);const Q=zt(N());m(Q),_(String(Q.Lrad||1.09)),E(null),t("output");return}const W=N(),G=b.map(Q=>{const{avg:ae,rowCount:ye}=T(Q.start,Q.end),we=zt({...W,...ae});return{title:Q.title||"Process",start:Q.start,end:Q.end,rowCount:ye,result:we}});E(G),w(!0),m(G[0].result),_(null),t("output")},x=b=>{if(_(b),!c)return;const W=parseFloat(b)||0,G=c;m({...G,Lrad:W,BoilerEff:100-(G.Ldg+G.Luc+G.Lmf+G.Lhf+G.Lco+G.Lma+W)})},O=()=>{if(!c){e("Calculate first.","error");return}const b=zt(N());m(b),_(String(b.Lrad||1.09)),B(!0),e("APH correction recalculated using the current Design Conditions parameters.","success")},z=()=>{I&&(E(b=>b.map((W,G)=>G===I.targetIdx?{...W,result:W._originalResult,_originalResult:void 0,gcvCorrected:!1}:W)),K(null),e("GCV correction removed.","success"))},$=()=>{const b=v;if(!A||!b||b.length!==2){e("GCV correction needs exactly two active processes.","error");return}if(I){z();return}const[W,G]=b,Q=Ku(W),ae=Ku(G);if(!Q||!ae){e("Both processes need at least one date set to apply GCV correction.","error");return}if(Q===ae){e("Both processes resolve to the same date — cannot tell which is later.","error");return}const ye=ae>Q?1:0,we=ae>Q?0:1,re=b[ye],_e=b[we],Hn=N(),{avg:Ke}=T(_e.start,_e.end),{avg:fn}=T(re.start,re.end),mt={...Hn,...fn};Yu.forEach(mn=>{mt[mn]=Ke[mn]!==void 0?Ke[mn]:Hn[mn]});const vs=b.map((mn,Ko)=>Ko===ye?{...mn,_originalResult:mn.result,result:zt(mt),gcvCorrected:!0}:{...mn,result:zt({...Hn,...Ke})});E(vs),K({targetIdx:ye,sourceIdx:we,targetTitle:re.title,sourceTitle:_e.title}),e(`GCV correction applied — "${re.title}" now uses "${_e.title}"'s Proximate As-Fired data.`,"success")},de=()=>{if(!A||!v||v.length!==2){e("APH correction needs exactly two active processes.","error");return}const b=!X;Y(b),e(b?"APH correction applied — Boiler Efficiency now shows the APH-corrected value for both processes.":"APH correction removed.","success")},pe=()=>{o(b=>{const W={...b};return Object.entries(Sh).forEach(([G,Q])=>{G in W&&(W[G]=String(Q))}),W}),P(null),k(null),p.setProcesses([]),w(!1),K(null),Y(!1),B(!1),J({processInputsOpen:!1,processComparisonOpen:!1}),f(null)},le=async(b,W)=>{const G={sessionName:W,sourceFile:C||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:b.inputs,results:{BoilerEff:b.BoilerEff,BoilerEffCorr:b.BoilerEffCorr,Ldg:b.Ldg,Luc:b.Luc,Lmf:b.Lmf,Lhf:b.Lhf,Lco:b.Lco,Lma:b.Lma,Lrad:b.Lrad,CO2in:b.CO2in,CO2out:b.CO2out,Trai:b.Trai,AL:b.AL,Tgc:b.Tgc,Ldgc:b.Ldgc,Lucc:b.Lucc,Lmfc:b.Lmfc,Lhfc:b.Lhfc,Lcoc:b.Lcoc,Lmac:b.Lmac}},ae=await(await Qe("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(G)})).json();if(!ae.ok)throw new Error(ae.error)},rn=async()=>{if(A&&v&&v.length){if(!window.confirm(`Save all ${v.length} process result(s) to the database?`))return;try{for(const W of v)await le(W.result,`${C||"Manual Entry"} — ${W.title}`);e("✓ All process results saved to MongoDB!","success")}catch(W){e("Save failed: "+W.message,"error")}return}if(!c){e("Calculate first before saving.","error");return}const b=window.prompt("Session name (optional):",C||"");if(b!==null)try{await le(c,b.trim()),e("✓ Session saved to MongoDB!","success")}catch(W){e("Save failed: "+W.message,"error")}},An=()=>new Date().toISOString().slice(0,19).replace("T"," "),pt=()=>{const b=v,W=An();let G=`CENPEEP Boiler Efficiency — Process Comparison
Generated:,${W}

`;G+="Metric,"+b.map(Q=>`"${Q.title}"`).join(",")+`
`,Na.forEach(([Q,ae])=>{G+=`"${Q}",`+b.map(ye=>`"${ae(ye)}"`).join(",")+`
`}),jt(new Blob([G],{type:"text/csv"}),`cenpeep_comparison_${W.replace(/[: ]/g,"_")}.csv`)},kr=()=>{if(A&&v&&v.length){pt();return}if(!c){e("Calculate first.","error");return}const b=c,W=An();let G=`CENPEEP Boiler Efficiency Report
Generated:,${W}

INPUTS
Parameter,Value
`;b.inputs.forEach(Q=>{G+=`"${Q.label}",${Q.value}
`}),G+=`
OUTPUTS
Parameter,Symbol,Value,UoM
`,[["CO₂ APH In","CO2in",b.CO2in,"%"],["CO₂ APH Out","CO2out",b.CO2out,"%"],["Weighted Air Temp In","Trai",b.Trai,"°C"],["Dry Gas Loss","Ldg",b.Ldg,"%"],["Unburnt Carbon Loss","Luc",b.Luc,"%"],["Moisture Fuel Loss","Lmf",b.Lmf,"%"],["Hydrogen Fuel Loss","Lhf",b.Lhf,"%"],["CO Loss","Lco",b.Lco,"%"],["Moisture Air Loss","Lma",b.Lma,"%"],["Radiation Loss","Lrad",b.Lrad,"%"],["Boiler Efficiency","eta",b.BoilerEff,"%"],["Boiler Efficiency Corrected","eta_corr",b.BoilerEffCorr,"%"]].forEach(([Q,ae,ye,we])=>{G+=`"${Q}","${ae}",${typeof ye=="number"?ye.toFixed(4):""},,"${we}"
`}),jt(new Blob([G],{type:"text/csv"}),`cenpeep_report_${W.replace(/[: ]/g,"_")}.csv`)},Vn="body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}.meta{color:#666;font-size:11px;margin-bottom:16px}",Ue=()=>{const b=v,W=new Date().toLocaleString(),G=window.open("","_blank");G.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Comparison Report</title>
  <style>${Vn}</style></head><body>
  <h1>CENPEEP Boiler Efficiency — Process Comparison</h1><p class="meta">Generated: ${W}</p>
  <table><tr><th>Metric</th>${b.map(Q=>`<th>${Q.title}</th>`).join("")}</tr>
  ${Na.map(([Q,ae])=>`<tr><td>${Q}</td>${b.map(ye=>`<td>${ae(ye)}</td>`).join("")}</tr>`).join("")}
  </table><script>window.print();<\/script></body></html>`),G.document.close()},Tn=()=>{if(A&&v&&v.length){Ue();return}if(!c){e("Calculate first.","error");return}const b=c,W=new Date().toLocaleString(),G=window.open("","_blank");G.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Report</title>
  <style>${Vn}h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}.hl{background:#e6fff5!important;font-weight:bold}</style></head><body>
  <h1>CENPEEP Boiler Efficiency Report</h1><p class="meta">Generated: ${W}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${b.inputs.map(Q=>`<tr><td>${Q.label}</td><td>${Q.value}</td></tr>`).join("")}</table>
  <h2>Losses</h2><table><tr><th>Parameter</th><th>Symbol</th><th>Value</th><th>UoM</th></tr>
  <tr><td>CO₂ APH In</td><td>CO₂in</td><td>${M(b.CO2in)}</td><td>%</td></tr>
  <tr><td>CO₂ APH Out</td><td>CO₂out</td><td>${M(b.CO2out)}</td><td>%</td></tr>
  <tr><td>Dry Gas Loss</td><td>Ldg</td><td>${M(b.Ldg)}</td><td>%</td></tr>
  <tr><td>Unburnt Carbon Loss</td><td>Luc</td><td>${M(b.Luc)}</td><td>%</td></tr>
  <tr><td>Moisture Fuel Loss</td><td>Lmf</td><td>${M(b.Lmf)}</td><td>%</td></tr>
  <tr><td>Hydrogen Fuel Loss</td><td>Lhf</td><td>${M(b.Lhf)}</td><td>%</td></tr>
  <tr><td>CO Loss</td><td>Lco</td><td>${it(b.Lco)}</td><td>%</td></tr>
  <tr><td>Moisture Air Loss</td><td>Lma</td><td>${M(b.Lma)}</td><td>%</td></tr>
  <tr><td>Radiation Loss</td><td>Lrad</td><td>${M(b.Lrad)}</td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td><b>${M(b.BoilerEff)}</b></td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency Corrected</b></td><td>η_corr</td><td><b>${M(b.BoilerEffCorr)}</b></td><td>%</td></tr>
  </table><script>window.print();<\/script></body></html>`),G.document.close()},Qo=async()=>{const b=y;if(!b||!b.fieldDetail||!Object.keys(b.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}const W={filename:b.filename,primarySheet:b.primarySheet,fieldDetail:b.fieldDetail,extracted:b.extracted,missingFields:b.missingFields};A&&v&&v.length&&(W.processes=v.map(G=>{const{avg:Q,rowCount:ae}=T(G.start,G.end);return{title:G.title,start:G.start,end:G.end,rowCount:ae,avg:Q}}));try{const G=await Qe("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(W)});if(!G.ok){const we=await G.json().catch(()=>({}));throw new Error(we.error||`Report generation failed (${G.status})`)}const Q=await G.blob(),ye=(G.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt(Q,ye?ye[1]:"CENPEEP_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(G){e("Report failed: "+G.message,"error")}},ft=b=>J(W=>({...W,[b]:!W[b]})),ys=b=>s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),s.jsxs("div",{className:"kpi-value boiler-eff-val",children:[M(b.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Indirect method — as-tested"})]}),s.jsxs("div",{className:"kpi-card kpi-blue",children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency Corrected"}),s.jsxs("div",{className:"kpi-value boiler-eff-corr-val",children:[M(b.BoilerEffCorr),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Corrected to design conditions"}),Z&&s.jsx("div",{className:"kpi-note",children:"Please check the input parameters if you feel any issue in the corrected efficiency figure."})]}),s.jsx(Ae,{cls:"kpi-red",label:"Dry Gas Loss",children:s.jsxs("div",{className:"kpi-value",children:[M(b.Ldg),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-amber",label:"Loss — Unburnt Carbon",children:s.jsxs("div",{className:"kpi-value",children:[M(b.Luc),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-blue",label:"Loss — Moisture in Fuel",children:s.jsxs("div",{className:"kpi-value",children:[M(b.Lmf),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-green",label:"Loss — Hydrogen in Fuel",children:s.jsxs("div",{className:"kpi-value",children:[M(b.Lhf),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-amber",label:"Loss — Carbon Monoxide",children:s.jsxs("div",{className:"kpi-value",children:[it(b.Lco),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-blue",label:"Loss — Moisture in Air",children:s.jsxs("div",{className:"kpi-value",children:[M(b.Lma),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsxs("div",{className:"kpi-card kpi-red",style:{gridColumn:"span 2"},children:[s.jsx("div",{className:"kpi-label",children:"Radiation & Unaccounted Loss"}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[s.jsx("input",{type:"number",id:"Lrad",value:j??"",onChange:W=>x(W.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),s.jsx("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),s.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(Z?" applied":""),onClick:O,children:[s.jsxs("div",{className:"kpi-label",children:["APH Correction",Z&&s.jsx(Dt,{children:"Applied"})]}),s.jsx("div",{className:"kpi-value kpi-action-value",children:Z?"Recalculate Again":"Apply APH Correction"}),s.jsx("div",{className:"kpi-sub",children:"Uses the Design Conditions (APH Correction) tab"})]})]}),wr=b=>s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Corrected Losses"})}),s.jsx(mr,{}),s.jsx(se,{name:"Dry Gas Loss (Corrected)",sym:"Ldgc",val:b.Ldgc,uom:"%"}),s.jsx(se,{name:"Unburnt Carbon Loss (Corrected)",sym:"Lucc",val:b.Lucc,uom:"%"}),s.jsx(se,{name:"Moisture Fuel Loss (Corrected)",sym:"Lmfc",val:b.Lmfc,uom:"%"}),s.jsx(se,{name:"Hydrogen Fuel Loss (Corrected)",sym:"Lhfc",val:b.Lhfc,uom:"%"}),s.jsx(se,{name:"CO Loss (Corrected)",sym:"Lcoc",val:b.Lcoc,uom:"%"}),s.jsx(se,{name:"Moisture Air Loss (Corrected)",sym:"Lmac",val:b.Lmac,uom:"%"}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Boiler Efficiency — Corrected"}),s.jsxs("span",{className:"out-sym",children:["η",s.jsx("sub",{children:"corr"})]}),s.jsx("span",{className:"out-val",children:M(b.BoilerEffCorr)}),s.jsx("span",{className:"out-uom",children:"%"})]})]}),s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Intermediate Values"})}),s.jsx(mr,{}),s.jsx(se,{name:"CO₂ — APH In",sym:"CO₂in",val:b.CO2in,uom:"%"}),s.jsx(se,{name:"CO₂ — APH Out",sym:"CO₂out",val:b.CO2out,uom:"%"}),s.jsx(se,{name:"Weighted Air Temp In",sym:"Trai",val:b.Trai,uom:"°C"}),s.jsx(se,{name:"AH Leakage",sym:"AL",val:b.AL,uom:"%"}),s.jsx(se,{name:"Gas Temp — Corrected",sym:"Tgc",val:b.Tgc,uom:"°C"}),s.jsx(se,{name:"Stoichiometric Air",sym:"Sa",val:b.Sa,uom:"kg/kg"}),s.jsx(se,{name:"Excess Air",sym:"Ea",val:b.Ea,uom:"—"})]})]}),Yo=b=>{const W=X,G=re=>W?re.result.BoilerEffCorr:re.result.BoilerEff,Q=re=>re.gcvCorrected?s.jsx(Dt,{children:"GCV corrected"}):null,ae=new Set;b.forEach(re=>Object.keys(T(re.start,re.end).avg).forEach(_e=>ae.add(_e)));const ye=jl.filter(re=>ae.has(re)),we=I;return{kpis:s.jsxs(s.Fragment,{children:[b.map((re,_e)=>s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsxs("div",{className:"kpi-label",children:[re.title,re.gcvCorrected&&s.jsx(Dt,{children:"GCV corrected"}),W&&s.jsx(Dt,{children:"APH corrected"})]}),s.jsxs("div",{className:"kpi-value",children:[M(G(re)),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[Ye(re.start)," → ",Ye(re.end)," · ",re.rowCount," row",re.rowCount===1?"":"s"]})]},_e)),b.length===2&&s.jsxs(s.Fragment,{children:[s.jsx(Ti,{p1:b[0],p2:b[1],eff1:G(b[0]),eff2:G(b[1]),suffix:W?" APH corr.":""}),s.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(we?" applied":""),onClick:$,children:[s.jsxs("div",{className:"kpi-label",children:["GCV Correction",we&&s.jsx(Dt,{children:"Applied"})]}),s.jsx("div",{className:"kpi-value kpi-action-value",children:we?"Click to undo":"Apply GCV Correction"})]}),s.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(W?" applied":""),onClick:de,children:[s.jsxs("div",{className:"kpi-label",children:["APH Correction",W&&s.jsx(Dt,{children:"Applied"})]}),s.jsx("div",{className:"kpi-value kpi-action-value",children:W?"Click to undo":"Apply APH Correction"}),s.jsx("div",{className:"kpi-sub"})]})]})]}),tables:s.jsxs(s.Fragment,{children:[s.jsx(Oi,{list:b,perProcessIds:ye,labels:$p,page:"cenpeep",open:V.processInputsOpen,onToggle:()=>A&&ft("processInputsOpen"),thBadge:Q,flag:(re,_e)=>we&&b.indexOf(re)===we.targetIdx&&Yu.includes(_e)?s.jsxs(s.Fragment,{children:[" ",s.jsx("small",{style:{color:"var(--accent2)"},title:`From "${we.sourceTitle}"`,children:"↺"})]}):null}),s.jsx(Fi,{list:b,rows:Na,page:"cenpeep",open:V.processComparisonOpen,onToggle:()=>A&&ft("processComparisonOpen"),thBadge:Q})]})}};let It=null,pn=null;if(v){const b=Yo(v);It=b.kpis,pn=b.tables}else c&&j!==null&&(It=ys(c),pn=wr(c));return s.jsxs("div",{className:"container",children:[s.jsx(Ft,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"CENPEEP Formula"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(vr,{description:"Upload your CENPEEP standard sheet — all input fields will be auto-populated.",onFile:q,status:g}),s.jsx(Ei,{uploadData:y,processes:p.processes,onAdd:p.add,onRemove:p.remove,onTitle:p.setTitle,onDate:p.setDate}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:R,children:[s.jsx(gs,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:pe,children:[s.jsx(xs,{}),"Reset to Defaults"]})]}),s.jsx(pr,{cards:kh,open:d,onToggle:H}),Wp.map(b=>s.jsx(fr,{id:b,fields:Sl[b],open:!!d[b],values:r,derived:L,onChange:D,detected:a,missing:i},b))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:It}),s.jsxs("div",{className:"design-conditions-block",children:[s.jsxs("div",{className:"section-header",children:[s.jsx("div",{className:"section-label",children:"Design Conditions — for APH Correction"}),s.jsx("div",{className:"section-line"})]}),s.jsx(pr,{cards:wh,open:d,onToggle:H}),Jp.map(b=>s.jsx(fr,{id:b,fields:Sl[b],open:!!d[b],values:r,derived:L,onChange:D,detected:a,missing:i},b))]}),s.jsx("div",{id:"output-tables",children:pn}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:rn,children:[s.jsx(Pp,{}),"Save to Database"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:kr,children:[s.jsx(No,{}),"Download CSV"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:Tn,children:[s.jsx(No,{}),"Download PDF"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:Qo,children:[s.jsx(Wo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function Lh(){return s.jsx(Pt,{active:"/calculator",children:s.jsx(Nh,{})})}const ne=(e,n)=>n===0||!isFinite(n)?0:e/n,Jo=[{id:"bs203",row:4,item:203},{id:"bs206",row:7,item:206},{id:"bs211",row:14,item:211},{id:"bs215",row:18,item:215},{id:"bs216",row:19,item:216},{id:"bs217",row:21,item:217},{id:"bs220",row:24,item:220},{id:"bs221",row:26,item:221},{id:"bs224",row:29,item:224},{id:"bs225",row:31,item:225},{id:"bs228",row:34,item:228},{id:"bs246",row:58,item:246},{id:"bs247",row:60,item:247},{id:"bs250",row:63,item:250},{id:"bs251",row:65,item:251},{id:"bs254",row:68,item:254},{id:"bs255",row:70,item:255},{id:"bs258",row:73,item:258},{id:"bs259",row:75,item:259},{id:"bs262",row:78,item:262},{id:"bs271",row:93,item:271},{id:"bs272",row:94,item:272},{id:"bs273",row:95,item:273},{id:"bs274",row:96,item:274},{id:"bs275",row:97,item:275},{id:"bs276",row:98,item:276},{id:"bs278",row:102,item:278},{id:"bs279",row:103,item:279},{id:"bs280",row:105,item:280},{id:"bs291",row:119,item:291},{id:"bs295",row:124,item:295},{id:"bs301",row:131,item:301},{id:"bs323",row:162,item:323},{id:"bs325",row:165,item:325},{id:"bs326",row:166,item:326},{id:"bs328",row:169,item:328},{id:"bs329",row:170,item:329},{id:"bs332",row:176,item:332},{id:"bs333",row:177,item:333},{id:"bs334",row:178,item:334},{id:"bs335",row:179,item:335},{id:"bs336",row:180,item:336},{id:"bs343",row:186,item:343},{id:"bs344",row:188,item:344},{id:"bs345",row:189,item:345},{id:"bs349",row:194,item:349},{id:"bs350",row:195,item:350},{id:"bs352",row:198,item:352},{id:"bs357",row:204,item:357},{id:"bs360",row:207,item:360},{id:"bs362",row:211,item:362},{id:"bs363",row:212,item:363},{id:"bs390",row:248,item:390},{id:"bs391",row:249,item:391},{id:"bs392",row:250,item:392},{id:"bs393",row:251,item:393},{id:"bs397",row:257,item:397},{id:"bs398",row:258,item:398},{id:"bs399",row:259,item:399},{id:"bs427",row:304,item:427},{id:"bs450",row:333,item:450},{id:"bs451",row:334,item:451},{id:"bs453",row:336,item:453},{id:"bs454",row:337,item:454},{id:"bs460",row:345,item:460},{id:"bs461",row:346,item:461},{id:"bs463",row:348,item:463},{id:"bs464",row:349,item:464},{id:"bs466",row:352,item:466},{id:"bs467",row:353,item:467},{id:"bs469",row:355,item:469},{id:"bs470",row:356,item:470},{id:"bs472",row:359,item:472},{id:"bs473",row:360,item:473},{id:"bs475",row:364,item:475},{id:"bs476",row:365,item:476},{id:"bs477",row:367,item:477},{id:"bs478",row:368,item:478},{id:"bs479",row:370,item:479},{id:"bs480",row:371,item:480},{id:"bs519",row:417,item:519},{id:"bs601",row:426,item:601},{id:"bs701",row:467,item:701},{id:"bs702",row:468,item:702},{id:"bs704",row:470,item:704},{id:"bs705",row:471,item:705},{id:"bs708",row:475,item:708},{id:"bs807",row:486,item:807},{id:"bs907",row:517,item:907},{id:"bs909",row:521,item:909},{id:"bs910",row:523,item:910}],Xu=Jo.map(e=>e.id);Object.fromEntries(Jo.map(e=>[e.id,e.row]));Object.fromEntries(Jo.map(e=>[e.row,e.id]));const La={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3};function Qp(e){const n={};for(const{id:x,row:O}of Jo)n[O]=e[x]||0;n[99]=100-(n[93]+n[94]+n[95]+n[96]+n[97]+n[98]),n[100]=n[93]+n[94]+n[95]+n[96]+n[97]+n[98]+n[99],n[181]=100-(n[176]+n[177]+n[178]+n[179]+n[180]),n[182]=n[176]+n[177]+n[178]+n[179]+n[180]+n[181],n[167]=100-(n[165]+n[166]),n[133]=n[119]-n[124]*(n[130]||0)/n[102],n[400]=n[4]*n[7],n[401]=n[21]*n[24],n[402]=n[19]*n[14],n[403]=n[18]*n[14],n[404]=(n[4]+n[21]-(n[19]+n[18]))*n[58],n[405]=n[404]+n[403]+n[402]-n[401]-n[400],n[406]=n[60]*n[63],n[407]=n[26]*n[29],n[408]=n[65]*n[68],n[409]=n[408]-(n[407]+n[406]),n[410]=n[70]*n[73],n[411]=n[31]*n[34],n[412]=n[75]*n[78],n[413]=n[412]-(n[411]+n[410]),n[414]=n[405]+n[409]+n[413],n[415]=n[194]*n[186]*(n[198]-n[195])+n[207],n[416]=n[414]-n[415],n[419]=n[105]*n[102],n[420]=n[133]*(n[102]+n[162]),n[421]=n[194]*n[188],n[422]=n[212]>0?n[212]*n[250]:n[211]>0?n[211]*n[248]:0,n[424]=n[419]+n[420]+n[421]+n[422],n[428]=n[334],n[429]=n[333]/100,n[430]=n[426]*n[428]*n[429]/100,n[431]=n[430]*100/n[102],n[433]=n[346],n[434]=n[345]/100,n[435]=n[426]*n[433]*n[434]/100,n[436]=n[435]*100/n[102],n[438]=n[353],n[439]=n[352]/100,n[440]=n[426]*n[438]*n[439]/100,n[441]=n[440]*100/n[102],n[443]=n[360],n[444]=n[359]/100,n[445]=n[426]*n[443]*n[444]/100,n[446]=n[445]*100/n[102],n[448]=n[170],n[449]=ne(n[169],n[133]),n[450]=n[426]*n[448]*n[449]/100,n[451]=n[450]*100/n[102],n[453]=n[430]+n[435]+n[440]+n[445]+n[450],n[454]=n[431]+n[436]+n[441]+n[446]+n[451],n[456]=n[429]*(100-n[428])/100,n[457]=n[434]*(100-n[433])/100,n[458]=n[439]*(100-n[438])/100,n[459]=n[444]*(100-n[443])/100,n[460]=n[449]*(100-n[448])/100,n[461]=n[94]/100-(n[456]+n[457]+n[458]+n[459]+n[460]),n[463]=n[429]*n[337]*(n[336]-n[258]),n[464]=n[434]*n[349]*(n[348]-n[258])+n[439]*n[356]*(n[355]-n[258]),n[465]=n[463]+n[464],n[469]=n[467]*n[468],n[472]=n[470]*n[471],n[473]=n[469]+n[472],n[476]=n[475]*30.6*(n[304]-n[258]),n[478]=n[93]/100,n[479]=9/100*n[96],n[480]=n[478]+n[479],n[481]=1.88*(n[304]-25)+2442+4.2*(25-n[258]),n[482]=n[480]*n[481],n[484]=n[482]-(n[102]-n[103]),n[487]=n[257],n[488]=n[259],n[489]=n[486]*n[488]*1.88*(n[304]-n[258]);const t=(n[105]>0?n[105]*n[103]:0)+(n[119]>0?(n[119]-n[124]*n[131]/n[103])*(n[103]+n[162]):0)+(n[194]>0?n[194]*n[189]:0)+(n[212]>0?n[212]*n[251]:n[211]>0?n[211]*n[249]:0),r=n[105]>0||n[119]>0||n[194]>0||n[211]>0||n[212]>0;n.item901_gross=ne((n[416]-n[417])*100,n[424]),n.item901_net=r?ne((n[416]-n[417])*100,t):0;const o=ne(n[430]*100,n[102]),a=ne(n[430]*100,n[103]),l=ne(n[435]*100,n[102]),i=ne(n[435]*100,n[103]),u=ne(n[440]*100,n[102]),d=ne(n[440]*100,n[103]),h=ne(n[445]*100,n[102]),g=ne(n[445]*100,n[103]),f=ne(n[450]*100,n[102]),y=ne(n[450]*100,n[103]),k=ne(n[465]*100,n[102]),C=ne(n[465]*100,n[103]),P=o+l+u+h+f+k,p=a+i+d+g+y+C,c=ne(n[473]*100,n[102]),m=ne(n[473]*100,n[103]),v=ne(n[476]*100,n[102]),E=ne(n[476]*100,n[103]),A=ne(n[482]*100,n[102]),w=ne(n[482]*100,n[103]),j=ne(n[484]*100,n[102]),_=ne(n[484]*100,n[103]),I=ne(ne(n[204]*n[481]*100,n[194]),n[188]),K=ne(ne(n[204]*n[481]*100,n[194]),n[189]),X=c+v+A+j+I,Y=m+E+w+_+K,Z=n[119]>0?(n[119]-n[124]*n[131]/n[103])*(n[103]+n[162]):n[105]*n[103],B=ne(((n[365]-n[368])*(100-n[364]+539.1+.5*(n[304]-100))+n[368]*(n[367]-n[364]))*418.7,Z),V=ne(n[371]*(100-n[370]+539.1+.5*(n[304]-100))*418.7,Z),J=B+V,L=n[420]!==0?n[420]:n[419],D=ne(((n[365]-n[368])*(100-n[364]+539.1+.5*(n[304]-100))+n[368]*(n[367]-n[364]))*418.7,L),H=ne(n[371]*(100-n[370]+539.1+.5*(n[304]-100))*418.7,L),N=D+H,T=ne(n[489]*100,n[102]),q=ne(n[489]*100,n[103]),R=n[517];return n.item902_gross=100-(P+X+N+T+R+n[521]+n[523]),n.item902_net=100-(p+Y+J+q+R+n[521]+n[523]),n.item908_gross=100-(n.item901_gross+P+X+N+T),n.item908_net=100-(n.item901_net+p+Y+J+q),{F:n,methodA:{gross:n.item901_gross,net:n.item901_net},methodB:{gross:n.item902_gross,net:n.item902_net},balanceA:{gross:n.item908_gross,net:n.item908_net},losses:{residue:{total:{gross:P,net:p},a:{label:"Combustible in bottom ash",gross:o,net:a},b:{label:"Combustible in coarse dust",gross:l,net:i},c:{label:"Combustible in fine dust",gross:u,net:d},d:{label:"Combustible in riddlings",gross:h,net:g},e:{label:"Combustible, dryer ash",gross:f,net:y},f:{label:"Sensible heat of solid residue",gross:k,net:C}},flueGas:{total:{gross:X,net:Y},a:{label:"Unburnt gas (CO + hydrocarbons)",gross:c,net:m},b:{label:"Sensible heat in dry flue gas",gross:v,net:E},c:{label:"Moisture in fuel",gross:A,net:w},d:{label:"Sensible heat in water vapour",gross:j,net:_},e:{label:"Heat in atomizing air/steam",gross:I,net:K}},waterHopper:{total:{gross:N,net:J},a:{label:"Water-filled ash hopper / slag tank",gross:D,net:B},b:{label:"Ash quenching spray",gross:H,net:V}},moistureAir:{label:"Moisture in combustion air",gross:T,net:q},fuelHeating:{label:"Heating fuel up to air supply temp.",value:R},radiation:{label:"Radiation & convection (Method B)",value:n[521]},auxPower:{label:"Auxiliary power, heat equivalent (Method B)",value:n[523]}},ultimate:{solidOxygenByDiff:n[99],solidCheckTotal:n[100],oilOxygenNitrogenByDiff:n[181],oilCheckTotal:n[182]}}}const Eh=[{target:"grid-water",icon:"WS",title:"Feedwater & Steam",sub:"20 parameters"},{target:"grid-solid",icon:"SF",title:"Solid Fuel — Ultimate Analysis & Firing",sub:"17 parameters"},{target:"grid-oil",icon:"OF",title:"Oil Fuel — Analysis & Firing",sub:"13 parameters"},{target:"grid-gas",icon:"GF",title:"Gaseous Fuel — Firing & CV",sub:"6 parameters"},{target:"grid-air",icon:"AA",title:"Air & Ambient Conditions",sub:"4 parameters"},{target:"grid-residue",icon:"SR",title:"Solid Residue — Ash, Dust & Riddlings",sub:"14 parameters"},{target:"grid-hopper",icon:"WH",title:"Water-Filled Ash Hopper / Quenching",sub:"6 parameters"},{target:"grid-extras",icon:"HB",title:"Heat Balance & Method B Extras",sub:"11 parameters"}],Ii={"grid-water":[{id:"bs203",name:"Feedwater Quantity",sym:"Item 203",uom:"kg/s",kind:"",value:"45",readonly:!1,step:"any"},{id:"bs206",name:"Feedwater Enthalpy",sym:"Item 206",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs211",name:"Drum Water Enthalpy",sym:"Item 211",uom:"kJ/kg",kind:"",value:"1650",readonly:!1,step:"any"},{id:"bs215",name:"Drum Level — Rate of Increase",sym:"Item 215",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs216",name:"Blow-down Rate",sym:"Item 216",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs217",name:"Main Steam Spray Water Quantity",sym:"Item 217",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs220",name:"Main Steam Spray Water Enthalpy",sym:"Item 220",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs221",name:"Reheater-1 Spray Water Quantity",sym:"Item 221",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs224",name:"Reheater-1 Spray Water Enthalpy",sym:"Item 224",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs225",name:"Reheater-2 Spray Water Quantity",sym:"Item 225",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs228",name:"Reheater-2 Spray Water Enthalpy",sym:"Item 228",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs246",name:"Steam Leaving Unit — Enthalpy",sym:"Item 246",uom:"kJ/kg",kind:"",value:"3400",readonly:!1,step:"any"},{id:"bs247",name:"Reheater-1 Inlet Steam Quantity",sym:"Item 247",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs250",name:"Reheater-1 Inlet Steam Enthalpy",sym:"Item 250",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs251",name:"Reheater-1 Outlet Steam Quantity",sym:"Item 251",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs254",name:"Reheater-1 Outlet Steam Enthalpy",sym:"Item 254",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs255",name:"Reheater-2 Inlet Steam Quantity",sym:"Item 255",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs258",name:"Reheater-2 Inlet Steam Enthalpy",sym:"Item 258",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs259",name:"Reheater-2 Outlet Steam Quantity",sym:"Item 259",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs262",name:"Reheater-2 Outlet Steam Enthalpy",sym:"Item 262",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-solid":[{id:"bs271",name:"Moisture (Ultimate, As Fired)",sym:"Item 271",uom:"%",kind:"",value:"12",readonly:!1,step:"any"},{id:"bs272",name:"Ash (Ultimate, As Fired)",sym:"Item 272",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs273",name:"Carbon (Ultimate, As Fired)",sym:"Item 273",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs274",name:"Hydrogen (Ultimate, As Fired)",sym:"Item 274",uom:"%",kind:"",value:"2.5",readonly:!1,step:"any"},{id:"bs275",name:"Nitrogen (Ultimate, As Fired)",sym:"Item 275",uom:"%",kind:"",value:"1.0",readonly:!1,step:"any"},{id:"bs276",name:"Sulphur (Ultimate, As Fired)",sym:"Item 276",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs278",name:"GCV of Coal — Gross",sym:"Item 278",uom:"kJ/kg",kind:"",value:"13900",readonly:!1,step:"any"},{id:"bs279",name:"GCV of Coal — Net",sym:"Item 279",uom:"kJ/kg",kind:"",value:"13300",readonly:!1,step:"any"},{id:"bs280",name:"Mechanical Stoker Firing Rate",sym:"Item 280",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs291",name:"Pulverized Fuel — Total Weighed",sym:"Item 291",uom:"kg/s",kind:"",value:"9.2",readonly:!1,step:"any"},{id:"bs295",name:"Pulverized Fuel — Mill Rejects (Total)",sym:"Item 295",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs301",name:"Calorific Value of Mill Rejects — Gross",sym:"Item 301",uom:"kJ/kg",kind:"",value:"2000",readonly:!1,step:"any"},{id:"bs323",name:"Heat Expended in Drying Fuel",sym:"Item 323",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs325",name:"Dryer Gas Analysis — CO2",sym:"Item 325",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs326",name:"Dryer Gas Analysis — CO",sym:"Item 326",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs328",name:"Ashpit Refuse Quantity",sym:"Item 328",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs329",name:"Ashpit Refuse — % Combustible",sym:"Item 329",uom:"%",kind:"",value:"5",readonly:!1,step:"any"}],"grid-oil":[{id:"bs332",name:"Moisture (Oil, Ultimate)",sym:"Item 332",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs333",name:"Ash (Oil, Ultimate)",sym:"Item 333",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs334",name:"Carbon (Oil, Ultimate)",sym:"Item 334",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs335",name:"Hydrogen (Oil, Ultimate)",sym:"Item 335",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs336",name:"Sulphur (Oil, Ultimate)",sym:"Item 336",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs343",name:"Specific Heat of Oil",sym:"Item 343",uom:"kJ/(kg·K)",kind:"",value:"2.1",readonly:!1,step:"any"},{id:"bs344",name:"GCV of Oil — Gross",sym:"Item 344",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs345",name:"GCV of Oil — Net",sym:"Item 345",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs349",name:"Oil Firing Rate",sym:"Item 349",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs350",name:"Temperature of Oil as Weighed",sym:"Item 350",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs352",name:"Temperature of Oil Delivered to Burner",sym:"Item 352",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs357",name:"Atomizing Air/Steam Quantity",sym:"Item 357",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs360",name:"Heat Used in Atomizing Oil",sym:"Item 360",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"}],"grid-gas":[{id:"bs362",name:"Gas Firing Rate — Volume",sym:"Item 362",uom:"m³/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs363",name:"Gas Firing Rate — Mass",sym:"Item 363",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs390",name:"GCV of Gas — Gross (Volume basis)",sym:"Item 390",uom:"kJ/m³",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs391",name:"GCV of Gas — Net (Volume basis)",sym:"Item 391",uom:"kJ/m³",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs392",name:"GCV of Gas — Gross (Mass basis)",sym:"Item 392",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs393",name:"GCV of Gas — Net (Mass basis)",sym:"Item 393",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-air":[{id:"bs397",name:"Ambient Air Humidity",sym:"Item 397",uom:"%",kind:"",value:"60",readonly:!1,step:"any"},{id:"bs398",name:"Temperature at Entry to Air Intakes",sym:"Item 398",uom:"°C",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs399",name:"Moisture per Unit Mass of Dry Air",sym:"Item 399",uom:"kg/kg",kind:"",value:"0.018",readonly:!1,step:"any"},{id:"bs427",name:"Flue Gas Exit Temperature (LTAH/Economizer Outlet)",sym:"Item 427",uom:"°C",kind:"",value:"135",readonly:!1,step:"any"}],"grid-residue":[{id:"bs450",name:"Bottom Ash — Proportion of Fuel (Dry Basis)",sym:"Item 450",uom:"%",kind:"",value:"8",readonly:!1,step:"any"},{id:"bs451",name:"Bottom Ash — Combustible Content",sym:"Item 451",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs453",name:"Bottom Ash — Temperature as Discharged",sym:"Item 453",uom:"°C",kind:"",value:"200",readonly:!1,step:"any"},{id:"bs454",name:"Bottom Ash — Specific Heat",sym:"Item 454",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs460",name:"Coarse Dust — Proportion of Fuel (Dry Basis)",sym:"Item 460",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs461",name:"Coarse Dust — Combustible Content",sym:"Item 461",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs463",name:"Coarse Dust — Temperature as Discharged",sym:"Item 463",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs464",name:"Coarse Dust — Specific Heat",sym:"Item 464",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs466",name:"Fine Dust (Fly Ash) — Proportion of Fuel (Dry Basis)",sym:"Item 466",uom:"%",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs467",name:"Fine Dust (Fly Ash) — Combustible Content",sym:"Item 467",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs469",name:"Fine Dust (Fly Ash) — Temperature as Discharged",sym:"Item 469",uom:"°C",kind:"",value:"135",readonly:!1,step:"any"},{id:"bs470",name:"Fine Dust (Fly Ash) — Specific Heat",sym:"Item 470",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs472",name:"Riddlings — Proportion of Fuel (Dry Basis)",sym:"Item 472",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs473",name:"Riddlings — Combustible Content",sym:"Item 473",uom:"%",kind:"",value:"0",readonly:!1,step:"any"}],"grid-hopper":[{id:"bs475",name:"Hopper Water Inlet Temperature",sym:"Item 475",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs476",name:"Hopper Water Inlet Quantity",sym:"Item 476",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs477",name:"Hopper Water Outlet Temperature",sym:"Item 477",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs478",name:"Hopper Water Outlet Quantity",sym:"Item 478",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs479",name:"Quenching Spray Water Temperature",sym:"Item 479",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs480",name:"Quenching Spray Water Quantity",sym:"Item 480",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"}],"grid-extras":[{id:"bs519",name:"Heat Added from Separate External Air Source",sym:"Item 519",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs601",name:"Calorific Value of Carbon",sym:"Item 601",uom:"kJ/kg",kind:"",value:"33820",readonly:!1,step:"any"},{id:"bs701",name:"CO in Flue Gases per Unit Mass of Fuel",sym:"Item 701",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs702",name:"Calorific Value of CO",sym:"Item 702",uom:"kJ/kg",kind:"",value:"10120",readonly:!1,step:"any"},{id:"bs704",name:"Hydrocarbons in Flue Gases per Unit Mass of Fuel",sym:"Item 704",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs705",name:"Calorific Value of Hydrocarbons",sym:"Item 705",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs708",name:"Dry Flue Gases per Unit Mass of Fuel",sym:"Item 708",uom:"kg mol/kg",kind:"",value:"0.35",readonly:!1,step:"any"},{id:"bs807",name:"Combustion Air per Unit Mass of Fuel",sym:"Item 807",uom:"kg/kg",kind:"",value:"10.2",readonly:!1,step:"any"},{id:"bs907",name:"Loss in Heating Fuel up to Air Supply Temp",sym:"Item 907",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs909",name:"Radiation & Convection Loss (Method B)",sym:"Item 909",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs910",name:"Heat Equivalent of Auxiliary Power (Method B)",sym:"Item 910",uom:"%",kind:"",value:"0.3",readonly:!1,step:"any"}]},Yp=Object.keys(Ii),Kp=Yp.flatMap(e=>Ii[e]),Ah=Object.fromEntries(Kp.map(e=>[e.id,e.value??""])),Zu=new Set(Kp.map(e=>e.id)),Nl=(e,n,t)=>s.jsxs("tr",{children:[s.jsx("td",{children:e}),s.jsxs("td",{children:[sn(n)," %"]}),s.jsxs("td",{children:[sn(t)," %"]})]},e);function Ea({title:e,group:n}){return s.jsxs("div",{className:"output-table-wrap",children:[s.jsxs("h3",{children:[e," — Total: ",sn(n.total.gross)," % (gross) / ",sn(n.total.net)," % (net)"]}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Loss"}),s.jsx("th",{children:"Gross CV basis"}),s.jsx("th",{children:"Net CV basis"})]})}),s.jsx("tbody",{children:Object.keys(n).filter(t=>t!=="total").map(t=>Nl(n[t].label,n[t].gross,n[t].net))})]})]})}const Bs=({label:e,value:n,cls:t})=>s.jsxs("div",{className:"kpi-card "+t,children:[s.jsx("div",{className:"kpi-label",children:e}),s.jsxs("div",{className:"kpi-value",children:[sn(n),s.jsx("span",{className:"kpi-unit",children:"%"})]})]});function Th(){const e=yr();S.useEffect(()=>{document.title="Boiler Efficiency Calculator — BS-2885"},[]);const[n,t]=S.useState("input"),[r,o]=S.useState(Ah),[a,l]=S.useState(new Set),[i,u]=S.useState(new Set),[d,h]=S.useState({}),[g,f]=S.useState(null),[y,k]=S.useState(null),[C,P]=S.useState(null),p=(j,_)=>o(I=>({...I,[j]:_})),c=j=>h(_=>({..._,[j]:!_[j]})),m=async j=>{f({cls:"loading",text:"⏳ Reading BS-2885 sheet…"});const _=new FormData;_.append("file",j);try{const K=await(await Qe("/api/upload",{method:"POST",body:_})).json();if(!K.ok)throw new Error(K.error||"Upload failed");br(K,"BS-2885");const X=K.extractedBS2885||{},Y={...r},Z=new Set;let B=0;for(const[J,L]of Object.entries(X))Zu.has(J)&&(Y[J]=String(typeof L=="number"?parseFloat(L.toFixed(6)):L),Z.add(J),B++);const V=new Set;for(const J of K.missingFieldsBS2885||[]){const L=J.id||J;Zu.has(L)&&V.add(L)}o(Y),l(Z),u(V),k(K),f({cls:"success",text:`✓ ${B} of ${Xu.length} fields detected from "${K.filename}"`}),e(`Detected ${B} field${B===1?"":"s"} from the uploaded sheet.`,"success")}catch(I){f({cls:"error",text:`✗ ${I.message}`}),e(I.message||"Upload failed","error")}},v=()=>{o(j=>{const _={...j};for(const[I,K]of Object.entries(La))I in _&&(_[I]=String(K));return _}),l(j=>{const _=new Set(j);return Object.keys(La).forEach(I=>_.delete(I)),_}),u(j=>{const _=new Set(j);return Object.keys(La).forEach(I=>_.delete(I)),_}),e("Inputs reset to defaults.","success")},E=()=>{const j={};for(const _ of Xu)j[_]=parseFloat(r[_])||0;P(Qp(j)),t("output"),e("BS-2885 efficiency calculated.","success")},A=async()=>{const j=y;if(!j||!j.fieldDetailBS2885||!Object.keys(j.fieldDetailBS2885).length){e("Upload and parse a file first to generate a field report.","error");return}const _={filename:j.filename,primarySheet:j.sheetNameBS2885,fieldDetail:j.fieldDetailBS2885,extracted:j.extractedBS2885,missingFields:j.missingFieldsBS2885,reportTitle:"BS-2885 Field Detection Report",filenamePrefix:"BS2885_Field_Report",standardLabel:"BS-2885"};try{const I=await Qe("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)});if(!I.ok){const Z=await I.json().catch(()=>({}));throw new Error(Z.error||`Report generation failed (${I.status})`)}const K=await I.blob(),Y=(I.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt(K,Y?Y[1]:"BS2885_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(I){e("Report failed: "+I.message,"error")}},w=C;return s.jsxs("div",{className:"container",children:[s.jsx(Ft,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"BS-2885 (1974)"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(vr,{description:'Upload a filled-in BS-2885 (1974) test sheet — matching "Sl. No." rows are auto-populated from the Value column.',onFile:m,status:g}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:E,children:[s.jsx(gs,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:v,children:[s.jsx(xs,{}),"Reset to Defaults"]})]}),s.jsx(pr,{cards:Eh,open:d,onToggle:c}),Yp.map(j=>s.jsx(fr,{id:j,fields:Ii[j],open:!!d[j],values:r,onChange:p,detected:a,missing:i},j))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:w&&s.jsxs(s.Fragment,{children:[s.jsx(Bs,{label:"Thermal Efficiency — Method A (Gross CV)",value:w.methodA.gross,cls:"kpi-green"}),s.jsx(Bs,{label:"Thermal Efficiency — Method A (Net CV)",value:w.methodA.net,cls:"kpi-green"}),s.jsx(Bs,{label:"Thermal Efficiency — Method B (Gross CV)",value:w.methodB.gross,cls:"kpi-blue"}),s.jsx(Bs,{label:"Thermal Efficiency — Method B (Net CV)",value:w.methodB.net,cls:"kpi-blue"})]})}),s.jsx("div",{id:"output-tables",children:w&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Method A — Balance of Account (radiation & unmeasured losses)"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{}),s.jsx("th",{children:"Gross CV basis"}),s.jsx("th",{children:"Net CV basis"})]})}),s.jsx("tbody",{children:Nl("Item 908 — Unaccounted balance",w.balanceA.gross,w.balanceA.net)})]})]}),s.jsx(Ea,{title:"Item 903 — Losses due to Residue",group:w.losses.residue}),s.jsx(Ea,{title:"Item 904 — Losses due to Flue Gases",group:w.losses.flueGas}),s.jsx(Ea,{title:"Item 905 — Losses, Water-Filled Ash Hopper / Quenching",group:w.losses.waterHopper}),s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Other Method B Losses"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Loss"}),s.jsx("th",{children:"Gross CV basis"}),s.jsx("th",{children:"Net CV basis"})]})}),s.jsxs("tbody",{children:[Nl(w.losses.moistureAir.label,w.losses.moistureAir.gross,w.losses.moistureAir.net),s.jsxs("tr",{children:[s.jsx("td",{children:w.losses.fuelHeating.label}),s.jsxs("td",{colSpan:"2",children:[sn(w.losses.fuelHeating.value)," %"]})]}),s.jsxs("tr",{children:[s.jsx("td",{children:w.losses.radiation.label}),s.jsxs("td",{colSpan:"2",children:[sn(w.losses.radiation.value)," %"]})]}),s.jsxs("tr",{children:[s.jsx("td",{children:w.losses.auxPower.label}),s.jsxs("td",{colSpan:"2",children:[sn(w.losses.auxPower.value)," %"]})]})]})]})]}),s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Ultimate Analysis — Check Totals"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{}),s.jsx("th",{children:"Oxygen (by diff.)"}),s.jsx("th",{children:"Sum (should read 100%)"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:"Solid fuel"}),s.jsxs("td",{children:[sn(w.ultimate.solidOxygenByDiff)," %"]}),s.jsxs("td",{children:[sn(w.ultimate.solidCheckTotal)," %"]})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"Oil fuel (O₂ + N₂ by diff.)"}),s.jsxs("td",{children:[sn(w.ultimate.oilOxygenNitrogenByDiff)," %"]}),s.jsxs("td",{children:[sn(w.ultimate.oilCheckTotal)," %"]})]})]})]})]})]})}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-secondary",onClick:A,children:[s.jsx(Wo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function Oh(){return s.jsx(Pt,{active:"/bs-2885",extraStyle:"bs2885",children:s.jsx(Th,{})})}const Ll=["M","A","VM","FC","GCV","S","Cba","Cfa","Pfa","Pba","O2out","COout","Tgo","Tref"],Xp={M:"Moisture — Item 37",A:"Ash — Item 40",VM:"Volatile Matter — Item 38",FC:"Fixed Carbon — Item 39",GCV:"HHV, as fired — Item 41",S:"Sulfur — Item 47",Cba:"Unburnt Carbon — Bottom Ash",Cfa:"Unburnt Carbon — Fly Ash",Pfa:"% Fly Ash in Total Ash",Pba:"% Bottom Ash in Total Ash",O2out:"O₂, dry — Item 33",COout:"CO, dry — Item 34",Tgo:"Flue-Gas Temp Leaving Boiler — Item 13",Tref:"Reference Air Temp — Items 10/11"},jn=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function Fh(e){const n={...e},t=jn(n,"M"),r=jn(n,"A"),o=jn(n,"VM"),a=jn(n,"FC"),l=jn(n,"S");n.Ca=.97*a+.7*(o+.1*r)-t*(.6-.01*t),n.H=.036*a+.086*(o-.1*r)-.0035*t*t*(1-.02*t),n.N=2.1-.02*o,n.O=100-t-r-n.Ca-l-n.H-n.N;const i=jn(n,"Pfa")||80,u=jn(n,"Pba")||20;return n.Cash=i/100*jn(n,"Cfa")+u/100*jn(n,"Cba"),n}function El(e){const n=Fh(e),t=D=>jn(n,D),r=t("GCV"),o=t("S"),a=t("O2out"),l=t("COout"),i=t("Tgo"),u=t("Tref"),d=t("A"),h=t("M"),g=t("Ca"),f=t("H"),y=t("Cash"),k=n.Lrad===void 0||isNaN(n.Lrad)?1:n.Lrad,C=n.Lunm===void 0||isNaN(n.Lunm)?.5:n.Lunm,P=l/1e6*100,p=19.3-a,c=100-p-a-P,m=.2682*c-(a-P/2)!==0?100*(a-P/2)/(.2682*c-(a-P/2)):0,v=100-y!==0?d/(100-y):0,E=d/100*(y/(100-y||1)),A=g-100*E,w=3*(p+P),j=w!==0?(11*p+8*a+7*(c+P))/w*(A/100+o/267):0,_=i-u,I=8077.8,K=j*.24*_/r*100,X=h/100*(584+.45*_)/r*100,Y=9*(f/100)*(584+.45*_)/r*100,Z=100-y!==0?d/(100-y)*(y/100*I)/r*100:0,B=k,V=C,J=K+X+Y+Z+B+V,L=100-J;return{CO2:p,N2:c,COoutp:P,ExcessAir:m,Ca:g,H:f,N:t("N"),O:t("O"),Cash:y,DryRefuse:v,U:E,CarbonBurned:A,MassDFG:j,dT:_,L65:K,L66:X,L67:Y,L68:Z,L69:B,L70:V,TotalLosses:J,BoilerEff:L,Lrad:k,Lunm:C,inputs:Ll.map(D=>({id:D,label:Xp[D]||D,value:n[D]}))}}const Ph=[{target:"grid-general",icon:"GD",title:"General Data",sub:"4 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis — As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters — Flue Gas & Temps",sub:"4 parameters"}],Zp={"grid-general":[{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2out",name:"Avg. Flue Gas O₂, dry",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1,tag:{cls:"formula-tag",text:"Item 33"}},{id:"COout",name:"Avg. Flue Gas CO, dry",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1,tag:{cls:"formula-tag",text:"Item 34"}},{id:"Tgo",name:"Flue Gas Temp Leaving Boiler",sym:"Tgo",uom:"°C",kind:"",value:"135",readonly:!1,tag:{cls:"formula-tag",text:"Item 13"}},{id:"Tref",name:"Reference Air Temp",sym:"Tref",uom:"°C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},qp=["grid-general","grid-proximate","grid-plant"],Mi=qp.flatMap(e=>Zp[e]),Ih=Object.fromEntries(Mi.map(e=>[e.id,e.value??""])),Mh=new Set(Mi.filter(e=>!e.readonly).map(e=>e.id)),qu=["Cba","Cfa","M","A","VM","FC","GCV","O2out","COout","Tgo"],_h={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},ec={lossesOpen:!0,intermediateOpen:!0,processInputsOpen:!1,processComparisonOpen:!1},Bh=[["Date Range",e=>`${Ye(e.start)} → ${Ye(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>M(e.result.BoilerEff)],["Dry Flue Gas Loss (%) — 65",e=>M(e.result.L65)],["Moisture in Fuel (%) — 66",e=>M(e.result.L66)],["H₂ Combustion (%) — 67",e=>M(e.result.L67)],["Combustibles in Refuse (%) — 68",e=>M(e.result.L68)],["Radiation (%) — 69",e=>M(e.result.L69)],["Unmeasured Losses (%) — 70",e=>M(e.result.L70)],["Total Losses (%) — 71",e=>M(e.result.TotalLosses)]],nc={background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"20px",color:"var(--text-bright)",width:"90px",outline:"none"},tc={display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},rc={fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"};function Dh(){const e=yr();S.useEffect(()=>{document.title="Boiler Efficiency Calculator — ASME-PTC 4.1"},[]);const[n,t]=S.useState("input"),[r,o]=S.useState(Ih),[a,l]=S.useState(new Set),[i,u]=S.useState(new Set),[d,h]=S.useState({}),[g,f]=S.useState(null),[y,k]=S.useState(null),C=Ai(),[P,p]=S.useState(null),[c,m]=S.useState(null),[v,E]=S.useState(null),[A,w]=S.useState(null),[j,_]=S.useState(ec),I=(N,T)=>o(q=>({...q,[N]:T})),K=N=>h(T=>({...T,[N]:!T[N]})),X=(N,T)=>Li(y,N,T),Y=()=>{const N={};return Ll.forEach(T=>{N[T]=r[T]!==void 0?r[T]:0}),N.Lrad=v!==null?parseFloat(v)||0:void 0,N.Lunm=A!==null?parseFloat(A)||0:void 0,N},Z=async N=>{f({cls:"loading",text:"⏳ Parsing all sheets…"});const T=new FormData;T.append("file",N);try{const R=await(await Qe("/api/upload",{method:"POST",body:T})).json();if(!R.ok)throw new Error(R.error||"Upload failed");br(R,"ASME PTC 4.1");const x={...r},O=new Set;let z=0;for(const[pe,le]of Object.entries(R.extracted||{}))Mh.has(pe)&&(x[pe]=String(typeof le=="number"?parseFloat(le.toFixed(6)):le),O.add(pe),z++);const $=R.missingFields||[],de=new Set;for(const pe of $){const le=pe.id||pe;Mi.some(rn=>rn.id===le)&&de.add(le)}o(x),l(O),u(de),k(R),C.setProcesses([]),m(null),f({cls:"success",node:Ni({data:R,populated:z,fieldDetail:R.fieldDetail||{},missingFieldsList:$,strategyLabel:Up,derivedLabel:"↳ defaulted from Secondary Air",bee:!1})}),e(`Excel imported — ${z} fields auto-populated from "${R.primarySheet||""}"`,"success")}catch(q){f({cls:"error",text:`✗ ${q.message}`}),e(q.message,"error")}},B=()=>{const N=C.processes.filter(R=>R.start||R.end);if(!N.length){const R=El(Y());m(null),p(R),E(String(R.Lrad)),w(String(R.Lunm)),t("output");return}const T=Y(),q=N.map(R=>{const{avg:x,rowCount:O}=X(R.start,R.end);return{title:R.title||"Process",start:R.start,end:R.end,rowCount:O,result:El({...T,...x})}});m(q),p(q[0].result),E(null),w(null),t("output")},V=(N,T)=>{const q=N==="Lrad"?T:v,R=N==="Lunm"?T:A;if(N==="Lrad"?E(T):w(T),!P)return;const x={...P};x.Lrad=parseFloat(q)||0,x.Lunm=parseFloat(R)||0,x.L69=x.Lrad,x.L70=x.Lunm,x.TotalLosses=x.L65+x.L66+x.L67+x.L68+x.L69+x.L70,x.BoilerEff=100-x.TotalLosses,p(x)},J=()=>{o(N=>{const T={...N};return Object.entries(_h).forEach(([q,R])=>{q in T&&(T[q]=String(R))}),T}),l(N=>{const T=new Set(N);return qu.forEach(q=>T.delete(q)),T}),u(N=>{const T=new Set(N);return qu.forEach(q=>T.delete(q)),T}),k(null),C.setProcesses([]),m(null),p(null),E(null),w(null),_(ec),f(null)},L=N=>_(T=>({...T,[N]:!T[N]}));let D=null,H=null;if(c){const N=c,T=new Set;N.forEach(R=>Object.keys(X(R.start,R.end).avg).forEach(x=>T.add(x)));const q=Ll.filter(R=>T.has(R));D=s.jsxs(s.Fragment,{children:[N.map((R,x)=>s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:R.title}),s.jsxs("div",{className:"kpi-value",children:[M(R.result.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[Ye(R.start)," → ",Ye(R.end)," · ",R.rowCount," row",R.rowCount===1?"":"s"]})]},x)),N.length===2&&s.jsx(Ti,{p1:N[0],p2:N[1],eff1:N[0].result.BoilerEff,eff2:N[1].result.BoilerEff})]}),H=s.jsxs(s.Fragment,{children:[s.jsx(Oi,{list:N,perProcessIds:q,labels:Xp,page:"asme",open:j.processInputsOpen,onToggle:()=>L("processInputsOpen")}),s.jsx(Fi,{list:N,rows:Bh,page:"asme",open:j.processComparisonOpen,onToggle:()=>L("processComparisonOpen")})]})}else if(P&&v!==null){const N=P;D=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),s.jsxs("div",{className:"kpi-value boiler-eff-val",children:[M(N.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"ASME PTC 4.1 — Losses Method, HHV basis"})]}),s.jsx(Ae,{cls:"kpi-red",label:s.jsxs(s.Fragment,{children:["Dry Flue Gas Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 65)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[M(N.L65),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-blue",label:s.jsxs(s.Fragment,{children:["Moisture in Fuel Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 66)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[M(N.L66),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-green",label:s.jsxs(s.Fragment,{children:["H","₂"," Combustion Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 67)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[M(N.L67),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-amber",label:s.jsxs(s.Fragment,{children:["Combustibles in Refuse ",s.jsx("span",{style:{opacity:.6},children:"(Item 68)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[M(N.L68),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsxs("div",{className:"kpi-card kpi-red",children:[s.jsxs("div",{className:"kpi-label",children:["Radiation Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 69)"})]}),s.jsxs("div",{style:tc,children:[s.jsx("input",{type:"number",id:"Lrad",value:v,onChange:T=>V("Lrad",T.target.value),style:nc}),s.jsx("span",{style:rc,children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"ABMA curve / measured — enter & recalculate"})]}),s.jsxs("div",{className:"kpi-card kpi-blue",children:[s.jsxs("div",{className:"kpi-label",children:["Unmeasured Losses ",s.jsx("span",{style:{opacity:.6},children:"(Item 70)"})]}),s.jsxs("div",{style:tc,children:[s.jsx("input",{type:"number",id:"Lunm",value:A??"",onChange:T=>V("Lunm",T.target.value),style:nc}),s.jsx("span",{style:rc,children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Mutually agreed value — enter & recalculate"})]})]}),H=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-section",children:[s.jsxs(Lo,{open:j.lossesOpen,onClick:()=>L("lossesOpen"),children:["Heat-Loss Efficiency — Items 65","–","72"]}),j.lossesOpen&&s.jsxs(s.Fragment,{children:[s.jsx(mr,{b:"Item"}),s.jsx(se,{name:"Dry Flue Gas Loss",sym:"65",val:N.L65,uom:"%"}),s.jsx(se,{name:"Moisture in Fuel",sym:"66",val:N.L66,uom:"%"}),s.jsx(se,{name:"Water from H₂ Combustion",sym:"67",val:N.L67,uom:"%"}),s.jsx(se,{name:"Combustibles in Refuse",sym:"68",val:N.L68,uom:"%"}),s.jsx(se,{name:"Radiation",sym:"69",val:N.L69,uom:"%"}),s.jsx(se,{name:"Unmeasured Losses",sym:"70",val:N.L70,uom:"%"}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Total Losses"}),s.jsx("span",{className:"out-sym",children:"71"}),s.jsx("span",{className:"out-val",id:"losses-total-val",children:M(N.TotalLosses)}),s.jsx("span",{className:"out-uom",children:"%"})]}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Boiler Efficiency"}),s.jsx("span",{className:"out-sym",children:"72"}),s.jsx("span",{className:"out-val",id:"losses-eff-val",children:M(N.BoilerEff)}),s.jsx("span",{className:"out-uom",children:"%"})]})]})]}),s.jsxs("div",{className:"output-section",children:[s.jsx(Lo,{open:j.intermediateOpen,onClick:()=>L("intermediateOpen"),children:"Intermediate Values"}),j.intermediateOpen&&s.jsxs(s.Fragment,{children:[s.jsx(mr,{b:"Item"}),s.jsx(se,{name:"CO₂, dry",sym:"32",val:N.CO2,uom:"%"}),s.jsx(se,{name:"N₂, dry (by difference)",sym:"35",val:N.N2,uom:"%"}),s.jsx(se,{name:"Excess Air",sym:"36",val:N.ExcessAir,uom:"%"}),s.jsx(se,{name:"Carbon, as fired (ultimate)",sym:"43",val:N.Ca,uom:"%"}),s.jsx(se,{name:"Hydrogen, as fired (ultimate)",sym:"44",val:N.H,uom:"%"}),s.jsx(se,{name:"Dry Refuse per Unit Fuel",sym:"22",val:N.DryRefuse,uom:"—"}),s.jsx(se,{name:"Carbon Burned per Unit Fuel",sym:"24",val:N.CarbonBurned,uom:"%"}),s.jsx(se,{name:"Dry Flue Gas per Unit Fuel",sym:"25",val:N.MassDFG,uom:"—"})]})]})]})}return s.jsxs("div",{className:"container",children:[s.jsx(Ft,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"ASME-PTC 4.1"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(vr,{description:"Upload your data sheet — matching input fields will be auto-populated, same detection as CENPEEP.",onFile:Z,status:g}),s.jsx(Ei,{uploadData:y,processes:C.processes,onAdd:C.add,onRemove:C.remove,onTitle:C.setTitle,onDate:C.setDate}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-ghost",onClick:J,children:[s.jsx(xs,{}),"Reset to Defaults"]}),s.jsxs("button",{className:"btn btn-primary",onClick:B,title:"ASME PTC 4.1 — Losses Method",children:[s.jsx(gs,{}),"Calculate Efficiency"]})]}),s.jsx(pr,{cards:Ph,open:d,onToggle:K}),qp.map(N=>s.jsx(fr,{id:N,fields:Zp[N],open:!!d[N],values:r,onChange:I,detected:a,missing:i},N))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:D}),s.jsx("div",{id:"output-tables",children:H}),s.jsx("div",{className:"download-bar",children:s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})})]})]})}function zh(){return s.jsx(Pt,{active:"/asme-ptc-4-1",children:s.jsx(Dh,{})})}const Eo=["BL","SP","O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","S","M","A","GCV","Cba","Cfa","GCVba","GCVfa","L6"],Ao={BL:"Boiler Load (TPH)",SP:"Steam Pressure (kg/cm²)",O2fg:"O2 in Flue Gas (%)",COfg:"CO in Flue Gas (ppm)",CO2fg:"CO2 in Flue Gas (%)",Tfg:"Avg. Flue Gas Temperature (°C)",Tamb:"Ambient Temperature (°C)",Hum:"Humidity in Ambient Air (kg/kg dry air)",C:"Carbon (%)",H2:"Hydrogen (%)",N2:"Nitrogen (%)",O2f:"Oxygen (%)",S:"Sulphur (%)",M:"Moisture (%)",A:"Ash Content (%)",GCV:"GCV of Coal (kcal/kg)",Cba:"Unburnt in Bottom Ash (%)",Cfa:"Unburnt in Fly Ash (%)",GCVba:"GCV of Bottom Ash (kcal/kg)",GCVfa:"GCV of Fly Ash (kcal/kg)",L6:"Radiation & Unaccounted Losses (%)"},Rh=["BL","SP"],Uh=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function qs(e){const n=T=>Uh(e,T),t=n("O2fg");n("COfg");const r=n("CO2fg"),o=n("Tfg"),a=n("Tamb"),l=n("Hum"),i=n("C"),u=n("H2"),d=n("N2"),h=n("O2f"),g=n("S"),f=n("M"),y=n("A"),k=n("GCV"),C=n("Cba"),P=n("Cfa"),p=n("GCVba"),c=n("GCVfa"),m=n("L6"),v=(11.6*i+34.8*(u-h/8)+4.35*g)/100,E=t/(21-t)*100,A=(1+E/100)*v,w=i/100*(44/12)+d/100+A*(77/100)+(A-v)*(23/100)+g/100*(64/32),j=.24,_=.45,I=w*j*(o-a)/k*100,K=9*(u/100)*(584+_*(o-a))/k*100,X=f/100*(584+_*(o-a))/k*100,Y=A*(l/10)*_*(o-a)/k*100,Z=i/100+r/5654/k/100,J=P/100*(y/100)*c*100/k,H=C/100*(y/100)*p*100/k,N=100-(I+K+X+Y+Z+m+J+H);return{TA:v,EA:E,AAS:A,m:w,L1:I,L2:K,L3:X,L4:Y,L5:Z,L6:m,L7:J,L8:H,BoilerEff:N,heatInput:k,inputs:Eo.map(T=>({id:T,label:Ao[T]||T,value:e[T]}))}}const Vh=[{target:"grid-general",icon:"GD",title:"General Data",sub:"2 parameters"},{target:"grid-fluegas",icon:"FG",title:"Flue Gas & Atmospheric Air",sub:"6 parameters"},{target:"grid-fuel",icon:"FA",title:"Fuel Analysis — Ultimate",sub:"8 parameters"},{target:"grid-ash",icon:"AA",title:"Ash Analysis",sub:"4 parameters"},{target:"grid-other",icon:"OL",title:"Other Losses",sub:"1 parameter"}],ef={"grid-general":[{id:"BL",name:"Boiler Load",sym:"BL",uom:"TPH",kind:"field-info",value:"20",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}},{id:"SP",name:"Steam Pressure",sym:"SP",uom:"kg/cm²",kind:"field-info",value:"66",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}}],"grid-fluegas":[{id:"O2fg",name:"O₂ in Flue Gas",sym:"O2fg",uom:"%",kind:"",value:"9",readonly:!1},{id:"COfg",name:"CO in Flue Gas",sym:"COfg",uom:"ppm",kind:"",value:"800",readonly:!1},{id:"CO2fg",name:"CO₂ in Flue Gas",sym:"CO2fg",uom:"%",kind:"",value:"10.67",readonly:!1},{id:"Tfg",name:"Average Flue Gas Temperature",sym:"Tfg",uom:"°C",kind:"",value:"180",readonly:!1},{id:"Tamb",name:"Ambient Temperature",sym:"Tamb",uom:"°C",kind:"",value:"29.3",readonly:!1},{id:"Hum",name:"Humidity in Ambient Air",sym:"Hum",uom:"kg/kg dry air",kind:"",value:"0.1977",readonly:!1,step:"0.0001"}],"grid-fuel":[{id:"C",name:"Carbon",sym:"C",uom:"%",kind:"",value:"53.65",readonly:!1},{id:"H2",name:"Hydrogen",sym:"H2",uom:"%",kind:"",value:"3.25",readonly:!1},{id:"N2",name:"Nitrogen",sym:"N2",uom:"%",kind:"",value:"1.11",readonly:!1},{id:"O2f",name:"Oxygen",sym:"O2f",uom:"%",kind:"",value:"8.68",readonly:!1},{id:"S",name:"Sulphur",sym:"S",uom:"%",kind:"",value:"0.34",readonly:!1},{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"14.43",readonly:!1},{id:"A",name:"Ash Content",sym:"A",uom:"%",kind:"",value:"18.54",readonly:!1},{id:"GCV",name:"GCV of Coal",sym:"GCV",uom:"kcal/kg",kind:"",value:"4291",readonly:!1}],"grid-ash":[{id:"Cba",name:"Unburnt in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"0.11",readonly:!1},{id:"Cfa",name:"Unburnt in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"4.89",readonly:!1},{id:"GCVba",name:"GCV of Bottom Ash",sym:"GCVba",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"GCVfa",name:"GCV of Fly Ash",sym:"GCVfa",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-other":[{id:"L6",name:"Radiation & Unaccounted Losses",sym:"L6",uom:"%",kind:"field-manual",value:"1",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},nf=["grid-general","grid-fluegas","grid-fuel","grid-ash","grid-other"],_i=nf.flatMap(e=>ef[e]),Hh=Object.fromEntries(_i.map(e=>[e.id,e.value??""])),$h=new Set(_i.filter(e=>!e.readonly).map(e=>e.id)),Gh=Eo.filter(e=>!Rh.includes(e)),Wh=["L6","S","GCVba","GCVfa"],Jh=e=>Gh.filter(n=>!Wh.includes(n)&&!(n in e)).map(n=>({id:n,label:Ao[n]||n})),Qh={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},Yh=[["Date Range",e=>`${Ye(e.start)} → ${Ye(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>M(e.result.BoilerEff)],["Dry Flue Gas (%) — L1",e=>M(e.result.L1)],["H₂ in Fuel (%) — L2",e=>M(e.result.L2)],["Moisture in Fuel (%) — L3",e=>M(e.result.L3)],["Moisture in Air (%) — L4",e=>M(e.result.L4)],["Partial C→CO (%) — L5",e=>M(e.result.L5)],["Radiation & Unaccounted (%) — L6",e=>M(e.result.L6)],["Unburnt Fly Ash (%) — L7",e=>M(e.result.L7)],["Unburnt Bottom Ash (%) — L8",e=>M(e.result.L8)]],On=({name:e,sym:n,kcal:t,pct:r})=>s.jsxs("div",{className:"output-row",children:[s.jsx("span",{className:"out-name",children:e}),s.jsx("span",{className:"out-sym",children:n}),s.jsx("span",{className:"out-val",children:M(t)}),s.jsxs("span",{className:"out-uom",children:[M(r),"%"]})]});function Kh(){const e=yr();S.useEffect(()=>{document.title="Boiler Efficiency Calculator — BEE"},[]);const[n,t]=S.useState("input"),[r,o]=S.useState(Hh),[a,l]=S.useState(new Set),[i,u]=S.useState(new Set),[d,h]=S.useState({}),[g,f]=S.useState(null),[y,k]=S.useState(null),[C,P]=S.useState(null),p=Ai(),[c,m]=S.useState(null),[v,E]=S.useState(null),[A,w]=S.useState(""),[j,_]=S.useState({processInputsOpen:!1,processComparisonOpen:!1}),I=(x,O)=>o(z=>({...z,[x]:O})),K=x=>h(O=>({...O,[x]:!O[x]})),X=(x,O)=>Li(y,x,O,!0),Y=()=>{const x={};return Eo.forEach(O=>{x[O]=r[O]!==void 0?r[O]:0}),x},Z=async x=>{f({cls:"loading",text:"⏳ Parsing all sheets…"});const O=new FormData;O.append("file",x);try{const $=await(await Qe("/api/upload",{method:"POST",body:O})).json();if(!$.ok)throw new Error($.error||"Upload failed");br($,"BEE");const de={...$.extracted||{},...$.beeOverrides||{}},pe={...r},le=new Set;let rn=0;for(const[Ue,Tn]of Object.entries(de))$h.has(Ue)&&(pe[Ue]=String(typeof Tn=="number"?parseFloat(Tn.toFixed(6)):Tn),le.add(Ue),rn++);const An=Jh(de),pt=new Set;for(const Ue of An)_i.some(Tn=>Tn.id===Ue.id)&&pt.add(Ue.id);const kr={...$,missingFields:An};o(pe),l(le),u(pt),P($.filename),k(kr),p.setProcesses([]),E(null);const Vn={...$.fieldDetail||{}};for(const Ue of Object.keys($.beeOverrides||{}))Vn[Ue]={label:Ao[Ue]||Ue,header:"LAB sheet (lab-tested reading)",source:"rule",confidence:1};f({cls:rn?"success":"",node:Ni({data:$,populated:rn,fieldDetail:Vn,missingFieldsList:An,strategyLabel:hh,derivedLabel:"↳ defaulted",bee:!0})}),e(rn?`Excel imported — ${rn} fields auto-populated`:"Sheet parsed — BEE field detection not configured yet",rn?"success":"info")}catch(z){f({cls:"error",text:`✗ ${z.message}`}),e(z.message,"error")}},B=()=>{const x=p.processes.filter($=>$.start||$.end);if(!x.length){const $=qs(Y());E(null),m($),w(String($.L6)),t("output");return}const O=Y(),z=x.map($=>{const{avg:de,rowCount:pe}=X($.start,$.end);return{title:$.title||"Process",start:$.start,end:$.end,rowCount:pe,result:qs({...O,...de})}});E(z),m(z[0].result),t("output")},V=x=>{if(w(x),!c)return;const O=parseFloat(x)||0,z=Y();z.L6=O,I("L6",String(O)),m(qs(z))},J=()=>{o(x=>{const O={...x};return Object.entries(Qh).forEach(([z,$])=>{z in O&&(O[z]=String($))}),O}),P(null),k(null),p.setProcesses([]),E(null),m(null),_({processInputsOpen:!1,processComparisonOpen:!1}),f(null)},L=async()=>{if(!c){e("Calculate first before saving.","error");return}const x=window.prompt("Session name (optional):",C||"");if(x===null)return;const O=c,z={sessionName:x.trim(),sourceFile:C||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:O.inputs,results:{method:"BEE-2 Indirect",BoilerEff:O.BoilerEff,L1:O.L1,L2:O.L2,L3:O.L3,L4:O.L4,L5:O.L5,L6:O.L6,L7:O.L7,L8:O.L8,TA:O.TA,EA:O.EA,AAS:O.AAS,m:O.m}};try{const de=await(await Qe("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(z)})).json();if(!de.ok)throw new Error(de.error);e("✓ Session saved to MongoDB!","success")}catch($){e("Save failed: "+$.message,"error")}},D=()=>{if(!c){e("Calculate first.","error");return}const x=c,O=new Date().toISOString().slice(0,19).replace("T"," ");let z=`BEE-2 Indirect Boiler Efficiency Report
Generated:,${O}

INPUTS
Parameter,Value
`;x.inputs.forEach($=>{z+=`"${$.label}",${$.value}
`}),z+=`
LOSSES
Parameter,Symbol,Value (%),kcal/kg of coal
`,[["Dry Flue Gas","L1",x.L1],["Hydrogen in Fuel","L2",x.L2],["Moisture in Fuel","L3",x.L3],["Moisture in Air","L4",x.L4],["Partial Combustion C→CO","L5",x.L5],["Radiation & Unaccounted","L6",x.L6],["Unburnt in Fly Ash","L7",x.L7],["Unburnt in Bottom Ash","L8",x.L8]].forEach(([$,de,pe])=>{z+=`"${$}","${de}",${pe.toFixed(4)},${(x.heatInput*pe/100).toFixed(2)}
`}),z+=`
"Boiler Efficiency","eta",${x.BoilerEff.toFixed(4)},
`,jt(new Blob([z],{type:"text/csv"}),`bee_indirect_report_${O.replace(/[: ]/g,"_")}.csv`)},H=()=>{if(!c){e("Calculate first.","error");return}const x=c,O=new Date().toLocaleString(),z=window.open("","_blank");z.document.write(`<!DOCTYPE html><html><head><title>BEE-2 Indirect Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}
  h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}
  table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}
  td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}
  .hl{background:#e6fff5!important;font-weight:bold}.meta{color:#666;font-size:11px;margin-bottom:16px}
  </style></head><body>
  <h1>BEE-2 Indirect Boiler Efficiency Report</h1><p class="meta">Generated: ${O}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${x.inputs.map($=>`<tr><td>${$.label}</td><td>${$.value}</td></tr>`).join("")}</table>
  <h2>Heat Balance</h2><table><tr><th>Parameter</th><th>Symbol</th><th>kcal/kg coal</th><th>% loss</th></tr>
  <tr><td>Heat Input</td><td></td><td>${M(x.heatInput)}</td><td>100.00</td></tr>
  <tr><td>Dry Flue Gas</td><td>L1</td><td>${M(x.heatInput*x.L1/100)}</td><td>${M(x.L1)}</td></tr>
  <tr><td>Hydrogen in Fuel</td><td>L2</td><td>${M(x.heatInput*x.L2/100)}</td><td>${M(x.L2)}</td></tr>
  <tr><td>Moisture in Fuel</td><td>L3</td><td>${M(x.heatInput*x.L3/100)}</td><td>${M(x.L3)}</td></tr>
  <tr><td>Moisture in Air</td><td>L4</td><td>${M(x.heatInput*x.L4/100)}</td><td>${M(x.L4)}</td></tr>
  <tr><td>Partial Combustion C→CO</td><td>L5</td><td>${M(x.heatInput*x.L5/100)}</td><td>${M(x.L5)}</td></tr>
  <tr><td>Radiation &amp; Unaccounted</td><td>L6</td><td>${M(x.heatInput*x.L6/100)}</td><td>${M(x.L6)}</td></tr>
  <tr><td>Unburnt in Fly Ash</td><td>L7</td><td>${M(x.heatInput*x.L7/100)}</td><td>${M(x.L7)}</td></tr>
  <tr><td>Unburnt in Bottom Ash</td><td>L8</td><td>${M(x.heatInput*x.L8/100)}</td><td>${M(x.L8)}</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td></td><td><b>${M(x.BoilerEff)}</b></td></tr>
  </table><script>window.print();<\/script></body></html>`),z.document.close()},N=async()=>{const x=y;if(!x||!x.fieldDetail||!Object.keys(x.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}const O={filename:x.filename,primarySheet:x.primarySheet,fieldDetail:x.fieldDetail,extracted:x.extracted,missingFields:x.missingFields};try{const z=await Qe("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(O)});if(!z.ok){const le=await z.json().catch(()=>({}));throw new Error(le.error||`Report generation failed (${z.status})`)}const $=await z.blob(),pe=(z.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt($,pe?pe[1]:"BEE_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(z){e("Report failed: "+z.message,"error")}},T=x=>_(O=>({...O,[x]:!O[x]}));let q=null,R=null;if(v){const x=v,O=new Set;x.forEach($=>Object.keys(X($.start,$.end).avg).forEach(de=>O.add(de)));const z=Eo.filter($=>O.has($));q=s.jsxs(s.Fragment,{children:[x.map(($,de)=>s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:$.title}),s.jsxs("div",{className:"kpi-value",children:[M($.result.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[Ye($.start)," → ",Ye($.end)," · ",$.rowCount," row",$.rowCount===1?"":"s"]})]},de)),x.length===2&&s.jsx(Ti,{p1:x[0],p2:x[1],eff1:x[0].result.BoilerEff,eff2:x[1].result.BoilerEff})]}),R=s.jsxs(s.Fragment,{children:[s.jsx(Oi,{list:x,perProcessIds:z,labels:Ao,page:"bee",open:j.processInputsOpen,onToggle:()=>T("processInputsOpen")}),s.jsx(Fi,{list:x,rows:Yh,page:"bee",open:j.processComparisonOpen,onToggle:()=>T("processComparisonOpen")})]})}else if(c){const x=c,O=({v:z})=>s.jsxs("div",{className:"kpi-value",children:[M(z),s.jsx("span",{className:"kpi-unit",children:"%"})]});q=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"kpi-card kpi-green",style:{gridColumn:"span 2"},children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),s.jsx(O,{v:x.BoilerEff}),s.jsx("div",{className:"kpi-sub",children:"BEE-2 Indirect method (heat-loss)"})]}),s.jsx(Ae,{cls:"kpi-red",label:"L1 — Dry Flue Gas",children:s.jsx(O,{v:x.L1})}),s.jsx(Ae,{cls:"kpi-blue",label:"L2 — H₂ in Fuel",children:s.jsx(O,{v:x.L2})}),s.jsx(Ae,{cls:"kpi-blue",label:"L3 — Moisture in Fuel",children:s.jsx(O,{v:x.L3})}),s.jsx(Ae,{cls:"kpi-blue",label:"L4 — Moisture in Air",children:s.jsx(O,{v:x.L4})}),s.jsx(Ae,{cls:"kpi-amber",label:"L5 — Partial C→CO",children:s.jsx(O,{v:x.L5})}),s.jsxs("div",{className:"kpi-card kpi-amber",style:{gridColumn:"span 2"},children:[s.jsx("div",{className:"kpi-label",children:"L6 — Radiation & Unaccounted"}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[s.jsx("input",{type:"number",id:"L6live",value:A,onChange:z=>V(z.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),s.jsx("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),s.jsx(Ae,{cls:"kpi-amber",label:"L7 — Unburnt Fly Ash",children:s.jsx(O,{v:x.L7})}),s.jsx(Ae,{cls:"kpi-amber",label:"L8 — Unburnt Bottom Ash",children:s.jsx(O,{v:x.L8})})]}),R=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Heat Balance Summary"})}),s.jsx(mr,{c:"kcal/kg of coal",d:"% loss"}),s.jsx(On,{name:"Heat Input",sym:"",kcal:x.heatInput,pct:100}),s.jsx(On,{name:"Dry Flue Gas",sym:"L1",kcal:x.heatInput*x.L1/100,pct:x.L1}),s.jsx(On,{name:"Hydrogen in Fuel",sym:"L2",kcal:x.heatInput*x.L2/100,pct:x.L2}),s.jsx(On,{name:"Moisture in Fuel",sym:"L3",kcal:x.heatInput*x.L3/100,pct:x.L3}),s.jsx(On,{name:"Moisture in Air",sym:"L4",kcal:x.heatInput*x.L4/100,pct:x.L4}),s.jsx(On,{name:"Partial Combustion C→CO",sym:"L5",kcal:x.heatInput*x.L5/100,pct:x.L5}),s.jsx(On,{name:"Surface (Radiation) Losses",sym:"L6",kcal:x.heatInput*x.L6/100,pct:x.L6}),s.jsx(On,{name:"Unburnt in Fly Ash",sym:"L7",kcal:x.heatInput*x.L7/100,pct:x.L7}),s.jsx(On,{name:"Unburnt in Bottom Ash",sym:"L8",kcal:x.heatInput*x.L8/100,pct:x.L8}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Boiler Efficiency"}),s.jsx("span",{className:"out-sym",children:"η"}),s.jsx("span",{className:"out-val",children:M(x.BoilerEff)}),s.jsx("span",{className:"out-uom",children:"%"})]})]}),s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Intermediate Values"})}),s.jsx(mr,{}),s.jsx(se,{name:"Theoretical Air Required",sym:"TA",val:x.TA,uom:"kg/kg coal"}),s.jsx(se,{name:"Excess Air Supplied",sym:"EA",val:x.EA,uom:"%"}),s.jsx(se,{name:"Actual Air Supplied",sym:"AAS",val:x.AAS,uom:"kg/kg coal"}),s.jsx(se,{name:"Mass of Dry Flue Gas",sym:"m",val:x.m,uom:"kg/kg coal"})]})]})}return s.jsxs("div",{className:"container",children:[s.jsx(Ft,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"BEE"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(vr,{description:"Upload your file — matching input fields will be auto-populated automatically.",onFile:Z,status:g}),s.jsx(Ei,{uploadData:y,processes:p.processes,onAdd:p.add,onRemove:p.remove,onTitle:p.setTitle,onDate:p.setDate}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:B,children:[s.jsx(gs,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:J,children:[s.jsx(xs,{}),"Reset to Defaults"]})]}),s.jsx(pr,{cards:Vh,open:d,onToggle:K}),nf.map(x=>s.jsx(fr,{id:x,fields:ef[x],open:!!d[x],values:r,onChange:I,detected:a,missing:i},x))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:q}),s.jsx("div",{id:"output-tables",children:R}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:L,children:[s.jsx(Pp,{}),"Save to Database"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:D,children:[s.jsx(No,{}),"Download CSV"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:H,children:[s.jsx(No,{}),"Download PDF"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:N,children:[s.jsx(Wo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function Xh(){return s.jsx(Pt,{active:"/bee",extraStyle:"bee",children:s.jsx(Kh,{})})}const tf=Object.keys(Si),rf=tf.flatMap(e=>Si[e]),sc=Object.fromEntries(rf.filter(e=>!e.readonly).map(e=>[e.id,e.value??""])),oc=new Set(sr),Zh={is_ml:"🤖 AI-detected",is_rule:"rule fallback",is_column:"column header"},ac=()=>s.jsxs("div",{className:"is-legend",children:[s.jsxs("span",{children:[s.jsx("span",{className:"is-swatch in"}),s.jsx("b",{children:"Input"})," — typed in, or detected from your Excel sheet"]}),s.jsxs("span",{children:[s.jsx("span",{className:"is-swatch calc"}),s.jsx("b",{children:"Calculated"})," — worked out from the inputs by the formulas"]})]}),Or=({label:e,value:n,cls:t,sub:r,unit:o="%"})=>s.jsxs("div",{className:"kpi-card "+t,children:[s.jsx("div",{className:"kpi-label",children:e}),s.jsxs("div",{className:"kpi-value",children:[it(n,2),s.jsx("span",{className:"kpi-unit",children:o})]}),r&&s.jsx("div",{className:"kpi-sub",children:r})]});function Ds({title:e,rows:n,digits:t=4,kind:r="calc"}){return s.jsxs("div",{className:"is-sheet",children:[s.jsx("h3",{children:e}),s.jsx("div",{className:"scroll",children:s.jsxs("table",{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Particulars"}),s.jsx("th",{style:{textAlign:"center"},children:"Symbol"}),s.jsx("th",{children:"UoM"}),s.jsx("th",{style:{textAlign:"right"},children:"Value"}),s.jsx("th",{children:"Formula"})]})}),s.jsx("tbody",{children:n.map(o=>s.jsxs("tr",{className:(o.bold?"bold ":"")+(o.total?"total ":"")+(o.key==="BoilerEff"?"eff ":"")+(o.notInTotal?"excluded":""),children:[s.jsxs("td",{className:"name",children:[o.name,o.notInTotal&&s.jsx("span",{className:"tagx",children:"NOT IN TOTAL — AS IN WORKBOOK"})]}),s.jsx("td",{className:"sym",children:o.sym}),s.jsx("td",{className:"uom",children:o.uom}),s.jsx("td",{className:"val "+r,children:it(o.val,o.digits??t)}),s.jsx("td",{className:"formula",children:o.formula})]},o.key))})]})})]})}function qh(){const e=yr();S.useEffect(()=>{document.title=`Boiler Efficiency Calculator — ${Ve}`},[]);const[n,t]=S.useState("input"),[r,o]=S.useState(sc),[a,l]=S.useState(new Set),[i,u]=S.useState(new Set),[d,h]=S.useState({}),[g,f]=S.useState(null),[y,k]=S.useState(null),[C,P]=S.useState([]),[p,c]=S.useState(null),[m,v]=S.useState(wl),E=(B,V)=>o(J=>({...J,[B]:V})),A=B=>h(V=>({...V,[B]:!V[B]})),w=S.useMemo(()=>{const B=Dp(r),V=J=>Number.isFinite(J)?String(parseFloat(J.toFixed(4))):"";return{C:V(B.C),H:V(B.H),N:V(B.N),O:V(B.O),t:V(B.t),Bagasse:V(B.Bagasse)}},[r]),j=S.useMemo(()=>p?zp(p,m):null,[p,m]),_=async B=>{f({cls:"loading",text:`⏳ Reading ${Ve} sheet…`});const V=new FormData;V.append("file",B);try{const L=await(await Qe("/api/upload",{method:"POST",body:V})).json();if(!L.ok)throw new Error(L.error||"Upload failed");br(L,Ve);const D=L.extractedIS13890||{},H=L.fieldDetailIS13890||{},N={...r},T=new Set;for(const[O,z]of Object.entries(D))oc.has(O)&&(N[O]=String(typeof z=="number"?parseFloat(z.toFixed(6)):z),T.add(O));const q=new Set;for(const O of L.missingFieldsIS13890||[]){const z=O.id||O;oc.has(z)&&q.add(z)}o(N),l(T),u(q),k(L),P(L.warningsIS13890||[]);const R=Object.entries(H).map(([O,z])=>s.jsxs("tr",{children:[s.jsx("td",{children:z.label}),s.jsxs("td",{children:['"',z.header,'"']}),s.jsx("td",{children:Zh[z.source]||z.source}),s.jsx("td",{children:typeof z.confidence=="number"?`${Math.round(z.confidence*100)}%`:"—"})]},O)),x=(L.missingFieldsIS13890||[]).map(O=>O.label||O.id);f({cls:T.size?"success":"error",node:s.jsxs("div",{className:"is-detect",children:[T.size?"✓":"ℹ"," ",s.jsxs("b",{children:[T.size," of ",sr.length," inputs"]}),' detected from "',L.filename,'"',L.sheetNameIS13890&&s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsxs("small",{style:{color:"#94a3b8"},children:["📄 Sheet: ",s.jsx("b",{children:L.sheetNameIS13890})]})]}),R.length>0&&s.jsxs("table",{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Field"}),s.jsx("th",{children:"Detected From"}),s.jsx("th",{children:"Method"}),s.jsx("th",{children:"Confidence"})]})}),s.jsx("tbody",{children:R})]}),x.length>0?s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsxs("small",{style:{color:"#f87171"},children:["⚠ Not detected — enter manually: ",x.join(", ")]})]}):T.size>0&&s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("small",{style:{color:"#4ade80"},children:"✓ All required inputs detected"})]}),!T.size&&s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsxs("small",{style:{color:"#94a3b8"},children:["No ",Ve," data found in this workbook — enter the values below."]})]})]})}),e(T.size?`Detected ${T.size} input${T.size===1?"":"s"} from the uploaded sheet.`:"No IS-13890 inputs found in that file.",T.size?"success":"error")}catch(J){f({cls:"error",text:`✗ ${J.message}`}),e(J.message||"Upload failed","error")}},I=()=>{o(sc),l(new Set),u(new Set),k(null),P([]),f(null),c(null),e("Inputs reset to the workbook’s sample values.","success")},K=()=>{const B={};for(const J of sr)B[J]=parseFloat(r[J])||0;const V=[];if(B.ER>0||V.push("Evaporation Ratio must be greater than 0"),B.BL>0||V.push("Boiler Load must be greater than 0"),B.GCV>0||V.push("Gross Calorific Value must be greater than 0"),B.CO2+B.CO>0||V.push("CO₂ + CO at APH inlet must be greater than 0"),V.length){e(V[0],"error");return}c(B),t("output"),e(`${Ve} efficiency calculated.`,"success")},X=async()=>{const B=y;if(!B||!B.fieldDetailIS13890||!Object.keys(B.fieldDetailIS13890).length){e("Upload and parse a file first to generate a field report.","error");return}const V={filename:B.filename,primarySheet:B.sheetNameIS13890,fieldDetail:B.fieldDetailIS13890,extracted:B.extractedIS13890,missingFields:B.missingFieldsIS13890,reportTitle:`${Ve} Field Detection Report`,filenamePrefix:`${Ve.replace("-","")}_Field_Report`,standardLabel:Ve};try{const J=await Qe("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(V)});if(!J.ok){const H=await J.json().catch(()=>({}));throw new Error(H.error||`Report generation failed (${J.status})`)}const L=await J.blob(),D=(J.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt(L,D?D[1]:"IS13890_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(J){e("Report failed: "+J.message,"error")}},Y=j,Z=Y&&sr.map(B=>{const V=rf.find(J=>J.id===B);return{key:B,name:V.name,sym:V.sym,uom:V.uom,val:p[B],formula:a.has(B)?"detected from uploaded sheet":"entered / default"}});return s.jsxs("div",{className:"container is-page",children:[s.jsx(Ft,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsxs("div",{className:"section-label",children:[Ve," — Heat Loss Method"]}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(ac,{}),s.jsx(vr,{description:`Upload your ${Ve} workbook (or any lab / plant sheet) — an AI model reads the row labels or column headers and fills the matching inputs.`,onFile:_,status:g}),C.length>0&&s.jsxs("div",{className:"is-warn",children:[s.jsx("b",{children:"⚠ Check these values"}),s.jsx("ul",{children:C.map((B,V)=>s.jsx("li",{children:B},V))})]}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:K,children:[s.jsx(gs,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:I,children:[s.jsx(xs,{}),"Reset to Sample Values"]})]}),s.jsx(pr,{cards:ch,open:d,onToggle:A}),tf.map(B=>s.jsx(fr,{id:B,fields:Si[B],open:!!d[B],values:r,derived:w,onChange:E,detected:a,missing:i},B)),s.jsxs("div",{className:"is-note",children:[s.jsx("strong",{children:"How it works."})," Fill (or upload) the ",s.jsx("span",{className:"is-swatch in",style:{margin:"0 4px"}}),"input fields; the",s.jsx("span",{className:"is-swatch calc",style:{margin:"0 4px"}}),"calculated fields — Carbon, Hydrogen, Nitrogen, Oxygen, mean ambient temperature and bagasse consumption — update live, and every loss on the Results tab is derived from them using the same formulas as the workbook. Defaults are the workbook’s sample data."]})]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:Y&&s.jsxs(s.Fragment,{children:[s.jsx(Or,{label:"Boiler Efficiency",value:Y.BoilerEff,cls:"kpi-green",sub:`${Ve} — heat loss method`}),s.jsx(Or,{label:"Total Loss",value:Y.TotalLossPct,cls:"kpi-red",sub:`${it(Y.TotalLossKcal,2)} kcal/kg of fuel`}),s.jsx(Or,{label:"Dry Flue Gas Loss",value:Y.pct.Lg,cls:"kpi-amber",sub:"Lg as % of GCV"}),s.jsx(Or,{label:"Moisture in Fuel Loss",value:Y.pct.Lmf,cls:"kpi-blue",sub:"Lmf as % of GCV"}),s.jsx(Or,{label:"Unburned Carbon Loss",value:Y.pct.Luc,cls:"kpi-red",sub:"Luc as % of GCV"})]})}),s.jsx("div",{id:"output-tables",children:Y&&s.jsxs(s.Fragment,{children:[s.jsx(ac,{}),s.jsx(Ds,{title:"Inputs used",rows:Z,digits:4,kind:"in"}),s.jsx(Ds,{title:"Ultimate Analysis — calculated",rows:Y.rows.ultimate}),s.jsx(Ds,{title:"Boiler Parameters — calculated",rows:Y.rows.boiler}),s.jsx(Ds,{title:"Efficiency Tabulation (Heat Loss Method)",rows:[...Y.rows.tabulation,{key:"BoilerEff",name:"Boiler Efficiency",sym:"ηboiler",uom:"%",val:Y.BoilerEff,total:!0,formula:"100 − Total Loss %",digits:2}]}),s.jsxs("div",{className:"is-note",children:[s.jsx("strong",{children:"Matches the workbook."})," Two details of the reference sheet are reproduced as-is so both give the same number; tick to see the effect of changing them.",s.jsxs("label",{children:[s.jsx("input",{type:"checkbox",checked:m.radiationInTotal,onChange:B=>v(V=>({...V,radiationInTotal:B.target.checked}))}),"Include radiation & convection loss Lβ in the total (the workbook’s Total Loss, cell E55, leaves it out)"]}),s.jsxs("label",{children:[s.jsx("input",{type:"checkbox",checked:!m.hrwFromMoisture,onChange:B=>v(V=>({...V,hrwFromMoisture:!B.target.checked}))}),"Use the enthalpy of saturated liquid at ambient t for H",s.jsx("sub",{children:"Rw"})," (the workbook’s cell E48 uses the moisture fraction, 0.505)"]})]})]})}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-secondary",onClick:X,children:[s.jsx(Wo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function eg(){return s.jsx(Pt,{active:"/is-13890",extraStyle:"is13890",children:s.jsx(qh,{})})}const ng={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},tg={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},rg={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},lc={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3},sg=["L","Ffw","Fin","Cba","Cfa","M","A","VM","FC","GCV","O2in","O2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa"],og=["M","A","VM","FC","GCV","Cba","Cfa","O2out","COout","Tgo"],ag=["O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","M","A","GCV","Cba","Cfa"],sf=e=>typeof e=="number"&&isFinite(e)?e.toFixed(2):"—";function zs(e,n){return{found:n.filter(r=>e&&Object.prototype.hasOwnProperty.call(e,r)).length,total:n.length}}function ic(e){const n=e.extracted||{},t=e.extractedBS2885||{},r=e.extractedIS13890||{},o={};try{const a=zt({...ng,...n});o.cenpeep={ok:!0,eff:a.BoilerEff,coverage:zs(n,sg)}}catch(a){o.cenpeep={ok:!1,error:a.message}}try{const a=El({...tg,...n});o.asme={ok:!0,eff:a.BoilerEff,coverage:zs(n,og)}}catch(a){o.asme={ok:!1,error:a.message}}try{const a=qs({...rg,...n});o.bee={ok:!0,eff:a.BoilerEff,coverage:zs(n,ag)}}catch(a){o.bee={ok:!1,error:a.message}}try{const a=Qp({...lc,...t});o.bs2885={ok:!0,effB:a.methodB.gross,effBnet:a.methodB.net,effA:a.methodA.gross,effAnet:a.methodA.net,coverage:{found:Object.keys(t).length,total:Object.keys(lc).length}}}catch(a){o.bs2885={ok:!1,error:a.message}}try{const a=zp({...Bp,...r});if(!a.ok)throw new Error("Not enough data to calculate");o.is13890={ok:!0,eff:a.BoilerEff,coverage:zs(r,sr)}}catch(a){o.is13890={ok:!1,error:a.message}}return o}function lg(e){const n=Math.max(0,Math.round((Date.now()-e)/1e3));if(n<60)return"just now";const t=Math.round(n/60);if(t<60)return`${t} min ago`;const r=Math.round(t/60);return r<24?`${r} hr ago`:`${Math.round(r/24)} day(s) ago`}const Fr=({cls:e,label:n,sub:t,value:r})=>s.jsxs("div",{className:"kpi-card "+e,children:[s.jsx("div",{className:"kpi-label",children:n}),s.jsx("div",{className:"kpi-value",children:r}),s.jsx("div",{className:"kpi-sub",children:t})]}),Pr=({v:e})=>s.jsxs(s.Fragment,{children:[sf(e),s.jsx("span",{className:"kpi-unit",children:"%"})]});function ig(){const e=yr();S.useEffect(()=>{document.title="Boiler Efficiency Calculator — Summary"},[]);const[n,t]=S.useState(null),[r,o]=S.useState(""),[a,l]=S.useState(null);S.useEffect(()=>{let y;try{const k=sessionStorage.getItem(Vp);if(!k)return;y=JSON.parse(k)}catch{return}if(!(!y||!y.extracted))try{const k=ic(y),C=["cenpeep","bs2885","asme","bee","is13890"].filter(P=>k[P].ok).length;t(k),o(`Auto-loaded from your last upload on the ${y.sourceTab||"another"} tab ("${y.filename||"file"}", ${lg(y.savedAt)}) — ${C}/5 methods calculated. Upload a new file above to recalculate.`)}catch{}},[]);const i=async y=>{l({cls:"loading",text:"⏳ Parsing sheet and running all five methods…"});const k=new FormData;k.append("file",y);try{const P=await(await Qe("/api/upload",{method:"POST",body:k})).json();if(!P.ok)throw new Error(P.error||"Upload failed");br(P,"Summary"),o("");const p=ic(P);t(p);const c=["cenpeep","bs2885","asme","bee","is13890"].filter(m=>p[m].ok).length;l({cls:"success",text:`✓ ${c}/5 methods calculated from "${P.filename}"`}),e(`Summary updated — ${c}/5 methods calculated`,c===5?"success":"error")}catch(C){l({cls:"error",text:`✗ ${C.message}`}),e(C.message,"error")}},u=n&&n.cenpeep,d=n&&n.bs2885,h=n&&n.asme,g=n&&n.bee,f=n&&n.is13890;return s.jsxs("div",{className:"container",children:[s.jsx(Ft,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"Summary — All Methods"}),s.jsx("div",{className:"section-line"})]}),s.jsx(vr,{description:`Upload one data sheet — CENPEEP, BS-2885, ASME-PTC 4.1, BEE and ${Ve} efficiencies are all calculated from it, each using only its own required input fields.`,onFile:i,status:a}),!n&&s.jsx("div",{id:"summary-empty",style:{textAlign:"center",padding:"60px 20px",color:"var(--muted)",fontSize:"14px"},children:"Upload a data sheet above — or upload one on any other tab and come back here — to see Boiler Efficiency computed by all five methods side by side."}),r&&s.jsx("div",{id:"summary-source-note",style:{fontSize:"12px",color:"var(--muted)",margin:"-6px 0 14px",padding:"0 4px"},children:r}),n&&s.jsxs("div",{id:"summary-results",children:[s.jsxs("div",{className:"output-summary",id:"summary-kpi-area",children:[s.jsx(Fr,{cls:"kpi-green",label:"CENPEEP",sub:u.ok?`${u.coverage.found}/${u.coverage.total} fields detected`:u.error||"Could not calculate",value:u.ok?s.jsx(Pr,{v:u.eff}):"—"}),s.jsx(Fr,{cls:"kpi-blue",label:"BS-2885 — Method B (indirect)",sub:d.ok?`Method A (direct): ${sf(d.effA)}% · ${d.coverage.found}/${d.coverage.total} fields`:d.error||"Could not calculate",value:d.ok?s.jsx(Pr,{v:d.effB}):"—"}),s.jsx(Fr,{cls:"kpi-amber",label:"ASME PTC 4.1",sub:h.ok?`${h.coverage.found}/${h.coverage.total} fields detected`:h.error||"Could not calculate",value:h.ok?s.jsx(Pr,{v:h.eff}):"—"}),s.jsx(Fr,{cls:"kpi-green",label:`${Ve} — Heat Loss Method`,sub:f.ok?`${f.coverage.found}/${f.coverage.total} fields detected`:f.error||"Could not calculate",value:f.ok?s.jsx(Pr,{v:f.eff}):"—"}),s.jsx(Fr,{cls:"kpi-red",label:"BEE-2 Indirect",sub:g.ok?`${g.coverage.found}/${g.coverage.total} fields detected`:g.error||"Could not calculate",value:g.ok?s.jsx(Pr,{v:g.eff}):"—"})]}),s.jsx("div",{id:"summary-detail-tables"})]})]})}function ug(){return s.jsx(Pt,{active:"/summary",children:s.jsx(ig,{})})}const Dr=e=>typeof e=="number"&&!isNaN(e)?e.toFixed(2):"—";function of(e){const n=new Date(e);return n.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})+"  "+n.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}const Aa=({icon:e,title:n,children:t})=>s.jsxs("div",{className:"empty-state",children:[s.jsx("div",{className:"empty-icon",children:e}),s.jsx("div",{className:"empty-title",children:n}),t!==void 0&&s.jsx("div",{className:"empty-sub",children:t})]}),Rs=({children:e=" %"})=>s.jsx("span",{style:{fontSize:"12px",fontWeight:400,color:"var(--muted2)"},children:e});function cg({s:e,onOpen:n,onDelete:t}){const r=e.results||{},o=e.sessionName||(e.sourceFile&&e.sourceFile!=="Manual Entry"?e.sourceFile:null)||`Session ${e._id.slice(-6)}`;return s.jsxs("div",{className:"session-card",onClick:()=>n(e),children:[s.jsx("button",{className:"session-card-delete",onClick:a=>t(a,e._id),children:"🗑"}),s.jsxs("div",{className:"session-card-header",children:[s.jsxs("div",{children:[s.jsx("div",{className:"session-card-title",children:o}),s.jsx("div",{className:"session-card-date",children:of(e.uploadedAt||e.createdAt)})]}),s.jsx("div",{className:"session-card-source",title:e.sourceFile||"",children:e.sourceFile||"Manual"})]}),e.boilerType&&s.jsx("div",{className:"boiler-type-badge",style:{margin:"0 0 12px",display:"inline-block"},children:e.boilerType}),s.jsxs("div",{className:"session-kpis",children:[s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Boiler Eff."}),s.jsxs("div",{className:"session-kpi-value green",children:[Dr(r.BoilerEff),s.jsx(Rs,{})]})]}),s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Corr. Eff."}),s.jsxs("div",{className:"session-kpi-value blue",children:[Dr(r.BoilerEffCorr),s.jsx(Rs,{})]})]}),s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Dry Gas Loss"}),s.jsxs("div",{className:"session-kpi-value red",children:[Dr(r.Ldg),s.jsx(Rs,{})]})]}),s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Unburnt C Loss"}),s.jsxs("div",{className:"session-kpi-value amber",children:[Dr(r.Luc),s.jsx(Rs,{})]})]})]})]})}const ve=({label:e,val:n,uom:t="",cls:r=""})=>s.jsxs("div",{className:"modal-row"+(r?" "+r:""),children:[s.jsx("span",{className:"modal-row-name",children:e}),s.jsx("span",{className:"modal-row-val",children:Dr(n)}),s.jsx("span",{className:"modal-row-uom",children:t})]});function dg({s:e,onClose:n}){const t=e.results||{};return s.jsx("div",{className:"modal-overlay open",id:"modal-overlay",onClick:r=>{r.target===r.currentTarget&&n()},children:s.jsxs("div",{className:"modal",id:"modal",children:[s.jsxs("div",{className:"modal-header",children:[s.jsx("h3",{id:"modal-title",children:e.sessionName||e.sourceFile||`Session ${e._id.slice(-6)}`}),s.jsx("button",{className:"modal-close",onClick:n,children:"✕"})]}),s.jsxs("div",{className:"modal-body",id:"modal-body",children:[s.jsxs("div",{style:{fontSize:"11px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",marginBottom:"18px"},children:["Source: ",e.sourceFile||"Manual","  |  Saved: ",of(e.uploadedAt||e.createdAt),e.boilerType?s.jsxs(s.Fragment,{children:["  |  Boiler: ",e.boilerType]}):null]}),s.jsx("div",{className:"modal-section-title",children:"Efficiency Results"}),s.jsx(ve,{label:"Boiler Efficiency (as-tested)",val:t.BoilerEff,uom:"%",cls:"modal-highlight"}),s.jsx(ve,{label:"Boiler Efficiency (corrected)",val:t.BoilerEffCorr,uom:"%",cls:"modal-highlight2"}),s.jsx("div",{className:"modal-section-title",children:"Losses"}),s.jsx(ve,{label:"Dry Gas Loss",val:t.Ldg,uom:"%"}),s.jsx(ve,{label:"Unburnt Carbon Loss",val:t.Luc,uom:"%"}),s.jsx(ve,{label:"Moisture in Fuel Loss",val:t.Lmf,uom:"%"}),s.jsx(ve,{label:"Hydrogen in Fuel Loss",val:t.Lhf,uom:"%"}),s.jsx(ve,{label:"CO Loss",val:t.Lco,uom:"%"}),s.jsx(ve,{label:"Moisture in Air Loss",val:t.Lma,uom:"%"}),s.jsx(ve,{label:"Radiation Loss",val:t.Lrad,uom:"%"}),s.jsx("div",{className:"modal-section-title",children:"Corrected Losses"}),s.jsx(ve,{label:"Dry Gas Loss (corr.)",val:t.Ldgc,uom:"%"}),s.jsx(ve,{label:"Unburnt Carbon Loss (corr.)",val:t.Lucc,uom:"%"}),s.jsx(ve,{label:"Moisture Fuel Loss (corr.)",val:t.Lmfc,uom:"%"}),s.jsx(ve,{label:"Hydrogen Fuel Loss (corr.)",val:t.Lhfc,uom:"%"}),s.jsx(ve,{label:"CO Loss (corr.)",val:t.Lcoc,uom:"%"}),s.jsx(ve,{label:"Moisture Air Loss (corr.)",val:t.Lmac,uom:"%"}),s.jsx("div",{className:"modal-section-title",children:"Intermediate Values"}),s.jsx(ve,{label:"CO₂ APH In",val:t.CO2in,uom:"%"}),s.jsx(ve,{label:"CO₂ APH Out",val:t.CO2out,uom:"%"}),s.jsx(ve,{label:"Weighted Air Temp In",val:t.Trai,uom:"°C"}),s.jsx(ve,{label:"AH Leakage",val:t.AL,uom:"%"}),s.jsx(ve,{label:"Gas Temp (Corrected)",val:t.Tgc,uom:"°C"}),e.inputs&&e.inputs.length>0&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"modal-section-title",children:"Input Parameters"}),e.inputs.map((r,o)=>s.jsx(ve,{label:r.label||r.id,val:parseFloat(r.value)},o))]})]})]})})}function pg(){S.useEffect(()=>{document.title="Boiler Efficiency — Sessions"},[]);const[e,n]=S.useState({phase:"loading",sessions:[],error:""}),[t,r]=S.useState(null),o=S.useCallback(async()=>{n(h=>({...h,phase:"loading"}));try{const g=await(await Qe("/api/sessions")).json();if(!g.ok)throw new Error(g.error);n({phase:"ready",sessions:g.sessions,error:""})}catch(h){n({phase:"error",sessions:[],error:h.message})}},[]);S.useEffect(()=>{o()},[o]),S.useEffect(()=>{const h=g=>{g.key==="Escape"&&r(null)};return document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h)},[]);const a=async(h,g)=>{if(h.stopPropagation(),!!window.confirm("Delete this session?"))try{await Qe(`/api/sessions/${g}`,{method:"DELETE"}),o()}catch{}},{phase:l,sessions:i,error:u}=e,d=l==="ready"?i.length===1?"1 session":`${i.length} sessions`:"—";return s.jsxs(s.Fragment,{children:[t&&s.jsx(dg,{s:t,onClose:()=>r(null)}),s.jsxs("div",{className:"container",children:[s.jsx(Ft,{}),s.jsxs("div",{className:"sessions-header",children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[s.jsx("h2",{children:"Saved Sessions"}),s.jsx("span",{className:"sessions-count",id:"sessions-count",children:d})]}),s.jsx("button",{className:"btn btn-ghost",onClick:o,style:{fontSize:"12px",padding:"8px 16px"},children:"↻ Refresh"})]}),s.jsxs("div",{id:"sessions-content",children:[l==="loading"&&s.jsx(Aa,{icon:"⏳",title:"Loading sessions…",children:"Fetching data from the database."}),l==="error"&&s.jsxs(Aa,{icon:"⚠️",title:"Could not load sessions",children:[u,s.jsx("br",{}),s.jsx("br",{}),"Make sure the server is running and MongoDB URI is configured in ",s.jsx("code",{children:".env"}),"."]}),l==="ready"&&!i.length&&s.jsx(Aa,{icon:"📋",title:"No sessions yet",children:'Run a calculation and click "Save to Database" to store a session here.'}),l==="ready"&&i.length>0&&s.jsx("div",{className:"session-grid",id:"session-grid",children:i.map(h=>s.jsx(cg,{s:h,onOpen:r,onDelete:a},h._id))})]})]})]})}function fg(){return s.jsx(Pt,{active:"/sessions",children:s.jsx(pg,{})})}const mg={"/calculator":Lh,"/bs-2885":Oh,"/asme-ptc-4-1":zh,"/bee":Xh,"/is-13890":eg,"/summary":ug,"/sessions":fg};function hg(){const e=$0(),n=mg[e],t=_0();return S.useEffect(()=>{n&&!t&&Tp("/")},[n,t]),n?t?s.jsx(n,{},e):null:s.jsx(eh,{})}wp(document.getElementById("root")).render(s.jsx(hg,{}));
