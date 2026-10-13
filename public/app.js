(()=>{var cg=Object.create;var Wd=Object.defineProperty;var dg=Object.getOwnPropertyDescriptor;var fg=Object.getOwnPropertyNames;var mg=Object.getPrototypeOf,pg=Object.prototype.hasOwnProperty;var fn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var bg=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of fg(t))!pg.call(e,l)&&l!==n&&Wd(e,l,{get:()=>t[l],enumerable:!(a=dg(t,l))||a.enumerable});return e};var V=(e,t,n)=>(n=e!=null?cg(mg(e)):{},bg(t||!e||!e.__esModule?Wd(n,"default",{value:e,enumerable:!0}):n,e));var uf=fn(Le=>{"use strict";function ws(e,t){var n=e.length;e.push(t);e:for(;0<n;){var a=n-1>>>1,l=e[a];if(0<No(l,t))e[a]=t,e[n]=l,n=a;else break e}}function mn(e){return e.length===0?null:e[0]}function Oo(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var a=0,l=e.length,i=l>>>1;a<i;){var o=2*(a+1)-1,r=e[o],s=o+1,d=e[s];if(0>No(r,n))s<l&&0>No(d,r)?(e[a]=d,e[s]=n,a=s):(e[a]=r,e[o]=n,a=o);else if(s<l&&0>No(d,n))e[a]=d,e[s]=n,a=s;else break e}}return t}function No(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Le.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Pd=performance,Le.unstable_now=function(){return Pd.now()}):(Ns=Date,ef=Ns.now(),Le.unstable_now=function(){return Ns.now()-ef});var Pd,Ns,ef,Tn=[],ea=[],gg=1,Ft=null,ft=3,Ms=!1,pi=!1,bi=!1,Ls=!1,af=typeof setTimeout=="function"?setTimeout:null,lf=typeof clearTimeout=="function"?clearTimeout:null,tf=typeof setImmediate<"u"?setImmediate:null;function ko(e){for(var t=mn(ea);t!==null;){if(t.callback===null)Oo(ea);else if(t.startTime<=e)Oo(ea),t.sortIndex=t.expirationTime,ws(Tn,t);else break;t=mn(ea)}}function zs(e){if(bi=!1,ko(e),!pi)if(mn(Tn)!==null)pi=!0,ul||(ul=!0,sl());else{var t=mn(ea);t!==null&&Ds(zs,t.startTime-e)}}var ul=!1,gi=-1,of=5,rf=-1;function sf(){return Ls?!0:!(Le.unstable_now()-rf<of)}function ks(){if(Ls=!1,ul){var e=Le.unstable_now();rf=e;var t=!0;try{e:{pi=!1,bi&&(bi=!1,lf(gi),gi=-1),Ms=!0;var n=ft;try{t:{for(ko(e),Ft=mn(Tn);Ft!==null&&!(Ft.expirationTime>e&&sf());){var a=Ft.callback;if(typeof a=="function"){Ft.callback=null,ft=Ft.priorityLevel;var l=a(Ft.expirationTime<=e);if(e=Le.unstable_now(),typeof l=="function"){Ft.callback=l,ko(e),t=!0;break t}Ft===mn(Tn)&&Oo(Tn),ko(e)}else Oo(Tn);Ft=mn(Tn)}if(Ft!==null)t=!0;else{var i=mn(ea);i!==null&&Ds(zs,i.startTime-e),t=!1}}break e}finally{Ft=null,ft=n,Ms=!1}t=void 0}}finally{t?sl():ul=!1}}}var sl;typeof tf=="function"?sl=function(){tf(ks)}:typeof MessageChannel<"u"?(Os=new MessageChannel,nf=Os.port2,Os.port1.onmessage=ks,sl=function(){nf.postMessage(null)}):sl=function(){af(ks,0)};var Os,nf;function Ds(e,t){gi=af(function(){e(Le.unstable_now())},t)}Le.unstable_IdlePriority=5;Le.unstable_ImmediatePriority=1;Le.unstable_LowPriority=4;Le.unstable_NormalPriority=3;Le.unstable_Profiling=null;Le.unstable_UserBlockingPriority=2;Le.unstable_cancelCallback=function(e){e.callback=null};Le.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):of=0<e?Math.floor(1e3/e):5};Le.unstable_getCurrentPriorityLevel=function(){return ft};Le.unstable_next=function(e){switch(ft){case 1:case 2:case 3:var t=3;break;default:t=ft}var n=ft;ft=t;try{return e()}finally{ft=n}};Le.unstable_requestPaint=function(){Ls=!0};Le.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=ft;ft=e;try{return t()}finally{ft=n}};Le.unstable_scheduleCallback=function(e,t,n){var a=Le.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?a+n:a):n=a,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:gg++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>a?(e.sortIndex=n,ws(ea,e),mn(Tn)===null&&e===mn(ea)&&(bi?(lf(gi),gi=-1):bi=!0,Ds(zs,n-a))):(e.sortIndex=l,ws(Tn,e),pi||Ms||(pi=!0,ul||(ul=!0,sl()))),e};Le.unstable_shouldYield=sf;Le.unstable_wrapCallback=function(e){var t=ft;return function(){var n=ft;ft=t;try{return e.apply(this,arguments)}finally{ft=n}}}});var df=fn((Zh,cf)=>{"use strict";cf.exports=uf()});var Cf=fn($=>{"use strict";var Us=Symbol.for("react.transitional.element"),vg=Symbol.for("react.portal"),yg=Symbol.for("react.fragment"),hg=Symbol.for("react.strict_mode"),xg=Symbol.for("react.profiler"),Sg=Symbol.for("react.consumer"),Cg=Symbol.for("react.context"),Ag=Symbol.for("react.forward_ref"),Eg=Symbol.for("react.suspense"),Tg=Symbol.for("react.memo"),gf=Symbol.for("react.lazy"),Ng=Symbol.for("react.activity"),ff=Symbol.iterator;function kg(e){return e===null||typeof e!="object"?null:(e=ff&&e[ff]||e["@@iterator"],typeof e=="function"?e:null)}var vf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},yf=Object.assign,hf={};function dl(e,t,n){this.props=e,this.context=t,this.refs=hf,this.updater=n||vf}dl.prototype.isReactComponent={};dl.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};dl.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function xf(){}xf.prototype=dl.prototype;function Hs(e,t,n){this.props=e,this.context=t,this.refs=hf,this.updater=n||vf}var Rs=Hs.prototype=new xf;Rs.constructor=Hs;yf(Rs,dl.prototype);Rs.isPureReactComponent=!0;var mf=Array.isArray;function _s(){}var Te={H:null,A:null,T:null,S:null},Sf=Object.prototype.hasOwnProperty;function Gs(e,t,n){var a=n.ref;return{$$typeof:Us,type:e,key:t,ref:a!==void 0?a:null,props:n}}function Og(e,t){return Gs(e.type,t,e.props)}function Vs(e){return typeof e=="object"&&e!==null&&e.$$typeof===Us}function wg(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var pf=/\/+/g;function Bs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?wg(""+e.key):t.toString(36)}function Mg(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(_s,_s):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function cl(e,t,n,a,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Us:case vg:o=!0;break;case gf:return o=e._init,cl(o(e._payload),t,n,a,l)}}if(o)return l=l(e),o=a===""?"."+Bs(e,0):a,mf(l)?(n="",o!=null&&(n=o.replace(pf,"$&/")+"/"),cl(l,t,n,"",function(d){return d})):l!=null&&(Vs(l)&&(l=Og(l,n+(l.key==null||e&&e.key===l.key?"":(""+l.key).replace(pf,"$&/")+"/")+o)),t.push(l)),1;o=0;var r=a===""?".":a+":";if(mf(e))for(var s=0;s<e.length;s++)a=e[s],i=r+Bs(a,s),o+=cl(a,t,n,i,l);else if(s=kg(e),typeof s=="function")for(e=s.call(e),s=0;!(a=e.next()).done;)a=a.value,i=r+Bs(a,s++),o+=cl(a,t,n,i,l);else if(i==="object"){if(typeof e.then=="function")return cl(Mg(e),t,n,a,l);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return o}function wo(e,t,n){if(e==null)return e;var a=[],l=0;return cl(e,a,"","",function(i){return t.call(n,i,l++)}),a}function Lg(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var bf=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},zg={map:wo,forEach:function(e,t,n){wo(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return wo(e,function(){t++}),t},toArray:function(e){return wo(e,function(t){return t})||[]},only:function(e){if(!Vs(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$.Activity=Ng;$.Children=zg;$.Component=dl;$.Fragment=yg;$.Profiler=xg;$.PureComponent=Hs;$.StrictMode=hg;$.Suspense=Eg;$.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Te;$.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Te.H.useMemoCache(e)}};$.cache=function(e){return function(){return e.apply(null,arguments)}};$.cacheSignal=function(){return null};$.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var a=yf({},e.props),l=e.key;if(t!=null)for(i in t.key!==void 0&&(l=""+t.key),t)!Sf.call(t,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&t.ref===void 0||(a[i]=t[i]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var o=Array(i),r=0;r<i;r++)o[r]=arguments[r+2];a.children=o}return Gs(e.type,l,a)};$.createContext=function(e){return e={$$typeof:Cg,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Sg,_context:e},e};$.createElement=function(e,t,n){var a,l={},i=null;if(t!=null)for(a in t.key!==void 0&&(i=""+t.key),t)Sf.call(t,a)&&a!=="key"&&a!=="__self"&&a!=="__source"&&(l[a]=t[a]);var o=arguments.length-2;if(o===1)l.children=n;else if(1<o){for(var r=Array(o),s=0;s<o;s++)r[s]=arguments[s+2];l.children=r}if(e&&e.defaultProps)for(a in o=e.defaultProps,o)l[a]===void 0&&(l[a]=o[a]);return Gs(e,i,l)};$.createRef=function(){return{current:null}};$.forwardRef=function(e){return{$$typeof:Ag,render:e}};$.isValidElement=Vs;$.lazy=function(e){return{$$typeof:gf,_payload:{_status:-1,_result:e},_init:Lg}};$.memo=function(e,t){return{$$typeof:Tg,type:e,compare:t===void 0?null:t}};$.startTransition=function(e){var t=Te.T,n={};Te.T=n;try{var a=e(),l=Te.S;l!==null&&l(n,a),typeof a=="object"&&a!==null&&typeof a.then=="function"&&a.then(_s,bf)}catch(i){bf(i)}finally{t!==null&&n.types!==null&&(t.types=n.types),Te.T=t}};$.unstable_useCacheRefresh=function(){return Te.H.useCacheRefresh()};$.use=function(e){return Te.H.use(e)};$.useActionState=function(e,t,n){return Te.H.useActionState(e,t,n)};$.useCallback=function(e,t){return Te.H.useCallback(e,t)};$.useContext=function(e){return Te.H.useContext(e)};$.useDebugValue=function(){};$.useDeferredValue=function(e,t){return Te.H.useDeferredValue(e,t)};$.useEffect=function(e,t){return Te.H.useEffect(e,t)};$.useEffectEvent=function(e){return Te.H.useEffectEvent(e)};$.useId=function(){return Te.H.useId()};$.useImperativeHandle=function(e,t,n){return Te.H.useImperativeHandle(e,t,n)};$.useInsertionEffect=function(e,t){return Te.H.useInsertionEffect(e,t)};$.useLayoutEffect=function(e,t){return Te.H.useLayoutEffect(e,t)};$.useMemo=function(e,t){return Te.H.useMemo(e,t)};$.useOptimistic=function(e,t){return Te.H.useOptimistic(e,t)};$.useReducer=function(e,t,n){return Te.H.useReducer(e,t,n)};$.useRef=function(e){return Te.H.useRef(e)};$.useState=function(e){return Te.H.useState(e)};$.useSyncExternalStore=function(e,t,n){return Te.H.useSyncExternalStore(e,t,n)};$.useTransition=function(){return Te.H.useTransition()};$.version="19.2.5"});var Xe=fn((Kh,Af)=>{"use strict";Af.exports=Cf()});var Tf=fn(vt=>{"use strict";var Dg=Xe();function Ef(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ta(){}var gt={d:{f:ta,r:function(){throw Error(Ef(522))},D:ta,C:ta,L:ta,m:ta,X:ta,S:ta,M:ta},p:0,findDOMNode:null},Bg=Symbol.for("react.portal");function _g(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Bg,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}var vi=Dg.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Mo(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=gt;vt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Ef(299));return _g(e,t,null,n)};vt.flushSync=function(e){var t=vi.T,n=gt.p;try{if(vi.T=null,gt.p=2,e)return e()}finally{vi.T=t,gt.p=n,gt.d.f()}};vt.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,gt.d.C(e,t))};vt.prefetchDNS=function(e){typeof e=="string"&&gt.d.D(e)};vt.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,a=Mo(n,t.crossOrigin),l=typeof t.integrity=="string"?t.integrity:void 0,i=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?gt.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:a,integrity:l,fetchPriority:i}):n==="script"&&gt.d.X(e,{crossOrigin:a,integrity:l,fetchPriority:i,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};vt.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Mo(t.as,t.crossOrigin);gt.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&gt.d.M(e)};vt.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,a=Mo(n,t.crossOrigin);gt.d.L(e,n,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};vt.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Mo(t.as,t.crossOrigin);gt.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else gt.d.m(e)};vt.requestFormReset=function(e){gt.d.r(e)};vt.unstable_batchedUpdates=function(e,t){return e(t)};vt.useFormState=function(e,t,n){return vi.H.useFormState(e,t,n)};vt.useFormStatus=function(){return vi.H.useHostTransitionStatus()};vt.version="19.2.5"});var Ys=fn(($h,kf)=>{"use strict";function Nf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Nf)}catch(e){console.error(e)}}Nf(),kf.exports=Tf()});var Gb=fn(ts=>{"use strict";var Pe=df(),Pm=Xe(),Ug=Ys();function A(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ep(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ao(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function tp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function np(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Of(e){if(ao(e)!==e)throw Error(A(188))}function Hg(e){var t=e.alternate;if(!t){if(t=ao(e),t===null)throw Error(A(188));return t!==e?null:e}for(var n=e,a=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return Of(l),e;if(i===a)return Of(l),t;i=i.sibling}throw Error(A(188))}if(n.return!==a.return)n=l,a=i;else{for(var o=!1,r=l.child;r;){if(r===n){o=!0,n=l,a=i;break}if(r===a){o=!0,a=l,n=i;break}r=r.sibling}if(!o){for(r=i.child;r;){if(r===n){o=!0,n=i,a=l;break}if(r===a){o=!0,a=i,n=l;break}r=r.sibling}if(!o)throw Error(A(189))}}if(n.alternate!==a)throw Error(A(190))}if(n.tag!==3)throw Error(A(188));return n.stateNode.current===n?e:t}function ap(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=ap(e),t!==null)return t;e=e.sibling}return null}var Oe=Object.assign,Rg=Symbol.for("react.element"),Lo=Symbol.for("react.transitional.element"),Ti=Symbol.for("react.portal"),vl=Symbol.for("react.fragment"),lp=Symbol.for("react.strict_mode"),Su=Symbol.for("react.profiler"),ip=Symbol.for("react.consumer"),Dn=Symbol.for("react.context"),gc=Symbol.for("react.forward_ref"),Cu=Symbol.for("react.suspense"),Au=Symbol.for("react.suspense_list"),vc=Symbol.for("react.memo"),na=Symbol.for("react.lazy"),Eu=Symbol.for("react.activity"),Gg=Symbol.for("react.memo_cache_sentinel"),wf=Symbol.iterator;function yi(e){return e===null||typeof e!="object"?null:(e=wf&&e[wf]||e["@@iterator"],typeof e=="function"?e:null)}var Vg=Symbol.for("react.client.reference");function Tu(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Vg?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case vl:return"Fragment";case Su:return"Profiler";case lp:return"StrictMode";case Cu:return"Suspense";case Au:return"SuspenseList";case Eu:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Ti:return"Portal";case Dn:return e.displayName||"Context";case ip:return(e._context.displayName||"Context")+".Consumer";case gc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case vc:return t=e.displayName||null,t!==null?t:Tu(e.type)||"Memo";case na:t=e._payload,e=e._init;try{return Tu(e(t))}catch{}}return null}var Ni=Array.isArray,J=Pm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce=Ug.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Va={pending:!1,data:null,method:null,action:null},Nu=[],yl=-1;function yn(e){return{current:e}}function lt(e){0>yl||(e.current=Nu[yl],Nu[yl]=null,yl--)}function Ae(e,t){yl++,Nu[yl]=e.current,e.current=t}var vn=yn(null),qi=yn(null),ma=yn(null),cr=yn(null);function dr(e,t){switch(Ae(ma,t),Ae(qi,e),Ae(vn,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Um(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Um(t),e=Tb(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}lt(vn),Ae(vn,e)}function Ul(){lt(vn),lt(qi),lt(ma)}function ku(e){e.memoizedState!==null&&Ae(cr,e);var t=vn.current,n=Tb(t,e.type);t!==n&&(Ae(qi,e),Ae(vn,n))}function fr(e){qi.current===e&&(lt(vn),lt(qi)),cr.current===e&&(lt(cr),eo._currentValue=Va)}var js,Mf;function Ua(e){if(js===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);js=t&&t[1]||"",Mf=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+js+e+Mf}var qs=!1;function Fs(e,t){if(!e||qs)return"";qs=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var g=function(){throw Error()};if(Object.defineProperty(g.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(g,[])}catch(m){var c=m}Reflect.construct(e,[],g)}else{try{g.call()}catch(m){c=m}e.call(g.prototype)}}else{try{throw Error()}catch(m){c=m}(g=e())&&typeof g.catch=="function"&&g.catch(function(){})}}catch(m){if(m&&c&&typeof m.stack=="string")return[m.stack,c.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),o=i[0],r=i[1];if(o&&r){var s=o.split(`
`),d=r.split(`
`);for(l=a=0;a<s.length&&!s[a].includes("DetermineComponentFrameRoot");)a++;for(;l<d.length&&!d[l].includes("DetermineComponentFrameRoot");)l++;if(a===s.length||l===d.length)for(a=s.length-1,l=d.length-1;1<=a&&0<=l&&s[a]!==d[l];)l--;for(;1<=a&&0<=l;a--,l--)if(s[a]!==d[l]){if(a!==1||l!==1)do if(a--,l--,0>l||s[a]!==d[l]){var p=`
`+s[a].replace(" at new "," at ");return e.displayName&&p.includes("<anonymous>")&&(p=p.replace("<anonymous>",e.displayName)),p}while(1<=a&&0<=l);break}}}finally{qs=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Ua(n):""}function Yg(e,t){switch(e.tag){case 26:case 27:case 5:return Ua(e.type);case 16:return Ua("Lazy");case 13:return e.child!==t&&t!==null?Ua("Suspense Fallback"):Ua("Suspense");case 19:return Ua("SuspenseList");case 0:case 15:return Fs(e.type,!1);case 11:return Fs(e.type.render,!1);case 1:return Fs(e.type,!0);case 31:return Ua("Activity");default:return""}}function Lf(e){try{var t="",n=null;do t+=Yg(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Ou=Object.prototype.hasOwnProperty,yc=Pe.unstable_scheduleCallback,Qs=Pe.unstable_cancelCallback,jg=Pe.unstable_shouldYield,qg=Pe.unstable_requestPaint,Dt=Pe.unstable_now,Fg=Pe.unstable_getCurrentPriorityLevel,op=Pe.unstable_ImmediatePriority,rp=Pe.unstable_UserBlockingPriority,mr=Pe.unstable_NormalPriority,Qg=Pe.unstable_LowPriority,sp=Pe.unstable_IdlePriority,Xg=Pe.log,Zg=Pe.unstable_setDisableYieldValue,lo=null,Bt=null;function sa(e){if(typeof Xg=="function"&&Zg(e),Bt&&typeof Bt.setStrictMode=="function")try{Bt.setStrictMode(lo,e)}catch{}}var _t=Math.clz32?Math.clz32:Ig,Jg=Math.log,Kg=Math.LN2;function Ig(e){return e>>>=0,e===0?32:31-(Jg(e)/Kg|0)|0}var zo=256,Do=262144,Bo=4194304;function Ha(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Gr(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var l=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var r=a&134217727;return r!==0?(a=r&~i,a!==0?l=Ha(a):(o&=r,o!==0?l=Ha(o):n||(n=r&~e,n!==0&&(l=Ha(n))))):(r=a&~i,r!==0?l=Ha(r):o!==0?l=Ha(o):n||(n=a&~e,n!==0&&(l=Ha(n)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:l}function io(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function $g(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function up(){var e=Bo;return Bo<<=1,(Bo&62914560)===0&&(Bo=4194304),e}function Xs(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function oo(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Wg(e,t,n,a,l,i){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var r=e.entanglements,s=e.expirationTimes,d=e.hiddenUpdates;for(n=o&~n;0<n;){var p=31-_t(n),g=1<<p;r[p]=0,s[p]=-1;var c=d[p];if(c!==null)for(d[p]=null,p=0;p<c.length;p++){var m=c[p];m!==null&&(m.lane&=-536870913)}n&=~g}a!==0&&cp(e,a,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(o&~t))}function cp(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-_t(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function dp(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-_t(n),l=1<<a;l&t|e[a]&t&&(e[a]|=t),n&=~l}}function fp(e,t){var n=t&-t;return n=(n&42)!==0?1:hc(n),(n&(e.suspendedLanes|t))!==0?0:n}function hc(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function xc(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function mp(){var e=ce.p;return e!==0?e:(e=window.event,e===void 0?32:Ub(e.type))}function zf(e,t){var n=ce.p;try{return ce.p=e,t()}finally{ce.p=n}}var Na=Math.random().toString(36).slice(2),st="__reactFiber$"+Na,Nt="__reactProps$"+Na,Zl="__reactContainer$"+Na,wu="__reactEvents$"+Na,Pg="__reactListeners$"+Na,ev="__reactHandles$"+Na,Df="__reactResources$"+Na,ro="__reactMarker$"+Na;function Sc(e){delete e[st],delete e[Nt],delete e[wu],delete e[Pg],delete e[ev]}function hl(e){var t=e[st];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Zl]||n[st]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ym(e);e!==null;){if(n=e[st])return n;e=Ym(e)}return t}e=n,n=e.parentNode}return null}function Jl(e){if(e=e[st]||e[Zl]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ki(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(A(33))}function wl(e){var t=e[Df];return t||(t=e[Df]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function at(e){e[ro]=!0}var pp=new Set,bp={};function Ia(e,t){Hl(e,t),Hl(e+"Capture",t)}function Hl(e,t){for(bp[e]=t,e=0;e<t.length;e++)pp.add(t[e])}var tv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Bf={},_f={};function nv(e){return Ou.call(_f,e)?!0:Ou.call(Bf,e)?!1:tv.test(e)?_f[e]=!0:(Bf[e]=!0,!1)}function Ko(e,t,n){if(nv(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function _o(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Nn(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function Xt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function gp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function av(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Mu(e){if(!e._valueTracker){var t=gp(e)?"checked":"value";e._valueTracker=av(e,t,""+e[t])}}function vp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=gp(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function pr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var lv=/[\n"\\]/g;function Kt(e){return e.replace(lv,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Lu(e,t,n,a,l,i,o,r){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Xt(t)):e.value!==""+Xt(t)&&(e.value=""+Xt(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?zu(e,o,Xt(t)):n!=null?zu(e,o,Xt(n)):a!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+Xt(r):e.removeAttribute("name")}function yp(e,t,n,a,l,i,o,r){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){Mu(e);return}n=n!=null?""+Xt(n):"",t=t!=null?""+Xt(t):n,r||t===e.value||(e.value=t),e.defaultValue=t}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=r?e.checked:!!a,e.defaultChecked=!!a,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o),Mu(e)}function zu(e,t,n){t==="number"&&pr(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Ml(e,t,n,a){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&a&&(e[n].defaultSelected=!0)}else{for(n=""+Xt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,a&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function hp(e,t,n){if(t!=null&&(t=""+Xt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Xt(n):""}function xp(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(A(92));if(Ni(a)){if(1<a.length)throw Error(A(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=Xt(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),Mu(e)}function Rl(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var iv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Uf(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||iv.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Sp(e,t,n){if(t!=null&&typeof t!="object")throw Error(A(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var l in t)a=t[l],t.hasOwnProperty(l)&&n[l]!==a&&Uf(e,l,a)}else for(var i in t)t.hasOwnProperty(i)&&Uf(e,i,t[i])}function Cc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ov=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),rv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Io(e){return rv.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Bn(){}var Du=null;function Ac(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xl=null,Ll=null;function Hf(e){var t=Jl(e);if(t&&(e=t.stateNode)){var n=e[Nt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Lu(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Kt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var l=a[Nt]||null;if(!l)throw Error(A(90));Lu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&vp(a)}break e;case"textarea":hp(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&Ml(e,!!n.multiple,t,!1)}}}var Zs=!1;function Cp(e,t,n){if(Zs)return e(t,n);Zs=!0;try{var a=e(t);return a}finally{if(Zs=!1,(xl!==null||Ll!==null)&&($r(),xl&&(t=xl,e=Ll,Ll=xl=null,Hf(t),e)))for(t=0;t<e.length;t++)Hf(e[t])}}function Fi(e,t){var n=e.stateNode;if(n===null)return null;var a=n[Nt]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(A(231,t,typeof n));return n}var Gn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bu=!1;if(Gn)try{fl={},Object.defineProperty(fl,"passive",{get:function(){Bu=!0}}),window.addEventListener("test",fl,fl),window.removeEventListener("test",fl,fl)}catch{Bu=!1}var fl,ua=null,Ec=null,$o=null;function Ap(){if($o)return $o;var e,t=Ec,n=t.length,a,l="value"in ua?ua.value:ua.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(a=1;a<=o&&t[n-a]===l[i-a];a++);return $o=l.slice(e,1<a?1-a:void 0)}function Wo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Uo(){return!0}function Rf(){return!1}function kt(e){function t(n,a,l,i,o){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(n=e[r],this[r]=n?n(i):i[r]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Uo:Rf,this.isPropagationStopped=Rf,this}return Oe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Uo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Uo)},persist:function(){},isPersistent:Uo}),t}var $a={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Vr=kt($a),so=Oe({},$a,{view:0,detail:0}),sv=kt(so),Js,Ks,hi,Yr=Oe({},so,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==hi&&(hi&&e.type==="mousemove"?(Js=e.screenX-hi.screenX,Ks=e.screenY-hi.screenY):Ks=Js=0,hi=e),Js)},movementY:function(e){return"movementY"in e?e.movementY:Ks}}),Gf=kt(Yr),uv=Oe({},Yr,{dataTransfer:0}),cv=kt(uv),dv=Oe({},so,{relatedTarget:0}),Is=kt(dv),fv=Oe({},$a,{animationName:0,elapsedTime:0,pseudoElement:0}),mv=kt(fv),pv=Oe({},$a,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),bv=kt(pv),gv=Oe({},$a,{data:0}),Vf=kt(gv),vv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},yv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xv(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=hv[e])?!!t[e]:!1}function Tc(){return xv}var Sv=Oe({},so,{key:function(e){if(e.key){var t=vv[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?yv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tc,charCode:function(e){return e.type==="keypress"?Wo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Cv=kt(Sv),Av=Oe({},Yr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Yf=kt(Av),Ev=Oe({},so,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tc}),Tv=kt(Ev),Nv=Oe({},$a,{propertyName:0,elapsedTime:0,pseudoElement:0}),kv=kt(Nv),Ov=Oe({},Yr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),wv=kt(Ov),Mv=Oe({},$a,{newState:0,oldState:0}),Lv=kt(Mv),zv=[9,13,27,32],Nc=Gn&&"CompositionEvent"in window,Mi=null;Gn&&"documentMode"in document&&(Mi=document.documentMode);var Dv=Gn&&"TextEvent"in window&&!Mi,Ep=Gn&&(!Nc||Mi&&8<Mi&&11>=Mi),jf=" ",qf=!1;function Tp(e,t){switch(e){case"keyup":return zv.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Np(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Sl=!1;function Bv(e,t){switch(e){case"compositionend":return Np(t);case"keypress":return t.which!==32?null:(qf=!0,jf);case"textInput":return e=t.data,e===jf&&qf?null:e;default:return null}}function _v(e,t){if(Sl)return e==="compositionend"||!Nc&&Tp(e,t)?(e=Ap(),$o=Ec=ua=null,Sl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ep&&t.locale!=="ko"?null:t.data;default:return null}}var Uv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ff(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Uv[e.type]:t==="textarea"}function kp(e,t,n,a){xl?Ll?Ll.push(a):Ll=[a]:xl=a,t=zr(t,"onChange"),0<t.length&&(n=new Vr("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Li=null,Qi=null;function Hv(e){Cb(e,0)}function jr(e){var t=ki(e);if(vp(t))return e}function Qf(e,t){if(e==="change")return t}var Op=!1;Gn&&(Gn?(Ro="oninput"in document,Ro||($s=document.createElement("div"),$s.setAttribute("oninput","return;"),Ro=typeof $s.oninput=="function"),Ho=Ro):Ho=!1,Op=Ho&&(!document.documentMode||9<document.documentMode));var Ho,Ro,$s;function Xf(){Li&&(Li.detachEvent("onpropertychange",wp),Qi=Li=null)}function wp(e){if(e.propertyName==="value"&&jr(Qi)){var t=[];kp(t,Qi,e,Ac(e)),Cp(Hv,t)}}function Rv(e,t,n){e==="focusin"?(Xf(),Li=t,Qi=n,Li.attachEvent("onpropertychange",wp)):e==="focusout"&&Xf()}function Gv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return jr(Qi)}function Vv(e,t){if(e==="click")return jr(t)}function Yv(e,t){if(e==="input"||e==="change")return jr(t)}function jv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ht=typeof Object.is=="function"?Object.is:jv;function Xi(e,t){if(Ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!Ou.call(t,l)||!Ht(e[l],t[l]))return!1}return!0}function Zf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jf(e,t){var n=Zf(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Zf(n)}}function Mp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Mp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Lp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=pr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=pr(e.document)}return t}function kc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var qv=Gn&&"documentMode"in document&&11>=document.documentMode,Cl=null,_u=null,zi=null,Uu=!1;function Kf(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Uu||Cl==null||Cl!==pr(a)||(a=Cl,"selectionStart"in a&&kc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),zi&&Xi(zi,a)||(zi=a,a=zr(_u,"onSelect"),0<a.length&&(t=new Vr("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Cl)))}function _a(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Al={animationend:_a("Animation","AnimationEnd"),animationiteration:_a("Animation","AnimationIteration"),animationstart:_a("Animation","AnimationStart"),transitionrun:_a("Transition","TransitionRun"),transitionstart:_a("Transition","TransitionStart"),transitioncancel:_a("Transition","TransitionCancel"),transitionend:_a("Transition","TransitionEnd")},Ws={},zp={};Gn&&(zp=document.createElement("div").style,"AnimationEvent"in window||(delete Al.animationend.animation,delete Al.animationiteration.animation,delete Al.animationstart.animation),"TransitionEvent"in window||delete Al.transitionend.transition);function Wa(e){if(Ws[e])return Ws[e];if(!Al[e])return e;var t=Al[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in zp)return Ws[e]=t[n];return e}var Dp=Wa("animationend"),Bp=Wa("animationiteration"),_p=Wa("animationstart"),Fv=Wa("transitionrun"),Qv=Wa("transitionstart"),Xv=Wa("transitioncancel"),Up=Wa("transitionend"),Hp=new Map,Hu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Hu.push("scrollEnd");function un(e,t){Hp.set(e,t),Ia(t,[e])}var br=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Qt=[],El=0,Oc=0;function qr(){for(var e=El,t=Oc=El=0;t<e;){var n=Qt[t];Qt[t++]=null;var a=Qt[t];Qt[t++]=null;var l=Qt[t];Qt[t++]=null;var i=Qt[t];if(Qt[t++]=null,a!==null&&l!==null){var o=a.pending;o===null?l.next=l:(l.next=o.next,o.next=l),a.pending=l}i!==0&&Rp(n,l,i)}}function Fr(e,t,n,a){Qt[El++]=e,Qt[El++]=t,Qt[El++]=n,Qt[El++]=a,Oc|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function wc(e,t,n,a){return Fr(e,t,n,a),gr(e)}function Pa(e,t){return Fr(e,null,null,t),gr(e)}function Rp(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-_t(n),e=i.hiddenUpdates,a=e[l],a===null?e[l]=[t]:a.push(t),t.lane=n|536870912),i):null}function gr(e){if(50<Yi)throw Yi=0,lc=null,Error(A(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Tl={};function Zv(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Lt(e,t,n,a){return new Zv(e,t,n,a)}function Mc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Un(e,t){var n=e.alternate;return n===null?(n=Lt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Gp(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Po(e,t,n,a,l,i){var o=0;if(a=e,typeof e=="function")Mc(e)&&(o=1);else if(typeof e=="string")o=Iy(e,n,vn.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Eu:return e=Lt(31,n,t,l),e.elementType=Eu,e.lanes=i,e;case vl:return Ya(n.children,l,i,t);case lp:o=8,l|=24;break;case Su:return e=Lt(12,n,t,l|2),e.elementType=Su,e.lanes=i,e;case Cu:return e=Lt(13,n,t,l),e.elementType=Cu,e.lanes=i,e;case Au:return e=Lt(19,n,t,l),e.elementType=Au,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Dn:o=10;break e;case ip:o=9;break e;case gc:o=11;break e;case vc:o=14;break e;case na:o=16,a=null;break e}o=29,n=Error(A(130,e===null?"null":typeof e,"")),a=null}return t=Lt(o,n,t,l),t.elementType=e,t.type=a,t.lanes=i,t}function Ya(e,t,n,a){return e=Lt(7,e,a,t),e.lanes=n,e}function Ps(e,t,n){return e=Lt(6,e,null,t),e.lanes=n,e}function Vp(e){var t=Lt(18,null,null,0);return t.stateNode=e,t}function eu(e,t,n){return t=Lt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var If=new WeakMap;function It(e,t){if(typeof e=="object"&&e!==null){var n=If.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Lf(t)},If.set(e,t),t)}return{value:e,source:t,stack:Lf(t)}}var Nl=[],kl=0,vr=null,Zi=0,Zt=[],Jt=0,Ca=null,pn=1,bn="";function Ln(e,t){Nl[kl++]=Zi,Nl[kl++]=vr,vr=e,Zi=t}function Yp(e,t,n){Zt[Jt++]=pn,Zt[Jt++]=bn,Zt[Jt++]=Ca,Ca=e;var a=pn;e=bn;var l=32-_t(a)-1;a&=~(1<<l),n+=1;var i=32-_t(t)+l;if(30<i){var o=l-l%5;i=(a&(1<<o)-1).toString(32),a>>=o,l-=o,pn=1<<32-_t(t)+l|n<<l|a,bn=i+e}else pn=1<<i|n<<l|a,bn=e}function Lc(e){e.return!==null&&(Ln(e,1),Yp(e,1,0))}function zc(e){for(;e===vr;)vr=Nl[--kl],Nl[kl]=null,Zi=Nl[--kl],Nl[kl]=null;for(;e===Ca;)Ca=Zt[--Jt],Zt[Jt]=null,bn=Zt[--Jt],Zt[Jt]=null,pn=Zt[--Jt],Zt[Jt]=null}function jp(e,t){Zt[Jt++]=pn,Zt[Jt++]=bn,Zt[Jt++]=Ca,pn=t.id,bn=t.overflow,Ca=e}var ut=null,ke=null,le=!1,pa=null,$t=!1,Ru=Error(A(519));function Aa(e){var t=Error(A(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ji(It(t,e)),Ru}function $f(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[st]=e,t[Nt]=a,n){case"dialog":te("cancel",t),te("close",t);break;case"iframe":case"object":case"embed":te("load",t);break;case"video":case"audio":for(n=0;n<Wi.length;n++)te(Wi[n],t);break;case"source":te("error",t);break;case"img":case"image":case"link":te("error",t),te("load",t);break;case"details":te("toggle",t);break;case"input":te("invalid",t),yp(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":te("invalid",t);break;case"textarea":te("invalid",t),xp(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||Eb(t.textContent,n)?(a.popover!=null&&(te("beforetoggle",t),te("toggle",t)),a.onScroll!=null&&te("scroll",t),a.onScrollEnd!=null&&te("scrollend",t),a.onClick!=null&&(t.onclick=Bn),t=!0):t=!1,t||Aa(e,!0)}function Wf(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 31:case 13:$t=!1;return;case 27:case 3:$t=!0;return;default:ut=ut.return}}function ml(e){if(e!==ut)return!1;if(!le)return Wf(e),le=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||uc(e.type,e.memoizedProps)),n=!n),n&&ke&&Aa(e),Wf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(317));ke=Vm(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(317));ke=Vm(e)}else t===27?(t=ke,ka(e.type)?(e=mc,mc=null,ke=e):ke=t):ke=ut?Pt(e.stateNode.nextSibling):null;return!0}function Qa(){ke=ut=null,le=!1}function tu(){var e=pa;return e!==null&&(Et===null?Et=e:Et.push.apply(Et,e),pa=null),e}function Ji(e){pa===null?pa=[e]:pa.push(e)}var Gu=yn(null),el=null,_n=null;function la(e,t,n){Ae(Gu,t._currentValue),t._currentValue=n}function Hn(e){e._currentValue=Gu.current,lt(Gu)}function Vu(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Yu(e,t,n,a){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var o=l.child;i=i.firstContext;e:for(;i!==null;){var r=i;i=l;for(var s=0;s<t.length;s++)if(r.context===t[s]){i.lanes|=n,r=i.alternate,r!==null&&(r.lanes|=n),Vu(i.return,n,e),a||(o=null);break e}i=r.next}}else if(l.tag===18){if(o=l.return,o===null)throw Error(A(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),Vu(o,n,e),o=null}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===e){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}}function Kl(e,t,n,a){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var o=l.alternate;if(o===null)throw Error(A(387));if(o=o.memoizedProps,o!==null){var r=l.type;Ht(l.pendingProps.value,o.value)||(e!==null?e.push(r):e=[r])}}else if(l===cr.current){if(o=l.alternate,o===null)throw Error(A(387));o.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(eo):e=[eo])}l=l.return}e!==null&&Yu(t,e,n,a),t.flags|=262144}function yr(e){for(e=e.firstContext;e!==null;){if(!Ht(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Xa(e){el=e,_n=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ct(e){return qp(el,e)}function Go(e,t){return el===null&&Xa(e),qp(e,t)}function qp(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},_n===null){if(e===null)throw Error(A(308));_n=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else _n=_n.next=t;return n}var Jv=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},Kv=Pe.unstable_scheduleCallback,Iv=Pe.unstable_NormalPriority,Ke={$$typeof:Dn,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Dc(){return{controller:new Jv,data:new Map,refCount:0}}function uo(e){e.refCount--,e.refCount===0&&Kv(Iv,function(){e.controller.abort()})}var Di=null,ju=0,Gl=0,zl=null;function $v(e,t){if(Di===null){var n=Di=[];ju=0,Gl=ld(),zl={status:"pending",value:void 0,then:function(a){n.push(a)}}}return ju++,t.then(Pf,Pf),t}function Pf(){if(--ju===0&&Di!==null){zl!==null&&(zl.status="fulfilled");var e=Di;Di=null,Gl=0,zl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Wv(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var em=J.S;J.S=function(e,t){ab=Dt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&$v(e,t),em!==null&&em(e,t)};var ja=yn(null);function Bc(){var e=ja.current;return e!==null?e:Se.pooledCache}function er(e,t){t===null?Ae(ja,ja.current):Ae(ja,t.pool)}function Fp(){var e=Bc();return e===null?null:{parent:Ke._currentValue,pool:e}}var Il=Error(A(460)),_c=Error(A(474)),Qr=Error(A(542)),hr={then:function(){}};function tm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Qp(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Bn,Bn),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,am(e),e;default:if(typeof t.status=="string")t.then(Bn,Bn);else{if(e=Se,e!==null&&100<e.shellSuspendCounter)throw Error(A(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=a}},function(a){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,am(e),e}throw qa=t,Il}}function Ra(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(qa=n,Il):n}}var qa=null;function nm(){if(qa===null)throw Error(A(459));var e=qa;return qa=null,e}function am(e){if(e===Il||e===Qr)throw Error(A(483))}var Dl=null,Ki=0;function Vo(e){var t=Ki;return Ki+=1,Dl===null&&(Dl=[]),Qp(Dl,e,t)}function xi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Yo(e,t){throw t.$$typeof===Rg?Error(A(525)):(e=Object.prototype.toString.call(t),Error(A(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Xp(e){function t(f,u){if(e){var b=f.deletions;b===null?(f.deletions=[u],f.flags|=16):b.push(u)}}function n(f,u){if(!e)return null;for(;u!==null;)t(f,u),u=u.sibling;return null}function a(f){for(var u=new Map;f!==null;)f.key!==null?u.set(f.key,f):u.set(f.index,f),f=f.sibling;return u}function l(f,u){return f=Un(f,u),f.index=0,f.sibling=null,f}function i(f,u,b){return f.index=b,e?(b=f.alternate,b!==null?(b=b.index,b<u?(f.flags|=67108866,u):b):(f.flags|=67108866,u)):(f.flags|=1048576,u)}function o(f){return e&&f.alternate===null&&(f.flags|=67108866),f}function r(f,u,b,v){return u===null||u.tag!==6?(u=Ps(b,f.mode,v),u.return=f,u):(u=l(u,b),u.return=f,u)}function s(f,u,b,v){var w=b.type;return w===vl?p(f,u,b.props.children,v,b.key):u!==null&&(u.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===na&&Ra(w)===u.type)?(u=l(u,b.props),xi(u,b),u.return=f,u):(u=Po(b.type,b.key,b.props,null,f.mode,v),xi(u,b),u.return=f,u)}function d(f,u,b,v){return u===null||u.tag!==4||u.stateNode.containerInfo!==b.containerInfo||u.stateNode.implementation!==b.implementation?(u=eu(b,f.mode,v),u.return=f,u):(u=l(u,b.children||[]),u.return=f,u)}function p(f,u,b,v,w){return u===null||u.tag!==7?(u=Ya(b,f.mode,v,w),u.return=f,u):(u=l(u,b),u.return=f,u)}function g(f,u,b){if(typeof u=="string"&&u!==""||typeof u=="number"||typeof u=="bigint")return u=Ps(""+u,f.mode,b),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Lo:return b=Po(u.type,u.key,u.props,null,f.mode,b),xi(b,u),b.return=f,b;case Ti:return u=eu(u,f.mode,b),u.return=f,u;case na:return u=Ra(u),g(f,u,b)}if(Ni(u)||yi(u))return u=Ya(u,f.mode,b,null),u.return=f,u;if(typeof u.then=="function")return g(f,Vo(u),b);if(u.$$typeof===Dn)return g(f,Go(f,u),b);Yo(f,u)}return null}function c(f,u,b,v){var w=u!==null?u.key:null;if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return w!==null?null:r(f,u,""+b,v);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Lo:return b.key===w?s(f,u,b,v):null;case Ti:return b.key===w?d(f,u,b,v):null;case na:return b=Ra(b),c(f,u,b,v)}if(Ni(b)||yi(b))return w!==null?null:p(f,u,b,v,null);if(typeof b.then=="function")return c(f,u,Vo(b),v);if(b.$$typeof===Dn)return c(f,u,Go(f,b),v);Yo(f,b)}return null}function m(f,u,b,v,w){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return f=f.get(b)||null,r(u,f,""+v,w);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Lo:return f=f.get(v.key===null?b:v.key)||null,s(u,f,v,w);case Ti:return f=f.get(v.key===null?b:v.key)||null,d(u,f,v,w);case na:return v=Ra(v),m(f,u,b,v,w)}if(Ni(v)||yi(v))return f=f.get(b)||null,p(u,f,v,w,null);if(typeof v.then=="function")return m(f,u,b,Vo(v),w);if(v.$$typeof===Dn)return m(f,u,b,Go(u,v),w);Yo(u,v)}return null}function C(f,u,b,v){for(var w=null,H=null,E=u,O=u=0,D=null;E!==null&&O<b.length;O++){E.index>O?(D=E,E=null):D=E.sibling;var _=c(f,E,b[O],v);if(_===null){E===null&&(E=D);break}e&&E&&_.alternate===null&&t(f,E),u=i(_,u,O),H===null?w=_:H.sibling=_,H=_,E=D}if(O===b.length)return n(f,E),le&&Ln(f,O),w;if(E===null){for(;O<b.length;O++)E=g(f,b[O],v),E!==null&&(u=i(E,u,O),H===null?w=E:H.sibling=E,H=E);return le&&Ln(f,O),w}for(E=a(E);O<b.length;O++)D=m(E,f,O,b[O],v),D!==null&&(e&&D.alternate!==null&&E.delete(D.key===null?O:D.key),u=i(D,u,O),H===null?w=D:H.sibling=D,H=D);return e&&E.forEach(function(P){return t(f,P)}),le&&Ln(f,O),w}function N(f,u,b,v){if(b==null)throw Error(A(151));for(var w=null,H=null,E=u,O=u=0,D=null,_=b.next();E!==null&&!_.done;O++,_=b.next()){E.index>O?(D=E,E=null):D=E.sibling;var P=c(f,E,_.value,v);if(P===null){E===null&&(E=D);break}e&&E&&P.alternate===null&&t(f,E),u=i(P,u,O),H===null?w=P:H.sibling=P,H=P,E=D}if(_.done)return n(f,E),le&&Ln(f,O),w;if(E===null){for(;!_.done;O++,_=b.next())_=g(f,_.value,v),_!==null&&(u=i(_,u,O),H===null?w=_:H.sibling=_,H=_);return le&&Ln(f,O),w}for(E=a(E);!_.done;O++,_=b.next())_=m(E,f,O,_.value,v),_!==null&&(e&&_.alternate!==null&&E.delete(_.key===null?O:_.key),u=i(_,u,O),H===null?w=_:H.sibling=_,H=_);return e&&E.forEach(function(we){return t(f,we)}),le&&Ln(f,O),w}function B(f,u,b,v){if(typeof b=="object"&&b!==null&&b.type===vl&&b.key===null&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case Lo:e:{for(var w=b.key;u!==null;){if(u.key===w){if(w=b.type,w===vl){if(u.tag===7){n(f,u.sibling),v=l(u,b.props.children),v.return=f,f=v;break e}}else if(u.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===na&&Ra(w)===u.type){n(f,u.sibling),v=l(u,b.props),xi(v,b),v.return=f,f=v;break e}n(f,u);break}else t(f,u);u=u.sibling}b.type===vl?(v=Ya(b.props.children,f.mode,v,b.key),v.return=f,f=v):(v=Po(b.type,b.key,b.props,null,f.mode,v),xi(v,b),v.return=f,f=v)}return o(f);case Ti:e:{for(w=b.key;u!==null;){if(u.key===w)if(u.tag===4&&u.stateNode.containerInfo===b.containerInfo&&u.stateNode.implementation===b.implementation){n(f,u.sibling),v=l(u,b.children||[]),v.return=f,f=v;break e}else{n(f,u);break}else t(f,u);u=u.sibling}v=eu(b,f.mode,v),v.return=f,f=v}return o(f);case na:return b=Ra(b),B(f,u,b,v)}if(Ni(b))return C(f,u,b,v);if(yi(b)){if(w=yi(b),typeof w!="function")throw Error(A(150));return b=w.call(b),N(f,u,b,v)}if(typeof b.then=="function")return B(f,u,Vo(b),v);if(b.$$typeof===Dn)return B(f,u,Go(f,b),v);Yo(f,b)}return typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint"?(b=""+b,u!==null&&u.tag===6?(n(f,u.sibling),v=l(u,b),v.return=f,f=v):(n(f,u),v=Ps(b,f.mode,v),v.return=f,f=v),o(f)):n(f,u)}return function(f,u,b,v){try{Ki=0;var w=B(f,u,b,v);return Dl=null,w}catch(E){if(E===Il||E===Qr)throw E;var H=Lt(29,E,null,f.mode);return H.lanes=v,H.return=f,H}}}var Za=Xp(!0),Zp=Xp(!1),aa=!1;function Uc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ba(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ga(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(ue&2)!==0){var l=a.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),a.pending=t,t=gr(e),Rp(e,null,n),t}return Fr(e,a,t,n),gr(e)}function Bi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,dp(e,n)}}function nu(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Fu=!1;function _i(){if(Fu){var e=zl;if(e!==null)throw e}}function Ui(e,t,n,a){Fu=!1;var l=e.updateQueue;aa=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,r=l.shared.pending;if(r!==null){l.shared.pending=null;var s=r,d=s.next;s.next=null,o===null?i=d:o.next=d,o=s;var p=e.alternate;p!==null&&(p=p.updateQueue,r=p.lastBaseUpdate,r!==o&&(r===null?p.firstBaseUpdate=d:r.next=d,p.lastBaseUpdate=s))}if(i!==null){var g=l.baseState;o=0,p=d=s=null,r=i;do{var c=r.lane&-536870913,m=c!==r.lane;if(m?(ae&c)===c:(a&c)===c){c!==0&&c===Gl&&(Fu=!0),p!==null&&(p=p.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var C=e,N=r;c=t;var B=n;switch(N.tag){case 1:if(C=N.payload,typeof C=="function"){g=C.call(B,g,c);break e}g=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=N.payload,c=typeof C=="function"?C.call(B,g,c):C,c==null)break e;g=Oe({},g,c);break e;case 2:aa=!0}}c=r.callback,c!==null&&(e.flags|=64,m&&(e.flags|=8192),m=l.callbacks,m===null?l.callbacks=[c]:m.push(c))}else m={lane:c,tag:r.tag,payload:r.payload,callback:r.callback,next:null},p===null?(d=p=m,s=g):p=p.next=m,o|=c;if(r=r.next,r===null){if(r=l.shared.pending,r===null)break;m=r,r=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);p===null&&(s=g),l.baseState=s,l.firstBaseUpdate=d,l.lastBaseUpdate=p,i===null&&(l.shared.lanes=0),Ta|=o,e.lanes=o,e.memoizedState=g}}function Jp(e,t){if(typeof e!="function")throw Error(A(191,e));e.call(t)}function Kp(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Jp(n[e],t)}var Vl=yn(null),xr=yn(0);function lm(e,t){e=qn,Ae(xr,e),Ae(Vl,t),qn=e|t.baseLanes}function Qu(){Ae(xr,qn),Ae(Vl,Vl.current)}function Hc(){qn=xr.current,lt(Vl),lt(xr)}var Rt=yn(null),Wt=null;function ia(e){var t=e.alternate;Ae(Ve,Ve.current&1),Ae(Rt,e),Wt===null&&(t===null||Vl.current!==null||t.memoizedState!==null)&&(Wt=e)}function Xu(e){Ae(Ve,Ve.current),Ae(Rt,e),Wt===null&&(Wt=e)}function Ip(e){e.tag===22?(Ae(Ve,Ve.current),Ae(Rt,e),Wt===null&&(Wt=e)):oa(e)}function oa(){Ae(Ve,Ve.current),Ae(Rt,Rt.current)}function Mt(e){lt(Rt),Wt===e&&(Wt=null),lt(Ve)}var Ve=yn(0);function Sr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||dc(n)||fc(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Vn=0,W=null,xe=null,Ze=null,Cr=!1,Bl=!1,Ja=!1,Ar=0,Ii=0,_l=null,Pv=0;function Re(){throw Error(A(321))}function Rc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ht(e[n],t[n]))return!1;return!0}function Gc(e,t,n,a,l,i){return Vn=i,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,J.H=e===null||e.memoizedState===null?k0:Ic,Ja=!1,i=n(a,l),Ja=!1,Bl&&(i=Wp(t,n,a,l)),$p(e),i}function $p(e){J.H=$i;var t=xe!==null&&xe.next!==null;if(Vn=0,Ze=xe=W=null,Cr=!1,Ii=0,_l=null,t)throw Error(A(300));e===null||Ie||(e=e.dependencies,e!==null&&yr(e)&&(Ie=!0))}function Wp(e,t,n,a){W=e;var l=0;do{if(Bl&&(_l=null),Ii=0,Bl=!1,25<=l)throw Error(A(301));if(l+=1,Ze=xe=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}J.H=O0,i=t(n,a)}while(Bl);return i}function ey(){var e=J.H,t=e.useState()[0];return t=typeof t.then=="function"?co(t):t,e=e.useState()[0],(xe!==null?xe.memoizedState:null)!==e&&(W.flags|=1024),t}function Vc(){var e=Ar!==0;return Ar=0,e}function Yc(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function jc(e){if(Cr){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Cr=!1}Vn=0,Ze=xe=W=null,Bl=!1,Ii=Ar=0,_l=null}function yt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ze===null?W.memoizedState=Ze=e:Ze=Ze.next=e,Ze}function Ye(){if(xe===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=xe.next;var t=Ze===null?W.memoizedState:Ze.next;if(t!==null)Ze=t,xe=e;else{if(e===null)throw W.alternate===null?Error(A(467)):Error(A(310));xe=e,e={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},Ze===null?W.memoizedState=Ze=e:Ze=Ze.next=e}return Ze}function Xr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function co(e){var t=Ii;return Ii+=1,_l===null&&(_l=[]),e=Qp(_l,e,t),t=W,(Ze===null?t.memoizedState:Ze.next)===null&&(t=t.alternate,J.H=t===null||t.memoizedState===null?k0:Ic),e}function Zr(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return co(e);if(e.$$typeof===Dn)return ct(e)}throw Error(A(438,String(e)))}function qc(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=W.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Xr(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=Gg;return t.index++,n}function Yn(e,t){return typeof t=="function"?t(e):t}function tr(e){var t=Ye();return Fc(t,xe,e)}function Fc(e,t,n){var a=e.queue;if(a===null)throw Error(A(311));a.lastRenderedReducer=n;var l=e.baseQueue,i=a.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}t.baseQueue=l=i,a.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var r=o=null,s=null,d=t,p=!1;do{var g=d.lane&-536870913;if(g!==d.lane?(ae&g)===g:(Vn&g)===g){var c=d.revertLane;if(c===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),g===Gl&&(p=!0);else if((Vn&c)===c){d=d.next,c===Gl&&(p=!0);continue}else g={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},s===null?(r=s=g,o=i):s=s.next=g,W.lanes|=c,Ta|=c;g=d.action,Ja&&n(i,g),i=d.hasEagerState?d.eagerState:n(i,g)}else c={lane:g,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},s===null?(r=s=c,o=i):s=s.next=c,W.lanes|=g,Ta|=g;d=d.next}while(d!==null&&d!==t);if(s===null?o=i:s.next=r,!Ht(i,e.memoizedState)&&(Ie=!0,p&&(n=zl,n!==null)))throw n;e.memoizedState=i,e.baseState=o,e.baseQueue=s,a.lastRenderedState=i}return l===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function au(e){var t=Ye(),n=t.queue;if(n===null)throw Error(A(311));n.lastRenderedReducer=e;var a=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);Ht(i,t.memoizedState)||(Ie=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function Pp(e,t,n){var a=W,l=Ye(),i=le;if(i){if(n===void 0)throw Error(A(407));n=n()}else n=t();var o=!Ht((xe||l).memoizedState,n);if(o&&(l.memoizedState=n,Ie=!0),l=l.queue,Qc(n0.bind(null,a,l,e),[e]),l.getSnapshot!==t||o||Ze!==null&&Ze.memoizedState.tag&1){if(a.flags|=2048,Yl(9,{destroy:void 0},t0.bind(null,a,l,n,t),null),Se===null)throw Error(A(349));i||(Vn&127)!==0||e0(a,t,n)}return n}function e0(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=Xr(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function t0(e,t,n,a){t.value=n,t.getSnapshot=a,a0(t)&&l0(e)}function n0(e,t,n){return n(function(){a0(t)&&l0(e)})}function a0(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ht(e,n)}catch{return!0}}function l0(e){var t=Pa(e,2);t!==null&&Tt(t,e,2)}function Zu(e){var t=yt();if(typeof e=="function"){var n=e;if(e=n(),Ja){sa(!0);try{n()}finally{sa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yn,lastRenderedState:e},t}function i0(e,t,n,a){return e.baseState=n,Fc(e,xe,typeof a=="function"?a:Yn)}function ty(e,t,n,a,l){if(Kr(e))throw Error(A(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};J.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,o0(t,i)):(i.next=n.next,t.pending=n.next=i)}}function o0(e,t){var n=t.action,a=t.payload,l=e.state;if(t.isTransition){var i=J.T,o={};J.T=o;try{var r=n(l,a),s=J.S;s!==null&&s(o,r),im(e,t,r)}catch(d){Ju(e,t,d)}finally{i!==null&&o.types!==null&&(i.types=o.types),J.T=i}}else try{i=n(l,a),im(e,t,i)}catch(d){Ju(e,t,d)}}function im(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){om(e,t,a)},function(a){return Ju(e,t,a)}):om(e,t,n)}function om(e,t,n){t.status="fulfilled",t.value=n,r0(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,o0(e,n)))}function Ju(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,r0(t),t=t.next;while(t!==a)}e.action=null}function r0(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function s0(e,t){return t}function rm(e,t){if(le){var n=Se.formState;if(n!==null){e:{var a=W;if(le){if(ke){t:{for(var l=ke,i=$t;l.nodeType!==8;){if(!i){l=null;break t}if(l=Pt(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){ke=Pt(l.nextSibling),a=l.data==="F!";break e}}Aa(a)}a=!1}a&&(t=n[0])}}return n=yt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:s0,lastRenderedState:t},n.queue=a,n=E0.bind(null,W,a),a.dispatch=n,a=Zu(!1),i=Kc.bind(null,W,!1,a.queue),a=yt(),l={state:t,dispatch:null,action:e,pending:null},a.queue=l,n=ty.bind(null,W,l,i,n),l.dispatch=n,a.memoizedState=e,[t,n,!1]}function sm(e){var t=Ye();return u0(t,xe,e)}function u0(e,t,n){if(t=Fc(e,t,s0)[0],e=tr(Yn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=co(t)}catch(o){throw o===Il?Qr:o}else a=t;t=Ye();var l=t.queue,i=l.dispatch;return n!==t.memoizedState&&(W.flags|=2048,Yl(9,{destroy:void 0},ny.bind(null,l,n),null)),[a,i,e]}function ny(e,t){e.action=t}function um(e){var t=Ye(),n=xe;if(n!==null)return u0(t,n,e);Ye(),t=t.memoizedState,n=Ye();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Yl(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=W.updateQueue,t===null&&(t=Xr(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function c0(){return Ye().memoizedState}function nr(e,t,n,a){var l=yt();W.flags|=e,l.memoizedState=Yl(1|t,{destroy:void 0},n,a===void 0?null:a)}function Jr(e,t,n,a){var l=Ye();a=a===void 0?null:a;var i=l.memoizedState.inst;xe!==null&&a!==null&&Rc(a,xe.memoizedState.deps)?l.memoizedState=Yl(t,i,n,a):(W.flags|=e,l.memoizedState=Yl(1|t,i,n,a))}function cm(e,t){nr(8390656,8,e,t)}function Qc(e,t){Jr(2048,8,e,t)}function ay(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=Xr(),W.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function d0(e){var t=Ye().memoizedState;return ay({ref:t,nextImpl:e}),function(){if((ue&2)!==0)throw Error(A(440));return t.impl.apply(void 0,arguments)}}function f0(e,t){return Jr(4,2,e,t)}function m0(e,t){return Jr(4,4,e,t)}function p0(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function b0(e,t,n){n=n!=null?n.concat([e]):null,Jr(4,4,p0.bind(null,t,e),n)}function Xc(){}function g0(e,t){var n=Ye();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&Rc(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function v0(e,t){var n=Ye();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&Rc(t,a[1]))return a[0];if(a=e(),Ja){sa(!0);try{e()}finally{sa(!1)}}return n.memoizedState=[a,t],a}function Zc(e,t,n){return n===void 0||(Vn&1073741824)!==0&&(ae&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=ib(),W.lanes|=e,Ta|=e,n)}function y0(e,t,n,a){return Ht(n,t)?n:Vl.current!==null?(e=Zc(e,n,a),Ht(e,t)||(Ie=!0),e):(Vn&42)===0||(Vn&1073741824)!==0&&(ae&261930)===0?(Ie=!0,e.memoizedState=n):(e=ib(),W.lanes|=e,Ta|=e,t)}function h0(e,t,n,a,l){var i=ce.p;ce.p=i!==0&&8>i?i:8;var o=J.T,r={};J.T=r,Kc(e,!1,t,n);try{var s=l(),d=J.S;if(d!==null&&d(r,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=Wv(s,a);Hi(e,t,p,Ut(e))}else Hi(e,t,a,Ut(e))}catch(g){Hi(e,t,{then:function(){},status:"rejected",reason:g},Ut())}finally{ce.p=i,o!==null&&r.types!==null&&(o.types=r.types),J.T=o}}function ly(){}function Ku(e,t,n,a){if(e.tag!==5)throw Error(A(476));var l=x0(e).queue;h0(e,l,t,Va,n===null?ly:function(){return S0(e),n(a)})}function x0(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Va,baseState:Va,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yn,lastRenderedState:Va},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function S0(e){var t=x0(e);t.next===null&&(t=e.alternate.memoizedState),Hi(e,t.next.queue,{},Ut())}function Jc(){return ct(eo)}function C0(){return Ye().memoizedState}function A0(){return Ye().memoizedState}function iy(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Ut();e=ba(n);var a=ga(t,e,n);a!==null&&(Tt(a,t,n),Bi(a,t,n)),t={cache:Dc()},e.payload=t;return}t=t.return}}function oy(e,t,n){var a=Ut();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Kr(e)?T0(t,n):(n=wc(e,t,n,a),n!==null&&(Tt(n,e,a),N0(n,t,a)))}function E0(e,t,n){var a=Ut();Hi(e,t,n,a)}function Hi(e,t,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Kr(e))T0(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,r=i(o,n);if(l.hasEagerState=!0,l.eagerState=r,Ht(r,o))return Fr(e,t,l,0),Se===null&&qr(),!1}catch{}if(n=wc(e,t,l,a),n!==null)return Tt(n,e,a),N0(n,t,a),!0}return!1}function Kc(e,t,n,a){if(a={lane:2,revertLane:ld(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Kr(e)){if(t)throw Error(A(479))}else t=wc(e,n,a,2),t!==null&&Tt(t,e,2)}function Kr(e){var t=e.alternate;return e===W||t!==null&&t===W}function T0(e,t){Bl=Cr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function N0(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,dp(e,n)}}var $i={readContext:ct,use:Zr,useCallback:Re,useContext:Re,useEffect:Re,useImperativeHandle:Re,useLayoutEffect:Re,useInsertionEffect:Re,useMemo:Re,useReducer:Re,useRef:Re,useState:Re,useDebugValue:Re,useDeferredValue:Re,useTransition:Re,useSyncExternalStore:Re,useId:Re,useHostTransitionStatus:Re,useFormState:Re,useActionState:Re,useOptimistic:Re,useMemoCache:Re,useCacheRefresh:Re};$i.useEffectEvent=Re;var k0={readContext:ct,use:Zr,useCallback:function(e,t){return yt().memoizedState=[e,t===void 0?null:t],e},useContext:ct,useEffect:cm,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,nr(4194308,4,p0.bind(null,t,e),n)},useLayoutEffect:function(e,t){return nr(4194308,4,e,t)},useInsertionEffect:function(e,t){nr(4,2,e,t)},useMemo:function(e,t){var n=yt();t=t===void 0?null:t;var a=e();if(Ja){sa(!0);try{e()}finally{sa(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=yt();if(n!==void 0){var l=n(t);if(Ja){sa(!0);try{n(t)}finally{sa(!1)}}}else l=t;return a.memoizedState=a.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},a.queue=e,e=e.dispatch=oy.bind(null,W,e),[a.memoizedState,e]},useRef:function(e){var t=yt();return e={current:e},t.memoizedState=e},useState:function(e){e=Zu(e);var t=e.queue,n=E0.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Xc,useDeferredValue:function(e,t){var n=yt();return Zc(n,e,t)},useTransition:function(){var e=Zu(!1);return e=h0.bind(null,W,e.queue,!0,!1),yt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=W,l=yt();if(le){if(n===void 0)throw Error(A(407));n=n()}else{if(n=t(),Se===null)throw Error(A(349));(ae&127)!==0||e0(a,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,cm(n0.bind(null,a,i,e),[e]),a.flags|=2048,Yl(9,{destroy:void 0},t0.bind(null,a,i,n,t),null),n},useId:function(){var e=yt(),t=Se.identifierPrefix;if(le){var n=bn,a=pn;n=(a&~(1<<32-_t(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Ar++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=Pv++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Jc,useFormState:rm,useActionState:rm,useOptimistic:function(e){var t=yt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Kc.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:qc,useCacheRefresh:function(){return yt().memoizedState=iy.bind(null,W)},useEffectEvent:function(e){var t=yt(),n={impl:e};return t.memoizedState=n,function(){if((ue&2)!==0)throw Error(A(440));return n.impl.apply(void 0,arguments)}}},Ic={readContext:ct,use:Zr,useCallback:g0,useContext:ct,useEffect:Qc,useImperativeHandle:b0,useInsertionEffect:f0,useLayoutEffect:m0,useMemo:v0,useReducer:tr,useRef:c0,useState:function(){return tr(Yn)},useDebugValue:Xc,useDeferredValue:function(e,t){var n=Ye();return y0(n,xe.memoizedState,e,t)},useTransition:function(){var e=tr(Yn)[0],t=Ye().memoizedState;return[typeof e=="boolean"?e:co(e),t]},useSyncExternalStore:Pp,useId:C0,useHostTransitionStatus:Jc,useFormState:sm,useActionState:sm,useOptimistic:function(e,t){var n=Ye();return i0(n,xe,e,t)},useMemoCache:qc,useCacheRefresh:A0};Ic.useEffectEvent=d0;var O0={readContext:ct,use:Zr,useCallback:g0,useContext:ct,useEffect:Qc,useImperativeHandle:b0,useInsertionEffect:f0,useLayoutEffect:m0,useMemo:v0,useReducer:au,useRef:c0,useState:function(){return au(Yn)},useDebugValue:Xc,useDeferredValue:function(e,t){var n=Ye();return xe===null?Zc(n,e,t):y0(n,xe.memoizedState,e,t)},useTransition:function(){var e=au(Yn)[0],t=Ye().memoizedState;return[typeof e=="boolean"?e:co(e),t]},useSyncExternalStore:Pp,useId:C0,useHostTransitionStatus:Jc,useFormState:um,useActionState:um,useOptimistic:function(e,t){var n=Ye();return xe!==null?i0(n,xe,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:qc,useCacheRefresh:A0};O0.useEffectEvent=d0;function lu(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:Oe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Iu={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Ut(),l=ba(a);l.payload=t,n!=null&&(l.callback=n),t=ga(e,l,a),t!==null&&(Tt(t,e,a),Bi(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Ut(),l=ba(a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=ga(e,l,a),t!==null&&(Tt(t,e,a),Bi(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ut(),a=ba(n);a.tag=2,t!=null&&(a.callback=t),t=ga(e,a,n),t!==null&&(Tt(t,e,n),Bi(t,e,n))}};function dm(e,t,n,a,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,o):t.prototype&&t.prototype.isPureReactComponent?!Xi(n,a)||!Xi(l,i):!0}function fm(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Iu.enqueueReplaceState(t,t.state,null)}function Ka(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=Oe({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function w0(e){br(e)}function M0(e){console.error(e)}function L0(e){br(e)}function Er(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function mm(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function $u(e,t,n){return n=ba(n),n.tag=3,n.payload={element:null},n.callback=function(){Er(e,t)},n}function z0(e){return e=ba(e),e.tag=3,e}function D0(e,t,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;e.payload=function(){return l(i)},e.callback=function(){mm(t,n,a)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){mm(t,n,a),typeof l!="function"&&(va===null?va=new Set([this]):va.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function ry(e,t,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Kl(t,n,l,!0),n=Rt.current,n!==null){switch(n.tag){case 31:case 13:return Wt===null?wr():n.alternate===null&&Ge===0&&(Ge=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===hr?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),bu(e,a,l)),!1;case 22:return n.flags|=65536,a===hr?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),bu(e,a,l)),!1}throw Error(A(435,n.tag))}return bu(e,a,l),wr(),!1}if(le)return t=Rt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,a!==Ru&&(e=Error(A(422),{cause:a}),Ji(It(e,n)))):(a!==Ru&&(t=Error(A(423),{cause:a}),Ji(It(t,n))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,a=It(a,n),l=$u(e.stateNode,a,l),nu(e,l),Ge!==4&&(Ge=2)),!1;var i=Error(A(520),{cause:a});if(i=It(i,n),Vi===null?Vi=[i]:Vi.push(i),Ge!==4&&(Ge=2),t===null)return!0;a=It(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=$u(n.stateNode,a,e),nu(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(va===null||!va.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=z0(l),D0(l,e,n,a),nu(n,l),!1}n=n.return}while(n!==null);return!1}var $c=Error(A(461)),Ie=!1;function rt(e,t,n,a){t.child=e===null?Zp(t,null,n,a):Za(t,e.child,n,a)}function pm(e,t,n,a,l){n=n.render;var i=t.ref;if("ref"in a){var o={};for(var r in a)r!=="ref"&&(o[r]=a[r])}else o=a;return Xa(t),a=Gc(e,t,n,o,i,l),r=Vc(),e!==null&&!Ie?(Yc(e,t,l),jn(e,t,l)):(le&&r&&Lc(t),t.flags|=1,rt(e,t,a,l),t.child)}function bm(e,t,n,a,l){if(e===null){var i=n.type;return typeof i=="function"&&!Mc(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,B0(e,t,i,a,l)):(e=Po(n.type,null,a,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Wc(e,l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Xi,n(o,a)&&e.ref===t.ref)return jn(e,t,l)}return t.flags|=1,e=Un(i,a),e.ref=t.ref,e.return=t,t.child=e}function B0(e,t,n,a,l){if(e!==null){var i=e.memoizedProps;if(Xi(i,a)&&e.ref===t.ref)if(Ie=!1,t.pendingProps=a=i,Wc(e,l))(e.flags&131072)!==0&&(Ie=!0);else return t.lanes=e.lanes,jn(e,t,l)}return Wu(e,t,n,a,l)}function _0(e,t,n,a){var l=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,t.child=null;return gm(e,t,i,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&er(t,i!==null?i.cachePool:null),i!==null?lm(t,i):Qu(),Ip(t);else return a=t.lanes=536870912,gm(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(er(t,i.cachePool),lm(t,i),oa(t),t.memoizedState=null):(e!==null&&er(t,null),Qu(),oa(t));return rt(e,t,l,n),t.child}function Oi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function gm(e,t,n,a,l){var i=Bc();return i=i===null?null:{parent:Ke._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&er(t,null),Qu(),Ip(t),e!==null&&Kl(e,t,a,!0),t.childLanes=l,null}function ar(e,t){return t=Tr({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function vm(e,t,n){return Za(t,e.child,null,n),e=ar(t,t.pendingProps),e.flags|=2,Mt(t),t.memoizedState=null,e}function sy(e,t,n){var a=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(le){if(a.mode==="hidden")return e=ar(t,a),t.lanes=536870912,Oi(null,e);if(Xu(t),(e=ke)?(e=kb(e,$t),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ca!==null?{id:pn,overflow:bn}:null,retryLane:536870912,hydrationErrors:null},n=Vp(e),n.return=t,t.child=n,ut=t,ke=null)):e=null,e===null)throw Aa(t);return t.lanes=536870912,null}return ar(t,a)}var i=e.memoizedState;if(i!==null){var o=i.dehydrated;if(Xu(t),l)if(t.flags&256)t.flags&=-257,t=vm(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(A(558));else if(Ie||Kl(e,t,n,!1),l=(n&e.childLanes)!==0,Ie||l){if(a=Se,a!==null&&(o=fp(a,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,Pa(e,o),Tt(a,e,o),$c;wr(),t=vm(e,t,n)}else e=i.treeContext,ke=Pt(o.nextSibling),ut=t,le=!0,pa=null,$t=!1,e!==null&&jp(t,e),t=ar(t,a),t.flags|=4096;return t}return e=Un(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function lr(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(A(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Wu(e,t,n,a,l){return Xa(t),n=Gc(e,t,n,a,void 0,l),a=Vc(),e!==null&&!Ie?(Yc(e,t,l),jn(e,t,l)):(le&&a&&Lc(t),t.flags|=1,rt(e,t,n,l),t.child)}function ym(e,t,n,a,l,i){return Xa(t),t.updateQueue=null,n=Wp(t,a,n,l),$p(e),a=Vc(),e!==null&&!Ie?(Yc(e,t,i),jn(e,t,i)):(le&&a&&Lc(t),t.flags|=1,rt(e,t,n,i),t.child)}function hm(e,t,n,a,l){if(Xa(t),t.stateNode===null){var i=Tl,o=n.contextType;typeof o=="object"&&o!==null&&(i=ct(o)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Iu,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},Uc(t),o=n.contextType,i.context=typeof o=="object"&&o!==null?ct(o):Tl,i.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(lu(t,n,o,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Iu.enqueueReplaceState(i,i.state,null),Ui(t,a,i,l),_i(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var r=t.memoizedProps,s=Ka(n,r);i.props=s;var d=i.context,p=n.contextType;o=Tl,typeof p=="object"&&p!==null&&(o=ct(p));var g=n.getDerivedStateFromProps;p=typeof g=="function"||typeof i.getSnapshotBeforeUpdate=="function",r=t.pendingProps!==r,p||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r||d!==o)&&fm(t,i,a,o),aa=!1;var c=t.memoizedState;i.state=c,Ui(t,a,i,l),_i(),d=t.memoizedState,r||c!==d||aa?(typeof g=="function"&&(lu(t,n,g,a),d=t.memoizedState),(s=aa||dm(t,n,s,a,c,d,o))?(p||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=d),i.props=a,i.state=d,i.context=o,a=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,qu(e,t),o=t.memoizedProps,p=Ka(n,o),i.props=p,g=t.pendingProps,c=i.context,d=n.contextType,s=Tl,typeof d=="object"&&d!==null&&(s=ct(d)),r=n.getDerivedStateFromProps,(d=typeof r=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==g||c!==s)&&fm(t,i,a,s),aa=!1,c=t.memoizedState,i.state=c,Ui(t,a,i,l),_i();var m=t.memoizedState;o!==g||c!==m||aa||e!==null&&e.dependencies!==null&&yr(e.dependencies)?(typeof r=="function"&&(lu(t,n,r,a),m=t.memoizedState),(p=aa||dm(t,n,p,a,c,m,s)||e!==null&&e.dependencies!==null&&yr(e.dependencies))?(d||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,m,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,m,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=m),i.props=a,i.state=m,i.context=s,a=p):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,lr(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=Za(t,e.child,null,l),t.child=Za(t,null,n,l)):rt(e,t,n,l),t.memoizedState=i.state,e=t.child):e=jn(e,t,l),e}function xm(e,t,n,a){return Qa(),t.flags|=256,rt(e,t,n,a),t.child}var iu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ou(e){return{baseLanes:e,cachePool:Fp()}}function ru(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=zt),e}function U0(e,t,n){var a=t.pendingProps,l=!1,i=(t.flags&128)!==0,o;if((o=i)||(o=e!==null&&e.memoizedState===null?!1:(Ve.current&2)!==0),o&&(l=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(le){if(l?ia(t):oa(t),(e=ke)?(e=kb(e,$t),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ca!==null?{id:pn,overflow:bn}:null,retryLane:536870912,hydrationErrors:null},n=Vp(e),n.return=t,t.child=n,ut=t,ke=null)):e=null,e===null)throw Aa(t);return fc(e)?t.lanes=32:t.lanes=536870912,null}var r=a.children;return a=a.fallback,l?(oa(t),l=t.mode,r=Tr({mode:"hidden",children:r},l),a=Ya(a,l,n,null),r.return=t,a.return=t,r.sibling=a,t.child=r,a=t.child,a.memoizedState=ou(n),a.childLanes=ru(e,o,n),t.memoizedState=iu,Oi(null,a)):(ia(t),Pu(t,r))}var s=e.memoizedState;if(s!==null&&(r=s.dehydrated,r!==null)){if(i)t.flags&256?(ia(t),t.flags&=-257,t=su(e,t,n)):t.memoizedState!==null?(oa(t),t.child=e.child,t.flags|=128,t=null):(oa(t),r=a.fallback,l=t.mode,a=Tr({mode:"visible",children:a.children},l),r=Ya(r,l,n,null),r.flags|=2,a.return=t,r.return=t,a.sibling=r,t.child=a,Za(t,e.child,null,n),a=t.child,a.memoizedState=ou(n),a.childLanes=ru(e,o,n),t.memoizedState=iu,t=Oi(null,a));else if(ia(t),fc(r)){if(o=r.nextSibling&&r.nextSibling.dataset,o)var d=o.dgst;o=d,a=Error(A(419)),a.stack="",a.digest=o,Ji({value:a,source:null,stack:null}),t=su(e,t,n)}else if(Ie||Kl(e,t,n,!1),o=(n&e.childLanes)!==0,Ie||o){if(o=Se,o!==null&&(a=fp(o,n),a!==0&&a!==s.retryLane))throw s.retryLane=a,Pa(e,a),Tt(o,e,a),$c;dc(r)||wr(),t=su(e,t,n)}else dc(r)?(t.flags|=192,t.child=e.child,t=null):(e=s.treeContext,ke=Pt(r.nextSibling),ut=t,le=!0,pa=null,$t=!1,e!==null&&jp(t,e),t=Pu(t,a.children),t.flags|=4096);return t}return l?(oa(t),r=a.fallback,l=t.mode,s=e.child,d=s.sibling,a=Un(s,{mode:"hidden",children:a.children}),a.subtreeFlags=s.subtreeFlags&65011712,d!==null?r=Un(d,r):(r=Ya(r,l,n,null),r.flags|=2),r.return=t,a.return=t,a.sibling=r,t.child=a,Oi(null,a),a=t.child,r=e.child.memoizedState,r===null?r=ou(n):(l=r.cachePool,l!==null?(s=Ke._currentValue,l=l.parent!==s?{parent:s,pool:s}:l):l=Fp(),r={baseLanes:r.baseLanes|n,cachePool:l}),a.memoizedState=r,a.childLanes=ru(e,o,n),t.memoizedState=iu,Oi(e.child,a)):(ia(t),n=e.child,e=n.sibling,n=Un(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Pu(e,t){return t=Tr({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Tr(e,t){return e=Lt(22,e,null,t),e.lanes=0,e}function su(e,t,n){return Za(t,e.child,null,n),e=Pu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Sm(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Vu(e.return,t,n)}function uu(e,t,n,a,l,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=l,o.treeForkCount=i)}function H0(e,t,n){var a=t.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var o=Ve.current,r=(o&2)!==0;if(r?(o=o&1|2,t.flags|=128):o&=1,Ae(Ve,o),rt(e,t,a,n),a=le?Zi:0,!r&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Sm(e,n,t);else if(e.tag===19)Sm(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Sr(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),uu(t,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Sr(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}uu(t,!0,n,null,i,a);break;case"together":uu(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function jn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ta|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Kl(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(A(153));if(t.child!==null){for(e=t.child,n=Un(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Un(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Wc(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&yr(e)))}function uy(e,t,n){switch(t.tag){case 3:dr(t,t.stateNode.containerInfo),la(t,Ke,e.memoizedState.cache),Qa();break;case 27:case 5:ku(t);break;case 4:dr(t,t.stateNode.containerInfo);break;case 10:la(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Xu(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(ia(t),t.flags|=128,null):(n&t.child.childLanes)!==0?U0(e,t,n):(ia(t),e=jn(e,t,n),e!==null?e.sibling:null);ia(t);break;case 19:var l=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Kl(e,t,n,!1),a=(n&t.childLanes)!==0),l){if(a)return H0(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Ae(Ve,Ve.current),a)break;return null;case 22:return t.lanes=0,_0(e,t,n,t.pendingProps);case 24:la(t,Ke,e.memoizedState.cache)}return jn(e,t,n)}function R0(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ie=!0;else{if(!Wc(e,n)&&(t.flags&128)===0)return Ie=!1,uy(e,t,n);Ie=(e.flags&131072)!==0}else Ie=!1,le&&(t.flags&1048576)!==0&&Yp(t,Zi,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=Ra(t.elementType),t.type=e,typeof e=="function")Mc(e)?(a=Ka(e,a),t.tag=1,t=hm(null,t,e,a,n)):(t.tag=0,t=Wu(null,t,e,a,n));else{if(e!=null){var l=e.$$typeof;if(l===gc){t.tag=11,t=pm(null,t,e,a,n);break e}else if(l===vc){t.tag=14,t=bm(null,t,e,a,n);break e}}throw t=Tu(e)||e,Error(A(306,t,""))}}return t;case 0:return Wu(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,l=Ka(a,t.pendingProps),hm(e,t,a,l,n);case 3:e:{if(dr(t,t.stateNode.containerInfo),e===null)throw Error(A(387));a=t.pendingProps;var i=t.memoizedState;l=i.element,qu(e,t),Ui(t,a,null,n);var o=t.memoizedState;if(a=o.cache,la(t,Ke,a),a!==i.cache&&Yu(t,[Ke],n,!0),_i(),a=o.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=xm(e,t,a,n);break e}else if(a!==l){l=It(Error(A(424)),t),Ji(l),t=xm(e,t,a,n);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,ke=Pt(e.firstChild),ut=t,le=!0,pa=null,$t=!0,n=Zp(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Qa(),a===l){t=jn(e,t,n);break e}rt(e,t,a,n)}t=t.child}return t;case 26:return lr(e,t),e===null?(n=qm(t.type,null,t.pendingProps,null))?t.memoizedState=n:le||(n=t.type,e=t.pendingProps,a=Dr(ma.current).createElement(n),a[st]=t,a[Nt]=e,dt(a,n,e),at(a),t.stateNode=a):t.memoizedState=qm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ku(t),e===null&&le&&(a=t.stateNode=Ob(t.type,t.pendingProps,ma.current),ut=t,$t=!0,l=ke,ka(t.type)?(mc=l,ke=Pt(a.firstChild)):ke=l),rt(e,t,t.pendingProps.children,n),lr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&le&&((l=a=ke)&&(a=Hy(a,t.type,t.pendingProps,$t),a!==null?(t.stateNode=a,ut=t,ke=Pt(a.firstChild),$t=!1,l=!0):l=!1),l||Aa(t)),ku(t),l=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,uc(l,i)?a=null:o!==null&&uc(l,o)&&(t.flags|=32),t.memoizedState!==null&&(l=Gc(e,t,ey,null,null,n),eo._currentValue=l),lr(e,t),rt(e,t,a,n),t.child;case 6:return e===null&&le&&((e=n=ke)&&(n=Ry(n,t.pendingProps,$t),n!==null?(t.stateNode=n,ut=t,ke=null,e=!0):e=!1),e||Aa(t)),null;case 13:return U0(e,t,n);case 4:return dr(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Za(t,null,a,n):rt(e,t,a,n),t.child;case 11:return pm(e,t,t.type,t.pendingProps,n);case 7:return rt(e,t,t.pendingProps,n),t.child;case 8:return rt(e,t,t.pendingProps.children,n),t.child;case 12:return rt(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,la(t,t.type,a.value),rt(e,t,a.children,n),t.child;case 9:return l=t.type._context,a=t.pendingProps.children,Xa(t),l=ct(l),a=a(l),t.flags|=1,rt(e,t,a,n),t.child;case 14:return bm(e,t,t.type,t.pendingProps,n);case 15:return B0(e,t,t.type,t.pendingProps,n);case 19:return H0(e,t,n);case 31:return sy(e,t,n);case 22:return _0(e,t,n,t.pendingProps);case 24:return Xa(t),a=ct(Ke),e===null?(l=Bc(),l===null&&(l=Se,i=Dc(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),t.memoizedState={parent:a,cache:l},Uc(t),la(t,Ke,l)):((e.lanes&n)!==0&&(qu(e,t),Ui(t,null,null,n),_i()),l=e.memoizedState,i=t.memoizedState,l.parent!==a?(l={parent:a,cache:a},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),la(t,Ke,a)):(a=i.cache,la(t,Ke,a),a!==l.cache&&Yu(t,[Ke],n,!0))),rt(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(A(156,t.tag))}function kn(e){e.flags|=4}function cu(e,t,n,a,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(sb())e.flags|=8192;else throw qa=hr,_c}else e.flags&=-16777217}function Cm(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Lb(t))if(sb())e.flags|=8192;else throw qa=hr,_c}function jo(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?up():536870912,e.lanes|=t,jl|=t)}function Si(e,t){if(!le)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Ne(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function cy(e,t,n){var a=t.pendingProps;switch(zc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ne(t),null;case 1:return Ne(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Hn(Ke),Ul(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ml(t)?kn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,tu())),Ne(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(kn(t),i!==null?(Ne(t),Cm(t,i)):(Ne(t),cu(t,l,null,a,n))):i?i!==e.memoizedState?(kn(t),Ne(t),Cm(t,i)):(Ne(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&kn(t),Ne(t),cu(t,l,e,a,n)),null;case 27:if(fr(t),n=ma.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&kn(t);else{if(!a){if(t.stateNode===null)throw Error(A(166));return Ne(t),null}e=vn.current,ml(t)?$f(t,e):(e=Ob(l,a,n),t.stateNode=e,kn(t))}return Ne(t),null;case 5:if(fr(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&kn(t);else{if(!a){if(t.stateNode===null)throw Error(A(166));return Ne(t),null}if(i=vn.current,ml(t))$f(t,i);else{var o=Dr(ma.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?o.createElement("select",{is:a.is}):o.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?o.createElement(l,{is:a.is}):o.createElement(l)}}i[st]=t,i[Nt]=a;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=i;e:switch(dt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&kn(t)}}return Ne(t),cu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&kn(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(A(166));if(e=ma.current,ml(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,l=ut,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}e[st]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Eb(e.nodeValue,n)),e||Aa(t,!0)}else e=Dr(e).createTextNode(a),e[st]=t,t.stateNode=e}return Ne(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=ml(t),n!==null){if(e===null){if(!a)throw Error(A(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(557));e[st]=t}else Qa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ne(t),e=!1}else n=tu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Mt(t),t):(Mt(t),null);if((t.flags&128)!==0)throw Error(A(558))}return Ne(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=ml(t),a!==null&&a.dehydrated!==null){if(e===null){if(!l)throw Error(A(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(A(317));l[st]=t}else Qa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ne(t),l=!1}else l=tu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(Mt(t),t):(Mt(t),null)}return Mt(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),jo(t,t.updateQueue),Ne(t),null);case 4:return Ul(),e===null&&id(t.stateNode.containerInfo),Ne(t),null;case 10:return Hn(t.type),Ne(t),null;case 19:if(lt(Ve),a=t.memoizedState,a===null)return Ne(t),null;if(l=(t.flags&128)!==0,i=a.rendering,i===null)if(l)Si(a,!1);else{if(Ge!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Sr(e),i!==null){for(t.flags|=128,Si(a,!1),e=i.updateQueue,t.updateQueue=e,jo(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Gp(n,e),n=n.sibling;return Ae(Ve,Ve.current&1|2),le&&Ln(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&Dt()>kr&&(t.flags|=128,l=!0,Si(a,!1),t.lanes=4194304)}else{if(!l)if(e=Sr(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,jo(t,e),Si(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!le)return Ne(t),null}else 2*Dt()-a.renderingStartTime>kr&&n!==536870912&&(t.flags|=128,l=!0,Si(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Dt(),e.sibling=null,n=Ve.current,Ae(Ve,l?n&1|2:n&1),le&&Ln(t,a.treeForkCount),e):(Ne(t),null);case 22:case 23:return Mt(t),Hc(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(Ne(t),t.subtreeFlags&6&&(t.flags|=8192)):Ne(t),n=t.updateQueue,n!==null&&jo(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&lt(ja),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Hn(Ke),Ne(t),null;case 25:return null;case 30:return null}throw Error(A(156,t.tag))}function dy(e,t){switch(zc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Hn(Ke),Ul(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return fr(t),null;case 31:if(t.memoizedState!==null){if(Mt(t),t.alternate===null)throw Error(A(340));Qa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Mt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(A(340));Qa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return lt(Ve),null;case 4:return Ul(),null;case 10:return Hn(t.type),null;case 22:case 23:return Mt(t),Hc(),e!==null&&lt(ja),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Hn(Ke),null;case 25:return null;default:return null}}function G0(e,t){switch(zc(t),t.tag){case 3:Hn(Ke),Ul();break;case 26:case 27:case 5:fr(t);break;case 4:Ul();break;case 31:t.memoizedState!==null&&Mt(t);break;case 13:Mt(t);break;case 19:lt(Ve);break;case 10:Hn(t.type);break;case 22:case 23:Mt(t),Hc(),e!==null&&lt(ja);break;case 24:Hn(Ke)}}function fo(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&e)===e){a=void 0;var i=n.create,o=n.inst;a=i(),o.destroy=a}n=n.next}while(n!==l)}}catch(r){be(t,t.return,r)}}function Ea(e,t,n){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&e)===e){var o=a.inst,r=o.destroy;if(r!==void 0){o.destroy=void 0,l=t;var s=n,d=r;try{d()}catch(p){be(l,s,p)}}}a=a.next}while(a!==i)}}catch(p){be(t,t.return,p)}}function V0(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Kp(t,n)}catch(a){be(e,e.return,a)}}}function Y0(e,t,n){n.props=Ka(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){be(e,t,a)}}function Ri(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(l){be(e,t,l)}}function gn(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){be(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){be(e,t,l)}else n.current=null}function j0(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){be(e,e.return,l)}}function du(e,t,n){try{var a=e.stateNode;Ly(a,e.type,n,t),a[Nt]=t}catch(l){be(e,e.return,l)}}function q0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ka(e.type)||e.tag===4}function fu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||q0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ka(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ec(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Bn));else if(a!==4&&(a===27&&ka(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(ec(e,t,n),e=e.sibling;e!==null;)ec(e,t,n),e=e.sibling}function Nr(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&ka(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Nr(e,t,n),e=e.sibling;e!==null;)Nr(e,t,n),e=e.sibling}function F0(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);dt(t,a,n),t[st]=e,t[Nt]=n}catch(i){be(e,e.return,i)}}var zn=!1,Je=!1,mu=!1,Am=typeof WeakSet=="function"?WeakSet:Set,nt=null;function fy(e,t){if(e=e.containerInfo,rc=Hr,e=Lp(e),kc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,r=-1,s=-1,d=0,p=0,g=e,c=null;t:for(;;){for(var m;g!==n||l!==0&&g.nodeType!==3||(r=o+l),g!==i||a!==0&&g.nodeType!==3||(s=o+a),g.nodeType===3&&(o+=g.nodeValue.length),(m=g.firstChild)!==null;)c=g,g=m;for(;;){if(g===e)break t;if(c===n&&++d===l&&(r=o),c===i&&++p===a&&(s=o),(m=g.nextSibling)!==null)break;g=c,c=g.parentNode}g=m}n=r===-1||s===-1?null:{start:r,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(sc={focusedElem:e,selectionRange:n},Hr=!1,nt=t;nt!==null;)if(t=nt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,nt=e;else for(;nt!==null;){switch(t=nt,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var C=Ka(n.type,l);e=a.getSnapshotBeforeUpdate(C,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(N){be(n,n.return,N)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)cc(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":cc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(A(163))}if(e=t.sibling,e!==null){e.return=t.return,nt=e;break}nt=t.return}}function Q0(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:wn(e,n),a&4&&fo(5,n);break;case 1:if(wn(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(o){be(n,n.return,o)}else{var l=Ka(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){be(n,n.return,o)}}a&64&&V0(n),a&512&&Ri(n,n.return);break;case 3:if(wn(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Kp(e,t)}catch(o){be(n,n.return,o)}}break;case 27:t===null&&a&4&&F0(n);case 26:case 5:wn(e,n),t===null&&a&4&&j0(n),a&512&&Ri(n,n.return);break;case 12:wn(e,n);break;case 31:wn(e,n),a&4&&J0(e,n);break;case 13:wn(e,n),a&4&&K0(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Sy.bind(null,n),Gy(e,n))));break;case 22:if(a=n.memoizedState!==null||zn,!a){t=t!==null&&t.memoizedState!==null||Je,l=zn;var i=Je;zn=a,(Je=t)&&!i?Mn(e,n,(n.subtreeFlags&8772)!==0):wn(e,n),zn=l,Je=i}break;case 30:break;default:wn(e,n)}}function X0(e){var t=e.alternate;t!==null&&(e.alternate=null,X0(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Sc(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ze=null,At=!1;function On(e,t,n){for(n=n.child;n!==null;)Z0(e,t,n),n=n.sibling}function Z0(e,t,n){if(Bt&&typeof Bt.onCommitFiberUnmount=="function")try{Bt.onCommitFiberUnmount(lo,n)}catch{}switch(n.tag){case 26:Je||gn(n,t),On(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Je||gn(n,t);var a=ze,l=At;ka(n.type)&&(ze=n.stateNode,At=!1),On(e,t,n),ji(n.stateNode),ze=a,At=l;break;case 5:Je||gn(n,t);case 6:if(a=ze,l=At,ze=null,On(e,t,n),ze=a,At=l,ze!==null)if(At)try{(ze.nodeType===9?ze.body:ze.nodeName==="HTML"?ze.ownerDocument.body:ze).removeChild(n.stateNode)}catch(i){be(n,t,i)}else try{ze.removeChild(n.stateNode)}catch(i){be(n,t,i)}break;case 18:ze!==null&&(At?(e=ze,Rm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Xl(e)):Rm(ze,n.stateNode));break;case 4:a=ze,l=At,ze=n.stateNode.containerInfo,At=!0,On(e,t,n),ze=a,At=l;break;case 0:case 11:case 14:case 15:Ea(2,n,t),Je||Ea(4,n,t),On(e,t,n);break;case 1:Je||(gn(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Y0(n,t,a)),On(e,t,n);break;case 21:On(e,t,n);break;case 22:Je=(a=Je)||n.memoizedState!==null,On(e,t,n),Je=a;break;default:On(e,t,n)}}function J0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Xl(e)}catch(n){be(t,t.return,n)}}}function K0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Xl(e)}catch(n){be(t,t.return,n)}}function my(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Am),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Am),t;default:throw Error(A(435,e.tag))}}function qo(e,t){var n=my(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var l=Cy.bind(null,e,a);a.then(l,l)}})}function St(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=e,o=t,r=o;e:for(;r!==null;){switch(r.tag){case 27:if(ka(r.type)){ze=r.stateNode,At=!1;break e}break;case 5:ze=r.stateNode,At=!1;break e;case 3:case 4:ze=r.stateNode.containerInfo,At=!0;break e}r=r.return}if(ze===null)throw Error(A(160));Z0(i,o,l),ze=null,At=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)I0(t,e),t=t.sibling}var sn=null;function I0(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:St(t,e),Ct(e),a&4&&(Ea(3,e,e.return),fo(3,e),Ea(5,e,e.return));break;case 1:St(t,e),Ct(e),a&512&&(Je||n===null||gn(n,n.return)),a&64&&zn&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=sn;if(St(t,e),Ct(e),a&512&&(Je||n===null||gn(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,l=l.ownerDocument||l;t:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[ro]||i[st]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),dt(i,a,n),i[st]=e,at(i),a=i;break e;case"link":var o=Qm("link","href",l).get(a+(n.href||""));if(o){for(var r=0;r<o.length;r++)if(i=o[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(r,1);break t}}i=l.createElement(a),dt(i,a,n),l.head.appendChild(i);break;case"meta":if(o=Qm("meta","content",l).get(a+(n.content||""))){for(r=0;r<o.length;r++)if(i=o[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){o.splice(r,1);break t}}i=l.createElement(a),dt(i,a,n),l.head.appendChild(i);break;default:throw Error(A(468,a))}i[st]=e,at(i),a=i}e.stateNode=a}else Xm(l,e.type,e.stateNode);else e.stateNode=Fm(l,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Xm(l,e.type,e.stateNode):Fm(l,a,e.memoizedProps)):a===null&&e.stateNode!==null&&du(e,e.memoizedProps,n.memoizedProps)}break;case 27:St(t,e),Ct(e),a&512&&(Je||n===null||gn(n,n.return)),n!==null&&a&4&&du(e,e.memoizedProps,n.memoizedProps);break;case 5:if(St(t,e),Ct(e),a&512&&(Je||n===null||gn(n,n.return)),e.flags&32){l=e.stateNode;try{Rl(l,"")}catch(C){be(e,e.return,C)}}a&4&&e.stateNode!=null&&(l=e.memoizedProps,du(e,l,n!==null?n.memoizedProps:l)),a&1024&&(mu=!0);break;case 6:if(St(t,e),Ct(e),a&4){if(e.stateNode===null)throw Error(A(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(C){be(e,e.return,C)}}break;case 3:if(rr=null,l=sn,sn=Br(t.containerInfo),St(t,e),sn=l,Ct(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Xl(t.containerInfo)}catch(C){be(e,e.return,C)}mu&&(mu=!1,$0(e));break;case 4:a=sn,sn=Br(e.stateNode.containerInfo),St(t,e),Ct(e),sn=a;break;case 12:St(t,e),Ct(e);break;case 31:St(t,e),Ct(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,qo(e,a)));break;case 13:St(t,e),Ct(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ir=Dt()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,qo(e,a)));break;case 22:l=e.memoizedState!==null;var s=n!==null&&n.memoizedState!==null,d=zn,p=Je;if(zn=d||l,Je=p||s,St(t,e),Je=p,zn=d,Ct(e),a&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(n===null||s||zn||Je||Ga(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){s=n=t;try{if(i=s.stateNode,l)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{r=s.stateNode;var g=s.memoizedProps.style,c=g!=null&&g.hasOwnProperty("display")?g.display:null;r.style.display=c==null||typeof c=="boolean"?"":(""+c).trim()}}catch(C){be(s,s.return,C)}}}else if(t.tag===6){if(n===null){s=t;try{s.stateNode.nodeValue=l?"":s.memoizedProps}catch(C){be(s,s.return,C)}}}else if(t.tag===18){if(n===null){s=t;try{var m=s.stateNode;l?Gm(m,!0):Gm(s.stateNode,!1)}catch(C){be(s,s.return,C)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,qo(e,n))));break;case 19:St(t,e),Ct(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,qo(e,a)));break;case 30:break;case 21:break;default:St(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(q0(a)){n=a;break}a=a.return}if(n==null)throw Error(A(160));switch(n.tag){case 27:var l=n.stateNode,i=fu(e);Nr(e,i,l);break;case 5:var o=n.stateNode;n.flags&32&&(Rl(o,""),n.flags&=-33);var r=fu(e);Nr(e,r,o);break;case 3:case 4:var s=n.stateNode.containerInfo,d=fu(e);ec(e,d,s);break;default:throw Error(A(161))}}catch(p){be(e,e.return,p)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;$0(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function wn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Q0(e,t.alternate,t),t=t.sibling}function Ga(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ea(4,t,t.return),Ga(t);break;case 1:gn(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Y0(t,t.return,n),Ga(t);break;case 27:ji(t.stateNode);case 26:case 5:gn(t,t.return),Ga(t);break;case 22:t.memoizedState===null&&Ga(t);break;case 30:Ga(t);break;default:Ga(t)}e=e.sibling}}function Mn(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,l=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:Mn(l,i,n),fo(4,i);break;case 1:if(Mn(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(d){be(a,a.return,d)}if(a=i,l=a.updateQueue,l!==null){var r=a.stateNode;try{var s=l.shared.hiddenCallbacks;if(s!==null)for(l.shared.hiddenCallbacks=null,l=0;l<s.length;l++)Jp(s[l],r)}catch(d){be(a,a.return,d)}}n&&o&64&&V0(i),Ri(i,i.return);break;case 27:F0(i);case 26:case 5:Mn(l,i,n),n&&a===null&&o&4&&j0(i),Ri(i,i.return);break;case 12:Mn(l,i,n);break;case 31:Mn(l,i,n),n&&o&4&&J0(l,i);break;case 13:Mn(l,i,n),n&&o&4&&K0(l,i);break;case 22:i.memoizedState===null&&Mn(l,i,n),Ri(i,i.return);break;case 30:break;default:Mn(l,i,n)}t=t.sibling}}function Pc(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&uo(n))}function ed(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&uo(e))}function rn(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)W0(e,t,n,a),t=t.sibling}function W0(e,t,n,a){var l=t.flags;switch(t.tag){case 0:case 11:case 15:rn(e,t,n,a),l&2048&&fo(9,t);break;case 1:rn(e,t,n,a);break;case 3:rn(e,t,n,a),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&uo(e)));break;case 12:if(l&2048){rn(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,r=i.onPostCommit;typeof r=="function"&&r(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(s){be(t,t.return,s)}}else rn(e,t,n,a);break;case 31:rn(e,t,n,a);break;case 13:rn(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,t.memoizedState!==null?i._visibility&2?rn(e,t,n,a):Gi(e,t):i._visibility&2?rn(e,t,n,a):(i._visibility|=2,bl(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Pc(o,t);break;case 24:rn(e,t,n,a),l&2048&&ed(t.alternate,t);break;default:rn(e,t,n,a)}}function bl(e,t,n,a,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,o=t,r=n,s=a,d=o.flags;switch(o.tag){case 0:case 11:case 15:bl(i,o,r,s,l),fo(8,o);break;case 23:break;case 22:var p=o.stateNode;o.memoizedState!==null?p._visibility&2?bl(i,o,r,s,l):Gi(i,o):(p._visibility|=2,bl(i,o,r,s,l)),l&&d&2048&&Pc(o.alternate,o);break;case 24:bl(i,o,r,s,l),l&&d&2048&&ed(o.alternate,o);break;default:bl(i,o,r,s,l)}t=t.sibling}}function Gi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,l=a.flags;switch(a.tag){case 22:Gi(n,a),l&2048&&Pc(a.alternate,a);break;case 24:Gi(n,a),l&2048&&ed(a.alternate,a);break;default:Gi(n,a)}t=t.sibling}}var wi=8192;function pl(e,t,n){if(e.subtreeFlags&wi)for(e=e.child;e!==null;)P0(e,t,n),e=e.sibling}function P0(e,t,n){switch(e.tag){case 26:pl(e,t,n),e.flags&wi&&e.memoizedState!==null&&$y(n,sn,e.memoizedState,e.memoizedProps);break;case 5:pl(e,t,n);break;case 3:case 4:var a=sn;sn=Br(e.stateNode.containerInfo),pl(e,t,n),sn=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=wi,wi=16777216,pl(e,t,n),wi=a):pl(e,t,n));break;default:pl(e,t,n)}}function eb(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ci(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];nt=a,nb(a,e)}eb(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)tb(e),e=e.sibling}function tb(e){switch(e.tag){case 0:case 11:case 15:Ci(e),e.flags&2048&&Ea(9,e,e.return);break;case 3:Ci(e);break;case 12:Ci(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ir(e)):Ci(e);break;default:Ci(e)}}function ir(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];nt=a,nb(a,e)}eb(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ea(8,t,t.return),ir(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,ir(t));break;default:ir(t)}e=e.sibling}}function nb(e,t){for(;nt!==null;){var n=nt;switch(n.tag){case 0:case 11:case 15:Ea(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:uo(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,nt=a;else e:for(n=e;nt!==null;){a=nt;var l=a.sibling,i=a.return;if(X0(a),a===n){nt=null;break e}if(l!==null){l.return=i,nt=l;break e}nt=i}}}var py={getCacheForType:function(e){var t=ct(Ke),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ct(Ke).controller.signal}},by=typeof WeakMap=="function"?WeakMap:Map,ue=0,Se=null,ne=null,ae=0,pe=0,wt=null,ca=!1,$l=!1,td=!1,qn=0,Ge=0,Ta=0,Fa=0,nd=0,zt=0,jl=0,Vi=null,Et=null,tc=!1,Ir=0,ab=0,kr=1/0,Or=null,va=null,We=0,ya=null,ql=null,Rn=0,nc=0,ac=null,lb=null,Yi=0,lc=null;function Ut(){return(ue&2)!==0&&ae!==0?ae&-ae:J.T!==null?ld():mp()}function ib(){if(zt===0)if((ae&536870912)===0||le){var e=Do;Do<<=1,(Do&3932160)===0&&(Do=262144),zt=e}else zt=536870912;return e=Rt.current,e!==null&&(e.flags|=32),zt}function Tt(e,t,n){(e===Se&&(pe===2||pe===9)||e.cancelPendingCommit!==null)&&(Fl(e,0),da(e,ae,zt,!1)),oo(e,n),((ue&2)===0||e!==Se)&&(e===Se&&((ue&2)===0&&(Fa|=n),Ge===4&&da(e,ae,zt,!1)),hn(e))}function ob(e,t,n){if((ue&6)!==0)throw Error(A(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||io(e,t),l=a?yy(e,t):pu(e,t,!0),i=a;do{if(l===0){$l&&!a&&da(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!gy(n)){l=pu(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var r=e;l=Vi;var s=r.current.memoizedState.isDehydrated;if(s&&(Fl(r,o).flags|=256),o=pu(r,o,!1),o!==2){if(td&&!s){r.errorRecoveryDisabledLanes|=i,Fa|=i,l=4;break e}i=Et,Et=l,i!==null&&(Et===null?Et=i:Et.push.apply(Et,i))}l=o}if(i=!1,l!==2)continue}}if(l===1){Fl(e,0),da(e,t,0,!0);break}e:{switch(a=e,i=l,i){case 0:case 1:throw Error(A(345));case 4:if((t&4194048)!==t)break;case 6:da(a,t,zt,!ca);break e;case 2:Et=null;break;case 3:case 5:break;default:throw Error(A(329))}if((t&62914560)===t&&(l=Ir+300-Dt(),10<l)){if(da(a,t,zt,!ca),Gr(a,0,!0)!==0)break e;Rn=t,a.timeoutHandle=Nb(Em.bind(null,a,n,Et,Or,tc,t,zt,Fa,jl,ca,i,"Throttled",-0,0),l);break e}Em(a,n,Et,Or,tc,t,zt,Fa,jl,ca,i,null,-0,0)}}break}while(!0);hn(e)}function Em(e,t,n,a,l,i,o,r,s,d,p,g,c,m){if(e.timeoutHandle=-1,g=t.subtreeFlags,g&8192||(g&16785408)===16785408){g={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Bn},P0(t,i,g);var C=(i&62914560)===i?Ir-Dt():(i&4194048)===i?ab-Dt():0;if(C=Wy(g,C),C!==null){Rn=i,e.cancelPendingCommit=C(Nm.bind(null,e,t,i,n,a,l,o,r,s,p,g,null,c,m)),da(e,i,o,!d);return}}Nm(e,t,i,n,a,l,o,r,s)}function gy(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!Ht(i(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function da(e,t,n,a){t&=~nd,t&=~Fa,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var l=t;0<l;){var i=31-_t(l),o=1<<i;a[i]=-1,l&=~o}n!==0&&cp(e,n,t)}function $r(){return(ue&6)===0?(mo(0,!1),!1):!0}function ad(){if(ne!==null){if(pe===0)var e=ne.return;else e=ne,_n=el=null,jc(e),Dl=null,Ki=0,e=ne;for(;e!==null;)G0(e.alternate,e),e=e.return;ne=null}}function Fl(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,By(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Rn=0,ad(),Se=e,ne=n=Un(e.current,null),ae=t,pe=0,wt=null,ca=!1,$l=io(e,t),td=!1,jl=zt=nd=Fa=Ta=Ge=0,Et=Vi=null,tc=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var l=31-_t(a),i=1<<l;t|=e[l],a&=~i}return qn=t,qr(),n}function rb(e,t){W=null,J.H=$i,t===Il||t===Qr?(t=nm(),pe=3):t===_c?(t=nm(),pe=4):pe=t===$c?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,wt=t,ne===null&&(Ge=1,Er(e,It(t,e.current)))}function sb(){var e=Rt.current;return e===null?!0:(ae&4194048)===ae?Wt===null:(ae&62914560)===ae||(ae&536870912)!==0?e===Wt:!1}function ub(){var e=J.H;return J.H=$i,e===null?$i:e}function cb(){var e=J.A;return J.A=py,e}function wr(){Ge=4,ca||(ae&4194048)!==ae&&Rt.current!==null||($l=!0),(Ta&134217727)===0&&(Fa&134217727)===0||Se===null||da(Se,ae,zt,!1)}function pu(e,t,n){var a=ue;ue|=2;var l=ub(),i=cb();(Se!==e||ae!==t)&&(Or=null,Fl(e,t)),t=!1;var o=Ge;e:do try{if(pe!==0&&ne!==null){var r=ne,s=wt;switch(pe){case 8:ad(),o=6;break e;case 3:case 2:case 9:case 6:Rt.current===null&&(t=!0);var d=pe;if(pe=0,wt=null,Ol(e,r,s,d),n&&$l){o=0;break e}break;default:d=pe,pe=0,wt=null,Ol(e,r,s,d)}}vy(),o=Ge;break}catch(p){rb(e,p)}while(!0);return t&&e.shellSuspendCounter++,_n=el=null,ue=a,J.H=l,J.A=i,ne===null&&(Se=null,ae=0,qr()),o}function vy(){for(;ne!==null;)db(ne)}function yy(e,t){var n=ue;ue|=2;var a=ub(),l=cb();Se!==e||ae!==t?(Or=null,kr=Dt()+500,Fl(e,t)):$l=io(e,t);e:do try{if(pe!==0&&ne!==null){t=ne;var i=wt;t:switch(pe){case 1:pe=0,wt=null,Ol(e,t,i,1);break;case 2:case 9:if(tm(i)){pe=0,wt=null,Tm(t);break}t=function(){pe!==2&&pe!==9||Se!==e||(pe=7),hn(e)},i.then(t,t);break e;case 3:pe=7;break e;case 4:pe=5;break e;case 7:tm(i)?(pe=0,wt=null,Tm(t)):(pe=0,wt=null,Ol(e,t,i,7));break;case 5:var o=null;switch(ne.tag){case 26:o=ne.memoizedState;case 5:case 27:var r=ne;if(o?Lb(o):r.stateNode.complete){pe=0,wt=null;var s=r.sibling;if(s!==null)ne=s;else{var d=r.return;d!==null?(ne=d,Wr(d)):ne=null}break t}}pe=0,wt=null,Ol(e,t,i,5);break;case 6:pe=0,wt=null,Ol(e,t,i,6);break;case 8:ad(),Ge=6;break e;default:throw Error(A(462))}}hy();break}catch(p){rb(e,p)}while(!0);return _n=el=null,J.H=a,J.A=l,ue=n,ne!==null?0:(Se=null,ae=0,qr(),Ge)}function hy(){for(;ne!==null&&!jg();)db(ne)}function db(e){var t=R0(e.alternate,e,qn);e.memoizedProps=e.pendingProps,t===null?Wr(e):ne=t}function Tm(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=ym(n,t,t.pendingProps,t.type,void 0,ae);break;case 11:t=ym(n,t,t.pendingProps,t.type.render,t.ref,ae);break;case 5:jc(t);default:G0(n,t),t=ne=Gp(t,qn),t=R0(n,t,qn)}e.memoizedProps=e.pendingProps,t===null?Wr(e):ne=t}function Ol(e,t,n,a){_n=el=null,jc(t),Dl=null,Ki=0;var l=t.return;try{if(ry(e,l,t,n,ae)){Ge=1,Er(e,It(n,e.current)),ne=null;return}}catch(i){if(l!==null)throw ne=l,i;Ge=1,Er(e,It(n,e.current)),ne=null;return}t.flags&32768?(le||a===1?e=!0:$l||(ae&536870912)!==0?e=!1:(ca=e=!0,(a===2||a===9||a===3||a===6)&&(a=Rt.current,a!==null&&a.tag===13&&(a.flags|=16384))),fb(t,e)):Wr(t)}function Wr(e){var t=e;do{if((t.flags&32768)!==0){fb(t,ca);return}e=t.return;var n=cy(t.alternate,t,qn);if(n!==null){ne=n;return}if(t=t.sibling,t!==null){ne=t;return}ne=t=e}while(t!==null);Ge===0&&(Ge=5)}function fb(e,t){do{var n=dy(e.alternate,e);if(n!==null){n.flags&=32767,ne=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){ne=e;return}ne=e=n}while(e!==null);Ge=6,ne=null}function Nm(e,t,n,a,l,i,o,r,s){e.cancelPendingCommit=null;do Pr();while(We!==0);if((ue&6)!==0)throw Error(A(327));if(t!==null){if(t===e.current)throw Error(A(177));if(i=t.lanes|t.childLanes,i|=Oc,Wg(e,n,i,o,r,s),e===Se&&(ne=Se=null,ae=0),ql=t,ya=e,Rn=n,nc=i,ac=l,lb=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Ay(mr,function(){return vb(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=J.T,J.T=null,l=ce.p,ce.p=2,o=ue,ue|=4;try{fy(e,t,n)}finally{ue=o,ce.p=l,J.T=a}}We=1,mb(),pb(),bb()}}function mb(){if(We===1){We=0;var e=ya,t=ql,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=J.T,J.T=null;var a=ce.p;ce.p=2;var l=ue;ue|=4;try{I0(t,e);var i=sc,o=Lp(e.containerInfo),r=i.focusedElem,s=i.selectionRange;if(o!==r&&r&&r.ownerDocument&&Mp(r.ownerDocument.documentElement,r)){if(s!==null&&kc(r)){var d=s.start,p=s.end;if(p===void 0&&(p=d),"selectionStart"in r)r.selectionStart=d,r.selectionEnd=Math.min(p,r.value.length);else{var g=r.ownerDocument||document,c=g&&g.defaultView||window;if(c.getSelection){var m=c.getSelection(),C=r.textContent.length,N=Math.min(s.start,C),B=s.end===void 0?N:Math.min(s.end,C);!m.extend&&N>B&&(o=B,B=N,N=o);var f=Jf(r,N),u=Jf(r,B);if(f&&u&&(m.rangeCount!==1||m.anchorNode!==f.node||m.anchorOffset!==f.offset||m.focusNode!==u.node||m.focusOffset!==u.offset)){var b=g.createRange();b.setStart(f.node,f.offset),m.removeAllRanges(),N>B?(m.addRange(b),m.extend(u.node,u.offset)):(b.setEnd(u.node,u.offset),m.addRange(b))}}}}for(g=[],m=r;m=m.parentNode;)m.nodeType===1&&g.push({element:m,left:m.scrollLeft,top:m.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<g.length;r++){var v=g[r];v.element.scrollLeft=v.left,v.element.scrollTop=v.top}}Hr=!!rc,sc=rc=null}finally{ue=l,ce.p=a,J.T=n}}e.current=t,We=2}}function pb(){if(We===2){We=0;var e=ya,t=ql,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=J.T,J.T=null;var a=ce.p;ce.p=2;var l=ue;ue|=4;try{Q0(e,t.alternate,t)}finally{ue=l,ce.p=a,J.T=n}}We=3}}function bb(){if(We===4||We===3){We=0,qg();var e=ya,t=ql,n=Rn,a=lb;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?We=5:(We=0,ql=ya=null,gb(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(va=null),xc(n),t=t.stateNode,Bt&&typeof Bt.onCommitFiberRoot=="function")try{Bt.onCommitFiberRoot(lo,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=J.T,l=ce.p,ce.p=2,J.T=null;try{for(var i=e.onRecoverableError,o=0;o<a.length;o++){var r=a[o];i(r.value,{componentStack:r.stack})}}finally{J.T=t,ce.p=l}}(Rn&3)!==0&&Pr(),hn(e),l=e.pendingLanes,(n&261930)!==0&&(l&42)!==0?e===lc?Yi++:(Yi=0,lc=e):Yi=0,mo(0,!1)}}function gb(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,uo(t)))}function Pr(){return mb(),pb(),bb(),vb()}function vb(){if(We!==5)return!1;var e=ya,t=nc;nc=0;var n=xc(Rn),a=J.T,l=ce.p;try{ce.p=32>n?32:n,J.T=null,n=ac,ac=null;var i=ya,o=Rn;if(We=0,ql=ya=null,Rn=0,(ue&6)!==0)throw Error(A(331));var r=ue;if(ue|=4,tb(i.current),W0(i,i.current,o,n),ue=r,mo(0,!1),Bt&&typeof Bt.onPostCommitFiberRoot=="function")try{Bt.onPostCommitFiberRoot(lo,i)}catch{}return!0}finally{ce.p=l,J.T=a,gb(e,t)}}function km(e,t,n){t=It(n,t),t=$u(e.stateNode,t,2),e=ga(e,t,2),e!==null&&(oo(e,2),hn(e))}function be(e,t,n){if(e.tag===3)km(e,e,n);else for(;t!==null;){if(t.tag===3){km(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(va===null||!va.has(a))){e=It(n,e),n=z0(2),a=ga(t,n,2),a!==null&&(D0(n,a,t,e),oo(a,2),hn(a));break}}t=t.return}}function bu(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new by;var l=new Set;a.set(t,l)}else l=a.get(t),l===void 0&&(l=new Set,a.set(t,l));l.has(n)||(td=!0,l.add(n),e=xy.bind(null,e,t,n),t.then(e,e))}function xy(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Se===e&&(ae&n)===n&&(Ge===4||Ge===3&&(ae&62914560)===ae&&300>Dt()-Ir?(ue&2)===0&&Fl(e,0):nd|=n,jl===ae&&(jl=0)),hn(e)}function yb(e,t){t===0&&(t=up()),e=Pa(e,t),e!==null&&(oo(e,t),hn(e))}function Sy(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),yb(e,n)}function Cy(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(A(314))}a!==null&&a.delete(t),yb(e,n)}function Ay(e,t){return yc(e,t)}var Mr=null,gl=null,ic=!1,Lr=!1,gu=!1,fa=0;function hn(e){e!==gl&&e.next===null&&(gl===null?Mr=gl=e:gl=gl.next=e),Lr=!0,ic||(ic=!0,Ty())}function mo(e,t){if(!gu&&Lr){gu=!0;do for(var n=!1,a=Mr;a!==null;){if(!t)if(e!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var o=a.suspendedLanes,r=a.pingedLanes;i=(1<<31-_t(42|e)+1)-1,i&=l&~(o&~r),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Om(a,i))}else i=ae,i=Gr(a,a===Se?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||io(a,i)||(n=!0,Om(a,i));a=a.next}while(n);gu=!1}}function Ey(){hb()}function hb(){Lr=ic=!1;var e=0;fa!==0&&Dy()&&(e=fa);for(var t=Dt(),n=null,a=Mr;a!==null;){var l=a.next,i=xb(a,t);i===0?(a.next=null,n===null?Mr=l:n.next=l,l===null&&(gl=n)):(n=a,(e!==0||(i&3)!==0)&&(Lr=!0)),a=l}We!==0&&We!==5||mo(e,!1),fa!==0&&(fa=0)}function xb(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var o=31-_t(i),r=1<<o,s=l[o];s===-1?((r&n)===0||(r&a)!==0)&&(l[o]=$g(r,t)):s<=t&&(e.expiredLanes|=r),i&=~r}if(t=Se,n=ae,n=Gr(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(pe===2||pe===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Qs(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||io(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&Qs(a),xc(n)){case 2:case 8:n=rp;break;case 32:n=mr;break;case 268435456:n=sp;break;default:n=mr}return a=Sb.bind(null,e),n=yc(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&Qs(a),e.callbackPriority=2,e.callbackNode=null,2}function Sb(e,t){if(We!==0&&We!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Pr()&&e.callbackNode!==n)return null;var a=ae;return a=Gr(e,e===Se?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(ob(e,a,t),xb(e,Dt()),e.callbackNode!=null&&e.callbackNode===n?Sb.bind(null,e):null)}function Om(e,t){if(Pr())return null;ob(e,t,!0)}function Ty(){_y(function(){(ue&6)!==0?yc(op,Ey):hb()})}function ld(){if(fa===0){var e=Gl;e===0&&(e=zo,zo<<=1,(zo&261888)===0&&(zo=256)),fa=e}return fa}function wm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Io(""+e)}function Mm(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Ny(e,t,n,a,l){if(t==="submit"&&n&&n.stateNode===l){var i=wm((l[Nt]||null).action),o=a.submitter;o&&(t=(t=o[Nt]||null)?wm(t.formAction):o.getAttribute("formAction"),t!==null&&(i=t,o=null));var r=new Vr("action","action",null,a,l);e.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(fa!==0){var s=o?Mm(l,o):new FormData(l);Ku(n,{pending:!0,data:s,method:l.method,action:i},null,s)}}else typeof i=="function"&&(r.preventDefault(),s=o?Mm(l,o):new FormData(l),Ku(n,{pending:!0,data:s,method:l.method,action:i},i,s))},currentTarget:l}]})}}for(Fo=0;Fo<Hu.length;Fo++)Qo=Hu[Fo],Lm=Qo.toLowerCase(),zm=Qo[0].toUpperCase()+Qo.slice(1),un(Lm,"on"+zm);var Qo,Lm,zm,Fo;un(Dp,"onAnimationEnd");un(Bp,"onAnimationIteration");un(_p,"onAnimationStart");un("dblclick","onDoubleClick");un("focusin","onFocus");un("focusout","onBlur");un(Fv,"onTransitionRun");un(Qv,"onTransitionStart");un(Xv,"onTransitionCancel");un(Up,"onTransitionEnd");Hl("onMouseEnter",["mouseout","mouseover"]);Hl("onMouseLeave",["mouseout","mouseover"]);Hl("onPointerEnter",["pointerout","pointerover"]);Hl("onPointerLeave",["pointerout","pointerover"]);Ia("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ia("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ia("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ia("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ia("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ia("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ky=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wi));function Cb(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],l=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var o=a.length-1;0<=o;o--){var r=a[o],s=r.instance,d=r.currentTarget;if(r=r.listener,s!==i&&l.isPropagationStopped())break e;i=r,l.currentTarget=d;try{i(l)}catch(p){br(p)}l.currentTarget=null,i=s}else for(o=0;o<a.length;o++){if(r=a[o],s=r.instance,d=r.currentTarget,r=r.listener,s!==i&&l.isPropagationStopped())break e;i=r,l.currentTarget=d;try{i(l)}catch(p){br(p)}l.currentTarget=null,i=s}}}}function te(e,t){var n=t[wu];n===void 0&&(n=t[wu]=new Set);var a=e+"__bubble";n.has(a)||(Ab(t,e,2,!1),n.add(a))}function vu(e,t,n){var a=0;t&&(a|=4),Ab(n,e,a,t)}var Xo="_reactListening"+Math.random().toString(36).slice(2);function id(e){if(!e[Xo]){e[Xo]=!0,pp.forEach(function(n){n!=="selectionchange"&&(ky.has(n)||vu(n,!1,e),vu(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Xo]||(t[Xo]=!0,vu("selectionchange",!1,t))}}function Ab(e,t,n,a){switch(Ub(t)){case 2:var l=th;break;case 8:l=nh;break;default:l=ud}n=l.bind(null,t,n,e),l=void 0,!Bu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),a?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function yu(e,t,n,a,l){var i=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var o=a.tag;if(o===3||o===4){var r=a.stateNode.containerInfo;if(r===l)break;if(o===4)for(o=a.return;o!==null;){var s=o.tag;if((s===3||s===4)&&o.stateNode.containerInfo===l)return;o=o.return}for(;r!==null;){if(o=hl(r),o===null)return;if(s=o.tag,s===5||s===6||s===26||s===27){a=i=o;continue e}r=r.parentNode}}a=a.return}Cp(function(){var d=i,p=Ac(n),g=[];e:{var c=Hp.get(e);if(c!==void 0){var m=Vr,C=e;switch(e){case"keypress":if(Wo(n)===0)break e;case"keydown":case"keyup":m=Cv;break;case"focusin":C="focus",m=Is;break;case"focusout":C="blur",m=Is;break;case"beforeblur":case"afterblur":m=Is;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Gf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=cv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=Tv;break;case Dp:case Bp:case _p:m=mv;break;case Up:m=kv;break;case"scroll":case"scrollend":m=sv;break;case"wheel":m=wv;break;case"copy":case"cut":case"paste":m=bv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Yf;break;case"toggle":case"beforetoggle":m=Lv}var N=(t&4)!==0,B=!N&&(e==="scroll"||e==="scrollend"),f=N?c!==null?c+"Capture":null:c;N=[];for(var u=d,b;u!==null;){var v=u;if(b=v.stateNode,v=v.tag,v!==5&&v!==26&&v!==27||b===null||f===null||(v=Fi(u,f),v!=null&&N.push(Pi(u,v,b))),B)break;u=u.return}0<N.length&&(c=new m(c,C,null,n,p),g.push({event:c,listeners:N}))}}if((t&7)===0){e:{if(c=e==="mouseover"||e==="pointerover",m=e==="mouseout"||e==="pointerout",c&&n!==Du&&(C=n.relatedTarget||n.fromElement)&&(hl(C)||C[Zl]))break e;if((m||c)&&(c=p.window===p?p:(c=p.ownerDocument)?c.defaultView||c.parentWindow:window,m?(C=n.relatedTarget||n.toElement,m=d,C=C?hl(C):null,C!==null&&(B=ao(C),N=C.tag,C!==B||N!==5&&N!==27&&N!==6)&&(C=null)):(m=null,C=d),m!==C)){if(N=Gf,v="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(N=Yf,v="onPointerLeave",f="onPointerEnter",u="pointer"),B=m==null?c:ki(m),b=C==null?c:ki(C),c=new N(v,u+"leave",m,n,p),c.target=B,c.relatedTarget=b,v=null,hl(p)===d&&(N=new N(f,u+"enter",C,n,p),N.target=b,N.relatedTarget=B,v=N),B=v,m&&C)t:{for(N=Oy,f=m,u=C,b=0,v=f;v;v=N(v))b++;v=0;for(var w=u;w;w=N(w))v++;for(;0<b-v;)f=N(f),b--;for(;0<v-b;)u=N(u),v--;for(;b--;){if(f===u||u!==null&&f===u.alternate){N=f;break t}f=N(f),u=N(u)}N=null}else N=null;m!==null&&Dm(g,c,m,N,!1),C!==null&&B!==null&&Dm(g,B,C,N,!0)}}e:{if(c=d?ki(d):window,m=c.nodeName&&c.nodeName.toLowerCase(),m==="select"||m==="input"&&c.type==="file")var H=Qf;else if(Ff(c))if(Op)H=Yv;else{H=Gv;var E=Rv}else m=c.nodeName,!m||m.toLowerCase()!=="input"||c.type!=="checkbox"&&c.type!=="radio"?d&&Cc(d.elementType)&&(H=Qf):H=Vv;if(H&&(H=H(e,d))){kp(g,H,n,p);break e}E&&E(e,c,d),e==="focusout"&&d&&c.type==="number"&&d.memoizedProps.value!=null&&zu(c,"number",c.value)}switch(E=d?ki(d):window,e){case"focusin":(Ff(E)||E.contentEditable==="true")&&(Cl=E,_u=d,zi=null);break;case"focusout":zi=_u=Cl=null;break;case"mousedown":Uu=!0;break;case"contextmenu":case"mouseup":case"dragend":Uu=!1,Kf(g,n,p);break;case"selectionchange":if(qv)break;case"keydown":case"keyup":Kf(g,n,p)}var O;if(Nc)e:{switch(e){case"compositionstart":var D="onCompositionStart";break e;case"compositionend":D="onCompositionEnd";break e;case"compositionupdate":D="onCompositionUpdate";break e}D=void 0}else Sl?Tp(e,n)&&(D="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(D="onCompositionStart");D&&(Ep&&n.locale!=="ko"&&(Sl||D!=="onCompositionStart"?D==="onCompositionEnd"&&Sl&&(O=Ap()):(ua=p,Ec="value"in ua?ua.value:ua.textContent,Sl=!0)),E=zr(d,D),0<E.length&&(D=new Vf(D,e,null,n,p),g.push({event:D,listeners:E}),O?D.data=O:(O=Np(n),O!==null&&(D.data=O)))),(O=Dv?Bv(e,n):_v(e,n))&&(D=zr(d,"onBeforeInput"),0<D.length&&(E=new Vf("onBeforeInput","beforeinput",null,n,p),g.push({event:E,listeners:D}),E.data=O)),Ny(g,e,d,n,p)}Cb(g,t)})}function Pi(e,t,n){return{instance:e,listener:t,currentTarget:n}}function zr(e,t){for(var n=t+"Capture",a=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Fi(e,n),l!=null&&a.unshift(Pi(e,l,i)),l=Fi(e,t),l!=null&&a.push(Pi(e,l,i))),e.tag===3)return a;e=e.return}return[]}function Oy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dm(e,t,n,a,l){for(var i=t._reactName,o=[];n!==null&&n!==a;){var r=n,s=r.alternate,d=r.stateNode;if(r=r.tag,s!==null&&s===a)break;r!==5&&r!==26&&r!==27||d===null||(s=d,l?(d=Fi(n,i),d!=null&&o.unshift(Pi(n,d,s))):l||(d=Fi(n,i),d!=null&&o.push(Pi(n,d,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var wy=/\r\n?/g,My=/\u0000|\uFFFD/g;function Bm(e){return(typeof e=="string"?e:""+e).replace(wy,`
`).replace(My,"")}function Eb(e,t){return t=Bm(t),Bm(e)===t}function he(e,t,n,a,l,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Rl(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Rl(e,""+a);break;case"className":_o(e,"class",a);break;case"tabIndex":_o(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":_o(e,n,a);break;case"style":Sp(e,a,i);break;case"data":if(t!=="object"){_o(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Io(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&he(e,t,"name",l.name,l,null),he(e,t,"formEncType",l.formEncType,l,null),he(e,t,"formMethod",l.formMethod,l,null),he(e,t,"formTarget",l.formTarget,l,null)):(he(e,t,"encType",l.encType,l,null),he(e,t,"method",l.method,l,null),he(e,t,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Io(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=Bn);break;case"onScroll":a!=null&&te("scroll",e);break;case"onScrollEnd":a!=null&&te("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(A(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(A(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=Io(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":te("beforetoggle",e),te("toggle",e),Ko(e,"popover",a);break;case"xlinkActuate":Nn(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Nn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Nn(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Nn(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Nn(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Nn(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Nn(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Nn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Nn(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ko(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=ov.get(n)||n,Ko(e,n,a))}}function oc(e,t,n,a,l,i){switch(n){case"style":Sp(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(A(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(A(60));e.innerHTML=n}}break;case"children":typeof a=="string"?Rl(e,a):(typeof a=="number"||typeof a=="bigint")&&Rl(e,""+a);break;case"onScroll":a!=null&&te("scroll",e);break;case"onScrollEnd":a!=null&&te("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Bn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!bp.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),i=e[Nt]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,l);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):Ko(e,n,a)}}}function dt(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":te("error",e),te("load",e);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(A(137,t));default:he(e,t,i,o,n,null)}}l&&he(e,t,"srcSet",n.srcSet,n,null),a&&he(e,t,"src",n.src,n,null);return;case"input":te("invalid",e);var r=i=o=l=null,s=null,d=null;for(a in n)if(n.hasOwnProperty(a)){var p=n[a];if(p!=null)switch(a){case"name":l=p;break;case"type":o=p;break;case"checked":s=p;break;case"defaultChecked":d=p;break;case"value":i=p;break;case"defaultValue":r=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(A(137,t));break;default:he(e,t,a,p,n,null)}}yp(e,i,r,s,d,o,l,!1);return;case"select":te("invalid",e),a=o=i=null;for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case"value":i=r;break;case"defaultValue":o=r;break;case"multiple":a=r;default:he(e,t,l,r,n,null)}t=i,n=o,e.multiple=!!a,t!=null?Ml(e,!!a,t,!1):n!=null&&Ml(e,!!a,n,!0);return;case"textarea":te("invalid",e),i=l=a=null;for(o in n)if(n.hasOwnProperty(o)&&(r=n[o],r!=null))switch(o){case"value":a=r;break;case"defaultValue":l=r;break;case"children":i=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(A(91));break;default:he(e,t,o,r,n,null)}xp(e,a,l,i);return;case"option":for(s in n)n.hasOwnProperty(s)&&(a=n[s],a!=null)&&(s==="selected"?e.selected=a&&typeof a!="function"&&typeof a!="symbol":he(e,t,s,a,n,null));return;case"dialog":te("beforetoggle",e),te("toggle",e),te("cancel",e),te("close",e);break;case"iframe":case"object":te("load",e);break;case"video":case"audio":for(a=0;a<Wi.length;a++)te(Wi[a],e);break;case"image":te("error",e),te("load",e);break;case"details":te("toggle",e);break;case"embed":case"source":case"link":te("error",e),te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in n)if(n.hasOwnProperty(d)&&(a=n[d],a!=null))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(A(137,t));default:he(e,t,d,a,n,null)}return;default:if(Cc(t)){for(p in n)n.hasOwnProperty(p)&&(a=n[p],a!==void 0&&oc(e,t,p,a,n,void 0));return}}for(r in n)n.hasOwnProperty(r)&&(a=n[r],a!=null&&he(e,t,r,a,n,null))}function Ly(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,o=null,r=null,s=null,d=null,p=null;for(m in n){var g=n[m];if(n.hasOwnProperty(m)&&g!=null)switch(m){case"checked":break;case"value":break;case"defaultValue":s=g;default:a.hasOwnProperty(m)||he(e,t,m,null,a,g)}}for(var c in a){var m=a[c];if(g=n[c],a.hasOwnProperty(c)&&(m!=null||g!=null))switch(c){case"type":i=m;break;case"name":l=m;break;case"checked":d=m;break;case"defaultChecked":p=m;break;case"value":o=m;break;case"defaultValue":r=m;break;case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(A(137,t));break;default:m!==g&&he(e,t,c,m,a,g)}}Lu(e,o,r,s,d,p,i,l);return;case"select":m=o=r=c=null;for(i in n)if(s=n[i],n.hasOwnProperty(i)&&s!=null)switch(i){case"value":break;case"multiple":m=s;default:a.hasOwnProperty(i)||he(e,t,i,null,a,s)}for(l in a)if(i=a[l],s=n[l],a.hasOwnProperty(l)&&(i!=null||s!=null))switch(l){case"value":c=i;break;case"defaultValue":r=i;break;case"multiple":o=i;default:i!==s&&he(e,t,l,i,a,s)}t=r,n=o,a=m,c!=null?Ml(e,!!n,c,!1):!!a!=!!n&&(t!=null?Ml(e,!!n,t,!0):Ml(e,!!n,n?[]:"",!1));return;case"textarea":m=c=null;for(r in n)if(l=n[r],n.hasOwnProperty(r)&&l!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:he(e,t,r,null,a,l)}for(o in a)if(l=a[o],i=n[o],a.hasOwnProperty(o)&&(l!=null||i!=null))switch(o){case"value":c=l;break;case"defaultValue":m=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(A(91));break;default:l!==i&&he(e,t,o,l,a,i)}hp(e,c,m);return;case"option":for(var C in n)c=n[C],n.hasOwnProperty(C)&&c!=null&&!a.hasOwnProperty(C)&&(C==="selected"?e.selected=!1:he(e,t,C,null,a,c));for(s in a)c=a[s],m=n[s],a.hasOwnProperty(s)&&c!==m&&(c!=null||m!=null)&&(s==="selected"?e.selected=c&&typeof c!="function"&&typeof c!="symbol":he(e,t,s,c,a,m));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var N in n)c=n[N],n.hasOwnProperty(N)&&c!=null&&!a.hasOwnProperty(N)&&he(e,t,N,null,a,c);for(d in a)if(c=a[d],m=n[d],a.hasOwnProperty(d)&&c!==m&&(c!=null||m!=null))switch(d){case"children":case"dangerouslySetInnerHTML":if(c!=null)throw Error(A(137,t));break;default:he(e,t,d,c,a,m)}return;default:if(Cc(t)){for(var B in n)c=n[B],n.hasOwnProperty(B)&&c!==void 0&&!a.hasOwnProperty(B)&&oc(e,t,B,void 0,a,c);for(p in a)c=a[p],m=n[p],!a.hasOwnProperty(p)||c===m||c===void 0&&m===void 0||oc(e,t,p,c,a,m);return}}for(var f in n)c=n[f],n.hasOwnProperty(f)&&c!=null&&!a.hasOwnProperty(f)&&he(e,t,f,null,a,c);for(g in a)c=a[g],m=n[g],!a.hasOwnProperty(g)||c===m||c==null&&m==null||he(e,t,g,c,a,m)}function _m(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function zy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,o=l.initiatorType,r=l.duration;if(i&&r&&_m(o)){for(o=0,r=l.responseEnd,a+=1;a<n.length;a++){var s=n[a],d=s.startTime;if(d>r)break;var p=s.transferSize,g=s.initiatorType;p&&_m(g)&&(s=s.responseEnd,o+=p*(s<r?1:(r-d)/(s-d)))}if(--a,t+=8*(i+o)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var rc=null,sc=null;function Dr(e){return e.nodeType===9?e:e.ownerDocument}function Um(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tb(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function uc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hu=null;function Dy(){var e=window.event;return e&&e.type==="popstate"?e===hu?!1:(hu=e,!0):(hu=null,!1)}var Nb=typeof setTimeout=="function"?setTimeout:void 0,By=typeof clearTimeout=="function"?clearTimeout:void 0,Hm=typeof Promise=="function"?Promise:void 0,_y=typeof queueMicrotask=="function"?queueMicrotask:typeof Hm<"u"?function(e){return Hm.resolve(null).then(e).catch(Uy)}:Nb;function Uy(e){setTimeout(function(){throw e})}function ka(e){return e==="head"}function Rm(e,t){var n=t,a=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(l),Xl(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")ji(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,ji(n);for(var i=n.firstChild;i;){var o=i.nextSibling,r=i.nodeName;i[ro]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&ji(e.ownerDocument.body);n=l}while(n);Xl(t)}function Gm(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function cc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":cc(n),Sc(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Hy(e,t,n,a){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[ro])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Pt(e.nextSibling),e===null)break}return null}function Ry(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Pt(e.nextSibling),e===null))return null;return e}function kb(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Pt(e.nextSibling),e===null))return null;return e}function dc(e){return e.data==="$?"||e.data==="$~"}function fc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Gy(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Pt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var mc=null;function Vm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Pt(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Ym(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Ob(e,t,n){switch(t=Dr(n),e){case"html":if(e=t.documentElement,!e)throw Error(A(452));return e;case"head":if(e=t.head,!e)throw Error(A(453));return e;case"body":if(e=t.body,!e)throw Error(A(454));return e;default:throw Error(A(451))}}function ji(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Sc(e)}var en=new Map,jm=new Set;function Br(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Fn=ce.d;ce.d={f:Vy,r:Yy,D:jy,C:qy,L:Fy,m:Qy,X:Zy,S:Xy,M:Jy};function Vy(){var e=Fn.f(),t=$r();return e||t}function Yy(e){var t=Jl(e);t!==null&&t.tag===5&&t.type==="form"?S0(t):Fn.r(e)}var Wl=typeof document>"u"?null:document;function wb(e,t,n){var a=Wl;if(a&&typeof t=="string"&&t){var l=Kt(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),jm.has(l)||(jm.add(l),e={rel:e,crossOrigin:n,href:t},a.querySelector(l)===null&&(t=a.createElement("link"),dt(t,"link",e),at(t),a.head.appendChild(t)))}}function jy(e){Fn.D(e),wb("dns-prefetch",e,null)}function qy(e,t){Fn.C(e,t),wb("preconnect",e,t)}function Fy(e,t,n){Fn.L(e,t,n);var a=Wl;if(a&&e&&t){var l='link[rel="preload"][as="'+Kt(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+Kt(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+Kt(n.imageSizes)+'"]')):l+='[href="'+Kt(e)+'"]';var i=l;switch(t){case"style":i=Ql(e);break;case"script":i=Pl(e)}en.has(i)||(e=Oe({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),en.set(i,e),a.querySelector(l)!==null||t==="style"&&a.querySelector(po(i))||t==="script"&&a.querySelector(bo(i))||(t=a.createElement("link"),dt(t,"link",e),at(t),a.head.appendChild(t)))}}function Qy(e,t){Fn.m(e,t);var n=Wl;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+Kt(a)+'"][href="'+Kt(e)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Pl(e)}if(!en.has(i)&&(e=Oe({rel:"modulepreload",href:e},t),en.set(i,e),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(bo(i)))return}a=n.createElement("link"),dt(a,"link",e),at(a),n.head.appendChild(a)}}}function Xy(e,t,n){Fn.S(e,t,n);var a=Wl;if(a&&e){var l=wl(a).hoistableStyles,i=Ql(e);t=t||"default";var o=l.get(i);if(!o){var r={loading:0,preload:null};if(o=a.querySelector(po(i)))r.loading=5;else{e=Oe({rel:"stylesheet",href:e,"data-precedence":t},n),(n=en.get(i))&&od(e,n);var s=o=a.createElement("link");at(s),dt(s,"link",e),s._p=new Promise(function(d,p){s.onload=d,s.onerror=p}),s.addEventListener("load",function(){r.loading|=1}),s.addEventListener("error",function(){r.loading|=2}),r.loading|=4,or(o,t,a)}o={type:"stylesheet",instance:o,count:1,state:r},l.set(i,o)}}}function Zy(e,t){Fn.X(e,t);var n=Wl;if(n&&e){var a=wl(n).hoistableScripts,l=Pl(e),i=a.get(l);i||(i=n.querySelector(bo(l)),i||(e=Oe({src:e,async:!0},t),(t=en.get(l))&&rd(e,t),i=n.createElement("script"),at(i),dt(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Jy(e,t){Fn.M(e,t);var n=Wl;if(n&&e){var a=wl(n).hoistableScripts,l=Pl(e),i=a.get(l);i||(i=n.querySelector(bo(l)),i||(e=Oe({src:e,async:!0,type:"module"},t),(t=en.get(l))&&rd(e,t),i=n.createElement("script"),at(i),dt(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function qm(e,t,n,a){var l=(l=ma.current)?Br(l):null;if(!l)throw Error(A(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Ql(n.href),n=wl(l).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Ql(n.href);var i=wl(l).hoistableStyles,o=i.get(e);if(o||(l=l.ownerDocument||l,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,o),(i=l.querySelector(po(e)))&&!i._p&&(o.instance=i,o.state.loading=5),en.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},en.set(e,n),i||Ky(l,e,n,o.state))),t&&a===null)throw Error(A(528,""));return o}if(t&&a!==null)throw Error(A(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Pl(n),n=wl(l).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(A(444,e))}}function Ql(e){return'href="'+Kt(e)+'"'}function po(e){return'link[rel="stylesheet"]['+e+"]"}function Mb(e){return Oe({},e,{"data-precedence":e.precedence,precedence:null})}function Ky(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),dt(t,"link",n),at(t),e.head.appendChild(t))}function Pl(e){return'[src="'+Kt(e)+'"]'}function bo(e){return"script[async]"+e}function Fm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Kt(n.href)+'"]');if(a)return t.instance=a,at(a),a;var l=Oe({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),at(a),dt(a,"style",l),or(a,n.precedence,e),t.instance=a;case"stylesheet":l=Ql(n.href);var i=e.querySelector(po(l));if(i)return t.state.loading|=4,t.instance=i,at(i),i;a=Mb(n),(l=en.get(l))&&od(a,l),i=(e.ownerDocument||e).createElement("link"),at(i);var o=i;return o._p=new Promise(function(r,s){o.onload=r,o.onerror=s}),dt(i,"link",a),t.state.loading|=4,or(i,n.precedence,e),t.instance=i;case"script":return i=Pl(n.src),(l=e.querySelector(bo(i)))?(t.instance=l,at(l),l):(a=n,(l=en.get(i))&&(a=Oe({},n),rd(a,l)),e=e.ownerDocument||e,l=e.createElement("script"),at(l),dt(l,"link",a),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(A(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,or(a,n.precedence,e));return t.instance}function or(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,o=0;o<a.length;o++){var r=a[o];if(r.dataset.precedence===t)i=r;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function od(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function rd(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var rr=null;function Qm(e,t,n){if(rr===null){var a=new Map,l=rr=new Map;l.set(n,a)}else l=rr,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var i=n[l];if(!(i[ro]||i[st]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(t)||"";o=e+o;var r=a.get(o);r?r.push(i):a.set(o,[i])}}return a}function Xm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Iy(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Lb(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function $y(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Ql(a.href),i=t.querySelector(po(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=_r.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,at(i);return}i=t.ownerDocument||t,a=Mb(a),(l=en.get(l))&&od(a,l),i=i.createElement("link"),at(i);var o=i;o._p=new Promise(function(r,s){o.onload=r,o.onerror=s}),dt(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=_r.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var xu=0;function Wy(e,t){return e.stylesheets&&e.count===0&&sr(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&sr(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&xu===0&&(xu=62500*zy());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&sr(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>xu?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function _r(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)sr(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ur=null;function sr(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ur=new Map,t.forEach(Py,e),Ur=null,_r.call(e))}function Py(e,t){if(!(t.state.loading&4)){var n=Ur.get(e);if(n)var a=n.get(null);else{n=new Map,Ur.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var o=l[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),a=o)}a&&n.set(null,a)}l=t.instance,o=l.getAttribute("data-precedence"),i=n.get(o)||a,i===a&&n.set(null,l),n.set(o,l),this.count++,a=_r.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var eo={$$typeof:Dn,Provider:null,Consumer:null,_currentValue:Va,_currentValue2:Va,_threadCount:0};function eh(e,t,n,a,l,i,o,r,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Xs(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xs(0),this.hiddenUpdates=Xs(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function zb(e,t,n,a,l,i,o,r,s,d,p,g){return e=new eh(e,t,n,o,s,d,p,g,r),t=1,i===!0&&(t|=24),i=Lt(3,null,null,t),e.current=i,i.stateNode=e,t=Dc(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},Uc(i),e}function Db(e){return e?(e=Tl,e):Tl}function Bb(e,t,n,a,l,i){l=Db(l),a.context===null?a.context=l:a.pendingContext=l,a=ba(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=ga(e,a,t),n!==null&&(Tt(n,e,t),Bi(n,e,t))}function Zm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function sd(e,t){Zm(e,t),(e=e.alternate)&&Zm(e,t)}function _b(e){if(e.tag===13||e.tag===31){var t=Pa(e,67108864);t!==null&&Tt(t,e,67108864),sd(e,67108864)}}function Jm(e){if(e.tag===13||e.tag===31){var t=Ut();t=hc(t);var n=Pa(e,t);n!==null&&Tt(n,e,t),sd(e,t)}}var Hr=!0;function th(e,t,n,a){var l=J.T;J.T=null;var i=ce.p;try{ce.p=2,ud(e,t,n,a)}finally{ce.p=i,J.T=l}}function nh(e,t,n,a){var l=J.T;J.T=null;var i=ce.p;try{ce.p=8,ud(e,t,n,a)}finally{ce.p=i,J.T=l}}function ud(e,t,n,a){if(Hr){var l=pc(a);if(l===null)yu(e,t,a,Rr,n),Km(e,a);else if(lh(l,e,t,n,a))a.stopPropagation();else if(Km(e,a),t&4&&-1<ah.indexOf(e)){for(;l!==null;){var i=Jl(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=Ha(i.pendingLanes);if(o!==0){var r=i;for(r.pendingLanes|=2,r.entangledLanes|=2;o;){var s=1<<31-_t(o);r.entanglements[1]|=s,o&=~s}hn(i),(ue&6)===0&&(kr=Dt()+500,mo(0,!1))}}break;case 31:case 13:r=Pa(i,2),r!==null&&Tt(r,i,2),$r(),sd(i,2)}if(i=pc(a),i===null&&yu(e,t,a,Rr,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else yu(e,t,a,null,n)}}function pc(e){return e=Ac(e),cd(e)}var Rr=null;function cd(e){if(Rr=null,e=hl(e),e!==null){var t=ao(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=tp(t),e!==null)return e;e=null}else if(n===31){if(e=np(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Rr=e,null}function Ub(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Fg()){case op:return 2;case rp:return 8;case mr:case Qg:return 32;case sp:return 268435456;default:return 32}default:return 32}}var bc=!1,ha=null,xa=null,Sa=null,to=new Map,no=new Map,ra=[],ah="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Km(e,t){switch(e){case"focusin":case"focusout":ha=null;break;case"dragenter":case"dragleave":xa=null;break;case"mouseover":case"mouseout":Sa=null;break;case"pointerover":case"pointerout":to.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":no.delete(t.pointerId)}}function Ai(e,t,n,a,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},t!==null&&(t=Jl(t),t!==null&&_b(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function lh(e,t,n,a,l){switch(t){case"focusin":return ha=Ai(ha,e,t,n,a,l),!0;case"dragenter":return xa=Ai(xa,e,t,n,a,l),!0;case"mouseover":return Sa=Ai(Sa,e,t,n,a,l),!0;case"pointerover":var i=l.pointerId;return to.set(i,Ai(to.get(i)||null,e,t,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,no.set(i,Ai(no.get(i)||null,e,t,n,a,l)),!0}return!1}function Hb(e){var t=hl(e.target);if(t!==null){var n=ao(t);if(n!==null){if(t=n.tag,t===13){if(t=tp(n),t!==null){e.blockedOn=t,zf(e.priority,function(){Jm(n)});return}}else if(t===31){if(t=np(n),t!==null){e.blockedOn=t,zf(e.priority,function(){Jm(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ur(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=pc(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Du=a,n.target.dispatchEvent(a),Du=null}else return t=Jl(n),t!==null&&_b(t),e.blockedOn=n,!1;t.shift()}return!0}function Im(e,t,n){ur(e)&&n.delete(t)}function ih(){bc=!1,ha!==null&&ur(ha)&&(ha=null),xa!==null&&ur(xa)&&(xa=null),Sa!==null&&ur(Sa)&&(Sa=null),to.forEach(Im),no.forEach(Im)}function Zo(e,t){e.blockedOn===t&&(e.blockedOn=null,bc||(bc=!0,Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority,ih)))}var Jo=null;function $m(e){Jo!==e&&(Jo=e,Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority,function(){Jo===e&&(Jo=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],l=e[t+2];if(typeof a!="function"){if(cd(a||n)===null)continue;break}var i=Jl(n);i!==null&&(e.splice(t,3),t-=3,Ku(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Xl(e){function t(s){return Zo(s,e)}ha!==null&&Zo(ha,e),xa!==null&&Zo(xa,e),Sa!==null&&Zo(Sa,e),to.forEach(t),no.forEach(t);for(var n=0;n<ra.length;n++){var a=ra[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<ra.length&&(n=ra[0],n.blockedOn===null);)Hb(n),n.blockedOn===null&&ra.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],o=l[Nt]||null;if(typeof i=="function")o||$m(n);else if(o){var r=null;if(i&&i.hasAttribute("formAction")){if(l=i,o=i[Nt]||null)r=o.formAction;else if(cd(l)!==null)continue}else r=o.action;typeof r=="function"?n[a+1]=r:(n.splice(a,3),a-=3),$m(n)}}}function Rb(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return l=o})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function dd(e){this._internalRoot=e}es.prototype.render=dd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(A(409));var n=t.current,a=Ut();Bb(n,a,e,t,null,null)};es.prototype.unmount=dd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Bb(e.current,2,null,e,null,null),$r(),t[Zl]=null}};function es(e){this._internalRoot=e}es.prototype.unstable_scheduleHydration=function(e){if(e){var t=mp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ra.length&&t!==0&&t<ra[n].priority;n++);ra.splice(n,0,e),n===0&&Hb(e)}};var Wm=Pm.version;if(Wm!=="19.2.5")throw Error(A(527,Wm,"19.2.5"));ce.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(A(188)):(e=Object.keys(e).join(","),Error(A(268,e)));return e=Hg(t),e=e!==null?ap(e):null,e=e===null?null:e.stateNode,e};var oh={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:J,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Ei=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Ei.isDisabled&&Ei.supportsFiber))try{lo=Ei.inject(oh),Bt=Ei}catch{}var Ei;ts.createRoot=function(e,t){if(!ep(e))throw Error(A(299));var n=!1,a="",l=w0,i=M0,o=L0;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=zb(e,1,!1,null,null,n,a,null,l,i,o,Rb),e[Zl]=t.current,id(e),new dd(t)};ts.hydrateRoot=function(e,t,n){if(!ep(e))throw Error(A(299));var a=!1,l="",i=w0,o=M0,r=L0,s=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(r=n.onRecoverableError),n.formState!==void 0&&(s=n.formState)),t=zb(e,1,!0,t,n??null,a,l,s,i,o,r,Rb),t.context=Db(null),n=t.current,a=Ut(),a=hc(a),l=ba(a),l.callback=null,ga(n,l,a),n=a,t.current.lanes=n,oo(t,n),hn(t),e[Zl]=t.current,id(e),new es(t)};ts.version="19.2.5"});var jb=fn((Ph,Yb)=>{"use strict";function Vb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vb)}catch(e){console.error(e)}}Vb(),Yb.exports=Gb()});var $b=fn(as=>{"use strict";var uh=Symbol.for("react.transitional.element"),ch=Symbol.for("react.fragment");function Ib(e,t,n){var a=null;if(n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),"key"in t){n={};for(var l in t)l!=="key"&&(n[l]=t[l])}else n=t;return t=n.ref,{$$typeof:uh,type:e,key:a,ref:t!==void 0?t:null,props:n}}as.Fragment=ch;as.jsx=Ib;as.jsxs=Ib});var K=fn((n2,Wb)=>{"use strict";Wb.exports=$b()});var lg=V(jb(),1);var ag=V(Xe(),1);var md="authToken",qb="authUser",pd="authEncKey";function Fb(){return sessionStorage.getItem(md)}function Qb(e,t,n){sessionStorage.setItem(md,e),t&&sessionStorage.setItem(qb,JSON.stringify(t)),n&&sessionStorage.setItem(pd,n),sessionStorage.setItem("loggedIn","true")}var ns=null;function Xb(){sessionStorage.removeItem(md),sessionStorage.removeItem(qb),sessionStorage.removeItem(pd),sessionStorage.removeItem("loggedIn"),ns=null}function Zb(){return!!Fb()}function fd(e){return Uint8Array.from(atob(e),t=>t.charCodeAt(0))}function rh(){let e=sessionStorage.getItem(pd);return e?(ns||(ns=crypto.subtle.importKey("raw",fd(e),"AES-GCM",!1,["decrypt"])),ns):null}async function sh(e){let t=rh();if(!t)throw new Error("No decryption key in this session \u2014 please log in again.");let n=await t,a=await crypto.subtle.decrypt({name:"AES-GCM",iv:fd(e.n)},n,fd(e.c));return JSON.parse(new TextDecoder().decode(a))}function Jb(){window.location.hash="#/"}function Kb(){Xb(),sessionStorage.removeItem("boilerType"),Jb()}async function it(e,t={}){let n=Fb(),a=new Headers(t.headers||{});n&&a.set("Authorization",`Bearer ${n}`);let l=await fetch(e,{...t,headers:a});if(l.status===401)throw Xb(),Jb(),new Error("Session expired \u2014 redirecting to login.");let i=l.json.bind(l);return l.json=async function(){let o=await i();return o&&o.enc===!0&&typeof o.n=="string"&&typeof o.c=="string"?sh(o):o},l}var ls=V(Xe(),1),n1=V(K(),1);function Pb(){let t=(window.location.hash||"#/").replace(/^#/,"")||"/";return t.startsWith("/")?t:"/"+t}function is(e){window.location.hash="#"+e}function e1(){let[e,t]=(0,ls.useState)(Pb());return(0,ls.useEffect)(()=>{let n=()=>t(Pb());return window.addEventListener("hashchange",n),()=>window.removeEventListener("hashchange",n)},[]),e}function t1({to:e,className:t,children:n,...a}){return(0,n1.jsx)("a",{href:"#"+e,className:t,...a,children:n})}var Ma=V(Xe(),1);var a1=`/* Copied verbatim from the <style> block of public/index.html (login page). */
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

/* \u2500\u2500 Left brand panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Right login panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Boiler-type selection (shown right after login) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
`;var l1=V(Xe(),1);function os(e,t){(0,l1.useLayoutEffect)(()=>{let n=e.map((a,l)=>{let i=document.createElement("style");return i.setAttribute("data-app-style",t+"-"+l),i.textContent=a,document.head.appendChild(i),i});return()=>n.forEach(a=>a.remove())},[t])}var rs=V(Xe(),1),i1=V(K(),1);function go(){let e=(0,rs.useRef)(null);return(0,rs.useEffect)(()=>{let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=e.current,a=n.getContext("2d"),l,i,o,r,s;function d(){r=Math.min(window.devicePixelRatio||1,2),l=window.innerWidth,i=window.innerHeight,n.width=l*r,n.height=i*r,n.style.width=l+"px",n.style.height=i+"px",a.setTransform(r,0,0,r,0,0);let g=Math.max(28,Math.min(70,Math.round(l*i/26e3)));o=Array.from({length:g},()=>({x:Math.random()*l,y:Math.random()*i,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.4+.6}))}function p(){a.clearRect(0,0,l,i);let g=Math.min(150,l/6);for(let c of o)c.x+=c.vx,c.y+=c.vy,(c.x<0||c.x>l)&&(c.vx*=-1),(c.y<0||c.y>i)&&(c.vy*=-1);for(let c=0;c<o.length;c++)for(let m=c+1;m<o.length;m++){let C=o[c],N=o[m],B=C.x-N.x,f=C.y-N.y,u=Math.sqrt(B*B+f*f);u<g&&(a.strokeStyle=`rgba(96,165,250,${.16*(1-u/g)})`,a.lineWidth=1,a.beginPath(),a.moveTo(C.x,C.y),a.lineTo(N.x,N.y),a.stroke())}for(let c of o)a.beginPath(),a.arc(c.x,c.y,c.r,0,Math.PI*2),a.fillStyle="rgba(147,197,253,0.55)",a.fill();t||(s=requestAnimationFrame(p))}return window.addEventListener("resize",d),d(),p(),()=>{window.removeEventListener("resize",d),cancelAnimationFrame(s)}},[]),(0,i1.jsx)("canvas",{id:"bg-particles",ref:e,style:{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}})}var X=V(K(),1),o1=e=>(0,X.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M3 3v18h18"}),(0,X.jsx)("path",{d:"M18 17V9"}),(0,X.jsx)("path",{d:"M13 17V5"}),(0,X.jsx)("path",{d:"M8 17v-3"})]}),r1=e=>(0,X.jsxs)("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,X.jsx)("polyline",{points:"17 8 12 3 7 8"}),(0,X.jsx)("line",{x1:"12",x2:"12",y1:"3",y2:"15"})]}),s1=e=>(0,X.jsxs)("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),(0,X.jsx)("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),(0,X.jsx)("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),(0,X.jsx)("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]}),Oa=e=>(0,X.jsx)("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",...e,children:(0,X.jsx)("polygon",{points:"5 3 19 12 5 21 5 3"})}),wa=e=>(0,X.jsxs)("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M3 12a9 9 0 1 0 2.64-6.36"}),(0,X.jsx)("path",{d:"M3 4v5h5"})]}),ss=e=>(0,X.jsxs)("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"}),(0,X.jsx)("path",{d:"M17 21v-8H7v8"}),(0,X.jsx)("path",{d:"M7 3v5h8"})]}),ei=e=>(0,X.jsxs)("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,X.jsx)("polyline",{points:"7 10 12 15 17 10"}),(0,X.jsx)("line",{x1:"12",x2:"12",y1:"15",y2:"3"})]}),ti=e=>(0,X.jsxs)("svg",{className:"icon-svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}),(0,X.jsx)("path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}),(0,X.jsx)("line",{x1:"16",x2:"8",y1:"13",y2:"13"}),(0,X.jsx)("line",{x1:"16",x2:"8",y1:"17",y2:"17"}),(0,X.jsx)("line",{x1:"10",x2:"8",y1:"9",y2:"9"})]}),u1=e=>(0,X.jsxs)("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),(0,X.jsx)("path",{d:"m2 7 10 6 10-6"})]}),c1=e=>(0,X.jsxs)("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,X.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),bd=e=>(0,X.jsxs)("svg",{width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M3 15h18"}),(0,X.jsx)("path",{d:"M5 15V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9"}),(0,X.jsx)("path",{d:"M8 15v4"}),(0,X.jsx)("path",{d:"M16 15v4"}),(0,X.jsx)("path",{d:"M9 8h.01"}),(0,X.jsx)("path",{d:"M13 8h.01"})]}),d1=e=>(0,X.jsxs)("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.6 20.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a20.6 20.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,X.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}),f1=e=>(0,X.jsxs)("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,X.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"}),(0,X.jsx)("circle",{cx:"12",cy:"12",r:"3"})]});var I=V(K(),1);function gd(){(0,Ma.useEffect)(()=>{document.title="Boiler Efficiency Calculator"},[]),os([a1],"login");let[e,t]=(0,Ma.useState)(""),[n,a]=(0,Ma.useState)(""),[l,i]=(0,Ma.useState)(!1),[o,r]=(0,Ma.useState)(!1),[s,d]=(0,Ma.useState)({text:"Incorrect username or password!",show:!1,n:0}),p=c=>d(m=>({text:c||m.text,show:!0,n:m.n+1})),g=async()=>{if(!e||!n){p("Enter your username and password.");return}r(!0);try{let c=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:n})}),m=await c.json();if(!c.ok||!m.ok){p(m.error||"Incorrect username or password!");return}Qb(m.token,m.user,m.encKey),is("/calculator")}catch{p("Could not reach the server. Please try again.")}finally{r(!1)}};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(go,{}),(0,I.jsxs)("div",{className:"screen",onKeyDown:c=>{c.key==="Enter"&&g()},children:[(0,I.jsxs)("div",{className:"brand-panel",children:[(0,I.jsx)("div",{className:"brand-logo-ring",children:(0,I.jsx)("div",{className:"inner",children:(0,I.jsx)("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})})}),(0,I.jsxs)("div",{className:"brand-title",children:["Boiler ",(0,I.jsx)("span",{className:"accent",children:"Efficiency"})," Calculator"]}),(0,I.jsx)("div",{className:"brand-rule"}),(0,I.jsxs)("div",{className:"stat-row",children:[(0,I.jsxs)("div",{className:"stat-chip",children:[(0,I.jsx)("div",{className:"n",children:"87%"}),(0,I.jsx)("div",{className:"l",children:"Boiler Eff."})]}),(0,I.jsxs)("div",{className:"stat-chip",children:[(0,I.jsx)("div",{className:"n",children:"5.8%"}),(0,I.jsx)("div",{className:"l",children:"Dry Gas Loss"})]}),(0,I.jsxs)("div",{className:"stat-chip",children:[(0,I.jsx)("div",{className:"n",children:"1.2%"}),(0,I.jsx)("div",{className:"l",children:"Unburnt C"})]})]})]}),(0,I.jsx)("div",{className:"form-panel",children:(0,I.jsxs)("div",{className:"login-box",id:"loginBox",children:[(0,I.jsx)("div",{className:"login-logo-icon",children:(0,I.jsx)("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),(0,I.jsx)("div",{className:"login-title",children:"Welcome"}),(0,I.jsx)("div",{className:"login-sub",children:"Sign in to access the Efficiency Calculator"}),(0,I.jsx)("div",{className:"login-divider"}),(0,I.jsx)("div",{className:"error-msg"+(s.show?" show":""),id:"errorMsg",children:s.text},s.n),(0,I.jsxs)("div",{className:"form-group",children:[(0,I.jsx)("span",{className:"icon",children:(0,I.jsx)(u1,{})}),(0,I.jsx)("input",{type:"text",id:"username",placeholder:"Username",autoComplete:"username",value:e,onChange:c=>t(c.target.value)})]}),(0,I.jsxs)("div",{className:"form-group",children:[(0,I.jsx)("span",{className:"icon",children:(0,I.jsx)(c1,{})}),(0,I.jsx)("input",{type:l?"text":"password",id:"password",placeholder:"Password",autoComplete:"current-password",value:n,onChange:c=>a(c.target.value)}),(0,I.jsx)("button",{type:"button",className:"toggle-eye",id:"toggleEye","aria-label":"Show password",onClick:()=>i(c=>!c),children:l?(0,I.jsx)(d1,{}):(0,I.jsx)(f1,{})})]}),(0,I.jsx)("button",{className:"btn-login",disabled:o,onClick:g,children:"Login"}),(0,I.jsxs)("div",{className:"login-footer",children:["Powered by ",(0,I.jsx)("b",{children:"ABHITECH EnergyCon Ltd."})]})]})})]})]})}var qe=V(Xe(),1);var m1=`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');\r
\r
.navbar {\r
  background: rgba(10,19,43,0.72);\r
  backdrop-filter: blur(20px) saturate(140%);\r
  -webkit-backdrop-filter: blur(20px) saturate(140%);\r
  border-bottom: 1px solid rgba(255,255,255,0.08);\r
  padding: 0 28px;\r
  position: sticky;\r
  top: 0;\r
  z-index: 100;\r
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);\r
}\r
.nav-inner {\r
  max-width: 1180px;\r
  margin: 0 auto;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  height: 64px;\r
}\r
.nav-logo {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
}\r
.nav-logo-icon {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 10px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: transparent;\r
  animation: navLogoFloat 3.5s ease-in-out infinite;\r
}\r
.nav-logo-icon img { width: 100%; height: 100%; object-fit: contain; display: block; }\r
@keyframes navLogoFloat {\r
  0%, 100% { transform: translateY(0); }\r
  50%      { transform: translateY(-3px); }\r
}\r
.nav-logo-text {\r
  font-family: 'Space Grotesk', sans-serif;\r
  font-size: 17px;\r
  font-weight: 700;\r
  color: var(--text);\r
  letter-spacing: -0.2px;\r
  line-height: 1.15;\r
}\r
.nav-logo-text small {\r
  display: block;\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 9.5px;\r
  font-weight: 500;\r
  color: var(--muted);\r
  letter-spacing: 1px;\r
  text-transform: uppercase;\r
}\r
.boiler-type-badge {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 10.5px;\r
  font-weight: 600;\r
  letter-spacing: 0.4px;\r
  text-transform: uppercase;\r
  color: #93c5fd;\r
  background: rgba(59,130,246,0.12);\r
  border: 1px solid rgba(96,165,250,0.3);\r
  padding: 4px 10px;\r
  border-radius: 999px;\r
  margin-left: 6px;\r
}\r
.nav-links {\r
  display: flex;\r
  align-items: center;\r
  gap: 4px;\r
  background: rgba(255,255,255,0.04);\r
  border: 1px solid rgba(255,255,255,0.08);\r
  padding: 4px;\r
  border-radius: 12px;\r
}\r
.nav-link {\r
  padding: 7px 18px;\r
  border-radius: 9px;\r
  font-size: 13.5px;\r
  font-weight: 600;\r
  color: var(--muted);\r
  text-decoration: none;\r
  transition: all 0.25s;\r
  position: relative;\r
}\r
.nav-link:hover { background: rgba(148,163,184,0.08); color: var(--text2); }\r
.nav-link.active {\r
  background: linear-gradient(135deg, rgba(59,130,246,0.9), rgba(96,165,250,0.85));\r
  color: #fff;\r
  box-shadow: 0 2px 12px rgba(59,130,246,0.4);\r
}\r
.nav-logout {\r
  padding: 8px 18px;\r
  background: transparent;\r
  border: 1.5px solid rgba(148,163,184,0.18);\r
  border-radius: 9px;\r
  font-family: 'Outfit', sans-serif;\r
  font-size: 13.5px;\r
  font-weight: 600;\r
  color: var(--muted);\r
  cursor: pointer;\r
  transition: all 0.2s;\r
}\r
.nav-logout:hover {\r
  background: rgba(220,38,38,0.08);\r
  border-color: rgba(220,38,38,0.35);\r
  color: var(--red);\r
}\r
\r
:root {\r
  --bg: #0A132B;\r
  --bg2: #101d42;\r
  --surface: rgba(255,255,255,0.05);\r
  --surface2: rgba(255,255,255,0.04);\r
  --border: rgba(255,255,255,0.12);\r
  --border2: rgba(255,255,255,0.22);\r
  --accent: #60a5fa;\r
  --accent-light: rgba(96,165,250,0.14);\r
  --accent2: #7dd3fc;\r
  --green: #4ade80;\r
  --green-light: rgba(74,222,128,0.12);\r
  --amber: #fbbf24;\r
  --amber-light: rgba(251,191,36,0.12);\r
  --red: #f87171;\r
  --red-light: rgba(248,113,113,0.12);\r
  --blue: #60a5fa;\r
  --blue-light: rgba(96,165,250,0.14);\r
  --text: #f1f5f9;\r
  --text-bright: #ffffff;\r
  --text2: #cbd5e1;\r
  --muted: #94a3b8;\r
  --muted2: #64748b;\r
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.18);\r
  --shadow: 0 8px 20px -4px rgba(0,0,0,0.35), 0 2px 8px -2px rgba(0,0,0,0.22);\r
  --shadow-lg: 0 20px 40px -8px rgba(0,0,0,0.45), 0 8px 16px -4px rgba(0,0,0,0.28);\r
  --radius: 16px;\r
  --radius-sm: 10px;\r
}\r
\r
* { margin: 0; padding: 0; box-sizing: border-box; }\r
\r
body {\r
  font-family: 'Outfit', sans-serif;\r
  background: var(--bg);\r
  color: var(--text);\r
  min-height: 100vh;\r
  overflow-x: hidden;\r
  font-size: 15px;\r
  line-height: 1.6;\r
}\r
\r
body::before {\r
  content: '';\r
  position: fixed;\r
  inset: 0;\r
  background:\r
    radial-gradient(ellipse 70% 45% at 15% -8%, rgba(255,255,255,0.06) 0%, transparent 60%),\r
    radial-gradient(ellipse 55% 40% at 88% 12%, rgba(96,165,250,0.14) 0%, transparent 60%),\r
    radial-gradient(ellipse 60% 45% at 80% 105%, rgba(37,99,235,0.16) 0%, transparent 60%),\r
    linear-gradient(180deg, #0A132B 0%, #101d42 55%, #0A132B 100%);\r
  pointer-events: none;\r
  z-index: 0;\r
}\r
\r
body::after {\r
  content: '';\r
  position: fixed;\r
  inset: 0;\r
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 48%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 52%, transparent 70%);\r
  background-size: 220% 220%;\r
  pointer-events: none;\r
  z-index: 0;\r
  mix-blend-mode: screen;\r
}\r
\r
#bg-particles { opacity: 0.7; }\r
\r
.container {\r
  max-width: 1180px;\r
  margin: 0 auto;\r
  padding: 0 28px;\r
  position: relative;\r
  z-index: 1;\r
}\r
\r
header {\r
  background: rgba(10,19,43,0.8);\r
  backdrop-filter: blur(20px);\r
  -webkit-backdrop-filter: blur(20px);\r
  border-bottom: 1px solid var(--border);\r
  padding: 18px 0;\r
  position: sticky;\r
  top: 0;\r
  z-index: 100;\r
  box-shadow: var(--shadow-sm);\r
}\r
\r
.header-inner {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
}\r
\r
.logo { display: flex; align-items: center; gap: 14px; }\r
\r
.logo-icon {\r
  width: 42px;\r
  height: 42px;\r
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);\r
  border-radius: 10px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 12px;\r
  font-weight: 600;\r
  color: #fff;\r
  letter-spacing: 0.5px;\r
  box-shadow: 0 4px 12px rgba(37,99,235,0.3);\r
}\r
\r
.logo-text h1 {\r
  font-size: 19px;\r
  font-weight: 800;\r
  color: var(--text);\r
  letter-spacing: -0.5px;\r
}\r
\r
.logo-text p {\r
  font-size: 11px;\r
  color: var(--muted);\r
  font-family: 'JetBrains Mono', monospace;\r
  letter-spacing: 0.5px;\r
  text-transform: uppercase;\r
}\r
\r
.header-badge {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 10px;\r
  color: var(--accent);\r
  border: 1.5px solid var(--accent-light);\r
  background: var(--accent-light);\r
  padding: 5px 12px;\r
  border-radius: 20px;\r
  letter-spacing: 1px;\r
  font-weight: 600;\r
}\r
\r
.tab-nav {\r
  display: flex;\r
  gap: 4px;\r
  border-bottom: 1px solid var(--border);\r
  background: var(--surface);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  padding: 0 4px;\r
  border-radius: var(--radius) var(--radius) 0 0;\r
  margin-top: 28px;\r
}\r
\r
.tab-btn {\r
  padding: 16px 28px;\r
  background: none;\r
  border: none;\r
  cursor: pointer;\r
  font-family: 'Outfit', sans-serif;\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: var(--muted);\r
  letter-spacing: 0.3px;\r
  text-transform: uppercase;\r
  transition: all 0.2s;\r
  border-bottom: 2.5px solid transparent;\r
  margin-bottom: -1px;\r
  border-radius: 8px 8px 0 0;\r
}\r
\r
.tab-btn.active {\r
  color: var(--accent);\r
  border-bottom-color: var(--accent);\r
  background: var(--accent-light);\r
}\r
\r
.tab-btn:hover:not(.active) {\r
  color: var(--text2);\r
  background: var(--surface2);\r
}\r
\r
.tab-btn .tab-num {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 10px;\r
  color: var(--muted2);\r
  margin-right: 8px;\r
  font-weight: 500;\r
}\r
\r
.tab-btn.active .tab-num { color: var(--accent); opacity: 0.7; }\r
\r
.page { display: none; padding: 24px 0 48px; }\r
.page.active { display: block; }\r
\r
.section-header {\r
  display: flex;\r
  align-items: center;\r
  gap: 14px;\r
  margin-bottom: 18px;\r
  margin-top: 36px;\r
}\r
\r
.section-header:first-child { margin-top: 0; }\r
\r
/* \u2500\u2500 Premium collapsible section cards \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   All .section-card tiles sit in a responsive grid (.section-cards-grid)\r
   so the whole set reads compactly \u2014 one or two rows instead of a long\r
   vertical stack. Each card's onclick uses its data-target to reveal the\r
   matching .input-grid, which lives below the grid (not inside a single\r
   card), so opening one section doesn't reflow the others. Everything is\r
   collapsed on load to keep the page short until the user interacts. */\r
.section-cards-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\r
  gap: 10px;\r
}\r
\r
/* \u2500\u2500 "Design Conditions \u2014 for APH Correction" block on the Results tab \u2014\r
   its own bordered panel so it reads as a distinct section instead of\r
   butting straight up against the Process Inputs/Comparison boxes below\r
   it when its two grids are collapsed (their default state). \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.design-conditions-block {\r
  background: rgba(96,165,250,0.03);\r
  border: 1.5px dashed rgba(96,165,250,0.25);\r
  border-radius: var(--radius);\r
  padding: 20px 20px 22px;\r
  margin-top: 4px;\r
  margin-bottom: 28px;\r
}\r
.design-conditions-block .section-header { margin-top: 0; margin-bottom: 14px; }\r
.design-conditions-block .input-grid:last-child { margin-bottom: 0; }\r
\r
.section-card {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  background: var(--surface);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius-sm);\r
  padding: 12px 14px;\r
  cursor: pointer;\r
  user-select: none;\r
  position: relative;\r
  overflow: hidden;\r
  box-shadow: var(--shadow-sm);\r
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;\r
}\r
\r
.section-card::before {\r
  content: '';\r
  position: absolute;\r
  left: 0; top: 0; bottom: 0;\r
  width: 3px;\r
  background: linear-gradient(180deg, var(--accent), var(--accent2));\r
  opacity: 0;\r
  transition: opacity 0.2s;\r
}\r
\r
.section-card:hover {\r
  transform: translateY(-2px);\r
  border-color: rgba(96,165,250,0.35);\r
  box-shadow: var(--shadow), 0 0 0 1px rgba(96,165,250,0.12);\r
}\r
\r
.section-card:hover::before { opacity: 1; }\r
\r
.section-card.open {\r
  border-color: rgba(96,165,250,0.45);\r
  background: rgba(96,165,250,0.06);\r
  box-shadow: var(--shadow), 0 0 0 1px rgba(96,165,250,0.18);\r
}\r
\r
.section-card.open::before { opacity: 1; }\r
\r
.section-card-icon {\r
  width: 34px;\r
  height: 34px;\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 11px;\r
  font-weight: 700;\r
  letter-spacing: 0.3px;\r
  color: var(--accent2);\r
  border-radius: 9px;\r
  background: var(--accent-light);\r
  border: 1.5px solid rgba(96,165,250,0.25);\r
  transition: background 0.2s, border-color 0.2s, transform 0.2s;\r
}\r
\r
.section-card.open .section-card-icon,\r
.section-card:hover .section-card-icon {\r
  border-color: rgba(96,165,250,0.4);\r
  transform: scale(1.04);\r
}\r
\r
.section-card-body { flex: 1; min-width: 0; }\r
\r
.section-card-title {\r
  font-size: 12.5px;\r
  font-weight: 700;\r
  color: var(--text);\r
  line-height: 1.3;\r
  margin-bottom: 2px;\r
}\r
\r
.section-card-sub {\r
  font-size: 10px;\r
  color: var(--muted);\r
  font-family: 'JetBrains Mono', monospace;\r
  letter-spacing: 0.3px;\r
  text-transform: uppercase;\r
  font-weight: 500;\r
}\r
\r
.section-toggle {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 24px;\r
  height: 24px;\r
  flex-shrink: 0;\r
  margin-left: auto;\r
  border-radius: 50%;\r
  border: 1.5px solid var(--border2);\r
  color: var(--muted);\r
  font-size: 11px;\r
  transition: transform 0.25s ease, background 0.2s, color 0.2s, border-color 0.2s;\r
}\r
\r
.section-card.open .section-toggle {\r
  transform: rotate(90deg);\r
  color: var(--accent2);\r
  border-color: rgba(96,165,250,0.4);\r
  background: rgba(96,165,250,0.1);\r
}\r
\r
.input-grid.is-collapsed {\r
  display: none;\r
}\r
\r
.input-grid:not(.is-collapsed) {\r
  margin-top: 14px;\r
  margin-bottom: 4px;\r
  animation: fadeUp 0.35s cubic-bezier(0.16,1,0.3,1);\r
}\r
\r
@media (max-width: 640px) {\r
  .section-cards-grid { grid-template-columns: 1fr 1fr; }\r
}\r
@media (max-width: 420px) {\r
  .section-cards-grid { grid-template-columns: 1fr; }\r
}\r
\r
.section-line {\r
  flex: 1;\r
  height: 1px;\r
  background: linear-gradient(90deg, var(--border2), transparent);\r
}\r
\r
.section-label {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 10px;\r
  color: var(--accent2);\r
  letter-spacing: 2px;\r
  text-transform: uppercase;\r
  padding: 5px 12px;\r
  border: 1.5px solid rgba(8,145,178,0.2);\r
  background: rgba(8,145,178,0.06);\r
  border-radius: 20px;\r
  font-weight: 600;\r
}\r
\r
.input-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\r
  gap: 12px;\r
  margin-bottom: 8px;\r
}\r
\r
.field {\r
  background: var(--surface);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius-sm);\r
  padding: 14px 16px;\r
  transition: all 0.2s;\r
  box-shadow: var(--shadow-sm);\r
}\r
\r
.field:hover { border-color: var(--border2); box-shadow: var(--shadow); transform: translateY(-1px); }\r
.field:focus-within {\r
  border-color: var(--accent);\r
  box-shadow: 0 0 0 3px rgba(59,130,246,0.14), var(--shadow);\r
}\r
\r
.field-formula {\r
  border-color: rgba(8,145,178,0.35) !important;\r
  background: rgba(8,145,178,0.03) !important;\r
}\r
\r
.field-top {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: flex-start;\r
  margin-bottom: 10px;\r
}\r
\r
.field-name {\r
  font-size: 12px;\r
  color: var(--muted);\r
  line-height: 1.4;\r
  flex: 1;\r
  padding-right: 8px;\r
  font-weight: 500;\r
}\r
\r
.field-sym {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 11px;\r
  color: var(--accent);\r
  background: var(--accent-light);\r
  padding: 2px 8px;\r
  border-radius: 4px;\r
  font-weight: 600;\r
  white-space: nowrap;\r
}\r
\r
.field-bottom {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
\r
.field-input {\r
  flex: 1;\r
  background: var(--surface2);\r
  border: 1.5px solid var(--border);\r
  color: var(--text);\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 16px;\r
  font-weight: 500;\r
  padding: 7px 11px;\r
  border-radius: var(--radius-sm);\r
  outline: none;\r
  transition: all 0.2s;\r
  width: 100%;\r
}\r
\r
.field-input:focus {\r
  border-color: var(--accent);\r
  background: rgba(59,130,246,0.06);\r
  box-shadow: 0 0 0 3px rgba(59,130,246,0.12);\r
}\r
\r
.formula-input {\r
  background: rgba(8,145,178,0.06) !important;\r
  color: var(--accent2) !important;\r
  cursor: not-allowed;\r
  font-weight: 600 !important;\r
}\r
\r
/* \u2500\u2500 Upload detection state (set by initUpload() in script.js) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   .field-detected \u2014 value was found on the selected sheet and applied.\r
   .field-missing  \u2014 required field was NOT found anywhere in the workbook,\r
                      so it still needs to be entered by hand.\r
   Cleared and re-applied on every new upload; not applied at all until a\r
   file has been uploaded at least once. */\r
.field-input.field-detected {\r
  border-color: #4ade80;\r
  background: rgba(74,222,128,0.10);\r
}\r
\r
.field-input.field-missing {\r
  border-color: #f87171;\r
  background: rgba(248,113,113,0.08);\r
}\r
\r
.formula-tag {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 9px;\r
  background: var(--accent2);\r
  color: #0A132B;\r
  padding: 2px 6px;\r
  border-radius: 3px;\r
  margin-left: 5px;\r
  vertical-align: middle;\r
  font-weight: 600;\r
  letter-spacing: 0.5px;\r
}\r
\r
/* \u2500\u2500 Manual-entry fields (Design \u2014 Proximate) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   Same card/theme as every other field, but with the amber accent instead\r
   of the default border, and a dashed border to read as "you type this,\r
   nothing will ever auto-fill it" \u2014 as opposed to the solid cyan\r
   .field-formula treatment used for AUTO/computed fields. */\r
.field-manual {\r
  border-style: dashed !important;\r
  border-color: rgba(217,119,6,0.4) !important;\r
  background: rgba(217,119,6,0.04) !important;\r
}\r
\r
.manual-tag {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 9px;\r
  background: var(--amber);\r
  color: #1a1300;\r
  padding: 2px 6px;\r
  border-radius: 3px;\r
  margin-left: 5px;\r
  vertical-align: middle;\r
  font-weight: 600;\r
  letter-spacing: 0.5px;\r
}\r
\r
.field-uom {\r
  font-size: 11px;\r
  color: var(--muted2);\r
  white-space: nowrap;\r
  font-family: 'JetBrains Mono', monospace;\r
  min-width: 46px;\r
  text-align: right;\r
  font-weight: 500;\r
}\r
\r
/* \u2500\u2500 Enthalpy auto-calc (T & P \u2192 enthalpy), BS-2885 only \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   Small sub-row under Feedwater/Drum/Steam enthalpy fields. Leave both\r
   boxes empty to type the enthalpy by hand as before; fill both and the\r
   enthalpy field above fills itself in (see initEnthalpyAutoCalc() in\r
   script1.js) and picks up .field-computed until either box is cleared. */\r
.field-calc {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
  margin-top: 8px;\r
  padding-top: 8px;\r
  border-top: 1px dashed var(--border);\r
}\r
\r
.field-calc-label {\r
  font-size: 10px;\r
  color: var(--muted2);\r
  white-space: nowrap;\r
  font-weight: 500;\r
}\r
\r
.field-calc-input {\r
  flex: 1;\r
  min-width: 0;\r
  background: var(--surface2);\r
  border: 1.5px solid var(--border);\r
  color: var(--text);\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 12px;\r
  padding: 5px 8px;\r
  border-radius: 6px;\r
  outline: none;\r
  transition: all 0.2s;\r
}\r
\r
.field-calc-input::placeholder { color: var(--muted2); opacity: 0.8; }\r
\r
.field-calc-input:focus {\r
  border-color: var(--accent2);\r
  box-shadow: 0 0 0 3px rgba(8,145,178,0.12);\r
}\r
\r
/* .field-computed \u2014 enthalpy value was filled in from Temperature &\r
   Pressure rather than typed or detected from an upload. Cleared the\r
   moment either T or P box is emptied out. */\r
.field-input.field-computed {\r
  border-color: var(--accent2);\r
  background: rgba(8,145,178,0.08);\r
}\r
\r
.action-bar {\r
  display: flex;\r
  gap: 12px;\r
  align-items: center;\r
  flex-wrap: wrap;\r
  background: var(--surface);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius);\r
  padding: 16px 18px;\r
  margin: 0 0 22px;\r
  box-shadow: var(--shadow-sm);\r
}\r
\r
.action-bar .btn { flex: 0 0 auto; }\r
\r
.btn {\r
  padding: 13px 28px;\r
  font-family: 'Outfit', sans-serif;\r
  font-size: 14px;\r
  font-weight: 700;\r
  letter-spacing: 0.3px;\r
  cursor: pointer;\r
  border: none;\r
  transition: all 0.2s;\r
  border-radius: var(--radius-sm);\r
  display: inline-flex;\r
  align-items: center;\r
}\r
\r
.icon-svg {\r
  width: 15px;\r
  height: 15px;\r
  flex-shrink: 0;\r
  margin-right: 7px;\r
  vertical-align: -2px;\r
}\r
\r
.btn-upload .icon-svg,\r
.process-section-title strong .icon-svg {\r
  color: currentColor;\r
}\r
\r
.process-section-title strong {\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.btn-primary {\r
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);\r
  color: #fff;\r
  box-shadow: 0 4px 16px rgba(59,130,246,0.35);\r
}\r
\r
.btn-primary:hover {\r
  transform: translateY(-1px);\r
  box-shadow: 0 8px 26px rgba(59,130,246,0.45);\r
}\r
\r
.btn-primary:active { transform: scale(0.98); }\r
\r
.btn-secondary {\r
  background: transparent;\r
  color: var(--accent2);\r
  border: 1.5px solid var(--accent2);\r
}\r
\r
.btn-secondary:hover { background: rgba(8,145,178,0.06); }\r
\r
.btn-ghost {\r
  background: transparent;\r
  color: var(--muted);\r
  border: 1.5px solid var(--border);\r
  font-size: 13px;\r
}\r
\r
.btn-ghost:hover { color: var(--text2); border-color: var(--border2); background: var(--surface2); }\r
\r
.output-summary {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\r
  gap: 14px;\r
  margin-bottom: 28px;\r
}\r
\r
@media (max-width: 500px) { .output-summary { grid-template-columns: 1fr; } }\r
\r
.kpi-card {\r
  background: var(--surface);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius);\r
  padding: 20px 22px;\r
  position: relative;\r
  overflow: hidden;\r
  box-shadow: var(--shadow);\r
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;\r
}\r
\r
.kpi-card:hover {\r
  transform: translateY(-3px);\r
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(96,165,250,0.15);\r
  border-color: rgba(96,165,250,0.3);\r
}\r
\r
.kpi-card::before {\r
  content: '';\r
  position: absolute;\r
  top: 0; left: 0; right: 0;\r
  height: 3px;\r
  border-radius: var(--radius) var(--radius) 0 0;\r
}\r
\r
.kpi-card.kpi-green::before { background: var(--green); }\r
.kpi-card.kpi-blue::before { background: var(--blue); }\r
.kpi-card.kpi-amber::before { background: var(--amber); }\r
.kpi-card.kpi-red::before { background: var(--red); }\r
\r
.kpi-label {\r
  font-size: 11px;\r
  color: var(--muted);\r
  letter-spacing: 0.5px;\r
  text-transform: uppercase;\r
  font-weight: 600;\r
  margin-bottom: 10px;\r
}\r
\r
.kpi-value {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 30px;\r
  font-weight: 700;\r
  color: var(--text);\r
  line-height: 1;\r
}\r
\r
.kpi-card.kpi-green .kpi-value { color: var(--green); }\r
.kpi-card.kpi-blue .kpi-value { color: var(--blue); }\r
.kpi-card.kpi-amber .kpi-value { color: var(--amber); }\r
.kpi-card.kpi-red .kpi-value { color: var(--red); }\r
\r
.kpi-value .kpi-unit {\r
  font-size: 14px;\r
  color: var(--muted2);\r
  margin-left: 3px;\r
  font-weight: 400;\r
}\r
\r
.kpi-sub {\r
  font-size: 11px;\r
  color: var(--muted2);\r
  margin-top: 8px;\r
  font-weight: 400;\r
}\r
\r
/* \u2500\u2500 Reminder note shown at the bottom of the "Boiler Efficiency Corrected"\r
   card once APH Correction has been applied. \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.kpi-note {\r
  font-size: 11px;\r
  line-height: 1.5;\r
  color: var(--accent2);\r
  margin-top: 10px;\r
  padding-top: 10px;\r
  border-top: 1px dashed var(--border);\r
}\r
\r
.kpi-card .lrad-input {\r
  background: var(--surface2);\r
  border: 1.5px solid var(--border2);\r
  border-radius: var(--radius-sm);\r
  padding: 8px 12px;\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 26px;\r
  font-weight: 700;\r
  color: var(--red);\r
  width: 130px;\r
  outline: none;\r
  transition: all 0.2s;\r
  margin-top: 8px;\r
}\r
\r
.kpi-card .lrad-input:focus {\r
  border-color: var(--red);\r
  box-shadow: 0 0 0 3px rgba(220,38,38,0.15);\r
  background: rgba(220,38,38,0.05);\r
}\r
\r
/* \u2500\u2500 "Apply GCV/APH Correction" buttons \u2014 rendered as kpi-cards so they sit\r
   in the same row as the Boiler Efficiency / Delta Difference cards. \u2500\u2500\u2500\u2500\u2500\u2500 */\r
button.kpi-card.kpi-action {\r
  font-family: inherit;\r
  text-align: left;\r
  cursor: pointer;\r
  display: block;\r
  width: 100%;\r
}\r
\r
button.kpi-card.kpi-action .kpi-action-value {\r
  font-family: 'Outfit', sans-serif;\r
  font-size: 15px;\r
  font-weight: 600;\r
  line-height: 1.3;\r
  color: var(--accent2);\r
}\r
\r
button.kpi-card.kpi-action.applied { border-color: var(--green); }\r
button.kpi-card.kpi-action.applied::before { background: var(--green); }\r
button.kpi-card.kpi-action.applied .kpi-action-value { color: var(--green); }\r
\r
.cmp-badge {\r
  display: inline-block;\r
  font-size: 9px;\r
  font-weight: 700;\r
  letter-spacing: 0.3px;\r
  text-transform: uppercase;\r
  padding: 2px 7px;\r
  border-radius: 20px;\r
  background: var(--accent-light);\r
  color: var(--accent2);\r
  vertical-align: middle;\r
  margin-left: 4px;\r
}\r
\r
/* \u2500\u2500 Collapsible output-section headers (Process Inputs / Process Comparison) \u2500\u2500 */\r
.output-section-head.collapsible-head {\r
  cursor: pointer;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  user-select: none;\r
}\r
\r
.output-section-head.collapsible-head:hover { background: rgba(255,255,255,0.06); }\r
\r
.collapse-chevron {\r
  color: var(--muted);\r
  font-size: 13px;\r
  transition: transform 0.2s;\r
}\r
\r
/* Per-process date-range subline under each column header in Process Inputs */\r
.cmp-th-date {\r
  font-size: 10px;\r
  font-weight: 400;\r
  text-transform: none;\r
  letter-spacing: 0;\r
  color: var(--muted2);\r
  margin-top: 3px;\r
  font-family: 'JetBrains Mono', monospace;\r
}\r
\r
.output-section {\r
  background: var(--surface);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius);\r
  margin-bottom: 16px;\r
  overflow: hidden;\r
  box-shadow: var(--shadow);\r
}\r
\r
.output-section-head {\r
  background: var(--surface2);\r
  border-bottom: 1.5px solid var(--border);\r
  padding: 12px 22px;\r
}\r
\r
.output-section-head span {\r
  font-size: 11px;\r
  color: var(--accent2);\r
  letter-spacing: 1.5px;\r
  text-transform: uppercase;\r
  font-weight: 700;\r
  font-family: 'JetBrains Mono', monospace;\r
}\r
\r
.output-row {\r
  display: grid;\r
  grid-template-columns: 1fr 100px 110px 70px;\r
  border-bottom: 1px solid rgba(148,163,184,0.15);\r
  padding: 11px 22px;\r
  align-items: center;\r
  transition: background 0.15s;\r
}\r
\r
.output-row:last-child { border-bottom: none; }\r
.output-row:hover { background: var(--surface2); }\r
\r
.output-row.header-row {\r
  background: var(--surface2);\r
  font-size: 10px;\r
  color: var(--muted2);\r
  letter-spacing: 1.5px;\r
  text-transform: uppercase;\r
  font-family: 'JetBrains Mono', monospace;\r
  font-weight: 600;\r
  padding: 8px 22px;\r
  border-bottom: 1.5px solid var(--border);\r
}\r
\r
.out-name { font-size: 13px; color: var(--text2); font-weight: 500; }\r
.out-sym { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent); text-align: center; font-weight: 600; }\r
.out-val { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: var(--text); text-align: right; font-weight: 600; }\r
.out-uom { font-size: 11px; color: var(--muted2); text-align: right; font-family: 'JetBrains Mono', monospace; }\r
\r
.highlight-row { background: var(--green-light) !important; }\r
.highlight-row .out-val { color: var(--green); }\r
.highlight-row2 { background: var(--blue-light) !important; }\r
.highlight-row2 .out-val { color: var(--accent); }\r
\r
.download-bar {\r
  display: flex;\r
  gap: 12px;\r
  flex-wrap: wrap;\r
  margin-top: 28px;\r
  padding-top: 24px;\r
  border-top: 1.5px solid var(--border);\r
}\r
\r
.hidden { display: none !important; }\r
\r
::-webkit-scrollbar { width: 6px; height: 6px; }\r
::-webkit-scrollbar-track { background: var(--bg); }\r
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }\r
::-webkit-scrollbar-thumb:hover { background: var(--muted2); }\r
\r
@keyframes fadeUp {\r
  from { opacity: 0; transform: translateY(16px); }\r
  to { opacity: 1; transform: translateY(0); }\r
}\r
\r
@keyframes glowPulse {\r
  0%, 100% { box-shadow: 0 0 0 3px rgba(59,130,246,0.08), 0 4px 14px rgba(37,99,235,0.25); }\r
  50%      { box-shadow: 0 0 0 6px rgba(59,130,246,0.14), 0 4px 22px rgba(37,99,235,0.4); }\r
}\r
\r
@keyframes floatChip {\r
  0%, 100% { transform: translateY(0); }\r
  50%      { transform: translateY(-8px); }\r
}\r
\r
.animate-in { animation: fadeUp 0.4s ease forwards; }\r
\r
.page.active { animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1); }\r
\r
.kpi-card, .session-card, .field {\r
  animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) backwards;\r
}\r
.input-grid .field:nth-child(1) { animation-delay: 0.02s; }\r
.input-grid .field:nth-child(2) { animation-delay: 0.05s; }\r
.input-grid .field:nth-child(3) { animation-delay: 0.08s; }\r
.input-grid .field:nth-child(4) { animation-delay: 0.11s; }\r
.input-grid .field:nth-child(5) { animation-delay: 0.14s; }\r
.input-grid .field:nth-child(6) { animation-delay: 0.17s; }\r
.input-grid .field:nth-child(7) { animation-delay: 0.2s; }\r
.output-summary .kpi-card:nth-child(1) { animation-delay: 0.02s; }\r
.output-summary .kpi-card:nth-child(2) { animation-delay: 0.06s; }\r
.output-summary .kpi-card:nth-child(3) { animation-delay: 0.1s; }\r
.output-summary .kpi-card:nth-child(4) { animation-delay: 0.14s; }\r
.output-summary .kpi-card:nth-child(5) { animation-delay: 0.18s; }\r
.output-summary .kpi-card:nth-child(6) { animation-delay: 0.22s; }\r
.session-grid .session-card:nth-child(1) { animation-delay: 0.02s; }\r
.session-grid .session-card:nth-child(2) { animation-delay: 0.06s; }\r
.session-grid .session-card:nth-child(3) { animation-delay: 0.1s; }\r
.session-grid .session-card:nth-child(4) { animation-delay: 0.14s; }\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .page.active, .kpi-card, .session-card, .field { animation: none; }\r
}\r
\r
@media (max-width: 768px) {\r
  .container { padding: 0 16px; }\r
  .input-grid { grid-template-columns: 1fr; }\r
  .tab-btn { padding: 14px 16px; font-size: 12px; }\r
  .output-row { grid-template-columns: 1fr 80px 90px 60px; }\r
  .header-badge { display: none; }\r
}\r
/* \u2500\u2500 Excel Upload Banner \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.upload-banner {\r
  background: linear-gradient(135deg, rgba(37,99,235,0.06), rgba(8,145,178,0.06));\r
  border: 1.5px dashed rgba(37,99,235,0.35);\r
  border-radius: var(--radius);\r
  padding: 18px 22px;\r
  display: flex;\r
  align-items: center;\r
  gap: 16px;\r
  margin-bottom: 28px;\r
  flex-wrap: wrap;\r
  transition: border-color 0.2s, background 0.2s;\r
}\r
.upload-banner:hover {\r
  border-color: var(--accent);\r
  background: linear-gradient(135deg, rgba(37,99,235,0.09), rgba(8,145,178,0.09));\r
}\r
.upload-banner-icon {\r
  width: 38px;\r
  height: 38px;\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: 10px;\r
  background: var(--accent-light);\r
  border: 1.5px solid rgba(96,165,250,0.25);\r
  color: var(--accent2);\r
}\r
.upload-banner-icon svg { width: 19px; height: 19px; }\r
.upload-banner-text { flex: 1; min-width: 180px; }\r
.upload-banner-text strong { display: block; font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 3px; }\r
.upload-banner-text span { font-size: 12px; color: var(--muted); }\r
.upload-banner-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }\r
#upload-file-input { display: none; }\r
.btn-upload {\r
  padding: 10px 20px;\r
  background: linear-gradient(135deg, var(--accent), #1d4ed8);\r
  color: #fff;\r
  border: none;\r
  border-radius: var(--radius-sm);\r
  font-family: 'Outfit', sans-serif;\r
  font-size: 13px;\r
  font-weight: 700;\r
  cursor: pointer;\r
  transition: all 0.2s;\r
  box-shadow: 0 4px 12px rgba(37,99,235,0.3);\r
  white-space: nowrap;\r
  display: inline-flex;\r
  align-items: center;\r
}\r
.btn-upload:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(37,99,235,0.38); }\r
.upload-status {\r
  font-size: 12px;\r
  font-weight: 600;\r
  padding: 6px 14px;\r
  border-radius: 20px;\r
  white-space: nowrap;\r
}\r
.upload-status.loading { background: rgba(251,191,36,0.14); color: #fcd34d; }\r
.upload-status.success { background: rgba(74,222,128,0.14); color: #86efac; }\r
.upload-status.error   { background: rgba(248,113,113,0.14); color: #fca5a5; }\r
\r
/* \u2500\u2500 DB status pill in navbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.db-pill {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 10px;\r
  font-weight: 600;\r
  letter-spacing: 0.5px;\r
  padding: 4px 10px;\r
  border-radius: 20px;\r
  margin-left: 8px;\r
}\r
.db-pill.online  { background: rgba(74,222,128,0.14); color: #86efac; }\r
.db-pill.offline { background: rgba(248,113,113,0.14); color: #fca5a5; }\r
.db-pill.checking{ background: rgba(251,191,36,0.14); color: #fcd34d; }\r
\r
/* \u2500\u2500 Save session confirmation toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.toast {\r
  position: fixed;\r
  bottom: 28px;\r
  right: 28px;\r
  padding: 14px 22px;\r
  border-radius: var(--radius-sm);\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: #fff;\r
  box-shadow: var(--shadow-lg);\r
  z-index: 9999;\r
  opacity: 0;\r
  transform: translateY(16px);\r
  transition: all 0.3s ease;\r
  pointer-events: none;\r
}\r
.toast.show { opacity: 1; transform: translateY(0); }\r
.toast.toast-success { background: #059669; }\r
.toast.toast-error   { background: #dc2626; }\r
\r
/* \u2500\u2500 Sessions page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.sessions-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  margin: 32px 0 20px;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
}\r
.sessions-header h2 { font-size: 20px; font-weight: 800; color: var(--text); }\r
.sessions-count {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 11px;\r
  color: var(--muted);\r
  background: var(--surface2);\r
  border: 1px solid var(--border);\r
  padding: 4px 12px;\r
  border-radius: 20px;\r
}\r
.session-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\r
  gap: 16px;\r
  margin-bottom: 60px;\r
}\r
.session-card {\r
  background: var(--surface);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius);\r
  padding: 20px 22px;\r
  box-shadow: var(--shadow-sm);\r
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;\r
  cursor: pointer;\r
  position: relative;\r
}\r
.session-card:hover {\r
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(96,165,250,0.15);\r
  transform: translateY(-3px);\r
  border-color: rgba(96,165,250,0.3);\r
}\r
.session-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }\r
.session-card-title { font-size: 14px; font-weight: 700; color: var(--text); }\r
.session-card-date { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--muted2); margin-top: 3px; }\r
.session-card-source {\r
  font-size: 10px;\r
  background: var(--accent-light);\r
  color: var(--accent);\r
  padding: 3px 8px;\r
  border-radius: 4px;\r
  font-weight: 600;\r
  font-family: 'JetBrains Mono', monospace;\r
  white-space: nowrap;\r
  max-width: 140px;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
.session-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }\r
.session-kpi { background: var(--surface2); border-radius: var(--radius-sm); padding: 10px 14px; border: 1px solid var(--border); }\r
.session-kpi-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 4px; }\r
.session-kpi-value { font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700; }\r
.session-kpi-value.green { color: var(--green); }\r
.session-kpi-value.blue  { color: var(--blue); }\r
.session-kpi-value.red   { color: var(--red); }\r
.session-kpi-value.amber { color: var(--amber); }\r
.session-card-delete {\r
  position: absolute;\r
  top: 12px;\r
  right: 12px;\r
  background: transparent;\r
  border: none;\r
  cursor: pointer;\r
  color: var(--muted2);\r
  font-size: 16px;\r
  padding: 4px 6px;\r
  border-radius: 6px;\r
  transition: all 0.2s;\r
  opacity: 0;\r
}\r
.session-card:hover .session-card-delete { opacity: 1; }\r
.session-card-delete:hover { background: var(--red-light); color: var(--red); }\r
\r
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center; }\r
.empty-icon { font-size: 64px; margin-bottom: 20px; }\r
.empty-title { font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 8px; }\r
.empty-sub { font-size: 14px; color: var(--muted); max-width: 320px; }\r
\r
/* Session detail modal */\r
.modal-overlay {\r
  position: fixed; inset: 0; background: rgba(15,23,42,0.55); backdrop-filter: blur(4px);\r
  z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px;\r
  opacity: 0; pointer-events: none; transition: opacity 0.25s;\r
}\r
.modal-overlay.open { opacity: 1; pointer-events: all; }\r
.modal {\r
  background: #101d42; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);\r
  border: 1px solid var(--border);\r
  border-radius: var(--radius); box-shadow: var(--shadow-lg);\r
  width: 100%; max-width: 700px; max-height: 88vh; overflow-y: auto;\r
  transform: translateY(24px); transition: transform 0.25s;\r
}\r
.modal-overlay.open .modal { transform: translateY(0); }\r
.modal-header {\r
  display: flex; align-items: center; justify-content: space-between;\r
  padding: 22px 26px 16px; border-bottom: 1px solid var(--border); position: sticky; top: 0;\r
  background: var(--surface); z-index: 1;\r
}\r
.modal-header h3 { font-size: 17px; font-weight: 800; color: var(--text); }\r
.modal-close { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--muted); padding: 4px 8px; border-radius: 6px; transition: all 0.2s; }\r
.modal-close:hover { background: var(--surface2); color: var(--text); }\r
.modal-body { padding: 22px 26px; }\r
.modal-section-title {\r
  font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--accent2);\r
  letter-spacing: 2px; text-transform: uppercase; font-weight: 700;\r
  margin: 20px 0 10px; padding-bottom: 6px; border-bottom: 1px solid var(--border);\r
}\r
.modal-section-title:first-child { margin-top: 0; }\r
.modal-row {\r
  display: grid; grid-template-columns: 1fr auto auto;\r
  gap: 8px; padding: 7px 0; border-bottom: 1px solid rgba(148,163,184,0.12);\r
  font-size: 13px; align-items: center;\r
}\r
.modal-row:last-child { border-bottom: none; }\r
.modal-row-name { color: var(--text2); }\r
.modal-row-val { font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--text); text-align: right; }\r
.modal-row-uom { font-size: 11px; color: var(--muted2); text-align: right; font-family: 'JetBrains Mono', monospace; min-width: 46px; }\r
.modal-highlight { background: var(--green-light) !important; border-radius: 6px; padding: 10px 12px !important; margin: 4px 0; }\r
.modal-highlight .modal-row-val { color: var(--green); font-size: 16px; }\r
.modal-highlight2 { background: var(--blue-light) !important; border-radius: 6px; padding: 10px 12px !important; margin: 4px 0; }\r
.modal-highlight2 .modal-row-val { color: var(--accent); font-size: 16px; }\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   Date-wise Processes \u2014 multi-date-range selection + calendar picker +\r
   comparison table (see public/script.js: addProcess/openDatePicker/\r
   renderComparison)\r
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
.process-section {\r
  background: var(--surface);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius);\r
  padding: 16px 20px;\r
  margin-bottom: 28px;\r
}\r
.process-section-head {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
  flex-wrap: wrap;\r
}\r
.process-section-title { display: flex; flex-direction: column; gap: 3px; }\r
.process-section-title strong { font-size: 14px; color: var(--text); }\r
.process-section-sub { font-size: 12px; color: var(--muted); }\r
#process-list { margin-top: 14px; display: flex; flex-direction: column; gap: 10px; }\r
.process-empty {\r
  font-size: 12px;\r
  color: var(--muted2);\r
  font-style: italic;\r
  padding: 6px 2px;\r
}\r
.process-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  flex-wrap: wrap;\r
  background: var(--surface2);\r
  border: 1.5px solid var(--border);\r
  border-radius: var(--radius-sm);\r
  padding: 10px 12px;\r
}\r
.process-title-input {\r
  flex: 1 1 160px;\r
  min-width: 140px;\r
  background: var(--bg);\r
  border: 1.5px solid var(--border);\r
  border-radius: 8px;\r
  padding: 8px 10px;\r
  color: var(--text-bright);\r
  font-family: 'Outfit', sans-serif;\r
  font-size: 13px;\r
  font-weight: 600;\r
  outline: none;\r
}\r
.process-title-input:focus { border-color: var(--accent); }\r
.process-date-btn {\r
  background: var(--bg);\r
  border: 1.5px solid var(--border);\r
  border-radius: 8px;\r
  padding: 8px 12px;\r
  color: var(--text2);\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 12px;\r
  cursor: pointer;\r
  transition: border-color 0.15s;\r
  white-space: nowrap;\r
}\r
.process-date-btn:hover { border-color: var(--accent); color: var(--text-bright); }\r
.process-date-sep { color: var(--muted2); font-size: 13px; }\r
.process-row-count {\r
  font-size: 11px;\r
  color: var(--muted);\r
  white-space: nowrap;\r
  margin-left: auto;\r
}\r
.process-remove-btn {\r
  background: transparent;\r
  border: 1.5px solid var(--border);\r
  border-radius: 8px;\r
  color: var(--muted);\r
  width: 30px;\r
  height: 30px;\r
  cursor: pointer;\r
  font-size: 13px;\r
  transition: all 0.15s;\r
  flex-shrink: 0;\r
}\r
.process-remove-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-light); }\r
\r
/* \u2500\u2500 Calendar popup \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.date-picker-popup {\r
  position: absolute;\r
  z-index: 10000;\r
  background: var(--bg2);\r
  border: 1.5px solid var(--border2);\r
  border-radius: var(--radius-sm);\r
  box-shadow: var(--shadow-lg);\r
  padding: 12px;\r
  width: 240px;\r
  font-family: 'Outfit', sans-serif;\r
}\r
.dp-head {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  margin-bottom: 8px;\r
}\r
.dp-month { font-size: 13px; font-weight: 700; color: var(--text-bright); }\r
.dp-nav {\r
  background: var(--surface);\r
  border: 1px solid var(--border);\r
  border-radius: 6px;\r
  color: var(--text2);\r
  width: 26px;\r
  height: 26px;\r
  cursor: pointer;\r
  font-size: 15px;\r
  line-height: 1;\r
}\r
.dp-nav:hover { border-color: var(--accent); color: var(--accent2); }\r
.dp-grid {\r
  display: grid;\r
  grid-template-columns: repeat(7, 1fr);\r
  gap: 2px;\r
  text-align: center;\r
}\r
.dp-dow { margin-bottom: 4px; }\r
.dp-dow span { font-size: 10px; color: var(--muted2); font-weight: 600; }\r
.dp-cell {\r
  position: relative;\r
  padding: 6px 0;\r
  font-size: 12px;\r
  color: var(--text2);\r
  border-radius: 6px;\r
  cursor: pointer;\r
}\r
.dp-cell:hover { background: var(--accent-light); color: var(--text-bright); }\r
.dp-cell.dp-empty { cursor: default; }\r
.dp-cell.dp-empty:hover { background: transparent; }\r
.dp-cell.dp-selected { background: var(--accent); color: #fff; font-weight: 700; }\r
.dp-dot {\r
  position: absolute;\r
  bottom: 2px;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  width: 4px;\r
  height: 4px;\r
  border-radius: 50%;\r
  background: var(--red);\r
}\r
.dp-cell.dp-selected .dp-dot { background: #fff; }\r
.dp-foot {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  margin-top: 10px;\r
  padding-top: 8px;\r
  border-top: 1px solid var(--border);\r
}\r
.dp-legend {\r
  display: flex;\r
  align-items: center;\r
  gap: 5px;\r
  font-size: 10px;\r
  color: var(--muted);\r
}\r
.dp-legend .dp-dot { position: static; transform: none; display: inline-block; }\r
.dp-clear {\r
  background: transparent;\r
  border: none;\r
  color: var(--accent2);\r
  font-size: 11px;\r
  font-weight: 600;\r
  cursor: pointer;\r
}\r
.dp-clear:hover { text-decoration: underline; }\r
\r
/* \u2500\u2500 Comparison table (multi-process results) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.cmp-table-wrap { overflow-x: auto; }\r
.cmp-table {\r
  width: 100%;\r
  border-collapse: collapse;\r
  font-size: 12px;\r
}\r
.cmp-table th, .cmp-table td {\r
  padding: 8px 14px;\r
  text-align: right;\r
  white-space: nowrap;\r
  border-bottom: 1px solid var(--border);\r
}\r
.cmp-table th:first-child, .cmp-table td:first-child { text-align: left; }\r
.cmp-table thead th {\r
  color: var(--accent2);\r
  font-weight: 700;\r
  border-bottom: 1.5px solid var(--border2);\r
}\r
.cmp-table td.cmp-metric { color: var(--muted); font-weight: 600; }\r
.cmp-table tbody tr:hover { background: var(--surface2); }\r
.cmp-note {\r
  font-size: 11px;\r
  color: var(--muted2);\r
  padding: 10px 14px 2px;\r
  font-style: italic;\r
}`;var p1=`/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   style1.css \u2014 BS-2885 tab only\r
   Loaded after style.css on tab1.html. Everything here is additive:\r
   it only styles the couple of things tab1.html introduces that don't\r
   already exist in style.css (the loss-breakdown tables on the Results\r
   page, and a small note banner under the input form \u2014 same visual\r
   language as style3.css's .bee-note for BEE). Nothing in style.css is\r
   overridden \u2014 CENPEEP / ASME-PTC 4.1 / BEE keep their exact current look.\r
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
.output-table-wrap {\r
  margin-top: 18px;\r
  padding: 16px 18px;\r
  border: 1px solid rgba(148, 163, 184, 0.18);\r
  border-radius: 10px;\r
  background: var(--surface2);\r
}\r
.output-table-wrap h3 {\r
  margin: 0 0 12px;\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: var(--text);\r
  letter-spacing: 0.2px;\r
}\r
.output-table {\r
  width: 100%;\r
  border-collapse: collapse;\r
  font-size: 12.5px;\r
}\r
.output-table th,\r
.output-table td {\r
  text-align: left;\r
  padding: 8px 10px;\r
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);\r
}\r
.output-table th {\r
  color: var(--muted);\r
  font-weight: 600;\r
  font-size: 11px;\r
  text-transform: uppercase;\r
  letter-spacing: 0.4px;\r
}\r
.output-table td {\r
  color: var(--text);\r
  font-family: 'JetBrains Mono', monospace;\r
}\r
.output-table td:first-child {\r
  font-family: 'Outfit', sans-serif;\r
  color: var(--muted);\r
}\r
.output-table tbody tr:last-child td { border-bottom: none; }\r
\r
/* Note banner under the BS-2885 input form \u2014 same treatment as\r
   style3.css's .bee-note for the BEE tab. */\r
.bs-note {\r
  margin-top: 16px;\r
  padding: 12px 16px;\r
  border: 1px solid rgba(148, 163, 184, 0.18);\r
  border-left: 3px solid var(--accent);\r
  border-radius: 8px;\r
  background: var(--surface2);\r
  color: var(--muted);\r
  font-size: 12.5px;\r
  line-height: 1.6;\r
}\r
.bs-note strong { color: var(--text); }\r
.bs-note code {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 11.5px;\r
  background: rgba(148, 163, 184, 0.14);\r
  padding: 1px 5px;\r
  border-radius: 4px;\r
}`;var b1=`/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   style3.css \u2014 BEE tab only\r
   Loaded after style.css on tab3.html. Everything here is additive:\r
   it only styles the couple of things tab3.html introduces that don't\r
   already exist in style.css (an "info only" field tag for General\r
   Data, and a small note banner under the input form). Nothing in\r
   style.css is overridden \u2014 BS-2885 / ASME-PTC 4.1 / CENPEEP keep\r
   their exact current look.\r
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
/* "INFO ONLY" tag \u2014 Boiler Load / Steam Pressure aren't used by the\r
   BEE-2 Indirect formula, only carried for the report header. Same\r
   visual language as the existing .manual-tag / .formula-tag pills,\r
   just a neutral color so it doesn't read as "needs attention". */\r
.info-tag {\r
  display: inline-block;\r
  font-size: 9px;\r
  font-weight: 700;\r
  letter-spacing: 0.4px;\r
  padding: 1px 6px;\r
  border-radius: 4px;\r
  margin-left: 6px;\r
  background: rgba(148, 163, 184, 0.16);\r
  color: var(--muted);\r
  vertical-align: middle;\r
}\r
\r
.field.field-info {\r
  opacity: 0.85;\r
}\r
\r
/* Note banner under the BEE input form, explaining what's informational\r
   vs what actually feeds the calculation, and pointing at script3.js\r
   for the two formula quirks carried over from the reference sheet. */\r
.bee-note {\r
  margin-top: 16px;\r
  padding: 12px 16px;\r
  border: 1px solid rgba(148, 163, 184, 0.18);\r
  border-left: 3px solid var(--accent);\r
  border-radius: 8px;\r
  background: var(--surface2);\r
  color: var(--muted);\r
  font-size: 12.5px;\r
  line-height: 1.6;\r
}\r
.bee-note strong {\r
  color: var(--text);\r
}\r
.bee-note code {\r
  font-family: 'JetBrains Mono', monospace;\r
  font-size: 11.5px;\r
  background: rgba(148, 163, 184, 0.14);\r
  padding: 1px 5px;\r
  border-radius: 4px;\r
}`;var g1=`/* Copied verbatim from the injected <style> in public/boiler-gate.js */
      /* \u2500\u2500 Locked state: tab switching + upload disabled until a boiler
         type is picked for this session \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
      body.boiler-locked .nav-link,
      body.boiler-locked .tab-btn,
      body.boiler-locked .btn-upload {
        pointer-events: none;
        opacity: 0.4;
        filter: grayscale(0.4);
        cursor: not-allowed;
      }
      body.boiler-locked #upload-file-input { pointer-events: none; }

      /* \u2500\u2500 "Select Boiler Type" banner \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

      /* \u2500\u2500 Boiler-type popup card (reuses the app's existing modal look) \u2500\u2500 */
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
    `;var tn=V(Xe(),1),us=V(K(),1),v1=(0,tn.createContext)(()=>{}),xn=()=>(0,tn.useContext)(v1);function y1({children:e}){let[t,n]=(0,tn.useState)({msg:"",type:"success",show:!1}),a=(0,tn.useRef)(null),l=(0,tn.useCallback)((i,o="success")=>{n({msg:i,type:o,show:!0}),clearTimeout(a.current),a.current=setTimeout(()=>n(r=>({...r,show:!1})),3200)},[]);return(0,tn.useEffect)(()=>()=>clearTimeout(a.current),[]),(0,us.jsxs)(v1.Provider,{value:l,children:[e,(0,us.jsx)("div",{className:t.show?`toast toast-${t.type} show`:"toast",id:"toast",children:t.msg})]})}var Sn=V(Xe(),1),S1=V(K(),1),h1=(0,Sn.createContext)({boilerType:null,setBoilerType:()=>{}}),vo=()=>(0,Sn.useContext)(h1);function x1({children:e}){let[t,n]=(0,Sn.useState)(()=>sessionStorage.getItem("boilerType")),a=(0,Sn.useCallback)(l=>{sessionStorage.setItem("boilerType",l),n(l)},[]);return(0,Sn.useEffect)(()=>(document.body.classList.toggle("boiler-locked",!t),()=>document.body.classList.remove("boiler-locked")),[t]),(0,S1.jsx)(h1.Provider,{value:{boilerType:t,setBoilerType:a},children:e})}var Gt=V(K(),1),dh=[{to:"/calculator",label:"CENPEEP"},{to:"/bs-2885",label:"BS-2885"},{to:"/asme-ptc-4-1",label:"ASME-PTC 4.1"},{to:"/bee",label:"BEE"},{to:"/summary",label:"Summary"},{to:"/sessions",label:"Sessions"}];function vd({active:e}){let{boilerType:t}=vo();return(0,Gt.jsx)("nav",{className:"navbar",children:(0,Gt.jsxs)("div",{className:"nav-inner",children:[(0,Gt.jsxs)("div",{className:"nav-logo",children:[(0,Gt.jsx)("div",{className:"nav-logo-icon",children:(0,Gt.jsx)("img",{src:"images/abhitech-logo.png",alt:"ABHITECH"})}),(0,Gt.jsxs)("span",{className:"nav-logo-text",children:["Boiler",(0,Gt.jsx)("small",{children:"Efficiency Calculator"})]}),t&&(0,Gt.jsx)("span",{id:"boiler-type-badge",className:"boiler-type-badge",title:"Boiler type selected at login",children:t})]}),(0,Gt.jsx)("div",{className:"nav-links",children:dh.map(n=>(0,Gt.jsx)(t1,{to:n.to,className:"nav-link"+(e===n.to?" active":""),children:n.label},n.to))}),(0,Gt.jsx)("button",{className:"nav-logout",onClick:()=>Kb(),children:"Logout"})]})})}var yo=V(Xe(),1);var De=V(K(),1),yd=["CFBC","Pulverized Coal","AFBC","Bagasse Fired"];function nn(){let{boilerType:e}=vo();return(0,De.jsxs)("div",{className:"boiler-lock-banner",id:"boiler-lock-banner",style:{display:e?"none":"flex"},children:[(0,De.jsx)("div",{className:"boiler-lock-banner-icon",children:(0,De.jsx)(bd,{width:"20",height:"20"})}),(0,De.jsxs)("div",{className:"boiler-lock-banner-text",children:[(0,De.jsx)("strong",{children:"Boiler type not selected"}),(0,De.jsx)("span",{children:"Select your boiler type to unlock uploads and tab switching."})]}),(0,De.jsx)("button",{type:"button",className:"btn btn-primary",id:"boiler-select-trigger",onClick:()=>window.dispatchEvent(new CustomEvent("open-boiler-modal")),children:"Select Boiler Type"})]})}function C1(){let{boilerType:e,setBoilerType:t}=vo(),[n,a]=(0,yo.useState)(!1),[l,i]=(0,yo.useState)(e&&yd.includes(e)?e:yd[0]);return fh(()=>a(!0)),(0,De.jsx)("div",{className:"modal-overlay"+(n?" open":""),id:"boilerSelectOverlay",onClick:o=>{o.target===o.currentTarget&&a(!1)},children:(0,De.jsxs)("div",{className:"modal boiler-select-modal",children:[(0,De.jsxs)("div",{className:"modal-header",children:[(0,De.jsx)("h3",{children:"Select Your Boiler Type"}),(0,De.jsx)("button",{className:"modal-close",id:"boilerSelectClose","aria-label":"Close",type:"button",onClick:()=>a(!1),children:"\xD7"})]}),(0,De.jsxs)("div",{className:"modal-body",children:[(0,De.jsx)("div",{className:"boiler-select-icon",children:(0,De.jsx)(bd,{width:"26",height:"26"})}),(0,De.jsx)("div",{className:"boiler-select-sub",children:"This helps tailor the calculation to your plant"}),(0,De.jsxs)("div",{className:"boiler-select-field",children:[(0,De.jsx)("label",{htmlFor:"boilerTypeSelect",children:"Boiler Type"}),(0,De.jsx)("div",{className:"select-wrap",children:(0,De.jsx)("select",{id:"boilerTypeSelect",value:l,onChange:o=>i(o.target.value),children:yd.map(o=>(0,De.jsx)("option",{value:o,children:o},o))})})]}),(0,De.jsx)("button",{type:"button",className:"btn btn-primary",id:"boilerSelectOk",onClick:()=>{t(l),a(!1)},children:"OK"})]})]})})}function fh(e){(0,yo.useEffect)(()=>(window.addEventListener("open-boiler-modal",e),()=>window.removeEventListener("open-boiler-modal",e)))}var tl=V(K(),1),A1={bs2885:p1,bee:b1};function Vt({active:e,extraStyle:t,children:n}){return os([m1,...A1[t]?[A1[t]]:[],g1],"app-"+(t||"base")),(0,tl.jsx)(x1,{children:(0,tl.jsxs)(y1,{children:[(0,tl.jsx)(go,{}),(0,tl.jsx)(vd,{active:e}),n,(0,tl.jsx)(C1,{})]})})}var E1=V(Xe(),1);var Yt=V(K(),1);function cn({description:e,onFile:t,status:n,buttonLabel:a="Upload Excel Sheet"}){let l=(0,E1.useRef)(null);return(0,Yt.jsxs)("div",{className:"upload-banner",id:"upload-banner",children:[(0,Yt.jsx)("div",{className:"upload-banner-icon",children:(0,Yt.jsx)(o1,{})}),(0,Yt.jsxs)("div",{className:"upload-banner-text",children:[(0,Yt.jsx)("strong",{children:"Import from Excel"}),(0,Yt.jsx)("span",{children:e})]}),(0,Yt.jsxs)("div",{className:"upload-banner-actions",children:[(0,Yt.jsx)("input",{type:"file",id:"upload-file-input",accept:".xlsx,.xls,.xlsm",ref:l,onChange:i=>{let o=i.target.files[0];o&&Promise.resolve(t(o)).finally(()=>{l.current&&(l.current.value="")})}}),(0,Yt.jsxs)("button",{className:"btn-upload",onClick:()=>l.current&&l.current.click(),children:[(0,Yt.jsx)(r1,{}),a]}),n&&(0,Yt.jsx)("span",{className:"upload-status "+n.cls,id:"upload-status",style:{display:"inline-block"},children:n.node!==void 0?n.node:n.text})]})]})}var oe=V(K(),1),T1={cenpeep_column:"CenPeep layout",raw_tabular:"raw data, averaged",raw_tabular_ml:"raw data + AI field detection",raw_tabular_chunked:"large sheet, chunked",raw_tabular_ml_chunked:"large sheet, chunked + AI field detection",unrecognized:"no fields found"},N1={...T1,generic_row_layout:"labeled-row layout",label_value_layout:"label/value form layout"},cs=T1;function ni({data:e,populated:t,fieldDetail:n,missingFieldsList:a,strategyLabel:l,derivedLabel:i,bee:o}){let r=e.sheetResults||[],s=e.primarySheet||"",d=r.find(B=>B.sheetName===s),p=d?l[d.strategy]||d.strategy:"",g=Object.entries(n).sort(([,B],[,f])=>(B.label||"").localeCompare(f.label||"")).map(([B,f])=>{let u=typeof f.confidence=="number"?`${Math.round(f.confidence*100)}%`:"\u2014",b=f.source==="ml"?"\u{1F916} AI-detected":f.source==="cenpeep_column"?"CenPeep layout":f.source==="derived_fallback"?i:"exact match",v=f.header?`"${f.header}"`:f.label||B;return(0,oe.jsxs)("tr",{children:[(0,oe.jsx)("td",{children:f.label||B}),(0,oe.jsx)("td",{children:v}),(0,oe.jsx)("td",{children:b}),(0,oe.jsx)("td",{children:u})]},B)}),c=a.map(B=>B.label||B.id||B),m;c.length?m=(0,oe.jsxs)(oe.Fragment,{children:[(0,oe.jsx)("br",{}),(0,oe.jsxs)("small",{style:{color:"#f87171"},children:["\u26A0 Not detected \u2014 enter manually: ",c.join(", ")]})]}):!o||t?m=(0,oe.jsxs)(oe.Fragment,{children:[(0,oe.jsx)("br",{}),(0,oe.jsx)("small",{style:{color:"#4ade80"},children:"\u2713 All required fields detected"})]}):m=(0,oe.jsxs)(oe.Fragment,{children:[(0,oe.jsx)("br",{}),(0,oe.jsx)("small",{style:{color:"#94a3b8"},children:"BEE field detection isn't wired up on the server yet \u2014 enter values manually below."})]});let C=e.parseTimeMs?` in ${(e.parseTimeMs/1e3).toFixed(1)}s`:"";return(0,oe.jsxs)(oe.Fragment,{children:[o?t?"\u2713":"\u2139":"\u2713"," ",(0,oe.jsxs)("b",{children:[t," field",o?o?t===1?"":"s":"":"s"]}),' auto-populated from "',e.filename,'" (',e.fileSizeMB||"?"," MB)",C,(0,oe.jsx)("br",{}),(0,oe.jsxs)("small",{style:{color:"#94a3b8"},children:["\u{1F4C4} Selected sheet: ",(0,oe.jsx)("b",{children:s})," (",p,") \u2014 out of ",r.length," sheet(s) scanned"]}),g.length>0&&(0,oe.jsxs)("table",{style:{width:"100%",fontSize:"12px",borderCollapse:"collapse",marginTop:"4px"},children:[(0,oe.jsx)("thead",{children:(0,oe.jsxs)("tr",{style:{color:"#94a3b8",textAlign:"left"},children:[(0,oe.jsx)("th",{children:"Field"}),(0,oe.jsx)("th",{children:"Detected From"}),(0,oe.jsx)("th",{children:"Method"}),(0,oe.jsx)("th",{children:"Confidence"})]})}),(0,oe.jsx)("tbody",{children:g})]}),m]})}var li=V(Xe(),1);var Qn=V(Xe(),1),k1=V(Ys(),1),Ue=V(K(),1);function hd({anchorEl:e,selected:t,availableDates:n,onSelect:a,onClose:l}){let i=new Set(n||[]),o=t?new Date(t+"T00:00:00"):n&&n.length?new Date(n[n.length-1]+"T00:00:00"):new Date,[r,s]=(0,Qn.useState)({y:o.getFullYear(),m:o.getMonth()}),d=(0,Qn.useRef)(null),[p,g]=(0,Qn.useState)({top:0,left:0});(0,Qn.useLayoutEffect)(()=>{let u=e.getBoundingClientRect();g({top:window.scrollY+u.bottom+6,left:window.scrollX+u.left})},[e]),(0,Qn.useEffect)(()=>{let u=v=>{d.current&&!d.current.contains(v.target)&&v.target!==e&&l()},b=setTimeout(()=>document.addEventListener("mousedown",u),0);return()=>{clearTimeout(b),document.removeEventListener("mousedown",u)}},[e,l]);let c=new Date(r.y,r.m,1),m=c.getDay(),C=new Date(r.y,r.m+1,0).getDate(),N=c.toLocaleString("default",{month:"long"}),B=u=>s(({y:b,m:v})=>{let w=v+u,H=b;return w<0&&(w=11,H--),w>11&&(w=0,H++),{y:H,m:w}}),f=[];for(let u=0;u<m;u++)f.push((0,Ue.jsx)("span",{className:"dp-cell dp-empty"},"e"+u));for(let u=1;u<=C;u++){let b=`${r.y}-${String(r.m+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,v=i.has(b),w=t===b;f.push((0,Ue.jsxs)("span",{className:"dp-cell"+(v?" dp-has-data":"")+(w?" dp-selected":""),"data-date":b,onClick:()=>{a(b),l()},children:[u,v&&(0,Ue.jsx)("i",{className:"dp-dot"})]},b))}return(0,k1.createPortal)((0,Ue.jsxs)("div",{className:"date-picker-popup",ref:d,style:{top:p.top+"px",left:p.left+"px"},children:[(0,Ue.jsxs)("div",{className:"dp-head",children:[(0,Ue.jsx)("button",{type:"button",className:"dp-nav",onClick:()=>B(-1),children:"\u2039"}),(0,Ue.jsxs)("span",{className:"dp-month",children:[N," ",r.y]}),(0,Ue.jsx)("button",{type:"button",className:"dp-nav",onClick:()=>B(1),children:"\u203A"})]}),(0,Ue.jsxs)("div",{className:"dp-grid dp-dow",children:[(0,Ue.jsx)("span",{children:"S"}),(0,Ue.jsx)("span",{children:"M"}),(0,Ue.jsx)("span",{children:"T"}),(0,Ue.jsx)("span",{children:"W"}),(0,Ue.jsx)("span",{children:"T"}),(0,Ue.jsx)("span",{children:"F"}),(0,Ue.jsx)("span",{children:"S"})]}),(0,Ue.jsx)("div",{className:"dp-grid",children:f}),(0,Ue.jsxs)("div",{className:"dp-foot",children:[(0,Ue.jsxs)("span",{className:"dp-legend",children:[(0,Ue.jsx)("i",{className:"dp-dot"})," data available"]}),(0,Ue.jsx)("button",{type:"button",className:"dp-clear",onClick:()=>{a(null),l()},children:"Clear"})]})]}),document.body)}var nl=(e,t=4)=>typeof e=="number"&&!isNaN(e)?e.toFixed(t):"\u2014",z=e=>nl(e,2),mh=(e,t=4)=>typeof e=="number"&&!isNaN(e)&&isFinite(e)?e.toFixed(t):"\u2014",jt=e=>mh(e,2),O1=(e,t=2)=>typeof e=="number"&&!isNaN(e)?(e>=0?"+":"")+e.toFixed(t):"\u2014";function ot(e){if(!e)return"\u2014";let t=new Date(e+"T00:00:00");return isNaN(t.getTime())?e:t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}var La=(e,t)=>parseFloat(e[t])||0;function ds(e,t,n,a){return(e&&e.datedRows||[]).concat(a||[]).filter(i=>i.date&&(!t||i.date>=t)&&(!n||i.date<=n))}function ai(e,t,n,a=!1){let l=a?Object.values(e&&e.beeOverridesDated||{}).flat():[],i=ds(e,t,n,l),o={},r={};i.forEach(d=>Object.entries(d.values).forEach(([p,g])=>{o[p]=(o[p]||0)+g,r[p]=(r[p]||0)+1}));let s={};return Object.keys(o).forEach(d=>{s[d]=o[d]/r[d]}),{avg:s,rowCount:ds(e,t,n).length}}var xd="cenpeep_lastUpload";function Cn(e,t){try{sessionStorage.setItem(xd,JSON.stringify({filename:e.filename,primarySheet:e.primarySheet,sheetNameBS2885:e.sheetNameBS2885,extracted:e.extracted||{},extractedBS2885:e.extractedBS2885||{},sourceTab:t,savedAt:Date.now()}))}catch{}}function Xn(e,t){let n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=t,n.click()}var et=V(K(),1);function al({uploadData:e,processes:t,onAdd:n,onRemove:a,onTitle:l,onDate:i}){let[o,r]=(0,li.useState)(null),s=(0,li.useCallback)(()=>r(null),[]),d=!!(e&&e.dateFilteringAvailable&&e.availableDates&&e.availableDates.length),p="Optional \u2014 split this file into named date ranges and compare results side by side.";if(d){let c=e.availableDates;p=`Dated data found from ${c[0]} to ${c[c.length-1]} (${c.length} day${c.length===1?"":"s"} with readings) on "${e.primarySheet||""}".`}let g=o?t.find(c=>c.id===o.id):null;return(0,et.jsxs)("div",{className:"process-section",id:"process-section",style:{display:d?"":"none"},children:[(0,et.jsxs)("div",{className:"process-section-head",children:[(0,et.jsxs)("div",{className:"process-section-title",children:[(0,et.jsxs)("strong",{children:[(0,et.jsx)(s1,{}),"Date-wise Processes"]}),(0,et.jsx)("span",{className:"process-section-sub",id:"process-hint",children:p})]}),(0,et.jsx)("button",{type:"button",className:"btn btn-secondary",id:"add-process-btn",onClick:n,children:"+ Add Process"})]}),(0,et.jsx)("div",{id:"process-list",children:t.length?t.map(c=>{let m=ds(e,c.start,c.end).length;return(0,et.jsxs)("div",{className:"process-row","data-id":c.id,children:[(0,et.jsx)("input",{type:"text",className:"process-title-input",value:c.title,placeholder:"Process title",onChange:C=>l(c.id,C.target.value)}),(0,et.jsx)("button",{type:"button",className:"process-date-btn","data-role":"start",onClick:C=>r({id:c.id,role:"start",el:C.currentTarget}),children:c.start||"Start date"}),(0,et.jsx)("span",{className:"process-date-sep",children:"\u2192"}),(0,et.jsx)("button",{type:"button",className:"process-date-btn","data-role":"end",onClick:C=>r({id:c.id,role:"end",el:C.currentTarget}),children:c.end||"End date"}),(0,et.jsxs)("span",{className:"process-row-count",children:[m," row",m===1?"":"s"," in range"]}),(0,et.jsx)("button",{type:"button",className:"process-remove-btn",onClick:()=>a(c.id),title:"Remove process",children:"\u2715"})]},c.id)}):(0,et.jsx)("div",{className:"process-empty",children:"No processes added \u2014 Calculate will use the whole file's average, same as today."})}),o&&g&&(0,et.jsx)(hd,{anchorEl:o.el,selected:g[o.role],availableDates:e&&e.availableDates||[],onSelect:c=>i(o.id,o.role,c),onClose:s})]})}function ii(){let[e,t]=(0,li.useState)([]),[n,a]=(0,li.useState)(0);return{processes:e,setProcesses:t,add:()=>{let l=n+1;a(l),t(i=>[...i,{id:"proc"+l,title:`Process ${i.length+1}`,start:null,end:null}])},remove:l=>t(i=>i.filter(o=>o.id!==l)),setTitle:(l,i)=>t(o=>o.map(r=>r.id===l?{...r,title:i}:r)),setDate:(l,i,o)=>t(r=>r.map(s=>s.id===l?{...s,[i]:o}:s))}}var je=V(K(),1);function Zn({cards:e,open:t,onToggle:n}){return(0,je.jsx)("div",{className:"section-cards-grid",children:e.map(a=>(0,je.jsxs)("div",{className:"section-card"+(t[a.target]?" open":""),"data-target":a.target,onClick:()=>n(a.target),children:[(0,je.jsx)("div",{className:"section-card-icon",children:a.icon}),(0,je.jsxs)("div",{className:"section-card-body",children:[(0,je.jsx)("div",{className:"section-card-title",children:a.title}),(0,je.jsx)("div",{className:"section-card-sub",children:a.sub})]}),(0,je.jsx)("span",{className:"section-toggle",children:"\u25B8"})]},a.target))})}function Jn({id:e,fields:t,open:n,values:a,derived:l={},onChange:i,detected:o,missing:r}){return(0,je.jsx)("div",{className:"input-grid"+(n?"":" is-collapsed"),id:e,children:t.map(s=>{let d=["field-input"];s.formula&&d.push("formula-input"),o.has(s.id)&&d.push("field-detected"),r.has(s.id)&&d.push("field-missing");let p=s.readonly?l[s.id]??"":a[s.id]??"";return(0,je.jsxs)("div",{className:"field"+(s.kind?" "+s.kind:""),children:[(0,je.jsxs)("div",{className:"field-top",children:[(0,je.jsxs)("span",{className:"field-name",children:[s.name,s.tag&&(0,je.jsxs)(je.Fragment,{children:[" ",(0,je.jsx)("span",{className:s.tag.cls,children:s.tag.text})]})]}),(0,je.jsx)("span",{className:"field-sym",children:s.sym})]}),(0,je.jsxs)("div",{className:"field-bottom",children:[(0,je.jsx)("input",{className:d.join(" "),id:s.id,type:"number",value:p,step:s.step,readOnly:s.readonly,onChange:s.readonly?void 0:g=>i(s.id,g.target.value)}),(0,je.jsx)("span",{className:"field-uom",children:s.uom})]})]},s.id)})})}var Sd={cenpeep:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, Design conditions, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, Design conditions, \u2026) use the same value \u2014 whatever's currently in the Input Parameters tab \u2014 across every process.",noDate:"No date-based input fields \u2014 every process is using the same manual/Design inputs."},asme:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, \u2026) use the same value \u2014 whatever's currently in the Input Parameters tab \u2014 across every process.",noDate:"No date-based input fields \u2014 every process is using the same manual inputs."},bee:{inputsNote:"Averaged separately for each process's own date range shown above. Everything not listed here (manual-only inputs, anything the dated log doesn't carry) uses whatever's currently in the Input Parameters tab for all processes.",comparisonNote:"Fields not present in the uploaded log (manual-only inputs, \u2026) use the same value \u2014 whatever's currently in the Input Parameters tab \u2014 across every process.",noDate:"No date-based input fields \u2014 every process is using the same manual inputs."}};var j=V(K(),1),$e=({cls:e,label:t,children:n,sub:a,style:l})=>(0,j.jsxs)("div",{className:"kpi-card "+e,style:l,children:[(0,j.jsx)("div",{className:"kpi-label",children:t}),n,a!==void 0&&(0,j.jsx)("div",{className:"kpi-sub",children:a})]});var re=({name:e,sym:t,val:n,uom:a})=>(0,j.jsxs)("div",{className:"output-row",children:[(0,j.jsx)("span",{className:"out-name",children:e}),(0,j.jsx)("span",{className:"out-sym",children:t}),(0,j.jsx)("span",{className:"out-val",children:z(n)}),(0,j.jsx)("span",{className:"out-uom",children:a})]}),Kn=({a:e="Parameter",b:t="Symbol",c:n="Value",d:a="UoM"})=>(0,j.jsxs)("div",{className:"output-row header-row",children:[(0,j.jsx)("span",{children:e}),(0,j.jsx)("span",{style:{textAlign:"right"},children:t}),(0,j.jsx)("span",{style:{textAlign:"right"},children:n}),(0,j.jsx)("span",{style:{textAlign:"right"},children:a})]}),ho=({open:e,onClick:t,children:n})=>(0,j.jsxs)("div",{className:"output-section-head collapsible-head"+(e?" open":""),onClick:t,children:[(0,j.jsx)("span",{children:n}),(0,j.jsx)("span",{className:"collapse-chevron",children:e?"\u25BE":"\u25B8"})]});function oi({p1:e,p2:t,eff1:n,eff2:a,suffix:l=""}){let i=a-n;return(0,j.jsxs)("div",{className:"kpi-card "+(i>=0?"kpi-green":"kpi-red"),children:[(0,j.jsx)("div",{className:"kpi-label",children:"Delta Difference"}),(0,j.jsxs)("div",{className:"kpi-value",children:[O1(i),(0,j.jsx)("span",{className:"kpi-unit",children:"%"})]}),(0,j.jsxs)("div",{className:"kpi-sub",children:[t.title," \u2212 ",e.title," (Boiler Eff.",l,")"]})]})}function ri({list:e,perProcessIds:t,labels:n,open:a,onToggle:l,page:i,thBadge:o,flag:r}){let s=Sd[i];return(0,j.jsxs)("div",{className:"output-section",children:[(0,j.jsx)(ho,{open:a,onClick:l,children:"Process Inputs"}),a&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{className:"cmp-table-wrap",children:(0,j.jsxs)("table",{className:"cmp-table",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{children:"From the dated log \u2014 varies per process"}),e.map((d,p)=>(0,j.jsxs)("th",{children:[d.title,o&&o(d),(0,j.jsxs)("div",{className:"cmp-th-date",children:[ot(d.start)," \u2192 ",ot(d.end)]})]},p))]})}),(0,j.jsx)("tbody",{children:t.length?t.map(d=>(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{className:"cmp-metric",children:n[d]||d}),e.map((p,g)=>{let c=p.result.inputs.find(m=>m.id===d);return(0,j.jsxs)("td",{children:[nl(c?c.value:0,3),r&&r(p,d)]},g)})]},d)):(0,j.jsx)("tr",{children:(0,j.jsx)("td",{colSpan:e.length+1,children:s.noDate})})})]})}),(0,j.jsx)("div",{className:"cmp-note",children:s.inputsNote})]})]})}function si({list:e,rows:t,open:n,onToggle:a,page:l,thBadge:i}){return(0,j.jsxs)("div",{className:"output-section",children:[(0,j.jsx)(ho,{open:n,onClick:a,children:"Process Comparison"}),n&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{className:"cmp-table-wrap",children:(0,j.jsxs)("table",{className:"cmp-table",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{}),e.map((o,r)=>(0,j.jsxs)("th",{children:[o.title,i&&i(o)]},r))]})}),(0,j.jsx)("tbody",{children:t.map(([o,r])=>(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{className:"cmp-metric",children:o}),e.map((s,d)=>(0,j.jsx)("td",{children:r(s)},d))]},o))})]})}),(0,j.jsx)("div",{className:"cmp-note",children:Sd[l].comparisonNote})]})]})}var ll=({children:e})=>(0,j.jsxs)(j.Fragment,{children:[" ",(0,j.jsx)("span",{className:"cmp-badge",children:e})]});function w1(e){let t=La(e,"O2in"),n=La(e,"O2out"),a=La(e,"Md"),l=La(e,"Ad"),i=La(e,"VMd"),o=La(e,"FCd"),r=La(e,"Sd"),s=o/(1-1.1*l/100-a/100),d=100-s,p=s+.9*(d-14),g=d*(7.35/(d+10)-.013),c=2.1-.012*d,m=(i+o)/(d+s),C=p*m,N=g*m,B=c*m,f=a,u=l,b=100-C-r-N-f-B-u;return{CO2in:(19.3-t).toFixed(2),CO2out:(19.3-n).toFixed(2),Cd:z(C),Hd:z(N),Nd:z(B),Od:z(b),Md2:z(f),Ad2:z(u)}}var fs=["L","Ffw","Fin","Cba","Cfa","Pfa","Pba","M","A","VM","FC","GCV","S","O2in","CO2in","COin","O2out","CO2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa","Tref","Md","Ad","VMd","FCd","Cd","Sd","Hd","Md2","Nd","Od","Ad2","GCVd","Trad","Mwvd"],Cd={L:"Unit Load (MW)",Ffw:"Steam Flow (T/hr)",Fin:"Total Coal Flow (T/hr)",Cba:"Unburnt C Bottom Ash (%)",Cfa:"Unburnt C Fly Ash (%)",Pfa:"% Fly Ash",Pba:"% Bottom Ash",M:"Moisture (%)",A:"Ash (%)",VM:"Volatile Matter (%)",FC:"Fixed Carbon (%)",GCV:"GCV (kcal/kg)",S:"Sulfur (%)",O2in:"O2 APH In (%)",CO2in:"CO2 APH In (%)",COin:"CO APH In (ppm)",O2out:"O2 APH Out (%)",CO2out:"CO2 APH Out (%)",COout:"CO APH Out (ppm)",Tgi:"FG Temp APH In (\xB0C)",Tgo:"FG Temp APH Out (\xB0C)",Tpai:"PA Temp In (\xB0C)",Tpao:"PA Temp Out (\xB0C)",Tsai:"SA Temp In (\xB0C)",Tsao:"SA Temp Out (\xB0C)",Fsa:"SA Flow (TPH)",Fpa:"PA Flow (TPH)",Tref:"Ambient Temp (\xB0C)",Md:"Moisture Design (%)",Ad:"Ash Design (%)",VMd:"VM Design (%)",FCd:"FC Design (%)",Cd:"Carbon Design (%)",Sd:"Sulfur Design (%)",Hd:"Hydrogen Design (%)",Md2:"Moisture Design Ultimate (%)",Nd:"Nitrogen Design (%)",Od:"Oxygen Design (%)",Ad2:"Ash Design Ultimate (%)",GCVd:"GCV Design (kcal/kg)",Trad:"Ref Air Temp Design (\xB0C)",Mwvd:"Moisture in Air Design (kg/kg)"},za=(e,t)=>{let n=parseFloat(e[t]);return isNaN(n)?0:n};function ph(e){let t={...e},n=za(t,"O2in"),a=za(t,"O2out");t.CO2in=19.3-n,t.CO2out=19.3-a;let l=za(t,"Md"),i=za(t,"Ad"),o=za(t,"VMd"),r=za(t,"FCd"),s=za(t,"Sd"),d=r/(1-1.1*i/100-l/100),p=100-d,g=d+.9*(p-14),c=p*(7.35/(p+10)-.013),m=2.1-.012*p,C=(o+r)/(p+d);return t.Cd=g*C,t.Hd=c*C,t.Nd=m*C,t.Md2=l,t.Ad2=i,t.Od=100-t.Cd-s-t.Hd-t.Md2-t.Nd-t.Ad2,t}function Da(e){let t=ph(e),n=rl=>za(t,rl),a=n("M"),l=n("A"),i=n("VM"),o=n("FC"),r=n("GCV"),s=n("S")||.3,d=n("O2in"),p=n("O2out"),g=n("COout"),c=n("COin"),m=n("Tgi"),C=n("Tgo"),N=n("Tpai"),B=n("Tpao"),f=n("Tsai"),u=n("Tsao"),b=n("Fsa"),v=n("Fpa"),w=n("Cba"),H=n("Cfa"),E=n("Pfa")||80,O=n("Pba")||20,D=n("Lrad")||1.09,_=n("Trad")||35,P=30.6,we=8077.8,ge=.0166,ie=g/1e6*100,me=.97*o+.7*(i+.1*l)-a*(.6-.01*a),Be=.036*o+.086*(i-.1*l)-.0035*a*a*(1-.02*a),Me=2.1-.02*i,ve=100-a-l-me-Be-s-Me,ye=f,mt=19.3-d,L=18.5-p,q=100-(p+L+ie),ee=E/100*H+O/100*w,Q=l/100*ee/(100-ee),y=(p-d)/(21-p)*.9*100,U=y*.24*(C-ye)/(100*.13286)+C,Z=(_*(m-U)+m*(U-ye))/(m-ye),F=Z-_,He=(11.6*me+34.8*(Be-ve/8)+4.35*s)/100,tt=(1+p/(21-p)*100/100)*He,En=(me/100*44/12+Me/100+tt*77/100+(tt-He)*23/100)*.24*F/r*100,Ba=9*(Be/100)*(584+.45*F)/r*100,ol=a/100*(584+.45*F)/r*100,Wn=tt*.01765*.45*F/r*100,pt=L+ie>0?ie*me/100/(ie+L)*5744/r*100:0,ln=(l*O/100*w/(100*(100-w))+l*E/100*H/(100*(100-H)))*8084*100/r,As=100-(En+Ba+ol+Wn+pt+D+ln),ci=(2.66*(me-Q*100)+7.937*Be+.996*s-ve)/23.2,Eo=1+(p-ie/2)/(.2682*q-(p-ie)),Es=ci*Eo*ge,To=(me+s/2.67-100*Q)/(12*L),di=To*P*(C-ye),fi=1.88*(C-25)+2442+4.2*(25-ye),h=U,R=n("Cd"),G=n("Sd"),Y=n("Hd"),Ee=n("Od"),_e=n("Ad2"),Ce=n("GCVd"),fe=n("Mwvd"),bt=n("Md2"),Pn=2415,qt=(mt-L)*.9*100/L,Ot=(_*(m-C)+m*(C-ye))/(m-ye),on=(R+G/2.67-100*Q)/(12*L)*P*(Ot-_)*100/(Ce*4.186),Ts=Math.exp(.225*R/Y)-Math.exp(.225*me/Be),og=n("VMd")<17?.013*(_e*r/(l*Ce))*Ts:0,Xd=ln*(_e*r/(l*Ce))+og,Zd=1.88*(Ot-25)+2442+4.2*(25-_),Jd=Zd*bt/(Ce*4.186),Kd=9*Y*Zd/(Ce*4.186),Id=ie*7*Pn*(R-100*Q)/3/(L+ie)/Ce,rg=(2.66*(R-Q*100)+7.937*Y+.996*G-Ee)/23.2,sg=1+(p-ie/2)/(.2682*q-(p-ie)),$d=rg*sg*fe*1.88*(Ot-_)*100/(Ce*4.186),ug=100-(on+Xd+Jd+Kd+Id+$d+D);return{CO2in:mt,CO2out:L,COoutp:ie,Trai:ye,Cash:ee,U:Q,N2out:q,Sa:ci,Ea:Eo,Ma:Es,Wd:To,Sh:di,Sw:fi,Ldg:En,Luc:ln,Lmf:ol,Lhf:Ba,Lco:pt,Lma:Wn,Lrad:D,BoilerEff:As,AL:y,Tgnl:h,Tgc:Z,ALd:qt,Tgcd:Ot,Ldgc:on,Lucc:Xd,Lmfc:Jd,Lhfc:Kd,Lcoc:Id,Lmac:$d,BoilerEffCorr:ug,inputs:fs.map(rl=>({id:rl,label:Cd[rl]||rl,value:t[rl]}))}}var Ad=[{target:"grid-general",icon:"GD",title:"General Data",sub:"7 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis \u2014 As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters \u2014 APH",sub:"15 parameters"},{target:"grid-design-prox",icon:"DP",title:"Design Conditions \u2014 Proximate",sub:"4 parameters"},{target:"grid-design-ult",icon:"DU",title:"Design Conditions \u2014 Ultimate Analysis",sub:"10 parameters"}],ms={"grid-general":[{id:"L",name:"Unit Load",sym:"L",uom:"MW",kind:"",value:"210",readonly:!1},{id:"Ffw",name:"Steam Flow",sym:"Ffw",uom:"T/hr",kind:"",value:"615",readonly:!1},{id:"Fin",name:"Total Coal Flow",sym:"Fin",uom:"T/hr",kind:"",value:"140",readonly:!1},{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2in",name:"Avg. Flue Gas O\u2082 \u2014 APH In",sym:"O2in",uom:"%",kind:"",value:"3.5",readonly:!1},{id:"CO2in",name:"Avg. Flue Gas CO\u2082 \u2014 APH In",sym:"CO2in",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COin",name:"Avg. Flue Gas CO \u2014 APH In",sym:"COin",uom:"ppm",kind:"field-manual",value:"39",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"O2out",name:"Avg. Flue Gas O\u2082 \u2014 APH Out",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1},{id:"CO2out",name:"Avg. Flue Gas CO\u2082 \u2014 APH Out",sym:"CO2out",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"COout",name:"Avg. Flue Gas CO \u2014 APH Out",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1},{id:"Tgi",name:"Avg. Flue Gas Temp \u2014 APH In",sym:"Tgi",uom:"\xB0C",kind:"",value:"350",readonly:!1},{id:"Tgo",name:"Avg. Flue Gas Temp \u2014 APH Out",sym:"Tgo",uom:"\xB0C",kind:"",value:"135",readonly:!1},{id:"Tpai",name:"Primary Air to APH Temp In",sym:"Tpai",uom:"\xB0C",kind:"",value:"40",readonly:!1},{id:"Tpao",name:"Primary Air from APH Temp Out",sym:"Tpao",uom:"\xB0C",kind:"",value:"325",readonly:!1},{id:"Tsai",name:"Secondary Air to APH Temp In",sym:"Tsai",uom:"\xB0C",kind:"",value:"34",readonly:!1},{id:"Tsao",name:"Secondary Air from APH Temp Out",sym:"Tsao",uom:"\xB0C",kind:"",value:"325",readonly:!1},{id:"Fsa",name:"Total Secondary Air Flow",sym:"Fsa",uom:"TPH",kind:"",value:"450",readonly:!1},{id:"Fpa",name:"Total Primary Air Flow",sym:"Fpa",uom:"TPH",kind:"",value:"250",readonly:!1},{id:"Tref",name:"Design Ambient / Ref Air Temp",sym:"Tref",uom:"\xB0C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-prox":[{id:"Md",name:"Moisture \u2014 Design",sym:"Md",uom:"%",kind:"field-manual",value:"13",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Ad",name:"Ash \u2014 Design",sym:"Ad",uom:"%",kind:"field-manual",value:"40",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"VMd",name:"Volatile Matter \u2014 Design",sym:"VMd",uom:"%",kind:"field-manual",value:"24",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"FCd",name:"Fixed Carbon \u2014 Design",sym:"FCd",uom:"%",kind:"field-manual",value:"23",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-design-ult":[{id:"Cd",name:"Carbon \u2014 Design",sym:"Cd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Sd",name:"Sulfur \u2014 Design",sym:"Sd",uom:"%",kind:"field-manual",value:"0.3",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Hd",name:"Hydrogen \u2014 Design",sym:"Hd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Md2",name:"Moisture \u2014 Design (Ultimate)",sym:"Md2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Nd",name:"Nitrogen \u2014 Design",sym:"Nd",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Od",name:"Oxygen \u2014 Design",sym:"Od",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"Ad2",name:"Ash \u2014 Design (Ultimate)",sym:"Ad2",uom:"%",kind:"field-formula",value:null,readonly:!0,tag:{cls:"formula-tag",text:"AUTO"},formula:!0},{id:"GCVd",name:"GCV \u2014 Design",sym:"GCVd",uom:"kcal/kg",kind:"field-manual",value:"3300",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Trad",name:"Ref. Air Temp \u2014 Design",sym:"Trad",uom:"\xB0C",kind:"field-manual",value:"38",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Mwvd",name:"Moisture in Air \u2014 Design",sym:"Mwvd",uom:"kg/kg",kind:"field-manual",value:"0.013",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]};var x=V(K(),1),bh=Ad.slice(0,3),gh=Ad.slice(3),z1=["grid-general","grid-proximate","grid-plant"],D1=["grid-design-prox","grid-design-ult"],Td=[...z1,...D1].flatMap(e=>ms[e]),vh=Object.fromEntries(Td.map(e=>[e.id,e.value??""])),yh=new Set(Td.filter(e=>!e.readonly).map(e=>e.id)),M1=["M","A","VM","FC","GCV"],hh={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},Ed=[["Date Range",e=>`${ot(e.start)} \u2192 ${ot(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>z(e.result.BoilerEff)],["Boiler Efficiency Corrected (%)",e=>z(e.result.BoilerEffCorr)],["Dry Gas Loss (%)",e=>z(e.result.Ldg)],["Unburnt Carbon Loss (%)",e=>z(e.result.Luc)],["Moisture Fuel Loss (%)",e=>z(e.result.Lmf)],["Hydrogen Fuel Loss (%)",e=>z(e.result.Lhf)],["CO Loss (%)",e=>nl(e.result.Lco)],["Moisture Air Loss (%)",e=>z(e.result.Lma)],["Radiation & Unaccounted Loss (%)",e=>z(e.result.Lrad)],["CO\u2082 \u2014 APH In (%)",e=>z(e.result.CO2in)],["CO\u2082 \u2014 APH Out (%)",e=>z(e.result.CO2out)]],L1=e=>e.start||e.end||null;function xh(){let e=xn();(0,qe.useEffect)(()=>{document.title="Boiler Efficiency Calculator \u2014 CENPEEP"},[]);let[t,n]=(0,qe.useState)("input"),[a,l]=(0,qe.useState)(vh),[i,o]=(0,qe.useState)(new Set),[r,s]=(0,qe.useState)(new Set),[d,p]=(0,qe.useState)({}),[g,c]=(0,qe.useState)(null),[m,C]=(0,qe.useState)(null),[N,B]=(0,qe.useState)(null),f=ii(),[u,b]=(0,qe.useState)(null),[v,w]=(0,qe.useState)(null),[H,E]=(0,qe.useState)(!1),[O,D]=(0,qe.useState)(null),[_,P]=(0,qe.useState)(null),[we,ge]=(0,qe.useState)(!1),[ie,me]=(0,qe.useState)(!1),[Be,Me]=(0,qe.useState)({processInputsOpen:!1,processComparisonOpen:!1}),ve=(0,qe.useMemo)(()=>w1(a),[a]),ye=(h,R)=>l(G=>({...G,[h]:R})),mt=h=>p(R=>({...R,[h]:!R[h]})),L=(h=O)=>{let R={...a,...ve},G={};return fs.forEach(Y=>{G[Y]=R[Y]!==void 0?R[Y]:0}),G.Lrad=h!==null?parseFloat(h)||0:1.2,G},q=(h,R)=>ai(m,h,R),ee=async h=>{c({cls:"loading",text:"\u23F3 Parsing all sheets\u2026"});let R=new FormData;R.append("file",h);try{let Y=await(await it("/api/upload",{method:"POST",body:R})).json();if(!Y.ok)throw new Error(Y.error||"Upload failed");Cn(Y,"CENPEEP");let Ee=Y.extracted||{},_e={...a},Ce=new Set,fe=0;for(let[qt,Ot]of Object.entries(Ee))yh.has(qt)&&(_e[qt]=String(typeof Ot=="number"?parseFloat(Ot.toFixed(6)):Ot),Ce.add(qt),fe++);let bt=Y.missingFields||[],Pn=new Set;for(let qt of bt){let Ot=qt.id||qt;Td.some(mi=>mi.id===Ot)&&Pn.add(Ot)}l(_e),o(Ce),s(Pn),B(Y.filename),C(Y),f.setProcesses([]),w(null),E(!1),c({cls:"success",node:ni({data:Y,populated:fe,fieldDetail:Y.fieldDetail||{},missingFieldsList:bt,strategyLabel:cs,derivedLabel:"\u21B3 defaulted from Secondary Air",bee:!1})}),e(`Excel imported \u2014 ${fe} fields auto-populated from "${Y.primarySheet||""}"`,"success")}catch(G){c({cls:"error",text:`\u2717 ${G.message}`}),e(G.message,"error")}},Q=()=>{let h=f.processes.filter(Y=>Y.start||Y.end);if(P(null),ge(!1),me(!1),!h.length){E(!1);let Y=Da(L());b(Y),D(String(Y.Lrad||1.09)),w(null),n("output");return}let R=L(),G=h.map(Y=>{let{avg:Ee,rowCount:_e}=q(Y.start,Y.end),Ce=Da({...R,...Ee});return{title:Y.title||"Process",start:Y.start,end:Y.end,rowCount:_e,result:Ce}});w(G),E(!0),b(G[0].result),D(null),n("output")},y=h=>{if(D(h),!u)return;let R=parseFloat(h)||0,G=u;b({...G,Lrad:R,BoilerEff:100-(G.Ldg+G.Luc+G.Lmf+G.Lhf+G.Lco+G.Lma+R)})},U=()=>{if(!u){e("Calculate first.","error");return}let h=Da(L());b(h),D(String(h.Lrad||1.09)),me(!0),e("APH correction recalculated using the current Design Conditions parameters.","success")},Z=()=>{_&&(w(h=>h.map((R,G)=>G===_.targetIdx?{...R,result:R._originalResult,_originalResult:void 0,gcvCorrected:!1}:R)),P(null),e("GCV correction removed.","success"))},F=()=>{let h=v;if(!H||!h||h.length!==2){e("GCV correction needs exactly two active processes.","error");return}if(_){Z();return}let[R,G]=h,Y=L1(R),Ee=L1(G);if(!Y||!Ee){e("Both processes need at least one date set to apply GCV correction.","error");return}if(Y===Ee){e("Both processes resolve to the same date \u2014 cannot tell which is later.","error");return}let _e=Ee>Y?1:0,Ce=Ee>Y?0:1,fe=h[_e],bt=h[Ce],Pn=L(),{avg:qt}=q(bt.start,bt.end),{avg:Ot}=q(fe.start,fe.end),mi={...Pn,...Ot};M1.forEach(on=>{mi[on]=qt[on]!==void 0?qt[on]:Pn[on]});let Qd=h.map((on,Ts)=>Ts===_e?{...on,_originalResult:on.result,result:Da(mi),gcvCorrected:!0}:{...on,result:Da({...Pn,...qt})});w(Qd),P({targetIdx:_e,sourceIdx:Ce,targetTitle:fe.title,sourceTitle:bt.title}),e(`GCV correction applied \u2014 "${fe.title}" now uses "${bt.title}"'s Proximate As-Fired data.`,"success")},He=()=>{if(!H||!v||v.length!==2){e("APH correction needs exactly two active processes.","error");return}let h=!we;ge(h),e(h?"APH correction applied \u2014 Boiler Efficiency now shows the APH-corrected value for both processes.":"APH correction removed.","success")},Qe=()=>{l(h=>{let R={...h};return Object.entries(hh).forEach(([G,Y])=>{G in R&&(R[G]=String(Y))}),R}),B(null),C(null),f.setProcesses([]),E(!1),P(null),ge(!1),me(!1),Me({processInputsOpen:!1,processComparisonOpen:!1}),c(null)},tt=async(h,R)=>{let G={sessionName:R,sourceFile:N||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:h.inputs,results:{BoilerEff:h.BoilerEff,BoilerEffCorr:h.BoilerEffCorr,Ldg:h.Ldg,Luc:h.Luc,Lmf:h.Lmf,Lhf:h.Lhf,Lco:h.Lco,Lma:h.Lma,Lrad:h.Lrad,CO2in:h.CO2in,CO2out:h.CO2out,Trai:h.Trai,AL:h.AL,Tgc:h.Tgc,Ldgc:h.Ldgc,Lucc:h.Lucc,Lmfc:h.Lmfc,Lhfc:h.Lhfc,Lcoc:h.Lcoc,Lmac:h.Lmac}},Ee=await(await it("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(G)})).json();if(!Ee.ok)throw new Error(Ee.error)},an=async()=>{if(H&&v&&v.length){if(!window.confirm(`Save all ${v.length} process result(s) to the database?`))return;try{for(let R of v)await tt(R.result,`${N||"Manual Entry"} \u2014 ${R.title}`);e("\u2713 All process results saved to MongoDB!","success")}catch(R){e("Save failed: "+R.message,"error")}return}if(!u){e("Calculate first before saving.","error");return}let h=window.prompt("Session name (optional):",N||"");if(h!==null)try{await tt(u,h.trim()),e("\u2713 Session saved to MongoDB!","success")}catch(R){e("Save failed: "+R.message,"error")}},En=()=>new Date().toISOString().slice(0,19).replace("T"," "),Ba=()=>{let h=v,R=En(),G=`CENPEEP Boiler Efficiency \u2014 Process Comparison
Generated:,${R}

`;G+="Metric,"+h.map(Y=>`"${Y.title}"`).join(",")+`
`,Ed.forEach(([Y,Ee])=>{G+=`"${Y}",`+h.map(_e=>`"${Ee(_e)}"`).join(",")+`
`}),Xn(new Blob([G],{type:"text/csv"}),`cenpeep_comparison_${R.replace(/[: ]/g,"_")}.csv`)},ol=()=>{if(H&&v&&v.length){Ba();return}if(!u){e("Calculate first.","error");return}let h=u,R=En(),G=`CENPEEP Boiler Efficiency Report
Generated:,${R}

INPUTS
Parameter,Value
`;h.inputs.forEach(Y=>{G+=`"${Y.label}",${Y.value}
`}),G+=`
OUTPUTS
Parameter,Symbol,Value,UoM
`,[["CO\u2082 APH In","CO2in",h.CO2in,"%"],["CO\u2082 APH Out","CO2out",h.CO2out,"%"],["Weighted Air Temp In","Trai",h.Trai,"\xB0C"],["Dry Gas Loss","Ldg",h.Ldg,"%"],["Unburnt Carbon Loss","Luc",h.Luc,"%"],["Moisture Fuel Loss","Lmf",h.Lmf,"%"],["Hydrogen Fuel Loss","Lhf",h.Lhf,"%"],["CO Loss","Lco",h.Lco,"%"],["Moisture Air Loss","Lma",h.Lma,"%"],["Radiation Loss","Lrad",h.Lrad,"%"],["Boiler Efficiency","eta",h.BoilerEff,"%"],["Boiler Efficiency Corrected","eta_corr",h.BoilerEffCorr,"%"]].forEach(([Y,Ee,_e,Ce])=>{G+=`"${Y}","${Ee}",${typeof _e=="number"?_e.toFixed(4):""},,"${Ce}"
`}),Xn(new Blob([G],{type:"text/csv"}),`cenpeep_report_${R.replace(/[: ]/g,"_")}.csv`)},Wn="body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}.meta{color:#666;font-size:11px;margin-bottom:16px}",pt=()=>{let h=v,R=new Date().toLocaleString(),G=window.open("","_blank");G.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Comparison Report</title>
  <style>${Wn}</style></head><body>
  <h1>CENPEEP Boiler Efficiency \u2014 Process Comparison</h1><p class="meta">Generated: ${R}</p>
  <table><tr><th>Metric</th>${h.map(Y=>`<th>${Y.title}</th>`).join("")}</tr>
  ${Ed.map(([Y,Ee])=>`<tr><td>${Y}</td>${h.map(_e=>`<td>${Ee(_e)}</td>`).join("")}</tr>`).join("")}
  </table><script>window.print();<\/script></body></html>`),G.document.close()},ln=()=>{if(H&&v&&v.length){pt();return}if(!u){e("Calculate first.","error");return}let h=u,R=new Date().toLocaleString(),G=window.open("","_blank");G.document.write(`<!DOCTYPE html><html><head><title>CENPEEP Report</title>
  <style>${Wn}h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}.hl{background:#e6fff5!important;font-weight:bold}</style></head><body>
  <h1>CENPEEP Boiler Efficiency Report</h1><p class="meta">Generated: ${R}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${h.inputs.map(Y=>`<tr><td>${Y.label}</td><td>${Y.value}</td></tr>`).join("")}</table>
  <h2>Losses</h2><table><tr><th>Parameter</th><th>Symbol</th><th>Value</th><th>UoM</th></tr>
  <tr><td>CO\u2082 APH In</td><td>CO\u2082in</td><td>${z(h.CO2in)}</td><td>%</td></tr>
  <tr><td>CO\u2082 APH Out</td><td>CO\u2082out</td><td>${z(h.CO2out)}</td><td>%</td></tr>
  <tr><td>Dry Gas Loss</td><td>Ldg</td><td>${z(h.Ldg)}</td><td>%</td></tr>
  <tr><td>Unburnt Carbon Loss</td><td>Luc</td><td>${z(h.Luc)}</td><td>%</td></tr>
  <tr><td>Moisture Fuel Loss</td><td>Lmf</td><td>${z(h.Lmf)}</td><td>%</td></tr>
  <tr><td>Hydrogen Fuel Loss</td><td>Lhf</td><td>${z(h.Lhf)}</td><td>%</td></tr>
  <tr><td>CO Loss</td><td>Lco</td><td>${nl(h.Lco)}</td><td>%</td></tr>
  <tr><td>Moisture Air Loss</td><td>Lma</td><td>${z(h.Lma)}</td><td>%</td></tr>
  <tr><td>Radiation Loss</td><td>Lrad</td><td>${z(h.Lrad)}</td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>\u03B7</td><td><b>${z(h.BoilerEff)}</b></td><td>%</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency Corrected</b></td><td>\u03B7_corr</td><td><b>${z(h.BoilerEffCorr)}</b></td><td>%</td></tr>
  </table><script>window.print();<\/script></body></html>`),G.document.close()},As=async()=>{let h=m;if(!h||!h.fieldDetail||!Object.keys(h.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}let R={filename:h.filename,primarySheet:h.primarySheet,fieldDetail:h.fieldDetail,extracted:h.extracted,missingFields:h.missingFields};H&&v&&v.length&&(R.processes=v.map(G=>{let{avg:Y,rowCount:Ee}=q(G.start,G.end);return{title:G.title,start:G.start,end:G.end,rowCount:Ee,avg:Y}}));try{let G=await it("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)});if(!G.ok){let Ce=await G.json().catch(()=>({}));throw new Error(Ce.error||`Report generation failed (${G.status})`)}let Y=await G.blob(),_e=(G.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);Xn(Y,_e?_e[1]:"CENPEEP_Field_Report.docx"),e("\u2713 Field report downloaded","success")}catch(G){e("Report failed: "+G.message,"error")}},ci=h=>Me(R=>({...R,[h]:!R[h]})),Eo=h=>(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"kpi-card kpi-green",children:[(0,x.jsx)("div",{className:"kpi-label",children:"Boiler Efficiency"}),(0,x.jsxs)("div",{className:"kpi-value boiler-eff-val",children:[z(h.BoilerEff),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]}),(0,x.jsx)("div",{className:"kpi-sub",children:"Indirect method \u2014 as-tested"})]}),(0,x.jsxs)("div",{className:"kpi-card kpi-blue",children:[(0,x.jsx)("div",{className:"kpi-label",children:"Boiler Efficiency Corrected"}),(0,x.jsxs)("div",{className:"kpi-value boiler-eff-corr-val",children:[z(h.BoilerEffCorr),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]}),(0,x.jsx)("div",{className:"kpi-sub",children:"Corrected to design conditions"}),ie&&(0,x.jsx)("div",{className:"kpi-note",children:"Please check the input parameters if you feel any issue in the corrected efficiency figure."})]}),(0,x.jsx)($e,{cls:"kpi-red",label:"Dry Gas Loss",children:(0,x.jsxs)("div",{className:"kpi-value",children:[z(h.Ldg),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,x.jsx)($e,{cls:"kpi-amber",label:"Loss \u2014 Unburnt Carbon",children:(0,x.jsxs)("div",{className:"kpi-value",children:[z(h.Luc),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,x.jsx)($e,{cls:"kpi-blue",label:"Loss \u2014 Moisture in Fuel",children:(0,x.jsxs)("div",{className:"kpi-value",children:[z(h.Lmf),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,x.jsx)($e,{cls:"kpi-green",label:"Loss \u2014 Hydrogen in Fuel",children:(0,x.jsxs)("div",{className:"kpi-value",children:[z(h.Lhf),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,x.jsx)($e,{cls:"kpi-amber",label:"Loss \u2014 Carbon Monoxide",children:(0,x.jsxs)("div",{className:"kpi-value",children:[nl(h.Lco),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,x.jsx)($e,{cls:"kpi-blue",label:"Loss \u2014 Moisture in Air",children:(0,x.jsxs)("div",{className:"kpi-value",children:[z(h.Lma),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,x.jsxs)("div",{className:"kpi-card kpi-red",style:{gridColumn:"span 2"},children:[(0,x.jsx)("div",{className:"kpi-label",children:"Radiation & Unaccounted Loss"}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[(0,x.jsx)("input",{type:"number",id:"Lrad",value:O??"",onChange:R=>y(R.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),(0,x.jsx)("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),(0,x.jsxs)("button",{type:"button",className:"kpi-card kpi-action"+(ie?" applied":""),onClick:U,children:[(0,x.jsxs)("div",{className:"kpi-label",children:["APH Correction",ie&&(0,x.jsx)(ll,{children:"Applied"})]}),(0,x.jsx)("div",{className:"kpi-value kpi-action-value",children:ie?"Recalculate Again":"Apply APH Correction"}),(0,x.jsx)("div",{className:"kpi-sub",children:"Uses the Design Conditions (APH Correction) tab"})]})]}),Es=h=>(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"output-section",children:[(0,x.jsx)("div",{className:"output-section-head",children:(0,x.jsx)("span",{children:"Corrected Losses"})}),(0,x.jsx)(Kn,{}),(0,x.jsx)(re,{name:"Dry Gas Loss (Corrected)",sym:"Ldgc",val:h.Ldgc,uom:"%"}),(0,x.jsx)(re,{name:"Unburnt Carbon Loss (Corrected)",sym:"Lucc",val:h.Lucc,uom:"%"}),(0,x.jsx)(re,{name:"Moisture Fuel Loss (Corrected)",sym:"Lmfc",val:h.Lmfc,uom:"%"}),(0,x.jsx)(re,{name:"Hydrogen Fuel Loss (Corrected)",sym:"Lhfc",val:h.Lhfc,uom:"%"}),(0,x.jsx)(re,{name:"CO Loss (Corrected)",sym:"Lcoc",val:h.Lcoc,uom:"%"}),(0,x.jsx)(re,{name:"Moisture Air Loss (Corrected)",sym:"Lmac",val:h.Lmac,uom:"%"}),(0,x.jsxs)("div",{className:"output-row highlight-row2",children:[(0,x.jsx)("span",{className:"out-name",children:"Boiler Efficiency \u2014 Corrected"}),(0,x.jsxs)("span",{className:"out-sym",children:["\u03B7",(0,x.jsx)("sub",{children:"corr"})]}),(0,x.jsx)("span",{className:"out-val",children:z(h.BoilerEffCorr)}),(0,x.jsx)("span",{className:"out-uom",children:"%"})]})]}),(0,x.jsxs)("div",{className:"output-section",children:[(0,x.jsx)("div",{className:"output-section-head",children:(0,x.jsx)("span",{children:"Intermediate Values"})}),(0,x.jsx)(Kn,{}),(0,x.jsx)(re,{name:"CO\u2082 \u2014 APH In",sym:"CO\u2082in",val:h.CO2in,uom:"%"}),(0,x.jsx)(re,{name:"CO\u2082 \u2014 APH Out",sym:"CO\u2082out",val:h.CO2out,uom:"%"}),(0,x.jsx)(re,{name:"Weighted Air Temp In",sym:"Trai",val:h.Trai,uom:"\xB0C"}),(0,x.jsx)(re,{name:"AH Leakage",sym:"AL",val:h.AL,uom:"%"}),(0,x.jsx)(re,{name:"Gas Temp \u2014 Corrected",sym:"Tgc",val:h.Tgc,uom:"\xB0C"}),(0,x.jsx)(re,{name:"Stoichiometric Air",sym:"Sa",val:h.Sa,uom:"kg/kg"}),(0,x.jsx)(re,{name:"Excess Air",sym:"Ea",val:h.Ea,uom:"\u2014"})]})]}),To=h=>{let R=we,G=fe=>R?fe.result.BoilerEffCorr:fe.result.BoilerEff,Y=fe=>fe.gcvCorrected?(0,x.jsx)(ll,{children:"GCV corrected"}):null,Ee=new Set;h.forEach(fe=>Object.keys(q(fe.start,fe.end).avg).forEach(bt=>Ee.add(bt)));let _e=fs.filter(fe=>Ee.has(fe)),Ce=_;return{kpis:(0,x.jsxs)(x.Fragment,{children:[h.map((fe,bt)=>(0,x.jsxs)("div",{className:"kpi-card kpi-green",children:[(0,x.jsxs)("div",{className:"kpi-label",children:[fe.title,fe.gcvCorrected&&(0,x.jsx)(ll,{children:"GCV corrected"}),R&&(0,x.jsx)(ll,{children:"APH corrected"})]}),(0,x.jsxs)("div",{className:"kpi-value",children:[z(G(fe)),(0,x.jsx)("span",{className:"kpi-unit",children:"%"})]}),(0,x.jsxs)("div",{className:"kpi-sub",children:[ot(fe.start)," \u2192 ",ot(fe.end)," \xB7 ",fe.rowCount," row",fe.rowCount===1?"":"s"]})]},bt)),h.length===2&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(oi,{p1:h[0],p2:h[1],eff1:G(h[0]),eff2:G(h[1]),suffix:R?" APH corr.":""}),(0,x.jsxs)("button",{type:"button",className:"kpi-card kpi-action"+(Ce?" applied":""),onClick:F,children:[(0,x.jsxs)("div",{className:"kpi-label",children:["GCV Correction",Ce&&(0,x.jsx)(ll,{children:"Applied"})]}),(0,x.jsx)("div",{className:"kpi-value kpi-action-value",children:Ce?"Click to undo":"Apply GCV Correction"})]}),(0,x.jsxs)("button",{type:"button",className:"kpi-card kpi-action"+(R?" applied":""),onClick:He,children:[(0,x.jsxs)("div",{className:"kpi-label",children:["APH Correction",R&&(0,x.jsx)(ll,{children:"Applied"})]}),(0,x.jsx)("div",{className:"kpi-value kpi-action-value",children:R?"Click to undo":"Apply APH Correction"}),(0,x.jsx)("div",{className:"kpi-sub"})]})]})]}),tables:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ri,{list:h,perProcessIds:_e,labels:Cd,page:"cenpeep",open:Be.processInputsOpen,onToggle:()=>H&&ci("processInputsOpen"),thBadge:Y,flag:(fe,bt)=>Ce&&h.indexOf(fe)===Ce.targetIdx&&M1.includes(bt)?(0,x.jsxs)(x.Fragment,{children:[" ",(0,x.jsx)("small",{style:{color:"var(--accent2)"},title:`From "${Ce.sourceTitle}"`,children:"\u21BA"})]}):null}),(0,x.jsx)(si,{list:h,rows:Ed,page:"cenpeep",open:Be.processComparisonOpen,onToggle:()=>H&&ci("processComparisonOpen"),thBadge:Y})]})}},di=null,fi=null;if(v){let h=To(v);di=h.kpis,fi=h.tables}else u&&O!==null&&(di=Eo(u),fi=Es(u));return(0,x.jsxs)("div",{className:"container",children:[(0,x.jsx)(nn,{}),(0,x.jsxs)("div",{className:"section-header",style:{marginTop:0},children:[(0,x.jsx)("div",{className:"section-label",children:"CENPEEP Formula"}),(0,x.jsx)("div",{className:"section-line"})]}),(0,x.jsxs)("div",{className:"tab-nav",children:[(0,x.jsxs)("button",{className:"tab-btn"+(t==="input"?" active":""),onClick:()=>n("input"),children:[(0,x.jsx)("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),(0,x.jsxs)("button",{className:"tab-btn"+(t==="output"?" active":""),onClick:()=>n("output"),children:[(0,x.jsx)("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),(0,x.jsxs)("div",{className:"page"+(t==="input"?" active":""),id:"page-input",children:[(0,x.jsx)(cn,{description:"Upload your CENPEEP standard sheet \u2014 all input fields will be auto-populated.",onFile:ee,status:g}),(0,x.jsx)(al,{uploadData:m,processes:f.processes,onAdd:f.add,onRemove:f.remove,onTitle:f.setTitle,onDate:f.setDate}),(0,x.jsxs)("div",{className:"action-bar",children:[(0,x.jsxs)("button",{className:"btn btn-primary",onClick:Q,children:[(0,x.jsx)(Oa,{}),"Calculate Efficiency"]}),(0,x.jsxs)("button",{className:"btn btn-ghost",onClick:Qe,children:[(0,x.jsx)(wa,{}),"Reset to Defaults"]})]}),(0,x.jsx)(Zn,{cards:bh,open:d,onToggle:mt}),z1.map(h=>(0,x.jsx)(Jn,{id:h,fields:ms[h],open:!!d[h],values:a,derived:ve,onChange:ye,detected:i,missing:r},h))]}),(0,x.jsxs)("div",{className:"page"+(t==="output"?" active":""),id:"page-output",children:[(0,x.jsx)("div",{className:"output-summary",id:"kpi-area",children:di}),(0,x.jsxs)("div",{className:"design-conditions-block",children:[(0,x.jsxs)("div",{className:"section-header",children:[(0,x.jsx)("div",{className:"section-label",children:"Design Conditions \u2014 for APH Correction"}),(0,x.jsx)("div",{className:"section-line"})]}),(0,x.jsx)(Zn,{cards:gh,open:d,onToggle:mt}),D1.map(h=>(0,x.jsx)(Jn,{id:h,fields:ms[h],open:!!d[h],values:a,derived:ve,onChange:ye,detected:i,missing:r},h))]}),(0,x.jsx)("div",{id:"output-tables",children:fi}),(0,x.jsxs)("div",{className:"download-bar",children:[(0,x.jsxs)("button",{className:"btn btn-primary",onClick:an,children:[(0,x.jsx)(ss,{}),"Save to Database"]}),(0,x.jsxs)("button",{className:"btn btn-secondary",onClick:ol,children:[(0,x.jsx)(ei,{}),"Download CSV"]}),(0,x.jsxs)("button",{className:"btn btn-secondary",onClick:ln,children:[(0,x.jsx)(ei,{}),"Download PDF"]}),(0,x.jsxs)("button",{className:"btn btn-secondary",onClick:As,children:[(0,x.jsx)(ti,{}),"Field Report (.docx)"]}),(0,x.jsx)("button",{className:"btn btn-ghost",onClick:()=>n("input"),children:"\u2190 Back to Inputs"})]})]})]})}function Nd(){return(0,x.jsx)(Vt,{active:"/calculator",children:(0,x.jsx)(xh,{})})}var dn=V(Xe(),1);var se=(e,t)=>t===0||!isFinite(t)?0:e/t,ps=[{id:"bs203",row:4,item:203},{id:"bs206",row:7,item:206},{id:"bs211",row:14,item:211},{id:"bs215",row:18,item:215},{id:"bs216",row:19,item:216},{id:"bs217",row:21,item:217},{id:"bs220",row:24,item:220},{id:"bs221",row:26,item:221},{id:"bs224",row:29,item:224},{id:"bs225",row:31,item:225},{id:"bs228",row:34,item:228},{id:"bs246",row:58,item:246},{id:"bs247",row:60,item:247},{id:"bs250",row:63,item:250},{id:"bs251",row:65,item:251},{id:"bs254",row:68,item:254},{id:"bs255",row:70,item:255},{id:"bs258",row:73,item:258},{id:"bs259",row:75,item:259},{id:"bs262",row:78,item:262},{id:"bs271",row:93,item:271},{id:"bs272",row:94,item:272},{id:"bs273",row:95,item:273},{id:"bs274",row:96,item:274},{id:"bs275",row:97,item:275},{id:"bs276",row:98,item:276},{id:"bs278",row:102,item:278},{id:"bs279",row:103,item:279},{id:"bs280",row:105,item:280},{id:"bs291",row:119,item:291},{id:"bs295",row:124,item:295},{id:"bs301",row:131,item:301},{id:"bs323",row:162,item:323},{id:"bs325",row:165,item:325},{id:"bs326",row:166,item:326},{id:"bs328",row:169,item:328},{id:"bs329",row:170,item:329},{id:"bs332",row:176,item:332},{id:"bs333",row:177,item:333},{id:"bs334",row:178,item:334},{id:"bs335",row:179,item:335},{id:"bs336",row:180,item:336},{id:"bs343",row:186,item:343},{id:"bs344",row:188,item:344},{id:"bs345",row:189,item:345},{id:"bs349",row:194,item:349},{id:"bs350",row:195,item:350},{id:"bs352",row:198,item:352},{id:"bs357",row:204,item:357},{id:"bs360",row:207,item:360},{id:"bs362",row:211,item:362},{id:"bs363",row:212,item:363},{id:"bs390",row:248,item:390},{id:"bs391",row:249,item:391},{id:"bs392",row:250,item:392},{id:"bs393",row:251,item:393},{id:"bs397",row:257,item:397},{id:"bs398",row:258,item:398},{id:"bs399",row:259,item:399},{id:"bs427",row:304,item:427},{id:"bs450",row:333,item:450},{id:"bs451",row:334,item:451},{id:"bs453",row:336,item:453},{id:"bs454",row:337,item:454},{id:"bs460",row:345,item:460},{id:"bs461",row:346,item:461},{id:"bs463",row:348,item:463},{id:"bs464",row:349,item:464},{id:"bs466",row:352,item:466},{id:"bs467",row:353,item:467},{id:"bs469",row:355,item:469},{id:"bs470",row:356,item:470},{id:"bs472",row:359,item:472},{id:"bs473",row:360,item:473},{id:"bs475",row:364,item:475},{id:"bs476",row:365,item:476},{id:"bs477",row:367,item:477},{id:"bs478",row:368,item:478},{id:"bs479",row:370,item:479},{id:"bs480",row:371,item:480},{id:"bs519",row:417,item:519},{id:"bs601",row:426,item:601},{id:"bs701",row:467,item:701},{id:"bs702",row:468,item:702},{id:"bs704",row:470,item:704},{id:"bs705",row:471,item:705},{id:"bs708",row:475,item:708},{id:"bs807",row:486,item:807},{id:"bs907",row:517,item:907},{id:"bs909",row:521,item:909},{id:"bs910",row:523,item:910}],kd=ps.map(e=>e.id),S4=Object.fromEntries(ps.map(e=>[e.id,e.row])),C4=Object.fromEntries(ps.map(e=>[e.row,e.id])),bs={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3};function gs(e){let t={};for(let{id:y,row:U}of ps)t[U]=e[y]||0;t[99]=100-(t[93]+t[94]+t[95]+t[96]+t[97]+t[98]),t[100]=t[93]+t[94]+t[95]+t[96]+t[97]+t[98]+t[99],t[181]=100-(t[176]+t[177]+t[178]+t[179]+t[180]),t[182]=t[176]+t[177]+t[178]+t[179]+t[180]+t[181],t[167]=100-(t[165]+t[166]),t[133]=t[119]-t[124]*(t[130]||0)/t[102],t[400]=t[4]*t[7],t[401]=t[21]*t[24],t[402]=t[19]*t[14],t[403]=t[18]*t[14],t[404]=(t[4]+t[21]-(t[19]+t[18]))*t[58],t[405]=t[404]+t[403]+t[402]-t[401]-t[400],t[406]=t[60]*t[63],t[407]=t[26]*t[29],t[408]=t[65]*t[68],t[409]=t[408]-(t[407]+t[406]),t[410]=t[70]*t[73],t[411]=t[31]*t[34],t[412]=t[75]*t[78],t[413]=t[412]-(t[411]+t[410]),t[414]=t[405]+t[409]+t[413],t[415]=t[194]*t[186]*(t[198]-t[195])+t[207],t[416]=t[414]-t[415],t[419]=t[105]*t[102],t[420]=t[133]*(t[102]+t[162]),t[421]=t[194]*t[188],t[422]=t[212]>0?t[212]*t[250]:t[211]>0?t[211]*t[248]:0,t[424]=t[419]+t[420]+t[421]+t[422],t[428]=t[334],t[429]=t[333]/100,t[430]=t[426]*t[428]*t[429]/100,t[431]=t[430]*100/t[102],t[433]=t[346],t[434]=t[345]/100,t[435]=t[426]*t[433]*t[434]/100,t[436]=t[435]*100/t[102],t[438]=t[353],t[439]=t[352]/100,t[440]=t[426]*t[438]*t[439]/100,t[441]=t[440]*100/t[102],t[443]=t[360],t[444]=t[359]/100,t[445]=t[426]*t[443]*t[444]/100,t[446]=t[445]*100/t[102],t[448]=t[170],t[449]=se(t[169],t[133]),t[450]=t[426]*t[448]*t[449]/100,t[451]=t[450]*100/t[102],t[453]=t[430]+t[435]+t[440]+t[445]+t[450],t[454]=t[431]+t[436]+t[441]+t[446]+t[451],t[456]=t[429]*(100-t[428])/100,t[457]=t[434]*(100-t[433])/100,t[458]=t[439]*(100-t[438])/100,t[459]=t[444]*(100-t[443])/100,t[460]=t[449]*(100-t[448])/100,t[461]=t[94]/100-(t[456]+t[457]+t[458]+t[459]+t[460]),t[463]=t[429]*t[337]*(t[336]-t[258]),t[464]=t[434]*t[349]*(t[348]-t[258])+t[439]*t[356]*(t[355]-t[258]),t[465]=t[463]+t[464],t[469]=t[467]*t[468],t[472]=t[470]*t[471],t[473]=t[469]+t[472],t[476]=t[475]*30.6*(t[304]-t[258]),t[478]=t[93]/100,t[479]=9/100*t[96],t[480]=t[478]+t[479],t[481]=1.88*(t[304]-25)+2442+4.2*(25-t[258]),t[482]=t[480]*t[481],t[484]=t[482]-(t[102]-t[103]),t[487]=t[257],t[488]=t[259],t[489]=t[486]*t[488]*1.88*(t[304]-t[258]);let n=(t[105]>0?t[105]*t[103]:0)+(t[119]>0?(t[119]-t[124]*t[131]/t[103])*(t[103]+t[162]):0)+(t[194]>0?t[194]*t[189]:0)+(t[212]>0?t[212]*t[251]:t[211]>0?t[211]*t[249]:0),a=t[105]>0||t[119]>0||t[194]>0||t[211]>0||t[212]>0;t.item901_gross=se((t[416]-t[417])*100,t[424]),t.item901_net=a?se((t[416]-t[417])*100,n):0;let l=se(t[430]*100,t[102]),i=se(t[430]*100,t[103]),o=se(t[435]*100,t[102]),r=se(t[435]*100,t[103]),s=se(t[440]*100,t[102]),d=se(t[440]*100,t[103]),p=se(t[445]*100,t[102]),g=se(t[445]*100,t[103]),c=se(t[450]*100,t[102]),m=se(t[450]*100,t[103]),C=se(t[465]*100,t[102]),N=se(t[465]*100,t[103]),B=l+o+s+p+c+C,f=i+r+d+g+m+N,u=se(t[473]*100,t[102]),b=se(t[473]*100,t[103]),v=se(t[476]*100,t[102]),w=se(t[476]*100,t[103]),H=se(t[482]*100,t[102]),E=se(t[482]*100,t[103]),O=se(t[484]*100,t[102]),D=se(t[484]*100,t[103]),_=se(se(t[204]*t[481]*100,t[194]),t[188]),P=se(se(t[204]*t[481]*100,t[194]),t[189]),we=u+v+H+O+_,ge=b+w+E+D+P,ie=t[119]>0?(t[119]-t[124]*t[131]/t[103])*(t[103]+t[162]):t[105]*t[103],me=se(((t[365]-t[368])*(100-t[364]+539.1+.5*(t[304]-100))+t[368]*(t[367]-t[364]))*418.7,ie),Be=se(t[371]*(100-t[370]+539.1+.5*(t[304]-100))*418.7,ie),Me=me+Be,ve=t[420]!==0?t[420]:t[419],ye=se(((t[365]-t[368])*(100-t[364]+539.1+.5*(t[304]-100))+t[368]*(t[367]-t[364]))*418.7,ve),mt=se(t[371]*(100-t[370]+539.1+.5*(t[304]-100))*418.7,ve),L=ye+mt,q=se(t[489]*100,t[102]),ee=se(t[489]*100,t[103]),Q=t[517];return t.item902_gross=100-(B+we+L+q+Q+t[521]+t[523]),t.item902_net=100-(f+ge+Me+ee+Q+t[521]+t[523]),t.item908_gross=100-(t.item901_gross+B+we+L+q),t.item908_net=100-(t.item901_net+f+ge+Me+ee),{F:t,methodA:{gross:t.item901_gross,net:t.item901_net},methodB:{gross:t.item902_gross,net:t.item902_net},balanceA:{gross:t.item908_gross,net:t.item908_net},losses:{residue:{total:{gross:B,net:f},a:{label:"Combustible in bottom ash",gross:l,net:i},b:{label:"Combustible in coarse dust",gross:o,net:r},c:{label:"Combustible in fine dust",gross:s,net:d},d:{label:"Combustible in riddlings",gross:p,net:g},e:{label:"Combustible, dryer ash",gross:c,net:m},f:{label:"Sensible heat of solid residue",gross:C,net:N}},flueGas:{total:{gross:we,net:ge},a:{label:"Unburnt gas (CO + hydrocarbons)",gross:u,net:b},b:{label:"Sensible heat in dry flue gas",gross:v,net:w},c:{label:"Moisture in fuel",gross:H,net:E},d:{label:"Sensible heat in water vapour",gross:O,net:D},e:{label:"Heat in atomizing air/steam",gross:_,net:P}},waterHopper:{total:{gross:L,net:Me},a:{label:"Water-filled ash hopper / slag tank",gross:ye,net:me},b:{label:"Ash quenching spray",gross:mt,net:Be}},moistureAir:{label:"Moisture in combustion air",gross:q,net:ee},fuelHeating:{label:"Heating fuel up to air supply temp.",value:Q},radiation:{label:"Radiation & convection (Method B)",value:t[521]},auxPower:{label:"Auxiliary power, heat equivalent (Method B)",value:t[523]}},ultimate:{solidOxygenByDiff:t[99],solidCheckTotal:t[100],oilOxygenNitrogenByDiff:t[181],oilCheckTotal:t[182]}}}var B1=[{target:"grid-water",icon:"WS",title:"Feedwater & Steam",sub:"20 parameters"},{target:"grid-solid",icon:"SF",title:"Solid Fuel \u2014 Ultimate Analysis & Firing",sub:"17 parameters"},{target:"grid-oil",icon:"OF",title:"Oil Fuel \u2014 Analysis & Firing",sub:"13 parameters"},{target:"grid-gas",icon:"GF",title:"Gaseous Fuel \u2014 Firing & CV",sub:"6 parameters"},{target:"grid-air",icon:"AA",title:"Air & Ambient Conditions",sub:"4 parameters"},{target:"grid-residue",icon:"SR",title:"Solid Residue \u2014 Ash, Dust & Riddlings",sub:"14 parameters"},{target:"grid-hopper",icon:"WH",title:"Water-Filled Ash Hopper / Quenching",sub:"6 parameters"},{target:"grid-extras",icon:"HB",title:"Heat Balance & Method B Extras",sub:"11 parameters"}],vs={"grid-water":[{id:"bs203",name:"Feedwater Quantity",sym:"Item 203",uom:"kg/s",kind:"",value:"45",readonly:!1,step:"any"},{id:"bs206",name:"Feedwater Enthalpy",sym:"Item 206",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs211",name:"Drum Water Enthalpy",sym:"Item 211",uom:"kJ/kg",kind:"",value:"1650",readonly:!1,step:"any"},{id:"bs215",name:"Drum Level \u2014 Rate of Increase",sym:"Item 215",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs216",name:"Blow-down Rate",sym:"Item 216",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs217",name:"Main Steam Spray Water Quantity",sym:"Item 217",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs220",name:"Main Steam Spray Water Enthalpy",sym:"Item 220",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs221",name:"Reheater-1 Spray Water Quantity",sym:"Item 221",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs224",name:"Reheater-1 Spray Water Enthalpy",sym:"Item 224",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs225",name:"Reheater-2 Spray Water Quantity",sym:"Item 225",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs228",name:"Reheater-2 Spray Water Enthalpy",sym:"Item 228",uom:"kJ/kg",kind:"",value:"950",readonly:!1,step:"any"},{id:"bs246",name:"Steam Leaving Unit \u2014 Enthalpy",sym:"Item 246",uom:"kJ/kg",kind:"",value:"3400",readonly:!1,step:"any"},{id:"bs247",name:"Reheater-1 Inlet Steam Quantity",sym:"Item 247",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs250",name:"Reheater-1 Inlet Steam Enthalpy",sym:"Item 250",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs251",name:"Reheater-1 Outlet Steam Quantity",sym:"Item 251",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs254",name:"Reheater-1 Outlet Steam Enthalpy",sym:"Item 254",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs255",name:"Reheater-2 Inlet Steam Quantity",sym:"Item 255",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs258",name:"Reheater-2 Inlet Steam Enthalpy",sym:"Item 258",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs259",name:"Reheater-2 Outlet Steam Quantity",sym:"Item 259",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs262",name:"Reheater-2 Outlet Steam Enthalpy",sym:"Item 262",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-solid":[{id:"bs271",name:"Moisture (Ultimate, As Fired)",sym:"Item 271",uom:"%",kind:"",value:"12",readonly:!1,step:"any"},{id:"bs272",name:"Ash (Ultimate, As Fired)",sym:"Item 272",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs273",name:"Carbon (Ultimate, As Fired)",sym:"Item 273",uom:"%",kind:"",value:"38",readonly:!1,step:"any"},{id:"bs274",name:"Hydrogen (Ultimate, As Fired)",sym:"Item 274",uom:"%",kind:"",value:"2.5",readonly:!1,step:"any"},{id:"bs275",name:"Nitrogen (Ultimate, As Fired)",sym:"Item 275",uom:"%",kind:"",value:"1.0",readonly:!1,step:"any"},{id:"bs276",name:"Sulphur (Ultimate, As Fired)",sym:"Item 276",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs278",name:"GCV of Coal \u2014 Gross",sym:"Item 278",uom:"kJ/kg",kind:"",value:"13900",readonly:!1,step:"any"},{id:"bs279",name:"GCV of Coal \u2014 Net",sym:"Item 279",uom:"kJ/kg",kind:"",value:"13300",readonly:!1,step:"any"},{id:"bs280",name:"Mechanical Stoker Firing Rate",sym:"Item 280",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs291",name:"Pulverized Fuel \u2014 Total Weighed",sym:"Item 291",uom:"kg/s",kind:"",value:"9.2",readonly:!1,step:"any"},{id:"bs295",name:"Pulverized Fuel \u2014 Mill Rejects (Total)",sym:"Item 295",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs301",name:"Calorific Value of Mill Rejects \u2014 Gross",sym:"Item 301",uom:"kJ/kg",kind:"",value:"2000",readonly:!1,step:"any"},{id:"bs323",name:"Heat Expended in Drying Fuel",sym:"Item 323",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs325",name:"Dryer Gas Analysis \u2014 CO2",sym:"Item 325",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs326",name:"Dryer Gas Analysis \u2014 CO",sym:"Item 326",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs328",name:"Ashpit Refuse Quantity",sym:"Item 328",uom:"kg/s",kind:"",value:"0.05",readonly:!1,step:"any"},{id:"bs329",name:"Ashpit Refuse \u2014 % Combustible",sym:"Item 329",uom:"%",kind:"",value:"5",readonly:!1,step:"any"}],"grid-oil":[{id:"bs332",name:"Moisture (Oil, Ultimate)",sym:"Item 332",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs333",name:"Ash (Oil, Ultimate)",sym:"Item 333",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs334",name:"Carbon (Oil, Ultimate)",sym:"Item 334",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs335",name:"Hydrogen (Oil, Ultimate)",sym:"Item 335",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs336",name:"Sulphur (Oil, Ultimate)",sym:"Item 336",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs343",name:"Specific Heat of Oil",sym:"Item 343",uom:"kJ/(kg\xB7K)",kind:"",value:"2.1",readonly:!1,step:"any"},{id:"bs344",name:"GCV of Oil \u2014 Gross",sym:"Item 344",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs345",name:"GCV of Oil \u2014 Net",sym:"Item 345",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs349",name:"Oil Firing Rate",sym:"Item 349",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs350",name:"Temperature of Oil as Weighed",sym:"Item 350",uom:"\xB0C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs352",name:"Temperature of Oil Delivered to Burner",sym:"Item 352",uom:"\xB0C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs357",name:"Atomizing Air/Steam Quantity",sym:"Item 357",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs360",name:"Heat Used in Atomizing Oil",sym:"Item 360",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"}],"grid-gas":[{id:"bs362",name:"Gas Firing Rate \u2014 Volume",sym:"Item 362",uom:"m\xB3/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs363",name:"Gas Firing Rate \u2014 Mass",sym:"Item 363",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs390",name:"GCV of Gas \u2014 Gross (Volume basis)",sym:"Item 390",uom:"kJ/m\xB3",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs391",name:"GCV of Gas \u2014 Net (Volume basis)",sym:"Item 391",uom:"kJ/m\xB3",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs392",name:"GCV of Gas \u2014 Gross (Mass basis)",sym:"Item 392",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs393",name:"GCV of Gas \u2014 Net (Mass basis)",sym:"Item 393",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"}],"grid-air":[{id:"bs397",name:"Ambient Air Humidity",sym:"Item 397",uom:"%",kind:"",value:"60",readonly:!1,step:"any"},{id:"bs398",name:"Temperature at Entry to Air Intakes",sym:"Item 398",uom:"\xB0C",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs399",name:"Moisture per Unit Mass of Dry Air",sym:"Item 399",uom:"kg/kg",kind:"",value:"0.018",readonly:!1,step:"any"},{id:"bs427",name:"Flue Gas Exit Temperature (LTAH/Economizer Outlet)",sym:"Item 427",uom:"\xB0C",kind:"",value:"135",readonly:!1,step:"any"}],"grid-residue":[{id:"bs450",name:"Bottom Ash \u2014 Proportion of Fuel (Dry Basis)",sym:"Item 450",uom:"%",kind:"",value:"8",readonly:!1,step:"any"},{id:"bs451",name:"Bottom Ash \u2014 Combustible Content",sym:"Item 451",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs453",name:"Bottom Ash \u2014 Temperature as Discharged",sym:"Item 453",uom:"\xB0C",kind:"",value:"200",readonly:!1,step:"any"},{id:"bs454",name:"Bottom Ash \u2014 Specific Heat",sym:"Item 454",uom:"kJ/(kg\xB7K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs460",name:"Coarse Dust \u2014 Proportion of Fuel (Dry Basis)",sym:"Item 460",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs461",name:"Coarse Dust \u2014 Combustible Content",sym:"Item 461",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs463",name:"Coarse Dust \u2014 Temperature as Discharged",sym:"Item 463",uom:"\xB0C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs464",name:"Coarse Dust \u2014 Specific Heat",sym:"Item 464",uom:"kJ/(kg\xB7K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs466",name:"Fine Dust (Fly Ash) \u2014 Proportion of Fuel (Dry Basis)",sym:"Item 466",uom:"%",kind:"",value:"30",readonly:!1,step:"any"},{id:"bs467",name:"Fine Dust (Fly Ash) \u2014 Combustible Content",sym:"Item 467",uom:"%",kind:"",value:"0.4",readonly:!1,step:"any"},{id:"bs469",name:"Fine Dust (Fly Ash) \u2014 Temperature as Discharged",sym:"Item 469",uom:"\xB0C",kind:"",value:"135",readonly:!1,step:"any"},{id:"bs470",name:"Fine Dust (Fly Ash) \u2014 Specific Heat",sym:"Item 470",uom:"kJ/(kg\xB7K)",kind:"",value:"0.84",readonly:!1,step:"any"},{id:"bs472",name:"Riddlings \u2014 Proportion of Fuel (Dry Basis)",sym:"Item 472",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs473",name:"Riddlings \u2014 Combustible Content",sym:"Item 473",uom:"%",kind:"",value:"0",readonly:!1,step:"any"}],"grid-hopper":[{id:"bs475",name:"Hopper Water Inlet Temperature",sym:"Item 475",uom:"\xB0C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs476",name:"Hopper Water Inlet Quantity",sym:"Item 476",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs477",name:"Hopper Water Outlet Temperature",sym:"Item 477",uom:"\xB0C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs478",name:"Hopper Water Outlet Quantity",sym:"Item 478",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs479",name:"Quenching Spray Water Temperature",sym:"Item 479",uom:"\xB0C",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs480",name:"Quenching Spray Water Quantity",sym:"Item 480",uom:"kg/s",kind:"",value:"0",readonly:!1,step:"any"}],"grid-extras":[{id:"bs519",name:"Heat Added from Separate External Air Source",sym:"Item 519",uom:"kW",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs601",name:"Calorific Value of Carbon",sym:"Item 601",uom:"kJ/kg",kind:"",value:"33820",readonly:!1,step:"any"},{id:"bs701",name:"CO in Flue Gases per Unit Mass of Fuel",sym:"Item 701",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs702",name:"Calorific Value of CO",sym:"Item 702",uom:"kJ/kg",kind:"",value:"10120",readonly:!1,step:"any"},{id:"bs704",name:"Hydrocarbons in Flue Gases per Unit Mass of Fuel",sym:"Item 704",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs705",name:"Calorific Value of Hydrocarbons",sym:"Item 705",uom:"kJ/kg",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs708",name:"Dry Flue Gases per Unit Mass of Fuel",sym:"Item 708",uom:"kg mol/kg",kind:"",value:"0.35",readonly:!1,step:"any"},{id:"bs807",name:"Combustion Air per Unit Mass of Fuel",sym:"Item 807",uom:"kg/kg",kind:"",value:"10.2",readonly:!1,step:"any"},{id:"bs907",name:"Loss in Heating Fuel up to Air Supply Temp",sym:"Item 907",uom:"%",kind:"",value:"0",readonly:!1,step:"any"},{id:"bs909",name:"Radiation & Convection Loss (Method B)",sym:"Item 909",uom:"%",kind:"",value:"1.2",readonly:!1,step:"any"},{id:"bs910",name:"Heat Equivalent of Auxiliary Power (Method B)",sym:"Item 910",uom:"%",kind:"",value:"0.3",readonly:!1,step:"any"}]};var k=V(K(),1),U1=Object.keys(vs),H1=U1.flatMap(e=>vs[e]),Sh=Object.fromEntries(H1.map(e=>[e.id,e.value??""])),_1=new Set(H1.map(e=>e.id)),wd=(e,t,n)=>(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:e}),(0,k.jsxs)("td",{children:[jt(t)," %"]}),(0,k.jsxs)("td",{children:[jt(n)," %"]})]},e);function Od({title:e,group:t}){return(0,k.jsxs)("div",{className:"output-table-wrap",children:[(0,k.jsxs)("h3",{children:[e," \u2014 Total: ",jt(t.total.gross)," % (gross) / ",jt(t.total.net)," % (net)"]}),(0,k.jsxs)("table",{className:"output-table",children:[(0,k.jsx)("thead",{children:(0,k.jsxs)("tr",{children:[(0,k.jsx)("th",{children:"Loss"}),(0,k.jsx)("th",{children:"Gross CV basis"}),(0,k.jsx)("th",{children:"Net CV basis"})]})}),(0,k.jsx)("tbody",{children:Object.keys(t).filter(n=>n!=="total").map(n=>wd(t[n].label,t[n].gross,t[n].net))})]})]})}var ys=({label:e,value:t,cls:n})=>(0,k.jsxs)("div",{className:"kpi-card "+n,children:[(0,k.jsx)("div",{className:"kpi-label",children:e}),(0,k.jsxs)("div",{className:"kpi-value",children:[jt(t),(0,k.jsx)("span",{className:"kpi-unit",children:"%"})]})]});function Ch(){let e=xn();(0,dn.useEffect)(()=>{document.title="Boiler Efficiency Calculator \u2014 BS-2885"},[]);let[t,n]=(0,dn.useState)("input"),[a,l]=(0,dn.useState)(Sh),[i,o]=(0,dn.useState)(new Set),[r,s]=(0,dn.useState)(new Set),[d,p]=(0,dn.useState)({}),[g,c]=(0,dn.useState)(null),[m,C]=(0,dn.useState)(null),[N,B]=(0,dn.useState)(null),f=(O,D)=>l(_=>({..._,[O]:D})),u=O=>p(D=>({...D,[O]:!D[O]})),b=async O=>{c({cls:"loading",text:"\u23F3 Reading BS-2885 sheet\u2026"});let D=new FormData;D.append("file",O);try{let P=await(await it("/api/upload",{method:"POST",body:D})).json();if(!P.ok)throw new Error(P.error||"Upload failed");Cn(P,"BS-2885");let we=P.extractedBS2885||{},ge={...a},ie=new Set,me=0;for(let[Me,ve]of Object.entries(we))_1.has(Me)&&(ge[Me]=String(typeof ve=="number"?parseFloat(ve.toFixed(6)):ve),ie.add(Me),me++);let Be=new Set;for(let Me of P.missingFieldsBS2885||[]){let ve=Me.id||Me;_1.has(ve)&&Be.add(ve)}l(ge),o(ie),s(Be),C(P),c({cls:"success",text:`\u2713 ${me} of ${kd.length} fields detected from "${P.filename}"`}),e(`Detected ${me} field${me===1?"":"s"} from the uploaded sheet.`,"success")}catch(_){c({cls:"error",text:`\u2717 ${_.message}`}),e(_.message||"Upload failed","error")}},v=()=>{l(O=>{let D={...O};for(let[_,P]of Object.entries(bs))_ in D&&(D[_]=String(P));return D}),o(O=>{let D=new Set(O);return Object.keys(bs).forEach(_=>D.delete(_)),D}),s(O=>{let D=new Set(O);return Object.keys(bs).forEach(_=>D.delete(_)),D}),e("Inputs reset to defaults.","success")},w=()=>{let O={};for(let D of kd)O[D]=parseFloat(a[D])||0;B(gs(O)),n("output"),e("BS-2885 efficiency calculated.","success")},H=async()=>{let O=m;if(!O||!O.fieldDetailBS2885||!Object.keys(O.fieldDetailBS2885).length){e("Upload and parse a file first to generate a field report.","error");return}let D={filename:O.filename,primarySheet:O.sheetNameBS2885,fieldDetail:O.fieldDetailBS2885,extracted:O.extractedBS2885,missingFields:O.missingFieldsBS2885,reportTitle:"BS-2885 Field Detection Report",filenamePrefix:"BS2885_Field_Report",standardLabel:"BS-2885"};try{let _=await it("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(D)});if(!_.ok){let ie=await _.json().catch(()=>({}));throw new Error(ie.error||`Report generation failed (${_.status})`)}let P=await _.blob(),ge=(_.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);Xn(P,ge?ge[1]:"BS2885_Field_Report.docx"),e("\u2713 Field report downloaded","success")}catch(_){e("Report failed: "+_.message,"error")}},E=N;return(0,k.jsxs)("div",{className:"container",children:[(0,k.jsx)(nn,{}),(0,k.jsxs)("div",{className:"section-header",style:{marginTop:0},children:[(0,k.jsx)("div",{className:"section-label",children:"BS-2885 (1974)"}),(0,k.jsx)("div",{className:"section-line"})]}),(0,k.jsxs)("div",{className:"tab-nav",children:[(0,k.jsxs)("button",{className:"tab-btn"+(t==="input"?" active":""),onClick:()=>n("input"),children:[(0,k.jsx)("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),(0,k.jsxs)("button",{className:"tab-btn"+(t==="output"?" active":""),onClick:()=>n("output"),children:[(0,k.jsx)("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),(0,k.jsxs)("div",{className:"page"+(t==="input"?" active":""),id:"page-input",children:[(0,k.jsx)(cn,{description:'Upload a filled-in BS-2885 (1974) test sheet \u2014 matching "Sl. No." rows are auto-populated from the Value column.',onFile:b,status:g}),(0,k.jsxs)("div",{className:"action-bar",children:[(0,k.jsxs)("button",{className:"btn btn-primary",onClick:w,children:[(0,k.jsx)(Oa,{}),"Calculate Efficiency"]}),(0,k.jsxs)("button",{className:"btn btn-ghost",onClick:v,children:[(0,k.jsx)(wa,{}),"Reset to Defaults"]})]}),(0,k.jsx)(Zn,{cards:B1,open:d,onToggle:u}),U1.map(O=>(0,k.jsx)(Jn,{id:O,fields:vs[O],open:!!d[O],values:a,onChange:f,detected:i,missing:r},O))]}),(0,k.jsxs)("div",{className:"page"+(t==="output"?" active":""),id:"page-output",children:[(0,k.jsx)("div",{className:"output-summary",id:"kpi-area",children:E&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(ys,{label:"Thermal Efficiency \u2014 Method A (Gross CV)",value:E.methodA.gross,cls:"kpi-green"}),(0,k.jsx)(ys,{label:"Thermal Efficiency \u2014 Method A (Net CV)",value:E.methodA.net,cls:"kpi-green"}),(0,k.jsx)(ys,{label:"Thermal Efficiency \u2014 Method B (Gross CV)",value:E.methodB.gross,cls:"kpi-blue"}),(0,k.jsx)(ys,{label:"Thermal Efficiency \u2014 Method B (Net CV)",value:E.methodB.net,cls:"kpi-blue"})]})}),(0,k.jsx)("div",{id:"output-tables",children:E&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)("div",{className:"output-table-wrap",children:[(0,k.jsx)("h3",{children:"Method A \u2014 Balance of Account (radiation & unmeasured losses)"}),(0,k.jsxs)("table",{className:"output-table",children:[(0,k.jsx)("thead",{children:(0,k.jsxs)("tr",{children:[(0,k.jsx)("th",{}),(0,k.jsx)("th",{children:"Gross CV basis"}),(0,k.jsx)("th",{children:"Net CV basis"})]})}),(0,k.jsx)("tbody",{children:wd("Item 908 \u2014 Unaccounted balance",E.balanceA.gross,E.balanceA.net)})]})]}),(0,k.jsx)(Od,{title:"Item 903 \u2014 Losses due to Residue",group:E.losses.residue}),(0,k.jsx)(Od,{title:"Item 904 \u2014 Losses due to Flue Gases",group:E.losses.flueGas}),(0,k.jsx)(Od,{title:"Item 905 \u2014 Losses, Water-Filled Ash Hopper / Quenching",group:E.losses.waterHopper}),(0,k.jsxs)("div",{className:"output-table-wrap",children:[(0,k.jsx)("h3",{children:"Other Method B Losses"}),(0,k.jsxs)("table",{className:"output-table",children:[(0,k.jsx)("thead",{children:(0,k.jsxs)("tr",{children:[(0,k.jsx)("th",{children:"Loss"}),(0,k.jsx)("th",{children:"Gross CV basis"}),(0,k.jsx)("th",{children:"Net CV basis"})]})}),(0,k.jsxs)("tbody",{children:[wd(E.losses.moistureAir.label,E.losses.moistureAir.gross,E.losses.moistureAir.net),(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:E.losses.fuelHeating.label}),(0,k.jsxs)("td",{colSpan:"2",children:[jt(E.losses.fuelHeating.value)," %"]})]}),(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:E.losses.radiation.label}),(0,k.jsxs)("td",{colSpan:"2",children:[jt(E.losses.radiation.value)," %"]})]}),(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:E.losses.auxPower.label}),(0,k.jsxs)("td",{colSpan:"2",children:[jt(E.losses.auxPower.value)," %"]})]})]})]})]}),(0,k.jsxs)("div",{className:"output-table-wrap",children:[(0,k.jsx)("h3",{children:"Ultimate Analysis \u2014 Check Totals"}),(0,k.jsxs)("table",{className:"output-table",children:[(0,k.jsx)("thead",{children:(0,k.jsxs)("tr",{children:[(0,k.jsx)("th",{}),(0,k.jsx)("th",{children:"Oxygen (by diff.)"}),(0,k.jsx)("th",{children:"Sum (should read 100%)"})]})}),(0,k.jsxs)("tbody",{children:[(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:"Solid fuel"}),(0,k.jsxs)("td",{children:[jt(E.ultimate.solidOxygenByDiff)," %"]}),(0,k.jsxs)("td",{children:[jt(E.ultimate.solidCheckTotal)," %"]})]}),(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:"Oil fuel (O\u2082 + N\u2082 by diff.)"}),(0,k.jsxs)("td",{children:[jt(E.ultimate.oilOxygenNitrogenByDiff)," %"]}),(0,k.jsxs)("td",{children:[jt(E.ultimate.oilCheckTotal)," %"]})]})]})]})]})]})}),(0,k.jsxs)("div",{className:"download-bar",children:[(0,k.jsxs)("button",{className:"btn btn-secondary",onClick:H,children:[(0,k.jsx)(ti,{}),"Field Report (.docx)"]}),(0,k.jsx)("button",{className:"btn btn-ghost",onClick:()=>n("input"),children:"\u2190 Back to Inputs"})]})]})]})}function Md(){return(0,k.jsx)(Vt,{active:"/bs-2885",extraStyle:"bs2885",children:(0,k.jsx)(Ch,{})})}var ht=V(Xe(),1);var hs=["M","A","VM","FC","GCV","S","Cba","Cfa","Pfa","Pba","O2out","COout","Tgo","Tref"],Ld={M:"Moisture \u2014 Item 37",A:"Ash \u2014 Item 40",VM:"Volatile Matter \u2014 Item 38",FC:"Fixed Carbon \u2014 Item 39",GCV:"HHV, as fired \u2014 Item 41",S:"Sulfur \u2014 Item 47",Cba:"Unburnt Carbon \u2014 Bottom Ash",Cfa:"Unburnt Carbon \u2014 Fly Ash",Pfa:"% Fly Ash in Total Ash",Pba:"% Bottom Ash in Total Ash",O2out:"O\u2082, dry \u2014 Item 33",COout:"CO, dry \u2014 Item 34",Tgo:"Flue-Gas Temp Leaving Boiler \u2014 Item 13",Tref:"Reference Air Temp \u2014 Items 10/11"},An=(e,t)=>{let n=parseFloat(e[t]);return isNaN(n)?0:n};function Ah(e){let t={...e},n=An(t,"M"),a=An(t,"A"),l=An(t,"VM"),i=An(t,"FC"),o=An(t,"S");t.Ca=.97*i+.7*(l+.1*a)-n*(.6-.01*n),t.H=.036*i+.086*(l-.1*a)-.0035*n*n*(1-.02*n),t.N=2.1-.02*l,t.O=100-n-a-t.Ca-o-t.H-t.N;let r=An(t,"Pfa")||80,s=An(t,"Pba")||20;return t.Cash=r/100*An(t,"Cfa")+s/100*An(t,"Cba"),t}function xo(e){let t=Ah(e),n=ye=>An(t,ye),a=n("GCV"),l=n("S"),i=n("O2out"),o=n("COout"),r=n("Tgo"),s=n("Tref"),d=n("A"),p=n("M"),g=n("Ca"),c=n("H"),m=n("Cash"),C=t.Lrad===void 0||isNaN(t.Lrad)?1:t.Lrad,N=t.Lunm===void 0||isNaN(t.Lunm)?.5:t.Lunm,B=o/1e6*100,f=19.3-i,u=100-f-i-B,b=.2682*u-(i-B/2)!==0?100*(i-B/2)/(.2682*u-(i-B/2)):0,v=100-m!==0?d/(100-m):0,w=d/100*(m/(100-m||1)),H=g-100*w,E=3*(f+B),O=E!==0?(11*f+8*i+7*(u+B))/E*(H/100+l/267):0,D=r-s,_=8077.8,P=O*.24*D/a*100,we=p/100*(584+.45*D)/a*100,ge=9*(c/100)*(584+.45*D)/a*100,ie=100-m!==0?d/(100-m)*(m/100*_)/a*100:0,me=C,Be=N,Me=P+we+ge+ie+me+Be,ve=100-Me;return{CO2:f,N2:u,COoutp:B,ExcessAir:b,Ca:g,H:c,N:n("N"),O:n("O"),Cash:m,DryRefuse:v,U:w,CarbonBurned:H,MassDFG:O,dT:D,L65:P,L66:we,L67:ge,L68:ie,L69:me,L70:Be,TotalLosses:Me,BoilerEff:ve,Lrad:C,Lunm:N,inputs:hs.map(ye=>({id:ye,label:Ld[ye]||ye,value:t[ye]}))}}var R1=[{target:"grid-general",icon:"GD",title:"General Data",sub:"4 parameters"},{target:"grid-proximate",icon:"PA",title:"Proximate Analysis \u2014 As Fired",sub:"6 parameters"},{target:"grid-plant",icon:"PP",title:"Plant Parameters \u2014 Flue Gas & Temps",sub:"4 parameters"}],zd={"grid-general":[{id:"Cba",name:"Unburnt Carbon in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"1.2",readonly:!1},{id:"Cfa",name:"Unburnt Carbon in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"0.4",readonly:!1},{id:"Pfa",name:"% of Fly Ash in Total Ash",sym:"Pfa",uom:"%",kind:"field-manual",value:"80",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"Pba",name:"% of Bottom Ash in Total Ash",sym:"Pba",uom:"%",kind:"field-manual",value:"20",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-proximate":[{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"12.2",readonly:!1},{id:"A",name:"Ash",sym:"A",uom:"%",kind:"",value:"40",readonly:!1},{id:"VM",name:"Volatile Matter",sym:"VM",uom:"%",kind:"",value:"22.9",readonly:!1},{id:"FC",name:"Fixed Carbon",sym:"FC",uom:"%",kind:"",value:"24.9",readonly:!1},{id:"GCV",name:"Gross Calorific Value (GCV)",sym:"GCV",uom:"kcal/kg",kind:"",value:"3320",readonly:!1},{id:"S",name:"Sulfur",sym:"S",uom:"%",kind:"field-manual",value:"0.6",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-plant":[{id:"O2out",name:"Avg. Flue Gas O\u2082, dry",sym:"O2out",uom:"%",kind:"",value:"5",readonly:!1,tag:{cls:"formula-tag",text:"Item 33"}},{id:"COout",name:"Avg. Flue Gas CO, dry",sym:"COout",uom:"ppm",kind:"",value:"50",readonly:!1,tag:{cls:"formula-tag",text:"Item 34"}},{id:"Tgo",name:"Flue Gas Temp Leaving Boiler",sym:"Tgo",uom:"\xB0C",kind:"",value:"135",readonly:!1,tag:{cls:"formula-tag",text:"Item 13"}},{id:"Tref",name:"Reference Air Temp",sym:"Tref",uom:"\xB0C",kind:"field-manual",value:"30",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]};var S=V(K(),1),F1=["grid-general","grid-proximate","grid-plant"],Dd=F1.flatMap(e=>zd[e]),Eh=Object.fromEntries(Dd.map(e=>[e.id,e.value??""])),Th=new Set(Dd.filter(e=>!e.readonly).map(e=>e.id)),G1=["Cba","Cfa","M","A","VM","FC","GCV","O2out","COout","Tgo"],Nh={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},V1={lossesOpen:!0,intermediateOpen:!0,processInputsOpen:!1,processComparisonOpen:!1},kh=[["Date Range",e=>`${ot(e.start)} \u2192 ${ot(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>z(e.result.BoilerEff)],["Dry Flue Gas Loss (%) \u2014 65",e=>z(e.result.L65)],["Moisture in Fuel (%) \u2014 66",e=>z(e.result.L66)],["H\u2082 Combustion (%) \u2014 67",e=>z(e.result.L67)],["Combustibles in Refuse (%) \u2014 68",e=>z(e.result.L68)],["Radiation (%) \u2014 69",e=>z(e.result.L69)],["Unmeasured Losses (%) \u2014 70",e=>z(e.result.L70)],["Total Losses (%) \u2014 71",e=>z(e.result.TotalLosses)]],Y1={background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"20px",color:"var(--text-bright)",width:"90px",outline:"none"},j1={display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},q1={fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"};function Oh(){let e=xn();(0,ht.useEffect)(()=>{document.title="Boiler Efficiency Calculator \u2014 ASME-PTC 4.1"},[]);let[t,n]=(0,ht.useState)("input"),[a,l]=(0,ht.useState)(Eh),[i,o]=(0,ht.useState)(new Set),[r,s]=(0,ht.useState)(new Set),[d,p]=(0,ht.useState)({}),[g,c]=(0,ht.useState)(null),[m,C]=(0,ht.useState)(null),N=ii(),[B,f]=(0,ht.useState)(null),[u,b]=(0,ht.useState)(null),[v,w]=(0,ht.useState)(null),[H,E]=(0,ht.useState)(null),[O,D]=(0,ht.useState)(V1),_=(L,q)=>l(ee=>({...ee,[L]:q})),P=L=>p(q=>({...q,[L]:!q[L]})),we=(L,q)=>ai(m,L,q),ge=()=>{let L={};return hs.forEach(q=>{L[q]=a[q]!==void 0?a[q]:0}),L.Lrad=v!==null?parseFloat(v)||0:void 0,L.Lunm=H!==null?parseFloat(H)||0:void 0,L},ie=async L=>{c({cls:"loading",text:"\u23F3 Parsing all sheets\u2026"});let q=new FormData;q.append("file",L);try{let Q=await(await it("/api/upload",{method:"POST",body:q})).json();if(!Q.ok)throw new Error(Q.error||"Upload failed");Cn(Q,"ASME PTC 4.1");let y={...a},U=new Set,Z=0;for(let[Qe,tt]of Object.entries(Q.extracted||{}))Th.has(Qe)&&(y[Qe]=String(typeof tt=="number"?parseFloat(tt.toFixed(6)):tt),U.add(Qe),Z++);let F=Q.missingFields||[],He=new Set;for(let Qe of F){let tt=Qe.id||Qe;Dd.some(an=>an.id===tt)&&He.add(tt)}l(y),o(U),s(He),C(Q),N.setProcesses([]),b(null),c({cls:"success",node:ni({data:Q,populated:Z,fieldDetail:Q.fieldDetail||{},missingFieldsList:F,strategyLabel:cs,derivedLabel:"\u21B3 defaulted from Secondary Air",bee:!1})}),e(`Excel imported \u2014 ${Z} fields auto-populated from "${Q.primarySheet||""}"`,"success")}catch(ee){c({cls:"error",text:`\u2717 ${ee.message}`}),e(ee.message,"error")}},me=()=>{let L=N.processes.filter(Q=>Q.start||Q.end);if(!L.length){let Q=xo(ge());b(null),f(Q),w(String(Q.Lrad)),E(String(Q.Lunm)),n("output");return}let q=ge(),ee=L.map(Q=>{let{avg:y,rowCount:U}=we(Q.start,Q.end);return{title:Q.title||"Process",start:Q.start,end:Q.end,rowCount:U,result:xo({...q,...y})}});b(ee),f(ee[0].result),w(null),E(null),n("output")},Be=(L,q)=>{let ee=L==="Lrad"?q:v,Q=L==="Lunm"?q:H;if(L==="Lrad"?w(q):E(q),!B)return;let y={...B};y.Lrad=parseFloat(ee)||0,y.Lunm=parseFloat(Q)||0,y.L69=y.Lrad,y.L70=y.Lunm,y.TotalLosses=y.L65+y.L66+y.L67+y.L68+y.L69+y.L70,y.BoilerEff=100-y.TotalLosses,f(y)},Me=()=>{l(L=>{let q={...L};return Object.entries(Nh).forEach(([ee,Q])=>{ee in q&&(q[ee]=String(Q))}),q}),o(L=>{let q=new Set(L);return G1.forEach(ee=>q.delete(ee)),q}),s(L=>{let q=new Set(L);return G1.forEach(ee=>q.delete(ee)),q}),C(null),N.setProcesses([]),b(null),f(null),w(null),E(null),D(V1),c(null)},ve=L=>D(q=>({...q,[L]:!q[L]})),ye=null,mt=null;if(u){let L=u,q=new Set;L.forEach(Q=>Object.keys(we(Q.start,Q.end).avg).forEach(y=>q.add(y)));let ee=hs.filter(Q=>q.has(Q));ye=(0,S.jsxs)(S.Fragment,{children:[L.map((Q,y)=>(0,S.jsxs)("div",{className:"kpi-card kpi-green",children:[(0,S.jsx)("div",{className:"kpi-label",children:Q.title}),(0,S.jsxs)("div",{className:"kpi-value",children:[z(Q.result.BoilerEff),(0,S.jsx)("span",{className:"kpi-unit",children:"%"})]}),(0,S.jsxs)("div",{className:"kpi-sub",children:[ot(Q.start)," \u2192 ",ot(Q.end)," \xB7 ",Q.rowCount," row",Q.rowCount===1?"":"s"]})]},y)),L.length===2&&(0,S.jsx)(oi,{p1:L[0],p2:L[1],eff1:L[0].result.BoilerEff,eff2:L[1].result.BoilerEff})]}),mt=(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(ri,{list:L,perProcessIds:ee,labels:Ld,page:"asme",open:O.processInputsOpen,onToggle:()=>ve("processInputsOpen")}),(0,S.jsx)(si,{list:L,rows:kh,page:"asme",open:O.processComparisonOpen,onToggle:()=>ve("processComparisonOpen")})]})}else if(B&&v!==null){let L=B;ye=(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)("div",{className:"kpi-card kpi-green",children:[(0,S.jsx)("div",{className:"kpi-label",children:"Boiler Efficiency"}),(0,S.jsxs)("div",{className:"kpi-value boiler-eff-val",children:[z(L.BoilerEff),(0,S.jsx)("span",{className:"kpi-unit",children:"%"})]}),(0,S.jsx)("div",{className:"kpi-sub",children:"ASME PTC 4.1 \u2014 Losses Method, HHV basis"})]}),(0,S.jsx)($e,{cls:"kpi-red",label:(0,S.jsxs)(S.Fragment,{children:["Dry Flue Gas Loss ",(0,S.jsx)("span",{style:{opacity:.6},children:"(Item 65)"})]}),children:(0,S.jsxs)("div",{className:"kpi-value",children:[z(L.L65),(0,S.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,S.jsx)($e,{cls:"kpi-blue",label:(0,S.jsxs)(S.Fragment,{children:["Moisture in Fuel Loss ",(0,S.jsx)("span",{style:{opacity:.6},children:"(Item 66)"})]}),children:(0,S.jsxs)("div",{className:"kpi-value",children:[z(L.L66),(0,S.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,S.jsx)($e,{cls:"kpi-green",label:(0,S.jsxs)(S.Fragment,{children:["H","\u2082"," Combustion Loss ",(0,S.jsx)("span",{style:{opacity:.6},children:"(Item 67)"})]}),children:(0,S.jsxs)("div",{className:"kpi-value",children:[z(L.L67),(0,S.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,S.jsx)($e,{cls:"kpi-amber",label:(0,S.jsxs)(S.Fragment,{children:["Combustibles in Refuse ",(0,S.jsx)("span",{style:{opacity:.6},children:"(Item 68)"})]}),children:(0,S.jsxs)("div",{className:"kpi-value",children:[z(L.L68),(0,S.jsx)("span",{className:"kpi-unit",children:"%"})]})}),(0,S.jsxs)("div",{className:"kpi-card kpi-red",children:[(0,S.jsxs)("div",{className:"kpi-label",children:["Radiation Loss ",(0,S.jsx)("span",{style:{opacity:.6},children:"(Item 69)"})]}),(0,S.jsxs)("div",{style:j1,children:[(0,S.jsx)("input",{type:"number",id:"Lrad",value:v,onChange:q=>Be("Lrad",q.target.value),style:Y1}),(0,S.jsx)("span",{style:q1,children:"%"})]}),(0,S.jsx)("div",{className:"kpi-sub",children:"ABMA curve / measured \u2014 enter & recalculate"})]}),(0,S.jsxs)("div",{className:"kpi-card kpi-blue",children:[(0,S.jsxs)("div",{className:"kpi-label",children:["Unmeasured Losses ",(0,S.jsx)("span",{style:{opacity:.6},children:"(Item 70)"})]}),(0,S.jsxs)("div",{style:j1,children:[(0,S.jsx)("input",{type:"number",id:"Lunm",value:H??"",onChange:q=>Be("Lunm",q.target.value),style:Y1}),(0,S.jsx)("span",{style:q1,children:"%"})]}),(0,S.jsx)("div",{className:"kpi-sub",children:"Mutually agreed value \u2014 enter & recalculate"})]})]}),mt=(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)("div",{className:"output-section",children:[(0,S.jsxs)(ho,{open:O.lossesOpen,onClick:()=>ve("lossesOpen"),children:["Heat-Loss Efficiency \u2014 Items 65","\u2013","72"]}),O.lossesOpen&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(Kn,{b:"Item"}),(0,S.jsx)(re,{name:"Dry Flue Gas Loss",sym:"65",val:L.L65,uom:"%"}),(0,S.jsx)(re,{name:"Moisture in Fuel",sym:"66",val:L.L66,uom:"%"}),(0,S.jsx)(re,{name:"Water from H\u2082 Combustion",sym:"67",val:L.L67,uom:"%"}),(0,S.jsx)(re,{name:"Combustibles in Refuse",sym:"68",val:L.L68,uom:"%"}),(0,S.jsx)(re,{name:"Radiation",sym:"69",val:L.L69,uom:"%"}),(0,S.jsx)(re,{name:"Unmeasured Losses",sym:"70",val:L.L70,uom:"%"}),(0,S.jsxs)("div",{className:"output-row highlight-row2",children:[(0,S.jsx)("span",{className:"out-name",children:"Total Losses"}),(0,S.jsx)("span",{className:"out-sym",children:"71"}),(0,S.jsx)("span",{className:"out-val",id:"losses-total-val",children:z(L.TotalLosses)}),(0,S.jsx)("span",{className:"out-uom",children:"%"})]}),(0,S.jsxs)("div",{className:"output-row highlight-row2",children:[(0,S.jsx)("span",{className:"out-name",children:"Boiler Efficiency"}),(0,S.jsx)("span",{className:"out-sym",children:"72"}),(0,S.jsx)("span",{className:"out-val",id:"losses-eff-val",children:z(L.BoilerEff)}),(0,S.jsx)("span",{className:"out-uom",children:"%"})]})]})]}),(0,S.jsxs)("div",{className:"output-section",children:[(0,S.jsx)(ho,{open:O.intermediateOpen,onClick:()=>ve("intermediateOpen"),children:"Intermediate Values"}),O.intermediateOpen&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(Kn,{b:"Item"}),(0,S.jsx)(re,{name:"CO\u2082, dry",sym:"32",val:L.CO2,uom:"%"}),(0,S.jsx)(re,{name:"N\u2082, dry (by difference)",sym:"35",val:L.N2,uom:"%"}),(0,S.jsx)(re,{name:"Excess Air",sym:"36",val:L.ExcessAir,uom:"%"}),(0,S.jsx)(re,{name:"Carbon, as fired (ultimate)",sym:"43",val:L.Ca,uom:"%"}),(0,S.jsx)(re,{name:"Hydrogen, as fired (ultimate)",sym:"44",val:L.H,uom:"%"}),(0,S.jsx)(re,{name:"Dry Refuse per Unit Fuel",sym:"22",val:L.DryRefuse,uom:"\u2014"}),(0,S.jsx)(re,{name:"Carbon Burned per Unit Fuel",sym:"24",val:L.CarbonBurned,uom:"%"}),(0,S.jsx)(re,{name:"Dry Flue Gas per Unit Fuel",sym:"25",val:L.MassDFG,uom:"\u2014"})]})]})]})}return(0,S.jsxs)("div",{className:"container",children:[(0,S.jsx)(nn,{}),(0,S.jsxs)("div",{className:"section-header",style:{marginTop:0},children:[(0,S.jsx)("div",{className:"section-label",children:"ASME-PTC 4.1"}),(0,S.jsx)("div",{className:"section-line"})]}),(0,S.jsxs)("div",{className:"tab-nav",children:[(0,S.jsxs)("button",{className:"tab-btn"+(t==="input"?" active":""),onClick:()=>n("input"),children:[(0,S.jsx)("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),(0,S.jsxs)("button",{className:"tab-btn"+(t==="output"?" active":""),onClick:()=>n("output"),children:[(0,S.jsx)("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),(0,S.jsxs)("div",{className:"page"+(t==="input"?" active":""),id:"page-input",children:[(0,S.jsx)(cn,{description:"Upload your data sheet \u2014 matching input fields will be auto-populated, same detection as CENPEEP.",onFile:ie,status:g}),(0,S.jsx)(al,{uploadData:m,processes:N.processes,onAdd:N.add,onRemove:N.remove,onTitle:N.setTitle,onDate:N.setDate}),(0,S.jsxs)("div",{className:"action-bar",children:[(0,S.jsxs)("button",{className:"btn btn-ghost",onClick:Me,children:[(0,S.jsx)(wa,{}),"Reset to Defaults"]}),(0,S.jsxs)("button",{className:"btn btn-primary",onClick:me,title:"ASME PTC 4.1 \u2014 Losses Method",children:[(0,S.jsx)(Oa,{}),"Calculate Efficiency"]})]}),(0,S.jsx)(Zn,{cards:R1,open:d,onToggle:P}),F1.map(L=>(0,S.jsx)(Jn,{id:L,fields:zd[L],open:!!d[L],values:a,onChange:_,detected:i,missing:r},L))]}),(0,S.jsxs)("div",{className:"page"+(t==="output"?" active":""),id:"page-output",children:[(0,S.jsx)("div",{className:"output-summary",id:"kpi-area",children:ye}),(0,S.jsx)("div",{id:"output-tables",children:mt}),(0,S.jsx)("div",{className:"download-bar",children:(0,S.jsx)("button",{className:"btn btn-ghost",onClick:()=>n("input"),children:"\u2190 Back to Inputs"})})]})]})}function Bd(){return(0,S.jsx)(Vt,{active:"/asme-ptc-4-1",children:(0,S.jsx)(Oh,{})})}var xt=V(Xe(),1);var So=["BL","SP","O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","S","M","A","GCV","Cba","Cfa","GCVba","GCVfa","L6"],Co={BL:"Boiler Load (TPH)",SP:"Steam Pressure (kg/cm\xB2)",O2fg:"O2 in Flue Gas (%)",COfg:"CO in Flue Gas (ppm)",CO2fg:"CO2 in Flue Gas (%)",Tfg:"Avg. Flue Gas Temperature (\xB0C)",Tamb:"Ambient Temperature (\xB0C)",Hum:"Humidity in Ambient Air (kg/kg dry air)",C:"Carbon (%)",H2:"Hydrogen (%)",N2:"Nitrogen (%)",O2f:"Oxygen (%)",S:"Sulphur (%)",M:"Moisture (%)",A:"Ash Content (%)",GCV:"GCV of Coal (kcal/kg)",Cba:"Unburnt in Bottom Ash (%)",Cfa:"Unburnt in Fly Ash (%)",GCVba:"GCV of Bottom Ash (kcal/kg)",GCVfa:"GCV of Fly Ash (kcal/kg)",L6:"Radiation & Unaccounted Losses (%)"},Q1=["BL","SP"],wh=(e,t)=>{let n=parseFloat(e[t]);return isNaN(n)?0:n};function ui(e){let t=ee=>wh(e,ee),n=t("O2fg"),a=t("COfg"),l=t("CO2fg"),i=t("Tfg"),o=t("Tamb"),r=t("Hum"),s=t("C"),d=t("H2"),p=t("N2"),g=t("O2f"),c=t("S"),m=t("M"),C=t("A"),N=t("GCV"),B=t("Cba"),f=t("Cfa"),u=t("GCVba"),b=t("GCVfa"),v=t("L6"),w=(11.6*s+34.8*(d-g/8)+4.35*c)/100,H=n/(21-n)*100,E=(1+H/100)*w,O=s/100*(44/12)+p/100+E*(77/100)+(E-w)*(23/100)+c/100*(64/32),D=.24,_=.45,P=O*D*(i-o)/N*100,we=9*(d/100)*(584+_*(i-o))/N*100,ge=m/100*(584+_*(i-o))/N*100,ie=E*(r/10)*_*(i-o)/N*100,me=s/100+l/5654/N/100,ve=f/100*(C/100)*b*100/N,L=B/100*(C/100)*u*100/N,q=100-(P+we+ge+ie+me+v+ve+L);return{TA:w,EA:H,AAS:E,m:O,L1:P,L2:we,L3:ge,L4:ie,L5:me,L6:v,L7:ve,L8:L,BoilerEff:q,heatInput:N,inputs:So.map(ee=>({id:ee,label:Co[ee]||ee,value:e[ee]}))}}var X1=[{target:"grid-general",icon:"GD",title:"General Data",sub:"2 parameters"},{target:"grid-fluegas",icon:"FG",title:"Flue Gas & Atmospheric Air",sub:"6 parameters"},{target:"grid-fuel",icon:"FA",title:"Fuel Analysis \u2014 Ultimate",sub:"8 parameters"},{target:"grid-ash",icon:"AA",title:"Ash Analysis",sub:"4 parameters"},{target:"grid-other",icon:"OL",title:"Other Losses",sub:"1 parameter"}],_d={"grid-general":[{id:"BL",name:"Boiler Load",sym:"BL",uom:"TPH",kind:"field-info",value:"20",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}},{id:"SP",name:"Steam Pressure",sym:"SP",uom:"kg/cm\xB2",kind:"field-info",value:"66",readonly:!1,tag:{cls:"info-tag",text:"INFO ONLY"}}],"grid-fluegas":[{id:"O2fg",name:"O\u2082 in Flue Gas",sym:"O2fg",uom:"%",kind:"",value:"9",readonly:!1},{id:"COfg",name:"CO in Flue Gas",sym:"COfg",uom:"ppm",kind:"",value:"800",readonly:!1},{id:"CO2fg",name:"CO\u2082 in Flue Gas",sym:"CO2fg",uom:"%",kind:"",value:"10.67",readonly:!1},{id:"Tfg",name:"Average Flue Gas Temperature",sym:"Tfg",uom:"\xB0C",kind:"",value:"180",readonly:!1},{id:"Tamb",name:"Ambient Temperature",sym:"Tamb",uom:"\xB0C",kind:"",value:"29.3",readonly:!1},{id:"Hum",name:"Humidity in Ambient Air",sym:"Hum",uom:"kg/kg dry air",kind:"",value:"0.1977",readonly:!1,step:"0.0001"}],"grid-fuel":[{id:"C",name:"Carbon",sym:"C",uom:"%",kind:"",value:"53.65",readonly:!1},{id:"H2",name:"Hydrogen",sym:"H2",uom:"%",kind:"",value:"3.25",readonly:!1},{id:"N2",name:"Nitrogen",sym:"N2",uom:"%",kind:"",value:"1.11",readonly:!1},{id:"O2f",name:"Oxygen",sym:"O2f",uom:"%",kind:"",value:"8.68",readonly:!1},{id:"S",name:"Sulphur",sym:"S",uom:"%",kind:"",value:"0.34",readonly:!1},{id:"M",name:"Moisture",sym:"M",uom:"%",kind:"",value:"14.43",readonly:!1},{id:"A",name:"Ash Content",sym:"A",uom:"%",kind:"",value:"18.54",readonly:!1},{id:"GCV",name:"GCV of Coal",sym:"GCV",uom:"kcal/kg",kind:"",value:"4291",readonly:!1}],"grid-ash":[{id:"Cba",name:"Unburnt in Bottom Ash",sym:"Cba",uom:"%",kind:"",value:"0.11",readonly:!1},{id:"Cfa",name:"Unburnt in Fly Ash",sym:"Cfa",uom:"%",kind:"",value:"4.89",readonly:!1},{id:"GCVba",name:"GCV of Bottom Ash",sym:"GCVba",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}},{id:"GCVfa",name:"GCV of Fly Ash",sym:"GCVfa",uom:"kcal/kg",kind:"field-manual",value:"0",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}],"grid-other":[{id:"L6",name:"Radiation & Unaccounted Losses",sym:"L6",uom:"%",kind:"field-manual",value:"1",readonly:!1,tag:{cls:"manual-tag",text:"MANUAL"}}]};var T=V(K(),1),Z1=["grid-general","grid-fluegas","grid-fuel","grid-ash","grid-other"],Ud=Z1.flatMap(e=>_d[e]),Mh=Object.fromEntries(Ud.map(e=>[e.id,e.value??""])),Lh=new Set(Ud.filter(e=>!e.readonly).map(e=>e.id)),zh=So.filter(e=>!Q1.includes(e)),Dh=["L6","S","GCVba","GCVfa"],Bh=e=>zh.filter(t=>!Dh.includes(t)&&!(t in e)).map(t=>({id:t,label:Co[t]||t})),_h={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},Uh=[["Date Range",e=>`${ot(e.start)} \u2192 ${ot(e.end)}`],["Rows Used",e=>String(e.rowCount)],["Boiler Efficiency (%)",e=>z(e.result.BoilerEff)],["Dry Flue Gas (%) \u2014 L1",e=>z(e.result.L1)],["H\u2082 in Fuel (%) \u2014 L2",e=>z(e.result.L2)],["Moisture in Fuel (%) \u2014 L3",e=>z(e.result.L3)],["Moisture in Air (%) \u2014 L4",e=>z(e.result.L4)],["Partial C\u2192CO (%) \u2014 L5",e=>z(e.result.L5)],["Radiation & Unaccounted (%) \u2014 L6",e=>z(e.result.L6)],["Unburnt Fly Ash (%) \u2014 L7",e=>z(e.result.L7)],["Unburnt Bottom Ash (%) \u2014 L8",e=>z(e.result.L8)]],In=({name:e,sym:t,kcal:n,pct:a})=>(0,T.jsxs)("div",{className:"output-row",children:[(0,T.jsx)("span",{className:"out-name",children:e}),(0,T.jsx)("span",{className:"out-sym",children:t}),(0,T.jsx)("span",{className:"out-val",children:z(n)}),(0,T.jsxs)("span",{className:"out-uom",children:[z(a),"%"]})]});function Hh(){let e=xn();(0,xt.useEffect)(()=>{document.title="Boiler Efficiency Calculator \u2014 BEE"},[]);let[t,n]=(0,xt.useState)("input"),[a,l]=(0,xt.useState)(Mh),[i,o]=(0,xt.useState)(new Set),[r,s]=(0,xt.useState)(new Set),[d,p]=(0,xt.useState)({}),[g,c]=(0,xt.useState)(null),[m,C]=(0,xt.useState)(null),[N,B]=(0,xt.useState)(null),f=ii(),[u,b]=(0,xt.useState)(null),[v,w]=(0,xt.useState)(null),[H,E]=(0,xt.useState)(""),[O,D]=(0,xt.useState)({processInputsOpen:!1,processComparisonOpen:!1}),_=(y,U)=>l(Z=>({...Z,[y]:U})),P=y=>p(U=>({...U,[y]:!U[y]})),we=(y,U)=>ai(m,y,U,!0),ge=()=>{let y={};return So.forEach(U=>{y[U]=a[U]!==void 0?a[U]:0}),y},ie=async y=>{c({cls:"loading",text:"\u23F3 Parsing all sheets\u2026"});let U=new FormData;U.append("file",y);try{let F=await(await it("/api/upload",{method:"POST",body:U})).json();if(!F.ok)throw new Error(F.error||"Upload failed");Cn(F,"BEE");let He={...F.extracted||{},...F.beeOverrides||{}},Qe={...a},tt=new Set,an=0;for(let[pt,ln]of Object.entries(He))Lh.has(pt)&&(Qe[pt]=String(typeof ln=="number"?parseFloat(ln.toFixed(6)):ln),tt.add(pt),an++);let En=Bh(He),Ba=new Set;for(let pt of En)Ud.some(ln=>ln.id===pt.id)&&Ba.add(pt.id);let ol={...F,missingFields:En};l(Qe),o(tt),s(Ba),B(F.filename),C(ol),f.setProcesses([]),w(null);let Wn={...F.fieldDetail||{}};for(let pt of Object.keys(F.beeOverrides||{}))Wn[pt]={label:Co[pt]||pt,header:"LAB sheet (lab-tested reading)",source:"rule",confidence:1};c({cls:an?"success":"",node:ni({data:F,populated:an,fieldDetail:Wn,missingFieldsList:En,strategyLabel:N1,derivedLabel:"\u21B3 defaulted",bee:!0})}),e(an?`Excel imported \u2014 ${an} fields auto-populated`:"Sheet parsed \u2014 BEE field detection not configured yet",an?"success":"info")}catch(Z){c({cls:"error",text:`\u2717 ${Z.message}`}),e(Z.message,"error")}},me=()=>{let y=f.processes.filter(F=>F.start||F.end);if(!y.length){let F=ui(ge());w(null),b(F),E(String(F.L6)),n("output");return}let U=ge(),Z=y.map(F=>{let{avg:He,rowCount:Qe}=we(F.start,F.end);return{title:F.title||"Process",start:F.start,end:F.end,rowCount:Qe,result:ui({...U,...He})}});w(Z),b(Z[0].result),n("output")},Be=y=>{if(E(y),!u)return;let U=parseFloat(y)||0,Z=ge();Z.L6=U,_("L6",String(U)),b(ui(Z))},Me=()=>{l(y=>{let U={...y};return Object.entries(_h).forEach(([Z,F])=>{Z in U&&(U[Z]=String(F))}),U}),B(null),C(null),f.setProcesses([]),w(null),b(null),D({processInputsOpen:!1,processComparisonOpen:!1}),c(null)},ve=async()=>{if(!u){e("Calculate first before saving.","error");return}let y=window.prompt("Session name (optional):",N||"");if(y===null)return;let U=u,Z={sessionName:y.trim(),sourceFile:N||"Manual Entry",boilerType:sessionStorage.getItem("boilerType")||"",inputs:U.inputs,results:{method:"BEE-2 Indirect",BoilerEff:U.BoilerEff,L1:U.L1,L2:U.L2,L3:U.L3,L4:U.L4,L5:U.L5,L6:U.L6,L7:U.L7,L8:U.L8,TA:U.TA,EA:U.EA,AAS:U.AAS,m:U.m}};try{let He=await(await it("/api/sessions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Z)})).json();if(!He.ok)throw new Error(He.error);e("\u2713 Session saved to MongoDB!","success")}catch(F){e("Save failed: "+F.message,"error")}},ye=()=>{if(!u){e("Calculate first.","error");return}let y=u,U=new Date().toISOString().slice(0,19).replace("T"," "),Z=`BEE-2 Indirect Boiler Efficiency Report
Generated:,${U}

INPUTS
Parameter,Value
`;y.inputs.forEach(F=>{Z+=`"${F.label}",${F.value}
`}),Z+=`
LOSSES
Parameter,Symbol,Value (%),kcal/kg of coal
`,[["Dry Flue Gas","L1",y.L1],["Hydrogen in Fuel","L2",y.L2],["Moisture in Fuel","L3",y.L3],["Moisture in Air","L4",y.L4],["Partial Combustion C\u2192CO","L5",y.L5],["Radiation & Unaccounted","L6",y.L6],["Unburnt in Fly Ash","L7",y.L7],["Unburnt in Bottom Ash","L8",y.L8]].forEach(([F,He,Qe])=>{Z+=`"${F}","${He}",${Qe.toFixed(4)},${(y.heatInput*Qe/100).toFixed(2)}
`}),Z+=`
"Boiler Efficiency","eta",${y.BoilerEff.toFixed(4)},
`,Xn(new Blob([Z],{type:"text/csv"}),`bee_indirect_report_${U.replace(/[: ]/g,"_")}.csv`)},mt=()=>{if(!u){e("Calculate first.","error");return}let y=u,U=new Date().toLocaleString(),Z=window.open("","_blank");Z.document.write(`<!DOCTYPE html><html><head><title>BEE-2 Indirect Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;margin:30px}h1{font-size:18px}
  h2{font-size:13px;margin:18px 0 5px;border-bottom:1px solid #ccc}
  table{width:100%;border-collapse:collapse}th{background:#1e3a5f;color:#fff;padding:5px 8px;text-align:left;font-size:11px}
  td{padding:4px 8px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even)td{background:#f5f8ff}
  .hl{background:#e6fff5!important;font-weight:bold}.meta{color:#666;font-size:11px;margin-bottom:16px}
  </style></head><body>
  <h1>BEE-2 Indirect Boiler Efficiency Report</h1><p class="meta">Generated: ${U}</p>
  <h2>Inputs</h2><table><tr><th>Parameter</th><th>Value</th></tr>
  ${y.inputs.map(F=>`<tr><td>${F.label}</td><td>${F.value}</td></tr>`).join("")}</table>
  <h2>Heat Balance</h2><table><tr><th>Parameter</th><th>Symbol</th><th>kcal/kg coal</th><th>% loss</th></tr>
  <tr><td>Heat Input</td><td></td><td>${z(y.heatInput)}</td><td>100.00</td></tr>
  <tr><td>Dry Flue Gas</td><td>L1</td><td>${z(y.heatInput*y.L1/100)}</td><td>${z(y.L1)}</td></tr>
  <tr><td>Hydrogen in Fuel</td><td>L2</td><td>${z(y.heatInput*y.L2/100)}</td><td>${z(y.L2)}</td></tr>
  <tr><td>Moisture in Fuel</td><td>L3</td><td>${z(y.heatInput*y.L3/100)}</td><td>${z(y.L3)}</td></tr>
  <tr><td>Moisture in Air</td><td>L4</td><td>${z(y.heatInput*y.L4/100)}</td><td>${z(y.L4)}</td></tr>
  <tr><td>Partial Combustion C\u2192CO</td><td>L5</td><td>${z(y.heatInput*y.L5/100)}</td><td>${z(y.L5)}</td></tr>
  <tr><td>Radiation &amp; Unaccounted</td><td>L6</td><td>${z(y.heatInput*y.L6/100)}</td><td>${z(y.L6)}</td></tr>
  <tr><td>Unburnt in Fly Ash</td><td>L7</td><td>${z(y.heatInput*y.L7/100)}</td><td>${z(y.L7)}</td></tr>
  <tr><td>Unburnt in Bottom Ash</td><td>L8</td><td>${z(y.heatInput*y.L8/100)}</td><td>${z(y.L8)}</td></tr>
  <tr class="hl"><td><b>Boiler Efficiency</b></td><td>\u03B7</td><td></td><td><b>${z(y.BoilerEff)}</b></td></tr>
  </table><script>window.print();<\/script></body></html>`),Z.document.close()},L=async()=>{let y=m;if(!y||!y.fieldDetail||!Object.keys(y.fieldDetail).length){e("Upload and parse a file first to generate a field report.","error");return}let U={filename:y.filename,primarySheet:y.primarySheet,fieldDetail:y.fieldDetail,extracted:y.extracted,missingFields:y.missingFields};try{let Z=await it("/api/report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(U)});if(!Z.ok){let tt=await Z.json().catch(()=>({}));throw new Error(tt.error||`Report generation failed (${Z.status})`)}let F=await Z.blob(),Qe=(Z.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/);Xn(F,Qe?Qe[1]:"BEE_Field_Report.docx"),e("\u2713 Field report downloaded","success")}catch(Z){e("Report failed: "+Z.message,"error")}},q=y=>D(U=>({...U,[y]:!U[y]})),ee=null,Q=null;if(v){let y=v,U=new Set;y.forEach(F=>Object.keys(we(F.start,F.end).avg).forEach(He=>U.add(He)));let Z=So.filter(F=>U.has(F));ee=(0,T.jsxs)(T.Fragment,{children:[y.map((F,He)=>(0,T.jsxs)("div",{className:"kpi-card kpi-green",children:[(0,T.jsx)("div",{className:"kpi-label",children:F.title}),(0,T.jsxs)("div",{className:"kpi-value",children:[z(F.result.BoilerEff),(0,T.jsx)("span",{className:"kpi-unit",children:"%"})]}),(0,T.jsxs)("div",{className:"kpi-sub",children:[ot(F.start)," \u2192 ",ot(F.end)," \xB7 ",F.rowCount," row",F.rowCount===1?"":"s"]})]},He)),y.length===2&&(0,T.jsx)(oi,{p1:y[0],p2:y[1],eff1:y[0].result.BoilerEff,eff2:y[1].result.BoilerEff})]}),Q=(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(ri,{list:y,perProcessIds:Z,labels:Co,page:"bee",open:O.processInputsOpen,onToggle:()=>q("processInputsOpen")}),(0,T.jsx)(si,{list:y,rows:Uh,page:"bee",open:O.processComparisonOpen,onToggle:()=>q("processComparisonOpen")})]})}else if(u){let y=u,U=({v:Z})=>(0,T.jsxs)("div",{className:"kpi-value",children:[z(Z),(0,T.jsx)("span",{className:"kpi-unit",children:"%"})]});ee=(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)("div",{className:"kpi-card kpi-green",style:{gridColumn:"span 2"},children:[(0,T.jsx)("div",{className:"kpi-label",children:"Boiler Efficiency"}),(0,T.jsx)(U,{v:y.BoilerEff}),(0,T.jsx)("div",{className:"kpi-sub",children:"BEE-2 Indirect method (heat-loss)"})]}),(0,T.jsx)($e,{cls:"kpi-red",label:"L1 \u2014 Dry Flue Gas",children:(0,T.jsx)(U,{v:y.L1})}),(0,T.jsx)($e,{cls:"kpi-blue",label:"L2 \u2014 H\u2082 in Fuel",children:(0,T.jsx)(U,{v:y.L2})}),(0,T.jsx)($e,{cls:"kpi-blue",label:"L3 \u2014 Moisture in Fuel",children:(0,T.jsx)(U,{v:y.L3})}),(0,T.jsx)($e,{cls:"kpi-blue",label:"L4 \u2014 Moisture in Air",children:(0,T.jsx)(U,{v:y.L4})}),(0,T.jsx)($e,{cls:"kpi-amber",label:"L5 \u2014 Partial C\u2192CO",children:(0,T.jsx)(U,{v:y.L5})}),(0,T.jsxs)("div",{className:"kpi-card kpi-amber",style:{gridColumn:"span 2"},children:[(0,T.jsx)("div",{className:"kpi-label",children:"L6 \u2014 Radiation & Unaccounted"}),(0,T.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[(0,T.jsx)("input",{type:"number",id:"L6live",value:H,onChange:Z=>Be(Z.target.value),style:{background:"var(--bg)",border:"1px solid var(--accent)",borderRadius:"6px",padding:"6px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"24px",color:"var(--text-bright)",width:"120px",outline:"none"}}),(0,T.jsx)("span",{style:{fontSize:"14px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"},children:"%"})]}),(0,T.jsx)("div",{className:"kpi-sub",children:"Enter value and recalculate"})]}),(0,T.jsx)($e,{cls:"kpi-amber",label:"L7 \u2014 Unburnt Fly Ash",children:(0,T.jsx)(U,{v:y.L7})}),(0,T.jsx)($e,{cls:"kpi-amber",label:"L8 \u2014 Unburnt Bottom Ash",children:(0,T.jsx)(U,{v:y.L8})})]}),Q=(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)("div",{className:"output-section",children:[(0,T.jsx)("div",{className:"output-section-head",children:(0,T.jsx)("span",{children:"Heat Balance Summary"})}),(0,T.jsx)(Kn,{c:"kcal/kg of coal",d:"% loss"}),(0,T.jsx)(In,{name:"Heat Input",sym:"",kcal:y.heatInput,pct:100}),(0,T.jsx)(In,{name:"Dry Flue Gas",sym:"L1",kcal:y.heatInput*y.L1/100,pct:y.L1}),(0,T.jsx)(In,{name:"Hydrogen in Fuel",sym:"L2",kcal:y.heatInput*y.L2/100,pct:y.L2}),(0,T.jsx)(In,{name:"Moisture in Fuel",sym:"L3",kcal:y.heatInput*y.L3/100,pct:y.L3}),(0,T.jsx)(In,{name:"Moisture in Air",sym:"L4",kcal:y.heatInput*y.L4/100,pct:y.L4}),(0,T.jsx)(In,{name:"Partial Combustion C\u2192CO",sym:"L5",kcal:y.heatInput*y.L5/100,pct:y.L5}),(0,T.jsx)(In,{name:"Surface (Radiation) Losses",sym:"L6",kcal:y.heatInput*y.L6/100,pct:y.L6}),(0,T.jsx)(In,{name:"Unburnt in Fly Ash",sym:"L7",kcal:y.heatInput*y.L7/100,pct:y.L7}),(0,T.jsx)(In,{name:"Unburnt in Bottom Ash",sym:"L8",kcal:y.heatInput*y.L8/100,pct:y.L8}),(0,T.jsxs)("div",{className:"output-row highlight-row2",children:[(0,T.jsx)("span",{className:"out-name",children:"Boiler Efficiency"}),(0,T.jsx)("span",{className:"out-sym",children:"\u03B7"}),(0,T.jsx)("span",{className:"out-val",children:z(y.BoilerEff)}),(0,T.jsx)("span",{className:"out-uom",children:"%"})]})]}),(0,T.jsxs)("div",{className:"output-section",children:[(0,T.jsx)("div",{className:"output-section-head",children:(0,T.jsx)("span",{children:"Intermediate Values"})}),(0,T.jsx)(Kn,{}),(0,T.jsx)(re,{name:"Theoretical Air Required",sym:"TA",val:y.TA,uom:"kg/kg coal"}),(0,T.jsx)(re,{name:"Excess Air Supplied",sym:"EA",val:y.EA,uom:"%"}),(0,T.jsx)(re,{name:"Actual Air Supplied",sym:"AAS",val:y.AAS,uom:"kg/kg coal"}),(0,T.jsx)(re,{name:"Mass of Dry Flue Gas",sym:"m",val:y.m,uom:"kg/kg coal"})]})]})}return(0,T.jsxs)("div",{className:"container",children:[(0,T.jsx)(nn,{}),(0,T.jsxs)("div",{className:"section-header",style:{marginTop:0},children:[(0,T.jsx)("div",{className:"section-label",children:"BEE"}),(0,T.jsx)("div",{className:"section-line"})]}),(0,T.jsxs)("div",{className:"tab-nav",children:[(0,T.jsxs)("button",{className:"tab-btn"+(t==="input"?" active":""),onClick:()=>n("input"),children:[(0,T.jsx)("span",{className:"tab-num",children:"01 /"})," Input Parameters"]}),(0,T.jsxs)("button",{className:"tab-btn"+(t==="output"?" active":""),onClick:()=>n("output"),children:[(0,T.jsx)("span",{className:"tab-num",children:"02 /"})," Results & Losses"]})]}),(0,T.jsxs)("div",{className:"page"+(t==="input"?" active":""),id:"page-input",children:[(0,T.jsx)(cn,{description:"Upload your file \u2014 matching input fields will be auto-populated automatically.",onFile:ie,status:g}),(0,T.jsx)(al,{uploadData:m,processes:f.processes,onAdd:f.add,onRemove:f.remove,onTitle:f.setTitle,onDate:f.setDate}),(0,T.jsxs)("div",{className:"action-bar",children:[(0,T.jsxs)("button",{className:"btn btn-primary",onClick:me,children:[(0,T.jsx)(Oa,{}),"Calculate Efficiency"]}),(0,T.jsxs)("button",{className:"btn btn-ghost",onClick:Me,children:[(0,T.jsx)(wa,{}),"Reset to Defaults"]})]}),(0,T.jsx)(Zn,{cards:X1,open:d,onToggle:P}),Z1.map(y=>(0,T.jsx)(Jn,{id:y,fields:_d[y],open:!!d[y],values:a,onChange:_,detected:i,missing:r},y))]}),(0,T.jsxs)("div",{className:"page"+(t==="output"?" active":""),id:"page-output",children:[(0,T.jsx)("div",{className:"output-summary",id:"kpi-area",children:ee}),(0,T.jsx)("div",{id:"output-tables",children:Q}),(0,T.jsxs)("div",{className:"download-bar",children:[(0,T.jsxs)("button",{className:"btn btn-primary",onClick:ve,children:[(0,T.jsx)(ss,{}),"Save to Database"]}),(0,T.jsxs)("button",{className:"btn btn-secondary",onClick:ye,children:[(0,T.jsx)(ei,{}),"Download CSV"]}),(0,T.jsxs)("button",{className:"btn btn-secondary",onClick:mt,children:[(0,T.jsx)(ei,{}),"Download PDF"]}),(0,T.jsxs)("button",{className:"btn btn-secondary",onClick:L,children:[(0,T.jsx)(ti,{}),"Field Report (.docx)"]}),(0,T.jsx)("button",{className:"btn btn-ghost",onClick:()=>n("input"),children:"\u2190 Back to Inputs"})]})]})]})}function Hd(){return(0,T.jsx)(Vt,{active:"/bee",extraStyle:"bee",children:(0,T.jsx)(Hh,{})})}var il=V(Xe(),1);var J1={L:210,Ffw:615,Fin:140,Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2in:3.5,COin:39,O2out:5,COout:50,Tgi:350,Tgo:135,Tpai:40,Tpao:325,Tsai:34,Tsao:325,Fsa:450,Fpa:250,Tref:30,Md:13,Ad:40,VMd:24,FCd:23,Sd:.3,GCVd:3300,Trad:38,Mwvd:.013},K1={Cba:1.2,Cfa:.4,Pfa:80,Pba:20,M:12.2,A:40,VM:22.9,FC:24.9,GCV:3320,S:.6,O2out:5,COout:50,Tgo:135,Tref:30},I1={BL:20,SP:66,O2fg:9,COfg:800,CO2fg:10.67,Tfg:180,Tamb:29.3,Hum:.1977,C:53.65,H2:3.25,N2:1.11,O2f:8.68,S:.34,M:14.43,A:18.54,GCV:4291,Cba:.11,Cfa:4.89,GCVba:0,GCVfa:0,L6:1},Rd={bs203:45,bs206:950,bs211:1650,bs215:0,bs216:0,bs217:0,bs220:0,bs221:0,bs224:0,bs225:0,bs228:950,bs246:3400,bs247:0,bs250:0,bs251:0,bs254:0,bs255:0,bs258:0,bs259:0,bs262:0,bs271:12,bs272:38,bs273:38,bs274:2.5,bs275:1,bs276:.4,bs278:13900,bs279:13300,bs280:0,bs291:9.2,bs295:.05,bs301:2e3,bs323:0,bs325:0,bs326:0,bs328:.05,bs329:5,bs332:0,bs333:0,bs334:0,bs335:0,bs336:0,bs343:2.1,bs344:0,bs345:0,bs349:0,bs350:0,bs352:0,bs357:0,bs360:0,bs362:0,bs363:0,bs390:0,bs391:0,bs392:0,bs393:0,bs397:60,bs398:30,bs399:.018,bs427:135,bs450:8,bs451:1.2,bs453:200,bs454:.84,bs460:0,bs461:0,bs463:0,bs464:.84,bs466:30,bs467:.4,bs469:135,bs470:.84,bs472:0,bs473:0,bs475:0,bs476:0,bs477:0,bs478:0,bs479:0,bs480:0,bs519:0,bs601:33820,bs701:0,bs702:10120,bs704:0,bs705:0,bs708:.35,bs807:10.2,bs907:0,bs909:1.2,bs910:.3},$1=["L","Ffw","Fin","Cba","Cfa","M","A","VM","FC","GCV","O2in","O2out","COout","Tgi","Tgo","Tpai","Tpao","Tsai","Tsao","Fsa","Fpa"],W1=["M","A","VM","FC","GCV","Cba","Cfa","O2out","COout","Tgo"],P1=["O2fg","COfg","CO2fg","Tfg","Tamb","Hum","C","H2","N2","O2f","M","A","GCV","Cba","Cfa"];var de=V(K(),1),tg=e=>typeof e=="number"&&isFinite(e)?e.toFixed(2):"\u2014";function Gd(e,t){return{found:t.filter(a=>e&&Object.prototype.hasOwnProperty.call(e,a)).length,total:t.length}}function eg(e){let t=e.extracted||{},n=e.extractedBS2885||{},a={};try{let l=Da({...J1,...t});a.cenpeep={ok:!0,eff:l.BoilerEff,coverage:Gd(t,$1)}}catch(l){a.cenpeep={ok:!1,error:l.message}}try{let l=xo({...K1,...t});a.asme={ok:!0,eff:l.BoilerEff,coverage:Gd(t,W1)}}catch(l){a.asme={ok:!1,error:l.message}}try{let l=ui({...I1,...t});a.bee={ok:!0,eff:l.BoilerEff,coverage:Gd(t,P1)}}catch(l){a.bee={ok:!1,error:l.message}}try{let l=gs({...Rd,...n});a.bs2885={ok:!0,effB:l.methodB.gross,effBnet:l.methodB.net,effA:l.methodA.gross,effAnet:l.methodA.net,coverage:{found:Object.keys(n).length,total:Object.keys(Rd).length}}}catch(l){a.bs2885={ok:!1,error:l.message}}return a}function Rh(e){let t=Math.max(0,Math.round((Date.now()-e)/1e3));if(t<60)return"just now";let n=Math.round(t/60);if(n<60)return`${n} min ago`;let a=Math.round(n/60);return a<24?`${a} hr ago`:`${Math.round(a/24)} day(s) ago`}var xs=({cls:e,label:t,sub:n,value:a})=>(0,de.jsxs)("div",{className:"kpi-card "+e,children:[(0,de.jsx)("div",{className:"kpi-label",children:t}),(0,de.jsx)("div",{className:"kpi-value",children:a}),(0,de.jsx)("div",{className:"kpi-sub",children:n})]}),Ss=({v:e})=>(0,de.jsxs)(de.Fragment,{children:[tg(e),(0,de.jsx)("span",{className:"kpi-unit",children:"%"})]});function Gh(){let e=xn();(0,il.useEffect)(()=>{document.title="Boiler Efficiency Calculator \u2014 Summary"},[]);let[t,n]=(0,il.useState)(null),[a,l]=(0,il.useState)(""),[i,o]=(0,il.useState)(null);(0,il.useEffect)(()=>{let c;try{let m=sessionStorage.getItem(xd);if(!m)return;c=JSON.parse(m)}catch{return}if(!(!c||!c.extracted))try{let m=eg(c),C=["cenpeep","bs2885","asme","bee"].filter(N=>m[N].ok).length;n(m),l(`Auto-loaded from your last upload on the ${c.sourceTab||"another"} tab ("${c.filename||"file"}", ${Rh(c.savedAt)}) \u2014 ${C}/4 methods calculated. Upload a new file above to recalculate.`)}catch{}},[]);let r=async c=>{o({cls:"loading",text:"\u23F3 Parsing sheet and running all four methods\u2026"});let m=new FormData;m.append("file",c);try{let N=await(await it("/api/upload",{method:"POST",body:m})).json();if(!N.ok)throw new Error(N.error||"Upload failed");Cn(N,"Summary"),l("");let B=eg(N);n(B);let f=["cenpeep","bs2885","asme","bee"].filter(u=>B[u].ok).length;o({cls:"success",text:`\u2713 ${f}/4 methods calculated from "${N.filename}"`}),e(`Summary updated \u2014 ${f}/4 methods calculated`,f===4?"success":"error")}catch(C){o({cls:"error",text:`\u2717 ${C.message}`}),e(C.message,"error")}},s=t&&t.cenpeep,d=t&&t.bs2885,p=t&&t.asme,g=t&&t.bee;return(0,de.jsxs)("div",{className:"container",children:[(0,de.jsx)(nn,{}),(0,de.jsxs)("div",{className:"section-header",style:{marginTop:0},children:[(0,de.jsx)("div",{className:"section-label",children:"Summary \u2014 All Methods"}),(0,de.jsx)("div",{className:"section-line"})]}),(0,de.jsx)(cn,{description:"Upload one data sheet \u2014 CENPEEP, BS-2885, ASME-PTC 4.1 and BEE efficiencies are all calculated from it, each using only its own required input fields.",onFile:r,status:i}),!t&&(0,de.jsx)("div",{id:"summary-empty",style:{textAlign:"center",padding:"60px 20px",color:"var(--muted)",fontSize:"14px"},children:"Upload a data sheet above \u2014 or upload one on any other tab and come back here \u2014 to see Boiler Efficiency computed by all four methods side by side."}),a&&(0,de.jsx)("div",{id:"summary-source-note",style:{fontSize:"12px",color:"var(--muted)",margin:"-6px 0 14px",padding:"0 4px"},children:a}),t&&(0,de.jsxs)("div",{id:"summary-results",children:[(0,de.jsxs)("div",{className:"output-summary",id:"summary-kpi-area",children:[(0,de.jsx)(xs,{cls:"kpi-green",label:"CENPEEP",sub:s.ok?`${s.coverage.found}/${s.coverage.total} fields detected`:s.error||"Could not calculate",value:s.ok?(0,de.jsx)(Ss,{v:s.eff}):"\u2014"}),(0,de.jsx)(xs,{cls:"kpi-blue",label:"BS-2885 \u2014 Method B (indirect)",sub:d.ok?`Method A (direct): ${tg(d.effA)}% \xB7 ${d.coverage.found}/${d.coverage.total} fields`:d.error||"Could not calculate",value:d.ok?(0,de.jsx)(Ss,{v:d.effB}):"\u2014"}),(0,de.jsx)(xs,{cls:"kpi-amber",label:"ASME PTC 4.1",sub:p.ok?`${p.coverage.found}/${p.coverage.total} fields detected`:p.error||"Could not calculate",value:p.ok?(0,de.jsx)(Ss,{v:p.eff}):"\u2014"}),(0,de.jsx)(xs,{cls:"kpi-red",label:"BEE-2 Indirect",sub:g.ok?`${g.coverage.found}/${g.coverage.total} fields detected`:g.error||"Could not calculate",value:g.ok?(0,de.jsx)(Ss,{v:g.eff}):"\u2014"})]}),(0,de.jsx)("div",{id:"summary-detail-tables"})]})]})}function Vd(){return(0,de.jsx)(Vt,{active:"/summary",children:(0,de.jsx)(Gh,{})})}var $n=V(Xe(),1);var M=V(K(),1),Ao=e=>typeof e=="number"&&!isNaN(e)?e.toFixed(2):"\u2014";function ng(e){let t=new Date(e);return t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})+"  "+t.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}var Yd=({icon:e,title:t,children:n})=>(0,M.jsxs)("div",{className:"empty-state",children:[(0,M.jsx)("div",{className:"empty-icon",children:e}),(0,M.jsx)("div",{className:"empty-title",children:t}),n!==void 0&&(0,M.jsx)("div",{className:"empty-sub",children:n})]}),Cs=({children:e=" %"})=>(0,M.jsx)("span",{style:{fontSize:"12px",fontWeight:400,color:"var(--muted2)"},children:e});function Vh({s:e,onOpen:t,onDelete:n}){let a=e.results||{},l=e.sessionName||(e.sourceFile&&e.sourceFile!=="Manual Entry"?e.sourceFile:null)||`Session ${e._id.slice(-6)}`;return(0,M.jsxs)("div",{className:"session-card",onClick:()=>t(e),children:[(0,M.jsx)("button",{className:"session-card-delete",onClick:i=>n(i,e._id),children:"\u{1F5D1}"}),(0,M.jsxs)("div",{className:"session-card-header",children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("div",{className:"session-card-title",children:l}),(0,M.jsx)("div",{className:"session-card-date",children:ng(e.uploadedAt||e.createdAt)})]}),(0,M.jsx)("div",{className:"session-card-source",title:e.sourceFile||"",children:e.sourceFile||"Manual"})]}),e.boilerType&&(0,M.jsx)("div",{className:"boiler-type-badge",style:{margin:"0 0 12px",display:"inline-block"},children:e.boilerType}),(0,M.jsxs)("div",{className:"session-kpis",children:[(0,M.jsxs)("div",{className:"session-kpi",children:[(0,M.jsx)("div",{className:"session-kpi-label",children:"Boiler Eff."}),(0,M.jsxs)("div",{className:"session-kpi-value green",children:[Ao(a.BoilerEff),(0,M.jsx)(Cs,{})]})]}),(0,M.jsxs)("div",{className:"session-kpi",children:[(0,M.jsx)("div",{className:"session-kpi-label",children:"Corr. Eff."}),(0,M.jsxs)("div",{className:"session-kpi-value blue",children:[Ao(a.BoilerEffCorr),(0,M.jsx)(Cs,{})]})]}),(0,M.jsxs)("div",{className:"session-kpi",children:[(0,M.jsx)("div",{className:"session-kpi-label",children:"Dry Gas Loss"}),(0,M.jsxs)("div",{className:"session-kpi-value red",children:[Ao(a.Ldg),(0,M.jsx)(Cs,{})]})]}),(0,M.jsxs)("div",{className:"session-kpi",children:[(0,M.jsx)("div",{className:"session-kpi-label",children:"Unburnt C Loss"}),(0,M.jsxs)("div",{className:"session-kpi-value amber",children:[Ao(a.Luc),(0,M.jsx)(Cs,{})]})]})]})]})}var Fe=({label:e,val:t,uom:n="",cls:a=""})=>(0,M.jsxs)("div",{className:"modal-row"+(a?" "+a:""),children:[(0,M.jsx)("span",{className:"modal-row-name",children:e}),(0,M.jsx)("span",{className:"modal-row-val",children:Ao(t)}),(0,M.jsx)("span",{className:"modal-row-uom",children:n})]});function Yh({s:e,onClose:t}){let n=e.results||{};return(0,M.jsx)("div",{className:"modal-overlay open",id:"modal-overlay",onClick:a=>{a.target===a.currentTarget&&t()},children:(0,M.jsxs)("div",{className:"modal",id:"modal",children:[(0,M.jsxs)("div",{className:"modal-header",children:[(0,M.jsx)("h3",{id:"modal-title",children:e.sessionName||e.sourceFile||`Session ${e._id.slice(-6)}`}),(0,M.jsx)("button",{className:"modal-close",onClick:t,children:"\u2715"})]}),(0,M.jsxs)("div",{className:"modal-body",id:"modal-body",children:[(0,M.jsxs)("div",{style:{fontSize:"11px",color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",marginBottom:"18px"},children:["Source: ",e.sourceFile||"Manual"," \xA0|\xA0 Saved: ",ng(e.uploadedAt||e.createdAt),e.boilerType?(0,M.jsxs)(M.Fragment,{children:[" \xA0|\xA0 Boiler: ",e.boilerType]}):null]}),(0,M.jsx)("div",{className:"modal-section-title",children:"Efficiency Results"}),(0,M.jsx)(Fe,{label:"Boiler Efficiency (as-tested)",val:n.BoilerEff,uom:"%",cls:"modal-highlight"}),(0,M.jsx)(Fe,{label:"Boiler Efficiency (corrected)",val:n.BoilerEffCorr,uom:"%",cls:"modal-highlight2"}),(0,M.jsx)("div",{className:"modal-section-title",children:"Losses"}),(0,M.jsx)(Fe,{label:"Dry Gas Loss",val:n.Ldg,uom:"%"}),(0,M.jsx)(Fe,{label:"Unburnt Carbon Loss",val:n.Luc,uom:"%"}),(0,M.jsx)(Fe,{label:"Moisture in Fuel Loss",val:n.Lmf,uom:"%"}),(0,M.jsx)(Fe,{label:"Hydrogen in Fuel Loss",val:n.Lhf,uom:"%"}),(0,M.jsx)(Fe,{label:"CO Loss",val:n.Lco,uom:"%"}),(0,M.jsx)(Fe,{label:"Moisture in Air Loss",val:n.Lma,uom:"%"}),(0,M.jsx)(Fe,{label:"Radiation Loss",val:n.Lrad,uom:"%"}),(0,M.jsx)("div",{className:"modal-section-title",children:"Corrected Losses"}),(0,M.jsx)(Fe,{label:"Dry Gas Loss (corr.)",val:n.Ldgc,uom:"%"}),(0,M.jsx)(Fe,{label:"Unburnt Carbon Loss (corr.)",val:n.Lucc,uom:"%"}),(0,M.jsx)(Fe,{label:"Moisture Fuel Loss (corr.)",val:n.Lmfc,uom:"%"}),(0,M.jsx)(Fe,{label:"Hydrogen Fuel Loss (corr.)",val:n.Lhfc,uom:"%"}),(0,M.jsx)(Fe,{label:"CO Loss (corr.)",val:n.Lcoc,uom:"%"}),(0,M.jsx)(Fe,{label:"Moisture Air Loss (corr.)",val:n.Lmac,uom:"%"}),(0,M.jsx)("div",{className:"modal-section-title",children:"Intermediate Values"}),(0,M.jsx)(Fe,{label:"CO\u2082 APH In",val:n.CO2in,uom:"%"}),(0,M.jsx)(Fe,{label:"CO\u2082 APH Out",val:n.CO2out,uom:"%"}),(0,M.jsx)(Fe,{label:"Weighted Air Temp In",val:n.Trai,uom:"\xB0C"}),(0,M.jsx)(Fe,{label:"AH Leakage",val:n.AL,uom:"%"}),(0,M.jsx)(Fe,{label:"Gas Temp (Corrected)",val:n.Tgc,uom:"\xB0C"}),e.inputs&&e.inputs.length>0&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("div",{className:"modal-section-title",children:"Input Parameters"}),e.inputs.map((a,l)=>(0,M.jsx)(Fe,{label:a.label||a.id,val:parseFloat(a.value)},l))]})]})]})})}function jh(){(0,$n.useEffect)(()=>{document.title="Boiler Efficiency \u2014 Sessions"},[]);let[e,t]=(0,$n.useState)({phase:"loading",sessions:[],error:""}),[n,a]=(0,$n.useState)(null),l=(0,$n.useCallback)(async()=>{t(p=>({...p,phase:"loading"}));try{let g=await(await it("/api/sessions")).json();if(!g.ok)throw new Error(g.error);t({phase:"ready",sessions:g.sessions,error:""})}catch(p){t({phase:"error",sessions:[],error:p.message})}},[]);(0,$n.useEffect)(()=>{l()},[l]),(0,$n.useEffect)(()=>{let p=g=>{g.key==="Escape"&&a(null)};return document.addEventListener("keydown",p),()=>document.removeEventListener("keydown",p)},[]);let i=async(p,g)=>{if(p.stopPropagation(),!!window.confirm("Delete this session?"))try{await it(`/api/sessions/${g}`,{method:"DELETE"}),l()}catch{}},{phase:o,sessions:r,error:s}=e,d=o==="ready"?r.length===1?"1 session":`${r.length} sessions`:"\u2014";return(0,M.jsxs)(M.Fragment,{children:[n&&(0,M.jsx)(Yh,{s:n,onClose:()=>a(null)}),(0,M.jsxs)("div",{className:"container",children:[(0,M.jsx)(nn,{}),(0,M.jsxs)("div",{className:"sessions-header",children:[(0,M.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,M.jsx)("h2",{children:"Saved Sessions"}),(0,M.jsx)("span",{className:"sessions-count",id:"sessions-count",children:d})]}),(0,M.jsx)("button",{className:"btn btn-ghost",onClick:l,style:{fontSize:"12px",padding:"8px 16px"},children:"\u21BB Refresh"})]}),(0,M.jsxs)("div",{id:"sessions-content",children:[o==="loading"&&(0,M.jsx)(Yd,{icon:"\u23F3",title:"Loading sessions\u2026",children:"Fetching data from the database."}),o==="error"&&(0,M.jsxs)(Yd,{icon:"\u26A0\uFE0F",title:"Could not load sessions",children:[s,(0,M.jsx)("br",{}),(0,M.jsx)("br",{}),"Make sure the server is running and MongoDB URI is configured in ",(0,M.jsx)("code",{children:".env"}),"."]}),o==="ready"&&!r.length&&(0,M.jsx)(Yd,{icon:"\u{1F4CB}",title:"No sessions yet",children:'Run a calculation and click "Save to Database" to store a session here.'}),o==="ready"&&r.length>0&&(0,M.jsx)("div",{className:"session-grid",id:"session-grid",children:r.map(p=>(0,M.jsx)(Vh,{s:p,onOpen:a,onDelete:i},p._id))})]})]})]})}function jd(){return(0,M.jsx)(Vt,{active:"/sessions",children:(0,M.jsx)(jh,{})})}var qd=V(K(),1),qh={"/calculator":Nd,"/bs-2885":Md,"/asme-ptc-4-1":Bd,"/bee":Hd,"/summary":Vd,"/sessions":jd};function Fd(){let e=e1(),t=qh[e],n=Zb();return(0,ag.useEffect)(()=>{t&&!n&&is("/")},[t,n]),t?n?(0,qd.jsx)(t,{},e):null:(0,qd.jsx)(gd,{})}var ig=V(K(),1);(0,lg.createRoot)(document.getElementById("root")).render((0,ig.jsx)(Fd,{}));})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
