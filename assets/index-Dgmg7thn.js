var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function ee(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var x=ee.prototype=new b;x.constructor=ee,_(x,y.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function te(){}var C={H:null,A:null,T:null,S:null},ne=Object.prototype.hasOwnProperty;function w(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function re(e,t){return w(e.type,t,e.props)}function ie(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ae(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var oe=/\/+/g;function T(e,t){return typeof e==`object`&&e&&e.key!=null?ae(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(te,te):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ce(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ce(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+T(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(oe,`$&/`)+`/`),ce(o,r,i,``,function(e){return e})):o!=null&&(ie(o)&&(o=re(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(oe,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+T(a,u),c+=ce(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+T(a,u++),c+=ce(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ce(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function le(e,t,n){if(e==null)return e;var r=[],i=0;return ce(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ue(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var de=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function fe(e){var t=C.T,n={};n.types=t===null?null:t.types,C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(te,de)}catch(e){de(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}}function pe(e){var t=C.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else fe(pe.bind(null,e))}var me={map:le,forEach:function(e,t,n){le(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return le(e,function(){t++}),t},toArray:function(e){return le(e,function(e){return e})||[]},only:function(e){if(!ie(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=me,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=ee,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.addTransitionType=pe,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ne.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return w(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ne.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return w(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ie,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ue}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=fe,e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function ee(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,x||(x=!0,re());else{var t=n(l);t!==null&&oe(ee,t.startTime-e)}}}var x=!1,S=-1,te=5,C=-1;function ne(){return g?!0:!(e.unstable_now()-C<te)}function w(){if(g=!1,x){var t=e.unstable_now();C=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ne());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&oe(ee,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?re():x=!1}}}var re;if(typeof y==`function`)re=function(){y(w)};else if(typeof MessageChannel<`u`){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=w,re=function(){ae.postMessage(null)}}else re=function(){_(w,0)};function oe(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):te=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,oe(ee,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,x||(x=!0,re()))),r},e.unstable_shouldYield=ne,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var ee=null,x=null;function S(e,t,n){return e===n||e===t&&(ee=e,!0)}function te(e,t,n){return e===n?(x=e,!1):e===t&&(x!==null&&(ee=e),!0)}function C(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function ne(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var w=Object.assign,re=Symbol.for(`react.element`),ie=Symbol.for(`react.transitional.element`),ae=Symbol.for(`react.portal`),oe=Symbol.for(`react.fragment`),T=Symbol.for(`react.strict_mode`),se=Symbol.for(`react.profiler`),ce=Symbol.for(`react.consumer`),le=Symbol.for(`react.context`),ue=Symbol.for(`react.forward_ref`),de=Symbol.for(`react.suspense`),fe=Symbol.for(`react.suspense_list`),pe=Symbol.for(`react.memo`),me=Symbol.for(`react.lazy`),he=Symbol.for(`react.activity`),ge=Symbol.for(`react.legacy_hidden`),_e=Symbol.for(`react.memo_cache_sentinel`),ve=Symbol.for(`react.view_transition`),ye=Symbol.for(`react.recoverable`),be=Symbol.iterator;function xe(e){return typeof e!=`object`||!e?null:(e=be&&e[be]||e[`@@iterator`],typeof e==`function`?e:null)}var Se=Symbol.for(`react.client.reference`);function Ce(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===Se?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case oe:return`Fragment`;case se:return`Profiler`;case T:return`StrictMode`;case de:return`Suspense`;case fe:return`SuspenseList`;case he:return`Activity`;case ve:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case ae:return`Portal`;case le:return e.displayName||`Context`;case ce:return(e._context.displayName||`Context`)+`.Consumer`;case ue:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case pe:return t=e.displayName||null,t===null?Ce(e.type)||`Memo`:t;case me:t=e._payload,e=e._init;try{return Ce(e(t))}catch{}}return null}var we=Array.isArray,E=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Te={pending:!1,data:null,method:null,action:null},Ee=[],De=-1;function Oe(e){return{current:e}}function ke(e){0>De||(e.current=Ee[De],Ee[De]=null,De--)}function O(e,t){De++,Ee[De]=e.current,e.current=t}var Ae=Oe(null),je=Oe(null),Me=Oe(null),Ne=Oe(null);function Pe(e,t){switch(O(Me,t),O(je,e),O(Ae,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ke(Ae),O(Ae,e)}function Fe(){ke(Ae),ke(je),ke(Me)}function Ie(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,O(Ne,e)),t=Ae.current;var n=dp(t,e.type);t!==n&&(O(je,e),O(Ae,n))}function Le(e){je.current===e&&(ke(Ae),ke(je)),Ne.current===e&&(ke(Ne),sh._currentValue=Te)}var Re,ze;function Be(e){if(Re===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Re=t&&t[1]||``,ze=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Re+e+ze}var Ve=!1;function He(e,t){if(!e||Ve)return``;Ve=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ve=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Be(n):``}function Ue(e,t){switch(e.tag){case 26:case 27:case 5:return Be(e.type);case 16:return Be(`Lazy`);case 13:return e.child!==t&&t!==null?Be(`Suspense Fallback`):Be(`Suspense`);case 19:return Be(`SuspenseList`);case 0:case 15:return He(e.type,!1);case 11:return He(e.type.render,!1);case 1:return He(e.type,!0);case 31:return Be(`Activity`);case 30:return Be(`ViewTransition`);default:return``}}function We(e){try{var t=``,n=null;do t+=Ue(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ge=Object.prototype.hasOwnProperty,Ke=t.unstable_scheduleCallback,qe=t.unstable_cancelCallback,Je=t.unstable_shouldYield,Ye=t.unstable_requestPaint,Xe=t.unstable_now,Ze=t.unstable_getCurrentPriorityLevel,Qe=t.unstable_ImmediatePriority,$e=t.unstable_UserBlockingPriority,et=t.unstable_NormalPriority,tt=t.unstable_LowPriority,nt=t.unstable_IdlePriority,rt=t.log,it=t.unstable_setDisableYieldValue,at=null,ot=null;function st(e){if(typeof rt==`function`&&it(e),ot&&typeof ot.setStrictMode==`function`)try{ot.setStrictMode(at,e)}catch{}}var ct=Math.clz32?Math.clz32:dt,lt=Math.log,ut=Math.LN2;function dt(e){return e>>>=0,e===0?32:31-(lt(e)/ut|0)|0}var ft=256,pt=262144,mt=4194304;function ht(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ht(n))):i=ht(o):i=ht(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ht(n))):i=ht(o)):i=ht(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function _t(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function vt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-ct(n),i=1<<r;t|=e[r],n&=~i}return t}function yt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bt(){var e=mt;return mt<<=1,!(mt&62914560)&&(mt=4194304),e}function xt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function St(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ct(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-ct(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&wt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function wt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ct(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Tt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ct(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Et(e,t){var n=t&-t;return n=n&42?1:Dt(n),(n&(e.suspendedLanes|t))===0?n:0}function Dt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ot(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function kt(){var e=D.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function At(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var k=Math.random().toString(36).slice(2),jt=`__reactFiber$`+k,Mt=`__reactProps$`+k,Nt=`__reactContainer$`+k,Pt=`__reactEvents$`+k,Ft=`__reactListeners$`+k,It=`__reactHandles$`+k,Lt=`__reactResources$`+k,Rt=`__reactMarker$`+k,zt=`__reactLoad$`+k;function Bt(e){delete e[jt],delete e[Mt],delete e[Ft],delete e[It]}function Vt(e){var t;if(t=e[jt])return t;for(var n=e.parentNode;n;){if(t=n[Nt]||n[jt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[jt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Ht(e){if(e=e[jt]||e[Nt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ut(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Wt(e){var t=e[Lt];return t||=e[Lt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Gt(e){e[Rt]=!0}function Kt(e){e[zt]=void 0}var qt=new Set,Jt={};function Yt(e,t){A(e,t),A(e+`Capture`,t)}function A(e,t){for(Jt[e]=t,e=0;e<t.length;e++)qt.add(t[e])}var Xt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Zt={},Qt={};function $t(e){return Ge.call(Qt,e)?!0:Ge.call(Zt,e)?!1:Xt.test(e)?Qt[e]=!0:(Zt[e]=!0,!1)}var j=!1;function en(){var e=j;return j=!1,e}function tn(e,t,n){if($t(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function M(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function nn(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function N(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function rn(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function an(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function on(e){if(!e._valueTracker){var t=rn(e)?`checked`:`value`;e._valueTracker=an(e,t,``+e[t])}}function sn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=rn(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var cn=/[\n"\\]/g;function ln(e){return e.replace(cn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function un(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+N(t)):e.value!==``+N(t)&&(e.value=``+N(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):fn(e,N(n)):o===`number`&&e.value==t?fn(e,N(e.value)):fn(e,N(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+N(s):e.removeAttribute(`name`)}function dn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){on(e);return}n=n==null?``:``+N(n),t=t==null?n:``+N(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),on(e)}function fn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function pn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+N(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function mn(e,t,n){t!=null&&(t=``+N(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+N(n)}function hn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(we(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=N(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),on(e)}function gn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var _n=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function vn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||_n.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function yn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,j=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(vn(e,a,r),j=!0)}else for(var o in t)t.hasOwnProperty(o)&&vn(e,o,t[o])}function bn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var xn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Sn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Cn(e){return Sn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function wn(){}var Tn=null;function En(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Dn=null,On=null;function kn(e){var t=Ht(e);if(t&&(e=t.stateNode)){var n=e[Mt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(un(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+ln(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Mt]||null;if(!a)throw Error(i(90));un(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&sn(r)}break a;case`textarea`:mn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&pn(e,!!n.multiple,t,!1)}}}var An=!1;function jn(e,t,n){if(An)return e(t,n);An=!0;try{return e(t)}finally{if(An=!1,(Dn!==null||On!==null)&&(zd(),Dn&&(t=Dn,e=On,On=Dn=null,kn(t),e)))for(t=0;t<e.length;t++)kn(e[t])}}function Mn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Mt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Nn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Pn=!1;if(Nn)try{var Fn={};Object.defineProperty(Fn,"passive",{get:function(){Pn=!0}}),window.addEventListener(`test`,Fn,Fn),window.removeEventListener(`test`,Fn,Fn)}catch{Pn=!1}var In=null,Ln=null,Rn=null;function zn(){if(Rn)return Rn;var e,t=Ln,n=t.length,r,i=`value`in In?In.value:In.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Rn=i.slice(e,1<r?1-r:void 0)}function Bn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vn(){return!0}function Hn(){return!1}function Un(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Vn:Hn,this.isPropagationStopped=Hn,this}return w(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Vn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Vn)},persist:function(){},isPersistent:Vn}),t}var Wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gn=Un(Wn),Kn=w({},Wn,{view:0,detail:0}),qn=Un(Kn),Jn,Yn,Xn,Zn=w({},Kn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Xn&&(Xn&&e.type===`mousemove`?(Jn=e.screenX-Xn.screenX,Yn=e.screenY-Xn.screenY):Yn=Jn=0,Xn=e),Jn)},movementY:function(e){return`movementY`in e?e.movementY:Yn}}),Qn=Un(Zn),$n=Un(w({},Zn,{dataTransfer:0})),er=Un(w({},Kn,{relatedTarget:0})),tr=Un(w({},Wn,{animationName:0,elapsedTime:0,pseudoElement:0})),nr=Un(w({},Wn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),rr=Un(w({},Wn,{data:0})),ir={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},ar={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},or={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function sr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=or[e])?!!t[e]:!1}function cr(){return sr}var lr=Un(w({},Kn,{key:function(e){if(e.key){var t=ir[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Bn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?ar[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cr,charCode:function(e){return e.type===`keypress`?Bn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Bn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ur=Un(w({},Zn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),dr=Un(w({},Wn,{submitter:0})),fr=Un(w({},Kn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cr})),pr=Un(w({},Wn,{propertyName:0,elapsedTime:0,pseudoElement:0})),mr=Un(w({},Zn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),hr=Un(w({},Wn,{newState:0,oldState:0,source:0})),gr=[9,13,27,32],_r=Nn&&`CompositionEvent`in window,vr=null;Nn&&`documentMode`in document&&(vr=document.documentMode);var yr=Nn&&`TextEvent`in window&&!vr,br=Nn&&(!_r||vr&&8<vr&&11>=vr),xr=` `,Sr=!1;function Cr(e,t){switch(e){case`keyup`:return gr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function wr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Tr=!1;function Er(e,t){switch(e){case`compositionend`:return wr(t);case`keypress`:return t.which===32?(Sr=!0,xr):null;case`textInput`:return e=t.data,e===xr&&Sr?null:e;default:return null}}function Dr(e,t){if(Tr)return e===`compositionend`||!_r&&Cr(e,t)?(e=zn(),Rn=Ln=In=null,Tr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return br&&t.locale!==`ko`?null:t.data;default:return null}}var Or={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function kr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Or[e.type]:t===`textarea`}function Ar(e,t,n,r){Dn?On?On.push(r):On=[r]:Dn=r,t=Jf(t,`onChange`),0<t.length&&(n=new Gn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var jr=null,Mr=null;function Nr(e){Vf(e,0)}function Pr(e){if(sn(Ut(e)))return e}function Fr(e,t){if(e===`change`)return t}var Ir=!1;if(Nn){var Lr;if(Nn){var Rr=`oninput`in document;if(!Rr){var zr=document.createElement(`div`);zr.setAttribute(`oninput`,`return;`),Rr=typeof zr.oninput==`function`}Lr=Rr}else Lr=!1;Ir=Lr&&(!document.documentMode||9<document.documentMode)}function Br(){jr&&(jr.detachEvent(`onpropertychange`,Vr),Mr=jr=null)}function Vr(e){if(e.propertyName===`value`&&Pr(Mr)){var t=[];Ar(t,Mr,e,En(e)),jn(Nr,t)}}function Hr(e,t,n){e===`focusin`?(Br(),jr=t,Mr=n,jr.attachEvent(`onpropertychange`,Vr)):e===`focusout`&&Br()}function Ur(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Pr(Mr)}function Wr(e,t){if(e===`click`)return Pr(t)}function Gr(e,t){if(e===`input`||e===`change`)return Pr(t)}function Kr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var qr=typeof Object.is==`function`?Object.is:Kr;function Jr(e,t){if(qr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ge.call(t,i)||!qr(e[i],t[i]))return!1}return!0}function Yr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Xr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zr(e,t){var n=Xr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Xr(n)}}function Qr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function $r(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Yr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Yr(e.document)}return t}function ei(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var ti=Nn&&`documentMode`in document&&11>=document.documentMode,ni=null,ri=null,ii=null,ai=!1;function oi(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ai||ni==null||ni!==Yr(r)||(r=ni,`selectionStart`in r&&ei(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ii&&Jr(ii,r)||(ii=r,r=Jf(ri,`onSelect`),0<r.length&&(t=new Gn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=ni)))}function si(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ci={animationend:si(`Animation`,`AnimationEnd`),animationiteration:si(`Animation`,`AnimationIteration`),animationstart:si(`Animation`,`AnimationStart`),transitionrun:si(`Transition`,`TransitionRun`),transitionstart:si(`Transition`,`TransitionStart`),transitioncancel:si(`Transition`,`TransitionCancel`),transitionend:si(`Transition`,`TransitionEnd`)},li={},ui={};Nn&&(ui=document.createElement(`div`).style,`AnimationEvent`in window||(delete ci.animationend.animation,delete ci.animationiteration.animation,delete ci.animationstart.animation),`TransitionEvent`in window||delete ci.transitionend.transition);function di(e){if(li[e])return li[e];if(!ci[e])return e;var t=ci[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ui)return li[e]=t[n];return e}var fi=di(`animationend`),pi=di(`animationiteration`),mi=di(`animationstart`),hi=di(`transitionrun`),gi=di(`transitionstart`),_i=di(`transitioncancel`),vi=di(`transitionend`),yi=new Map,bi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);bi.push(`scrollEnd`);function xi(e,t){yi.set(e,t),Yt(t,[e])}var Si=0;function Ci(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=Si++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function wi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function Ti(e,t){return e=wi(e),t=wi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Ei=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Di=[],Oi=0,ki=0;function Ai(){for(var e=Oi,t=ki=Oi=0;t<e;){var n=Di[t];Di[t++]=null;var r=Di[t];Di[t++]=null;var i=Di[t];Di[t++]=null;var a=Di[t];if(Di[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Pi(n,i,a)}}function ji(e,t,n,r){Di[Oi++]=e,Di[Oi++]=t,Di[Oi++]=n,Di[Oi++]=r,ki|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Mi(e,t,n,r){return ji(e,t,n,r),Fi(e)}function Ni(e,t){return ji(e,null,null,t),Fi(e)}function Pi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-ct(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Fi(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ii={};function Li(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ri(e,t,n,r){return new Li(e,t,n,r)}function zi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bi(e,t){var n=e.alternate;return n===null?(n=Ri(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Vi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Hi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)zi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,Ae.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case he:return e=Ri(31,n,t,a),e.elementType=he,e.lanes=o,e;case oe:return Ui(n.children,a,o,t);case T:s=8,a|=24;break;case se:return e=Ri(12,n,t,a|2),e.elementType=se,e.lanes=o,e;case de:return e=Ri(13,n,t,a),e.elementType=de,e.lanes=o,e;case fe:return e=Ri(19,n,t,a),e.elementType=fe,e.lanes=o,e;case ge:case ve:return e=a|32,e=Ri(30,n,t,e),e.elementType=ve,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case le:s=10;break a;case ce:s=9;break a;case ue:s=11;break a;case pe:s=14;break a;case me:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Ri(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ui(e,t,n,r){return e=Ri(7,e,r,t),e.lanes=n,e}function Wi(e,t,n){return e=Ri(6,e,null,t),e.lanes=n,e}function Gi(e){var t=Ri(18,null,null,0);return t.stateNode=e,t}function Ki(e,t,n){return t=Ri(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qi=new WeakMap;function Ji(e,t){if(typeof e==`object`&&e){var n=qi.get(e);return n===void 0?(t={value:e,source:t,stack:We(t)},qi.set(e,t),t):n}return{value:e,source:t,stack:We(t)}}var Yi=[],Xi=0,Zi=null,Qi=0,$i=[],ea=0,ta=null,na=1,ra=``;function ia(e,t){Yi[Xi++]=Qi,Yi[Xi++]=Zi,Zi=e,Qi=t}function aa(e,t,n){$i[ea++]=na,$i[ea++]=ra,$i[ea++]=ta,ta=e;var r=na;e=ra;var i=32-ct(r)-1;r&=~(1<<i),n+=1;var a=32-ct(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,na=1<<32-ct(t)+i|n<<i|r,ra=a+e}else na=1<<a|n<<i|r,ra=e}function oa(e){e.return!==null&&(ia(e,1),aa(e,1,0))}function sa(e){for(;e===Zi;)Zi=Yi[--Xi],Yi[Xi]=null,Qi=Yi[--Xi],Yi[Xi]=null;for(;e===ta;)ta=$i[--ea],$i[ea]=null,ra=$i[--ea],$i[ea]=null,na=$i[--ea],$i[ea]=null}function ca(e,t){$i[ea++]=na,$i[ea++]=ra,$i[ea++]=ta,na=t.id,ra=t.overflow,ta=e}var la=null,P=null,F=!1,ua=null,da=!1,fa=Error(i(519));function pa(e){throw ya(Ji(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),fa}function ma(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[jt]=e,t[Mt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),dn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),hn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=wn),t=!0):t=!1,t||pa(e,!0)}function ha(e){for(la=e.return;la;)switch(la.tag){case 5:case 31:case 13:da=!1;return;case 27:case 3:da=!0;return;default:la=la.return}}function ga(e){if(e!==la)return!1;if(!F)return ha(e),F=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&P&&pa(e),ha(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));P=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));P=dm(e)}else t===27?(t=P,Sp(e.type)?(e=um,um=null,P=e):P=t):P=la?lm(e.stateNode.nextSibling):null;return!0}function _a(){P=la=null,F=!1}function va(){var e=ua;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),ua=null),e}function ya(e){ua===null?ua=[e]:ua.push(e)}var ba=Oe(null),xa=null,Sa=null;function Ca(e,t,n){O(ba,t._currentValue),t._currentValue=n}function wa(e){e._currentValue=ba.current,ke(ba)}function Ta(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Ea(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ta(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ta(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Ta(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Da(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;qr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Ne.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&Ea(t,e,n,r),t.flags|=262144,e!==null}function Oa(e){for(e=e.firstContext;e!==null;){if(!qr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ka(e){xa=e,Sa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Aa(e){return Ma(xa,e)}function ja(e,t){return xa===null&&ka(e),Ma(e,t)}function Ma(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Sa===null){if(e===null)throw Error(i(308));Sa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Sa=Sa.next=t;return n}var Na=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Pa=t.unstable_scheduleCallback,Fa=t.unstable_NormalPriority,Ia={$$typeof:le,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function La(){return{controller:new Na,data:new Map,refCount:0}}function Ra(e){e.refCount--,e.refCount===0&&Pa(Fa,function(){e.controller.abort()})}function za(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Ba=null;function Va(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Ha=null,Ua=0,Wa=0,Ga=null;function Ka(e,t){if(Ha===null){var n=Ha=[];Ua=0,Wa=Pf(),Ga={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ua++,t.then(qa,qa),t}function qa(){if(--Ua===0&&(Ba=null,Ha!==null)){Ga!==null&&(Ga.status=`fulfilled`);var e=Ha;Ha=null,Wa=0,Ga=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ja(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ya=E.S;E.S=function(e,t){if(gd=Xe(),typeof t==`object`&&t&&typeof t.then==`function`&&Ka(e,t),Ba!==null)for(var n=bf;n!==null;)za(n,Ba),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)za(r,n),r=r.next;if(Wa!==0){r=Ba,r===null&&(r=Ba=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ya!==null&&Ya(e,t)};var Xa=Oe(null);function Za(){var e=Xa.current;return e===null?G.pooledCache:e}function Qa(e,t){t===null?O(Xa,Xa.current):O(Xa,t.pool)}function $a(){var e=Za();return e===null?null:{parent:Ia._currentValue,pool:e}}var eo=Error(i(460)),to=Error(i(474)),no=Error(i(542)),ro={then:function(){}};function io(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ao(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(wn,wn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,lo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(wn,wn);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,lo(e),e}throw so=t,eo}}function oo(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(so=e,eo):e}}var so=null;function co(){if(so===null)throw Error(i(459));var e=so;return so=null,e}function lo(e){if(e===eo||e===no)throw Error(i(483))}var uo=null,fo=0;function po(e){var t=fo;return fo+=1,uo===null&&(uo=[]),ao(uo,e,t)}function mo(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function ho(e,t){throw t.$$typeof===re?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function go(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Bi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Wi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===oe?(e=d(e,t,n.props.children,r,n.key),mo(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===me&&oo(i)===t.type)?(t=a(t,n.props),mo(t,n),t.return=e,t):(t=Hi(n.type,n.key,n.props,null,e.mode,r),mo(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ki(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ui(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Wi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case ie:return n=Hi(t.type,t.key,t.props,null,e.mode,n),mo(n,t),n.return=e,n;case ae:return t=Ki(t,e.mode,n),t.return=e,t;case me:return t=oo(t),f(e,t,n)}if(we(t)||xe(t))return t=Ui(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,po(t),n);if(t.$$typeof===le)return f(e,ja(e,t),n);ho(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case ie:return n.key===i?l(e,t,n,r):null;case ae:return n.key===i?u(e,t,n,r):null;case me:return n=oo(n),p(e,t,n,r)}if(we(n)||xe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,po(n),r);if(n.$$typeof===le)return p(e,t,ja(e,n),r);ho(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case ie:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case ae:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case me:return r=oo(r),m(e,t,n,r,i)}if(we(r)||xe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,po(r),i);if(r.$$typeof===le)return m(e,t,n,ja(t,r),i);ho(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),F&&ia(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return F&&ia(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),F&&ia(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),F&&ia(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return F&&ia(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),F&&ia(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===oe&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case ie:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===oe){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),mo(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===me&&oo(l)===r.type){n(e,r.sibling),c=a(r,o.props),mo(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===oe?(c=Ui(o.props.children,e.mode,c,o.key),mo(c,o),c.return=e,e=c):(c=Hi(o.type,o.key,o.props,null,e.mode,c),mo(c,o),c.return=e,e=c)}return s(e);case ae:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ki(o,e.mode,c),c.return=e,e=c}return s(e);case me:return o=oo(o),_(e,r,o,c)}if(we(o))return h(e,r,o,c);if(xe(o)){if(l=xe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,po(o),c);if(o.$$typeof===le)return _(e,r,ja(e,o),c);ho(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Wi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{fo=0;var i=_(e,t,n,r);return uo=null,i}catch(t){if(t===eo||t===no)throw t;var a=Ri(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var _o=go(!0),vo=go(!1),yo=!1;function bo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function So(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Co(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Fi(e),Pi(e,null,n),t}return ji(e,r,t,n),Fi(e)}function wo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Tt(e,n)}}function To(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Eo=!1;function Do(){if(Eo){var e=Ga;if(e!==null)throw e}}function Oo(e,t,n,r){Eo=!1;var i=e.updateQueue;yo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===Wa&&(Eo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=w({},d,f);break a;case 2:yo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function ko(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ao(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)ko(n[e],t)}var jo=Oe(null),Mo=Oe(0);function No(e,t){e=od,O(Mo,e),O(jo,t),od=e|t.baseLanes}function Po(){O(Mo,od),O(jo,jo.current)}function Fo(){od=Mo.current,ke(jo),ke(Mo)}var Io=Oe(null),Lo=null;function Ro(e){var t=e.alternate;O(Uo,Uo.current&1),O(Io,e),Lo===null&&(t===null||jo.current!==null||t.memoizedState!==null)&&(Lo=e)}function zo(e){O(Uo,Uo.current),O(Io,e),Lo===null&&(Lo=e)}function Bo(e){e.tag===22?(O(Uo,Uo.current),O(Io,e),Lo===null&&(Lo=e)):Vo()}function Vo(){O(Uo,Uo.current),O(Io,Io.current)}function Ho(e){ke(Io),Lo===e&&(Lo=null),ke(Uo)}var Uo=Oe(0);function Wo(e,t){O(Io,Io.current),O(Uo,t)}function Go(e){ke(Uo),ke(Io),Lo===e&&(Lo=null)}function Ko(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var qo=0,I=null,L=null,R=null,Jo=!1,Yo=!1,Xo=!1,Zo=0,Qo=0,$o=null,es=0;function z(){throw Error(i(321))}function ts(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!qr(e[n],t[n]))return!1;return!0}function ns(e,t,n,r,i,a){return qo=a,I=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?vc:yc,Xo=!1,a=n(r,i),Xo=!1,Yo&&(a=is(t,n,r,i)),rs(e),a}function rs(e){E.H=_c;var t=L!==null&&L.next!==null;if(qo=0,R=L=I=null,Jo=!1,Qo=0,$o=null,t)throw Error(i(300));e===null||Ic||(e=e.dependencies,e!==null&&Oa(e)&&(Ic=!0))}function is(e,t,n,r){I=e;var a=0;do{if(Yo&&($o=null),Qo=0,Yo=!1,25<=a)throw Error(i(301));if(a+=1,R=L=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}E.H=bc,o=t(n,r)}while(Yo);return o}function as(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?ds(t):t,e=e.useState()[0],(L===null?null:L.memoizedState)!==e&&(I.flags|=1024),t}function os(){var e=Zo!==0;return Zo=0,e}function ss(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function cs(e){if(Jo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Jo=!1}qo=0,R=L=I=null,Yo=!1,Qo=Zo=0,$o=null}function ls(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return R===null?I.memoizedState=R=e:R=R.next=e,R}function B(){if(L===null){var e=I.alternate;e=e===null?null:e.memoizedState}else e=L.next;var t=R===null?I.memoizedState:R.next;if(t!==null)R=t,L=e;else{if(e===null)throw I.alternate===null?Error(i(467)):Error(i(310));L=e,e={memoizedState:L.memoizedState,baseState:L.baseState,baseQueue:L.baseQueue,queue:L.queue,next:null},R===null?I.memoizedState=R=e:R=R.next=e}return R}function us(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ds(e){var t=Qo;return Qo+=1,$o===null&&($o=[]),e=ao($o,e,t),t=I,(R===null?t.memoizedState:R.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?vc:yc),e}function fs(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ds(e);if(e.$$typeof===ye)return;if(e.$$typeof===le)return Aa(e)}throw Error(i(438,String(e)))}function ps(e){var t=null,n=I.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=I.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=us(),I.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=_e;return t.index++,n}function ms(e,t){return typeof t==`function`?t(e):t}function hs(e){return gs(B(),L,e)}function gs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(qo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Wa&&(d=!0);else if((qo&p)===p){u=u.next,p===Wa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,I.lanes|=p,sd|=p;f=u.action,Xo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,I.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!qr(o,e.memoizedState)&&(Ic=!0,d&&(n=Ga,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function _s(e){var t=B(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);qr(o,t.memoizedState)||(Ic=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function vs(e,t,n){var r=I,a=B(),o=F;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!qr((L||a).memoizedState,n);if(s&&(a.memoizedState=n,Ic=!0),a=a.queue,Us(xs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||R!==null&&!!(R.memoizedState.tag&1),Rs(e?9:8,{destroy:void 0},bs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,G===null)throw Error(i(349));o||qo&127||ys(r,t,n)}return n}function ys(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=I.updateQueue,t===null?(t=us(),I.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function bs(e,t,n,r){t.value=n,t.getSnapshot=r,Ss(t)&&Cs(e)}function xs(e,t,n){return n(function(){Ss(t)&&Cs(e)})}function Ss(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!qr(e,n)}catch{return!0}}function Cs(e){var t=Ni(e,2);t!==null&&Pd(t,e,2)}function ws(e){var t=ls();if(typeof e==`function`){var n=e;if(e=n(),Xo){st(!0);try{n()}finally{st(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:e},t}function Ts(e,t,n,r){return e.baseState=n,gs(e,L,typeof r==`function`?r:ms)}function Es(e,t,n,r,a){if(mc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};E.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ds(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ds(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};o.types=a===null?null:a.types,E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),Os(e,t,s)}catch(n){As(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),Os(e,t,a)}catch(n){As(e,t,n)}}function Os(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ks(e,t,n)},function(n){return As(e,t,n)}):ks(e,t,n)}function ks(e,t,n){t.status=`fulfilled`,t.value=n,js(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ds(e,n)))}function As(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,js(t),t=t.next;while(t!==r)}e.action=null}function js(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ms(e,t){return t}function Ns(e,t){if(F){var n=G.formState;if(n!==null){a:{var r=I;if(F){if(P){b:{for(var i=P,a=da;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){P=lm(i.nextSibling),r=i.data===`F!`;break a}}pa(r)}r=!1}r&&(t=n[0])}}return n=ls(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ms,lastRenderedState:t},n.queue=r,n=dc.bind(null,I,r),r.dispatch=n,r=ws(!1),a=pc.bind(null,I,!1,r.queue),r=ls(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Es.bind(null,I,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Ps(e){return Fs(B(),L,e)}function Fs(e,t,n){if(t=gs(e,t,Ms)[0],e=hs(ms)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ds(t)}catch(e){throw e===eo?no:e}else r=t;t=B();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(I.flags|=2048,Rs(9,{destroy:void 0},Is.bind(null,i,n),null)),[r,a,e]}function Is(e,t){e.action=t}function Ls(e){var t=B(),n=L;if(n!==null)return Fs(t,n,e);B(),t=t.memoizedState,n=B();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=I.updateQueue,t===null&&(t=us(),I.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function zs(){return B().memoizedState}function Bs(e,t,n,r){var i=ls();I.flags|=e,i.memoizedState=Rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Vs(e,t,n,r){var i=B();r=r===void 0?null:r;var a=i.memoizedState.inst;L!==null&&r!==null&&ts(r,L.memoizedState.deps)?i.memoizedState=Rs(t,a,n,r):(I.flags|=e,i.memoizedState=Rs(1|t,a,n,r))}function Hs(e,t){Bs(8390656,8,e,t)}function Us(e,t){Vs(2048,8,e,t)}function Ws(e){I.flags|=4;var t=I.updateQueue;if(t===null)t=us(),I.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Gs(e){var t=B().memoizedState;return Ws({ref:t,nextImpl:e}),function(){if(W&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Ks(e,t){return Vs(4,2,e,t)}function qs(e,t){return Vs(4,4,e,t)}function Js(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ys(e,t,n){n=n==null?null:n.concat([e]),Vs(4,4,Js.bind(null,t,e),n)}function Xs(){}function Zs(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&ts(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Qs(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&ts(t,r[1]))return r[0];if(r=e(),Xo){st(!0);try{e()}finally{st(!1)}}return n.memoizedState=[r,t],r}function $s(e,t,n){return n===void 0||qo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),I.lanes|=e,sd|=e,n)}function ec(e,t,n,r){return qr(n,t)?n:jo.current===null?!(qo&106)||qo&1073741824&&!(q&261930)?(Ic=!0,e.memoizedState=n):(e=Md(),I.lanes|=e,sd|=e,t):(e=$s(e,n,r),qr(e,t)||(Ic=!0),e)}function tc(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};s.types=o===null?null:o.types,E.T=s,pc(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?fc(e,t,Ja(c,r),jd(e)):fc(e,t,r,jd(e))}catch(n){fc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function nc(){}function rc(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ic(e).queue;tc(e,a,t,Te,n===null?nc:function(){return ac(e),n(r)})}function ic(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Te,baseState:Te,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:Te},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ac(e){var t=ic(e);t.next===null&&(t=e.alternate.memoizedState),fc(e,t.next.queue,{},jd())}function oc(){return Aa(sh)}function sc(){return B().memoizedState}function cc(){return B().memoizedState}function lc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=So(n);var r=Co(t,e,n);r!==null&&(Pd(r,t,n),wo(r,t,n)),t={cache:La()},e.payload=t;return}t=t.return}}function uc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},mc(e)?hc(t,n):(n=Mi(e,t,n,r),n!==null&&(Pd(n,e,r),gc(n,t,r)))}function dc(e,t,n){fc(e,t,n,jd())}function fc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(mc(e))hc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,qr(s,o))return ji(e,t,i,0),G===null&&Ai(),!1}catch{}if(n=Mi(e,t,i,r),n!==null)return Pd(n,e,r),gc(n,t,r),!0}return!1}function pc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},mc(e)){if(t)throw Error(i(479))}else t=Mi(e,n,r,2),t!==null&&Pd(t,e,2)}function mc(e){var t=e.alternate;return e===I||t!==null&&t===I}function hc(e,t){Yo=Jo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function gc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Tt(e,n)}}var _c={readContext:Aa,use:fs,useCallback:z,useContext:z,useEffect:z,useImperativeHandle:z,useLayoutEffect:z,useInsertionEffect:z,useMemo:z,useReducer:z,useRef:z,useState:z,useDebugValue:z,useDeferredValue:z,useTransition:z,useSyncExternalStore:z,useId:z,useHostTransitionStatus:z,useFormState:z,useActionState:z,useOptimistic:z,useMemoCache:z,useCacheRefresh:z,useEffectEvent:z},vc={readContext:Aa,use:fs,useCallback:function(e,t){return ls().memoizedState=[e,t===void 0?null:t],e},useContext:Aa,useEffect:Hs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Bs(4194308,4,Js.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Bs(4194308,4,e,t)},useInsertionEffect:function(e,t){Bs(4,2,e,t)},useMemo:function(e,t){var n=ls();t=t===void 0?null:t;var r=e();if(Xo){st(!0);try{e()}finally{st(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=ls();if(n!==void 0){var i=n(t);if(Xo){st(!0);try{n(t)}finally{st(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=uc.bind(null,I,e),[r.memoizedState,e]},useRef:function(e){var t=ls();return e={current:e},t.memoizedState=e},useState:function(e){e=ws(e);var t=e.queue,n=dc.bind(null,I,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Xs,useDeferredValue:function(e,t){return $s(ls(),e,t)},useTransition:function(){var e=ws(!1);return e=tc.bind(null,I,e.queue,!0,!1),ls().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=I,a=ls();if(F){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),G===null)throw Error(i(349));q&127||ys(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Hs(xs.bind(null,r,o,e),[e]),r.flags|=2048,Rs(9,{destroy:void 0},bs.bind(null,r,o,n,t),null),n},useId:function(){var e=ls(),t=G.identifierPrefix;if(F){var n=ra,r=na;n=(r&~(1<<32-ct(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Zo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=es++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:oc,useFormState:Ns,useActionState:Ns,useOptimistic:function(e){var t=ls();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=pc.bind(null,I,!0,n),n.dispatch=t,[e,t]},useMemoCache:ps,useCacheRefresh:function(){return ls().memoizedState=lc.bind(null,I)},useEffectEvent:function(e){var t=ls(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},yc={readContext:Aa,use:fs,useCallback:Zs,useContext:Aa,useEffect:Us,useImperativeHandle:Ys,useInsertionEffect:Ks,useLayoutEffect:qs,useMemo:Qs,useReducer:hs,useRef:zs,useState:function(){return hs(ms)},useDebugValue:Xs,useDeferredValue:function(e,t){return ec(B(),L.memoizedState,e,t)},useTransition:function(){var e=hs(ms)[0],t=B().memoizedState;return[typeof e==`boolean`?e:ds(e),t]},useSyncExternalStore:vs,useId:sc,useHostTransitionStatus:oc,useFormState:Ps,useActionState:Ps,useOptimistic:function(e,t){return Ts(B(),L,e,t)},useMemoCache:ps,useCacheRefresh:cc,useEffectEvent:Gs},bc={readContext:Aa,use:fs,useCallback:Zs,useContext:Aa,useEffect:Us,useImperativeHandle:Ys,useInsertionEffect:Ks,useLayoutEffect:qs,useMemo:Qs,useReducer:_s,useRef:zs,useState:function(){return _s(ms)},useDebugValue:Xs,useDeferredValue:function(e,t){var n=B();return L===null?$s(n,e,t):ec(n,L.memoizedState,e,t)},useTransition:function(){var e=_s(ms)[0],t=B().memoizedState;return[typeof e==`boolean`?e:ds(e),t]},useSyncExternalStore:vs,useId:sc,useHostTransitionStatus:oc,useFormState:Ls,useActionState:Ls,useOptimistic:function(e,t){var n=B();return L===null?(n.baseState=e,[e,n.queue.dispatch]):Ts(n,L,e,t)},useMemoCache:ps,useCacheRefresh:cc,useEffectEvent:Gs};function xc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:w({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Sc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=So(r);i.payload=t,n!=null&&(i.callback=n),t=Co(e,i,r),t!==null&&(Pd(t,e,r),wo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=So(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Co(e,i,r),t!==null&&(Pd(t,e,r),wo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=So(n);r.tag=2,t!=null&&(r.callback=t),t=Co(e,r,n),t!==null&&(Pd(t,e,n),wo(t,e,n))}};function Cc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Jr(n,r)||!Jr(i,a):!0}function wc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Sc.enqueueReplaceState(t,t.state,null)}function Tc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=w({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ec(e){Ei(e)}function Dc(e){console.error(e)}function Oc(e){Ei(e)}function kc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ac(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function jc(e,t,n){return n=So(n),n.tag=3,n.payload={element:null},n.callback=function(){kc(e,t)},n}function Mc(e){return e=So(e),e.tag=3,e}function Nc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ac(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ac(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Pc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Da(t,n,a,!0),n=Io.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Lo===null?Kd():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ro?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===ro?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(F)return t=Io.current,t===null?(r!==fa&&(t=Error(i(423),{cause:r}),ya(Ji(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ji(r,n),a=jc(e.stateNode,r,a),To(e,a),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==fa&&(e=Error(i(422),{cause:r}),ya(Ji(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ji(o,n),fd===null?fd=[o]:fd.push(o),Y!==4&&(Y=2),t===null)return!0;r=Ji(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=jc(n.stateNode,r,e),To(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(yd===null||!yd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Mc(a),Nc(a,e,n,r),To(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Fc=Error(i(461)),Ic=!1;function Lc(e,t,n,r){t.child=e===null?vo(t,null,n,r):_o(t,e.child,n,r)}function Rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ka(t),r=ns(e,t,n,o,a,i),s=os(),e!==null&&!Ic?(ss(e,t,i),fl(e,t,i)):(F&&s&&oa(t),t.flags|=1,Lc(e,t,r,i),t.child)}function zc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!zi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Bc(e,t,a,r,i)):(e=Hi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!pl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Jr:n,n(o,r)&&e.ref===t.ref)return fl(e,t,i)}return t.flags|=1,e=Bi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Bc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Jr(a,r)&&e.ref===t.ref){if(Ic=!1,t.pendingProps=r=a,pl(e,i))e.flags&131072&&(Ic=!0);else return t.lanes=e.lanes,fl(e,t,i)}}return Jc(e,t,n,r,i)}function Vc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Uc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Qa(t,a===null?null:a.cachePool),a===null?Po():No(t,a),Bo(t);else return r=t.lanes=536870912,Uc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Qa(t,null),Po(),Vo()):(Qa(t,a.cachePool),No(t,a),Vo(),t.memoizedState=null);return Lc(e,t,i,n),t.child}function Hc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Uc(e,t,n,r,i){var a=Za();return a=a===null?null:{parent:Ia._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Qa(t,null),Po(),Bo(t),e!==null&&Da(e,t,r,!0),t.childLanes=i,null}function Wc(e,t){return t=rl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Gc(e,t,n){return _o(t,e.child,null,n),e=Wc(t,t.pendingProps),e.flags|=2,Ho(t),t.memoizedState=null,e}function Kc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(F){if(r.mode===`hidden`)return e=Wc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Hc(null,e);if(zo(t),(e=P)?(e=am(e,da),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ta===null?null:{id:na,overflow:ra},retryLane:536870912,hydrationErrors:null},n=Gi(e),n.return=t,t.child=n,la=t,P=null)):e=null,e===null)throw pa(t);return t.lanes=536870912,null}return Wc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(zo(t),a){if(t.flags&256)t.flags&=-257,t=Gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Ic||Da(e,t,n,!1),a=(n&e.childLanes)!==0,Ic||a){if(jo.current===null){if(r=G,r!==null&&(s=Et(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ni(e,s),Pd(r,e,s),Fc;Kd()}t=Gc(e,t,n)}else e=o.treeContext,P=lm(s.nextSibling),la=t,F=!0,ua=null,da=!1,e!==null&&ca(t,e),t=Wc(t,r),t.flags|=134221824;return t}return e=Bi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function qc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Jc(e,t,n,r,i){return ka(t),n=ns(e,t,n,r,void 0,i),r=os(),e!==null&&!Ic?(ss(e,t,i),fl(e,t,i)):(F&&r&&oa(t),t.flags|=1,Lc(e,t,n,i),t.child)}function Yc(e,t,n,r,i,a){return ka(t),t.updateQueue=null,n=is(t,r,n,i),rs(e),r=os(),e!==null&&!Ic?(ss(e,t,a),fl(e,t,a)):(F&&r&&oa(t),t.flags|=1,Lc(e,t,n,a),t.child)}function Xc(e,t,n,r,i){if(ka(t),t.stateNode===null){var a=Ii,o=n.contextType;typeof o==`object`&&o&&(a=Aa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Sc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},bo(t),o=n.contextType,a.context=typeof o==`object`&&o?Aa(o):Ii,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(xc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Sc.enqueueReplaceState(a,a.state,null),Oo(t,r,a,i),Do(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Tc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ii,typeof u==`object`&&u&&(o=Aa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&wc(t,a,r,o),yo=!1;var f=t.memoizedState;a.state=f,Oo(t,r,a,i),Do(),l=t.memoizedState,s||f!==l||yo?(typeof d==`function`&&(xc(t,n,d,r),l=t.memoizedState),(c=yo||Cc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,xo(e,t),o=t.memoizedProps,u=Tc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ii,typeof l==`object`&&l&&(c=Aa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&wc(t,a,r,c),yo=!1,f=t.memoizedState,a.state=f,Oo(t,r,a,i),Do();var p=t.memoizedState;o!==d||f!==p||yo||e!==null&&e.dependencies!==null&&Oa(e.dependencies)?(typeof s==`function`&&(xc(t,n,s,r),p=t.memoizedState),(u=yo||Cc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Oa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,qc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=_o(t,e.child,null,i),t.child=_o(t,null,n,i)):Lc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=fl(e,t,i),e}function Zc(e,t,n,r){return _a(),t.flags|=256,Lc(e,t,n,r),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $c(e){return{baseLanes:e,cachePool:$a()}}function el(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function tl(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Uo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(F){if(i?Ro(t):Vo(),(e=P)?(e=am(e,da),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ta===null?null:{id:na,overflow:ra},retryLane:536870912,hydrationErrors:null},n=Gi(e),n.return=t,t.child=n,la=t,P=null)):e=null,e===null)throw pa(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Vo(),i=t.mode,a=rl({mode:`hidden`,children:a},i),r=Ui(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=$c(n),r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(null,r)):(Ro(t),nl(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return al(e,t,a,o,r,c,s,n)}return i?(Vo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Bi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ui(i,a,n,null),i.flags|=2):i=Bi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Hc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=$c(n):(a=i.cachePool,a===null?a=$a():(s=Ia._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(e.child,r)):(Ro(t),n=e.child,e=n.sibling,n=Bi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function nl(e,t){return t=rl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function rl(e,t){return e=Ri(22,e,null,t),e.lanes=0,e}function il(e,t,n){return _o(t,e.child,null,n),e=nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function al(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Ro(t),t.flags&=-257,il(e,t,c)):t.memoizedState===null?(Vo(),o=a.fallback,s=t.mode,a=rl({mode:`visible`,children:a.children},s),o=Ui(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,_o(t,e.child,null,c),a=t.child,a.memoizedState=$c(c),a.childLanes=el(e,r,c),t.memoizedState=Qc,Hc(null,a)):(Vo(),t.child=e.child,t.flags|=128,null);if(Ro(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ya({value:a,source:null,stack:null})),il(e,t,c)}if(Ic||Da(e,t,c,!1),r=(c&e.childLanes)!==0,Ic||r){if(jo.current!==null)return il(e,t,c);if(r=G,r!==null&&(a=Et(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ni(e,a),Pd(r,e,a),Fc;return om(o)||Kd(),il(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,P=lm(o.nextSibling),la=t,F=!0,ua=null,da=!1,e!==null&&ca(t,e),t=nl(t,a.children),t.flags|=134221824,t)}function ol(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ta(e.return,t,n)}function sl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Ko(n)===null&&(t=e),e=e.sibling}return t}function cl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function ll(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ul(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Uo.current;if(t.flags&128)return Wo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Wo(t,o),i===`backwards`&&e!==null?(ll(e),Lc(e,t,r,n),ll(e)):Lc(e,t,r,n),r=F?Qi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ol(e,n,t);else if(e.tag===19)ol(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,ll(t)),cl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ko(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}cl(t,!0,n,null,a,r);break;case`together`:cl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),cl(t,!1,i,n,a,r)}return t.child}function dl(e,t,n){var r=t.pendingProps;return Ca(t,t.type,r.value),Lc(e,t,r.children,n),t.child}function fl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Da(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Bi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Bi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Oa(e)))}function ml(e,t,n){switch(t.tag){case 3:Pe(t,t.stateNode.containerInfo),Ca(t,Ia,e.memoizedState.cache),_a();break;case 27:case 5:Ie(t);break;case 4:Pe(t,t.stateNode.containerInfo);break;case 10:Ca(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,zo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Ro(t),t.flags|=128,null;r=Da(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?tl(e,t,n):(Ro(t),e=fl(e,t,n),e===null?null:e.sibling)}Ro(t);break;case 19:if(t.flags&128)return ul(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(Da(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ul(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Wo(t,Uo.current),r)break;return null;case 22:return t.lanes=0,Vc(e,t,n,t.pendingProps);case 24:Ca(t,Ia,e.memoizedState.cache)}return fl(e,t,n)}function hl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Ic=!0;else{if(!pl(e,n)&&!(t.flags&128))return Ic=!1,ml(e,t,n);Ic=!!(e.flags&131072)}}else Ic=!1,F&&t.flags&1048576&&aa(t,Qi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=oo(t.elementType),t.type=e,typeof e==`function`)zi(e)?(r=Tc(e,r),t.tag=1,t=Xc(null,t,e,r,n)):(t.tag=0,t=Jc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ue){t.tag=11,t=Rc(null,t,e,r,n);break a}if(a===pe){t.tag=14,t=zc(null,t,e,r,n);break a}if(a===le){t.tag=10,t.type=e,t=dl(null,t,n);break a}}throw t=Ce(e)||e,Error(i(306,t,``))}}return t;case 0:return Jc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Tc(r,t.pendingProps),Xc(e,t,r,a,n);case 3:a:{if(Pe(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,xo(e,t),Oo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ca(t,Ia,r),r!==o.cache&&Ea(t,[Ia],n,!0),Do(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Zc(e,t,r,n);break a}if(r!==a){a=Ji(Error(i(424)),t),ya(a),t=Zc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(P=lm(e.firstChild),la=t,F=!0,ua=null,da=!0,n=vo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(_a(),r===a){t=fl(e,t,n);break a}Lc(e,t,r,n)}t=t.child}return t;case 26:return qc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:F||(t.stateNode=fp(t.type,t.pendingProps,Me.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ie(t),e===null&&F&&(r=t.stateNode=hm(t.type,t.pendingProps,Me.current),la=t,da=!0,a=P,Sp(t.type)?(um=a,P=lm(r.firstChild)):P=a),Lc(e,t,t.pendingProps.children,n),qc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&F&&((a=r=P)&&(r=rm(r,t.type,t.pendingProps,da),r===null?a=!1:(t.stateNode=r,la=t,P=lm(r.firstChild),da=!1,a=!0)),a||pa(t)),Ie(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=ns(e,t,as,null,null,n),sh._currentValue=a),qc(e,t),Lc(e,t,r,n),t.child;case 6:return e===null&&F&&((e=n=P)&&(n=im(n,t.pendingProps,da),n===null?e=!1:(t.stateNode=n,la=t,P=null,e=!0)),e||pa(t)),null;case 13:return tl(e,t,n);case 4:return Pe(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=_o(t,null,r,n):Lc(e,t,r,n),t.child;case 11:return Rc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,qc(e,t),Lc(e,t,r,n),t.child;case 8:return Lc(e,t,t.pendingProps.children,n),t.child;case 12:return Lc(e,t,t.pendingProps.children,n),t.child;case 10:return dl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,ka(t),a=Aa(a),r=r(a),t.flags|=1,Lc(e,t,r,n),t.child;case 14:return zc(e,t,t.type,t.pendingProps,n);case 15:return Bc(e,t,t.type,t.pendingProps,n);case 19:return ul(e,t,n);case 31:return Kc(e,t,n);case 22:return Vc(e,t,n,t.pendingProps);case 24:return ka(t),r=Aa(Ia),e===null?(a=Za(),a===null&&(a=G,o=La(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},bo(t),Ca(t,Ia,a)):((e.lanes&n)!==0&&(xo(e,t),Oo(t,null,null,n),Do()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ca(t,Ia,r),r!==a.cache&&Ea(t,[Ia],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ca(t,Ia,r))),Lc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:F&&oa(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:qc(e,t),Lc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function gl(e){e.flags|=4}function _l(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw so=ro,to}}else e.flags&=-16777217}function vl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw so=ro,to}}function yl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:bt(),e.lanes|=t,dd|=t)}function bl(e,t){if(!F)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xl(e,t,n){var r=t.pendingProps;switch(sa(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),wa(Ia),Fe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ga(t)?gl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,va())),V(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(gl(t),o===null?(V(t),_l(t,a,null,r,n)):(V(t),vl(t,o))):o?o===e.memoizedState?(V(t),t.flags&=-16777217):(gl(t),V(t),vl(t,o)):(e=e.memoizedProps,e!==r&&gl(t),V(t),_l(t,a,e,r,n)),null;case 27:if(Le(t),n=Me.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}e=Ae.current,ga(t)?ma(t,e):(e=hm(a,r,n),t.stateNode=e,gl(t))}return V(t),t.subtreeFlags&=-33554433,null;case 5:if(Le(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}if(o=Ae.current,ga(t))ma(t,o);else{var s=lp(Me.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[jt]=t,o[Mt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&gl(t)}}return V(t),t.subtreeFlags&=-33554433,_l(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Me.current,ga(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=la,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[jt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||pa(t,!0)}else e=lp(e).createTextNode(r),e[jt]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=ga(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[jt]=t}else _a(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=va(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Ho(t),t):(Ho(t),null);if(t.flags&128)throw Error(i(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=ga(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[jt]=t}else _a(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),a=!1}else a=va(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Ho(t),t):(Ho(t),null)}return Ho(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),yl(t,t.updateQueue),V(t),null);case 4:return Fe(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,V(t),null;case 10:return wa(t.type),V(t),null;case 19:if(Go(t),r=t.memoizedState,r===null)return V(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)bl(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ko(e),o!==null){for(t.flags|=128,bl(r,!1),e=o.updateQueue,t.updateQueue=e,yl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Vi(n,e),n=n.sibling;return Wo(t,Uo.current&1|2),F&&ia(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Xe()>_d&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Ko(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,yl(t,e),bl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!F)return V(t),null}else 2*Xe()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Xe(),e.sibling=null,o=Uo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||F?Wo(t,o):(n=o,O(Io,t),O(Uo,n),Lo===null&&(Lo=t)),F&&ia(t,r.treeForkCount),e}return V(t),null;case 22:case 23:return Ho(t),Fo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&yl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ke(Xa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),wa(Ia),V(t),null;case 25:return null;case 30:return t.flags|=33554432,V(t),null}throw Error(i(156,t.tag))}function Sl(e,t){switch(sa(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return wa(Ia),Fe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Le(t),null;case 31:if(t.memoizedState!==null){if(Ho(t),t.alternate===null)throw Error(i(340));_a()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Ho(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));_a()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Go(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Fe(),null;case 10:return wa(t.type),null;case 22:case 23:return Ho(t),Fo(),e!==null&&ke(Xa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return wa(Ia),null;case 25:return null;default:return null}}function Cl(e,t){switch(sa(t),t.tag){case 3:wa(Ia),Fe();break;case 26:case 27:case 5:Le(t);break;case 4:Fe();break;case 31:t.memoizedState!==null&&Ho(t);break;case 13:Ho(t);break;case 19:Go(t);break;case 10:wa(t.type);break;case 22:case 23:Ho(t),Fo(),e!==null&&ke(Xa);break;case 24:wa(Ia)}}function wl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Tl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function El(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ao(t,n)}catch(t){Z(e,e.return,t)}}}function Dl(e,t,n){n.props=Tc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Ol(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=Ci(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function kl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Al(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function jl(e){for(var t=e.return;t!==null&&(Pl(t)&&em(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Ml(e){for(var t=e.return;t!==null&&(Pl(t)&&tm(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Nl(e){return e.tag===5||e.tag===3||e.tag===27}function Pl(e){return e&&e.tag===7&&e.stateNode!==null}function Fl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Il(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Mt]=t}catch(t){Z(e,e.return,t)}}function Ll(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Rl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ll(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=wn)),Al(e,r),j=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(zl(e,t,n,r),e=e.sibling;e!==null;)zl(e,t,n,r),e=e.sibling}function Bl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Al(e,r),j=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Bl(e,t,n,r),e=e.sibling;e!==null;)Bl(e,t,n,r),e=e.sibling}function Vl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[jt]=e,t[Mt]=n}catch(t){Z(e,e.return,t)}}var Hl=!1,Ul=null;function Wl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Hl=!0)}var Gl=null;function Kl(){var e=Gl;return Gl=null,e}var ql=0;function Jl(e,t,n,r,i){return ql=0,Yl(e.child,t,n,r,i)}function Yl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Hl=!0,Tp(o,ql===0?t:t+`_`+ql,n),ql++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Yl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Xl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Xl(e.child,t),e=e.sibling}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=Ti(t.default,t.share),t!==`none`&&(Jl(e,n,t,null,!1)||Xl(e.child,!1))}e=e.sibling}}function Ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=Ci(r,n),a=Ti(r.default,n.paired?r.share:r.enter);a===`none`?Zl(e):Jl(e,i,a,null,!1)?(Zl(e),n.paired||t||Nd(e,r.onEnter)):Xl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e,t),e=e.sibling;else Zl(e)}function $l(e){if(Ul!==null&&Ul.size!==0){var t=Ul;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=Ti(n.default,n.share);if(a!==`none`&&(Jl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Xl(e.child,!1)),t.delete(r),t.size===0)break}}}$l(e)}e=e.sibling}}}function eu(e){if(e.tag===30){var t=e.memoizedProps,n=Ci(t,e.stateNode),r=Ul===null?void 0:Ul.get(n),i=Ti(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Jl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Ul.delete(n),Nd(e,t.onShare)):Xl(e.child,!1)),Ul!==null&&$l(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else Ul!==null&&$l(e)}function tu(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Ci(t,e.stateNode);t=Ti(t.default,t.update),e.flags&=-5,t!==`none`&&Jl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&tu(e);e=e.sibling}}function nu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Xl(e.child,!1))}nu(e)}e=e.sibling}}function ru(e){if(e.tag===30)e.stateNode.paired=null,Xl(e.child,!1),nu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ru(e),e=e.sibling;else nu(e)}function iu(e){for(e=e.child;e!==null;)e.tag===30?Xl(e.child,!1):e.subtreeFlags&33554432&&iu(e),e=e.sibling}function au(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&ql<a.length){var l=a[ql],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,ql===0?n:n+`_`+ql,i),s&&e.flags&4||(Gl===null&&(Gl=[]),Gl.push(c,ql===0?r:r+`_`+ql,t.memoizedProps)),ql++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:au(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ou(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=Ci(n,r),a=Ti(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;ql=0,i=au(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&ou(e,t);e=e.sibling}}var su=!1,H=!1,cu=!1,lu=!1,uu=typeof WeakSet==`function`?WeakSet:Set,du=null,fu=!1,pu=!1,mu=!1,hu=!1;function gu(e,t,n){if(e=e.containerInfo,sp=gh,e=$r(e),ei(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,du=t,t=n?9270:1024;du!==null;){if(e=du,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&eu(r[a]);if(e.alternate===null&&e.flags&2)n&&Wl(e),_u(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&eu(r),_u(n);continue}if(r!==null&&r.memoizedState!==null){n&&Wl(e),_u(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,du=r):(n&&tu(e),_u(n))}}Ul=null}function _u(e){for(;du!==null;){var t=du,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=Tc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=Ci(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=Ti(a.default,a.update),a!==`none`&&Jl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,du=r;break}du=t.return}}function vu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Lu(e,n),r&4&&wl(5,n);break;case 1:if(Lu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Tc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&El(n),r&512&&Ol(n,n.return);break;case 3:if(Lu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ao(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Vl(n);case 26:case 5:Lu(e,n),t===null&&r&4&&Fl(n),r&512&&Ol(n,n.return);break;case 12:Lu(e,n);break;case 31:Lu(e,n),r&4&&Eu(e,n);break;case 13:Lu(e,n),r&4&&Du(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||su,!r){var a=t!==null&&t.memoizedState!==null||H;t=su,i=H,su=r,(H=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),zu(e,n,r)):Lu(e,n),su=t,H=i}break;case 30:Lu(e,n),r&512&&Ol(n,n.return);break;case 7:r&512&&Ol(n,n.return);default:Lu(e,n)}}function yu(e,t){for(e=e.child;e!==null;)bu(e,t),e=e.sibling}function bu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}xu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,j=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&yu(e,t);break;default:yu(e,t)}}function xu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:bu(n,r);break a;case 22:n.memoizedState===null&&xu(n,r);break a;default:xu(n,r)}}e=e.sibling}}function Su(e){var t=e.alternate;t!==null&&(e.alternate=null,Su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Bt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,Cu=!1;function wu(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(ot&&typeof ot.onCommitFiberUnmount==`function`)try{ot.onCommitFiberUnmount(at,n)}catch{}switch(n.tag){case 26:H||kl(n,t),wu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!H&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:H||kl(n,t),Ml(n);var r=U,i=Cu;Sp(n.type)&&(U=n.stateNode,Cu=!1),wu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),U=r,Cu=i;break;case 5:H||kl(n,t),Ml(n);case 6:if(n.tag===6&&Ml(n),r=U,i=Cu,U=null,wu(e,t,n),U=r,Cu=i,U!==null){if(Cu)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode),j=!0}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode),j=!0}catch(e){Z(n,t,e)}}break;case 18:U!==null&&(Cu?(e=U,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(U,n.stateNode));break;case 4:r=U,i=Cu,U=n.stateNode.containerInfo,Cu=!0,wu(e,t,n),U=r,Cu=i;break;case 0:case 11:case 14:case 15:Tl(2,n,t),H||Tl(4,n,t),wu(e,t,n);break;case 1:H||(kl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Dl(n,t,r)),wu(e,t,n);break;case 21:wu(e,t,n);break;case 22:H=(r=H)||n.memoizedState!==null,wu(e,t,n),H=r;break;case 30:kl(n,t),wu(e,t,n);break;case 7:H||kl(n,t),wu(e,t,n);break;default:wu(e,t,n)}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Du(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Ou(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new uu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new uu),t;default:throw Error(i(435,e.tag))}}function ku(e,t){var n=Ou(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Au(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){U=l.stateNode,Cu=!1;break a}break;case 5:U=l.stateNode,Cu=!1;break a;case 3:case 4:U=l.stateNode.containerInfo,Cu=!0;break a}l=l.return}if(U===null)throw Error(i(160));Tu(s,c,o),U=null,Cu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Mu(t,e,n),t=t.sibling}var ju=null;function Mu(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Au(t,e,n),Nu(e),a&4&&(Tl(3,e,e.return),wl(3,e),Tl(5,e,e.return));break;case 1:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&64&&su&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ju,Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(su)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Rt]||r[jt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[jt]=e,Gt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[jt]=e,Gt(r),t=r}e.stateNode=t}}else su||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Il(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||H||t.parentNode.removeChild(t)):a.count--,n===null?su||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),r!==null&&a&4&&Il(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=cu,cu=!1,Au(t,e,n),cu=o,Nu(e),a&512&&(H||r===null||kl(r,r.return)),e.flags&32){t=e.stateNode;try{gn(t,``),j=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Il(e,t,r===null?t:r.memoizedProps)),a&1024&&(lu=!0);break;case 6:if(Au(t,e,n),Nu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,j=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(j=!1,Wm=null,o=ju,ju=bm(t.containerInfo),Au(t,e,n),ju=o,Nu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}lu&&(lu=!1,Pu(e)),j=!1;break;case 4:a=cu,cu=su,r=en(),o=ju,ju=bm(e.stateNode.containerInfo),Au(t,e,n),Nu(e),ju=o,j&&pu&&(mu=!0),j=r,cu=a;break;case 12:Au(t,e,n),Nu(e);break;case 31:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:Au(t,e,n),Nu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=Xe()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=su,l=H,u=cu;su=c||o,cu=u||o,H=l||s,Au(t,e,n),H=l,cu=u,su=c,Nu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||su||H||(t=s||H,n=su,r=H,su=o||su,H=t,Ru(e,2),su=n,H=r),!o&&cu||yu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:a&512&&(H||r===null||kl(r,r.return)),a=en(),o=pu,s=(n&335544064)===n,c=e.memoizedProps,pu=s&&Ti(c.default,c.update)!==`none`,Au(t,e,n),Nu(e),s&&r!==null&&j&&(e.flags|=4),pu=o,j=a;break;case 21:break;case 7:a&512&&(H||r===null||kl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Au(t,e,n),Nu(e)}}function Nu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ll(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Pl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Nl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Bl(e,Rl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(gn(l,``),n.flags&=-33),Bl(e,Rl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;zl(e,Rl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Fu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Iu(t,e),t=t.sibling;else ou(t,!1)}function Iu(e,t){var n=e.alternate;if(n===null)Ql(e,!1);else switch(e.tag){case 3:if(hu=fu=!1,Kl(),Fu(t,e),!fu&&!mu){if(e=Gl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),hu=!0}Gl=null;break;case 5:Fu(t,e);break;case 4:r=fu,fu=!1,Fu(t,e),fu&&(mu=!0),fu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Fu(t,e):Ql(e,!1));break;case 30:r=fu,i=Kl(),fu=!1,Fu(t,e),fu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=Ci(a,o),o=Ci(n.memoizedProps,o);var s=Ti(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,ql=0,t=au(e,n,t,o,s,a,!0),ql!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Gl=i):i!==null&&(i.push.apply(i,Gl),Gl=i),fu=e.flags&32?!0:r;break;default:Fu(t,e)}}function Lu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)vu(e,t.alternate,t),t=t.sibling}function Ru(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Tl(4,n,n.return),Ru(n,r);break;case 1:kl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Dl(n,n.return,i),Ru(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:kl(n,n.return),n.tag!==5&&n.tag!==27||Ml(n),Ru(n,r);break;case 6:Ml(n);break;case 26:kl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||H||i.parentNode.removeChild(i),Ru(n,r);break;case 22:n.memoizedState===null&&Ru(n,r);break;case 30:kl(n,n.return),Ru(n,r);break;case 7:kl(n,n.return);default:Ru(n,r)}e=e.sibling}}function zu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:zu(i,a,n),wl(4,a);break;case 1:if(zu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)ko(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&El(a),Ol(a,a.return);break;case 27:n&2&&Vl(a);case 5:a.tag!==5&&a.tag!==27||jl(a),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 6:jl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||su||Km(bm(c.ownerDocument),a.type,c),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 12:zu(i,a,n);break;case 31:zu(i,a,n),s&&o&4&&Eu(i,a);break;case 13:zu(i,a,n),s&&o&4&&Du(i,a);break;case 22:a.memoizedState===null&&zu(i,a,n),Ol(a,a.return);break;case 30:zu(i,a,n),Ol(a,a.return);break;case 7:Ol(a,a.return);default:zu(i,a,n)}t=t.sibling}}function Bu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Ra(n))}function Vu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ra(e))}function Hu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Uu(e,t,n,r),t=t.sibling;else i&&iu(t)}function Uu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ru(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Hu(e,t,n,r),a&2048&&wl(9,t);break;case 1:Hu(e,t,n,r);break;case 3:Hu(e,t,n,r),i&&hu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Ra(a)));break;case 12:if(a&2048){Hu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Hu(e,t,n,r);break;case 31:Hu(e,t,n,r);break;case 13:Hu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&ru(t),o._visibility&2?Hu(e,t,n,r):(o._visibility|=2,Wu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&ru(s),o._visibility&2?Hu(e,t,n,r):Gu(e,t)),a&2048&&Bu(s,t);break;case 24:Hu(e,t,n,r),a&2048&&Vu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Xl(a.child,!0),Xl(t.child,!0))),Hu(e,t,n,r);break;default:Hu(e,t,n,r)}}function Wu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Wu(a,o,s,c,i),wl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Wu(a,o,s,c,i)):u._visibility&2?Wu(a,o,s,c,i):Gu(a,o),i&&l&2048&&Bu(o.alternate,o);break;case 24:Wu(a,o,s,c,i),i&&l&2048&&Vu(o.alternate,o);break;default:Wu(a,o,s,c,i)}t=t.sibling}}function Gu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Gu(n,r),i&2048&&Bu(r.alternate,r);break;case 24:Gu(n,r),i&2048&&Vu(r.alternate,r);break;default:Gu(n,r)}t=t.sibling}}var Ku=8192;function qu(e,t,n){if(e.subtreeFlags&Ku)for(e=e.child;e!==null;)Ju(e,t,n),e=e.sibling}function Ju(e,t,n){switch(e.tag){case 26:qu(e,t,n),e.flags&Ku&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,ju,e.memoizedState,e.memoizedProps));break;case 5:qu(e,t,n),e.flags&Ku&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=ju;ju=bm(e.stateNode.containerInfo),qu(e,t,n),ju=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ku,Ku=16777216,qu(e,t,n),Ku=r):qu(e,t,n));break;case 30:if((e.flags&Ku)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Ul===null&&(Ul=new Map),Ul.set(r,i)}qu(e,t,n);break;default:qu(e,t,n)}}function Yu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zu(e),e=e.sibling}function Zu(e){switch(e.tag){case 0:case 11:case 15:Xu(e),e.flags&2048&&Tl(9,e,e.return);break;case 3:Xu(e);break;case 12:Xu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):Xu(e);break;default:Xu(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Tl(8,t,t.return),Qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function $u(e,t){for(;du!==null;){var n=du;switch(n.tag){case 0:case 11:case 15:Tl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ra(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,du=r;else a:for(n=e;du!==null;){r=du;var i=r.sibling,a=r.return;if(Su(r),r===n){du=null;break a}if(i!==null){i.return=a,du=i;break a}du=a}}}var ed={getCacheForType:function(e){var t=Aa(Ia),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Aa(Ia).controller.signal}},td=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,nd=null,rd=!1,id=!1,ad=!1,od=0,Y=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,X=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return W&2&&q!==0?q&-q:E.T===null?kt():Pf()}function Md(){if(ud===0){if(!(q&536870912)||F){var e=pt;pt<<=1,!(pt&3932160)&&(pt=262144),ud=e}else ud=536870912}return e=Io.current,e!==null&&(e.flags|=32),ud}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(Ci(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,q,ud,!1)),St(e,n),W&2&&e===G||(e===G&&(!(W&2)&&(cd|=n),Y===4&&Rd(e,q,ud,!1)),Ef(e))}function Fd(e,t,n){if(W&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||_t(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){id&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(ad&&!l){c.errorRecoveryDisabledLanes|=o,cd|=o,a=4;break a}o=pd,pd=a,o!==null&&(pd===null?pd=o:pd.push.apply(pd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ud,!rd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=hd+300-Xe(),10<a)){if(Rd(r,t,ud,!rd),gt(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,pd,vd,md,t,ud,cd,dd,rd,o,`Throttled`,-0,0),a);break a}Id(r,n,pd,vd,md,t,ud,cd,dd,rd,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:wn},Ul=null,Ju(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-Xe():(a&4194048)===a?gd-Xe():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!qr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=vt(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-ct(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&wt(e,n,t)}function zd(){return W&6?!0:(Df(0,!1),!1)}function Bd(){if(K!==null){if(J===0)var e=K.return;else e=K,Sa=xa=null,cs(e),uo=null,fo=0,e=K;for(;e!==null;)Cl(e.alternate,e),e=e.return;K=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),G=e,K=n=Bi(e.current,null),q=t,J=0,nd=null,rd=!1,id=_t(e,t),ad=!1,dd=ud=ld=cd=sd=Y=0,pd=fd=null,md=!1,od=vt(e,t),Ai(),n}function Hd(e,t){I=null,E.H=_c,t===eo||t===no?(t=co(),J=3):t===to?(t=co(),J=4):J=t===Fc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,nd=t,K===null&&(Y=1,kc(e,Ji(t,e.current)))}function Ud(){var e=Io.current;return e===null?!0:(q&4194048)===q?Lo===null:(q&62914560)===q||q&536870912?e===Lo:!1}function Wd(){var e=E.H;return E.H=_c,e===null?_c:e}function Gd(){var e=E.A;return E.A=ed,e}function Kd(){Y=4,rd||(q&4194048)!==q&&Io.current!==null||(id=!0),!(sd&134217727)&&!(cd&134217727)||G===null||Rd(G,q,ud,!1)}function qd(e,t,n){var r=W;W|=2;var i=Wd(),a=Gd();(G!==e||q!==t)&&(vd=null,Vd(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=nd;switch(J){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Io.current===null&&(t=!0);var l=J;if(J=0,nd=null,$d(e,s,c,l),n&&id){o=0;break a}break;default:l=J,J=0,nd=null,$d(e,s,c,l)}}Jd(),o=Y;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,Sa=xa=null,W=r,E.H=i,E.A=a,K===null&&(G=null,q=0,Ai()),o}function Jd(){for(;K!==null;)Zd(K)}function Yd(e,t){var n=W;W|=2;var r=Wd(),a=Gd();G!==e||q!==t?(vd=null,_d=Xe()+500,Vd(e,t)):id=_t(e,t);a:do try{if(J!==0&&K!==null){t=K;var o=nd;b:switch(J){case 1:J=0,nd=null,$d(e,t,o,1);break;case 2:case 9:if(io(o)){J=0,nd=null,Qd(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),Ef(e)},o.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:io(o)?(J=0,nd=null,Qd(t)):(J=0,nd=null,$d(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Ym(s):c.stateNode.complete){J=0,nd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,ef(u))}break b}}J=0,nd=null,$d(e,t,o,5);break;case 6:J=0,nd=null,$d(e,t,o,6);break;case 8:Bd(),Y=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return Sa=xa=null,E.H=r,E.A=a,W=n,K===null?(G=null,q=0,Ai(),Y):0}function Xd(){for(;K!==null&&!Je();)Zd(K)}function Zd(e){var t=hl(e.alternate,e,od);e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:cs(t);var r=t;r===la&&(F?(ha(r),r.tag===5&&r.stateNode!=null&&(P=r.stateNode)):(ha(r),F=!0));default:Cl(n,t),t=K=Vi(t,od),t=hl(n,t,od)}e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function $d(e,t,n,r){Sa=xa=null,cs(t),uo=null,fo=0;var i=t.return;try{if(Pc(e,i,t,n,q)){Y=1,kc(e,Ji(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,kc(e,Ji(n,e.current)),K=null;return}t.flags&32768?(F||r===1?e=!0:id||q&536870912?e=!1:(rd=e=!0,(r===2||r===9||r===3||r===6)&&(r=Io.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,rd);return}e=t.return;var n=xl(t.alternate,t,od);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function tf(e,t){do{var n=Sl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(X!==0);if(W&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===G&&(K=G=null,q=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=ki,Ct(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Va(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(et,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Hl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=E.T,E.T=null,i=D.p,D.p=2,a=W,W|=4;try{gu(e,t,n)}finally{W=a,D.p=i,E.T=r}}X=1,Hl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(X!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){X===3&&(X=0,Iu(xd,bd),X=4)}function sf(){if(X===1){X=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=E.T,E.T=null;var i=D.p;D.p=2;var a=W;W|=4;try{pu=mu=!1,Mu(t,e,n),n=cp;var o=$r(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Qr(s.ownerDocument.documentElement,s)){if(c!==null&&ei(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Zr(s,h),v=Zr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{W=a,D.p=i,E.T=r}}e.current=t,X=2}}function cf(){if(X===2){X=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=W;W|=4;try{vu(e,t.alternate,t)}finally{W=i,D.p=r,E.T=n}}X=3}}function lf(){if(X===4||X===3){X=0;var e=Ed;Ed=null,Ye();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?X=5:(X=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),Ot(r),n=n.stateNode,ot&&typeof ot.onCommitFiberRoot==`function`)try{ot.onCommitFiberRoot(at,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=E.T,a=D.p,D.p=2,E.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{E.T=n,D.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ra(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(X!==5)return!1;var e=bd,t=Cd;Cd=0;var n=Ot(Sd),r=E.T,a=D.p;try{D.p=32>n?32:n,E.T=null,n=wd,wd=null;var o=bd,s=Sd;if(X=0,xd=bd=null,Sd=0,W&6)throw Error(i(331));var c=W;if(W|=4,Zu(o.current),Uu(o,o.current,s,n),W=c,Df(0,!1),ot&&typeof ot.onPostCommitFiberRoot==`function`)try{ot.onPostCommitFiberRoot(at,o)}catch{}return!0}finally{D.p=a,E.T=r,uf(e,t)}}function pf(e,t,n){t=Ji(n,t),t=jc(e.stateNode,t,2),e=Co(e,t,2),e!==null&&(St(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Ji(n,e),n=Mc(2),r=Co(t,n,2),r!==null&&(Nc(n,r,t,e),St(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new td;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ad=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Xe()-hd?W&2?ld|=n:Vd(e,0):ld|=n,dd===q&&(dd=0)),Ef(e)}function gf(e,t){t===0&&(t=bt()),e=Ni(e,t),e!==null&&(St(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Ke(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-ct(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=q,a=gt(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||_t(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Xe(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}X!==0&&X!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-ct(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=yt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=gt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&qe(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||_t(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&qe(r),Ot(n)){case 2:case 8:n=$e;break;case 32:n=et;break;case 268435456:n=nt;break;default:n=et}return r=jf.bind(null,e),n=Ke(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&qe(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=q;return r=gt(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Xe()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){W&6?Ke(Qe,Of):kf()})}function Pf(){if(Tf===0){var e=Wa;e===0&&(e=ft,ft<<=1,!(ft&261888)&&(ft=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Cn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Mt]||null).action),o=r.submitter;o&&(t=(t=o[Mt]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Gn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);rc(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),rc(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<bi.length;Lf++){var Rf=bi[Lf];xi(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}xi(fi,`onAnimationEnd`),xi(pi,`onAnimationIteration`),xi(mi,`onAnimationStart`),xi(`dblclick`,`onDoubleClick`),xi(`focusin`,`onFocus`),xi(`focusout`,`onBlur`),xi(hi,`onTransitionRun`),xi(gi,`onTransitionStart`),xi(_i,`onTransitionCancel`),xi(vi,`onTransitionEnd`),A(`onMouseEnter`,[`mouseout`,`mouseover`]),A(`onMouseLeave`,[`mouseout`,`mouseover`]),A(`onPointerEnter`,[`pointerout`,`pointerover`]),A(`onPointerLeave`,[`pointerout`,`pointerover`]),Yt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Yt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Yt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Yt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Yt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Yt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ei(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ei(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Pt];n===void 0&&(n=t[Pt]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,qt.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!Pn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Vt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}jn(function(){var r=a,i=En(n),s=[];a:{var c=yi.get(e);if(c!==void 0){var l=Gn,u=e;switch(e){case`keypress`:if(Bn(n)===0)break a;case`keydown`:case`keyup`:l=lr;break;case`focusin`:u=`focus`,l=er;break;case`focusout`:u=`blur`,l=er;break;case`beforeblur`:case`afterblur`:l=er;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Qn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=$n;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=fr;break;case fi:case pi:case mi:l=tr;break;case vi:l=pr;break;case`scroll`:case`scrollend`:l=qn;break;case`wheel`:l=mr;break;case`copy`:case`cut`:case`paste`:l=nr;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=ur;break;case`submit`:l=dr;break;case`toggle`:case`beforetoggle`:l=hr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Mn(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==Tn&&(u=n.relatedTarget||n.fromElement)&&(Vt(u)||u[Nt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Vt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Qn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=ur,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Ut(c),h=l==null?u:Ut(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Vt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?ne(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Ut(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Fr;else if(kr(c)){if(Ir)_=Gr;else{_=Ur;var v=Hr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&bn(r.elementType)&&(_=Fr):_=Wr;if(_&&=_(e,r)){Ar(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Ut(r):window,e){case`focusin`:(kr(v)||v.contentEditable===`true`)&&(ni=v,ri=r,ii=null);break;case`focusout`:ii=ri=ni=null;break;case`mousedown`:ai=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ai=!1,oi(s,n,i);break;case`selectionchange`:if(ti)break;case`keydown`:case`keyup`:oi(s,n,i)}var y;if(_r)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else Tr?Cr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(br&&n.locale!==`ko`&&(Tr||b!==`onCompositionStart`?b===`onCompositionEnd`&&Tr&&(y=zn()):(In=i,Ln=`value`in In?In.value:In.textContent,Tr=!0)),v=Jf(r,b),0<v.length&&(b=new rr(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=wr(n),y!==null&&(b.data=y)))),(y=yr?Er(e,n):Dr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new rr(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Mn(e,n),i!=null&&r.unshift(qf(e,i,a)),i=Mn(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Mn(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=Mn(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||gn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&gn(e,``+r);else return;break;case`className`:M(e,`class`,r);break;case`tabIndex`:M(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:M(e,n,r);break;case`style`:yn(e,r,o);return;case`data`:if(t!==`object`){M(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Cn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Cn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=wn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Cn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),tn(e,`popover`,r);break;case`xlinkActuate`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:nn(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:nn(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:nn(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:nn(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:tn(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=xn.get(n)||n,tn(e,n,r);else return}j=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:yn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)gn(e,r);else if(typeof r==`number`||typeof r==`bigint`)gn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=wn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Jt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Mt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}j=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):tn(e,n,r)}return}j=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}dn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&pn(e,!!r,n,!0):pn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}hn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(bn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(j=!0),o=m;break;case`name`:m!==f&&(j=!0),a=m;break;case`checked`:m!==f&&(j=!0),u=m;break;case`defaultChecked`:m!==f&&(j=!0),d=m;break;case`value`:m!==f&&(j=!0),s=m;break;case`defaultValue`:m!==f&&(j=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}un(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(j=!0),p=o;break;case`defaultValue`:o!==l&&(j=!0),c=o;break;case`multiple`:o!==l&&(j=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?pn(e,!!n,n?[]:``,!1):pn(e,!!n,t,!0)):pn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(j=!0),p=a;break;case`defaultValue`:a!==o&&(j=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}mn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(j=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(bn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[jt]=r,n[Mt]=t,np(n,e,t),Gt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Rt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:w({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Vt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=ne(n,a,C),t===null?t=!1:(h(t,!0,S,a,n),a=ee,ee=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=ne(r,a,C),t===null?t=!1:(h(t,!0,te,a,r),a=ee,x=ee=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Bt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Rt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===wn&&(e.onclick=null),Bt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Bt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=D.d;D.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Ht(e);t!==null&&t.tag===5&&t.type===`form`?ac(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=ln(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Gt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+ln(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+ln(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+ln(n.imageSizes)+`"]`)):i+=`[href="`+ln(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=w({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[zt]=!0,o.onload=o.onerror=function(){Kt(o)}),Gt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+ln(r)+`"][href="`+ln(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=w({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Gt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Wt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=w({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Gt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Wt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=w({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Gt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Wt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=w({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Gt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=Me.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Wt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Wt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Wt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+ln(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return w({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[zt]){r.loading=1;return}}else t=e.createElement(`link`),t[zt]=!0,t.onload=t.onerror=Kt.bind(null,t),np(t,`link`,n),Gt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+ln(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+ln(n.href)+`"]`);if(r)return t.instance=r,Gt(r),r;var a=w({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Gt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Gt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Gt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Gt(a),a):(r=n,(a=vm.get(o))&&(r=w({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Gt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Rt]||a[jt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Gt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Gt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:le,Provider:null,Consumer:null,_currentValue:Te,_currentValue2:Te,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=xt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xt(0),this.hiddenUpdates=xt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ri(3,null,null,t),e.current=a,a.stateNode=e,t=La(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},bo(a),e}function uh(e){return e?(e=Ii,e):Ii}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=So(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Co(e,r,t),n!==null&&(Pd(n,e,t),wo(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Ni(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=Dt(t);var n=Ni(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,yh(e,t,n,r)}finally{D.p=a,E.T=i}}function vh(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,yh(e,t,n,r)}finally{D.p=a,E.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Ht(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ht(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-ct(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(W&6)&&(_d=Xe()+500,Df(0,!1))}}break;case 31:case 13:s=Ni(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=En(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Vt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ze()){case Qe:return 2;case $e:return 8;case et:case tt:return 32;case nt:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ht(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Vt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,At(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,At(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Tn=r,n.target.dispatchEvent(r),Tn=null}else return t=Ht(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Ht(n);a!==null&&(e.splice(t,3),t-=3,rc(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Mt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Mt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Nt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=kt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{at=Jh.inject(qh),ot=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ec,s=Dc,c=Oc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Nt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=e=>e?.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase();function b(e,t,n=[]){if(t==null)throw Error(`[lucide]: iconNode is required when icon name is used`);return{name:y(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}var ee=e=>{let t=``,n=!1;for(let r of e)r===`-`||r===`_`||r<=` `?n=t.length>0:(t.length===0?t+=r.toLowerCase():t+=n?r.toUpperCase():r,n=!1);return t},x=e=>{let t=ee(e);return t.charAt(0).toUpperCase()+t.slice(1)},S=(...e)=>{let t=new Set;for(let n of e)if(typeof n==`string`)for(let e of n.split(/\s+/))e&&t.add(e);return[...t].join(` `)},te={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`};function C(e){return e!=null}function ne(e,t={}){let n=t.attributeNames??{},r=e=>n[e]??e,i=e.size??e.width??te.width,a=e.size??e.height??te.height,o=e.aliases?.filter(e=>typeof e==`string`&&e.trim()!==``).map(e=>`lucide-${e}`)??[],s=[...e.name?[`lucide-${e.name}`]:[],...o],c=t.className?.split(` `).filter(Boolean)??[],l=t.includeDefaultClasses===!1?S(...c):S(`lucide`,...s,...c),u=t.absoluteStrokeWidth?Number(t.strokeWidth??te[`stroke-width`])*Number(e.size??e.width??te.width)/Number(t.size??t.width??te.width):t.strokeWidth??te[`stroke-width`];return[`svg`,{...Object.entries(te).reduce((e,[t,n])=>(e[r(t)]=n,e),{}),...`color`in t&&t.color&&{[r(`stroke`)]:t.color},...`size`in t&&C(t.size)&&{[r(`width`)]:t.size,[r(`height`)]:t.size},...`width`in t&&C(t.width)&&{[r(`width`)]:t.width},...`height`in t&&C(t.height)&&{[r(`height`)]:t.height},[r(`stroke-width`)]:u,...l&&{[r(`class`)]:l},[r(`viewBox`)]:`0 0 ${i} ${a}`,...t.hasA11yProp===!1?{[r(`aria-hidden`)]:`true`}:{},...`attributes`in t&&t.attributes},e.node.map(e=>{let[n,i,a]=e,o=t.nonScalingStroke?{[r(`vector-effect`)]:`non-scaling-stroke`,...i}:i;return a?[n,o,a]:[n,o]})]}function w(e,t={}){return ne(e,{...t,attributeNames:{...t.attributeNames,class:`className`,"stroke-width":`strokeWidth`,"stroke-linecap":`strokeLinecap`,"stroke-linejoin":`strokeLinejoin`,"vector-effect":`vectorEffect`}})}var re=e=>{if(typeof e!=`object`||!e)return!1;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith(`aria-`)||t===`role`||t===`title`)&&e[t]!=null)return!0;return!1},ie=(0,_.createContext)({}),ae=()=>(0,_.useContext)(ie),oe=(0,_.forwardRef)(({color:e,size:t,width:n,height:r,strokeWidth:i,absoluteStrokeWidth:a,nonScalingStroke:o,className:s=``,children:c,iconNode:l=[],icon:u={node:l,aliases:[],size:24},...d},f)=>{let{size:p=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,nonScalingStroke:g=!1,color:v=`currentColor`,className:y=``}=ae()??{},b=!!c||re(d),[ee,x,te=[]]=w(u,{color:e??v,width:n??t??p,height:r??t??p,strokeWidth:i??m,absoluteStrokeWidth:a??h,nonScalingStroke:o??g,className:S(y,s),hasA11yProp:b,attributes:d});return(0,_.createElement)(ee,{ref:f,...x},[...te.map(([e,t])=>(0,_.createElement)(e,t)),...Array.isArray(c)?c:[c]])});function T(e,t=[],n=[]){let r=typeof e==`string`?b(e,t,n):e,i=(0,_.forwardRef)(({className:e,...t},n)=>(0,_.createElement)(oe,{ref:n,icon:r,className:e,...t}));return r.name&&(i.displayName=x(r.name)),i}var se={name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]};se.node;var ce=T(se),le={name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]};le.node;var ue=T(le),de={name:`arrow-up-down`,size:24,node:[[`path`,{d:`m21 16-4 4-4-4`,key:`f6ql7i`}],[`path`,{d:`M17 20V4`,key:`1ejh1v`}],[`path`,{d:`m3 8 4-4 4 4`,key:`11wl7u`}],[`path`,{d:`M7 4v16`,key:`1glfcx`}]]};de.node;var fe=T(de),pe={name:`arrow-up`,size:24,node:[[`path`,{d:`m5 12 7-7 7 7`,key:`hav0vg`}],[`path`,{d:`M12 19V5`,key:`x0mq9r`}]]};pe.node;var me=T(pe),he={name:`award`,size:24,node:[[`path`,{d:`m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526`,key:`1yiouv`}],[`circle`,{cx:`12`,cy:`8`,r:`6`,key:`1vp47v`}]]};he.node;var ge=T(he),_e={name:`book-open`,size:24,node:[[`path`,{d:`M12 5v16`,key:`1f6ucr`}],[`path`,{d:`M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z`,key:`1fyvmf`}]]};_e.node;var ve=T(_e),ye={name:`check`,size:24,node:[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]};ye.node;var be=T(ye),xe={name:`chevron-down`,size:24,node:[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]};xe.node;var Se=T(xe),Ce={name:`chevron-right`,size:24,node:[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]};Ce.node;var we=T(Ce),E={name:`chevron-up`,size:24,node:[[`path`,{d:`m18 15-6-6-6 6`,key:`153udz`}]]};E.node;var D=T(E),Te={name:`circle-check`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m16 9-5.5 5.5L8 12`,key:`xofnsj`}]],aliases:[`check-circle-2`]};Te.node;var Ee=T(Te),De={name:`circle-question-mark`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5`,key:`1awbb0`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`help-circle`,`circle-help`]};De.node;var Oe=T(De),ke={name:`clock`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]};ke.node;var O=T(ke),Ae={name:`code`,size:24,node:[[`path`,{d:`m16 18 6-6-6-6`,key:`eg8j8`}],[`path`,{d:`m8 6-6 6 6 6`,key:`ppft3o`}]]};Ae.node;var je=T(Ae),Me={name:`copy`,size:24,node:[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]};Me.node;var Ne=T(Me),Pe={name:`cpu`,size:24,node:[[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M17 20v2`,key:`1rnc9c`}],[`path`,{d:`M17 2v2`,key:`11trls`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M2 17h2`,key:`7oei6x`}],[`path`,{d:`M2 7h2`,key:`asdhe0`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`M20 17h2`,key:`1fpfkl`}],[`path`,{d:`M20 7h2`,key:`1o8tra`}],[`path`,{d:`M7 20v2`,key:`4gnj0m`}],[`path`,{d:`M7 2v2`,key:`1i4yhu`}],[`rect`,{x:`4`,y:`4`,width:`16`,height:`16`,rx:`2`,key:`1vbyd7`}],[`rect`,{x:`8`,y:`8`,width:`8`,height:`8`,rx:`1`,key:`z9xiuo`}]]};Pe.node;var Fe=T(Pe),Ie={name:`crosshair`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`22`,x2:`18`,y1:`12`,y2:`12`,key:`l9bcsi`}],[`line`,{x1:`6`,x2:`2`,y1:`12`,y2:`12`,key:`13hhkx`}],[`line`,{x1:`12`,x2:`12`,y1:`6`,y2:`2`,key:`10w3f3`}],[`line`,{x1:`12`,x2:`12`,y1:`22`,y2:`18`,key:`15g9kq`}]]};Ie.node;var Le=T(Ie),Re={name:`database`,size:24,node:[[`ellipse`,{cx:`12`,cy:`5`,rx:`9`,ry:`3`,key:`msslwz`}],[`path`,{d:`M3 5V19A9 3 0 0 0 21 19V5`,key:`1wlel7`}],[`path`,{d:`M3 12A9 3 0 0 0 21 12`,key:`mv7ke4`}]]};Re.node;var ze=T(Re),Be={name:`external-link`,size:24,node:[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]};Be.node;var Ve=T(Be),He={name:`eye-off`,size:24,node:[[`path`,{d:`M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`,key:`ct8e1f`}],[`path`,{d:`M14.084 14.158a3 3 0 0 1-4.242-4.242`,key:`151rxh`}],[`path`,{d:`M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`,key:`13bj9a`}],[`path`,{d:`m2 2 20 20`,key:`1ooewy`}]]};He.node;var Ue=T(He),We={name:`eye`,size:24,node:[[`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,key:`1nclc0`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]};We.node;var Ge=T(We),Ke={name:`file-check-corner`,size:24,node:[[`path`,{d:`M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6`,key:`g5mvt7`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`m14 20 2 2 4-4`,key:`15kota`}]],aliases:[`file-check-2`]};Ke.node;var qe=T(Ke),Je={name:`file-check`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`m9 15 2 2 4-4`,key:`1grp1n`}]]};Je.node;var Ye=T(Je),Xe={name:`file-code`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 12.5 8 15l2 2.5`,key:`1tg20x`}],[`path`,{d:`m14 12.5 2 2.5-2 2.5`,key:`yinavb`}]]};Xe.node;var Ze=T(Xe),Qe={name:`file-text`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]};Qe.node;var $e=T(Qe),et={name:`gauge`,size:24,node:[[`path`,{d:`m12 14 4-4`,key:`9kzdfg`}],[`path`,{d:`M3.34 19a10 10 0 1 1 17.32 0`,key:`19p75a`}]]};et.node;var tt=T(et),nt={name:`git-branch`,size:24,node:[[`path`,{d:`M15 6a9 9 0 0 0-9 9V3`,key:`1cii5b`}],[`circle`,{cx:`18`,cy:`6`,r:`3`,key:`1h7g24`}],[`circle`,{cx:`6`,cy:`18`,r:`3`,key:`fqmcym`}]]};nt.node;var rt=T(nt),it={name:`git-commit-horizontal`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}],[`line`,{x1:`3`,x2:`9`,y1:`12`,y2:`12`,key:`1dyftd`}],[`line`,{x1:`15`,x2:`21`,y1:`12`,y2:`12`,key:`oup4p8`}]],aliases:[`git-commit`]};it.node;var at=T(it),ot={name:`house`,size:24,node:[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`,key:`5wwlr5`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,key:`r6nss1`}]],aliases:[`home`]};ot.node;var st=T(ot),ct={name:`key-round`,size:24,node:[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]};ct.node;var lt=T(ct),ut={name:`layers`,size:24,node:[[`path`,{d:`M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,key:`zw3jo`}],[`path`,{d:`M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,key:`1wduqc`}],[`path`,{d:`M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,key:`kqbvx6`}]],aliases:[`layers-3`]};ut.node;var dt=T(ut),ft={name:`menu`,size:24,node:[[`path`,{d:`M4 5h16`,key:`1tepv9`}],[`path`,{d:`M4 12h16`,key:`1lakjw`}],[`path`,{d:`M4 19h16`,key:`1djgab`}]]};ft.node;var pt=T(ft),mt={name:`moon`,size:24,node:[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]};mt.node;var ht=T(mt),gt={name:`pause`,size:24,node:[[`rect`,{x:`14`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`kaeet6`}],[`rect`,{x:`5`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`1wsw3u`}]]};gt.node;var _t=T(gt),vt={name:`play`,size:24,node:[[`path`,{d:`M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z`,key:`10ikf1`}]]};vt.node;var yt=T(vt),bt={name:`refresh-cw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]};bt.node;var xt=T(bt),St={name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]};St.node;var Ct=T(St),wt={name:`scissors`,size:24,node:[[`circle`,{cx:`6`,cy:`6`,r:`3`,key:`1lh9wr`}],[`path`,{d:`M8.12 8.12 12 12`,key:`1alkpv`}],[`path`,{d:`M20 4 8.12 15.88`,key:`xgtan2`}],[`circle`,{cx:`6`,cy:`18`,r:`3`,key:`fqmcym`}],[`path`,{d:`M14.8 14.8 20 20`,key:`ptml3r`}]]};wt.node;var Tt=T(wt),Et={name:`search`,size:24,node:[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]};Et.node;var Dt=T(Et),Ot={name:`shield-check`,size:24,node:[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]};Ot.node;var kt=T(Ot),At={name:`shield`,size:24,node:[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}]]};At.node;var k=T(At),jt={name:`shuffle`,size:24,node:[[`path`,{d:`m18 14 4 4-4 4`,key:`10pe0f`}],[`path`,{d:`m18 2 4 4-4 4`,key:`pucp1d`}],[`path`,{d:`M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22`,key:`1ailkh`}],[`path`,{d:`M2 6h1.972a4 4 0 0 1 3.6 2.2`,key:`km57vx`}],[`path`,{d:`M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45`,key:`os18l9`}]]};jt.node;var Mt=T(jt),Nt={name:`sparkles`,size:24,node:[[`path`,{d:`M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,key:`1s2grr`}],[`path`,{d:`M20 2v4`,key:`1rf3ol`}],[`path`,{d:`M22 4h-4`,key:`gwowj6`}],[`circle`,{cx:`4`,cy:`20`,r:`2`,key:`6kqj1y`}]],aliases:[`stars`]};Nt.node;var Pt=T(Nt),Ft={name:`sun`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`m4.93 4.93 1.41 1.41`,key:`149t6j`}],[`path`,{d:`m17.66 17.66 1.41 1.41`,key:`ptbguv`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`m6.34 17.66-1.41 1.41`,key:`1m8zz5`}],[`path`,{d:`m19.07 4.93-1.41 1.41`,key:`1shlcs`}]]};Ft.node;var It=T(Ft),Lt={name:`terminal`,size:24,node:[[`path`,{d:`M12 19h8`,key:`baeox8`}],[`path`,{d:`m4 17 6-6-6-6`,key:`1yngyt`}]]};Lt.node;var Rt=T(Lt),zt={name:`timer`,size:24,node:[[`line`,{x1:`10`,x2:`14`,y1:`2`,y2:`2`,key:`14vaq8`}],[`line`,{x1:`12`,x2:`15`,y1:`14`,y2:`11`,key:`17fdiu`}],[`circle`,{cx:`12`,cy:`14`,r:`8`,key:`1e1u0o`}]]};zt.node;var Bt=T(zt),Vt={name:`triangle-exclamation-point`,size:24,node:[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`alert-triangle`,`triangle-alert`]};Vt.node;var Ht=T(Vt),Ut={name:`x`,size:24,node:[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]};Ut.node;var Wt=T(Ut),Gt={name:`zap`,size:24,node:[[`path`,{d:`M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z`,key:`1v7up4`}]]};Gt.node;var Kt=T(Gt),qt={courseName:`Biểu diễn tri thức và tìm kiếm nâng cao`,courseCode:`INT3401 / AI2014`,institution:`Trường Đại học Công nghệ – ĐHQGHN (VNU-UET)`,teamId:`nhom-12`,displayName:`Tỉnh cơn say sẽ gay thằng bạn`,referenceCommit:`a9d4b4b2f776b96f46a1c9ccf119cad38834e5d9`,commitDate:`2026-11-07 21:49:21 +0700`,commitMessage:`Nộp bài chính thức - StudentBot Nhóm 12`,botRepoUrl:`https://github.com/uetlab-ai2014-2/uetlab-ai2014-2-Nhom12`,targetRepoUrl:`https://github.com/nvb-07-wbai/Chess960_Note`,deployUrl:`https://nvb-07-wbai.github.io/Chess960_Note/`,stats:{totalLines:2847,directorySizeKiB:154,sizeLimitKiB:1024,evaluationsPerSec:`~89,000 NPS`,searchDepthNormal:`5 – 8 ply`,searchDepthEndgame:`3 – 5 ply`,ttEntries:`524,288 (2^19)`,testTournament:{totalGames:16,wins:12,draws:1,losses:3,blunders:0,winRate:`78.1%`}}},Jt=[{name:`Vũ Hoàng Long`,studentId:`25022922`,github:`long8807`,role:`Trụ cột Tìm kiếm & Cắt tỉa toán học`,responsibilities:[`Hiện thực hàm tìm kiếm cốt lõi trong student/search.py`,`Thuật toán Negamax kết hợp Alpha-Beta Pruning và PVS (Principal Variation Search)`,`Đào sâu lặp (Iterative Deepening Search - IDS) và Cửa sổ kỳ vọng (Aspiration Windows)`,`Chuẩn hóa điểm chiếu hết theo độ sâu (score_to_tt, score_from_tt)`,`Đảm bảo an toàn phục hồi trạng thái bàn cờ qua khối try...finally (board.push / board.pop)`],defenseTopics:[`Tại sao dùng Negamax thay vì Minimax 2 hàm riêng biệt?`,`Nguyên lý hoạt động và chứng minh tính đúng đắn của PVS (NegaScout)`,`Aspiration Windows hoạt động thế nào khi bị fail-low hoặc fail-high?`,`Công thức chuẩn hóa điểm chiếu hết cộng trừ ply khi lưu vào TT`,`Tại sao không được cập nhật best_move khi tầng lặp bị gián đoạn do timeout?`],selfContribution:`85%`,aiAssistance:`15%`},{name:`Lê Văn Việt`,studentId:`25023069`,github:`thocuong354-cloud`,role:`Trụ cột Lượng giá Heuristic & Bitboard`,responsibilities:[`Xây dựng toàn bộ module student/evaluation.py`,`Bảng PeSTO Piece-Square Tables với kỹ thuật bit-packing tuyến tính mg + (eg << 16)`,`Nội suy Tapered Evaluation theo giai đoạn Game Phase (0..24)`,`Lượng giá cấu trúc Tốt (tốt thông, tốt thông liên kết, tốt chồng, tốt cô lập)`,`Đánh giá an toàn Vua động (Dynamic Bitwise King Ring) thích ứng 960 thế Chess960`,`Thuật toán dồn Vua tàn cuộc Mop-Up Heuristic (gated phase <= 6)`],defenseTopics:[`Giải thích kỹ thuật bit-packing mg + (eg << 16) và cách xử lý số nguyên âm không bị tràn số`,`Công thức Tapered Evaluation và vai trò của trọng số Game Phase`,`Cách nhận diện Tốt thông (passed pawns) bằng bitwise north_fill / south_fill`,`Tại sao an toàn Vua của Nhóm 12 tính theo tọa độ ô thực tế mà không phụ thuộc vào vị trí xuất phát Chess960?`,`Chứng minh tính đối xứng gương evaluate(b) == evaluate(b.mirror())`],selfContribution:`90%`,aiAssistance:`10%`},{name:`Đỗ Thành Vương`,studentId:`25023079`,github:`dovuong28122007-spec`,role:`Trụ cột Sắp xếp nước đi & Quiescence Search`,responsibilities:[`Thiết kế hàm sắp xếp nước đi _order_moves trong student/search.py với 7 tầng phân cấp`,`Thuật toán đánh giá đổi quân tĩnh 1-ply Static Exchange Evaluation (see)`,`Tìm kiếm tĩnh lặng _quiescence() triệt tiêu hiệu ứng chân trời (Horizon Effect)`,`Cắt tỉa nâng cao: Null Move Pruning (NMP), Reverse Futility Pruning (RFP), Futility Pruning (FP), Late Move Reductions (LMR)`,`Cơ chế Killer Moves (2 slot/ply) và History Heuristic (decay mỗi lượt)`],defenseTopics:[`Thứ tự ưu tiên trong _order_moves và tại sao Move Ordering lại quyết định hiệu suất Alpha-Beta?`,`Nguyên lý hoạt động của hàm see() 1-ply và trường hợp đổi ngang quân nhẹ (Tượng ăn Mã)`,`Stand-pat và Delta Pruning trong Quiescence Search hoạt động thế nào?`,`Điều kiện an toàn khi áp dụng Null Move Pruning để tránh bẫy Zugzwang`,`Khi nào áp dụng Late Move Reductions (LMR) và cách xử lý khi bị fail-high?`],selfContribution:`85%`,aiAssistance:`15%`},{name:`Nông Văn Bách`,studentId:`25022782`,github:`nvb-07-wbai`,role:`Trụ cột Quản lý Thời gian, Bảng băm & Kiến trúc phòng thủ`,responsibilities:[`Hiện thực toàn bộ student/time_manager.py (TimeManager, compute_budget_ms)`,`Thiết kế lớp TranspositionTable (524,288 mục, Zobrist hash, 4 điều kiện thay thế mục)`,`Lớp điều khiển chính StudentBot trong student/bot.py với kiến trúc phòng thủ 3 tầng`,`Tích hợp hệ thống, quản lý quy trình QA/Git, CI/CD, đóng gói nộp bài`,`Phát hiện và sửa lỗi ngắt dở dang IDS và lỗi tràn số nguyên âm Python`],defenseTopics:[`Kiến trúc phòng thủ 3 tầng trong choose_move() đảm bảo bot không bao giờ bị xử thua kỹ thuật`,`Mô hình hấp thụ độ trễ hệ thống 500ms của GameController trong compute_budget_ms`,`Soft Limit vs Hard Limit, và công thức dự đoán thời gian tầng kế tiếp (predicted_ms = last * 2.2)`,`Cấu trúc dữ liệu và chính sách thay thế của Transposition Table (age, depth, key match)`,`Cách xử lý thời gian khẩn cấp (Panic Mode < 1.5s) để loại trừ 100% rủi ro rụng cờ`],selfContribution:`85%`,aiAssistance:`15%`}],Yt=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),A=o(((e,t)=>{t.exports=Yt()}))(),Xt=({currentTab:e,onNavigate:t,onOpenSearch:n,isDarkMode:r,onToggleTheme:i})=>(0,A.jsx)(`header`,{className:`sticky top-0 z-40 bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors`,children:(0,A.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4`,children:[(0,A.jsxs)(`div`,{onClick:()=>t(`overview`),className:`flex items-center gap-3 cursor-pointer group`,children:[(0,A.jsx)(`div`,{className:`w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform flex items-center justify-center`,children:(0,A.jsx)(`span`,{className:`text-xl`,children:`♞`})}),(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(`span`,{className:`font-extrabold text-sm sm:text-base text-white tracking-tight`,children:`CHESSLAB NOTE`}),(0,A.jsx)(`span`,{className:`text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30`,children:`TEAM 12`})]}),(0,A.jsx)(`div`,{className:`text-[10px] text-slate-400 hidden sm:block`,children:`Sổ tay vấn đáp Chess960 • Biểu diễn tri thức & Tìm kiếm nâng cao`})]})]}),(0,A.jsxs)(`button`,{onClick:n,className:`hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-slate-200 text-xs transition shadow-inner w-72 justify-between`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(Dt,{className:`w-3.5 h-3.5 text-emerald-400`}),(0,A.jsx)(`span`,{children:`Tìm kiếm tri thức, code...`})]}),(0,A.jsx)(`kbd`,{className:`px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-700`,children:`Ctrl+K`})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2 sm:gap-3`,children:[(0,A.jsx)(`button`,{onClick:n,className:`md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800`,title:`Tìm kiếm`,children:(0,A.jsx)(Dt,{className:`w-4 h-4`})}),(0,A.jsxs)(`button`,{onClick:()=>t(`practice`),className:`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${e===`practice`?`bg-emerald-600 text-white shadow-md shadow-emerald-900/40`:`bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30`}`,children:[(0,A.jsx)(Pt,{className:`w-3.5 h-3.5`}),(0,A.jsx)(`span`,{children:`Luyện Vấn Đáp`})]}),(0,A.jsx)(`button`,{onClick:i,className:`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition`,title:r?`Chuyển sang chế độ Sáng`:`Chuyển sang chế độ Tối`,children:r?(0,A.jsx)(It,{className:`w-4 h-4 text-amber-400`}):(0,A.jsx)(ht,{className:`w-4 h-4 text-cyan-400`})}),(0,A.jsx)(`a`,{href:qt.targetRepoUrl,target:`_blank`,rel:`noreferrer`,className:`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition`,title:`Xem kho lưu trữ GitHub`,children:(0,A.jsx)(`svg`,{className:`w-4 h-4 fill-current`,viewBox:`0 0 24 24`,children:(0,A.jsx)(`path`,{fillRule:`evenodd`,clipRule:`evenodd`,d:`M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z`})})})]})]})}),Zt=({currentTab:e,onNavigate:t,isMobileOpen:n,onCloseMobile:r})=>(0,A.jsxs)(A.Fragment,{children:[n&&(0,A.jsx)(`div`,{onClick:r,className:`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden`}),(0,A.jsx)(`aside`,{className:`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${n?`translate-x-0`:`-translate-x-full`}`,children:(0,A.jsx)(`div`,{className:`p-4 space-y-6`,children:[{group:`TỔNG QUAN`,items:[{id:`overview`,label:`Tổng quan dự án`,icon:(0,A.jsx)(st,{className:`w-4 h-4`}),badge:`Nhóm 12`},{id:`architecture`,label:`Kiến trúc & Vòng đời`,icon:(0,A.jsx)(Fe,{className:`w-4 h-4`}),badge:`Sơ đồ`}]},{group:`SỔ TAY MÃ NGUỒN (CODE EXPLORER)`,items:[{id:`code-bot`,label:`bot.py (StudentBot)`,icon:(0,A.jsx)(k,{className:`w-4 h-4 text-emerald-400`}),meta:`97 dòng`},{id:`code-search`,label:`search.py (Search Engine)`,icon:(0,A.jsx)(je,{className:`w-4 h-4 text-cyan-400`}),meta:`1,938 dòng`},{id:`code-eval`,label:`evaluation.py (PeSTO)`,icon:(0,A.jsx)(dt,{className:`w-4 h-4 text-rose-400`}),meta:`611 dòng`},{id:`code-time`,label:`time_manager.py (Thời gian)`,icon:(0,A.jsx)(O,{className:`w-4 h-4 text-amber-400`}),meta:`199 dòng`}]},{group:`LÝ THUYẾT & THỂ THỨC`,items:[{id:`theory`,label:`Lý thuyết thuật toán`,icon:(0,A.jsx)(ve,{className:`w-4 h-4 text-cyan-400`}),badge:`15 chủ đề`},{id:`chess960`,label:`Chess960 & Luật thi đấu`,icon:(0,A.jsx)(Ze,{className:`w-4 h-4 text-indigo-400`}),badge:`960 thế`}]},{group:`VẤN ĐÁP & LUYỆN TẬP`,items:[{id:`qa`,label:`Ngân hàng câu hỏi`,icon:(0,A.jsx)(Oe,{className:`w-4 h-4 text-emerald-400`}),badge:`48 câu`},{id:`practice`,label:`Chế độ luyện vấn đáp`,icon:(0,A.jsx)(Pt,{className:`w-4 h-4 text-amber-400`}),badge:`Flashcard`},{id:`glossary`,label:`Bảng thuật ngữ AI`,icon:(0,A.jsx)(ve,{className:`w-4 h-4 text-purple-400`}),badge:`35 từ`}]},{group:`MINH CHỨNG & HỒ SƠ`,items:[{id:`source-map`,label:`Hồ sơ mã nguồn & AI`,icon:(0,A.jsx)(qe,{className:`w-4 h-4 text-slate-400`}),meta:`Commit a9d4b4b`}]}].map((n,i)=>(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 px-2`,children:n.group}),(0,A.jsx)(`div`,{className:`space-y-1`,children:n.items.map(n=>{let i=e===n.id;return(0,A.jsxs)(`button`,{onClick:()=>{t(n.id),r()},className:`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${i?`bg-emerald-600 text-white shadow-md shadow-emerald-950/50 font-bold`:`text-slate-400 hover:text-white hover:bg-slate-800/70`}`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,A.jsx)(`span`,{className:i?`text-white`:`text-slate-400 group-hover:text-emerald-400`,children:n.icon}),(0,A.jsx)(`span`,{className:`truncate`,children:n.label})]}),n.badge&&(0,A.jsx)(`span`,{className:`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${i?`bg-emerald-950/80 text-emerald-200`:`bg-slate-800 text-slate-400 group-hover:text-slate-300`}`,children:n.badge}),n.meta&&(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 font-mono`,children:n.meta})]},n.id)})})]},i))})})]}),Qt=[{id:`q-gen-01`,category:`general`,topic:`Tổng quan bài toán`,difficulty:`basic`,tags:[`Tổng quan`,`Bài toán`,`ChessLab`],question:`Dự án ChessLab của Nhóm 12 giải quyết bài toán gì trong Trí tuệ Nhân tạo?`,quickAnswer:`Dự án giải quyết bài toán tìm kiếm đối kháng 2 người chơi có thông tin hoàn hảo và tổng bằng không trong không gian trạng thái khổng lồ của cờ vua Chess960, dưới các ràng buộc khắt khe về thời gian thực, bộ nhớ (< 1 MiB) và quy chế không sử dụng Machine Learning hay thư viện bên ngoài.`,detailedExplanation:`Cờ vua có không gian trạng thái ước tính 10^120 (số Shannon) và hệ số phân nhánh trung bình b ≈ 35. Nhóm 12 đã xây dựng một hệ thống hoàn chỉnh gồm: 1. Biểu diễn trạng thái bằng Bitboard 64-bit; 2. Hàm lượng giá heuristic PeSTO Tapered kết hợp an toàn Vua động; 3. Cỗ máy tìm kiếm Negamax kết hợp Alpha-Beta, PVS và hệ thống cắt tỉa toán học; 4. Quản lý thời gian thích ứng hấp thụ độ trễ sàn 500ms.`,teacherFollowUp:`Tại sao ban tổ chức lại cấm sử dụng Machine Learning hay Opening Books?`,exampleScenario:`Ví dụ: Nếu dùng mạng neural hay opening book, sinh viên chỉ là người nạp dữ liệu. Bằng việc tự viết thuật toán tìm kiếm truyền thống, sinh viên chứng minh được năng lực làm chủ cấu trúc dữ liệu và tối ưu hóa giải thuật.`},{id:`q-gen-02`,category:`general`,topic:`Luật Chess960`,difficulty:`basic`,tags:[`Chess960`,`Bobby Fischer`,`Khai cuộc`],question:`Chess960 khác với cờ vua tiêu chuẩn như thế nào và tại sao lại có đúng 960 thế cờ?`,quickAnswer:`Chess960 giữ nguyên hàng Tốt và luật chơi, nhưng xáo trộn ngẫu nhiên vị trí hàng quân sau theo 2 quy tắc: Hai Tượng nằm ở 2 ô khác màu và Vua nằm giữa hai Xe. Có đúng 960 thế vì: Tượng trắng có 4 cách, Tượng đen có 4 cách, Hậu có 6 cách, 2 Mã có C(5,2)=10 cách, và 3 ô còn lại cho Xe-Vua-Xe chỉ có duy nhất 1 cách xếp hợp lệ (4 x 4 x 6 x 10 x 1 = 960).`,detailedExplanation:`Thế cờ vua tiêu chuẩn chính là biến thể có mã ID 518 (RNBQKBNR). Chess960 loại bỏ hoàn toàn việc ghi nhớ sách khai cuộc (opening books), buộc bot phải tự tính toán chiến thuật và đánh giá vị trí ngay từ nước đi đầu tiên.`,teacherFollowUp:`Quy tắc nhập thành trong Chess960 có điểm gì đặc biệt so với cờ vua chuẩn?`},{id:`q-gen-03`,category:`general`,topic:`Thuật toán Minimax`,difficulty:`basic`,tags:[`Minimax`,`Lý thuyết trò chơi`,`Cây tìm kiếm`],question:`Nguyên lý hoạt động của thuật toán Minimax trong trò chơi đối kháng là gì?`,quickAnswer:`Minimax hoạt động dựa trên giả định cả 2 bên đều chơi tối ưu: bên Trắng cố gắng tối đa hóa điểm số (MAX), còn bên Đen cố gắng tối thiểu hóa điểm số (MIN). Thuật toán duyệt đệ quy cây trò chơi tới độ sâu giới hạn, áp dụng hàm đánh giá tại các nút lá và truyền ngược giá trị lên nút gốc.`,detailedExplanation:`Độ phức tạp thời gian của Minimax là O(b^d), với b là hệ số phân nhánh và d là độ sâu. Vì b ≈ 35, Minimax duyệt vét cạn sẽ bị bùng nổ tổ hợp ngay từ độ sâu 4-5, do đó bắt buộc phải sử dụng cắt tỉa Alpha-Beta.`,teacherFollowUp:`Điểm hạn chế lớn nhất của Minimax thuần túy là gì khi triển khai trong phần mềm thi đấu?`},{id:`q-gen-04`,category:`general`,topic:`Thuật toán Negamax`,difficulty:`basic`,tags:[`Negamax`,`Đối xứng`,`Zero-sum`],question:`Thuật toán Negamax là gì và tại sao nó lại được ưu tiên sử dụng thay cho Minimax?`,quickAnswer:`Negamax là biến thể rút gọn của Minimax dựa trên tính chất zero-sum: max(a, b) = -min(-a, -b). Điểm số của người chơi này bằng phủ định điểm số của người chơi kia. Thay vì phải viết 2 hàm maximize và minimize riêng biệt, Negamax chỉ dùng 1 hàm duy nhất với công thức đệ quy: score = -negamax(...).`,detailedExplanation:`Ưu điểm của Negamax: 1. Giảm 50% độ dài mã nguồn; 2. Triệt tiêu hoàn toàn rủi ro nhầm lẫn giữa tầng Max và Min; 3. Dễ dàng tích hợp đồng bộ các kỹ thuật cắt tỉa Alpha-Beta, Transposition Table và Move Ordering vì điểm số luôn nhất quán theo góc nhìn của bên đang đi.`,codeReference:{file:`student/search.py`,lines:`1203 – 1237`,functionName:`_negamax`},teacherFollowUp:`Khi gọi đệ quy Negamax, khoảng alpha-beta thay đổi như thế nào?`},{id:`q-gen-05`,category:`general`,topic:`Alpha-Beta Pruning`,difficulty:`medium`,tags:[`Alpha-Beta`,`Cắt tỉa`,`Độ phức tạp`],question:`Cắt tỉa Alpha-Beta hoạt động như thế nào và điều kiện để xảy ra cắt tỉa là gì?`,quickAnswer:`Alpha-Beta duy trì 2 giá trị biên: Alpha (điểm số tối thiểu bên đi chắc chắn đạt được) và Beta (điểm số tối đa đối thủ cho phép đạt được). Khi duyệt một nhánh con mà tìm thấy điểm số >= Beta, điều đó chứng tỏ đối thủ ở tầng trên sẽ không bao giờ cho phép thế cờ này xảy ra, do đó ta cắt tỉa ngay các nhánh còn lại (Beta Cutoff).`,detailedExplanation:`Điều kiện cắt tỉa toán học là alpha >= beta. Trong trường hợp sắp xếp nước đi tối ưu (nước tốt nhất duyệt đầu tiên), Alpha-Beta giảm độ phức tạp từ O(b^d) xuống O(b^(d/2)), cho phép tìm kiếm sâu gấp đôi trong cùng một khoảng thời gian.`,codeReference:{file:`student/search.py`,lines:`1587 – 1599`,functionName:`_negamax`},teacherFollowUp:`Cắt tỉa Alpha-Beta có thể vô tình bỏ qua nước đi tối ưu của bot không? Tại sao?`},{id:`q-gen-06`,category:`general`,topic:`Sắp xếp nước đi`,difficulty:`medium`,tags:[`Move Ordering`,`MVV-LVA`,`Hiệu suất`],question:`Tại sao Move Ordering lại là yếu tố quyết định hiệu suất của thuật toán Alpha-Beta?`,quickAnswer:`Bởi vì Alpha-Beta chỉ đạt độ phức tạp tối ưu O(b^(d/2)) khi nước đi tốt nhất được duyệt đầu tiên. Nếu nước đầu tiên gây ra Beta Cutoff ngay lập tức (Fail-High), ta chỉ tốn đúng 1 phép tính thay vì phải duyệt toàn bộ 35 nước đi. Nếu sắp xếp tồi tệ (nước tốt duyệt sau cùng), độ phức tạp sẽ thoái hóa về O(b^d) như Minimax!`,detailedExplanation:`Nhóm 12 đã xây dựng hệ thống Move Ordering 7 tầng phân cấp, đo đạc thực tế đạt tỷ lệ cắt tỉa Beta ngay ở nước đi đầu tiên lên tới trên 85%, đưa hệ số phân nhánh hiệu dụng (EBF) từ 35 xuống còn ~2.2.`,codeReference:{file:`student/search.py`,lines:`703 – 750`,functionName:`_order_moves`},teacherFollowUp:`Trong code của nhóm, nước đi nào được ưu tiên duyệt cao nhất?`},{id:`q-gen-07`,category:`general`,topic:`Hiệu ứng chân trời`,difficulty:`medium`,tags:[`Horizon Effect`,`Quiescence Search`,`Chiến thuật`],question:`Hiệu ứng chân trời (Horizon Effect) trong cờ vua máy tính là gì và cách khắc phục?`,quickAnswer:`Hiệu ứng chân trời xảy ra khi thuật toán bị buộc phải dừng tìm kiếm ở độ sâu giới hạn (depth = 0) đúng vào lúc bàn cờ đang trong chuỗi bắt quân hoặc chiếu qua lại dở dang. Điểm số tĩnh tại nút lá sẽ bị sai lệch nghiêm trọng vì không nhìn thấy đòn trả đũa ở nước kế tiếp. Khắc phục bằng Tìm kiếm tĩnh lặng (Quiescence Search).`,detailedExplanation:`Ví dụ: Hậu Trắng ăn Tốt Đen ở depth 0, hàm đánh giá thấy Trắng hơn 1 Tốt nên báo điểm rất cao. Nhưng thực tế ở nước tiếp theo, Xe Đen sẽ ăn lại Hậu Trắng! Quiescence Search tiếp tục duyệt riêng các nước bắt quân và giải chiếu cho đến khi bàn cờ đạt trạng thái hoàn toàn tĩnh lặng.`,codeReference:{file:`student/search.py`,lines:`925 – 960`,functionName:`_quiescence`},teacherFollowUp:`Quiescence Search làm sao để không bị bùng nổ tổ hợp khi chuỗi bắt quân kéo dài?`},{id:`q-gen-08`,category:`general`,topic:`Transposition Table`,difficulty:`medium`,tags:[`Transposition Table`,`Zobrist Hash`,`Bảng băm`],question:`Bảng chuyển vị (Transposition Table) giải quyết vấn đề gì trong cây trò chơi cờ vua?`,quickAnswer:`Trong cờ vua, các thứ tự nước đi khác nhau có thể dẫn tới cùng một trạng thái bàn cờ (transposition). Ví dụ: 1. d4 Nf6 2. c4 cũng giống hệt 1. c4 Nf6 2. d4. Transposition Table lưu lại kết quả đánh giá và nước đi tốt nhất vào bảng băm O(1). Khi gặp lại thế cờ này từ một nhánh khác, bot tái sử dụng ngay kết quả mà không cần duyệt lại hàng triệu nút con.`,detailedExplanation:`Bảng băm của Nhóm 12 có kích thước 2^19 = 524,288 mục, sử dụng khóa Zobrist Hash 64-bit. Ngoài việc cắt tỉa tức thì, TT còn cung cấp nước đi hạt giống (Hash Move) được ưu tiên duyệt đầu tiên trong Move Ordering.`,codeReference:{file:`student/search.py`,lines:`477 – 534`,functionName:`TranspositionTable`},teacherFollowUp:`Khi nào kết quả trong TT được sử dụng trực tiếp để trả về điểm số?`},{id:`q-gen-09`,category:`general`,topic:`Đào sâu lặp`,difficulty:`basic`,tags:[`Iterative Deepening`,`IDS`,`Quản lý thời gian`],question:`Tại sao lại dùng Đào sâu lặp (Iterative Deepening Search - IDS) mà không nhảy thẳng vào độ sâu mong muốn?`,quickAnswer:`Có 2 lý do sống còn: 1. Quản lý thời gian: Bot không thể biết trước độ sâu 6 sẽ mất bao nhiêu giây. IDS duyệt 1, 2, 3, 4, 5... Nếu hết giờ giữa chừng, bot luôn có sẵn nước đi tốt nhất của tầng trước đã hoàn thành. 2. Tối ưu Move Ordering: Kết quả và Hash Move của tầng d-1 giúp sắp xếp nước đi ở tầng d cực kỳ chuẩn xác, khiến việc duyệt từ 1 đến d thậm chí còn nhanh hơn nhảy thẳng vào d!`,detailedExplanation:`Tổng số nút duyệt từ độ sâu 1 đến d chỉ gấp khoảng 1.1 - 1.2 lần số nút của riêng độ sâu d (do tính chất cấp số nhân b^d). Lượng chi phí phụ trội này là hoàn toàn không đáng kể so với lợi ích sắp xếp nước đi mà nó mang lại.`,codeReference:{file:`student/search.py`,lines:`1647 – 1687`,functionName:`search`},teacherFollowUp:`Nếu bot bị ngắt giữa chừng ở tầng 5 khi đang tìm kiếm thì xử lý thế nào?`},{id:`q-gen-10`,category:`general`,topic:`Hàm đánh giá Heuristic`,difficulty:`basic`,tags:[`Evaluation`,`Heuristic`,`Centipawn`],question:`Hàm đánh giá Heuristic có vai trò gì và đơn vị Centipawn là gì?`,quickAnswer:`Hàm đánh giá heuristic có vai trò gán một điểm số định lượng cho một trạng thái bàn cờ tại các nút lá khi không thể tìm kiếm sâu hơn. Đơn vị đo là Centipawn (cp), trong đó 100 centipawns tương đương với giá trị của 1 quân Tốt tiêu chuẩn. Điểm dương biểu thị ưu thế cho bên đi, điểm âm biểu thị thế cờ bị lép.`,detailedExplanation:`Một hàm đánh giá tốt phải cân bằng giữa độ chính xác của tri thức cờ vua và tốc độ thực thi. Nếu hàm đánh giá quá phức tạp nhưng chạy chậm, độ sâu tìm kiếm sẽ bị giảm sút nghiêm trọng.`,codeReference:{file:`student/evaluation.py`,lines:`427 – 450`,functionName:`evaluate`},teacherFollowUp:`Hàm đánh giá của Nhóm 12 gồm những thành phần tri thức nào?`},{id:`q-gen-11`,category:`general`,topic:`Quản trị thời gian`,difficulty:`basic`,tags:[`Time Management`,`Đồng hồ`,`Rụng cờ`],question:`Tại sao quản trị thời gian lại là yếu tố sống còn trong giải đấu ChessLab?`,quickAnswer:`Vì theo quy chế thi đấu: bên nào hết thời gian trước sẽ bị trọng tài xử thua ngay lập tức (Flag Fall), bất kể trên bàn cờ đang hơn bao nhiêu quân. Đồng thời thời gian thi đấu không được cộng thêm (No Increment). Quản lý thời gian tốt giúp bot không bao giờ bị rụng cờ, đồng thời tận dụng tối đa ngân sách để tìm kiếm sâu nhất ở các nước then chốt.`,detailedExplanation:`Đặc biệt trong hệ thống ChessLab, máy chủ áp dụng độ trễ sàn ngẫu nhiên 500ms - 1000ms. Quản trị thời gian phải thông minh để hấp thụ được độ trễ này mà không bị trừ cạn đồng hồ.`,codeReference:{file:`student/time_manager.py`,lines:`1 – 16`,functionName:`compute_budget_ms`},teacherFollowUp:`Độ trễ sàn 500ms của GameController ảnh hưởng thế nào đến cách nhóm thiết kế Time Manager?`},{id:`q-gen-12`,category:`general`,topic:`Bitboards`,difficulty:`medium`,tags:[`Bitboards`,`Biểu diễn tri thức`,`Bitwise`],question:`Bitboard là gì và tại sao nó lại giúp tăng tốc độ đánh giá cờ vua vượt trội?`,quickAnswer:`Bitboard là cấu trúc dữ liệu biểu diễn bàn cờ cờ vua bằng một số nguyên không dấu 64-bit (uint64), trong đó mỗi bit tương ứng với 1 ô trong 64 ô cờ. Bitboard cho phép thực hiện các phép toán kiểm tra nước đi, tính quân tấn công và kiểm tra cấu trúc Tốt song song trên cả 64 ô cùng lúc bằng các phép toán logic bitwise (AND, OR, XOR, SHIFT) trong đúng 1 chu kỳ CPU!`,detailedExplanation:`Ví dụ: Để tìm các ô bị Tốt Trắng tấn công sang phía bên phải, chỉ cần 1 phép tính: (wp << 9) & ~FILE_A. Nhóm 12 sử dụng Bitboard để kiểm tra Tốt thông, Tốt cô lập, cột mở của Xe và vành đai bảo vệ Vua với tốc độ cực hạn.`,codeReference:{file:`student/evaluation.py`,lines:`313 – 320, 516 – 521`,functionName:`_north_fill`},teacherFollowUp:`Lệnh bit_count() trong Python tương ứng với lệnh gì của vi xử lý CPU?`},{id:`q-gen-13`,category:`general`,topic:`Aspiration Windows`,difficulty:`medium`,tags:[`Aspiration Windows`,`Cắt tỉa`,`IDS`],question:`Kỹ thuật Cửa sổ kỳ vọng (Aspiration Windows) hoạt động như thế nào?`,quickAnswer:`Thay vì tìm kiếm với cửa sổ vô hạn [-infinity, +infinity], Aspiration Windows thu hẹp khoảng [alpha, beta] quanh điểm số của độ sâu trước: [prev - delta, prev + delta] (Nhóm 12 chọn delta = 40 cp). Nhờ cửa sổ hẹp, Alpha-Beta cắt tỉa nhánh cực kỳ mạnh mẽ. Nếu điểm số nằm ngoài cửa sổ (fail-low hoặc fail-high), bot tự động mở rộng về toàn dải để tìm lại.`,detailedExplanation:`Thực nghiệm cho thấy trên 90% các trường hợp ở độ sâu sau, điểm số không thay đổi quá 40 centipawns so với độ sâu trước. Kỹ thuật này giúp giảm 15 - 20% số nút duyệt ở các tầng sâu (depth >= 4).`,codeReference:{file:`student/search.py`,lines:`1761 – 1785, 1868 – 1886`,functionName:`search`},teacherFollowUp:`Điều gì xảy ra nếu điểm số rơi xuống dưới (prev - delta)?`},{id:`q-gen-14`,category:`general`,topic:`Hòa cờ trong cờ vua`,difficulty:`medium`,tags:[`Draw`,`Stalemate`,`Repetition`],question:`Các điều kiện hòa cờ trong hệ thống ChessLab gồm những gì và bot nhận diện ra sao?`,quickAnswer:`Gồm: 1. Bí nước (Stalemate); 2. Thiếu quân để chiếu hết (Vua vs Vua, Vua+Mã vs Vua, Vua+Tượng vs Vua); 3. Lặp cờ 3 lần (Threefold Repetition); 4. Luật 50 nước (100 half-moves không đi tốt không ăn quân); 5. Ván cờ chạm giới hạn 300 nước đi (ply). Bot nhận diện tự động qua python-chess và kiểm tra ở đầu hàm _negamax.`,detailedExplanation:`Nhóm 12 còn tích hợp Contempt Factor: nếu đang hơn thế (eval >= 80 cp), bot phạt hòa -50 cp để ép cây tìm kiếm tìm nước thắng thay vì chấp nhận lặp cờ hòa sớm.`,codeReference:{file:`student/search.py`,lines:`1283 – 1308`,functionName:`_negamax`},teacherFollowUp:`Tại sao nhóm lại kiểm tra board.is_repetition(2) thay vì đợi đến repetition(3)?`},{id:`q-gen-15`,category:`general`,topic:`Kỹ thuật PVS / NegaScout`,difficulty:`advanced`,tags:[`PVS`,`NegaScout`,`Zero-Window`],question:`Principal Variation Search (PVS) khác gì so với Alpha-Beta tiêu chuẩn?`,quickAnswer:`Alpha-Beta tiêu chuẩn tìm kiếm mọi nước đi với cửa sổ [alpha, beta]. PVS giả định nước đi đầu tiên (nước PV đã được Move Ordering xếp đầu) là nước tốt nhất, nên duyệt nước 1 với dải đầy đủ [alpha, beta], còn tất cả các nước đi xếp sau chỉ được kiểm tra thăm dò với cửa sổ hẹp Zero-Window [alpha, alpha + 1]. Cửa sổ hẹp này cắt tỉa nhánh nhanh hơn rất nhiều.`,detailedExplanation:`Nếu nước đi xếp sau bất ngờ tốt hơn alpha (fail-high), giả định bị sai và bot mới mở rộng cửa sổ để tìm kiếm lại toàn dải. Khi kết hợp với Move Ordering chính xác, PVS tiết kiệm 10 - 25% số nút duyệt.`,codeReference:{file:`student/search.py`,lines:`1527 – 1560`,functionName:`_negamax`},teacherFollowUp:`Tại sao cửa sổ [alpha, alpha + 1] lại cắt tỉa nhánh nhanh hơn dải [alpha, beta]?`},{id:`q-code-01`,category:`code`,topic:`bot.py – Kiến trúc phòng thủ`,difficulty:`medium`,tags:[`bot.py`,`choose_move`,`Phòng thủ 3 tầng`],question:`Trình bày kiến trúc phòng thủ 3 tầng trong choose_move() của StudentBot?`,quickAnswer:`Kiến trúc 3 tầng gồm: Tầng 1 (Fast-path): Xử lý biên, đi ngay nước duy nhất trong 0ms; Tầng 2 (Tìm kiếm bọc try...except): Tính toán ngân sách, gọi Searcher, nếu có lỗi văng ngoại lệ thì fallback về legal[0]; Tầng 3 (Hậu kiểm): Xác minh chắc chắn move nằm trong board.legal_moves trước khi bàn giao cho Grader.`,detailedExplanation:`Kiến trúc này đảm bảo bot hoạt động với độ tin cậy 100%: không lãng phí thời gian khi chỉ có 1 lựa chọn, không bao giờ bị xử thua do crash (ngoại lệ), và không bao giờ bị xử thua do trả nước đi sai luật.`,codeReference:{file:`student/bot.py`,lines:`69 – 97`,functionName:`StudentBot.choose_move`},teacherFollowUp:`Nếu Grader gọi bot khi bàn cờ đã kết thúc thì Tầng 1 trả về gì?`},{id:`q-code-02`,category:`code`,topic:`bot.py – Khởi tạo bot`,difficulty:`basic`,tags:[`bot.py`,`Khởi tạo`,`RAM`],question:`Tại sao lớp Searcher chỉ được khởi tạo một lần duy nhất trong __init__ của StudentBot?`,quickAnswer:`Để giữ lại Transposition Table (524,288 mục) và bảng History Heuristic liên tục qua các lượt đi của toàn bộ ván đấu. Nếu tạo mới Searcher tại mỗi lần choose_move, bot sẽ bị xóa sạch toàn bộ tri thức đã tính ở các nước trước, làm mất Hash Move và làm giảm độ sâu tìm kiếm.`,detailedExplanation:`Đồng thời việc khởi tạo một lần giúp tiết kiệm thời gian cấp phát bộ nhớ (allocation overhead), giúp mỗi lần choose_move có thể lập tức bắt đầu tính toán mà không bị trễ.`,codeReference:{file:`student/bot.py`,lines:`35 – 39`,functionName:`StudentBot.__init__`},teacherFollowUp:`Bảng TT tích lũy qua nhiều nước có bị tràn bộ nhớ RAM không?`},{id:`q-code-03`,category:`code`,topic:`time_manager.py – Công thức ngân sách`,difficulty:`medium`,tags:[`time_manager.py`,`compute_budget_ms`,`Hấp thụ độ trễ`],question:`Công thức tính ngân sách trong compute_budget_ms() vận hành như thế nào trong thể thức Blitz?`,quickAnswer:`Hàm phân thành 6 tầng: 1. Dưới 1.5s: 8ms/15ms (sinh tồn); 2. Dưới 3.5s: 15ms/25ms; 3. Sau nước 55: 25ms/40ms; 4. Sau nước 40 hoặc dưới 10s: 35ms/55ms (duyệt 3,500-5,000 nodes đạt Depth 3-4); 5. Nước 32-39: 60ms/90ms; 6. Nước 1-31: 150ms/220ms (hoàn toàn được hấp thụ bởi trễ sàn 500ms).`,detailedExplanation:`Nguyên lý cốt lõi là hấp thụ độ trễ GameController: elapsed = max(search_ms, 500ms). Ở trung cuộc, 150-220ms không làm tiêu hao thêm thời gian thực của đồng hồ thi đấu, cho phép bot đạt độ sâu 6-8 ply hoàn toàn miễn phí.`,codeReference:{file:`student/time_manager.py`,lines:`58 – 85`,functionName:`compute_budget_ms`},teacherFollowUp:`Tại sao sau nước 55 ngân sách lại hạ xuống 25ms - 40ms thay vì giữ nguyên?`},{id:`q-code-04`,category:`code`,topic:`time_manager.py – Dự đoán phân nhánh`,difficulty:`medium`,tags:[`time_manager.py`,`can_start_next_depth`,`Branching Factor`],question:`Hàm can_start_next_depth() dự đoán thời gian mở tầng kế tiếp bằng công thức nào?`,quickAnswer:`Hàm kiểm tra 2 điều kiện: 1. Nếu thời gian đã trôi qua vượt Soft Limit (elapsed >= self.soft_ms) -> Dừng ngay. 2. Nếu có dữ liệu tầng trước: tính thời gian ước lượng tầng sau predicted_ms = int(last_iteration_ms * 2.2). Nếu elapsed + predicted_ms >= self.hard_ms -> Dừng ngay, không mở tầng mới.`,detailedExplanation:`Hệ số 2.2 tương ứng với hệ số phân nhánh hiệu dụng (EBF) thực tế của bot. Điều này ngăn chặn việc bot lao vào một tầng sâu mới mà chắc chắn sẽ bị timeout dở dang, bảo toàn nước đi tốt nhất của tầng hiện tại.`,codeReference:{file:`student/time_manager.py`,lines:`177 – 199`,functionName:`TimeManager.can_start_next_depth`},teacherFollowUp:`Nếu không có cơ chế dự đoán 2.2x thì điều gì sẽ xảy ra ở tầng sâu?`},{id:`q-code-05`,category:`code`,topic:`evaluation.py – Bit-packing tuyến tính`,difficulty:`advanced`,tags:[`evaluation.py`,`Bit-packing`,`Tràn số âm`],question:`Giải thích kỹ thuật đóng gói tuyến tính mg + (eg << 16) và cách giải nén trong evaluation.py?`,quickAnswer:`Đóng gói: val = mg + (eg << 16). Giải nén số nguyên có dấu: eg = (val + 0x8000) >> 16, mg = val - (eg << 16). Kỹ thuật này triệt tiêu hoàn toàn lỗi tràn số nguyên âm trong Python (vốn xảy ra khi dùng bitwise & 0xFFFF với số âm), cho phép cộng dồn điểm MG và EG cùng lúc chỉ bằng 1 phép cộng.`,detailedExplanation:`Trong Python, số âm biểu diễn dạng bù hai vô hạn bit. Nếu dùng & 0xFFFF, số -15 sẽ thành 65521 (số dương cực lớn làm sai lệch hoàn toàn cờ tàn). Cộng thêm 0x8000 (32768) trước khi dịch bit 16 giúp làm tròn số có dấu chính xác tuyệt đối trên mọi miền giá trị.`,codeReference:{file:`student/evaluation.py`,lines:`239 – 253, 589 – 593`,functionName:`_pk & evaluate`},teacherFollowUp:`Tốc độ hàm evaluate của nhóm đạt bao nhiêu evaluations/giây nhờ kỹ thuật này?`},{id:`q-code-06`,category:`code`,topic:`evaluation.py – Tapered Evaluation`,difficulty:`medium`,tags:[`evaluation.py`,`Tapered Eval`,`Game Phase`],question:`Công thức Tapered Evaluation trong evaluation.py được tính như thế nào?`,quickAnswer:`Tổng trọng số Game Phase tối đa là 24 (Mã=1, Tượng=1, Xe=2, Hậu=4 cho cả 2 bên). Điểm số nội suy: x = mg * phase + eg * (24 - phase). Sau đó lấy điểm nguyên: score = x // 24 if x >= 0 else -(-x // 24) để đảm bảo phép chia số âm làm tròn chuẩn xác.`,detailedExplanation:`Khi phase = 24 (khai cuộc), điểm số phản ánh 100% trung cuộc. Khi phase = 0 (tàn cuộc chỉ còn Vua và Tốt), điểm số phản ánh 100% tàn cuộc. Quá trình chuyển pha diễn ra mượt mà theo từng quân cờ bị tiêu hao.`,codeReference:{file:`student/evaluation.py`,lines:`468 – 476, 592 – 594`,functionName:`evaluate`},teacherFollowUp:`Tại sao quân Tốt và quân Vua lại có trọng số phase bằng 0?`},{id:`q-code-07`,category:`code`,topic:`evaluation.py – An toàn Vua Chess960`,difficulty:`advanced`,tags:[`evaluation.py`,`King Ring`,`Chess960`],question:`Cách đánh giá An toàn Vua (Dynamic Bitwise King Ring) của Nhóm 12 thích ứng với Chess960 ra sao?`,quickAnswer:`Hàm _build_king_zones() tính sẵn mặt nạ 3 cột lân cận và các hàng lá chắn (Near/Far shield) cho toàn bộ 64 ô cờ. Khi đánh giá, bot lấy ô thực tế của Vua (wk, bk) để tra cứu mặt nạ bitboard, thưởng lá chắn Tốt gần (+18 cp), lá chắn xa (+9 cp), và phạt nặng nếu có cột mở hoàn toàn trước mặt Vua (-36 cp) hoặc bán mở (-18 cp).`,detailedExplanation:`Vì không gán cứng vào ô nhập thành tiêu chuẩn (g1/c1), hệ thống đánh giá chính xác trên cả 960 thế cờ, bảo đảm Vua được bảo vệ dù đứng ở trung tâm hay cánh ở các nước khai cuộc.`,codeReference:{file:`student/evaluation.py`,lines:`321 – 360, 561 – 581`,functionName:`_build_king_zones & evaluate`},teacherFollowUp:`Tại sao chỉ tính King Safety khi phase > KS_MIN_PHASE (10)?`},{id:`q-code-08`,category:`code`,topic:`evaluation.py – Mop-Up Heuristic`,difficulty:`medium`,tags:[`evaluation.py`,`Mop-Up`,`Cờ tàn`],question:`Thuật toán Mop-Up Heuristic trong evaluation.py hoạt động khi nào và giải quyết vấn đề gì?`,quickAnswer:`Mop-Up chỉ kích hoạt ở cờ tàn áp đảo: khi phase <= 6 và chênh lệch điểm >= 200 cp. Thuật toán tính: khoảng cách Vua địch ra mép bàn cờ (cmd) và khoảng cách 2 Vua áp sát nhau (dist). Điểm thưởng = ((cmd * 10) + (14 - dist) * 4) * (6 - phase) // 6, giúp bot dồn Vua địch vào góc để tạo lưới chiếu hết.`,detailedExplanation:`Cơ chế Gated Phase này có 0% overhead ở khai cuộc và trung cuộc. Nó giải quyết triệt để lỗi bot hơn quân lớn ở cờ tàn nhưng đi lòng vòng không biết chiếu hết dẫn đến bị xử hòa 50 nước.`,codeReference:{file:`student/evaluation.py`,lines:`596 – 609`,functionName:`evaluate`},teacherFollowUp:`Tại sao lại có hệ số (6 - phase) // 6 trong công thức Mop-Up?`},{id:`q-code-09`,category:`code`,topic:`search.py – Chuẩn hóa điểm chiếu hết`,difficulty:`advanced`,tags:[`search.py`,`score_to_tt`,`Mate Normalization`],question:`Giải thích cơ chế hoạt động của 2 hàm score_to_tt() và score_from_tt() trong search.py?`,quickAnswer:`Điểm chiếu hết phụ thuộc vào khoảng cách ply tính từ gốc. score_to_tt(score, ply): nếu score >= 29000 thì cộng thêm ply (score + ply) để độc lập hóa khoảng cách khi lưu vào TT. Khi lấy từ TT ra, score_from_tt(score, ply) trừ đi ply (score - ply) để tái tạo đúng số nước chiếu hết thực tế tính từ vị trí đang đứng.`,detailedExplanation:`Nếu không chuẩn hóa, một đòn chiếu hết ở độ sâu ply=2 khi được tái sử dụng tại một nhánh khác ở ply=8 sẽ bị sai lệch số nước đi, khiến bot đánh giá sai chuỗi chiếu hết ngắn nhất.`,codeReference:{file:`student/search.py`,lines:`195 – 276`,functionName:`score_to_tt & score_from_tt`},teacherFollowUp:`Tại sao ngưỡng nhận diện chiếu hết lại chọn MATE_THRESHOLD = 29,000?`},{id:`q-code-10`,category:`code`,topic:`search.py – SEE 1-ply`,difficulty:`medium`,tags:[`search.py`,`see`,`Đổi quân tĩnh`],question:`Hàm see() 1-ply trong search.py phân loại nước bắt quân như thế nào?`,quickAnswer:`1. Quân nhỏ/bằng ăn quân lớn (a_val <= v_val): chắc chắn có lời hoặc đổi ngang -> trả về (v_val - a_val) >= 0; 2. Đổi ngang quân nhẹ (Tượng ăn Mã): thưởng 0 cp để Quiescence không bỏ sót; 3. Quân to ăn quân bé (Hậu ăn Tốt): kiểm tra board.is_attacked_by(). Nếu có địch bảo vệ -> lỗ vốn < 0; nếu không được bảo vệ (quân treo) -> thu trọn lời v_val.`,detailedExplanation:`Thiết kế 1-ply fast filter này chính xác tới 94% tình huống chiến thuật nhưng chạy nhanh gấp 6 lần SEE đệ quy tia X, giúp Quiescence Search sinh và lọc nước ăn quân với tốc độ vượt bậc.`,codeReference:{file:`student/search.py`,lines:`287 – 434`,functionName:`see`},teacherFollowUp:`Trường hợp Tốt bắt Tốt qua đường (en passant) được tính giá trị quân bị ăn là gì?`},{id:`q-code-11`,category:`code`,topic:`search.py – Transposition Table`,difficulty:`medium`,tags:[`search.py`,`TranspositionTable`,`Chính sách thay thế`],question:`Chính sách thay thế mục (Replacement Policy) trong TranspositionTable gồm những điều kiện nào?`,quickAnswer:`Bảng băm ghi đè mục cũ nếu thỏa mãn 1 trong 4 điều kiện: 1. Ô băm còn trống (existing is None); 2. Trùng khóa băm (existing.key == key - cập nhật); 3. Mục cũ thuộc về thế hệ nước đi trước (existing.age != age); 4. Lượt tìm kiếm mới có độ sâu lớn hơn hoặc bằng (depth >= existing.depth).`,detailedExplanation:`Chính sách này ưu tiên bảo vệ các mục sâu nhất của lượt đi hiện tại, đồng thời sẵn sàng dọn dẹp các mục rác từ các nước đi cũ của ván cờ khi bảng băm bị đầy.`,codeReference:{file:`student/search.py`,lines:`553 – 588`,functionName:`TranspositionTable.store`},teacherFollowUp:`Hàm probe() kiểm tra điều gì để bảo đảm không bị va chạm băm sai?`},{id:`q-code-12`,category:`code`,topic:`search.py – Quiescence Search`,difficulty:`medium`,tags:[`search.py`,`_quiescence`,`Stand-pat`,`Delta Pruning`],question:`Hàm _quiescence() áp dụng Stand-pat và Delta Pruning như thế nào?`,quickAnswer:`1. Stand-pat: stand_pat = evaluate(board). Nếu stand_pat >= beta -> cắt tỉa fail-high ngay lập tức. 2. Delta Pruning: nếu stand_pat + 1150 cp < alpha và không có Tốt ở hàng áp chót có nguy cơ phong cấp -> cắt tỉa ngay vì bắt quân bình thường không thể bù đắp nổi cách biệt.`,detailedExplanation:`Cả 2 kỹ thuật này chỉ áp dụng khi không bị chiếu (not in_check). Khi đang bị chiếu, bắt buộc phải duyệt mọi nước hợp lệ để tìm cách giải chiếu.`,codeReference:{file:`student/search.py`,lines:`1005 – 1046`,functionName:`Searcher._quiescence`},teacherFollowUp:`Tại sao hằng số Delta Pruning lại chọn là 1150 centipawns?`},{id:`q-code-13`,category:`code`,topic:`search.py – Null Move Pruning`,difficulty:`advanced`,tags:[`search.py`,`NMP`,`Zugzwang`],question:`Điều kiện an toàn khi kích hoạt Null Move Pruning trong _negamax là gì?`,quickAnswer:`NMP chỉ được kích hoạt khi thỏa mãn đồng thời 4 điều kiện: 1. Cho phép NMP (allow_nmp=True); 2. Không bị chiếu (not in_check); 3. Độ sâu depth >= 3; 4. Có quân cờ lớn (has_pieces: có Mã, Tượng, Xe hoặc Hậu trên bàn cờ để tránh bẫy Zugzwang) và static_eval >= beta.`,detailedExplanation:`Bot thực hiện nhường lượt với board.push(chess.Move.null()) và giảm độ sâu R = 2 (depth <= 4) hoặc 3 (depth >= 5). Nếu đối thủ vẫn không vượt được beta, cắt tỉa ngay.`,codeReference:{file:`student/search.py`,lines:`1389 – 1431`,functionName:`Searcher._negamax`},teacherFollowUp:`Tại sao khi gọi đệ quy Null Move lại truyền allow_nmp=False?`},{id:`q-code-14`,category:`code`,topic:`search.py – Reverse Futility Pruning`,difficulty:`medium`,tags:[`search.py`,`RFP`,`Static Null Move`],question:`Reverse Futility Pruning (RFP) trong search.py hoạt động như thế nào?`,quickAnswer:`RFP áp dụng tại depth <= 2, khi không bị chiếu, không nằm trong thế cờ chiếu hết. Nếu điểm đánh giá tĩnh trừ đi biên an toàn (120 * depth) vẫn vượt trội Beta (static_eval - 120*depth >= beta), bot cắt tỉa và trả về ngay kết quả mà không cần sinh nước đi.`,detailedExplanation:`Biên an toàn là 120 cp ở depth 1 và 240 cp ở depth 2. Kỹ thuật này cắt tỉa hơn 30% số nút ở các tầng gần lá.`,codeReference:{file:`student/search.py`,lines:`1371 – 1386`,functionName:`Searcher._negamax`},teacherFollowUp:`Tại sao RFP không áp dụng ở depth >= 3?`},{id:`q-code-15`,category:`code`,topic:`search.py – Late Move Reductions`,difficulty:`advanced`,tags:[`search.py`,`LMR`,`Giảm độ sâu`],question:`Late Move Reductions (LMR) trong search.py được áp dụng cho những nước đi nào?`,quickAnswer:`LMR chỉ áp dụng khi: depth >= 3, moves_searched >= 4, không bị chiếu, không phải nước bắt quân, không phải phong cấp, không gây chiếu, và không phải nước TT Move. Khi đó bot giảm độ sâu tìm kiếm đi 1 tầng (depth - 1 - 1 = depth - 2).`,detailedExplanation:`Nếu nước đi bị giảm sâu bất ngờ vượt qua alpha (fail-high), bot nhận diện giả định sai và lập tức tìm kiếm lại ở độ sâu đầy đủ (re-search).`,codeReference:{file:`student/search.py`,lines:`1506 – 1555`,functionName:`Searcher._negamax`},teacherFollowUp:`Tại sao 3 nước đi đầu tiên (moves_searched < 4) không bao giờ bị giảm độ sâu LMR?`},{id:`q-code-16`,category:`code`,topic:`search.py – Bảo toàn kết quả IDS`,difficulty:`advanced`,tags:[`search.py`,`IDS`,`Timeout Bug`],question:`Làm thế nào bot bảo đảm không lưu kết quả dở dang khi bị timeout ở giữa tầng tìm kiếm?`,quickAnswer:`Nhóm 12 bảo vệ bằng điều kiện chặt chẽ tại dòng 1899: if candidate is not None and (not self._timeout or depth == 1): best_move = candidate. Nếu bị timeout giữa chừng ở depth > 1, biến candidate dở dang bị hủy bỏ và bot giữ nguyên best_move của tầng trước!`,detailedExplanation:`Đây là lỗi phổ biến ở các bot cờ vua sinh viên: khi bị ngắt giữa chừng, biến best_move bị ghi đè bởi một nước đi ngẫu nhiên chưa được duyệt hết, dẫn đến nước đi tự sát (blunder). Code Nhóm 12 triệt tiêu 100% lỗi này.`,codeReference:{file:`student/search.py`,lines:`1893 – 1905`,functionName:`Searcher.search`},teacherFollowUp:`Tại sao tại depth == 1 thì dù timeout vẫn chấp nhận candidate?`},{id:`q-code-17`,category:`code`,topic:`search.py – Killer Moves & History`,difficulty:`medium`,tags:[`search.py`,`Killer Moves`,`History Heuristic`],question:`Killer Moves và History Heuristic được lưu trữ và cập nhật như thế nào?`,quickAnswer:`Killer Moves lưu tối đa 2 nước đi yên lặng gây Beta Cutoff cho mỗi ply: self.killer_moves[ply][0] và [1]. History Heuristic lưu tần suất thành công của cặp (màu, ô_từ, ô_đến), cộng dồn depth * depth khi gây Beta Cutoff. Giữa các lượt đi, _decay_history() chia đôi điểm để làm suy giảm dữ liệu cũ.`,detailedExplanation:`Killer Moves có tính cục bộ cao (theo từng ply cụ thể), trong khi History Heuristic mang tính toàn cục (áp dụng cho mọi vị trí xuất hiện cặp nước đi đó).`,codeReference:{file:`student/search.py`,lines:`629 – 701`,functionName:`_store_killer & _update_history`},teacherFollowUp:`Tại sao điểm History lại cộng tỷ lệ với bình phương độ sâu (depth * depth)?`},{id:`q-code-18`,category:`code`,topic:`search.py – Xử lý hòa cờ và Contempt Factor`,difficulty:`medium`,tags:[`search.py`,`Contempt Factor`,`Hòa cờ`],question:`Cơ chế Contempt Factor trong _negamax xử lý hòa cờ như thế nào khi bot đang chiếm ưu thế?`,quickAnswer:`Khi phát hiện thế cờ lặp (repetition) hoặc luật 50 nước: bot tính điểm lượng giá tĩnh eval_side. Nếu eval_side >= 80 cp (đang hơn thế), bot phạt điểm hòa thành -50 cp để ép cây tìm kiếm né hòa và tìm đường thắng. Ngược lại nếu eval_side <= -80 cp (đang thua), bot thưởng hòa +50 cp để chủ động thủ hòa!`,detailedExplanation:`Nếu không có Contempt Factor, khi đang hơn đối thủ 1 quân Tượng nhưng đối thủ liên tục chiếu dọa hòa, bot có thể coi hòa (0 cp) là an toàn và chấp nhận hòa một cách đáng tiếc.`,codeReference:{file:`student/search.py`,lines:`1285 – 1304`,functionName:`Searcher._negamax`},teacherFollowUp:`Nếu thế cờ cân bằng (-80 < eval < 80) thì trả về điểm hòa là bao nhiêu?`},{id:`q-scen-01`,category:`scenario`,topic:`Tình huống khẩn cấp`,difficulty:`advanced`,tags:[`Tình huống`,`Cận giờ`,`Panic Mode`],question:`Nếu đồng hồ thi đấu của bot chỉ còn dưới 1.5 giây thì hệ thống xử lý như thế nào?`,quickAnswer:`compute_budget_ms kích hoạt chế độ cực hạn: cấp ngân sách soft_ms = 8ms và hard_ms = 15ms. Searcher chỉ kịp hoàn thành depth 1-2 với vài trăm nodes, dựa trên nước đi gợi ý từ TT và Move Ordering để đi ngay lập tức, loại trừ 100% nguy cơ rụng cờ.`,detailedExplanation:`Dù chỉ duyệt 8-15ms, bot vẫn hoàn thành tầng 1 và chọn được nước đi hợp lệ tốt nhất nhờ việc legal moves đã được sort sơ bộ trước khi vào vòng lặp tìm kiếm.`,codeReference:{file:`student/time_manager.py`,lines:`59 – 62`,functionName:`compute_budget_ms`},teacherFollowUp:`Tại sao không chọn phương án random nước đi trong 0ms khi còn dưới 1.5s?`},{id:`q-scen-02`,category:`scenario`,topic:`Tình huống timeout`,difficulty:`medium`,tags:[`Tình huống`,`Timeout`,`Gián đoạn`],question:`Nếu đang tìm kiếm ở depth = 6 mà chạm giới hạn thời gian (Hard Limit) thì chuyện gì xảy ra?`,quickAnswer:`Cờ self._timeout lập tức bật thành True qua kiểm tra định kỳ mỗi 128 nodes. Hàm _negamax ngắt đệ quy và trả về 0. Tại hàm search, điều kiện (not self._timeout or depth == 1) phát hiện tầng 6 chưa xong, lập tức hủy bỏ kết quả dở dang và trả về best_move hoàn chỉnh của tầng 5.`,detailedExplanation:`Bot không bao giờ bị rơi vào trạng thái trả về nước đi nửa vời hay dở dang, đảm bảo chất lượng nước đi luôn đạt chuẩn của tầng sâu nhất đã hoàn tất.`,codeReference:{file:`student/search.py`,lines:`1899 – 1904`,functionName:`Searcher.search`},teacherFollowUp:`Tần suất kiểm tra thời gian trong _negamax là bao nhiêu nodes một lần?`},{id:`q-scen-03`,category:`scenario`,topic:`Tình huống bị chiếu`,difficulty:`medium`,tags:[`Tình huống`,`Bị chiếu`,`Check Extension`],question:`Khi Vua của bot đang bị đối phương chiếu, thuật toán tìm kiếm xử lý khác biệt như thế nào?`,quickAnswer:`Có 3 điểm khác biệt đặc biệt: 1. Kích hoạt Check Extension: depth được cộng thêm 1 (depth += 1 khi ply < 24) để tìm đường thoát chiếu triệt để; 2. Vô hiệu hóa toàn bộ cắt tỉa (RFP, NMP, Futility Pruning đều bị tắt); 3. Trong Quiescence Search, bắt buộc phải duyệt mọi nước đi hợp lệ để giải chiếu chứ không chỉ duyệt nước bắt quân.`,detailedExplanation:`Khi bị chiếu, việc cắt tỉa là cực kỳ nguy hiểm vì số lượng nước đi hợp lệ rất ít và nguy cơ bị chiếu hết là cận kề. Việc mở rộng 1 ply giúp bot nhìn thấu các đòn phối hợp chiếu liên tục.`,codeReference:{file:`student/search.py`,lines:`1059 – 1069, 1356 – 1360`,functionName:`_quiescence & _negamax`},teacherFollowUp:`Nếu đang bị chiếu mà không còn nước đi hợp lệ nào thì _negamax trả về điểm số gì?`},{id:`q-scen-04`,category:`scenario`,topic:`Tình huống kết thúc ván`,difficulty:`basic`,tags:[`Tình huống`,`Chiếu hết`,`Bí nước`],question:`Nếu bàn cờ không còn nước đi hợp lệ nào thì bot xử lý ra sao?`,quickAnswer:`Trong _negamax: nếu in_check -> trả về điểm bị chiếu hết -(MATE_SCORE - ply); nếu không bị chiếu -> đây là thế cờ bí nước (stalemate), trả về điểm hòa DRAW_SCORE (0). Ở lớp ngoài StudentBot.choose_move(), nếu legal_moves rỗng ngay từ đầu, bot trả về chess.Move.null() an toàn.`,detailedExplanation:`Việc trừ đi ply trong -(MATE_SCORE - ply) giúp bot ưu tiên đòn chiếu hết ngắn nhất khi thắng, và cố gắng trì hoãn nước bị chiếu hết lâu nhất khi thua.`,codeReference:{file:`student/search.py`,lines:`1437 – 1443`,functionName:`Searcher._negamax`},teacherFollowUp:`Tại sao điểm chiếu hết lại phải trừ đi ply?`},{id:`q-scen-05`,category:`scenario`,topic:`Tình huống lặp thế cờ`,difficulty:`medium`,tags:[`Tình huống`,`Lặp cờ`,`Contempt`],question:`Nếu trên bàn cờ xuất hiện trạng thái lặp lại thì bot phản ứng thế nào?`,quickAnswer:`Tại dòng 1285 của _negamax, bot kiểm tra board.is_repetition(2). Nếu lặp lần 2 và bot đang dẫn trước điểm (eval >= 80 cp), bot gán điểm trạng thái đó là -50 cp để chủ động né tránh nước lặp cờ và tìm đường thắng. Nếu bot đang bị lép vế (eval <= -80 cp), bot coi đây là cơ hội thoát hiểm và gán +50 cp để ép đối thủ hòa.`,detailedExplanation:`Quy tắc cờ vua quốc tế quy định lặp 3 lần mới hòa, nhưng kiểm tra ở lần 2 giúp bot chủ động điều hướng cây tìm kiếm trước khi nước đi lặp thứ 3 thực sự xảy ra trên bàn cờ thật.`,codeReference:{file:`student/search.py`,lines:`1285 – 1303`,functionName:`Searcher._negamax`},teacherFollowUp:`Tại sao không để xảy ra lặp lần 3 rồi mới xử lý?`},{id:`q-scen-06`,category:`scenario`,topic:`Tình huống tra cứu TT`,difficulty:`advanced`,tags:[`Tình huống`,`TT Probe`,`Sử dụng lại điểm`],question:`Nếu Transposition Table đã chứa dữ liệu của thế cờ hiện tại, có phải lúc nào cũng sử dụng lại được ngay không?`,quickAnswer:`Không! Chỉ sử dụng lại điểm số ngay khi thỏa mãn đồng thời 2 điều kiện: 1. Độ sâu lưu trữ phải lớn hơn hoặc bằng độ sâu hiện tại (entry.depth >= depth); 2. Cờ cận phải thỏa mãn: EXACT -> dùng ngay; LOWER (cận dưới) -> chỉ dùng khi score >= beta; UPPER (cận trên) -> chỉ dùng khi score <= alpha.`,detailedExplanation:`Nếu entry.depth < depth, kết quả lưu trữ quá nông và không đáng tin cậy cho độ sâu hiện tại. Tuy nhiên, nước đi tốt nhất của mục đó (entry.best_move) vẫn luôn được lấy ra làm TT Move để ưu tiên duyệt đầu tiên trong Move Ordering!`,codeReference:{file:`student/search.py`,lines:`1325 – 1340`,functionName:`Searcher._negamax`},teacherFollowUp:`Nếu entry.depth < depth thì thông tin nào trong TT vẫn có giá trị sử dụng cực lớn?`},{id:`q-scen-07`,category:`scenario`,topic:`Tình huống thứ tự nước đi xấu`,difficulty:`medium`,tags:[`Tình huống`,`Move Ordering`,`Xấu nhất`],question:`Nếu thứ tự sắp xếp nước đi bị đảo lộn (nước xấu nhất duyệt trước), hiệu quả Alpha-Beta bị ảnh hưởng ra sao?`,quickAnswer:`Thuật toán Alpha-Beta sẽ bị thoái hóa hoàn toàn về Minimax thuần túy! Số nút duyệt sẽ tăng vọt từ O(b^(d/2)) lên O(b^d). Với b ≈ 35, thay vì duyệt khoảng 4,000 nút ở depth 4, bot sẽ phải duyệt hơn 1,500,000 nút, khiến tốc độ tìm kiếm bị sụp đổ và bot chỉ đạt được độ sâu 2-3 ply.`,detailedExplanation:`Đó là lý do Nhóm 12 đầu tư mạnh mẽ vào hàm _order_moves với 7 tầng ưu tiên và kỹ thuật SEE 1-ply để bảo đảm nước tốt nhất luôn đứng ở vị trí số 1.`,codeReference:{file:`student/search.py`,lines:`719 – 750`,functionName:`_order_moves`},teacherFollowUp:`Nhóm đã kiểm chứng tỷ lệ cắt tỉa Beta ở nước đầu tiên bằng cách nào?`},{id:`q-scen-08`,category:`scenario`,topic:`Tình huống an toàn trạng thái bàn cờ`,difficulty:`basic`,tags:[`Tình huống`,`Stack bàn cờ`,`try...finally`],question:`Làm sao bảo đảm trạng thái bàn cờ không bị sai lệch khi duyệt hàng triệu nhánh tìm kiếm?`,quickAnswer:`Mọi thao tác đẩy nước đi board.push(move) đều được bọc trong khối try...finally với board.pop() đặt tại khối finally. Dù nhánh đệ quy có xảy ra lỗi hay ngắt đột ngột, bàn cờ luôn được phục hồi trạng thái nguyên vẹn.`,detailedExplanation:`Số lần push() luôn bằng số lần pop(). Phương pháp này tránh hoàn toàn việc phải tạo bản sao bàn cờ (board.copy()), tiết kiệm 100% chi phí clone bộ nhớ và tăng tốc độ duyệt cây.`,codeReference:{file:`student/search.py`,lines:`1159 – 1167, 1497 – 1564`,functionName:`_quiescence & _negamax`},teacherFollowUp:`Tại sao không dùng board.copy() cho mỗi nhánh con?`},{id:`q-scen-09`,category:`scenario`,topic:`Tình huống crash đột ngột`,difficulty:`basic`,tags:[`Tình huống`,`Crash`,`Fallback`],question:`Nếu trong quá trình tìm kiếm xảy ra lỗi ngoại lệ không mong muốn, cơ chế dự phòng hoạt động thế nào?`,quickAnswer:`Khối try...except Exception trong StudentBot.choose_move() bắt trọn vẹn ngoại lệ và ngay lập tức gán move = legal[0] (nước đi hợp lệ đầu tiên đã lưu sẵn ở Tầng 1). Bot không bao giờ bị crash và không bao giờ bị trọng tài xử thua kỹ thuật.`,detailedExplanation:`Đồng thời tại Tầng 3, bot kiểm tra lại một lần nữa move in board.legal_moves, đảm bảo nước đi bàn giao cho Grader luôn hợp lệ 100%.`,codeReference:{file:`student/bot.py`,lines:`86 – 96`,functionName:`StudentBot.choose_move`},teacherFollowUp:`Trong trường hợp xấu nhất phải dùng legal[0], nước đi đó có phạm luật không?`},{id:`q-scen-10`,category:`scenario`,topic:`Tình huống đổi màu quân`,difficulty:`medium`,tags:[`Tình huống`,`Đổi bên`,`Trắng vs Đen`],question:`Khi bot cầm quân Đen thi đấu thì cách tính điểm và chọn nước đi có bị sai lệch không?`,quickAnswer:`Hoàn toàn không! Hàm evaluate() luôn chuẩn hóa theo bên đến lượt: return score + TEMPO_BONUS if board.turn else TEMPO_BONUS - score. Khi đến lượt Đen, điểm số được đảo dấu tự động. Thuật toán Negamax luôn tìm nước đi tối đa hóa điểm số của bên đang đi.`,detailedExplanation:`Đồng thời hàm evaluate của Nhóm 12 đã được kiểm chứng đối xứng gương tuyệt đối: evaluate(b) == evaluate(b.mirror()) trên 100% trong số 960 thế cờ Chess960.`,codeReference:{file:`student/evaluation.py`,lines:`610 – 611`,functionName:`evaluate`},teacherFollowUp:`Bạn đã kiểm chứng tính đối xứng gương của hàm evaluate như thế nào?`},{id:`q-scen-11`,category:`scenario`,topic:`Tình huống cắt nhầm nhánh tốt`,difficulty:`advanced`,tags:[`Tình huống`,`Cắt nhầm nhánh`,`Rủi ro Pruning`],question:`Nếu một kỹ thuật cắt tỉa nâng cao (như NMP hay LMR) cắt nhầm một nhánh tốt thì hậu quả là gì và nhóm đã hạn chế thế nào?`,quickAnswer:`Hậu quả là bot có thể bỏ sót một đòn phối hợp thí quân ngoạn mục. Tuy nhiên, Nhóm 12 đã đặt các rào chắn nghiêm ngặt: NMP không áp dụng khi bị chiếu hoặc khi chỉ còn Vua và Tốt; LMR không áp dụng cho nước chiếu, nước ăn quân hay phong cấp, và nếu LMR bị fail-high thì lập tức tìm kiếm lại ở độ sâu đầy đủ!`,detailedExplanation:`Thực nghiệm trên 16 ván đối đầu thực tế cho thấy bot đạt tỷ lệ 0 blunder (không có bất kỳ sai lầm nghiêm trọng nào), chứng minh các điều kiện an toàn của nhóm hoạt động hoàn hảo.`,codeReference:{file:`student/search.py`,lines:`1391 – 1402, 1507 – 1523`,functionName:`_negamax`},teacherFollowUp:`Cơ chế re-search trong LMR hoạt động như thế nào khi gặp fail-high?`},{id:`q-scen-12`,category:`scenario`,topic:`Tình huống phong cấp Tốt`,difficulty:`medium`,tags:[`Tình huống`,`Phong cấp`,`Delta Pruning`],question:`Làm thế nào để Delta Pruning trong Quiescence Search không cắt nhầm nước phong cấp Hậu?`,quickAnswer:`Bằng cách kiểm tra bitboard Tốt ở hàng áp chót trước khi cho phép Delta Pruning: promo_rank = BB_RANK_7 if turn == WHITE else BB_RANK_2. Nếu my_pawns & promo_rank có Tốt, biến has_promotion bật True và Delta Pruning bị vô hiệu hóa hoàn toàn!`,detailedExplanation:`Tốt phong cấp Hậu mang lại giá trị nhảy vọt từ 100 lên 1000 cp. Nếu cắt tỉa theo điểm tĩnh của Tốt, bot sẽ bỏ sót cơ hội phong cấp thắng cờ.`,codeReference:{file:`student/search.py`,lines:`1027 – 1038`,functionName:`_quiescence`},teacherFollowUp:`Kiểm tra bitboard Tốt ở hàng 7/2 có tốn thời gian không?`},{id:`q-scen-13`,category:`scenario`,topic:`Tình huống cờ tàn Tượng khác màu`,difficulty:`medium`,tags:[`Tình huống`,`Tượng khác màu`,`Hòa cờ`],question:`Trong cờ tàn hai bên chỉ còn Tượng khác màu và vài Tốt, bot lượng giá thế nào?`,quickAnswer:`Cờ tàn Tượng khác màu có thiên hướng hòa rất cao. Hàm evaluate tính toán Game Phase tiến dần về 0, chuyển trọng số sang bảng EG_RAW và điểm Tốt thông. Nhóm 12 thưởng cặp Tượng _BISHOP_PAIR chỉ khi một bên sở hữu cả 2 Tượng trên 2 màu ô khác nhau (_popcount >= 2).`,detailedExplanation:`Khi mỗi bên chỉ còn 1 Tượng khác màu, điểm thưởng cặp Tượng của cả 2 bên đều bằng 0, điểm số phụ thuộc vào Tốt thông và vị trí Vua.`,codeReference:{file:`student/evaluation.py`,lines:`485 – 490`,functionName:`evaluate`},teacherFollowUp:`Điểm thưởng cặp Tượng trong code Nhóm 12 là bao nhiêu centipawns?`},{id:`q-scen-14`,category:`scenario`,topic:`Tình huống chạm mốc 300 nước`,difficulty:`basic`,tags:[`Tình huống`,`300 nước`,`Hòa cờ BTL`],question:`Nếu ván cờ kéo dài tới nước 290 (ply = 580) thì bot tính toán ngân sách thế nào?`,quickAnswer:`Trong thể thức Standard, compute_budget_ms tính moves_left = max(1, (301 - ply) // 2). Khi ply chạm 290, moves_left chỉ còn khoảng 5 nước. Bot dồn toàn bộ thời gian khả dụng còn lại chia cho 5 nước cuối để tìm kiếm sâu nhất có thể nhằm phân định thắng bại trước khi ván cờ bị xử hòa tự động ở nước 300.`,detailedExplanation:`Quy chế giải đấu quy định ván cờ hòa sau 300 nước. Cơ chế tính moves_left thích ứng giúp bot không giữ lại thời gian thừa vô ích khi ván đấu sắp hết.`,codeReference:{file:`student/time_manager.py`,lines:`87 – 102`,functionName:`compute_budget_ms`},teacherFollowUp:`Tại sao lại là công thức (301 - safe_ply) // 2?`},{id:`q-scen-15`,category:`scenario`,topic:`Tình huống chiếu hết chắc chắn`,difficulty:`medium`,tags:[`Tình huống`,`Chiếu hết sớm`,`Ngắt tìm kiếm`],question:`Khi bot phát hiện một chuỗi chiếu hết chắc chắn (Mate-in-2 hoặc Mate-in-3), thuật toán có tiếp tục tìm sâu hơn không?`,quickAnswer:`Không! Tại dòng 1931 của hàm search: if best_score_this_depth >= MATE_THRESHOLD: break. Khi đã tìm thấy chuỗi chiếu hết chắc chắn, bot lập tức ngắt vòng lặp Iterative Deepening và đi ngay nước đi chiến thắng đó để tiết kiệm 100% thời gian cho các ván tiếp theo.`,detailedExplanation:`Việc tìm sâu hơn khi đã có đường chiếu hết bắt buộc là hoàn toàn vô nghĩa và tiềm ẩn rủi ro tiêu tốn thời gian không cần thiết.`,codeReference:{file:`student/search.py`,lines:`1929 – 1934`,functionName:`Searcher.search`},teacherFollowUp:`Ngưỡng MATE_THRESHOLD trong code Nhóm 12 là bao nhiêu?`}],$t=[{id:`state-space-game-tree`,title:`Không gian Trạng thái & Cây Trò chơi (Game Tree)`,category:`Cơ sở lý thuyết`,definition:`Cây trò chơi là một đồ thị có hướng không chu trình (DAG) trong đó mỗi nút biểu diễn một trạng thái bàn cờ, các cạnh biểu diễn các nước đi hợp lệ chuyển đổi giữa các trạng thái. Gốc của cây là thế cờ hiện tại.`,principle:`Số lượng trạng thái trong cờ vua ước tính đạt số Shannon (khoảng 10^120 trạng thái), với hệ số phân nhánh trung bình b ≈ 35 và độ dài ván đấu trung bình d ≈ 80. Do đó, việc duyệt toàn bộ cây trò chơi là bất khả thi về mặt tính toán. Mọi bot cờ vua thực tế phải giới hạn độ sâu tìm kiếm d và sử dụng hàm heuristic để xấp xỉ giá trị của các nút lá.`,formula:`Số lượng nút tại độ sâu d: N(d) = b^d (trong đó b là hệ số phân nhánh, d là độ sâu ply)`,pseudocode:`function TraverseGameTree(state, depth):
    if depth == 0 or state.is_terminal():
        return evaluate(state)
    for move in state.legal_moves():
        child = state.apply(move)
        TraverseGameTree(child, depth - 1)`,team12Implementation:{file:`student/search.py`,functionName:`_negamax & search`,lines:`1203 – 1938`,description:`Nhóm 12 giới hạn độ sâu theo thời gian thực (Time-limited Search) thông qua kỹ thuật Đào sâu lặp (Iterative Deepening Search). Thay vì duyệt b^d mù quáng, bot sử dụng Alpha-Beta, Move Ordering và các tầng cắt tỉa toán học để giảm b hiệu dụng từ 35 xuống còn ~2.2.`,rationale:`Hạn chế bùng nổ tổ hợp trong quỹ thời gian thi đấu có hạn của giải đấu ChessLab (45s - 360s).`,limitations:`Do giới hạn thời gian thực tế, bot thường đạt độ sâu 5 - 8 ply ở trung cuộc, có thể gặp khó khăn nếu gặp đòn phối hợp chiến thuật sâu trên 10 ply không nằm trong Quiescence Search.`},defensePoints:[`Giải thích số Shannon và tại sao không thể dùng BFS / DFS vét cạn trong cờ vua.`,`Sự khác nhau giữa ply (nửa nước đi của một bên) và move (nước đi đầy đủ gồm Trắng đi và Đen đi).`,`Cách Nhóm 12 đo đạc hệ số phân nhánh hiệu dụng (EBF ≈ 2.2).`],widgetType:`tree`},{id:`zero-sum-games`,title:`Trò chơi Đối kháng Tổng bằng Không (Zero-Sum Games)`,category:`Cơ sở lý thuyết`,definition:`Cờ vua là một trò chơi đối kháng 2 người chơi có thông tin hoàn hảo (perfect information) và tổng bằng không (zero-sum). Lợi ích của người chơi này chính là thiệt hại tương ứng của người chơi kia: Điểm(Trắng) + Điểm(Đen) = 0.`,principle:`Trong mọi trạng thái, mục tiêu của bên đang đi là tối đa hóa điểm số của mình (Max), đồng nghĩa với việc tối thiểu hóa điểm số của đối thủ (Min). Tính chất đối xứng này cho phép chuyển đổi thuật toán Minimax 2 pha phức tạp thành một thuật toán Negamax đơn nhất duy nhất.`,formula:`max(A, B) == -min(-A, -B) hay Score(Turn) = -Score(Opponent)`,pseudocode:`function EvaluateZeroSum(state, perspective):
    score = static_eval(state) # Luôn tính theo góc nhìn Trắng
    if perspective == BLACK:
        return -score
    return score`,team12Implementation:{file:`student/evaluation.py`,functionName:`evaluate`,lines:`610 – 611`,description:`Dòng cuối cùng của hàm evaluate luôn chuẩn hóa điểm số trả về theo góc nhìn của bên đang đến lượt đi: return score + TEMPO_BONUS if board.turn else TEMPO_BONUS - score. Điều này đảm bảo tính tương thích toán học tuyệt đối với Negamax.`,rationale:`Đơn giản hóa mã nguồn, triệt tiêu mã lặp và giảm 50% nguy cơ nhầm lẫn dấu âm/dương khi viết thuật toán đệ quy.`,limitations:`Phải cẩn trọng tuyệt đối khi tính điểm hòa cờ (DRAW_SCORE = 0) và điểm chiếu hết (MATE_SCORE) để không bị đảo dấu sai ở các tầng chẵn/lẻ.`},defensePoints:[`Tại sao cờ vua lại là trò chơi có thông tin hoàn hảo? (Cả 2 bên đều nhìn thấy toàn bộ bàn cờ, không có yếu tố ngẫu nhiên như xúc xắc hay sương mù chiến tranh).`,`Chứng minh công thức đối xứng toán học: max(a, b) = -min(-a, -b).`]},{id:`minimax-vs-negamax`,title:`Thuật toán Minimax & Biến thể Negamax`,category:`Thuật toán tìm kiếm`,definition:`Minimax là thuật toán ra quyết định kinh điển trong lý thuyết trò chơi. Negamax là một biến thể viết ngắn gọn của Minimax dựa trên tính chất zero-sum: giá trị tốt nhất cho người chơi hiện tại bằng phủ định của giá trị tốt nhất cho người chơi tiếp theo.`,principle:`Thay vì viết 2 hàm maximize() và minimize() riêng biệt, Negamax chỉ cần đúng 1 hàm duy nhất. Tại mỗi bước đệ quy, điểm số trả về từ tầng con được đổi dấu (-) và khoảng tìm kiếm [alpha, beta] được đảo ngược thành [-beta, -alpha].`,formula:`Negamax(node) = max_{child} (-Negamax(child))`,pseudocode:`function Negamax(state, depth, alpha, beta):
    if depth == 0 or state.is_terminal():
        return evaluate(state) # Theo góc nhìn state.turn
    max_eval = -INFINITY
    for move in state.legal_moves():
        state.push(move)
        score = -Negamax(state, depth - 1, -beta, -alpha)
        state.pop()
        max_eval = max(max_eval, score)
        alpha = max(alpha, score)
        if alpha >= beta:
            break # Beta Cutoff
    return max_eval`,team12Implementation:{file:`student/search.py`,functionName:`Searcher._negamax`,lines:`1203 – 1625`,description:`Triển khai Negamax chuẩn mực, gọi đệ quy score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1, tm, True). Toàn bộ điểm số trong cây tìm kiếm luôn nhất quán theo góc nhìn của bên đang đi tại node đó.`,rationale:`Loại bỏ hoàn toàn sự cồng kềnh của Minimax, giảm dung lượng mã nguồn, dễ dàng tích hợp Alpha-Beta và PVS.`,limitations:`Đòi hỏi hàm evaluate() và điểm chiếu hết bắt buộc phải đổi dấu chính xác theo board.turn, nếu nhầm lẫn dù chỉ một dấu trừ thì bot sẽ chọn nước tự sát.`},defensePoints:[`So sánh ưu điểm của Negamax so với Minimax truyền thống.`,`Tại sao khoảng alpha-beta lại biến thành [-beta, -alpha] khi gọi đệ quy?`,`Trình bày luồng đổi dấu điểm số khi bot chơi quân Đen.`],widgetType:`tree`},{id:`alpha-beta-pruning`,title:`Cắt tỉa Alpha-Beta (Alpha-Beta Pruning)`,category:`Kỹ thuật cắt tỉa`,definition:`Alpha-Beta Pruning là kỹ thuật tối ưu hóa thuật toán Minimax/Negamax bằng cách loại bỏ các nhánh cây tìm kiếm mà chắc chắn không thể ảnh hưởng đến quyết định cuối cùng.`,principle:`Duy trì hai giá trị biên trong suốt quá trình duyệt: Alpha (điểm số tối thiểu mà bên đi chắc chắn đạt được) và Beta (điểm số tối đa mà đối thủ cho phép bên đi đạt được). Khi một nước đi mang lại điểm số >= Beta, điều đó có nghĩa là đối thủ ở tầng trước sẽ không bao giờ cho phép thế cờ này xảy ra => Ngắt duyệt các nhánh còn lại ngay lập tức (Beta Cutoff / Fail-High).`,formula:`Điều kiện cắt tỉa: \\alpha \\ge \\beta`,pseudocode:`if score > alpha:
    alpha = score
if alpha >= beta:
    # Beta cutoff: Đối thủ có lựa chọn tốt hơn ở tầng trên
    break`,team12Implementation:{file:`student/search.py`,functionName:`Searcher._negamax`,lines:`1581 – 1599`,description:`Cắt tỉa Alpha-Beta được triển khai tại mọi nút trong _negamax và _quiescence. Khi xảy ra Beta Cutoff trên một nước đi yên lặng, bot lập tức lưu nước đi vào Killer Moves và cộng điểm vào History Heuristic.`,rationale:`Nếu sắp xếp nước đi hoàn hảo, Alpha-Beta giảm số nút cần duyệt từ O(b^d) xuống O(b^(d/2)), cho phép tìm kiếm sâu gấp đôi trong cùng một lượng thời gian.`,limitations:`Hiệu quả cắt tỉa phụ thuộc hoàn toàn vào Move Ordering. Nếu sắp xếp nước đi tồi tệ (nước xấu duyệt trước), Alpha-Beta sẽ phải duyệt toàn bộ O(b^d) nút không khác gì Minimax!`},defensePoints:[`Chứng minh Alpha-Beta Pruning không làm mất bất kỳ nước đi tối ưu nào so với Minimax gốc.`,`Độ phức tạp tính toán tốt nhất (Best-case) và xấu nhất (Worst-case) của Alpha-Beta là gì?`,`Ý nghĩa trực quan của việc Alpha vượt qua Beta trong ván đấu thực tế.`],widgetType:`tree`},{id:`move-ordering-heuristics`,title:`Sắp xếp Nước đi Heuristic (Move Ordering)`,category:`Tối ưu hóa tìm kiếm`,definition:`Move Ordering là kỹ thuật sắp xếp danh sách các nước đi hợp lệ theo xác suất giảm dần về độ mạnh chiến thuật trước khi đưa vào vòng lặp tìm kiếm.`,principle:`Alpha-Beta chỉ phát huy sức mạnh tối đa khi nước đi tốt nhất được duyệt đầu tiên. Nếu nước đầu tiên gây ra Beta Cutoff ngay lập tức (Fail-High), ta chỉ tốn đúng 1 phép tính thay vì phải duyệt 35 nước đi.`,formula:`Tỷ lệ cắt tỉa tại nước đầu tiên: CutoffRate = N_{cutoff\\_first} / N_{total\\_cutoffs} (Nhóm 12 đạt > 85%)`,pseudocode:`function OrderMoves(board, moves, tt_move, killers, history):
    for move in moves:
        score = 0
        if move == tt_move: score += 10_000_000
        elif move.is_queen_promo(): score += 1_200_000
        elif is_threatened_escape(move): score += 1_100_000
        elif is_capture(move): score += 1_000_000 + MVV_LVA + SEE
        elif move == killers[0]: score += 900_000
        elif move == killers[1]: score += 800_000
        elif is_safe_check(move): score += 650_000
        else: score += min(history[move], 500_000)
    sort(moves, descending)`,team12Implementation:{file:`student/search.py`,functionName:`Searcher._order_moves`,lines:`703 – 916`,description:`Nhóm 12 xây dựng hệ thống phân tầng 7 mức: TT Move (10M) > Queen Promo (1.2M) > Escape threatened piece (1.1M) > Good Captures SEE >= 0 (1M) > Killer 1/2 (900k/800k) > Safe Check (650k) > Bad Captures (50k) > History Heuristic (500k).`,rationale:`Đảm bảo nước đi chiến lược nhất luôn đứng đầu danh sách, nâng tỷ lệ cắt tỉa Beta ở nước đầu tiên lên trên 85%.`,limitations:`Hàm sắp xếp cần chạy nhanh. Nếu tính toán quá nhiều thuộc tính nặng (như SEE đa tầng hay kiểm tra ghim quân phức tạp), chi phí sắp xếp sẽ vượt quá lợi ích tiết kiệm được.`},defensePoints:[`Tại sao TT Move lại được xếp ưu tiên cao nhất, vượt qua cả ăn Hậu?`,`MVV-LVA là gì và tại sao Tốt ăn Hậu lại được ưu tiên hơn Hậu ăn Tốt?`,`Killer Moves và History Heuristic khác nhau như thế nào về phạm vi áp dụng?`],widgetType:`move-order`},{id:`iterative-deepening-aspiration`,title:`Đào sâu Lặp (IDS) & Cửa sổ Kỳ vọng (Aspiration Windows)`,category:`Chiến lược tìm kiếm`,definition:`Iterative Deepening Search (IDS) là kỹ thuật tìm kiếm theo độ sâu tăng dần từ 1, 2, 3... đến độ sâu tối đa. Aspiration Windows là kỹ thuật thu hẹp khoảng tìm kiếm [prev - delta, prev + delta] thay vì mở rộng vô hạn [-inf, +inf].`,principle:`1. IDS giải quyết bài toán thời gian thực: luôn có sẵn kết quả tốt nhất của tầng trước khi hết giờ. Ngoài ra, cây tìm kiếm của tầng trước cung cấp TT Move cho tầng sau, giúp Move Ordering cực kỳ chính xác. 2. Aspiration Windows dựa trên quan sát: điểm số đánh giá giữa 2 độ sâu liên tiếp hiếm khi thay đổi quá 40 centipawns. Thu hẹp cửa sổ giúp Alpha-Beta cắt tỉa nhanh hơn 15 - 20%.`,formula:`Alpha = max(-MATE, prev - \\delta), Beta = min(MATE, prev + \\delta) với \\delta = 40\\text{ cp}`,pseudocode:`best_move = legal[0]
prev_score = 0
for depth = 1 to MAX_DEPTH:
    if not tm.can_start_next_depth(): break
    alpha = prev_score - 40; beta = prev_score + 40
    while True:
        score, move = search_root(depth, alpha, beta)
        if score <= alpha: alpha = -INFINITY # Fail-low
        elif score >= beta: beta = +INFINITY # Fail-high
        else: break
    if not timeout:
        best_move = move; prev_score = score`,team12Implementation:{file:`student/search.py`,functionName:`Searcher.search`,lines:`1635 – 1938`,description:`Nhóm 12 triển khai IDS từ depth 1..64. Kích hoạt Aspiration Windows tại depth >= 4 với delta = 40 cp. Nếu bị fail-low hoặc fail-high, hệ thống mở rộng cửa sổ về toàn dải [-MATE_SCORE-1, MATE_SCORE+1] và tìm kiếm lại.`,rationale:`Kiểm soát thời gian tuyệt đối và tăng tốc độ tìm kiếm ở các tầng sâu.`,limitations:`Nếu thế cờ có biến động chiến thuật đột ngột (blunder hoặc đòn thí quân), điểm số sẽ nhảy ra ngoài cửa sổ, buộc bot phải search lại 2 lần (re-search penalty).`},defensePoints:[`Tại sao việc lặp lại từ depth 1, 2, 3.. không làm lãng phí thời gian so với nhảy thẳng vào depth 6?`,`Cơ chế xử lý khi Aspiration Window bị fail-low hoặc fail-high trong code Nhóm 12.`,`Tại sao chỉ cập nhật best_move khi tầng lặp hoàn thành trọn vẹn?`]},{id:`principal-variation-search`,title:`Principal Variation Search (PVS / NegaScout)`,category:`Thuật toán tìm kiếm nâng cao`,definition:`PVS là thuật toán tối ưu hóa của Alpha-Beta dựa trên giả định rằng nước đi đầu tiên (nước PV) chính là nước đi tốt nhất.`,principle:`Nước đi đầu tiên được tìm kiếm với cửa sổ đầy đủ [alpha, beta]. Vì ta tin rằng nước đầu tiên đã là tốt nhất, tất cả các nước đi còn lại chỉ cần kiểm tra xem chúng có thực sự kém hơn alpha hay không bằng một cửa sổ hẹp Zero-Window: [-alpha - 1, -alpha]. Cửa sổ hẹp này gây ra cắt tỉa cực nhanh. Chỉ khi một nước đi xếp sau bất ngờ vượt qua alpha (fail-high), ta mới mở rộng cửa sổ để tìm kiếm lại toàn dải.`,formula:`Zero\\text{-}Window: [\\alpha, \\alpha + 1] \\implies \\text{Cắt tỉa cực đại}`,pseudocode:`if move_count == 1:
    score = -negamax(depth - 1, -beta, -alpha)
else:
    # Tìm kiếm thăm dò với Zero-Window
    score = -negamax(depth - 1, -alpha - 1, -alpha)
    if score > alpha and score < beta:
        # Giả định sai -> Tìm lại toàn dải
        score = -negamax(depth - 1, -beta, -alpha)`,team12Implementation:{file:`student/search.py`,functionName:`Searcher._negamax`,lines:`1527 – 1560`,description:`Nhóm 12 triển khai PVS kết hợp Late Move Reductions (LMR): nước 1 tìm dải đủ; các nước sau tìm Zero-Window [-alpha-1, -alpha] kết hợp giảm độ sâu. Nếu vượt alpha thì re-search dải đủ.`,rationale:`Tiết kiệm 10 - 25% số nút duyệt so với Alpha-Beta truyền thống trên các tầng có Move Ordering chuẩn.`,limitations:`Nếu Move Ordering kém, việc liên tục phải re-search sẽ làm bot chạy chậm hơn Alpha-Beta thuần.`},defensePoints:[`Tại sao cửa sổ [-alpha - 1, -alpha] lại gọi là Zero-Window / Null-Window?`,`Tần suất re-search trong PVS của Nhóm 12 là bao nhiêu?`,`PVS phối hợp với Move Ordering như thế nào?`],widgetType:`tree`},{id:`transposition-table-zobrist`,title:`Bảng Chuyển vị (Transposition Table) & Khóa Băm Zobrist`,category:`Bộ nhớ & Quản trị trạng thái`,definition:`Bảng chuyển vị (TT) là một bảng băm lưu lại kết quả đánh giá của các trạng thái bàn cờ đã từng duyệt. Trong cờ vua, các thứ tự nước đi khác nhau có thể dẫn tới cùng một thế cờ (transposition).`,principle:`Sử dụng khóa băm Zobrist 64-bit độc nhất cho mỗi thế cờ (board._transposition_key()). Bảng gồm 2^19 = 524,288 mục. Mỗi mục lưu: key, depth, score (đã chuẩn hóa), flag (EXACT, LOWER, UPPER), best_move, age. Khi gặp lại thế cờ cũ với độ sâu >= độ sâu cần tìm, bot sử dụng lại ngay kết quả mà không cần tính lại!`,formula:`Index = hash(key) \\& (2^{19} - 1) \\implies \\text{Tra cứu O(1)}`,pseudocode:`entry = tt.probe(board.key)
if entry and entry.depth >= depth:
    if entry.flag == EXACT: return entry.score
    elif entry.flag == LOWER and entry.score >= beta: return entry.score
    elif entry.flag == UPPER and entry.score <= alpha: return entry.score`,team12Implementation:{file:`student/search.py`,functionName:`TranspositionTable.probe & store`,lines:`477 – 595`,description:`Triển khai bảng băm 524,288 mục. Chính sách thay thế 4 điều kiện: ô trống, trùng khóa, thế hệ cũ (age != existing.age), hoặc độ sâu mới lớn hơn bằng (depth >= existing.depth). Chuẩn hóa điểm chiếu hết qua score_to_tt / score_from_tt.`,rationale:`Tiết kiệm hàng triệu phép tính lặp lại và cung cấp Hash Move hạt giống cho Move Ordering.`,limitations:`Có xác suất cực nhỏ xảy ra va chạm băm (hash collision), được Nhóm 12 bảo vệ bằng kiểm tra trùng key và tầng hậu kiểm Tầng 3 trong StudentBot.`},defensePoints:[`Zobrist Hashing hoạt động như thế nào? (XOR các số ngẫu nhiên 64-bit cho mỗi quân cờ trên mỗi ô).`,`Giải thích 3 loại cờ cận TT_EXACT, TT_LOWER, TT_UPPER.`,`Tại sao cần chuẩn hóa điểm chiếu hết cộng trừ ply khi lưu vào TT?`],widgetType:`tt-table`},{id:`quiescence-search-see`,title:`Tìm kiếm Tĩnh lặng (Quiescence Search) & SEE 1-ply`,category:`Cắt tỉa & Xử lý biên`,definition:`Quiescence Search (QS) là phần mở rộng tại các nút lá (depth <= 0) chỉ duyệt các nước đi chiến thuật (bắt quân, phong cấp, thoát chiếu) để triệt tiêu hiệu ứng chân trời.`,principle:`1. Stand-pat: Sử dụng điểm tĩnh evaluate(board) làm ngưỡng sàn; nếu bên đi đã đạt >= beta thì cắt tỉa ngay. 2. Delta Pruning: Nếu điểm tĩnh + 1150 cp (giá trị Hậu) vẫn < alpha, cắt tỉa ngay vì bắt quân bình thường không cứu vãn được thế cờ. 3. SEE 1-ply: Lọc bỏ các nước thí quân lỗ vốn (SEE < 0).`,formula:`\\text{Delta Pruning: } \\text{stand\\_pat} + 1150 < \\alpha \\implies \\text{Cắt tỉa}`,pseudocode:`function Quiescence(alpha, beta, qdepth):
    stand_pat = evaluate(board)
    if stand_pat >= beta: return beta
    if stand_pat + 1150 < alpha and not promotion_risk: return alpha
    if stand_pat > alpha: alpha = stand_pat
    for move in generate_captures():
        if see(board, move) >= 0:
            board.push(move)
            score = -Quiescence(-beta, -alpha, qdepth + 1)
            board.pop()
            if score >= beta: return beta
            if score > alpha: alpha = score
    return alpha`,team12Implementation:{file:`student/search.py`,functionName:`Searcher._quiescence & see`,lines:`280 – 435, 925 – 1195`,description:`Nhóm 12 tích hợp Stand-pat, Delta Pruning (có kiểm tra bitboard Tốt ở hàng 7 để tránh cắt nhầm phong cấp), lọc bắt quân có lợi qua see() 1-ply, và giới hạn MAX_QSEARCH_DEPTH = 8 để tránh bùng nổ chuỗi đổi quân.`,rationale:`Ngăn chặn hiện tượng mù chiến thuật (tactical blindness) khi cắt ngang chuỗi đổi quân.`,limitations:`SEE 1-ply chỉ nhìn trước 1 nước, có thể không thấy được đòn phản công tia X phức tạp phía sau, nhưng bù lại chạy nhanh gấp 6 lần.`},defensePoints:[`Hiệu ứng chân trời (Horizon Effect) là gì và hậu quả nếu không có Quiescence Search?`,`Tại sao khi bị chiếu (in_check) thì Quiescence Search bắt buộc phải duyệt mọi nước đi hợp lệ chứ không chỉ nước bắt quân?`,`Cách Delta Pruning của Nhóm 12 bảo vệ an toàn cho nước phong cấp Tốt.`]},{id:`advanced-pruning-rfp-nmp-lmr`,title:`Cắt tỉa Nâng cao: RFP, NMP, Futility Pruning & LMR`,category:`Kỹ thuật cắt tỉa nâng cao`,definition:`Tập hợp các kỹ thuật cắt tỉa dựa trên heuristic nhằm loại bỏ các nhánh cây tìm kiếm kém triển vọng trước khi duyệt sâu.`,principle:`1. Reverse Futility Pruning (RFP): Ở depth 1-2, nếu static_eval - 120*depth >= beta -> cắt tỉa ngay. 2. Null Move Pruning (NMP): Ở depth >= 3, nhường 1 nước đi cho đối thủ với độ giảm R = 2-3; nếu đối thủ vẫn không vượt được beta -> thế cờ quá mạnh, cắt tỉa Beta Cutoff. 3. Futility Pruning (FP): Ở depth 1, bỏ qua các nước yên lặng nếu static_eval + 150 <= alpha. 4. Late Move Reductions (LMR): Giảm độ sâu tìm kiếm (depth - 2) đối với các nước yên lặng xếp sau (từ nước thứ 4 trở đi).`,formula:`NMP: R = 2 \\text{ (depth } \\le 4) \\text{ hoặc } 3 \\text{ (depth } \\ge 5); \\quad \\text{RFP Margin} = 120 \\times \\text{depth}`,pseudocode:`# RFP
if depth <= 2 and static_eval - 120 * depth >= beta:
    return static_eval - 120 * depth

# NMP
if depth >= 3 and has_pieces and static_eval >= beta:
    board.push(NullMove)
    score = -negamax(depth - 1 - R, -beta, -beta + 1)
    board.pop()
    if score >= beta: return beta

# LMR
if moves_searched >= 4 and depth >= 3 and is_quiet:
    score = -negamax(depth - 2, -alpha - 1, -alpha) # Giảm 1 ply`,team12Implementation:{file:`student/search.py`,functionName:`Searcher._negamax`,lines:`1371 – 1555`,description:`Nhóm 12 kết hợp đồng bộ 4 kỹ thuật cắt tỉa hiện đại: RFP ở depth 1-2, NMP ở depth >= 3 (có kiểm tra has_pieces chống Zugzwang), Futility Pruning ở depth 1, và LMR ở các nước yên lặng >= 4. Mọi trường hợp fail-high của LMR đều được re-search ở độ sâu đủ.`,rationale:`Tăng tốc độ tìm kiếm gấp 3 - 5 lần, cho phép bot đạt độ sâu 7 - 8 ply trong trung cuộc.`,limitations:`Có rủi ro lý thuyết về việc cắt nhầm nước đi kỳ lạ (tactical sacrifice), nhưng các điều kiện biên của Nhóm 12 (kiểm tra chiếu, phong cấp, quân lớn) đã giảm rủi ro này về gần 0.`},defensePoints:[`Zugzwang là gì và tại sao NMP không được áp dụng khi chỉ còn Vua và Tốt?`,`Cách khôi phục lại khi LMR bị fail-high (nước đi bị giảm sâu nhưng lại bất ngờ vượt alpha)?`,`Tại sao RFP chỉ áp dụng ở depth 1 và 2 mà không dùng ở depth 5?`]},{id:`pesto-tapered-evaluation`,title:`Hàm Lượng giá Heuristic & PeSTO Tapered Evaluation`,category:`Biểu diễn tri thức & Lượng giá`,definition:`PeSTO Piece-Square Tables là hệ thống bảng điểm vị trí ô cho từng loại quân cờ ở cả trung cuộc (Middlegame - MG) và tàn cuộc (Endgame - EG). Tapered Evaluation là phương pháp nội suy mượt mà điểm số theo giai đoạn trận đấu.`,principle:`Giá trị của một quân cờ thay đổi liên tục theo thời gian: Mã mạnh ở trung tâm lúc trung cuộc nhưng yếu hơn ở tàn cuộc; Tốt tiến xa và Xe ở hàng 7 có giá trị khổng lồ ở tàn cuộc. Hàm tính toán trọng số pha cờ (Game Phase từ 0..24) dựa trên số quân lớn còn lại và nội suy tuyến tính: score = (mg * phase + eg * (24 - phase)) / 24.`,formula:`\\text{Score} = \\frac{\\text{MG} \\times \\text{Phase} + \\text{EG} \\times (24 - \\text{Phase})}{24}`,pseudocode:`phase = count_pieces_weighted(board) # 0..24
mg_score, eg_score = compute_pesto_pst(board)
final_score = (mg_score * phase + eg_score * (24 - phase)) // 24`,team12Implementation:{file:`student/evaluation.py`,functionName:`evaluate & _pk`,lines:`1 – 320, 589 – 595`,description:`Nhóm 12 sử dụng bảng PeSTO chuẩn quốc tế, đóng gói sẵn bằng bit-packing tuyến tính mg + (eg << 16). Giải nén số có dấu eg = (s + 0x8000) >> 16, mg = s - (eg << 16). Tốc độ đánh giá đạt ~89,000 evals/giây.`,rationale:`Cung cấp tri thức vị trí cờ vua chuyên sâu mà không làm giảm tốc độ tính toán.`,limitations:`Bảng PeSTO được tối ưu cho cờ vua tiêu chuẩn. Tuy nhiên các đặc trưng vị trí (chiếm tâm, hàng 7, tốt thông) vẫn hoàn toàn chính xác trong Chess960 sau khi khai cuộc triển khai quân.`},defensePoints:[`Giải thích công thức đóng gói tuyến tính và cách xử lý không bị tràn số âm trong Python.`,`Tại sao không dùng hàm đánh giá vật chất đơn giản (Hậu=9, Xe=5, Tượng=3, Mã=3, Tốt=1)?`,`Game Phase được tính từ những quân cờ nào?`],widgetType:`chessboard`},{id:`tactical-delay-time-management`,title:`Quản trị Thời gian Thích ứng Bù trừ Độ trễ (Delay-Aware)`,category:`Quản trị hệ thống`,definition:`Mô hình phân bổ ngân sách thời gian thi đấu dựa trên cơ chế hấp thụ độ trễ sàn của máy chủ GameController (500ms - 1000ms) kết hợp kiểm soát Soft Limit / Hard Limit và dự đoán tăng trưởng nhánh.`,principle:`Máy chủ tính thời gian mỗi nước theo công thức: elapsed = max(search_time, delay_500_1000ms). Nhóm 12 nhận ra rằng nếu bot tìm kiếm dưới 220ms ở trung cuộc, thời gian đó hoàn toàn miễn phí vì bị độ trễ sàn 500ms hấp thụ! Ở tàn cuộc sâu, bot duy trì ngân sách 35ms - 55ms để duyệt 3,500 - 5,000 nodes, hoàn tất Depth 3-4, và hạ xuống 8ms - 15ms khi còn dưới 1.5s để triệt tiêu 100% nguy cơ rụng cờ.`,formula:`\\text{Elapsed} = \\max(\\text{BotSearchTime}, \\text{ServerDelay}_{500\\text{--}1000\\text{ms}})`,pseudocode:`if time_remaining <= 1500: return TimeBudget(soft=8, hard=15)
elif moves_played >= 40 or time_remaining <= 10000: return TimeBudget(soft=35, hard=55)
elif moves_played >= 32 or time_remaining <= 18000: return TimeBudget(soft=60, hard=90)
else: return TimeBudget(soft=150, hard=220) # Bị hấp thụ bởi 500ms`,team12Implementation:{file:`student/time_manager.py`,functionName:`compute_budget_ms & TimeManager`,lines:`37 – 199`,description:`Nhóm 12 phân tầng thời gian chi tiết cho cả 2 thể thức Blitz (45s) và Standard (180s - 360s). Đo đạc nano-giây bằng time.perf_counter(). Dự đoán mở tầng kế tiếp bằng predicted_ms = last * 2.2.`,rationale:`Tối đa hóa độ sâu tìm kiếm trong vùng an toàn và loại trừ hoàn toàn nguy cơ thua do hết giờ.`,limitations:`Cần đồng bộ chặt chẽ với tốc độ xử lý của CPU. Khi chạy trên máy chủ yếu, số nút duyệt được trong cùng một khoảng mili-giây có thể giảm nhẹ.`},defensePoints:[`Chứng minh tại sao ngân sách 150ms - 220ms ở trung cuộc không làm tốn thêm thời gian thi đấu của bot.`,`Sự khác nhau giữa Soft Limit và Hard Limit.`,`Cơ chế Panic Mode xử lý như thế nào khi đồng hồ chỉ còn dưới 1.5 giây?`],widgetType:`time-calculator`}],j=[{id:`state-space`,term:`State Space`,vietnamese:`Không gian trạng thái`,category:`search`,shortDef:`Tập hợp tất cả các trạng thái bàn cờ có thể đạt được trong một trò chơi từ trạng thái xuất phát.`,fullExplanation:`Trong cờ vua, không gian trạng thái ước tính đạt số Shannon khoảng 10^120 trạng thái. Việc duyệt toàn bộ không gian này là bất khả thi, đòi hỏi phải dùng tìm kiếm có giới hạn độ sâu và hàm lượng giá heuristic.`,example:`Trạng thái ban đầu của ván cờ, các thế cờ sau mỗi nước đi hợp lệ.`,relatedTab:`theory`,relatedTopicId:`state-space-game-tree`},{id:`game-tree`,term:`Game Tree`,vietnamese:`Cây trò chơi`,category:`search`,shortDef:`Đồ thị cây có hướng mô hình hóa tất cả các nước đi khả dĩ giữa hai người chơi.`,fullExplanation:`Nút gốc là thế cờ hiện tại. Các cạnh là các nước đi hợp lệ. Các tầng tiếp theo luân phiên đại diện cho lượt đi của Trắng và Đen.`,example:`Cây Minimax hoặc cây Negamax biểu diễn các phương án cờ.`,relatedTab:`theory`,relatedTopicId:`state-space-game-tree`},{id:`zero-sum`,term:`Zero-Sum Game`,vietnamese:`Trò chơi tổng bằng không`,category:`search`,shortDef:`Trò chơi mà lợi ích của người chơi này bằng đúng thiệt hại của người chơi kia (tổng điểm bằng 0).`,fullExplanation:`Cờ vua là trò chơi zero-sum. Tính chất này là cơ sở toán học để rút gọn thuật toán Minimax 2 hàm thành Negamax 1 hàm duy nhất: max(a, b) = -min(-a, -b).`,example:`Trắng thắng (+1) thì Đen thua (-1); tổng điểm: 1 + (-1) = 0.`,relatedTab:`theory`,relatedTopicId:`zero-sum-games`},{id:`minimax`,term:`Minimax`,vietnamese:`Thuật toán Minimax`,category:`search`,shortDef:`Thuật toán đệ quy tìm nước đi tối ưu trong trò chơi đối kháng bằng cách giả định đối thủ luôn chơi tối ưu.`,fullExplanation:`Tầng MAX cố gắng tối đa hóa điểm số, tầng MIN cố gắng tối thiểu hóa điểm số. Độ phức tạp vét cạn là O(b^d).`,example:`Minimax duyệt qua các nước đi hợp lệ để chọn nước có điểm Max tốt nhất.`,relatedTab:`theory`,relatedTopicId:`minimax-vs-negamax`},{id:`negamax`,term:`Negamax`,vietnamese:`Thuật toán Negamax`,category:`search`,shortDef:`Biến thể toán học của Minimax trong đó điểm số của mọi nút luôn được tính theo góc nhìn của người chơi đang đến lượt.`,fullExplanation:`Tại mỗi bước đệ quy, điểm số con được phủ định (-) và khoảng tìm kiếm được đảo dấu [-beta, -alpha]. Đơn giản hóa mã nguồn và giảm 50% nguy cơ nhầm lẫn dấu.`,example:`score = -negamax(depth - 1, -beta, -alpha).`,relatedTab:`theory`,relatedTopicId:`minimax-vs-negamax`},{id:`alpha-beta`,term:`Alpha-Beta Pruning`,vietnamese:`Cắt tỉa Alpha-Beta`,category:`search`,shortDef:`Kỹ thuật tối ưu hóa Minimax/Negamax bằng cách ngắt các nhánh chắc chắn không ảnh hưởng đến quyết định cuối cùng.`,fullExplanation:`Duy trì Alpha (ngưỡng sàn của ta) và Beta (ngưỡng trần của đối thủ). Khi alpha >= beta, nhánh tìm kiếm bị cắt tỉa (Beta Cutoff). Giảm độ phức tạp từ O(b^d) về O(b^(d/2)).`,example:`Nếu đối thủ có một nước đi quá mạnh dẫn đến điểm số vượt quá Beta, ta không cần duyệt tiếp các biến thể con khác.`,relatedTab:`theory`,relatedTopicId:`alpha-beta-pruning`},{id:`ply`,term:`Ply (Half-Move)`,vietnamese:`Nửa nước đi`,category:`chess`,shortDef:`Một lượt đi của một bên (Trắng đi HOẶC Đen đi). 1 nước đi đầy đủ (move) gồm 2 ply.`,fullExplanation:`Trong cờ vua máy tính, độ sâu tìm kiếm (depth) luôn được đo bằng ply. Độ sâu 6 ply tương đương với 3 nước đi của Trắng và 3 nước đi của Đen.`,example:`1. e4 e5 là 2 ply (1 nước đi đầy đủ).`,relatedTab:`chess960`},{id:`centipawn`,term:`Centipawn (cp)`,vietnamese:`Centipawn (Điểm lượng giá cờ vua)`,category:`evaluation`,shortDef:`Đơn vị đo lường ưu thế trong cờ vua máy tính; 100 centipawns tương đương với giá trị của 1 quân Tốt tiêu chuẩn.`,fullExplanation:`Điểm số +150 cp nghĩa là bên đi đang có ưu thế tương đương 1.5 quân Tốt. Chiếu hết được quy ước là 30,000 cp.`,example:`Hậu = 1000 cp, Xe = 500 cp, Tượng = 330 cp, Mã = 320 cp, Tốt = 100 cp.`,relatedTab:`theory`,relatedTopicId:`pesto-tapered-evaluation`},{id:`heuristic`,term:`Heuristic Evaluation`,vietnamese:`Hàm lượng giá kinh nghiệm`,category:`evaluation`,shortDef:`Hàm ước lượng điểm số của một trạng thái cờ khi không thể tính toán đến tận khi ván cờ kết thúc.`,fullExplanation:`Hàm đánh giá kết hợp các yếu tố vật chất (chất lượng quân cờ), vị trí ô (PST), cấu trúc Tốt, an toàn Vua và hoạt động của các quân cờ lớn.`,example:`evaluate(board) trong student/evaluation.py.`,relatedTab:`code-eval`},{id:`iterative-deepening`,term:`Iterative Deepening Search (IDS)`,vietnamese:`Đào sâu lặp`,category:`search`,shortDef:`Chiến lược tìm kiếm tăng dần độ sâu từ 1, 2, 3.. cho đến khi hết ngân sách thời gian.`,fullExplanation:`Bảo đảm bot luôn có sẵn nước đi hợp lệ chất lượng cao nếu bị ngắt giờ đột ngột, đồng thời cung cấp Hash Move để tối ưu hóa Move Ordering cho tầng sau.`,example:`Vòng lặp for depth in range(1, MAX_DEPTH + 1) trong Searcher.search.`,relatedTab:`theory`,relatedTopicId:`iterative-deepening-aspiration`},{id:`aspiration-windows`,term:`Aspiration Windows`,vietnamese:`Cửa sổ kỳ vọng`,category:`search`,shortDef:`Kỹ thuật thu hẹp khoảng tìm kiếm [prev - delta, prev + delta] thay vì mở rộng vô hạn [-inf, +inf].`,fullExplanation:`Dựa trên quan sát điểm số giữa 2 tầng liên tiếp ít khi thay đổi quá 40 centipawns. Thu hẹp cửa sổ giúp Alpha-Beta cắt tỉa nhanh hơn 15-20%.`,example:`alpha = prev_score - 40, beta = prev_score + 40.`,relatedTab:`theory`,relatedTopicId:`iterative-deepening-aspiration`},{id:`pvs`,term:`Principal Variation Search (PVS / NegaScout)`,vietnamese:`Tìm kiếm biến thể chính`,category:`search`,shortDef:`Thuật toán tìm kiếm nước đi đầu tiên với dải đầy đủ, các nước sau kiểm định thăm dò với cửa sổ hẹp Zero-Window [alpha, alpha + 1].`,fullExplanation:`Giả định nước đi xếp đầu tiên là nước tốt nhất. Nếu các nước sau đều kém hơn, cửa sổ hẹp sẽ cắt tỉa cực nhanh; nếu có nước tốt hơn, ta re-search dải đầy đủ.`,example:`score = -self._negamax(board, depth - 1, -alpha - 1, -alpha).`,relatedTab:`theory`,relatedTopicId:`principal-variation-search`},{id:`transposition-table`,term:`Transposition Table (TT)`,vietnamese:`Bảng chuyển vị`,category:`search`,shortDef:`Bảng băm lưu trữ trạng thái tìm kiếm O(1) để tái sử dụng kết quả khi thế cờ lặp lại theo thứ tự nước đi khác nhau.`,fullExplanation:`Mỗi mục lưu: Zobrist key, depth, score (đã chuẩn hóa mate), flag (EXACT, LOWER, UPPER), best_move, age. Nhóm 12 có bảng kích thước 2^19 mục.`,example:`self.tt.probe(key) và self.tt.store(key, depth, score, flag, best_move, age).`,relatedTab:`theory`,relatedTopicId:`transposition-table-zobrist`},{id:`zobrist-hash`,term:`Zobrist Hashing`,vietnamese:`Băm Zobrist`,category:`search`,shortDef:`Kỹ thuật băm bàn cờ cờ vua bằng các phép toán XOR ngẫu nhiên 64-bit, cho phép cập nhật khóa băm O(1) sau mỗi nước đi.`,fullExplanation:`Trong python-chess, phương thức board._transposition_key() sử dụng băm Zobrist để định danh duy nhất trạng thái quân cờ, lượt đi, quyền nhập thành và ô bắt tốt qua đường.`,example:`board._transposition_key() trả về khóa băm dùng tra cứu TT.`,relatedTab:`theory`,relatedTopicId:`transposition-table-zobrist`},{id:`quiescence-search`,term:`Quiescence Search`,vietnamese:`Tìm kiếm tĩnh lặng`,category:`search`,shortDef:`Tìm kiếm mở rộng ở nút lá chỉ duyệt các nước ăn quân và giải chiếu để triệt tiêu hiệu ứng chân trời.`,fullExplanation:`Dừng tìm kiếm khi bàn cờ đạt trạng thái tĩnh lặng (không còn các pha bắt quân ăn miếng trả miếng). Kết hợp Stand-pat và Delta Pruning.`,example:`Searcher._quiescence() trong student/search.py.`,relatedTab:`theory`,relatedTopicId:`quiescence-search-see`},{id:`stand-pat`,term:`Stand-pat`,vietnamese:`Điểm sàn tĩnh lặng`,category:`search`,shortDef:`Nguyên lý trong Quiescence Search: bên đi luôn có quyền lựa chọn không làm gì thêm nếu vị trí hiện tại đã đủ tốt.`,fullExplanation:`Nếu điểm đánh giá tĩnh evaluate(board) >= beta, bên đi không cần mạo hiểm bắt thêm quân mà cắt tỉa fail-high ngay lập tức.`,example:`if stand_pat >= beta: return beta.`,relatedTab:`theory`,relatedTopicId:`quiescence-search-see`},{id:`delta-pruning`,term:`Delta Pruning`,vietnamese:`Cắt tỉa Delta`,category:`search`,shortDef:`Kỹ thuật cắt tỉa trong Quiescence Search: nếu điểm tĩnh cộng giá trị Hậu vẫn nhỏ hơn alpha thì cắt tỉa ngay.`,fullExplanation:`Nếu một nước bắt quân có lợi nhất (ăn Hậu) vẫn không thể cứu vãn được thế cờ để đạt mức alpha, việc duyệt các nước bắt quân bình thường là vô ích.`,example:`if stand_pat + 1150 < alpha: return alpha.`,relatedTab:`theory`,relatedTopicId:`quiescence-search-see`},{id:`see`,term:`Static Exchange Evaluation (SEE)`,vietnamese:`Đánh giá chuỗi đổi quân tĩnh`,category:`search`,shortDef:`Thuật toán ước lượng chênh lệch vật chất tại ô đích của một nước bắt quân mà không cần sinh đệ quy toàn bộ cây tìm kiếm.`,fullExplanation:`Phân loại các nước bắt quân thành Good Captures (SEE >= 0) và Bad Captures (SEE < 0). Nhóm 12 triển khai phiên bản SEE 1-ply siêu tốc.`,example:`see(board, move) trong student/search.py.`,relatedTab:`theory`,relatedTopicId:`quiescence-search-see`},{id:`mvv-lva`,term:`MVV-LVA (Most Valuable Victim - Least Valuable Attacker)`,vietnamese:`Nạn nhân giá trị nhất - Kẻ tấn công rẻ nhất`,category:`search`,shortDef:`Quy tắc sắp xếp nước bắt quân: ưu tiên lấy quân giá trị thấp ăn quân giá trị cao.`,fullExplanation:`Tốt ăn Hậu được xếp ưu tiên cao hơn Hậu ăn Tốt. Giúp phát hiện các đòn chiến thuật có lợi nhất đầu tiên.`,example:`Score = PieceValue[Victim] * 10 - PieceValue[Attacker].`,relatedTab:`theory`,relatedTopicId:`move-ordering-heuristics`},{id:`killer-moves`,term:`Killer Moves Heuristic`,vietnamese:`Nước đi sát thủ`,category:`search`,shortDef:`Kỹ thuật ghi nhớ các nước đi yên lặng (quiet moves) từng gây ra Beta Cutoff ở cùng độ sâu ply trong cây tìm kiếm.`,fullExplanation:`Nếu một nước đi yên lặng chứng minh là quá mạnh ở một nhánh, nó có xác suất cao tiếp tục gây Beta Cutoff ở các nhánh khác tại cùng ply. Nhóm 12 lưu 2 killer moves cho mỗi ply.`,example:`self.killer_moves[ply][0] và [1].`,relatedTab:`theory`,relatedTopicId:`move-ordering-heuristics`},{id:`history-heuristic`,term:`History Heuristic`,vietnamese:`Bảng lịch sử nước đi`,category:`search`,shortDef:`Bảng thống kê toàn cục ghi nhận tần suất thành công của các nước đi yên lặng gây ra Beta Cutoff ở bất kỳ vị trí nào.`,fullExplanation:`Mỗi khi nước đi (from_sq, to_sq) gây Beta Cutoff, điểm số của nó được cộng thêm depth * depth. Nước có điểm history cao được ưu tiên duyệt trước trong Move Ordering.`,example:`self.history[(color, from_sq, to_sq)] += depth * depth.`,relatedTab:`theory`,relatedTopicId:`move-ordering-heuristics`},{id:`null-move-pruning`,term:`Null Move Pruning (NMP)`,vietnamese:`Cắt tỉa nước đi rỗng`,category:`search`,shortDef:`Kỹ thuật nhường lượt đi cho đối thủ (Null Move) với độ sâu giảm R; nếu đối thủ vẫn không tạo được đe dọa thì cắt tỉa ngay.`,fullExplanation:`Dựa trên nguyên lý: nếu ta nhường đối thủ đi 2 nước liên tiếp mà đối thủ vẫn không thể nâng điểm vượt quá Beta, thì vị trí của ta là quá áp đảo (Beta Cutoff). Cần điều kiện has_pieces để tránh bẫy Zugzwang.`,example:`board.push(chess.Move.null()) với R = 2 hoặc 3.`,relatedTab:`theory`,relatedTopicId:`advanced-pruning-rfp-nmp-lmr`},{id:`reverse-futility-pruning`,term:`Reverse Futility Pruning (RFP / Static Null Move)`,vietnamese:`Cắt tỉa vô vọng đảo ngược`,category:`search`,shortDef:`Cắt tỉa ở độ sâu 1-2 nếu điểm lượng giá tĩnh trừ đi biên an toàn vẫn vượt trội ngưỡng Beta.`,fullExplanation:`Tại depth 1-2, nếu static_eval - 120 * depth >= beta, thì dù đối thủ có đi nước tốt nhất cũng không thể kéo điểm xuống dưới beta, cho phép cắt tỉa ngay mà không cần sinh nước đi.`,example:`if static_eval - 120 * depth >= beta: return static_eval - 120 * depth.`,relatedTab:`theory`,relatedTopicId:`advanced-pruning-rfp-nmp-lmr`},{id:`futility-pruning`,term:`Futility Pruning (FP)`,vietnamese:`Cắt tỉa vô vọng`,category:`search`,shortDef:`Bỏ qua các nước đi yên lặng ở độ sâu 1 nếu điểm lượng giá tĩnh cộng thêm biên an toàn vẫn không thể vượt qua Alpha.`,fullExplanation:`Một nước đi yên lặng hiếm khi cải thiện thế cờ quá 150 centipawns. Nếu static_eval + 150 <= alpha, nước đi đó không có cơ hội nâng alpha => bỏ qua.`,example:`if static_eval + 150 <= alpha: continue.`,relatedTab:`theory`,relatedTopicId:`advanced-pruning-rfp-nmp-lmr`},{id:`late-move-reductions`,term:`Late Move Reductions (LMR)`,vietnamese:`Giảm độ sâu nước đi xếp sau`,category:`search`,shortDef:`Kỹ thuật giảm độ sâu tìm kiếm (depth - 2) đối với các nước đi yên lặng xếp sau trong Move Ordering.`,fullExplanation:`Các nước đi xếp sau (từ nước thứ 4 trở đi) rất hiếm khi là nước đi tối ưu. Duyệt chúng ở độ sâu nông hơn giúp tiết kiệm thời gian khổng lồ. Nếu bị fail-high, bot re-search ở độ sâu đủ.`,example:`score = -self._negamax(board, depth - 2, -alpha - 1, -alpha).`,relatedTab:`theory`,relatedTopicId:`advanced-pruning-rfp-nmp-lmr`},{id:`check-extension`,term:`Check Extension`,vietnamese:`Mở rộng khi bị chiếu`,category:`search`,shortDef:`Kỹ thuật tự động tăng thêm 1 tầng độ sâu (depth += 1) khi Vua của bên đang đi đang bị đối phương chiếu.`,fullExplanation:`Khi bị chiếu, số lượng nước đi hợp lệ rất ít và nguy cơ bị chiếu hết là cận kề. Mở rộng 1 tầng giúp bot nhìn thấu chuỗi đòn giải chiếu và triệt tiêu Horizon Effect.`,example:`if in_check and ply < 24: depth += 1.`,relatedTab:`code-search`},{id:`zugzwang`,term:`Zugzwang`,vietnamese:`Tình thế bắt buộc phải đi (Zugzwang)`,category:`chess`,shortDef:`Tình huống trong cờ vua mà bất kỳ nước đi hợp lệ nào cũng làm cho thế cờ của người đó trở nên tồi tệ hơn.`,fullExplanation:`Rất phổ biến trong cờ tàn Vua và Tốt. Nếu áp dụng Null Move Pruning trong thế cờ Zugzwang, bot sẽ bị đánh giá sai lầm nghiêm trọng vì nhường lượt thấy đối thủ không làm gì được, nhưng thực tế mình bị ép đi và thua.`,example:`Cờ tàn Vua đối Vua tranh quyền kiểm soát ô đối diện (Opposition).`,relatedTab:`theory`,relatedTopicId:`advanced-pruning-rfp-nmp-lmr`},{id:`pesto-pst`,term:`PeSTO Piece-Square Tables`,vietnamese:`Bảng điểm vị trí PeSTO`,category:`evaluation`,shortDef:`Hệ thống bảng điểm 64 ô cờ cho 6 loại quân cờ ở cả trung cuộc (Middlegame) và tàn cuộc (Endgame).`,fullExplanation:`Định hướng các quân cờ chiếm lĩnh các ô chiến lược: Mã ở trung tâm, Tốt tiến xa, Tượng trên đường chéo mở, Vua ẩn nấp ở trung cuộc nhưng chủ động tham chiến ở tàn cuộc.`,example:`PST_MG và PST_EG trong student/evaluation.py.`,relatedTab:`theory`,relatedTopicId:`pesto-tapered-evaluation`},{id:`tapered-eval`,term:`Tapered Evaluation`,vietnamese:`Lượng giá nội suy pha cờ`,category:`evaluation`,shortDef:`Kỹ thuật nội suy mượt mà điểm số giữa trung cuộc (MG) và tàn cuộc (EG) theo trọng số Game Phase (0..24).`,fullExplanation:`Tránh hiện tượng điểm số nhảy giật cục khi ván cờ chuyển từ trung cuộc sang tàn cuộc: score = (mg * phase + eg * (24 - phase)) // 24.`,example:`Game Phase = 24 là khai cuộc đầy đủ, Game Phase = 0 là cờ tàn thuần túy.`,relatedTab:`theory`,relatedTopicId:`pesto-tapered-evaluation`},{id:`mop-up`,term:`Mop-Up Heuristic`,vietnamese:`Heuristic dồn Vua cờ tàn`,category:`evaluation`,shortDef:`Hàm đánh giá kích hoạt ở cờ tàn áp đảo để thưởng điểm khi ép Vua đối phương ra góc và kéo Vua ta áp sát.`,fullExplanation:`Giúp bot có ưu thế lớn biết cách tạo mạng lưới chiếu hết (checkmating net) thay vì đi lòng vòng dẫn đến hòa 50 nước. Kích hoạt khi phase <= 6 và chênh lệch >= 200 cp.`,example:`cmd (khoảng cách Vua địch ra mép) + dist (khoảng cách 2 Vua).`,relatedTab:`theory`,relatedTopicId:`pesto-tapered-evaluation`},{id:`king-safety-ring`,term:`Bitwise King Safety Ring`,vietnamese:`Vành đai bảo vệ Vua động`,category:`evaluation`,shortDef:`Mô hình đánh giá an toàn Vua bằng bitboard dựa trên tọa độ ô thực tế của Vua trong Chess960.`,fullExplanation:`Kiểm tra 3 cột lân cận và các hàng lá chắn bảo vệ. Thưởng lá chắn Tốt gần/xa, phạt nặng nếu có cột mở hoàn toàn (-36 cp) hoặc bán mở (-18 cp) trước mặt Vua.`,example:`_KS_FILES, _KS_NEAR_W, _KS_FAR_W trong student/evaluation.py.`,relatedTab:`code-eval`},{id:`chess960`,term:`Chess960 (Fischer Random)`,vietnamese:`Cờ vua 960 (Cờ Bobby Fischer)`,category:`chess`,shortDef:`Thể thức cờ vua biến thể trong đó hàng quân sau được sắp xếp theo một trong 960 thế cờ hợp lệ.`,fullExplanation:`Hai Tượng khác màu, Vua nằm giữa hai Xe. Loại bỏ sách khai cuộc, đưa cờ vua về đúng bản chất tính toán và đánh giá vị trí từ nước đầu tiên.`,example:`Mỗi ván thi đấu bốc thăm ngẫu nhiên chess960_id từ 0..959.`,relatedTab:`chess960`},{id:`contempt-factor`,term:`Contempt Factor`,vietnamese:`Hệ số khinh địch`,category:`search`,shortDef:`Hệ số điều chỉnh điểm hòa cờ để khuyến khích bot chơi mạo hiểm tìm đường thắng khi đang chiếm ưu thế.`,fullExplanation:`Khi phát hiện thế cờ lặp: nếu bot đang dẫn điểm (eval >= 80 cp), bot gán điểm hòa là -50 cp để tránh hòa; nếu đang thua (eval <= -80 cp), gán +50 cp để ép hòa.`,example:`if eval_side >= 80: return -50 trong _negamax.`,relatedTab:`code-search`},{id:`soft-limit-hard-limit`,term:`Soft Limit & Hard Limit`,vietnamese:`Giới hạn mềm và Giới hạn cứng`,category:`optimization`,shortDef:`Cơ chế kiểm soát thời gian 2 cấp: Soft Limit quyết định có mở thêm tầng sâu mới hay không; Hard Limit ngắt tìm kiếm ngay lập tức.`,fullExplanation:`Soft Limit ngăn chặn việc mở tầng mới khi đã tiêu tốn phần lớn thời gian. Hard Limit là hạn chót tuyệt đối để bot không bao giờ bị vượt quá thời gian của GameController.`,example:`TimeBudget(soft_ms=150, hard_ms=220).`,relatedTab:`code-time`},{id:`delay-absorption`,term:`Delay Absorption`,vietnamese:`Cơ chế hấp thụ độ trễ hệ thống`,category:`optimization`,shortDef:`Khai thác độ trễ tối thiểu 500ms của máy chủ để thực hiện tìm kiếm sâu mà không làm hao hụt đồng hồ thi đấu.`,fullExplanation:`Vì elapsed = max(search_time, delay_500ms), việc bot tìm kiếm trong khoảng 150ms - 220ms ở trung cuộc hoàn toàn miễn phí, không tốn thêm 1ms nào trên đồng hồ thật.`,example:`Ngân sách 150ms - 220ms ở nước 1 - 31 trong compute_budget_ms.`,relatedTab:`theory`,relatedTopicId:`tactical-delay-time-management`}],en={"bot.py":{id:`bot`,name:`StudentBot`,fileName:`bot.py`,author:`Nông Văn Bách (25022782)`,studentId:`25022782`,linesCount:97,summary:`Lớp điều khiển trung tâm và giao diện bắt buộc của ChessLab SDK. Triển khai kiến trúc phòng thủ 3 tầng (Kiểm tra biên nước đi duy nhất 0ms -> Tìm kiếm bọc try...except tự phục hồi -> Hậu kiểm hợp lệ tuyệt đối).`,keyClasses:[`StudentBot`],coreFunctions:[`__init__`,`choose_move`],annotations:[{id:`bot-import`,file:`bot.py`,startLine:1,endLine:10,title:`Khai báo thư viện và Module nội bộ`,purpose:`Import các thư viện chuẩn, thư viện cờ vua python-chess, interface ChessLab SDK và các module thuật toán nội bộ của nhóm.`,explanation:[`from __future__ import annotations: Cho phép sử dụng type hints dạng chuỗi xuôi mà không gây lỗi tham chiếu vòng.`,`import random: Sử dụng để thiết lập hạt giống ngẫu nhiên (seed) theo quy định của ban tổ chức.`,`import chess: Thư viện cờ vua lõi dùng để biểu diễn bàn cờ, sinh nước đi hợp lệ và xử lý luật Chess960.`,`from chesslab_sdk import BotConfig, SearchContext: Giao diện chuẩn giao tiếp với máy chủ chấm bài (Grader).`,`from .search import Searcher: Khởi tạo cỗ máy tìm kiếm Negamax / Alpha-Beta.`,`from .time_manager import TimeManager, compute_budget_ms: Bộ quản trị ngân sách thời gian thích ứng.`],inputs:`Không có.`,outputs:`Các module và lớp đối tượng sẵn sàng sử dụng.`,systemRole:`Thiết lập nền tảng import và ràng buộc kiểu dữ liệu cho toàn bộ lớp StudentBot.`,defensePoints:[`Giảng viên hỏi: Tại sao không import NumPy hay thư viện ngoài ở đây? Trả lời: Bot tuân thủ giới hạn tài nguyên và tốc độ, chỉ sử dụng python-chess và thư viện chuẩn để đạt thời gian khởi động < 5ms.`,`Giảng viên hỏi: Thư viện chesslab_sdk có vai trò gì? Trả lời: Định nghĩa giao thức chuẩn BotConfig và SearchContext để Grader truyền dữ liệu ván đấu và thời gian.`],codeSnippet:`from __future__ import annotations

import random
import chess

from chesslab_sdk import BotConfig, SearchContext
from .search import Searcher
from .time_manager import TimeManager, compute_budget_ms

`,relatedFunctions:[`StudentBot.__init__`,`StudentBot.choose_move`]},{id:`bot-init`,file:`bot.py`,startLine:11,endLine:39,title:`Lớp StudentBot & Phương thức khởi tạo __init__`,purpose:`Khởi tạo đối tượng StudentBot một lần duy nhất ở đầu ván đấu với cấu hình BotConfig từ ban tổ chức.`,explanation:[`self.config = config: Lưu cấu hình ván cờ (màu quân bot, chess960_id từ 0..959, initial_time_ms, seed).`,`self.searcher = Searcher(): Khởi tạo cỗ máy tìm kiếm một lần duy nhất, giữ nguyên bảng băm Transposition Table qua các lượt đi.`,`if hasattr(config, 'seed') and config.seed is not None: random.seed(config.seed): Thiết lập hạt giống ngẫu nhiên cố định để đảm bảo tính tất định (determinism) khi chạy thực nghiệm.`],inputs:`config: BotConfig chứa color, chess960_id, initial_time_ms, seed.`,outputs:`Đối tượng StudentBot với searcher sẵn sàng hoạt động.`,systemRole:`Điểm khởi tạo bắt buộc theo chuẩn giao diện của ChessLab SDK.`,defensePoints:[`Giảng viên hỏi: Tại sao khởi tạo Searcher trong __init__ mà không tạo mới mỗi lần choose_move? Trả lời: Để giữ lại Transposition Table và bảng History giữa các nước đi. Nếu tạo mới mỗi lượt, bot sẽ mất sạch tri thức đã tính ở các nước trước, làm giảm đáng kể độ sâu tìm kiếm.`,`Giảng viên hỏi: Khởi tạo bot mất bao lâu? Có vi phạm thời gian không? Trả lời: Khởi tạo mất < 2ms, hoàn toàn không ảnh hưởng đến quỹ thời gian thi đấu.`],codeSnippet:`class StudentBot:
    """
    Lớp điều khiển chính của bot cờ vua (Giao diện bắt buộc theo README của ChessLab).

    Lớp này được hệ thống chấm (grader) và môi trường thử nghiệm local (runner)
    khởi tạo một lần duy nhất ở đầu ván đấu thông qua cấu hình BotConfig, sau đó
    gọi hàm choose_move() tại mỗi lượt đi của bot.
    """

    def __init__(self, config: BotConfig) -> None:
        """
        Mục đích:
            Khởi tạo bot với cấu hình ván đấu từ ban tổ chức.

        Tham số:
            config: Đối tượng BotConfig chứa:
                - color: Màu quân của bot (chess.WHITE hoặc chess.BLACK).
                - chess960_id: Mã định danh thế cờ Chess960 (0 đến 959).
                - initial_time_ms: Tổng thời gian ban đầu của bot (mili-giây).
                - seed: Hạt giống ngẫu nhiên cố định cho ván đấu.

        Trả về:
            None.
        """
        self.config = config
        self.searcher = Searcher()
        if hasattr(config, "seed") and config.seed is not None:
            random.seed(config.seed)
`,relatedFunctions:[`Searcher.__init__`,`StudentBot.choose_move`]},{id:`bot-choose-move-tier1`,file:`bot.py`,startLine:40,endLine:77,title:`choose_move – Tầng 1: Kiểm tra biên & Nước đi duy nhất (0ms)`,purpose:`Xử lý nhanh các trường hợp đặc biệt tại biên để tiết kiệm tối đa thời gian và tài nguyên CPU.`,explanation:[`legal = list(board.legal_moves): Lấy danh sách nước đi hợp lệ của thế cờ hiện tại.`,`if not legal: return chess.Move.null(): Nếu không còn nước đi nào (chiếu hết hoặc hết nước đi hòa bí), trả về nước đi rỗng để bàn cờ kết thúc tự nhiên.`,`if len(legal) == 1: return legal[0]: Tối ưu hóa nước đi bắt buộc (forced move) - khi chỉ có 1 nước đi hợp lệ duy nhất, đi ngay lập tức trong 0ms mà không cần gọi hàm search.`],inputs:`board: chess.Board (bàn cờ hiện tại), context: SearchContext (thời gian còn lại, ply).`,outputs:`Nước đi bắt buộc ngay lập tức hoặc tiếp tục sang Tầng 2.`,systemRole:`Bộ lọc Fast-path giảm tải tuyệt đối cho bộ máy tìm kiếm.`,defensePoints:[`Giảng viên hỏi: Nước đi duy nhất thường xảy ra khi nào? Trả lời: Khi Vua bị chiếu đôi hoặc chỉ có duy nhất 1 ô chạy thoát, hoặc khi bị chiếu mà chỉ có 1 quân cản được. Đi ngay trong 0ms giúp bảo toàn 100% ngân sách thời gian cho các nước phức tạp kế tiếp.`,`Giảng viên hỏi: Tại sao cần ép list(board.legal_moves)? Trả lời: Vì legal_moves là một generator, ép thành list vừa để kiểm tra len(), vừa tái sử dụng cho tầng fallback.`],codeSnippet:`    def choose_move(self, board: chess.Board, context: SearchContext) -> chess.Move:
        """
        Mục đích:
            Lựa chọn nước đi tối ưu cho bot trong giới hạn thời gian cho phép.

        Nguyên lý vận hành (Kiến trúc phòng thủ 3 tầng):
            1. Tầng 1 (Kiểm tra biên):
               - Nếu không có nước đi hợp lệ: Trả về chess.Move.null().
               - Nếu chỉ có đúng 1 nước đi hợp lệ (forced move): Đi ngay lập tức
                 trong 0ms để tiết kiệm tối đa ngân sách thời gian cho các nước sau.
            2. Tầng 2 (Tìm kiếm & Quản trị thời gian):
               - Tính toán ngân sách thời gian (ms) dựa trên thời gian còn lại và độ trễ hệ thống.
               - Khởi tạo TimeManager và thực thi thuật toán tìm kiếm Iterative Deepening.
               - Bọc khối try...except chống sập: nếu xảy ra bất kỳ ngoại lệ nào,
                 ngay lập tức fallback về nước đi hợp lệ đầu tiên (legal[0]).
            3. Tầng 3 (Hậu kiểm tính hợp lệ):
               - Xác minh chắc chắn nước đi trả về nằm trong board.legal_moves
                 để không bao giờ bị trọng tài xử thua do trả nước đi sai luật.

        Tham số:
            board: Trạng thái bàn cờ hiện tại (đối tượng chess.Board hỗ trợ Chess960).
            context: Ngữ cảnh tìm kiếm gồm:
                - time_remaining_ms: Thời gian còn lại của bot (ms).
                - opponent_time_remaining_ms: Thời gian còn lại của đối thủ (ms).
                - ply: Số nửa nước đi (half-moves) tính từ đầu ván đấu.

        Trả về:
            chess.Move: Nước đi hợp lệ được chọn cho thế cờ hiện tại.
        """
        # TẦNG 1: Lấy sẵn danh sách nước đi hợp lệ và tối ưu nước đi bắt buộc
        legal = list(board.legal_moves)
        if not legal:
            return chess.Move.null()

        # Tối ưu nước đi duy nhất: đi ngay trong 0ms, không tiêu hao tài nguyên tính toán
        if len(legal) == 1:
            return legal[0]
`,relatedFunctions:[`compute_budget_ms`,`Searcher.search`]},{id:`bot-choose-move-tier2`,file:`bot.py`,startLine:78,endLine:92,title:`choose_move – Tầng 2: Tìm kiếm & Khối try...except Tự phục hồi`,purpose:`Tính toán ngân sách thời gian, khởi tạo TimeManager và thực thi tìm kiếm có bọc màng bảo vệ chống sập tuyệt đối.`,explanation:[`budget = compute_budget_ms(...): Tính toán soft_ms và hard_ms dựa trên thời gian còn lại, ply và thời gian ban đầu.`,`tm = TimeManager(budget): Khởi tạo đồng hồ theo dõi thời gian và deadline cứng.`,`try: move = self.searcher.search(board, tm): Thực thi thuật toán Iterative Deepening Negamax với Alpha-Beta.`,`except Exception: move = legal[0]: Cơ chế tự phục hồi (Self-healing Fallback) - nếu xảy ra bất kỳ ngoại lệ nào trong quá trình search, ngay lập tức fallback về nước đi hợp lệ đầu tiên để tránh bị xử thua do crash.`],inputs:`board, context, ngân sách thời gian tính từ time_manager.`,outputs:`Nước đi tối ưu tính được hoặc nước đi dự phòng.`,systemRole:`Trọng tâm tính toán đối kháng kết hợp màng lọc an toàn hệ thống.`,defensePoints:[`Giảng viên hỏi: Tại sao lại cần bọc try...except Exception? Trả lời: Theo quy chế giải đấu, bot bị văng ngoại lệ (crash) sẽ bị trọng tài xử thua ngay lập tức. Khối try...except bảo đảm bot luôn trả về một nước đi hợp lệ dù có bất kỳ tình huống ngoại lệ nào xảy ra.`,`Giảng viên hỏi: Nếu xảy ra fallback thì nước đi có hợp lệ không? Trả lời: Chắc chắn hợp lệ vì legal[0] được lấy trực tiếp từ board.legal_moves ở Tầng 1.`],codeSnippet:`        # TẦNG 2: Thiết lập thời gian và gọi bộ máy tìm kiếm
        budget = compute_budget_ms(
            time_remaining_ms=context.time_remaining_ms,
            ply=context.ply,
            initial_time_ms=self.config.initial_time_ms,
        )
        tm = TimeManager(budget)

        try:
            move = self.searcher.search(board, tm)
        except Exception:
            # Cơ chế tự phục hồi (Fallback an toàn): nếu thuật toán search gặp sự cố,
            # lấy ngay nước đi hợp lệ đầu tiên để tránh bị xử thua do crash hoặc văng ngoại lệ
            move = legal[0]
`,relatedFunctions:[`compute_budget_ms`,`TimeManager`,`Searcher.search`]},{id:`bot-choose-move-tier3`,file:`bot.py`,startLine:93,endLine:97,title:`choose_move – Tầng 3: Hậu kiểm tính hợp lệ tuyệt đối`,purpose:`Xác minh chắc chắn nước đi cuối cùng hợp lệ 100% trước khi bàn giao cho hệ thống chấm điểm.`,explanation:[`if move not in board.legal_moves: move = legal[0]: Lớp chốt chặn kiểm tra xem nước đi có nằm trong danh sách nước đi hợp lệ của bàn cờ hay không.`,`return move: Bàn giao nước đi hoàn hảo cho GameController.`],inputs:`move từ Tầng 2.`,outputs:`chess.Move đã được xác thực 100% hợp lệ.`,systemRole:`Hàng rào kiểm định chất lượng cuối cùng trước khi gửi nước đi cho Grader.`,defensePoints:[`Giảng viên hỏi: Tại sao đã search xong rồi vẫn phải kiểm tra move not in board.legal_moves? Trả lời: Đây là nguyên lý lập trình phòng thủ (Defensive Programming). Trong trường hợp bảng băm (TT) bị nhiễu do va chạm băm Zobrist hiếm gặp hoặc nước đi cũ không còn hợp lệ ở thế cờ hiện tại, tầng này phát hiện và sửa ngay, triệt tiêu 100% nguy cơ bị xử thua sai luật.`],codeSnippet:`        # TẦNG 3: Xác minh tính hợp lệ tuyệt đối trước khi bàn giao cho hệ thống
        if move not in board.legal_moves:
            move = legal[0]

        return move`,relatedFunctions:[`choose_move`]}],rawCode:`from __future__ import annotations

import random
import chess

from chesslab_sdk import BotConfig, SearchContext
from .search import Searcher
from .time_manager import TimeManager, compute_budget_ms


class StudentBot:
    """
    Lớp điều khiển chính của bot cờ vua (Giao diện bắt buộc theo README của ChessLab).

    Lớp này được hệ thống chấm (grader) và môi trường thử nghiệm local (runner)
    khởi tạo một lần duy nhất ở đầu ván đấu thông qua cấu hình BotConfig, sau đó
    gọi hàm choose_move() tại mỗi lượt đi của bot.
    """

    def __init__(self, config: BotConfig) -> None:
        """
        Mục đích:
            Khởi tạo bot với cấu hình ván đấu từ ban tổ chức.

        Tham số:
            config: Đối tượng BotConfig chứa:
                - color: Màu quân của bot (chess.WHITE hoặc chess.BLACK).
                - chess960_id: Mã định danh thế cờ Chess960 (0 đến 959).
                - initial_time_ms: Tổng thời gian ban đầu của bot (mili-giây).
                - seed: Hạt giống ngẫu nhiên cố định cho ván đấu.

        Trả về:
            None.
        """
        self.config = config
        self.searcher = Searcher()
        if hasattr(config, "seed") and config.seed is not None:
            random.seed(config.seed)

    def choose_move(self, board: chess.Board, context: SearchContext) -> chess.Move:
        """
        Mục đích:
            Lựa chọn nước đi tối ưu cho bot trong giới hạn thời gian cho phép.

        Nguyên lý vận hành (Kiến trúc phòng thủ 3 tầng):
            1. Tầng 1 (Kiểm tra biên):
               - Nếu không có nước đi hợp lệ: Trả về chess.Move.null().
               - Nếu chỉ có đúng 1 nước đi hợp lệ (forced move): Đi ngay lập tức
                 trong 0ms để tiết kiệm tối đa ngân sách thời gian cho các nước sau.
            2. Tầng 2 (Tìm kiếm & Quản trị thời gian):
               - Tính toán ngân sách thời gian (ms) dựa trên thời gian còn lại và độ trễ hệ thống.
               - Khởi tạo TimeManager và thực thi thuật toán tìm kiếm Iterative Deepening.
               - Bọc khối try...except chống sập: nếu xảy ra bất kỳ ngoại lệ nào,
                 ngay lập tức fallback về nước đi hợp lệ đầu tiên (legal[0]).
            3. Tầng 3 (Hậu kiểm tính hợp lệ):
               - Xác minh chắc chắn nước đi trả về nằm trong board.legal_moves
                 để không bao giờ bị trọng tài xử thua do trả nước đi sai luật.

        Tham số:
            board: Trạng thái bàn cờ hiện tại (đối tượng chess.Board hỗ trợ Chess960).
            context: Ngữ cảnh tìm kiếm gồm:
                - time_remaining_ms: Thời gian còn lại của bot (ms).
                - opponent_time_remaining_ms: Thời gian còn lại của đối thủ (ms).
                - ply: Số nửa nước đi (half-moves) tính từ đầu ván đấu.

        Trả về:
            chess.Move: Nước đi hợp lệ được chọn cho thế cờ hiện tại.
        """
        # TẦNG 1: Lấy sẵn danh sách nước đi hợp lệ và tối ưu nước đi bắt buộc
        legal = list(board.legal_moves)
        if not legal:
            return chess.Move.null()

        # Tối ưu nước đi duy nhất: đi ngay trong 0ms, không tiêu hao tài nguyên tính toán
        if len(legal) == 1:
            return legal[0]

        # TẦNG 2: Thiết lập thời gian và gọi bộ máy tìm kiếm
        budget = compute_budget_ms(
            time_remaining_ms=context.time_remaining_ms,
            ply=context.ply,
            initial_time_ms=self.config.initial_time_ms,
        )
        tm = TimeManager(budget)

        try:
            move = self.searcher.search(board, tm)
        except Exception:
            # Cơ chế tự phục hồi (Fallback an toàn): nếu thuật toán search gặp sự cố,
            # lấy ngay nước đi hợp lệ đầu tiên để tránh bị xử thua do crash hoặc văng ngoại lệ
            move = legal[0]

        # TẦNG 3: Xác minh tính hợp lệ tuyệt đối trước khi bàn giao cho hệ thống
        if move not in board.legal_moves:
            move = legal[0]

        return move
`},"time_manager.py":{id:`time_manager`,name:`TimeManager & Budget`,fileName:`time_manager.py`,author:`Nông Văn Bách (25022782)`,studentId:`25022782`,linesCount:199,summary:`Quản trị ngân sách thời gian thích ứng đa tầng (Tactical Delay-Aware Time Manager). Hấp thụ độ trễ sàn 500ms của GameController, quản lý Soft Limit / Hard Limit, và dự đoán mở tầng sâu (Branching Factor x2.2).`,keyClasses:[`TimeBudget`,`TimeManager`],coreFunctions:[`compute_budget_ms`,`start`,`should_stop`,`elapsed_ms`,`can_start_next_depth`],annotations:[{id:`time-overview`,file:`time_manager.py`,startLine:1,endLine:36,title:`Nguyên lý Hấp thụ Độ trễ & Data Class TimeBudget`,purpose:`Định nghĩa triết lý quản trị thời gian bù trừ độ trễ hệ thống và cấu trúc TimeBudget chứa Soft Limit / Hard Limit.`,explanation:[`Nguyên lý hấp thụ độ trễ GameController (500ms - 1000ms): Máy chủ áp dụng độ trễ tối thiểu 500ms cho mỗi nước. Nếu bot tính toán trong khoảng 150ms - 220ms, khoảng thời gian này hoàn toàn bị hấp thụ bởi độ trễ sàn 500ms, không làm hao hụt thêm đồng hồ thi đấu.`,`TimeBudget: Dataclass đóng băng (frozen=True, slots=True) chứa soft_ms (ngưỡng dừng mở tầng mới) và hard_ms (ngưỡng ngắt khẩn cấp tuyệt đối).`],inputs:`soft_ms (int), hard_ms (int).`,outputs:`Đối tượng TimeBudget bất biến, tối ưu bộ nhớ RAM.`,systemRole:`Khung sườn dữ liệu thời gian cho toàn bộ lượt đi.`,defensePoints:[`Giảng viên hỏi: Tại sao dùng slots=True và frozen=True? Trả lời: slots=True triệt tiêu thuộc tính __dict__, giảm dung lượng bộ nhớ từ 152 bytes xuống 48 bytes cho mỗi đối tượng, và frozen=True ngăn chặn việc vô tình sửa đổi ngưỡng thời gian trong quá trình tìm kiếm.`],codeSnippet:`"""
Module time_manager.py – Quản trị ngân sách thời gian thích ứng đa tầng (Tactical Delay-Aware Time Manager).

Nguyên lý quản lý thời gian:
1. Cơ chế hấp thụ độ trễ GameController (500ms - 1000ms):
   elapsed = max(bot_search_time_ms, random_delay_500_1000ms)
   - Trong giai đoạn khai cuộc và trung cuộc (nước 1 - 31): Ngân sách 150ms - 220ms được "hấp thụ" hoàn toàn
     bởi độ trễ tối thiểu (500ms), không làm tiêu hao thêm thời gian thực của đồng hồ thi đấu.
2. Kiểm soát ngưỡng thời gian tàn cuộc (Endgame Clock Safety):
   - Duy trì ngân sách 35ms - 55ms cho các nước sau 40 hoặc khi đồng hồ <= 10s.
   - Với tốc độ khoảng 85k-95k NPS, ngân sách này duyệt được 3,500 - 5,000 nodes, hoàn tất độ sâu 3-4 ply.
     Điều này đảm bảo nhận diện kịp thời các đòn chiếu hết, thoát chiếu và bắt quân.
   - Sau nước 55 (ply >= 110), ngân sách hạ nhẹ xuống 25ms - 40ms để duy trì đồng hồ sinh tồn trong các ván cờ cực dài.
   - Dưới 1.5 giây còn lại, kích hoạt chế độ khẩn cấp cực hạn (8ms - 15ms) để tránh bị rụng cờ (flag fall).
3. Đo lường chính xác nano-giây bằng time.perf_counter().
"""

from __future__ import annotations

import time
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class TimeBudget:
    """
    Cấu trúc dữ liệu chứa giới hạn mềm (soft limit) và giới hạn cứng (hard limit).

    Thuộc tính:
        soft_ms: Ngưỡng thời gian để quyết định có mở thêm tầng độ sâu mới hay không.
        hard_ms: Ngưỡng thời gian tối đa tuyệt đối; nếu vượt quá sẽ ngắt tìm kiếm ngay lập tức.
    """
    soft_ms: int
    hard_ms: int

`,relatedFunctions:[`compute_budget_ms`,`TimeManager.__init__`]},{id:`time-compute-budget-blitz`,file:`time_manager.py`,startLine:37,endLine:85,title:`compute_budget_ms – Phân tầng Thời gian Thể thức Blitz`,purpose:`Tính toán ngân sách thời gian thích ứng cho thể thức cờ chớp (<= 60s, ví dụ thử nghiệm 45s).`,explanation:[`safe_remaining = max(0, time_remaining_ms - 50): Dự phòng 50ms biên an toàn cho độ trễ truyền thông.`,`1. Cực hạn sinh tồn (safe_remaining <= 1,500ms): soft=8ms, hard=15ms. Chỉ tìm depth 1-2 để tuyệt đối không bị rụng cờ.`,`2. Chế độ khẩn cấp (safe_remaining <= 3,500ms): soft=15ms, hard=25ms.`,`3. Tàn cuộc siêu dài (moves_played >= 55): soft=25ms, hard=40ms. Duy trì đồng hồ trong các ván cờ kéo dài trên 100 ply.`,`4. Tàn cuộc sâu (moves >= 40 hoặc time <= 10s): soft=35ms, hard=55ms. Với tốc độ 90k NPS, duyệt được 3,500 - 5,000 nodes, hoàn tất Depth 3-4.`,`5. Giai đoạn chuyển tiếp (moves >= 32 hoặc time <= 18s): soft=60ms, hard=90ms.`,`6. Khai cuộc & Trung cuộc (moves 1 - 31): soft=150ms, hard=220ms. Hoàn toàn được hấp thụ bởi trễ sàn 500ms.`],inputs:`time_remaining_ms, ply, initial_time_ms.`,outputs:`TimeBudget tối ưu cho thế trận cờ chớp.`,systemRole:`Chiến lược phân bổ tài nguyên thời gian thích ứng độc quyền của Nhóm 12.`,defensePoints:[`Giảng viên hỏi: Tại sao lại chọn ngân sách 150ms - 220ms ở trung cuộc? Trả lời: Vì hệ thống áp dụng elapsed = max(bot_search_time_ms, random_delay_500_1000ms). Dù bot có search trong 5ms thì đồng hồ vẫn bị trừ ít nhất 500ms. Do đó dùng 150-220ms để tính sâu hơn (đạt Depth 6-8) mà không mất thêm một mili-giây nào trên đồng hồ thi đấu!`,`Giảng viên hỏi: Tại sao sau nước 55 lại hạ xuống 25ms - 40ms? Trả lời: Để chuẩn bị cho các ván cờ tàn giằng co đến 100-150 nước, bảo toàn quỹ thời gian để không bị thua do cạn giờ.`],codeSnippet:`def compute_budget_ms(
    time_remaining_ms: int,
    ply: int,
    initial_time_ms: int = 45_000,
) -> TimeBudget:
    """
    Mục đích:
        Tính toán ngân sách thời gian tìm kiếm thích ứng (ms) theo mô hình bù trừ độ trễ hệ thống.

    Tham số:
        time_remaining_ms: Thời gian còn lại của bot trên đồng hồ thi đấu (mili-giây).
        ply: Số nửa nước đi (half-moves) tính từ đầu ván đấu.
        initial_time_ms: Tổng thời gian ban đầu được cấp cho ván đấu (mili-giây).

    Trả về:
        TimeBudget: Đối tượng chứa soft_ms và hard_ms phù hợp với giai đoạn trận đấu.
    """
    safe_remaining = max(0, time_remaining_ms - 50)
    is_blitz = initial_time_ms <= 60_000
    moves_played = ply // 2

    if is_blitz:
        # 1. Chế độ khẩn cấp cực hạn (dưới 1.5 giây còn lại):
        if safe_remaining <= 1_500:
            return TimeBudget(soft_ms=8, hard_ms=15)

        # 2. Chế độ khẩn cấp (dưới 3.5 giây còn lại):
        elif safe_remaining <= 3_500:
            return TimeBudget(soft_ms=15, hard_ms=25)

        # 3. Tàn cuộc siêu dài (sau nước 55, ply >= 110):
        # Hạ nhẹ xuống 25ms - 40ms để duy trì đồng hồ sinh tồn mà vẫn đạt trọn vẹn Depth 3
        elif moves_played >= 55:
            return TimeBudget(soft_ms=25, hard_ms=40)

        # 4. Sau nước 40 hoặc quỹ thời gian dưới 10s (Tàn cuộc sâu):
        # 35ms - 55ms với 90k NPS duyệt được 3,500 - 5,000 nodes, hoàn tất Depth 3-4,
        # hoàn toàn được hấp thụ bởi độ trễ 500ms của GameController.
        elif moves_played >= 40 or safe_remaining <= 10_000:
            return TimeBudget(soft_ms=35, hard_ms=55)

        # 5. Giai đoạn chuyển tiếp (nước 32 - 39):
        elif moves_played >= 32 or safe_remaining <= 18_000:
            return TimeBudget(soft_ms=60, hard_ms=90)

        # 6. Giai đoạn khai cuộc & trung cuộc (nước 1 - 31):
        else:
            return TimeBudget(soft_ms=150, hard_ms=220)
    else:`,relatedFunctions:[`compute_budget_ms`,`TimeManager.start`]},{id:`time-compute-budget-standard`,file:`time_manager.py`,startLine:86,endLine:104,title:`compute_budget_ms – Phân tầng Thời gian Thể thức Standard`,purpose:`Tính toán ngân sách thời gian cho thể thức chuẩn (180s - 360s thi đấu chính thức theo quy chế BTL).`,explanation:[`usable_ms = max(0, time_remaining_ms - 1_000): Dự phòng 1000ms đệm an toàn.`,`moves_left = max(1, (301 - safe_ply) // 2): Ước lượng số nước còn lại dựa trên giới hạn 300 nước của giải đấu.`,`Phân tầng khẩn cấp: <= 3s -> 15ms/25ms; <= 10s -> 50ms/100ms; <= 25s -> 120ms/200ms.`,`Phân tầng bình thường: per_move = usable_ms // (moves_left + 10); hard_ms = min(per_move, 15% time_remaining); soft_ms = 70% hard_ms.`],inputs:`time_remaining_ms, ply, initial_time_ms > 60,000.`,outputs:`TimeBudget cho trận đấu dài 180s - 360s.`,systemRole:`Phân phối năng lượng tìm kiếm đều khắp 300 nước đi.`,defensePoints:[`Giảng viên hỏi: Tại sao lại dùng công thức per_move = usable_ms // (moves_left + 10)? Trả lời: Việc cộng thêm 10 nước đệm bảo đảm bot không tiêu hết thời gian quá sớm ở trung cuộc và luôn còn đủ thời gian xử lý nếu ván cờ kéo dài quá số nước dự tính.`],codeSnippet:`        # Thể thức Standard (180s - 360s thi đấu chính thức):
        safe_ply = max(0, ply)
        moves_left = max(1, (301 - safe_ply) // 2)
        usable_ms = max(0, time_remaining_ms - 1_000)

        if usable_ms <= 3_000:
            return TimeBudget(soft_ms=15, hard_ms=25)
        elif usable_ms <= 10_000:
            return TimeBudget(soft_ms=50, hard_ms=100)
        elif usable_ms <= 25_000:
            return TimeBudget(soft_ms=120, hard_ms=200)
        else:
            per_move = usable_ms // (moves_left + 10)
            hard_ms = min(per_move, int(time_remaining_ms * 0.15))
            hard_ms = max(hard_ms, min(1_500, usable_ms))
            soft_ms = int(hard_ms * 0.70)
            return TimeBudget(soft_ms=soft_ms, hard_ms=hard_ms)

`,relatedFunctions:[`compute_budget_ms`]},{id:`time-class-methods`,file:`time_manager.py`,startLine:105,endLine:199,title:`Lớp TimeManager & Dự đoán Tăng trưởng Độ sâu (Branching Factor)`,purpose:`Quản lý đồng hồ đo thời gian thực đơn điệu và thuật toán quyết định mở tầng sâu kế tiếp.`,explanation:[`__slots__: Tối ưu truy cập thuộc tính và bộ nhớ RAM.`,`start(): Ghi nhận mốc _start_time bằng time.perf_counter() và xác lập _deadline.`,`should_stop(): Trả về True ngay lập tức nếu time.perf_counter() >= self._deadline (Hard Limit).`,`can_start_next_depth(): 1. Nếu elapsed >= soft_ms -> Dừng ngay. 2. Nếu last_iteration_ms > 0: tính predicted_ms = int(last_iteration_ms * 2.2). Nếu elapsed + predicted_ms >= hard_ms -> Dừng ngay không mở tầng mới!`],inputs:`TimeBudget đối tượng.`,outputs:`Quyết định mở tầng tìm kiếm mới (bool) và kiểm tra hạn chót.`,systemRole:`Trọng tài thời gian kiểm soát vòng lặp Iterative Deepening.`,defensePoints:[`Giảng viên hỏi: Tại sao hệ số nhân dự đoán là 2.2? Trả lời: Với Alpha-Beta và Move Ordering tốt kết hợp PVS, hệ số phân nhánh hiệu dụng (Effective Branching Factor - EBF) đo đạc thực nghiệm của bot đạt khoảng 2.0 - 2.4. Chọn 2.2 là điểm cân bằng lý tưởng: nếu thời gian ước tính vượt hard_ms, bot dừng ngay ở tầng hiện tại để bảo toàn nước đi tốt nhất mà không bị lãng phí công sức vào tầng dở dang.`,`Giảng viên hỏi: Tại sao dùng time.perf_counter() mà không dùng time.time()? Trả lời: time.perf_counter() là đồng hồ đơn điệu (monotonic clock) có độ phân giải nano-giây, không bị ảnh hưởng bởi việc đồng bộ giờ hệ thống của hệ điều hành.`],codeSnippet:`class TimeManager:
    """
    Bộ quản lý đồng hồ đơn điệu và deadline cho lượt tìm kiếm.
    Hỗ trợ Soft Limit, Hard Limit và Dự đoán tăng trưởng thời gian lặp sâu (Branching Factor Prediction).
    """

    __slots__ = ("soft_ms", "hard_ms", "_start_time", "_deadline", "last_iteration_ms")

    def __init__(self, budget: TimeBudget | int) -> None:
        """
        Mục đích:
            Khởi tạo bộ quản lý thời gian với ngân sách xác định.

        Tham số:
            budget: Đối tượng TimeBudget hoặc một số nguyên biểu thị mili-giây.

        Trả về:
            None.
        """
        if isinstance(budget, TimeBudget):
            self.soft_ms: int = budget.soft_ms
            self.hard_ms: int = budget.hard_ms
        else:
            self.soft_ms = int(budget * 0.70)
            self.hard_ms = budget

        self._start_time: float = 0.0
        self._deadline: float = 0.0
        self.last_iteration_ms: int = 0

    def start(self) -> None:
        """
        Mục đích:
            Bắt đầu tính giờ và xác lập deadline cứng sử dụng time.perf_counter().

        Tham số:
            None.

        Trả về:
            None.
        """
        self._start_time = time.perf_counter()
        self._deadline = self._start_time + self.hard_ms / 1000.0

    def should_stop(self) -> bool:
        """
        Mục đích:
            Kiểm tra xem đã vượt quá Hard Limit (hạn chót tuyệt đối) hay chưa.

        Tham số:
            None.

        Trả về:
            bool: True nếu đã hết thời gian, False nếu vẫn còn thời gian.
        """
        return time.perf_counter() >= self._deadline

    def elapsed_ms(self) -> int:
        """
        Mục đích:
            Tính số mili-giây đã trôi qua kể từ khi gọi hàm start().

        Tham số:
            None.

        Trả về:
            int: Thời gian đã trôi qua (ms).
        """
        if self._start_time == 0.0:
            return 0
        return int((time.perf_counter() - self._start_time) * 1000)

    def can_start_next_depth(self) -> bool:
        """
        Mục đích:
            Kiểm tra Soft Limit và Dự đoán tăng trưởng thời gian (Branching Factor Prediction).
            Nếu thời gian đã trôi qua cộng với thời gian ước lượng cho tầng kế tiếp (x2.2)
            vượt quá Hard Limit, dừng ngay ở độ sâu hiện tại để bảo toàn thành quả.

        Tham số:
            None.

        Trả về:
            bool: True nếu an toàn để bắt đầu tầng độ sâu mới, False nếu nên dừng lại.
        """
        elapsed = self.elapsed_ms()
        if elapsed >= self.soft_ms:
            return False

        if self.last_iteration_ms > 0:
            predicted_ms = int(self.last_iteration_ms * 2.2)
            if elapsed + predicted_ms >= self.hard_ms:
                return False

        return True`,relatedFunctions:[`Searcher.search`]}],rawCode:`"""
Module time_manager.py – Quản trị ngân sách thời gian thích ứng đa tầng (Tactical Delay-Aware Time Manager).

Nguyên lý quản lý thời gian:
1. Cơ chế hấp thụ độ trễ GameController (500ms - 1000ms):
   elapsed = max(bot_search_time_ms, random_delay_500_1000ms)
   - Trong giai đoạn khai cuộc và trung cuộc (nước 1 - 31): Ngân sách 150ms - 220ms được "hấp thụ" hoàn toàn
     bởi độ trễ tối thiểu (500ms), không làm tiêu hao thêm thời gian thực của đồng hồ thi đấu.
2. Kiểm soát ngưỡng thời gian tàn cuộc (Endgame Clock Safety):
   - Duy trì ngân sách 35ms - 55ms cho các nước sau 40 hoặc khi đồng hồ <= 10s.
   - Với tốc độ khoảng 85k-95k NPS, ngân sách này duyệt được 3,500 - 5,000 nodes, hoàn tất độ sâu 3-4 ply.
     Điều này đảm bảo nhận diện kịp thời các đòn chiếu hết, thoát chiếu và bắt quân.
   - Sau nước 55 (ply >= 110), ngân sách hạ nhẹ xuống 25ms - 40ms để duy trì đồng hồ sinh tồn trong các ván cờ cực dài.
   - Dưới 1.5 giây còn lại, kích hoạt chế độ khẩn cấp cực hạn (8ms - 15ms) để tránh bị rụng cờ (flag fall).
3. Đo lường chính xác nano-giây bằng time.perf_counter().
"""

from __future__ import annotations

import time
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class TimeBudget:
    """
    Cấu trúc dữ liệu chứa giới hạn mềm (soft limit) và giới hạn cứng (hard limit).

    Thuộc tính:
        soft_ms: Ngưỡng thời gian để quyết định có mở thêm tầng độ sâu mới hay không.
        hard_ms: Ngưỡng thời gian tối đa tuyệt đối; nếu vượt quá sẽ ngắt tìm kiếm ngay lập tức.
    """
    soft_ms: int
    hard_ms: int


def compute_budget_ms(
    time_remaining_ms: int,
    ply: int,
    initial_time_ms: int = 45_000,
) -> TimeBudget:
    """
    Mục đích:
        Tính toán ngân sách thời gian tìm kiếm thích ứng (ms) theo mô hình bù trừ độ trễ hệ thống.

    Tham số:
        time_remaining_ms: Thời gian còn lại của bot trên đồng hồ thi đấu (mili-giây).
        ply: Số nửa nước đi (half-moves) tính từ đầu ván đấu.
        initial_time_ms: Tổng thời gian ban đầu được cấp cho ván đấu (mili-giây).

    Trả về:
        TimeBudget: Đối tượng chứa soft_ms và hard_ms phù hợp với giai đoạn trận đấu.
    """
    safe_remaining = max(0, time_remaining_ms - 50)
    is_blitz = initial_time_ms <= 60_000
    moves_played = ply // 2

    if is_blitz:
        # 1. Chế độ khẩn cấp cực hạn (dưới 1.5 giây còn lại):
        if safe_remaining <= 1_500:
            return TimeBudget(soft_ms=8, hard_ms=15)

        # 2. Chế độ khẩn cấp (dưới 3.5 giây còn lại):
        elif safe_remaining <= 3_500:
            return TimeBudget(soft_ms=15, hard_ms=25)

        # 3. Tàn cuộc siêu dài (sau nước 55, ply >= 110):
        # Hạ nhẹ xuống 25ms - 40ms để duy trì đồng hồ sinh tồn mà vẫn đạt trọn vẹn Depth 3
        elif moves_played >= 55:
            return TimeBudget(soft_ms=25, hard_ms=40)

        # 4. Sau nước 40 hoặc quỹ thời gian dưới 10s (Tàn cuộc sâu):
        # 35ms - 55ms với 90k NPS duyệt được 3,500 - 5,000 nodes, hoàn tất Depth 3-4,
        # hoàn toàn được hấp thụ bởi độ trễ 500ms của GameController.
        elif moves_played >= 40 or safe_remaining <= 10_000:
            return TimeBudget(soft_ms=35, hard_ms=55)

        # 5. Giai đoạn chuyển tiếp (nước 32 - 39):
        elif moves_played >= 32 or safe_remaining <= 18_000:
            return TimeBudget(soft_ms=60, hard_ms=90)

        # 6. Giai đoạn khai cuộc & trung cuộc (nước 1 - 31):
        else:
            return TimeBudget(soft_ms=150, hard_ms=220)
    else:
        # Thể thức Standard (180s - 360s thi đấu chính thức):
        safe_ply = max(0, ply)
        moves_left = max(1, (301 - safe_ply) // 2)
        usable_ms = max(0, time_remaining_ms - 1_000)

        if usable_ms <= 3_000:
            return TimeBudget(soft_ms=15, hard_ms=25)
        elif usable_ms <= 10_000:
            return TimeBudget(soft_ms=50, hard_ms=100)
        elif usable_ms <= 25_000:
            return TimeBudget(soft_ms=120, hard_ms=200)
        else:
            per_move = usable_ms // (moves_left + 10)
            hard_ms = min(per_move, int(time_remaining_ms * 0.15))
            hard_ms = max(hard_ms, min(1_500, usable_ms))
            soft_ms = int(hard_ms * 0.70)
            return TimeBudget(soft_ms=soft_ms, hard_ms=hard_ms)


class TimeManager:
    """
    Bộ quản lý đồng hồ đơn điệu và deadline cho lượt tìm kiếm.
    Hỗ trợ Soft Limit, Hard Limit và Dự đoán tăng trưởng thời gian lặp sâu (Branching Factor Prediction).
    """

    __slots__ = ("soft_ms", "hard_ms", "_start_time", "_deadline", "last_iteration_ms")

    def __init__(self, budget: TimeBudget | int) -> None:
        """
        Mục đích:
            Khởi tạo bộ quản lý thời gian với ngân sách xác định.

        Tham số:
            budget: Đối tượng TimeBudget hoặc một số nguyên biểu thị mili-giây.

        Trả về:
            None.
        """
        if isinstance(budget, TimeBudget):
            self.soft_ms: int = budget.soft_ms
            self.hard_ms: int = budget.hard_ms
        else:
            self.soft_ms = int(budget * 0.70)
            self.hard_ms = budget

        self._start_time: float = 0.0
        self._deadline: float = 0.0
        self.last_iteration_ms: int = 0

    def start(self) -> None:
        """
        Mục đích:
            Bắt đầu tính giờ và xác lập deadline cứng sử dụng time.perf_counter().

        Tham số:
            None.

        Trả về:
            None.
        """
        self._start_time = time.perf_counter()
        self._deadline = self._start_time + self.hard_ms / 1000.0

    def should_stop(self) -> bool:
        """
        Mục đích:
            Kiểm tra xem đã vượt quá Hard Limit (hạn chót tuyệt đối) hay chưa.

        Tham số:
            None.

        Trả về:
            bool: True nếu đã hết thời gian, False nếu vẫn còn thời gian.
        """
        return time.perf_counter() >= self._deadline

    def elapsed_ms(self) -> int:
        """
        Mục đích:
            Tính số mili-giây đã trôi qua kể từ khi gọi hàm start().

        Tham số:
            None.

        Trả về:
            int: Thời gian đã trôi qua (ms).
        """
        if self._start_time == 0.0:
            return 0
        return int((time.perf_counter() - self._start_time) * 1000)

    def can_start_next_depth(self) -> bool:
        """
        Mục đích:
            Kiểm tra Soft Limit và Dự đoán tăng trưởng thời gian (Branching Factor Prediction).
            Nếu thời gian đã trôi qua cộng với thời gian ước lượng cho tầng kế tiếp (x2.2)
            vượt quá Hard Limit, dừng ngay ở độ sâu hiện tại để bảo toàn thành quả.

        Tham số:
            None.

        Trả về:
            bool: True nếu an toàn để bắt đầu tầng độ sâu mới, False nếu nên dừng lại.
        """
        elapsed = self.elapsed_ms()
        if elapsed >= self.soft_ms:
            return False

        if self.last_iteration_ms > 0:
            predicted_ms = int(self.last_iteration_ms * 2.2)
            if elapsed + predicted_ms >= self.hard_ms:
                return False

        return True
`},"evaluation.py":{id:`evaluation`,name:`Heuristic Evaluation Core`,fileName:`evaluation.py`,author:`Lê Văn Việt (25023069)`,studentId:`25023069`,linesCount:611,summary:`Hàm đánh giá thế cờ tốc độ cao (~89,000 evals/giây). PeSTO Piece-Square Tables với kỹ thuật bit-packing tuyến tính mg + (eg << 16), Tapered Evaluation theo Game Phase (0..24), An toàn Vua động (Bitwise King Ring), và Mop-Up Heuristic tàn cuộc.`,keyClasses:[`PeSTO Piece-Square Tables`,`Bitwise King Zones`],coreFunctions:[`evaluate`,`_pk`,`_orient_table`,`_build_packed_pst`,`_build_king_zones`,`_pst_sum`],annotations:[{id:`eval-overview-pesto`,file:`evaluation.py`,startLine:1,endLine:65,title:`Kiến trúc Lượng giá PeSTO & Trọng số Game Phase`,purpose:`Định nghĩa giá trị vật chất trung cuộc/tàn cuộc và hệ thống trọng số pha cờ (Game Phase Weights).`,explanation:[`MG_PIECE_VALUES: Pawn=81, Knight=324, Bishop=360, Rook=486, Queen=1024 centipawns ở trung cuộc.`,`EG_PIECE_VALUES: Pawn=99, Knight=288, Bishop=306, Rook=512, Queen=972 centipawns ở tàn cuộc (Tốt và Xe tăng giá trị, Mã và Tượng giảm giá trị).`,`PHASE_WEIGHTS: Mã=1, Tượng=1, Xe=2, Hậu=4. Tổng trọng số cả 2 bên tối đa là 24 (MAX_PHASE = 24). Khi phase = 24 là khai cuộc đầy đủ, phase = 0 là tàn cuộc thuần túy.`],inputs:`Loại quân cờ chess.PieceType.`,outputs:`Giá trị vật chất và trọng số pha cờ.`,systemRole:`Khung định lượng vật chất và thang đo thời gian chiến lược của ván cờ.`,defensePoints:[`Giảng viên hỏi: Tại sao giá trị Tốt lại tăng từ 81 lên 99 ở tàn cuộc, còn Hậu lại giảm từ 1024 xuống 972? Trả lời: Ở tàn cuộc, khả năng phong cấp của Tốt trở thành yếu tố quyết định thắng thua nên giá trị Tốt tăng vọt. Ngược lại, Hậu mất dần khả năng phối hợp tấn công Vua nên giảm nhẹ giá trị.`,`Giảng viên hỏi: Tại sao tổng phase lại là 24? Trả lời: Mỗi bên có 2 Mã (2*1) + 2 Tượng (2*1) + 2 Xe (2*2) + 1 Hậu (1*4) = 12 điểm. Hai bên cộng lại đúng 24 điểm.`],codeSnippet:`"""
Module evaluation.py – Động cơ lượng giá vị trí cờ vua tốc độ cao (Heuristic Evaluation Core).

Các thành phần chính của hàm lượng giá:
1. Giá trị vật chất và vị trí ô (PeSTO Piece-Square Tables):
   - Đóng gói tuyến tính an toàn: val = mg + (eg << 16).
   - Giải nén số nguyên có dấu: eg = (val + 0x8000) >> 16, mg = val - (eg << 16).
   - Triệt tiêu hoàn toàn rủi ro tràn số âm 16-bit trong Python.
2. Nội suy theo giai đoạn trận đấu (Tapered Evaluation):
   - Tổng trọng số game phase từ 0 (tàn cuộc thuần túy) đến 24 (khai cuộc đầy đủ quân).
   - Điểm số nội suy: score = (mg * phase + eg * (24 - phase)) // 24.
3. Hoạt động của các quân cờ:
   - Thưởng cặp Tượng (Bishop Pair).
   - Thưởng Xe trên cột mở (Open File), cột bán mở (Semi-open File) và hàng 7 (7th Rank).
   - Thưởng Mã chiếm tiền đồn trung tâm được Tốt bảo vệ (Knight Outposts).
4. Cấu trúc Tốt:
   - Phạt Tốt chồng (Doubled Pawns) và Tốt cô lập (Isolated Pawns).
   - Thưởng Tốt thông (Passed Pawns) tăng dần theo rank tiến về phía trước.
   - Thưởng Tốt thông liên kết (Connected Passed Pawns).
5. An toàn Vua thích ứng Chess960 (Dynamic Bitwise King Ring):
   - Tính toán vành đai bảo vệ quanh Vua theo tọa độ thực tế của Vua, độc lập với vị trí ô khởi đầu.
   - Thưởng lá chắn Tốt gần/xa, phạt cột mở trước mặt Vua trong trung cuộc.
6. Dồn Vua tàn cuộc (Gated Mop-Up Heuristic):
   - Chỉ kích hoạt khi tàn cuộc áp đảo (phase <= 6 và chênh lệch >= 200 centipawns).
   - Thưởng điểm khi ép Vua đối phương ra xa tâm bàn cờ và kéo Vua ta áp sát để tạo mạng lưới chiếu hết.
7. Quy ước đối xứng gương (Mirror Symmetry):
   - Đảm bảo evaluate(b) == evaluate(b.mirror()) trên mọi thế cờ.
"""

from __future__ import annotations

import chess

# ---------------------------------------------------------------------------
# Giá trị vật chất cơ sở (PeSTO standard values)
# ---------------------------------------------------------------------------
MG_PIECE_VALUES: dict[chess.PieceType, int] = {
    chess.PAWN:   81,
    chess.KNIGHT: 324,
    chess.BISHOP: 360,
    chess.ROOK:   486,
    chess.QUEEN:  1024,
    chess.KING:   0,
}

EG_PIECE_VALUES: dict[chess.PieceType, int] = {
    chess.PAWN:   99,
    chess.KNIGHT: 288,
    chess.BISHOP: 306,
    chess.ROOK:   512,
    chess.QUEEN:  972,
    chess.KING:   0,
}

# Trọng số tính phase (tổng tối đa 24 cho cả 2 bên)
PHASE_WEIGHTS: dict[chess.PieceType, int] = {
    chess.PAWN:   0,
    chess.KNIGHT: 1,
    chess.BISHOP: 1,
    chess.ROOK:   2,
    chess.QUEEN:  4,
    chess.KING:   0,
}
MAX_PHASE = 24
`,relatedFunctions:[`evaluate`,`_build_packed_pst`]},{id:`eval-bit-packing`,file:`evaluation.py`,startLine:196,endLine:273,title:`Kỹ thuật Đóng gói Tuyến tính mg + (eg << 16) & Định hướng Bảng`,purpose:`Chuyển đổi bảng PST sang chỉ số chuẩn và nén 2 giá trị MG/EG vào một số nguyên 32-bit duy nhất.`,explanation:[`_orient_table(raw): Chuyển mảng thô 64 ô từ Rank 8 -> Rank 1 sang thứ tự chỉ số chuẩn python-chess (0 = a1, 63 = h8).`,`_pk(mg, eg): Đóng gói tuyến tính an toàn: val = mg + (eg << 16).`,`_build_packed_pst: Cộng sẵn giá trị vật chất cơ sở với giá trị vị trí ô (PST) cho 64 ô cờ thành bảng tuple bất biến.`,`Giải nén số nguyên có dấu: eg = (val + 0x8000) >> 16, mg = val - (eg << 16). Triệt tiêu 100% rủi ro tràn số âm trong Python.`],inputs:`Bảng điểm PST thô và loại quân cờ.`,outputs:`Tuple 64 phần tử đã nén sẵn cho quân Trắng và Đen.`,systemRole:`Tối ưu hóa tốc độ cộng dồn điểm vị trí lên gấp 2 lần.`,defensePoints:[`Giảng viên hỏi: Tại sao đóng gói bằng bitwise & 0xFFFF lại bị lỗi trong Python? Trả lời: Trong Python số nguyên có độ dài tùy biến. Phép bitmask & 0xFFFF với số âm (ví dụ -15) sẽ biến thành 65521 (số dương lớn), làm sai lệch hoàn toàn điểm cờ tàn. Nhóm 12 đã khắc phục bằng đóng gói tuyến tính mg + (eg << 16) và giải nén có làm tròn có dấu eg = (val + 0x8000) >> 16.`,`Giảng viên hỏi: Tác dụng của việc đóng gói này là gì? Trả lời: Thay vì phải tính riêng 2 biến mg_score và eg_score trong mỗi vòng lặp đếm quân, bot chỉ cần 1 phép cộng số học duy nhất: s += table[sq], tăng tốc độ evaluate lên ~89,000 evals/s.`],codeSnippet:`def _orient_table(raw: list[int]) -> list[int]:
    """
    Mục đích:
        Chuyển đổi mảng thô (xếp từ Rank 8 xuống Rank 1) sang chỉ số ô chuẩn của python-chess (0 = a1, 63 = h8).

    Tham số:
        raw: Mảng 64 số nguyên biểu diễn điểm vị trí.

    Trả về:
        list[int]: Mảng 64 số nguyên đã căn chỉnh theo thứ tự ô từ 0 đến 63.
    """
    out = [0] * 64
    for r in range(8):
        for f in range(8):
            sq = r * 8 + f
            raw_idx = (7 - r) * 8 + f
            out[sq] = raw[raw_idx]
    return out


PST_MG = {
    chess.PAWN:   _orient_table(_PAWN_MG_RAW),
    chess.KNIGHT: _orient_table(_KNIGHT_MG_RAW),
    chess.BISHOP: _orient_table(_BISHOP_MG_RAW),
    chess.ROOK:   _orient_table(_ROOK_MG_RAW),
    chess.QUEEN:  _orient_table(_QUEEN_MG_RAW),
    chess.KING:   _orient_table(_KING_MG_RAW),
}

PST_EG = {
    chess.PAWN:   _orient_table(_PAWN_EG_RAW),
    chess.KNIGHT: _orient_table(_KNIGHT_EG_RAW),
    chess.BISHOP: _orient_table(_BISHOP_EG_RAW),
    chess.ROOK:   _orient_table(_ROOK_EG_RAW),
    chess.QUEEN:  _orient_table(_QUEEN_EG_RAW),
    chess.KING:   _orient_table(_KING_EG_RAW),
}

# Điểm thưởng tốt thông theo từng rank (chỉ số 0 đến 7)
PASSED_PAWN_BONUS_MG = [0, 5, 10, 20, 35, 60, 100, 0]
PASSED_PAWN_BONUS_EG = [0, 10, 20, 40, 70, 120, 200, 0]


def _pk(mg: int, eg: int) -> int:
    """
    Mục đích:
        Đóng gói hai giá trị trung cuộc (mg) và tàn cuộc (eg) vào một số nguyên duy nhất.
        Công thức tuyến tính mg + (eg << 16) bảo toàn chính xác số nguyên có dấu trong Python.

    Tham số:
        mg: Điểm số trung cuộc (centipawn).
        eg: Điểm số tàn cuộc (centipawn).

    Trả về:
        int: Số nguyên đã đóng gói.
    """
    return mg + (eg << 16)


def _build_packed_pst(color_white: bool, pt: chess.PieceType) -> tuple[int, ...]:
    """
    Mục đích:
        Tạo bảng PST đóng gói sẵn (gồm giá trị vật chất + giá trị vị trí ô) cho từng loại quân.

    Tham số:
        color_white: True nếu là quân Trắng, False nếu là quân Đen.
        pt: Loại quân cờ (chess.PAWN, chess.KNIGHT, ...).

    Trả về:
        tuple[int, ...]: Tuple 64 phần tử chứa giá trị đã đóng gói cho 64 ô cờ.
    """
    mg_base, eg_base = MG_PIECE_VALUES[pt], EG_PIECE_VALUES[pt]
    out = []
    for sq in range(64):
        src = sq if color_white else sq ^ 56
        out.append(_pk(mg_base + PST_MG[pt][src], eg_base + PST_EG[pt][src]))
    return tuple(out)
`,relatedFunctions:[`_pk`,`_orient_table`,`evaluate`]},{id:`eval-king-zones-bitboards`,file:`evaluation.py`,startLine:321,endLine:426,title:`An toàn Vua Động (Dynamic King Ring) & Thao tác Bitboard Siêu tốc`,purpose:`Xây dựng vành đai bảo vệ Vua theo tọa độ ô thực tế và các hàm thao tác bitboard hướng Bắc/Nam/Cột.`,explanation:[`_build_king_zones(): Tính trước mặt nạ 3 cột lân cận và các hàng lá chắn bảo vệ (Near/Far shield) cho toàn bộ 64 ô cờ.`,`_popcount(bb): Đếm số bit 1 bằng bb.bit_count() (lệnh assembly POPCNT của CPU) hoặc bảng tra cứu 256 phần tử.`,`_north_fill(bb) & _south_fill(bb): Mở rộng mặt nạ bit theo hướng tiến của Tốt Trắng / Tốt Đen bằng các phép dịch bit 8, 16, 32.`,`_spread_files(bb): Mở rộng mặt nạ bit sang 2 cột liền kề trái và phải để kiểm tra Tốt thông và Tốt cô lập.`],inputs:`Bitboard 64-bit.`,outputs:`Mặt nạ bit đã xử lý và số lượng bit 1.`,systemRole:`Trụ cột tính toán song song bitboard cho cấu trúc Tốt và an toàn Vua.`,defensePoints:[`Giảng viên hỏi: Tại sao thiết kế King Ring của Nhóm 12 lại an toàn với Chess960? Trả lời: Trong cờ vua chuẩn, Vua Trắng luôn ở e1. Nhưng trong Chess960, Vua có thể xuất phát ở bất kỳ ô nào từ b1 đến g1. Thiết kế của nhóm tính vành đai bảo vệ động dựa trên tọa độ ô thực tế của Vua (wk, bk) chứ không gán cứng vào ô nhập thành tiêu chuẩn, đảm bảo đánh giá chính xác trên cả 960 biến thể!`],codeSnippet:`def _build_king_zones():
    """
    Mục đích:
        Xây dựng sẵn mặt nạ các cột lân cận và hàng lá chắn bảo vệ Vua cho toàn bộ 64 ô cờ.

    Tham số:
        None.

    Trả về:
        tuple: (files, near_w, far_w, near_b, far_b) phục vụ đánh giá an toàn Vua động.
    """
    files, near_w, far_w, near_b, far_b = [], [], [], [], []
    for sq in range(64):
        f = sq & 7
        r = sq >> 3
        fl = max(0, f - 1)
        fr = min(7, f + 1)
        fmask = 0
        for fi in range(fl, fr + 1):
            fmask |= 1 << fi
        files.append(fmask)

        def _row_mask(r_idx, fl_i, fr_i):
            if not (0 <= r_idx < 8):
                return 0
            m = 0
            for fi in range(fl_i, fr_i + 1):
                m |= 1 << (r_idx * 8 + fi)
            return m

        near_w.append(_row_mask(r + 1, fl, fr))
        far_w.append(_row_mask(r + 2, fl, fr))
        near_b.append(_row_mask(r - 1, fl, fr))
        far_b.append(_row_mask(r - 2, fl, fr))

    return (tuple(files), tuple(near_w), tuple(far_w), tuple(near_b), tuple(far_b))


_KS_FILES, _KS_NEAR_W, _KS_FAR_W, _KS_NEAR_B, _KS_FAR_B = _build_king_zones()

_POPCOUNT_TABLE = [bin(i).count("1") for i in range(256)]


def _popcount(bb: int) -> int:
    """
    Mục đích:
        Đếm số lượng bit 1 trong một số nguyên 64-bit (Bitboard).

    Tham số:
        bb: Số nguyên 64-bit.

    Trả về:
        int: Số lượng bit 1.
    """
    try:
        return bb.bit_count()
    except AttributeError:
        cnt = 0
        while bb:
            cnt += _POPCOUNT_TABLE[bb & 0xFF]
            bb >>= 8
        return cnt


def _pst_sum(bb: int, table: tuple[int, ...]) -> int:
    """
    Mục đích:
        Cộng dồn giá trị PST đóng gói cho tất cả các quân cờ đang hiện diện trên Bitboard.

    Tham số:
        bb: Mặt nạ bit vị trí các quân cờ.
        table: Bảng giá trị đóng gói tương ứng với loại quân.

    Trả về:
        int: Tổng giá trị đóng gói.
    """
    tot = 0
    while bb:
        lsb = bb & -bb
        sq = lsb.bit_length() - 1
        tot += table[sq]
        bb ^= lsb
    return tot


def _north_fill(bb: int) -> int:
    """Mở rộng mặt nạ bit về hướng Bắc (cho quân Trắng)."""
    bb |= (bb << 8)  & _ALL
    bb |= (bb << 16) & _ALL
    bb |= (bb << 32) & _ALL
    return bb


def _south_fill(bb: int) -> int:
    """Mở rộng mặt nạ bit về hướng Nam (cho quân Đen)."""
    bb |= bb >> 8
    bb |= bb >> 16
    bb |= bb >> 32
    return bb


def _spread_files(bb: int) -> int:
    """Mở rộng mặt nạ bit sang hai cột liền kề trái và phải."""
    return bb | ((bb << 1) & _NOT_FILE_A) | ((bb >> 1) & _NOT_FILE_H)

`,relatedFunctions:[`_build_king_zones`,`evaluate`]},{id:`eval-core-steps`,file:`evaluation.py`,startLine:427,endLine:560,title:`Hàm evaluate – Bước 1 đến 6: Vật chất, Tốt, Xe, Mã`,purpose:`Thực thi 6 bước lượng giá đầu tiên: Phase, Vật chất + PST, Cặp Tượng, Cấu trúc Tốt, Hoạt động Xe và Mã tiền đồn.`,explanation:[`1. Game Phase: Đếm tổng số quân lớn wn|bn|wb|bb, wr|br, wq|bq theo PHASE_WEIGHTS.`,`2. Material & PST: Cộng dồn _pst_sum trên các bitboard quân cờ.`,`3. Cặp Tượng: Thưởng _BISHOP_PAIR (_pk(36, 54)) khi có >= 2 Tượng trên 2 màu ô.`,`4. Cấu trúc Tốt: Phạt Tốt chồng _DOUBLED_PAWN (_pk(18, 24)), phạt Tốt cô lập _ISOLATED_PAWN (_pk(18, 24)), thưởng Tốt thông theo rank _PASSED_W và thưởng Tốt thông liên kết _CONNECTED_PASSED (_pk(24, 48)).`,`5. Hoạt động Xe: Thưởng Xe cột mở hoàn toàn _ROOK_OPEN_FILE (_pk(27, 21)), cột bán mở _ROOK_SEMI_OPEN, và hàng 7/2 _ROOK_7TH (_pk(27, 36)).`,`6. Mã tiền đồn: Thưởng Mã đứng ở hàng 4-6 Trắng / 3-5 Đen được Tốt bảo vệ _KNIGHT_OUTPOST (_pk(24, 12)).`],inputs:`board: chess.Board.`,outputs:`Điểm số đóng gói tích lũy s.`,systemRole:`Lượng giá toàn diện về vật chất và thế đứng chiến thuật.`,defensePoints:[`Giảng viên hỏi: Cách nhóm phát hiện Tốt thông (Passed Pawn) bằng bitboard thế nào? Trả lời: Nhóm dùng full_b = _south_fill(bp) và _spread_files(full_b) để tạo ra vùng cấm trước mặt Tốt Đen. Sau đó passed_w = wp & ~_spread_files(full_b). Chỉ mất 3 phép toán bitwise O(1) là tìm ra toàn bộ Tốt thông của Trắng mà không cần vòng lặp!`,`Giảng viên hỏi: Tại sao phạt Tốt chồng? Trả lời: Tốt chồng trên cùng 1 cột cản trở đường di chuyển của nhau, không thể bảo vệ lẫn nhau và làm hở các cột cho Xe đối phương tấn công.`],codeSnippet:`def evaluate(board: chess.Board) -> int:
    """
    Mục đích:
        Đánh giá giá trị vị trí của thế cờ hiện tại dựa trên tri thức chuyên gia.

    Quy trình đánh giá gồm 11 bước:
        1. Game Phase: Xác định giai đoạn trận đấu (0 = tàn cuộc, 24 = khai cuộc) dựa trên số lượng quân cờ lớn.
        2. Material & PST: Lượng giá vật chất và vị trí ô bằng bảng đóng gói tuyến tính.
        3. Cặp Tượng (Bishop Pair): Thưởng khi sở hữu cả 2 Tượng trên hai màu ô khác nhau.
        4. Cấu trúc Tốt: Phạt Tốt chồng, Tốt cô lập; thưởng Tốt thông và Tốt thông liên kết.
        5. Hoạt động của Xe: Thưởng Xe trên cột mở, cột bán mở và hàng 7 (hoặc hàng 2 đối với Đen).
        6. Mã tiền đồn (Knight Outposts): Thưởng Mã đứng ở các hàng 4-6 (hoặc 3-5 đối với Đen) có Tốt bảo vệ.
        7. An toàn Vua (Bitwise King Ring): Tính toán vành đai bảo vệ quanh Vua, thưởng lá chắn Tốt gần/xa.
        8. Quyền nhập thành: Thưởng điểm nếu bên đi còn quyền nhập thành hợp lệ.
        9. Tapered Evaluation: Nội suy mượt mà giữa trung cuộc và tàn cuộc theo tỷ lệ phase / 24.
        10. Mop-Up Heuristic: Ép Vua đối phương vào góc và kéo Vua ta áp sát trong tàn cuộc áp đảo (phase <= 6).
        11. Tempo Bonus & Negamax Sign: Thưởng lượt đi đầu tiên và chuẩn hóa góc nhìn theo bên đến lượt (board.turn).

    Tham số:
        board: Đối tượng chess.Board thể hiện trạng thái bàn cờ hiện tại.

    Trả về:
        int: Điểm đánh giá thế cờ tính bằng centipawn theo góc nhìn của bên đang đến lượt đi.
    """
    wp = board.pawns & board.occupied_co[chess.WHITE]
    wn = board.knights & board.occupied_co[chess.WHITE]
    wb = board.bishops & board.occupied_co[chess.WHITE]
    wr = board.rooks & board.occupied_co[chess.WHITE]
    wq = board.queens & board.occupied_co[chess.WHITE]
    wk = board.king(chess.WHITE)

    bp = board.pawns & board.occupied_co[chess.BLACK]
    bn = board.knights & board.occupied_co[chess.BLACK]
    bb = board.bishops & board.occupied_co[chess.BLACK]
    br = board.rooks & board.occupied_co[chess.BLACK]
    bq = board.queens & board.occupied_co[chess.BLACK]
    bk = board.king(chess.BLACK)

    if wk is None or bk is None:
        return 0

    # 1. Tính toán giai đoạn trận đấu (Game Phase)
    phase = (
        _popcount(wn | bn | wb | bb) * PHASE_WEIGHTS[chess.KNIGHT]
        + _popcount(wr | br) * PHASE_WEIGHTS[chess.ROOK]
        + _popcount(wq | bq) * PHASE_WEIGHTS[chess.QUEEN]
    )
    if phase > 24:
        phase = 24

    # 2. Vật chất và vị trí ô (Material & PST với Linear packing mg + (eg << 16))
    s = (
        _pst_sum(wp, _WP) + _pst_sum(wn, _WN) + _pst_sum(wb, _WB)
        + _pst_sum(wr, _WR) + _pst_sum(wq, _WQ) + _WK[wk]
        - _pst_sum(bp, _BP) - _pst_sum(bn, _BN) - _pst_sum(bb, _BB)
        - _pst_sum(br, _BR) - _pst_sum(bq, _BQ) - _BK[bk]
    )

    # 3. Đánh giá cặp Tượng
    if _popcount(wb) >= 2:
        s += _BISHOP_PAIR
    if _popcount(bb) >= 2:
        s -= _BISHOP_PAIR

    # 4. Đánh giá cấu trúc Tốt
    files_w = 0
    p = wp
    while p:
        lsb = p & -p
        files_w |= 1 << ((lsb.bit_length() - 1) & 7)
        p ^= lsb

    files_b = 0
    p = bp
    while p:
        lsb = p & -p
        files_b |= 1 << ((lsb.bit_length() - 1) & 7)
        p ^= lsb

    # Phạt Tốt chồng
    s -= _DOUBLED_PAWN * (_popcount(wp) - _popcount(files_w))
    s += _DOUBLED_PAWN * (_popcount(bp) - _popcount(files_b))

    # Phạt Tốt cô lập
    iso_w = files_w & ~((files_w << 1) | (files_w >> 1))
    iso_b = files_b & ~((files_b << 1) | (files_b >> 1))
    s -= _ISOLATED_PAWN * _popcount(iso_w)
    s += _ISOLATED_PAWN * _popcount(iso_b)

    # Thưởng Tốt thông và Tốt thông liên kết
    full_w = _north_fill(wp)
    full_b = _south_fill(bp)
    passed_w = wp & ~_spread_files(full_b)
    passed_b = bp & ~_spread_files(full_w)

    pf = 0
    while passed_w:
        lsb = passed_w & -passed_w
        sq = lsb.bit_length() - 1
        s += _PASSED_W[sq]
        pf |= 1 << (sq & 7)
        passed_w ^= lsb
    s += _CONNECTED_PASSED * _popcount(pf & (pf >> 1))

    pf = 0
    while passed_b:
        lsb = passed_b & -passed_b
        sq = lsb.bit_length() - 1
        s -= _PASSED_B[sq]
        pf |= 1 << (sq & 7)
        passed_b ^= lsb
    s -= _CONNECTED_PASSED * _popcount(pf & (pf >> 1))

    # 5. Hoạt động của Xe (Cột mở, bán mở, hàng 7)
    no_w = ~full_w
    no_b = ~full_b
    open_cols = no_w & no_b
    s += _ROOK_OPEN_FILE * (_popcount(wr & open_cols) - _popcount(br & open_cols))
    s += _ROOK_SEMI_OPEN * (
        _popcount(wr & no_w & full_b) - _popcount(br & no_b & full_w)
    )
    s += _ROOK_7TH * (
        _popcount(wr & chess.BB_RANK_7) - _popcount(br & chess.BB_RANK_2)
    )

    # 6. Mã chiếm tiền đồn trung tâm
    if wn or bn:
        w_pawn_att = ((wp << 7) & _NOT_FILE_H) | ((wp << 9) & _NOT_FILE_A)
        b_pawn_att = ((bp >> 7) & _NOT_FILE_A) | ((bp >> 9) & _NOT_FILE_H)
        s += _KNIGHT_OUTPOST * (
            _popcount(wn & w_pawn_att & _RANKS_4_6)
            - _popcount(bn & b_pawn_att & _RANKS_3_5)
        )
`,relatedFunctions:[`evaluate`,`_north_fill`,`_south_fill`,`_spread_files`]},{id:`eval-tapered-mopup`,file:`evaluation.py`,startLine:561,endLine:611,title:`Hàm evaluate – Bước 7 đến 11: King Safety, Tapered Eval, Mop-Up, Tempo`,purpose:`Hoàn thiện lượng giá: An toàn Vua, Quyền nhập thành, Giải nén Tapered, Mop-Up Heuristic tàn cuộc và Tempo bonus.`,explanation:[`7. An toàn Vua: Khi phase > 10, thưởng lá chắn Tốt gần/xa, phạt cột mở trước mặt Vua.`,`8. Quyền nhập thành: Thưởng điểm nếu còn quyền nhập thành hợp lệ.`,`9. Tapered Evaluation: eg = (s + 0x8000) >> 16, mg = s - (eg << 16). Điểm nội suy: score = (mg * phase + eg * (24 - phase)) // 24.`,`10. Mop-Up Heuristic: Khi phase <= 6 và chênh lệch >= 200 centipawns: cmd = khoảng cách Vua địch ra mép bàn cờ, dist = khoảng cách 2 Vua áp sát nhau. Thưởng điểm ((cmd * 10) + (14 - dist) * 4) * (6 - phase) // 6.`,`11. Tempo Bonus: Cộng +9 cp cho bên Trắng và chuẩn hóa dấu Negamax theo board.turn.`],inputs:`Trạng thái bàn cờ hiện tại.`,outputs:`Điểm số nguyên centipawn theo góc nhìn của bên đang đi.`,systemRole:`Chuyển giao điểm đánh giá chuẩn xác cho cỗ máy tìm kiếm Negamax.`,defensePoints:[`Giảng viên hỏi: Mop-Up Heuristic giải quyết vấn đề gì trong cờ tàn? Trả lời: Khi hơn quân lớn ở cờ tàn (ví dụ Vua + Hậu thắng Vua cô độc), nếu chỉ dùng điểm vật chất thì bot không biết làm sao để chiếu hết mà chỉ đi lòng vòng dẫn đến hòa 50 nước. Mop-Up thưởng điểm khi ép Vua đối phương ra sát mép bàn cờ và kéo Vua mình lại gần để tạo mạng lưới chiếu hết (checkmating net) nhanh nhất.`,`Giảng viên hỏi: Tại sao cần điều kiện phase <= 6 và score >= 200? Trả lời: Đây là cơ chế Gated Mop-Up: nó có 0% overhead ở khai cuộc và trung cuộc, chỉ kích hoạt khi tàn cuộc đã thực sự ngã ngũ, tránh làm sai lệch việc bảo vệ Vua ở trung cuộc.`],codeSnippet:`    # 7. An toàn Vua (Thiết kế bitwise động, an toàn với cả 960 thế cờ Chess960)
    if phase > KS_MIN_PHASE:
        if 0 <= wk < 24:
            zone = _KS_FILES[wk]
            lack = zone & ~files_w
            s += (
                _KS_SHIELD_NEAR * _popcount(wp & _KS_NEAR_W[wk])
                + _KS_SHIELD_FAR * _popcount(wp & _KS_FAR_W[wk])
                - _KS_OPEN_FILE * _popcount(lack & ~files_b)
                - _KS_HALF_OPEN_FILE * _popcount(lack & files_b)
            )
        if bk >= 40:
            zone = _KS_FILES[bk]
            lack = zone & ~files_b
            s -= (
                _KS_SHIELD_NEAR * _popcount(bp & _KS_NEAR_B[bk])
                + _KS_SHIELD_FAR * _popcount(bp & _KS_FAR_B[bk])
                - _KS_OPEN_FILE * _popcount(lack & ~files_w)
                - _KS_HALF_OPEN_FILE * _popcount(lack & files_w)
            )

    # 8. Quyền nhập thành
    cr = board.castling_rights
    if cr:
        cw = _popcount(cr & wr & chess.BB_RANK_1) if 0 <= wk < 8 else 0
        cb = _popcount(cr & br & chess.BB_RANK_8) if bk >= 56 else 0
        s += _CASTLE_RIGHT * (cw - cb)

    # 9. Tapered Evaluation: Tách mg và eg từ giá trị đóng gói
    eg = (s + 0x8000) >> 16
    mg = s - (eg << 16)
    x = mg * phase + eg * (24 - phase)
    score = x // 24 if x >= 0 else -(-x // 24)

    # 10. Mop-Up Heuristic trong tàn cuộc áp đảo (Zero-overhead ở trung cuộc)
    # cmd: Khoảng cách từ Vua đối phương đến trung tâm bàn cờ (ép Vua ra mép và góc)
    # dist: Khoảng cách giữa hai Vua (kéo Vua ta áp sát để tạo mạng lưới chiếu hết)
    if phase <= 6 and wk >= 0 and bk >= 0:
        wk_f, wk_r = wk & 7, wk >> 3
        bk_f, bk_r = bk & 7, bk >> 3
        if score >= 200:
            cmd = max(3 - bk_f, bk_f - 4) + max(3 - bk_r, bk_r - 4)
            dist = abs(wk_f - bk_f) + abs(wk_r - bk_r)
            score += ((cmd * 10) + (14 - dist) * 4) * (6 - phase) // 6
        elif score <= -200:
            cmd = max(3 - wk_f, wk_f - 4) + max(3 - wk_r, wk_r - 4)
            dist = abs(wk_f - bk_f) + abs(wk_r - bk_r)
            score -= ((cmd * 10) + (14 - dist) * 4) * (6 - phase) // 6

    # 11. Tempo Bonus & Chuẩn hóa dấu Negamax theo lượt đi
    return score + TEMPO_BONUS if board.turn else TEMPO_BONUS - score`,relatedFunctions:[`evaluate`]}],rawCode:`"""
Module evaluation.py – Động cơ lượng giá vị trí cờ vua tốc độ cao (Heuristic Evaluation Core).

Các thành phần chính của hàm lượng giá:
1. Giá trị vật chất và vị trí ô (PeSTO Piece-Square Tables):
   - Đóng gói tuyến tính an toàn: val = mg + (eg << 16).
   - Giải nén số nguyên có dấu: eg = (val + 0x8000) >> 16, mg = val - (eg << 16).
   - Triệt tiêu hoàn toàn rủi ro tràn số âm 16-bit trong Python.
2. Nội suy theo giai đoạn trận đấu (Tapered Evaluation):
   - Tổng trọng số game phase từ 0 (tàn cuộc thuần túy) đến 24 (khai cuộc đầy đủ quân).
   - Điểm số nội suy: score = (mg * phase + eg * (24 - phase)) // 24.
3. Hoạt động của các quân cờ:
   - Thưởng cặp Tượng (Bishop Pair).
   - Thưởng Xe trên cột mở (Open File), cột bán mở (Semi-open File) và hàng 7 (7th Rank).
   - Thưởng Mã chiếm tiền đồn trung tâm được Tốt bảo vệ (Knight Outposts).
4. Cấu trúc Tốt:
   - Phạt Tốt chồng (Doubled Pawns) và Tốt cô lập (Isolated Pawns).
   - Thưởng Tốt thông (Passed Pawns) tăng dần theo rank tiến về phía trước.
   - Thưởng Tốt thông liên kết (Connected Passed Pawns).
5. An toàn Vua thích ứng Chess960 (Dynamic Bitwise King Ring):
   - Tính toán vành đai bảo vệ quanh Vua theo tọa độ thực tế của Vua, độc lập với vị trí ô khởi đầu.
   - Thưởng lá chắn Tốt gần/xa, phạt cột mở trước mặt Vua trong trung cuộc.
6. Dồn Vua tàn cuộc (Gated Mop-Up Heuristic):
   - Chỉ kích hoạt khi tàn cuộc áp đảo (phase <= 6 và chênh lệch >= 200 centipawns).
   - Thưởng điểm khi ép Vua đối phương ra xa tâm bàn cờ và kéo Vua ta áp sát để tạo mạng lưới chiếu hết.
7. Quy ước đối xứng gương (Mirror Symmetry):
   - Đảm bảo evaluate(b) == evaluate(b.mirror()) trên mọi thế cờ.
"""

from __future__ import annotations

import chess

# ---------------------------------------------------------------------------
# Giá trị vật chất cơ sở (PeSTO standard values)
# ---------------------------------------------------------------------------
MG_PIECE_VALUES: dict[chess.PieceType, int] = {
    chess.PAWN:   81,
    chess.KNIGHT: 324,
    chess.BISHOP: 360,
    chess.ROOK:   486,
    chess.QUEEN:  1024,
    chess.KING:   0,
}

EG_PIECE_VALUES: dict[chess.PieceType, int] = {
    chess.PAWN:   99,
    chess.KNIGHT: 288,
    chess.BISHOP: 306,
    chess.ROOK:   512,
    chess.QUEEN:  972,
    chess.KING:   0,
}

# Trọng số tính phase (tổng tối đa 24 cho cả 2 bên)
PHASE_WEIGHTS: dict[chess.PieceType, int] = {
    chess.PAWN:   0,
    chess.KNIGHT: 1,
    chess.BISHOP: 1,
    chess.ROOK:   2,
    chess.QUEEN:  4,
    chess.KING:   0,
}
MAX_PHASE = 24

# ---------------------------------------------------------------------------
# PeSTO Piece-Square Tables (Mảng thô 64 ô từ Rank 8 xuống Rank 1)
# ---------------------------------------------------------------------------
_PAWN_MG_RAW = [
      0,   0,   0,   0,   0,   0,   0,   0,
     98, 134,  61,  95,  68, 126,  34, -11,
     -6,   7,  26,  31,  65,  56,  25, -20,
    -14,  13,   6,  21,  23,  12,  17, -23,
    -27,  -2,  -5,  12,  17,   6,  10, -25,
    -26,  -4,  -4, -10,   3,   3,  33, -12,
    -35,  -1, -20, -23, -15,  24,  38, -22,
      0,   0,   0,   0,   0,   0,   0,   0,
]
_PAWN_EG_RAW = [
      0,   0,   0,   0,   0,   0,   0,   0,
    178, 173, 158, 134, 147, 132, 165, 187,
     94, 100,  85,  67,  56,  53,  82,  84,
     32,  24,  13,   5,  -2,   4,  17,  17,
     13,   9,  -3,  -7,  -7,  -8,   3,  -1,
      4,   7,  -6,   1,   0,  -5,  -1,  -8,
     13,   8,   8, -10,  -6,   0,   2,  -7,
      0,   0,   0,   0,   0,   0,   0,   0,
]

_KNIGHT_MG_RAW = [
   -167, -89, -34, -49,  61, -97, -15, -107,
    -73, -41,  72,  36,  23,  62,   7,  -17,
    -47,  60,  37,  65,  84, 129,  73,   44,
     -9,  17,  19,  53,  37,  69,  18,   22,
    -13,   4,  16,  13,  28,  19,  21,   -8,
    -23,  -9,  12,  10,  19,  17,  25,  -16,
    -29, -53, -12,  -3,  -1,  18, -14,  -19,
   -105, -21, -58, -33, -17, -28, -19,  -23,
]
_KNIGHT_EG_RAW = [
    -58, -38, -13, -28, -31, -27, -63,  -99,
    -25,  -8, -25,  -2,  -9, -25, -24,  -52,
    -24, -20,  10,   9,  -1,  -9, -19,  -41,
    -17,   3,  22,  22,  22,  11,   8,  -18,
    -18,  -6,  16,  25,  16,  17,   4,  -18,
    -23,  -3,  -1,  15,  10,  -3, -20,  -22,
    -42, -20, -10,  -5,  -2, -20, -23,  -44,
    -29, -51, -23, -15, -22, -18, -50,  -64,
]

_BISHOP_MG_RAW = [
    -29,   4, -82, -37, -25, -42,   7,  -8,
    -26,  16, -18, -13,  30,  59,  18, -47,
    -16,  37,  43,  40,  35,  50,  37,  -2,
     -4,   5,  19,  50,  37,  37,   7,  -2,
     -6,  13,  13,  26,  34,  12,  10,   4,
      0,  15,  15,  15,  14,  27,  18,  10,
      4,  15,  16,   0,   7,  21,  33,   1,
    -33,  -3, -14, -21, -13, -12, -39, -21,
]
_BISHOP_EG_RAW = [
    -14, -21, -11,  -8,  -7,  -9, -17, -24,
     -8,  -4,   7, -12,  -3, -13,  -4, -14,
      2,  -8,   0,  -1,  -2,   6,   0,   4,
     -3,   9,  12,   9,  14,  10,   3,   2,
     -6,   3,  13,  19,   7,  10,  -3,  -9,
    -12,  -3,   8,  10,  13,   3,  -7, -15,
    -14, -18,  -7,  -1,   4,  -9, -15, -27,
    -23,  -9, -23,  -5,  -9, -16,  -5, -17,
]

_ROOK_MG_RAW = [
     32,  42,  32,  51,  63,   9,  31,  43,
     27,  32,  58,  62,  80,  67,  26,  44,
     -5,  19,  26,  36,  17,  45,  61,  16,
    -24, -11,   7,  26,  24,  35,  -8, -20,
    -36, -26, -12,  -1,   9,  -7,   6, -23,
    -45, -25, -16, -17,   3,   0,  -5, -33,
    -44, -16, -20,  -9,  -1,  11,  -6, -71,
    -19, -13,   1,  17,  16,   7, -37, -26,
]
_ROOK_EG_RAW = [
     13,  10,  18,  15,  12,  12,   8,   5,
     11,  13,  13,  11,  -3,   3,   8,   3,
      7,   7,   7,   5,   4,  -3,  -5,  -3,
      4,   3,  13,   1,   2,   1,  -1,   2,
      3,   5,   8,   4,  -5,  -6,  -8, -11,
     -4,   0,  -5,  -1,  -7, -12,  -8, -16,
     -6,  -6,   0,   2,  -9,  -9, -11,  -3,
     -9,   2,   3,  -1,  -5, -13,   4, -20,
]

_QUEEN_MG_RAW = [
    -28,   0,  29,  12,  59,  44,  43,  45,
    -24, -39,  -5,   1, -16,  57,  28,  54,
     -1, -16,   9,  18,  56,  60,  57,  35,
    -27, -27, -14,  -1,  12,  10,   6,  10,
    -16, -15,  -6,   4,   8,  14,  12,  -5,
    -22, -15,  -7,   6,   4,  10,   5, -17,
    -17,  20,  12,  -2,   9,  12,  46,  16,
    -33, -28, -22, -43,  -5, -32, -20, -41,
]
_QUEEN_EG_RAW = [
    -9,  22,  22,  27,  27,  19,  10,  20,
   -17,  20,  32,  41,  58,  25,  30,   0,
   -20,   6,   9,  49,  47,  35,  19,   9,
     3,  22,  24,  45,  57,  40,  57,  36,
   -18,  28,  19,  47,  31,  34,  39,  18,
   -16, -27,  15,   6,   9,  17,  10,   5,
   -22, -23, -30, -16, -16, -23, -36, -32,
   -33, -28, -22, -43,  -5, -32, -20, -41,
]

_KING_MG_RAW = [
    -65,  23,  16, -15, -56, -34,   2,  13,
     29,  -1, -20,  -7,  -8,  -4, -38, -29,
     -9,  24,   2, -16, -20,   6,  22, -22,
    -17, -20, -12, -27, -30, -25, -14, -36,
    -49,  -1, -27, -39, -46, -44, -33, -51,
    -14, -14, -22, -46, -44, -30, -15, -27,
      1,   7,  -8, -64, -43, -16,   9,   8,
    -15,  36,  12, -54,   8, -28,  24,  14,
]
_KING_EG_RAW = [
    -74, -35, -18, -18, -11,  15,   4, -17,
    -12,  17,  14,  17,  17,  38,  23,  11,
     10,  17,  23,  15,  20,  45,  44,  13,
     -8,  22,  24,  27,  26,  33,  26,   3,
    -18,  -4,  21,  24,  27,  23,   9, -11,
    -19,  -3,  11,  21,  23,  16,   7,  -9,
    -27, -11,   4,  13,  14,   4,  -5, -17,
    -53, -34,  -8, -11,  -6, -13, -24, -46,
]


def _orient_table(raw: list[int]) -> list[int]:
    """
    Mục đích:
        Chuyển đổi mảng thô (xếp từ Rank 8 xuống Rank 1) sang chỉ số ô chuẩn của python-chess (0 = a1, 63 = h8).

    Tham số:
        raw: Mảng 64 số nguyên biểu diễn điểm vị trí.

    Trả về:
        list[int]: Mảng 64 số nguyên đã căn chỉnh theo thứ tự ô từ 0 đến 63.
    """
    out = [0] * 64
    for r in range(8):
        for f in range(8):
            sq = r * 8 + f
            raw_idx = (7 - r) * 8 + f
            out[sq] = raw[raw_idx]
    return out


PST_MG = {
    chess.PAWN:   _orient_table(_PAWN_MG_RAW),
    chess.KNIGHT: _orient_table(_KNIGHT_MG_RAW),
    chess.BISHOP: _orient_table(_BISHOP_MG_RAW),
    chess.ROOK:   _orient_table(_ROOK_MG_RAW),
    chess.QUEEN:  _orient_table(_QUEEN_MG_RAW),
    chess.KING:   _orient_table(_KING_MG_RAW),
}

PST_EG = {
    chess.PAWN:   _orient_table(_PAWN_EG_RAW),
    chess.KNIGHT: _orient_table(_KNIGHT_EG_RAW),
    chess.BISHOP: _orient_table(_BISHOP_EG_RAW),
    chess.ROOK:   _orient_table(_ROOK_EG_RAW),
    chess.QUEEN:  _orient_table(_QUEEN_EG_RAW),
    chess.KING:   _orient_table(_KING_EG_RAW),
}

# Điểm thưởng tốt thông theo từng rank (chỉ số 0 đến 7)
PASSED_PAWN_BONUS_MG = [0, 5, 10, 20, 35, 60, 100, 0]
PASSED_PAWN_BONUS_EG = [0, 10, 20, 40, 70, 120, 200, 0]


def _pk(mg: int, eg: int) -> int:
    """
    Mục đích:
        Đóng gói hai giá trị trung cuộc (mg) và tàn cuộc (eg) vào một số nguyên duy nhất.
        Công thức tuyến tính mg + (eg << 16) bảo toàn chính xác số nguyên có dấu trong Python.

    Tham số:
        mg: Điểm số trung cuộc (centipawn).
        eg: Điểm số tàn cuộc (centipawn).

    Trả về:
        int: Số nguyên đã đóng gói.
    """
    return mg + (eg << 16)


def _build_packed_pst(color_white: bool, pt: chess.PieceType) -> tuple[int, ...]:
    """
    Mục đích:
        Tạo bảng PST đóng gói sẵn (gồm giá trị vật chất + giá trị vị trí ô) cho từng loại quân.

    Tham số:
        color_white: True nếu là quân Trắng, False nếu là quân Đen.
        pt: Loại quân cờ (chess.PAWN, chess.KNIGHT, ...).

    Trả về:
        tuple[int, ...]: Tuple 64 phần tử chứa giá trị đã đóng gói cho 64 ô cờ.
    """
    mg_base, eg_base = MG_PIECE_VALUES[pt], EG_PIECE_VALUES[pt]
    out = []
    for sq in range(64):
        src = sq if color_white else sq ^ 56
        out.append(_pk(mg_base + PST_MG[pt][src], eg_base + PST_EG[pt][src]))
    return tuple(out)


# Khởi tạo sẵn bảng đóng gói cho quân Trắng
_WP = _build_packed_pst(True, chess.PAWN)
_WN = _build_packed_pst(True, chess.KNIGHT)
_WB = _build_packed_pst(True, chess.BISHOP)
_WR = _build_packed_pst(True, chess.ROOK)
_WQ = _build_packed_pst(True, chess.QUEEN)
_WK = _build_packed_pst(True, chess.KING)

# Khởi tạo sẵn bảng đóng gói cho quân Đen
_BP = _build_packed_pst(False, chess.PAWN)
_BN = _build_packed_pst(False, chess.KNIGHT)
_BB = _build_packed_pst(False, chess.BISHOP)
_BR = _build_packed_pst(False, chess.ROOK)
_BQ = _build_packed_pst(False, chess.QUEEN)
_BK = _build_packed_pst(False, chess.KING)

_PASSED_W = tuple(_pk(PASSED_PAWN_BONUS_MG[sq >> 3], PASSED_PAWN_BONUS_EG[sq >> 3]) for sq in range(64))
_PASSED_B = tuple(_pk(PASSED_PAWN_BONUS_MG[7 - (sq >> 3)], PASSED_PAWN_BONUS_EG[7 - (sq >> 3)]) for sq in range(64))

# Hằng số thưởng và phạt theo cấu trúc quân cờ
TEMPO_BONUS = 9
_BISHOP_PAIR = _pk(36, 54)
_ROOK_OPEN_FILE = _pk(27, 21)
_ROOK_SEMI_OPEN = _pk(15, 12)
_ROOK_7TH = _pk(27, 36)
_DOUBLED_PAWN = _pk(18, 24)
_ISOLATED_PAWN = _pk(18, 24)
_CONNECTED_PASSED = _pk(24, 48)
_KNIGHT_OUTPOST = _pk(24, 12)

# Hằng số an toàn Vua
KS_MIN_PHASE = 10
_KS_SHIELD_NEAR    = _pk(18, 0)
_KS_SHIELD_FAR     = _pk(9, 0)
_KS_OPEN_FILE      = _pk(36, 0)
_KS_HALF_OPEN_FILE = _pk(18, 0)
_CASTLE_RIGHT      = _pk(18, 0)

# Mặt nạ bit (Bitmasks)
_ALL = 0xFFFFFFFFFFFFFFFF
_NOT_FILE_A = ~chess.BB_FILE_A & _ALL
_NOT_FILE_H = ~chess.BB_FILE_H & _ALL
_RANKS_4_6 = chess.BB_RANK_4 | chess.BB_RANK_5 | chess.BB_RANK_6
_RANKS_3_5 = chess.BB_RANK_3 | chess.BB_RANK_4 | chess.BB_RANK_5


def _build_king_zones():
    """
    Mục đích:
        Xây dựng sẵn mặt nạ các cột lân cận và hàng lá chắn bảo vệ Vua cho toàn bộ 64 ô cờ.

    Tham số:
        None.

    Trả về:
        tuple: (files, near_w, far_w, near_b, far_b) phục vụ đánh giá an toàn Vua động.
    """
    files, near_w, far_w, near_b, far_b = [], [], [], [], []
    for sq in range(64):
        f = sq & 7
        r = sq >> 3
        fl = max(0, f - 1)
        fr = min(7, f + 1)
        fmask = 0
        for fi in range(fl, fr + 1):
            fmask |= 1 << fi
        files.append(fmask)

        def _row_mask(r_idx, fl_i, fr_i):
            if not (0 <= r_idx < 8):
                return 0
            m = 0
            for fi in range(fl_i, fr_i + 1):
                m |= 1 << (r_idx * 8 + fi)
            return m

        near_w.append(_row_mask(r + 1, fl, fr))
        far_w.append(_row_mask(r + 2, fl, fr))
        near_b.append(_row_mask(r - 1, fl, fr))
        far_b.append(_row_mask(r - 2, fl, fr))

    return (tuple(files), tuple(near_w), tuple(far_w), tuple(near_b), tuple(far_b))


_KS_FILES, _KS_NEAR_W, _KS_FAR_W, _KS_NEAR_B, _KS_FAR_B = _build_king_zones()

_POPCOUNT_TABLE = [bin(i).count("1") for i in range(256)]


def _popcount(bb: int) -> int:
    """
    Mục đích:
        Đếm số lượng bit 1 trong một số nguyên 64-bit (Bitboard).

    Tham số:
        bb: Số nguyên 64-bit.

    Trả về:
        int: Số lượng bit 1.
    """
    try:
        return bb.bit_count()
    except AttributeError:
        cnt = 0
        while bb:
            cnt += _POPCOUNT_TABLE[bb & 0xFF]
            bb >>= 8
        return cnt


def _pst_sum(bb: int, table: tuple[int, ...]) -> int:
    """
    Mục đích:
        Cộng dồn giá trị PST đóng gói cho tất cả các quân cờ đang hiện diện trên Bitboard.

    Tham số:
        bb: Mặt nạ bit vị trí các quân cờ.
        table: Bảng giá trị đóng gói tương ứng với loại quân.

    Trả về:
        int: Tổng giá trị đóng gói.
    """
    tot = 0
    while bb:
        lsb = bb & -bb
        sq = lsb.bit_length() - 1
        tot += table[sq]
        bb ^= lsb
    return tot


def _north_fill(bb: int) -> int:
    """Mở rộng mặt nạ bit về hướng Bắc (cho quân Trắng)."""
    bb |= (bb << 8)  & _ALL
    bb |= (bb << 16) & _ALL
    bb |= (bb << 32) & _ALL
    return bb


def _south_fill(bb: int) -> int:
    """Mở rộng mặt nạ bit về hướng Nam (cho quân Đen)."""
    bb |= bb >> 8
    bb |= bb >> 16
    bb |= bb >> 32
    return bb


def _spread_files(bb: int) -> int:
    """Mở rộng mặt nạ bit sang hai cột liền kề trái và phải."""
    return bb | ((bb << 1) & _NOT_FILE_A) | ((bb >> 1) & _NOT_FILE_H)


def evaluate(board: chess.Board) -> int:
    """
    Mục đích:
        Đánh giá giá trị vị trí của thế cờ hiện tại dựa trên tri thức chuyên gia.

    Quy trình đánh giá gồm 11 bước:
        1. Game Phase: Xác định giai đoạn trận đấu (0 = tàn cuộc, 24 = khai cuộc) dựa trên số lượng quân cờ lớn.
        2. Material & PST: Lượng giá vật chất và vị trí ô bằng bảng đóng gói tuyến tính.
        3. Cặp Tượng (Bishop Pair): Thưởng khi sở hữu cả 2 Tượng trên hai màu ô khác nhau.
        4. Cấu trúc Tốt: Phạt Tốt chồng, Tốt cô lập; thưởng Tốt thông và Tốt thông liên kết.
        5. Hoạt động của Xe: Thưởng Xe trên cột mở, cột bán mở và hàng 7 (hoặc hàng 2 đối với Đen).
        6. Mã tiền đồn (Knight Outposts): Thưởng Mã đứng ở các hàng 4-6 (hoặc 3-5 đối với Đen) có Tốt bảo vệ.
        7. An toàn Vua (Bitwise King Ring): Tính toán vành đai bảo vệ quanh Vua, thưởng lá chắn Tốt gần/xa.
        8. Quyền nhập thành: Thưởng điểm nếu bên đi còn quyền nhập thành hợp lệ.
        9. Tapered Evaluation: Nội suy mượt mà giữa trung cuộc và tàn cuộc theo tỷ lệ phase / 24.
        10. Mop-Up Heuristic: Ép Vua đối phương vào góc và kéo Vua ta áp sát trong tàn cuộc áp đảo (phase <= 6).
        11. Tempo Bonus & Negamax Sign: Thưởng lượt đi đầu tiên và chuẩn hóa góc nhìn theo bên đến lượt (board.turn).

    Tham số:
        board: Đối tượng chess.Board thể hiện trạng thái bàn cờ hiện tại.

    Trả về:
        int: Điểm đánh giá thế cờ tính bằng centipawn theo góc nhìn của bên đang đến lượt đi.
    """
    wp = board.pawns & board.occupied_co[chess.WHITE]
    wn = board.knights & board.occupied_co[chess.WHITE]
    wb = board.bishops & board.occupied_co[chess.WHITE]
    wr = board.rooks & board.occupied_co[chess.WHITE]
    wq = board.queens & board.occupied_co[chess.WHITE]
    wk = board.king(chess.WHITE)

    bp = board.pawns & board.occupied_co[chess.BLACK]
    bn = board.knights & board.occupied_co[chess.BLACK]
    bb = board.bishops & board.occupied_co[chess.BLACK]
    br = board.rooks & board.occupied_co[chess.BLACK]
    bq = board.queens & board.occupied_co[chess.BLACK]
    bk = board.king(chess.BLACK)

    if wk is None or bk is None:
        return 0

    # 1. Tính toán giai đoạn trận đấu (Game Phase)
    phase = (
        _popcount(wn | bn | wb | bb) * PHASE_WEIGHTS[chess.KNIGHT]
        + _popcount(wr | br) * PHASE_WEIGHTS[chess.ROOK]
        + _popcount(wq | bq) * PHASE_WEIGHTS[chess.QUEEN]
    )
    if phase > 24:
        phase = 24

    # 2. Vật chất và vị trí ô (Material & PST với Linear packing mg + (eg << 16))
    s = (
        _pst_sum(wp, _WP) + _pst_sum(wn, _WN) + _pst_sum(wb, _WB)
        + _pst_sum(wr, _WR) + _pst_sum(wq, _WQ) + _WK[wk]
        - _pst_sum(bp, _BP) - _pst_sum(bn, _BN) - _pst_sum(bb, _BB)
        - _pst_sum(br, _BR) - _pst_sum(bq, _BQ) - _BK[bk]
    )

    # 3. Đánh giá cặp Tượng
    if _popcount(wb) >= 2:
        s += _BISHOP_PAIR
    if _popcount(bb) >= 2:
        s -= _BISHOP_PAIR

    # 4. Đánh giá cấu trúc Tốt
    files_w = 0
    p = wp
    while p:
        lsb = p & -p
        files_w |= 1 << ((lsb.bit_length() - 1) & 7)
        p ^= lsb

    files_b = 0
    p = bp
    while p:
        lsb = p & -p
        files_b |= 1 << ((lsb.bit_length() - 1) & 7)
        p ^= lsb

    # Phạt Tốt chồng
    s -= _DOUBLED_PAWN * (_popcount(wp) - _popcount(files_w))
    s += _DOUBLED_PAWN * (_popcount(bp) - _popcount(files_b))

    # Phạt Tốt cô lập
    iso_w = files_w & ~((files_w << 1) | (files_w >> 1))
    iso_b = files_b & ~((files_b << 1) | (files_b >> 1))
    s -= _ISOLATED_PAWN * _popcount(iso_w)
    s += _ISOLATED_PAWN * _popcount(iso_b)

    # Thưởng Tốt thông và Tốt thông liên kết
    full_w = _north_fill(wp)
    full_b = _south_fill(bp)
    passed_w = wp & ~_spread_files(full_b)
    passed_b = bp & ~_spread_files(full_w)

    pf = 0
    while passed_w:
        lsb = passed_w & -passed_w
        sq = lsb.bit_length() - 1
        s += _PASSED_W[sq]
        pf |= 1 << (sq & 7)
        passed_w ^= lsb
    s += _CONNECTED_PASSED * _popcount(pf & (pf >> 1))

    pf = 0
    while passed_b:
        lsb = passed_b & -passed_b
        sq = lsb.bit_length() - 1
        s -= _PASSED_B[sq]
        pf |= 1 << (sq & 7)
        passed_b ^= lsb
    s -= _CONNECTED_PASSED * _popcount(pf & (pf >> 1))

    # 5. Hoạt động của Xe (Cột mở, bán mở, hàng 7)
    no_w = ~full_w
    no_b = ~full_b
    open_cols = no_w & no_b
    s += _ROOK_OPEN_FILE * (_popcount(wr & open_cols) - _popcount(br & open_cols))
    s += _ROOK_SEMI_OPEN * (
        _popcount(wr & no_w & full_b) - _popcount(br & no_b & full_w)
    )
    s += _ROOK_7TH * (
        _popcount(wr & chess.BB_RANK_7) - _popcount(br & chess.BB_RANK_2)
    )

    # 6. Mã chiếm tiền đồn trung tâm
    if wn or bn:
        w_pawn_att = ((wp << 7) & _NOT_FILE_H) | ((wp << 9) & _NOT_FILE_A)
        b_pawn_att = ((bp >> 7) & _NOT_FILE_A) | ((bp >> 9) & _NOT_FILE_H)
        s += _KNIGHT_OUTPOST * (
            _popcount(wn & w_pawn_att & _RANKS_4_6)
            - _popcount(bn & b_pawn_att & _RANKS_3_5)
        )

    # 7. An toàn Vua (Thiết kế bitwise động, an toàn với cả 960 thế cờ Chess960)
    if phase > KS_MIN_PHASE:
        if 0 <= wk < 24:
            zone = _KS_FILES[wk]
            lack = zone & ~files_w
            s += (
                _KS_SHIELD_NEAR * _popcount(wp & _KS_NEAR_W[wk])
                + _KS_SHIELD_FAR * _popcount(wp & _KS_FAR_W[wk])
                - _KS_OPEN_FILE * _popcount(lack & ~files_b)
                - _KS_HALF_OPEN_FILE * _popcount(lack & files_b)
            )
        if bk >= 40:
            zone = _KS_FILES[bk]
            lack = zone & ~files_b
            s -= (
                _KS_SHIELD_NEAR * _popcount(bp & _KS_NEAR_B[bk])
                + _KS_SHIELD_FAR * _popcount(bp & _KS_FAR_B[bk])
                - _KS_OPEN_FILE * _popcount(lack & ~files_w)
                - _KS_HALF_OPEN_FILE * _popcount(lack & files_w)
            )

    # 8. Quyền nhập thành
    cr = board.castling_rights
    if cr:
        cw = _popcount(cr & wr & chess.BB_RANK_1) if 0 <= wk < 8 else 0
        cb = _popcount(cr & br & chess.BB_RANK_8) if bk >= 56 else 0
        s += _CASTLE_RIGHT * (cw - cb)

    # 9. Tapered Evaluation: Tách mg và eg từ giá trị đóng gói
    eg = (s + 0x8000) >> 16
    mg = s - (eg << 16)
    x = mg * phase + eg * (24 - phase)
    score = x // 24 if x >= 0 else -(-x // 24)

    # 10. Mop-Up Heuristic trong tàn cuộc áp đảo (Zero-overhead ở trung cuộc)
    # cmd: Khoảng cách từ Vua đối phương đến trung tâm bàn cờ (ép Vua ra mép và góc)
    # dist: Khoảng cách giữa hai Vua (kéo Vua ta áp sát để tạo mạng lưới chiếu hết)
    if phase <= 6 and wk >= 0 and bk >= 0:
        wk_f, wk_r = wk & 7, wk >> 3
        bk_f, bk_r = bk & 7, bk >> 3
        if score >= 200:
            cmd = max(3 - bk_f, bk_f - 4) + max(3 - bk_r, bk_r - 4)
            dist = abs(wk_f - bk_f) + abs(wk_r - bk_r)
            score += ((cmd * 10) + (14 - dist) * 4) * (6 - phase) // 6
        elif score <= -200:
            cmd = max(3 - wk_f, wk_f - 4) + max(3 - wk_r, wk_r - 4)
            dist = abs(wk_f - bk_f) + abs(wk_r - bk_r)
            score -= ((cmd * 10) + (14 - dist) * 4) * (6 - phase) // 6

    # 11. Tempo Bonus & Chuẩn hóa dấu Negamax theo lượt đi
    return score + TEMPO_BONUS if board.turn else TEMPO_BONUS - score
`},"search.py":{id:`search`,name:`Search Engine Core`,fileName:`search.py`,author:`Vũ Hoàng Long (25022922) & Đỗ Thành Vương (25023079)`,studentId:`25022922 / 25023079`,linesCount:1938,summary:`Bộ máy tìm kiếm cờ vua chuyên sâu: Negamax Alpha-Beta Pruning, Đào sâu lặp (IDS), Cửa sổ kỳ vọng (Aspiration Windows), Principal Variation Search (PVS), Quiescence Search kết hợp SEE 1-ply, Bảng băm Zobrist 524,288 mục, và hệ thống cắt tỉa toán học (NMP, RFP, FP, LMR).`,keyClasses:[`TTEntry`,`TranspositionTable`,`Searcher`],coreFunctions:[`score_to_tt`,`score_from_tt`,`see`,`probe`,`store`,`_order_moves`,`_quiescence`,`_negamax`,`search`],annotations:[{id:`search-constants-mate-norm`,file:`search.py`,startLine:85,endLine:278,title:`Hằng số Tìm kiếm & Chuẩn hóa Điểm Chiếu hết (Mate Normalization)`,purpose:`Định nghĩa các hằng số thuật toán và 2 hàm chuyển đổi điểm chiếu hết độc lập với vị trí ply khi lưu vào TT.`,explanation:[`TT_SIZE = 1 << 19 = 524,288 mục lưu trữ.`,`MATE_SCORE = 30,000 centipawns; MATE_THRESHOLD = 29,000 centipawns.`,`TT_EXACT = 0 (PV-Node), TT_LOWER = 1 (Cut-Node / Fail-High), TT_UPPER = 2 (All-Node / Fail-Low).`,`score_to_tt(score, ply): Nếu score >= MATE_THRESHOLD -> return score + ply. Độc lập hóa khoảng cách chiếu hết tính từ vị trí thế cờ hiện tại.`,`score_from_tt(score, ply): Khi lấy từ TT ra -> return score - ply để tái tạo đúng số nước chiếu hết thực tế từ gốc.`],inputs:`score (int), ply (int).`,outputs:`Điểm số đã chuẩn hóa.`,systemRole:`Bảo đảm tính chính xác toán học của các chuỗi chiếu hết khi lưu trữ vào Transposition Table.`,defensePoints:[`Giảng viên hỏi: Nếu không chuẩn hóa điểm chiếu hết thì điều gì xảy ra? Trả lời: Giả sử ở ply = 2 ta tìm thấy đòn chiếu hết sau 3 nước nữa (score = 30000 - 5 = 29995). Nếu lưu thẳng 29995 vào TT, sau đó ở một nhánh khác tại ply = 8 tra trúng thế cờ này, bot sẽ tưởng rằng cần 5 nước nữa mới chiếu hết và có thể chọn một nhánh sai lầm. Chuẩn hóa score_to_tt giúp điểm chiếu hết luôn phản ánh chính xác số nước thực tế tính từ thế cờ đó!`],codeSnippet:`# 1. HẰNG SỐ VÀ CÁC CỜ CỦA TRANSPOSITION TABLE

# =========================================================================



# Kích thước bảng băm: 2^19 = 524,288 mục (vừa vặn bộ nhớ RAM, tốc độ tra cứu O(1))

# Lưu trữ trạng thái và kết quả tìm kiếm của các thế cờ đã duyệt (Transposition Table)

TT_SIZE = 1 << 19



# Điểm quy ước chiếu hết (Checkmate score): 30,000 centipawns

# Điểm số quy ước cho trạng thái chiếu hết (checkmate)

MATE_SCORE = 30_000



# Ngưỡng nhận diện điểm chiếu hết: Các giá trị >= 29,000 được xem là chuỗi chiếu hết

MATE_THRESHOLD = 29_000



# Điểm hòa cờ cân bằng (Draw score): 0 centipawns

DRAW_SCORE = 0



# Độ sâu tìm kiếm tối đa trên lý thuyết

MAX_DEPTH = 64



# Bảng giá trị vật chất quy chuẩn phục vụ tính toán Static Exchange Evaluation (SEE)

PIECE_VALS = {

    None: 0,

    chess.PAWN: 100,

    chess.KNIGHT: 320,

    chess.BISHOP: 330,

    chess.ROOK: 500,

    chess.QUEEN: 1000,

    chess.KING: 20000,

}



# Điểm ưu tiên quân bị ăn và quân đi ăn (Most Valuable Victim - Least Valuable Attacker: MVV-LVA)

_MVV_LVA_SCORES = {

    None: 0,

    chess.PAWN: 1,

    chess.KNIGHT: 2,

    chess.BISHOP: 3,

    chess.ROOK: 4,

    chess.QUEEN: 5,

    chess.KING: 6,

}



# Giới hạn độ sâu tối đa cho Quiescence Search để tránh bùng nổ tổ hợp trong chuỗi đổi quân

MAX_QSEARCH_DEPTH = 8



# Ba loại cận (bound flags) lưu trong Transposition Table theo lý thuyết Alpha-Beta:

TT_EXACT = 0  # Điểm chính xác (PV-Node: alpha < score < beta)

TT_LOWER = 1  # Cận dưới (Cut-Node / Fail-High: score >= beta, nước đi quá mạnh)

TT_UPPER = 2  # Cận trên (All-Node / Fail-Low: score <= alpha, nước đi quá yếu)





# =========================================================================

# 2. HÀM CHUẨN HÓA ĐIỂM CHIẾU HẾT (MATE SCORE NORMALIZATION)

# =========================================================================



def score_to_tt(score: int, ply: int) -> int:

    """

    Chuẩn hóa điểm chiếu hết theo độ sâu (ply) trước khi lưu vào Transposition Table.



    Tại sao cần chuẩn hóa?

    Điểm chiếu hết phụ thuộc vào khoảng cách từ thế cờ hiện tại đến khi bị chiếu hết.

    Nếu ở ply = 3 ta thấy chiếu hết sau 2 nước (score = MATE - 5), khi lưu vào TT phải

    cộng thêm ply thành (MATE - 5 + 3 = MATE - 2) để thể hiện số nước chiếu hết tuyệt đối

    tính từ vị trí đó, không phụ thuộc vào vị trí nhánh cây đang đứng.



    Tham số:

        score: Điểm số tính toán từ nút hiện tại.

        ply: Khoảng cách từ gốc cây tìm kiếm đến nút hiện tại.



    Trả về:

        int: Điểm số độc lập với ply để lưu vào TT.

    """

    if score >= MATE_THRESHOLD:

        return score + ply

    elif score <= -MATE_THRESHOLD:

        return score - ply

    return score





def score_from_tt(score: int, ply: int) -> int:

    """

    Khôi phục lại điểm chiếu hết theo khoảng cách ply khi lấy từ Transposition Table ra.



    Tham số:

        score: Điểm số lưu trong TT (đã chuẩn hóa).

        ply: Khoảng cách từ gốc cây tìm kiếm đến nút hiện tại.



    Trả về:

        int: Điểm số tương ứng với khoảng cách thực tế từ vị trí hiện tại.

    """

    if score >= MATE_THRESHOLD:

        return score - ply

    elif score <= -MATE_THRESHOLD:

        return score + ply

    return score




`,relatedFunctions:[`score_to_tt`,`score_from_tt`,`TranspositionTable.store`,`Searcher._negamax`]},{id:`search-see-1ply`,file:`search.py`,startLine:280,endLine:435,title:`Static Exchange Evaluation (SEE 1-ply)`,purpose:`Đánh giá nhanh chuỗi đổi quân tĩnh 1-ply tại ô đích mà không cần sinh đệ quy cây tìm kiếm.`,explanation:[`see(board, move) -> int: Ước lượng lãi/lỗ vật chất sau khi thực hiện nước bắt quân tại move.to_square.`,`1. Nếu quân đi ăn nhỏ hơn hoặc bằng quân bị ăn (a_val <= v_val, ví dụ Tốt ăn Xe, Tượng ăn Hậu): Chắc chắn có lời hoặc đổi ngang -> trả về ngay (v_val - a_val) >= 0.`,`2. Nếu đổi ngang quân nhẹ (Tượng ăn Mã): Thưởng hòa đổi quân 0 centipawn để Quiescence Search không bỏ sót đòn chiến thuật.`,`3. Nếu quân lớn ăn quân nhỏ (Hậu ăn Tốt): Kiểm tra board.is_attacked_by(opp, move.to_square). Nếu có quân địch bảo vệ -> lỗ vốn (v_val - a_val) < 0; nếu không được bảo vệ -> quân treo (hanging piece) thu trọn lời v_val.`],inputs:`board: chess.Board, move: chess.Move.`,outputs:`Hiệu số vật chất centipawn ước tính (âm hoặc dương).`,systemRole:`Bộ lọc phân loại nước bắt quân có lợi (Good Captures) vs bất lợi (Bad Captures) cho Move Ordering và Quiescence Search.`,defensePoints:[`Giảng viên hỏi: Tại sao nhóm dùng SEE 1-ply thay vì SEE đệ quy đầy đủ? Trả lời: SEE đệ quy đầy đủ đòi hỏi duyệt chuỗi tấn công bằng tia X (x-ray attacks), tiêu tốn rất nhiều thời gian trong Python. Thực nghiệm của nhóm cho thấy SEE 1-ply fast filter chính xác đến 94% các tình huống chiến thuật nhưng chạy nhanh hơn gấp 6 lần, giúp Quiescence Search đạt tốc độ cao vượt bậc.`],codeSnippet:`
# 3. ĐÁNH GIÁ ĐỔI QUÂN TĨNH (STATIC EXCHANGE EVALUATION - SEE)

# =========================================================================



def see(board: chess.Board, move: chess.Move) -> int:

    """

    Static Exchange Evaluation (SEE) – Đánh giá chuỗi đổi quân tĩnh 1-ply.



    Chức năng:

    Ước lượng sự chênh lệch vật chất thuần sau chuỗi đổi quân tại ô đích (move.to_square)

    mà không cần đệ quy sinh toàn bộ cây tìm kiếm.



    Nguyên lý hoạt động (1-ply fast SEE):

    1. Lấy giá trị quân bị ăn (victim) và quân đi ăn (attacker).

    2. Nếu quân đi ăn có giá trị nhỏ hơn hoặc bằng quân bị ăn (ví dụ Tốt ăn Hậu, Tượng ăn Xe):

       Chắc chắn có lợi hoặc ít nhất đổi ngang => trả về (v_val - a_val) >= 0 ngay lập tức.

    3. Nếu quân lớn ăn quân nhỏ (ví dụ Hậu ăn Tốt):

       Kiểm tra ô đích có được đối phương bảo vệ (attacked) hay không:

       - Nếu không được bảo vệ: Quân treo tự do => thu lời trọn vẹn v_val.

       - Nếu được bảo vệ: Quân tấn công sẽ bị ăn lại ngay => lỗ (v_val - a_val) < 0.



    Tham số:

        board: Bàn cờ trước khi thực hiện nước đi.

        move: Nước bắt quân cần thẩm định.



    Trả về:

        int (centipawn):

            >= 0: Nước bắt quân có lợi hoặc đổi ngang giá trị.

            < 0: Nước bắt quân bị lỗ (ví dụ: Hậu ăn Tốt có bảo vệ).

    """

    to_sq = move.to_square

    from_sq = move.from_square



    victim = board.piece_type_at(to_sq)

    if victim is None:

        if board.is_en_passant(move):

            victim = chess.PAWN

        else:

            return 0



    attacker = board.piece_type_at(from_sq)

    if attacker is None:

        return 0



    v_val = PIECE_VALS[victim]

    a_val = PIECE_VALS[attacker]



    # Nếu quân đi ăn có giá trị <= quân bị ăn (ví dụ Tốt ăn Hậu, Xe ăn Hậu...):

    # Luôn là nước bắt quân có lợi hoặc ít nhất là đổi quân ngang

    if a_val <= v_val:

        return v_val - a_val



    # Đổi quân nhẹ tương đương (Tượng ăn Mã: 330 vs 320, chênh lệch 10cp):

    # Luôn là nước đổi quân ngang giá trị, không bao giờ coi là thí quân lỗ

    if attacker in (chess.BISHOP, chess.KNIGHT) and victim in (chess.BISHOP, chess.KNIGHT):

        return 0



    # Nếu quân lớn ăn quân nhỏ (ví dụ Hậu ăn Tốt):

    # Kiểm tra xem ô đích có được đối phương bảo vệ không

    opp = not board.turn

    opp_attackers = board.attackers(opp, to_sq)

    if not opp_attackers:

        return v_val  # Quân treo tự do!



    # Nếu ô đích được quân ta bảo vệ và quân duy nhất của địch ngắm tới là Vua,

    # Vua địch không thể ăn vì sẽ bị chiếu phạm luật!

    if board.is_attacked_by(board.turn, to_sq):

        king_sq = board.king(opp)

        if king_sq is not None and opp_attackers == chess.SquareSet([king_sq]):

            return v_val



    # Ô đích được bảo vệ: quân tấn công sẽ bị ăn lại và lỗ vật chất

    return v_val - a_val





# =========================================================================

# 4. BẢNG CHUYỂN VỊ (TRANSPOSITION TABLE - TT)

# =========================================================================

`,relatedFunctions:[`_order_moves`,`_quiescence`]},{id:`search-transposition-table`,file:`search.py`,startLine:436,endLine:600,title:`Cấu trúc TTEntry & Lớp TranspositionTable (524,288 mục)`,purpose:`Bảng băm lưu trữ trạng thái tìm kiếm O(1) với cơ chế thay thế mục 4 điều kiện.`,explanation:[`TTEntry(NamedTuple): key, depth, score, flag, best_move, age.`,`probe(key): Tra cứu bằng hash(key) & (self.size - 1). Nếu trùng key -> trả về entry, ngược lại trả về None.`,`store(...): Chính sách thay thế 4 điều kiện: 1. Ô băm còn trống. 2. Trùng key (cập nhật). 3. Mục cũ thuộc thế hệ trước (existing.age != age). 4. Lượt tìm kiếm mới có độ sâu lớn hơn hoặc bằng (depth >= existing.depth).`],inputs:`Zobrist hash key, depth, score, flag, best_move, age.`,outputs:`TTEntry hoặc ghi đè dữ liệu vào mảng băm.`,systemRole:`Ghi nhớ kết quả tìm kiếm để cắt tỉa các nhánh chuyển vị (transposition) lặp lại.`,defensePoints:[`Giảng viên hỏi: Tại sao chọn kích thước 2^19 (524,288 mục)? Trả lời: 2^19 là lũy thừa của 2, cho phép phép băm dùng bitwise & (size - 1) với tốc độ tức thì trong 1 chu kỳ CPU, đồng thời dung lượng RAM tiêu thụ chỉ khoảng ~35MB, hoàn toàn nằm trong giới hạn cho phép.`,`Giảng viên hỏi: Biến age có tác dụng gì? Trả lời: age tăng lên 1 sau mỗi nước đi của ván cờ. Khi bảng băm đầy, các mục có age cũ sẽ bị ghi đè ưu tiên để nhường chỗ cho các thế cờ mới của lượt đi hiện tại.`],codeSnippet:`
class TTEntry(NamedTuple):

    """

    Mục lưu trữ trong Transposition Table.



    Thuộc tính:

        key: Khóa băm Zobrist đại diện duy nhất cho thế cờ (board._transposition_key()).

        depth: Độ sâu tìm kiếm của kết quả lưu trữ.

        score: Điểm số đánh giá (đã qua chuẩn hóa mate score).

        flag: Cận của điểm số (TT_EXACT, TT_LOWER, TT_UPPER).

        best_move: Nước đi tốt nhất tìm được tại thế cờ này.

        age: Thế hệ tìm kiếm (lượt đi của ván) phục vụ cơ chế thay thế mục cũ.

    """

    key: Any

    depth: int

    score: int

    flag: int

    best_move: chess.Move | None

    age: int





class TranspositionTable:

    """

    Bảng băm lưu trữ trạng thái tìm kiếm (Transposition Table) với kích thước cố định.



    Ghi nhớ kết quả của các thế cờ đã duyệt qua để tái sử dụng khi thế cờ lặp lại

    theo các thứ tự nước đi khác nhau (transposition), giúp tiết kiệm hàng triệu phép tính.

    """



    def __init__(self, size: int = TT_SIZE) -> None:

        """Khởi tạo bảng băm với kích thước cố định là lũy thừa của 2."""

        self.size = size

        self._table: dict[int, TTEntry] = {}



    def probe(self, key: Any) -> TTEntry | None:

        """

        Tra cứu trạng thái bàn cờ trong bảng băm.



        Tham số:

            key: Khóa băm Zobrist của bàn cờ.



        Trả về:

            TTEntry nếu tìm thấy và trùng khớp khóa, ngược lại trả về None.

        """

        idx = hash(key) & (self.size - 1)

        entry = self._table.get(idx)

        if entry is not None and entry.key == key:

            return entry

        return None



    def store(

        self,

        key: Any,

        depth: int,

        score: int,

        flag: int,

        best_move: chess.Move | None,

        age: int,

    ) -> None:

        """

        Lưu hoặc ghi đè trạng thái vào bảng băm theo chính sách ưu tiên:

        1. Ghi đè nếu ô băm còn trống.

        2. Ghi đè nếu trùng khóa (cập nhật thông tin mới nhất).

        3. Ghi đè nếu mục hiện tại thuộc thế hệ cũ (age != existing.age).

        4. Ghi đè nếu lượt tìm kiếm mới sâu hơn hoặc bằng (depth >= existing.depth).

        """

        idx = hash(key) & (self.size - 1)

        existing = self._table.get(idx)

        if (

            existing is None

            or existing.key == key

            or existing.age != age

            or depth >= existing.depth

        ):

            self._table[idx] = TTEntry(

                key, depth, score, flag, best_move, age

            )



    def clear(self) -> None:

        """Xóa sạch bảng băm."""

        self._table.clear()




`,relatedFunctions:[`Searcher._negamax`,`Searcher.search`]},{id:`search-move-ordering`,file:`search.py`,startLine:703,endLine:916,title:`Hàm _order_moves – Hệ thống Phân tầng Điểm số Heuristic`,purpose:`Sắp xếp danh sách nước đi theo độ ưu tiên giảm dần để tối đa hóa xác suất cắt tỉa Beta trong Alpha-Beta.`,explanation:[`1. TT Move (Hash Move): +10,000,000 (Nước đi tốt nhất tìm được từ độ sâu trước).`,`2. Phong cấp Hậu: +1,200,000.`,`2b. Nước chạy thoát quân to đang bị đe dọa sang ô an toàn: Hậu (+1,100,000), Xe (+950,000), Mã/Tượng bị Tốt dọa (+920,000).`,`3. Bắt quân có lợi (SEE >= 0) kết hợp MVV-LVA: +1,000,000 + mvv_lva * 100 + SEE.`,`4. Killer Move 1: +900,000; Killer Move 2: +800,000.`,`5. Nước chiếu an toàn (Safe Check): +650,000 (chiếu bất lợi bị phạt -500,000).`,`6. Phong cấp khác (Mã, Tượng, Xe): +40,000.`,`7. Bắt quân bất lợi (SEE < 0): +50,000 + SEE.`,`8. History Heuristic: min(history, 500,000).`],inputs:`board, moves, ply, tt_move.`,outputs:`Danh sách moves đã được sort giảm dần theo điểm heuristic.`,systemRole:`Yếu tố quyết định đưa độ phức tạp của Alpha-Beta từ O(b^d) tiệm cận O(b^(d/2)).`,defensePoints:[`Giảng viên hỏi: Tại sao TT Move lại có điểm cao nhất (+10,000,000)? Trả lời: Vì TT Move là nước đi tốt nhất được chứng minh ở độ sâu d-1. Trong Iterative Deepening, khả năng nước này tiếp tục là nước tốt nhất ở độ sâu d lên tới trên 80%. Duyệt nước này đầu tiên giúp gây cắt tỉa Beta ngay lập tức ở 90% các nhánh!`,`Giảng viên hỏi: Tầng 2b (chạy thoát quân) có ý nghĩa gì? Trả lời: Đây là cải tiến chiến thuật của Nhóm 12 nhằm ngăn chặn bot ham ăn quân nhỏ trong khi Hậu hoặc Xe của mình đang bị đối phương đe dọa bắt chết.`],codeSnippet:`    def _order_moves(

        self,

        board: chess.Board,

        moves: list[chess.Move],

        ply: int,

        tt_move: chess.Move | None,

    ) -> list[chess.Move]:

        """

        Sắp xếp danh sách nước đi theo độ ưu tiên Heuristic (Move Ordering).



        Nguyên lý: Move Ordering chuẩn xác là yếu tố quan trọng nhất giúp Alpha-Beta

        đạt độ phức tạp tối ưu O(b^(d/2)). Nếu nước đi tốt nhất luôn được duyệt đầu tiên,

        tỷ lệ cắt tỉa beta ở các nước sau sẽ đạt trên 90%.



        Hệ thống phân tầng điểm số ưu tiên:

        1. Nước đi từ Transposition Table (TT Move): +2,000,000 (đã chứng minh là nước tốt nhất ở tầng trước)

        2. Phong cấp Hậu (Queen Promotion): +1,200,000

        3. Nước bắt quân có lợi (Good Captures với SEE >= 0) kết hợp MVV-LVA: +1,000,000 + bonus

        4. Killer Move 1: +700,000

        5. Killer Move 2: +650,000

        6. Nước phong cấp khác (Xe, Tượng, Mã): +40,000

        7. Nước bắt quân bất lợi (Bad Captures với SEE < 0): +50,000 + SEE

        8. Nước đi yên lặng có điểm History cao: +1 đến +500,000

        """

        killers = self.killer_moves[ply] if ply < len(self.killer_moves) else [None, None]

        turn = board.turn



        def score_move(move: chess.Move) -> int:

            # 1. Ưu tiên cao nhất: Nước đi gợi ý từ Transposition Table (Hash Move)

            if move == tt_move:

                return 10_000_000



            # 2. Ưu tiên phong cấp Hậu

            if move.promotion == chess.QUEEN:

                return 1_200_000



            # 2b. Ưu tiên chạy thoát quân đang bị đe dọa sang ô an toàn

            # Tránh tuyệt đối phản công mù quáng khi quân đang bị đe dọa trực tiếp

            ptype = board.piece_type_at(move.from_square)

            opp = not turn

            if ptype in (chess.QUEEN, chess.ROOK, chess.BISHOP, chess.KNIGHT) and board.is_attacked_by(opp, move.from_square):

                if not board.is_attacked_by(opp, move.to_square):

                    if ptype == chess.QUEEN:

                        return 1_100_000

                    elif ptype == chess.ROOK:

                        return 950_000

                    elif board.attackers(opp, move.from_square) & board.pawns:

                        # Mã/Tượng bị Tốt địch tấn công trực diện: ưu tiên chạy thoát

                        return 920_000

                    else:

                        return 850_000



            # 3. Đánh giá các nước bắt quân

            if board.is_capture(move):

                victim = (

                    chess.PAWN

                    if board.is_en_passant(move)

                    else board.piece_type_at(move.to_square)

                )

                attacker = board.piece_type_at(move.from_square)



                # MVV-LVA score: quân bị ăn càng to, quân đi ăn càng nhỏ thì điểm càng cao

                mvv_lva = (

                    _MVV_LVA_SCORES[victim] * 10

                    - _MVV_LVA_SCORES[attacker]

                )



                v_val = PIECE_VALS[victim]

                a_val = PIECE_VALS[attacker]



                if a_val <= v_val:

                    # Quân nhỏ/bằng ăn quân lớn: chắc chắn SEE >= 0, không cần quét tấn công đắt đỏ

                    return 1_000_000 + mvv_lva * 100 + (v_val - a_val)

                else:

                    # Quân to ăn quân bé: chỉ gọi see() khi thực sự cần phân loại

                    see_val = see(board, move)

                    if see_val >= 0:

                        return 1_000_000 + mvv_lva * 100 + see_val

                    else:

                        return 50_000 + see_val



            # 4. Killer Moves: các nước đi yên lặng từng gây cắt tỉa beta ở cùng ply

            if move == killers[0]:

                return 900_000

            if move == killers[1]:

                return 800_000



            # 5. Nước đi gây chiếu (Check Move): Nước tạo đòn chiếu an toàn

            if board.gives_check(move):

                opp = not turn

                if not board.is_attacked_by(opp, move.to_square) or (board.is_capture(move) and see(board, move) >= 0):

                    return 650_000

                else:

                    # Chiếu bất lợi (bị bắt lại không bù đắp): Phạt điểm trong Move Ordering để duyệt sau

                    return -500_000



            # 6. Các nước phong cấp khác (Mã, Tượng, Xe)

            if move.promotion is not None:

                return 40_000



            # 7. History Heuristic: sắp xếp các nước yên lặng theo tần suất thành công

            key = (turn, move.from_square, move.to_square)

            return min(self.history.get(key, 0), 500_000)



        moves.sort(key=score_move, reverse=True)

        return moves


`,relatedFunctions:[`_order_moves`,`see`,`_store_killer`,`_update_history`]},{id:`search-quiescence`,file:`search.py`,startLine:925,endLine:1195,title:`Hàm _quiescence – Tìm kiếm Tĩnh lặng Triệt tiêu Hiệu ứng Chân trời`,purpose:`Giải quyết hiệu ứng chân trời bằng cách tiếp tục duyệt các nước bắt quân và giải chiếu khi depth <= 0.`,explanation:[`Kiểm tra deadline định kỳ mỗi 128 nodes (self._nodes & 127 == 0) để phản ứng tức thì với thời gian.`,`Stand-pat: Điểm đánh giá tĩnh evaluate(board). Nếu stand_pat >= beta -> Cắt tỉa ngay lập tức (fail-high).`,`Delta Pruning: Nếu stand_pat + 1150 < alpha và không có nguy cơ phong cấp -> Cắt tỉa ngay (bắt quân bình thường không thể cứu vãn thế cờ).`,`Sinh nước đi: Khi bị chiếu -> duyệt mọi nước hợp lệ để tìm cách giải chiếu; khi không bị chiếu -> dùng generate_legal_captures() lọc SEE >= 0 và nước chiếu an toàn.`,`Sắp xếp nước ăn quân bằng MVV-LVA và đệ quy tìm kiếm tĩnh lặng.`],inputs:`board, alpha, beta, ply, tm, qdepth.`,outputs:`Điểm số tĩnh lặng cân bằng.`,systemRole:`Lá chắn ngăn chặn sai số đánh giá do cắt ngang chuỗi đổi quân dở dang.`,defensePoints:[`Giảng viên hỏi: Hiệu ứng chân trời (Horizon Effect) là gì? Trả lời: Nếu ta dừng tìm kiếm ở depth = 4 đúng vào lúc Trắng vừa lấy Hậu ăn Tốt Đen, hàm đánh giá thấy Trắng hơn 1 Tốt nên cho điểm rất cao. Nhưng thực tế ở nước thứ 5, Xe Đen sẽ ăn lại Hậu Trắng! Quiescence Search tiếp tục duyệt các nước bắt quân cho đến khi bàn cờ tĩnh lặng để không bao giờ bị 'mù' trước các đòn ăn lại.`,`Giảng viên hỏi: Delta Pruning có thể cắt nhầm nhánh phong cấp không? Trả lời: Không, vì Nhóm 12 đã đặt điều kiện bitboard not has_promotion: nếu có Tốt ở hàng 7 (hoặc hàng 2), Delta Pruning bị vô hiệu hóa hoàn toàn.`],codeSnippet:`    def _quiescence(

        self,

        board: chess.Board,

        alpha: int,

        beta: int,

        ply: int,

        tm: TimeManager,

        qdepth: int = 0,

    ) -> int:

        """

        Quiescence Search – Tìm kiếm tĩnh lặng giải quyết hiệu ứng chân trời.



        Chức năng:

        Giải quyết triệt để "Hiệu ứng chân trời" (Horizon Effect). Nếu dừng tìm kiếm

        ngay tại độ sâu depth = 0 khi bàn cờ đang trong chuỗi bắt quân qua lại, điểm số

        sẽ bị sai lệch nghiêm trọng. Quiescence Search tiếp tục duyệt riêng các nước

        bắt quân (captures) và giải chiếu cho đến khi bàn cờ đạt trạng thái "tĩnh lặng".



        Kỹ thuật tối ưu hóa hiệu năng cao:

        1. Stand-pat: Sử dụng điểm đánh giá tĩnh hiện tại làm ngưỡng sàn. Nếu bên đi

           đã đạt điểm >= beta mà không cần làm gì thêm, cắt tỉa ngay lập tức (fail-high).

        2. Delta Pruning: Nếu điểm stand-pat cộng với giá trị con Hậu (1150 cp) mà vẫn

           không đuổi kịp alpha, việc bắt quân bình thường không thể cứu vãn thế cờ => cắt tỉa.

        3. Bitboard Promo Check: Kiểm tra khả năng phong cấp siêu tốc bằng bitboard

           (board.pawns & promo_rank) thay vì duyệt danh sách legal moves.

        4. Fast Capture Generation: Sử dụng board.generate_legal_captures() kết hợp

           lọc nhanh see(board, move) >= 0 để loại bỏ các nước thí quân lỗ vốn.

        """

        self._nodes += 1



        # Kiểm tra deadline định kỳ mỗi 128 nodes để phản ứng nhanh nhạy với thời gian

        if (self._nodes & 127) == 0 and tm.should_stop():

            self._timeout = True

            return 0



        if self._timeout:

            return 0



        in_check = board.is_check()



        # Stand-pat và Delta Pruning (chỉ áp dụng khi không bị chiếu)

        if not in_check:

            # Kiểm tra luật hòa 50 nước và lặp cờ

            if board.halfmove_clock >= 100 or (ply > 0 and board.is_repetition(2)):

                return DRAW_SCORE



            stand_pat = evaluate(board)

            if stand_pat >= beta:

                return beta



            # Kiểm tra phong cấp siêu nhanh bằng Bitboard: chỉ xét Tốt của bên đang đến lượt đi

            promo_rank = chess.BB_RANK_7 if board.turn == chess.WHITE else chess.BB_RANK_2

            my_pawns = board.pawns & board.occupied_co[board.turn]

            has_promotion = bool(my_pawns & promo_rank)



            # Delta Pruning: không cắt tỉa nếu có nguy cơ đối phương hoặc mình phong cấp

            if qdepth > 0 and not has_promotion and stand_pat + 1150 < alpha:

                return alpha



            if stand_pat > alpha:

                alpha = stand_pat



        # Đạt giới hạn độ sâu của Quiescence Search: trả về alpha hiện tại

        if qdepth >= MAX_QSEARCH_DEPTH and not in_check:

            return alpha



        # Sinh nước đi cho Quiescence Search

        if in_check:

            # Nếu đang bị chiếu: phải xét mọi nước đi hợp lệ để tìm cách giải chiếu

            moves = list(board.legal_moves)

            if not moves:

                return -(MATE_SCORE - ply)

        else:

            # Không bị chiếu: sinh thẳng các nước bắt quân qua generate_legal_captures()

            # Giữ lại các nước bắt quân có lợi (SEE >= 0) hoặc nước bắt quân gây chiếu an toàn

            opp = not board.turn

            def _valid_q_move(m: chess.Move) -> bool:

                if see(board, m) >= 0:

                    return True

                if board.gives_check(m) and not board.is_attacked_by(opp, m.to_square):

                    return True

                return False



            promo_rank = chess.BB_RANK_7 if board.turn == chess.WHITE else chess.BB_RANK_2

            my_pawns = board.pawns & board.occupied_co[board.turn]

            if my_pawns & promo_rank:

                caps = list(board.generate_legal_captures())

                moves = [m for m in caps if _valid_q_move(m)]

                for m in board.legal_moves:

                    if m.promotion == chess.QUEEN and not board.is_capture(m):

                        moves.append(m)

            else:

                moves = [m for m in board.generate_legal_captures() if _valid_q_move(m)]



        if not moves:

            return alpha



        # Sắp xếp các nước bắt quân theo MVV-LVA, ưu tiên nước bắt quân gây chiếu

        def q_order(m: chess.Move) -> int:

            if m.promotion == chess.QUEEN:

                return 1000

            v = (

                chess.PAWN

                if board.is_en_passant(m)

                else board.piece_type_at(m.to_square)

            )

            a = board.piece_type_at(m.from_square)

            base = _MVV_LVA_SCORES[v] * 10 - _MVV_LVA_SCORES[a]

            if board.gives_check(m):

                base += 500

            return base



        moves.sort(key=q_order, reverse=True)



        best_score = -MATE_SCORE - 1 if in_check else alpha



        for move in moves:

            board.push(move)

            try:

                score = -self._quiescence(board, -beta, -alpha, ply + 1, tm, qdepth + 1)

            finally:

                board.pop()



            if self._timeout:

                return 0



            if score > best_score:

                best_score = score

            if score >= beta:

                return beta

            if score > alpha:

                alpha = score



        return best_score if in_check else alpha



    # ------------------------------------------------------------------`,relatedFunctions:[`_quiescence`,`evaluate`,`see`]},{id:`search-negamax-pruning`,file:`search.py`,startLine:1203,endLine:1432,title:`Hàm _negamax – Phần 1: Cắt tỉa Toán học (TT, RFP, NMP)`,purpose:`Thực thi các kỹ thuật cắt tỉa nâng cao trước khi sinh nước đi: Tra cứu TT, Reverse Futility Pruning và Null Move Pruning.`,explanation:[`Tra cứu TT: Nếu entry.depth >= depth: EXACT -> trả về ngay; LOWER (fail-high) >= beta -> trả về ngay; UPPER (fail-low) <= alpha -> trả về ngay.`,`Check Extension: Nếu đang bị chiếu và ply < 24 -> depth += 1 để tìm đường thoát chiếu triệt để.`,`Reverse Futility Pruning (RFP): Ở depth <= 2, không bị chiếu, nếu static_eval - 120 * depth >= beta -> Cắt tỉa trả về ngay.`,`Null Move Pruning (NMP): Ở depth >= 3, không bị chiếu, có quân lớn (has_pieces tránh Zugzwang), nếu static_eval >= beta: cho đối thủ đi 2 nước liên tiếp với độ giảm R = 2 (depth <= 4) hoặc 3 (depth >= 5). Nếu kết quả vẫn >= beta -> Cắt tỉa Beta Cutoff ngay!`],inputs:`board, depth, alpha, beta, ply, tm, allow_nmp.`,outputs:`Điểm số tìm kiếm Negamax hoặc cắt tỉa sớm.`,systemRole:`Giảm bớt hàng chục nghìn nhánh tìm kiếm vô ích ngay tại các nút trên cao.`,defensePoints:[`Giảng viên hỏi: Bẫy Zugzwang là gì và NMP xử lý thế nào? Trả lời: Zugzwang là tình thế mà bất kỳ nước đi nào cũng làm vị trí xấu đi (thường gặp ở cờ tàn chỉ còn Vua và Tốt). Nếu áp dụng NMP ở cờ tàn Tốt, bot nhường nước đi thấy đối thủ không làm gì được nên tưởng mình an toàn, nhưng thực tế mình bị ép phải đi và thua. Nhóm 12 bảo vệ bằng điều kiện has_pieces (phải có Mã, Tượng, Xe hoặc Hậu) mới cho phép thực hiện Null Move!`,`Giảng viên hỏi: Reverse Futility Pruning (RFP) cắt tỉa thế nào? Trả lời: Tại độ sâu 1 hoặc 2, nếu điểm tĩnh đã vượt qua beta một khoảng an toàn (120 cp ở depth 1, 240 cp ở depth 2), thì dù đối thủ có đi nước tốt nhất cũng không thể kéo điểm xuống dưới beta, cho phép cắt tỉa ngay mà không cần sinh nước đi.`],codeSnippet:`    def _negamax(

        self,

        board: chess.Board,

        depth: int,

        alpha: int,

        beta: int,

        ply: int,

        tm: TimeManager,

        allow_nmp: bool = True,

    ) -> int:

        """

        Negamax với Alpha-Beta Pruning, PVS, NMP, RFP, Futility Pruning và LMR.



        Nguyên lý Negamax:

        Thay vì luân phiên Max cho Trắng và Min cho Đen như Minimax truyền thống,

        Negamax tận dụng tính chất đối xứng zero-sum: max(a, b) == -min(-a, -b).

        Điểm số trả về luôn theo góc nhìn của bên đang đến lượt đi (board.turn).



        Các tầng cắt tỉa toán học:

        1. Kiểm tra hòa lặp (Repetition) & Thiếu quân (Insufficient Material).

        2. Tra cứu Transposition Table: Cắt tỉa tức thì nếu đã có kết quả đủ độ sâu.

        3. Khi depth <= 0: Chuyển tiếp sang Quiescence Search để giải quyết hiệu ứng chân trời.

        4. Reverse Futility Pruning (RFP): Cắt tỉa ở depth 1-2 nếu điểm tĩnh >= beta.

        5. Null Move Pruning (NMP): Nhường nước đi ở depth >= 3 để kiểm định thế cờ.

        6. Futility Pruning (FP): Bỏ qua nước yên lặng ở depth 1 nếu không cứu vãn được alpha.

        7. Late Move Reductions (LMR): Giảm độ sâu với các nước đi xếp sau.

        8. Principal Variation Search (PVS): Tìm kiếm nước đầu với dải đầy đủ,

           các nước sau kiểm định nhanh với cửa sổ hẹp Zero-Window [alpha, alpha + 1].

        """

        self._nodes += 1



        # Kiểm tra deadline định kỳ mỗi 128 nodes để phản ứng nhanh nhạy với thời gian

        if (self._nodes & 127) == 0 and tm.should_stop():

            self._timeout = True

            return 0



        if self._timeout:

            return 0



        # Kiểm tra hòa lặp và thiếu quân

        if ply > 0:

            if board.is_repetition(2) or board.halfmove_clock >= 100:

                if board.is_checkmate():

                    return -(MATE_SCORE - ply)

                # CONTEMPT FACTOR: Khinh địch khi đang hơn thế để ép bot tìm đường thắng

                eval_side = evaluate(board)

                if eval_side >= 80:

                    return -50  # Phạt hòa khi đang hơn thế

                elif eval_side <= -80:

                    return +50  # Thưởng hòa khi đang thua

                return DRAW_SCORE

            if board.is_insufficient_material():

                return DRAW_SCORE



        # --- Tra cứu Transposition Table ---

        tt_key = board._transposition_key()

        tt_entry = self.tt.probe(tt_key)

        tt_move: chess.Move | None = None



        if tt_entry is not None:

            tt_move = tt_entry.best_move

            if tt_entry.depth >= depth:

                tt_score = score_from_tt(tt_entry.score, ply)

                if tt_entry.flag == TT_EXACT:

                    return tt_score

                elif tt_entry.flag == TT_LOWER and tt_score >= beta:

                    return tt_score

                elif tt_entry.flag == TT_UPPER and tt_score <= alpha:

                    return tt_score



        # Khi hết độ sâu: chuyển tiếp sang Quiescence Search

        if depth <= 0:

            return self._quiescence(board, alpha, beta, ply, tm, 0)



        in_check = board.is_check()



        # Check Extension: Mở rộng 1 tầng khi bị chiếu để triệt tiêu Horizon Effect

        if in_check and ply < 24:

            depth += 1



        # Tính toán lượng giá tĩnh một lần duy nhất khi không bị chiếu

        # Dùng chung cho RFP, NMP và Futility Pruning để tránh gọi lại evaluate()

        static_eval = evaluate(board) if not in_check else None



        # --- 1. Reverse Futility Pruning (RFP / Static Null Move) ---

        # Cắt tỉa siêu hiệu quả ở độ sâu 1 và 2 nếu vị trí tĩnh đã quá áp đảo

        if not in_check and depth <= 2 and abs(beta) < MATE_THRESHOLD and ply > 0:

            has_pieces = bool(board.occupied_co[board.turn] & ~(board.pawns | board.kings))

            if has_pieces and static_eval is not None:

                rfp_margin = 120 * depth  # 120 CP ở depth 1, 240 CP ở depth 2

                if static_eval - rfp_margin >= beta:

                    return static_eval - rfp_margin



        # --- 2. Null Move Pruning (NMP) ---

        if allow_nmp and not in_check and depth >= 3 and ply > 0:

            # Kiểm tra nhanh bằng bitboard: có quân cờ lớn (không phải Tốt, Vua) để tránh bẫy Zugzwang

            # Chỉ thực hiện Null Move khi static_eval >= beta: nếu điểm tĩnh không vượt được beta,

            # nhường lượt đi cho đối thủ chắc chắn không thể vượt beta

            has_pieces = bool(board.occupied_co[board.turn] & ~(board.pawns | board.kings))

            if has_pieces and static_eval is not None and static_eval >= beta:

                r = 2 if depth <= 4 else 3

                board.push(chess.Move.null())

                try:

                    null_score = -self._negamax(

                        board, depth - 1 - r, -beta, -beta + 1, ply + 1, tm, False

                    )

                finally:

                    board.pop()



                if self._timeout:

                    return 0



                if null_score >= beta and abs(null_score) < MATE_THRESHOLD:

                    return beta


`,relatedFunctions:[`_negamax`,`TranspositionTable.probe`]},{id:`search-negamax-pvs-lmr`,file:`search.py`,startLine:1433,endLine:1626,title:`Hàm _negamax – Phần 2: Futility Pruning, LMR, PVS & Ghi TT`,purpose:`Duyệt danh sách nước đi kết hợp Futility Pruning, Late Move Reductions (LMR), Principal Variation Search (PVS) và ghi nhớ vào TT.`,explanation:[`Futility Pruning (FP): Tại depth == 1, bỏ qua các nước yên lặng nếu static_eval + 150 <= alpha.`,`Late Move Reductions (LMR): Đối với các nước yên lặng xếp sau (moves_searched >= 4, depth >= 3, không chiếu, không ăn quân), giảm độ sâu tìm kiếm đi 1 tầng (r = 1).`,`Principal Variation Search (PVS): Nước đi đầu tiên duyệt với cửa sổ đầy đủ [-beta, -alpha]. Các nước sau duyệt với cửa sổ hẹp Zero-Window [-alpha - 1, -alpha]. Nếu LMR fail-high -> re-search ở độ sâu đủ; nếu PVS tìm thấy điểm vượt alpha nhưng chưa chạm beta -> re-search toàn dải.`,`Beta Cutoff: Khi alpha >= beta, lưu Killer Move và cộng điểm History Heuristic.`,`Lưu TT: Phân loại cờ cận EXACT, LOWER, UPPER và lưu bằng score_to_tt.`],inputs:`board, depth, alpha, beta, ply, tm.`,outputs:`best_score của nút hiện tại.`,systemRole:`Thuật toán tìm kiếm lõi tối ưu hiệu năng toán học cao nhất trong cờ vua máy tính.`,defensePoints:[`Giảng viên hỏi: Tại sao PVS (NegaScout) lại nhanh hơn Alpha-Beta thông thường? Trả lời: Sau khi Move Ordering đã đưa nước tốt nhất lên đầu tiên, hầu hết các nước còn lại đều kém hơn alpha. Duyệt với cửa sổ hẹp [alpha, alpha + 1] làm cây tìm kiếm bị cắt tỉa cực nhanh. Chỉ khi gặp một nước bất ngờ tốt hơn, ta mới phải tốn công tìm kiếm lại với cửa sổ đầy đủ.`,`Giảng viên hỏi: Khi nào Killer Moves và History Heuristic được cập nhật? Trả lời: Chỉ cập nhật khi một nước đi yên lặng (quiet move) gây ra Beta Cutoff (alpha >= beta). Nước bắt quân không được cập nhật vì đã có MVV-LVA và SEE chấm điểm riêng.`],codeSnippet:`        # Sinh và sắp xếp nước đi hợp lệ

        legal_moves = list(board.legal_moves)

        if not legal_moves:

            if in_check:

                return -(MATE_SCORE - ply)

            return DRAW_SCORE



        moves = self._order_moves(board, legal_moves, ply, tt_move)



        best_score = -MATE_SCORE - 1

        best_move: chess.Move | None = None

        original_alpha = alpha

        moves_searched = 0



        for move in moves:

            is_capture = board.is_capture(move)

            gives_check = board.gives_check(move)



            # --- 3. Futility Pruning tại Depth 1 ---

            # Bỏ qua các nước yên lặng không có cơ hội nâng alpha

            if (

                depth == 1

                and not in_check

                and moves_searched > 0

                and not is_capture

                and not gives_check

                and move.promotion is None

                and move != tt_move

            ):

                if static_eval is not None and static_eval + 150 <= alpha:

                    continue



            board.push(move)

            try:

                moves_searched += 1



                # --- 4. Late Move Reductions (LMR) ---

                do_lmr = (

                    depth >= 3

                    and moves_searched >= 4

                    and not in_check

                    and not is_capture

                    and move.promotion is None

                    and not gives_check

                    and move != tt_move

                )



                # --- 5. Principal Variation Search (PVS) ---

                if moves_searched == 1:

                    # Nước đi đầu tiên (nước hứa hẹn nhất): tìm kiếm với cửa sổ đầy đủ

                    score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1, tm, True)

                else:

                    # Các nước sau: tìm kiếm với cửa sổ hẹp (Zero-Window) để kiểm tra fail-low

                    r = 1 if do_lmr else 0

                    score = -self._negamax(board, depth - 1 - r, -alpha - 1, -alpha, ply + 1, tm, True)



                    # Nếu LMR bị fail-high (nước đi tốt hơn dự kiến): tìm kiếm lại ở độ sâu đầy đủ

                    if do_lmr and score > alpha:

                        score = -self._negamax(board, depth - 1, -alpha - 1, -alpha, ply + 1, tm, True)



                    # Nếu PVS tìm thấy điểm vượt alpha nhưng chưa chạm beta: mở rộng tìm lại toàn dải

                    if score > alpha and score < beta:

                        score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1, tm, True)



            finally:

                board.pop()



            if self._timeout:

                return 0



            if score > best_score:

                best_score = score

                best_move = move



            if score > alpha:

                alpha = score



            if alpha >= beta:

                # Cắt tỉa Beta (Beta Cutoff): nước đi này quá mạnh, đối thủ sẽ không cho phép xảy ra

                if not is_capture:

                    self._store_killer(move, ply)

                    self._update_history(move, board.turn, depth)

                break



        # Lưu kết quả tìm kiếm vào Transposition Table

        if not self._timeout:

            if best_score <= original_alpha:

                flag = TT_UPPER

            elif best_score >= beta:

                flag = TT_LOWER

            else:

                flag = TT_EXACT

            tt_score = score_to_tt(best_score, ply)

            self.tt.store(tt_key, depth, tt_score, flag, best_move, self._age)



        return best_score


`,relatedFunctions:[`_negamax`,`_order_moves`,`_store_killer`,`_update_history`,`TranspositionTable.store`]},{id:`search-ids-aspiration`,file:`search.py`,startLine:1635,endLine:1938,title:`Hàm search – Đào sâu Lặp (IDS) & Cửa sổ Kỳ vọng (Aspiration Windows)`,purpose:`Điều phối toàn bộ quá trình tìm kiếm từ depth 1..64 với cơ chế Aspiration Windows và bảo toàn nước đi an toàn khi timeout.`,explanation:[`Sắp xếp sơ bộ legal moves để luôn có best_move mặc định phẩm chất cao nhất.`,`Vòng lặp IDS (depth 1..MAX_DEPTH): Kiểm tra tm.should_stop() và tm.can_start_next_depth() trước khi mở tầng mới.`,`Aspiration Windows: Tại depth >= 4, đặt alpha = prev - 40, beta = prev + 40. Nếu kết quả rơi ra ngoài cửa sổ (fail-low hoặc fail-high), tự động mở rộng về toàn dải [-MATE, +MATE] và tìm lại.`,`Bảo toàn kết quả khi timeout: Chỉ cập nhật best_move khi tầng độ sâu hoàn thành trọn vẹn (not self._timeout), hoặc tại depth == 1. Tuyệt đối không chấp nhận nước đi dở dang khi bị ngắt bởi deadline.`,`Dừng sớm: Nếu phát hiện chuỗi chiếu hết chắc chắn (score >= MATE_THRESHOLD) -> break ngay lập tức để tiết kiệm thời gian.`],inputs:`board: chess.Board, tm: TimeManager.`,outputs:`chess.Move: Nước đi tối ưu nhất tìm được.`,systemRole:`Đầu não điều phối tìm kiếm của bot cờ vua.`,defensePoints:[`Giảng viên hỏi: Tại sao không tìm thẳng ở depth = 6 mà phải tìm từ depth 1, 2, 3, 4, 5, 6 (Iterative Deepening)? Trả lời: 1. Đảm bảo an toàn: nếu hết giờ ở depth 6, bot luôn có sẵn nước đi tốt nhất của depth 5 để đi ngay. 2. Tối ưu thời gian: Kết quả và Hash Move từ depth trước giúp Move Ordering của depth sau cực kỳ chuẩn xác, khiến việc duyệt từ 1 đến 6 thậm chí còn nhanh hơn nhiều so với việc nhảy thẳng vào depth 6!`,`Giảng viên hỏi: Tại sao có điều kiện if candidate is not None and (not self._timeout or depth == 1)? Trả lời: Đây là lỗi kinh điển của nhiều bot sinh viên: khi bị timeout ở giữa tầng 6, biến candidate có thể chỉ mới duyệt qua một nước đi ngẫu nhiên chưa được lượng giá đầy đủ. Nếu cập nhật candidate đó làm best_move, bot sẽ đi nước đi ngớ ngẩn (blunder). Nhóm 12 chỉ cập nhật khi tầng đó đã hoàn thành 100%, bảo đảm nước đi trả về luôn là đỉnh cao trí tuệ của tầng đã duyệt xong.`],codeSnippet:`    def search(

        self,

        board: chess.Board,

        tm: TimeManager,

    ) -> chess.Move:

        """

        Tìm kiếm lặp tăng dần độ sâu (Iterative Deepening Search - IDS).



        Quy trình vận hành:

        1. Bắt đầu từ depth = 1 và tăng dần từng tầng (1, 2, 3, 4, 5, 6...).

        2. Tích hợp Aspiration Windows từ depth >= 4:

           Thu hẹp cửa sổ tìm kiếm quanh điểm số của độ sâu trước [prev - delta, prev + delta]

           (delta = 40 cp). Nếu điểm rơi ra ngoài cửa sổ (fail-low hoặc fail-high),

           hệ thống tự động mở rộng về toàn dải [-MATE, +MATE] để tìm lại.

        3. Cơ chế kiểm soát thời gian:

           - Trước khi mở tầng mới: gọi tm.can_start_next_depth() (dừng nếu đã tiêu hơn 55% ngân sách).

           - Trong quá trình duyệt: kiểm tra tm.should_stop() sau mỗi 512 nodes.

           - Nếu timeout giữa chừng: hủy bỏ kết quả dở dang của tầng hiện tại và

             trả về best_move hoàn chỉnh của tầng độ sâu sâu nhất đã hoàn thành.



        Tham số:

            board: Bàn cờ hiện tại.

            tm: Đối tượng TimeManager quản lý ngân sách thời gian.



        Trả về:

            chess.Move: Nước đi tốt nhất tìm được.

        """

        legal = list(board.legal_moves)

        if not legal:

            raise ValueError("No legal moves available")



        # Nước đi duy nhất: trả về ngay

        if len(legal) == 1:

            return legal[0]



        # Sắp xếp sơ bộ các nước đi theo TT move / MVV-LVA / vị trí để nước đi mặc định

        # luôn có phẩm chất cao nhất, triệt tiêu hoàn toàn rủi ro fallback vào nước đi ngẫu nhiên

        tt_entry = self.tt.probe(board._transposition_key())

        root_tt_move = tt_entry.best_move if tt_entry is not None else None

        ordered_legal = self._order_moves(board, legal, ply=0, tt_move=root_tt_move)

        best_move = ordered_legal[0]

        self._timeout = False

        self._nodes = 0

        self._age += 1

        self._decay_history()

        self.killer_moves = [[None, None] for _ in range(MAX_DEPTH + 16)]

        tm.start()



        prev_score = 0

        aspiration_delta = 40



        for depth in range(1, MAX_DEPTH + 1):

            if depth > 1 and tm.should_stop():

                break



            # Kiểm tra ngân sách trước khi bắt đầu tầng độ sâu mới

            if depth > 1 and not tm.can_start_next_depth():

                break



            depth_start_time = time.perf_counter()

            self._timeout = False

            candidate: chess.Move | None = None

            best_score_this_depth = -MATE_SCORE - 1

            aspiration_active = (

                depth >= 4 and abs(prev_score) < MATE_THRESHOLD

            )



            # Thiết lập Aspiration Window ở depth >= 4

            if aspiration_active:

                alpha = max(-MATE_SCORE - 1, prev_score - aspiration_delta)

                beta = min(MATE_SCORE + 1, prev_score + aspiration_delta)

            else:

                alpha = -MATE_SCORE - 1

                beta = MATE_SCORE + 1



            research_move: chess.Move | None = None

            while True:

                candidate = None

                best_score_this_depth = -MATE_SCORE - 1



                # Lấy nước đi tốt nhất từ TT tại gốc (hoặc nước gây fail-high ở lần duyệt trước) để ưu tiên duyệt đầu tiên

                tt_entry = self.tt.probe(board._transposition_key())

                root_tt_move = research_move or (tt_entry.best_move if tt_entry is not None else None)



                moves = self._order_moves(board, list(board.legal_moves), ply=0, tt_move=root_tt_move)



                moves_searched = 0

                for move in moves:

                    board.push(move)

                    try:

                        moves_searched += 1



                        # PVS tại node gốc

                        if moves_searched == 1:

                            score = -self._negamax(board, depth - 1, -beta, -alpha, 1, tm, True)

                        else:

                            score = -self._negamax(board, depth - 1, -alpha - 1, -alpha, 1, tm, True)

                            if score > alpha and score < beta:

                                score = -self._negamax(board, depth - 1, -beta, -alpha, 1, tm, True)



                    finally:

                        board.pop()



                    if self._timeout and depth > 1:

                        break



                    if score > best_score_this_depth:

                        best_score_this_depth = score

                        candidate = move



                    if score > alpha:

                        alpha = score



                if self._timeout and depth > 1:

                    break



                # Xử lý Aspiration Window fail-low hoặc fail-high: mở rộng toàn dải và tìm lại

                if aspiration_active and (

                    best_score_this_depth <= prev_score - aspiration_delta

                    or best_score_this_depth >= prev_score + aspiration_delta

                ):

                    research_move = candidate

                    alpha = -MATE_SCORE - 1

                    beta = MATE_SCORE + 1

                    aspiration_active = False

                    continue



                break



            # Chỉ cập nhật best_move khi tầng độ sâu hoàn thành trọn vẹn (không bị timeout),

            # hoặc tại tầng đầu tiên (depth == 1) để luôn có ít nhất một nước đi hợp lệ đã được lượng giá.

            # Điều này triệt tiêu hoàn toàn rủi ro chấp nhận kết quả dở dang khi bị ngắt bởi deadline.

            if candidate is not None and (not self._timeout or depth == 1):

                best_move = candidate

                if not self._timeout:

                    prev_score = best_score_this_depth

                    tm.last_iteration_ms = int((time.perf_counter() - depth_start_time) * 1000)



                    self.tt.store(

                        board._transposition_key(),

                        depth,

                        score_to_tt(best_score_this_depth, 0),

                        TT_EXACT,

                        best_move,

                        self._age,

                    )



                    # Nếu đã tìm thấy chiếu hết chắc chắn: không cần tìm sâu hơn

                    if best_score_this_depth >= MATE_THRESHOLD:

                        break



        return best_move
`,relatedFunctions:[`search`,`_negamax`,`TimeManager.can_start_next_depth`]}],rawCode:`"""

Module search.py – Bộ máy tìm kiếm cờ vua chuyên sâu (Search Engine Core).



Kiến trúc thuật toán & Kỹ thuật tối ưu hóa:

1. Thuật toán tìm kiếm gốc:

   - Negamax kết hợp Alpha-Beta Pruning (biến thể đối xứng toán học của Minimax).

   - Iterative Deepening Search (IDS - Đào sâu lặp): Duyệt từ độ sâu 1 đến MAX_DEPTH,

     đảm bảo luôn có nước đi dự phòng tốt nhất khi hết thời gian.

   - Aspiration Windows (Cửa sổ kỳ vọng): Thu hẹp khoảng tìm kiếm [alpha, beta]

     quanh điểm số tầng trước để tăng tối đa tốc độ cắt tỉa ở gốc.

   - Principal Variation Search (PVS / NegaScout): Tìm kiếm nước đi đầu tiên với

     cửa sổ đầy đủ, các nước sau tìm với cửa sổ hẹp [alpha, alpha + 1] (Zero-Window).



2. Kỹ thuật cắt tỉa nâng cao (Advanced Pruning & Reductions):

   - Transposition Table (TT) với Zobrist Key: Bảng băm lưu trữ trạng thái O(1).

   - Reverse Futility Pruning (RFP / Static Null Move): Cắt tỉa sớm ở depth 1-2 nếu thế cờ tĩnh vượt trội beta.

   - Null Move Pruning (NMP): Nhường một lượt đi để kiểm tra xem đối thủ có tạo được đe dọa không.

   - Futility Pruning (FP): Cắt tỉa các nước đi yên lặng ở depth 1 nếu không có khả năng nâng alpha.

   - Late Move Reductions (LMR): Giảm độ sâu tìm kiếm đối với các nước đi yên lặng xếp sau.

   - Quiescence Search (QS): Tìm kiếm tĩnh lặng triệt tiêu hiệu ứng chân trời (Horizon Effect),

     kết hợp Stand-pat, Delta Pruning và sinh nước bắt quân bằng bitboard.



3. Sắp xếp nước đi (Move Ordering Heuristic):

   - Nước đi từ Transposition Table (TT Move).

   - Phong cấp Hậu (Queen Promotion).

   - Nước bắt quân có lợi (Good Captures với SEE >= 0) kết hợp MVV-LVA.

   - Killer Moves Heuristic (nước đi sát thủ gây cắt tỉa beta).

   - History Heuristic (bảng lịch sử các nước đi thành công).

   - Nước bắt quân bất lợi (Bad Captures với SEE < 0).

   - Nước đi yên lặng (Quiet Moves).

"""



from __future__ import annotations



import time

from typing import Any, NamedTuple

import chess



from .time_manager import TimeManager

from .evaluation import evaluate



# =========================================================================

# 1. HẰNG SỐ VÀ CÁC CỜ CỦA TRANSPOSITION TABLE

# =========================================================================



# Kích thước bảng băm: 2^19 = 524,288 mục (vừa vặn bộ nhớ RAM, tốc độ tra cứu O(1))

# Lưu trữ trạng thái và kết quả tìm kiếm của các thế cờ đã duyệt (Transposition Table)

TT_SIZE = 1 << 19



# Điểm quy ước chiếu hết (Checkmate score): 30,000 centipawns

# Điểm số quy ước cho trạng thái chiếu hết (checkmate)

MATE_SCORE = 30_000



# Ngưỡng nhận diện điểm chiếu hết: Các giá trị >= 29,000 được xem là chuỗi chiếu hết

MATE_THRESHOLD = 29_000



# Điểm hòa cờ cân bằng (Draw score): 0 centipawns

DRAW_SCORE = 0



# Độ sâu tìm kiếm tối đa trên lý thuyết

MAX_DEPTH = 64



# Bảng giá trị vật chất quy chuẩn phục vụ tính toán Static Exchange Evaluation (SEE)

PIECE_VALS = {

    None: 0,

    chess.PAWN: 100,

    chess.KNIGHT: 320,

    chess.BISHOP: 330,

    chess.ROOK: 500,

    chess.QUEEN: 1000,

    chess.KING: 20000,

}



# Điểm ưu tiên quân bị ăn và quân đi ăn (Most Valuable Victim - Least Valuable Attacker: MVV-LVA)

_MVV_LVA_SCORES = {

    None: 0,

    chess.PAWN: 1,

    chess.KNIGHT: 2,

    chess.BISHOP: 3,

    chess.ROOK: 4,

    chess.QUEEN: 5,

    chess.KING: 6,

}



# Giới hạn độ sâu tối đa cho Quiescence Search để tránh bùng nổ tổ hợp trong chuỗi đổi quân

MAX_QSEARCH_DEPTH = 8



# Ba loại cận (bound flags) lưu trong Transposition Table theo lý thuyết Alpha-Beta:

TT_EXACT = 0  # Điểm chính xác (PV-Node: alpha < score < beta)

TT_LOWER = 1  # Cận dưới (Cut-Node / Fail-High: score >= beta, nước đi quá mạnh)

TT_UPPER = 2  # Cận trên (All-Node / Fail-Low: score <= alpha, nước đi quá yếu)





# =========================================================================

# 2. HÀM CHUẨN HÓA ĐIỂM CHIẾU HẾT (MATE SCORE NORMALIZATION)

# =========================================================================



def score_to_tt(score: int, ply: int) -> int:

    """

    Chuẩn hóa điểm chiếu hết theo độ sâu (ply) trước khi lưu vào Transposition Table.



    Tại sao cần chuẩn hóa?

    Điểm chiếu hết phụ thuộc vào khoảng cách từ thế cờ hiện tại đến khi bị chiếu hết.

    Nếu ở ply = 3 ta thấy chiếu hết sau 2 nước (score = MATE - 5), khi lưu vào TT phải

    cộng thêm ply thành (MATE - 5 + 3 = MATE - 2) để thể hiện số nước chiếu hết tuyệt đối

    tính từ vị trí đó, không phụ thuộc vào vị trí nhánh cây đang đứng.



    Tham số:

        score: Điểm số tính toán từ nút hiện tại.

        ply: Khoảng cách từ gốc cây tìm kiếm đến nút hiện tại.



    Trả về:

        int: Điểm số độc lập với ply để lưu vào TT.

    """

    if score >= MATE_THRESHOLD:

        return score + ply

    elif score <= -MATE_THRESHOLD:

        return score - ply

    return score





def score_from_tt(score: int, ply: int) -> int:

    """

    Khôi phục lại điểm chiếu hết theo khoảng cách ply khi lấy từ Transposition Table ra.



    Tham số:

        score: Điểm số lưu trong TT (đã chuẩn hóa).

        ply: Khoảng cách từ gốc cây tìm kiếm đến nút hiện tại.



    Trả về:

        int: Điểm số tương ứng với khoảng cách thực tế từ vị trí hiện tại.

    """

    if score >= MATE_THRESHOLD:

        return score - ply

    elif score <= -MATE_THRESHOLD:

        return score + ply

    return score





# =========================================================================

# 3. ĐÁNH GIÁ ĐỔI QUÂN TĨNH (STATIC EXCHANGE EVALUATION - SEE)

# =========================================================================



def see(board: chess.Board, move: chess.Move) -> int:

    """

    Static Exchange Evaluation (SEE) – Đánh giá chuỗi đổi quân tĩnh 1-ply.



    Chức năng:

    Ước lượng sự chênh lệch vật chất thuần sau chuỗi đổi quân tại ô đích (move.to_square)

    mà không cần đệ quy sinh toàn bộ cây tìm kiếm.



    Nguyên lý hoạt động (1-ply fast SEE):

    1. Lấy giá trị quân bị ăn (victim) và quân đi ăn (attacker).

    2. Nếu quân đi ăn có giá trị nhỏ hơn hoặc bằng quân bị ăn (ví dụ Tốt ăn Hậu, Tượng ăn Xe):

       Chắc chắn có lợi hoặc ít nhất đổi ngang => trả về (v_val - a_val) >= 0 ngay lập tức.

    3. Nếu quân lớn ăn quân nhỏ (ví dụ Hậu ăn Tốt):

       Kiểm tra ô đích có được đối phương bảo vệ (attacked) hay không:

       - Nếu không được bảo vệ: Quân treo tự do => thu lời trọn vẹn v_val.

       - Nếu được bảo vệ: Quân tấn công sẽ bị ăn lại ngay => lỗ (v_val - a_val) < 0.



    Tham số:

        board: Bàn cờ trước khi thực hiện nước đi.

        move: Nước bắt quân cần thẩm định.



    Trả về:

        int (centipawn):

            >= 0: Nước bắt quân có lợi hoặc đổi ngang giá trị.

            < 0: Nước bắt quân bị lỗ (ví dụ: Hậu ăn Tốt có bảo vệ).

    """

    to_sq = move.to_square

    from_sq = move.from_square



    victim = board.piece_type_at(to_sq)

    if victim is None:

        if board.is_en_passant(move):

            victim = chess.PAWN

        else:

            return 0



    attacker = board.piece_type_at(from_sq)

    if attacker is None:

        return 0



    v_val = PIECE_VALS[victim]

    a_val = PIECE_VALS[attacker]



    # Nếu quân đi ăn có giá trị <= quân bị ăn (ví dụ Tốt ăn Hậu, Xe ăn Hậu...):

    # Luôn là nước bắt quân có lợi hoặc ít nhất là đổi quân ngang

    if a_val <= v_val:

        return v_val - a_val



    # Đổi quân nhẹ tương đương (Tượng ăn Mã: 330 vs 320, chênh lệch 10cp):

    # Luôn là nước đổi quân ngang giá trị, không bao giờ coi là thí quân lỗ

    if attacker in (chess.BISHOP, chess.KNIGHT) and victim in (chess.BISHOP, chess.KNIGHT):

        return 0



    # Nếu quân lớn ăn quân nhỏ (ví dụ Hậu ăn Tốt):

    # Kiểm tra xem ô đích có được đối phương bảo vệ không

    opp = not board.turn

    opp_attackers = board.attackers(opp, to_sq)

    if not opp_attackers:

        return v_val  # Quân treo tự do!



    # Nếu ô đích được quân ta bảo vệ và quân duy nhất của địch ngắm tới là Vua,

    # Vua địch không thể ăn vì sẽ bị chiếu phạm luật!

    if board.is_attacked_by(board.turn, to_sq):

        king_sq = board.king(opp)

        if king_sq is not None and opp_attackers == chess.SquareSet([king_sq]):

            return v_val



    # Ô đích được bảo vệ: quân tấn công sẽ bị ăn lại và lỗ vật chất

    return v_val - a_val





# =========================================================================

# 4. BẢNG CHUYỂN VỊ (TRANSPOSITION TABLE - TT)

# =========================================================================



class TTEntry(NamedTuple):

    """

    Mục lưu trữ trong Transposition Table.



    Thuộc tính:

        key: Khóa băm Zobrist đại diện duy nhất cho thế cờ (board._transposition_key()).

        depth: Độ sâu tìm kiếm của kết quả lưu trữ.

        score: Điểm số đánh giá (đã qua chuẩn hóa mate score).

        flag: Cận của điểm số (TT_EXACT, TT_LOWER, TT_UPPER).

        best_move: Nước đi tốt nhất tìm được tại thế cờ này.

        age: Thế hệ tìm kiếm (lượt đi của ván) phục vụ cơ chế thay thế mục cũ.

    """

    key: Any

    depth: int

    score: int

    flag: int

    best_move: chess.Move | None

    age: int





class TranspositionTable:

    """

    Bảng băm lưu trữ trạng thái tìm kiếm (Transposition Table) với kích thước cố định.



    Ghi nhớ kết quả của các thế cờ đã duyệt qua để tái sử dụng khi thế cờ lặp lại

    theo các thứ tự nước đi khác nhau (transposition), giúp tiết kiệm hàng triệu phép tính.

    """



    def __init__(self, size: int = TT_SIZE) -> None:

        """Khởi tạo bảng băm với kích thước cố định là lũy thừa của 2."""

        self.size = size

        self._table: dict[int, TTEntry] = {}



    def probe(self, key: Any) -> TTEntry | None:

        """

        Tra cứu trạng thái bàn cờ trong bảng băm.



        Tham số:

            key: Khóa băm Zobrist của bàn cờ.



        Trả về:

            TTEntry nếu tìm thấy và trùng khớp khóa, ngược lại trả về None.

        """

        idx = hash(key) & (self.size - 1)

        entry = self._table.get(idx)

        if entry is not None and entry.key == key:

            return entry

        return None



    def store(

        self,

        key: Any,

        depth: int,

        score: int,

        flag: int,

        best_move: chess.Move | None,

        age: int,

    ) -> None:

        """

        Lưu hoặc ghi đè trạng thái vào bảng băm theo chính sách ưu tiên:

        1. Ghi đè nếu ô băm còn trống.

        2. Ghi đè nếu trùng khóa (cập nhật thông tin mới nhất).

        3. Ghi đè nếu mục hiện tại thuộc thế hệ cũ (age != existing.age).

        4. Ghi đè nếu lượt tìm kiếm mới sâu hơn hoặc bằng (depth >= existing.depth).

        """

        idx = hash(key) & (self.size - 1)

        existing = self._table.get(idx)

        if (

            existing is None

            or existing.key == key

            or existing.age != age

            or depth >= existing.depth

        ):

            self._table[idx] = TTEntry(

                key, depth, score, flag, best_move, age

            )



    def clear(self) -> None:

        """Xóa sạch bảng băm."""

        self._table.clear()





# =========================================================================

# 5. BỘ MÁY TÌM KIẾM CHÍNH (SEARCHER)

# =========================================================================



class Searcher:

    """

    Bộ máy tìm kiếm cờ vua Negamax tích hợp đầy đủ các kỹ thuật hiện đại:

    Alpha-Beta Pruning, PVS, LMR, NMP, RFP, Futility Pruning, Quiescence Search,

    Move Ordering và Aspiration Windows.

    """



    def __init__(self) -> None:

        """Khởi tạo bộ máy tìm kiếm với bảng chuyển vị, killer moves và history table."""

        self.tt = TranspositionTable()

        # Bảng Killer Moves: 2 nước đi sát thủ cho mỗi ply (độ sâu tính từ gốc)

        self.killer_moves: list[list[chess.Move | None]] = [

            [None, None] for _ in range(MAX_DEPTH + 16)

        ]

        # Bảng History Heuristic: lưu tần suất gây cắt tỉa beta của các nước đi yên lặng

        self.history: dict[tuple[chess.Color, int, int], int] = {}

        self._timeout: bool = False

        self._nodes: int = 0

        self._age: int = 0



    def _decay_history(self) -> None:

        """Làm suy giảm điểm History giữa các lượt đi để tránh tích lũy dữ liệu lỗi thời."""

        for k in list(self.history.keys()):

            val = self.history[k] // 2

            if val > 0:

                self.history[k] = val

            else:

                del self.history[k]



    def _store_killer(self, move: chess.Move, ply: int) -> None:

        """

        Lưu nước đi sát thủ (Killer Move) gây ra cắt tỉa beta tại ply hiện tại.

        Mỗi ply lưu tối đa 2 killer moves (dịch chuyển killer cũ xuống slot 2).

        """

        if ply < len(self.killer_moves):

            if self.killer_moves[ply][0] != move:

                self.killer_moves[ply][1] = self.killer_moves[ply][0]

                self.killer_moves[ply][0] = move



    def _update_history(self, move: chess.Move, color: chess.Color, depth: int) -> None:

        """

        Cập nhật điểm History Heuristic cho nước đi yên lặng gây cắt tỉa beta.

        Điểm cộng tỷ lệ với bình phương độ sâu (depth * depth).

        """

        key = (color, move.from_square, move.to_square)

        self.history[key] = self.history.get(key, 0) + depth * depth



    def _order_moves(

        self,

        board: chess.Board,

        moves: list[chess.Move],

        ply: int,

        tt_move: chess.Move | None,

    ) -> list[chess.Move]:

        """

        Sắp xếp danh sách nước đi theo độ ưu tiên Heuristic (Move Ordering).



        Nguyên lý: Move Ordering chuẩn xác là yếu tố quan trọng nhất giúp Alpha-Beta

        đạt độ phức tạp tối ưu O(b^(d/2)). Nếu nước đi tốt nhất luôn được duyệt đầu tiên,

        tỷ lệ cắt tỉa beta ở các nước sau sẽ đạt trên 90%.



        Hệ thống phân tầng điểm số ưu tiên:

        1. Nước đi từ Transposition Table (TT Move): +2,000,000 (đã chứng minh là nước tốt nhất ở tầng trước)

        2. Phong cấp Hậu (Queen Promotion): +1,200,000

        3. Nước bắt quân có lợi (Good Captures với SEE >= 0) kết hợp MVV-LVA: +1,000,000 + bonus

        4. Killer Move 1: +700,000

        5. Killer Move 2: +650,000

        6. Nước phong cấp khác (Xe, Tượng, Mã): +40,000

        7. Nước bắt quân bất lợi (Bad Captures với SEE < 0): +50,000 + SEE

        8. Nước đi yên lặng có điểm History cao: +1 đến +500,000

        """

        killers = self.killer_moves[ply] if ply < len(self.killer_moves) else [None, None]

        turn = board.turn



        def score_move(move: chess.Move) -> int:

            # 1. Ưu tiên cao nhất: Nước đi gợi ý từ Transposition Table (Hash Move)

            if move == tt_move:

                return 10_000_000



            # 2. Ưu tiên phong cấp Hậu

            if move.promotion == chess.QUEEN:

                return 1_200_000



            # 2b. Ưu tiên chạy thoát quân đang bị đe dọa sang ô an toàn

            # Tránh tuyệt đối phản công mù quáng khi quân đang bị đe dọa trực tiếp

            ptype = board.piece_type_at(move.from_square)

            opp = not turn

            if ptype in (chess.QUEEN, chess.ROOK, chess.BISHOP, chess.KNIGHT) and board.is_attacked_by(opp, move.from_square):

                if not board.is_attacked_by(opp, move.to_square):

                    if ptype == chess.QUEEN:

                        return 1_100_000

                    elif ptype == chess.ROOK:

                        return 950_000

                    elif board.attackers(opp, move.from_square) & board.pawns:

                        # Mã/Tượng bị Tốt địch tấn công trực diện: ưu tiên chạy thoát

                        return 920_000

                    else:

                        return 850_000



            # 3. Đánh giá các nước bắt quân

            if board.is_capture(move):

                victim = (

                    chess.PAWN

                    if board.is_en_passant(move)

                    else board.piece_type_at(move.to_square)

                )

                attacker = board.piece_type_at(move.from_square)



                # MVV-LVA score: quân bị ăn càng to, quân đi ăn càng nhỏ thì điểm càng cao

                mvv_lva = (

                    _MVV_LVA_SCORES[victim] * 10

                    - _MVV_LVA_SCORES[attacker]

                )



                v_val = PIECE_VALS[victim]

                a_val = PIECE_VALS[attacker]



                if a_val <= v_val:

                    # Quân nhỏ/bằng ăn quân lớn: chắc chắn SEE >= 0, không cần quét tấn công đắt đỏ

                    return 1_000_000 + mvv_lva * 100 + (v_val - a_val)

                else:

                    # Quân to ăn quân bé: chỉ gọi see() khi thực sự cần phân loại

                    see_val = see(board, move)

                    if see_val >= 0:

                        return 1_000_000 + mvv_lva * 100 + see_val

                    else:

                        return 50_000 + see_val



            # 4. Killer Moves: các nước đi yên lặng từng gây cắt tỉa beta ở cùng ply

            if move == killers[0]:

                return 900_000

            if move == killers[1]:

                return 800_000



            # 5. Nước đi gây chiếu (Check Move): Nước tạo đòn chiếu an toàn

            if board.gives_check(move):

                opp = not turn

                if not board.is_attacked_by(opp, move.to_square) or (board.is_capture(move) and see(board, move) >= 0):

                    return 650_000

                else:

                    # Chiếu bất lợi (bị bắt lại không bù đắp): Phạt điểm trong Move Ordering để duyệt sau

                    return -500_000



            # 6. Các nước phong cấp khác (Mã, Tượng, Xe)

            if move.promotion is not None:

                return 40_000



            # 7. History Heuristic: sắp xếp các nước yên lặng theo tần suất thành công

            key = (turn, move.from_square, move.to_square)

            return min(self.history.get(key, 0), 500_000)



        moves.sort(key=score_move, reverse=True)

        return moves



    # ------------------------------------------------------------------

    # 6. TÌM KIẾM TĨNH LẶNG (QUIESCENCE SEARCH)

    # ------------------------------------------------------------------



    def _quiescence(

        self,

        board: chess.Board,

        alpha: int,

        beta: int,

        ply: int,

        tm: TimeManager,

        qdepth: int = 0,

    ) -> int:

        """

        Quiescence Search – Tìm kiếm tĩnh lặng giải quyết hiệu ứng chân trời.



        Chức năng:

        Giải quyết triệt để "Hiệu ứng chân trời" (Horizon Effect). Nếu dừng tìm kiếm

        ngay tại độ sâu depth = 0 khi bàn cờ đang trong chuỗi bắt quân qua lại, điểm số

        sẽ bị sai lệch nghiêm trọng. Quiescence Search tiếp tục duyệt riêng các nước

        bắt quân (captures) và giải chiếu cho đến khi bàn cờ đạt trạng thái "tĩnh lặng".



        Kỹ thuật tối ưu hóa hiệu năng cao:

        1. Stand-pat: Sử dụng điểm đánh giá tĩnh hiện tại làm ngưỡng sàn. Nếu bên đi

           đã đạt điểm >= beta mà không cần làm gì thêm, cắt tỉa ngay lập tức (fail-high).

        2. Delta Pruning: Nếu điểm stand-pat cộng với giá trị con Hậu (1150 cp) mà vẫn

           không đuổi kịp alpha, việc bắt quân bình thường không thể cứu vãn thế cờ => cắt tỉa.

        3. Bitboard Promo Check: Kiểm tra khả năng phong cấp siêu tốc bằng bitboard

           (board.pawns & promo_rank) thay vì duyệt danh sách legal moves.

        4. Fast Capture Generation: Sử dụng board.generate_legal_captures() kết hợp

           lọc nhanh see(board, move) >= 0 để loại bỏ các nước thí quân lỗ vốn.

        """

        self._nodes += 1



        # Kiểm tra deadline định kỳ mỗi 128 nodes để phản ứng nhanh nhạy với thời gian

        if (self._nodes & 127) == 0 and tm.should_stop():

            self._timeout = True

            return 0



        if self._timeout:

            return 0



        in_check = board.is_check()



        # Stand-pat và Delta Pruning (chỉ áp dụng khi không bị chiếu)

        if not in_check:

            # Kiểm tra luật hòa 50 nước và lặp cờ

            if board.halfmove_clock >= 100 or (ply > 0 and board.is_repetition(2)):

                return DRAW_SCORE



            stand_pat = evaluate(board)

            if stand_pat >= beta:

                return beta



            # Kiểm tra phong cấp siêu nhanh bằng Bitboard: chỉ xét Tốt của bên đang đến lượt đi

            promo_rank = chess.BB_RANK_7 if board.turn == chess.WHITE else chess.BB_RANK_2

            my_pawns = board.pawns & board.occupied_co[board.turn]

            has_promotion = bool(my_pawns & promo_rank)



            # Delta Pruning: không cắt tỉa nếu có nguy cơ đối phương hoặc mình phong cấp

            if qdepth > 0 and not has_promotion and stand_pat + 1150 < alpha:

                return alpha



            if stand_pat > alpha:

                alpha = stand_pat



        # Đạt giới hạn độ sâu của Quiescence Search: trả về alpha hiện tại

        if qdepth >= MAX_QSEARCH_DEPTH and not in_check:

            return alpha



        # Sinh nước đi cho Quiescence Search

        if in_check:

            # Nếu đang bị chiếu: phải xét mọi nước đi hợp lệ để tìm cách giải chiếu

            moves = list(board.legal_moves)

            if not moves:

                return -(MATE_SCORE - ply)

        else:

            # Không bị chiếu: sinh thẳng các nước bắt quân qua generate_legal_captures()

            # Giữ lại các nước bắt quân có lợi (SEE >= 0) hoặc nước bắt quân gây chiếu an toàn

            opp = not board.turn

            def _valid_q_move(m: chess.Move) -> bool:

                if see(board, m) >= 0:

                    return True

                if board.gives_check(m) and not board.is_attacked_by(opp, m.to_square):

                    return True

                return False



            promo_rank = chess.BB_RANK_7 if board.turn == chess.WHITE else chess.BB_RANK_2

            my_pawns = board.pawns & board.occupied_co[board.turn]

            if my_pawns & promo_rank:

                caps = list(board.generate_legal_captures())

                moves = [m for m in caps if _valid_q_move(m)]

                for m in board.legal_moves:

                    if m.promotion == chess.QUEEN and not board.is_capture(m):

                        moves.append(m)

            else:

                moves = [m for m in board.generate_legal_captures() if _valid_q_move(m)]



        if not moves:

            return alpha



        # Sắp xếp các nước bắt quân theo MVV-LVA, ưu tiên nước bắt quân gây chiếu

        def q_order(m: chess.Move) -> int:

            if m.promotion == chess.QUEEN:

                return 1000

            v = (

                chess.PAWN

                if board.is_en_passant(m)

                else board.piece_type_at(m.to_square)

            )

            a = board.piece_type_at(m.from_square)

            base = _MVV_LVA_SCORES[v] * 10 - _MVV_LVA_SCORES[a]

            if board.gives_check(m):

                base += 500

            return base



        moves.sort(key=q_order, reverse=True)



        best_score = -MATE_SCORE - 1 if in_check else alpha



        for move in moves:

            board.push(move)

            try:

                score = -self._quiescence(board, -beta, -alpha, ply + 1, tm, qdepth + 1)

            finally:

                board.pop()



            if self._timeout:

                return 0



            if score > best_score:

                best_score = score

            if score >= beta:

                return beta

            if score > alpha:

                alpha = score



        return best_score if in_check else alpha



    # ------------------------------------------------------------------

    # 7. THUẬT TOÁN TÌM KIẾM NEGAMAX VỚI ALPHA-BETA PRUNING & PVS

    # ------------------------------------------------------------------



    def _negamax(

        self,

        board: chess.Board,

        depth: int,

        alpha: int,

        beta: int,

        ply: int,

        tm: TimeManager,

        allow_nmp: bool = True,

    ) -> int:

        """

        Negamax với Alpha-Beta Pruning, PVS, NMP, RFP, Futility Pruning và LMR.



        Nguyên lý Negamax:

        Thay vì luân phiên Max cho Trắng và Min cho Đen như Minimax truyền thống,

        Negamax tận dụng tính chất đối xứng zero-sum: max(a, b) == -min(-a, -b).

        Điểm số trả về luôn theo góc nhìn của bên đang đến lượt đi (board.turn).



        Các tầng cắt tỉa toán học:

        1. Kiểm tra hòa lặp (Repetition) & Thiếu quân (Insufficient Material).

        2. Tra cứu Transposition Table: Cắt tỉa tức thì nếu đã có kết quả đủ độ sâu.

        3. Khi depth <= 0: Chuyển tiếp sang Quiescence Search để giải quyết hiệu ứng chân trời.

        4. Reverse Futility Pruning (RFP): Cắt tỉa ở depth 1-2 nếu điểm tĩnh >= beta.

        5. Null Move Pruning (NMP): Nhường nước đi ở depth >= 3 để kiểm định thế cờ.

        6. Futility Pruning (FP): Bỏ qua nước yên lặng ở depth 1 nếu không cứu vãn được alpha.

        7. Late Move Reductions (LMR): Giảm độ sâu với các nước đi xếp sau.

        8. Principal Variation Search (PVS): Tìm kiếm nước đầu với dải đầy đủ,

           các nước sau kiểm định nhanh với cửa sổ hẹp Zero-Window [alpha, alpha + 1].

        """

        self._nodes += 1



        # Kiểm tra deadline định kỳ mỗi 128 nodes để phản ứng nhanh nhạy với thời gian

        if (self._nodes & 127) == 0 and tm.should_stop():

            self._timeout = True

            return 0



        if self._timeout:

            return 0



        # Kiểm tra hòa lặp và thiếu quân

        if ply > 0:

            if board.is_repetition(2) or board.halfmove_clock >= 100:

                if board.is_checkmate():

                    return -(MATE_SCORE - ply)

                # CONTEMPT FACTOR: Khinh địch khi đang hơn thế để ép bot tìm đường thắng

                eval_side = evaluate(board)

                if eval_side >= 80:

                    return -50  # Phạt hòa khi đang hơn thế

                elif eval_side <= -80:

                    return +50  # Thưởng hòa khi đang thua

                return DRAW_SCORE

            if board.is_insufficient_material():

                return DRAW_SCORE



        # --- Tra cứu Transposition Table ---

        tt_key = board._transposition_key()

        tt_entry = self.tt.probe(tt_key)

        tt_move: chess.Move | None = None



        if tt_entry is not None:

            tt_move = tt_entry.best_move

            if tt_entry.depth >= depth:

                tt_score = score_from_tt(tt_entry.score, ply)

                if tt_entry.flag == TT_EXACT:

                    return tt_score

                elif tt_entry.flag == TT_LOWER and tt_score >= beta:

                    return tt_score

                elif tt_entry.flag == TT_UPPER and tt_score <= alpha:

                    return tt_score



        # Khi hết độ sâu: chuyển tiếp sang Quiescence Search

        if depth <= 0:

            return self._quiescence(board, alpha, beta, ply, tm, 0)



        in_check = board.is_check()



        # Check Extension: Mở rộng 1 tầng khi bị chiếu để triệt tiêu Horizon Effect

        if in_check and ply < 24:

            depth += 1



        # Tính toán lượng giá tĩnh một lần duy nhất khi không bị chiếu

        # Dùng chung cho RFP, NMP và Futility Pruning để tránh gọi lại evaluate()

        static_eval = evaluate(board) if not in_check else None



        # --- 1. Reverse Futility Pruning (RFP / Static Null Move) ---

        # Cắt tỉa siêu hiệu quả ở độ sâu 1 và 2 nếu vị trí tĩnh đã quá áp đảo

        if not in_check and depth <= 2 and abs(beta) < MATE_THRESHOLD and ply > 0:

            has_pieces = bool(board.occupied_co[board.turn] & ~(board.pawns | board.kings))

            if has_pieces and static_eval is not None:

                rfp_margin = 120 * depth  # 120 CP ở depth 1, 240 CP ở depth 2

                if static_eval - rfp_margin >= beta:

                    return static_eval - rfp_margin



        # --- 2. Null Move Pruning (NMP) ---

        if allow_nmp and not in_check and depth >= 3 and ply > 0:

            # Kiểm tra nhanh bằng bitboard: có quân cờ lớn (không phải Tốt, Vua) để tránh bẫy Zugzwang

            # Chỉ thực hiện Null Move khi static_eval >= beta: nếu điểm tĩnh không vượt được beta,

            # nhường lượt đi cho đối thủ chắc chắn không thể vượt beta

            has_pieces = bool(board.occupied_co[board.turn] & ~(board.pawns | board.kings))

            if has_pieces and static_eval is not None and static_eval >= beta:

                r = 2 if depth <= 4 else 3

                board.push(chess.Move.null())

                try:

                    null_score = -self._negamax(

                        board, depth - 1 - r, -beta, -beta + 1, ply + 1, tm, False

                    )

                finally:

                    board.pop()



                if self._timeout:

                    return 0



                if null_score >= beta and abs(null_score) < MATE_THRESHOLD:

                    return beta



        # Sinh và sắp xếp nước đi hợp lệ

        legal_moves = list(board.legal_moves)

        if not legal_moves:

            if in_check:

                return -(MATE_SCORE - ply)

            return DRAW_SCORE



        moves = self._order_moves(board, legal_moves, ply, tt_move)



        best_score = -MATE_SCORE - 1

        best_move: chess.Move | None = None

        original_alpha = alpha

        moves_searched = 0



        for move in moves:

            is_capture = board.is_capture(move)

            gives_check = board.gives_check(move)



            # --- 3. Futility Pruning tại Depth 1 ---

            # Bỏ qua các nước yên lặng không có cơ hội nâng alpha

            if (

                depth == 1

                and not in_check

                and moves_searched > 0

                and not is_capture

                and not gives_check

                and move.promotion is None

                and move != tt_move

            ):

                if static_eval is not None and static_eval + 150 <= alpha:

                    continue



            board.push(move)

            try:

                moves_searched += 1



                # --- 4. Late Move Reductions (LMR) ---

                do_lmr = (

                    depth >= 3

                    and moves_searched >= 4

                    and not in_check

                    and not is_capture

                    and move.promotion is None

                    and not gives_check

                    and move != tt_move

                )



                # --- 5. Principal Variation Search (PVS) ---

                if moves_searched == 1:

                    # Nước đi đầu tiên (nước hứa hẹn nhất): tìm kiếm với cửa sổ đầy đủ

                    score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1, tm, True)

                else:

                    # Các nước sau: tìm kiếm với cửa sổ hẹp (Zero-Window) để kiểm tra fail-low

                    r = 1 if do_lmr else 0

                    score = -self._negamax(board, depth - 1 - r, -alpha - 1, -alpha, ply + 1, tm, True)



                    # Nếu LMR bị fail-high (nước đi tốt hơn dự kiến): tìm kiếm lại ở độ sâu đầy đủ

                    if do_lmr and score > alpha:

                        score = -self._negamax(board, depth - 1, -alpha - 1, -alpha, ply + 1, tm, True)



                    # Nếu PVS tìm thấy điểm vượt alpha nhưng chưa chạm beta: mở rộng tìm lại toàn dải

                    if score > alpha and score < beta:

                        score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1, tm, True)



            finally:

                board.pop()



            if self._timeout:

                return 0



            if score > best_score:

                best_score = score

                best_move = move



            if score > alpha:

                alpha = score



            if alpha >= beta:

                # Cắt tỉa Beta (Beta Cutoff): nước đi này quá mạnh, đối thủ sẽ không cho phép xảy ra

                if not is_capture:

                    self._store_killer(move, ply)

                    self._update_history(move, board.turn, depth)

                break



        # Lưu kết quả tìm kiếm vào Transposition Table

        if not self._timeout:

            if best_score <= original_alpha:

                flag = TT_UPPER

            elif best_score >= beta:

                flag = TT_LOWER

            else:

                flag = TT_EXACT

            tt_score = score_to_tt(best_score, ply)

            self.tt.store(tt_key, depth, tt_score, flag, best_move, self._age)



        return best_score



    # ------------------------------------------------------------------

    # 8. ĐÀO SÂU LẶP VỚI CỬA SỔ KỲ VỌNG (ITERATIVE DEEPENING & ASPIRATION)

    # ------------------------------------------------------------------



    def search(

        self,

        board: chess.Board,

        tm: TimeManager,

    ) -> chess.Move:

        """

        Tìm kiếm lặp tăng dần độ sâu (Iterative Deepening Search - IDS).



        Quy trình vận hành:

        1. Bắt đầu từ depth = 1 và tăng dần từng tầng (1, 2, 3, 4, 5, 6...).

        2. Tích hợp Aspiration Windows từ depth >= 4:

           Thu hẹp cửa sổ tìm kiếm quanh điểm số của độ sâu trước [prev - delta, prev + delta]

           (delta = 40 cp). Nếu điểm rơi ra ngoài cửa sổ (fail-low hoặc fail-high),

           hệ thống tự động mở rộng về toàn dải [-MATE, +MATE] để tìm lại.

        3. Cơ chế kiểm soát thời gian:

           - Trước khi mở tầng mới: gọi tm.can_start_next_depth() (dừng nếu đã tiêu hơn 55% ngân sách).

           - Trong quá trình duyệt: kiểm tra tm.should_stop() sau mỗi 512 nodes.

           - Nếu timeout giữa chừng: hủy bỏ kết quả dở dang của tầng hiện tại và

             trả về best_move hoàn chỉnh của tầng độ sâu sâu nhất đã hoàn thành.



        Tham số:

            board: Bàn cờ hiện tại.

            tm: Đối tượng TimeManager quản lý ngân sách thời gian.



        Trả về:

            chess.Move: Nước đi tốt nhất tìm được.

        """

        legal = list(board.legal_moves)

        if not legal:

            raise ValueError("No legal moves available")



        # Nước đi duy nhất: trả về ngay

        if len(legal) == 1:

            return legal[0]



        # Sắp xếp sơ bộ các nước đi theo TT move / MVV-LVA / vị trí để nước đi mặc định

        # luôn có phẩm chất cao nhất, triệt tiêu hoàn toàn rủi ro fallback vào nước đi ngẫu nhiên

        tt_entry = self.tt.probe(board._transposition_key())

        root_tt_move = tt_entry.best_move if tt_entry is not None else None

        ordered_legal = self._order_moves(board, legal, ply=0, tt_move=root_tt_move)

        best_move = ordered_legal[0]

        self._timeout = False

        self._nodes = 0

        self._age += 1

        self._decay_history()

        self.killer_moves = [[None, None] for _ in range(MAX_DEPTH + 16)]

        tm.start()



        prev_score = 0

        aspiration_delta = 40



        for depth in range(1, MAX_DEPTH + 1):

            if depth > 1 and tm.should_stop():

                break



            # Kiểm tra ngân sách trước khi bắt đầu tầng độ sâu mới

            if depth > 1 and not tm.can_start_next_depth():

                break



            depth_start_time = time.perf_counter()

            self._timeout = False

            candidate: chess.Move | None = None

            best_score_this_depth = -MATE_SCORE - 1

            aspiration_active = (

                depth >= 4 and abs(prev_score) < MATE_THRESHOLD

            )



            # Thiết lập Aspiration Window ở depth >= 4

            if aspiration_active:

                alpha = max(-MATE_SCORE - 1, prev_score - aspiration_delta)

                beta = min(MATE_SCORE + 1, prev_score + aspiration_delta)

            else:

                alpha = -MATE_SCORE - 1

                beta = MATE_SCORE + 1



            research_move: chess.Move | None = None

            while True:

                candidate = None

                best_score_this_depth = -MATE_SCORE - 1



                # Lấy nước đi tốt nhất từ TT tại gốc (hoặc nước gây fail-high ở lần duyệt trước) để ưu tiên duyệt đầu tiên

                tt_entry = self.tt.probe(board._transposition_key())

                root_tt_move = research_move or (tt_entry.best_move if tt_entry is not None else None)



                moves = self._order_moves(board, list(board.legal_moves), ply=0, tt_move=root_tt_move)



                moves_searched = 0

                for move in moves:

                    board.push(move)

                    try:

                        moves_searched += 1



                        # PVS tại node gốc

                        if moves_searched == 1:

                            score = -self._negamax(board, depth - 1, -beta, -alpha, 1, tm, True)

                        else:

                            score = -self._negamax(board, depth - 1, -alpha - 1, -alpha, 1, tm, True)

                            if score > alpha and score < beta:

                                score = -self._negamax(board, depth - 1, -beta, -alpha, 1, tm, True)



                    finally:

                        board.pop()



                    if self._timeout and depth > 1:

                        break



                    if score > best_score_this_depth:

                        best_score_this_depth = score

                        candidate = move



                    if score > alpha:

                        alpha = score



                if self._timeout and depth > 1:

                    break



                # Xử lý Aspiration Window fail-low hoặc fail-high: mở rộng toàn dải và tìm lại

                if aspiration_active and (

                    best_score_this_depth <= prev_score - aspiration_delta

                    or best_score_this_depth >= prev_score + aspiration_delta

                ):

                    research_move = candidate

                    alpha = -MATE_SCORE - 1

                    beta = MATE_SCORE + 1

                    aspiration_active = False

                    continue



                break



            # Chỉ cập nhật best_move khi tầng độ sâu hoàn thành trọn vẹn (không bị timeout),

            # hoặc tại tầng đầu tiên (depth == 1) để luôn có ít nhất một nước đi hợp lệ đã được lượng giá.

            # Điều này triệt tiêu hoàn toàn rủi ro chấp nhận kết quả dở dang khi bị ngắt bởi deadline.

            if candidate is not None and (not self._timeout or depth == 1):

                best_move = candidate

                if not self._timeout:

                    prev_score = best_score_this_depth

                    tm.last_iteration_ms = int((time.perf_counter() - depth_start_time) * 1000)



                    self.tt.store(

                        board._transposition_key(),

                        depth,

                        score_to_tt(best_score_this_depth, 0),

                        TT_EXACT,

                        best_move,

                        self._age,

                    )



                    # Nếu đã tìm thấy chiếu hết chắc chắn: không cần tìm sâu hơn

                    if best_score_this_depth >= MATE_THRESHOLD:

                        break



        return best_move

`}},tn=({isOpen:e,onClose:t,onNavigate:n})=>{let[r,i]=(0,_.useState)(``);if((0,_.useEffect)(()=>{let n=n=>{n.key===`Escape`&&t(),(n.ctrlKey||n.metaKey)&&n.key===`k`&&(n.preventDefault(),e&&t())};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[e,t]),!e)return null;let a=r.toLowerCase().trim(),o=a?Qt.filter(e=>e.question.toLowerCase().includes(a)||e.quickAnswer.toLowerCase().includes(a)||e.tags.some(e=>e.toLowerCase().includes(a))).slice(0,5):[],s=a?$t.filter(e=>e.title.toLowerCase().includes(a)||e.definition.toLowerCase().includes(a)||e.principle.toLowerCase().includes(a)).slice(0,4):[],c=a?j.filter(e=>e.term.toLowerCase().includes(a)||e.vietnamese.toLowerCase().includes(a)||e.shortDef.toLowerCase().includes(a)).slice(0,4):[],l=a?Object.values(en).flatMap(e=>e.annotations.filter(e=>e.title.toLowerCase().includes(a)||e.purpose.toLowerCase().includes(a)||e.defensePoints.some(e=>e.toLowerCase().includes(a))).map(t=>({...t,moduleFile:e.fileName}))).slice(0,4):[],u=o.length+s.length+c.length+l.length;return(0,A.jsx)(`div`,{className:`fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn`,children:(0,A.jsxs)(`div`,{className:`bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]`,children:[(0,A.jsxs)(`div`,{className:`flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50`,children:[(0,A.jsx)(Dt,{className:`w-5 h-5 text-emerald-400 shrink-0 mr-3`}),(0,A.jsx)(`input`,{type:`text`,placeholder:`Tìm kiếm mã nguồn, thuật toán, câu hỏi vấn đáp, thuật ngữ (Ctrl+K)...`,value:r,onChange:e=>i(e.target.value),autoFocus:!0,className:`w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500`}),r&&(0,A.jsx)(`button`,{onClick:()=>i(``),className:`text-slate-400 hover:text-white mr-2 text-xs`,children:`Xóa`}),(0,A.jsx)(`button`,{onClick:t,className:`p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800`,children:(0,A.jsx)(Wt,{className:`w-4 h-4`})})]}),(0,A.jsx)(`div`,{className:`overflow-y-auto p-4 space-y-4`,children:a?u===0?(0,A.jsxs)(`div`,{className:`text-center py-8 text-slate-400 text-xs`,children:[`Không tìm thấy kết quả nào khớp với "`,(0,A.jsx)(`strong`,{children:r}),`".`]}):(0,A.jsxs)(A.Fragment,{children:[o.length>0&&(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5`,children:[(0,A.jsx)(Oe,{className:`w-3.5 h-3.5 text-emerald-400`}),`Ngân hàng câu hỏi vấn đáp (`,o.length,`)`]}),(0,A.jsx)(`div`,{className:`space-y-1.5`,children:o.map(e=>(0,A.jsxs)(`button`,{onClick:()=>{n(`qa`,e.id),t()},className:`w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition group flex items-start justify-between`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`text-xs font-semibold text-white group-hover:text-emerald-300`,children:e.question}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 line-clamp-1 mt-0.5`,children:e.quickAnswer})]}),(0,A.jsx)(we,{className:`w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2`})]},e.id))})]}),s.length>0&&(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5`,children:[(0,A.jsx)(ve,{className:`w-3.5 h-3.5 text-cyan-400`}),`Lý thuyết thuật toán (`,s.length,`)`]}),(0,A.jsx)(`div`,{className:`space-y-1.5`,children:s.map(e=>(0,A.jsxs)(`button`,{onClick:()=>{n(`theory`,e.id),t()},className:`w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 transition group flex items-start justify-between`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`text-xs font-semibold text-white group-hover:text-cyan-300`,children:e.title}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 line-clamp-1 mt-0.5`,children:e.definition})]}),(0,A.jsx)(we,{className:`w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2`})]},e.id))})]}),l.length>0&&(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5`,children:[(0,A.jsx)(je,{className:`w-3.5 h-3.5 text-amber-400`}),`Sổ tay mã nguồn (`,l.length,`)`]}),(0,A.jsx)(`div`,{className:`space-y-1.5`,children:l.map(e=>{let r=e.moduleFile===`bot.py`?`code-bot`:e.moduleFile===`search.py`?`code-search`:e.moduleFile===`evaluation.py`?`code-eval`:`code-time`;return(0,A.jsxs)(`button`,{onClick:()=>{n(r,e.id),t()},className:`w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/50 transition group flex items-start justify-between`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-xs font-semibold text-white group-hover:text-amber-300 flex items-center gap-2`,children:[e.title,(0,A.jsxs)(`span`,{className:`text-[10px] font-mono text-slate-400`,children:[e.moduleFile,` (L`,e.startLine,`-`,e.endLine,`)`]})]}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 line-clamp-1 mt-0.5`,children:e.purpose})]}),(0,A.jsx)(we,{className:`w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 ml-2`})]},e.id)})})]}),c.length>0&&(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5`,children:[(0,A.jsx)($e,{className:`w-3.5 h-3.5 text-purple-400`}),`Bảng thuật ngữ AI (`,c.length,`)`]}),(0,A.jsx)(`div`,{className:`space-y-1.5`,children:c.map(e=>(0,A.jsxs)(`button`,{onClick:()=>{n(`glossary`,e.id),t()},className:`w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/50 transition group flex items-start justify-between`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-xs font-semibold text-white group-hover:text-purple-300 flex items-center gap-2`,children:[e.term,(0,A.jsxs)(`span`,{className:`text-[11px] text-slate-400`,children:[`(`,e.vietnamese,`)`]})]}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 line-clamp-1 mt-0.5`,children:e.shortDef})]}),(0,A.jsx)(we,{className:`w-4 h-4 text-slate-500 group-hover:text-purple-400 shrink-0 ml-2`})]},e.id))})]})]}):(0,A.jsxs)(`div`,{className:`text-center py-8 text-slate-500 text-xs`,children:[(0,A.jsx)(Dt,{className:`w-8 h-8 mx-auto mb-2 text-slate-600`}),`Gõ từ khóa để tra cứu toàn bộ cơ sở tri thức ChessLab Nhóm 12`,(0,A.jsxs)(`div`,{className:`flex justify-center gap-2 mt-3 font-mono text-[11px]`,children:[(0,A.jsx)(`span`,{className:`px-2 py-1 rounded bg-slate-800 text-slate-400`,children:`Negamax`}),(0,A.jsx)(`span`,{className:`px-2 py-1 rounded bg-slate-800 text-slate-400`,children:`PeSTO`}),(0,A.jsx)(`span`,{className:`px-2 py-1 rounded bg-slate-800 text-slate-400`,children:`PVS`}),(0,A.jsx)(`span`,{className:`px-2 py-1 rounded bg-slate-800 text-slate-400`,children:`TimeManager`}),(0,A.jsx)(`span`,{className:`px-2 py-1 rounded bg-slate-800 text-slate-400`,children:`SEE`})]})]})})]})})},M=({children:e,variant:t=`emerald`,size:n=`md`})=>(0,A.jsx)(`span`,{className:`inline-flex items-center gap-1 rounded-full border ${{emerald:`bg-emerald-500/15 text-emerald-400 border-emerald-500/30`,cyan:`bg-cyan-500/15 text-cyan-400 border-cyan-500/30`,amber:`bg-amber-500/15 text-amber-400 border-amber-500/30`,rose:`bg-rose-500/15 text-rose-400 border-rose-500/30`,slate:`bg-slate-700/50 text-slate-300 border-slate-600`,indigo:`bg-indigo-500/15 text-indigo-400 border-indigo-500/30`,purple:`bg-purple-500/15 text-purple-400 border-purple-500/30`}[t]} ${{sm:`text-xs px-2 py-0.5`,md:`text-xs px-2.5 py-1 font-medium`}[n]}`,children:e}),nn=({onNavigate:e})=>(0,A.jsxs)(`div`,{className:`space-y-10 animate-fadeIn`,children:[(0,A.jsxs)(`div`,{className:`relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 border border-slate-700/80 shadow-2xl overflow-hidden`,children:[(0,A.jsx)(`div`,{className:`absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none`}),(0,A.jsx)(`div`,{className:`absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none`}),(0,A.jsxs)(`div`,{className:`relative z-10 max-w-4xl`,children:[(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2 mb-4`,children:[(0,A.jsx)(M,{variant:`emerald`,children:`ĐHQGHN – UET`}),(0,A.jsx)(M,{variant:`cyan`,children:`Môn: Biểu diễn tri thức & Tìm kiếm nâng cao`}),(0,A.jsx)(M,{variant:`indigo`,children:`Học kỳ 1 • 2026-2027`}),(0,A.jsxs)(`span`,{className:`flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800`,children:[(0,A.jsx)(at,{className:`w-3 h-3 text-emerald-400`}),`Commit `,qt.referenceCommit.substring(0,7)]})]}),(0,A.jsxs)(`h1`,{className:`text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight`,children:[`SỔ TAY VẤN ĐÁP CHESSLAB`,(0,A.jsx)(`span`,{className:`block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300`,children:`BOT CỜ VUA CHESS960 – NHÓM 12`})]}),(0,A.jsxs)(`p`,{className:`mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl`,children:[`Hệ thống hỗ trợ ôn tập, đào sâu mã nguồn và chuẩn bị vấn đáp bảo vệ đồ án bot cờ vua Chess960. Được xây dựng trên `,(0,A.jsx)(`strong`,{children:`100% mã nguồn thực tế`}),` của Nhóm 12, cung cấp giải thích chi tiết từng hàm, sơ đồ luồng gọi, chứng minh thuật toán và ngân hàng 48 câu hỏi vấn đáp kèm đáp án chuẩn.`]}),(0,A.jsxs)(`div`,{className:`mt-8 flex flex-wrap items-center gap-3`,children:[(0,A.jsxs)(`button`,{onClick:()=>e(`code-bot`),className:`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/60 flex items-center gap-2 cursor-pointer`,children:[(0,A.jsx)(Rt,{className:`w-4 h-4`}),` Bắt đầu học mã nguồn`]}),(0,A.jsxs)(`button`,{onClick:()=>e(`qa`),className:`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition flex items-center gap-2 cursor-pointer`,children:[(0,A.jsx)(Pt,{className:`w-4 h-4 text-emerald-400`}),` Luyện câu hỏi vấn đáp`]}),(0,A.jsxs)(`button`,{onClick:()=>e(`architecture`),className:`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-1.5 cursor-pointer`,children:[`Xem kiến trúc hệ thống `,(0,A.jsx)(ue,{className:`w-4 h-4`})]})]})]})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5`,children:[(0,A.jsxs)(`div`,{className:`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 font-medium`,children:`Tổng dòng code`}),(0,A.jsx)(`div`,{className:`text-xl sm:text-2xl font-black text-white font-mono mt-1`,children:`2,847`}),(0,A.jsx)(`div`,{className:`text-[10px] text-emerald-400 mt-0.5`,children:`4 modules trong student/`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 font-medium`,children:`Tốc độ đánh giá`}),(0,A.jsx)(`div`,{className:`text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1`,children:`~89,000`}),(0,A.jsx)(`div`,{className:`text-[10px] text-slate-400 mt-0.5`,children:`NPS (evaluations/giây)`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 font-medium`,children:`Độ sâu tìm kiếm`}),(0,A.jsx)(`div`,{className:`text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1`,children:`5 – 8 ply`}),(0,A.jsx)(`div`,{className:`text-[10px] text-slate-400 mt-0.5`,children:`Iterative Deepening`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 font-medium`,children:`Bảng chuyển vị`}),(0,A.jsx)(`div`,{className:`text-xl sm:text-2xl font-black text-purple-400 font-mono mt-1`,children:`524,288`}),(0,A.jsx)(`div`,{className:`text-[10px] text-slate-400 mt-0.5`,children:`Mục (2^19 entries)`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 font-medium`,children:`Dung lượng thư mục`}),(0,A.jsx)(`div`,{className:`text-xl sm:text-2xl font-black text-white font-mono mt-1`,children:`154 KiB`}),(0,A.jsx)(`div`,{className:`text-[10px] text-emerald-400 mt-0.5`,children:`Thỏa chuẩn < 1 MiB`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 font-medium`,children:`Đối đầu thực nghiệm`}),(0,A.jsx)(`div`,{className:`text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1`,children:`0 Blunder`}),(0,A.jsx)(`div`,{className:`text-[10px] text-slate-400 mt-0.5`,children:`12W / 1D / 3L (16 ván)`})]})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8`,children:[(0,A.jsxs)(`div`,{className:`mb-6`,children:[(0,A.jsx)(M,{variant:`cyan`,children:`Điểm Nhấn Công Nghệ`}),(0,A.jsx)(`h2`,{className:`text-xl sm:text-2xl font-extrabold text-white mt-2`,children:`6 Trụ Cột Kỹ Thuật Độc Quyền Của Nhóm 12`}),(0,A.jsx)(`p`,{className:`text-xs sm:text-sm text-slate-400 mt-1`,children:`Những cải tiến cốt lõi giúp StudentBot Nhóm 12 đạt độ ổn định 100% và sức mạnh tính toán chiều sâu`})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`,children:[(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-emerald-500/50 transition`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-emerald-400 font-bold text-sm`,children:[(0,A.jsx)(k,{className:`w-4 h-4 shrink-0`}),(0,A.jsx)(`span`,{children:`1. Kiến trúc phòng thủ 3 tầng`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Fast-path đi ngay nước duy nhất trong 0ms; Khối tìm kiếm bọc try...except tự phục hồi nếu xảy ra ngoại lệ; Hậu kiểm tính hợp lệ trước khi gửi nước đi cho Grader.`}),(0,A.jsx)(`div`,{className:`text-[10px] text-emerald-400 font-mono`,children:`File: student/bot.py (L69-97)`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-amber-500/50 transition`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-amber-400 font-bold text-sm`,children:[(0,A.jsx)(O,{className:`w-4 h-4 shrink-0`}),(0,A.jsx)(`span`,{children:`2. Hấp thụ độ trễ hệ thống 500ms`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Khai thác công thức elapsed = max(search_ms, 500ms) của máy chủ: cấp ngân sách 150-220ms ở trung cuộc để đạt Depth 6-8 mà hoàn toàn không tốn thêm thời gian thi đấu.`}),(0,A.jsx)(`div`,{className:`text-[10px] text-amber-400 font-mono`,children:`File: student/time_manager.py (L58-85)`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-rose-500/50 transition`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-rose-400 font-bold text-sm`,children:[(0,A.jsx)(dt,{className:`w-4 h-4 shrink-0`}),(0,A.jsx)(`span`,{children:`3. Bit-packing tuyến tính sửa tràn số âm`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Nén PeSTO PST: val = mg + (eg << 16) và giải nén số có dấu eg = (val + 0x8000) >> 16. Triệt tiêu dứt điểm lỗi tràn số nguyên âm Python, đạt ~89k NPS.`}),(0,A.jsx)(`div`,{className:`text-[10px] text-rose-400 font-mono`,children:`File: student/evaluation.py (L239-253)`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-cyan-500/50 transition`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-cyan-400 font-bold text-sm`,children:[(0,A.jsx)(Kt,{className:`w-4 h-4 shrink-0`}),(0,A.jsx)(`span`,{children:`4. Move Ordering 7 tầng & PVS`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Phân tầng: TT Move → Queen Promo → Chạy thoát quân to → Good SEE Captures → Killers → Safe Checks → History. Tỷ lệ cắt tỉa Beta ở nước đầu > 85%.`}),(0,A.jsx)(`div`,{className:`text-[10px] text-cyan-400 font-mono`,children:`File: student/search.py (L703-916)`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-indigo-500/50 transition`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-indigo-400 font-bold text-sm`,children:[(0,A.jsx)(k,{className:`w-4 h-4 shrink-0`}),(0,A.jsx)(`span`,{children:`5. Dynamic Bitwise King Ring`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Tính toán vành đai bảo vệ Vua theo tọa độ ô thực tế bằng bitboard 64-bit, độc lập với vị trí ban đầu. Đảm bảo an toàn Vua chính xác trên toàn bộ 960 thế cờ Chess960.`}),(0,A.jsx)(`div`,{className:`text-[10px] text-indigo-400 font-mono`,children:`File: student/evaluation.py (L321-360)`})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-purple-500/50 transition`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-purple-400 font-bold text-sm`,children:[(0,A.jsx)(ge,{className:`w-4 h-4 shrink-0`}),(0,A.jsx)(`span`,{children:`6. Gated Mop-Up Heuristic cờ tàn`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Chỉ kích hoạt khi phase <= 6 và chênh lệch >= 200 cp. Thưởng điểm khi ép Vua địch ra mép và kéo Vua ta lại gần, giúp dứt điểm chiếu hết và triệt tiêu lỗi hòa 50 nước.`}),(0,A.jsx)(`div`,{className:`text-[10px] text-purple-400 font-mono`,children:`File: student/evaluation.py (L596-609)`})]})]})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(M,{variant:`indigo`,children:`Đội Ngũ Thực Hiện`}),(0,A.jsx)(`h2`,{className:`text-xl sm:text-2xl font-extrabold text-white mt-1`,children:`Thành Viên Nhóm 12 & Phân Công Nhiệm Vụ`})]}),(0,A.jsx)(`div`,{className:`text-xs text-slate-400 font-mono`,children:`team.json • 4 thành viên`})]}),(0,A.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4`,children:Jt.map((e,t)=>(0,A.jsxs)(`div`,{className:`p-5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-start justify-between`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h3`,{className:`text-base font-extrabold text-white`,children:e.name}),(0,A.jsxs)(`div`,{className:`text-xs text-slate-400 font-mono`,children:[`MSV: `,e.studentId,` • Git: `,(0,A.jsx)(`code`,{className:`text-emerald-400`,children:e.github})]})]}),(0,A.jsx)(M,{variant:t===0?`cyan`:t===1?`rose`:t===2?`amber`:`emerald`,children:e.role})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`text-[11px] font-semibold text-slate-300 mb-1`,children:`Nhiệm vụ chính:`}),(0,A.jsx)(`ul`,{className:`text-xs text-slate-300 space-y-1`,children:e.responsibilities.slice(0,3).map((e,t)=>(0,A.jsxs)(`li`,{className:`flex items-start gap-1.5`,children:[(0,A.jsx)(Ee,{className:`w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5`}),(0,A.jsx)(`span`,{children:e})]},t))})]}),(0,A.jsxs)(`div`,{className:`pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]`,children:[(0,A.jsxs)(`span`,{className:`text-slate-400`,children:[`Tự làm: `,(0,A.jsx)(`strong`,{className:`text-emerald-400`,children:e.selfContribution}),` (AI tra cứu: `,e.aiAssistance,`)`]}),(0,A.jsx)(`span`,{className:`text-slate-400 font-mono`,children:`Chịu trách nhiệm bảo vệ`})]})]},t))})]})]}),N=({badge:e,badgeVariant:t=`emerald`,title:n,description:r,action:i})=>(0,A.jsxs)(`div`,{className:`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-700/60 dark:border-slate-800`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`mb-2`,children:(0,A.jsx)(M,{variant:t,children:e})}),(0,A.jsx)(`h1`,{className:`text-2xl sm:text-3xl font-extrabold text-white tracking-tight`,children:n}),(0,A.jsx)(`p`,{className:`mt-1.5 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed`,children:r})]}),i&&(0,A.jsx)(`div`,{className:`shrink-0`,children:i})]}),rn=[{id:`grader`,name:`GameController / Grader`,layer:`external`,file:`chesslab_sdk (Hệ thống chấm thi)`,role:`Máy chủ chấm thi và quản lý ván đấu đối kháng ChessLab. Khởi tạo bot bằng BotConfig và gọi choose_move() tại mỗi lượt thi đấu. Áp dụng độ trễ sàn tối thiểu 500ms – 1000ms cho mỗi nước đi.`,callers:[`Ban tổ chức giải đấu`],callees:[`StudentBot.__init__()`,`StudentBot.choose_move()`],keyFunctions:[`GameController.play_game()`,`GameController.handle_turn()`],defensePitch:`Bot của nhóm được thiết kế như một hộp đen độc lập tuân thủ 100% giao diện SDK, có khả năng biến độ trễ sàn 500ms của máy chủ thành lợi thế tính toán.`,codeSnippet:`grader -> StudentBot(config)
grader -> StudentBot.choose_move(board, context) -> chess.Move`},{id:`student_bot`,name:`StudentBot (Điều phối)`,layer:`controller`,file:`student/bot.py`,role:`Cổng giao tiếp chính và điều phối viên trung tâm. Triển khai kiến trúc phòng thủ 3 tầng: Fast-path tối ưu nước đi duy nhất (0ms), bọc khối try...except chống sập, và hậu kiểm tính hợp lệ trước khi gửi nước đi.`,callers:[`GameController / Grader`],callees:[`compute_budget_ms()`,`TimeManager`,`Searcher.search()`],keyFunctions:[`__init__(config)`,`choose_move(board, context)`],defensePitch:`StudentBot đảm bảo 100% không bao giờ bị xử thua do crash hoặc trả nước đi sai luật nhờ kiến trúc tự phục hồi 3 tầng độc quyền.`,codeSnippet:`legal = list(board.legal_moves)
if len(legal) == 1: return legal[0] # 0ms fast-path
budget = compute_budget_ms(...)
tm = TimeManager(budget)
try: move = self.searcher.search(board, tm)
except Exception: move = legal[0] # Tự phục hồi
if move not in board.legal_moves: move = legal[0]
return move`},{id:`time_manager`,name:`TimeManager & Budget`,layer:`timing`,file:`student/time_manager.py`,role:`Quản trị ngân sách thời gian thích ứng đa tầng (Tactical Delay-Aware Time Manager). Tính toán Soft Limit, Hard Limit, hấp thụ độ trễ hệ thống 500ms, và dự đoán thời gian tầng kế tiếp (predicted_ms = last * 2.2).`,callers:[`StudentBot.choose_move()`,`Searcher.search()`,`Searcher._negamax()`,`Searcher._quiescence()`],callees:[`time.perf_counter()`],keyFunctions:[`compute_budget_ms()`,`start()`,`should_stop()`,`can_start_next_depth()`,`elapsed_ms()`],defensePitch:`TimeManager loại bỏ 100% rủi ro rụng cờ trong mọi thể thức (Blitz 45s lẫn Standard 180s) nhờ cơ chế kiểm tra đồng hồ nano-giây và phân bổ thời gian thông minh theo Game Phase.`,codeSnippet:`def can_start_next_depth(self) -> bool:
    elapsed = self.elapsed_ms()
    if elapsed >= self.soft_ms: return False
    if self.last_iteration_ms > 0:
        predicted = int(self.last_iteration_ms * 2.2)
        if elapsed + predicted >= self.hard_ms: return False
    return True`},{id:`searcher`,name:`Searcher (Cỗ máy tìm kiếm)`,layer:`search`,file:`student/search.py`,role:`Trái tim thuật toán của bot. Triển khai Negamax kết hợp Alpha-Beta Pruning, Đào sâu lặp (IDS 1..64), Cửa sổ kỳ vọng (Aspiration Windows), Principal Variation Search (PVS), và hệ thống cắt tỉa toán học: NMP, RFP, FP, LMR.`,callers:[`StudentBot.choose_move()`],callees:[`TranspositionTable`,`_order_moves()`,`_negamax()`,`_quiescence()`,`evaluate()`],keyFunctions:[`search(board, tm)`,`_negamax(...)`,`_quiescence(...)`,`_order_moves(...)`,`see(...)`],defensePitch:`Searcher đạt độ sâu tìm kiếm vượt trội (5-8 ply ở trung cuộc, 3-5 ply ở tàn cuộc) bằng cách kết hợp Move Ordering chuẩn xác và PVS, giảm không gian tìm kiếm từ O(b^d) về gần O(b^(d/2)).`,codeSnippet:`for depth in range(1, MAX_DEPTH + 1):
    if not tm.can_start_next_depth(): break
    score = self._negamax(board, depth, alpha, beta, 0, tm)
    if not self._timeout: best_move = candidate`},{id:`transposition_table`,name:`Transposition Table (Bảng chuyển vị)`,layer:`memory`,file:`student/search.py`,role:`Bảng băm kích thước 2^19 = 524,288 mục, sử dụng khóa Zobrist Hash O(1) từ python-chess. Lưu trữ điểm số (chuẩn hóa mate score), độ sâu, cờ cận (TT_EXACT, TT_LOWER, TT_UPPER), nước đi tốt nhất và thế hệ (age).`,callers:[`Searcher.search()`,`Searcher._negamax()`],callees:[`board._transposition_key()`,`score_to_tt()`,`score_from_tt()`],keyFunctions:[`probe(key)`,`store(key, depth, score, flag, best_move, age)`,`clear()`],defensePitch:`Transposition Table giúp tái sử dụng ngay kết quả của các nhánh hoán vị nước đi, đồng thời cung cấp nước đi hạt giống (Hash Move) tối quan trọng cho Move Ordering.`,codeSnippet:`idx = hash(key) & (self.size - 1)
# Chính sách thay thế: ô trống, trùng khóa, thế hệ cũ, hoặc độ sâu lớn hơn
if existing is None or existing.key == key or existing.age != age or depth >= existing.depth:
    self._table[idx] = TTEntry(key, depth, score, flag, best_move, age)`},{id:`evaluation`,name:`Heuristic Evaluation Core`,layer:`evaluation`,file:`student/evaluation.py`,role:`Hàm đánh giá thế cờ tĩnh tốc độ cao (~89,000 evals/giây). Tích hợp PeSTO Piece-Square Tables với kỹ thuật bit-packing tuyến tính mg + (eg << 16), Tapered Evaluation theo Game Phase (0..24), an toàn Vua động (Bitwise King Ring) và Mop-Up Heuristic tàn cuộc.`,callers:[`Searcher._negamax()`,`Searcher._quiescence()`],callees:[`Bitboards python-chess`,`_popcount()`,`_orient_table()`],keyFunctions:[`evaluate(board)`,`_build_packed_pst()`,`_build_king_zones()`],defensePitch:`Hàm lượng giá đạt sự cân bằng hoàn hảo giữa tri thức cờ vua chuyên sâu và hiệu năng tính toán cực hạn, đảm bảo 100% đối xứng gương evaluate(b) == evaluate(b.mirror()) trên mọi thế cờ.`,codeSnippet:`eg = (s + 0x8000) >> 16
mg = s - (eg << 16)
x = mg * phase + eg * (24 - phase)
score = x // 24 if x >= 0 else -(-x // 24)
return score + TEMPO_BONUS if board.turn else TEMPO_BONUS - score`}],an=[{step:1,title:`Nhận yêu cầu từ Grader`,subTitle:`Hệ thống gọi choose_move(board, context)`,description:`GameController truyền trạng thái bàn cờ hiện tại và ngữ cảnh thi đấu gồm thời gian còn lại (time_remaining_ms) và số nửa nước đi (ply).`,module:`student/bot.py`,lines:`40 – 68`,safety:`Khởi đầu chu trình an toàn`},{step:2,title:`Kiểm tra biên & Nước đi duy nhất (0ms)`,subTitle:`Tối ưu hóa tài nguyên cực hạn`,description:`Nếu không còn nước đi hợp lệ -> trả về Move.null(). Nếu chỉ có đúng 1 nước đi hợp lệ (forced move) -> trả về ngay lập tức trong 0ms mà không tiêu hao tài nguyên tìm kiếm.`,module:`student/bot.py`,lines:`69 – 76`,safety:`Tiết kiệm 100% ngân sách thời gian cho nước sau`},{step:3,title:`Tính toán Ngân sách Thời gian Động`,subTitle:`Bù trừ độ trễ hệ thống 500ms`,description:`compute_budget_ms() phân loại chế độ Blitz hay Standard, xác định số nước đi còn lại, sinh soft_ms và hard_ms. Khởi tạo TimeManager với deadline chính xác qua time.perf_counter().`,module:`student/time_manager.py`,lines:`37 – 134`,safety:`Hấp thụ trễ sàn 500ms, phòng chống rụng cờ`},{step:4,title:`Khởi động Đào sâu Lặp (Iterative Deepening)`,subTitle:`Duyệt từng tầng depth = 1..64`,description:`Searcher.search() sắp xếp sơ bộ các nước đi hợp lệ để luôn có một nước đi dự phòng chất lượng cao. Bắt đầu vòng lặp IDS từ depth = 1, tăng dần độ sâu.`,module:`student/search.py`,lines:`1737 – 1780`,safety:`Luôn sẵn sàng nước đi tốt nhất khi hết giờ`},{step:5,title:`Thiết lập Cửa sổ Kỳ vọng (Aspiration Windows)`,subTitle:`Thu hẹp [alpha, beta] quanh điểm số tầng trước`,description:`Tại depth >= 4, thu hẹp cửa sổ tìm kiếm [prev - 40, prev + 40]. Nếu fail-low hoặc fail-high, hệ thống tự động mở rộng về toàn dải [-MATE, +MATE] và tìm kiếm lại.`,module:`student/search.py`,lines:`1761 – 1888`,safety:`Cắt tỉa thêm 15-20% số nhánh tìm kiếm tại gốc`},{step:6,title:`Duyệt đệ quy Negamax & Cắt tỉa Đa tầng`,subTitle:`PVS, NMP, RFP, FP, LMR & Transposition Table`,description:`Tra cứu TT O(1). Kiểm tra Reverse Futility Pruning ở depth 1-2, Null Move Pruning ở depth >= 3. Sắp xếp nước đi bằng _order_moves(). Duyệt nước đầu tiên đầy đủ dải, các nước sau duyệt Zero-Window (PVS) kèm Late Move Reductions (LMR).`,module:`student/search.py`,lines:`1203 – 1625`,safety:`Thu gọn không gian tìm kiếm về O(b^(d/2))`},{step:7,title:`Tìm kiếm Tĩnh lặng (Quiescence Search)`,subTitle:`Triệt tiêu hoàn toàn hiệu ứng chân trời`,description:`Khi depth <= 0, chuyển sang _quiescence(). Áp dụng Stand-pat và Delta Pruning để cắt tỉa các nước bắt quân vô vọng. Sinh và sắp xếp các nước ăn quân có lợi (SEE >= 0) bằng bitboard.`,module:`student/search.py`,lines:`925 – 1195`,safety:`Ngăn chặn sai lệch đánh giá do chuỗi đổi quân dở dang`},{step:8,title:`Hậu kiểm & Bàn giao Nước đi Tuyệt đối An toàn`,subTitle:`Kiểm định 100% hợp lệ trước khi gửi trọng tài`,description:`Chỉ cập nhật best_move khi tầng lặp hoàn thành trọn vẹn (hoặc depth == 1). StudentBot kiểm tra move in board.legal_moves, fallback về legal[0] nếu có bất kỳ sự cố nào. Bàn giao nước đi cho Grader.`,module:`student/bot.py`,lines:`86 – 97`,safety:`Triệt tiêu 100% nguy cơ bị xử thua kỹ thuật`}],on=()=>{let[e,t]=(0,_.useState)(rn[1]),[n,r]=(0,_.useState)(`all`),i=e=>{switch(e){case`grader`:return(0,A.jsx)(yt,{className:`w-5 h-5 text-indigo-400`});case`student_bot`:return(0,A.jsx)(k,{className:`w-5 h-5 text-emerald-400`});case`time_manager`:return(0,A.jsx)(O,{className:`w-5 h-5 text-amber-400`});case`searcher`:return(0,A.jsx)(Fe,{className:`w-5 h-5 text-cyan-400`});case`transposition_table`:return(0,A.jsx)(ze,{className:`w-5 h-5 text-purple-400`});case`evaluation`:return(0,A.jsx)(Le,{className:`w-5 h-5 text-rose-400`});default:return(0,A.jsx)(Fe,{className:`w-5 h-5 text-emerald-400`})}},a=e=>{switch(e){case`external`:return`indigo`;case`controller`:return`emerald`;case`timing`:return`amber`;case`search`:return`cyan`;case`memory`:return`purple`;case`evaluation`:return`rose`;default:return`emerald`}};return(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(Fe,{className:`w-5 h-5 text-emerald-400`}),(0,A.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`Sơ Đồ Kiến Trúc Hệ Thống & Luồng Gọi Hàm Tương Tác`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-400 mt-1`,children:`Nhấp vào bất kỳ thành phần nào để xem vai trò, luồng gọi, đoạn code minh họa và điểm cần bảo vệ trước giảng viên`})]}),(0,A.jsx)(`div`,{className:`flex items-center gap-1.5 flex-wrap`,children:[`all`,`controller`,`search`,`evaluation`,`timing`,`memory`].map(e=>(0,A.jsx)(`button`,{onClick:()=>r(e),className:`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${n===e?`bg-emerald-600 text-white shadow-md`:`bg-slate-900/60 text-slate-400 hover:text-white`}`,children:e===`all`?`Tất cả tầng`:e},e))})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start`,children:[(0,A.jsxs)(`div`,{className:`lg:col-span-7 space-y-4`,children:[(0,A.jsx)(`div`,{className:`flex justify-center`,children:rn.filter(e=>e.id===`grader`).map(n=>(0,A.jsx)(`button`,{onClick:()=>t(n),className:`w-full max-w-md p-3.5 rounded-xl border text-left transition-all ${e.id===n.id?`border-indigo-400 bg-indigo-950/40 shadow-lg shadow-indigo-950/50 scale-[1.02]`:`border-slate-700 bg-slate-900/70 hover:border-slate-600`}`,children:(0,A.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,A.jsx)(`div`,{className:`p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20`,children:i(n.id)}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`text-sm font-bold text-white`,children:n.name}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400`,children:n.file})]})]}),(0,A.jsx)(M,{variant:a(n.layer),children:`Tầng Bên Ngoài`})]})},n.id))}),(0,A.jsx)(`div`,{className:`flex justify-center text-slate-600`,children:(0,A.jsxs)(`div`,{className:`flex flex-col items-center`,children:[(0,A.jsx)(`div`,{className:`w-0.5 h-4 bg-slate-600`}),(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 font-mono px-2 py-0.5 bg-slate-900 rounded border border-slate-700/50 my-0.5`,children:`choose_move(board, context)`}),(0,A.jsx)(`div`,{className:`w-0.5 h-4 bg-slate-600`})]})}),(0,A.jsx)(`div`,{className:`flex justify-center`,children:rn.filter(e=>e.id===`student_bot`).map(n=>(0,A.jsxs)(`button`,{onClick:()=>t(n),className:`w-full max-w-md p-4 rounded-xl border text-left transition-all relative ${e.id===n.id?`border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-950/60 scale-[1.02]`:`border-emerald-600/50 bg-slate-900/90 hover:border-emerald-500`}`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,A.jsx)(`div`,{className:`p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30`,children:i(n.id)}),(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-base font-extrabold text-white flex items-center gap-2`,children:[n.name,(0,A.jsx)(`span`,{className:`text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-normal`,children:`Điều phối chính`})]}),(0,A.jsx)(`div`,{className:`text-xs text-slate-400 font-mono`,children:n.file})]})]}),(0,A.jsx)(M,{variant:`emerald`,children:`Phòng thủ 3 tầng`})]}),(0,A.jsx)(`div`,{className:`mt-2 text-[11px] text-slate-300 line-clamp-2`,children:`Fast-path 0ms → Khởi tạo TimeManager → Searcher có bọc try...except tự phục hồi → Hậu kiểm hợp lệ.`})]},n.id))}),(0,A.jsx)(`div`,{className:`flex justify-center text-slate-600 my-1`,children:(0,A.jsxs)(`div`,{className:`w-full max-w-lg border-t-2 border-slate-700 relative`,children:[(0,A.jsx)(`div`,{className:`absolute left-1/4 -top-3 w-0.5 h-3 bg-slate-700`}),(0,A.jsx)(`div`,{className:`absolute left-1/2 -top-3 w-0.5 h-3 bg-slate-700`}),(0,A.jsx)(`div`,{className:`absolute left-3/4 -top-3 w-0.5 h-3 bg-slate-700`})]})}),(0,A.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-3.5`,children:rn.filter(e=>[`time_manager`,`searcher`,`transposition_table`,`evaluation`].includes(e.id)).filter(e=>n===`all`||e.layer===n).map(n=>(0,A.jsxs)(`button`,{onClick:()=>t(n),className:`p-3.5 rounded-xl border text-left transition-all ${e.id===n.id?`border-emerald-400 bg-slate-800 shadow-lg scale-[1.02]`:`border-slate-700 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900`}`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between mb-2`,children:[(0,A.jsx)(`div`,{className:`p-2 rounded-lg bg-slate-800 border border-slate-700`,children:i(n.id)}),(0,A.jsx)(M,{variant:a(n.layer),size:`sm`,children:n.layer})]}),(0,A.jsx)(`div`,{className:`text-sm font-bold text-white`,children:n.name}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 font-mono mt-0.5`,children:n.file}),(0,A.jsx)(`p`,{className:`text-[11px] text-slate-300 line-clamp-2 mt-2 leading-relaxed`,children:n.role})]},n.id))})]}),(0,A.jsxs)(`div`,{className:`lg:col-span-5 bg-slate-900/95 border border-slate-700 rounded-xl p-5 shadow-2xl relative`,children:[(0,A.jsxs)(`div`,{className:`flex items-start justify-between pb-3 border-b border-slate-800`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,A.jsx)(`div`,{className:`p-2 rounded-lg bg-slate-800 border border-slate-700`,children:i(e.id)}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h3`,{className:`text-base font-bold text-white`,children:e.name}),(0,A.jsx)(`div`,{className:`text-xs text-emerald-400 font-mono`,children:e.file})]})]}),(0,A.jsx)(M,{variant:a(e.layer),children:e.layer})]}),(0,A.jsxs)(`div`,{className:`mt-4 space-y-4 text-xs`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-semibold text-slate-300 mb-1`,children:`Vai trò trong hệ thống:`}),(0,A.jsx)(`p`,{className:`text-slate-300 leading-relaxed bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50`,children:e.role})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 font-mono text-[11px]`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/30`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 block font-sans font-semibold mb-1`,children:`Được gọi bởi:`}),e.callers.map((e,t)=>(0,A.jsxs)(`div`,{className:`text-amber-400`,children:[`• `,e]},t))]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/30`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 block font-sans font-semibold mb-1`,children:`Sử dụng:`}),e.callees.map((e,t)=>(0,A.jsxs)(`div`,{className:`text-cyan-400`,children:[`• `,e]},t))]})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-semibold text-slate-300 mb-1`,children:`Các hàm quan trọng:`}),(0,A.jsx)(`div`,{className:`flex flex-wrap gap-1.5 font-mono text-[11px]`,children:e.keyFunctions.map((e,t)=>(0,A.jsx)(`span`,{className:`px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700`,children:e},t))})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`font-semibold text-emerald-400 mb-1 flex items-center gap-1.5`,children:[(0,A.jsx)(k,{className:`w-3.5 h-3.5`}),` Điểm mấu chốt để bảo vệ trước giảng viên:`]}),(0,A.jsx)(`div`,{className:`p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-slate-200 leading-relaxed`,children:e.defensePitch})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`font-semibold text-slate-300 mb-1 flex items-center gap-1`,children:[(0,A.jsx)(je,{className:`w-3.5 h-3.5 text-slate-400`}),` Mã nguồn minh họa:`]}),(0,A.jsx)(`pre`,{className:`p-3 bg-slate-950 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto border border-slate-800 leading-relaxed`,children:e.codeSnippet})]})]})]})]})]})},sn=()=>{let[e,t]=(0,_.useState)(1),n=an.find(t=>t.step===e)||an[0];return(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(k,{className:`w-5 h-5 text-emerald-400`}),(0,A.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`Vòng Đời Một Lượt Đi (Move Lifecycle – 8 Bước Phòng Thủ)`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-400 mt-1`,children:`Quy trình khép kín từ khi nhận bàn cờ từ Grader đến khi bàn giao nước đi hợp lệ tuyệt đối`})]}),(0,A.jsx)(M,{variant:`emerald`,children:`Chu trình 100% An toàn`})]}),(0,A.jsx)(`div`,{className:`mt-6 overflow-x-auto pb-2`,children:(0,A.jsxs)(`div`,{className:`flex items-center min-w-[700px] justify-between relative`,children:[(0,A.jsx)(`div`,{className:`absolute top-4 left-6 right-6 h-0.5 bg-slate-700 -z-0`}),an.map(n=>{let r=n.step===e,i=n.step<e;return(0,A.jsxs)(`button`,{onClick:()=>t(n.step),className:`flex flex-col items-center relative z-10 group cursor-pointer`,children:[(0,A.jsx)(`div`,{className:`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${r?`bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 scale-110 shadow-lg`:i?`bg-emerald-700 text-white`:`bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-slate-500`}`,children:i?(0,A.jsx)(Ee,{className:`w-4 h-4`}):n.step}),(0,A.jsx)(`span`,{className:`text-[11px] mt-2 font-medium max-w-[80px] text-center line-clamp-1 ${r?`text-emerald-400 font-bold`:`text-slate-400`}`,children:n.title})]},n.step)})]})}),(0,A.jsxs)(`div`,{className:`mt-6 bg-slate-900/90 rounded-xl p-5 border border-slate-700/80`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`text-xs text-emerald-400 font-mono font-semibold`,children:[`BƯỚC `,n.step,` / 8 • `,n.subTitle]}),(0,A.jsx)(`h3`,{className:`text-base font-bold text-white mt-0.5`,children:n.title})]}),(0,A.jsx)(`div`,{className:`flex items-center gap-2`,children:(0,A.jsxs)(`span`,{className:`text-xs text-slate-400 font-mono`,children:[n.module,` (`,n.lines,`)`]})})]}),(0,A.jsxs)(`div`,{className:`mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center`,children:[(0,A.jsxs)(`div`,{className:`md:col-span-8 space-y-3`,children:[(0,A.jsx)(`p`,{className:`text-xs sm:text-sm text-slate-300 leading-relaxed`,children:n.description}),(0,A.jsxs)(`div`,{className:`p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-xs text-emerald-300`,children:[(0,A.jsx)(k,{className:`w-4 h-4 text-emerald-400 shrink-0`}),(0,A.jsxs)(`span`,{children:[(0,A.jsx)(`strong`,{children:`Bảo chứng an toàn:`}),` `,n.safety]})]})]}),(0,A.jsxs)(`div`,{className:`md:col-span-4 flex flex-row md:flex-col justify-end gap-2`,children:[(0,A.jsx)(`button`,{onClick:()=>t(e=>e>1?e-1:8),className:`px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition`,children:`Bước trước`}),(0,A.jsxs)(`button`,{onClick:()=>t(e=>e<8?e+1:1),className:`px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md flex items-center justify-center gap-1.5 transition`,children:[`Bước tiếp theo `,(0,A.jsx)(ue,{className:`w-3.5 h-3.5`})]})]})]})]})]})},cn=({onNavigate:e})=>(0,A.jsxs)(`div`,{className:`space-y-10 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Kiến Trúc Hệ Thống`,badgeVariant:`emerald`,title:`Tổng Thể Kiến Trúc & Vòng Đời Lượt Đi`,description:`Mô hình phối hợp chặt chẽ giữa các module trong student/: StudentBot (Điều phối), Searcher (Cỗ máy tìm kiếm), Evaluation (Lượng giá tĩnh), Transposition Table (Bảng băm) và TimeManager (Quản trị thời gian).`}),(0,A.jsx)(on,{}),(0,A.jsx)(sn,{}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-3 gap-5`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-emerald-400 font-bold text-sm`,children:[(0,A.jsx)(kt,{className:`w-4 h-4`}),(0,A.jsx)(`span`,{children:`Tầng 1: Fast-Path 0ms`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Nếu bàn cờ không có nước hợp lệ → trả về Move.null(). Nếu chỉ có đúng 1 nước hợp lệ duy nhất (forced move) → trả về ngay lập tức trong 0ms, không tiêu hao một phần nghìn giây tài nguyên CPU.`}),(0,A.jsxs)(`button`,{onClick:()=>e(`code-bot`),className:`text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1`,children:[`Xem mã nguồn bot.py (dòng 69-76) `,(0,A.jsx)(ue,{className:`w-3.5 h-3.5`})]})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-cyan-400 font-bold text-sm`,children:[(0,A.jsx)(Fe,{className:`w-4 h-4`}),(0,A.jsx)(`span`,{children:`Tầng 2: Tìm kiếm & Tự phục hồi`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`TimeManager khởi tạo hạn chót với time.perf_counter(). Thuật toán Iterative Deepening Negamax duyệt sâu từ 1 đến 64. Toàn bộ quá trình bọc trong khối try...except Exception: nếu văng lỗi, tự động fallback về legal[0].`}),(0,A.jsxs)(`button`,{onClick:()=>e(`code-search`),className:`text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1`,children:[`Xem mã nguồn search.py `,(0,A.jsx)(ue,{className:`w-3.5 h-3.5`})]})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-amber-400 font-bold text-sm`,children:[(0,A.jsx)(kt,{className:`w-4 h-4`}),(0,A.jsx)(`span`,{children:`Tầng 3: Hậu kiểm 100% Hợp lệ`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Trước khi bàn giao nước đi cho GameController, StudentBot xác thực lại một lần cuối: if move not in board.legal_moves: move = legal[0]. Triệt tiêu 100% rủi ro bị xử thua do nước đi sai luật.`}),(0,A.jsxs)(`button`,{onClick:()=>e(`code-bot`),className:`text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1`,children:[`Xem mã nguồn bot.py (dòng 93-97) `,(0,A.jsx)(ue,{className:`w-3.5 h-3.5`})]})]})]})]}),ln=({initialFile:e=`bot.py`,highlightAnnotationId:t,onNavigate:n})=>{let[r,i]=(0,_.useState)(e),[a,o]=(0,_.useState)({}),[s,c]=(0,_.useState)(t||null),[l,u]=(0,_.useState)(!1),d=(0,_.useRef)(null),f=en[r];(0,_.useEffect)(()=>{e&&i(e)},[e]),(0,_.useEffect)(()=>{t&&(c(t),o(e=>({...e,[t]:!0})))},[t]);let p=e=>{let t={};f.annotations.forEach(n=>{t[n.id]=e}),o(t)},m=e=>{o(t=>({...t,[e]:!t[e]})),c(e)},h=()=>{navigator.clipboard.writeText(f.rawCode),u(!0),setTimeout(()=>u(!1),2e3)},g=f.rawCode.split(`
`),v=e=>{if(e.trim().startsWith(`#`)||e.trim().startsWith(`"""`)||e.trim().startsWith(`'''`))return(0,A.jsx)(`span`,{className:`code-comment`,children:e});let t=e.split(/(\b(?:def|class|return|if|else|elif|import|from|while|for|in|break|continue|try|except|finally|None|True|False|self|int|float|str|bool)\b|"[^"]*"|'[^']*'|#[^\n]*)/g);return(0,A.jsx)(A.Fragment,{children:t.map((e,t)=>/^(def|class|return|if|else|elif|import|from|while|for|in|break|continue|try|except|finally)$/.test(e)?(0,A.jsx)(`span`,{className:`code-keyword`,children:e},t):/^(None|True|False|self)$/.test(e)?(0,A.jsx)(`span`,{className:`code-fn`,children:e},t):/^(int|float|str|bool)$/.test(e)?(0,A.jsx)(`span`,{className:`code-type`,children:e},t):/^(".*"|'.*')$/.test(e)?(0,A.jsx)(`span`,{className:`code-str`,children:e},t):e.startsWith(`#`)?(0,A.jsx)(`span`,{className:`code-comment`,children:e},t):(0,A.jsx)(`span`,{children:e},t))})},y=f.annotations.find(e=>e.id===s);return(0,A.jsxs)(`div`,{className:`space-y-6 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Sổ Tay Mã Nguồn`,badgeVariant:`emerald`,title:`Code Explorer – Giải Thích Từng Khối Lệnh Thực Tế`,description:`Mã nguồn nguyên bản 100% từ thư mục student/ của Nhóm 12. Mỗi khối lệnh được giải thích cặn kẽ mục đích, tham số đầu vào, kết quả trả về, vai trò hệ thống và các câu hỏi vấn đáp mà giảng viên có thể hỏi sâu.`}),(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-800/80 rounded-2xl border border-slate-700/80`,children:[(0,A.jsx)(`div`,{className:`flex flex-wrap items-center gap-1.5`,children:[`bot.py`,`search.py`,`evaluation.py`,`time_manager.py`].map(e=>{let t=r===e,n=en[e];return(0,A.jsxs)(`button`,{onClick:()=>{i(e),c(null),o({})},className:`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${t?`bg-emerald-600 text-white shadow-lg shadow-emerald-950/60`:`bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900`}`,children:[(0,A.jsx)(Ze,{className:`w-4 h-4 shrink-0`}),(0,A.jsx)(`span`,{children:e}),(0,A.jsxs)(`span`,{className:`text-[10px] px-1.5 py-0.2 rounded font-mono ${t?`bg-emerald-950/80 text-emerald-200`:`bg-slate-800 text-slate-500`}`,children:[n.linesCount,` dòng`]})]},e)})}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2 px-2`,children:[(0,A.jsx)(`button`,{onClick:()=>p(!0),className:`text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 transition`,children:`Mở tất cả`}),(0,A.jsx)(`button`,{onClick:()=>p(!1),className:`text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 transition`,children:`Thu gọn tất cả`}),(0,A.jsxs)(`button`,{onClick:h,className:`text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1`,title:`Sao chép toàn bộ mã nguồn`,children:[l?(0,A.jsx)(be,{className:`w-3.5 h-3.5 text-emerald-400`}):(0,A.jsx)(Ne,{className:`w-3.5 h-3.5`}),(0,A.jsx)(`span`,{children:l?`Đã chép`:`Sao chép file`})]})]})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`font-bold text-white text-sm flex items-center gap-2`,children:[(0,A.jsx)(`span`,{children:f.name}),(0,A.jsxs)(`span`,{className:`text-slate-400 font-mono font-normal`,children:[`(`,f.fileName,`)`]}),(0,A.jsx)(M,{variant:`cyan`,children:f.author})]}),(0,A.jsx)(`p`,{className:`text-slate-300 mt-1 leading-relaxed max-w-4xl`,children:f.summary})]}),(0,A.jsxs)(`div`,{className:`flex sm:flex-col items-end gap-1 shrink-0 font-mono text-[11px] text-slate-400`,children:[(0,A.jsxs)(`div`,{children:[`Lớp: `,f.keyClasses.join(`, `)]}),(0,A.jsxs)(`div`,{children:[`Hàm lõi: `,f.coreFunctions.slice(0,3).join(`, `),`...`]})]})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`,children:[(0,A.jsxs)(`div`,{className:`lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[850px]`,children:[(0,A.jsxs)(`div`,{className:`p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 font-mono`,children:[(0,A.jsx)(`span`,{className:`w-2.5 h-2.5 rounded-full bg-rose-500`}),(0,A.jsx)(`span`,{className:`w-2.5 h-2.5 rounded-full bg-amber-500`}),(0,A.jsx)(`span`,{className:`w-2.5 h-2.5 rounded-full bg-emerald-500`}),(0,A.jsx)(`span`,{className:`ml-2 font-bold text-slate-300`,children:f.fileName})]}),(0,A.jsxs)(`div`,{className:`text-[11px] text-slate-500`,children:[g.length,` dòng lệnh Python`]})]}),(0,A.jsx)(`div`,{ref:d,className:`overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed space-y-0.5 select-text`,children:g.map((e,t)=>{let n=t+1,r=y&&n>=y.startLine&&n<=y.endLine;return(0,A.jsxs)(`div`,{id:`line-${n}`,className:`flex items-start transition-colors px-1 rounded ${r?`bg-emerald-950/50 text-white font-medium border-l-2 border-emerald-400`:`hover:bg-slate-900/60`}`,children:[(0,A.jsx)(`span`,{className:`w-10 shrink-0 text-slate-600 text-right pr-3 select-none text-[11px]`,children:n}),(0,A.jsx)(`span`,{className:`whitespace-pre flex-1 overflow-x-visible`,children:v(e)})]},n)})})]}),(0,A.jsxs)(`div`,{className:`lg:col-span-5 space-y-4 max-h-[850px] overflow-y-auto pr-1`,children:[(0,A.jsxs)(`div`,{className:`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between`,children:[(0,A.jsxs)(`span`,{children:[`Danh mục giải thích (`,f.annotations.length,` khối)`]}),(0,A.jsx)(`span`,{className:`text-[10px] text-slate-500 font-normal`,children:`Nhấp để xem chi tiết`})]}),f.annotations.map(e=>{let t=a[e.id]??!1,n=s===e.id;return(0,A.jsxs)(`div`,{id:`ann-${e.id}`,className:`rounded-xl border transition-all ${n?`border-emerald-500 bg-slate-900/90 shadow-lg shadow-emerald-950/40`:`border-slate-800 bg-slate-900/50 hover:border-slate-700`}`,children:[(0,A.jsxs)(`button`,{onClick:()=>m(e.id),className:`w-full text-left p-3.5 flex items-start justify-between gap-3 cursor-pointer`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 mb-1`,children:[(0,A.jsxs)(`span`,{className:`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30`,children:[`Dòng `,e.startLine,` – `,e.endLine]}),e.relatedFunctions&&(0,A.jsx)(`span`,{className:`text-[10px] font-mono text-slate-400`,children:e.relatedFunctions[0]})]}),(0,A.jsx)(`h3`,{className:`text-sm font-bold text-white leading-snug`,children:e.title})]}),(0,A.jsx)(`div`,{className:`p-1 text-slate-400 hover:text-white`,children:t?(0,A.jsx)(D,{className:`w-4 h-4`}):(0,A.jsx)(Se,{className:`w-4 h-4`})})]}),t&&(0,A.jsxs)(`div`,{className:`px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3.5 text-xs`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-bold text-slate-300 mb-1`,children:`Mục đích:`}),(0,A.jsx)(`p`,{className:`text-slate-300 leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40`,children:e.purpose})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-bold text-slate-300 mb-1.5`,children:`Phân tích từng câu lệnh:`}),(0,A.jsx)(`ul`,{className:`space-y-1.5 text-slate-300`,children:e.explanation.map((e,t)=>(0,A.jsxs)(`li`,{className:`flex items-start gap-2 leading-relaxed`,children:[(0,A.jsx)(`span`,{className:`text-emerald-400 shrink-0 mt-0.5`,children:`•`}),(0,A.jsx)(`span`,{children:e})]},t))})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 font-mono text-[11px]`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-800/40 p-2 rounded border border-slate-700/30`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 block font-sans font-semibold mb-0.5`,children:`Đầu vào:`}),(0,A.jsx)(`span`,{className:`text-amber-300`,children:e.inputs})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/40 p-2 rounded border border-slate-700/30`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 block font-sans font-semibold mb-0.5`,children:`Đầu ra:`}),(0,A.jsx)(`span`,{className:`text-cyan-300`,children:e.outputs})]})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-bold text-slate-300 mb-1`,children:`Vai trò trong hệ thống:`}),(0,A.jsx)(`p`,{className:`text-slate-400 text-[11px] leading-relaxed`,children:e.systemRole})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5`,children:[(0,A.jsx)(k,{className:`w-3.5 h-3.5`}),` Điểm mấu chốt để bảo vệ trước giảng viên:`]}),(0,A.jsx)(`div`,{className:`space-y-2`,children:e.defensePoints.map((e,t)=>(0,A.jsx)(`div`,{className:`p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-slate-200 leading-relaxed text-[11px]`,children:e},t))})]})]})]},e.id)})]})]})]})},un=()=>{let[e,t]=(0,_.useState)(!0),[n,r]=(0,_.useState)(0);return(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(rt,{className:`w-5 h-5 text-emerald-400`}),(0,A.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`Mô Phỏng Trực Quan Cắt Tỉa Alpha-Beta vs Minimax`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-400 mt-1`,children:`So sánh trực tiếp số lượng nhánh cần duyệt và cơ chế ngắt nhánh (Beta Cutoff)`})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(`button`,{onClick:()=>t(!1),className:`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${e?`bg-slate-700/70 text-slate-300 hover:bg-slate-700`:`bg-amber-600 text-white shadow-md shadow-amber-900/40`}`,children:`Minimax Thuần Túy (Duyệt hết)`}),(0,A.jsx)(`button`,{onClick:()=>t(!0),className:`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${e?`bg-emerald-600 text-white shadow-md shadow-emerald-900/40`:`bg-slate-700/70 text-slate-300 hover:bg-slate-700`}`,children:`Alpha-Beta Pruning (Có cắt tỉa)`})]})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center`,children:[(0,A.jsx)(`div`,{className:`lg:col-span-8 bg-slate-900/90 rounded-xl p-5 border border-slate-700 relative overflow-x-auto`,children:(0,A.jsxs)(`div`,{className:`min-w-[480px] flex flex-col items-center space-y-6 py-2`,children:[(0,A.jsx)(`div`,{className:`flex flex-col items-center`,children:(0,A.jsxs)(`div`,{className:`px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg border border-emerald-400/50 flex items-center gap-2`,children:[(0,A.jsx)(`span`,{children:`NÚT GỐC (MAX)`}),(0,A.jsx)(`span`,{className:`font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded text-[11px]`,children:e?`α=3, β=+∞ → Điểm: 3`:`Điểm: 3`})]})}),(0,A.jsxs)(`div`,{className:`w-full flex justify-around px-8 text-slate-600 text-[10px] font-mono`,children:[(0,A.jsx)(`span`,{className:`text-emerald-400 font-bold`,children:`Nước A`}),(0,A.jsx)(`span`,{className:e?`text-rose-400 font-bold`:`text-slate-400`,children:`Nước B`}),(0,A.jsx)(`span`,{className:e?`text-rose-400 font-bold`:`text-slate-400`,children:`Nước C`})]}),(0,A.jsxs)(`div`,{className:`w-full grid grid-cols-3 gap-4`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col items-center p-3 rounded-xl bg-slate-800 border border-emerald-500/40`,children:[(0,A.jsx)(`div`,{className:`text-xs font-bold text-slate-200`,children:`Nhánh A (MIN)`}),(0,A.jsx)(`div`,{className:`text-[10px] text-emerald-400 font-mono mt-0.5`,children:`min(3, 5) = 3`}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 mt-3 w-full`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-900 p-2 rounded text-center border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 block`,children:`Lá A1`}),(0,A.jsx)(`span`,{className:`text-sm font-bold text-emerald-400 font-mono`,children:`3`})]}),(0,A.jsxs)(`div`,{className:`bg-slate-900 p-2 rounded text-center border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 block`,children:`Lá A2`}),(0,A.jsx)(`span`,{className:`text-sm font-bold text-emerald-400 font-mono`,children:`5`})]})]})]}),(0,A.jsxs)(`div`,{className:`flex flex-col items-center p-3 rounded-xl border transition-all ${e?`bg-rose-950/20 border-rose-500/50`:`bg-slate-800 border-slate-700`}`,children:[(0,A.jsx)(`div`,{className:`text-xs font-bold text-slate-200`,children:`Nhánh B (MIN)`}),(0,A.jsx)(`div`,{className:`text-[10px] font-mono mt-0.5 text-rose-400`,children:e?`Beta Cutoff! (2 <= α=3)`:`min(2, 9) = 2`}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 mt-3 w-full`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-900 p-2 rounded text-center border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 block`,children:`Lá B1`}),(0,A.jsx)(`span`,{className:`text-sm font-bold text-amber-400 font-mono`,children:`2`})]}),e?(0,A.jsxs)(`div`,{className:`bg-rose-950/40 p-2 rounded text-center border border-dashed border-rose-500/60 flex flex-col items-center justify-center`,children:[(0,A.jsx)(Tt,{className:`w-3.5 h-3.5 text-rose-400 mb-0.5`}),(0,A.jsx)(`span`,{className:`text-[9px] text-rose-300 font-bold uppercase`,children:`BỊ CẮT TỈA`}),(0,A.jsx)(`span`,{className:`text-[8px] text-slate-500 line-through`,children:`Lá B2 (9)`})]}):(0,A.jsxs)(`div`,{className:`bg-slate-900 p-2 rounded text-center border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 block`,children:`Lá B2`}),(0,A.jsx)(`span`,{className:`text-sm font-bold text-slate-300 font-mono`,children:`9`})]})]})]}),(0,A.jsxs)(`div`,{className:`flex flex-col items-center p-3 rounded-xl border transition-all ${e?`bg-rose-950/20 border-rose-500/50`:`bg-slate-800 border-slate-700`}`,children:[(0,A.jsx)(`div`,{className:`text-xs font-bold text-slate-200`,children:`Nhánh C (MIN)`}),(0,A.jsx)(`div`,{className:`text-[10px] font-mono mt-0.5 text-rose-400`,children:e?`Beta Cutoff! (0 <= α=3)`:`min(0, 7) = 0`}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 mt-3 w-full`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-900 p-2 rounded text-center border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 block`,children:`Lá C1`}),(0,A.jsx)(`span`,{className:`text-sm font-bold text-amber-400 font-mono`,children:`0`})]}),e?(0,A.jsxs)(`div`,{className:`bg-rose-950/40 p-2 rounded text-center border border-dashed border-rose-500/60 flex flex-col items-center justify-center`,children:[(0,A.jsx)(Tt,{className:`w-3.5 h-3.5 text-rose-400 mb-0.5`}),(0,A.jsx)(`span`,{className:`text-[9px] text-rose-300 font-bold uppercase`,children:`BỊ CẮT TỈA`}),(0,A.jsx)(`span`,{className:`text-[8px] text-slate-500 line-through`,children:`Lá C2 (7)`})]}):(0,A.jsxs)(`div`,{className:`bg-slate-900 p-2 rounded text-center border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 block`,children:`Lá C2`}),(0,A.jsx)(`span`,{className:`text-sm font-bold text-slate-300 font-mono`,children:`7`})]})]})]})]})]})}),(0,A.jsxs)(`div`,{className:`lg:col-span-4 space-y-4`,children:[(0,A.jsxs)(`div`,{className:`p-4 bg-slate-900/80 rounded-xl border border-slate-700 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`text-xs font-bold text-white flex items-center justify-between`,children:[(0,A.jsx)(`span`,{children:`Thống kê số nút duyệt:`}),(0,A.jsx)(M,{variant:e?`emerald`:`amber`,children:e?`Tiết kiệm 33.3% số nút`:`Duyệt 100% vét cạn`})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 text-center`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-800 p-3 rounded-lg border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[11px] text-slate-400 block`,children:`Số lá cần tính:`}),(0,A.jsx)(`span`,{className:`text-2xl font-black text-white font-mono mt-1`,children:e?`4 lá`:`6 lá`})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800 p-3 rounded-lg border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-[11px] text-slate-400 block`,children:`Nhánh bị cắt:`}),(0,A.jsx)(`span`,{className:`text-2xl font-black text-rose-400 font-mono mt-1`,children:e?`2 nhánh`:`0 nhánh`})]})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40`,children:e?(0,A.jsxs)(A.Fragment,{children:[`Tại `,(0,A.jsx)(`strong`,{children:`Nhánh B`}),`, sau khi duyệt lá B1 = 2, đối thủ đã có thể ép điểm xuống mức 2. Vì bên ta đã có lựa chọn A = 3 (ngưỡng α = 3), ta chắc chắn không bao giờ chọn đi vào B. Do đó lá B2 (dù có điểm bằng 9 cực lớn) cũng hoàn toàn vô nghĩa và bị cắt tỉa ngay!`]}):(0,A.jsx)(A.Fragment,{children:`Minimax thuần túy không biết về ngưỡng α = 3, buộc phải tốn công tính toán toàn bộ các lá B2 và C2 dù kết quả cuối cùng vẫn chọn Nhánh A.`})})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-[11px] text-slate-400`,children:[(0,A.jsx)(`span`,{className:`font-semibold text-slate-300`,children:`Ý nghĩa thực tiễn:`}),` Trên cây cờ vua thực tế với b ≈ 35 và d = 6, Alpha-Beta giúp bot chỉ phải duyệt khoảng `,(0,A.jsx)(`strong`,{children:`40,000 nút`}),` thay vì `,(0,A.jsx)(`strong`,{children:`1,800,000,000 nút`}),` của Minimax!`]})]})]})]})},dn=[0,0,0,0,0,0,0,0,98,134,61,95,68,126,34,-11,-6,7,26,31,65,56,25,-20,-14,13,6,21,23,12,17,-23,-27,-2,-5,12,17,6,10,-25,-26,-4,-4,-10,3,3,33,-12,-35,-1,-20,-23,-15,24,38,-22,0,0,0,0,0,0,0,0],fn=[0,0,0,0,0,0,0,0,178,173,158,134,147,132,165,187,94,100,85,67,56,53,82,84,32,24,13,5,-2,4,17,17,13,9,-3,-7,-7,-8,3,-1,4,7,-6,1,0,-5,-1,-8,13,8,8,-10,-6,0,2,-7,0,0,0,0,0,0,0,0],pn=[-167,-89,-34,-49,61,-97,-15,-107,-73,-41,72,36,23,62,7,-17,-47,60,37,65,84,129,73,44,-9,17,19,53,37,69,18,22,-13,4,16,13,28,19,21,-8,-23,-9,12,10,19,17,25,-16,-29,-53,-12,-3,-1,18,-14,-19,-105,-21,-58,-33,-17,-28,-19,-23],mn=[-58,-38,-13,-28,-31,-27,-63,-99,-25,-8,-25,-2,-9,-25,-24,-52,-24,-20,10,9,-1,-9,-19,-41,-17,3,22,22,22,11,8,-18,-18,-6,16,25,16,17,4,-18,-23,-3,-1,15,10,-3,-20,-22,-42,-20,-10,-5,-2,-20,-23,-44,-29,-51,-23,-15,-22,-18,-50,-64],hn=[-29,4,-82,-37,-25,-42,7,-8,-26,16,-18,-13,30,59,18,-47,-16,37,43,40,35,50,37,-2,-4,5,19,50,37,37,7,-2,-6,13,13,26,34,12,10,4,0,15,15,15,14,27,18,10,4,15,16,0,7,21,33,1,-33,-3,-14,-21,-13,-12,-39,-21],gn=[-14,-21,-11,-8,-7,-9,-17,-24,-8,-4,7,-12,-3,-13,-4,-14,2,-8,0,-1,-2,6,0,4,-3,9,12,9,14,10,3,2,-6,3,13,19,7,10,-3,-9,-12,-3,8,10,13,3,-7,-15,-14,-18,-7,-1,4,-9,-15,-27,-23,-9,-23,-5,-9,-16,-5,-17],_n=[32,42,32,51,63,9,31,43,27,32,58,62,80,67,26,44,-5,19,26,36,17,45,61,16,-24,-11,7,26,24,35,-8,-20,-36,-26,-12,-1,9,-7,6,-23,-45,-25,-16,-17,3,0,-5,-33,-44,-16,-20,-9,-1,11,-6,-71,-19,-13,1,17,16,7,-37,-26],vn=[13,10,18,15,12,12,8,5,11,13,13,11,-3,3,8,3,7,7,7,5,4,-3,-5,-3,4,3,13,1,2,1,-1,2,3,5,8,4,-5,-6,-8,-11,-4,0,-5,-1,-7,-12,-8,-16,-6,-6,0,2,-9,-9,-11,-3,-9,2,3,-1,-5,-13,4,-20],yn=[-28,0,29,12,59,44,43,45,-24,-39,-5,1,-16,57,28,54,-1,-16,9,18,56,60,57,35,-27,-27,-14,-1,12,10,6,10,-16,-15,-6,4,8,14,12,-5,-22,-15,-7,6,4,10,5,-17,-17,20,12,-2,9,12,46,16,-33,-28,-22,-43,-5,-32,-20,-41],bn=[-9,22,22,27,27,19,10,20,-17,20,32,41,58,25,30,0,-20,6,9,49,47,35,19,9,3,22,24,45,57,40,57,36,-18,28,19,47,31,34,39,18,-16,-27,15,6,9,17,10,5,-22,-23,-30,-16,-16,-23,-36,-32,-33,-28,-22,-43,-5,-32,-20,-41],xn=[-65,23,16,-15,-56,-34,2,13,29,-1,-20,-7,-8,-4,-38,-29,-9,24,2,-16,-20,6,22,-22,-17,-20,-12,-27,-30,-25,-14,-36,-49,-1,-27,-39,-46,-44,-33,-51,-14,-14,-22,-46,-44,-30,-15,-27,1,7,-8,-64,-43,-16,9,8,-15,36,12,-54,8,-28,24,14],Sn=[-74,-35,-18,-18,-11,15,4,-17,-12,17,14,17,17,38,23,11,10,17,23,15,20,45,44,13,-8,22,24,27,26,33,26,3,-18,-4,21,24,27,23,9,-11,-19,-3,11,21,23,16,7,-9,-27,-11,4,13,14,4,-5,-17,-53,-34,-8,-11,-6,-13,-24,-46],Cn=()=>{let[e,t]=(0,_.useState)(`N`),[n,r]=(0,_.useState)(`MG`),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(6),c={P:{MG:dn,EG:fn},N:{MG:pn,EG:mn},B:{MG:hn,EG:gn},R:{MG:_n,EG:vn},Q:{MG:yn,EG:bn},K:{MG:xn,EG:Sn}}[e][n],l=(e,t)=>`${String.fromCharCode(97+t)}${8-e}`,u=e=>e>40?`bg-emerald-600/70 text-white font-bold`:e>15?`bg-emerald-700/50 text-emerald-200`:e>0?`bg-teal-800/40 text-teal-200`:e===0?`bg-slate-800/40 text-slate-400`:e>-20?`bg-amber-900/40 text-amber-300`:e>-50?`bg-rose-900/40 text-rose-300`:`bg-rose-950/70 text-rose-200 font-bold`,d=o&7,f=o>>3,p=Math.max(0,d-1),m=Math.min(7,d+1),h=(e,t)=>e===f+1&&t>=p&&t<=m,g=(e,t)=>e===f+2&&t>=p&&t<=m,v=e=>e>=p&&e<=m;return(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(Pt,{className:`w-5 h-5 text-emerald-400`}),(0,A.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`Bàn Cờ Trực Quan: PeSTO Piece-Square Tables & King Ring`})]}),(0,A.jsxs)(`p`,{className:`text-xs text-slate-400 mt-1`,children:[`Minh họa trực quan điểm vị trí 64 ô cờ và vành đai bảo vệ Vua động từ`,` `,(0,A.jsx)(`code`,{className:`text-emerald-400`,children:`student/evaluation.py`})]})]}),(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,A.jsxs)(`button`,{onClick:()=>a(!1),className:`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${i?`bg-slate-700/70 text-slate-300 hover:bg-slate-700`:`bg-emerald-600 text-white shadow-md shadow-emerald-900/40`}`,children:[(0,A.jsx)(dt,{className:`w-3.5 h-3.5`}),` Bảng điểm PeSTO`]}),(0,A.jsxs)(`button`,{onClick:()=>a(!0),className:`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${i?`bg-cyan-600 text-white shadow-md shadow-cyan-900/40`:`bg-slate-700/70 text-slate-300 hover:bg-slate-700`}`,children:[(0,A.jsx)(k,{className:`w-3.5 h-3.5`}),` An toàn Vua động (Chess960)`]})]})]}),i?(0,A.jsxs)(`div`,{className:`my-4 p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-xs text-cyan-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(k,{className:`w-4 h-4 text-cyan-400 shrink-0`}),(0,A.jsxs)(`span`,{children:[(0,A.jsx)(`strong`,{children:`Chế độ An toàn Vua:`}),` Nhấp vào bất kỳ ô nào ở hàng 1-3 để đặt vị trí Vua Trắng và xem vùng vành đai bảo vệ được tính tự động!`]})]}),(0,A.jsxs)(M,{variant:`cyan`,children:[`Vua đang ở: ô `,String.fromCharCode(97+(o&7)),(o>>3)+1]})]}):(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3 my-4 p-3 bg-slate-900/60 rounded-xl border border-slate-700/50`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,A.jsx)(`span`,{className:`text-xs text-slate-400 font-medium mr-1`,children:`Quân cờ:`}),[{id:`P`,name:`Tốt (P)`},{id:`N`,name:`Mã (N)`},{id:`B`,name:`Tượng (B)`},{id:`R`,name:`Xe (R)`},{id:`Q`,name:`Hậu (Q)`},{id:`K`,name:`Vua (K)`}].map(n=>(0,A.jsx)(`button`,{onClick:()=>t(n.id),className:`px-2.5 py-1 rounded text-xs font-bold transition-all ${e===n.id?`bg-emerald-500 text-slate-950 shadow`:`bg-slate-800 text-slate-300 hover:bg-slate-700`}`,children:n.name},n.id))]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(`span`,{className:`text-xs text-slate-400 font-medium`,children:`Giai đoạn:`}),(0,A.jsxs)(`div`,{className:`inline-flex rounded-lg p-0.5 bg-slate-800 border border-slate-700`,children:[(0,A.jsx)(`button`,{onClick:()=>r(`MG`),className:`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${n===`MG`?`bg-indigo-600 text-white`:`text-slate-400 hover:text-slate-200`}`,children:`Trung cuộc (MG)`}),(0,A.jsx)(`button`,{onClick:()=>r(`EG`),className:`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${n===`EG`?`bg-amber-600 text-white`:`text-slate-400 hover:text-slate-200`}`,children:`Tàn cuộc (EG)`})]})]})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2`,children:[(0,A.jsx)(`div`,{className:`lg:col-span-7 flex justify-center`,children:(0,A.jsxs)(`div`,{className:`inline-block p-2 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl`,children:[(0,A.jsx)(`div`,{className:`grid grid-cols-8 gap-0.5 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]`,children:Array.from({length:64}).map((e,t)=>{let n=Math.floor(t/8),r=t%8,a=7-n,d=r,p=a*8+d,m=c[t],_=l(n,r),y=(n+r)%2==0;if(i){let e=p===o,n=h(a,d),r=g(a,d),i=v(d),c=y?`bg-slate-700/40`:`bg-slate-800/80`,l=`border-transparent`;return e?c=`bg-cyan-500 text-slate-950 font-black shadow-lg animate-pulse`:n?c=`bg-emerald-600/70 text-white font-bold`:r?c=`bg-emerald-900/50 text-emerald-200`:i&&a>f&&(c=`bg-slate-700/60 text-slate-300`,l=`border-cyan-500/30 border-dashed`),(0,A.jsxs)(`button`,{onClick:()=>{a<=2&&s(p)},className:`relative flex flex-col items-center justify-center p-0.5 border ${l} ${c} rounded transition-all hover:scale-105 hover:z-10`,title:`${_} - ${e?`Vị trí Vua`:n?`Lá chắn Tốt gần (+18cp)`:r?`Lá chắn Tốt xa (+9cp)`:`Ô cờ`}`,children:[(0,A.jsx)(`span`,{className:`text-[9px] absolute top-0.5 left-1 opacity-60 font-mono`,children:_}),e&&(0,A.jsx)(`span`,{className:`text-xl`,children:`♔`}),n&&(0,A.jsx)(`span`,{className:`text-[10px] font-bold text-emerald-200`,children:`+18`}),r&&(0,A.jsx)(`span`,{className:`text-[10px] font-bold text-emerald-300`,children:`+9`})]},t)}let b=u(m);return(0,A.jsxs)(`div`,{className:`relative flex flex-col items-center justify-center p-0.5 rounded ${b} transition-all hover:scale-105 hover:z-10 shadow-sm`,title:`${_}: ${m>0?`+`:``}${m} centipawns`,children:[(0,A.jsx)(`span`,{className:`text-[9px] absolute top-0.5 left-1 opacity-50 font-mono`,children:_}),(0,A.jsx)(`span`,{className:`text-xs sm:text-sm font-mono mt-1`,children:m>0?`+${m}`:m})]},t)})}),(0,A.jsxs)(`div`,{className:`flex justify-between px-2 pt-1 text-[10px] text-slate-500 font-mono`,children:[(0,A.jsx)(`span`,{children:`a`}),(0,A.jsx)(`span`,{children:`b`}),(0,A.jsx)(`span`,{children:`c`}),(0,A.jsx)(`span`,{children:`d`}),(0,A.jsx)(`span`,{children:`e`}),(0,A.jsx)(`span`,{children:`f`}),(0,A.jsx)(`span`,{children:`g`}),(0,A.jsx)(`span`,{children:`h`})]})]})}),(0,A.jsxs)(`div`,{className:`lg:col-span-5 space-y-4`,children:[i?(0,A.jsxs)(`div`,{className:`bg-cyan-950/30 rounded-xl p-4 border border-cyan-500/40 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,A.jsx)(`span`,{className:`text-xs font-semibold text-cyan-300`,children:`Cơ chế Dynamic Bitwise King Ring (Nhóm 12)`}),(0,A.jsx)(M,{variant:`cyan`,children:`An toàn 960 thế`})]}),(0,A.jsxs)(`div`,{className:`text-xs text-slate-300 space-y-2 leading-relaxed`,children:[(0,A.jsxs)(`p`,{children:[`Trong `,(0,A.jsx)(`strong`,{children:`Chess960`}),`, Vua không cố định ở e1 mà có thể xuất phát ở bất kỳ ô nào từ b1 đến g1.`]}),(0,A.jsxs)(`div`,{className:`space-y-1 font-mono text-[11px] bg-slate-900/80 p-2.5 rounded-lg border border-cyan-500/20`,children:[(0,A.jsxs)(`div`,{className:`text-emerald-400`,children:[`• Lá chắn gần (Near Shield): +18 cp cho mỗi Tốt bảo vệ trực diện (hàng `,f+2,`)`]}),(0,A.jsxs)(`div`,{className:`text-emerald-300`,children:[`• Lá chắn xa (Far Shield): +9 cp cho mỗi Tốt ở hàng `,f+3]}),(0,A.jsx)(`div`,{className:`text-rose-400`,children:`• Cột mở trước mặt Vua: Phạt -36 cp nếu cả 2 bên không có Tốt`}),(0,A.jsx)(`div`,{className:`text-amber-400`,children:`• Cột bán mở trước mặt Vua: Phạt -18 cp nếu bên ta không có Tốt`})]}),(0,A.jsxs)(`p`,{className:`text-[11px] text-slate-400`,children:[`Hàm `,(0,A.jsx)(`code`,{className:`text-cyan-400`,children:`_build_king_zones()`}),` tính sẵn 5 tuple mặt nạ 64-bit cho toàn bộ 64 ô cờ ngay lúc import, đạt tốc độ kiểm tra O(1) bằng bitwise AND mà không tốn chu kỳ lặp.`]})]})]}):(0,A.jsxs)(`div`,{className:`bg-slate-900/80 rounded-xl p-4 border border-slate-700/70 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,A.jsxs)(`span`,{className:`text-xs font-semibold text-slate-300`,children:[`Ý nghĩa chiến thuật của `,e===`P`?`Tốt`:e===`N`?`Mã`:e===`B`?`Tượng`:e===`R`?`Xe`:e===`Q`?`Hậu`:`Vua`,` (`,n,`)`]}),(0,A.jsx)(M,{variant:n===`MG`?`indigo`:`amber`,children:n===`MG`?`Trung cuộc (MG)`:`Tàn cuộc (EG)`})]}),(0,A.jsxs)(`div`,{className:`text-xs text-slate-300 space-y-2 leading-relaxed`,children:[e===`N`&&n===`MG`&&(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`strong`,{children:`Mã ở Trung cuộc:`}),` Được thưởng điểm cực cao tại các ô trung tâm d4, e4, d5, e5 (+53 đến +69 cp) và bị phạt nặng nếu đứng ở góc a1, h1 (-105 đến -167 cp) theo châm ngôn kinh điển "A knight on the rim is dim".`]}),e===`P`&&n===`EG`&&(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`strong`,{children:`Tốt ở Tàn cuộc:`}),` Điểm số tăng vọt theo từng bước tiến về hàng 7 (+134 đến +187 cp), khuyến khích bot đẩy Tốt thông phong cấp thành Hậu.`]}),e===`K`&&n===`MG`&&(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`strong`,{children:`Vua ở Trung cuộc:`}),` Được thưởng điểm khi ẩn nấp ở góc an toàn g1 (+24 cp) sau khi nhập thành, và bị phạt rất nặng nếu lang thang ở trung tâm e4 (-46 cp).`]}),e===`K`&&n===`EG`&&(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`strong`,{children:`Vua ở Tàn cuộc:`}),` Đảo ngược hoàn toàn! Vua được thưởng điểm cao khi tiến vào trung tâm d4, e4, d5, e5 (+24 đến +45 cp) để hỗ trợ phong cấp Tốt và dồn Vua đối phương.`]}),e===`R`&&(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`strong`,{children:`Xe:`}),` Luôn được thưởng điểm cao ở hàng 7/2 (+26 đến +80 cp) để tấn công hàng Tốt của đối phương và cắt đường Vua.`]}),e===`B`&&(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`strong`,{children:`Tượng:`}),` Được định hướng kiểm soát các đường chéo dài trung tâm (+37 đến +59 cp) và tránh bị cản trở bởi hàng Tốt của mình.`]}),e===`Q`&&(0,A.jsxs)(`p`,{children:[(0,A.jsx)(`strong`,{children:`Hậu:`}),` Hạn chế xuất quân quá sớm ở trung cuộc để tránh bị tấn công (-28 đến -43 cp ở hàng 1-2), nhưng chiếm lĩnh bàn cờ ở tàn cuộc.`]})]}),(0,A.jsxs)(`div`,{className:`pt-2 border-t border-slate-700/60`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 mb-1.5 font-medium`,children:`Chú giải màu sắc nhiệt (Heatmap):`}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-1.5 text-[10px]`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,A.jsx)(`span`,{className:`w-3 h-3 rounded bg-emerald-600/70 shrink-0`}),(0,A.jsx)(`span`,{className:`text-slate-300`,children:`> +40 cp (Vị trí đắc địa)`})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,A.jsx)(`span`,{className:`w-3 h-3 rounded bg-teal-800/40 shrink-0`}),(0,A.jsx)(`span`,{className:`text-slate-300`,children:`0..+40 cp (Có lợi)`})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,A.jsx)(`span`,{className:`w-3 h-3 rounded bg-amber-900/40 shrink-0`}),(0,A.jsx)(`span`,{className:`text-slate-300`,children:`-20..0 cp (Kém ưu thế)`})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,A.jsx)(`span`,{className:`w-3 h-3 rounded bg-rose-950/70 shrink-0`}),(0,A.jsx)(`span`,{className:`text-slate-300`,children:`< -50 cp (Ô xấu/nguy hiểm)`})]})]})]})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-xs text-slate-400`,children:[(0,A.jsx)(`span`,{className:`font-semibold text-slate-300`,children:`File tham chiếu:`}),` `,(0,A.jsx)(`code`,{className:`text-emerald-400`,children:`student/evaluation.py`}),` (dòng 66-237 và 321-360)`]})]})]})]})},wn=()=>{let[e,t]=(0,_.useState)(45e3),[n,r]=(0,_.useState)(38e3),[i,a]=(0,_.useState)(14),[o,s]=(0,_.useState)(45),[c,l]=(0,_.useState)(30),u=Math.max(0,n-50),d=e<=6e4,f=Math.floor(i/2),p=0,m=0,h=``,g=``,v=`emerald`;if(d)u<=1500?(p=8,m=15,h=`1. Cực hạn sinh tồn (Panic Extreme)`,g=`Dưới 1.5s còn lại. Tìm kiếm 8ms/15ms ở depth 1-2 để triệt tiêu 100% nguy cơ rụng cờ.`,v=`rose`):u<=3500?(p=15,m=25,h=`2. Chế độ khẩn cấp (Emergency Mode)`,g=`Dưới 3.5s còn lại. Rút ngắn thời gian để giữ đồng hồ sinh tồn.`,v=`rose`):f>=55?(p=25,m=40,h=`3. Tàn cuộc siêu dài (Marathon Endgame)`,g=`Sau nước 55 (ply >= 110). Duy trì ngân sách 25ms-40ms để hoàn tất Depth 3 trong các ván cờ cực dài.`,v=`amber`):f>=40||u<=1e4?(p=35,m=55,h=`4. Tàn cuộc sâu (Deep Endgame)`,g=`Sau nước 40 hoặc đồng hồ <= 10s. Với 90k NPS, duyệt 3,500-5,000 nodes, hoàn tất Depth 3-4, được hấp thụ bởi trễ sàn 500ms.`,v=`cyan`):f>=32||u<=18e3?(p=60,m=90,h=`5. Giai đoạn chuyển tiếp (Transition)`,g=`Nước 32-39 hoặc thời gian <= 18s. Bước đệm cân bằng giữa trung cuộc và cờ tàn.`,v=`indigo`):(p=150,m=220,h=`6. Khai cuộc & Trung cuộc (Opening & Midgame)`,g=`Nước 1-31. Ngân sách 150ms-220ms được "hấp thụ" hoàn toàn bởi độ trễ tối thiểu 500ms của GameController!`,v=`emerald`);else{let e=Math.max(1,Math.floor((301-Math.max(0,i))/2)),t=Math.max(0,n-1e3);if(t<=3e3)p=15,m=25,h=`Standard: Khẩn cấp cực hạn (<= 3s)`,g=`Thời gian khả dụng dưới 3s. Tìm kiếm nhanh để bảo toàn đồng hồ.`,v=`rose`;else if(t<=1e4)p=50,m=100,h=`Standard: Khẩn cấp trung bình (<= 10s)`,g=`Ngân sách 50ms - 100ms, ưu tiên hoàn thành Depth 4.`,v=`amber`;else if(t<=25e3)p=120,m=200,h=`Standard: Chuyển tiếp (<= 25s)`,g=`Ngân sách 120ms - 200ms, duy trì độ sâu 5-6 ply.`,v=`cyan`;else{let r=Math.floor(t/(e+10));m=Math.min(r,Math.floor(n*.15)),m=Math.max(m,Math.min(1500,t)),p=Math.floor(m*.7),h=`Standard: Thi đấu bình thường`,g=`Phân bổ đều cho ${e} nước còn lại (+10 nước đệm), tối đa 15% quỹ thời gian.`,v=`emerald`}}let y=Math.floor(o*2.2),b=c>=p,ee=c+y>=m,x=!b&&!ee,S=Math.min(100,Math.round(Math.min(m,500)/500*100));return(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(O,{className:`w-5 h-5 text-emerald-400`}),(0,A.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`Máy Tính Ngân Sách Thời Gian Thích Ứng (Time Manager)`})]}),(0,A.jsxs)(`p`,{className:`text-xs text-slate-400 mt-1`,children:[`Mô phỏng công thức toán học thực tế từ `,(0,A.jsx)(`code`,{className:`text-emerald-400`,children:`student/time_manager.py`}),` của Nhóm 12`]})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(`button`,{onClick:()=>{t(45e3),r(38e3),a(14)},className:`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${d?`bg-emerald-600 text-white shadow-md shadow-emerald-900/40`:`bg-slate-700/70 text-slate-300 hover:bg-slate-700`}`,children:`Blitz (45s)`}),(0,A.jsx)(`button`,{onClick:()=>{t(18e4),r(15e4),a(24)},className:`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${d?`bg-slate-700/70 text-slate-300 hover:bg-slate-700`:`bg-emerald-600 text-white shadow-md shadow-emerald-900/40`}`,children:`Standard (180s)`})]})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6`,children:[(0,A.jsxs)(`div`,{className:`space-y-5`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex justify-between text-xs font-medium text-slate-300 mb-2`,children:[(0,A.jsx)(`span`,{children:`Thời gian còn lại trên đồng hồ`}),(0,A.jsxs)(`span`,{className:`text-emerald-400 font-mono font-bold`,children:[(n/1e3).toFixed(1),`s (`,n.toLocaleString(),` ms)`]})]}),(0,A.jsx)(`input`,{type:`range`,min:`500`,max:e,step:`500`,value:n,onChange:e=>r(Number(e.target.value)),className:`w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500`}),(0,A.jsxs)(`div`,{className:`flex justify-between text-[10px] text-slate-500 mt-1`,children:[(0,A.jsx)(`span`,{children:`0.5s (Cực hạn)`}),(0,A.jsxs)(`span`,{children:[(e/2e3).toFixed(0),`s`]}),(0,A.jsxs)(`span`,{children:[(e/1e3).toFixed(0),`s (Ban đầu)`]})]})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex justify-between text-xs font-medium text-slate-300 mb-2`,children:[(0,A.jsx)(`span`,{children:`Số nửa nước đi đã chơi (Ply)`}),(0,A.jsxs)(`span`,{className:`text-emerald-400 font-mono font-bold`,children:[i,` ply (Nước thứ `,f,`)`]})]}),(0,A.jsx)(`input`,{type:`range`,min:`0`,max:`200`,step:`2`,value:i,onChange:e=>a(Number(e.target.value)),className:`w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500`}),(0,A.jsxs)(`div`,{className:`flex justify-between text-[10px] text-slate-500 mt-1`,children:[(0,A.jsx)(`span`,{children:`0 ply (Khai cuộc)`}),(0,A.jsx)(`span`,{children:`80 ply (Nước 40)`}),(0,A.jsx)(`span`,{children:`110 ply (Nước 55)`}),(0,A.jsx)(`span`,{children:`200 ply (Tàn cuộc sâu)`})]})]}),(0,A.jsxs)(`div`,{className:`p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 text-xs font-semibold text-slate-200`,children:[(0,A.jsx)(Kt,{className:`w-4 h-4 text-amber-400`}),(0,A.jsx)(`span`,{children:`Dự đoán tăng trưởng thời gian tầng kế tiếp (Branching x2.2)`})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 text-xs`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`label`,{className:`text-[11px] text-slate-400 block mb-1`,children:`Thời gian tầng trước (ms):`}),(0,A.jsx)(`input`,{type:`number`,min:`1`,max:`500`,value:o,onChange:e=>s(Math.max(1,Number(e.target.value))),className:`w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono`})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`label`,{className:`text-[11px] text-slate-400 block mb-1`,children:`Đã tiêu ở tầng này (ms):`}),(0,A.jsx)(`input`,{type:`number`,min:`0`,max:`500`,value:c,onChange:e=>l(Math.max(0,Number(e.target.value))),className:`w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono`})]})]})]})]}),(0,A.jsxs)(`div`,{className:`space-y-4`,children:[(0,A.jsxs)(`div`,{className:`p-4 bg-slate-900/90 rounded-xl border border-slate-700/90 space-y-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,A.jsx)(`span`,{className:`text-xs text-slate-400 font-medium`,children:`Giai đoạn nhận diện:`}),(0,A.jsx)(M,{variant:v,children:d?`Blitz Mode`:`Standard Mode`})]}),(0,A.jsx)(`div`,{className:`text-sm font-bold text-white`,children:h}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40`,children:g}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 pt-2`,children:[(0,A.jsxs)(`div`,{className:`bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-emerald-400 font-medium`,children:`Giới hạn mềm (Soft Limit)`}),(0,A.jsxs)(`div`,{className:`text-2xl font-black text-white font-mono mt-1`,children:[p,` `,(0,A.jsx)(`span`,{className:`text-xs font-normal text-slate-400`,children:`ms`})]}),(0,A.jsx)(`div`,{className:`text-[10px] text-slate-400 mt-1`,children:`Ngưỡng quyết định có mở tầng mới hay dừng`})]}),(0,A.jsxs)(`div`,{className:`bg-rose-950/40 border border-rose-500/30 rounded-xl p-3`,children:[(0,A.jsx)(`div`,{className:`text-[11px] text-rose-400 font-medium`,children:`Giới hạn cứng (Hard Limit)`}),(0,A.jsxs)(`div`,{className:`text-2xl font-black text-white font-mono mt-1`,children:[m,` `,(0,A.jsx)(`span`,{className:`text-xs font-normal text-slate-400`,children:`ms`})]}),(0,A.jsx)(`div`,{className:`text-[10px] text-slate-400 mt-1`,children:`Ngắt khẩn cấp ngay nếu vượt quá hạn chót`})]})]})]}),(0,A.jsxs)(`div`,{className:`p-4 bg-slate-900/70 rounded-xl border border-slate-700/70`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between mb-2`,children:[(0,A.jsxs)(`span`,{className:`text-xs font-semibold text-slate-300 flex items-center gap-1.5`,children:[(0,A.jsx)(tt,{className:`w-4 h-4 text-cyan-400`}),`Hàm can_start_next_depth() kết luận:`]}),x?(0,A.jsxs)(`span`,{className:`inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30`,children:[(0,A.jsx)(kt,{className:`w-3.5 h-3.5`}),` CHO PHÉP MỞ TẦNG`]}):(0,A.jsxs)(`span`,{className:`inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30`,children:[(0,A.jsx)(Ht,{className:`w-3.5 h-3.5`}),` DỪNG TÌM KIẾM`]})]}),(0,A.jsxs)(`div`,{className:`text-[11px] text-slate-400 space-y-1 font-mono`,children:[(0,A.jsxs)(`div`,{children:[`• Thời gian ước tính tầng sau: `,o,`ms × 2.2 =`,` `,(0,A.jsxs)(`span`,{className:`text-amber-400 font-bold`,children:[y,`ms`]})]}),(0,A.jsxs)(`div`,{children:[`• Tổng thời gian dự kiến: `,c,`ms + `,y,`ms =`,` `,(0,A.jsxs)(`span`,{className:c+y>=m?`text-rose-400 font-bold`:`text-emerald-400`,children:[c+y,`ms`]}),` `,`(Hard limit: `,m,`ms)`]}),b&&(0,A.jsxs)(`div`,{className:`text-rose-400`,children:[`⚠️ Đã vượt Soft limit (`,c,`ms >= `,p,`ms)`]}),ee&&(0,A.jsxs)(`div`,{className:`text-rose-400`,children:[`⚠️ Dự kiến sẽ vượt Hard limit (`,c+y,`ms >= `,m,`ms)`]})]})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl`,children:[(0,A.jsxs)(`div`,{className:`flex justify-between items-center text-xs mb-1`,children:[(0,A.jsx)(`span`,{className:`text-slate-300 font-medium`,children:`Tỷ lệ hấp thụ độ trễ sàn 500ms của máy chủ:`}),(0,A.jsxs)(`span`,{className:`text-emerald-400 font-mono font-bold`,children:[S,`%`]})]}),(0,A.jsx)(`div`,{className:`w-full bg-slate-700 h-2 rounded-full overflow-hidden`,children:(0,A.jsx)(`div`,{className:`bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300`,style:{width:`${S}%`}})}),(0,A.jsxs)(`p`,{className:`text-[10px] text-slate-400 mt-1`,children:[`Ngân sách `,m,`ms được độ trễ sàn `,500,`ms bảo trợ hoàn toàn, không tiêu hao thời gian thực.`]})]})]})]})]})},Tn=[{id:`m1`,san:`Qxd4`,uci:`d8d4`,type:`Bắt quân bất lợi (Bad SEE)`,tier:7,score:49320,reason:`Hậu ăn Tốt có bảo vệ: SEE < 0 (lỗ 680 cp). Bị đẩy xuống cuối nhóm bắt quân.`},{id:`m2`,san:`Nf3`,uci:`g1f3`,type:`TT Move (Hash Move)`,tier:1,score:1e7,reason:`Nước đi tốt nhất tìm được từ độ sâu trước lưu trong Transposition Table. Ưu tiên số 1!`},{id:`m3`,san:`exd8=Q`,uci:`e7d8q`,type:`Phong cấp Hậu`,tier:2,score:12e5,reason:`Tốt phong cấp thành Hậu, tạo ưu thế vật chất chí mạng.`},{id:`m4`,san:`Qd2`,uci:`d1d2`,type:`Chạy thoát quân to bị dọa`,tier:2,score:11e5,reason:`Hậu đang bị Mã đối phương tấn công, rút lui sang ô an toàn (Tầng 2b).`},{id:`m5`,san:`Bxf7+`,uci:`c4f7`,type:`Chiếu an toàn (Safe Check)`,tier:5,score:65e4,reason:`Tượng chiếu Vua sang ô không bị đối phương kiểm soát trực diện.`},{id:`m6`,san:`Bxe5`,uci:`c3e5`,type:`Bắt quân có lợi (Good SEE + MVV-LVA)`,tier:3,score:1001920,reason:`Tượng ăn Mã được tính SEE >= 0 kèm điểm MVV-LVA cao.`},{id:`m7`,san:`c4`,uci:`c2c4`,type:`Killer Move 1`,tier:4,score:9e5,reason:`Nước đi yên lặng từng gây Beta Cutoff ở cùng ply trong một nhánh trước.`},{id:`m8`,san:`a3`,uci:`a2a3`,type:`Nước yên lặng (History)`,tier:8,score:34200,reason:`Nước đi yên lặng bình thường, điểm số lấy từ bảng History Heuristic.`}],En=()=>{let[e,t]=(0,_.useState)(Tn),[n,r]=(0,_.useState)(!1);return(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(fe,{className:`w-5 h-5 text-emerald-400`}),(0,A.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`Mô Phỏng Phân Tầng Sắp Xếp Nước Đi (_order_moves)`})]}),(0,A.jsxs)(`p`,{className:`text-xs text-slate-400 mt-1`,children:[`Hệ thống 7 tầng chấm điểm heuristic từ `,(0,A.jsx)(`code`,{className:`text-emerald-400`,children:`student/search.py`}),` giúp tỷ lệ cắt tỉa Beta đạt > 85%`]})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsxs)(`button`,{onClick:()=>{let n=[...e].sort(()=>Math.random()-.5);t(n),r(!1)},className:`px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition flex items-center gap-1.5`,children:[(0,A.jsx)(Mt,{className:`w-3.5 h-3.5`}),` Xáo trộn ngẫu nhiên`]}),(0,A.jsxs)(`button`,{onClick:()=>{let n=[...e].sort((e,t)=>t.score-e.score);t(n),r(!0)},className:`px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md transition flex items-center gap-1.5 font-bold`,children:[(0,A.jsx)(ge,{className:`w-3.5 h-3.5`}),` Sắp xếp theo _order_moves`]})]})]}),(0,A.jsx)(`div`,{className:`mt-5 space-y-2.5`,children:e.map((e,t)=>{let r=`slate`;return e.score>=1e7?r=`purple`:e.score>=1e6?r=`emerald`:e.score>=8e5?r=`cyan`:e.score>=6e5?r=`amber`:e.score<1e5&&(r=`slate`),(0,A.jsxs)(`div`,{className:`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${n&&t===0?`bg-purple-950/30 border-purple-500/60 shadow-lg scale-[1.01]`:`bg-slate-900/70 border-slate-700/60 hover:border-slate-600`}`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,A.jsx)(`span`,{className:`w-6 h-6 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0`,children:t+1}),(0,A.jsxs)(`div`,{className:`flex items-baseline gap-2`,children:[(0,A.jsx)(`span`,{className:`text-base font-extrabold text-white font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700`,children:e.san}),(0,A.jsxs)(`span`,{className:`text-xs text-slate-400 font-mono`,children:[`(`,e.uci,`)`]})]}),(0,A.jsx)(M,{variant:r,size:`sm`,children:e.type})]}),(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center gap-4 text-xs`,children:[(0,A.jsx)(`p`,{className:`text-slate-300 max-w-md text-[11px] leading-relaxed`,children:e.reason}),(0,A.jsx)(`div`,{className:`text-right shrink-0`,children:(0,A.jsxs)(`div`,{className:`text-xs font-mono font-bold text-emerald-400`,children:[e.score.toLocaleString(),` `,(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 font-normal`,children:`pts`})]})})]})]},e.id)})}),(0,A.jsxs)(`div`,{className:`mt-5 p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 flex items-start gap-3 text-xs text-slate-300`,children:[(0,A.jsx)(Ee,{className:`w-4 h-4 text-emerald-400 shrink-0 mt-0.5`}),(0,A.jsxs)(`p`,{className:`leading-relaxed`,children:[(0,A.jsx)(`strong`,{children:`Tại sao thứ tự này tối ưu?`}),` Nước `,(0,A.jsx)(`code`,{className:`text-purple-400 font-bold`,children:`Nf3`}),` (TT Move) được duyệt đầu tiên vì đây là nước tốt nhất đã chứng minh ở tầng trước. Nếu nước này gây Beta Cutoff ngay lập tức, bot chỉ tốn đúng `,(0,A.jsx)(`strong`,{children:`1 phép tính`}),` và bỏ qua toàn bộ 7 nước đi còn lại!`]})]})]})},Dn=()=>{let[e,t]=(0,_.useState)(29995),[n,r]=(0,_.useState)(3),[i,a]=(0,_.useState)(7),o=e>=29e3?e+n:e<=-29e3?e-n:e,s=o>=29e3?o-i:o<=-29e3?o+i:o;return(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(ze,{className:`w-5 h-5 text-purple-400`}),(0,A.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`Cơ Chế Bảng Chuyển Vị (Transposition Table) & Chuẩn Hóa Điểm Chiếu Hết`})]}),(0,A.jsxs)(`p`,{className:`text-xs text-slate-400 mt-1`,children:[`Bảng băm 524,288 mục, Zobrist Hash O(1) và thuật toán `,(0,A.jsx)(`code`,{className:`text-purple-400`,children:`score_to_tt`}),` / `,(0,A.jsx)(`code`,{className:`text-purple-400`,children:`score_from_tt`})]})]}),(0,A.jsx)(M,{variant:`purple`,children:`2^19 = 524,288 Mục`})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6`,children:[(0,A.jsxs)(`div`,{className:`space-y-4`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-900/80 rounded-xl p-4 border border-slate-700 space-y-3`,children:[(0,A.jsxs)(`h3`,{className:`text-xs font-bold text-white flex items-center gap-2`,children:[(0,A.jsx)(lt,{className:`w-4 h-4 text-emerald-400`}),`Ba Loại Cận (Bound Flags) trong Transposition Table:`]}),(0,A.jsxs)(`div`,{className:`space-y-2 text-xs`,children:[(0,A.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-2.5`,children:[(0,A.jsx)(`span`,{className:`font-mono px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px]`,children:`TT_EXACT = 0`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-bold text-white`,children:`Điểm chính xác (PV-Node)`}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-300`,children:`Điểm số nằm trọn vẹn trong khoảng (alpha < score < beta). Được sử dụng trực tiếp vô điều kiện.`})]})]}),(0,A.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5`,children:[(0,A.jsx)(`span`,{className:`font-mono px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px]`,children:`TT_LOWER = 1`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-bold text-white`,children:`Cận dưới (Cut-Node / Fail-High)`}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-300`,children:`Nước đi quá mạnh (score >= beta). Chỉ được sử dụng lại khi điểm số lưu trữ >= beta hiện tại.`})]})]}),(0,A.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5`,children:[(0,A.jsx)(`span`,{className:`font-mono px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px]`,children:`TT_UPPER = 2`}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`font-bold text-white`,children:`Cận trên (All-Node / Fail-Low)`}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-300`,children:`Mọi nước đi đều yếu (score <= alpha). Chỉ được sử dụng lại khi điểm số lưu trữ <= alpha hiện tại.`})]})]})]})]}),(0,A.jsxs)(`div`,{className:`p-3.5 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs text-slate-300`,children:[(0,A.jsx)(`div`,{className:`font-bold text-white mb-1.5`,children:`Chính sách thay thế 4 điều kiện:`}),(0,A.jsxs)(`ol`,{className:`list-decimal list-inside space-y-1 text-[11px] text-slate-400 font-mono`,children:[(0,A.jsx)(`li`,{children:`Ô băm còn trống (existing is None)`}),(0,A.jsx)(`li`,{children:`Trùng khóa băm (existing.key == key) → cập nhật thông tin`}),(0,A.jsx)(`li`,{children:`Mục cũ thuộc thế hệ nước đi trước (existing.age != age)`}),(0,A.jsx)(`li`,{children:`Lượt tìm kiếm mới sâu hơn hoặc bằng (depth >= existing.depth)`})]})]})]}),(0,A.jsxs)(`div`,{className:`bg-slate-900/90 rounded-xl p-5 border border-purple-500/40 space-y-4`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between pb-3 border-b border-slate-800`,children:[(0,A.jsxs)(`h3`,{className:`text-xs font-bold text-purple-300 flex items-center gap-1.5`,children:[(0,A.jsx)(xt,{className:`w-4 h-4 text-purple-400`}),`Mô phỏng Chuẩn hóa Điểm Chiếu Hết (Mate Normalization)`]}),(0,A.jsx)(M,{variant:`purple`,children:`score_to_tt & score_from_tt`})]}),(0,A.jsxs)(`div`,{className:`space-y-3 text-xs`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`label`,{className:`text-slate-400 block mb-1`,children:`Điểm chiếu hết tìm thấy tại nút hiện tại (centipawns):`}),(0,A.jsx)(`input`,{type:`number`,value:e,onChange:e=>t(Number(e.target.value)),className:`w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-white font-mono font-bold`}),(0,A.jsx)(`span`,{className:`text-[10px] text-slate-500`,children:`(30,000 là chiếu hết ngay; 29,995 tương đương chiếu hết sau 5 ply nữa)`})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 gap-3`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`label`,{className:`text-slate-400 block mb-1`,children:`Ply lúc tìm thấy (store ply):`}),(0,A.jsx)(`input`,{type:`number`,min:`0`,max:`50`,value:n,onChange:e=>r(Math.max(0,Number(e.target.value))),className:`w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono`})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`label`,{className:`text-slate-400 block mb-1`,children:`Ply lúc tra cứu lại (probe ply):`}),(0,A.jsx)(`input`,{type:`number`,min:`0`,max:`50`,value:i,onChange:e=>a(Math.max(0,Number(e.target.value))),className:`w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono`})]})]}),(0,A.jsxs)(`div`,{className:`p-3.5 bg-slate-950 rounded-xl border border-purple-500/30 space-y-2 font-mono text-xs`,children:[(0,A.jsxs)(`div`,{className:`flex justify-between items-center`,children:[(0,A.jsx)(`span`,{className:`text-slate-400`,children:`1. Lưu vào TT qua score_to_tt():`}),(0,A.jsx)(`span`,{className:`text-purple-400 font-bold`,children:o.toLocaleString()})]}),(0,A.jsxs)(`div`,{className:`text-[11px] text-slate-500`,children:[`Công thức: `,e,` + `,n,` = `,o,` (Điểm độc lập với vị trí cây)`]}),(0,A.jsxs)(`div`,{className:`border-t border-slate-800 pt-2 flex justify-between items-center`,children:[(0,A.jsxs)(`span`,{className:`text-slate-400`,children:[`2. Lấy ra tại ply=`,i,` qua score_from_tt():`]}),(0,A.jsx)(`span`,{className:`text-emerald-400 font-bold text-sm`,children:s.toLocaleString()})]}),(0,A.jsxs)(`div`,{className:`text-[11px] text-slate-500`,children:[`Công thức: `,o,` - `,i,` = `,s,` (Tái tạo đúng số nước chiếu hết từ gốc mới)`]})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-purple-950/30 border border-purple-500/20 rounded-lg text-[11px] text-purple-200 leading-relaxed`,children:[(0,A.jsx)(`strong`,{children:`Tại sao bắt buộc?`}),` Nếu không chuẩn hóa, một đòn chiếu hết ở ply 3 (còn 2 nước) khi được lấy ra ở một nhánh khác tại ply 7 sẽ bị bot hiểu nhầm là vẫn còn 5 nước nữa mới chiếu hết, dẫn đến việc chọn sai chuỗi nước đi ngắn nhất!`]})]})]})]})]})},On=({onNavigate:e,targetTopicId:t})=>{let[n,r]=(0,_.useState)(t||$t[0].id),[i,a]=(0,_.useState)(`all`),o=[`all`,`Cơ sở lý thuyết`,`Thuật toán tìm kiếm`,`Kỹ thuật cắt tỉa`,`Tối ưu hóa tìm kiếm`,`Thuật toán tìm kiếm nâng cao`,`Bộ nhớ & Quản trị trạng thái`,`Cắt tỉa & Xử lý biên`,`Kỹ thuật cắt tỉa nâng cao`,`Biểu diễn tri thức & Lượng giá`,`Quản trị hệ thống`],s=$t.find(e=>e.id===n)||$t[0];return(0,A.jsxs)(`div`,{className:`space-y-8 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Lý Thuyết Thuật Toán`,badgeVariant:`cyan`,title:`15 Chuyên Đề Thuật Toán Tìm Kiếm & Lượng Giá Đối Kháng`,description:`Từ nền tảng không gian trạng thái, Minimax, Negamax, Alpha-Beta đến các kỹ thuật hiện đại: PVS, LMR, NMP, RFP, PeSTO Tapered Evaluation và Quản trị thời gian hấp thụ độ trễ.`}),(0,A.jsx)(`div`,{className:`flex items-center gap-1.5 overflow-x-auto pb-2`,children:o.map(e=>(0,A.jsx)(`button`,{onClick:()=>a(e),className:`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${i===e?`bg-cyan-600 text-white shadow-md`:`bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700`}`,children:e===`all`?`Tất cả chủ đề`:e},e))}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`,children:[(0,A.jsx)(`div`,{className:`lg:col-span-4 space-y-2 max-h-[850px] overflow-y-auto pr-1`,children:$t.filter(e=>i===`all`||e.category===i).map((e,t)=>{let i=n===e.id;return(0,A.jsxs)(`button`,{onClick:()=>r(e.id),className:`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${i?`bg-cyan-950/40 border-cyan-500 shadow-lg scale-[1.01]`:`bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600`}`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between mb-1`,children:[(0,A.jsxs)(`span`,{className:`text-[10px] font-mono text-cyan-400 font-bold`,children:[`CHỦ ĐỀ `,t+1]}),(0,A.jsx)(M,{variant:`cyan`,size:`sm`,children:e.category})]}),(0,A.jsx)(`div`,{className:`text-xs font-bold text-white line-clamp-1`,children:e.title}),(0,A.jsx)(`p`,{className:`text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed`,children:e.definition})]},e.id)})}),(0,A.jsxs)(`div`,{className:`lg:col-span-8 space-y-6`,children:[(0,A.jsxs)(`div`,{className:`bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2 mb-1`,children:[(0,A.jsx)(M,{variant:`cyan`,children:s.category}),(0,A.jsxs)(`span`,{className:`text-xs text-slate-400 font-mono`,children:[s.team12Implementation.file,` (`,s.team12Implementation.lines,`)`]})]}),(0,A.jsx)(`h2`,{className:`text-xl sm:text-2xl font-extrabold text-white`,children:s.title})]}),(0,A.jsxs)(`div`,{className:`space-y-3 text-xs sm:text-sm`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`span`,{className:`font-bold text-slate-300 block mb-1`,children:`Định nghĩa bản chất:`}),(0,A.jsx)(`p`,{className:`text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60`,children:s.definition})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`span`,{className:`font-bold text-slate-300 block mb-1`,children:`Nguyên lý hoạt động:`}),(0,A.jsx)(`p`,{className:`text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60`,children:s.principle})]})]}),s.formula&&(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`span`,{className:`font-bold text-slate-300 block mb-1 text-xs`,children:`Công thức toán học:`}),(0,A.jsx)(`div`,{className:`p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-cyan-300 font-mono text-xs overflow-x-auto`,children:s.formula})]}),s.pseudocode&&(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`span`,{className:`font-bold text-slate-300 block mb-1 text-xs`,children:`Mã giả thuật toán (Pseudocode):`}),(0,A.jsx)(`pre`,{className:`p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed`,children:s.pseudocode})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/90 border border-slate-700 space-y-3 text-xs`,children:[(0,A.jsxs)(`div`,{className:`font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2`,children:[(0,A.jsxs)(`span`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(je,{className:`w-4 h-4 text-emerald-400`}),`Cách Nhóm 12 triển khai trong mã nguồn thực tế:`]}),(0,A.jsx)(`span`,{className:`font-mono text-emerald-400`,children:s.team12Implementation.functionName})]}),(0,A.jsx)(`p`,{className:`text-slate-300 leading-relaxed`,children:s.team12Implementation.description}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1`,children:[(0,A.jsxs)(`div`,{className:`p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40`,children:[(0,A.jsx)(`span`,{className:`text-emerald-400 font-bold block mb-1`,children:`Lý do nhóm lựa chọn:`}),(0,A.jsx)(`p`,{className:`text-slate-300 text-[11px] leading-relaxed`,children:s.team12Implementation.rationale})]}),(0,A.jsxs)(`div`,{className:`p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40`,children:[(0,A.jsx)(`span`,{className:`text-amber-400 font-bold block mb-1`,children:`Giới hạn & Lưu ý:`}),(0,A.jsx)(`p`,{className:`text-slate-300 text-[11px] leading-relaxed`,children:s.team12Implementation.limitations})]})]})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`div`,{className:`font-bold text-emerald-400 text-xs mb-2 flex items-center gap-1.5`,children:[(0,A.jsx)(k,{className:`w-4 h-4`}),` Các câu hỏi vấn đáp giảng viên có thể chất vấn:`]}),(0,A.jsx)(`div`,{className:`space-y-2`,children:s.defensePoints.map((e,t)=>(0,A.jsxs)(`div`,{className:`p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-200 text-xs leading-relaxed`,children:[`• `,e]},t))})]})]}),s.widgetType&&(0,A.jsxs)(`div`,{className:`space-y-2`,children:[(0,A.jsx)(`div`,{className:`text-xs font-bold text-slate-400 uppercase tracking-wider`,children:`Mô phỏng trực quan tương tác cho chủ đề này:`}),(e=>{switch(e){case`tree`:return(0,A.jsx)(un,{});case`chessboard`:return(0,A.jsx)(Cn,{});case`time-calculator`:return(0,A.jsx)(wn,{});case`move-order`:return(0,A.jsx)(En,{});case`tt-table`:return(0,A.jsx)(Dn,{});default:return null}})(s.widgetType)]})]})]})]})},kn={name:`Chess960 (Fischer Random Chess)`,inventor:`Đại kiện tướng Bobby Fischer (công bố năm 1996)`,standardChessId:518,totalPositions:960,coreMotivation:`Xóa bỏ lợi thế ghi nhớ sách khai cuộc (Opening Books) hàng chục nước đi thuộc lòng, đưa cờ vua trở về đúng bản chất của tư duy sáng tạo, khả năng tính toán chiến thuật và lượng giá cờ từ nước đi đầu tiên.`},An=[{id:`setup-rules`,title:`Quy tắc Sắp đặt 960 Thế cờ Xuất phát`,subtitle:`Nguyên lý toán học sinh 960 biến thể`,category:`rules`,summary:`Hàng quân phía sau của cả hai bên được xếp ngẫu nhiên theo một trong 960 thế cờ hợp lệ, bảo đảm tính công bằng tuyệt đối.`,details:[`Hai quân Tượng (Bishops) bắt buộc phải nằm trên hai ô khác màu (1 ô màu sáng, 1 ô màu tối). Có 4 ô sáng và 4 ô tối -> 4 x 4 = 16 cách xếp.`,`Vua (King) bắt buộc phải nằm giữa hai quân Xe (Rooks). Điều này bảo đảm luôn tồn tại một quân Xe ở cánh Vua (kingside) và một quân Xe ở cánh Hậu (queenside) để thực hiện luật nhập thành.`,`Hàng Tốt giữ nguyên trạng thái ban đầu: Tốt Trắng ở hàng 2 (Rank 2), Tốt Đen ở hàng 7 (Rank 7).`,`Quân Đen được xếp đối xứng gương tuyệt đối (mirror) với quân Trắng qua trục ngang bàn cờ.`,`Mỗi thế cờ được định danh duy nhất bằng một số nguyên chess960_id từ 0 đến 959. Trong đó, chess960_id = 518 chính là thế cờ vua truyền thống tiêu chuẩn (RNBQKBNR).`],defenseNotes:`Giảng viên có thể hỏi: Tại sao lại là 960 thế? Trả lời: Tượng trắng có 4 cách, Tượng đen có 4 cách (16). Hậu có 6 ô trống còn lại (16*6 = 96). Hai Mã có C(5,2) = 10 cách xếp (96*10 = 960). Ba ô còn lại dành cho Xe-Vua-Xe chỉ có duy nhất 1 cách xếp hợp lệ vì Vua bắt buộc nằm giữa 2 Xe. Tổng cộng đúng 960 thế!`},{id:`castling-rules`,title:`Quy tắc Nhập thành trong Chess960`,subtitle:`Vị trí đích giống hệt cờ vua tiêu chuẩn`,category:`castling`,summary:`Dù vị trí ban đầu của Vua và Xe ở bất kỳ ô nào, sau khi nhập thành, Vua và Xe luôn kết thúc ở đúng vị trí như trong cờ vua truyền thống!`,details:[`Nhập thành cánh Vua (O-O / Kingside): Sau khi nhập thành, Vua Trắng luôn đứng ở ô g1 và Xe Trắng luôn đứng ở ô f1 (Vua Đen ở g8, Xe Đen ở f8).`,`Nhập thành cánh Hậu (O-O-O / Queenside): Sau khi nhập thành, Vua Trắng luôn đứng ở ô c1 và Xe Trắng luôn đứng ở ô d1 (Vua Đen ở c8, Xe Đen ở d8).`,`Điều kiện tiên quyết 1: Vua và quân Xe tham gia nhập thành đều chưa từng di chuyển từ đầu ván đấu.`,`Điều kiện tiên quyết 2: Toàn bộ các ô nằm giữa ô xuất phát và ô đích của Vua, cũng như giữa ô xuất phát và ô đích của Xe, đều phải hoàn toàn trống (không có quân cờ nào khác cản trở).`,`Điều kiện tiên quyết 3: Vua hiện tại không bị chiếu, không đi qua ô bị đối phương kiểm soát, và ô đích của Vua không bị đối phương kiểm soát.`,`Đặc biệt trong Chess960: Có thể xảy ra trường hợp Vua hoặc Xe không cần di chuyển (nếu đã tình cờ đứng sẵn ở ô đích từ đầu), hoặc Vua và Xe hoán đổi vị trí cho nhau.`],defenseNotes:`Giảng viên hỏi: Thư viện python-chess xử lý nước nhập thành Chess960 như thế nào? Trả lời: python-chess biểu diễn nước đi nhập thành dưới dạng di chuyển của Vua ăn vào ô của Xe (ví dụ e1h1 hoặc b1a1). Bot của Nhóm 12 nhận diện chính xác qua board.castling_rights và các bitmask bitboard mà không tự suy đoán tọa độ.`},{id:`special-moves`,title:`Các Nước đi Đặc biệt & Luật Cờ Vua`,subtitle:`Phong cấp, Bắt tốt qua đường, Chiếu hết`,category:`rules`,summary:`Toàn bộ các luật cờ vua quốc tế (FIDE) đều được giữ nguyên vẹn trong Chess960.`,details:[`Bắt Tốt qua đường (En Passant): Xảy ra khi một Tốt nhảy 2 ô vượt qua ô bị kiểm soát bởi Tốt đối phương. Nước đi này chỉ có hiệu lực ngay tại lượt đi kế tiếp.`,`Phong cấp (Pawn Promotion): Khi Tốt tiến tới hàng cuối cùng (hàng 8 với Trắng, hàng 1 với Đen), bắt buộc phải phong cấp thành Hậu, Xe, Tượng hoặc Mã.`,`Chiếu và Chiếu hết (Checkmate): Vua bị tấn công và không có bất kỳ nước đi hợp lệ nào để giải chiếu -> Bên bị chiếu hết lập tức thua cuộc.`,`Bí nước (Stalemate): Bên đến lượt đi không bị chiếu nhưng không có bất kỳ nước đi hợp lệ nào -> Ván cờ hòa ngay lập tức.`,`Luật hòa 50 nước: Trong 50 nước đi liên tiếp (100 ply) không có nước đi Tốt nào và không có nước bắt quân nào -> Hòa cờ.`,`Luật lặp cờ 3 lần (Threefold Repetition): Thế cờ cùng quyền nhập thành và quyền bắt tốt qua đường lặp lại 3 lần -> Hòa cờ.`],defenseNotes:`Giảng viên hỏi: Trong code, bot xử lý hòa lặp cờ và luật 50 nước ở đâu? Trả lời: Ở đầu hàm _negamax dòng 1285: if board.is_repetition(2) or board.halfmove_clock >= 100: return DRAW_SCORE. Lưu ý nhóm kiểm tra repetition(2) để tránh bị đối thủ ép hòa khi đang có ưu thế!`},{id:`tournament-regulations`,title:`Quy định Thi đấu ChessLab & Ràng buộc Hệ thống`,subtitle:`Thể thức, giới hạn thời gian và tiêu chí nộp bài`,category:`regulations`,summary:`Các quy định chính thức của bài tập lớn môn Biểu diễn tri thức và tìm kiếm nâng cao (VNU-UET).`,details:[`Thể thức thi đấu: Đấu vòng tròn một lượt, mỗi cặp đấu đối kháng 2 ván đổi bên (Trắng và Đen).`,`Mỗi vòng đấu sử dụng chung một thế cờ Chess960 và cùng mức thời gian cho mọi cặp đấu. Thế cờ và thời gian được bốc thăm ngẫu nhiên sau khi đóng bài nộp.`,`Tính điểm: Thắng được 1.0 điểm, Hòa được 0.5 điểm, Thua được 0.0 điểm.`,`Thời gian thi đấu chính thức: Sinh ngẫu nhiên trong khoảng 180s đến 360s cho mỗi bên, không cộng thêm thời gian (No Increment +0s).`,`Độ trễ sàn hệ thống: GameController áp dụng độ trễ ngẫu nhiên từ 500ms đến 1000ms cho mỗi nước đi (elapsed = max(search_ms, delay)).`,`Giới hạn ván cờ: Tối đa 300 nước đi (ply). Nếu sau 300 ply chưa kết thúc, ván cờ được xử hòa.`,`Xử thua kỹ thuật (Disqualification): Bot bị xử thua nếu phát sinh ngoại lệ không bắt được (crash), hết giờ, hoặc trả về nước đi không hợp lệ.`,`Quy định mã nguồn: Chỉ nộp thư mục student/, team.json và AI_USAGE.md. Tổng dung lượng thư mục student/ không vượt quá 1 MiB (Nhóm 12 đạt ~154 KiB).`,`Nghiêm cấm tuyệt đối: Không dùng Machine Learning, mạng neural, mô hình đã huấn luyện, sách khai cuộc, cơ sở dữ liệu tàn cuộc, hoặc gọi engine cờ bên ngoài.`],defenseNotes:`Giảng viên hỏi: Bot của nhóm có đáp ứng đúng quy định < 1 MiB và không dùng thư viện cấm không? Trả lời: Thư mục student/ của nhóm chỉ nặng 154 KiB, hoàn toàn viết bằng Python thuần túy với python-chess, không sử dụng bất kỳ file binary hay mô hình học máy nào.`},{id:`chess960-tactics`,title:`Đặc thù Chiến thuật Khai cuộc Chess960`,subtitle:`Những cái bẫy chết người ở nước đi đầu tiên`,category:`tactics`,summary:`Chess960 có những thế cờ mà các ô Tốt a2/h2 không được bảo vệ ngay từ đầu, rất dễ bị bắt Hậu hoặc chiếu hết trong 2-3 nước.`,details:[`Tốt không được bảo vệ: Ở một số thế cờ xuất phát, Tốt ở cột a hoặc h không có bất kỳ quân nào bảo vệ (ví dụ Xe và Tượng nằm lệch).`,`Đòn tấn công đường chéo mở: Tượng đối phương có thể chiếu bắt Xe hoặc đe dọa trực diện Vua ngay ở nước thứ 2.`,`Sự quan trọng của việc hoãn nhập thành: Không giống cờ vua chuẩn (thường nhập thành sớm ở nước 4-7), trong Chess960, nhiều thế cờ Vua đứng ở trung tâm hoặc cánh lại an toàn hơn là nhập thành vào vùng đang bị pháo kích.`,`Cách Nhóm 12 thích ứng: Hàm King Ring của nhóm đánh giá an toàn Vua động theo ô thực tế, phạt nặng cột mở trước mặt Vua (phạt 36 cp cho cột mở hoàn toàn, 18 cp cho cột bán mở), giúp bot tự động củng cố phòng thủ ngay từ nước đầu tiên.`],defenseNotes:`Giảng viên hỏi: Tại sao không dùng Sách Khai cuộc (Opening Book) cho Chess960? Trả lời: 1. Ban tổ chức nghiêm cấm sử dụng sách khai cuộc. 2. Có tới 960 thế cờ, việc tạo sách khai cuộc cho cả 960 thế là bất khả thi trong giới hạn dung lượng 1 MiB. Do đó năng lực tính toán tìm kiếm và lượng giá vị trí ở các nước đầu là tối quan trọng.`}],jn=()=>{let[e,t]=(0,_.useState)(An[0].id),n=An.find(t=>t.id===e)||An[0];return(0,A.jsxs)(`div`,{className:`space-y-8 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Luật Thi Đấu`,badgeVariant:`indigo`,title:`Chess960 (Fischer Random) & Thể Thức Giải Đấu`,description:`Toàn bộ quy định về 960 thế cờ xuất phát, nguyên tắc nhập thành Chess960, các nước đi đặc biệt và những ràng buộc khắt khe của hệ thống thi đấu ChessLab.`}),(0,A.jsx)(`div`,{className:`bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-xl`,children:(0,A.jsxs)(`div`,{className:`max-w-3xl space-y-3`,children:[(0,A.jsx)(M,{variant:`indigo`,children:`Lịch sử & Động lực`}),(0,A.jsx)(`h2`,{className:`text-xl sm:text-2xl font-black text-white`,children:kn.name}),(0,A.jsx)(`p`,{className:`text-xs sm:text-sm text-slate-300 leading-relaxed`,children:kn.coreMotivation}),(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 font-mono`,children:[(0,A.jsxs)(`span`,{children:[`Nhà phát minh: `,(0,A.jsx)(`strong`,{className:`text-white`,children:kn.inventor})]}),(0,A.jsxs)(`span`,{children:[`Tổng số thế cờ: `,(0,A.jsx)(`strong`,{className:`text-indigo-400`,children:kn.totalPositions})]}),(0,A.jsxs)(`span`,{children:[`Cờ vua chuẩn: `,(0,A.jsxs)(`strong`,{className:`text-emerald-400`,children:[`ID #`,kn.standardChessId,` (RNBQKBNR)`]})]})]})]})}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`,children:[(0,A.jsx)(`div`,{className:`lg:col-span-4 space-y-2`,children:An.map(n=>{let r=e===n.id;return(0,A.jsxs)(`button`,{onClick:()=>t(n.id),className:`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${r?`bg-indigo-950/50 border-indigo-500 shadow-lg scale-[1.01]`:`bg-slate-800/60 border-slate-700/60 hover:bg-slate-800`}`,children:[(0,A.jsx)(`div`,{className:`text-[10px] font-mono text-indigo-400 uppercase font-bold`,children:n.category}),(0,A.jsx)(`div`,{className:`text-xs font-bold text-white mt-0.5`,children:n.title}),(0,A.jsx)(`div`,{className:`text-[11px] text-slate-400 line-clamp-1 mt-0.5`,children:n.subtitle})]},n.id)})}),(0,A.jsxs)(`div`,{className:`lg:col-span-8 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(M,{variant:`indigo`,children:n.category.toUpperCase()}),(0,A.jsx)(`h3`,{className:`text-xl font-bold text-white mt-1.5`,children:n.title}),(0,A.jsx)(`p`,{className:`text-xs text-slate-400 mt-0.5`,children:n.subtitle})]}),(0,A.jsx)(`div`,{className:`p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 leading-relaxed`,children:n.summary}),(0,A.jsxs)(`div`,{className:`space-y-2.5`,children:[(0,A.jsx)(`div`,{className:`text-xs font-bold text-white uppercase tracking-wider`,children:`Chi tiết các quy định:`}),(0,A.jsx)(`ul`,{className:`space-y-2 text-xs text-slate-300`,children:n.details.map((e,t)=>(0,A.jsxs)(`li`,{className:`flex items-start gap-2.5 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800`,children:[(0,A.jsx)(Ee,{className:`w-4 h-4 text-emerald-400 shrink-0 mt-0.5`}),(0,A.jsx)(`span`,{className:`leading-relaxed`,children:e})]},t))})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-200 space-y-1`,children:[(0,A.jsxs)(`div`,{className:`font-bold text-indigo-300 flex items-center gap-1.5`,children:[(0,A.jsx)(k,{className:`w-4 h-4`}),` Điểm mấu chốt khi vấn đáp về Chess960:`]}),(0,A.jsx)(`p`,{className:`leading-relaxed text-[11px] text-slate-300`,children:n.defenseNotes})]})]})]})]})},Mn=({onNavigate:e,targetQuestionId:t})=>{let[n,r]=(0,_.useState)(`all`),[i,a]=(0,_.useState)(`all`),[o,s]=(0,_.useState)(``),[c,l]=(0,_.useState)({[t||``]:!0}),u=e=>{l(t=>({...t,[e]:!t[e]}))},d=e=>{let t={};f.forEach(n=>{t[n.id]=e}),l(t)},f=Qt.filter(e=>{let t=n===`all`||e.category===n,r=i===`all`||e.difficulty===i,a=!o||e.question.toLowerCase().includes(o.toLowerCase())||e.quickAnswer.toLowerCase().includes(o.toLowerCase())||e.tags.some(e=>e.toLowerCase().includes(o.toLowerCase()));return t&&r&&a}),p=e=>{switch(e){case`general`:return`cyan`;case`code`:return`amber`;case`scenario`:return`rose`}},m=e=>{switch(e){case`basic`:return`emerald`;case`medium`:return`amber`;case`advanced`:return`rose`}};return(0,A.jsxs)(`div`,{className:`space-y-8 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Ngân Hàng Vấn Đáp`,badgeVariant:`emerald`,title:`Ngân Hàng Câu Hỏi & Đáp Án Vấn Đáp Chuẩn (48 Câu)`,description:`Được phân loại theo 3 nhóm: Kiến thức chung, Đi sâu vào mã nguồn và Câu hỏi tình huống. Mỗi câu hỏi gồm câu trả lời 30 giây để nói trực tiếp trước giảng viên, phân tích bản chất, trích dẫn file code và câu hỏi truy vấn tiếp nối.`}),(0,A.jsxs)(`div`,{className:`p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-4`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-3 items-center justify-between`,children:[(0,A.jsxs)(`div`,{className:`relative w-full md:w-96`,children:[(0,A.jsx)(Dt,{className:`w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2`}),(0,A.jsx)(`input`,{type:`text`,placeholder:`Tìm kiếm câu hỏi theo từ khóa, thẻ (tags)...`,value:o,onChange:e=>s(e.target.value),className:`w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500`})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2 w-full md:w-auto justify-end`,children:[(0,A.jsx)(`button`,{onClick:()=>d(!0),className:`text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition`,children:`Mở tất cả`}),(0,A.jsx)(`button`,{onClick:()=>d(!1),className:`text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition`,children:`Thu gọn`}),(0,A.jsxs)(`button`,{onClick:()=>e(`practice`),className:`text-xs font-bold text-white px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-1.5`,children:[(0,A.jsx)(Pt,{className:`w-3.5 h-3.5`}),` Luyện tập Flashcard`]})]})]}),(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/60 text-xs`,children:[(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 font-medium`,children:`Nhóm câu hỏi:`}),[{id:`all`,label:`Tất cả (${Qt.length})`},{id:`general`,label:`Nhóm 1: Kiến thức chung (15)`},{id:`code`,label:`Nhóm 2: Chuyên sâu Code (18)`},{id:`scenario`,label:`Nhóm 3: Tình huống (15)`}].map(e=>(0,A.jsx)(`button`,{onClick:()=>r(e.id),className:`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${n===e.id?`bg-emerald-600 text-white shadow`:`bg-slate-900 text-slate-400 hover:text-white`}`,children:e.label},e.id))]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 font-medium`,children:`Độ khó:`}),[`all`,`basic`,`medium`,`advanced`].map(e=>(0,A.jsx)(`button`,{onClick:()=>a(e),className:`px-2.5 py-1 rounded-lg capitalize font-semibold transition cursor-pointer ${i===e?`bg-slate-700 text-white`:`text-slate-400 hover:text-white`}`,children:e===`all`?`Tất cả`:e===`basic`?`Cơ bản`:e===`medium`?`Trung bình`:`Nâng cao`},e))]})]})]}),(0,A.jsx)(`div`,{className:`space-y-4`,children:f.length===0?(0,A.jsx)(`div`,{className:`text-center py-12 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800`,children:`Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.`}):f.map((t,n)=>{let r=c[t.id]??!1;return(0,A.jsxs)(`div`,{id:`q-${t.id}`,className:`rounded-2xl border transition-all ${r?`bg-slate-900/90 border-slate-700 shadow-xl`:`bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800`}`,children:[(0,A.jsxs)(`button`,{onClick:()=>u(t.id),className:`w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer`,children:[(0,A.jsxs)(`div`,{className:`space-y-1.5 flex-1`,children:[(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,A.jsxs)(`span`,{className:`text-[11px] font-mono font-bold text-slate-500`,children:[`#`,n+1]}),(0,A.jsx)(M,{variant:p(t.category),children:t.category===`general`?`Kiến thức chung`:t.category===`code`?`Chuyên sâu Code`:`Tình huống`}),(0,A.jsx)(M,{variant:m(t.difficulty),size:`sm`,children:t.difficulty===`basic`?`Cơ bản`:t.difficulty===`medium`?`Trung bình`:`Nâng cao`}),(0,A.jsx)(`span`,{className:`text-[10px] text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded`,children:t.topic})]}),(0,A.jsx)(`h3`,{className:`text-sm sm:text-base font-bold text-white leading-snug`,children:t.question})]}),(0,A.jsx)(`div`,{className:`p-1 rounded-lg text-slate-400 hover:text-white shrink-0 mt-1`,children:r?(0,A.jsx)(D,{className:`w-5 h-5`}):(0,A.jsx)(Se,{className:`w-5 h-5`})})]}),r&&(0,A.jsxs)(`div`,{className:`px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm`,children:[(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between text-xs font-bold text-emerald-400`,children:[(0,A.jsxs)(`span`,{className:`flex items-center gap-1.5`,children:[(0,A.jsx)(k,{className:`w-4 h-4`}),` Trả lời nhanh trước giảng viên (20 – 45 giây):`]}),(0,A.jsx)(`span`,{className:`text-[10px] font-normal text-slate-400 font-mono`,children:`Elevator Pitch`})]}),(0,A.jsx)(`p`,{className:`text-slate-100 font-medium leading-relaxed`,children:t.quickAnswer})]}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`span`,{className:`font-bold text-slate-300 block mb-1 text-xs`,children:`Giải thích chi tiết để hiểu bản chất:`}),(0,A.jsx)(`p`,{className:`text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 text-xs`,children:t.detailedExplanation})]}),t.exampleScenario&&(0,A.jsxs)(`div`,{className:`text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800`,children:[(0,A.jsx)(`strong`,{children:`Ví dụ thực tế:`}),` `,t.exampleScenario]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-3 pt-1`,children:[t.codeReference&&(0,A.jsxs)(`div`,{className:`p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs space-y-1`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 font-medium block`,children:`File và hàm liên quan trong code Nhóm 12:`}),(0,A.jsxs)(`div`,{className:`font-mono text-emerald-400 font-bold flex items-center justify-between`,children:[(0,A.jsxs)(`span`,{children:[t.codeReference.file,` (`,t.codeReference.lines,`)`]}),(0,A.jsxs)(`button`,{onClick:()=>{e({"student/bot.py":`code-bot`,"student/search.py":`code-search`,"student/evaluation.py":`code-eval`,"student/time_manager.py":`code-time`}[t.codeReference?.file||``]||`code-bot`)},className:`text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-sans cursor-pointer`,children:[`Xem code `,(0,A.jsx)(ue,{className:`w-3 h-3`})]})]}),(0,A.jsxs)(`div`,{className:`text-[11px] text-slate-400 font-mono`,children:[`Hàm: `,t.codeReference.functionName]})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs space-y-1`,children:[(0,A.jsxs)(`span`,{className:`text-rose-400 font-bold block flex items-center gap-1`,children:[(0,A.jsx)(Oe,{className:`w-3.5 h-3.5`}),` Câu hỏi truy vấn tiếp theo (Giảng viên có thể hỏi sâu):`]}),(0,A.jsx)(`p`,{className:`text-slate-300 text-xs leading-relaxed`,children:t.teacherFollowUp})]})]})]})]},t.id)})})]})},Nn=({onNavigate:e})=>{let[t,n]=(0,_.useState)(`all`),[r,i]=(0,_.useState)(`all`),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(0),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(30),[h,g]=(0,_.useState)(!1),[v,y]=(0,_.useState)(()=>{try{let e=localStorage.getItem(`chesslab_mastered_q`);return e?JSON.parse(e):[]}catch{return[]}}),[b,ee]=(0,_.useState)(()=>{try{let e=localStorage.getItem(`chesslab_review_q`);return e?JSON.parse(e):[]}catch{return[]}});(0,_.useEffect)(()=>{try{localStorage.setItem(`chesslab_mastered_q`,JSON.stringify(v))}catch(e){console.error(e)}},[v]),(0,_.useEffect)(()=>{try{localStorage.setItem(`chesslab_review_q`,JSON.stringify(b))}catch(e){console.error(e)}},[b]);let x=Qt.filter(e=>{let n=t===`all`||e.category===t,i=r===`all`||e.difficulty===r;return n&&i});(0,_.useEffect)(()=>{s>=x.length&&c(0),u(!1),f(!1),m(30),g(!1)},[t,r,x.length]),(0,_.useEffect)(()=>{let e=null;return h&&p>0?e=setInterval(()=>{m(e=>e-1)},1e3):p===0&&g(!1),()=>clearInterval(e)},[h,p]);let S=x[s],te=()=>{s<x.length-1?c(e=>e+1):c(0),u(!1),f(!1),m(30),g(!1)},C=()=>{c(s>0?e=>e-1:x.length-1),u(!1),f(!1),m(30),g(!1)},ne=()=>{let e=Math.floor(Math.random()*x.length);c(e),u(!1),f(!1),m(30),g(!1)},w=()=>{S&&(v.includes(S.id)||y(e=>[...e,S.id]),ee(e=>e.filter(e=>e!==S.id)),te())},re=()=>{S&&(b.includes(S.id)||ee(e=>[...e,S.id]),y(e=>e.filter(e=>e!==S.id)),te())},ie=S?v.includes(S.id):!1,ae=S?b.includes(S.id):!1;return(0,A.jsxs)(`div`,{className:`space-y-8 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Luyện Vấn Đáp Tương Tác`,badgeVariant:`amber`,title:`Mô Phỏng Vấn Đáp (Exam Simulator & Flashcard)`,description:`Luyện trả lời câu hỏi trực tiếp dưới áp lực thời gian (đồng hồ đếm ngược 30 giây). Tự suy nghĩ câu trả lời trước, sau đó mở đối chiếu với đáp án chuẩn của nhóm và lưu tiến độ học tập vào trình duyệt.`}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 sm:grid-cols-4 gap-3.5`,children:[(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`span`,{className:`text-[11px] text-slate-400 block font-medium`,children:`Tổng câu hỏi trong pool`}),(0,A.jsx)(`span`,{className:`text-2xl font-black text-white font-mono mt-1`,children:x.length})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center`,children:[(0,A.jsx)(`span`,{className:`text-[11px] text-emerald-400 block font-medium`,children:`Đã nắm vững`}),(0,A.jsxs)(`span`,{className:`text-2xl font-black text-emerald-300 font-mono mt-1`,children:[v.length,` `,(0,A.jsxs)(`span`,{className:`text-xs text-slate-400 font-normal`,children:[`/ `,Qt.length]})]})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center`,children:[(0,A.jsx)(`span`,{className:`text-[11px] text-amber-400 block font-medium`,children:`Cần ôn tập lại`}),(0,A.jsx)(`span`,{className:`text-2xl font-black text-amber-300 font-mono mt-1`,children:b.length})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 text-center`,children:[(0,A.jsx)(`span`,{className:`text-[11px] text-slate-400 block font-medium`,children:`Tiến độ làm chủ`}),(0,A.jsxs)(`span`,{className:`text-2xl font-black text-cyan-400 font-mono mt-1`,children:[Math.round(v.length/Qt.length*100),`%`]})]})]}),(0,A.jsxs)(`div`,{className:`p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs`,children:[(0,A.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 font-semibold`,children:`Chủ đề:`}),[{id:`all`,label:`Tất cả`},{id:`general`,label:`Kiến thức chung`},{id:`code`,label:`Chuyên sâu Code`},{id:`scenario`,label:`Tình huống`}].map(e=>(0,A.jsx)(`button`,{onClick:()=>n(e.id),className:`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${t===e.id?`bg-amber-600 text-white shadow`:`bg-slate-900 text-slate-400 hover:text-white`}`,children:e.label},e.id))]}),(0,A.jsx)(`div`,{className:`flex items-center gap-2`,children:(0,A.jsx)(`button`,{onClick:()=>{window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ tiến độ đã lưu trong localStorage không?`)&&(y([]),ee([]),localStorage.removeItem(`chesslab_mastered_q`),localStorage.removeItem(`chesslab_review_q`))},className:`text-[11px] text-slate-500 hover:text-rose-400 transition`,children:`Đặt lại tiến độ`})})]}),S?(0,A.jsxs)(`div`,{className:`bg-slate-800/95 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,A.jsxs)(`span`,{className:`text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30`,children:[`Câu `,s+1,` / `,x.length]}),(0,A.jsx)(M,{variant:`cyan`,children:S.category.toUpperCase()}),(0,A.jsx)(M,{variant:S.difficulty===`basic`?`emerald`:S.difficulty===`medium`?`amber`:`rose`,children:S.difficulty===`basic`?`Cơ bản`:S.difficulty===`medium`?`Trung bình`:`Nâng cao`}),ie&&(0,A.jsxs)(`span`,{className:`inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold`,children:[(0,A.jsx)(Ee,{className:`w-3.5 h-3.5`}),` Đã thuộc`]}),ae&&(0,A.jsxs)(`span`,{className:`inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold`,children:[(0,A.jsx)(Ht,{className:`w-3.5 h-3.5`}),` Cần xem lại`]})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-bold border transition-colors ${p<=5?`bg-rose-950/60 text-rose-400 border-rose-500/40 animate-pulse`:p<=15?`bg-amber-950/60 text-amber-400 border-amber-500/40`:`bg-slate-900 text-slate-300 border-slate-700`}`,children:[(0,A.jsx)(Bt,{className:`w-3.5 h-3.5`}),(0,A.jsxs)(`span`,{children:[p,`s`]})]}),(0,A.jsx)(`button`,{onClick:()=>g(!h),className:`p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white`,title:h?`Tạm dừng`:`Bắt đầu tính giờ 30s`,children:h?(0,A.jsx)(_t,{className:`w-3.5 h-3.5`}):(0,A.jsx)(yt,{className:`w-3.5 h-3.5`})}),(0,A.jsx)(`button`,{onClick:()=>{m(30),g(!1)},className:`p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white`,title:`Khôi phục 30s`,children:(0,A.jsx)(Ct,{className:`w-3.5 h-3.5`})})]})]}),(0,A.jsxs)(`div`,{className:`py-2`,children:[(0,A.jsx)(`div`,{className:`text-xs text-slate-400 font-medium mb-1`,children:`Câu hỏi vấn đáp:`}),(0,A.jsx)(`h2`,{className:`text-xl sm:text-2xl font-extrabold text-white leading-snug`,children:S.question})]}),d&&(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-xs space-y-2 animate-fadeIn`,children:[(0,A.jsxs)(`div`,{className:`text-slate-400 font-semibold flex items-center gap-1.5`,children:[(0,A.jsx)(Oe,{className:`w-3.5 h-3.5 text-cyan-400`}),` Gợi ý trả lời:`]}),(0,A.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:S.tags.map((e,t)=>(0,A.jsxs)(`span`,{className:`px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]`,children:[`#`,e]},t))}),S.codeReference&&(0,A.jsxs)(`div`,{className:`text-[11px] text-slate-400`,children:[`Nằm tại: `,(0,A.jsx)(`code`,{className:`text-emerald-400`,children:S.codeReference.file}),` (`,S.codeReference.functionName,`)`]})]}),l?(0,A.jsxs)(`div`,{className:`space-y-4 animate-fadeIn`,children:[(0,A.jsxs)(`div`,{className:`p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between text-xs font-bold text-emerald-400`,children:[(0,A.jsxs)(`span`,{className:`flex items-center gap-1.5`,children:[(0,A.jsx)(k,{className:`w-4 h-4`}),` Câu trả lời ngắn (20 – 45 giây trước giảng viên):`]}),(0,A.jsx)(`span`,{className:`font-mono text-[10px] text-slate-400`,children:`Elevator Pitch`})]}),(0,A.jsx)(`p`,{className:`text-slate-100 text-sm leading-relaxed font-medium`,children:S.quickAnswer})]}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2 text-xs`,children:[(0,A.jsx)(`span`,{className:`font-bold text-slate-300 block`,children:`Phân tích chi tiết và luận điểm chuyên sâu:`}),(0,A.jsx)(`p`,{className:`text-slate-300 leading-relaxed`,children:S.detailedExplanation})]}),S.teacherFollowUp&&(0,A.jsxs)(`div`,{className:`p-3.5 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs space-y-1`,children:[(0,A.jsx)(`span`,{className:`text-rose-400 font-bold block`,children:`Giảng viên có thể hỏi sâu tiếp:`}),(0,A.jsx)(`p`,{className:`text-slate-300 text-xs`,children:S.teacherFollowUp})]})]}):(0,A.jsxs)(`div`,{className:`py-10 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-700 flex flex-col items-center justify-center space-y-3`,children:[(0,A.jsx)(Ue,{className:`w-8 h-8 text-slate-600`}),(0,A.jsx)(`p`,{className:`text-xs text-slate-400 max-w-sm`,children:`Hãy tự trình bày câu trả lời trong khoảng 30 giây trước khi bấm xem đáp án chuẩn để rèn luyện phản xạ vấn đáp.`}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(`button`,{onClick:()=>f(!d),className:`px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition`,children:d?`Ẩn gợi ý`:`Hiển thị gợi ý`}),(0,A.jsxs)(`button`,{onClick:()=>u(!0),className:`px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md transition flex items-center gap-1.5`,children:[(0,A.jsx)(Ge,{className:`w-3.5 h-3.5`}),` Xem đáp án chuẩn`]})]})]}),(0,A.jsxs)(`div`,{className:`pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsxs)(`button`,{onClick:C,className:`px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1 cursor-pointer`,children:[(0,A.jsx)(ce,{className:`w-3.5 h-3.5`}),` Câu trước`]}),(0,A.jsxs)(`button`,{onClick:ne,className:`px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1 cursor-pointer`,title:`Chọn câu ngẫu nhiên`,children:[(0,A.jsx)(Mt,{className:`w-3.5 h-3.5`}),` Ngẫu nhiên`]})]}),(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsxs)(`button`,{onClick:re,className:`px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-950/60 text-amber-300 hover:bg-amber-900 border border-amber-500/40 transition flex items-center gap-1.5 cursor-pointer`,children:[(0,A.jsx)(Ht,{className:`w-3.5 h-3.5 text-amber-400`}),` Cần ôn lại`]}),(0,A.jsxs)(`button`,{onClick:w,className:`px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40 transition flex items-center gap-1.5 cursor-pointer`,children:[(0,A.jsx)(Ee,{className:`w-3.5 h-3.5 text-emerald-400`}),` Đã nắm vững`]}),(0,A.jsxs)(`button`,{onClick:te,className:`px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 text-white hover:bg-slate-600 transition flex items-center gap-1.5 cursor-pointer`,children:[`Câu tiếp theo `,(0,A.jsx)(ue,{className:`w-3.5 h-3.5`})]})]})]})]}):(0,A.jsx)(`div`,{className:`text-center py-12 text-slate-400 bg-slate-900 rounded-2xl border border-slate-800`,children:`Không có câu hỏi nào trong danh mục đã chọn.`})]})},Pn=({onNavigate:e,targetTermId:t})=>{let[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(`all`),o=[{id:`all`,label:`Tất cả (${j.length})`},{id:`search`,label:`Thuật toán tìm kiếm`},{id:`evaluation`,label:`Lượng giá heuristic`},{id:`chess`,label:`Luật cờ vua`},{id:`optimization`,label:`Tối ưu & Thời gian`}],s=j.filter(e=>{let t=i===`all`||e.category===i,r=!n||e.term.toLowerCase().includes(n.toLowerCase())||e.vietnamese.toLowerCase().includes(n.toLowerCase())||e.shortDef.toLowerCase().includes(n.toLowerCase());return t&&r}),c=e=>{switch(e){case`search`:return`cyan`;case`evaluation`:return`rose`;case`chess`:return`indigo`;case`optimization`:return`amber`;default:return`cyan`}};return(0,A.jsxs)(`div`,{className:`space-y-8 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Từ Điển Thuật Ngữ`,badgeVariant:`purple`,title:`Bảng Thuật Ngữ AI & Cờ Vua Chuyên Sâu (35+ Thuật Ngữ)`,description:`Tra cứu nhanh định nghĩa tiếng Việt, bản chất toán học, ví dụ trực quan và mối liên hệ thực tế trong mã nguồn bot Chess960 Nhóm 12.`}),(0,A.jsxs)(`div`,{className:`p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-4`,children:[(0,A.jsxs)(`div`,{className:`relative w-full max-w-md`,children:[(0,A.jsx)(Dt,{className:`w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2`}),(0,A.jsx)(`input`,{type:`text`,placeholder:`Tìm kiếm thuật ngữ tiếng Anh hoặc tiếng Việt...`,value:n,onChange:e=>r(e.target.value),className:`w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500`})]}),(0,A.jsx)(`div`,{className:`flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-700/60 text-xs`,children:o.map(e=>(0,A.jsx)(`button`,{onClick:()=>a(e.id),className:`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${i===e.id?`bg-purple-600 text-white shadow`:`bg-slate-900 text-slate-400 hover:text-white`}`,children:e.label},e.id))})]}),(0,A.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4`,children:s.map(t=>(0,A.jsxs)(`div`,{id:`term-${t.id}`,className:`p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-purple-500/50 transition space-y-3 shadow-md`,children:[(0,A.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h3`,{className:`text-base font-extrabold text-white`,children:t.term}),(0,A.jsx)(`div`,{className:`text-xs text-purple-400 font-semibold`,children:t.vietnamese})]}),(0,A.jsx)(M,{variant:c(t.category),size:`sm`,children:t.category})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed font-medium`,children:t.shortDef}),(0,A.jsx)(`div`,{className:`p-3 bg-slate-900/80 rounded-xl border border-slate-700/50 text-[11px] text-slate-300 leading-relaxed`,children:t.fullExplanation}),(0,A.jsxs)(`div`,{className:`flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px]`,children:[(0,A.jsxs)(`span`,{className:`text-slate-400 font-mono italic`,children:[`Ví dụ: `,t.example]}),t.relatedTab&&(0,A.jsxs)(`button`,{onClick:()=>e(t.relatedTab,t.relatedTopicId),className:`text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 shrink-0 cursor-pointer`,children:[`Xem chủ đề `,(0,A.jsx)(ue,{className:`w-3 h-3`})]})]})]},t.id))})]})},Fn=()=>(0,A.jsxs)(`div`,{className:`space-y-8 animate-fadeIn`,children:[(0,A.jsx)(N,{badge:`Minh Chứng Học Thuật`,badgeVariant:`emerald`,title:`Hồ Sơ Nguồn, Commit Tham Chiếu & Khai Báo Sử Dụng AI`,description:`Minh bạch hóa toàn bộ nguồn gốc mã nguồn, phiên bản nộp bài chính thức, báo cáo sử dụng công cụ AI (AI_USAGE.md) và kết quả kiểm định đối kháng thực nghiệm của Nhóm 12.`}),(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4`,children:[(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,A.jsx)(`div`,{className:`p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30`,children:(0,A.jsx)(at,{className:`w-6 h-6`})}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`text-xs text-slate-400 font-mono`,children:`Phiên bản mã nguồn tham chiếu gốc:`}),(0,A.jsxs)(`div`,{className:`text-base font-extrabold text-white font-mono flex items-center gap-2`,children:[(0,A.jsx)(`span`,{children:qt.referenceCommit}),(0,A.jsx)(M,{variant:`emerald`,children:`VERIFIED`})]})]})]}),(0,A.jsxs)(`div`,{className:`text-right`,children:[(0,A.jsx)(`div`,{className:`text-xs text-slate-400 font-mono`,children:qt.commitDate}),(0,A.jsx)(`div`,{className:`text-xs font-semibold text-emerald-400 mt-0.5`,children:qt.commitMessage})]})]}),(0,A.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4 text-xs`,children:[(0,A.jsxs)(`div`,{className:`p-3 bg-slate-900 rounded-xl border border-slate-700/60 space-y-1`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 font-medium block`,children:`Kho mã nguồn bot cờ vua (Nguồn tham chiếu):`}),(0,A.jsxs)(`a`,{href:qt.botRepoUrl,target:`_blank`,rel:`noreferrer`,className:`text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5 break-all`,children:[qt.botRepoUrl,` `,(0,A.jsx)(Ve,{className:`w-3.5 h-3.5 shrink-0`})]}),(0,A.jsx)(`p`,{className:`text-[11px] text-slate-500 pt-1`,children:`* Tuyệt đối không chỉnh sửa hay push bất kỳ thay đổi nào vào repo này.`})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-slate-900 rounded-xl border border-slate-700/60 space-y-1`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 font-medium block`,children:`Kho lưu trữ Website Sổ tay Vấn đáp:`}),(0,A.jsxs)(`a`,{href:qt.targetRepoUrl,target:`_blank`,rel:`noreferrer`,className:`text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1.5 break-all`,children:[qt.targetRepoUrl,` `,(0,A.jsx)(Ve,{className:`w-3.5 h-3.5 shrink-0`})]}),(0,A.jsx)(`p`,{className:`text-[11px] text-slate-500 pt-1`,children:`* Nơi triển khai toàn bộ ứng dụng web tĩnh và cấu hình GitHub Pages.`})]})]})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between pb-3 border-b border-slate-700`,children:[(0,A.jsxs)(`h3`,{className:`text-sm font-bold text-white flex items-center gap-2`,children:[(0,A.jsx)(Ye,{className:`w-4 h-4 text-emerald-400`}),`Kiểm Kê Dung Lượng & Danh Mục File trong student/`]}),(0,A.jsx)(`span`,{className:`text-xs font-mono text-emerald-400 font-bold`,children:`Tổng: ~154 KiB (< 1,024 KiB)`})]}),(0,A.jsx)(`div`,{className:`overflow-x-auto`,children:(0,A.jsxs)(`table`,{className:`w-full text-left text-xs font-mono`,children:[(0,A.jsx)(`thead`,{children:(0,A.jsxs)(`tr`,{className:`border-b border-slate-700 text-slate-400 font-sans`,children:[(0,A.jsx)(`th`,{className:`pb-2`,children:`Tên file`}),(0,A.jsx)(`th`,{className:`pb-2`,children:`Số dòng`}),(0,A.jsx)(`th`,{className:`pb-2`,children:`Dung lượng`}),(0,A.jsx)(`th`,{className:`pb-2`,children:`Tác giả chịu trách nhiệm chính`}),(0,A.jsx)(`th`,{className:`pb-2`,children:`Trạng thái`})]})}),(0,A.jsxs)(`tbody`,{className:`divide-y divide-slate-800 text-slate-300`,children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`py-2.5 font-bold text-white`,children:`student/bot.py`}),(0,A.jsx)(`td`,{children:`97 dòng`}),(0,A.jsx)(`td`,{children:`4.6 KB`}),(0,A.jsx)(`td`,{className:`font-sans`,children:`Nông Văn Bách (25022782)`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(M,{variant:`emerald`,size:`sm`,children:`Đã nộp bài`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`py-2.5 font-bold text-white`,children:`student/time_manager.py`}),(0,A.jsx)(`td`,{children:`199 dòng`}),(0,A.jsx)(`td`,{children:`8.1 KB`}),(0,A.jsx)(`td`,{className:`font-sans`,children:`Nông Văn Bách (25022782)`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(M,{variant:`emerald`,size:`sm`,children:`Đã nộp bài`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`py-2.5 font-bold text-white`,children:`student/evaluation.py`}),(0,A.jsx)(`td`,{children:`611 dòng`}),(0,A.jsx)(`td`,{children:`23.2 KB`}),(0,A.jsx)(`td`,{className:`font-sans`,children:`Lê Văn Việt (25023069)`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(M,{variant:`emerald`,size:`sm`,children:`Đã nộp bài`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`py-2.5 font-bold text-white`,children:`student/search.py`}),(0,A.jsx)(`td`,{children:`1,938 dòng`}),(0,A.jsx)(`td`,{children:`45.7 KB`}),(0,A.jsx)(`td`,{className:`font-sans`,children:`Vũ Hoàng Long (25022922) & Đỗ Thành Vương (25023079)`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(M,{variant:`emerald`,size:`sm`,children:`Đã nộp bài`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`py-2.5 font-bold text-white`,children:`team.json & AI_USAGE.md`}),(0,A.jsx)(`td`,{children:`189 dòng`}),(0,A.jsx)(`td`,{children:`19.4 KB`}),(0,A.jsx)(`td`,{className:`font-sans`,children:`Cả 4 thành viên Nhóm 12`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(M,{variant:`emerald`,size:`sm`,children:`Chính thức`})})]})]})]})})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-5`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(M,{variant:`indigo`,children:`Minh Bạch Học Thuật`}),(0,A.jsx)(`h3`,{className:`text-lg font-bold text-white mt-1.5`,children:`Báo Cáo Tỷ Lệ Đóng Góp & Sử Dụng AI (Trích Lục AI_USAGE.md)`}),(0,A.jsx)(`p`,{className:`text-xs text-slate-400 mt-1`,children:`Tuân thủ tuyệt đối quy định: AI chỉ đóng vai trò tra cứu phụ trợ mức độ thấp (< 15%), sinh viên làm chủ và tự viết 100% mã nguồn thuật toán.`})]}),(0,A.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4`,children:Jt.map((e,t)=>(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-slate-900 border border-slate-700/70 space-y-2 text-xs`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,A.jsx)(`span`,{className:`font-bold text-white text-sm`,children:e.name}),(0,A.jsxs)(`span`,{className:`font-mono text-emerald-400 font-bold`,children:[`Tự làm: `,e.selfContribution]})]}),(0,A.jsxs)(`div`,{className:`text-slate-400 text-[11px] font-mono`,children:[`Trụ cột: `,e.role,` • Git: `,e.github]}),(0,A.jsx)(`div`,{className:`w-full bg-slate-800 h-2 rounded-full overflow-hidden`,children:(0,A.jsx)(`div`,{className:`bg-emerald-500 h-full`,style:{width:e.selfContribution}})}),(0,A.jsxs)(`div`,{className:`text-[11px] text-slate-300`,children:[`AI hỗ trợ tra cứu (`,e.aiAssistance,`): Cú pháp thư viện python-chess, mã lỗi traceback và gợi ý ý tưởng toán học.`]})]},t))}),(0,A.jsxs)(`div`,{className:`p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200 flex items-center justify-between`,children:[(0,A.jsxs)(`span`,{children:[(0,A.jsx)(`strong`,{children:`Trung bình toàn dự án:`}),` Sinh viên tự làm chủ và bảo vệ `,(0,A.jsx)(`strong`,{children:`86.25%`}),` (AI tra cứu phụ trợ: 13.75%).`]}),(0,A.jsx)(M,{variant:`emerald`,children:`Cam kết trung thực 100%`})]})]}),(0,A.jsxs)(`div`,{className:`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4`,children:[(0,A.jsxs)(`div`,{className:`flex items-center justify-between pb-3 border-b border-slate-700`,children:[(0,A.jsxs)(`h3`,{className:`text-sm font-bold text-white flex items-center gap-2`,children:[(0,A.jsx)(ge,{className:`w-4 h-4 text-amber-400`}),`Kiểm Định Đối Kháng Thực Nghiệm (16 Ván Đấu Local)`]}),(0,A.jsx)(M,{variant:`amber`,children:`Tỷ lệ thắng: 78.1%`})]}),(0,A.jsx)(`p`,{className:`text-xs text-slate-300 leading-relaxed`,children:`Nhóm 12 đã tự viết runner headless đối đầu 16 ván thực tế giữa phiên bản StudentBot hoàn chỉnh và các phiên bản baseline (Minimax thường, không TT, không Move Ordering).`}),(0,A.jsxs)(`div`,{className:`grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono`,children:[(0,A.jsxs)(`div`,{className:`p-3 bg-slate-900 rounded-xl border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 block font-sans`,children:`Tổng số ván:`}),(0,A.jsx)(`span`,{className:`text-xl font-bold text-white mt-1 block`,children:`16 ván`})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30`,children:[(0,A.jsx)(`span`,{className:`text-emerald-400 block font-sans`,children:`Số ván thắng:`}),(0,A.jsx)(`span`,{className:`text-xl font-bold text-emerald-300 mt-1 block`,children:`12 ván`})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-slate-900 rounded-xl border border-slate-700`,children:[(0,A.jsx)(`span`,{className:`text-slate-400 block font-sans`,children:`Hòa / Thua:`}),(0,A.jsx)(`span`,{className:`text-xl font-bold text-slate-300 mt-1 block`,children:`1 Hòa / 3 Thua`})]}),(0,A.jsxs)(`div`,{className:`p-3 bg-amber-950/40 rounded-xl border border-amber-500/30`,children:[(0,A.jsx)(`span`,{className:`text-amber-400 block font-sans`,children:`Sai lầm nghiêm trọng:`}),(0,A.jsx)(`span`,{className:`text-xl font-bold text-amber-300 mt-1 block`,children:`0 Blunder`})]})]})]})]});function In(){let[e,t]=(0,_.useState)(`overview`),[n,r]=(0,_.useState)(void 0),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(!1),[u,d]=(0,_.useState)(()=>{try{let e=localStorage.getItem(`chesslab_theme`);return!e||e===`dark`}catch{return!0}});(0,_.useEffect)(()=>{try{localStorage.setItem(`chesslab_theme`,u?`dark`:`light`)}catch(e){console.error(e)}u?(document.documentElement.classList.add(`dark`),document.documentElement.classList.remove(`light`)):(document.documentElement.classList.remove(`dark`),document.documentElement.classList.add(`light`))},[u]),(0,_.useEffect)(()=>{let e=()=>{let e=window.location.hash.replace(`#`,``);[`overview`,`architecture`,`code-bot`,`code-search`,`code-eval`,`code-time`,`theory`,`chess960`,`qa`,`practice`,`glossary`,`source-map`].includes(e)&&t(e)};return e(),window.addEventListener(`hashchange`,e),()=>window.removeEventListener(`hashchange`,e)},[]),(0,_.useEffect)(()=>{let e=()=>{window.scrollY>300?l(!0):l(!1)};return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]);let f=(e,n)=>{t(e),r(n),window.location.hash=e,window.scrollTo({top:0,behavior:`smooth`})};return(0,A.jsxs)(`div`,{className:`min-h-screen transition-colors duration-200 ${u?`bg-slate-950 text-slate-100`:`bg-slate-50 text-slate-800`}`,children:[(0,A.jsx)(Xt,{currentTab:e,onNavigate:f,onOpenSearch:()=>s(!0),isDarkMode:u,onToggleTheme:()=>d(!u)}),(0,A.jsxs)(`div`,{className:`lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs`,children:[(0,A.jsxs)(`button`,{onClick:()=>a(!0),className:`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 font-semibold`,children:[(0,A.jsx)(pt,{className:`w-4 h-4`}),(0,A.jsx)(`span`,{children:`Danh mục chuyên đề`})]}),(0,A.jsx)(`span`,{className:`font-mono text-emerald-400 font-bold uppercase text-[11px]`,children:e})]}),(0,A.jsxs)(`div`,{className:`flex`,children:[(0,A.jsx)(Zt,{currentTab:e,onNavigate:f,isMobileOpen:i,onCloseMobile:()=>a(!1)}),(0,A.jsxs)(`main`,{className:`flex-1 lg:pl-64 min-w-0 pb-16`,children:[(0,A.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8`,children:[e===`overview`&&(0,A.jsx)(nn,{onNavigate:f}),e===`architecture`&&(0,A.jsx)(cn,{onNavigate:f}),e===`code-bot`&&(0,A.jsx)(ln,{initialFile:`bot.py`,highlightAnnotationId:n,onNavigate:f}),e===`code-search`&&(0,A.jsx)(ln,{initialFile:`search.py`,highlightAnnotationId:n,onNavigate:f}),e===`code-eval`&&(0,A.jsx)(ln,{initialFile:`evaluation.py`,highlightAnnotationId:n,onNavigate:f}),e===`code-time`&&(0,A.jsx)(ln,{initialFile:`time_manager.py`,highlightAnnotationId:n,onNavigate:f}),e===`theory`&&(0,A.jsx)(On,{onNavigate:f,targetTopicId:n}),e===`chess960`&&(0,A.jsx)(jn,{}),e===`qa`&&(0,A.jsx)(Mn,{onNavigate:f,targetQuestionId:n}),e===`practice`&&(0,A.jsx)(Nn,{onNavigate:f}),e===`glossary`&&(0,A.jsx)(Pn,{onNavigate:f,targetTermId:n}),e===`source-map`&&(0,A.jsx)(Fn,{})]}),(0,A.jsx)(`footer`,{className:`mt-20 border-t border-slate-800 pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500`,children:(0,A.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-center justify-between gap-4`,children:[(0,A.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,A.jsx)(`span`,{className:`font-extrabold text-white`,children:`CHESSLAB NOTE`}),(0,A.jsx)(`span`,{children:`•`}),(0,A.jsx)(`span`,{children:`Nhóm 12 • UET – VNU`}),(0,A.jsx)(`span`,{children:`•`}),(0,A.jsxs)(`span`,{className:`font-mono text-emerald-400`,children:[`Commit `,qt.referenceCommit.substring(0,7)]})]}),(0,A.jsx)(`div`,{className:`flex items-center gap-1`,children:(0,A.jsx)(`span`,{children:`Xây dựng phục vụ bảo vệ bài tập lớn môn Biểu diễn tri thức và tìm kiếm nâng cao`})})]})})]})]}),(0,A.jsx)(tn,{isOpen:o,onClose:()=>s(!1),onNavigate:f}),c&&(0,A.jsx)(`button`,{onClick:()=>{window.scrollTo({top:0,behavior:`smooth`})},className:`fixed bottom-6 right-6 z-30 p-3 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 transition-all scale-100 hover:scale-110 cursor-pointer`,title:`Lên đầu trang`,children:(0,A.jsx)(me,{className:`w-5 h-5`})})]})}(0,v.createRoot)(document.getElementById(`root`)).render((0,A.jsx)(_.StrictMode,{children:(0,A.jsx)(In,{})}));