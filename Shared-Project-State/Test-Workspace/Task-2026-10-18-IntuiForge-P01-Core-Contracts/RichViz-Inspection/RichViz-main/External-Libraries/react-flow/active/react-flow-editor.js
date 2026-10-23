/* Modified by RichViz for local shared-runtime integration. See ../../../THIRD_PARTY_NOTICES.md; upstream XYFlow/React Flow notices follow. */
function kx(l, i) {
  for (var c = 0; c < i.length; c++) {
    const r = i[c];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const s in r)
        if (s !== "default" && !(s in l)) {
          const f = Object.getOwnPropertyDescriptor(r, s);
          f && Object.defineProperty(l, s, f.get ? f : {
            enumerable: !0,
            get: () => r[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(l, Symbol.toStringTag, { value: "Module" }));
}
function qu(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var Wf = { exports: {} }, _u = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iy;
function Fx() {
  if (iy) return _u;
  iy = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function c(r, s, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), s.key !== void 0 && (d = "" + s.key), "key" in s) {
      f = {};
      for (var g in s)
        g !== "key" && (f[g] = s[g]);
    } else f = s;
    return s = f.ref, {
      $$typeof: l,
      type: r,
      key: d,
      ref: s !== void 0 ? s : null,
      props: f
    };
  }
  return _u.Fragment = i, _u.jsx = c, _u.jsxs = c, _u;
}
var uy;
function Wx() {
  return uy || (uy = 1, Wf.exports = Fx()), Wf.exports;
}
var q = Wx();
const Px = /* @__PURE__ */ qu(q), tb = /* @__PURE__ */ kx({
  __proto__: null,
  default: Px
}, [q]);
var Pf = { exports: {} }, Et = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oy;
function eb() {
  if (oy) return Et;
  oy = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), d = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), v = Symbol.for("react.view_transition"), b = Symbol.iterator;
  function E(T) {
    return T === null || typeof T != "object" ? null : (T = b && T[b] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, w = Object.assign, N = {};
  function R(T, F, ft) {
    this.props = T, this.context = F, this.refs = N, this.updater = ft || z;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(T, F) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, F, "setState");
  }, R.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function _() {
  }
  _.prototype = R.prototype;
  function A(T, F, ft) {
    this.props = T, this.context = F, this.refs = N, this.updater = ft || z;
  }
  var G = A.prototype = new _();
  G.constructor = A, w(G, R.prototype), G.isPureReactComponent = !0;
  var B = Array.isArray;
  function H() {
  }
  var Q = { H: null, A: null, T: null, S: null }, Y = Object.prototype.hasOwnProperty;
  function lt(T, F, ft) {
    var ut = ft.ref;
    return {
      $$typeof: l,
      type: T,
      key: F,
      ref: ut !== void 0 ? ut : null,
      props: ft
    };
  }
  function P(T, F) {
    return lt(T.type, F, T.props);
  }
  function it(T) {
    return typeof T == "object" && T !== null && T.$$typeof === l;
  }
  function at(T) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(ft) {
      return F[ft];
    });
  }
  var C = /\/+/g;
  function j(T, F) {
    return typeof T == "object" && T !== null && T.key != null ? at("" + T.key) : F.toString(36);
  }
  function O(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(H, H) : (T.status = "pending", T.then(
          function(F) {
            T.status === "pending" && (T.status = "fulfilled", T.value = F);
          },
          function(F) {
            T.status === "pending" && (T.status = "rejected", T.reason = F);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function U(T, F, ft, ut, W) {
    var dt = typeof T;
    (dt === "undefined" || dt === "boolean") && (T = null);
    var gt = !1;
    if (T === null) gt = !0;
    else
      switch (dt) {
        case "bigint":
        case "string":
        case "number":
          gt = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case l:
            case i:
              gt = !0;
              break;
            case y:
              return gt = T._init, U(
                gt(T._payload),
                F,
                ft,
                ut,
                W
              );
          }
      }
    if (gt)
      return W = W(T), gt = ut === "" ? "." + j(T, 0) : ut, B(W) ? (ft = "", gt != null && (ft = gt.replace(C, "$&/") + "/"), U(W, F, ft, "", function(pt) {
        return pt;
      })) : W != null && (it(W) && (W = P(
        W,
        ft + (W.key == null || T && T.key === W.key ? "" : ("" + W.key).replace(
          C,
          "$&/"
        ) + "/") + gt
      )), F.push(W)), 1;
    gt = 0;
    var rt = ut === "" ? "." : ut + ":";
    if (B(T))
      for (var st = 0; st < T.length; st++)
        ut = T[st], dt = rt + j(ut, st), gt += U(
          ut,
          F,
          ft,
          dt,
          W
        );
    else if (st = E(T), typeof st == "function")
      for (T = st.call(T), st = 0; !(ut = T.next()).done; )
        ut = ut.value, dt = rt + j(ut, st++), gt += U(
          ut,
          F,
          ft,
          dt,
          W
        );
    else if (dt === "object") {
      if (typeof T.then == "function")
        return U(
          O(T),
          F,
          ft,
          ut,
          W
        );
      throw F = String(T), Error(
        "Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return gt;
  }
  function Z(T, F, ft) {
    if (T == null) return T;
    var ut = [], W = 0;
    return U(T, ut, "", "", function(dt) {
      return F.call(ft, dt, W++);
    }), ut;
  }
  function J(T) {
    if (T._status === -1) {
      var F = T._result, ft = F();
      ft.then(
        function(ut) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = ut, ft.status === void 0 && (ft.status = "fulfilled", ft.value = ut));
        },
        function(ut) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = ut, ft.status === void 0 && (ft.status = "rejected", ft.reason = ut));
        }
      ), T._status === -1 && (T._status = 0, T._result = ft);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var tt = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var F = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(F)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  };
  function ot(T) {
    var F = Q.T, ft = {};
    ft.types = F !== null ? F.types : null, Q.T = ft;
    try {
      var ut = T(), W = Q.S;
      W !== null && W(ft, ut), typeof ut == "object" && ut !== null && typeof ut.then == "function" && ut.then(H, tt);
    } catch (dt) {
      tt(dt);
    } finally {
      F !== null && ft.types !== null && (F.types = ft.types), Q.T = F;
    }
  }
  function ct(T) {
    var F = Q.T;
    if (F !== null) {
      var ft = F.types;
      ft === null ? F.types = [T] : ft.indexOf(T) === -1 && ft.push(T);
    } else ot(ct.bind(null, T));
  }
  var vt = {
    map: Z,
    forEach: function(T, F, ft) {
      Z(
        T,
        function() {
          F.apply(this, arguments);
        },
        ft
      );
    },
    count: function(T) {
      var F = 0;
      return Z(T, function() {
        F++;
      }), F;
    },
    toArray: function(T) {
      return Z(T, function(F) {
        return F;
      }) || [];
    },
    only: function(T) {
      if (!it(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return Et.Activity = m, Et.Children = vt, Et.Component = R, Et.Fragment = c, Et.Profiler = s, Et.PureComponent = A, Et.StrictMode = r, Et.Suspense = p, Et.ViewTransition = v, Et.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, Et.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return Q.H.useMemoCache(T);
    }
  }, Et.addTransitionType = ct, Et.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, Et.cacheSignal = function() {
    return null;
  }, Et.cloneElement = function(T, F, ft) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var ut = w({}, T.props), W = T.key;
    if (F != null)
      for (dt in F.key !== void 0 && (W = "" + F.key), F)
        !Y.call(F, dt) || dt === "key" || dt === "__self" || dt === "__source" || dt === "ref" && F.ref === void 0 || (ut[dt] = F[dt]);
    var dt = arguments.length - 2;
    if (dt === 1) ut.children = ft;
    else if (1 < dt) {
      for (var gt = Array(dt), rt = 0; rt < dt; rt++)
        gt[rt] = arguments[rt + 2];
      ut.children = gt;
    }
    return lt(T.type, W, ut);
  }, Et.createContext = function(T) {
    return T = {
      $$typeof: d,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: f,
      _context: T
    }, T;
  }, Et.createElement = function(T, F, ft) {
    var ut, W = {}, dt = null;
    if (F != null)
      for (ut in F.key !== void 0 && (dt = "" + F.key), F)
        Y.call(F, ut) && ut !== "key" && ut !== "__self" && ut !== "__source" && (W[ut] = F[ut]);
    var gt = arguments.length - 2;
    if (gt === 1) W.children = ft;
    else if (1 < gt) {
      for (var rt = Array(gt), st = 0; st < gt; st++)
        rt[st] = arguments[st + 2];
      W.children = rt;
    }
    if (T && T.defaultProps)
      for (ut in gt = T.defaultProps, gt)
        W[ut] === void 0 && (W[ut] = gt[ut]);
    return lt(T, dt, W);
  }, Et.createRef = function() {
    return { current: null };
  }, Et.forwardRef = function(T) {
    return { $$typeof: g, render: T };
  }, Et.isValidElement = it, Et.lazy = function(T) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: T },
      _init: J
    };
  }, Et.memo = function(T, F) {
    return {
      $$typeof: S,
      type: T,
      compare: F === void 0 ? null : F
    };
  }, Et.startTransition = ot, Et.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, Et.use = function(T) {
    return Q.H.use(T);
  }, Et.useActionState = function(T, F, ft) {
    return Q.H.useActionState(T, F, ft);
  }, Et.useCallback = function(T, F) {
    return Q.H.useCallback(T, F);
  }, Et.useContext = function(T) {
    return Q.H.useContext(T);
  }, Et.useDebugValue = function() {
  }, Et.useDeferredValue = function(T, F) {
    return Q.H.useDeferredValue(T, F);
  }, Et.useEffect = function(T, F) {
    return Q.H.useEffect(T, F);
  }, Et.useEffectEvent = function(T) {
    return Q.H.useEffectEvent(T);
  }, Et.useId = function() {
    return Q.H.useId();
  }, Et.useImperativeHandle = function(T, F, ft) {
    return Q.H.useImperativeHandle(T, F, ft);
  }, Et.useInsertionEffect = function(T, F) {
    return Q.H.useInsertionEffect(T, F);
  }, Et.useLayoutEffect = function(T, F) {
    return Q.H.useLayoutEffect(T, F);
  }, Et.useMemo = function(T, F) {
    return Q.H.useMemo(T, F);
  }, Et.useOptimistic = function(T, F) {
    return Q.H.useOptimistic(T, F);
  }, Et.useReducer = function(T, F, ft) {
    return Q.H.useReducer(T, F, ft);
  }, Et.useRef = function(T) {
    return Q.H.useRef(T);
  }, Et.useState = function(T) {
    return Q.H.useState(T);
  }, Et.useSyncExternalStore = function(T, F, ft) {
    return Q.H.useSyncExternalStore(
      T,
      F,
      ft
    );
  }, Et.useTransition = function() {
    return Q.H.useTransition();
  }, Et.version = "19.3.0", Et;
}
var cy;
function Xu() {
  return cy || (cy = 1, Pf.exports = eb()), Pf.exports;
}
var k = Xu();
const vd = /* @__PURE__ */ qu(k);
var td = { exports: {} }, pe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ry;
function nb() {
  if (ry) return pe;
  ry = 1;
  var l = Xu();
  function i(y) {
    var m = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        m += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return "Minified React error #" + y + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c() {
  }
  var r = {
    d: {
      f: c,
      r: function() {
        throw Error(i(522));
      },
      D: c,
      C: c,
      L: c,
      m: c,
      X: c,
      S: c,
      M: c
    },
    p: 0,
    findDOMNode: null
  }, s = Symbol.for("react.portal"), f = Symbol.for("react.recoverable"), d = Symbol.for("react.optimistic_key");
  function g(y, m, v) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: b == null ? null : b === d ? d : "" + b,
      children: y,
      containerInfo: m,
      implementation: v
    };
  }
  var p = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function S(y, m) {
    if (y === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, pe.browser = function(y) {
    return { $$typeof: f, _reason: y };
  }, pe.createPortal = function(y, m) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(i(299));
    return g(y, m, null, v);
  }, pe.flushSync = function(y) {
    var m = p.T, v = r.p;
    try {
      if (p.T = null, r.p = 2, y) return y();
    } finally {
      p.T = m, r.p = v, r.d.f();
    }
  }, pe.preconnect = function(y, m) {
    typeof y == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, r.d.C(y, m));
  }, pe.prefetchDNS = function(y) {
    typeof y == "string" && r.d.D(y);
  }, pe.preinit = function(y, m) {
    if (typeof y == "string" && m && typeof m.as == "string") {
      var v = m.as, b = S(v, m.crossOrigin), E = typeof m.integrity == "string" ? m.integrity : void 0, z = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      v === "style" ? r.d.S(
        y,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: b,
          integrity: E,
          fetchPriority: z
        }
      ) : v === "script" && r.d.X(y, {
        crossOrigin: b,
        integrity: E,
        fetchPriority: z,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, pe.preinitModule = function(y, m) {
    if (typeof y == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var v = S(
            m.as,
            m.crossOrigin
          );
          r.d.M(y, {
            crossOrigin: v,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0
          });
        }
      } else m == null && r.d.M(y);
  }, pe.preload = function(y, m) {
    if (typeof y == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var v = m.as, b = S(v, m.crossOrigin);
      r.d.L(y, v, {
        crossOrigin: b,
        integrity: typeof m.integrity == "string" ? m.integrity : void 0,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0,
        type: typeof m.type == "string" ? m.type : void 0,
        fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
        referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
        imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
        imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
        media: typeof m.media == "string" ? m.media : void 0
      });
    }
  }, pe.preloadModule = function(y, m) {
    if (typeof y == "string")
      if (m) {
        var v = S(m.as, m.crossOrigin);
        r.d.m(y, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: v,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0
        });
      } else r.d.m(y);
  }, pe.requestFormReset = function(y) {
    r.d.r(y);
  }, pe.unstable_batchedUpdates = function(y, m) {
    return y(m);
  }, pe.useFormState = function(y, m, v) {
    return p.H.useFormState(y, m, v);
  }, pe.useFormStatus = function() {
    return p.H.useHostTransitionStatus();
  }, pe.version = "19.3.0", pe;
}
var sy;
function wv() {
  if (sy) return td.exports;
  sy = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), td.exports = nb(), td.exports;
}
var lb = wv();
const ab = /* @__PURE__ */ qu(lb);
var ed = { exports: {} }, wu = {}, nd = { exports: {} }, ld = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fy;
function ib() {
  return fy || (fy = 1, (function(l) {
    function i(O, U) {
      var Z = O.length;
      O.push(U);
      t: for (; 0 < Z; ) {
        var J = Z - 1 >>> 1, tt = O[J];
        if (0 < s(tt, U))
          O[J] = U, O[Z] = tt, Z = J;
        else break t;
      }
    }
    function c(O) {
      return O.length === 0 ? null : O[0];
    }
    function r(O) {
      if (O.length === 0) return null;
      var U = O[0], Z = O.pop();
      if (Z !== U) {
        O[0] = Z;
        t: for (var J = 0, tt = O.length, ot = tt >>> 1; J < ot; ) {
          var ct = 2 * (J + 1) - 1, vt = O[ct], T = ct + 1, F = O[T];
          if (0 > s(vt, Z))
            T < tt && 0 > s(F, vt) ? (O[J] = F, O[T] = Z, J = T) : (O[J] = vt, O[ct] = Z, J = ct);
          else if (T < tt && 0 > s(F, Z))
            O[J] = F, O[T] = Z, J = T;
          else break t;
        }
      }
      return U;
    }
    function s(O, U) {
      var Z = O.sortIndex - U.sortIndex;
      return Z !== 0 ? Z : O.id - U.id;
    }
    if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      l.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, g = d.now();
      l.unstable_now = function() {
        return d.now() - g;
      };
    }
    var p = [], S = [], y = 1, m = null, v = 3, b = !1, E = !1, z = !1, w = !1, N = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function A(O) {
      for (var U = c(S); U !== null; ) {
        if (U.callback === null) r(S);
        else if (U.startTime <= O)
          r(S), U.sortIndex = U.expirationTime, i(p, U);
        else break;
        U = c(S);
      }
    }
    function G(O) {
      if (z = !1, A(O), !E)
        if (c(p) !== null)
          E = !0, B || (B = !0, it());
        else {
          var U = c(S);
          U !== null && j(G, U.startTime - O);
        }
    }
    var B = !1, H = -1, Q = 5, Y = -1;
    function lt() {
      return w ? !0 : !(l.unstable_now() - Y < Q);
    }
    function P() {
      if (w = !1, B) {
        var O = l.unstable_now();
        Y = O;
        var U = !0;
        try {
          t: {
            E = !1, z && (z = !1, R(H), H = -1), b = !0;
            var Z = v;
            try {
              e: {
                for (A(O), m = c(p); m !== null && !(m.expirationTime > O && lt()); ) {
                  var J = m.callback;
                  if (typeof J == "function") {
                    m.callback = null, v = m.priorityLevel;
                    var tt = J(
                      m.expirationTime <= O
                    );
                    if (O = l.unstable_now(), typeof tt == "function") {
                      m.callback = tt, A(O), U = !0;
                      break e;
                    }
                    m === c(p) && r(p), A(O);
                  } else r(p);
                  m = c(p);
                }
                if (m !== null) U = !0;
                else {
                  var ot = c(S);
                  ot !== null && j(
                    G,
                    ot.startTime - O
                  ), U = !1;
                }
              }
              break t;
            } finally {
              m = null, v = Z, b = !1;
            }
            U = void 0;
          }
        } finally {
          U ? it() : B = !1;
        }
      }
    }
    var it;
    if (typeof _ == "function")
      it = function() {
        _(P);
      };
    else if (typeof MessageChannel < "u") {
      var at = new MessageChannel(), C = at.port2;
      at.port1.onmessage = P, it = function() {
        C.postMessage(null);
      };
    } else
      it = function() {
        N(P, 0);
      };
    function j(O, U) {
      H = N(function() {
        O(l.unstable_now());
      }, U);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, l.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Q = 0 < O ? Math.floor(1e3 / O) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, l.unstable_next = function(O) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = v;
      }
      var Z = v;
      v = U;
      try {
        return O();
      } finally {
        v = Z;
      }
    }, l.unstable_requestPaint = function() {
      w = !0;
    }, l.unstable_runWithPriority = function(O, U) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var Z = v;
      v = O;
      try {
        return U();
      } finally {
        v = Z;
      }
    }, l.unstable_scheduleCallback = function(O, U, Z) {
      var J = l.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? J + Z : J) : Z = J, O) {
        case 1:
          var tt = -1;
          break;
        case 2:
          tt = 250;
          break;
        case 5:
          tt = 1073741823;
          break;
        case 4:
          tt = 1e4;
          break;
        default:
          tt = 5e3;
      }
      return tt = Z + tt, O = {
        id: y++,
        callback: U,
        priorityLevel: O,
        startTime: Z,
        expirationTime: tt,
        sortIndex: -1
      }, Z > J ? (O.sortIndex = Z, i(S, O), c(p) === null && O === c(S) && (z ? (R(H), H = -1) : z = !0, j(G, Z - J))) : (O.sortIndex = tt, i(p, O), E || b || (E = !0, B || (B = !0, it()))), O;
    }, l.unstable_shouldYield = lt, l.unstable_wrapCallback = function(O) {
      var U = v;
      return function() {
        var Z = v;
        v = U;
        try {
          return O.apply(this, arguments);
        } finally {
          v = Z;
        }
      };
    };
  })(ld)), ld;
}
var dy;
function ub() {
  return dy || (dy = 1, nd.exports = ib()), nd.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hy;
function ob() {
  if (hy) return wu;
  hy = 1;
  var l = ub(), i = Xu(), c = wv();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function f(t) {
    for (var e = t, n = e; n && !n.alternate; )
      e = n, (e.flags & 4098) !== 0 && (t = e.return), n = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (f(t) !== t)
      throw Error(r(188));
  }
  function S(t) {
    var e = t.alternate;
    if (!e) {
      if (e = f(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var n = t, a = e; ; ) {
      var u = n.return;
      if (u === null) break;
      var o = u.alternate;
      if (o === null) {
        if (a = u.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (u.child === o.child) {
        for (o = u.child; o; ) {
          if (o === n) return p(u), t;
          if (o === a) return p(u), e;
          o = o.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== a.return) n = u, a = o;
      else {
        for (var h = !1, x = u.child; x; ) {
          if (x === n) {
            h = !0, n = u, a = o;
            break;
          }
          if (x === a) {
            h = !0, a = u, n = o;
            break;
          }
          x = x.sibling;
        }
        if (!h) {
          for (x = o.child; x; ) {
            if (x === n) {
              h = !0, n = o, a = u;
              break;
            }
            if (x === a) {
              h = !0, a = o, n = u;
              break;
            }
            x = x.sibling;
          }
          if (!h) throw Error(r(189));
        }
      }
      if (n.alternate !== a) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? t : e;
  }
  function y(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = y(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function m(t, e, n, a, u, o) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, a, u, o) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && m(
        t.child,
        e,
        n,
        a,
        u,
        o
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function v(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function b(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function E(t) {
    var e = [null, null], n = v(t);
    return n === null || z(
      e,
      t,
      n.child,
      { foundSelf: !1 }
    ), e;
  }
  function z(t, e, n, a) {
    for (; n !== null; ) {
      if (n === e) a.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (a.foundSelf) return t[1] = n, !0;
        t[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && z(
        t,
        e,
        n.child,
        a
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function w(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var N = null, R = null;
  function _(t, e, n) {
    return t === n ? !0 : t === e ? (N = t, !0) : !1;
  }
  function A(t, e, n) {
    return t === n ? (R = t, !1) : t === e ? (R !== null && (N = t), !0) : !1;
  }
  function G(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function B(t, e, n) {
    for (var a = 0, u = t; u; u = n(u)) a++;
    u = 0;
    for (var o = e; o; o = n(o)) u++;
    for (; 0 < a - u; ) t = n(t), a--;
    for (; 0 < u - a; ) e = n(e), u--;
    for (; a--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var H = Object.assign, Q = Symbol.for("react.element"), Y = Symbol.for("react.transitional.element"), lt = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), it = Symbol.for("react.strict_mode"), at = Symbol.for("react.profiler"), C = Symbol.for("react.consumer"), j = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), tt = Symbol.for("react.lazy"), ot = Symbol.for("react.activity"), ct = Symbol.for("react.legacy_hidden"), vt = Symbol.for("react.memo_cache_sentinel"), T = Symbol.for("react.view_transition"), F = Symbol.for("react.recoverable"), ft = Symbol.iterator;
  function ut(t) {
    return t === null || typeof t != "object" ? null : (t = ft && t[ft] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var W = Symbol.for("react.client.reference");
  function dt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === W ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case P:
        return "Fragment";
      case at:
        return "Profiler";
      case it:
        return "StrictMode";
      case U:
        return "Suspense";
      case Z:
        return "SuspenseList";
      case ot:
        return "Activity";
      case T:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case lt:
          return "Portal";
        case j:
          return t.displayName || "Context";
        case C:
          return (t._context.displayName || "Context") + ".Consumer";
        case O:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case J:
          return e = t.displayName || null, e !== null ? e : dt(t.type) || "Memo";
        case tt:
          e = t._payload, t = t._init;
          try {
            return dt(t(e));
          } catch {
          }
      }
    return null;
  }
  var gt = Array.isArray, rt = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, st = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, pt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, _t = [], Ct = -1;
  function Tt(t) {
    return { current: t };
  }
  function Ht(t) {
    0 > Ct || (t.current = _t[Ct], _t[Ct] = null, Ct--);
  }
  function Ot(t, e) {
    Ct++, _t[Ct] = t.current, t.current = e;
  }
  var Pt = Tt(null), Se = Tt(null), re = Tt(null), En = Tt(null);
  function Ie(t, e) {
    switch (Ot(re, e), Ot(Se, t), Ot(Pt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? gm(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = gm(e), t = mm(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Ht(Pt), Ot(Pt, t);
  }
  function Ae() {
    Ht(Pt), Ht(Se), Ht(re);
  }
  function Ee(t) {
    var e = t.memoizedState;
    e !== null && (fi._currentValue = e.memoizedState, Ot(En, t)), e = Pt.current;
    var n = mm(e, t.type);
    e !== n && (Ot(Se, t), Ot(Pt, n));
  }
  function Oe(t) {
    Se.current === t && (Ht(Pt), Ht(Se)), En.current === t && (Ht(En), fi._currentValue = pt);
  }
  var Ve, _n;
  function ke(t) {
    if (Ve === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        Ve = e && e[1] || "", _n = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ve + t + _n;
  }
  var Ll = !1;
  function Ni(t, e) {
    if (!t || Ll) return "";
    Ll = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var nt = function() {
                throw Error();
              };
              if (Object.defineProperty(nt.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(nt, []);
                } catch (ht) {
                  var V = ht;
                }
                Reflect.construct(t, [], nt);
              } else {
                try {
                  nt.call();
                } catch (ht) {
                  V = ht;
                }
                nt = !1;
                try {
                  var $ = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), nt = !0, new t();
                } finally {
                  nt && ($ !== void 0 ? Object.defineProperty(t.prototype, "props", $) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (ht) {
                V = ht;
              }
              (nt = t()) && typeof nt.catch == "function" && nt.catch(function() {
              });
            }
          } catch (ht) {
            if (ht && V && typeof ht.stack == "string")
              return [ht.stack, V.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var o = a.DetermineComponentFrameRoot(), h = o[0], x = o[1];
      if (h && x) {
        var M = h.split(`
`), X = x.split(`
`);
        for (u = a = 0; a < M.length && !M[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < X.length && !X[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === M.length || u === X.length)
          for (a = M.length - 1, u = X.length - 1; 1 <= a && 0 <= u && M[a] !== X[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (M[a] !== X[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || M[a] !== X[u]) {
                  var I = `
` + M[a].replace(" at new ", " at ");
                  return t.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", t.displayName)), I;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      Ll = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? ke(n) : "";
  }
  function gr(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return ke(t.type);
      case 16:
        return ke("Lazy");
      case 13:
        return t.child !== e && e !== null ? ke("Suspense Fallback") : ke("Suspense");
      case 19:
        return ke("SuspenseList");
      case 0:
      case 15:
        return Ni(t.type, !1);
      case 11:
        return Ni(t.type.render, !1);
      case 1:
        return Ni(t.type, !0);
      case 31:
        return ke("Activity");
      case 30:
        return ke("ViewTransition");
      default:
        return "";
    }
  }
  function Iu(t) {
    try {
      var e = "", n = null;
      do
        e += gr(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ti = Object.prototype.hasOwnProperty, zi = l.unstable_scheduleCallback, Ci = l.unstable_cancelCallback, mr = l.unstable_shouldYield, yr = l.unstable_requestPaint, _e = l.unstable_now, vr = l.unstable_getCurrentPriorityLevel, ku = l.unstable_ImmediatePriority, Fu = l.unstable_UserBlockingPriority, ba = l.unstable_NormalPriority, pr = l.unstable_LowPriority, Wu = l.unstable_IdlePriority, Sr = l.log, xr = l.unstable_setDisableYieldValue, ql = null, we = null;
  function wn(t) {
    if (typeof Sr == "function" && xr(t), we && typeof we.setStrictMode == "function")
      try {
        we.setStrictMode(ql, t);
      } catch {
      }
  }
  var Ne = Math.clz32 ? Math.clz32 : _r, br = Math.log, Er = Math.LN2;
  function _r(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (br(t) / Er | 0) | 0;
  }
  var Ea = 256, _a = 262144, wa = 4194304;
  function jn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Na(t, e, n) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, o = t.suspendedLanes, h = t.pingedLanes;
    t = t.warmLanes;
    var x = a & 134217727;
    return x !== 0 ? (a = x & ~o, a !== 0 ? u = jn(a) : (h &= x, h !== 0 ? u = jn(h) : n || (n = x & ~t, n !== 0 && (u = jn(n))))) : (x = a & ~o, x !== 0 ? u = jn(x) : h !== 0 ? u = jn(h) : n || (n = a & ~t, n !== 0 && (u = jn(n)))), u === 0 ? 0 : e !== 0 && e !== u && (e & o) === 0 && (o = u & -u, n = e & -e, o >= n || o === 32 && (n & 4194048) !== 0) ? e : u;
  }
  function Xl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Mi(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - Ne(n), u = 1 << a;
        e |= t[a], n &= ~u;
      }
    return e;
  }
  function Pu(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ai() {
    var t = wa;
    return wa <<= 1, (wa & 62914560) === 0 && (wa = 4194304), t;
  }
  function Oi(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function Zl(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function wr(t, e, n, a, u, o) {
    var h = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var x = t.entanglements, M = t.expirationTimes, X = t.hiddenUpdates;
    for (n = h & ~n; 0 < n; ) {
      var I = 31 - Ne(n), nt = 1 << I;
      x[I] = 0, M[I] = -1;
      var V = X[I];
      if (V !== null)
        for (X[I] = null, I = 0; I < V.length; I++) {
          var $ = V[I];
          $ !== null && ($.lane &= -536870913);
        }
      n &= ~nt;
    }
    a !== 0 && to(t, a, 0), o !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= o & ~(h & ~e));
  }
  function to(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - Ne(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | n & 261930;
  }
  function eo(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var a = 31 - Ne(n), u = 1 << a;
      u & e | t[a] & e && (t[a] |= e), n &= ~u;
    }
  }
  function no(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : Ta(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function Ta(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Di(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function lo() {
    var t = st.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Wm(t.type));
  }
  function ao(t, e) {
    var n = st.p;
    try {
      return st.p = t, e();
    } finally {
      st.p = n;
    }
  }
  var on = Math.random().toString(36).slice(2), oe = "__reactFiber$" + on, xe = "__reactProps$" + on, il = "__reactContainer$" + on, io = "__reactEvents$" + on, uo = "__reactListeners$" + on, Nr = "__reactHandles$" + on, oo = "__reactResources$" + on, Gl = "__reactMarker$" + on, za = "__reactLoad$" + on;
  function Ca(t) {
    delete t[oe], delete t[xe], delete t[uo], delete t[Nr];
  }
  function Ln(t) {
    var e;
    if (e = t[oe]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[il] || n[oe]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Dm(t); t !== null; ) {
            if (n = t[oe]) return n;
            t = Dm(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function ul(t) {
    if (t = t[oe] || t[il]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Ql(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function qn(t) {
    var e = t[oo];
    return e || (e = t[oo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ee(t) {
    t[Gl] = !0;
  }
  function Ri(t) {
    t[za] = void 0;
  }
  var co = /* @__PURE__ */ new Set(), ro = {};
  function cn(t, e) {
    ol(t, e), ol(t + "Capture", e);
  }
  function ol(t, e) {
    for (ro[t] = e, t = 0; t < e.length; t++)
      co.add(e[t]);
  }
  var Tr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hi = {}, Pd = {};
  function m1(t) {
    return Ti.call(Pd, t) ? !0 : Ti.call(Hi, t) ? !1 : Tr.test(t) ? Pd[t] = !0 : (Hi[t] = !0, !1);
  }
  var Yt = !1;
  function th() {
    var t = Yt;
    return Yt = !1, t;
  }
  function so(t, e, n) {
    if (m1(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, n);
      }
  }
  function fo(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, n);
    }
  }
  function Xn(t, e, n, a) {
    if (a === null) t.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, a);
    }
  }
  function je(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function eh(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function y1(t, e, n) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, o = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(h) {
          n = "" + h, o.call(this, h);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(h) {
          n = "" + h;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function zr(t) {
    if (!t._valueTracker) {
      var e = eh(t) ? "checked" : "value";
      t._valueTracker = y1(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function nh(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), a = "";
    return t && (a = eh(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== n ? (e.setValue(t), !0) : !1;
  }
  var v1 = /[\n"\\]/g;
  function Fe(t) {
    return t.replace(
      v1,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Cr(t, e, n, a, u, o, h, x) {
    t.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? t.type = h : t.removeAttribute("type"), e != null ? h === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + je(e)) : t.value !== "" + je(e) && (t.value = "" + je(e)) : h !== "submit" && h !== "reset" || t.removeAttribute("value"), e != null ? h === "number" && t.value == e ? Mr(t, je(t.value)) : Mr(t, je(e)) : n != null ? Mr(t, je(n)) : a != null && t.removeAttribute("value"), u == null && o != null && (t.defaultChecked = !!o), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.name = "" + je(x) : t.removeAttribute("name");
  }
  function lh(t, e, n, a, u, o, h, x) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (t.type = o), e != null || n != null) {
      if (!(o !== "submit" && o !== "reset" || e != null)) {
        zr(t);
        return;
      }
      n = n != null ? "" + je(n) : "", e = e != null ? "" + je(e) : n, x || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = x ? t.checked : !!a, t.defaultChecked = !!a, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.name = h), zr(t);
  }
  function Mr(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Ma(t, e, n, a) {
    if (t = t.options, e) {
      e = {};
      for (var u = 0; u < n.length; u++)
        e["$" + n[u]] = !0;
      for (n = 0; n < t.length; n++)
        u = e.hasOwnProperty("$" + t[n].value), t[n].selected !== u && (t[n].selected = u), u && a && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + je(n), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === n) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function ah(t, e, n) {
    if (e != null && (e = "" + je(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + je(n) : "";
  }
  function ih(t, e, n, a) {
    if (e == null) {
      if (a != null) {
        if (n != null) throw Error(r(92));
        if (gt(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), e = n;
    }
    n = je(e), t.defaultValue = n, a = t.textContent, a === n && a !== "" && a !== null && (t.value = a), zr(t);
  }
  function Aa(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var p1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function uh(t, e, n) {
    var a = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, n) : typeof n != "number" || n === 0 || p1.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function oh(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Yt = !0);
      for (var u in e)
        a = e[u], e.hasOwnProperty(u) && n[u] !== a && (uh(t, u, a), Yt = !0);
    } else
      for (var o in e)
        e.hasOwnProperty(o) && uh(t, o, e[o]);
  }
  function Ar(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var S1 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), x1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ho(t) {
    return x1.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Nn() {
  }
  var Or = null;
  function Dr(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Oa = null, Da = null;
  function ch(t) {
    var e = ul(t);
    if (e && (t = e.stateNode)) {
      var n = t[xe] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Cr(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + Fe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var a = n[e];
              if (a !== t && a.form === t.form) {
                var u = a[xe] || null;
                if (!u) throw Error(r(90));
                Cr(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              a = n[e], a.form === t.form && nh(a);
          }
          break t;
        case "textarea":
          ah(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Ma(t, !!n.multiple, e, !1);
      }
    }
  }
  var Rr = !1;
  function rh(t, e, n) {
    if (Rr) return t(e, n);
    Rr = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Rr = !1, (Oa !== null || Da !== null) && (hc(), Oa && (e = Oa, t = Da, Da = Oa = null, ch(e), t)))
        for (e = 0; e < t.length; e++) ch(t[e]);
    }
  }
  function Ui(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var a = n[xe] || null;
    if (a === null) return null;
    n = a[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        r(231, e, typeof n)
      );
    return n;
  }
  var Zn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Hr = !1;
  if (Zn)
    try {
      var Bi = {};
      Object.defineProperty(Bi, "passive", {
        get: function() {
          Hr = !0;
        }
      }), window.addEventListener("test", Bi, Bi), window.removeEventListener("test", Bi, Bi);
    } catch {
      Hr = !1;
    }
  var cl = null, Ur = null, go = null;
  function sh() {
    if (go) return go;
    var t, e = Ur, n = e.length, a, u = "value" in cl ? cl.value : cl.textContent, o = u.length;
    for (t = 0; t < n && e[t] === u[t]; t++) ;
    var h = n - t;
    for (a = 1; a <= h && e[n - a] === u[o - a]; a++) ;
    return go = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function mo(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function yo() {
    return !0;
  }
  function fh() {
    return !1;
  }
  function Te(t) {
    function e(n, a, u, o, h) {
      this._reactName = n, this._targetInst = u, this.type = a, this.nativeEvent = o, this.target = h, this.currentTarget = null;
      for (var x in t)
        t.hasOwnProperty(x) && (n = t[x], this[x] = n ? n(o) : o[x]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? yo : fh, this.isPropagationStopped = fh, this;
    }
    return H(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = yo);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = yo);
      },
      persist: function() {
      },
      isPersistent: yo
    }), e;
  }
  var rl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, vo = Te(rl), Yi = H({}, rl, { view: 0, detail: 0 }), b1 = Te(Yi), Br, Yr, Vi, po = H({}, Yi, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: jr,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Vi && (Vi && t.type === "mousemove" ? (Br = t.screenX - Vi.screenX, Yr = t.screenY - Vi.screenY) : Yr = Br = 0, Vi = t), Br);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Yr;
    }
  }), dh = Te(po), E1 = H({}, po, { dataTransfer: 0 }), _1 = Te(E1), w1 = H({}, Yi, { relatedTarget: 0 }), Vr = Te(w1), N1 = H({}, rl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), T1 = Te(N1), z1 = H({}, rl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), C1 = Te(z1), M1 = H({}, rl, { data: 0 }), hh = Te(M1), A1 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, O1 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, D1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function R1(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = D1[t]) ? !!e[t] : !1;
  }
  function jr() {
    return R1;
  }
  var H1 = H({}, Yi, {
    key: function(t) {
      if (t.key) {
        var e = A1[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = mo(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? O1[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: jr,
    charCode: function(t) {
      return t.type === "keypress" ? mo(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? mo(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), U1 = Te(H1), B1 = H({}, po, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), gh = Te(B1), Y1 = H({}, rl, { submitter: 0 }), V1 = Te(Y1), j1 = H({}, Yi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: jr
  }), L1 = Te(j1), q1 = H({}, rl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), X1 = Te(q1), Z1 = H({}, po, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), G1 = Te(Z1), Q1 = H({}, rl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), K1 = Te(Q1), $1 = [9, 13, 27, 32], Lr = Zn && "CompositionEvent" in window, ji = null;
  Zn && "documentMode" in document && (ji = document.documentMode);
  var J1 = Zn && "TextEvent" in window && !ji, mh = Zn && (!Lr || ji && 8 < ji && 11 >= ji), yh = " ", vh = !1;
  function ph(t, e) {
    switch (t) {
      case "keyup":
        return $1.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Sh(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ra = !1;
  function I1(t, e) {
    switch (t) {
      case "compositionend":
        return Sh(e);
      case "keypress":
        return e.which !== 32 ? null : (vh = !0, yh);
      case "textInput":
        return t = e.data, t === yh && vh ? null : t;
      default:
        return null;
    }
  }
  function k1(t, e) {
    if (Ra)
      return t === "compositionend" || !Lr && ph(t, e) ? (t = sh(), go = Ur = cl = null, Ra = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return mh && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var F1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function xh(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!F1[t.type] : e === "textarea";
  }
  function bh(t, e, n, a) {
    Oa ? Da ? Da.push(a) : Da = [a] : Oa = a, e = Sc(e, "onChange"), 0 < e.length && (n = new vo(
      "onChange",
      "change",
      null,
      n,
      a
    ), t.push({ event: n, listeners: e }));
  }
  var Li = null, qi = null;
  function W1(t) {
    cm(t, 0);
  }
  function So(t) {
    var e = Ql(t);
    if (nh(e)) return t;
  }
  function Eh(t, e) {
    if (t === "change") return e;
  }
  var _h = !1;
  if (Zn) {
    var qr;
    if (Zn) {
      var Xr = "oninput" in document;
      if (!Xr) {
        var wh = document.createElement("div");
        wh.setAttribute("oninput", "return;"), Xr = typeof wh.oninput == "function";
      }
      qr = Xr;
    } else qr = !1;
    _h = qr && (!document.documentMode || 9 < document.documentMode);
  }
  function Nh() {
    Li && (Li.detachEvent("onpropertychange", Th), qi = Li = null);
  }
  function Th(t) {
    if (t.propertyName === "value" && So(qi)) {
      var e = [];
      bh(
        e,
        qi,
        t,
        Dr(t)
      ), rh(W1, e);
    }
  }
  function P1(t, e, n) {
    t === "focusin" ? (Nh(), Li = e, qi = n, Li.attachEvent("onpropertychange", Th)) : t === "focusout" && Nh();
  }
  function tS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return So(qi);
  }
  function eS(t, e) {
    if (t === "click") return So(e);
  }
  function nS(t, e) {
    if (t === "input" || t === "change")
      return So(e);
  }
  function lS(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Le = typeof Object.is == "function" ? Object.is : lS;
  function Xi(t, e) {
    if (Le(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), a = Object.keys(e);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var u = n[a];
      if (!Ti.call(e, u) || !Le(t[u], e[u]))
        return !1;
    }
    return !0;
  }
  function Zr(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function zh(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ch(t, e) {
    var n = zh(t);
    t = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (a = t + n.textContent.length, t <= e && a >= e)
          return { node: n, offset: e - t };
        t = a;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = zh(n);
    }
  }
  function Mh(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Mh(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Ah(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Zr(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Zr(t.document);
    }
    return e;
  }
  function Gr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var aS = Zn && "documentMode" in document && 11 >= document.documentMode, Ha = null, Qr = null, Zi = null, Kr = !1;
  function Oh(t, e, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Kr || Ha == null || Ha !== Zr(a) || (a = Ha, "selectionStart" in a && Gr(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Zi && Xi(Zi, a) || (Zi = a, a = Sc(Qr, "onSelect"), 0 < a.length && (e = new vo(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: a }), e.target = Ha)));
  }
  function Kl(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var Ua = {
    animationend: Kl("Animation", "AnimationEnd"),
    animationiteration: Kl("Animation", "AnimationIteration"),
    animationstart: Kl("Animation", "AnimationStart"),
    transitionrun: Kl("Transition", "TransitionRun"),
    transitionstart: Kl("Transition", "TransitionStart"),
    transitioncancel: Kl("Transition", "TransitionCancel"),
    transitionend: Kl("Transition", "TransitionEnd")
  }, $r = {}, Dh = {};
  Zn && (Dh = document.createElement("div").style, "AnimationEvent" in window || (delete Ua.animationend.animation, delete Ua.animationiteration.animation, delete Ua.animationstart.animation), "TransitionEvent" in window || delete Ua.transitionend.transition);
  function $l(t) {
    if ($r[t]) return $r[t];
    if (!Ua[t]) return t;
    var e = Ua[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Dh)
        return $r[t] = e[n];
    return t;
  }
  var Rh = $l("animationend"), Hh = $l("animationiteration"), Uh = $l("animationstart"), iS = $l("transitionrun"), uS = $l("transitionstart"), oS = $l("transitioncancel"), Bh = $l("transitionend"), Yh = /* @__PURE__ */ new Map(), Jr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Jr.push("scrollEnd");
  function rn(t, e) {
    Yh.set(t, e), cn(e, [t]);
  }
  var cS = 0;
  function Gn(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = hn.identifierPrefix;
    var n = cS++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function Vh(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = ei;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var u = t[n[a]];
        if (u != null) {
          if (u === "none") return "none";
          e = e == null ? u : e + (" " + u);
        }
      }
    return e ?? t.default;
  }
  function Qn(t, e) {
    return t = Vh(t), e = Vh(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var xo = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, We = [], Ba = 0, Ir = 0;
  function bo() {
    for (var t = Ba, e = Ir = Ba = 0; e < t; ) {
      var n = We[e];
      We[e++] = null;
      var a = We[e];
      We[e++] = null;
      var u = We[e];
      We[e++] = null;
      var o = We[e];
      if (We[e++] = null, a !== null && u !== null) {
        var h = a.pending;
        h === null ? u.next = u : (u.next = h.next, h.next = u), a.pending = u;
      }
      o !== 0 && jh(n, u, o);
    }
  }
  function Eo(t, e, n, a) {
    We[Ba++] = t, We[Ba++] = e, We[Ba++] = n, We[Ba++] = a, Ir |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function kr(t, e, n, a) {
    return Eo(t, e, n, a), _o(t);
  }
  function Jl(t, e) {
    return Eo(t, null, null, e), _o(t);
  }
  function jh(t, e, n) {
    t.lanes |= n;
    var a = t.alternate;
    a !== null && (a.lanes |= n);
    for (var u = !1, o = t.return; o !== null; )
      o.childLanes |= n, a = o.alternate, a !== null && (a.childLanes |= n), o.tag === 22 && (t = o.stateNode, t === null || t._visibility & 1 || (u = !0)), t = o, o = o.return;
    return t.tag === 3 ? (o = t.stateNode, u && e !== null && (u = 31 - Ne(n), t = o.hiddenUpdates, a = t[u], a === null ? t[u] = [e] : a.push(e), e.lane = n | 536870912), o) : null;
  }
  function _o(t) {
    if (50 < fu)
      throw fu = 0, dc = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ya = {};
  function rS(t, e, n, a) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function De(t, e, n, a) {
    return new rS(t, e, n, a);
  }
  function Fr(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Kn(t, e) {
    var n = t.alternate;
    return n === null ? (n = De(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function Lh(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function wo(t, e, n, a, u, o) {
    var h = 0;
    if (a = t, typeof a == "function") Fr(a) && (h = 1);
    else if (typeof a == "string")
      h = Yx(
        t,
        n,
        Pt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case ot:
          return t = De(31, n, e, u), t.elementType = ot, t.lanes = o, t;
        case P:
          return Il(n.children, u, o, e);
        case it:
          h = 8, u |= 24;
          break;
        case at:
          return t = De(12, n, e, u | 2), t.elementType = at, t.lanes = o, t;
        case U:
          return t = De(13, n, e, u), t.elementType = U, t.lanes = o, t;
        case Z:
          return t = De(19, n, e, u), t.elementType = Z, t.lanes = o, t;
        case ct:
        case T:
          return t = u | 32, t = De(30, n, e, t), t.elementType = T, t.lanes = o, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case j:
                h = 10;
                break t;
              case C:
                h = 9;
                break t;
              case O:
                h = 11;
                break t;
              case J:
                h = 14;
                break t;
              case tt:
                h = 16, a = null;
                break t;
            }
          h = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = De(h, n, e, u), e.elementType = t, e.type = a, e.lanes = o, e;
  }
  function Il(t, e, n, a) {
    return t = De(7, t, a, e), t.lanes = n, t;
  }
  function Wr(t, e, n) {
    return t = De(6, t, null, e), t.lanes = n, t;
  }
  function qh(t) {
    var e = De(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Pr(t, e, n) {
    return e = De(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Xh = /* @__PURE__ */ new WeakMap();
  function Pe(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Xh.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Iu(e)
      }, Xh.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Iu(e)
    };
  }
  var Va = [], ja = 0, No = null, Gi = 0, tn = [], en = 0, sl = null, Tn = 1, zn = "";
  function $n(t, e) {
    Va[ja++] = Gi, Va[ja++] = No, No = t, Gi = e;
  }
  function Zh(t, e, n) {
    tn[en++] = Tn, tn[en++] = zn, tn[en++] = sl, sl = t;
    var a = Tn;
    t = zn;
    var u = 32 - Ne(a) - 1;
    a &= ~(1 << u), n += 1;
    var o = 32 - Ne(e) + u;
    if (30 < o) {
      var h = u - u % 5;
      o = (a & (1 << h) - 1).toString(32), a >>= h, u -= h, Tn = 1 << 32 - Ne(e) + u | n << u | a, zn = o + t;
    } else
      Tn = 1 << o | n << u | a, zn = t;
  }
  function To(t) {
    t.return !== null && ($n(t, 1), Zh(t, 1, 0));
  }
  function ts(t) {
    for (; t === No; )
      No = Va[--ja], Va[ja] = null, Gi = Va[--ja], Va[ja] = null;
    for (; t === sl; )
      sl = tn[--en], tn[en] = null, zn = tn[--en], tn[en] = null, Tn = tn[--en], tn[en] = null;
  }
  function Gh(t, e) {
    tn[en++] = Tn, tn[en++] = zn, tn[en++] = sl, Tn = e.id, zn = e.overflow, sl = t;
  }
  var se = null, Qt = null, zt = !1, fl = null, nn = !1, es = Error(r(519));
  function dl(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Qi(Pe(e, t)), es;
  }
  function Qh(t) {
    var e = t.stateNode, n = t.type, a = t.memoizedProps;
    switch (e[oe] = t, e[xe] = a, n) {
      case "dialog":
        At("cancel", e), At("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        At("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < hu.length; n++)
          At(hu[n], e);
        break;
      case "source":
        At("error", e);
        break;
      case "img":
      case "image":
      case "link":
        At("error", e), At("load", e);
        break;
      case "details":
        At("toggle", e);
        break;
      case "input":
        At("invalid", e), lh(
          e,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        At("invalid", e);
        break;
      case "textarea":
        At("invalid", e), ih(e, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || a.suppressHydrationWarning === !0 || dm(e.textContent, n) ? (a.popover != null && (At("beforetoggle", e), At("toggle", e)), a.onScroll != null && At("scroll", e), a.onScrollEnd != null && At("scrollend", e), a.onClick != null && (e.onclick = Nn), e = !0) : e = !1, e || dl(t, !0);
  }
  function zo(t) {
    for (se = t.return; se; )
      switch (se.tag) {
        case 5:
        case 31:
        case 13:
          nn = !1;
          return;
        case 27:
        case 3:
          nn = !0;
          return;
        default:
          se = se.return;
      }
  }
  function La(t) {
    if (t !== se) return !1;
    if (!zt) return zo(t), zt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || Df(t.type, t.memoizedProps)), n = !n), n && Qt && dl(t), zo(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Qt = Om(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Qt = Om(t);
    } else
      e === 27 ? (e = Qt, Cl(t.type) ? (t = qf, qf = null, Qt = t) : Qt = e) : Qt = se ? an(t.stateNode.nextSibling) : null;
    return !0;
  }
  function kl() {
    Qt = se = null, zt = !1;
  }
  function ns() {
    var t = fl;
    return t !== null && (Ue === null ? Ue = t : Ue.push.apply(
      Ue,
      t
    ), fl = null), t;
  }
  function Qi(t) {
    fl === null ? fl = [t] : fl.push(t);
  }
  var ls = Tt(null), Fl = null, Jn = null;
  function hl(t, e, n) {
    Ot(ls, e._currentValue), e._currentValue = n;
  }
  function In(t) {
    t._currentValue = ls.current, Ht(ls);
  }
  function Co(t, e, n) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function as(t, e, n, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var o = u.dependencies;
      if (o !== null) {
        var h = u.child;
        o = o.firstContext;
        t: for (; o !== null; ) {
          var x = o;
          o = u;
          for (var M = 0; M < e.length; M++)
            if (x.context === e[M]) {
              o.lanes |= n, x = o.alternate, x !== null && (x.lanes |= n), Co(
                o.return,
                n,
                t
              ), a || (h = null);
              break t;
            }
          o = x.next;
        }
      } else if (u.tag === 18) {
        if (h = u.return, h === null) throw Error(r(341));
        h.lanes |= n, o = h.alternate, o !== null && (o.lanes |= n), Co(h, n, t), h = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= n, h = u.alternate, h !== null && (h.lanes |= n), Co(
          u.return,
          n,
          t
        ), h = u.child, h = h !== null ? h.sibling : null) : h = u.child;
      if (h !== null) h.return = u;
      else
        for (h = u; h !== null; ) {
          if (h === t) {
            h = null;
            break;
          }
          if (u = h.sibling, u !== null) {
            u.return = h.return, h = u;
            break;
          }
          h = h.return;
        }
      u = h;
    }
  }
  function Wl(t, e, n, a) {
    t = null;
    for (var u = e, o = !1; u !== null; ) {
      if (!o) {
        if ((u.flags & 524288) !== 0) o = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var h = u.alternate;
        if (h === null) throw Error(r(387));
        if (h = h.memoizedProps, h !== null) {
          var x = u.type;
          Le(u.pendingProps.value, h.value) || (t !== null ? t.push(x) : t = [x]);
        }
      } else if (u === En.current) {
        if (h = u.alternate, h === null) throw Error(r(387));
        h.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(fi) : t = [fi]);
      }
      u = u.return;
    }
    return t !== null && as(
      e,
      t,
      n,
      a
    ), e.flags |= 262144, t !== null;
  }
  function Mo(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Le(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Pl(t) {
    Fl = t, Jn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function he(t) {
    return Kh(Fl, t);
  }
  function Ao(t, e) {
    return Fl === null && Pl(t), Kh(t, e);
  }
  function Kh(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Jn === null) {
      if (t === null) throw Error(r(308));
      Jn = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Jn = Jn.next = e;
    return n;
  }
  var sS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, fS = l.unstable_scheduleCallback, dS = l.unstable_NormalPriority, ne = {
    $$typeof: j,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function is() {
    return {
      controller: new sS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ki(t) {
    t.refCount--, t.refCount === 0 && fS(dS, function() {
      t.controller.abort();
    });
  }
  function $h(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var a = e[t];
        n.indexOf(a) === -1 && n.push(a);
      }
    }
  }
  var $i = null;
  function hS(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var Ji = null, us = 0, ta = 0, qa = null;
  function gS(t, e) {
    if (Ji === null) {
      var n = Ji = [];
      us = 0, ta = _f(), qa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return us++, e.then(Jh, Jh), e;
  }
  function Jh() {
    if (--us === 0 && ($i = null, Ji !== null)) {
      qa !== null && (qa.status = "fulfilled");
      var t = Ji;
      Ji = null, ta = 0, qa = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function mS(t, e) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        n.push(u);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var u = 0; u < n.length; u++) (0, n[u])(e);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < n.length; u++)
          (0, n[u])(void 0);
      }
    ), a;
  }
  var Ih = rt.S;
  rt.S = function(t, e) {
    if (qg = _e(), typeof e == "object" && e !== null && typeof e.then == "function" && gS(t, e), $i !== null)
      for (var n = ii; n !== null; )
        $h(n, $i), n = n.next;
    if (n = t.types, n !== null) {
      for (var a = ii; a !== null; )
        $h(a, n), a = a.next;
      if (ta !== 0) {
        a = $i, a === null && (a = $i = []);
        for (var u = 0; u < n.length; u++) {
          var o = n[u];
          a.indexOf(o) === -1 && a.push(o);
        }
      }
    }
    Ih !== null && Ih(t, e);
  };
  var ea = Tt(null);
  function os() {
    var t = ea.current;
    return t !== null ? t : Gt.pooledCache;
  }
  function Oo(t, e) {
    e === null ? Ot(ea, ea.current) : Ot(ea, e.pool);
  }
  function kh() {
    var t = os();
    return t === null ? null : { parent: ne._currentValue, pool: t };
  }
  var Xa = Error(r(460)), cs = Error(r(474)), Do = Error(r(542)), Ro = { then: function() {
  } };
  function Fh(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Wh(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(Nn, Nn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, t0(t), t === void 0 && !("reason" in e) ? Error(r(600)) : t;
      default:
        if (typeof e.status == "string") e.then(Nn, Nn);
        else {
          if (t = Gt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(a) {
              if (e.status === "pending") {
                var u = e;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var u = e;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, t0(t), t;
        }
        throw la = e, Xa;
    }
  }
  function na(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (la = n, Xa) : n;
    }
  }
  var la = null;
  function Ph() {
    if (la === null) throw Error(r(459));
    var t = la;
    return la = null, t;
  }
  function t0(t) {
    if (t === Xa || t === Do)
      throw Error(r(483));
  }
  var Za = null, Ii = 0;
  function Ho(t) {
    var e = Ii;
    return Ii += 1, Za === null && (Za = []), Wh(Za, t, e);
  }
  function gl(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Uo(t, e) {
    throw e.$$typeof === Q ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function e0(t) {
    function e(L, D) {
      if (t) {
        var K = L.deletions;
        K === null ? (L.deletions = [D], L.flags |= 16) : K.push(D);
      }
    }
    function n(L, D) {
      if (!t) return null;
      for (; D !== null; )
        e(L, D), D = D.sibling;
      return null;
    }
    function a(L) {
      for (var D = /* @__PURE__ */ new Map(); L !== null; )
        L.key === null ? D.set(L.index, L) : D.set(L.key, L), L = L.sibling;
      return D;
    }
    function u(L, D) {
      return L = Kn(L, D), L.index = 0, L.sibling = null, L;
    }
    function o(L, D, K) {
      return L.index = K, t ? (K = L.alternate, K !== null ? (K = K.index, K < D ? (L.flags |= 2, D) : K) : (L.flags |= 134217730, D)) : (L.flags |= 1048576, D);
    }
    function h(L) {
      return t && L.alternate === null && (L.flags |= 134217730), L;
    }
    function x(L, D, K, et) {
      return D === null || D.tag !== 6 ? (D = Wr(K, L.mode, et), D.return = L, D) : (D = u(D, K), D.return = L, D);
    }
    function M(L, D, K, et) {
      var mt = K.type;
      return mt === P ? (L = I(
        L,
        D,
        K.props.children,
        et,
        K.key
      ), gl(L, K), L) : D !== null && (D.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === tt && na(mt) === D.type) ? (D = u(D, K.props), gl(D, K), D.return = L, D) : (D = wo(
        K.type,
        K.key,
        K.props,
        null,
        L.mode,
        et
      ), gl(D, K), D.return = L, D);
    }
    function X(L, D, K, et) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== K.containerInfo || D.stateNode.implementation !== K.implementation ? (D = Pr(K, L.mode, et), D.return = L, D) : (D = u(D, K.children || []), D.return = L, D);
    }
    function I(L, D, K, et, mt) {
      return D === null || D.tag !== 7 ? (D = Il(
        K,
        L.mode,
        et,
        mt
      ), D.return = L, D) : (D = u(D, K), D.return = L, D);
    }
    function nt(L, D, K) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return D = Wr(
          "" + D,
          L.mode,
          K
        ), D.return = L, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Y:
            return K = wo(
              D.type,
              D.key,
              D.props,
              null,
              L.mode,
              K
            ), gl(K, D), K.return = L, K;
          case lt:
            return D = Pr(
              D,
              L.mode,
              K
            ), D.return = L, D;
          case tt:
            return D = na(D), nt(L, D, K);
        }
        if (gt(D) || ut(D))
          return D = Il(
            D,
            L.mode,
            K,
            null
          ), D.return = L, D;
        if (typeof D.then == "function")
          return nt(L, Ho(D), K);
        if (D.$$typeof === j)
          return nt(
            L,
            Ao(L, D),
            K
          );
        Uo(L, D);
      }
      return null;
    }
    function V(L, D, K, et) {
      var mt = D !== null ? D.key : null;
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return mt !== null ? null : x(L, D, "" + K, et);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case Y:
            return K.key === mt ? M(L, D, K, et) : null;
          case lt:
            return K.key === mt ? X(L, D, K, et) : null;
          case tt:
            return K = na(K), V(L, D, K, et);
        }
        if (gt(K) || ut(K))
          return mt !== null ? null : I(L, D, K, et, null);
        if (typeof K.then == "function")
          return V(
            L,
            D,
            Ho(K),
            et
          );
        if (K.$$typeof === j)
          return V(
            L,
            D,
            Ao(L, K),
            et
          );
        Uo(L, K);
      }
      return null;
    }
    function $(L, D, K, et, mt) {
      if (typeof et == "string" && et !== "" || typeof et == "number" || typeof et == "bigint")
        return L = L.get(K) || null, x(D, L, "" + et, mt);
      if (typeof et == "object" && et !== null) {
        switch (et.$$typeof) {
          case Y:
            return L = L.get(
              et.key === null ? K : et.key
            ) || null, M(D, L, et, mt);
          case lt:
            return L = L.get(
              et.key === null ? K : et.key
            ) || null, X(D, L, et, mt);
          case tt:
            return et = na(et), $(
              L,
              D,
              K,
              et,
              mt
            );
        }
        if (gt(et) || ut(et))
          return L = L.get(K) || null, I(D, L, et, mt, null);
        if (typeof et.then == "function")
          return $(
            L,
            D,
            K,
            Ho(et),
            mt
          );
        if (et.$$typeof === j)
          return $(
            L,
            D,
            K,
            Ao(D, et),
            mt
          );
        Uo(D, et);
      }
      return null;
    }
    function ht(L, D, K, et) {
      for (var mt = null, Rt = null, St = D, bt = D = 0, ie = null; St !== null && bt < K.length; bt++) {
        St.index > bt ? (ie = St, St = null) : ie = St.sibling;
        var Ut = V(
          L,
          St,
          K[bt],
          et
        );
        if (Ut === null) {
          St === null && (St = ie);
          break;
        }
        t && St && Ut.alternate === null && e(L, St), D = o(Ut, D, bt), Rt === null ? mt = Ut : Rt.sibling = Ut, Rt = Ut, St = ie;
      }
      if (bt === K.length)
        return n(L, St), zt && $n(L, bt), mt;
      if (St === null) {
        for (; bt < K.length; bt++)
          St = nt(L, K[bt], et), St !== null && (D = o(
            St,
            D,
            bt
          ), Rt === null ? mt = St : Rt.sibling = St, Rt = St);
        return zt && $n(L, bt), mt;
      }
      for (St = a(St); bt < K.length; bt++)
        ie = $(
          St,
          L,
          bt,
          K[bt],
          et
        ), ie !== null && (t && (Ut = ie.alternate, Ut !== null && St.delete(Ut.key === null ? bt : Ut.key)), D = o(
          ie,
          D,
          bt
        ), Rt === null ? mt = ie : Rt.sibling = ie, Rt = ie);
      return t && St.forEach(function(Rl) {
        return e(L, Rl);
      }), zt && $n(L, bt), mt;
    }
    function yt(L, D, K, et) {
      if (K == null) throw Error(r(151));
      for (var mt = null, Rt = null, St = D, bt = D = 0, ie = null, Ut = K.next(); St !== null && !Ut.done; bt++, Ut = K.next()) {
        St.index > bt ? (ie = St, St = null) : ie = St.sibling;
        var Rl = V(L, St, Ut.value, et);
        if (Rl === null) {
          St === null && (St = ie);
          break;
        }
        t && St && Rl.alternate === null && e(L, St), D = o(Rl, D, bt), Rt === null ? mt = Rl : Rt.sibling = Rl, Rt = Rl, St = ie;
      }
      if (Ut.done)
        return n(L, St), zt && $n(L, bt), mt;
      if (St === null) {
        for (; !Ut.done; bt++, Ut = K.next())
          Ut = nt(L, Ut.value, et), Ut !== null && (D = o(Ut, D, bt), Rt === null ? mt = Ut : Rt.sibling = Ut, Rt = Ut);
        return zt && $n(L, bt), mt;
      }
      for (St = a(St); !Ut.done; bt++, Ut = K.next())
        Ut = $(St, L, bt, Ut.value, et), Ut !== null && (t && (ie = Ut.alternate, ie !== null && St.delete(
          ie.key === null ? bt : ie.key
        )), D = o(Ut, D, bt), Rt === null ? mt = Ut : Rt.sibling = Ut, Rt = Ut);
      return t && St.forEach(function(Ix) {
        return e(L, Ix);
      }), zt && $n(L, bt), mt;
    }
    function Nt(L, D, K, et) {
      if (typeof K == "object" && K !== null && K.type === P && K.key === null && K.props.ref === void 0 && (K = K.props.children), typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case Y:
            t: {
              for (var mt = K.key; D !== null; ) {
                if (D.key === mt) {
                  if (mt = K.type, mt === P) {
                    if (D.tag === 7) {
                      n(
                        L,
                        D.sibling
                      ), et = u(
                        D,
                        K.props.children
                      ), gl(et, K), et.return = L, L = et;
                      break t;
                    }
                  } else if (D.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === tt && na(mt) === D.type) {
                    n(
                      L,
                      D.sibling
                    ), et = u(D, K.props), gl(et, K), et.return = L, L = et;
                    break t;
                  }
                  n(L, D);
                  break;
                } else e(L, D);
                D = D.sibling;
              }
              K.type === P ? (et = Il(
                K.props.children,
                L.mode,
                et,
                K.key
              ), gl(et, K), et.return = L, L = et) : (et = wo(
                K.type,
                K.key,
                K.props,
                null,
                L.mode,
                et
              ), gl(et, K), et.return = L, L = et);
            }
            return h(L);
          case lt:
            t: {
              for (mt = K.key; D !== null; ) {
                if (D.key === mt)
                  if (D.tag === 4 && D.stateNode.containerInfo === K.containerInfo && D.stateNode.implementation === K.implementation) {
                    n(
                      L,
                      D.sibling
                    ), et = u(D, K.children || []), et.return = L, L = et;
                    break t;
                  } else {
                    n(L, D);
                    break;
                  }
                else e(L, D);
                D = D.sibling;
              }
              et = Pr(K, L.mode, et), et.return = L, L = et;
            }
            return h(L);
          case tt:
            return K = na(K), Nt(
              L,
              D,
              K,
              et
            );
        }
        if (gt(K))
          return ht(
            L,
            D,
            K,
            et
          );
        if (ut(K)) {
          if (mt = ut(K), typeof mt != "function") throw Error(r(150));
          return K = mt.call(K), yt(
            L,
            D,
            K,
            et
          );
        }
        if (typeof K.then == "function")
          return Nt(
            L,
            D,
            Ho(K),
            et
          );
        if (K.$$typeof === j)
          return Nt(
            L,
            D,
            Ao(L, K),
            et
          );
        Uo(L, K);
      }
      return typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint" ? (K = "" + K, D !== null && D.tag === 6 ? (n(L, D.sibling), et = u(D, K), et.return = L, L = et) : (n(L, D), et = Wr(K, L.mode, et), et.return = L, L = et), h(L)) : n(L, D);
    }
    return function(L, D, K, et) {
      try {
        Ii = 0;
        var mt = Nt(
          L,
          D,
          K,
          et
        );
        return Za = null, mt;
      } catch (St) {
        if (St === Xa || St === Do) throw St;
        var Rt = De(29, St, null, L.mode);
        return Rt.lanes = et, Rt.return = L, Rt;
      } finally {
      }
    };
  }
  var aa = e0(!0), n0 = e0(!1), ml = !1;
  function rs(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ss(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function yl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function vl(t, e, n) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Vt & 2) !== 0) {
      var u = a.pending;
      return u === null ? e.next = e : (e.next = u.next, u.next = e), a.pending = e, e = _o(t), jh(t, null, n), e;
    }
    return Eo(t, a, e, n), _o(t);
  }
  function ki(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, n |= a, e.lanes = n, eo(t, n);
    }
  }
  function fs(t, e) {
    var n = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var u = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var h = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          o === null ? u = o = h : o = o.next = h, n = n.next;
        } while (n !== null);
        o === null ? u = o = e : o = o.next = e;
      } else u = o = e;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: o,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var ds = !1;
  function Fi() {
    if (ds) {
      var t = qa;
      if (t !== null) throw t;
    }
  }
  function Wi(t, e, n, a) {
    ds = !1;
    var u = t.updateQueue;
    ml = !1;
    var o = u.firstBaseUpdate, h = u.lastBaseUpdate, x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var M = x, X = M.next;
      M.next = null, h === null ? o = X : h.next = X, h = M;
      var I = t.alternate;
      I !== null && (I = I.updateQueue, x = I.lastBaseUpdate, x !== h && (x === null ? I.firstBaseUpdate = X : x.next = X, I.lastBaseUpdate = M));
    }
    if (o !== null) {
      var nt = u.baseState;
      h = 0, I = X = M = null, x = o;
      do {
        var V = x.lane & -536870913, $ = V !== x.lane;
        if ($ ? (Dt & V) === V : (a & V) === V) {
          V !== 0 && V === ta && (ds = !0), I !== null && (I = I.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          t: {
            var ht = t, yt = x;
            V = e;
            var Nt = n;
            switch (yt.tag) {
              case 1:
                if (ht = yt.payload, typeof ht == "function") {
                  nt = ht.call(Nt, nt, V);
                  break t;
                }
                nt = ht;
                break t;
              case 3:
                ht.flags = ht.flags & -65537 | 128;
              case 0:
                if (ht = yt.payload, V = typeof ht == "function" ? ht.call(Nt, nt, V) : ht, V == null) break t;
                nt = H({}, nt, V);
                break t;
              case 2:
                ml = !0;
            }
          }
          V = x.callback, V !== null && (t.flags |= 64, $ && (t.flags |= 8192), $ = u.callbacks, $ === null ? u.callbacks = [V] : $.push(V));
        } else
          $ = {
            lane: V,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, I === null ? (X = I = $, M = nt) : I = I.next = $, h |= V;
        if (x = x.next, x === null) {
          if (x = u.shared.pending, x === null)
            break;
          $ = x, x = $.next, $.next = null, u.lastBaseUpdate = $, u.shared.pending = null;
        }
      } while (!0);
      I === null && (M = nt), u.baseState = M, u.firstBaseUpdate = X, u.lastBaseUpdate = I, o === null && (u.shared.lanes = 0), wl |= h, t.lanes = h, t.memoizedState = nt;
    }
  }
  function l0(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function a0(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        l0(n[t], e);
  }
  var pl = Tt(null), Bo = Tt(0);
  function i0(t, e) {
    t = tl, Ot(Bo, t), Ot(pl, e), tl = t | e.baseLanes;
  }
  function hs() {
    Ot(Bo, tl), Ot(pl, pl.current);
  }
  function gs() {
    tl = Bo.current, Ht(pl), Ht(Bo);
  }
  var ge = Tt(null), be = null;
  function Sl(t) {
    var e = t.alternate;
    Ot(me, me.current & 1), Ot(ge, t), be === null && (e === null || pl.current !== null || e.memoizedState !== null) && (be = t);
  }
  function ms(t) {
    Ot(me, me.current), Ot(ge, t), be === null && (be = t);
  }
  function u0(t) {
    t.tag === 22 ? (Ot(me, me.current), Ot(ge, t), be === null && (be = t)) : xl();
  }
  function xl() {
    Ot(me, me.current), Ot(ge, ge.current);
  }
  function qe(t) {
    Ht(ge), be === t && (be = null), Ht(me);
  }
  var me = Tt(0);
  function Pi(t, e) {
    Ot(ge, ge.current), Ot(me, e);
  }
  function ys(t) {
    Ht(me), Ht(ge), be === t && (be = null);
  }
  function Yo(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || jf(n) || Lf(n)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var kn = 0, wt = null, Zt = null, le = null, Vo = !1, Ga = !1, ia = !1, jo = 0, tu = 0, Qa = null, yS = 0;
  function Ft() {
    throw Error(r(321));
  }
  function vs(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!Le(t[n], e[n])) return !1;
    return !0;
  }
  function ps(t, e, n, a, u, o) {
    return kn = o, wt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, rt.H = t === null || t.memoizedState === null ? Z0 : G0, ia = !1, o = n(a, u), ia = !1, Ga && (o = c0(
      e,
      n,
      a,
      u
    )), o0(t), o;
  }
  function o0(t) {
    rt.H = Ko;
    var e = Zt !== null && Zt.next !== null;
    if (kn = 0, le = Zt = wt = null, Vo = !1, tu = 0, Qa = null, e) throw Error(r(300));
    t === null || ae || (t = t.dependencies, t !== null && Mo(t) && (ae = !0));
  }
  function c0(t, e, n, a) {
    wt = t;
    var u = 0;
    do {
      if (Ga && (Qa = null), tu = 0, Ga = !1, 25 <= u) throw Error(r(301));
      if (u += 1, le = Zt = null, t.updateQueue != null) {
        var o = t.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      rt.H = wS, o = e(n, a);
    } while (Ga);
    return o;
  }
  function vS() {
    var t = rt.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? eu(e) : e, t = t.useState()[0], (Zt !== null ? Zt.memoizedState : null) !== t && (wt.flags |= 1024), e;
  }
  function Ss() {
    var t = jo !== 0;
    return jo = 0, t;
  }
  function xs(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function bs(t) {
    if (Vo) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Vo = !1;
    }
    kn = 0, le = Zt = wt = null, Ga = !1, tu = jo = 0, Qa = null;
  }
  function ze() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return le === null ? wt.memoizedState = le = t : le = le.next = t, le;
  }
  function te() {
    if (Zt === null) {
      var t = wt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Zt.next;
    var e = le === null ? wt.memoizedState : le.next;
    if (e !== null)
      le = e, Zt = t;
    else {
      if (t === null)
        throw wt.alternate === null ? Error(r(467)) : Error(r(310));
      Zt = t, t = {
        memoizedState: Zt.memoizedState,
        baseState: Zt.baseState,
        baseQueue: Zt.baseQueue,
        queue: Zt.queue,
        next: null
      }, le === null ? wt.memoizedState = le = t : le = le.next = t;
    }
    return le;
  }
  function Lo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function eu(t) {
    var e = tu;
    return tu += 1, Qa === null && (Qa = []), t = Wh(Qa, t, e), e = wt, (le === null ? e.memoizedState : le.next) === null && (e = e.alternate, rt.H = e === null || e.memoizedState === null ? Z0 : G0), t;
  }
  function qo(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return eu(t);
      if (t.$$typeof === F) return;
      if (t.$$typeof === j) return he(t);
    }
    throw Error(r(438, String(t)));
  }
  function Es(t) {
    var e = null, n = wt.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var a = wt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Lo(), wt.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), a = 0; a < t; a++)
        n[a] = vt;
    return e.index++, n;
  }
  function Fn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Xo(t) {
    var e = te();
    return _s(e, Zt, t);
  }
  function _s(t, e, n) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var u = t.baseQueue, o = a.pending;
    if (o !== null) {
      if (u !== null) {
        var h = u.next;
        u.next = o.next, o.next = h;
      }
      e.baseQueue = u = o, a.pending = null;
    }
    if (o = t.baseState, u === null) t.memoizedState = o;
    else {
      e = u.next;
      var x = h = null, M = null, X = e, I = !1;
      do {
        var nt = X.lane & -536870913;
        if (nt !== X.lane ? (Dt & nt) === nt : (kn & nt) === nt) {
          var V = X.revertLane;
          if (V === 0)
            M !== null && (M = M.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }), nt === ta && (I = !0);
          else if ((kn & V) === V) {
            X = X.next, V === ta && (I = !0);
            continue;
          } else
            nt = {
              lane: 0,
              revertLane: X.revertLane,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }, M === null ? (x = M = nt, h = o) : M = M.next = nt, wt.lanes |= V, wl |= V;
          nt = X.action, ia && n(o, nt), o = X.hasEagerState ? X.eagerState : n(o, nt);
        } else
          V = {
            lane: nt,
            revertLane: X.revertLane,
            gesture: X.gesture,
            action: X.action,
            hasEagerState: X.hasEagerState,
            eagerState: X.eagerState,
            next: null
          }, M === null ? (x = M = V, h = o) : M = M.next = V, wt.lanes |= nt, wl |= nt;
        X = X.next;
      } while (X !== null && X !== e);
      if (M === null ? h = o : M.next = x, !Le(o, t.memoizedState) && (ae = !0, I && (n = qa, n !== null)))
        throw n;
      t.memoizedState = o, t.baseState = h, t.baseQueue = M, a.lastRenderedState = o;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function ws(t) {
    var e = te(), n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = t;
    var a = n.dispatch, u = n.pending, o = e.memoizedState;
    if (u !== null) {
      n.pending = null;
      var h = u = u.next;
      do
        o = t(o, h.action), h = h.next;
      while (h !== u);
      Le(o, e.memoizedState) || (ae = !0), e.memoizedState = o, e.baseQueue === null && (e.baseState = o), n.lastRenderedState = o;
    }
    return [o, a];
  }
  function r0(t, e, n) {
    var a = wt, u = te(), o = zt;
    if (o) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var h = !Le(
      (Zt || u).memoizedState,
      n
    );
    if (h && (u.memoizedState = n, ae = !0), u = u.queue, zs(d0.bind(null, a, u, t), [
      t
    ]), t = u.getSnapshot !== e || h || le !== null && (le.memoizedState.tag & 1) !== 0, Ka(
      t ? 9 : 8,
      { destroy: void 0 },
      f0.bind(null, a, u, n, e),
      null
    ), t) {
      if (a.flags |= 2048, Gt === null) throw Error(r(349));
      o || (kn & 127) !== 0 || s0(a, e, n);
    }
    return n;
  }
  function s0(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = wt.updateQueue, e === null ? (e = Lo(), wt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function f0(t, e, n, a) {
    e.value = n, e.getSnapshot = a, h0(e) && g0(t);
  }
  function d0(t, e, n) {
    return n(function() {
      h0(e) && g0(t);
    });
  }
  function h0(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !Le(t, n);
    } catch {
      return !0;
    }
  }
  function g0(t) {
    var e = Jl(t, 2);
    e !== null && Be(e, t, 2);
  }
  function Ns(t) {
    var e = ze();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), ia) {
        wn(!0);
        try {
          n();
        } finally {
          wn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Fn,
      lastRenderedState: t
    }, e;
  }
  function m0(t, e, n, a) {
    return t.baseState = n, _s(
      t,
      Zt,
      typeof a == "function" ? a : Fn
    );
  }
  function pS(t, e, n, a, u) {
    if (Qo(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var o = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(h) {
          o.listeners.push(h);
        }
      };
      rt.T !== null ? n(!0) : o.isTransition = !1, a(o), n = e.pending, n === null ? (o.next = e.pending = o, y0(e, o)) : (o.next = n.next, e.pending = n.next = o);
    }
  }
  function y0(t, e) {
    var n = e.action, a = e.payload, u = t.state;
    if (e.isTransition) {
      var o = rt.T, h = {};
      h.types = o !== null ? o.types : null, rt.T = h;
      try {
        var x = n(u, a), M = rt.S;
        M !== null && M(h, x), v0(t, e, x);
      } catch (X) {
        Ts(t, e, X);
      } finally {
        o !== null && h.types !== null && (o.types = h.types), rt.T = o;
      }
    } else
      try {
        o = n(u, a), v0(t, e, o);
      } catch (X) {
        Ts(t, e, X);
      }
  }
  function v0(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        p0(t, e, a);
      },
      function(a) {
        return Ts(t, e, a);
      }
    ) : p0(t, e, n);
  }
  function p0(t, e, n) {
    e.status = "fulfilled", e.value = n, S0(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, y0(t, n)));
  }
  function Ts(t, e, n) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = n, S0(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function S0(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function x0(t, e) {
    return e;
  }
  function b0(t, e) {
    if (zt) {
      var n = Gt.formState;
      if (n !== null) {
        t: {
          var a = wt;
          if (zt) {
            if (Qt) {
              e: {
                for (var u = Qt, o = nn; u.nodeType !== 8; ) {
                  if (!o) {
                    u = null;
                    break e;
                  }
                  if (u = an(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                o = u.data, u = o === "F!" || o === "F" ? u : null;
              }
              if (u) {
                Qt = an(
                  u.nextSibling
                ), a = u.data === "F!";
                break t;
              }
            }
            dl(a);
          }
          a = !1;
        }
        a && (e = n[0]);
      }
    }
    return n = ze(), n.memoizedState = n.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: x0,
      lastRenderedState: e
    }, n.queue = a, n = L0.bind(
      null,
      wt,
      a
    ), a.dispatch = n, a = Ns(!1), o = Ds.bind(
      null,
      wt,
      !1,
      a.queue
    ), a = ze(), u = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, n = pS.bind(
      null,
      wt,
      u,
      o,
      n
    ), u.dispatch = n, a.memoizedState = t, [e, n, !1];
  }
  function E0(t) {
    var e = te();
    return _0(e, Zt, t);
  }
  function _0(t, e, n) {
    if (e = _s(
      t,
      e,
      x0
    )[0], t = Xo(Fn)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = eu(e);
      } catch (h) {
        throw h === Xa ? Do : h;
      }
    else a = e;
    e = te();
    var u = e.queue, o = u.dispatch;
    return n !== e.memoizedState && (wt.flags |= 2048, Ka(
      9,
      { destroy: void 0 },
      SS.bind(null, u, n),
      null
    )), [a, o, t];
  }
  function SS(t, e) {
    t.action = e;
  }
  function w0(t) {
    var e = te(), n = Zt;
    if (n !== null)
      return _0(e, n, t);
    te(), e = e.memoizedState, n = te();
    var a = n.queue.dispatch;
    return n.memoizedState = t, [e, a, !1];
  }
  function Ka(t, e, n, a) {
    return t = { tag: t, create: n, deps: a, inst: e, next: null }, e = wt.updateQueue, e === null && (e = Lo(), wt.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (a = n.next, n.next = t, t.next = a, e.lastEffect = t), t;
  }
  function N0() {
    return te().memoizedState;
  }
  function Zo(t, e, n, a) {
    var u = ze();
    wt.flags |= t, u.memoizedState = Ka(
      1 | e,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function Go(t, e, n, a) {
    var u = te();
    a = a === void 0 ? null : a;
    var o = u.memoizedState.inst;
    Zt !== null && a !== null && vs(a, Zt.memoizedState.deps) ? u.memoizedState = Ka(e, o, n, a) : (wt.flags |= t, u.memoizedState = Ka(
      1 | e,
      o,
      n,
      a
    ));
  }
  function T0(t, e) {
    Zo(8390656, 8, t, e);
  }
  function zs(t, e) {
    Go(2048, 8, t, e);
  }
  function xS(t) {
    wt.flags |= 4;
    var e = wt.updateQueue;
    if (e === null)
      e = Lo(), wt.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function z0(t) {
    var e = te().memoizedState;
    return xS({ ref: e, nextImpl: t }), function() {
      if ((Vt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function C0(t, e) {
    return Go(4, 2, t, e);
  }
  function M0(t, e) {
    return Go(4, 4, t, e);
  }
  function A0(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function O0(t, e, n) {
    n = n != null ? n.concat([t]) : null, Go(4, 4, A0.bind(null, e, t), n);
  }
  function Cs() {
  }
  function D0(t, e) {
    var n = te();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    return e !== null && vs(e, a[1]) ? a[0] : (n.memoizedState = [t, e], t);
  }
  function R0(t, e) {
    var n = te();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    if (e !== null && vs(e, a[1]))
      return a[0];
    if (a = t(), ia) {
      wn(!0);
      try {
        t();
      } finally {
        wn(!1);
      }
    }
    return n.memoizedState = [a, e], a;
  }
  function Ms(t, e, n) {
    return n === void 0 || (kn & 1073741824) !== 0 && (Dt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = Zg(), wt.lanes |= t, wl |= t, n);
  }
  function H0(t, e, n, a) {
    return Le(n, e) ? n : pl.current !== null ? (t = Ms(t, n, a), Le(t, e) || (ae = !0), t) : (kn & 106) === 0 || (kn & 1073741824) !== 0 && (Dt & 261930) === 0 ? (ae = !0, t.memoizedState = n) : (t = Zg(), wt.lanes |= t, wl |= t, e);
  }
  function U0(t, e, n, a, u) {
    var o = st.p;
    st.p = o !== 0 && 8 > o ? o : 8;
    var h = rt.T, x = {};
    x.types = h !== null ? h.types : null, rt.T = x, Ds(t, !1, e, n);
    try {
      var M = u(), X = rt.S;
      if (X !== null && X(x, M), M !== null && typeof M == "object" && typeof M.then == "function") {
        var I = mS(
          M,
          a
        );
        nu(
          t,
          e,
          I,
          Qe(t)
        );
      } else
        nu(
          t,
          e,
          a,
          Qe(t)
        );
    } catch (nt) {
      nu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: nt },
        Qe()
      );
    } finally {
      st.p = o, h !== null && x.types !== null && (h.types = x.types), rt.T = h;
    }
  }
  function bS() {
  }
  function As(t, e, n, a) {
    if (t.tag !== 5) throw Error(r(476));
    var u = B0(t).queue;
    U0(
      t,
      u,
      e,
      pt,
      n === null ? bS : function() {
        return Y0(t), n(a);
      }
    );
  }
  function B0(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: pt,
      baseState: pt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fn,
        lastRenderedState: pt
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fn,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Y0(t) {
    var e = B0(t);
    e.next === null && (e = t.alternate.memoizedState), nu(
      t,
      e.next.queue,
      {},
      Qe()
    );
  }
  function Os() {
    return he(fi);
  }
  function V0() {
    return te().memoizedState;
  }
  function j0() {
    return te().memoizedState;
  }
  function ES(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Qe();
          t = yl(n);
          var a = vl(e, t, n);
          a !== null && (Be(a, e, n), ki(a, e, n)), e = { cache: is() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function _S(t, e, n) {
    var a = Qe();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qo(t) ? q0(e, n) : (n = kr(t, e, n, a), n !== null && (Be(n, t, a), X0(n, e, a)));
  }
  function L0(t, e, n) {
    var a = Qe();
    nu(t, e, n, a);
  }
  function nu(t, e, n, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Qo(t)) q0(e, u);
    else {
      var o = t.alternate;
      if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = e.lastRenderedReducer, o !== null))
        try {
          var h = e.lastRenderedState, x = o(h, n);
          if (u.hasEagerState = !0, u.eagerState = x, Le(x, h))
            return Eo(t, e, u, 0), Gt === null && bo(), !1;
        } catch {
        } finally {
        }
      if (n = kr(t, e, u, a), n !== null)
        return Be(n, t, a), X0(n, e, a), !0;
    }
    return !1;
  }
  function Ds(t, e, n, a) {
    if (a = {
      lane: 2,
      revertLane: _f(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qo(t)) {
      if (e) throw Error(r(479));
    } else
      e = kr(
        t,
        n,
        a,
        2
      ), e !== null && Be(e, t, 2);
  }
  function Qo(t) {
    var e = t.alternate;
    return t === wt || e !== null && e === wt;
  }
  function q0(t, e) {
    Ga = Vo = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function X0(t, e, n) {
    if ((n & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, n |= a, e.lanes = n, eo(t, n);
    }
  }
  var Ko = {
    readContext: he,
    use: qo,
    useCallback: Ft,
    useContext: Ft,
    useEffect: Ft,
    useImperativeHandle: Ft,
    useLayoutEffect: Ft,
    useInsertionEffect: Ft,
    useMemo: Ft,
    useReducer: Ft,
    useRef: Ft,
    useState: Ft,
    useDebugValue: Ft,
    useDeferredValue: Ft,
    useTransition: Ft,
    useSyncExternalStore: Ft,
    useId: Ft,
    useHostTransitionStatus: Ft,
    useFormState: Ft,
    useActionState: Ft,
    useOptimistic: Ft,
    useMemoCache: Ft,
    useCacheRefresh: Ft,
    useEffectEvent: Ft
  }, Z0 = {
    readContext: he,
    use: qo,
    useCallback: function(t, e) {
      return ze().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: he,
    useEffect: T0,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Zo(
        4194308,
        4,
        A0.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Zo(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Zo(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = ze();
      e = e === void 0 ? null : e;
      var a = t();
      if (ia) {
        wn(!0);
        try {
          t();
        } finally {
          wn(!1);
        }
      }
      return n.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, n) {
      var a = ze();
      if (n !== void 0) {
        var u = n(e);
        if (ia) {
          wn(!0);
          try {
            n(e);
          } finally {
            wn(!1);
          }
        }
      } else u = e;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = _S.bind(
        null,
        wt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = ze();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Ns(t);
      var e = t.queue, n = L0.bind(null, wt, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: Cs,
    useDeferredValue: function(t, e) {
      var n = ze();
      return Ms(n, t, e);
    },
    useTransition: function() {
      var t = Ns(!1);
      return t = U0.bind(
        null,
        wt,
        t.queue,
        !0,
        !1
      ), ze().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var a = wt, u = ze();
      if (zt) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = e(), Gt === null)
          throw Error(r(349));
        (Dt & 127) !== 0 || s0(a, e, n);
      }
      u.memoizedState = n;
      var o = { value: n, getSnapshot: e };
      return u.queue = o, T0(d0.bind(null, a, o, t), [
        t
      ]), a.flags |= 2048, Ka(
        9,
        { destroy: void 0 },
        f0.bind(
          null,
          a,
          o,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = ze(), e = Gt.identifierPrefix;
      if (zt) {
        var n = zn, a = Tn;
        n = (a & ~(1 << 32 - Ne(a) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = jo++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = yS++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Os,
    useFormState: b0,
    useActionState: b0,
    useOptimistic: function(t) {
      var e = ze();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Ds.bind(
        null,
        wt,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: Es,
    useCacheRefresh: function() {
      return ze().memoizedState = ES.bind(
        null,
        wt
      );
    },
    useEffectEvent: function(t) {
      var e = ze(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((Vt & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, G0 = {
    readContext: he,
    use: qo,
    useCallback: D0,
    useContext: he,
    useEffect: zs,
    useImperativeHandle: O0,
    useInsertionEffect: C0,
    useLayoutEffect: M0,
    useMemo: R0,
    useReducer: Xo,
    useRef: N0,
    useState: function() {
      return Xo(Fn);
    },
    useDebugValue: Cs,
    useDeferredValue: function(t, e) {
      var n = te();
      return H0(
        n,
        Zt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Xo(Fn)[0], e = te().memoizedState;
      return [
        typeof t == "boolean" ? t : eu(t),
        e
      ];
    },
    useSyncExternalStore: r0,
    useId: V0,
    useHostTransitionStatus: Os,
    useFormState: E0,
    useActionState: E0,
    useOptimistic: function(t, e) {
      var n = te();
      return m0(n, Zt, t, e);
    },
    useMemoCache: Es,
    useCacheRefresh: j0,
    useEffectEvent: z0
  }, wS = {
    readContext: he,
    use: qo,
    useCallback: D0,
    useContext: he,
    useEffect: zs,
    useImperativeHandle: O0,
    useInsertionEffect: C0,
    useLayoutEffect: M0,
    useMemo: R0,
    useReducer: ws,
    useRef: N0,
    useState: function() {
      return ws(Fn);
    },
    useDebugValue: Cs,
    useDeferredValue: function(t, e) {
      var n = te();
      return Zt === null ? Ms(n, t, e) : H0(
        n,
        Zt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ws(Fn)[0], e = te().memoizedState;
      return [
        typeof t == "boolean" ? t : eu(t),
        e
      ];
    },
    useSyncExternalStore: r0,
    useId: V0,
    useHostTransitionStatus: Os,
    useFormState: w0,
    useActionState: w0,
    useOptimistic: function(t, e) {
      var n = te();
      return Zt !== null ? m0(n, Zt, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: Es,
    useCacheRefresh: j0,
    useEffectEvent: z0
  };
  function Rs(t, e, n, a) {
    e = t.memoizedState, n = n(a, e), n = n == null ? e : H({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Hs = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var a = Qe(), u = yl(a);
      u.payload = e, n != null && (u.callback = n), e = vl(t, u, a), e !== null && (Be(e, t, a), ki(e, t, a));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var a = Qe(), u = yl(a);
      u.tag = 1, u.payload = e, n != null && (u.callback = n), e = vl(t, u, a), e !== null && (Be(e, t, a), ki(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = Qe(), a = yl(n);
      a.tag = 2, e != null && (a.callback = e), e = vl(t, a, n), e !== null && (Be(e, t, n), ki(e, t, n));
    }
  };
  function Q0(t, e, n, a, u, o, h) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, o, h) : e.prototype && e.prototype.isPureReactComponent ? !Xi(n, a) || !Xi(u, o) : !0;
  }
  function K0(t, e, n, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, a), e.state !== t && Hs.enqueueReplaceState(e, e.state, null);
  }
  function ua(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var a in e)
        a !== "ref" && (n[a] = e[a]);
    }
    if (t = t.defaultProps) {
      n === e && (n = H({}, n));
      for (var u in t)
        n[u] === void 0 && (n[u] = t[u]);
    }
    return n;
  }
  function $0(t) {
    xo(t);
  }
  function J0(t) {
    console.error(t);
  }
  function I0(t) {
    xo(t);
  }
  function $o(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function k0(t, e, n) {
    try {
      var a = t.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Us(t, e, n) {
    return n = yl(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      $o(t, e);
    }, n;
  }
  function F0(t) {
    return t = yl(t), t.tag = 3, t;
  }
  function W0(t, e, n, a) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var o = a.value;
      t.payload = function() {
        return u(o);
      }, t.callback = function() {
        k0(e, n, a);
      };
    }
    var h = n.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (t.callback = function() {
      k0(e, n, a), typeof u != "function" && (Nl === null ? Nl = /* @__PURE__ */ new Set([this]) : Nl.add(this));
      var x = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function NS(t, e, n, a, u) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = n.alternate, e !== null && Wl(
        e,
        n,
        u,
        !0
      ), n = ge.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return be === null ? gc() : n.alternate === null && Wt === 0 && (Wt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, a === Ro ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), xf(t, a, u)), !1;
          case 22:
            return n.flags |= 65536, a === Ro ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), xf(t, a, u)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return xf(t, a, u), gc(), !1;
    }
    if (zt)
      return e = ge.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = u, a !== es && (t = Error(r(422), { cause: a }), Qi(Pe(t, n)))) : (a !== es && (e = Error(r(423), {
        cause: a
      }), Qi(
        Pe(e, n)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = Pe(a, n), u = Us(
        t.stateNode,
        a,
        u
      ), fs(t, u), Wt !== 4 && (Wt = 2)), !1;
    var o = Error(r(520), { cause: a });
    if (o = Pe(o, n), su === null ? su = [o] : su.push(o), Wt !== 4 && (Wt = 2), e === null) return !0;
    a = Pe(a, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = u & -u, n.lanes |= t, t = Us(n.stateNode, a, t), fs(n, t), !1;
        case 1:
          if (e = n.type, o = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (Nl === null || !Nl.has(o))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = F0(u), W0(
              u,
              t,
              n,
              a
            ), fs(n, u), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Bs = Error(r(461)), ae = !1;
  function ce(t, e, n, a) {
    e.child = t === null ? n0(e, null, n, a) : aa(
      e,
      t.child,
      n,
      a
    );
  }
  function P0(t, e, n, a, u) {
    n = n.render;
    var o = e.ref;
    if ("ref" in a) {
      var h = {};
      for (var x in a)
        x !== "ref" && (h[x] = a[x]);
    } else h = a;
    return Pl(e), a = ps(
      t,
      e,
      n,
      h,
      o,
      u
    ), x = Ss(), t !== null && !ae ? (xs(t, e, u), Wn(t, e, u)) : (zt && x && To(e), e.flags |= 1, ce(t, e, a, u), e.child);
  }
  function tg(t, e, n, a, u) {
    if (t === null) {
      var o = n.type;
      return typeof o == "function" && !Fr(o) && o.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = o, eg(
        t,
        e,
        o,
        a,
        u
      )) : (t = wo(
        n.type,
        null,
        a,
        e,
        e.mode,
        u
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (o = t.child, !Gs(t, u)) {
      var h = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Xi, n(h, a) && t.ref === e.ref)
        return Wn(t, e, u);
    }
    return e.flags |= 1, t = Kn(o, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function eg(t, e, n, a, u) {
    if (t !== null) {
      var o = t.memoizedProps;
      if (Xi(o, a) && t.ref === e.ref)
        if (ae = !1, e.pendingProps = a = o, Gs(t, u))
          (t.flags & 131072) !== 0 && (ae = !0);
        else
          return e.lanes = t.lanes, Wn(t, e, u);
    }
    return Ys(
      t,
      e,
      n,
      a,
      u
    );
  }
  function ng(t, e, n, a) {
    var u = a.children, o = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (o = o !== null ? o.baseLanes | n : n, t !== null) {
          for (a = e.child = t.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~o;
        } else a = 0, e.child = null;
        return lg(
          t,
          e,
          o,
          n,
          a
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Oo(
          e,
          o !== null ? o.cachePool : null
        ), o !== null ? i0(e, o) : hs(), u0(e);
      else
        return a = e.lanes = 536870912, lg(
          t,
          e,
          o !== null ? o.baseLanes | n : n,
          n,
          a
        );
    } else
      o !== null ? (Oo(e, o.cachePool), i0(e, o), xl(), e.memoizedState = null) : (t !== null && Oo(e, null), hs(), xl());
    return ce(t, e, u, n), e.child;
  }
  function lu(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function lg(t, e, n, a, u) {
    var o = os();
    return o = o === null ? null : { parent: ne._currentValue, pool: o }, e.memoizedState = {
      baseLanes: n,
      cachePool: o
    }, t !== null && Oo(e, null), hs(), u0(e), t !== null && Wl(t, e, a, !0), e.childLanes = u, null;
  }
  function Jo(t, e) {
    return e = Io(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ag(t, e, n) {
    return aa(e, t.child, null, n), t = Jo(e, e.pendingProps), t.flags |= 2, qe(e), e.memoizedState = null, t;
  }
  function TS(t, e, n) {
    var a = e.pendingProps, u = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (zt) {
        if (a.mode === "hidden")
          return t = Jo(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, lu(null, t);
        if (ms(e), (t = Qt) ? (t = Am(
          t,
          nn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: sl !== null ? { id: Tn, overflow: zn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = qh(t), n.return = e, e.child = n, se = e, Qt = null)) : t = null, t === null) throw dl(e);
        return e.lanes = 536870912, null;
      }
      return Jo(e, a);
    }
    var o = t.memoizedState;
    if (o !== null) {
      var h = o.dehydrated;
      if (ms(e), u)
        if (e.flags & 256)
          e.flags &= -257, e = ag(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (ae || Wl(t, e, n, !1), u = (n & t.childLanes) !== 0, ae || u) {
        if (pl.current === null) {
          if (a = Gt, a !== null && (h = no(a, n), h !== 0 && h !== o.retryLane))
            throw o.retryLane = h, Jl(t, h), Be(a, t, h), Bs;
          gc();
        }
        e = ag(
          t,
          e,
          n
        );
      } else
        t = o.treeContext, Qt = an(h.nextSibling), se = e, zt = !0, fl = null, nn = !1, t !== null && Gh(e, t), e = Jo(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Kn(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function $a(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Ys(t, e, n, a, u) {
    return Pl(e), n = ps(
      t,
      e,
      n,
      a,
      void 0,
      u
    ), a = Ss(), t !== null && !ae ? (xs(t, e, u), Wn(t, e, u)) : (zt && a && To(e), e.flags |= 1, ce(t, e, n, u), e.child);
  }
  function ig(t, e, n, a, u, o) {
    return Pl(e), e.updateQueue = null, n = c0(
      e,
      a,
      n,
      u
    ), o0(t), a = Ss(), t !== null && !ae ? (xs(t, e, o), Wn(t, e, o)) : (zt && a && To(e), e.flags |= 1, ce(t, e, n, o), e.child);
  }
  function ug(t, e, n, a, u) {
    if (Pl(e), e.stateNode === null) {
      var o = Ya, h = n.contextType;
      typeof h == "object" && h !== null && (o = he(h)), o = new n(a, o), e.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = Hs, e.stateNode = o, o._reactInternals = e, o = e.stateNode, o.props = a, o.state = e.memoizedState, o.refs = {}, rs(e), h = n.contextType, o.context = typeof h == "object" && h !== null ? he(h) : Ya, o.state = e.memoizedState, h = n.getDerivedStateFromProps, typeof h == "function" && (Rs(
        e,
        n,
        h,
        a
      ), o.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (h = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), h !== o.state && Hs.enqueueReplaceState(o, o.state, null), Wi(e, a, o, u), Fi(), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      o = e.stateNode;
      var x = e.memoizedProps, M = ua(n, x);
      o.props = M;
      var X = o.context, I = n.contextType;
      h = Ya, typeof I == "object" && I !== null && (h = he(I));
      var nt = n.getDerivedStateFromProps;
      I = typeof nt == "function" || typeof o.getSnapshotBeforeUpdate == "function", x = e.pendingProps !== x, I || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (x || X !== h) && K0(
        e,
        o,
        a,
        h
      ), ml = !1;
      var V = e.memoizedState;
      o.state = V, Wi(e, a, o, u), Fi(), X = e.memoizedState, x || V !== X || ml ? (typeof nt == "function" && (Rs(
        e,
        n,
        nt,
        a
      ), X = e.memoizedState), (M = ml || Q0(
        e,
        n,
        M,
        a,
        V,
        X,
        h
      )) ? (I || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = X), o.props = a, o.state = X, o.context = h, a = M) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      o = e.stateNode, ss(t, e), h = e.memoizedProps, I = ua(n, h), o.props = I, nt = e.pendingProps, V = o.context, X = n.contextType, M = Ya, typeof X == "object" && X !== null && (M = he(X)), x = n.getDerivedStateFromProps, (X = typeof x == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (h !== nt || V !== M) && K0(
        e,
        o,
        a,
        M
      ), ml = !1, V = e.memoizedState, o.state = V, Wi(e, a, o, u), Fi();
      var $ = e.memoizedState;
      h !== nt || V !== $ || ml || t !== null && t.dependencies !== null && Mo(t.dependencies) ? (typeof x == "function" && (Rs(
        e,
        n,
        x,
        a
      ), $ = e.memoizedState), (I = ml || Q0(
        e,
        n,
        I,
        a,
        V,
        $,
        M
      ) || t !== null && t.dependencies !== null && Mo(t.dependencies)) ? (X || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(a, $, M), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
        a,
        $,
        M
      )), typeof o.componentDidUpdate == "function" && (e.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || h === t.memoizedProps && V === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && V === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = $), o.props = a, o.state = $, o.context = M, a = I) : (typeof o.componentDidUpdate != "function" || h === t.memoizedProps && V === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && V === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return o = a, $a(t, e), a = (e.flags & 128) !== 0, o || a ? (o = e.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : o.render(), e.flags |= 1, t !== null && a ? (e.child = aa(
      e,
      t.child,
      null,
      u
    ), e.child = aa(
      e,
      null,
      n,
      u
    )) : ce(t, e, n, u), e.memoizedState = o.state, t = e.child) : t = Wn(
      t,
      e,
      u
    ), t;
  }
  function og(t, e, n, a) {
    return kl(), e.flags |= 256, ce(t, e, n, a), e.child;
  }
  var Vs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function js(t) {
    return { baseLanes: t, cachePool: kh() };
  }
  function Ls(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= Ge), t;
  }
  function cg(t, e, n) {
    var a = e.pendingProps, u = !1, o = (e.flags & 128) !== 0, h;
    if ((h = o) || (h = t !== null && t.memoizedState === null ? !1 : (me.current & 2) !== 0), h && (u = !0, e.flags &= -129), h = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (zt) {
        if (u ? Sl(e) : xl(), (t = Qt) ? (t = Am(
          t,
          nn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: sl !== null ? { id: Tn, overflow: zn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = qh(t), n.return = e, e.child = n, se = e, Qt = null)) : t = null, t === null) throw dl(e);
        return Lf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return o = a.children, a = a.fallback, u ? (xl(), u = e.mode, o = Io(
        { mode: "hidden", children: o },
        u
      ), a = Il(
        a,
        u,
        n,
        null
      ), o.return = e, a.return = e, o.sibling = a, e.child = o, a = e.child, a.memoizedState = js(n), a.childLanes = Ls(
        t,
        h,
        n
      ), e.memoizedState = Vs, lu(null, a)) : (Sl(e), qs(e, o));
    }
    var x = t.memoizedState;
    if (x !== null) {
      var M = x.dehydrated;
      if (M !== null)
        return zS(
          t,
          e,
          o,
          h,
          a,
          M,
          x,
          n
        );
    }
    return u ? (xl(), u = a.fallback, o = e.mode, x = t.child, M = x.sibling, a = Kn(x, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = x.subtreeFlags & 1206910976, M !== null ? u = Kn(M, u) : (u = Il(
      u,
      o,
      n,
      null
    ), u.flags |= 2), u.return = e, a.return = e, a.sibling = u, e.child = a, lu(null, a), a = e.child, u = t.child.memoizedState, u === null ? u = js(n) : (o = u.cachePool, o !== null ? (x = ne._currentValue, o = o.parent !== x ? { parent: x, pool: x } : o) : o = kh(), u = {
      baseLanes: u.baseLanes | n,
      cachePool: o
    }), a.memoizedState = u, a.childLanes = Ls(
      t,
      h,
      n
    ), e.memoizedState = Vs, lu(t.child, a)) : (Sl(e), n = t.child, t = n.sibling, n = Kn(n, {
      mode: "visible",
      children: a.children
    }), n.return = e, n.sibling = null, t !== null && (h = e.deletions, h === null ? (e.deletions = [t], e.flags |= 16) : h.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function qs(t, e) {
    return e = Io(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Io(t, e) {
    return t = De(22, t, null, e), t.lanes = 0, t;
  }
  function ko(t, e, n) {
    return aa(e, t.child, null, n), t = qs(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function zS(t, e, n, a, u, o, h, x) {
    if (n)
      return e.flags & 256 ? (Sl(e), e.flags &= -257, ko(
        t,
        e,
        x
      )) : e.memoizedState !== null ? (xl(), e.child = t.child, e.flags |= 128, null) : (xl(), o = u.fallback, h = e.mode, u = Io(
        { mode: "visible", children: u.children },
        h
      ), o = Il(
        o,
        h,
        x,
        null
      ), o.flags |= 2, u.return = e, o.return = e, u.sibling = o, e.child = u, aa(e, t.child, null, x), u = e.child, u.memoizedState = js(x), u.childLanes = Ls(
        t,
        a,
        x
      ), e.memoizedState = Vs, lu(null, u));
    if (Sl(e), Lf(o)) {
      if (a = o.nextSibling && o.nextSibling.dataset, a) var M = a.dgst;
      return a = M, a !== "" && (u = Error(r(419)), u.stack = "", u.digest = a, Qi({ value: u, source: null, stack: null })), ko(
        t,
        e,
        x
      );
    }
    if (ae || Wl(t, e, x, !1), a = (x & t.childLanes) !== 0, ae || a) {
      if (pl.current !== null)
        return ko(
          t,
          e,
          x
        );
      if (a = Gt, a !== null && (u = no(
        a,
        x
      ), u !== 0 && u !== h.retryLane))
        throw h.retryLane = u, Jl(t, u), Be(a, t, u), Bs;
      return jf(o) || gc(), ko(
        t,
        e,
        x
      );
    }
    return jf(o) ? (e.flags |= 192, e.child = t.child, null) : (t = h.treeContext, Qt = an(o.nextSibling), se = e, zt = !0, fl = null, nn = !1, t !== null && Gh(e, t), e = qs(
      e,
      u.children
    ), e.flags |= 134221824, e);
  }
  function rg(t, e, n) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), Co(t.return, e, n);
  }
  function sg(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Yo(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function Fo(t, e, n, a, u, o) {
    var h = t.memoizedState;
    h === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: u,
      treeForkCount: o
    } : (h.isBackwards = e, h.rendering = null, h.renderingStartTime = 0, h.last = a, h.tail = n, h.tailMode = u, h.treeForkCount = o);
  }
  function Xs(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Zs(t, e, n) {
    var a = e.pendingProps, u = a.revealOrder, o = a.tail;
    a = a.children;
    var h = me.current;
    if (e.flags & 128)
      return Pi(e, h), null;
    var x = (h & 2) !== 0;
    if (x ? (h = h & 1 | 2, e.flags |= 128) : h &= 1, Pi(e, h), u === "backwards" && t !== null ? (Xs(t), ce(t, e, a, n), Xs(t)) : ce(t, e, a, n), a = zt ? Gi : 0, !x && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && rg(t, n, e);
        else if (t.tag === 19)
          rg(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "backwards":
        n = sg(e.child), n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null, Xs(e)), Fo(
          e,
          !0,
          u,
          null,
          o,
          a
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, u = e.child, e.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Yo(t) === null) {
            e.child = u;
            break;
          }
          t = u.sibling, u.sibling = n, n = u, u = t;
        }
        Fo(
          e,
          !0,
          n,
          null,
          o,
          a
        );
        break;
      case "together":
        Fo(
          e,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        n = sg(e.child), n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null), Fo(
          e,
          !1,
          u,
          n,
          o,
          a
        );
    }
    return e.child;
  }
  function fg(t, e, n) {
    var a = e.pendingProps;
    return hl(e, e.type, a.value), ce(t, e, a.children, n), e.child;
  }
  function Wn(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), wl |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Wl(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, n = Kn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Kn(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Gs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Mo(t)));
  }
  function CS(t, e, n) {
    switch (e.tag) {
      case 3:
        Ie(e, e.stateNode.containerInfo), hl(e, ne, t.memoizedState.cache), kl();
        break;
      case 27:
      case 5:
        Ee(e);
        break;
      case 4:
        Ie(e, e.stateNode.containerInfo);
        break;
      case 10:
        hl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, ms(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Sl(e), e.flags |= 128, null;
          a = Wl(
            t,
            e,
            n,
            !1
          );
          var u = e.child.childLanes;
          return a || (n & u) !== 0 ? cg(t, e, n) : (Sl(e), t = Wn(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        Sl(e);
        break;
      case 19:
        if (e.flags & 128)
          return Zs(
            t,
            e,
            n
          );
        if (u = (t.flags & 128) !== 0, a = (n & e.childLanes) !== 0, a || (Wl(
          t,
          e,
          n,
          !1
        ), a = (n & e.childLanes) !== 0), u) {
          if (a)
            return Zs(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (u = e.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Pi(e, me.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, ng(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        hl(e, ne, t.memoizedState.cache);
    }
    return Wn(t, e, n);
  }
  function dg(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        ae = !0;
      else {
        if (!Gs(t, n) && (e.flags & 128) === 0)
          return ae = !1, CS(
            t,
            e,
            n
          );
        ae = (t.flags & 131072) !== 0;
      }
    else
      ae = !1, zt && (e.flags & 1048576) !== 0 && Zh(e, Gi, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = na(e.elementType), e.type = t, typeof t == "function")
            Fr(t) ? (a = ua(t, a), e.tag = 1, e = ug(
              null,
              e,
              t,
              a,
              n
            )) : (e.tag = 0, e = Ys(
              null,
              e,
              t,
              a,
              n
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === O) {
                e.tag = 11, e = P0(
                  null,
                  e,
                  t,
                  a,
                  n
                );
                break t;
              } else if (u === J) {
                e.tag = 14, e = tg(
                  null,
                  e,
                  t,
                  a,
                  n
                );
                break t;
              } else if (u === j) {
                e.tag = 10, e.type = t, e = fg(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = dt(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return Ys(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return a = e.type, u = ua(
          a,
          e.pendingProps
        ), ug(
          t,
          e,
          a,
          u,
          n
        );
      case 3:
        t: {
          if (Ie(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = e.pendingProps;
          var o = e.memoizedState;
          u = o.element, ss(t, e), Wi(e, a, null, n);
          var h = e.memoizedState;
          if (a = h.cache, hl(e, ne, a), a !== o.cache && as(
            e,
            [ne],
            n,
            !0
          ), Fi(), a = h.element, o.isDehydrated)
            if (o = {
              element: a,
              isDehydrated: !1,
              cache: h.cache
            }, e.updateQueue.baseState = o, e.memoizedState = o, e.flags & 256) {
              e = og(
                t,
                e,
                a,
                n
              );
              break t;
            } else if (a !== u) {
              u = Pe(
                Error(r(424)),
                e
              ), Qi(u), e = og(
                t,
                e,
                a,
                n
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Qt = an(t.firstChild), se = e, zt = !0, fl = null, nn = !0, n = n0(
                e,
                null,
                a,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
            }
          else {
            if (kl(), a === u) {
              e = Wn(
                t,
                e,
                n
              );
              break t;
            }
            ce(t, e, a, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return $a(t, e), t === null ? (n = Ym(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : zt || (e.stateNode = ym(
          e.type,
          e.pendingProps,
          re.current,
          e
        )) : e.memoizedState = Ym(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ee(e), t === null && zt && (a = e.stateNode = Rm(
          e.type,
          e.pendingProps,
          re.current
        ), se = e, nn = !0, u = Qt, Cl(e.type) ? (qf = u, Qt = an(a.firstChild)) : Qt = u), ce(
          t,
          e,
          e.pendingProps.children,
          n
        ), $a(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && zt && ((u = a = Qt) && (a = Ex(
          a,
          e.type,
          e.pendingProps,
          nn
        ), a !== null ? (e.stateNode = a, se = e, Qt = an(a.firstChild), nn = !1, u = !0) : u = !1), u || dl(e)), Ee(e), u = e.type, o = e.pendingProps, h = t !== null ? t.memoizedProps : null, a = o.children, Df(u, o) ? a = null : h !== null && Df(u, h) && (e.flags |= 32), e.memoizedState !== null && (u = ps(
          t,
          e,
          vS,
          null,
          null,
          n
        ), fi._currentValue = u), $a(t, e), ce(t, e, a, n), e.child;
      case 6:
        return t === null && zt && ((t = n = Qt) && (n = _x(
          n,
          e.pendingProps,
          nn
        ), n !== null ? (e.stateNode = n, se = e, Qt = null, t = !0) : t = !1), t || dl(e)), null;
      case 13:
        return cg(t, e, n);
      case 4:
        return Ie(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = aa(
          e,
          null,
          a,
          n
        ) : ce(t, e, a, n), e.child;
      case 11:
        return P0(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return a = e.pendingProps, $a(t, e), ce(t, e, a, n), e.child;
      case 8:
        return ce(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return ce(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return fg(t, e, n);
      case 9:
        return u = e.type._context, a = e.pendingProps.children, Pl(e), u = he(u), a = a(u), e.flags |= 1, ce(t, e, a, n), e.child;
      case 14:
        return tg(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return eg(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Zs(t, e, n);
      case 31:
        return TS(t, e, n);
      case 22:
        return ng(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Pl(e), a = he(ne), t === null ? (u = os(), u === null && (u = Gt, o = is(), u.pooledCache = o, o.refCount++, o !== null && (u.pooledCacheLanes |= n), u = o), e.memoizedState = { parent: a, cache: u }, rs(e), hl(e, ne, u)) : ((t.lanes & n) !== 0 && (ss(t, e), Wi(e, null, null, n), Fi()), u = t.memoizedState, o = e.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, e.memoizedState = u, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u), hl(e, ne, a)) : (a = o.cache, hl(e, ne, a), a !== u.cache && as(
          e,
          [ne],
          n,
          !0
        ))), ce(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : zt && To(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : $a(t, e), ce(t, e, a.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Pn(t) {
    t.flags |= 4;
  }
  function Qs(t, e, n, a, u) {
    var o;
    if ((o = (t.mode & 32) !== 0) && (o = n === null ? qm(e, a) : qm(e, a) && (a.src !== n.src || a.srcSet !== n.srcSet)), o) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if ($g()) t.flags |= 8192;
        else
          throw la = Ro, cs;
    } else t.flags &= -16777217;
  }
  function hg(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Xm(e))
      if ($g()) t.flags |= 8192;
      else
        throw la = Ro, cs;
  }
  function Wo(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Ai() : 536870912, t.lanes |= e, Wa |= e);
  }
  function au(t, e) {
    if (!zt)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = t.tail, a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
          break;
        default:
          for (e = t.tail, n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
      }
  }
  function Kt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, a = 0;
    if (e)
      for (var u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, a |= u.subtreeFlags & 1206910976, a |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = n, e;
  }
  function MS(t, e, n) {
    var a = e.pendingProps;
    switch (ts(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Kt(e), null;
      case 1:
        return Kt(e), null;
      case 3:
        return n = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), In(ne), Ae(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (La(e) ? Pn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ns())), Kt(e), null;
      case 26:
        var u = e.type, o = e.memoizedState;
        return t === null ? (Pn(e), o !== null ? (Kt(e), hg(e, o)) : (Kt(e), Qs(
          e,
          u,
          null,
          a,
          n
        ))) : o ? o !== t.memoizedState ? (Pn(e), Kt(e), hg(e, o)) : (Kt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Pn(e), Kt(e), Qs(
          e,
          u,
          t,
          a,
          n
        )), null;
      case 27:
        if (Oe(e), n = re.current, u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Pn(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Kt(e), e.subtreeFlags &= -33554433, null;
          }
          t = Pt.current, La(e) ? Qh(e) : (t = Rm(u, a, n), e.stateNode = t, Pn(e));
        }
        return Kt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Oe(e), u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Pn(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Kt(e), e.subtreeFlags &= -33554433, null;
          }
          if (o = Pt.current, La(e))
            Qh(e);
          else {
            var h = mu(
              re.current
            );
            switch (o) {
              case 1:
                o = h.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                o = h.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    o = h.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    o = h.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    o = h.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(
                      o.firstChild
                    );
                    break;
                  case "select":
                    o = typeof a.is == "string" ? h.createElement("select", {
                      is: a.is
                    }) : h.createElement("select"), a.multiple ? o.multiple = !0 : a.size && (o.size = a.size);
                    break;
                  default:
                    o = typeof a.is == "string" ? h.createElement(u, { is: a.is }) : h.createElement(u);
                }
            }
            o[oe] = e, o[xe] = a;
            t: for (h = e.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6)
                o.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                h.child.return = h, h = h.child;
                continue;
              }
              if (h === e) break t;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === e)
                  break t;
                h = h.return;
              }
              h.sibling.return = h.return, h = h.sibling;
            }
            e.stateNode = o;
            t: switch (ve(o, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Pn(e);
          }
        }
        return Kt(e), e.subtreeFlags &= -33554433, Qs(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && Pn(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = re.current, La(e)) {
            if (t = e.stateNode, n = e.memoizedProps, a = null, u = se, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[oe] = e, t = !!(t.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || dm(t.nodeValue, n)), t || dl(e, !0);
          } else
            t = mu(t).createTextNode(
              a
            ), t[oe] = e, e.stateNode = t;
        }
        return Kt(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = La(e), n !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[oe] = e;
            } else
              kl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Kt(e), t = !1;
          } else
            n = ns(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (qe(e), e) : (qe(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Kt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = La(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (u = e.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[oe] = e;
            } else
              kl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Kt(e), u = !1;
          } else
            u = ns(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return e.flags & 256 ? (qe(e), e) : (qe(e), null);
        }
        return qe(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = a !== null, t = t !== null && t.memoizedState !== null, n && (a = e.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), o = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (o = a.memoizedState.cachePool.pool), o !== u && (a.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), Wo(e, e.updateQueue), Kt(e), null);
      case 4:
        return Ae(), t === null && zf(e.stateNode.containerInfo), e.flags |= 67108864, Kt(e), null;
      case 10:
        return In(e.type), Kt(e), null;
      case 19:
        if (ys(e), a = e.memoizedState, a === null) return Kt(e), null;
        if (u = (e.flags & 128) !== 0, o = a.rendering, o === null)
          if (u) au(a, !1);
          else {
            if (Wt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (o = Yo(t), o !== null) {
                  for (e.flags |= 128, au(a, !1), t = o.updateQueue, e.updateQueue = t, Wo(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    Lh(n, t), n = n.sibling;
                  return Pi(
                    e,
                    me.current & 1 | 2
                  ), zt && $n(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && _e() > sc && (e.flags |= 128, u = !0, au(a, !1), e.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Yo(o), t !== null) {
              if (e.flags |= 128, u = !0, t = t.updateQueue, e.updateQueue = t, Wo(e, t), au(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !o.alternate && !zt)
                return Kt(e), null;
            } else
              2 * _e() - a.renderingStartTime > sc && n !== 536870912 && (e.flags |= 128, u = !0, au(a, !1), e.lanes = 4194304);
          a.isBackwards ? (o.sibling = e.child, e.child = o) : (t = a.last, t !== null ? t.sibling = o : e.child = o, a.last = o);
        }
        if (a.tail !== null) {
          t = a.tail;
          t: {
            for (n = t; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break t;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = _e(), t.sibling = null, o = me.current, o = u ? o & 1 | 2 : o & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !n || zt ? Pi(e, o) : (n = o, Ot(ge, e), Ot(me, n), be === null && (be = e)), zt && $n(e, a.treeForkCount), t;
        }
        return Kt(e), null;
      case 22:
      case 23:
        return qe(e), gs(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Kt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Kt(e), n = e.updateQueue, n !== null && Wo(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== n && (e.flags |= 2048), t !== null && Ht(ea), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), In(ne), Kt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Kt(e), null;
    }
    throw Error(r(156, e.tag));
  }
  function AS(t, e) {
    switch (ts(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return In(ne), Ae(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Oe(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (qe(e), e.alternate === null)
            throw Error(r(340));
          kl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (qe(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          kl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return ys(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ae(), null;
      case 10:
        return In(e.type), null;
      case 22:
      case 23:
        return qe(e), gs(), t !== null && Ht(ea), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return In(ne), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function gg(t, e) {
    switch (ts(e), e.tag) {
      case 3:
        In(ne), Ae();
        break;
      case 26:
      case 27:
      case 5:
        Oe(e);
        break;
      case 4:
        Ae();
        break;
      case 31:
        e.memoizedState !== null && qe(e);
        break;
      case 13:
        qe(e);
        break;
      case 19:
        ys(e);
        break;
      case 10:
        In(e.type);
        break;
      case 22:
      case 23:
        qe(e), gs(), t !== null && Ht(ea);
        break;
      case 24:
        In(ne);
    }
  }
  function iu(t, e) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            a = void 0;
            var o = n.create, h = n.inst;
            a = o(), h.destroy = a;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (x) {
      qt(e, e.return, x);
    }
  }
  function bl(t, e, n) {
    try {
      var a = e.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var o = u.next;
        a = o;
        do {
          if ((a.tag & t) === t) {
            var h = a.inst, x = h.destroy;
            if (x !== void 0) {
              h.destroy = void 0, u = e;
              var M = n, X = x;
              try {
                X();
              } catch (I) {
                qt(
                  u,
                  M,
                  I
                );
              }
            }
          }
          a = a.next;
        } while (a !== o);
      }
    } catch (I) {
      qt(e, e.return, I);
    }
  }
  function mg(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        a0(e, n);
      } catch (a) {
        qt(t, t.return, a);
      }
    }
  }
  function yg(t, e, n) {
    n.props = ua(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      qt(t, e, a);
    }
  }
  function Cn(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            var u = t.stateNode, o = Gn(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== o) && (u.ref = _m(o)), a = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var h = new Ke(t);
              m(
                t.child,
                !1,
                xx,
                h,
                void 0,
                void 0
              ), t.stateNode = h;
            }
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(a) : n.current = a;
      }
    } catch (x) {
      qt(t, e, x);
    }
  }
  function ye(t, e) {
    var n = t.ref, a = t.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          qt(t, e, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          qt(t, e, u);
        }
      else n.current = null;
  }
  function Po(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        Mm(
          t.stateNode,
          e[n]
        );
  }
  function vg(t) {
    for (var e = t.return; e !== null && ($s(e) && Mm(t.stateNode, e.stateNode), !Ks(e)); )
      e = e.return;
  }
  function uu(t) {
    for (var e = t.return; e !== null && ($s(e) && bx(t.stateNode, e.stateNode), !Ks(e)); )
      e = e.return;
  }
  function Ks(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function $s(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Js(t) {
    var e = t.type, n = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break t;
        case "img":
          n.src ? a.src = n.src : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (u) {
      qt(t, t.return, u);
    }
  }
  function Is(t, e, n) {
    try {
      var a = t.stateNode;
      nx(a, t.type, n, e), a[xe] = e;
    } catch (u) {
      qt(t, t.return, u);
    }
  }
  function pg(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Cl(t.type) || t.tag === 4;
  }
  function ks(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || pg(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Cl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Fs(t, e, n, a) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(u, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(u), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Nn)), Po(t, a), Yt = !0;
    else if (u !== 4 && (u === 27 && (Po(t, a), a = null, Cl(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (Fs(
        t,
        e,
        n,
        a
      ), t = t.sibling; t !== null; )
        Fs(
          t,
          e,
          n,
          a
        ), t = t.sibling;
  }
  function tc(t, e, n, a) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? n.insertBefore(u, e) : n.appendChild(u), Po(t, a), Yt = !0;
    else if (u !== 4 && (u === 27 && (Po(t, a), a = null, Cl(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (tc(
        t,
        e,
        n,
        a
      ), t = t.sibling; t !== null; )
        tc(
          t,
          e,
          n,
          a
        ), t = t.sibling;
  }
  function Sg(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var a = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      ve(e, a, n), e[oe] = t, e[xe] = n;
    } catch (o) {
      qt(t, t.return, o);
    }
  }
  var ec = !1, Xe = null;
  function xg(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (ec = !0);
  }
  var Mn = null;
  function bg() {
    var t = Mn;
    return Mn = null, t;
  }
  var Re = 0;
  function Ja(t, e, n, a, u) {
    return Re = 0, Eg(
      t.child,
      e,
      n,
      a,
      u
    );
  }
  function Eg(t, e, n, a, u) {
    for (var o = !1; t !== null; ) {
      if (t.tag === 5) {
        var h = t.stateNode;
        if (a !== null) {
          var x = Uf(h);
          a.push(x), x.view && (o = !0);
        } else
          o || Uf(h).view && (o = !0);
        ec = !0, bm(
          h,
          Re === 0 ? e : e + "_" + Re,
          n
        ), Re++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || Eg(
        t.child,
        e,
        n,
        a,
        u
      ) && (o = !0));
      t = t.sibling;
    }
    return o;
  }
  function An(t, e) {
    for (; t !== null; )
      t.tag === 5 ? Em(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || An(
        t.child,
        e
      )), t = t.sibling;
  }
  function nc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (nc(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(r(544));
          var n = e.name;
          e = Qn(e.default, e.share), e !== "none" && (Ja(
            t,
            n,
            e,
            null,
            !1
          ) || An(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Ws(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, a = t.memoizedProps, u = Gn(a, n), o = Qn(
        a.default,
        n.paired ? a.share : a.enter
      );
      o !== "none" ? Ja(t, u, o, null, !1) ? (nc(t), n.paired || e || ni(t, a.onEnter)) : An(t.child, !1) : nc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ws(t, e), t = t.sibling;
    else nc(t);
  }
  function Ps(t) {
    if (Xe !== null && Xe.size !== 0) {
      var e = Xe;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, a = n.name;
              if (a != null && a !== "auto") {
                var u = e.get(a);
                if (u !== void 0) {
                  var o = Qn(
                    n.default,
                    n.share
                  );
                  if (o !== "none" && (Ja(
                    t,
                    a,
                    o,
                    null,
                    !1
                  ) ? (o = t.stateNode, u.paired = o, o.paired = u, ni(t, n.onShare)) : An(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            Ps(t);
          }
          t = t.sibling;
        }
    }
  }
  function tf(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = Gn(e, t.stateNode), a = Xe !== null ? Xe.get(n) : void 0, u = Qn(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      u !== "none" && (Ja(t, n, u, null, !1) ? a !== void 0 ? (u = t.stateNode, a.paired = u, u.paired = a, Xe.delete(n), ni(t, e.onShare)) : ni(t, e.onExit) : An(t.child, !1)), Xe !== null && Ps(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        tf(t), t = t.sibling;
    else
      Xe !== null && Ps(t);
  }
  function _g(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = Gn(e, t.stateNode);
        e = Qn(e.default, e.update), t.flags &= -5, e !== "none" && Ja(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && _g(t);
      t = t.sibling;
    }
  }
  function ef(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, An(t.child, !1));
          }
          ef(t);
        }
        t = t.sibling;
      }
  }
  function lc(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, An(t.child, !1), ef(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        lc(t), t = t.sibling;
    else ef(t);
  }
  function wg(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? An(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && wg(t), t = t.sibling;
  }
  function nf(t, e, n, a, u, o, h) {
    for (var x = !1; e !== null; ) {
      if (e.tag === 5) {
        var M = e.stateNode;
        if (o !== null && Re < o.length) {
          var X = o[Re], I = Uf(M);
          (X.view || I.view) && (x = !0);
          var nt;
          if (nt = (t.flags & 4) === 0)
            if (I.clip) nt = !0;
            else {
              nt = X.rect;
              var V = I.rect;
              nt = nt.y !== V.y || nt.x !== V.x || nt.height !== V.height || nt.width !== V.width;
            }
          nt && (t.flags |= 4), I.abs ? I = !X.abs : (X = X.rect, I = I.rect, I = X.height !== I.height || X.width !== I.width), I && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && bm(
          M,
          Re === 0 ? n : n + "_" + Re,
          u
        ), x && (t.flags & 4) !== 0 || (Mn === null && (Mn = []), Mn.push(
          M,
          Re === 0 ? a : a + "_" + Re,
          e.memoizedProps
        )), Re++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && h ? t.flags |= e.flags & 32 : nf(
        t,
        e.child,
        n,
        a,
        u,
        o,
        h
      ) && (x = !0));
      e = e.sibling;
    }
    return x;
  }
  function Ng(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, a = t.stateNode, u = Gn(n, a), o = Qn(n.default, n.update), h;
        h = t.memoizedState, t.memoizedState = null, a = t;
        var x = t.child;
        Re = 0, u = nf(
          a,
          x,
          u,
          u,
          o,
          h,
          !1
        ), (t.flags & 4) !== 0 && u && ni(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Ng(t);
      t = t.sibling;
    }
  }
  var fe = !1, jt = !1, On = !1, lf = !1, Tg = typeof WeakSet == "function" ? WeakSet : Set, de = null, Dn = !1, ou = !1, ac = !1, af = !1;
  function OS(t, e, n) {
    if (t = t.containerInfo, Af = di, t = Ah(t), Gr(t)) {
      if ("selectionStart" in t)
        var a = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          a = (a = t.ownerDocument) && a.defaultView || window;
          var u = a.getSelection && a.getSelection();
          if (u && u.rangeCount !== 0) {
            a = u.anchorNode;
            var o = u.anchorOffset, h = u.focusNode;
            u = u.focusOffset;
            try {
              a.nodeType, h.nodeType;
            } catch {
              a = null;
              break t;
            }
            var x = 0, M = -1, X = -1, I = 0, nt = 0, V = t, $ = null;
            e: for (; ; ) {
              for (var ht; V !== a || o !== 0 && V.nodeType !== 3 || (M = x + o), V !== h || u !== 0 && V.nodeType !== 3 || (X = x + u), V.nodeType === 3 && (x += V.nodeValue.length), (ht = V.firstChild) !== null; )
                $ = V, V = ht;
              for (; ; ) {
                if (V === t) break e;
                if ($ === a && ++I === o && (M = x), $ === h && ++nt === u && (X = x), (ht = V.nextSibling) !== null) break;
                V = $, $ = V.parentNode;
              }
              V = ht;
            }
            a = M === -1 || X === -1 ? null : { start: M, end: X };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Of = { focusedElem: t, selectionRange: a }, di = !1, n = (n & 335544064) === n, de = e, e = n ? 9270 : 1024; de !== null; ) {
      if (t = de, n && (a = t.deletions, a !== null))
        for (o = 0; o < a.length; o++)
          n && tf(a[o]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && xg(t), ic(n);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && n && tf(a), ic(n);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            n && xg(t), ic(n);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, de = a) : (n && _g(t), ic(n));
      }
    }
    Xe = null;
  }
  function ic(t) {
    for (; de !== null; ) {
      var e = de, n = t, a = e.alternate, u = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && a !== null) {
            n = void 0, u = a.memoizedProps, a = a.memoizedState;
            var o = e.stateNode;
            try {
              var h = ua(
                e.type,
                u
              );
              n = o.getSnapshotBeforeUpdate(
                h,
                a
              ), o.__reactInternalSnapshotBeforeUpdate = n;
            } catch (x) {
              qt(e, e.return, x);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (a = e.stateNode.containerInfo, n = a.nodeType, n === 9)
              Vf(a);
            else if (n === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Vf(a);
                  break;
                default:
                  a.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n && a !== null && (n = Gn(
            a.memoizedProps,
            a.stateNode
          ), u = e.memoizedProps, u = Qn(u.default, u.update), u !== "none" && Ja(
            a,
            n,
            u,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(r(163));
      }
      if (a = e.sibling, a !== null) {
        a.return = e.return, de = a;
        break;
      }
      de = e.return;
    }
  }
  function zg(t, e, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Rn(t, n), a & 4 && iu(5, n);
        break;
      case 1:
        if (Rn(t, n), a & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (h) {
              qt(n, n.return, h);
            }
          else {
            var u = ua(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (h) {
              qt(
                n,
                n.return,
                h
              );
            }
          }
        a & 64 && mg(n), a & 512 && Cn(n, n.return);
        break;
      case 3:
        if (Rn(t, n), a & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            a0(t, e);
          } catch (h) {
            qt(n, n.return, h);
          }
        }
        break;
      case 27:
        e === null && a & 4 && Sg(n);
      case 26:
      case 5:
        Rn(t, n), e === null && a & 4 && Js(n), a & 512 && Cn(n, n.return);
        break;
      case 12:
        Rn(t, n);
        break;
      case 31:
        Rn(t, n), a & 4 && Og(t, n);
        break;
      case 13:
        Rn(t, n), a & 4 && Dg(t, n), a & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = ZS.bind(
          null,
          n
        ), wx(t, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || fe, !a) {
          var o = e !== null && e.memoizedState !== null || jt;
          e = fe, u = jt, fe = a, (jt = o) && !u ? (a = 2, (n.subtreeFlags & 8772) !== 0 && (a |= 1), dn(
            t,
            n,
            a
          )) : Rn(t, n), fe = e, jt = u;
        }
        break;
      case 30:
        Rn(t, n), a & 512 && Cn(n, n.return);
        break;
      case 7:
        a & 512 && Cn(n, n.return);
      default:
        Rn(t, n);
    }
  }
  function uf(t, e) {
    for (t = t.child; t !== null; )
      Cg(t, e), t = t.sibling;
  }
  function Cg(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var a = n.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var u = t.stateNode, o = t.memoizedProps.style, h = o != null && o.hasOwnProperty("display") ? o.display : null;
            u.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
          }
        } catch (M) {
          qt(t, t.return, M);
        }
        of(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Yt = !0;
        } catch (M) {
          qt(t, t.return, M);
        }
        break;
      case 18:
        try {
          var x = t.stateNode;
          e ? xm(x, !0) : xm(t.stateNode, !1);
        } catch (M) {
          qt(t, t.return, M);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && uf(t, e);
        break;
      default:
        uf(t, e);
    }
  }
  function of(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, a = e;
          switch (n.tag) {
            case 4:
              Cg(n, a);
              break t;
            case 22:
              n.memoizedState === null && of(n, a);
              break t;
            default:
              of(n, a);
          }
        }
        t = t.sibling;
      }
  }
  function Mg(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Mg(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Ca(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Jt = null, He = !1;
  function sn(t, e, n) {
    for (n = n.child; n !== null; )
      Ag(t, e, n), n = n.sibling;
  }
  function Ag(t, e, n) {
    if (we && typeof we.onCommitFiberUnmount == "function")
      try {
        we.onCommitFiberUnmount(ql, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        jt || ye(n, e), sn(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !jt && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        jt || ye(n, e), uu(n);
        var a = Jt, u = He;
        Cl(n.type) && (Jt = n.stateNode, He = !1), sn(
          t,
          e,
          n
        ), Hm(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Jt = a, He = u;
        break;
      case 5:
        jt || ye(n, e), uu(n);
      case 6:
        if (n.tag === 6 && uu(n), a = Jt, u = He, Jt = null, sn(
          t,
          e,
          n
        ), Jt = a, He = u, Jt !== null)
          if (He)
            try {
              (Jt.nodeType === 9 ? Jt.body : Jt.nodeName === "HTML" ? Jt.ownerDocument.body : Jt).removeChild(n.stateNode), Yt = !0;
            } catch (o) {
              qt(
                n,
                e,
                o
              );
            }
          else
            try {
              Jt.removeChild(n.stateNode), Yt = !0;
            } catch (o) {
              qt(
                n,
                e,
                o
              );
            }
        break;
      case 18:
        Jt !== null && (He ? (t = Jt, Sm(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), hi(t)) : Sm(Jt, n.stateNode));
        break;
      case 4:
        a = Jt, u = He, Jt = n.stateNode.containerInfo, He = !0, sn(
          t,
          e,
          n
        ), Jt = a, He = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        bl(2, n, e), jt || bl(4, n, e), sn(
          t,
          e,
          n
        );
        break;
      case 1:
        jt || (ye(n, e), a = n.stateNode, typeof a.componentWillUnmount == "function" && yg(
          n,
          e,
          a
        )), sn(
          t,
          e,
          n
        );
        break;
      case 21:
        sn(
          t,
          e,
          n
        );
        break;
      case 22:
        jt = (a = jt) || n.memoizedState !== null, sn(
          t,
          e,
          n
        ), jt = a;
        break;
      case 30:
        ye(n, e), sn(
          t,
          e,
          n
        );
        break;
      case 7:
        jt || ye(n, e), sn(
          t,
          e,
          n
        );
        break;
      default:
        sn(
          t,
          e,
          n
        );
    }
  }
  function Og(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        hi(t);
      } catch (n) {
        qt(e, e.return, n);
      }
    }
  }
  function Dg(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        hi(t);
      } catch (n) {
        qt(e, e.return, n);
      }
  }
  function DS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Tg()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Tg()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function uc(t, e) {
    var n = DS(t);
    e.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var u = GS.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function Ce(t, e, n) {
    var a = e.deletions;
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var o = a[u], h = t, x = e, M = x;
        t: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Cl(M.type)) {
                Jt = M.stateNode, He = !1;
                break t;
              }
              break;
            case 5:
              Jt = M.stateNode, He = !1;
              break t;
            case 3:
            case 4:
              Jt = M.stateNode.containerInfo, He = !0;
              break t;
          }
          M = M.return;
        }
        if (Jt === null) throw Error(r(160));
        Ag(h, x, o), Jt = null, He = !1, h = o.alternate, h !== null && (h.return = null), o.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Rg(e, t, n), e = e.sibling;
  }
  var fn = null;
  function Rg(t, e, n) {
    var a = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (a = t.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var o = 0; o < a.length; o++) {
            var h = a[o];
            h.ref.impl = h.nextImpl;
          }
        Ce(e, t, n), Me(t), u & 4 && (bl(3, t, t.return), iu(3, t), bl(5, t, t.return));
        break;
      case 1:
        Ce(e, t, n), Me(t), u & 512 && (jt || a === null || ye(a, a.return)), u & 64 && fe && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (o = fn, Ce(e, t, n), Me(t), u & 512 && (jt || a === null || ye(a, a.return)), u & 4)
          if (u = a !== null ? a.memoizedState : null, n = t.memoizedState, a === null)
            if (n === null)
              if (t.stateNode === null)
                if (fe)
                  t.stateNode = ym(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, n = t.memoizedProps, u = o.ownerDocument || o;
                    e: switch (e) {
                      case "title":
                        a = u.getElementsByTagName("title")[0], (!a || a[Gl] || a[oe] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = u.createElement(e), u.head.insertBefore(
                          a,
                          u.querySelector("head > title")
                        )), ve(a, e, n), a[oe] = t, ee(a), e = a;
                        break t;
                      case "link":
                        if (o = Lm(
                          "link",
                          "href",
                          u
                        ).get(e + (n.href || ""))) {
                          for (h = 0; h < o.length; h++)
                            if (a = o[h], a.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && a.getAttribute("rel") === (n.rel == null ? null : n.rel) && a.getAttribute("title") === (n.title == null ? null : n.title) && a.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              o.splice(h, 1);
                              break e;
                            }
                        }
                        a = u.createElement(e), ve(a, e, n), u.head.appendChild(a);
                        break;
                      case "meta":
                        if (o = Lm(
                          "meta",
                          "content",
                          u
                        ).get(e + (n.content || ""))) {
                          for (h = 0; h < o.length; h++)
                            if (a = o[h], a.getAttribute("content") === (n.content == null ? null : "" + n.content) && a.getAttribute("name") === (n.name == null ? null : n.name) && a.getAttribute("property") === (n.property == null ? null : n.property) && a.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              o.splice(h, 1);
                              break e;
                            }
                        }
                        a = u.createElement(e), ve(a, e, n), u.head.appendChild(a);
                        break;
                      default:
                        throw Error(r(468, e));
                    }
                    a[oe] = t, ee(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                fe || Qf(o, t.type, t.stateNode);
            else
              t.stateNode = jm(
                o,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? (e = a.stateNode, e === null || jt || e.parentNode.removeChild(e)) : u.count--, n === null ? fe || Qf(o, t.type, t.stateNode) : jm(o, n, t.memoizedProps)) : n === null && t.stateNode !== null && Is(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        Ce(e, t, n), Me(t), u & 512 && (jt || a === null || ye(a, a.return)), a !== null && u & 4 && Is(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (o = On, On = !1, Ce(e, t, n), On = o, Me(t), u & 512 && (jt || a === null || ye(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            Aa(e, ""), Yt = !0;
          } catch (I) {
            qt(t, t.return, I);
          }
        }
        u & 4 && t.stateNode != null && (e = t.memoizedProps, Is(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), u & 1024 && (lf = !0);
        break;
      case 6:
        if (Ce(e, t, n), Me(t), u & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, Yt = !0;
          } catch (I) {
            qt(t, t.return, I);
          }
        }
        break;
      case 3:
        if (Yt = !1, bc = null, o = fn, fn = yu(e.containerInfo), Ce(e, t, n), fn = o, Me(t), u & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            hi(e.containerInfo);
          } catch (I) {
            qt(t, t.return, I);
          }
        lf && (lf = !1, Hg(t)), Yt = !1;
        break;
      case 4:
        u = On, On = fe, a = th(), o = fn, fn = yu(
          t.stateNode.containerInfo
        ), Ce(e, t, n), Me(t), fn = o, Yt && ou && (ac = !0), Yt = a, On = u;
        break;
      case 12:
        Ce(e, t, n), Me(t);
        break;
      case 31:
        Ce(e, t, n), Me(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, uc(t, e)));
        break;
      case 13:
        Ce(e, t, n), Me(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (rc = _e()), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, uc(t, e)));
        break;
      case 22:
        o = t.memoizedState !== null, h = a !== null && a.memoizedState !== null;
        var x = fe, M = jt, X = On;
        fe = x || o, On = X || o, jt = M || h, Ce(e, t, n), jt = M, On = X, fe = x, Me(t), u & 8192 && (e = t.stateNode, e._visibility = o ? e._visibility & -2 : e._visibility | 1, !o || a === null || h || fe || jt || (e = h || jt, n = fe, a = jt, fe = o || fe, jt = e, El(t, 2), fe = n, jt = a), !o && On || uf(t, o)), u & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, uc(t, n))));
        break;
      case 19:
        Ce(e, t, n), Me(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, uc(t, e)));
        break;
      case 30:
        u & 512 && (jt || a === null || ye(a, a.return)), u = th(), o = ou, h = (n & 335544064) === n, x = t.memoizedProps, ou = h && Qn(
          x.default,
          x.update
        ) !== "none", Ce(e, t, n), Me(t), h && a !== null && Yt && (t.flags |= 4), ou = o, Yt = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (jt || a === null || ye(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        Ce(e, t, n), Me(t);
    }
  }
  function Me(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, a = t.return; a !== null; ) {
          if (pg(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var u = t.return; u !== null; ) {
          if ($s(u)) {
            var o = u.stateNode;
            a === null ? a = [o] : a.push(o);
          }
          if (Ks(u)) break;
          u = u.return;
        }
        var h = a;
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var x = n.stateNode, M = ks(t);
            tc(
              t,
              M,
              x,
              h
            );
            break;
          case 5:
            var X = n.stateNode;
            n.flags & 32 && (Aa(X, ""), n.flags &= -33);
            var I = ks(t);
            tc(
              t,
              I,
              X,
              h
            );
            break;
          case 3:
          case 4:
            var nt = n.stateNode.containerInfo, V = ks(t);
            Fs(
              t,
              V,
              nt,
              h
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch ($) {
        qt(t, t.return, $);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Hg(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Hg(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, di = !0, e.reset(), di = !1), t = t.sibling;
      }
  }
  function Ia(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        Ug(e, t), e = e.sibling;
    else Ng(e);
  }
  function Ug(t, e) {
    var n = t.alternate;
    if (n === null) Ws(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (af = Dn = !1, bg(), Ia(e, t), !Dn && !ac) {
            if (t = Mn, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                n = t[a];
                var u = t[a + 1];
                Em(n, t[a + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), af = !0;
          }
          Mn = null;
          break;
        case 5:
          Ia(e, t);
          break;
        case 4:
          a = Dn, Dn = !1, Ia(e, t), Dn && (ac = !0), Dn = a;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? Ws(t, !1) : Ia(e, t));
          break;
        case 30:
          a = Dn, u = bg(), Dn = !1, Ia(e, t), Dn && (t.flags |= 4);
          var o = t.memoizedProps, h = t.stateNode;
          e = Gn(o, h), h = Gn(n.memoizedProps, h);
          var x = Qn(o.default, o.update);
          x === "none" ? e = !1 : (o = n.memoizedState, n.memoizedState = null, n = t.child, Re = 0, e = nf(
            t,
            n,
            e,
            h,
            x,
            o,
            !0
          ), Re !== (o === null ? 0 : o.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (ni(
            t,
            t.memoizedProps.onUpdate
          ), Mn = u) : u !== null && (u.push.apply(u, Mn), Mn = u), Dn = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Ia(e, t);
      }
  }
  function Rn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        zg(t, e.alternate, e), e = e.sibling;
  }
  function El(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, a = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          bl(4, n, n.return), El(
            n,
            a
          );
          break;
        case 1:
          ye(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && yg(
            n,
            n.return,
            u
          ), El(
            n,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Hm(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          ye(n, n.return), n.tag !== 5 && n.tag !== 27 || uu(n), El(
            n,
            a
          );
          break;
        case 6:
          uu(n);
          break;
        case 26:
          ye(n, n.return), u = n.stateNode, n.memoizedState !== null || u === null || jt || u.parentNode.removeChild(u), El(
            n,
            a
          );
          break;
        case 22:
          n.memoizedState === null && El(
            n,
            a
          );
          break;
        case 30:
          ye(n, n.return), El(
            n,
            a
          );
          break;
        case 7:
          ye(n, n.return);
        default:
          El(
            n,
            a
          );
      }
      t = t.sibling;
    }
  }
  function dn(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var a = e.alternate, u = t, o = e, h = o.flags, x = (n & 1) !== 0;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          dn(
            u,
            o,
            n
          ), iu(4, o);
          break;
        case 1:
          if (dn(
            u,
            o,
            n
          ), a = o, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (I) {
              qt(a, a.return, I);
            }
          if (a = o, u = a.updateQueue, u !== null) {
            var M = a.stateNode;
            try {
              var X = u.shared.hiddenCallbacks;
              if (X !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < X.length; u++)
                  l0(X[u], M);
            } catch (I) {
              qt(a, a.return, I);
            }
          }
          x && h & 64 && mg(o), Cn(o, o.return);
          break;
        case 27:
          (n & 2) !== 0 && Sg(o);
        case 5:
          o.tag !== 5 && o.tag !== 27 || vg(o), dn(
            u,
            o,
            n
          ), x && a === null && h & 4 && Js(o), Cn(o, o.return);
          break;
        case 6:
          vg(o);
          break;
        case 26:
          M = o.stateNode, o.memoizedState !== null || M === null || fe || Qf(
            yu(M.ownerDocument),
            o.type,
            M
          ), dn(
            u,
            o,
            n
          ), x && a === null && h & 4 && Js(o), Cn(o, o.return);
          break;
        case 12:
          dn(
            u,
            o,
            n
          );
          break;
        case 31:
          dn(
            u,
            o,
            n
          ), x && h & 4 && Og(u, o);
          break;
        case 13:
          dn(
            u,
            o,
            n
          ), x && h & 4 && Dg(u, o);
          break;
        case 22:
          o.memoizedState === null && dn(
            u,
            o,
            n
          ), Cn(o, o.return);
          break;
        case 30:
          dn(
            u,
            o,
            n
          ), Cn(o, o.return);
          break;
        case 7:
          Cn(o, o.return);
        default:
          dn(
            u,
            o,
            n
          );
      }
      e = e.sibling;
    }
  }
  function cf(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Ki(n));
  }
  function rf(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ki(t));
  }
  function ln(t, e, n, a) {
    var u = (n & 335544064) === n;
    if (e.subtreeFlags & (u ? 10262 : 10256))
      for (e = e.child; e !== null; )
        Bg(
          t,
          e,
          n,
          a
        ), e = e.sibling;
    else u && wg(e);
  }
  function Bg(t, e, n, a) {
    var u = (n & 335544064) === n;
    u && e.alternate === null && e.return !== null && e.return.alternate !== null && lc(e);
    var o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ln(
          t,
          e,
          n,
          a
        ), o & 2048 && iu(9, e);
        break;
      case 1:
        ln(
          t,
          e,
          n,
          a
        );
        break;
      case 3:
        ln(
          t,
          e,
          n,
          a
        ), u && af && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), o & 2048 && (o = null, e.alternate !== null && (o = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== o && (e.refCount++, o != null && Ki(o)));
        break;
      case 12:
        if (o & 2048) {
          ln(
            t,
            e,
            n,
            a
          ), o = e.stateNode;
          try {
            var h = e.memoizedProps, x = h.id, M = h.onPostCommit;
            typeof M == "function" && M(
              x,
              e.alternate === null ? "mount" : "update",
              o.passiveEffectDuration,
              -0
            );
          } catch (X) {
            qt(e, e.return, X);
          }
        } else
          ln(
            t,
            e,
            n,
            a
          );
        break;
      case 31:
        ln(
          t,
          e,
          n,
          a
        );
        break;
      case 13:
        ln(
          t,
          e,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        h = e.stateNode, x = e.alternate, e.memoizedState !== null ? (u && x !== null && x.memoizedState === null && lc(x), h._visibility & 2 ? ln(
          t,
          e,
          n,
          a
        ) : cu(
          t,
          e
        )) : (u && x !== null && x.memoizedState !== null && lc(e), h._visibility & 2 ? ln(
          t,
          e,
          n,
          a
        ) : (h._visibility |= 2, ka(
          t,
          e,
          n,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), o & 2048 && cf(x, e);
        break;
      case 24:
        ln(
          t,
          e,
          n,
          a
        ), o & 2048 && rf(e.alternate, e);
        break;
      case 30:
        u && (o = e.alternate, o !== null && (An(o.child, !0), An(e.child, !0))), ln(
          t,
          e,
          n,
          a
        );
        break;
      default:
        ln(
          t,
          e,
          n,
          a
        );
    }
  }
  function ka(t, e, n, a, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var o = t, h = e, x = n, M = a, X = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ka(
            o,
            h,
            x,
            M,
            u
          ), iu(8, h);
          break;
        case 23:
          break;
        case 22:
          var I = h.stateNode;
          h.memoizedState !== null ? I._visibility & 2 ? ka(
            o,
            h,
            x,
            M,
            u
          ) : cu(
            o,
            h
          ) : (I._visibility |= 2, ka(
            o,
            h,
            x,
            M,
            u
          )), u && X & 2048 && cf(
            h.alternate,
            h
          );
          break;
        case 24:
          ka(
            o,
            h,
            x,
            M,
            u
          ), u && X & 2048 && rf(h.alternate, h);
          break;
        default:
          ka(
            o,
            h,
            x,
            M,
            u
          );
      }
      e = e.sibling;
    }
  }
  function cu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, a = e, u = a.flags;
        switch (a.tag) {
          case 22:
            cu(n, a), u & 2048 && cf(
              a.alternate,
              a
            );
            break;
          case 24:
            cu(n, a), u & 2048 && rf(a.alternate, a);
            break;
          default:
            cu(n, a);
        }
        e = e.sibling;
      }
  }
  var oa = 8192;
  function ca(t, e, n) {
    if (t.subtreeFlags & oa)
      for (t = t.child; t !== null; )
        Yg(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Yg(t, e, n) {
    switch (t.tag) {
      case 26:
        ca(
          t,
          e,
          n
        ), t.flags & oa && (t.memoizedState !== null ? Vx(
          n,
          fn,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && Gm(n, t)));
        break;
      case 5:
        ca(
          t,
          e,
          n
        ), t.flags & oa && (t = t.stateNode, (e & 335544128) === e && Gm(n, t));
        break;
      case 3:
      case 4:
        var a = fn;
        fn = yu(t.stateNode.containerInfo), ca(
          t,
          e,
          n
        ), fn = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = oa, oa = 16777216, ca(
          t,
          e,
          n
        ), oa = a) : ca(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & oa) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var u = t.stateNode;
          u.paired = null, Xe === null && (Xe = /* @__PURE__ */ new Map()), Xe.set(a, u);
        }
        ca(
          t,
          e,
          n
        );
        break;
      default:
        ca(
          t,
          e,
          n
        );
    }
  }
  function Vg(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function ru(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          de = a, Lg(
            a,
            t
          );
        }
      Vg(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        jg(t), t = t.sibling;
  }
  function jg(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ru(t), t.flags & 2048 && bl(9, t, t.return);
        break;
      case 3:
        ru(t);
        break;
      case 12:
        ru(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, oc(t)) : ru(t);
        break;
      default:
        ru(t);
    }
  }
  function oc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          de = a, Lg(
            a,
            t
          );
        }
      Vg(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          bl(8, e, e.return), oc(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, oc(e));
          break;
        default:
          oc(e);
      }
      t = t.sibling;
    }
  }
  function Lg(t, e) {
    for (; de !== null; ) {
      var n = de;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          bl(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ki(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, de = a;
      else
        t: for (n = t; de !== null; ) {
          a = de;
          var u = a.sibling, o = a.return;
          if (Mg(a), a === n) {
            de = null;
            break t;
          }
          if (u !== null) {
            u.return = o, de = u;
            break t;
          }
          de = o;
        }
    }
  }
  var RS = {
    getCacheForType: function(t) {
      var e = he(ne), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return he(ne).controller.signal;
    }
  }, HS = typeof WeakMap == "function" ? WeakMap : Map, Vt = 0, Gt = null, Mt = null, Dt = 0, Lt = 0, Ze = null, _l = !1, Fa = !1, sf = !1, tl = 0, Wt = 0, wl = 0, ra = 0, cc = 0, Ge = 0, Wa = 0, su = null, Ue = null, ff = !1, rc = 0, qg = 0, sc = 1 / 0, fc = null, Nl = null, It = 0, hn = null, sa = null, Hn = 0, df = 0, hf = null, Xg = null, Pa = null, ti = null, ei = null, fu = 0, dc = null;
  function Qe() {
    return (Vt & 2) !== 0 && Dt !== 0 ? Dt & -Dt : rt.T !== null ? _f() : lo();
  }
  function Zg() {
    if (Ge === 0)
      if ((Dt & 536870912) === 0 || zt) {
        var t = _a;
        _a <<= 1, (_a & 3932160) === 0 && (_a = 262144), Ge = t;
      } else Ge = 536870912;
    return t = ge.current, t !== null && (t.flags |= 32), Ge;
  }
  function ni(t, e) {
    if (e != null) {
      var n = t.stateNode, a = n.ref;
      a === null && (a = n.ref = _m(
        Gn(t.memoizedProps, n)
      )), ti === null && (ti = []), ti.push(e.bind(null, a));
    }
  }
  function Be(t, e, n) {
    (t === Gt && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null) && (li(t, 0), Tl(
      t,
      Dt,
      Ge,
      !1
    )), Zl(t, n), ((Vt & 2) === 0 || t !== Gt) && (t === Gt && ((Vt & 2) === 0 && (ra |= n), Wt === 4 && Tl(
      t,
      Dt,
      Ge,
      !1
    )), Un(t));
  }
  function Gg(t, e, n) {
    if ((Vt & 6) !== 0) throw Error(r(327));
    var a = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Xl(t, e), u = a ? YS(t, e) : mf(t, e, !0), o = a;
    do {
      if (u === 0) {
        Fa && !a && Tl(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, o && !US(n)) {
          u = mf(t, e, !1), o = !1;
          continue;
        }
        if (u === 2) {
          if (o = e, t.errorRecoveryDisabledLanes & o)
            var h = 0;
          else
            h = t.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
          if (h !== 0) {
            e = h;
            t: {
              var x = t;
              u = su;
              var M = x.current.memoizedState.isDehydrated;
              if (M && (li(x, h).flags |= 256), h = mf(
                x,
                h,
                !1
              ), h !== 2 && h !== 6) {
                if (sf && !M) {
                  x.errorRecoveryDisabledLanes |= o, ra |= o, u = 4;
                  break t;
                }
                o = Ue, Ue = u, o !== null && (Ue === null ? Ue = o : Ue.push.apply(
                  Ue,
                  o
                ));
              }
              u = h;
            }
            if (o = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          li(t, 0), Tl(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, o = u, o) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              Tl(
                a,
                e,
                Ge,
                !_l
              );
              break t;
            case 2:
              Ue = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (u = rc + 300 - _e(), 10 < u)) {
            if (Tl(
              a,
              e,
              Ge,
              !_l
            ), Na(a, 0, !0) !== 0) break t;
            Hn = e, a.timeoutHandle = Hf(
              Qg.bind(
                null,
                a,
                n,
                Ue,
                fc,
                ff,
                e,
                Ge,
                ra,
                Wa,
                _l,
                o,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          Qg(
            a,
            n,
            Ue,
            fc,
            ff,
            e,
            Ge,
            ra,
            Wa,
            _l,
            o,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Un(t);
  }
  function Qg(t, e, n, a, u, o, h, x, M, X, I, nt, V, $) {
    t.timeoutHandle = -1;
    var ht = e.subtreeFlags, yt = (o & 335544064) === o;
    if (nt = null, (yt || ht & 8192 || (ht & 16785408) === 16785408) && (nt = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Nn
    }, Xe = null, Yg(
      e,
      o,
      nt
    ), yt && (ht = nt, yt = t.containerInfo, yt = (yt.nodeType === 9 ? yt : yt.ownerDocument).__reactViewTransition, yt != null && (ht.count++, ht.waitingForViewTransition = !0, ht = Su.bind(ht), yt.finished.then(ht, ht))), ht = (o & 62914560) === o ? rc - _e() : (o & 4194048) === o ? qg - _e() : 0, ht = jx(
      nt,
      ht
    ), ht !== null)) {
      Hn = o, t.cancelPendingCommit = ht(
        Pg.bind(
          null,
          t,
          e,
          o,
          n,
          a,
          u,
          h,
          x,
          M,
          X,
          I,
          nt,
          null,
          V,
          $
        )
      ), Tl(t, o, h, !X);
      return;
    }
    Pg(
      t,
      e,
      o,
      n,
      a,
      u,
      h,
      x,
      M,
      X,
      I,
      nt
    );
  }
  function US(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var u = n[a], o = u.getSnapshot;
          u = u.value;
          try {
            if (!Le(o(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Tl(t, e, n, a) {
    e = Mi(t, e), e &= ~cc, e &= ~ra, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var u = e; 0 < u; ) {
      var o = 31 - Ne(u), h = 1 << o;
      a[o] = -1, u &= ~h;
    }
    n !== 0 && to(t, n, e);
  }
  function hc() {
    return (Vt & 6) === 0 ? (du(0), !1) : !0;
  }
  function gf() {
    if (Mt !== null) {
      if (Lt === 0)
        var t = Mt.return;
      else
        t = Mt, Jn = Fl = null, bs(t), Za = null, Ii = 0, t = Mt;
      for (; t !== null; )
        gg(t.alternate, t), t = t.return;
      Mt = null;
    }
  }
  function li(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, ix(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Hn = 0, gf(), Gt = t, Mt = n = Kn(t.current, null), Dt = e, Lt = 0, Ze = null, _l = !1, Fa = Xl(t, e), sf = !1, Wa = Ge = cc = ra = wl = Wt = 0, Ue = su = null, ff = !1, tl = Mi(t, e), bo(), n;
  }
  function Kg(t, e) {
    wt = null, rt.H = Ko, e === Xa || e === Do ? (e = Ph(), Lt = 3) : e === cs ? (e = Ph(), Lt = 4) : Lt = e === Bs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ze = e, Mt === null && (Wt = 1, $o(
      t,
      Pe(e, t.current)
    ));
  }
  function $g() {
    var t = ge.current;
    return t === null ? !0 : (Dt & 4194048) === Dt ? be === null : (Dt & 62914560) === Dt || (Dt & 536870912) !== 0 ? t === be : !1;
  }
  function Jg() {
    var t = rt.H;
    return rt.H = Ko, t === null ? Ko : t;
  }
  function Ig() {
    var t = rt.A;
    return rt.A = RS, t;
  }
  function gc() {
    Wt = 4, _l || (Dt & 4194048) !== Dt && ge.current !== null || (Fa = !0), (wl & 134217727) === 0 && (ra & 134217727) === 0 || Gt === null || Tl(
      Gt,
      Dt,
      Ge,
      !1
    );
  }
  function mf(t, e, n) {
    var a = Vt;
    Vt |= 2;
    var u = Jg(), o = Ig();
    (Gt !== t || Dt !== e) && (fc = null, li(t, e)), e = !1;
    var h = Wt;
    t: do
      try {
        if (Lt !== 0 && Mt !== null) {
          var x = Mt, M = Ze;
          switch (Lt) {
            case 8:
              gf(), h = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ge.current === null && (e = !0);
              var X = Lt;
              if (Lt = 0, Ze = null, ai(t, x, M, X), n && Fa) {
                h = 0;
                break t;
              }
              break;
            default:
              X = Lt, Lt = 0, Ze = null, ai(t, x, M, X);
          }
        }
        BS(), h = Wt;
        break;
      } catch (I) {
        Kg(t, I);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Jn = Fl = null, Vt = a, rt.H = u, rt.A = o, Mt === null && (Gt = null, Dt = 0, bo()), h;
  }
  function BS() {
    for (; Mt !== null; ) kg(Mt);
  }
  function YS(t, e) {
    var n = Vt;
    Vt |= 2;
    var a = Jg(), u = Ig();
    Gt !== t || Dt !== e ? (fc = null, sc = _e() + 500, li(t, e)) : Fa = Xl(
      t,
      e
    );
    t: do
      try {
        if (Lt !== 0 && Mt !== null) {
          e = Mt;
          var o = Ze;
          e: switch (Lt) {
            case 1:
              Lt = 0, Ze = null, ai(t, e, o, 1);
              break;
            case 2:
            case 9:
              if (Fh(o)) {
                Lt = 0, Ze = null, Fg(e);
                break;
              }
              e = function() {
                Lt !== 2 && Lt !== 9 || Gt !== t || (Lt = 7), Un(t);
              }, o.then(e, e);
              break t;
            case 3:
              Lt = 7;
              break t;
            case 4:
              Lt = 5;
              break t;
            case 7:
              Fh(o) ? (Lt = 0, Ze = null, Fg(e)) : (Lt = 0, Ze = null, ai(t, e, o, 7));
              break;
            case 5:
              var h = null;
              switch (Mt.tag) {
                case 26:
                  h = Mt.memoizedState;
                case 5:
                case 27:
                  var x = Mt;
                  if (h ? Xm(h) : x.stateNode.complete) {
                    Lt = 0, Ze = null;
                    var M = x.sibling;
                    if (M !== null) Mt = M;
                    else {
                      var X = x.return;
                      X !== null ? (Mt = X, mc(X)) : Mt = null;
                    }
                    break e;
                  }
              }
              Lt = 0, Ze = null, ai(t, e, o, 5);
              break;
            case 6:
              Lt = 0, Ze = null, ai(t, e, o, 6);
              break;
            case 8:
              gf(), Wt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        VS();
        break;
      } catch (I) {
        Kg(t, I);
      }
    while (!0);
    return Jn = Fl = null, rt.H = a, rt.A = u, Vt = n, Mt !== null ? 0 : (Gt = null, Dt = 0, bo(), Wt);
  }
  function VS() {
    for (; Mt !== null && !mr(); )
      kg(Mt);
  }
  function kg(t) {
    var e = dg(t.alternate, t, tl);
    t.memoizedProps = t.pendingProps, e === null ? mc(t) : Mt = e;
  }
  function Fg(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = ig(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Dt
        );
        break;
      case 11:
        e = ig(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Dt
        );
        break;
      case 5:
        bs(e);
        var a = e;
        a === se && (zt ? (zo(a), a.tag === 5 && a.stateNode != null && (Qt = a.stateNode)) : (zo(a), zt = !0));
      default:
        gg(n, e), e = Mt = Lh(e, tl), e = dg(n, e, tl);
    }
    t.memoizedProps = t.pendingProps, e === null ? mc(t) : Mt = e;
  }
  function ai(t, e, n, a) {
    Jn = Fl = null, bs(e), Za = null, Ii = 0;
    var u = e.return;
    try {
      if (NS(
        t,
        u,
        e,
        n,
        Dt
      )) {
        Wt = 1, $o(
          t,
          Pe(n, t.current)
        ), Mt = null;
        return;
      }
    } catch (o) {
      if (u !== null) throw Mt = u, o;
      Wt = 1, $o(
        t,
        Pe(n, t.current)
      ), Mt = null;
      return;
    }
    e.flags & 32768 ? (zt || a === 1 ? t = !0 : Fa || (Dt & 536870912) !== 0 ? t = !1 : (_l = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ge.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Wg(e, t)) : mc(e);
  }
  function mc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Wg(
          e,
          _l
        );
        return;
      }
      t = e.return;
      var n = MS(
        e.alternate,
        e,
        tl
      );
      if (n !== null) {
        Mt = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        Mt = e;
        return;
      }
      Mt = e = t;
    } while (e !== null);
    Wt === 0 && (Wt = 5);
  }
  function Wg(t, e) {
    do {
      var n = AS(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, Mt = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        Mt = t;
        return;
      }
      Mt = t = n;
    } while (t !== null);
    Wt = 6, Mt = null;
  }
  function Pg(t, e, n, a, u, o, h, x, M, X, I, nt) {
    t.cancelPendingCommit = null;
    do
      yc();
    while (It !== 0);
    if ((Vt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      t === Gt && (Mt = Gt = null, Dt = 0), sa = e, hn = t, Hn = n, hf = u, Xg = a, jS(
        t,
        e,
        n,
        h,
        x,
        M,
        nt
      );
    }
  }
  function jS(t, e, n, a, u, o, h) {
    var x = e.lanes | e.childLanes;
    if (df = x, x |= Ir, wr(
      t,
      n,
      x,
      a,
      u,
      o
    ), ti = null, (n & 335544064) === n ? (ei = hS(t), a = 10262) : (ei = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, QS(ba, function() {
      return Sf(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), ec = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = rt.T, rt.T = null, u = st.p, st.p = 2, o = Vt, Vt |= 4;
      try {
        OS(t, e, n);
      } finally {
        Vt = o, st.p = u, rt.T = a;
      }
    }
    It = 1, ec ? Pa = fx(
      h,
      t.containerInfo,
      ei,
      yf,
      vf,
      qS,
      pf,
      Sf,
      LS
    ) : (yf(), vf(), pf());
  }
  function LS(t) {
    if (It !== 0) {
      var e = hn.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function qS() {
    It === 3 && (It = 0, Ug(sa, hn), It = 4);
  }
  function yf() {
    if (It === 1) {
      It = 0;
      var t = hn, e = sa, n = Hn, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = rt.T, rt.T = null;
        var u = st.p;
        st.p = 2;
        var o = Vt;
        Vt |= 4;
        try {
          ou = ac = !1, Rg(e, t, n), n = Of;
          var h = Ah(t.containerInfo), x = n.focusedElem, M = n.selectionRange;
          if (h !== x && x && x.ownerDocument && Mh(
            x.ownerDocument.documentElement,
            x
          )) {
            if (M !== null && Gr(x)) {
              var X = M.start, I = M.end;
              if (I === void 0 && (I = X), "selectionStart" in x)
                x.selectionStart = X, x.selectionEnd = Math.min(
                  I,
                  x.value.length
                );
              else {
                var nt = x.ownerDocument || document, V = nt && nt.defaultView || window;
                if (V.getSelection) {
                  var $ = V.getSelection(), ht = x.textContent.length, yt = Math.min(M.start, ht), Nt = M.end === void 0 ? yt : Math.min(M.end, ht);
                  !$.extend && yt > Nt && (h = Nt, Nt = yt, yt = h);
                  var L = Ch(
                    x,
                    yt
                  ), D = Ch(
                    x,
                    Nt
                  );
                  if (L && D && ($.rangeCount !== 1 || $.anchorNode !== L.node || $.anchorOffset !== L.offset || $.focusNode !== D.node || $.focusOffset !== D.offset)) {
                    var K = nt.createRange();
                    K.setStart(L.node, L.offset), $.removeAllRanges(), yt > Nt ? ($.addRange(K), $.extend(D.node, D.offset)) : (K.setEnd(D.node, D.offset), $.addRange(K));
                  }
                }
              }
            }
            for (nt = [], $ = x; $ = $.parentNode; )
              $.nodeType === 1 && nt.push({
                element: $,
                left: $.scrollLeft,
                top: $.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < nt.length; x++) {
              var et = nt[x];
              et.element.scrollLeft = et.left, et.element.scrollTop = et.top;
            }
          }
          di = !!Af, Of = Af = null;
        } finally {
          Vt = o, st.p = u, rt.T = a;
        }
      }
      t.current = e, It = 2;
    }
  }
  function vf() {
    if (It === 2) {
      It = 0;
      var t = hn, e = sa, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = rt.T, rt.T = null;
        var a = st.p;
        st.p = 2;
        var u = Vt;
        Vt |= 4;
        try {
          zg(t, e.alternate, e);
        } finally {
          Vt = u, st.p = a, rt.T = n;
        }
      }
      It = 3;
    }
  }
  function pf() {
    if (It === 4 || It === 3) {
      It = 0;
      var t = Pa;
      Pa = null, yr();
      var e = hn, n = sa, a = Hn, u = Xg, o = (a & 335544064) === a ? 10262 : 10256;
      if ((n.subtreeFlags & o) !== 0 || (n.flags & o) !== 0 ? It = 5 : (It = 0, sa = hn = null, tm(e, e.pendingLanes)), o = e.pendingLanes, o === 0 && (Nl = null), Di(a), n = n.stateNode, we && typeof we.onCommitFiberRoot == "function")
        try {
          we.onCommitFiberRoot(
            ql,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        n = rt.T, o = st.p, st.p = 2, rt.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < u.length; x++) {
            var M = u[x];
            h(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          rt.T = n, st.p = o;
        }
      }
      if (u = ti, h = ei, ei = null, u !== null && (ti = null, h === null && (h = []), t !== null))
        for (M = 0; M < u.length; M++)
          n = (0, u[M])(
            h
          ), n !== void 0 && t.finished.finally(n);
      (Hn & 3) !== 0 && yc(), Un(e), o = e.pendingLanes, (a & 261930) !== 0 && (o & 42) !== 0 ? e === dc ? fu++ : (fu = 0, dc = e) : (fu = 0, dc = null), du(0);
    }
  }
  function tm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Ki(e)));
  }
  function yc() {
    return Pa !== null && (Pa.skipTransition(), Pa = null), yf(), vf(), pf(), Sf();
  }
  function Sf() {
    if (It !== 5) return !1;
    var t = hn, e = df;
    df = 0;
    var n = Di(Hn), a = rt.T, u = st.p;
    try {
      st.p = 32 > n ? 32 : n, rt.T = null, n = hf, hf = null;
      var o = hn, h = Hn;
      if (It = 0, sa = hn = null, Hn = 0, (Vt & 6) !== 0) throw Error(r(331));
      var x = Vt;
      if (Vt |= 4, jg(o.current), Bg(
        o,
        o.current,
        h,
        n
      ), Vt = x, du(0, !1), we && typeof we.onPostCommitFiberRoot == "function")
        try {
          we.onPostCommitFiberRoot(ql, o);
        } catch {
        }
      return !0;
    } finally {
      st.p = u, rt.T = a, tm(t, e);
    }
  }
  function em(t, e, n) {
    e = Pe(n, e), e = Us(t.stateNode, e, 2), t = vl(t, e, 2), t !== null && (Zl(t, 2), Un(t));
  }
  function qt(t, e, n) {
    if (t.tag === 3)
      em(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          em(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Nl === null || !Nl.has(a))) {
            t = Pe(n, t), n = F0(2), a = vl(e, n, 2), a !== null && (W0(
              n,
              a,
              e,
              t
            ), Zl(a, 2), Un(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function xf(t, e, n) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new HS();
      var u = /* @__PURE__ */ new Set();
      a.set(e, u);
    } else
      u = a.get(e), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(e, u));
    u.has(n) || (sf = !0, u.add(n), t = XS.bind(null, t, e, n), e.then(t, t));
  }
  function XS(t, e, n) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Gt === t && (Dt & n) === n && ((Wt === 4 || Wt === 3 && (Dt & 62914560) === Dt && 300 > _e() - rc) && (Vt & 2) === 0 ? li(t, 0) : cc |= n, Wa === Dt && (Wa = 0)), Un(t);
  }
  function nm(t, e) {
    e === 0 && (e = Ai()), t = Jl(t, e), t !== null && (Zl(t, e), Un(t));
  }
  function ZS(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), nm(t, n);
  }
  function GS(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, u = t.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(e), nm(t, n);
  }
  function QS(t, e) {
    return zi(t, e);
  }
  var ii = null, ui = null, bf = !1, vc = !1, Ef = !1, zl = 0;
  function Un(t) {
    t !== ui && t.next === null && (ui === null ? ii = ui = t : ui = ui.next = t), vc = !0, bf || (bf = !0, $S());
  }
  function du(t, e) {
    if (!Ef && vc) {
      Ef = !0;
      do
        for (var n = !1, a = ii; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var o = 0;
            else {
              var h = a.suspendedLanes, x = a.pingedLanes;
              o = (1 << 31 - Ne(42 | t) + 1) - 1, o &= u & ~(h & ~x), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (n = !0, um(a, o));
          } else
            o = Dt, o = Na(
              a,
              a === Gt ? o : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (o & 3) === 0 || Xl(a, o) || (n = !0, um(a, o));
          a = a.next;
        }
      while (n);
      Ef = !1;
    }
  }
  function KS() {
    lm();
  }
  function lm() {
    vc = bf = !1;
    var t = 0;
    zl !== 0 && ax() && (t = zl);
    for (var e = _e(), n = null, a = ii; a !== null; ) {
      var u = a.next, o = am(a, e);
      o === 0 ? (a.next = null, n === null ? ii = u : n.next = u, u === null && (ui = n)) : (n = a, (t !== 0 || (o & 3) !== 0) && (vc = !0)), a = u;
    }
    It !== 0 && It !== 5 || du(t), zl !== 0 && (zl = 0);
  }
  function am(t, e) {
    for (var n = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, o = t.pendingLanes & -62914561; 0 < o; ) {
      var h = 31 - Ne(o), x = 1 << h, M = u[h];
      M === -1 ? ((x & n) === 0 || (x & a) !== 0) && (u[h] = Pu(x, e)) : M <= e && (t.expiredLanes |= x), o &= ~x;
    }
    if (e = Gt, n = Dt, n = Na(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, n === 0 || t === e && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Ci(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || Xl(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (a !== null && Ci(a), Di(n)) {
        case 2:
        case 8:
          n = Fu;
          break;
        case 32:
          n = ba;
          break;
        case 268435456:
          n = Wu;
          break;
        default:
          n = ba;
      }
      return a = im.bind(null, t), n = zi(n, a), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return a !== null && a !== null && Ci(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function im(t, e) {
    if (It !== 0 && It !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (yc() && t.callbackNode !== n)
      return null;
    var a = Dt;
    return a = Na(
      t,
      t === Gt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Gg(t, a, e), am(t, _e()), t.callbackNode != null && t.callbackNode === n ? im.bind(null, t) : null);
  }
  function um(t, e) {
    if (yc()) return null;
    Gg(t, e, !0);
  }
  function $S() {
    ux(function() {
      (Vt & 6) !== 0 ? zi(
        ku,
        KS
      ) : lm();
    });
  }
  function _f() {
    if (zl === 0) {
      var t = ta;
      t === 0 && (t = Ea, Ea <<= 1, (Ea & 261888) === 0 && (Ea = 256)), zl = t;
    }
    return zl;
  }
  function om(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ho(t);
  }
  function JS(t, e, n, a, u) {
    if (e === "submit" && n && n.stateNode === u) {
      var o = om(
        (u[xe] || null).action
      ), h = a.submitter;
      h && (e = (e = h[xe] || null) ? om(e.formAction) : h.getAttribute("formAction"), e !== null && (o = e, h = null));
      var x = new vo(
        "action",
        "action",
        null,
        a,
        u
      );
      t.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (zl !== 0) {
                  var M = new FormData(u, h);
                  As(
                    n,
                    {
                      pending: !0,
                      data: M,
                      method: u.method,
                      action: o
                    },
                    null,
                    M
                  );
                }
              } else
                typeof o == "function" && (x.preventDefault(), M = new FormData(u, h), As(
                  n,
                  {
                    pending: !0,
                    data: M,
                    method: u.method,
                    action: o
                  },
                  o,
                  M
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var wf = 0; wf < Jr.length; wf++) {
    var Nf = Jr[wf], IS = Nf.toLowerCase(), kS = Nf[0].toUpperCase() + Nf.slice(1);
    rn(
      IS,
      "on" + kS
    );
  }
  rn(Rh, "onAnimationEnd"), rn(Hh, "onAnimationIteration"), rn(Uh, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(iS, "onTransitionRun"), rn(uS, "onTransitionStart"), rn(oS, "onTransitionCancel"), rn(Bh, "onTransitionEnd"), ol("onMouseEnter", ["mouseout", "mouseover"]), ol("onMouseLeave", ["mouseout", "mouseover"]), ol("onPointerEnter", ["pointerout", "pointerover"]), ol("onPointerLeave", ["pointerout", "pointerover"]), cn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), cn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), cn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), cn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), cn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), cn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var hu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), FS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(hu)
  );
  function cm(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var a = t[n], u = a.event;
      a = a.listeners;
      t: {
        var o = void 0;
        if (e)
          for (var h = a.length - 1; 0 <= h; h--) {
            var x = a[h], M = x.instance, X = x.currentTarget;
            if (x = x.listener, M !== o && u.isPropagationStopped())
              break t;
            o = x, u.currentTarget = X;
            try {
              o(u);
            } catch (I) {
              xo(I);
            }
            u.currentTarget = null, o = M;
          }
        else
          for (h = 0; h < a.length; h++) {
            if (x = a[h], M = x.instance, X = x.currentTarget, x = x.listener, M !== o && u.isPropagationStopped())
              break t;
            o = x, u.currentTarget = X;
            try {
              o(u);
            } catch (I) {
              xo(I);
            }
            u.currentTarget = null, o = M;
          }
      }
    }
  }
  function At(t, e) {
    var n = e[io];
    n === void 0 && (n = e[io] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    n.has(a) || (rm(e, t, 2, !1), n.add(a));
  }
  function Tf(t, e, n) {
    var a = 0;
    e && (a |= 4), rm(
      n,
      t,
      a,
      e
    );
  }
  var pc = "_reactListening" + Math.random().toString(36).slice(2);
  function zf(t) {
    if (!t[pc]) {
      t[pc] = !0, co.forEach(function(n) {
        n !== "selectionchange" && (FS.has(n) || Tf(n, !1, t), Tf(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[pc] || (e[pc] = !0, Tf("selectionchange", !1, e));
    }
  }
  function rm(t, e, n, a) {
    switch (Wm(e)) {
      case 2:
        var u = Zx;
        break;
      case 8:
        u = Gx;
        break;
      default:
        u = $f;
    }
    n = u.bind(
      null,
      e,
      n,
      t
    ), u = void 0, !Hr || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: u
    }) : t.addEventListener(e, n, !0) : u !== void 0 ? t.addEventListener(e, n, {
      passive: u
    }) : t.addEventListener(e, n, !1);
  }
  function Cf(t, e, n, a, u) {
    var o = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var h = a.tag;
        if (h === 3 || h === 4) {
          var x = a.stateNode.containerInfo;
          if (x === u) break;
          if (h === 4)
            for (h = a.return; h !== null; ) {
              var M = h.tag;
              if ((M === 3 || M === 4) && h.stateNode.containerInfo === u)
                return;
              h = h.return;
            }
          for (; x !== null; ) {
            if (h = Ln(x), h === null) return;
            if (M = h.tag, M === 5 || M === 6 || M === 26 || M === 27) {
              a = o = h;
              continue t;
            }
            x = x.parentNode;
          }
        }
        a = a.return;
      }
    rh(function() {
      var X = o, I = Dr(n), nt = [];
      t: {
        var V = Yh.get(t);
        if (V !== void 0) {
          var $ = vo, ht = t;
          switch (t) {
            case "keypress":
              if (mo(n) === 0) break t;
            case "keydown":
            case "keyup":
              $ = U1;
              break;
            case "focusin":
              ht = "focus", $ = Vr;
              break;
            case "focusout":
              ht = "blur", $ = Vr;
              break;
            case "beforeblur":
            case "afterblur":
              $ = Vr;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              $ = dh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              $ = _1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              $ = L1;
              break;
            case Rh:
            case Hh:
            case Uh:
              $ = T1;
              break;
            case Bh:
              $ = X1;
              break;
            case "scroll":
            case "scrollend":
              $ = b1;
              break;
            case "wheel":
              $ = G1;
              break;
            case "copy":
            case "cut":
            case "paste":
              $ = C1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              $ = gh;
              break;
            case "submit":
              $ = V1;
              break;
            case "toggle":
            case "beforetoggle":
              $ = K1;
          }
          var yt = (e & 4) !== 0, Nt = !yt && (t === "scroll" || t === "scrollend"), L = yt ? V !== null ? V + "Capture" : null : V;
          yt = [];
          for (var D = X, K; D !== null; ) {
            var et = D;
            if (K = et.stateNode, et = et.tag, et !== 5 && et !== 26 && et !== 27 || K === null || L === null || (et = Ui(D, L), et != null && yt.push(
              gu(D, et, K)
            )), Nt) break;
            D = D.return;
          }
          0 < yt.length && (V = new $(
            V,
            ht,
            null,
            n,
            I
          ), nt.push({ event: V, listeners: yt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if ($ = t === "mouseover" || t === "pointerover", V = t === "mouseout" || t === "pointerout", $ && n !== Or && (ht = n.relatedTarget || n.fromElement) && (Ln(ht) || ht[il]))
            break t;
          (V || $) && (ht = I.window === I ? I : ($ = I.ownerDocument) ? $.defaultView || $.parentWindow : window, V ? ($ = n.relatedTarget || n.toElement, V = X, $ = $ ? Ln($) : null, $ !== null && (Nt = f($), yt = $.tag, $ !== Nt || yt !== 5 && yt !== 27 && yt !== 6) && ($ = null)) : (V = null, $ = X), V !== $ && (yt = dh, et = "onMouseLeave", L = "onMouseEnter", D = "mouse", (t === "pointerout" || t === "pointerover") && (yt = gh, et = "onPointerLeave", L = "onPointerEnter", D = "pointer"), Nt = V == null ? ht : Ql(V), K = $ == null ? ht : Ql($), ht = new yt(
            et,
            D + "leave",
            V,
            n,
            I
          ), ht.target = Nt, ht.relatedTarget = K, et = null, Ln(I) === X && (yt = new yt(
            L,
            D + "enter",
            $,
            n,
            I
          ), yt.target = K, yt.relatedTarget = Nt, et = yt), Nt = et, yt = V && $ ? B(
            V,
            $,
            WS
          ) : null, V !== null && sm(
            nt,
            ht,
            V,
            yt,
            !1
          ), $ !== null && Nt !== null && sm(
            nt,
            Nt,
            $,
            yt,
            !0
          )));
        }
        t: {
          if (V = X ? Ql(X) : window, $ = V.nodeName && V.nodeName.toLowerCase(), $ === "select" || $ === "input" && V.type === "file")
            var mt = Eh;
          else if (xh(V))
            if (_h)
              mt = nS;
            else {
              mt = tS;
              var Rt = P1;
            }
          else
            $ = V.nodeName, !$ || $.toLowerCase() !== "input" || V.type !== "checkbox" && V.type !== "radio" ? X && Ar(X.elementType) && (mt = Eh) : mt = eS;
          if (mt && (mt = mt(t, X))) {
            bh(
              nt,
              mt,
              n,
              I
            );
            break t;
          }
          Rt && Rt(t, V, X);
        }
        switch (Rt = X ? Ql(X) : window, t) {
          case "focusin":
            (xh(Rt) || Rt.contentEditable === "true") && (Ha = Rt, Qr = X, Zi = null);
            break;
          case "focusout":
            Zi = Qr = Ha = null;
            break;
          case "mousedown":
            Kr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Kr = !1, Oh(nt, n, I);
            break;
          case "selectionchange":
            if (aS) break;
          case "keydown":
          case "keyup":
            Oh(nt, n, I);
        }
        var St;
        if (Lr)
          t: {
            switch (t) {
              case "compositionstart":
                var bt = "onCompositionStart";
                break t;
              case "compositionend":
                bt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                bt = "onCompositionUpdate";
                break t;
            }
            bt = void 0;
          }
        else
          Ra ? ph(t, n) && (bt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (bt = "onCompositionStart");
        bt && (mh && n.locale !== "ko" && (Ra || bt !== "onCompositionStart" ? bt === "onCompositionEnd" && Ra && (St = sh()) : (cl = I, Ur = "value" in cl ? cl.value : cl.textContent, Ra = !0)), Rt = Sc(X, bt), 0 < Rt.length && (bt = new hh(
          bt,
          t,
          null,
          n,
          I
        ), nt.push({ event: bt, listeners: Rt }), St ? bt.data = St : (St = Sh(n), St !== null && (bt.data = St)))), (St = J1 ? I1(t, n) : k1(t, n)) && (bt = Sc(X, "onBeforeInput"), 0 < bt.length && (Rt = new hh(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          I
        ), nt.push({
          event: Rt,
          listeners: bt
        }), Rt.data = St)), JS(
          nt,
          t,
          X,
          n,
          I
        );
      }
      cm(nt, e);
    });
  }
  function gu(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function Sc(t, e) {
    for (var n = e + "Capture", a = []; t !== null; ) {
      var u = t, o = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || o === null || (u = Ui(t, n), u != null && a.unshift(
        gu(t, u, o)
      ), u = Ui(t, e), u != null && a.push(
        gu(t, u, o)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function WS(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function sm(t, e, n, a, u) {
    for (var o = e._reactName, h = []; n !== null && n !== a; ) {
      var x = n, M = x.alternate, X = x.stateNode;
      if (x = x.tag, M !== null && M === a) break;
      x !== 5 && x !== 26 && x !== 27 || X === null || (M = X, u ? (X = Ui(n, o), X != null && h.unshift(
        gu(n, X, M)
      )) : u || (X = Ui(n, o), X != null && h.push(
        gu(n, X, M)
      ))), n = n.return;
    }
    h.length !== 0 && t.push({ event: e, listeners: h });
  }
  var PS = /\r\n?/g, tx = /\u0000|\uFFFD/g;
  function fm(t) {
    return (typeof t == "string" ? t : "" + t).replace(PS, `
`).replace(tx, "");
  }
  function dm(t, e) {
    return e = fm(e), fm(t) === e;
  }
  function Xt(t, e, n, a, u, o) {
    switch (n) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || Aa(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && Aa(t, "" + a);
        else return;
        break;
      case "className":
        fo(t, "class", a);
        break;
      case "tabIndex":
        fo(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        fo(t, n, a);
        break;
      case "style":
        oh(t, a, o);
        return;
      case "data":
        if (e !== "object") {
          fo(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(n);
          break;
        }
        a = ho(a), t.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" && (n === "formAction" ? (e !== "input" && Xt(t, e, "name", u.name, u, null), Xt(
            t,
            e,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Xt(
            t,
            e,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Xt(
            t,
            e,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Xt(t, e, "encType", u.encType, u, null), Xt(t, e, "method", u.method, u, null), Xt(t, e, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(n);
          break;
        }
        a = ho(a), t.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (t.onclick = Nn);
        return;
      case "onScroll":
        a != null && At("scroll", t);
        return;
      case "onScrollEnd":
        a != null && At("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (u.children != null) throw Error(r(60));
            o?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = ho(a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(n, a) : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(n, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(n, a) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(n, a) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(n) : t.setAttribute(n, a);
        break;
      case "popover":
        At("beforetoggle", t), At("toggle", t), so(t, "popover", a);
        break;
      case "xlinkActuate":
        Xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Xn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Xn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Xn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        so(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = S1.get(n) || n, so(t, n, a);
        else return;
    }
    Yt = !0;
  }
  function Mf(t, e, n, a, u, o) {
    switch (n) {
      case "style":
        oh(t, a, o);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (u.children != null) throw Error(r(60));
            o?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof a == "string") Aa(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          Aa(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && At("scroll", t);
        return;
      case "onScrollEnd":
        a != null && At("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = Nn);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!ro.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), o = n.slice(2, u ? n.length - 7 : void 0), e = t[xe] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(o, e, u), typeof a == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(o, a, u);
              break t;
            }
            Yt = !0, n in t ? t[n] = a : a === !0 ? t.setAttribute(n, "") : so(t, n, a);
          }
        return;
    }
    Yt = !0;
  }
  function ve(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        At("error", t), At("load", t);
        var a = !1, u = !1, o;
        for (o in n)
          if (n.hasOwnProperty(o)) {
            var h = n[o];
            if (h != null)
              switch (o) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  Xt(t, e, o, h, n, null);
              }
          }
        u && Xt(t, e, "srcSet", n.srcSet, n, null), a && Xt(t, e, "src", n.src, n, null);
        return;
      case "input":
        At("invalid", t);
        var x = o = h = u = null, M = null, X = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var I = n[a];
            if (I != null)
              switch (a) {
                case "name":
                  u = I;
                  break;
                case "type":
                  h = I;
                  break;
                case "checked":
                  M = I;
                  break;
                case "defaultChecked":
                  X = I;
                  break;
                case "value":
                  o = I;
                  break;
                case "defaultValue":
                  x = I;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (I != null)
                    throw Error(r(137, e));
                  break;
                default:
                  Xt(t, e, a, I, n, null);
              }
          }
        lh(
          t,
          o,
          x,
          M,
          X,
          h,
          u,
          !1
        );
        return;
      case "select":
        At("invalid", t), a = h = o = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (x = n[u], x != null))
            switch (u) {
              case "value":
                o = x;
                break;
              case "defaultValue":
                h = x;
                break;
              case "multiple":
                a = x;
              default:
                Xt(t, e, u, x, n, null);
            }
        e = o, n = h, t.multiple = !!a, e != null ? Ma(t, !!a, e, !1) : n != null && Ma(t, !!a, n, !0);
        return;
      case "textarea":
        At("invalid", t), o = u = a = null;
        for (h in n)
          if (n.hasOwnProperty(h) && (x = n[h], x != null))
            switch (h) {
              case "value":
                a = x;
                break;
              case "defaultValue":
                u = x;
                break;
              case "children":
                o = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(r(91));
                break;
              default:
                Xt(t, e, h, x, n, null);
            }
        ih(t, a, u, o);
        return;
      case "option":
        for (M in n)
          if (n.hasOwnProperty(M) && (a = n[M], a != null))
            switch (M) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Xt(t, e, M, a, n, null);
            }
        return;
      case "dialog":
        At("beforetoggle", t), At("toggle", t), At("cancel", t), At("close", t);
        break;
      case "iframe":
      case "object":
        At("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < hu.length; a++)
          At(hu[a], t);
        break;
      case "image":
        At("error", t), At("load", t);
        break;
      case "details":
        At("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        At("error", t), At("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (X in n)
          if (n.hasOwnProperty(X) && (a = n[X], a != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                Xt(t, e, X, a, n, null);
            }
        return;
      default:
        if (Ar(e)) {
          for (I in n)
            n.hasOwnProperty(I) && (a = n[I], a !== void 0 && Mf(
              t,
              e,
              I,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (x in n)
      n.hasOwnProperty(x) && (a = n[x], a != null && Xt(t, e, x, a, n, null));
  }
  var ex = {};
  function nx(t, e, n, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, o = null, h = null, x = null, M = null, X = null, I = null;
        for ($ in n) {
          var nt = n[$];
          if (n.hasOwnProperty($) && nt != null)
            switch ($) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                M = nt;
              default:
                a.hasOwnProperty($) || Xt(t, e, $, null, a, nt);
            }
        }
        for (var V in a) {
          var $ = a[V];
          if (nt = n[V], a.hasOwnProperty(V) && ($ != null || nt != null))
            switch (V) {
              case "type":
                $ !== nt && (Yt = !0), o = $;
                break;
              case "name":
                $ !== nt && (Yt = !0), u = $;
                break;
              case "checked":
                $ !== nt && (Yt = !0), X = $;
                break;
              case "defaultChecked":
                $ !== nt && (Yt = !0), I = $;
                break;
              case "value":
                $ !== nt && (Yt = !0), h = $;
                break;
              case "defaultValue":
                $ !== nt && (Yt = !0), x = $;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if ($ != null)
                  throw Error(r(137, e));
                break;
              default:
                $ !== nt && Xt(
                  t,
                  e,
                  V,
                  $,
                  a,
                  nt
                );
            }
        }
        Cr(
          t,
          h,
          x,
          M,
          X,
          I,
          o,
          u
        );
        return;
      case "select":
        $ = h = x = V = null;
        for (o in n)
          if (M = n[o], n.hasOwnProperty(o) && M != null)
            switch (o) {
              case "value":
                break;
              case "multiple":
                $ = M;
              default:
                a.hasOwnProperty(o) || Xt(
                  t,
                  e,
                  o,
                  null,
                  a,
                  M
                );
            }
        for (u in a)
          if (o = a[u], M = n[u], a.hasOwnProperty(u) && (o != null || M != null))
            switch (u) {
              case "value":
                o !== M && (Yt = !0), V = o;
                break;
              case "defaultValue":
                o !== M && (Yt = !0), x = o;
                break;
              case "multiple":
                o !== M && (Yt = !0), h = o;
              default:
                o !== M && Xt(
                  t,
                  e,
                  u,
                  o,
                  a,
                  M
                );
            }
        e = x, n = h, a = $, V != null ? Ma(t, !!n, V, !1) : !!a != !!n && (e != null ? Ma(t, !!n, e, !0) : Ma(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        $ = V = null;
        for (x in n)
          if (u = n[x], n.hasOwnProperty(x) && u != null && !a.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Xt(t, e, x, null, a, u);
            }
        for (h in a)
          if (u = a[h], o = n[h], a.hasOwnProperty(h) && (u != null || o != null))
            switch (h) {
              case "value":
                u !== o && (Yt = !0), V = u;
                break;
              case "defaultValue":
                u !== o && (Yt = !0), $ = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== o && Xt(t, e, h, u, a, o);
            }
        ah(t, V, $);
        return;
      case "option":
        for (var ht in n)
          if (V = n[ht], n.hasOwnProperty(ht) && V != null && !a.hasOwnProperty(ht))
            switch (ht) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Xt(
                  t,
                  e,
                  ht,
                  null,
                  a,
                  V
                );
            }
        for (M in a)
          if (V = a[M], $ = n[M], a.hasOwnProperty(M) && V !== $ && (V != null || $ != null))
            switch (M) {
              case "selected":
                V !== $ && (Yt = !0), t.selected = V && typeof V != "function" && typeof V != "symbol";
                break;
              default:
                Xt(
                  t,
                  e,
                  M,
                  V,
                  a,
                  $
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var yt in n)
          V = n[yt], n.hasOwnProperty(yt) && V != null && !a.hasOwnProperty(yt) && Xt(t, e, yt, null, a, V);
        for (X in a)
          if (V = a[X], $ = n[X], a.hasOwnProperty(X) && V !== $ && (V != null || $ != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null)
                  throw Error(r(137, e));
                break;
              default:
                Xt(
                  t,
                  e,
                  X,
                  V,
                  a,
                  $
                );
            }
        return;
      default:
        if (Ar(e)) {
          for (var Nt in n)
            V = n[Nt], n.hasOwnProperty(Nt) && V !== void 0 && !a.hasOwnProperty(Nt) && Mf(
              t,
              e,
              Nt,
              void 0,
              a,
              V
            );
          for (I in a)
            V = a[I], $ = n[I], !a.hasOwnProperty(I) || V === $ || V === void 0 && $ === void 0 || Mf(
              t,
              e,
              I,
              V,
              a,
              $
            );
          return;
        }
    }
    for (var L in n)
      V = n[L], n.hasOwnProperty(L) && V != null && !a.hasOwnProperty(L) && Xt(t, e, L, null, a, V);
    for (nt in a)
      V = a[nt], $ = n[nt], !a.hasOwnProperty(nt) || V === $ || V == null && $ == null || Xt(t, e, nt, V, a, $);
  }
  function hm(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function lx() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var u = n[a], o = u.transferSize, h = u.initiatorType, x = u.duration;
        if (o && x && hm(h)) {
          for (h = 0, x = u.responseEnd, a += 1; a < n.length; a++) {
            var M = n[a], X = M.startTime;
            if (X > x) break;
            var I = M.transferSize, nt = M.initiatorType;
            I && hm(nt) && (M = M.responseEnd, h += I * (M < x ? 1 : (x - X) / (M - X)));
          }
          if (--a, e += 8 * (o + h) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Af = null, Of = null;
  function mu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function gm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function mm(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function ym(t, e, n, a) {
    return n = mu(
      n
    ).createElement(t), n[oe] = a, n[xe] = e, ve(n, t, e), ee(n), n;
  }
  function Df(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Rf = null;
  function ax() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Rf ? !1 : (Rf = t, !0) : (Rf = null, !1);
  }
  var Hf = typeof setTimeout == "function" ? setTimeout : void 0, ix = typeof clearTimeout == "function" ? clearTimeout : void 0, vm = typeof Promise == "function" ? Promise : void 0, pm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Hf, ux = typeof queueMicrotask == "function" ? queueMicrotask : typeof vm < "u" ? function(t) {
    return vm.resolve(null).then(t).catch(ox);
  } : Hf;
  function ox(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Cl(t) {
    return t === "head";
  }
  function Sm(t, e) {
    var n = e, a = 0;
    do {
      var u = n.nextSibling;
      if (t.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (a === 0) {
            t.removeChild(u), hi(e);
            return;
          }
          a--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          a++;
        else if (n === "html")
          Xf(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, Xf(n);
          for (var o = n.firstChild; o; ) {
            var h = o.nextSibling, x = o.nodeName;
            o[Gl] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && o.rel.toLowerCase() === "stylesheet" || n.removeChild(o), o = h;
          }
        } else
          n === "body" && Xf(t.ownerDocument.body);
      n = u;
    } while (n);
    hi(e);
  }
  function xm(t, e) {
    var n = t;
    t = 0;
    do {
      var a = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), a && a.nodeType === 8)
        if (n = a.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = a;
    } while (n);
  }
  function bm(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var a = 1;
      else
        for (var u = a = 0; u < e.length; u++) {
          var o = e[u];
          0 < o.width && 0 < o.height && a++;
        }
      a === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function Em(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function cx(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function Uf(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return cx(e, n, t);
  }
  function rx(t) {
    return t.documentElement.clientHeight;
  }
  function sx(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function fx(t, e, n, a, u, o, h, x, M) {
    var X = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var I = X.startViewTransition({
        update: function() {
          var V = X.defaultView, $ = V.navigation && V.navigation.transition, ht = X.fonts.status;
          a();
          var yt = [];
          if (ht === "loaded" && (rx(X), X.fonts.status === "loading" && yt.push(X.fonts.ready)), ht = yt.length, t !== null)
            for (var Nt = t.suspenseyImages, L = 0, D = 0; D < Nt.length; D++) {
              var K = Nt[D];
              if (!K.complete) {
                var et = K.getBoundingClientRect();
                if (0 < et.bottom && 0 < et.right && et.top < V.innerHeight && et.left < V.innerWidth) {
                  if (L += Zm(K), L > Ec) {
                    yt.length = ht;
                    break;
                  }
                  K = new Promise(
                    sx.bind(K)
                  ), yt.push(K);
                }
              }
            }
          if (0 < yt.length)
            return V = Promise.race([
              Promise.all(yt),
              new Promise(function(mt) {
                return setTimeout(mt, 500);
              })
            ]).then(u, u), ($ ? Promise.allSettled([$.finished, V]) : V).then(o, o);
          if (u(), $)
            return $.finished.then(
              o,
              o
            );
          o();
        },
        types: n
      });
      X.__reactViewTransition = I;
      var nt = [];
      return I.ready.then(
        function() {
          for (var V = X.documentElement.getAnimations({
            subtree: !0
          }), $ = 0; $ < V.length; $++) {
            var ht = V[$], yt = ht.effect, Nt = yt.pseudoElement;
            if (Nt != null && Nt.startsWith("::view-transition")) {
              nt.push(ht), ht = yt.getKeyframes();
              for (var L = Nt = void 0, D = !0, K = 0; K < ht.length; K++) {
                var et = ht[K], mt = et.width;
                if (Nt === void 0) Nt = mt;
                else if (Nt !== mt) {
                  D = !1;
                  break;
                }
                if (mt = et.height, L === void 0) L = mt;
                else if (L !== mt) {
                  D = !1;
                  break;
                }
                delete et.width, delete et.height, et.transform === "none" && delete et.transform;
              }
              D && Nt !== void 0 && L !== void 0 && (yt.setKeyframes(ht), D = getComputedStyle(
                yt.target,
                yt.pseudoElement
              ), D.width !== Nt || D.height !== L) && (D = ht[0], D.width = Nt, D.height = L, D = ht[ht.length - 1], D.width = Nt, D.height = L, yt.setKeyframes(ht));
            }
          }
          h();
        },
        function(V) {
          X.__reactViewTransition === I && (X.__reactViewTransition = null);
          try {
            if (typeof V == "object" && V !== null)
              switch (V.name) {
                case "InvalidStateError":
                  (V.message === "View transition was skipped because document visibility state is hidden." || V.message === "Skipping view transition because document visibility state has become hidden." || V.message === "Skipping view transition because viewport size changed." || V.message === "Transition was aborted because of invalid state") && (V = null);
              }
            V !== null && M(V);
          } finally {
            a(), u(), h();
          }
        }
      ), I.finished.finally(function() {
        for (var V = 0; V < nt.length; V++)
          nt[V].cancel();
        X.__reactViewTransition === I && (X.__reactViewTransition = null), x();
      }), I;
    } catch {
      return a(), u(), h(), null;
    }
  }
  function fa(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  fa.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : H({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, fa.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), a = [], u = 0; u < n.length; u++) {
      var o = n[u].effect;
      o !== null && o.target === t && o.pseudoElement === e && a.push(n[u]);
    }
    return a;
  }, fa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function _m(t) {
    return {
      name: t,
      group: new fa("group", t),
      imagePair: new fa("image-pair", t),
      old: new fa("old", t),
      new: new fa("new", t)
    };
  }
  function Ke(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Ke.prototype.addEventListener = function(t, e, n) {
    var a = null, u = null;
    if (!(n != null && typeof n != "boolean" && (a = n.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var o = this._eventListeners;
      if (Nm(o, t, e, n) === -1) {
        var h = this, x = e;
        n != null && typeof n != "boolean" && n.once === !0 && (x = function(M) {
          h.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, M) : e.handleEvent(M);
        }), a !== null && (u = h.removeEventListener.bind(
          h,
          t,
          e,
          n
        ), a.addEventListener("abort", u, { once: !0 }), u = a.removeEventListener.bind(a, "abort", u)), a = oi(n), o.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: x,
          cleanup: u
        }), m(
          this._fragmentFiber.child,
          !1,
          dx,
          t,
          x,
          a
        );
      }
      this._eventListeners = o;
    }
  };
  function dx(t, e, n, a) {
    return w(t).addEventListener(
      e,
      n,
      a
    ), !1;
  }
  Ke.prototype.removeEventListener = function(t, e, n) {
    var a = this._eventListeners;
    if (a !== null && (e = Nm(
      a,
      t,
      e,
      n
    ), e !== -1)) {
      var u = a[e];
      n = u.attachedListener;
      var o = u.cleanup;
      u = oi(u.optionsOrUseCapture), m(
        this._fragmentFiber.child,
        !1,
        hx,
        t,
        n,
        u
      ), a.splice(e, 1), o !== null && o();
    }
  };
  function hx(t, e, n, a) {
    return w(t).removeEventListener(
      e,
      n,
      a
    ), !1;
  }
  function oi(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function wm(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Nm(t, e, n, a) {
    if (t.length === 0) return -1;
    a = wm(a);
    for (var u = 0; u < t.length; u++) {
      var o = t[u];
      if (o.type === e && o.listener === n && wm(o.optionsOrUseCapture) === a)
        return u;
    }
    return -1;
  }
  Ke.prototype.dispatchEvent = function(t) {
    var e = v(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = w(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var u = 0; u < n.length; u++) {
          var o = n[u];
          a.addEventListener(
            o.type,
            o.attachedListener,
            oi(o.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), n)
        for (u = 0; u < n.length; u++)
          o = n[u], a.removeEventListener(
            o.type,
            o.attachedListener,
            oi(o.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, Ke.prototype.focus = function(t) {
    m(
      this._fragmentFiber.child,
      !0,
      Tm,
      t,
      void 0,
      void 0
    );
  };
  function Tm(t, e) {
    return t.tag === 6 ? !1 : (t = w(t), Nx(t, e));
  }
  Ke.prototype.focusLast = function(t) {
    var e = [];
    m(
      this._fragmentFiber.child,
      !0,
      Bf,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !Tm(e[n], t); n--) ;
  };
  function Bf(t, e) {
    return e.push(t), !1;
  }
  Ke.prototype.blur = function() {
    var t = v(
      this._fragmentFiber
    );
    t !== null && (t = w(t), t = mu(t).activeElement, t !== null && m(
      this._fragmentFiber.child,
      !1,
      gx,
      t,
      void 0,
      void 0
    ));
  };
  function gx(t, e) {
    return t.tag === 6 ? !1 : (t = w(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Ke.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), m(
      this._fragmentFiber.child,
      !1,
      mx,
      t,
      void 0,
      void 0
    );
  };
  function mx(t, e) {
    return t.tag === 6 || (t = w(t), e.observe(t)), !1;
  }
  Ke.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), m(
        this._fragmentFiber.child,
        !1,
        yx,
        t,
        void 0,
        void 0
      );
      for (var n = e = 0; n < gn.length; n++) {
        var a = gn[n];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : gn[e++] = a;
      }
      gn.length = e;
    }
  };
  function yx(t, e) {
    return t.tag === 6 || (t = w(t), e.unobserve(t)), !1;
  }
  var gn = [], Yf = !1;
  function vx(t, e, n) {
    gn.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Yf || (Yf = !0, Tx(function() {
      Yf = !1;
      var a = gn;
      gn = [];
      for (var u = 0; u < a.length; u++) {
        var o = a[u];
        o.observer.unobserve(o.instance);
      }
    }));
  }
  Ke.prototype.getClientRects = function() {
    var t = [];
    return m(
      this._fragmentFiber.child,
      !1,
      px,
      t,
      void 0,
      void 0
    ), t;
  };
  function px(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = w(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Ke.prototype.getRootNode = function(t) {
    var e = v(
      this._fragmentFiber
    );
    return e === null ? this : w(e).getRootNode(t);
  }, Ke.prototype.compareDocumentPosition = function(t) {
    var e = v(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    m(
      this._fragmentFiber.child,
      !1,
      Bf,
      n,
      void 0,
      void 0
    );
    var a = w(e);
    if (n.length === 0) {
      if (n = a, b(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (n = e);
      }
      e = this._fragmentFiber;
      var u = a = n.compareDocumentPosition(t);
      return n === t ? u = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = E(e)[1], n === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = w(n).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = w(n[0]), u = w(n[n.length - 1]);
    var o = b(this._fragmentFiber) ? e.parentElement : a;
    if (o == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = o.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, o = o.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var h = e.compareDocumentPosition(t), x = u.compareDocumentPosition(t), M = h & Node.DOCUMENT_POSITION_CONTAINED_BY || x & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return x = a && o && h & Node.DOCUMENT_POSITION_FOLLOWING && x & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || o && u === t || M || x ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !o && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : h, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Sx(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Sx(t, e, n, a, u) {
    var o = Ln(u);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!o)
        t: {
          for (; o !== null; ) {
            if (o.tag === 7 && (o === e || o.alternate === e)) {
              n = !0;
              break t;
            }
            o = o.return;
          }
          n = !1;
        }
      return n;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (o === null)
        return o = u.ownerDocument, u === o || u === o.documentElement || u === o.body;
      t: {
        for (o = e, e = v(e); o !== null; ) {
          if (!(o.tag !== 5 && o.tag !== 3 && o.tag !== 27 || o !== e && o.alternate !== e)) {
            o = !0;
            break t;
          }
          o = o.return;
        }
        o = !1;
      }
      return o;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!o) && !(e = o === n) && (e = B(
      n,
      o,
      G
    ), e === null ? e = !1 : (m(
      e,
      !0,
      _,
      o,
      n
    ), o = N, N = null, e = o !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!o) && !(e = o === a) && (e = B(
      a,
      o,
      G
    ), e === null ? e = !1 : (m(
      e,
      !0,
      A,
      o,
      a
    ), o = N, R = N = null, e = o !== null)), e) : !1;
  }
  function zm(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Ke.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var e = [];
    m(
      this._fragmentFiber.child,
      !1,
      Bf,
      e,
      void 0,
      void 0
    );
    var n = t !== !1;
    if (e.length === 0) {
      var a = E(
        this._fragmentFiber
      );
      if (a = n ? a[1] || a[0] || v(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = w(a), zm(t, n);
        return;
      }
      if (a = w(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          n = "host" in a ? a.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = n ? e.length - 1 : 0; a !== (n ? -1 : e.length); ) {
      var u = e[a];
      u.tag === 6 ? (u = w(u), zm(u, n)) : w(u).scrollIntoView(t), a += n ? -1 : 1;
    }
  };
  function xx(t, e) {
    return t = w(t), Cm(t, e), !1;
  }
  function Cm(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function Mm(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var u = n[a];
        t.addEventListener(
          u.type,
          u.attachedListener,
          oi(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(o) {
      for (var h = 0, x = 0; x < gn.length; x++) {
        var M = gn[x];
        (M.fragmentInstance !== e || M.observer !== o || M.instance !== t) && (gn[h++] = M);
      }
      gn.length = h, o.observe(t);
    }), Cm(t, e));
  }
  function bx(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var u = n[a];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          oi(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(o) {
      typeof o.rootMargin == "string" ? vx(
        e,
        o,
        t
      ) : o.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Vf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Vf(n), Ca(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function Ex(t, e, n, a) {
    for (; t.nodeType === 1; ) {
      var u = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Gl])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (o = t.getAttribute("rel"), o === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (o !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (o = t.getAttribute("src"), (o !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && o && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var o = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === o)
          return t;
      } else return t;
      if (t = an(t.nextSibling), t === null) break;
    }
    return null;
  }
  function _x(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = an(t.nextSibling), t === null)) return null;
    return t;
  }
  function Am(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = an(t.nextSibling), t === null)) return null;
    return t;
  }
  function jf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Lf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function wx(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var a = function() {
        e(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function an(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var qf = null;
  function Om(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return an(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Dm(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Nx(t, e) {
    function n() {
      a = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var a = !1;
    try {
      t.ownerDocument.addEventListener("focus", n, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", n, !0);
    }
    return a;
  }
  function Tx(t) {
    pm(function() {
      pm(function(e) {
        return t(e);
      });
    });
  }
  function Rm(t, e, n) {
    switch (e = mu(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Hm(t, e, n) {
    for (var a in n) {
      var u = n[a];
      n.hasOwnProperty(a) && u != null && Xt(t, e, a, null, ex, u);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === Nn && (t.onclick = null), Ca(t);
  }
  function Xf(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Ca(t);
  }
  var un = /* @__PURE__ */ new Map(), Um = /* @__PURE__ */ new Set();
  function yu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var el = st.d;
  st.d = {
    f: zx,
    r: Cx,
    D: Mx,
    C: Ax,
    L: Ox,
    m: Dx,
    X: Hx,
    S: Rx,
    M: Ux
  };
  function zx() {
    var t = el.f(), e = hc();
    return t || e;
  }
  function Cx(t) {
    var e = ul(t);
    e !== null && e.tag === 5 && e.type === "form" ? Y0(e) : el.r(t);
  }
  var ci = typeof document > "u" ? null : document;
  function Bm(t, e, n) {
    var a = ci;
    if (a && typeof e == "string" && e) {
      var u = Fe(e);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), Um.has(u) || (Um.add(u), t = { rel: t, crossOrigin: n, href: e }, a.querySelector(u) === null && (e = a.createElement("link"), ve(e, "link", t), ee(e), a.head.appendChild(e)));
    }
  }
  function Mx(t) {
    el.D(t), Bm("dns-prefetch", t, null);
  }
  function Ax(t, e) {
    el.C(t, e), Bm("preconnect", t, e);
  }
  function Ox(t, e, n) {
    el.L(t, e, n);
    var a = ci;
    if (a && t && e) {
      var u = 'link[rel="preload"][as="' + Fe(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + Fe(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + Fe(
        n.imageSizes
      ) + '"]')) : u += '[href="' + Fe(t) + '"]';
      var o = u;
      switch (e) {
        case "style":
          o = ri(t);
          break;
        case "script":
          o = si(t);
      }
      if (!(un.has(o) || (t = H(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), un.set(o, t), a.querySelector(u) !== null || e === "style" && a.querySelector(vu(o)) || e === "script" && a.querySelector(pu(o))))) {
        var h = a.createElement("link");
        ve(h, "link", t), e === "style" && (h[za] = !0, h.onload = h.onerror = function() {
          Ri(h);
        }), ee(h), a.head.appendChild(h);
      }
    }
  }
  function Dx(t, e) {
    el.m(t, e);
    var n = ci;
    if (n && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", u = 'link[rel="modulepreload"][as="' + Fe(a) + '"][href="' + Fe(t) + '"]', o = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = si(t);
      }
      if (!un.has(o) && (t = H({ rel: "modulepreload", href: t }, e), un.set(o, t), n.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(pu(o)))
              return;
        }
        a = n.createElement("link"), ve(a, "link", t), ee(a), n.head.appendChild(a);
      }
    }
  }
  function Rx(t, e, n) {
    el.S(t, e, n);
    var a = ci;
    if (a && t) {
      var u = qn(a).hoistableStyles, o = ri(t);
      e = e || "default";
      var h = u.get(o);
      if (!h) {
        var x = { loading: 0, preload: null };
        if (h = a.querySelector(
          vu(o)
        ))
          x.loading = 5;
        else {
          t = H(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = un.get(o)) && Zf(t, n);
          var M = h = a.createElement("link");
          ee(M), ve(M, "link", t), M._p = new Promise(function(X, I) {
            M.onload = X, M.onerror = I;
          }), M.addEventListener("load", function() {
            x.loading |= 1;
          }), M.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, xc(h, e, a);
        }
        h = {
          type: "stylesheet",
          instance: h,
          count: 1,
          state: x
        }, u.set(o, h);
      }
    }
  }
  function Hx(t, e) {
    el.X(t, e);
    var n = ci;
    if (n && t) {
      var a = qn(n).hoistableScripts, u = si(t), o = a.get(u);
      o || (o = n.querySelector(pu(u)), o || (t = H({ src: t, async: !0 }, e), (e = un.get(u)) && Gf(t, e), o = n.createElement("script"), ee(o), ve(o, "link", t), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, a.set(u, o));
    }
  }
  function Ux(t, e) {
    el.M(t, e);
    var n = ci;
    if (n && t) {
      var a = qn(n).hoistableScripts, u = si(t), o = a.get(u);
      o || (o = n.querySelector(pu(u)), o || (t = H({ src: t, async: !0, type: "module" }, e), (e = un.get(u)) && Gf(t, e), o = n.createElement("script"), ee(o), ve(o, "link", t), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, a.set(u, o));
    }
  }
  function Ym(t, e, n, a) {
    var u = (u = re.current) ? yu(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = ri(n.href), e = qn(
          u
        ).hoistableStyles, a = e.get(n), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = ri(n.href);
          var o = qn(
            u
          ).hoistableStyles, h = o.get(t);
          if (h || (u = u.ownerDocument || u, h = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, o.set(t, h), (o = u.querySelector(
            vu(t)
          )) ? o._p || (h.instance = o, h.state.loading = 5) : (o = un.get(t), o || (o = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, un.set(t, o)), Bx(
            u,
            t,
            o,
            h.state
          ))), e && a === null)
            throw Error(r(528, ""));
          return h;
        }
        if (e && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = si(n), e = qn(
          u
        ).hoistableScripts, a = e.get(n), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function ri(t) {
    return 'href="' + Fe(t) + '"';
  }
  function vu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Vm(t) {
    return H({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Bx(t, e, n, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[za] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[za] = !0, e.onload = e.onerror = Ri.bind(null, e), ve(e, "link", n), ee(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function si(t) {
    return '[src="' + Fe(t) + '"]';
  }
  function pu(t) {
    return "script[async]" + t;
  }
  function jm(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Fe(n.href) + '"]'
          );
          if (a)
            return e.instance = a, ee(a), a;
          var u = H({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), ee(a), ve(a, "style", u), xc(a, n.precedence, t), e.instance = a;
        case "stylesheet":
          u = ri(n.href);
          var o = t.querySelector(
            vu(u)
          );
          if (o)
            return e.state.loading |= 4, e.instance = o, ee(o), o;
          a = Vm(n), (u = un.get(u)) && Zf(a, u), o = (t.ownerDocument || t).createElement("link"), ee(o);
          var h = o;
          return h._p = new Promise(function(x, M) {
            h.onload = x, h.onerror = M;
          }), ve(o, "link", a), e.state.loading |= 4, xc(o, n.precedence, t), e.instance = o;
        case "script":
          return o = si(n.src), (u = t.querySelector(
            pu(o)
          )) ? (e.instance = u, ee(u), u) : (a = n, (u = un.get(o)) && (a = H({}, n), Gf(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), ee(u), ve(u, "link", a), t.head.appendChild(u), e.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, xc(a, n.precedence, t));
    return e.instance;
  }
  function xc(t, e, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, o = u, h = 0; h < a.length; h++) {
      var x = a[h];
      if (x.dataset.precedence === e) o = x;
      else if (o !== u) break;
    }
    o ? o.parentNode.insertBefore(t, o.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Zf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Gf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var bc = null;
  function Lm(t, e, n) {
    if (bc === null) {
      var a = /* @__PURE__ */ new Map(), u = bc = /* @__PURE__ */ new Map();
      u.set(n, a);
    } else
      u = bc, a = u.get(n), a || (a = /* @__PURE__ */ new Map(), u.set(n, a));
    if (a.has(t)) return a;
    for (a.set(t, null), n = n.getElementsByTagName(t), u = 0; u < n.length; u++) {
      var o = n[u];
      if (!(o[Gl] || o[oe] || t === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = o.getAttribute(e) || "";
        h = t + h;
        var x = a.get(h);
        x ? x.push(o) : a.set(h, [o]);
      }
    }
    return a;
  }
  function Qf(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Yx(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function qm(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function Xm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Zm(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Gm(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Zm(e), t.suspenseyImages.push(e)), t = Lx.bind(t), e.decode().then(t, t));
  }
  function Vx(t, e, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = ri(a.href), o = e.querySelector(
          vu(u)
        );
        if (o) {
          e = o._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Su.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = o, ee(o);
          return;
        }
        o = e.ownerDocument || e, a = Vm(a), (u = un.get(u)) && Zf(a, u), o = o.createElement("link"), ee(o);
        var h = o;
        h._p = new Promise(function(x, M) {
          h.onload = x, h.onerror = M;
        }), ve(o, "link", a), n.instance = o;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = Su.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Ec = 0;
  function jx(t, e) {
    return t.stylesheets && t.count === 0 && wc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (t.stylesheets && wc(t, t.stylesheets), t.unsuspend) {
          var o = t.unsuspend;
          t.unsuspend = null, o();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Ec === 0 && (Ec = 62500 * lx());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && wc(t, t.stylesheets), t.unsuspend)) {
            var o = t.unsuspend;
            t.unsuspend = null, o();
          }
        },
        (t.imgBytes > Ec ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Qm(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) wc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Su() {
    this.count--, Qm(this);
  }
  function Lx() {
    this.imgCount--, Qm(this);
  }
  var _c = null;
  function wc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, _c = /* @__PURE__ */ new Map(), e.forEach(qx, t), _c = null, Su.call(t));
  }
  function qx(t, e) {
    if (!(e.state.loading & 4)) {
      var n = _c.get(t);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), _c.set(t, n);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), o = 0; o < u.length; o++) {
          var h = u[o];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (n.set(h.dataset.precedence, h), a = h);
        }
        a && n.set(null, a);
      }
      u = e.instance, h = u.getAttribute("data-precedence"), o = n.get(h) || a, o === a && n.set(null, u), n.set(h, u), this.count++, a = Su.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), o ? o.parentNode.insertBefore(u, o.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), e.state.loading |= 4;
    }
  }
  var fi = {
    $$typeof: j,
    Provider: null,
    Consumer: null,
    _currentValue: pt,
    _currentValue2: pt,
    _threadCount: 0
  };
  function Xx(t, e, n, a, u, o, h, x, M) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Oi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Oi(0), this.hiddenUpdates = Oi(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = o, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = M, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Km(t, e, n, a, u, o, h, x, M, X, I, nt) {
    return t = new Xx(
      t,
      e,
      n,
      h,
      M,
      X,
      I,
      nt,
      x
    ), e = 1, o === !0 && (e |= 24), o = De(3, null, null, e), t.current = o, o.stateNode = t, e = is(), e.refCount++, t.pooledCache = e, e.refCount++, o.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: e
    }, rs(o), t;
  }
  function $m(t) {
    return t ? (t = Ya, t) : Ya;
  }
  function Jm(t, e, n, a, u, o) {
    u = $m(u), a.context === null ? a.context = u : a.pendingContext = u, a = yl(e), a.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (a.callback = o), n = vl(t, a, e), n !== null && (Be(n, t, e), ki(n, t, e));
  }
  function Im(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Kf(t, e) {
    Im(t, e), (t = t.alternate) && Im(t, e);
  }
  function km(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Jl(t, 67108864);
      e !== null && Be(e, t, 67108864), Kf(t, 67108864);
    }
  }
  function Fm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Qe();
      e = Ta(e);
      var n = Jl(t, e);
      n !== null && Be(n, t, e), Kf(t, e);
    }
  }
  var di = !0;
  function Zx(t, e, n, a) {
    var u = rt.T;
    rt.T = null;
    var o = st.p;
    try {
      st.p = 2, $f(t, e, n, a);
    } finally {
      st.p = o, rt.T = u;
    }
  }
  function Gx(t, e, n, a) {
    var u = rt.T;
    rt.T = null;
    var o = st.p;
    try {
      st.p = 8, $f(t, e, n, a);
    } finally {
      st.p = o, rt.T = u;
    }
  }
  function $f(t, e, n, a) {
    if (di) {
      var u = Jf(a);
      if (u === null)
        Cf(
          t,
          e,
          a,
          Nc,
          n
        ), Pm(t, a);
      else if (Kx(
        u,
        t,
        e,
        n,
        a
      ))
        a.stopPropagation();
      else if (Pm(t, a), e & 4 && -1 < Qx.indexOf(t)) {
        for (; u !== null; ) {
          var o = ul(u);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                  var h = jn(o.pendingLanes);
                  if (h !== 0) {
                    var x = o;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; h; ) {
                      var M = 1 << 31 - Ne(h);
                      x.entanglements[1] |= M, h &= ~M;
                    }
                    Un(o), (Vt & 6) === 0 && (sc = _e() + 500, du(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = Jl(o, 2), x !== null && Be(x, o, 2), hc(), Kf(o, 2);
            }
          if (o = Jf(a), o === null && Cf(
            t,
            e,
            a,
            Nc,
            n
          ), o === u) break;
          u = o;
        }
        u !== null && a.stopPropagation();
      } else
        Cf(
          t,
          e,
          a,
          null,
          n
        );
    }
  }
  function Jf(t) {
    return t = Dr(t), If(t);
  }
  var Nc = null;
  function If(t) {
    if (Nc = null, t = Ln(t), t !== null) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = d(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = g(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Nc = t, null;
  }
  function Wm(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (vr()) {
          case ku:
            return 2;
          case Fu:
            return 8;
          case ba:
          case pr:
            return 32;
          case Wu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var kf = !1, Ml = null, Al = null, Ol = null, xu = /* @__PURE__ */ new Map(), bu = /* @__PURE__ */ new Map(), Dl = [], Qx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Pm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ml = null;
        break;
      case "dragenter":
      case "dragleave":
        Al = null;
        break;
      case "mouseover":
      case "mouseout":
        Ol = null;
        break;
      case "pointerover":
      case "pointerout":
        xu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bu.delete(e.pointerId);
    }
  }
  function Eu(t, e, n, a, u, o) {
    return t === null || t.nativeEvent !== o ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: o,
      targetContainers: [u]
    }, e !== null && (e = ul(e), e !== null && km(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, u !== null && e.indexOf(u) === -1 && e.push(u), t);
  }
  function Kx(t, e, n, a, u) {
    switch (e) {
      case "focusin":
        return Ml = Eu(
          Ml,
          t,
          e,
          n,
          a,
          u
        ), !0;
      case "dragenter":
        return Al = Eu(
          Al,
          t,
          e,
          n,
          a,
          u
        ), !0;
      case "mouseover":
        return Ol = Eu(
          Ol,
          t,
          e,
          n,
          a,
          u
        ), !0;
      case "pointerover":
        var o = u.pointerId;
        return xu.set(
          o,
          Eu(
            xu.get(o) || null,
            t,
            e,
            n,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return o = u.pointerId, bu.set(
          o,
          Eu(
            bu.get(o) || null,
            t,
            e,
            n,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function ty(t) {
    var e = Ln(t.target);
    if (e !== null) {
      var n = f(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = d(n), e !== null) {
            t.blockedOn = e, ao(t.priority, function() {
              Fm(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = g(n), e !== null) {
            t.blockedOn = e, ao(t.priority, function() {
              Fm(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Tc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Jf(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        Or = a, n.target.dispatchEvent(a), Or = null;
      } else
        return e = ul(n), e !== null && km(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function ey(t, e, n) {
    Tc(t) && n.delete(e);
  }
  function $x() {
    kf = !1, Ml !== null && Tc(Ml) && (Ml = null), Al !== null && Tc(Al) && (Al = null), Ol !== null && Tc(Ol) && (Ol = null), xu.forEach(ey), bu.forEach(ey);
  }
  function zc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, kf || (kf = !0, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      $x
    )));
  }
  var Cc = null;
  function ny(t) {
    Cc !== t && (Cc = t, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      function() {
        Cc === t && (Cc = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], a = t[e + 1], u = t[e + 2];
          if (typeof a != "function") {
            if (If(a || n) === null)
              continue;
            break;
          }
          var o = ul(n);
          o !== null && (t.splice(e, 3), e -= 3, As(
            o,
            {
              pending: !0,
              data: u,
              method: n.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function hi(t) {
    function e(M) {
      return zc(M, t);
    }
    Ml !== null && zc(Ml, t), Al !== null && zc(Al, t), Ol !== null && zc(Ol, t), xu.forEach(e), bu.forEach(e);
    for (var n = 0; n < Dl.length; n++) {
      var a = Dl[n];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Dl.length && (n = Dl[0], n.blockedOn === null); )
      ty(n), n.blockedOn === null && Dl.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var u = n[a], o = n[a + 1], h = u[xe] || null;
        if (typeof o == "function")
          h || ny(n);
        else if (h) {
          var x = null;
          if (o && o.hasAttribute("formAction")) {
            if (u = o, h = o[xe] || null)
              x = h.formAction;
            else if (If(u) !== null) continue;
          } else x = h.action;
          typeof x == "function" ? n[a + 1] = x : (n.splice(a, 3), a -= 3), ny(n);
        }
      }
  }
  function ly() {
    function t(o) {
      o.canIntercept && o.info === "react-transition" && o.intercept({
        handler: function() {
          return new Promise(function(h) {
            return u = h;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      u !== null && (u(), u = null), a || setTimeout(n, 20);
    }
    function n() {
      if (!a && !navigation.transition) {
        var o = navigation.currentEntry;
        o && o.url != null && navigation.navigate(o.url, {
          state: o.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), u !== null && (u(), u = null);
      };
    }
  }
  function Ff(t) {
    this._internalRoot = t;
  }
  Mc.prototype.render = Ff.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, a = Qe();
    Jm(n, a, t, e, null, null);
  }, Mc.prototype.unmount = Ff.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Jm(t.current, 2, null, t, null, null), hc(), e[il] = null;
    }
  };
  function Mc(t) {
    this._internalRoot = t;
  }
  Mc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = lo();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Dl.length && e !== 0 && e < Dl[n].priority; n++) ;
      Dl.splice(n, 0, t), n === 0 && ty(t);
    }
  };
  var ay = i.version;
  if (ay !== "19.3.0")
    throw Error(
      r(
        527,
        ay,
        "19.3.0"
      )
    );
  st.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = S(e), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Jx = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: rt,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ac = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ac.isDisabled && Ac.supportsFiber)
      try {
        ql = Ac.inject(
          Jx
        ), we = Ac;
      } catch {
      }
  }
  return wu.createRoot = function(t, e) {
    if (!s(t)) throw Error(r(299));
    var n = !1, a = "", u = $0, o = J0, h = I0;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (o = e.onCaughtError), e.onRecoverableError !== void 0 && (h = e.onRecoverableError)), e = Km(
      t,
      1,
      !1,
      null,
      null,
      n,
      a,
      null,
      u,
      o,
      h,
      ly
    ), t[il] = e.current, zf(t), new Ff(e);
  }, wu.hydrateRoot = function(t, e, n) {
    if (!s(t)) throw Error(r(299));
    var a = !1, u = "", o = $0, h = J0, x = I0, M = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (o = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError), n.formState !== void 0 && (M = n.formState)), e = Km(
      t,
      1,
      !0,
      e,
      n ?? null,
      a,
      u,
      M,
      o,
      h,
      x,
      ly
    ), e.context = $m(null), n = e.current, a = Qe(), a = Ta(a), u = yl(a), u.callback = null, vl(n, u, a), n = a, e.current.lanes = n, Zl(e, n), Un(e), t[il] = e.current, zf(t), new Mc(e);
  }, wu.version = "19.3.0", wu;
}
var gy;
function cb() {
  if (gy) return ed.exports;
  gy = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), ed.exports = ob(), ed.exports;
}
var Rd = cb();
const rb = /* @__PURE__ */ qu(Rd);
function ue(l) {
  if (typeof l == "string" || typeof l == "number") return "" + l;
  let i = "";
  if (Array.isArray(l))
    for (let c = 0, r; c < l.length; c++)
      (r = ue(l[c])) !== "" && (i += (i && " ") + r);
  else
    for (let c in l)
      l[c] && (i += (i && " ") + c);
  return i;
}
var sb = { value: () => {
} };
function er() {
  for (var l = 0, i = arguments.length, c = {}, r; l < i; ++l) {
    if (!(r = arguments[l] + "") || r in c || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    c[r] = [];
  }
  return new Lc(c);
}
function Lc(l) {
  this._ = l;
}
function fb(l, i) {
  return l.trim().split(/^|\s+/).map(function(c) {
    var r = "", s = c.indexOf(".");
    if (s >= 0 && (r = c.slice(s + 1), c = c.slice(0, s)), c && !i.hasOwnProperty(c)) throw new Error("unknown type: " + c);
    return { type: c, name: r };
  });
}
Lc.prototype = er.prototype = {
  constructor: Lc,
  on: function(l, i) {
    var c = this._, r = fb(l + "", c), s, f = -1, d = r.length;
    if (arguments.length < 2) {
      for (; ++f < d; ) if ((s = (l = r[f]).type) && (s = db(c[s], l.name))) return s;
      return;
    }
    if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
    for (; ++f < d; )
      if (s = (l = r[f]).type) c[s] = my(c[s], l.name, i);
      else if (i == null) for (s in c) c[s] = my(c[s], l.name, null);
    return this;
  },
  copy: function() {
    var l = {}, i = this._;
    for (var c in i) l[c] = i[c].slice();
    return new Lc(l);
  },
  call: function(l, i) {
    if ((s = arguments.length - 2) > 0) for (var c = new Array(s), r = 0, s, f; r < s; ++r) c[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(l)) throw new Error("unknown type: " + l);
    for (f = this._[l], r = 0, s = f.length; r < s; ++r) f[r].value.apply(i, c);
  },
  apply: function(l, i, c) {
    if (!this._.hasOwnProperty(l)) throw new Error("unknown type: " + l);
    for (var r = this._[l], s = 0, f = r.length; s < f; ++s) r[s].value.apply(i, c);
  }
};
function db(l, i) {
  for (var c = 0, r = l.length, s; c < r; ++c)
    if ((s = l[c]).name === i)
      return s.value;
}
function my(l, i, c) {
  for (var r = 0, s = l.length; r < s; ++r)
    if (l[r].name === i) {
      l[r] = sb, l = l.slice(0, r).concat(l.slice(r + 1));
      break;
    }
  return c != null && l.push({ name: i, value: c }), l;
}
var pd = "http://www.w3.org/1999/xhtml";
const yy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: pd,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function nr(l) {
  var i = l += "", c = i.indexOf(":");
  return c >= 0 && (i = l.slice(0, c)) !== "xmlns" && (l = l.slice(c + 1)), yy.hasOwnProperty(i) ? { space: yy[i], local: l } : l;
}
function hb(l) {
  return function() {
    var i = this.ownerDocument, c = this.namespaceURI;
    return c === pd && i.documentElement.namespaceURI === pd ? i.createElement(l) : i.createElementNS(c, l);
  };
}
function gb(l) {
  return function() {
    return this.ownerDocument.createElementNS(l.space, l.local);
  };
}
function Nv(l) {
  var i = nr(l);
  return (i.local ? gb : hb)(i);
}
function mb() {
}
function Hd(l) {
  return l == null ? mb : function() {
    return this.querySelector(l);
  };
}
function yb(l) {
  typeof l != "function" && (l = Hd(l));
  for (var i = this._groups, c = i.length, r = new Array(c), s = 0; s < c; ++s)
    for (var f = i[s], d = f.length, g = r[s] = new Array(d), p, S, y = 0; y < d; ++y)
      (p = f[y]) && (S = l.call(p, p.__data__, y, f)) && ("__data__" in p && (S.__data__ = p.__data__), g[y] = S);
  return new Je(r, this._parents);
}
function vb(l) {
  return l == null ? [] : Array.isArray(l) ? l : Array.from(l);
}
function pb() {
  return [];
}
function Tv(l) {
  return l == null ? pb : function() {
    return this.querySelectorAll(l);
  };
}
function Sb(l) {
  return function() {
    return vb(l.apply(this, arguments));
  };
}
function xb(l) {
  typeof l == "function" ? l = Sb(l) : l = Tv(l);
  for (var i = this._groups, c = i.length, r = [], s = [], f = 0; f < c; ++f)
    for (var d = i[f], g = d.length, p, S = 0; S < g; ++S)
      (p = d[S]) && (r.push(l.call(p, p.__data__, S, d)), s.push(p));
  return new Je(r, s);
}
function zv(l) {
  return function() {
    return this.matches(l);
  };
}
function Cv(l) {
  return function(i) {
    return i.matches(l);
  };
}
var bb = Array.prototype.find;
function Eb(l) {
  return function() {
    return bb.call(this.children, l);
  };
}
function _b() {
  return this.firstElementChild;
}
function wb(l) {
  return this.select(l == null ? _b : Eb(typeof l == "function" ? l : Cv(l)));
}
var Nb = Array.prototype.filter;
function Tb() {
  return Array.from(this.children);
}
function zb(l) {
  return function() {
    return Nb.call(this.children, l);
  };
}
function Cb(l) {
  return this.selectAll(l == null ? Tb : zb(typeof l == "function" ? l : Cv(l)));
}
function Mb(l) {
  typeof l != "function" && (l = zv(l));
  for (var i = this._groups, c = i.length, r = new Array(c), s = 0; s < c; ++s)
    for (var f = i[s], d = f.length, g = r[s] = [], p, S = 0; S < d; ++S)
      (p = f[S]) && l.call(p, p.__data__, S, f) && g.push(p);
  return new Je(r, this._parents);
}
function Mv(l) {
  return new Array(l.length);
}
function Ab() {
  return new Je(this._enter || this._groups.map(Mv), this._parents);
}
function Qc(l, i) {
  this.ownerDocument = l.ownerDocument, this.namespaceURI = l.namespaceURI, this._next = null, this._parent = l, this.__data__ = i;
}
Qc.prototype = {
  constructor: Qc,
  appendChild: function(l) {
    return this._parent.insertBefore(l, this._next);
  },
  insertBefore: function(l, i) {
    return this._parent.insertBefore(l, i);
  },
  querySelector: function(l) {
    return this._parent.querySelector(l);
  },
  querySelectorAll: function(l) {
    return this._parent.querySelectorAll(l);
  }
};
function Ob(l) {
  return function() {
    return l;
  };
}
function Db(l, i, c, r, s, f) {
  for (var d = 0, g, p = i.length, S = f.length; d < S; ++d)
    (g = i[d]) ? (g.__data__ = f[d], r[d] = g) : c[d] = new Qc(l, f[d]);
  for (; d < p; ++d)
    (g = i[d]) && (s[d] = g);
}
function Rb(l, i, c, r, s, f, d) {
  var g, p, S = /* @__PURE__ */ new Map(), y = i.length, m = f.length, v = new Array(y), b;
  for (g = 0; g < y; ++g)
    (p = i[g]) && (v[g] = b = d.call(p, p.__data__, g, i) + "", S.has(b) ? s[g] = p : S.set(b, p));
  for (g = 0; g < m; ++g)
    b = d.call(l, f[g], g, f) + "", (p = S.get(b)) ? (r[g] = p, p.__data__ = f[g], S.delete(b)) : c[g] = new Qc(l, f[g]);
  for (g = 0; g < y; ++g)
    (p = i[g]) && S.get(v[g]) === p && (s[g] = p);
}
function Hb(l) {
  return l.__data__;
}
function Ub(l, i) {
  if (!arguments.length) return Array.from(this, Hb);
  var c = i ? Rb : Db, r = this._parents, s = this._groups;
  typeof l != "function" && (l = Ob(l));
  for (var f = s.length, d = new Array(f), g = new Array(f), p = new Array(f), S = 0; S < f; ++S) {
    var y = r[S], m = s[S], v = m.length, b = Bb(l.call(y, y && y.__data__, S, r)), E = b.length, z = g[S] = new Array(E), w = d[S] = new Array(E), N = p[S] = new Array(v);
    c(y, m, z, w, N, b, i);
    for (var R = 0, _ = 0, A, G; R < E; ++R)
      if (A = z[R]) {
        for (R >= _ && (_ = R + 1); !(G = w[_]) && ++_ < E; ) ;
        A._next = G || null;
      }
  }
  return d = new Je(d, r), d._enter = g, d._exit = p, d;
}
function Bb(l) {
  return typeof l == "object" && "length" in l ? l : Array.from(l);
}
function Yb() {
  return new Je(this._exit || this._groups.map(Mv), this._parents);
}
function Vb(l, i, c) {
  var r = this.enter(), s = this, f = this.exit();
  return typeof l == "function" ? (r = l(r), r && (r = r.selection())) : r = r.append(l + ""), i != null && (s = i(s), s && (s = s.selection())), c == null ? f.remove() : c(f), r && s ? r.merge(s).order() : s;
}
function jb(l) {
  for (var i = l.selection ? l.selection() : l, c = this._groups, r = i._groups, s = c.length, f = r.length, d = Math.min(s, f), g = new Array(s), p = 0; p < d; ++p)
    for (var S = c[p], y = r[p], m = S.length, v = g[p] = new Array(m), b, E = 0; E < m; ++E)
      (b = S[E] || y[E]) && (v[E] = b);
  for (; p < s; ++p)
    g[p] = c[p];
  return new Je(g, this._parents);
}
function Lb() {
  for (var l = this._groups, i = -1, c = l.length; ++i < c; )
    for (var r = l[i], s = r.length - 1, f = r[s], d; --s >= 0; )
      (d = r[s]) && (f && d.compareDocumentPosition(f) ^ 4 && f.parentNode.insertBefore(d, f), f = d);
  return this;
}
function qb(l) {
  l || (l = Xb);
  function i(m, v) {
    return m && v ? l(m.__data__, v.__data__) : !m - !v;
  }
  for (var c = this._groups, r = c.length, s = new Array(r), f = 0; f < r; ++f) {
    for (var d = c[f], g = d.length, p = s[f] = new Array(g), S, y = 0; y < g; ++y)
      (S = d[y]) && (p[y] = S);
    p.sort(i);
  }
  return new Je(s, this._parents).order();
}
function Xb(l, i) {
  return l < i ? -1 : l > i ? 1 : l >= i ? 0 : NaN;
}
function Zb() {
  var l = arguments[0];
  return arguments[0] = this, l.apply(null, arguments), this;
}
function Gb() {
  return Array.from(this);
}
function Qb() {
  for (var l = this._groups, i = 0, c = l.length; i < c; ++i)
    for (var r = l[i], s = 0, f = r.length; s < f; ++s) {
      var d = r[s];
      if (d) return d;
    }
  return null;
}
function Kb() {
  let l = 0;
  for (const i of this) ++l;
  return l;
}
function $b() {
  return !this.node();
}
function Jb(l) {
  for (var i = this._groups, c = 0, r = i.length; c < r; ++c)
    for (var s = i[c], f = 0, d = s.length, g; f < d; ++f)
      (g = s[f]) && l.call(g, g.__data__, f, s);
  return this;
}
function Ib(l) {
  return function() {
    this.removeAttribute(l);
  };
}
function kb(l) {
  return function() {
    this.removeAttributeNS(l.space, l.local);
  };
}
function Fb(l, i) {
  return function() {
    this.setAttribute(l, i);
  };
}
function Wb(l, i) {
  return function() {
    this.setAttributeNS(l.space, l.local, i);
  };
}
function Pb(l, i) {
  return function() {
    var c = i.apply(this, arguments);
    c == null ? this.removeAttribute(l) : this.setAttribute(l, c);
  };
}
function tE(l, i) {
  return function() {
    var c = i.apply(this, arguments);
    c == null ? this.removeAttributeNS(l.space, l.local) : this.setAttributeNS(l.space, l.local, c);
  };
}
function eE(l, i) {
  var c = nr(l);
  if (arguments.length < 2) {
    var r = this.node();
    return c.local ? r.getAttributeNS(c.space, c.local) : r.getAttribute(c);
  }
  return this.each((i == null ? c.local ? kb : Ib : typeof i == "function" ? c.local ? tE : Pb : c.local ? Wb : Fb)(c, i));
}
function Av(l) {
  return l.ownerDocument && l.ownerDocument.defaultView || l.document && l || l.defaultView;
}
function nE(l) {
  return function() {
    this.style.removeProperty(l);
  };
}
function lE(l, i, c) {
  return function() {
    this.style.setProperty(l, i, c);
  };
}
function aE(l, i, c) {
  return function() {
    var r = i.apply(this, arguments);
    r == null ? this.style.removeProperty(l) : this.style.setProperty(l, r, c);
  };
}
function iE(l, i, c) {
  return arguments.length > 1 ? this.each((i == null ? nE : typeof i == "function" ? aE : lE)(l, i, c ?? "")) : pi(this.node(), l);
}
function pi(l, i) {
  return l.style.getPropertyValue(i) || Av(l).getComputedStyle(l, null).getPropertyValue(i);
}
function uE(l) {
  return function() {
    delete this[l];
  };
}
function oE(l, i) {
  return function() {
    this[l] = i;
  };
}
function cE(l, i) {
  return function() {
    var c = i.apply(this, arguments);
    c == null ? delete this[l] : this[l] = c;
  };
}
function rE(l, i) {
  return arguments.length > 1 ? this.each((i == null ? uE : typeof i == "function" ? cE : oE)(l, i)) : this.node()[l];
}
function Ov(l) {
  return l.trim().split(/^|\s+/);
}
function Ud(l) {
  return l.classList || new Dv(l);
}
function Dv(l) {
  this._node = l, this._names = Ov(l.getAttribute("class") || "");
}
Dv.prototype = {
  add: function(l) {
    var i = this._names.indexOf(l);
    i < 0 && (this._names.push(l), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(l) {
    var i = this._names.indexOf(l);
    i >= 0 && (this._names.splice(i, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(l) {
    return this._names.indexOf(l) >= 0;
  }
};
function Rv(l, i) {
  for (var c = Ud(l), r = -1, s = i.length; ++r < s; ) c.add(i[r]);
}
function Hv(l, i) {
  for (var c = Ud(l), r = -1, s = i.length; ++r < s; ) c.remove(i[r]);
}
function sE(l) {
  return function() {
    Rv(this, l);
  };
}
function fE(l) {
  return function() {
    Hv(this, l);
  };
}
function dE(l, i) {
  return function() {
    (i.apply(this, arguments) ? Rv : Hv)(this, l);
  };
}
function hE(l, i) {
  var c = Ov(l + "");
  if (arguments.length < 2) {
    for (var r = Ud(this.node()), s = -1, f = c.length; ++s < f; ) if (!r.contains(c[s])) return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? dE : i ? sE : fE)(c, i));
}
function gE() {
  this.textContent = "";
}
function mE(l) {
  return function() {
    this.textContent = l;
  };
}
function yE(l) {
  return function() {
    var i = l.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function vE(l) {
  return arguments.length ? this.each(l == null ? gE : (typeof l == "function" ? yE : mE)(l)) : this.node().textContent;
}
function pE() {
  this.innerHTML = "";
}
function SE(l) {
  return function() {
    this.innerHTML = l;
  };
}
function xE(l) {
  return function() {
    var i = l.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function bE(l) {
  return arguments.length ? this.each(l == null ? pE : (typeof l == "function" ? xE : SE)(l)) : this.node().innerHTML;
}
function EE() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function _E() {
  return this.each(EE);
}
function wE() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function NE() {
  return this.each(wE);
}
function TE(l) {
  var i = typeof l == "function" ? l : Nv(l);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function zE() {
  return null;
}
function CE(l, i) {
  var c = typeof l == "function" ? l : Nv(l), r = i == null ? zE : typeof i == "function" ? i : Hd(i);
  return this.select(function() {
    return this.insertBefore(c.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ME() {
  var l = this.parentNode;
  l && l.removeChild(this);
}
function AE() {
  return this.each(ME);
}
function OE() {
  var l = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(l, this.nextSibling) : l;
}
function DE() {
  var l = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(l, this.nextSibling) : l;
}
function RE(l) {
  return this.select(l ? DE : OE);
}
function HE(l) {
  return arguments.length ? this.property("__data__", l) : this.node().__data__;
}
function UE(l) {
  return function(i) {
    l.call(this, i, this.__data__);
  };
}
function BE(l) {
  return l.trim().split(/^|\s+/).map(function(i) {
    var c = "", r = i.indexOf(".");
    return r >= 0 && (c = i.slice(r + 1), i = i.slice(0, r)), { type: i, name: c };
  });
}
function YE(l) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var c = 0, r = -1, s = i.length, f; c < s; ++c)
        f = i[c], (!l.type || f.type === l.type) && f.name === l.name ? this.removeEventListener(f.type, f.listener, f.options) : i[++r] = f;
      ++r ? i.length = r : delete this.__on;
    }
  };
}
function VE(l, i, c) {
  return function() {
    var r = this.__on, s, f = UE(i);
    if (r) {
      for (var d = 0, g = r.length; d < g; ++d)
        if ((s = r[d]).type === l.type && s.name === l.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = f, s.options = c), s.value = i;
          return;
        }
    }
    this.addEventListener(l.type, f, c), s = { type: l.type, name: l.name, value: i, listener: f, options: c }, r ? r.push(s) : this.__on = [s];
  };
}
function jE(l, i, c) {
  var r = BE(l + ""), s, f = r.length, d;
  if (arguments.length < 2) {
    var g = this.node().__on;
    if (g) {
      for (var p = 0, S = g.length, y; p < S; ++p)
        for (s = 0, y = g[p]; s < f; ++s)
          if ((d = r[s]).type === y.type && d.name === y.name)
            return y.value;
    }
    return;
  }
  for (g = i ? VE : YE, s = 0; s < f; ++s) this.each(g(r[s], i, c));
  return this;
}
function Uv(l, i, c) {
  var r = Av(l), s = r.CustomEvent;
  typeof s == "function" ? s = new s(i, c) : (s = r.document.createEvent("Event"), c ? (s.initEvent(i, c.bubbles, c.cancelable), s.detail = c.detail) : s.initEvent(i, !1, !1)), l.dispatchEvent(s);
}
function LE(l, i) {
  return function() {
    return Uv(this, l, i);
  };
}
function qE(l, i) {
  return function() {
    return Uv(this, l, i.apply(this, arguments));
  };
}
function XE(l, i) {
  return this.each((typeof i == "function" ? qE : LE)(l, i));
}
function* ZE() {
  for (var l = this._groups, i = 0, c = l.length; i < c; ++i)
    for (var r = l[i], s = 0, f = r.length, d; s < f; ++s)
      (d = r[s]) && (yield d);
}
var Bv = [null];
function Je(l, i) {
  this._groups = l, this._parents = i;
}
function Zu() {
  return new Je([[document.documentElement]], Bv);
}
function GE() {
  return this;
}
Je.prototype = Zu.prototype = {
  constructor: Je,
  select: yb,
  selectAll: xb,
  selectChild: wb,
  selectChildren: Cb,
  filter: Mb,
  data: Ub,
  enter: Ab,
  exit: Yb,
  join: Vb,
  merge: jb,
  selection: GE,
  order: Lb,
  sort: qb,
  call: Zb,
  nodes: Gb,
  node: Qb,
  size: Kb,
  empty: $b,
  each: Jb,
  attr: eE,
  style: iE,
  property: rE,
  classed: hE,
  text: vE,
  html: bE,
  raise: _E,
  lower: NE,
  append: TE,
  insert: CE,
  remove: AE,
  clone: RE,
  datum: HE,
  on: jE,
  dispatch: XE,
  [Symbol.iterator]: ZE
};
function $e(l) {
  return typeof l == "string" ? new Je([[document.querySelector(l)]], [document.documentElement]) : new Je([[l]], Bv);
}
function QE(l) {
  let i;
  for (; i = l.sourceEvent; ) l = i;
  return l;
}
function mn(l, i) {
  if (l = QE(l), i === void 0 && (i = l.currentTarget), i) {
    var c = i.ownerSVGElement || i;
    if (c.createSVGPoint) {
      var r = c.createSVGPoint();
      return r.x = l.clientX, r.y = l.clientY, r = r.matrixTransform(i.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (i.getBoundingClientRect) {
      var s = i.getBoundingClientRect();
      return [l.clientX - s.left - i.clientLeft, l.clientY - s.top - i.clientTop];
    }
  }
  return [l.pageX, l.pageY];
}
const KE = { passive: !1 }, Ou = { capture: !0, passive: !1 };
function ad(l) {
  l.stopImmediatePropagation();
}
function yi(l) {
  l.preventDefault(), l.stopImmediatePropagation();
}
function Yv(l) {
  var i = l.document.documentElement, c = $e(l).on("dragstart.drag", yi, Ou);
  "onselectstart" in i ? c.on("selectstart.drag", yi, Ou) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function Vv(l, i) {
  var c = l.document.documentElement, r = $e(l).on("dragstart.drag", null);
  i && (r.on("click.drag", yi, Ou), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in c ? r.on("selectstart.drag", null) : (c.style.MozUserSelect = c.__noselect, delete c.__noselect);
}
const Oc = (l) => () => l;
function Sd(l, {
  sourceEvent: i,
  subject: c,
  target: r,
  identifier: s,
  active: f,
  x: d,
  y: g,
  dx: p,
  dy: S,
  dispatch: y
}) {
  Object.defineProperties(this, {
    type: { value: l, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    subject: { value: c, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: f, enumerable: !0, configurable: !0 },
    x: { value: d, enumerable: !0, configurable: !0 },
    y: { value: g, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: S, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
Sd.prototype.on = function() {
  var l = this._.on.apply(this._, arguments);
  return l === this._ ? this : l;
};
function $E(l) {
  return !l.ctrlKey && !l.button;
}
function JE() {
  return this.parentNode;
}
function IE(l, i) {
  return i ?? { x: l.x, y: l.y };
}
function kE() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function jv() {
  var l = $E, i = JE, c = IE, r = kE, s = {}, f = er("start", "drag", "end"), d = 0, g, p, S, y, m = 0;
  function v(A) {
    A.on("mousedown.drag", b).filter(r).on("touchstart.drag", w).on("touchmove.drag", N, KE).on("touchend.drag touchcancel.drag", R).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function b(A, G) {
    if (!(y || !l.call(this, A, G))) {
      var B = _(this, i.call(this, A, G), A, G, "mouse");
      B && ($e(A.view).on("mousemove.drag", E, Ou).on("mouseup.drag", z, Ou), Yv(A.view), ad(A), S = !1, g = A.clientX, p = A.clientY, B("start", A));
    }
  }
  function E(A) {
    if (yi(A), !S) {
      var G = A.clientX - g, B = A.clientY - p;
      S = G * G + B * B > m;
    }
    s.mouse("drag", A);
  }
  function z(A) {
    $e(A.view).on("mousemove.drag mouseup.drag", null), Vv(A.view, S), yi(A), s.mouse("end", A);
  }
  function w(A, G) {
    if (l.call(this, A, G)) {
      var B = A.changedTouches, H = i.call(this, A, G), Q = B.length, Y, lt;
      for (Y = 0; Y < Q; ++Y)
        (lt = _(this, H, A, G, B[Y].identifier, B[Y])) && (ad(A), lt("start", A, B[Y]));
    }
  }
  function N(A) {
    var G = A.changedTouches, B = G.length, H, Q;
    for (H = 0; H < B; ++H)
      (Q = s[G[H].identifier]) && (yi(A), Q("drag", A, G[H]));
  }
  function R(A) {
    var G = A.changedTouches, B = G.length, H, Q;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), H = 0; H < B; ++H)
      (Q = s[G[H].identifier]) && (ad(A), Q("end", A, G[H]));
  }
  function _(A, G, B, H, Q, Y) {
    var lt = f.copy(), P = mn(Y || B, G), it, at, C;
    if ((C = c.call(A, new Sd("beforestart", {
      sourceEvent: B,
      target: v,
      identifier: Q,
      active: d,
      x: P[0],
      y: P[1],
      dx: 0,
      dy: 0,
      dispatch: lt
    }), H)) != null)
      return it = C.x - P[0] || 0, at = C.y - P[1] || 0, function j(O, U, Z) {
        var J = P, tt;
        switch (O) {
          case "start":
            s[Q] = j, tt = d++;
            break;
          case "end":
            delete s[Q], --d;
          // falls through
          case "drag":
            P = mn(Z || U, G), tt = d;
            break;
        }
        lt.call(
          O,
          A,
          new Sd(O, {
            sourceEvent: U,
            subject: C,
            target: v,
            identifier: Q,
            active: tt,
            x: P[0] + it,
            y: P[1] + at,
            dx: P[0] - J[0],
            dy: P[1] - J[1],
            dispatch: lt
          }),
          H
        );
      };
  }
  return v.filter = function(A) {
    return arguments.length ? (l = typeof A == "function" ? A : Oc(!!A), v) : l;
  }, v.container = function(A) {
    return arguments.length ? (i = typeof A == "function" ? A : Oc(A), v) : i;
  }, v.subject = function(A) {
    return arguments.length ? (c = typeof A == "function" ? A : Oc(A), v) : c;
  }, v.touchable = function(A) {
    return arguments.length ? (r = typeof A == "function" ? A : Oc(!!A), v) : r;
  }, v.on = function() {
    var A = f.on.apply(f, arguments);
    return A === f ? v : A;
  }, v.clickDistance = function(A) {
    return arguments.length ? (m = (A = +A) * A, v) : Math.sqrt(m);
  }, v;
}
function Bd(l, i, c) {
  l.prototype = i.prototype = c, c.constructor = l;
}
function Lv(l, i) {
  var c = Object.create(l.prototype);
  for (var r in i) c[r] = i[r];
  return c;
}
function Gu() {
}
var Du = 0.7, Kc = 1 / Du, vi = "\\s*([+-]?\\d+)\\s*", Ru = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Yn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", FE = /^#([0-9a-f]{3,8})$/, WE = new RegExp(`^rgb\\(${vi},${vi},${vi}\\)$`), PE = new RegExp(`^rgb\\(${Yn},${Yn},${Yn}\\)$`), t_ = new RegExp(`^rgba\\(${vi},${vi},${vi},${Ru}\\)$`), e_ = new RegExp(`^rgba\\(${Yn},${Yn},${Yn},${Ru}\\)$`), n_ = new RegExp(`^hsl\\(${Ru},${Yn},${Yn}\\)$`), l_ = new RegExp(`^hsla\\(${Ru},${Yn},${Yn},${Ru}\\)$`), vy = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Bd(Gu, ya, {
  copy(l) {
    return Object.assign(new this.constructor(), this, l);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: py,
  // Deprecated! Use color.formatHex.
  formatHex: py,
  formatHex8: a_,
  formatHsl: i_,
  formatRgb: Sy,
  toString: Sy
});
function py() {
  return this.rgb().formatHex();
}
function a_() {
  return this.rgb().formatHex8();
}
function i_() {
  return qv(this).formatHsl();
}
function Sy() {
  return this.rgb().formatRgb();
}
function ya(l) {
  var i, c;
  return l = (l + "").trim().toLowerCase(), (i = FE.exec(l)) ? (c = i[1].length, i = parseInt(i[1], 16), c === 6 ? xy(i) : c === 3 ? new Ye(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : c === 8 ? Dc(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : c === 4 ? Dc(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = WE.exec(l)) ? new Ye(i[1], i[2], i[3], 1) : (i = PE.exec(l)) ? new Ye(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = t_.exec(l)) ? Dc(i[1], i[2], i[3], i[4]) : (i = e_.exec(l)) ? Dc(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = n_.exec(l)) ? _y(i[1], i[2] / 100, i[3] / 100, 1) : (i = l_.exec(l)) ? _y(i[1], i[2] / 100, i[3] / 100, i[4]) : vy.hasOwnProperty(l) ? xy(vy[l]) : l === "transparent" ? new Ye(NaN, NaN, NaN, 0) : null;
}
function xy(l) {
  return new Ye(l >> 16 & 255, l >> 8 & 255, l & 255, 1);
}
function Dc(l, i, c, r) {
  return r <= 0 && (l = i = c = NaN), new Ye(l, i, c, r);
}
function u_(l) {
  return l instanceof Gu || (l = ya(l)), l ? (l = l.rgb(), new Ye(l.r, l.g, l.b, l.opacity)) : new Ye();
}
function xd(l, i, c, r) {
  return arguments.length === 1 ? u_(l) : new Ye(l, i, c, r ?? 1);
}
function Ye(l, i, c, r) {
  this.r = +l, this.g = +i, this.b = +c, this.opacity = +r;
}
Bd(Ye, xd, Lv(Gu, {
  brighter(l) {
    return l = l == null ? Kc : Math.pow(Kc, l), new Ye(this.r * l, this.g * l, this.b * l, this.opacity);
  },
  darker(l) {
    return l = l == null ? Du : Math.pow(Du, l), new Ye(this.r * l, this.g * l, this.b * l, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ye(ga(this.r), ga(this.g), ga(this.b), $c(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: by,
  // Deprecated! Use color.formatHex.
  formatHex: by,
  formatHex8: o_,
  formatRgb: Ey,
  toString: Ey
}));
function by() {
  return `#${ha(this.r)}${ha(this.g)}${ha(this.b)}`;
}
function o_() {
  return `#${ha(this.r)}${ha(this.g)}${ha(this.b)}${ha((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ey() {
  const l = $c(this.opacity);
  return `${l === 1 ? "rgb(" : "rgba("}${ga(this.r)}, ${ga(this.g)}, ${ga(this.b)}${l === 1 ? ")" : `, ${l})`}`;
}
function $c(l) {
  return isNaN(l) ? 1 : Math.max(0, Math.min(1, l));
}
function ga(l) {
  return Math.max(0, Math.min(255, Math.round(l) || 0));
}
function ha(l) {
  return l = ga(l), (l < 16 ? "0" : "") + l.toString(16);
}
function _y(l, i, c, r) {
  return r <= 0 ? l = i = c = NaN : c <= 0 || c >= 1 ? l = i = NaN : i <= 0 && (l = NaN), new yn(l, i, c, r);
}
function qv(l) {
  if (l instanceof yn) return new yn(l.h, l.s, l.l, l.opacity);
  if (l instanceof Gu || (l = ya(l)), !l) return new yn();
  if (l instanceof yn) return l;
  l = l.rgb();
  var i = l.r / 255, c = l.g / 255, r = l.b / 255, s = Math.min(i, c, r), f = Math.max(i, c, r), d = NaN, g = f - s, p = (f + s) / 2;
  return g ? (i === f ? d = (c - r) / g + (c < r) * 6 : c === f ? d = (r - i) / g + 2 : d = (i - c) / g + 4, g /= p < 0.5 ? f + s : 2 - f - s, d *= 60) : g = p > 0 && p < 1 ? 0 : d, new yn(d, g, p, l.opacity);
}
function c_(l, i, c, r) {
  return arguments.length === 1 ? qv(l) : new yn(l, i, c, r ?? 1);
}
function yn(l, i, c, r) {
  this.h = +l, this.s = +i, this.l = +c, this.opacity = +r;
}
Bd(yn, c_, Lv(Gu, {
  brighter(l) {
    return l = l == null ? Kc : Math.pow(Kc, l), new yn(this.h, this.s, this.l * l, this.opacity);
  },
  darker(l) {
    return l = l == null ? Du : Math.pow(Du, l), new yn(this.h, this.s, this.l * l, this.opacity);
  },
  rgb() {
    var l = this.h % 360 + (this.h < 0) * 360, i = isNaN(l) || isNaN(this.s) ? 0 : this.s, c = this.l, r = c + (c < 0.5 ? c : 1 - c) * i, s = 2 * c - r;
    return new Ye(
      id(l >= 240 ? l - 240 : l + 120, s, r),
      id(l, s, r),
      id(l < 120 ? l + 240 : l - 120, s, r),
      this.opacity
    );
  },
  clamp() {
    return new yn(wy(this.h), Rc(this.s), Rc(this.l), $c(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const l = $c(this.opacity);
    return `${l === 1 ? "hsl(" : "hsla("}${wy(this.h)}, ${Rc(this.s) * 100}%, ${Rc(this.l) * 100}%${l === 1 ? ")" : `, ${l})`}`;
  }
}));
function wy(l) {
  return l = (l || 0) % 360, l < 0 ? l + 360 : l;
}
function Rc(l) {
  return Math.max(0, Math.min(1, l || 0));
}
function id(l, i, c) {
  return (l < 60 ? i + (c - i) * l / 60 : l < 180 ? c : l < 240 ? i + (c - i) * (240 - l) / 60 : i) * 255;
}
const Yd = (l) => () => l;
function r_(l, i) {
  return function(c) {
    return l + c * i;
  };
}
function s_(l, i, c) {
  return l = Math.pow(l, c), i = Math.pow(i, c) - l, c = 1 / c, function(r) {
    return Math.pow(l + r * i, c);
  };
}
function f_(l) {
  return (l = +l) == 1 ? Xv : function(i, c) {
    return c - i ? s_(i, c, l) : Yd(isNaN(i) ? c : i);
  };
}
function Xv(l, i) {
  var c = i - l;
  return c ? r_(l, c) : Yd(isNaN(l) ? i : l);
}
const Jc = (function l(i) {
  var c = f_(i);
  function r(s, f) {
    var d = c((s = xd(s)).r, (f = xd(f)).r), g = c(s.g, f.g), p = c(s.b, f.b), S = Xv(s.opacity, f.opacity);
    return function(y) {
      return s.r = d(y), s.g = g(y), s.b = p(y), s.opacity = S(y), s + "";
    };
  }
  return r.gamma = l, r;
})(1);
function d_(l, i) {
  i || (i = []);
  var c = l ? Math.min(i.length, l.length) : 0, r = i.slice(), s;
  return function(f) {
    for (s = 0; s < c; ++s) r[s] = l[s] * (1 - f) + i[s] * f;
    return r;
  };
}
function h_(l) {
  return ArrayBuffer.isView(l) && !(l instanceof DataView);
}
function g_(l, i) {
  var c = i ? i.length : 0, r = l ? Math.min(c, l.length) : 0, s = new Array(r), f = new Array(c), d;
  for (d = 0; d < r; ++d) s[d] = Mu(l[d], i[d]);
  for (; d < c; ++d) f[d] = i[d];
  return function(g) {
    for (d = 0; d < r; ++d) f[d] = s[d](g);
    return f;
  };
}
function m_(l, i) {
  var c = /* @__PURE__ */ new Date();
  return l = +l, i = +i, function(r) {
    return c.setTime(l * (1 - r) + i * r), c;
  };
}
function Bn(l, i) {
  return l = +l, i = +i, function(c) {
    return l * (1 - c) + i * c;
  };
}
function y_(l, i) {
  var c = {}, r = {}, s;
  (l === null || typeof l != "object") && (l = {}), (i === null || typeof i != "object") && (i = {});
  for (s in i)
    s in l ? c[s] = Mu(l[s], i[s]) : r[s] = i[s];
  return function(f) {
    for (s in c) r[s] = c[s](f);
    return r;
  };
}
var bd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ud = new RegExp(bd.source, "g");
function v_(l) {
  return function() {
    return l;
  };
}
function p_(l) {
  return function(i) {
    return l(i) + "";
  };
}
function Zv(l, i) {
  var c = bd.lastIndex = ud.lastIndex = 0, r, s, f, d = -1, g = [], p = [];
  for (l = l + "", i = i + ""; (r = bd.exec(l)) && (s = ud.exec(i)); )
    (f = s.index) > c && (f = i.slice(c, f), g[d] ? g[d] += f : g[++d] = f), (r = r[0]) === (s = s[0]) ? g[d] ? g[d] += s : g[++d] = s : (g[++d] = null, p.push({ i: d, x: Bn(r, s) })), c = ud.lastIndex;
  return c < i.length && (f = i.slice(c), g[d] ? g[d] += f : g[++d] = f), g.length < 2 ? p[0] ? p_(p[0].x) : v_(i) : (i = p.length, function(S) {
    for (var y = 0, m; y < i; ++y) g[(m = p[y]).i] = m.x(S);
    return g.join("");
  });
}
function Mu(l, i) {
  var c = typeof i, r;
  return i == null || c === "boolean" ? Yd(i) : (c === "number" ? Bn : c === "string" ? (r = ya(i)) ? (i = r, Jc) : Zv : i instanceof ya ? Jc : i instanceof Date ? m_ : h_(i) ? d_ : Array.isArray(i) ? g_ : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? y_ : Bn)(l, i);
}
var Ny = 180 / Math.PI, Ed = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Gv(l, i, c, r, s, f) {
  var d, g, p;
  return (d = Math.sqrt(l * l + i * i)) && (l /= d, i /= d), (p = l * c + i * r) && (c -= l * p, r -= i * p), (g = Math.sqrt(c * c + r * r)) && (c /= g, r /= g, p /= g), l * r < i * c && (l = -l, i = -i, p = -p, d = -d), {
    translateX: s,
    translateY: f,
    rotate: Math.atan2(i, l) * Ny,
    skewX: Math.atan(p) * Ny,
    scaleX: d,
    scaleY: g
  };
}
var Hc;
function S_(l) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(l + "");
  return i.isIdentity ? Ed : Gv(i.a, i.b, i.c, i.d, i.e, i.f);
}
function x_(l) {
  return l == null || (Hc || (Hc = document.createElementNS("http://www.w3.org/2000/svg", "g")), Hc.setAttribute("transform", l), !(l = Hc.transform.baseVal.consolidate())) ? Ed : (l = l.matrix, Gv(l.a, l.b, l.c, l.d, l.e, l.f));
}
function Qv(l, i, c, r) {
  function s(S) {
    return S.length ? S.pop() + " " : "";
  }
  function f(S, y, m, v, b, E) {
    if (S !== m || y !== v) {
      var z = b.push("translate(", null, i, null, c);
      E.push({ i: z - 4, x: Bn(S, m) }, { i: z - 2, x: Bn(y, v) });
    } else (m || v) && b.push("translate(" + m + i + v + c);
  }
  function d(S, y, m, v) {
    S !== y ? (S - y > 180 ? y += 360 : y - S > 180 && (S += 360), v.push({ i: m.push(s(m) + "rotate(", null, r) - 2, x: Bn(S, y) })) : y && m.push(s(m) + "rotate(" + y + r);
  }
  function g(S, y, m, v) {
    S !== y ? v.push({ i: m.push(s(m) + "skewX(", null, r) - 2, x: Bn(S, y) }) : y && m.push(s(m) + "skewX(" + y + r);
  }
  function p(S, y, m, v, b, E) {
    if (S !== m || y !== v) {
      var z = b.push(s(b) + "scale(", null, ",", null, ")");
      E.push({ i: z - 4, x: Bn(S, m) }, { i: z - 2, x: Bn(y, v) });
    } else (m !== 1 || v !== 1) && b.push(s(b) + "scale(" + m + "," + v + ")");
  }
  return function(S, y) {
    var m = [], v = [];
    return S = l(S), y = l(y), f(S.translateX, S.translateY, y.translateX, y.translateY, m, v), d(S.rotate, y.rotate, m, v), g(S.skewX, y.skewX, m, v), p(S.scaleX, S.scaleY, y.scaleX, y.scaleY, m, v), S = y = null, function(b) {
      for (var E = -1, z = v.length, w; ++E < z; ) m[(w = v[E]).i] = w.x(b);
      return m.join("");
    };
  };
}
var b_ = Qv(S_, "px, ", "px)", "deg)"), E_ = Qv(x_, ", ", ")", ")"), __ = 1e-12;
function Ty(l) {
  return ((l = Math.exp(l)) + 1 / l) / 2;
}
function w_(l) {
  return ((l = Math.exp(l)) - 1 / l) / 2;
}
function N_(l) {
  return ((l = Math.exp(2 * l)) - 1) / (l + 1);
}
const qc = (function l(i, c, r) {
  function s(f, d) {
    var g = f[0], p = f[1], S = f[2], y = d[0], m = d[1], v = d[2], b = y - g, E = m - p, z = b * b + E * E, w, N;
    if (z < __)
      N = Math.log(v / S) / i, w = function(H) {
        return [
          g + H * b,
          p + H * E,
          S * Math.exp(i * H * N)
        ];
      };
    else {
      var R = Math.sqrt(z), _ = (v * v - S * S + r * z) / (2 * S * c * R), A = (v * v - S * S - r * z) / (2 * v * c * R), G = Math.log(Math.sqrt(_ * _ + 1) - _), B = Math.log(Math.sqrt(A * A + 1) - A);
      N = (B - G) / i, w = function(H) {
        var Q = H * N, Y = Ty(G), lt = S / (c * R) * (Y * N_(i * Q + G) - w_(G));
        return [
          g + lt * b,
          p + lt * E,
          S * Y / Ty(i * Q + G)
        ];
      };
    }
    return w.duration = N * 1e3 * i / Math.SQRT2, w;
  }
  return s.rho = function(f) {
    var d = Math.max(1e-3, +f), g = d * d, p = g * g;
    return l(d, g, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Si = 0, zu = 0, Nu = 0, Kv = 1e3, Ic, Cu, kc = 0, va = 0, lr = 0, Hu = typeof performance == "object" && performance.now ? performance : Date, $v = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(l) {
  setTimeout(l, 17);
};
function Vd() {
  return va || ($v(T_), va = Hu.now() + lr);
}
function T_() {
  va = 0;
}
function Fc() {
  this._call = this._time = this._next = null;
}
Fc.prototype = Jv.prototype = {
  constructor: Fc,
  restart: function(l, i, c) {
    if (typeof l != "function") throw new TypeError("callback is not a function");
    c = (c == null ? Vd() : +c) + (i == null ? 0 : +i), !this._next && Cu !== this && (Cu ? Cu._next = this : Ic = this, Cu = this), this._call = l, this._time = c, _d();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, _d());
  }
};
function Jv(l, i, c) {
  var r = new Fc();
  return r.restart(l, i, c), r;
}
function z_() {
  Vd(), ++Si;
  for (var l = Ic, i; l; )
    (i = va - l._time) >= 0 && l._call.call(void 0, i), l = l._next;
  --Si;
}
function zy() {
  va = (kc = Hu.now()) + lr, Si = zu = 0;
  try {
    z_();
  } finally {
    Si = 0, M_(), va = 0;
  }
}
function C_() {
  var l = Hu.now(), i = l - kc;
  i > Kv && (lr -= i, kc = l);
}
function M_() {
  for (var l, i = Ic, c, r = 1 / 0; i; )
    i._call ? (r > i._time && (r = i._time), l = i, i = i._next) : (c = i._next, i._next = null, i = l ? l._next = c : Ic = c);
  Cu = l, _d(r);
}
function _d(l) {
  if (!Si) {
    zu && (zu = clearTimeout(zu));
    var i = l - va;
    i > 24 ? (l < 1 / 0 && (zu = setTimeout(zy, l - Hu.now() - lr)), Nu && (Nu = clearInterval(Nu))) : (Nu || (kc = Hu.now(), Nu = setInterval(C_, Kv)), Si = 1, $v(zy));
  }
}
function Cy(l, i, c) {
  var r = new Fc();
  return i = i == null ? 0 : +i, r.restart((s) => {
    r.stop(), l(s + i);
  }, i, c), r;
}
var A_ = er("start", "end", "cancel", "interrupt"), O_ = [], Iv = 0, My = 1, wd = 2, Xc = 3, Ay = 4, Nd = 5, Zc = 6;
function ar(l, i, c, r, s, f) {
  var d = l.__transition;
  if (!d) l.__transition = {};
  else if (c in d) return;
  D_(l, c, {
    name: i,
    index: r,
    // For context during callback.
    group: s,
    // For context during callback.
    on: A_,
    tween: O_,
    time: f.time,
    delay: f.delay,
    duration: f.duration,
    ease: f.ease,
    timer: null,
    state: Iv
  });
}
function jd(l, i) {
  var c = xn(l, i);
  if (c.state > Iv) throw new Error("too late; already scheduled");
  return c;
}
function Vn(l, i) {
  var c = xn(l, i);
  if (c.state > Xc) throw new Error("too late; already running");
  return c;
}
function xn(l, i) {
  var c = l.__transition;
  if (!c || !(c = c[i])) throw new Error("transition not found");
  return c;
}
function D_(l, i, c) {
  var r = l.__transition, s;
  r[i] = c, c.timer = Jv(f, 0, c.time);
  function f(S) {
    c.state = My, c.timer.restart(d, c.delay, c.time), c.delay <= S && d(S - c.delay);
  }
  function d(S) {
    var y, m, v, b;
    if (c.state !== My) return p();
    for (y in r)
      if (b = r[y], b.name === c.name) {
        if (b.state === Xc) return Cy(d);
        b.state === Ay ? (b.state = Zc, b.timer.stop(), b.on.call("interrupt", l, l.__data__, b.index, b.group), delete r[y]) : +y < i && (b.state = Zc, b.timer.stop(), b.on.call("cancel", l, l.__data__, b.index, b.group), delete r[y]);
      }
    if (Cy(function() {
      c.state === Xc && (c.state = Ay, c.timer.restart(g, c.delay, c.time), g(S));
    }), c.state = wd, c.on.call("start", l, l.__data__, c.index, c.group), c.state === wd) {
      for (c.state = Xc, s = new Array(v = c.tween.length), y = 0, m = -1; y < v; ++y)
        (b = c.tween[y].value.call(l, l.__data__, c.index, c.group)) && (s[++m] = b);
      s.length = m + 1;
    }
  }
  function g(S) {
    for (var y = S < c.duration ? c.ease.call(null, S / c.duration) : (c.timer.restart(p), c.state = Nd, 1), m = -1, v = s.length; ++m < v; )
      s[m].call(l, y);
    c.state === Nd && (c.on.call("end", l, l.__data__, c.index, c.group), p());
  }
  function p() {
    c.state = Zc, c.timer.stop(), delete r[i];
    for (var S in r) return;
    delete l.__transition;
  }
}
function Gc(l, i) {
  var c = l.__transition, r, s, f = !0, d;
  if (c) {
    i = i == null ? null : i + "";
    for (d in c) {
      if ((r = c[d]).name !== i) {
        f = !1;
        continue;
      }
      s = r.state > wd && r.state < Nd, r.state = Zc, r.timer.stop(), r.on.call(s ? "interrupt" : "cancel", l, l.__data__, r.index, r.group), delete c[d];
    }
    f && delete l.__transition;
  }
}
function R_(l) {
  return this.each(function() {
    Gc(this, l);
  });
}
function H_(l, i) {
  var c, r;
  return function() {
    var s = Vn(this, l), f = s.tween;
    if (f !== c) {
      r = c = f;
      for (var d = 0, g = r.length; d < g; ++d)
        if (r[d].name === i) {
          r = r.slice(), r.splice(d, 1);
          break;
        }
    }
    s.tween = r;
  };
}
function U_(l, i, c) {
  var r, s;
  if (typeof c != "function") throw new Error();
  return function() {
    var f = Vn(this, l), d = f.tween;
    if (d !== r) {
      s = (r = d).slice();
      for (var g = { name: i, value: c }, p = 0, S = s.length; p < S; ++p)
        if (s[p].name === i) {
          s[p] = g;
          break;
        }
      p === S && s.push(g);
    }
    f.tween = s;
  };
}
function B_(l, i) {
  var c = this._id;
  if (l += "", arguments.length < 2) {
    for (var r = xn(this.node(), c).tween, s = 0, f = r.length, d; s < f; ++s)
      if ((d = r[s]).name === l)
        return d.value;
    return null;
  }
  return this.each((i == null ? H_ : U_)(c, l, i));
}
function Ld(l, i, c) {
  var r = l._id;
  return l.each(function() {
    var s = Vn(this, r);
    (s.value || (s.value = {}))[i] = c.apply(this, arguments);
  }), function(s) {
    return xn(s, r).value[i];
  };
}
function kv(l, i) {
  var c;
  return (typeof i == "number" ? Bn : i instanceof ya ? Jc : (c = ya(i)) ? (i = c, Jc) : Zv)(l, i);
}
function Y_(l) {
  return function() {
    this.removeAttribute(l);
  };
}
function V_(l) {
  return function() {
    this.removeAttributeNS(l.space, l.local);
  };
}
function j_(l, i, c) {
  var r, s = c + "", f;
  return function() {
    var d = this.getAttribute(l);
    return d === s ? null : d === r ? f : f = i(r = d, c);
  };
}
function L_(l, i, c) {
  var r, s = c + "", f;
  return function() {
    var d = this.getAttributeNS(l.space, l.local);
    return d === s ? null : d === r ? f : f = i(r = d, c);
  };
}
function q_(l, i, c) {
  var r, s, f;
  return function() {
    var d, g = c(this), p;
    return g == null ? void this.removeAttribute(l) : (d = this.getAttribute(l), p = g + "", d === p ? null : d === r && p === s ? f : (s = p, f = i(r = d, g)));
  };
}
function X_(l, i, c) {
  var r, s, f;
  return function() {
    var d, g = c(this), p;
    return g == null ? void this.removeAttributeNS(l.space, l.local) : (d = this.getAttributeNS(l.space, l.local), p = g + "", d === p ? null : d === r && p === s ? f : (s = p, f = i(r = d, g)));
  };
}
function Z_(l, i) {
  var c = nr(l), r = c === "transform" ? E_ : kv;
  return this.attrTween(l, typeof i == "function" ? (c.local ? X_ : q_)(c, r, Ld(this, "attr." + l, i)) : i == null ? (c.local ? V_ : Y_)(c) : (c.local ? L_ : j_)(c, r, i));
}
function G_(l, i) {
  return function(c) {
    this.setAttribute(l, i.call(this, c));
  };
}
function Q_(l, i) {
  return function(c) {
    this.setAttributeNS(l.space, l.local, i.call(this, c));
  };
}
function K_(l, i) {
  var c, r;
  function s() {
    var f = i.apply(this, arguments);
    return f !== r && (c = (r = f) && Q_(l, f)), c;
  }
  return s._value = i, s;
}
function $_(l, i) {
  var c, r;
  function s() {
    var f = i.apply(this, arguments);
    return f !== r && (c = (r = f) && G_(l, f)), c;
  }
  return s._value = i, s;
}
function J_(l, i) {
  var c = "attr." + l;
  if (arguments.length < 2) return (c = this.tween(c)) && c._value;
  if (i == null) return this.tween(c, null);
  if (typeof i != "function") throw new Error();
  var r = nr(l);
  return this.tween(c, (r.local ? K_ : $_)(r, i));
}
function I_(l, i) {
  return function() {
    jd(this, l).delay = +i.apply(this, arguments);
  };
}
function k_(l, i) {
  return i = +i, function() {
    jd(this, l).delay = i;
  };
}
function F_(l) {
  var i = this._id;
  return arguments.length ? this.each((typeof l == "function" ? I_ : k_)(i, l)) : xn(this.node(), i).delay;
}
function W_(l, i) {
  return function() {
    Vn(this, l).duration = +i.apply(this, arguments);
  };
}
function P_(l, i) {
  return i = +i, function() {
    Vn(this, l).duration = i;
  };
}
function t2(l) {
  var i = this._id;
  return arguments.length ? this.each((typeof l == "function" ? W_ : P_)(i, l)) : xn(this.node(), i).duration;
}
function e2(l, i) {
  if (typeof i != "function") throw new Error();
  return function() {
    Vn(this, l).ease = i;
  };
}
function n2(l) {
  var i = this._id;
  return arguments.length ? this.each(e2(i, l)) : xn(this.node(), i).ease;
}
function l2(l, i) {
  return function() {
    var c = i.apply(this, arguments);
    if (typeof c != "function") throw new Error();
    Vn(this, l).ease = c;
  };
}
function a2(l) {
  if (typeof l != "function") throw new Error();
  return this.each(l2(this._id, l));
}
function i2(l) {
  typeof l != "function" && (l = zv(l));
  for (var i = this._groups, c = i.length, r = new Array(c), s = 0; s < c; ++s)
    for (var f = i[s], d = f.length, g = r[s] = [], p, S = 0; S < d; ++S)
      (p = f[S]) && l.call(p, p.__data__, S, f) && g.push(p);
  return new al(r, this._parents, this._name, this._id);
}
function u2(l) {
  if (l._id !== this._id) throw new Error();
  for (var i = this._groups, c = l._groups, r = i.length, s = c.length, f = Math.min(r, s), d = new Array(r), g = 0; g < f; ++g)
    for (var p = i[g], S = c[g], y = p.length, m = d[g] = new Array(y), v, b = 0; b < y; ++b)
      (v = p[b] || S[b]) && (m[b] = v);
  for (; g < r; ++g)
    d[g] = i[g];
  return new al(d, this._parents, this._name, this._id);
}
function o2(l) {
  return (l + "").trim().split(/^|\s+/).every(function(i) {
    var c = i.indexOf(".");
    return c >= 0 && (i = i.slice(0, c)), !i || i === "start";
  });
}
function c2(l, i, c) {
  var r, s, f = o2(i) ? jd : Vn;
  return function() {
    var d = f(this, l), g = d.on;
    g !== r && (s = (r = g).copy()).on(i, c), d.on = s;
  };
}
function r2(l, i) {
  var c = this._id;
  return arguments.length < 2 ? xn(this.node(), c).on.on(l) : this.each(c2(c, l, i));
}
function s2(l) {
  return function() {
    var i = this.parentNode;
    for (var c in this.__transition) if (+c !== l) return;
    i && i.removeChild(this);
  };
}
function f2() {
  return this.on("end.remove", s2(this._id));
}
function d2(l) {
  var i = this._name, c = this._id;
  typeof l != "function" && (l = Hd(l));
  for (var r = this._groups, s = r.length, f = new Array(s), d = 0; d < s; ++d)
    for (var g = r[d], p = g.length, S = f[d] = new Array(p), y, m, v = 0; v < p; ++v)
      (y = g[v]) && (m = l.call(y, y.__data__, v, g)) && ("__data__" in y && (m.__data__ = y.__data__), S[v] = m, ar(S[v], i, c, v, S, xn(y, c)));
  return new al(f, this._parents, i, c);
}
function h2(l) {
  var i = this._name, c = this._id;
  typeof l != "function" && (l = Tv(l));
  for (var r = this._groups, s = r.length, f = [], d = [], g = 0; g < s; ++g)
    for (var p = r[g], S = p.length, y, m = 0; m < S; ++m)
      if (y = p[m]) {
        for (var v = l.call(y, y.__data__, m, p), b, E = xn(y, c), z = 0, w = v.length; z < w; ++z)
          (b = v[z]) && ar(b, i, c, z, v, E);
        f.push(v), d.push(y);
      }
  return new al(f, d, i, c);
}
var g2 = Zu.prototype.constructor;
function m2() {
  return new g2(this._groups, this._parents);
}
function y2(l, i) {
  var c, r, s;
  return function() {
    var f = pi(this, l), d = (this.style.removeProperty(l), pi(this, l));
    return f === d ? null : f === c && d === r ? s : s = i(c = f, r = d);
  };
}
function Fv(l) {
  return function() {
    this.style.removeProperty(l);
  };
}
function v2(l, i, c) {
  var r, s = c + "", f;
  return function() {
    var d = pi(this, l);
    return d === s ? null : d === r ? f : f = i(r = d, c);
  };
}
function p2(l, i, c) {
  var r, s, f;
  return function() {
    var d = pi(this, l), g = c(this), p = g + "";
    return g == null && (p = g = (this.style.removeProperty(l), pi(this, l))), d === p ? null : d === r && p === s ? f : (s = p, f = i(r = d, g));
  };
}
function S2(l, i) {
  var c, r, s, f = "style." + i, d = "end." + f, g;
  return function() {
    var p = Vn(this, l), S = p.on, y = p.value[f] == null ? g || (g = Fv(i)) : void 0;
    (S !== c || s !== y) && (r = (c = S).copy()).on(d, s = y), p.on = r;
  };
}
function x2(l, i, c) {
  var r = (l += "") == "transform" ? b_ : kv;
  return i == null ? this.styleTween(l, y2(l, r)).on("end.style." + l, Fv(l)) : typeof i == "function" ? this.styleTween(l, p2(l, r, Ld(this, "style." + l, i))).each(S2(this._id, l)) : this.styleTween(l, v2(l, r, i), c).on("end.style." + l, null);
}
function b2(l, i, c) {
  return function(r) {
    this.style.setProperty(l, i.call(this, r), c);
  };
}
function E2(l, i, c) {
  var r, s;
  function f() {
    var d = i.apply(this, arguments);
    return d !== s && (r = (s = d) && b2(l, d, c)), r;
  }
  return f._value = i, f;
}
function _2(l, i, c) {
  var r = "style." + (l += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (i == null) return this.tween(r, null);
  if (typeof i != "function") throw new Error();
  return this.tween(r, E2(l, i, c ?? ""));
}
function w2(l) {
  return function() {
    this.textContent = l;
  };
}
function N2(l) {
  return function() {
    var i = l(this);
    this.textContent = i ?? "";
  };
}
function T2(l) {
  return this.tween("text", typeof l == "function" ? N2(Ld(this, "text", l)) : w2(l == null ? "" : l + ""));
}
function z2(l) {
  return function(i) {
    this.textContent = l.call(this, i);
  };
}
function C2(l) {
  var i, c;
  function r() {
    var s = l.apply(this, arguments);
    return s !== c && (i = (c = s) && z2(s)), i;
  }
  return r._value = l, r;
}
function M2(l) {
  var i = "text";
  if (arguments.length < 1) return (i = this.tween(i)) && i._value;
  if (l == null) return this.tween(i, null);
  if (typeof l != "function") throw new Error();
  return this.tween(i, C2(l));
}
function A2() {
  for (var l = this._name, i = this._id, c = Wv(), r = this._groups, s = r.length, f = 0; f < s; ++f)
    for (var d = r[f], g = d.length, p, S = 0; S < g; ++S)
      if (p = d[S]) {
        var y = xn(p, i);
        ar(p, l, c, S, d, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new al(r, this._parents, l, c);
}
function O2() {
  var l, i, c = this, r = c._id, s = c.size();
  return new Promise(function(f, d) {
    var g = { value: d }, p = { value: function() {
      --s === 0 && f();
    } };
    c.each(function() {
      var S = Vn(this, r), y = S.on;
      y !== l && (i = (l = y).copy(), i._.cancel.push(g), i._.interrupt.push(g), i._.end.push(p)), S.on = i;
    }), s === 0 && f();
  });
}
var D2 = 0;
function al(l, i, c, r) {
  this._groups = l, this._parents = i, this._name = c, this._id = r;
}
function Wv() {
  return ++D2;
}
var nl = Zu.prototype;
al.prototype = {
  constructor: al,
  select: d2,
  selectAll: h2,
  selectChild: nl.selectChild,
  selectChildren: nl.selectChildren,
  filter: i2,
  merge: u2,
  selection: m2,
  transition: A2,
  call: nl.call,
  nodes: nl.nodes,
  node: nl.node,
  size: nl.size,
  empty: nl.empty,
  each: nl.each,
  on: r2,
  attr: Z_,
  attrTween: J_,
  style: x2,
  styleTween: _2,
  text: T2,
  textTween: M2,
  remove: f2,
  tween: B_,
  delay: F_,
  duration: t2,
  ease: n2,
  easeVarying: a2,
  end: O2,
  [Symbol.iterator]: nl[Symbol.iterator]
};
function R2(l) {
  return ((l *= 2) <= 1 ? l * l * l : (l -= 2) * l * l + 2) / 2;
}
var H2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: R2
};
function U2(l, i) {
  for (var c; !(c = l.__transition) || !(c = c[i]); )
    if (!(l = l.parentNode))
      throw new Error(`transition ${i} not found`);
  return c;
}
function B2(l) {
  var i, c;
  l instanceof al ? (i = l._id, l = l._name) : (i = Wv(), (c = H2).time = Vd(), l = l == null ? null : l + "");
  for (var r = this._groups, s = r.length, f = 0; f < s; ++f)
    for (var d = r[f], g = d.length, p, S = 0; S < g; ++S)
      (p = d[S]) && ar(p, l, i, S, d, c || U2(p, i));
  return new al(r, this._parents, l, i);
}
Zu.prototype.interrupt = R_;
Zu.prototype.transition = B2;
const Uc = (l) => () => l;
function Y2(l, {
  sourceEvent: i,
  target: c,
  transform: r,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: l, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    target: { value: c, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function ll(l, i, c) {
  this.k = l, this.x = i, this.y = c;
}
ll.prototype = {
  constructor: ll,
  scale: function(l) {
    return l === 1 ? this : new ll(this.k * l, this.x, this.y);
  },
  translate: function(l, i) {
    return l === 0 & i === 0 ? this : new ll(this.k, this.x + this.k * l, this.y + this.k * i);
  },
  apply: function(l) {
    return [l[0] * this.k + this.x, l[1] * this.k + this.y];
  },
  applyX: function(l) {
    return l * this.k + this.x;
  },
  applyY: function(l) {
    return l * this.k + this.y;
  },
  invert: function(l) {
    return [(l[0] - this.x) / this.k, (l[1] - this.y) / this.k];
  },
  invertX: function(l) {
    return (l - this.x) / this.k;
  },
  invertY: function(l) {
    return (l - this.y) / this.k;
  },
  rescaleX: function(l) {
    return l.copy().domain(l.range().map(this.invertX, this).map(l.invert, l));
  },
  rescaleY: function(l) {
    return l.copy().domain(l.range().map(this.invertY, this).map(l.invert, l));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var ir = new ll(1, 0, 0);
Pv.prototype = ll.prototype;
function Pv(l) {
  for (; !l.__zoom; ) if (!(l = l.parentNode)) return ir;
  return l.__zoom;
}
function od(l) {
  l.stopImmediatePropagation();
}
function Tu(l) {
  l.preventDefault(), l.stopImmediatePropagation();
}
function V2(l) {
  return (!l.ctrlKey || l.type === "wheel") && !l.button;
}
function j2() {
  var l = this;
  return l instanceof SVGElement ? (l = l.ownerSVGElement || l, l.hasAttribute("viewBox") ? (l = l.viewBox.baseVal, [[l.x, l.y], [l.x + l.width, l.y + l.height]]) : [[0, 0], [l.width.baseVal.value, l.height.baseVal.value]]) : [[0, 0], [l.clientWidth, l.clientHeight]];
}
function Oy() {
  return this.__zoom || ir;
}
function L2(l) {
  return -l.deltaY * (l.deltaMode === 1 ? 0.05 : l.deltaMode ? 1 : 2e-3) * (l.ctrlKey ? 10 : 1);
}
function q2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function X2(l, i, c) {
  var r = l.invertX(i[0][0]) - c[0][0], s = l.invertX(i[1][0]) - c[1][0], f = l.invertY(i[0][1]) - c[0][1], d = l.invertY(i[1][1]) - c[1][1];
  return l.translate(
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s),
    d > f ? (f + d) / 2 : Math.min(0, f) || Math.max(0, d)
  );
}
function tp() {
  var l = V2, i = j2, c = X2, r = L2, s = q2, f = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], g = 250, p = qc, S = er("start", "zoom", "end"), y, m, v, b = 500, E = 150, z = 0, w = 10;
  function N(C) {
    C.property("__zoom", Oy).on("wheel.zoom", Q, { passive: !1 }).on("mousedown.zoom", Y).on("dblclick.zoom", lt).filter(s).on("touchstart.zoom", P).on("touchmove.zoom", it).on("touchend.zoom touchcancel.zoom", at).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(C, j, O, U) {
    var Z = C.selection ? C.selection() : C;
    Z.property("__zoom", Oy), C !== Z ? G(C, j, O, U) : Z.interrupt().each(function() {
      B(this, arguments).event(U).start().zoom(null, typeof j == "function" ? j.apply(this, arguments) : j).end();
    });
  }, N.scaleBy = function(C, j, O, U) {
    N.scaleTo(C, function() {
      var Z = this.__zoom.k, J = typeof j == "function" ? j.apply(this, arguments) : j;
      return Z * J;
    }, O, U);
  }, N.scaleTo = function(C, j, O, U) {
    N.transform(C, function() {
      var Z = i.apply(this, arguments), J = this.__zoom, tt = O == null ? A(Z) : typeof O == "function" ? O.apply(this, arguments) : O, ot = J.invert(tt), ct = typeof j == "function" ? j.apply(this, arguments) : j;
      return c(_(R(J, ct), tt, ot), Z, d);
    }, O, U);
  }, N.translateBy = function(C, j, O, U) {
    N.transform(C, function() {
      return c(this.__zoom.translate(
        typeof j == "function" ? j.apply(this, arguments) : j,
        typeof O == "function" ? O.apply(this, arguments) : O
      ), i.apply(this, arguments), d);
    }, null, U);
  }, N.translateTo = function(C, j, O, U, Z) {
    N.transform(C, function() {
      var J = i.apply(this, arguments), tt = this.__zoom, ot = U == null ? A(J) : typeof U == "function" ? U.apply(this, arguments) : U;
      return c(ir.translate(ot[0], ot[1]).scale(tt.k).translate(
        typeof j == "function" ? -j.apply(this, arguments) : -j,
        typeof O == "function" ? -O.apply(this, arguments) : -O
      ), J, d);
    }, U, Z);
  };
  function R(C, j) {
    return j = Math.max(f[0], Math.min(f[1], j)), j === C.k ? C : new ll(j, C.x, C.y);
  }
  function _(C, j, O) {
    var U = j[0] - O[0] * C.k, Z = j[1] - O[1] * C.k;
    return U === C.x && Z === C.y ? C : new ll(C.k, U, Z);
  }
  function A(C) {
    return [(+C[0][0] + +C[1][0]) / 2, (+C[0][1] + +C[1][1]) / 2];
  }
  function G(C, j, O, U) {
    C.on("start.zoom", function() {
      B(this, arguments).event(U).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(U).end();
    }).tween("zoom", function() {
      var Z = this, J = arguments, tt = B(Z, J).event(U), ot = i.apply(Z, J), ct = O == null ? A(ot) : typeof O == "function" ? O.apply(Z, J) : O, vt = Math.max(ot[1][0] - ot[0][0], ot[1][1] - ot[0][1]), T = Z.__zoom, F = typeof j == "function" ? j.apply(Z, J) : j, ft = p(T.invert(ct).concat(vt / T.k), F.invert(ct).concat(vt / F.k));
      return function(ut) {
        if (ut === 1) ut = F;
        else {
          var W = ft(ut), dt = vt / W[2];
          ut = new ll(dt, ct[0] - W[0] * dt, ct[1] - W[1] * dt);
        }
        tt.zoom(null, ut);
      };
    });
  }
  function B(C, j, O) {
    return !O && C.__zooming || new H(C, j);
  }
  function H(C, j) {
    this.that = C, this.args = j, this.active = 0, this.sourceEvent = null, this.extent = i.apply(C, j), this.taps = 0;
  }
  H.prototype = {
    event: function(C) {
      return C && (this.sourceEvent = C), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(C, j) {
      return this.mouse && C !== "mouse" && (this.mouse[1] = j.invert(this.mouse[0])), this.touch0 && C !== "touch" && (this.touch0[1] = j.invert(this.touch0[0])), this.touch1 && C !== "touch" && (this.touch1[1] = j.invert(this.touch1[0])), this.that.__zoom = j, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(C) {
      var j = $e(this.that).datum();
      S.call(
        C,
        this.that,
        new Y2(C, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: S
        }),
        j
      );
    }
  };
  function Q(C, ...j) {
    if (!l.apply(this, arguments)) return;
    var O = B(this, j).event(C), U = this.__zoom, Z = Math.max(f[0], Math.min(f[1], U.k * Math.pow(2, r.apply(this, arguments)))), J = mn(C);
    if (O.wheel)
      (O.mouse[0][0] !== J[0] || O.mouse[0][1] !== J[1]) && (O.mouse[1] = U.invert(O.mouse[0] = J)), clearTimeout(O.wheel);
    else {
      if (U.k === Z) return;
      O.mouse = [J, U.invert(J)], Gc(this), O.start();
    }
    Tu(C), O.wheel = setTimeout(tt, E), O.zoom("mouse", c(_(R(U, Z), O.mouse[0], O.mouse[1]), O.extent, d));
    function tt() {
      O.wheel = null, O.end();
    }
  }
  function Y(C, ...j) {
    if (v || !l.apply(this, arguments)) return;
    var O = C.currentTarget, U = B(this, j, !0).event(C), Z = $e(C.view).on("mousemove.zoom", ct, !0).on("mouseup.zoom", vt, !0), J = mn(C, O), tt = C.clientX, ot = C.clientY;
    Yv(C.view), od(C), U.mouse = [J, this.__zoom.invert(J)], Gc(this), U.start();
    function ct(T) {
      if (Tu(T), !U.moved) {
        var F = T.clientX - tt, ft = T.clientY - ot;
        U.moved = F * F + ft * ft > z;
      }
      U.event(T).zoom("mouse", c(_(U.that.__zoom, U.mouse[0] = mn(T, O), U.mouse[1]), U.extent, d));
    }
    function vt(T) {
      Z.on("mousemove.zoom mouseup.zoom", null), Vv(T.view, U.moved), Tu(T), U.event(T).end();
    }
  }
  function lt(C, ...j) {
    if (l.apply(this, arguments)) {
      var O = this.__zoom, U = mn(C.changedTouches ? C.changedTouches[0] : C, this), Z = O.invert(U), J = O.k * (C.shiftKey ? 0.5 : 2), tt = c(_(R(O, J), U, Z), i.apply(this, j), d);
      Tu(C), g > 0 ? $e(this).transition().duration(g).call(G, tt, U, C) : $e(this).call(N.transform, tt, U, C);
    }
  }
  function P(C, ...j) {
    if (l.apply(this, arguments)) {
      var O = C.touches, U = O.length, Z = B(this, j, C.changedTouches.length === U).event(C), J, tt, ot, ct;
      for (od(C), tt = 0; tt < U; ++tt)
        ot = O[tt], ct = mn(ot, this), ct = [ct, this.__zoom.invert(ct), ot.identifier], Z.touch0 ? !Z.touch1 && Z.touch0[2] !== ct[2] && (Z.touch1 = ct, Z.taps = 0) : (Z.touch0 = ct, J = !0, Z.taps = 1 + !!y);
      y && (y = clearTimeout(y)), J && (Z.taps < 2 && (m = ct[0], y = setTimeout(function() {
        y = null;
      }, b)), Gc(this), Z.start());
    }
  }
  function it(C, ...j) {
    if (this.__zooming) {
      var O = B(this, j).event(C), U = C.changedTouches, Z = U.length, J, tt, ot, ct;
      for (Tu(C), J = 0; J < Z; ++J)
        tt = U[J], ot = mn(tt, this), O.touch0 && O.touch0[2] === tt.identifier ? O.touch0[0] = ot : O.touch1 && O.touch1[2] === tt.identifier && (O.touch1[0] = ot);
      if (tt = O.that.__zoom, O.touch1) {
        var vt = O.touch0[0], T = O.touch0[1], F = O.touch1[0], ft = O.touch1[1], ut = (ut = F[0] - vt[0]) * ut + (ut = F[1] - vt[1]) * ut, W = (W = ft[0] - T[0]) * W + (W = ft[1] - T[1]) * W;
        tt = R(tt, Math.sqrt(ut / W)), ot = [(vt[0] + F[0]) / 2, (vt[1] + F[1]) / 2], ct = [(T[0] + ft[0]) / 2, (T[1] + ft[1]) / 2];
      } else if (O.touch0) ot = O.touch0[0], ct = O.touch0[1];
      else return;
      O.zoom("touch", c(_(tt, ot, ct), O.extent, d));
    }
  }
  function at(C, ...j) {
    if (this.__zooming) {
      var O = B(this, j).event(C), U = C.changedTouches, Z = U.length, J, tt;
      for (od(C), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, b), J = 0; J < Z; ++J)
        tt = U[J], O.touch0 && O.touch0[2] === tt.identifier ? delete O.touch0 : O.touch1 && O.touch1[2] === tt.identifier && delete O.touch1;
      if (O.touch1 && !O.touch0 && (O.touch0 = O.touch1, delete O.touch1), O.touch0) O.touch0[1] = this.__zoom.invert(O.touch0[0]);
      else if (O.end(), O.taps === 2 && (tt = mn(tt, this), Math.hypot(m[0] - tt[0], m[1] - tt[1]) < w)) {
        var ot = $e(this).on("dblclick.zoom");
        ot && ot.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : Uc(+C), N) : r;
  }, N.filter = function(C) {
    return arguments.length ? (l = typeof C == "function" ? C : Uc(!!C), N) : l;
  }, N.touchable = function(C) {
    return arguments.length ? (s = typeof C == "function" ? C : Uc(!!C), N) : s;
  }, N.extent = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : Uc([[+C[0][0], +C[0][1]], [+C[1][0], +C[1][1]]]), N) : i;
  }, N.scaleExtent = function(C) {
    return arguments.length ? (f[0] = +C[0], f[1] = +C[1], N) : [f[0], f[1]];
  }, N.translateExtent = function(C) {
    return arguments.length ? (d[0][0] = +C[0][0], d[1][0] = +C[1][0], d[0][1] = +C[0][1], d[1][1] = +C[1][1], N) : [[d[0][0], d[0][1]], [d[1][0], d[1][1]]];
  }, N.constrain = function(C) {
    return arguments.length ? (c = C, N) : c;
  }, N.duration = function(C) {
    return arguments.length ? (g = +C, N) : g;
  }, N.interpolate = function(C) {
    return arguments.length ? (p = C, N) : p;
  }, N.on = function() {
    var C = S.on.apply(S, arguments);
    return C === S ? N : C;
  }, N.clickDistance = function(C) {
    return arguments.length ? (z = (C = +C) * C, N) : Math.sqrt(z);
  }, N.tapDistance = function(C) {
    return arguments.length ? (w = +C, N) : w;
  }, N;
}
const Sn = {
  error001: (l = "react") => `Seems like you have not used ${l === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${l}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (l) => `Node type "${l}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (l) => `The old edge with id=${l} does not exist.`,
  error009: (l) => `Marker type "${l}" doesn't exist.`,
  error008: (l, { id: i, sourceHandle: c, targetHandle: r }) => `Couldn't create edge for ${l} handle id: "${l === "source" ? c : r}", edge id: ${i}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (l) => `Edge type "${l}" not found. Using fallback type "default".`,
  error012: (l) => `Node with id "${l}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (l = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${l}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (l) => `Edge with id "${l}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, Uu = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], ep = ["Enter", " ", "Escape"], np = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: l, x: i, y: c }) => `Moved selected node ${l}. New position, x: ${i}, y: ${c}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var xi;
(function(l) {
  l.Strict = "strict", l.Loose = "loose";
})(xi || (xi = {}));
var ma;
(function(l) {
  l.Free = "free", l.Vertical = "vertical", l.Horizontal = "horizontal";
})(ma || (ma = {}));
var Bu;
(function(l) {
  l.Partial = "partial", l.Full = "full";
})(Bu || (Bu = {}));
const lp = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null
};
var Yl;
(function(l) {
  l.Bezier = "default", l.Straight = "straight", l.Step = "step", l.SmoothStep = "smoothstep", l.SimpleBezier = "simplebezier";
})(Yl || (Yl = {}));
var Yu;
(function(l) {
  l.Arrow = "arrow", l.ArrowClosed = "arrowclosed";
})(Yu || (Yu = {}));
var xt;
(function(l) {
  l.Left = "left", l.Top = "top", l.Right = "right", l.Bottom = "bottom";
})(xt || (xt = {}));
const Dy = {
  [xt.Left]: xt.Right,
  [xt.Right]: xt.Left,
  [xt.Top]: xt.Bottom,
  [xt.Bottom]: xt.Top
}, ap = (l) => !!l && typeof l == "object" && "id" in l && "source" in l && "target" in l, Z2 = (l) => !!l && typeof l == "object" && "id" in l && "position" in l && !("source" in l) && !("target" in l), qd = (l) => !!l && typeof l == "object" && "id" in l && "internals" in l && !("source" in l) && !("target" in l), Qu = (l, i = [0, 0]) => {
  const { width: c, height: r } = bn(l), s = l.origin ?? i, f = c * s[0], d = r * s[1];
  return {
    x: l.position.x - f,
    y: l.position.y - d
  };
}, G2 = (l, i = { nodeOrigin: [0, 0] }) => {
  if (l.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let c = !1;
  const r = l.reduce((s, f) => {
    const d = typeof f == "string";
    let g = !i.nodeLookup && !d ? f : void 0;
    return i.nodeLookup && (g = d ? i.nodeLookup.get(f) : qd(f) ? f : i.nodeLookup.get(f.id)), g ? (c = !0, ur(s, Wc(g, i.nodeOrigin))) : s;
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return c ? or(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Ku = (l, i = {}) => {
  let c = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return l.forEach((s) => {
    (i.filter === void 0 || i.filter(s)) && (c = ur(c, Wc(s)), r = !0);
  }), r ? or(c) : { x: 0, y: 0, width: 0, height: 0 };
}, Xd = (l, i, [c, r, s] = [0, 0, 1], f = !1, d = !1) => {
  const g = (i.x - c) / s, p = (i.y - r) / s, S = i.width / s, y = i.height / s, m = [];
  for (const v of l.values()) {
    const { measured: b, selectable: E = !0, hidden: z = !1 } = v;
    if (d && !E || z)
      continue;
    const w = b.width ?? v.width ?? v.initialWidth ?? 0, N = b.height ?? v.height ?? v.initialHeight ?? 0, { x: R, y: _ } = v.internals.positionAbsolute, A = cp(g, p, S, y, R, _, w, N), G = w * N, B = f && A > 0;
    (!v.internals.handleBounds || B || A >= G || v.dragging) && m.push(v);
  }
  return m;
}, Q2 = (l, i) => {
  const c = /* @__PURE__ */ new Set();
  return l.forEach((r) => {
    c.add(r.id);
  }), i.filter((r) => c.has(r.source) || c.has(r.target));
};
function K2(l, i) {
  const c = /* @__PURE__ */ new Map(), r = i?.nodes ? new Set(i.nodes.map((s) => s.id)) : null;
  return l.forEach((s) => {
    let f;
    if (i?.includeHiddenNodes) {
      const { width: d, height: g } = bn(s);
      f = d > 0 && g > 0;
    } else
      f = !!(s.measured.width && s.measured.height && !s.hidden);
    f && (!r || r.has(s.id)) && c.set(s.id, s);
  }), c;
}
async function $2({ nodes: l, width: i, height: c, panZoom: r, minZoom: s, maxZoom: f }, d) {
  if (l.size === 0)
    return !0;
  const g = K2(l, d), p = Ku(g), S = Gd(p, i, c, d?.minZoom ?? s, d?.maxZoom ?? f, d?.padding ?? 0.1);
  return await r.setViewport(S, {
    duration: d?.duration,
    ease: d?.ease,
    interpolate: d?.interpolate
  }), !0;
}
function ip({ nodeId: l, nextPosition: i, nodeLookup: c, nodeOrigin: r = [0, 0], nodeExtent: s, onError: f }) {
  const d = c.get(l), g = d.parentId ? c.get(d.parentId) : void 0, { x: p, y: S } = g ? g.internals.positionAbsolute : { x: 0, y: 0 }, y = d.origin ?? r;
  let m = d.extent || s;
  if (d.extent === "parent" && !d.expandParent)
    if (!g)
      f?.("005", Sn.error005());
    else {
      const { width: b, height: E } = bn(g);
      b && E && (m = [
        [p, S],
        [p + b, S + E]
      ]);
    }
  else g && Sa(d.extent) && (m = [
    [d.extent[0][0] + p, d.extent[0][1] + S],
    [d.extent[1][0] + p, d.extent[1][1] + S]
  ]);
  const v = Sa(m) ? pa(i, m, d.measured) : i;
  return (d.measured.width === void 0 || d.measured.height === void 0) && f?.("015", Sn.error015()), {
    position: {
      x: v.x - p + (d.measured.width ?? 0) * y[0],
      y: v.y - S + (d.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function J2({ nodesToRemove: l = [], edgesToRemove: i = [], nodes: c, edges: r, onBeforeDelete: s }) {
  const f = new Set(l.map((v) => v.id)), d = [];
  for (const v of c) {
    if (v.deletable === !1)
      continue;
    const b = f.has(v.id), E = !b && v.parentId && d.find((z) => z.id === v.parentId);
    (b || E) && d.push(v);
  }
  const g = new Set(i.map((v) => v.id)), p = r.filter((v) => v.deletable !== !1), y = Q2(d, p);
  for (const v of p)
    g.has(v.id) && !y.find((E) => E.id === v.id) && y.push(v);
  if (!s)
    return {
      edges: y,
      nodes: d
    };
  const m = await s({
    nodes: d,
    edges: y
  });
  return typeof m == "boolean" ? m ? { edges: y, nodes: d } : { edges: [], nodes: [] } : m;
}
const bi = (l, i = 0, c = 1) => Math.min(Math.max(l, i), c), pa = (l = { x: 0, y: 0 }, i, c) => ({
  x: bi(l.x, i[0][0], i[1][0] - (c?.width ?? 0)),
  y: bi(l.y, i[0][1], i[1][1] - (c?.height ?? 0))
});
function up(l, i, c) {
  const { width: r, height: s } = bn(c), { x: f, y: d } = c.internals.positionAbsolute;
  return pa(l, [
    [f, d],
    [f + r, d + s]
  ], i);
}
const Ry = (l, i, c) => l < i ? bi(Math.abs(l - i), 1, i) / i : l > c ? -bi(Math.abs(l - c), 1, i) / i : 0, Zd = (l, i, c = 15, r = 40) => {
  const s = Ry(l.x, r, i.width - r) * c, f = Ry(l.y, r, i.height - r) * c;
  return [s, f];
}, ur = (l, i) => ({
  x: Math.min(l.x, i.x),
  y: Math.min(l.y, i.y),
  x2: Math.max(l.x2, i.x2),
  y2: Math.max(l.y2, i.y2)
}), Td = ({ x: l, y: i, width: c, height: r }) => ({
  x: l,
  y: i,
  x2: l + c,
  y2: i + r
}), or = ({ x: l, y: i, x2: c, y2: r }) => ({
  x: l,
  y: i,
  width: c - l,
  height: r - i
}), Vu = (l, i = [0, 0]) => {
  const { x: c, y: r } = qd(l) ? l.internals.positionAbsolute : Qu(l, i);
  return {
    x: c,
    y: r,
    width: l.measured?.width ?? l.width ?? l.initialWidth ?? 0,
    height: l.measured?.height ?? l.height ?? l.initialHeight ?? 0
  };
}, Wc = (l, i = [0, 0]) => {
  const { x: c, y: r } = qd(l) ? l.internals.positionAbsolute : Qu(l, i);
  return {
    x: c,
    y: r,
    x2: c + (l.measured?.width ?? l.width ?? l.initialWidth ?? 0),
    y2: r + (l.measured?.height ?? l.height ?? l.initialHeight ?? 0)
  };
}, op = (l, i) => or(ur(Td(l), Td(i))), cp = (l, i, c, r, s, f, d, g) => {
  const p = Math.max(0, Math.min(l + c, s + d) - Math.max(l, s)), S = Math.max(0, Math.min(i + r, f + g) - Math.max(i, f));
  return Math.ceil(p * S);
}, Pc = (l, i) => cp(l.x, l.y, l.width, l.height, i.x, i.y, i.width, i.height), Hy = (l) => vn(l.width) && vn(l.height) && vn(l.x) && vn(l.y), vn = (l) => !isNaN(l) && isFinite(l), rp = (l, i) => (c, r) => {
}, $u = (l, i = [1, 1]) => ({
  x: i[0] * Math.round(l.x / i[0]),
  y: i[1] * Math.round(l.y / i[1])
}), Ju = ({ x: l, y: i }, [c, r, s], f = !1, d = [1, 1]) => {
  const g = {
    x: (l - c) / s,
    y: (i - r) / s
  };
  return f ? $u(g, d) : g;
}, Ei = ({ x: l, y: i }, [c, r, s]) => ({
  x: l * s + c,
  y: i * s + r
});
function gi(l, i) {
  if (typeof l == "number")
    return Math.floor((i - i / (1 + l)) * 0.5);
  if (typeof l == "string" && l.endsWith("px")) {
    const c = parseFloat(l);
    if (!Number.isNaN(c))
      return Math.floor(c);
  }
  if (typeof l == "string" && l.endsWith("%")) {
    const c = parseFloat(l);
    if (!Number.isNaN(c))
      return Math.floor(i * c * 0.01);
  }
  return console.error(`The padding value "${l}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function I2(l, i, c) {
  if (typeof l == "string" || typeof l == "number") {
    const r = gi(l, c), s = gi(l, i);
    return {
      top: r,
      right: s,
      bottom: r,
      left: s,
      x: s * 2,
      y: r * 2
    };
  }
  if (typeof l == "object") {
    const r = gi(l.top ?? l.y ?? 0, c), s = gi(l.bottom ?? l.y ?? 0, c), f = gi(l.left ?? l.x ?? 0, i), d = gi(l.right ?? l.x ?? 0, i);
    return { top: r, right: d, bottom: s, left: f, x: f + d, y: r + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function k2(l, i, c, r, s, f) {
  const { x: d, y: g } = Ei(l, [i, c, r]), { x: p, y: S } = Ei({ x: l.x + l.width, y: l.y + l.height }, [i, c, r]), y = s - p, m = f - S;
  return {
    left: Math.floor(d),
    top: Math.floor(g),
    right: Math.floor(y),
    bottom: Math.floor(m)
  };
}
const Gd = (l, i, c, r, s, f) => {
  const d = I2(f, i, c), g = (i - d.x) / l.width, p = (c - d.y) / l.height, S = Math.min(g, p), y = bi(S, r, s), m = l.x + l.width / 2, v = l.y + l.height / 2, b = i / 2 - m * y, E = c / 2 - v * y, z = k2(l, b, E, y, i, c), w = {
    left: Math.min(z.left - d.left, 0),
    top: Math.min(z.top - d.top, 0),
    right: Math.min(z.right - d.right, 0),
    bottom: Math.min(z.bottom - d.bottom, 0)
  };
  return {
    x: b - w.left + w.right,
    y: E - w.top + w.bottom,
    zoom: y
  };
}, ju = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Sa(l) {
  return l != null && l !== "parent";
}
function bn(l) {
  return {
    width: l.measured?.width ?? l.width ?? l.initialWidth ?? 0,
    height: l.measured?.height ?? l.height ?? l.initialHeight ?? 0
  };
}
function sp(l) {
  return (l.measured?.width ?? l.width ?? l.initialWidth) !== void 0 && (l.measured?.height ?? l.height ?? l.initialHeight) !== void 0;
}
function fp(l, i = { width: 0, height: 0 }, c, r, s) {
  const f = { ...l }, d = r.get(c);
  if (d) {
    const g = d.origin || s;
    f.x += d.internals.positionAbsolute.x - (i.width ?? 0) * g[0], f.y += d.internals.positionAbsolute.y - (i.height ?? 0) * g[1];
  }
  return f;
}
function Uy(l, i) {
  if (l.size !== i.size)
    return !1;
  for (const c of l)
    if (!i.has(c))
      return !1;
  return !0;
}
function F2() {
  let l, i;
  return { promise: new Promise((r, s) => {
    l = r, i = s;
  }), resolve: l, reject: i };
}
function W2(l) {
  return { ...np, ...l || {} };
}
function dp(l) {
  return l === null ? null : l ? "valid" : "invalid";
}
function Au(l, { snapGrid: i = [0, 0], snapToGrid: c = !1, transform: r, containerBounds: s }) {
  const { x: f, y: d } = pn(l), g = Ju({ x: f - (s?.left ?? 0), y: d - (s?.top ?? 0) }, r), { x: p, y: S } = c ? $u(g, i) : g;
  return {
    xSnapped: p,
    ySnapped: S,
    ...g
  };
}
const Qd = (l) => ({
  width: l.offsetWidth,
  height: l.offsetHeight
}), hp = (l) => l?.getRootNode?.() || window?.document, P2 = ["INPUT", "SELECT", "TEXTAREA"];
function gp(l) {
  const i = l.composedPath?.()?.[0] || l.target;
  return i?.nodeType !== 1 ? !1 : P2.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const mp = (l) => "clientX" in l, pn = (l, i) => {
  const c = mp(l), r = c ? l.clientX : l.touches?.[0].clientX, s = c ? l.clientY : l.touches?.[0].clientY;
  return {
    x: r - (i?.left ?? 0),
    y: s - (i?.top ?? 0)
  };
}, By = (l, i, c, r, s) => {
  const f = i.querySelectorAll(`.${l}`);
  return !f || !f.length ? null : Array.from(f).map((d) => {
    const g = d.getBoundingClientRect();
    return {
      id: d.getAttribute("data-handleid"),
      type: l,
      nodeId: s,
      position: d.getAttribute("data-handlepos"),
      x: (g.left - c.left) / r,
      y: (g.top - c.top) / r,
      ...Qd(d)
    };
  });
};
function yp({ sourceX: l, sourceY: i, targetX: c, targetY: r, sourceControlX: s, sourceControlY: f, targetControlX: d, targetControlY: g }) {
  const p = l * 0.125 + s * 0.375 + d * 0.375 + c * 0.125, S = i * 0.125 + f * 0.375 + g * 0.375 + r * 0.125, y = Math.abs(p - l), m = Math.abs(S - i);
  return [p, S, y, m];
}
function Bc(l, i) {
  return l >= 0 ? 0.5 * l : i * 25 * Math.sqrt(-l);
}
function Yy({ pos: l, x1: i, y1: c, x2: r, y2: s, c: f }) {
  switch (l) {
    case xt.Left:
      return [i - Bc(i - r, f), c];
    case xt.Right:
      return [i + Bc(r - i, f), c];
    case xt.Top:
      return [i, c - Bc(c - s, f)];
    case xt.Bottom:
      return [i, c + Bc(s - c, f)];
  }
}
function vp({ sourceX: l, sourceY: i, sourcePosition: c = xt.Bottom, targetX: r, targetY: s, targetPosition: f = xt.Top, curvature: d = 0.25 }) {
  const [g, p] = Yy({
    pos: c,
    x1: l,
    y1: i,
    x2: r,
    y2: s,
    c: d
  }), [S, y] = Yy({
    pos: f,
    x1: r,
    y1: s,
    x2: l,
    y2: i,
    c: d
  }), [m, v, b, E] = yp({
    sourceX: l,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: g,
    sourceControlY: p,
    targetControlX: S,
    targetControlY: y
  });
  return [
    `M${l},${i} C${g},${p} ${S},${y} ${r},${s}`,
    m,
    v,
    b,
    E
  ];
}
function pp({ sourceX: l, sourceY: i, targetX: c, targetY: r }) {
  const s = Math.abs(c - l) / 2, f = c < l ? c + s : c - s, d = Math.abs(r - i) / 2, g = r < i ? r + d : r - d;
  return [f, g, s, d];
}
function tw({ sourceNode: l, targetNode: i, selected: c = !1, zIndex: r = 0, elevateOnSelect: s = !1, zIndexMode: f = "basic" }) {
  if (f === "manual")
    return r;
  const d = s && c ? r + 1e3 : r, g = Math.max(l.parentId || s && l.selected ? l.internals.z : 0, i.parentId || s && i.selected ? i.internals.z : 0);
  return d + g;
}
function ew({ sourceNode: l, targetNode: i, width: c, height: r, transform: s }) {
  const f = ur(Wc(l), Wc(i));
  f.x === f.x2 && (f.x2 += 1), f.y === f.y2 && (f.y2 += 1);
  const d = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: c / s[2],
    height: r / s[2]
  };
  return Pc(d, or(f)) > 0;
}
const nw = ({ source: l, sourceHandle: i, target: c, targetHandle: r }) => `xy-edge__${l}${i || ""}-${c}${r || ""}`, lw = (l, i) => i.some((c) => c.source === l.source && c.target === l.target && (c.sourceHandle === l.sourceHandle || !c.sourceHandle && !l.sourceHandle) && (c.targetHandle === l.targetHandle || !c.targetHandle && !l.targetHandle)), aw = (l, i, c = {}) => {
  if (!l.source || !l.target)
    return c.onError?.("006", Sn.error006()), i;
  const r = c.getEdgeId || nw;
  let s;
  return ap(l) ? s = { ...l } : s = {
    ...l,
    id: r(l)
  }, lw(s, i) ? i : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, i.concat(s));
};
function Sp({ sourceX: l, sourceY: i, targetX: c, targetY: r }) {
  const [s, f, d, g] = pp({
    sourceX: l,
    sourceY: i,
    targetX: c,
    targetY: r
  });
  return [`M ${l},${i}L ${c},${r}`, s, f, d, g];
}
const Vy = {
  [xt.Left]: { x: -1, y: 0 },
  [xt.Right]: { x: 1, y: 0 },
  [xt.Top]: { x: 0, y: -1 },
  [xt.Bottom]: { x: 0, y: 1 }
}, iw = ({ source: l, sourcePosition: i = xt.Bottom, target: c }) => i === xt.Left || i === xt.Right ? l.x < c.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : l.y < c.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, jy = (l, i) => Math.sqrt(Math.pow(i.x - l.x, 2) + Math.pow(i.y - l.y, 2));
function uw({ source: l, sourcePosition: i = xt.Bottom, target: c, targetPosition: r = xt.Top, center: s, offset: f, stepPosition: d }) {
  const g = Vy[i], p = Vy[r], S = { x: l.x + g.x * f, y: l.y + g.y * f }, y = { x: c.x + p.x * f, y: c.y + p.y * f }, m = iw({
    source: S,
    sourcePosition: i,
    target: y
  }), v = m.x !== 0 ? "x" : "y", b = m[v];
  let E = [], z, w;
  const N = { x: 0, y: 0 }, R = { x: 0, y: 0 }, [, , _, A] = pp({
    sourceX: l.x,
    sourceY: l.y,
    targetX: c.x,
    targetY: c.y
  });
  if (g[v] * p[v] === -1) {
    v === "x" ? (z = s.x ?? S.x + (y.x - S.x) * d, w = s.y ?? (S.y + y.y) / 2) : (z = s.x ?? (S.x + y.x) / 2, w = s.y ?? S.y + (y.y - S.y) * d);
    const Q = [
      { x: z, y: S.y },
      { x: z, y: y.y }
    ], Y = [
      { x: S.x, y: w },
      { x: y.x, y: w }
    ];
    g[v] === b ? E = v === "x" ? Q : Y : E = v === "x" ? Y : Q;
  } else {
    const Q = [{ x: S.x, y: y.y }], Y = [{ x: y.x, y: S.y }];
    if (v === "x" ? E = g.x === b ? Y : Q : E = g.y === b ? Q : Y, i === r) {
      const C = Math.abs(l[v] - c[v]);
      if (C <= f) {
        const j = Math.min(f - 1, f - C);
        g[v] === b ? N[v] = (S[v] > l[v] ? -1 : 1) * j : R[v] = (y[v] > c[v] ? -1 : 1) * j;
      }
    }
    if (i !== r) {
      const C = v === "x" ? "y" : "x", j = g[v] === p[C], O = S[C] > y[C], U = S[C] < y[C];
      (g[v] === 1 && (!j && O || j && U) || g[v] !== 1 && (!j && U || j && O)) && (E = v === "x" ? Q : Y);
    }
    const lt = { x: S.x + N.x, y: S.y + N.y }, P = { x: y.x + R.x, y: y.y + R.y }, it = Math.max(Math.abs(lt.x - E[0].x), Math.abs(P.x - E[0].x)), at = Math.max(Math.abs(lt.y - E[0].y), Math.abs(P.y - E[0].y));
    it >= at ? (z = (lt.x + P.x) / 2, w = E[0].y) : (z = E[0].x, w = (lt.y + P.y) / 2);
  }
  const G = { x: S.x + N.x, y: S.y + N.y }, B = { x: y.x + R.x, y: y.y + R.y };
  return [[
    l,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...G.x !== E[0].x || G.y !== E[0].y ? [G] : [],
    ...E,
    ...B.x !== E[E.length - 1].x || B.y !== E[E.length - 1].y ? [B] : [],
    c
  ], z, w, _, A];
}
function ow(l, i, c, r) {
  const s = Math.min(jy(l, i) / 2, jy(i, c) / 2, r), { x: f, y: d } = i;
  if (l.x === f && f === c.x || l.y === d && d === c.y)
    return `L${f} ${d}`;
  if (l.y === d) {
    const S = l.x < c.x ? -1 : 1, y = l.y < c.y ? 1 : -1;
    return `L ${f + s * S},${d}Q ${f},${d} ${f},${d + s * y}`;
  }
  const g = l.x < c.x ? 1 : -1, p = l.y < c.y ? -1 : 1;
  return `L ${f},${d + s * p}Q ${f},${d} ${f + s * g},${d}`;
}
function zd({ sourceX: l, sourceY: i, sourcePosition: c = xt.Bottom, targetX: r, targetY: s, targetPosition: f = xt.Top, borderRadius: d = 5, centerX: g, centerY: p, offset: S = 20, stepPosition: y = 0.5 }) {
  const [m, v, b, E, z] = uw({
    source: { x: l, y: i },
    sourcePosition: c,
    target: { x: r, y: s },
    targetPosition: f,
    center: { x: g, y: p },
    offset: S,
    stepPosition: y
  });
  let w = `M${m[0].x} ${m[0].y}`;
  for (let N = 1; N < m.length - 1; N++)
    w += ow(m[N - 1], m[N], m[N + 1], d);
  return w += `L${m[m.length - 1].x} ${m[m.length - 1].y}`, [w, v, b, E, z];
}
function Ly(l) {
  return l && !!(l.internals.handleBounds || l.handles?.length) && !!(l.measured.width || l.width || l.initialWidth);
}
function cw(l) {
  const { sourceNode: i, targetNode: c } = l;
  if (!Ly(i) || !Ly(c))
    return null;
  const r = i.internals.handleBounds || qy(i.handles), s = c.internals.handleBounds || qy(c.handles), f = Xy(r?.source ?? [], l.sourceHandle), d = Xy(
    // when connection type is loose we can define all handles as sources and connect source -> source
    l.connectionMode === xi.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    l.targetHandle
  );
  if (!f || !d)
    return l.onError?.("008", Sn.error008(f ? "target" : "source", {
      id: l.id,
      sourceHandle: l.sourceHandle,
      targetHandle: l.targetHandle
    })), null;
  const g = f?.position || xt.Bottom, p = d?.position || xt.Top, S = xa(i, f, g), y = xa(c, d, p);
  return {
    sourceX: S.x,
    sourceY: S.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: g,
    targetPosition: p
  };
}
function qy(l) {
  if (!l)
    return null;
  const i = [], c = [];
  for (const r of l)
    r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? i.push(r) : r.type === "target" && c.push(r);
  return {
    source: i,
    target: c
  };
}
function xa(l, i, c = xt.Left, r = !1) {
  const s = (i?.x ?? 0) + l.internals.positionAbsolute.x, f = (i?.y ?? 0) + l.internals.positionAbsolute.y, { width: d, height: g } = i ?? bn(l);
  if (r)
    return { x: s + d / 2, y: f + g / 2 };
  switch (i?.position ?? c) {
    case xt.Top:
      return { x: s + d / 2, y: f };
    case xt.Right:
      return { x: s + d, y: f + g / 2 };
    case xt.Bottom:
      return { x: s + d / 2, y: f + g };
    case xt.Left:
      return { x: s, y: f + g / 2 };
  }
}
function Xy(l, i) {
  return l && (i ? l.find((c) => c.id === i) : l[0]) || null;
}
function Cd(l, i) {
  return l ? typeof l == "string" ? l : `${i ? `${i}__` : ""}${Object.keys(l).sort().map((r) => `${r}=${l[r]}`).join("&")}` : "";
}
function rw(l, { id: i, defaultColor: c, defaultMarkerStart: r, defaultMarkerEnd: s }) {
  const f = /* @__PURE__ */ new Set();
  return l.reduce((d, g) => ([g.markerStart || r, g.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const S = Cd(p, i);
      f.has(S) || (d.push({ id: S, color: p.color || c, ...p }), f.add(S));
    }
  }), d), []).sort((d, g) => d.id.localeCompare(g.id));
}
const xp = 1e3, sw = 10, Kd = {
  nodeOrigin: [0, 0],
  nodeExtent: Uu,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, fw = {
  ...Kd,
  checkEquality: !0
};
function $d(l, i) {
  const c = { ...l };
  for (const r in i)
    i[r] !== void 0 && (c[r] = i[r]);
  return c;
}
function dw(l, i, c) {
  const r = $d(Kd, c);
  for (const s of l.values())
    if (s.parentId)
      Id(s, l, i, r);
    else {
      const f = Qu(s, r.nodeOrigin), d = Sa(s.extent) ? s.extent : r.nodeExtent, g = pa(f, d, bn(s));
      s.internals.positionAbsolute = g;
    }
}
function hw(l, i) {
  if (!l.handles)
    return l.measured ? i?.internals.handleBounds : void 0;
  const c = [], r = [];
  for (const s of l.handles) {
    const f = {
      id: s.id,
      width: s.width ?? 1,
      height: s.height ?? 1,
      nodeId: l.id,
      x: s.x,
      y: s.y,
      position: s.position,
      type: s.type
    };
    s.type === "source" ? c.push(f) : s.type === "target" && r.push(f);
  }
  return {
    source: c,
    target: r
  };
}
function Jd(l) {
  return l === "manual";
}
function Md(l, i, c, r = {}) {
  const s = $d(fw, r), f = { i: 0 }, d = new Map(i), g = s?.elevateNodesOnSelect && !Jd(s.zIndexMode) ? xp : 0;
  let p = l.length > 0, S = !1;
  i.clear(), c.clear();
  for (const y of l) {
    let m = d.get(y.id);
    if (s.checkEquality && y === m?.internals.userNode)
      i.set(y.id, m);
    else {
      const v = Qu(y, s.nodeOrigin), b = Sa(y.extent) ? y.extent : s.nodeExtent, E = pa(v, b, bn(y));
      m = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: E,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: hw(y, m),
          z: bp(y, g, s.zIndexMode),
          userNode: y
        }
      }, i.set(y.id, m);
    }
    (m.measured === void 0 || m.measured.width === void 0 || m.measured.height === void 0) && !m.hidden && (p = !1), y.parentId && Id(m, i, c, r, f), S ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: S };
}
function gw(l, i) {
  if (!l.parentId)
    return;
  const c = i.get(l.parentId);
  c ? c.set(l.id, l) : i.set(l.parentId, /* @__PURE__ */ new Map([[l.id, l]]));
}
function Id(l, i, c, r, s) {
  const { elevateNodesOnSelect: f, nodeOrigin: d, nodeExtent: g, zIndexMode: p } = $d(Kd, r), S = l.parentId, y = i.get(S);
  if (!y) {
    console.warn(`Parent node ${S} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  gw(l, c), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * sw), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const m = f && !Jd(p) ? xp : 0, { x: v, y: b, z: E } = mw(l, y, d, g, m, p), { positionAbsolute: z } = l.internals, w = v !== z.x || b !== z.y;
  (w || E !== l.internals.z) && i.set(l.id, {
    ...l,
    internals: {
      ...l.internals,
      positionAbsolute: w ? { x: v, y: b } : z,
      z: E
    }
  });
}
function bp(l, i, c) {
  const r = vn(l.zIndex) ? l.zIndex : 0;
  return Jd(c) ? r : r + (l.selected ? i : 0);
}
function mw(l, i, c, r, s, f) {
  const { x: d, y: g } = i.internals.positionAbsolute, p = bn(l), S = Qu(l, c), y = Sa(l.extent) ? pa(S, l.extent, p) : S;
  let m = pa({ x: d + y.x, y: g + y.y }, r, p);
  l.extent === "parent" && (m = up(m, p, i));
  const v = bp(l, s, f), b = i.internals.z ?? 0;
  return {
    x: m.x,
    y: m.y,
    z: b >= v ? b + 1 : v
  };
}
function kd(l, i, c, r = [0, 0]) {
  const s = [], f = /* @__PURE__ */ new Map();
  for (const d of l) {
    const g = i.get(d.parentId);
    if (!g)
      continue;
    const p = f.get(d.parentId)?.expandedRect ?? Vu(g), S = op(p, d.rect);
    f.set(d.parentId, { expandedRect: S, parent: g });
  }
  return f.size > 0 && f.forEach(({ expandedRect: d, parent: g }, p) => {
    const S = g.internals.positionAbsolute, y = bn(g), m = g.origin ?? r, v = d.x < S.x ? Math.round(Math.abs(S.x - d.x)) : 0, b = d.y < S.y ? Math.round(Math.abs(S.y - d.y)) : 0, E = Math.max(y.width, Math.round(d.width)), z = Math.max(y.height, Math.round(d.height)), w = (E - y.width) * m[0], N = (z - y.height) * m[1];
    (v > 0 || b > 0 || w || N) && (s.push({
      id: p,
      type: "position",
      position: {
        x: g.position.x - v + w,
        y: g.position.y - b + N
      }
    }), c.get(p)?.forEach((R) => {
      l.some((_) => _.id === R.id) || s.push({
        id: R.id,
        type: "position",
        position: {
          x: R.position.x + v,
          y: R.position.y + b
        }
      });
    })), (y.width < d.width || y.height < d.height || v || b) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: E + (v ? m[0] * v - w : 0),
        height: z + (b ? m[1] * b - N : 0)
      }
    });
  }), s;
}
function yw(l, i, c, r, s, f, d) {
  const g = r?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!g)
    return { changes: [], updatedInternals: p };
  const S = [], y = window.getComputedStyle(g), { m22: m } = new window.DOMMatrixReadOnly(y.transform), v = [];
  for (const b of l.values()) {
    const E = i.get(b.id);
    if (!E)
      continue;
    if (E.hidden) {
      i.set(E.id, {
        ...E,
        internals: {
          ...E.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const z = Qd(b.nodeElement), w = E.measured.width !== z.width || E.measured.height !== z.height;
    if (!!(z.width && z.height && (w || !E.internals.handleBounds || b.force))) {
      const R = b.nodeElement.getBoundingClientRect(), _ = Sa(E.extent) ? E.extent : f;
      let { positionAbsolute: A } = E.internals;
      if (E.parentId && E.extent === "parent") {
        const B = i.get(E.parentId);
        B && (A = up(A, z, B));
      } else _ && (A = pa(A, _, z));
      const G = {
        ...E,
        measured: z,
        internals: {
          ...E.internals,
          positionAbsolute: A,
          handleBounds: {
            source: By("source", b.nodeElement, R, m, E.id),
            target: By("target", b.nodeElement, R, m, E.id)
          }
        }
      };
      i.set(E.id, G), E.parentId && Id(G, i, c, { nodeOrigin: s, zIndexMode: d }), p = !0, w && (S.push({
        id: E.id,
        type: "dimensions",
        dimensions: z
      }), E.expandParent && E.parentId && v.push({
        id: E.id,
        parentId: E.parentId,
        rect: Vu(G, s)
      }));
    }
  }
  if (v.length > 0) {
    const b = kd(v, i, c, s);
    S.push(...b);
  }
  return { changes: S, updatedInternals: p };
}
async function vw({ delta: l, panZoom: i, transform: c, translateExtent: r, width: s, height: f }) {
  if (!i || !l.x && !l.y)
    return !1;
  const d = await i.setViewportConstrained({
    x: c[0] + l.x,
    y: c[1] + l.y,
    zoom: c[2]
  }, [
    [0, 0],
    [s, f]
  ], r);
  return !!d && (d.x !== c[0] || d.y !== c[1] || d.k !== c[2]);
}
function Zy(l, i, c, r, s, f) {
  let d = s;
  const g = r.get(d) || /* @__PURE__ */ new Map();
  r.set(d, g.set(c, i)), d = `${s}-${l}`;
  const p = r.get(d) || /* @__PURE__ */ new Map();
  if (r.set(d, p.set(c, i)), f) {
    d = `${s}-${l}-${f}`;
    const S = r.get(d) || /* @__PURE__ */ new Map();
    r.set(d, S.set(c, i));
  }
}
function Ep(l, i, c) {
  l.clear(), i.clear();
  for (const r of c) {
    const { source: s, target: f, sourceHandle: d = null, targetHandle: g = null } = r, p = { edgeId: r.id, source: s, target: f, sourceHandle: d, targetHandle: g }, S = `${s}-${d}--${f}-${g}`, y = `${f}-${g}--${s}-${d}`;
    Zy("source", p, y, l, s, d), Zy("target", p, S, l, f, g), i.set(r.id, r);
  }
}
function _p(l, i) {
  if (!l.parentId)
    return !1;
  const c = i.get(l.parentId);
  return c ? c.selected ? !0 : _p(c, i) : !1;
}
function Gy(l, i, c) {
  let r = l;
  do {
    if (r?.matches?.(i))
      return !0;
    if (r === c)
      return !1;
    r = r?.parentElement;
  } while (r);
  return !1;
}
function pw(l, i, c, r) {
  const s = /* @__PURE__ */ new Map();
  for (const [f, d] of l)
    if ((d.selected || d.id === r) && (!d.parentId || !_p(d, l)) && (d.draggable || i && typeof d.draggable > "u")) {
      const g = l.get(f);
      g && s.set(f, {
        id: f,
        position: g.position || { x: 0, y: 0 },
        distance: {
          x: c.x - g.internals.positionAbsolute.x,
          y: c.y - g.internals.positionAbsolute.y
        },
        extent: g.extent,
        parentId: g.parentId,
        origin: g.origin,
        expandParent: g.expandParent,
        internals: {
          positionAbsolute: g.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: g.measured.width ?? 0,
          height: g.measured.height ?? 0
        }
      });
    }
  return s;
}
function cd({ nodeId: l, dragItems: i, nodeLookup: c, dragging: r = !0 }) {
  const s = [];
  for (const [d, g] of i) {
    const p = c.get(d)?.internals.userNode;
    p && s.push({
      ...p,
      position: g.position,
      dragging: r
    });
  }
  if (!l)
    return [s[0], s];
  const f = c.get(l)?.internals.userNode;
  return [
    f ? {
      ...f,
      position: i.get(l)?.position || f.position,
      dragging: r
    } : s[0],
    s
  ];
}
function Sw({ dragItems: l, snapGrid: i, x: c, y: r }) {
  const s = l.values().next().value;
  if (!s)
    return null;
  const f = {
    x: c - s.distance.x,
    y: r - s.distance.y
  }, d = $u(f, i);
  return {
    x: d.x - f.x,
    y: d.y - f.y
  };
}
function xw({ onNodeMouseDown: l, getStoreItems: i, onDragStart: c, onDrag: r, onDragStop: s }) {
  let f = { x: null, y: null }, d = 0, g = /* @__PURE__ */ new Map(), p = !1, S = { x: 0, y: 0 }, y = null, m = !1, v = null, b = !1, E = !1, z = null;
  function w({ noDragClassName: R, handleSelector: _, domNode: A, isSelectable: G, nodeId: B, nodeClickDistance: H = 0 }) {
    v = $e(A);
    function Q({ x: it, y: at }) {
      const { nodeLookup: C, nodeExtent: j, snapGrid: O, snapToGrid: U, nodeOrigin: Z, onNodeDrag: J, onSelectionDrag: tt, onError: ot, updateNodePositions: ct } = i();
      f = { x: it, y: at };
      let vt = !1;
      const T = g.size > 1, F = T && j ? Td(Ku(g)) : null, ft = T && U ? Sw({
        dragItems: g,
        snapGrid: O,
        x: it,
        y: at
      }) : null;
      for (const [ut, W] of g) {
        if (!C.has(ut))
          continue;
        let dt = { x: it - W.distance.x, y: at - W.distance.y };
        U && (dt = ft ? {
          x: Math.round(dt.x + ft.x),
          y: Math.round(dt.y + ft.y)
        } : $u(dt, O));
        let gt = null;
        if (T && j && !W.extent && F) {
          const { positionAbsolute: pt } = W.internals, _t = pt.x - F.x + j[0][0], Ct = pt.x + W.measured.width - F.x2 + j[1][0], Tt = pt.y - F.y + j[0][1], Ht = pt.y + W.measured.height - F.y2 + j[1][1];
          gt = [
            [_t, Tt],
            [Ct, Ht]
          ];
        }
        const { position: rt, positionAbsolute: st } = ip({
          nodeId: ut,
          nextPosition: dt,
          nodeLookup: C,
          nodeExtent: gt || j,
          nodeOrigin: Z,
          onError: ot
        });
        vt = vt || W.position.x !== rt.x || W.position.y !== rt.y, W.position = rt, W.internals.positionAbsolute = st;
      }
      if (E = E || vt, !!vt && (ct(g, !0), z && (r || J || !B && tt))) {
        const [ut, W] = cd({
          nodeId: B,
          dragItems: g,
          nodeLookup: C
        });
        r?.(z, g, ut, W), J?.(z, ut, W), B || tt?.(z, W);
      }
    }
    async function Y() {
      if (!y)
        return;
      const { transform: it, panBy: at, autoPanSpeed: C, autoPanOnNodeDrag: j } = i();
      if (!j) {
        p = !1, cancelAnimationFrame(d);
        return;
      }
      const [O, U] = Zd(S, y, C);
      (O !== 0 || U !== 0) && (f.x = (f.x ?? 0) - O / it[2], f.y = (f.y ?? 0) - U / it[2], await at({ x: O, y: U }) && Q(f)), d = requestAnimationFrame(Y);
    }
    function lt(it) {
      const { nodeLookup: at, multiSelectionActive: C, nodesDraggable: j, transform: O, snapGrid: U, snapToGrid: Z, selectNodesOnDrag: J, onNodeDragStart: tt, onSelectionDragStart: ot, unselectNodesAndEdges: ct } = i();
      m = !0, (!J || !G) && !C && B && (at.get(B)?.selected || ct()), G && J && B && l?.(B);
      const vt = Au(it.sourceEvent, { transform: O, snapGrid: U, snapToGrid: Z, containerBounds: y });
      if (f = vt, g = pw(at, j, vt, B), g.size > 0 && (c || tt || !B && ot)) {
        const [T, F] = cd({
          nodeId: B,
          dragItems: g,
          nodeLookup: at
        });
        c?.(it.sourceEvent, g, T, F), tt?.(it.sourceEvent, T, F), B || ot?.(it.sourceEvent, F);
      }
    }
    const P = jv().clickDistance(H).on("start", (it) => {
      const { domNode: at, nodeDragThreshold: C, transform: j, snapGrid: O, snapToGrid: U } = i();
      y = at?.getBoundingClientRect() || null, b = !1, E = !1, z = it.sourceEvent, C === 0 && lt(it), f = Au(it.sourceEvent, { transform: j, snapGrid: O, snapToGrid: U, containerBounds: y }), S = pn(it.sourceEvent, y);
    }).on("drag", (it) => {
      const { autoPanOnNodeDrag: at, transform: C, snapGrid: j, snapToGrid: O, nodeDragThreshold: U, nodeLookup: Z } = i(), J = Au(it.sourceEvent, { transform: C, snapGrid: j, snapToGrid: O, containerBounds: y });
      if (z = it.sourceEvent, (it.sourceEvent.type === "touchmove" && it.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      B && !Z.has(B)) && (b = !0), !b) {
        if (!p && at && m && (p = !0, Y()), !m) {
          const tt = pn(it.sourceEvent, y), ot = tt.x - S.x, ct = tt.y - S.y;
          Math.sqrt(ot * ot + ct * ct) > U && lt(it);
        }
        (f.x !== J.xSnapped || f.y !== J.ySnapped) && g && m && (S = pn(it.sourceEvent, y), Q(J));
      }
    }).on("end", (it) => {
      if (!m || b) {
        b && g.size > 0 && i().updateNodePositions(g, !1);
        return;
      }
      if (p = !1, m = !1, cancelAnimationFrame(d), g.size > 0) {
        const { nodeLookup: at, updateNodePositions: C, onNodeDragStop: j, onSelectionDragStop: O } = i();
        if (E && (C(g, !1), E = !1), s || j || !B && O) {
          const [U, Z] = cd({
            nodeId: B,
            dragItems: g,
            nodeLookup: at,
            dragging: !1
          });
          s?.(it.sourceEvent, g, U, Z), j?.(it.sourceEvent, U, Z), B || O?.(it.sourceEvent, Z);
        }
      }
    }).filter((it) => {
      const at = it.target;
      return !it.button && (!R || !Gy(at, `.${R}`, A)) && (!_ || Gy(at, _, A));
    });
    v.call(P);
  }
  function N() {
    v?.on(".drag", null);
  }
  return {
    update: w,
    destroy: N
  };
}
function bw(l, i, c) {
  const r = [], s = {
    x: l.x - c,
    y: l.y - c,
    width: c * 2,
    height: c * 2
  };
  for (const f of i.values())
    Pc(s, Vu(f)) > 0 && r.push(f);
  return r;
}
const Ew = 250;
function _w(l, i, c, r) {
  let s = [], f = 1 / 0;
  const d = bw(l, c, i + Ew);
  for (const g of d) {
    const p = [...g.internals.handleBounds?.source ?? [], ...g.internals.handleBounds?.target ?? []];
    for (const S of p) {
      if (r.nodeId === S.nodeId && r.type === S.type && r.id === S.id)
        continue;
      const { x: y, y: m } = xa(g, S, S.position, !0), v = Math.sqrt(Math.pow(y - l.x, 2) + Math.pow(m - l.y, 2));
      v > i || (v < f ? (s = [{ ...S, x: y, y: m }], f = v) : v === f && s.push({ ...S, x: y, y: m }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const g = r.type === "source" ? "target" : "source";
    return s.find((p) => p.type === g) ?? s[0];
  }
  return s[0];
}
function wp(l, i, c, r, s, f = !1) {
  const d = r.get(l);
  if (!d)
    return null;
  const g = s === "strict" ? d.internals.handleBounds?.[i] : [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []], p = (c ? g?.find((S) => S.id === c) : g?.[0]) ?? null;
  return p && f ? { ...p, ...xa(d, p, p.position, !0) } : p;
}
function Np(l, i) {
  return l || (i?.classList.contains("target") ? "target" : i?.classList.contains("source") ? "source" : null);
}
function ww(l, i) {
  let c = null;
  return i ? c = !0 : l && !i && (c = !1), c;
}
const Tp = () => !0;
function Nw(l, { connectionMode: i, connectionRadius: c, handleId: r, nodeId: s, edgeUpdaterType: f, isTarget: d, domNode: g, nodeLookup: p, lib: S, autoPanOnConnect: y, flowId: m, panBy: v, cancelConnection: b, onConnectStart: E, onConnect: z, onConnectEnd: w, isValidConnection: N = Tp, onReconnectEnd: R, updateConnection: _, getTransform: A, getFromHandle: G, autoPanSpeed: B, dragThreshold: H = 1, handleDomNode: Q }) {
  const Y = hp(l.target);
  let lt = 0, P;
  const { x: it, y: at } = pn(l), C = Np(f, Q), j = g?.getBoundingClientRect();
  let O = !1;
  if (!j || !C)
    return;
  const U = wp(s, C, r, p, i);
  if (!U)
    return;
  let Z = pn(l, j), J = !1, tt = null, ot = !1, ct = null;
  function vt() {
    if (!y || !j)
      return;
    const [rt, st] = Zd(Z, j, B);
    v({ x: rt, y: st }), lt = requestAnimationFrame(vt);
  }
  const T = {
    ...U,
    nodeId: s,
    type: C,
    position: U.position
  }, F = p.get(s);
  let ut = {
    inProgress: !0,
    isValid: null,
    from: xa(F, T, xt.Left, !0),
    fromHandle: T,
    fromPosition: T.position,
    fromNode: F,
    to: Z,
    toHandle: null,
    toPosition: Dy[T.position],
    toNode: null,
    pointer: Z
  };
  function W() {
    O = !0, _(ut), E?.(l, { nodeId: s, handleId: r, handleType: C });
  }
  H === 0 && W();
  function dt(rt) {
    if (!O) {
      const { x: Ht, y: Ot } = pn(rt), Pt = Ht - it, Se = Ot - at;
      if (!(Pt * Pt + Se * Se > H * H))
        return;
      W();
    }
    if (!G() || !T) {
      gt(rt);
      return;
    }
    const st = A();
    Z = pn(rt, j), P = _w(Ju(Z, st, !1, [1, 1]), c, p, T), J || (vt(), J = !0);
    const pt = zp(rt, {
      handle: P,
      connectionMode: i,
      fromNodeId: s,
      fromHandleId: r,
      fromType: d ? "target" : "source",
      isValidConnection: N,
      doc: Y,
      lib: S,
      flowId: m,
      nodeLookup: p
    });
    ct = pt.handleDomNode, tt = pt.connection, ot = ww(!!P, pt.isValid);
    const _t = p.get(s), Ct = _t ? xa(_t, T, xt.Left, !0) : ut.from, Tt = {
      ...ut,
      from: Ct,
      isValid: ot,
      to: pt.toHandle && ot ? Ei({ x: pt.toHandle.x, y: pt.toHandle.y }, st) : Z,
      toHandle: pt.toHandle,
      toPosition: ot && pt.toHandle ? pt.toHandle.position : Dy[T.position],
      toNode: pt.toHandle ? p.get(pt.toHandle.nodeId) : null,
      pointer: Z
    };
    _(Tt), ut = Tt;
  }
  function gt(rt) {
    if (!("touches" in rt && rt.touches.length > 0)) {
      if (O) {
        (P || ct) && tt && ot && z?.(tt);
        const { inProgress: st, ...pt } = ut, _t = {
          ...pt,
          toPosition: ut.toHandle ? ut.toPosition : null
        };
        w?.(rt, _t), f && R?.(rt, _t);
      }
      b(), cancelAnimationFrame(lt), J = !1, ot = !1, tt = null, ct = null, Y.removeEventListener("mousemove", dt), Y.removeEventListener("mouseup", gt), Y.removeEventListener("touchmove", dt), Y.removeEventListener("touchend", gt);
    }
  }
  Y.addEventListener("mousemove", dt), Y.addEventListener("mouseup", gt), Y.addEventListener("touchmove", dt), Y.addEventListener("touchend", gt);
}
function zp(l, { handle: i, connectionMode: c, fromNodeId: r, fromHandleId: s, fromType: f, doc: d, lib: g, flowId: p, isValidConnection: S = Tp, nodeLookup: y }) {
  const m = f === "target", v = i ? d.querySelector(`.${g}-flow__handle[data-id="${p}-${i?.nodeId}-${i?.id}-${i?.type}"]`) : null, { x: b, y: E } = pn(l), z = d.elementFromPoint(b, E), w = z?.classList.contains(`${g}-flow__handle`) ? z : v, N = {
    handleDomNode: w,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (w) {
    const R = Np(void 0, w), _ = w.getAttribute("data-nodeid"), A = w.getAttribute("data-handleid"), G = w.classList.contains("connectable"), B = w.classList.contains("connectableend");
    if (!_ || !R)
      return N;
    const H = {
      source: m ? _ : r,
      sourceHandle: m ? A : s,
      target: m ? r : _,
      targetHandle: m ? s : A
    };
    N.connection = H;
    const Y = G && B && (c === xi.Strict ? m && R === "source" || !m && R === "target" : _ !== r || A !== s);
    N.isValid = Y && S(H), N.toHandle = wp(_, R, A, y, c, !0);
  }
  return N;
}
const Ad = {
  onPointerDown: Nw,
  isValid: zp
};
function Tw({ domNode: l, panZoom: i, getTransform: c, getViewScale: r }) {
  const s = $e(l);
  function f({ translateExtent: g, width: p, height: S, zoomStep: y = 1, pannable: m = !0, zoomable: v = !0, inversePan: b = !1 }) {
    const E = (_) => {
      if (_.sourceEvent.type !== "wheel" || !i)
        return;
      const A = c(), G = _.sourceEvent.ctrlKey && ju() ? 10 : 1, B = -_.sourceEvent.deltaY * (_.sourceEvent.deltaMode === 1 ? 0.05 : _.sourceEvent.deltaMode ? 1 : 2e-3) * y, H = A[2] * Math.pow(2, B * G);
      i.scaleTo(H);
    };
    let z = [0, 0];
    const w = (_) => {
      (_.sourceEvent.type === "mousedown" || _.sourceEvent.type === "touchstart") && (z = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ]);
    }, N = (_) => {
      const A = c();
      if (_.sourceEvent.type !== "mousemove" && _.sourceEvent.type !== "touchmove" || !i)
        return;
      const G = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ], B = [G[0] - z[0], G[1] - z[1]];
      z = G;
      const H = r() * Math.max(A[2], Math.log(A[2])) * (b ? -1 : 1), Q = {
        x: A[0] - B[0] * H,
        y: A[1] - B[1] * H
      }, Y = [
        [0, 0],
        [p, S]
      ];
      i.setViewportConstrained({
        x: Q.x,
        y: Q.y,
        zoom: A[2]
      }, Y, g);
    }, R = tp().on("start", w).on("zoom", m ? N : null).on("zoom.wheel", v ? E : null);
    s.call(R, {});
  }
  function d() {
    s.on("zoom", null);
  }
  return {
    update: f,
    destroy: d,
    pointer: mn
  };
}
const cr = (l) => ({
  x: l.x,
  y: l.y,
  zoom: l.k
}), rd = ({ x: l, y: i, zoom: c }) => ir.translate(l, i).scale(c), Bl = (l, i) => l.target.closest(`.${i}`), Cp = (l, i) => i === 2 && Array.isArray(l) && l.includes(2), zw = (l) => ((l *= 2) <= 1 ? l * l * l : (l -= 2) * l * l + 2) / 2, sd = (l, i = 0, c = zw, r = () => {
}) => {
  const s = typeof i == "number" && i > 0;
  return s || r(), s ? l.transition().duration(i).ease(c).on("end", r) : l;
}, Mp = (l) => {
  const i = l.ctrlKey && ju() ? 10 : 1;
  return -l.deltaY * (l.deltaMode === 1 ? 0.05 : l.deltaMode ? 1 : 2e-3) * i;
};
function Cw({ zoomPanValues: l, noWheelClassName: i, d3Selection: c, d3Zoom: r, panOnScrollMode: s, panOnScrollSpeed: f, zoomOnPinch: d, onPanZoomStart: g, onPanZoom: p, onPanZoomEnd: S }) {
  return (y) => {
    if (Bl(y, i))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const m = c.property("__zoom").k || 1;
    if (y.ctrlKey && d) {
      const w = mn(y), N = Mp(y), R = m * Math.pow(2, N);
      r.scaleTo(c, R, w, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let b = s === ma.Vertical ? 0 : y.deltaX * v, E = s === ma.Horizontal ? 0 : y.deltaY * v;
    !ju() && y.shiftKey && s !== ma.Vertical && (b = y.deltaY * v, E = 0), r.translateBy(
      c,
      -(b / m) * f,
      -(E / m) * f,
      // @ts-ignore
      { internal: !0 }
    );
    const z = cr(c.property("__zoom"));
    clearTimeout(l.panScrollTimeout), l.isPanScrolling ? p?.(y, z) : (l.isPanScrolling = !0, g?.(y, z)), l.panScrollTimeout = setTimeout(() => {
      S?.(y, z), l.isPanScrolling = !1;
    }, 150);
  };
}
function Mw({ noWheelClassName: l, preventScrolling: i, d3ZoomHandler: c }) {
  return function(r, s) {
    const f = r.type === "wheel", d = !i && f && !r.ctrlKey, g = Bl(r, l);
    if (r.ctrlKey && f && g && r.preventDefault(), d || g)
      return null;
    r.preventDefault(), c.call(this, r, s);
  };
}
function Aw({ zoomPanValues: l, onDraggingChange: i, onPanZoomStart: c }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const s = cr(r.transform);
    l.mouseButton = r.sourceEvent?.button || 0, l.isZoomingOrPanning = !0, l.prevViewport = s, r.sourceEvent?.type === "mousedown" && i(!0), c && c?.(r.sourceEvent, s);
  };
}
function Ow({ zoomPanValues: l, panOnDrag: i, onPaneContextMenu: c, onTransformChange: r, onPanZoom: s }) {
  return (f) => {
    l.usedRightMouseButton = !!(c && Cp(i, l.mouseButton ?? 0)), f.sourceEvent?.sync || r([f.transform.x, f.transform.y, f.transform.k]), s && !f.sourceEvent?.internal && s?.(f.sourceEvent, cr(f.transform));
  };
}
function Dw({ zoomPanValues: l, panOnDrag: i, panOnScroll: c, onDraggingChange: r, onPanZoomEnd: s, onPaneContextMenu: f }) {
  return (d) => {
    if (!d.sourceEvent?.internal && (l.isZoomingOrPanning = !1, f && Cp(i, l.mouseButton ?? 0) && !l.usedRightMouseButton && d.sourceEvent && f(d.sourceEvent), l.usedRightMouseButton = !1, r(!1), s)) {
      const g = cr(d.transform);
      l.prevViewport = g, clearTimeout(l.timerId), l.timerId = setTimeout(
        () => {
          s?.(d.sourceEvent, g);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        c ? 150 : 0
      );
    }
  };
}
function Rw({ panActivationKeyPressed: l, zoomActivationKeyPressed: i, zoomOnScroll: c, zoomOnPinch: r, panOnDrag: s, panOnScroll: f, zoomOnDoubleClick: d, userSelectionActive: g, noWheelClassName: p, noPanClassName: S, lib: y, connectionInProgress: m }) {
  return (v) => {
    const b = i || c, E = r && v.ctrlKey, z = v.type === "wheel";
    if (v.button === 1 && v.type === "mousedown" && (Bl(v, `${y}-flow__node`) || Bl(v, `${y}-flow__edge`) || Bl(v, `${y}-flow__selection`) || Bl(v, `${y}-flow__nodesselection`)))
      return !0;
    if (!s && !b && !f && !d && !r || g || m && !z || Bl(v, p) && z || Bl(v, S) && (!z || f && z && !i) || !r && v.ctrlKey && z)
      return !1;
    if (!r && v.type === "touchstart" && v.touches?.length > 1)
      return v.preventDefault(), !1;
    if (!b && !f && !E && z || !s && (v.type === "mousedown" || v.type === "touchstart") || Array.isArray(s) && !s.includes(v.button) && v.type === "mousedown")
      return !1;
    const w = Array.isArray(s) && s.includes(v.button) || !v.button || v.button <= 1;
    return (!v.ctrlKey || z || l) && w;
  };
}
function Hw({ domNode: l, minZoom: i, maxZoom: c, translateExtent: r, viewport: s, onPanZoom: f, onPanZoomStart: d, onPanZoomEnd: g, onDraggingChange: p }) {
  const S = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = l.getBoundingClientRect();
  let m = [
    [0, 0],
    [y.width, y.height]
  ];
  (typeof ResizeObserver < "u" ? new ResizeObserver((at) => {
    const C = at[0];
    C && (m = [
      [0, 0],
      [C.contentRect.width, C.contentRect.height]
    ]);
  }) : null)?.observe(l);
  const b = tp().extent(() => m).scaleExtent([i, c]).translateExtent(r), E = $e(l).call(b);
  A({
    x: s.x,
    y: s.y,
    zoom: bi(s.zoom, i, c)
  }, [
    [0, 0],
    [y.width, y.height]
  ], r);
  const z = E.on("wheel.zoom"), w = E.on("dblclick.zoom");
  b.wheelDelta(Mp);
  async function N(at, C) {
    return E ? new Promise((j) => {
      b?.interpolate(C?.interpolate === "linear" ? Mu : qc).transform(sd(E, C?.duration, C?.ease, () => j(!0)), at);
    }) : !1;
  }
  function R({ noWheelClassName: at, noPanClassName: C, onPaneContextMenu: j, userSelectionActive: O, panOnScroll: U, panOnDrag: Z, panOnScrollMode: J, panOnScrollSpeed: tt, preventScrolling: ot, zoomOnPinch: ct, zoomOnScroll: vt, zoomOnDoubleClick: T, panActivationKeyPressed: F = !1, zoomActivationKeyPressed: ft, lib: ut, onTransformChange: W, connectionInProgress: dt, paneClickDistance: gt, selectionOnDrag: rt }) {
    O && !S.isZoomingOrPanning && _();
    const st = U && !ft && !O;
    b.clickDistance(rt ? 1 / 0 : !vn(gt) || gt < 0 ? 0 : gt);
    const pt = st ? Cw({
      zoomPanValues: S,
      noWheelClassName: at,
      d3Selection: E,
      d3Zoom: b,
      panOnScrollMode: J,
      panOnScrollSpeed: tt,
      zoomOnPinch: ct,
      onPanZoomStart: d,
      onPanZoom: f,
      onPanZoomEnd: g
    }) : Mw({
      noWheelClassName: at,
      preventScrolling: ot,
      d3ZoomHandler: z
    });
    E.on("wheel.zoom", pt, { passive: !1 });
    const _t = Aw({
      zoomPanValues: S,
      onDraggingChange: p,
      onPanZoomStart: d
    });
    b.on("start", _t);
    const Ct = Ow({
      zoomPanValues: S,
      panOnDrag: Z,
      onPaneContextMenu: !!j,
      onPanZoom: f,
      onTransformChange: W
    });
    b.on("zoom", Ct);
    const Tt = Dw({
      zoomPanValues: S,
      panOnDrag: Z,
      panOnScroll: U,
      onPaneContextMenu: j,
      onPanZoomEnd: g,
      onDraggingChange: p
    });
    b.on("end", Tt);
    const Ht = Rw({
      panActivationKeyPressed: F,
      zoomActivationKeyPressed: ft,
      panOnDrag: Z,
      zoomOnScroll: vt,
      panOnScroll: U,
      zoomOnDoubleClick: T,
      zoomOnPinch: ct,
      userSelectionActive: O,
      noPanClassName: C,
      noWheelClassName: at,
      lib: ut,
      connectionInProgress: dt
    });
    b.filter(Ht), T ? E.on("dblclick.zoom", w) : E.on("dblclick.zoom", null);
  }
  function _() {
    b.on("zoom", null);
  }
  async function A(at, C, j) {
    const O = rd(at), U = b?.constrain()(O, C, j);
    return U && await N(U), U;
  }
  async function G(at, C) {
    const j = rd(at);
    return await N(j, C), j;
  }
  function B(at) {
    if (E) {
      const C = rd(at), j = E.property("__zoom");
      (j.k !== at.zoom || j.x !== at.x || j.y !== at.y) && b?.transform(E, C, null, { sync: !0 });
    }
  }
  function H() {
    const at = E ? Pv(E.node()) : { x: 0, y: 0, k: 1 };
    return { x: at.x, y: at.y, zoom: at.k };
  }
  async function Q(at, C) {
    return E ? new Promise((j) => {
      b?.interpolate(C?.interpolate === "linear" ? Mu : qc).scaleTo(sd(E, C?.duration, C?.ease, () => j(!0)), at);
    }) : !1;
  }
  async function Y(at, C) {
    return E ? new Promise((j) => {
      b?.interpolate(C?.interpolate === "linear" ? Mu : qc).scaleBy(sd(E, C?.duration, C?.ease, () => j(!0)), at);
    }) : !1;
  }
  function lt(at) {
    b?.scaleExtent(at);
  }
  function P(at) {
    b?.translateExtent(at);
  }
  function it(at) {
    const C = !vn(at) || at < 0 ? 0 : at;
    b?.clickDistance(C);
  }
  return {
    update: R,
    destroy: _,
    setViewport: G,
    setViewportConstrained: A,
    getViewport: H,
    scaleTo: Q,
    scaleBy: Y,
    setScaleExtent: lt,
    setTranslateExtent: P,
    syncViewport: B,
    setClickDistance: it
  };
}
var _i;
(function(l) {
  l.Line = "line", l.Handle = "handle";
})(_i || (_i = {}));
function Uw({ width: l, prevWidth: i, height: c, prevHeight: r, affectsX: s, affectsY: f }) {
  const d = l - i, g = c - r, p = [d > 0 ? 1 : d < 0 ? -1 : 0, g > 0 ? 1 : g < 0 ? -1 : 0];
  return d && s && (p[0] = p[0] * -1), g && f && (p[1] = p[1] * -1), p;
}
function Qy(l) {
  const i = l.includes("right") || l.includes("left"), c = l.includes("bottom") || l.includes("top"), r = l.includes("left"), s = l.includes("top");
  return {
    isHorizontal: i,
    isVertical: c,
    affectsX: r,
    affectsY: s
  };
}
function Hl(l, i) {
  return Math.max(0, i - l);
}
function Ul(l, i) {
  return Math.max(0, l - i);
}
function Yc(l, i, c) {
  return Math.max(0, i - l, l - c);
}
function Ky(l, i) {
  return l ? !i : i;
}
function Bw(l, i, c, r, s, f, d, g) {
  let { affectsX: p, affectsY: S } = i;
  const { isHorizontal: y, isVertical: m } = i, v = y && m, { xSnapped: b, ySnapped: E } = c, { minWidth: z, maxWidth: w, minHeight: N, maxHeight: R } = r, { x: _, y: A, width: G, height: B, aspectRatio: H } = l;
  let Q = Math.floor(y ? b - l.pointerX : 0), Y = Math.floor(m ? E - l.pointerY : 0);
  const lt = G + (p ? -Q : Q), P = B + (S ? -Y : Y), it = -f[0] * G, at = -f[1] * B;
  let C = Yc(lt, z, w), j = Yc(P, N, R);
  if (d) {
    let Z = 0, J = 0;
    p && Q < 0 ? Z = Hl(_ + Q + it, d[0][0]) : !p && Q > 0 && (Z = Ul(_ + lt + it, d[1][0])), S && Y < 0 ? J = Hl(A + Y + at, d[0][1]) : !S && Y > 0 && (J = Ul(A + P + at, d[1][1])), C = Math.max(C, Z), j = Math.max(j, J);
  }
  if (g) {
    let Z = 0, J = 0;
    p && Q > 0 ? Z = Ul(_ + Q, g[0][0]) : !p && Q < 0 && (Z = Hl(_ + lt, g[1][0])), S && Y > 0 ? J = Ul(A + Y, g[0][1]) : !S && Y < 0 && (J = Hl(A + P, g[1][1])), C = Math.max(C, Z), j = Math.max(j, J);
  }
  if (s) {
    if (y) {
      const Z = Yc(lt / H, N, R) * H;
      if (C = Math.max(C, Z), d) {
        let J = 0;
        !p && !S || p && !S && v ? J = Ul(A + at + lt / H, d[1][1]) * H : J = Hl(A + at + (p ? Q : -Q) / H, d[0][1]) * H, C = Math.max(C, J);
      }
      if (g) {
        let J = 0;
        !p && !S || p && !S && v ? J = Hl(A + lt / H, g[1][1]) * H : J = Ul(A + (p ? Q : -Q) / H, g[0][1]) * H, C = Math.max(C, J);
      }
    }
    if (m) {
      const Z = Yc(P * H, z, w) / H;
      if (j = Math.max(j, Z), d) {
        let J = 0;
        !p && !S || S && !p && v ? J = Ul(_ + P * H + it, d[1][0]) / H : J = Hl(_ + (S ? Y : -Y) * H + it, d[0][0]) / H, j = Math.max(j, J);
      }
      if (g) {
        let J = 0;
        !p && !S || S && !p && v ? J = Hl(_ + P * H, g[1][0]) / H : J = Ul(_ + (S ? Y : -Y) * H, g[0][0]) / H, j = Math.max(j, J);
      }
    }
  }
  Y = Y + (Y < 0 ? j : -j), Q = Q + (Q < 0 ? C : -C), s && (v ? lt > P * H ? Y = (Ky(p, S) ? -Q : Q) / H : Q = (Ky(p, S) ? -Y : Y) * H : y ? (Y = Q / H, S = p) : (Q = Y * H, p = S));
  const O = p ? _ + Q : _, U = S ? A + Y : A;
  return {
    width: G + (p ? -Q : Q),
    height: B + (S ? -Y : Y),
    x: f[0] * Q * (p ? -1 : 1) + O,
    y: f[1] * Y * (S ? -1 : 1) + U
  };
}
const Ap = { width: 0, height: 0, x: 0, y: 0 }, Yw = {
  ...Ap,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function Vw(l, i, c) {
  const r = i.position.x + l.position.x, s = i.position.y + l.position.y, f = l.measured.width ?? 0, d = l.measured.height ?? 0, g = c[0] * f, p = c[1] * d;
  return [
    [r - g, s - p],
    [r + f - g, s + d - p]
  ];
}
function jw({ domNode: l, nodeId: i, getStoreItems: c, onChange: r, onEnd: s }) {
  const f = $e(l);
  let d = {
    controlDirection: Qy("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function g({ controlPosition: S, boundaries: y, keepAspectRatio: m, resizeDirection: v, onResizeStart: b, onResize: E, onResizeEnd: z, shouldResize: w }) {
    let N = { ...Ap }, R = { ...Yw };
    d = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: m,
      controlDirection: Qy(S)
    };
    let _, A = null, G = [], B, H, Q, Y = !1;
    const lt = jv().on("start", (P) => {
      const { nodeLookup: it, transform: at, snapGrid: C, snapToGrid: j, nodeOrigin: O, paneDomNode: U } = c();
      if (_ = it.get(i), !_)
        return;
      A = U?.getBoundingClientRect() ?? null;
      const { xSnapped: Z, ySnapped: J } = Au(P.sourceEvent, {
        transform: at,
        snapGrid: C,
        snapToGrid: j,
        containerBounds: A
      });
      N = {
        width: _.measured.width ?? 0,
        height: _.measured.height ?? 0,
        x: _.position.x ?? 0,
        y: _.position.y ?? 0
      }, R = {
        ...N,
        pointerX: Z,
        pointerY: J,
        aspectRatio: N.width / N.height
      }, B = void 0, H = Sa(_.extent) ? _.extent : void 0, _.parentId && (_.extent === "parent" || _.expandParent) && (B = it.get(_.parentId)), B && _.extent === "parent" && (H = [
        [0, 0],
        [B.measured.width, B.measured.height]
      ]), G = [], Q = void 0;
      for (const [tt, ot] of it)
        if (ot.parentId === i && (G.push({
          id: tt,
          position: { ...ot.position },
          extent: ot.extent
        }), ot.extent === "parent" || ot.expandParent)) {
          const ct = Vw(ot, _, ot.origin ?? O);
          Q ? Q = [
            [Math.min(ct[0][0], Q[0][0]), Math.min(ct[0][1], Q[0][1])],
            [Math.max(ct[1][0], Q[1][0]), Math.max(ct[1][1], Q[1][1])]
          ] : Q = ct;
        }
      b?.(P, { ...N });
    }).on("drag", (P) => {
      const { transform: it, snapGrid: at, snapToGrid: C, nodeOrigin: j } = c(), O = Au(P.sourceEvent, {
        transform: it,
        snapGrid: at,
        snapToGrid: C,
        containerBounds: A
      }), U = [];
      if (!_)
        return;
      const { x: Z, y: J, width: tt, height: ot } = N, ct = {}, vt = _.origin ?? j, { width: T, height: F, x: ft, y: ut } = Bw(R, d.controlDirection, O, d.boundaries, d.keepAspectRatio, vt, H, Q), W = T !== tt, dt = F !== ot, gt = ft !== Z && W, rt = ut !== J && dt;
      if (!gt && !rt && !W && !dt)
        return;
      if ((gt || rt || vt[0] === 1 || vt[1] === 1) && (ct.x = gt ? ft : N.x, ct.y = rt ? ut : N.y, N.x = ct.x, N.y = ct.y, G.length > 0)) {
        const Ct = ft - Z, Tt = ut - J;
        for (const Ht of G)
          Ht.position = {
            x: Ht.position.x - Ct + vt[0] * (T - tt),
            y: Ht.position.y - Tt + vt[1] * (F - ot)
          }, U.push(Ht);
      }
      if ((W || dt) && (ct.width = W && (!d.resizeDirection || d.resizeDirection === "horizontal") ? T : N.width, ct.height = dt && (!d.resizeDirection || d.resizeDirection === "vertical") ? F : N.height, N.width = ct.width, N.height = ct.height), B && _.expandParent) {
        const Ct = vt[0] * (ct.width ?? 0);
        ct.x && ct.x < Ct && (N.x = Ct, R.x = R.x - (ct.x - Ct));
        const Tt = vt[1] * (ct.height ?? 0);
        ct.y && ct.y < Tt && (N.y = Tt, R.y = R.y - (ct.y - Tt));
      }
      const st = Uw({
        width: N.width,
        prevWidth: tt,
        height: N.height,
        prevHeight: ot,
        affectsX: d.controlDirection.affectsX,
        affectsY: d.controlDirection.affectsY
      }), pt = { ...N, direction: st };
      w?.(P, pt) !== !1 && (Y = !0, E?.(P, pt), r(ct, U));
    }).on("end", (P) => {
      Y && (z?.(P, { ...N }), s?.({ ...N }), Y = !1);
    });
    f.call(lt);
  }
  function p() {
    f.on(".drag", null);
  }
  return {
    update: g,
    destroy: p
  };
}
var fd = { exports: {} }, dd = {}, hd = { exports: {} }, gd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $y;
function Lw() {
  if ($y) return gd;
  $y = 1;
  var l = Xu();
  function i(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var c = typeof Object.is == "function" ? Object.is : i, r = l.useState, s = l.useEffect, f = l.useLayoutEffect, d = l.useDebugValue;
  function g(m, v) {
    var b = v(), E = r({ inst: { value: b, getSnapshot: v } }), z = E[0].inst, w = E[1];
    return f(
      function() {
        z.value = b, z.getSnapshot = v, p(z) && w({ inst: z });
      },
      [m, b, v]
    ), s(
      function() {
        return p(z) && w({ inst: z }), m(function() {
          p(z) && w({ inst: z });
        });
      },
      [m]
    ), d(b), b;
  }
  function p(m) {
    var v = m.getSnapshot;
    m = m.value;
    try {
      var b = v();
      return !c(m, b);
    } catch {
      return !0;
    }
  }
  function S(m, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? S : g;
  return gd.useSyncExternalStore = l.useSyncExternalStore !== void 0 ? l.useSyncExternalStore : y, gd;
}
var Jy;
function qw() {
  return Jy || (Jy = 1, hd.exports = Lw()), hd.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Iy;
function Xw() {
  if (Iy) return dd;
  Iy = 1;
  var l = Xu(), i = qw();
  function c(S, y) {
    return S === y && (S !== 0 || 1 / S === 1 / y) || S !== S && y !== y;
  }
  var r = typeof Object.is == "function" ? Object.is : c, s = i.useSyncExternalStore, f = l.useRef, d = l.useEffect, g = l.useMemo, p = l.useDebugValue;
  return dd.useSyncExternalStoreWithSelector = function(S, y, m, v, b) {
    var E = f(null);
    if (E.current === null) {
      var z = { hasValue: !1, value: null };
      E.current = z;
    } else z = E.current;
    E = g(
      function() {
        function N(B) {
          if (!R) {
            if (R = !0, _ = B, B = v(B), b !== void 0 && z.hasValue) {
              var H = z.value;
              if (b(H, B))
                return A = H;
            }
            return A = B;
          }
          if (H = A, r(_, B)) return H;
          var Q = v(B);
          return b !== void 0 && b(H, Q) ? (_ = B, H) : (_ = B, A = Q);
        }
        var R = !1, _, A, G = m === void 0 ? null : m;
        return [
          function() {
            return N(y());
          },
          G === null ? void 0 : function() {
            return N(G());
          }
        ];
      },
      [y, m, v, b]
    );
    var w = s(S, E[0], E[1]);
    return d(
      function() {
        z.hasValue = !0, z.value = w;
      },
      [w]
    ), p(w), w;
  }, dd;
}
var ky;
function Zw() {
  return ky || (ky = 1, fd.exports = Xw()), fd.exports;
}
var Gw = Zw();
const Qw = /* @__PURE__ */ qu(Gw), Kw = {}, Fy = (l) => {
  let i;
  const c = /* @__PURE__ */ new Set(), r = (y, m) => {
    const v = typeof y == "function" ? y(i) : y;
    if (!Object.is(v, i)) {
      const b = i;
      i = m ?? (typeof v != "object" || v === null) ? v : Object.assign({}, i, v), c.forEach((E) => E(i, b));
    }
  }, s = () => i, p = { setState: r, getState: s, getInitialState: () => S, subscribe: (y) => (c.add(y), () => c.delete(y)), destroy: () => {
    (Kw ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), c.clear();
  } }, S = i = l(r, s, p);
  return p;
}, $w = (l) => l ? Fy(l) : Fy, { useDebugValue: Jw } = vd, { useSyncExternalStoreWithSelector: Iw } = Qw, kw = (l) => l;
function Op(l, i = kw, c) {
  const r = Iw(
    l.subscribe,
    l.getState,
    l.getServerState || l.getInitialState,
    i,
    c
  );
  return Jw(r), r;
}
const Wy = (l, i) => {
  const c = $w(l), r = (s, f = i) => Op(c, s, f);
  return Object.assign(r, c), r;
}, Fw = (l, i) => l ? Wy(l, i) : Wy;
function kt(l, i) {
  if (Object.is(l, i))
    return !0;
  if (typeof l != "object" || l === null || typeof i != "object" || i === null)
    return !1;
  if (l instanceof Map && i instanceof Map) {
    if (l.size !== i.size) return !1;
    for (const [r, s] of l)
      if (!Object.is(s, i.get(r)))
        return !1;
    return !0;
  }
  if (l instanceof Set && i instanceof Set) {
    if (l.size !== i.size) return !1;
    for (const r of l)
      if (!i.has(r))
        return !1;
    return !0;
  }
  const c = Object.keys(l);
  if (c.length !== Object.keys(i).length)
    return !1;
  for (const r of c)
    if (!Object.prototype.hasOwnProperty.call(i, r) || !Object.is(l[r], i[r]))
      return !1;
  return !0;
}
const rr = k.createContext(null), Ww = rr.Provider, Dp = Sn.error001("react");
function Bt(l, i) {
  const c = k.useContext(rr);
  if (c === null)
    throw new Error(Dp);
  return Op(c, l, i);
}
function $t() {
  const l = k.useContext(rr);
  if (l === null)
    throw new Error(Dp);
  return k.useMemo(() => ({
    getState: l.getState,
    setState: l.setState,
    subscribe: l.subscribe
  }), [l]);
}
const Py = { display: "none" }, Pw = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Rp = "react-flow__node-desc", Hp = "react-flow__edge-desc", tN = "react-flow__aria-live", eN = (l) => l.ariaLiveMessage, nN = (l) => l.ariaLabelConfig;
function lN({ rfId: l }) {
  const i = Bt(eN);
  return q.jsx("div", { id: `${tN}-${l}`, "aria-live": "assertive", "aria-atomic": "true", style: Pw, children: i });
}
function aN({ rfId: l, disableKeyboardA11y: i }) {
  const c = Bt(nN);
  return q.jsxs(q.Fragment, { children: [q.jsx("div", { id: `${Rp}-${l}`, style: Py, children: i ? c["node.a11yDescription.default"] : c["node.a11yDescription.keyboardDisabled"] }), q.jsx("div", { id: `${Hp}-${l}`, style: Py, children: c["edge.a11yDescription.default"] }), !i && q.jsx(lN, { rfId: l })] });
}
const sr = k.forwardRef(({ position: l = "top-left", children: i, className: c, style: r, ...s }, f) => {
  const d = `${l}`.split("-");
  return q.jsx("div", { className: ue(["react-flow__panel", c, ...d]), style: r, ref: f, ...s, children: i });
});
sr.displayName = "Panel";
const tv = "https://reactflow.dev?utm_source=attribution";
function iN({ proOptions: l, position: i = "bottom-right" }) {
  return k.useEffect(() => {
  }, []), l?.hideAttribution ? null : q.jsx(sr, { position: i, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${tv}`, children: q.jsx("a", { href: tv, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const uN = (l) => {
  const i = [], c = [];
  for (const [, r] of l.nodeLookup)
    r.selected && i.push(r.internals.userNode);
  for (const [, r] of l.edgeLookup)
    r.selected && c.push(r);
  return { selectedNodes: i, selectedEdges: c };
}, Vc = (l) => l.id;
function oN(l, i) {
  return kt(l.selectedNodes.map(Vc), i.selectedNodes.map(Vc)) && kt(l.selectedEdges.map(Vc), i.selectedEdges.map(Vc));
}
function cN({ onSelectionChange: l }) {
  const i = $t(), { selectedNodes: c, selectedEdges: r } = Bt(uN, oN);
  return k.useEffect(() => {
    const s = { nodes: c, edges: r };
    l?.(s), i.getState().onSelectionChangeHandlers.forEach((f) => f(s));
  }, [c, r, l]), null;
}
const rN = (l) => !!l.onSelectionChangeHandlers;
function sN({ onSelectionChange: l }) {
  const i = Bt(rN);
  return l || i ? q.jsx(cN, { onSelectionChange: l }) : null;
}
const Up = [0, 0], fN = { x: 0, y: 0, zoom: 1 }, dN = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "ariaLabelConfig",
  "zIndexMode"
], ev = [...dN, "rfId"], hN = (l) => ({
  setNodes: l.setNodes,
  setEdges: l.setEdges,
  setMinZoom: l.setMinZoom,
  setMaxZoom: l.setMaxZoom,
  setTranslateExtent: l.setTranslateExtent,
  setNodeExtent: l.setNodeExtent,
  reset: l.reset,
  setDefaultNodesAndEdges: l.setDefaultNodesAndEdges
}), nv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Uu,
  nodeOrigin: Up,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function gN(l) {
  const { setNodes: i, setEdges: c, setMinZoom: r, setMaxZoom: s, setTranslateExtent: f, setNodeExtent: d, reset: g, setDefaultNodesAndEdges: p } = Bt(hN, kt), S = $t();
  k.useEffect(() => (p(l.defaultNodes, l.defaultEdges), () => {
    y.current = nv, g();
  }), []);
  const y = k.useRef(nv);
  return k.useEffect(
    () => {
      for (const m of ev) {
        const v = l[m], b = y.current[m];
        v !== b && (typeof l[m] > "u" || (m === "nodes" ? i(v) : m === "edges" ? c(v) : m === "minZoom" ? r(v) : m === "maxZoom" ? s(v) : m === "translateExtent" ? f(v) : m === "nodeExtent" ? d(v) : m === "ariaLabelConfig" ? S.setState({ ariaLabelConfig: W2(v) }) : m === "fitView" ? S.setState({ fitViewQueued: v }) : m === "fitViewOptions" ? S.setState({ fitViewOptions: v }) : S.setState({ [m]: v })));
      }
      y.current = l;
    },
    // Only re-run the effect if one of the fields we track changes
    ev.map((m) => l[m])
  ), null;
}
function lv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function mN(l) {
  const [i, c] = k.useState(l === "system" ? null : l);
  return k.useEffect(() => {
    if (l !== "system") {
      c(l);
      return;
    }
    const r = lv(), s = () => c(r?.matches ? "dark" : "light");
    return s(), r?.addEventListener("change", s), () => {
      r?.removeEventListener("change", s);
    };
  }, [l]), i !== null ? i : lv()?.matches ? "dark" : "light";
}
const av = typeof document < "u" ? document : null;
function Lu(l = null, i = { target: av, actInsideInputWithModifier: !0 }) {
  const [c, r] = k.useState(!1), s = k.useRef(!1), f = k.useRef(/* @__PURE__ */ new Set([])), [d, g] = k.useMemo(() => {
    if (l !== null) {
      const S = (Array.isArray(l) ? l : [l]).filter((m) => typeof m == "string").map((m) => m.replace(/\+/g, `
`).replace(`

`, `
+`).split(`
`)), y = S.reduce((m, v) => m.concat(...v), []);
      return [S, y];
    }
    return [[], []];
  }, [l]);
  return k.useEffect(() => {
    const p = i?.target ?? av, S = i?.actInsideInputWithModifier ?? !0;
    if (l !== null) {
      const y = (b) => {
        if (s.current = b.ctrlKey || b.metaKey || b.shiftKey || b.altKey, (!s.current || s.current && !S) && gp(b))
          return !1;
        const z = uv(b.code, g);
        if (f.current.add(b[z]), iv(d, f.current, !1)) {
          const w = b.composedPath?.()?.[0] || b.target, N = w?.nodeName === "BUTTON" || w?.nodeName === "A";
          i.preventDefault !== !1 && (s.current || !N) && b.preventDefault(), r(!0);
        }
      }, m = (b) => {
        const E = uv(b.code, g);
        iv(d, f.current, !0) ? (r(!1), f.current.clear()) : f.current.delete(b[E]), b.key === "Meta" && f.current.clear(), s.current = !1;
      }, v = () => {
        f.current.clear(), r(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", m), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", m), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [l, r]), c;
}
function iv(l, i, c) {
  return l.filter((r) => c || r.length === i.size).some((r) => r.every((s) => i.has(s)));
}
function uv(l, i) {
  return i.includes(l) ? "code" : "key";
}
const yN = () => {
  const l = $t();
  return k.useMemo(() => ({
    zoomIn: async (i) => {
      const { panZoom: c } = l.getState();
      return c ? c.scaleBy(1.2, i) : !1;
    },
    zoomOut: async (i) => {
      const { panZoom: c } = l.getState();
      return c ? c.scaleBy(1 / 1.2, i) : !1;
    },
    zoomTo: async (i, c) => {
      const { panZoom: r } = l.getState();
      return r ? r.scaleTo(i, c) : !1;
    },
    getZoom: () => l.getState().transform[2],
    setViewport: async (i, c) => {
      const { transform: [r, s, f], panZoom: d } = l.getState();
      return d ? (await d.setViewport({
        x: i.x ?? r,
        y: i.y ?? s,
        zoom: i.zoom ?? f
      }, c), !0) : !1;
    },
    getViewport: () => {
      const [i, c, r] = l.getState().transform;
      return { x: i, y: c, zoom: r };
    },
    setCenter: async (i, c, r) => l.getState().setCenter(i, c, r),
    fitBounds: async (i, c) => {
      const { width: r, height: s, minZoom: f, maxZoom: d, panZoom: g } = l.getState(), p = Gd(i, r, s, f, d, c?.padding ?? 0.1);
      return g ? (await g.setViewport(p, {
        duration: c?.duration,
        ease: c?.ease,
        interpolate: c?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (i, c = {}) => {
      const { transform: r, snapGrid: s, snapToGrid: f, domNode: d } = l.getState();
      if (!d)
        return i;
      const { x: g, y: p } = d.getBoundingClientRect(), S = {
        x: i.x - g,
        y: i.y - p
      }, y = c.snapGrid ?? s, m = c.snapToGrid ?? f;
      return Ju(S, r, m, y);
    },
    flowToScreenPosition: (i) => {
      const { transform: c, domNode: r } = l.getState();
      if (!r)
        return i;
      const { x: s, y: f } = r.getBoundingClientRect(), d = Ei(i, c);
      return {
        x: d.x + s,
        y: d.y + f
      };
    }
  }), []);
};
function Bp(l, i) {
  const c = [], r = /* @__PURE__ */ new Map(), s = [];
  for (const f of l)
    if (f.type === "add") {
      s.push(f);
      continue;
    } else if (f.type === "remove" || f.type === "replace")
      r.set(f.id, [f]);
    else {
      const d = r.get(f.id);
      d ? d.push(f) : r.set(f.id, [f]);
    }
  for (const f of i) {
    const d = r.get(f.id);
    if (!d) {
      c.push(f);
      continue;
    }
    if (d[0].type === "remove")
      continue;
    if (d[0].type === "replace") {
      c.push({ ...d[0].item });
      continue;
    }
    const g = { ...f };
    for (const p of d)
      vN(p, g);
    c.push(g);
  }
  return s.length && s.forEach((f) => {
    f.index !== void 0 ? c.splice(f.index, 0, { ...f.item }) : c.push({ ...f.item });
  }), c;
}
function vN(l, i) {
  switch (l.type) {
    case "select": {
      i.selected = l.selected;
      break;
    }
    case "position": {
      typeof l.position < "u" && (i.position = l.position), typeof l.dragging < "u" && (i.dragging = l.dragging);
      break;
    }
    case "dimensions": {
      typeof l.dimensions < "u" && (i.measured = {
        ...l.dimensions
      }, l.setAttributes && ((l.setAttributes === !0 || l.setAttributes === "width") && (i.width = l.dimensions.width), (l.setAttributes === !0 || l.setAttributes === "height") && (i.height = l.dimensions.height))), typeof l.resizing == "boolean" && (i.resizing = l.resizing);
      break;
    }
  }
}
function pN(l, i) {
  return Bp(l, i);
}
function SN(l, i) {
  return Bp(l, i);
}
function da(l, i) {
  return {
    id: l,
    type: "select",
    selected: i
  };
}
function mi(l, i = /* @__PURE__ */ new Set(), c = !1) {
  const r = [];
  for (const [s, f] of l) {
    const d = i.has(s);
    !(f.selected === void 0 && !d) && f.selected !== d && (c && (f.selected = d), r.push(da(f.id, d)));
  }
  return r;
}
function ov({ items: l = [], lookup: i }) {
  const c = [], r = new Map(l.map((s) => [s.id, s]));
  for (const [s, f] of l.entries()) {
    const d = i.get(f.id), g = d?.internals?.userNode ?? d;
    g !== void 0 && g !== f && c.push({ id: f.id, item: f, type: "replace" }), g === void 0 && c.push({ item: f, type: "add", index: s });
  }
  for (const [s] of i)
    r.get(s) === void 0 && c.push({ id: s, type: "remove" });
  return c;
}
function cv(l) {
  return {
    id: l.id,
    type: "remove"
  };
}
const xN = rp();
function Yp(l, i, c = {}) {
  return aw(l, i, {
    ...c,
    onError: c.onError ?? xN
  });
}
const rv = (l) => Z2(l), bN = (l) => ap(l);
function Vp(l) {
  return k.forwardRef(l);
}
const jp = typeof window < "u" ? k.useLayoutEffect : k.useEffect;
function sv(l) {
  const [i, c] = k.useState(BigInt(0)), [r] = k.useState(() => EN(() => c((s) => s + BigInt(1))));
  return jp(() => {
    const s = r.get();
    s.length && (l(s), r.reset());
  }, [i]), r;
}
function EN(l) {
  let i = [];
  return {
    get: () => i,
    reset: () => {
      i = [];
    },
    push: (c) => {
      i.push(c), l();
    }
  };
}
const Lp = k.createContext(null);
function _N({ children: l }) {
  const i = $t(), c = k.useCallback((g) => {
    const { nodes: p = [], setNodes: S, hasDefaultNodes: y, onNodesChange: m, nodeLookup: v, fitViewQueued: b, onNodesChangeMiddlewareMap: E } = i.getState();
    let z = p;
    for (const N of g)
      z = typeof N == "function" ? N(z) : N;
    let w = ov({
      items: z,
      lookup: v
    });
    for (const N of E.values())
      w = N(w);
    y && S(z), w.length > 0 ? m?.(w) : b && window.requestAnimationFrame(() => {
      const { fitViewQueued: N, nodes: R, setNodes: _ } = i.getState();
      N && _(R);
    });
  }, []), r = sv(c), s = k.useCallback((g) => {
    const { edges: p = [], setEdges: S, hasDefaultEdges: y, onEdgesChange: m, edgeLookup: v } = i.getState();
    let b = p;
    for (const E of g)
      b = typeof E == "function" ? E(b) : E;
    y ? S(b) : m && m(ov({
      items: b,
      lookup: v
    }));
  }, []), f = sv(s), d = k.useMemo(() => ({ nodeQueue: r, edgeQueue: f }), []);
  return q.jsx(Lp.Provider, { value: d, children: l });
}
function wN() {
  const l = k.useContext(Lp);
  if (!l)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return l;
}
const NN = (l) => !!l.panZoom;
function fr() {
  const l = yN(), i = $t(), c = wN(), r = Bt(NN), s = k.useMemo(() => {
    const f = (m) => i.getState().nodeLookup.get(m), d = (m) => {
      c.nodeQueue.push(m);
    }, g = (m) => {
      c.edgeQueue.push(m);
    }, p = (m) => {
      const { nodeLookup: v, nodeOrigin: b } = i.getState(), E = rv(m) ? m : v.get(m.id), z = E.parentId ? fp(E.position, E.measured, E.parentId, v, b) : E.position, w = {
        ...E,
        position: z,
        width: E.measured?.width ?? E.width,
        height: E.measured?.height ?? E.height
      };
      return Vu(w);
    }, S = (m, v, b = { replace: !1 }) => {
      d((E) => E.map((z) => {
        if (z.id === m) {
          const w = typeof v == "function" ? v(z) : v;
          return b.replace && rv(w) ? w : { ...z, ...w };
        }
        return z;
      }));
    }, y = (m, v, b = { replace: !1 }) => {
      g((E) => E.map((z) => {
        if (z.id === m) {
          const w = typeof v == "function" ? v(z) : v;
          return b.replace && bN(w) ? w : { ...z, ...w };
        }
        return z;
      }));
    };
    return {
      getNodes: () => i.getState().nodes.map((m) => ({ ...m })),
      getNode: (m) => f(m)?.internals.userNode,
      getInternalNode: f,
      getEdges: () => {
        const { edges: m = [] } = i.getState();
        return m.map((v) => ({ ...v }));
      },
      getEdge: (m) => i.getState().edgeLookup.get(m),
      setNodes: d,
      setEdges: g,
      addNodes: (m) => {
        const v = Array.isArray(m) ? m : [m];
        c.nodeQueue.push((b) => [...b, ...v]);
      },
      addEdges: (m) => {
        const v = Array.isArray(m) ? m : [m];
        c.edgeQueue.push((b) => [...b, ...v]);
      },
      toObject: () => {
        const { nodes: m = [], edges: v = [], transform: b } = i.getState(), [E, z, w] = b;
        return {
          nodes: m.map((N) => ({ ...N })),
          edges: v.map((N) => ({ ...N })),
          viewport: {
            x: E,
            y: z,
            zoom: w
          }
        };
      },
      deleteElements: async ({ nodes: m = [], edges: v = [] }) => {
        const { nodes: b, edges: E, onNodesDelete: z, onEdgesDelete: w, triggerNodeChanges: N, triggerEdgeChanges: R, onDelete: _, onBeforeDelete: A } = i.getState(), { nodes: G, edges: B } = await J2({
          nodesToRemove: m,
          edgesToRemove: v,
          nodes: b,
          edges: E,
          onBeforeDelete: A
        }), H = B.length > 0, Q = G.length > 0;
        if (H) {
          const Y = B.map(cv);
          w?.(B), R(Y);
        }
        if (Q) {
          const Y = G.map(cv);
          z?.(G), N(Y);
        }
        return (Q || H) && _?.({ nodes: G, edges: B }), { deletedNodes: G, deletedEdges: B };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (m, v = !0, b) => {
        const E = Hy(m), z = E ? m : p(m), w = b !== void 0;
        return z ? (b || i.getState().nodes).filter((N) => {
          const R = i.getState().nodeLookup.get(N.id);
          if (R && !E && (N.id === m.id || !R.internals.positionAbsolute))
            return !1;
          const _ = Vu(w ? N : R), A = Pc(_, z);
          return v && A > 0 || A >= _.width * _.height || A >= z.width * z.height;
        }) : [];
      },
      isNodeIntersecting: (m, v, b = !0) => {
        const z = Hy(m) ? m : p(m);
        if (!z)
          return !1;
        const w = Pc(z, v);
        return b && w > 0 || w >= v.width * v.height || w >= z.width * z.height;
      },
      updateNode: S,
      updateNodeData: (m, v, b = { replace: !1 }) => {
        S(m, (E) => {
          const z = typeof v == "function" ? v(E) : v;
          return b.replace ? { ...E, data: z } : { ...E, data: { ...E.data, ...z } };
        }, b);
      },
      updateEdge: y,
      updateEdgeData: (m, v, b = { replace: !1 }) => {
        y(m, (E) => {
          const z = typeof v == "function" ? v(E) : v;
          return b.replace ? { ...E, data: z } : { ...E, data: { ...E.data, ...z } };
        }, b);
      },
      getNodesBounds: (m) => {
        const { nodeLookup: v, nodeOrigin: b } = i.getState();
        return G2(m, { nodeLookup: v, nodeOrigin: b });
      },
      getHandleConnections: ({ type: m, id: v, nodeId: b }) => Array.from(i.getState().connectionLookup.get(`${b}-${m}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: m, handleId: v, nodeId: b }) => Array.from(i.getState().connectionLookup.get(`${b}${m ? v ? `-${m}-${v}` : `-${m}` : ""}`)?.values() ?? []),
      fitView: async (m) => {
        const v = i.getState().fitViewResolver ?? F2();
        return i.setState({ fitViewQueued: !0, fitViewOptions: m, fitViewResolver: v }), c.nodeQueue.push((b) => [...b]), v.promise;
      }
    };
  }, []);
  return k.useMemo(() => ({
    ...s,
    ...l,
    viewportInitialized: r
  }), [r]);
}
const fv = (l) => l.selected, TN = typeof window < "u" ? window : void 0;
function zN({ deleteKeyCode: l, multiSelectionKeyCode: i }) {
  const c = $t(), { deleteElements: r } = fr(), s = Lu(l, { actInsideInputWithModifier: !1 }), f = Lu(i, { target: TN });
  k.useEffect(() => {
    if (s) {
      const { edges: d, nodes: g } = c.getState();
      r({ nodes: g.filter(fv), edges: d.filter(fv) }), c.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), k.useEffect(() => {
    c.setState({ multiSelectionActive: f });
  }, [f]);
}
function CN(l) {
  const i = $t();
  k.useEffect(() => {
    const c = () => {
      if (!l.current || !(l.current.checkVisibility?.() ?? !0))
        return !1;
      const r = Qd(l.current);
      (r.height === 0 || r.width === 0) && i.getState().onError?.("004", Sn.error004()), i.setState({ width: r.width || 500, height: r.height || 500 });
    };
    if (l.current) {
      c(), window.addEventListener("resize", c);
      const r = new ResizeObserver(() => c());
      return r.observe(l.current), () => {
        window.removeEventListener("resize", c), r && l.current && r.unobserve(l.current);
      };
    }
  }, []);
}
const dr = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, MN = (l) => ({
  userSelectionActive: l.userSelectionActive,
  lib: l.lib,
  connectionInProgress: l.connection.inProgress
});
function AN({ onPaneContextMenu: l, zoomOnScroll: i = !0, zoomOnPinch: c = !0, panOnScroll: r = !1, panActivationKeyPressed: s, panOnScrollSpeed: f = 0.5, panOnScrollMode: d = ma.Free, zoomOnDoubleClick: g = !0, panOnDrag: p = !0, defaultViewport: S, translateExtent: y, minZoom: m, maxZoom: v, zoomActivationKeyCode: b, preventScrolling: E = !0, children: z, noWheelClassName: w, noPanClassName: N, onViewportChange: R, isControlledViewport: _, paneClickDistance: A, selectionOnDrag: G }) {
  const B = $t(), H = k.useRef(null), { userSelectionActive: Q, lib: Y, connectionInProgress: lt } = Bt(MN, kt), P = Lu(b), it = k.useRef();
  CN(H);
  const at = k.useCallback((C) => {
    R?.({ x: C[0], y: C[1], zoom: C[2] }), _ || B.setState({ transform: C });
  }, [R, _]);
  return k.useEffect(() => {
    if (H.current) {
      it.current = Hw({
        domNode: H.current,
        minZoom: m,
        maxZoom: v,
        translateExtent: y,
        viewport: S,
        onDraggingChange: (U) => B.setState((Z) => Z.paneDragging === U ? Z : { paneDragging: U }),
        onPanZoomStart: (U, Z) => {
          const { onViewportChangeStart: J, onMoveStart: tt } = B.getState();
          tt?.(U, Z), J?.(Z);
        },
        onPanZoom: (U, Z) => {
          const { onViewportChange: J, onMove: tt } = B.getState();
          tt?.(U, Z), J?.(Z);
        },
        onPanZoomEnd: (U, Z) => {
          const { onViewportChangeEnd: J, onMoveEnd: tt } = B.getState();
          tt?.(U, Z), J?.(Z);
        }
      });
      const { x: C, y: j, zoom: O } = it.current.getViewport();
      return B.setState({
        panZoom: it.current,
        transform: [C, j, O],
        domNode: H.current.closest(".react-flow")
      }), () => {
        it.current?.destroy();
      };
    }
  }, []), k.useEffect(() => {
    it.current?.update({
      onPaneContextMenu: l,
      zoomOnScroll: i,
      zoomOnPinch: c,
      panOnScroll: r,
      panActivationKeyPressed: s,
      panOnScrollSpeed: f,
      panOnScrollMode: d,
      zoomOnDoubleClick: g,
      panOnDrag: p,
      zoomActivationKeyPressed: P,
      preventScrolling: E,
      noPanClassName: N,
      userSelectionActive: Q,
      noWheelClassName: w,
      lib: Y,
      onTransformChange: at,
      connectionInProgress: lt,
      selectionOnDrag: G,
      paneClickDistance: A
    });
  }, [
    l,
    i,
    c,
    r,
    s,
    f,
    d,
    g,
    p,
    P,
    E,
    N,
    Q,
    w,
    Y,
    at,
    lt,
    G,
    A
  ]), q.jsx("div", { className: "react-flow__renderer", ref: H, style: dr, children: z });
}
const ON = (l) => ({
  userSelectionActive: l.userSelectionActive,
  userSelectionRect: l.userSelectionRect
});
function DN() {
  const { userSelectionActive: l, userSelectionRect: i } = Bt(ON, kt);
  return l && i ? q.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: i.width,
    height: i.height,
    transform: `translate(${i.x}px, ${i.y}px)`
  } }) : null;
}
const md = (l, i) => (c) => {
  c.target === i.current && l?.(c);
}, RN = (l) => ({
  userSelectionActive: l.userSelectionActive,
  elementsSelectable: l.elementsSelectable,
  dragging: l.paneDragging,
  panBy: l.panBy,
  autoPanSpeed: l.autoPanSpeed
});
function HN({ isSelecting: l, selectionKeyPressed: i, selectionMode: c = Bu.Full, panOnDrag: r, autoPanOnSelection: s, paneClickDistance: f, selectionOnDrag: d, onSelectionStart: g, onSelectionEnd: p, onPaneClick: S, onPaneContextMenu: y, onPaneScroll: m, onPaneMouseEnter: v, onPaneMouseMove: b, onPaneMouseLeave: E, children: z }) {
  const w = k.useRef(0), N = $t(), { userSelectionActive: R, elementsSelectable: _, dragging: A, panBy: G, autoPanSpeed: B } = Bt(RN, kt), H = _ && (l || R), Q = k.useRef(null), Y = k.useRef(), lt = k.useRef(/* @__PURE__ */ new Set()), P = k.useRef(/* @__PURE__ */ new Set()), it = k.useRef(!1), at = k.useRef(!1), C = k.useRef({ x: 0, y: 0 }), j = k.useRef(!1), O = (W) => {
    if (at.current || it.current || N.getState().connection.inProgress) {
      at.current = !1, it.current = !1;
      return;
    }
    S?.(W), N.getState().resetSelectedElements(), N.setState({ nodesSelectionActive: !1 });
  }, U = (W) => {
    if (Array.isArray(r) && r?.includes(2)) {
      W.preventDefault();
      return;
    }
    y?.(W);
  }, Z = m ? (W) => m(W) : void 0, J = (W) => {
    at.current && (W.stopPropagation(), at.current = !1);
  }, tt = (W) => {
    if (W.pointerType === "touch" && r !== !1 && !i)
      return;
    const { domNode: dt, transform: gt } = N.getState();
    if (Y.current = dt?.getBoundingClientRect(), !Y.current)
      return;
    const rt = W.target === Q.current;
    if (!rt && !!W.target.closest(".nokey") || !l || !(d && rt || i) || W.button !== 0 || !W.isPrimary)
      return;
    W.target?.setPointerCapture?.(W.pointerId), at.current = !1;
    const { x: _t, y: Ct } = pn(W.nativeEvent, Y.current), Tt = Ju({ x: _t, y: Ct }, gt);
    N.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: Tt.x,
        startY: Tt.y,
        x: _t,
        y: Ct
      }
    }), rt || (W.stopPropagation(), W.preventDefault());
  };
  function ot(W, dt) {
    const { userSelectionRect: gt } = N.getState();
    if (!gt)
      return;
    const { transform: rt, nodeLookup: st, edgeLookup: pt, connectionLookup: _t, triggerNodeChanges: Ct, triggerEdgeChanges: Tt, defaultEdgeOptions: Ht } = N.getState(), Ot = { x: gt.startX, y: gt.startY }, { x: Pt, y: Se } = Ei(Ot, rt), re = {
      startX: Ot.x,
      startY: Ot.y,
      x: W < Pt ? W : Pt,
      y: dt < Se ? dt : Se,
      width: Math.abs(W - Pt),
      height: Math.abs(dt - Se)
    }, En = lt.current, Ie = P.current;
    lt.current = new Set(Xd(st, re, rt, c === Bu.Partial, !0).map((Ee) => Ee.id)), P.current = /* @__PURE__ */ new Set();
    const Ae = Ht?.selectable ?? !0;
    for (const Ee of lt.current) {
      const Oe = _t.get(Ee);
      if (Oe)
        for (const { edgeId: Ve } of Oe.values()) {
          const _n = pt.get(Ve);
          _n && (_n.selectable ?? Ae) && P.current.add(Ve);
        }
    }
    if (!Uy(En, lt.current)) {
      const Ee = mi(st, lt.current, !0);
      Ct(Ee);
    }
    if (!Uy(Ie, P.current)) {
      const Ee = mi(pt, P.current);
      Tt(Ee);
    }
    N.setState({
      userSelectionRect: re,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function ct() {
    if (!s || !Y.current)
      return;
    const [W, dt] = Zd(C.current, Y.current, B);
    G({ x: W, y: dt }).then((gt) => {
      if (!at.current || !gt) {
        w.current = requestAnimationFrame(ct);
        return;
      }
      const { x: rt, y: st } = C.current;
      ot(rt, st), w.current = requestAnimationFrame(ct);
    });
  }
  const vt = () => {
    cancelAnimationFrame(w.current), w.current = 0, j.current = !1;
  };
  k.useEffect(() => () => vt(), []);
  const T = (W) => {
    const { userSelectionRect: dt, transform: gt, resetSelectedElements: rt } = N.getState();
    if (!Y.current || !dt)
      return;
    const { x: st, y: pt } = pn(W.nativeEvent, Y.current);
    C.current = { x: st, y: pt };
    const _t = Ei({ x: dt.startX, y: dt.startY }, gt);
    if (!at.current) {
      const Ct = i ? 0 : f;
      if (Math.hypot(st - _t.x, pt - _t.y) <= Ct)
        return;
      rt(), g?.(W);
    }
    at.current = !0, j.current || (ct(), j.current = !0), ot(st, pt);
  }, F = (W) => {
    if (!H) {
      W.target === Q.current && N.getState().connection.inProgress && (it.current = !0);
      return;
    }
    W.button === 0 && (W.target?.releasePointerCapture?.(W.pointerId), !R && W.target === Q.current && N.getState().userSelectionRect && O?.(W), N.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), at.current && (p?.(W), N.setState({
      nodesSelectionActive: lt.current.size > 0
    })), vt());
  }, ft = (W) => {
    W.target?.releasePointerCapture?.(W.pointerId), vt();
  }, ut = r === !0 || Array.isArray(r) && r.includes(0);
  return q.jsxs("div", { className: ue(["react-flow__pane", { draggable: ut, dragging: A, selection: l }]), onClick: H ? void 0 : md(O, Q), onContextMenu: md(U, Q), onWheel: md(Z, Q), onPointerEnter: H ? void 0 : v, onPointerMove: H ? T : b, onPointerUp: F, onPointerCancel: H ? ft : void 0, onPointerDownCapture: H ? tt : void 0, onClickCapture: H ? J : void 0, onPointerLeave: E, ref: Q, style: dr, children: [z, q.jsx(DN, {})] });
}
function Od({ id: l, store: i, unselect: c = !1, nodeRef: r }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: f, multiSelectionActive: d, nodeLookup: g, onError: p } = i.getState(), S = g.get(l);
  if (!S) {
    p?.("012", Sn.error012(l));
    return;
  }
  i.setState({ nodesSelectionActive: !1 }), S.selected ? (c || S.selected && d) && (f({ nodes: [S], edges: [] }), requestAnimationFrame(() => r?.current?.blur())) : s([l]);
}
function qp({ nodeRef: l, disabled: i = !1, noDragClassName: c, handleSelector: r, nodeId: s, isSelectable: f, nodeClickDistance: d }) {
  const g = $t(), [p, S] = k.useState(!1), y = k.useRef();
  return k.useEffect(() => {
    if (!i)
      return y.current = xw({
        getStoreItems: () => g.getState(),
        onNodeMouseDown: (m) => {
          Od({
            id: m,
            store: g,
            nodeRef: l
          });
        },
        onDragStart: () => {
          S(!0);
        },
        onDragStop: () => {
          S(!1);
        }
      }), () => {
        y.current?.destroy(), y.current = void 0;
      };
  }, [i, g, l]), k.useEffect(() => {
    i || !l.current || !y.current || y.current.update({
      noDragClassName: c,
      handleSelector: r,
      domNode: l.current,
      isSelectable: f,
      nodeId: s,
      nodeClickDistance: d
    });
  }, [c, r, i, f, l, s, d]), p;
}
const UN = (l) => (i) => i.selected && (i.draggable || l && typeof i.draggable > "u");
function Xp() {
  const l = $t();
  return k.useCallback((c) => {
    const { nodeExtent: r, snapToGrid: s, snapGrid: f, nodesDraggable: d, onError: g, updateNodePositions: p, nodeLookup: S, nodeOrigin: y } = l.getState(), m = /* @__PURE__ */ new Map(), v = UN(d), b = s ? f[0] : 5, E = s ? f[1] : 5, z = c.direction.x * b * c.factor, w = c.direction.y * E * c.factor;
    for (const [, N] of S) {
      if (!v(N))
        continue;
      let R = {
        x: N.internals.positionAbsolute.x + z,
        y: N.internals.positionAbsolute.y + w
      };
      s && (R = $u(R, f));
      const { position: _, positionAbsolute: A } = ip({
        nodeId: N.id,
        nextPosition: R,
        nodeLookup: S,
        nodeExtent: r,
        nodeOrigin: y,
        onError: g
      });
      N.position = _, N.internals.positionAbsolute = A, m.set(N.id, N);
    }
    p(m);
  }, []);
}
const Fd = k.createContext(null), BN = Fd.Provider;
Fd.Consumer;
const Zp = () => k.useContext(Fd), YN = (l) => ({
  connectOnClick: l.connectOnClick,
  noPanClassName: l.noPanClassName,
  rfId: l.rfId
}), Gp = k.createContext(null);
function VN({ children: l }) {
  const i = Bt(YN, kt);
  return q.jsx(Gp.Provider, { value: i, children: l });
}
function jN() {
  const l = k.useContext(Gp);
  if (!l)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return l;
}
const LN = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, qN = (l, i, c) => (r) => {
  const { connectionClickStartHandle: s, connectionMode: f, connection: d } = r, { fromHandle: g, toHandle: p, isValid: S } = d;
  if (!g && !s)
    return LN;
  const y = p?.nodeId === l && p?.id === i && p?.type === c;
  return {
    connectingFrom: g?.nodeId === l && g?.id === i && g?.type === c,
    connectingTo: y,
    clickConnecting: s?.nodeId === l && s?.id === i && s?.type === c,
    isPossibleEndHandle: f === xi.Strict ? g?.type !== c : l !== g?.nodeId || i !== g?.id,
    connectionInProcess: !!g,
    clickConnectionInProcess: !!s,
    valid: y && S
  };
};
function XN({ type: l = "source", position: i = xt.Top, isValidConnection: c, isConnectable: r = !0, isConnectableStart: s = !0, isConnectableEnd: f = !0, id: d, onConnect: g, children: p, className: S, onMouseDown: y, onTouchStart: m, ...v }, b) {
  const E = d || null, z = l === "target", w = $t(), N = Zp(), { connectOnClick: R, noPanClassName: _, rfId: A } = jN(), { connectingFrom: G, connectingTo: B, clickConnecting: H, isPossibleEndHandle: Q, connectionInProcess: Y, clickConnectionInProcess: lt, valid: P } = Bt(qN(N, E, l), kt);
  N || w.getState().onError?.("010", Sn.error010());
  const it = (j) => {
    const { defaultEdgeOptions: O, onConnect: U, hasDefaultEdges: Z } = w.getState(), J = {
      ...O,
      ...j
    };
    if (Z) {
      const { edges: tt, setEdges: ot, onError: ct } = w.getState();
      ot(Yp(J, tt, { onError: ct }));
    }
    U?.(J), g?.(J);
  }, at = (j) => {
    if (!N)
      return;
    const O = mp(j.nativeEvent);
    if (s && (O && j.button === 0 || !O)) {
      const U = w.getState();
      Ad.onPointerDown(j.nativeEvent, {
        handleDomNode: j.currentTarget,
        autoPanOnConnect: U.autoPanOnConnect,
        connectionMode: U.connectionMode,
        connectionRadius: U.connectionRadius,
        domNode: U.domNode,
        nodeLookup: U.nodeLookup,
        lib: U.lib,
        isTarget: z,
        handleId: E,
        nodeId: N,
        flowId: U.rfId,
        panBy: U.panBy,
        cancelConnection: U.cancelConnection,
        onConnectStart: U.onConnectStart,
        onConnectEnd: (...Z) => w.getState().onConnectEnd?.(...Z),
        updateConnection: U.updateConnection,
        onConnect: it,
        isValidConnection: c || ((...Z) => w.getState().isValidConnection?.(...Z) ?? !0),
        getTransform: () => w.getState().transform,
        getFromHandle: () => w.getState().connection.fromHandle,
        autoPanSpeed: U.autoPanSpeed,
        dragThreshold: U.connectionDragThreshold
      });
    }
    O ? y?.(j) : m?.(j);
  }, C = (j) => {
    const { onClickConnectStart: O, onClickConnectEnd: U, connectionClickStartHandle: Z, connectionMode: J, isValidConnection: tt, lib: ot, rfId: ct, nodeLookup: vt, connection: T } = w.getState();
    if (!N || !Z && !s)
      return;
    if (!Z) {
      O?.(j.nativeEvent, { nodeId: N, handleId: E, handleType: l }), w.setState({ connectionClickStartHandle: { nodeId: N, type: l, id: E } });
      return;
    }
    const F = hp(j.target), ft = c || tt, { connection: ut, isValid: W } = Ad.isValid(j.nativeEvent, {
      handle: {
        nodeId: N,
        id: E,
        type: l
      },
      connectionMode: J,
      fromNodeId: Z.nodeId,
      fromHandleId: Z.id || null,
      fromType: Z.type,
      isValidConnection: ft,
      flowId: ct,
      doc: F,
      lib: ot,
      nodeLookup: vt
    });
    W && ut && it(ut);
    const dt = structuredClone(T);
    delete dt.inProgress, dt.toPosition = dt.toHandle ? dt.toHandle.position : null, U?.(j, dt), w.setState({ connectionClickStartHandle: null });
  };
  return q.jsx("div", { "data-handleid": E, "data-nodeid": N, "data-handlepos": i, "data-id": `${A}-${N}-${E}-${l}`, className: ue([
    "react-flow__handle",
    `react-flow__handle-${i}`,
    "nodrag",
    _,
    S,
    {
      source: !z,
      target: z,
      connectable: r,
      connectablestart: s,
      connectableend: f,
      clickconnecting: H,
      connectingfrom: G,
      connectingto: B,
      valid: P,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: r && (!Y || Q) && (Y || lt ? f : s)
    }
  ]), onMouseDown: at, onTouchStart: at, onClick: R ? C : void 0, ref: b, ...v, children: p });
}
const wi = k.memo(Vp(XN));
function ZN({ data: l, isConnectable: i, sourcePosition: c = xt.Bottom }) {
  return q.jsxs(q.Fragment, { children: [l?.label, q.jsx(wi, { type: "source", position: c, isConnectable: i })] });
}
function GN({ data: l, isConnectable: i, targetPosition: c = xt.Top, sourcePosition: r = xt.Bottom }) {
  return q.jsxs(q.Fragment, { children: [q.jsx(wi, { type: "target", position: c, isConnectable: i }), l?.label, q.jsx(wi, { type: "source", position: r, isConnectable: i })] });
}
function QN() {
  return null;
}
function KN({ data: l, isConnectable: i, targetPosition: c = xt.Top }) {
  return q.jsxs(q.Fragment, { children: [q.jsx(wi, { type: "target", position: c, isConnectable: i }), l?.label] });
}
const tr = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, dv = {
  input: ZN,
  default: GN,
  output: KN,
  group: QN
};
function $N(l) {
  return l.internals.handleBounds === void 0 ? {
    width: l.width ?? l.initialWidth ?? l.style?.width,
    height: l.height ?? l.initialHeight ?? l.style?.height
  } : {
    width: l.width ?? l.style?.width,
    height: l.height ?? l.style?.height
  };
}
const JN = (l) => {
  const { width: i, height: c, x: r, y: s } = Ku(l.nodeLookup, {
    filter: (f) => !!f.selected
  });
  return {
    width: vn(i) ? i : null,
    height: vn(c) ? c : null,
    userSelectionActive: l.userSelectionActive,
    transformString: `translate(${l.transform[0]}px,${l.transform[1]}px) scale(${l.transform[2]}) translate(${r}px,${s}px)`
  };
};
function IN({ onSelectionContextMenu: l, noPanClassName: i, disableKeyboardA11y: c }) {
  const r = $t(), { width: s, height: f, transformString: d, userSelectionActive: g } = Bt(JN, kt), p = Xp(), S = k.useRef(null);
  k.useEffect(() => {
    c || S.current?.focus({
      preventScroll: !0
    });
  }, [c]);
  const y = !g && s !== null && f !== null;
  if (qp({
    nodeRef: S,
    disabled: !y
  }), !y)
    return null;
  const m = l ? (b) => {
    const E = r.getState().nodes.filter((z) => z.selected);
    l(b, E);
  } : void 0, v = (b) => {
    Object.prototype.hasOwnProperty.call(tr, b.key) && (b.preventDefault(), p({
      direction: tr[b.key],
      factor: b.shiftKey ? 4 : 1
    }));
  };
  return q.jsx("div", { className: ue(["react-flow__nodesselection", "react-flow__container", i]), style: {
    transform: d
  }, children: q.jsx("div", { ref: S, className: "react-flow__nodesselection-rect", onContextMenu: m, tabIndex: c ? void 0 : -1, onKeyDown: c ? void 0 : v, style: {
    width: s,
    height: f
  } }) });
}
const hv = typeof window < "u" ? window : void 0, kN = (l) => ({ nodesSelectionActive: l.nodesSelectionActive, userSelectionActive: l.userSelectionActive });
function Qp({ children: l, onPaneClick: i, onPaneMouseEnter: c, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, paneClickDistance: g, deleteKeyCode: p, selectionKeyCode: S, selectionOnDrag: y, selectionMode: m, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: E, panActivationKeyCode: z, zoomActivationKeyCode: w, elementsSelectable: N, zoomOnScroll: R, zoomOnPinch: _, panOnScroll: A, panOnScrollSpeed: G, panOnScrollMode: B, zoomOnDoubleClick: H, panOnDrag: Q, autoPanOnSelection: Y, defaultViewport: lt, translateExtent: P, minZoom: it, maxZoom: at, preventScrolling: C, onSelectionContextMenu: j, noWheelClassName: O, noPanClassName: U, disableKeyboardA11y: Z, onViewportChange: J, isControlledViewport: tt }) {
  const { nodesSelectionActive: ot, userSelectionActive: ct } = Bt(kN, kt), vt = Lu(S, { target: hv }), T = Lu(z, { target: hv }), F = T || Q, ft = T || A, ut = y && F !== !0, W = vt || ct || ut;
  return zN({ deleteKeyCode: p, multiSelectionKeyCode: E }), q.jsx(AN, { onPaneContextMenu: f, elementsSelectable: N, zoomOnScroll: R, zoomOnPinch: _, panOnScroll: ft, panActivationKeyPressed: T, panOnScrollSpeed: G, panOnScrollMode: B, zoomOnDoubleClick: H, panOnDrag: !vt && F, defaultViewport: lt, translateExtent: P, minZoom: it, maxZoom: at, zoomActivationKeyCode: w, preventScrolling: C, noWheelClassName: O, noPanClassName: U, onViewportChange: J, isControlledViewport: tt, paneClickDistance: g, selectionOnDrag: ut, children: q.jsxs(HN, { onSelectionStart: v, onSelectionEnd: b, onPaneClick: i, onPaneMouseEnter: c, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, panOnDrag: F, autoPanOnSelection: Y, isSelecting: !!W, selectionMode: m, selectionKeyPressed: vt, paneClickDistance: g, selectionOnDrag: ut, children: [l, ot && q.jsx(IN, { onSelectionContextMenu: j, noPanClassName: U, disableKeyboardA11y: Z })] }) });
}
Qp.displayName = "FlowRenderer";
const FN = k.memo(Qp), WN = (l) => (i) => l ? Xd(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, !0).map((c) => c.id) : Array.from(i.nodeLookup.keys());
function PN(l) {
  return Bt(k.useCallback(WN(l), [l]), kt);
}
const t3 = (l) => l.updateNodeInternals;
function e3() {
  const l = Bt(t3), [i] = k.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((c) => {
    const r = /* @__PURE__ */ new Map();
    c.forEach((s) => {
      const f = s.target.getAttribute("data-id");
      r.set(f, {
        id: f,
        nodeElement: s.target,
        force: !0
      });
    }), l(r);
  }));
  return k.useEffect(() => () => {
    i?.disconnect();
  }, [i]), i;
}
function n3({ node: l, nodeType: i, hasDimensions: c, resizeObserver: r }) {
  const s = $t(), f = k.useRef(null), d = k.useRef(null), g = k.useRef(l.sourcePosition), p = k.useRef(l.targetPosition), S = k.useRef(i), y = c && !!l.internals.handleBounds;
  return k.useEffect(() => {
    f.current && !l.hidden && (!y || d.current !== f.current) && (d.current && r?.unobserve(d.current), r?.observe(f.current), d.current = f.current);
  }, [y, l.hidden]), k.useEffect(() => () => {
    d.current && (r?.unobserve(d.current), d.current = null);
  }, []), k.useEffect(() => {
    if (f.current) {
      const m = S.current !== i, v = g.current !== l.sourcePosition, b = p.current !== l.targetPosition;
      (m || v || b) && (S.current = i, g.current = l.sourcePosition, p.current = l.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[l.id, { id: l.id, nodeElement: f.current, force: !0 }]])));
    }
  }, [l.id, i, l.sourcePosition, l.targetPosition]), f;
}
function l3({ id: l, onClick: i, onMouseEnter: c, onMouseMove: r, onMouseLeave: s, onContextMenu: f, onDoubleClick: d, nodesDraggable: g, elementsSelectable: p, nodesConnectable: S, nodesFocusable: y, resizeObserver: m, noDragClassName: v, noPanClassName: b, disableKeyboardA11y: E, rfId: z, nodeTypes: w, nodeClickDistance: N, onError: R }) {
  const { node: _, internals: A, isParent: G } = Bt((W) => {
    const dt = W.nodeLookup.get(l), gt = W.parentLookup.has(l);
    return {
      node: dt,
      internals: dt.internals,
      isParent: gt
    };
  }, kt);
  let B = _.type || "default", H = w?.[B] || dv[B];
  H === void 0 && (R?.("003", Sn.error003(B)), B = "default", H = w?.default || dv.default);
  const Q = !!(_.draggable || g && typeof _.draggable > "u"), Y = !!(_.selectable || p && typeof _.selectable > "u"), lt = !!(_.connectable || S && typeof _.connectable > "u"), P = !!(_.focusable || y && typeof _.focusable > "u"), it = $t(), at = sp(_), C = n3({ node: _, nodeType: B, hasDimensions: at, resizeObserver: m }), j = qp({
    nodeRef: C,
    disabled: _.hidden || !Q,
    noDragClassName: v,
    handleSelector: _.dragHandle,
    nodeId: l,
    isSelectable: Y,
    nodeClickDistance: N
  }), O = Xp();
  if (_.hidden)
    return null;
  const U = bn(_), Z = $N(_), J = Y || Q || i || c || r || s, tt = c ? (W) => c(W, { ...A.userNode }) : void 0, ot = r ? (W) => r(W, { ...A.userNode }) : void 0, ct = s ? (W) => s(W, { ...A.userNode }) : void 0, vt = f ? (W) => f(W, { ...A.userNode }) : void 0, T = d ? (W) => d(W, { ...A.userNode }) : void 0, F = (W) => {
    const { selectNodesOnDrag: dt, nodeDragThreshold: gt } = it.getState();
    Y && (!dt || !Q || gt > 0) && Od({
      id: l,
      store: it,
      nodeRef: C
    }), i && i(W, { ...A.userNode });
  }, ft = (W) => {
    if (!(gp(W.nativeEvent) || E)) {
      if (ep.includes(W.key) && Y) {
        const dt = W.key === "Escape";
        Od({
          id: l,
          store: it,
          unselect: dt,
          nodeRef: C
        });
      } else if (Q && _.selected && Object.prototype.hasOwnProperty.call(tr, W.key)) {
        W.preventDefault();
        const { ariaLabelConfig: dt } = it.getState();
        it.setState({
          ariaLiveMessage: dt["node.a11yDescription.ariaLiveMessage"]({
            direction: W.key.replace("Arrow", "").toLowerCase(),
            x: ~~A.positionAbsolute.x,
            y: ~~A.positionAbsolute.y
          })
        }), O({
          direction: tr[W.key],
          factor: W.shiftKey ? 4 : 1
        });
      }
    }
  }, ut = () => {
    if (E || !C.current?.matches(":focus-visible"))
      return;
    const { transform: W, width: dt, height: gt, autoPanOnNodeFocus: rt, setCenter: st } = it.getState();
    if (!rt)
      return;
    Xd(/* @__PURE__ */ new Map([[l, _]]), { x: 0, y: 0, width: dt, height: gt }, W, !0).length > 0 || st(_.position.x + U.width / 2, _.position.y + U.height / 2, {
      zoom: W[2]
    });
  };
  return q.jsx("div", { className: ue([
    "react-flow__node",
    `react-flow__node-${B}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [b]: Q
    },
    _.className,
    {
      selected: _.selected,
      selectable: Y,
      parent: G,
      draggable: Q,
      dragging: j
    }
  ]), ref: C, style: {
    zIndex: A.z,
    transform: `translate(${A.positionAbsolute.x}px,${A.positionAbsolute.y}px)`,
    pointerEvents: J ? "all" : "none",
    visibility: at ? "visible" : "hidden",
    ..._.style,
    ...Z
  }, "data-id": l, "data-testid": `rf__node-${l}`, onMouseEnter: tt, onMouseMove: ot, onMouseLeave: ct, onContextMenu: vt, onClick: F, onDoubleClick: T, onKeyDown: P ? ft : void 0, tabIndex: P ? 0 : void 0, onFocus: P ? ut : void 0, role: _.ariaRole ?? (P ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": E ? void 0 : `${Rp}-${z}`, "aria-label": _.ariaLabel, ..._.domAttributes, children: q.jsx(BN, { value: l, children: q.jsx(H, { id: l, data: _.data, type: B, positionAbsoluteX: A.positionAbsolute.x, positionAbsoluteY: A.positionAbsolute.y, selected: _.selected ?? !1, selectable: Y, draggable: Q, deletable: _.deletable ?? !0, isConnectable: lt, sourcePosition: _.sourcePosition, targetPosition: _.targetPosition, dragging: j, dragHandle: _.dragHandle, zIndex: A.z, parentId: _.parentId, ...U }) }) });
}
var a3 = k.memo(l3);
const i3 = (l) => ({
  nodesConnectable: l.nodesConnectable,
  nodesFocusable: l.nodesFocusable,
  elementsSelectable: l.elementsSelectable,
  onError: l.onError
});
function Kp(l) {
  const { nodesConnectable: i, nodesFocusable: c, elementsSelectable: r, onError: s } = Bt(i3, kt), f = PN(l.onlyRenderVisibleElements), d = e3();
  return q.jsx("div", { className: "react-flow__nodes", style: dr, children: f.map((g) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    q.jsx(a3, { id: g, nodeTypes: l.nodeTypes, nodeExtent: l.nodeExtent, onClick: l.onNodeClick, onMouseEnter: l.onNodeMouseEnter, onMouseMove: l.onNodeMouseMove, onMouseLeave: l.onNodeMouseLeave, onContextMenu: l.onNodeContextMenu, onDoubleClick: l.onNodeDoubleClick, noDragClassName: l.noDragClassName, noPanClassName: l.noPanClassName, rfId: l.rfId, disableKeyboardA11y: l.disableKeyboardA11y, resizeObserver: d, nodesDraggable: l.nodesDraggable ?? !0, nodesConnectable: i, nodesFocusable: c, elementsSelectable: r, nodeClickDistance: l.nodeClickDistance, onError: s }, g)
  )) });
}
Kp.displayName = "NodeRenderer";
const u3 = k.memo(Kp);
function o3(l) {
  return Bt(k.useCallback((c) => {
    if (!l)
      return c.edges.map((s) => s.id);
    const r = [];
    if (c.width && c.height)
      for (const s of c.edges) {
        const f = c.nodeLookup.get(s.source), d = c.nodeLookup.get(s.target);
        f && d && ew({
          sourceNode: f,
          targetNode: d,
          width: c.width,
          height: c.height,
          transform: c.transform
        }) && r.push(s.id);
      }
    return r;
  }, [l]), kt);
}
const c3 = ({ color: l = "none", strokeWidth: i = 1 }) => {
  const c = {
    strokeWidth: i,
    ...l && { stroke: l }
  };
  return q.jsx("polyline", { className: "arrow", style: c, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, r3 = ({ color: l = "none", strokeWidth: i = 1 }) => {
  const c = {
    strokeWidth: i,
    ...l && { stroke: l, fill: l }
  };
  return q.jsx("polyline", { className: "arrowclosed", style: c, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, gv = {
  [Yu.Arrow]: c3,
  [Yu.ArrowClosed]: r3
};
function s3(l) {
  const i = $t();
  return k.useMemo(() => Object.prototype.hasOwnProperty.call(gv, l) ? gv[l] : (i.getState().onError?.("009", Sn.error009(l)), null), [l]);
}
const f3 = ({ id: l, type: i, color: c, width: r = 12.5, height: s = 12.5, markerUnits: f = "strokeWidth", strokeWidth: d, orient: g = "auto-start-reverse" }) => {
  const p = s3(i);
  return p ? q.jsx("marker", { className: "react-flow__arrowhead", id: l, markerWidth: `${r}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: f, orient: g, refX: "0", refY: "0", children: q.jsx(p, { color: c, strokeWidth: d }) }) : null;
}, $p = ({ defaultColor: l, rfId: i }) => {
  const c = Bt((f) => f.edges), r = Bt((f) => f.defaultEdgeOptions), s = k.useMemo(() => rw(c, {
    id: i,
    defaultColor: l,
    defaultMarkerStart: r?.markerStart,
    defaultMarkerEnd: r?.markerEnd
  }), [c, r, i, l]);
  return s.length ? q.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: q.jsx("defs", { children: s.map((f) => q.jsx(f3, { id: f.id, type: f.type, color: f.color, width: f.width, height: f.height, markerUnits: f.markerUnits, strokeWidth: f.strokeWidth, orient: f.orient }, f.id)) }) }) : null;
};
$p.displayName = "MarkerDefinitions";
var d3 = k.memo($p);
function Jp({ x: l, y: i, label: c, labelStyle: r, labelShowBg: s = !0, labelBgStyle: f, labelBgPadding: d = [2, 4], labelBgBorderRadius: g = 2, children: p, className: S, ...y }) {
  const [m, v] = k.useState({ x: 1, y: 0, width: 0, height: 0 }), b = ue(["react-flow__edge-textwrapper", S]), E = k.useRef(null);
  return k.useEffect(() => {
    if (E.current) {
      const z = E.current.getBBox();
      v({
        x: z.x,
        y: z.y,
        width: z.width,
        height: z.height
      });
    }
  }, [c]), c ? q.jsxs("g", { transform: `translate(${l - m.width / 2} ${i - m.height / 2})`, className: b, visibility: m.width ? "visible" : "hidden", ...y, children: [s && q.jsx("rect", { width: m.width + 2 * d[0], x: -d[0], y: -d[1], height: m.height + 2 * d[1], className: "react-flow__edge-textbg", style: f, rx: g, ry: g }), q.jsx("text", { className: "react-flow__edge-text", y: m.height / 2, dy: "0.3em", ref: E, style: r, children: c }), p] }) : null;
}
Jp.displayName = "EdgeText";
const h3 = k.memo(Jp);
function hr({ path: l, labelX: i, labelY: c, label: r, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p, interactionWidth: S = 20, ...y }) {
  return q.jsxs(q.Fragment, { children: [q.jsx("path", { ...y, d: l, fill: "none", className: ue(["react-flow__edge-path", y.className]) }), S ? q.jsx("path", { d: l, fill: "none", strokeOpacity: 0, strokeWidth: S, className: "react-flow__edge-interaction" }) : null, r && vn(i) && vn(c) ? q.jsx(h3, { x: i, y: c, label: r, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p }) : null] });
}
function mv({ pos: l, x1: i, y1: c, x2: r, y2: s }) {
  return l === xt.Left || l === xt.Right ? [0.5 * (i + r), c] : [i, 0.5 * (c + s)];
}
function Ip({ sourceX: l, sourceY: i, sourcePosition: c = xt.Bottom, targetX: r, targetY: s, targetPosition: f = xt.Top }) {
  const [d, g] = mv({
    pos: c,
    x1: l,
    y1: i,
    x2: r,
    y2: s
  }), [p, S] = mv({
    pos: f,
    x1: r,
    y1: s,
    x2: l,
    y2: i
  }), [y, m, v, b] = yp({
    sourceX: l,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: d,
    sourceControlY: g,
    targetControlX: p,
    targetControlY: S
  });
  return [
    `M${l},${i} C${d},${g} ${p},${S} ${r},${s}`,
    y,
    m,
    v,
    b
  ];
}
function kp(l) {
  return k.memo(({ id: i, sourceX: c, sourceY: r, targetX: s, targetY: f, sourcePosition: d, targetPosition: g, label: p, labelStyle: S, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: b, style: E, markerEnd: z, markerStart: w, interactionWidth: N }) => {
    const [R, _, A] = Ip({
      sourceX: c,
      sourceY: r,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g
    }), G = l.isInternal ? void 0 : i;
    return q.jsx(hr, { id: G, path: R, labelX: _, labelY: A, label: p, labelStyle: S, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: b, style: E, markerEnd: z, markerStart: w, interactionWidth: N });
  });
}
const g3 = kp({ isInternal: !1 }), Fp = kp({ isInternal: !0 });
g3.displayName = "SimpleBezierEdge";
Fp.displayName = "SimpleBezierEdgeInternal";
function Wp(l) {
  return k.memo(({ id: i, sourceX: c, sourceY: r, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: S, labelBgPadding: y, labelBgBorderRadius: m, style: v, sourcePosition: b = xt.Bottom, targetPosition: E = xt.Top, markerEnd: z, markerStart: w, pathOptions: N, interactionWidth: R }) => {
    const [_, A, G] = zd({
      sourceX: c,
      sourceY: r,
      sourcePosition: b,
      targetX: s,
      targetY: f,
      targetPosition: E,
      borderRadius: N?.borderRadius,
      offset: N?.offset,
      stepPosition: N?.stepPosition
    }), B = l.isInternal ? void 0 : i;
    return q.jsx(hr, { id: B, path: _, labelX: A, labelY: G, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: S, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: z, markerStart: w, interactionWidth: R });
  });
}
const Pp = Wp({ isInternal: !1 }), t1 = Wp({ isInternal: !0 });
Pp.displayName = "SmoothStepEdge";
t1.displayName = "SmoothStepEdgeInternal";
function e1(l) {
  return k.memo(({ id: i, ...c }) => {
    const r = l.isInternal ? void 0 : i;
    return q.jsx(Pp, { ...c, id: r, pathOptions: k.useMemo(() => ({ borderRadius: 0, offset: c.pathOptions?.offset }), [c.pathOptions?.offset]) });
  });
}
const m3 = e1({ isInternal: !1 }), n1 = e1({ isInternal: !0 });
m3.displayName = "StepEdge";
n1.displayName = "StepEdgeInternal";
function l1(l) {
  return k.memo(({ id: i, sourceX: c, sourceY: r, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: S, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: b, markerStart: E, interactionWidth: z }) => {
    const [w, N, R] = Sp({ sourceX: c, sourceY: r, targetX: s, targetY: f }), _ = l.isInternal ? void 0 : i;
    return q.jsx(hr, { id: _, path: w, labelX: N, labelY: R, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: S, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: b, markerStart: E, interactionWidth: z });
  });
}
const y3 = l1({ isInternal: !1 }), a1 = l1({ isInternal: !0 });
y3.displayName = "StraightEdge";
a1.displayName = "StraightEdgeInternal";
function i1(l) {
  return k.memo(({ id: i, sourceX: c, sourceY: r, targetX: s, targetY: f, sourcePosition: d = xt.Bottom, targetPosition: g = xt.Top, label: p, labelStyle: S, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: b, style: E, markerEnd: z, markerStart: w, pathOptions: N, interactionWidth: R }) => {
    const [_, A, G] = vp({
      sourceX: c,
      sourceY: r,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g,
      curvature: N?.curvature
    }), B = l.isInternal ? void 0 : i;
    return q.jsx(hr, { id: B, path: _, labelX: A, labelY: G, label: p, labelStyle: S, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: b, style: E, markerEnd: z, markerStart: w, interactionWidth: R });
  });
}
const v3 = i1({ isInternal: !1 }), u1 = i1({ isInternal: !0 });
v3.displayName = "BezierEdge";
u1.displayName = "BezierEdgeInternal";
const yv = {
  default: u1,
  straight: a1,
  step: n1,
  smoothstep: t1,
  simplebezier: Fp
}, vv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, p3 = (l, i, c) => c === xt.Left ? l - i : c === xt.Right ? l + i : l, S3 = (l, i, c) => c === xt.Top ? l - i : c === xt.Bottom ? l + i : l, pv = "react-flow__edgeupdater";
function Sv({ position: l, centerX: i, centerY: c, radius: r = 10, onMouseDown: s, onMouseEnter: f, onMouseOut: d, type: g }) {
  return q.jsx("circle", { onMouseDown: s, onMouseEnter: f, onMouseOut: d, className: ue([pv, `${pv}-${g}`]), cx: p3(i, r, l), cy: S3(c, r, l), r, stroke: "transparent", fill: "transparent" });
}
function x3({ isReconnectable: l, reconnectRadius: i, edge: c, sourceX: r, sourceY: s, targetX: f, targetY: d, sourcePosition: g, targetPosition: p, onReconnect: S, onReconnectStart: y, onReconnectEnd: m, setReconnecting: v, setUpdateHover: b }) {
  const E = $t(), z = (A, G) => {
    if (A.button !== 0)
      return;
    const { autoPanOnConnect: B, domNode: H, connectionMode: Q, connectionRadius: Y, lib: lt, onConnectStart: P, cancelConnection: it, nodeLookup: at, rfId: C, panBy: j, updateConnection: O } = E.getState(), U = G.type === "target", Z = (ot, ct) => {
      v(!1), m?.(ot, c, G.type, ct);
    }, J = (ot) => S?.(c, ot), tt = (ot, ct) => {
      v(!0), y?.(A, c, G.type), P?.(ot, ct);
    };
    Ad.onPointerDown(A.nativeEvent, {
      autoPanOnConnect: B,
      connectionMode: Q,
      connectionRadius: Y,
      domNode: H,
      handleId: G.id,
      nodeId: G.nodeId,
      nodeLookup: at,
      isTarget: U,
      edgeUpdaterType: G.type,
      lib: lt,
      flowId: C,
      cancelConnection: it,
      panBy: j,
      isValidConnection: (...ot) => E.getState().isValidConnection?.(...ot) ?? !0,
      onConnect: J,
      onConnectStart: tt,
      onConnectEnd: (...ot) => E.getState().onConnectEnd?.(...ot),
      onReconnectEnd: Z,
      updateConnection: O,
      getTransform: () => E.getState().transform,
      getFromHandle: () => E.getState().connection.fromHandle,
      dragThreshold: E.getState().connectionDragThreshold,
      handleDomNode: A.currentTarget
    });
  }, w = (A) => z(A, { nodeId: c.target, id: c.targetHandle ?? null, type: "target" }), N = (A) => z(A, { nodeId: c.source, id: c.sourceHandle ?? null, type: "source" }), R = () => b(!0), _ = () => b(!1);
  return q.jsxs(q.Fragment, { children: [(l === !0 || l === "source") && q.jsx(Sv, { position: g, centerX: r, centerY: s, radius: i, onMouseDown: w, onMouseEnter: R, onMouseOut: _, type: "source" }), (l === !0 || l === "target") && q.jsx(Sv, { position: p, centerX: f, centerY: d, radius: i, onMouseDown: N, onMouseEnter: R, onMouseOut: _, type: "target" })] });
}
function b3({ id: l, edgesFocusable: i, edgesReconnectable: c, elementsSelectable: r, onClick: s, onDoubleClick: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: S, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: b, rfId: E, edgeTypes: z, noPanClassName: w, onError: N, disableKeyboardA11y: R }) {
  let _ = Bt((st) => st.edgeLookup.get(l));
  const A = Bt((st) => st.defaultEdgeOptions);
  _ = A ? { ...A, ..._ } : _;
  let G = _.type || "default", B = z?.[G] || yv[G];
  B === void 0 && (N?.("011", Sn.error011(G)), G = "default", B = z?.default || yv.default);
  const H = !!(_.focusable || i && typeof _.focusable > "u"), Q = typeof m < "u" && (_.reconnectable || c && typeof _.reconnectable > "u"), Y = !!(_.selectable || r && typeof _.selectable > "u"), lt = k.useRef(null), [P, it] = k.useState(!1), [at, C] = k.useState(!1), j = $t(), { zIndex: O = _.zIndex, sourceX: U, sourceY: Z, targetX: J, targetY: tt, sourcePosition: ot, targetPosition: ct } = Bt(k.useCallback((st) => {
    const pt = st.nodeLookup.get(_.source), _t = st.nodeLookup.get(_.target);
    if (!pt || !_t)
      return vv;
    const Ct = cw({
      id: l,
      sourceNode: pt,
      targetNode: _t,
      sourceHandle: _.sourceHandle || null,
      targetHandle: _.targetHandle || null,
      connectionMode: st.connectionMode,
      onError: N
    }), Tt = tw({
      selected: _.selected,
      zIndex: _.zIndex,
      sourceNode: pt,
      targetNode: _t,
      elevateOnSelect: st.elevateEdgesOnSelect,
      zIndexMode: st.zIndexMode
    });
    return {
      ...Ct || vv,
      zIndex: Tt
    };
  }, [_.source, _.target, _.sourceHandle, _.targetHandle, _.selected, _.zIndex, N]), kt), vt = k.useMemo(() => _.markerStart ? `url('#${Cd(_.markerStart, E)}')` : void 0, [_.markerStart, E]), T = k.useMemo(() => _.markerEnd ? `url('#${Cd(_.markerEnd, E)}')` : void 0, [_.markerEnd, E]);
  if (_.hidden || U === null || Z === null || J === null || tt === null)
    return null;
  const F = (st) => {
    const { addSelectedEdges: pt, unselectNodesAndEdges: _t, multiSelectionActive: Ct } = j.getState();
    Y && (j.setState({ nodesSelectionActive: !1 }), _.selected && Ct ? (_t({ nodes: [], edges: [_] }), lt.current?.blur()) : pt([l])), s && s(st, _);
  }, ft = f ? (st) => {
    f(st, { ..._ });
  } : void 0, ut = d ? (st) => {
    d(st, { ..._ });
  } : void 0, W = g ? (st) => {
    g(st, { ..._ });
  } : void 0, dt = p ? (st) => {
    p(st, { ..._ });
  } : void 0, gt = S ? (st) => {
    S(st, { ..._ });
  } : void 0, rt = (st) => {
    if (!R && ep.includes(st.key) && Y) {
      const { unselectNodesAndEdges: pt, addSelectedEdges: _t } = j.getState();
      st.key === "Escape" ? (lt.current?.blur(), pt({ edges: [_] })) : _t([l]);
    }
  };
  return q.jsx("svg", { style: { zIndex: O }, children: q.jsxs("g", { className: ue([
    "react-flow__edge",
    `react-flow__edge-${G}`,
    _.className,
    w,
    {
      selected: _.selected,
      animated: _.animated,
      inactive: !Y && !s,
      updating: P,
      selectable: Y
    }
  ]), onClick: F, onDoubleClick: ft, onContextMenu: ut, onMouseEnter: W, onMouseMove: dt, onMouseLeave: gt, onKeyDown: H ? rt : void 0, tabIndex: H ? 0 : void 0, role: _.ariaRole ?? (H ? "group" : "img"), "aria-roledescription": "edge", "data-id": l, "data-testid": `rf__edge-${l}`, "aria-label": _.ariaLabel === null ? void 0 : _.ariaLabel || `Edge from ${_.source} to ${_.target}`, "aria-describedby": H ? `${Hp}-${E}` : void 0, ref: lt, ..._.domAttributes, children: [!at && q.jsx(B, { id: l, source: _.source, target: _.target, type: _.type, selected: _.selected, animated: _.animated, selectable: Y, deletable: _.deletable ?? !0, label: _.label, labelStyle: _.labelStyle, labelShowBg: _.labelShowBg, labelBgStyle: _.labelBgStyle, labelBgPadding: _.labelBgPadding, labelBgBorderRadius: _.labelBgBorderRadius, sourceX: U, sourceY: Z, targetX: J, targetY: tt, sourcePosition: ot, targetPosition: ct, data: _.data, style: _.style, sourceHandleId: _.sourceHandle, targetHandleId: _.targetHandle, markerStart: vt, markerEnd: T, pathOptions: "pathOptions" in _ ? _.pathOptions : void 0, interactionWidth: _.interactionWidth }), Q && q.jsx(x3, { edge: _, isReconnectable: Q, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: b, sourceX: U, sourceY: Z, targetX: J, targetY: tt, sourcePosition: ot, targetPosition: ct, setUpdateHover: it, setReconnecting: C })] }) });
}
var E3 = k.memo(b3);
const _3 = (l) => ({
  edgesFocusable: l.edgesFocusable,
  edgesReconnectable: l.edgesReconnectable,
  elementsSelectable: l.elementsSelectable,
  connectionMode: l.connectionMode,
  onError: l.onError
});
function o1({ defaultMarkerColor: l, onlyRenderVisibleElements: i, rfId: c, edgeTypes: r, noPanClassName: s, onReconnect: f, onEdgeContextMenu: d, onEdgeMouseEnter: g, onEdgeMouseMove: p, onEdgeMouseLeave: S, onEdgeClick: y, reconnectRadius: m, onEdgeDoubleClick: v, onReconnectStart: b, onReconnectEnd: E, disableKeyboardA11y: z }) {
  const { edgesFocusable: w, edgesReconnectable: N, elementsSelectable: R, onError: _ } = Bt(_3, kt), A = o3(i);
  return q.jsxs("div", { className: "react-flow__edges", children: [q.jsx(d3, { defaultColor: l, rfId: c }), A.map((G) => q.jsx(E3, { id: G, edgesFocusable: w, edgesReconnectable: N, elementsSelectable: R, noPanClassName: s, onReconnect: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: S, onClick: y, reconnectRadius: m, onDoubleClick: v, onReconnectStart: b, onReconnectEnd: E, rfId: c, onError: _, edgeTypes: r, disableKeyboardA11y: z }, G))] });
}
o1.displayName = "EdgeRenderer";
const w3 = k.memo(o1), xv = (l) => `translate(${l[0]}px,${l[1]}px) scale(${l[2]})`;
function N3({ children: l }) {
  const i = $t(), c = k.useRef(null), [r] = k.useState(() => i.getState().transform);
  return jp(() => {
    let s = null;
    const f = () => {
      const d = i.getState().transform;
      s && d[0] === s[0] && d[1] === s[1] && d[2] === s[2] || (s = d, c.current && (c.current.style.transform = xv(d)));
    };
    return f(), i.subscribe(f);
  }, [i]), q.jsx("div", { ref: c, className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: xv(r) }, children: l });
}
function T3(l) {
  const i = fr(), c = k.useRef(!1);
  k.useEffect(() => {
    !c.current && i.viewportInitialized && l && (setTimeout(() => l(i), 1), c.current = !0);
  }, [l, i.viewportInitialized]);
}
const z3 = (l) => l.panZoom?.syncViewport;
function C3(l) {
  const i = Bt(z3), c = $t();
  return k.useEffect(() => {
    l && (i?.(l), c.setState({ transform: [l.x, l.y, l.zoom] }));
  }, [l, i]), null;
}
function M3(l) {
  return l.connection.inProgress ? { ...l.connection, to: Ju(l.connection.to, l.transform) } : { ...l.connection };
}
function A3(l) {
  return M3;
}
function O3(l) {
  const i = A3();
  return Bt(i, kt);
}
const D3 = (l) => ({
  nodesConnectable: l.nodesConnectable,
  isValid: l.connection.isValid,
  inProgress: l.connection.inProgress,
  width: l.width,
  height: l.height
});
function R3({ containerStyle: l, style: i, type: c, component: r }) {
  const { nodesConnectable: s, width: f, height: d, isValid: g, inProgress: p } = Bt(D3, kt);
  return !(f && s && p) ? null : q.jsx("svg", { style: l, width: f, height: d, className: "react-flow__connectionline react-flow__container", children: q.jsx("g", { className: ue(["react-flow__connection", dp(g)]), children: q.jsx(c1, { style: i, type: c, CustomComponent: r, isValid: g }) }) });
}
const c1 = ({ style: l, type: i = Yl.Bezier, CustomComponent: c, isValid: r }) => {
  const { inProgress: s, from: f, fromNode: d, fromHandle: g, fromPosition: p, to: S, toNode: y, toHandle: m, toPosition: v, pointer: b } = O3();
  if (!s)
    return;
  if (c)
    return q.jsx(c, { connectionLineType: i, connectionLineStyle: l, fromNode: d, fromHandle: g, fromX: f.x, fromY: f.y, toX: S.x, toY: S.y, fromPosition: p, toPosition: v, connectionStatus: dp(r), toNode: y, toHandle: m, pointer: b });
  let E = "";
  const z = {
    sourceX: f.x,
    sourceY: f.y,
    sourcePosition: p,
    targetX: S.x,
    targetY: S.y,
    targetPosition: v
  };
  switch (i) {
    case Yl.Bezier:
      [E] = vp(z);
      break;
    case Yl.SimpleBezier:
      [E] = Ip(z);
      break;
    case Yl.Step:
      [E] = zd({
        ...z,
        borderRadius: 0
      });
      break;
    case Yl.SmoothStep:
      [E] = zd(z);
      break;
    default:
      [E] = Sp(z);
  }
  return q.jsx("path", { d: E, fill: "none", className: "react-flow__connection-path", style: l });
};
c1.displayName = "ConnectionLine";
const H3 = {};
function bv(l = H3) {
  k.useRef(l), $t(), k.useEffect(() => {
  }, [l]);
}
function U3() {
  $t(), k.useRef(!1), k.useEffect(() => {
  }, []);
}
function r1({ nodeTypes: l, edgeTypes: i, onInit: c, onNodeClick: r, onEdgeClick: s, onNodeDoubleClick: f, onEdgeDoubleClick: d, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: S, onNodeContextMenu: y, onSelectionContextMenu: m, onSelectionStart: v, onSelectionEnd: b, connectionLineType: E, connectionLineStyle: z, connectionLineComponent: w, connectionLineContainerStyle: N, selectionKeyCode: R, selectionOnDrag: _, selectionMode: A, multiSelectionKeyCode: G, panActivationKeyCode: B, zoomActivationKeyCode: H, deleteKeyCode: Q, onlyRenderVisibleElements: Y, elementsSelectable: lt, defaultViewport: P, translateExtent: it, minZoom: at, maxZoom: C, preventScrolling: j, defaultMarkerColor: O, zoomOnScroll: U, zoomOnPinch: Z, panOnScroll: J, panOnScrollSpeed: tt, panOnScrollMode: ot, zoomOnDoubleClick: ct, panOnDrag: vt, autoPanOnSelection: T, onPaneClick: F, onPaneMouseEnter: ft, onPaneMouseMove: ut, onPaneMouseLeave: W, onPaneScroll: dt, onPaneContextMenu: gt, paneClickDistance: rt, nodeClickDistance: st, onEdgeContextMenu: pt, onEdgeMouseEnter: _t, onEdgeMouseMove: Ct, onEdgeMouseLeave: Tt, reconnectRadius: Ht, onReconnect: Ot, onReconnectStart: Pt, onReconnectEnd: Se, noDragClassName: re, noWheelClassName: En, noPanClassName: Ie, disableKeyboardA11y: Ae, nodeExtent: Ee, rfId: Oe, viewport: Ve, onViewportChange: _n, nodesDraggable: ke }) {
  return bv(l), bv(i), U3(), T3(c), C3(Ve), q.jsx(FN, { onPaneClick: F, onPaneMouseEnter: ft, onPaneMouseMove: ut, onPaneMouseLeave: W, onPaneContextMenu: gt, onPaneScroll: dt, paneClickDistance: rt, deleteKeyCode: Q, selectionKeyCode: R, selectionOnDrag: _, selectionMode: A, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: G, panActivationKeyCode: B, zoomActivationKeyCode: H, elementsSelectable: lt, zoomOnScroll: U, zoomOnPinch: Z, zoomOnDoubleClick: ct, panOnScroll: J, panOnScrollSpeed: tt, panOnScrollMode: ot, panOnDrag: vt, autoPanOnSelection: T, defaultViewport: P, translateExtent: it, minZoom: at, maxZoom: C, onSelectionContextMenu: m, preventScrolling: j, noDragClassName: re, noWheelClassName: En, noPanClassName: Ie, disableKeyboardA11y: Ae, onViewportChange: _n, isControlledViewport: !!Ve, children: q.jsxs(N3, { children: [q.jsx(w3, { edgeTypes: i, onEdgeClick: s, onEdgeDoubleClick: d, onReconnect: Ot, onReconnectStart: Pt, onReconnectEnd: Se, onlyRenderVisibleElements: Y, onEdgeContextMenu: pt, onEdgeMouseEnter: _t, onEdgeMouseMove: Ct, onEdgeMouseLeave: Tt, reconnectRadius: Ht, defaultMarkerColor: O, noPanClassName: Ie, disableKeyboardA11y: Ae, rfId: Oe }), q.jsx(R3, { style: z, type: E, component: w, containerStyle: N }), q.jsx("div", { className: "react-flow__edgelabel-renderer" }), q.jsx(u3, { nodeTypes: l, onNodeClick: r, onNodeDoubleClick: f, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: S, onNodeContextMenu: y, nodeClickDistance: st, onlyRenderVisibleElements: Y, noPanClassName: Ie, noDragClassName: re, disableKeyboardA11y: Ae, nodeExtent: Ee, rfId: Oe, nodesDraggable: ke }), q.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
r1.displayName = "GraphView";
const B3 = k.memo(r1), Y3 = rp(), Ev = ({ nodes: l, edges: i, defaultNodes: c, defaultEdges: r, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p = 0.5, maxZoom: S = 2, nodeOrigin: y, nodeExtent: m, zIndexMode: v = "basic" } = {}) => {
  const b = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), N = r ?? i ?? [], R = c ?? l ?? [], _ = y ?? [0, 0], A = m ?? Uu;
  Ep(z, w, N);
  const { nodesInitialized: G } = Md(R, b, E, {
    nodeOrigin: _,
    nodeExtent: A,
    zIndexMode: v
  });
  let B = [0, 0, 1];
  if (d && s && f) {
    const H = Ku(b, {
      filter: (P) => !!((P.width || P.initialWidth) && (P.height || P.initialHeight))
    }), { x: Q, y: Y, zoom: lt } = Gd(H, s, f, p, S, g?.padding ?? 0.1);
    B = [Q, Y, lt];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: f ?? 0,
    transform: B,
    nodes: R,
    nodesInitialized: G,
    nodeLookup: b,
    parentLookup: E,
    edges: N,
    edgeLookup: w,
    connectionLookup: z,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: c !== void 0,
    hasDefaultEdges: r !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: S,
    translateExtent: Uu,
    nodeExtent: A,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: xi.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: _,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: d ?? !1,
    fitViewOptions: g,
    fitViewResolver: null,
    connection: { ...lp },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: Y3,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: np,
    zIndexMode: v,
    defaultEdgeOptions: void 0,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onNodesDelete: void 0,
    onEdgesDelete: void 0,
    onDelete: void 0,
    onBeforeDelete: void 0,
    onViewportChangeStart: void 0,
    onViewportChange: void 0,
    onViewportChangeEnd: void 0,
    onNodeDragStart: void 0,
    onNodeDrag: void 0,
    onNodeDragStop: void 0,
    onSelectionDragStart: void 0,
    onSelectionDrag: void 0,
    onSelectionDragStop: void 0,
    onMoveStart: void 0,
    onMove: void 0,
    onMoveEnd: void 0,
    onConnect: void 0,
    onConnectStart: void 0,
    onConnectEnd: void 0,
    onClickConnectStart: void 0,
    onClickConnectEnd: void 0
  };
}, V3 = ({ nodes: l, edges: i, defaultNodes: c, defaultEdges: r, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p, maxZoom: S, nodeOrigin: y, nodeExtent: m, zIndexMode: v }) => Fw((b, E) => {
  async function z() {
    const { nodeLookup: w, panZoom: N, fitViewOptions: R, fitViewResolver: _, width: A, height: G, minZoom: B, maxZoom: H } = E();
    N && (await $2({
      nodes: w,
      width: A,
      height: G,
      panZoom: N,
      minZoom: B,
      maxZoom: H
    }, R), _?.resolve(!0), b({ fitViewResolver: null }));
  }
  return {
    ...Ev({
      nodes: l,
      edges: i,
      width: s,
      height: f,
      fitView: d,
      fitViewOptions: g,
      minZoom: p,
      maxZoom: S,
      nodeOrigin: y,
      nodeExtent: m,
      defaultNodes: c,
      defaultEdges: r,
      zIndexMode: v
    }),
    setNodes: (w) => {
      const { nodeLookup: N, parentLookup: R, nodeOrigin: _, nodeExtent: A, elevateNodesOnSelect: G, fitViewQueued: B, zIndexMode: H, nodesSelectionActive: Q } = E(), { nodesInitialized: Y, hasSelectedNodes: lt } = Md(w, N, R, {
        nodeOrigin: _,
        nodeExtent: A,
        elevateNodesOnSelect: G,
        checkEquality: !0,
        zIndexMode: H
      }), P = Q && lt;
      B && Y ? (z(), b({
        nodes: w,
        nodesInitialized: Y,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: P
      })) : b({ nodes: w, nodesInitialized: Y, nodesSelectionActive: P });
    },
    setEdges: (w) => {
      const { connectionLookup: N, edgeLookup: R } = E();
      Ep(N, R, w), b({ edges: w });
    },
    setDefaultNodesAndEdges: (w, N) => {
      if (w) {
        const { setNodes: R } = E();
        R(w), b({ hasDefaultNodes: !0 });
      }
      if (N) {
        const { setEdges: R } = E();
        R(N), b({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (w) => {
      const { triggerNodeChanges: N, nodeLookup: R, parentLookup: _, domNode: A, nodeOrigin: G, nodeExtent: B, debug: H, fitViewQueued: Q, zIndexMode: Y } = E(), { changes: lt, updatedInternals: P } = yw(w, R, _, A, G, B, Y);
      P && (dw(R, _, { nodeOrigin: G, nodeExtent: B, zIndexMode: Y }), Q ? (z(), b({ fitViewQueued: !1, fitViewOptions: void 0 })) : b({}), lt?.length > 0 && (H && console.log("React Flow: trigger node changes", lt), N?.(lt)));
    },
    updateNodePositions: (w, N = !1) => {
      const R = [];
      let _ = [];
      const { nodeLookup: A, triggerNodeChanges: G, connection: B, updateConnection: H, onNodesChangeMiddlewareMap: Q } = E();
      for (const [Y, lt] of w) {
        const P = A.get(Y), it = !!(P?.expandParent && P?.parentId && lt?.position), at = {
          id: Y,
          type: "position",
          position: it ? {
            x: Math.max(0, lt.position.x),
            y: Math.max(0, lt.position.y)
          } : lt.position,
          dragging: N
        };
        if (P && B.inProgress && B.fromNode.id === P.id) {
          const C = xa(P, B.fromHandle, xt.Left, !0);
          H({ ...B, from: C });
        }
        it && P.parentId && R.push({
          id: Y,
          parentId: P.parentId,
          rect: {
            ...lt.internals.positionAbsolute,
            width: lt.measured.width ?? 0,
            height: lt.measured.height ?? 0
          }
        }), _.push(at);
      }
      if (R.length > 0) {
        const { parentLookup: Y, nodeOrigin: lt } = E(), P = kd(R, A, Y, lt);
        _.push(...P);
      }
      for (const Y of Q.values())
        _ = Y(_);
      G(_);
    },
    triggerNodeChanges: (w) => {
      const { onNodesChange: N, setNodes: R, nodes: _, hasDefaultNodes: A, debug: G } = E();
      if (w?.length) {
        if (A) {
          const B = pN(w, _);
          R(B);
        }
        G && console.log("React Flow: trigger node changes", w), N?.(w);
      }
    },
    triggerEdgeChanges: (w) => {
      const { onEdgesChange: N, setEdges: R, edges: _, hasDefaultEdges: A, debug: G } = E();
      if (w?.length) {
        if (A) {
          const B = SN(w, _);
          R(B);
        }
        G && console.log("React Flow: trigger edge changes", w), N?.(w);
      }
    },
    addSelectedNodes: (w) => {
      const { multiSelectionActive: N, edgeLookup: R, nodeLookup: _, triggerNodeChanges: A, triggerEdgeChanges: G } = E();
      if (N) {
        const B = w.map((H) => da(H, !0));
        A(B);
        return;
      }
      A(mi(_, /* @__PURE__ */ new Set([...w]), !0)), G(mi(R));
    },
    addSelectedEdges: (w) => {
      const { multiSelectionActive: N, edgeLookup: R, nodeLookup: _, triggerNodeChanges: A, triggerEdgeChanges: G } = E();
      if (N) {
        const B = w.map((H) => da(H, !0));
        G(B);
        return;
      }
      G(mi(R, /* @__PURE__ */ new Set([...w]))), A(mi(_, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: w, edges: N } = {}) => {
      const { edges: R, nodes: _, nodeLookup: A, triggerNodeChanges: G, triggerEdgeChanges: B } = E(), H = w || _, Q = N || R, Y = [];
      for (const P of H) {
        if (!P.selected)
          continue;
        const it = A.get(P.id);
        it && (it.selected = !1), Y.push(da(P.id, !1));
      }
      const lt = [];
      for (const P of Q)
        P.selected && lt.push(da(P.id, !1));
      G(Y), B(lt);
    },
    setMinZoom: (w) => {
      const { panZoom: N, maxZoom: R } = E();
      N?.setScaleExtent([w, R]), b({ minZoom: w });
    },
    setMaxZoom: (w) => {
      const { panZoom: N, minZoom: R } = E();
      N?.setScaleExtent([R, w]), b({ maxZoom: w });
    },
    setTranslateExtent: (w) => {
      E().panZoom?.setTranslateExtent(w), b({ translateExtent: w });
    },
    resetSelectedElements: () => {
      const { edges: w, nodes: N, triggerNodeChanges: R, triggerEdgeChanges: _, elementsSelectable: A } = E();
      if (!A)
        return;
      const G = N.reduce((H, Q) => Q.selected ? [...H, da(Q.id, !1)] : H, []), B = w.reduce((H, Q) => Q.selected ? [...H, da(Q.id, !1)] : H, []);
      R(G), _(B);
    },
    setNodeExtent: (w) => {
      const { nodes: N, nodeLookup: R, parentLookup: _, nodeOrigin: A, elevateNodesOnSelect: G, nodeExtent: B, zIndexMode: H } = E();
      w[0][0] === B[0][0] && w[0][1] === B[0][1] && w[1][0] === B[1][0] && w[1][1] === B[1][1] || (Md(N, R, _, {
        nodeOrigin: A,
        nodeExtent: w,
        elevateNodesOnSelect: G,
        checkEquality: !1,
        zIndexMode: H
      }), b({ nodeExtent: w }));
    },
    panBy: (w) => {
      const { transform: N, width: R, height: _, panZoom: A, translateExtent: G } = E();
      return vw({ delta: w, panZoom: A, transform: N, translateExtent: G, width: R, height: _ });
    },
    setCenter: async (w, N, R) => {
      const { width: _, height: A, maxZoom: G, panZoom: B } = E();
      if (!B)
        return !1;
      const H = typeof R?.zoom < "u" ? R.zoom : G;
      return await B.setViewport({
        x: _ / 2 - w * H,
        y: A / 2 - N * H,
        zoom: H
      }, { duration: R?.duration, ease: R?.ease, interpolate: R?.interpolate }), !0;
    },
    cancelConnection: () => {
      b({
        connection: { ...lp }
      });
    },
    updateConnection: (w) => {
      b({ connection: w });
    },
    reset: () => b({ ...Ev() })
  };
}, Object.is);
function Wd({ initialNodes: l, initialEdges: i, defaultNodes: c, defaultEdges: r, initialWidth: s, initialHeight: f, initialMinZoom: d, initialMaxZoom: g, initialFitViewOptions: p, fitView: S, nodeOrigin: y, nodeExtent: m, zIndexMode: v, children: b }) {
  const [E] = k.useState(() => V3({
    nodes: l,
    edges: i,
    defaultNodes: c,
    defaultEdges: r,
    width: s,
    height: f,
    fitView: S,
    minZoom: d,
    maxZoom: g,
    fitViewOptions: p,
    nodeOrigin: y,
    nodeExtent: m,
    zIndexMode: v
  }));
  return q.jsx(Ww, { value: E, children: q.jsx(_N, { children: q.jsx(VN, { children: b }) }) });
}
function j3({ children: l, nodes: i, edges: c, defaultNodes: r, defaultEdges: s, width: f, height: d, fitView: g, fitViewOptions: p, minZoom: S, maxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: b }) {
  return k.useContext(rr) ? q.jsx(q.Fragment, { children: l }) : q.jsx(Wd, { initialNodes: i, initialEdges: c, defaultNodes: r, defaultEdges: s, initialWidth: f, initialHeight: d, fitView: g, initialFitViewOptions: p, initialMinZoom: S, initialMaxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: b, children: l });
}
const L3 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function q3({ nodes: l, edges: i, defaultNodes: c, defaultEdges: r, className: s, nodeTypes: f, edgeTypes: d, onNodeClick: g, onEdgeClick: p, onInit: S, onMove: y, onMoveStart: m, onMoveEnd: v, onConnect: b, onConnectStart: E, onConnectEnd: z, onClickConnectStart: w, onClickConnectEnd: N, onNodeMouseEnter: R, onNodeMouseMove: _, onNodeMouseLeave: A, onNodeContextMenu: G, onNodeDoubleClick: B, onNodeDragStart: H, onNodeDrag: Q, onNodeDragStop: Y, onNodesDelete: lt, onEdgesDelete: P, onDelete: it, onSelectionChange: at, onSelectionDragStart: C, onSelectionDrag: j, onSelectionDragStop: O, onSelectionContextMenu: U, onSelectionStart: Z, onSelectionEnd: J, onBeforeDelete: tt, connectionMode: ot, connectionLineType: ct = Yl.Bezier, connectionLineStyle: vt, connectionLineComponent: T, connectionLineContainerStyle: F, deleteKeyCode: ft = "Backspace", selectionKeyCode: ut = "Shift", selectionOnDrag: W = !1, selectionMode: dt = Bu.Full, panActivationKeyCode: gt = "Space", multiSelectionKeyCode: rt = ju() ? "Meta" : "Control", zoomActivationKeyCode: st = ju() ? "Meta" : "Control", snapToGrid: pt, snapGrid: _t, onlyRenderVisibleElements: Ct = !1, selectNodesOnDrag: Tt, nodesDraggable: Ht, autoPanOnNodeFocus: Ot, nodesConnectable: Pt, nodesFocusable: Se, nodeOrigin: re = Up, edgesFocusable: En, edgesReconnectable: Ie, elementsSelectable: Ae = !0, defaultViewport: Ee = fN, minZoom: Oe = 0.5, maxZoom: Ve = 2, translateExtent: _n = Uu, preventScrolling: ke = !0, nodeExtent: Ll, defaultMarkerColor: Ni = "#b1b1b7", zoomOnScroll: gr = !0, zoomOnPinch: Iu = !0, panOnScroll: Ti = !1, panOnScrollSpeed: zi = 0.5, panOnScrollMode: Ci = ma.Free, zoomOnDoubleClick: mr = !0, panOnDrag: yr = !0, onPaneClick: _e, onPaneMouseEnter: vr, onPaneMouseMove: ku, onPaneMouseLeave: Fu, onPaneScroll: ba, onPaneContextMenu: pr, paneClickDistance: Wu = 1, nodeClickDistance: Sr = 0, children: xr, onReconnect: ql, onReconnectStart: we, onReconnectEnd: wn, onEdgeContextMenu: Ne, onEdgeDoubleClick: br, onEdgeMouseEnter: Er, onEdgeMouseMove: _r, onEdgeMouseLeave: Ea, reconnectRadius: _a = 10, onNodesChange: wa, onEdgesChange: jn, noDragClassName: Na = "nodrag", noWheelClassName: Xl = "nowheel", noPanClassName: Mi = "nopan", fitView: Pu, fitViewOptions: Ai, connectOnClick: Oi, attributionPosition: Zl, proOptions: wr, defaultEdgeOptions: to, elevateNodesOnSelect: eo = !0, elevateEdgesOnSelect: no = !1, disableKeyboardA11y: Ta = !1, autoPanOnConnect: Di, autoPanOnNodeDrag: lo, autoPanOnSelection: ao = !0, autoPanSpeed: on, connectionRadius: oe, isValidConnection: xe, onError: il, style: io, id: uo, nodeDragThreshold: Nr, connectionDragThreshold: oo, viewport: Gl, onViewportChange: za, width: Ca, height: Ln, colorMode: ul = "light", debug: Ql, onScroll: qn, ariaLabelConfig: ee, zIndexMode: Ri = "basic", ...co }, ro) {
  const cn = uo || "1", ol = mN(ul), Tr = k.useCallback((Hi) => {
    Hi.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), qn?.(Hi);
  }, [qn]);
  return q.jsx("div", { "data-testid": "rf__wrapper", ...co, onScroll: Tr, style: { ...io, ...L3 }, ref: ro, className: ue(["react-flow", s, ol]), id: uo, role: "application", children: q.jsxs(j3, { nodes: l, edges: i, width: Ca, height: Ln, fitView: Pu, fitViewOptions: Ai, minZoom: Oe, maxZoom: Ve, nodeOrigin: re, nodeExtent: Ll, zIndexMode: Ri, children: [q.jsx(gN, { nodes: l, edges: i, defaultNodes: c, defaultEdges: r, onConnect: b, onConnectStart: E, onConnectEnd: z, onClickConnectStart: w, onClickConnectEnd: N, nodesDraggable: Ht, autoPanOnNodeFocus: Ot, nodesConnectable: Pt, nodesFocusable: Se, edgesFocusable: En, edgesReconnectable: Ie, elementsSelectable: Ae, elevateNodesOnSelect: eo, elevateEdgesOnSelect: no, minZoom: Oe, maxZoom: Ve, nodeExtent: Ll, onNodesChange: wa, onEdgesChange: jn, snapToGrid: pt, snapGrid: _t, connectionMode: ot, translateExtent: _n, connectOnClick: Oi, defaultEdgeOptions: to, fitView: Pu, fitViewOptions: Ai, onNodesDelete: lt, onEdgesDelete: P, onDelete: it, onNodeDragStart: H, onNodeDrag: Q, onNodeDragStop: Y, onSelectionDrag: j, onSelectionDragStart: C, onSelectionDragStop: O, onMove: y, onMoveStart: m, onMoveEnd: v, noPanClassName: Mi, nodeOrigin: re, rfId: cn, autoPanOnConnect: Di, autoPanOnNodeDrag: lo, autoPanSpeed: on, onError: il, connectionRadius: oe, isValidConnection: xe, selectNodesOnDrag: Tt, nodeDragThreshold: Nr, connectionDragThreshold: oo, onBeforeDelete: tt, debug: Ql, ariaLabelConfig: ee, zIndexMode: Ri }), q.jsx(B3, { onInit: S, onNodeClick: g, onEdgeClick: p, onNodeMouseEnter: R, onNodeMouseMove: _, onNodeMouseLeave: A, onNodeContextMenu: G, onNodeDoubleClick: B, nodeTypes: f, edgeTypes: d, connectionLineType: ct, connectionLineStyle: vt, connectionLineComponent: T, connectionLineContainerStyle: F, selectionKeyCode: ut, selectionOnDrag: W, selectionMode: dt, deleteKeyCode: ft, multiSelectionKeyCode: rt, panActivationKeyCode: gt, zoomActivationKeyCode: st, onlyRenderVisibleElements: Ct, defaultViewport: Ee, translateExtent: _n, minZoom: Oe, maxZoom: Ve, preventScrolling: ke, zoomOnScroll: gr, zoomOnPinch: Iu, zoomOnDoubleClick: mr, panOnScroll: Ti, panOnScrollSpeed: zi, panOnScrollMode: Ci, panOnDrag: yr, autoPanOnSelection: ao, onPaneClick: _e, onPaneMouseEnter: vr, onPaneMouseMove: ku, onPaneMouseLeave: Fu, onPaneScroll: ba, onPaneContextMenu: pr, paneClickDistance: Wu, nodeClickDistance: Sr, onSelectionContextMenu: U, onSelectionStart: Z, onSelectionEnd: J, onReconnect: ql, onReconnectStart: we, onReconnectEnd: wn, onEdgeContextMenu: Ne, onEdgeDoubleClick: br, onEdgeMouseEnter: Er, onEdgeMouseMove: _r, onEdgeMouseLeave: Ea, reconnectRadius: _a, defaultMarkerColor: Ni, noDragClassName: Na, noWheelClassName: Xl, noPanClassName: Mi, rfId: cn, disableKeyboardA11y: Ta, nodeExtent: Ll, viewport: Gl, onViewportChange: za, nodesDraggable: Ht }), q.jsx(sN, { onSelectionChange: at }), xr, q.jsx(iN, { proOptions: wr, position: Zl }), q.jsx(aN, { rfId: cn, disableKeyboardA11y: Ta })] }) });
}
var s1 = Vp(q3);
function X3({ dimensions: l, lineWidth: i, variant: c, className: r }) {
  return q.jsx("path", { strokeWidth: i, d: `M${l[0] / 2} 0 V${l[1]} M0 ${l[1] / 2} H${l[0]}`, className: ue(["react-flow__background-pattern", c, r]) });
}
function Z3({ radius: l, className: i }) {
  return q.jsx("circle", { cx: l, cy: l, r: l, className: ue(["react-flow__background-pattern", "dots", i]) });
}
var jl;
(function(l) {
  l.Lines = "lines", l.Dots = "dots", l.Cross = "cross";
})(jl || (jl = {}));
const G3 = {
  [jl.Dots]: 1,
  [jl.Lines]: 1,
  [jl.Cross]: 6
}, Q3 = (l) => ({ transform: l.transform, patternId: `pattern-${l.rfId}` });
function f1({
  id: l,
  variant: i = jl.Dots,
  // only used for dots and cross
  gap: c = 20,
  // only used for lines and cross
  size: r,
  lineWidth: s = 1,
  offset: f = 0,
  color: d,
  bgColor: g,
  style: p,
  className: S,
  patternClassName: y
}) {
  const m = k.useRef(null), { transform: v, patternId: b } = Bt(Q3, kt), E = r || G3[i], z = i === jl.Dots, w = i === jl.Cross, N = Array.isArray(c) ? c : [c, c], R = [N[0] * v[2] || 1, N[1] * v[2] || 1], _ = E * v[2], A = Array.isArray(f) ? f : [f, f], G = w ? [_, _] : R, B = [
    A[0] * v[2] + G[0] / 2,
    A[1] * v[2] + G[1] / 2
  ], H = `${b}${l || ""}`;
  return q.jsxs("svg", { className: ue(["react-flow__background", S]), style: {
    ...p,
    ...dr,
    "--xy-background-color-props": g,
    "--xy-background-pattern-color-props": d
  }, ref: m, "data-testid": "rf__background", children: [q.jsx("pattern", { id: H, x: v[0] % R[0], y: v[1] % R[1], width: R[0], height: R[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${B[0]},-${B[1]})`, children: z ? q.jsx(Z3, { radius: _ / 2, className: y }) : q.jsx(X3, { dimensions: G, lineWidth: s, variant: i, className: y }) }), q.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${H})` })] });
}
f1.displayName = "Background";
const d1 = k.memo(f1);
function K3() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: q.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function $3() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: q.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function J3() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: q.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function I3() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: q.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function k3() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: q.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function jc({ children: l, className: i, ...c }) {
  return q.jsx("button", { type: "button", className: ue(["react-flow__controls-button", i]), ...c, children: l });
}
const F3 = (l) => ({
  isInteractive: l.nodesDraggable || l.nodesConnectable || l.elementsSelectable,
  minZoomReached: l.transform[2] <= l.minZoom,
  maxZoomReached: l.transform[2] >= l.maxZoom,
  ariaLabelConfig: l.ariaLabelConfig
});
function h1({ style: l, showZoom: i = !0, showFitView: c = !0, showInteractive: r = !0, fitViewOptions: s, onZoomIn: f, onZoomOut: d, onFitView: g, onInteractiveChange: p, className: S, children: y, position: m = "bottom-left", orientation: v = "vertical", "aria-label": b }) {
  const E = $t(), { isInteractive: z, minZoomReached: w, maxZoomReached: N, ariaLabelConfig: R } = Bt(F3, kt), { zoomIn: _, zoomOut: A, fitView: G } = fr(), B = () => {
    _(), f?.();
  }, H = () => {
    A(), d?.();
  }, Q = () => {
    G(s), g?.();
  }, Y = () => {
    E.setState({
      nodesDraggable: !z,
      nodesConnectable: !z,
      elementsSelectable: !z
    }), p?.(!z);
  }, lt = v === "horizontal" ? "horizontal" : "vertical";
  return q.jsxs(sr, { className: ue(["react-flow__controls", lt, S]), position: m, style: l, "data-testid": "rf__controls", "aria-label": b ?? R["controls.ariaLabel"], children: [i && q.jsxs(q.Fragment, { children: [q.jsx(jc, { onClick: B, className: "react-flow__controls-zoomin", title: R["controls.zoomIn.ariaLabel"], "aria-label": R["controls.zoomIn.ariaLabel"], disabled: N, children: q.jsx(K3, {}) }), q.jsx(jc, { onClick: H, className: "react-flow__controls-zoomout", title: R["controls.zoomOut.ariaLabel"], "aria-label": R["controls.zoomOut.ariaLabel"], disabled: w, children: q.jsx($3, {}) })] }), c && q.jsx(jc, { className: "react-flow__controls-fitview", onClick: Q, title: R["controls.fitView.ariaLabel"], "aria-label": R["controls.fitView.ariaLabel"], children: q.jsx(J3, {}) }), r && q.jsx(jc, { className: "react-flow__controls-interactive", onClick: Y, title: R["controls.interactive.ariaLabel"], "aria-label": R["controls.interactive.ariaLabel"], children: z ? q.jsx(k3, {}) : q.jsx(I3, {}) }), y] });
}
h1.displayName = "Controls";
const W3 = k.memo(h1);
function P3({ id: l, x: i, y: c, width: r, height: s, style: f, color: d, strokeColor: g, strokeWidth: p, className: S, borderRadius: y, shapeRendering: m, selected: v, onClick: b }) {
  const { background: E, backgroundColor: z } = f || {}, w = d || E || z;
  return q.jsx("rect", { className: ue(["react-flow__minimap-node", { selected: v }, S]), x: i, y: c, rx: y, ry: y, width: r, height: s, style: {
    fill: w,
    stroke: g,
    strokeWidth: p
  }, shapeRendering: m, onClick: b ? (N) => b(N, l) : void 0 });
}
const tT = k.memo(P3), eT = (l) => l.nodes.map((i) => i.id), yd = (l) => l instanceof Function ? l : () => l;
function nT({
  nodeStrokeColor: l,
  nodeColor: i,
  nodeClassName: c = "",
  nodeBorderRadius: r = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: f = tT,
  onClick: d
}) {
  const g = Bt(eT, kt), p = yd(i), S = yd(l), y = yd(c), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return q.jsx(q.Fragment, { children: g.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    q.jsx(aT, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: S, nodeClassNameFunc: y, nodeBorderRadius: r, nodeStrokeWidth: s, NodeComponent: f, onClick: d, shapeRendering: m }, v)
  )) });
}
function lT({ id: l, nodeColorFunc: i, nodeStrokeColorFunc: c, nodeClassNameFunc: r, nodeBorderRadius: s, nodeStrokeWidth: f, shapeRendering: d, NodeComponent: g, onClick: p }) {
  const { node: S, x: y, y: m, width: v, height: b } = Bt((E) => {
    const z = E.nodeLookup.get(l);
    if (!z)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const w = z.internals.userNode, { x: N, y: R } = z.internals.positionAbsolute, { width: _, height: A } = bn(w);
    return {
      node: w,
      x: N,
      y: R,
      width: _,
      height: A
    };
  }, kt);
  return !S || S.hidden || !sp(S) ? null : q.jsx(g, { x: y, y: m, width: v, height: b, style: S.style, selected: !!S.selected, className: r(S), color: i(S), borderRadius: s, strokeColor: c(S), strokeWidth: f, shapeRendering: d, onClick: p, id: S.id });
}
const aT = k.memo(lT);
var iT = k.memo(nT);
const uT = 200, oT = 150, cT = (l) => !l.hidden, rT = (l) => {
  const i = {
    x: -l.transform[0] / l.transform[2],
    y: -l.transform[1] / l.transform[2],
    width: l.width / l.transform[2],
    height: l.height / l.transform[2]
  };
  let c = !1;
  for (const r of l.nodeLookup.values())
    if (!r.hidden) {
      c = !0;
      break;
    }
  return {
    viewBB: i,
    boundingRect: c ? op(Ku(l.nodeLookup, { filter: cT }), i) : i,
    rfId: l.rfId,
    panZoom: l.panZoom,
    translateExtent: l.translateExtent,
    flowWidth: l.width,
    flowHeight: l.height,
    ariaLabelConfig: l.ariaLabelConfig
  };
}, _v = (l, i) => l.x === i.x && l.y === i.y && l.width === i.width && l.height === i.height, sT = (l, i) => _v(l.viewBB, i.viewBB) && _v(l.boundingRect, i.boundingRect) && l.rfId === i.rfId && l.panZoom === i.panZoom && l.translateExtent === i.translateExtent && l.flowWidth === i.flowWidth && l.flowHeight === i.flowHeight && l.ariaLabelConfig === i.ariaLabelConfig, fT = "react-flow__minimap-desc";
function g1({
  style: l,
  className: i,
  nodeStrokeColor: c,
  nodeColor: r,
  nodeClassName: s = "",
  nodeBorderRadius: f = 5,
  nodeStrokeWidth: d,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: g,
  bgColor: p,
  maskColor: S,
  maskStrokeColor: y,
  maskStrokeWidth: m,
  position: v = "bottom-right",
  onClick: b,
  onNodeClick: E,
  pannable: z = !1,
  zoomable: w = !1,
  ariaLabel: N,
  inversePan: R,
  zoomStep: _ = 1,
  offsetScale: A = 5
}) {
  const G = $t(), B = k.useRef(null), { boundingRect: H, panZoom: Q, viewBB: Y, rfId: lt, translateExtent: P, flowWidth: it, flowHeight: at, ariaLabelConfig: C } = Bt(rT, sT), j = l?.width ?? uT, O = l?.height ?? oT, U = H.width / j, Z = H.height / O, J = Math.max(U, Z), tt = J * j, ot = J * O, ct = A * J, vt = H.x - (tt - H.width) / 2 - ct, T = H.y - (ot - H.height) / 2 - ct, F = tt + ct * 2, ft = ot + ct * 2, ut = `${fT}-${lt}`, W = k.useRef(0), dt = k.useRef();
  W.current = J, k.useEffect(() => {
    const _t = G.getState().panZoom;
    if (B.current && _t)
      return dt.current = Tw({
        domNode: B.current,
        panZoom: _t,
        getTransform: () => G.getState().transform,
        getViewScale: () => W.current
      }), () => {
        dt.current?.destroy();
      };
  }, [Q]), k.useEffect(() => {
    dt.current?.update({
      translateExtent: P,
      width: it,
      height: at,
      inversePan: R,
      pannable: z,
      zoomStep: _,
      zoomable: w
    });
  }, [z, w, R, _, P, it, at]);
  const gt = b ? (_t) => {
    const [Ct, Tt] = dt.current?.pointer(_t) || [0, 0];
    b(_t, { x: Ct, y: Tt });
  } : void 0, rt = k.useCallback((_t, Ct) => {
    const Tt = G.getState().nodeLookup.get(Ct).internals.userNode;
    E?.(_t, Tt);
  }, [E]), st = E ? rt : void 0, pt = N ?? C["minimap.ariaLabel"];
  return q.jsx(sr, { position: v, style: {
    ...l,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof S == "string" ? S : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof m == "number" ? m * J : void 0,
    "--xy-minimap-node-background-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-color-props": typeof c == "string" ? c : void 0,
    "--xy-minimap-node-stroke-width-props": typeof d == "number" ? d : void 0
  }, className: ue(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: q.jsxs("svg", { width: j, height: O, viewBox: `${vt} ${T} ${F} ${ft}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ut, ref: B, onClick: gt, children: [pt && q.jsx("title", { id: ut, children: pt }), q.jsx(iT, { onClick: st, nodeColor: r, nodeStrokeColor: c, nodeBorderRadius: f, nodeClassName: s, nodeStrokeWidth: d, nodeComponent: g }), q.jsx("path", { className: "react-flow__minimap-mask", d: `M${vt - ct},${T - ct}h${F + ct * 2}v${ft + ct * 2}h${-F - ct * 2}z
        M${Y.x},${Y.y}h${Y.width}v${Y.height}h${-Y.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
g1.displayName = "MiniMap";
const dT = k.memo(g1), hT = (l) => (i) => l ? `${Math.max(1 / i.transform[2], 1)}` : void 0, gT = {
  [_i.Line]: "right",
  [_i.Handle]: "bottom-right"
};
function mT({ nodeId: l, position: i, variant: c = _i.Handle, className: r, style: s = void 0, children: f, color: d, minWidth: g = 10, minHeight: p = 10, maxWidth: S = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: m = !1, resizeDirection: v, autoScale: b = !0, shouldResize: E, onResizeStart: z, onResize: w, onResizeEnd: N }) {
  const R = Zp(), _ = typeof l == "string" ? l : R, A = $t(), G = k.useRef(null), B = c === _i.Handle, H = Bt(k.useCallback(hT(B && b), [B, b]), kt), Q = k.useRef(null), Y = i ?? gT[c];
  k.useEffect(() => {
    if (!(!G.current || !_))
      return Q.current || (Q.current = jw({
        domNode: G.current,
        nodeId: _,
        getStoreItems: () => {
          const { nodeLookup: P, transform: it, snapGrid: at, snapToGrid: C, nodeOrigin: j, domNode: O } = A.getState();
          return {
            nodeLookup: P,
            transform: it,
            snapGrid: at,
            snapToGrid: C,
            nodeOrigin: j,
            paneDomNode: O
          };
        },
        onChange: (P, it) => {
          const { triggerNodeChanges: at, nodeLookup: C, parentLookup: j, nodeOrigin: O } = A.getState(), U = [], Z = { x: P.x, y: P.y }, J = C.get(_);
          if (J && J.expandParent && J.parentId) {
            const tt = J.origin ?? O, ot = P.width ?? J.measured.width ?? 0, ct = P.height ?? J.measured.height ?? 0, vt = {
              id: J.id,
              parentId: J.parentId,
              rect: {
                width: ot,
                height: ct,
                ...fp({
                  x: P.x ?? J.position.x,
                  y: P.y ?? J.position.y
                }, { width: ot, height: ct }, J.parentId, C, tt)
              }
            }, T = kd([vt], C, j, O);
            U.push(...T), Z.x = P.x ? Math.max(tt[0] * ot, P.x) : void 0, Z.y = P.y ? Math.max(tt[1] * ct, P.y) : void 0;
          }
          if (Z.x !== void 0 && Z.y !== void 0) {
            const tt = {
              id: _,
              type: "position",
              position: { ...Z }
            };
            U.push(tt);
          }
          if (P.width !== void 0 && P.height !== void 0) {
            const ot = {
              id: _,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: P.width,
                height: P.height
              }
            };
            U.push(ot);
          }
          for (const tt of it) {
            const ot = {
              ...tt,
              type: "position"
            };
            U.push(ot);
          }
          at(U);
        },
        onEnd: ({ width: P, height: it }) => {
          const at = {
            id: _,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: P,
              height: it
            }
          };
          A.getState().triggerNodeChanges([at]);
        }
      })), Q.current.update({
        controlPosition: Y,
        boundaries: {
          minWidth: g,
          minHeight: p,
          maxWidth: S,
          maxHeight: y
        },
        keepAspectRatio: m,
        resizeDirection: v,
        onResizeStart: z,
        onResize: w,
        onResizeEnd: N,
        shouldResize: E
      }), () => {
        Q.current?.destroy();
      };
  }, [
    Y,
    g,
    p,
    S,
    y,
    m,
    z,
    w,
    N,
    E
  ]);
  const lt = Y.split("-");
  return q.jsx("div", { className: ue(["react-flow__resize-control", "nodrag", ...lt, c, r]), ref: G, style: {
    ...s,
    scale: H,
    ...d && { [B ? "backgroundColor" : "borderColor"]: d }
  }, children: f });
}
k.memo(mT);
const bT = Object.freeze({ version: vd.version, React: vd, ReactDOM: ab, ReactDOMClient: rb, jsxRuntime: tb }), Dd = (l) => ({ id: l.id, type: "default", position: l.position, data: { label: String(l.data?.label || "") } });
function yT({ initialGraph: l, onChange: i }) {
  const [c, r] = k.useState(() => (l?.nodes || []).map(Dd)), [s, f] = k.useState(() => (l?.edges || []).map((w) => ({ ...w, type: "smoothstep" }))), [d, g] = k.useState(null), [p, S] = k.useState("Connect node handles to create a relationship."), y = c.find((w) => w.id === d), m = k.useMemo(() => ({ version: 1, nodes: c.map(Dd), edges: s.map((w) => ({
    id: w.id,
    source: w.source,
    target: w.target,
    type: ["default", "straight", "step", "smoothstep"].includes(w.type) ? w.type : "smoothstep",
    ...typeof w.label == "string" && w.label.length <= 500 ? { label: w.label } : {}
  })) }), [c, s]);
  k.useEffect(() => {
    i?.(m);
  }, [m, i]);
  const v = k.useCallback((w) => {
    f((N) => Yp({ ...w, id: `edge-${crypto.randomUUID()}`, type: "smoothstep" }, N)), S("Connection added.");
  }, []), b = () => {
    if (c.length >= 300) {
      S("A diagram can contain at most 300 nodes.");
      return;
    }
    const w = c.length + 1, N = { id: `node-${crypto.randomUUID().slice(0, 8)}`, type: "default", position: { x: 80 + w % 3 * 220, y: 70 + Math.floor((w - 1) / 3) * 140 }, data: { label: `Step ${w}` } };
    r((R) => [...R, N]), g(N.id), S("Node added. Drag it to position and connect its handles.");
  }, E = () => {
    d && (r((w) => w.filter((N) => N.id !== d)), f((w) => w.filter((N) => N.source !== d && N.target !== d)), g(null), S("Selected node removed."));
  }, z = (w) => r((N) => N.map((R) => R.id === d ? { ...R, data: { ...R.data, label: w.slice(0, 500) } } : R));
  return /* @__PURE__ */ q.jsxs("main", { className: "diagram-studio", children: [
    /* @__PURE__ */ q.jsxs("header", { className: "diagram-studio__toolbar", children: [
      /* @__PURE__ */ q.jsx("strong", { children: "Visual Flow Editor" }),
      /* @__PURE__ */ q.jsx("button", { type: "button", onClick: b, children: "＋ Add node" }),
      /* @__PURE__ */ q.jsx("button", { type: "button", onClick: E, disabled: !d, children: "Delete selected" }),
      /* @__PURE__ */ q.jsx("span", { className: "diagram-studio__spacer" }),
      /* @__PURE__ */ q.jsx("span", { className: "diagram-studio__hint", role: "status", children: p })
    ] }),
    /* @__PURE__ */ q.jsxs("div", { className: "diagram-studio__workspace", children: [
      /* @__PURE__ */ q.jsx("section", { className: "diagram-studio__canvas", "aria-label": "Diagram canvas", children: /* @__PURE__ */ q.jsxs(s1, { nodes: c, edges: s, onNodesChange: (w) => r((N) => {
        let R = N;
        return w.forEach((_) => {
          _.type === "position" && _.position && (R = R.map((A) => A.id === _.id ? { ...A, position: _.position } : A)), _.type === "select" && g(_.selected ? _.id : null), _.type === "remove" && (R = R.filter((A) => A.id !== _.id));
        }), R;
      }), onEdgesChange: (w) => f((N) => w.some((R) => R.type === "remove") ? N.filter((R) => !w.some((_) => _.type === "remove" && _.id === R.id)) : N), onConnect: v, onSelectionChange: ({ nodes: w }) => g(w[0]?.id || null), fitView: !0, deleteKeyCode: null, proOptions: { hideAttribution: !0 }, children: [
        /* @__PURE__ */ q.jsx(d1, { gap: 20, size: 1 }),
        /* @__PURE__ */ q.jsx(W3, {}),
        /* @__PURE__ */ q.jsx(dT, { pannable: !0, zoomable: !0 })
      ] }) }),
      /* @__PURE__ */ q.jsxs("aside", { className: "diagram-studio__inspector", children: [
        /* @__PURE__ */ q.jsx("h2", { children: "Selected node" }),
        y ? /* @__PURE__ */ q.jsxs("label", { children: [
          "Label",
          /* @__PURE__ */ q.jsx("textarea", { maxLength: 500, value: y.data.label, onChange: (w) => z(w.target.value) })
        ] }) : /* @__PURE__ */ q.jsx("p", { children: "Select a node to edit its label." }),
        /* @__PURE__ */ q.jsxs("p", { className: "diagram-studio__counts", children: [
          c.length,
          " nodes · ",
          s.length,
          " connections"
        ] }),
        /* @__PURE__ */ q.jsx("p", { className: "diagram-studio__hint", children: "The reader displays a lightweight, responsive SVG. React Flow is used here only while visually editing." })
      ] })
    ] })
  ] });
}
const Vl = /* @__PURE__ */ new WeakMap();
function ET(l, { initialGraph: i = { version: 1, nodes: [], edges: [] }, onChange: c } = {}) {
  Vl.get(l)?.unmount();
  const r = Rd.createRoot(l);
  return Vl.set(l, r), r.render(/* @__PURE__ */ q.jsx(Wd, { children: /* @__PURE__ */ q.jsx(yT, { initialGraph: i, onChange: c }) })), () => {
    Vl.get(l) === r && (r.unmount(), Vl.delete(l));
  };
}
function vT({ label: l, rich: i }) {
  return /* @__PURE__ */ q.jsxs(q.Fragment, { children: [
    i.iconMarkup ? /* @__PURE__ */ q.jsx("span", { className: "ib-flow-node__icon", "aria-hidden": "true", dangerouslySetInnerHTML: { __html: i.iconMarkup } }) : null,
    /* @__PURE__ */ q.jsxs("span", { className: "ib-flow-node__text", children: [
      /* @__PURE__ */ q.jsx("span", { className: "ib-flow-node__title", children: l }),
      i.subtitle ? /* @__PURE__ */ q.jsx("span", { className: "ib-flow-node__sub", children: i.subtitle }) : null,
      i.status ? /* @__PURE__ */ q.jsx("span", { className: "ib-flow-node__status", "data-tone": i.status.tone, children: i.status.text }) : null,
      i.group ? /* @__PURE__ */ q.jsx("span", { className: "ib-flow-node__group", children: i.group }) : null
    ] })
  ] });
}
function pT({ id: l, data: i }) {
  const c = i.rich;
  return /* @__PURE__ */ q.jsxs(q.Fragment, { children: [
    /* @__PURE__ */ q.jsx(wi, { type: "target", position: xt.Left, isConnectable: !1 }),
    /* @__PURE__ */ q.jsx("button", { type: "button", className: `ib-flow-node__button${c ? " ib-flow-node__button--rich" : ""}`, "data-tone": c?.tone, "aria-pressed": !!i.active, onClick: () => i.onSelect(l), children: c ? /* @__PURE__ */ q.jsx(vT, { label: i.label, rich: c }) : i.label }),
    /* @__PURE__ */ q.jsx(wi, { type: "source", position: xt.Right, isConnectable: !1 })
  ] });
}
const ST = { flow: pT };
function xT({ graph: l, labels: i, onControlsReady: c, onViewportChange: r, onPanModeChange: s, onSelectionChange: f }) {
  const d = fr(), [g, p] = k.useState(!0), S = k.useMemo(() => (l?.nodes || []).map((Y) => {
    const lt = Y.data?.rich ? { ...Y.data.rich } : void 0;
    return { ...Dd(Y), type: "flow", data: { label: String(Y.data?.label || ""), rich: lt } };
  }), [l]), y = k.useMemo(() => (l?.edges || []).map((Y) => ({ ...Y, type: "smoothstep" })), [l]), [m, v] = k.useState(null), b = k.useMemo(() => new Map(S.map((Y) => [Y.id, Y.data.label])), [S]), E = k.useMemo(() => {
    const Y = /* @__PURE__ */ new Map(), lt = /* @__PURE__ */ new Map();
    return y.forEach((P) => {
      Y.set(P.source, [...Y.get(P.source) || [], P.target]), lt.set(P.target, [...lt.get(P.target) || [], P.source]);
    }), { out: Y, inn: lt };
  }, [y]), z = k.useMemo(() => m ? /* @__PURE__ */ new Set([m, ...E.out.get(m) || [], ...E.inn.get(m) || []]) : null, [m, E]), w = k.useCallback((Y) => v((lt) => lt === Y ? null : Y), []);
  k.useEffect(() => {
    f?.(m);
  }, [m, f]);
  const N = k.useCallback((Y) => {
    const lt = d.getNodes();
    if (!lt.length) return d.setViewport({ x: 0, y: 0, zoom: Y }, { duration: 140 });
    const P = d.getNodesBounds(lt);
    return d.setCenter(P.x + P.width / 2, P.y + P.height / 2, { zoom: Y, duration: 140 });
  }, [d]), R = k.useCallback(() => {
    const Y = !g;
    p(Y), s?.(Y);
  }, [g, s]), _ = k.useMemo(() => ({
    zoomIn: () => d.zoomIn({ duration: 140 }),
    zoomOut: () => d.zoomOut({ duration: 140 }),
    resetZoom: () => N(1),
    fitView: () => d.fitView({ padding: 0.12, duration: 160 }),
    center: () => N(d.getZoom()),
    togglePan: R
  }), [d, N, R]);
  k.useEffect(() => (c?.(_), r?.(d.getZoom()), s?.(g), () => c?.(null)), [_, d, c, s, r, g]);
  const A = k.useMemo(() => S.map((Y) => ({
    ...Y,
    draggable: !1,
    connectable: !1,
    selectable: !1,
    focusable: !1,
    data: { label: Y.data.label, rich: Y.data.rich, active: Y.id === m, onSelect: w },
    className: [Y.data.rich ? "is-rich" : "", z ? z.has(Y.id) ? Y.id === m ? "is-selected" : "is-related" : "is-dim" : ""].filter(Boolean).join(" ")
  })), [S, z, m, w]), G = k.useMemo(() => y.map((Y) => {
    const lt = z && Y.source === m || z && Y.target === m;
    return {
      ...Y,
      animated: !!lt,
      markerEnd: { type: Yu.ArrowClosed },
      className: z ? lt ? "is-related" : "is-dim" : "",
      selectable: !1,
      focusable: !1
    };
  }), [y, z, m]), B = (Y) => Y && Y.length ? Y.map((lt) => b.get(lt)).join(", ") : i.none, H = m ? S.find((Y) => Y.id === m)?.data.rich?.details : "", Q = m ? `${b.get(m)}. ${H ? `${H} ` : ""}${i.leadsTo}: ${B(E.out.get(m))}. ${i.comesFrom}: ${B(E.inn.get(m))}.` : i.hint;
  return /* @__PURE__ */ q.jsxs("div", { className: "richviz-flow-viewer", children: [
    /* @__PURE__ */ q.jsxs("div", { className: "richviz-flow-viewer__bar", children: [
      /* @__PURE__ */ q.jsx("p", { className: "richviz-flow-viewer__status", role: "status", "aria-live": "polite", children: Q }),
      /* @__PURE__ */ q.jsx("button", { type: "button", className: "richviz-flow-viewer__reset", onClick: () => v(null), disabled: !m, children: i.reset })
    ] }),
    /* @__PURE__ */ q.jsx("div", { className: "richviz-flow-viewer__canvas", dir: "ltr", children: /* @__PURE__ */ q.jsx(
      s1,
      {
        nodes: A,
        edges: G,
        nodeTypes: ST,
        nodesDraggable: !1,
        nodesConnectable: !1,
        elementsSelectable: !1,
        nodesFocusable: !1,
        edgesFocusable: !1,
        zoomOnScroll: !1,
        preventScrolling: !1,
        zoomOnPinch: !0,
        panOnDrag: g,
        minZoom: 0.25,
        maxZoom: 2,
        onMove: (Y, lt) => r?.(lt.zoom),
        fitView: !0,
        fitViewOptions: { padding: 0.12 },
        deleteKeyCode: null,
        proOptions: { hideAttribution: !0 },
        onPaneClick: () => v(null),
        children: /* @__PURE__ */ q.jsx(d1, { gap: 20, size: 1 })
      }
    ) })
  ] });
}
function _T(l, { graph: i = { version: 1, nodes: [], edges: [] }, labels: c = {}, onControlsReady: r, onViewportChange: s, onPanModeChange: f, onSelectionChange: d } = {}) {
  Vl.get(l)?.unmount();
  const g = Rd.createRoot(l);
  Vl.set(l, g);
  const p = { hint: "Select a node to see what it connects to.", reset: "Clear selection", leadsTo: "Leads to", comesFrom: "Comes from", none: "nothing", ...c };
  return g.render(/* @__PURE__ */ q.jsx(Wd, { children: /* @__PURE__ */ q.jsx(xT, { graph: i, labels: p, onControlsReady: r, onViewportChange: s, onPanModeChange: f, onSelectionChange: d }) })), () => {
    Vl.get(l) === g && (g.unmount(), Vl.delete(l));
  };
}
export {
  ET as mountDiagramEditor,
  _T as mountDiagramViewer,
  bT as sharedReactRuntime
};
