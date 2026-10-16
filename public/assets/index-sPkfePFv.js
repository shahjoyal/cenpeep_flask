(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();var rc={exports:{}},No={},sc={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ls=Symbol.for("react.element"),ef=Symbol.for("react.portal"),nf=Symbol.for("react.fragment"),tf=Symbol.for("react.strict_mode"),rf=Symbol.for("react.profiler"),sf=Symbol.for("react.provider"),of=Symbol.for("react.context"),af=Symbol.for("react.forward_ref"),lf=Symbol.for("react.suspense"),uf=Symbol.for("react.memo"),cf=Symbol.for("react.lazy"),Pi=Symbol.iterator;function df(e){return e===null||typeof e!="object"?null:(e=Pi&&e[Pi]||e["@@iterator"],typeof e=="function"?e:null)}var oc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ac=Object.assign,lc={};function pr(e,n,t){this.props=e,this.context=n,this.refs=lc,this.updater=t||oc}pr.prototype.isReactComponent={};pr.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};pr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ic(){}ic.prototype=pr.prototype;function Cl(e,n,t){this.props=e,this.context=n,this.refs=lc,this.updater=t||oc}var Sl=Cl.prototype=new ic;Sl.constructor=Cl;ac(Sl,pr.prototype);Sl.isPureReactComponent=!0;var Ii=Array.isArray,uc=Object.prototype.hasOwnProperty,Nl={current:null},cc={key:!0,ref:!0,__self:!0,__source:!0};function dc(e,n,t){var r,o={},a=null,l=null;if(n!=null)for(r in n.ref!==void 0&&(l=n.ref),n.key!==void 0&&(a=""+n.key),n)uc.call(n,r)&&!cc.hasOwnProperty(r)&&(o[r]=n[r]);var i=arguments.length-2;if(i===1)o.children=t;else if(1<i){for(var u=Array(i),d=0;d<i;d++)u[d]=arguments[d+2];o.children=u}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)o[r]===void 0&&(o[r]=i[r]);return{$$typeof:ls,type:e,key:a,ref:l,props:o,_owner:Nl.current}}function pf(e,n){return{$$typeof:ls,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Ll(e){return typeof e=="object"&&e!==null&&e.$$typeof===ls}function ff(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Mi=/\/+/g;function Qo(e,n){return typeof e=="object"&&e!==null&&e.key!=null?ff(""+e.key):n.toString(36)}function Bs(e,n,t,r,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case ls:case ef:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Qo(l,0):r,Ii(o)?(t="",e!=null&&(t=e.replace(Mi,"$&/")+"/"),Bs(o,n,t,"",function(d){return d})):o!=null&&(Ll(o)&&(o=pf(o,t+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(Mi,"$&/")+"/")+e)),n.push(o)),1;if(l=0,r=r===""?".":r+":",Ii(e))for(var i=0;i<e.length;i++){a=e[i];var u=r+Qo(a,i);l+=Bs(a,n,t,u,o)}else if(u=df(e),typeof u=="function")for(e=u.call(e),i=0;!(a=e.next()).done;)a=a.value,u=r+Qo(a,i++),l+=Bs(a,n,t,u,o);else if(a==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return l}function gs(e,n,t){if(e==null)return e;var r=[],o=0;return Bs(e,r,"","",function(a){return n.call(t,a,o++)}),r}function mf(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var Ve={current:null},Ds={transition:null},hf={ReactCurrentDispatcher:Ve,ReactCurrentBatchConfig:Ds,ReactCurrentOwner:Nl};function pc(){throw Error("act(...) is not supported in production builds of React.")}ee.Children={map:gs,forEach:function(e,n,t){gs(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return gs(e,function(){n++}),n},toArray:function(e){return gs(e,function(n){return n})||[]},only:function(e){if(!Ll(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ee.Component=pr;ee.Fragment=nf;ee.Profiler=rf;ee.PureComponent=Cl;ee.StrictMode=tf;ee.Suspense=lf;ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hf;ee.act=pc;ee.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ac({},e.props),o=e.key,a=e.ref,l=e._owner;if(n!=null){if(n.ref!==void 0&&(a=n.ref,l=Nl.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(u in n)uc.call(n,u)&&!cc.hasOwnProperty(u)&&(r[u]=n[u]===void 0&&i!==void 0?i[u]:n[u])}var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){i=Array(u);for(var d=0;d<u;d++)i[d]=arguments[d+2];r.children=i}return{$$typeof:ls,type:e.type,key:o,ref:a,props:r,_owner:l}};ee.createContext=function(e){return e={$$typeof:of,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:sf,_context:e},e.Consumer=e};ee.createElement=dc;ee.createFactory=function(e){var n=dc.bind(null,e);return n.type=e,n};ee.createRef=function(){return{current:null}};ee.forwardRef=function(e){return{$$typeof:af,render:e}};ee.isValidElement=Ll;ee.lazy=function(e){return{$$typeof:cf,_payload:{_status:-1,_result:e},_init:mf}};ee.memo=function(e,n){return{$$typeof:uf,type:e,compare:n===void 0?null:n}};ee.startTransition=function(e){var n=Ds.transition;Ds.transition={};try{e()}finally{Ds.transition=n}};ee.unstable_act=pc;ee.useCallback=function(e,n){return Ve.current.useCallback(e,n)};ee.useContext=function(e){return Ve.current.useContext(e)};ee.useDebugValue=function(){};ee.useDeferredValue=function(e){return Ve.current.useDeferredValue(e)};ee.useEffect=function(e,n){return Ve.current.useEffect(e,n)};ee.useId=function(){return Ve.current.useId()};ee.useImperativeHandle=function(e,n,t){return Ve.current.useImperativeHandle(e,n,t)};ee.useInsertionEffect=function(e,n){return Ve.current.useInsertionEffect(e,n)};ee.useLayoutEffect=function(e,n){return Ve.current.useLayoutEffect(e,n)};ee.useMemo=function(e,n){return Ve.current.useMemo(e,n)};ee.useReducer=function(e,n,t){return Ve.current.useReducer(e,n,t)};ee.useRef=function(e){return Ve.current.useRef(e)};ee.useState=function(e){return Ve.current.useState(e)};ee.useSyncExternalStore=function(e,n,t){return Ve.current.useSyncExternalStore(e,n,t)};ee.useTransition=function(){return Ve.current.useTransition()};ee.version="18.3.1";sc.exports=ee;var N=sc.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gf=N,xf=Symbol.for("react.element"),yf=Symbol.for("react.fragment"),vf=Object.prototype.hasOwnProperty,bf=gf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,kf={key:!0,ref:!0,__self:!0,__source:!0};function fc(e,n,t){var r,o={},a=null,l=null;t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(l=n.ref);for(r in n)vf.call(n,r)&&!kf.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:xf,type:e,key:a,ref:l,props:o,_owner:bf.current}}No.Fragment=yf;No.jsx=fc;No.jsxs=fc;rc.exports=No;var s=rc.exports,mc={exports:{}},tn={},hc={exports:{}},gc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(E,D){var $=E.length;E.push(D);e:for(;0<$;){var S=$-1>>>1,O=E[S];if(0<o(O,D))E[S]=D,E[$]=O,$=S;else break e}}function t(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var D=E[0],$=E.pop();if($!==D){E[0]=$;e:for(var S=0,O=E.length,K=O>>>1;S<K;){var R=2*(S+1)-1,x=E[R],M=R+1,Q=E[M];if(0>o(x,$))M<O&&0>o(Q,x)?(E[S]=Q,E[M]=$,S=M):(E[S]=x,E[R]=$,S=R);else if(M<O&&0>o(Q,$))E[S]=Q,E[M]=$,S=M;else break e}}return D}function o(E,D){var $=E.sortIndex-D.sortIndex;return $!==0?$:E.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,i=l.now();e.unstable_now=function(){return l.now()-i}}var u=[],d=[],h=1,g=null,p=3,y=!1,k=!1,w=!1,T=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(E){for(var D=t(d);D!==null;){if(D.callback===null)r(d);else if(D.startTime<=E)r(d),D.sortIndex=D.expirationTime,n(u,D);else break;D=t(d)}}function b(E){if(w=!1,m(E),!k)if(t(u)!==null)k=!0,q(L);else{var D=t(d);D!==null&&Z(b,D.startTime-E)}}function L(E,D){k=!1,w&&(w=!1,f(C),C=-1),y=!0;var $=p;try{for(m(D),g=t(u);g!==null&&(!(g.expirationTime>D)||E&&!Y());){var S=g.callback;if(typeof S=="function"){g.callback=null,p=g.priorityLevel;var O=S(g.expirationTime<=D);D=e.unstable_now(),typeof O=="function"?g.callback=O:g===t(u)&&r(u),m(D)}else r(u);g=t(u)}if(g!==null)var K=!0;else{var R=t(d);R!==null&&Z(b,R.startTime-D),K=!1}return K}finally{g=null,p=$,y=!1}}var A=!1,j=null,C=-1,B=5,P=-1;function Y(){return!(e.unstable_now()-P<B)}function H(){if(j!==null){var E=e.unstable_now();P=E;var D=!0;try{D=j(!0,E)}finally{D?_():(A=!1,j=null)}}else A=!1}var _;if(typeof c=="function")_=function(){c(H)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,X=J.port2;J.port1.onmessage=H,_=function(){X.postMessage(null)}}else _=function(){T(H,0)};function q(E){j=E,A||(A=!0,_())}function Z(E,D){C=T(function(){E(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){k||y||(k=!0,q(L))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return t(u)},e.unstable_next=function(E){switch(p){case 1:case 2:case 3:var D=3;break;default:D=p}var $=p;p=D;try{return E()}finally{p=$}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,D){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var $=p;p=E;try{return D()}finally{p=$}},e.unstable_scheduleCallback=function(E,D,$){var S=e.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?S+$:S):$=S,E){case 1:var O=-1;break;case 2:O=250;break;case 5:O=1073741823;break;case 4:O=1e4;break;default:O=5e3}return O=$+O,E={id:h++,callback:D,priorityLevel:E,startTime:$,expirationTime:O,sortIndex:-1},$>S?(E.sortIndex=$,n(d,E),t(u)===null&&E===t(d)&&(w?(f(C),C=-1):w=!0,Z(b,$-S))):(E.sortIndex=O,n(u,E),k||y||(k=!0,q(L))),E},e.unstable_shouldYield=Y,e.unstable_wrapCallback=function(E){var D=p;return function(){var $=p;p=D;try{return E.apply(this,arguments)}finally{p=$}}}})(gc);hc.exports=gc;var wf=hc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jf=N,nn=wf;function F(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var xc=new Set,$r={};function At(e,n){tr(e,n),tr(e+"Capture",n)}function tr(e,n){for($r[e]=n,e=0;e<n.length;e++)xc.add(n[e])}var Dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Sa=Object.prototype.hasOwnProperty,Cf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_i={},Bi={};function Sf(e){return Sa.call(Bi,e)?!0:Sa.call(_i,e)?!1:Cf.test(e)?Bi[e]=!0:(_i[e]=!0,!1)}function Nf(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Lf(e,n,t,r){if(n===null||typeof n>"u"||Nf(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function $e(e,n,t,r,o,a,l){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=a,this.removeEmptyString=l}var Oe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Oe[e]=new $e(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];Oe[n]=new $e(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Oe[e]=new $e(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Oe[e]=new $e(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Oe[e]=new $e(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Oe[e]=new $e(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Oe[e]=new $e(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Oe[e]=new $e(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Oe[e]=new $e(e,5,!1,e.toLowerCase(),null,!1,!1)});var El=/[\-:]([a-z])/g;function Al(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(El,Al);Oe[n]=new $e(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(El,Al);Oe[n]=new $e(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(El,Al);Oe[n]=new $e(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Oe[e]=new $e(e,1,!1,e.toLowerCase(),null,!1,!1)});Oe.xlinkHref=new $e("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Oe[e]=new $e(e,1,!1,e.toLowerCase(),null,!0,!0)});function Tl(e,n,t,r){var o=Oe.hasOwnProperty(n)?Oe[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Lf(n,t,o,r)&&(t=null),r||o===null?Sf(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):o.mustUseProperty?e[o.propertyName]=t===null?o.type===3?!1:"":t:(n=o.attributeName,r=o.attributeNamespace,t===null?e.removeAttribute(n):(o=o.type,t=o===3||o===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Vn=jf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,xs=Symbol.for("react.element"),Dt=Symbol.for("react.portal"),zt=Symbol.for("react.fragment"),Ol=Symbol.for("react.strict_mode"),Na=Symbol.for("react.profiler"),yc=Symbol.for("react.provider"),vc=Symbol.for("react.context"),Fl=Symbol.for("react.forward_ref"),La=Symbol.for("react.suspense"),Ea=Symbol.for("react.suspense_list"),Pl=Symbol.for("react.memo"),Qn=Symbol.for("react.lazy"),bc=Symbol.for("react.offscreen"),Di=Symbol.iterator;function vr(e){return e===null||typeof e!="object"?null:(e=Di&&e[Di]||e["@@iterator"],typeof e=="function"?e:null)}var he=Object.assign,Jo;function Ar(e){if(Jo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Jo=n&&n[1]||""}return`
`+Jo+e}var Yo=!1;function Ko(e,n){if(!e||Yo)return"";Yo=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(d){var r=d}Reflect.construct(e,[],n)}else{try{n.call()}catch(d){r=d}e.call(n.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var o=d.stack.split(`
`),a=r.stack.split(`
`),l=o.length-1,i=a.length-1;1<=l&&0<=i&&o[l]!==a[i];)i--;for(;1<=l&&0<=i;l--,i--)if(o[l]!==a[i]){if(l!==1||i!==1)do if(l--,i--,0>i||o[l]!==a[i]){var u=`
`+o[l].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=l&&0<=i);break}}}finally{Yo=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Ar(e):""}function Ef(e){switch(e.tag){case 5:return Ar(e.type);case 16:return Ar("Lazy");case 13:return Ar("Suspense");case 19:return Ar("SuspenseList");case 0:case 2:case 15:return e=Ko(e.type,!1),e;case 11:return e=Ko(e.type.render,!1),e;case 1:return e=Ko(e.type,!0),e;default:return""}}function Aa(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case zt:return"Fragment";case Dt:return"Portal";case Na:return"Profiler";case Ol:return"StrictMode";case La:return"Suspense";case Ea:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case vc:return(e.displayName||"Context")+".Consumer";case yc:return(e._context.displayName||"Context")+".Provider";case Fl:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Pl:return n=e.displayName||null,n!==null?n:Aa(e.type)||"Memo";case Qn:n=e._payload,e=e._init;try{return Aa(e(n))}catch{}}return null}function Af(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Aa(n);case 8:return n===Ol?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function lt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function kc(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Tf(e){var n=kc(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var o=t.get,a=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,a.call(this,l)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function ys(e){e._valueTracker||(e._valueTracker=Tf(e))}function wc(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=kc(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Ks(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ta(e,n){var t=n.checked;return he({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function zi(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=lt(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function jc(e,n){n=n.checked,n!=null&&Tl(e,"checked",n,!1)}function Oa(e,n){jc(e,n);var t=lt(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Fa(e,n.type,t):n.hasOwnProperty("defaultValue")&&Fa(e,n.type,lt(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Ri(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Fa(e,n,t){(n!=="number"||Ks(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Tr=Array.isArray;function Kt(e,n,t,r){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&r&&(e[t].defaultSelected=!0)}else{for(t=""+lt(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function Pa(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(F(91));return he({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ui(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(F(92));if(Tr(t)){if(1<t.length)throw Error(F(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:lt(t)}}function Cc(e,n){var t=lt(n.value),r=lt(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function Vi(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Sc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ia(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Sc(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var vs,Nc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(vs=vs||document.createElement("div"),vs.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=vs.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Hr(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Ir={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Of=["Webkit","ms","Moz","O"];Object.keys(Ir).forEach(function(e){Of.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Ir[n]=Ir[e]})});function Lc(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Ir.hasOwnProperty(e)&&Ir[e]?(""+n).trim():n+"px"}function Ec(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,o=Lc(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,o):e[t]=o}}var Ff=he({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ma(e,n){if(n){if(Ff[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(F(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(F(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(F(61))}if(n.style!=null&&typeof n.style!="object")throw Error(F(62))}}function _a(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ba=null;function Il(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Da=null,Xt=null,Zt=null;function $i(e){if(e=cs(e)){if(typeof Da!="function")throw Error(F(280));var n=e.stateNode;n&&(n=Oo(n),Da(e.stateNode,e.type,n))}}function Ac(e){Xt?Zt?Zt.push(e):Zt=[e]:Xt=e}function Tc(){if(Xt){var e=Xt,n=Zt;if(Zt=Xt=null,$i(e),n)for(e=0;e<n.length;e++)$i(n[e])}}function Oc(e,n){return e(n)}function Fc(){}var Xo=!1;function Pc(e,n,t){if(Xo)return e(n,t);Xo=!0;try{return Oc(e,n,t)}finally{Xo=!1,(Xt!==null||Zt!==null)&&(Fc(),Tc())}}function Gr(e,n){var t=e.stateNode;if(t===null)return null;var r=Oo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(F(231,n,typeof t));return t}var za=!1;if(Dn)try{var br={};Object.defineProperty(br,"passive",{get:function(){za=!0}}),window.addEventListener("test",br,br),window.removeEventListener("test",br,br)}catch{za=!1}function Pf(e,n,t,r,o,a,l,i,u){var d=Array.prototype.slice.call(arguments,3);try{n.apply(t,d)}catch(h){this.onError(h)}}var Mr=!1,Xs=null,Zs=!1,Ra=null,If={onError:function(e){Mr=!0,Xs=e}};function Mf(e,n,t,r,o,a,l,i,u){Mr=!1,Xs=null,Pf.apply(If,arguments)}function _f(e,n,t,r,o,a,l,i,u){if(Mf.apply(this,arguments),Mr){if(Mr){var d=Xs;Mr=!1,Xs=null}else throw Error(F(198));Zs||(Zs=!0,Ra=d)}}function Tt(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Ic(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Hi(e){if(Tt(e)!==e)throw Error(F(188))}function Bf(e){var n=e.alternate;if(!n){if(n=Tt(e),n===null)throw Error(F(188));return n!==e?null:e}for(var t=e,r=n;;){var o=t.return;if(o===null)break;var a=o.alternate;if(a===null){if(r=o.return,r!==null){t=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===t)return Hi(o),e;if(a===r)return Hi(o),n;a=a.sibling}throw Error(F(188))}if(t.return!==r.return)t=o,r=a;else{for(var l=!1,i=o.child;i;){if(i===t){l=!0,t=o,r=a;break}if(i===r){l=!0,r=o,t=a;break}i=i.sibling}if(!l){for(i=a.child;i;){if(i===t){l=!0,t=a,r=o;break}if(i===r){l=!0,r=a,t=o;break}i=i.sibling}if(!l)throw Error(F(189))}}if(t.alternate!==r)throw Error(F(190))}if(t.tag!==3)throw Error(F(188));return t.stateNode.current===t?e:n}function Mc(e){return e=Bf(e),e!==null?_c(e):null}function _c(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=_c(e);if(n!==null)return n;e=e.sibling}return null}var Bc=nn.unstable_scheduleCallback,Gi=nn.unstable_cancelCallback,Df=nn.unstable_shouldYield,zf=nn.unstable_requestPaint,be=nn.unstable_now,Rf=nn.unstable_getCurrentPriorityLevel,Ml=nn.unstable_ImmediatePriority,Dc=nn.unstable_UserBlockingPriority,qs=nn.unstable_NormalPriority,Uf=nn.unstable_LowPriority,zc=nn.unstable_IdlePriority,Lo=null,En=null;function Vf(e){if(En&&typeof En.onCommitFiberRoot=="function")try{En.onCommitFiberRoot(Lo,e,void 0,(e.current.flags&128)===128)}catch{}}var bn=Math.clz32?Math.clz32:Gf,$f=Math.log,Hf=Math.LN2;function Gf(e){return e>>>=0,e===0?32:31-($f(e)/Hf|0)|0}var bs=64,ks=4194304;function Or(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function eo(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,l=t&268435455;if(l!==0){var i=l&~o;i!==0?r=Or(i):(a&=l,a!==0&&(r=Or(a)))}else l=t&~o,l!==0?r=Or(l):a!==0&&(r=Or(a));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,a=n&-n,o>=a||o===16&&(a&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-bn(n),o=1<<t,r|=e[t],n&=~o;return r}function Wf(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qf(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-bn(a),i=1<<l,u=o[l];u===-1?(!(i&t)||i&r)&&(o[l]=Wf(i,n)):u<=n&&(e.expiredLanes|=i),a&=~i}}function Ua(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Rc(){var e=bs;return bs<<=1,!(bs&4194240)&&(bs=64),e}function Zo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function is(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-bn(n),e[n]=t}function Jf(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var o=31-bn(t),a=1<<o;n[o]=0,r[o]=-1,e[o]=-1,t&=~a}}function _l(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-bn(t),o=1<<r;o&n|e[r]&n&&(e[r]|=n),t&=~o}}var oe=0;function Uc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Vc,Bl,$c,Hc,Gc,Va=!1,ws=[],qn=null,et=null,nt=null,Wr=new Map,Qr=new Map,Yn=[],Yf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Wi(e,n){switch(e){case"focusin":case"focusout":qn=null;break;case"dragenter":case"dragleave":et=null;break;case"mouseover":case"mouseout":nt=null;break;case"pointerover":case"pointerout":Wr.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Qr.delete(n.pointerId)}}function kr(e,n,t,r,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},n!==null&&(n=cs(n),n!==null&&Bl(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function Kf(e,n,t,r,o){switch(n){case"focusin":return qn=kr(qn,e,n,t,r,o),!0;case"dragenter":return et=kr(et,e,n,t,r,o),!0;case"mouseover":return nt=kr(nt,e,n,t,r,o),!0;case"pointerover":var a=o.pointerId;return Wr.set(a,kr(Wr.get(a)||null,e,n,t,r,o)),!0;case"gotpointercapture":return a=o.pointerId,Qr.set(a,kr(Qr.get(a)||null,e,n,t,r,o)),!0}return!1}function Wc(e){var n=yt(e.target);if(n!==null){var t=Tt(n);if(t!==null){if(n=t.tag,n===13){if(n=Ic(t),n!==null){e.blockedOn=n,Gc(e.priority,function(){$c(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function zs(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=$a(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);Ba=r,t.target.dispatchEvent(r),Ba=null}else return n=cs(t),n!==null&&Bl(n),e.blockedOn=t,!1;n.shift()}return!0}function Qi(e,n,t){zs(e)&&t.delete(n)}function Xf(){Va=!1,qn!==null&&zs(qn)&&(qn=null),et!==null&&zs(et)&&(et=null),nt!==null&&zs(nt)&&(nt=null),Wr.forEach(Qi),Qr.forEach(Qi)}function wr(e,n){e.blockedOn===n&&(e.blockedOn=null,Va||(Va=!0,nn.unstable_scheduleCallback(nn.unstable_NormalPriority,Xf)))}function Jr(e){function n(o){return wr(o,e)}if(0<ws.length){wr(ws[0],e);for(var t=1;t<ws.length;t++){var r=ws[t];r.blockedOn===e&&(r.blockedOn=null)}}for(qn!==null&&wr(qn,e),et!==null&&wr(et,e),nt!==null&&wr(nt,e),Wr.forEach(n),Qr.forEach(n),t=0;t<Yn.length;t++)r=Yn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<Yn.length&&(t=Yn[0],t.blockedOn===null);)Wc(t),t.blockedOn===null&&Yn.shift()}var qt=Vn.ReactCurrentBatchConfig,no=!0;function Zf(e,n,t,r){var o=oe,a=qt.transition;qt.transition=null;try{oe=1,Dl(e,n,t,r)}finally{oe=o,qt.transition=a}}function qf(e,n,t,r){var o=oe,a=qt.transition;qt.transition=null;try{oe=4,Dl(e,n,t,r)}finally{oe=o,qt.transition=a}}function Dl(e,n,t,r){if(no){var o=$a(e,n,t,r);if(o===null)ia(e,n,r,to,t),Wi(e,r);else if(Kf(o,e,n,t,r))r.stopPropagation();else if(Wi(e,r),n&4&&-1<Yf.indexOf(e)){for(;o!==null;){var a=cs(o);if(a!==null&&Vc(a),a=$a(e,n,t,r),a===null&&ia(e,n,r,to,t),a===o)break;o=a}o!==null&&r.stopPropagation()}else ia(e,n,r,null,t)}}var to=null;function $a(e,n,t,r){if(to=null,e=Il(r),e=yt(e),e!==null)if(n=Tt(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Ic(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return to=e,null}function Qc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Rf()){case Ml:return 1;case Dc:return 4;case qs:case Uf:return 16;case zc:return 536870912;default:return 16}default:return 16}}var Xn=null,zl=null,Rs=null;function Jc(){if(Rs)return Rs;var e,n=zl,t=n.length,r,o="value"in Xn?Xn.value:Xn.textContent,a=o.length;for(e=0;e<t&&n[e]===o[e];e++);var l=t-e;for(r=1;r<=l&&n[t-r]===o[a-r];r++);return Rs=o.slice(e,1<r?1-r:void 0)}function Us(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function js(){return!0}function Ji(){return!1}function rn(e){function n(t,r,o,a,l){this._reactName=t,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(a):a[i]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?js:Ji,this.isPropagationStopped=Ji,this}return he(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=js)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=js)},persist:function(){},isPersistent:js}),n}var fr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Rl=rn(fr),us=he({},fr,{view:0,detail:0}),em=rn(us),qo,ea,jr,Eo=he({},us,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ul,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==jr&&(jr&&e.type==="mousemove"?(qo=e.screenX-jr.screenX,ea=e.screenY-jr.screenY):ea=qo=0,jr=e),qo)},movementY:function(e){return"movementY"in e?e.movementY:ea}}),Yi=rn(Eo),nm=he({},Eo,{dataTransfer:0}),tm=rn(nm),rm=he({},us,{relatedTarget:0}),na=rn(rm),sm=he({},fr,{animationName:0,elapsedTime:0,pseudoElement:0}),om=rn(sm),am=he({},fr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),lm=rn(am),im=he({},fr,{data:0}),Ki=rn(im),um={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},dm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pm(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=dm[e])?!!n[e]:!1}function Ul(){return pm}var fm=he({},us,{key:function(e){if(e.key){var n=um[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Us(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?cm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ul,charCode:function(e){return e.type==="keypress"?Us(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Us(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),mm=rn(fm),hm=he({},Eo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xi=rn(hm),gm=he({},us,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ul}),xm=rn(gm),ym=he({},fr,{propertyName:0,elapsedTime:0,pseudoElement:0}),vm=rn(ym),bm=he({},Eo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),km=rn(bm),wm=[9,13,27,32],Vl=Dn&&"CompositionEvent"in window,_r=null;Dn&&"documentMode"in document&&(_r=document.documentMode);var jm=Dn&&"TextEvent"in window&&!_r,Yc=Dn&&(!Vl||_r&&8<_r&&11>=_r),Zi=" ",qi=!1;function Kc(e,n){switch(e){case"keyup":return wm.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Xc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Rt=!1;function Cm(e,n){switch(e){case"compositionend":return Xc(n);case"keypress":return n.which!==32?null:(qi=!0,Zi);case"textInput":return e=n.data,e===Zi&&qi?null:e;default:return null}}function Sm(e,n){if(Rt)return e==="compositionend"||!Vl&&Kc(e,n)?(e=Jc(),Rs=zl=Xn=null,Rt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Yc&&n.locale!=="ko"?null:n.data;default:return null}}var Nm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function eu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Nm[e.type]:n==="textarea"}function Zc(e,n,t,r){Ac(r),n=ro(n,"onChange"),0<n.length&&(t=new Rl("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Br=null,Yr=null;function Lm(e){ud(e,0)}function Ao(e){var n=$t(e);if(wc(n))return e}function Em(e,n){if(e==="change")return n}var qc=!1;if(Dn){var ta;if(Dn){var ra="oninput"in document;if(!ra){var nu=document.createElement("div");nu.setAttribute("oninput","return;"),ra=typeof nu.oninput=="function"}ta=ra}else ta=!1;qc=ta&&(!document.documentMode||9<document.documentMode)}function tu(){Br&&(Br.detachEvent("onpropertychange",ed),Yr=Br=null)}function ed(e){if(e.propertyName==="value"&&Ao(Yr)){var n=[];Zc(n,Yr,e,Il(e)),Pc(Lm,n)}}function Am(e,n,t){e==="focusin"?(tu(),Br=n,Yr=t,Br.attachEvent("onpropertychange",ed)):e==="focusout"&&tu()}function Tm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ao(Yr)}function Om(e,n){if(e==="click")return Ao(n)}function Fm(e,n){if(e==="input"||e==="change")return Ao(n)}function Pm(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var wn=typeof Object.is=="function"?Object.is:Pm;function Kr(e,n){if(wn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var o=t[r];if(!Sa.call(n,o)||!wn(e[o],n[o]))return!1}return!0}function ru(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function su(e,n){var t=ru(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ru(t)}}function nd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?nd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function td(){for(var e=window,n=Ks();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ks(e.document)}return n}function $l(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Im(e){var n=td(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&nd(t.ownerDocument.documentElement,t)){if(r!==null&&$l(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=t.textContent.length,a=Math.min(r.start,o);r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=su(t,a);var l=su(t,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(n),e.extend(l.node,l.offset)):(n.setEnd(l.node,l.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Mm=Dn&&"documentMode"in document&&11>=document.documentMode,Ut=null,Ha=null,Dr=null,Ga=!1;function ou(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ga||Ut==null||Ut!==Ks(r)||(r=Ut,"selectionStart"in r&&$l(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Dr&&Kr(Dr,r)||(Dr=r,r=ro(Ha,"onSelect"),0<r.length&&(n=new Rl("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Ut)))}function Cs(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Vt={animationend:Cs("Animation","AnimationEnd"),animationiteration:Cs("Animation","AnimationIteration"),animationstart:Cs("Animation","AnimationStart"),transitionend:Cs("Transition","TransitionEnd")},sa={},rd={};Dn&&(rd=document.createElement("div").style,"AnimationEvent"in window||(delete Vt.animationend.animation,delete Vt.animationiteration.animation,delete Vt.animationstart.animation),"TransitionEvent"in window||delete Vt.transitionend.transition);function To(e){if(sa[e])return sa[e];if(!Vt[e])return e;var n=Vt[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in rd)return sa[e]=n[t];return e}var sd=To("animationend"),od=To("animationiteration"),ad=To("animationstart"),ld=To("transitionend"),id=new Map,au="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ut(e,n){id.set(e,n),At(n,[e])}for(var oa=0;oa<au.length;oa++){var aa=au[oa],_m=aa.toLowerCase(),Bm=aa[0].toUpperCase()+aa.slice(1);ut(_m,"on"+Bm)}ut(sd,"onAnimationEnd");ut(od,"onAnimationIteration");ut(ad,"onAnimationStart");ut("dblclick","onDoubleClick");ut("focusin","onFocus");ut("focusout","onBlur");ut(ld,"onTransitionEnd");tr("onMouseEnter",["mouseout","mouseover"]);tr("onMouseLeave",["mouseout","mouseover"]);tr("onPointerEnter",["pointerout","pointerover"]);tr("onPointerLeave",["pointerout","pointerover"]);At("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));At("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));At("onBeforeInput",["compositionend","keypress","textInput","paste"]);At("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));At("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));At("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fr));function lu(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,_f(r,n,void 0,e),e.currentTarget=null}function ud(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],o=r.event;r=r.listeners;e:{var a=void 0;if(n)for(var l=r.length-1;0<=l;l--){var i=r[l],u=i.instance,d=i.currentTarget;if(i=i.listener,u!==a&&o.isPropagationStopped())break e;lu(o,i,d),a=u}else for(l=0;l<r.length;l++){if(i=r[l],u=i.instance,d=i.currentTarget,i=i.listener,u!==a&&o.isPropagationStopped())break e;lu(o,i,d),a=u}}}if(Zs)throw e=Ra,Zs=!1,Ra=null,e}function ce(e,n){var t=n[Ka];t===void 0&&(t=n[Ka]=new Set);var r=e+"__bubble";t.has(r)||(cd(n,e,2,!1),t.add(r))}function la(e,n,t){var r=0;n&&(r|=4),cd(t,e,r,n)}var Ss="_reactListening"+Math.random().toString(36).slice(2);function Xr(e){if(!e[Ss]){e[Ss]=!0,xc.forEach(function(t){t!=="selectionchange"&&(Dm.has(t)||la(t,!1,e),la(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ss]||(n[Ss]=!0,la("selectionchange",!1,n))}}function cd(e,n,t,r){switch(Qc(n)){case 1:var o=Zf;break;case 4:o=qf;break;default:o=Dl}t=o.bind(null,n,t,e),o=void 0,!za||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function ia(e,n,t,r,o){var a=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var i=r.stateNode.containerInfo;if(i===o||i.nodeType===8&&i.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var u=l.tag;if((u===3||u===4)&&(u=l.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;l=l.return}for(;i!==null;){if(l=yt(i),l===null)return;if(u=l.tag,u===5||u===6){r=a=l;continue e}i=i.parentNode}}r=r.return}Pc(function(){var d=a,h=Il(t),g=[];e:{var p=id.get(e);if(p!==void 0){var y=Rl,k=e;switch(e){case"keypress":if(Us(t)===0)break e;case"keydown":case"keyup":y=mm;break;case"focusin":k="focus",y=na;break;case"focusout":k="blur",y=na;break;case"beforeblur":case"afterblur":y=na;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Yi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=tm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=xm;break;case sd:case od:case ad:y=om;break;case ld:y=vm;break;case"scroll":y=em;break;case"wheel":y=km;break;case"copy":case"cut":case"paste":y=lm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Xi}var w=(n&4)!==0,T=!w&&e==="scroll",f=w?p!==null?p+"Capture":null:p;w=[];for(var c=d,m;c!==null;){m=c;var b=m.stateNode;if(m.tag===5&&b!==null&&(m=b,f!==null&&(b=Gr(c,f),b!=null&&w.push(Zr(c,b,m)))),T)break;c=c.return}0<w.length&&(p=new y(p,k,null,t,h),g.push({event:p,listeners:w}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",p&&t!==Ba&&(k=t.relatedTarget||t.fromElement)&&(yt(k)||k[zn]))break e;if((y||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,y?(k=t.relatedTarget||t.toElement,y=d,k=k?yt(k):null,k!==null&&(T=Tt(k),k!==T||k.tag!==5&&k.tag!==6)&&(k=null)):(y=null,k=d),y!==k)){if(w=Yi,b="onMouseLeave",f="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=Xi,b="onPointerLeave",f="onPointerEnter",c="pointer"),T=y==null?p:$t(y),m=k==null?p:$t(k),p=new w(b,c+"leave",y,t,h),p.target=T,p.relatedTarget=m,b=null,yt(h)===d&&(w=new w(f,c+"enter",k,t,h),w.target=m,w.relatedTarget=T,b=w),T=b,y&&k)n:{for(w=y,f=k,c=0,m=w;m;m=Mt(m))c++;for(m=0,b=f;b;b=Mt(b))m++;for(;0<c-m;)w=Mt(w),c--;for(;0<m-c;)f=Mt(f),m--;for(;c--;){if(w===f||f!==null&&w===f.alternate)break n;w=Mt(w),f=Mt(f)}w=null}else w=null;y!==null&&iu(g,p,y,w,!1),k!==null&&T!==null&&iu(g,T,k,w,!0)}}e:{if(p=d?$t(d):window,y=p.nodeName&&p.nodeName.toLowerCase(),y==="select"||y==="input"&&p.type==="file")var L=Em;else if(eu(p))if(qc)L=Fm;else{L=Tm;var A=Am}else(y=p.nodeName)&&y.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(L=Om);if(L&&(L=L(e,d))){Zc(g,L,t,h);break e}A&&A(e,p,d),e==="focusout"&&(A=p._wrapperState)&&A.controlled&&p.type==="number"&&Fa(p,"number",p.value)}switch(A=d?$t(d):window,e){case"focusin":(eu(A)||A.contentEditable==="true")&&(Ut=A,Ha=d,Dr=null);break;case"focusout":Dr=Ha=Ut=null;break;case"mousedown":Ga=!0;break;case"contextmenu":case"mouseup":case"dragend":Ga=!1,ou(g,t,h);break;case"selectionchange":if(Mm)break;case"keydown":case"keyup":ou(g,t,h)}var j;if(Vl)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Rt?Kc(e,t)&&(C="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(C="onCompositionStart");C&&(Yc&&t.locale!=="ko"&&(Rt||C!=="onCompositionStart"?C==="onCompositionEnd"&&Rt&&(j=Jc()):(Xn=h,zl="value"in Xn?Xn.value:Xn.textContent,Rt=!0)),A=ro(d,C),0<A.length&&(C=new Ki(C,e,null,t,h),g.push({event:C,listeners:A}),j?C.data=j:(j=Xc(t),j!==null&&(C.data=j)))),(j=jm?Cm(e,t):Sm(e,t))&&(d=ro(d,"onBeforeInput"),0<d.length&&(h=new Ki("onBeforeInput","beforeinput",null,t,h),g.push({event:h,listeners:d}),h.data=j))}ud(g,n)})}function Zr(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ro(e,n){for(var t=n+"Capture",r=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=Gr(e,t),a!=null&&r.unshift(Zr(e,a,o)),a=Gr(e,n),a!=null&&r.push(Zr(e,a,o))),e=e.return}return r}function Mt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function iu(e,n,t,r,o){for(var a=n._reactName,l=[];t!==null&&t!==r;){var i=t,u=i.alternate,d=i.stateNode;if(u!==null&&u===r)break;i.tag===5&&d!==null&&(i=d,o?(u=Gr(t,a),u!=null&&l.unshift(Zr(t,u,i))):o||(u=Gr(t,a),u!=null&&l.push(Zr(t,u,i)))),t=t.return}l.length!==0&&e.push({event:n,listeners:l})}var zm=/\r\n?/g,Rm=/\u0000|\uFFFD/g;function uu(e){return(typeof e=="string"?e:""+e).replace(zm,`
`).replace(Rm,"")}function Ns(e,n,t){if(n=uu(n),uu(e)!==n&&t)throw Error(F(425))}function so(){}var Wa=null,Qa=null;function Ja(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ya=typeof setTimeout=="function"?setTimeout:void 0,Um=typeof clearTimeout=="function"?clearTimeout:void 0,cu=typeof Promise=="function"?Promise:void 0,Vm=typeof queueMicrotask=="function"?queueMicrotask:typeof cu<"u"?function(e){return cu.resolve(null).then(e).catch($m)}:Ya;function $m(e){setTimeout(function(){throw e})}function ua(e,n){var t=n,r=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(r===0){e.removeChild(o),Jr(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=o}while(t);Jr(n)}function tt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function du(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var mr=Math.random().toString(36).slice(2),Ln="__reactFiber$"+mr,qr="__reactProps$"+mr,zn="__reactContainer$"+mr,Ka="__reactEvents$"+mr,Hm="__reactListeners$"+mr,Gm="__reactHandles$"+mr;function yt(e){var n=e[Ln];if(n)return n;for(var t=e.parentNode;t;){if(n=t[zn]||t[Ln]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=du(e);e!==null;){if(t=e[Ln])return t;e=du(e)}return n}e=t,t=e.parentNode}return null}function cs(e){return e=e[Ln]||e[zn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function $t(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(F(33))}function Oo(e){return e[qr]||null}var Xa=[],Ht=-1;function ct(e){return{current:e}}function de(e){0>Ht||(e.current=Xa[Ht],Xa[Ht]=null,Ht--)}function ue(e,n){Ht++,Xa[Ht]=e.current,e.current=n}var it={},_e=ct(it),We=ct(!1),Ct=it;function rr(e,n){var t=e.type.contextTypes;if(!t)return it;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in t)o[a]=n[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function Qe(e){return e=e.childContextTypes,e!=null}function oo(){de(We),de(_e)}function pu(e,n,t){if(_e.current!==it)throw Error(F(168));ue(_e,n),ue(We,t)}function dd(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(F(108,Af(e)||"Unknown",o));return he({},t,r)}function ao(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||it,Ct=_e.current,ue(_e,e),ue(We,We.current),!0}function fu(e,n,t){var r=e.stateNode;if(!r)throw Error(F(169));t?(e=dd(e,n,Ct),r.__reactInternalMemoizedMergedChildContext=e,de(We),de(_e),ue(_e,e)):de(We),ue(We,t)}var In=null,Fo=!1,ca=!1;function pd(e){In===null?In=[e]:In.push(e)}function Wm(e){Fo=!0,pd(e)}function dt(){if(!ca&&In!==null){ca=!0;var e=0,n=oe;try{var t=In;for(oe=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}In=null,Fo=!1}catch(o){throw In!==null&&(In=In.slice(e+1)),Bc(Ml,dt),o}finally{oe=n,ca=!1}}return null}var Gt=[],Wt=0,lo=null,io=0,on=[],an=0,St=null,Mn=1,_n="";function gt(e,n){Gt[Wt++]=io,Gt[Wt++]=lo,lo=e,io=n}function fd(e,n,t){on[an++]=Mn,on[an++]=_n,on[an++]=St,St=e;var r=Mn;e=_n;var o=32-bn(r)-1;r&=~(1<<o),t+=1;var a=32-bn(n)+o;if(30<a){var l=o-o%5;a=(r&(1<<l)-1).toString(32),r>>=l,o-=l,Mn=1<<32-bn(n)+o|t<<o|r,_n=a+e}else Mn=1<<a|t<<o|r,_n=e}function Hl(e){e.return!==null&&(gt(e,1),fd(e,1,0))}function Gl(e){for(;e===lo;)lo=Gt[--Wt],Gt[Wt]=null,io=Gt[--Wt],Gt[Wt]=null;for(;e===St;)St=on[--an],on[an]=null,_n=on[--an],on[an]=null,Mn=on[--an],on[an]=null}var en=null,qe=null,pe=!1,vn=null;function md(e,n){var t=ln(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function mu(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,en=e,qe=tt(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,en=e,qe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=St!==null?{id:Mn,overflow:_n}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=ln(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,en=e,qe=null,!0):!1;default:return!1}}function Za(e){return(e.mode&1)!==0&&(e.flags&128)===0}function qa(e){if(pe){var n=qe;if(n){var t=n;if(!mu(e,n)){if(Za(e))throw Error(F(418));n=tt(t.nextSibling);var r=en;n&&mu(e,n)?md(r,t):(e.flags=e.flags&-4097|2,pe=!1,en=e)}}else{if(Za(e))throw Error(F(418));e.flags=e.flags&-4097|2,pe=!1,en=e}}}function hu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;en=e}function Ls(e){if(e!==en)return!1;if(!pe)return hu(e),pe=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Ja(e.type,e.memoizedProps)),n&&(n=qe)){if(Za(e))throw hd(),Error(F(418));for(;n;)md(e,n),n=tt(n.nextSibling)}if(hu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(F(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){qe=tt(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}qe=null}}else qe=en?tt(e.stateNode.nextSibling):null;return!0}function hd(){for(var e=qe;e;)e=tt(e.nextSibling)}function sr(){qe=en=null,pe=!1}function Wl(e){vn===null?vn=[e]:vn.push(e)}var Qm=Vn.ReactCurrentBatchConfig;function Cr(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(F(309));var r=t.stateNode}if(!r)throw Error(F(147,e));var o=r,a=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===a?n.ref:(n=function(l){var i=o.refs;l===null?delete i[a]:i[a]=l},n._stringRef=a,n)}if(typeof e!="string")throw Error(F(284));if(!t._owner)throw Error(F(290,e))}return e}function Es(e,n){throw e=Object.prototype.toString.call(n),Error(F(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function gu(e){var n=e._init;return n(e._payload)}function gd(e){function n(f,c){if(e){var m=f.deletions;m===null?(f.deletions=[c],f.flags|=16):m.push(c)}}function t(f,c){if(!e)return null;for(;c!==null;)n(f,c),c=c.sibling;return null}function r(f,c){for(f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function o(f,c){return f=at(f,c),f.index=0,f.sibling=null,f}function a(f,c,m){return f.index=m,e?(m=f.alternate,m!==null?(m=m.index,m<c?(f.flags|=2,c):m):(f.flags|=2,c)):(f.flags|=1048576,c)}function l(f){return e&&f.alternate===null&&(f.flags|=2),f}function i(f,c,m,b){return c===null||c.tag!==6?(c=xa(m,f.mode,b),c.return=f,c):(c=o(c,m),c.return=f,c)}function u(f,c,m,b){var L=m.type;return L===zt?h(f,c,m.props.children,b,m.key):c!==null&&(c.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Qn&&gu(L)===c.type)?(b=o(c,m.props),b.ref=Cr(f,c,m),b.return=f,b):(b=Js(m.type,m.key,m.props,null,f.mode,b),b.ref=Cr(f,c,m),b.return=f,b)}function d(f,c,m,b){return c===null||c.tag!==4||c.stateNode.containerInfo!==m.containerInfo||c.stateNode.implementation!==m.implementation?(c=ya(m,f.mode,b),c.return=f,c):(c=o(c,m.children||[]),c.return=f,c)}function h(f,c,m,b,L){return c===null||c.tag!==7?(c=wt(m,f.mode,b,L),c.return=f,c):(c=o(c,m),c.return=f,c)}function g(f,c,m){if(typeof c=="string"&&c!==""||typeof c=="number")return c=xa(""+c,f.mode,m),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case xs:return m=Js(c.type,c.key,c.props,null,f.mode,m),m.ref=Cr(f,null,c),m.return=f,m;case Dt:return c=ya(c,f.mode,m),c.return=f,c;case Qn:var b=c._init;return g(f,b(c._payload),m)}if(Tr(c)||vr(c))return c=wt(c,f.mode,m,null),c.return=f,c;Es(f,c)}return null}function p(f,c,m,b){var L=c!==null?c.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return L!==null?null:i(f,c,""+m,b);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case xs:return m.key===L?u(f,c,m,b):null;case Dt:return m.key===L?d(f,c,m,b):null;case Qn:return L=m._init,p(f,c,L(m._payload),b)}if(Tr(m)||vr(m))return L!==null?null:h(f,c,m,b,null);Es(f,m)}return null}function y(f,c,m,b,L){if(typeof b=="string"&&b!==""||typeof b=="number")return f=f.get(m)||null,i(c,f,""+b,L);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case xs:return f=f.get(b.key===null?m:b.key)||null,u(c,f,b,L);case Dt:return f=f.get(b.key===null?m:b.key)||null,d(c,f,b,L);case Qn:var A=b._init;return y(f,c,m,A(b._payload),L)}if(Tr(b)||vr(b))return f=f.get(m)||null,h(c,f,b,L,null);Es(c,b)}return null}function k(f,c,m,b){for(var L=null,A=null,j=c,C=c=0,B=null;j!==null&&C<m.length;C++){j.index>C?(B=j,j=null):B=j.sibling;var P=p(f,j,m[C],b);if(P===null){j===null&&(j=B);break}e&&j&&P.alternate===null&&n(f,j),c=a(P,c,C),A===null?L=P:A.sibling=P,A=P,j=B}if(C===m.length)return t(f,j),pe&&gt(f,C),L;if(j===null){for(;C<m.length;C++)j=g(f,m[C],b),j!==null&&(c=a(j,c,C),A===null?L=j:A.sibling=j,A=j);return pe&&gt(f,C),L}for(j=r(f,j);C<m.length;C++)B=y(j,f,C,m[C],b),B!==null&&(e&&B.alternate!==null&&j.delete(B.key===null?C:B.key),c=a(B,c,C),A===null?L=B:A.sibling=B,A=B);return e&&j.forEach(function(Y){return n(f,Y)}),pe&&gt(f,C),L}function w(f,c,m,b){var L=vr(m);if(typeof L!="function")throw Error(F(150));if(m=L.call(m),m==null)throw Error(F(151));for(var A=L=null,j=c,C=c=0,B=null,P=m.next();j!==null&&!P.done;C++,P=m.next()){j.index>C?(B=j,j=null):B=j.sibling;var Y=p(f,j,P.value,b);if(Y===null){j===null&&(j=B);break}e&&j&&Y.alternate===null&&n(f,j),c=a(Y,c,C),A===null?L=Y:A.sibling=Y,A=Y,j=B}if(P.done)return t(f,j),pe&&gt(f,C),L;if(j===null){for(;!P.done;C++,P=m.next())P=g(f,P.value,b),P!==null&&(c=a(P,c,C),A===null?L=P:A.sibling=P,A=P);return pe&&gt(f,C),L}for(j=r(f,j);!P.done;C++,P=m.next())P=y(j,f,C,P.value,b),P!==null&&(e&&P.alternate!==null&&j.delete(P.key===null?C:P.key),c=a(P,c,C),A===null?L=P:A.sibling=P,A=P);return e&&j.forEach(function(H){return n(f,H)}),pe&&gt(f,C),L}function T(f,c,m,b){if(typeof m=="object"&&m!==null&&m.type===zt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case xs:e:{for(var L=m.key,A=c;A!==null;){if(A.key===L){if(L=m.type,L===zt){if(A.tag===7){t(f,A.sibling),c=o(A,m.props.children),c.return=f,f=c;break e}}else if(A.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Qn&&gu(L)===A.type){t(f,A.sibling),c=o(A,m.props),c.ref=Cr(f,A,m),c.return=f,f=c;break e}t(f,A);break}else n(f,A);A=A.sibling}m.type===zt?(c=wt(m.props.children,f.mode,b,m.key),c.return=f,f=c):(b=Js(m.type,m.key,m.props,null,f.mode,b),b.ref=Cr(f,c,m),b.return=f,f=b)}return l(f);case Dt:e:{for(A=m.key;c!==null;){if(c.key===A)if(c.tag===4&&c.stateNode.containerInfo===m.containerInfo&&c.stateNode.implementation===m.implementation){t(f,c.sibling),c=o(c,m.children||[]),c.return=f,f=c;break e}else{t(f,c);break}else n(f,c);c=c.sibling}c=ya(m,f.mode,b),c.return=f,f=c}return l(f);case Qn:return A=m._init,T(f,c,A(m._payload),b)}if(Tr(m))return k(f,c,m,b);if(vr(m))return w(f,c,m,b);Es(f,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,c!==null&&c.tag===6?(t(f,c.sibling),c=o(c,m),c.return=f,f=c):(t(f,c),c=xa(m,f.mode,b),c.return=f,f=c),l(f)):t(f,c)}return T}var or=gd(!0),xd=gd(!1),uo=ct(null),co=null,Qt=null,Ql=null;function Jl(){Ql=Qt=co=null}function Yl(e){var n=uo.current;de(uo),e._currentValue=n}function el(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function er(e,n){co=e,Ql=Qt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(Ge=!0),e.firstContext=null)}function cn(e){var n=e._currentValue;if(Ql!==e)if(e={context:e,memoizedValue:n,next:null},Qt===null){if(co===null)throw Error(F(308));Qt=e,co.dependencies={lanes:0,firstContext:e}}else Qt=Qt.next=e;return n}var vt=null;function Kl(e){vt===null?vt=[e]:vt.push(e)}function yd(e,n,t,r){var o=n.interleaved;return o===null?(t.next=t,Kl(n)):(t.next=o.next,o.next=t),n.interleaved=t,Rn(e,r)}function Rn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var Jn=!1;function Xl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function vd(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Bn(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function rt(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,Rn(e,t)}return o=r.interleaved,o===null?(n.next=n,Kl(r)):(n.next=o.next,o.next=n),r.interleaved=n,Rn(e,t)}function Vs(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,_l(e,t)}}function xu(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var o=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?o=a=l:a=a.next=l,t=t.next}while(t!==null);a===null?o=a=n:a=a.next=n}else o=a=n;t={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function po(e,n,t,r){var o=e.updateQueue;Jn=!1;var a=o.firstBaseUpdate,l=o.lastBaseUpdate,i=o.shared.pending;if(i!==null){o.shared.pending=null;var u=i,d=u.next;u.next=null,l===null?a=d:l.next=d,l=u;var h=e.alternate;h!==null&&(h=h.updateQueue,i=h.lastBaseUpdate,i!==l&&(i===null?h.firstBaseUpdate=d:i.next=d,h.lastBaseUpdate=u))}if(a!==null){var g=o.baseState;l=0,h=d=u=null,i=a;do{var p=i.lane,y=i.eventTime;if((r&p)===p){h!==null&&(h=h.next={eventTime:y,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var k=e,w=i;switch(p=n,y=t,w.tag){case 1:if(k=w.payload,typeof k=="function"){g=k.call(y,g,p);break e}g=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=w.payload,p=typeof k=="function"?k.call(y,g,p):k,p==null)break e;g=he({},g,p);break e;case 2:Jn=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,p=o.effects,p===null?o.effects=[i]:p.push(i))}else y={eventTime:y,lane:p,tag:i.tag,payload:i.payload,callback:i.callback,next:null},h===null?(d=h=y,u=g):h=h.next=y,l|=p;if(i=i.next,i===null){if(i=o.shared.pending,i===null)break;p=i,i=p.next,p.next=null,o.lastBaseUpdate=p,o.shared.pending=null}}while(!0);if(h===null&&(u=g),o.baseState=u,o.firstBaseUpdate=d,o.lastBaseUpdate=h,n=o.shared.interleaved,n!==null){o=n;do l|=o.lane,o=o.next;while(o!==n)}else a===null&&(o.shared.lanes=0);Lt|=l,e.lanes=l,e.memoizedState=g}}function yu(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=t,typeof o!="function")throw Error(F(191,o));o.call(r)}}}var ds={},An=ct(ds),es=ct(ds),ns=ct(ds);function bt(e){if(e===ds)throw Error(F(174));return e}function Zl(e,n){switch(ue(ns,n),ue(es,e),ue(An,ds),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Ia(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Ia(n,e)}de(An),ue(An,n)}function ar(){de(An),de(es),de(ns)}function bd(e){bt(ns.current);var n=bt(An.current),t=Ia(n,e.type);n!==t&&(ue(es,e),ue(An,t))}function ql(e){es.current===e&&(de(An),de(es))}var fe=ct(0);function fo(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var da=[];function ei(){for(var e=0;e<da.length;e++)da[e]._workInProgressVersionPrimary=null;da.length=0}var $s=Vn.ReactCurrentDispatcher,pa=Vn.ReactCurrentBatchConfig,Nt=0,me=null,Ce=null,Ne=null,mo=!1,zr=!1,ts=0,Jm=0;function Pe(){throw Error(F(321))}function ni(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!wn(e[t],n[t]))return!1;return!0}function ti(e,n,t,r,o,a){if(Nt=a,me=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,$s.current=e===null||e.memoizedState===null?Zm:qm,e=t(r,o),zr){a=0;do{if(zr=!1,ts=0,25<=a)throw Error(F(301));a+=1,Ne=Ce=null,n.updateQueue=null,$s.current=e0,e=t(r,o)}while(zr)}if($s.current=ho,n=Ce!==null&&Ce.next!==null,Nt=0,Ne=Ce=me=null,mo=!1,n)throw Error(F(300));return e}function ri(){var e=ts!==0;return ts=0,e}function Nn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?me.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function dn(){if(Ce===null){var e=me.alternate;e=e!==null?e.memoizedState:null}else e=Ce.next;var n=Ne===null?me.memoizedState:Ne.next;if(n!==null)Ne=n,Ce=e;else{if(e===null)throw Error(F(310));Ce=e,e={memoizedState:Ce.memoizedState,baseState:Ce.baseState,baseQueue:Ce.baseQueue,queue:Ce.queue,next:null},Ne===null?me.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function rs(e,n){return typeof n=="function"?n(e):n}function fa(e){var n=dn(),t=n.queue;if(t===null)throw Error(F(311));t.lastRenderedReducer=e;var r=Ce,o=r.baseQueue,a=t.pending;if(a!==null){if(o!==null){var l=o.next;o.next=a.next,a.next=l}r.baseQueue=o=a,t.pending=null}if(o!==null){a=o.next,r=r.baseState;var i=l=null,u=null,d=a;do{var h=d.lane;if((Nt&h)===h)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var g={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(i=u=g,l=r):u=u.next=g,me.lanes|=h,Lt|=h}d=d.next}while(d!==null&&d!==a);u===null?l=r:u.next=i,wn(r,n.memoizedState)||(Ge=!0),n.memoizedState=r,n.baseState=l,n.baseQueue=u,t.lastRenderedState=r}if(e=t.interleaved,e!==null){o=e;do a=o.lane,me.lanes|=a,Lt|=a,o=o.next;while(o!==e)}else o===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function ma(e){var n=dn(),t=n.queue;if(t===null)throw Error(F(311));t.lastRenderedReducer=e;var r=t.dispatch,o=t.pending,a=n.memoizedState;if(o!==null){t.pending=null;var l=o=o.next;do a=e(a,l.action),l=l.next;while(l!==o);wn(a,n.memoizedState)||(Ge=!0),n.memoizedState=a,n.baseQueue===null&&(n.baseState=a),t.lastRenderedState=a}return[a,r]}function kd(){}function wd(e,n){var t=me,r=dn(),o=n(),a=!wn(r.memoizedState,o);if(a&&(r.memoizedState=o,Ge=!0),r=r.queue,si(Sd.bind(null,t,r,e),[e]),r.getSnapshot!==n||a||Ne!==null&&Ne.memoizedState.tag&1){if(t.flags|=2048,ss(9,Cd.bind(null,t,r,o,n),void 0,null),Le===null)throw Error(F(349));Nt&30||jd(t,n,o)}return o}function jd(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=me.updateQueue,n===null?(n={lastEffect:null,stores:null},me.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Cd(e,n,t,r){n.value=t,n.getSnapshot=r,Nd(n)&&Ld(e)}function Sd(e,n,t){return t(function(){Nd(n)&&Ld(e)})}function Nd(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!wn(e,t)}catch{return!0}}function Ld(e){var n=Rn(e,1);n!==null&&kn(n,e,1,-1)}function vu(e){var n=Nn();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:e},n.queue=e,e=e.dispatch=Xm.bind(null,me,e),[n.memoizedState,e]}function ss(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=me.updateQueue,n===null?(n={lastEffect:null,stores:null},me.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Ed(){return dn().memoizedState}function Hs(e,n,t,r){var o=Nn();me.flags|=e,o.memoizedState=ss(1|n,t,void 0,r===void 0?null:r)}function Po(e,n,t,r){var o=dn();r=r===void 0?null:r;var a=void 0;if(Ce!==null){var l=Ce.memoizedState;if(a=l.destroy,r!==null&&ni(r,l.deps)){o.memoizedState=ss(n,t,a,r);return}}me.flags|=e,o.memoizedState=ss(1|n,t,a,r)}function bu(e,n){return Hs(8390656,8,e,n)}function si(e,n){return Po(2048,8,e,n)}function Ad(e,n){return Po(4,2,e,n)}function Td(e,n){return Po(4,4,e,n)}function Od(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Fd(e,n,t){return t=t!=null?t.concat([e]):null,Po(4,4,Od.bind(null,n,e),t)}function oi(){}function Pd(e,n){var t=dn();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ni(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Id(e,n){var t=dn();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ni(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Md(e,n,t){return Nt&21?(wn(t,n)||(t=Rc(),me.lanes|=t,Lt|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,Ge=!0),e.memoizedState=t)}function Ym(e,n){var t=oe;oe=t!==0&&4>t?t:4,e(!0);var r=pa.transition;pa.transition={};try{e(!1),n()}finally{oe=t,pa.transition=r}}function _d(){return dn().memoizedState}function Km(e,n,t){var r=ot(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Bd(e))Dd(n,t);else if(t=yd(e,n,t,r),t!==null){var o=Ue();kn(t,e,r,o),zd(t,n,r)}}function Xm(e,n,t){var r=ot(e),o={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Bd(e))Dd(n,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=n.lastRenderedReducer,a!==null))try{var l=n.lastRenderedState,i=a(l,t);if(o.hasEagerState=!0,o.eagerState=i,wn(i,l)){var u=n.interleaved;u===null?(o.next=o,Kl(n)):(o.next=u.next,u.next=o),n.interleaved=o;return}}catch{}finally{}t=yd(e,n,o,r),t!==null&&(o=Ue(),kn(t,e,r,o),zd(t,n,r))}}function Bd(e){var n=e.alternate;return e===me||n!==null&&n===me}function Dd(e,n){zr=mo=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function zd(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,_l(e,t)}}var ho={readContext:cn,useCallback:Pe,useContext:Pe,useEffect:Pe,useImperativeHandle:Pe,useInsertionEffect:Pe,useLayoutEffect:Pe,useMemo:Pe,useReducer:Pe,useRef:Pe,useState:Pe,useDebugValue:Pe,useDeferredValue:Pe,useTransition:Pe,useMutableSource:Pe,useSyncExternalStore:Pe,useId:Pe,unstable_isNewReconciler:!1},Zm={readContext:cn,useCallback:function(e,n){return Nn().memoizedState=[e,n===void 0?null:n],e},useContext:cn,useEffect:bu,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Hs(4194308,4,Od.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Hs(4194308,4,e,n)},useInsertionEffect:function(e,n){return Hs(4,2,e,n)},useMemo:function(e,n){var t=Nn();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Nn();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=Km.bind(null,me,e),[r.memoizedState,e]},useRef:function(e){var n=Nn();return e={current:e},n.memoizedState=e},useState:vu,useDebugValue:oi,useDeferredValue:function(e){return Nn().memoizedState=e},useTransition:function(){var e=vu(!1),n=e[0];return e=Ym.bind(null,e[1]),Nn().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=me,o=Nn();if(pe){if(t===void 0)throw Error(F(407));t=t()}else{if(t=n(),Le===null)throw Error(F(349));Nt&30||jd(r,n,t)}o.memoizedState=t;var a={value:t,getSnapshot:n};return o.queue=a,bu(Sd.bind(null,r,a,e),[e]),r.flags|=2048,ss(9,Cd.bind(null,r,a,t,n),void 0,null),t},useId:function(){var e=Nn(),n=Le.identifierPrefix;if(pe){var t=_n,r=Mn;t=(r&~(1<<32-bn(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=ts++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Jm++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},qm={readContext:cn,useCallback:Pd,useContext:cn,useEffect:si,useImperativeHandle:Fd,useInsertionEffect:Ad,useLayoutEffect:Td,useMemo:Id,useReducer:fa,useRef:Ed,useState:function(){return fa(rs)},useDebugValue:oi,useDeferredValue:function(e){var n=dn();return Md(n,Ce.memoizedState,e)},useTransition:function(){var e=fa(rs)[0],n=dn().memoizedState;return[e,n]},useMutableSource:kd,useSyncExternalStore:wd,useId:_d,unstable_isNewReconciler:!1},e0={readContext:cn,useCallback:Pd,useContext:cn,useEffect:si,useImperativeHandle:Fd,useInsertionEffect:Ad,useLayoutEffect:Td,useMemo:Id,useReducer:ma,useRef:Ed,useState:function(){return ma(rs)},useDebugValue:oi,useDeferredValue:function(e){var n=dn();return Ce===null?n.memoizedState=e:Md(n,Ce.memoizedState,e)},useTransition:function(){var e=ma(rs)[0],n=dn().memoizedState;return[e,n]},useMutableSource:kd,useSyncExternalStore:wd,useId:_d,unstable_isNewReconciler:!1};function xn(e,n){if(e&&e.defaultProps){n=he({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function nl(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:he({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Io={isMounted:function(e){return(e=e._reactInternals)?Tt(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=Ue(),o=ot(e),a=Bn(r,o);a.payload=n,t!=null&&(a.callback=t),n=rt(e,a,o),n!==null&&(kn(n,e,o,r),Vs(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=Ue(),o=ot(e),a=Bn(r,o);a.tag=1,a.payload=n,t!=null&&(a.callback=t),n=rt(e,a,o),n!==null&&(kn(n,e,o,r),Vs(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=Ue(),r=ot(e),o=Bn(t,r);o.tag=2,n!=null&&(o.callback=n),n=rt(e,o,r),n!==null&&(kn(n,e,r,t),Vs(n,e,r))}};function ku(e,n,t,r,o,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,l):n.prototype&&n.prototype.isPureReactComponent?!Kr(t,r)||!Kr(o,a):!0}function Rd(e,n,t){var r=!1,o=it,a=n.contextType;return typeof a=="object"&&a!==null?a=cn(a):(o=Qe(n)?Ct:_e.current,r=n.contextTypes,a=(r=r!=null)?rr(e,o):it),n=new n(t,a),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Io,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),n}function wu(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Io.enqueueReplaceState(n,n.state,null)}function tl(e,n,t,r){var o=e.stateNode;o.props=t,o.state=e.memoizedState,o.refs={},Xl(e);var a=n.contextType;typeof a=="object"&&a!==null?o.context=cn(a):(a=Qe(n)?Ct:_e.current,o.context=rr(e,a)),o.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(nl(e,n,a,t),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&Io.enqueueReplaceState(o,o.state,null),po(e,t,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function lr(e,n){try{var t="",r=n;do t+=Ef(r),r=r.return;while(r);var o=t}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:n,stack:o,digest:null}}function ha(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function rl(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var n0=typeof WeakMap=="function"?WeakMap:Map;function Ud(e,n,t){t=Bn(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){xo||(xo=!0,fl=r),rl(e,n)},t}function Vd(e,n,t){t=Bn(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){rl(e,n)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){rl(e,n),typeof r!="function"&&(st===null?st=new Set([this]):st.add(this));var l=n.stack;this.componentDidCatch(n.value,{componentStack:l!==null?l:""})}),t}function ju(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new n0;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(t)||(o.add(t),e=h0.bind(null,e,n,t),n.then(e,e))}function Cu(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Su(e,n,t,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Bn(-1,1),n.tag=2,rt(t,n,1))),t.lanes|=1),e)}var t0=Vn.ReactCurrentOwner,Ge=!1;function ze(e,n,t,r){n.child=e===null?xd(n,null,t,r):or(n,e.child,t,r)}function Nu(e,n,t,r,o){t=t.render;var a=n.ref;return er(n,o),r=ti(e,n,t,r,a,o),t=ri(),e!==null&&!Ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Un(e,n,o)):(pe&&t&&Hl(n),n.flags|=1,ze(e,n,r,o),n.child)}function Lu(e,n,t,r,o){if(e===null){var a=t.type;return typeof a=="function"&&!fi(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=a,$d(e,n,a,r,o)):(e=Js(t.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(a=e.child,!(e.lanes&o)){var l=a.memoizedProps;if(t=t.compare,t=t!==null?t:Kr,t(l,r)&&e.ref===n.ref)return Un(e,n,o)}return n.flags|=1,e=at(a,r),e.ref=n.ref,e.return=n,n.child=e}function $d(e,n,t,r,o){if(e!==null){var a=e.memoizedProps;if(Kr(a,r)&&e.ref===n.ref)if(Ge=!1,n.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&(Ge=!0);else return n.lanes=e.lanes,Un(e,n,o)}return sl(e,n,t,r,o)}function Hd(e,n,t){var r=n.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},ue(Yt,Ze),Ze|=t;else{if(!(t&1073741824))return e=a!==null?a.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,ue(Yt,Ze),Ze|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:t,ue(Yt,Ze),Ze|=r}else a!==null?(r=a.baseLanes|t,n.memoizedState=null):r=t,ue(Yt,Ze),Ze|=r;return ze(e,n,o,t),n.child}function Gd(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function sl(e,n,t,r,o){var a=Qe(t)?Ct:_e.current;return a=rr(n,a),er(n,o),t=ti(e,n,t,r,a,o),r=ri(),e!==null&&!Ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Un(e,n,o)):(pe&&r&&Hl(n),n.flags|=1,ze(e,n,t,o),n.child)}function Eu(e,n,t,r,o){if(Qe(t)){var a=!0;ao(n)}else a=!1;if(er(n,o),n.stateNode===null)Gs(e,n),Rd(n,t,r),tl(n,t,r,o),r=!0;else if(e===null){var l=n.stateNode,i=n.memoizedProps;l.props=i;var u=l.context,d=t.contextType;typeof d=="object"&&d!==null?d=cn(d):(d=Qe(t)?Ct:_e.current,d=rr(n,d));var h=t.getDerivedStateFromProps,g=typeof h=="function"||typeof l.getSnapshotBeforeUpdate=="function";g||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==r||u!==d)&&wu(n,l,r,d),Jn=!1;var p=n.memoizedState;l.state=p,po(n,r,l,o),u=n.memoizedState,i!==r||p!==u||We.current||Jn?(typeof h=="function"&&(nl(n,t,h,r),u=n.memoizedState),(i=Jn||ku(n,t,i,r,p,u,d))?(g||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(n.flags|=4194308)):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),l.props=r,l.state=u,l.context=d,r=i):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{l=n.stateNode,vd(e,n),i=n.memoizedProps,d=n.type===n.elementType?i:xn(n.type,i),l.props=d,g=n.pendingProps,p=l.context,u=t.contextType,typeof u=="object"&&u!==null?u=cn(u):(u=Qe(t)?Ct:_e.current,u=rr(n,u));var y=t.getDerivedStateFromProps;(h=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==g||p!==u)&&wu(n,l,r,u),Jn=!1,p=n.memoizedState,l.state=p,po(n,r,l,o);var k=n.memoizedState;i!==g||p!==k||We.current||Jn?(typeof y=="function"&&(nl(n,t,y,r),k=n.memoizedState),(d=Jn||ku(n,t,d,r,p,k,u)||!1)?(h||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,k,u),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,k,u)),typeof l.componentDidUpdate=="function"&&(n.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=k),l.props=r,l.state=k,l.context=u,r=d):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),r=!1)}return ol(e,n,t,r,a,o)}function ol(e,n,t,r,o,a){Gd(e,n);var l=(n.flags&128)!==0;if(!r&&!l)return o&&fu(n,t,!1),Un(e,n,a);r=n.stateNode,t0.current=n;var i=l&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&l?(n.child=or(n,e.child,null,a),n.child=or(n,null,i,a)):ze(e,n,i,a),n.memoizedState=r.state,o&&fu(n,t,!0),n.child}function Wd(e){var n=e.stateNode;n.pendingContext?pu(e,n.pendingContext,n.pendingContext!==n.context):n.context&&pu(e,n.context,!1),Zl(e,n.containerInfo)}function Au(e,n,t,r,o){return sr(),Wl(o),n.flags|=256,ze(e,n,t,r),n.child}var al={dehydrated:null,treeContext:null,retryLane:0};function ll(e){return{baseLanes:e,cachePool:null,transitions:null}}function Qd(e,n,t){var r=n.pendingProps,o=fe.current,a=!1,l=(n.flags&128)!==0,i;if((i=l)||(i=e!==null&&e.memoizedState===null?!1:(o&2)!==0),i?(a=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),ue(fe,o&1),e===null)return qa(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(l=r.children,e=r.fallback,a?(r=n.mode,a=n.child,l={mode:"hidden",children:l},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=Bo(l,r,0,null),e=wt(e,r,t,null),a.return=n,e.return=n,a.sibling=e,n.child=a,n.child.memoizedState=ll(t),n.memoizedState=al,e):ai(n,l));if(o=e.memoizedState,o!==null&&(i=o.dehydrated,i!==null))return r0(e,n,l,r,i,o,t);if(a){a=r.fallback,l=n.mode,o=e.child,i=o.sibling;var u={mode:"hidden",children:r.children};return!(l&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=u,n.deletions=null):(r=at(o,u),r.subtreeFlags=o.subtreeFlags&14680064),i!==null?a=at(i,a):(a=wt(a,l,t,null),a.flags|=2),a.return=n,r.return=n,r.sibling=a,n.child=r,r=a,a=n.child,l=e.child.memoizedState,l=l===null?ll(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~t,n.memoizedState=al,r}return a=e.child,e=a.sibling,r=at(a,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function ai(e,n){return n=Bo({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function As(e,n,t,r){return r!==null&&Wl(r),or(n,e.child,null,t),e=ai(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function r0(e,n,t,r,o,a,l){if(t)return n.flags&256?(n.flags&=-257,r=ha(Error(F(422))),As(e,n,l,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(a=r.fallback,o=n.mode,r=Bo({mode:"visible",children:r.children},o,0,null),a=wt(a,o,l,null),a.flags|=2,r.return=n,a.return=n,r.sibling=a,n.child=r,n.mode&1&&or(n,e.child,null,l),n.child.memoizedState=ll(l),n.memoizedState=al,a);if(!(n.mode&1))return As(e,n,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var i=r.dgst;return r=i,a=Error(F(419)),r=ha(a,r,void 0),As(e,n,l,r)}if(i=(l&e.childLanes)!==0,Ge||i){if(r=Le,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,Rn(e,o),kn(r,e,o,-1))}return pi(),r=ha(Error(F(421))),As(e,n,l,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=g0.bind(null,e),o._reactRetry=n,null):(e=a.treeContext,qe=tt(o.nextSibling),en=n,pe=!0,vn=null,e!==null&&(on[an++]=Mn,on[an++]=_n,on[an++]=St,Mn=e.id,_n=e.overflow,St=n),n=ai(n,r.children),n.flags|=4096,n)}function Tu(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),el(e.return,n,t)}function ga(e,n,t,r,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:o}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=t,a.tailMode=o)}function Jd(e,n,t){var r=n.pendingProps,o=r.revealOrder,a=r.tail;if(ze(e,n,r.children,t),r=fe.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Tu(e,t,n);else if(e.tag===19)Tu(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ue(fe,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&fo(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),ga(n,!1,o,t,a);break;case"backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&fo(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}ga(n,!0,t,null,a);break;case"together":ga(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Gs(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Un(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Lt|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(F(153));if(n.child!==null){for(e=n.child,t=at(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=at(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function s0(e,n,t){switch(n.tag){case 3:Wd(n),sr();break;case 5:bd(n);break;case 1:Qe(n.type)&&ao(n);break;case 4:Zl(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;ue(uo,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(ue(fe,fe.current&1),n.flags|=128,null):t&n.child.childLanes?Qd(e,n,t):(ue(fe,fe.current&1),e=Un(e,n,t),e!==null?e.sibling:null);ue(fe,fe.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return Jd(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),ue(fe,fe.current),r)break;return null;case 22:case 23:return n.lanes=0,Hd(e,n,t)}return Un(e,n,t)}var Yd,il,Kd,Xd;Yd=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};il=function(){};Kd=function(e,n,t,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,bt(An.current);var a=null;switch(t){case"input":o=Ta(e,o),r=Ta(e,r),a=[];break;case"select":o=he({},o,{value:void 0}),r=he({},r,{value:void 0}),a=[];break;case"textarea":o=Pa(e,o),r=Pa(e,r),a=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=so)}Ma(t,r);var l;t=null;for(d in o)if(!r.hasOwnProperty(d)&&o.hasOwnProperty(d)&&o[d]!=null)if(d==="style"){var i=o[d];for(l in i)i.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&($r.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var u=r[d];if(i=o!=null?o[d]:void 0,r.hasOwnProperty(d)&&u!==i&&(u!=null||i!=null))if(d==="style")if(i){for(l in i)!i.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in u)u.hasOwnProperty(l)&&i[l]!==u[l]&&(t||(t={}),t[l]=u[l])}else t||(a||(a=[]),a.push(d,t)),t=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,i=i?i.__html:void 0,u!=null&&i!==u&&(a=a||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&($r.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&ce("scroll",e),a||i===u||(a=[])):(a=a||[]).push(d,u))}t&&(a=a||[]).push("style",t);var d=a;(n.updateQueue=d)&&(n.flags|=4)}};Xd=function(e,n,t,r){t!==r&&(n.flags|=4)};function Sr(e,n){if(!pe)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ie(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function o0(e,n,t){var r=n.pendingProps;switch(Gl(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ie(n),null;case 1:return Qe(n.type)&&oo(),Ie(n),null;case 3:return r=n.stateNode,ar(),de(We),de(_e),ei(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ls(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,vn!==null&&(gl(vn),vn=null))),il(e,n),Ie(n),null;case 5:ql(n);var o=bt(ns.current);if(t=n.type,e!==null&&n.stateNode!=null)Kd(e,n,t,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(F(166));return Ie(n),null}if(e=bt(An.current),Ls(n)){r=n.stateNode,t=n.type;var a=n.memoizedProps;switch(r[Ln]=n,r[qr]=a,e=(n.mode&1)!==0,t){case"dialog":ce("cancel",r),ce("close",r);break;case"iframe":case"object":case"embed":ce("load",r);break;case"video":case"audio":for(o=0;o<Fr.length;o++)ce(Fr[o],r);break;case"source":ce("error",r);break;case"img":case"image":case"link":ce("error",r),ce("load",r);break;case"details":ce("toggle",r);break;case"input":zi(r,a),ce("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},ce("invalid",r);break;case"textarea":Ui(r,a),ce("invalid",r)}Ma(t,a),o=null;for(var l in a)if(a.hasOwnProperty(l)){var i=a[l];l==="children"?typeof i=="string"?r.textContent!==i&&(a.suppressHydrationWarning!==!0&&Ns(r.textContent,i,e),o=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(a.suppressHydrationWarning!==!0&&Ns(r.textContent,i,e),o=["children",""+i]):$r.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&ce("scroll",r)}switch(t){case"input":ys(r),Ri(r,a,!0);break;case"textarea":ys(r),Vi(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=so)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Sc(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(t,{is:r.is}):(e=l.createElement(t),t==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,t),e[Ln]=n,e[qr]=r,Yd(e,n,!1,!1),n.stateNode=e;e:{switch(l=_a(t,r),t){case"dialog":ce("cancel",e),ce("close",e),o=r;break;case"iframe":case"object":case"embed":ce("load",e),o=r;break;case"video":case"audio":for(o=0;o<Fr.length;o++)ce(Fr[o],e);o=r;break;case"source":ce("error",e),o=r;break;case"img":case"image":case"link":ce("error",e),ce("load",e),o=r;break;case"details":ce("toggle",e),o=r;break;case"input":zi(e,r),o=Ta(e,r),ce("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=he({},r,{value:void 0}),ce("invalid",e);break;case"textarea":Ui(e,r),o=Pa(e,r),ce("invalid",e);break;default:o=r}Ma(t,o),i=o;for(a in i)if(i.hasOwnProperty(a)){var u=i[a];a==="style"?Ec(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Nc(e,u)):a==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Hr(e,u):typeof u=="number"&&Hr(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&($r.hasOwnProperty(a)?u!=null&&a==="onScroll"&&ce("scroll",e):u!=null&&Tl(e,a,u,l))}switch(t){case"input":ys(e),Ri(e,r,!1);break;case"textarea":ys(e),Vi(e);break;case"option":r.value!=null&&e.setAttribute("value",""+lt(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Kt(e,!!r.multiple,a,!1):r.defaultValue!=null&&Kt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=so)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return Ie(n),null;case 6:if(e&&n.stateNode!=null)Xd(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(F(166));if(t=bt(ns.current),bt(An.current),Ls(n)){if(r=n.stateNode,t=n.memoizedProps,r[Ln]=n,(a=r.nodeValue!==t)&&(e=en,e!==null))switch(e.tag){case 3:Ns(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ns(r.nodeValue,t,(e.mode&1)!==0)}a&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Ln]=n,n.stateNode=r}return Ie(n),null;case 13:if(de(fe),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(pe&&qe!==null&&n.mode&1&&!(n.flags&128))hd(),sr(),n.flags|=98560,a=!1;else if(a=Ls(n),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(F(318));if(a=n.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(F(317));a[Ln]=n}else sr(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;Ie(n),a=!1}else vn!==null&&(gl(vn),vn=null),a=!0;if(!a)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||fe.current&1?Se===0&&(Se=3):pi())),n.updateQueue!==null&&(n.flags|=4),Ie(n),null);case 4:return ar(),il(e,n),e===null&&Xr(n.stateNode.containerInfo),Ie(n),null;case 10:return Yl(n.type._context),Ie(n),null;case 17:return Qe(n.type)&&oo(),Ie(n),null;case 19:if(de(fe),a=n.memoizedState,a===null)return Ie(n),null;if(r=(n.flags&128)!==0,l=a.rendering,l===null)if(r)Sr(a,!1);else{if(Se!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(l=fo(e),l!==null){for(n.flags|=128,Sr(a,!1),r=l.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)a=t,e=r,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return ue(fe,fe.current&1|2),n.child}e=e.sibling}a.tail!==null&&be()>ir&&(n.flags|=128,r=!0,Sr(a,!1),n.lanes=4194304)}else{if(!r)if(e=fo(l),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Sr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!pe)return Ie(n),null}else 2*be()-a.renderingStartTime>ir&&t!==1073741824&&(n.flags|=128,r=!0,Sr(a,!1),n.lanes=4194304);a.isBackwards?(l.sibling=n.child,n.child=l):(t=a.last,t!==null?t.sibling=l:n.child=l,a.last=l)}return a.tail!==null?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=be(),n.sibling=null,t=fe.current,ue(fe,r?t&1|2:t&1),n):(Ie(n),null);case 22:case 23:return di(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?Ze&1073741824&&(Ie(n),n.subtreeFlags&6&&(n.flags|=8192)):Ie(n),null;case 24:return null;case 25:return null}throw Error(F(156,n.tag))}function a0(e,n){switch(Gl(n),n.tag){case 1:return Qe(n.type)&&oo(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ar(),de(We),de(_e),ei(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return ql(n),null;case 13:if(de(fe),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(F(340));sr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return de(fe),null;case 4:return ar(),null;case 10:return Yl(n.type._context),null;case 22:case 23:return di(),null;case 24:return null;default:return null}}var Ts=!1,Me=!1,l0=typeof WeakSet=="function"?WeakSet:Set,z=null;function Jt(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){xe(e,n,r)}else t.current=null}function ul(e,n,t){try{t()}catch(r){xe(e,n,r)}}var Ou=!1;function i0(e,n){if(Wa=no,e=td(),$l(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var l=0,i=-1,u=-1,d=0,h=0,g=e,p=null;n:for(;;){for(var y;g!==t||o!==0&&g.nodeType!==3||(i=l+o),g!==a||r!==0&&g.nodeType!==3||(u=l+r),g.nodeType===3&&(l+=g.nodeValue.length),(y=g.firstChild)!==null;)p=g,g=y;for(;;){if(g===e)break n;if(p===t&&++d===o&&(i=l),p===a&&++h===r&&(u=l),(y=g.nextSibling)!==null)break;g=p,p=g.parentNode}g=y}t=i===-1||u===-1?null:{start:i,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(Qa={focusedElem:e,selectionRange:t},no=!1,z=n;z!==null;)if(n=z,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,z=e;else for(;z!==null;){n=z;try{var k=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var w=k.memoizedProps,T=k.memoizedState,f=n.stateNode,c=f.getSnapshotBeforeUpdate(n.elementType===n.type?w:xn(n.type,w),T);f.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var m=n.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(b){xe(n,n.return,b)}if(e=n.sibling,e!==null){e.return=n.return,z=e;break}z=n.return}return k=Ou,Ou=!1,k}function Rr(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&ul(n,t,a)}o=o.next}while(o!==r)}}function Mo(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function cl(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Zd(e){var n=e.alternate;n!==null&&(e.alternate=null,Zd(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ln],delete n[qr],delete n[Ka],delete n[Hm],delete n[Gm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function qd(e){return e.tag===5||e.tag===3||e.tag===4}function Fu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||qd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function dl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=so));else if(r!==4&&(e=e.child,e!==null))for(dl(e,n,t),e=e.sibling;e!==null;)dl(e,n,t),e=e.sibling}function pl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(pl(e,n,t),e=e.sibling;e!==null;)pl(e,n,t),e=e.sibling}var Ee=null,yn=!1;function Hn(e,n,t){for(t=t.child;t!==null;)ep(e,n,t),t=t.sibling}function ep(e,n,t){if(En&&typeof En.onCommitFiberUnmount=="function")try{En.onCommitFiberUnmount(Lo,t)}catch{}switch(t.tag){case 5:Me||Jt(t,n);case 6:var r=Ee,o=yn;Ee=null,Hn(e,n,t),Ee=r,yn=o,Ee!==null&&(yn?(e=Ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):Ee.removeChild(t.stateNode));break;case 18:Ee!==null&&(yn?(e=Ee,t=t.stateNode,e.nodeType===8?ua(e.parentNode,t):e.nodeType===1&&ua(e,t),Jr(e)):ua(Ee,t.stateNode));break;case 4:r=Ee,o=yn,Ee=t.stateNode.containerInfo,yn=!0,Hn(e,n,t),Ee=r,yn=o;break;case 0:case 11:case 14:case 15:if(!Me&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var a=o,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&ul(t,n,l),o=o.next}while(o!==r)}Hn(e,n,t);break;case 1:if(!Me&&(Jt(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(i){xe(t,n,i)}Hn(e,n,t);break;case 21:Hn(e,n,t);break;case 22:t.mode&1?(Me=(r=Me)||t.memoizedState!==null,Hn(e,n,t),Me=r):Hn(e,n,t);break;default:Hn(e,n,t)}}function Pu(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new l0),n.forEach(function(r){var o=x0.bind(null,e,r);t.has(r)||(t.add(r),r.then(o,o))})}}function gn(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];try{var a=e,l=n,i=l;e:for(;i!==null;){switch(i.tag){case 5:Ee=i.stateNode,yn=!1;break e;case 3:Ee=i.stateNode.containerInfo,yn=!0;break e;case 4:Ee=i.stateNode.containerInfo,yn=!0;break e}i=i.return}if(Ee===null)throw Error(F(160));ep(a,l,o),Ee=null,yn=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(d){xe(o,n,d)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)np(n,e),n=n.sibling}function np(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(gn(n,e),Cn(e),r&4){try{Rr(3,e,e.return),Mo(3,e)}catch(w){xe(e,e.return,w)}try{Rr(5,e,e.return)}catch(w){xe(e,e.return,w)}}break;case 1:gn(n,e),Cn(e),r&512&&t!==null&&Jt(t,t.return);break;case 5:if(gn(n,e),Cn(e),r&512&&t!==null&&Jt(t,t.return),e.flags&32){var o=e.stateNode;try{Hr(o,"")}catch(w){xe(e,e.return,w)}}if(r&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,l=t!==null?t.memoizedProps:a,i=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{i==="input"&&a.type==="radio"&&a.name!=null&&jc(o,a),_a(i,l);var d=_a(i,a);for(l=0;l<u.length;l+=2){var h=u[l],g=u[l+1];h==="style"?Ec(o,g):h==="dangerouslySetInnerHTML"?Nc(o,g):h==="children"?Hr(o,g):Tl(o,h,g,d)}switch(i){case"input":Oa(o,a);break;case"textarea":Cc(o,a);break;case"select":var p=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var y=a.value;y!=null?Kt(o,!!a.multiple,y,!1):p!==!!a.multiple&&(a.defaultValue!=null?Kt(o,!!a.multiple,a.defaultValue,!0):Kt(o,!!a.multiple,a.multiple?[]:"",!1))}o[qr]=a}catch(w){xe(e,e.return,w)}}break;case 6:if(gn(n,e),Cn(e),r&4){if(e.stateNode===null)throw Error(F(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(w){xe(e,e.return,w)}}break;case 3:if(gn(n,e),Cn(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Jr(n.containerInfo)}catch(w){xe(e,e.return,w)}break;case 4:gn(n,e),Cn(e);break;case 13:gn(n,e),Cn(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(ui=be())),r&4&&Pu(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(Me=(d=Me)||h,gn(n,e),Me=d):gn(n,e),Cn(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(z=e,h=e.child;h!==null;){for(g=z=h;z!==null;){switch(p=z,y=p.child,p.tag){case 0:case 11:case 14:case 15:Rr(4,p,p.return);break;case 1:Jt(p,p.return);var k=p.stateNode;if(typeof k.componentWillUnmount=="function"){r=p,t=p.return;try{n=r,k.props=n.memoizedProps,k.state=n.memoizedState,k.componentWillUnmount()}catch(w){xe(r,t,w)}}break;case 5:Jt(p,p.return);break;case 22:if(p.memoizedState!==null){Mu(g);continue}}y!==null?(y.return=p,z=y):Mu(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{o=g.stateNode,d?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(i=g.stateNode,u=g.memoizedProps.style,l=u!=null&&u.hasOwnProperty("display")?u.display:null,i.style.display=Lc("display",l))}catch(w){xe(e,e.return,w)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(w){xe(e,e.return,w)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:gn(n,e),Cn(e),r&4&&Pu(e);break;case 21:break;default:gn(n,e),Cn(e)}}function Cn(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(qd(t)){var r=t;break e}t=t.return}throw Error(F(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Hr(o,""),r.flags&=-33);var a=Fu(e);pl(e,a,o);break;case 3:case 4:var l=r.stateNode.containerInfo,i=Fu(e);dl(e,i,l);break;default:throw Error(F(161))}}catch(u){xe(e,e.return,u)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function u0(e,n,t){z=e,tp(e)}function tp(e,n,t){for(var r=(e.mode&1)!==0;z!==null;){var o=z,a=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||Ts;if(!l){var i=o.alternate,u=i!==null&&i.memoizedState!==null||Me;i=Ts;var d=Me;if(Ts=l,(Me=u)&&!d)for(z=o;z!==null;)l=z,u=l.child,l.tag===22&&l.memoizedState!==null?_u(o):u!==null?(u.return=l,z=u):_u(o);for(;a!==null;)z=a,tp(a),a=a.sibling;z=o,Ts=i,Me=d}Iu(e)}else o.subtreeFlags&8772&&a!==null?(a.return=o,z=a):Iu(e)}}function Iu(e){for(;z!==null;){var n=z;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:Me||Mo(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!Me)if(t===null)r.componentDidMount();else{var o=n.elementType===n.type?t.memoizedProps:xn(n.type,t.memoizedProps);r.componentDidUpdate(o,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=n.updateQueue;a!==null&&yu(n,a,r);break;case 3:var l=n.updateQueue;if(l!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}yu(n,l,t)}break;case 5:var i=n.stateNode;if(t===null&&n.flags&4){t=i;var u=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var d=n.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&Jr(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}Me||n.flags&512&&cl(n)}catch(p){xe(n,n.return,p)}}if(n===e){z=null;break}if(t=n.sibling,t!==null){t.return=n.return,z=t;break}z=n.return}}function Mu(e){for(;z!==null;){var n=z;if(n===e){z=null;break}var t=n.sibling;if(t!==null){t.return=n.return,z=t;break}z=n.return}}function _u(e){for(;z!==null;){var n=z;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Mo(4,n)}catch(u){xe(n,t,u)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(u){xe(n,o,u)}}var a=n.return;try{cl(n)}catch(u){xe(n,a,u)}break;case 5:var l=n.return;try{cl(n)}catch(u){xe(n,l,u)}}}catch(u){xe(n,n.return,u)}if(n===e){z=null;break}var i=n.sibling;if(i!==null){i.return=n.return,z=i;break}z=n.return}}var c0=Math.ceil,go=Vn.ReactCurrentDispatcher,li=Vn.ReactCurrentOwner,un=Vn.ReactCurrentBatchConfig,te=0,Le=null,ke=null,Te=0,Ze=0,Yt=ct(0),Se=0,os=null,Lt=0,_o=0,ii=0,Ur=null,He=null,ui=0,ir=1/0,Pn=null,xo=!1,fl=null,st=null,Os=!1,Zn=null,yo=0,Vr=0,ml=null,Ws=-1,Qs=0;function Ue(){return te&6?be():Ws!==-1?Ws:Ws=be()}function ot(e){return e.mode&1?te&2&&Te!==0?Te&-Te:Qm.transition!==null?(Qs===0&&(Qs=Rc()),Qs):(e=oe,e!==0||(e=window.event,e=e===void 0?16:Qc(e.type)),e):1}function kn(e,n,t,r){if(50<Vr)throw Vr=0,ml=null,Error(F(185));is(e,t,r),(!(te&2)||e!==Le)&&(e===Le&&(!(te&2)&&(_o|=t),Se===4&&Kn(e,Te)),Je(e,r),t===1&&te===0&&!(n.mode&1)&&(ir=be()+500,Fo&&dt()))}function Je(e,n){var t=e.callbackNode;Qf(e,n);var r=eo(e,e===Le?Te:0);if(r===0)t!==null&&Gi(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&Gi(t),n===1)e.tag===0?Wm(Bu.bind(null,e)):pd(Bu.bind(null,e)),Vm(function(){!(te&6)&&dt()}),t=null;else{switch(Uc(r)){case 1:t=Ml;break;case 4:t=Dc;break;case 16:t=qs;break;case 536870912:t=zc;break;default:t=qs}t=cp(t,rp.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function rp(e,n){if(Ws=-1,Qs=0,te&6)throw Error(F(327));var t=e.callbackNode;if(nr()&&e.callbackNode!==t)return null;var r=eo(e,e===Le?Te:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=vo(e,r);else{n=r;var o=te;te|=2;var a=op();(Le!==e||Te!==n)&&(Pn=null,ir=be()+500,kt(e,n));do try{f0();break}catch(i){sp(e,i)}while(!0);Jl(),go.current=a,te=o,ke!==null?n=0:(Le=null,Te=0,n=Se)}if(n!==0){if(n===2&&(o=Ua(e),o!==0&&(r=o,n=hl(e,o))),n===1)throw t=os,kt(e,0),Kn(e,r),Je(e,be()),t;if(n===6)Kn(e,r);else{if(o=e.current.alternate,!(r&30)&&!d0(o)&&(n=vo(e,r),n===2&&(a=Ua(e),a!==0&&(r=a,n=hl(e,a))),n===1))throw t=os,kt(e,0),Kn(e,r),Je(e,be()),t;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(F(345));case 2:xt(e,He,Pn);break;case 3:if(Kn(e,r),(r&130023424)===r&&(n=ui+500-be(),10<n)){if(eo(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){Ue(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Ya(xt.bind(null,e,He,Pn),n);break}xt(e,He,Pn);break;case 4:if(Kn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var l=31-bn(r);a=1<<l,l=n[l],l>o&&(o=l),r&=~a}if(r=o,r=be()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*c0(r/1960))-r,10<r){e.timeoutHandle=Ya(xt.bind(null,e,He,Pn),r);break}xt(e,He,Pn);break;case 5:xt(e,He,Pn);break;default:throw Error(F(329))}}}return Je(e,be()),e.callbackNode===t?rp.bind(null,e):null}function hl(e,n){var t=Ur;return e.current.memoizedState.isDehydrated&&(kt(e,n).flags|=256),e=vo(e,n),e!==2&&(n=He,He=t,n!==null&&gl(n)),e}function gl(e){He===null?He=e:He.push.apply(He,e)}function d0(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var o=t[r],a=o.getSnapshot;o=o.value;try{if(!wn(a(),o))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Kn(e,n){for(n&=~ii,n&=~_o,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-bn(n),r=1<<t;e[t]=-1,n&=~r}}function Bu(e){if(te&6)throw Error(F(327));nr();var n=eo(e,0);if(!(n&1))return Je(e,be()),null;var t=vo(e,n);if(e.tag!==0&&t===2){var r=Ua(e);r!==0&&(n=r,t=hl(e,r))}if(t===1)throw t=os,kt(e,0),Kn(e,n),Je(e,be()),t;if(t===6)throw Error(F(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,xt(e,He,Pn),Je(e,be()),null}function ci(e,n){var t=te;te|=1;try{return e(n)}finally{te=t,te===0&&(ir=be()+500,Fo&&dt())}}function Et(e){Zn!==null&&Zn.tag===0&&!(te&6)&&nr();var n=te;te|=1;var t=un.transition,r=oe;try{if(un.transition=null,oe=1,e)return e()}finally{oe=r,un.transition=t,te=n,!(te&6)&&dt()}}function di(){Ze=Yt.current,de(Yt)}function kt(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Um(t)),ke!==null)for(t=ke.return;t!==null;){var r=t;switch(Gl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&oo();break;case 3:ar(),de(We),de(_e),ei();break;case 5:ql(r);break;case 4:ar();break;case 13:de(fe);break;case 19:de(fe);break;case 10:Yl(r.type._context);break;case 22:case 23:di()}t=t.return}if(Le=e,ke=e=at(e.current,null),Te=Ze=n,Se=0,os=null,ii=_o=Lt=0,He=Ur=null,vt!==null){for(n=0;n<vt.length;n++)if(t=vt[n],r=t.interleaved,r!==null){t.interleaved=null;var o=r.next,a=t.pending;if(a!==null){var l=a.next;a.next=o,r.next=l}t.pending=r}vt=null}return e}function sp(e,n){do{var t=ke;try{if(Jl(),$s.current=ho,mo){for(var r=me.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}mo=!1}if(Nt=0,Ne=Ce=me=null,zr=!1,ts=0,li.current=null,t===null||t.return===null){Se=1,os=n,ke=null;break}e:{var a=e,l=t.return,i=t,u=n;if(n=Te,i.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,h=i,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var y=Cu(l);if(y!==null){y.flags&=-257,Su(y,l,i,a,n),y.mode&1&&ju(a,d,n),n=y,u=d;var k=n.updateQueue;if(k===null){var w=new Set;w.add(u),n.updateQueue=w}else k.add(u);break e}else{if(!(n&1)){ju(a,d,n),pi();break e}u=Error(F(426))}}else if(pe&&i.mode&1){var T=Cu(l);if(T!==null){!(T.flags&65536)&&(T.flags|=256),Su(T,l,i,a,n),Wl(lr(u,i));break e}}a=u=lr(u,i),Se!==4&&(Se=2),Ur===null?Ur=[a]:Ur.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,n&=-n,a.lanes|=n;var f=Ud(a,u,n);xu(a,f);break e;case 1:i=u;var c=a.type,m=a.stateNode;if(!(a.flags&128)&&(typeof c.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(st===null||!st.has(m)))){a.flags|=65536,n&=-n,a.lanes|=n;var b=Vd(a,i,n);xu(a,b);break e}}a=a.return}while(a!==null)}lp(t)}catch(L){n=L,ke===t&&t!==null&&(ke=t=t.return);continue}break}while(!0)}function op(){var e=go.current;return go.current=ho,e===null?ho:e}function pi(){(Se===0||Se===3||Se===2)&&(Se=4),Le===null||!(Lt&268435455)&&!(_o&268435455)||Kn(Le,Te)}function vo(e,n){var t=te;te|=2;var r=op();(Le!==e||Te!==n)&&(Pn=null,kt(e,n));do try{p0();break}catch(o){sp(e,o)}while(!0);if(Jl(),te=t,go.current=r,ke!==null)throw Error(F(261));return Le=null,Te=0,Se}function p0(){for(;ke!==null;)ap(ke)}function f0(){for(;ke!==null&&!Df();)ap(ke)}function ap(e){var n=up(e.alternate,e,Ze);e.memoizedProps=e.pendingProps,n===null?lp(e):ke=n,li.current=null}function lp(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=a0(t,n),t!==null){t.flags&=32767,ke=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Se=6,ke=null;return}}else if(t=o0(t,n,Ze),t!==null){ke=t;return}if(n=n.sibling,n!==null){ke=n;return}ke=n=e}while(n!==null);Se===0&&(Se=5)}function xt(e,n,t){var r=oe,o=un.transition;try{un.transition=null,oe=1,m0(e,n,t,r)}finally{un.transition=o,oe=r}return null}function m0(e,n,t,r){do nr();while(Zn!==null);if(te&6)throw Error(F(327));t=e.finishedWork;var o=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(F(177));e.callbackNode=null,e.callbackPriority=0;var a=t.lanes|t.childLanes;if(Jf(e,a),e===Le&&(ke=Le=null,Te=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Os||(Os=!0,cp(qs,function(){return nr(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=un.transition,un.transition=null;var l=oe;oe=1;var i=te;te|=4,li.current=null,i0(e,t),np(t,e),Im(Qa),no=!!Wa,Qa=Wa=null,e.current=t,u0(t),zf(),te=i,oe=l,un.transition=a}else e.current=t;if(Os&&(Os=!1,Zn=e,yo=o),a=e.pendingLanes,a===0&&(st=null),Vf(t.stateNode),Je(e,be()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)o=n[t],r(o.value,{componentStack:o.stack,digest:o.digest});if(xo)throw xo=!1,e=fl,fl=null,e;return yo&1&&e.tag!==0&&nr(),a=e.pendingLanes,a&1?e===ml?Vr++:(Vr=0,ml=e):Vr=0,dt(),null}function nr(){if(Zn!==null){var e=Uc(yo),n=un.transition,t=oe;try{if(un.transition=null,oe=16>e?16:e,Zn===null)var r=!1;else{if(e=Zn,Zn=null,yo=0,te&6)throw Error(F(331));var o=te;for(te|=4,z=e.current;z!==null;){var a=z,l=a.child;if(z.flags&16){var i=a.deletions;if(i!==null){for(var u=0;u<i.length;u++){var d=i[u];for(z=d;z!==null;){var h=z;switch(h.tag){case 0:case 11:case 15:Rr(8,h,a)}var g=h.child;if(g!==null)g.return=h,z=g;else for(;z!==null;){h=z;var p=h.sibling,y=h.return;if(Zd(h),h===d){z=null;break}if(p!==null){p.return=y,z=p;break}z=y}}}var k=a.alternate;if(k!==null){var w=k.child;if(w!==null){k.child=null;do{var T=w.sibling;w.sibling=null,w=T}while(w!==null)}}z=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,z=l;else e:for(;z!==null;){if(a=z,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Rr(9,a,a.return)}var f=a.sibling;if(f!==null){f.return=a.return,z=f;break e}z=a.return}}var c=e.current;for(z=c;z!==null;){l=z;var m=l.child;if(l.subtreeFlags&2064&&m!==null)m.return=l,z=m;else e:for(l=c;z!==null;){if(i=z,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:Mo(9,i)}}catch(L){xe(i,i.return,L)}if(i===l){z=null;break e}var b=i.sibling;if(b!==null){b.return=i.return,z=b;break e}z=i.return}}if(te=o,dt(),En&&typeof En.onPostCommitFiberRoot=="function")try{En.onPostCommitFiberRoot(Lo,e)}catch{}r=!0}return r}finally{oe=t,un.transition=n}}return!1}function Du(e,n,t){n=lr(t,n),n=Ud(e,n,1),e=rt(e,n,1),n=Ue(),e!==null&&(is(e,1,n),Je(e,n))}function xe(e,n,t){if(e.tag===3)Du(e,e,t);else for(;n!==null;){if(n.tag===3){Du(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(st===null||!st.has(r))){e=lr(t,e),e=Vd(n,e,1),n=rt(n,e,1),e=Ue(),n!==null&&(is(n,1,e),Je(n,e));break}}n=n.return}}function h0(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=Ue(),e.pingedLanes|=e.suspendedLanes&t,Le===e&&(Te&t)===t&&(Se===4||Se===3&&(Te&130023424)===Te&&500>be()-ui?kt(e,0):ii|=t),Je(e,n)}function ip(e,n){n===0&&(e.mode&1?(n=ks,ks<<=1,!(ks&130023424)&&(ks=4194304)):n=1);var t=Ue();e=Rn(e,n),e!==null&&(is(e,n,t),Je(e,t))}function g0(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),ip(e,t)}function x0(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(n),ip(e,t)}var up;up=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||We.current)Ge=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return Ge=!1,s0(e,n,t);Ge=!!(e.flags&131072)}else Ge=!1,pe&&n.flags&1048576&&fd(n,io,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Gs(e,n),e=n.pendingProps;var o=rr(n,_e.current);er(n,t),o=ti(null,n,r,e,o,t);var a=ri();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Qe(r)?(a=!0,ao(n)):a=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Xl(n),o.updater=Io,n.stateNode=o,o._reactInternals=n,tl(n,r,e,t),n=ol(null,n,r,!0,a,t)):(n.tag=0,pe&&a&&Hl(n),ze(null,n,o,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Gs(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=v0(r),e=xn(r,e),o){case 0:n=sl(null,n,r,e,t);break e;case 1:n=Eu(null,n,r,e,t);break e;case 11:n=Nu(null,n,r,e,t);break e;case 14:n=Lu(null,n,r,xn(r.type,e),t);break e}throw Error(F(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:xn(r,o),sl(e,n,r,o,t);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:xn(r,o),Eu(e,n,r,o,t);case 3:e:{if(Wd(n),e===null)throw Error(F(387));r=n.pendingProps,a=n.memoizedState,o=a.element,vd(e,n),po(n,r,null,t);var l=n.memoizedState;if(r=l.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},n.updateQueue.baseState=a,n.memoizedState=a,n.flags&256){o=lr(Error(F(423)),n),n=Au(e,n,r,t,o);break e}else if(r!==o){o=lr(Error(F(424)),n),n=Au(e,n,r,t,o);break e}else for(qe=tt(n.stateNode.containerInfo.firstChild),en=n,pe=!0,vn=null,t=xd(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(sr(),r===o){n=Un(e,n,t);break e}ze(e,n,r,t)}n=n.child}return n;case 5:return bd(n),e===null&&qa(n),r=n.type,o=n.pendingProps,a=e!==null?e.memoizedProps:null,l=o.children,Ja(r,o)?l=null:a!==null&&Ja(r,a)&&(n.flags|=32),Gd(e,n),ze(e,n,l,t),n.child;case 6:return e===null&&qa(n),null;case 13:return Qd(e,n,t);case 4:return Zl(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=or(n,null,r,t):ze(e,n,r,t),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:xn(r,o),Nu(e,n,r,o,t);case 7:return ze(e,n,n.pendingProps,t),n.child;case 8:return ze(e,n,n.pendingProps.children,t),n.child;case 12:return ze(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,a=n.memoizedProps,l=o.value,ue(uo,r._currentValue),r._currentValue=l,a!==null)if(wn(a.value,l)){if(a.children===o.children&&!We.current){n=Un(e,n,t);break e}}else for(a=n.child,a!==null&&(a.return=n);a!==null;){var i=a.dependencies;if(i!==null){l=a.child;for(var u=i.firstContext;u!==null;){if(u.context===r){if(a.tag===1){u=Bn(-1,t&-t),u.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?u.next=u:(u.next=h.next,h.next=u),d.pending=u}}a.lanes|=t,u=a.alternate,u!==null&&(u.lanes|=t),el(a.return,t,n),i.lanes|=t;break}u=u.next}}else if(a.tag===10)l=a.type===n.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(F(341));l.lanes|=t,i=l.alternate,i!==null&&(i.lanes|=t),el(l,t,n),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===n){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}ze(e,n,o.children,t),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,er(n,t),o=cn(o),r=r(o),n.flags|=1,ze(e,n,r,t),n.child;case 14:return r=n.type,o=xn(r,n.pendingProps),o=xn(r.type,o),Lu(e,n,r,o,t);case 15:return $d(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:xn(r,o),Gs(e,n),n.tag=1,Qe(r)?(e=!0,ao(n)):e=!1,er(n,t),Rd(n,r,o),tl(n,r,o,t),ol(null,n,r,!0,e,t);case 19:return Jd(e,n,t);case 22:return Hd(e,n,t)}throw Error(F(156,n.tag))};function cp(e,n){return Bc(e,n)}function y0(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ln(e,n,t,r){return new y0(e,n,t,r)}function fi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function v0(e){if(typeof e=="function")return fi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Fl)return 11;if(e===Pl)return 14}return 2}function at(e,n){var t=e.alternate;return t===null?(t=ln(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Js(e,n,t,r,o,a){var l=2;if(r=e,typeof e=="function")fi(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case zt:return wt(t.children,o,a,n);case Ol:l=8,o|=8;break;case Na:return e=ln(12,t,n,o|2),e.elementType=Na,e.lanes=a,e;case La:return e=ln(13,t,n,o),e.elementType=La,e.lanes=a,e;case Ea:return e=ln(19,t,n,o),e.elementType=Ea,e.lanes=a,e;case bc:return Bo(t,o,a,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case yc:l=10;break e;case vc:l=9;break e;case Fl:l=11;break e;case Pl:l=14;break e;case Qn:l=16,r=null;break e}throw Error(F(130,e==null?e:typeof e,""))}return n=ln(l,t,n,o),n.elementType=e,n.type=r,n.lanes=a,n}function wt(e,n,t,r){return e=ln(7,e,r,n),e.lanes=t,e}function Bo(e,n,t,r){return e=ln(22,e,r,n),e.elementType=bc,e.lanes=t,e.stateNode={isHidden:!1},e}function xa(e,n,t){return e=ln(6,e,null,n),e.lanes=t,e}function ya(e,n,t){return n=ln(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function b0(e,n,t,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Zo(0),this.expirationTimes=Zo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zo(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function mi(e,n,t,r,o,a,l,i,u){return e=new b0(e,n,t,i,u),n===1?(n=1,a===!0&&(n|=8)):n=0,a=ln(3,null,null,n),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Xl(a),e}function k0(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dt,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function dp(e){if(!e)return it;e=e._reactInternals;e:{if(Tt(e)!==e||e.tag!==1)throw Error(F(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Qe(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(F(171))}if(e.tag===1){var t=e.type;if(Qe(t))return dd(e,t,n)}return n}function pp(e,n,t,r,o,a,l,i,u){return e=mi(t,r,!0,e,o,a,l,i,u),e.context=dp(null),t=e.current,r=Ue(),o=ot(t),a=Bn(r,o),a.callback=n??null,rt(t,a,o),e.current.lanes=o,is(e,o,r),Je(e,r),e}function Do(e,n,t,r){var o=n.current,a=Ue(),l=ot(o);return t=dp(t),n.context===null?n.context=t:n.pendingContext=t,n=Bn(a,l),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=rt(o,n,l),e!==null&&(kn(e,o,l,a),Vs(e,o,l)),l}function bo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function zu(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function hi(e,n){zu(e,n),(e=e.alternate)&&zu(e,n)}function w0(){return null}var fp=typeof reportError=="function"?reportError:function(e){console.error(e)};function gi(e){this._internalRoot=e}zo.prototype.render=gi.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(F(409));Do(e,n,null,null)};zo.prototype.unmount=gi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Et(function(){Do(null,e,null,null)}),n[zn]=null}};function zo(e){this._internalRoot=e}zo.prototype.unstable_scheduleHydration=function(e){if(e){var n=Hc();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Yn.length&&n!==0&&n<Yn[t].priority;t++);Yn.splice(t,0,e),t===0&&Wc(e)}};function xi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ro(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ru(){}function j0(e,n,t,r,o){if(o){if(typeof r=="function"){var a=r;r=function(){var d=bo(l);a.call(d)}}var l=pp(n,r,e,0,null,!1,!1,"",Ru);return e._reactRootContainer=l,e[zn]=l.current,Xr(e.nodeType===8?e.parentNode:e),Et(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var i=r;r=function(){var d=bo(u);i.call(d)}}var u=mi(e,0,!1,null,null,!1,!1,"",Ru);return e._reactRootContainer=u,e[zn]=u.current,Xr(e.nodeType===8?e.parentNode:e),Et(function(){Do(n,u,t,r)}),u}function Uo(e,n,t,r,o){var a=t._reactRootContainer;if(a){var l=a;if(typeof o=="function"){var i=o;o=function(){var u=bo(l);i.call(u)}}Do(n,l,e,o)}else l=j0(t,n,e,o,r);return bo(l)}Vc=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Or(n.pendingLanes);t!==0&&(_l(n,t|1),Je(n,be()),!(te&6)&&(ir=be()+500,dt()))}break;case 13:Et(function(){var r=Rn(e,1);if(r!==null){var o=Ue();kn(r,e,1,o)}}),hi(e,1)}};Bl=function(e){if(e.tag===13){var n=Rn(e,134217728);if(n!==null){var t=Ue();kn(n,e,134217728,t)}hi(e,134217728)}};$c=function(e){if(e.tag===13){var n=ot(e),t=Rn(e,n);if(t!==null){var r=Ue();kn(t,e,n,r)}hi(e,n)}};Hc=function(){return oe};Gc=function(e,n){var t=oe;try{return oe=e,n()}finally{oe=t}};Da=function(e,n,t){switch(n){case"input":if(Oa(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var o=Oo(r);if(!o)throw Error(F(90));wc(r),Oa(r,o)}}}break;case"textarea":Cc(e,t);break;case"select":n=t.value,n!=null&&Kt(e,!!t.multiple,n,!1)}};Oc=ci;Fc=Et;var C0={usingClientEntryPoint:!1,Events:[cs,$t,Oo,Ac,Tc,ci]},Nr={findFiberByHostInstance:yt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},S0={bundleType:Nr.bundleType,version:Nr.version,rendererPackageName:Nr.rendererPackageName,rendererConfig:Nr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Vn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Mc(e),e===null?null:e.stateNode},findFiberByHostInstance:Nr.findFiberByHostInstance||w0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fs.isDisabled&&Fs.supportsFiber)try{Lo=Fs.inject(S0),En=Fs}catch{}}tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=C0;tn.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!xi(n))throw Error(F(200));return k0(e,n,null,t)};tn.createRoot=function(e,n){if(!xi(e))throw Error(F(299));var t=!1,r="",o=fp;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=mi(e,1,!1,null,null,t,!1,r,o),e[zn]=n.current,Xr(e.nodeType===8?e.parentNode:e),new gi(n)};tn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(F(188)):(e=Object.keys(e).join(","),Error(F(268,e)));return e=Mc(n),e=e===null?null:e.stateNode,e};tn.flushSync=function(e){return Et(e)};tn.hydrate=function(e,n,t){if(!Ro(n))throw Error(F(200));return Uo(null,e,n,!0,t)};tn.hydrateRoot=function(e,n,t){if(!xi(e))throw Error(F(405));var r=t!=null&&t.hydratedSources||null,o=!1,a="",l=fp;if(t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),n=pp(n,null,e,1,t??null,o,!1,a,l),e[zn]=n.current,Xr(e),r)for(e=0;e<r.length;e++)t=r[e],o=t._getVersion,o=o(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o);return new zo(n)};tn.render=function(e,n,t){if(!Ro(n))throw Error(F(200));return Uo(null,e,n,!1,t)};tn.unmountComponentAtNode=function(e){if(!Ro(e))throw Error(F(40));return e._reactRootContainer?(Et(function(){Uo(null,null,e,!1,function(){e._reactRootContainer=null,e[zn]=null})}),!0):!1};tn.unstable_batchedUpdates=ci;tn.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Ro(t))throw Error(F(200));if(e==null||e._reactInternals===void 0)throw Error(F(38));return Uo(e,n,t,!1,r)};tn.version="18.3.1-next-f1338f8080-20240426";function mp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mp)}catch(e){console.error(e)}}mp(),mc.exports=tn;var hp=mc.exports,gp,Uu=hp;gp=Uu.createRoot,Uu.hydrateRoot;const yi="authToken",xp="authUser",N0="qwertyuiopasdfghjklzxcvbnm123456",yp="1234567890123456";function vp(){return sessionStorage.getItem(yi)}function L0(e,n){sessionStorage.setItem(yi,e),n&&sessionStorage.setItem(xp,JSON.stringify(n)),sessionStorage.setItem("loggedIn","true")}function bp(){sessionStorage.removeItem(yi),sessionStorage.removeItem(xp),sessionStorage.removeItem("loggedIn")}function E0(){return!!vp()}const ko=new TextEncoder,A0=new TextDecoder;let va=null;function kp(){return va||(va=crypto.subtle.importKey("raw",ko.encode(N0),{name:"AES-CBC"},!1,["encrypt","decrypt"])),va}function T0(e){return Array.from(new Uint8Array(e),n=>n.toString(16).padStart(2,"0")).join("")}function O0(e){if(e.length%2)throw new Error("Invalid encrypted payload.");const n=new Uint8Array(e.length/2);for(let t=0;t<n.length;t++)n[t]=parseInt(e.substr(t*2,2),16);return n}async function F0(e){const n=await kp(),t=await crypto.subtle.encrypt({name:"AES-CBC",iv:ko.encode(yp)},n,ko.encode(JSON.stringify(e)));return T0(t)}async function P0(e){const n=await kp(),t=await crypto.subtle.decrypt({name:"AES-CBC",iv:ko.encode(yp)},n,O0(e));return JSON.parse(A0.decode(t))}function wp(){window.location.hash="#/"}function I0(){bp(),sessionStorage.removeItem("boilerType"),wp()}async function jp(e,n,t){const r=new Headers(n.headers||{});let o=n.body;if(typeof o=="string"&&(r.get("Content-Type")||"").includes("application/json")&&(o=JSON.stringify({encryptedData:await F0(JSON.parse(o))})),t){const i=vp();i&&r.set("Authorization",`Bearer ${i}`)}const a=await fetch(e,{...n,headers:r,body:o});if(t&&a.status===401)throw bp(),wp(),new Error("Session expired — redirecting to login.");const l=a.json.bind(a);return a.json=async function(){const i=await l();return i&&typeof i.encryptedData=="string"?P0(i.encryptedData):i},a}function Ye(e,n={}){return jp(e,n,!0)}function M0(e,n={}){return jp(e,n,!1)}function Vu(){const n=(window.location.hash||"#/").replace(/^#/,"")||"/";return n.startsWith("/")?n:"/"+n}function Cp(e){window.location.hash="#"+e}function _0(){const[e,n]=N.useState(Vu());return N.useEffect(()=>{const t=()=>n(Vu());return window.addEventListener("hashchange",t),()=>window.removeEventListener("hashchange",t)},[]),e}function B0({to:e,className:n,children:t,...r}){return s.jsx("a",{href:"#"+e,className:n,...r,children:t})}const D0=`/* Copied verbatim from the <style> block of public/index.html (login page). */
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
`;function Sp(e,n){N.useLayoutEffect(()=>{const t=e.map((r,o)=>{const a=document.createElement("style");return a.setAttribute("data-app-style",n+"-"+o),a.textContent=r,document.head.appendChild(a),a});return()=>t.forEach(r=>r.remove())},[n])}function Np(){const e=N.useRef(null);return N.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,t=e.current,r=t.getContext("2d");let o,a,l,i,u;function d(){i=Math.min(window.devicePixelRatio||1,2),o=window.innerWidth,a=window.innerHeight,t.width=o*i,t.height=a*i,t.style.width=o+"px",t.style.height=a+"px",r.setTransform(i,0,0,i,0,0);const g=Math.max(28,Math.min(70,Math.round(o*a/26e3)));l=Array.from({length:g},()=>({x:Math.random()*o,y:Math.random()*a,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.4+.6}))}function h(){r.clearRect(0,0,o,a);const g=Math.min(150,o/6);for(const p of l)p.x+=p.vx,p.y+=p.vy,(p.x<0||p.x>o)&&(p.vx*=-1),(p.y<0||p.y>a)&&(p.vy*=-1);for(let p=0;p<l.length;p++)for(let y=p+1;y<l.length;y++){const k=l[p],w=l[y],T=k.x-w.x,f=k.y-w.y,c=Math.sqrt(T*T+f*f);c<g&&(r.strokeStyle=`rgba(96,165,250,${.16*(1-c/g)})`,r.lineWidth=1,r.beginPath(),r.moveTo(k.x,k.y),r.lineTo(w.x,w.y),r.stroke())}for(const p of l)r.beginPath(),r.arc(p.x,p.y,p.r,0,Math.PI*2),r.fillStyle="rgba(147,197,253,0.55)",r.fill();n||(u=requestAnimationFrame(h))}return window.addEventListener("resize",d),d(),h(),()=>{window.removeEventListener("resize",d),cancelAnimationFrame(u)}},[]),s.jsx("canvas",{id:"bg-particles",ref:e,style:{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}})}const z0=e=>s.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M3 3v18h18"}),s.jsx("path",{d:"M18 17V9"}),s.jsx("path",{d:"M13 17V5"}),s.jsx("path",{d:"M8 17v-3"})]}),R0=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),s.jsx("polyline",{points:"17 8 12 3 7 8"}),s.jsx("line",{x1:"12",x2:"12",y1:"3",y2:"15"})]}),U0=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),s.jsx("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),s.jsx("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),s.jsx("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]}),ps=e=>s.jsx("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",...e,children:s.jsx("polygon",{points:"5 3 19 12 5 21 5 3"})}),fs=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M3 12a9 9 0 1 0 2.64-6.36"}),s.jsx("path",{d:"M3 4v5h5"})]}),Lp=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"}),s.jsx("path",{d:"M17 21v-8H7v8"}),s.jsx("path",{d:"M7 3v5h8"})]}),wo=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),s.jsx("polyline",{points:"7 10 12 15 17 10"}),s.jsx("line",{x1:"12",x2:"12",y1:"15",y2:"3"})]}),Vo=e=>s.jsxs("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}),s.jsx("path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}),s.jsx("line",{x1:"16",x2:"8",y1:"13",y2:"13"}),s.jsx("line",{x1:"16",x2:"8",y1:"17",y2:"17"}),s.jsx("line",{x1:"10",x2:"8",y1:"9",y2:"9"})]}),V0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),s.jsx("path",{d:"m2 7 10 6 10-6"})]}),$0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),s.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),Ep=e=>s.jsxs("svg",{width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M3 15h18"}),s.jsx("path",{d:"M5 15V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9"}),s.jsx("path",{d:"M8 15v4"}),s.jsx("path",{d:"M16 15v4"}),s.jsx("path",{d:"M9 8h.01"}),s.jsx("path",{d:"M13 8h.01"})]}),H0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.6 20.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a20.6 20.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),s.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}),G0=e=>s.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[s.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"}),s.jsx("circle",{cx:"12",cy:"12",r:"3"})]});function W0(){N.useEffect(()=>{document.title="Boiler Efficiency Calculator"},[]),Sp([D0],"login");const[e,n]=N.useState(""),[t,r]=N.useState(""),[o,a]=N.useState(!1),[l,i]=N.useState(!1),[u,d]=N.useState({text:"Incorrect username or password!",show:!1,n:0}),h=p=>d(y=>({text:p||y.text,show:!0,n:y.n+1})),g=async()=>{if(!e||!t){h("Enter your username and password.");return}i(!0);try{const p=await M0("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})}),y=await p.json();if(!p.ok||!y.ok){h(y.error||"Incorrect username or password!");return}L0(y.token,y.user),Cp("/calculator")}catch{h("Could not reach the server. Please try again.")}finally{i(!1)}};return s.jsxs(s.Fragment,{children:[s.jsx(Np,{}),s.jsxs("div",{className:"screen",onKeyDown:p=>{p.key==="Enter"&&g()},children:[s.jsxs("div",{className:"brand-panel",children:[s.jsx("div",{className:"brand-logo-ring",children:s.jsx("div",{className:"inner",children:s.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})})}),s.jsxs("div",{className:"brand-title",children:["Boiler ",s.jsx("span",{className:"accent",children:"Efficiency"})," Calculator"]}),s.jsx("div",{className:"brand-rule"}),s.jsxs("div",{className:"stat-row",children:[s.jsxs("div",{className:"stat-chip",children:[s.jsx("div",{className:"n",children:"87%"}),s.jsx("div",{className:"l",children:"Boiler Eff."})]}),s.jsxs("div",{className:"stat-chip",children:[s.jsx("div",{className:"n",children:"5.8%"}),s.jsx("div",{className:"l",children:"Dry Gas Loss"})]}),s.jsxs("div",{className:"stat-chip",children:[s.jsx("div",{className:"n",children:"1.2%"}),s.jsx("div",{className:"l",children:"Unburnt C"})]})]})]}),s.jsx("div",{className:"form-panel",children:s.jsxs("div",{className:"login-box",id:"loginBox",children:[s.jsx("div",{className:"login-logo-icon",children:s.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),s.jsx("div",{className:"login-title",children:"Welcome"}),s.jsx("div",{className:"login-sub",children:"Sign in to access the Efficiency Calculator"}),s.jsx("div",{className:"login-divider"}),s.jsx("div",{className:"error-msg"+(u.show?" show":""),id:"errorMsg",children:u.text},u.n),s.jsxs("div",{className:"form-group",children:[s.jsx("span",{className:"icon",children:s.jsx(V0,{})}),s.jsx("input",{type:"text",id:"username",placeholder:"Username",autoComplete:"username",value:e,onChange:p=>n(p.target.value)})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("span",{className:"icon",children:s.jsx($0,{})}),s.jsx("input",{type:o?"text":"password",id:"password",placeholder:"Password",autoComplete:"current-password",value:t,onChange:p=>r(p.target.value)}),s.jsx("button",{type:"button",className:"toggle-eye",id:"toggleEye","aria-label":"Show password",onClick:()=>a(p=>!p),children:o?s.jsx(H0,{}):s.jsx(G0,{})})]}),s.jsx("button",{className:"btn-login",disabled:l,onClick:g,children:"Login"}),s.jsxs("div",{className:"login-footer",children:["Powered by ",s.jsx("b",{children:"ABHITECH EnergyCon Ltd."})]})]})})]})]})}const Q0=`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

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
}`,J0=`/* ════════════════════════════════════════════════════════════════════
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
}`,Y0=`/* ════════════════════════════════════════════════════════════════════
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
}`,K0=`/* Copied verbatim from the injected <style> in public/boiler-gate.js */
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
    `,Ap=N.createContext(()=>{}),hr=()=>N.useContext(Ap);function X0({children:e}){const[n,t]=N.useState({msg:"",type:"success",show:!1}),r=N.useRef(null),o=N.useCallback((a,l="success")=>{t({msg:a,type:l,show:!0}),clearTimeout(r.current),r.current=setTimeout(()=>t(i=>({...i,show:!1})),3200)},[]);return N.useEffect(()=>()=>clearTimeout(r.current),[]),s.jsxs(Ap.Provider,{value:o,children:[e,s.jsx("div",{className:n.show?`toast toast-${n.type} show`:"toast",id:"toast",children:n.msg})]})}const Tp=N.createContext({boilerType:null,setBoilerType:()=>{}}),vi=()=>N.useContext(Tp);function Z0({children:e}){const[n,t]=N.useState(()=>sessionStorage.getItem("boilerType")),r=N.useCallback(o=>{sessionStorage.setItem("boilerType",o),t(o)},[]);return N.useEffect(()=>(document.body.classList.toggle("boiler-locked",!n),()=>document.body.classList.remove("boiler-locked")),[n]),s.jsx(Tp.Provider,{value:{boilerType:n,setBoilerType:r},children:e})}const q0=[{to:"/calculator",label:"CENPEEP"},{to:"/bs-2885",label:"BS-2885"},{to:"/is-13890",label:"IS-13890"},{to:"/asme-ptc-4-1",label:"ASME-PTC 4.1"},{to:"/bee",label:"BEE"},{to:"/summary",label:"Summary"},{to:"/sessions",label:"Sessions"}];function eh({active:e}){const{boilerType:n}=vi();return s.jsx("nav",{className:"navbar",children:s.jsxs("div",{className:"nav-inner",children:[s.jsxs("div",{className:"nav-logo",children:[s.jsx("div",{className:"nav-logo-icon",children:s.jsx("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),s.jsxs("span",{className:"nav-logo-text",children:["Boiler",s.jsx("small",{children:"Efficiency Calculator"})]}),n&&s.jsx("span",{id:"boiler-type-badge",className:"boiler-type-badge",title:"Boiler type selected at login",children:n})]}),s.jsx("div",{className:"nav-links",children:q0.map(t=>s.jsx(B0,{to:t.to,className:"nav-link"+(e===t.to?" active":""),children:t.label},t.to))}),s.jsx("button",{className:"nav-logout",onClick:()=>I0(),children:"Logout"})]})})}const ba=["CFBC","Pulverized Coal","AFBC","Bagasse Fired"];function Ot(){const{boilerType:e}=vi();return s.jsxs("div",{className:"boiler-lock-banner",id:"boiler-lock-banner",style:{display:e?"none":"flex"},children:[s.jsx("div",{className:"boiler-lock-banner-icon",children:s.jsx(Ep,{width:"20",height:"20"})}),s.jsxs("div",{className:"boiler-lock-banner-text",children:[s.jsx("strong",{children:"Boiler type not selected"}),s.jsx("span",{children:"Select your boiler type to unlock uploads and tab switching."})]}),s.jsx("button",{type:"button",className:"btn btn-primary",id:"boiler-select-trigger",onClick:()=>window.dispatchEvent(new CustomEvent("open-boiler-modal")),children:"Select Boiler Type"})]})}function nh(){const{boilerType:e,setBoilerType:n}=vi(),[t,r]=N.useState(!1),[o,a]=N.useState(e&&ba.includes(e)?e:ba[0]);return th(()=>r(!0)),s.jsx("div",{className:"modal-overlay"+(t?" open":""),id:"boilerSelectOverlay",onClick:l=>{l.target===l.currentTarget&&r(!1)},children:s.jsxs("div",{className:"modal boiler-select-modal",children:[s.jsxs("div",{className:"modal-header",children:[s.jsx("h3",{children:"Select Your Boiler Type"}),s.jsx("button",{className:"modal-close",id:"boilerSelectClose","aria-label":"Close",type:"button",onClick:()=>r(!1),children:"×"})]}),s.jsxs("div",{className:"modal-body",children:[s.jsx("div",{className:"boiler-select-icon",children:s.jsx(Ep,{width:"26",height:"26"})}),s.jsx("div",{className:"boiler-select-sub",children:"This helps tailor the calculation to your plant"}),s.jsxs("div",{className:"boiler-select-field",children:[s.jsx("label",{htmlFor:"boilerTypeSelect",children:"Boiler Type"}),s.jsx("div",{className:"select-wrap",children:s.jsx("select",{id:"boilerTypeSelect",value:o,onChange:l=>a(l.target.value),children:ba.map(l=>s.jsx("option",{value:l,children:l},l))})})]}),s.jsx("button",{type:"button",className:"btn btn-primary",id:"boilerSelectOk",onClick:()=>{n(o),r(!1)},children:"OK"})]})]})})}function th(e){N.useEffect(()=>(window.addEventListener("open-boiler-modal",e),()=>window.removeEventListener("open-boiler-modal",e)))}const $u={bs2885:J0,bee:Y0};function Ft({active:e,extraStyle:n,children:t}){return Sp([Q0,...$u[n]?[$u[n]]:[],K0],"app-"+(n||"base")),s.jsx(Z0,{children:s.jsxs(X0,{children:[s.jsx(Np,{}),s.jsx(eh,{active:e}),t,s.jsx(nh,{})]})})}function gr({description:e,onFile:n,status:t,buttonLabel:r="Upload Excel Sheet"}){const o=N.useRef(null);return s.jsxs("div",{className:"upload-banner",id:"upload-banner",children:[s.jsx("div",{className:"upload-banner-icon",children:s.jsx(z0,{})}),s.jsxs("div",{className:"upload-banner-text",children:[s.jsx("strong",{children:"Import from Excel"}),s.jsx("span",{children:e})]}),s.jsxs("div",{className:"upload-banner-actions",children:[s.jsx("input",{type:"file",id:"upload-file-input",accept:".xlsx,.xls,.xlsm",ref:o,onChange:a=>{const l=a.target.files[0];l&&Promise.resolve(n(l)).finally(()=>{o.current&&(o.current.value="")})}}),s.jsxs("button",{className:"btn-upload",onClick:()=>o.current&&o.current.click(),children:[s.jsx(R0,{}),r]}),t&&s.jsx("span",{className:"upload-status "+t.cls,id:"upload-status",style:{display:"inline-block"},children:t.node!==void 0?t.node:t.text})]})]})}const Op={cenpeep_column:"CenPeep layout",raw_tabular:"raw data, averaged",raw_tabular_ml:"raw data + AI field detection",raw_tabular_chunked:"large sheet, chunked",raw_tabular_ml_chunked:"large sheet, chunked + AI field detection",unrecognized:"no fields found"},rh={...Op,generic_row_layout:"labeled-row layout",label_value_layout:"label/value form layout"},Fp=Op;function bi({data:e,populated:n,fieldDetail:t,missingFieldsList:r,strategyLabel:o,derivedLabel:a,bee:l}){const i=e.sheetResults||[],u=e.primarySheet||"",d=i.find(T=>T.sheetName===u),h=d?o[d.strategy]||d.strategy:"",g=Object.entries(t).sort(([,T],[,f])=>(T.label||"").localeCompare(f.label||"")).map(([T,f])=>{const c=typeof f.confidence=="number"?`${Math.round(f.confidence*100)}%`:"—",m=f.source==="ml"?"🤖 AI-detected":f.source==="cenpeep_column"?"CenPeep layout":f.source==="derived_fallback"?a:"exact match",b=f.header?`"${f.header}"`:f.label||T;return s.jsxs("tr",{children:[s.jsx("td",{children:f.label||T}),s.jsx("td",{children:b}),s.jsx("td",{children:m}),s.jsx("td",{children:c})]},T)}),p=r.map(T=>T.label||T.id||T);let y;p.length?y=s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsxs("small",{style:{color:"#f87171"},children:["⚠ Not detected — enter manually: ",p.join(", ")]})]}):!l||n?y=s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("small",{style:{color:"#4ade80"},children:"✓ All required fields detected"})]}):y=s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("small",{style:{color:"#94a3b8"},children:"BEE field detection isn't wired up on the server yet — enter values manually below."})]});const k=e.parseTimeMs?` in ${(e.parseTimeMs/1e3).toFixed(1)}s`:"",w=l?n===1?"":"s":"";return s.jsxs(s.Fragment,{children:[l?n?"✓":"ℹ":"✓"," ",s.jsxs("b",{children:[n," field",l?w:"s"]}),' auto-populated from "',e.filename,'" (',e.fileSizeMB||"?"," MB)",k,s.jsx("br",{}),s.jsxs("small",{style:{color:"#94a3b8"},children:["📄 Selected sheet: ",s.jsx("b",{children:u})," (",h,") — out of ",i.length," sheet(s) scanned"]}),g.length>0&&s.jsxs("table",{style:{width:"100%",fontSize:"12px",borderCollapse:"collapse",marginTop:"4px"},children:[s.jsx("thead",{children:s.jsxs("tr",{style:{color:"#94a3b8",textAlign:"left"},children:[s.jsx("th",{children:"Field"}),s.jsx("th",{children:"Detected From"}),s.jsx("th",{children:"Method"}),s.jsx("th",{children:"Confidence"})]})}),s.jsx("tbody",{children:g})]}),y]})}function sh({anchorEl:e,selected:n,availableDates:t,onSelect:r,onClose:o}){const a=new Set(t||[]),l=n?new Date(n+"T00:00:00"):t&&t.length?new Date(t[t.length-1]+"T00:00:00"):new Date,[i,u]=N.useState({y:l.getFullYear(),m:l.getMonth()}),d=N.useRef(null),[h,g]=N.useState({top:0,left:0});N.useLayoutEffect(()=>{const c=e.getBoundingClientRect();g({top:window.scrollY+c.bottom+6,left:window.scrollX+c.left})},[e]),N.useEffect(()=>{const c=b=>{d.current&&!d.current.contains(b.target)&&b.target!==e&&o()},m=setTimeout(()=>document.addEventListener("mousedown",c),0);return()=>{clearTimeout(m),document.removeEventListener("mousedown",c)}},[e,o]);const p=new Date(i.y,i.m,1),y=p.getDay(),k=new Date(i.y,i.m+1,0).getDate(),w=p.toLocaleString("default",{month:"long"}),T=c=>u(({y:m,m:b})=>{let L=b+c,A=m;return L<0&&(L=11,A--),L>11&&(L=0,A++),{y:A,m:L}}),f=[];for(let c=0;c<y;c++)f.push(s.jsx("span",{className:"dp-cell dp-empty"},"e"+c));for(let c=1;c<=k;c++){const m=`${i.y}-${String(i.m+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,b=a.has(m),L=n===m;f.push(s.jsxs("span",{className:"dp-cell"+(b?" dp-has-data":"")+(L?" dp-selected":""),"data-date":m,onClick:()=>{r(m),o()},children:[c,b&&s.jsx("i",{className:"dp-dot"})]},m))}return hp.createPortal(s.jsxs("div",{className:"date-picker-popup",ref:d,style:{top:h.top+"px",left:h.left+"px"},children:[s.jsxs("div",{className:"dp-head",children:[s.jsx("button",{type:"button",className:"dp-nav",onClick:()=>T(-1),children:"‹"}),s.jsxs("span",{className:"dp-month",children:[w," ",i.y]}),s.jsx("button",{type:"button",className:"dp-nav",onClick:()=>T(1),children:"›"})]}),s.jsxs("div",{className:"dp-grid dp-dow",children:[s.jsx("span",{children:"S"}),s.jsx("span",{children:"M"}),s.jsx("span",{children:"T"}),s.jsx("span",{children:"W"}),s.jsx("span",{children:"T"}),s.jsx("span",{children:"F"}),s.jsx("span",{children:"S"})]}),s.jsx("div",{className:"dp-grid",children:f}),s.jsxs("div",{className:"dp-foot",children:[s.jsxs("span",{className:"dp-legend",children:[s.jsx("i",{className:"dp-dot"})," data available"]}),s.jsx("button",{type:"button",className:"dp-clear",onClick:()=>{r(null),o()},children:"Clear"})]})]}),document.body)}const as=(e,n=4)=>typeof e=="number"&&!isNaN(e)?e.toFixed(n):"—",I=e=>as(e,2),oh=(e,n=4)=>typeof e=="number"&&!isNaN(e)&&isFinite(e)?e.toFixed(n):"—",Re=e=>oh(e,2),ah=(e,n=2)=>typeof e=="number"&&!isNaN(e)?(e>=0?"+":"")+e.toFixed(n):"—";function Ke(e){if(!e)return"—";const n=new Date(e+"T00:00:00");return isNaN(n.getTime())?e:n.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}const mt=(e,n)=>parseFloat(e[n])||0;function xl(e,n,t,r){return(e&&e.datedRows||[]).concat(r||[]).filter(a=>a.date&&(!n||a.date>=n)&&(!t||a.date<=t))}function ki(e,n,t,r=!1){const o=r?Object.values(e&&e.beeOverridesDated||{}).flat():[],a=xl(e,n,t,o),l={},i={};a.forEach(d=>Object.entries(d.values).forEach(([h,g])=>{l[h]=(l[h]||0)+g,i[h]=(i[h]||0)+1}));const u={};return Object.keys(l).forEach(d=>{u[d]=l[d]/i[d]}),{avg:u,rowCount:xl(e,n,t).length}}const Pp="cenpeep_lastUpload";function xr(e,n){try{sessionStorage.setItem(Pp,JSON.stringify({filename:e.filename,primarySheet:e.primarySheet,sheetNameBS2885:e.sheetNameBS2885,extracted:e.extracted||{},extractedBS2885:e.extractedBS2885||{},extractedIS13890:e.extractedIS13890||{},sourceTab:n,savedAt:Date.now()}))}catch{}}function jt(e,n){const t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=n,t.click()}function wi({uploadData:e,processes:n,onAdd:t,onRemove:r,onTitle:o,onDate:a}){const[l,i]=N.useState(null),u=N.useCallback(()=>i(null),[]),d=!!(e&&e.dateFilteringAvailable&&e.availableDates&&e.availableDates.length);let h="Optional — split this file into named date ranges and compare results side by side.";if(d){const p=e.availableDates;h=`Dated data found from ${p[0]} to ${p[p.length-1]} (${p.length} day${p.length===1?"":"s"} with readings) on "${e.primarySheet||""}".`}const g=l?n.find(p=>p.id===l.id):null;return s.jsxs("div",{className:"process-section",id:"process-section",style:{display:d?"":"none"},children:[s.jsxs("div",{className:"process-section-head",children:[s.jsxs("div",{className:"process-section-title",children:[s.jsxs("strong",{children:[s.jsx(U0,{}),"Date-wise Processes"]}),s.jsx("span",{className:"process-section-sub",id:"process-hint",children:h})]}),s.jsx("button",{type:"button",className:"btn btn-secondary",id:"add-process-btn",onClick:t,children:"+ Add Process"})]}),s.jsx("div",{id:"process-list",children:n.length?n.map(p=>{const y=xl(e,p.start,p.end).length;return s.jsxs("div",{className:"process-row","data-id":p.id,children:[s.jsx("input",{type:"text",className:"process-title-input",value:p.title,placeholder:"Process title",onChange:k=>o(p.id,k.target.value)}),s.jsx("button",{type:"button",className:"process-date-btn","data-role":"start",onClick:k=>i({id:p.id,role:"start",el:k.currentTarget}),children:p.start||"Start date"}),s.jsx("span",{className:"process-date-sep",children:"→"}),s.jsx("button",{type:"button",className:"process-date-btn","data-role":"end",onClick:k=>i({id:p.id,role:"end",el:k.currentTarget}),children:p.end||"End date"}),s.jsxs("span",{className:"process-row-count",children:[y," row",y===1?"":"s"," in range"]}),s.jsx("button",{type:"button",className:"process-remove-btn",onClick:()=>r(p.id),title:"Remove process",children:"✕"})]},p.id)}):s.jsx("div",{className:"process-empty",children:"No processes added — Calculate will use the whole file's average, same as today."})}),l&&g&&s.jsx(sh,{anchorEl:l.el,selected:g[l.role],availableDates:e&&e.availableDates||[],onSelect:p=>a(l.id,l.role,p),onClose:u})]})}function ji(){const[e,n]=N.useState([]),[t,r]=N.useState(0);return{processes:e,setProcesses:n,add:()=>{const o=t+1;r(o),n(a=>[...a,{id:"proc"+o,title:`Process ${a.length+1}`,start:null,end:null}])},remove:o=>n(a=>a.filter(l=>l.id!==o)),setTitle:(o,a)=>n(l=>l.map(i=>i.id===o?{...i,title:a}:i)),setDate:(o,a,l)=>n(i=>i.map(u=>u.id===o?{...u,[a]:l}:u))}}function ur({cards:e,open:n,onToggle:t}){return s.jsx("div",{className:"section-cards-grid",children:e.map(r=>s.jsxs("div",{className:"section-card"+(n[r.target]?" open":""),"data-target":r.target,onClick:()=>t(r.target),children:[s.jsx("div",{className:"section-card-icon",children:r.icon}),s.jsxs("div",{className:"section-card-body",children:[s.jsx("div",{className:"section-card-title",children:r.title}),s.jsx("div",{className:"section-card-sub",children:r.sub})]}),s.jsx("span",{className:"section-toggle",children:"▸"})]},r.target))})}function cr({id:e,fields:n,open:t,values:r,derived:o={},onChange:a,detected:l,missing:i}){return s.jsx("div",{className:"input-grid"+(t?"":" is-collapsed"),id:e,children:n.map(u=>{const d=["field-input"];u.formula&&d.push("formula-input"),l.has(u.id)&&d.push("field-detected"),i.has(u.id)&&d.push("field-missing");const h=u.readonly?o[u.id]??"":r[u.id]??"";return s.jsxs("div",{className:"field"+(u.kind?" "+u.kind:""),children:[s.jsxs("div",{className:"field-top",children:[s.jsxs("span",{className:"field-name",children:[u.name,u.tag&&s.jsxs(s.Fragment,{children:[" ",s.jsx("span",{className:u.tag.cls,children:u.tag.text})]})]}),s.jsx("span",{className:"field-sym",children:u.sym})]}),s.jsxs("div",{className:"field-bottom",children:[s.jsx("input",{className:d.join(" "),id:u.id,type:"number",value:h,step:u.step,readOnly:u.readonly,onChange:u.readonly?void 0:g=>a(u.id,g.target.value)}),s.jsx("span",{className:"field-uom",children:u.uom})]})]},u.id)})})}const Ip={cenpeep:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, Design conditions, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, Design conditions, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual/Design inputs."},asme:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual inputs."},bee:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, …) use the same value — whatever's currently in the Input Parameters tab — across every process.",noDate:"No date-based input fields — every process is using the same manual inputs."}},Ae=({cls:e,label:n,children:t,sub:r,style:o})=>s.jsxs("div",{className:"kpi-card "+e,style:o,children:[s.jsx("div",{className:"kpi-label",children:n}),t,r!==void 0&&s.jsx("div",{className:"kpi-sub",children:r})]}),se=({name:e,sym:n,val:t,uom:r})=>s.jsxs("div",{className:"output-row",children:[s.jsx("span",{className:"out-name",children:e}),s.jsx("span",{className:"out-sym",children:n}),s.jsx("span",{className:"out-val",children:I(t)}),s.jsx("span",{className:"out-uom",children:r})]}),dr=({a:e="Parameter",b:n="Symbol",c:t="Value",d:r="UoM"})=>s.jsxs("div",{className:"output-row header-row",children:[s.jsx("span",{children:e}),s.jsx("span",{style:{textAlign:"right"},children:n}),s.jsx("span",{style:{textAlign:"right"},children:t}),s.jsx("span",{style:{textAlign:"right"},children:r})]}),jo=({open:e,onClick:n,children:t})=>s.jsxs("div",{className:"output-section-head collapsible-head"+(e?" open":""),onClick:n,children:[s.jsx("span",{children:t}),s.jsx("span",{className:"collapse-chevron",children:e?"▾":"▸"})]});function Ci({p1:e,p2:n,eff1:t,eff2:r,suffix:o=""}){const a=r-t;return s.jsxs("div",{className:"kpi-card "+(a>=0?"kpi-green":"kpi-red"),children:[s.jsx("div",{className:"kpi-label",children:"Delta Difference"}),s.jsxs("div",{className:"kpi-value",children:[ah(a),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[n.title," − ",e.title," (Boiler Eff.",o,")"]})]})}function Si({list:e,perProcessIds:n,labels:t,open:r,onToggle:o,page:a,thBadge:l,flag:i}){const u=Ip[a];return s.jsxs("div",{className:"output-section",children:[s.jsx(jo,{open:r,onClick:o,children:"Process Inputs"}),r&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"cmp-table-wrap",children:s.jsxs("table",{className:"cmp-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"From the dated log — varies per process"}),e.map((d,h)=>s.jsxs("th",{children:[d.title,l&&l(d),s.jsxs("div",{className:"cmp-th-date",children:[Ke(d.start)," → ",Ke(d.end)]})]},h))]})}),s.jsx("tbody",{children:n.length?n.map(d=>s.jsxs("tr",{children:[s.jsx("td",{className:"cmp-metric",children:t[d]||d}),e.map((h,g)=>{const p=h.result.inputs.find(y=>y.id===d);return s.jsxs("td",{children:[as(p?p.value:0,3),i&&i(h,d)]},g)})]},d)):s.jsx("tr",{children:s.jsx("td",{colSpan:e.length+1,children:u.noDate})})})]})}),s.jsx("div",{className:"cmp-note",children:u.inputsNote})]})]})}function Ni({list:e,rows:n,open:t,onToggle:r,page:o,thBadge:a}){return s.jsxs("div",{className:"output-section",children:[s.jsx(jo,{open:t,onClick:r,children:"Process Comparison"}),t&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"cmp-table-wrap",children:s.jsxs("table",{className:"cmp-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{}),e.map((l,i)=>s.jsxs("th",{children:[l.title,a&&a(l)]},i))]})}),s.jsx("tbody",{children:n.map(([l,i])=>s.jsxs("tr",{children:[s.jsx("td",{className:"cmp-metric",children:l}),e.map((u,d)=>s.jsx("td",{children:i(u)},d))]},l))})]})}),s.jsx("div",{className:"cmp-note",children:Ip[o].comparisonNote})]})]})}const _t=({children:e})=>s.jsxs(s.Fragment,{children:[" ",s.jsx("span",{className:"cmp-badge",children:e})]});function lh(e){const n=mt(e,"O2in"),t=mt(e,"O2out"),r=mt(e,"Md"),o=mt(e,"Ad"),a=mt(e,"VMd"),l=mt(e,"FCd"),i=mt(e,"Sd"),u=l/(1-1.1*o/100-r/100),d=100-u,h=u+.9*(d-14),g=d*(7.35/(d+10)-.013),p=2.1-.012*d,y=(a+l)/(d+u),k=h*y,w=g*y,T=p*y,f=r,c=o,m=100-k-i-w-f-T-c;return{CO2in:(19.3-n).toFixed(2),CO2out:(19.3-t).toFixed(2),Cd:I(k),Hd:I(w),Nd:I(T),Od:I(m),Md2:I(f),Ad2:I(c)}}const yl=["L","Ffw","Fin","Cba","Cfa","Pfa","Pba","M","A","VM","FC","GCV","S","O2in","CO2in","COin","O2out","CO2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa","Tref","Md","Ad","VMd","FCd","Cd","Sd","Hd","Md2","Nd","Od","Ad2","GCVd","Trad","Mwvd"],Mp={L:"Unit Load (MW)",Ffw:"Steam Flow (T/hr)",Fin:"Total Coal Flow (T/hr)",Cba:"Unburnt C Bottom Ash (%)",Cfa:"Unburnt C Fly Ash (%)",Pfa:"% Fly Ash",Pba:"% Bottom Ash",M:"Moisture (%)",A:"Ash (%)",VM:"Volatile Matter (%)",FC:"Fixed Carbon (%)",GCV:"GCV (kcal/kg)",S:"Sulfur (%)",O2in:"O2 APH In (%)",CO2in:"CO2 APH In (%)",COin:"CO APH In (ppm)",O2out:"O2 APH Out (%)",CO2out:"CO2 APH Out (%)",COout:"CO APH Out (ppm)",Tgi:"FG Temp APH In (°C)",Tgo:"FG Temp APH Out (°C)",Tpai:"PA Temp In (°C)",Tpao:"PA Temp Out (°C)",Tsai:"SA Temp In (°C)",Tsao:"SA Temp Out (°C)",Fsa:"SA Flow (TPH)",Fpa:"PA Flow (TPH)",Tref:"Ambient Temp (°C)",Md:"Moisture Design (%)",Ad:"Ash Design (%)",VMd:"VM Design (%)",FCd:"FC Design (%)",Cd:"Carbon Design (%)",Sd:"Sulfur Design (%)",Hd:"Hydrogen Design (%)",Md2:"Moisture Design Ultimate (%)",Nd:"Nitrogen Design (%)",Od:"Oxygen Design (%)",Ad2:"Ash Design Ultimate (%)",GCVd:"GCV Design (kcal/kg)",Trad:"Ref Air Temp Design (°C)",Mwvd:"Moisture in Air Design (kg/kg)"},Wn=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function ih(e){const n={...e},t=Wn(n,"O2in"),r=Wn(n,"O2out");n.CO2in=19.3-t,n.CO2out=19.3-r;const o=Wn(n,"Md"),a=Wn(n,"Ad"),l=Wn(n,"VMd"),i=Wn(n,"FCd"),u=Wn(n,"Sd"),d=i/(1-1.1*a/100-o/100),h=100-d,g=d+.9*(h-14),p=h*(7.35/(h+10)-.013),y=2.1-.012*h,k=(l+i)/(h+d);return n.Cd=g*k,n.Hd=p*k,n.Nd=y*k,n.Md2=o,n.Ad2=a,n.Od=100-n.Cd-u-n.Hd-n.Md2-n.Nd-n.Ad2,n}function Bt(e){const n=ih(e),t=It=>Wn(n,It),r=t("M"),o=t("A"),a=t("VM"),l=t("FC"),i=t("GCV"),u=t("S")||.3,d=t("O2in"),h=t("O2out"),g=t("COout");t("COin");const p=t("Tgi"),y=t("Tgo");t("Tpai"),t("Tpao");const k=t("Tsai");t("Tsao"),t("Fsa"),t("Fpa");const w=t("Cba"),T=t("Cfa"),f=t("Pfa")||80,c=t("Pba")||20,m=t("Lrad")||1.09,b=t("Trad")||35,L=30.6,A=.0166,j=g/1e6*100,C=.97*l+.7*(a+.1*o)-r*(.6-.01*r),B=.036*l+.086*(a-.1*o)-.0035*r*r*(1-.02*r),P=2.1-.02*a,Y=100-r-o-C-B-u-P,H=k,_=19.3-d,J=18.5-h,X=100-(h+J+j),q=f/100*T+c/100*w,Z=o/100*q/(100-q),E=(h-d)/(21-h)*.9*100,D=E*.24*(y-H)/(100*.13286)+y,$=(b*(p-D)+p*(D-H))/(p-H),S=$-b,O=(11.6*C+34.8*(B-Y/8)+4.35*u)/100,R=(1+h/(21-h)*100/100)*O,M=(C/100*44/12+P/100+R*77/100+(R-O)*23/100)*.24*S/i*100,Q=9*(B/100)*(584+.45*S)/i*100,G=r/100*(584+.45*S)/i*100,le=R*.01765*.45*S/i*100,ie=J+j>0?j*C/100/(j+J)*5744/i*100:0,ge=(o*c/100*w/(100*(100-w))+o*f/100*T/(100*(100-T)))*8084*100/i,Be=100-(M+Q+G+le+ie+m+ge),sn=(2.66*(C-Z*100)+7.937*B+.996*u-Y)/23.2,pn=1+(h-j/2)/(.2682*X-(h-j)),Tn=sn*pn*A,jn=(C+u/2.67-100*Z)/(12*J),Fe=jn*L*(y-H),On=1.88*(y-25)+2442+4.2*(25-H),Ho=D,pt=t("Cd"),ms=t("Sd"),yr=t("Hd"),Go=t("Od"),Pt=t("Ad2"),fn=t("GCVd"),v=t("Mwvd"),V=t("Md2"),U=2415,W=(_-J)*.9*100/J,ae=(b*(p-y)+p*(y-H))/(p-H),re=(pt+ms/2.67-100*Z)/(12*J)*L*(ae-b)*100/(fn*4.186),De=Math.exp(.225*pt/yr)-Math.exp(.225*C/B),$n=t("VMd")<17?.013*(Pt*i/(o*fn))*De:0,Xe=ge*(Pt*i/(o*fn))+$n,mn=1.88*(ae-25)+2442+4.2*(25-b),ft=mn*V/(fn*4.186),hs=9*yr*mn/(fn*4.186),hn=j*7*U*(pt-100*Z)/3/(J+j)/fn,Wo=(2.66*(pt-Z*100)+7.937*yr+.996*ms-Go)/23.2,Zp=1+(h-j/2)/(.2682*X-(h-j)),Fi=Wo*Zp*v*1.88*(ae-b)*100/(fn*4.186),qp=100-(re+Xe+ft+hs+hn+Fi+m);return{CO2in:_,CO2out:J,COoutp:j,Trai:H,Cash:q,U:Z,N2out:X,Sa:sn,Ea:pn,Ma:Tn,Wd:jn,Sh:Fe,Sw:On,Ldg:M,Luc:ge,Lmf:G,Lhf:Q,Lco:ie,Lma:le,Lrad:m,BoilerEff:Be,AL:E,Tgnl:Ho,Tgc:$,ALd:W,Tgcd:ae,Ldgc:re,Lucc:Xe,Lmfc:ft,Lhfc:hs,Lcoc:hn,Lmac:Fi,BoilerEffCorr:qp,inputs:yl.map(It=>({id:It,label:Mp[It]||It,value:n[It]}))}}const _p=[{target:"grid-general",icon:"GD",title:"General Data",sub:"7 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis — As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters — APH",sub:"15 parameters"},{target:"grid-design-prox",icon:"DP",title:"Design Conditions — Proximate",sub:"4 parameters"},{target:"grid-design-ult",icon:"DU",title:"Design Conditions — Ultimate Analysis",sub:"10 parameters"}],vl={"grid-general":[{id:"L",name:"Unit Load",sym:"L",uom:"MW",kind:"",value:"210",readonly:!1},{id:"Ffw",name:"Steam Flow",sym:"Ffw",uom:"T/hr",kind:"",value:"615",readonly:!1},{id:"Fin",name:"Total Coal Flow",sym:"Fin",uom:"T/hr",kind:"",value:"140",readonly:!1},{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2in",name:"Avg. Flue Gas O₂ — APH In",sym:"O2in",uom:"%",kind:"",value:"3.5",readonly:!1},{id:"CO2in",name:"Avg. Flue Gas CO₂ — APH In",sym:"CO2in",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COin",name:"Avg. Flue Gas CO — APH In",sym:"COin",uom:"ppm",kind:"field-manual",value:"39",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"O2out",name:"Avg. Flue Gas O₂ — APH Out",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1},{id:"CO2out",name:"Avg. Flue Gas CO₂ — APH Out",sym:"CO2out",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COout",name:"Avg. Flue Gas CO — APH Out",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1},{id:"Tgi",name:"Avg. Flue Gas Temp — APH In",sym:"Tgi",uom:"°C",kind:"",value:"350",readonly:!1},{id:"Tgo",name:"Avg. Flue Gas Temp — APH Out",sym:"Tgo",uom:"°C",kind:"",value:"135",readonly:!1},{id:"Tpai",name:"Primary Air to APH Temp In",sym:"Tpai",uom:"°C",kind:"",value:"40",readonly:!1},{id:"Tpao",name:"Primary Air from APH Temp Out",sym:"Tpao",uom:"°C",kind:"",value:"325",readonly:!1},{id:"Tsai",name:"Secondary Air to APH Temp In",sym:"Tsai",uom:"°C",kind:"",value:"34",readonly:!1},{id:"Tsao",name:"Secondary Air from APH Temp Out",sym:"Tsao",uom:"°C",kind:"",value:"325",readonly:!1},{id:"Fsa",name:"Total Secondary Air Flow",sym:"Fsa",uom:"TPH",kind:"",value:"450",readonly:!1},{id:"Fpa",name:"Total Primary Air Flow",sym:"Fpa",uom:"TPH",kind:"",value:"250",readonly:!1},{id:"Tref",name:"Design Ambient / Ref Air Temp",sym:"Tref",uom:"°C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-prox":[{id:"Md",name:"Moisture — Design",sym:"Md",uom:"%",kind:"field-manual",value:"13",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Ad",name:"Ash — Design",sym:"Ad",uom:"%",kind:"field-manual",value:"40",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"VMd",name:"Volatile Matter — Design",sym:"VMd",uom:"%",kind:"field-manual",value:"24",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"FCd",name:"Fixed Carbon — Design",sym:"FCd",uom:"%",kind:"field-manual",value:"23",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-ult":[{id:"Cd",name:"Carbon — Design",sym:"Cd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Sd",name:"Sulfur — Design",sym:"Sd",uom:"%",kind:"field-manual",value:"0.3",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Hd",name:"Hydrogen — Design",sym:"Hd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Md2",name:"Moisture — Design (Ultimate)",sym:"Md2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Nd",name:"Nitrogen — Design",sym:"Nd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Od",name:"Oxygen — Design",sym:"Od",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Ad2",name:"Ash — Design (Ultimate)",sym:"Ad2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"GCVd",name:"GCV — Design",sym:"GCVd",uom:"kcal/kg",kind:"field-manual",value:"3300",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Trad",name:"Ref. Air Temp — Design",sym:"Trad",uom:"°C",kind:"field-manual",value:"38",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Mwvd",name:"Moisture in Air — Design",sym:"Mwvd",uom:"kg/kg",kind:"field-manual",value:"0.013",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},uh=_p.slice(0,3),ch=_p.slice(3),Bp=["grid-general","grid-proximate","grid-plant"],Dp=["grid-design-prox","grid-design-ult"],Li=[...Bp,...Dp].flatMap(e=>vl[e]),dh=Object.fromEntries(Li.map(e=>[e.id,e.value??""])),ph=new Set(Li.filter(e=>!e.readonly).map(e=>e.id)),Hu=["M","A","VM","FC","GCV"],fh={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},ka=[["Date Range",e=>`${Ke(e.start)} → ${Ke(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>I(e.result.BoilerEff)],["Boiler Efficiency Corrected (%)",e=>I(e.result.BoilerEffCorr)],["Dry Gas Loss (%)",e=>I(e.result.Ldg)],["Unburnt Carbon Loss (%)",e=>I(e.result.Luc)],["Moisture Fuel Loss (%)",e=>I(e.result.Lmf)],["Hydrogen Fuel Loss (%)",e=>I(e.result.Lhf)],["CO Loss (%)",e=>as(e.result.Lco)],["Moisture Air Loss (%)",e=>I(e.result.Lma)],["Radiation & Unaccounted Loss (%)",e=>I(e.result.Lrad)],["CO₂ — APH In (%)",e=>I(e.result.CO2in)],["CO₂ — APH Out (%)",e=>I(e.result.CO2out)]],Gu=e=>e.start||e.end||null;function mh(){const e=hr();N.useEffect(()=>{document.title="Boiler Efficiency Calculator — CENPEEP"},[]);const[n,t]=N.useState("input"),[r,o]=N.useState(dh),[a,l]=N.useState(new Set),[i,u]=N.useState(new Set),[d,h]=N.useState({}),[g,p]=N.useState(null),[y,k]=N.useState(null),[w,T]=N.useState(null),f=ji(),[c,m]=N.useState(null),[b,L]=N.useState(null),[A,j]=N.useState(!1),[C,B]=N.useState(null),[P,Y]=N.useState(null),[H,_]=N.useState(!1),[J,X]=N.useState(!1),[q,Z]=N.useState({processInputsOpen:!1,processComparisonOpen:!1}),E=N.useMemo(()=>lh(r),[r]),D=(v,V)=>o(U=>({...U,[v]:V})),$=v=>h(V=>({...V,[v]:!V[v]})),S=(v=C)=>{const V={...r,...E},U={};return yl.forEach(W=>{U[W]=V[W]!==void 0?V[W]:0}),U.Lrad=v!==null?parseFloat(v)||0:1.2,U},O=(v,V)=>ki(y,v,V),K=async v=>{p({cls:"loading",text:"⏳ Parsing all sheets…"});const V=new FormData;V.append("file",v);try{const W=await(await Ye("/api/upload",{method:"POST",body:V})).json();if(!W.ok)throw new Error(W.error||"Upload failed");xr(W,"CENPEEP");const ae=W.extracted||{},ye={...r},we=new Set;let re=0;for(const[Xe,mn]of Object.entries(ae))ph.has(Xe)&&(ye[Xe]=String(typeof mn=="number"?parseFloat(mn.toFixed(6)):mn),we.add(Xe),re++);const De=W.missingFields||[],$n=new Set;for(const Xe of De){const mn=Xe.id||Xe;Li.some(ft=>ft.id===mn)&&$n.add(mn)}o(ye),l(we),u($n),T(W.filename),k(W),f.setProcesses([]),L(null),j(!1),p({cls:"success",node:bi({data:W,populated:re,fieldDetail:W.fieldDetail||{},missingFieldsList:De,strategyLabel:Fp,derivedLabel:"↳ defaulted from Secondary Air",bee:!1})}),e(`Excel imported — ${re} fields auto-populated from "${W.primarySheet||""}"`,"success")}catch(U){p({cls:"error",text:`✗ ${U.message}`}),e(U.message,"error")}},R=()=>{const v=f.processes.filter(W=>W.start||W.end);if(Y(null),_(!1),X(!1),!v.length){j(!1);const W=Bt(S());m(W),B(String(W.Lrad||1.09)),L(null),t("output");return}const V=S(),U=v.map(W=>{const{avg:ae,rowCount:ye}=O(W.start,W.end),we=Bt({...V,...ae});return{title:W.title||"Process",start:W.start,end:W.end,rowCount:ye,result:we}});L(U),j(!0),m(U[0].result),B(null),t("output")},x=v=>{if(B(v),!c)return;const V=parseFloat(v)||0,U=c;m({...U,Lrad:V,BoilerEff:100-(U.Ldg+U.Luc+U.Lmf+U.Lhf+U.Lco+U.Lma+V)})},M=()=>{if(!c){e("Calculate first.","error");return}const v=Bt(S());m(v),B(String(v.Lrad||1.09)),X(!0),e("APH correction recalculated using the current Design Conditions parameters.","success")},Q=()=>{P&&(L(v=>v.map((V,U)=>U===P.targetIdx?{...V,result:V._originalResult,_originalResult:void 0,gcvCorrected:!1}:V)),Y(null),e("GCV correction removed.","success"))},G=()=>{const v=b;if(!A||!v||v.length!==2){e("GCV correction needs exactly two active processes.","error");return}if(P){Q();return}const[V,U]=v,W=Gu(V),ae=Gu(U);if(!W||!ae){e("Both processes need at least one date set to apply GCV correction.","error");return}if(W===ae){e("Both processes resolve to the same date — cannot tell which is later.","error");return}const ye=ae>W?1:0,we=ae>W?0:1,re=v[ye],De=v[we],$n=S(),{avg:Xe}=O(De.start,De.end),{avg:mn}=O(re.start,re.end),ft={...$n,...mn};Hu.forEach(hn=>{ft[hn]=Xe[hn]!==void 0?Xe[hn]:$n[hn]});const hs=v.map((hn,Wo)=>Wo===ye?{...hn,_originalResult:hn.result,result:Bt(ft),gcvCorrected:!0}:{...hn,result:Bt({...$n,...Xe})});L(hs),Y({targetIdx:ye,sourceIdx:we,targetTitle:re.title,sourceTitle:De.title}),e(`GCV correction applied — "${re.title}" now uses "${De.title}"'s Proximate As-Fired data.`,"success")},le=()=>{if(!A||!b||b.length!==2){e("APH correction needs exactly two active processes.","error");return}const v=!H;_(v),e(v?"APH correction applied — Boiler Efficiency now shows the APH-corrected value for both processes.":"APH correction removed.","success")},ie=()=>{o(v=>{const V={...v};return Object.entries(fh).forEach(([U,W])=>{U in V&&(V[U]=String(W))}),V}),T(null),k(null),f.setProcesses([]),j(!1),Y(null),_(!1),X(!1),Z({processInputsOpen:!1,processComparisonOpen:!1}),p(null)},ge=async(v,V)=>{const U={sessionName:V,sourceFile:w||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:v.inputs,results:{BoilerEff:v.BoilerEff,BoilerEffCorr:v.BoilerEffCorr,Ldg:v.Ldg,Luc:v.Luc,Lmf:v.Lmf,Lhf:v.Lhf,Lco:v.Lco,Lma:v.Lma,Lrad:v.Lrad,CO2in:v.CO2in,CO2out:v.CO2out,Trai:v.Trai,AL:v.AL,Tgc:v.Tgc,Ldgc:v.Ldgc,Lucc:v.Lucc,Lmfc:v.Lmfc,Lhfc:v.Lhfc,Lcoc:v.Lcoc,Lmac:v.Lmac}},ae=await(await Ye("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(U)})).json();if(!ae.ok)throw new Error(ae.error)},Be=async()=>{if(A&&b&&b.length){if(!window.confirm(`Save all ${b.length} process result(s) to the database?`))return;try{for(const V of b)await ge(V.result,`${w||"Manual Entry"} — ${V.title}`);e("✓ All process results saved to MongoDB!","success")}catch(V){e("Save failed: "+V.message,"error")}return}if(!c){e("Calculate first before saving.","error");return}const v=window.prompt("Session name (optional):",w||"");if(v!==null)try{await ge(c,v.trim()),e("✓ Session saved to MongoDB!","success")}catch(V){e("Save failed: "+V.message,"error")}},sn=()=>new Date().toISOString().slice(0,19).replace("T"," "),pn=()=>{const v=b,V=sn();let U=`CENPEEP Boiler Efficiency — Process Comparison
Generated:,${V}

`;U+="Metric,"+v.map(W=>`"${W.title}"`).join(",")+`
`,ka.forEach(([W,ae])=>{U+=`"${W}",`+v.map(ye=>`"${ae(ye)}"`).join(",")+`
`}),jt(new Blob([U],{type:"text/csv"}),`cenpeep_comparison_${V.replace(/[: ]/g,"_")}.csv`)},Tn=()=>{if(A&&b&&b.length){pn();return}if(!c){e("Calculate first.","error");return}const v=c,V=sn();let U=`CENPEEP Boiler Efficiency Report
Generated:,${V}

INPUTS
Parameter,Value
`;v.inputs.forEach(W=>{U+=`"${W.label}",${W.value}
`}),U+=`
OUTPUTS
Parameter,Symbol,Value,UoM
`,[["CO₂ APH In","CO2in",v.CO2in,"%"],["CO₂ APH Out","CO2out",v.CO2out,"%"],["Weighted Air Temp In","Trai",v.Trai,"°C"],["Dry Gas Loss","Ldg",v.Ldg,"%"],["Unburnt Carbon Loss","Luc",v.Luc,"%"],["Moisture Fuel Loss","Lmf",v.Lmf,"%"],["Hydrogen Fuel Loss","Lhf",v.Lhf,"%"],["CO Loss","Lco",v.Lco,"%"],["Moisture Air Loss","Lma",v.Lma,"%"],["Radiation Loss","Lrad",v.Lrad,"%"],["Boiler Efficiency","eta",v.BoilerEff,"%"],["Boiler Efficiency Corrected","eta_corr",v.BoilerEffCorr,"%"]].forEach(([W,ae,ye,we])=>{U+=`"${W}","${ae}",${typeof ye=="number"?ye.toFixed(4):""},,"${we}"
`}),jt(new Blob([U],{type:"text/csv"}),`cenpeep_report_${V.replace(/[: ]/g,"_")}.csv`)},jn="body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}.meta{color:#666;font-size:11px;margin-bottom:16px}",Fe=()=>{const v=b,V=new Date().toLocaleString(),U=window.open("","_blank");U.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Comparison Report</title>
  <style>${jn}</style></head><body>
  <h1>CENPEEP Boiler Efficiency — Process Comparison</h1><p class="meta">Generated: ${V}</p>
  <table><tr><th>Metric</th>${v.map(W=>`<th>${W.title}</th>`).join("")}</tr>
  ${ka.map(([W,ae])=>`<tr><td>${W}</td>${v.map(ye=>`<td>${ae(ye)}</td>`).join("")}</tr>`).join("")}
  </table><script>window.print();<\/script></body></html>`),U.document.close()},On=()=>{if(A&&b&&b.length){Fe();return}if(!c){e("Calculate first.","error");return}const v=c,V=new Date().toLocaleString(),U=window.open("","_blank");U.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Report</title>
  <style>${jn}h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}.hl{background:#e6fff5!important;font-weight:bold}</style></head><body>
  <h1>CENPEEP Boiler Efficiency Report</h1><p class="meta">Generated: ${V}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${v.inputs.map(W=>`<tr><td>${W.label}</td><td>${W.value}</td></tr>`).join("")}</table>
  <h2>Losses</h2><table><tr><th>Parameter</th><th>Symbol</th><th>Value</th><th>UoM</th></tr>
  <tr><td>CO₂ APH In</td><td>CO₂in</td><td>${I(v.CO2in)}</td><td>%</td></tr>
  <tr><td>CO₂ APH Out</td><td>CO₂out</td><td>${I(v.CO2out)}</td><td>%</td></tr>
  <tr><td>Dry Gas Loss</td><td>Ldg</td><td>${I(v.Ldg)}</td><td>%</td></tr>
  <tr><td>Unburnt Carbon Loss</td><td>Luc</td><td>${I(v.Luc)}</td><td>%</td></tr>
  <tr><td>Moisture Fuel Loss</td><td>Lmf</td><td>${I(v.Lmf)}</td><td>%</td></tr>
  <tr><td>Hydrogen Fuel Loss</td><td>Lhf</td><td>${I(v.Lhf)}</td><td>%</td></tr>
  <tr><td>CO Loss</td><td>Lco</td><td>${as(v.Lco)}</td><td>%</td></tr>
  <tr><td>Moisture Air Loss</td><td>Lma</td><td>${I(v.Lma)}</td><td>%</td></tr>
  <tr><td>Radiation Loss</td><td>Lrad</td><td>${I(v.Lrad)}</td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td><b>${I(v.BoilerEff)}</b></td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency Corrected</b></td><td>η_corr</td><td><b>${I(v.BoilerEffCorr)}</b></td><td>%</td></tr>
  </table><script>window.print();<\/script></body></html>`),U.document.close()},Ho=async()=>{const v=y;if(!v||!v.fieldDetail||!Object.keys(v.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}const V={filename:v.filename,primarySheet:v.primarySheet,fieldDetail:v.fieldDetail,extracted:v.extracted,missingFields:v.missingFields};A&&b&&b.length&&(V.processes=b.map(U=>{const{avg:W,rowCount:ae}=O(U.start,U.end);return{title:U.title,start:U.start,end:U.end,rowCount:ae,avg:W}}));try{const U=await Ye("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(V)});if(!U.ok){const we=await U.json().catch(()=>({}));throw new Error(we.error||`Report generation failed (${U.status})`)}const W=await U.blob(),ye=(U.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt(W,ye?ye[1]:"CENPEEP_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(U){e("Report failed: "+U.message,"error")}},pt=v=>Z(V=>({...V,[v]:!V[v]})),ms=v=>s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),s.jsxs("div",{className:"kpi-value boiler-eff-val",children:[I(v.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Indirect method — as-tested"})]}),s.jsxs("div",{className:"kpi-card kpi-blue",children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency Corrected"}),s.jsxs("div",{className:"kpi-value boiler-eff-corr-val",children:[I(v.BoilerEffCorr),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Corrected to design conditions"}),J&&s.jsx("div",{className:"kpi-note",children:"Please check the input parameters if you feel any issue in the corrected efficiency figure."})]}),s.jsx(Ae,{cls:"kpi-red",label:"Dry Gas Loss",children:s.jsxs("div",{className:"kpi-value",children:[I(v.Ldg),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-amber",label:"Loss — Unburnt Carbon",children:s.jsxs("div",{className:"kpi-value",children:[I(v.Luc),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-blue",label:"Loss — Moisture in Fuel",children:s.jsxs("div",{className:"kpi-value",children:[I(v.Lmf),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-green",label:"Loss — Hydrogen in Fuel",children:s.jsxs("div",{className:"kpi-value",children:[I(v.Lhf),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-amber",label:"Loss — Carbon Monoxide",children:s.jsxs("div",{className:"kpi-value",children:[as(v.Lco),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-blue",label:"Loss — Moisture in Air",children:s.jsxs("div",{className:"kpi-value",children:[I(v.Lma),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsxs("div",{className:"kpi-card kpi-red",style:{gridColumn:"span 2"},children:[s.jsx("div",{className:"kpi-label",children:"Radiation & Unaccounted Loss"}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[s.jsx("input",{type:"number",id:"Lrad",value:C??"",onChange:V=>x(V.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),s.jsx("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),s.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(J?" applied":""),onClick:M,children:[s.jsxs("div",{className:"kpi-label",children:["APH Correction",J&&s.jsx(_t,{children:"Applied"})]}),s.jsx("div",{className:"kpi-value kpi-action-value",children:J?"Recalculate Again":"Apply APH Correction"}),s.jsx("div",{className:"kpi-sub",children:"Uses the Design Conditions (APH Correction) tab"})]})]}),yr=v=>s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Corrected Losses"})}),s.jsx(dr,{}),s.jsx(se,{name:"Dry Gas Loss (Corrected)",sym:"Ldgc",val:v.Ldgc,uom:"%"}),s.jsx(se,{name:"Unburnt Carbon Loss (Corrected)",sym:"Lucc",val:v.Lucc,uom:"%"}),s.jsx(se,{name:"Moisture Fuel Loss (Corrected)",sym:"Lmfc",val:v.Lmfc,uom:"%"}),s.jsx(se,{name:"Hydrogen Fuel Loss (Corrected)",sym:"Lhfc",val:v.Lhfc,uom:"%"}),s.jsx(se,{name:"CO Loss (Corrected)",sym:"Lcoc",val:v.Lcoc,uom:"%"}),s.jsx(se,{name:"Moisture Air Loss (Corrected)",sym:"Lmac",val:v.Lmac,uom:"%"}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Boiler Efficiency — Corrected"}),s.jsxs("span",{className:"out-sym",children:["η",s.jsx("sub",{children:"corr"})]}),s.jsx("span",{className:"out-val",children:I(v.BoilerEffCorr)}),s.jsx("span",{className:"out-uom",children:"%"})]})]}),s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Intermediate Values"})}),s.jsx(dr,{}),s.jsx(se,{name:"CO₂ — APH In",sym:"CO₂in",val:v.CO2in,uom:"%"}),s.jsx(se,{name:"CO₂ — APH Out",sym:"CO₂out",val:v.CO2out,uom:"%"}),s.jsx(se,{name:"Weighted Air Temp In",sym:"Trai",val:v.Trai,uom:"°C"}),s.jsx(se,{name:"AH Leakage",sym:"AL",val:v.AL,uom:"%"}),s.jsx(se,{name:"Gas Temp — Corrected",sym:"Tgc",val:v.Tgc,uom:"°C"}),s.jsx(se,{name:"Stoichiometric Air",sym:"Sa",val:v.Sa,uom:"kg/kg"}),s.jsx(se,{name:"Excess Air",sym:"Ea",val:v.Ea,uom:"—"})]})]}),Go=v=>{const V=H,U=re=>V?re.result.BoilerEffCorr:re.result.BoilerEff,W=re=>re.gcvCorrected?s.jsx(_t,{children:"GCV corrected"}):null,ae=new Set;v.forEach(re=>Object.keys(O(re.start,re.end).avg).forEach(De=>ae.add(De)));const ye=yl.filter(re=>ae.has(re)),we=P;return{kpis:s.jsxs(s.Fragment,{children:[v.map((re,De)=>s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsxs("div",{className:"kpi-label",children:[re.title,re.gcvCorrected&&s.jsx(_t,{children:"GCV corrected"}),V&&s.jsx(_t,{children:"APH corrected"})]}),s.jsxs("div",{className:"kpi-value",children:[I(U(re)),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[Ke(re.start)," → ",Ke(re.end)," · ",re.rowCount," row",re.rowCount===1?"":"s"]})]},De)),v.length===2&&s.jsxs(s.Fragment,{children:[s.jsx(Ci,{p1:v[0],p2:v[1],eff1:U(v[0]),eff2:U(v[1]),suffix:V?" APH corr.":""}),s.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(we?" applied":""),onClick:G,children:[s.jsxs("div",{className:"kpi-label",children:["GCV Correction",we&&s.jsx(_t,{children:"Applied"})]}),s.jsx("div",{className:"kpi-value kpi-action-value",children:we?"Click to undo":"Apply GCV Correction"})]}),s.jsxs("button",{type:"button",className:"kpi-card kpi-action"+(V?" applied":""),onClick:le,children:[s.jsxs("div",{className:"kpi-label",children:["APH Correction",V&&s.jsx(_t,{children:"Applied"})]}),s.jsx("div",{className:"kpi-value kpi-action-value",children:V?"Click to undo":"Apply APH Correction"}),s.jsx("div",{className:"kpi-sub"})]})]})]}),tables:s.jsxs(s.Fragment,{children:[s.jsx(Si,{list:v,perProcessIds:ye,labels:Mp,page:"cenpeep",open:q.processInputsOpen,onToggle:()=>A&&pt("processInputsOpen"),thBadge:W,flag:(re,De)=>we&&v.indexOf(re)===we.targetIdx&&Hu.includes(De)?s.jsxs(s.Fragment,{children:[" ",s.jsx("small",{style:{color:"var(--accent2)"},title:`From "${we.sourceTitle}"`,children:"↺"})]}):null}),s.jsx(Ni,{list:v,rows:ka,page:"cenpeep",open:q.processComparisonOpen,onToggle:()=>A&&pt("processComparisonOpen"),thBadge:W})]})}};let Pt=null,fn=null;if(b){const v=Go(b);Pt=v.kpis,fn=v.tables}else c&&C!==null&&(Pt=ms(c),fn=yr(c));return s.jsxs("div",{className:"container",children:[s.jsx(Ot,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"CENPEEP Formula"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(gr,{description:"Upload your CENPEEP standard sheet — all input fields will be auto-populated.",onFile:K,status:g}),s.jsx(wi,{uploadData:y,processes:f.processes,onAdd:f.add,onRemove:f.remove,onTitle:f.setTitle,onDate:f.setDate}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:R,children:[s.jsx(ps,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:ie,children:[s.jsx(fs,{}),"Reset to Defaults"]})]}),s.jsx(ur,{cards:uh,open:d,onToggle:$}),Bp.map(v=>s.jsx(cr,{id:v,fields:vl[v],open:!!d[v],values:r,derived:E,onChange:D,detected:a,missing:i},v))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:Pt}),s.jsxs("div",{className:"design-conditions-block",children:[s.jsxs("div",{className:"section-header",children:[s.jsx("div",{className:"section-label",children:"Design Conditions — for APH Correction"}),s.jsx("div",{className:"section-line"})]}),s.jsx(ur,{cards:ch,open:d,onToggle:$}),Dp.map(v=>s.jsx(cr,{id:v,fields:vl[v],open:!!d[v],values:r,derived:E,onChange:D,detected:a,missing:i},v))]}),s.jsx("div",{id:"output-tables",children:fn}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:Be,children:[s.jsx(Lp,{}),"Save to Database"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:Tn,children:[s.jsx(wo,{}),"Download CSV"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:On,children:[s.jsx(wo,{}),"Download PDF"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:Ho,children:[s.jsx(Vo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function hh(){return s.jsx(Ft,{active:"/calculator",children:s.jsx(mh,{})})}const ne=(e,n)=>n===0||!isFinite(n)?0:e/n,$o=[{id:"bs203",row:4,item:203},{id:"bs206",row:7,item:206},{id:"bs211",row:14,item:211},{id:"bs215",row:18,item:215},{id:"bs216",row:19,item:216},{id:"bs217",row:21,item:217},{id:"bs220",row:24,item:220},{id:"bs221",row:26,item:221},{id:"bs224",row:29,item:224},{id:"bs225",row:31,item:225},{id:"bs228",row:34,item:228},{id:"bs246",row:58,item:246},{id:"bs247",row:60,item:247},{id:"bs250",row:63,item:250},{id:"bs251",row:65,item:251},{id:"bs254",row:68,item:254},{id:"bs255",row:70,item:255},{id:"bs258",row:73,item:258},{id:"bs259",row:75,item:259},{id:"bs262",row:78,item:262},{id:"bs271",row:93,item:271},{id:"bs272",row:94,item:272},{id:"bs273",row:95,item:273},{id:"bs274",row:96,item:274},{id:"bs275",row:97,item:275},{id:"bs276",row:98,item:276},{id:"bs278",row:102,item:278},{id:"bs279",row:103,item:279},{id:"bs280",row:105,item:280},{id:"bs291",row:119,item:291},{id:"bs295",row:124,item:295},{id:"bs301",row:131,item:301},{id:"bs323",row:162,item:323},{id:"bs325",row:165,item:325},{id:"bs326",row:166,item:326},{id:"bs328",row:169,item:328},{id:"bs329",row:170,item:329},{id:"bs332",row:176,item:332},{id:"bs333",row:177,item:333},{id:"bs334",row:178,item:334},{id:"bs335",row:179,item:335},{id:"bs336",row:180,item:336},{id:"bs343",row:186,item:343},{id:"bs344",row:188,item:344},{id:"bs345",row:189,item:345},{id:"bs349",row:194,item:349},{id:"bs350",row:195,item:350},{id:"bs352",row:198,item:352},{id:"bs357",row:204,item:357},{id:"bs360",row:207,item:360},{id:"bs362",row:211,item:362},{id:"bs363",row:212,item:363},{id:"bs390",row:248,item:390},{id:"bs391",row:249,item:391},{id:"bs392",row:250,item:392},{id:"bs393",row:251,item:393},{id:"bs397",row:257,item:397},{id:"bs398",row:258,item:398},{id:"bs399",row:259,item:399},{id:"bs427",row:304,item:427},{id:"bs450",row:333,item:450},{id:"bs451",row:334,item:451},{id:"bs453",row:336,item:453},{id:"bs454",row:337,item:454},{id:"bs460",row:345,item:460},{id:"bs461",row:346,item:461},{id:"bs463",row:348,item:463},{id:"bs464",row:349,item:464},{id:"bs466",row:352,item:466},{id:"bs467",row:353,item:467},{id:"bs469",row:355,item:469},{id:"bs470",row:356,item:470},{id:"bs472",row:359,item:472},{id:"bs473",row:360,item:473},{id:"bs475",row:364,item:475},{id:"bs476",row:365,item:476},{id:"bs477",row:367,item:477},{id:"bs478",row:368,item:478},{id:"bs479",row:370,item:479},{id:"bs480",row:371,item:480},{id:"bs519",row:417,item:519},{id:"bs601",row:426,item:601},{id:"bs701",row:467,item:701},{id:"bs702",row:468,item:702},{id:"bs704",row:470,item:704},{id:"bs705",row:471,item:705},{id:"bs708",row:475,item:708},{id:"bs807",row:486,item:807},{id:"bs907",row:517,item:907},{id:"bs909",row:521,item:909},{id:"bs910",row:523,item:910}],Wu=$o.map(e=>e.id);Object.fromEntries($o.map(e=>[e.id,e.row]));Object.fromEntries($o.map(e=>[e.row,e.id]));const wa={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3};function zp(e){const n={};for(const{id:x,row:M}of $o)n[M]=e[x]||0;n[99]=100-(n[93]+n[94]+n[95]+n[96]+n[97]+n[98]),n[100]=n[93]+n[94]+n[95]+n[96]+n[97]+n[98]+n[99],n[181]=100-(n[176]+n[177]+n[178]+n[179]+n[180]),n[182]=n[176]+n[177]+n[178]+n[179]+n[180]+n[181],n[167]=100-(n[165]+n[166]),n[133]=n[119]-n[124]*(n[130]||0)/n[102],n[400]=n[4]*n[7],n[401]=n[21]*n[24],n[402]=n[19]*n[14],n[403]=n[18]*n[14],n[404]=(n[4]+n[21]-(n[19]+n[18]))*n[58],n[405]=n[404]+n[403]+n[402]-n[401]-n[400],n[406]=n[60]*n[63],n[407]=n[26]*n[29],n[408]=n[65]*n[68],n[409]=n[408]-(n[407]+n[406]),n[410]=n[70]*n[73],n[411]=n[31]*n[34],n[412]=n[75]*n[78],n[413]=n[412]-(n[411]+n[410]),n[414]=n[405]+n[409]+n[413],n[415]=n[194]*n[186]*(n[198]-n[195])+n[207],n[416]=n[414]-n[415],n[419]=n[105]*n[102],n[420]=n[133]*(n[102]+n[162]),n[421]=n[194]*n[188],n[422]=n[212]>0?n[212]*n[250]:n[211]>0?n[211]*n[248]:0,n[424]=n[419]+n[420]+n[421]+n[422],n[428]=n[334],n[429]=n[333]/100,n[430]=n[426]*n[428]*n[429]/100,n[431]=n[430]*100/n[102],n[433]=n[346],n[434]=n[345]/100,n[435]=n[426]*n[433]*n[434]/100,n[436]=n[435]*100/n[102],n[438]=n[353],n[439]=n[352]/100,n[440]=n[426]*n[438]*n[439]/100,n[441]=n[440]*100/n[102],n[443]=n[360],n[444]=n[359]/100,n[445]=n[426]*n[443]*n[444]/100,n[446]=n[445]*100/n[102],n[448]=n[170],n[449]=ne(n[169],n[133]),n[450]=n[426]*n[448]*n[449]/100,n[451]=n[450]*100/n[102],n[453]=n[430]+n[435]+n[440]+n[445]+n[450],n[454]=n[431]+n[436]+n[441]+n[446]+n[451],n[456]=n[429]*(100-n[428])/100,n[457]=n[434]*(100-n[433])/100,n[458]=n[439]*(100-n[438])/100,n[459]=n[444]*(100-n[443])/100,n[460]=n[449]*(100-n[448])/100,n[461]=n[94]/100-(n[456]+n[457]+n[458]+n[459]+n[460]),n[463]=n[429]*n[337]*(n[336]-n[258]),n[464]=n[434]*n[349]*(n[348]-n[258])+n[439]*n[356]*(n[355]-n[258]),n[465]=n[463]+n[464],n[469]=n[467]*n[468],n[472]=n[470]*n[471],n[473]=n[469]+n[472],n[476]=n[475]*30.6*(n[304]-n[258]),n[478]=n[93]/100,n[479]=9/100*n[96],n[480]=n[478]+n[479],n[481]=1.88*(n[304]-25)+2442+4.2*(25-n[258]),n[482]=n[480]*n[481],n[484]=n[482]-(n[102]-n[103]),n[487]=n[257],n[488]=n[259],n[489]=n[486]*n[488]*1.88*(n[304]-n[258]);const t=(n[105]>0?n[105]*n[103]:0)+(n[119]>0?(n[119]-n[124]*n[131]/n[103])*(n[103]+n[162]):0)+(n[194]>0?n[194]*n[189]:0)+(n[212]>0?n[212]*n[251]:n[211]>0?n[211]*n[249]:0),r=n[105]>0||n[119]>0||n[194]>0||n[211]>0||n[212]>0;n.item901_gross=ne((n[416]-n[417])*100,n[424]),n.item901_net=r?ne((n[416]-n[417])*100,t):0;const o=ne(n[430]*100,n[102]),a=ne(n[430]*100,n[103]),l=ne(n[435]*100,n[102]),i=ne(n[435]*100,n[103]),u=ne(n[440]*100,n[102]),d=ne(n[440]*100,n[103]),h=ne(n[445]*100,n[102]),g=ne(n[445]*100,n[103]),p=ne(n[450]*100,n[102]),y=ne(n[450]*100,n[103]),k=ne(n[465]*100,n[102]),w=ne(n[465]*100,n[103]),T=o+l+u+h+p+k,f=a+i+d+g+y+w,c=ne(n[473]*100,n[102]),m=ne(n[473]*100,n[103]),b=ne(n[476]*100,n[102]),L=ne(n[476]*100,n[103]),A=ne(n[482]*100,n[102]),j=ne(n[482]*100,n[103]),C=ne(n[484]*100,n[102]),B=ne(n[484]*100,n[103]),P=ne(ne(n[204]*n[481]*100,n[194]),n[188]),Y=ne(ne(n[204]*n[481]*100,n[194]),n[189]),H=c+b+A+C+P,_=m+L+j+B+Y,J=n[119]>0?(n[119]-n[124]*n[131]/n[103])*(n[103]+n[162]):n[105]*n[103],X=ne(((n[365]-n[368])*(100-n[364]+539.1+.5*(n[304]-100))+n[368]*(n[367]-n[364]))*418.7,J),q=ne(n[371]*(100-n[370]+539.1+.5*(n[304]-100))*418.7,J),Z=X+q,E=n[420]!==0?n[420]:n[419],D=ne(((n[365]-n[368])*(100-n[364]+539.1+.5*(n[304]-100))+n[368]*(n[367]-n[364]))*418.7,E),$=ne(n[371]*(100-n[370]+539.1+.5*(n[304]-100))*418.7,E),S=D+$,O=ne(n[489]*100,n[102]),K=ne(n[489]*100,n[103]),R=n[517];return n.item902_gross=100-(T+H+S+O+R+n[521]+n[523]),n.item902_net=100-(f+_+Z+K+R+n[521]+n[523]),n.item908_gross=100-(n.item901_gross+T+H+S+O),n.item908_net=100-(n.item901_net+f+_+Z+K),{F:n,methodA:{gross:n.item901_gross,net:n.item901_net},methodB:{gross:n.item902_gross,net:n.item902_net},balanceA:{gross:n.item908_gross,net:n.item908_net},losses:{residue:{total:{gross:T,net:f},a:{label:"Combustible in bottom ash",gross:o,net:a},b:{label:"Combustible in coarse dust",gross:l,net:i},c:{label:"Combustible in fine dust",gross:u,net:d},d:{label:"Combustible in riddlings",gross:h,net:g},e:{label:"Combustible, dryer ash",gross:p,net:y},f:{label:"Sensible heat of solid residue",gross:k,net:w}},flueGas:{total:{gross:H,net:_},a:{label:"Unburnt gas (CO + hydrocarbons)",gross:c,net:m},b:{label:"Sensible heat in dry flue gas",gross:b,net:L},c:{label:"Moisture in fuel",gross:A,net:j},d:{label:"Sensible heat in water vapour",gross:C,net:B},e:{label:"Heat in atomizing air/steam",gross:P,net:Y}},waterHopper:{total:{gross:S,net:Z},a:{label:"Water-filled ash hopper / slag tank",gross:D,net:X},b:{label:"Ash quenching spray",gross:$,net:q}},moistureAir:{label:"Moisture in combustion air",gross:O,net:K},fuelHeating:{label:"Heating fuel up to air supply temp.",value:R},radiation:{label:"Radiation & convection (Method B)",value:n[521]},auxPower:{label:"Auxiliary power, heat equivalent (Method B)",value:n[523]}},ultimate:{solidOxygenByDiff:n[99],solidCheckTotal:n[100],oilOxygenNitrogenByDiff:n[181],oilCheckTotal:n[182]}}}const gh=[{target:"grid-water",icon:"WS",title:"Feedwater & Steam",sub:"20 parameters"},{target:"grid-solid",icon:"SF",title:"Solid Fuel — Ultimate Analysis & Firing",sub:"17 parameters"},{target:"grid-oil",icon:"OF",title:"Oil Fuel — Analysis & Firing",sub:"13 parameters"},{target:"grid-gas",icon:"GF",title:"Gaseous Fuel — Firing & CV",sub:"6 parameters"},{target:"grid-air",icon:"AA",title:"Air & Ambient Conditions",sub:"4 parameters"},{target:"grid-residue",icon:"SR",title:"Solid Residue — Ash, Dust & Riddlings",sub:"14 parameters"},{target:"grid-hopper",icon:"WH",title:"Water-Filled Ash Hopper / Quenching",sub:"6 parameters"},{target:"grid-extras",icon:"HB",title:"Heat Balance & Method B Extras",sub:"11 parameters"}],Ei={"grid-water":[{id:"bs203",name:"Feedwater Quantity",sym:"Item 203",uom:"kg/s",kind:"",value:"45",readonly:!1,step:"any"},{id:"bs206",name:"Feedwater Enthalpy",sym:"Item 206",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs211",name:"Drum Water Enthalpy",sym:"Item 211",uom:"kJ/kg",kind:"",value:"1650",readonly:!1,step:"any"},{id:"bs215",name:"Drum Level — Rate of Increase",sym:"Item 215",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs216",name:"Blow-down Rate",sym:"Item 216",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs217",name:"Main Steam Spray Water Quantity",sym:"Item 217",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs220",name:"Main Steam Spray Water Enthalpy",sym:"Item 220",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs221",name:"Reheater-1 Spray Water Quantity",sym:"Item 221",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs224",name:"Reheater-1 Spray Water Enthalpy",sym:"Item 224",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs225",name:"Reheater-2 Spray Water Quantity",sym:"Item 225",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs228",name:"Reheater-2 Spray Water Enthalpy",sym:"Item 228",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs246",name:"Steam Leaving Unit — Enthalpy",sym:"Item 246",uom:"kJ/kg",kind:"",value:"3400",readonly:!1,step:"any"},{id:"bs247",name:"Reheater-1 Inlet Steam Quantity",sym:"Item 247",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs250",name:"Reheater-1 Inlet Steam Enthalpy",sym:"Item 250",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs251",name:"Reheater-1 Outlet Steam Quantity",sym:"Item 251",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs254",name:"Reheater-1 Outlet Steam Enthalpy",sym:"Item 254",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs255",name:"Reheater-2 Inlet Steam Quantity",sym:"Item 255",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs258",name:"Reheater-2 Inlet Steam Enthalpy",sym:"Item 258",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs259",name:"Reheater-2 Outlet Steam Quantity",sym:"Item 259",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs262",name:"Reheater-2 Outlet Steam Enthalpy",sym:"Item 262",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-solid":[{id:"bs271",name:"Moisture (Ultimate, As Fired)",sym:"Item 271",uom:"%",kind:"",value:"12",readonly:!1,step:"any"},{id:"bs272",name:"Ash (Ultimate, As Fired)",sym:"Item 272",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs273",name:"Carbon (Ultimate, As Fired)",sym:"Item 273",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs274",name:"Hydrogen (Ultimate, As Fired)",sym:"Item 274",uom:"%",kind:"",value:"2.5",readonly:!1,step:"any"},{id:"bs275",name:"Nitrogen (Ultimate, As Fired)",sym:"Item 275",uom:"%",kind:"",value:"1.0",readonly:!1,step:"any"},{id:"bs276",name:"Sulphur (Ultimate, As Fired)",sym:"Item 276",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs278",name:"GCV of Coal — Gross",sym:"Item 278",uom:"kJ/kg",kind:"",value:"13900",readonly:!1,step:"any"},{id:"bs279",name:"GCV of Coal — Net",sym:"Item 279",uom:"kJ/kg",kind:"",value:"13300",readonly:!1,step:"any"},{id:"bs280",name:"Mechanical Stoker Firing Rate",sym:"Item 280",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs291",name:"Pulverized Fuel — Total Weighed",sym:"Item 291",uom:"kg/s",kind:"",value:"9.2",readonly:!1,step:"any"},{id:"bs295",name:"Pulverized Fuel — Mill Rejects (Total)",sym:"Item 295",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs301",name:"Calorific Value of Mill Rejects — Gross",sym:"Item 301",uom:"kJ/kg",kind:"",value:"2000",readonly:!1,step:"any"},{id:"bs323",name:"Heat Expended in Drying Fuel",sym:"Item 323",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs325",name:"Dryer Gas Analysis — CO2",sym:"Item 325",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs326",name:"Dryer Gas Analysis — CO",sym:"Item 326",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs328",name:"Ashpit Refuse Quantity",sym:"Item 328",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs329",name:"Ashpit Refuse — % Combustible",sym:"Item 329",uom:"%",kind:"",value:"5",readonly:!1,step:"any"}],"grid-oil":[{id:"bs332",name:"Moisture (Oil, Ultimate)",sym:"Item 332",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs333",name:"Ash (Oil, Ultimate)",sym:"Item 333",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs334",name:"Carbon (Oil, Ultimate)",sym:"Item 334",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs335",name:"Hydrogen (Oil, Ultimate)",sym:"Item 335",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs336",name:"Sulphur (Oil, Ultimate)",sym:"Item 336",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs343",name:"Specific Heat of Oil",sym:"Item 343",uom:"kJ/(kg·K)",kind:"",value:"2.1",readonly:!1,step:"any"},{id:"bs344",name:"GCV of Oil — Gross",sym:"Item 344",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs345",name:"GCV of Oil — Net",sym:"Item 345",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs349",name:"Oil Firing Rate",sym:"Item 349",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs350",name:"Temperature of Oil as Weighed",sym:"Item 350",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs352",name:"Temperature of Oil Delivered to Burner",sym:"Item 352",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs357",name:"Atomizing Air/Steam Quantity",sym:"Item 357",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs360",name:"Heat Used in Atomizing Oil",sym:"Item 360",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"}],"grid-gas":[{id:"bs362",name:"Gas Firing Rate — Volume",sym:"Item 362",uom:"m³/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs363",name:"Gas Firing Rate — Mass",sym:"Item 363",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs390",name:"GCV of Gas — Gross (Volume basis)",sym:"Item 390",uom:"kJ/m³",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs391",name:"GCV of Gas — Net (Volume basis)",sym:"Item 391",uom:"kJ/m³",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs392",name:"GCV of Gas — Gross (Mass basis)",sym:"Item 392",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs393",name:"GCV of Gas — Net (Mass basis)",sym:"Item 393",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-air":[{id:"bs397",name:"Ambient Air Humidity",sym:"Item 397",uom:"%",kind:"",value:"60",readonly:!1,step:"any"},{id:"bs398",name:"Temperature at Entry to Air Intakes",sym:"Item 398",uom:"°C",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs399",name:"Moisture per Unit Mass of Dry Air",sym:"Item 399",uom:"kg/kg",kind:"",value:"0.018",readonly:!1,step:"any"},{id:"bs427",name:"Flue Gas Exit Temperature (LTAH/Economizer Outlet)",sym:"Item 427",uom:"°C",kind:"",value:"135",readonly:!1,step:"any"}],"grid-residue":[{id:"bs450",name:"Bottom Ash — Proportion of Fuel (Dry Basis)",sym:"Item 450",uom:"%",kind:"",value:"8",readonly:!1,step:"any"},{id:"bs451",name:"Bottom Ash — Combustible Content",sym:"Item 451",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs453",name:"Bottom Ash — Temperature as Discharged",sym:"Item 453",uom:"°C",kind:"",value:"200",readonly:!1,step:"any"},{id:"bs454",name:"Bottom Ash — Specific Heat",sym:"Item 454",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs460",name:"Coarse Dust — Proportion of Fuel (Dry Basis)",sym:"Item 460",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs461",name:"Coarse Dust — Combustible Content",sym:"Item 461",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs463",name:"Coarse Dust — Temperature as Discharged",sym:"Item 463",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs464",name:"Coarse Dust — Specific Heat",sym:"Item 464",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs466",name:"Fine Dust (Fly Ash) — Proportion of Fuel (Dry Basis)",sym:"Item 466",uom:"%",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs467",name:"Fine Dust (Fly Ash) — Combustible Content",sym:"Item 467",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs469",name:"Fine Dust (Fly Ash) — Temperature as Discharged",sym:"Item 469",uom:"°C",kind:"",value:"135",readonly:!1,step:"any"},{id:"bs470",name:"Fine Dust (Fly Ash) — Specific Heat",sym:"Item 470",uom:"kJ/(kg·K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs472",name:"Riddlings — Proportion of Fuel (Dry Basis)",sym:"Item 472",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs473",name:"Riddlings — Combustible Content",sym:"Item 473",uom:"%",kind:"",value:"0",readonly:!1,step:"any"}],"grid-hopper":[{id:"bs475",name:"Hopper Water Inlet Temperature",sym:"Item 475",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs476",name:"Hopper Water Inlet Quantity",sym:"Item 476",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs477",name:"Hopper Water Outlet Temperature",sym:"Item 477",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs478",name:"Hopper Water Outlet Quantity",sym:"Item 478",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs479",name:"Quenching Spray Water Temperature",sym:"Item 479",uom:"°C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs480",name:"Quenching Spray Water Quantity",sym:"Item 480",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"}],"grid-extras":[{id:"bs519",name:"Heat Added from Separate External Air Source",sym:"Item 519",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs601",name:"Calorific Value of Carbon",sym:"Item 601",uom:"kJ/kg",kind:"",value:"33820",readonly:!1,step:"any"},{id:"bs701",name:"CO in Flue Gases per Unit Mass of Fuel",sym:"Item 701",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs702",name:"Calorific Value of CO",sym:"Item 702",uom:"kJ/kg",kind:"",value:"10120",readonly:!1,step:"any"},{id:"bs704",name:"Hydrocarbons in Flue Gases per Unit Mass of Fuel",sym:"Item 704",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs705",name:"Calorific Value of Hydrocarbons",sym:"Item 705",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs708",name:"Dry Flue Gases per Unit Mass of Fuel",sym:"Item 708",uom:"kg mol/kg",kind:"",value:"0.35",readonly:!1,step:"any"},{id:"bs807",name:"Combustion Air per Unit Mass of Fuel",sym:"Item 807",uom:"kg/kg",kind:"",value:"10.2",readonly:!1,step:"any"},{id:"bs907",name:"Loss in Heating Fuel up to Air Supply Temp",sym:"Item 907",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs909",name:"Radiation & Convection Loss (Method B)",sym:"Item 909",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs910",name:"Heat Equivalent of Auxiliary Power (Method B)",sym:"Item 910",uom:"%",kind:"",value:"0.3",readonly:!1,step:"any"}]},Rp=Object.keys(Ei),Up=Rp.flatMap(e=>Ei[e]),xh=Object.fromEntries(Up.map(e=>[e.id,e.value??""])),Qu=new Set(Up.map(e=>e.id)),bl=(e,n,t)=>s.jsxs("tr",{children:[s.jsx("td",{children:e}),s.jsxs("td",{children:[Re(n)," %"]}),s.jsxs("td",{children:[Re(t)," %"]})]},e);function ja({title:e,group:n}){return s.jsxs("div",{className:"output-table-wrap",children:[s.jsxs("h3",{children:[e," — Total: ",Re(n.total.gross)," % (gross) / ",Re(n.total.net)," % (net)"]}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Loss"}),s.jsx("th",{children:"Gross CV basis"}),s.jsx("th",{children:"Net CV basis"})]})}),s.jsx("tbody",{children:Object.keys(n).filter(t=>t!=="total").map(t=>bl(n[t].label,n[t].gross,n[t].net))})]})]})}const Ps=({label:e,value:n,cls:t})=>s.jsxs("div",{className:"kpi-card "+t,children:[s.jsx("div",{className:"kpi-label",children:e}),s.jsxs("div",{className:"kpi-value",children:[Re(n),s.jsx("span",{className:"kpi-unit",children:"%"})]})]});function yh(){const e=hr();N.useEffect(()=>{document.title="Boiler Efficiency Calculator — BS-2885"},[]);const[n,t]=N.useState("input"),[r,o]=N.useState(xh),[a,l]=N.useState(new Set),[i,u]=N.useState(new Set),[d,h]=N.useState({}),[g,p]=N.useState(null),[y,k]=N.useState(null),[w,T]=N.useState(null),f=(C,B)=>o(P=>({...P,[C]:B})),c=C=>h(B=>({...B,[C]:!B[C]})),m=async C=>{p({cls:"loading",text:"⏳ Reading BS-2885 sheet…"});const B=new FormData;B.append("file",C);try{const Y=await(await Ye("/api/upload",{method:"POST",body:B})).json();if(!Y.ok)throw new Error(Y.error||"Upload failed");xr(Y,"BS-2885");const H=Y.extractedBS2885||{},_={...r},J=new Set;let X=0;for(const[Z,E]of Object.entries(H))Qu.has(Z)&&(_[Z]=String(typeof E=="number"?parseFloat(E.toFixed(6)):E),J.add(Z),X++);const q=new Set;for(const Z of Y.missingFieldsBS2885||[]){const E=Z.id||Z;Qu.has(E)&&q.add(E)}o(_),l(J),u(q),k(Y),p({cls:"success",text:`✓ ${X} of ${Wu.length} fields detected from "${Y.filename}"`}),e(`Detected ${X} field${X===1?"":"s"} from the uploaded sheet.`,"success")}catch(P){p({cls:"error",text:`✗ ${P.message}`}),e(P.message||"Upload failed","error")}},b=()=>{o(C=>{const B={...C};for(const[P,Y]of Object.entries(wa))P in B&&(B[P]=String(Y));return B}),l(C=>{const B=new Set(C);return Object.keys(wa).forEach(P=>B.delete(P)),B}),u(C=>{const B=new Set(C);return Object.keys(wa).forEach(P=>B.delete(P)),B}),e("Inputs reset to defaults.","success")},L=()=>{const C={};for(const B of Wu)C[B]=parseFloat(r[B])||0;T(zp(C)),t("output"),e("BS-2885 efficiency calculated.","success")},A=async()=>{const C=y;if(!C||!C.fieldDetailBS2885||!Object.keys(C.fieldDetailBS2885).length){e("Upload and parse a file first to generate a field report.","error");return}const B={filename:C.filename,primarySheet:C.sheetNameBS2885,fieldDetail:C.fieldDetailBS2885,extracted:C.extractedBS2885,missingFields:C.missingFieldsBS2885,reportTitle:"BS-2885 Field Detection Report",filenamePrefix:"BS2885_Field_Report",standardLabel:"BS-2885"};try{const P=await Ye("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(B)});if(!P.ok){const J=await P.json().catch(()=>({}));throw new Error(J.error||`Report generation failed (${P.status})`)}const Y=await P.blob(),_=(P.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt(Y,_?_[1]:"BS2885_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(P){e("Report failed: "+P.message,"error")}},j=w;return s.jsxs("div",{className:"container",children:[s.jsx(Ot,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"BS-2885 (1974)"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(gr,{description:'Upload a filled-in BS-2885 (1974) test sheet — matching "Sl. No." rows are auto-populated from the Value column.',onFile:m,status:g}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:L,children:[s.jsx(ps,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:b,children:[s.jsx(fs,{}),"Reset to Defaults"]})]}),s.jsx(ur,{cards:gh,open:d,onToggle:c}),Rp.map(C=>s.jsx(cr,{id:C,fields:Ei[C],open:!!d[C],values:r,onChange:f,detected:a,missing:i},C))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:j&&s.jsxs(s.Fragment,{children:[s.jsx(Ps,{label:"Thermal Efficiency — Method A (Gross CV)",value:j.methodA.gross,cls:"kpi-green"}),s.jsx(Ps,{label:"Thermal Efficiency — Method A (Net CV)",value:j.methodA.net,cls:"kpi-green"}),s.jsx(Ps,{label:"Thermal Efficiency — Method B (Gross CV)",value:j.methodB.gross,cls:"kpi-blue"}),s.jsx(Ps,{label:"Thermal Efficiency — Method B (Net CV)",value:j.methodB.net,cls:"kpi-blue"})]})}),s.jsx("div",{id:"output-tables",children:j&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Method A — Balance of Account (radiation & unmeasured losses)"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{}),s.jsx("th",{children:"Gross CV basis"}),s.jsx("th",{children:"Net CV basis"})]})}),s.jsx("tbody",{children:bl("Item 908 — Unaccounted balance",j.balanceA.gross,j.balanceA.net)})]})]}),s.jsx(ja,{title:"Item 903 — Losses due to Residue",group:j.losses.residue}),s.jsx(ja,{title:"Item 904 — Losses due to Flue Gases",group:j.losses.flueGas}),s.jsx(ja,{title:"Item 905 — Losses, Water-Filled Ash Hopper / Quenching",group:j.losses.waterHopper}),s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Other Method B Losses"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Loss"}),s.jsx("th",{children:"Gross CV basis"}),s.jsx("th",{children:"Net CV basis"})]})}),s.jsxs("tbody",{children:[bl(j.losses.moistureAir.label,j.losses.moistureAir.gross,j.losses.moistureAir.net),s.jsxs("tr",{children:[s.jsx("td",{children:j.losses.fuelHeating.label}),s.jsxs("td",{colSpan:"2",children:[Re(j.losses.fuelHeating.value)," %"]})]}),s.jsxs("tr",{children:[s.jsx("td",{children:j.losses.radiation.label}),s.jsxs("td",{colSpan:"2",children:[Re(j.losses.radiation.value)," %"]})]}),s.jsxs("tr",{children:[s.jsx("td",{children:j.losses.auxPower.label}),s.jsxs("td",{colSpan:"2",children:[Re(j.losses.auxPower.value)," %"]})]})]})]})]}),s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Ultimate Analysis — Check Totals"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{}),s.jsx("th",{children:"Oxygen (by diff.)"}),s.jsx("th",{children:"Sum (should read 100%)"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:"Solid fuel"}),s.jsxs("td",{children:[Re(j.ultimate.solidOxygenByDiff)," %"]}),s.jsxs("td",{children:[Re(j.ultimate.solidCheckTotal)," %"]})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"Oil fuel (O₂ + N₂ by diff.)"}),s.jsxs("td",{children:[Re(j.ultimate.oilOxygenNitrogenByDiff)," %"]}),s.jsxs("td",{children:[Re(j.ultimate.oilCheckTotal)," %"]})]})]})]})]})]})}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-secondary",onClick:A,children:[s.jsx(Vo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function vh(){return s.jsx(Ft,{active:"/bs-2885",extraStyle:"bs2885",children:s.jsx(yh,{})})}const ht=(e,n)=>n===0||!isFinite(n)?0:e/n,bh=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t},kl=["A","VM","M","FC","SUC","GCV","S","T","Tdb","Twb","O2","CO2","CO","N2","BL","ER","Wze","UBA","UFA"],kh={A:1.914014,VM:1.877117,M:50.5,FC:45.70887,SUC:2.34,GCV:2248.92,S:0,T:182.83,Tdb:26,Twb:18,O2:8.97,CO2:11.7649,CO:.0651,N2:79.2,BL:32e3,ER:2,Wze:0,UBA:84.78369,UFA:78.84464},wh={includeRadiation:!1,hfFromTemp:!1};function Vp(e,n={}){const t={...wh,...n},r=Fe=>bh(e,Fe),o=[],a=r("A"),l=r("VM"),i=r("M"),u=r("FC"),d=r("GCV"),h=r("S"),g=r("T"),p=r("Tdb"),y=r("Twb"),k=r("O2"),w=r("CO2"),T=r("CO"),f=r("N2"),c=r("BL"),m=r("ER"),b=r("Wze"),L=r("UBA"),A=r("UFA"),j=u+.9*(l-14),C=l*(7.35/(l+10)-.013),B=2.1-.012*l,P=100-j-C-h-B-a-i,Y=(p+y)/2,H=ht(c,m),_=H,J=H*a/100,X=ht(J,_),q=70/100*a/100*A/100*8078+a/100*30/100*L/100*8078,Z=X*q,E=j/100-ht(X*q,8078),D=ht(44.01*w+32*k+28.02*f+28.01*T,12.01*(w+T))*(E+h/267),$=1.01/4.186,S=D*$*(g-Y),O=i/100,K=(2501+1.88*g)/4.186,R=t.hfFromTemp?Y:O,x=O*(K-R),M=8.936*C/100*(K-R),Q=ht(b*(K-R),H),G=ht(T,w+T)*5644*E,le=0,ie=0,ge=1.5*d/100,Be=Z+S+x+M+Q+G+le+ie+(t.includeRadiation?ge:0),sn=ht(Be,d)*100,pn=100-sn;d<=0&&o.push("Gross calorific value is 0 — efficiency cannot be calculated."),m<=0&&o.push("Evaporation ratio is 0 — bagasse consumption (Boiler load ÷ ER) cannot be calculated."),w+T<=0&&o.push("CO₂ + CO at APH inlet is 0 — dry flue gas weight cannot be calculated.");const Tn=w+k+f+T;Tn>0&&Math.abs(Tn-100)>3&&o.push(`CO₂ + O₂ + N₂ + CO at APH inlet adds up to ${Tn.toFixed(1)} % (expected ≈ 100 %).`),P<0&&o.push("Calculated oxygen in fuel is negative — check the proximate analysis (Ash, Moisture, VM, FC)."),d>0&&(pn<0||pn>100)&&o.push("Efficiency is outside 0–100 % — check the inputs.");const jn=[{sym:"Luc",label:"Loss due to unburned carbon",uom:"kcal/kg",value:Z,cell:"E36",loss:!0},{sym:"Wd'p'",label:"kg of total dry refuse per kg of AF fuel",uom:"kg/kg",value:X,cell:"E37"},{sym:"Wd'p'e",label:"Weight of dry refuse collected",uom:"kg/h",value:J,cell:"E38"},{sym:"Wfe",label:"Measured fuel rate",uom:"kg/h",value:_,cell:"E39"},{sym:"Hd'p'",label:"HHV of total dry refuse",uom:"kcal/kg",value:q,cell:"E40"},{sym:"Lg",label:"Loss due to dry flue gas",uom:"kcal/kg",value:S,cell:"E41",loss:!0},{sym:"Cb",label:"kg of carbon burnt per kg of AF fuel",uom:"kg/kg",value:E,cell:"E42"},{sym:"WG'",label:"Weight of dry gas leaving unit per kg of AF fuel",uom:"kg/kg",value:D,cell:"E43"},{sym:"CpG'",label:"Mean specific heat of dry flue gas",uom:"kcal/kg°C",value:$,cell:"E44"},{sym:"Lmf",label:"Loss due to moisture in fuel",uom:"kcal/kg",value:x,cell:"E45",loss:!0},{sym:"mf",label:"kg of moisture per kg of AF fuel",uom:"kg/kg",value:O,cell:"E46"},{sym:"Hv",label:"Vapour enthalpy at 0.07 kgf/cm² at APH o/l",uom:"kcal/kg",value:K,cell:"E47"},{sym:"HRw",label:"Enthalpy of saturated liquid at t",uom:"kcal/kg",value:R,cell:"E48"},{sym:"Lh",label:"Loss due to moisture from hydrogen",uom:"kcal/kg",value:M,cell:"E49",loss:!0},{sym:"Lz",label:"Loss due to atomizing steam",uom:"kcal/kg",value:Q,cell:"E50",loss:!0},{sym:"Lco",label:"Loss due to formation of CO",uom:"kcal/kg",value:G,cell:"E51",loss:!0},{sym:"Luh",label:"Loss due to unburned hydrogen",uom:"kcal/kg",value:le,cell:"E52",loss:!0},{sym:"Luhc",label:"Loss due to unburned hydrocarbons",uom:"kcal/kg",value:ie,cell:"E53",loss:!0},{sym:"Lβ",label:"Loss due to radiation & convection",uom:"kcal/kg",value:ge,cell:"E54",loss:!0,optional:!0}];return{opts:t,derived:{C:j,H:C,N:B,O:P,t:Y,bagasse:H},ultimate:{C:j,H:C,N:B,O:P,S:h,A:a,M:i,sum:j+C+B+P+h+a+i},losses:{Luc:Z,Lg:S,Lmf:x,Lh:M,Lz:Q,Lco:G,Luh:le,Luhc:ie,Lrad:ge},tabulation:jn,totalKcal:Be,totalPct:sn,efficiency:pn,includedRadiation:t.includeRadiation,warnings:o}}const je=(e,n,t,r,o,a={})=>({id:e,name:n,sym:t,uom:r,kind:"",value:o,readonly:!1,step:"any",...a}),jh=[{target:"grid-is-prox",icon:"PA",title:"Proximate Analysis — As Fired",sub:"7 parameters"},{target:"grid-is-boiler",icon:"BP",title:"Boiler Parameters",sub:"10 parameters"},{target:"grid-is-loi",icon:"LO",title:"LOI — Unburnts in Ash",sub:"2 parameters"}],Ai={"grid-is-prox":[je("A","Ash","A","%","1.914014"),je("VM","Volatile Matter","VM","%","1.877117"),je("M","Moisture","M","%","50.5"),je("FC","Fixed Carbon","FC","%","45.70887"),je("SUC","Sucrose (information only)","","%","2.34"),je("GCV","Gross Calorific Value","GCV","kcal/kg","2248.92"),je("S","Sulphur","S","%","0")],"grid-is-boiler":[je("T","Avg Flue Gas Outlet Temp (APH outlet)","T","°C","182.83"),je("Tdb","Ambient Temp (Dry bulb)","Tdb","°C","26"),je("Twb","Ambient Temp (Wet bulb)","Twb","°C","18"),je("O2","O₂ at APH Inlet","O2","%","8.97"),je("CO2","CO₂ at APH Inlet","CO2","%","11.7649"),je("CO","CO at APH Inlet","CO","%","0.0651"),je("N2","N₂ at APH Inlet","N2","%","79.2"),je("BL","Boiler Load","BL","kg/h","32000"),je("ER","Evaporation Ratio","ER","kg/kg","2"),je("Wze","Quantity of Atomizing Steam","Wze","kg/h","0")],"grid-is-loi":[je("UBA","Unburnts in Bottom Ash","UBA","%","84.78369"),je("UFA","Unburnts in Fly Ash","UFA","%","78.84464")]},$p=Object.keys(Ai),Hp=$p.flatMap(e=>Ai[e]),Ju=Object.fromEntries(Hp.map(e=>[e.id,e.value??""])),Yu=new Set(Hp.map(e=>e.id)),Gn=e=>typeof e=="number"&&isFinite(e)?e.toFixed(4):"—",Is=({label:e,value:n,unit:t,cls:r})=>s.jsxs("div",{className:"kpi-card "+r,children:[s.jsx("div",{className:"kpi-label",children:e}),s.jsxs("div",{className:"kpi-value",children:[Re(n),s.jsx("span",{className:"kpi-unit",children:t})]})]});function Ch(){const e=hr();N.useEffect(()=>{document.title="Boiler Efficiency Calculator — IS-13890"},[]);const[n,t]=N.useState("input"),[r,o]=N.useState(Ju),[a,l]=N.useState(new Set),[i,u]=N.useState(new Set),[d,h]=N.useState({}),[g,p]=N.useState(null),[y,k]=N.useState(null),[w,T]=N.useState(!1),[f,c]=N.useState(!1),[m,b]=N.useState(!1),L=(_,J)=>o(X=>({...X,[_]:J})),A=_=>h(J=>({...J,[_]:!J[_]})),j=N.useMemo(()=>{if(!m)return null;const _={};for(const J of kl)_[J]=parseFloat(r[J])||0;return Vp(_,{includeRadiation:w,hfFromTemp:f})},[m,r,w,f]),C=async _=>{p({cls:"loading",text:"⏳ Reading IS-13890 sheet…"});const J=new FormData;J.append("file",_);try{const q=await(await Ye("/api/upload",{method:"POST",body:J})).json();if(!q.ok)throw new Error(q.error||"Upload failed");xr(q,"IS-13890");const Z=q.extractedIS13890||{},E={...r},D=new Set;for(const[O,K]of Object.entries(Z))Yu.has(O)&&(E[O]=String(typeof K=="number"?parseFloat(K.toFixed(6)):K),D.add(O));const $=new Set;for(const O of q.missingFieldsIS13890||[]){const K=O.id||O;Yu.has(K)&&K!=="SUC"&&$.add(K)}o(E),l(D),u($),k(q);const S=D.size;S?(p({cls:"success",text:`✓ ${S} of ${kl.length} fields detected from "${q.filename}"`}),e(`Detected ${S} field${S===1?"":"s"} from the uploaded sheet.`,"success")):(p({cls:"error",text:"✗ No IS-13890 form found in this workbook (needs fields such as wet-bulb temp, evaporation ratio, unburnts in ash…)."}),e("No IS-13890 data found in the uploaded file.","error"))}catch(X){p({cls:"error",text:`✗ ${X.message}`}),e(X.message||"Upload failed","error")}},B=()=>{o(Ju),l(new Set),u(new Set),e("Inputs reset to the workbook sample values.","success")},P=()=>{b(!0),t("output"),e("IS-13890 efficiency calculated.","success")},Y=async()=>{const _=y;if(!_||!_.fieldDetailIS13890||!Object.keys(_.fieldDetailIS13890).length){e("Upload and parse a file first to generate a field report.","error");return}const J={filename:_.filename,primarySheet:_.sheetNameIS13890,fieldDetail:_.fieldDetailIS13890,extracted:_.extractedIS13890,missingFields:_.missingFieldsIS13890,reportTitle:"IS-13890 Field Detection Report",filenamePrefix:"IS13890_Field_Report",standardLabel:"IS-13890"};try{const X=await Ye("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(J)});if(!X.ok){const E=await X.json().catch(()=>({}));throw new Error(E.error||`Report generation failed (${X.status})`)}const q=await X.blob(),Z=(X.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt(q,Z?Z[1]:"IS13890_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(X){e("Report failed: "+X.message,"error")}},H=j;return s.jsxs("div",{className:"container",children:[s.jsx(Ot,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"IS-13890 — Heat Loss Method"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(gr,{description:"Upload a filled-in IS-13890 sheet — input cells (the colour beside “Inputs” in the sheet’s legend) are auto-populated; calculated cells are ignored and recomputed here.",onFile:C,status:g}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:P,children:[s.jsx(ps,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:B,children:[s.jsx(fs,{}),"Reset to Sample Values"]})]}),s.jsx(ur,{cards:jh,open:d,onToggle:A}),$p.map(_=>s.jsx(cr,{id:_,fields:Ai[_],open:!!d[_],values:r,onChange:L,detected:a,missing:i},_))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[!H&&s.jsx("div",{style:{textAlign:"center",padding:"50px 20px",color:"var(--muted)",fontSize:14},children:"Press “Calculate Efficiency” on the Input tab."}),H&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-summary",id:"kpi-area",children:[s.jsx(Is,{label:"Boiler Efficiency (Heat Loss Method)",value:H.efficiency,unit:"%",cls:"kpi-green"}),s.jsx(Is,{label:"Total Loss",value:H.totalPct,unit:"%",cls:"kpi-red"}),s.jsx(Is,{label:"Total Loss",value:H.totalKcal,unit:"kcal/kg",cls:"kpi-amber"}),s.jsx(Is,{label:"Fuel (Bagasse) Consumption",value:H.derived.bagasse,unit:"kg/h",cls:"kpi-blue"})]}),H.warnings.length>0&&s.jsx("div",{style:{fontSize:12,color:"var(--amber)",margin:"0 4px 12px"},children:H.warnings.map((_,J)=>s.jsxs("div",{children:["⚠ ",_]},J))}),s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Calculation options"}),s.jsxs("label",{style:{display:"block",fontSize:13,margin:"6px 0"},children:[s.jsx("input",{type:"checkbox",checked:w,onChange:_=>T(_.target.checked)})," ","Include radiation & convection loss (Lβ = 1.5 % of GCV) in Total Loss — ",s.jsx("em",{children:"the reference workbook leaves it out"})]}),s.jsxs("label",{style:{display:"block",fontSize:13,margin:"6px 0"},children:[s.jsx("input",{type:"checkbox",checked:f,onChange:_=>c(_.target.checked)})," ","Use hf ≈ t (kcal/kg) for “Enthalpy of saturated liquid at t” — ",s.jsx("em",{children:"the workbook uses the moisture fraction (kg/kg) there"})]})]}),s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Ultimate Analysis (calculated from the proximate analysis)"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Carbon"}),s.jsx("th",{children:"Hydrogen"}),s.jsx("th",{children:"Nitrogen"}),s.jsx("th",{children:"Oxygen"}),s.jsx("th",{children:"Mean ambient temp t"})]})}),s.jsx("tbody",{children:s.jsxs("tr",{children:[s.jsxs("td",{children:[Gn(H.derived.C)," %"]}),s.jsxs("td",{children:[Gn(H.derived.H)," %"]}),s.jsxs("td",{children:[Gn(H.derived.N)," %"]}),s.jsxs("td",{children:[Gn(H.derived.O)," %"]}),s.jsxs("td",{children:[Gn(H.derived.t)," °C"]})]})})]})]}),s.jsxs("div",{className:"output-table-wrap",children:[s.jsx("h3",{children:"Efficiency Tabulation (Heat Loss Method)"}),s.jsxs("table",{className:"output-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Symbol"}),s.jsx("th",{children:"Particulars"}),s.jsx("th",{children:"Value"}),s.jsx("th",{children:"Unit"}),s.jsx("th",{children:"% of GCV"}),s.jsx("th",{children:"Workbook cell"})]})}),s.jsxs("tbody",{children:[H.tabulation.map(_=>{const J=_.loss&&(!_.optional||H.includedRadiation);return s.jsxs("tr",{style:_.loss?void 0:{opacity:.75},children:[s.jsx("td",{children:_.sym}),s.jsxs("td",{children:[_.label,_.optional&&!H.includedRadiation?" (not in total)":""]}),s.jsx("td",{children:Gn(_.value)}),s.jsx("td",{children:_.uom}),s.jsx("td",{children:_.loss?Re(_.value/(parseFloat(r.GCV)||NaN)*100)+(J?"":" *"):""}),s.jsx("td",{children:_.cell})]},_.cell)}),s.jsxs("tr",{children:[s.jsx("td",{}),s.jsx("td",{children:s.jsx("strong",{children:"Total Loss"})}),s.jsx("td",{children:s.jsx("strong",{children:Gn(H.totalKcal)})}),s.jsx("td",{children:"kcal/kg"}),s.jsx("td",{children:s.jsx("strong",{children:Re(H.totalPct)})}),s.jsx("td",{children:"E55 / E56"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"ηboiler"}),s.jsx("td",{children:s.jsx("strong",{children:"Boiler Efficiency = 100 − Total Loss %"})}),s.jsx("td",{children:s.jsx("strong",{children:Gn(H.efficiency)})}),s.jsx("td",{children:"%"}),s.jsx("td",{}),s.jsx("td",{children:"E58"})]})]})]})]})]}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-secondary",onClick:Y,children:[s.jsx(Vo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function Sh(){return s.jsx(Ft,{active:"/is-13890",children:s.jsx(Ch,{})})}const wl=["M","A","VM","FC","GCV","S","Cba","Cfa","Pfa","Pba","O2out","COout","Tgo","Tref"],Gp={M:"Moisture — Item 37",A:"Ash — Item 40",VM:"Volatile Matter — Item 38",FC:"Fixed Carbon — Item 39",GCV:"HHV, as fired — Item 41",S:"Sulfur — Item 47",Cba:"Unburnt Carbon — Bottom Ash",Cfa:"Unburnt Carbon — Fly Ash",Pfa:"% Fly Ash in Total Ash",Pba:"% Bottom Ash in Total Ash",O2out:"O₂, dry — Item 33",COout:"CO, dry — Item 34",Tgo:"Flue-Gas Temp Leaving Boiler — Item 13",Tref:"Reference Air Temp — Items 10/11"},Sn=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function Nh(e){const n={...e},t=Sn(n,"M"),r=Sn(n,"A"),o=Sn(n,"VM"),a=Sn(n,"FC"),l=Sn(n,"S");n.Ca=.97*a+.7*(o+.1*r)-t*(.6-.01*t),n.H=.036*a+.086*(o-.1*r)-.0035*t*t*(1-.02*t),n.N=2.1-.02*o,n.O=100-t-r-n.Ca-l-n.H-n.N;const i=Sn(n,"Pfa")||80,u=Sn(n,"Pba")||20;return n.Cash=i/100*Sn(n,"Cfa")+u/100*Sn(n,"Cba"),n}function jl(e){const n=Nh(e),t=D=>Sn(n,D),r=t("GCV"),o=t("S"),a=t("O2out"),l=t("COout"),i=t("Tgo"),u=t("Tref"),d=t("A"),h=t("M"),g=t("Ca"),p=t("H"),y=t("Cash"),k=n.Lrad===void 0||isNaN(n.Lrad)?1:n.Lrad,w=n.Lunm===void 0||isNaN(n.Lunm)?.5:n.Lunm,T=l/1e6*100,f=19.3-a,c=100-f-a-T,m=.2682*c-(a-T/2)!==0?100*(a-T/2)/(.2682*c-(a-T/2)):0,b=100-y!==0?d/(100-y):0,L=d/100*(y/(100-y||1)),A=g-100*L,j=3*(f+T),C=j!==0?(11*f+8*a+7*(c+T))/j*(A/100+o/267):0,B=i-u,P=8077.8,Y=C*.24*B/r*100,H=h/100*(584+.45*B)/r*100,_=9*(p/100)*(584+.45*B)/r*100,J=100-y!==0?d/(100-y)*(y/100*P)/r*100:0,X=k,q=w,Z=Y+H+_+J+X+q,E=100-Z;return{CO2:f,N2:c,COoutp:T,ExcessAir:m,Ca:g,H:p,N:t("N"),O:t("O"),Cash:y,DryRefuse:b,U:L,CarbonBurned:A,MassDFG:C,dT:B,L65:Y,L66:H,L67:_,L68:J,L69:X,L70:q,TotalLosses:Z,BoilerEff:E,Lrad:k,Lunm:w,inputs:wl.map(D=>({id:D,label:Gp[D]||D,value:n[D]}))}}const Lh=[{target:"grid-general",icon:"GD",title:"General Data",sub:"4 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis — As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters — Flue Gas & Temps",sub:"4 parameters"}],Wp={"grid-general":[{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2out",name:"Avg. Flue Gas O₂, dry",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1,tag:{cls:"formula-tag",text:"Item 33"}},{id:"COout",name:"Avg. Flue Gas CO, dry",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1,tag:{cls:"formula-tag",text:"Item 34"}},{id:"Tgo",name:"Flue Gas Temp Leaving Boiler",sym:"Tgo",uom:"°C",kind:"",value:"135",readonly:!1,tag:{cls:"formula-tag",text:"Item 13"}},{id:"Tref",name:"Reference Air Temp",sym:"Tref",uom:"°C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},Qp=["grid-general","grid-proximate","grid-plant"],Ti=Qp.flatMap(e=>Wp[e]),Eh=Object.fromEntries(Ti.map(e=>[e.id,e.value??""])),Ah=new Set(Ti.filter(e=>!e.readonly).map(e=>e.id)),Ku=["Cba","Cfa","M","A","VM","FC","GCV","O2out","COout","Tgo"],Th={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},Xu={lossesOpen:!0,intermediateOpen:!0,processInputsOpen:!1,processComparisonOpen:!1},Oh=[["Date Range",e=>`${Ke(e.start)} → ${Ke(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>I(e.result.BoilerEff)],["Dry Flue Gas Loss (%) — 65",e=>I(e.result.L65)],["Moisture in Fuel (%) — 66",e=>I(e.result.L66)],["H₂ Combustion (%) — 67",e=>I(e.result.L67)],["Combustibles in Refuse (%) — 68",e=>I(e.result.L68)],["Radiation (%) — 69",e=>I(e.result.L69)],["Unmeasured Losses (%) — 70",e=>I(e.result.L70)],["Total Losses (%) — 71",e=>I(e.result.TotalLosses)]],Zu={background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"20px",color:"var(--text-bright)",width:"90px",outline:"none"},qu={display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},ec={fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"};function Fh(){const e=hr();N.useEffect(()=>{document.title="Boiler Efficiency Calculator — ASME-PTC 4.1"},[]);const[n,t]=N.useState("input"),[r,o]=N.useState(Eh),[a,l]=N.useState(new Set),[i,u]=N.useState(new Set),[d,h]=N.useState({}),[g,p]=N.useState(null),[y,k]=N.useState(null),w=ji(),[T,f]=N.useState(null),[c,m]=N.useState(null),[b,L]=N.useState(null),[A,j]=N.useState(null),[C,B]=N.useState(Xu),P=(S,O)=>o(K=>({...K,[S]:O})),Y=S=>h(O=>({...O,[S]:!O[S]})),H=(S,O)=>ki(y,S,O),_=()=>{const S={};return wl.forEach(O=>{S[O]=r[O]!==void 0?r[O]:0}),S.Lrad=b!==null?parseFloat(b)||0:void 0,S.Lunm=A!==null?parseFloat(A)||0:void 0,S},J=async S=>{p({cls:"loading",text:"⏳ Parsing all sheets…"});const O=new FormData;O.append("file",S);try{const R=await(await Ye("/api/upload",{method:"POST",body:O})).json();if(!R.ok)throw new Error(R.error||"Upload failed");xr(R,"ASME PTC 4.1");const x={...r},M=new Set;let Q=0;for(const[ie,ge]of Object.entries(R.extracted||{}))Ah.has(ie)&&(x[ie]=String(typeof ge=="number"?parseFloat(ge.toFixed(6)):ge),M.add(ie),Q++);const G=R.missingFields||[],le=new Set;for(const ie of G){const ge=ie.id||ie;Ti.some(Be=>Be.id===ge)&&le.add(ge)}o(x),l(M),u(le),k(R),w.setProcesses([]),m(null),p({cls:"success",node:bi({data:R,populated:Q,fieldDetail:R.fieldDetail||{},missingFieldsList:G,strategyLabel:Fp,derivedLabel:"↳ defaulted from Secondary Air",bee:!1})}),e(`Excel imported — ${Q} fields auto-populated from "${R.primarySheet||""}"`,"success")}catch(K){p({cls:"error",text:`✗ ${K.message}`}),e(K.message,"error")}},X=()=>{const S=w.processes.filter(R=>R.start||R.end);if(!S.length){const R=jl(_());m(null),f(R),L(String(R.Lrad)),j(String(R.Lunm)),t("output");return}const O=_(),K=S.map(R=>{const{avg:x,rowCount:M}=H(R.start,R.end);return{title:R.title||"Process",start:R.start,end:R.end,rowCount:M,result:jl({...O,...x})}});m(K),f(K[0].result),L(null),j(null),t("output")},q=(S,O)=>{const K=S==="Lrad"?O:b,R=S==="Lunm"?O:A;if(S==="Lrad"?L(O):j(O),!T)return;const x={...T};x.Lrad=parseFloat(K)||0,x.Lunm=parseFloat(R)||0,x.L69=x.Lrad,x.L70=x.Lunm,x.TotalLosses=x.L65+x.L66+x.L67+x.L68+x.L69+x.L70,x.BoilerEff=100-x.TotalLosses,f(x)},Z=()=>{o(S=>{const O={...S};return Object.entries(Th).forEach(([K,R])=>{K in O&&(O[K]=String(R))}),O}),l(S=>{const O=new Set(S);return Ku.forEach(K=>O.delete(K)),O}),u(S=>{const O=new Set(S);return Ku.forEach(K=>O.delete(K)),O}),k(null),w.setProcesses([]),m(null),f(null),L(null),j(null),B(Xu),p(null)},E=S=>B(O=>({...O,[S]:!O[S]}));let D=null,$=null;if(c){const S=c,O=new Set;S.forEach(R=>Object.keys(H(R.start,R.end).avg).forEach(x=>O.add(x)));const K=wl.filter(R=>O.has(R));D=s.jsxs(s.Fragment,{children:[S.map((R,x)=>s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:R.title}),s.jsxs("div",{className:"kpi-value",children:[I(R.result.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[Ke(R.start)," → ",Ke(R.end)," · ",R.rowCount," row",R.rowCount===1?"":"s"]})]},x)),S.length===2&&s.jsx(Ci,{p1:S[0],p2:S[1],eff1:S[0].result.BoilerEff,eff2:S[1].result.BoilerEff})]}),$=s.jsxs(s.Fragment,{children:[s.jsx(Si,{list:S,perProcessIds:K,labels:Gp,page:"asme",open:C.processInputsOpen,onToggle:()=>E("processInputsOpen")}),s.jsx(Ni,{list:S,rows:Oh,page:"asme",open:C.processComparisonOpen,onToggle:()=>E("processComparisonOpen")})]})}else if(T&&b!==null){const S=T;D=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),s.jsxs("div",{className:"kpi-value boiler-eff-val",children:[I(S.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"ASME PTC 4.1 — Losses Method, HHV basis"})]}),s.jsx(Ae,{cls:"kpi-red",label:s.jsxs(s.Fragment,{children:["Dry Flue Gas Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 65)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[I(S.L65),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-blue",label:s.jsxs(s.Fragment,{children:["Moisture in Fuel Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 66)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[I(S.L66),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-green",label:s.jsxs(s.Fragment,{children:["H","₂"," Combustion Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 67)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[I(S.L67),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsx(Ae,{cls:"kpi-amber",label:s.jsxs(s.Fragment,{children:["Combustibles in Refuse ",s.jsx("span",{style:{opacity:.6},children:"(Item 68)"})]}),children:s.jsxs("div",{className:"kpi-value",children:[I(S.L68),s.jsx("span",{className:"kpi-unit",children:"%"})]})}),s.jsxs("div",{className:"kpi-card kpi-red",children:[s.jsxs("div",{className:"kpi-label",children:["Radiation Loss ",s.jsx("span",{style:{opacity:.6},children:"(Item 69)"})]}),s.jsxs("div",{style:qu,children:[s.jsx("input",{type:"number",id:"Lrad",value:b,onChange:O=>q("Lrad",O.target.value),style:Zu}),s.jsx("span",{style:ec,children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"ABMA curve / measured — enter & recalculate"})]}),s.jsxs("div",{className:"kpi-card kpi-blue",children:[s.jsxs("div",{className:"kpi-label",children:["Unmeasured Losses ",s.jsx("span",{style:{opacity:.6},children:"(Item 70)"})]}),s.jsxs("div",{style:qu,children:[s.jsx("input",{type:"number",id:"Lunm",value:A??"",onChange:O=>q("Lunm",O.target.value),style:Zu}),s.jsx("span",{style:ec,children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Mutually agreed value — enter & recalculate"})]})]}),$=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-section",children:[s.jsxs(jo,{open:C.lossesOpen,onClick:()=>E("lossesOpen"),children:["Heat-Loss Efficiency — Items 65","–","72"]}),C.lossesOpen&&s.jsxs(s.Fragment,{children:[s.jsx(dr,{b:"Item"}),s.jsx(se,{name:"Dry Flue Gas Loss",sym:"65",val:S.L65,uom:"%"}),s.jsx(se,{name:"Moisture in Fuel",sym:"66",val:S.L66,uom:"%"}),s.jsx(se,{name:"Water from H₂ Combustion",sym:"67",val:S.L67,uom:"%"}),s.jsx(se,{name:"Combustibles in Refuse",sym:"68",val:S.L68,uom:"%"}),s.jsx(se,{name:"Radiation",sym:"69",val:S.L69,uom:"%"}),s.jsx(se,{name:"Unmeasured Losses",sym:"70",val:S.L70,uom:"%"}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Total Losses"}),s.jsx("span",{className:"out-sym",children:"71"}),s.jsx("span",{className:"out-val",id:"losses-total-val",children:I(S.TotalLosses)}),s.jsx("span",{className:"out-uom",children:"%"})]}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Boiler Efficiency"}),s.jsx("span",{className:"out-sym",children:"72"}),s.jsx("span",{className:"out-val",id:"losses-eff-val",children:I(S.BoilerEff)}),s.jsx("span",{className:"out-uom",children:"%"})]})]})]}),s.jsxs("div",{className:"output-section",children:[s.jsx(jo,{open:C.intermediateOpen,onClick:()=>E("intermediateOpen"),children:"Intermediate Values"}),C.intermediateOpen&&s.jsxs(s.Fragment,{children:[s.jsx(dr,{b:"Item"}),s.jsx(se,{name:"CO₂, dry",sym:"32",val:S.CO2,uom:"%"}),s.jsx(se,{name:"N₂, dry (by difference)",sym:"35",val:S.N2,uom:"%"}),s.jsx(se,{name:"Excess Air",sym:"36",val:S.ExcessAir,uom:"%"}),s.jsx(se,{name:"Carbon, as fired (ultimate)",sym:"43",val:S.Ca,uom:"%"}),s.jsx(se,{name:"Hydrogen, as fired (ultimate)",sym:"44",val:S.H,uom:"%"}),s.jsx(se,{name:"Dry Refuse per Unit Fuel",sym:"22",val:S.DryRefuse,uom:"—"}),s.jsx(se,{name:"Carbon Burned per Unit Fuel",sym:"24",val:S.CarbonBurned,uom:"%"}),s.jsx(se,{name:"Dry Flue Gas per Unit Fuel",sym:"25",val:S.MassDFG,uom:"—"})]})]})]})}return s.jsxs("div",{className:"container",children:[s.jsx(Ot,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"ASME-PTC 4.1"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(gr,{description:"Upload your data sheet — matching input fields will be auto-populated, same detection as CENPEEP.",onFile:J,status:g}),s.jsx(wi,{uploadData:y,processes:w.processes,onAdd:w.add,onRemove:w.remove,onTitle:w.setTitle,onDate:w.setDate}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-ghost",onClick:Z,children:[s.jsx(fs,{}),"Reset to Defaults"]}),s.jsxs("button",{className:"btn btn-primary",onClick:X,title:"ASME PTC 4.1 — Losses Method",children:[s.jsx(ps,{}),"Calculate Efficiency"]})]}),s.jsx(ur,{cards:Lh,open:d,onToggle:Y}),Qp.map(S=>s.jsx(cr,{id:S,fields:Wp[S],open:!!d[S],values:r,onChange:P,detected:a,missing:i},S))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:D}),s.jsx("div",{id:"output-tables",children:$}),s.jsx("div",{className:"download-bar",children:s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})})]})]})}function Ph(){return s.jsx(Ft,{active:"/asme-ptc-4-1",children:s.jsx(Fh,{})})}const Co=["BL","SP","O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","S","M","A","GCV","Cba","Cfa","GCVba","GCVfa","L6"],So={BL:"Boiler Load (TPH)",SP:"Steam Pressure (kg/cm²)",O2fg:"O2 in Flue Gas (%)",COfg:"CO in Flue Gas (ppm)",CO2fg:"CO2 in Flue Gas (%)",Tfg:"Avg. Flue Gas Temperature (°C)",Tamb:"Ambient Temperature (°C)",Hum:"Humidity in Ambient Air (kg/kg dry air)",C:"Carbon (%)",H2:"Hydrogen (%)",N2:"Nitrogen (%)",O2f:"Oxygen (%)",S:"Sulphur (%)",M:"Moisture (%)",A:"Ash Content (%)",GCV:"GCV of Coal (kcal/kg)",Cba:"Unburnt in Bottom Ash (%)",Cfa:"Unburnt in Fly Ash (%)",GCVba:"GCV of Bottom Ash (kcal/kg)",GCVfa:"GCV of Fly Ash (kcal/kg)",L6:"Radiation & Unaccounted Losses (%)"},Ih=["BL","SP"],Mh=(e,n)=>{const t=parseFloat(e[n]);return isNaN(t)?0:t};function Ys(e){const n=O=>Mh(e,O),t=n("O2fg");n("COfg");const r=n("CO2fg"),o=n("Tfg"),a=n("Tamb"),l=n("Hum"),i=n("C"),u=n("H2"),d=n("N2"),h=n("O2f"),g=n("S"),p=n("M"),y=n("A"),k=n("GCV"),w=n("Cba"),T=n("Cfa"),f=n("GCVba"),c=n("GCVfa"),m=n("L6"),b=(11.6*i+34.8*(u-h/8)+4.35*g)/100,L=t/(21-t)*100,A=(1+L/100)*b,j=i/100*(44/12)+d/100+A*(77/100)+(A-b)*(23/100)+g/100*(64/32),C=.24,B=.45,P=j*C*(o-a)/k*100,Y=9*(u/100)*(584+B*(o-a))/k*100,H=p/100*(584+B*(o-a))/k*100,_=A*(l/10)*B*(o-a)/k*100,J=i/100+r/5654/k/100,Z=T/100*(y/100)*c*100/k,$=w/100*(y/100)*f*100/k,S=100-(P+Y+H+_+J+m+Z+$);return{TA:b,EA:L,AAS:A,m:j,L1:P,L2:Y,L3:H,L4:_,L5:J,L6:m,L7:Z,L8:$,BoilerEff:S,heatInput:k,inputs:Co.map(O=>({id:O,label:So[O]||O,value:e[O]}))}}const _h=[{target:"grid-general",icon:"GD",title:"General Data",sub:"2 parameters"},{target:"grid-fluegas",icon:"FG",title:"Flue Gas & Atmospheric Air",sub:"6 parameters"},{target:"grid-fuel",icon:"FA",title:"Fuel Analysis — Ultimate",sub:"8 parameters"},{target:"grid-ash",icon:"AA",title:"Ash Analysis",sub:"4 parameters"},{target:"grid-other",icon:"OL",title:"Other Losses",sub:"1 parameter"}],Jp={"grid-general":[{id:"BL",name:"Boiler Load",sym:"BL",uom:"TPH",kind:"field-info",value:"20",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}},{id:"SP",name:"Steam Pressure",sym:"SP",uom:"kg/cm²",kind:"field-info",value:"66",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}}],"grid-fluegas":[{id:"O2fg",name:"O₂ in Flue Gas",sym:"O2fg",uom:"%",kind:"",value:"9",readonly:!1},{id:"COfg",name:"CO in Flue Gas",sym:"COfg",uom:"ppm",kind:"",value:"800",readonly:!1},{id:"CO2fg",name:"CO₂ in Flue Gas",sym:"CO2fg",uom:"%",kind:"",value:"10.67",readonly:!1},{id:"Tfg",name:"Average Flue Gas Temperature",sym:"Tfg",uom:"°C",kind:"",value:"180",readonly:!1},{id:"Tamb",name:"Ambient Temperature",sym:"Tamb",uom:"°C",kind:"",value:"29.3",readonly:!1},{id:"Hum",name:"Humidity in Ambient Air",sym:"Hum",uom:"kg/kg dry air",kind:"",value:"0.1977",readonly:!1,step:"0.0001"}],"grid-fuel":[{id:"C",name:"Carbon",sym:"C",uom:"%",kind:"",value:"53.65",readonly:!1},{id:"H2",name:"Hydrogen",sym:"H2",uom:"%",kind:"",value:"3.25",readonly:!1},{id:"N2",name:"Nitrogen",sym:"N2",uom:"%",kind:"",value:"1.11",readonly:!1},{id:"O2f",name:"Oxygen",sym:"O2f",uom:"%",kind:"",value:"8.68",readonly:!1},{id:"S",name:"Sulphur",sym:"S",uom:"%",kind:"",value:"0.34",readonly:!1},{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"14.43",readonly:!1},{id:"A",name:"Ash Content",sym:"A",uom:"%",kind:"",value:"18.54",readonly:!1},{id:"GCV",name:"GCV of Coal",sym:"GCV",uom:"kcal/kg",kind:"",value:"4291",readonly:!1}],"grid-ash":[{id:"Cba",name:"Unburnt in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"0.11",readonly:!1},{id:"Cfa",name:"Unburnt in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"4.89",readonly:!1},{id:"GCVba",name:"GCV of Bottom Ash",sym:"GCVba",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"GCVfa",name:"GCV of Fly Ash",sym:"GCVfa",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-other":[{id:"L6",name:"Radiation & Unaccounted Losses",sym:"L6",uom:"%",kind:"field-manual",value:"1",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]},Yp=["grid-general","grid-fluegas","grid-fuel","grid-ash","grid-other"],Oi=Yp.flatMap(e=>Jp[e]),Bh=Object.fromEntries(Oi.map(e=>[e.id,e.value??""])),Dh=new Set(Oi.filter(e=>!e.readonly).map(e=>e.id)),zh=Co.filter(e=>!Ih.includes(e)),Rh=["L6","S","GCVba","GCVfa"],Uh=e=>zh.filter(n=>!Rh.includes(n)&&!(n in e)).map(n=>({id:n,label:So[n]||n})),Vh={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},$h=[["Date Range",e=>`${Ke(e.start)} → ${Ke(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>I(e.result.BoilerEff)],["Dry Flue Gas (%) — L1",e=>I(e.result.L1)],["H₂ in Fuel (%) — L2",e=>I(e.result.L2)],["Moisture in Fuel (%) — L3",e=>I(e.result.L3)],["Moisture in Air (%) — L4",e=>I(e.result.L4)],["Partial C→CO (%) — L5",e=>I(e.result.L5)],["Radiation & Unaccounted (%) — L6",e=>I(e.result.L6)],["Unburnt Fly Ash (%) — L7",e=>I(e.result.L7)],["Unburnt Bottom Ash (%) — L8",e=>I(e.result.L8)]],Fn=({name:e,sym:n,kcal:t,pct:r})=>s.jsxs("div",{className:"output-row",children:[s.jsx("span",{className:"out-name",children:e}),s.jsx("span",{className:"out-sym",children:n}),s.jsx("span",{className:"out-val",children:I(t)}),s.jsxs("span",{className:"out-uom",children:[I(r),"%"]})]});function Hh(){const e=hr();N.useEffect(()=>{document.title="Boiler Efficiency Calculator — BEE"},[]);const[n,t]=N.useState("input"),[r,o]=N.useState(Bh),[a,l]=N.useState(new Set),[i,u]=N.useState(new Set),[d,h]=N.useState({}),[g,p]=N.useState(null),[y,k]=N.useState(null),[w,T]=N.useState(null),f=ji(),[c,m]=N.useState(null),[b,L]=N.useState(null),[A,j]=N.useState(""),[C,B]=N.useState({processInputsOpen:!1,processComparisonOpen:!1}),P=(x,M)=>o(Q=>({...Q,[x]:M})),Y=x=>h(M=>({...M,[x]:!M[x]})),H=(x,M)=>ki(y,x,M,!0),_=()=>{const x={};return Co.forEach(M=>{x[M]=r[M]!==void 0?r[M]:0}),x},J=async x=>{p({cls:"loading",text:"⏳ Parsing all sheets…"});const M=new FormData;M.append("file",x);try{const G=await(await Ye("/api/upload",{method:"POST",body:M})).json();if(!G.ok)throw new Error(G.error||"Upload failed");xr(G,"BEE");const le={...G.extracted||{},...G.beeOverrides||{}},ie={...r},ge=new Set;let Be=0;for(const[Fe,On]of Object.entries(le))Dh.has(Fe)&&(ie[Fe]=String(typeof On=="number"?parseFloat(On.toFixed(6)):On),ge.add(Fe),Be++);const sn=Uh(le),pn=new Set;for(const Fe of sn)Oi.some(On=>On.id===Fe.id)&&pn.add(Fe.id);const Tn={...G,missingFields:sn};o(ie),l(ge),u(pn),T(G.filename),k(Tn),f.setProcesses([]),L(null);const jn={...G.fieldDetail||{}};for(const Fe of Object.keys(G.beeOverrides||{}))jn[Fe]={label:So[Fe]||Fe,header:"LAB sheet (lab-tested reading)",source:"rule",confidence:1};p({cls:Be?"success":"",node:bi({data:G,populated:Be,fieldDetail:jn,missingFieldsList:sn,strategyLabel:rh,derivedLabel:"↳ defaulted",bee:!0})}),e(Be?`Excel imported — ${Be} fields auto-populated`:"Sheet parsed — BEE field detection not configured yet",Be?"success":"info")}catch(Q){p({cls:"error",text:`✗ ${Q.message}`}),e(Q.message,"error")}},X=()=>{const x=f.processes.filter(G=>G.start||G.end);if(!x.length){const G=Ys(_());L(null),m(G),j(String(G.L6)),t("output");return}const M=_(),Q=x.map(G=>{const{avg:le,rowCount:ie}=H(G.start,G.end);return{title:G.title||"Process",start:G.start,end:G.end,rowCount:ie,result:Ys({...M,...le})}});L(Q),m(Q[0].result),t("output")},q=x=>{if(j(x),!c)return;const M=parseFloat(x)||0,Q=_();Q.L6=M,P("L6",String(M)),m(Ys(Q))},Z=()=>{o(x=>{const M={...x};return Object.entries(Vh).forEach(([Q,G])=>{Q in M&&(M[Q]=String(G))}),M}),T(null),k(null),f.setProcesses([]),L(null),m(null),B({processInputsOpen:!1,processComparisonOpen:!1}),p(null)},E=async()=>{if(!c){e("Calculate first before saving.","error");return}const x=window.prompt("Session name (optional):",w||"");if(x===null)return;const M=c,Q={sessionName:x.trim(),sourceFile:w||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:M.inputs,results:{method:"BEE-2 Indirect",BoilerEff:M.BoilerEff,L1:M.L1,L2:M.L2,L3:M.L3,L4:M.L4,L5:M.L5,L6:M.L6,L7:M.L7,L8:M.L8,TA:M.TA,EA:M.EA,AAS:M.AAS,m:M.m}};try{const le=await(await Ye("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Q)})).json();if(!le.ok)throw new Error(le.error);e("✓ Session saved to MongoDB!","success")}catch(G){e("Save failed: "+G.message,"error")}},D=()=>{if(!c){e("Calculate first.","error");return}const x=c,M=new Date().toISOString().slice(0,19).replace("T"," ");let Q=`BEE-2 Indirect Boiler Efficiency Report
Generated:,${M}

INPUTS
Parameter,Value
`;x.inputs.forEach(G=>{Q+=`"${G.label}",${G.value}
`}),Q+=`
LOSSES
Parameter,Symbol,Value (%),kcal/kg of coal
`,[["Dry Flue Gas","L1",x.L1],["Hydrogen in Fuel","L2",x.L2],["Moisture in Fuel","L3",x.L3],["Moisture in Air","L4",x.L4],["Partial Combustion C→CO","L5",x.L5],["Radiation & Unaccounted","L6",x.L6],["Unburnt in Fly Ash","L7",x.L7],["Unburnt in Bottom Ash","L8",x.L8]].forEach(([G,le,ie])=>{Q+=`"${G}","${le}",${ie.toFixed(4)},${(x.heatInput*ie/100).toFixed(2)}
`}),Q+=`
"Boiler Efficiency","eta",${x.BoilerEff.toFixed(4)},
`,jt(new Blob([Q],{type:"text/csv"}),`bee_indirect_report_${M.replace(/[: ]/g,"_")}.csv`)},$=()=>{if(!c){e("Calculate first.","error");return}const x=c,M=new Date().toLocaleString(),Q=window.open("","_blank");Q.document.write(`<!DOCTYPE html><html><head><title>BEE-2 Indirect Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}
  h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}
  table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}
  td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}
  .hl{background:#e6fff5!important;font-weight:bold}.meta{color:#666;font-size:11px;margin-bottom:16px}
  </style></head><body>
  <h1>BEE-2 Indirect Boiler Efficiency Report</h1><p class="meta">Generated: ${M}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${x.inputs.map(G=>`<tr><td>${G.label}</td><td>${G.value}</td></tr>`).join("")}</table>
  <h2>Heat Balance</h2><table><tr><th>Parameter</th><th>Symbol</th><th>kcal/kg coal</th><th>% loss</th></tr>
  <tr><td>Heat Input</td><td></td><td>${I(x.heatInput)}</td><td>100.00</td></tr>
  <tr><td>Dry Flue Gas</td><td>L1</td><td>${I(x.heatInput*x.L1/100)}</td><td>${I(x.L1)}</td></tr>
  <tr><td>Hydrogen in Fuel</td><td>L2</td><td>${I(x.heatInput*x.L2/100)}</td><td>${I(x.L2)}</td></tr>
  <tr><td>Moisture in Fuel</td><td>L3</td><td>${I(x.heatInput*x.L3/100)}</td><td>${I(x.L3)}</td></tr>
  <tr><td>Moisture in Air</td><td>L4</td><td>${I(x.heatInput*x.L4/100)}</td><td>${I(x.L4)}</td></tr>
  <tr><td>Partial Combustion C→CO</td><td>L5</td><td>${I(x.heatInput*x.L5/100)}</td><td>${I(x.L5)}</td></tr>
  <tr><td>Radiation &amp; Unaccounted</td><td>L6</td><td>${I(x.heatInput*x.L6/100)}</td><td>${I(x.L6)}</td></tr>
  <tr><td>Unburnt in Fly Ash</td><td>L7</td><td>${I(x.heatInput*x.L7/100)}</td><td>${I(x.L7)}</td></tr>
  <tr><td>Unburnt in Bottom Ash</td><td>L8</td><td>${I(x.heatInput*x.L8/100)}</td><td>${I(x.L8)}</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>η</td><td></td><td><b>${I(x.BoilerEff)}</b></td></tr>
  </table><script>window.print();<\/script></body></html>`),Q.document.close()},S=async()=>{const x=y;if(!x||!x.fieldDetail||!Object.keys(x.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}const M={filename:x.filename,primarySheet:x.primarySheet,fieldDetail:x.fieldDetail,extracted:x.extracted,missingFields:x.missingFields};try{const Q=await Ye("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(M)});if(!Q.ok){const ge=await Q.json().catch(()=>({}));throw new Error(ge.error||`Report generation failed (${Q.status})`)}const G=await Q.blob(),ie=(Q.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);jt(G,ie?ie[1]:"BEE_Field_Report.docx"),e("✓ Field report downloaded","success")}catch(Q){e("Report failed: "+Q.message,"error")}},O=x=>B(M=>({...M,[x]:!M[x]}));let K=null,R=null;if(b){const x=b,M=new Set;x.forEach(G=>Object.keys(H(G.start,G.end).avg).forEach(le=>M.add(le)));const Q=Co.filter(G=>M.has(G));K=s.jsxs(s.Fragment,{children:[x.map((G,le)=>s.jsxs("div",{className:"kpi-card kpi-green",children:[s.jsx("div",{className:"kpi-label",children:G.title}),s.jsxs("div",{className:"kpi-value",children:[I(G.result.BoilerEff),s.jsx("span",{className:"kpi-unit",children:"%"})]}),s.jsxs("div",{className:"kpi-sub",children:[Ke(G.start)," → ",Ke(G.end)," · ",G.rowCount," row",G.rowCount===1?"":"s"]})]},le)),x.length===2&&s.jsx(Ci,{p1:x[0],p2:x[1],eff1:x[0].result.BoilerEff,eff2:x[1].result.BoilerEff})]}),R=s.jsxs(s.Fragment,{children:[s.jsx(Si,{list:x,perProcessIds:Q,labels:So,page:"bee",open:C.processInputsOpen,onToggle:()=>O("processInputsOpen")}),s.jsx(Ni,{list:x,rows:$h,page:"bee",open:C.processComparisonOpen,onToggle:()=>O("processComparisonOpen")})]})}else if(c){const x=c,M=({v:Q})=>s.jsxs("div",{className:"kpi-value",children:[I(Q),s.jsx("span",{className:"kpi-unit",children:"%"})]});K=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"kpi-card kpi-green",style:{gridColumn:"span 2"},children:[s.jsx("div",{className:"kpi-label",children:"Boiler Efficiency"}),s.jsx(M,{v:x.BoilerEff}),s.jsx("div",{className:"kpi-sub",children:"BEE-2 Indirect method (heat-loss)"})]}),s.jsx(Ae,{cls:"kpi-red",label:"L1 — Dry Flue Gas",children:s.jsx(M,{v:x.L1})}),s.jsx(Ae,{cls:"kpi-blue",label:"L2 — H₂ in Fuel",children:s.jsx(M,{v:x.L2})}),s.jsx(Ae,{cls:"kpi-blue",label:"L3 — Moisture in Fuel",children:s.jsx(M,{v:x.L3})}),s.jsx(Ae,{cls:"kpi-blue",label:"L4 — Moisture in Air",children:s.jsx(M,{v:x.L4})}),s.jsx(Ae,{cls:"kpi-amber",label:"L5 — Partial C→CO",children:s.jsx(M,{v:x.L5})}),s.jsxs("div",{className:"kpi-card kpi-amber",style:{gridColumn:"span 2"},children:[s.jsx("div",{className:"kpi-label",children:"L6 — Radiation & Unaccounted"}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[s.jsx("input",{type:"number",id:"L6live",value:A,onChange:Q=>q(Q.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),s.jsx("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),s.jsx("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),s.jsx(Ae,{cls:"kpi-amber",label:"L7 — Unburnt Fly Ash",children:s.jsx(M,{v:x.L7})}),s.jsx(Ae,{cls:"kpi-amber",label:"L8 — Unburnt Bottom Ash",children:s.jsx(M,{v:x.L8})})]}),R=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Heat Balance Summary"})}),s.jsx(dr,{c:"kcal/kg of coal",d:"% loss"}),s.jsx(Fn,{name:"Heat Input",sym:"",kcal:x.heatInput,pct:100}),s.jsx(Fn,{name:"Dry Flue Gas",sym:"L1",kcal:x.heatInput*x.L1/100,pct:x.L1}),s.jsx(Fn,{name:"Hydrogen in Fuel",sym:"L2",kcal:x.heatInput*x.L2/100,pct:x.L2}),s.jsx(Fn,{name:"Moisture in Fuel",sym:"L3",kcal:x.heatInput*x.L3/100,pct:x.L3}),s.jsx(Fn,{name:"Moisture in Air",sym:"L4",kcal:x.heatInput*x.L4/100,pct:x.L4}),s.jsx(Fn,{name:"Partial Combustion C→CO",sym:"L5",kcal:x.heatInput*x.L5/100,pct:x.L5}),s.jsx(Fn,{name:"Surface (Radiation) Losses",sym:"L6",kcal:x.heatInput*x.L6/100,pct:x.L6}),s.jsx(Fn,{name:"Unburnt in Fly Ash",sym:"L7",kcal:x.heatInput*x.L7/100,pct:x.L7}),s.jsx(Fn,{name:"Unburnt in Bottom Ash",sym:"L8",kcal:x.heatInput*x.L8/100,pct:x.L8}),s.jsxs("div",{className:"output-row highlight-row2",children:[s.jsx("span",{className:"out-name",children:"Boiler Efficiency"}),s.jsx("span",{className:"out-sym",children:"η"}),s.jsx("span",{className:"out-val",children:I(x.BoilerEff)}),s.jsx("span",{className:"out-uom",children:"%"})]})]}),s.jsxs("div",{className:"output-section",children:[s.jsx("div",{className:"output-section-head",children:s.jsx("span",{children:"Intermediate Values"})}),s.jsx(dr,{}),s.jsx(se,{name:"Theoretical Air Required",sym:"TA",val:x.TA,uom:"kg/kg coal"}),s.jsx(se,{name:"Excess Air Supplied",sym:"EA",val:x.EA,uom:"%"}),s.jsx(se,{name:"Actual Air Supplied",sym:"AAS",val:x.AAS,uom:"kg/kg coal"}),s.jsx(se,{name:"Mass of Dry Flue Gas",sym:"m",val:x.m,uom:"kg/kg coal"})]})]})}return s.jsxs("div",{className:"container",children:[s.jsx(Ot,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"BEE"}),s.jsx("div",{className:"section-line"})]}),s.jsxs("div",{className:"tab-nav",children:[s.jsxs("button",{className:"tab-btn"+(n==="input"?" active":""),onClick:()=>t("input"),children:[s.jsx("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),s.jsxs("button",{className:"tab-btn"+(n==="output"?" active":""),onClick:()=>t("output"),children:[s.jsx("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),s.jsxs("div",{className:"page"+(n==="input"?" active":""),id:"page-input",children:[s.jsx(gr,{description:"Upload your file — matching input fields will be auto-populated automatically.",onFile:J,status:g}),s.jsx(wi,{uploadData:y,processes:f.processes,onAdd:f.add,onRemove:f.remove,onTitle:f.setTitle,onDate:f.setDate}),s.jsxs("div",{className:"action-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:X,children:[s.jsx(ps,{}),"Calculate Efficiency"]}),s.jsxs("button",{className:"btn btn-ghost",onClick:Z,children:[s.jsx(fs,{}),"Reset to Defaults"]})]}),s.jsx(ur,{cards:_h,open:d,onToggle:Y}),Yp.map(x=>s.jsx(cr,{id:x,fields:Jp[x],open:!!d[x],values:r,onChange:P,detected:a,missing:i},x))]}),s.jsxs("div",{className:"page"+(n==="output"?" active":""),id:"page-output",children:[s.jsx("div",{className:"output-summary",id:"kpi-area",children:K}),s.jsx("div",{id:"output-tables",children:R}),s.jsxs("div",{className:"download-bar",children:[s.jsxs("button",{className:"btn btn-primary",onClick:E,children:[s.jsx(Lp,{}),"Save to Database"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:D,children:[s.jsx(wo,{}),"Download CSV"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:$,children:[s.jsx(wo,{}),"Download PDF"]}),s.jsxs("button",{className:"btn btn-secondary",onClick:S,children:[s.jsx(Vo,{}),"Field Report (.docx)"]}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>t("input"),children:"← Back to Inputs"})]})]})]})}function Gh(){return s.jsx(Ft,{active:"/bee",extraStyle:"bee",children:s.jsx(Hh,{})})}const Wh={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},Qh={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},Jh={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},nc={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3},Yh=["L","Ffw","Fin","Cba","Cfa","M","A","VM","FC","GCV","O2in","O2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa"],Kh=["M","A","VM","FC","GCV","Cba","Cfa","O2out","COout","Tgo"],Xh=["O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","M","A","GCV","Cba","Cfa"],Kp=e=>typeof e=="number"&&isFinite(e)?e.toFixed(2):"—";function Ms(e,n){return{found:n.filter(r=>e&&Object.prototype.hasOwnProperty.call(e,r)).length,total:n.length}}function tc(e){const n=e.extracted||{},t=e.extractedBS2885||{},r=e.extractedIS13890||{},o={};try{const a=Bt({...Wh,...n});o.cenpeep={ok:!0,eff:a.BoilerEff,coverage:Ms(n,Yh)}}catch(a){o.cenpeep={ok:!1,error:a.message}}try{const a=jl({...Qh,...n});o.asme={ok:!0,eff:a.BoilerEff,coverage:Ms(n,Kh)}}catch(a){o.asme={ok:!1,error:a.message}}try{const a=Ys({...Jh,...n});o.bee={ok:!0,eff:a.BoilerEff,coverage:Ms(n,Xh)}}catch(a){o.bee={ok:!1,error:a.message}}try{const a=zp({...nc,...t});o.bs2885={ok:!0,effB:a.methodB.gross,effBnet:a.methodB.net,effA:a.methodA.gross,effAnet:a.methodA.net,coverage:{found:Object.keys(t).length,total:Object.keys(nc).length}}}catch(a){o.bs2885={ok:!1,error:a.message}}try{const a=Vp({...kh,...r});o.is13890={ok:!0,eff:a.efficiency,coverage:Ms(r,kl),detected:Object.keys(r).length>0}}catch(a){o.is13890={ok:!1,error:a.message}}return o}function Zh(e){const n=Math.max(0,Math.round((Date.now()-e)/1e3));if(n<60)return"just now";const t=Math.round(n/60);if(t<60)return`${t} min ago`;const r=Math.round(t/60);return r<24?`${r} hr ago`:`${Math.round(r/24)} day(s) ago`}const Lr=({cls:e,label:n,sub:t,value:r})=>s.jsxs("div",{className:"kpi-card "+e,children:[s.jsx("div",{className:"kpi-label",children:n}),s.jsx("div",{className:"kpi-value",children:r}),s.jsx("div",{className:"kpi-sub",children:t})]}),Er=({v:e})=>s.jsxs(s.Fragment,{children:[Kp(e),s.jsx("span",{className:"kpi-unit",children:"%"})]});function qh(){const e=hr();N.useEffect(()=>{document.title="Boiler Efficiency Calculator — Summary"},[]);const[n,t]=N.useState(null),[r,o]=N.useState(""),[a,l]=N.useState(null);N.useEffect(()=>{let y;try{const k=sessionStorage.getItem(Pp);if(!k)return;y=JSON.parse(k)}catch{return}if(!(!y||!y.extracted))try{const k=tc(y),w=["cenpeep","bs2885","asme","bee","is13890"].filter(T=>k[T].ok).length;t(k),o(`Auto-loaded from your last upload on the ${y.sourceTab||"another"} tab ("${y.filename||"file"}", ${Zh(y.savedAt)}) — ${w}/5 methods calculated. Upload a new file above to recalculate.`)}catch{}},[]);const i=async y=>{l({cls:"loading",text:"⏳ Parsing sheet and running all five methods…"});const k=new FormData;k.append("file",y);try{const T=await(await Ye("/api/upload",{method:"POST",body:k})).json();if(!T.ok)throw new Error(T.error||"Upload failed");xr(T,"Summary"),o("");const f=tc(T);t(f);const c=["cenpeep","bs2885","asme","bee","is13890"].filter(m=>f[m].ok).length;l({cls:"success",text:`✓ ${c}/5 methods calculated from "${T.filename}"`}),e(`Summary updated — ${c}/5 methods calculated`,c===5?"success":"error")}catch(w){l({cls:"error",text:`✗ ${w.message}`}),e(w.message,"error")}},u=n&&n.cenpeep,d=n&&n.bs2885,h=n&&n.asme,g=n&&n.bee,p=n&&n.is13890;return s.jsxs("div",{className:"container",children:[s.jsx(Ot,{}),s.jsxs("div",{className:"section-header",style:{marginTop:0},children:[s.jsx("div",{className:"section-label",children:"Summary — All Methods"}),s.jsx("div",{className:"section-line"})]}),s.jsx(gr,{description:"Upload one data sheet — CENPEEP, BS-2885, IS-13890, ASME-PTC 4.1 and BEE efficiencies are all calculated from it, each using only its own required input fields.",onFile:i,status:a}),!n&&s.jsx("div",{id:"summary-empty",style:{textAlign:"center",padding:"60px 20px",color:"var(--muted)",fontSize:"14px"},children:"Upload a data sheet above — or upload one on any other tab and come back here — to see Boiler Efficiency computed by all five methods side by side."}),r&&s.jsx("div",{id:"summary-source-note",style:{fontSize:"12px",color:"var(--muted)",margin:"-6px 0 14px",padding:"0 4px"},children:r}),n&&s.jsxs("div",{id:"summary-results",children:[s.jsxs("div",{className:"output-summary",id:"summary-kpi-area",children:[s.jsx(Lr,{cls:"kpi-green",label:"CENPEEP",sub:u.ok?`${u.coverage.found}/${u.coverage.total} fields detected`:u.error||"Could not calculate",value:u.ok?s.jsx(Er,{v:u.eff}):"—"}),s.jsx(Lr,{cls:"kpi-blue",label:"BS-2885 — Method B (indirect)",sub:d.ok?`Method A (direct): ${Kp(d.effA)}% · ${d.coverage.found}/${d.coverage.total} fields`:d.error||"Could not calculate",value:d.ok?s.jsx(Er,{v:d.effB}):"—"}),s.jsx(Lr,{cls:"kpi-green",label:"IS-13890 — Heat Loss Method",sub:p.ok?p.detected?`${p.coverage.found}/${p.coverage.total} fields detected`:"No IS-13890 form found in this file — sample values shown":p.error||"Could not calculate",value:p.ok&&p.detected?s.jsx(Er,{v:p.eff}):"—"}),s.jsx(Lr,{cls:"kpi-amber",label:"ASME PTC 4.1",sub:h.ok?`${h.coverage.found}/${h.coverage.total} fields detected`:h.error||"Could not calculate",value:h.ok?s.jsx(Er,{v:h.eff}):"—"}),s.jsx(Lr,{cls:"kpi-red",label:"BEE-2 Indirect",sub:g.ok?`${g.coverage.found}/${g.coverage.total} fields detected`:g.error||"Could not calculate",value:g.ok?s.jsx(Er,{v:g.eff}):"—"})]}),s.jsx("div",{id:"summary-detail-tables"})]})]})}function eg(){return s.jsx(Ft,{active:"/summary",children:s.jsx(qh,{})})}const Pr=e=>typeof e=="number"&&!isNaN(e)?e.toFixed(2):"—";function Xp(e){const n=new Date(e);return n.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})+"  "+n.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}const Ca=({icon:e,title:n,children:t})=>s.jsxs("div",{className:"empty-state",children:[s.jsx("div",{className:"empty-icon",children:e}),s.jsx("div",{className:"empty-title",children:n}),t!==void 0&&s.jsx("div",{className:"empty-sub",children:t})]}),_s=({children:e=" %"})=>s.jsx("span",{style:{fontSize:"12px",fontWeight:400,color:"var(--muted2)"},children:e});function ng({s:e,onOpen:n,onDelete:t}){const r=e.results||{},o=e.sessionName||(e.sourceFile&&e.sourceFile!=="Manual Entry"?e.sourceFile:null)||`Session ${e._id.slice(-6)}`;return s.jsxs("div",{className:"session-card",onClick:()=>n(e),children:[s.jsx("button",{className:"session-card-delete",onClick:a=>t(a,e._id),children:"🗑"}),s.jsxs("div",{className:"session-card-header",children:[s.jsxs("div",{children:[s.jsx("div",{className:"session-card-title",children:o}),s.jsx("div",{className:"session-card-date",children:Xp(e.uploadedAt||e.createdAt)})]}),s.jsx("div",{className:"session-card-source",title:e.sourceFile||"",children:e.sourceFile||"Manual"})]}),e.boilerType&&s.jsx("div",{className:"boiler-type-badge",style:{margin:"0 0 12px",display:"inline-block"},children:e.boilerType}),s.jsxs("div",{className:"session-kpis",children:[s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Boiler Eff."}),s.jsxs("div",{className:"session-kpi-value green",children:[Pr(r.BoilerEff),s.jsx(_s,{})]})]}),s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Corr. Eff."}),s.jsxs("div",{className:"session-kpi-value blue",children:[Pr(r.BoilerEffCorr),s.jsx(_s,{})]})]}),s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Dry Gas Loss"}),s.jsxs("div",{className:"session-kpi-value red",children:[Pr(r.Ldg),s.jsx(_s,{})]})]}),s.jsxs("div",{className:"session-kpi",children:[s.jsx("div",{className:"session-kpi-label",children:"Unburnt C Loss"}),s.jsxs("div",{className:"session-kpi-value amber",children:[Pr(r.Luc),s.jsx(_s,{})]})]})]})]})}const ve=({label:e,val:n,uom:t="",cls:r=""})=>s.jsxs("div",{className:"modal-row"+(r?" "+r:""),children:[s.jsx("span",{className:"modal-row-name",children:e}),s.jsx("span",{className:"modal-row-val",children:Pr(n)}),s.jsx("span",{className:"modal-row-uom",children:t})]});function tg({s:e,onClose:n}){const t=e.results||{};return s.jsx("div",{className:"modal-overlay open",id:"modal-overlay",onClick:r=>{r.target===r.currentTarget&&n()},children:s.jsxs("div",{className:"modal",id:"modal",children:[s.jsxs("div",{className:"modal-header",children:[s.jsx("h3",{id:"modal-title",children:e.sessionName||e.sourceFile||`Session ${e._id.slice(-6)}`}),s.jsx("button",{className:"modal-close",onClick:n,children:"✕"})]}),s.jsxs("div",{className:"modal-body",id:"modal-body",children:[s.jsxs("div",{style:{fontSize:"11px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",marginBottom:"18px"},children:["Source: ",e.sourceFile||"Manual","  |  Saved: ",Xp(e.uploadedAt||e.createdAt),e.boilerType?s.jsxs(s.Fragment,{children:["  |  Boiler: ",e.boilerType]}):null]}),s.jsx("div",{className:"modal-section-title",children:"Efficiency Results"}),s.jsx(ve,{label:"Boiler Efficiency (as-tested)",val:t.BoilerEff,uom:"%",cls:"modal-highlight"}),s.jsx(ve,{label:"Boiler Efficiency (corrected)",val:t.BoilerEffCorr,uom:"%",cls:"modal-highlight2"}),s.jsx("div",{className:"modal-section-title",children:"Losses"}),s.jsx(ve,{label:"Dry Gas Loss",val:t.Ldg,uom:"%"}),s.jsx(ve,{label:"Unburnt Carbon Loss",val:t.Luc,uom:"%"}),s.jsx(ve,{label:"Moisture in Fuel Loss",val:t.Lmf,uom:"%"}),s.jsx(ve,{label:"Hydrogen in Fuel Loss",val:t.Lhf,uom:"%"}),s.jsx(ve,{label:"CO Loss",val:t.Lco,uom:"%"}),s.jsx(ve,{label:"Moisture in Air Loss",val:t.Lma,uom:"%"}),s.jsx(ve,{label:"Radiation Loss",val:t.Lrad,uom:"%"}),s.jsx("div",{className:"modal-section-title",children:"Corrected Losses"}),s.jsx(ve,{label:"Dry Gas Loss (corr.)",val:t.Ldgc,uom:"%"}),s.jsx(ve,{label:"Unburnt Carbon Loss (corr.)",val:t.Lucc,uom:"%"}),s.jsx(ve,{label:"Moisture Fuel Loss (corr.)",val:t.Lmfc,uom:"%"}),s.jsx(ve,{label:"Hydrogen Fuel Loss (corr.)",val:t.Lhfc,uom:"%"}),s.jsx(ve,{label:"CO Loss (corr.)",val:t.Lcoc,uom:"%"}),s.jsx(ve,{label:"Moisture Air Loss (corr.)",val:t.Lmac,uom:"%"}),s.jsx("div",{className:"modal-section-title",children:"Intermediate Values"}),s.jsx(ve,{label:"CO₂ APH In",val:t.CO2in,uom:"%"}),s.jsx(ve,{label:"CO₂ APH Out",val:t.CO2out,uom:"%"}),s.jsx(ve,{label:"Weighted Air Temp In",val:t.Trai,uom:"°C"}),s.jsx(ve,{label:"AH Leakage",val:t.AL,uom:"%"}),s.jsx(ve,{label:"Gas Temp (Corrected)",val:t.Tgc,uom:"°C"}),e.inputs&&e.inputs.length>0&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"modal-section-title",children:"Input Parameters"}),e.inputs.map((r,o)=>s.jsx(ve,{label:r.label||r.id,val:parseFloat(r.value)},o))]})]})]})})}function rg(){N.useEffect(()=>{document.title="Boiler Efficiency — Sessions"},[]);const[e,n]=N.useState({phase:"loading",sessions:[],error:""}),[t,r]=N.useState(null),o=N.useCallback(async()=>{n(h=>({...h,phase:"loading"}));try{const g=await(await Ye("/api/sessions")).json();if(!g.ok)throw new Error(g.error);n({phase:"ready",sessions:g.sessions,error:""})}catch(h){n({phase:"error",sessions:[],error:h.message})}},[]);N.useEffect(()=>{o()},[o]),N.useEffect(()=>{const h=g=>{g.key==="Escape"&&r(null)};return document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h)},[]);const a=async(h,g)=>{if(h.stopPropagation(),!!window.confirm("Delete this session?"))try{await Ye(`/api/sessions/${g}`,{method:"DELETE"}),o()}catch{}},{phase:l,sessions:i,error:u}=e,d=l==="ready"?i.length===1?"1 session":`${i.length} sessions`:"—";return s.jsxs(s.Fragment,{children:[t&&s.jsx(tg,{s:t,onClose:()=>r(null)}),s.jsxs("div",{className:"container",children:[s.jsx(Ot,{}),s.jsxs("div",{className:"sessions-header",children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[s.jsx("h2",{children:"Saved Sessions"}),s.jsx("span",{className:"sessions-count",id:"sessions-count",children:d})]}),s.jsx("button",{className:"btn btn-ghost",onClick:o,style:{fontSize:"12px",padding:"8px 16px"},children:"↻ Refresh"})]}),s.jsxs("div",{id:"sessions-content",children:[l==="loading"&&s.jsx(Ca,{icon:"⏳",title:"Loading sessions…",children:"Fetching data from the database."}),l==="error"&&s.jsxs(Ca,{icon:"⚠️",title:"Could not load sessions",children:[u,s.jsx("br",{}),s.jsx("br",{}),"Make sure the server is running and MongoDB URI is configured in ",s.jsx("code",{children:".env"}),"."]}),l==="ready"&&!i.length&&s.jsx(Ca,{icon:"📋",title:"No sessions yet",children:'Run a calculation and click "Save to Database" to store a session here.'}),l==="ready"&&i.length>0&&s.jsx("div",{className:"session-grid",id:"session-grid",children:i.map(h=>s.jsx(ng,{s:h,onOpen:r,onDelete:a},h._id))})]})]})]})}function sg(){return s.jsx(Ft,{active:"/sessions",children:s.jsx(rg,{})})}const og={"/calculator":hh,"/bs-2885":vh,"/is-13890":Sh,"/asme-ptc-4-1":Ph,"/bee":Gh,"/summary":eg,"/sessions":sg};function ag(){const e=_0(),n=og[e],t=E0();return N.useEffect(()=>{n&&!t&&Cp("/")},[n,t]),n?t?s.jsx(n,{},e):null:s.jsx(W0,{})}gp(document.getElementById("root")).render(s.jsx(ag,{}));
