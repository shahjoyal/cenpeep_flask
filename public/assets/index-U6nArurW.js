(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();var Yu={exports:{}},xo={},Ku={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qr=Symbol.for("react.element"),$p=Symbol.for("react.portal"),Hp=Symbol.for("react.fragment"),Gp=Symbol.for("react.strict_mode"),Wp=Symbol.for("react.profiler"),Qp=Symbol.for("react.provider"),Jp=Symbol.for("react.context"),Yp=Symbol.for("react.forward_ref"),Kp=Symbol.for("react.suspense"),Xp=Symbol.for("react.memo"),Zp=Symbol.for("react.lazy"),Ei=Symbol.iterator;function qp(e){return e===null||typeof e!="object"?null:(e=Ei&&e[Ei]||e["@@iterator"],typeof e=="function"?e:null)}var Xu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Zu=Object.assign,qu={};function sr(e,n,t){this.props=e,this.context=n,this.refs=qu,this.updater=t||Xu}sr.prototype.isReactComponent={};sr.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};sr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ec(){}ec.prototype=sr.prototype;function vl(e,n,t){this.props=e,this.context=n,this.refs=qu,this.updater=t||Xu}var xl=vl.prototype=new ec;xl.constructor=vl;Zu(xl,sr.prototype);xl.isPureReactComponent=!0;var Li=Array.isArray,nc=Object.prototype.hasOwnProperty,bl={current:null},tc={key:!0,ref:!0,__self:!0,__source:!0};function rc(e,n,t){var r,s={},a=null,l=null;if(n!=null)for(r in n.ref!==void 0&&(l=n.ref),n.key!==void 0&&(a=""+n.key),n)nc.call(n,r)&&!tc.hasOwnProperty(r)&&(s[r]=n[r]);var i=arguments.length-2;if(i===1)s.children=t;else if(1<i){for(var u=Array(i),d=0;d<i;d++)u[d]=arguments[d+2];s.children=u}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)s[r]===void 0&&(s[r]=i[r]);return{$$typeof:qr,type:e,key:a,ref:l,props:s,_owner:bl.current}}function ef(e,n){return{$$typeof:qr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function kl(e){return typeof e=="object"&&e!==null&&e.$$typeof===qr}function nf(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Ai=/\/+/g;function Uo(e,n){return typeof e=="object"&&e!==null&&e.key!=null?nf(""+e.key):n.toString(36)}function Ts(e,n,t,r,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case qr:case $p:l=!0}}if(l)return l=e,s=s(l),e=r===""?"."+Uo(l,0):r,Li(s)?(t="",e!=null&&(t=e.replace(Ai,"$&/")+"/"),Ts(s,n,t,"",function(d){return d})):s!=null&&(kl(s)&&(s=ef(s,t+(!s.key||l&&l.key===s.key?"":(""+s.key).replace(Ai,"$&/")+"/")+e)),n.push(s)),1;if(l=0,r=r===""?".":r+":",Li(e))for(var i=0;i<e.length;i++){a=e[i];var u=r+Uo(a,i);l+=Ts(a,n,t,u,s)}else if(u=qp(e),typeof u=="function")for(e=u.call(e),i=0;!(a=e.next()).done;)a=a.value,u=r+Uo(a,i++),l+=Ts(a,n,t,u,s);else if(a==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return l}function us(e,n,t){if(e==null)return e;var r=[],s=0;return Ts(e,r,"","",function(a){return n.call(t,a,s++)}),r}function tf(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var De={current:null},Os={transition:null},rf={ReactCurrentDispatcher:De,ReactCurrentBatchConfig:Os,ReactCurrentOwner:bl};function sc(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:us,forEach:function(e,n,t){us(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return us(e,function(){n++}),n},toArray:function(e){return us(e,function(n){return n})||[]},only:function(e){if(!kl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Q.Component=sr;Q.Fragment=Hp;Q.Profiler=Wp;Q.PureComponent=vl;Q.StrictMode=Gp;Q.Suspense=Kp;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rf;Q.act=sc;Q.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Zu({},e.props),s=e.key,a=e.ref,l=e._owner;if(n!=null){if(n.ref!==void 0&&(a=n.ref,l=bl.current),n.key!==void 0&&(s=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(u in n)nc.call(n,u)&&!tc.hasOwnProperty(u)&&(r[u]=n[u]===void 0&&i!==void 0?i[u]:n[u])}var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){i=Array(u);for(var d=0;d<u;d++)i[d]=arguments[d+2];r.children=i}return{$$typeof:qr,type:e.type,key:s,ref:a,props:r,_owner:l}};Q.createContext=function(e){return e={$$typeof:Jp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Qp,_context:e},e.Consumer=e};Q.createElement=rc;Q.createFactory=function(e){var n=rc.bind(null,e);return n.type=e,n};Q.createRef=function(){return{current:null}};Q.forwardRef=function(e){return{$$typeof:Yp,render:e}};Q.isValidElement=kl;Q.lazy=function(e){return{$$typeof:Zp,_payload:{_status:-1,_result:e},_init:tf}};Q.memo=function(e,n){return{$$typeof:Xp,type:e,compare:n===void 0?null:n}};Q.startTransition=function(e){var n=Os.transition;Os.transition={};try{e()}finally{Os.transition=n}};Q.unstable_act=sc;Q.useCallback=function(e,n){return De.current.useCallback(e,n)};Q.useContext=function(e){return De.current.useContext(e)};Q.useDebugValue=function(){};Q.useDeferredValue=function(e){return De.current.useDeferredValue(e)};Q.useEffect=function(e,n){return De.current.useEffect(e,n)};Q.useId=function(){return De.current.useId()};Q.useImperativeHandle=function(e,n,t){return De.current.useImperativeHandle(e,n,t)};Q.useInsertionEffect=function(e,n){return De.current.useInsertionEffect(e,n)};Q.useLayoutEffect=function(e,n){return De.current.useLayoutEffect(e,n)};Q.useMemo=function(e,n){return De.current.useMemo(e,n)};Q.useReducer=function(e,n,t){return De.current.useReducer(e,n,t)};Q.useRef=function(e){return De.current.useRef(e)};Q.useState=function(e){return De.current.useState(e)};Q.useSyncExternalStore=function(e,n,t){return De.current.useSyncExternalStore(e,n,t)};Q.useTransition=function(){return De.current.useTransition()};Q.version="18.3.1";Ku.exports=Q;var E=Ku.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sf=E,of=Symbol.for("react.element"),af=Symbol.for("react.fragment"),lf=Object.prototype.hasOwnProperty,uf=sf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,cf={key:!0,ref:!0,__self:!0,__source:!0};function oc(e,n,t){var r,s={},a=null,l=null;t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(l=n.ref);for(r in n)lf.call(n,r)&&!cf.hasOwnProperty(r)&&(s[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)s[r]===void 0&&(s[r]=n[r]);return{$$typeof:of,type:e,key:a,ref:l,props:s,_owner:uf.current}}xo.Fragment=af;xo.jsx=oc;xo.jsxs=oc;Yu.exports=xo;var o=Yu.exports,ac={exports:{}},Ze={},lc={exports:{}},ic={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(T,D){var H=T.length;T.push(D);e:for(;0<H;){var S=H-1>>>1,P=T[S];if(0<s(P,D))T[S]=D,T[H]=P,H=S;else break e}}function t(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var D=T[0],H=T.pop();if(H!==D){T[0]=H;e:for(var S=0,P=T.length,X=P>>>1;S<X;){var U=2*(S+1)-1,y=T[U],M=U+1,G=T[M];if(0>s(y,H))M<P&&0>s(G,y)?(T[S]=G,T[M]=H,S=M):(T[S]=y,T[U]=H,S=U);else if(M<P&&0>s(G,H))T[S]=G,T[M]=H,S=M;else break e}}return D}function s(T,D){var H=T.sortIndex-D.sortIndex;return H!==0?H:T.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,i=l.now();e.unstable_now=function(){return l.now()-i}}var u=[],d=[],h=1,g=null,p=3,x=!1,k=!1,w=!1,F=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(T){for(var D=t(d);D!==null;){if(D.callback===null)r(d);else if(D.startTime<=T)r(d),D.sortIndex=D.expirationTime,n(u,D);else break;D=t(d)}}function b(T){if(w=!1,m(T),!k)if(t(u)!==null)k=!0,le(N);else{var D=t(d);D!==null&&Z(b,D.startTime-T)}}function N(T,D){k=!1,w&&(w=!1,f(j),j=-1),x=!0;var H=p;try{for(m(D),g=t(u);g!==null&&(!(g.expirationTime>D)||T&&!W());){var S=g.callback;if(typeof S=="function"){g.callback=null,p=g.priorityLevel;var P=S(g.expirationTime<=D);D=e.unstable_now(),typeof P=="function"?g.callback=P:g===t(u)&&r(u),m(D)}else r(u);g=t(u)}if(g!==null)var X=!0;else{var U=t(d);U!==null&&Z(b,U.startTime-D),X=!1}return X}finally{g=null,p=H,x=!1}}var A=!1,C=null,j=-1,_=5,I=-1;function W(){return!(e.unstable_now()-I<_)}function J(){if(C!==null){var T=e.unstable_now();I=T;var D=!0;try{D=C(!0,T)}finally{D?Y():(A=!1,C=null)}}else A=!1}var Y;if(typeof c=="function")Y=function(){c(J)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,ae=K.port2;K.port1.onmessage=J,Y=function(){ae.postMessage(null)}}else Y=function(){F(J,0)};function le(T){C=T,A||(A=!0,Y())}function Z(T,D){j=F(function(){T(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){k||x||(k=!0,le(N))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return t(u)},e.unstable_next=function(T){switch(p){case 1:case 2:case 3:var D=3;break;default:D=p}var H=p;p=D;try{return T()}finally{p=H}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,D){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var H=p;p=T;try{return D()}finally{p=H}},e.unstable_scheduleCallback=function(T,D,H){var S=e.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?S+H:S):H=S,T){case 1:var P=-1;break;case 2:P=250;break;case 5:P=1073741823;break;case 4:P=1e4;break;default:P=5e3}return P=H+P,T={id:h++,callback:D,priorityLevel:T,startTime:H,expirationTime:P,sortIndex:-1},H>S?(T.sortIndex=H,n(d,T),t(u)===null&&T===t(d)&&(w?(f(j),j=-1):w=!0,Z(b,H-S))):(T.sortIndex=P,n(u,T),k||x||(k=!0,le(N))),T},e.unstable_shouldYield=W,e.unstable_wrapCallback=function(T){var D=p;return function(){var H=p;p=D;try{return T.apply(this,arguments)}finally{p=H}}}})(ic);lc.exports=ic;var df=lc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pf=E,Xe=df;function L(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var uc=new Set,Fr={};function jt(e,n){Kt(e,n),Kt(e+"Capture",n)}function Kt(e,n){for(Fr[e]=n,e=0;e<n.length;e++)uc.add(n[e])}var Mn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ba=Object.prototype.hasOwnProperty,ff=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ti={},Oi={};function mf(e){return ba.call(Oi,e)?!0:ba.call(Ti,e)?!1:ff.test(e)?Oi[e]=!0:(Ti[e]=!0,!1)}function hf(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function gf(e,n,t,r){if(n===null||typeof n>"u"||hf(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ze(e,n,t,r,s,a,l){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=a,this.removeEmptyString=l}var Te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Te[e]=new ze(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];Te[n]=new ze(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Te[e]=new ze(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Te[e]=new ze(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Te[e]=new ze(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Te[e]=new ze(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Te[e]=new ze(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Te[e]=new ze(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Te[e]=new ze(e,5,!1,e.toLowerCase(),null,!1,!1)});var wl=/[\-:]([a-z])/g;function Cl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(wl,Cl);Te[n]=new ze(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(wl,Cl);Te[n]=new ze(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(wl,Cl);Te[n]=new ze(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Te[e]=new ze(e,1,!1,e.toLowerCase(),null,!1,!1)});Te.xlinkHref=new ze("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Te[e]=new ze(e,1,!1,e.toLowerCase(),null,!0,!0)});function jl(e,n,t,r){var s=Te.hasOwnProperty(n)?Te[n]:null;(s!==null?s.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(gf(n,t,s,r)&&(t=null),r||s===null?mf(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):s.mustUseProperty?e[s.propertyName]=t===null?s.type===3?!1:"":t:(n=s.attributeName,r=s.attributeNamespace,t===null?e.removeAttribute(n):(s=s.type,t=s===3||s===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Dn=pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,cs=Symbol.for("react.element"),Ot=Symbol.for("react.portal"),Pt=Symbol.for("react.fragment"),Sl=Symbol.for("react.strict_mode"),ka=Symbol.for("react.profiler"),cc=Symbol.for("react.provider"),dc=Symbol.for("react.context"),Nl=Symbol.for("react.forward_ref"),wa=Symbol.for("react.suspense"),Ca=Symbol.for("react.suspense_list"),El=Symbol.for("react.memo"),$n=Symbol.for("react.lazy"),pc=Symbol.for("react.offscreen"),Pi=Symbol.iterator;function dr(e){return e===null||typeof e!="object"?null:(e=Pi&&e[Pi]||e["@@iterator"],typeof e=="function"?e:null)}var fe=Object.assign,Vo;function xr(e){if(Vo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Vo=n&&n[1]||""}return`
`+Vo+e}var $o=!1;function Ho(e,n){if(!e||$o)return"";$o=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(d){var r=d}Reflect.construct(e,[],n)}else{try{n.call()}catch(d){r=d}e.call(n.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),a=r.stack.split(`
`),l=s.length-1,i=a.length-1;1<=l&&0<=i&&s[l]!==a[i];)i--;for(;1<=l&&0<=i;l--,i--)if(s[l]!==a[i]){if(l!==1||i!==1)do if(l--,i--,0>i||s[l]!==a[i]){var u=`
`+s[l].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=l&&0<=i);break}}}finally{$o=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?xr(e):""}function yf(e){switch(e.tag){case 5:return xr(e.type);case 16:return xr("Lazy");case 13:return xr("Suspense");case 19:return xr("SuspenseList");case 0:case 2:case 15:return e=Ho(e.type,!1),e;case 11:return e=Ho(e.type.render,!1),e;case 1:return e=Ho(e.type,!0),e;default:return""}}function ja(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Pt:return"Fragment";case Ot:return"Portal";case ka:return"Profiler";case Sl:return"StrictMode";case wa:return"Suspense";case Ca:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case dc:return(e.displayName||"Context")+".Consumer";case cc:return(e._context.displayName||"Context")+".Provider";case Nl:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case El:return n=e.displayName||null,n!==null?n:ja(e.type)||"Memo";case $n:n=e._payload,e=e._init;try{return ja(e(n))}catch{}}return null}function vf(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ja(n);case 8:return n===Sl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function rt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function fc(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function xf(e){var n=fc(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var s=t.get,a=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return s.call(this)},set:function(l){r=""+l,a.call(this,l)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function ds(e){e._valueTracker||(e._valueTracker=xf(e))}function mc(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=fc(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function $s(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Sa(e,n){var t=n.checked;return fe({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Fi(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=rt(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function hc(e,n){n=n.checked,n!=null&&jl(e,"checked",n,!1)}function Na(e,n){hc(e,n);var t=rt(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Ea(e,n.type,t):n.hasOwnProperty("defaultValue")&&Ea(e,n.type,rt(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Mi(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Ea(e,n,t){(n!=="number"||$s(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var br=Array.isArray;function $t(e,n,t,r){if(e=e.options,n){n={};for(var s=0;s<t.length;s++)n["$"+t[s]]=!0;for(t=0;t<e.length;t++)s=n.hasOwnProperty("$"+e[t].value),e[t].selected!==s&&(e[t].selected=s),s&&r&&(e[t].defaultSelected=!0)}else{for(t=""+rt(t),n=null,s=0;s<e.length;s++){if(e[s].value===t){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}n!==null||e[s].disabled||(n=e[s])}n!==null&&(n.selected=!0)}}function La(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(L(91));return fe({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ii(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(L(92));if(br(t)){if(1<t.length)throw Error(L(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:rt(t)}}function gc(e,n){var t=rt(n.value),r=rt(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function _i(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function yc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Aa(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?yc(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ps,vc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,s){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,s)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(ps=ps||document.createElement("div"),ps.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=ps.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Mr(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var jr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},bf=["Webkit","ms","Moz","O"];Object.keys(jr).forEach(function(e){bf.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),jr[n]=jr[e]})});function xc(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||jr.hasOwnProperty(e)&&jr[e]?(""+n).trim():n+"px"}function bc(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,s=xc(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,s):e[t]=s}}var kf=fe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ta(e,n){if(n){if(kf[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(L(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(L(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(L(61))}if(n.style!=null&&typeof n.style!="object")throw Error(L(62))}}function Oa(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pa=null;function Ll(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Fa=null,Ht=null,Gt=null;function Bi(e){if(e=ts(e)){if(typeof Fa!="function")throw Error(L(280));var n=e.stateNode;n&&(n=jo(n),Fa(e.stateNode,e.type,n))}}function kc(e){Ht?Gt?Gt.push(e):Gt=[e]:Ht=e}function wc(){if(Ht){var e=Ht,n=Gt;if(Gt=Ht=null,Bi(e),n)for(e=0;e<n.length;e++)Bi(n[e])}}function Cc(e,n){return e(n)}function jc(){}var Go=!1;function Sc(e,n,t){if(Go)return e(n,t);Go=!0;try{return Cc(e,n,t)}finally{Go=!1,(Ht!==null||Gt!==null)&&(jc(),wc())}}function Ir(e,n){var t=e.stateNode;if(t===null)return null;var r=jo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(L(231,n,typeof t));return t}var Ma=!1;if(Mn)try{var pr={};Object.defineProperty(pr,"passive",{get:function(){Ma=!0}}),window.addEventListener("test",pr,pr),window.removeEventListener("test",pr,pr)}catch{Ma=!1}function wf(e,n,t,r,s,a,l,i,u){var d=Array.prototype.slice.call(arguments,3);try{n.apply(t,d)}catch(h){this.onError(h)}}var Sr=!1,Hs=null,Gs=!1,Ia=null,Cf={onError:function(e){Sr=!0,Hs=e}};function jf(e,n,t,r,s,a,l,i,u){Sr=!1,Hs=null,wf.apply(Cf,arguments)}function Sf(e,n,t,r,s,a,l,i,u){if(jf.apply(this,arguments),Sr){if(Sr){var d=Hs;Sr=!1,Hs=null}else throw Error(L(198));Gs||(Gs=!0,Ia=d)}}function St(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Nc(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Di(e){if(St(e)!==e)throw Error(L(188))}function Nf(e){var n=e.alternate;if(!n){if(n=St(e),n===null)throw Error(L(188));return n!==e?null:e}for(var t=e,r=n;;){var s=t.return;if(s===null)break;var a=s.alternate;if(a===null){if(r=s.return,r!==null){t=r;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===t)return Di(s),e;if(a===r)return Di(s),n;a=a.sibling}throw Error(L(188))}if(t.return!==r.return)t=s,r=a;else{for(var l=!1,i=s.child;i;){if(i===t){l=!0,t=s,r=a;break}if(i===r){l=!0,r=s,t=a;break}i=i.sibling}if(!l){for(i=a.child;i;){if(i===t){l=!0,t=a,r=s;break}if(i===r){l=!0,r=a,t=s;break}i=i.sibling}if(!l)throw Error(L(189))}}if(t.alternate!==r)throw Error(L(190))}if(t.tag!==3)throw Error(L(188));return t.stateNode.current===t?e:n}function Ec(e){return e=Nf(e),e!==null?Lc(e):null}function Lc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Lc(e);if(n!==null)return n;e=e.sibling}return null}var Ac=Xe.unstable_scheduleCallback,zi=Xe.unstable_cancelCallback,Ef=Xe.unstable_shouldYield,Lf=Xe.unstable_requestPaint,xe=Xe.unstable_now,Af=Xe.unstable_getCurrentPriorityLevel,Al=Xe.unstable_ImmediatePriority,Tc=Xe.unstable_UserBlockingPriority,Ws=Xe.unstable_NormalPriority,Tf=Xe.unstable_LowPriority,Oc=Xe.unstable_IdlePriority,bo=null,jn=null;function Of(e){if(jn&&typeof jn.onCommitFiberRoot=="function")try{jn.onCommitFiberRoot(bo,e,void 0,(e.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:Mf,Pf=Math.log,Ff=Math.LN2;function Mf(e){return e>>>=0,e===0?32:31-(Pf(e)/Ff|0)|0}var fs=64,ms=4194304;function kr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Qs(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,s=e.suspendedLanes,a=e.pingedLanes,l=t&268435455;if(l!==0){var i=l&~s;i!==0?r=kr(i):(a&=l,a!==0&&(r=kr(a)))}else l=t&~s,l!==0?r=kr(l):a!==0&&(r=kr(a));if(r===0)return 0;if(n!==0&&n!==r&&!(n&s)&&(s=r&-r,a=n&-n,s>=a||s===16&&(a&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-yn(n),s=1<<t,r|=e[t],n&=~s;return r}function If(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _f(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-yn(a),i=1<<l,u=s[l];u===-1?(!(i&t)||i&r)&&(s[l]=If(i,n)):u<=n&&(e.expiredLanes|=i),a&=~i}}function _a(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Pc(){var e=fs;return fs<<=1,!(fs&4194240)&&(fs=64),e}function Wo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function es(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-yn(n),e[n]=t}function Bf(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var s=31-yn(t),a=1<<s;n[s]=0,r[s]=-1,e[s]=-1,t&=~a}}function Tl(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-yn(t),s=1<<r;s&n|e[r]&n&&(e[r]|=n),t&=~s}}var re=0;function Fc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Mc,Ol,Ic,_c,Bc,Ba=!1,hs=[],Yn=null,Kn=null,Xn=null,_r=new Map,Br=new Map,Gn=[],Df="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ri(e,n){switch(e){case"focusin":case"focusout":Yn=null;break;case"dragenter":case"dragleave":Kn=null;break;case"mouseover":case"mouseout":Xn=null;break;case"pointerover":case"pointerout":_r.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Br.delete(n.pointerId)}}function fr(e,n,t,r,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:a,targetContainers:[s]},n!==null&&(n=ts(n),n!==null&&Ol(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,s!==null&&n.indexOf(s)===-1&&n.push(s),e)}function zf(e,n,t,r,s){switch(n){case"focusin":return Yn=fr(Yn,e,n,t,r,s),!0;case"dragenter":return Kn=fr(Kn,e,n,t,r,s),!0;case"mouseover":return Xn=fr(Xn,e,n,t,r,s),!0;case"pointerover":var a=s.pointerId;return _r.set(a,fr(_r.get(a)||null,e,n,t,r,s)),!0;case"gotpointercapture":return a=s.pointerId,Br.set(a,fr(Br.get(a)||null,e,n,t,r,s)),!0}return!1}function Dc(e){var n=mt(e.target);if(n!==null){var t=St(n);if(t!==null){if(n=t.tag,n===13){if(n=Nc(t),n!==null){e.blockedOn=n,Bc(e.priority,function(){Ic(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ps(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Da(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);Pa=r,t.target.dispatchEvent(r),Pa=null}else return n=ts(t),n!==null&&Ol(n),e.blockedOn=t,!1;n.shift()}return!0}function Ui(e,n,t){Ps(e)&&t.delete(n)}function Rf(){Ba=!1,Yn!==null&&Ps(Yn)&&(Yn=null),Kn!==null&&Ps(Kn)&&(Kn=null),Xn!==null&&Ps(Xn)&&(Xn=null),_r.forEach(Ui),Br.forEach(Ui)}function mr(e,n){e.blockedOn===n&&(e.blockedOn=null,Ba||(Ba=!0,Xe.unstable_scheduleCallback(Xe.unstable_NormalPriority,Rf)))}function Dr(e){function n(s){return mr(s,e)}if(0<hs.length){mr(hs[0],e);for(var t=1;t<hs.length;t++){var r=hs[t];r.blockedOn===e&&(r.blockedOn=null)}}for(Yn!==null&&mr(Yn,e),Kn!==null&&mr(Kn,e),Xn!==null&&mr(Xn,e),_r.forEach(n),Br.forEach(n),t=0;t<Gn.length;t++)r=Gn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<Gn.length&&(t=Gn[0],t.blockedOn===null);)Dc(t),t.blockedOn===null&&Gn.shift()}var Wt=Dn.ReactCurrentBatchConfig,Js=!0;function Uf(e,n,t,r){var s=re,a=Wt.transition;Wt.transition=null;try{re=1,Pl(e,n,t,r)}finally{re=s,Wt.transition=a}}function Vf(e,n,t,r){var s=re,a=Wt.transition;Wt.transition=null;try{re=4,Pl(e,n,t,r)}finally{re=s,Wt.transition=a}}function Pl(e,n,t,r){if(Js){var s=Da(e,n,t,r);if(s===null)ta(e,n,r,Ys,t),Ri(e,r);else if(zf(s,e,n,t,r))r.stopPropagation();else if(Ri(e,r),n&4&&-1<Df.indexOf(e)){for(;s!==null;){var a=ts(s);if(a!==null&&Mc(a),a=Da(e,n,t,r),a===null&&ta(e,n,r,Ys,t),a===s)break;s=a}s!==null&&r.stopPropagation()}else ta(e,n,r,null,t)}}var Ys=null;function Da(e,n,t,r){if(Ys=null,e=Ll(r),e=mt(e),e!==null)if(n=St(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Nc(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Ys=e,null}function zc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Af()){case Al:return 1;case Tc:return 4;case Ws:case Tf:return 16;case Oc:return 536870912;default:return 16}default:return 16}}var Qn=null,Fl=null,Fs=null;function Rc(){if(Fs)return Fs;var e,n=Fl,t=n.length,r,s="value"in Qn?Qn.value:Qn.textContent,a=s.length;for(e=0;e<t&&n[e]===s[e];e++);var l=t-e;for(r=1;r<=l&&n[t-r]===s[a-r];r++);return Fs=s.slice(e,1<r?1-r:void 0)}function Ms(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function gs(){return!0}function Vi(){return!1}function qe(e){function n(t,r,s,a,l){this._reactName=t,this._targetInst=s,this.type=r,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(a):a[i]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?gs:Vi,this.isPropagationStopped=Vi,this}return fe(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=gs)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=gs)},persist:function(){},isPersistent:gs}),n}var or={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ml=qe(or),ns=fe({},or,{view:0,detail:0}),$f=qe(ns),Qo,Jo,hr,ko=fe({},ns,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Il,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==hr&&(hr&&e.type==="mousemove"?(Qo=e.screenX-hr.screenX,Jo=e.screenY-hr.screenY):Jo=Qo=0,hr=e),Qo)},movementY:function(e){return"movementY"in e?e.movementY:Jo}}),$i=qe(ko),Hf=fe({},ko,{dataTransfer:0}),Gf=qe(Hf),Wf=fe({},ns,{relatedTarget:0}),Yo=qe(Wf),Qf=fe({},or,{animationName:0,elapsedTime:0,pseudoElement:0}),Jf=qe(Qf),Yf=fe({},or,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Kf=qe(Yf),Xf=fe({},or,{data:0}),Hi=qe(Xf),Zf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},em={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nm(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=em[e])?!!n[e]:!1}function Il(){return nm}var tm=fe({},ns,{key:function(e){if(e.key){var n=Zf[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Ms(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?qf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Il,charCode:function(e){return e.type==="keypress"?Ms(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ms(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),rm=qe(tm),sm=fe({},ko,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gi=qe(sm),om=fe({},ns,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Il}),am=qe(om),lm=fe({},or,{propertyName:0,elapsedTime:0,pseudoElement:0}),im=qe(lm),um=fe({},ko,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),cm=qe(um),dm=[9,13,27,32],_l=Mn&&"CompositionEvent"in window,Nr=null;Mn&&"documentMode"in document&&(Nr=document.documentMode);var pm=Mn&&"TextEvent"in window&&!Nr,Uc=Mn&&(!_l||Nr&&8<Nr&&11>=Nr),Wi=" ",Qi=!1;function Vc(e,n){switch(e){case"keyup":return dm.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $c(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ft=!1;function fm(e,n){switch(e){case"compositionend":return $c(n);case"keypress":return n.which!==32?null:(Qi=!0,Wi);case"textInput":return e=n.data,e===Wi&&Qi?null:e;default:return null}}function mm(e,n){if(Ft)return e==="compositionend"||!_l&&Vc(e,n)?(e=Rc(),Fs=Fl=Qn=null,Ft=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Uc&&n.locale!=="ko"?null:n.data;default:return null}}var hm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ji(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!hm[e.type]:n==="textarea"}function Hc(e,n,t,r){kc(r),n=Ks(n,"onChange"),0<n.length&&(t=new Ml("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Er=null,zr=null;function gm(e){nd(e,0)}function wo(e){var n=_t(e);if(mc(n))return e}function ym(e,n){if(e==="change")return n}var Gc=!1;if(Mn){var Ko;if(Mn){var Xo="oninput"in document;if(!Xo){var Yi=document.createElement("div");Yi.setAttribute("oninput","return;"),Xo=typeof Yi.oninput=="function"}Ko=Xo}else Ko=!1;Gc=Ko&&(!document.documentMode||9<document.documentMode)}function Ki(){Er&&(Er.detachEvent("onpropertychange",Wc),zr=Er=null)}function Wc(e){if(e.propertyName==="value"&&wo(zr)){var n=[];Hc(n,zr,e,Ll(e)),Sc(gm,n)}}function vm(e,n,t){e==="focusin"?(Ki(),Er=n,zr=t,Er.attachEvent("onpropertychange",Wc)):e==="focusout"&&Ki()}function xm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return wo(zr)}function bm(e,n){if(e==="click")return wo(n)}function km(e,n){if(e==="input"||e==="change")return wo(n)}function wm(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var xn=typeof Object.is=="function"?Object.is:wm;function Rr(e,n){if(xn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var s=t[r];if(!ba.call(n,s)||!xn(e[s],n[s]))return!1}return!0}function Xi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zi(e,n){var t=Xi(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Xi(t)}}function Qc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Qc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Jc(){for(var e=window,n=$s();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=$s(e.document)}return n}function Bl(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Cm(e){var n=Jc(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Qc(t.ownerDocument.documentElement,t)){if(r!==null&&Bl(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var s=t.textContent.length,a=Math.min(r.start,s);r=r.end===void 0?a:Math.min(r.end,s),!e.extend&&a>r&&(s=r,r=a,a=s),s=Zi(t,a);var l=Zi(t,r);s&&l&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(n=n.createRange(),n.setStart(s.node,s.offset),e.removeAllRanges(),a>r?(e.addRange(n),e.extend(l.node,l.offset)):(n.setEnd(l.node,l.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var jm=Mn&&"documentMode"in document&&11>=document.documentMode,Mt=null,za=null,Lr=null,Ra=!1;function qi(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ra||Mt==null||Mt!==$s(r)||(r=Mt,"selectionStart"in r&&Bl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Lr&&Rr(Lr,r)||(Lr=r,r=Ks(za,"onSelect"),0<r.length&&(n=new Ml("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Mt)))}function ys(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var It={animationend:ys("Animation","AnimationEnd"),animationiteration:ys("Animation","AnimationIteration"),animationstart:ys("Animation","AnimationStart"),transitionend:ys("Transition","TransitionEnd")},Zo={},Yc={};Mn&&(Yc=document.createElement("div").style,"AnimationEvent"in window||(delete It.animationend.animation,delete It.animationiteration.animation,delete It.animationstart.animation),"TransitionEvent"in window||delete It.transitionend.transition);function Co(e){if(Zo[e])return Zo[e];if(!It[e])return e;var n=It[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Yc)return Zo[e]=n[t];return e}var Kc=Co("animationend"),Xc=Co("animationiteration"),Zc=Co("animationstart"),qc=Co("transitionend"),ed=new Map,eu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ot(e,n){ed.set(e,n),jt(n,[e])}for(var qo=0;qo<eu.length;qo++){var ea=eu[qo],Sm=ea.toLowerCase(),Nm=ea[0].toUpperCase()+ea.slice(1);ot(Sm,"on"+Nm)}ot(Kc,"onAnimationEnd");ot(Xc,"onAnimationIteration");ot(Zc,"onAnimationStart");ot("dblclick","onDoubleClick");ot("focusin","onFocus");ot("focusout","onBlur");ot(qc,"onTransitionEnd");Kt("onMouseEnter",["mouseout","mouseover"]);Kt("onMouseLeave",["mouseout","mouseover"]);Kt("onPointerEnter",["pointerout","pointerover"]);Kt("onPointerLeave",["pointerout","pointerover"]);jt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));jt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));jt("onBeforeInput",["compositionend","keypress","textInput","paste"]);jt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));jt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));jt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Em=new Set("cancel close invalid load scroll toggle".split(" ").concat(wr));function nu(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Sf(r,n,void 0,e),e.currentTarget=null}function nd(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],s=r.event;r=r.listeners;e:{var a=void 0;if(n)for(var l=r.length-1;0<=l;l--){var i=r[l],u=i.instance,d=i.currentTarget;if(i=i.listener,u!==a&&s.isPropagationStopped())break e;nu(s,i,d),a=u}else for(l=0;l<r.length;l++){if(i=r[l],u=i.instance,d=i.currentTarget,i=i.listener,u!==a&&s.isPropagationStopped())break e;nu(s,i,d),a=u}}}if(Gs)throw e=Ia,Gs=!1,Ia=null,e}function ie(e,n){var t=n[Ga];t===void 0&&(t=n[Ga]=new Set);var r=e+"__bubble";t.has(r)||(td(n,e,2,!1),t.add(r))}function na(e,n,t){var r=0;n&&(r|=4),td(t,e,r,n)}var vs="_reactListening"+Math.random().toString(36).slice(2);function Ur(e){if(!e[vs]){e[vs]=!0,uc.forEach(function(t){t!=="selectionchange"&&(Em.has(t)||na(t,!1,e),na(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[vs]||(n[vs]=!0,na("selectionchange",!1,n))}}function td(e,n,t,r){switch(zc(n)){case 1:var s=Uf;break;case 4:s=Vf;break;default:s=Pl}t=s.bind(null,n,t,e),s=void 0,!Ma||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(n,t,{capture:!0,passive:s}):e.addEventListener(n,t,!0):s!==void 0?e.addEventListener(n,t,{passive:s}):e.addEventListener(n,t,!1)}function ta(e,n,t,r,s){var a=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var i=r.stateNode.containerInfo;if(i===s||i.nodeType===8&&i.parentNode===s)break;if(l===4)for(l=r.return;l!==null;){var u=l.tag;if((u===3||u===4)&&(u=l.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;l=l.return}for(;i!==null;){if(l=mt(i),l===null)return;if(u=l.tag,u===5||u===6){r=a=l;continue e}i=i.parentNode}}r=r.return}Sc(function(){var d=a,h=Ll(t),g=[];e:{var p=ed.get(e);if(p!==void 0){var x=Ml,k=e;switch(e){case"keypress":if(Ms(t)===0)break e;case"keydown":case"keyup":x=rm;break;case"focusin":k="focus",x=Yo;break;case"focusout":k="blur",x=Yo;break;case"beforeblur":case"afterblur":x=Yo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=$i;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Gf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=am;break;case Kc:case Xc:case Zc:x=Jf;break;case qc:x=im;break;case"scroll":x=$f;break;case"wheel":x=cm;break;case"copy":case"cut":case"paste":x=Kf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Gi}var w=(n&4)!==0,F=!w&&e==="scroll",f=w?p!==null?p+"Capture":null:p;w=[];for(var c=d,m;c!==null;){m=c;var b=m.stateNode;if(m.tag===5&&b!==null&&(m=b,f!==null&&(b=Ir(c,f),b!=null&&w.push(Vr(c,b,m)))),F)break;c=c.return}0<w.length&&(p=new x(p,k,null,t,h),g.push({event:p,listeners:w}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",p&&t!==Pa&&(k=t.relatedTarget||t.fromElement)&&(mt(k)||k[In]))break e;if((x||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,x?(k=t.relatedTarget||t.toElement,x=d,k=k?mt(k):null,k!==null&&(F=St(k),k!==F||k.tag!==5&&k.tag!==6)&&(k=null)):(x=null,k=d),x!==k)){if(w=$i,b="onMouseLeave",f="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=Gi,b="onPointerLeave",f="onPointerEnter",c="pointer"),F=x==null?p:_t(x),m=k==null?p:_t(k),p=new w(b,c+"leave",x,t,h),p.target=F,p.relatedTarget=m,b=null,mt(h)===d&&(w=new w(f,c+"enter",k,t,h),w.target=m,w.relatedTarget=F,b=w),F=b,x&&k)n:{for(w=x,f=k,c=0,m=w;m;m=Lt(m))c++;for(m=0,b=f;b;b=Lt(b))m++;for(;0<c-m;)w=Lt(w),c--;for(;0<m-c;)f=Lt(f),m--;for(;c--;){if(w===f||f!==null&&w===f.alternate)break n;w=Lt(w),f=Lt(f)}w=null}else w=null;x!==null&&tu(g,p,x,w,!1),k!==null&&F!==null&&tu(g,F,k,w,!0)}}e:{if(p=d?_t(d):window,x=p.nodeName&&p.nodeName.toLowerCase(),x==="select"||x==="input"&&p.type==="file")var N=ym;else if(Ji(p))if(Gc)N=km;else{N=xm;var A=vm}else(x=p.nodeName)&&x.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(N=bm);if(N&&(N=N(e,d))){Hc(g,N,t,h);break e}A&&A(e,p,d),e==="focusout"&&(A=p._wrapperState)&&A.controlled&&p.type==="number"&&Ea(p,"number",p.value)}switch(A=d?_t(d):window,e){case"focusin":(Ji(A)||A.contentEditable==="true")&&(Mt=A,za=d,Lr=null);break;case"focusout":Lr=za=Mt=null;break;case"mousedown":Ra=!0;break;case"contextmenu":case"mouseup":case"dragend":Ra=!1,qi(g,t,h);break;case"selectionchange":if(jm)break;case"keydown":case"keyup":qi(g,t,h)}var C;if(_l)e:{switch(e){case"compositionstart":var j="onCompositionStart";break e;case"compositionend":j="onCompositionEnd";break e;case"compositionupdate":j="onCompositionUpdate";break e}j=void 0}else Ft?Vc(e,t)&&(j="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(j="onCompositionStart");j&&(Uc&&t.locale!=="ko"&&(Ft||j!=="onCompositionStart"?j==="onCompositionEnd"&&Ft&&(C=Rc()):(Qn=h,Fl="value"in Qn?Qn.value:Qn.textContent,Ft=!0)),A=Ks(d,j),0<A.length&&(j=new Hi(j,e,null,t,h),g.push({event:j,listeners:A}),C?j.data=C:(C=$c(t),C!==null&&(j.data=C)))),(C=pm?fm(e,t):mm(e,t))&&(d=Ks(d,"onBeforeInput"),0<d.length&&(h=new Hi("onBeforeInput","beforeinput",null,t,h),g.push({event:h,listeners:d}),h.data=C))}nd(g,n)})}function Vr(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Ks(e,n){for(var t=n+"Capture",r=[];e!==null;){var s=e,a=s.stateNode;s.tag===5&&a!==null&&(s=a,a=Ir(e,t),a!=null&&r.unshift(Vr(e,a,s)),a=Ir(e,n),a!=null&&r.push(Vr(e,a,s))),e=e.return}return r}function Lt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function tu(e,n,t,r,s){for(var a=n._reactName,l=[];t!==null&&t!==r;){var i=t,u=i.alternate,d=i.stateNode;if(u!==null&&u===r)break;i.tag===5&&d!==null&&(i=d,s?(u=Ir(t,a),u!=null&&l.unshift(Vr(t,u,i))):s||(u=Ir(t,a),u!=null&&l.push(Vr(t,u,i)))),t=t.return}l.length!==0&&e.push({event:n,listeners:l})}var Lm=/\r\n?/g,Am=/\u0000|\uFFFD/g;function ru(e){return(typeof e=="string"?e:""+e).replace(Lm,`
`).replace(Am,"")}function xs(e,n,t){if(n=ru(n),ru(e)!==n&&t)throw Error(L(425))}function Xs(){}var Ua=null,Va=null;function $a(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ha=typeof setTimeout=="function"?setTimeout:void 0,Tm=typeof clearTimeout=="function"?clearTimeout:void 0,su=typeof Promise=="function"?Promise:void 0,Om=typeof queueMicrotask=="function"?queueMicrotask:typeof su<"u"?function(e){return su.resolve(null).then(e).catch(Pm)}:Ha;function Pm(e){setTimeout(function(){throw e})}function ra(e,n){var t=n,r=0;do{var s=t.nextSibling;if(e.removeChild(t),s&&s.nodeType===8)if(t=s.data,t==="/$"){if(r===0){e.removeChild(s),Dr(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=s}while(t);Dr(n)}function Zn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function ou(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var ar=Math.random().toString(36).slice(2),Cn="__reactFiber$"+ar,$r="__reactProps$"+ar,In="__reactContainer$"+ar,Ga="__reactEvents$"+ar,Fm="__reactListeners$"+ar,Mm="__reactHandles$"+ar;function mt(e){var n=e[Cn];if(n)return n;for(var t=e.parentNode;t;){if(n=t[In]||t[Cn]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=ou(e);e!==null;){if(t=e[Cn])return t;e=ou(e)}return n}e=t,t=e.parentNode}return null}function ts(e){return e=e[Cn]||e[In],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function _t(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(L(33))}function jo(e){return e[$r]||null}var Wa=[],Bt=-1;function at(e){return{current:e}}function ue(e){0>Bt||(e.current=Wa[Bt],Wa[Bt]=null,Bt--)}function oe(e,n){Bt++,Wa[Bt]=e.current,e.current=n}var st={},Me=at(st),$e=at(!1),xt=st;function Xt(e,n){var t=e.type.contextTypes;if(!t)return st;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var s={},a;for(a in t)s[a]=n[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=s),s}function He(e){return e=e.childContextTypes,e!=null}function Zs(){ue($e),ue(Me)}function au(e,n,t){if(Me.current!==st)throw Error(L(168));oe(Me,n),oe($e,t)}function rd(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var s in r)if(!(s in n))throw Error(L(108,vf(e)||"Unknown",s));return fe({},t,r)}function qs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||st,xt=Me.current,oe(Me,e),oe($e,$e.current),!0}function lu(e,n,t){var r=e.stateNode;if(!r)throw Error(L(169));t?(e=rd(e,n,xt),r.__reactInternalMemoizedMergedChildContext=e,ue($e),ue(Me),oe(Me,e)):ue($e),oe($e,t)}var Tn=null,So=!1,sa=!1;function sd(e){Tn===null?Tn=[e]:Tn.push(e)}function Im(e){So=!0,sd(e)}function lt(){if(!sa&&Tn!==null){sa=!0;var e=0,n=re;try{var t=Tn;for(re=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Tn=null,So=!1}catch(s){throw Tn!==null&&(Tn=Tn.slice(e+1)),Ac(Al,lt),s}finally{re=n,sa=!1}}return null}var Dt=[],zt=0,eo=null,no=0,tn=[],rn=0,bt=null,On=1,Pn="";function pt(e,n){Dt[zt++]=no,Dt[zt++]=eo,eo=e,no=n}function od(e,n,t){tn[rn++]=On,tn[rn++]=Pn,tn[rn++]=bt,bt=e;var r=On;e=Pn;var s=32-yn(r)-1;r&=~(1<<s),t+=1;var a=32-yn(n)+s;if(30<a){var l=s-s%5;a=(r&(1<<l)-1).toString(32),r>>=l,s-=l,On=1<<32-yn(n)+s|t<<s|r,Pn=a+e}else On=1<<a|t<<s|r,Pn=e}function Dl(e){e.return!==null&&(pt(e,1),od(e,1,0))}function zl(e){for(;e===eo;)eo=Dt[--zt],Dt[zt]=null,no=Dt[--zt],Dt[zt]=null;for(;e===bt;)bt=tn[--rn],tn[rn]=null,Pn=tn[--rn],tn[rn]=null,On=tn[--rn],tn[rn]=null}var Ke=null,Ye=null,ce=!1,gn=null;function ad(e,n){var t=sn(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function iu(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,Ke=e,Ye=Zn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,Ke=e,Ye=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=bt!==null?{id:On,overflow:Pn}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=sn(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,Ke=e,Ye=null,!0):!1;default:return!1}}function Qa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ja(e){if(ce){var n=Ye;if(n){var t=n;if(!iu(e,n)){if(Qa(e))throw Error(L(418));n=Zn(t.nextSibling);var r=Ke;n&&iu(e,n)?ad(r,t):(e.flags=e.flags&-4097|2,ce=!1,Ke=e)}}else{if(Qa(e))throw Error(L(418));e.flags=e.flags&-4097|2,ce=!1,Ke=e}}}function uu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ke=e}function bs(e){if(e!==Ke)return!1;if(!ce)return uu(e),ce=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!$a(e.type,e.memoizedProps)),n&&(n=Ye)){if(Qa(e))throw ld(),Error(L(418));for(;n;)ad(e,n),n=Zn(n.nextSibling)}if(uu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){Ye=Zn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}Ye=null}}else Ye=Ke?Zn(e.stateNode.nextSibling):null;return!0}function ld(){for(var e=Ye;e;)e=Zn(e.nextSibling)}function Zt(){Ye=Ke=null,ce=!1}function Rl(e){gn===null?gn=[e]:gn.push(e)}var _m=Dn.ReactCurrentBatchConfig;function gr(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(L(309));var r=t.stateNode}if(!r)throw Error(L(147,e));var s=r,a=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===a?n.ref:(n=function(l){var i=s.refs;l===null?delete i[a]:i[a]=l},n._stringRef=a,n)}if(typeof e!="string")throw Error(L(284));if(!t._owner)throw Error(L(290,e))}return e}function ks(e,n){throw e=Object.prototype.toString.call(n),Error(L(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function cu(e){var n=e._init;return n(e._payload)}function id(e){function n(f,c){if(e){var m=f.deletions;m===null?(f.deletions=[c],f.flags|=16):m.push(c)}}function t(f,c){if(!e)return null;for(;c!==null;)n(f,c),c=c.sibling;return null}function r(f,c){for(f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function s(f,c){return f=tt(f,c),f.index=0,f.sibling=null,f}function a(f,c,m){return f.index=m,e?(m=f.alternate,m!==null?(m=m.index,m<c?(f.flags|=2,c):m):(f.flags|=2,c)):(f.flags|=1048576,c)}function l(f){return e&&f.alternate===null&&(f.flags|=2),f}function i(f,c,m,b){return c===null||c.tag!==6?(c=da(m,f.mode,b),c.return=f,c):(c=s(c,m),c.return=f,c)}function u(f,c,m,b){var N=m.type;return N===Pt?h(f,c,m.props.children,b,m.key):c!==null&&(c.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===$n&&cu(N)===c.type)?(b=s(c,m.props),b.ref=gr(f,c,m),b.return=f,b):(b=Us(m.type,m.key,m.props,null,f.mode,b),b.ref=gr(f,c,m),b.return=f,b)}function d(f,c,m,b){return c===null||c.tag!==4||c.stateNode.containerInfo!==m.containerInfo||c.stateNode.implementation!==m.implementation?(c=pa(m,f.mode,b),c.return=f,c):(c=s(c,m.children||[]),c.return=f,c)}function h(f,c,m,b,N){return c===null||c.tag!==7?(c=vt(m,f.mode,b,N),c.return=f,c):(c=s(c,m),c.return=f,c)}function g(f,c,m){if(typeof c=="string"&&c!==""||typeof c=="number")return c=da(""+c,f.mode,m),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case cs:return m=Us(c.type,c.key,c.props,null,f.mode,m),m.ref=gr(f,null,c),m.return=f,m;case Ot:return c=pa(c,f.mode,m),c.return=f,c;case $n:var b=c._init;return g(f,b(c._payload),m)}if(br(c)||dr(c))return c=vt(c,f.mode,m,null),c.return=f,c;ks(f,c)}return null}function p(f,c,m,b){var N=c!==null?c.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:i(f,c,""+m,b);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case cs:return m.key===N?u(f,c,m,b):null;case Ot:return m.key===N?d(f,c,m,b):null;case $n:return N=m._init,p(f,c,N(m._payload),b)}if(br(m)||dr(m))return N!==null?null:h(f,c,m,b,null);ks(f,m)}return null}function x(f,c,m,b,N){if(typeof b=="string"&&b!==""||typeof b=="number")return f=f.get(m)||null,i(c,f,""+b,N);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case cs:return f=f.get(b.key===null?m:b.key)||null,u(c,f,b,N);case Ot:return f=f.get(b.key===null?m:b.key)||null,d(c,f,b,N);case $n:var A=b._init;return x(f,c,m,A(b._payload),N)}if(br(b)||dr(b))return f=f.get(m)||null,h(c,f,b,N,null);ks(c,b)}return null}function k(f,c,m,b){for(var N=null,A=null,C=c,j=c=0,_=null;C!==null&&j<m.length;j++){C.index>j?(_=C,C=null):_=C.sibling;var I=p(f,C,m[j],b);if(I===null){C===null&&(C=_);break}e&&C&&I.alternate===null&&n(f,C),c=a(I,c,j),A===null?N=I:A.sibling=I,A=I,C=_}if(j===m.length)return t(f,C),ce&&pt(f,j),N;if(C===null){for(;j<m.length;j++)C=g(f,m[j],b),C!==null&&(c=a(C,c,j),A===null?N=C:A.sibling=C,A=C);return ce&&pt(f,j),N}for(C=r(f,C);j<m.length;j++)_=x(C,f,j,m[j],b),_!==null&&(e&&_.alternate!==null&&C.delete(_.key===null?j:_.key),c=a(_,c,j),A===null?N=_:A.sibling=_,A=_);return e&&C.forEach(function(W){return n(f,W)}),ce&&pt(f,j),N}function w(f,c,m,b){var N=dr(m);if(typeof N!="function")throw Error(L(150));if(m=N.call(m),m==null)throw Error(L(151));for(var A=N=null,C=c,j=c=0,_=null,I=m.next();C!==null&&!I.done;j++,I=m.next()){C.index>j?(_=C,C=null):_=C.sibling;var W=p(f,C,I.value,b);if(W===null){C===null&&(C=_);break}e&&C&&W.alternate===null&&n(f,C),c=a(W,c,j),A===null?N=W:A.sibling=W,A=W,C=_}if(I.done)return t(f,C),ce&&pt(f,j),N;if(C===null){for(;!I.done;j++,I=m.next())I=g(f,I.value,b),I!==null&&(c=a(I,c,j),A===null?N=I:A.sibling=I,A=I);return ce&&pt(f,j),N}for(C=r(f,C);!I.done;j++,I=m.next())I=x(C,f,j,I.value,b),I!==null&&(e&&I.alternate!==null&&C.delete(I.key===null?j:I.key),c=a(I,c,j),A===null?N=I:A.sibling=I,A=I);return e&&C.forEach(function(J){return n(f,J)}),ce&&pt(f,j),N}function F(f,c,m,b){if(typeof m=="object"&&m!==null&&m.type===Pt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case cs:e:{for(var N=m.key,A=c;A!==null;){if(A.key===N){if(N=m.type,N===Pt){if(A.tag===7){t(f,A.sibling),c=s(A,m.props.children),c.return=f,f=c;break e}}else if(A.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===$n&&cu(N)===A.type){t(f,A.sibling),c=s(A,m.props),c.ref=gr(f,A,m),c.return=f,f=c;break e}t(f,A);break}else n(f,A);A=A.sibling}m.type===Pt?(c=vt(m.props.children,f.mode,b,m.key),c.return=f,f=c):(b=Us(m.type,m.key,m.props,null,f.mode,b),b.ref=gr(f,c,m),b.return=f,f=b)}return l(f);case Ot:e:{for(A=m.key;c!==null;){if(c.key===A)if(c.tag===4&&c.stateNode.containerInfo===m.containerInfo&&c.stateNode.implementation===m.implementation){t(f,c.sibling),c=s(c,m.children||[]),c.return=f,f=c;break e}else{t(f,c);break}else n(f,c);c=c.sibling}c=pa(m,f.mode,b),c.return=f,f=c}return l(f);case $n:return A=m._init,F(f,c,A(m._payload),b)}if(br(m))return k(f,c,m,b);if(dr(m))return w(f,c,m,b);ks(f,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,c!==null&&c.tag===6?(t(f,c.sibling),c=s(c,m),c.return=f,f=c):(t(f,c),c=da(m,f.mode,b),c.return=f,f=c),l(f)):t(f,c)}return F}var qt=id(!0),ud=id(!1),to=at(null),ro=null,Rt=null,Ul=null;function Vl(){Ul=Rt=ro=null}function $l(e){var n=to.current;ue(to),e._currentValue=n}function Ya(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function Qt(e,n){ro=e,Ul=Rt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(Ve=!0),e.firstContext=null)}function ln(e){var n=e._currentValue;if(Ul!==e)if(e={context:e,memoizedValue:n,next:null},Rt===null){if(ro===null)throw Error(L(308));Rt=e,ro.dependencies={lanes:0,firstContext:e}}else Rt=Rt.next=e;return n}var ht=null;function Hl(e){ht===null?ht=[e]:ht.push(e)}function cd(e,n,t,r){var s=n.interleaved;return s===null?(t.next=t,Hl(n)):(t.next=s.next,s.next=t),n.interleaved=t,_n(e,r)}function _n(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var Hn=!1;function Gl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function dd(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Fn(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function qn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ee&2){var s=r.pending;return s===null?n.next=n:(n.next=s.next,s.next=n),r.pending=n,_n(e,t)}return s=r.interleaved,s===null?(n.next=n,Hl(r)):(n.next=s.next,s.next=n),r.interleaved=n,_n(e,t)}function Is(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Tl(e,t)}}function du(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var s=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?s=a=l:a=a.next=l,t=t.next}while(t!==null);a===null?s=a=n:a=a.next=n}else s=a=n;t={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function so(e,n,t,r){var s=e.updateQueue;Hn=!1;var a=s.firstBaseUpdate,l=s.lastBaseUpdate,i=s.shared.pending;if(i!==null){s.shared.pending=null;var u=i,d=u.next;u.next=null,l===null?a=d:l.next=d,l=u;var h=e.alternate;h!==null&&(h=h.updateQueue,i=h.lastBaseUpdate,i!==l&&(i===null?h.firstBaseUpdate=d:i.next=d,h.lastBaseUpdate=u))}if(a!==null){var g=s.baseState;l=0,h=d=u=null,i=a;do{var p=i.lane,x=i.eventTime;if((r&p)===p){h!==null&&(h=h.next={eventTime:x,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var k=e,w=i;switch(p=n,x=t,w.tag){case 1:if(k=w.payload,typeof k=="function"){g=k.call(x,g,p);break e}g=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=w.payload,p=typeof k=="function"?k.call(x,g,p):k,p==null)break e;g=fe({},g,p);break e;case 2:Hn=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,p=s.effects,p===null?s.effects=[i]:p.push(i))}else x={eventTime:x,lane:p,tag:i.tag,payload:i.payload,callback:i.callback,next:null},h===null?(d=h=x,u=g):h=h.next=x,l|=p;if(i=i.next,i===null){if(i=s.shared.pending,i===null)break;p=i,i=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);if(h===null&&(u=g),s.baseState=u,s.firstBaseUpdate=d,s.lastBaseUpdate=h,n=s.shared.interleaved,n!==null){s=n;do l|=s.lane,s=s.next;while(s!==n)}else a===null&&(s.shared.lanes=0);wt|=l,e.lanes=l,e.memoizedState=g}}function pu(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],s=r.callback;if(s!==null){if(r.callback=null,r=t,typeof s!="function")throw Error(L(191,s));s.call(r)}}}var rs={},Sn=at(rs),Hr=at(rs),Gr=at(rs);function gt(e){if(e===rs)throw Error(L(174));return e}function Wl(e,n){switch(oe(Gr,n),oe(Hr,e),oe(Sn,rs),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Aa(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Aa(n,e)}ue(Sn),oe(Sn,n)}function er(){ue(Sn),ue(Hr),ue(Gr)}function pd(e){gt(Gr.current);var n=gt(Sn.current),t=Aa(n,e.type);n!==t&&(oe(Hr,e),oe(Sn,t))}function Ql(e){Hr.current===e&&(ue(Sn),ue(Hr))}var de=at(0);function oo(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var oa=[];function Jl(){for(var e=0;e<oa.length;e++)oa[e]._workInProgressVersionPrimary=null;oa.length=0}var _s=Dn.ReactCurrentDispatcher,aa=Dn.ReactCurrentBatchConfig,kt=0,pe=null,we=null,Se=null,ao=!1,Ar=!1,Wr=0,Bm=0;function Oe(){throw Error(L(321))}function Yl(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!xn(e[t],n[t]))return!1;return!0}function Kl(e,n,t,r,s,a){if(kt=a,pe=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,_s.current=e===null||e.memoizedState===null?Um:Vm,e=t(r,s),Ar){a=0;do{if(Ar=!1,Wr=0,25<=a)throw Error(L(301));a+=1,Se=we=null,n.updateQueue=null,_s.current=$m,e=t(r,s)}while(Ar)}if(_s.current=lo,n=we!==null&&we.next!==null,kt=0,Se=we=pe=null,ao=!1,n)throw Error(L(300));return e}function Xl(){var e=Wr!==0;return Wr=0,e}function wn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Se===null?pe.memoizedState=Se=e:Se=Se.next=e,Se}function un(){if(we===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=we.next;var n=Se===null?pe.memoizedState:Se.next;if(n!==null)Se=n,we=e;else{if(e===null)throw Error(L(310));we=e,e={memoizedState:we.memoizedState,baseState:we.baseState,baseQueue:we.baseQueue,queue:we.queue,next:null},Se===null?pe.memoizedState=Se=e:Se=Se.next=e}return Se}function Qr(e,n){return typeof n=="function"?n(e):n}function la(e){var n=un(),t=n.queue;if(t===null)throw Error(L(311));t.lastRenderedReducer=e;var r=we,s=r.baseQueue,a=t.pending;if(a!==null){if(s!==null){var l=s.next;s.next=a.next,a.next=l}r.baseQueue=s=a,t.pending=null}if(s!==null){a=s.next,r=r.baseState;var i=l=null,u=null,d=a;do{var h=d.lane;if((kt&h)===h)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var g={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(i=u=g,l=r):u=u.next=g,pe.lanes|=h,wt|=h}d=d.next}while(d!==null&&d!==a);u===null?l=r:u.next=i,xn(r,n.memoizedState)||(Ve=!0),n.memoizedState=r,n.baseState=l,n.baseQueue=u,t.lastRenderedState=r}if(e=t.interleaved,e!==null){s=e;do a=s.lane,pe.lanes|=a,wt|=a,s=s.next;while(s!==e)}else s===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function ia(e){var n=un(),t=n.queue;if(t===null)throw Error(L(311));t.lastRenderedReducer=e;var r=t.dispatch,s=t.pending,a=n.memoizedState;if(s!==null){t.pending=null;var l=s=s.next;do a=e(a,l.action),l=l.next;while(l!==s);xn(a,n.memoizedState)||(Ve=!0),n.memoizedState=a,n.baseQueue===null&&(n.baseState=a),t.lastRenderedState=a}return[a,r]}function fd(){}function md(e,n){var t=pe,r=un(),s=n(),a=!xn(r.memoizedState,s);if(a&&(r.memoizedState=s,Ve=!0),r=r.queue,Zl(yd.bind(null,t,r,e),[e]),r.getSnapshot!==n||a||Se!==null&&Se.memoizedState.tag&1){if(t.flags|=2048,Jr(9,gd.bind(null,t,r,s,n),void 0,null),Ne===null)throw Error(L(349));kt&30||hd(t,n,s)}return s}function hd(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=pe.updateQueue,n===null?(n={lastEffect:null,stores:null},pe.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function gd(e,n,t,r){n.value=t,n.getSnapshot=r,vd(n)&&xd(e)}function yd(e,n,t){return t(function(){vd(n)&&xd(e)})}function vd(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!xn(e,t)}catch{return!0}}function xd(e){var n=_n(e,1);n!==null&&vn(n,e,1,-1)}function fu(e){var n=wn();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Qr,lastRenderedState:e},n.queue=e,e=e.dispatch=Rm.bind(null,pe,e),[n.memoizedState,e]}function Jr(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=pe.updateQueue,n===null?(n={lastEffect:null,stores:null},pe.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function bd(){return un().memoizedState}function Bs(e,n,t,r){var s=wn();pe.flags|=e,s.memoizedState=Jr(1|n,t,void 0,r===void 0?null:r)}function No(e,n,t,r){var s=un();r=r===void 0?null:r;var a=void 0;if(we!==null){var l=we.memoizedState;if(a=l.destroy,r!==null&&Yl(r,l.deps)){s.memoizedState=Jr(n,t,a,r);return}}pe.flags|=e,s.memoizedState=Jr(1|n,t,a,r)}function mu(e,n){return Bs(8390656,8,e,n)}function Zl(e,n){return No(2048,8,e,n)}function kd(e,n){return No(4,2,e,n)}function wd(e,n){return No(4,4,e,n)}function Cd(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function jd(e,n,t){return t=t!=null?t.concat([e]):null,No(4,4,Cd.bind(null,n,e),t)}function ql(){}function Sd(e,n){var t=un();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Yl(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Nd(e,n){var t=un();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Yl(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Ed(e,n,t){return kt&21?(xn(t,n)||(t=Pc(),pe.lanes|=t,wt|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,Ve=!0),e.memoizedState=t)}function Dm(e,n){var t=re;re=t!==0&&4>t?t:4,e(!0);var r=aa.transition;aa.transition={};try{e(!1),n()}finally{re=t,aa.transition=r}}function Ld(){return un().memoizedState}function zm(e,n,t){var r=nt(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Ad(e))Td(n,t);else if(t=cd(e,n,t,r),t!==null){var s=Be();vn(t,e,r,s),Od(t,n,r)}}function Rm(e,n,t){var r=nt(e),s={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Ad(e))Td(n,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=n.lastRenderedReducer,a!==null))try{var l=n.lastRenderedState,i=a(l,t);if(s.hasEagerState=!0,s.eagerState=i,xn(i,l)){var u=n.interleaved;u===null?(s.next=s,Hl(n)):(s.next=u.next,u.next=s),n.interleaved=s;return}}catch{}finally{}t=cd(e,n,s,r),t!==null&&(s=Be(),vn(t,e,r,s),Od(t,n,r))}}function Ad(e){var n=e.alternate;return e===pe||n!==null&&n===pe}function Td(e,n){Ar=ao=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Od(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Tl(e,t)}}var lo={readContext:ln,useCallback:Oe,useContext:Oe,useEffect:Oe,useImperativeHandle:Oe,useInsertionEffect:Oe,useLayoutEffect:Oe,useMemo:Oe,useReducer:Oe,useRef:Oe,useState:Oe,useDebugValue:Oe,useDeferredValue:Oe,useTransition:Oe,useMutableSource:Oe,useSyncExternalStore:Oe,useId:Oe,unstable_isNewReconciler:!1},Um={readContext:ln,useCallback:function(e,n){return wn().memoizedState=[e,n===void 0?null:n],e},useContext:ln,useEffect:mu,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Bs(4194308,4,Cd.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Bs(4194308,4,e,n)},useInsertionEffect:function(e,n){return Bs(4,2,e,n)},useMemo:function(e,n){var t=wn();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=wn();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=zm.bind(null,pe,e),[r.memoizedState,e]},useRef:function(e){var n=wn();return e={current:e},n.memoizedState=e},useState:fu,useDebugValue:ql,useDeferredValue:function(e){return wn().memoizedState=e},useTransition:function(){var e=fu(!1),n=e[0];return e=Dm.bind(null,e[1]),wn().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=pe,s=wn();if(ce){if(t===void 0)throw Error(L(407));t=t()}else{if(t=n(),Ne===null)throw Error(L(349));kt&30||hd(r,n,t)}s.memoizedState=t;var a={value:t,getSnapshot:n};return s.queue=a,mu(yd.bind(null,r,a,e),[e]),r.flags|=2048,Jr(9,gd.bind(null,r,a,t,n),void 0,null),t},useId:function(){var e=wn(),n=Ne.identifierPrefix;if(ce){var t=Pn,r=On;t=(r&~(1<<32-yn(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Wr++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Bm++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Vm={readContext:ln,useCallback:Sd,useContext:ln,useEffect:Zl,useImperativeHandle:jd,useInsertionEffect:kd,useLayoutEffect:wd,useMemo:Nd,useReducer:la,useRef:bd,useState:function(){return la(Qr)},useDebugValue:ql,useDeferredValue:function(e){var n=un();return Ed(n,we.memoizedState,e)},useTransition:function(){var e=la(Qr)[0],n=un().memoizedState;return[e,n]},useMutableSource:fd,useSyncExternalStore:md,useId:Ld,unstable_isNewReconciler:!1},$m={readContext:ln,useCallback:Sd,useContext:ln,useEffect:Zl,useImperativeHandle:jd,useInsertionEffect:kd,useLayoutEffect:wd,useMemo:Nd,useReducer:ia,useRef:bd,useState:function(){return ia(Qr)},useDebugValue:ql,useDeferredValue:function(e){var n=un();return we===null?n.memoizedState=e:Ed(n,we.memoizedState,e)},useTransition:function(){var e=ia(Qr)[0],n=un().memoizedState;return[e,n]},useMutableSource:fd,useSyncExternalStore:md,useId:Ld,unstable_isNewReconciler:!1};function mn(e,n){if(e&&e.defaultProps){n=fe({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Ka(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:fe({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Eo={isMounted:function(e){return(e=e._reactInternals)?St(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=Be(),s=nt(e),a=Fn(r,s);a.payload=n,t!=null&&(a.callback=t),n=qn(e,a,s),n!==null&&(vn(n,e,s,r),Is(n,e,s))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=Be(),s=nt(e),a=Fn(r,s);a.tag=1,a.payload=n,t!=null&&(a.callback=t),n=qn(e,a,s),n!==null&&(vn(n,e,s,r),Is(n,e,s))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=Be(),r=nt(e),s=Fn(t,r);s.tag=2,n!=null&&(s.callback=n),n=qn(e,s,r),n!==null&&(vn(n,e,r,t),Is(n,e,r))}};function hu(e,n,t,r,s,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,l):n.prototype&&n.prototype.isPureReactComponent?!Rr(t,r)||!Rr(s,a):!0}function Pd(e,n,t){var r=!1,s=st,a=n.contextType;return typeof a=="object"&&a!==null?a=ln(a):(s=He(n)?xt:Me.current,r=n.contextTypes,a=(r=r!=null)?Xt(e,s):st),n=new n(t,a),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Eo,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=a),n}function gu(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Eo.enqueueReplaceState(n,n.state,null)}function Xa(e,n,t,r){var s=e.stateNode;s.props=t,s.state=e.memoizedState,s.refs={},Gl(e);var a=n.contextType;typeof a=="object"&&a!==null?s.context=ln(a):(a=He(n)?xt:Me.current,s.context=Xt(e,a)),s.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(Ka(e,n,a,t),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(n=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),n!==s.state&&Eo.enqueueReplaceState(s,s.state,null),so(e,t,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function nr(e,n){try{var t="",r=n;do t+=yf(r),r=r.return;while(r);var s=t}catch(a){s=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:n,stack:s,digest:null}}function ua(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Za(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var Hm=typeof WeakMap=="function"?WeakMap:Map;function Fd(e,n,t){t=Fn(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){uo||(uo=!0,il=r),Za(e,n)},t}function Md(e,n,t){t=Fn(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=n.value;t.payload=function(){return r(s)},t.callback=function(){Za(e,n)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){Za(e,n),typeof r!="function"&&(et===null?et=new Set([this]):et.add(this));var l=n.stack;this.componentDidCatch(n.value,{componentStack:l!==null?l:""})}),t}function yu(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new Hm;var s=new Set;r.set(n,s)}else s=r.get(n),s===void 0&&(s=new Set,r.set(n,s));s.has(t)||(s.add(t),e=s0.bind(null,e,n,t),n.then(e,e))}function vu(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function xu(e,n,t,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Fn(-1,1),n.tag=2,qn(t,n,1))),t.lanes|=1),e)}var Gm=Dn.ReactCurrentOwner,Ve=!1;function _e(e,n,t,r){n.child=e===null?ud(n,null,t,r):qt(n,e.child,t,r)}function bu(e,n,t,r,s){t=t.render;var a=n.ref;return Qt(n,s),r=Kl(e,n,t,r,a,s),t=Xl(),e!==null&&!Ve?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~s,Bn(e,n,s)):(ce&&t&&Dl(n),n.flags|=1,_e(e,n,r,s),n.child)}function ku(e,n,t,r,s){if(e===null){var a=t.type;return typeof a=="function"&&!li(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=a,Id(e,n,a,r,s)):(e=Us(t.type,null,r,n,n.mode,s),e.ref=n.ref,e.return=n,n.child=e)}if(a=e.child,!(e.lanes&s)){var l=a.memoizedProps;if(t=t.compare,t=t!==null?t:Rr,t(l,r)&&e.ref===n.ref)return Bn(e,n,s)}return n.flags|=1,e=tt(a,r),e.ref=n.ref,e.return=n,n.child=e}function Id(e,n,t,r,s){if(e!==null){var a=e.memoizedProps;if(Rr(a,r)&&e.ref===n.ref)if(Ve=!1,n.pendingProps=r=a,(e.lanes&s)!==0)e.flags&131072&&(Ve=!0);else return n.lanes=e.lanes,Bn(e,n,s)}return qa(e,n,t,r,s)}function _d(e,n,t){var r=n.pendingProps,s=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},oe(Vt,Je),Je|=t;else{if(!(t&1073741824))return e=a!==null?a.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,oe(Vt,Je),Je|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:t,oe(Vt,Je),Je|=r}else a!==null?(r=a.baseLanes|t,n.memoizedState=null):r=t,oe(Vt,Je),Je|=r;return _e(e,n,s,t),n.child}function Bd(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function qa(e,n,t,r,s){var a=He(t)?xt:Me.current;return a=Xt(n,a),Qt(n,s),t=Kl(e,n,t,r,a,s),r=Xl(),e!==null&&!Ve?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~s,Bn(e,n,s)):(ce&&r&&Dl(n),n.flags|=1,_e(e,n,t,s),n.child)}function wu(e,n,t,r,s){if(He(t)){var a=!0;qs(n)}else a=!1;if(Qt(n,s),n.stateNode===null)Ds(e,n),Pd(n,t,r),Xa(n,t,r,s),r=!0;else if(e===null){var l=n.stateNode,i=n.memoizedProps;l.props=i;var u=l.context,d=t.contextType;typeof d=="object"&&d!==null?d=ln(d):(d=He(t)?xt:Me.current,d=Xt(n,d));var h=t.getDerivedStateFromProps,g=typeof h=="function"||typeof l.getSnapshotBeforeUpdate=="function";g||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==r||u!==d)&&gu(n,l,r,d),Hn=!1;var p=n.memoizedState;l.state=p,so(n,r,l,s),u=n.memoizedState,i!==r||p!==u||$e.current||Hn?(typeof h=="function"&&(Ka(n,t,h,r),u=n.memoizedState),(i=Hn||hu(n,t,i,r,p,u,d))?(g||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(n.flags|=4194308)):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),l.props=r,l.state=u,l.context=d,r=i):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{l=n.stateNode,dd(e,n),i=n.memoizedProps,d=n.type===n.elementType?i:mn(n.type,i),l.props=d,g=n.pendingProps,p=l.context,u=t.contextType,typeof u=="object"&&u!==null?u=ln(u):(u=He(t)?xt:Me.current,u=Xt(n,u));var x=t.getDerivedStateFromProps;(h=typeof x=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==g||p!==u)&&gu(n,l,r,u),Hn=!1,p=n.memoizedState,l.state=p,so(n,r,l,s);var k=n.memoizedState;i!==g||p!==k||$e.current||Hn?(typeof x=="function"&&(Ka(n,t,x,r),k=n.memoizedState),(d=Hn||hu(n,t,d,r,p,k,u)||!1)?(h||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,k,u),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,k,u)),typeof l.componentDidUpdate=="function"&&(n.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=k),l.props=r,l.state=k,l.context=u,r=d):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),r=!1)}return el(e,n,t,r,a,s)}function el(e,n,t,r,s,a){Bd(e,n);var l=(n.flags&128)!==0;if(!r&&!l)return s&&lu(n,t,!1),Bn(e,n,a);r=n.stateNode,Gm.current=n;var i=l&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&l?(n.child=qt(n,e.child,null,a),n.child=qt(n,null,i,a)):_e(e,n,i,a),n.memoizedState=r.state,s&&lu(n,t,!0),n.child}function Dd(e){var n=e.stateNode;n.pendingContext?au(e,n.pendingContext,n.pendingContext!==n.context):n.context&&au(e,n.context,!1),Wl(e,n.containerInfo)}function Cu(e,n,t,r,s){return Zt(),Rl(s),n.flags|=256,_e(e,n,t,r),n.child}var nl={dehydrated:null,treeContext:null,retryLane:0};function tl(e){return{baseLanes:e,cachePool:null,transitions:null}}function zd(e,n,t){var r=n.pendingProps,s=de.current,a=!1,l=(n.flags&128)!==0,i;if((i=l)||(i=e!==null&&e.memoizedState===null?!1:(s&2)!==0),i?(a=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),oe(de,s&1),e===null)return Ja(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(l=r.children,e=r.fallback,a?(r=n.mode,a=n.child,l={mode:"hidden",children:l},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=To(l,r,0,null),e=vt(e,r,t,null),a.return=n,e.return=n,a.sibling=e,n.child=a,n.child.memoizedState=tl(t),n.memoizedState=nl,e):ei(n,l));if(s=e.memoizedState,s!==null&&(i=s.dehydrated,i!==null))return Wm(e,n,l,r,i,s,t);if(a){a=r.fallback,l=n.mode,s=e.child,i=s.sibling;var u={mode:"hidden",children:r.children};return!(l&1)&&n.child!==s?(r=n.child,r.childLanes=0,r.pendingProps=u,n.deletions=null):(r=tt(s,u),r.subtreeFlags=s.subtreeFlags&14680064),i!==null?a=tt(i,a):(a=vt(a,l,t,null),a.flags|=2),a.return=n,r.return=n,r.sibling=a,n.child=r,r=a,a=n.child,l=e.child.memoizedState,l=l===null?tl(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~t,n.memoizedState=nl,r}return a=e.child,e=a.sibling,r=tt(a,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function ei(e,n){return n=To({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function ws(e,n,t,r){return r!==null&&Rl(r),qt(n,e.child,null,t),e=ei(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Wm(e,n,t,r,s,a,l){if(t)return n.flags&256?(n.flags&=-257,r=ua(Error(L(422))),ws(e,n,l,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(a=r.fallback,s=n.mode,r=To({mode:"visible",children:r.children},s,0,null),a=vt(a,s,l,null),a.flags|=2,r.return=n,a.return=n,r.sibling=a,n.child=r,n.mode&1&&qt(n,e.child,null,l),n.child.memoizedState=tl(l),n.memoizedState=nl,a);if(!(n.mode&1))return ws(e,n,l,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var i=r.dgst;return r=i,a=Error(L(419)),r=ua(a,r,void 0),ws(e,n,l,r)}if(i=(l&e.childLanes)!==0,Ve||i){if(r=Ne,r!==null){switch(l&-l){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|l)?0:s,s!==0&&s!==a.retryLane&&(a.retryLane=s,_n(e,s),vn(r,e,s,-1))}return ai(),r=ua(Error(L(421))),ws(e,n,l,r)}return s.data==="$?"?(n.flags|=128,n.child=e.child,n=o0.bind(null,e),s._reactRetry=n,null):(e=a.treeContext,Ye=Zn(s.nextSibling),Ke=n,ce=!0,gn=null,e!==null&&(tn[rn++]=On,tn[rn++]=Pn,tn[rn++]=bt,On=e.id,Pn=e.overflow,bt=n),n=ei(n,r.children),n.flags|=4096,n)}function ju(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Ya(e.return,n,t)}function ca(e,n,t,r,s){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:s}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=t,a.tailMode=s)}function Rd(e,n,t){var r=n.pendingProps,s=r.revealOrder,a=r.tail;if(_e(e,n,r.children,t),r=de.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ju(e,t,n);else if(e.tag===19)ju(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(oe(de,r),!(n.mode&1))n.memoizedState=null;else switch(s){case"forwards":for(t=n.child,s=null;t!==null;)e=t.alternate,e!==null&&oo(e)===null&&(s=t),t=t.sibling;t=s,t===null?(s=n.child,n.child=null):(s=t.sibling,t.sibling=null),ca(n,!1,s,t,a);break;case"backwards":for(t=null,s=n.child,n.child=null;s!==null;){if(e=s.alternate,e!==null&&oo(e)===null){n.child=s;break}e=s.sibling,s.sibling=t,t=s,s=e}ca(n,!0,t,null,a);break;case"together":ca(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ds(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Bn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),wt|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(L(153));if(n.child!==null){for(e=n.child,t=tt(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=tt(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Qm(e,n,t){switch(n.tag){case 3:Dd(n),Zt();break;case 5:pd(n);break;case 1:He(n.type)&&qs(n);break;case 4:Wl(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,s=n.memoizedProps.value;oe(to,r._currentValue),r._currentValue=s;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(oe(de,de.current&1),n.flags|=128,null):t&n.child.childLanes?zd(e,n,t):(oe(de,de.current&1),e=Bn(e,n,t),e!==null?e.sibling:null);oe(de,de.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return Rd(e,n,t);n.flags|=128}if(s=n.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),oe(de,de.current),r)break;return null;case 22:case 23:return n.lanes=0,_d(e,n,t)}return Bn(e,n,t)}var Ud,rl,Vd,$d;Ud=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};rl=function(){};Vd=function(e,n,t,r){var s=e.memoizedProps;if(s!==r){e=n.stateNode,gt(Sn.current);var a=null;switch(t){case"input":s=Sa(e,s),r=Sa(e,r),a=[];break;case"select":s=fe({},s,{value:void 0}),r=fe({},r,{value:void 0}),a=[];break;case"textarea":s=La(e,s),r=La(e,r),a=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Xs)}Ta(t,r);var l;t=null;for(d in s)if(!r.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var i=s[d];for(l in i)i.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Fr.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var u=r[d];if(i=s!=null?s[d]:void 0,r.hasOwnProperty(d)&&u!==i&&(u!=null||i!=null))if(d==="style")if(i){for(l in i)!i.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in u)u.hasOwnProperty(l)&&i[l]!==u[l]&&(t||(t={}),t[l]=u[l])}else t||(a||(a=[]),a.push(d,t)),t=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,i=i?i.__html:void 0,u!=null&&i!==u&&(a=a||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Fr.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&ie("scroll",e),a||i===u||(a=[])):(a=a||[]).push(d,u))}t&&(a=a||[]).push("style",t);var d=a;(n.updateQueue=d)&&(n.flags|=4)}};$d=function(e,n,t,r){t!==r&&(n.flags|=4)};function yr(e,n){if(!ce)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Pe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var s=e.child;s!==null;)t|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)t|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function Jm(e,n,t){var r=n.pendingProps;switch(zl(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pe(n),null;case 1:return He(n.type)&&Zs(),Pe(n),null;case 3:return r=n.stateNode,er(),ue($e),ue(Me),Jl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(bs(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,gn!==null&&(dl(gn),gn=null))),rl(e,n),Pe(n),null;case 5:Ql(n);var s=gt(Gr.current);if(t=n.type,e!==null&&n.stateNode!=null)Vd(e,n,t,r,s),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(L(166));return Pe(n),null}if(e=gt(Sn.current),bs(n)){r=n.stateNode,t=n.type;var a=n.memoizedProps;switch(r[Cn]=n,r[$r]=a,e=(n.mode&1)!==0,t){case"dialog":ie("cancel",r),ie("close",r);break;case"iframe":case"object":case"embed":ie("load",r);break;case"video":case"audio":for(s=0;s<wr.length;s++)ie(wr[s],r);break;case"source":ie("error",r);break;case"img":case"image":case"link":ie("error",r),ie("load",r);break;case"details":ie("toggle",r);break;case"input":Fi(r,a),ie("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},ie("invalid",r);break;case"textarea":Ii(r,a),ie("invalid",r)}Ta(t,a),s=null;for(var l in a)if(a.hasOwnProperty(l)){var i=a[l];l==="children"?typeof i=="string"?r.textContent!==i&&(a.suppressHydrationWarning!==!0&&xs(r.textContent,i,e),s=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(a.suppressHydrationWarning!==!0&&xs(r.textContent,i,e),s=["children",""+i]):Fr.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&ie("scroll",r)}switch(t){case"input":ds(r),Mi(r,a,!0);break;case"textarea":ds(r),_i(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Xs)}r=s,n.updateQueue=r,r!==null&&(n.flags|=4)}else{l=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=yc(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(t,{is:r.is}):(e=l.createElement(t),t==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,t),e[Cn]=n,e[$r]=r,Ud(e,n,!1,!1),n.stateNode=e;e:{switch(l=Oa(t,r),t){case"dialog":ie("cancel",e),ie("close",e),s=r;break;case"iframe":case"object":case"embed":ie("load",e),s=r;break;case"video":case"audio":for(s=0;s<wr.length;s++)ie(wr[s],e);s=r;break;case"source":ie("error",e),s=r;break;case"img":case"image":case"link":ie("error",e),ie("load",e),s=r;break;case"details":ie("toggle",e),s=r;break;case"input":Fi(e,r),s=Sa(e,r),ie("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=fe({},r,{value:void 0}),ie("invalid",e);break;case"textarea":Ii(e,r),s=La(e,r),ie("invalid",e);break;default:s=r}Ta(t,s),i=s;for(a in i)if(i.hasOwnProperty(a)){var u=i[a];a==="style"?bc(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&vc(e,u)):a==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Mr(e,u):typeof u=="number"&&Mr(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Fr.hasOwnProperty(a)?u!=null&&a==="onScroll"&&ie("scroll",e):u!=null&&jl(e,a,u,l))}switch(t){case"input":ds(e),Mi(e,r,!1);break;case"textarea":ds(e),_i(e);break;case"option":r.value!=null&&e.setAttribute("value",""+rt(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?$t(e,!!r.multiple,a,!1):r.defaultValue!=null&&$t(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Xs)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return Pe(n),null;case 6:if(e&&n.stateNode!=null)$d(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(L(166));if(t=gt(Gr.current),gt(Sn.current),bs(n)){if(r=n.stateNode,t=n.memoizedProps,r[Cn]=n,(a=r.nodeValue!==t)&&(e=Ke,e!==null))switch(e.tag){case 3:xs(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xs(r.nodeValue,t,(e.mode&1)!==0)}a&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Cn]=n,n.stateNode=r}return Pe(n),null;case 13:if(ue(de),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ce&&Ye!==null&&n.mode&1&&!(n.flags&128))ld(),Zt(),n.flags|=98560,a=!1;else if(a=bs(n),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(L(318));if(a=n.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(L(317));a[Cn]=n}else Zt(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;Pe(n),a=!1}else gn!==null&&(dl(gn),gn=null),a=!0;if(!a)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||de.current&1?Ce===0&&(Ce=3):ai())),n.updateQueue!==null&&(n.flags|=4),Pe(n),null);case 4:return er(),rl(e,n),e===null&&Ur(n.stateNode.containerInfo),Pe(n),null;case 10:return $l(n.type._context),Pe(n),null;case 17:return He(n.type)&&Zs(),Pe(n),null;case 19:if(ue(de),a=n.memoizedState,a===null)return Pe(n),null;if(r=(n.flags&128)!==0,l=a.rendering,l===null)if(r)yr(a,!1);else{if(Ce!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(l=oo(e),l!==null){for(n.flags|=128,yr(a,!1),r=l.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)a=t,e=r,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return oe(de,de.current&1|2),n.child}e=e.sibling}a.tail!==null&&xe()>tr&&(n.flags|=128,r=!0,yr(a,!1),n.lanes=4194304)}else{if(!r)if(e=oo(l),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),yr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!ce)return Pe(n),null}else 2*xe()-a.renderingStartTime>tr&&t!==1073741824&&(n.flags|=128,r=!0,yr(a,!1),n.lanes=4194304);a.isBackwards?(l.sibling=n.child,n.child=l):(t=a.last,t!==null?t.sibling=l:n.child=l,a.last=l)}return a.tail!==null?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=xe(),n.sibling=null,t=de.current,oe(de,r?t&1|2:t&1),n):(Pe(n),null);case 22:case 23:return oi(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?Je&1073741824&&(Pe(n),n.subtreeFlags&6&&(n.flags|=8192)):Pe(n),null;case 24:return null;case 25:return null}throw Error(L(156,n.tag))}function Ym(e,n){switch(zl(n),n.tag){case 1:return He(n.type)&&Zs(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return er(),ue($e),ue(Me),Jl(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ql(n),null;case 13:if(ue(de),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(L(340));Zt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return ue(de),null;case 4:return er(),null;case 10:return $l(n.type._context),null;case 22:case 23:return oi(),null;case 24:return null;default:return null}}var Cs=!1,Fe=!1,Km=typeof WeakSet=="function"?WeakSet:Set,B=null;function Ut(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){ge(e,n,r)}else t.current=null}function sl(e,n,t){try{t()}catch(r){ge(e,n,r)}}var Su=!1;function Xm(e,n){if(Ua=Js,e=Jc(),Bl(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var s=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var l=0,i=-1,u=-1,d=0,h=0,g=e,p=null;n:for(;;){for(var x;g!==t||s!==0&&g.nodeType!==3||(i=l+s),g!==a||r!==0&&g.nodeType!==3||(u=l+r),g.nodeType===3&&(l+=g.nodeValue.length),(x=g.firstChild)!==null;)p=g,g=x;for(;;){if(g===e)break n;if(p===t&&++d===s&&(i=l),p===a&&++h===r&&(u=l),(x=g.nextSibling)!==null)break;g=p,p=g.parentNode}g=x}t=i===-1||u===-1?null:{start:i,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(Va={focusedElem:e,selectionRange:t},Js=!1,B=n;B!==null;)if(n=B,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,B=e;else for(;B!==null;){n=B;try{var k=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var w=k.memoizedProps,F=k.memoizedState,f=n.stateNode,c=f.getSnapshotBeforeUpdate(n.elementType===n.type?w:mn(n.type,w),F);f.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var m=n.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(L(163))}}catch(b){ge(n,n.return,b)}if(e=n.sibling,e!==null){e.return=n.return,B=e;break}B=n.return}return k=Su,Su=!1,k}function Tr(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var a=s.destroy;s.destroy=void 0,a!==void 0&&sl(n,t,a)}s=s.next}while(s!==r)}}function Lo(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function ol(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Hd(e){var n=e.alternate;n!==null&&(e.alternate=null,Hd(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Cn],delete n[$r],delete n[Ga],delete n[Fm],delete n[Mm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Gd(e){return e.tag===5||e.tag===3||e.tag===4}function Nu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Gd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function al(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Xs));else if(r!==4&&(e=e.child,e!==null))for(al(e,n,t),e=e.sibling;e!==null;)al(e,n,t),e=e.sibling}function ll(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ll(e,n,t),e=e.sibling;e!==null;)ll(e,n,t),e=e.sibling}var Ee=null,hn=!1;function Un(e,n,t){for(t=t.child;t!==null;)Wd(e,n,t),t=t.sibling}function Wd(e,n,t){if(jn&&typeof jn.onCommitFiberUnmount=="function")try{jn.onCommitFiberUnmount(bo,t)}catch{}switch(t.tag){case 5:Fe||Ut(t,n);case 6:var r=Ee,s=hn;Ee=null,Un(e,n,t),Ee=r,hn=s,Ee!==null&&(hn?(e=Ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):Ee.removeChild(t.stateNode));break;case 18:Ee!==null&&(hn?(e=Ee,t=t.stateNode,e.nodeType===8?ra(e.parentNode,t):e.nodeType===1&&ra(e,t),Dr(e)):ra(Ee,t.stateNode));break;case 4:r=Ee,s=hn,Ee=t.stateNode.containerInfo,hn=!0,Un(e,n,t),Ee=r,hn=s;break;case 0:case 11:case 14:case 15:if(!Fe&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var a=s,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&sl(t,n,l),s=s.next}while(s!==r)}Un(e,n,t);break;case 1:if(!Fe&&(Ut(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(i){ge(t,n,i)}Un(e,n,t);break;case 21:Un(e,n,t);break;case 22:t.mode&1?(Fe=(r=Fe)||t.memoizedState!==null,Un(e,n,t),Fe=r):Un(e,n,t);break;default:Un(e,n,t)}}function Eu(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new Km),n.forEach(function(r){var s=a0.bind(null,e,r);t.has(r)||(t.add(r),r.then(s,s))})}}function fn(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var s=t[r];try{var a=e,l=n,i=l;e:for(;i!==null;){switch(i.tag){case 5:Ee=i.stateNode,hn=!1;break e;case 3:Ee=i.stateNode.containerInfo,hn=!0;break e;case 4:Ee=i.stateNode.containerInfo,hn=!0;break e}i=i.return}if(Ee===null)throw Error(L(160));Wd(a,l,s),Ee=null,hn=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(d){ge(s,n,d)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Qd(n,e),n=n.sibling}function Qd(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(fn(n,e),bn(e),r&4){try{Tr(3,e,e.return),Lo(3,e)}catch(w){ge(e,e.return,w)}try{Tr(5,e,e.return)}catch(w){ge(e,e.return,w)}}break;case 1:fn(n,e),bn(e),r&512&&t!==null&&Ut(t,t.return);break;case 5:if(fn(n,e),bn(e),r&512&&t!==null&&Ut(t,t.return),e.flags&32){var s=e.stateNode;try{Mr(s,"")}catch(w){ge(e,e.return,w)}}if(r&4&&(s=e.stateNode,s!=null)){var a=e.memoizedProps,l=t!==null?t.memoizedProps:a,i=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{i==="input"&&a.type==="radio"&&a.name!=null&&hc(s,a),Oa(i,l);var d=Oa(i,a);for(l=0;l<u.length;l+=2){var h=u[l],g=u[l+1];h==="style"?bc(s,g):h==="dangerouslySetInnerHTML"?vc(s,g):h==="children"?Mr(s,g):jl(s,h,g,d)}switch(i){case"input":Na(s,a);break;case"textarea":gc(s,a);break;case"select":var p=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!a.multiple;var x=a.value;x!=null?$t(s,!!a.multiple,x,!1):p!==!!a.multiple&&(a.defaultValue!=null?$t(s,!!a.multiple,a.defaultValue,!0):$t(s,!!a.multiple,a.multiple?[]:"",!1))}s[$r]=a}catch(w){ge(e,e.return,w)}}break;case 6:if(fn(n,e),bn(e),r&4){if(e.stateNode===null)throw Error(L(162));s=e.stateNode,a=e.memoizedProps;try{s.nodeValue=a}catch(w){ge(e,e.return,w)}}break;case 3:if(fn(n,e),bn(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Dr(n.containerInfo)}catch(w){ge(e,e.return,w)}break;case 4:fn(n,e),bn(e);break;case 13:fn(n,e),bn(e),s=e.child,s.flags&8192&&(a=s.memoizedState!==null,s.stateNode.isHidden=a,!a||s.alternate!==null&&s.alternate.memoizedState!==null||(ri=xe())),r&4&&Eu(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(Fe=(d=Fe)||h,fn(n,e),Fe=d):fn(n,e),bn(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(B=e,h=e.child;h!==null;){for(g=B=h;B!==null;){switch(p=B,x=p.child,p.tag){case 0:case 11:case 14:case 15:Tr(4,p,p.return);break;case 1:Ut(p,p.return);var k=p.stateNode;if(typeof k.componentWillUnmount=="function"){r=p,t=p.return;try{n=r,k.props=n.memoizedProps,k.state=n.memoizedState,k.componentWillUnmount()}catch(w){ge(r,t,w)}}break;case 5:Ut(p,p.return);break;case 22:if(p.memoizedState!==null){Au(g);continue}}x!==null?(x.return=p,B=x):Au(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{s=g.stateNode,d?(a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(i=g.stateNode,u=g.memoizedProps.style,l=u!=null&&u.hasOwnProperty("display")?u.display:null,i.style.display=xc("display",l))}catch(w){ge(e,e.return,w)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(w){ge(e,e.return,w)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:fn(n,e),bn(e),r&4&&Eu(e);break;case 21:break;default:fn(n,e),bn(e)}}function bn(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(Gd(t)){var r=t;break e}t=t.return}throw Error(L(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Mr(s,""),r.flags&=-33);var a=Nu(e);ll(e,a,s);break;case 3:case 4:var l=r.stateNode.containerInfo,i=Nu(e);al(e,i,l);break;default:throw Error(L(161))}}catch(u){ge(e,e.return,u)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Zm(e,n,t){B=e,Jd(e)}function Jd(e,n,t){for(var r=(e.mode&1)!==0;B!==null;){var s=B,a=s.child;if(s.tag===22&&r){var l=s.memoizedState!==null||Cs;if(!l){var i=s.alternate,u=i!==null&&i.memoizedState!==null||Fe;i=Cs;var d=Fe;if(Cs=l,(Fe=u)&&!d)for(B=s;B!==null;)l=B,u=l.child,l.tag===22&&l.memoizedState!==null?Tu(s):u!==null?(u.return=l,B=u):Tu(s);for(;a!==null;)B=a,Jd(a),a=a.sibling;B=s,Cs=i,Fe=d}Lu(e)}else s.subtreeFlags&8772&&a!==null?(a.return=s,B=a):Lu(e)}}function Lu(e){for(;B!==null;){var n=B;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:Fe||Lo(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!Fe)if(t===null)r.componentDidMount();else{var s=n.elementType===n.type?t.memoizedProps:mn(n.type,t.memoizedProps);r.componentDidUpdate(s,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=n.updateQueue;a!==null&&pu(n,a,r);break;case 3:var l=n.updateQueue;if(l!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}pu(n,l,t)}break;case 5:var i=n.stateNode;if(t===null&&n.flags&4){t=i;var u=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var d=n.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&Dr(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(L(163))}Fe||n.flags&512&&ol(n)}catch(p){ge(n,n.return,p)}}if(n===e){B=null;break}if(t=n.sibling,t!==null){t.return=n.return,B=t;break}B=n.return}}function Au(e){for(;B!==null;){var n=B;if(n===e){B=null;break}var t=n.sibling;if(t!==null){t.return=n.return,B=t;break}B=n.return}}function Tu(e){for(;B!==null;){var n=B;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Lo(4,n)}catch(u){ge(n,t,u)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var s=n.return;try{r.componentDidMount()}catch(u){ge(n,s,u)}}var a=n.return;try{ol(n)}catch(u){ge(n,a,u)}break;case 5:var l=n.return;try{ol(n)}catch(u){ge(n,l,u)}}}catch(u){ge(n,n.return,u)}if(n===e){B=null;break}var i=n.sibling;if(i!==null){i.return=n.return,B=i;break}B=n.return}}var qm=Math.ceil,io=Dn.ReactCurrentDispatcher,ni=Dn.ReactCurrentOwner,on=Dn.ReactCurrentBatchConfig,ee=0,Ne=null,be=null,Ae=0,Je=0,Vt=at(0),Ce=0,Yr=null,wt=0,Ao=0,ti=0,Or=null,Ue=null,ri=0,tr=1/0,An=null,uo=!1,il=null,et=null,js=!1,Jn=null,co=0,Pr=0,ul=null,zs=-1,Rs=0;function Be(){return ee&6?xe():zs!==-1?zs:zs=xe()}function nt(e){return e.mode&1?ee&2&&Ae!==0?Ae&-Ae:_m.transition!==null?(Rs===0&&(Rs=Pc()),Rs):(e=re,e!==0||(e=window.event,e=e===void 0?16:zc(e.type)),e):1}function vn(e,n,t,r){if(50<Pr)throw Pr=0,ul=null,Error(L(185));es(e,t,r),(!(ee&2)||e!==Ne)&&(e===Ne&&(!(ee&2)&&(Ao|=t),Ce===4&&Wn(e,Ae)),Ge(e,r),t===1&&ee===0&&!(n.mode&1)&&(tr=xe()+500,So&&lt()))}function Ge(e,n){var t=e.callbackNode;_f(e,n);var r=Qs(e,e===Ne?Ae:0);if(r===0)t!==null&&zi(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&zi(t),n===1)e.tag===0?Im(Ou.bind(null,e)):sd(Ou.bind(null,e)),Om(function(){!(ee&6)&&lt()}),t=null;else{switch(Fc(r)){case 1:t=Al;break;case 4:t=Tc;break;case 16:t=Ws;break;case 536870912:t=Oc;break;default:t=Ws}t=tp(t,Yd.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Yd(e,n){if(zs=-1,Rs=0,ee&6)throw Error(L(327));var t=e.callbackNode;if(Jt()&&e.callbackNode!==t)return null;var r=Qs(e,e===Ne?Ae:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=po(e,r);else{n=r;var s=ee;ee|=2;var a=Xd();(Ne!==e||Ae!==n)&&(An=null,tr=xe()+500,yt(e,n));do try{t0();break}catch(i){Kd(e,i)}while(!0);Vl(),io.current=a,ee=s,be!==null?n=0:(Ne=null,Ae=0,n=Ce)}if(n!==0){if(n===2&&(s=_a(e),s!==0&&(r=s,n=cl(e,s))),n===1)throw t=Yr,yt(e,0),Wn(e,r),Ge(e,xe()),t;if(n===6)Wn(e,r);else{if(s=e.current.alternate,!(r&30)&&!e0(s)&&(n=po(e,r),n===2&&(a=_a(e),a!==0&&(r=a,n=cl(e,a))),n===1))throw t=Yr,yt(e,0),Wn(e,r),Ge(e,xe()),t;switch(e.finishedWork=s,e.finishedLanes=r,n){case 0:case 1:throw Error(L(345));case 2:ft(e,Ue,An);break;case 3:if(Wn(e,r),(r&130023424)===r&&(n=ri+500-xe(),10<n)){if(Qs(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Be(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Ha(ft.bind(null,e,Ue,An),n);break}ft(e,Ue,An);break;case 4:if(Wn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,s=-1;0<r;){var l=31-yn(r);a=1<<l,l=n[l],l>s&&(s=l),r&=~a}if(r=s,r=xe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*qm(r/1960))-r,10<r){e.timeoutHandle=Ha(ft.bind(null,e,Ue,An),r);break}ft(e,Ue,An);break;case 5:ft(e,Ue,An);break;default:throw Error(L(329))}}}return Ge(e,xe()),e.callbackNode===t?Yd.bind(null,e):null}function cl(e,n){var t=Or;return e.current.memoizedState.isDehydrated&&(yt(e,n).flags|=256),e=po(e,n),e!==2&&(n=Ue,Ue=t,n!==null&&dl(n)),e}function dl(e){Ue===null?Ue=e:Ue.push.apply(Ue,e)}function e0(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var s=t[r],a=s.getSnapshot;s=s.value;try{if(!xn(a(),s))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Wn(e,n){for(n&=~ti,n&=~Ao,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-yn(n),r=1<<t;e[t]=-1,n&=~r}}function Ou(e){if(ee&6)throw Error(L(327));Jt();var n=Qs(e,0);if(!(n&1))return Ge(e,xe()),null;var t=po(e,n);if(e.tag!==0&&t===2){var r=_a(e);r!==0&&(n=r,t=cl(e,r))}if(t===1)throw t=Yr,yt(e,0),Wn(e,n),Ge(e,xe()),t;if(t===6)throw Error(L(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,ft(e,Ue,An),Ge(e,xe()),null}function si(e,n){var t=ee;ee|=1;try{return e(n)}finally{ee=t,ee===0&&(tr=xe()+500,So&&lt())}}function Ct(e){Jn!==null&&Jn.tag===0&&!(ee&6)&&Jt();var n=ee;ee|=1;var t=on.transition,r=re;try{if(on.transition=null,re=1,e)return e()}finally{re=r,on.transition=t,ee=n,!(ee&6)&&lt()}}function oi(){Je=Vt.current,ue(Vt)}function yt(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Tm(t)),be!==null)for(t=be.return;t!==null;){var r=t;switch(zl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Zs();break;case 3:er(),ue($e),ue(Me),Jl();break;case 5:Ql(r);break;case 4:er();break;case 13:ue(de);break;case 19:ue(de);break;case 10:$l(r.type._context);break;case 22:case 23:oi()}t=t.return}if(Ne=e,be=e=tt(e.current,null),Ae=Je=n,Ce=0,Yr=null,ti=Ao=wt=0,Ue=Or=null,ht!==null){for(n=0;n<ht.length;n++)if(t=ht[n],r=t.interleaved,r!==null){t.interleaved=null;var s=r.next,a=t.pending;if(a!==null){var l=a.next;a.next=s,r.next=l}t.pending=r}ht=null}return e}function Kd(e,n){do{var t=be;try{if(Vl(),_s.current=lo,ao){for(var r=pe.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ao=!1}if(kt=0,Se=we=pe=null,Ar=!1,Wr=0,ni.current=null,t===null||t.return===null){Ce=1,Yr=n,be=null;break}e:{var a=e,l=t.return,i=t,u=n;if(n=Ae,i.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,h=i,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=vu(l);if(x!==null){x.flags&=-257,xu(x,l,i,a,n),x.mode&1&&yu(a,d,n),n=x,u=d;var k=n.updateQueue;if(k===null){var w=new Set;w.add(u),n.updateQueue=w}else k.add(u);break e}else{if(!(n&1)){yu(a,d,n),ai();break e}u=Error(L(426))}}else if(ce&&i.mode&1){var F=vu(l);if(F!==null){!(F.flags&65536)&&(F.flags|=256),xu(F,l,i,a,n),Rl(nr(u,i));break e}}a=u=nr(u,i),Ce!==4&&(Ce=2),Or===null?Or=[a]:Or.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,n&=-n,a.lanes|=n;var f=Fd(a,u,n);du(a,f);break e;case 1:i=u;var c=a.type,m=a.stateNode;if(!(a.flags&128)&&(typeof c.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(et===null||!et.has(m)))){a.flags|=65536,n&=-n,a.lanes|=n;var b=Md(a,i,n);du(a,b);break e}}a=a.return}while(a!==null)}qd(t)}catch(N){n=N,be===t&&t!==null&&(be=t=t.return);continue}break}while(!0)}function Xd(){var e=io.current;return io.current=lo,e===null?lo:e}function ai(){(Ce===0||Ce===3||Ce===2)&&(Ce=4),Ne===null||!(wt&268435455)&&!(Ao&268435455)||Wn(Ne,Ae)}function po(e,n){var t=ee;ee|=2;var r=Xd();(Ne!==e||Ae!==n)&&(An=null,yt(e,n));do try{n0();break}catch(s){Kd(e,s)}while(!0);if(Vl(),ee=t,io.current=r,be!==null)throw Error(L(261));return Ne=null,Ae=0,Ce}function n0(){for(;be!==null;)Zd(be)}function t0(){for(;be!==null&&!Ef();)Zd(be)}function Zd(e){var n=np(e.alternate,e,Je);e.memoizedProps=e.pendingProps,n===null?qd(e):be=n,ni.current=null}function qd(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Ym(t,n),t!==null){t.flags&=32767,be=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ce=6,be=null;return}}else if(t=Jm(t,n,Je),t!==null){be=t;return}if(n=n.sibling,n!==null){be=n;return}be=n=e}while(n!==null);Ce===0&&(Ce=5)}function ft(e,n,t){var r=re,s=on.transition;try{on.transition=null,re=1,r0(e,n,t,r)}finally{on.transition=s,re=r}return null}function r0(e,n,t,r){do Jt();while(Jn!==null);if(ee&6)throw Error(L(327));t=e.finishedWork;var s=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(L(177));e.callbackNode=null,e.callbackPriority=0;var a=t.lanes|t.childLanes;if(Bf(e,a),e===Ne&&(be=Ne=null,Ae=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||js||(js=!0,tp(Ws,function(){return Jt(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=on.transition,on.transition=null;var l=re;re=1;var i=ee;ee|=4,ni.current=null,Xm(e,t),Qd(t,e),Cm(Va),Js=!!Ua,Va=Ua=null,e.current=t,Zm(t),Lf(),ee=i,re=l,on.transition=a}else e.current=t;if(js&&(js=!1,Jn=e,co=s),a=e.pendingLanes,a===0&&(et=null),Of(t.stateNode),Ge(e,xe()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)s=n[t],r(s.value,{componentStack:s.stack,digest:s.digest});if(uo)throw uo=!1,e=il,il=null,e;return co&1&&e.tag!==0&&Jt(),a=e.pendingLanes,a&1?e===ul?Pr++:(Pr=0,ul=e):Pr=0,lt(),null}function Jt(){if(Jn!==null){var e=Fc(co),n=on.transition,t=re;try{if(on.transition=null,re=16>e?16:e,Jn===null)var r=!1;else{if(e=Jn,Jn=null,co=0,ee&6)throw Error(L(331));var s=ee;for(ee|=4,B=e.current;B!==null;){var a=B,l=a.child;if(B.flags&16){var i=a.deletions;if(i!==null){for(var u=0;u<i.length;u++){var d=i[u];for(B=d;B!==null;){var h=B;switch(h.tag){case 0:case 11:case 15:Tr(8,h,a)}var g=h.child;if(g!==null)g.return=h,B=g;else for(;B!==null;){h=B;var p=h.sibling,x=h.return;if(Hd(h),h===d){B=null;break}if(p!==null){p.return=x,B=p;break}B=x}}}var k=a.alternate;if(k!==null){var w=k.child;if(w!==null){k.child=null;do{var F=w.sibling;w.sibling=null,w=F}while(w!==null)}}B=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,B=l;else e:for(;B!==null;){if(a=B,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Tr(9,a,a.return)}var f=a.sibling;if(f!==null){f.return=a.return,B=f;break e}B=a.return}}var c=e.current;for(B=c;B!==null;){l=B;var m=l.child;if(l.subtreeFlags&2064&&m!==null)m.return=l,B=m;else e:for(l=c;B!==null;){if(i=B,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:Lo(9,i)}}catch(N){ge(i,i.return,N)}if(i===l){B=null;break e}var b=i.sibling;if(b!==null){b.return=i.return,B=b;break e}B=i.return}}if(ee=s,lt(),jn&&typeof jn.onPostCommitFiberRoot=="function")try{jn.onPostCommitFiberRoot(bo,e)}catch{}r=!0}return r}finally{re=t,on.transition=n}}return!1}function Pu(e,n,t){n=nr(t,n),n=Fd(e,n,1),e=qn(e,n,1),n=Be(),e!==null&&(es(e,1,n),Ge(e,n))}function ge(e,n,t){if(e.tag===3)Pu(e,e,t);else for(;n!==null;){if(n.tag===3){Pu(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(et===null||!et.has(r))){e=nr(t,e),e=Md(n,e,1),n=qn(n,e,1),e=Be(),n!==null&&(es(n,1,e),Ge(n,e));break}}n=n.return}}function s0(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=Be(),e.pingedLanes|=e.suspendedLanes&t,Ne===e&&(Ae&t)===t&&(Ce===4||Ce===3&&(Ae&130023424)===Ae&&500>xe()-ri?yt(e,0):ti|=t),Ge(e,n)}function ep(e,n){n===0&&(e.mode&1?(n=ms,ms<<=1,!(ms&130023424)&&(ms=4194304)):n=1);var t=Be();e=_n(e,n),e!==null&&(es(e,n,t),Ge(e,t))}function o0(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),ep(e,t)}function a0(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(t=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(L(314))}r!==null&&r.delete(n),ep(e,t)}var np;np=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||$e.current)Ve=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return Ve=!1,Qm(e,n,t);Ve=!!(e.flags&131072)}else Ve=!1,ce&&n.flags&1048576&&od(n,no,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Ds(e,n),e=n.pendingProps;var s=Xt(n,Me.current);Qt(n,t),s=Kl(null,n,r,e,s,t);var a=Xl();return n.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,He(r)?(a=!0,qs(n)):a=!1,n.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Gl(n),s.updater=Eo,n.stateNode=s,s._reactInternals=n,Xa(n,r,e,t),n=el(null,n,r,!0,a,t)):(n.tag=0,ce&&a&&Dl(n),_e(null,n,s,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Ds(e,n),e=n.pendingProps,s=r._init,r=s(r._payload),n.type=r,s=n.tag=i0(r),e=mn(r,e),s){case 0:n=qa(null,n,r,e,t);break e;case 1:n=wu(null,n,r,e,t);break e;case 11:n=bu(null,n,r,e,t);break e;case 14:n=ku(null,n,r,mn(r.type,e),t);break e}throw Error(L(306,r,""))}return n;case 0:return r=n.type,s=n.pendingProps,s=n.elementType===r?s:mn(r,s),qa(e,n,r,s,t);case 1:return r=n.type,s=n.pendingProps,s=n.elementType===r?s:mn(r,s),wu(e,n,r,s,t);case 3:e:{if(Dd(n),e===null)throw Error(L(387));r=n.pendingProps,a=n.memoizedState,s=a.element,dd(e,n),so(n,r,null,t);var l=n.memoizedState;if(r=l.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},n.updateQueue.baseState=a,n.memoizedState=a,n.flags&256){s=nr(Error(L(423)),n),n=Cu(e,n,r,t,s);break e}else if(r!==s){s=nr(Error(L(424)),n),n=Cu(e,n,r,t,s);break e}else for(Ye=Zn(n.stateNode.containerInfo.firstChild),Ke=n,ce=!0,gn=null,t=ud(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Zt(),r===s){n=Bn(e,n,t);break e}_e(e,n,r,t)}n=n.child}return n;case 5:return pd(n),e===null&&Ja(n),r=n.type,s=n.pendingProps,a=e!==null?e.memoizedProps:null,l=s.children,$a(r,s)?l=null:a!==null&&$a(r,a)&&(n.flags|=32),Bd(e,n),_e(e,n,l,t),n.child;case 6:return e===null&&Ja(n),null;case 13:return zd(e,n,t);case 4:return Wl(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=qt(n,null,r,t):_e(e,n,r,t),n.child;case 11:return r=n.type,s=n.pendingProps,s=n.elementType===r?s:mn(r,s),bu(e,n,r,s,t);case 7:return _e(e,n,n.pendingProps,t),n.child;case 8:return _e(e,n,n.pendingProps.children,t),n.child;case 12:return _e(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,s=n.pendingProps,a=n.memoizedProps,l=s.value,oe(to,r._currentValue),r._currentValue=l,a!==null)if(xn(a.value,l)){if(a.children===s.children&&!$e.current){n=Bn(e,n,t);break e}}else for(a=n.child,a!==null&&(a.return=n);a!==null;){var i=a.dependencies;if(i!==null){l=a.child;for(var u=i.firstContext;u!==null;){if(u.context===r){if(a.tag===1){u=Fn(-1,t&-t),u.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?u.next=u:(u.next=h.next,h.next=u),d.pending=u}}a.lanes|=t,u=a.alternate,u!==null&&(u.lanes|=t),Ya(a.return,t,n),i.lanes|=t;break}u=u.next}}else if(a.tag===10)l=a.type===n.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(L(341));l.lanes|=t,i=l.alternate,i!==null&&(i.lanes|=t),Ya(l,t,n),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===n){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}_e(e,n,s.children,t),n=n.child}return n;case 9:return s=n.type,r=n.pendingProps.children,Qt(n,t),s=ln(s),r=r(s),n.flags|=1,_e(e,n,r,t),n.child;case 14:return r=n.type,s=mn(r,n.pendingProps),s=mn(r.type,s),ku(e,n,r,s,t);case 15:return Id(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,s=n.pendingProps,s=n.elementType===r?s:mn(r,s),Ds(e,n),n.tag=1,He(r)?(e=!0,qs(n)):e=!1,Qt(n,t),Pd(n,r,s),Xa(n,r,s,t),el(null,n,r,!0,e,t);case 19:return Rd(e,n,t);case 22:return _d(e,n,t)}throw Error(L(156,n.tag))};function tp(e,n){return Ac(e,n)}function l0(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function sn(e,n,t,r){return new l0(e,n,t,r)}function li(e){return e=e.prototype,!(!e||!e.isReactComponent)}function i0(e){if(typeof e=="function")return li(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Nl)return 11;if(e===El)return 14}return 2}function tt(e,n){var t=e.alternate;return t===null?(t=sn(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Us(e,n,t,r,s,a){var l=2;if(r=e,typeof e=="function")li(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Pt:return vt(t.children,s,a,n);case Sl:l=8,s|=8;break;case ka:return e=sn(12,t,n,s|2),e.elementType=ka,e.lanes=a,e;case wa:return e=sn(13,t,n,s),e.elementType=wa,e.lanes=a,e;case Ca:return e=sn(19,t,n,s),e.elementType=Ca,e.lanes=a,e;case pc:return To(t,s,a,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cc:l=10;break e;case dc:l=9;break e;case Nl:l=11;break e;case El:l=14;break e;case $n:l=16,r=null;break e}throw Error(L(130,e==null?e:typeof e,""))}return n=sn(l,t,n,s),n.elementType=e,n.type=r,n.lanes=a,n}function vt(e,n,t,r){return e=sn(7,e,r,n),e.lanes=t,e}function To(e,n,t,r){return e=sn(22,e,r,n),e.elementType=pc,e.lanes=t,e.stateNode={isHidden:!1},e}function da(e,n,t){return e=sn(6,e,null,n),e.lanes=t,e}function pa(e,n,t){return n=sn(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function u0(e,n,t,r,s){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Wo(0),this.expirationTimes=Wo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Wo(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function ii(e,n,t,r,s,a,l,i,u){return e=new u0(e,n,t,i,u),n===1?(n=1,a===!0&&(n|=8)):n=0,a=sn(3,null,null,n),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Gl(a),e}function c0(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ot,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function rp(e){if(!e)return st;e=e._reactInternals;e:{if(St(e)!==e||e.tag!==1)throw Error(L(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(He(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(L(171))}if(e.tag===1){var t=e.type;if(He(t))return rd(e,t,n)}return n}function sp(e,n,t,r,s,a,l,i,u){return e=ii(t,r,!0,e,s,a,l,i,u),e.context=rp(null),t=e.current,r=Be(),s=nt(t),a=Fn(r,s),a.callback=n??null,qn(t,a,s),e.current.lanes=s,es(e,s,r),Ge(e,r),e}function Oo(e,n,t,r){var s=n.current,a=Be(),l=nt(s);return t=rp(t),n.context===null?n.context=t:n.pendingContext=t,n=Fn(a,l),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=qn(s,n,l),e!==null&&(vn(e,s,l,a),Is(e,s,l)),l}function fo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Fu(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function ui(e,n){Fu(e,n),(e=e.alternate)&&Fu(e,n)}function d0(){return null}var op=typeof reportError=="function"?reportError:function(e){console.error(e)};function ci(e){this._internalRoot=e}Po.prototype.render=ci.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(L(409));Oo(e,n,null,null)};Po.prototype.unmount=ci.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Ct(function(){Oo(null,e,null,null)}),n[In]=null}};function Po(e){this._internalRoot=e}Po.prototype.unstable_scheduleHydration=function(e){if(e){var n=_c();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Gn.length&&n!==0&&n<Gn[t].priority;t++);Gn.splice(t,0,e),t===0&&Dc(e)}};function di(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Fo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Mu(){}function p0(e,n,t,r,s){if(s){if(typeof r=="function"){var a=r;r=function(){var d=fo(l);a.call(d)}}var l=sp(n,r,e,0,null,!1,!1,"",Mu);return e._reactRootContainer=l,e[In]=l.current,Ur(e.nodeType===8?e.parentNode:e),Ct(),l}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var i=r;r=function(){var d=fo(u);i.call(d)}}var u=ii(e,0,!1,null,null,!1,!1,"",Mu);return e._reactRootContainer=u,e[In]=u.current,Ur(e.nodeType===8?e.parentNode:e),Ct(function(){Oo(n,u,t,r)}),u}function Mo(e,n,t,r,s){var a=t._reactRootContainer;if(a){var l=a;if(typeof s=="function"){var i=s;s=function(){var u=fo(l);i.call(u)}}Oo(n,l,e,s)}else l=p0(t,n,e,s,r);return fo(l)}Mc=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=kr(n.pendingLanes);t!==0&&(Tl(n,t|1),Ge(n,xe()),!(ee&6)&&(tr=xe()+500,lt()))}break;case 13:Ct(function(){var r=_n(e,1);if(r!==null){var s=Be();vn(r,e,1,s)}}),ui(e,1)}};Ol=function(e){if(e.tag===13){var n=_n(e,134217728);if(n!==null){var t=Be();vn(n,e,134217728,t)}ui(e,134217728)}};Ic=function(e){if(e.tag===13){var n=nt(e),t=_n(e,n);if(t!==null){var r=Be();vn(t,e,n,r)}ui(e,n)}};_c=function(){return re};Bc=function(e,n){var t=re;try{return re=e,n()}finally{re=t}};Fa=function(e,n,t){switch(n){case"input":if(Na(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var s=jo(r);if(!s)throw Error(L(90));mc(r),Na(r,s)}}}break;case"textarea":gc(e,t);break;case"select":n=t.value,n!=null&&$t(e,!!t.multiple,n,!1)}};Cc=si;jc=Ct;var f0={usingClientEntryPoint:!1,Events:[ts,_t,jo,kc,wc,si]},vr={findFiberByHostInstance:mt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},m0={bundleType:vr.bundleType,version:vr.version,rendererPackageName:vr.rendererPackageName,rendererConfig:vr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Dn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ec(e),e===null?null:e.stateNode},findFiberByHostInstance:vr.findFiberByHostInstance||d0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ss=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ss.isDisabled&&Ss.supportsFiber)try{bo=Ss.inject(m0),jn=Ss}catch{}}Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=f0;Ze.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!di(n))throw Error(L(200));return c0(e,n,null,t)};Ze.createRoot=function(e,n){if(!di(e))throw Error(L(299));var t=!1,r="",s=op;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),n=ii(e,1,!1,null,null,t,!1,r,s),e[In]=n.current,Ur(e.nodeType===8?e.parentNode:e),new ci(n)};Ze.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(L(188)):(e=Object.keys(e).join(","),Error(L(268,e)));return e=Ec(n),e=e===null?null:e.stateNode,e};Ze.flushSync=function(e){return Ct(e)};Ze.hydrate=function(e,n,t){if(!Fo(n))throw Error(L(200));return Mo(null,e,n,!0,t)};Ze.hydrateRoot=function(e,n,t){if(!di(e))throw Error(L(405));var r=t!=null&&t.hydratedSources||null,s=!1,a="",l=op;if(t!=null&&(t.unstable_strictMode===!0&&(s=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),n=sp(n,null,e,1,t??null,s,!1,a,l),e[In]=n.current,Ur(e),r)for(e=0;e<r.length;e++)t=r[e],s=t._getVersion,s=s(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,s]:n.mutableSourceEagerHydrationData.push(t,s);return new Po(n)};Ze.render=function(e,n,t){if(!Fo(n))throw Error(L(200));return Mo(null,e,n,!1,t)};Ze.unmountComponentAtNode=function(e){if(!Fo(e))throw Error(L(40));return e._reactRootContainer?(Ct(function(){Mo(null,null,e,!1,function(){e._reactRootContainer=null,e[In]=null})}),!0):!1};Ze.unstable_batchedUpdates=si;Ze.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Fo(t))throw Error(L(200));if(e==null||e._reactInternals===void 0)throw Error(L(38));return Mo(e,n,t,!1,r)};Ze.version="18.3.1-next-f1338f8080-20240426";function ap(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ap)}catch(e){console.error(e)}}ap(),ac.exports=Ze;var lp=ac.exports,ip,Iu=lp;ip=Iu.createRoot,Iu.hydrateRoot;const pi="authToken",up="authUser",h0="qwertyuiopasdfghjklzxcvbnm123456",cp="1234567890123456";function dp(){return sessionStorage.getItem(pi)}function g0(e,n){sessionStorage.setItem(pi,e),n&&sessionStorage.setItem(up,JSON.stringify(n)),sessionStorage.setItem("loggedIn","true")}function pp(){sessionStorage.removeItem(pi),sessionStorage.removeItem(up),sessionStorage.removeItem("loggedIn")}function y0(){return!!dp()}const mo=new TextEncoder,v0=new TextDecoder;let fa=null;function fp(){return fa||(fa=crypto.subtle.importKey("raw",mo.encode(h0),{name:"AES-CBC"},!1,["encrypt","decrypt"])),fa}function x0(e){return Array.from(new Uint8Array(e),n=>n.toString(16).padStart(2,"0")).join("")}function b0(e){if(e.length%2)throw new Error("Invalid encrypted payload.");const n=new Uint8Array(e.length/2);for(let t=0;t<n.length;t++)n[t]=parseInt(e.substr(t*2,2),16);return n}async function k0(e){const n=await fp(),t=await crypto.subtle.encrypt({name:"AES-CBC",iv:mo.encode(cp)},n,mo.encode(JSON.stringify(e)));return x0(t)}async function w0(e){const n=await fp(),t=await crypto.subtle.decrypt({name:"AES-CBC",iv:mo.encode(cp)},n,b0(e));return JSON.parse(v0.decode(t))}function mp(){window.location.hash="#/"}function C0(){pp(),sessionStorage.removeItem("boilerType"),mp()}async function hp(e,n,t){const r=new Headers(n.headers||{});let s=n.body;if(typeof s=="string"&&(r.get("Content-Type")||"").includes("application/json")&&(s=JSON.stringify({encryptedData:await k0(JSON.parse(s))})),t){const i=dp();i&&r.set("Authorization",`Bearer ${i}`)}const a=await fetch(e,{...n,headers:r,body:s});if(t&&a.status===401)throw pp(),mp(),new Error("Session expired — redirecting to login.");const l=a.json.bind(a);return a.json=async function(){const i=await l();return i&&typeof i.encryptedData=="string"?w0(i.encryptedData):i},a}function an(e,n={}){return hp(e,n,!0)}function j0(e,n={}){return hp(e,n,!1)}function _u(){const n=(window.location.hash||"#/").replace(/^#/,"")||"/";return n.startsWith("/")?n:"/"+n}function gp(e){window.location.hash="#"+e}function S0(){const[e,n]=E.useState(_u());return E.useEffect(()=>{const t=()=>n(_u());return window.addEventListener("hashchange",t),()=>window.removeEventListener("hashchange",t)},[]),e}function N0({to:e,className:n,children:t,...r}){return o.jsx("a",{href:"#"+e,className:n,...r,children:t})}const E0=`/* Copied verbatim from the <style> block of public/index.html (login page). */
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
`;function yp(e,n){E.useLayoutEffect(()=>{const t=e.map((r,s)=>{const a=document.createElement("style");return a.setAttribute("data-app-style",n+"-"+s),a.textContent=r,document.head.appendChild(a),a});return()=>t.forEach(r=>r.remove())},[n])}function vp(){const e=E.useRef(null);return E.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,t=e.current,r=t.getContext("2d");let s,a,l,i,u;function d(){i=Math.min(window.devicePixelRatio||1,2),s=window.innerWidth,a=window.innerHeight,t.width=s*i,t.height=a*i,t.style.width=s+"px",t.style.height=a+"px",r.setTransform(i,0,0,i,0,0);const g=Math.max(28,Math.min(70,Math.round(s*a/26e3)));l=Array.from({length:g},()=>({x:Math.random()*s,y:Math.random()*a,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.4+.6}))}function h(){r.clearRect(0,0,s,a);const g=Math.min(150,s/6);for(const p of l)p.x+=p.vx,p.y+=p.vy,(p.x<0||p.x>s)&&(p.vx*=-1),(p.y<0||p.y>a)&&(p.vy*=-1);for(let p=0;p<l.length;p++)for(let x=p+1;x<l.length;x++){const k=l[p],w=l[x],F=k.x-w.x,f=k.y-w.y,c=Math.sqrt(F*F+f*f);c<g&&(r.strokeStyle=`rgba(96,165,250,${.16*(1-c/g)})`,r.lineWidth=1,r.beginPath(),r.moveTo(k.x,k.y),r.lineTo(w.x,w.y),r.stroke())}for(const p of l)r.beginPath(),r.arc(p.x,p.y,p.r,0,Math.PI*2),r.fillStyle="rgba(147,197,253,0.55)",r.fill();n||(u=requestAnimationFrame(h))}return window.addEventListener("resize",d),d(),h(),()=>{window.removeEventListener("resize",d),cancelAnimationFrame(u)}},[]),o.jsx("canvas",{id:"bg-particles",ref:e,style:{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}})}const L0=e=>o.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M3 3v18h18"}),o.jsx("path",{d:"M18 17V9"}),o.jsx("path",{d:"M13 17V5"}),o.jsx("path",{d:"M8 17v-3"})]}),A0=e=>o.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),o.jsx("polyline",{points:"17 8 12 3 7 8"}),o.jsx("line",{x1:"12",x2:"12",y1:"3",y2:"15"})]}),T0=e=>o.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),o.jsx("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),o.jsx("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),o.jsx("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]}),Io=e=>o.jsx("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",...e,children:o.jsx("polygon",{points:"5 3 19 12 5 21 5 3"})}),_o=e=>o.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M3 12a9 9 0 1 0 2.64-6.36"}),o.jsx("path",{d:"M3 4v5h5"})]}),xp=e=>o.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"}),o.jsx("path",{d:"M17 21v-8H7v8"}),o.jsx("path",{d:"M7 3v5h8"})]}),ho=e=>o.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),o.jsx("polyline",{points:"7 10 12 15 17 10"}),o.jsx("line",{x1:"12",x2:"12",y1:"15",y2:"3"})]}),fi=e=>o.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}),o.jsx("path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}),o.jsx("line",{x1:"16",x2:"8",y1:"13",y2:"13"}),o.jsx("line",{x1:"16",x2:"8",y1:"17",y2:"17"}),o.jsx("line",{x1:"10",x2:"8",y1:"9",y2:"9"})]}),O0=e=>o.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),o.jsx("path",{d:"m2 7 10 6 10-6"})]}),P0=e=>o.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),o.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),bp=e=>o.jsxs("svg",{width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M3 15h18"}),o.jsx("path",{d:"M5 15V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9"}),o.jsx("path",{d:"M8 15v4"}),o.jsx("path",{d:"M16 15v4"}),o.jsx("path",{d:"M9 8h.01"}),o.jsx("path",{d:"M13 8h.01"})]}),F0=e=>o.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.6 20.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a20.6 20.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),o.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}),M0=e=>o.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[o.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"}),o.jsx("circle",{cx:"12",cy:"12",r:"3"})]});function I0(){E.useEffect(()=>{document.title="Boiler Efficiency Calculator"},[]),yp([E0],"login");const[e,n]=E.useState(""),[t,r]=E.useState(""),[s,a]=E.useState(!1),[l,i]=E.useState(!1),[u,d]=E.useState({text:"Incorrect username or password!",show:!1,n:0}),h=p=>d(x=>({text:p||x.text,show:!0,n:x.n+1})),g=async()=>{if(!e||!t){h("Enter your username and password.");return}i(!0);try{const p=await j0("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})}),x=await p.json();if(!p.ok||!x.ok){h(x.error||"Incorrect username or password!");return}g0(x.token,x.user),gp("/calculator")}catch{h("Could not reach the server. Please try again.")}finally{i(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx(vp,{}),o.jsxs("div",{className:"screen",onKeyDown:p=>{p.key==="Enter"&&g()},children:[o.jsxs("div",{className:"brand-panel",children:[o.jsx("div",{className:"brand-logo-ring",children:o.jsx("div",{className:"inner",children:o.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})})}),o.jsxs("div",{className:"brand-title",children:["Boiler ",o.jsx("span",{className:"accent",children:"Efficiency"})," Calculator"]}),o.jsx("div",{className:"brand-rule"}),o.jsxs("div",{className:"stat-row",children:[o.jsxs("div",{className:"stat-chip",children:[o.jsx("div",{className:"n",children:"87%"}),o.jsx("div",{className:"l",children:"Boiler Eff."})]}),o.jsxs("div",{className:"stat-chip",children:[o.jsx("div",{className:"n",children:"5.8%"}),o.jsx("div",{className:"l",children:"Dry Gas Loss"})]}),o.jsxs("div",{className:"stat-chip",children:[o.jsx("div",{className:"n",children:"1.2%"}),o.jsx("div",{className:"l",children:"Unburnt C"})]})]})]}),o.jsx("div",{className:"form-panel",children:o.jsxs("div",{className:"login-box",id:"loginBox",children:[o.jsx("div",{className:"login-logo-icon",children:o.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),o.jsx("div",{className:"login-title",children:"Welcome"}),o.jsx("div",{className:"login-sub",children:"Sign in to access the Efficiency Calculator"}),o.jsx("div",{className:"login-divider"}),o.jsx("div",{className:"error-msg"+(u.show?" show":""),id:"errorMsg",children:u.text},u.n),o.jsxs("div",{className:"form-group",children:[o.jsx("span",{className:"icon",children:o.jsx(O0,{})}),o.jsx("input",{type:"text",id:"username",placeholder:"Username",autoComplete:"username",value:e,onChange:p=>n(p.target.value)})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("span",{className:"icon",children:o.jsx(P0,{})}),o.jsx("input",{type:s?"text":"password",id:"password",placeholder:"Password",autoComplete:"current-password",value:t,onChange:p=>r(p.target.value)}),o.jsx("button",{type:"button",className:"toggle-eye",id:"toggleEye","aria-label":"Show password",onClick:()=>a(p=>!p),children:s?o.jsx(F0,{}):o.jsx(M0,{})})]}),o.jsx("button",{className:"btn-login",disabled:l,onClick:g,children:"Login"}),o.jsxs("div",{className:"login-footer",children:["Powered by ",o.jsx("b",{children:"ABHITECH EnergyCon Ltd."})]})]})})]})]})}const _0=`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

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
}`,B0=`/* ════════════════════════════════════════════════════════════════════
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
}`,D0=`/* ════════════════════════════════════════════════════════════════════
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
}`,z0=`/* Copied verbatim from the injected <style> in public/boiler-gate.js */
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
    `,kp=E.createContext(()=>{}),ss=()=>E.useContext(kp);function R0({children:e}){const[n,t]=E.useState({msg:"",type:"success",show:!1}),r=E.useRef(null),s=E.useCallback((a,l="success")=>{t({msg:a,type:l,show:!0}),clearTimeout(r.current),r.current=setTimeout(()=>t(i=>({...i,show:!1})),3200)},[]);return E.useEffect(()=>()=>clearTimeout(r.current),[]),o.jsxs(kp.Provider,{value:s,children:[e,o.jsx("div",{className:n.show?`toast toast-${n.type} show`:"toast",id:"toast",children:n.msg})]})}const wp=E.createContext({boilerType:null,setBoilerType:()=>{}}),mi=()=>E.useContext(wp);function U0({children:e}){const[n,t]=E.useState(()=>sessionStorage.getItem("boilerType")),r=E.useCallback(s=>{sessionStorage.setItem("boilerType",s),t(s)},[]);return E.useEffect(()=>(document.body.classList.toggle("boiler-locked",!n),()=>document.body.classList.remove("boiler-locked")),[n]),o.jsx(wp.Provider,{value:{boilerType:n,setBoilerType:r},children:e})}const V0=[{to:"/calculator",label:"CENPEEP"},{to:"/bs-2885",label:"BS-2885"},{to:"/asme-ptc-4-1",label:"ASME-PTC 4.1"},{to:"/bee",label:"BEE"},{to:"/summary",label:"Summary"},{to:"/sessions",label:"Sessions"}];function $0({active:e}){const{boilerType:n}=mi();return o.jsx("nav",{className:"navbar",children:o.jsxs("div",{className:"nav-inner",children:[o.jsxs("div",{className:"nav-logo",children:[o.jsx("div",{className:"nav-logo-icon",children:o.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),o.jsxs("span",{className:"nav-logo-text",children:["Boiler",o.jsx("small",{children:"Efficiency Calculator"})]}),n&&o.jsx("span",{id:"boiler-type-badge",className:"boiler-type-badge",title:"Boiler type selected at login",children:n})]}),o.jsx("div",{className:"nav-links",children:V0.map(t=>o.jsx(N0,{to:t.to,className:"nav-link"+(e===t.to?" active":""),children:t.label},t.to))}),o.jsx("button",{className:"nav-logout",onClick:()=>C0(),children:"Logout"})]})})}const ma=["CFBC","Pulverized Coal","AFBC","Bagasse Fired"];function lr(){const{boilerType:e}=mi();return o.jsxs("div",{className:"boiler-lock-banner",id:"boiler-lock-banner",style:{display:e?"none":"flex"},children:[o.jsx("div",{className:"boiler-lock-banner-icon",children:o.jsx(bp,{width:"20",height:"20"})}),o.jsxs("div",{className:"boiler-lock-banner-text",children:[o.jsx("strong",{children:"Boiler type not selected"}),o.jsx("span",{children:"Select your boiler type to unlock uploads and tab switching."})]}),o.jsx("button",{type:"button",className:"btn btn-primary",id:"boiler-select-trigger",onClick:()=>window.dispatchEvent(new CustomEvent("open-boiler-modal")),children:"Select Boiler Type"})]})}function H0(){const{boilerType:e,setBoilerType:n}=mi(),[t,r]=E.useState(!1),[s,a]=E.useState(e&&ma.includes(e)?e:ma[0]);return G0(()=>r(!0)),o.jsx("div",{className:"modal-overlay"+(t?" open":""),id:"boilerSelectOverlay",onClick:l=>{l.target===l.currentTarget&&r(!1)},children:o.jsxs("div",{className:"modal boiler-select-modal",children:[o.jsxs("div",{className:"modal-header",children:[o.jsx("h3",{children:"Select Your Boiler Type"}),o.jsx("button",{className:"modal-close",id:"boilerSelectClose","aria-label":"Close",type:"button",onClick:()=>r(!1),children:"×"})]}),o.jsxs("div",{className:"modal-body",children:[o.jsx("div",{className:"boiler-select-icon",children:o.jsx(bp,{width:"26",height:"26"})}),o.jsx("div",{className:"boiler-select-sub",children:"This helps tailor the calculation to your plant"}),o.jsxs("div",{className:"boiler-select-field",children:[o.jsx("label",{htmlFor:"boilerTypeSelect",children:"Boiler Type"}),o.jsx("div",{className:"select-wrap",children:o.jsx("select",{id:"boilerTypeSelect",value:s,onChange:l=>a(l.target.value),children:ma.map(l=>o.jsx("option",{value:l,children:l},l))})})]}),o.jsx("button",{type:"button",className:"btn btn-primary",id:"boilerSelectOk",onClick:()=>{n(s),r(!1)},children:"OK"})]})]})})}function G0(e){E.useEffect(()=>(window.addEventListener("open-boiler-modal",e),()=>window.removeEventListener("open-boiler-modal",e)))}const Bu={bs2885:B0,bee:D0};function ir({active:e,extraStyle:n,children:t}){return yp([_0,...Bu[n]?[Bu[n]]:[],z0],"app-"+(n||"base")),o.jsx(U0,{children:o.jsxs(R0,{children:[o.jsx(vp,{}),o.jsx($0,{active:e}),t,o.jsx(H0,{})]})})}function os({description:e,onFile:n,status:t,buttonLabel:r="Upload Excel Sheet"}){const s=E.useRef(null);return o.jsxs("div",{className:"upload-banner",id:"upload-banner",children:[o.jsx("div",{className:"upload-banner-icon",children:o.jsx(L0,{})}),o.jsxs("div",{className:"upload-banner-text",children:[o.jsx("strong",{children:"Import from Excel"}),o.jsx("span",{children:e})]}),o.jsxs("div",{className:"upload-banner-actions",children:[o.jsx("input",{type:"file",id:"upload-file-input",accept:".xlsx,.xls,.xlsm",ref:s,onChange:a=>{const l=a.target.files[0];l&&Promise.resolve(n(l)).finally(()=>{s.current&&(s.current.value="")})}}),o.jsxs("button",{className:"btn-upload",onClick:()=>s.current&&s.current.click(),children:[o.jsx(A0,{}),r]}),t&&o.jsx("span",{className:"upload-status "+t.cls,id:"upload-status",style:{display:"inline-block"},children:t.node!==void 0?t.node:t.text})]})]})}const Cp={cenpeep_column:"CenPeep layout",raw_tabular:"raw data, averaged",raw_tabular_ml:"raw data + AI field detection",raw_tabular_chunked:"large sheet, chunked",raw_tabular_ml_chunked:"large sheet, chunked + AI field detection",unrecognized:"no fields found"},W0={...Cp,generic_row_layout:"labeled-row layout",label_value_layout:"label/value form layout"},jp=Cp;function hi({data:e,populated:n,fieldDetail:t,missingFieldsList:r,strategyLabel:s,derivedLabel:a,bee:l}){const i=e.sheetResults||[],u=e.primarySheet||"",d=i.find(F=>F.sheetName===u),h=d?s[d.strategy]||d.strategy:"",g=Object.entries(t).sort(([,F],[,f])=>(F.label||"").localeCompare(f.label||"")).map(([F,f])=>{const c=typeof f.confidence=="number"?`${Math.round(f.confidence*100)}%`:"—",m=f.source==="ml"?"🤖 AI-detected":f.source==="cenpeep_column"?"CenPeep layout":f.source==="derived_fallback"?a:"exact match",b=f.header?`"${f.header}"`:f.label||F;return o.jsxs("tr",{children:[o.jsx("td",{children:f.label||F}),o.jsx("td",{children:b}),o.jsx("td",{children:m}),o.jsx("td",{children:c})]},F)}),p=r.map(F=>F.label||F.id||F);let x;p.length?x=o.jsxs(o.Fragment,{children:[o.jsx("br",{}),o.jsxs("small",{style:{color:"#f87171"},children:["⚠ Not detected — enter manually: ",p.join(", ")]})]}):!l||n?x=o.jsxs(o.Fragment,{children:[o.jsx("br",{}),o.jsx("small",{style:{color:"#4ade80"},children:"✓ All required fields detected"})]}):x=o.jsxs(o.Fragment,{children:[o.jsx("br",{}),o.jsx("small",{style:{color:"#94a3b8"},children:"BEE field detection isn't wired up on the server yet — enter values manually below."})]});const k=e.parseTimeMs?` in ${(e.parseTimeMs/1e3).toFixed(1)}s`:"",w=l?n===1?"":"s":"";return o.jsxs(o.Fragment,{children:[l?n?"✓":"ℹ":"✓"," ",o.jsxs("b",{children:[n," field",l?w:"s"]}),' auto-populated from "',e.filename,'" (',e.fileSizeMB||"?"," MB)",k,o.jsx("br",{}),o.jsxs("small",{style:{color:"#94a3b8"},children:["📄 Selected sheet: ",o.jsx("b",{children:u})," (",h,") — out of ",i.length," sheet(s) scanned"]}),g.length>0&&o.jsxs("table",{style:{width:"100%",fontSize:"12px",borderCollapse:"collapse",marginTop:"4px"},children:[o.jsx("thead",{children:o.jsxs("tr",{style:{color:"#94a3b8",textAlign:"left"},children:[o.jsx("th",{children:"Field"}),o.jsx("th",{children:"Detected From"}),o.jsx("th",{children:"Method"}),o.jsx("th",{children:"Confidence"})]})}),o.jsx("tbody",{children:g})]}),x]})}function Q0({anchorEl:e,selected:n,availableDates:t,onSelect:r,onClose:s}){const a=new Set(t||[]),l=n?new Date(n+"T00:00:00"):t&&t.length?new Date(t[t.length-1]+"T00:00:00"):new Date,[i,u]=E.useState({y:l.getFullYear(),m:l.getMonth()}),d=E.useRef(null),[h,g]=E.useState({top:0,left:0});E.useLayoutEffect(()=>{const c=e.getBoundingClientRect();g({top:window.scrollY+c.bottom+6,left:window.scrollX+c.left})},[e]),E.useEffect(()=>{const c=b=>{d.current&&!d.current.contains(b.target)&&b.target!==e&&s()},m=setTimeout(()=>document.addEventListener("mousedown",c),0);return()=>{clearTimeout(m),document.removeEventListener("mousedown",c)}},[e,s]);const p=new Date(i.y,i.m,1),x=p.getDay(),k=new Date(i.y,i.m+1,0).getDate(),w=p.toLocaleString("default",{month:"long"}),F=c=>u(({y:m,m:b})=>{let N=b+c,A=m;return N<0&&(N=11,A--),N>11&&(N=0,A++),{y:A,m:N}}),f=[];for(let c=0;c<x;c++)f.push(o.jsx("span",{className:"dp-cell dp-empty"},"e"+c));for(let c=1;c<=k;c++){const m=`${i.y}-${String(i.m+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,b=a.has(m),N=n===m;f.push(o.jsxs("span",{className:"dp-cell"+(b?" dp-has-data":"")+(N?" dp-selected":""),"data-date":m,onClick:()=>{r(m),s()},children:[c,b&&o.jsx("i",{className:"dp-dot"})]},m))}return lp.createPortal(o.jsxs("div",{className:"date-picker-popup",ref:d,style:{top:h.top+"px",left:h.left+"px"},children:[o.jsxs("div",{className:"dp-head",children:[o.jsx("button",{type:"button",className:"dp-nav",onClick:()=>F(-1),children:"‹"}),o.jsxs("span",{className:"dp-month",children:[w," ",i.y]}),o.jsx("button",{type:"button",className:"dp-nav",onClick:()=>F(1),children:"›"})]}),o.jsxs("div",{className:"dp-grid dp-dow",children:[o.jsx("span",{children:"S"}),o.jsx("span",{children:"M"}),o.jsx("span",{children:"T"}),o.jsx("span",{children:"W"}),o.jsx("span",{children:"T"}),o.jsx("span",{children:"F"}),o.jsx("span",{children:"S"})]}),o.jsx("div",{className:"dp-grid",children:f}),o.jsxs("div",{className:"dp-foot",children:[o.jsxs("span",{className:"dp-legend",children:[o.jsx("i",{className:"dp-dot"})," data available"]}),o.jsx("button",{type:"button",className:"dp-clear",onClick:()=>{r(null),s()},children:"Clear"})]})]}),document.body)}const Kr=(e,n=4)=>typeof e=="number"&&!isNaN(e)?e.toFixed(n):"—",O=e=>Kr(e,2),J0=(e,n=4)=>typeof e=="number"&&!isNaN(e)&&isFinite(e)?e.toFixed(n):"—",nn=e=>J0(e,2),Y0=(e,n=2)=>typeof e=="number"&&!isNaN(e)?(e>=0?"+":"")+e.toFixed(n):"—";function We(e){if(!e)return"—";const n=new Date(e+"T00:00:00");return isNaN(n.getTime())?e:n.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}const dt=(e,n)=>parseFloat(e[n])||0;function pl(e,n,t,r){return(e&&e.datedRows||[]).concat(r||[]).filter(a=>a.date&&(!n||a.date>=n)&&(!t||a.date<=t))}function gi(e,n,t,r=!1){const s=r?Object.values(e&&e.beeOverridesDated||{}).flat():[],a=pl(e,n,t,s),l={},i={};a.forEach(d=>Object.entries(d.values).forEach(([h,g])=>{l[h]=(l[h]||0)+g,i[h]=(i[h]||0)+1}));const u={};return Object.keys(l).forEach(d=>{u[d]=l[d]/i[d]}),{avg:u,rowCount:pl(e,n,t).length}}const Sp="cenpeep_lastUpload";function as(e,n){try{sessionStorage.setItem(Sp,JSON.stringify({filename:e.filename,primarySheet:e.primarySheet,sheetNameBS2885:e.sheetNameBS2885,extracted:e.extracted||{},extractedBS2885:e.extractedBS2885||{},sourceTab:n,savedAt:Date.now()}))}catch{}}function Yt(e,n){const t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=n,t.click()}function yi({uploadData:e,processes:n,onAdd:t,onRemove:r,onTitle:s,onDate:a}){const[l,i]=E.useState(null),u=E.useCallback(()=>i(null),[]),d=!!(e&&e.dateFilteringAvailable&&e.availableDates&&e.availableDates.length);let h="Optional — split this file into named date ranges and compare results side by side.";if(d){const p=e.availableDates;h=`Dated data found from ${p[0]} to ${p[p.length-1]} (${p.length} day${p.length===1?"":"s"} with readings) on "${e.primarySheet||""}".`}const g=l?n.find(p=>p.id===l.id):null;return o.jsxs("div",{className:"process-section",id:"process-section",style:{display:d?"":"none"},children:[o.jsxs("div",{className:"process-section-head",children:[o.jsxs("div",{className:"process-section-title",children:[o.jsxs("strong",{children:[o.jsx(T0,{}),"Date-wise Processes"]}),o.jsx("span",{className:"process-section-sub",id:"process-hint",children:h})]}),o.jsx("button",{type:"button",className:"btn btn-secondary",id:"add-process-btn",onClick:t,children:"+ Add Process"})]}),o.jsx("div",{id:"process-list",children:n.length?n.map(p=>{const x=pl(e,p.start,p.end).length;return o.jsxs("div",{className:"process-row","data-id":p.id,children:[o.jsx("input",{type:"text",className:"process-title-input",value:p.title,placeholder:"Process title",onChange:k=>s(p.id,k.target.value)}),o.jsx("button",{type:"button",className:"process-date-btn","data-role":"start",onClick:k=>i({id:p.id,role:"start",el:k.currentTarget}),children:p.start||"Start date"}),o.jsx("span",{className:"process-date-sep",children:"→"}),o.jsx("button",{type:"button",className:"process-date-btn","data-role":"end",onClick:k=>i({id:p.id,role:"end",el:k.currentTarget}),children:p.end||"End date"}),o.jsxs("span",{className:"process-row-count",children:[x," row",x===1?"":"s"," in range"]}),o.jsx("button",{type:"button",className:"process-remove-btn",onClick:()=>r(p.id),title:"Remove process",children:"✕"})]},p.id)}):o.jsx("div",{className:"process-empty",children:"No processes added — Calculate will use the whole file's average, same as today."})}),l&&g&&o.jsx(Q0,{anchorEl:l.el,selected:g[l.role],availableDates:e&&e.availableDates||[],onSelect:p=>a(l.id,l.role,p),onClose:u})]})}function vi(){const[e,n]=E.useState([]),[t,r]=E.useState(0);return{processes:e,setProcesses:n,add:()=>{const s=t+1;r(s),n(a=>[...a,{id:"proc"+s,title:`Process ${a.length+1}`,start:null,end:null}])},remove:s=>n(a=>a.filter(l=>l.id!==s)),setTitle:(s,a)=>n(l=>l.map(i=>i.id===s?{...i,title:a}:i)),setDate:(s,a,l)=>n(i=>i.map(u=>u.id===s?{...u,[a]:l}:u))}}function Xr({cards:e,open:n,onToggle:t}){return o.jsx("div",{className:"section-cards-grid",children:e.map(r=>o.jsxs("div",{className:"section-card"+(n[r.target]?" open":""),"data-target":r.target,onClick:()=>t(r.target),children:[o.jsx("div",{className:"section-card-icon",children:r.icon}),o.jsxs("div",{className:"section-card-body",children:[o.jsx("div",{className:"section-card-title",children:r.title}),o.jsx("div",{className:"section-card-sub",children:r.sub})]}),o.jsx("span",{className:"section-toggle",children:"▸"})]},r.target))})}function Zr({id:e,fields:n,open:t,values:r,derived:s={},onChange:a,detected:l,missing:i}){return o.jsx("div",{className:"input-grid"+(t?"":" is-collapsed"),id:e,children:n.map(u=>{const d=["field-input"];u.formula&&d.push("formula-input"),l.has(u.id)&&d.push("field-detected"),i.has(u.id)&&d.push("field-missing");const h=u.readonly?s[u.id]??"":r[u.id]??"";return o.jsxs("div",{className:"field"+(u.kind?" "+u.kind:""),children:[o.jsxs("div",{className:"field-top",children:[o.jsxs("span",{className:"field-name",children:[u.name,u.tag&&o.jsxs(o.Fragment,{children:[" ",o.jsx("span",{className:u.tag.cls,children:u.tag.text})]})]}),o.jsx("span",{className:"field-sym",children:u.sym})]}),o.jsxs("div",{className:"field-bottom",children:[o.jsx("input",{className:d.join(" "),id:u.id,type:"number",value:h,step:u.step,readOnly:u.readonly,onChange:u.readonly?void 0:g=>a(u.id,g.target.value)}),o.jsx("span",{className:"field-uom",children:u.uom})]})]},u.id)})})}const Np={cenpeep:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, Design conditions, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, Design conditions, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual/Design inputs."},asme:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual inputs."},bee:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual inputs."}},Le=({cls:e,label:n,children:t,sub:r,style:s})=>o.jsxs("div",{className:"kpi-card "+e,style:s,children:[o.jsx("div",{className:"kpi-label",children:n}),t,r!==void 0&&o.jsx("div",{className:"kpi-sub",children:r})]}),te=({name:e,sym:n,val:t,uom:r})=>o.jsxs("div",{className:"output-row",children:[o.jsx("span",{className:"out-name",children:e}),o.jsx("span",{className:"out-sym",children:n}),o.jsx("span",{className:"out-val",children:O(t)}),o.jsx("span",{className:"out-uom",children:r})]}),rr=({a:e="Parameter",b:n="Symbol",c:t="Value",d:r="UoM"})=>o.jsxs("div",{className:"output-row header-row",children:[o.jsx("span",{children:e}),o.jsx("span",{style:{textAlign:"right"},children:n}),o.jsx("span",{style:{textAlign:"right"},children:t}),o.jsx("span",{style:{textAlign:"right"},children:r})]}),go=({open:e,onClick:n,children:t})=>o.jsxs("div",{className:"output-section-head collapsible-head"+(e?" open":""),onClick:n,children:[o.jsx("span",{children:t}),o.jsx("span",{className:"collapse-chevron",children:e?"▾":"▸"})]});function xi({p1:e,p2:n,eff1:t,eff2:r,suffix:s=""}){const a=r-t;return o.jsxs("div",{className:"kpi-card "+(a>=0?"kpi-green":"kpi-red"),children:[o.jsx("div",{className:"kpi-label",children:"Delta Difference"}),o.jsxs("div",{className:"kpi-value",children:[Y0(a),o.jsx("span",{className:"kpi-unit",children:"%"})]}),o.jsxs("div",{className:"kpi-sub",children:[n.title," − ",e.title," (Boiler Eff.",s,")"]})]})}function bi({list:e,perProcessIds:n,labels:t,open:r,onToggle:s,page:a,thBadge:l,flag:i}){const u=Np[a];return o.jsxs("div",{className:"output-section",children:[o.jsx(go,{open:r,onClick:s,children:"Process Inputs"}),r&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"cmp-table-wrap",children:o.jsxs("table",{className:"cmp-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"From the dated log — varies per process"}),e.map((d,h)=>o.jsxs("th",{children:[d.title,l&&l(d),o.jsxs("div",{className:"cmp-th-date",children:[We(d.start)," → ",We(d.end)]})]},h))]})}),o.jsx("tbody",{children:n.length?n.map(d=>o.jsxs("tr",{children:[o.jsx("td",{className:"cmp-metric",children:t[d]||d}),e.map((h,g)=>{const p=h.result.inputs.find(x=>x.id===d);return o.jsxs("td",{children:[Kr(p?p.value:0,3),i&&i(h,d)]},g)})]},d)):o.jsx("tr",{children:o.jsx("td",{colSpan:e.length+1,children:u.noDate})})})]})}),o.jsx("div",{className:"cmp-note",children:u.inputsNote})]})]})}function ki({list:e,rows:n,open:t,onToggle:r,page:s,thBadge:a}){return o.jsxs("div",{className:"output-section",children:[o.jsx(go,{open:t,onClick:r,children:"Process Comparison"}),t&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"cmp-table-wrap",children:o.jsxs("table",{className:"cmp-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),e.map((l,i)=>o.jsxs("th",{children:[l.title,a&&a(l)]},i))]})}),o.jsx("tbody",{children:n.map(([l,i])=>o.jsxs("tr",{children:[o.jsx("td",{className:"cmp-metric",children:l}),e.map((u,d)=>o.jsx("td",{children:i(u)},d))]},l))})]})}),o.jsx("div",{className:"cmp-note",children:Np[s].comparisonNote})]})]})}const At=({children:e})=>o.jsxs(o.Fragment,{children:[" ",o.jsx("span",{className:"cmp-badge",children:e})]});function K0(e){const n=dt(e,"O2in"),t=dt(e,"O2out"),r=dt(e,"Md"),s=dt(e,"Ad"),a=dt(e,"VMd"),l=dt(e,"FCd"),i=dt(e,"Sd"),u=l/(1-1.1*s/100-r/100),d=100-u,h=u+.9*(d-14),g=d*(7.35/(d+10)-.013),p=2.1-.012*d,x=(a+l)/(d+u),k=h*x,w=g*x,F=p*x,f=r,c=s,m=100-k-i-w-f-F-c;return{CO2in:(19.3-n).toFixed(2),CO2out:(19.3-t).toFixed(2),Cd:O(k),Hd:O(w),Nd:O(F),Od:O(m),Md2:O(f),Ad2:O(c)}}const fl=["L","Ffw","Fin","Cba","Cfa","Pfa","Pba","M","A","VM","FC","GCV","S","O2in","CO2in","COin","O2out","CO2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa","Tref","Md","Ad","VMd","FCd","Cd","Sd","Hd","Md2","Nd","Od","Ad2","GCVd","Trad","Mwvd"],Ep={L:"Unit Load (MW)",Ffw:"Steam Flow (T/hr)",Fin:"Total Coal Flow (T/hr)",Cba:"Unburnt C Bottom Ash (%)",Cfa:"Unburnt C Fly Ash (%)",Pfa:"% Fly Ash",Pba:"% Bottom Ash",M:"Moisture (%)",A:"Ash (%)",VM:"Volatile Matter (%)",FC:"Fixed Carbon (%)",GCV:"GCV (kcal/kg)",S:"Sulfur (%)",O2in:"O2 APH In (%)",CO2in:"CO2 APH In (%)",COin:"CO APH In (ppm)",O2out:"O2 APH Out (%)",CO2out:"CO2 APH Out (%)",COout:"CO APH Out (ppm)",Tgi:"FG Temp APH In (°C)",Tgo:"FG Temp APH Out (°C)",Tpai:"PA Temp In (°C)",Tpao:"PA Temp Out (°C)",Tsai:"SA Temp In (°C)",Tsao:"SA Temp Out (°C)",Fsa:"SA Flow (TPH)",Fpa:"PA Flow (TPH)",Tref:"Ambient Temp (°C)",Md:"Moisture Design (%)",Ad:"Ash Design (%)",VMd:"VM Design (%)",FCd:"FC Design (%)",Cd:"Carbon Design (%)",Sd:"Sulfur Design (%)",Hd:"Hydrogen Design (%)",Md2:"Moisture Design Ultimate (%)",Nd:"Nitrogen Design (%)",Od:"Oxygen Design (%)",Ad2:"Ash Design Ultimate (%)",GCVd:"GCV Design (kcal/kg)",Trad:"Ref Air Temp Design (°C)",Mwvd:"Moisture in Air Design (kg/kg)"},Vn=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function X0(e){const n={...e},t=Vn(n,"O2in"),r=Vn(n,"O2out");n.CO2in=19.3-t,n.CO2out=19.3-r;const s=Vn(n,"Md"),a=Vn(n,"Ad"),l=Vn(n,"VMd"),i=Vn(n,"FCd"),u=Vn(n,"Sd"),d=i/(1-1.1*a/100-s/100),h=100-d,g=d+.9*(h-14),p=h*(7.35/(h+10)-.013),x=2.1-.012*h,k=(l+i)/(h+d);return n.Cd=g*k,n.Hd=p*k,n.Nd=x*k,n.Md2=s,n.Ad2=a,n.Od=100-n.Cd-u-n.Hd-n.Md2-n.Nd-n.Ad2,n}function Tt(e){const n=X0(e),t=Et=>Vn(n,Et),r=t("M"),s=t("A"),a=t("VM"),l=t("FC"),i=t("GCV"),u=t("S")||.3,d=t("O2in"),h=t("O2out"),g=t("COout");t("COin");const p=t("Tgi"),x=t("Tgo");t("Tpai"),t("Tpao");const k=t("Tsai");t("Tsao"),t("Fsa"),t("Fpa");const w=t("Cba"),F=t("Cfa"),f=t("Pfa")||80,c=t("Pba")||20,m=t("Lrad")||1.09,b=t("Trad")||35,N=30.6,A=.0166,C=g/1e6*100,j=.97*l+.7*(a+.1*s)-r*(.6-.01*r),_=.036*l+.086*(a-.1*s)-.0035*r*r*(1-.02*r),I=2.1-.02*a,W=100-r-s-j-_-u-I,J=k,Y=19.3-d,K=18.5-h,ae=100-(h+K+C),le=f/100*F+c/100*w,Z=s/100*le/(100-le),T=(h-d)/(21-h)*.9*100,D=T*.24*(x-J)/(100*.13286)+x,H=(b*(p-D)+p*(D-J))/(p-J),S=H-b,P=(11.6*j+34.8*(_-W/8)+4.35*u)/100,U=(1+h/(21-h)*100/100)*P,M=(j/100*44/12+I/100+U*77/100+(U-P)*23/100)*.24*S/i*100,G=9*(_/100)*(584+.45*S)/i*100,$=r/100*(584+.45*S)/i*100,me=U*.01765*.45*S/i*100,he=K+C>0?C*j/100/(C+K)*5744/i*100:0,je=(s*c/100*w/(100*(100-w))+s*f/100*F/(100*(100-F)))*8084*100/i,en=100-(M+G+$+me+he+m+je),Nn=(2.66*(j-Z*100)+7.937*_+.996*u-W)/23.2,it=1+(h-C/2)/(.2682*ae-(h-C)),ur=Nn*it*A,zn=(j+u/2.67-100*Z)/(12*K),Re=zn*N*(x-J),En=1.88*(x-25)+2442+4.2*(25-J),Do=D,ut=t("Cd"),ls=t("Sd"),cr=t("Hd"),zo=t("Od"),Nt=t("Ad2"),cn=t("GCVd"),v=t("Mwvd"),R=t("Md2"),z=2415,V=(Y-K)*.9*100/K,se=(b*(p-x)+p*(x-J))/(p-J),ne=(ut+ls/2.67-100*Z)/(12*K)*N*(se-b)*100/(cn*4.186),Ie=Math.exp(.225*ut/cr)-Math.exp(.225*j/_),Rn=t("VMd")<17?.013*(Nt*i/(s*cn))*Ie:0,Qe=je*(Nt*i/(s*cn))+Rn,dn=1.88*(se-25)+2442+4.2*(25-b),ct=dn*R/(cn*4.186),is=9*cr*dn/(cn*4.186),pn=C*7*z*(ut-100*Z)/3/(K+C)/cn,Ro=(2.66*(ut-Z*100)+7.937*cr+.996*ls-zo)/23.2,Up=1+(h-C/2)/(.2682*ae-(h-C)),Ni=Ro*Up*v*1.88*(se-b)*100/(cn*4.186),Vp=100-(ne+Qe+ct+is+pn+Ni+m);return{CO2in:Y,CO2out:K,COoutp:C,Trai:J,Cash:le,U:Z,N2out:ae,Sa:Nn,Ea:it,Ma:ur,Wd:zn,Sh:Re,Sw:En,Ldg:M,Luc:je,Lmf:$,Lhf:G,Lco:he,Lma:me,Lrad:m,BoilerEff:en,AL:T,Tgnl:Do,Tgc:H,ALd:V,Tgcd:se,Ldgc:ne,Lucc:Qe,Lmfc:ct,Lhfc:is,Lcoc:pn,Lmac:Ni,BoilerEffCorr:Vp,inputs:fl.map(Et=>({id:Et,label:Ep[Et]||Et,value:n[Et]}))}}const Lp=[{target:"grid-general",icon:"GD",title:"General Data",sub:"7 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis — As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters — APH",sub:"15 parameters"},{target:"grid-design-prox",icon:"DP",title:"Design Conditions — Proximate",sub:"4 parameters"},{target:"grid-design-ult",icon:"DU",title:"Design Conditions — Ultimate Analysis",sub:"10 parameters"}],ml={"grid-general":[{id:"L",name:"Unit Load",sym:"L",uom:"MW",kind:"",value:"210",readonly:!1},{id:"Ffw",name:"Steam Flow",sym:"Ffw",uom:"T/hr",kind:"",value:"615",readonly:!1},{id:"Fin",name:"Total Coal Flow",sym:"Fin",uom:"T/hr",kind:"",value:"140",readonly:!1},{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2in",name:"Avg. Flue Gas O₂ — APH In",sym:"O2in",uom:"%",kind:"",value:"3.5",readonly:!1},{id:"CO2in",name:"Avg. Flue Gas CO₂ — APH In",sym:"CO2in",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COin",name:"Avg. Flue Gas CO — APH In",sym:"COin",uom:"ppm",kind:"field-manual",value:"39",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"O2out",name:"Avg. Flue Gas O₂ — APH Out",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1},{id:"CO2out",name:"Avg. Flue Gas CO₂ — APH Out",sym:"CO2out",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COout",name:"Avg. Flue Gas CO — APH Out",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1},{id:"Tgi",name:"Avg. Flue Gas Temp — APH In",sym:"Tgi",uom:"°C",kind:"",value:"350",readonly:!1},{id:"Tgo",name:"Avg. Flue Gas Temp — APH Out",sym:"Tgo",uom:"°C",kind:"",value:"135",readonly:!1},{id:"Tpai",name:"Primary Air to APH Temp In",sym:"Tpai",uom:"°C",kind:"",value:"40",readonly:!1},{id:"Tpao",name:"Primary Air from APH Temp Out",sym:"Tpao",uom:"°C",kind:"",value:"325",readonly:!1},{id:"Tsai",name:"Secondary Air to APH Temp In",sym:"Tsai",uom:"°C",kind:"",value:"34",readonly:!1},{id:"Tsao",name:"Secondary Air from APH Temp Out",sym:"Tsao",uom:"°C",kind:"",value:"325",readonly:!1},{id:"Fsa",name:"Total Secondary Air Flow",sym:"Fsa",uom:"TPH",kind:"",value:"450",readonly:!1},{id:"Fpa",name:"Total Primary Air Flow",sym:"Fpa",uom:"TPH",kind:"",value:"250",readonly:!1},{id:"Tref",name:"Design Ambient / Ref Air Temp",sym:"Tref",uom:"°C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-prox":[{id:"Md",name:"Moisture — Design",sym:"Md",uom:"%",kind:"field-manual",value:"13",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Ad",name:"Ash — Design",sym:"Ad",uom:"%",kind:"field-manual",value:"40",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"VMd",name:"Volatile Matter — Design",sym:"VMd",uom:"%",kind:"field-manual",value:"24",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"FCd",name:"Fixed Carbon — Design",sym:"FCd",uom:"%",kind:"field-manual",value:"23",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-ult":[{id:"Cd",name:"Carbon — Design",sym:"Cd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Sd",name:"Sulfur — Design",sym:"Sd",uom:"%",kind:"field-manual",value:"0.3",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Hd",name:"Hydrogen — Design",sym:"Hd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Md2",name:"Moisture — Design (Ultimate)",sym:"Md2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Nd",name:"Nitrogen — Design",sym:"Nd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Od",name:"Oxygen — Design",sym:"Od",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Ad2",name:"Ash — Design (Ultimate)",sym:"Ad2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"GCVd",name:"GCV — Design",sym:"GCVd",uom:"kcal/kg",kind:"field-manual",value:"3300",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Trad",name:"Ref. Air Temp — Design",sym:"Trad",uom:"°C",kind:"field-manual",value:"38",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Mwvd",name:"Moisture in Air — Design",sym:"Mwvd",uom:"kg/kg",kind:"field-manual",value:"0.013",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},Z0=Lp.slice(0,3),q0=Lp.slice(3),Ap=["grid-general","grid-proximate","grid-plant"],Tp=["grid-design-prox","grid-design-ult"],wi=[...Ap,...Tp].flatMap(e=>ml[e]),eh=Object.fromEntries(wi.map(e=>[e.id,e.value??""])),nh=new Set(wi.filter(e=>!e.readonly).map(e=>e.id)),Du=["M","A","VM","FC","GCV"],th={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},ha=[["Date Range",e=>`${We(e.start)} → ${We(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>O(e.result.BoilerEff)],["Boiler Efficiency Corrected (%)",e=>O(e.result.BoilerEffCorr)],["Dry Gas Loss (%)",e=>O(e.result.Ldg)],["Unburnt Carbon Loss (%)",e=>O(e.result.Luc)],["Moisture Fuel Loss (%)",e=>O(e.result.Lmf)],["Hydrogen Fuel Loss (%)",e=>O(e.result.Lhf)],["CO Loss (%)",e=>Kr(e.result.Lco)],["Moisture Air Loss (%)",e=>O(e.result.Lma)],["Radiation & Unaccounted Loss (%)",e=>O(e.result.Lrad)],["CO₂ — APH In (%)",e=>O(e.result.CO2in)],["CO₂ — APH Out (%)",e=>O(e.result.CO2out)]],zu=e=>e.start||e.end||null;function rh(){const e=ss();E.useEffect(()=>{document.title="Boiler Efficiency Calculator — CENPEEP"},[]);const[n,t]=E.useState("input"),[r,s]=E.useState(eh),[a,l]=E.useState(new Set),[i,u]=E.useState(new Set),[d,h]=E.useState({}),[g,p]=E.useState(null),[x,k]=E.useState(null),[w,F]=E.useState(null),f=vi(),[c,m]=E.useState(null),[b,N]=E.useState(null),[A,C]=E.useState(!1),[j,_]=E.useState(null),[I,W]=E.useState(null),[J,Y]=E.useState(!1),[K,ae]=E.useState(!1),[le,Z]=E.useState({processInputsOpen:!1,processComparisonOpen:!1}),T=E.useMemo(()=>K0(r),[r]),D=(v,R)=>s(z=>({...z,[v]:R})),H=v=>h(R=>({...R,[v]:!R[v]})),S=(v=j)=>{const R={...r,...T},z={};return fl.forEach(V=>{z[V]=R[V]!==void 0?R[V]:0}),z.Lrad=v!==null?parseFloat(v)||0:1.2,z},P=(v,R)=>gi(x,v,R),X=async v=>{p({cls:"loading",text:"⏳ Parsing all sheets…"});const R=new FormData;R.append("file",v);try{const V=await(await an("/api/upload",{method:"POST",body:R})).json();if(!V.ok)throw new Error(V.error||"Upload failed");as(V,"CENPEEP");const se=V.extracted||{},ye={...r},ke=new Set;let ne=0;for(const[Qe,dn]of Object.entries(se))nh.has(Qe)&&(ye[Qe]=String(typeof dn=="number"?parseFloat(dn.toFixed(6)):dn),ke.add(Qe),ne++);const Ie=V.missingFields||[],Rn=new Set;for(const Qe of Ie){const dn=Qe.id||Qe;wi.some(ct=>ct.id===dn)&&Rn.add(dn)}s(ye),l(ke),u(Rn),F(V.filename),k(V),f.setProcesses([]),N(null),C(!1),p({cls:"success",node:hi({data:V,populated:ne,fieldDetail:V.fieldDetail||{},missingFieldsList:Ie,strategyLabel:jp,derivedLabel:"↳ defaulted from Secondary Air",bee:!1})}),e(`Excel imported — ${ne} fields auto-populated from "${V.primarySheet||""}"`,"success")}catch(z){p({cls:"error",text:`✗ ${z.message}`}),e(z.message,"error")}},U=()=>{const v=f.processes.filter(V=>V.start||V.end);if(W(null),Y(!1),ae(!1),!v.length){C(!1);const V=Tt(S());m(V),_(String(V.Lrad||1.09)),N(null),t("output");return}const R=S(),z=v.map(V=>{const{avg:se,rowCount:ye}=P(V.start,V.end),ke=Tt({...R,...se});return{title:V.title||"Process",start:V.start,end:V.end,rowCount:ye,result:ke}});N(z),C(!0),m(z[0].result),_(null),t("output")},y=v=>{if(_(v),!c)return;const R=parseFloat(v)||0,z=c;m({...z,Lrad:R,BoilerEff:100-(z.Ldg+z.Luc+z.Lmf+z.Lhf+z.Lco+z.Lma+R)})},M=()=>{if(!c){e("Calculate first.","error");return}const v=Tt(S());m(v),_(String(v.Lrad||1.09)),ae(!0),e("APH correction recalculated using the current Design Conditions parameters.","success")},G=()=>{I&&(N(v=>v.map((R,z)=>z===I.targetIdx?{...R,result:R._originalResult,_originalResult:void 0,gcvCorrected:!1}:R)),W(null),e("GCV correction removed.","success"))},$=()=>{const v=b;if(!A||!v||v.length!==2){e("GCV correction needs exactly two active processes.","error");return}if(I){G();return}const[R,z]=v,V=zu(R),se=zu(z);if(!V||!se){e("Both processes need at least one date set to apply GCV correction.","error");return}if(V===se){e("Both processes resolve to the same date — cannot tell which is later.","error");return}const ye=se>V?1:0,ke=se>V?0:1,ne=v[ye],Ie=v[ke],Rn=S(),{avg:Qe}=P(Ie.start,Ie.end),{avg:dn}=P(ne.start,ne.end),ct={...Rn,...dn};Du.forEach(pn=>{ct[pn]=Qe[pn]!==void 0?Qe[pn]:Rn[pn]});const is=v.map((pn,Ro)=>Ro===ye?{...pn,_originalResult:pn.result,result:Tt(ct),gcvCorrected:!0}:{...pn,result:Tt({...Rn,...Qe})});N(is),W({targetIdx:ye,sourceIdx:ke,targetTitle:ne.title,sourceTitle:Ie.title}),e(`GCV correction applied — "${ne.title}" now uses "${Ie.title}"'s Proximate As-Fired data.`,"success")},me=()=>{if(!A||!b||b.length!==2){e("APH correction needs exactly two active processes.","error");return}const v=!J;Y(v),e(v?"APH correction applied — Boiler Efficiency now shows the APH-corrected value for both processes.":"APH correction removed.","success")},he=()=>{s(v=>{const R={...v};return Object.entries(th).forEach(([z,V])=>{z in R&&(R[z]=String(V))}),R}),F(null),k(null),f.setProcesses([]),C(!1),W(null),Y(!1),ae(!1),Z({processInputsOpen:!1,processComparisonOpen:!1}),p(null)},je=async(v,R)=>{const z={sessionName:R,sourceFile:w||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:v.inputs,results:{BoilerEff:v.BoilerEff,BoilerEffCorr:v.BoilerEffCorr,Ldg:v.Ldg,Luc:v.Luc,Lmf:v.Lmf,Lhf:v.Lhf,Lco:v.Lco,Lma:v.Lma,Lrad:v.Lrad,CO2in:v.CO2in,CO2out:v.CO2out,Trai:v.Trai,AL:v.AL,Tgc:v.Tgc,Ldgc:v.Ldgc,Lucc:v.Lucc,Lmfc:v.Lmfc,Lhfc:v.Lhfc,Lcoc:v.Lcoc,Lmac:v.Lmac}},se=await(await an("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(z)})).json();if(!se.ok)throw new Error(se.error)},en=async()=>{if(A&&b&&b.length){if(!window.confirm(`Save all ${b.length} process result(s) to the database?`))return;try{for(const R of b)await je(R.result,`${w||"Manual Entry"} — ${R.title}`);e("✓ All process results saved to MongoDB!","success")}catch(R){e("Save failed: "+R.message,"error")}return}if(!c){e("Calculate first before saving.","error");return}const v=window.prompt("Session name (optional):",w||"");if(v!==null)try{await je(c,v.trim()),e("✓ Session saved to MongoDB!","success")}catch(R){e("Save failed: "+R.message,"error")}},Nn=()=>new Date().toISOString().slice(0,19).replace("T"," "),it=()=>{const v=b,R=Nn();let z=`CENPEEP Boiler Efficiency — Process Comparison
Generated:,${R}

`;z+="Metric,"+v.map(V=>`"${V.title}"`).join(",")+`
`,ha.forEach(([V,se])=>{z+=`"${V}",`+v.map(ye=>`"${se(ye)}"`).join(",")+`
`}),Yt(new Blob([z],{type:"text/csv"}),`cenpeep_comparison_${R.replace(/[: ]/g,"_")}.csv`)},ur=()=>{if(A&&b&&b.length){it();return}if(!c){e("Calculate first.","error");return}const v=c,R=Nn();let z=`CENPEEP Boiler Efficiency Report
Generated:,${R}

INPUTS
Parameter,Value
`;v.inputs.forEach(V=>{z+=`"${V.label}",${V.value}
`}),z+=`
OUTPUTS
Parameter,Symbol,Value,UoM
`,[["CO₂ APH In","CO2in",v.CO2in,"%"],["CO₂ APH Out","CO2out",v.CO2out,"%"],["Weighted Air Temp In","Trai",v.Trai,"°C"],["Dry Gas Loss","Ldg",v.Ldg,"%"],["Unburnt Carbon Loss","Luc",v.Luc,"%"],["Moisture Fuel Loss","Lmf",v.Lmf,"%"],["Hydrogen Fuel Loss","Lhf",v.Lhf,"%"],["CO Loss","Lco",v.Lco,"%"],["Moisture Air Loss","Lma",v.Lma,"%"],["Radiation Loss","Lrad",v.Lrad,"%"],["Boiler Efficiency","eta",v.BoilerEff,"%"],["Boiler Efficiency Corrected","eta_corr",v.BoilerEffCorr,"%"]].forEach(([V,se,ye,ke])=>{z+=`"${V}","${se}",${typeof ye=="number"?ye.toFixed(4):""},,"${ke}"
`}),Yt(new Blob([z],{type:"text/csv"}),`cenpeep_report_${R.replace(/[: ]/g,"_")}.csv`)},zn="body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}.meta{color:#666;font-size:11px;margin-bottom:16px}",Re=()=>{const v=b,R=new Date().toLocaleString(),z=window.open("","_blank");z.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Comparison Report</title>
  <style>${zn}</style></head><body>
  <h1>CENPEEP Boiler Efficiency — Process Comparison</h1><p class="meta">Generated: ${R}</p>
  <table><tr><th>Metric</th>${v.map(V=>`<th>${V.title}</th>`).join("")}</tr>
  ${ha.map(([V,se])=>`<tr><td>${V}</td>${v.map(ye=>`<td>${se(ye)}</td>`).join("")}</tr>`).join("")}
  </table><script>window.print();<\/script></body></html>`),z.document.close()},En=()=>{if(A&&b&&b.length){Re();return}if(!c){e("Calculate first.","error");return}const v=c,R=new Date().toLocaleString(),z=window.open("","_blank");z.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Report</title>
  <style>${zn}h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}.hl{background:#e6fff5!important;font-weight:bold}</style></head><body>
  <h1>CENPEEP Boiler Efficiency Report</h1><p class="meta">Generated: ${R}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${v.inputs.map(V=>`<tr><td>${V.label}</td><td>${V.value}</td></tr>`).join("")}</table>
  <h2>Losses</h2><table><tr><th>Parameter</th><th>Symbol</th><th>Value</th><th>UoM</th></tr>
  <tr><td>CO₂ APH In</td><td>CO₂in</td><td>${O(v.CO2in)}</td><td>%</td></tr>
  <tr><td>CO₂ APH Out</td><td>CO₂out</td><td>${O(v.CO2out)}</td><td>%</td></tr>
  <tr><td>Dry Gas Loss</td><td>Ldg</td><td>${O(v.Ldg)}</td><td>%</td></tr>
  <tr><td>Unburnt Carbon Loss</td><td>Luc</td><td>${O(v.Luc)}</td><td>%</td></tr>
  <tr><td>Moisture Fuel Loss</td><td>Lmf</td><td>${O(v.Lmf)}</td><td>%</td></tr>
  <tr><td>Hydrogen Fuel Loss</td><td>Lhf</td><td>${O(v.Lhf)}</td><td>%</td></tr>
  <tr><td>CO Loss</td><td>Lco</td><td>${Kr(v.Lco)}</td><td>%</td></tr>
  <tr><td>Moisture Air Loss</td><td>Lma</td><td>${O(v.Lma)}</td><td>%</td></tr>
  <tr><td>Radiation Loss</td><td>Lrad</td><td>${O(v.Lrad)}</td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td><b>${O(v.BoilerEff)}</b></td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency Corrected</b></td><td>η_corr</td><td><b>${O(v.BoilerEffCorr)}</b></td><td>%</td></tr>
  </table><script>window.print();<\/script></body></html>`),z.document.close()},Do=async()=>{const v=x;if(!v||!v.fieldDetail||!Object.keys(v.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}const R={filename:v.filename,primarySheet:v.primarySheet,fieldDetail:v.fieldDetail,extracted:v.extracted,missingFields:v.missingFields};A&&b&&b.length&&(R.processes=b.map(z=>{const{avg:V,rowCount:se}=P(z.start,z.end);return{title:z.title,start:z.start,end:z.end,rowCount:se,avg:V}}));try{const z=await an("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)});if(!z.ok){const ke=await z.json().catch(()=>({}));throw new Error(ke.error||`Report generation failed (${z.status})`)}const V=await z.blob(),ye=(z.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);Yt(V,ye?ye[1]:"CENPEEP_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(z){e("Report failed: "+z.message,"error")}},ut=v=>Z(R=>({...R,[v]:!R[v]})),ls=v=>o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"kpi-card kpi-green",children:[o.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),o.jsxs("div",{className:"kpi-value boiler-eff-val",children:[O(v.BoilerEff),o.jsx("span",{className:"kpi-unit",children:"%"})]}),o.jsx("div",{className:"kpi-sub",children:"Indirect method — as-tested"})]}),o.jsxs("div",{className:"kpi-card kpi-blue",children:[o.jsx("div",{className:"kpi-label",children:"Boiler Efficiency Corrected"}),o.jsxs("div",{className:"kpi-value boiler-eff-corr-val",children:[O(v.BoilerEffCorr),o.jsx("span",{className:"kpi-unit",children:"%"})]}),o.jsx("div",{className:"kpi-sub",children:"Corrected to design conditions"}),K&&o.jsx("div",{className:"kpi-note",children:"Please check the input parameters if you feel any issue in the corrected efficiency figure."})]}),o.jsx(Le,{cls:"kpi-red",label:"Dry Gas Loss",children:o.jsxs("div",{className:"kpi-value",children:[O(v.Ldg),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-amber",label:"Loss — Unburnt Carbon",children:o.jsxs("div",{className:"kpi-value",children:[O(v.Luc),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-blue",label:"Loss — Moisture in Fuel",children:o.jsxs("div",{className:"kpi-value",children:[O(v.Lmf),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-green",label:"Loss — Hydrogen in Fuel",children:o.jsxs("div",{className:"kpi-value",children:[O(v.Lhf),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-amber",label:"Loss — Carbon Monoxide",children:o.jsxs("div",{className:"kpi-value",children:[Kr(v.Lco),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-blue",label:"Loss — Moisture in Air",children:o.jsxs("div",{className:"kpi-value",children:[O(v.Lma),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsxs("div",{className:"kpi-card kpi-red",style:{gridColumn:"span 2"},children:[o.jsx("div",{className:"kpi-label",children:"Radiation & Unaccounted Loss"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[o.jsx("input",{type:"number",id:"Lrad",value:j??"",onChange:R=>y(R.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),o.jsx("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),o.jsx("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),o.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(K?" applied":""),onClick:M,children:[o.jsxs("div",{className:"kpi-label",children:["APH Correction",K&&o.jsx(At,{children:"Applied"})]}),o.jsx("div",{className:"kpi-value kpi-action-value",children:K?"Recalculate Again":"Apply APH Correction"}),o.jsx("div",{className:"kpi-sub",children:"Uses the Design Conditions (APH Correction) tab"})]})]}),cr=v=>o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"output-section",children:[o.jsx("div",{className:"output-section-head",children:o.jsx("span",{children:"Corrected Losses"})}),o.jsx(rr,{}),o.jsx(te,{name:"Dry Gas Loss (Corrected)",sym:"Ldgc",val:v.Ldgc,uom:"%"}),o.jsx(te,{name:"Unburnt Carbon Loss (Corrected)",sym:"Lucc",val:v.Lucc,uom:"%"}),o.jsx(te,{name:"Moisture Fuel Loss (Corrected)",sym:"Lmfc",val:v.Lmfc,uom:"%"}),o.jsx(te,{name:"Hydrogen Fuel Loss (Corrected)",sym:"Lhfc",val:v.Lhfc,uom:"%"}),o.jsx(te,{name:"CO Loss (Corrected)",sym:"Lcoc",val:v.Lcoc,uom:"%"}),o.jsx(te,{name:"Moisture Air Loss (Corrected)",sym:"Lmac",val:v.Lmac,uom:"%"}),o.jsxs("div",{className:"output-row highlight-row2",children:[o.jsx("span",{className:"out-name",children:"Boiler Efficiency — Corrected"}),o.jsxs("span",{className:"out-sym",children:["η",o.jsx("sub",{children:"corr"})]}),o.jsx("span",{className:"out-val",children:O(v.BoilerEffCorr)}),o.jsx("span",{className:"out-uom",children:"%"})]})]}),o.jsxs("div",{className:"output-section",children:[o.jsx("div",{className:"output-section-head",children:o.jsx("span",{children:"Intermediate Values"})}),o.jsx(rr,{}),o.jsx(te,{name:"CO₂ — APH In",sym:"CO₂in",val:v.CO2in,uom:"%"}),o.jsx(te,{name:"CO₂ — APH Out",sym:"CO₂out",val:v.CO2out,uom:"%"}),o.jsx(te,{name:"Weighted Air Temp In",sym:"Trai",val:v.Trai,uom:"°C"}),o.jsx(te,{name:"AH Leakage",sym:"AL",val:v.AL,uom:"%"}),o.jsx(te,{name:"Gas Temp — Corrected",sym:"Tgc",val:v.Tgc,uom:"°C"}),o.jsx(te,{name:"Stoichiometric Air",sym:"Sa",val:v.Sa,uom:"kg/kg"}),o.jsx(te,{name:"Excess Air",sym:"Ea",val:v.Ea,uom:"—"})]})]}),zo=v=>{const R=J,z=ne=>R?ne.result.BoilerEffCorr:ne.result.BoilerEff,V=ne=>ne.gcvCorrected?o.jsx(At,{children:"GCV corrected"}):null,se=new Set;v.forEach(ne=>Object.keys(P(ne.start,ne.end).avg).forEach(Ie=>se.add(Ie)));const ye=fl.filter(ne=>se.has(ne)),ke=I;return{kpis:o.jsxs(o.Fragment,{children:[v.map((ne,Ie)=>o.jsxs("div",{className:"kpi-card kpi-green",children:[o.jsxs("div",{className:"kpi-label",children:[ne.title,ne.gcvCorrected&&o.jsx(At,{children:"GCV corrected"}),R&&o.jsx(At,{children:"APH corrected"})]}),o.jsxs("div",{className:"kpi-value",children:[O(z(ne)),o.jsx("span",{className:"kpi-unit",children:"%"})]}),o.jsxs("div",{className:"kpi-sub",children:[We(ne.start)," → ",We(ne.end)," · ",ne.rowCount," row",ne.rowCount===1?"":"s"]})]},Ie)),v.length===2&&o.jsxs(o.Fragment,{children:[o.jsx(xi,{p1:v[0],p2:v[1],eff1:z(v[0]),eff2:z(v[1]),suffix:R?" APH corr.":""}),o.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(ke?" applied":""),onClick:$,children:[o.jsxs("div",{className:"kpi-label",children:["GCV Correction",ke&&o.jsx(At,{children:"Applied"})]}),o.jsx("div",{className:"kpi-value kpi-action-value",children:ke?"Click to undo":"Apply GCV Correction"})]}),o.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(R?" applied":""),onClick:me,children:[o.jsxs("div",{className:"kpi-label",children:["APH Correction",R&&o.jsx(At,{children:"Applied"})]}),o.jsx("div",{className:"kpi-value kpi-action-value",children:R?"Click to undo":"Apply APH Correction"}),o.jsx("div",{className:"kpi-sub"})]})]})]}),tables:o.jsxs(o.Fragment,{children:[o.jsx(bi,{list:v,perProcessIds:ye,labels:Ep,page:"cenpeep",open:le.processInputsOpen,onToggle:()=>A&&ut("processInputsOpen"),thBadge:V,flag:(ne,Ie)=>ke&&v.indexOf(ne)===ke.targetIdx&&Du.includes(Ie)?o.jsxs(o.Fragment,{children:[" ",o.jsx("small",{style:{color:"var(--accent2)"},title:`From "${ke.sourceTitle}"`,children:"↺"})]}):null}),o.jsx(ki,{list:v,rows:ha,page:"cenpeep",open:le.processComparisonOpen,onToggle:()=>A&&ut("processComparisonOpen"),thBadge:V})]})}};let Nt=null,cn=null;if(b){const v=zo(b);Nt=v.kpis,cn=v.tables}else c&&j!==null&&(Nt=ls(c),cn=cr(c));return o.jsxs("div",{className:"container",children:[o.jsx(lr,{}),o.jsxs("div",{className:"section-header",style:{marginTop:0},children:[o.jsx("div",{className:"section-label",children:"CENPEEP Formula"}),o.jsx("div",{className:"section-line"})]}),o.jsxs("div",{className:"tab-nav",children:[o.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[o.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),o.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[o.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),o.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[o.jsx(os,{description:"Upload your CENPEEP standard sheet — all input fields will be auto-populated.",onFile:X,status:g}),o.jsx(yi,{uploadData:x,processes:f.processes,onAdd:f.add,onRemove:f.remove,onTitle:f.setTitle,onDate:f.setDate}),o.jsxs("div",{className:"action-bar",children:[o.jsxs("button",{className:"btn btn-primary",onClick:U,children:[o.jsx(Io,{}),"Calculate Efficiency"]}),o.jsxs("button",{className:"btn btn-ghost",onClick:he,children:[o.jsx(_o,{}),"Reset to Defaults"]})]}),o.jsx(Xr,{cards:Z0,open:d,onToggle:H}),Ap.map(v=>o.jsx(Zr,{id:v,fields:ml[v],open:!!d[v],values:r,derived:T,onChange:D,detected:a,missing:i},v))]}),o.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[o.jsx("div",{className:"output-summary",id:"kpi-area",children:Nt}),o.jsxs("div",{className:"design-conditions-block",children:[o.jsxs("div",{className:"section-header",children:[o.jsx("div",{className:"section-label",children:"Design Conditions — for APH Correction"}),o.jsx("div",{className:"section-line"})]}),o.jsx(Xr,{cards:q0,open:d,onToggle:H}),Tp.map(v=>o.jsx(Zr,{id:v,fields:ml[v],open:!!d[v],values:r,derived:T,onChange:D,detected:a,missing:i},v))]}),o.jsx("div",{id:"output-tables",children:cn}),o.jsxs("div",{className:"download-bar",children:[o.jsxs("button",{className:"btn btn-primary",onClick:en,children:[o.jsx(xp,{}),"Save to Database"]}),o.jsxs("button",{className:"btn btn-secondary",onClick:ur,children:[o.jsx(ho,{}),"Download CSV"]}),o.jsxs("button",{className:"btn btn-secondary",onClick:En,children:[o.jsx(ho,{}),"Download PDF"]}),o.jsxs("button",{className:"btn btn-secondary",onClick:Do,children:[o.jsx(fi,{}),"Field Report (.docx)"]}),o.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function sh(){return o.jsx(ir,{active:"/calculator",children:o.jsx(rh,{})})}const q=(e,n)=>n===0||!isFinite(n)?0:e/n,Bo=[{id:"bs203",row:4,item:203},{id:"bs206",row:7,item:206},{id:"bs211",row:14,item:211},{id:"bs215",row:18,item:215},{id:"bs216",row:19,item:216},{id:"bs217",row:21,item:217},{id:"bs220",row:24,item:220},{id:"bs221",row:26,item:221},{id:"bs224",row:29,item:224},{id:"bs225",row:31,item:225},{id:"bs228",row:34,item:228},{id:"bs246",row:58,item:246},{id:"bs247",row:60,item:247},{id:"bs250",row:63,item:250},{id:"bs251",row:65,item:251},{id:"bs254",row:68,item:254},{id:"bs255",row:70,item:255},{id:"bs258",row:73,item:258},{id:"bs259",row:75,item:259},{id:"bs262",row:78,item:262},{id:"bs271",row:93,item:271},{id:"bs272",row:94,item:272},{id:"bs273",row:95,item:273},{id:"bs274",row:96,item:274},{id:"bs275",row:97,item:275},{id:"bs276",row:98,item:276},{id:"bs278",row:102,item:278},{id:"bs279",row:103,item:279},{id:"bs280",row:105,item:280},{id:"bs291",row:119,item:291},{id:"bs295",row:124,item:295},{id:"bs301",row:131,item:301},{id:"bs323",row:162,item:323},{id:"bs325",row:165,item:325},{id:"bs326",row:166,item:326},{id:"bs328",row:169,item:328},{id:"bs329",row:170,item:329},{id:"bs332",row:176,item:332},{id:"bs333",row:177,item:333},{id:"bs334",row:178,item:334},{id:"bs335",row:179,item:335},{id:"bs336",row:180,item:336},{id:"bs343",row:186,item:343},{id:"bs344",row:188,item:344},{id:"bs345",row:189,item:345},{id:"bs349",row:194,item:349},{id:"bs350",row:195,item:350},{id:"bs352",row:198,item:352},{id:"bs357",row:204,item:357},{id:"bs360",row:207,item:360},{id:"bs362",row:211,item:362},{id:"bs363",row:212,item:363},{id:"bs390",row:248,item:390},{id:"bs391",row:249,item:391},{id:"bs392",row:250,item:392},{id:"bs393",row:251,item:393},{id:"bs397",row:257,item:397},{id:"bs398",row:258,item:398},{id:"bs399",row:259,item:399},{id:"bs427",row:304,item:427},{id:"bs450",row:333,item:450},{id:"bs451",row:334,item:451},{id:"bs453",row:336,item:453},{id:"bs454",row:337,item:454},{id:"bs460",row:345,item:460},{id:"bs461",row:346,item:461},{id:"bs463",row:348,item:463},{id:"bs464",row:349,item:464},{id:"bs466",row:352,item:466},{id:"bs467",row:353,item:467},{id:"bs469",row:355,item:469},{id:"bs470",row:356,item:470},{id:"bs472",row:359,item:472},{id:"bs473",row:360,item:473},{id:"bs475",row:364,item:475},{id:"bs476",row:365,item:476},{id:"bs477",row:367,item:477},{id:"bs478",row:368,item:478},{id:"bs479",row:370,item:479},{id:"bs480",row:371,item:480},{id:"bs519",row:417,item:519},{id:"bs601",row:426,item:601},{id:"bs701",row:467,item:701},{id:"bs702",row:468,item:702},{id:"bs704",row:470,item:704},{id:"bs705",row:471,item:705},{id:"bs708",row:475,item:708},{id:"bs807",row:486,item:807},{id:"bs907",row:517,item:907},{id:"bs909",row:521,item:909},{id:"bs910",row:523,item:910}],Ru=Bo.map(e=>e.id);Object.fromEntries(Bo.map(e=>[e.id,e.row]));Object.fromEntries(Bo.map(e=>[e.row,e.id]));const ga={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3};function Op(e){const n={};for(const{id:y,row:M}of Bo)n[M]=e[y]||0;n[99]=100-(n[93]+n[94]+n[95]+n[96]+n[97]+n[98]),n[100]=n[93]+n[94]+n[95]+n[96]+n[97]+n[98]+n[99],n[181]=100-(n[176]+n[177]+n[178]+n[179]+n[180]),n[182]=n[176]+n[177]+n[178]+n[179]+n[180]+n[181],n[167]=100-(n[165]+n[166]),n[133]=n[119]-n[124]*(n[130]||0)/n[102],n[400]=n[4]*n[7],n[401]=n[21]*n[24],n[402]=n[19]*n[14],n[403]=n[18]*n[14],n[404]=(n[4]+n[21]-(n[19]+n[18]))*n[58],n[405]=n[404]+n[403]+n[402]-n[401]-n[400],n[406]=n[60]*n[63],n[407]=n[26]*n[29],n[408]=n[65]*n[68],n[409]=n[408]-(n[407]+n[406]),n[410]=n[70]*n[73],n[411]=n[31]*n[34],n[412]=n[75]*n[78],n[413]=n[412]-(n[411]+n[410]),n[414]=n[405]+n[409]+n[413],n[415]=n[194]*n[186]*(n[198]-n[195])+n[207],n[416]=n[414]-n[415],n[419]=n[105]*n[102],n[420]=n[133]*(n[102]+n[162]),n[421]=n[194]*n[188],n[422]=n[212]>0?n[212]*n[250]:n[211]>0?n[211]*n[248]:0,n[424]=n[419]+n[420]+n[421]+n[422],n[428]=n[334],n[429]=n[333]/100,n[430]=n[426]*n[428]*n[429]/100,n[431]=n[430]*100/n[102],n[433]=n[346],n[434]=n[345]/100,n[435]=n[426]*n[433]*n[434]/100,n[436]=n[435]*100/n[102],n[438]=n[353],n[439]=n[352]/100,n[440]=n[426]*n[438]*n[439]/100,n[441]=n[440]*100/n[102],n[443]=n[360],n[444]=n[359]/100,n[445]=n[426]*n[443]*n[444]/100,n[446]=n[445]*100/n[102],n[448]=n[170],n[449]=q(n[169],n[133]),n[450]=n[426]*n[448]*n[449]/100,n[451]=n[450]*100/n[102],n[453]=n[430]+n[435]+n[440]+n[445]+n[450],n[454]=n[431]+n[436]+n[441]+n[446]+n[451],n[456]=n[429]*(100-n[428])/100,n[457]=n[434]*(100-n[433])/100,n[458]=n[439]*(100-n[438])/100,n[459]=n[444]*(100-n[443])/100,n[460]=n[449]*(100-n[448])/100,n[461]=n[94]/100-(n[456]+n[457]+n[458]+n[459]+n[460]),n[463]=n[429]*n[337]*(n[336]-n[258]),n[464]=n[434]*n[349]*(n[348]-n[258])+n[439]*n[356]*(n[355]-n[258]),n[465]=n[463]+n[464],n[469]=n[467]*n[468],n[472]=n[470]*n[471],n[473]=n[469]+n[472],n[476]=n[475]*30.6*(n[304]-n[258]),n[478]=n[93]/100,n[479]=9/100*n[96],n[480]=n[478]+n[479],n[481]=1.88*(n[304]-25)+2442+4.2*(25-n[258]),n[482]=n[480]*n[481],n[484]=n[482]-(n[102]-n[103]),n[487]=n[257],n[488]=n[259],n[489]=n[486]*n[488]*1.88*(n[304]-n[258]);const t=(n[105]>0?n[105]*n[103]:0)+(n[119]>0?(n[119]-n[124]*n[131]/n[103])*(n[103]+n[162]):0)+(n[194]>0?n[194]*n[189]:0)+(n[212]>0?n[212]*n[251]:n[211]>0?n[211]*n[249]:0),r=n[105]>0||n[119]>0||n[194]>0||n[211]>0||n[212]>0;n.item901_gross=q((n[416]-n[417])*100,n[424]),n.item901_net=r?q((n[416]-n[417])*100,t):0;const s=q(n[430]*100,n[102]),a=q(n[430]*100,n[103]),l=q(n[435]*100,n[102]),i=q(n[435]*100,n[103]),u=q(n[440]*100,n[102]),d=q(n[440]*100,n[103]),h=q(n[445]*100,n[102]),g=q(n[445]*100,n[103]),p=q(n[450]*100,n[102]),x=q(n[450]*100,n[103]),k=q(n[465]*100,n[102]),w=q(n[465]*100,n[103]),F=s+l+u+h+p+k,f=a+i+d+g+x+w,c=q(n[473]*100,n[102]),m=q(n[473]*100,n[103]),b=q(n[476]*100,n[102]),N=q(n[476]*100,n[103]),A=q(n[482]*100,n[102]),C=q(n[482]*100,n[103]),j=q(n[484]*100,n[102]),_=q(n[484]*100,n[103]),I=q(q(n[204]*n[481]*100,n[194]),n[188]),W=q(q(n[204]*n[481]*100,n[194]),n[189]),J=c+b+A+j+I,Y=m+N+C+_+W,K=n[119]>0?(n[119]-n[124]*n[131]/n[103])*(n[103]+n[162]):n[105]*n[103],ae=q(((n[365]-n[368])*(100-n[364]+539.1+.5*(n[304]-100))+n[368]*(n[367]-n[364]))*418.7,K),le=q(n[371]*(100-n[370]+539.1+.5*(n[304]-100))*418.7,K),Z=ae+le,T=n[420]!==0?n[420]:n[419],D=q(((n[365]-n[368])*(100-n[364]+539.1+.5*(n[304]-100))+n[368]*(n[367]-n[364]))*418.7,T),H=q(n[371]*(100-n[370]+539.1+.5*(n[304]-100))*418.7,T),S=D+H,P=q(n[489]*100,n[102]),X=q(n[489]*100,n[103]),U=n[517];return n.item902_gross=100-(F+J+S+P+U+n[521]+n[523]),n.item902_net=100-(f+Y+Z+X+U+n[521]+n[523]),n.item908_gross=100-(n.item901_gross+F+J+S+P),n.item908_net=100-(n.item901_net+f+Y+Z+X),{F:n,methodA:{gross:n.item901_gross,net:n.item901_net},methodB:{gross:n.item902_gross,net:n.item902_net},balanceA:{gross:n.item908_gross,net:n.item908_net},losses:{residue:{total:{gross:F,net:f},a:{label:"Combustible in bottom ash",gross:s,net:a},b:{label:"Combustible in coarse dust",gross:l,net:i},c:{label:"Combustible in fine dust",gross:u,net:d},d:{label:"Combustible in riddlings",gross:h,net:g},e:{label:"Combustible, dryer ash",gross:p,net:x},f:{label:"Sensible heat of solid residue",gross:k,net:w}},flueGas:{total:{gross:J,net:Y},a:{label:"Unburnt gas (CO + hydrocarbons)",gross:c,net:m},b:{label:"Sensible heat in dry flue gas",gross:b,net:N},c:{label:"Moisture in fuel",gross:A,net:C},d:{label:"Sensible heat in water vapour",gross:j,net:_},e:{label:"Heat in atomizing air/steam",gross:I,net:W}},waterHopper:{total:{gross:S,net:Z},a:{label:"Water-filled ash hopper / slag tank",gross:D,net:ae},b:{label:"Ash quenching spray",gross:H,net:le}},moistureAir:{label:"Moisture in combustion air",gross:P,net:X},fuelHeating:{label:"Heating fuel up to air supply temp.",value:U},radiation:{label:"Radiation & convection (Method B)",value:n[521]},auxPower:{label:"Auxiliary power, heat equivalent (Method B)",value:n[523]}},ultimate:{solidOxygenByDiff:n[99],solidCheckTotal:n[100],oilOxygenNitrogenByDiff:n[181],oilCheckTotal:n[182]}}}const oh=[{target:"grid-water",icon:"WS",title:"Feedwater & Steam",sub:"20 parameters"},{target:"grid-solid",icon:"SF",title:"Solid Fuel — Ultimate Analysis & Firing",sub:"17 parameters"},{target:"grid-oil",icon:"OF",title:"Oil Fuel — Analysis & Firing",sub:"13 parameters"},{target:"grid-gas",icon:"GF",title:"Gaseous Fuel — Firing & CV",sub:"6 parameters"},{target:"grid-air",icon:"AA",title:"Air & Ambient Conditions",sub:"4 parameters"},{target:"grid-residue",icon:"SR",title:"Solid Residue — Ash, Dust & Riddlings",sub:"14 parameters"},{target:"grid-hopper",icon:"WH",title:"Water-Filled Ash Hopper / Quenching",sub:"6 parameters"},{target:"grid-extras",icon:"HB",title:"Heat Balance & Method B Extras",sub:"11 parameters"}],Ci={"grid-water":[{id:"bs203",name:"Feedwater Quantity",sym:"Item 203",uom:"kg/s",kind:"",value:"45",readonly:!1,step:"any"},{id:"bs206",name:"Feedwater Enthalpy",sym:"Item 206",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs211",name:"Drum Water Enthalpy",sym:"Item 211",uom:"kJ/kg",kind:"",value:"1650",readonly:!1,step:"any"},{id:"bs215",name:"Drum Level — Rate of Increase",sym:"Item 215",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs216",name:"Blow-down Rate",sym:"Item 216",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs217",name:"Main Steam Spray Water Quantity",sym:"Item 217",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs220",name:"Main Steam Spray Water Enthalpy",sym:"Item 220",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs221",name:"Reheater-1 Spray Water Quantity",sym:"Item 221",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs224",name:"Reheater-1 Spray Water Enthalpy",sym:"Item 224",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs225",name:"Reheater-2 Spray Water Quantity",sym:"Item 225",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs228",name:"Reheater-2 Spray Water Enthalpy",sym:"Item 228",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs246",name:"Steam Leaving Unit — Enthalpy",sym:"Item 246",uom:"kJ/kg",kind:"",value:"3400",readonly:!1,step:"any"},{id:"bs247",name:"Reheater-1 Inlet Steam Quantity",sym:"Item 247",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs250",name:"Reheater-1 Inlet Steam Enthalpy",sym:"Item 250",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs251",name:"Reheater-1 Outlet Steam Quantity",sym:"Item 251",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs254",name:"Reheater-1 Outlet Steam Enthalpy",sym:"Item 254",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs255",name:"Reheater-2 Inlet Steam Quantity",sym:"Item 255",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs258",name:"Reheater-2 Inlet Steam Enthalpy",sym:"Item 258",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs259",name:"Reheater-2 Outlet Steam Quantity",sym:"Item 259",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs262",name:"Reheater-2 Outlet Steam Enthalpy",sym:"Item 262",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-solid":[{id:"bs271",name:"Moisture (Ultimate, As Fired)",sym:"Item 271",uom:"%",kind:"",value:"12",readonly:!1,step:"any"},{id:"bs272",name:"Ash (Ultimate, As Fired)",sym:"Item 272",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs273",name:"Carbon (Ultimate, As Fired)",sym:"Item 273",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs274",name:"Hydrogen (Ultimate, As Fired)",sym:"Item 274",uom:"%",kind:"",value:"2.5",readonly:!1,step:"any"},{id:"bs275",name:"Nitrogen (Ultimate, As Fired)",sym:"Item 275",uom:"%",kind:"",value:"1.0",readonly:!1,step:"any"},{id:"bs276",name:"Sulphur (Ultimate, As Fired)",sym:"Item 276",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs278",name:"GCV of Coal — Gross",sym:"Item 278",uom:"kJ/kg",kind:"",value:"13900",readonly:!1,step:"any"},{id:"bs279",name:"GCV of Coal — Net",sym:"Item 279",uom:"kJ/kg",kind:"",value:"13300",readonly:!1,step:"any"},{id:"bs280",name:"Mechanical Stoker Firing Rate",sym:"Item 280",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs291",name:"Pulverized Fuel — Total Weighed",sym:"Item 291",uom:"kg/s",kind:"",value:"9.2",readonly:!1,step:"any"},{id:"bs295",name:"Pulverized Fuel — Mill Rejects (Total)",sym:"Item 295",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs301",name:"Calorific Value of Mill Rejects — Gross",sym:"Item 301",uom:"kJ/kg",kind:"",value:"2000",readonly:!1,step:"any"},{id:"bs323",name:"Heat Expended in Drying Fuel",sym:"Item 323",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs325",name:"Dryer Gas Analysis — CO2",sym:"Item 325",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs326",name:"Dryer Gas Analysis — CO",sym:"Item 326",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs328",name:"Ashpit Refuse Quantity",sym:"Item 328",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs329",name:"Ashpit Refuse — % Combustible",sym:"Item 329",uom:"%",kind:"",value:"5",readonly:!1,step:"any"}],"grid-oil":[{id:"bs332",name:"Moisture (Oil, Ultimate)",sym:"Item 332",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs333",name:"Ash (Oil, Ultimate)",sym:"Item 333",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs334",name:"Carbon (Oil, Ultimate)",sym:"Item 334",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs335",name:"Hydrogen (Oil, Ultimate)",sym:"Item 335",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs336",name:"Sulphur (Oil, Ultimate)",sym:"Item 336",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs343",name:"Specific Heat of Oil",sym:"Item 343",uom:"kJ/(kg·K)",kind:"",value:"2.1",readonly:!1,step:"any"},{id:"bs344",name:"GCV of Oil — Gross",sym:"Item 344",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs345",name:"GCV of Oil — Net",sym:"Item 345",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs349",name:"Oil Firing Rate",sym:"Item 349",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs350",name:"Temperature of Oil as Weighed",sym:"Item 350",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs352",name:"Temperature of Oil Delivered to Burner",sym:"Item 352",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs357",name:"Atomizing Air/Steam Quantity",sym:"Item 357",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs360",name:"Heat Used in Atomizing Oil",sym:"Item 360",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"}],"grid-gas":[{id:"bs362",name:"Gas Firing Rate — Volume",sym:"Item 362",uom:"m³/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs363",name:"Gas Firing Rate — Mass",sym:"Item 363",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs390",name:"GCV of Gas — Gross (Volume basis)",sym:"Item 390",uom:"kJ/m³",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs391",name:"GCV of Gas — Net (Volume basis)",sym:"Item 391",uom:"kJ/m³",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs392",name:"GCV of Gas — Gross (Mass basis)",sym:"Item 392",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs393",name:"GCV of Gas — Net (Mass basis)",sym:"Item 393",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-air":[{id:"bs397",name:"Ambient Air Humidity",sym:"Item 397",uom:"%",kind:"",value:"60",readonly:!1,step:"any"},{id:"bs398",name:"Temperature at Entry to Air Intakes",sym:"Item 398",uom:"°C",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs399",name:"Moisture per Unit Mass of Dry Air",sym:"Item 399",uom:"kg/kg",kind:"",value:"0.018",readonly:!1,step:"any"},{id:"bs427",name:"Flue Gas Exit Temperature (LTAH/Economizer Outlet)",sym:"Item 427",uom:"°C",kind:"",value:"135",readonly:!1,step:"any"}],"grid-residue":[{id:"bs450",name:"Bottom Ash — Proportion of Fuel (Dry Basis)",sym:"Item 450",uom:"%",kind:"",value:"8",readonly:!1,step:"any"},{id:"bs451",name:"Bottom Ash — Combustible Content",sym:"Item 451",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs453",name:"Bottom Ash — Temperature as Discharged",sym:"Item 453",uom:"°C",kind:"",value:"200",readonly:!1,step:"any"},{id:"bs454",name:"Bottom Ash — Specific Heat",sym:"Item 454",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs460",name:"Coarse Dust — Proportion of Fuel (Dry Basis)",sym:"Item 460",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs461",name:"Coarse Dust — Combustible Content",sym:"Item 461",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs463",name:"Coarse Dust — Temperature as Discharged",sym:"Item 463",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs464",name:"Coarse Dust — Specific Heat",sym:"Item 464",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs466",name:"Fine Dust (Fly Ash) — Proportion of Fuel (Dry Basis)",sym:"Item 466",uom:"%",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs467",name:"Fine Dust (Fly Ash) — Combustible Content",sym:"Item 467",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs469",name:"Fine Dust (Fly Ash) — Temperature as Discharged",sym:"Item 469",uom:"°C",kind:"",value:"135",readonly:!1,step:"any"},{id:"bs470",name:"Fine Dust (Fly Ash) — Specific Heat",sym:"Item 470",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs472",name:"Riddlings — Proportion of Fuel (Dry Basis)",sym:"Item 472",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs473",name:"Riddlings — Combustible Content",sym:"Item 473",uom:"%",kind:"",value:"0",readonly:!1,step:"any"}],"grid-hopper":[{id:"bs475",name:"Hopper Water Inlet Temperature",sym:"Item 475",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs476",name:"Hopper Water Inlet Quantity",sym:"Item 476",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs477",name:"Hopper Water Outlet Temperature",sym:"Item 477",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs478",name:"Hopper Water Outlet Quantity",sym:"Item 478",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs479",name:"Quenching Spray Water Temperature",sym:"Item 479",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs480",name:"Quenching Spray Water Quantity",sym:"Item 480",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"}],"grid-extras":[{id:"bs519",name:"Heat Added from Separate External Air Source",sym:"Item 519",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs601",name:"Calorific Value of Carbon",sym:"Item 601",uom:"kJ/kg",kind:"",value:"33820",readonly:!1,step:"any"},{id:"bs701",name:"CO in Flue Gases per Unit Mass of Fuel",sym:"Item 701",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs702",name:"Calorific Value of CO",sym:"Item 702",uom:"kJ/kg",kind:"",value:"10120",readonly:!1,step:"any"},{id:"bs704",name:"Hydrocarbons in Flue Gases per Unit Mass of Fuel",sym:"Item 704",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs705",name:"Calorific Value of Hydrocarbons",sym:"Item 705",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs708",name:"Dry Flue Gases per Unit Mass of Fuel",sym:"Item 708",uom:"kg mol/kg",kind:"",value:"0.35",readonly:!1,step:"any"},{id:"bs807",name:"Combustion Air per Unit Mass of Fuel",sym:"Item 807",uom:"kg/kg",kind:"",value:"10.2",readonly:!1,step:"any"},{id:"bs907",name:"Loss in Heating Fuel up to Air Supply Temp",sym:"Item 907",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs909",name:"Radiation & Convection Loss (Method B)",sym:"Item 909",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs910",name:"Heat Equivalent of Auxiliary Power (Method B)",sym:"Item 910",uom:"%",kind:"",value:"0.3",readonly:!1,step:"any"}]},Pp=Object.keys(Ci),Fp=Pp.flatMap(e=>Ci[e]),ah=Object.fromEntries(Fp.map(e=>[e.id,e.value??""])),Uu=new Set(Fp.map(e=>e.id)),hl=(e,n,t)=>o.jsxs("tr",{children:[o.jsx("td",{children:e}),o.jsxs("td",{children:[nn(n)," %"]}),o.jsxs("td",{children:[nn(t)," %"]})]},e);function ya({title:e,group:n}){return o.jsxs("div",{className:"output-table-wrap",children:[o.jsxs("h3",{children:[e," — Total: ",nn(n.total.gross)," % (gross) / ",nn(n.total.net)," % (net)"]}),o.jsxs("table",{className:"output-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Loss"}),o.jsx("th",{children:"Gross CV basis"}),o.jsx("th",{children:"Net CV basis"})]})}),o.jsx("tbody",{children:Object.keys(n).filter(t=>t!=="total").map(t=>hl(n[t].label,n[t].gross,n[t].net))})]})]})}const Ns=({label:e,value:n,cls:t})=>o.jsxs("div",{className:"kpi-card "+t,children:[o.jsx("div",{className:"kpi-label",children:e}),o.jsxs("div",{className:"kpi-value",children:[nn(n),o.jsx("span",{className:"kpi-unit",children:"%"})]})]});function lh(){const e=ss();E.useEffect(()=>{document.title="Boiler Efficiency Calculator — BS-2885"},[]);const[n,t]=E.useState("input"),[r,s]=E.useState(ah),[a,l]=E.useState(new Set),[i,u]=E.useState(new Set),[d,h]=E.useState({}),[g,p]=E.useState(null),[x,k]=E.useState(null),[w,F]=E.useState(null),f=(j,_)=>s(I=>({...I,[j]:_})),c=j=>h(_=>({..._,[j]:!_[j]})),m=async j=>{p({cls:"loading",text:"⏳ Reading BS-2885 sheet…"});const _=new FormData;_.append("file",j);try{const W=await(await an("/api/upload",{method:"POST",body:_})).json();if(!W.ok)throw new Error(W.error||"Upload failed");as(W,"BS-2885");const J=W.extractedBS2885||{},Y={...r},K=new Set;let ae=0;for(const[Z,T]of Object.entries(J))Uu.has(Z)&&(Y[Z]=String(typeof T=="number"?parseFloat(T.toFixed(6)):T),K.add(Z),ae++);const le=new Set;for(const Z of W.missingFieldsBS2885||[]){const T=Z.id||Z;Uu.has(T)&&le.add(T)}s(Y),l(K),u(le),k(W),p({cls:"success",text:`✓ ${ae} of ${Ru.length} fields detected from "${W.filename}"`}),e(`Detected ${ae} field${ae===1?"":"s"} from the uploaded sheet.`,"success")}catch(I){p({cls:"error",text:`✗ ${I.message}`}),e(I.message||"Upload failed","error")}},b=()=>{s(j=>{const _={...j};for(const[I,W]of Object.entries(ga))I in _&&(_[I]=String(W));return _}),l(j=>{const _=new Set(j);return Object.keys(ga).forEach(I=>_.delete(I)),_}),u(j=>{const _=new Set(j);return Object.keys(ga).forEach(I=>_.delete(I)),_}),e("Inputs reset to defaults.","success")},N=()=>{const j={};for(const _ of Ru)j[_]=parseFloat(r[_])||0;F(Op(j)),t("output"),e("BS-2885 efficiency calculated.","success")},A=async()=>{const j=x;if(!j||!j.fieldDetailBS2885||!Object.keys(j.fieldDetailBS2885).length){e("Upload and parse a file first to generate a field report.","error");return}const _={filename:j.filename,primarySheet:j.sheetNameBS2885,fieldDetail:j.fieldDetailBS2885,extracted:j.extractedBS2885,missingFields:j.missingFieldsBS2885,reportTitle:"BS-2885 Field Detection Report",filenamePrefix:"BS2885_Field_Report",standardLabel:"BS-2885"};try{const I=await an("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)});if(!I.ok){const K=await I.json().catch(()=>({}));throw new Error(K.error||`Report generation failed (${I.status})`)}const W=await I.blob(),Y=(I.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);Yt(W,Y?Y[1]:"BS2885_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(I){e("Report failed: "+I.message,"error")}},C=w;return o.jsxs("div",{className:"container",children:[o.jsx(lr,{}),o.jsxs("div",{className:"section-header",style:{marginTop:0},children:[o.jsx("div",{className:"section-label",children:"BS-2885 (1974)"}),o.jsx("div",{className:"section-line"})]}),o.jsxs("div",{className:"tab-nav",children:[o.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[o.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),o.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[o.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),o.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[o.jsx(os,{description:'Upload a filled-in BS-2885 (1974) test sheet — matching "Sl. No." rows are auto-populated from the Value column.',onFile:m,status:g}),o.jsxs("div",{className:"action-bar",children:[o.jsxs("button",{className:"btn btn-primary",onClick:N,children:[o.jsx(Io,{}),"Calculate Efficiency"]}),o.jsxs("button",{className:"btn btn-ghost",onClick:b,children:[o.jsx(_o,{}),"Reset to Defaults"]})]}),o.jsx(Xr,{cards:oh,open:d,onToggle:c}),Pp.map(j=>o.jsx(Zr,{id:j,fields:Ci[j],open:!!d[j],values:r,onChange:f,detected:a,missing:i},j))]}),o.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[o.jsx("div",{className:"output-summary",id:"kpi-area",children:C&&o.jsxs(o.Fragment,{children:[o.jsx(Ns,{label:"Thermal Efficiency — Method A (Gross CV)",value:C.methodA.gross,cls:"kpi-green"}),o.jsx(Ns,{label:"Thermal Efficiency — Method A (Net CV)",value:C.methodA.net,cls:"kpi-green"}),o.jsx(Ns,{label:"Thermal Efficiency — Method B (Gross CV)",value:C.methodB.gross,cls:"kpi-blue"}),o.jsx(Ns,{label:"Thermal Efficiency — Method B (Net CV)",value:C.methodB.net,cls:"kpi-blue"})]})}),o.jsx("div",{id:"output-tables",children:C&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"output-table-wrap",children:[o.jsx("h3",{children:"Method A — Balance of Account (radiation & unmeasured losses)"}),o.jsxs("table",{className:"output-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Gross CV basis"}),o.jsx("th",{children:"Net CV basis"})]})}),o.jsx("tbody",{children:hl("Item 908 — Unaccounted balance",C.balanceA.gross,C.balanceA.net)})]})]}),o.jsx(ya,{title:"Item 903 — Losses due to Residue",group:C.losses.residue}),o.jsx(ya,{title:"Item 904 — Losses due to Flue Gases",group:C.losses.flueGas}),o.jsx(ya,{title:"Item 905 — Losses, Water-Filled Ash Hopper / Quenching",group:C.losses.waterHopper}),o.jsxs("div",{className:"output-table-wrap",children:[o.jsx("h3",{children:"Other Method B Losses"}),o.jsxs("table",{className:"output-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Loss"}),o.jsx("th",{children:"Gross CV basis"}),o.jsx("th",{children:"Net CV basis"})]})}),o.jsxs("tbody",{children:[hl(C.losses.moistureAir.label,C.losses.moistureAir.gross,C.losses.moistureAir.net),o.jsxs("tr",{children:[o.jsx("td",{children:C.losses.fuelHeating.label}),o.jsxs("td",{colSpan:"2",children:[nn(C.losses.fuelHeating.value)," %"]})]}),o.jsxs("tr",{children:[o.jsx("td",{children:C.losses.radiation.label}),o.jsxs("td",{colSpan:"2",children:[nn(C.losses.radiation.value)," %"]})]}),o.jsxs("tr",{children:[o.jsx("td",{children:C.losses.auxPower.label}),o.jsxs("td",{colSpan:"2",children:[nn(C.losses.auxPower.value)," %"]})]})]})]})]}),o.jsxs("div",{className:"output-table-wrap",children:[o.jsx("h3",{children:"Ultimate Analysis — Check Totals"}),o.jsxs("table",{className:"output-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Oxygen (by diff.)"}),o.jsx("th",{children:"Sum (should read 100%)"})]})}),o.jsxs("tbody",{children:[o.jsxs("tr",{children:[o.jsx("td",{children:"Solid fuel"}),o.jsxs("td",{children:[nn(C.ultimate.solidOxygenByDiff)," %"]}),o.jsxs("td",{children:[nn(C.ultimate.solidCheckTotal)," %"]})]}),o.jsxs("tr",{children:[o.jsx("td",{children:"Oil fuel (O₂ + N₂ by diff.)"}),o.jsxs("td",{children:[nn(C.ultimate.oilOxygenNitrogenByDiff)," %"]}),o.jsxs("td",{children:[nn(C.ultimate.oilCheckTotal)," %"]})]})]})]})]})]})}),o.jsxs("div",{className:"download-bar",children:[o.jsxs("button",{className:"btn btn-secondary",onClick:A,children:[o.jsx(fi,{}),"Field Report (.docx)"]}),o.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function ih(){return o.jsx(ir,{active:"/bs-2885",extraStyle:"bs2885",children:o.jsx(lh,{})})}const gl=["M","A","VM","FC","GCV","S","Cba","Cfa","Pfa","Pba","O2out","COout","Tgo","Tref"],Mp={M:"Moisture — Item 37",A:"Ash — Item 40",VM:"Volatile Matter — Item 38",FC:"Fixed Carbon — Item 39",GCV:"HHV, as fired — Item 41",S:"Sulfur — Item 47",Cba:"Unburnt Carbon — Bottom Ash",Cfa:"Unburnt Carbon — Fly Ash",Pfa:"% Fly Ash in Total Ash",Pba:"% Bottom Ash in Total Ash",O2out:"O₂, dry — Item 33",COout:"CO, dry — Item 34",Tgo:"Flue-Gas Temp Leaving Boiler — Item 13",Tref:"Reference Air Temp — Items 10/11"},kn=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function uh(e){const n={...e},t=kn(n,"M"),r=kn(n,"A"),s=kn(n,"VM"),a=kn(n,"FC"),l=kn(n,"S");n.Ca=.97*a+.7*(s+.1*r)-t*(.6-.01*t),n.H=.036*a+.086*(s-.1*r)-.0035*t*t*(1-.02*t),n.N=2.1-.02*s,n.O=100-t-r-n.Ca-l-n.H-n.N;const i=kn(n,"Pfa")||80,u=kn(n,"Pba")||20;return n.Cash=i/100*kn(n,"Cfa")+u/100*kn(n,"Cba"),n}function yl(e){const n=uh(e),t=D=>kn(n,D),r=t("GCV"),s=t("S"),a=t("O2out"),l=t("COout"),i=t("Tgo"),u=t("Tref"),d=t("A"),h=t("M"),g=t("Ca"),p=t("H"),x=t("Cash"),k=n.Lrad===void 0||isNaN(n.Lrad)?1:n.Lrad,w=n.Lunm===void 0||isNaN(n.Lunm)?.5:n.Lunm,F=l/1e6*100,f=19.3-a,c=100-f-a-F,m=.2682*c-(a-F/2)!==0?100*(a-F/2)/(.2682*c-(a-F/2)):0,b=100-x!==0?d/(100-x):0,N=d/100*(x/(100-x||1)),A=g-100*N,C=3*(f+F),j=C!==0?(11*f+8*a+7*(c+F))/C*(A/100+s/267):0,_=i-u,I=8077.8,W=j*.24*_/r*100,J=h/100*(584+.45*_)/r*100,Y=9*(p/100)*(584+.45*_)/r*100,K=100-x!==0?d/(100-x)*(x/100*I)/r*100:0,ae=k,le=w,Z=W+J+Y+K+ae+le,T=100-Z;return{CO2:f,N2:c,COoutp:F,ExcessAir:m,Ca:g,H:p,N:t("N"),O:t("O"),Cash:x,DryRefuse:b,U:N,CarbonBurned:A,MassDFG:j,dT:_,L65:W,L66:J,L67:Y,L68:K,L69:ae,L70:le,TotalLosses:Z,BoilerEff:T,Lrad:k,Lunm:w,inputs:gl.map(D=>({id:D,label:Mp[D]||D,value:n[D]}))}}const ch=[{target:"grid-general",icon:"GD",title:"General Data",sub:"4 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis — As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters — Flue Gas & Temps",sub:"4 parameters"}],Ip={"grid-general":[{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2out",name:"Avg. Flue Gas O₂, dry",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1,tag:{cls:"formula-tag",text:"Item 33"}},{id:"COout",name:"Avg. Flue Gas CO, dry",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1,tag:{cls:"formula-tag",text:"Item 34"}},{id:"Tgo",name:"Flue Gas Temp Leaving Boiler",sym:"Tgo",uom:"°C",kind:"",value:"135",readonly:!1,tag:{cls:"formula-tag",text:"Item 13"}},{id:"Tref",name:"Reference Air Temp",sym:"Tref",uom:"°C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},_p=["grid-general","grid-proximate","grid-plant"],ji=_p.flatMap(e=>Ip[e]),dh=Object.fromEntries(ji.map(e=>[e.id,e.value??""])),ph=new Set(ji.filter(e=>!e.readonly).map(e=>e.id)),Vu=["Cba","Cfa","M","A","VM","FC","GCV","O2out","COout","Tgo"],fh={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},$u={lossesOpen:!0,intermediateOpen:!0,processInputsOpen:!1,processComparisonOpen:!1},mh=[["Date Range",e=>`${We(e.start)} → ${We(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>O(e.result.BoilerEff)],["Dry Flue Gas Loss (%) — 65",e=>O(e.result.L65)],["Moisture in Fuel (%) — 66",e=>O(e.result.L66)],["H₂ Combustion (%) — 67",e=>O(e.result.L67)],["Combustibles in Refuse (%) — 68",e=>O(e.result.L68)],["Radiation (%) — 69",e=>O(e.result.L69)],["Unmeasured Losses (%) — 70",e=>O(e.result.L70)],["Total Losses (%) — 71",e=>O(e.result.TotalLosses)]],Hu={background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"20px",color:"var(--text-bright)",width:"90px",outline:"none"},Gu={display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},Wu={fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"};function hh(){const e=ss();E.useEffect(()=>{document.title="Boiler Efficiency Calculator — ASME-PTC 4.1"},[]);const[n,t]=E.useState("input"),[r,s]=E.useState(dh),[a,l]=E.useState(new Set),[i,u]=E.useState(new Set),[d,h]=E.useState({}),[g,p]=E.useState(null),[x,k]=E.useState(null),w=vi(),[F,f]=E.useState(null),[c,m]=E.useState(null),[b,N]=E.useState(null),[A,C]=E.useState(null),[j,_]=E.useState($u),I=(S,P)=>s(X=>({...X,[S]:P})),W=S=>h(P=>({...P,[S]:!P[S]})),J=(S,P)=>gi(x,S,P),Y=()=>{const S={};return gl.forEach(P=>{S[P]=r[P]!==void 0?r[P]:0}),S.Lrad=b!==null?parseFloat(b)||0:void 0,S.Lunm=A!==null?parseFloat(A)||0:void 0,S},K=async S=>{p({cls:"loading",text:"⏳ Parsing all sheets…"});const P=new FormData;P.append("file",S);try{const U=await(await an("/api/upload",{method:"POST",body:P})).json();if(!U.ok)throw new Error(U.error||"Upload failed");as(U,"ASME PTC 4.1");const y={...r},M=new Set;let G=0;for(const[he,je]of Object.entries(U.extracted||{}))ph.has(he)&&(y[he]=String(typeof je=="number"?parseFloat(je.toFixed(6)):je),M.add(he),G++);const $=U.missingFields||[],me=new Set;for(const he of $){const je=he.id||he;ji.some(en=>en.id===je)&&me.add(je)}s(y),l(M),u(me),k(U),w.setProcesses([]),m(null),p({cls:"success",node:hi({data:U,populated:G,fieldDetail:U.fieldDetail||{},missingFieldsList:$,strategyLabel:jp,derivedLabel:"↳ defaulted from Secondary Air",bee:!1})}),e(`Excel imported — ${G} fields auto-populated from "${U.primarySheet||""}"`,"success")}catch(X){p({cls:"error",text:`✗ ${X.message}`}),e(X.message,"error")}},ae=()=>{const S=w.processes.filter(U=>U.start||U.end);if(!S.length){const U=yl(Y());m(null),f(U),N(String(U.Lrad)),C(String(U.Lunm)),t("output");return}const P=Y(),X=S.map(U=>{const{avg:y,rowCount:M}=J(U.start,U.end);return{title:U.title||"Process",start:U.start,end:U.end,rowCount:M,result:yl({...P,...y})}});m(X),f(X[0].result),N(null),C(null),t("output")},le=(S,P)=>{const X=S==="Lrad"?P:b,U=S==="Lunm"?P:A;if(S==="Lrad"?N(P):C(P),!F)return;const y={...F};y.Lrad=parseFloat(X)||0,y.Lunm=parseFloat(U)||0,y.L69=y.Lrad,y.L70=y.Lunm,y.TotalLosses=y.L65+y.L66+y.L67+y.L68+y.L69+y.L70,y.BoilerEff=100-y.TotalLosses,f(y)},Z=()=>{s(S=>{const P={...S};return Object.entries(fh).forEach(([X,U])=>{X in P&&(P[X]=String(U))}),P}),l(S=>{const P=new Set(S);return Vu.forEach(X=>P.delete(X)),P}),u(S=>{const P=new Set(S);return Vu.forEach(X=>P.delete(X)),P}),k(null),w.setProcesses([]),m(null),f(null),N(null),C(null),_($u),p(null)},T=S=>_(P=>({...P,[S]:!P[S]}));let D=null,H=null;if(c){const S=c,P=new Set;S.forEach(U=>Object.keys(J(U.start,U.end).avg).forEach(y=>P.add(y)));const X=gl.filter(U=>P.has(U));D=o.jsxs(o.Fragment,{children:[S.map((U,y)=>o.jsxs("div",{className:"kpi-card kpi-green",children:[o.jsx("div",{className:"kpi-label",children:U.title}),o.jsxs("div",{className:"kpi-value",children:[O(U.result.BoilerEff),o.jsx("span",{className:"kpi-unit",children:"%"})]}),o.jsxs("div",{className:"kpi-sub",children:[We(U.start)," → ",We(U.end)," · ",U.rowCount," row",U.rowCount===1?"":"s"]})]},y)),S.length===2&&o.jsx(xi,{p1:S[0],p2:S[1],eff1:S[0].result.BoilerEff,eff2:S[1].result.BoilerEff})]}),H=o.jsxs(o.Fragment,{children:[o.jsx(bi,{list:S,perProcessIds:X,labels:Mp,page:"asme",open:j.processInputsOpen,onToggle:()=>T("processInputsOpen")}),o.jsx(ki,{list:S,rows:mh,page:"asme",open:j.processComparisonOpen,onToggle:()=>T("processComparisonOpen")})]})}else if(F&&b!==null){const S=F;D=o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"kpi-card kpi-green",children:[o.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),o.jsxs("div",{className:"kpi-value boiler-eff-val",children:[O(S.BoilerEff),o.jsx("span",{className:"kpi-unit",children:"%"})]}),o.jsx("div",{className:"kpi-sub",children:"ASME PTC 4.1 — Losses Method, HHV basis"})]}),o.jsx(Le,{cls:"kpi-red",label:o.jsxs(o.Fragment,{children:["Dry Flue Gas Loss ",o.jsx("span",{style:{opacity:.6},children:"(Item 65)"})]}),children:o.jsxs("div",{className:"kpi-value",children:[O(S.L65),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-blue",label:o.jsxs(o.Fragment,{children:["Moisture in Fuel Loss ",o.jsx("span",{style:{opacity:.6},children:"(Item 66)"})]}),children:o.jsxs("div",{className:"kpi-value",children:[O(S.L66),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-green",label:o.jsxs(o.Fragment,{children:["H","₂"," Combustion Loss ",o.jsx("span",{style:{opacity:.6},children:"(Item 67)"})]}),children:o.jsxs("div",{className:"kpi-value",children:[O(S.L67),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsx(Le,{cls:"kpi-amber",label:o.jsxs(o.Fragment,{children:["Combustibles in Refuse ",o.jsx("span",{style:{opacity:.6},children:"(Item 68)"})]}),children:o.jsxs("div",{className:"kpi-value",children:[O(S.L68),o.jsx("span",{className:"kpi-unit",children:"%"})]})}),o.jsxs("div",{className:"kpi-card kpi-red",children:[o.jsxs("div",{className:"kpi-label",children:["Radiation Loss ",o.jsx("span",{style:{opacity:.6},children:"(Item 69)"})]}),o.jsxs("div",{style:Gu,children:[o.jsx("input",{type:"number",id:"Lrad",value:b,onChange:P=>le("Lrad",P.target.value),style:Hu}),o.jsx("span",{style:Wu,children:"%"})]}),o.jsx("div",{className:"kpi-sub",children:"ABMA curve / measured — enter & recalculate"})]}),o.jsxs("div",{className:"kpi-card kpi-blue",children:[o.jsxs("div",{className:"kpi-label",children:["Unmeasured Losses ",o.jsx("span",{style:{opacity:.6},children:"(Item 70)"})]}),o.jsxs("div",{style:Gu,children:[o.jsx("input",{type:"number",id:"Lunm",value:A??"",onChange:P=>le("Lunm",P.target.value),style:Hu}),o.jsx("span",{style:Wu,children:"%"})]}),o.jsx("div",{className:"kpi-sub",children:"Mutually agreed value — enter & recalculate"})]})]}),H=o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"output-section",children:[o.jsxs(go,{open:j.lossesOpen,onClick:()=>T("lossesOpen"),children:["Heat-Loss Efficiency — Items 65","–","72"]}),j.lossesOpen&&o.jsxs(o.Fragment,{children:[o.jsx(rr,{b:"Item"}),o.jsx(te,{name:"Dry Flue Gas Loss",sym:"65",val:S.L65,uom:"%"}),o.jsx(te,{name:"Moisture in Fuel",sym:"66",val:S.L66,uom:"%"}),o.jsx(te,{name:"Water from H₂ Combustion",sym:"67",val:S.L67,uom:"%"}),o.jsx(te,{name:"Combustibles in Refuse",sym:"68",val:S.L68,uom:"%"}),o.jsx(te,{name:"Radiation",sym:"69",val:S.L69,uom:"%"}),o.jsx(te,{name:"Unmeasured Losses",sym:"70",val:S.L70,uom:"%"}),o.jsxs("div",{className:"output-row highlight-row2",children:[o.jsx("span",{className:"out-name",children:"Total Losses"}),o.jsx("span",{className:"out-sym",children:"71"}),o.jsx("span",{className:"out-val",id:"losses-total-val",children:O(S.TotalLosses)}),o.jsx("span",{className:"out-uom",children:"%"})]}),o.jsxs("div",{className:"output-row highlight-row2",children:[o.jsx("span",{className:"out-name",children:"Boiler Efficiency"}),o.jsx("span",{className:"out-sym",children:"72"}),o.jsx("span",{className:"out-val",id:"losses-eff-val",children:O(S.BoilerEff)}),o.jsx("span",{className:"out-uom",children:"%"})]})]})]}),o.jsxs("div",{className:"output-section",children:[o.jsx(go,{open:j.intermediateOpen,onClick:()=>T("intermediateOpen"),children:"Intermediate Values"}),j.intermediateOpen&&o.jsxs(o.Fragment,{children:[o.jsx(rr,{b:"Item"}),o.jsx(te,{name:"CO₂, dry",sym:"32",val:S.CO2,uom:"%"}),o.jsx(te,{name:"N₂, dry (by difference)",sym:"35",val:S.N2,uom:"%"}),o.jsx(te,{name:"Excess Air",sym:"36",val:S.ExcessAir,uom:"%"}),o.jsx(te,{name:"Carbon, as fired (ultimate)",sym:"43",val:S.Ca,uom:"%"}),o.jsx(te,{name:"Hydrogen, as fired (ultimate)",sym:"44",val:S.H,uom:"%"}),o.jsx(te,{name:"Dry Refuse per Unit Fuel",sym:"22",val:S.DryRefuse,uom:"—"}),o.jsx(te,{name:"Carbon Burned per Unit Fuel",sym:"24",val:S.CarbonBurned,uom:"%"}),o.jsx(te,{name:"Dry Flue Gas per Unit Fuel",sym:"25",val:S.MassDFG,uom:"—"})]})]})]})}return o.jsxs("div",{className:"container",children:[o.jsx(lr,{}),o.jsxs("div",{className:"section-header",style:{marginTop:0},children:[o.jsx("div",{className:"section-label",children:"ASME-PTC 4.1"}),o.jsx("div",{className:"section-line"})]}),o.jsxs("div",{className:"tab-nav",children:[o.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[o.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),o.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[o.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),o.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[o.jsx(os,{description:"Upload your data sheet — matching input fields will be auto-populated, same detection as CENPEEP.",onFile:K,status:g}),o.jsx(yi,{uploadData:x,processes:w.processes,onAdd:w.add,onRemove:w.remove,onTitle:w.setTitle,onDate:w.setDate}),o.jsxs("div",{className:"action-bar",children:[o.jsxs("button",{className:"btn btn-ghost",onClick:Z,children:[o.jsx(_o,{}),"Reset to Defaults"]}),o.jsxs("button",{className:"btn btn-primary",onClick:ae,title:"ASME PTC 4.1 — Losses Method",children:[o.jsx(Io,{}),"Calculate Efficiency"]})]}),o.jsx(Xr,{cards:ch,open:d,onToggle:W}),_p.map(S=>o.jsx(Zr,{id:S,fields:Ip[S],open:!!d[S],values:r,onChange:I,detected:a,missing:i},S))]}),o.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[o.jsx("div",{className:"output-summary",id:"kpi-area",children:D}),o.jsx("div",{id:"output-tables",children:H}),o.jsx("div",{className:"download-bar",children:o.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})})]})]})}function gh(){return o.jsx(ir,{active:"/asme-ptc-4-1",children:o.jsx(hh,{})})}const yo=["BL","SP","O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","S","M","A","GCV","Cba","Cfa","GCVba","GCVfa","L6"],vo={BL:"Boiler Load (TPH)",SP:"Steam Pressure (kg/cm²)",O2fg:"O2 in Flue Gas (%)",COfg:"CO in Flue Gas (ppm)",CO2fg:"CO2 in Flue Gas (%)",Tfg:"Avg. Flue Gas Temperature (°C)",Tamb:"Ambient Temperature (°C)",Hum:"Humidity in Ambient Air (kg/kg dry air)",C:"Carbon (%)",H2:"Hydrogen (%)",N2:"Nitrogen (%)",O2f:"Oxygen (%)",S:"Sulphur (%)",M:"Moisture (%)",A:"Ash Content (%)",GCV:"GCV of Coal (kcal/kg)",Cba:"Unburnt in Bottom Ash (%)",Cfa:"Unburnt in Fly Ash (%)",GCVba:"GCV of Bottom Ash (kcal/kg)",GCVfa:"GCV of Fly Ash (kcal/kg)",L6:"Radiation & Unaccounted Losses (%)"},yh=["BL","SP"],vh=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function Vs(e){const n=P=>vh(e,P),t=n("O2fg");n("COfg");const r=n("CO2fg"),s=n("Tfg"),a=n("Tamb"),l=n("Hum"),i=n("C"),u=n("H2"),d=n("N2"),h=n("O2f"),g=n("S"),p=n("M"),x=n("A"),k=n("GCV"),w=n("Cba"),F=n("Cfa"),f=n("GCVba"),c=n("GCVfa"),m=n("L6"),b=(11.6*i+34.8*(u-h/8)+4.35*g)/100,N=t/(21-t)*100,A=(1+N/100)*b,C=i/100*(44/12)+d/100+A*(77/100)+(A-b)*(23/100)+g/100*(64/32),j=.24,_=.45,I=C*j*(s-a)/k*100,W=9*(u/100)*(584+_*(s-a))/k*100,J=p/100*(584+_*(s-a))/k*100,Y=A*(l/10)*_*(s-a)/k*100,K=i/100+r/5654/k/100,Z=F/100*(x/100)*c*100/k,H=w/100*(x/100)*f*100/k,S=100-(I+W+J+Y+K+m+Z+H);return{TA:b,EA:N,AAS:A,m:C,L1:I,L2:W,L3:J,L4:Y,L5:K,L6:m,L7:Z,L8:H,BoilerEff:S,heatInput:k,inputs:yo.map(P=>({id:P,label:vo[P]||P,value:e[P]}))}}const xh=[{target:"grid-general",icon:"GD",title:"General Data",sub:"2 parameters"},{target:"grid-fluegas",icon:"FG",title:"Flue Gas & Atmospheric Air",sub:"6 parameters"},{target:"grid-fuel",icon:"FA",title:"Fuel Analysis — Ultimate",sub:"8 parameters"},{target:"grid-ash",icon:"AA",title:"Ash Analysis",sub:"4 parameters"},{target:"grid-other",icon:"OL",title:"Other Losses",sub:"1 parameter"}],Bp={"grid-general":[{id:"BL",name:"Boiler Load",sym:"BL",uom:"TPH",kind:"field-info",value:"20",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}},{id:"SP",name:"Steam Pressure",sym:"SP",uom:"kg/cm²",kind:"field-info",value:"66",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}}],"grid-fluegas":[{id:"O2fg",name:"O₂ in Flue Gas",sym:"O2fg",uom:"%",kind:"",value:"9",readonly:!1},{id:"COfg",name:"CO in Flue Gas",sym:"COfg",uom:"ppm",kind:"",value:"800",readonly:!1},{id:"CO2fg",name:"CO₂ in Flue Gas",sym:"CO2fg",uom:"%",kind:"",value:"10.67",readonly:!1},{id:"Tfg",name:"Average Flue Gas Temperature",sym:"Tfg",uom:"°C",kind:"",value:"180",readonly:!1},{id:"Tamb",name:"Ambient Temperature",sym:"Tamb",uom:"°C",kind:"",value:"29.3",readonly:!1},{id:"Hum",name:"Humidity in Ambient Air",sym:"Hum",uom:"kg/kg dry air",kind:"",value:"0.1977",readonly:!1,step:"0.0001"}],"grid-fuel":[{id:"C",name:"Carbon",sym:"C",uom:"%",kind:"",value:"53.65",readonly:!1},{id:"H2",name:"Hydrogen",sym:"H2",uom:"%",kind:"",value:"3.25",readonly:!1},{id:"N2",name:"Nitrogen",sym:"N2",uom:"%",kind:"",value:"1.11",readonly:!1},{id:"O2f",name:"Oxygen",sym:"O2f",uom:"%",kind:"",value:"8.68",readonly:!1},{id:"S",name:"Sulphur",sym:"S",uom:"%",kind:"",value:"0.34",readonly:!1},{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"14.43",readonly:!1},{id:"A",name:"Ash Content",sym:"A",uom:"%",kind:"",value:"18.54",readonly:!1},{id:"GCV",name:"GCV of Coal",sym:"GCV",uom:"kcal/kg",kind:"",value:"4291",readonly:!1}],"grid-ash":[{id:"Cba",name:"Unburnt in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"0.11",readonly:!1},{id:"Cfa",name:"Unburnt in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"4.89",readonly:!1},{id:"GCVba",name:"GCV of Bottom Ash",sym:"GCVba",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"GCVfa",name:"GCV of Fly Ash",sym:"GCVfa",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-other":[{id:"L6",name:"Radiation & Unaccounted Losses",sym:"L6",uom:"%",kind:"field-manual",value:"1",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},Dp=["grid-general","grid-fluegas","grid-fuel","grid-ash","grid-other"],Si=Dp.flatMap(e=>Bp[e]),bh=Object.fromEntries(Si.map(e=>[e.id,e.value??""])),kh=new Set(Si.filter(e=>!e.readonly).map(e=>e.id)),wh=yo.filter(e=>!yh.includes(e)),Ch=["L6","S","GCVba","GCVfa"],jh=e=>wh.filter(n=>!Ch.includes(n)&&!(n in e)).map(n=>({id:n,label:vo[n]||n})),Sh={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},Nh=[["Date Range",e=>`${We(e.start)} → ${We(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>O(e.result.BoilerEff)],["Dry Flue Gas (%) — L1",e=>O(e.result.L1)],["H₂ in Fuel (%) — L2",e=>O(e.result.L2)],["Moisture in Fuel (%) — L3",e=>O(e.result.L3)],["Moisture in Air (%) — L4",e=>O(e.result.L4)],["Partial C→CO (%) — L5",e=>O(e.result.L5)],["Radiation & Unaccounted (%) — L6",e=>O(e.result.L6)],["Unburnt Fly Ash (%) — L7",e=>O(e.result.L7)],["Unburnt Bottom Ash (%) — L8",e=>O(e.result.L8)]],Ln=({name:e,sym:n,kcal:t,pct:r})=>o.jsxs("div",{className:"output-row",children:[o.jsx("span",{className:"out-name",children:e}),o.jsx("span",{className:"out-sym",children:n}),o.jsx("span",{className:"out-val",children:O(t)}),o.jsxs("span",{className:"out-uom",children:[O(r),"%"]})]});function Eh(){const e=ss();E.useEffect(()=>{document.title="Boiler Efficiency Calculator — BEE"},[]);const[n,t]=E.useState("input"),[r,s]=E.useState(bh),[a,l]=E.useState(new Set),[i,u]=E.useState(new Set),[d,h]=E.useState({}),[g,p]=E.useState(null),[x,k]=E.useState(null),[w,F]=E.useState(null),f=vi(),[c,m]=E.useState(null),[b,N]=E.useState(null),[A,C]=E.useState(""),[j,_]=E.useState({processInputsOpen:!1,processComparisonOpen:!1}),I=(y,M)=>s(G=>({...G,[y]:M})),W=y=>h(M=>({...M,[y]:!M[y]})),J=(y,M)=>gi(x,y,M,!0),Y=()=>{const y={};return yo.forEach(M=>{y[M]=r[M]!==void 0?r[M]:0}),y},K=async y=>{p({cls:"loading",text:"⏳ Parsing all sheets…"});const M=new FormData;M.append("file",y);try{const $=await(await an("/api/upload",{method:"POST",body:M})).json();if(!$.ok)throw new Error($.error||"Upload failed");as($,"BEE");const me={...$.extracted||{},...$.beeOverrides||{}},he={...r},je=new Set;let en=0;for(const[Re,En]of Object.entries(me))kh.has(Re)&&(he[Re]=String(typeof En=="number"?parseFloat(En.toFixed(6)):En),je.add(Re),en++);const Nn=jh(me),it=new Set;for(const Re of Nn)Si.some(En=>En.id===Re.id)&&it.add(Re.id);const ur={...$,missingFields:Nn};s(he),l(je),u(it),F($.filename),k(ur),f.setProcesses([]),N(null);const zn={...$.fieldDetail||{}};for(const Re of Object.keys($.beeOverrides||{}))zn[Re]={label:vo[Re]||Re,header:"LAB sheet (lab-tested reading)",source:"rule",confidence:1};p({cls:en?"success":"",node:hi({data:$,populated:en,fieldDetail:zn,missingFieldsList:Nn,strategyLabel:W0,derivedLabel:"↳ defaulted",bee:!0})}),e(en?`Excel imported — ${en} fields auto-populated`:"Sheet parsed — BEE field detection not configured yet",en?"success":"info")}catch(G){p({cls:"error",text:`✗ ${G.message}`}),e(G.message,"error")}},ae=()=>{const y=f.processes.filter($=>$.start||$.end);if(!y.length){const $=Vs(Y());N(null),m($),C(String($.L6)),t("output");return}const M=Y(),G=y.map($=>{const{avg:me,rowCount:he}=J($.start,$.end);return{title:$.title||"Process",start:$.start,end:$.end,rowCount:he,result:Vs({...M,...me})}});N(G),m(G[0].result),t("output")},le=y=>{if(C(y),!c)return;const M=parseFloat(y)||0,G=Y();G.L6=M,I("L6",String(M)),m(Vs(G))},Z=()=>{s(y=>{const M={...y};return Object.entries(Sh).forEach(([G,$])=>{G in M&&(M[G]=String($))}),M}),F(null),k(null),f.setProcesses([]),N(null),m(null),_({processInputsOpen:!1,processComparisonOpen:!1}),p(null)},T=async()=>{if(!c){e("Calculate first before saving.","error");return}const y=window.prompt("Session name (optional):",w||"");if(y===null)return;const M=c,G={sessionName:y.trim(),sourceFile:w||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:M.inputs,results:{method:"BEE-2 Indirect",BoilerEff:M.BoilerEff,L1:M.L1,L2:M.L2,L3:M.L3,L4:M.L4,L5:M.L5,L6:M.L6,L7:M.L7,L8:M.L8,TA:M.TA,EA:M.EA,AAS:M.AAS,m:M.m}};try{const me=await(await an("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(G)})).json();if(!me.ok)throw new Error(me.error);e("✓ Session saved to MongoDB!","success")}catch($){e("Save failed: "+$.message,"error")}},D=()=>{if(!c){e("Calculate first.","error");return}const y=c,M=new Date().toISOString().slice(0,19).replace("T"," ");let G=`BEE-2 Indirect Boiler Efficiency Report
Generated:,${M}

INPUTS
Parameter,Value
`;y.inputs.forEach($=>{G+=`"${$.label}",${$.value}
`}),G+=`
LOSSES
Parameter,Symbol,Value (%),kcal/kg of coal
`,[["Dry Flue Gas","L1",y.L1],["Hydrogen in Fuel","L2",y.L2],["Moisture in Fuel","L3",y.L3],["Moisture in Air","L4",y.L4],["Partial Combustion C→CO","L5",y.L5],["Radiation & Unaccounted","L6",y.L6],["Unburnt in Fly Ash","L7",y.L7],["Unburnt in Bottom Ash","L8",y.L8]].forEach(([$,me,he])=>{G+=`"${$}","${me}",${he.toFixed(4)},${(y.heatInput*he/100).toFixed(2)}
`}),G+=`
"Boiler Efficiency","eta",${y.BoilerEff.toFixed(4)},
`,Yt(new Blob([G],{type:"text/csv"}),`bee_indirect_report_${M.replace(/[: ]/g,"_")}.csv`)},H=()=>{if(!c){e("Calculate first.","error");return}const y=c,M=new Date().toLocaleString(),G=window.open("","_blank");G.document.write(`<!DOCTYPE html><html><head><title>BEE-2 Indirect Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}
  h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}
  table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}
  td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}
  .hl{background:#e6fff5!important;font-weight:bold}.meta{color:#666;font-size:11px;margin-bottom:16px}
  </style></head><body>
  <h1>BEE-2 Indirect Boiler Efficiency Report</h1><p class="meta">Generated: ${M}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${y.inputs.map($=>`<tr><td>${$.label}</td><td>${$.value}</td></tr>`).join("")}</table>
  <h2>Heat Balance</h2><table><tr><th>Parameter</th><th>Symbol</th><th>kcal/kg coal</th><th>% loss</th></tr>
  <tr><td>Heat Input</td><td></td><td>${O(y.heatInput)}</td><td>100.00</td></tr>
  <tr><td>Dry Flue Gas</td><td>L1</td><td>${O(y.heatInput*y.L1/100)}</td><td>${O(y.L1)}</td></tr>
  <tr><td>Hydrogen in Fuel</td><td>L2</td><td>${O(y.heatInput*y.L2/100)}</td><td>${O(y.L2)}</td></tr>
  <tr><td>Moisture in Fuel</td><td>L3</td><td>${O(y.heatInput*y.L3/100)}</td><td>${O(y.L3)}</td></tr>
  <tr><td>Moisture in Air</td><td>L4</td><td>${O(y.heatInput*y.L4/100)}</td><td>${O(y.L4)}</td></tr>
  <tr><td>Partial Combustion C→CO</td><td>L5</td><td>${O(y.heatInput*y.L5/100)}</td><td>${O(y.L5)}</td></tr>
  <tr><td>Radiation &amp; Unaccounted</td><td>L6</td><td>${O(y.heatInput*y.L6/100)}</td><td>${O(y.L6)}</td></tr>
  <tr><td>Unburnt in Fly Ash</td><td>L7</td><td>${O(y.heatInput*y.L7/100)}</td><td>${O(y.L7)}</td></tr>
  <tr><td>Unburnt in Bottom Ash</td><td>L8</td><td>${O(y.heatInput*y.L8/100)}</td><td>${O(y.L8)}</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td></td><td><b>${O(y.BoilerEff)}</b></td></tr>
  </table><script>window.print();<\/script></body></html>`),G.document.close()},S=async()=>{const y=x;if(!y||!y.fieldDetail||!Object.keys(y.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}const M={filename:y.filename,primarySheet:y.primarySheet,fieldDetail:y.fieldDetail,extracted:y.extracted,missingFields:y.missingFields};try{const G=await an("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(M)});if(!G.ok){const je=await G.json().catch(()=>({}));throw new Error(je.error||`Report generation failed (${G.status})`)}const $=await G.blob(),he=(G.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);Yt($,he?he[1]:"BEE_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(G){e("Report failed: "+G.message,"error")}},P=y=>_(M=>({...M,[y]:!M[y]}));let X=null,U=null;if(b){const y=b,M=new Set;y.forEach($=>Object.keys(J($.start,$.end).avg).forEach(me=>M.add(me)));const G=yo.filter($=>M.has($));X=o.jsxs(o.Fragment,{children:[y.map(($,me)=>o.jsxs("div",{className:"kpi-card kpi-green",children:[o.jsx("div",{className:"kpi-label",children:$.title}),o.jsxs("div",{className:"kpi-value",children:[O($.result.BoilerEff),o.jsx("span",{className:"kpi-unit",children:"%"})]}),o.jsxs("div",{className:"kpi-sub",children:[We($.start)," → ",We($.end)," · ",$.rowCount," row",$.rowCount===1?"":"s"]})]},me)),y.length===2&&o.jsx(xi,{p1:y[0],p2:y[1],eff1:y[0].result.BoilerEff,eff2:y[1].result.BoilerEff})]}),U=o.jsxs(o.Fragment,{children:[o.jsx(bi,{list:y,perProcessIds:G,labels:vo,page:"bee",open:j.processInputsOpen,onToggle:()=>P("processInputsOpen")}),o.jsx(ki,{list:y,rows:Nh,page:"bee",open:j.processComparisonOpen,onToggle:()=>P("processComparisonOpen")})]})}else if(c){const y=c,M=({v:G})=>o.jsxs("div",{className:"kpi-value",children:[O(G),o.jsx("span",{className:"kpi-unit",children:"%"})]});X=o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"kpi-card kpi-green",style:{gridColumn:"span 2"},children:[o.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),o.jsx(M,{v:y.BoilerEff}),o.jsx("div",{className:"kpi-sub",children:"BEE-2 Indirect method (heat-loss)"})]}),o.jsx(Le,{cls:"kpi-red",label:"L1 — Dry Flue Gas",children:o.jsx(M,{v:y.L1})}),o.jsx(Le,{cls:"kpi-blue",label:"L2 — H₂ in Fuel",children:o.jsx(M,{v:y.L2})}),o.jsx(Le,{cls:"kpi-blue",label:"L3 — Moisture in Fuel",children:o.jsx(M,{v:y.L3})}),o.jsx(Le,{cls:"kpi-blue",label:"L4 — Moisture in Air",children:o.jsx(M,{v:y.L4})}),o.jsx(Le,{cls:"kpi-amber",label:"L5 — Partial C→CO",children:o.jsx(M,{v:y.L5})}),o.jsxs("div",{className:"kpi-card kpi-amber",style:{gridColumn:"span 2"},children:[o.jsx("div",{className:"kpi-label",children:"L6 — Radiation & Unaccounted"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[o.jsx("input",{type:"number",id:"L6live",value:A,onChange:G=>le(G.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),o.jsx("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),o.jsx("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),o.jsx(Le,{cls:"kpi-amber",label:"L7 — Unburnt Fly Ash",children:o.jsx(M,{v:y.L7})}),o.jsx(Le,{cls:"kpi-amber",label:"L8 — Unburnt Bottom Ash",children:o.jsx(M,{v:y.L8})})]}),U=o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"output-section",children:[o.jsx("div",{className:"output-section-head",children:o.jsx("span",{children:"Heat Balance Summary"})}),o.jsx(rr,{c:"kcal/kg of coal",d:"% loss"}),o.jsx(Ln,{name:"Heat Input",sym:"",kcal:y.heatInput,pct:100}),o.jsx(Ln,{name:"Dry Flue Gas",sym:"L1",kcal:y.heatInput*y.L1/100,pct:y.L1}),o.jsx(Ln,{name:"Hydrogen in Fuel",sym:"L2",kcal:y.heatInput*y.L2/100,pct:y.L2}),o.jsx(Ln,{name:"Moisture in Fuel",sym:"L3",kcal:y.heatInput*y.L3/100,pct:y.L3}),o.jsx(Ln,{name:"Moisture in Air",sym:"L4",kcal:y.heatInput*y.L4/100,pct:y.L4}),o.jsx(Ln,{name:"Partial Combustion C→CO",sym:"L5",kcal:y.heatInput*y.L5/100,pct:y.L5}),o.jsx(Ln,{name:"Surface (Radiation) Losses",sym:"L6",kcal:y.heatInput*y.L6/100,pct:y.L6}),o.jsx(Ln,{name:"Unburnt in Fly Ash",sym:"L7",kcal:y.heatInput*y.L7/100,pct:y.L7}),o.jsx(Ln,{name:"Unburnt in Bottom Ash",sym:"L8",kcal:y.heatInput*y.L8/100,pct:y.L8}),o.jsxs("div",{className:"output-row highlight-row2",children:[o.jsx("span",{className:"out-name",children:"Boiler Efficiency"}),o.jsx("span",{className:"out-sym",children:"η"}),o.jsx("span",{className:"out-val",children:O(y.BoilerEff)}),o.jsx("span",{className:"out-uom",children:"%"})]})]}),o.jsxs("div",{className:"output-section",children:[o.jsx("div",{className:"output-section-head",children:o.jsx("span",{children:"Intermediate Values"})}),o.jsx(rr,{}),o.jsx(te,{name:"Theoretical Air Required",sym:"TA",val:y.TA,uom:"kg/kg coal"}),o.jsx(te,{name:"Excess Air Supplied",sym:"EA",val:y.EA,uom:"%"}),o.jsx(te,{name:"Actual Air Supplied",sym:"AAS",val:y.AAS,uom:"kg/kg coal"}),o.jsx(te,{name:"Mass of Dry Flue Gas",sym:"m",val:y.m,uom:"kg/kg coal"})]})]})}return o.jsxs("div",{className:"container",children:[o.jsx(lr,{}),o.jsxs("div",{className:"section-header",style:{marginTop:0},children:[o.jsx("div",{className:"section-label",children:"BEE"}),o.jsx("div",{className:"section-line"})]}),o.jsxs("div",{className:"tab-nav",children:[o.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[o.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),o.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[o.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),o.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[o.jsx(os,{description:"Upload your file — matching input fields will be auto-populated automatically.",onFile:K,status:g}),o.jsx(yi,{uploadData:x,processes:f.processes,onAdd:f.add,onRemove:f.remove,onTitle:f.setTitle,onDate:f.setDate}),o.jsxs("div",{className:"action-bar",children:[o.jsxs("button",{className:"btn btn-primary",onClick:ae,children:[o.jsx(Io,{}),"Calculate Efficiency"]}),o.jsxs("button",{className:"btn btn-ghost",onClick:Z,children:[o.jsx(_o,{}),"Reset to Defaults"]})]}),o.jsx(Xr,{cards:xh,open:d,onToggle:W}),Dp.map(y=>o.jsx(Zr,{id:y,fields:Bp[y],open:!!d[y],values:r,onChange:I,detected:a,missing:i},y))]}),o.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[o.jsx("div",{className:"output-summary",id:"kpi-area",children:X}),o.jsx("div",{id:"output-tables",children:U}),o.jsxs("div",{className:"download-bar",children:[o.jsxs("button",{className:"btn btn-primary",onClick:T,children:[o.jsx(xp,{}),"Save to Database"]}),o.jsxs("button",{className:"btn btn-secondary",onClick:D,children:[o.jsx(ho,{}),"Download CSV"]}),o.jsxs("button",{className:"btn btn-secondary",onClick:H,children:[o.jsx(ho,{}),"Download PDF"]}),o.jsxs("button",{className:"btn btn-secondary",onClick:S,children:[o.jsx(fi,{}),"Field Report (.docx)"]}),o.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function Lh(){return o.jsx(ir,{active:"/bee",extraStyle:"bee",children:o.jsx(Eh,{})})}const Ah={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},Th={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},Oh={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},Qu={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3},Ph=["L","Ffw","Fin","Cba","Cfa","M","A","VM","FC","GCV","O2in","O2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa"],Fh=["M","A","VM","FC","GCV","Cba","Cfa","O2out","COout","Tgo"],Mh=["O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","M","A","GCV","Cba","Cfa"],zp=e=>typeof e=="number"&&isFinite(e)?e.toFixed(2):"—";function va(e,n){return{found:n.filter(r=>e&&Object.prototype.hasOwnProperty.call(e,r)).length,total:n.length}}function Ju(e){const n=e.extracted||{},t=e.extractedBS2885||{},r={};try{const s=Tt({...Ah,...n});r.cenpeep={ok:!0,eff:s.BoilerEff,coverage:va(n,Ph)}}catch(s){r.cenpeep={ok:!1,error:s.message}}try{const s=yl({...Th,...n});r.asme={ok:!0,eff:s.BoilerEff,coverage:va(n,Fh)}}catch(s){r.asme={ok:!1,error:s.message}}try{const s=Vs({...Oh,...n});r.bee={ok:!0,eff:s.BoilerEff,coverage:va(n,Mh)}}catch(s){r.bee={ok:!1,error:s.message}}try{const s=Op({...Qu,...t});r.bs2885={ok:!0,effB:s.methodB.gross,effBnet:s.methodB.net,effA:s.methodA.gross,effAnet:s.methodA.net,coverage:{found:Object.keys(t).length,total:Object.keys(Qu).length}}}catch(s){r.bs2885={ok:!1,error:s.message}}return r}function Ih(e){const n=Math.max(0,Math.round((Date.now()-e)/1e3));if(n<60)return"just now";const t=Math.round(n/60);if(t<60)return`${t} min ago`;const r=Math.round(t/60);return r<24?`${r} hr ago`:`${Math.round(r/24)} day(s) ago`}const Es=({cls:e,label:n,sub:t,value:r})=>o.jsxs("div",{className:"kpi-card "+e,children:[o.jsx("div",{className:"kpi-label",children:n}),o.jsx("div",{className:"kpi-value",children:r}),o.jsx("div",{className:"kpi-sub",children:t})]}),Ls=({v:e})=>o.jsxs(o.Fragment,{children:[zp(e),o.jsx("span",{className:"kpi-unit",children:"%"})]});function _h(){const e=ss();E.useEffect(()=>{document.title="Boiler Efficiency Calculator — Summary"},[]);const[n,t]=E.useState(null),[r,s]=E.useState(""),[a,l]=E.useState(null);E.useEffect(()=>{let p;try{const x=sessionStorage.getItem(Sp);if(!x)return;p=JSON.parse(x)}catch{return}if(!(!p||!p.extracted))try{const x=Ju(p),k=["cenpeep","bs2885","asme","bee"].filter(w=>x[w].ok).length;t(x),s(`Auto-loaded from your last upload on the ${p.sourceTab||"another"} tab ("${p.filename||"file"}", ${Ih(p.savedAt)}) — ${k}/4 methods calculated. Upload a new file above to recalculate.`)}catch{}},[]);const i=async p=>{l({cls:"loading",text:"⏳ Parsing sheet and running all four methods…"});const x=new FormData;x.append("file",p);try{const w=await(await an("/api/upload",{method:"POST",body:x})).json();if(!w.ok)throw new Error(w.error||"Upload failed");as(w,"Summary"),s("");const F=Ju(w);t(F);const f=["cenpeep","bs2885","asme","bee"].filter(c=>F[c].ok).length;l({cls:"success",text:`✓ ${f}/4 methods calculated from "${w.filename}"`}),e(`Summary updated — ${f}/4 methods calculated`,f===4?"success":"error")}catch(k){l({cls:"error",text:`✗ ${k.message}`}),e(k.message,"error")}},u=n&&n.cenpeep,d=n&&n.bs2885,h=n&&n.asme,g=n&&n.bee;return o.jsxs("div",{className:"container",children:[o.jsx(lr,{}),o.jsxs("div",{className:"section-header",style:{marginTop:0},children:[o.jsx("div",{className:"section-label",children:"Summary — All Methods"}),o.jsx("div",{className:"section-line"})]}),o.jsx(os,{description:"Upload one data sheet — CENPEEP, BS-2885, ASME-PTC 4.1 and BEE efficiencies are all calculated from it, each using only its own required input fields.",onFile:i,status:a}),!n&&o.jsx("div",{id:"summary-empty",style:{textAlign:"center",padding:"60px 20px",color:"var(--muted)",fontSize:"14px"},children:"Upload a data sheet above — or upload one on any other tab and come back here — to see Boiler Efficiency computed by all four methods side by side."}),r&&o.jsx("div",{id:"summary-source-note",style:{fontSize:"12px",color:"var(--muted)",margin:"-6px 0 14px",padding:"0 4px"},children:r}),n&&o.jsxs("div",{id:"summary-results",children:[o.jsxs("div",{className:"output-summary",id:"summary-kpi-area",children:[o.jsx(Es,{cls:"kpi-green",label:"CENPEEP",sub:u.ok?`${u.coverage.found}/${u.coverage.total} fields detected`:u.error||"Could not calculate",value:u.ok?o.jsx(Ls,{v:u.eff}):"—"}),o.jsx(Es,{cls:"kpi-blue",label:"BS-2885 — Method B (indirect)",sub:d.ok?`Method A (direct): ${zp(d.effA)}% · ${d.coverage.found}/${d.coverage.total} fields`:d.error||"Could not calculate",value:d.ok?o.jsx(Ls,{v:d.effB}):"—"}),o.jsx(Es,{cls:"kpi-amber",label:"ASME PTC 4.1",sub:h.ok?`${h.coverage.found}/${h.coverage.total} fields detected`:h.error||"Could not calculate",value:h.ok?o.jsx(Ls,{v:h.eff}):"—"}),o.jsx(Es,{cls:"kpi-red",label:"BEE-2 Indirect",sub:g.ok?`${g.coverage.found}/${g.coverage.total} fields detected`:g.error||"Could not calculate",value:g.ok?o.jsx(Ls,{v:g.eff}):"—"})]}),o.jsx("div",{id:"summary-detail-tables"})]})]})}function Bh(){return o.jsx(ir,{active:"/summary",children:o.jsx(_h,{})})}const Cr=e=>typeof e=="number"&&!isNaN(e)?e.toFixed(2):"—";function Rp(e){const n=new Date(e);return n.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})+"  "+n.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}const xa=({icon:e,title:n,children:t})=>o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-icon",children:e}),o.jsx("div",{className:"empty-title",children:n}),t!==void 0&&o.jsx("div",{className:"empty-sub",children:t})]}),As=({children:e=" %"})=>o.jsx("span",{style:{fontSize:"12px",fontWeight:400,color:"var(--muted2)"},children:e});function Dh({s:e,onOpen:n,onDelete:t}){const r=e.results||{},s=e.sessionName||(e.sourceFile&&e.sourceFile!=="Manual Entry"?e.sourceFile:null)||`Session ${e._id.slice(-6)}`;return o.jsxs("div",{className:"session-card",onClick:()=>n(e),children:[o.jsx("button",{className:"session-card-delete",onClick:a=>t(a,e._id),children:"🗑"}),o.jsxs("div",{className:"session-card-header",children:[o.jsxs("div",{children:[o.jsx("div",{className:"session-card-title",children:s}),o.jsx("div",{className:"session-card-date",children:Rp(e.uploadedAt||e.createdAt)})]}),o.jsx("div",{className:"session-card-source",title:e.sourceFile||"",children:e.sourceFile||"Manual"})]}),e.boilerType&&o.jsx("div",{className:"boiler-type-badge",style:{margin:"0 0 12px",display:"inline-block"},children:e.boilerType}),o.jsxs("div",{className:"session-kpis",children:[o.jsxs("div",{className:"session-kpi",children:[o.jsx("div",{className:"session-kpi-label",children:"Boiler Eff."}),o.jsxs("div",{className:"session-kpi-value green",children:[Cr(r.BoilerEff),o.jsx(As,{})]})]}),o.jsxs("div",{className:"session-kpi",children:[o.jsx("div",{className:"session-kpi-label",children:"Corr. Eff."}),o.jsxs("div",{className:"session-kpi-value blue",children:[Cr(r.BoilerEffCorr),o.jsx(As,{})]})]}),o.jsxs("div",{className:"session-kpi",children:[o.jsx("div",{className:"session-kpi-label",children:"Dry Gas Loss"}),o.jsxs("div",{className:"session-kpi-value red",children:[Cr(r.Ldg),o.jsx(As,{})]})]}),o.jsxs("div",{className:"session-kpi",children:[o.jsx("div",{className:"session-kpi-label",children:"Unburnt C Loss"}),o.jsxs("div",{className:"session-kpi-value amber",children:[Cr(r.Luc),o.jsx(As,{})]})]})]})]})}const ve=({label:e,val:n,uom:t="",cls:r=""})=>o.jsxs("div",{className:"modal-row"+(r?" "+r:""),children:[o.jsx("span",{className:"modal-row-name",children:e}),o.jsx("span",{className:"modal-row-val",children:Cr(n)}),o.jsx("span",{className:"modal-row-uom",children:t})]});function zh({s:e,onClose:n}){const t=e.results||{};return o.jsx("div",{className:"modal-overlay open",id:"modal-overlay",onClick:r=>{r.target===r.currentTarget&&n()},children:o.jsxs("div",{className:"modal",id:"modal",children:[o.jsxs("div",{className:"modal-header",children:[o.jsx("h3",{id:"modal-title",children:e.sessionName||e.sourceFile||`Session ${e._id.slice(-6)}`}),o.jsx("button",{className:"modal-close",onClick:n,children:"✕"})]}),o.jsxs("div",{className:"modal-body",id:"modal-body",children:[o.jsxs("div",{style:{fontSize:"11px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",marginBottom:"18px"},children:["Source: ",e.sourceFile||"Manual","  |  Saved: ",Rp(e.uploadedAt||e.createdAt),e.boilerType?o.jsxs(o.Fragment,{children:["  |  Boiler: ",e.boilerType]}):null]}),o.jsx("div",{className:"modal-section-title",children:"Efficiency Results"}),o.jsx(ve,{label:"Boiler Efficiency (as-tested)",val:t.BoilerEff,uom:"%",cls:"modal-highlight"}),o.jsx(ve,{label:"Boiler Efficiency (corrected)",val:t.BoilerEffCorr,uom:"%",cls:"modal-highlight2"}),o.jsx("div",{className:"modal-section-title",children:"Losses"}),o.jsx(ve,{label:"Dry Gas Loss",val:t.Ldg,uom:"%"}),o.jsx(ve,{label:"Unburnt Carbon Loss",val:t.Luc,uom:"%"}),o.jsx(ve,{label:"Moisture in Fuel Loss",val:t.Lmf,uom:"%"}),o.jsx(ve,{label:"Hydrogen in Fuel Loss",val:t.Lhf,uom:"%"}),o.jsx(ve,{label:"CO Loss",val:t.Lco,uom:"%"}),o.jsx(ve,{label:"Moisture in Air Loss",val:t.Lma,uom:"%"}),o.jsx(ve,{label:"Radiation Loss",val:t.Lrad,uom:"%"}),o.jsx("div",{className:"modal-section-title",children:"Corrected Losses"}),o.jsx(ve,{label:"Dry Gas Loss (corr.)",val:t.Ldgc,uom:"%"}),o.jsx(ve,{label:"Unburnt Carbon Loss (corr.)",val:t.Lucc,uom:"%"}),o.jsx(ve,{label:"Moisture Fuel Loss (corr.)",val:t.Lmfc,uom:"%"}),o.jsx(ve,{label:"Hydrogen Fuel Loss (corr.)",val:t.Lhfc,uom:"%"}),o.jsx(ve,{label:"CO Loss (corr.)",val:t.Lcoc,uom:"%"}),o.jsx(ve,{label:"Moisture Air Loss (corr.)",val:t.Lmac,uom:"%"}),o.jsx("div",{className:"modal-section-title",children:"Intermediate Values"}),o.jsx(ve,{label:"CO₂ APH In",val:t.CO2in,uom:"%"}),o.jsx(ve,{label:"CO₂ APH Out",val:t.CO2out,uom:"%"}),o.jsx(ve,{label:"Weighted Air Temp In",val:t.Trai,uom:"°C"}),o.jsx(ve,{label:"AH Leakage",val:t.AL,uom:"%"}),o.jsx(ve,{label:"Gas Temp (Corrected)",val:t.Tgc,uom:"°C"}),e.inputs&&e.inputs.length>0&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"modal-section-title",children:"Input Parameters"}),e.inputs.map((r,s)=>o.jsx(ve,{label:r.label||r.id,val:parseFloat(r.value)},s))]})]})]})})}function Rh(){E.useEffect(()=>{document.title="Boiler Efficiency — Sessions"},[]);const[e,n]=E.useState({phase:"loading",sessions:[],error:""}),[t,r]=E.useState(null),s=E.useCallback(async()=>{n(h=>({...h,phase:"loading"}));try{const g=await(await an("/api/sessions")).json();if(!g.ok)throw new Error(g.error);n({phase:"ready",sessions:g.sessions,error:""})}catch(h){n({phase:"error",sessions:[],error:h.message})}},[]);E.useEffect(()=>{s()},[s]),E.useEffect(()=>{const h=g=>{g.key==="Escape"&&r(null)};return document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h)},[]);const a=async(h,g)=>{if(h.stopPropagation(),!!window.confirm("Delete this session?"))try{await an(`/api/sessions/${g}`,{method:"DELETE"}),s()}catch{}},{phase:l,sessions:i,error:u}=e,d=l==="ready"?i.length===1?"1 session":`${i.length} sessions`:"—";return o.jsxs(o.Fragment,{children:[t&&o.jsx(zh,{s:t,onClose:()=>r(null)}),o.jsxs("div",{className:"container",children:[o.jsx(lr,{}),o.jsxs("div",{className:"sessions-header",children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[o.jsx("h2",{children:"Saved Sessions"}),o.jsx("span",{className:"sessions-count",id:"sessions-count",children:d})]}),o.jsx("button",{className:"btn btn-ghost",onClick:s,style:{fontSize:"12px",padding:"8px 16px"},children:"↻ Refresh"})]}),o.jsxs("div",{id:"sessions-content",children:[l==="loading"&&o.jsx(xa,{icon:"⏳",title:"Loading sessions…",children:"Fetching data from the database."}),l==="error"&&o.jsxs(xa,{icon:"⚠️",title:"Could not load sessions",children:[u,o.jsx("br",{}),o.jsx("br",{}),"Make sure the server is running and MongoDB URI is configured in ",o.jsx("code",{children:".env"}),"."]}),l==="ready"&&!i.length&&o.jsx(xa,{icon:"📋",title:"No sessions yet",children:'Run a calculation and click "Save to Database" to store a session here.'}),l==="ready"&&i.length>0&&o.jsx("div",{className:"session-grid",id:"session-grid",children:i.map(h=>o.jsx(Dh,{s:h,onOpen:r,onDelete:a},h._id))})]})]})]})}function Uh(){return o.jsx(ir,{active:"/sessions",children:o.jsx(Rh,{})})}const Vh={"/calculator":sh,"/bs-2885":ih,"/asme-ptc-4-1":gh,"/bee":Lh,"/summary":Bh,"/sessions":Uh};function $h(){const e=S0(),n=Vh[e],t=y0();return E.useEffect(()=>{n&&!t&&gp("/")},[n,t]),n?t?o.jsx(n,{},e):null:o.jsx(I0,{})}ip(document.getElementById("root")).render(o.jsx($h,{}));
