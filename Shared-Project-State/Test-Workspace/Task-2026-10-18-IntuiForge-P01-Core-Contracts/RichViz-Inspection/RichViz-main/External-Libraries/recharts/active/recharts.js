/* Modified by RichViz to consume globalThis.__RICHVIZ_SHARED_REACT__. See ../../../THIRD_PARTY_NOTICES.md; upstream notices follow. */
const Hs = globalThis.__RICHVIZ_SHARED_REACT__;
if (!Hs || !Hs.React) throw new Error("The shared shared React runtime is not available. Load it before the Recharts runtime.");
const Bg = Hs.React, {
  Children: Xo,
  Component: zg,
  Fragment: le,
  Profiler: gO,
  PureComponent: Ai,
  StrictMode: bO,
  Suspense: xO,
  act: wO,
  cache: AO,
  cloneElement: Ae,
  createContext: We,
  createElement: y,
  createRef: PO,
  forwardRef: Pe,
  isValidElement: ie,
  lazy: OO,
  memo: De,
  startTransition: SO,
  use: IO,
  useActionState: kO,
  useCallback: ue,
  useContext: Ze,
  useDebugValue: jO,
  useDeferredValue: TO,
  useEffect: ae,
  useId: EO,
  useImperativeHandle: Yc,
  useInsertionEffect: CO,
  useLayoutEffect: ke,
  useMemo: xe,
  useOptimistic: DO,
  useReducer: MO,
  useRef: H,
  useState: Ne,
  useSyncExternalStore: $O,
  useTransition: _O,
  version: NO
} = Bg, Kg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Children: Xo,
  Component: zg,
  Fragment: le,
  Profiler: gO,
  PureComponent: Ai,
  StrictMode: bO,
  Suspense: xO,
  act: wO,
  cache: AO,
  cloneElement: Ae,
  createContext: We,
  createElement: y,
  createRef: PO,
  default: Bg,
  forwardRef: Pe,
  isValidElement: ie,
  lazy: OO,
  memo: De,
  startTransition: SO,
  use: IO,
  useActionState: kO,
  useCallback: ue,
  useContext: Ze,
  useDebugValue: jO,
  useDeferredValue: TO,
  useEffect: ae,
  useId: EO,
  useImperativeHandle: Yc,
  useInsertionEffect: CO,
  useLayoutEffect: ke,
  useMemo: xe,
  useOptimistic: DO,
  useReducer: MO,
  useRef: H,
  useState: Ne,
  useSyncExternalStore: $O,
  useTransition: _O,
  version: NO
}, Symbol.toStringTag, { value: "Module" }));
function Wg(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = Wg(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function J() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = Wg(e)) && (n && (n += " "), n += t);
  return n;
}
var LO = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function Vc(e) {
  if (typeof e != "string")
    return !1;
  var t = LO;
  return t.includes(e);
}
var RO = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], BO = new Set(RO);
function Fg(e) {
  return typeof e != "string" ? !1 : BO.has(e);
}
function Ug(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function oe(e) {
  if (typeof e != "object" || e === null)
    return {};
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (Fg(r) || Ug(r)) && (t[r] = e[r]);
  return t;
}
function Tt(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ ie(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return oe(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? oe(e) : null;
}
function $e(e) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (Fg(r) || Ug(r) || Vc(r)) && (t[r] = e[r]);
  return t;
}
function zO(e) {
  return e == null ? null : /* @__PURE__ */ ie(e) ? $e(e.props) : typeof e == "object" && !Array.isArray(e) ? $e(e) : null;
}
var KO = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Ys() {
  return Ys = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ys.apply(null, arguments);
}
function WO(e, t) {
  if (e == null) return {};
  var r, n, i = FO(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function FO(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Pi = /* @__PURE__ */ Pe((e, t) => {
  var r = e.children, n = e.width, i = e.height, a = e.viewBox, o = e.className, l = e.style, u = e.title, s = e.desc, c = WO(e, KO), d = a || {
    width: n,
    height: i,
    x: 0,
    y: 0
  }, f = J("recharts-surface", o);
  return /* @__PURE__ */ y("svg", Ys({}, $e(c), {
    className: f,
    width: n,
    height: i,
    style: l,
    viewBox: "".concat(d.x, " ").concat(d.y, " ").concat(d.width, " ").concat(d.height),
    ref: t
  }), /* @__PURE__ */ y("title", null, u), /* @__PURE__ */ y("desc", null, s), r);
}), UO = ["children", "className"];
function Vs() {
  return Vs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vs.apply(null, arguments);
}
function XO(e, t) {
  if (e == null) return {};
  var r, n, i = HO(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function HO(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var X = /* @__PURE__ */ Pe((e, t) => {
  var r = e.children, n = e.className, i = XO(e, UO), a = J("recharts-layer", n);
  return /* @__PURE__ */ y("g", Vs({
    className: a
  }, $e(i), {
    ref: t
  }), r);
});
const Ho = globalThis.__RICHVIZ_SHARED_REACT__;
if (!Ho || !Ho.ReactDOM) throw new Error("The shared shared React runtime is not available. Load it before the Recharts runtime.");
const YO = Ho.ReactDOM, { createPortal: Gc, flushSync: b6, unstable_batchedUpdates: x6, version: w6 } = YO, { createRoot: A6, hydrateRoot: P6 } = Ho.ReactDOMClient;
function ai(e) {
  return e === "__proto__";
}
const VO = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function iu(e) {
  switch (typeof e) {
    case "number":
    case "symbol":
      return !1;
    case "string":
      return e === "" || e.startsWith(".") || e.endsWith(".") ? !1 : VO.test(e);
    default:
      return !1;
  }
}
function La(e) {
  return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
function qc(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
function GO(e) {
  return e == null ? "" : Xg(e);
}
function Xg(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return e.map(Xg).join(",");
  if (qc(e)) return e.toString();
  const t = e + "";
  return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
function au(e) {
  if (Array.isArray(e)) return e.map(La);
  if (typeof e == "symbol") return [e];
  e = GO(e);
  const t = [], r = e.length;
  if (r === 0) return t;
  let n = 0, i = "", a = "", o = !1, l = !1;
  const u = /^-?\d+(?:\.\d+)?$/;
  for (e.charCodeAt(0) === 46 && t.push(""); n < r; ) {
    const s = e[n];
    if (a) s === "\\" && n + 1 < r ? (n++, i += e[n]) : s === a ? a = "" : i += s;
    else if (o) if (s === '"' || s === "'")
      a = s, l = !0;
    else if (s === "]") {
      if (o = !1, !l && i.includes(".") && !u.test(i)) {
        const c = i.split(".");
        for (let d = 0; d < c.length; d++) c[d] !== "" && t.push(c[d]);
      } else t.push(i);
      i = "";
    } else i += s;
    else if (s === "[")
      o = !0, l = !1, i && (t.push(i), i = "");
    else if (s === ".") {
      i && (t.push(i), i = "");
      const c = e[n + 1];
      (c === void 0 || c === ".") && t.push("");
    } else i += s;
    n++;
  }
  return i && t.push(i), t;
}
function yt(e, t, r) {
  if (e == null) return r;
  switch (typeof t) {
    case "string": {
      if (ai(t)) return r;
      const n = e[t];
      return n === void 0 ? iu(t) && !Object.hasOwn(e, t) ? yt(e, au(t), r) : r : n;
    }
    case "number":
    case "symbol": {
      typeof t == "number" && (t = La(t));
      const n = e[t];
      return n === void 0 ? r : n;
    }
    default: {
      if (Array.isArray(t)) return qO(e, t, r);
      if (Object.is(t?.valueOf(), -0) ? t = "-0" : t = String(t), ai(t)) return r;
      const n = e[t];
      return n === void 0 ? r : n;
    }
  }
}
function qO(e, t, r) {
  if (t.length === 0) return r;
  let n = e;
  for (let i = 0; i < t.length; i++) {
    if (n == null || ai(t[i])) return r;
    n = n[t[i]];
  }
  return n === void 0 ? r : n;
}
var ZO = 4;
function kr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ZO, r = 10 ** t, n = Math.round(e * r) / r;
  return Object.is(n, -0) ? 0 : n;
}
function Le(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return e.reduce((i, a, o) => {
    var l = r[o - 1];
    return typeof l == "string" ? i + l + a : l !== void 0 ? i + kr(l) + a : i + a;
  }, "");
}
var Ue = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, Et = (e) => typeof e == "number" && e != +e, Pn = (e) => typeof e == "string" && e.length > 1 && e.indexOf("%") === e.length - 1, L = (e) => (typeof e == "number" || e instanceof Number) && !Et(e), tt = (e) => L(e) || typeof e == "string", JO = 0, oi = (e) => {
  var t = ++JO;
  return "".concat(e || "").concat(t);
}, lt = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!L(t) && typeof t != "string")
    return n;
  var a;
  if (Pn(t)) {
    if (r == null)
      return n;
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return Et(a) && (a = n), i && r != null && a > r && (a = r), a;
}, Hg = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[String(e[n])])
      r[String(e[n])] = !0;
    else
      return !0;
  return !1;
};
function V(e, t, r) {
  return L(e) && L(t) ? kr(e + r * (t - e)) : t;
}
function Yg(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : yt(n, t)) === r);
}
var QO = (e) => {
  for (var t = e.length, r = 0, n = 0, i = 0, a = 0, o = 1 / 0, l = -1 / 0, u = 0, s = 0, c = 0; c < t; c++) {
    var d, f;
    u = ((d = e[c]) === null || d === void 0 ? void 0 : d.cx) || 0, s = ((f = e[c]) === null || f === void 0 ? void 0 : f.cy) || 0, r += u, n += s, i += u * s, a += u * u, o = Math.min(o, u), l = Math.max(l, u);
  }
  var v = t * a !== r * r ? (t * i - r * n) / (t * a - r * r) : 0;
  return {
    xmin: o,
    xmax: l,
    a: v,
    b: (n - v * r) / t
  };
}, he = (e) => e === null || typeof e > "u", Ra = (e) => he(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function rt(e) {
  return e != null;
}
function mt() {
}
function Zc(e) {
  if (e)
    return {
      x: e.x,
      y: e.y,
      upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
      lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
      width: e.width,
      height: e.height
    };
}
function mv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ur(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mv(Object(r), !0).forEach(function(n) {
      eS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eS(e, t, r) {
  return (t = tS(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tS(e) {
  var t = rS(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rS(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Vg = (e) => {
  var t = e.viewBox, r = e.position, n = e.offset, i = n === void 0 ? 0 : n, a = e.parentViewBox, o = e.clamp, l = Zc(t), u = l.x, s = l.y, c = l.height, d = l.upperWidth, f = l.lowerWidth, v = u, h = u + (d - f) / 2, p = (v + h) / 2, m = (d + f) / 2, g = v + d / 2, w = c >= 0 ? 1 : -1, x = w * i, A = w > 0 ? "end" : "start", P = w > 0 ? "start" : "end", b = d >= 0 ? 1 : -1, O = b * i, I = b > 0 ? "end" : "start", E = b > 0 ? "start" : "end", j = a;
  if (r === "top") {
    var T = {
      x: v + d / 2,
      y: s - x,
      horizontalAnchor: "middle",
      verticalAnchor: A
    };
    return o && j && (T.height = Math.max(s - j.y, 0), T.width = d), T;
  }
  if (r === "bottom") {
    var k = {
      x: h + f / 2,
      y: s + c + x,
      horizontalAnchor: "middle",
      verticalAnchor: P
    };
    return o && j && (k.height = Math.max(j.y + j.height - (s + c), 0), k.width = f), k;
  }
  if (r === "left") {
    var _ = {
      x: p - O,
      y: s + c / 2,
      horizontalAnchor: I,
      verticalAnchor: "middle"
    };
    return o && j && (_.width = Math.max(_.x - j.x, 0), _.height = c), _;
  }
  if (r === "right") {
    var $ = {
      x: p + m + O,
      y: s + c / 2,
      horizontalAnchor: E,
      verticalAnchor: "middle"
    };
    return o && j && ($.width = Math.max(j.x + j.width - $.x, 0), $.height = c), $;
  }
  var M = o && j ? {
    width: m,
    height: c
  } : {};
  return r === "insideLeft" ? ur({
    x: p + O,
    y: s + c / 2,
    horizontalAnchor: E,
    verticalAnchor: "middle"
  }, M) : r === "insideRight" ? ur({
    x: p + m - O,
    y: s + c / 2,
    horizontalAnchor: I,
    verticalAnchor: "middle"
  }, M) : r === "insideTop" ? ur({
    x: v + d / 2,
    y: s + x,
    horizontalAnchor: "middle",
    verticalAnchor: P
  }, M) : r === "insideBottom" ? ur({
    x: h + f / 2,
    y: s + c - x,
    horizontalAnchor: "middle",
    verticalAnchor: A
  }, M) : r === "insideTopLeft" ? ur({
    x: v + O,
    y: s + x,
    horizontalAnchor: E,
    verticalAnchor: P
  }, M) : r === "insideTopRight" ? ur({
    x: v + d - O,
    y: s + x,
    horizontalAnchor: I,
    verticalAnchor: P
  }, M) : r === "insideBottomLeft" ? ur({
    x: h + O,
    y: s + c - x,
    horizontalAnchor: E,
    verticalAnchor: A
  }, M) : r === "insideBottomRight" ? ur({
    x: h + f - O,
    y: s + c - x,
    horizontalAnchor: I,
    verticalAnchor: A
  }, M) : r && typeof r == "object" && (L(r.x) || Pn(r.x)) && (L(r.y) || Pn(r.y)) ? ur({
    x: u + lt(r.x, m),
    y: s + lt(r.y, c),
    horizontalAnchor: "end",
    verticalAnchor: "end"
  }, M) : ur({
    x: g,
    y: s + c / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, M);
}, nS = ["top", "left", "right", "bottom"];
function Jc(e) {
  return e == null ? !1 : typeof e == "object" ? !0 : nS.includes(e);
}
var Gg = /* @__PURE__ */ We(null), iS = () => Ze(Gg);
function Ie(e) {
  return function() {
    return e;
  };
}
const qg = Math.cos, Yo = Math.sin, nr = Math.sqrt, Vo = Math.PI, ou = 2 * Vo, Gs = Math.PI, qs = 2 * Gs, cn = 1e-6, aS = qs - cn;
function Zg(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function oS(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Zg;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class lS {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Zg : oS(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(t, r, n, i, a, o) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1 = +a},${this._y1 = +o}`;
  }
  arcTo(t, r, n, i, a) {
    if (t = +t, r = +r, n = +n, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1, l = this._y1, u = n - t, s = i - r, c = o - t, d = l - r, f = c * c + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (f > cn) if (!(Math.abs(d * u - s * c) > cn) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let v = n - o, h = i - l, p = u * u + s * s, m = v * v + h * h, g = Math.sqrt(p), w = Math.sqrt(f), x = a * Math.tan((Gs - Math.acos((p + f - m) / (2 * g * w))) / 2), A = x / w, P = x / g;
      Math.abs(A - 1) > cn && this._append`L${t + A * c},${r + A * d}`, this._append`A${a},${a},0,0,${+(d * v > c * h)},${this._x1 = t + P * u},${this._y1 = r + P * s}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let l = n * Math.cos(i), u = n * Math.sin(i), s = t + l, c = r + u, d = 1 ^ o, f = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${c}` : (Math.abs(this._x1 - s) > cn || Math.abs(this._y1 - c) > cn) && this._append`L${s},${c}`, n && (f < 0 && (f = f % qs + qs), f > aS ? this._append`A${n},${n},0,1,${d},${t - l},${r - u}A${n},${n},0,1,${d},${this._x1 = s},${this._y1 = c}` : f > cn && this._append`A${n},${n},0,${+(f >= Gs)},${d},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Qc(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new lS(t);
}
function ed(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Jg(e) {
  this._context = e;
}
Jg.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function lu(e) {
  return new Jg(e);
}
function Qg(e) {
  return e[0];
}
function eb(e) {
  return e[1];
}
function tb(e, t) {
  var r = Ie(!0), n = null, i = lu, a = null, o = Qc(l);
  e = typeof e == "function" ? e : e === void 0 ? Qg : Ie(e), t = typeof t == "function" ? t : t === void 0 ? eb : Ie(t);
  function l(u) {
    var s, c = (u = ed(u)).length, d, f = !1, v;
    for (n == null && (a = i(v = o())), s = 0; s <= c; ++s)
      !(s < c && r(d = u[s], s, u)) === f && ((f = !f) ? a.lineStart() : a.lineEnd()), f && a.point(+e(d, s, u), +t(d, s, u));
    if (v) return a = null, v + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Ie(+u), l) : e;
  }, l.y = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Ie(+u), l) : t;
  }, l.defined = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : Ie(!!u), l) : r;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, n != null && (a = i(n)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? n = a = null : a = i(n = u), l) : n;
  }, l;
}
function mo(e, t, r) {
  var n = null, i = Ie(!0), a = null, o = lu, l = null, u = Qc(s);
  e = typeof e == "function" ? e : e === void 0 ? Qg : Ie(+e), t = typeof t == "function" ? t : Ie(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? eb : Ie(+r);
  function s(d) {
    var f, v, h, p = (d = ed(d)).length, m, g = !1, w, x = new Array(p), A = new Array(p);
    for (a == null && (l = o(w = u())), f = 0; f <= p; ++f) {
      if (!(f < p && i(m = d[f], f, d)) === g)
        if (g = !g)
          v = f, l.areaStart(), l.lineStart();
        else {
          for (l.lineEnd(), l.lineStart(), h = f - 1; h >= v; --h)
            l.point(x[h], A[h]);
          l.lineEnd(), l.areaEnd();
        }
      g && (x[f] = +e(m, f, d), A[f] = +t(m, f, d), l.point(n ? +n(m, f, d) : x[f], r ? +r(m, f, d) : A[f]));
    }
    if (w) return l = null, w + "" || null;
  }
  function c() {
    return tb().defined(i).curve(o).context(a);
  }
  return s.x = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Ie(+d), n = null, s) : e;
  }, s.x0 = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Ie(+d), s) : e;
  }, s.x1 = function(d) {
    return arguments.length ? (n = d == null ? null : typeof d == "function" ? d : Ie(+d), s) : n;
  }, s.y = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Ie(+d), r = null, s) : t;
  }, s.y0 = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Ie(+d), s) : t;
  }, s.y1 = function(d) {
    return arguments.length ? (r = d == null ? null : typeof d == "function" ? d : Ie(+d), s) : r;
  }, s.lineX0 = s.lineY0 = function() {
    return c().x(e).y(t);
  }, s.lineY1 = function() {
    return c().x(e).y(r);
  }, s.lineX1 = function() {
    return c().x(n).y(t);
  }, s.defined = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : Ie(!!d), s) : i;
  }, s.curve = function(d) {
    return arguments.length ? (o = d, a != null && (l = o(a)), s) : o;
  }, s.context = function(d) {
    return arguments.length ? (d == null ? a = l = null : l = o(a = d), s) : a;
  }, s;
}
class rb {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function uS(e) {
  return new rb(e, !0);
}
function sS(e) {
  return new rb(e, !1);
}
const td = {
  draw(e, t) {
    const r = nr(t / Vo);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, ou);
  }
}, cS = {
  draw(e, t) {
    const r = nr(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, nb = nr(1 / 3), dS = nb * 2, fS = {
  draw(e, t) {
    const r = nr(t / dS), n = r * nb;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, vS = {
  draw(e, t) {
    const r = nr(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, hS = 0.8908130915292852, ib = Yo(Vo / 10) / Yo(7 * Vo / 10), pS = Yo(ou / 10) * ib, yS = -qg(ou / 10) * ib, mS = {
  draw(e, t) {
    const r = nr(t * hS), n = pS * r, i = yS * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = ou * a / 5, l = qg(o), u = Yo(o);
      e.lineTo(u * r, -l * r), e.lineTo(l * n - u * i, u * n + l * i);
    }
    e.closePath();
  }
}, fs = nr(3), gS = {
  draw(e, t) {
    const r = -nr(t / (fs * 3));
    e.moveTo(0, r * 2), e.lineTo(-fs * r, -r), e.lineTo(fs * r, -r), e.closePath();
  }
}, _t = -0.5, Nt = nr(3) / 2, Zs = 1 / nr(12), bS = (Zs / 2 + 1) * 3, xS = {
  draw(e, t) {
    const r = nr(t / bS), n = r / 2, i = r * Zs, a = n, o = r * Zs + r, l = -a, u = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(l, u), e.lineTo(_t * n - Nt * i, Nt * n + _t * i), e.lineTo(_t * a - Nt * o, Nt * a + _t * o), e.lineTo(_t * l - Nt * u, Nt * l + _t * u), e.lineTo(_t * n + Nt * i, _t * i - Nt * n), e.lineTo(_t * a + Nt * o, _t * o - Nt * a), e.lineTo(_t * l + Nt * u, _t * u - Nt * l), e.closePath();
  }
};
function wS(e, t) {
  let r = null, n = Qc(i);
  e = typeof e == "function" ? e : Ie(e || td), t = typeof t == "function" ? t : Ie(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Ie(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Ie(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function Go() {
}
function qo(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function ab(e) {
  this._context = e;
}
ab.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        qo(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        qo(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function AS(e) {
  return new ab(e);
}
function ob(e) {
  this._context = e;
}
ob.prototype = {
  areaStart: Go,
  areaEnd: Go,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        qo(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function PS(e) {
  return new ob(e);
}
function lb(e) {
  this._context = e;
}
lb.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        qo(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function OS(e) {
  return new lb(e);
}
function ub(e) {
  this._context = e;
}
ub.prototype = {
  areaStart: Go,
  areaEnd: Go,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function SS(e) {
  return new ub(e);
}
function gv(e) {
  return e < 0 ? -1 : 1;
}
function bv(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), l = (a * i + o * n) / (n + i);
  return (gv(a) + gv(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(l)) || 0;
}
function xv(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function vs(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, l = (a - n) / 3;
  e._context.bezierCurveTo(n + l, i + l * t, a - l, o - l * r, a, o);
}
function Zo(e) {
  this._context = e;
}
Zo.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        vs(this, this._t0, xv(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, vs(this, xv(this, r = bv(this, e, t)), r);
          break;
        default:
          vs(this, this._t0, r = bv(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function sb(e) {
  this._context = new cb(e);
}
(sb.prototype = Object.create(Zo.prototype)).point = function(e, t) {
  Zo.prototype.point.call(this, t, e);
};
function cb(e) {
  this._context = e;
}
cb.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, i, a) {
    this._context.bezierCurveTo(t, e, n, r, a, i);
  }
};
function IS(e) {
  return new Zo(e);
}
function kS(e) {
  return new sb(e);
}
function db(e) {
  this._context = e;
}
db.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = wv(e), i = wv(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function wv(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function jS(e) {
  return new db(e);
}
function uu(e, t) {
  this._context = e, this._t = t;
}
uu.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function TS(e) {
  return new uu(e, 0.5);
}
function ES(e) {
  return new uu(e, 0);
}
function CS(e) {
  return new uu(e, 1);
}
function On(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, l = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < l; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function Js(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function DS(e, t) {
  return e[t];
}
function MS(e) {
  const t = [];
  return t.key = e, t;
}
function $S() {
  var e = Ie([]), t = Js, r = On, n = DS;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), MS), l, u = o.length, s = -1, c;
    for (const d of a)
      for (l = 0, ++s; l < u; ++l)
        (o[l][s] = [0, +n(d, o[l].key, s, a)]).data = d;
    for (l = 0, c = ed(t(o)); l < u; ++l)
      o[c[l]].index = l;
    return r(o, c), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Ie(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Ie(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? Js : typeof a == "function" ? a : Ie(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? On, i) : r;
  }, i;
}
function _S(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    On(e, t);
  }
}
function NS(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, l = 0; o < i; ++o) l += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -l / 2;
    }
    On(e, t);
  }
}
function LS(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var l = 0, u = 0, s = 0; l < o; ++l) {
        for (var c = e[t[l]], d = c[n][1] || 0, f = c[n - 1][1] || 0, v = (d - f) / 2, h = 0; h < l; ++h) {
          var p = e[t[h]], m = p[n][1] || 0, g = p[n - 1][1] || 0;
          v += m - g;
        }
        u += d, s += v * d;
      }
      i[n - 1][1] += i[n - 1][0] = r, u && (r -= s / u);
    }
    i[n - 1][1] += i[n - 1][0] = r, On(e, t);
  }
}
var RS = ["type", "size", "sizeType"];
function Qs() {
  return Qs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qs.apply(null, arguments);
}
function Av(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Av(Object(r), !0).forEach(function(n) {
      BS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Av(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function BS(e, t, r) {
  return (t = zS(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zS(e) {
  var t = KS(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function KS(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function WS(e, t) {
  if (e == null) return {};
  var r, n, i = FS(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function FS(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var fb = {
  symbolCircle: td,
  symbolCross: cS,
  symbolDiamond: fS,
  symbolSquare: vS,
  symbolStar: mS,
  symbolTriangle: gS,
  symbolWye: xS
}, US = Math.PI / 180, XS = (e) => {
  var t = "symbol".concat(Ra(e));
  return fb[t] || td;
}, HS = (e, t, r) => {
  if (t === "area")
    return e;
  switch (r) {
    case "cross":
      return 5 * e * e / 9;
    case "diamond":
      return 0.5 * e * e / Math.sqrt(3);
    case "square":
      return e * e;
    case "star": {
      var n = 18 * US;
      return 1.25 * e * e * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, YS = (e, t) => {
  fb["symbol".concat(Ra(e))] = t;
}, su = (e) => {
  var t = e.type, r = t === void 0 ? "circle" : t, n = e.size, i = n === void 0 ? 64 : n, a = e.sizeType, o = a === void 0 ? "area" : a, l = WS(e, RS), u = Pv(Pv({}, l), {}, {
    type: r,
    size: i,
    sizeType: o
  }), s = "circle";
  typeof r == "string" && (s = r);
  var c = () => {
    var p = XS(s), m = wS().type(p).size(HS(i, o, s)), g = m();
    if (g !== null)
      return g;
  }, d = u.className, f = u.cx, v = u.cy, h = $e(u);
  return L(f) && L(v) && L(i) ? /* @__PURE__ */ y("path", Qs({}, h, {
    className: J("recharts-symbols", d),
    transform: "translate(".concat(f, ", ").concat(v, ")"),
    d: c()
  })) : null;
};
su.registerSymbol = YS;
var vb = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, rd = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ ie(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    Vc(i) && typeof r[i] == "function" && (n[i] = ((a) => r[i](r, a)));
  }), n;
}, VS = (e, t, r) => (n) => (e(t, r, n), null), ir = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((i) => {
    var a = e[i];
    Vc(i) && typeof a == "function" && (n || (n = {}), n[i] = VS(a, t, r));
  }), n;
}, GS = (e) => Array.isArray(e) && e.length > 0;
function Ov(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ov(Object(r), !0).forEach(function(n) {
      ZS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ov(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZS(e, t, r) {
  return (t = JS(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function JS(e) {
  var t = QS(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function QS(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function re(e, t) {
  var r = qS({}, e), n = t, i = Object.keys(t), a = i.reduce((o, l) => (o[l] === void 0 && n[l] !== void 0 && (o[l] = n[l]), o), r);
  return a;
}
function Jo() {
  return Jo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jo.apply(null, arguments);
}
function Sv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function hb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sv(Object(r), !0).forEach(function(n) {
      eI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eI(e, t, r) {
  return (t = tI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tI(e) {
  var t = rI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rt = 32, nI = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function iI(e) {
  if (typeof e == "object" && e !== null && "strokeDasharray" in e)
    return String(e.strokeDasharray);
}
function aI(e) {
  var t = e.data, r = e.iconType, n = e.inactiveColor, i = Rt / 2, a = Rt / 6, o = Rt / 3, l = t.inactive ? n : t.color, u = r ?? t.type;
  if (u === "none")
    return null;
  if (u === "plainline")
    return /* @__PURE__ */ y("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      strokeDasharray: iI(t.payload),
      x1: 0,
      y1: i,
      x2: Rt,
      y2: i,
      className: "recharts-legend-icon"
    });
  if (u === "line")
    return /* @__PURE__ */ y("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      d: "M0,".concat(i, "h").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(Rt, "M").concat(2 * o, ",").concat(i, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(o, ",").concat(i),
      className: "recharts-legend-icon"
    });
  if (u === "rect")
    return /* @__PURE__ */ y("path", {
      stroke: "none",
      fill: l,
      d: "M0,".concat(Rt / 8, "h").concat(Rt, "v").concat(Rt * 3 / 4, "h").concat(-Rt, "z"),
      className: "recharts-legend-icon"
    });
  if (/* @__PURE__ */ ie(t.legendIcon)) {
    var s = hb({}, t);
    return delete s.legendIcon, /* @__PURE__ */ Ae(t.legendIcon, s);
  }
  return /* @__PURE__ */ y(su, {
    fill: l,
    cx: i,
    cy: i,
    size: Rt,
    sizeType: "diameter",
    type: u
  });
}
function oI(e) {
  var t = e.payload, r = e.iconSize, n = e.layout, i = e.formatter, a = e.inactiveColor, o = e.iconType, l = e.labelStyle, u = {
    x: 0,
    y: 0,
    width: Rt,
    height: Rt
  }, s = {
    display: n === "horizontal" ? "inline-block" : "block",
    marginRight: 10,
    whiteSpace: "nowrap"
  }, c = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return t.map((d, f) => {
    var v, h, p = d.formatter || i, m = J({
      "recharts-legend-item": !0,
      ["legend-item-".concat(f)]: !0,
      inactive: d.inactive
    });
    if (d.type === "none")
      return null;
    var g = typeof l == "object" ? hb({}, l) : {};
    g.color = d.inactive ? a : g.color || d.color, (v = g.whiteSpace) !== null && v !== void 0 || (g.whiteSpace = "normal"), (h = g.overflowWrap) !== null && h !== void 0 || (g.overflowWrap = "break-word");
    var w = p ? p(d.value, d, f) : d.value;
    return /* @__PURE__ */ y("li", Jo({
      className: m,
      style: s,
      key: "legend-item-".concat(f)
    }, ir(e, d, f)), /* @__PURE__ */ y(Pi, {
      width: r,
      height: r,
      viewBox: u,
      style: c,
      "aria-label": d.value == null ? "legend icon" : "".concat(d.value, " legend icon")
    }, /* @__PURE__ */ y(aI, {
      data: d,
      iconType: o,
      inactiveColor: a
    })), /* @__PURE__ */ y("span", {
      className: "recharts-legend-item-text",
      style: g
    }, w));
  });
}
var lI = (e) => {
  var t = re(e, nI), r = t.payload, n = t.layout, i = t.align;
  if (!r || !r.length)
    return null;
  var a = {
    padding: 0,
    margin: 0,
    textAlign: n === "horizontal" ? i : "left"
  };
  return /* @__PURE__ */ y("ul", {
    className: "recharts-default-legend",
    style: a
  }, /* @__PURE__ */ y(oI, Jo({}, t, {
    payload: r
  })));
};
function uI(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (let n = 0; n < e.length; n++) {
    const i = e[n], a = t(i, n, e);
    r.has(a) || r.set(a, i);
  }
  return Array.from(r.values());
}
function sI(e, t) {
  return function(...r) {
    return e.apply(this, r.slice(0, t));
  };
}
function cu(e) {
  return e;
}
function cI(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function Oi(e) {
  return e != null && typeof e != "function" && cI(e.length);
}
function dI(e) {
  return function(t) {
    return yt(t, e);
  };
}
function pb(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function yb(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Qo(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function li(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const mb = "[object RegExp]", nd = "[object String]", id = "[object Number]", ad = "[object Boolean]", gb = "[object Arguments]", bb = "[object Symbol]", xb = "[object Date]", wb = "[object Map]", Ab = "[object Set]", Pb = "[object Array]", fI = "[object Function]", Ob = "[object ArrayBuffer]", No = "[object Object]", vI = "[object Error]", Sb = "[object DataView]", Ib = "[object Uint8Array]", kb = "[object Uint8ClampedArray]", jb = "[object Uint16Array]", Tb = "[object Uint32Array]", hI = "[object BigUint64Array]", Eb = "[object Int8Array]", Cb = "[object Int16Array]", Db = "[object Int32Array]", pI = "[object BigInt64Array]", Mb = "[object Float32Array]", $b = "[object Float64Array]", Iv = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function el(e) {
  return typeof Iv.Buffer < "u" && Iv.Buffer.isBuffer(e);
}
function yI(e, t) {
  return hn(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function hn(e, t, r, n = /* @__PURE__ */ new Map(), i = void 0) {
  const a = i?.(e, t, r, n);
  if (a !== void 0) return a;
  if (pb(e)) return e;
  if (n.has(e)) return n.get(e);
  if (Array.isArray(e)) {
    const o = new Array(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = hn(e[l], l, r, n, i);
    return Object.hasOwn(e, "index") && (o.index = e.index), Object.hasOwn(e, "input") && (o.input = e.input), o;
  }
  if (e instanceof Date) return new Date(e.getTime());
  if (e instanceof RegExp) {
    const o = new RegExp(e.source, e.flags);
    return o.lastIndex = e.lastIndex, o;
  }
  if (e instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    n.set(e, o);
    for (const [l, u] of e) o.set(l, hn(u, l, r, n, i));
    return o;
  }
  if (e instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    n.set(e, o);
    for (const l of e) o.add(hn(l, void 0, r, n, i));
    return o;
  }
  if (el(e)) return e.subarray();
  if (yb(e)) {
    const o = new (Object.getPrototypeOf(e)).constructor(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = hn(e[l], l, r, n, i);
    return o;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  if (e instanceof DataView) {
    const o = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (typeof File < "u" && e instanceof File) {
    const o = new File([e], e.name, { type: e.type });
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const o = new Blob([e], { type: e.type });
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (e instanceof Error) {
    const o = structuredClone(e);
    return n.set(e, o), o.message = e.message, o.name = e.name, o.stack = e.stack, o.cause = e.cause, o.constructor = e.constructor, qt(o, e, r, n, i), o;
  }
  if (e instanceof Boolean) {
    const o = new Boolean(e.valueOf());
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (e instanceof Number) {
    const o = new Number(e.valueOf());
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (e instanceof String) {
    const o = new String(e.valueOf());
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (typeof e == "object" && mI(e)) {
    const o = Object.create(Object.getPrototypeOf(e));
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  return e;
}
function qt(e, t, r = e, n, i) {
  const a = [...Object.keys(t), ...Qo(t)];
  for (let o = 0; o < a.length; o++) {
    const l = a[o], u = Object.getOwnPropertyDescriptor(e, l);
    (u == null || u.writable) && (e[l] = hn(t[l], l, r, n, i));
  }
}
function mI(e) {
  switch (li(e)) {
    case gb:
    case Pb:
    case Ob:
    case Sb:
    case ad:
    case xb:
    case Mb:
    case $b:
    case Eb:
    case Cb:
    case Db:
    case wb:
    case id:
    case No:
    case mb:
    case Ab:
    case nd:
    case bb:
    case Ib:
    case kb:
    case jb:
    case Tb:
      return !0;
    default:
      return !1;
  }
}
function gI(e) {
  return hn(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
function va(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function _b(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function Nb(e, t, r) {
  return typeof r != "function" ? Nb(e, t, () => {
  }) : ec(e, t, function n(i, a, o, l, u, s) {
    const c = r(i, a, o, l, u, s);
    return c !== void 0 ? !!c : ec(i, a, n, s, !1);
  }, /* @__PURE__ */ new Map(), !0);
}
function ec(e, t, r, n, i = !1) {
  if (t === e) return !0;
  switch (typeof t) {
    case "object":
      return bI(e, t, r, n, i);
    case "function":
      return Object.keys(t).length > 0 ? ec(e, { ...t }, r, n, i) : va(e, t);
    default:
      return _b(e) && i ? typeof t == "string" ? t === "" : !0 : va(e, t);
  }
}
function bI(e, t, r, n, i = !1) {
  if (t == null) return !0;
  if (Array.isArray(t)) return Lb(e, t, r, n);
  if (t instanceof Map) return xI(e, t, r, n);
  if (t instanceof Set) return wI(e, t, r, n);
  const a = Object.keys(t);
  if (e == null) return i && a.length === 0;
  if (i)
    pb(e) && (e = Object(e));
  else {
    const o = li(e);
    if (o !== "[object Object]" && o !== "[object Arguments]") return !1;
  }
  if (a.length === 0) return !0;
  if (n?.has(t)) return n.get(t) === e;
  n?.set(t, e);
  try {
    for (let o = 0; o < a.length; o++) {
      const l = a[o];
      if (!(l in e) || t[l] === void 0 && e[l] !== void 0 || t[l] === null && e[l] !== null || !r(e[l], t[l], l, e, t, n)) return !1;
    }
    return !0;
  } finally {
    n?.delete(t);
  }
}
function xI(e, t, r, n) {
  if (t.size === 0) return !0;
  if (!(e instanceof Map)) return !1;
  for (const [i, a] of t.entries()) if (r(e.get(i), a, i, e, t, n) === !1) return !1;
  return !0;
}
function Lb(e, t, r, n) {
  if (t.length === 0) return !0;
  if (!Array.isArray(e)) return !1;
  const i = /* @__PURE__ */ new Set();
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    let l = !1;
    for (let u = 0; u < e.length; u++) {
      if (i.has(u)) continue;
      const s = e[u];
      let c = !1;
      if (r(s, o, a, e, t, n) && (c = !0), c) {
        i.add(u), l = !0;
        break;
      }
    }
    if (!l) return !1;
  }
  return !0;
}
function wI(e, t, r, n) {
  return t.size === 0 ? !0 : e instanceof Set ? Lb([...e], [...t], r, n) : !1;
}
function Rb(e, t) {
  return Nb(e, t, () => {
  });
}
function AI(e) {
  return e = gI(e), (t) => Rb(t, e);
}
function Bb(e, t) {
  return yI(e, (r, n, i, a) => {
    const o = t?.(r, n, i, a);
    if (o !== void 0) return o;
    if (typeof e == "object") {
      if (li(e) === "[object Object]" && typeof e.constructor != "function") {
        const l = {};
        return a.set(e, l), qt(l, e, i, a), l;
      }
      switch (Object.prototype.toString.call(e)) {
        case id:
        case nd:
        case ad: {
          const l = new e.constructor(e?.valueOf());
          return qt(l, e), l;
        }
        case gb: {
          const l = {};
          return qt(l, e), l.length = e.length, l[Symbol.iterator] = e[Symbol.iterator], l;
        }
        default:
          return;
      }
    }
  });
}
function PI(e) {
  return Bb(e);
}
const OI = /^(?:0|[1-9]\d*)$/;
function zb(e, t = Number.MAX_SAFE_INTEGER) {
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) && e >= 0 && e < t;
    case "symbol":
      return !1;
    case "string":
      return OI.test(e);
  }
}
function Kb(e) {
  return e !== null && typeof e == "object" && li(e) === "[object Arguments]";
}
function SI(e, t) {
  let r;
  if (Array.isArray(t) ? r = t : typeof t == "string" && iu(t) && !(t in Object(e)) ? r = au(t) : r = [t], r.length === 0) return !1;
  let n = e;
  for (let i = 0; i < r.length; i++) {
    const a = La(r[i]);
    if ((n == null || !Object.hasOwn(n, a)) && !((Array.isArray(n) || Kb(n)) && zb(a) && Number(a) < n.length))
      return !1;
    n = n[a];
  }
  return !0;
}
function II(e, t) {
  switch (typeof e) {
    case "object":
      Object.is(e?.valueOf(), -0) && (e = "-0");
      break;
    case "number":
      e = La(e);
      break;
  }
  return t = PI(t), function(r) {
    const n = yt(r, e);
    return n === void 0 ? SI(r, e) : t === void 0 ? n === void 0 : Rb(n, t);
  };
}
function du(e) {
  if (e == null) return cu;
  switch (typeof e) {
    case "function":
      return e;
    case "object":
      return Array.isArray(e) && e.length === 2 ? II(e[0], e[1]) : AI(e);
    default:
      return dI(e);
  }
}
function kI(e) {
  return e === 0 ? 0 : e;
}
function kv(e, t = cu) {
  return Oi(e) ? uI(Array.from(e), sI(du(t), 1)).map(kI) : [];
}
function Wb(e, t, r) {
  return t === !0 ? kv(e, r) : typeof t == "function" ? kv(e, t) : e;
}
function jI(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function TI(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      var i = !1;
      try {
        i = this instanceof n;
      } catch {
      }
      return i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var hs = { exports: {} }, ps = {};
const od = /* @__PURE__ */ TI(Kg);
var ys = { exports: {} }, ms = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jv;
function EI() {
  if (jv) return ms;
  jv = 1;
  var e = od;
  function t(d, f) {
    return d === f && (d !== 0 || 1 / d === 1 / f) || d !== d && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, i = e.useEffect, a = e.useLayoutEffect, o = e.useDebugValue;
  function l(d, f) {
    var v = f(), h = n({ inst: { value: v, getSnapshot: f } }), p = h[0].inst, m = h[1];
    return a(
      function() {
        p.value = v, p.getSnapshot = f, u(p) && m({ inst: p });
      },
      [d, v, f]
    ), i(
      function() {
        return u(p) && m({ inst: p }), d(function() {
          u(p) && m({ inst: p });
        });
      },
      [d]
    ), o(v), v;
  }
  function u(d) {
    var f = d.getSnapshot;
    d = d.value;
    try {
      var v = f();
      return !r(d, v);
    } catch {
      return !0;
    }
  }
  function s(d, f) {
    return f();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? s : l;
  return ms.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, ms;
}
var Tv;
function CI() {
  return Tv || (Tv = 1, ys.exports = EI()), ys.exports;
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
var Ev;
function DI() {
  if (Ev) return ps;
  Ev = 1;
  var e = od, t = CI();
  function r(s, c) {
    return s === c && (s !== 0 || 1 / s === 1 / c) || s !== s && c !== c;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, a = e.useRef, o = e.useEffect, l = e.useMemo, u = e.useDebugValue;
  return ps.useSyncExternalStoreWithSelector = function(s, c, d, f, v) {
    var h = a(null);
    if (h.current === null) {
      var p = { hasValue: !1, value: null };
      h.current = p;
    } else p = h.current;
    h = l(
      function() {
        function g(b) {
          if (!w) {
            if (w = !0, x = b, b = f(b), v !== void 0 && p.hasValue) {
              var O = p.value;
              if (v(O, b))
                return A = O;
            }
            return A = b;
          }
          if (O = A, n(x, b)) return O;
          var I = f(b);
          return v !== void 0 && v(O, I) ? (x = b, O) : (x = b, A = I);
        }
        var w = !1, x, A, P = d === void 0 ? null : d;
        return [
          function() {
            return g(c());
          },
          P === null ? void 0 : function() {
            return g(P());
          }
        ];
      },
      [c, d, f, v]
    );
    var m = i(s, h[0], h[1]);
    return o(
      function() {
        p.hasValue = !0, p.value = m;
      },
      [m]
    ), u(m), m;
  }, ps;
}
var Cv;
function MI() {
  return Cv || (Cv = 1, hs.exports = DI()), hs.exports;
}
var $I = MI(), ld = /* @__PURE__ */ We(null), _I = (e) => e, ee = () => {
  var e = Ze(ld);
  return e ? e.store.dispatch : _I;
}, Lo = () => {
}, NI = () => Lo, LI = (e, t) => e === t;
function C(e) {
  var t = Ze(ld), r = xe(() => t ? (n) => {
    if (n != null)
      return e(n);
  } : Lo, [t, e]);
  return $I.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : NI, t ? t.store.getState : Lo, t ? t.store.getState : Lo, r, LI);
}
function RI(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function BI(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var Dv = (e) => Array.isArray(e) ? e : [e];
function zI(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return BI(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function KI(e, t) {
  const r = [], { length: n } = e;
  for (let i = 0; i < n; i++)
    r.push(e[i].apply(null, t));
  return r;
}
var WI = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, FI = () => typeof WeakRef > "u" ? WI : WeakRef, Fb = /* @__PURE__ */ FI(), UI = 0, Mv = 1;
function go() {
  return {
    s: UI,
    v: void 0,
    o: null,
    p: null
  };
}
function XI(e) {
  return e instanceof Fb ? e.deref() : e;
}
function Ub(e, t = {}) {
  let r = go();
  const { resultEqualityCheck: n } = t;
  let i, a = 0;
  function o() {
    let l = r;
    const { length: u } = arguments;
    for (let d = 0, f = u; d < f; d++) {
      const v = arguments[d];
      if (typeof v == "function" || typeof v == "object" && v !== null) {
        let h = l.o;
        h === null && (l.o = h = /* @__PURE__ */ new WeakMap());
        const p = h.get(v);
        p === void 0 ? (l = go(), h.set(v, l)) : l = p;
      } else {
        let h = l.p;
        h === null && (l.p = h = /* @__PURE__ */ new Map());
        const p = h.get(v);
        p === void 0 ? (l = go(), h.set(v, l)) : l = p;
      }
    }
    const s = l;
    let c;
    if (l.s === Mv)
      c = l.v;
    else if (c = e.apply(null, arguments), a++, n) {
      const d = XI(i);
      d != null && n(d, c) && (c = d, a !== 0 && a--), i = typeof c == "object" && c !== null || typeof c == "function" ? /* @__PURE__ */ new Fb(c) : c;
    }
    return s.s = Mv, s.v = c, c;
  }
  return o.clearCache = () => {
    r = go(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function HI(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...i) => {
    let a = 0, o = 0, l, u = {}, s = i.pop();
    typeof s == "object" && (u = s, s = i.pop()), RI(
      s,
      `createSelector expects an output function after the inputs, but received: [${typeof s}]`
    );
    const c = {
      ...r,
      ...u
    }, {
      memoize: d,
      memoizeOptions: f = [],
      argsMemoize: v = Ub,
      argsMemoizeOptions: h = []
    } = c, p = Dv(f), m = Dv(h), g = zI(i), w = d(function() {
      return a++, s.apply(
        null,
        arguments
      );
    }, ...p), x = v(function() {
      o++;
      const P = KI(
        g,
        arguments
      );
      return l = w.apply(null, P), l;
    }, ...m);
    return Object.assign(x, {
      resultFunc: s,
      memoizedResultFunc: w,
      dependencies: g,
      dependencyRecomputations: () => o,
      resetDependencyRecomputations: () => {
        o = 0;
      },
      lastResult: () => l,
      recomputations: () => a,
      resetRecomputations: () => {
        a = 0;
      },
      memoize: d,
      argsMemoize: v
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var S = /* @__PURE__ */ HI(Ub);
function YI(e, t = 1) {
  const r = [], n = Math.floor(t), i = (a, o) => {
    for (let l = 0; l < a.length; l++) {
      const u = a[l];
      Array.isArray(u) && o < n ? i(u, o + 1) : r.push(u);
    }
  };
  return i(e, 0), r;
}
function tc(e, t, r) {
  return _b(r) && (typeof t == "number" && Oi(r) && zb(t) && t < r.length || typeof t == "string" && t in r) ? va(r[t], e) : !1;
}
function $v(e) {
  return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e !== e ? 4 : 0;
}
const VI = (e, t, r) => {
  if (e !== t) {
    const n = $v(e), i = $v(t);
    if (n === i && n === 0) {
      if (e < t) return r === "desc" ? 1 : -1;
      if (e > t) return r === "desc" ? -1 : 1;
    }
    return r === "desc" ? i - n : n - i;
  }
  return 0;
}, GI = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, qI = /^\w*$/;
function ZI(e, t) {
  return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || qc(e) ? !0 : typeof e == "string" && (qI.test(e) || !GI.test(e)) || t != null;
}
function JI(e, t, r, n) {
  if (e == null) return [];
  r = r, Array.isArray(e) || (e = Oi(e) ? Array.from(e) : Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(r) || (r = r == null ? [] : [r]), r = r.map((l) => String(l));
  const i = (l, u) => {
    let s = l, c = 0;
    for (; c < u.length && s != null; ++c) s = s[u[c]];
    return c > 0 && c === u.length ? s : void 0;
  }, a = (l, u) => {
    if (l == null) return u;
    if (u != null)
      return typeof l == "object" && "key" in l ? Object.hasOwn(u, l.key) ? u[l.key] : i(u, l.path) : typeof l == "function" ? l(u) : Array.isArray(l) ? i(u, l) : u[l];
  }, o = t.map((l) => (Array.isArray(l) && l.length === 1 && (l = l[0]), l == null || typeof l == "function" || Array.isArray(l) || ZI(l) ? l : {
    key: l,
    path: au(l)
  }));
  return e.map((l) => ({
    original: l,
    criteria: o.map((u) => a(u, l))
  })).slice().sort((l, u) => {
    for (let s = 0; s < o.length; s++) {
      const c = VI(l.criteria[s], u.criteria[s], r[s]);
      if (c !== 0) return c;
    }
    return 0;
  }).map((l) => l.original);
}
function fu(e, ...t) {
  const r = t.length;
  return r > 1 && tc(e, t[0], t[1]) ? t = [] : r > 2 && tc(t[0], t[1], t[2]) && (t = [t[0]]), JI(e, YI(t), ["asc"]);
}
var Xb = (e) => e.legend.settings, QI = (e) => e.legend.size, e1 = (e) => e.legend.payload, t1 = S([e1, Xb], (e, t) => {
  var r = t.itemSorter, n = e.flat(1);
  return r ? fu(n, r) : n;
});
function r1() {
  return C(t1);
}
function n1(e, t) {
  return l1(e) || o1(e, t) || a1(e, t) || i1();
}
function i1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function a1(e, t) {
  if (e) {
    if (typeof e == "string") return _v(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _v(e, t) : void 0;
  }
}
function _v(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function o1(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function l1(e) {
  if (Array.isArray(e)) return e;
}
var bo = 1;
function Nv(e, t) {
  return Math.abs(e.height - t.height) > bo || Math.abs(e.left - t.left) > bo || Math.abs(e.top - t.top) > bo || Math.abs(e.width - t.width) > bo;
}
function Lv(e) {
  var t = e.getBoundingClientRect();
  return {
    height: t.height,
    left: t.left,
    top: t.top,
    width: t.width
  };
}
function Hb() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = Ne({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), r = n1(t, 2), n = r[0], i = r[1], a = H(null), o = H(n);
  o.current = n;
  var l = ue(
    (u) => {
      if (a.current != null && (a.current.disconnect(), a.current = null), u != null) {
        var s = Lv(u);
        if (Nv(s, o.current) && i(s), typeof ResizeObserver < "u") {
          var c = new ResizeObserver(() => {
            var d = Lv(u);
            Nv(d, o.current) && i(d);
          });
          c.observe(u), a.current = c;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...e]
  );
  return ae(() => () => {
    var u;
    (u = a.current) === null || u === void 0 || u.disconnect();
  }, []), [n, l];
}
function at(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var u1 = typeof Symbol == "function" && Symbol.observable || "@@observable", Rv = u1, gs = () => Math.random().toString(36).substring(7).split("").join("."), s1 = {
  INIT: `@@redux/INIT${/* @__PURE__ */ gs()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ gs()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${gs()}`
}, tl = s1;
function ud(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Yb(e, t, r) {
  if (typeof e != "function")
    throw new Error(at(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(at(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(at(1));
    return r(Yb)(e, t);
  }
  let n = e, i = t, a = /* @__PURE__ */ new Map(), o = a, l = 0, u = !1;
  function s() {
    o === a && (o = /* @__PURE__ */ new Map(), a.forEach((m, g) => {
      o.set(g, m);
    }));
  }
  function c() {
    if (u)
      throw new Error(at(3));
    return i;
  }
  function d(m) {
    if (typeof m != "function")
      throw new Error(at(4));
    if (u)
      throw new Error(at(5));
    let g = !0;
    s();
    const w = l++;
    return o.set(w, m), function() {
      if (g) {
        if (u)
          throw new Error(at(6));
        g = !1, s(), o.delete(w), a = null;
      }
    };
  }
  function f(m) {
    if (!ud(m))
      throw new Error(at(7));
    if (typeof m.type > "u")
      throw new Error(at(8));
    if (typeof m.type != "string")
      throw new Error(at(17));
    if (u)
      throw new Error(at(9));
    try {
      u = !0, i = n(i, m);
    } finally {
      u = !1;
    }
    return (a = o).forEach((w) => {
      w();
    }), m;
  }
  function v(m) {
    if (typeof m != "function")
      throw new Error(at(10));
    n = m, f({
      type: tl.REPLACE
    });
  }
  function h() {
    const m = d;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(g) {
        if (typeof g != "object" || g === null)
          throw new Error(at(11));
        function w() {
          const A = g;
          A.next && A.next(c());
        }
        return w(), {
          unsubscribe: m(w)
        };
      },
      [Rv]() {
        return this;
      }
    };
  }
  return f({
    type: tl.INIT
  }), {
    dispatch: f,
    subscribe: d,
    getState: c,
    replaceReducer: v,
    [Rv]: h
  };
}
function c1(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: tl.INIT
    }) > "u")
      throw new Error(at(12));
    if (typeof r(void 0, {
      type: tl.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(at(13));
  });
}
function Vb(e) {
  const t = Object.keys(e), r = {};
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    typeof e[o] == "function" && (r[o] = e[o]);
  }
  const n = Object.keys(r);
  let i;
  try {
    c1(r);
  } catch (a) {
    i = a;
  }
  return function(o = {}, l) {
    if (i)
      throw i;
    let u = !1;
    const s = {};
    for (let c = 0; c < n.length; c++) {
      const d = n[c], f = r[d], v = o[d], h = f(v, l);
      if (typeof h > "u")
        throw l && l.type, new Error(at(14));
      s[d] = h, u = u || h !== v;
    }
    return u = u || n.length !== Object.keys(o).length, u ? s : o;
  };
}
function rl(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function d1(...e) {
  return (t) => (r, n) => {
    const i = t(r, n);
    let a = () => {
      throw new Error(at(15));
    };
    const o = {
      getState: i.getState,
      dispatch: (u, ...s) => a(u, ...s)
    }, l = e.map((u) => u(o));
    return a = rl(...l)(i.dispatch), {
      ...i,
      dispatch: a
    };
  };
}
function Gb(e) {
  return ud(e) && "type" in e && typeof e.type == "string";
}
var qb = Symbol.for("immer-nothing"), Bv = Symbol.for("immer-draftable"), ft = Symbol.for("immer-state");
function Zt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var jt = Object, ui = jt.getPrototypeOf, nl = "constructor", vu = "prototype", rc = "configurable", il = "enumerable", Ro = "writable", ba = "value", Mr = (e) => !!e && !!e[ft];
function Wt(e) {
  return e ? Zb(e) || pu(e) || !!e[Bv] || !!e[nl]?.[Bv] || yu(e) || mu(e) : !1;
}
var f1 = jt[vu][nl].toString(), zv = /* @__PURE__ */ new WeakMap();
function Zb(e) {
  if (!e || !sd(e))
    return !1;
  const t = ui(e);
  if (t === null || t === jt[vu])
    return !0;
  const r = jt.hasOwnProperty.call(t, nl) && t[nl];
  if (r === Object)
    return !0;
  if (!Zn(r))
    return !1;
  let n = zv.get(r);
  return n === void 0 && (n = Function.toString.call(r), zv.set(r, n)), n === f1;
}
function hu(e, t, r = !0) {
  Ba(e) === 0 ? (r ? Reflect.ownKeys(e) : jt.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Ba(e) {
  const t = e[ft];
  return t ? t.type_ : pu(e) ? 1 : yu(e) ? 2 : mu(e) ? 3 : 0;
}
var bs = (e, t, r = Ba(e)) => r === 2 ? e.has(t) : jt[vu].hasOwnProperty.call(e, t), nc = (e, t, r = Ba(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), al = (e, t, r, n = Ba(e)) => {
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
};
function v1(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var pu = Array.isArray, yu = (e) => e instanceof Map, mu = (e) => e instanceof Set, sd = (e) => typeof e == "object", Zn = (e) => typeof e == "function", xs = (e) => typeof e == "boolean";
function h1(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var Sr = (e) => e.copy_ || e.base_, cd = (e) => e.modified_ ? e.copy_ : e.base_;
function ic(e, t) {
  if (yu(e))
    return new Map(e);
  if (mu(e))
    return new Set(e);
  if (pu(e))
    return Array[vu].slice.call(e);
  const r = Zb(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = jt.getOwnPropertyDescriptors(e);
    delete n[ft];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], l = n[o];
      l[Ro] === !1 && (l[Ro] = !0, l[rc] = !0), (l.get || l.set) && (n[o] = {
        [rc]: !0,
        [Ro]: !0,
        // could live with !!desc.set as well here...
        [il]: l[il],
        [ba]: e[o]
      });
    }
    return jt.create(ui(e), n);
  } else {
    const n = ui(e);
    if (n !== null && r)
      return { ...e };
    const i = jt.create(n);
    return jt.assign(i, e);
  }
}
function dd(e, t = !1) {
  return gu(e) || Mr(e) || !Wt(e) || (Ba(e) > 1 && jt.defineProperties(e, {
    set: xo,
    add: xo,
    clear: xo,
    delete: xo
  }), jt.freeze(e), t && hu(
    e,
    (r, n) => {
      dd(n, !0);
    },
    !1
  )), e;
}
function p1() {
  Zt(2);
}
var xo = {
  [ba]: p1
};
function gu(e) {
  return e === null || !sd(e) ? !0 : jt.isFrozen(e);
}
var ol = "MapSet", ac = "Patches", Kv = "ArrayMethods", Jb = {};
function Sn(e) {
  const t = Jb[e];
  return t || Zt(0, e), t;
}
var Wv = (e) => !!Jb[e], xa, Qb = () => xa, y1 = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: Wv(ol) ? Sn(ol) : void 0,
  arrayMethodsPlugin_: Wv(Kv) ? Sn(Kv) : void 0
});
function Fv(e, t) {
  t && (e.patchPlugin_ = Sn(ac), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function oc(e) {
  lc(e), e.drafts_.forEach(m1), e.drafts_ = null;
}
function lc(e) {
  e === xa && (xa = e.parent_);
}
var Uv = (e) => xa = y1(xa, e);
function m1(e) {
  const t = e[ft];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Xv(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[ft].modified_ && (oc(t), Zt(4)), Wt(e) && (e = Hv(t, e));
    const { patchPlugin_: i } = t;
    i && i.generateReplacementPatches_(
      r[ft].base_,
      e,
      t
    );
  } else
    e = Hv(t, r);
  return g1(t, e, !0), oc(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== qb ? e : void 0;
}
function Hv(e, t) {
  if (gu(t))
    return t;
  const r = t[ft];
  if (!r)
    return ll(t, e.handledSet_, e);
  if (!bu(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: n } = r;
    if (n)
      for (; n.length > 0; )
        n.pop()(e);
    r0(r, e);
  }
  return r.copy_;
}
function g1(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && dd(t, r);
}
function e0(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var bu = (e, t) => e.scope_ === t, b1 = [];
function t0(e, t, r, n) {
  const i = Sr(e), a = e.type_;
  if (n !== void 0 && nc(i, n, a) === t) {
    al(i, n, r, a);
    return;
  }
  if (!e.draftLocations_) {
    const l = e.draftLocations_ = /* @__PURE__ */ new Map();
    hu(i, (u, s) => {
      if (Mr(s)) {
        const c = l.get(s) || [];
        c.push(u), l.set(s, c);
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? b1;
  for (const l of o)
    al(i, l, r, a);
}
function x1(e, t, r) {
  e.callbacks_.push(function(i) {
    const a = t;
    if (!a || !bu(a, i))
      return;
    i.mapSetPlugin_?.fixSetContents(a);
    const o = cd(a);
    t0(e, a.draft_ ?? a, o, r), r0(a, i);
  });
}
function r0(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: n } = t;
    if (n) {
      const i = n.getPath(e);
      i && n.generatePatches_(e, i, t);
    }
    e0(e);
  }
}
function w1(e, t, r) {
  const { scope_: n } = e;
  if (Mr(r)) {
    const i = r[ft];
    bu(i, n) && i.callbacks_.push(function() {
      Bo(e);
      const o = cd(i);
      t0(e, r, o, t);
    });
  } else Wt(r) && e.callbacks_.push(function() {
    const a = Sr(e);
    e.type_ === 3 ? a.has(r) && ll(r, n.handledSet_, n) : nc(a, t, e.type_) === r && n.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && ll(
      nc(e.copy_, t, e.type_),
      n.handledSet_,
      n
    );
  });
}
function ll(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || Mr(e) || t.has(e) || !Wt(e) || gu(e) || (t.add(e), hu(e, (n, i) => {
    if (Mr(i)) {
      const a = i[ft];
      if (bu(a, r)) {
        const o = cd(a);
        al(e, n, o, e.type_), e0(a);
      }
    } else Wt(i) && ll(i, t, r);
  })), e;
}
function A1(e, t) {
  const r = pu(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Qb(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let i = n, a = ul;
  r && (i = [n], a = wa);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, [l, n];
}
var ul = {
  get(e, t) {
    if (t === ft)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const n = e.type_ === 1 && typeof t == "string";
    if (n && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const i = Sr(e);
    if (!bs(i, t, e.type_))
      return O1(e, i, t);
    const a = i[t];
    if (e.finalized_ || !Wt(a) || n && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && h1(t))
      return a;
    if (a === ws(e.base_, t) || P1(e, t, a)) {
      Bo(e);
      const o = e.type_ === 1 ? +t : t, l = sc(e.scope_, a, e, o);
      return e.copy_[o] = l;
    }
    return a;
  },
  has(e, t) {
    return t in Sr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Sr(e));
  },
  set(e, t, r) {
    const n = n0(Sr(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = ws(Sr(e), t), a = i?.[ft];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_.delete(t), !0;
      if (v1(r, i) && (r !== void 0 || bs(e.base_, t, e.type_)))
        return !0;
      Bo(e), uc(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || bs(e.copy_, t, e.type_)) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), w1(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return Bo(e), ws(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), uc(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = Sr(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      [Ro]: !0,
      [rc]: e.type_ !== 1 || t !== "length",
      [il]: n[il],
      [ba]: r[t]
    };
  },
  defineProperty() {
    Zt(11);
  },
  getPrototypeOf(e) {
    return ui(e.base_);
  },
  setPrototypeOf() {
    Zt(12);
  }
}, wa = {};
for (let e in ul) {
  let t = ul[e];
  wa[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
wa.deleteProperty = function(e, t) {
  return wa.set.call(this, e, t, void 0);
};
wa.set = function(e, t, r) {
  return ul.set.call(this, e[0], t, r, e[0]);
};
function ws(e, t) {
  const r = e[ft];
  return (r ? Sr(r) : e)[t];
}
function P1(e, t, r) {
  return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !Wt(r) || r[ft] ? !1 : e.baseRefs_.has(r);
}
function O1(e, t, r) {
  const n = n0(t, r);
  return n ? ba in n ? n[ba] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function n0(e, t) {
  if (!(t in e))
    return;
  let r = ui(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = ui(r);
  }
}
function uc(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && uc(e.parent_));
}
function Bo(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = ic(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var S1 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (t, r, n) => {
      if (Zn(t) && !Zn(r)) {
        const a = r;
        r = t;
        const o = this;
        return function(u = a, ...s) {
          return o.produce(u, (c) => r.call(this, c, ...s));
        };
      }
      Zn(r) || Zt(6), n !== void 0 && !Zn(n) && Zt(7);
      let i;
      if (Wt(t)) {
        const a = Uv(this), o = sc(a, t, void 0);
        let l = !0;
        try {
          i = r(o), l = !1;
        } finally {
          l ? oc(a) : lc(a);
        }
        return Fv(a, n), Xv(i, a);
      } else if (!t || !sd(t)) {
        if (i = r(t), i === void 0 && (i = t), i === qb && (i = void 0), this.autoFreeze_ && dd(i, !0), n) {
          const a = [], o = [];
          Sn(ac).generateReplacementPatches_(t, i, {
            patches_: a,
            inversePatches_: o
          }), n(a, o);
        }
        return i;
      } else
        Zt(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (Zn(t))
        return (o, ...l) => this.produceWithPatches(o, (u) => t(u, ...l));
      let n, i;
      return [this.produce(t, r, (o, l) => {
        n = o, i = l;
      }), n, i];
    }, xs(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), xs(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), xs(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    Wt(e) || Zt(8), Mr(e) && (e = zt(e));
    const t = Uv(this), r = sc(t, e, void 0);
    return r[ft].isManual_ = !0, lc(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[ft];
    (!r || !r.isManual_) && Zt(9);
    const { scope_: n } = r;
    return Fv(n, t), Xv(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const i = t[r];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = Sn(ac).applyPatches_;
    return Mr(e) ? n(e, t) : this.produce(
      e,
      (i) => n(i, t)
    );
  }
};
function sc(e, t, r, n) {
  const [i, a] = yu(t) ? Sn(ol).proxyMap_(t, r) : mu(t) ? Sn(ol).proxySet_(t, r) : A1(t, r);
  return (r?.scope_ ?? Qb()).drafts_.push(i), a.callbacks_ = r?.callbacks_ ?? [], a.key_ = n, r && n !== void 0 ? x1(r, a, n) : a.callbacks_.push(function(u) {
    u.mapSetPlugin_?.fixSetContents(a);
    const { patchPlugin_: s } = u;
    a.modified_ && s && s.generatePatches_(a, [], u);
  }), i;
}
function zt(e) {
  return Mr(e) || Zt(10, e), i0(e);
}
function i0(e) {
  if (!Wt(e) || gu(e))
    return e;
  const t = e[ft];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = ic(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = ic(e, !0);
  return hu(
    r,
    (i, a) => {
      al(r, i, i0(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var I1 = globalThis.Iterator;
I1?.from;
var k1 = new S1(), a0 = k1.produce, ye = (e) => e;
function o0(e) {
  return ({ dispatch: r, getState: n }) => (i) => (a) => typeof a == "function" ? a(r, n, e) : i(a);
}
var j1 = o0(), T1 = o0;
const E1 = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? rl : rl.apply(null, arguments);
};
function Ct(e, t) {
  function r(...n) {
    if (t) {
      let i = t(...n);
      if (!i) throw new Error(At(0));
      return {
        type: e,
        payload: i.payload,
        ..."meta" in i && { meta: i.meta },
        ..."error" in i && { error: i.error }
      };
    }
    return {
      type: e,
      payload: n[0]
    };
  }
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => Gb(n) && n.type === e, r;
}
var l0 = class sa extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, sa.prototype);
  }
  static get [Symbol.species]() {
    return sa;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new sa(...t[0].concat(this)) : new sa(...t.concat(this));
  }
};
function Yv(e) {
  return Wt(e) ? a0(e, () => {
  }) : e;
}
function wo(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function C1(e) {
  return typeof e == "boolean";
}
const D1 = () => function(t) {
  const { thunk: r = !0, immutableCheck: n = !0, serializableCheck: i = !0, actionCreatorCheck: a = !0 } = t ?? {};
  let o = new l0();
  return r && (C1(r) ? o.push(j1) : o.push(T1(r.extraArgument))), o;
}, u0 = "RTK_autoBatch", Ee = () => (e) => ({
  payload: e,
  meta: { [u0]: !0 }
}), Vv = (e) => (t) => {
  setTimeout(t, e);
}, M1 = (e, t) => (r) => {
  let n = !1, i, a;
  const o = () => {
    n || (n = !0, cancelAnimationFrame(i), clearTimeout(a), r());
  };
  i = e(o), a = setTimeout(o, t);
}, s0 = (e = { type: "raf" }) => (t) => (...r) => {
  const n = t(...r);
  let i = !0, a = !1, o = !1;
  const l = /* @__PURE__ */ new Set(), u = e.type === "tick" ? queueMicrotask : e.type === "raf" ? typeof window < "u" && window.requestAnimationFrame ? M1(window.requestAnimationFrame, 100) : Vv(10) : e.type === "callback" ? e.queueNotification : Vv(e.timeout), s = () => {
    o = !1, a && (a = !1, l.forEach((c) => c()));
  };
  return Object.assign({}, n, {
    subscribe(c) {
      const d = () => i && c(), f = n.subscribe(d);
      return l.add(c), () => {
        f(), l.delete(c);
      };
    },
    dispatch(c) {
      try {
        return i = !c?.meta?.[u0], a = !i, a && (o || (o = !0, u(s))), n.dispatch(c);
      } finally {
        i = !0;
      }
    }
  });
}, $1 = (e) => function(r) {
  const { autoBatch: n = !0 } = r ?? {};
  let i = new l0(e);
  return n && i.push(s0(typeof n == "object" ? n : void 0)), i;
};
function _1(e) {
  const t = D1(), { reducer: r = void 0, middleware: n, devTools: i = !0, preloadedState: a = void 0, enhancers: o = void 0 } = e || {};
  let l;
  if (typeof r == "function") l = r;
  else if (ud(r)) l = Vb(r);
  else throw new Error(At(1));
  let u;
  typeof n == "function" ? u = n(t) : u = t();
  let s = rl;
  i && (s = E1({
    trace: !1,
    ...typeof i == "object" && i
  }));
  const c = d1(...u), d = $1(c);
  let f = typeof o == "function" ? o(d) : d();
  const v = s(...f);
  return Yb(l, a, v);
}
function c0(e) {
  const t = {}, r = [];
  let n;
  const i = {
    addCase(a, o) {
      const l = typeof a == "string" ? a : a.type;
      if (!l) throw new Error(At(28));
      if (l in t) throw new Error(At(29));
      return t[l] = o, i;
    },
    addAsyncThunk(a, o) {
      return o.pending && (t[a.pending.type] = o.pending), o.rejected && (t[a.rejected.type] = o.rejected), o.fulfilled && (t[a.fulfilled.type] = o.fulfilled), o.settled && r.push({
        matcher: a.settled,
        reducer: o.settled
      }), i;
    },
    addMatcher(a, o) {
      return r.push({
        matcher: a,
        reducer: o
      }), i;
    },
    addDefaultCase(a) {
      return n = a, i;
    }
  };
  return e(i), [
    t,
    r,
    n
  ];
}
function N1(e) {
  return typeof e == "function";
}
function L1(e, t) {
  let [r, n, i] = c0(t), a;
  if (N1(e)) a = () => Yv(e());
  else {
    const l = Yv(e);
    a = () => l;
  }
  function o(l = a(), u) {
    let s = [r[u.type], ...n.filter(({ matcher: c }) => c(u)).map(({ reducer: c }) => c)];
    return s.filter((c) => !!c).length === 0 && (s = [i]), s.reduce((c, d) => {
      if (d)
        if (Mr(c)) {
          const f = d(c, u);
          return f === void 0 ? c : f;
        } else {
          if (Wt(c))
            return a0(c, (f) => d(f, u));
          {
            const f = d(c, u);
            if (f === void 0) {
              if (c === null) return c;
              throw new Error(At(9));
            }
            return f;
          }
        }
      return c;
    }, l);
  }
  return o.getInitialState = a, o;
}
let R1 = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", B1 = (e = 21) => {
  let t = "", r = e;
  for (; r--; ) t += R1[Math.random() * 64 | 0];
  return t;
};
const z1 = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function K1(e, t) {
  return `${e}/${t}`;
}
function W1({ creators: e } = {}) {
  const t = e?.asyncThunk?.[z1];
  return function(n) {
    const { name: i, reducerPath: a = i } = n;
    if (!i) throw new Error(At(11));
    const o = (typeof n.reducers == "function" ? n.reducers(U1()) : n.reducers) || {}, l = Object.keys(o), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, s = {
      addCase(x, A) {
        const P = typeof x == "string" ? x : x.type;
        if (!P) throw new Error(At(12));
        if (P in u.sliceCaseReducersByType) throw new Error(At(13));
        return u.sliceCaseReducersByType[P] = A, s;
      },
      addMatcher(x, A) {
        return u.sliceMatchers.push({
          matcher: x,
          reducer: A
        }), s;
      },
      exposeAction(x, A) {
        return u.actionCreators[x] = A, s;
      },
      exposeCaseReducer(x, A) {
        return u.sliceCaseReducersByName[x] = A, s;
      }
    };
    l.forEach((x) => {
      const A = o[x], P = {
        reducerName: x,
        type: K1(i, x),
        createNotation: typeof n.reducers == "function"
      };
      H1(A) ? V1(P, A, s, t) : X1(P, A, s);
    });
    function c() {
      const [x = {}, A = [], P = void 0] = typeof n.extraReducers == "function" ? c0(n.extraReducers) : [n.extraReducers], b = {
        ...x,
        ...u.sliceCaseReducersByType
      };
      return L1(n.initialState, (O) => {
        for (let I in b) O.addCase(I, b[I]);
        for (let I of u.sliceMatchers) O.addMatcher(I.matcher, I.reducer);
        for (let I of A) O.addMatcher(I.matcher, I.reducer);
        P && O.addDefaultCase(P);
      });
    }
    const d = (x) => x, f = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new WeakMap();
    let h;
    function p(x, A) {
      return h || (h = c()), h(x, A);
    }
    function m() {
      return h || (h = c()), h.getInitialState();
    }
    function g(x, A = !1) {
      function P(O) {
        let I = O[x];
        return typeof I > "u" && A && (I = wo(v, P, m)), I;
      }
      function b(O = d) {
        return wo(wo(f, A, () => /* @__PURE__ */ new WeakMap()), O, () => {
          const I = {};
          for (const [E, j] of Object.entries(n.selectors ?? {})) I[E] = F1(j, O, () => wo(v, O, m), A);
          return I;
        });
      }
      return {
        reducerPath: x,
        getSelectors: b,
        get selectors() {
          return b(P);
        },
        selectSlice: P
      };
    }
    const w = {
      name: i,
      reducer: p,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...g(a),
      injectInto(x, { reducerPath: A, ...P } = {}) {
        const b = A ?? a;
        return x.inject({
          reducerPath: b,
          reducer: p
        }, P), {
          ...w,
          ...g(b, !0)
        };
      }
    };
    return w;
  };
}
function F1(e, t, r, n) {
  function i(a, ...o) {
    let l = t(a);
    return typeof l > "u" && n && (l = r()), e(l, ...o);
  }
  return i.unwrapped = e, i;
}
const ht = /* @__PURE__ */ W1();
function U1() {
  function e(t, r) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...r
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({ [t.name](...r) {
        return t(...r);
      } }[t.name], { _reducerDefinitionType: "reducer" });
    },
    preparedReducer(t, r) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: r
      };
    },
    asyncThunk: e
  };
}
function X1({ type: e, reducerName: t, createNotation: r }, n, i) {
  let a, o;
  if ("reducer" in n) {
    if (r && !Y1(n)) throw new Error(At(17));
    a = n.reducer, o = n.prepare;
  } else a = n;
  i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? Ct(e, o) : Ct(e));
}
function H1(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Y1(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function V1({ type: e, reducerName: t }, r, n, i) {
  if (!i) throw new Error(At(18));
  const { payloadCreator: a, fulfilled: o, pending: l, rejected: u, settled: s, options: c } = r, d = i(e, a, c);
  n.exposeAction(t, d), o && n.addCase(d.fulfilled, o), l && n.addCase(d.pending, l), u && n.addCase(d.rejected, u), s && n.addMatcher(d.settled, s), n.exposeCaseReducer(t, {
    fulfilled: o || Ao,
    pending: l || Ao,
    rejected: u || Ao,
    settled: s || Ao
  });
}
function Ao() {
}
const G1 = "task", d0 = "listener", f0 = "completed", fd = "cancelled", q1 = `task-${fd}`, Z1 = `task-${f0}`, cc = `${d0}-${fd}`, J1 = `${d0}-${f0}`;
var xu = class {
  code;
  name = "TaskAbortError";
  message;
  constructor(e) {
    this.code = e, this.message = `${G1} ${fd} (reason: ${e})`;
  }
};
const vd = (e, t) => {
  if (typeof e != "function") throw new TypeError(At(32));
}, sl = () => {
}, v0 = (e, t = sl) => (e.catch(t), e), h0 = (e, t) => (e.addEventListener("abort", t, { once: !0 }), () => e.removeEventListener("abort", t)), bn = (e) => {
  if (e.aborted) throw new xu(e.reason);
};
function p0(e, t) {
  let r = sl;
  return new Promise((n, i) => {
    const a = () => i(new xu(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    r = h0(e, a), t.finally(() => r()).then(n, i);
  }).finally(() => {
    r = sl;
  });
}
const Q1 = async (e, t) => {
  try {
    return await Promise.resolve(), {
      status: "ok",
      value: await e()
    };
  } catch (r) {
    return {
      status: r instanceof xu ? "cancelled" : "rejected",
      error: r
    };
  } finally {
    t?.();
  }
}, cl = (e) => (t) => v0(p0(e, t).then((r) => (bn(e), r))), y0 = (e) => {
  const t = cl(e);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, { assign: ti } = Object, Gv = {}, wu = "listenerMiddleware", ek = (e, t) => {
  const r = (n) => h0(e, () => n.abort(e.reason));
  return (n, i) => {
    vd(n);
    const a = new AbortController();
    r(a);
    const o = Q1(async () => {
      bn(e), bn(a.signal);
      const l = await n({
        pause: cl(a.signal),
        delay: y0(a.signal),
        signal: a.signal
      });
      return bn(a.signal), l;
    }, () => a.abort(Z1));
    return i?.autoJoin && t.push(o.catch(sl)), {
      result: cl(e)(o),
      cancel() {
        a.abort(q1);
      }
    };
  };
}, tk = (e, t) => {
  const r = async (n, i) => {
    bn(t);
    let a = () => {
    };
    const o = [new Promise((l, u) => {
      let s = e({
        predicate: n,
        effect: (c, d) => {
          d.unsubscribe(), l([
            c,
            d.getState(),
            d.getOriginalState()
          ]);
        }
      });
      a = () => {
        s(), u();
      };
    })];
    i != null && o.push(new Promise((l) => setTimeout(l, i, null)));
    try {
      const l = await p0(t, Promise.race(o));
      return bn(t), l;
    } finally {
      a();
    }
  };
  return ((n, i) => v0(r(n, i)));
}, m0 = (e) => {
  let { type: t, actionCreator: r, matcher: n, predicate: i, effect: a } = e;
  if (t) i = Ct(t).match;
  else if (r)
    t = r.type, i = r.match;
  else if (n) i = n;
  else if (!i) throw new Error(At(21));
  return vd(a), {
    predicate: i,
    type: t,
    effect: a
  };
}, g0 = /* @__PURE__ */ ti((e) => {
  const { type: t, predicate: r, effect: n } = m0(e);
  return {
    id: B1(),
    effect: n,
    type: t,
    predicate: r,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(At(22));
    }
  };
}, { withTypes: () => g0 }), qv = (e, t) => {
  const { type: r, effect: n, predicate: i } = m0(t);
  return Array.from(e.values()).find((a) => (typeof r == "string" ? a.type === r : a.predicate === i) && a.effect === n);
}, dc = (e) => {
  e.pending.forEach((t) => {
    t.abort(cc);
  });
}, rk = (e, t) => () => {
  for (const r of t.keys()) dc(r);
  e.clear();
}, Zv = (e, t, r) => {
  try {
    e(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, b0 = /* @__PURE__ */ ti(/* @__PURE__ */ Ct(`${wu}/add`), { withTypes: () => b0 }), nk = /* @__PURE__ */ Ct(`${wu}/removeAll`), x0 = /* @__PURE__ */ ti(/* @__PURE__ */ Ct(`${wu}/remove`), { withTypes: () => x0 }), ik = (...e) => {
  console.error(`${wu}/error`, ...e);
}, za = (e = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (v) => {
    const h = r.get(v) ?? 0;
    r.set(v, h + 1);
  }, i = (v) => {
    const h = r.get(v) ?? 1;
    h === 1 ? r.delete(v) : r.set(v, h - 1);
  }, { extra: a, onError: o = ik } = e;
  vd(o);
  const l = (v) => (v.unsubscribe = () => t.delete(v.id), t.set(v.id, v), (h) => {
    v.unsubscribe(), h?.cancelActive && dc(v);
  }), u = ((v) => {
    const h = qv(t, v) ?? g0(v);
    return l(h);
  });
  ti(u, { withTypes: () => u });
  const s = (v) => {
    const h = qv(t, v);
    return h && (h.unsubscribe(), v.cancelActive && dc(h)), !!h;
  };
  ti(s, { withTypes: () => s });
  const c = async (v, h, p, m) => {
    const g = new AbortController(), w = tk(u, g.signal), x = [];
    try {
      v.pending.add(g), n(v), await Promise.resolve(v.effect(h, ti({}, p, {
        getOriginalState: m,
        condition: (A, P) => w(A, P).then(Boolean),
        take: w,
        delay: y0(g.signal),
        pause: cl(g.signal),
        extra: a,
        signal: g.signal,
        fork: ek(g.signal, x),
        unsubscribe: v.unsubscribe,
        subscribe: () => {
          t.set(v.id, v);
        },
        cancelActiveListeners: () => {
          v.pending.forEach((A, P, b) => {
            A !== g && (A.abort(cc), b.delete(A));
          });
        },
        cancel: () => {
          g.abort(cc), v.pending.delete(g);
        },
        throwIfCancelled: () => {
          bn(g.signal);
        }
      })));
    } catch (A) {
      A instanceof xu || Zv(o, A, { raisedBy: "effect" });
    } finally {
      await Promise.all(x), g.abort(J1), i(v), v.pending.delete(g);
    }
  }, d = rk(t, r);
  return {
    middleware: (v) => (h) => (p) => {
      if (!Gb(p)) return h(p);
      if (b0.match(p)) return u(p.payload);
      if (nk.match(p)) {
        d();
        return;
      }
      if (x0.match(p)) return s(p.payload);
      let m = v.getState();
      const g = () => {
        if (m === Gv) throw new Error(At(23));
        return m;
      };
      let w;
      try {
        if (w = h(p), t.size > 0) {
          const x = v.getState(), A = Array.from(t.values());
          for (const P of A) {
            let b = !1;
            try {
              b = P.predicate(p, x, m);
            } catch (O) {
              b = !1, Zv(o, O, { raisedBy: "predicate" });
            }
            b && c(P, p, v, g);
          }
        }
      } finally {
        m = Gv;
      }
      return w;
    },
    startListening: u,
    stopListening: s,
    clearListeners: d
  };
};
function At(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var ak = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
}, w0 = ht({
  name: "chartLayout",
  initialState: ak,
  reducers: {
    setLayout(e, t) {
      e.layoutType = t.payload;
    },
    setChartSize(e, t) {
      e.width = t.payload.width, e.height = t.payload.height;
    },
    setMargin(e, t) {
      var r, n, i, a;
      e.margin.top = (r = t.payload.top) !== null && r !== void 0 ? r : 0, e.margin.right = (n = t.payload.right) !== null && n !== void 0 ? n : 0, e.margin.bottom = (i = t.payload.bottom) !== null && i !== void 0 ? i : 0, e.margin.left = (a = t.payload.left) !== null && a !== void 0 ? a : 0;
    },
    setScale(e, t) {
      e.scale = t.payload;
    }
  }
}), Au = w0.actions, A0 = Au.setMargin, ok = Au.setLayout, lk = Au.setChartSize, uk = Au.setScale, sk = w0.reducer;
function P0(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function Q(e) {
  return Number.isFinite(e);
}
function Pt(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function Jv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function gt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jv(Object(r), !0).forEach(function(n) {
      ck(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ck(e, t, r) {
  return (t = dk(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dk(e) {
  var t = fk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function fk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function G(e, t, r) {
  return he(e) || he(t) ? r : tt(t) ? yt(e, t, r) : typeof t == "function" ? t(e) : r;
}
var vk = (e, t, r) => {
  if (t && r) {
    var n = r.width, i = r.height, a = t.align, o = t.verticalAlign, l = t.layout, u = t.position, s = t.offset, c = s === void 0 ? 0 : s;
    if (u != null) {
      if (Jc(u)) {
        if (u === "top" && L(e.top))
          return gt(gt({}, e), {}, {
            top: e.top + (i || 0) + c
          });
        if (u === "bottom" && L(e.bottom))
          return gt(gt({}, e), {}, {
            bottom: e.bottom + (i || 0) + c
          });
        if (u === "left" && L(e.left))
          return gt(gt({}, e), {}, {
            left: e.left + (n || 0) + c
          });
        if (u === "right" && L(e.right))
          return gt(gt({}, e), {}, {
            right: e.right + (n || 0) + c
          });
      }
      return e;
    }
    if ((l === "vertical" || l === "horizontal" && o === "middle") && a !== "center" && L(e[a]))
      return gt(gt({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((l === "horizontal" || l === "vertical" && a === "center") && o !== "middle" && L(e[o]))
      return gt(gt({}, e), {}, {
        [o]: e[o] + (i || 0)
      });
  }
  return e;
}, Dt = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", O0 = (e, t, r, n) => {
  if (n)
    return e.map((l) => l.coordinate);
  var i, a, o = e.map((l) => (l.coordinate === t && (i = !0), l.coordinate === r && (a = !0), l.coordinate));
  return i || o.push(t), a || o.push(r), o;
}, S0 = (e, t, r) => {
  if (!e)
    return null;
  var n = e.duplicateDomain, i = e.type, a = e.range, o = e.scale, l = e.realScaleType, u = e.isCategorical, s = e.categoricalDomain, c = e.tickCount, d = e.ticks, f = e.niceTicks, v = e.axisType;
  if (!o)
    return null;
  var h = l === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, p = i === "category" && o.bandwidth ? o.bandwidth() / h : 0;
  if (p = v === "angleAxis" && a && a.length >= 2 ? Ue(a[0] - a[1]) * 2 * p : p, d || f) {
    var m = (d || f || []).map((g, w) => {
      var x = n ? n.indexOf(g) : g, A = o.map(x);
      return Q(A) ? {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: A + p,
        value: g,
        offset: p,
        index: w
      } : null;
    }).filter(rt);
    return m;
  }
  return u && s ? s.map((g, w) => {
    var x = o.map(g);
    return Q(x) ? {
      coordinate: x + p,
      value: g,
      index: w,
      offset: p
    } : null;
  }).filter(rt) : o.ticks && c != null ? o.ticks(c).map((g, w) => {
    var x = o.map(g);
    return Q(x) ? {
      coordinate: x + p,
      value: g,
      index: w,
      offset: p
    } : null;
  }).filter(rt) : o.domain().map((g, w) => {
    var x = o.map(g);
    return Q(x) ? {
      coordinate: x + p,
      // @ts-expect-error can't use Date as an index
      value: n ? n[g] : g,
      index: w,
      offset: p
    } : null;
  }).filter(rt);
}, I0 = (e, t) => {
  if (!t || t.length !== 2 || !L(t[0]) || !L(t[1]))
    return e;
  var r = Math.min(t[0], t[1]), n = Math.max(t[0], t[1]), i = [e[0], e[1]];
  return (!L(e[0]) || e[0] < r) && (i[0] = r), (!L(e[1]) || e[1] > n) && (i[1] = n), i[0] > n && (i[0] = n), i[1] < r && (i[1] = r), i;
}, hk = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0, l = 0; l < r; ++l) {
          var u = e[l], s = u?.[i];
          if (s != null) {
            var c = s[1], d = s[0], f = Et(c) ? d : c;
            f >= 0 ? (s[0] = a, a += f, s[1] = a) : (s[0] = o, o += f, s[1] = o);
          }
        }
  }
}, pk = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0; o < r; ++o) {
          var l = e[o], u = l?.[i];
          if (u != null) {
            var s = Et(u[1]) ? u[0] : u[1];
            s >= 0 ? (u[0] = a, a += s, u[1] = a) : (u[0] = 0, u[1] = 0);
          }
        }
  }
}, yk = {
  sign: hk,
  // @ts-expect-error definitelytyped types are incorrect
  expand: _S,
  // @ts-expect-error definitelytyped types are incorrect
  none: On,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: NS,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: LS,
  positive: pk
}, mk = (e, t, r) => {
  var n, i = (n = yk[r]) !== null && n !== void 0 ? n : On, a = $S().keys(t).value((l, u) => Number(G(l, u, 0))).order(Js).offset(i), o = a(e);
  return o.forEach((l, u) => {
    l.forEach((s, c) => {
      var d = G(e[c], t[u], 0);
      Array.isArray(d) && d.length === 2 && L(d[0]) && L(d[1]) && (s[0] = d[0], s[1] = d[1]);
    });
  }), o;
};
function Ka(e) {
  return e == null ? void 0 : String(e);
}
function si(e) {
  var t = e.axis, r = e.ticks, n = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !he(i[t.dataKey])) {
      var l = Yg(r, "value", i[t.dataKey]);
      if (l)
        return l.coordinate + n / 2;
    }
    return r != null && r[a] ? r[a].coordinate + n / 2 : null;
  }
  var u = G(i, he(o) ? t.dataKey : o), s = t.scale.map(u);
  return L(s) ? s : null;
}
var dl = (e) => {
  var t = e.axis, r = e.ticks, n = e.offset, i = e.bandSize, a = e.entry, o = e.index;
  if (t.type === "category")
    return r[o] ? r[o].coordinate + n : null;
  var l = G(a, t.dataKey, t.scale.domain()[o]);
  if (he(l))
    return null;
  var u = t.scale.map(l);
  return L(u) ? u - i / 2 + n : null;
}, k0 = (e) => {
  var t = e.numericAxis, r = t.scale.domain();
  if (t.type === "number") {
    var n = Math.min(r[0], r[1]), i = Math.max(r[0], r[1]);
    return n <= 0 && i >= 0 ? 0 : i < 0 ? i : n;
  }
  return r[0];
}, gk = (e) => {
  var t = e.flat(2).filter(L);
  return [Math.min(...t), Math.max(...t)];
}, bk = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], xk = (e, t, r) => {
  if (!(e == null || Object.keys(e).length === 0))
    return bk(Object.keys(e).reduce((n, i) => {
      var a = e[i];
      if (!a)
        return n;
      var o = a.stackedData, l = o.reduce((u, s) => {
        var c = P0(s, t, r), d = gk(c);
        return !Q(d[0]) || !Q(d[1]) ? u : [Math.min(u[0], d[0]), Math.max(u[1], d[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(l[0], n[0]), Math.max(l[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, Qv = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, eh = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Ot = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    if (!r || n > 0)
      return n;
  }
  if (e && t && t.length >= 2) {
    for (var i = fu(t, (p) => p.coordinate), a = [], o = 0, l = 1, u = i.length; l < u; l++) {
      var s, c, d = (((s = i[l]) === null || s === void 0 ? void 0 : s.coordinate) || 0) - (((c = i[l - 1]) === null || c === void 0 ? void 0 : c.coordinate) || 0);
      a.push(d), o = Math.max(d, o);
    }
    var f = o * 1e-4, v = 1 / 0;
    for (var h of a)
      h > f && (v = Math.min(h, v));
    return v === 1 / 0 ? 0 : v;
  }
  return r ? void 0 : 0;
};
function th(e) {
  var t = e.tooltipEntrySettings, r = e.dataKey, n = e.payload, i = e.value, a = e.name;
  return gt(gt({}, t), {}, {
    dataKey: r,
    payload: n,
    value: i,
    name: a
  });
}
function Mt(e, t) {
  if (e != null)
    return String(e);
  if (typeof t == "string")
    return t;
}
var wk = (e, t) => {
  if (t === "horizontal")
    return e.relativeX;
  if (t === "vertical")
    return e.relativeY;
}, Ak = (e, t) => t === "centric" ? e.angle : e.radius, mr = (e) => e.layout.width, gr = (e) => e.layout.height, Pk = (e) => e.layout.scale, hd = (e) => e.layout.margin, Pu = S((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Ou = S((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), Ok = ["#1890FF", "#66B5FF", "#41D9C7", "#2FC25B", "#6EDB8F", "#9AE65C", "#FACC14", "#E6965C", "#57AD71", "#223273", "#738AE6", "#7564CC", "#8543E0", "#A877ED", "#5C8EE6", "#13C2C2", "#70E0E0", "#5CA3E6", "#3436C7", "#8082FF", "#DD81E6", "#F04864", "#FA7D92", "#D598D9"], j0 = "data-recharts-item-index", pd = "data-recharts-item-id", Wa = 60, yd = 30;
function rh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Po(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rh(Object(r), !0).forEach(function(n) {
      Sk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Sk(e, t, r) {
  return (t = Ik(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ik(e) {
  var t = kk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function kk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var jk = (e) => e.brush.height;
function Tk(e) {
  var t = Ou(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : Wa;
      return r + i;
    }
    return r;
  }, 0);
}
function Ek(e) {
  var t = Ou(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : Wa;
      return r + i;
    }
    return r;
  }, 0);
}
function Ck(e) {
  var t = Pu(e);
  return t.reduce((r, n) => {
    if (n.orientation === "top" && !n.mirror && !n.hide) {
      var i = typeof n.height == "number" ? n.height : yd;
      return r + i;
    }
    return r;
  }, 0);
}
function Dk(e) {
  var t = Pu(e);
  return t.reduce((r, n) => {
    if (n.orientation === "bottom" && !n.mirror && !n.hide) {
      var i = typeof n.height == "number" ? n.height : yd;
      return r + i;
    }
    return r;
  }, 0);
}
var He = S([mr, gr, hd, jk, Tk, Ek, Ck, Dk, Xb, QI], (e, t, r, n, i, a, o, l, u, s) => {
  var c = {
    left: (r.left || 0) + i,
    right: (r.right || 0) + a
  }, d = {
    top: (r.top || 0) + o,
    bottom: (r.bottom || 0) + l
  }, f = Po(Po({}, d), c), v = f.bottom;
  f.bottom += n, f = vk(f, u, s);
  var h = e - f.left - f.right, p = t - f.top - f.bottom;
  return Po(Po({
    brushBottom: v
  }, f), {}, {
    // never return negative values for height and width
    width: Math.max(h, 0),
    height: Math.max(p, 0)
  });
}), T0 = S(He, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
})), md = S(mr, gr, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
})), E0 = /* @__PURE__ */ We(null), se = () => Ze(E0) != null, Mk = (e) => {
  var t = e.children;
  return /* @__PURE__ */ y(E0.Provider, {
    value: !0
  }, t);
}, Su = (e) => e.brush, Fa = S([Su, He, hd], (e, t, r) => ({
  height: e.height,
  x: L(e.x) ? e.x : t.left,
  y: L(e.y) ? e.y : t.top + t.height + t.brushBottom - (r?.bottom || 0),
  width: L(e.width) ? e.width : t.width
}));
function $k(e, t, { signal: r, edges: n } = {}) {
  let i, a = null;
  const o = n != null && n.includes("leading"), l = n == null || n.includes("trailing"), u = () => {
    a !== null && (e.apply(i, a), i = void 0, a = null);
  }, s = () => {
    l && u(), v();
  };
  let c = null;
  const d = () => {
    c != null && clearTimeout(c), c = setTimeout(() => {
      c = null, s();
    }, t);
  }, f = () => {
    c !== null && (clearTimeout(c), c = null);
  }, v = () => {
    f(), i = void 0, a = null;
  }, h = () => {
    u();
  }, p = function(...m) {
    if (r?.aborted) return;
    i = this, a = m;
    const g = c == null;
    d(), o && g && u();
  };
  return p.schedule = d, p.cancel = v, p.flush = h, r?.addEventListener("abort", v, { once: !0 }), p;
}
function _k(e, t = 0, r = {}) {
  typeof r != "object" && (r = {});
  const { leading: n = !1, trailing: i = !0, maxWait: a } = r, o = Array(2);
  n && (o[0] = "leading"), i && (o[1] = "trailing");
  let l, u = null;
  const s = $k(function(...f) {
    l = e.apply(this, f), u = null;
  }, t, { edges: o }), c = function(...f) {
    return a != null && (u === null && (u = Date.now()), Date.now() - u >= a) ? ((n || i) && (l = e.apply(this, f)), u = Date.now(), s.cancel(), s.schedule(), l) : (s.apply(this, f), l);
  }, d = () => (s.flush(), l);
  return c.cancel = s.cancel, c.flush = d, c;
}
function Nk(e, t = 0, r = {}) {
  const { leading: n = !0, trailing: i = !0 } = r;
  return _k(e, t, {
    leading: n,
    maxWait: t,
    trailing: i
  });
}
var Aa = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, () => i[o++]));
    }
}, dr = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
}, C0 = (e, t, r) => {
  var n = r.width, i = n === void 0 ? dr.width : n, a = r.height, o = a === void 0 ? dr.height : a, l = r.aspect, u = r.maxHeight, s = Pn(i) ? e : Number(i), c = Pn(o) ? t : Number(o);
  return l && l > 0 && (s ? c = s / l : c && (s = c * l), u && c != null && c > u && (c = u)), {
    calculatedWidth: s,
    calculatedHeight: c
  };
}, Lk = {
  width: 0,
  height: 0,
  overflow: "visible"
}, Rk = {
  width: 0,
  overflowX: "visible"
}, Bk = {
  height: 0,
  overflowY: "visible"
}, zk = {}, Kk = (e) => {
  var t = e.width, r = e.height, n = Pn(t), i = Pn(r);
  return n && i ? Lk : n ? Rk : i ? Bk : zk;
};
function Wk(e) {
  var t = e.width, r = e.height, n = e.aspect, i = t, a = r;
  return i === void 0 && a === void 0 ? (i = dr.width, a = dr.height) : i === void 0 ? i = n && n > 0 ? void 0 : dr.width : a === void 0 && (a = n && n > 0 ? void 0 : dr.height), {
    width: i,
    height: a
  };
}
var Fk = ["aspect", "initialDimension", "width", "height", "minWidth", "minHeight", "maxHeight", "children", "debounce", "id", "className", "onResize", "style"];
function fl() {
  return fl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fl.apply(null, arguments);
}
function nh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ih(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nh(Object(r), !0).forEach(function(n) {
      Uk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Uk(e, t, r) {
  return (t = Xk(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Xk(e) {
  var t = Hk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Hk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Yk(e, t) {
  return Zk(e) || qk(e, t) || Gk(e, t) || Vk();
}
function Vk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gk(e, t) {
  if (e) {
    if (typeof e == "string") return ah(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? ah(e, t) : void 0;
  }
}
function ah(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function qk(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function Zk(e) {
  if (Array.isArray(e)) return e;
}
function Jk(e, t) {
  if (e == null) return {};
  var r, n, i = Qk(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Qk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var D0 = /* @__PURE__ */ We(dr.initialDimension);
function ej(e) {
  return Pt(e.width) && Pt(e.height);
}
function M0(e) {
  var t = e.children, r = e.width, n = e.height, i = xe(() => ({
    width: r,
    height: n
  }), [r, n]);
  return ej(i) ? /* @__PURE__ */ y(D0.Provider, {
    value: i
  }, t) : null;
}
var gd = () => Ze(D0), tj = /* @__PURE__ */ Pe((e, t) => {
  var r = e.aspect, n = e.initialDimension, i = n === void 0 ? dr.initialDimension : n, a = e.width, o = e.height, l = e.minWidth, u = l === void 0 ? dr.minWidth : l, s = e.minHeight, c = e.maxHeight, d = e.children, f = e.debounce, v = f === void 0 ? dr.debounce : f, h = e.id, p = e.className, m = e.onResize, g = e.style, w = g === void 0 ? {} : g, x = Jk(e, Fk), A = H(null), P = H();
  P.current = m, Yc(t, () => A.current);
  var b = Ne({
    containerWidth: i.width,
    containerHeight: i.height
  }), O = Yk(b, 2), I = O[0], E = O[1], j = ue((R, K) => {
    E((N) => {
      var z = Math.round(R), W = Math.round(K);
      return N.containerWidth === z && N.containerHeight === W ? N : {
        containerWidth: z,
        containerHeight: W
      };
    });
  }, []);
  ae(() => {
    if (A.current == null || typeof ResizeObserver > "u")
      return mt;
    var R = (Z) => {
      var ne, ce = Z[0];
      if (ce != null) {
        var ve = ce.contentRect, Te = ve.width, Ke = ve.height;
        j(Te, Ke), (ne = P.current) === null || ne === void 0 || ne.call(P, Te, Ke);
      }
    };
    v > 0 && (R = Nk(R, v, {
      trailing: !0,
      leading: !1
    }));
    var K = new ResizeObserver(R), N = A.current.getBoundingClientRect(), z = N.width, W = N.height;
    return j(z, W), K.observe(A.current), () => {
      K.disconnect();
    };
  }, [j, v]);
  var T = I.containerWidth, k = I.containerHeight;
  Aa(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var _ = C0(T, k, {
    width: a,
    height: o,
    aspect: r,
    maxHeight: c
  }), $ = _.calculatedWidth, M = _.calculatedHeight;
  return Aa(T < 0 || k < 0 || $ != null && $ > 0 || M != null && M > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, $, M, a, o, u, s, r), /* @__PURE__ */ y("div", fl({
    id: h ? "".concat(h) : void 0,
    className: J("recharts-responsive-container", p),
    style: ih(ih({}, w), {}, {
      width: a,
      height: o,
      minWidth: u,
      minHeight: s,
      maxHeight: c
    }),
    ref: A
  }, x), /* @__PURE__ */ y("div", {
    style: Kk({
      width: a,
      height: o
    })
  }, /* @__PURE__ */ y(M0, {
    width: $,
    height: M
  }, d)));
}), O6 = /* @__PURE__ */ Pe((e, t) => {
  var r = gd();
  if (Pt(r.width) && Pt(r.height))
    return e.children;
  var n = Wk({
    width: e.width,
    height: e.height,
    aspect: e.aspect
  }), i = n.width, a = n.height, o = C0(void 0, void 0, {
    width: i,
    height: a,
    aspect: e.aspect,
    maxHeight: e.maxHeight
  }), l = o.calculatedWidth, u = o.calculatedHeight;
  return L(l) && L(u) ? /* @__PURE__ */ y(M0, {
    width: l,
    height: u
  }, e.children) : /* @__PURE__ */ y(tj, fl({}, e, {
    width: i,
    height: a,
    ref: t
  }));
}), Si = () => {
  var e, t = se(), r = C(T0), n = C(Fa), i = (e = C(Su)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !i ? r : {
    width: n.width - i.left - i.right,
    height: n.height - i.top - i.bottom,
    x: i.left,
    y: i.top
  };
}, rj = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, $0 = () => {
  var e;
  return (e = C(He)) !== null && e !== void 0 ? e : rj;
}, Ii = () => C(mr), ki = () => C(gr), nj = () => C((e) => e.layout.margin), te = (e) => e.layout.layoutType, Rr = () => C(te), Ua = () => {
  var e = Rr();
  if (e === "horizontal" || e === "vertical")
    return e;
}, bd = (e) => {
  var t = e.layout.layoutType;
  if (t === "centric" || t === "radial")
    return t;
}, Xa = () => C(bd), ij = () => {
  var e = Rr();
  return e !== void 0;
}, Dn = (e) => {
  var t = ee(), r = se(), n = e.width, i = e.height, a = gd(), o = n, l = i;
  return a && (o = a.width > 0 ? a.width : n, l = a.height > 0 ? a.height : i), ae(() => {
    !r && Pt(o) && Pt(l) && t(lk({
      width: o,
      height: l
    }));
  }, [t, r, o, l]), null;
}, xd = (e) => {
  var t = e.margin, r = ee();
  return ae(() => {
    r(A0(t));
  }, [r, t]), null;
}, aj = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
    itemSorter: "value",
    position: void 0,
    offset: 0
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
}, _0 = ht({
  name: "legend",
  initialState: aj,
  reducers: {
    setLegendSize(e, t) {
      e.size.width = t.payload.width, e.size.height = t.payload.height;
    },
    setLegendSettings(e, t) {
      e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter, e.settings.position = t.payload.position, e.settings.offset = t.payload.offset;
    },
    addLegendPayload: {
      reducer(e, t) {
        e.payload.push(ye(t.payload));
      },
      prepare: Ee()
    },
    replaceLegendPayload: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = zt(e).payload.indexOf(ye(n));
        a > -1 && (e.payload[a] = ye(i));
      },
      prepare: Ee()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = zt(e).payload.indexOf(ye(t.payload));
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: Ee()
    }
  }
}), Ha = _0.actions, oh = Ha.setLegendSize, oj = Ha.setLegendSettings, N0 = Ha.addLegendPayload, L0 = Ha.replaceLegendPayload, R0 = Ha.removeLegendPayload, lj = _0.reducer, As = { exports: {} }, Ps = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lh;
function uj() {
  if (lh) return Ps;
  lh = 1;
  var e = od;
  function t(u, s) {
    return u === s && (u !== 0 || 1 / u === 1 / s) || u !== u && s !== s;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, i = e.useRef, a = e.useEffect, o = e.useMemo, l = e.useDebugValue;
  return Ps.useSyncExternalStoreWithSelector = function(u, s, c, d, f) {
    var v = i(null);
    if (v.current === null) {
      var h = { hasValue: !1, value: null };
      v.current = h;
    } else h = v.current;
    v = o(
      function() {
        function m(P) {
          if (!g) {
            if (g = !0, w = P, P = d(P), f !== void 0 && h.hasValue) {
              var b = h.value;
              if (f(b, P))
                return x = b;
            }
            return x = P;
          }
          if (b = x, r(w, P)) return b;
          var O = d(P);
          return f !== void 0 && f(b, O) ? (w = P, b) : (w = P, x = O);
        }
        var g = !1, w, x, A = c === void 0 ? null : c;
        return [
          function() {
            return m(s());
          },
          A === null ? void 0 : function() {
            return m(A());
          }
        ];
      },
      [s, c, d, f]
    );
    var p = n(u, v[0], v[1]);
    return a(
      function() {
        h.hasValue = !0, h.value = p;
      },
      [p]
    ), l(p), p;
  }, Ps;
}
var uh;
function sj() {
  return uh || (uh = 1, As.exports = uj()), As.exports;
}
sj();
function cj(e) {
  e();
}
function dj() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      cj(() => {
        let r = e;
        for (; r; )
          r.callback(), r = r.next;
      });
    },
    get() {
      const r = [];
      let n = e;
      for (; n; )
        r.push(n), n = n.next;
      return r;
    },
    subscribe(r) {
      let n = !0;
      const i = t = {
        callback: r,
        next: null,
        prev: t
      };
      return i.prev ? i.prev.next = i : e = i, function() {
        !n || e === null || (n = !1, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e = i.next);
      };
    }
  };
}
var sh = {
  notify() {
  },
  get: () => []
};
function fj(e, t) {
  let r, n = sh, i = 0, a = !1;
  function o(p) {
    c();
    const m = n.subscribe(p);
    let g = !1;
    return () => {
      g || (g = !0, m(), d());
    };
  }
  function l() {
    n.notify();
  }
  function u() {
    h.onStateChange && h.onStateChange();
  }
  function s() {
    return a;
  }
  function c() {
    i++, r || (r = e.subscribe(u), n = dj());
  }
  function d() {
    i--, r && i === 0 && (r(), r = void 0, n.clear(), n = sh);
  }
  function f() {
    a || (a = !0, c());
  }
  function v() {
    a && (a = !1, d());
  }
  const h = {
    addNestedSub: o,
    notifyNestedSubs: l,
    handleChangeWrapper: u,
    isSubscribed: s,
    trySubscribe: f,
    tryUnsubscribe: v,
    getListeners: () => n
  };
  return h;
}
var vj = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", hj = /* @__PURE__ */ vj(), pj = () => typeof navigator < "u" && navigator.product === "ReactNative", yj = /* @__PURE__ */ pj(), mj = () => hj || yj ? ke : ae, gj = /* @__PURE__ */ mj();
function ch(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function bj(e, t) {
  if (ch(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, r[i]) || !ch(e[r[i]], t[r[i]]))
      return !1;
  return !0;
}
var xj = /* @__PURE__ */ Symbol.for("react-redux-context"), wj = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function Aj() {
  if (!We) return {};
  const e = wj[xj] ??= /* @__PURE__ */ new Map();
  let t = e.get(We);
  return t || (t = We(
    null
  ), e.set(We, t)), t;
}
var Pj = /* @__PURE__ */ Aj();
function Oj(e) {
  const { children: t, context: r, serverState: n, store: i } = e, a = xe(() => {
    const u = fj(i);
    return {
      store: i,
      subscription: u,
      getServerState: n ? () => n : void 0
    };
  }, [i, n]), o = xe(() => i.getState(), [i]);
  return gj(() => {
    const { subscription: u } = a;
    return u.onStateChange = u.notifyNestedSubs, u.trySubscribe(), o !== i.getState() && u.notifyNestedSubs(), () => {
      u.tryUnsubscribe(), u.onStateChange = void 0;
    };
  }, [a, o]), /* @__PURE__ */ y((r || Pj).Provider, { value: a }, t);
}
var Sj = Oj, Ij = /* @__PURE__ */ new Set([
  "axisLine",
  "tickLine",
  "activeBar",
  "activeDot",
  "activeLabel",
  "activeShape",
  "allowEscapeViewBox",
  "background",
  "cursor",
  "dot",
  "label",
  "line",
  "margin",
  "padding",
  "position",
  "shape",
  "style",
  "tick",
  "wrapperStyle",
  // radius can be an array of 4 numbers, easy to compare shallowly
  "radius",
  "throttledEvents"
]);
function kj(e, t) {
  return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function Br(e, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var n of r)
    if (Ij.has(n)) {
      if (e[n] == null && t[n] == null)
        continue;
      if (!bj(e[n], t[n]))
        return !1;
    } else if (!kj(e[n], t[n]))
      return !1;
  return !0;
}
var jj = S([mr, gr, hd], (e, t, r) => ({
  x: r.left || 0,
  y: r.top || 0,
  width: Math.max(e - (r.left || 0) - (r.right || 0), 0),
  height: Math.max(t - (r.top || 0) - (r.bottom || 0), 0)
}));
function Tj(e, t) {
  var r;
  if (e === "start" && t === "start")
    return "";
  var n = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  }, i = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  }, a = e === "inherit" ? "0" : n[e], o = (r = i[t]) !== null && r !== void 0 ? r : "0";
  return "translate(".concat(a, ", ").concat(o, ")");
}
var Ej = ["contextPayload"];
function fc() {
  return fc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fc.apply(null, arguments);
}
function Cj(e, t) {
  return _j(e) || $j(e, t) || Mj(e, t) || Dj();
}
function Dj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Mj(e, t) {
  if (e) {
    if (typeof e == "string") return dh(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? dh(e, t) : void 0;
  }
}
function dh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function $j(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function _j(e) {
  if (Array.isArray(e)) return e;
}
function fh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ci(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fh(Object(r), !0).forEach(function(n) {
      Nj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Nj(e, t, r) {
  return (t = Lj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Lj(e) {
  var t = Rj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Rj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bj(e, t) {
  if (e == null) return {};
  var r, n, i = zj(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function zj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Kj(e) {
  return e.value;
}
function Wj(e) {
  var t = e.contextPayload, r = Bj(e, Ej), n = Wb(t, e.payloadUniqBy, Kj), i = ci(ci({}, r), {}, {
    payload: n
  });
  return /* @__PURE__ */ ie(e.content) ? /* @__PURE__ */ Ae(e.content, i) : typeof e.content == "function" ? /* @__PURE__ */ y(e.content, i) : /* @__PURE__ */ y(lI, i);
}
function Fj(e) {
  return e === "left" || e === "right" || e === "insideLeft" || e === "insideRight" ? "vertical" : "horizontal";
}
function Uj(e, t) {
  return t == null ? null : Jc(t) ? jj(e) : T0(e);
}
function Xj(e, t, r) {
  return e === "top" ? {
    top: r.height + t
  } : e === "bottom" ? {
    top: -r.height - t
  } : e === "left" ? {
    left: r.width + t
  } : e === "right" ? {
    left: -r.width - t
  } : {};
}
function Hj(e, t, r, n, i, a) {
  var o = t.layout, l = t.align, u = t.verticalAlign, s, c;
  return (!e || (e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null)) && (l === "center" && o === "vertical" ? s = {
    left: ((n || 0) - a.width) / 2
  } : s = l === "right" ? {
    right: r && r.right || 0
  } : {
    left: r && r.left || 0
  }), (!e || (e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null)) && (u === "middle" ? c = {
    top: ((i || 0) - a.height) / 2
  } : c = u === "bottom" ? {
    bottom: r && r.bottom || 0
  } : {
    top: r && r.top || 0
  }), ci(ci({}, s), c);
}
function Yj(e) {
  var t = e.align, r = e.layout, n = e.verticalAlign, i = e.itemSorter, a = e.position, o = e.offset, l = ee();
  return ke(() => {
    l(oj({
      align: t,
      layout: r,
      verticalAlign: n,
      itemSorter: i,
      position: a,
      offset: o
    }));
  }, [l, t, r, n, i, a, o]), null;
}
function Vj(e) {
  var t = e.width, r = e.height, n = ee();
  return ke(() => {
    n(oh({
      width: t,
      height: r
    }));
  }, [n, t, r]), ke(() => () => {
    n(oh({
      width: 0,
      height: 0
    }));
  }, [n]), null;
}
function Gj(e, t, r, n) {
  return e === "vertical" && t != null ? {
    height: t
  } : e === "horizontal" ? {
    width: r || n
  } : null;
}
var qj = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  labelStyle: {},
  layout: "auto",
  verticalAlign: "bottom",
  offset: 0
};
function Zj(e) {
  var t, r, n, i, a, o, l, u, s = re(e, qj), c = e.layout && e.layout !== "auto" ? e.layout : Fj(s.position), d = r1(), f = iS(), v = nj(), h = C((W) => Uj(W, s.position)), p = s.width, m = s.height, g = s.wrapperStyle, w = s.portal, x = w == null && (s.position == null || Jc(s.position)), A = Hb([d]), P = Cj(A, 2), b = P[0], O = P[1], I = Ii(), E = ki();
  if (I == null || E == null || s.position != null && h == null)
    return null;
  var j = I - (v?.left || 0) - (v?.right || 0), T = Gj(c, m, p, j), k = s.position == null ? null : Vg({
    /*
     * When calculating the position we use two different view boxes.
     * Inside positions use the plot area; outside positions use the margin-inset
     * chart area, placing the Legend beyond any axes.
     */
    viewBox: h ?? {
      x: 0,
      y: 0,
      width: I,
      height: E
    },
    position: s.position,
    offset: (t = s.offset) !== null && t !== void 0 ? t : 0
  }), _ = Xj(s.position, (r = s.offset) !== null && r !== void 0 ? r : 0, b), $ = c === "vertical" ? ((n = h?.width) !== null && n !== void 0 ? n : 0) / 2 : (i = h?.width) !== null && i !== void 0 ? i : 0, M = c === "horizontal" ? ((a = h?.height) !== null && a !== void 0 ? a : 0) / 2 : (o = h?.height) !== null && o !== void 0 ? o : 0, R = k ? {
    width: "max-content",
    height: "max-content",
    maxWidth: $,
    maxHeight: M,
    overflowY: "auto",
    top: k.y + ((l = _.top) !== null && l !== void 0 ? l : 0),
    left: k.x + ((u = _.left) !== null && u !== void 0 ? u : 0),
    transform: Tj(k.horizontalAnchor, k.verticalAnchor)
  } : Hj(g, s, v, I, E, b), K = w ? g : ci(ci({
    position: "absolute",
    width: T?.width || p || "auto",
    height: T?.height || m || "auto"
  }, R), g), N = w ?? f;
  if (N == null || d == null)
    return null;
  var z = /* @__PURE__ */ y("div", {
    className: "recharts-legend-wrapper",
    style: K,
    ref: O
  }, /* @__PURE__ */ y(Yj, {
    layout: c,
    align: s.align,
    verticalAlign: s.verticalAlign,
    itemSorter: s.itemSorter,
    position: s.position,
    offset: s.offset
  }), x && /* @__PURE__ */ y(Vj, b), /* @__PURE__ */ y(Wj, fc({}, s, {
    layout: c
  }, T, {
    margin: v,
    chartWidth: I,
    chartHeight: E,
    contextPayload: d
  })));
  return /* @__PURE__ */ Gc(z, N);
}
var Jj = /* @__PURE__ */ De(Zj, Br);
Jj.displayName = "Legend";
function vc() {
  return vc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vc.apply(null, arguments);
}
function vh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vh(Object(r), !0).forEach(function(n) {
      Qj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Qj(e, t, r) {
  return (t = eT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eT(e) {
  var t = tT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function tT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rT(e, t) {
  return oT(e) || aT(e, t) || iT(e, t) || nT();
}
function nT() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function iT(e, t) {
  if (e) {
    if (typeof e == "string") return hh(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? hh(e, t) : void 0;
  }
}
function hh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function aT(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function oT(e) {
  if (Array.isArray(e)) return e;
}
function lT(e) {
  return Array.isArray(e) && tt(e[0]) && tt(e[1]) ? e.join(" ~ ") : e;
}
var Un = {
  separator: " : ",
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  },
  itemStyle: {
    display: "block",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#000"
  },
  labelStyle: {},
  accessibilityLayer: !1
};
function uT(e, t) {
  return t == null ? e : fu(e, t);
}
var sT = (e) => {
  var t = e.separator, r = t === void 0 ? Un.separator : t, n = e.contentStyle, i = e.itemStyle, a = e.labelStyle, o = a === void 0 ? Un.labelStyle : a, l = e.payload, u = e.formatter, s = e.itemSorter, c = e.wrapperClassName, d = e.labelClassName, f = e.label, v = e.labelFormatter, h = e.accessibilityLayer, p = h === void 0 ? Un.accessibilityLayer : h, m = () => {
    if (l && l.length) {
      var I = {
        padding: 0,
        margin: 0
      }, E = uT(l, s), j = E.map((T, k) => {
        if (!T || T.type === "none")
          return null;
        var _ = T.formatter || u || lT, $ = T.value, M = T.name, R = $, K = M;
        if (_) {
          var N = _($, M, T, k, l);
          if (Array.isArray(N)) {
            var z = rT(N, 2);
            R = z[0], K = z[1];
          } else if (N != null)
            R = N;
          else
            return null;
        }
        var W = Zi(Zi({}, Un.itemStyle), {}, {
          color: T.color || Un.itemStyle.color
        }, i);
        return /* @__PURE__ */ y("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(k),
          style: W
        }, tt(K) ? /* @__PURE__ */ y("span", {
          className: "recharts-tooltip-item-name"
        }, K) : null, tt(K) ? /* @__PURE__ */ y("span", {
          className: "recharts-tooltip-item-separator"
        }, r) : null, /* @__PURE__ */ y("span", {
          className: "recharts-tooltip-item-value"
        }, R), /* @__PURE__ */ y("span", {
          className: "recharts-tooltip-item-unit"
        }, T.unit || ""));
      });
      return /* @__PURE__ */ y("ul", {
        className: "recharts-tooltip-item-list",
        style: I
      }, j);
    }
    return null;
  }, g = Zi(Zi({}, Un.contentStyle), n), w = Zi({
    margin: 0
  }, o), x = !he(f), A = x ? f : "", P = J("recharts-default-tooltip", c), b = J("recharts-tooltip-label", d);
  x && v && l !== void 0 && l !== null && (A = v(f, l));
  var O = p ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ y("div", vc({
    className: P,
    style: g
  }, O), /* @__PURE__ */ y("p", {
    className: b,
    style: w
  }, /* @__PURE__ */ ie(A) ? A : "".concat(A)), m());
}, Ji = "recharts-tooltip-wrapper", cT = {
  visibility: "hidden"
};
function dT(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return J(Ji, {
    ["".concat(Ji, "-right")]: L(r) && t && L(t.x) && r >= t.x,
    ["".concat(Ji, "-left")]: L(r) && t && L(t.x) && r < t.x,
    ["".concat(Ji, "-bottom")]: L(n) && t && L(t.y) && n >= t.y,
    ["".concat(Ji, "-top")]: L(n) && t && L(t.y) && n < t.y
  });
}
function ph(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, i = e.offset, a = e.position, o = e.reverseDirection, l = e.tooltipDimension, u = e.viewBox, s = e.viewBoxDimension;
  if (a && L(a[n]))
    return a[n];
  var c = r[n] - l - (i > 0 ? i : 0), d = r[n] + i;
  if (t[n])
    return o[n] ? c : d;
  var f = u[n];
  if (f == null)
    return 0;
  if (o[n]) {
    var v = c, h = f;
    return v < h ? Math.max(d, f) : Math.max(c, f);
  }
  if (s == null)
    return 0;
  var p = d + l, m = f + s;
  return p > m ? Math.max(c, f) : Math.max(d, f);
}
function fT(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function vT(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTop, i = e.offsetLeft, a = e.position, o = e.reverseDirection, l = e.tooltipBox, u = e.useTranslate3d, s = e.viewBox, c, d, f;
  return l && l.height > 0 && l.width > 0 && r ? (d = ph({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), f = ph({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offset: n,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = fT({
    translateX: d,
    translateY: f,
    useTranslate3d: u
  })) : c = cT, {
    cssProperties: c,
    cssClasses: dT({
      translateX: d,
      translateY: f,
      coordinate: r
    })
  };
}
var hT = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), Mn = {
  devToolsEnabled: !0,
  isSsr: hT()
};
function pT(e, t) {
  return bT(e) || gT(e, t) || mT(e, t) || yT();
}
function yT() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mT(e, t) {
  if (e) {
    if (typeof e == "string") return yh(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? yh(e, t) : void 0;
  }
}
function yh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function gT(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function bT(e) {
  if (Array.isArray(e)) return e;
}
function wd() {
  var e = Ne(() => Mn.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches), t = pT(e, 2), r = t[0], n = t[1];
  return ae(() => {
    if (window.matchMedia) {
      var i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => {
        n(i.matches);
      };
      return i.addEventListener("change", a), () => {
        i.removeEventListener("change", a);
      };
    }
  }, []), r;
}
function mh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mh(Object(r), !0).forEach(function(n) {
      xT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xT(e, t, r) {
  return (t = wT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wT(e) {
  var t = AT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function PT(e, t) {
  return kT(e) || IT(e, t) || ST(e, t) || OT();
}
function OT() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ST(e, t) {
  if (e) {
    if (typeof e == "string") return gh(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? gh(e, t) : void 0;
  }
}
function gh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function IT(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function kT(e) {
  if (Array.isArray(e)) return e;
}
function jT(e) {
  if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active) {
    var t = typeof e.animationEasing == "string" ? e.animationEasing : "ease";
    return "transform ".concat(e.animationDuration, "ms ").concat(t);
  }
}
function TT(e) {
  var t, r, n, i, a, o, l = wd(), u = Ne(() => ({
    dismissed: !1,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  })), s = PT(u, 2), c = s[0], d = s[1];
  ae(() => {
    var g = (w) => {
      if (w.key === "Escape") {
        var x, A, P, b;
        d({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (x = (A = e.coordinate) === null || A === void 0 ? void 0 : A.x) !== null && x !== void 0 ? x : 0,
            y: (P = (b = e.coordinate) === null || b === void 0 ? void 0 : b.y) !== null && P !== void 0 ? P : 0
          }
        });
      }
    };
    return document.addEventListener("keydown", g), () => {
      document.removeEventListener("keydown", g);
    };
  }, [(t = e.coordinate) === null || t === void 0 ? void 0 : t.x, (r = e.coordinate) === null || r === void 0 ? void 0 : r.y]), c.dismissed && (((n = (i = e.coordinate) === null || i === void 0 ? void 0 : i.x) !== null && n !== void 0 ? n : 0) !== c.dismissedAtCoordinate.x || ((a = (o = e.coordinate) === null || o === void 0 ? void 0 : o.y) !== null && a !== void 0 ? a : 0) !== c.dismissedAtCoordinate.y) && d(Xn(Xn({}, c), {}, {
    dismissed: !1
  }));
  var f = vT({
    allowEscapeViewBox: e.allowEscapeViewBox,
    coordinate: e.coordinate,
    offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
    offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
    position: e.position,
    reverseDirection: e.reverseDirection,
    tooltipBox: e.lastBoundingBox,
    useTranslate3d: e.useTranslate3d,
    viewBox: e.viewBox
  }), v = f.cssClasses, h = f.cssProperties, p = e.hasPortalFromProps ? {} : Xn(Xn({
    transition: jT({
      prefersReducedMotion: l,
      isAnimationActive: e.isAnimationActive,
      active: e.active,
      animationDuration: e.animationDuration,
      animationEasing: e.animationEasing
    })
  }, h), {}, {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0
  }), m = Xn(Xn({}, p), {}, {
    visibility: !c.dismissed && e.active && e.hasPayload ? "visible" : "hidden"
  }, e.wrapperStyle);
  return /* @__PURE__ */ y("div", {
    // @ts-expect-error TypeScript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: v,
    style: m,
    ref: e.innerRef
  }, e.children);
}
var ET = /* @__PURE__ */ De(TT), B0 = () => {
  var e;
  return (e = C((t) => t.rootProps.accessibilityLayer)) !== null && e !== void 0 ? e : !0;
};
function hc() {
  return hc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, hc.apply(null, arguments);
}
function bh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bh(Object(r), !0).forEach(function(n) {
      CT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function CT(e, t, r) {
  return (t = DT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DT(e) {
  var t = MT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function MT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wh = {
  curveBasisClosed: PS,
  curveBasisOpen: OS,
  curveBasis: AS,
  curveBumpX: uS,
  curveBumpY: sS,
  curveLinearClosed: SS,
  curveLinear: lu,
  curveMonotoneX: IS,
  curveMonotoneY: kS,
  curveNatural: jS,
  curveStep: TS,
  curveStepAfter: CS,
  curveStepBefore: ES
}, vl = (e) => Q(e.x) && Q(e.y), Ah = (e) => e.base != null && vl(e.base) && vl(e), Qi = (e) => e.x, ea = (e) => e.y, $T = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(Ra(e));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = wh["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n)
      return n;
  }
  return wh[r] || lu;
}, Ph = {
  connectNulls: !1,
  type: "linear"
}, _T = (e) => {
  var t = e.type, r = t === void 0 ? Ph.type : t, n = e.points, i = n === void 0 ? [] : n, a = e.baseLine, o = e.layout, l = e.connectNulls, u = l === void 0 ? Ph.connectNulls : l, s = $T(r, o), c = u ? i.filter(vl) : i;
  if (Array.isArray(a)) {
    var d, f = i.map((g, w) => xh(xh({}, g), {}, {
      base: a[w]
    }));
    o === "vertical" ? d = mo().y(ea).x1(Qi).x0((g) => g.base.x) : d = mo().x(Qi).y1(ea).y0((g) => g.base.y);
    var v = d.defined(Ah).curve(s), h = u ? f.filter(Ah) : f;
    return v(h);
  }
  var p;
  o === "vertical" && L(a) ? p = mo().y(ea).x1(Qi).x0(a) : L(a) ? p = mo().x(Qi).y1(ea).y0(a) : p = tb().x(Qi).y(ea);
  var m = p.defined(vl).curve(s);
  return m(c);
}, xn = (e) => {
  var t = e.className, r = e.points, n = e.path, i = e.pathRef, a = Rr();
  if ((!r || !r.length) && !n)
    return null;
  var o = {
    type: e.type,
    points: e.points,
    baseLine: e.baseLine,
    layout: e.layout || a,
    connectNulls: e.connectNulls
  }, l = r && r.length ? _T(o) : n;
  return /* @__PURE__ */ y("path", hc({}, oe(e), rd(e), {
    className: J("recharts-curve", t),
    d: l === null ? void 0 : l,
    ref: i
  }));
}, NT = ["x", "y", "top", "left", "width", "height", "className"];
function pc() {
  return pc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pc.apply(null, arguments);
}
function Oh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function LT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Oh(Object(r), !0).forEach(function(n) {
      RT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Oh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function RT(e, t, r) {
  return (t = BT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function BT(e) {
  var t = zT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function zT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KT(e, t) {
  if (e == null) return {};
  var r, n, i = WT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function WT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var FT = (e, t, r, n, i, a) => "M".concat(e, ",").concat(i, "v").concat(n, "M").concat(a, ",").concat(t, "h").concat(r), UT = (e) => {
  var t = e.x, r = t === void 0 ? 0 : t, n = e.y, i = n === void 0 ? 0 : n, a = e.top, o = a === void 0 ? 0 : a, l = e.left, u = l === void 0 ? 0 : l, s = e.width, c = s === void 0 ? 0 : s, d = e.height, f = d === void 0 ? 0 : d, v = e.className, h = KT(e, NT), p = LT({
    x: r,
    y: i,
    top: o,
    left: u,
    width: c,
    height: f
  }, h);
  return !L(r) || !L(i) || !L(c) || !L(f) || !L(o) || !L(u) ? null : /* @__PURE__ */ y("path", pc({}, $e(p), {
    className: J("recharts-cross", v),
    d: FT(r, i, c, f, o, u)
  }));
};
function XT(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
var hl = 1e-4, z0 = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], K0 = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), Sh = (e, t) => (r) => {
  var n = z0(e, t);
  return K0(n, r);
}, HT = (e, t) => (r) => {
  var n = z0(e, t), i = [...n.map((a, o) => a * o).slice(1), 0];
  return K0(i, r);
}, YT = (e) => {
  var t, r = e.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier")
    return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4)
    return null;
  var i = n.map((a) => parseFloat(a));
  return [i[0], i[1], i[2], i[3]];
}, VT = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        return [0, 0, 1, 1];
      case "ease":
        return [0.25, 0.1, 0.25, 1];
      case "ease-in":
        return [0.42, 0, 1, 1];
      case "ease-out":
        return [0.42, 0, 0.58, 1];
      case "ease-in-out":
        return [0, 0, 0.58, 1];
      default: {
        var i = YT(r[0]);
        if (i)
          return i;
      }
    }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, GT = (e, t, r, n) => {
  var i = Sh(e, r), a = Sh(t, n), o = HT(e, r), l = (s) => s > 1 ? 1 : s < 0 ? 0 : s, u = (s) => {
    for (var c = s > 1 ? 1 : s, d = c, f = 0; f < 8; ++f) {
      var v = i(d) - c, h = o(d);
      if (Math.abs(v - c) < hl || h < hl)
        return a(d);
      d = l(d - v / h);
    }
    return a(d);
  };
  return u.isStepper = !1, u;
}, Ih = function() {
  return GT(...VT(...arguments));
}, qT = function() {
  for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, i = t.damping, a = i === void 0 ? 8 : i, o = t.dt, l = o === void 0 ? 16.67 : o, u = 1, s = [0], c = 0, d = 0, f = 1e4, v = 0; v < f; ) {
    var h = -(c - u) * n, p = d * a;
    if (d += (h - p) * l / 1e3, c += d * l / 1e3, s.push(c), Math.abs(c - u) < hl && Math.abs(d) < hl)
      break;
    v++;
  }
  s[s.length - 1] = u;
  var m = s.length - 1;
  return (g) => {
    var w, x, A;
    if (g <= 0) return 0;
    if (g >= 1) return u;
    var P = g * m, b = Math.floor(P), O = P - b;
    return ((w = s[b]) !== null && w !== void 0 ? w : 0) + (((x = s[b + 1]) !== null && x !== void 0 ? x : 0) - ((A = s[b]) !== null && A !== void 0 ? A : 0)) * O;
  };
}, ZT = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return Ih(e);
      case "spring":
        return qT();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return Ih(e);
    }
  return typeof e == "function" ? e : null;
}, JT = (e, t, r) => {
  var n, i = (a) => {
    var o = t.tick(a);
    if (t.getState() === "active") {
      if (r(t.getInterpolated()), t.getProgress() === 1) {
        t.complete(), n = void 0;
        return;
      }
      n = e.setTimeout(i, o);
      return;
    }
    n = e.setTimeout(i, o);
  };
  return n = e.setTimeout(i, 0), () => {
    var a;
    return (a = n) === null || a === void 0 ? void 0 : a();
  };
}, W0 = /* @__PURE__ */ We(JT), S6 = W0.Provider;
function F0(e) {
  var t = Ze(W0);
  return xe(() => e ?? t, [e, t]);
}
function QT(e, t, r) {
  return (t = eE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eE(e) {
  var t = tE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function tE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kh = "init", jh = "pending", Th = "active", rE = "completed";
function zo(e) {
  return Math.max(0, e);
}
class U0 {
  /**
   * Returns the absolute time after the animationBegin delay has been completed,
   * and when the animationDuration started ticking.
   */
  getAnimationStartedTime() {
    return this.animationStartedTime;
  }
  /**
   * Returns the absolute time of when the animation began - now it will wait for {animationBegin} ms before the transition starts
   */
  getBeginStartedTime() {
    return this.beginStartedTime;
  }
  constructor(t) {
    var r;
    QT(this, "state", kh), this.animationId = t.animationId, this.onAnimationEnd = t.onAnimationEnd, this.animationDuration = zo(t.animationDuration), this.animationBegin = zo(t.animationBegin), this.progress = 0, this.from = t.from, this.to = t.to, this.easing = t.easing, (r = t.onAnimationStart) === null || r === void 0 || r.call(t);
  }
  /**
   * Returns the state machine current state
   * - `init`:       animation had just been created. It immediately calls `onAnimationStart`
   * - `pending`:    animation is now paused for `animationBegin` milliseconds until the transition begins
   * - `active`:     animation is transitioning items on screen
   * - `completed`:  animation has completed its transition and executed `onAnimationEnd`.
   *                 This state is final and the animation is no longer allowed to transition to other states.
   */
  getState() {
    return this.state;
  }
  /**
   * Returns the easing input or function
   */
  getEasing() {
    return this.easing;
  }
  /**
   * Returns the configuration - the duration of the transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationDuration() {
    return this.animationDuration;
  }
  /**
   * Sets the current time of the animation. The animation sets its internal state and progress accordingly.
   * This is current, absolute time; not additive!
   * This allows you to essentially "travel back in time" based on the value you pass in here.
   *
   * Returns the (relative) time remaining until the current activity is over.
   * Meaning: if the state is in a middle of a delay, returns the time left until the delay is finished.
   * If the state is in the middle of a transition, returns time left until that transition is complete.
   * This is useful because it's the same number you can take and put into setTimeout(fn, X)
   * as that's how much time we need to wait until the next state transition happens.
   */
  tick(t) {
    if (this.getState() === kh)
      return this.state = jh, this.beginStartedTime = t, this.animationBegin;
    if (this.getState() === jh) {
      if (this.beginStartedTime == null)
        throw new Error();
      var r = t - this.beginStartedTime;
      return r >= this.animationBegin ? (this.state = Th, this.animationStartedTime = t, this.nextAnimationUpdate(0)) : zo(this.animationBegin - r);
    }
    if (this.getState() === Th) {
      if (this.animationStartedTime == null)
        throw new Error();
      var n = t - this.animationStartedTime;
      return this.setProgress(n / this.animationDuration), this.nextAnimationUpdate(n);
    }
    return 0;
  }
  setProgress(t) {
    this.progress = Math.min(1, Math.max(0, t));
  }
  /**
   * Returns an abstract "progress" which is number between 0 and 1 which shows the distance of transition.
   * This progress depends on the animation state:
   * - `init`: 0
   * - `pending`: 0
   * - `active`: transitioning between [0, 1] based on the time elapsed
   * - `completed`: 1
   *
   * The progress is hard-capped to be between 0 and 1 (inclusive) to avoid overshooting caused by coarse timers.
   * For this reason, the easing function must be applied _after_ this animation state,
   * so that one has a chance to construct dynamic "overshoot" animations.
   *
   * The progress is linear with time.
   * If you wish for easing, use `getInterpolated()` instead.
   */
  getProgress() {
    return this.progress;
  }
  /**
   * Completes the animation. Completed animation:
   * - cannot be manipulated anymore
   * - its progress is set to 1
   * - tick function doesn't do anything
   * - getState() always returns 'completed'
   */
  complete() {
    if (this.progress = 1, this.state === "active") {
      var t;
      (t = this.onAnimationEnd) === null || t === void 0 || t.call(this);
    }
    this.state = rE;
  }
  /**
   * Returns the starting value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static starting value
   */
  getFrom() {
    return this.from;
  }
  /**
   * Returns the end value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static end value
   */
  getTo() {
    return this.to;
  }
  /**
   * Unique identifier of an animation
   */
  getAnimationId() {
    return this.animationId;
  }
  /**
   * Returns the configuration - the duration of delay in between animation initialization, and transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationBegin() {
    return this.animationBegin;
  }
  /**
   * Returns value of the transition at the current time.
   * The exact details differ based on the animation type
   */
  /**
   * Returns the duration of time of when the controller should ask for the next update
   */
}
class nE extends U0 {
  // eslint-disable-next-line class-methods-use-this
  nextAnimationUpdate() {
    return 0;
  }
  /**
   * Returns value of the animation after its easing function had been applied.
   * This value, unlike getProgress(), can escape the [0..1] range
   * because this is entirely within the easing function control. Spring typically does this.
   */
  getInterpolated() {
    return this.easing(V(this.getFrom(), this.getTo(), this.getProgress()));
  }
}
class iE extends U0 {
  nextAnimationUpdate(t) {
    return zo(this.animationDuration - t);
  }
  /**
   * Returns the final value of the animation (the `to`).
   *
   * CSS transitions leave both interpolation and easing to the browser,
   * so all we need to do here is return the final state
   * and let browser handle the rest.
   */
  getInterpolated() {
    return this.getTo();
  }
}
class X0 {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, a = (o) => {
      o - n >= r ? t(o) : i = requestAnimationFrame(a);
    };
    return i = requestAnimationFrame(a), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
}
function aE(e, t) {
  return sE(e) || uE(e, t) || lE(e, t) || oE();
}
function oE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lE(e, t) {
  if (e) {
    if (typeof e == "string") return Eh(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Eh(e, t) : void 0;
  }
}
function Eh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function uE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function sE(e) {
  if (Array.isArray(e)) return e;
}
var cE = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, Ch = 0, Os = 1;
function Ad(e) {
  var t = re(e, cE), r = t.animationId, n = t.isActive, i = t.canBegin, a = t.duration, o = t.easing, l = t.begin, u = t.onAnimationEnd, s = t.onAnimationStart, c = t.children, d = wd(), f = n === "auto" ? !Mn.isSsr && !d : n, v = F0(t.animationController), h = Ne(f ? Ch : Os), p = aE(h, 2), m = p[0], g = p[1];
  return ae(() => {
    f || g(Os);
  }, [f]), ae(() => {
    var w = ZT(o);
    if (!f || !i || w == null)
      return mt;
    var x = new X0(), A = new nE({
      animationId: r,
      easing: w,
      animationDuration: a,
      animationBegin: l,
      onAnimationStart: s,
      onAnimationEnd: u,
      from: Ch,
      to: Os
    });
    return v(x, A, g);
  }, [v, r, f, i, a, o, l, s, u]), c(Number(m));
}
function Pd(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = H(oi(t)), n = H(e);
  return n.current !== e && (r.current = oi(t), n.current = e), r.current;
}
var dE = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), Od = (e, t, r) => e.map((n) => "".concat(dE(n), " ").concat(t, "ms ").concat(r)).join(","), fE = ["radius"], vE = ["radius"], Dh, Mh, $h, _h, Nh, Lh, Rh, Bh, zh, Kh;
function Wh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Fh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wh(Object(r), !0).forEach(function(n) {
      hE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hE(e, t, r) {
  return (t = pE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pE(e) {
  var t = yE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function yE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function pl() {
  return pl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pl.apply(null, arguments);
}
function Uh(e, t) {
  if (e == null) return {};
  var r, n, i = mE(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function mE(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function gE(e, t) {
  return AE(e) || wE(e, t) || xE(e, t) || bE();
}
function bE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xE(e, t) {
  if (e) {
    if (typeof e == "string") return Xh(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Xh(e, t) : void 0;
  }
}
function Xh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function wE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function AE(e) {
  if (Array.isArray(e)) return e;
}
function sr(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Hh = (e, t, r, n, i) => {
  var a = kr(r), o = kr(n), l = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), u = o >= 0 ? 1 : -1, s = a >= 0 ? 1 : -1, c = o >= 0 && a >= 0 || o < 0 && a < 0 ? 1 : 0, d;
  if (l > 0 && Array.isArray(i)) {
    for (var f = [0, 0, 0, 0], v = 0, h = 4; v < h; v++) {
      var p, m = (p = i[v]) !== null && p !== void 0 ? p : 0;
      f[v] = m > l ? l : m;
    }
    d = Le(Dh || (Dh = sr(["M", ",", ""])), e, t + u * f[0]), f[0] > 0 && (d += Le(Mh || (Mh = sr(["A ", ",", ",0,0,", ",", ",", ""])), f[0], f[0], c, e + s * f[0], t)), d += Le($h || ($h = sr(["L ", ",", ""])), e + r - s * f[1], t), f[1] > 0 && (d += Le(_h || (_h = sr(["A ", ",", ",0,0,", `,
        `, ",", ""])), f[1], f[1], c, e + r, t + u * f[1])), d += Le(Nh || (Nh = sr(["L ", ",", ""])), e + r, t + n - u * f[2]), f[2] > 0 && (d += Le(Lh || (Lh = sr(["A ", ",", ",0,0,", `,
        `, ",", ""])), f[2], f[2], c, e + r - s * f[2], t + n)), d += Le(Rh || (Rh = sr(["L ", ",", ""])), e + s * f[3], t + n), f[3] > 0 && (d += Le(Bh || (Bh = sr(["A ", ",", ",0,0,", `,
        `, ",", ""])), f[3], f[3], c, e, t + n - u * f[3])), d += "Z";
  } else if (l > 0 && i === +i && i > 0) {
    var g = Math.min(l, i);
    d = Le(zh || (zh = sr(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e, t + u * g, g, g, c, e + s * g, t, e + r - s * g, t, g, g, c, e + r, t + u * g, e + r, t + n - u * g, g, g, c, e + r - s * g, t + n, e + s * g, t + n, g, g, c, e, t + n - u * g);
  } else
    d = Le(Kh || (Kh = sr(["M ", ",", " h ", " v ", " h ", " Z"])), e, t, r, n, -r);
  return d;
}, Yh = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, ji = (e) => {
  var t = re(e, Yh), r = H(null), n = Ne(-1), i = gE(n, 2), a = i[0], o = i[1];
  ae(() => {
    if (r.current && r.current.getTotalLength)
      try {
        var N = r.current.getTotalLength();
        N && o(N);
      } catch {
      }
  }, []);
  var l = t.x, u = t.y, s = t.width, c = t.height, d = t.radius, f = t.className, v = t.animationEasing, h = t.animationDuration, p = t.animationBegin, m = t.isAnimationActive, g = t.isUpdateAnimationActive, w = H(s), x = H(c), A = H(l), P = H(u), b = xe(() => ({
    x: l,
    y: u,
    width: s,
    height: c,
    radius: d
  }), [l, u, s, c, d]), O = Pd(b, "rectangle-");
  if (l !== +l || u !== +u || s !== +s || c !== +c || s === 0 || c === 0)
    return null;
  var I = J("recharts-rectangle", f);
  if (!g) {
    var E = $e(t);
    E.radius;
    var j = Uh(E, fE);
    return /* @__PURE__ */ y("path", pl({}, j, {
      x: kr(l),
      y: kr(u),
      width: kr(s),
      height: kr(c),
      radius: typeof d == "number" ? d : void 0,
      className: I,
      d: Hh(l, u, s, c, d)
    }));
  }
  var T = w.current, k = x.current, _ = A.current, $ = P.current, M = "0px ".concat(a === -1 ? 1 : a, "px"), R = "".concat(a, "px ").concat(a, "px"), K = Od(["strokeDasharray"], h, typeof v == "string" ? v : Yh.animationEasing);
  return /* @__PURE__ */ y(Ad, {
    animationId: O,
    key: O,
    canBegin: a > 0,
    duration: h,
    easing: v,
    isActive: g,
    begin: p
  }, (N) => {
    var z = V(T, s, N), W = V(k, c, N), Z = V(_, l, N), ne = V($, u, N);
    r.current && (w.current = z, x.current = W, A.current = Z, P.current = ne);
    var ce;
    m ? N > 0 ? ce = {
      transition: K,
      strokeDasharray: R
    } : ce = {
      strokeDasharray: M
    } : ce = {
      strokeDasharray: R
    };
    var ve = $e(t);
    ve.radius;
    var Te = Uh(ve, vE);
    return /* @__PURE__ */ y("path", pl({}, Te, {
      radius: typeof d == "number" ? d : void 0,
      className: I,
      d: Hh(Z, ne, z, W, d),
      ref: r,
      style: Fh(Fh({}, ce), t.style)
    }));
  });
};
function Vh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Gh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vh(Object(r), !0).forEach(function(n) {
      PE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PE(e, t, r) {
  return (t = OE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OE(e) {
  var t = SE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function SE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var yl = Math.PI / 180, ml = (e) => e * Math.PI / 180, IE = (e) => e * 180 / Math.PI, pe = (e, t, r, n) => ({
  x: e + Math.cos(-yl * n) * r,
  y: t + Math.sin(-yl * n) * r
}), H0 = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, kE = (e, t) => {
  var r = e.x, n = e.y, i = t.x, a = t.y;
  return Math.sqrt((r - i) ** 2 + (n - a) ** 2);
}, jE = (e, t) => {
  var r = e.x, n = e.y, i = t.cx, a = t.cy, o = kE({
    x: r,
    y: n
  }, {
    x: i,
    y: a
  });
  if (o <= 0)
    return {
      radius: o,
      angle: 0
    };
  var l = (r - i) / o, u = Math.acos(l);
  return n > a && (u = 2 * Math.PI - u), {
    radius: o,
    angle: IE(u),
    angleInRadian: u
  };
}, TE = (e) => {
  var t = e.startAngle, r = e.endAngle, n = Math.floor(t / 360), i = Math.floor(r / 360), a = Math.min(n, i);
  return {
    startAngle: t - a * 360,
    endAngle: r - a * 360
  };
}, EE = (e, t) => {
  var r = t.startAngle, n = t.endAngle, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return e + o * 360;
}, CE = (e, t) => {
  var r = e.relativeX, n = e.relativeY, i = jE({
    x: r,
    y: n
  }, t), a = i.radius, o = i.angle, l = t.innerRadius, u = t.outerRadius;
  if (a < l || a > u || a === 0)
    return null;
  var s = TE(t), c = s.startAngle, d = s.endAngle, f = o, v;
  if (c <= d) {
    for (; f > d; )
      f -= 360;
    for (; f < c; )
      f += 360;
    v = f >= c && f <= d;
  } else {
    for (; f > c; )
      f -= 360;
    for (; f < d; )
      f += 360;
    v = f >= d && f <= c;
  }
  return v ? Gh(Gh({}, t), {}, {
    radius: a,
    angle: EE(f, t)
  }) : null;
};
function Y0(e) {
  var t = e.cx, r = e.cy, n = e.radius, i = e.startAngle, a = e.endAngle, o = pe(t, r, n, i), l = pe(t, r, n, a);
  return {
    points: [o, l],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  };
}
var qh, Zh, Jh, Qh, ep, tp, rp;
function yc() {
  return yc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, yc.apply(null, arguments);
}
function pn(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var DE = (e, t) => {
  var r = Ue(t - e), n = Math.min(Math.abs(t - e), 359.999);
  return r * n;
}, Oo = (e) => {
  var t = e.cx, r = e.cy, n = e.radius, i = e.angle, a = e.sign, o = e.isExternal, l = e.cornerRadius, u = e.cornerIsExternal, s = l * (o ? 1 : -1) + n, c = Math.asin(l / s) / yl, d = u ? i : i + a * c, f = pe(t, r, s, d), v = pe(t, r, n, d), h = u ? i - a * c : i, p = pe(t, r, s * Math.cos(c * yl), h);
  return {
    center: f,
    circleTangency: v,
    lineTangency: p,
    theta: c
  };
}, V0 = (e) => {
  var t = e.cx, r = e.cy, n = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, l = DE(a, o), u = a + l, s = pe(t, r, i, a), c = pe(t, r, i, u), d = Le(qh || (qh = pn(["M ", ",", `
    A `, ",", `,0,
    `, ",", `,
    `, ",", `
  `])), s.x, s.y, i, i, +(Math.abs(l) > 180), +(a > u), c.x, c.y);
  if (n > 0) {
    var f = pe(t, r, n, a), v = pe(t, r, n, u);
    d += Le(Zh || (Zh = pn(["L ", ",", `
            A `, ",", `,0,
            `, ",", `,
            `, ",", " Z"])), v.x, v.y, n, n, +(Math.abs(l) > 180), +(a <= u), f.x, f.y);
  } else
    d += Le(Jh || (Jh = pn(["L ", ",", " Z"])), t, r);
  return d;
}, ME = (e) => {
  var t = e.cx, r = e.cy, n = e.innerRadius, i = e.outerRadius, a = e.cornerRadius, o = e.forceCornerRadius, l = e.cornerIsExternal, u = e.startAngle, s = e.endAngle, c = Ue(s - u), d = Oo({
    cx: t,
    cy: r,
    radius: i,
    angle: u,
    sign: c,
    cornerRadius: a,
    cornerIsExternal: l
  }), f = d.circleTangency, v = d.lineTangency, h = d.theta, p = Oo({
    cx: t,
    cy: r,
    radius: i,
    angle: s,
    sign: -c,
    cornerRadius: a,
    cornerIsExternal: l
  }), m = p.circleTangency, g = p.lineTangency, w = p.theta, x = l ? Math.abs(u - s) : Math.abs(u - s) - h - w;
  if (x < 0)
    return o ? Le(Qh || (Qh = pn(["M ", ",", `
        a`, ",", ",0,0,1,", `,0
        a`, ",", ",0,0,1,", `,0
      `])), v.x, v.y, a, a, a * 2, a, a, -a * 2) : V0({
      cx: t,
      cy: r,
      innerRadius: n,
      outerRadius: i,
      startAngle: u,
      endAngle: s
    });
  var A = Le(ep || (ep = pn(["M ", ",", `
    A`, ",", ",0,0,", ",", ",", `
    A`, ",", ",0,", ",", ",", ",", `
    A`, ",", ",0,0,", ",", ",", `
  `])), v.x, v.y, a, a, +(c < 0), f.x, f.y, i, i, +(x > 180), +(c < 0), m.x, m.y, a, a, +(c < 0), g.x, g.y);
  if (n > 0) {
    var P = Oo({
      cx: t,
      cy: r,
      radius: n,
      angle: u,
      sign: c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: l
    }), b = P.circleTangency, O = P.lineTangency, I = P.theta, E = Oo({
      cx: t,
      cy: r,
      radius: n,
      angle: s,
      sign: -c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: l
    }), j = E.circleTangency, T = E.lineTangency, k = E.theta, _ = l ? Math.abs(u - s) : Math.abs(u - s) - I - k;
    if (_ < 0 && a === 0)
      return "".concat(A, "L").concat(t, ",").concat(r, "Z");
    A += Le(tp || (tp = pn(["L", ",", `
      A`, ",", ",0,0,", ",", ",", `
      A`, ",", ",0,", ",", ",", ",", `
      A`, ",", ",0,0,", ",", ",", "Z"])), T.x, T.y, a, a, +(c < 0), j.x, j.y, n, n, +(_ > 180), +(c > 0), b.x, b.y, a, a, +(c < 0), O.x, O.y);
  } else
    A += Le(rp || (rp = pn(["L", ",", "Z"])), t, r);
  return A;
}, $E = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, Iu = (e) => {
  var t = re(e, $E), r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, l = t.forceCornerRadius, u = t.cornerIsExternal, s = t.startAngle, c = t.endAngle, d = t.className;
  if (a < i || s === c)
    return null;
  var f = J("recharts-sector", d), v = a - i, h = lt(o, v, 0, !0), p;
  return h > 0 && Math.abs(s - c) < 360 ? p = ME({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: Math.min(h, v / 2),
    forceCornerRadius: l,
    cornerIsExternal: u,
    startAngle: s,
    endAngle: c
  }) : p = V0({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    startAngle: s,
    endAngle: c
  }), /* @__PURE__ */ y("path", yc({}, $e(t), {
    className: f,
    d: p
  }));
};
function _E(e, t, r) {
  if (e === "horizontal")
    return [{
      x: t.x,
      y: r.top
    }, {
      x: t.x,
      y: r.top + r.height
    }];
  if (e === "vertical")
    return [{
      x: r.left,
      y: t.y
    }, {
      x: r.left + r.width,
      y: t.y
    }];
  if (vb(t)) {
    if (e === "centric") {
      var n = t.cx, i = t.cy, a = t.innerRadius, o = t.outerRadius, l = t.angle, u = pe(n, i, a, l), s = pe(n, i, o, l);
      return [{
        x: u.x,
        y: u.y
      }, {
        x: s.x,
        y: s.y
      }];
    }
    return Y0(t);
  }
}
function NE(e) {
  return qc(e) ? NaN : Number(e);
}
function Ko(e) {
  return e ? (e = NE(e), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
function Sd(e, t, r) {
  r && typeof r != "number" && tc(e, t, r) && (t = r = void 0), e = Ko(e), t === void 0 ? (t = e, e = 0) : t = Ko(t), r = r === void 0 ? e < t ? 1 : -1 : Ko(r);
  const n = Math.max(Math.ceil((t - e) / (r || 1)), 0), i = new Array(n);
  for (let a = 0; a < n; a++)
    i[a] = e, e += r;
  return i;
}
var Ht = (e) => e.chartData, zr = S([Ht], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), Ti = (e, t, r, n) => n ? zr(e) : Ht(e), G0 = (e, t, r) => r ? zr(e) : Ht(e), LE = S([Ti], (e) => {
  var t = e.chartData, r = e.dataStartIndex, n = e.dataEndIndex;
  return t != null ? t.slice(r, n + 1) : [];
}), RE = S([zr], (e) => {
  var t = e.chartData, r = e.dataStartIndex, n = e.dataEndIndex;
  return t != null ? t.slice(r, n + 1) : [];
}), BE = S([Ht], (e) => {
  var t = e.chartData, r = e.dataStartIndex, n = e.dataEndIndex;
  return t != null ? t.slice(r, n + 1) : [];
});
function Id(e, t) {
  return FE(e) || WE(e, t) || KE(e, t) || zE();
}
function zE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function KE(e, t) {
  if (e) {
    if (typeof e == "string") return np(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? np(e, t) : void 0;
  }
}
function np(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function WE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function FE(e) {
  if (Array.isArray(e)) return e;
}
function vr(e) {
  if (Array.isArray(e) && e.length === 2) {
    var t = Id(e, 2), r = t[0], n = t[1];
    if (Q(r) && Q(n))
      return !0;
  }
  return !1;
}
function ip(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function q0(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var r = Id(e, 2), n = r[0], i = r[1], a, o;
    if (Q(n))
      a = n;
    else if (typeof n == "function")
      return;
    if (Q(i))
      o = i;
    else if (typeof i == "function")
      return;
    var l = [a, o];
    if (vr(l))
      return l;
  }
}
function UE(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if (vr(n))
          return ip(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var i = Id(e, 2), a = i[0], o = i[1], l, u;
      if (a === "auto")
        t != null && (l = Math.min(...t));
      else if (L(a))
        l = a;
      else if (typeof a == "function")
        try {
          t != null && (l = a(t?.[0]));
        } catch {
        }
      else if (typeof a == "string" && Qv.test(a)) {
        var s = Qv.exec(a);
        if (s == null || s[1] == null || t == null)
          l = void 0;
        else {
          var c = +s[1];
          l = t[0] - c;
        }
      } else
        l = t?.[0];
      if (o === "auto")
        t != null && (u = Math.max(...t));
      else if (L(o))
        u = o;
      else if (typeof o == "function")
        try {
          t != null && (u = o(t?.[1]));
        } catch {
        }
      else if (typeof o == "string" && eh.test(o)) {
        var d = eh.exec(o);
        if (d == null || d[1] == null || t == null)
          u = void 0;
        else {
          var f = +d[1];
          u = t[1] + f;
        }
      } else
        u = t?.[1];
      var v = [l, u];
      if (vr(v))
        return t == null ? v : ip(v, t, r);
    }
  }
}
var Ei = 1e9, XE = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, jd, _e = !0, Ft = "[DecimalError] ", wn = Ft + "Invalid argument: ", kd = Ft + "Exponent out of range: ", Ci = Math.floor, dn = Math.pow, HE = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, kt, et = 1e7, Ce = 7, Z0 = 9007199254740991, gl = Ci(Z0 / Ce), F = {};
F.absoluteValue = F.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
F.comparedTo = F.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
F.decimalPlaces = F.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * Ce;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
F.dividedBy = F.div = function(e) {
  return Cr(this, new this.constructor(e));
};
F.dividedToIntegerBy = F.idiv = function(e) {
  var t = this, r = t.constructor;
  return Se(Cr(t, new r(e), 0, 1), r.precision);
};
F.equals = F.eq = function(e) {
  return !this.cmp(e);
};
F.exponent = function() {
  return Xe(this);
};
F.greaterThan = F.gt = function(e) {
  return this.cmp(e) > 0;
};
F.greaterThanOrEqualTo = F.gte = function(e) {
  return this.cmp(e) >= 0;
};
F.isInteger = F.isint = function() {
  return this.e > this.d.length - 2;
};
F.isNegative = F.isneg = function() {
  return this.s < 0;
};
F.isPositive = F.ispos = function() {
  return this.s > 0;
};
F.isZero = function() {
  return this.s === 0;
};
F.lessThan = F.lt = function(e) {
  return this.cmp(e) < 0;
};
F.lessThanOrEqualTo = F.lte = function(e) {
  return this.cmp(e) < 1;
};
F.logarithm = F.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(kt)) throw Error(Ft + "NaN");
  if (r.s < 1) throw Error(Ft + (r.s ? "NaN" : "-Infinity"));
  return r.eq(kt) ? new n(0) : (_e = !1, t = Cr(Pa(r, a), Pa(e, a), a), _e = !0, Se(t, i));
};
F.minus = F.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? ex(t, e) : J0(t, (e.s = -e.s, e));
};
F.modulo = F.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(Ft + "NaN");
  return r.s ? (_e = !1, t = Cr(r, e, 0, 1).times(e), _e = !0, r.minus(t)) : Se(new n(r), i);
};
F.naturalExponential = F.exp = function() {
  return Q0(this);
};
F.naturalLogarithm = F.ln = function() {
  return Pa(this);
};
F.negated = F.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
F.plus = F.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? J0(t, e) : ex(t, (e.s = -e.s, e));
};
F.precision = F.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(wn + e);
  if (t = Xe(i) + 1, n = i.d.length - 1, r = n * Ce + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
F.squareRoot = F.sqrt = function() {
  var e, t, r, n, i, a, o, l = this, u = l.constructor;
  if (l.s < 1) {
    if (!l.s) return new u(0);
    throw Error(Ft + "NaN");
  }
  for (e = Xe(l), _e = !1, i = Math.sqrt(+l), i == 0 || i == 1 / 0 ? (t = fr(l.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Ci((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new u(t)) : n = new u(i.toString()), r = u.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(Cr(l, a, o + 2)).times(0.5), fr(a.d).slice(0, o) === (t = fr(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (Se(a, r + 1, 0), a.times(a).eq(l)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return _e = !0, Se(n, r);
};
F.times = F.mul = function(e) {
  var t, r, n, i, a, o, l, u, s, c = this, d = c.constructor, f = c.d, v = (e = new d(e)).d;
  if (!c.s || !e.s) return new d(0);
  for (e.s *= c.s, r = c.e + e.e, u = f.length, s = v.length, u < s && (a = f, f = v, v = a, o = u, u = s, s = o), a = [], o = u + s, n = o; n--; ) a.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, i = u + n; i > n; )
      l = a[i] + v[n] * f[i - n - 1] + t, a[i--] = l % et | 0, t = l / et | 0;
    a[i] = (a[i] + t) % et | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, _e ? Se(e, d.precision) : e;
};
F.toDecimalPlaces = F.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (pr(e, 0, Ei), t === void 0 ? t = n.rounding : pr(t, 0, 8), Se(r, e + Xe(r) + 1, t));
};
F.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = In(n, !0) : (pr(e, 0, Ei), t === void 0 ? t = i.rounding : pr(t, 0, 8), n = Se(new i(n), e + 1, t), r = In(n, !0, e + 1)), r;
};
F.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? In(i) : (pr(e, 0, Ei), t === void 0 ? t = a.rounding : pr(t, 0, 8), n = Se(new a(i), e + Xe(i) + 1, t), r = In(n.abs(), !1, e + Xe(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
F.toInteger = F.toint = function() {
  var e = this, t = e.constructor;
  return Se(new t(e), Xe(e) + 1, t.rounding);
};
F.toNumber = function() {
  return +this;
};
F.toPower = F.pow = function(e) {
  var t, r, n, i, a, o, l = this, u = l.constructor, s = 12, c = +(e = new u(e));
  if (!e.s) return new u(kt);
  if (l = new u(l), !l.s) {
    if (e.s < 1) throw Error(Ft + "Infinity");
    return l;
  }
  if (l.eq(kt)) return l;
  if (n = u.precision, e.eq(kt)) return Se(l, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = l.s, o) {
    if ((r = c < 0 ? -c : c) <= Z0) {
      for (i = new u(kt), t = Math.ceil(n / Ce + 4), _e = !1; r % 2 && (i = i.times(l), op(i.d, t)), r = Ci(r / 2), r !== 0; )
        l = l.times(l), op(l.d, t);
      return _e = !0, e.s < 0 ? new u(kt).div(i) : Se(i, n);
    }
  } else if (a < 0) throw Error(Ft + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, l.s = 1, _e = !1, i = e.times(Pa(l, n + s)), _e = !0, i = Q0(i), i.s = a, i;
};
F.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = Xe(i), n = In(i, r <= a.toExpNeg || r >= a.toExpPos)) : (pr(e, 1, Ei), t === void 0 ? t = a.rounding : pr(t, 0, 8), i = Se(new a(i), e, t), r = Xe(i), n = In(i, e <= r || r <= a.toExpNeg, e)), n;
};
F.toSignificantDigits = F.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (pr(e, 1, Ei), t === void 0 ? t = n.rounding : pr(t, 0, 8)), Se(new n(r), e, t);
};
F.toString = F.valueOf = F.val = F.toJSON = F[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Xe(e), r = e.constructor;
  return In(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function J0(e, t) {
  var r, n, i, a, o, l, u, s, c = e.constructor, d = c.precision;
  if (!e.s || !t.s)
    return t.s || (t = new c(e)), _e ? Se(t, d) : t;
  if (u = e.d, s = t.d, o = e.e, i = t.e, u = u.slice(), a = o - i, a) {
    for (a < 0 ? (n = u, a = -a, l = s.length) : (n = s, i = o, l = u.length), o = Math.ceil(d / Ce), l = o > l ? o + 1 : l + 1, a > l && (a = l, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (l = u.length, a = s.length, l - a < 0 && (a = l, n = s, s = u, u = n), r = 0; a; )
    r = (u[--a] = u[a] + s[a] + r) / et | 0, u[a] %= et;
  for (r && (u.unshift(r), ++i), l = u.length; u[--l] == 0; ) u.pop();
  return t.d = u, t.e = i, _e ? Se(t, d) : t;
}
function pr(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(wn + e);
}
function fr(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = Ce - n.length, r && (a += Hr(r)), a += n;
    o = e[t], n = o + "", r = Ce - n.length, r && (a += Hr(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var Cr = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, l = n.length;
    for (n = n.slice(); l--; )
      a = n[l] * i + o, n[l] = a % et | 0, o = a / et | 0;
    return o && n.unshift(o), n;
  }
  function t(n, i, a, o) {
    var l, u;
    if (a != o)
      u = a > o ? 1 : -1;
    else
      for (l = u = 0; l < a; l++)
        if (n[l] != i[l]) {
          u = n[l] > i[l] ? 1 : -1;
          break;
        }
    return u;
  }
  function r(n, i, a) {
    for (var o = 0; a--; )
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * et + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var l, u, s, c, d, f, v, h, p, m, g, w, x, A, P, b, O, I, E = n.constructor, j = n.s == i.s ? 1 : -1, T = n.d, k = i.d;
    if (!n.s) return new E(n);
    if (!i.s) throw Error(Ft + "Division by zero");
    for (u = n.e - i.e, O = k.length, P = T.length, v = new E(j), h = v.d = [], s = 0; k[s] == (T[s] || 0); ) ++s;
    if (k[s] > (T[s] || 0) && --u, a == null ? w = a = E.precision : o ? w = a + (Xe(n) - Xe(i)) + 1 : w = a, w < 0) return new E(0);
    if (w = w / Ce + 2 | 0, s = 0, O == 1)
      for (c = 0, k = k[0], w++; (s < P || c) && w--; s++)
        x = c * et + (T[s] || 0), h[s] = x / k | 0, c = x % k | 0;
    else {
      for (c = et / (k[0] + 1) | 0, c > 1 && (k = e(k, c), T = e(T, c), O = k.length, P = T.length), A = O, p = T.slice(0, O), m = p.length; m < O; ) p[m++] = 0;
      I = k.slice(), I.unshift(0), b = k[0], k[1] >= et / 2 && ++b;
      do
        c = 0, l = t(k, p, O, m), l < 0 ? (g = p[0], O != m && (g = g * et + (p[1] || 0)), c = g / b | 0, c > 1 ? (c >= et && (c = et - 1), d = e(k, c), f = d.length, m = p.length, l = t(d, p, f, m), l == 1 && (c--, r(d, O < f ? I : k, f))) : (c == 0 && (l = c = 1), d = k.slice()), f = d.length, f < m && d.unshift(0), r(p, d, m), l == -1 && (m = p.length, l = t(k, p, O, m), l < 1 && (c++, r(p, O < m ? I : k, m))), m = p.length) : l === 0 && (c++, p = [0]), h[s++] = c, l && p[0] ? p[m++] = T[A] || 0 : (p = [T[A]], m = 1);
      while ((A++ < P || p[0] !== void 0) && w--);
    }
    return h[0] || h.shift(), v.e = u, Se(v, o ? a + Xe(v) + 1 : a);
  };
})();
function Q0(e, t) {
  var r, n, i, a, o, l, u = 0, s = 0, c = e.constructor, d = c.precision;
  if (Xe(e) > 16) throw Error(kd + Xe(e));
  if (!e.s) return new c(kt);
  for (_e = !1, l = d, o = new c(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(dn(2, s)) / Math.LN10 * 2 + 5 | 0, l += n, r = i = a = new c(kt), c.precision = l; ; ) {
    if (i = Se(i.times(e), l), r = r.times(++u), o = a.plus(Cr(i, r, l)), fr(o.d).slice(0, l) === fr(a.d).slice(0, l)) {
      for (; s--; ) a = Se(a.times(a), l);
      return c.precision = d, t == null ? (_e = !0, Se(a, d)) : a;
    }
    a = o;
  }
}
function Xe(e) {
  for (var t = e.e * Ce, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Ss(e, t, r) {
  if (t > e.LN10.sd())
    throw _e = !0, r && (e.precision = r), Error(Ft + "LN10 precision limit exceeded");
  return Se(new e(e.LN10), t);
}
function Hr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Pa(e, t) {
  var r, n, i, a, o, l, u, s, c, d = 1, f = 10, v = e, h = v.d, p = v.constructor, m = p.precision;
  if (v.s < 1) throw Error(Ft + (v.s ? "NaN" : "-Infinity"));
  if (v.eq(kt)) return new p(0);
  if (t == null ? (_e = !1, s = m) : s = t, v.eq(10))
    return t == null && (_e = !0), Ss(p, s);
  if (s += f, p.precision = s, r = fr(h), n = r.charAt(0), a = Xe(v), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      v = v.times(e), r = fr(v.d), n = r.charAt(0), d++;
    a = Xe(v), n > 1 ? (v = new p("0." + r), a++) : v = new p(n + "." + r.slice(1));
  } else
    return u = Ss(p, s + 2, m).times(a + ""), v = Pa(new p(n + "." + r.slice(1)), s - f).plus(u), p.precision = m, t == null ? (_e = !0, Se(v, m)) : v;
  for (l = o = v = Cr(v.minus(kt), v.plus(kt), s), c = Se(v.times(v), s), i = 3; ; ) {
    if (o = Se(o.times(c), s), u = l.plus(Cr(o, new p(i), s)), fr(u.d).slice(0, s) === fr(l.d).slice(0, s))
      return l = l.times(2), a !== 0 && (l = l.plus(Ss(p, s + 2, m).times(a + ""))), l = Cr(l, new p(d), s), p.precision = m, t == null ? (_e = !0, Se(l, m)) : l;
    l = u, i += 2;
  }
}
function ap(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = Ci(r / Ce), e.d = [], n = (r + 1) % Ce, r < 0 && (n += Ce), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= Ce; n < i; ) e.d.push(+t.slice(n, n += Ce));
      t = t.slice(n), n = Ce - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), _e && (e.e > gl || e.e < -gl)) throw Error(kd + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function Se(e, t, r) {
  var n, i, a, o, l, u, s, c, d = e.d;
  for (o = 1, a = d[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += Ce, i = t, s = d[c = 0];
  else {
    if (c = Math.ceil((n + 1) / Ce), a = d.length, c >= a) return e;
    for (s = a = d[c], o = 1; a >= 10; a /= 10) o++;
    n %= Ce, i = n - Ce + o;
  }
  if (r !== void 0 && (a = dn(10, o - i - 1), l = s / a % 10 | 0, u = t < 0 || d[c + 1] !== void 0 || s % a, u = r < 4 ? (l || u) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (r == 4 || u || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? s / dn(10, o - i) : 0 : d[c - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !d[0])
    return u ? (a = Xe(e), d.length = 1, t = t - a - 1, d[0] = dn(10, (Ce - t % Ce) % Ce), e.e = Ci(-t / Ce) || 0) : (d.length = 1, d[0] = e.e = e.s = 0), e;
  if (n == 0 ? (d.length = c, a = 1, c--) : (d.length = c + 1, a = dn(10, Ce - n), d[c] = i > 0 ? (s / dn(10, o - i) % dn(10, i) | 0) * a : 0), u)
    for (; ; )
      if (c == 0) {
        (d[0] += a) == et && (d[0] = 1, ++e.e);
        break;
      } else {
        if (d[c] += a, d[c] != et) break;
        d[c--] = 0, a = 1;
      }
  for (n = d.length; d[--n] === 0; ) d.pop();
  if (_e && (e.e > gl || e.e < -gl))
    throw Error(kd + Xe(e));
  return e;
}
function ex(e, t) {
  var r, n, i, a, o, l, u, s, c, d, f = e.constructor, v = f.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new f(e), _e ? Se(t, v) : t;
  if (u = e.d, d = t.d, n = t.e, s = e.e, u = u.slice(), o = s - n, o) {
    for (c = o < 0, c ? (r = u, o = -o, l = d.length) : (r = d, n = s, l = u.length), i = Math.max(Math.ceil(v / Ce), l) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = u.length, l = d.length, c = i < l, c && (l = i), i = 0; i < l; i++)
      if (u[i] != d[i]) {
        c = u[i] < d[i];
        break;
      }
    o = 0;
  }
  for (c && (r = u, u = d, d = r, t.s = -t.s), l = u.length, i = d.length - l; i > 0; --i) u[l++] = 0;
  for (i = d.length; i > o; ) {
    if (u[--i] < d[i]) {
      for (a = i; a && u[--a] === 0; ) u[a] = et - 1;
      --u[a], u[i] += et;
    }
    u[i] -= d[i];
  }
  for (; u[--l] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --n;
  return u[0] ? (t.d = u, t.e = n, _e ? Se(t, v) : t) : new f(0);
}
function In(e, t, r) {
  var n, i = Xe(e), a = fr(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Hr(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + Hr(-i - 1) + a, r && (n = r - o) > 0 && (a += Hr(n))) : i >= o ? (a += Hr(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + Hr(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += Hr(n))), e.s < 0 ? "-" + a : a;
}
function op(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function tx(e) {
  var t, r, n;
  function i(a) {
    var o = this;
    if (!(o instanceof i)) return new i(a);
    if (o.constructor = i, a instanceof i) {
      o.s = a.s, o.e = a.e, o.d = (a = a.d) ? a.slice() : a;
      return;
    }
    if (typeof a == "number") {
      if (a * 0 !== 0)
        throw Error(wn + a);
      if (a > 0)
        o.s = 1;
      else if (a < 0)
        a = -a, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (a === ~~a && a < 1e7) {
        o.e = 0, o.d = [a];
        return;
      }
      return ap(o, a.toString());
    } else if (typeof a != "string")
      throw Error(wn + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, HE.test(a)) ap(o, a);
    else throw Error(wn + a);
  }
  if (i.prototype = F, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = tx, i.config = i.set = YE, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function YE(e) {
  if (!e || typeof e != "object")
    throw Error(Ft + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    Ei,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[r = i[t]]) !== void 0)
      if (Ci(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(wn + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(wn + r + ": " + n);
  return this;
}
var jd = tx(XE);
kt = new jd(1);
const de = jd;
function rx(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new de(e).abs().log(10).toNumber()) + 1, t;
}
function nx(e, t, r) {
  for (var n = new de(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
function Oa(e, t) {
  return ZE(e) || qE(e, t) || GE(e, t) || VE();
}
function VE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function GE(e, t) {
  if (e) {
    if (typeof e == "string") return lp(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? lp(e, t) : void 0;
  }
}
function lp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function qE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function ZE(e) {
  if (Array.isArray(e)) return e;
}
var ix = (e) => {
  var t = Oa(e, 2), r = t[0], n = t[1], i = r, a = n;
  return r > n && (i = n, a = r), [i, a];
}, Td = (e, t, r) => {
  if (e.lte(0))
    return new de(0);
  var n = rx(e.toNumber()), i = new de(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, l = new de(Math.ceil(a.div(o).toNumber())).add(r).mul(o), u = l.mul(i);
  return t ? new de(u.toNumber()) : new de(Math.ceil(u.toNumber()));
}, ax = (e, t, r) => {
  var n;
  if (e.lte(0))
    return new de(0);
  var i = [1, 2, 2.5, 5], a = e.toNumber(), o = Math.floor(new de(a).abs().log(10).toNumber()), l = new de(10).pow(o), u = e.div(l).toNumber(), s = i.findIndex((v) => v >= u - 1e-10);
  if (s === -1 && (l = l.mul(10), s = 0), s += r, s >= i.length) {
    var c = Math.floor(s / i.length);
    s %= i.length, l = l.mul(new de(10).pow(c));
  }
  var d = (n = i[s]) !== null && n !== void 0 ? n : 1, f = new de(d).mul(l);
  return t ? f : new de(Math.ceil(f.toNumber()));
}, JE = (e, t, r) => {
  var n = new de(1), i = new de(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new de(10).pow(rx(e) - 1), i = new de(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new de(Math.floor(e)));
  } else e === 0 ? i = new de(Math.floor((t - 1) / 2)) : r || (i = new de(Math.floor(e)));
  for (var o = Math.floor((t - 1) / 2), l = [], u = 0; u < t; u++)
    l.push(i.add(new de(u - o).mul(n)).toNumber());
  return l;
}, ox = function(t, r, n, i) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Td;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new de(0),
      tickMin: new de(0),
      tickMax: new de(0)
    };
  var l = o(new de(r).sub(t).div(n - 1), i, a), u;
  t <= 0 && r >= 0 ? u = new de(0) : (u = new de(t).add(r).div(2), u = u.sub(new de(u).mod(l)));
  var s = Math.ceil(u.sub(t).div(l).toNumber()), c = Math.ceil(new de(r).sub(u).div(l).toNumber()), d = s + c + 1;
  return d > n ? ox(t, r, n, i, a + 1, o) : (d < n && (c = r > 0 ? c + (n - d) : c, s = r > 0 ? s : s + (n - d)), {
    step: l,
    tickMin: u.sub(new de(s).mul(l)),
    tickMax: u.add(new de(c).mul(l))
  });
}, up = function(t) {
  var r = Oa(t, 2), n = r[0], i = r[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", u = Math.max(a, 2), s = ix([n, i]), c = Oa(s, 2), d = c[0], f = c[1];
  if (d === -1 / 0 || f === 1 / 0) {
    var v = f === 1 / 0 ? [d, ...Array(a - 1).fill(1 / 0)] : [...Array(a - 1).fill(-1 / 0), f];
    return n > i ? v.reverse() : v;
  }
  if (d === f)
    return JE(d, a, o);
  var h = l === "snap125" ? ax : Td, p = ox(d, f, u, o, 0, h), m = p.step, g = p.tickMin, w = p.tickMax, x = nx(g, w.add(new de(0.1).mul(m)), m);
  return n > i ? x.reverse() : x;
}, sp = function(t, r) {
  var n = Oa(t, 2), i = n[0], a = n[1], o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", u = ix([i, a]), s = Oa(u, 2), c = s[0], d = s[1];
  if (c === -1 / 0 || d === 1 / 0)
    return [i, a];
  if (c === d)
    return [c];
  var f = l === "snap125" ? ax : Td, v = Math.max(r, 2), h = f(new de(d).sub(c).div(v - 1), o, 0), p = [...nx(new de(c), new de(d), h), d];
  if (o === !1) {
    p = p.map((g) => Math.round(g));
    var m = p.length - 1;
    m > 0 && p[m] === p[m - 1] && (p = p.slice(0, m));
  }
  return i > a ? p.reverse() : p;
}, ku = (e) => e.rootProps.maxBarSize, lx = (e) => e.rootProps.barGap, Ed = (e) => e.rootProps.barCategoryGap, ux = (e) => e.rootProps.barSize, Di = (e) => e.rootProps.stackOffset, Cd = (e) => e.rootProps.reverseStackOrder, Dd = (e) => e.options.chartName, ju = (e) => e.rootProps.syncId, sx = (e) => e.rootProps.syncMethod, Tu = (e) => e.options.eventEmitter, QE = (e) => e.rootProps.baseValue, fe = {
  /**
   * CartesianGrid and PolarGrid
   */
  grid: -100,
  /**
   * Background of Bar and RadialBar.
   * This is not visible by default but can be enabled by setting background={true} on Bar or RadialBar.
   */
  barBackground: -50,
  /*
   * other chart elements or custom elements without specific zIndex
   * render in here, at zIndex 0
   */
  /**
   * Area, Pie, Radar, and ReferenceArea
   */
  area: 100,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area. CursorRectangle is a rectangle box.
   * It renders below bar so that in a stacked bar chart the cursor rectangle does not hide the other bars.
   */
  cursorRectangle: 200,
  /**
   * Bar and RadialBar
   */
  bar: 300,
  /**
   * Line and ReferenceLine, and ErrorBor
   */
  line: 400,
  /**
   * XAxis and YAxis and PolarAngleAxis and PolarRadiusAxis ticks and lines and children
   */
  axis: 500,
  /**
   * Scatter and ReferenceDot,
   * and Dots of Line and Area and Radar if they have dot=true
   */
  scatter: 600,
  /**
   * Hovering over a Bar or RadialBar renders a highlight rectangle
   */
  activeBar: 1e3,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area, usually a cross or a box.
   * CursorLine is a line cursor rendered in Line, Area, Scatter, Radar charts.
   * It renders above the Line and Scatter so that it is always visible.
   * It renders below active dot so that the dot is always visible and shows the current point.
   * We're also assuming that the active dot is small enough that it does not fully cover the cursor line.
   *
   * This also applies to the radial cursor in RadialBarChart.
   */
  cursorLine: 1100,
  /**
   * Hovering over a Point in Line, Area, Scatter, Radar renders a highlight dot
   */
  activeDot: 1200,
  /**
   * LabelList and Label, including Axis labels
   */
  label: 2e3
}, Xr = {
  allowDecimals: !1,
  allowDuplicatedCategory: !0,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: !1,
  angle: 0,
  angleAxisId: 0,
  axisLine: !0,
  axisLineType: "polygon",
  cx: 0,
  cy: 0,
  hide: !1,
  includeHidden: !1,
  label: !1,
  niceTicks: "auto",
  orientation: "outer",
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickLine: !0,
  tickSize: 8,
  type: "auto",
  zIndex: fe.axis
}, Gt = {
  allowDataOverflow: !1,
  allowDecimals: !1,
  allowDuplicatedCategory: !0,
  angle: 0,
  axisLine: !0,
  includeHidden: !1,
  hide: !1,
  niceTicks: "auto",
  label: !1,
  orientation: "right",
  radiusAxisId: 0,
  reversed: !1,
  scale: "auto",
  stroke: "#ccc",
  tick: !0,
  tickCount: 5,
  tickLine: !0,
  type: "auto",
  zIndex: fe.axis
}, Eu = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
};
function Mi(e, t, r) {
  if (r !== "auto")
    return r;
  if (e != null)
    return Dt(e, t) ? "category" : "number";
}
function cp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cp(Object(r), !0).forEach(function(n) {
      eC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eC(e, t, r) {
  return (t = tC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tC(e) {
  var t = rC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var dp = {
  allowDataOverflow: Xr.allowDataOverflow,
  allowDecimals: Xr.allowDecimals,
  allowDuplicatedCategory: !1,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: Xr.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: Xr.reversed,
  scale: Xr.scale,
  tick: Xr.tick,
  tickCount: void 0,
  ticks: void 0,
  type: Xr.type,
  unit: void 0,
  niceTicks: "auto"
}, fp = {
  allowDataOverflow: Gt.allowDataOverflow,
  allowDecimals: Gt.allowDecimals,
  allowDuplicatedCategory: Gt.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: Gt.radiusAxisId,
  includeHidden: Gt.includeHidden,
  name: void 0,
  reversed: Gt.reversed,
  scale: Gt.scale,
  tick: Gt.tick,
  tickCount: Gt.tickCount,
  ticks: void 0,
  type: Gt.type,
  unit: void 0,
  niceTicks: "auto"
}, nC = (e, t) => {
  if (t != null)
    return e.polarAxis.angleAxis[t];
}, $n = S([nC, bd], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = Mi(t, "angleAxis", dp.type)) !== null && r !== void 0 ? r : "category";
  return bl(bl({}, dp), {}, {
    type: n
  });
}), iC = (e, t) => e.polarAxis.radiusAxis[t], $i = S([iC, bd], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = Mi(t, "radiusAxis", fp.type)) !== null && r !== void 0 ? r : "category";
  return bl(bl({}, fp), {}, {
    type: n
  });
}), Cu = (e) => e.polarOptions, Md = S([mr, gr, He], H0), cx = S([Cu, Md], (e, t) => {
  if (e != null)
    return lt(e.innerRadius, t, 0);
}), dx = S([Cu, Md], (e, t) => {
  if (e != null)
    return lt(e.outerRadius, t, t * 0.8);
}), aC = (e) => {
  if (e == null)
    return [0, 0];
  var t = e.startAngle, r = e.endAngle;
  return [t, r];
}, fx = S([Cu], aC), oC = S([$n, fx], Eu), vx = S([Md, cx, dx], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
}), lC = S([$i, vx], Eu), _n = S([te, Cu, cx, dx, mr, gr], (e, t, r, n, i, a) => {
  if (!(e !== "centric" && e !== "radial" || t == null || r == null || n == null)) {
    var o = t.cx, l = t.cy, u = t.startAngle, s = t.endAngle;
    return {
      cx: lt(o, i, i / 2),
      cy: lt(l, a, a / 2),
      innerRadius: r,
      outerRadius: n,
      startAngle: u,
      endAngle: s,
      clockWise: !1
      // this property look useful, why not use it?
    };
  }
}), je = (e, t) => t, Ya = (e, t, r) => r;
function Du(e) {
  return e?.id;
}
function $d(e, t, r) {
  var n = t.chartData, i = n === void 0 ? [] : n, a = r.allowDuplicatedCategory, o = r.dataKey, l = /* @__PURE__ */ new Map();
  return e.forEach((u) => {
    var s, c = (s = u.data) !== null && s !== void 0 ? s : i;
    if (!(c == null || c.length === 0)) {
      var d = Du(u);
      c.forEach((f, v) => {
        var h = o == null || a ? v : String(G(f, o, null)), p = G(f, u.dataKey, 0), m;
        l.has(h) ? m = l.get(h) : m = {}, Object.assign(m, {
          [d]: p
        }), l.set(h, m);
      });
    }
  }), Array.from(l.values());
}
function Va(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var Ga = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function Mu(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function uC(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  return !1;
}
var nt = (e) => {
  var t = te(e);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, _i = (e) => e.tooltip.settings.axisId;
function $u(e) {
  if (e != null) {
    var t = e.ticks, r = e.bandwidth, n = e.range(), i = [Math.min(...n), Math.max(...n)];
    return {
      domain: () => e.domain(),
      range: (function(a) {
        function o() {
          return a.apply(this, arguments);
        }
        return o.toString = function() {
          return a.toString();
        }, o;
      })(() => i),
      rangeMin: () => i[0],
      rangeMax: () => i[1],
      isInRange(a) {
        var o = i[0], l = i[1];
        return o <= l ? a >= o && a <= l : a >= l && a <= o;
      },
      bandwidth: r ? () => r.call(e) : void 0,
      ticks: t ? (a) => t.call(e, a) : void 0,
      map: (a, o) => {
        var l = e(a);
        if (l != null) {
          if (e.bandwidth && o !== null && o !== void 0 && o.position) {
            var u = e.bandwidth();
            switch (o.position) {
              case "middle":
                l += u / 2;
                break;
              case "end":
                l += u;
                break;
            }
          }
          return l;
        }
      }
    };
  }
}
var hx = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!vr(t)) {
          for (var r, n, i = 0; i < t.length; i++) {
            var a = t[i];
            Q(a) && ((r === void 0 || a < r) && (r = a), (n === void 0 || a > n) && (n = a));
          }
          return r !== void 0 && n !== void 0 ? [r, n] : void 0;
        }
        return t;
      }
      default:
        return t;
    }
};
function qr(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function sC(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function _d(e) {
  let t, r, n;
  e.length !== 2 ? (t = qr, r = (l, u) => qr(e(l), u), n = (l, u) => e(l) - u) : (t = e === qr || e === sC ? e : cC, r = e, n = e);
  function i(l, u, s = 0, c = l.length) {
    if (s < c) {
      if (t(u, u) !== 0) return c;
      do {
        const d = s + c >>> 1;
        r(l[d], u) < 0 ? s = d + 1 : c = d;
      } while (s < c);
    }
    return s;
  }
  function a(l, u, s = 0, c = l.length) {
    if (s < c) {
      if (t(u, u) !== 0) return c;
      do {
        const d = s + c >>> 1;
        r(l[d], u) <= 0 ? s = d + 1 : c = d;
      } while (s < c);
    }
    return s;
  }
  function o(l, u, s = 0, c = l.length) {
    const d = i(l, u, s, c - 1);
    return d > s && n(l[d - 1], u) > -n(l[d], u) ? d - 1 : d;
  }
  return { left: i, center: o, right: a };
}
function cC() {
  return 0;
}
function px(e) {
  return e === null ? NaN : +e;
}
function* dC(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const fC = _d(qr), qa = fC.right;
_d(px).center;
class vp extends Map {
  constructor(t, r = pC) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(hp(this, t));
  }
  has(t) {
    return super.has(hp(this, t));
  }
  set(t, r) {
    return super.set(vC(this, t), r);
  }
  delete(t) {
    return super.delete(hC(this, t));
  }
}
function hp({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function vC({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function hC({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function pC(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function yC(e = qr) {
  if (e === qr) return yx;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function yx(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const mC = Math.sqrt(50), gC = Math.sqrt(10), bC = Math.sqrt(2);
function xl(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= mC ? 10 : a >= gC ? 5 : a >= bC ? 2 : 1;
  let l, u, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, l = Math.round(e * s), u = Math.round(t * s), l / s < e && ++l, u / s > t && --u, s = -s) : (s = Math.pow(10, i) * o, l = Math.round(e / s), u = Math.round(t / s), l * s < e && ++l, u * s > t && --u), u < l && 0.5 <= r && r < 2 ? xl(e, t, r * 2) : [l, u, s];
}
function mc(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? xl(t, e, r) : xl(e, t, r);
  if (!(a >= i)) return [];
  const l = a - i + 1, u = new Array(l);
  if (n)
    if (o < 0) for (let s = 0; s < l; ++s) u[s] = (a - s) / -o;
    else for (let s = 0; s < l; ++s) u[s] = (a - s) * o;
  else if (o < 0) for (let s = 0; s < l; ++s) u[s] = (i + s) / -o;
  else for (let s = 0; s < l; ++s) u[s] = (i + s) * o;
  return u;
}
function gc(e, t, r) {
  return t = +t, e = +e, r = +r, xl(e, t, r)[2];
}
function bc(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? gc(t, e, r) : gc(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function pp(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function yp(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function mx(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? yx : yC(i); n > r; ) {
    if (n - r > 600) {
      const u = n - r + 1, s = t - r + 1, c = Math.log(u), d = 0.5 * Math.exp(2 * c / 3), f = 0.5 * Math.sqrt(c * d * (u - d) / u) * (s - u / 2 < 0 ? -1 : 1), v = Math.max(r, Math.floor(t - s * d / u + f)), h = Math.min(n, Math.floor(t + (u - s) * d / u + f));
      mx(e, t, v, h, i);
    }
    const a = e[t];
    let o = r, l = n;
    for (ta(e, r, t), i(e[n], a) > 0 && ta(e, r, n); o < l; ) {
      for (ta(e, o, l), ++o, --l; i(e[o], a) < 0; ) ++o;
      for (; i(e[l], a) > 0; ) --l;
    }
    i(e[r], a) === 0 ? ta(e, r, l) : (++l, ta(e, l, n)), l <= t && (r = l + 1), t <= l && (n = l - 1);
  }
  return e;
}
function ta(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function xC(e, t, r) {
  if (e = Float64Array.from(dC(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return yp(e);
    if (t >= 1) return pp(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = pp(mx(e, a).subarray(0, a + 1)), l = yp(e.subarray(a + 1));
    return o + (l - o) * (i - a);
  }
}
function wC(e, t, r = px) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), l = +r(e[a + 1], a + 1, e);
    return o + (l - o) * (i - a);
  }
}
function AC(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function Yt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Kr(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const xc = Symbol("implicit");
function Nd() {
  var e = new vp(), t = [], r = [], n = xc;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== xc) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new vp();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Nd(t, r).unknown(n);
  }, Yt.apply(i, arguments), i;
}
function Ld() {
  var e = Nd().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, l = !1, u = 0, s = 0, c = 0.5;
  delete e.unknown;
  function d() {
    var f = t().length, v = i < n, h = v ? i : n, p = v ? n : i;
    a = (p - h) / Math.max(1, f - u + s * 2), l && (a = Math.floor(a)), h += (p - h - a * (f - u)) * c, o = a * (1 - u), l && (h = Math.round(h), o = Math.round(o));
    var m = AC(f).map(function(g) {
      return h + a * g;
    });
    return r(v ? m.reverse() : m);
  }
  return e.domain = function(f) {
    return arguments.length ? (t(f), d()) : t();
  }, e.range = function(f) {
    return arguments.length ? ([n, i] = f, n = +n, i = +i, d()) : [n, i];
  }, e.rangeRound = function(f) {
    return [n, i] = f, n = +n, i = +i, l = !0, d();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return a;
  }, e.round = function(f) {
    return arguments.length ? (l = !!f, d()) : l;
  }, e.padding = function(f) {
    return arguments.length ? (u = Math.min(1, s = +f), d()) : u;
  }, e.paddingInner = function(f) {
    return arguments.length ? (u = Math.min(1, f), d()) : u;
  }, e.paddingOuter = function(f) {
    return arguments.length ? (s = +f, d()) : s;
  }, e.align = function(f) {
    return arguments.length ? (c = Math.max(0, Math.min(1, f)), d()) : c;
  }, e.copy = function() {
    return Ld(t(), [n, i]).round(l).paddingInner(u).paddingOuter(s).align(c);
  }, Yt.apply(d(), arguments);
}
function gx(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return gx(t());
  }, e;
}
function bx() {
  return gx(Ld.apply(null, arguments).paddingInner(1));
}
function Rd(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function xx(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Za() {
}
var Sa = 0.7, wl = 1 / Sa, ri = "\\s*([+-]?\\d+)\\s*", Ia = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", hr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", PC = /^#([0-9a-f]{3,8})$/, OC = new RegExp(`^rgb\\(${ri},${ri},${ri}\\)$`), SC = new RegExp(`^rgb\\(${hr},${hr},${hr}\\)$`), IC = new RegExp(`^rgba\\(${ri},${ri},${ri},${Ia}\\)$`), kC = new RegExp(`^rgba\\(${hr},${hr},${hr},${Ia}\\)$`), jC = new RegExp(`^hsl\\(${Ia},${hr},${hr}\\)$`), TC = new RegExp(`^hsla\\(${Ia},${hr},${hr},${Ia}\\)$`), mp = {
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
Rd(Za, ka, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gp,
  // Deprecated! Use color.formatHex.
  formatHex: gp,
  formatHex8: EC,
  formatHsl: CC,
  formatRgb: bp,
  toString: bp
});
function gp() {
  return this.rgb().formatHex();
}
function EC() {
  return this.rgb().formatHex8();
}
function CC() {
  return wx(this).formatHsl();
}
function bp() {
  return this.rgb().formatRgb();
}
function ka(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = PC.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? xp(t) : r === 3 ? new bt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? So(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? So(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = OC.exec(e)) ? new bt(t[1], t[2], t[3], 1) : (t = SC.exec(e)) ? new bt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = IC.exec(e)) ? So(t[1], t[2], t[3], t[4]) : (t = kC.exec(e)) ? So(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = jC.exec(e)) ? Pp(t[1], t[2] / 100, t[3] / 100, 1) : (t = TC.exec(e)) ? Pp(t[1], t[2] / 100, t[3] / 100, t[4]) : mp.hasOwnProperty(e) ? xp(mp[e]) : e === "transparent" ? new bt(NaN, NaN, NaN, 0) : null;
}
function xp(e) {
  return new bt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function So(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new bt(e, t, r, n);
}
function DC(e) {
  return e instanceof Za || (e = ka(e)), e ? (e = e.rgb(), new bt(e.r, e.g, e.b, e.opacity)) : new bt();
}
function wc(e, t, r, n) {
  return arguments.length === 1 ? DC(e) : new bt(e, t, r, n ?? 1);
}
function bt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Rd(bt, wc, xx(Za, {
  brighter(e) {
    return e = e == null ? wl : Math.pow(wl, e), new bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Sa : Math.pow(Sa, e), new bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new bt(An(this.r), An(this.g), An(this.b), Al(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: wp,
  // Deprecated! Use color.formatHex.
  formatHex: wp,
  formatHex8: MC,
  formatRgb: Ap,
  toString: Ap
}));
function wp() {
  return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}`;
}
function MC() {
  return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}${yn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ap() {
  const e = Al(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${An(this.r)}, ${An(this.g)}, ${An(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Al(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function An(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function yn(e) {
  return e = An(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Pp(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Jt(e, t, r, n);
}
function wx(e) {
  if (e instanceof Jt) return new Jt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Za || (e = ka(e)), !e) return new Jt();
  if (e instanceof Jt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, l = a - i, u = (a + i) / 2;
  return l ? (t === a ? o = (r - n) / l + (r < n) * 6 : r === a ? o = (n - t) / l + 2 : o = (t - r) / l + 4, l /= u < 0.5 ? a + i : 2 - a - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new Jt(o, l, u, e.opacity);
}
function $C(e, t, r, n) {
  return arguments.length === 1 ? wx(e) : new Jt(e, t, r, n ?? 1);
}
function Jt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Rd(Jt, $C, xx(Za, {
  brighter(e) {
    return e = e == null ? wl : Math.pow(wl, e), new Jt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Sa : Math.pow(Sa, e), new Jt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new bt(
      Is(e >= 240 ? e - 240 : e + 120, i, n),
      Is(e, i, n),
      Is(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new Jt(Op(this.h), Io(this.s), Io(this.l), Al(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Al(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Op(this.h)}, ${Io(this.s) * 100}%, ${Io(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Op(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Io(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Is(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Bd = (e) => () => e;
function _C(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function NC(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function LC(e) {
  return (e = +e) == 1 ? Ax : function(t, r) {
    return r - t ? NC(t, r, e) : Bd(isNaN(t) ? r : t);
  };
}
function Ax(e, t) {
  var r = t - e;
  return r ? _C(e, r) : Bd(isNaN(e) ? t : e);
}
const Sp = (function e(t) {
  var r = LC(t);
  function n(i, a) {
    var o = r((i = wc(i)).r, (a = wc(a)).r), l = r(i.g, a.g), u = r(i.b, a.b), s = Ax(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = l(c), i.b = u(c), i.opacity = s(c), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function RC(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function BC(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function zC(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = Ni(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(l) {
    for (o = 0; o < n; ++o) a[o] = i[o](l);
    return a;
  };
}
function KC(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Pl(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function WC(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = Ni(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var Ac = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ks = new RegExp(Ac.source, "g");
function FC(e) {
  return function() {
    return e;
  };
}
function UC(e) {
  return function(t) {
    return e(t) + "";
  };
}
function XC(e, t) {
  var r = Ac.lastIndex = ks.lastIndex = 0, n, i, a, o = -1, l = [], u = [];
  for (e = e + "", t = t + ""; (n = Ac.exec(e)) && (i = ks.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), l[o] ? l[o] += a : l[++o] = a), (n = n[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: Pl(n, i) })), r = ks.lastIndex;
  return r < t.length && (a = t.slice(r), l[o] ? l[o] += a : l[++o] = a), l.length < 2 ? u[0] ? UC(u[0].x) : FC(t) : (t = u.length, function(s) {
    for (var c = 0, d; c < t; ++c) l[(d = u[c]).i] = d.x(s);
    return l.join("");
  });
}
function Ni(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Bd(t) : (r === "number" ? Pl : r === "string" ? (n = ka(t)) ? (t = n, Sp) : XC : t instanceof ka ? Sp : t instanceof Date ? KC : BC(t) ? RC : Array.isArray(t) ? zC : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? WC : Pl)(e, t);
}
function zd(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function HC(e, t) {
  t === void 0 && (t = e, e = Ni);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var l = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[l](o - l);
  };
}
function YC(e) {
  return function() {
    return e;
  };
}
function Ol(e) {
  return +e;
}
var Ip = [0, 1];
function pt(e) {
  return e;
}
function Pc(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : YC(isNaN(t) ? NaN : 0.5);
}
function VC(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function GC(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = Pc(i, n), a = r(o, a)) : (n = Pc(n, i), a = r(a, o)), function(l) {
    return a(n(l));
  };
}
function qC(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = Pc(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(l) {
    var u = qa(e, l, 1, n) - 1;
    return a[u](i[u](l));
  };
}
function Ja(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function _u() {
  var e = Ip, t = Ip, r = Ni, n, i, a, o = pt, l, u, s;
  function c() {
    var f = Math.min(e.length, t.length);
    return o !== pt && (o = VC(e[0], e[f - 1])), l = f > 2 ? qC : GC, u = s = null, d;
  }
  function d(f) {
    return f == null || isNaN(f = +f) ? a : (u || (u = l(e.map(n), t, r)))(n(o(f)));
  }
  return d.invert = function(f) {
    return o(i((s || (s = l(t, e.map(n), Pl)))(f)));
  }, d.domain = function(f) {
    return arguments.length ? (e = Array.from(f, Ol), c()) : e.slice();
  }, d.range = function(f) {
    return arguments.length ? (t = Array.from(f), c()) : t.slice();
  }, d.rangeRound = function(f) {
    return t = Array.from(f), r = zd, c();
  }, d.clamp = function(f) {
    return arguments.length ? (o = f ? !0 : pt, c()) : o !== pt;
  }, d.interpolate = function(f) {
    return arguments.length ? (r = f, c()) : r;
  }, d.unknown = function(f) {
    return arguments.length ? (a = f, d) : a;
  }, function(f, v) {
    return n = f, i = v, c();
  };
}
function Kd() {
  return _u()(pt, pt);
}
function ZC(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Sl(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function di(e) {
  return e = Sl(Math.abs(e)), e ? e[1] : NaN;
}
function JC(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, l = e[0], u = 0; i > 0 && l > 0 && (u + l + 1 > n && (l = Math.max(1, n - u)), a.push(r.substring(i -= l, i + l)), !((u += l + 1) > n)); )
      l = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function QC(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var eD = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ja(e) {
  if (!(t = eD.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new Wd({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
ja.prototype = Wd.prototype;
function Wd(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
Wd.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function tD(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = i = r;
        break;
      case "0":
        n === 0 && (n = r), i = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var Il;
function rD(e, t) {
  var r = Sl(e, t);
  if (!r) return Il = void 0, e.toPrecision(t);
  var n = r[0], i = r[1], a = i - (Il = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + Sl(e, Math.max(0, t + a - 1))[0];
}
function kp(e, t) {
  var r = Sl(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const jp = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: ZC,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => kp(e * 100, t),
  r: kp,
  s: rD,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Tp(e) {
  return e;
}
var Ep = Array.prototype.map, Cp = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function nD(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Tp : JC(Ep.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Tp : QC(Ep.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", l = e.minus === void 0 ? "−" : e.minus + "", u = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(d, f) {
    d = ja(d);
    var v = d.fill, h = d.align, p = d.sign, m = d.symbol, g = d.zero, w = d.width, x = d.comma, A = d.precision, P = d.trim, b = d.type;
    b === "n" ? (x = !0, b = "g") : jp[b] || (A === void 0 && (A = 12), P = !0, b = "g"), (g || v === "0" && h === "=") && (g = !0, v = "0", h = "=");
    var O = (f && f.prefix !== void 0 ? f.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(b) ? "0" + b.toLowerCase() : ""), I = (m === "$" ? n : /[%p]/.test(b) ? o : "") + (f && f.suffix !== void 0 ? f.suffix : ""), E = jp[b], j = /[defgprs%]/.test(b);
    A = A === void 0 ? 6 : /[gprs]/.test(b) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));
    function T(k) {
      var _ = O, $ = I, M, R, K;
      if (b === "c")
        $ = E(k) + $, k = "";
      else {
        k = +k;
        var N = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? u : E(Math.abs(k), A), P && (k = tD(k)), N && +k == 0 && p !== "+" && (N = !1), _ = (N ? p === "(" ? p : l : p === "-" || p === "(" ? "" : p) + _, $ = (b === "s" && !isNaN(k) && Il !== void 0 ? Cp[8 + Il / 3] : "") + $ + (N && p === "(" ? ")" : ""), j) {
          for (M = -1, R = k.length; ++M < R; )
            if (K = k.charCodeAt(M), 48 > K || K > 57) {
              $ = (K === 46 ? i + k.slice(M + 1) : k.slice(M)) + $, k = k.slice(0, M);
              break;
            }
        }
      }
      x && !g && (k = t(k, 1 / 0));
      var z = _.length + k.length + $.length, W = z < w ? new Array(w - z + 1).join(v) : "";
      switch (x && g && (k = t(W + k, W.length ? w - $.length : 1 / 0), W = ""), h) {
        case "<":
          k = _ + k + $ + W;
          break;
        case "=":
          k = _ + W + k + $;
          break;
        case "^":
          k = W.slice(0, z = W.length >> 1) + _ + k + $ + W.slice(z);
          break;
        default:
          k = W + _ + k + $;
          break;
      }
      return a(k);
    }
    return T.toString = function() {
      return d + "";
    }, T;
  }
  function c(d, f) {
    var v = Math.max(-8, Math.min(8, Math.floor(di(f) / 3))) * 3, h = Math.pow(10, -v), p = s((d = ja(d), d.type = "f", d), { suffix: Cp[8 + v / 3] });
    return function(m) {
      return p(h * m);
    };
  }
  return {
    format: s,
    formatPrefix: c
  };
}
var ko, Fd, Px;
iD({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function iD(e) {
  return ko = nD(e), Fd = ko.format, Px = ko.formatPrefix, ko;
}
function aD(e) {
  return Math.max(0, -di(Math.abs(e)));
}
function oD(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(di(t) / 3))) * 3 - di(Math.abs(e)));
}
function lD(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, di(t) - di(e)) + 1;
}
function Ox(e, t, r, n) {
  var i = bc(e, t, r), a;
  switch (n = ja(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = oD(i, o)) && (n.precision = a), Px(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = lD(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = aD(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return Fd(n);
}
function en(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return mc(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return Ox(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], l = n[a], u, s, c = 10;
    for (l < o && (s = o, o = l, l = s, s = i, i = a, a = s); c-- > 0; ) {
      if (s = gc(o, l, r), s === u)
        return n[i] = o, n[a] = l, t(n);
      if (s > 0)
        o = Math.floor(o / s) * s, l = Math.ceil(l / s) * s;
      else if (s < 0)
        o = Math.ceil(o * s) / s, l = Math.floor(l * s) / s;
      else
        break;
      u = s;
    }
    return e;
  }, e;
}
function Ud() {
  var e = Kd();
  return e.copy = function() {
    return Ja(e, Ud());
  }, Yt.apply(e, arguments), en(e);
}
function Sx(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Ol), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return Sx(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Ol) : [0, 1], en(r);
}
function Ix(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function Dp(e) {
  return Math.log(e);
}
function Mp(e) {
  return Math.exp(e);
}
function uD(e) {
  return -Math.log(-e);
}
function sD(e) {
  return -Math.exp(-e);
}
function cD(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function dD(e) {
  return e === 10 ? cD : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function fD(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function $p(e) {
  return (t, r) => -e(-t, r);
}
function Xd(e) {
  const t = e(Dp, Mp), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = fD(n), a = dD(n), r()[0] < 0 ? (i = $p(i), a = $p(a), e(uD, sD)) : e(Dp, Mp), t;
  }
  return t.base = function(l) {
    return arguments.length ? (n = +l, o()) : n;
  }, t.domain = function(l) {
    return arguments.length ? (r(l), o()) : r();
  }, t.ticks = (l) => {
    const u = r();
    let s = u[0], c = u[u.length - 1];
    const d = c < s;
    d && ([s, c] = [c, s]);
    let f = i(s), v = i(c), h, p;
    const m = l == null ? 10 : +l;
    let g = [];
    if (!(n % 1) && v - f < m) {
      if (f = Math.floor(f), v = Math.ceil(v), s > 0) {
        for (; f <= v; ++f)
          for (h = 1; h < n; ++h)
            if (p = f < 0 ? h / a(-f) : h * a(f), !(p < s)) {
              if (p > c) break;
              g.push(p);
            }
      } else for (; f <= v; ++f)
        for (h = n - 1; h >= 1; --h)
          if (p = f > 0 ? h / a(-f) : h * a(f), !(p < s)) {
            if (p > c) break;
            g.push(p);
          }
      g.length * 2 < m && (g = mc(s, c, m));
    } else
      g = mc(f, v, Math.min(v - f, m)).map(a);
    return d ? g.reverse() : g;
  }, t.tickFormat = (l, u) => {
    if (l == null && (l = 10), u == null && (u = n === 10 ? "s" : ","), typeof u != "function" && (!(n % 1) && (u = ja(u)).precision == null && (u.trim = !0), u = Fd(u)), l === 1 / 0) return u;
    const s = Math.max(1, n * l / t.ticks().length);
    return (c) => {
      let d = c / a(Math.round(i(c)));
      return d * n < n - 0.5 && (d *= n), d <= s ? u(c) : "";
    };
  }, t.nice = () => r(Ix(r(), {
    floor: (l) => a(Math.floor(i(l))),
    ceil: (l) => a(Math.ceil(i(l)))
  })), t;
}
function kx() {
  const e = Xd(_u()).domain([1, 10]);
  return e.copy = () => Ja(e, kx()).base(e.base()), Yt.apply(e, arguments), e;
}
function _p(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Np(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Hd(e) {
  var t = 1, r = e(_p(t), Np(t));
  return r.constant = function(n) {
    return arguments.length ? e(_p(t = +n), Np(t)) : t;
  }, en(r);
}
function jx() {
  var e = Hd(_u());
  return e.copy = function() {
    return Ja(e, jx()).constant(e.constant());
  }, Yt.apply(e, arguments);
}
function Lp(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function vD(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function hD(e) {
  return e < 0 ? -e * e : e * e;
}
function Yd(e) {
  var t = e(pt, pt), r = 1;
  function n() {
    return r === 1 ? e(pt, pt) : r === 0.5 ? e(vD, hD) : e(Lp(r), Lp(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, en(t);
}
function Vd() {
  var e = Yd(_u());
  return e.copy = function() {
    return Ja(e, Vd()).exponent(e.exponent());
  }, Yt.apply(e, arguments), e;
}
function pD() {
  return Vd.apply(null, arguments).exponent(0.5);
}
function Rp(e) {
  return Math.sign(e) * e * e;
}
function yD(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Tx() {
  var e = Kd(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = yD(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(Rp(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, Ol)).map(Rp)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Tx(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, Yt.apply(i, arguments), en(i);
}
function Ex() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, l = Math.max(1, t.length);
    for (r = new Array(l - 1); ++o < l; ) r[o - 1] = wC(e, o / l);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[qa(r, o)];
  }
  return a.invertExtent = function(o) {
    var l = t.indexOf(o);
    return l < 0 ? [NaN, NaN] : [
      l > 0 ? r[l - 1] : e[0],
      l < r.length ? r[l] : e[e.length - 1]
    ];
  }, a.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let l of o) l != null && !isNaN(l = +l) && e.push(l);
    return e.sort(qr), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return Ex().domain(e).range(t).unknown(n);
  }, Yt.apply(a, arguments);
}
function Cx() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(u) {
    return u != null && u <= u ? i[qa(n, u, 0, r)] : a;
  }
  function l() {
    var u = -1;
    for (n = new Array(r); ++u < r; ) n[u] = ((u + 1) * t - (u - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(u) {
    return arguments.length ? ([e, t] = u, e = +e, t = +t, l()) : [e, t];
  }, o.range = function(u) {
    return arguments.length ? (r = (i = Array.from(u)).length - 1, l()) : i.slice();
  }, o.invertExtent = function(u) {
    var s = i.indexOf(u);
    return s < 0 ? [NaN, NaN] : s < 1 ? [e, n[0]] : s >= r ? [n[r - 1], t] : [n[s - 1], n[s]];
  }, o.unknown = function(u) {
    return arguments.length && (a = u), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return Cx().domain([e, t]).range(i).unknown(a);
  }, Yt.apply(en(o), arguments);
}
function Dx() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[qa(e, a, 0, n)] : r;
  }
  return i.domain = function(a) {
    return arguments.length ? (e = Array.from(a), n = Math.min(e.length, t.length - 1), i) : e.slice();
  }, i.range = function(a) {
    return arguments.length ? (t = Array.from(a), n = Math.min(e.length, t.length - 1), i) : t.slice();
  }, i.invertExtent = function(a) {
    var o = t.indexOf(a);
    return [e[o - 1], e[o]];
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return Dx().domain(e).range(t).unknown(r);
  }, Yt.apply(i, arguments);
}
const js = /* @__PURE__ */ new Date(), Ts = /* @__PURE__ */ new Date();
function Je(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = (a) => (e(a = /* @__PURE__ */ new Date(+a)), a), i.ceil = (a) => (e(a = new Date(a - 1)), t(a, 1), e(a), a), i.round = (a) => {
    const o = i(a), l = i.ceil(a);
    return a - o < l - a ? o : l;
  }, i.offset = (a, o) => (t(a = /* @__PURE__ */ new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, l) => {
    const u = [];
    if (a = i.ceil(a), l = l == null ? 1 : Math.floor(l), !(a < o) || !(l > 0)) return u;
    let s;
    do
      u.push(s = /* @__PURE__ */ new Date(+a)), t(a, l), e(a);
    while (s < a && a < o);
    return u;
  }, i.filter = (a) => Je((o) => {
    if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
  }, (o, l) => {
    if (o >= o)
      if (l < 0) for (; ++l <= 0; )
        for (; t(o, -1), !a(o); )
          ;
      else for (; --l >= 0; )
        for (; t(o, 1), !a(o); )
          ;
  }), r && (i.count = (a, o) => (js.setTime(+a), Ts.setTime(+o), e(js), e(Ts), Math.floor(r(js, Ts))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const kl = Je(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
kl.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Je((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : kl);
kl.range;
const jr = 1e3, Kt = jr * 60, Tr = Kt * 60, $r = Tr * 24, Gd = $r * 7, Bp = $r * 30, Es = $r * 365, mn = Je((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * jr);
}, (e, t) => (t - e) / jr, (e) => e.getUTCSeconds());
mn.range;
const qd = Je((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * jr);
}, (e, t) => {
  e.setTime(+e + t * Kt);
}, (e, t) => (t - e) / Kt, (e) => e.getMinutes());
qd.range;
const Zd = Je((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * Kt);
}, (e, t) => (t - e) / Kt, (e) => e.getUTCMinutes());
Zd.range;
const Jd = Je((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * jr - e.getMinutes() * Kt);
}, (e, t) => {
  e.setTime(+e + t * Tr);
}, (e, t) => (t - e) / Tr, (e) => e.getHours());
Jd.range;
const Qd = Je((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Tr);
}, (e, t) => (t - e) / Tr, (e) => e.getUTCHours());
Qd.range;
const Qa = Je(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Kt) / $r,
  (e) => e.getDate() - 1
);
Qa.range;
const Nu = Je((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / $r, (e) => e.getUTCDate() - 1);
Nu.range;
const Mx = Je((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / $r, (e) => Math.floor(e / $r));
Mx.range;
function Nn(e) {
  return Je((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Kt) / Gd);
}
const Lu = Nn(0), jl = Nn(1), mD = Nn(2), gD = Nn(3), fi = Nn(4), bD = Nn(5), xD = Nn(6);
Lu.range;
jl.range;
mD.range;
gD.range;
fi.range;
bD.range;
xD.range;
function Ln(e) {
  return Je((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / Gd);
}
const Ru = Ln(0), Tl = Ln(1), wD = Ln(2), AD = Ln(3), vi = Ln(4), PD = Ln(5), OD = Ln(6);
Ru.range;
Tl.range;
wD.range;
AD.range;
vi.range;
PD.range;
OD.range;
const ef = Je((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
ef.range;
const tf = Je((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
tf.range;
const _r = Je((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
_r.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Je((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
_r.range;
const Nr = Je((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Nr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Je((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Nr.range;
function $x(e, t, r, n, i, a) {
  const o = [
    [mn, 1, jr],
    [mn, 5, 5 * jr],
    [mn, 15, 15 * jr],
    [mn, 30, 30 * jr],
    [a, 1, Kt],
    [a, 5, 5 * Kt],
    [a, 15, 15 * Kt],
    [a, 30, 30 * Kt],
    [i, 1, Tr],
    [i, 3, 3 * Tr],
    [i, 6, 6 * Tr],
    [i, 12, 12 * Tr],
    [n, 1, $r],
    [n, 2, 2 * $r],
    [r, 1, Gd],
    [t, 1, Bp],
    [t, 3, 3 * Bp],
    [e, 1, Es]
  ];
  function l(s, c, d) {
    const f = c < s;
    f && ([s, c] = [c, s]);
    const v = d && typeof d.range == "function" ? d : u(s, c, d), h = v ? v.range(s, +c + 1) : [];
    return f ? h.reverse() : h;
  }
  function u(s, c, d) {
    const f = Math.abs(c - s) / d, v = _d(([, , m]) => m).right(o, f);
    if (v === o.length) return e.every(bc(s / Es, c / Es, d));
    if (v === 0) return kl.every(Math.max(bc(s, c, d), 1));
    const [h, p] = o[f / o[v - 1][2] < o[v][2] / f ? v - 1 : v];
    return h.every(p);
  }
  return [l, u];
}
const [SD, ID] = $x(Nr, tf, Ru, Mx, Qd, Zd), [kD, jD] = $x(_r, ef, Lu, Qa, Jd, qd);
function Cs(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Ds(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function ra(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function TD(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, l = e.months, u = e.shortMonths, s = na(i), c = ia(i), d = na(a), f = ia(a), v = na(o), h = ia(o), p = na(l), m = ia(l), g = na(u), w = ia(u), x = {
    a: K,
    A: N,
    b: z,
    B: W,
    c: null,
    d: Xp,
    e: Xp,
    f: JD,
    g: uM,
    G: cM,
    H: GD,
    I: qD,
    j: ZD,
    L: _x,
    m: QD,
    M: eM,
    p: Z,
    q: ne,
    Q: Vp,
    s: Gp,
    S: tM,
    u: rM,
    U: nM,
    V: iM,
    w: aM,
    W: oM,
    x: null,
    X: null,
    y: lM,
    Y: sM,
    Z: dM,
    "%": Yp
  }, A = {
    a: ce,
    A: ve,
    b: Te,
    B: Ke,
    c: null,
    d: Hp,
    e: Hp,
    f: pM,
    g: SM,
    G: kM,
    H: fM,
    I: vM,
    j: hM,
    L: Lx,
    m: yM,
    M: mM,
    p: Fe,
    q: $t,
    Q: Vp,
    s: Gp,
    S: gM,
    u: bM,
    U: xM,
    V: wM,
    w: AM,
    W: PM,
    x: null,
    X: null,
    y: OM,
    Y: IM,
    Z: jM,
    "%": Yp
  }, P = {
    a: j,
    A: T,
    b: k,
    B: _,
    c: $,
    d: Fp,
    e: Fp,
    f: XD,
    g: Wp,
    G: Kp,
    H: Up,
    I: Up,
    j: KD,
    L: UD,
    m: zD,
    M: WD,
    p: E,
    q: BD,
    Q: YD,
    s: VD,
    S: FD,
    u: $D,
    U: _D,
    V: ND,
    w: MD,
    W: LD,
    x: M,
    X: R,
    y: Wp,
    Y: Kp,
    Z: RD,
    "%": HD
  };
  x.x = b(r, x), x.X = b(n, x), x.c = b(t, x), A.x = b(r, A), A.X = b(n, A), A.c = b(t, A);
  function b(B, U) {
    return function(q) {
      var D = [], Be = -1, ge = 0, Y = B.length, Qe, It, qi;
      for (q instanceof Date || (q = /* @__PURE__ */ new Date(+q)); ++Be < Y; )
        B.charCodeAt(Be) === 37 && (D.push(B.slice(ge, Be)), (It = zp[Qe = B.charAt(++Be)]) != null ? Qe = B.charAt(++Be) : It = Qe === "e" ? " " : "0", (qi = U[Qe]) && (Qe = qi(q, It)), D.push(Qe), ge = Be + 1);
      return D.push(B.slice(ge, Be)), D.join("");
    };
  }
  function O(B, U) {
    return function(q) {
      var D = ra(1900, void 0, 1), Be = I(D, B, q += "", 0), ge, Y;
      if (Be != q.length) return null;
      if ("Q" in D) return new Date(D.Q);
      if ("s" in D) return new Date(D.s * 1e3 + ("L" in D ? D.L : 0));
      if (U && !("Z" in D) && (D.Z = 0), "p" in D && (D.H = D.H % 12 + D.p * 12), D.m === void 0 && (D.m = "q" in D ? D.q : 0), "V" in D) {
        if (D.V < 1 || D.V > 53) return null;
        "w" in D || (D.w = 1), "Z" in D ? (ge = Ds(ra(D.y, 0, 1)), Y = ge.getUTCDay(), ge = Y > 4 || Y === 0 ? Tl.ceil(ge) : Tl(ge), ge = Nu.offset(ge, (D.V - 1) * 7), D.y = ge.getUTCFullYear(), D.m = ge.getUTCMonth(), D.d = ge.getUTCDate() + (D.w + 6) % 7) : (ge = Cs(ra(D.y, 0, 1)), Y = ge.getDay(), ge = Y > 4 || Y === 0 ? jl.ceil(ge) : jl(ge), ge = Qa.offset(ge, (D.V - 1) * 7), D.y = ge.getFullYear(), D.m = ge.getMonth(), D.d = ge.getDate() + (D.w + 6) % 7);
      } else ("W" in D || "U" in D) && ("w" in D || (D.w = "u" in D ? D.u % 7 : "W" in D ? 1 : 0), Y = "Z" in D ? Ds(ra(D.y, 0, 1)).getUTCDay() : Cs(ra(D.y, 0, 1)).getDay(), D.m = 0, D.d = "W" in D ? (D.w + 6) % 7 + D.W * 7 - (Y + 5) % 7 : D.w + D.U * 7 - (Y + 6) % 7);
      return "Z" in D ? (D.H += D.Z / 100 | 0, D.M += D.Z % 100, Ds(D)) : Cs(D);
    };
  }
  function I(B, U, q, D) {
    for (var Be = 0, ge = U.length, Y = q.length, Qe, It; Be < ge; ) {
      if (D >= Y) return -1;
      if (Qe = U.charCodeAt(Be++), Qe === 37) {
        if (Qe = U.charAt(Be++), It = P[Qe in zp ? U.charAt(Be++) : Qe], !It || (D = It(B, q, D)) < 0) return -1;
      } else if (Qe != q.charCodeAt(D++))
        return -1;
    }
    return D;
  }
  function E(B, U, q) {
    var D = s.exec(U.slice(q));
    return D ? (B.p = c.get(D[0].toLowerCase()), q + D[0].length) : -1;
  }
  function j(B, U, q) {
    var D = v.exec(U.slice(q));
    return D ? (B.w = h.get(D[0].toLowerCase()), q + D[0].length) : -1;
  }
  function T(B, U, q) {
    var D = d.exec(U.slice(q));
    return D ? (B.w = f.get(D[0].toLowerCase()), q + D[0].length) : -1;
  }
  function k(B, U, q) {
    var D = g.exec(U.slice(q));
    return D ? (B.m = w.get(D[0].toLowerCase()), q + D[0].length) : -1;
  }
  function _(B, U, q) {
    var D = p.exec(U.slice(q));
    return D ? (B.m = m.get(D[0].toLowerCase()), q + D[0].length) : -1;
  }
  function $(B, U, q) {
    return I(B, t, U, q);
  }
  function M(B, U, q) {
    return I(B, r, U, q);
  }
  function R(B, U, q) {
    return I(B, n, U, q);
  }
  function K(B) {
    return o[B.getDay()];
  }
  function N(B) {
    return a[B.getDay()];
  }
  function z(B) {
    return u[B.getMonth()];
  }
  function W(B) {
    return l[B.getMonth()];
  }
  function Z(B) {
    return i[+(B.getHours() >= 12)];
  }
  function ne(B) {
    return 1 + ~~(B.getMonth() / 3);
  }
  function ce(B) {
    return o[B.getUTCDay()];
  }
  function ve(B) {
    return a[B.getUTCDay()];
  }
  function Te(B) {
    return u[B.getUTCMonth()];
  }
  function Ke(B) {
    return l[B.getUTCMonth()];
  }
  function Fe(B) {
    return i[+(B.getUTCHours() >= 12)];
  }
  function $t(B) {
    return 1 + ~~(B.getUTCMonth() / 3);
  }
  return {
    format: function(B) {
      var U = b(B += "", x);
      return U.toString = function() {
        return B;
      }, U;
    },
    parse: function(B) {
      var U = O(B += "", !1);
      return U.toString = function() {
        return B;
      }, U;
    },
    utcFormat: function(B) {
      var U = b(B += "", A);
      return U.toString = function() {
        return B;
      }, U;
    },
    utcParse: function(B) {
      var U = O(B += "", !0);
      return U.toString = function() {
        return B;
      }, U;
    }
  };
}
var zp = { "-": "", _: " ", 0: "0" }, it = /^\s*\d+/, ED = /^%/, CD = /[\\^$*+?|[\]().{}]/g;
function me(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function DD(e) {
  return e.replace(CD, "\\$&");
}
function na(e) {
  return new RegExp("^(?:" + e.map(DD).join("|") + ")", "i");
}
function ia(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function MD(e, t, r) {
  var n = it.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function $D(e, t, r) {
  var n = it.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function _D(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function ND(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function LD(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Kp(e, t, r) {
  var n = it.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function Wp(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function RD(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function BD(e, t, r) {
  var n = it.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function zD(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function Fp(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function KD(e, t, r) {
  var n = it.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function Up(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function WD(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function FD(e, t, r) {
  var n = it.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function UD(e, t, r) {
  var n = it.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function XD(e, t, r) {
  var n = it.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function HD(e, t, r) {
  var n = ED.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function YD(e, t, r) {
  var n = it.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function VD(e, t, r) {
  var n = it.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function Xp(e, t) {
  return me(e.getDate(), t, 2);
}
function GD(e, t) {
  return me(e.getHours(), t, 2);
}
function qD(e, t) {
  return me(e.getHours() % 12 || 12, t, 2);
}
function ZD(e, t) {
  return me(1 + Qa.count(_r(e), e), t, 3);
}
function _x(e, t) {
  return me(e.getMilliseconds(), t, 3);
}
function JD(e, t) {
  return _x(e, t) + "000";
}
function QD(e, t) {
  return me(e.getMonth() + 1, t, 2);
}
function eM(e, t) {
  return me(e.getMinutes(), t, 2);
}
function tM(e, t) {
  return me(e.getSeconds(), t, 2);
}
function rM(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function nM(e, t) {
  return me(Lu.count(_r(e) - 1, e), t, 2);
}
function Nx(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? fi(e) : fi.ceil(e);
}
function iM(e, t) {
  return e = Nx(e), me(fi.count(_r(e), e) + (_r(e).getDay() === 4), t, 2);
}
function aM(e) {
  return e.getDay();
}
function oM(e, t) {
  return me(jl.count(_r(e) - 1, e), t, 2);
}
function lM(e, t) {
  return me(e.getFullYear() % 100, t, 2);
}
function uM(e, t) {
  return e = Nx(e), me(e.getFullYear() % 100, t, 2);
}
function sM(e, t) {
  return me(e.getFullYear() % 1e4, t, 4);
}
function cM(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? fi(e) : fi.ceil(e), me(e.getFullYear() % 1e4, t, 4);
}
function dM(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + me(t / 60 | 0, "0", 2) + me(t % 60, "0", 2);
}
function Hp(e, t) {
  return me(e.getUTCDate(), t, 2);
}
function fM(e, t) {
  return me(e.getUTCHours(), t, 2);
}
function vM(e, t) {
  return me(e.getUTCHours() % 12 || 12, t, 2);
}
function hM(e, t) {
  return me(1 + Nu.count(Nr(e), e), t, 3);
}
function Lx(e, t) {
  return me(e.getUTCMilliseconds(), t, 3);
}
function pM(e, t) {
  return Lx(e, t) + "000";
}
function yM(e, t) {
  return me(e.getUTCMonth() + 1, t, 2);
}
function mM(e, t) {
  return me(e.getUTCMinutes(), t, 2);
}
function gM(e, t) {
  return me(e.getUTCSeconds(), t, 2);
}
function bM(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function xM(e, t) {
  return me(Ru.count(Nr(e) - 1, e), t, 2);
}
function Rx(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? vi(e) : vi.ceil(e);
}
function wM(e, t) {
  return e = Rx(e), me(vi.count(Nr(e), e) + (Nr(e).getUTCDay() === 4), t, 2);
}
function AM(e) {
  return e.getUTCDay();
}
function PM(e, t) {
  return me(Tl.count(Nr(e) - 1, e), t, 2);
}
function OM(e, t) {
  return me(e.getUTCFullYear() % 100, t, 2);
}
function SM(e, t) {
  return e = Rx(e), me(e.getUTCFullYear() % 100, t, 2);
}
function IM(e, t) {
  return me(e.getUTCFullYear() % 1e4, t, 4);
}
function kM(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? vi(e) : vi.ceil(e), me(e.getUTCFullYear() % 1e4, t, 4);
}
function jM() {
  return "+0000";
}
function Yp() {
  return "%";
}
function Vp(e) {
  return +e;
}
function Gp(e) {
  return Math.floor(+e / 1e3);
}
var Hn, Bx, zx;
TM({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function TM(e) {
  return Hn = TD(e), Bx = Hn.format, Hn.parse, zx = Hn.utcFormat, Hn.utcParse, Hn;
}
function EM(e) {
  return new Date(e);
}
function CM(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function rf(e, t, r, n, i, a, o, l, u, s) {
  var c = Kd(), d = c.invert, f = c.domain, v = s(".%L"), h = s(":%S"), p = s("%I:%M"), m = s("%I %p"), g = s("%a %d"), w = s("%b %d"), x = s("%B"), A = s("%Y");
  function P(b) {
    return (u(b) < b ? v : l(b) < b ? h : o(b) < b ? p : a(b) < b ? m : n(b) < b ? i(b) < b ? g : w : r(b) < b ? x : A)(b);
  }
  return c.invert = function(b) {
    return new Date(d(b));
  }, c.domain = function(b) {
    return arguments.length ? f(Array.from(b, CM)) : f().map(EM);
  }, c.ticks = function(b) {
    var O = f();
    return e(O[0], O[O.length - 1], b ?? 10);
  }, c.tickFormat = function(b, O) {
    return O == null ? P : s(O);
  }, c.nice = function(b) {
    var O = f();
    return (!b || typeof b.range != "function") && (b = t(O[0], O[O.length - 1], b ?? 10)), b ? f(Ix(O, b)) : c;
  }, c.copy = function() {
    return Ja(c, rf(e, t, r, n, i, a, o, l, u, s));
  }, c;
}
function DM() {
  return Yt.apply(rf(kD, jD, _r, ef, Lu, Qa, Jd, qd, mn, Bx).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function MM() {
  return Yt.apply(rf(SD, ID, Nr, tf, Ru, Nu, Qd, Zd, mn, zx).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Bu() {
  var e = 0, t = 1, r, n, i, a, o = pt, l = !1, u;
  function s(d) {
    return d == null || isNaN(d = +d) ? u : o(i === 0 ? 0.5 : (d = (a(d) - r) * i, l ? Math.max(0, Math.min(1, d)) : d));
  }
  s.domain = function(d) {
    return arguments.length ? ([e, t] = d, r = a(e = +e), n = a(t = +t), i = r === n ? 0 : 1 / (n - r), s) : [e, t];
  }, s.clamp = function(d) {
    return arguments.length ? (l = !!d, s) : l;
  }, s.interpolator = function(d) {
    return arguments.length ? (o = d, s) : o;
  };
  function c(d) {
    return function(f) {
      var v, h;
      return arguments.length ? ([v, h] = f, o = d(v, h), s) : [o(0), o(1)];
    };
  }
  return s.range = c(Ni), s.rangeRound = c(zd), s.unknown = function(d) {
    return arguments.length ? (u = d, s) : u;
  }, function(d) {
    return a = d, r = d(e), n = d(t), i = r === n ? 0 : 1 / (n - r), s;
  };
}
function tn(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function Kx() {
  var e = en(Bu()(pt));
  return e.copy = function() {
    return tn(e, Kx());
  }, Kr.apply(e, arguments);
}
function Wx() {
  var e = Xd(Bu()).domain([1, 10]);
  return e.copy = function() {
    return tn(e, Wx()).base(e.base());
  }, Kr.apply(e, arguments);
}
function Fx() {
  var e = Hd(Bu());
  return e.copy = function() {
    return tn(e, Fx()).constant(e.constant());
  }, Kr.apply(e, arguments);
}
function nf() {
  var e = Yd(Bu());
  return e.copy = function() {
    return tn(e, nf()).exponent(e.exponent());
  }, Kr.apply(e, arguments);
}
function $M() {
  return nf.apply(null, arguments).exponent(0.5);
}
function Ux() {
  var e = [], t = pt;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((qa(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(qr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => xC(e, a / n));
  }, r.copy = function() {
    return Ux(t).domain(e);
  }, Kr.apply(r, arguments);
}
function zu() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, l, u, s = pt, c, d = !1, f;
  function v(p) {
    return isNaN(p = +p) ? f : (p = 0.5 + ((p = +c(p)) - a) * (n * p < n * a ? l : u), s(d ? Math.max(0, Math.min(1, p)) : p));
  }
  v.domain = function(p) {
    return arguments.length ? ([e, t, r] = p, i = c(e = +e), a = c(t = +t), o = c(r = +r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, v) : [e, t, r];
  }, v.clamp = function(p) {
    return arguments.length ? (d = !!p, v) : d;
  }, v.interpolator = function(p) {
    return arguments.length ? (s = p, v) : s;
  };
  function h(p) {
    return function(m) {
      var g, w, x;
      return arguments.length ? ([g, w, x] = m, s = HC(p, [g, w, x]), v) : [s(0), s(0.5), s(1)];
    };
  }
  return v.range = h(Ni), v.rangeRound = h(zd), v.unknown = function(p) {
    return arguments.length ? (f = p, v) : f;
  }, function(p) {
    return c = p, i = p(e), a = p(t), o = p(r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, v;
  };
}
function Xx() {
  var e = en(zu()(pt));
  return e.copy = function() {
    return tn(e, Xx());
  }, Kr.apply(e, arguments);
}
function Hx() {
  var e = Xd(zu()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return tn(e, Hx()).base(e.base());
  }, Kr.apply(e, arguments);
}
function Yx() {
  var e = Hd(zu());
  return e.copy = function() {
    return tn(e, Yx()).constant(e.constant());
  }, Kr.apply(e, arguments);
}
function af() {
  var e = Yd(zu());
  return e.copy = function() {
    return tn(e, af()).exponent(e.exponent());
  }, Kr.apply(e, arguments);
}
function _M() {
  return af.apply(null, arguments).exponent(0.5);
}
const Vx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: Ld,
  scaleDiverging: Xx,
  scaleDivergingLog: Hx,
  scaleDivergingPow: af,
  scaleDivergingSqrt: _M,
  scaleDivergingSymlog: Yx,
  scaleIdentity: Sx,
  scaleImplicit: xc,
  scaleLinear: Ud,
  scaleLog: kx,
  scaleOrdinal: Nd,
  scalePoint: bx,
  scalePow: Vd,
  scaleQuantile: Ex,
  scaleQuantize: Cx,
  scaleRadial: Tx,
  scaleSequential: Kx,
  scaleSequentialLog: Wx,
  scaleSequentialPow: nf,
  scaleSequentialQuantile: Ux,
  scaleSequentialSqrt: $M,
  scaleSequentialSymlog: Fx,
  scaleSqrt: pD,
  scaleSymlog: jx,
  scaleThreshold: Dx,
  scaleTime: DM,
  scaleUtc: MM,
  tickFormat: Ox
}, Symbol.toStringTag, { value: "Module" }));
function NM(e) {
  var t = Vx;
  if (e in t && typeof t[e] == "function")
    return t[e]();
  var r = "scale".concat(Ra(e));
  if (r in t && typeof t[r] == "function")
    return t[r]();
}
function qp(e, t, r) {
  if (typeof e == "function")
    return e.copy().domain(t).range(r);
  if (e != null) {
    var n = NM(e);
    if (n != null)
      return n.domain(t).range(r), n;
  }
}
function Ku(e, t, r, n) {
  if (!(r == null || n == null))
    return typeof e.scale == "function" ? qp(e.scale, r, n) : qp(t, r, n);
}
function LM(e) {
  return "scale".concat(Ra(e));
}
function RM(e) {
  return LM(e) in Vx;
}
var Gx = (e, t, r) => {
  if (e != null) {
    var n = e.scale, i = e.type;
    if (n === "auto")
      return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string")
      return RM(n) ? n : "point";
  }
};
function BM(e, t) {
  for (var r = 0, n = e.length, i = e[0] < e[e.length - 1]; r < n; ) {
    var a = Math.floor((r + n) / 2);
    (i ? e[a] < t : e[a] > t) ? r = a + 1 : n = a;
  }
  return r;
}
function qx(e, t) {
  if (e) {
    var r = t ?? e.domain(), n = r.map((a) => {
      var o;
      return (o = e(a)) !== null && o !== void 0 ? o : 0;
    }), i = e.range();
    if (!(r.length === 0 || i.length < 2))
      return (a) => {
        var o, l, u = BM(n, a);
        if (u <= 0)
          return r[0];
        if (u >= r.length)
          return r[r.length - 1];
        var s = (o = n[u - 1]) !== null && o !== void 0 ? o : 0, c = (l = n[u]) !== null && l !== void 0 ? l : 0;
        return Math.abs(a - s) <= Math.abs(a - c) ? r[u - 1] : r[u];
      };
  }
}
function zM(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : qx(e, void 0);
}
function Zp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function El(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zp(Object(r), !0).forEach(function(n) {
      KM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function KM(e, t, r) {
  return (t = WM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WM(e) {
  var t = FM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function FM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Zx(e, t) {
  return YM(e) || HM(e, t) || XM(e, t) || UM();
}
function UM() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function XM(e, t) {
  if (e) {
    if (typeof e == "string") return Jp(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Jp(e, t) : void 0;
  }
}
function Jp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function HM(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function YM(e) {
  if (Array.isArray(e)) return e;
}
var Oc = [0, "auto"], Ve = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0,
  niceTicks: "auto"
}, Jx = (e, t) => e.cartesianAxis.xAxis[t], br = (e, t) => {
  var r = Jx(e, t);
  return r ?? Ve;
}, Ge = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: Oc,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  niceTicks: "auto",
  width: Wa
}, Qx = (e, t) => e.cartesianAxis.yAxis[t], xr = (e, t) => {
  var r = Qx(e, t);
  return r ?? Ge;
}, Er = {
  domain: [0, "auto"],
  includeHidden: !1,
  reversed: !1,
  allowDataOverflow: !1,
  allowDuplicatedCategory: !1,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
}, of = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? Er;
}, Re = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return br(e, r);
    case "yAxis":
      return xr(e, r);
    case "zAxis":
      return of(e, r);
    case "angleAxis":
      return $n(e, r);
    case "radiusAxis":
      return $i(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, VM = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return br(e, r);
    case "yAxis":
      return xr(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, Rn = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return br(e, r);
    case "yAxis":
      return xr(e, r);
    case "angleAxis":
      return $n(e, r);
    case "radiusAxis":
      return $i(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, ew = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function lf(e, t) {
  return (r) => {
    switch (e) {
      case "xAxis":
        return "xAxisId" in r && r.xAxisId === t;
      case "yAxis":
        return "yAxisId" in r && r.yAxisId === t;
      case "zAxis":
        return "zAxisId" in r && r.zAxisId === t;
      case "angleAxis":
        return "angleAxisId" in r && r.angleAxisId === t;
      case "radiusAxis":
        return "radiusAxisId" in r && r.radiusAxisId === t;
      default:
        return !1;
    }
  };
}
var Bn = (e) => e.graphicalItems.cartesianItems, GM = S([je, Ya], lf), uf = (e, t, r) => e.filter(r).filter((n) => t?.includeHidden === !0 ? !0 : !n.hide), Li = S([Bn, Re, GM], uf, {
  memoizeOptions: {
    resultEqualityCheck: Mu
  }
}), tw = S([Li], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter(Va)), rw = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), qM = S([Li], rw), sf = (e) => e.map((t) => t.data).filter(Boolean).flat(1), ZM = S([Li], (e) => e.some((t) => !t.data)), nw = S([Li], sf, {
  memoizeOptions: {
    resultEqualityCheck: Mu
  }
}), cf = (e, t) => {
  var r = t.chartData, n = r === void 0 ? [] : r, i = t.dataStartIndex, a = t.dataEndIndex;
  return e.length > 0 ? e : n.slice(i, a + 1);
}, df = S([nw, Ti], cf), iw = (e, t, r) => t?.dataKey != null ? e.map((n) => ({
  value: G(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((i) => ({
  value: G(i, n)
}))) : e.map((n) => ({
  value: n
})), aw = (e, t, r, n, i, a) => {
  var o = n.chartData, l = o === void 0 ? [] : o, u = n.dataStartIndex, s = n.dataEndIndex, c = iw(e, t, r);
  if (i && t?.dataKey != null && a.length > 0) {
    var d = l.slice(u, s + 1), f = d.map((v) => ({
      value: G(v, t.dataKey)
    })).filter((v) => v.value != null);
    return [...f, ...c];
  }
  return c;
}, eo = S([df, Re, Li, Ti, ZM, nw], aw);
function ni(e) {
  if (tt(e) || e instanceof Date) {
    var t = Number(e);
    if (Q(t))
      return t;
  }
}
function Qp(e) {
  if (Array.isArray(e)) {
    var t = [ni(e[0]), ni(e[1])];
    return vr(t) ? t : void 0;
  }
  var r = ni(e);
  if (r != null)
    return [r, r];
}
function rr(e) {
  return e.map(ni).filter(rt);
}
function JM(e, t) {
  var r = ni(e), n = ni(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var QM = S([eo], (e) => e?.map((t) => t.value).sort(JM));
function ow(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function e$(e, t, r) {
  if (!r)
    return [];
  if (!r.length)
    return [];
  var n;
  if (typeof t == "number" && !Et(t))
    n = t;
  else if (Array.isArray(t)) {
    var i = rr(t);
    i.length > 0 && (n = Math.max(...i));
  }
  return n == null ? [] : rr(r.flatMap((a) => {
    var o = G(e, a.dataKey), l, u;
    if (Array.isArray(o)) {
      var s = Zx(o, 2);
      l = s[0], u = s[1];
    } else
      l = u = o;
    if (!(!Q(l) || !Q(u)))
      return [n - l, n + u];
  }));
}
var Ye = (e) => {
  var t = nt(e), r = _i(e);
  return Rn(e, t, r);
}, hi = S([Ye], (e) => e?.dataKey), t$ = S([tw, Ti, Ye], $d), ff = (e, t, r, n) => {
  var i = {}, a = t.reduce((o, l) => {
    if (l.stackId == null)
      return o;
    var u = o[l.stackId];
    return u == null && (u = []), u.push(l), o[l.stackId] = u, o;
  }, i);
  return Object.fromEntries(Object.entries(a).map((o) => {
    var l = Zx(o, 2), u = l[0], s = l[1], c = n ? [...s].reverse() : s, d = c.map(Du);
    return [u, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: mk(e, d, r),
      graphicalItems: c
    }];
  }));
}, Cl = S([t$, tw, Di, Cd], ff), lw = (e, t, r, n) => {
  var i = t.dataStartIndex, a = t.dataEndIndex;
  if (n == null && r !== "zAxis")
    return xk(e, i, a);
}, r$ = S([Re], (e) => e.allowDataOverflow), vf = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return Oc;
  if (e.domain != null)
    return e.domain;
  if ("ticks" in e && e.ticks != null) {
    if (e.type === "number") {
      var r = rr(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e?.domain) !== null && t !== void 0 ? t : Oc;
}, hf = S([Re], vf), pf = S([hf, r$], q0), n$ = S([Cl, Ht, je, pf], lw, {
  memoizeOptions: {
    resultEqualityCheck: Ga
  }
}), Wu = (e) => e.errorBars, i$ = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => ow(r, n)), Dl = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var a = i.flat(), o = Math.min(...a), l = Math.max(...a);
    return [o, l];
  }
}, yf = function(t, r, n, i, a) {
  var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], l, u;
  if (n.length > 0 && n.forEach((s) => {
    var c, d = s.data != null ? [...s.data] : o, f = (c = i[s.id]) === null || c === void 0 ? void 0 : c.filter((v) => ow(a, v));
    d.forEach((v) => {
      var h, p = G(v, (h = r.dataKey) !== null && h !== void 0 ? h : s.dataKey), m = e$(v, p, f);
      if (m.length >= 2) {
        var g = Math.min(...m), w = Math.max(...m);
        (l == null || g < l) && (l = g), (u == null || w > u) && (u = w);
      }
      var x = Qp(p);
      x != null && (l = l == null ? x[0] : Math.min(l, x[0]), u = u == null ? x[1] : Math.max(u, x[1]));
    });
  }), r?.dataKey != null && n.length === 0 && t.forEach((s) => {
    var c = Qp(G(s, r.dataKey));
    c != null && (l = l == null ? c[0] : Math.min(l, c[0]), u = u == null ? c[1] : Math.max(u, c[1]));
  }), Q(l) && Q(u))
    return [l, u];
}, a$ = S([df, Re, qM, Wu, je, LE], yf, {
  memoizeOptions: {
    resultEqualityCheck: Ga
  }
});
function o$(e) {
  var t = e.value;
  if (tt(t) || t instanceof Date)
    return t;
}
var l$ = (e, t, r) => {
  var n = e.map(o$).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && Hg(n)) ? Sd(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, uw = (e) => e.referenceElements.dots, Ri = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), u$ = S([uw, je, Ya], Ri), sw = (e) => e.referenceElements.areas, s$ = S([sw, je, Ya], Ri), cw = (e) => e.referenceElements.lines, c$ = S([cw, je, Ya], Ri), dw = (e, t) => {
  if (e != null) {
    var r = rr(e.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, d$ = S(u$, je, dw), fw = (e, t) => {
  if (e != null) {
    var r = rr(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, f$ = S([s$, je], fw);
function v$(e) {
  var t;
  if (e.x != null)
    return rr([e.x]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : rr(r);
}
function h$(e) {
  var t;
  if (e.y != null)
    return rr([e.y]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : rr(r);
}
var vw = (e, t) => {
  if (e != null) {
    var r = e.flatMap((n) => t === "xAxis" ? v$(n) : h$(n));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, p$ = S([c$, je], vw), y$ = S(d$, p$, f$, (e, t, r) => Dl(e, r, t)), mf = (e, t, r, n, i, a, o, l, u) => {
  if (r != null)
    return r;
  var s = o === "vertical" && l === "xAxis" || o === "horizontal" && l === "yAxis", c = s ? Dl(n, a, i) : Dl(a, i), d = UE(t, c, e.allowDataOverflow);
  return d ?? (e.allowDataOverflow && c == null && u != null ? u : d);
}, m$ = (e) => {
  if (!(e == null || e.type !== "number" || !("ticks" in e) || e.ticks == null)) {
    var t = rr(e.ticks);
    if (t.length !== 0)
      return [Math.min(...t), Math.max(...t)];
  }
}, g$ = S([Re], m$, {
  memoizeOptions: {
    resultEqualityCheck: Ga
  }
}), b$ = S([Re, hf, pf, n$, a$, y$, te, je, g$], mf, {
  memoizeOptions: {
    resultEqualityCheck: Ga
  }
}), x$ = [0, 1], gf = (e, t, r, n, i, a, o) => {
  if (!((e == null || r == null || r.length === 0) && o === void 0)) {
    var l = e.dataKey, u = e.type, s = Dt(t, a);
    if (s && l == null) {
      var c;
      return Sd(0, (c = r?.length) !== null && c !== void 0 ? c : 0);
    }
    return u === "category" ? l$(n, e, s) : i === "expand" && !s ? x$ : o;
  }
}, to = S([Re, te, df, eo, Di, je, b$], gf), wr = S([Re, ew, Dd], Gx), bf = (e, t, r) => {
  var n = t.niceTicks;
  if (n !== "none") {
    var i = vf(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && vr(e)) {
      if (a)
        return up(e, t.tickCount, t.allowDecimals, n);
      if (t.type === "number")
        return sp(e, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (a && vr(e))
        return up(e, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && vr(e))
        return sp(e, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, xf = S([to, Rn, wr], bf), wf = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && e?.type === "number" && vr(t) && Array.isArray(r) && r.length > 0
  ) {
    var i, a, o = t[0], l = (i = r[0]) !== null && i !== void 0 ? i : 0, u = t[1], s = (a = r[r.length - 1]) !== null && a !== void 0 ? a : 0;
    return [Math.min(o, l), Math.max(u, s)];
  }
  return t;
}, w$ = S([Re, to, xf, je], wf), A$ = S(eo, Re, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(rr(e.map((d) => d.value))).sort((d, f) => d - f), i = n[0], a = n[n.length - 1];
    if (i == null || a == null)
      return 1 / 0;
    var o = a - i;
    if (o === 0)
      return 1 / 0;
    for (var l = 0; l < n.length - 1; l++) {
      var u = n[l], s = n[l + 1];
      if (!(u == null || s == null)) {
        var c = s - u;
        r = Math.min(r, c);
      }
    }
    return r / o;
  }
}), hw = S(A$, te, Ed, He, (e, t, r, n, i) => i, (e, t, r, n, i) => {
  if (!Q(e))
    return 0;
  var a = t === "vertical" ? n.height : n.width;
  if (i === "gap")
    return e * a / 2;
  if (i === "no-gap") {
    var o = lt(r, e * a), l = e * a / 2;
    return l - o - (l - o) / a * o;
  }
  return 0;
}), P$ = (e, t, r) => {
  var n = br(e, t);
  return n == null || typeof n.padding != "string" ? 0 : hw(e, "xAxis", t, r, n.padding);
}, O$ = (e, t, r) => {
  var n = xr(e, t);
  return n == null || typeof n.padding != "string" ? 0 : hw(e, "yAxis", t, r, n.padding);
}, S$ = S(br, P$, (e, t) => {
  var r, n;
  if (e == null)
    return {
      left: 0,
      right: 0
    };
  var i = e.padding;
  return typeof i == "string" ? {
    left: t,
    right: t
  } : {
    left: ((r = i.left) !== null && r !== void 0 ? r : 0) + t,
    right: ((n = i.right) !== null && n !== void 0 ? n : 0) + t
  };
}), I$ = S(xr, O$, (e, t) => {
  var r, n;
  if (e == null)
    return {
      top: 0,
      bottom: 0
    };
  var i = e.padding;
  return typeof i == "string" ? {
    top: t,
    bottom: t
  } : {
    top: ((r = i.top) !== null && r !== void 0 ? r : 0) + t,
    bottom: ((n = i.bottom) !== null && n !== void 0 ? n : 0) + t
  };
}), pw = S([He, S$, Fa, Su, (e, t, r) => r], (e, t, r, n, i) => {
  var a = n.padding;
  return i ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), yw = S([He, te, I$, Fa, Su, (e, t, r) => r], (e, t, r, n, i, a) => {
  var o = i.padding;
  return a ? [n.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), ro = (e, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return pw(e, r, n);
    case "yAxis":
      return yw(e, r, n);
    case "zAxis":
      return (i = of(e, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return fx(e);
    case "radiusAxis":
      return vx(e, r);
    default:
      return;
  }
}, mw = S([Re, ro], Eu), k$ = S([wr, w$], hx), Af = S([Re, wr, k$, mw], Ku), Pf = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var i = r.type, a = r.scale, o = Dt(e, n);
    if (o && (i === "number" || a !== "auto"))
      return t.map((l) => l.value);
  }
}, Of = S([te, eo, Rn, je], Pf), Ut = S([Af], $u), gw = S([Af], zM), bw = S([Af, QM], qx);
S([Li, Wu, je], i$);
function xw(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var Fu = (e, t) => t, Uu = (e, t, r) => r, j$ = S(Pu, Fu, Uu, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(xw)), T$ = S(Ou, Fu, Uu, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(xw)), ww = (e, t) => {
  var r = typeof t.height == "number" ? t.height : yd;
  return {
    width: e.width,
    height: r
  };
}, E$ = (e, t) => {
  var r = typeof t.width == "number" ? t.width : Wa;
  return {
    width: r,
    height: e.height
  };
}, Aw = S(He, br, ww), C$ = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, D$ = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, M$ = S(gr, He, j$, Fu, Uu, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = ww(t, l);
    o == null && (o = C$(t, n, e));
    var s = n === "top" && !i || n === "bottom" && i;
    a[l.id] = o - Number(s) * u.height, o += (s ? -1 : 1) * u.height;
  }), a;
}), $$ = S(mr, He, T$, Fu, Uu, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = E$(t, l);
    o == null && (o = D$(t, n, e));
    var s = n === "left" && !i || n === "right" && i;
    a[l.id] = o - Number(s) * u.width, o += (s ? -1 : 1) * u.width;
  }), a;
}), _$ = (e, t) => {
  var r = br(e, t);
  if (r != null)
    return M$(e, r.orientation, r.mirror);
}, N$ = S([He, br, _$, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var i = r?.[n];
    return i == null ? {
      x: e.left,
      y: 0
    } : {
      x: e.left,
      y: i
    };
  }
}), L$ = (e, t) => {
  var r = xr(e, t);
  if (r != null)
    return $$(e, r.orientation, r.mirror);
}, R$ = S([He, xr, L$, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var i = r?.[n];
    return i == null ? {
      x: 0,
      y: e.top
    } : {
      x: i,
      y: e.top
    };
  }
}), Pw = S(He, xr, (e, t) => {
  var r = typeof t.width == "number" ? t.width : Wa;
  return {
    width: r,
    height: e.height
  };
}), ey = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Aw(e, r).width;
    case "yAxis":
      return Pw(e, r).height;
    default:
      return;
  }
}, Ow = (e, t, r, n) => {
  if (r != null) {
    var i = r.allowDuplicatedCategory, a = r.type, o = r.dataKey, l = Dt(e, n), u = t.map((c) => c.value), s = u.filter((c) => c != null);
    if (o && l && a === "category" && i && Hg(s))
      return u;
  }
}, no = S([te, eo, Re, je], Ow), ty = S([te, VM, wr, Ut, no, Of, ro, xf, je], (e, t, r, n, i, a, o, l, u) => {
  if (t != null) {
    var s = Dt(e, u);
    return {
      angle: t.angle,
      interval: t.interval,
      minTickGap: t.minTickGap,
      orientation: t.orientation,
      tick: t.tick,
      tickCount: t.tickCount,
      tickFormatter: t.tickFormatter,
      ticks: t.ticks,
      type: t.type,
      unit: t.unit,
      axisType: u,
      categoricalDomain: a,
      duplicateDomain: i,
      isCategorical: s,
      niceTicks: l,
      range: o,
      realScaleType: r,
      scale: n
    };
  }
}), Sw = (e, t, r, n, i, a, o, l, u) => {
  if (!(t == null || n == null)) {
    var s = Dt(e, u), c = t.type, d = t.ticks, f = t.tickCount, v = (
      // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
      r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2
    ), h = c === "category" && n.bandwidth ? n.bandwidth() / v : 0;
    h = u === "angleAxis" && a != null && a.length >= 2 ? Ue(a[0] - a[1]) * 2 * h : h;
    var p = d || i;
    return p ? p.map((m, g) => {
      var w = o ? o.indexOf(m) : m, x = n.map(w);
      return Q(x) ? {
        index: g,
        coordinate: x + h,
        value: m,
        offset: h
      } : null;
    }).filter(rt) : s && l ? l.map((m, g) => {
      var w = n.map(m);
      return Q(w) ? {
        coordinate: w + h,
        value: m,
        index: g,
        offset: h
      } : null;
    }).filter(rt) : n.ticks ? n.ticks(f).map((m, g) => {
      var w = n.map(m);
      return Q(w) ? {
        coordinate: w + h,
        value: m,
        index: g,
        offset: h
      } : null;
    }).filter(rt) : n.domain().map((m, g) => {
      var w = n.map(m);
      return Q(w) ? {
        coordinate: w + h,
        // @ts-expect-error can't use Date as index
        value: o ? o[m] : m,
        index: g,
        offset: h
      } : null;
    }).filter(rt);
  }
}, Iw = S([te, Rn, wr, Ut, xf, ro, no, Of, je], Sw), kw = (e, t, r, n, i, a, o) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var l = Dt(e, o), u = t.tickCount, s = 0;
    return s = o === "angleAxis" && n?.length >= 2 ? Ue(n[0] - n[1]) * 2 * s : s, l && a ? a.map((c, d) => {
      var f = r.map(c);
      return Q(f) ? {
        coordinate: f + s,
        value: c,
        index: d,
        offset: s
      } : null;
    }).filter(rt) : r.ticks ? r.ticks(u).map((c, d) => {
      var f = r.map(c);
      return Q(f) ? {
        coordinate: f + s,
        value: c,
        index: d,
        offset: s
      } : null;
    }).filter(rt) : r.domain().map((c, d) => {
      var f = r.map(c);
      return Q(f) ? {
        coordinate: f + s,
        // @ts-expect-error can't use unknown as index
        value: i ? i[c] : c,
        index: d,
        offset: s
      } : null;
    }).filter(rt);
  }
}, Xt = S([te, Rn, Ut, ro, no, Of, je], kw), St = S(Re, Ut, (e, t) => {
  if (!(e == null || t == null))
    return El(El({}, e), {}, {
      scale: t
    });
}), B$ = S([Re, wr, to, mw], Ku), z$ = S([B$], $u), K$ = S((e, t, r) => of(e, r), z$, (e, t) => {
  if (!(e == null || t == null))
    return El(El({}, e), {}, {
      scale: t
    });
}), W$ = S([te, Pu, Ou], (e, t, r) => {
  switch (e) {
    case "horizontal":
      return t.some((n) => n.reversed) ? "right-to-left" : "left-to-right";
    case "vertical":
      return r.some((n) => n.reversed) ? "bottom-to-top" : "top-to-bottom";
    // TODO: make this better. For now, right arrow triggers "forward", left arrow "back"
    // however, the tooltip moves an unintuitive direction because of how the indices are rendered
    case "centric":
    case "radial":
      return "left-to-right";
    default:
      return;
  }
}), Sf = (e, t, r) => {
  var n;
  return (n = e.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
}, jw = S([Sf], (e) => {
  if (!(!e || e.length === 0))
    return (t) => {
      var r, n = 1 / 0, i = e[0];
      for (var a of e) {
        var o = Math.abs(a.coordinate - t);
        o < n && (n = o, i = a);
      }
      return (r = i) === null || r === void 0 ? void 0 : r.value;
    };
}), Tw = (e) => e.options.defaultTooltipEventType, Ew = (e) => e.options.validateTooltipEventTypes;
function Cw(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function io(e, t) {
  var r = Tw(e), n = Ew(e);
  return Cw(t, r, n);
}
function F$(e) {
  return C((t) => io(t, e));
}
var Dw = (e, t) => {
  var r, n = Number(t);
  if (!(Et(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, U$ = (e) => e.tooltip.settings, Vr = {
  active: !1,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
}, X$ = {
  itemInteraction: {
    click: Vr,
    hover: Vr
  },
  axisInteraction: {
    click: Vr,
    hover: Vr
  },
  keyboardInteraction: Vr,
  syncInteraction: {
    active: !1,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0,
    sourceViewBox: void 0,
    graphicalItemId: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: !1,
    defaultIndex: void 0
  }
}, Mw = ht({
  name: "tooltip",
  initialState: X$,
  reducers: {
    addTooltipEntrySettings: {
      reducer(e, t) {
        e.tooltipItemPayloads.push(ye(t.payload));
      },
      prepare: Ee()
    },
    replaceTooltipEntrySettings: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = zt(e).tooltipItemPayloads.indexOf(ye(n));
        a > -1 && (e.tooltipItemPayloads[a] = ye(i));
      },
      prepare: Ee()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = zt(e).tooltipItemPayloads.indexOf(ye(t.payload));
        r > -1 && e.tooltipItemPayloads.splice(r, 1);
      },
      prepare: Ee()
    },
    setTooltipSettingsState(e, t) {
      e.settings = t.payload;
    },
    setActiveMouseOverItemIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    mouseLeaveChart(e) {
      e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
    },
    mouseLeaveItem(e) {
      e.itemInteraction.hover.active = !1;
    },
    setActiveClickItemIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setSyncInteraction(e, t) {
      e.syncInteraction = t.payload;
    },
    setKeyboardInteraction(e, t) {
      e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate;
    }
  }
}), Vt = Mw.actions, H$ = Vt.addTooltipEntrySettings, Y$ = Vt.replaceTooltipEntrySettings, V$ = Vt.removeTooltipEntrySettings, G$ = Vt.setTooltipSettingsState, zn = Vt.setActiveMouseOverItemIndex, Xu = Vt.mouseLeaveItem, $w = Vt.mouseLeaveChart, ao = Vt.setActiveClickItemIndex, _w = Vt.setMouseOverAxisIndex, q$ = Vt.setMouseClickAxisIndex, ca = Vt.setSyncInteraction, Ml = Vt.setKeyboardInteraction, Z$ = Mw.reducer;
function ry(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ry(Object(r), !0).forEach(function(n) {
      J$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ry(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function J$(e, t, r) {
  return (t = Q$(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Q$(e) {
  var t = e_(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function e_(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function t_(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function r_(e) {
  return e.index != null;
}
var Nw = (e, t, r, n) => {
  if (t == null)
    return Vr;
  var i = t_(e, t, r);
  if (i == null)
    return Vr;
  if (i.active)
    return i;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (r_(i)) {
    if (a)
      return jo(jo({}, i), {}, {
        active: !0
      });
  } else if (n != null)
    return {
      active: !0,
      coordinate: void 0,
      dataKey: void 0,
      index: n,
      graphicalItemId: void 0
    };
  return jo(jo({}, Vr), {}, {
    coordinate: i.coordinate
  });
};
function n_(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e);
  return Number.isFinite(r) ? r : void 0;
}
function i_(e, t) {
  var r = n_(e), n = t[0], i = t[1];
  if (r === void 0)
    return !1;
  var a = Math.min(n, i), o = Math.max(n, i);
  return r >= a && r <= o;
}
function a_(e, t, r) {
  if (r == null || t == null)
    return !0;
  var n = G(e, t);
  return n == null || !vr(r) ? !0 : i_(n, r);
}
var ha = (e, t, r, n) => {
  var i = e?.index;
  if (i == null)
    return null;
  var a = Number(i);
  if (!Q(a))
    return i;
  var o = 0, l = 1 / 0;
  t.length > 0 && (l = t.length - 1);
  var u = Math.max(o, Math.min(a, l)), s = t[u];
  return s == null || a_(s, r, n) ? String(u) : null;
}, Lw = (e, t, r, n, i, a, o) => {
  if (a != null) {
    var l = o[0], u = l?.getPosition(a);
    if (u != null)
      return u;
    var s = i?.[Number(a)];
    if (s)
      switch (r) {
        case "horizontal":
          return {
            x: s.coordinate,
            y: (n.top + t) / 2
          };
        default:
          return {
            x: (n.left + e) / 2,
            y: s.coordinate
          };
      }
  }
}, Rw = (e, t, r, n) => {
  if (t === "axis")
    return e.tooltipItemPayloads;
  if (e.tooltipItemPayloads.length === 0)
    return [];
  var i;
  if (r === "hover" ? i = e.itemInteraction.hover.graphicalItemId : i = e.itemInteraction.click.graphicalItemId, e.syncInteraction.active && i == null)
    return e.tooltipItemPayloads;
  if (i == null && (n != null || e.keyboardInteraction.active)) {
    var a = e.tooltipItemPayloads[0];
    return a != null ? [a] : [];
  }
  return e.tooltipItemPayloads.filter((o) => {
    var l;
    return ((l = o.settings) === null || l === void 0 ? void 0 : l.graphicalItemId) === i;
  });
}, Bw = (e) => e.options.tooltipPayloadSearcher, Bi = (e) => e.tooltip;
function ny(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function iy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ny(Object(r), !0).forEach(function(n) {
      o_(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ny(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function o_(e, t, r) {
  return (t = l_(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function l_(e) {
  var t = u_(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function u_(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function s_(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
}
function c_(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function d_(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  if (typeof e == "function")
    return (t) => e(t);
}
function ay(e) {
  if (typeof e == "string")
    return e;
}
function f_(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? s_(e.name) : void 0, r = "unit" in e ? c_(e.unit) : void 0, n = "dataKey" in e ? d_(e.dataKey) : void 0, i = "payload" in e ? e.payload : void 0, a = "color" in e ? ay(e.color) : void 0, o = "fill" in e ? ay(e.fill) : void 0;
    return {
      name: t,
      unit: r,
      dataKey: n,
      payload: i,
      color: a,
      fill: o
    };
  }
}
function v_(e, t) {
  return e ?? t;
}
var zw = (e, t, r, n, i, a, o) => {
  if (!(t == null || a == null)) {
    var l = r.chartData, u = r.computedData, s = r.dataStartIndex, c = r.dataEndIndex, d = [];
    return e.reduce((f, v) => {
      var h, p = v.dataDefinedOnItem, m = v.settings, g = v_(p, l), w = Array.isArray(g) ? P0(g, s, c) : g, x = (h = m?.dataKey) !== null && h !== void 0 ? h : n, A = m?.nameKey, P;
      if (n && Array.isArray(w) && /*
       * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
       * as tooltip payloads and findEntryInArray is not prepared to handle that.
       * Sad but also ScatterChart only allows 'item' tooltipEventType
       * and also this is only a problem if there are multiple Scatters and each has its own data array
       * so let's fix that some other time.
       */
      !Array.isArray(w[0]) && /*
       * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
       * because thanks to allowDuplicatedCategory=false, the order of elements in the array
       * no longer matches the order of elements in the original data
       * and so we need to search by the active dataKey + label rather than by index.
       *
       * The same happens if multiple graphical items are present in the chart
       * and each of them has its own data array. Those arrays get concatenated
       * and again the tooltip index no longer matches the original data.
       *
       * On the other hand the tooltipEventType 'item' should always search by index
       * because we get the index from interacting over the individual elements
       * which is always accurate, irrespective of the allowDuplicatedCategory setting.
       */
      o === "axis" ? (P = Yg(w, n, i), P == null && (P = a(w, t, u, A))) : P = a(w, t, u, A), Array.isArray(P))
        P.forEach((O) => {
          var I, E, j = f_(O), T = j?.name, k = j?.dataKey, _ = j?.payload, $ = iy(iy({}, m), {}, {
            name: T,
            unit: j?.unit,
            // Preserve item-level color/fill from graphical items.
            color: (I = j?.color) !== null && I !== void 0 ? I : m?.color,
            fill: (E = j?.fill) !== null && E !== void 0 ? E : m?.fill
          });
          f.push(th({
            tooltipEntrySettings: $,
            dataKey: k,
            payload: _,
            value: G(_, k),
            name: T == null ? void 0 : String(T)
          }));
        });
      else {
        var b;
        f.push(th({
          tooltipEntrySettings: m,
          dataKey: x,
          payload: P,
          // getValueByDataKey does not validate the output type
          value: G(P, x),
          // getValueByDataKey does not validate the output type
          name: (b = G(P, A)) !== null && b !== void 0 ? b : m?.name
        }));
      }
      return f;
    }, d);
  }
}, If = S([Ye, ew, Dd], Gx), h_ = S([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), p_ = S([nt, _i], lf), Kn = S([h_, Ye, p_], uf, {
  memoizeOptions: {
    resultEqualityCheck: Mu
  }
}), y_ = S([Kn], (e) => e.filter(Va)), Kw = S([Kn], sf, {
  memoizeOptions: {
    resultEqualityCheck: Mu
  }
}), m_ = S([Kn], (e) => e.some((t) => !t.data)), kn = S([Kw, Ht], cf), g_ = S([y_, Ht, Ye], $d), kf = S([kn, Ye, Kn, Ht, m_, Kw], aw), Ww = S([Ye], vf), b_ = S([Ye], (e) => e.allowDataOverflow), Fw = S([Ww, b_], q0), x_ = S([Kn], (e) => e.filter(Va)), w_ = S([g_, x_, Di, Cd], ff), A_ = S([w_, Ht, nt, Fw], lw), P_ = S([Kn], rw), O_ = S([kn, Ye, P_, Wu, nt, BE], yf, {
  memoizeOptions: {
    resultEqualityCheck: Ga
  }
}), S_ = S([uw, nt, _i], Ri), I_ = S([S_, nt], dw), k_ = S([sw, nt, _i], Ri), j_ = S([k_, nt], fw), T_ = S([cw, nt, _i], Ri), E_ = S([T_, nt], vw), C_ = S([I_, E_, j_], Dl), D_ = S([Ye, Ww, Fw, A_, O_, C_, te, nt], mf), pi = S([Ye, te, kn, kf, Di, nt, D_], gf), M_ = S([pi, Ye, If], bf), $_ = S([Ye, pi, M_, nt], wf), Uw = (e) => {
  var t = nt(e), r = _i(e), n = !1;
  return ro(e, t, r, n);
}, Xw = S([Ye, Uw], Eu), __ = S([Ye, If, $_, Xw], Ku), Hw = S([__], $u), N_ = S([te, kf, Ye, nt], Ow), L_ = S([te, kf, Ye, nt], Pf), R_ = (e, t, r, n, i, a, o, l) => {
  if (t) {
    var u = t.type, s = Dt(e, l);
    if (n) {
      var c = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, d = u === "category" && n.bandwidth ? n.bandwidth() / c : 0;
      return d = l === "angleAxis" && i != null && i?.length >= 2 ? Ue(i[0] - i[1]) * 2 * d : d, s && o ? o.map((f, v) => {
        var h = n.map(f);
        return Q(h) ? {
          coordinate: h + d,
          value: f,
          index: v,
          offset: d
        } : null;
      }).filter(rt) : n.domain().map((f, v) => {
        var h = n.map(f);
        return Q(h) ? {
          coordinate: h + d,
          // @ts-expect-error can't use Date as an index
          value: a ? a[f] : f,
          index: v,
          offset: d
        } : null;
      }).filter(rt);
    }
  }
}, Wr = S([te, Ye, If, Hw, Uw, N_, L_, nt], R_), jf = S([Tw, Ew, U$], (e, t, r) => Cw(r.shared, e, t)), Yw = (e) => e.tooltip.settings.trigger, Tf = (e) => e.tooltip.settings.defaultIndex, oo = S([Bi, jf, Yw, Tf], Nw), yr = S([oo, kn, hi, pi], ha), Ef = S([Wr, yr], Dw), Cf = S([oo], (e) => {
  if (e)
    return e.dataKey;
}), Vw = S([oo], (e) => {
  if (e)
    return e.graphicalItemId;
}), Gw = S([Bi, jf, Yw, Tf], Rw), B_ = S([mr, gr, te, He, Wr, Tf, Gw], Lw), qw = S([oo, B_], (e, t) => e != null && e.coordinate ? e.coordinate : t), Zw = S([oo], (e) => {
  var t;
  return (t = e?.active) !== null && t !== void 0 ? t : !1;
}), z_ = S([Gw, yr, Ht, hi, Ef, Bw, jf], zw), K_ = S([z_], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function oy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ly(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? oy(Object(r), !0).forEach(function(n) {
      W_(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : oy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function W_(e, t, r) {
  return (t = F_(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function F_(e) {
  var t = U_(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function U_(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var X_ = () => C(Ye), H_ = () => {
  var e = X_(), t = C(Wr), r = C(Hw);
  return Ot(!e || !r ? void 0 : ly(ly({}, e), {}, {
    scale: r
  }), t);
};
function uy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uy(Object(r), !0).forEach(function(n) {
      Y_(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Y_(e, t, r) {
  return (t = V_(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function V_(e) {
  var t = G_(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function G_(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var q_ = (e, t, r, n) => {
  var i = t.find((a) => a && a.index === r);
  if (i) {
    if (e === "horizontal")
      return {
        x: i.coordinate,
        y: n.relativeY
      };
    if (e === "vertical")
      return {
        x: n.relativeX,
        y: i.coordinate
      };
  }
  return {
    x: 0,
    y: 0
  };
}, Z_ = (e, t, r, n) => {
  var i = t.find((s) => s && s.index === r);
  if (i) {
    if (e === "centric") {
      var a = i.coordinate, o = n.radius;
      return Yn(Yn(Yn({}, n), pe(n.cx, n.cy, o, a)), {}, {
        angle: a,
        radius: o
      });
    }
    var l = i.coordinate, u = n.angle;
    return Yn(Yn(Yn({}, n), pe(n.cx, n.cy, l, u)), {}, {
      angle: u,
      radius: l
    });
  }
  return {
    angle: 0,
    clockWise: !1,
    cx: 0,
    cy: 0,
    endAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
    radius: 0,
    startAngle: 0,
    x: 0,
    y: 0
  };
};
function J_(e, t) {
  var r = e.relativeX, n = e.relativeY;
  return r >= t.left && r <= t.left + t.width && n >= t.top && n <= t.top + t.height;
}
var Jw = (e, t, r, n, i) => {
  var a, o = (a = t?.length) !== null && a !== void 0 ? a : 0;
  if (o <= 1 || e == null)
    return 0;
  if (n === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6)
    for (var l = i[1] - i[0], u = (M, R, K) => [e, e + l, e - l].some((N) => (K ? N >= M : N > M) && N <= R), s = 0; s < o; s++) {
      var c, d, f, v, h, p = s > 0 ? (c = r[s - 1]) === null || c === void 0 ? void 0 : c.coordinate : (d = r[o - 1]) === null || d === void 0 ? void 0 : d.coordinate, m = (f = r[s]) === null || f === void 0 ? void 0 : f.coordinate, g = s >= o - 1 ? (v = r[0]) === null || v === void 0 ? void 0 : v.coordinate : (h = r[s + 1]) === null || h === void 0 ? void 0 : h.coordinate, w = void 0;
      if (!(p == null || m == null || g == null))
        if (Ue(m - p) !== Ue(g - m)) {
          var x = [];
          if (Ue(g - m) === Ue(i[1] - i[0])) {
            w = g;
            var A = m + i[1] - i[0];
            x[0] = Math.min(A, (A + p) / 2), x[1] = Math.max(A, (A + p) / 2);
          } else {
            w = p;
            var P = g + i[1] - i[0];
            x[0] = Math.min(m, (P + m) / 2), x[1] = Math.max(m, (P + m) / 2);
          }
          var b = [Math.min(m, (w + m) / 2), Math.max(m, (w + m) / 2)];
          if (u(b[0], b[1], !1) || u(x[0], x[1], !0)) {
            var O;
            return (O = r[s]) === null || O === void 0 ? void 0 : O.index;
          }
        } else {
          var I = Math.min(p, g), E = Math.max(p, g);
          if (u((I + m) / 2, (E + m) / 2, !1)) {
            var j;
            return (j = r[s]) === null || j === void 0 ? void 0 : j.index;
          }
        }
    }
  else if (t)
    for (var T = 0; T < o; T++) {
      var k = t[T];
      if (k != null) {
        var _ = t[T + 1], $ = t[T - 1];
        if (T === 0 && _ != null && e <= (k.coordinate + _.coordinate) / 2 || T === o - 1 && $ != null && e > (k.coordinate + $.coordinate) / 2 || T > 0 && T < o - 1 && $ != null && _ != null && e > (k.coordinate + $.coordinate) / 2 && e <= (k.coordinate + _.coordinate) / 2)
          return k.index;
      }
    }
  return -1;
}, Qw = () => C(Dd), Df = (e, t) => t, eA = (e, t, r) => r, Mf = (e, t, r, n) => n, Q_ = S(Wr, (e) => fu(e, (t) => t.coordinate)), $f = S([Bi, Df, eA, Mf], Nw), Hu = S([$f, kn, hi, pi], ha), eN = (e, t, r) => {
  if (t != null) {
    var n = Bi(e);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, tA = S([Bi, Df, eA, Mf], Rw), $l = S([mr, gr, te, He, Wr, Mf, tA], Lw), tN = S([$f, $l], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
}), rA = S([Wr, Hu], Dw), rN = S([tA, Hu, Ht, hi, rA, Bw, Df], zw), nN = S([$f, Hu], (e, t) => ({
  isActive: e.active && t != null,
  activeIndex: t
})), iN = (e, t, r, n, i, a, o) => {
  if (!(!e || !r || !n || !i) && J_(e, o)) {
    var l = wk(e, t), u = Jw(l, a, i, r, n), s = q_(t, i, u, e);
    return {
      activeIndex: String(u),
      activeCoordinate: s
    };
  }
}, aN = (e, t, r, n, i, a, o) => {
  if (!(!e || !n || !i || !a || !r)) {
    var l = CE(e, r);
    if (l) {
      var u = Ak(l, t), s = Jw(u, o, a, n, i), c = Z_(t, a, s, l);
      return {
        activeIndex: String(s),
        activeCoordinate: c
      };
    }
  }
}, oN = (e, t, r, n, i, a, o, l) => {
  if (!(!e || !t || !n || !i || !a))
    return t === "horizontal" || t === "vertical" ? iN(e, t, n, i, a, o, l) : aN(e, t, r, n, i, a, o);
}, lN = S((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, r) => r, (e, t, r) => {
  if (t != null) {
    var n = e[t];
    if (n != null)
      return r ? n.panoramaElement : n.element;
  }
}), uN = S((e) => e.zIndex.zIndexMap, (e) => {
  var t = Object.keys(e).map((n) => parseInt(n, 10)).concat(Object.values(fe)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, {
  memoizeOptions: {
    resultEqualityCheck: uC
  }
});
function sy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function cy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sy(Object(r), !0).forEach(function(n) {
      sN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function sN(e, t, r) {
  return (t = cN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cN(e) {
  var t = dN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var fN = {}, vN = {
  zIndexMap: Object.values(fe).reduce((e, t) => cy(cy({}, e), {}, {
    [t]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), fN)
}, hN = new Set(Object.values(fe));
function pN(e) {
  return hN.has(e);
}
var nA = ht({
  name: "zIndex",
  initialState: vN,
  reducers: {
    registerZIndexPortal: {
      reducer: (e, t) => {
        var r = t.payload.zIndex;
        e.zIndexMap[r] ? e.zIndexMap[r].consumers += 1 : e.zIndexMap[r] = {
          consumers: 1,
          element: void 0,
          panoramaElement: void 0
        };
      },
      prepare: Ee()
    },
    unregisterZIndexPortal: {
      reducer: (e, t) => {
        var r = t.payload.zIndex;
        e.zIndexMap[r] && (e.zIndexMap[r].consumers -= 1, e.zIndexMap[r].consumers <= 0 && !pN(r) && delete e.zIndexMap[r]);
      },
      prepare: Ee()
    },
    registerZIndexPortalElement: {
      reducer: (e, t) => {
        var r = t.payload, n = r.zIndex, i = r.element, a = r.isPanorama;
        e.zIndexMap[n] ? a ? e.zIndexMap[n].panoramaElement = ye(i) : e.zIndexMap[n].element = ye(i) : e.zIndexMap[n] = {
          consumers: 0,
          element: a ? void 0 : ye(i),
          panoramaElement: a ? ye(i) : void 0
        };
      },
      prepare: Ee()
    },
    unregisterZIndexPortalElement: {
      reducer: (e, t) => {
        var r = t.payload.zIndex;
        e.zIndexMap[r] && (t.payload.isPanorama ? e.zIndexMap[r].panoramaElement = void 0 : e.zIndexMap[r].element = void 0);
      },
      prepare: Ee()
    }
  }
}), Yu = nA.actions, yN = Yu.registerZIndexPortal, Ms = Yu.unregisterZIndexPortal, mN = Yu.registerZIndexPortalElement, gN = Yu.unregisterZIndexPortalElement, bN = nA.reducer;
function we(e) {
  var t = e.zIndex, r = e.children, n = ij(), i = n && t !== void 0 && t !== 0, a = se(), o = H(void 0), l = H(/* @__PURE__ */ new Set()), u = ee(), s = C((d) => lN(d, t, a));
  if (ke(() => {
    if (!i) {
      var d = l.current;
      d.forEach((v) => {
        u(Ms({
          zIndex: v
        }));
      }), d.clear(), o.current = void 0;
      return;
    }
    if (l.current.has(t) || (u(yN({
      zIndex: t
    })), l.current.add(t)), s) {
      o.current = s;
      var f = l.current;
      f.forEach((v) => {
        v !== t && (u(Ms({
          zIndex: v
        })), f.delete(v));
      });
    }
  }, [u, t, i, s]), ke(() => {
    var d = l.current;
    return () => {
      d.forEach((f) => {
        u(Ms({
          zIndex: f
        }));
      }), d.clear();
    };
  }, [u]), !i)
    return r;
  var c = s ?? o.current;
  return c ? /* @__PURE__ */ Gc(r, c) : null;
}
function Sc() {
  return Sc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Sc.apply(null, arguments);
}
function dy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function To(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dy(Object(r), !0).forEach(function(n) {
      xN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xN(e, t, r) {
  return (t = wN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wN(e) {
  var t = AN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function PN(e) {
  var t = e.cursor, r = e.cursorComp, n = e.cursorProps;
  return /* @__PURE__ */ ie(t) ? /* @__PURE__ */ Ae(t, n) : /* @__PURE__ */ y(r, n);
}
function ON(e) {
  var t, r = e.coordinate, n = e.payload, i = e.index, a = e.offset, o = e.tooltipAxisBandSize, l = e.layout, u = e.cursor, s = e.tooltipEventType, c = e.chartName, d = r, f = n, v = i;
  if (!u || !d || c !== "ScatterChart" && s !== "axis")
    return null;
  var h, p, m;
  if (c === "ScatterChart")
    h = d, p = UT, m = fe.cursorLine;
  else if (c === "BarChart")
    h = XT(l, d, a, o), p = ji, m = fe.cursorRectangle;
  else if (l === "radial" && vb(d)) {
    var g = Y0(d), w = g.cx, x = g.cy, A = g.radius, P = g.startAngle, b = g.endAngle;
    h = {
      cx: w,
      cy: x,
      startAngle: P,
      endAngle: b,
      innerRadius: A,
      outerRadius: A
    }, p = Iu, m = fe.cursorLine;
  } else
    h = {
      points: _E(l, d, a)
    }, p = xn, m = fe.cursorLine;
  var O = typeof u == "object" && "className" in u ? u.className : void 0, I = To(To(To(To({
    stroke: "#ccc",
    pointerEvents: "none"
  }, a), h), Tt(u)), {}, {
    payload: f,
    payloadIndex: v,
    className: J("recharts-tooltip-cursor", O)
  });
  return /* @__PURE__ */ y(we, {
    zIndex: (t = e.zIndex) !== null && t !== void 0 ? t : m
  }, /* @__PURE__ */ y(PN, {
    cursor: u,
    cursorComp: p,
    cursorProps: I
  }));
}
function SN(e) {
  var t = H_(), r = $0(), n = Rr(), i = Qw();
  return t == null || r == null || n == null || i == null ? null : /* @__PURE__ */ y(ON, Sc({}, e, {
    offset: r,
    layout: n,
    tooltipAxisBandSize: t,
    chartName: i
  }));
}
var lo = /* @__PURE__ */ We(null), IN = () => Ze(lo), $s = { exports: {} }, fy;
function kN() {
  return fy || (fy = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function i(u, s, c) {
      this.fn = u, this.context = s, this.once = c || !1;
    }
    function a(u, s, c, d, f) {
      if (typeof c != "function")
        throw new TypeError("The listener must be a function");
      var v = new i(c, d || u, f), h = r ? r + s : s;
      return u._events[h] ? u._events[h].fn ? u._events[h] = [u._events[h], v] : u._events[h].push(v) : (u._events[h] = v, u._eventsCount++), u;
    }
    function o(u, s) {
      --u._eventsCount === 0 ? u._events = new n() : delete u._events[s];
    }
    function l() {
      this._events = new n(), this._eventsCount = 0;
    }
    l.prototype.eventNames = function() {
      var s = [], c, d;
      if (this._eventsCount === 0) return s;
      for (d in c = this._events)
        t.call(c, d) && s.push(r ? d.slice(1) : d);
      return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(c)) : s;
    }, l.prototype.listeners = function(s) {
      var c = r ? r + s : s, d = this._events[c];
      if (!d) return [];
      if (d.fn) return [d.fn];
      for (var f = 0, v = d.length, h = new Array(v); f < v; f++)
        h[f] = d[f].fn;
      return h;
    }, l.prototype.listenerCount = function(s) {
      var c = r ? r + s : s, d = this._events[c];
      return d ? d.fn ? 1 : d.length : 0;
    }, l.prototype.emit = function(s, c, d, f, v, h) {
      var p = r ? r + s : s;
      if (!this._events[p]) return !1;
      var m = this._events[p], g = arguments.length, w, x;
      if (m.fn) {
        switch (m.once && this.removeListener(s, m.fn, void 0, !0), g) {
          case 1:
            return m.fn.call(m.context), !0;
          case 2:
            return m.fn.call(m.context, c), !0;
          case 3:
            return m.fn.call(m.context, c, d), !0;
          case 4:
            return m.fn.call(m.context, c, d, f), !0;
          case 5:
            return m.fn.call(m.context, c, d, f, v), !0;
          case 6:
            return m.fn.call(m.context, c, d, f, v, h), !0;
        }
        for (x = 1, w = new Array(g - 1); x < g; x++)
          w[x - 1] = arguments[x];
        m.fn.apply(m.context, w);
      } else {
        var A = m.length, P;
        for (x = 0; x < A; x++)
          switch (m[x].once && this.removeListener(s, m[x].fn, void 0, !0), g) {
            case 1:
              m[x].fn.call(m[x].context);
              break;
            case 2:
              m[x].fn.call(m[x].context, c);
              break;
            case 3:
              m[x].fn.call(m[x].context, c, d);
              break;
            case 4:
              m[x].fn.call(m[x].context, c, d, f);
              break;
            default:
              if (!w) for (P = 1, w = new Array(g - 1); P < g; P++)
                w[P - 1] = arguments[P];
              m[x].fn.apply(m[x].context, w);
          }
      }
      return !0;
    }, l.prototype.on = function(s, c, d) {
      return a(this, s, c, d, !1);
    }, l.prototype.once = function(s, c, d) {
      return a(this, s, c, d, !0);
    }, l.prototype.removeListener = function(s, c, d, f) {
      var v = r ? r + s : s;
      if (!this._events[v]) return this;
      if (!c)
        return o(this, v), this;
      var h = this._events[v];
      if (h.fn)
        h.fn === c && (!f || h.once) && (!d || h.context === d) && o(this, v);
      else {
        for (var p = 0, m = [], g = h.length; p < g; p++)
          (h[p].fn !== c || f && !h[p].once || d && h[p].context !== d) && m.push(h[p]);
        m.length ? this._events[v] = m.length === 1 ? m[0] : m : o(this, v);
      }
      return this;
    }, l.prototype.removeAllListeners = function(s) {
      var c;
      return s ? (c = r ? r + s : s, this._events[c] && o(this, c)) : (this._events = new n(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = r, l.EventEmitter = l, e.exports = l;
  })($s)), $s.exports;
}
var jN = kN();
const TN = /* @__PURE__ */ jI(jN);
var yi = new TN(), Ic = "recharts.syncEvent.tooltip", kc = "recharts.syncEvent.brush", Fr = (e, t) => {
  if (t && Array.isArray(e)) {
    var r = Number.parseInt(t, 10);
    if (!Et(r))
      return e[r];
  }
}, EN = {
  chartName: "",
  tooltipPayloadSearcher: () => {
  },
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
}, iA = ht({
  name: "options",
  initialState: EN,
  reducers: {
    createEventEmitter: (e) => {
      e.eventEmitter == null && (e.eventEmitter = Symbol("rechartsEventEmitter"));
    }
  }
}), CN = iA.reducer, DN = iA.actions.createEventEmitter;
function MN(e) {
  return e.tooltip.syncInteraction;
}
var $N = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
}, aA = ht({
  name: "chartData",
  initialState: $N,
  reducers: {
    setChartData(e, t) {
      if (e.chartData = ye(t.payload), t.payload == null) {
        e.dataStartIndex = 0, e.dataEndIndex = 0;
        return;
      }
      t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
    },
    setComputedData(e, t) {
      e.computedData = t.payload;
    },
    setDataStartEndIndexes(e, t) {
      var r = t.payload, n = r.startIndex, i = r.endIndex;
      n != null && (e.dataStartIndex = n), i != null && (e.dataEndIndex = i);
    }
  }
}), _f = aA.actions, jc = _f.setChartData, Tc = _f.setDataStartEndIndexes, _N = _f.setComputedData, NN = aA.reducer, LN = ["x", "y"];
function vy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vy(Object(r), !0).forEach(function(n) {
      RN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function RN(e, t, r) {
  return (t = BN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function BN(e) {
  var t = zN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function zN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KN(e, t) {
  if (e == null) return {};
  var r, n, i = WN(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function WN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function FN() {
  var e = C(ju), t = C(Tu), r = ee(), n = C(sx), i = C(Wr), a = Rr(), o = Si(), l = C((u) => u.rootProps.className);
  ae(() => {
    if (e == null)
      return mt;
    var u = (s, c, d) => {
      if (t !== d && e === s) {
        if (c.payload.active === !1) {
          r(ca({
            active: !1,
            coordinate: void 0,
            dataKey: void 0,
            index: null,
            label: void 0,
            sourceViewBox: void 0,
            graphicalItemId: void 0
          }));
          return;
        }
        if (n === "index") {
          var f;
          if (o && c !== null && c !== void 0 && (f = c.payload) !== null && f !== void 0 && f.coordinate && c.payload.sourceViewBox) {
            var v = c.payload.coordinate, h = v.x, p = v.y, m = KN(v, LN), g = c.payload.sourceViewBox, w = g.x, x = g.y, A = g.width, P = g.height, b = Vn(Vn({}, m), {}, {
              x: o.x + (A ? (h - w) / A : 0) * o.width,
              y: o.y + (P ? (p - x) / P : 0) * o.height
            });
            r(Vn(Vn({}, c), {}, {
              payload: Vn(Vn({}, c.payload), {}, {
                coordinate: b
              })
            }));
          } else
            r(c);
          return;
        }
        if (i != null) {
          var O;
          if (typeof n == "function") {
            var I = {
              activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              isTooltipActive: c.payload.active,
              activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              activeLabel: c.payload.label,
              activeDataKey: c.payload.dataKey,
              activeCoordinate: c.payload.coordinate
            }, E = n(i, I);
            O = i[E];
          } else n === "value" && (O = i.find((K) => String(K.value) === c.payload.label));
          var j = c.payload.coordinate;
          if (j == null || o == null) {
            r(ca({
              active: !1,
              coordinate: void 0,
              dataKey: void 0,
              index: null,
              label: void 0,
              sourceViewBox: void 0,
              graphicalItemId: void 0
            }));
            return;
          }
          if (O == null) {
            r(ca({
              active: !1,
              coordinate: void 0,
              dataKey: void 0,
              index: null,
              label: void 0,
              sourceViewBox: c.payload.sourceViewBox,
              graphicalItemId: void 0
            }));
            return;
          }
          var T = j.x, k = j.y, _ = Math.min(T, o.x + o.width), $ = Math.min(k, o.y + o.height), M = {
            x: a === "horizontal" ? O.coordinate : _,
            y: a === "horizontal" ? $ : O.coordinate
          }, R = ca({
            active: c.payload.active,
            coordinate: M,
            dataKey: c.payload.dataKey,
            index: String(O.index),
            label: c.payload.label,
            sourceViewBox: c.payload.sourceViewBox,
            graphicalItemId: c.payload.graphicalItemId
          });
          r(R);
        }
      }
    };
    return yi.on(Ic, u), () => {
      yi.off(Ic, u);
    };
  }, [l, r, t, e, n, i, a, o]);
}
function UN() {
  var e = C(ju), t = C(Tu), r = ee();
  ae(() => {
    if (e == null)
      return mt;
    var n = (i, a, o) => {
      t !== o && e === i && r(Tc(a));
    };
    return yi.on(kc, n), () => {
      yi.off(kc, n);
    };
  }, [r, t, e]);
}
function XN() {
  var e = ee();
  ae(() => {
    e(DN());
  }, [e]), FN(), UN();
}
function HN(e, t, r, n, i, a) {
  var o = C((h) => eN(h, e, t)), l = C(Vw), u = C(Tu), s = C(ju), c = C(sx), d = C(MN), f = d?.sourceViewBox != null, v = Si();
  ae(() => {
    if (!f && s != null && u != null) {
      var h = ca({
        active: a,
        coordinate: r,
        dataKey: o,
        index: i,
        label: typeof n == "number" ? String(n) : n,
        sourceViewBox: v,
        graphicalItemId: l
      });
      yi.emit(Ic, s, h, u);
    }
  }, [f, r, o, l, i, n, u, s, c, a, v]);
}
function YN() {
  var e = C(ju), t = C(Tu), r = C((i) => i.chartData.dataStartIndex), n = C((i) => i.chartData.dataEndIndex);
  ae(() => {
    if (!(e == null || r == null || n == null || t == null)) {
      var i = {
        startIndex: r,
        endIndex: n
      };
      yi.emit(kc, e, i, t);
    }
  }, [n, r, t, e]);
}
function hy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function py(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hy(Object(r), !0).forEach(function(n) {
      VN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function VN(e, t, r) {
  return (t = GN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function GN(e) {
  var t = qN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function qN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ZN(e, t) {
  return tL(e) || eL(e, t) || QN(e, t) || JN();
}
function JN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QN(e, t) {
  if (e) {
    if (typeof e == "string") return yy(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? yy(e, t) : void 0;
  }
}
function yy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function eL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function tL(e) {
  if (Array.isArray(e)) return e;
}
function rL(e) {
  return e.dataKey;
}
function nL(e, t) {
  return /* @__PURE__ */ ie(e) ? /* @__PURE__ */ Ae(e, t) : /* @__PURE__ */ y(typeof e == "function" ? e : sT, t);
}
var my = [], iL = {
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: !0,
  filterNull: !0,
  includeHidden: !1,
  isAnimationActive: "auto",
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  wrapperStyle: {}
};
function I6(e) {
  var t, r, n = re(e, iL), i = n.active, a = n.allowEscapeViewBox, o = n.animationDuration, l = n.animationEasing, u = n.content, s = n.filterNull, c = n.isAnimationActive, d = n.offset, f = n.payloadUniqBy, v = n.position, h = n.reverseDirection, p = n.useTranslate3d, m = n.wrapperStyle, g = n.cursor, w = n.shared, x = n.trigger, A = n.defaultIndex, P = n.portal, b = n.axisId, O = ee(), I = typeof A == "number" ? String(A) : A;
  ae(() => {
    O(G$({
      shared: w,
      trigger: x,
      axisId: b,
      active: i,
      defaultIndex: I
    }));
  }, [O, w, x, b, i, I]);
  var E = Si(), j = B0(), T = F$(w), k = (t = C((q) => nN(q, T, x, I))) !== null && t !== void 0 ? t : {}, _ = k.activeIndex, $ = k.isActive, M = C((q) => rN(q, T, x, I)), R = C((q) => rA(q, T, x, I)), K = C((q) => tN(q, T, x, I)), N = M, z = IN(), W = (r = i ?? $) !== null && r !== void 0 ? r : !1, Z = Hb([N, W]), ne = ZN(Z, 2), ce = ne[0], ve = ne[1], Te = T === "axis" ? R : void 0;
  HN(T, x, K, Te, _, W);
  var Ke = P ?? z;
  if (Ke == null || E == null || T == null)
    return null;
  var Fe = N ?? my;
  W || (Fe = my), s && Fe.length && (Fe = Wb(Fe.filter((q) => q.value != null && (q.hide !== !0 || n.includeHidden)), f, rL));
  var $t = Fe.length > 0, B = py(py({}, n), {}, {
    payload: Fe,
    label: Te,
    active: W,
    activeIndex: _,
    coordinate: K,
    accessibilityLayer: j
  }), U = /* @__PURE__ */ y(ET, {
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: l,
    isAnimationActive: c,
    active: W,
    coordinate: K,
    hasPayload: $t,
    offset: d,
    position: v,
    reverseDirection: h,
    useTranslate3d: p,
    viewBox: E,
    wrapperStyle: m,
    lastBoundingBox: ce,
    innerRef: ve,
    hasPortalFromProps: !!P
  }, nL(u, B));
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ Gc(U, Ke), W && /* @__PURE__ */ y(SN, {
    cursor: g,
    tooltipEventType: T,
    coordinate: K,
    payload: Fe,
    index: _
  }));
}
var Wn = (e) => null;
Wn.displayName = "Cell";
function aL(e, t, r) {
  return (t = oL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oL(e) {
  var t = lL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function lL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class uL {
  constructor(t) {
    aL(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
  }
  get(t) {
    var r = this.cache.get(t);
    return r !== void 0 && (this.cache.delete(t), this.cache.set(t, r)), r;
  }
  set(t, r) {
    if (this.cache.has(t))
      this.cache.delete(t);
    else if (this.cache.size >= this.maxSize) {
      var n = this.cache.keys().next().value;
      n != null && this.cache.delete(n);
    }
    this.cache.set(t, r);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function gy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function sL(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gy(Object(r), !0).forEach(function(n) {
      cL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function cL(e, t, r) {
  return (t = dL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dL(e) {
  var t = fL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function fL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vL = {
  cacheSize: 2e3,
  enableCache: !0
}, oA = sL({}, vL), by = new uL(oA.cacheSize), hL = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, xy = "recharts_measurement_span";
function pL(e, t) {
  var r = t.fontSize || "", n = t.fontFamily || "", i = t.fontWeight || "", a = t.fontStyle || "", o = t.letterSpacing || "", l = t.textTransform || "";
  return "".concat(e, "|").concat(r, "|").concat(n, "|").concat(i, "|").concat(a, "|").concat(o, "|").concat(l);
}
var wy = (e, t) => {
  try {
    var r = document.getElementById(xy);
    r || (r = document.createElement("span"), r.setAttribute("id", xy), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, hL, t), r.textContent = "".concat(e);
    var n = r.getBoundingClientRect();
    return {
      width: n.width,
      height: n.height
    };
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, ii = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Mn.isSsr)
    return {
      width: 0,
      height: 0
    };
  if (!oA.enableCache)
    return wy(t, r);
  var n = pL(t, r), i = by.get(n);
  if (i)
    return i;
  var a = wy(t, r);
  return by.set(n, a), a;
}, lA;
function _l(e, t) {
  return bL(e) || gL(e, t) || mL(e, t) || yL();
}
function yL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mL(e, t) {
  if (e) {
    if (typeof e == "string") return Ay(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ay(e, t) : void 0;
  }
}
function Ay(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function gL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        u = !1;
      } else for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function bL(e) {
  if (Array.isArray(e)) return e;
}
function xL(e, t, r) {
  return (t = wL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wL(e) {
  var t = AL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Py = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Oy = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, PL = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, OL = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, SL = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, IL = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function kL(e) {
  return IL.includes(e);
}
var Qn = "NaN";
function jL(e, t) {
  return e * SL[t];
}
class ot {
  static parse(t) {
    var r, n = (r = OL.exec(t)) !== null && r !== void 0 ? r : [], i = _l(n, 3), a = i[1], o = i[2];
    return a == null ? ot.NaN : new ot(parseFloat(a), o ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, Et(t) && (this.unit = ""), r !== "" && !PL.test(r) && (this.num = NaN, this.unit = ""), kL(r) && (this.num = jL(t, r), this.unit = "px");
  }
  add(t) {
    return this.unit !== t.unit ? new ot(NaN, "") : new ot(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit ? new ot(NaN, "") : new ot(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new ot(NaN, "") : new ot(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new ot(NaN, "") : new ot(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Et(this.num);
  }
}
lA = ot;
xL(ot, "NaN", new lA(NaN, ""));
function uA(e) {
  if (e == null || e.includes(Qn))
    return Qn;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = Py.exec(t)) !== null && r !== void 0 ? r : [], i = _l(n, 4), a = i[1], o = i[2], l = i[3], u = ot.parse(a ?? ""), s = ot.parse(l ?? ""), c = o === "*" ? u.multiply(s) : u.divide(s);
    if (c.isNaN())
      return Qn;
    t = t.replace(Py, c.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var d, f = (d = Oy.exec(t)) !== null && d !== void 0 ? d : [], v = _l(f, 4), h = v[1], p = v[2], m = v[3], g = ot.parse(h ?? ""), w = ot.parse(m ?? ""), x = p === "+" ? g.add(w) : g.subtract(w);
    if (x.isNaN())
      return Qn;
    t = t.replace(Oy, x.toString());
  }
  return t;
}
var Sy = /\(([^()]*)\)/;
function TL(e) {
  for (var t = e, r; (r = Sy.exec(t)) != null; ) {
    var n = r, i = _l(n, 2), a = i[1];
    t = t.replace(Sy, uA(a));
  }
  return t;
}
function EL(e) {
  var t = e.replace(/\s+/g, "");
  return t = TL(t), t = uA(t), t;
}
function CL(e) {
  try {
    return EL(e);
  } catch {
    return Qn;
  }
}
function _s(e) {
  var t = CL(e.slice(5, -1));
  return t === Qn ? "" : t;
}
var DL = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], ML = ["dx", "dy", "angle", "className", "breakAll"];
function Ec() {
  return Ec = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ec.apply(null, arguments);
}
function Iy(e, t) {
  if (e == null) return {};
  var r, n, i = $L(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function $L(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function ky(e, t) {
  return RL(e) || LL(e, t) || NL(e, t) || _L();
}
function _L() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function NL(e, t) {
  if (e) {
    if (typeof e == "string") return jy(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? jy(e, t) : void 0;
  }
}
function jy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function LL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        u = !1;
      } else for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function RL(e) {
  if (Array.isArray(e)) return e;
}
var sA = /[ \f\n\r\t\v\u2028\u2029]+/, cA = (e) => {
  var t = e.children, r = e.breakAll, n = e.style;
  try {
    var i = [];
    he(t) || (r ? i = t.toString().split("") : i = t.toString().split(sA));
    var a = i.map((l) => ({
      word: l,
      width: ii(l, n).width
    })), o = r ? 0 : ii(" ", n).width;
    return {
      wordsWithComputedWidth: a,
      spaceWidth: o
    };
  } catch {
    return null;
  }
};
function dA(e) {
  return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function BL(e) {
  return he(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var fA = (e, t, r, n) => e.reduce((i, a) => {
  var o = a.word, l = a.width, u = i[i.length - 1];
  if (u && l != null && (t == null || n || u.width + l + r < Number(t)))
    u.words.push(o), u.width += l + r;
  else {
    var s = {
      words: [o],
      width: l
    };
    i.push(s);
  }
  return i;
}, []), vA = (e) => e.reduce((t, r) => t.width > r.width ? t : r), zL = "…", Ty = (e, t, r, n, i, a, o, l) => {
  var u = e.slice(0, t), s = cA({
    breakAll: r,
    style: n,
    children: u + zL
  });
  if (!s)
    return [!1, []];
  var c = fA(s.wordsWithComputedWidth, a, o, l), d = c.length > i || vA(c).width > Number(a);
  return [d, c];
}, KL = (e, t, r, n, i) => {
  var a = e.maxLines, o = e.children, l = e.style, u = e.breakAll, s = L(a), c = String(o), d = fA(t, n, r, i);
  if (!s || i)
    return d;
  var f = d.length > a || vA(d).width > Number(n);
  if (!f)
    return d;
  for (var v = 0, h = c.length - 1, p = 0, m; v <= h && p <= c.length - 1; ) {
    var g = Math.floor((v + h) / 2), w = g - 1, x = Ty(c, w, u, l, a, n, r, i), A = ky(x, 2), P = A[0], b = A[1], O = Ty(c, g, u, l, a, n, r, i), I = ky(O, 1), E = I[0];
    if (!P && !E && (v = g + 1), P && E && (h = g - 1), !P && E) {
      m = b;
      break;
    }
    p++;
  }
  return m || d;
}, Ey = (e) => {
  var t = he(e) ? [] : e.toString().split(sA);
  return [{
    words: t,
    width: void 0
  }];
}, WL = (e) => {
  var t = e.width, r = e.scaleToFit, n = e.children, i = e.style, a = e.breakAll, o = e.maxLines;
  if ((t || r) && !Mn.isSsr) {
    var l, u, s = cA({
      breakAll: a,
      children: n,
      style: i
    });
    if (s) {
      var c = s.wordsWithComputedWidth, d = s.spaceWidth;
      l = c, u = d;
    } else
      return Ey(n);
    return KL({
      breakAll: a,
      children: n,
      maxLines: o,
      style: i
    }, l, u, t, !!r);
  }
  return Ey(n);
}, hA = "#808080", FL = {
  angle: 0,
  breakAll: !1,
  // Magic number from d3
  capHeight: "0.71em",
  fill: hA,
  lineHeight: "1em",
  scaleToFit: !1,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
}, Lr = /* @__PURE__ */ Pe((e, t) => {
  var r = re(e, FL), n = r.x, i = r.y, a = r.lineHeight, o = r.capHeight, l = r.fill, u = r.scaleToFit, s = r.textAnchor, c = r.verticalAnchor, d = Iy(r, DL), f = xe(() => WL({
    breakAll: d.breakAll,
    children: d.children,
    maxLines: d.maxLines,
    scaleToFit: u,
    style: d.style,
    width: d.width
  }), [d.breakAll, d.children, d.maxLines, u, d.style, d.width]), v = d.dx, h = d.dy, p = d.angle, m = d.className, g = d.breakAll, w = Iy(d, ML);
  if (!tt(n) || !tt(i) || f.length === 0)
    return null;
  var x = Number(n) + (L(v) ? v : 0), A = Number(i) + (L(h) ? h : 0);
  if (!Q(x) || !Q(A))
    return null;
  var P;
  switch (c) {
    case "start":
      P = _s("calc(".concat(o, ")"));
      break;
    case "middle":
      P = _s("calc(".concat((f.length - 1) / 2, " * -").concat(a, " + (").concat(o, " / 2))"));
      break;
    default:
      P = _s("calc(".concat(f.length - 1, " * -").concat(a, ")"));
      break;
  }
  var b = [], O = f[0];
  if (u && O != null) {
    var I = O.width, E = d.width;
    b.push("scale(".concat(L(E) && L(I) ? E / I : 1, ")"));
  }
  return p && b.push("rotate(".concat(p, ", ").concat(x, ", ").concat(A, ")")), b.length && (w.transform = b.join(" ")), /* @__PURE__ */ y("text", Ec({}, $e(w), {
    ref: t,
    x,
    y: A,
    className: J("recharts-text", m),
    textAnchor: s,
    fill: l.includes("url") ? hA : l
  }), f.map((j, T) => {
    var k = j.words.join(g ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ y("tspan", {
        x,
        dy: T === 0 ? P : a,
        key: "".concat(k, "-").concat(T)
      }, k)
    );
  }));
});
Lr.displayName = "Text";
var UL = ["labelRef"], XL = ["content"];
function Cy(e, t) {
  if (e == null) return {};
  var r, n, i = HL(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function HL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Dy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dy(Object(r), !0).forEach(function(n) {
      YL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Dy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function YL(e, t, r) {
  return (t = VL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VL(e) {
  var t = GL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function GL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ir() {
  return Ir = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ir.apply(null, arguments);
}
var pA = /* @__PURE__ */ We(null), Vu = (e) => {
  var t = e.x, r = e.y, n = e.upperWidth, i = e.lowerWidth, a = e.width, o = e.height, l = e.children, u = xe(() => ({
    x: t,
    y: r,
    upperWidth: n,
    lowerWidth: i,
    width: a,
    height: o
  }), [t, r, n, i, a, o]);
  return /* @__PURE__ */ y(pA.Provider, {
    value: u
  }, l);
}, yA = () => {
  var e = Ze(pA), t = Si();
  return e || (t ? Zc(t) : void 0);
}, mA = /* @__PURE__ */ We(null), gA = (e) => {
  var t = e.cx, r = e.cy, n = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, l = e.clockWise, u = e.children, s = xe(() => ({
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    startAngle: a,
    endAngle: o,
    clockWise: l
  }), [t, r, n, i, a, o, l]);
  return /* @__PURE__ */ y(mA.Provider, {
    value: s
  }, u);
}, bA = () => {
  var e = Ze(mA), t = C(_n);
  return e || t;
}, qL = (e) => {
  var t = e.value, r = e.formatter, n = he(e.children) ? t : e.children;
  return typeof r == "function" ? r(n) : n;
}, Gu = (e) => e != null && typeof e == "function", ZL = (e, t) => {
  var r = Ue(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, JL = (e, t, r, n, i) => {
  var a = e.offset, o = e.className, l = i.cx, u = i.cy, s = i.innerRadius, c = i.outerRadius, d = i.startAngle, f = i.endAngle, v = i.clockWise, h = (s + c) / 2, p = ZL(d, f), m = p >= 0 ? 1 : -1, g, w;
  switch (t) {
    case "insideStart":
      g = d + m * a, w = v;
      break;
    case "insideEnd":
      g = f - m * a, w = !v;
      break;
    case "end":
      g = f + m * a, w = v;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  w = p <= 0 ? w : !w;
  var x = pe(l, u, h, g), A = pe(l, u, h, g + (w ? 1 : -1) * 359), P = "M".concat(x.x, ",").concat(x.y, `
    A`).concat(h, ",").concat(h, ",0,1,").concat(w ? 0 : 1, `,
    `).concat(A.x, ",").concat(A.y), b = he(e.id) ? oi("recharts-radial-line-") : e.id;
  return /* @__PURE__ */ y("text", Ir({}, n, {
    dominantBaseline: "central",
    className: J("recharts-radial-bar-label", o)
  }), /* @__PURE__ */ y("defs", null, /* @__PURE__ */ y("path", {
    id: b,
    d: P
  })), /* @__PURE__ */ y("textPath", {
    xlinkHref: "#".concat(b)
  }, r));
}, QL = (e, t, r) => {
  var n = e.cx, i = e.cy, a = e.innerRadius, o = e.outerRadius, l = e.startAngle, u = e.endAngle, s = (l + u) / 2;
  if (r === "outside") {
    var c = pe(n, i, o + t, s), d = c.x, f = c.y;
    return {
      x: d,
      y: f,
      textAnchor: d >= n ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (r === "center")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (r === "centerTop")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (r === "centerBottom")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var v = (a + o) / 2, h = pe(n, i, v, s), p = h.x, m = h.y;
  return {
    x: p,
    y: m,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, Jn = (e) => e != null && "cx" in e && L(e.cx), eR = {
  angle: 0,
  offset: 5,
  zIndex: fe.label,
  position: "middle",
  textBreakAll: !1
};
function tR(e) {
  if (!Jn(e))
    return e;
  var t = e.cx, r = e.cy, n = e.outerRadius, i = n * 2;
  return {
    x: t - n,
    y: r - n,
    width: i,
    upperWidth: i,
    lowerWidth: i,
    height: i
  };
}
function Yr(e) {
  var t, r, n = re(e, eR), i = n.viewBox, a = n.parentViewBox, o = n.position, l = n.value, u = n.children, s = n.content, c = n.className, d = c === void 0 ? "" : c, f = n.textBreakAll, v = n.labelRef, h = bA(), p = yA(), m = o === "center" ? p : h ?? p, g, w, x;
  i == null ? g = m : Jn(i) ? g = i : g = Zc(i);
  var A = tR(g);
  if (!g || he(l) && he(u) && !/* @__PURE__ */ ie(s) && typeof s != "function")
    return null;
  var P = Jn(g) && (o === "insideStart" || o === "insideEnd" || o === "end");
  if (Jn(g))
    P || (x = QL(g, n.offset, n.position));
  else if (A) {
    var b = Vg({
      viewBox: A,
      position: o,
      offset: n.offset,
      parentViewBox: Jn(a) ? void 0 : a,
      clamp: !0
    });
    x = fn(fn({
      x: b.x,
      y: b.y,
      textAnchor: b.horizontalAnchor,
      verticalAnchor: b.verticalAnchor
    }, b.width !== void 0 ? {
      width: b.width
    } : {}), b.height !== void 0 ? {
      height: b.height
    } : {});
  }
  var O = fn(fn(fn(fn({}, ((t = x) === null || t === void 0 ? void 0 : t.x) !== void 0 ? {
    x: x.x
  } : {}), ((r = x) === null || r === void 0 ? void 0 : r.y) !== void 0 ? {
    y: x.y
  } : {}), n), {}, {
    viewBox: g
  });
  if (/* @__PURE__ */ ie(s)) {
    O.labelRef;
    var I = Cy(O, UL);
    return /* @__PURE__ */ Ae(s, I);
  }
  if (typeof s == "function") {
    O.content;
    var E = Cy(O, XL);
    if (w = /* @__PURE__ */ y(s, E), /* @__PURE__ */ ie(w))
      return w;
  } else
    w = qL(n);
  var j = $e(n);
  return P && Jn(g) ? JL(n, o, w, j, g) : x == null ? null : /* @__PURE__ */ y(we, {
    zIndex: n.zIndex
  }, /* @__PURE__ */ y(Lr, Ir({
    ref: v,
    className: J("recharts-label", d)
  }, j, x, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: dA(j.textAnchor) ? j.textAnchor : x.textAnchor,
    breakAll: f
  }), w));
}
Yr.displayName = "Label";
var xA = (e, t, r) => {
  if (!e)
    return null;
  var n = {
    viewBox: t,
    labelRef: r
  };
  return e === !0 ? /* @__PURE__ */ y(Yr, Ir({
    key: "label-implicit"
  }, n)) : tt(e) ? /* @__PURE__ */ y(Yr, Ir({
    key: "label-implicit",
    value: e
  }, n)) : /* @__PURE__ */ ie(e) ? e.type === Yr ? /* @__PURE__ */ Ae(e, fn({
    key: "label-implicit"
  }, n)) : /* @__PURE__ */ y(Yr, Ir({
    key: "label-implicit",
    content: e
  }, n)) : Gu(e) ? /* @__PURE__ */ y(Yr, Ir({
    key: "label-implicit",
    content: e
  }, n)) : e && typeof e == "object" ? /* @__PURE__ */ y(Yr, Ir({}, e, {
    key: "label-implicit"
  }, n)) : null;
};
function qu(e) {
  var t = e.label, r = e.labelRef, n = yA();
  return xA(t, n, r) || null;
}
function rR(e) {
  var t = e.label, r = bA();
  return xA(t, r) || null;
}
var nR = ["valueAccessor"], iR = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function Nl() {
  return Nl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nl.apply(null, arguments);
}
function My(e, t) {
  if (e == null) return {};
  var r, n, i = aR(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function aR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var oR = (e) => {
  var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
  if (BL(t))
    return t;
}, wA = /* @__PURE__ */ We(void 0), zi = wA.Provider, AA = /* @__PURE__ */ We(void 0), PA = AA.Provider;
function lR() {
  return Ze(wA);
}
function uR() {
  return Ze(AA);
}
function Wo(e) {
  var t = e.valueAccessor, r = t === void 0 ? oR : t, n = My(e, nR), i = n.dataKey;
  n.clockWise;
  var a = n.id, o = n.textBreakAll, l = n.zIndex, u = My(n, iR), s = lR(), c = uR(), d = s || c;
  return !d || !d.length ? null : /* @__PURE__ */ y(we, {
    zIndex: l ?? fe.label
  }, /* @__PURE__ */ y(X, {
    className: "recharts-label-list"
  }, d.map((f, v) => {
    var h, p = he(i) ? r(f, v) : G(f.payload, i), m = he(a) ? {} : {
      id: "".concat(a, "-").concat(v)
    };
    return /* @__PURE__ */ y(Yr, Nl({
      key: "label-".concat(v)
    }, $e(f), u, m, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (h = n.fill) !== null && h !== void 0 ? h : f.fill,
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: o,
      viewBox: f.viewBox,
      index: v,
      zIndex: 0
    }));
  })));
}
Wo.displayName = "LabelList";
function rn(e) {
  var t = e.label;
  return t ? t === !0 ? /* @__PURE__ */ y(Wo, {
    key: "labelList-implicit"
  }) : /* @__PURE__ */ ie(t) || Gu(t) ? /* @__PURE__ */ y(Wo, {
    key: "labelList-implicit",
    content: t
  }) : typeof t == "object" ? /* @__PURE__ */ y(Wo, Nl({
    key: "labelList-implicit"
  }, t, {
    type: String(t.type)
  })) : null : null;
}
var sR = ["component"];
function cR(e, t) {
  if (e == null) return {};
  var r, n, i = dR(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function dR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function fR(e) {
  var t = e.component, r = cR(e, sR), n;
  return /* @__PURE__ */ ie(t) ? n = /* @__PURE__ */ Ae(t, r) : typeof t == "function" ? n = /* @__PURE__ */ y(t, r) : Aa(!1, "Customized's props `component` must be React.element or Function, but got %s.", typeof t), /* @__PURE__ */ y(X, {
    className: "recharts-customized-wrapper"
  }, n);
}
fR.displayName = "Customized";
var vR = ["points", "className", "baseLinePoints", "connectNulls"], $y;
function ei() {
  return ei = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ei.apply(null, arguments);
}
function hR(e, t) {
  if (e == null) return {};
  var r, n, i = pR(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function pR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function yR(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var _y = (e) => e != null && e.x === +e.x && e.y === +e.y, mR = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  t.forEach((o) => {
    var l = r[r.length - 1];
    _y(o) ? l && l.push(o) : l && l.length > 0 && r.push([]);
  });
  var n = t[0], i = r[r.length - 1];
  _y(n) && i && i.push(n);
  var a = r[r.length - 1];
  return a && a.length <= 0 && (r = r.slice(0, -1)), r;
}, pa = (e, t) => {
  var r = mR(e);
  t && (r = [r.reduce((i, a) => [...i, ...a], [])]);
  var n = r.map((i) => i.reduce((a, o, l) => Le($y || ($y = yR(["", "", "", ",", ""])), a, l === 0 ? "M" : "L", o.x, o.y), "")).join("");
  return r.length === 1 ? "".concat(n, "Z") : n;
}, gR = (e, t, r) => {
  var n = pa(e, r);
  return "".concat(n.slice(-1) === "Z" ? n.slice(0, -1) : n, "L").concat(pa(Array.from(t).reverse(), r).slice(1));
}, Nf = (e) => {
  var t = e.points, r = e.className, n = e.baseLinePoints, i = e.connectNulls, a = hR(e, vR);
  if (!t || !t.length)
    return null;
  var o = J("recharts-polygon", r);
  if (n && n.length) {
    var l = a.stroke && a.stroke !== "none", u = gR(t, n, i);
    return /* @__PURE__ */ y("g", {
      className: o
    }, /* @__PURE__ */ y("path", ei({}, $e(a), {
      fill: u.slice(-1) === "Z" ? a.fill : "none",
      stroke: "none",
      d: u
    })), l ? /* @__PURE__ */ y("path", ei({}, $e(a), {
      fill: "none",
      d: pa(t, i)
    })) : null, l ? /* @__PURE__ */ y("path", ei({}, $e(a), {
      fill: "none",
      d: pa(n, i)
    })) : null);
  }
  var s = pa(t, i);
  return /* @__PURE__ */ y("path", ei({}, $e(a), {
    fill: s.slice(-1) === "Z" ? a.fill : "none",
    className: o,
    d: s
  }));
};
function Cc() {
  return Cc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Cc.apply(null, arguments);
}
var Zu = (e) => {
  var t = e.cx, r = e.cy, n = e.r, i = e.className, a = J("recharts-dot", i);
  return L(t) && L(r) && L(n) ? /* @__PURE__ */ y("circle", Cc({}, oe(e), rd(e), {
    className: a,
    cx: t,
    cy: r,
    r: n
  })) : null;
}, uo = (e) => e.graphicalItems.polarItems, bR = S([je, Ya], lf), so = S([uo, Re, bR], uf), xR = S([so], sf), Ju = S([xR, zr], cf), OA = S([Ju, Re, so], iw);
S([Ju, Re, so], (e, t, r) => r.length > 0 ? e.flatMap((n) => r.flatMap((i) => {
  var a, o = G(n, (a = t.dataKey) !== null && a !== void 0 ? a : i.dataKey);
  return {
    value: o,
    errorDomain: []
    // polar charts do not have error bars
  };
})).filter(Boolean) : t?.dataKey != null ? e.map((n) => ({
  value: G(n, t.dataKey),
  errorDomain: []
})) : e.map((n) => ({
  value: n,
  errorDomain: []
})));
var Ny = () => {
}, wR = S([Ju, Re, so, Wu, je, RE], yf), AR = S([Re, hf, pf, Ny, wR, Ny, te, je], mf), SA = S([Re, te, Ju, OA, Di, je, AR], gf), IA = S([SA, Rn, wr], bf), PR = S([Re, SA, IA, je], wf), OR = S([wr, PR], hx), Lf = (e, t, r) => {
  switch (t) {
    case "angleAxis":
      return $n(e, r);
    case "radiusAxis":
      return $i(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, Rf = (e, t, r) => {
  switch (t) {
    case "angleAxis":
      return oC(e, r);
    case "radiusAxis":
      return lC(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, SR = S([Lf, wr, OR, Rf], Ku), nn = S([SR], $u), kA = S([te, OA, Rn, je], Pf), Fn = S([te, Lf, wr, nn, IA, Rf, no, kA, je], Sw), IR = S([Fn], (e) => {
  if (e) {
    var t = /* @__PURE__ */ new Map();
    return e.forEach((r) => {
      var n = (r.coordinate + 360) % 360;
      t.has(n) || t.set(n, r);
    }), Array.from(t.values());
  }
}), kR = S([te, Lf, nn, Rf, no, kA, je], kw), jR = (e, t) => Fn(e, "angleAxis", t, !1), TR = S([jR], (e) => {
  if (e)
    return e.map((t) => t.coordinate);
}), ER = (e, t) => Fn(e, "radiusAxis", t, !1), CR = S([ER], (e) => {
  if (e)
    return e.map((t) => t.coordinate);
}), DR = ["gridType", "radialLines", "angleAxisId", "radiusAxisId", "cx", "cy", "innerRadius", "outerRadius", "polarAngles", "polarRadius", "zIndex"];
function MR(e, t) {
  if (e == null) return {};
  var r, n, i = $R(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function $R(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Qt() {
  return Qt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qt.apply(null, arguments);
}
function Ly(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Qu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ly(Object(r), !0).forEach(function(n) {
      _R(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ly(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _R(e, t, r) {
  return (t = NR(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NR(e) {
  var t = LR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function LR(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var RR = (e, t, r, n) => {
  var i = "";
  return n.forEach((a, o) => {
    var l = pe(t, r, e, a);
    o ? i += "L ".concat(l.x, ",").concat(l.y) : i += "M ".concat(l.x, ",").concat(l.y);
  }), i += "Z", i;
}, BR = (e) => {
  var t = e.cx, r = e.cy, n = e.innerRadius, i = e.outerRadius, a = e.polarAngles, o = e.radialLines;
  if (!a || !a.length || !o)
    return null;
  var l = Qu({}, oe(e));
  return /* @__PURE__ */ y("g", {
    className: "recharts-polar-grid-angle"
  }, a.map((u) => {
    var s = pe(t, r, n, u), c = pe(t, r, i, u);
    return /* @__PURE__ */ y("line", Qt({
      key: "line-".concat(u)
    }, l, {
      x1: s.x,
      y1: s.y,
      x2: c.x,
      y2: c.y
    }));
  }));
}, Ry = (e) => {
  var t = e.cx, r = e.cy, n = e.radius, i = Qu({}, oe(e));
  return (
    // @ts-expect-error wrong SVG element type
    /* @__PURE__ */ y("circle", Qt({}, i, {
      className: J("recharts-polar-grid-concentric-circle", e.className),
      cx: t,
      cy: r,
      r: n
    }))
  );
}, By = (e) => {
  var t = e.radius, r = Qu({}, oe(e));
  return /* @__PURE__ */ y("path", Qt({}, r, {
    className: J("recharts-polar-grid-concentric-polygon", e.className),
    d: RR(t, e.cx, e.cy, e.polarAngles)
  }));
}, zR = (e) => {
  var t = e.polarRadius, r = e.gridType;
  if (!t || !t.length)
    return null;
  var n = Math.max(...t), i = e.fill && e.fill !== "none";
  return /* @__PURE__ */ y("g", {
    className: "recharts-polar-grid-concentric"
  }, i && r === "circle" && /* @__PURE__ */ y(Ry, Qt({}, e, {
    radius: n
  })), i && r !== "circle" && /* @__PURE__ */ y(By, Qt({}, e, {
    radius: n
  })), t.map((a, o) => {
    var l = o;
    return r === "circle" ? /* @__PURE__ */ y(Ry, Qt({
      key: l
    }, e, {
      fill: "none",
      radius: a
    })) : /* @__PURE__ */ y(By, Qt({
      key: l
    }, e, {
      fill: "none",
      radius: a
    }));
  }));
}, KR = {
  angleAxisId: 0,
  radiusAxisId: 0,
  gridType: "polygon",
  radialLines: !0,
  zIndex: fe.grid,
  stroke: "#ccc",
  strokeWidth: 1,
  fill: "none"
}, WR = (e) => {
  var t, r, n, i, a, o, l, u, s = re(e, KR), c = s.gridType, d = s.radialLines, f = s.angleAxisId, v = s.radiusAxisId, h = s.cx, p = s.cy, m = s.innerRadius, g = s.outerRadius, w = s.polarAngles, x = s.polarRadius, A = s.zIndex, P = MR(s, DR), b = C(_n), O = C((_) => TR(_, f)), I = C((_) => CR(_, v)), E = Array.isArray(w) ? w : O, j = Array.isArray(x) ? x : I;
  if (E == null || j == null)
    return null;
  var T = Qu({
    cx: (t = (r = b?.cx) !== null && r !== void 0 ? r : h) !== null && t !== void 0 ? t : 0,
    cy: (n = (i = b?.cy) !== null && i !== void 0 ? i : p) !== null && n !== void 0 ? n : 0,
    innerRadius: (a = (o = b?.innerRadius) !== null && o !== void 0 ? o : m) !== null && a !== void 0 ? a : 0,
    outerRadius: (l = (u = b?.outerRadius) !== null && u !== void 0 ? u : g) !== null && l !== void 0 ? l : 0,
    polarAngles: E,
    polarRadius: j,
    zIndex: A
  }, P), k = T.outerRadius;
  return k <= 0 ? null : /* @__PURE__ */ y(we, {
    zIndex: T.zIndex
  }, /* @__PURE__ */ y("g", {
    className: "recharts-polar-grid"
  }, /* @__PURE__ */ y(zR, Qt({
    gridType: c,
    radialLines: d
  }, T, {
    polarAngles: E,
    polarRadius: j
  })), /* @__PURE__ */ y(BR, Qt({
    gridType: c,
    radialLines: d
  }, T, {
    polarAngles: E,
    polarRadius: j
  }))));
};
WR.displayName = "PolarGrid";
function Bf(e) {
  return Array.isArray(e) ? e : Array.from(e);
}
function jA(e, t = cu) {
  if (e == null) return;
  const r = Bf(e);
  if (r.length === 0) return;
  const n = du(t);
  let i, a;
  for (let o = 0; o < r.length; o++) {
    const l = r[o], u = n(l, o, r);
    u == null || Number.isNaN(u) || typeof u == "symbol" || (a === void 0 || u > a) && (a = u, i = l);
  }
  return i;
}
function FR(e, t = cu) {
  if (e == null) return;
  const r = Bf(e);
  if (r.length === 0) return;
  const n = du(t);
  let i, a;
  for (let o = 0; o < r.length; o++) {
    const l = r[o], u = n(l, o, r);
    u == null || Number.isNaN(u) || typeof u == "symbol" || (a === void 0 || u < a) && (a = u, i = l);
  }
  return i;
}
var UR = {
  radiusAxis: {},
  angleAxis: {}
}, TA = ht({
  name: "polarAxis",
  initialState: UR,
  reducers: {
    addRadiusAxis(e, t) {
      e.radiusAxis[t.payload.id] = ye(t.payload);
    },
    removeRadiusAxis(e, t) {
      delete e.radiusAxis[t.payload.id];
    },
    addAngleAxis(e, t) {
      e.angleAxis[t.payload.id] = ye(t.payload);
    },
    removeAngleAxis(e, t) {
      delete e.angleAxis[t.payload.id];
    }
  }
}), es = TA.actions, XR = es.addRadiusAxis, HR = es.removeRadiusAxis, YR = es.addAngleAxis, VR = es.removeAngleAxis, GR = TA.reducer;
function ts(e) {
  return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
var qR = ["type"], ZR = ["cx", "cy", "angle", "axisLine"], JR = ["angle", "tickFormatter", "stroke", "tick"];
function Ta() {
  return Ta = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ta.apply(null, arguments);
}
function zy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function er(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zy(Object(r), !0).forEach(function(n) {
      QR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function QR(e, t, r) {
  return (t = e2(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function e2(e) {
  var t = t2(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function t2(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function zf(e, t) {
  if (e == null) return {};
  var r, n, i = r2(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function r2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var n2 = "radiusAxis";
function i2(e) {
  var t = ee(), r = Xa(), n = xe(() => {
    var i = e.type, a = zf(e, qR), o = Mi(r, "radiusAxis", i);
    if (o != null)
      return er(er({}, a), {}, {
        type: o
      });
  }, [e, r]);
  return ae(() => n == null ? mt : (t(XR(n)), () => {
    t(HR(n));
  }), [t, n]), null;
}
var a2 = (e, t, r, n) => {
  var i = e.coordinate;
  return pe(r, n, i, t);
}, o2 = (e) => {
  var t;
  switch (e) {
    case "left":
      t = "end";
      break;
    case "right":
      t = "start";
      break;
    default:
      t = "middle";
      break;
  }
  return t;
}, l2 = (e, t, r, n) => {
  var i = jA(n, (o) => o.coordinate || 0), a = FR(n, (o) => o.coordinate || 0);
  return {
    cx: t,
    cy: r,
    startAngle: e,
    endAngle: e,
    innerRadius: a?.coordinate || 0,
    outerRadius: i?.coordinate || 0,
    clockWise: !1
  };
}, u2 = (e, t) => {
  var r = e.cx, n = e.cy, i = e.angle, a = e.axisLine, o = zf(e, ZR), l = t.reduce((d, f) => [Math.min(d[0], f.coordinate), Math.max(d[1], f.coordinate)], [1 / 0, -1 / 0]), u = pe(r, n, l[0], i), s = pe(r, n, l[1], i), c = er(er(er({}, oe(o)), {}, {
    fill: "none"
  }, oe(a)), {}, {
    x1: u.x,
    y1: u.y,
    x2: s.x,
    y2: s.y
  });
  return /* @__PURE__ */ y("line", Ta({
    className: "recharts-polar-radius-axis-line"
  }, c));
}, s2 = (e, t, r) => {
  var n;
  return /* @__PURE__ */ ie(e) ? n = /* @__PURE__ */ Ae(e, t) : typeof e == "function" ? n = e(t) : n = /* @__PURE__ */ y(Lr, Ta({}, t, {
    className: "recharts-polar-radius-axis-tick-value"
  }), r), n;
}, c2 = (e, t) => {
  var r = e.angle, n = e.tickFormatter, i = e.stroke, a = e.tick, o = zf(e, JR), l = o2(e.orientation), u = oe(o), s = Tt(a), c = t.map((d, f) => {
    var v = a2(d, e.angle, e.cx, e.cy), h = er(er(er(er({
      textAnchor: l,
      transform: "rotate(".concat(90 - r, ", ").concat(v.x, ", ").concat(v.y, ")")
    }, u), {}, {
      stroke: "none",
      fill: i
    }, s), {}, {
      index: f
    }, v), {}, {
      payload: d
    });
    return /* @__PURE__ */ y(X, Ta({
      className: J("recharts-polar-radius-axis-tick", ts(a)),
      key: "tick-".concat(d.coordinate)
    }, ir(e, d, f)), s2(a, h, n ? n(d.value, f) : d.value));
  });
  return /* @__PURE__ */ y(X, {
    className: "recharts-polar-radius-axis-ticks"
  }, c);
}, d2 = (e) => {
  var t = e.radiusAxisId, r = C(_n), n = C((u) => nn(u, "radiusAxis", t)), i = C((u) => Fn(u, "radiusAxis", t, !1));
  if (r == null || !i || !i.length || n == null)
    return null;
  var a = er(er({}, e), {}, {
    scale: n
  }, r), o = a.tick, l = a.axisLine;
  return /* @__PURE__ */ y(we, {
    zIndex: a.zIndex
  }, /* @__PURE__ */ y(X, {
    className: J("recharts-polar-radius-axis", n2, a.className)
  }, l && u2(a, i), o && c2(a, i), /* @__PURE__ */ y(gA, l2(a.angle, a.cx, a.cy, i), /* @__PURE__ */ y(rR, {
    label: a.label
  }), a.children)));
};
function f2(e) {
  var t, r = re(e, Gt);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(i2, {
    domain: r.domain,
    id: r.radiusAxisId,
    scale: r.scale,
    type: r.type,
    dataKey: r.dataKey,
    unit: void 0,
    name: r.name,
    allowDuplicatedCategory: r.allowDuplicatedCategory,
    allowDataOverflow: r.allowDataOverflow,
    reversed: r.reversed,
    includeHidden: r.includeHidden,
    allowDecimals: r.allowDecimals,
    niceTicks: (t = r.niceTicks) !== null && t !== void 0 ? t : "auto",
    ticks: r.ticks,
    tickCount: r.tickCount,
    tick: r.tick
  }), /* @__PURE__ */ y(d2, r));
}
f2.displayName = "PolarRadiusAxis";
var v2 = ["children", "type"], h2 = ["ref"];
function jn() {
  return jn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, jn.apply(null, arguments);
}
function Ky(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ky(Object(r), !0).forEach(function(n) {
      p2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ky(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function p2(e, t, r) {
  return (t = y2(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function y2(e) {
  var t = m2(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function m2(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function EA(e, t) {
  if (e == null) return {};
  var r, n, i = g2(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function g2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Wy = 1e-5, b2 = Math.cos(ml(45)), x2 = "angleAxis";
function w2(e) {
  var t = ee(), r = Xa(), n = xe(() => {
    e.children;
    var o = e.type, l = EA(e, v2), u = Mi(r, "angleAxis", o);
    if (u != null)
      return Bt(Bt({}, l), {}, {
        type: u
      });
  }, [e, r]), i = C((o) => $n(o, n?.id)), a = n === i;
  return ae(() => n == null ? mt : (t(YR(n)), () => {
    t(VR(n));
  }), [t, n]), a ? e.children : null;
}
var A2 = (e, t) => {
  var r = t.cx, n = t.cy, i = t.radius, a = t.orientation, o = t.tickSize, l = o || 8, u = pe(r, n, i, e.coordinate), s = pe(r, n, i + (a === "inner" ? -1 : 1) * l, e.coordinate);
  return {
    x1: u.x,
    y1: u.y,
    x2: s.x,
    y2: s.y
  };
}, P2 = (e, t) => {
  var r = Math.cos(ml(-e.coordinate));
  return r > Wy ? t === "outer" ? "start" : "end" : r < -Wy ? t === "outer" ? "end" : "start" : "middle";
}, O2 = (e) => {
  var t = Math.cos(ml(-e.coordinate)), r = Math.sin(ml(-e.coordinate));
  return Math.abs(t) <= b2 ? r > 0 ? "start" : "end" : "middle";
}, S2 = (e) => {
  var t = e.cx, r = e.cy, n = e.radius, i = e.axisLineType, a = e.axisLine, o = e.ticks;
  if (!a)
    return null;
  var l = Bt(Bt({}, oe(e)), {}, {
    fill: "none"
  }, oe(a));
  if (i === "circle")
    return /* @__PURE__ */ y(Zu, jn({
      className: "recharts-polar-angle-axis-line"
    }, l, {
      cx: t,
      cy: r,
      r: n
    }));
  var u = o.map((s) => pe(t, r, n, s.coordinate));
  return /* @__PURE__ */ y(Nf, jn({
    className: "recharts-polar-angle-axis-line"
  }, l, {
    points: u
  }));
}, I2 = (e) => {
  var t = e.tick, r = e.tickProps, n = e.value;
  return t ? /* @__PURE__ */ ie(t) ? /* @__PURE__ */ Ae(t, r) : typeof t == "function" ? t(r) : /* @__PURE__ */ y(Lr, jn({}, r, {
    className: "recharts-polar-angle-axis-tick-value"
  }), n) : null;
}, k2 = (e) => {
  var t = e.tick, r = e.tickLine, n = e.tickFormatter, i = e.stroke, a = e.ticks, o = oe(e);
  o.ref;
  var l = EA(o, h2), u = Tt(t), s = Bt(Bt({}, l), {}, {
    fill: "none"
  }, oe(r)), c = a.map((d, f) => {
    var v = A2(d, e), h = P2(d, e.orientation), p = O2(d), m = Bt(Bt(Bt({}, l), {}, {
      // @ts-expect-error customTickProps is contributing unknown props
      textAnchor: h,
      verticalAnchor: p,
      // @ts-expect-error customTickProps is contributing unknown props
      stroke: "none",
      // @ts-expect-error customTickProps is contributing unknown props
      fill: i
    }, u), {}, {
      index: f,
      payload: d,
      x: v.x2,
      y: v.y2
    });
    return /* @__PURE__ */ y(X, jn({
      className: J("recharts-polar-angle-axis-tick", ts(t)),
      key: "tick-".concat(d.coordinate)
    }, ir(e, d, f)), r && /* @__PURE__ */ y("line", jn({
      className: "recharts-polar-angle-axis-tick-line"
    }, s, v)), /* @__PURE__ */ y(I2, {
      tick: t,
      tickProps: m,
      value: n ? n(d.value, f) : d.value
    }));
  });
  return /* @__PURE__ */ y(X, {
    className: "recharts-polar-angle-axis-ticks"
  }, c);
}, j2 = (e) => {
  var t = e.angleAxisId, r = C(_n), n = C((l) => nn(l, "angleAxis", t)), i = se(), a = C((l) => IR(l, "angleAxis", t, i));
  if (r == null || !a || !a.length || n == null)
    return null;
  var o = Bt(Bt(Bt({}, e), {}, {
    scale: n
  }, r), {}, {
    radius: r.outerRadius,
    ticks: a
  });
  return /* @__PURE__ */ y(we, {
    zIndex: o.zIndex
  }, /* @__PURE__ */ y(X, {
    className: J("recharts-polar-angle-axis", x2, o.className)
  }, /* @__PURE__ */ y(S2, o), /* @__PURE__ */ y(k2, o)));
};
function T2(e) {
  var t, r = re(e, Xr);
  return /* @__PURE__ */ y(w2, {
    id: r.angleAxisId,
    scale: r.scale,
    type: r.type,
    dataKey: r.dataKey,
    unit: void 0,
    name: r.name,
    allowDuplicatedCategory: !1,
    allowDataOverflow: !1,
    reversed: r.reversed,
    includeHidden: !1,
    allowDecimals: r.allowDecimals,
    tickCount: r.tickCount,
    niceTicks: (t = r.niceTicks) !== null && t !== void 0 ? t : "auto",
    ticks: r.ticks,
    tick: r.tick,
    domain: r.domain
  }, /* @__PURE__ */ y(j2, r));
}
T2.displayName = "PolarAngleAxis";
function Fy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Uy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fy(Object(r), !0).forEach(function(n) {
      E2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function E2(e, t, r) {
  return (t = C2(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function C2(e) {
  var t = D2(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function D2(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var M2 = (e, t) => t, Kf = S([uo, M2], (e, t) => e.filter((r) => r.type === "pie").find((r) => r.id === t)), $2 = [], Wf = (e, t, r) => r?.length === 0 ? $2 : r, CA = S([zr, Kf, Wf], (e, t, r) => {
  var n = e.chartData;
  if (t != null) {
    var i;
    if (t?.data != null && t.data.length > 0 ? i = t.data : i = n, (!i || !i.length) && r != null && (i = r.map((a) => Uy(Uy({}, t.presentationProps), a.props))), i != null)
      return i;
  }
}), _2 = S([CA, Kf, Wf], (e, t, r) => {
  if (!(e == null || t == null))
    return e.map((n, i) => {
      var a, o = G(n, t.nameKey, t.name), l;
      return r != null && (a = r[i]) !== null && a !== void 0 && (a = a.props) !== null && a !== void 0 && a.fill ? l = r[i].props.fill : typeof n == "object" && n != null && "fill" in n ? l = n.fill : l = t.fill, {
        value: Mt(o, t.dataKey),
        dataKey: t.dataKey,
        color: l,
        // @ts-expect-error Legend payload.payload says it wants objects but our data can be unknown
        payload: n,
        type: t.legendType
      };
    });
}), N2 = S([CA, Kf, Wf, He], (e, t, r, n) => {
  if (!(t == null || e == null))
    return UB({
      offset: n,
      pieSettings: t,
      displayedData: e,
      cells: r
    });
}), Ns = { exports: {} }, be = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xy;
function L2() {
  if (Xy) return be;
  Xy = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), o = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.view_transition"), v = Symbol.for("react.client.reference");
  function h(p) {
    if (typeof p == "object" && p !== null) {
      var m = p.$$typeof;
      switch (m) {
        case e:
          switch (p = p.type, p) {
            case r:
            case i:
            case n:
            case u:
            case s:
            case f:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case o:
                case l:
                case d:
                case c:
                  return p;
                case a:
                  return p;
                default:
                  return m;
              }
          }
        case t:
          return m;
      }
    }
  }
  return be.ContextConsumer = a, be.ContextProvider = o, be.Element = e, be.ForwardRef = l, be.Fragment = r, be.Lazy = d, be.Memo = c, be.Portal = t, be.Profiler = i, be.StrictMode = n, be.Suspense = u, be.SuspenseList = s, be.isContextConsumer = function(p) {
    return h(p) === a;
  }, be.isContextProvider = function(p) {
    return h(p) === o;
  }, be.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, be.isForwardRef = function(p) {
    return h(p) === l;
  }, be.isFragment = function(p) {
    return h(p) === r;
  }, be.isLazy = function(p) {
    return h(p) === d;
  }, be.isMemo = function(p) {
    return h(p) === c;
  }, be.isPortal = function(p) {
    return h(p) === t;
  }, be.isProfiler = function(p) {
    return h(p) === i;
  }, be.isStrictMode = function(p) {
    return h(p) === n;
  }, be.isSuspense = function(p) {
    return h(p) === u;
  }, be.isSuspenseList = function(p) {
    return h(p) === s;
  }, be.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === i || p === n || p === u || p === s || p === f || typeof p == "object" && p !== null && (p.$$typeof === d || p.$$typeof === c || p.$$typeof === o || p.$$typeof === a || p.$$typeof === l || p.$$typeof === v || p.getModuleId !== void 0);
  }, be.typeOf = h, be;
}
var Hy;
function R2() {
  return Hy || (Hy = 1, Ns.exports = /* @__PURE__ */ L2()), Ns.exports;
}
var B2 = /* @__PURE__ */ R2(), Yy = (e) => typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "", Vy = null, Ls = null, DA = (e) => {
  if (e === Vy && Array.isArray(Ls))
    return Ls;
  var t = [];
  return Xo.forEach(e, (r) => {
    he(r) || (B2.isFragment(r) ? t = t.concat(DA(r.props.children)) : t.push(r));
  }), Ls = t, Vy = e, t;
};
function Ki(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map((i) => Yy(i)) : n = [Yy(t)], DA(e).forEach((i) => {
    var a = yt(i, "type.displayName") || yt(i, "type.name");
    a && n.indexOf(a) !== -1 && r.push(i);
  }), r;
}
var Ff = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
function Gy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gy(Object(r), !0).forEach(function(n) {
      z2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function z2(e, t, r) {
  return (t = K2(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function K2(e) {
  var t = W2(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function W2(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function MA(e, t) {
  return qy(qy({}, t), e);
}
function F2(e) {
  return /* @__PURE__ */ ie(e) ? e.props : e;
}
function U2(e, t) {
  return /* @__PURE__ */ Ae(e, MA(F2(e), t));
}
function X2(e) {
  if ("index" in e) {
    var t = e.index;
    return typeof t == "number" || typeof t == "string" ? t : void 0;
  }
}
function H2(e) {
  return "isActive" in e && e.isActive === !0;
}
function Jr(e) {
  var t = e.option, r = e.DefaultShape, n = e.shapeProps, i = e.activeClassName, a = i === void 0 ? "recharts-active-shape" : i, o = e.inActiveClassName, l = o === void 0 ? "recharts-shape" : o, u = X2(n), s;
  return /* @__PURE__ */ ie(t) ? s = U2(t, n) : t === r ? s = /* @__PURE__ */ y(r, n) : typeof t == "function" ? s = t(n, u) : typeof t == "object" ? s = /* @__PURE__ */ y(r, MA(t, n)) : s = /* @__PURE__ */ y(r, n), H2(n) ? /* @__PURE__ */ y(X, {
    className: a
  }, s) : /* @__PURE__ */ y(X, {
    className: l
  }, s);
}
var Wi = (e, t, r) => {
  var n = ee();
  return (i, a) => (o) => {
    e?.(i, a, o), n(zn({
      activeIndex: String(a),
      activeDataKey: t,
      activeCoordinate: i.tooltipPosition,
      activeGraphicalItemId: r
    }));
  };
}, Fi = (e) => {
  var t = ee();
  return (r, n) => (i) => {
    e?.(r, n, i), t(Xu());
  };
}, Ui = (e, t, r) => {
  var n = ee();
  return (i, a) => (o) => {
    e?.(i, a, o), n(ao({
      activeIndex: String(a),
      activeDataKey: t,
      activeCoordinate: i.tooltipPosition,
      activeGraphicalItemId: r
    }));
  };
};
function ar(e) {
  var t = e.tooltipEntrySettings, r = ee(), n = se(), i = H(null);
  return ke(() => {
    n || (i.current === null ? r(H$(t)) : i.current !== t && r(Y$({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [t, r, n]), ke(() => () => {
    i.current && (r(V$(i.current)), i.current = null);
  }, [r]), null;
}
function rs(e) {
  var t = e.legendPayload, r = ee(), n = se(), i = H(null);
  return ke(() => {
    n || (i.current === null ? r(N0(t)) : i.current !== t && r(L0({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [r, n, t]), ke(() => () => {
    i.current && (r(R0(i.current)), i.current = null);
  }, [r]), null;
}
function Uf(e) {
  var t = e.legendPayload, r = ee(), n = C(te), i = H(null);
  return ke(() => {
    n !== "centric" && n !== "radial" || (i.current === null ? r(N0(t)) : i.current !== t && r(L0({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [r, n, t]), ke(() => () => {
    i.current && (r(R0(i.current)), i.current = null);
  }, [r]), null;
}
function Y2(e, t) {
  return Z2(e) || q2(e, t) || G2(e, t) || V2();
}
function V2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function G2(e, t) {
  if (e) {
    if (typeof e == "string") return Zy(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Zy(e, t) : void 0;
  }
}
function Zy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function q2(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function Z2(e) {
  if (Array.isArray(e)) return e;
}
var co = "index", Xi = "append";
function k6(e) {
  return (t) => {
    if (t.payload == null || typeof t.payload != "object") return null;
    var r = G(t.payload, e);
    return r == null ? null : typeof r == "string" || typeof r == "number" ? r : JSON.stringify(r);
  };
}
function Xf(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], n = [];
  for (var i of r)
    n.push({
      status: "removed",
      prev: i
    });
  for (var a = 0; a < t.length; a++) {
    var o = e[a], l = t[a];
    o != null ? n.push({
      status: "matched",
      prev: o,
      next: l
    }) : n.push({
      status: "added",
      next: l
    });
  }
  return n;
}
function J2(e, t) {
  var r = e.length / t.length, n = t.map((i, a) => e[Math.floor(a * r)]);
  return Xf(n, t);
}
function Q2(e, t) {
  var r = t.map((n, i) => e[i]);
  return Xf(r, t);
}
function eB(e, t) {
  for (var r = /* @__PURE__ */ new Map(), n = 0; n < e.length; n++) {
    var i = e[n];
    if (i != null) {
      var a = t(i, n);
      a != null && !r.has(a) && r.set(a, i);
    }
  }
  return r;
}
function tB(e, t, r) {
  var n = eB(e, r), i = /* @__PURE__ */ new Set(), a = t.map((d, f) => {
    var v = r(d, f);
    if (v != null) {
      var h = n.get(v);
      if (h !== void 0)
        return i.add(v), h;
    }
  }), o = [];
  for (var l of n) {
    var u = Y2(l, 2), s = u[0], c = u[1];
    i.has(s) || o.push(c);
  }
  return Xf(a, t, o);
}
function Ll(e, t, r) {
  return t == null ? null : e == null ? t.map((n) => ({
    status: "added",
    next: n
  })) : r === co ? J2(e, t) : r === Xi ? Q2(e, t) : tB(e, t, r);
}
function Hf(e, t) {
  var r = H(e), n = H(t.current), i = H(!0);
  r.current !== e && (r.current = e, n.current = t.current, i.current = !1);
  var a = ue(function(o, l) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (l === 0) {
      i.current = !0;
      return;
    }
    l === 1 && (n.current = o), l > 0 && i.current && u && (t.current = o);
  }, [t]);
  return {
    startValue: n.current,
    syncStepValue: a
  };
}
function rB(e, t) {
  return oB(e) || aB(e, t) || iB(e, t) || nB();
}
function nB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function iB(e, t) {
  if (e) {
    if (typeof e == "string") return Jy(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Jy(e, t) : void 0;
  }
}
function Jy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function aB(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function oB(e) {
  if (Array.isArray(e)) return e;
}
function an(e, t) {
  var r = Ne(!1), n = rB(r, 2), i = n[0], a = n[1], o = ue(() => {
    typeof e == "function" && e(), a(!0);
  }, [e]), l = ue(() => {
    typeof t == "function" && t(), a(!1);
  }, [t]);
  return {
    isAnimating: i,
    handleAnimationStart: o,
    handleAnimationEnd: l
  };
}
function on(e) {
  var t, r = e.animationInput, n = e.animationIdPrefix, i = e.items, a = e.previousItemsRef, o = e.isAnimationActive, l = e.animationBegin, u = e.animationDuration, s = e.animationEasing, c = e.onAnimationStart, d = e.onAnimationEnd, f = e.animationInterpolateFn, v = e.animationMatchBy, h = e.shouldUpdatePreviousRef, p = e.children, m = e.layout, g = Pd(r, n), w = Hf(g, a), x = (t = w.startValue) !== null && t !== void 0 ? t : null, A = Ll(x, i, v ?? co);
  return /* @__PURE__ */ y(Ad, {
    animationId: g,
    begin: l,
    duration: u,
    isActive: o,
    easing: s,
    onAnimationEnd: d,
    onAnimationStart: c,
    key: g
  }, (P) => {
    var b = x == null, O = i == null ? i : f(A, P, m), I = h ? h(P) : P > 0;
    return w.syncStepValue(O, P, I), O == null ? null : p(O, P, b);
  });
}
var Rs;
function lB(e, t) {
  return dB(e) || cB(e, t) || sB(e, t) || uB();
}
function uB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function sB(e, t) {
  if (e) {
    if (typeof e == "string") return Qy(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Qy(e, t) : void 0;
  }
}
function Qy(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function cB(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function dB(e) {
  if (Array.isArray(e)) return e;
}
var fB = () => {
  var e = Ne(() => oi("uid-")), t = lB(e, 1), r = t[0];
  return r;
}, $A = (Rs = Kg.useId) !== null && Rs !== void 0 ? Rs : fB;
function _A(e, t) {
  var r = $A();
  return t || (e ? "".concat(e, "-").concat(r) : r);
}
var NA = /* @__PURE__ */ We(void 0), or = (e) => {
  var t = e.id, r = e.type, n = e.children, i = _A("recharts-".concat(r), t);
  return /* @__PURE__ */ y(NA.Provider, {
    value: i
  }, n(i));
};
function vB() {
  return Ze(NA);
}
var hB = {
  cartesianItems: [],
  polarItems: []
}, LA = ht({
  name: "graphicalItems",
  initialState: hB,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(e, t) {
        e.cartesianItems.push(ye(t.payload));
      },
      prepare: Ee()
    },
    replaceCartesianGraphicalItem: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = zt(e).cartesianItems.indexOf(ye(n));
        a > -1 && (e.cartesianItems[a] = ye(i));
      },
      prepare: Ee()
    },
    removeCartesianGraphicalItem: {
      reducer(e, t) {
        var r = zt(e).cartesianItems.indexOf(ye(t.payload));
        r > -1 && e.cartesianItems.splice(r, 1);
      },
      prepare: Ee()
    },
    addPolarGraphicalItem: {
      reducer(e, t) {
        e.polarItems.push(ye(t.payload));
      },
      prepare: Ee()
    },
    removePolarGraphicalItem: {
      reducer(e, t) {
        var r = zt(e).polarItems.indexOf(ye(t.payload));
        r > -1 && e.polarItems.splice(r, 1);
      },
      prepare: Ee()
    },
    replacePolarGraphicalItem: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = zt(e).polarItems.indexOf(ye(n));
        a > -1 && (e.polarItems[a] = ye(i));
      },
      prepare: Ee()
    }
  }
}), Hi = LA.actions, pB = Hi.addCartesianGraphicalItem, yB = Hi.replaceCartesianGraphicalItem, mB = Hi.removeCartesianGraphicalItem, gB = Hi.addPolarGraphicalItem, bB = Hi.removePolarGraphicalItem, xB = Hi.replacePolarGraphicalItem, wB = LA.reducer, AB = (e) => {
  var t = ee(), r = H(null);
  return ke(() => {
    r.current === null ? t(pB(e)) : r.current !== e && t(yB({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), ke(() => () => {
    r.current && (t(mB(r.current)), r.current = null);
  }, [t]), null;
}, ns = /* @__PURE__ */ De(AB), PB = (e) => {
  var t = ee(), r = H(null);
  return ke(() => {
    r.current === null ? t(gB(e)) : r.current !== e && t(xB({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), ke(() => () => {
    r.current && (t(bB(r.current)), r.current = null);
  }, [t]), null;
}, Yf = /* @__PURE__ */ De(PB), OB = ["key"], SB = ["onMouseEnter", "onClick", "onMouseLeave"], IB = ["id"], kB = ["id"];
function Tn() {
  return Tn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Tn.apply(null, arguments);
}
function is(e, t) {
  if (e == null) return {};
  var r, n, i = jB(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function jB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function em(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? em(Object(r), !0).forEach(function(n) {
      TB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : em(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function TB(e, t, r) {
  return (t = EB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function EB(e) {
  var t = CB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function CB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var RA = Iu;
function DB(e) {
  var t = xe(() => Ki(e.children, Wn), [e.children]), r = C((n) => _2(n, e.id, t));
  return r == null ? null : /* @__PURE__ */ y(Uf, {
    legendPayload: r
  });
}
function MB(e) {
  if (!(e == null || typeof e == "boolean" || typeof e == "function")) {
    if (/* @__PURE__ */ ie(e)) {
      var t, r = (t = e.props) === null || t === void 0 ? void 0 : t.fill;
      return typeof r == "string" ? r : void 0;
    }
    var n = e.fill;
    return typeof n == "string" ? n : void 0;
  }
}
var $B = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.nameKey, n = e.sectors, i = e.stroke, a = e.strokeWidth, o = e.fill, l = e.name, u = e.hide, s = e.tooltipType, c = e.formatter, d = e.id, f = e.activeShape, v = MB(f), h = n.map((m) => {
    var g = m.tooltipPayload;
    return v == null || g == null ? g : g.map((w) => Me(Me({}, w), {}, {
      color: v,
      fill: v
    }));
  }), p = {
    dataDefinedOnItem: h,
    getPosition: (m) => {
      var g;
      return (g = n[Number(m)]) === null || g === void 0 ? void 0 : g.tooltipPosition;
    },
    settings: {
      stroke: i,
      strokeWidth: a,
      fill: o,
      dataKey: t,
      nameKey: r,
      name: Mt(l, t),
      hide: u,
      type: s,
      color: o,
      unit: "",
      // why doesn't Pie support unit?
      formatter: c,
      graphicalItemId: d
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: p
  });
}), _B = (e, t) => e > t ? "start" : e < t ? "end" : "middle", NB = (e, t, r) => lt(typeof t == "function" ? t(e) : t, r, r * 0.8), LB = (e, t, r) => {
  var n = t.top, i = t.left, a = t.width, o = t.height, l = H0(a, o), u = i + lt(e.cx, a, a / 2), s = n + lt(e.cy, o, o / 2), c = lt(e.innerRadius, l, 0), d = NB(r, e.outerRadius, l), f = e.maxRadius || Math.sqrt(a * a + o * o) / 2;
  return {
    cx: u,
    cy: s,
    innerRadius: c,
    outerRadius: d,
    maxRadius: f
  };
}, RB = (e, t) => {
  var r = Ue(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, BB = (e, t) => {
  if (/* @__PURE__ */ ie(e))
    return /* @__PURE__ */ Ae(e, t);
  if (typeof e == "function")
    return e(t);
  var r = J("recharts-pie-label-line", typeof e != "boolean" ? e.className : "");
  t.key;
  var n = is(t, OB);
  return /* @__PURE__ */ y(xn, Tn({}, n, {
    type: "linear",
    className: r
  }));
}, zB = (e, t, r) => {
  if (/* @__PURE__ */ ie(e))
    return /* @__PURE__ */ Ae(e, t);
  var n = r;
  if (typeof e == "function" && (n = e(t), /* @__PURE__ */ ie(n)))
    return n;
  var i = J("recharts-pie-label-text", ts(e));
  return /* @__PURE__ */ y(Lr, Tn({}, t, {
    alignmentBaseline: "middle",
    className: i
  }), n);
};
function KB(e) {
  var t = e.sectors, r = e.props, n = e.showLabels, i = r.label, a = r.labelLine, o = r.dataKey;
  if (!n || !i || !t)
    return null;
  var l = oe(r), u = Tt(i), s = Tt(a), c = typeof i == "object" && "offsetRadius" in i && typeof i.offsetRadius == "number" && i.offsetRadius || 20, d = t.map((f, v) => {
    var h = (f.startAngle + f.endAngle) / 2, p = pe(f.cx, f.cy, f.outerRadius + c, h), m = Me(Me(Me(Me({}, l), f), {}, {
      // @ts-expect-error customLabelProps is contributing unknown props
      stroke: "none"
    }, u), {}, {
      index: v,
      textAnchor: _B(p.x, f.cx)
    }, p), g = Me(Me(Me(Me({}, l), f), {}, {
      // @ts-expect-error customLabelLineProps is contributing unknown props
      fill: "none",
      // @ts-expect-error customLabelLineProps is contributing unknown props
      stroke: f.fill
    }, s), {}, {
      index: v,
      points: [pe(f.cx, f.cy, f.outerRadius, h), p],
      key: "line"
    });
    return /* @__PURE__ */ y(we, {
      zIndex: fe.label,
      key: "label-".concat(f.startAngle, "-").concat(f.endAngle, "-").concat(f.midAngle, "-").concat(v)
    }, /* @__PURE__ */ y(X, null, a && BB(a, g), zB(i, m, G(f, o))));
  });
  return /* @__PURE__ */ y(X, {
    className: "recharts-pie-labels"
  }, d);
}
function WB(e) {
  var t = e.sectors, r = e.props, n = e.showLabels, i = r.label;
  return typeof i == "object" && i != null && "position" in i ? /* @__PURE__ */ y(rn, {
    label: i
  }) : /* @__PURE__ */ y(KB, {
    sectors: t,
    props: r,
    showLabels: n
  });
}
function FB(e) {
  var t = e.sectors, r = e.activeShape, n = e.inactiveShape, i = e.allOtherPieProps, a = e.shape, o = e.id, l = e.animationElapsedTime, u = e.isAnimating, s = e.isEntrance, c = C(yr), d = C(Cf), f = C(Vw), v = i.onMouseEnter, h = i.onClick, p = i.onMouseLeave, m = is(i, SB), g = Wi(v, i.dataKey, o), w = Fi(p), x = Ui(h, i.dataKey, o);
  return t == null || t.length === 0 ? null : /* @__PURE__ */ y(le, null, t.map((A, P) => {
    if (A?.startAngle === 0 && A?.endAngle === 0 && t.length !== 1) return null;
    var b = f == null || f === o, O = String(P) === c && (d == null || i.dataKey === d) && b, I = c ? n : null, E = r && O ? r : I, j = Me(Me({}, A), {}, {
      stroke: A.stroke,
      tabIndex: -1,
      index: P,
      isActive: O,
      animationElapsedTime: l,
      isAnimating: u,
      isEntrance: s,
      [j0]: P,
      [pd]: o
    });
    return /* @__PURE__ */ y(X, Tn({
      key: "sector-".concat(A?.startAngle, "-").concat(A?.endAngle, "-").concat(A.midAngle, "-").concat(P),
      tabIndex: -1,
      className: "recharts-pie-sector"
    }, ir(m, A, P), {
      onMouseEnter: g(A, P),
      onMouseLeave: w(A, P),
      onClick: x(A, P)
    }), /* @__PURE__ */ y(Jr, {
      option: E ?? a,
      DefaultShape: RA,
      shapeProps: j
    }));
  }));
}
function UB(e) {
  var t, r = e.pieSettings, n = e.displayedData, i = e.cells, a = e.offset, o = r.cornerRadius, l = r.startAngle, u = r.endAngle, s = r.dataKey, c = r.nameKey, d = r.tooltipType, f = Math.abs(r.minAngle), v = RB(l, u), h = Math.abs(v), p = n.length <= 1 ? 0 : (t = r.paddingAngle) !== null && t !== void 0 ? t : 0, m = n.filter((I) => G(I, s, 0) !== 0).length, g = (h >= 360 ? m : m - 1) * p, w = n.reduce((I, E) => {
    var j = G(E, s, 0);
    return I + (L(j) ? j : 0);
  }, 0), x = f > 0 && w > 0 && n.some((I) => {
    var E = G(I, s, 0), j = (L(E) ? E : 0) / w;
    return E !== 0 && j * h < f;
  }), A = x ? f : 0, P = h - m * A - g, b;
  if (w > 0) {
    var O;
    b = n.map((I, E) => {
      var j = G(I, s, 0), T = G(I, c, E), k = LB(r, a, I), _ = (L(j) ? j : 0) / w, $, M = Me(Me({}, I), i && i[E] && i[E].props), R = M != null && "fill" in M && typeof M.fill == "string" ? M.fill : r.fill;
      E ? $ = O.endAngle + Ue(v) * p * (j !== 0 ? 1 : 0) : $ = l;
      var K = $ + Ue(v) * ((j !== 0 ? A : 0) + _ * P), N = ($ + K) / 2, z = (k.innerRadius + k.outerRadius) / 2, W = [{
        name: T,
        value: j,
        payload: M,
        dataKey: s,
        type: d,
        color: R,
        fill: R,
        graphicalItemId: r.id
      }], Z = pe(k.cx, k.cy, z, N);
      return O = Me(Me(Me(Me({}, r.presentationProps), {}, {
        percent: _,
        cornerRadius: typeof o == "string" ? parseFloat(o) : o,
        name: T,
        tooltipPayload: W,
        midAngle: N,
        middleRadius: z,
        tooltipPosition: Z
      }, M), k), {}, {
        value: j,
        dataKey: s,
        startAngle: $,
        endAngle: K,
        payload: M,
        paddingAngle: j !== 0 ? Ue(v) * p : 0
      }), O;
    });
  }
  return b;
}
function XB(e) {
  var t = e.showLabels, r = e.sectors, n = e.children, i = xe(() => !t || !r ? [] : r.map((a) => ({
    value: a.value,
    payload: a.payload,
    clockWise: !1,
    parentViewBox: void 0,
    viewBox: {
      cx: a.cx,
      cy: a.cy,
      innerRadius: a.innerRadius,
      outerRadius: a.outerRadius,
      startAngle: a.startAngle,
      endAngle: a.endAngle,
      clockWise: !1
    },
    fill: a.fill
  })), [r, t]);
  return /* @__PURE__ */ y(PA, {
    value: t ? i : void 0
  }, n);
}
var HB = (e, t) => {
  if (e == null) return [];
  var r = [], n = e.find((a) => a.status !== "removed"), i = n ? n.next.startAngle : 0;
  return e.forEach((a, o) => {
    if (a.status !== "removed") {
      var l = o > 0 ? yt(a.next, "paddingAngle", 0) : 0;
      if (a.status === "matched") {
        var u = V(a.prev.endAngle - a.prev.startAngle, a.next.endAngle - a.next.startAngle, t), s = Me(Me({}, a.next), {}, {
          startAngle: i + l,
          endAngle: i + u + l
        });
        r.push(s), i = s.endAngle;
      } else {
        var c = V(0, a.next.endAngle - a.next.startAngle, t), d = Me(Me({}, a.next), {}, {
          startAngle: i + l,
          endAngle: i + c + l
        });
        r.push(d), i = d.endAngle;
      }
    }
  }), r;
};
function YB(e) {
  var t, r, n, i, a = e.props, o = e.previousSectorsRef, l = e.id, u = a.sectors, s = a.activeShape, c = a.inactiveShape, d = a.animationInterpolateFn, f = an(a.onAnimationStart, a.onAnimationEnd), v = f.isAnimating, h = f.handleAnimationStart, p = f.handleAnimationEnd, m = Xa();
  if (m == null) return null;
  var g = u[0];
  return /* @__PURE__ */ y(XB, {
    showLabels: !v,
    sectors: u
  }, /* @__PURE__ */ y(on, {
    animationInput: a,
    animationIdPrefix: "recharts-pie-",
    items: u,
    previousItemsRef: o,
    isAnimationActive: a.isAnimationActive,
    animationBegin: a.animationBegin,
    animationDuration: a.animationDuration,
    animationEasing: a.animationEasing,
    onAnimationStart: h,
    onAnimationEnd: p,
    animationInterpolateFn: d,
    animationMatchBy: a.animationMatchBy,
    layout: m
  }, (w, x, A) => /* @__PURE__ */ y(X, null, /* @__PURE__ */ y(FB, {
    sectors: w,
    activeShape: s,
    inactiveShape: c,
    allOtherPieProps: a,
    shape: a.shape,
    id: l,
    animationElapsedTime: x,
    isAnimating: v || x < 1,
    isEntrance: A
  }))), /* @__PURE__ */ y(WB, {
    showLabels: !v,
    sectors: u,
    props: a
  }), /* @__PURE__ */ y(gA, {
    cx: (t = g?.cx) !== null && t !== void 0 ? t : 0,
    cy: (r = g?.cy) !== null && r !== void 0 ? r : 0,
    innerRadius: (n = g?.innerRadius) !== null && n !== void 0 ? n : 0,
    outerRadius: (i = g?.outerRadius) !== null && i !== void 0 ? i : 0,
    startAngle: a.startAngle,
    endAngle: a.endAngle,
    clockWise: !1
  }, a.children));
}
var VB = {
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: HB,
  animationMatchBy: Xi,
  cx: "50%",
  cy: "50%",
  dataKey: "value",
  endAngle: 360,
  fill: "#808080",
  hide: !1,
  innerRadius: 0,
  isAnimationActive: "auto",
  label: !1,
  labelLine: !0,
  legendType: "rect",
  minAngle: 0,
  nameKey: "name",
  outerRadius: "80%",
  paddingAngle: 0,
  rootTabIndex: 0,
  shape: RA,
  startAngle: 0,
  stroke: "#fff",
  zIndex: fe.area
};
function GB(e) {
  var t = e.id, r = is(e, IB), n = e.hide, i = e.className, a = e.rootTabIndex, o = xe(() => Ki(e.children, Wn), [e.children]), l = C((c) => N2(c, t, o)), u = H(null), s = J("recharts-pie", i);
  return n || l == null ? (u.current = null, /* @__PURE__ */ y(X, {
    tabIndex: a,
    className: s
  })) : /* @__PURE__ */ y(we, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ y($B, {
    dataKey: e.dataKey,
    nameKey: e.nameKey,
    sectors: l,
    stroke: e.stroke,
    strokeWidth: e.strokeWidth,
    fill: e.fill,
    name: e.name,
    hide: e.hide,
    tooltipType: e.tooltipType,
    formatter: e.formatter,
    id: t,
    activeShape: e.activeShape
  }), /* @__PURE__ */ y(X, {
    tabIndex: a,
    className: s
  }, /* @__PURE__ */ y(YB, {
    props: Me(Me({}, r), {}, {
      sectors: l
    }),
    previousSectorsRef: u,
    id: t
  })));
}
function qB(e) {
  var t = re(e, VB), r = t.id, n = is(t, kB), i = oe(n);
  return /* @__PURE__ */ y(or, {
    id: r,
    type: "pie"
  }, (a) => /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Yf, {
    type: "pie",
    id: a,
    data: n.data,
    dataKey: n.dataKey,
    hide: n.hide,
    angleAxisId: 0,
    radiusAxisId: 0,
    name: n.name,
    nameKey: n.nameKey,
    tooltipType: n.tooltipType,
    legendType: n.legendType,
    fill: n.fill,
    cx: n.cx,
    cy: n.cy,
    startAngle: n.startAngle,
    endAngle: n.endAngle,
    paddingAngle: n.paddingAngle,
    minAngle: n.minAngle,
    innerRadius: n.innerRadius,
    outerRadius: n.outerRadius,
    cornerRadius: n.cornerRadius,
    presentationProps: i,
    maxRadius: t.maxRadius
  }), /* @__PURE__ */ y(DB, Tn({}, n, {
    id: a
  })), /* @__PURE__ */ y(GB, Tn({}, n, {
    id: a
  }))));
}
var ZB = qB;
ZB.displayName = "Pie";
function JB(e) {
  return e[e.length - 1];
}
function QB(e) {
  if (!(!Oi(e) || e.length === 0))
    return JB(Bf(e));
}
var ez = ["points"];
function tm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Bs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tm(Object(r), !0).forEach(function(n) {
      tz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tz(e, t, r) {
  return (t = rz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rz(e) {
  var t = nz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Rl() {
  return Rl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Rl.apply(null, arguments);
}
function iz(e, t) {
  if (e == null) return {};
  var r, n, i = az(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function az(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function oz(e) {
  var t = e.option, r = e.dotProps, n = e.className;
  if (/* @__PURE__ */ ie(t))
    return /* @__PURE__ */ Ae(t, r);
  if (typeof t == "function")
    return t(r);
  var i = J(n, typeof t != "boolean" ? t.className : ""), a = r ?? {};
  a.points;
  var o = iz(a, ez);
  return /* @__PURE__ */ y(Zu, Rl({}, o, {
    className: i
  }));
}
function lz(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function Vf(e) {
  var t = e.points, r = e.dot, n = e.className, i = e.dotClassName, a = e.dataKey, o = e.baseProps, l = e.needClip, u = e.clipPathId, s = e.zIndex, c = s === void 0 ? fe.scatter : s;
  if (!lz(t, r))
    return null;
  var d = Ff(r), f = zO(r), v = t.map((p, m) => {
    var g, w, x = Bs(Bs(Bs({
      r: 3
    }, o), f), {}, {
      index: m,
      cx: (g = p.x) !== null && g !== void 0 ? g : void 0,
      cy: (w = p.y) !== null && w !== void 0 ? w : void 0,
      dataKey: a,
      value: p.value,
      payload: p.payload,
      points: t
    });
    return /* @__PURE__ */ y(oz, {
      key: "dot-".concat(m),
      option: r,
      dotProps: x,
      className: i
    });
  }), h = {};
  return l && u != null && (h.clipPath = "url(#clipPath-".concat(d ? "" : "dots-").concat(u, ")")), /* @__PURE__ */ y(we, {
    zIndex: c
  }, /* @__PURE__ */ y(X, Rl({
    className: n
  }, h), v));
}
function rm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Eo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rm(Object(r), !0).forEach(function(n) {
      uz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uz(e, t, r) {
  return (t = sz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sz(e) {
  var t = cz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function cz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vt = 0, dz = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
}, BA = ht({
  name: "cartesianAxis",
  initialState: dz,
  reducers: {
    addXAxis: {
      reducer(e, t) {
        e.xAxis[t.payload.id] = ye(t.payload);
      },
      prepare: Ee()
    },
    replaceXAxis: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next;
        e.xAxis[n.id] !== void 0 && (n.id !== i.id && delete e.xAxis[n.id], e.xAxis[i.id] = ye(i));
      },
      prepare: Ee()
    },
    removeXAxis: {
      reducer(e, t) {
        delete e.xAxis[t.payload.id];
      },
      prepare: Ee()
    },
    addYAxis: {
      reducer(e, t) {
        e.yAxis[t.payload.id] = ye(t.payload);
      },
      prepare: Ee()
    },
    replaceYAxis: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next;
        e.yAxis[n.id] !== void 0 && (n.id !== i.id && delete e.yAxis[n.id], e.yAxis[i.id] = ye(i));
      },
      prepare: Ee()
    },
    removeYAxis: {
      reducer(e, t) {
        delete e.yAxis[t.payload.id];
      },
      prepare: Ee()
    },
    addZAxis: {
      reducer(e, t) {
        e.zAxis[t.payload.id] = ye(t.payload);
      },
      prepare: Ee()
    },
    replaceZAxis: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next;
        e.zAxis[n.id] !== void 0 && (n.id !== i.id && delete e.zAxis[n.id], e.zAxis[i.id] = ye(i));
      },
      prepare: Ee()
    },
    removeZAxis: {
      reducer(e, t) {
        delete e.zAxis[t.payload.id];
      },
      prepare: Ee()
    },
    updateYAxisWidth(e, t) {
      var r = t.payload, n = r.id, i = r.width, a = e.yAxis[n];
      if (a) {
        var o, l = a.widthHistory || [];
        if (l.length === 3 && l[0] === l[2] && i === l[1] && i !== a.width && Math.abs(i - ((o = l[0]) !== null && o !== void 0 ? o : 0)) <= 1)
          return;
        var u = [...l, i].slice(-3);
        e.yAxis[n] = Eo(Eo({}, a), {}, {
          width: i,
          widthHistory: u
        });
      }
    },
    updateXAxisHeight(e, t) {
      var r = t.payload, n = r.id, i = r.height, a = e.xAxis[n];
      if (a) {
        var o, l = a.heightHistory || [];
        if (l.length === 3 && l[0] === l[2] && i === l[1] && i !== a.height && Math.abs(i - ((o = l[0]) !== null && o !== void 0 ? o : 0)) <= 1)
          return;
        var u = [...l, i].slice(-3);
        e.xAxis[n] = Eo(Eo({}, a), {}, {
          height: i,
          heightHistory: u
        });
      }
    }
  }
}), lr = BA.actions, fz = lr.addXAxis, vz = lr.replaceXAxis, hz = lr.removeXAxis, pz = lr.addYAxis, yz = lr.replaceYAxis, mz = lr.removeYAxis, gz = lr.addZAxis, bz = lr.replaceZAxis, xz = lr.removeZAxis, wz = lr.updateYAxisWidth, Az = lr.updateXAxisHeight, Pz = BA.reducer, zA = S([He], (e) => ({
  top: e.top,
  bottom: e.bottom,
  left: e.left,
  right: e.right
})), Oz = S([zA, mr, gr], (e, t, r) => {
  if (!(!e || t == null || r == null))
    return {
      x: e.left,
      y: e.top,
      width: Math.max(0, t - e.left - e.right),
      height: Math.max(0, r - e.top - e.bottom)
    };
}), Sz = (e) => {
  var t = se();
  return C((r) => St(r, "xAxis", e, t));
}, Iz = (e) => {
  var t = se();
  return C((r) => St(r, "yAxis", e, t));
}, kz = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se(), n = C((i) => Ut(i, "xAxis", t, r));
  return n?.map;
}, jz = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se(), n = C((i) => Ut(i, "yAxis", t, r));
  return n?.map;
}, j6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se();
  return C((n) => gw(n, "xAxis", t, r));
}, T6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se();
  return C((n) => bw(n, "xAxis", t, r));
}, E6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt;
  return C((r) => jw(r, "xAxis", t));
}, C6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se();
  return C((n) => gw(n, "yAxis", t, r));
}, D6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se();
  return C((n) => bw(n, "yAxis", t, r));
}, M6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt;
  return C((r) => jw(r, "yAxis", t));
}, $6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt;
  return C((r) => Sf(r, "xAxis", t));
}, _6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt;
  return C((r) => Sf(r, "yAxis", t));
}, N6 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : vt, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : vt, i = kz(r), a = jz(n);
  if (!(i == null || a == null)) {
    var o = i(t.x), l = a(t.y);
    if (!(o == null || l == null))
      return {
        x: o,
        y: l
      };
  }
}, L6 = () => C(Ef), R6 = () => C(zA), fo = () => C(Oz), Tz = () => C(K_), B6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se();
  return C((n) => to(n, "xAxis", t, r));
}, z6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt, r = se();
  return C((n) => to(n, "yAxis", t, r));
}, K6 = () => {
  var e;
  return (e = C(Zw)) !== null && e !== void 0 ? e : !1;
}, W6 = () => {
  var e = C(qw);
  if (e != null)
    return {
      x: e.x,
      y: e.y
    };
};
function nm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nm(Object(r), !0).forEach(function(n) {
      Ez(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ez(e, t, r) {
  return (t = Cz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Cz(e) {
  var t = Dz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Dz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Mz = (e) => {
  var t = e.point, r = e.childIndex, n = e.mainColor, i = e.activeDot, a = e.dataKey, o = e.clipPath;
  if (i === !1 || t.x == null || t.y == null)
    return null;
  var l = {
    index: r,
    dataKey: a,
    cx: t.x,
    cy: t.y,
    r: 4,
    fill: n ?? "none",
    strokeWidth: 2,
    stroke: "#fff",
    payload: t.payload,
    value: t.value
  }, u = zs(zs(zs({}, l), Tt(i)), rd(i)), s;
  return /* @__PURE__ */ ie(i) ? s = /* @__PURE__ */ Ae(i, u) : typeof i == "function" ? s = i(u) : s = /* @__PURE__ */ y(Zu, u), /* @__PURE__ */ y(X, {
    className: "recharts-active-dot",
    clipPath: o
  }, s);
};
function Bl(e) {
  var t = e.points, r = e.mainColor, n = e.activeDot, i = e.itemDataKey, a = e.clipPath, o = e.zIndex, l = o === void 0 ? fe.activeDot : o, u = C(yr), s = Tz();
  if (t == null || s == null)
    return null;
  var c = t.find((d) => s.includes(d.payload));
  return he(c) ? null : /* @__PURE__ */ y(we, {
    zIndex: l
  }, /* @__PURE__ */ y(Mz, {
    point: c,
    childIndex: Number(u),
    mainColor: r,
    dataKey: i,
    activeDot: n,
    clipPath: a
  }));
}
function im(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? im(Object(r), !0).forEach(function(n) {
      $z(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : im(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $z(e, t, r) {
  return (t = _z(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _z(e) {
  var t = Nz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Nz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var KA = (e, t) => nn(e, "radiusAxis", t), Lz = S([KA], (e) => {
  if (e != null)
    return {
      scale: e
    };
}), Rz = S([$i, KA], (e, t) => {
  if (!(e == null || t == null))
    return zl(zl({}, e), {}, {
      scale: t
    });
}), Bz = (e, t, r, n) => Fn(e, "radiusAxis", t, n), WA = (e, t, r) => $n(e, r), FA = (e, t, r) => nn(e, "angleAxis", r), zz = S([WA, FA], (e, t) => {
  if (!(e == null || t == null))
    return zl(zl({}, e), {}, {
      scale: t
    });
}), Kz = (e, t, r, n) => Fn(e, "angleAxis", r, n), Wz = S([WA, FA, _n], (e, t, r) => {
  if (!(r == null || t == null))
    return {
      scale: t,
      type: e.type,
      dataKey: e.dataKey,
      cx: r.cx,
      cy: r.cy
    };
}), Fz = (e, t, r, n, i) => i, Uz = S([te, Rz, Bz, zz, Kz], (e, t, r, n, i) => Dt(e, "radiusAxis") ? Ot(t, r, !1) : Ot(n, i, !1)), Xz = S([uo, Fz], (e, t) => {
  if (e != null) {
    var r = e.find((n) => n.type === "radar" && t === n.id);
    return r?.dataKey;
  }
}), Hz = S([Lz, Wz, zr, Xz, Uz], (e, t, r, n, i) => {
  var a = r.chartData, o = r.dataStartIndex, l = r.dataEndIndex;
  if (!(e == null || t == null || a == null || i == null || n == null)) {
    var u = a.slice(o, l + 1);
    return rK({
      radiusAxis: e,
      angleAxis: t,
      displayedData: u,
      dataKey: n,
      bandSize: i
    });
  }
}), Yz = ["id"];
function Ea() {
  return Ea = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ea.apply(null, arguments);
}
function am(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? am(Object(r), !0).forEach(function(n) {
      Vz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : am(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Vz(e, t, r) {
  return (t = Gz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Gz(e) {
  var t = qz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function qz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Zz(e, t) {
  if (e == null) return {};
  var r, n, i = Jz(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Jz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Gf(e, t) {
  return e && e !== "none" ? e : t;
}
var Qz = (e) => {
  var t = e.dataKey, r = e.name, n = e.stroke, i = e.fill, a = e.legendType, o = e.hide;
  return [{
    inactive: o,
    dataKey: t,
    type: a,
    color: Gf(n, i),
    value: Mt(r, t),
    payload: e
  }];
}, eK = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.stroke, n = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, l = e.tooltipType, u = e.id, s = {
    /*
     * I suppose this here _could_ return props.points
     * because while Radar does not support item tooltip mode, it _could_ support it.
     * But when I actually do return the points here, a defaultIndex test starts failing.
     * So, undefined it is.
     */
    dataDefinedOnItem: void 0,
    getPosition: mt,
    settings: {
      stroke: r,
      strokeWidth: n,
      fill: i,
      nameKey: void 0,
      // RadarChart does not have nameKey unfortunately
      dataKey: t,
      name: Mt(a, t),
      hide: o,
      type: l,
      color: Gf(r, i),
      unit: "",
      // why doesn't Radar support unit?
      graphicalItemId: u
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: s
  });
});
function tK(e) {
  var t = e.points, r = e.props, n = r.dot, i = r.dataKey;
  r.id;
  var a = Zz(r, Yz), o = oe(a);
  return /* @__PURE__ */ y(Vf, {
    points: t,
    dot: n,
    className: "recharts-radar-dots",
    dotClassName: "recharts-radar-dot",
    dataKey: i,
    baseProps: o
  });
}
function rK(e) {
  var t = e.radiusAxis, r = e.angleAxis, n = e.displayedData, i = e.dataKey, a = e.bandSize, o = r.cx, l = r.cy, u = !1, s = [], c = r.type !== "number" ? a ?? 0 : 0;
  n.forEach((f, v) => {
    var h, p, m = G(f, r.dataKey, v), g = G(f, i), w = ((h = r.scale.map(m)) !== null && h !== void 0 ? h : 0) + c, x = Array.isArray(g) ? QB(g) : g, A = he(x) ? 0 : (p = t.scale.map(x)) !== null && p !== void 0 ? p : 0;
    Array.isArray(g) && g.length >= 2 && (u = !0), s.push(xt(xt({}, pe(o, l, A, w)), {}, {
      // getValueByDataKey does not validate the output type
      name: m,
      // getValueByDataKey does not validate the output type
      value: g,
      cx: o,
      cy: l,
      radius: A,
      angle: w,
      payload: f
    }));
  });
  var d = [];
  return u && s.forEach((f) => {
    if (Array.isArray(f.value)) {
      var v, h = f.value[0], p = he(h) ? 0 : (v = t.scale.map(h)) !== null && v !== void 0 ? v : 0;
      d.push(xt(xt({}, f), {}, {
        radius: p
      }, pe(o, l, p, f.angle)));
    } else
      d.push(f);
  }), {
    points: s,
    isRange: u,
    baseLinePoints: d
  };
}
function nK(e) {
  var t = e.showLabels, r = e.points, n = e.children, i = r.map((a) => {
    var o, l = {
      x: a.x,
      y: a.y,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return xt(xt({}, l), {}, {
      value: (o = a.value) !== null && o !== void 0 ? o : "",
      payload: a.payload,
      parentViewBox: void 0,
      viewBox: l,
      fill: void 0
    });
  });
  return /* @__PURE__ */ y(zi, {
    value: t ? i : void 0
  }, n);
}
function iK(e) {
  var t = e.points, r = e.baseLinePoints, n = e.props;
  if (t == null)
    return null;
  var i = n.shape, a = n.isRange, o = n.connectNulls, l = (c) => {
    var d = n.onMouseEnter;
    d && d(n, c);
  }, u = (c) => {
    var d = n.onMouseLeave;
    d && d(n, c);
  }, s;
  return /* @__PURE__ */ ie(i) ? s = /* @__PURE__ */ Ae(i, xt(xt({}, n), {}, {
    points: t
  })) : typeof i == "function" ? s = i(xt(xt({}, n), {}, {
    points: t
  })) : s = /* @__PURE__ */ y(Nf, Ea({}, $e(n), {
    onMouseEnter: l,
    onMouseLeave: u,
    points: t,
    baseLinePoints: a ? r : void 0,
    connectNulls: o
  })), /* @__PURE__ */ y(X, {
    className: "recharts-radar-polygon"
  }, s, /* @__PURE__ */ y(tK, {
    props: n,
    points: t
  }));
}
var aK = (e, t) => e == null ? [] : t === 1 ? e.flatMap((r) => r.status === "removed" ? [] : [r.next]) : e.flatMap((r) => r.status === "removed" ? [] : r.status === "matched" ? [xt(xt({}, r.next), {}, {
  x: V(r.prev.x, r.next.x, t),
  y: V(r.prev.y, r.next.y, t)
})] : [xt(xt({}, r.next), {}, {
  x: V(r.next.cx, r.next.x, t),
  y: V(r.next.cy, r.next.y, t)
})]);
function oK(e) {
  var t = e.props, r = e.previousPointsRef, n = e.previousBaseLinePointsRef, i = t.points, a = t.baseLinePoints, o = t.isAnimationActive, l = t.animationBegin, u = t.animationDuration, s = t.animationEasing, c = t.animationMatchBy, d = t.animationInterpolateFn, f = t.onAnimationStart, v = t.onAnimationEnd, h = Hf(t, n), p = h.startValue, m = Ll(p ?? null, a, c), g = an(f, v), w = g.isAnimating, x = g.handleAnimationStart, A = g.handleAnimationEnd, P = Xa();
  return P == null ? null : /* @__PURE__ */ y(nK, {
    showLabels: !w,
    points: i
  }, /* @__PURE__ */ y(on, {
    animationInput: t,
    animationIdPrefix: "recharts-radar-",
    items: i,
    previousItemsRef: r,
    isAnimationActive: o,
    animationBegin: l,
    animationDuration: u,
    animationEasing: s,
    onAnimationStart: x,
    onAnimationEnd: A,
    animationInterpolateFn: d,
    animationMatchBy: c,
    layout: P
  }, (b, O) => {
    var I = O === 1 ? a : d(m, O, P);
    return h.syncStepValue(I, O), /* @__PURE__ */ y(iK, {
      points: b,
      baseLinePoints: I,
      props: t
    });
  }), /* @__PURE__ */ y(rn, {
    label: t.label
  }), t.children);
}
function lK(e) {
  var t = H(void 0), r = H(void 0);
  return /* @__PURE__ */ y(oK, {
    props: e,
    previousPointsRef: t,
    previousBaseLinePointsRef: r
  });
}
var uK = {
  activeDot: !0,
  angleAxisId: 0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationMatchBy: co,
  animationInterpolateFn: aK,
  dot: !1,
  hide: !1,
  isAnimationActive: "auto",
  label: !1,
  legendType: "rect",
  radiusAxisId: 0,
  zIndex: fe.area
};
function sK(e) {
  var t = e.hide, r = e.className, n = e.points;
  if (t)
    return null;
  var i = J("recharts-radar", r);
  return /* @__PURE__ */ y(we, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ y(X, {
    className: i
  }, /* @__PURE__ */ y(lK, e)), /* @__PURE__ */ y(Bl, {
    points: n,
    mainColor: Gf(e.stroke, e.fill),
    itemDataKey: e.dataKey,
    activeDot: e.activeDot
  }));
}
function cK(e) {
  var t = se(), r = C((n) => Hz(n, e.radiusAxisId, e.angleAxisId, t, e.id));
  return r?.points == null ? null : /* @__PURE__ */ y(sK, Ea({}, e, {
    points: r?.points,
    baseLinePoints: r?.baseLinePoints,
    isRange: r?.isRange
  }));
}
function dK(e) {
  var t = re(e, uK);
  return /* @__PURE__ */ y(or, {
    id: t.id,
    type: "radar"
  }, (r) => /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Yf, {
    type: "radar",
    id: r,
    data: void 0,
    dataKey: t.dataKey,
    hide: t.hide,
    angleAxisId: t.angleAxisId,
    radiusAxisId: t.radiusAxisId
  }), /* @__PURE__ */ y(Uf, {
    legendPayload: Qz(t)
  }), /* @__PURE__ */ y(eK, {
    dataKey: t.dataKey,
    stroke: t.stroke,
    strokeWidth: t.strokeWidth,
    fill: t.fill,
    name: t.name,
    hide: t.hide,
    tooltipType: t.tooltipType,
    id: r
  }), /* @__PURE__ */ y(cK, Ea({}, t, {
    id: r
  }))));
}
dK.displayName = "Radar";
var fK = ["option"];
function vK(e, t) {
  if (e == null) return {};
  var r, n, i = hK(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function hK(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var UA = Iu;
function XA(e) {
  return typeof e == "string" ? parseInt(e, 10) : e;
}
function Dc(e) {
  var t = e.option, r = vK(e, fK);
  return /* @__PURE__ */ y(Jr, {
    option: t,
    DefaultShape: UA,
    shapeProps: r
  });
}
function pK(e, t) {
  return bK(e) || gK(e, t) || mK(e, t) || yK();
}
function yK() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mK(e, t) {
  if (e) {
    if (typeof e == "string") return om(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? om(e, t) : void 0;
  }
}
function om(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function gK(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function bK(e) {
  if (Array.isArray(e)) return e;
}
var lm = (e, t, r) => {
  var n = r ?? e;
  if (!he(n))
    return lt(n, t, 0);
}, HA = (e, t, r) => {
  var n = {}, i = e.filter(Va), a = e.filter((s) => s.stackId == null), o = i.reduce((s, c) => {
    var d = s[c.stackId];
    return d == null && (d = []), d.push(c), s[c.stackId] = d, s;
  }, n), l = Object.entries(o).map((s) => {
    var c, d = pK(s, 2), f = d[0], v = d[1], h = v.map((m) => m.dataKey), p = lm(t, r, (c = v[0]) === null || c === void 0 ? void 0 : c.barSize);
    return {
      stackId: f,
      dataKeys: h,
      barSize: p
    };
  }), u = a.map((s) => {
    var c = [s.dataKey].filter((f) => f != null), d = lm(t, r, s.barSize);
    return {
      stackId: void 0,
      dataKeys: c,
      barSize: d
    };
  });
  return [...l, ...u];
};
function um(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Co(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? um(Object(r), !0).forEach(function(n) {
      xK(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : um(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xK(e, t, r) {
  return (t = wK(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wK(e) {
  var t = AK(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AK(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function PK(e, t, r, n, i) {
  var a, o = n.length;
  if (!(o < 1)) {
    var l = lt(e, r, 0, !0), u, s = [];
    if (Q((a = n[0]) === null || a === void 0 ? void 0 : a.barSize)) {
      var c = !1, d = r / o, f = n.reduce((w, x) => w + (x.barSize || 0), 0);
      f += (o - 1) * l, f >= r && (f -= (o - 1) * l, l = 0), f >= r && d > 0 && (c = !0, d *= 0.9, f = o * d);
      var v = Math.round((r - f) / 2), h = {
        offset: v - l,
        size: 0
      };
      u = n.reduce((w, x) => {
        var A, P = {
          stackId: x.stackId,
          dataKeys: x.dataKeys,
          position: {
            offset: h.offset + h.size + l,
            size: c ? d : (A = x.barSize) !== null && A !== void 0 ? A : 0
          }
        }, b = [...w, P];
        return h = P.position, b;
      }, s);
    } else {
      var p = lt(t, r, 0, !0);
      r - 2 * p - (o - 1) * l <= 0 && (l = 0);
      var m = (r - 2 * p - (o - 1) * l) / o;
      m > 1 && (m = Math.round(m));
      var g = Q(i) ? Math.min(m, i) : m;
      u = n.reduce((w, x, A) => [...w, {
        stackId: x.stackId,
        dataKeys: x.dataKeys,
        position: {
          offset: p + o * (m - g) / 2 + (g + l) * A,
          size: g
        }
      }], s);
    }
    return u;
  }
}
var YA = (e, t, r, n, i, a, o) => {
  var l = he(o) ? t : o, u = PK(r, n, i !== a ? i : a, e, l);
  return i !== a && u != null && (u = u.map((s) => Co(Co({}, s), {}, {
    position: Co(Co({}, s.position), {}, {
      offset: s.position.offset - i / 2
    })
  }))), u;
}, VA = (e, t) => {
  var r = Du(t);
  if (!(!e || r == null || t == null)) {
    var n = t.stackId;
    if (n != null) {
      var i = e[n];
      if (i) {
        var a = i.stackedData;
        if (a)
          return a.find((o) => o.key === r);
      }
    }
  }
}, GA = (e, t) => {
  if (!(e == null || t == null)) {
    var r = e.find((n) => n.stackId === t.stackId && t.dataKey != null && n.dataKeys.includes(t.dataKey));
    if (r != null)
      return r.position;
  }
};
function sm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sm(Object(r), !0).forEach(function(n) {
      OK(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function OK(e, t, r) {
  return (t = SK(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SK(e) {
  var t = IK(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function IK(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kK = (e, t) => $i(e, t), jK = (e, t) => nn(e, "radiusAxis", t), as = S([kK, jK], (e, t) => {
  if (!(e == null || t == null))
    return Kl(Kl({}, e), {}, {
      scale: t
    });
}), qf = (e, t) => kR(e, "radiusAxis", t, !1), TK = (e, t, r) => $n(e, r), EK = (e, t, r) => nn(e, "angleAxis", r), os = S([TK, EK], (e, t) => {
  if (!(e == null || t == null))
    return Kl(Kl({}, e), {}, {
      scale: t
    });
}), Zf = (e, t, r) => Fn(e, "angleAxis", r, !1), CK = (e, t, r, n) => n, Jf = S([uo, CK], (e, t) => {
  if (e.some((r) => r.type === "radialBar" && t.dataKey === r.dataKey && t.stackId === r.stackId))
    return t;
}), qA = S([te, as, qf, os, Zf], (e, t, r, n, i) => Dt(e, "radiusAxis") ? Ot(t, r, !1) : Ot(n, i, !1)), DK = S([os, as, te], (e, t, r) => {
  var n = r === "radial" ? e : t;
  if (!(n == null || n.scale == null))
    return k0({
      numericAxis: n
    });
}), MK = (e, t, r, n, i) => i, $K = (e, t, r, n, i) => r, _K = (e, t, r, n, i) => t, ZA = (e, t, r, n, i) => n.maxBarSize, JA = (e) => e.type === "radialBar", NK = S([te, uo, $K, _K], (e, t, r, n) => t.filter((i) => e === "centric" ? i.angleAxisId === r : i.radiusAxisId === n).filter((i) => i.hide === !1).filter(JA)), LK = () => {
}, RK = S([NK, ux, LK], HA), BK = S([te, ku, os, Zf, as, qf, ZA], (e, t, r, n, i, a, o) => {
  var l, u, s = he(o) ? t : o;
  if (e === "centric") {
    var c, d;
    return (c = (d = Ot(r, n, !0)) !== null && d !== void 0 ? d : s) !== null && c !== void 0 ? c : 0;
  }
  return (l = (u = Ot(i, a, !0)) !== null && u !== void 0 ? u : s) !== null && l !== void 0 ? l : 0;
}), zK = S([RK, ku, lx, Ed, BK, qA, ZA], YA), KK = S([zK, Jf], GA), QA = S([so], (e) => e.filter(JA).filter(Va)), WK = S([QA, zr, Ye], $d), cm = S([WK, QA, Di, Cd], ff), FK = (e, t, r) => {
  var n = te(e);
  return n === "centric" ? cm(e, "radiusAxis", t) : cm(e, "angleAxis", r);
}, UK = S([FK, Jf], VA), XK = S([os, Zf, as, qf, Ht, Jf, qA, te, DK, _n, MK, KK, UK], (e, t, r, n, i, a, o, l, u, s, c, d, f) => {
  var v = i.chartData, h = i.dataStartIndex, p = i.dataEndIndex;
  if (a == null || r == null || e == null || v == null || o == null || d == null || l !== "centric" && l !== "radial" || n == null || s == null)
    return [];
  var m = a.dataKey, g = a.minPointSize, w = s.cx, x = s.cy, A = s.startAngle, P = s.endAngle, b = v.slice(h, p + 1), O = l === "centric" ? r : e, I = f ? O.scale.domain() : null;
  return sW({
    angleAxis: e,
    angleAxisTicks: t,
    bandSize: o,
    baseValue: u,
    cells: c,
    cx: w,
    cy: x,
    dataKey: m,
    dataStartIndex: h,
    displayedData: b,
    endAngle: P,
    layout: l,
    minPointSize: g,
    pos: d,
    radiusAxis: r,
    radiusAxisTicks: n,
    stackedData: f,
    stackedDomain: I,
    startAngle: A
  });
}), HK = S([zr, (e, t) => t], (e, t) => {
  var r = e.chartData, n = e.dataStartIndex, i = e.dataEndIndex;
  if (r == null)
    return [];
  var a = r.slice(n, i + 1);
  return a.length === 0 ? [] : a.map((o) => ({
    type: t,
    // @ts-expect-error we need a better typing for our data inputs
    value: o.name,
    // @ts-expect-error we need a better typing for our data inputs
    color: o.fill,
    // @ts-expect-error Legend payload.payload says it wants objects but our data can be unknown
    payload: o
  }));
});
function eP(e, t) {
  return e && typeof e == "object" && "zIndex" in e && typeof e.zIndex == "number" && Q(e.zIndex) ? e.zIndex : t;
}
var YK = ["shape", "activeShape", "cornerRadius", "id"], VK = ["onMouseEnter", "onClick", "onMouseLeave"], GK = ["value", "background"];
function mi() {
  return mi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, mi.apply(null, arguments);
}
function dm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dm(Object(r), !0).forEach(function(n) {
      qK(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qK(e, t, r) {
  return (t = ZK(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ZK(e) {
  var t = JK(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JK(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Mc(e, t) {
  if (e == null) return {};
  var r, n, i = QK(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function QK(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var tP = [];
function eW(e) {
  var t = e.showLabels, r = e.sectors, n = e.children, i = r.map((a) => ({
    value: a.value,
    payload: a.payload,
    parentViewBox: void 0,
    clockWise: !1,
    viewBox: {
      cx: a.cx,
      cy: a.cy,
      innerRadius: a.innerRadius,
      outerRadius: a.outerRadius,
      startAngle: a.startAngle,
      endAngle: a.endAngle,
      clockWise: !1
    },
    fill: a.fill
  }));
  return /* @__PURE__ */ y(PA, {
    value: t ? i : void 0
  }, n);
}
function tW(e) {
  var t = e.sectors, r = e.allOtherRadialBarProps, n = e.showLabels, i = e.animationElapsedTime, a = e.isAnimating, o = e.isEntrance, l = r.shape, u = r.activeShape, s = r.cornerRadius, c = r.id, d = Mc(r, YK), f = oe(d), v = C(yr), h = r.onMouseEnter, p = r.onClick, m = r.onMouseLeave, g = Mc(r, VK), w = Wi(h, r.dataKey, c), x = Fi(m), A = Ui(p, r.dataKey, c);
  return t == null ? null : /* @__PURE__ */ y(eW, {
    showLabels: n,
    sectors: t
  }, t.map((P, b) => {
    var O = !!(u && v === String(b)), I = w(P, b), E = x(P, b), j = A(P, b), T = dt(dt(dt(dt({}, f), {}, {
      cornerRadius: XA(s)
    }, P), ir(g, P, b)), {}, {
      onMouseEnter: I,
      onMouseLeave: E,
      onClick: j,
      className: "recharts-radial-bar-sector ".concat(P.className),
      forceCornerRadius: d.forceCornerRadius,
      cornerIsExternal: d.cornerIsExternal,
      animationElapsedTime: i,
      isAnimating: a,
      isEntrance: o,
      isActive: O,
      option: O && u != null ? u : l,
      index: b
    });
    return O ? /* @__PURE__ */ y(we, {
      zIndex: fe.activeBar,
      key: "sector-".concat(P.cx, "-").concat(P.cy, "-").concat(P.innerRadius, "-").concat(P.outerRadius, "-").concat(P.startAngle, "-").concat(P.endAngle, "-").concat(b)
    }, /* @__PURE__ */ y(Dc, T)) : /* @__PURE__ */ y(Dc, mi({
      key: "sector-".concat(P.cx, "-").concat(P.cy, "-").concat(P.innerRadius, "-").concat(P.outerRadius, "-").concat(P.startAngle, "-").concat(P.endAngle, "-").concat(b)
    }, T));
  }), /* @__PURE__ */ y(rn, {
    label: r.label
  }), r.children);
}
var rW = (e, t) => e == null ? [] : t === 1 ? e.flatMap((r) => r.status === "removed" ? [] : [r.next]) : e.flatMap((r) => r.status === "removed" ? [] : r.status === "matched" ? [dt(dt({}, r.next), {}, {
  startAngle: V(r.prev.startAngle, r.next.startAngle, t),
  endAngle: V(r.prev.endAngle, r.next.endAngle, t)
})] : [dt(dt({}, r.next), {}, {
  endAngle: V(r.next.startAngle, r.next.endAngle, t)
})]);
function nW(e) {
  var t = e.props, r = e.previousSectorsRef, n = t.sectors, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, l = t.animationEasing, u = t.onAnimationStart, s = t.onAnimationEnd, c = an(u, s), d = c.isAnimating, f = c.handleAnimationStart, v = c.handleAnimationEnd, h = Xa();
  return h == null ? null : /* @__PURE__ */ y(on, {
    animationInput: t,
    animationIdPrefix: "recharts-radialbar-",
    items: n,
    previousItemsRef: r,
    isAnimationActive: i,
    animationBegin: a,
    animationDuration: o,
    animationEasing: l,
    onAnimationStart: f,
    onAnimationEnd: v,
    animationInterpolateFn: t.animationInterpolateFn,
    animationMatchBy: t.animationMatchBy,
    layout: h
  }, (p, m, g) => /* @__PURE__ */ y(tW, {
    sectors: p,
    allOtherRadialBarProps: t,
    showLabels: !d,
    animationElapsedTime: m,
    isAnimating: d || m < 1,
    isEntrance: g
  }));
}
function iW(e) {
  var t = H(null);
  return /* @__PURE__ */ y(nW, {
    props: e,
    previousSectorsRef: t
  });
}
function aW(e) {
  var t = C((r) => HK(r, e.legendType));
  return /* @__PURE__ */ y(Uf, {
    legendPayload: t ?? []
  });
}
var oW = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.sectors, n = e.stroke, i = e.strokeWidth, a = e.name, o = e.hide, l = e.fill, u = e.tooltipType, s = e.formatter, c = e.id, d = {
    dataDefinedOnItem: r,
    getPosition: mt,
    settings: {
      graphicalItemId: c,
      stroke: n,
      strokeWidth: i,
      fill: l,
      nameKey: void 0,
      // RadialBar does not have nameKey, why?
      dataKey: t,
      name: Mt(a, t),
      hide: o,
      type: u,
      color: l,
      unit: "",
      // Why does RadialBar not support unit?
      formatter: s
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: d
  });
});
class lW extends Ai {
  renderBackground(t) {
    if (t == null)
      return null;
    var r = this.props.cornerRadius, n = Tt(this.props.background);
    return /* @__PURE__ */ y(we, {
      zIndex: eP(this.props.background, fe.barBackground)
    }, t.map((i, a) => {
      i.value;
      var o = i.background, l = Mc(i, GK);
      if (!o)
        return null;
      var u = dt(dt(dt(dt(dt({
        cornerRadius: XA(r)
      }, l), {}, {
        // @ts-expect-error backgroundProps is contributing unknown props
        fill: "#eee"
      }, o), n), ir(this.props, i, a)), {}, {
        index: a,
        className: J("recharts-radial-bar-background-sector", String(n?.className)),
        option: o,
        isActive: !1
      });
      return /* @__PURE__ */ y(Dc, mi({
        key: "background-".concat(l.cx, "-").concat(l.cy, "-").concat(l.innerRadius, "-").concat(l.outerRadius, "-").concat(l.startAngle, "-").concat(l.endAngle, "-").concat(a)
      }, u));
    }));
  }
  render() {
    var t = this.props, r = t.hide, n = t.sectors, i = t.className, a = t.background;
    if (r)
      return null;
    var o = J("recharts-area", i);
    return /* @__PURE__ */ y(we, {
      zIndex: this.props.zIndex
    }, /* @__PURE__ */ y(X, {
      className: o
    }, a && /* @__PURE__ */ y(X, {
      className: "recharts-radial-bar-background"
    }, this.renderBackground(n)), /* @__PURE__ */ y(X, {
      className: "recharts-radial-bar-sectors"
    }, /* @__PURE__ */ y(iW, this.props))));
  }
}
function uW(e) {
  var t, r = xe(() => Ki(e.children, Wn), [e.children]), n = xe(() => ({
    data: void 0,
    hide: !1,
    id: e.id,
    dataKey: e.dataKey,
    minPointSize: e.minPointSize,
    stackId: Ka(e.stackId),
    maxBarSize: e.maxBarSize,
    barSize: e.barSize,
    type: "radialBar",
    angleAxisId: e.angleAxisId,
    radiusAxisId: e.radiusAxisId
  }), [e.id, e.dataKey, e.minPointSize, e.stackId, e.maxBarSize, e.barSize, e.angleAxisId, e.radiusAxisId]), i = (t = C((a) => XK(a, e.radiusAxisId, e.angleAxisId, n, r))) !== null && t !== void 0 ? t : tP;
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(oW, {
    dataKey: e.dataKey,
    sectors: i,
    stroke: e.stroke,
    strokeWidth: e.strokeWidth,
    name: e.name,
    hide: e.hide,
    fill: e.fill,
    tooltipType: e.tooltipType,
    formatter: e.formatter,
    id: e.id
  }), /* @__PURE__ */ y(lW, mi({}, e, {
    sectors: i
  })));
}
var Do = {
  angleAxisId: 0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationMatchBy: Xi,
  animationInterpolateFn: rW,
  background: !1,
  cornerIsExternal: !1,
  cornerRadius: 0,
  forceCornerRadius: !1,
  hide: !1,
  isAnimationActive: "auto",
  label: !1,
  legendType: "rect",
  minPointSize: 0,
  radiusAxisId: 0,
  shape: UA,
  zIndex: fe.bar
};
function sW(e) {
  var t = e.displayedData, r = e.stackedData, n = e.dataStartIndex, i = e.stackedDomain, a = e.dataKey, o = e.baseValue, l = e.layout, u = e.radiusAxis, s = e.radiusAxisTicks, c = e.bandSize, d = e.pos, f = e.angleAxis, v = e.minPointSize, h = e.cx, p = e.cy, m = e.angleAxisTicks, g = e.cells, w = e.startAngle, x = e.endAngle;
  return m == null || s == null ? tP : (t ?? []).map((A, P) => {
    var b, O, I, E, j, T;
    if (r ? b = I0(r[n + P], i) : (b = G(A, a), Array.isArray(b) || (b = [o, b])), l === "radial") {
      var k, _;
      if (E = (k = f.scale.map(b[0])) !== null && k !== void 0 ? k : w, j = (_ = f.scale.map(b[1])) !== null && _ !== void 0 ? _ : x, O = dl({
        axis: u,
        ticks: s,
        bandSize: c,
        offset: d.offset,
        entry: A,
        index: P
      }), O != null && j != null && E != null) {
        I = O + d.size;
        var $ = j - E;
        if (Math.abs(v) > 0 && Math.abs($) < Math.abs(v)) {
          var M = Ue($ || v) * (Math.abs(v) - Math.abs($));
          j += M;
        }
        T = {
          background: {
            cx: h,
            cy: p,
            innerRadius: O,
            outerRadius: I,
            startAngle: w,
            endAngle: x
          }
        };
      }
    } else if (O = u.scale.map(b[0]), I = u.scale.map(b[1]), E = dl({
      axis: f,
      ticks: m,
      bandSize: c,
      offset: d.offset,
      entry: A,
      index: P
    }), O != null && I != null && E != null) {
      j = E + d.size;
      var R = I - O;
      if (Math.abs(v) > 0 && Math.abs(R) < Math.abs(v)) {
        var K = Ue(R || v) * (Math.abs(v) - Math.abs(R));
        I += K;
      }
    }
    return dt(dt(dt({}, A), T), {}, {
      payload: A,
      value: r ? b : b[1],
      cx: h,
      cy: p,
      innerRadius: O,
      outerRadius: I,
      startAngle: E,
      // @ts-expect-error endAngle is used before assigned (?)
      endAngle: j
    }, g && g[P] && g[P].props);
  });
}
function cW(e) {
  var t = re(e, Do);
  return /* @__PURE__ */ y(or, {
    id: t.id,
    type: "radialBar"
  }, (r) => {
    var n, i, a;
    return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Yf, {
      type: "radialBar",
      id: r,
      data: void 0,
      dataKey: t.dataKey,
      hide: (n = t.hide) !== null && n !== void 0 ? n : Do.hide,
      angleAxisId: (i = t.angleAxisId) !== null && i !== void 0 ? i : Do.angleAxisId,
      radiusAxisId: (a = t.radiusAxisId) !== null && a !== void 0 ? a : Do.radiusAxisId,
      stackId: Ka(t.stackId),
      barSize: t.barSize,
      minPointSize: t.minPointSize,
      maxBarSize: t.maxBarSize
    }), /* @__PURE__ */ y(aW, t), /* @__PURE__ */ y(uW, mi({}, t, {
      id: r
    })));
  });
}
cW.displayName = "RadialBar";
function fm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fm(Object(r), !0).forEach(function(n) {
      dW(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function dW(e, t, r) {
  return (t = fW(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fW(e) {
  var t = vW(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vW(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hW = ["Webkit", "Moz", "O", "ms"], pW = (e, t) => {
  var r = e.replace(/(\w)/, (i) => i.toUpperCase()), n = hW.reduce((i, a) => vm(vm({}, i), {}, {
    [a + r]: t
  }), {});
  return n[e] = t, n;
}, rP = (e) => {
  var t = e.chartData, r = ee(), n = se();
  return ae(() => n ? () => {
  } : (r(jc(t)), () => {
    r(jc(void 0));
  }), [t, r, n]), null;
}, yW = (e) => {
  var t = e.computedData, r = ee();
  return ae(() => (r(_N(t)), () => {
    r(jc(void 0));
  }), [t, r]), null;
}, mW = (e) => e.chartData.chartData, gW = () => C(mW), bW = (e) => {
  var t = e.chartData, r = t.dataStartIndex, n = t.dataEndIndex;
  return {
    startIndex: r,
    endIndex: n
  };
}, xW = () => C(bW), wW = /* @__PURE__ */ We(() => {
}), hm = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}, nP = ht({
  name: "brush",
  initialState: hm,
  reducers: {
    setBrushSettings(e, t) {
      return t.payload == null ? hm : t.payload;
    }
  }
}), pm = nP.actions.setBrushSettings, AW = nP.reducer;
function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ca.apply(null, arguments);
}
function ym(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ym(Object(r), !0).forEach(function(n) {
      Or(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ym(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Or(e, t, r) {
  return (t = PW(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function PW(e) {
  var t = OW(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function OW(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function SW(e) {
  var t = e.x, r = e.y, n = e.width, i = e.height, a = e.stroke, o = Math.floor(r + i / 2) - 1;
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y("rect", {
    x: t,
    y: r,
    width: n,
    height: i,
    fill: a,
    stroke: "none"
  }), /* @__PURE__ */ y("line", {
    x1: t + 1,
    y1: o,
    x2: t + n - 1,
    y2: o,
    fill: "none",
    stroke: "#fff"
  }), /* @__PURE__ */ y("line", {
    x1: t + 1,
    y1: o + 2,
    x2: t + n - 1,
    y2: o + 2,
    fill: "none",
    stroke: "#fff"
  }));
}
function IW(e) {
  var t = e.travellerProps, r = e.travellerType;
  return /* @__PURE__ */ ie(r) ? /* @__PURE__ */ Ae(r, t) : typeof r == "function" ? r(t) : /* @__PURE__ */ y(SW, t);
}
function mm(e) {
  if (rt(e) && typeof e == "object" && "name" in e && typeof e.name == "string")
    return e.name;
}
function kW(e, t, r) {
  var n = mm(e[t]), i = mm(e[r]);
  return "Min value: ".concat(n, ", Max value: ").concat(i);
}
function gm(e) {
  var t = e.otherProps, r = e.travellerX, n = e.id, i = e.onMouseEnter, a = e.onMouseLeave, o = e.onMouseDown, l = e.onTouchStart, u = e.onTravellerMoveKeyboard, s = e.onFocus, c = e.onBlur, d = t.y, f = t.x, v = t.travellerWidth, h = t.height, p = t.traveller, m = t.ariaLabel, g = t.data, w = t.startIndex, x = t.endIndex, A = Math.max(r, f), P = vn(vn({}, oe(t)), {}, {
    x: A,
    y: d,
    width: v,
    height: h
  }), b = m || kW(g, w, x);
  return /* @__PURE__ */ y(X, {
    tabIndex: 0,
    role: "slider",
    "aria-label": b,
    "aria-valuenow": r,
    className: "recharts-brush-traveller",
    onMouseEnter: i,
    onMouseLeave: a,
    onMouseDown: o,
    onTouchStart: l,
    onKeyDown: (O) => {
      ["ArrowLeft", "ArrowRight"].includes(O.key) && (O.preventDefault(), O.stopPropagation(), u(O.key === "ArrowRight" ? 1 : -1, n));
    },
    onFocus: s,
    onBlur: c,
    style: {
      cursor: "col-resize"
    }
  }, /* @__PURE__ */ y(IW, {
    travellerType: p,
    travellerProps: P
  }));
}
function bm(e) {
  var t = e.index, r = e.data, n = e.tickFormatter, i = e.dataKey, a = G(r[t], i, t);
  return typeof n == "function" ? n(a, t) : a;
}
function xm(e, t) {
  for (var r = e.length, n = 0, i = r - 1; i - n > 1; ) {
    var a = Math.floor((n + i) / 2), o = e[a];
    o != null && o > t ? i = a : n = a;
  }
  var l = e[i];
  return l != null && t >= l ? i : n;
}
function Ks(e) {
  var t = e.startX, r = e.endX, n = e.scaleValues, i = e.gap, a = e.data, o = a.length - 1, l = Math.min(t, r), u = Math.max(t, r), s = xm(n, l), c = xm(n, u);
  return {
    startIndex: s - s % i,
    endIndex: c === o ? o : c - c % i
  };
}
function jW(e) {
  var t = e.x, r = e.y, n = e.width, i = e.height, a = e.fill, o = e.stroke;
  return /* @__PURE__ */ y("rect", {
    stroke: o,
    fill: a,
    x: t,
    y: r,
    width: n,
    height: i
  });
}
function TW(e) {
  var t = e.startIndex, r = e.endIndex, n = e.y, i = e.height, a = e.travellerWidth, o = e.stroke, l = e.tickFormatter, u = e.dataKey, s = e.data, c = e.startX, d = e.endX, f = 5, v = {
    pointerEvents: "none",
    fill: o
  };
  return /* @__PURE__ */ y(X, {
    className: "recharts-brush-texts"
  }, /* @__PURE__ */ y(Lr, Ca({
    textAnchor: "end",
    verticalAnchor: "middle",
    x: Math.min(c, d) - f,
    y: n + i / 2
  }, v), bm({
    index: t,
    tickFormatter: l,
    dataKey: u,
    data: s
  })), /* @__PURE__ */ y(Lr, Ca({
    textAnchor: "start",
    verticalAnchor: "middle",
    x: Math.max(c, d) + a + f,
    y: n + i / 2
  }, v), bm({
    index: r,
    tickFormatter: l,
    dataKey: u,
    data: s
  })));
}
function EW(e) {
  var t = e.y, r = e.height, n = e.stroke, i = e.travellerWidth, a = e.startX, o = e.endX, l = e.onMouseEnter, u = e.onMouseLeave, s = e.onMouseDown, c = e.onTouchStart, d = Math.min(a, o) + i, f = Math.max(Math.abs(o - a) - i, 0);
  return /* @__PURE__ */ y("rect", {
    className: "recharts-brush-slide",
    onMouseEnter: l,
    onMouseLeave: u,
    onMouseDown: s,
    onTouchStart: c,
    style: {
      cursor: "move"
    },
    stroke: "none",
    fill: n,
    fillOpacity: 0.2,
    x: d,
    y: t,
    width: f,
    height: r
  });
}
function CW(e) {
  var t = e.x, r = e.y, n = e.width, i = e.height, a = e.data, o = e.children, l = e.padding, u = Xo.count(o) === 1;
  if (!u)
    return null;
  var s = Xo.only(o);
  return s ? /* @__PURE__ */ Ae(s, {
    x: t,
    y: r,
    width: n,
    height: i,
    margin: l,
    compact: !0,
    data: a
  }) : null;
}
var DW = (e) => {
  var t = e.data, r = e.startIndex, n = e.endIndex, i = e.x, a = e.width, o = e.travellerWidth;
  if (!t || !t.length)
    return {};
  var l = t.length, u = bx().domain(Sd(0, l)).range([i, i + a - o]), s = u.domain().map((c) => u(c)).filter(rt);
  return {
    isTextActive: !1,
    isSlideMoving: !1,
    isTravellerMoving: !1,
    isTravellerFocused: !1,
    startX: u(r),
    endX: u(n),
    scale: u,
    scaleValues: s
  };
}, wm = (e) => e.changedTouches && !!e.changedTouches.length;
class MW extends Ai {
  constructor(t) {
    super(t), Or(this, "handleDrag", (r) => {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.state.isTravellerMoving ? this.handleTravellerMove(r) : this.state.isSlideMoving && this.handleSlideDrag(r);
    }), Or(this, "handleTouchMove", (r) => {
      var n, i = (n = r.changedTouches) === null || n === void 0 ? void 0 : n[0];
      i != null && this.handleDrag(i);
    }), Or(this, "handleDragEnd", () => {
      this.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, () => {
        var r = this.props, n = r.endIndex, i = r.onDragEnd, a = r.startIndex;
        i?.({
          endIndex: n,
          startIndex: a
        });
      }), this.detachDragEndListener();
    }), Or(this, "handleLeaveWrapper", () => {
      (this.state.isTravellerMoving || this.state.isSlideMoving) && (this.leaveTimer = window.setTimeout(this.handleDragEnd, this.props.leaveTimeOut));
    }), Or(this, "handleEnterSlideOrTraveller", () => {
      this.setState({
        isTextActive: !0
      });
    }), Or(this, "handleLeaveSlideOrTraveller", () => {
      this.setState({
        isTextActive: !1
      });
    }), Or(this, "handleSlideDragStart", (r) => {
      var n = wm(r) ? r.changedTouches[0] : r;
      n != null && (this.setState({
        isTravellerMoving: !1,
        isSlideMoving: !0,
        slideMoveStartX: n.pageX
      }), this.attachDragEndListener());
    }), Or(this, "handleTravellerMoveKeyboard", (r, n) => {
      var i = this.props, a = i.data, o = i.gap, l = i.startIndex, u = i.endIndex, s = this.state, c = s.scaleValues, d = s.startX, f = s.endX;
      if (c != null) {
        var v = -1;
        if (n === "startX" ? v = l : n === "endX" && (v = u), !(v < 0 || v >= a.length)) {
          var h = v + r;
          if (!(h === -1 || h >= c.length)) {
            var p = c[h];
            p != null && (n === "startX" && p >= f || n === "endX" && p <= d || this.setState(
              // @ts-expect-error not sure why typescript is not happy with this, partial update is fine in React
              {
                [n]: p
              },
              () => {
                this.props.onChange(Ks({
                  startX: this.state.startX,
                  endX: this.state.endX,
                  data: a,
                  gap: o,
                  scaleValues: c
                }));
              }
            ));
          }
        }
      }
    }), this.travellerDragStartHandlers = {
      startX: this.handleTravellerDragStart.bind(this, "startX"),
      endX: this.handleTravellerDragStart.bind(this, "endX")
    }, this.state = {
      brushMoveStartX: 0,
      movingTravellerId: void 0,
      endX: 0,
      startX: 0,
      slideMoveStartX: 0
    };
  }
  static getDerivedStateFromProps(t, r) {
    var n = t.data, i = t.width, a = t.x, o = t.travellerWidth, l = t.startIndex, u = t.endIndex, s = t.startIndexControlledFromProps, c = t.endIndexControlledFromProps;
    if (n !== r.prevData)
      return vn({
        prevData: n,
        prevTravellerWidth: o,
        prevX: a,
        prevWidth: i,
        prevStartIndexControlledFromProps: s,
        prevEndIndexControlledFromProps: c
      }, n && n.length ? DW({
        data: n,
        width: i,
        x: a,
        travellerWidth: o,
        startIndex: l,
        endIndex: u
      }) : {
        scale: void 0,
        scaleValues: void 0
      });
    var d = r.scale;
    if (d && (i !== r.prevWidth || a !== r.prevX || o !== r.prevTravellerWidth)) {
      d.range([a, a + i - o]);
      var f = d.domain().map((v) => d(v)).filter((v) => v != null);
      return {
        prevData: n,
        prevTravellerWidth: o,
        prevX: a,
        prevWidth: i,
        startX: d(t.startIndex),
        endX: d(t.endIndex),
        scaleValues: f
      };
    }
    if (r.scale && !r.isSlideMoving && !r.isTravellerMoving && !r.isTravellerFocused && !r.isTextActive) {
      if (s != null && r.prevStartIndexControlledFromProps !== s)
        return {
          startX: r.scale(s),
          prevStartIndexControlledFromProps: s
        };
      if (c != null && r.prevEndIndexControlledFromProps !== c)
        return {
          endX: r.scale(c),
          prevEndIndexControlledFromProps: c
        };
    }
    return null;
  }
  componentWillUnmount() {
    this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
  }
  attachDragEndListener() {
    window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
  }
  detachDragEndListener() {
    window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
  }
  handleSlideDrag(t) {
    var r = this.state, n = r.slideMoveStartX, i = r.startX, a = r.endX, o = r.scaleValues;
    if (o != null) {
      var l = this.props, u = l.x, s = l.width, c = l.travellerWidth, d = l.startIndex, f = l.endIndex, v = l.onChange, h = l.data, p = l.gap, m = t.pageX - n;
      m > 0 ? m = Math.min(m, u + s - c - a, u + s - c - i) : m < 0 && (m = Math.max(m, u - i, u - a));
      var g = Ks({
        startX: i + m,
        endX: a + m,
        data: h,
        gap: p,
        scaleValues: o
      });
      (g.startIndex !== d || g.endIndex !== f) && v && v(g), this.setState({
        startX: i + m,
        endX: a + m,
        slideMoveStartX: t.pageX
      });
    }
  }
  handleTravellerDragStart(t, r) {
    var n = wm(r) ? r.changedTouches[0] : r;
    n != null && (this.setState({
      isSlideMoving: !1,
      isTravellerMoving: !0,
      movingTravellerId: t,
      brushMoveStartX: n.pageX
    }), this.attachDragEndListener());
  }
  handleTravellerMove(t) {
    var r = this.state, n = r.brushMoveStartX, i = r.movingTravellerId, a = r.endX, o = r.startX, l = r.scaleValues;
    if (!(i == null || l == null)) {
      var u = this.state[i], s = this.props, c = s.x, d = s.width, f = s.travellerWidth, v = s.onChange, h = s.gap, p = s.data, m = {
        startX: this.state.startX,
        endX: this.state.endX,
        data: p,
        gap: h,
        scaleValues: l
      }, g = t.pageX - n;
      g > 0 ? g = Math.min(g, c + d - f - u) : g < 0 && (g = Math.max(g, c - u)), m[i] = u + g;
      var w = Ks(m), x = w.startIndex, A = w.endIndex, P = () => {
        var b = p.length - 1;
        return i === "startX" && (a > o ? x % h === 0 : A % h === 0) || a < o && A === b || i === "endX" && (a > o ? A % h === 0 : x % h === 0) || a > o && A === b;
      };
      this.setState(
        // @ts-expect-error not sure why typescript is not happy with this, partial update is fine in React
        {
          [i]: u + g,
          brushMoveStartX: t.pageX
        },
        () => {
          v && P() && v(w);
        }
      );
    }
  }
  render() {
    var t = this.props, r = t.data, n = t.className, i = t.children, a = t.x, o = t.y, l = t.dy, u = t.width, s = t.height, c = t.alwaysShowText, d = t.fill, f = t.stroke, v = t.startIndex, h = t.endIndex, p = t.travellerWidth, m = t.tickFormatter, g = t.dataKey, w = t.padding, x = this.state, A = x.startX, P = x.endX, b = x.isTextActive, O = x.isSlideMoving, I = x.isTravellerMoving, E = x.isTravellerFocused;
    if (!r || !r.length || !L(a) || !L(o) || !L(u) || !L(s) || u <= 0 || s <= 0)
      return null;
    var j = J("recharts-brush", n), T = pW("userSelect", "none"), k = o + (l ?? 0);
    return /* @__PURE__ */ y(X, {
      className: j,
      onMouseLeave: this.handleLeaveWrapper,
      onTouchMove: this.handleTouchMove,
      style: T
    }, /* @__PURE__ */ y(jW, {
      x: a,
      y: k,
      width: u,
      height: s,
      fill: d,
      stroke: f
    }), /* @__PURE__ */ y(Mk, null, /* @__PURE__ */ y(CW, {
      x: a,
      y: k,
      width: u,
      height: s,
      data: r,
      padding: w
    }, i)), /* @__PURE__ */ y(EW, {
      y: k,
      height: s,
      stroke: f,
      travellerWidth: p,
      startX: A,
      endX: P,
      onMouseEnter: this.handleEnterSlideOrTraveller,
      onMouseLeave: this.handleLeaveSlideOrTraveller,
      onMouseDown: this.handleSlideDragStart,
      onTouchStart: this.handleSlideDragStart
    }), /* @__PURE__ */ y(gm, {
      travellerX: A,
      id: "startX",
      otherProps: vn(vn({}, this.props), {}, {
        y: k
      }),
      onMouseEnter: this.handleEnterSlideOrTraveller,
      onMouseLeave: this.handleLeaveSlideOrTraveller,
      onMouseDown: this.travellerDragStartHandlers.startX,
      onTouchStart: this.travellerDragStartHandlers.startX,
      onTravellerMoveKeyboard: this.handleTravellerMoveKeyboard,
      onFocus: () => {
        this.setState({
          isTravellerFocused: !0
        });
      },
      onBlur: () => {
        this.setState({
          isTravellerFocused: !1
        });
      }
    }), /* @__PURE__ */ y(gm, {
      travellerX: P,
      id: "endX",
      otherProps: vn(vn({}, this.props), {}, {
        y: k
      }),
      onMouseEnter: this.handleEnterSlideOrTraveller,
      onMouseLeave: this.handleLeaveSlideOrTraveller,
      onMouseDown: this.travellerDragStartHandlers.endX,
      onTouchStart: this.travellerDragStartHandlers.endX,
      onTravellerMoveKeyboard: this.handleTravellerMoveKeyboard,
      onFocus: () => {
        this.setState({
          isTravellerFocused: !0
        });
      },
      onBlur: () => {
        this.setState({
          isTravellerFocused: !1
        });
      }
    }), (b || O || I || E || c) && /* @__PURE__ */ y(TW, {
      startIndex: v,
      endIndex: h,
      y: k,
      height: s,
      travellerWidth: p,
      stroke: f,
      tickFormatter: m,
      dataKey: g,
      data: r,
      startX: A,
      endX: P
    }));
  }
}
function $W(e) {
  var t = ee(), r = gW(), n = xW(), i = Ze(wW), a = e.onChange, o = e.startIndex, l = e.endIndex;
  ae(() => {
    t(Tc({
      startIndex: o,
      endIndex: l
    }));
  }, [t, l, o, r]), YN();
  var u = ue((m) => {
    if (n != null) {
      var g = n.startIndex, w = n.endIndex;
      (m.startIndex !== g || m.endIndex !== w) && (i?.(m), a?.(m), t(Tc(m)));
    }
  }, [a, i, t, n]), s = C(Fa);
  if (s == null || n == null || r == null || !r.length)
    return null;
  var c = n.startIndex, d = n.endIndex, f = s.x, v = s.y, h = s.width, p = {
    data: r,
    x: f,
    y: v,
    width: h,
    startIndex: c,
    endIndex: d,
    onChange: u
  };
  return /* @__PURE__ */ y(MW, Ca({}, e, p, {
    startIndexControlledFromProps: o ?? void 0,
    endIndexControlledFromProps: l ?? void 0
  }));
}
function _W(e) {
  var t = ee();
  return ae(() => (t(pm(e)), () => {
    t(pm(null));
  }), [t, e]), null;
}
var NW = {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
};
function LW(e) {
  var t = re(e, NW);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(_W, {
    height: t.height,
    x: t.x,
    y: t.y,
    width: t.width,
    padding: t.padding
  }), /* @__PURE__ */ y($W, t));
}
LW.displayName = "Brush";
var iP = (e, t) => {
  var r = e.x, n = e.y, i = t.x, a = t.y;
  return {
    x: Math.min(r, i),
    y: Math.min(n, a),
    width: Math.abs(i - r),
    height: Math.abs(a - n)
  };
}, RW = (e) => {
  var t = e.x1, r = e.y1, n = e.x2, i = e.y2;
  return iP({
    x: t,
    y: r
  }, {
    x: n,
    y: i
  });
};
function BW(e) {
  return (e % 180 + 180) % 180;
}
var zW = function(t) {
  var r = t.width, n = t.height, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = BW(i), o = a * Math.PI / 180, l = Math.atan(n / r), u = o > l && o < Math.PI - l ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(u);
}, KW = {
  dots: [],
  areas: [],
  lines: []
}, aP = ht({
  name: "referenceElements",
  initialState: KW,
  reducers: {
    addDot: (e, t) => {
      e.dots.push(t.payload);
    },
    removeDot: (e, t) => {
      var r = zt(e).dots.findIndex((n) => n === t.payload);
      r !== -1 && e.dots.splice(r, 1);
    },
    addArea: (e, t) => {
      e.areas.push(t.payload);
    },
    removeArea: (e, t) => {
      var r = zt(e).areas.findIndex((n) => n === t.payload);
      r !== -1 && e.areas.splice(r, 1);
    },
    addLine: (e, t) => {
      e.lines.push(ye(t.payload));
    },
    removeLine: (e, t) => {
      var r = zt(e).lines.findIndex((n) => n === t.payload);
      r !== -1 && e.lines.splice(r, 1);
    }
  }
}), Yi = aP.actions, WW = Yi.addDot, FW = Yi.removeDot, UW = Yi.addArea, XW = Yi.removeArea, HW = Yi.addLine, YW = Yi.removeLine, VW = aP.reducer;
function GW(e, t) {
  return QW(e) || JW(e, t) || ZW(e, t) || qW();
}
function qW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ZW(e, t) {
  if (e) {
    if (typeof e == "string") return Am(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Am(e, t) : void 0;
  }
}
function Am(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function JW(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function QW(e) {
  if (Array.isArray(e)) return e;
}
var oP = /* @__PURE__ */ We(void 0), eF = (e) => {
  var t = e.children, r = Ne("".concat(oi("recharts"), "-clip")), n = GW(r, 1), i = n[0], a = fo();
  if (a == null)
    return null;
  var o = a.x, l = a.y, u = a.width, s = a.height;
  return /* @__PURE__ */ y(oP.Provider, {
    value: i
  }, /* @__PURE__ */ y("defs", null, /* @__PURE__ */ y("clipPath", {
    id: i
  }, /* @__PURE__ */ y("rect", {
    x: o,
    y: l,
    height: s,
    width: u
  }))), t);
}, Qf = () => Ze(oP);
class ev {
  constructor(t) {
    var r = t.x, n = t.y;
    this.xAxisScale = r, this.yAxisScale = n;
  }
  map(t, r) {
    var n, i, a = r.position;
    return {
      x: (n = this.xAxisScale.map(t.x, {
        position: a
      })) !== null && n !== void 0 ? n : 0,
      y: (i = this.yAxisScale.map(t.y, {
        position: a
      })) !== null && i !== void 0 ? i : 0
    };
  }
  mapWithFallback(t, r) {
    var n, i, a = r.position, o = r.fallback, l, u;
    return o === "rangeMin" ? l = this.yAxisScale.rangeMin() : o === "rangeMax" ? l = this.yAxisScale.rangeMax() : l = 0, o === "rangeMin" ? u = this.xAxisScale.rangeMin() : o === "rangeMax" ? u = this.xAxisScale.rangeMax() : u = 0, {
      x: (n = this.xAxisScale.map(t.x, {
        position: a
      })) !== null && n !== void 0 ? n : u,
      y: (i = this.yAxisScale.map(t.y, {
        position: a
      })) !== null && i !== void 0 ? i : l
    };
  }
  isInRange(t) {
    var r = t.x, n = t.y, i = r == null || this.xAxisScale.isInRange(r), a = n == null || this.yAxisScale.isInRange(n);
    return i && a;
  }
}
function Pm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Om(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pm(Object(r), !0).forEach(function(n) {
      tF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tF(e, t, r) {
  return (t = rF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rF(e) {
  var t = nF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Wl() {
  return Wl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wl.apply(null, arguments);
}
var iF = (e, t) => {
  var r;
  if (/* @__PURE__ */ ie(e))
    r = /* @__PURE__ */ Ae(e, t);
  else if (typeof e == "function")
    r = e(t);
  else {
    if (!Q(t.x1) || !Q(t.y1) || !Q(t.x2) || !Q(t.y2))
      return null;
    r = /* @__PURE__ */ y("line", Wl({}, t, {
      className: "recharts-reference-line-line"
    }));
  }
  return r;
}, aF = (e, t, r, n, i, a) => {
  var o = a.x, l = a.width, u = i.map(e, {
    position: r
  });
  if (!Q(u) || t === "discard" && !i.isInRange(u))
    return null;
  var s = [{
    x: o + l,
    y: u
  }, {
    x: o,
    y: u
  }];
  return n === "left" ? s.reverse() : s;
}, oF = (e, t, r, n, i, a) => {
  var o = a.y, l = a.height, u = i.map(e, {
    position: r
  });
  if (!Q(u) || t === "discard" && !i.isInRange(u))
    return null;
  var s = [{
    x: u,
    y: o + l
  }, {
    x: u,
    y: o
  }];
  return n === "top" ? s.reverse() : s;
}, lF = (e, t, r, n) => {
  var i = [n.mapWithFallback(e[0], {
    position: r,
    fallback: "rangeMin"
  }), n.mapWithFallback(e[1], {
    position: r,
    fallback: "rangeMax"
  })];
  return t === "discard" && i.some((a) => !n.isInRange(a)) ? null : i;
}, uF = (e, t, r, n, i, a, o) => {
  var l = o.x, u = o.y, s = o.segment, c = o.ifOverflow, d = tt(l), f = tt(u);
  return f ? aF(u, c, n, a, t, r) : d ? oF(l, c, n, i, e, r) : s != null && s.length === 2 ? lF(s, c, n, new ev({
    x: e,
    y: t
  })) : null;
};
function sF(e) {
  var t = ee();
  return ae(() => (t(HW(e)), () => {
    t(YW(e));
  })), null;
}
function cF(e) {
  var t = e.xAxisId, r = e.yAxisId, n = e.shape, i = e.className, a = e.ifOverflow, o = se(), l = Qf(), u = C((O) => br(O, t)), s = C((O) => xr(O, r)), c = C((O) => Ut(O, "xAxis", t, o)), d = C((O) => Ut(O, "yAxis", r, o)), f = Si();
  if (!l || !f || u == null || s == null || c == null || d == null)
    return null;
  var v = uF(c, d, f, e.position, u.orientation, s.orientation, e);
  if (!v)
    return null;
  var h = v[0], p = v[1];
  if (h == null || p == null)
    return null;
  var m = h.x, g = h.y, w = p.x, x = p.y, A = a === "hidden" ? "url(#".concat(l, ")") : void 0, P = Om(Om({
    clipPath: A
  }, $e(e)), {}, {
    x1: m,
    y1: g,
    x2: w,
    y2: x
  }), b = RW({
    x1: m,
    y1: g,
    x2: w,
    y2: x
  });
  return /* @__PURE__ */ y(we, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ y(X, {
    className: J("recharts-reference-line", i)
  }, iF(n, P), /* @__PURE__ */ y(Vu, Wl({}, b, {
    lowerWidth: b.width,
    upperWidth: b.width
  }), /* @__PURE__ */ y(qu, {
    label: e.label
  }), e.children)));
}
var dF = {
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  label: !1,
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle",
  zIndex: fe.line
};
function fF(e) {
  var t = re(e, dF);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(sF, {
    yAxisId: t.yAxisId,
    xAxisId: t.xAxisId,
    ifOverflow: t.ifOverflow,
    x: t.x,
    y: t.y,
    segment: t.segment
  }), /* @__PURE__ */ y(cF, t));
}
fF.displayName = "ReferenceLine";
function Sm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Im(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sm(Object(r), !0).forEach(function(n) {
      vF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function vF(e, t, r) {
  return (t = hF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function hF(e) {
  var t = pF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function pF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $c() {
  return $c = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $c.apply(null, arguments);
}
var yF = (e, t, r, n, i) => {
  var a = tt(e), o = tt(t), l = se(), u = C((f) => Ut(f, "xAxis", r, l)), s = C((f) => Ut(f, "yAxis", n, l));
  if (!a || !o || u == null || s == null)
    return null;
  var c = new ev({
    x: u,
    y: s
  }), d = c.map({
    x: e,
    y: t
  }, {
    position: "middle"
  });
  return i === "discard" && !c.isInRange(d) ? null : d;
};
function mF(e) {
  var t = ee();
  return ae(() => (t(WW(e)), () => {
    t(FW(e));
  })), null;
}
var gF = (e, t) => {
  var r;
  return /* @__PURE__ */ ie(e) ? r = /* @__PURE__ */ Ae(e, t) : typeof e == "function" ? r = e(t) : r = /* @__PURE__ */ y(Zu, $c({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
};
function bF(e) {
  var t = e.x, r = e.y, n = e.r, i = Qf(), a = yF(t, r, e.xAxisId, e.yAxisId, e.ifOverflow);
  if (!a)
    return null;
  var o = a.x, l = a.y, u = e.shape, s = e.className, c = e.ifOverflow, d = c === "hidden" ? "url(#".concat(i, ")") : void 0, f = Im(Im({
    clipPath: d
  }, $e(e)), {}, {
    cx: o ?? void 0,
    cy: l ?? void 0
  });
  return /* @__PURE__ */ y(we, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ y(X, {
    className: J("recharts-reference-dot", s)
  }, gF(u, f), /* @__PURE__ */ y(Vu, {
    x: o - n,
    y: l - n,
    width: 2 * n,
    height: 2 * n,
    upperWidth: 2 * n,
    lowerWidth: 2 * n
  }, /* @__PURE__ */ y(qu, {
    label: e.label
  }), e.children)));
}
var xF = {
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  label: !1,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  zIndex: fe.scatter
};
function wF(e) {
  var t = re(e, xF), r = t.x, n = t.y, i = t.r, a = t.ifOverflow, o = t.yAxisId, l = t.xAxisId;
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(mF, {
    y: n,
    x: r,
    r: i,
    yAxisId: o,
    xAxisId: l,
    ifOverflow: a
  }), /* @__PURE__ */ y(bF, t));
}
wF.displayName = "ReferenceDot";
function km(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? km(Object(r), !0).forEach(function(n) {
      AF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : km(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function AF(e, t, r) {
  return (t = PF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function PF(e) {
  var t = OF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function OF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Fl() {
  return Fl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fl.apply(null, arguments);
}
var SF = (e, t, r, n, i, a, o) => {
  var l, u, s, c, d = o.x1, f = o.x2, v = o.y1, h = o.y2;
  if (i == null || a == null)
    return null;
  var p = new ev({
    x: i,
    y: a
  }), m = {
    x: e ? (l = i.map(d, {
      position: "start"
    })) !== null && l !== void 0 ? l : null : i.rangeMin(),
    y: r ? (u = a.map(v, {
      position: "start"
    })) !== null && u !== void 0 ? u : null : a.rangeMin()
  }, g = {
    x: t ? (s = i.map(f, {
      position: "end"
    })) !== null && s !== void 0 ? s : null : i.rangeMax(),
    y: n ? (c = a.map(h, {
      position: "end"
    })) !== null && c !== void 0 ? c : null : a.rangeMax()
  };
  return o.ifOverflow === "discard" && (!p.isInRange(m) || !p.isInRange(g)) ? null : iP(m, g);
}, IF = (e, t) => {
  var r;
  return /* @__PURE__ */ ie(e) ? r = /* @__PURE__ */ Ae(e, t) : typeof e == "function" ? r = e(t) : r = /* @__PURE__ */ y(ji, Fl({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
};
function kF(e) {
  var t = ee();
  return ae(() => (t(UW(e)), () => {
    t(XW(e));
  })), null;
}
function jF(e) {
  var t = e.x1, r = e.x2, n = e.y1, i = e.y2, a = e.className, o = e.shape, l = e.xAxisId, u = e.yAxisId, s = Qf(), c = se(), d = C((A) => Ut(A, "xAxis", l, c)), f = C((A) => Ut(A, "yAxis", u, c));
  if (d == null || f == null)
    return null;
  var v = tt(t), h = tt(r), p = tt(n), m = tt(i);
  if (!v && !h && !p && !m && !o)
    return null;
  var g = SF(v, h, p, m, d, f, e);
  if (!g && !o)
    return null;
  var w = e.ifOverflow === "hidden", x = w ? "url(#".concat(s, ")") : void 0;
  return /* @__PURE__ */ y(we, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ y(X, {
    className: J("recharts-reference-area", a)
  }, IF(o, jm(jm({
    clipPath: x
  }, $e(e)), g)), g != null && /* @__PURE__ */ y(Vu, Fl({}, g, {
    lowerWidth: g.width,
    upperWidth: g.width
  }), /* @__PURE__ */ y(qu, {
    label: e.label
  }), e.children)));
}
var TF = {
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  radius: 0,
  fill: "#ccc",
  label: !1,
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1,
  zIndex: fe.area
};
function EF(e) {
  var t = re(e, TF);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(kF, {
    yAxisId: t.yAxisId,
    xAxisId: t.xAxisId,
    ifOverflow: t.ifOverflow,
    x1: t.x1,
    x2: t.x2,
    y1: t.y1,
    y2: t.y2
  }), /* @__PURE__ */ y(jF, t));
}
EF.displayName = "ReferenceArea";
function CF() {
}
function Tm(e) {
  if (!e || typeof e != "object") return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null ? Object.prototype.toString.call(e) === "[object Object]" : !1;
}
function DF(e, t, r) {
  return da(e, t, void 0, void 0, void 0, void 0, r);
}
function da(e, t, r, n, i, a, o) {
  const l = o(e, t, r, n, i, a);
  if (l !== void 0) return l;
  if (typeof e == typeof t) switch (typeof e) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return e === t;
    case "number":
      return e === t || Object.is(e, t);
    case "function":
      return e === t;
    case "object":
      return ya(e, t, a, o);
  }
  return ya(e, t, a, o);
}
function ya(e, t, r, n) {
  if (Object.is(e, t)) return !0;
  let i = li(e), a = li(t);
  if (i === "[object Arguments]" && (i = No), a === "[object Arguments]" && (a = No), i !== a) return !1;
  switch (i) {
    case nd:
      return e.toString() === t.toString();
    case id:
      return va(e.valueOf(), t.valueOf());
    case ad:
    case xb:
    case bb:
      return Object.is(e.valueOf(), t.valueOf());
    case mb:
      return e.source === t.source && e.flags === t.flags;
    case fI:
      return e === t;
  }
  r = r ?? /* @__PURE__ */ new Map();
  const o = r.get(e), l = r.get(t);
  if (o != null && l != null) return o === t;
  r.set(e, t), r.set(t, e);
  try {
    switch (i) {
      case wb:
        if (e.size !== t.size) return !1;
        for (const [u, s] of e.entries()) if (!t.has(u) || !da(s, t.get(u), u, e, t, r, n)) return !1;
        return !0;
      case Ab: {
        if (e.size !== t.size) return !1;
        const u = Array.from(e.values()), s = Array.from(t.values());
        for (let c = 0; c < u.length; c++) {
          const d = u[c], f = s.findIndex((v) => da(d, v, void 0, e, t, r, n));
          if (f === -1) return !1;
          s.splice(f, 1);
        }
        return !0;
      }
      case Pb:
      case Ib:
      case kb:
      case jb:
      case Tb:
      case hI:
      case Eb:
      case Cb:
      case Db:
      case pI:
      case Mb:
      case $b:
        if (el(e) !== el(t) || e.length !== t.length) return !1;
        for (let u = 0; u < e.length; u++) if (!da(e[u], t[u], u, e, t, r, n)) return !1;
        return !0;
      case Ob:
        return e.byteLength !== t.byteLength ? !1 : ya(new Uint8Array(e), new Uint8Array(t), r, n);
      case Sb:
        return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : ya(new Uint8Array(e), new Uint8Array(t), r, n);
      case vI:
        return e.name === t.name && e.message === t.message;
      case No: {
        if (!(ya(e.constructor, t.constructor, r, n) || Tm(e) && Tm(t))) return !1;
        const u = [...Object.keys(e), ...Qo(e)], s = [...Object.keys(t), ...Qo(t)];
        if (u.length !== s.length) return !1;
        for (let c = 0; c < u.length; c++) {
          const d = u[c], f = e[d];
          if (!Object.hasOwn(t, d)) return !1;
          const v = t[d];
          if (!da(f, v, d, e, t, r, n)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(e), r.delete(t);
  }
}
function MF(e, t) {
  return DF(e, t, CF);
}
function lP(e, t) {
  if (t < 1)
    return [];
  if (t === 1)
    return e;
  for (var r = [], n = 0; n < e.length; n += t) {
    var i = e[n];
    i !== void 0 && r.push(i);
  }
  return r;
}
function $F(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return zW(n, r);
}
function _F(e, t, r) {
  var n = r === "width", i = e.x, a = e.y, o = e.width, l = e.height;
  return t === 1 ? {
    start: n ? i : a,
    end: n ? i + o : a + l
  } : {
    start: n ? i + o : a + l,
    end: n ? i : a
  };
}
function Da(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function NF(e, t) {
  return lP(e, t + 1);
}
function LF(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = t.start, l = t.end, u = 0, s = 1, c = o, d = function() {
    var h = n?.[u];
    if (h === void 0)
      return {
        v: lP(n, s)
      };
    var p = u, m, g = () => (m === void 0 && (m = r(h, p)), m), w = h.coordinate, x = u === 0 || Da(e, w, g, c, l);
    x || (u = 0, c = o, s += 1), x && (c = w + e * (g() / 2 + i), u += s);
  }, f; s <= a.length; )
    if (f = d(), f) return f.v;
  return [];
}
function RF(e, t, r, n, i) {
  var a = (n || []).slice(), o = a.length;
  if (o === 0)
    return [];
  for (var l = t.start, u = t.end, s = 1; s <= o; s++) {
    for (var c = (o - 1) % s, d = l, f = !0, v = function() {
      var A = n[p];
      if (A == null)
        return 0;
      var P = p, b, O = () => (b === void 0 && (b = r(A, P)), b), I = A.coordinate, E = p === c || Da(e, I, O, d, u);
      if (!E)
        return f = !1, 1;
      E && (d = I + e * (O() / 2 + i));
    }, h, p = c; p < o && (h = v(), !(h !== 0 && h === 1)); p += s)
      ;
    if (f) {
      for (var m = [], g = c; g < o; g += s) {
        var w = n[g];
        w != null && m.push(w);
      }
      return m;
    }
  }
  return [];
}
function Em(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Em(Object(r), !0).forEach(function(n) {
      BF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Em(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function BF(e, t, r) {
  return (t = zF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zF(e) {
  var t = KF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function KF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function WF(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, l = t.start, u = t.end, s = function(f) {
    var v = a[f];
    if (v == null)
      return 1;
    var h = v, p, m = () => (p === void 0 && (p = r(v, f)), p);
    if (f === o - 1) {
      var g = e * (h.coordinate + e * m() / 2 - u);
      a[f] = h = ut(ut({}, h), {}, {
        tickCoord: g > 0 ? h.coordinate - g * e : h.coordinate
      });
    } else
      a[f] = h = ut(ut({}, h), {}, {
        tickCoord: h.coordinate
      });
    if (h.tickCoord != null) {
      var w = Da(e, h.tickCoord, m, l, u);
      w && (u = h.tickCoord - e * (m() / 2 + i), a[f] = ut(ut({}, h), {}, {
        isShow: !0
      }));
    }
  }, c = o - 1; c >= 0; c--)
    s(c);
  return a;
}
function FF(e, t, r, n, i, a) {
  var o = (n || []).slice(), l = o.length, u = t.start, s = t.end;
  if (a) {
    var c = n[l - 1];
    if (c != null) {
      var d = r(c, l - 1), f = e * (c.coordinate + e * d / 2 - s);
      if (o[l - 1] = c = ut(ut({}, c), {}, {
        tickCoord: f > 0 ? c.coordinate - f * e : c.coordinate
      }), c.tickCoord != null) {
        var v = Da(e, c.tickCoord, () => d, u, s);
        v && (s = c.tickCoord - e * (d / 2 + i), o[l - 1] = ut(ut({}, c), {}, {
          isShow: !0
        }));
      }
    }
  }
  for (var h = a ? l - 1 : l, p = function(w) {
    var x = o[w];
    if (x == null)
      return 1;
    var A = x, P, b = () => (P === void 0 && (P = r(x, w)), P);
    if (w === 0) {
      var O = e * (A.coordinate - e * b() / 2 - u);
      o[w] = A = ut(ut({}, A), {}, {
        tickCoord: O < 0 ? A.coordinate - O * e : A.coordinate
      });
    } else
      o[w] = A = ut(ut({}, A), {}, {
        tickCoord: A.coordinate
      });
    if (A.tickCoord != null) {
      var I = Da(e, A.tickCoord, b, u, s);
      I && (u = A.tickCoord + e * (b() / 2 + i), o[w] = ut(ut({}, A), {}, {
        isShow: !0
      }));
    }
  }, m = 0; m < h; m++)
    p(m);
  return o;
}
function tv(e, t, r) {
  var n = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, l = e.orientation, u = e.interval, s = e.tickFormatter, c = e.unit, d = e.angle;
  if (!i || !i.length || !n)
    return [];
  if (L(u) || Mn.isSsr) {
    var f;
    return (f = NF(i, L(u) ? u : 0)) !== null && f !== void 0 ? f : [];
  }
  var v = [], h = l === "top" || l === "bottom" ? "width" : "height", p = c && h === "width" ? ii(c, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, m = (P, b) => {
    var O = typeof s == "function" ? s(P.value, b) : P.value;
    return h === "width" ? $F(ii(O, {
      fontSize: t,
      letterSpacing: r
    }), p, d) : ii(O, {
      fontSize: t,
      letterSpacing: r
    })[h];
  }, g = i[0], w = i[1], x = i.length >= 2 && g != null && w != null ? Ue(w.coordinate - g.coordinate) : 1, A = _F(a, x, h);
  return u === "equidistantPreserveStart" ? LF(x, A, m, i, o) : u === "equidistantPreserveEnd" ? RF(x, A, m, i, o) : (u === "preserveStart" || u === "preserveStartEnd" ? v = FF(x, A, m, i, o, u === "preserveStartEnd") : v = WF(x, A, m, i, o), v.filter((P) => P.isShow));
}
var UF = (e) => {
  var t = e.ticks, r = e.label, n = e.labelGapWithTick, i = n, a = e.tickSize, o = a === void 0 ? 0 : a, l = e.tickMargin, u = l === void 0 ? 0 : l, s = 0;
  if (t) {
    Array.from(t).forEach((v) => {
      if (v) {
        var h = v.getBoundingClientRect();
        h.width > s && (s = h.width);
      }
    });
    var c = r ? r.getBoundingClientRect().width : 0, d = o + u, f = s + d + c + (r ? i : 0);
    return Math.round(f);
  }
  return 0;
}, XF = (e) => {
  var t = e.ticks, r = e.label, n = e.labelGapWithTick, i = n, a = e.tickSize, o = a === void 0 ? 0 : a, l = e.tickMargin, u = l === void 0 ? 0 : l, s = 0;
  if (t) {
    Array.from(t).forEach((v) => {
      if (v) {
        var h = v.getBoundingClientRect();
        h.height > s && (s = h.height);
      }
    });
    var c = r ? r.getBoundingClientRect().height : 0, d = o + u, f = s + d + c + (r ? i : 0);
    return Math.round(f);
  }
  return 0;
}, HF = {
  xAxis: {},
  yAxis: {}
}, uP = ht({
  name: "renderedTicks",
  initialState: HF,
  reducers: {
    setRenderedTicks: (e, t) => {
      var r = t.payload, n = r.axisType, i = r.axisId, a = r.ticks;
      e[n][i] = ye(a);
    },
    removeRenderedTicks: (e, t) => {
      var r = t.payload, n = r.axisType, i = r.axisId;
      delete e[n][i];
    }
  }
}), sP = uP.actions, YF = sP.setRenderedTicks, VF = sP.removeRenderedTicks, GF = uP.reducer, qF = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function Cm(e, t) {
  return eU(e) || QF(e, t) || JF(e, t) || ZF();
}
function ZF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function JF(e, t) {
  if (e) {
    if (typeof e == "string") return Dm(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Dm(e, t) : void 0;
  }
}
function Dm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function QF(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function eU(e) {
  if (Array.isArray(e)) return e;
}
function tU(e, t) {
  if (e == null) return {};
  var r, n, i = rU(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function rU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function En() {
  return En = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, En.apply(null, arguments);
}
function Mm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mm(Object(r), !0).forEach(function(n) {
      nU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function nU(e, t, r) {
  return (t = iU(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function iU(e) {
  var t = aU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function aU(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Dr = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
  zIndex: fe.axis
};
function oU(e) {
  var t = e.x, r = e.y, n = e.width, i = e.height, a = e.orientation, o = e.mirror, l = e.axisLine, u = e.otherSvgProps;
  if (!l)
    return null;
  var s = ze(ze(ze({}, u), oe(l)), {}, {
    fill: "none"
  });
  if (a === "top" || a === "bottom") {
    var c = +(a === "top" && !o || a === "bottom" && o);
    s = ze(ze({}, s), {}, {
      x1: t,
      y1: r + c * i,
      x2: t + n,
      y2: r + c * i
    });
  } else {
    var d = +(a === "left" && !o || a === "right" && o);
    s = ze(ze({}, s), {}, {
      x1: t + d * n,
      y1: r,
      x2: t + d * n,
      y2: r + i
    });
  }
  return /* @__PURE__ */ y("line", En({}, s, {
    className: J("recharts-cartesian-axis-line", yt(l, "className"))
  }));
}
function lU(e, t, r, n, i, a, o, l, u) {
  var s, c, d, f, v, h, p = l ? -1 : 1, m = e.tickSize || o, g = L(e.tickCoord) ? e.tickCoord : e.coordinate;
  switch (a) {
    case "top":
      s = c = e.coordinate, f = r + +!l * i, d = f - p * m, h = d - p * u, v = g;
      break;
    case "left":
      d = f = e.coordinate, c = t + +!l * n, s = c - p * m, v = s - p * u, h = g;
      break;
    case "right":
      d = f = e.coordinate, c = t + +l * n, s = c + p * m, v = s + p * u, h = g;
      break;
    default:
      s = c = e.coordinate, f = r + +l * i, d = f + p * m, h = d + p * u, v = g;
      break;
  }
  return {
    line: {
      x1: s,
      y1: d,
      x2: c,
      y2: f
    },
    tick: {
      x: v,
      y: h
    }
  };
}
function uU(e, t) {
  switch (e) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function sU(e, t) {
  switch (e) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return t ? "start" : "end";
    default:
      return t ? "end" : "start";
  }
}
function cU(e) {
  var t = e.option, r = e.tickProps, n = e.value, i, a = J(r.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ ie(t))
    i = /* @__PURE__ */ Ae(t, ze(ze({}, r), {}, {
      className: a
    }));
  else if (typeof t == "function")
    i = t(ze(ze({}, r), {}, {
      className: a
    }));
  else {
    var o = "recharts-cartesian-axis-tick-value";
    typeof t != "boolean" && (o = J(o, ts(t))), i = /* @__PURE__ */ y(Lr, En({}, r, {
      className: o
    }), n);
  }
  return i;
}
function dU(e) {
  var t = e.ticks, r = e.axisType, n = e.axisId, i = ee(), a = H(null);
  return ae(() => {
    if (!(n == null || r == null)) {
      var o = t.map((u) => ({
        value: u.value,
        coordinate: u.coordinate,
        offset: u.offset,
        index: u.index
      })), l = a.current;
      l != null && l.axisId === n && l.axisType === r && MF(l.ticks, o) || (a.current = {
        ticks: o,
        axisId: n,
        axisType: r
      }, i(YF({
        ticks: o,
        axisId: n,
        axisType: r
      })));
    }
  }, [i, t, n, r]), ae(() => n == null || r == null ? mt : () => {
    i(VF({
      axisId: n,
      axisType: r
    }));
  }, [i, n, r]), null;
}
var fU = /* @__PURE__ */ Pe((e, t) => {
  var r = e.ticks, n = r === void 0 ? [] : r, i = e.tick, a = e.tickLine, o = e.stroke, l = e.tickFormatter, u = e.unit, s = e.padding, c = e.tickTextProps, d = e.orientation, f = e.mirror, v = e.x, h = e.y, p = e.width, m = e.height, g = e.tickSize, w = e.tickMargin, x = e.fontSize, A = e.letterSpacing, P = e.getTicksConfig, b = e.events, O = e.axisType, I = e.axisId, E = tv(ze(ze({}, P), {}, {
    ticks: n
  }), x, A), j = oe(P), T = Tt(i), k = dA(j.textAnchor) ? j.textAnchor : uU(d, f), _ = sU(d, f), $ = {};
  typeof a == "object" && ($ = a);
  var M = ze(ze({}, j), {}, {
    fill: "none"
  }, $), R = E.map((z) => ze({
    entry: z
  }, lU(z, v, h, p, m, d, g, f, w))), K = R.map((z) => {
    var W = z.entry, Z = z.line;
    return /* @__PURE__ */ y(X, {
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(W.value, "-").concat(W.coordinate, "-").concat(W.tickCoord)
    }, a && /* @__PURE__ */ y("line", En({}, M, Z, {
      className: J("recharts-cartesian-axis-tick-line", yt(a, "className"))
    })));
  }), N = R.map((z, W) => {
    var Z, ne, ce = z.entry, ve = z.tick, Te = ze(ze(ze(ze({
      verticalAnchor: _
    }, j), {}, {
      textAnchor: k,
      stroke: "none",
      fill: o
    }, ve), {}, {
      index: W,
      payload: ce,
      visibleTicksCount: E.length,
      tickFormatter: l,
      padding: s
    }, c), {}, {
      angle: (Z = (ne = c?.angle) !== null && ne !== void 0 ? ne : j.angle) !== null && Z !== void 0 ? Z : 0
    }), Ke = ze(ze({}, Te), T);
    return /* @__PURE__ */ y(X, En({
      className: "recharts-cartesian-axis-tick-label",
      key: "tick-label-".concat(ce.value, "-").concat(ce.coordinate, "-").concat(ce.tickCoord)
    }, ir(b, ce, W)), i && /* @__PURE__ */ y(cU, {
      option: i,
      tickProps: Ke,
      value: "".concat(typeof l == "function" ? l(ce.value, W) : ce.value).concat(u || "")
    }));
  });
  return /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-axis-ticks recharts-".concat(O, "-ticks")
  }, /* @__PURE__ */ y(dU, {
    ticks: E,
    axisId: I,
    axisType: O
  }), N.length > 0 && /* @__PURE__ */ y(we, {
    zIndex: fe.label
  }, /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-axis-tick-labels recharts-".concat(O, "-tick-labels"),
    ref: t
  }, N)), K.length > 0 && /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-axis-tick-lines recharts-".concat(O, "-tick-lines")
  }, K));
}), vU = /* @__PURE__ */ Pe((e, t) => {
  var r = e.axisLine, n = e.width, i = e.height, a = e.className, o = e.hide, l = e.ticks, u = e.axisType, s = e.axisId, c = tU(e, qF), d = Ne(""), f = Cm(d, 2), v = f[0], h = f[1], p = Ne(""), m = Cm(p, 2), g = m[0], w = m[1], x = H(null);
  Yc(t, () => ({
    getCalculatedWidth: () => {
      var P;
      return UF({
        ticks: x.current,
        label: (P = e.labelRef) === null || P === void 0 ? void 0 : P.current,
        labelGapWithTick: 5,
        tickSize: e.tickSize,
        tickMargin: e.tickMargin
      });
    },
    getCalculatedHeight: () => {
      var P;
      return XF({
        ticks: x.current,
        label: (P = e.labelRef) === null || P === void 0 ? void 0 : P.current,
        labelGapWithTick: 5,
        tickSize: e.tickSize,
        tickMargin: e.tickMargin
      });
    }
  }));
  var A = ue((P) => {
    if (P) {
      var b = P.getElementsByClassName("recharts-cartesian-axis-tick-value");
      x.current = b;
      var O = b[0];
      if (O) {
        var I = window.getComputedStyle(O), E = I.fontSize, j = I.letterSpacing;
        (E !== v || j !== g) && (h(E), w(j));
      }
    }
  }, [v, g]);
  return o || n != null && n <= 0 || i != null && i <= 0 ? null : /* @__PURE__ */ y(we, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ y(X, {
    className: J("recharts-cartesian-axis", a)
  }, /* @__PURE__ */ y(oU, {
    x: e.x,
    y: e.y,
    width: n,
    height: i,
    orientation: e.orientation,
    mirror: e.mirror,
    axisLine: r,
    otherSvgProps: oe(e)
  }), /* @__PURE__ */ y(fU, {
    ref: A,
    axisType: u,
    events: c,
    fontSize: v,
    getTicksConfig: e,
    height: e.height,
    letterSpacing: g,
    mirror: e.mirror,
    orientation: e.orientation,
    padding: e.padding,
    stroke: e.stroke,
    tick: e.tick,
    tickFormatter: e.tickFormatter,
    tickLine: e.tickLine,
    tickMargin: e.tickMargin,
    tickSize: e.tickSize,
    tickTextProps: e.tickTextProps,
    ticks: l,
    unit: e.unit,
    width: e.width,
    x: e.x,
    y: e.y,
    axisId: s
  }), /* @__PURE__ */ y(Vu, {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    lowerWidth: e.width,
    upperWidth: e.width
  }, /* @__PURE__ */ y(qu, {
    label: e.label,
    labelRef: e.labelRef
  }), e.children)));
}), rv = /* @__PURE__ */ Pe((e, t) => {
  var r = re(e, Dr);
  return /* @__PURE__ */ y(vU, En({}, r, {
    ref: t
  }));
});
rv.displayName = "CartesianAxis";
var hU = {
  grid: {
    stroke: "#ccc",
    fill: "none"
  }
}, cP = /* @__PURE__ */ We(hU), F6 = cP.Provider, pU = () => Ze(cP), yU = ["x1", "y1", "x2", "y2", "key"], mU = ["offset"], gU = ["xAxisId", "yAxisId"], bU = ["xAxisId", "yAxisId"];
function $m(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $m(Object(r), !0).forEach(function(n) {
      xU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $m(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xU(e, t, r) {
  return (t = wU(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wU(e) {
  var t = AU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AU(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gn() {
  return gn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gn.apply(null, arguments);
}
function Ul(e, t) {
  if (e == null) return {};
  var r, n, i = PU(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function PU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var OU = (e) => {
  var t = e.fill;
  if (!t || t === "none")
    return null;
  var r = e.fillOpacity, n = e.x, i = e.y, a = e.width, o = e.height, l = e.ry;
  return /* @__PURE__ */ y("rect", {
    x: n,
    y: i,
    ry: l,
    width: a,
    height: o,
    stroke: "none",
    fill: t,
    fillOpacity: r,
    className: "recharts-cartesian-grid-bg"
  });
};
function dP(e) {
  var t = e.option, r = e.lineItemProps, n;
  if (/* @__PURE__ */ ie(t))
    n = /* @__PURE__ */ Ae(t, r);
  else if (typeof t == "function")
    n = t(r);
  else {
    var i, a = r.x1, o = r.y1, l = r.x2, u = r.y2, s = r.key, c = Ul(r, yU), d = (i = oe(c)) !== null && i !== void 0 ? i : {};
    d.offset;
    var f = Ul(d, mU), v = Array.isArray(f.strokeDasharray) ? f.strokeDasharray.join(",") : f.strokeDasharray;
    n = /* @__PURE__ */ y("line", gn({}, f, {
      strokeDasharray: v,
      x1: a,
      y1: o,
      x2: l,
      y2: u,
      fill: "none",
      key: s
    }));
  }
  return n;
}
function SU(e) {
  var t = e.x, r = e.width, n = e.horizontal, i = n === void 0 ? !0 : n, a = e.horizontalPoints;
  if (!i || !a || !a.length)
    return null;
  e.xAxisId, e.yAxisId;
  var o = Ul(e, gU), l = a.map((u, s) => {
    var c = ct(ct({}, o), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return /* @__PURE__ */ y(dP, {
      key: "line-".concat(s),
      option: i,
      lineItemProps: c
    });
  });
  return /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, l);
}
function IU(e) {
  var t = e.y, r = e.height, n = e.vertical, i = n === void 0 ? !0 : n, a = e.verticalPoints;
  if (!i || !a || !a.length)
    return null;
  e.xAxisId, e.yAxisId;
  var o = Ul(e, bU), l = a.map((u, s) => {
    var c = ct(ct({}, o), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return /* @__PURE__ */ y(dP, {
      option: i,
      lineItemProps: c,
      key: "line-".concat(s)
    });
  });
  return /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-grid-vertical"
  }, l);
}
function kU(e) {
  var t = e.horizontalFill, r = e.fillOpacity, n = e.x, i = e.y, a = e.width, o = e.height, l = e.horizontalPoints, u = e.horizontal, s = u === void 0 ? !0 : u;
  if (!s || !t || !t.length || l == null)
    return null;
  var c = l.map((f) => Math.round(f + i - i)).sort((f, v) => f - v);
  i !== c[0] && c.unshift(0);
  var d = c.map((f, v) => {
    var h = c[v + 1], p = h == null, m = p ? i + o - f : h - f;
    if (m <= 0)
      return null;
    var g = v % t.length;
    return /* @__PURE__ */ y("rect", {
      key: "react-".concat(v),
      y: f,
      x: n,
      height: m,
      width: a,
      stroke: "none",
      fill: t[g],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, d);
}
function jU(e) {
  var t = e.vertical, r = t === void 0 ? !0 : t, n = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, l = e.width, u = e.height, s = e.verticalPoints;
  if (!r || !n || !n.length)
    return null;
  var c = s.map((f) => Math.round(f + a - a)).sort((f, v) => f - v);
  a !== c[0] && c.unshift(0);
  var d = c.map((f, v) => {
    var h = c[v + 1], p = h == null, m = p ? a + l - f : h - f;
    if (m <= 0)
      return null;
    var g = v % n.length;
    return /* @__PURE__ */ y("rect", {
      key: "react-".concat(v),
      x: f,
      y: o,
      width: m,
      height: u,
      stroke: "none",
      fill: n[g],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, d);
}
var TU = (e, t) => {
  var r = e.xAxis, n = e.width, i = e.height, a = e.offset;
  return O0(tv(ct(ct(ct({}, Dr), r), {}, {
    ticks: S0(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.left, a.left + a.width, t);
}, EU = (e, t) => {
  var r = e.yAxis, n = e.width, i = e.height, a = e.offset;
  return O0(tv(ct(ct(ct({}, Dr), r), {}, {
    ticks: S0(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.top, a.top + a.height, t);
}, CU = {
  horizontal: !0,
  vertical: !0,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0,
  syncWithTicks: !1,
  zIndex: fe.grid
};
function DU(e) {
  var t, r, n, i, a, o, l = Ii(), u = ki(), s = $0(), c = ct(ct({}, re(e, CU)), {}, {
    x: L(e.x) ? e.x : s.left,
    y: L(e.y) ? e.y : s.top,
    width: L(e.width) ? e.width : s.width,
    height: L(e.height) ? e.height : s.height
  }), d = c.xAxisId, f = c.yAxisId, v = c.x, h = c.y, p = c.width, m = c.height, g = c.syncWithTicks, w = c.horizontalValues, x = c.verticalValues, A = se(), P = C((K) => ty(K, "xAxis", d, A)), b = C((K) => ty(K, "yAxis", f, A)), O = pU(), I = {
    stroke: (t = c.stroke) !== null && t !== void 0 ? t : O.grid.stroke,
    strokeWidth: (r = c.strokeWidth) !== null && r !== void 0 ? r : O.grid.strokeWidth,
    strokeOpacity: (n = c.strokeOpacity) !== null && n !== void 0 ? n : O.grid.strokeOpacity,
    strokeDasharray: (i = c.strokeDasharray) !== null && i !== void 0 ? i : O.grid.strokeDasharray
  };
  if (!Pt(p) || !Pt(m) || !L(v) || !L(h))
    return null;
  var E = c.verticalCoordinatesGenerator || TU, j = c.horizontalCoordinatesGenerator || EU, T = c.horizontalPoints, k = c.verticalPoints;
  if ((!T || !T.length) && typeof j == "function") {
    var _ = w && w.length, $ = j({
      yAxis: b ? ct(ct({}, b), {}, {
        ticks: _ ? w : b.ticks
      }) : void 0,
      width: l ?? p,
      height: u ?? m,
      offset: s
    }, _ ? !0 : g);
    Aa(Array.isArray($), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof $, "]")), Array.isArray($) && (T = $);
  }
  if ((!k || !k.length) && typeof E == "function") {
    var M = x && x.length, R = E({
      xAxis: P ? ct(ct({}, P), {}, {
        ticks: M ? x : P.ticks
      }) : void 0,
      width: l ?? p,
      height: u ?? m,
      offset: s
    }, M ? !0 : g);
    Aa(Array.isArray(R), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof R, "]")), Array.isArray(R) && (k = R);
  }
  return /* @__PURE__ */ y(we, {
    zIndex: c.zIndex
  }, /* @__PURE__ */ y("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ y(OU, {
    fill: (a = c.fill) !== null && a !== void 0 ? a : O.grid.fill,
    fillOpacity: (o = c.fillOpacity) !== null && o !== void 0 ? o : O.grid.fillOpacity,
    x: c.x,
    y: c.y,
    width: c.width,
    height: c.height,
    ry: c.ry
  }), /* @__PURE__ */ y(kU, gn({}, c, {
    horizontalPoints: T
  })), /* @__PURE__ */ y(jU, gn({}, c, {
    verticalPoints: k
  })), /* @__PURE__ */ y(SU, gn({}, c, I, {
    offset: s,
    horizontalPoints: T,
    xAxis: P,
    yAxis: b
  })), /* @__PURE__ */ y(IU, gn({}, c, I, {
    offset: s,
    verticalPoints: k,
    xAxis: P,
    yAxis: b
  }))));
}
DU.displayName = "CartesianGrid";
var MU = ["animationElapsedTime", "isAnimating", "isEntrance", "visibleLength", "strokeDasharray", "connectNulls"];
function _c() {
  return _c = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, _c.apply(null, arguments);
}
function $U(e, t) {
  if (e == null) return {};
  var r, n, i = _U(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function _U(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function NU(e) {
  try {
    return e && e.getTotalLength && e.getTotalLength() || 0;
  } catch {
    return 0;
  }
}
function fP(e, t) {
  return "".concat(t, "px ").concat(e, "px");
}
function LU(e) {
  return e.length % 2 !== 0 ? [...e, ...e] : e;
}
function RU(e, t) {
  for (var r = [], n = 0; n < t; ++n)
    r.push(...e);
  return r;
}
function BU(e, t, r) {
  var n = LU(r), i = n.reduce((v, h) => v + h, 0);
  if (!i)
    return fP(t, e);
  for (var a = Math.floor(e / i), o = e % i, l = [], u = 0, s = 0; u < n.length; s += (c = n[u]) !== null && c !== void 0 ? c : 0, ++u) {
    var c, d = n[u];
    if (d != null && s + d > o) {
      l = [...n.slice(0, u), o - s];
      break;
    }
  }
  var f = l.length % 2 === 0 ? [0, t] : [t];
  return [...RU(n, a), ...l, ...f].map((v) => "".concat(v, "px")).join(", ");
}
function zU(e, t, r) {
  if (e) {
    var n = "".concat(e).split(/[,\s]+/gim).map((i) => parseFloat(i));
    return BU(r, t, n);
  }
  return fP(t, r);
}
function KU(e) {
  e.animationElapsedTime, e.isAnimating, e.isEntrance;
  var t = e.visibleLength, r = e.strokeDasharray, n = e.connectNulls, i = $U(e, MU), a = n ?? !1, o;
  if (t != null) {
    var l, u = i.pathRef, s = NU((l = u?.current) !== null && l !== void 0 ? l : null);
    o = zU(r, s, t);
  } else r != null && (o = String(r));
  return /* @__PURE__ */ y(xn, _c({}, i, {
    connectNulls: a,
    strokeDasharray: o
  }));
}
function WU(e) {
  var t = H(0), r = H(0), n = H(!1), i = H(e);
  return i.current !== e && (t.current = r.current, i.current = e), ue((a, o) => {
    if (n.current)
      return null;
    var l = Math.min(kr(t.current + a * o), o);
    return a > 0 && o > 0 && (r.current = Math.max(r.current, l), l >= o) ? (n.current = !0, null) : l;
  }, []);
}
var FU = {}, vP = ht({
  name: "errorBars",
  initialState: FU,
  reducers: {
    addErrorBar: (e, t) => {
      var r = t.payload, n = r.itemId, i = r.errorBar;
      e[n] || (e[n] = []), e[n].push(i);
    },
    replaceErrorBar: (e, t) => {
      var r = t.payload, n = r.itemId, i = r.prev, a = r.next;
      e[n] && (e[n] = e[n].map((o) => o.dataKey === i.dataKey && o.direction === i.direction ? a : o));
    },
    removeErrorBar: (e, t) => {
      var r = t.payload, n = r.itemId, i = r.errorBar;
      e[n] && (e[n] = e[n].filter((a) => a.dataKey !== i.dataKey || a.direction !== i.direction));
    }
  }
}), nv = vP.actions, UU = nv.addErrorBar, XU = nv.replaceErrorBar, HU = nv.removeErrorBar, YU = vP.reducer, VU = ["children"];
function GU(e, t) {
  if (e == null) return {};
  var r, n, i = qU(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function qU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var ZU = {
  data: [],
  xAxisId: "xAxis-0",
  yAxisId: "yAxis-0",
  dataPointFormatter: () => ({
    x: 0,
    y: 0,
    value: 0
  }),
  errorBarOffset: 0
}, hP = /* @__PURE__ */ We(ZU);
function iv(e) {
  var t = e.children, r = GU(e, VU);
  return /* @__PURE__ */ y(hP.Provider, {
    value: r
  }, t);
}
var JU = () => Ze(hP);
function QU(e) {
  var t = ee(), r = vB(), n = H(null);
  return ae(() => {
    r != null && (n.current === null ? t(UU({
      itemId: r,
      errorBar: e
    })) : n.current !== e && t(XU({
      itemId: r,
      prev: n.current,
      next: e
    })), n.current = e);
  }, [t, r, e]), ae(() => () => {
    n.current != null && r != null && (t(HU({
      itemId: r,
      errorBar: n.current
    })), n.current = null);
  }, [t, r]), null;
}
function vo(e, t) {
  var r, n, i = C((s) => br(s, e)), a = C((s) => xr(s, t)), o = (r = i?.allowDataOverflow) !== null && r !== void 0 ? r : Ve.allowDataOverflow, l = (n = a?.allowDataOverflow) !== null && n !== void 0 ? n : Ge.allowDataOverflow, u = o || l;
  return {
    needClip: u,
    needClipX: o,
    needClipY: l
  };
}
function ls(e) {
  var t = e.xAxisId, r = e.yAxisId, n = e.clipPathId, i = fo(), a = vo(t, r), o = a.needClipX, l = a.needClipY, u = a.needClip, s = C((x) => pw(x, t, !1)), c = C((x) => yw(x, r, !1));
  if (!u || !i)
    return null;
  var d = i.x, f = i.y, v = i.width, h = i.height, p = o && s ? Math.min(s[0], s[1]) : d - v / 2, m = l && c ? Math.min(c[0], c[1]) : f - h / 2, g = o && s ? Math.abs(s[1] - s[0]) : v * 2, w = l && c ? Math.abs(c[1] - c[0]) : h * 2;
  return /* @__PURE__ */ y("clipPath", {
    id: "clipPath-".concat(n)
  }, /* @__PURE__ */ y("rect", {
    x: p,
    y: m,
    width: g,
    height: w
  }));
}
var pP = (e, t, r, n) => St(e, "xAxis", t, n), yP = (e, t, r, n) => Xt(e, "xAxis", t, n), mP = (e, t, r, n) => St(e, "yAxis", r, n), gP = (e, t, r, n) => Xt(e, "yAxis", r, n), eX = S([te, pP, mP, yP, gP], (e, t, r, n, i) => Dt(e, "xAxis") ? Ot(t, n, !1) : Ot(r, i, !1)), tX = (e, t, r, n, i) => i;
function rX(e) {
  return e.type === "line";
}
var nX = S([Bn, tX], (e, t) => e.filter(rX).find((r) => r.id === t)), iX = S([te, pP, mP, yP, gP, nX, eX, Ti], (e, t, r, n, i, a, o, l) => {
  var u = l.chartData, s = l.dataStartIndex, c = l.dataEndIndex;
  if (!(a == null || t == null || r == null || n == null || i == null || n.length === 0 || i.length === 0 || o == null || e !== "horizontal" && e !== "vertical")) {
    var d = a.dataKey, f = a.data, v;
    if (f != null && f.length > 0 ? v = f : v = u?.slice(s, c + 1), v != null)
      return SX({
        layout: e,
        xAxis: t,
        yAxis: r,
        xAxisTicks: n,
        yAxisTicks: i,
        dataKey: d,
        bandSize: o,
        displayedData: v
      });
  }
});
function bP(e) {
  var t = Tt(e), r = 3, n = 2;
  if (t != null) {
    var i = t.r, a = t.strokeWidth, o = Number(i), l = Number(a);
    return (Number.isNaN(o) || o < 0) && (o = r), (Number.isNaN(l) || l < 0) && (l = n), {
      r: o,
      strokeWidth: l
    };
  }
  return {
    r,
    strokeWidth: n
  };
}
var aX = ["id"], oX = ["type", "layout", "connectNulls", "needClip", "shape", "strokeDasharray"], lX = ["activeDot", "animateNewValues", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "hide", "isAnimationActive", "label", "legendType", "xAxisId", "yAxisId", "id"];
function Xl() {
  return Xl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xl.apply(null, arguments);
}
function av(e, t) {
  if (e == null) return {};
  var r, n, i = uX(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function uX(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function _m(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function cr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _m(Object(r), !0).forEach(function(n) {
      sX(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _m(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function sX(e, t, r) {
  return (t = cX(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cX(e) {
  var t = dX(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dX(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fX(e) {
  try {
    return e && e.getTotalLength && e.getTotalLength() || 0;
  } catch {
    return 0;
  }
}
function vX(e) {
  var t = 0, r = 0;
  for (var n of e)
    n.status === "matched" && n.prev.x != null && n.next.x != null && (t += n.next.x - n.prev.x, r++);
  return r > 0 ? t / r : 0;
}
var hX = (e, t) => {
  if (e == null)
    return [];
  if (t === 1) return e.flatMap((l) => l.status === "removed" ? [] : [l.next]);
  var r = vX(e), n = [];
  for (var i of e)
    if (i.status === "matched")
      n.push(cr(cr({}, i.next), {}, {
        x: V(i.prev.x, i.next.x, t),
        y: V(i.prev.y, i.next.y, t)
      }));
    else if (i.status === "added")
      if (i.next.x != null) {
        var a = i.next.x - r;
        n.push(cr(cr({}, i.next), {}, {
          x: V(a, i.next.x, t),
          y: i.next.y
        }));
      } else
        n.push(i.next);
    else if (i.status === "removed" && i.prev.x != null) {
      var o = i.prev.x + r;
      n.push(cr(cr({}, i.prev), {}, {
        x: V(i.prev.x, o, t),
        y: i.prev.y
      }));
    }
  return n;
}, ov = {
  activeDot: !0,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: hX,
  animationMatchBy: co,
  connectNulls: !1,
  dot: !0,
  fill: "#fff",
  hide: !1,
  isAnimationActive: "auto",
  label: !1,
  legendType: "line",
  shape: KU,
  stroke: "#3182bd",
  strokeWidth: 1,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: fe.line,
  type: "linear"
}, pX = (e) => {
  var t = e.dataKey, r = e.name, n = e.stroke, i = e.legendType, a = e.hide;
  return [{
    inactive: a,
    dataKey: t,
    type: i,
    color: n,
    value: Mt(r, t),
    payload: e
  }];
}, yX = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.data, n = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, l = e.hide, u = e.unit, s = e.formatter, c = e.tooltipType, d = e.id, f = {
    dataDefinedOnItem: r,
    getPosition: mt,
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      dataKey: t,
      nameKey: void 0,
      name: Mt(o, t),
      hide: l,
      type: c,
      color: n,
      unit: u,
      formatter: s,
      graphicalItemId: d
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: f
  });
});
function mX(e) {
  var t = e.clipPathId, r = e.points, n = e.props, i = n.dot, a = n.dataKey, o = n.needClip;
  n.id;
  var l = av(n, aX), u = oe(l);
  return /* @__PURE__ */ y(Vf, {
    points: r,
    dot: i,
    className: "recharts-line-dots",
    dotClassName: "recharts-line-dot",
    dataKey: a,
    baseProps: u,
    needClip: o,
    clipPathId: t
  });
}
function gX(e) {
  var t = e.showLabels, r = e.children, n = e.points, i = xe(() => n?.map((a) => {
    var o, l, u = {
      x: (o = a.x) !== null && o !== void 0 ? o : 0,
      y: (l = a.y) !== null && l !== void 0 ? l : 0,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return cr(cr({}, u), {}, {
      value: a.value,
      payload: a.payload,
      viewBox: u,
      /*
       * Line is not passing parentViewBox to the LabelList so the labels can escape - looks like a bug, should we pass parentViewBox?
       * Or should this just be the root chart viewBox?
       */
      parentViewBox: void 0,
      fill: void 0
    });
  }), [n]);
  return /* @__PURE__ */ y(zi, {
    value: t ? i : void 0
  }, r);
}
function bX(e) {
  var t = e.clipPathId, r = e.pathRef, n = e.points, i = e.props, a = e.animationElapsedTime, o = e.isAnimating, l = e.isEntrance, u = e.visibleLength, s = i.type, c = i.layout, d = i.connectNulls, f = i.needClip, v = i.shape, h = i.strokeDasharray, p = av(i, oX), m = cr(cr({}, $e(p)), {}, {
    fill: "none",
    className: "recharts-line-curve",
    clipPath: f ? "url(#clipPath-".concat(t, ")") : void 0,
    points: n,
    type: s,
    layout: c,
    connectNulls: d,
    strokeDasharray: h ?? i.strokeDasharray,
    pathRef: r,
    animationElapsedTime: a,
    isAnimating: o,
    isEntrance: i.animateNewValues ? l : !1,
    visibleLength: u
  });
  return /* @__PURE__ */ y(le, null, n?.length > 1 && /* @__PURE__ */ y(Jr, {
    option: v,
    DefaultShape: ov.shape,
    shapeProps: m
  }), /* @__PURE__ */ y(mX, {
    points: n,
    clipPathId: t,
    props: i
  }));
}
function xX(e) {
  var t = e.clipPathId, r = e.props, n = e.pathRef, i = e.previousPointsRef, a = r.points, o = r.isAnimationActive, l = r.animationBegin, u = r.animationDuration, s = r.animationEasing, c = r.animationMatchBy, d = r.animationInterpolateFn, f = r.layout, v = fX(n.current), h = an(r.onAnimationStart, r.onAnimationEnd), p = h.isAnimating, m = h.handleAnimationStart, g = h.handleAnimationEnd, w = !p, x = WU(a), A = ue((P) => P > 0 && v > 0, [v]);
  return /* @__PURE__ */ y(gX, {
    points: a,
    showLabels: w
  }, r.children, /* @__PURE__ */ y(on, {
    animationInput: a,
    animationIdPrefix: "recharts-line-",
    items: a,
    previousItemsRef: i,
    isAnimationActive: o,
    animationBegin: l,
    animationDuration: u,
    animationEasing: s,
    onAnimationStart: m,
    onAnimationEnd: g,
    animationInterpolateFn: d,
    animationMatchBy: c,
    shouldUpdatePreviousRef: A,
    layout: f
  }, (P, b, O) => {
    var I = p || b < 1, E = I ? x(b, v) : null;
    return /* @__PURE__ */ y(bX, {
      props: r,
      points: P,
      clipPathId: t,
      pathRef: n,
      animationElapsedTime: b,
      isAnimating: I,
      isEntrance: O,
      visibleLength: E
    });
  }), /* @__PURE__ */ y(rn, {
    label: r.label
  }));
}
function wX(e) {
  var t = e.clipPathId, r = e.props, n = H(null), i = H(null);
  return /* @__PURE__ */ y(xX, {
    props: r,
    clipPathId: t,
    previousPointsRef: n,
    pathRef: i
  });
}
var AX = (e, t) => {
  var r, n;
  return {
    x: (r = e.x) !== null && r !== void 0 ? r : void 0,
    y: (n = e.y) !== null && n !== void 0 ? n : void 0,
    value: e.value,
    // getValueByDataKey does not validate the output type
    errorVal: G(e.payload, t)
  };
};
class PX extends zg {
  render() {
    var t = this.props, r = t.hide, n = t.dot, i = t.points, a = t.className, o = t.xAxisId, l = t.yAxisId, u = t.top, s = t.left, c = t.width, d = t.height, f = t.id, v = t.needClip, h = t.zIndex;
    if (r)
      return null;
    var p = J("recharts-line", a), m = f, g = bP(n), w = g.r, x = g.strokeWidth, A = Ff(n), P = w * 2 + x, b = v ? "url(#clipPath-".concat(A ? "" : "dots-").concat(m, ")") : void 0;
    return /* @__PURE__ */ y(we, {
      zIndex: h
    }, /* @__PURE__ */ y(X, {
      className: p
    }, v && /* @__PURE__ */ y("defs", null, /* @__PURE__ */ y(ls, {
      clipPathId: m,
      xAxisId: o,
      yAxisId: l
    }), !A && /* @__PURE__ */ y("clipPath", {
      id: "clipPath-dots-".concat(m)
    }, /* @__PURE__ */ y("rect", {
      x: s - P / 2,
      y: u - P / 2,
      width: c + P,
      height: d + P
    }))), /* @__PURE__ */ y(iv, {
      xAxisId: o,
      yAxisId: l,
      data: i,
      dataPointFormatter: AX,
      errorBarOffset: 0
    }, /* @__PURE__ */ y(wX, {
      props: this.props,
      clipPathId: m
    }))), /* @__PURE__ */ y(Bl, {
      activeDot: this.props.activeDot,
      points: i,
      mainColor: this.props.stroke,
      itemDataKey: this.props.dataKey,
      clipPath: b
    }));
  }
}
function OX(e) {
  var t = re(e, ov), r = t.activeDot, n = t.animateNewValues, i = t.animationBegin, a = t.animationDuration, o = t.animationEasing, l = t.connectNulls, u = t.dot, s = t.hide, c = t.isAnimationActive, d = t.label, f = t.legendType, v = t.xAxisId, h = t.yAxisId, p = t.id, m = av(t, lX), g = vo(v, h), w = g.needClip, x = fo(), A = Rr(), P = se(), b = C((T) => iX(T, v, h, P, p));
  if (A !== "horizontal" && A !== "vertical" || b == null || x == null)
    return null;
  var O = x.height, I = x.width, E = x.x, j = x.y;
  return /* @__PURE__ */ y(PX, Xl({}, m, {
    id: p,
    connectNulls: l,
    dot: u,
    activeDot: r,
    animateNewValues: n,
    animationBegin: i,
    animationDuration: a,
    animationEasing: o,
    isAnimationActive: c,
    hide: s,
    label: d,
    legendType: f,
    xAxisId: v,
    yAxisId: h,
    points: b,
    layout: A,
    height: O,
    width: I,
    left: E,
    top: j,
    needClip: w
  }));
}
function SX(e) {
  var t = e.layout, r = e.xAxis, n = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, l = e.bandSize, u = e.displayedData;
  return u.map((s, c) => {
    var d = G(s, o);
    if (t === "horizontal") {
      var f = si({
        axis: r,
        ticks: i,
        bandSize: l,
        entry: s,
        index: c
      }), v = he(d) ? null : n.scale.map(d);
      return {
        x: f,
        y: v ?? null,
        value: d,
        payload: s
      };
    }
    var h = he(d) ? null : r.scale.map(d), p = si({
      axis: n,
      ticks: a,
      bandSize: l,
      entry: s,
      index: c
    });
    return h == null || p == null ? null : {
      x: h,
      y: p,
      value: d,
      payload: s
    };
  }).filter(Boolean);
}
function IX(e) {
  var t = re(e, ov), r = se();
  return /* @__PURE__ */ y(or, {
    id: t.id,
    type: "line"
  }, (n) => /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(rs, {
    legendPayload: pX(t)
  }), /* @__PURE__ */ y(yX, {
    dataKey: t.dataKey,
    data: t.data,
    stroke: t.stroke,
    strokeWidth: t.strokeWidth,
    fill: t.fill,
    name: t.name,
    hide: t.hide,
    unit: t.unit,
    formatter: t.formatter,
    tooltipType: t.tooltipType,
    id: n
  }), /* @__PURE__ */ y(ns, {
    type: "line",
    id: n,
    data: t.data,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    dataKey: t.dataKey,
    hide: t.hide,
    isPanorama: r
  }), /* @__PURE__ */ y(OX, Xl({}, t, {
    id: n
  }))));
}
var kX = /* @__PURE__ */ De(IX, Br);
kX.displayName = "Line";
function Ar(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.xAxisId) !== null && r !== void 0 ? r : vt;
}
function Pr(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.yAxisId) !== null && r !== void 0 ? r : vt;
}
var xP = (e, t, r) => St(e, "xAxis", Ar(e, t), r), wP = (e, t, r) => Xt(e, "xAxis", Ar(e, t), r), AP = (e, t, r) => St(e, "yAxis", Pr(e, t), r), PP = (e, t, r) => Xt(e, "yAxis", Pr(e, t), r), jX = S([te, xP, AP, wP, PP], (e, t, r, n, i) => Dt(e, "xAxis") ? Ot(t, n, !1) : Ot(r, i, !1)), TX = (e, t) => t, lv = S([Bn, TX], (e, t) => e.filter((r) => r.type === "area").find((r) => r.id === t)), OP = (e) => {
  var t = te(e), r = Dt(t, "xAxis");
  return r ? "yAxis" : "xAxis";
}, EX = (e, t) => {
  var r = OP(e);
  return r === "yAxis" ? Pr(e, t) : Ar(e, t);
}, SP = (e, t, r) => Cl(e, OP(e), EX(e, t), r), CX = S([lv, SP], (e, t) => {
  var r;
  if (!(e == null || t == null)) {
    var n = e.stackId, i = Du(e);
    if (!(n == null || i == null)) {
      var a = (r = t[n]) === null || r === void 0 ? void 0 : r.stackedData, o = a?.find((l) => l.key === i);
      if (o != null)
        return o.map((l) => [l[0], l[1]]);
    }
  }
}), DX = S([lv, SP], (e, t) => {
  if (!(e == null || e.stackId == null || t == null)) {
    var r = t[e.stackId];
    if (r != null)
      return r.graphicalItems.map((n) => n.dataKey).filter(rt);
  }
}), MX = S([te, xP, AP, wP, PP, CX, G0, jX, lv, QE, DX], (e, t, r, n, i, a, o, l, u, s, c) => {
  var d = o.chartData, f = o.dataStartIndex, v = o.dataEndIndex;
  if (!(u == null || e !== "horizontal" && e !== "vertical" || t == null || r == null || n == null || i == null || n.length === 0 || i.length === 0 || l == null)) {
    var h = u.data, p;
    if (h && h.length > 0 ? p = h : p = d?.slice(f, v + 1), p != null)
      return a3({
        layout: e,
        xAxis: t,
        yAxis: r,
        xAxisTicks: n,
        yAxisTicks: i,
        dataStartIndex: f,
        areaSettings: u,
        stackedData: a,
        displayedData: p,
        chartBaseValue: s,
        bandSize: l,
        stackDataKeys: c
      });
  }
}), $X = ["animationElapsedTime", "isAnimating", "isEntrance", "layout", "isRange", "stroke", "connectNulls"], _X = ["id", "baseLine"];
function ma() {
  return ma = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ma.apply(null, arguments);
}
function Nm(e, t) {
  if (e == null) return {};
  var r, n, i = NX(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function NX(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function LX(e) {
  var t, r, n = e.alpha, i = e.baseLine, a = e.points, o = e.strokeWidth, l = (t = a[0]) === null || t === void 0 ? void 0 : t.x, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.x;
  if (!Q(l) || !Q(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((d) => d.y || 0));
  return L(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((d) => d.y || 0), c)), L(c) ? /* @__PURE__ */ y("rect", {
    x: l < u ? l : l - s,
    y: 0,
    width: s,
    height: Math.floor(c + (o ? parseInt("".concat(o), 10) : 1))
  }) : null;
}
function RX(e) {
  var t, r, n = e.alpha, i = e.baseLine, a = e.points, o = e.strokeWidth, l = (t = a[0]) === null || t === void 0 ? void 0 : t.y, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.y;
  if (!Q(l) || !Q(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((d) => d.x || 0));
  return L(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((d) => d.x || 0), c)), L(c) ? /* @__PURE__ */ y("rect", {
    x: 0,
    y: l < u ? l : l - s,
    width: c + (o ? parseInt("".concat(o), 10) : 1),
    height: Math.floor(s)
  }) : null;
}
function BX(e) {
  var t = e.alpha, r = e.layout, n = e.points, i = e.baseLine, a = e.strokeWidth;
  return r === "vertical" ? /* @__PURE__ */ y(RX, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  }) : /* @__PURE__ */ y(LX, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  });
}
function zX(e) {
  var t = e.animationElapsedTime, r = t === void 0 ? 1 : t, n = e.isAnimating, i = n === void 0 ? !1 : n, a = e.isEntrance, o = a === void 0 ? !1 : a, l = e.layout, u = e.isRange, s = e.stroke, c = e.connectNulls, d = Nm(e, $X), f = l === "vertical" ? "vertical" : "horizontal", v = c ?? !1, h = $A(), p = d.id, m = d.baseLine, g = Nm(d, _X), w = oe(g), x = /* @__PURE__ */ y(xn, ma({}, d, {
    id: p,
    baseLine: m,
    connectNulls: v,
    stroke: "none",
    className: "recharts-area-area",
    layout: f
  })), A = s !== "none" && /* @__PURE__ */ y(xn, ma({}, w, {
    className: "recharts-area-curve",
    layout: f,
    type: d.type,
    connectNulls: v,
    fill: "none",
    stroke: s,
    points: d.points
  })), P = s !== "none" && u && Array.isArray(m) && /* @__PURE__ */ y(xn, ma({}, w, {
    className: "recharts-area-curve",
    layout: f,
    type: d.type,
    connectNulls: v,
    fill: "none",
    stroke: s,
    points: m
  }));
  if (o && (i || r < 1)) {
    var b;
    return /* @__PURE__ */ y(X, null, /* @__PURE__ */ y("defs", null, /* @__PURE__ */ y("clipPath", {
      id: h
    }, /* @__PURE__ */ y(BX, {
      alpha: r,
      points: (b = d.points) !== null && b !== void 0 ? b : [],
      baseLine: m,
      layout: f,
      strokeWidth: d.strokeWidth
    }))), /* @__PURE__ */ y(X, {
      clipPath: "url(#".concat(h, ")")
    }, x, A, P));
  }
  return /* @__PURE__ */ y(le, null, x, A, P);
}
var KX = ["id"], WX = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function Hl() {
  return Hl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hl.apply(null, arguments);
}
function IP(e, t) {
  if (e == null) return {};
  var r, n, i = FX(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function FX(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Lm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function gi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lm(Object(r), !0).forEach(function(n) {
      UX(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function UX(e, t, r) {
  return (t = XX(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XX(e) {
  var t = HX(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HX(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var YX = (e, t) => e == null ? [] : t === 1 ? e.flatMap((r) => r.status === "removed" ? [] : [r.next]) : e.flatMap((r) => r.status === "matched" ? [gi(gi({}, r.next), {}, {
  x: V(r.prev.x, r.next.x, t),
  y: V(r.prev.y, r.next.y, t)
})] : r.status === "added" ? [r.next] : []), kP = {
  activeDot: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationMatchBy: co,
  animationInterpolateFn: YX,
  connectNulls: !1,
  dot: !1,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: !1,
  isAnimationActive: "auto",
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  type: "linear",
  label: !1,
  shape: zX,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: fe.area
};
function Yl(e, t) {
  return e && e !== "none" ? e : t;
}
var VX = (e) => {
  var t = e.dataKey, r = e.name, n = e.stroke, i = e.fill, a = e.legendType, o = e.hide;
  return [{
    inactive: o,
    dataKey: t,
    type: a,
    color: Yl(n, i),
    value: Mt(r, t),
    payload: e
  }];
}, GX = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.data, n = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, l = e.hide, u = e.unit, s = e.formatter, c = e.tooltipType, d = e.id, f = {
    dataDefinedOnItem: r,
    getPosition: mt,
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      dataKey: t,
      nameKey: void 0,
      name: Mt(o, t),
      hide: l,
      type: c,
      color: Yl(n, a),
      unit: u,
      formatter: s,
      graphicalItemId: d
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: f
  });
});
function qX(e) {
  var t = e.clipPathId, r = e.points, n = e.props, i = n.needClip, a = n.dot, o = n.dataKey, l = oe(n);
  return /* @__PURE__ */ y(Vf, {
    points: r,
    dot: a,
    className: "recharts-area-dots",
    dotClassName: "recharts-area-dot",
    dataKey: o,
    baseProps: l,
    needClip: i,
    clipPathId: t
  });
}
function ZX(e) {
  var t = e.showLabels, r = e.children, n = e.points, i = n.map((a) => {
    var o, l, u = {
      x: (o = a.x) !== null && o !== void 0 ? o : 0,
      y: (l = a.y) !== null && l !== void 0 ? l : 0,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return gi(gi({}, u), {}, {
      value: a.value,
      payload: a.payload,
      parentViewBox: void 0,
      viewBox: u,
      fill: void 0
    });
  });
  return /* @__PURE__ */ y(zi, {
    value: t ? i : void 0
  }, r);
}
function JX(e) {
  var t = e.points, r = e.baseLine, n = e.needClip, i = e.clipPathId, a = e.props, o = e.animationElapsedTime, l = e.isAnimating, u = e.isEntrance, s = a.layout, c = a.type, d = a.stroke, f = a.connectNulls, v = a.isRange, h = a.shape, p = a.id, m = IP(a, KX), g = $e(m), w = gi(gi({}, g), {}, {
    id: p,
    points: t,
    connectNulls: f,
    type: c,
    baseLine: r,
    layout: s,
    stroke: d,
    isRange: v,
    animationElapsedTime: o,
    isAnimating: l,
    isEntrance: u
  });
  return /* @__PURE__ */ y(le, null, t?.length > 1 && /* @__PURE__ */ y(X, {
    clipPath: n ? "url(#clipPath-".concat(i, ")") : void 0
  }, /* @__PURE__ */ y(Jr, {
    option: h,
    DefaultShape: kP.shape,
    shapeProps: w
  })), /* @__PURE__ */ y(qX, {
    points: t,
    props: m,
    clipPathId: i
  }));
}
function QX(e, t, r) {
  if (L(e)) {
    var n = L(t) ? t : void 0;
    return V(n, e, r);
  }
  if (he(e) || Et(e)) {
    var i = L(t) ? t : void 0;
    return V(i, 0, r);
  }
  return e;
}
function e3(e) {
  var t = e.needClip, r = e.clipPathId, n = e.props, i = e.previousPointsRef, a = e.previousBaselineRef, o = n.points, l = n.baseLine, u = n.isAnimationActive, s = n.animationBegin, c = n.animationDuration, d = n.animationEasing, f = n.animationMatchBy, v = n.animationInterpolateFn, h = xe(() => ({
    points: o,
    baseLine: l
  }), [o, l]), p = Hf(h, a), m = Ua(), g = an(n.onAnimationStart, n.onAnimationEnd), w = g.isAnimating, x = g.handleAnimationStart, A = g.handleAnimationEnd, P = p.startValue;
  if (m == null)
    return null;
  var b;
  return Array.isArray(l) && Array.isArray(P) ? b = Ll(P, l, f) : Array.isArray(l) ? b = Ll(null, l, f) : b = null, /* @__PURE__ */ y(on, {
    animationInput: h,
    animationIdPrefix: "recharts-area-",
    items: o,
    previousItemsRef: i,
    isAnimationActive: u,
    animationBegin: s,
    animationDuration: c,
    animationEasing: d,
    onAnimationStart: x,
    onAnimationEnd: A,
    animationInterpolateFn: v,
    animationMatchBy: f,
    layout: m
  }, (O, I, E) => {
    var j;
    return I === 1 ? j = l : Array.isArray(l) ? j = v(b, I, m) : j = E ? l : QX(l, P, I), p.syncStepValue(j, I), /* @__PURE__ */ y(ZX, {
      showLabels: !w,
      points: o
    }, n.children, /* @__PURE__ */ y(JX, {
      points: O,
      baseLine: j,
      needClip: t,
      clipPathId: r,
      props: n,
      animationElapsedTime: I,
      isAnimating: w || I < 1,
      isEntrance: E
    }), /* @__PURE__ */ y(rn, {
      label: n.label
    }));
  });
}
function t3(e) {
  var t = e.needClip, r = e.clipPathId, n = e.props, i = H(null), a = H();
  return /* @__PURE__ */ y(e3, {
    needClip: t,
    clipPathId: r,
    props: n,
    previousPointsRef: i,
    previousBaselineRef: a
  });
}
class r3 extends Ai {
  render() {
    var t = this.props, r = t.hide, n = t.dot, i = t.points, a = t.className, o = t.top, l = t.left, u = t.needClip, s = t.xAxisId, c = t.yAxisId, d = t.width, f = t.height, v = t.id, h = t.baseLine, p = t.zIndex;
    if (r)
      return null;
    var m = J("recharts-area", a), g = v, w = bP(n), x = w.r, A = w.strokeWidth, P = Ff(n), b = x * 2 + A, O = u ? "url(#clipPath-".concat(P ? "" : "dots-").concat(g, ")") : void 0;
    return /* @__PURE__ */ y(we, {
      zIndex: p
    }, /* @__PURE__ */ y(X, {
      className: m
    }, u && /* @__PURE__ */ y("defs", null, /* @__PURE__ */ y(ls, {
      clipPathId: g,
      xAxisId: s,
      yAxisId: c
    }), !P && /* @__PURE__ */ y("clipPath", {
      id: "clipPath-dots-".concat(g)
    }, /* @__PURE__ */ y("rect", {
      x: l - b / 2,
      y: o - b / 2,
      width: d + b,
      height: f + b
    }))), /* @__PURE__ */ y(t3, {
      needClip: u,
      clipPathId: g,
      props: this.props
    })), /* @__PURE__ */ y(Bl, {
      points: i,
      mainColor: Yl(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: O
    }), this.props.isRange && Array.isArray(h) && /* @__PURE__ */ y(Bl, {
      points: h,
      mainColor: Yl(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: O
    }));
  }
}
function n3(e) {
  var t, r = e.activeDot, n = e.animationBegin, i = e.animationDuration, a = e.animationEasing, o = e.connectNulls, l = e.dot, u = e.fill, s = e.fillOpacity, c = e.hide, d = e.isAnimationActive, f = e.legendType, v = e.stroke, h = e.xAxisId, p = e.yAxisId, m = IP(e, WX), g = Rr(), w = Qw(), x = vo(h, p), A = x.needClip, P = se(), b = (t = C((M) => MX(M, e.id, P))) !== null && t !== void 0 ? t : {}, O = b.points, I = b.isRange, E = b.baseLine, j = fo();
  if (g !== "horizontal" && g !== "vertical" || j == null || w !== "AreaChart" && w !== "ComposedChart")
    return null;
  var T = j.height, k = j.width, _ = j.x, $ = j.y;
  return !O || !O.length ? null : /* @__PURE__ */ y(r3, Hl({}, m, {
    activeDot: r,
    animationBegin: n,
    animationDuration: i,
    animationEasing: a,
    baseLine: E,
    connectNulls: o,
    dot: l,
    fill: u,
    fillOpacity: s,
    height: T,
    hide: c,
    layout: g,
    isAnimationActive: d,
    isRange: I,
    legendType: f,
    needClip: A,
    points: O,
    stroke: v,
    width: k,
    left: _,
    top: $,
    xAxisId: h,
    yAxisId: p
  }));
}
var i3 = (e, t, r, n, i) => {
  var a = r ?? t;
  if (L(a))
    return a;
  var o = e === "horizontal" ? i : n, l = o.scale.domain();
  if (o.type === "number") {
    var u = Math.max(l[0], l[1]), s = Math.min(l[0], l[1]);
    return a === "dataMin" ? s : a === "dataMax" || u < 0 ? u : Math.max(Math.min(l[0], l[1]), 0);
  }
  return a === "dataMin" ? l[0] : a === "dataMax" ? l[1] : l[0];
};
function a3(e) {
  var t = e.areaSettings, r = t.connectNulls, n = t.baseValue, i = t.dataKey, a = e.stackedData, o = e.layout, l = e.chartBaseValue, u = e.xAxis, s = e.yAxis, c = e.displayedData, d = e.dataStartIndex, f = e.xAxisTicks, v = e.yAxisTicks, h = e.bandSize, p = e.stackDataKeys, m = a && a.length, g = i3(o, l, n, u, s), w = o === "horizontal", x = !1, A = c.map((b, O) => {
    var I, E, j, T;
    if (m)
      T = a[d + O];
    else {
      var k = G(b, i);
      Array.isArray(k) ? (T = k, x = !0) : T = [g, k];
    }
    var _ = (I = (E = T) === null || E === void 0 ? void 0 : E[1]) !== null && I !== void 0 ? I : null, $ = G(b, i), M = m && $ == null && p != null && p.length > 0 && p.every((N) => G(b, N) == null), R = _ == null || m && !r && $ == null || M;
    if (w) {
      var K;
      return {
        x: si({
          axis: u,
          ticks: f,
          bandSize: h,
          entry: b,
          index: O
        }),
        y: R ? null : (K = s.scale.map(_)) !== null && K !== void 0 ? K : null,
        value: T,
        payload: b
      };
    }
    return {
      x: R ? null : (j = u.scale.map(_)) !== null && j !== void 0 ? j : null,
      y: si({
        axis: s,
        ticks: v,
        bandSize: h,
        entry: b,
        index: O
      }),
      value: T,
      payload: b
    };
  }), P;
  return m || x ? P = A.map((b) => {
    var O, I = Array.isArray(b.value) ? b.value[0] : null;
    if (w) {
      var E;
      return {
        x: b.x,
        y: I != null && b.y != null && (E = s.scale.map(I)) !== null && E !== void 0 ? E : null,
        payload: b.payload
      };
    }
    return {
      x: I != null && (O = u.scale.map(I)) !== null && O !== void 0 ? O : null,
      y: b.y,
      payload: b.payload
    };
  }) : P = w ? s.scale.map(g) : u.scale.map(g), {
    points: A,
    baseLine: P ?? 0,
    isRange: x
  };
}
function o3(e) {
  var t = re(e, kP), r = se();
  return /* @__PURE__ */ y(or, {
    id: t.id,
    type: "area"
  }, (n) => /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(rs, {
    legendPayload: VX(t)
  }), /* @__PURE__ */ y(GX, {
    dataKey: t.dataKey,
    data: t.data,
    stroke: t.stroke,
    strokeWidth: t.strokeWidth,
    fill: t.fill,
    name: t.name,
    hide: t.hide,
    unit: t.unit,
    formatter: t.formatter,
    tooltipType: t.tooltipType,
    id: n
  }), /* @__PURE__ */ y(ns, {
    type: "area",
    id: n,
    data: t.data,
    dataKey: t.dataKey,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    stackId: Ka(t.stackId),
    hide: t.hide,
    barSize: void 0,
    baseValue: t.baseValue,
    isPanorama: r,
    connectNulls: t.connectNulls
  }), /* @__PURE__ */ y(n3, Hl({}, t, {
    id: n
  }))));
}
var l3 = /* @__PURE__ */ De(o3, Br);
l3.displayName = "Area";
var u3 = "Invariant failed";
function s3(e, t) {
  throw new Error(u3);
}
var c3 = ["option"];
function d3(e, t) {
  if (e == null) return {};
  var r, n, i = f3(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function f3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var uv = ji;
function sv(e) {
  var t = e.option, r = d3(e, c3);
  return /* @__PURE__ */ y(Jr, {
    option: t,
    DefaultShape: uv,
    shapeProps: r,
    activeClassName: "recharts-active-bar",
    inActiveClassName: "recharts-inactive-bar"
  });
}
var v3 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return (n, i) => {
    if (L(t)) return t;
    var a = L(n) || he(n);
    return a ? t(n, i) : (a || s3(), r);
  };
}, h3 = (e, t, r) => r, p3 = (e, t) => t, ho = S([Bn, p3], (e, t) => e.filter((r) => r.type === "bar").find((r) => r.id === t)), y3 = S([ho], (e) => e?.maxBarSize), m3 = (e, t, r, n) => n, g3 = S([te, Bn, Ar, Pr, h3], (e, t, r, n, i) => t.filter((a) => e === "horizontal" ? a.xAxisId === r : a.yAxisId === n).filter((a) => a.isPanorama === i).filter((a) => a.hide === !1).filter((a) => a.type === "bar")), b3 = (e, t, r) => {
  var n = te(e), i = Ar(e, t), a = Pr(e, t);
  if (!(i == null || a == null))
    return n === "horizontal" ? Cl(e, "yAxis", a, r) : Cl(e, "xAxis", i, r);
}, x3 = (e, t) => {
  var r = te(e), n = Ar(e, t), i = Pr(e, t);
  if (!(n == null || i == null))
    return r === "horizontal" ? ey(e, "xAxis", n) : ey(e, "yAxis", i);
}, w3 = S([g3, ux, x3], HA), A3 = (e, t, r) => {
  var n, i, a = ho(e, t);
  if (a == null)
    return 0;
  var o = Ar(e, t), l = Pr(e, t);
  if (o == null || l == null)
    return 0;
  var u = te(e), s = ku(e), c = a.maxBarSize, d = he(c) ? s : c, f, v;
  return u === "horizontal" ? (f = St(e, "xAxis", o, r), v = Xt(e, "xAxis", o, r)) : (f = St(e, "yAxis", l, r), v = Xt(e, "yAxis", l, r)), (n = (i = Ot(f, v, !0)) !== null && i !== void 0 ? i : d) !== null && n !== void 0 ? n : 0;
}, jP = (e, t, r) => {
  var n = te(e), i = Ar(e, t), a = Pr(e, t);
  if (!(i == null || a == null)) {
    var o, l;
    return n === "horizontal" ? (o = St(e, "xAxis", i, r), l = Xt(e, "xAxis", i, r)) : (o = St(e, "yAxis", a, r), l = Xt(e, "yAxis", a, r)), Ot(o, l);
  }
}, P3 = S([w3, ku, lx, Ed, A3, jP, y3], YA), O3 = (e, t, r) => {
  var n = Ar(e, t);
  if (n != null)
    return St(e, "xAxis", n, r);
}, S3 = (e, t, r) => {
  var n = Pr(e, t);
  if (n != null)
    return St(e, "yAxis", n, r);
}, I3 = (e, t, r) => {
  var n = Ar(e, t);
  if (n != null)
    return Xt(e, "xAxis", n, r);
}, k3 = (e, t, r) => {
  var n = Pr(e, t);
  if (n != null)
    return Xt(e, "yAxis", n, r);
}, j3 = S([P3, ho], GA), T3 = S([b3, ho], VA), TP = S([He, md, O3, S3, I3, k3, j3, te, G0, jP, T3, ho, m3], (e, t, r, n, i, a, o, l, u, s, c, d, f) => {
  var v = u.chartData, h = u.dataStartIndex, p = u.dataEndIndex;
  if (!(d == null || o == null || t == null || l !== "horizontal" && l !== "vertical" || r == null || n == null || i == null || a == null || s == null)) {
    var m = d.data, g;
    if (m != null && m.length > 0 ? g = m : g = v?.slice(h, p + 1), g != null)
      return pH({
        layout: l,
        barSettings: d,
        pos: o,
        parentViewBox: t,
        bandSize: s,
        xAxis: r,
        yAxis: n,
        xAxisTicks: i,
        yAxisTicks: a,
        stackedData: c,
        displayedData: g,
        offset: e,
        cells: f,
        dataStartIndex: h
      });
  }
}), EP = (e, t) => t, CP = (e, t, r) => r, E3 = S([EP, Bn, CP], (e, t, r) => t.filter((n) => n.type === "bar").filter((n) => n.stackId === e).filter((n) => n.isPanorama === r).filter((n) => !n.hide)), C3 = S([E3], (e) => e.map((t) => t.id)), D3 = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  var r = Math.min(e.x, e.x + e.width, t.x, t.x + t.width), n = Math.min(e.y, e.y + e.height, t.y, t.y + t.height), i = Math.max(e.x, e.x + e.width, t.x, t.x + t.width), a = Math.max(e.y, e.y + e.height, t.y, t.y + t.height), o = i - r, l = a - n;
  return {
    x: r,
    y: n,
    width: o,
    height: l
  };
}, M3 = (e, t, r) => {
  var n = C3(e, t, r), i = [];
  return n.forEach((a) => {
    var o = TP(e, a, r, void 0);
    o?.forEach((l) => {
      var u = l.originalDataIndex;
      i[u] = D3(i[u], l);
    });
  }), i;
}, $3 = S([(e) => e, EP, CP], M3), _3 = ["index"];
function Nc() {
  return Nc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nc.apply(null, arguments);
}
function N3(e, t) {
  if (e == null) return {};
  var r, n, i = L3(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function L3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var cv = /* @__PURE__ */ We(void 0), R3 = (e) => {
  var t = Ze(cv);
  if (t != null)
    return t.stackId;
  if (e != null)
    return Ka(e);
}, B3 = {
  radius: 0
}, DP = (e, t) => "recharts-bar-stack-clip-path-".concat(e, "-").concat(t), z3 = (e) => {
  var t = Ze(cv);
  if (t != null) {
    var r = t.stackId;
    return "url(#".concat(DP(r, e), ")");
  }
}, MP = (e) => {
  var t = e.index, r = N3(e, _3), n = z3(t);
  return /* @__PURE__ */ y(X, Nc({
    className: "recharts-bar-stack-layer",
    clipPath: n
  }, r));
}, K3 = (e) => {
  var t = e.stackId, r = e.radius, n = se(), i = C((a) => $3(a, t, n));
  return i == null || i.length === 0 ? null : /* @__PURE__ */ y("defs", null, i.map((a, o) => {
    if (a == null)
      return null;
    var l = DP(t, o);
    return /* @__PURE__ */ y("clipPath", {
      key: l,
      id: l
    }, /* @__PURE__ */ y(ji, {
      isAnimationActive: !1,
      isUpdateAnimationActive: !1,
      x: a.x,
      y: a.y,
      width: a.width,
      height: a.height,
      radius: r
    }));
  }));
}, W3 = (e) => {
  var t = _A("recharts-bar-stack", Ka(e.stackId)), r = re(e, B3), n = r.children, i = r.radius, a = xe(() => ({
    stackId: t,
    radius: i
  }), [t, i]);
  return /* @__PURE__ */ y(cv.Provider, {
    value: a
  }, /* @__PURE__ */ y(K3, {
    stackId: t,
    radius: i
  }), n);
}, U6 = /* @__PURE__ */ De(W3, Br), F3 = ["onMouseEnter", "onMouseLeave", "onClick"], U3 = ["value", "background", "tooltipPosition"], X3 = ["id"], H3 = ["onMouseEnter", "onClick", "onMouseLeave"];
function Rm(e, t) {
  return q3(e) || G3(e, t) || V3(e, t) || Y3();
}
function Y3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function V3(e, t) {
  if (e) {
    if (typeof e == "string") return Bm(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Bm(e, t) : void 0;
  }
}
function Bm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function G3(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function q3(e) {
  if (Array.isArray(e)) return e;
}
function Qr() {
  return Qr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qr.apply(null, arguments);
}
function zm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zm(Object(r), !0).forEach(function(n) {
      Z3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Z3(e, t, r) {
  return (t = J3(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function J3(e) {
  var t = Q3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Q3(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Vl(e, t) {
  if (e == null) return {};
  var r, n, i = eH(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function eH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var tH = (e) => {
  var t = e.dataKey, r = e.name, n = e.fill, i = e.legendType, a = e.hide;
  return [{
    inactive: a,
    dataKey: t,
    type: i,
    color: n,
    value: Mt(r, t),
    payload: e
  }];
}, rH = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.stroke, n = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, l = e.unit, u = e.formatter, s = e.tooltipType, c = e.id, d = {
    dataDefinedOnItem: void 0,
    getPosition: mt,
    settings: {
      stroke: r,
      strokeWidth: n,
      fill: i,
      dataKey: t,
      nameKey: void 0,
      name: Mt(a, t),
      hide: o,
      type: s,
      color: i,
      unit: l,
      formatter: u,
      graphicalItemId: c
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: d
  });
});
function nH(e) {
  var t = C(yr), r = e.data, n = e.dataKey, i = e.background, a = e.allOtherBarProps, o = a.onMouseEnter, l = a.onMouseLeave, u = a.onClick, s = Vl(a, F3), c = Wi(o, n, a.id), d = Fi(l), f = Ui(u, n, a.id);
  if (!i || r == null)
    return null;
  var v = Tt(i);
  return /* @__PURE__ */ y(we, {
    zIndex: eP(i, fe.barBackground)
  }, r.map((h, p) => {
    h.value;
    var m = h.background;
    h.tooltipPosition;
    var g = Vl(h, U3);
    if (!m)
      return null;
    var w = c(h, h.originalDataIndex), x = d(h, h.originalDataIndex), A = f(h, h.originalDataIndex), P = qe(qe(qe(qe(qe({
      option: i,
      isActive: String(h.originalDataIndex) === t
    }, g), {}, {
      // @ts-expect-error backgroundProps is contributing unknown props
      fill: "#eee"
    }, m), v), ir(s, h, p)), {}, {
      onMouseEnter: w,
      onMouseLeave: x,
      onClick: A,
      dataKey: n,
      index: p,
      className: "recharts-bar-background-rectangle"
    });
    return /* @__PURE__ */ y(sv, Qr({
      key: "background-bar-".concat(p)
    }, P));
  }));
}
function iH(e) {
  var t = e.showLabels, r = e.children, n = e.rects, i = n?.map((a) => {
    var o = {
      x: a.x,
      y: a.y,
      width: a.width,
      lowerWidth: a.width,
      upperWidth: a.width,
      height: a.height
    };
    return qe(qe({}, o), {}, {
      value: a.value,
      payload: a.payload,
      parentViewBox: a.parentViewBox,
      viewBox: o,
      fill: a.fill
    });
  });
  return /* @__PURE__ */ y(zi, {
    value: t ? i : void 0
  }, r);
}
function aH(e) {
  var t = e.shape, r = e.activeBar, n = e.baseProps, i = e.entry, a = e.index, o = e.dataKey, l = C(yr), u = C(Cf), s = r && String(i.originalDataIndex) === l && (u == null || o === u), c = l != null && (String(i.originalDataIndex) !== l || u != null && o !== u), d = Ne(!1), f = Rm(d, 2), v = f[0], h = f[1], p = Ne(!1), m = Rm(p, 2), g = m[0], w = m[1];
  ae(() => {
    var I;
    return s ? (h(!0), I = requestAnimationFrame(() => {
      w(!0);
    })) : (w(!1), c && h(!1)), () => {
      cancelAnimationFrame(I);
    };
  }, [s, c]);
  var x = ue(() => {
    s || h(!1);
  }, [s]), A = s && g, P = s || v, b;
  s ? r === !0 ? b = t : b = r : b = t;
  var O = /* @__PURE__ */ y(sv, Qr({}, n, {
    name: String(n.name)
  }, i, {
    isActive: A,
    option: b,
    index: a,
    dataKey: o,
    animationElapsedTime: e.animationElapsedTime,
    isAnimating: e.isAnimating,
    isEntrance: e.isEntrance,
    onTransitionEnd: x
  }));
  return P ? /* @__PURE__ */ y(we, {
    zIndex: fe.activeBar
  }, /* @__PURE__ */ y(MP, {
    index: i.originalDataIndex
  }, O)) : O;
}
function oH(e) {
  var t = e.shape, r = e.baseProps, n = e.entry, i = e.index, a = e.dataKey;
  return /* @__PURE__ */ y(sv, Qr({}, r, {
    name: String(r.name)
  }, n, {
    isActive: !1,
    option: t,
    index: i,
    dataKey: a,
    animationElapsedTime: e.animationElapsedTime,
    isAnimating: e.isAnimating,
    isEntrance: e.isEntrance
  }));
}
function lH(e) {
  var t, r = e.data, n = e.props, i = e.animationElapsedTime, a = e.isAnimating, o = e.isEntrance, l = (t = oe(n)) !== null && t !== void 0 ? t : {}, u = l.id, s = Vl(l, X3), c = n.shape, d = n.dataKey, f = n.activeBar, v = n.onMouseEnter, h = n.onClick, p = n.onMouseLeave, m = Vl(n, H3), g = Wi(v, d, u), w = Fi(p), x = Ui(h, d, u);
  return r ? /* @__PURE__ */ y(le, null, r.map((A, P) => /* @__PURE__ */ y(MP, Qr({
    index: A.originalDataIndex,
    key: "rectangle-".concat(A?.x, "-").concat(A?.y, "-").concat(A?.value, "-").concat(P),
    className: "recharts-bar-rectangle"
  }, ir(m, A, P), {
    onMouseEnter: g(A, A.originalDataIndex),
    onMouseLeave: w(A, A.originalDataIndex),
    onClick: x(A, A.originalDataIndex)
  }), f ? /* @__PURE__ */ y(aH, {
    shape: c,
    activeBar: f,
    baseProps: s,
    entry: A,
    index: P,
    dataKey: d,
    animationElapsedTime: i,
    isAnimating: a,
    isEntrance: o
  }) : (
    /*
     * If the `activeBar` prop is falsy, then let's call the variant without hooks.
     * Using the `selectActiveTooltipIndex` selector is usually fast
     * but in charts with large-ish amount of data even the few nanoseconds add up to a noticeable jank.
     * If the activeBar is false then we don't need to know which index is active - because we won't use it anyway.
     * So let's just skip the hooks altogether. That way, React can skip rendering the component,
     * and can skip the tree reconciliation for its children too.
     * Because we can't call hooks conditionally, we need to have a separate component for that.
     */
    /* @__PURE__ */ y(oH, {
      shape: c,
      baseProps: s,
      entry: A,
      index: P,
      dataKey: d,
      animationElapsedTime: i,
      isAnimating: a,
      isEntrance: o
    })
  )))) : null;
}
var uH = (e, t, r) => e == null ? [] : t === 1 ? e.flatMap((n) => n.status === "removed" ? [] : [n.next]) : e.flatMap((n) => {
  if (n.status === "removed")
    return r === "horizontal" ? [qe(qe({}, n.prev), {}, {
      height: V(n.prev.height, 0, t),
      y: V(n.prev.y, n.prev.y + n.prev.height, t)
    })] : [qe(qe({}, n.prev), {}, {
      width: V(n.prev.width, 0, t)
    })];
  if (n.status === "matched")
    return [qe(qe({}, n.next), {}, {
      x: V(n.prev.x, n.next.x, t),
      y: V(n.prev.y, n.next.y, t),
      width: V(n.prev.width, n.next.width, t),
      height: V(n.prev.height, n.next.height, t)
    })];
  var i = n.next;
  return r === "horizontal" ? [qe(qe({}, i), {}, {
    height: V(0, i.height, t),
    y: V(i.stackedBarStart, i.y, t)
  })] : [qe(qe({}, i), {}, {
    width: V(0, i.width, t),
    x: V(i.stackedBarStart, i.x, t)
  })];
});
function sH(e) {
  var t = e.props, r = e.previousRectanglesRef, n = t.data, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, l = t.animationEasing, u = t.animationInterpolateFn, s = t.layout, c = an(t.onAnimationStart, t.onAnimationEnd), d = c.isAnimating, f = c.handleAnimationStart, v = c.handleAnimationEnd;
  return /* @__PURE__ */ y(iH, {
    showLabels: !d,
    rects: n
  }, /* @__PURE__ */ y(on, {
    animationInput: n,
    animationIdPrefix: "recharts-bar-",
    items: n,
    previousItemsRef: r,
    isAnimationActive: i,
    animationBegin: a,
    animationDuration: o,
    animationEasing: l,
    onAnimationStart: f,
    onAnimationEnd: v,
    animationInterpolateFn: u,
    animationMatchBy: t.animationMatchBy,
    layout: s
  }, (h, p, m) => /* @__PURE__ */ y(X, null, /* @__PURE__ */ y(lH, {
    props: t,
    data: h,
    animationElapsedTime: p,
    isAnimating: d || p < 1,
    isEntrance: m
  }))), /* @__PURE__ */ y(rn, {
    label: t.label
  }), t.children);
}
function cH(e) {
  var t = H(null);
  return /* @__PURE__ */ y(sH, {
    previousRectanglesRef: t,
    props: e
  });
}
var $P = 0, dH = (e, t) => {
  var r = Array.isArray(e.value) ? e.value[1] : e.value;
  return {
    x: e.x,
    y: e.y,
    value: r,
    // getValueByDataKey does not validate the output type
    errorVal: G(e, t)
  };
};
class fH extends Ai {
  render() {
    var t = this.props, r = t.hide, n = t.data, i = t.dataKey, a = t.className, o = t.xAxisId, l = t.yAxisId, u = t.needClip, s = t.background, c = t.id;
    if (r || n == null)
      return null;
    var d = J("recharts-bar", a), f = c;
    return /* @__PURE__ */ y(X, {
      className: d,
      id: c
    }, u && /* @__PURE__ */ y("defs", null, /* @__PURE__ */ y(ls, {
      clipPathId: f,
      xAxisId: o,
      yAxisId: l
    })), /* @__PURE__ */ y(X, {
      className: "recharts-bar-rectangles",
      clipPath: u ? "url(#clipPath-".concat(f, ")") : void 0
    }, /* @__PURE__ */ y(nH, {
      data: n,
      dataKey: i,
      background: s,
      allOtherBarProps: this.props
    }), /* @__PURE__ */ y(cH, this.props)));
  }
}
var vH = {
  activeBar: !1,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease",
  animationInterpolateFn: uH,
  animationMatchBy: Xi,
  background: !1,
  hide: !1,
  isAnimationActive: "auto",
  label: !1,
  legendType: "rect",
  minPointSize: $P,
  shape: uv,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: fe.bar
};
function hH(e) {
  var t = e.xAxisId, r = e.yAxisId, n = e.hide, i = e.legendType, a = e.minPointSize, o = e.activeBar, l = e.animationBegin, u = e.animationDuration, s = e.animationEasing, c = e.isAnimationActive, d = vo(t, r), f = d.needClip, v = Rr(), h = se(), p = Ki(e.children, Wn), m = C((x) => TP(x, e.id, h, p));
  if (v !== "vertical" && v !== "horizontal")
    return null;
  var g, w = m?.[0];
  return w == null || w.height == null || w.width == null ? g = 0 : g = v === "vertical" ? w.height / 2 : w.width / 2, /* @__PURE__ */ y(iv, {
    xAxisId: t,
    yAxisId: r,
    data: m,
    dataPointFormatter: dH,
    errorBarOffset: g
  }, /* @__PURE__ */ y(fH, Qr({}, e, {
    layout: v,
    needClip: f,
    data: m,
    xAxisId: t,
    yAxisId: r,
    hide: n,
    legendType: i,
    minPointSize: a,
    activeBar: o,
    animationBegin: l,
    animationDuration: u,
    animationEasing: s,
    isAnimationActive: c
  })));
}
function pH(e) {
  var t = e.layout, r = e.barSettings, n = r.dataKey, i = r.minPointSize, a = r.hasCustomShape, o = e.pos, l = e.bandSize, u = e.xAxis, s = e.yAxis, c = e.xAxisTicks, d = e.yAxisTicks, f = e.stackedData, v = e.displayedData, h = e.offset, p = e.cells, m = e.parentViewBox, g = e.dataStartIndex, w = t === "horizontal" ? s : u, x = f ? w.scale.domain() : null, A = k0({
    numericAxis: w
  }), P = w.scale.map(A);
  return v.map((b, O) => {
    var I, E, j, T, k, _;
    if (f) {
      var $ = f[O + g];
      if ($ == null)
        return null;
      I = I0($, x);
    } else
      I = G(b, n), Array.isArray(I) || (I = [A, I]);
    var M = v3(i, $P)(I[1], O);
    if (t === "horizontal") {
      var R, K = s.scale.map(I[0]), N = s.scale.map(I[1]);
      if (K == null || N == null)
        return null;
      E = dl({
        axis: u,
        ticks: c,
        bandSize: l,
        offset: o.offset,
        entry: b,
        index: O
      }), j = (R = N ?? K) !== null && R !== void 0 ? R : void 0, T = o.size;
      var z = K - N;
      if (k = Et(z) ? 0 : z, _ = {
        x: E,
        y: h.top,
        width: T,
        height: h.height
      }, Math.abs(M) > 0 && Math.abs(k) < Math.abs(M)) {
        var W = Ue(k || M) * (Math.abs(M) - Math.abs(k));
        j -= W, k += W;
      }
    } else {
      var Z = u.scale.map(I[0]), ne = u.scale.map(I[1]);
      if (Z == null || ne == null)
        return null;
      if (E = Z, j = dl({
        axis: s,
        ticks: d,
        bandSize: l,
        offset: o.offset,
        entry: b,
        index: O
      }), T = ne - Z, k = o.size, _ = {
        x: h.left,
        y: j,
        width: h.width,
        height: k
      }, Math.abs(M) > 0 && Math.abs(T) < Math.abs(M)) {
        var ce = Ue(T || M) * (Math.abs(M) - Math.abs(T));
        T += ce;
      }
    }
    if (E == null || j == null || T == null || k == null || !a && (T === 0 || k === 0))
      return null;
    var ve = qe(qe({}, b), {}, {
      stackedBarStart: P,
      x: E,
      y: j,
      width: T,
      height: k,
      value: f ? I : I[1],
      payload: b,
      background: _,
      tooltipPosition: {
        x: E + T / 2,
        y: j + k / 2
      },
      parentViewBox: m,
      originalDataIndex: O
    }, p && p[O] && p[O].props);
    return ve;
  }).filter(Boolean);
}
function yH(e) {
  var t = re(e, vH), r = R3(t.stackId), n = se();
  return /* @__PURE__ */ y(or, {
    id: t.id,
    type: "bar"
  }, (i) => /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(rs, {
    legendPayload: tH(t)
  }), /* @__PURE__ */ y(rH, {
    dataKey: t.dataKey,
    stroke: t.stroke,
    strokeWidth: t.strokeWidth,
    fill: t.fill,
    name: t.name,
    hide: t.hide,
    unit: t.unit,
    formatter: t.formatter,
    tooltipType: t.tooltipType,
    id: i
  }), /* @__PURE__ */ y(ns, {
    type: "bar",
    id: i,
    data: void 0,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    dataKey: t.dataKey,
    stackId: r,
    hide: t.hide,
    barSize: t.barSize,
    minPointSize: t.minPointSize,
    maxBarSize: t.maxBarSize,
    isPanorama: n,
    hasCustomShape: t.shape != null && t.shape !== uv
  }), /* @__PURE__ */ y(we, {
    zIndex: t.zIndex
  }, /* @__PURE__ */ y(hH, Qr({}, t, {
    id: i
  })))));
}
var mH = /* @__PURE__ */ De(yH, Br);
mH.displayName = "Bar";
var gH = ["option"];
function Lc() {
  return Lc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Lc.apply(null, arguments);
}
function bH(e, t) {
  if (e == null) return {};
  var r, n, i = xH(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function xH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Km(e) {
  return /* @__PURE__ */ y(su, e);
}
function wH(e) {
  var t = e.option, r = bH(e, gH);
  return typeof t == "string" ? /* @__PURE__ */ y(Jr, {
    option: /* @__PURE__ */ y(su, Lc({
      type: t
    }, r)),
    DefaultShape: Km,
    shapeProps: r
  }) : /* @__PURE__ */ y(Jr, {
    option: t,
    DefaultShape: Km,
    shapeProps: r
  });
}
var AH = (e, t, r, n, i, a, o) => St(e, "xAxis", t, o), PH = (e, t, r, n, i, a, o) => Xt(e, "xAxis", t, o), OH = (e, t, r, n, i, a, o) => St(e, "yAxis", r, o), SH = (e, t, r, n, i, a, o) => Xt(e, "yAxis", r, o), IH = (e, t, r, n) => K$(e, "zAxis", n, !1), kH = (e, t, r, n, i) => i, jH = (e, t, r, n, i, a) => a, TH = (e, t, r, n, i, a, o) => Ti(e, void 0, void 0, o), EH = S([Bn, kH], (e, t) => e.filter((r) => r.type === "scatter").find((r) => r.id === t)), CH = S([TH, AH, PH, OH, SH, IH, EH, jH], (e, t, r, n, i, a, o, l) => {
  var u = e.chartData, s = e.dataStartIndex, c = e.dataEndIndex;
  if (o != null) {
    var d;
    if (o?.data != null && o.data.length > 0 ? d = o.data : d = u?.slice(s, c + 1), !(d == null || t == null || n == null || r == null || i == null || r?.length === 0 || i?.length === 0))
      return YH({
        displayedData: d,
        xAxis: t,
        yAxis: n,
        zAxis: a,
        scatterSettings: o,
        xAxisTicks: r,
        yAxisTicks: i,
        cells: l
      });
  }
}), DH = ["id"], MH = ["onMouseEnter", "onClick", "onMouseLeave"], $H = ["animationBegin", "animationDuration", "animationEasing", "hide", "isAnimationActive", "legendType", "lineJointType", "lineType", "shape", "xAxisId", "yAxisId", "zAxisId"];
function Rc(e, t) {
  if (e == null) return {};
  var r, n, i = _H(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function _H(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Cn() {
  return Cn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Cn.apply(null, arguments);
}
function Wm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function wt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wm(Object(r), !0).forEach(function(n) {
      NH(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function NH(e, t, r) {
  return (t = LH(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function LH(e) {
  var t = RH(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function RH(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var BH = (e) => {
  var t = e.dataKey, r = e.name, n = e.fill, i = e.legendType, a = e.hide;
  return [{
    inactive: a,
    dataKey: t,
    type: i,
    color: n,
    value: Mt(r, t),
    payload: e
  }];
}, zH = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.points, n = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, l = e.hide, u = e.formatter, s = e.tooltipType, c = e.id, d = {
    dataDefinedOnItem: r?.map((f) => f.tooltipPayload),
    getPosition: (f) => {
      var v;
      return r == null || (v = r[Number(f)]) === null || v === void 0 ? void 0 : v.tooltipPosition;
    },
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      nameKey: void 0,
      dataKey: t,
      name: Mt(o, t),
      hide: l,
      type: s,
      color: a,
      unit: "",
      // why doesn't Scatter support unit?
      formatter: u,
      graphicalItemId: c
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: d
  });
});
function KH(e) {
  var t = e.points, r = e.props, n = r.line, i = r.lineType, a = r.lineJointType;
  if (!n)
    return null;
  var o = oe(r), l = Tt(n), u, s;
  if (i === "joint")
    u = t.map((g) => {
      var w, x;
      return {
        x: (w = g.cx) !== null && w !== void 0 ? w : null,
        y: (x = g.cy) !== null && x !== void 0 ? x : null
      };
    });
  else if (i === "fitting") {
    var c = QO(t), d = c.xmin, f = c.xmax, v = c.a, h = c.b, p = (g) => v * g + h;
    u = [{
      x: d,
      y: p(d)
    }, {
      x: f,
      y: p(f)
    }];
  }
  var m = wt(wt(wt({}, o), {}, {
    // @ts-expect-error customLineProps is contributing unknown props
    fill: "none",
    // @ts-expect-error customLineProps is contributing unknown props
    stroke: o && o.fill
  }, l), {}, {
    // @ts-expect-error linePoints is used before it is assigned (???)
    points: u
  });
  return /* @__PURE__ */ ie(n) ? s = /* @__PURE__ */ Ae(n, m) : typeof n == "function" ? s = n(m) : s = /* @__PURE__ */ y(xn, Cn({}, m, {
    type: a
  })), /* @__PURE__ */ y(X, {
    className: "recharts-scatter-line",
    key: "recharts-scatter-line"
  }, s);
}
function WH(e) {
  var t = e.showLabels, r = e.points, n = e.children, i = Si(), a = xe(() => r?.map((o) => {
    var l, u, s = {
      /*
       * Scatter label uses x and y as the reference point for the label,
       * not cx and cy.
       */
      x: (l = o.x) !== null && l !== void 0 ? l : 0,
      /*
       * Scatter label uses x and y as the reference point for the label,
       * not cx and cy.
       */
      y: (u = o.y) !== null && u !== void 0 ? u : 0,
      width: o.width,
      height: o.height,
      lowerWidth: o.width,
      upperWidth: o.width
    };
    return wt(wt({}, s), {}, {
      /*
       * Here we put undefined because Scatter shows two values usually, one for X and one for Y.
       * LabelList will see this undefined and will use its own `dataKey` prop to determine which value to show,
       * using the payload below.
       */
      value: void 0,
      payload: o.payload,
      viewBox: s,
      parentViewBox: i,
      fill: void 0
    });
  }), [i, r]);
  return /* @__PURE__ */ y(zi, {
    value: t ? a : void 0
  }, n);
}
function FH(e) {
  var t, r = e.entry, n = e.index, i = e.shape, a = e.activeShape, o = e.baseProps, l = e.id, u = e.restOfAllOtherProps, s = e.animationElapsedTime, c = e.isAnimating, d = e.isEntrance, f = e.onMouseEnterFromContext, v = e.onMouseLeaveFromContext, h = e.onClickFromContext, p = a != null && a !== !1, m = xe(() => {
    var A = String(n);
    return (P) => p && yr(P) === A;
  }, [p, n]), g = (t = C(m)) !== null && t !== void 0 ? t : !1, w = g && a != null && a !== !1 ? a : i, x = wt(wt(wt({}, o), r), {}, {
    isActive: g,
    index: n,
    animationElapsedTime: s,
    isAnimating: c,
    isEntrance: d,
    [pd]: String(l)
  });
  return /* @__PURE__ */ y(
    we,
    {
      zIndex: g ? fe.activeDot : void 0
    },
    /* @__PURE__ */ y(X, Cn({
      className: "recharts-scatter-symbol"
    }, ir(u, r, n), {
      onMouseEnter: f(r, n),
      onMouseLeave: v(r, n),
      onClick: h(r, n)
    }), /* @__PURE__ */ y(wH, Cn({
      option: w
    }, x)))
  );
}
function UH(e) {
  var t = e.points, r = e.allOtherScatterProps, n = e.animationElapsedTime, i = e.isAnimating, a = e.isEntrance, o = r.shape, l = r.activeShape, u = r.dataKey, s = r.id, c = Rc(r, DH), d = r.onMouseEnter, f = r.onClick, v = r.onMouseLeave, h = Rc(r, MH), p = Wi(d, u, s), m = Fi(v), g = Ui(f, u, s);
  if (!GS(t))
    return null;
  var w = oe(c);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(KH, {
    points: t,
    props: c
  }), t.map((x, A) => /* @__PURE__ */ y(FH, {
    key: "symbol-".concat(x?.cx, "-").concat(x?.cy, "-").concat(x?.size, "-").concat(A),
    entry: x,
    index: A,
    shape: o,
    activeShape: l,
    baseProps: w,
    id: s,
    restOfAllOtherProps: h,
    animationElapsedTime: n,
    isAnimating: i,
    isEntrance: a,
    onMouseEnterFromContext: p,
    onMouseLeaveFromContext: m,
    onClickFromContext: g
  })));
}
var XH = (e, t) => e == null ? [] : t === 1 ? e.flatMap((r) => r.status === "removed" ? [] : [r.next]) : e.flatMap((r) => r.status === "removed" ? [] : r.status === "matched" ? [wt(wt({}, r.next), {}, {
  cx: r.next.cx == null ? void 0 : V(r.prev.cx, r.next.cx, t),
  cy: r.next.cy == null ? void 0 : V(r.prev.cy, r.next.cy, t),
  size: V(r.prev.size, r.next.size, t)
})] : [wt(wt({}, r.next), {}, {
  size: V(0, r.next.size, t)
})]);
function HH(e) {
  var t = e.previousPointsRef, r = e.props, n = r.points, i = r.isAnimationActive, a = r.animationBegin, o = r.animationDuration, l = r.animationEasing, u = r.animationInterpolateFn, s = an(), c = s.isAnimating, d = s.handleAnimationStart, f = s.handleAnimationEnd, v = Ua();
  return v == null ? null : /* @__PURE__ */ y(WH, {
    showLabels: !c,
    points: n
  }, /* @__PURE__ */ y(on, {
    animationInput: r,
    animationIdPrefix: "recharts-scatter-",
    items: n,
    previousItemsRef: t,
    isAnimationActive: i,
    animationBegin: a,
    animationDuration: o,
    animationEasing: l,
    onAnimationStart: d,
    onAnimationEnd: f,
    animationInterpolateFn: u,
    animationMatchBy: r.animationMatchBy,
    layout: v
  }, (h, p, m) => /* @__PURE__ */ y(X, null, /* @__PURE__ */ y(UH, {
    points: h,
    allOtherScatterProps: r,
    showLabels: !c,
    animationElapsedTime: p,
    isAnimating: c || p < 1,
    isEntrance: m
  }))), r.children, /* @__PURE__ */ y(rn, {
    label: r.label
  }));
}
function YH(e) {
  var t = e.displayedData, r = e.xAxis, n = e.yAxis, i = e.zAxis, a = e.scatterSettings, o = e.xAxisTicks, l = e.yAxisTicks, u = e.cells, s = he(r.dataKey) ? a.dataKey : r.dataKey, c = he(n.dataKey) ? a.dataKey : n.dataKey, d = i && i.dataKey, f = i ? i.range : Er.range, v = f && f[0], h = r.scale.bandwidth ? r.scale.bandwidth() : 0, p = n.scale.bandwidth ? n.scale.bandwidth() : 0;
  return t.map((m, g) => {
    var w = G(m, s), x = G(m, c), A = !he(d) && G(m, d) || "-", P = [{
      name: he(r.dataKey) ? a.name : r.name || String(r.dataKey),
      unit: r.unit || "",
      // @ts-expect-error getValueByDataKey does not validate the output type
      value: w,
      payload: m,
      dataKey: s,
      type: a.tooltipType,
      graphicalItemId: a.id
    }, {
      name: he(n.dataKey) ? a.name : n.name || String(n.dataKey),
      unit: n.unit || "",
      // @ts-expect-error getValueByDataKey does not validate the output type
      value: x,
      payload: m,
      dataKey: c,
      type: a.tooltipType,
      graphicalItemId: a.id
    }];
    A !== "-" && i != null && P.push({
      // @ts-expect-error name prop should not have dataKey in it
      name: i.name || i.dataKey,
      unit: i.unit || "",
      // @ts-expect-error getValueByDataKey does not validate the output type
      value: A,
      payload: m,
      dataKey: d,
      type: a.tooltipType,
      graphicalItemId: a.id
    });
    var b = si({
      axis: r,
      ticks: o,
      bandSize: h,
      entry: m,
      index: g,
      dataKey: s
    }), O = si({
      axis: n,
      ticks: l,
      bandSize: p,
      entry: m,
      index: g,
      dataKey: c
    }), I = A !== "-" && i != null ? i.scale.map(A) : v, E = I == null ? 0 : Math.sqrt(Math.max(I, 0) / Math.PI);
    return wt(wt({}, m), {}, {
      cx: b,
      cy: O,
      x: b == null ? void 0 : b - E,
      y: O == null ? void 0 : O - E,
      width: 2 * E,
      height: 2 * E,
      size: I,
      node: {
        x: w,
        y: x,
        z: A
      },
      tooltipPayload: P,
      tooltipPosition: {
        x: b,
        y: O
      },
      payload: m
    }, u && u[g] && u[g].props);
  });
}
var VH = (e, t, r) => ({
  x: e.cx,
  y: e.cy,
  value: Number(r === "x" ? e.node.x : e.node.y),
  // @ts-expect-error getValueByDataKey does not validate the output type
  errorVal: G(e, t)
});
function GH(e) {
  var t = e.hide, r = e.points, n = e.className, i = e.needClip, a = e.xAxisId, o = e.yAxisId, l = e.id, u = H(null);
  if (t)
    return null;
  var s = J("recharts-scatter", n), c = l;
  return /* @__PURE__ */ y(we, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ y(X, {
    className: s,
    clipPath: i ? "url(#clipPath-".concat(c, ")") : void 0,
    id: l
  }, i && /* @__PURE__ */ y("defs", null, /* @__PURE__ */ y(ls, {
    clipPathId: c,
    xAxisId: a,
    yAxisId: o
  })), /* @__PURE__ */ y(iv, {
    xAxisId: a,
    yAxisId: o,
    data: r,
    dataPointFormatter: VH,
    errorBarOffset: 0
  }, /* @__PURE__ */ y(X, {
    key: "recharts-scatter-symbols"
  }, /* @__PURE__ */ y(HH, {
    props: e,
    previousPointsRef: u
  })))));
}
var _P = {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  label: !1,
  line: !1,
  legendType: "circle",
  lineType: "joint",
  lineJointType: "linear",
  shape: "circle",
  hide: !1,
  isAnimationActive: "auto",
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "linear",
  animationMatchBy: Xi,
  animationInterpolateFn: XH,
  zIndex: fe.scatter
};
function qH(e) {
  var t = re(e, _P), r = t.animationBegin, n = t.animationDuration, i = t.animationEasing, a = t.hide, o = t.isAnimationActive, l = t.legendType, u = t.lineJointType, s = t.lineType, c = t.shape, d = t.xAxisId, f = t.yAxisId, v = t.zAxisId, h = Rc(t, $H), p = vo(d, f), m = p.needClip, g = xe(() => Ki(e.children, Wn), [e.children]), w = se(), x = C((A) => CH(A, d, f, v, e.id, g, w));
  return m == null || x == null ? null : /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(zH, {
    dataKey: e.dataKey,
    points: x,
    stroke: e.stroke,
    strokeWidth: e.strokeWidth,
    fill: e.fill,
    name: e.name,
    hide: e.hide,
    formatter: e.formatter,
    tooltipType: e.tooltipType,
    id: e.id
  }), /* @__PURE__ */ y(GH, Cn({}, h, {
    xAxisId: d,
    yAxisId: f,
    zAxisId: v,
    lineType: s,
    lineJointType: u,
    legendType: l,
    shape: c,
    hide: a,
    isAnimationActive: o,
    animationBegin: r,
    animationDuration: n,
    animationEasing: i,
    points: x,
    needClip: m
  })));
}
function ZH(e) {
  var t = re(e, _P), r = se();
  return /* @__PURE__ */ y(or, {
    id: t.id,
    type: "scatter"
  }, (n) => /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(rs, {
    legendPayload: BH(t)
  }), /* @__PURE__ */ y(ns, {
    type: "scatter",
    id: n,
    data: t.data,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: t.zAxisId,
    dataKey: t.dataKey,
    hide: t.hide,
    name: t.name,
    tooltipType: t.tooltipType,
    isPanorama: r
  }), /* @__PURE__ */ y(qH, Cn({}, t, {
    id: n
  }))));
}
var JH = /* @__PURE__ */ De(ZH, Br);
JH.displayName = "Scatter";
var QH = ["domain", "range"], e8 = ["domain", "range"];
function Fm(e, t) {
  if (e == null) return {};
  var r, n, i = t8(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function t8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Um(e, t) {
  return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function NP(e, t) {
  if (e === t)
    return !0;
  var r = e.domain, n = e.range, i = Fm(e, QH), a = t.domain, o = t.range, l = Fm(t, e8);
  return !Um(r, a) || !Um(n, o) ? !1 : Br(i, l);
}
var r8 = ["type"], n8 = ["dangerouslySetInnerHTML", "ticks", "scale"], i8 = ["id", "scale"];
function Bc() {
  return Bc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Bc.apply(null, arguments);
}
function Xm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xm(Object(r), !0).forEach(function(n) {
      a8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function a8(e, t, r) {
  return (t = o8(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function o8(e) {
  var t = l8(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function l8(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function zc(e, t) {
  if (e == null) return {};
  var r, n, i = u8(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function u8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function s8(e) {
  var t = ee(), r = H(null), n = Ua(), i = e.type, a = zc(e, r8), o = Mi(n, "xAxis", i), l = xe(() => {
    if (o != null)
      return Hm(Hm({}, a), {}, {
        type: o
      });
  }, [a, o]);
  return ke(() => {
    l != null && (r.current === null ? t(fz(l)) : r.current !== l && t(vz({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), ke(() => () => {
    r.current && (t(hz(r.current)), r.current = null);
  }, [t]), null;
}
var c8 = (e) => {
  var t = e.xAxisId, r = e.className, n = e.height, i = e.label, a = H(null), o = H(null), l = C(md), u = se(), s = ee(), c = "xAxis", d = C((g) => Iw(g, c, t, u)), f = C((g) => Aw(g, t)), v = C((g) => N$(g, t)), h = C((g) => Jx(g, t));
  if (ke(() => {
    if (!(n !== "auto" || !f || Gu(i) || /* @__PURE__ */ ie(i) || h == null)) {
      var g = a.current;
      if (g) {
        var w = g.getCalculatedHeight();
        Math.round(f.height) !== Math.round(w) && s(Az({
          id: t,
          height: w
        }));
      }
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    d,
    f,
    s,
    i,
    t,
    n,
    h
  ]), f == null || v == null || h == null)
    return null;
  e.dangerouslySetInnerHTML, e.ticks, e.scale;
  var p = zc(e, n8);
  h.id, h.scale;
  var m = zc(h, i8);
  return /* @__PURE__ */ y(rv, Bc({}, p, m, {
    ref: a,
    labelRef: o,
    x: v.x,
    y: v.y,
    width: f.width,
    height: f.height,
    className: J("recharts-".concat(c, " ").concat(c), r),
    viewBox: l,
    ticks: d,
    axisType: c,
    axisId: t
  }));
}, d8 = {
  allowDataOverflow: Ve.allowDataOverflow,
  allowDecimals: Ve.allowDecimals,
  allowDuplicatedCategory: Ve.allowDuplicatedCategory,
  angle: Ve.angle,
  axisLine: Dr.axisLine,
  height: Ve.height,
  hide: !1,
  includeHidden: Ve.includeHidden,
  interval: Ve.interval,
  label: !1,
  minTickGap: Ve.minTickGap,
  mirror: Ve.mirror,
  orientation: Ve.orientation,
  padding: Ve.padding,
  reversed: Ve.reversed,
  scale: Ve.scale,
  tick: Ve.tick,
  tickCount: Ve.tickCount,
  tickLine: Dr.tickLine,
  tickSize: Dr.tickSize,
  type: Ve.type,
  niceTicks: Ve.niceTicks,
  xAxisId: 0
}, f8 = (e) => {
  var t = re(e, d8);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(s8, {
    allowDataOverflow: t.allowDataOverflow,
    allowDecimals: t.allowDecimals,
    allowDuplicatedCategory: t.allowDuplicatedCategory,
    angle: t.angle,
    dataKey: t.dataKey,
    domain: t.domain,
    height: t.height,
    hide: t.hide,
    id: t.xAxisId,
    includeHidden: t.includeHidden,
    interval: t.interval,
    minTickGap: t.minTickGap,
    mirror: t.mirror,
    name: t.name,
    orientation: t.orientation,
    padding: t.padding,
    reversed: t.reversed,
    scale: t.scale,
    tick: t.tick,
    tickCount: t.tickCount,
    tickFormatter: t.tickFormatter,
    ticks: t.ticks,
    type: t.type,
    unit: t.unit,
    niceTicks: t.niceTicks
  }), /* @__PURE__ */ y(c8, t));
}, v8 = /* @__PURE__ */ De(f8, NP);
v8.displayName = "XAxis";
var h8 = ["type"], p8 = ["dangerouslySetInnerHTML", "ticks", "scale"], y8 = ["id", "scale"];
function Kc() {
  return Kc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Kc.apply(null, arguments);
}
function Ym(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ym(Object(r), !0).forEach(function(n) {
      m8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ym(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function m8(e, t, r) {
  return (t = g8(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function g8(e) {
  var t = b8(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function b8(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Wc(e, t) {
  if (e == null) return {};
  var r, n, i = x8(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function x8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function w8(e) {
  var t = ee(), r = H(null), n = Ua(), i = e.type, a = Wc(e, h8), o = Mi(n, "yAxis", i), l = xe(() => {
    if (o != null)
      return Vm(Vm({}, a), {}, {
        type: o
      });
  }, [o, a]);
  return ke(() => {
    l != null && (r.current === null ? t(pz(l)) : r.current !== l && t(yz({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), ke(() => () => {
    r.current && (t(mz(r.current)), r.current = null);
  }, [t]), null;
}
function A8(e) {
  var t = e.yAxisId, r = e.className, n = e.width, i = e.label, a = H(null), o = H(null), l = C(md), u = se(), s = ee(), c = "yAxis", d = C((g) => Pw(g, t)), f = C((g) => R$(g, t)), v = C((g) => Iw(g, c, t, u)), h = C((g) => Qx(g, t));
  if (ke(() => {
    if (!(n !== "auto" || !d || Gu(i) || /* @__PURE__ */ ie(i) || h == null)) {
      var g = a.current;
      if (g) {
        var w = g.getCalculatedWidth();
        Math.round(d.width) !== Math.round(w) && s(wz({
          id: t,
          width: w
        }));
      }
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    v,
    d,
    s,
    i,
    t,
    n,
    h
  ]), d == null || f == null || h == null)
    return null;
  e.dangerouslySetInnerHTML, e.ticks, e.scale;
  var p = Wc(e, p8);
  h.id, h.scale;
  var m = Wc(h, y8);
  return /* @__PURE__ */ y(rv, Kc({}, p, m, {
    ref: a,
    labelRef: o,
    x: f.x,
    y: f.y,
    tickTextProps: n === "auto" ? {
      width: void 0
    } : {
      width: n
    },
    width: d.width,
    height: d.height,
    className: J("recharts-".concat(c, " ").concat(c), r),
    viewBox: l,
    ticks: v,
    axisType: c,
    axisId: t
  }));
}
var P8 = {
  allowDataOverflow: Ge.allowDataOverflow,
  allowDecimals: Ge.allowDecimals,
  allowDuplicatedCategory: Ge.allowDuplicatedCategory,
  angle: Ge.angle,
  axisLine: Dr.axisLine,
  hide: !1,
  includeHidden: Ge.includeHidden,
  interval: Ge.interval,
  label: !1,
  minTickGap: Ge.minTickGap,
  mirror: Ge.mirror,
  orientation: Ge.orientation,
  padding: Ge.padding,
  reversed: Ge.reversed,
  scale: Ge.scale,
  tick: Ge.tick,
  tickCount: Ge.tickCount,
  tickLine: Dr.tickLine,
  tickSize: Dr.tickSize,
  type: Ge.type,
  niceTicks: Ge.niceTicks,
  width: Ge.width,
  yAxisId: 0
}, O8 = (e) => {
  var t = re(e, P8);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(w8, {
    interval: t.interval,
    id: t.yAxisId,
    scale: t.scale,
    type: t.type,
    domain: t.domain,
    allowDataOverflow: t.allowDataOverflow,
    dataKey: t.dataKey,
    allowDuplicatedCategory: t.allowDuplicatedCategory,
    allowDecimals: t.allowDecimals,
    tickCount: t.tickCount,
    padding: t.padding,
    includeHidden: t.includeHidden,
    reversed: t.reversed,
    ticks: t.ticks,
    width: t.width,
    orientation: t.orientation,
    mirror: t.mirror,
    hide: t.hide,
    unit: t.unit,
    name: t.name,
    angle: t.angle,
    minTickGap: t.minTickGap,
    tick: t.tick,
    tickFormatter: t.tickFormatter,
    niceTicks: t.niceTicks
  }), /* @__PURE__ */ y(A8, t));
}, S8 = /* @__PURE__ */ De(O8, NP);
S8.displayName = "YAxis";
function I8(e) {
  var t = ee(), r = H(null);
  return ke(() => {
    r.current === null ? t(gz(e)) : r.current !== e && t(bz({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [e, t]), ke(() => () => {
    r.current && (t(xz(r.current)), r.current = null);
  }, [t]), null;
}
var k8 = {
  zAxisId: 0,
  range: Er.range,
  scale: Er.scale,
  type: Er.type
};
function j8(e) {
  var t = re(e, k8);
  return /* @__PURE__ */ y(I8, {
    domain: t.domain,
    id: t.zAxisId,
    dataKey: t.dataKey,
    name: t.name,
    unit: t.unit,
    range: t.range,
    scale: t.scale,
    type: t.type,
    allowDuplicatedCategory: Er.allowDuplicatedCategory,
    allowDataOverflow: Er.allowDataOverflow,
    reversed: Er.reversed,
    includeHidden: Er.includeHidden
  });
}
j8.displayName = "ZAxis";
function T8(e, t) {
  return M8(e) || D8(e, t) || C8(e, t) || E8();
}
function E8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function C8(e, t) {
  if (e) {
    if (typeof e == "string") return Gm(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Gm(e, t) : void 0;
  }
}
function Gm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function D8(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function M8(e) {
  if (Array.isArray(e)) return e;
}
var $8 = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
};
function LP(e) {
  if (!(e === "spring" || typeof e != "string"))
    return e;
}
function RP(e) {
  var t = re(e, $8), r = t.animationId, n = t.from, i = t.to, a = t.attributeName, o = t.isActive, l = t.canBegin, u = t.duration, s = t.easing, c = t.begin, d = t.onAnimationEnd, f = t.onAnimationStart, v = t.children, h = wd(), p = o === "auto" ? !Mn.isSsr && !h : o, m = F0(t.animationController), g = Ne(() => p ? n : i), w = T8(g, 2), x = w[0], A = w[1], P = H(!1), b = ue(() => {
    A(n), f();
  }, [n, f]);
  if (ae(() => {
    if (!p || !l)
      return mt;
    P.current = !0;
    var I = new X0(), E = new iE({
      animationId: r + a,
      easing: s,
      animationDuration: u,
      animationBegin: c,
      onAnimationStart: b,
      onAnimationEnd: d,
      from: n,
      to: i
    });
    return m(I, E, A);
  }, [p, l, u, s, c, b, d, m, i, n, r, a]), !p)
    return v({
      [a]: i
    });
  if (!l)
    return v({
      [a]: n
    });
  if (P.current) {
    var O = Od([a], u, s);
    return v({
      transition: O,
      [a]: x
    });
  }
  return v({
    [a]: n
  });
}
var _8 = ["direction", "width", "dataKey", "isAnimationActive", "animationBegin", "animationDuration", "animationEasing"];
function Ma() {
  return Ma = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ma.apply(null, arguments);
}
function qm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qm(Object(r), !0).forEach(function(n) {
      N8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function N8(e, t, r) {
  return (t = L8(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function L8(e) {
  var t = R8(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function R8(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function B8(e, t) {
  return F8(e) || W8(e, t) || K8(e, t) || z8();
}
function z8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function K8(e, t) {
  if (e) {
    if (typeof e == "string") return Jm(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Jm(e, t) : void 0;
  }
}
function Jm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function W8(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function F8(e) {
  if (Array.isArray(e)) return e;
}
function U8(e, t) {
  if (e == null) return {};
  var r, n, i = X8(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function X8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function H8(e) {
  var t = e.direction, r = e.width, n = e.dataKey, i = e.isAnimationActive, a = e.animationBegin, o = e.animationDuration, l = e.animationEasing, u = U8(e, _8), s = oe(u), c = JU(), d = c.data, f = c.dataPointFormatter, v = c.xAxisId, h = c.yAxisId, p = c.errorBarOffset, m = Sz(v), g = Iz(h);
  if (m?.scale == null || g?.scale == null || d == null || t === "x" && m.type !== "number")
    return null;
  var w = d.map((x, A) => {
    var P = f(x, n, t), b = P.x, O = P.y, I = P.value, E = P.errorVal;
    if (!E || b == null || O == null)
      return null;
    var j = [], T, k;
    if (Array.isArray(E)) {
      var _ = B8(E, 2), $ = _[0], M = _[1];
      if ($ == null || M == null)
        return null;
      T = $, k = M;
    } else
      T = k = E;
    if (t === "x") {
      var R = m.scale, K = O + p, N = K + r, z = K - r, W = R.map(I - T), Z = R.map(I + k);
      W != null && Z != null && (j.push({
        x1: Z,
        y1: N,
        x2: Z,
        y2: z
      }), j.push({
        x1: W,
        y1: K,
        x2: Z,
        y2: K
      }), j.push({
        x1: W,
        y1: N,
        x2: W,
        y2: z
      }));
    } else if (t === "y") {
      var ne = g.scale, ce = b + p, ve = ce - r, Te = ce + r, Ke = ne.map(I - T), Fe = ne.map(I + k);
      Ke != null && Fe != null && (j.push({
        x1: ve,
        y1: Fe,
        x2: Te,
        y2: Fe
      }), j.push({
        x1: ce,
        y1: Ke,
        x2: ce,
        y2: Fe
      }), j.push({
        x1: ve,
        y1: Ke,
        x2: Te,
        y2: Ke
      }));
    }
    var $t = t === "x" ? "scaleX" : "scaleY", B = "".concat(b + p, "px ").concat(O + p, "px");
    return /* @__PURE__ */ y(X, Ma({
      className: "recharts-errorBar",
      key: "bar-".concat(b, "-").concat(O, "-").concat(I, "-").concat(A)
    }, s), j.map((U, q) => {
      var D = i ? {
        transformOrigin: B
      } : void 0;
      return /* @__PURE__ */ y(RP, {
        animationId: "error-bar-".concat(t, "_").concat(U.x1, "-").concat(U.x2, "-").concat(U.y1, "-").concat(U.y2),
        from: "".concat($t, "(0)"),
        to: "".concat($t, "(1)"),
        attributeName: "transform",
        begin: a,
        easing: LP(l),
        isActive: i,
        duration: o,
        key: "errorbar-".concat(A, "-").concat(U.x1, "-").concat(U.y1, "-").concat(U.x2, "-").concat(U.y2, "-").concat(q)
      }, (Be) => /* @__PURE__ */ y("line", Ma({}, U, {
        style: Zm(Zm({}, D), Be)
      })));
    }));
  });
  return /* @__PURE__ */ y(X, {
    className: "recharts-errorBars"
  }, w);
}
function Y8(e) {
  var t = Rr();
  return e ?? (t != null && t === "horizontal" ? "y" : "x");
}
var V8 = {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  isAnimationActive: !0,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease-in-out",
  zIndex: fe.line
};
function G8(e) {
  var t = Y8(e.direction), r = re(e, V8), n = r.width, i = r.isAnimationActive, a = r.animationBegin, o = r.animationDuration, l = r.animationEasing, u = r.zIndex;
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(QU, {
    dataKey: r.dataKey,
    direction: t
  }), /* @__PURE__ */ y(we, {
    zIndex: u
  }, /* @__PURE__ */ y(H8, Ma({}, r, {
    direction: t,
    width: n,
    isAnimationActive: i,
    animationBegin: a,
    animationDuration: o,
    animationEasing: l
  }))));
}
G8.displayName = "ErrorBar";
var q8 = (e, t) => t, dv = S([q8, te, _n, nt, Xw, Wr, Q_, He], oN);
function Z8(e) {
  return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function fv(e) {
  var t = e.currentTarget.getBoundingClientRect(), r, n;
  if (Z8(e)) {
    var i = e.currentTarget.getBBox();
    r = i.width > 0 ? t.width / i.width : 1, n = i.height > 0 ? t.height / i.height : 1;
  } else {
    var a = e.currentTarget;
    r = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1, n = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1;
  }
  var o = (l, u) => ({
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    relativeX: Math.round((l - t.left) / r),
    relativeY: Math.round((u - t.top) / n)
  });
  return "touches" in e ? Array.from(e.touches).map((l) => o(l.clientX, l.clientY)) : o(e.clientX, e.clientY);
}
var BP = Ct("mouseClick"), zP = za();
zP.startListening({
  actionCreator: BP,
  effect: (e, t) => {
    var r = e.payload, n = dv(t.getState(), fv(r));
    n?.activeIndex != null && t.dispatch(q$({
      activeIndex: n.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: n.activeCoordinate
    }));
  }
});
var Fc = Ct("mouseMove"), KP = za(), Gn = null, ln = null, Ws = null;
KP.startListening({
  actionCreator: Fc,
  effect: (e, t) => {
    var r = e.payload, n = t.getState(), i = n.eventSettings, a = i.throttleDelay, o = i.throttledEvents, l = o === "all" || o?.includes("mousemove");
    Gn !== null && (cancelAnimationFrame(Gn), Gn = null), ln !== null && (typeof a != "number" || !l) && (clearTimeout(ln), ln = null), Ws = fv(r);
    var u = () => {
      var s = t.getState(), c = io(s, s.tooltip.settings.shared);
      if (!Ws) {
        Gn = null, ln = null;
        return;
      }
      if (c === "axis") {
        var d = dv(s, Ws);
        d?.activeIndex != null ? t.dispatch(_w({
          activeIndex: d.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: d.activeCoordinate
        })) : t.dispatch($w());
      }
      Gn = null, ln = null;
    };
    if (!l) {
      u();
      return;
    }
    a === "raf" ? Gn = requestAnimationFrame(u) : typeof a == "number" && ln === null && (ln = setTimeout(u, a));
  }
});
function J8(e, t) {
  return t instanceof HTMLElement ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">') : t === window ? "global.window" : e === "children" && typeof t == "object" && t !== null ? "<<CHILDREN>>" : t;
}
var Qm = {
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index",
  baseValue: void 0,
  reverseStackOrder: !1
}, WP = ht({
  name: "rootProps",
  initialState: Qm,
  reducers: {
    updateOptions: (e, t) => {
      var r;
      e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : Qm.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
    }
  }
}), Q8 = WP.reducer, eY = WP.actions.updateOptions, tY = null, rY = {
  updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e)
}, FP = ht({
  name: "polarOptions",
  initialState: tY,
  reducers: rY
}), nY = FP.actions.updatePolarOptions, iY = FP.reducer, UP = Ct("keyDown"), XP = Ct("focus"), HP = Ct("blur"), us = za(), qn = null, un = null, Mo = null;
us.startListening({
  actionCreator: UP,
  effect: (e, t) => {
    Mo = e.payload, qn !== null && (cancelAnimationFrame(qn), qn = null);
    var r = t.getState(), n = r.eventSettings, i = n.throttleDelay, a = n.throttledEvents, o = a === "all" || a.includes("keydown");
    un !== null && (typeof i != "number" || !o) && (clearTimeout(un), un = null);
    var l = () => {
      try {
        var u = t.getState(), s = u.rootProps.accessibilityLayer !== !1;
        if (!s)
          return;
        var c = u.tooltip.keyboardInteraction, d = Mo;
        if (d !== "ArrowRight" && d !== "ArrowLeft" && d !== "Enter")
          return;
        var f = ha(c, kn(u), hi(u), pi(u)), v = f == null ? -1 : Number(f), h = !Number.isFinite(v) || v < 0, p = Wr(u), m = kn(u), g = io(u, u.tooltip.settings.shared);
        if (d === "Enter") {
          if (h)
            return;
          var w = $l(u, g, "hover", String(c.index));
          t.dispatch(Ml({
            active: !c.active,
            activeIndex: c.index,
            activeCoordinate: w
          }));
          return;
        }
        var x = W$(u), A = x === "left-to-right" ? 1 : -1, P = d === "ArrowRight" ? 1 : -1, b;
        if (h) {
          var O = hi(u), I = pi(u), E = P * A, j = (M) => ({
            active: !1,
            index: String(M),
            dataKey: void 0,
            graphicalItemId: void 0,
            coordinate: void 0
          });
          if (b = -1, E > 0) {
            for (var T = 0; T < m.length; T++)
              if (ha(j(T), m, O, I) != null) {
                b = T;
                break;
              }
          } else
            for (var k = m.length - 1; k >= 0; k--)
              if (ha(j(k), m, O, I) != null) {
                b = k;
                break;
              }
          if (b < 0)
            return;
        } else {
          b = v + P * A;
          var _ = p?.length || m.length;
          if (_ === 0 || b >= _ || b < 0)
            return;
        }
        var $ = $l(u, g, "hover", String(b));
        t.dispatch(Ml({
          active: !0,
          activeIndex: b.toString(),
          activeCoordinate: $
        }));
      } finally {
        qn = null, un = null;
      }
    };
    if (!o) {
      l();
      return;
    }
    i === "raf" ? qn = requestAnimationFrame(l) : typeof i == "number" && un === null && (l(), Mo = null, un = setTimeout(() => {
      Mo ? l() : (un = null, qn = null);
    }, i));
  }
});
us.startListening({
  actionCreator: XP,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var i = r.tooltip.keyboardInteraction;
      if (!i.active && i.index == null) {
        var a = "0", o = io(r, r.tooltip.settings.shared), l = $l(r, o, "hover", String(a));
        t.dispatch(Ml({
          active: !0,
          activeIndex: a,
          activeCoordinate: l
        }));
      }
    }
  }
});
us.startListening({
  actionCreator: HP,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var i = r.tooltip.keyboardInteraction;
      i.active && t.dispatch(Ml({
        active: !1,
        activeIndex: i.index,
        activeCoordinate: i.coordinate
      }));
    }
  }
});
function YP(e) {
  e.persist();
  var t = e.currentTarget;
  return new Proxy(e, {
    get: (r, n) => {
      if (n === "currentTarget")
        return t;
      var i = Reflect.get(r, n);
      return typeof i == "function" ? i.bind(r) : i;
    }
  });
}
var Lt = Ct("externalEvent"), VP = za(), $o = /* @__PURE__ */ new Map(), aa = /* @__PURE__ */ new Map(), Fs = /* @__PURE__ */ new Map();
VP.startListening({
  actionCreator: Lt,
  effect: (e, t) => {
    var r = e.payload, n = r.handler, i = r.reactEvent;
    if (n != null) {
      var a = i.type, o = YP(i);
      Fs.set(a, {
        handler: n,
        reactEvent: o
      });
      var l = $o.get(a);
      l !== void 0 && (cancelAnimationFrame(l), $o.delete(a));
      var u = t.getState(), s = u.eventSettings, c = s.throttleDelay, d = s.throttledEvents, f = d, v = f === "all" || f?.includes(a), h = aa.get(a);
      h !== void 0 && (typeof c != "number" || !v) && (clearTimeout(h), aa.delete(a));
      var p = () => {
        var w = Fs.get(a);
        try {
          if (!w)
            return;
          var x = w.handler, A = w.reactEvent, P = t.getState(), b = {
            activeCoordinate: qw(P),
            activeDataKey: Cf(P),
            activeIndex: yr(P),
            activeLabel: Ef(P),
            activeTooltipIndex: yr(P),
            isTooltipActive: Zw(P)
          };
          x && x(b, A);
        } finally {
          $o.delete(a), aa.delete(a), Fs.delete(a);
        }
      };
      if (!v) {
        p();
        return;
      }
      if (c === "raf") {
        var m = requestAnimationFrame(p);
        $o.set(a, m);
      } else if (typeof c == "number") {
        if (!aa.has(a)) {
          p();
          var g = setTimeout(p, c);
          aa.set(a, g);
        }
      } else
        p();
    }
  }
});
var aY = S([Bi], (e) => e.tooltipItemPayloads), oY = S([aY, (e, t) => t, (e, t, r) => r], (e, t, r) => {
  if (t != null) {
    var n = e.find((a) => a.settings.graphicalItemId === r);
    if (n != null) {
      var i = n.getPosition;
      if (i != null)
        return i(t);
    }
  }
}), GP = Ct("touchMove"), qP = za(), sn = null, Ur = null, eg = null, oa = null;
qP.startListening({
  actionCreator: GP,
  effect: (e, t) => {
    var r = e.payload;
    if (!(r.touches == null || r.touches.length === 0)) {
      oa = YP(r);
      var n = t.getState(), i = n.eventSettings, a = i.throttleDelay, o = i.throttledEvents, l = o === "all" || o.includes("touchmove");
      sn !== null && (cancelAnimationFrame(sn), sn = null), Ur !== null && (typeof a != "number" || !l) && (clearTimeout(Ur), Ur = null), eg = Array.from(r.touches).map((s) => fv({
        clientX: s.clientX,
        clientY: s.clientY,
        currentTarget: r.currentTarget
      }));
      var u = () => {
        if (oa != null) {
          var s = t.getState(), c = io(s, s.tooltip.settings.shared);
          if (c === "axis") {
            var d, f = (d = eg) === null || d === void 0 ? void 0 : d[0];
            if (f == null) {
              sn = null, Ur = null;
              return;
            }
            var v = dv(s, f);
            v?.activeIndex != null && t.dispatch(_w({
              activeIndex: v.activeIndex,
              activeDataKey: void 0,
              activeCoordinate: v.activeCoordinate
            }));
          } else if (c === "item") {
            var h, p = oa.touches[0];
            if (document.elementFromPoint == null || p == null)
              return;
            var m = document.elementFromPoint(p.clientX, p.clientY);
            if (!m || !m.getAttribute)
              return;
            var g = m.getAttribute(j0), w = (h = m.getAttribute(pd)) !== null && h !== void 0 ? h : void 0, x = Kn(s).find((b) => b.id === w);
            if (g == null || x == null || w == null)
              return;
            var A = x.dataKey, P = oY(s, g, w);
            t.dispatch(zn({
              activeDataKey: A,
              activeIndex: g,
              activeCoordinate: P,
              activeGraphicalItemId: w
            }));
          }
          sn = null, Ur = null;
        }
      };
      if (!l) {
        u();
        return;
      }
      a === "raf" ? sn = requestAnimationFrame(u) : typeof a == "number" && Ur === null && (u(), oa = null, Ur = setTimeout(() => {
        oa ? u() : (Ur = null, sn = null);
      }, a));
    }
  }
});
var Vi = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
}, ZP = ht({
  name: "eventSettings",
  initialState: Vi,
  reducers: {
    setEventSettings: (e, t) => {
      t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = ye(t.payload.throttledEvents));
    }
  }
}), lY = ZP.actions.setEventSettings, uY = ZP.reducer, sY = Vb({
  brush: AW,
  cartesianAxis: Pz,
  chartData: NN,
  errorBars: YU,
  eventSettings: uY,
  graphicalItems: wB,
  layout: sk,
  legend: lj,
  options: CN,
  polarAxis: GR,
  polarOptions: iY,
  referenceElements: VW,
  renderedTicks: GF,
  rootProps: Q8,
  tooltip: Z$,
  zIndex: bN
}), cY = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return _1({
    reducer: sY,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState: t,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (n) => {
      var i;
      return n({
        serializableCheck: !1,
        immutableCheck: !["commonjs", "es6", "production"].includes((i = "es6") !== null && i !== void 0 ? i : "")
      }).concat([zP.middleware, KP.middleware, us.middleware, VP.middleware, qP.middleware]);
    },
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (n) => {
      var i = n;
      return typeof n == "function" && (i = n()), i.concat(s0({
        type: "raf"
      }));
    },
    devTools: Mn.devToolsEnabled && {
      serialize: {
        replacer: J8
      },
      name: "recharts-".concat(r)
    }
  });
};
function po(e) {
  var t = e.preloadedState, r = e.children, n = e.reduxStoreName, i = se(), a = H(null);
  if (i)
    return r;
  a.current == null && (a.current = cY(t, n));
  var o = ld;
  return /* @__PURE__ */ y(Sj, {
    context: o,
    store: a.current
  }, r);
}
function dY(e) {
  var t = e.layout, r = e.margin, n = ee(), i = se();
  return ae(() => {
    i || (n(ok(t)), n(A0(r)));
  }, [n, i, t, r]), null;
}
var JP = /* @__PURE__ */ De(dY, Br);
function QP(e) {
  var t = ee();
  return ae(() => {
    t(eY(e));
  }, [t, e]), null;
}
var fY = (e) => {
  var t = ee();
  return ae(() => {
    t(lY(e));
  }, [t, e]), null;
}, yo = /* @__PURE__ */ De(fY, Br);
function tg(e) {
  var t = e.zIndex, r = e.isPanorama, n = H(null), i = ee();
  return ke(() => (n.current && i(mN({
    zIndex: t,
    element: n.current,
    isPanorama: r
  })), () => {
    i(gN({
      zIndex: t,
      isPanorama: r
    }));
  }), [i, t, r]), /* @__PURE__ */ y("g", {
    tabIndex: -1,
    ref: n,
    className: "recharts-zIndex-layer_".concat(t)
  });
}
function rg(e) {
  var t = e.children, r = e.isPanorama, n = C(uN);
  if (!n || n.length === 0)
    return t;
  var i = n.filter((o) => o < 0), a = n.filter((o) => o > 0);
  return /* @__PURE__ */ y(le, null, i.map((o) => /* @__PURE__ */ y(tg, {
    key: o,
    zIndex: o,
    isPanorama: r
  })), t, a.map((o) => /* @__PURE__ */ y(tg, {
    key: o,
    zIndex: o,
    isPanorama: r
  })));
}
var vY = ["children"];
function hY(e, t) {
  if (e == null) return {};
  var r, n, i = pY(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function pY(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Gl() {
  return Gl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gl.apply(null, arguments);
}
var yY = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
}, mY = /* @__PURE__ */ Pe((e, t) => {
  var r = Ii(), n = ki(), i = B0();
  if (!Pt(r) || !Pt(n))
    return null;
  var a = e.children, o = e.otherAttributes, l = e.title, u = e.desc, s, c;
  return o != null && (typeof o.tabIndex == "number" ? s = o.tabIndex : s = i ? 0 : void 0, typeof o.role == "string" ? c = o.role : c = i ? "application" : void 0), /* @__PURE__ */ y(Pi, Gl({}, o, {
    title: l,
    desc: u,
    role: c,
    tabIndex: s,
    width: r,
    height: n,
    style: yY,
    ref: t
  }), a);
}), gY = (e) => {
  var t = e.children, r = C(Fa);
  if (!r)
    return null;
  var n = r.width, i = r.height, a = r.y, o = r.x;
  return /* @__PURE__ */ y(Pi, {
    width: n,
    height: i,
    x: o,
    y: a
  }, t);
}, ng = /* @__PURE__ */ Pe((e, t) => {
  var r = e.children, n = hY(e, vY), i = se();
  return i ? /* @__PURE__ */ y(gY, null, /* @__PURE__ */ y(rg, {
    isPanorama: !0
  }, r)) : /* @__PURE__ */ y(mY, Gl({
    ref: t
  }, n), /* @__PURE__ */ y(rg, {
    isPanorama: !1
  }, r));
});
function bY(e, t) {
  return PY(e) || AY(e, t) || wY(e, t) || xY();
}
function xY() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function wY(e, t) {
  if (e) {
    if (typeof e == "string") return ig(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? ig(e, t) : void 0;
  }
}
function ig(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function AY(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function PY(e) {
  if (Array.isArray(e)) return e;
}
function OY() {
  var e = ee(), t = Ne(null), r = bY(t, 2), n = r[0], i = r[1], a = C(Pk);
  return ae(() => {
    if (n != null) {
      var o = n.getBoundingClientRect(), l = o.width / n.offsetWidth;
      Q(l) && l !== a && e(uk(l));
    }
  }, [n, e, a]), i;
}
function ag(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function SY(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ag(Object(r), !0).forEach(function(n) {
      IY(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ag(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function IY(e, t, r) {
  return (t = kY(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kY(e) {
  var t = jY(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function jY(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Zr() {
  return Zr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zr.apply(null, arguments);
}
function ql(e, t) {
  return DY(e) || CY(e, t) || EY(e, t) || TY();
}
function TY() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function EY(e, t) {
  if (e) {
    if (typeof e == "string") return og(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? og(e, t) : void 0;
  }
}
function og(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function CY(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function DY(e) {
  if (Array.isArray(e)) return e;
}
var MY = () => (XN(), null);
function Zl(e) {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return 0;
}
var $Y = /* @__PURE__ */ Pe((e, t) => {
  var r, n, i = H(null), a = Ne({
    containerWidth: Zl((r = e.style) === null || r === void 0 ? void 0 : r.width),
    containerHeight: Zl((n = e.style) === null || n === void 0 ? void 0 : n.height)
  }), o = ql(a, 2), l = o[0], u = o[1], s = ue((d, f) => {
    u((v) => {
      var h = Math.round(d), p = Math.round(f);
      return v.containerWidth === h && v.containerHeight === p ? v : {
        containerWidth: h,
        containerHeight: p
      };
    });
  }, []), c = ue((d) => {
    if (typeof t == "function" && t(d), i.current != null && (i.current.disconnect(), i.current = null), d != null && typeof ResizeObserver < "u") {
      var f = d.getBoundingClientRect(), v = f.width, h = f.height;
      s(v, h);
      var p = (g) => {
        var w = g[0];
        if (w != null) {
          var x = w.contentRect, A = x.width, P = x.height;
          s(A, P);
        }
      }, m = new ResizeObserver(p);
      m.observe(d), i.current = m;
    }
  }, [t, s]);
  return ae(() => () => {
    var d = i.current;
    d?.disconnect();
  }, [s]), /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Dn, {
    width: l.containerWidth,
    height: l.containerHeight
  }), /* @__PURE__ */ y("div", Zr({
    ref: c
  }, e)));
}), _Y = /* @__PURE__ */ Pe((e, t) => {
  var r = e.width, n = e.height, i = Ne({
    containerWidth: Zl(r),
    containerHeight: Zl(n)
  }), a = ql(i, 2), o = a[0], l = a[1], u = ue((c, d) => {
    l((f) => {
      var v = Math.round(c), h = Math.round(d);
      return f.containerWidth === v && f.containerHeight === h ? f : {
        containerWidth: v,
        containerHeight: h
      };
    });
  }, []), s = ue((c) => {
    if (typeof t == "function" && t(c), c != null) {
      var d = c.getBoundingClientRect(), f = d.width, v = d.height;
      u(f, v);
    }
  }, [t, u]);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Dn, {
    width: o.containerWidth,
    height: o.containerHeight
  }), /* @__PURE__ */ y("div", Zr({
    ref: s
  }, e)));
}), NY = /* @__PURE__ */ Pe((e, t) => {
  var r = e.width, n = e.height;
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Dn, {
    width: r,
    height: n
  }), /* @__PURE__ */ y("div", Zr({
    ref: t
  }, e)));
}), LY = /* @__PURE__ */ Pe((e, t) => {
  var r = e.width, n = e.height;
  return typeof r == "string" || typeof n == "string" ? /* @__PURE__ */ y(_Y, Zr({}, e, {
    ref: t
  })) : typeof r == "number" && typeof n == "number" ? /* @__PURE__ */ y(NY, Zr({}, e, {
    width: r,
    height: n,
    ref: t
  })) : /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Dn, {
    width: r,
    height: n
  }), /* @__PURE__ */ y("div", Zr({
    ref: t
  }, e)));
});
function RY(e) {
  return e ? $Y : LY;
}
var ss = /* @__PURE__ */ Pe((e, t) => {
  var r = e.children, n = e.className, i = e.height, a = e.onClick, o = e.onContextMenu, l = e.onDoubleClick, u = e.onMouseDown, s = e.onMouseEnter, c = e.onMouseLeave, d = e.onMouseMove, f = e.onMouseUp, v = e.onTouchEnd, h = e.onTouchMove, p = e.onTouchStart, m = e.style, g = e.width, w = e.responsive, x = e.dispatchTouchEvents, A = x === void 0 ? !0 : x, P = H(null), b = ee(), O = Ne(null), I = ql(O, 2), E = I[0], j = I[1], T = Ne(null), k = ql(T, 2), _ = k[0], $ = k[1], M = OY(), R = gd(), K = R?.width > 0 ? R.width : g, N = R?.height > 0 ? R.height : i, z = ue((Y) => {
    M(Y), typeof t == "function" && t(Y), j(Y), $(Y), Y != null && (P.current = Y);
  }, [M, t, j, $]), W = ue((Y) => {
    b(BP(Y)), b(Lt({
      handler: a,
      reactEvent: Y
    }));
  }, [b, a]), Z = ue((Y) => {
    b(Fc(Y)), b(Lt({
      handler: s,
      reactEvent: Y
    }));
  }, [b, s]), ne = ue((Y) => {
    b($w()), b(Lt({
      handler: c,
      reactEvent: Y
    }));
  }, [b, c]), ce = ue((Y) => {
    b(Fc(Y)), b(Lt({
      handler: d,
      reactEvent: Y
    }));
  }, [b, d]), ve = ue(() => {
    b(XP());
  }, [b]), Te = ue(() => {
    b(HP());
  }, [b]), Ke = ue((Y) => {
    b(UP(Y.key));
  }, [b]), Fe = ue((Y) => {
    b(Lt({
      handler: o,
      reactEvent: Y
    }));
  }, [b, o]), $t = ue((Y) => {
    b(Lt({
      handler: l,
      reactEvent: Y
    }));
  }, [b, l]), B = ue((Y) => {
    b(Lt({
      handler: u,
      reactEvent: Y
    }));
  }, [b, u]), U = ue((Y) => {
    b(Lt({
      handler: f,
      reactEvent: Y
    }));
  }, [b, f]), q = ue((Y) => {
    b(Lt({
      handler: p,
      reactEvent: Y
    }));
  }, [b, p]), D = ue((Y) => {
    A && b(GP(Y)), b(Lt({
      handler: h,
      reactEvent: Y
    }));
  }, [b, A, h]), Be = ue((Y) => {
    b(Lt({
      handler: v,
      reactEvent: Y
    }));
  }, [b, v]), ge = RY(w);
  return /* @__PURE__ */ y(lo.Provider, {
    value: E
  }, /* @__PURE__ */ y(Gg.Provider, {
    value: _
  }, /* @__PURE__ */ y(ge, {
    width: K ?? m?.width,
    height: N ?? m?.height,
    className: J("recharts-wrapper", n),
    style: SY({
      position: "relative",
      cursor: "default",
      width: K,
      height: N
    }, m),
    onClick: W,
    onContextMenu: Fe,
    onDoubleClick: $t,
    onFocus: ve,
    onBlur: Te,
    onKeyDown: Ke,
    onMouseDown: B,
    onMouseEnter: Z,
    onMouseLeave: ne,
    onMouseMove: ce,
    onMouseUp: U,
    onTouchEnd: Be,
    onTouchMove: D,
    onTouchStart: q,
    ref: z
  }, /* @__PURE__ */ y(MY, null), r)));
}), BY = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function zY(e, t) {
  if (e == null) return {};
  var r, n, i = KY(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function KY(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var eO = /* @__PURE__ */ Pe((e, t) => {
  var r = e.width, n = e.height, i = e.responsive, a = e.children, o = e.className, l = e.style, u = e.compact, s = e.title, c = e.desc, d = zY(e, BY), f = oe(d);
  return u ? /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(Dn, {
    width: r,
    height: n
  }), /* @__PURE__ */ y(ng, {
    otherAttributes: f,
    title: s,
    desc: c
  }, a)) : /* @__PURE__ */ y(ss, {
    className: o,
    style: l,
    width: r,
    height: n,
    responsive: i ?? !1,
    onClick: e.onClick,
    onMouseLeave: e.onMouseLeave,
    onMouseEnter: e.onMouseEnter,
    onMouseMove: e.onMouseMove,
    onMouseDown: e.onMouseDown,
    onMouseUp: e.onMouseUp,
    onContextMenu: e.onContextMenu,
    onDoubleClick: e.onDoubleClick,
    onTouchStart: e.onTouchStart,
    onTouchMove: e.onTouchMove,
    onTouchEnd: e.onTouchEnd
  }, /* @__PURE__ */ y(ng, {
    otherAttributes: f,
    title: s,
    desc: c,
    ref: t
  }, /* @__PURE__ */ y(eF, null, a)));
});
function Uc() {
  return Uc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Uc.apply(null, arguments);
}
function lg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function WY(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? lg(Object(r), !0).forEach(function(n) {
      FY(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FY(e, t, r) {
  return (t = UY(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UY(e) {
  var t = XY(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function XY(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var HY = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, YY = WY({
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  layout: "horizontal",
  margin: HY,
  responsive: !1,
  reverseStackOrder: !1,
  stackOffset: "none",
  syncMethod: "index"
}, Vi), Gi = /* @__PURE__ */ Pe(function(t, r) {
  var n, i = re(t.categoricalChartProps, YY), a = t.chartName, o = t.defaultTooltipEventType, l = t.validateTooltipEventTypes, u = t.tooltipPayloadSearcher, s = t.categoricalChartProps, c = {
    chartName: a,
    defaultTooltipEventType: o,
    validateTooltipEventTypes: l,
    tooltipPayloadSearcher: u,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ y(po, {
    preloadedState: {
      options: c
    },
    reduxStoreName: (n = s.id) !== null && n !== void 0 ? n : a
  }, /* @__PURE__ */ y(rP, {
    chartData: s.data
  }), /* @__PURE__ */ y(JP, {
    layout: i.layout,
    margin: i.margin
  }), /* @__PURE__ */ y(yo, {
    throttleDelay: i.throttleDelay,
    throttledEvents: i.throttledEvents
  }), /* @__PURE__ */ y(QP, {
    baseValue: i.baseValue,
    accessibilityLayer: i.accessibilityLayer,
    barCategoryGap: i.barCategoryGap,
    maxBarSize: i.maxBarSize,
    stackOffset: i.stackOffset,
    barGap: i.barGap,
    barSize: i.barSize,
    syncId: i.syncId,
    syncMethod: i.syncMethod,
    className: i.className,
    reverseStackOrder: i.reverseStackOrder
  }), /* @__PURE__ */ y(eO, Uc({}, i, {
    ref: r
  })));
}), VY = ["axis"], GY = /* @__PURE__ */ Pe((e, t) => /* @__PURE__ */ y(Gi, {
  chartName: "LineChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: VY,
  tooltipPayloadSearcher: Fr,
  categoricalChartProps: e,
  ref: t
})), qY = ["axis", "item"], ZY = /* @__PURE__ */ Pe((e, t) => /* @__PURE__ */ y(Gi, {
  chartName: "BarChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: qY,
  tooltipPayloadSearcher: Fr,
  categoricalChartProps: e,
  ref: t
}));
function JY(e) {
  var t = ee();
  return ae(() => {
    t(nY(e));
  }, [t, e]), null;
}
var QY = ["layout"];
function Xc() {
  return Xc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xc.apply(null, arguments);
}
function e5(e, t) {
  if (e == null) return {};
  var r, n, i = t5(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function t5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function ug(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function r5(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ug(Object(r), !0).forEach(function(n) {
      n5(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ug(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function n5(e, t, r) {
  return (t = i5(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function i5(e) {
  var t = a5(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function a5(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var o5 = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, cs = r5({
  accessibilityLayer: !0,
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: o5,
  reverseStackOrder: !1,
  syncMethod: "index",
  layout: "radial",
  responsive: !1,
  cx: "50%",
  cy: "50%",
  innerRadius: 0,
  outerRadius: "80%"
}, Vi), vv = /* @__PURE__ */ Pe(function(t, r) {
  var n, i = re(t.categoricalChartProps, cs), a = i.layout, o = e5(i, QY), l = t.chartName, u = t.defaultTooltipEventType, s = t.validateTooltipEventTypes, c = t.tooltipPayloadSearcher, d = {
    chartName: l,
    defaultTooltipEventType: u,
    validateTooltipEventTypes: s,
    tooltipPayloadSearcher: c,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ y(po, {
    preloadedState: {
      options: d
    },
    reduxStoreName: (n = i.id) !== null && n !== void 0 ? n : l
  }, /* @__PURE__ */ y(rP, {
    chartData: i.data
  }), /* @__PURE__ */ y(JP, {
    layout: a,
    margin: i.margin
  }), /* @__PURE__ */ y(yo, {
    throttleDelay: i.throttleDelay,
    throttledEvents: i.throttledEvents
  }), /* @__PURE__ */ y(QP, {
    baseValue: void 0,
    accessibilityLayer: i.accessibilityLayer,
    barCategoryGap: i.barCategoryGap,
    maxBarSize: i.maxBarSize,
    stackOffset: i.stackOffset,
    barGap: i.barGap,
    barSize: i.barSize,
    syncId: i.syncId,
    syncMethod: i.syncMethod,
    className: i.className,
    reverseStackOrder: i.reverseStackOrder
  }), /* @__PURE__ */ y(JY, {
    cx: i.cx,
    cy: i.cy,
    startAngle: i.startAngle,
    endAngle: i.endAngle,
    innerRadius: i.innerRadius,
    outerRadius: i.outerRadius
  }), /* @__PURE__ */ y(eO, Xc({}, o, {
    ref: r
  })));
});
function sg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function cg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sg(Object(r), !0).forEach(function(n) {
      l5(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function l5(e, t, r) {
  return (t = u5(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function u5(e) {
  var t = s5(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function s5(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var c5 = ["item"], d5 = cg(cg({}, cs), {}, {
  layout: "centric",
  startAngle: 0,
  endAngle: 360
}), f5 = /* @__PURE__ */ Pe((e, t) => {
  var r = re(e, d5);
  return /* @__PURE__ */ y(vv, {
    chartName: "PieChart",
    defaultTooltipEventType: "item",
    validateTooltipEventTypes: c5,
    tooltipPayloadSearcher: Fr,
    categoricalChartProps: r,
    ref: t
  });
});
function v5(e) {
  if (typeof e != "object" || e == null) return !1;
  if (Object.getPrototypeOf(e) === null) return !0;
  if (Object.prototype.toString.call(e) !== "[object Object]") {
    const r = e[Symbol.toStringTag];
    return r == null || !Object.getOwnPropertyDescriptor(e, Symbol.toStringTag)?.writable ? !1 : e.toString() === `[object ${r}]`;
  }
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function h5(e) {
  return Array.isArray(e);
}
function p5(e, t = 1) {
  if (!Oi(e)) return [];
  const r = [], n = Math.floor(t), i = (a, o) => {
    for (let l = 0; l < a.length; l++) {
      const u = a[l];
      y5(u) && o < n ? i(u, o + 1) : r.push(u);
    }
  };
  return i(Array.from(e), 0), r;
}
function y5(e) {
  return h5(e) || Kb(e) || !!(e && e[Symbol.isConcatSpreadable]);
}
function m5(e) {
  return p5(e, 1);
}
function Us(e, t) {
  if (e == null) return !0;
  switch (typeof t) {
    case "symbol":
    case "number":
    case "object":
      if (Array.isArray(t)) return dg(e, t);
      if (typeof t == "number" ? t = La(t) : typeof t == "object" && (Object.is(t?.valueOf(), -0) ? t = "-0" : t = String(t)), ai(t)) return !1;
      if (e?.[t] === void 0) return !0;
      try {
        return delete e[t], !0;
      } catch {
        return !1;
      }
    case "string":
      if (e?.[t] === void 0 && iu(t) && !Object.hasOwn(e, t)) return dg(e, au(t));
      if (ai(t)) return !1;
      try {
        return delete e[t], !0;
      } catch {
        return !1;
      }
  }
}
function dg(e, t) {
  const r = t.length === 1 ? e : yt(e, t.slice(0, -1)), n = t[t.length - 1];
  if (r?.[n] === void 0) return !0;
  if (ai(n)) return !1;
  try {
    return delete r[n], !0;
  } catch {
    return !1;
  }
}
function g5(e) {
  const t = e?.constructor;
  return e === (typeof t == "function" ? t.prototype : Object.prototype);
}
function b5(e) {
  return yb(e);
}
function x5(e) {
  const t = Ko(e), r = t % 1;
  return r ? t - r : t;
}
function w5(e, t) {
  if (e = x5(e), e < 1 || !Number.isSafeInteger(e)) return [];
  const r = new Array(e);
  for (let n = 0; n < e; n++) r[n] = typeof t == "function" ? t(n) : n;
  return r;
}
function tO(e) {
  if (e == null) return [];
  switch (typeof e) {
    case "object":
    case "function":
      return Oi(e) ? P5(e) : g5(e) ? A5(e) : Jl(e);
    default:
      return Jl(Object(e));
  }
}
function Jl(e) {
  const t = [];
  for (const r in e) t.push(r);
  return t;
}
function A5(e) {
  return Jl(e).filter((t) => t !== "constructor");
}
function P5(e) {
  const t = w5(e.length, (i) => `${i}`), r = new Set(t);
  el(e) && (r.add("offset"), r.add("parent")), b5(e) && (r.add("buffer"), r.add("byteLength"), r.add("byteOffset"));
  const n = Jl(e).filter((i) => !r.has(i));
  return Array.isArray(e) ? [...t, ...n] : [...t.filter((i) => Object.hasOwn(e, i)), ...n];
}
function rO(e) {
  const t = [];
  for (; e; )
    t.push(...Qo(e)), e = Object.getPrototypeOf(e);
  return t;
}
function nO(e, ...t) {
  if (e == null) return {};
  t = m5(t);
  const r = O5(e, t);
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    switch (typeof i) {
      case "object":
        if (Array.isArray(i)) Us(r, i);
        else {
          const a = Array.from(i);
          for (let o = 0; o < a.length; o++) Us(r, a[o]);
        }
        break;
      case "string":
      case "symbol":
      case "number":
        Us(r, i);
        break;
    }
  }
  return r;
}
function O5(e, t) {
  return t.some((r) => Array.isArray(r) || iu(r)) ? I5(e) : S5(e);
}
function S5(e) {
  const t = {}, r = [...tO(e), ...rO(e)];
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    t[i] = e[i];
  }
  return t;
}
function I5(e) {
  const t = {}, r = [...tO(e), ...rO(e)];
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    t[i] = Bb(e[i], (a) => {
      if (!v5(a))
        return a;
    });
  }
  return t;
}
var k5 = ["width", "height", "className", "style", "children", "type"];
function j5(e, t) {
  if (e == null) return {};
  var r, n, i = T5(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function T5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function bi() {
  return bi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, bi.apply(null, arguments);
}
function iO(e, t) {
  return M5(e) || D5(e, t) || C5(e, t) || E5();
}
function E5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function C5(e, t) {
  if (e) {
    if (typeof e == "string") return fg(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? fg(e, t) : void 0;
  }
}
function fg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function D5(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        u = !1;
      } else for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function M5(e) {
  if (Array.isArray(e)) return e;
}
function vg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Oe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vg(Object(r), !0).forEach(function(n) {
      ga(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ga(e, t, r) {
  return (t = $5(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $5(e) {
  var t = _5(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function _5(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hv = "value";
function N5(e) {
  return e != null && typeof e == "object" && "x" in e && "y" in e && "width" in e && "height" in e && typeof e.x == "number" && typeof e.y == "number" && typeof e.width == "number" && typeof e.height == "number";
}
var aO = (e, t) => {
  if (!(!e || !t))
    return yt(e, t);
}, L5 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "".concat(r, "children[").concat(t, "]");
}, R5 = {
  chartName: "Treemap",
  defaultTooltipEventType: "item",
  validateTooltipEventTypes: ["item"],
  tooltipPayloadSearcher: aO,
  eventEmitter: void 0
}, B5 = 30, _o = (e, t) => t === "nest" ? e - B5 : e, Fo = (e) => {
  var t = e.depth, r = e.node, n = e.index, i = e.dataKey, a = e.nameKey, o = e.nestedActiveTooltipIndex, l = t === 0 ? "" : L5(n, o), u = r.children, s = t + 1, c = u && u.length ? u.map((h, p) => Fo({
    depth: s,
    node: h,
    index: p,
    dataKey: i,
    nameKey: a,
    nestedActiveTooltipIndex: l
  })) : null, d;
  if (c && c.length)
    d = c.reduce((h, p) => h + p.value, 0);
  else {
    var f = r[i], v = typeof f == "number" ? f : 0;
    d = Et(v) || v <= 0 ? 0 : v;
  }
  return Oe(Oe({}, r), {}, {
    children: c,
    // @ts-expect-error getValueByDataKey does not validate the output type
    name: G(r, a, ""),
    [hv]: d,
    depth: t,
    index: n,
    tooltipIndex: l
  });
}, z5 = (e) => ({
  x: e.x,
  y: e.y,
  width: e.width,
  height: e.height
}), K5 = (e, t) => {
  if (!Number.isFinite(t) || t <= 0)
    return e;
  var r = Math.min(t, e.width / 2, e.height / 2);
  return {
    x: e.x + r,
    y: e.y + r,
    width: Math.max(e.width - r * 2, 0),
    height: Math.max(e.height - r * 2, 0)
  };
}, W5 = (e, t, r) => {
  if (!Number.isFinite(r) || r <= 0)
    return e;
  var n = r / 2, i = t.x + t.width, a = t.y + t.height;
  return e.map((o) => {
    var l = o.x + o.width, u = o.y + o.height, s = o.x > t.x ? n : 0, c = l < i ? n : 0, d = o.y > t.y ? n : 0, f = u < a ? n : 0;
    return Oe(Oe({}, o), {}, {
      x: o.x + s,
      y: o.y + d,
      width: Math.max(o.width - s - c, 0),
      height: Math.max(o.height - d - f, 0)
    });
  });
}, F5 = (e, t) => {
  var r = t < 0 ? 0 : t;
  return e.map((n) => {
    var i = n[hv] * r;
    return Oe(Oe({}, n), {}, {
      area: Et(i) || i <= 0 ? 0 : i
    });
  });
}, U5 = (e, t, r) => {
  var n = t * t, i = e.area * e.area, a = e.reduce((u, s) => ({
    min: Math.min(u.min, s.area),
    max: Math.max(u.max, s.area)
  }), {
    min: 1 / 0,
    max: 0
  }), o = a.min, l = a.max;
  return i ? Math.max(n * l * r / i, i / (n * o * r)) : 1 / 0;
}, X5 = (e, t, r, n) => {
  var i = t ? Math.round(e.area / t) : 0;
  (n || i > r.height) && (i = r.height);
  for (var a = r.x, o, l = 0, u = e.length; l < u; l++)
    o = e[l], o != null && (o.x = a, o.y = r.y, o.height = i, o.width = Math.min(i ? Math.round(o.area / i) : 0, r.x + r.width - a), a += o.width);
  return o != null && (o.width += r.x + r.width - a), Oe(Oe({}, r), {}, {
    y: r.y + i,
    height: r.height - i
  });
}, H5 = (e, t, r, n) => {
  var i = t ? Math.round(e.area / t) : 0;
  (n || i > r.width) && (i = r.width);
  for (var a = r.y, o, l = 0, u = e.length; l < u; l++)
    o = e[l], o != null && (o.x = r.x, o.y = a, o.width = i, o.height = Math.min(i ? Math.round(o.area / i) : 0, r.y + r.height - a), a += o.height);
  return o && (o.height += r.y + r.height - a), Oe(Oe({}, r), {}, {
    x: r.x + i,
    width: r.width - i
  });
}, hg = (e, t, r, n) => t === r.width ? X5(e, t, r, n) : H5(e, t, r, n), Uo = (e, t, r, n) => {
  var i = e.children;
  if (i && i.length) {
    var a = K5(z5(e), r), o = a, l = [], u = 1 / 0, s, c, d = Math.min(o.width, o.height), f = F5(i, o.width * o.height / e[hv]), v = f.slice();
    for (l.area = 0; v.length > 0; ) {
      var h = iO(v, 1);
      if (s = h[0], s != null)
        if (l.push(s), l.area += s.area, c = U5(l, d, t), c <= u)
          v.shift(), u = c;
        else {
          var p, m;
          l.area -= (p = (m = l.pop()) === null || m === void 0 ? void 0 : m.area) !== null && p !== void 0 ? p : 0, o = hg(l, d, o, !1), d = Math.min(o.width, o.height), l.length = l.area = 0, u = 1 / 0;
        }
    }
    l.length && (o = hg(l, d, o, !0), l.length = l.area = 0);
    var g = W5(f, a, n);
    return Oe(Oe({}, e), {}, {
      children: g.map((w) => Uo(w, t, r, n))
    });
  }
  return e;
}, fa = Oe({
  aspectRatio: 0.5 * (1 + Math.sqrt(5)),
  nodeInset: 0,
  nodeGap: 0,
  dataKey: "value",
  nameKey: "name",
  type: "flat",
  isAnimationActive: "auto",
  isUpdateAnimationActive: "auto",
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "linear"
}, Vi), Y5 = {
  isAnimationFinished: !1,
  formatRoot: null,
  currentRoot: void 0,
  nestIndex: [],
  prevAspectRatio: fa.aspectRatio,
  prevNodeInset: fa.nodeInset,
  prevNodeGap: fa.nodeGap,
  prevDataKey: fa.dataKey
};
function V5(e) {
  var t = e.content, r = e.nodeProps, n = e.type, i = e.colorPanel, a = e.onMouseEnter, o = e.onMouseLeave, l = e.onClick;
  if (/* @__PURE__ */ ie(t))
    return /* @__PURE__ */ y(X, {
      onMouseEnter: a,
      onMouseLeave: o,
      onClick: l
    }, /* @__PURE__ */ Ae(t, r));
  if (typeof t == "function")
    return /* @__PURE__ */ y(X, {
      onMouseEnter: a,
      onMouseLeave: o,
      onClick: l
    }, t(r));
  var u = r.x, s = r.y, c = r.width, d = r.height, f = r.index, v = null;
  c > 10 && d > 10 && r.children && n === "nest" && r.depth > 0 && (v = /* @__PURE__ */ y(Nf, {
    points: [{
      x: u + 2,
      y: s + d / 2
    }, {
      x: u + 6,
      y: s + d / 2 + 3
    }, {
      x: u + 2,
      y: s + d / 2 + 6
    }]
  }));
  var h = null, p = ii(r.name);
  c > 20 && d > 20 && p.width < c && p.height < d && (h = /* @__PURE__ */ y("text", {
    x: u + 8,
    y: s + d / 2 + 7,
    fontSize: 14
  }, r.name));
  var m = i || Ok;
  return /* @__PURE__ */ y("g", null, /* @__PURE__ */ y(ji, bi({
    fill: r.depth < 2 ? m[f % m.length] : "rgba(255,255,255,0)",
    stroke: "#fff"
  }, nO(r, ["children"]), {
    onMouseEnter: a,
    onMouseLeave: o,
    onClick: l,
    "data-recharts-item-index": r.tooltipIndex
  })), v, h);
}
function G5(e) {
  var t = ee(), r = {
    x: e.nodeProps.x + e.nodeProps.width / 2,
    y: e.nodeProps.y + e.nodeProps.height / 2
  }, n = () => {
    t(zn({
      activeIndex: e.nodeProps.tooltipIndex,
      activeDataKey: e.dataKey,
      activeCoordinate: r,
      activeGraphicalItemId: e.id
    }));
  }, i = () => {
  }, a = () => {
    t(ao({
      activeIndex: e.nodeProps.tooltipIndex,
      activeDataKey: e.dataKey,
      activeCoordinate: r,
      activeGraphicalItemId: e.id
    }));
  };
  return /* @__PURE__ */ y(V5, bi({}, e, {
    onMouseEnter: n,
    onMouseLeave: i,
    onClick: a
  }));
}
var q5 = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.nameKey, n = e.stroke, i = e.fill, a = e.currentRoot, o = e.id, l = {
    dataDefinedOnItem: a,
    getPosition: mt,
    // TODO I think Treemap has the capability of computing positions and supporting defaultIndex? Except it doesn't yet
    settings: {
      stroke: n,
      strokeWidth: void 0,
      fill: i,
      dataKey: t,
      nameKey: r,
      name: void 0,
      // Each TreemapNode has its own name
      hide: !1,
      type: void 0,
      color: i,
      unit: "",
      graphicalItemId: o
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: l
  });
}), Z5 = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
function J5(e) {
  var t = e.content, r = e.nodeProps, n = e.isLeaf, i = e.treemapProps, a = e.onNestClick, o = i.id, l = i.isAnimationActive, u = i.animationBegin, s = i.animationDuration, c = i.animationEasing, d = i.isUpdateAnimationActive, f = i.type, v = i.colorPanel, h = i.dataKey, p = i.onAnimationStart, m = i.onAnimationEnd, g = i.onMouseEnter, w = i.onClick, x = i.onMouseLeave, A = r.width, P = r.height, b = r.x, O = r.y, I = -b - A, E = 0, j = (M) => {
    (n || f === "nest") && typeof g == "function" && g(r, M);
  }, T = (M) => {
    (n || f === "nest") && typeof x == "function" && x(r, M);
  }, k = () => {
    f === "nest" && r.depth > 0 && a(r), (n || f === "nest") && typeof w == "function" && w(r);
  }, _ = ue(() => {
    typeof m == "function" && m();
  }, [m]), $ = ue(() => {
    typeof p == "function" && p();
  }, [p]);
  return /* @__PURE__ */ y(RP, {
    animationId: "treemap-".concat(r.tooltipIndex),
    from: "translate(".concat(I, "px, ").concat(E, "px)"),
    to: "translate(0, 0)",
    attributeName: "transform",
    begin: u,
    easing: LP(c),
    isActive: l,
    duration: s,
    onAnimationStart: $,
    onAnimationEnd: _
  }, (M) => /* @__PURE__ */ y(X, {
    onMouseEnter: j,
    onMouseLeave: T,
    onClick: k,
    style: Oe(Oe({}, M), {}, {
      transformOrigin: "".concat(b, " ").concat(O)
    })
  }, /* @__PURE__ */ y(G5, {
    id: o,
    content: t,
    dataKey: h,
    nodeProps: Oe(Oe({}, r), {}, {
      isAnimationActive: l,
      isUpdateAnimationActive: !d,
      width: A,
      height: P,
      x: b,
      y: O
    }),
    type: f,
    colorPanel: v
  })));
}
class oO extends Ai {
  constructor() {
    super(...arguments), ga(this, "state", Oe({}, Y5)), ga(this, "handleClick", (t) => {
      var r = this.props, n = r.onClick, i = r.type;
      if (i === "nest" && t.children) {
        var a = this.props, o = a.width, l = a.height, u = a.dataKey, s = a.nameKey, c = a.aspectRatio, d = a.nodeInset, f = a.nodeGap, v = Fo({
          depth: 0,
          node: Oe(Oe({}, t), {}, {
            x: 0,
            y: 0,
            width: o,
            height: _o(l, i)
          }),
          index: 0,
          dataKey: u,
          nameKey: s,
          // with Treemap nesting, should this continue nesting the index or start from empty string?
          nestedActiveTooltipIndex: t.tooltipIndex
        }), h = Uo(v, c, d, f), p = this.state.nestIndex;
        p.push(t), this.setState({
          formatRoot: h,
          currentRoot: v,
          nestIndex: p
        });
      }
      n && n(t);
    }), ga(this, "handleTouchMove", (t) => {
      var r = t.touches[0];
      if (r != null) {
        var n = document.elementFromPoint(r.clientX, r.clientY);
        if (!(!n || !n.getAttribute || this.state.formatRoot == null)) {
          var i = n.getAttribute("data-recharts-item-index"), a = aO(this.state.formatRoot, i);
          if (N5(a)) {
            var o = this.props, l = o.dataKey, u = o.dispatch, s = {
              x: a.x + a.width / 2,
              y: a.y + a.height / 2
            };
            u(zn({
              activeIndex: i,
              activeDataKey: l,
              activeCoordinate: s,
              activeGraphicalItemId: this.props.id
            }));
          }
        }
      }
    });
  }
  static getDerivedStateFromProps(t, r) {
    if (t.data !== r.prevData || t.type !== r.prevType || t.width !== r.prevWidth || t.height !== r.prevHeight || t.dataKey !== r.prevDataKey || t.aspectRatio !== r.prevAspectRatio || t.nodeInset !== r.prevNodeInset || t.nodeGap !== r.prevNodeGap) {
      var n = Fo({
        depth: 0,
        node: {
          // @ts-expect-error missing properties
          children: t.data,
          x: 0,
          y: 0,
          width: t.width,
          height: _o(t.height, t.type)
        },
        index: 0,
        dataKey: t.dataKey,
        nameKey: t.nameKey
      }), i = Uo(n, t.aspectRatio, t.nodeInset, t.nodeGap);
      return Oe(Oe({}, r), {}, {
        formatRoot: i,
        currentRoot: n,
        nestIndex: [n],
        prevAspectRatio: t.aspectRatio,
        prevData: t.data,
        prevWidth: t.width,
        prevHeight: t.height,
        prevDataKey: t.dataKey,
        prevType: t.type,
        prevNodeInset: t.nodeInset,
        prevNodeGap: t.nodeGap
      });
    }
    return null;
  }
  handleNestIndex(t, r) {
    var n = this.state.nestIndex, i = this.props, a = i.width, o = i.height, l = i.dataKey, u = i.nameKey, s = i.aspectRatio, c = i.nodeInset, d = i.nodeGap, f = i.type, v = Fo({
      depth: 0,
      node: Oe(Oe({}, t), {}, {
        x: 0,
        y: 0,
        width: a,
        height: _o(o, f)
      }),
      index: 0,
      dataKey: l,
      nameKey: u,
      // with Treemap nesting, should this continue nesting the index or start from empty string?
      nestedActiveTooltipIndex: t.tooltipIndex
    }), h = Uo(v, s, c, d);
    n = n.slice(0, r + 1), this.setState({
      formatRoot: h,
      currentRoot: t,
      nestIndex: n
    });
  }
  renderNode(t, r) {
    var n = this.props, i = n.content, a = n.type, o = Oe(Oe(Oe({}, oe(this.props)), r), {}, {
      root: t
    }), l = !r.children || !r.children.length, u = this.state.currentRoot, s = (u?.children || []).filter((c) => c.depth === r.depth && c.name === r.name);
    return !s.length && t.depth && a === "nest" ? null : /* @__PURE__ */ y(X, {
      key: "recharts-treemap-node-".concat(o.x, "-").concat(o.y, "-").concat(o.name),
      className: "recharts-treemap-depth-".concat(r.depth)
    }, /* @__PURE__ */ y(J5, {
      isLeaf: l,
      content: i,
      nodeProps: o,
      treemapProps: this.props,
      onNestClick: this.handleClick
    }), r.children && r.children.length ? r.children.map((c) => this.renderNode(r, c)) : null);
  }
  renderAllNodes() {
    var t = this.state.formatRoot;
    return t ? this.renderNode(t, t) : null;
  }
  // render nest treemap
  renderNestIndex() {
    var t = this.props, r = t.nameKey, n = t.nestIndexContent, i = this.state.nestIndex;
    return /* @__PURE__ */ y("div", {
      className: "recharts-treemap-nest-index-wrapper",
      style: {
        marginTop: "8px",
        textAlign: "center"
      }
    }, i.map((a, o) => {
      var l = yt(a, r, "root"), u = typeof l == "string" ? l : "root", s;
      return /* @__PURE__ */ ie(n) && (s = /* @__PURE__ */ Ae(n, a, o)), typeof n == "function" ? s = n(a, o) : s = u, // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      /* @__PURE__ */ y("div", {
        onClick: this.handleNestIndex.bind(this, a, o),
        key: "nest-index-".concat(oi()),
        className: "recharts-treemap-nest-index-box",
        style: {
          cursor: "pointer",
          display: "inline-block",
          padding: "0 7px",
          background: "#000",
          color: "#fff",
          marginRight: "3px"
        }
      }, s);
    }));
  }
  render() {
    var t = this.props, r = t.width, n = t.height;
    t.className, t.style;
    var i = t.children, a = t.type, o = j5(t, k5), l = oe(o);
    return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(q5, {
      dataKey: this.props.dataKey,
      nameKey: this.props.nameKey,
      stroke: this.props.stroke,
      fill: this.props.fill,
      currentRoot: this.state.currentRoot,
      id: this.props.id
    }), /* @__PURE__ */ y(Pi, bi({}, l, {
      width: r,
      height: _o(n, a),
      onTouchMove: this.handleTouchMove
    }), this.renderAllNodes(), i), a === "nest" && this.renderNestIndex());
  }
}
ga(oO, "displayName", "Treemap");
function Q5(e) {
  var t = ee(), r = Ii(), n = ki();
  if (!Pt(r) || !Pt(n))
    return null;
  var i = e.id;
  return /* @__PURE__ */ y(or, {
    id: i,
    type: "treemap"
  }, (a) => /* @__PURE__ */ y(oO, bi({}, e, {
    id: a,
    width: r,
    height: n,
    dispatch: t
  })));
}
function X6(e) {
  var t, r = re(e, fa), n = r.className, i = r.style, a = r.width, o = r.height, l = r.throttleDelay, u = r.throttledEvents, s = Ne(null), c = iO(s, 2), d = c[0], f = c[1];
  return /* @__PURE__ */ y(po, {
    preloadedState: {
      options: R5
    },
    reduxStoreName: (t = r.className) !== null && t !== void 0 ? t : "Treemap"
  }, /* @__PURE__ */ y(xd, {
    margin: Z5
  }), /* @__PURE__ */ y(yo, {
    throttleDelay: l,
    throttledEvents: u
  }), /* @__PURE__ */ y(ss, {
    dispatchTouchEvents: !1,
    className: n,
    style: i,
    width: a,
    height: o,
    responsive: !1,
    ref: (v) => {
      d == null && v != null && f(v);
    },
    onMouseEnter: void 0,
    onMouseLeave: void 0,
    onClick: void 0,
    onMouseMove: void 0,
    onMouseDown: void 0,
    onMouseUp: void 0,
    onContextMenu: void 0,
    onDoubleClick: void 0,
    onTouchStart: void 0,
    onTouchMove: void 0,
    onTouchEnd: void 0
  }, /* @__PURE__ */ y(lo.Provider, {
    value: d
  }, /* @__PURE__ */ y(Q5, r))));
}
function eV(e, t) {
  if (!e || !e.length) return 0;
  t != null && (t = du(t));
  let r;
  for (let n = 0; n < e.length; n++) {
    const i = t ? t(e[n]) : e[n];
    i !== void 0 && (r === void 0 ? r = i : r += i);
  }
  return r;
}
var tV = ["sourceX", "sourceY", "sourceControlX", "targetX", "targetY", "targetControlX", "linkWidth"], rV = ["className", "style", "children", "id"];
function xi() {
  return xi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, xi.apply(null, arguments);
}
function lO(e, t) {
  if (e == null) return {};
  var r, n, i = nV(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function nV(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function uO(e, t) {
  return lV(e) || oV(e, t) || aV(e, t) || iV();
}
function iV() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function aV(e, t) {
  if (e) {
    if (typeof e == "string") return pg(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? pg(e, t) : void 0;
  }
}
function pg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function oV(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function lV(e) {
  if (Array.isArray(e)) return e;
}
function yg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yg(Object(r), !0).forEach(function(n) {
      uV(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uV(e, t, r) {
  return (t = sV(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sV(e) {
  var t = cV(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function cV(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var dV = (e, t) => {
  var r = +e, n = t - r;
  return (i) => r + n * i;
}, wi = (e) => e.y + e.dy / 2, fV = (e, t, r, n, i) => {
  var a = 1 - i;
  return a ** 3 * e + 3 * a ** 2 * i * t + 3 * a * i ** 2 * r + i ** 3 * n;
}, $a = (e) => e && e.value || 0, Ql = (e, t) => t.reduce((r, n) => r + $a(e[n]), 0), vV = (e, t, r) => r.reduce((n, i) => {
  var a = t[i];
  if (a == null)
    return n;
  var o = e[a.source];
  return o == null ? n : n + wi(o) * $a(t[i]);
}, 0), hV = (e, t, r) => r.reduce((n, i) => {
  var a = t[i];
  if (a == null)
    return n;
  var o = e[a.target];
  return o == null ? n : n + wi(o) * $a(t[i]);
}, 0), pV = (e, t) => e.y - t.y, yV = (e, t) => {
  for (var r = [], n = [], i = [], a = [], o = 0, l = e.length; o < l; o++) {
    var u = e[o];
    u?.source === t && (i.push(u.target), a.push(o)), u?.target === t && (r.push(u.source), n.push(o));
  }
  return {
    sourceNodes: r,
    sourceLinks: n,
    targetLinks: a,
    targetNodes: i
  };
}, sO = (e, t) => {
  for (var r = t.targetNodes, n = 0, i = r.length; n < i; n++) {
    var a = r[n];
    if (a != null) {
      var o = e[a];
      if (o) {
        var l = t.depth + 1;
        l > o.depth && (o.depth = l, sO(e, o));
      }
    }
  }
}, mV = (e, t, r, n) => {
  for (var i, a, o = e.nodes, l = e.links, u = o.map((g, w) => {
    var x = yV(l, w);
    return tr(tr(tr({}, g), x), {}, {
      value: Math.max(Ql(l, x.sourceLinks), Ql(l, x.targetLinks)),
      depth: 0
    });
  }), s = 0, c = u.length; s < c; s++) {
    var d = u[s];
    d != null && !d.sourceNodes.length && sO(u, d);
  }
  var f = (i = (a = jA(u, (g) => g.depth)) === null || a === void 0 ? void 0 : a.depth) !== null && i !== void 0 ? i : 0;
  if (f >= 1)
    for (var v = (t - r) / f, h = 0, p = u.length; h < p; h++) {
      var m = u[h];
      m != null && (m.targetNodes.length || n === "justify" && (m.depth = f), m.x = m.depth * v, m.dx = r);
    }
  return {
    tree: u,
    maxDepth: f
  };
}, gV = (e) => {
  for (var t = [], r = 0, n = e.length; r < n; r++) {
    var i, a = e[r];
    a != null && (t[a.depth] || (t[a.depth] = []), (i = t[a.depth]) === null || i === void 0 || i.push(a));
  }
  return t;
}, bV = (e, t, r, n, i) => {
  var a = Math.min(...e.map((m) => {
    var g = eV(m, $a);
    return g === 0 ? 1 / 0 : (t - (m.length - 1) * r) / g;
  }));
  a === 1 / 0 && (a = 0);
  for (var o = 0, l = e.length; o < l; o++) {
    var u = e[o];
    if (u != null)
      if (i === "top")
        for (var s = 0, c = 0, d = u.length; c < d; c++) {
          var f = u[c];
          f != null && (f.dy = f.value * a, f.y = s, s += f.dy + r);
        }
      else
        for (var v = 0, h = u.length; v < h; v++) {
          var p = u[v];
          p != null && (p.y = v, p.dy = p.value * a);
        }
  }
  return n.map((m) => tr(tr({}, m), {}, {
    dy: $a(m) * a
  }));
}, Xs = function(t, r, n) {
  for (var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, a = 0, o = t.length; a < o; a++) {
    var l = t[a];
    if (l != null) {
      var u = l.length;
      i && l.sort(pV);
      for (var s = 0, c = 0; c < u; c++) {
        var d = l[c];
        if (d != null) {
          var f = s - d.y;
          f > 0 && (d.y += f), s = d.y + d.dy + n;
        }
      }
      s = r + n;
      for (var v = u - 1; v >= 0; v--) {
        var h = l[v];
        if (h != null) {
          var p = h.y + h.dy + n - s;
          if (p > 0)
            h.y -= p, s = h.y;
          else
            break;
        }
      }
    }
  }
}, xV = (e, t, r, n) => {
  for (var i = 0, a = t.length; i < a; i++) {
    var o = t[i];
    if (o != null)
      for (var l = 0, u = o.length; l < u; l++) {
        var s = o[l];
        if (s != null && s.sourceLinks.length) {
          var c = Ql(r, s.sourceLinks), d = vV(e, r, s.sourceLinks), f = c === 0 ? wi(s) : d / c;
          s.y += (f - wi(s)) * n;
        }
      }
  }
}, wV = (e, t, r, n) => {
  for (var i = t.length - 1; i >= 0; i--) {
    var a = t[i];
    if (a != null)
      for (var o = 0, l = a.length; o < l; o++) {
        var u = a[o];
        if (u != null && u.targetLinks.length) {
          var s = Ql(r, u.targetLinks), c = hV(e, r, u.targetLinks), d = s === 0 ? wi(u) : c / s;
          u.y += (d - wi(u)) * n;
        }
      }
  }
}, mg = (e, t) => {
  for (var r = 0, n = e.length; r < n; r++) {
    var i = e[r];
    if (i != null) {
      var a = 0, o = 0;
      i.targetLinks.sort((p, m) => {
        var g, w, x, A, P = (g = t[p]) === null || g === void 0 ? void 0 : g.target, b = (w = t[m]) === null || w === void 0 ? void 0 : w.target;
        if (P == null || b == null)
          return 0;
        var O = (x = e[P]) === null || x === void 0 ? void 0 : x.y, I = (A = e[b]) === null || A === void 0 ? void 0 : A.y;
        return O == null || I == null ? 0 : O - I;
      }), i.sourceLinks.sort((p, m) => {
        var g, w, x, A, P = (g = t[p]) === null || g === void 0 ? void 0 : g.source, b = (w = t[m]) === null || w === void 0 ? void 0 : w.source;
        if (P == null || b == null)
          return 0;
        var O = (x = e[P]) === null || x === void 0 ? void 0 : x.y, I = (A = e[b]) === null || A === void 0 ? void 0 : A.y;
        return O == null || I == null ? 0 : O - I;
      });
      for (var l = 0, u = i.targetLinks.length; l < u; l++) {
        var s = i.targetLinks[l];
        if (s != null) {
          var c = t[s];
          c && (c.sy = a, a += c.dy);
        }
      }
      for (var d = 0, f = i.sourceLinks.length; d < f; d++) {
        var v = i.sourceLinks[d];
        if (v != null) {
          var h = t[v];
          h && (h.ty = o, o += h.dy);
        }
      }
    }
  }
}, AV = (e, t, r, n) => {
  var i, a, o = e.x + e.dx, l = t.x, u = l === o ? 0 : (n - o) / (l - o), s = Math.min(Math.max(u, 0), 1), c = e.y + ((i = r.sy) !== null && i !== void 0 ? i : 0) + r.dy / 2, d = t.y + ((a = r.ty) !== null && a !== void 0 ? a : 0) + r.dy / 2;
  return fV(c, c, d, d, s);
}, PV = (e, t, r, n, i) => {
  for (var a = /* @__PURE__ */ new Map(), o = 0; o < t.length; o++) {
    var l = t[o];
    if (l != null)
      for (var u of l)
        a.set(u, o);
  }
  for (var s = function(v) {
    var h = t[v];
    if (h == null || h.length === 0)
      return 0;
    var p = h[0] == null ? void 0 : h[0].x + h[0].dx / 2;
    if (p == null)
      return 0;
    var m = r.flatMap((T) => {
      var k = e[T.source], _ = e[T.target];
      if (k == null || _ == null)
        return [];
      var $ = a.get(k), M = a.get(_);
      if ($ == null || M == null)
        return [];
      if (v <= Math.min($, M) || v >= Math.max($, M))
        return [];
      var R = AV(k, _, T, p) - T.dy / 2;
      return [{
        y: R,
        dy: T.dy,
        fixed: !0
      }];
    }), g = m.filter((T) => h.some((k) => k.y >= T.y && k.y + k.dy <= T.y + T.dy));
    if (g.length === 0)
      return 0;
    var w = (T) => T.fixed ? T.y : T.node.y, x = (T) => T.fixed ? T.dy : T.node.dy, A = [...h.map((T) => ({
      node: T,
      fixed: !1
    })), ...g].sort((T, k) => w(T) - w(k)), P = 0;
    for (var b of A) {
      if (b.fixed) {
        P = Math.max(P, b.y + b.dy + i);
        continue;
      }
      b.node.y < P && (b.node.y = P), P = b.node.y + b.node.dy + i;
    }
    A = A.sort((T, k) => w(T) - w(k));
    for (var O = n + i, I = A.length - 1; I >= 0; I--) {
      var E = A[I];
      if (E != null) {
        if (E.fixed) {
          O = Math.min(O, E.y - i);
          continue;
        }
        var j = E.node.y + x(E) + i - O;
        j > 0 && (E.node.y -= j), O = E.node.y;
      }
    }
  }, c, d = 0; d < t.length; d++)
    c = s(d);
}, OV = (e) => {
  var t = e.data, r = e.width, n = e.height, i = e.iterations, a = e.nodeWidth, o = e.nodePadding, l = e.sort, u = e.verticalAlign, s = e.align, c = t.links, d = mV(t, r, a, s), f = d.tree, v = gV(f), h = bV(v, n, o, c, u);
  if (Xs(v, n, o, l), u === "justify")
    for (var p = 1, m = 1; m <= i; m++)
      wV(f, v, h, p *= 0.99), Xs(v, n, o, l), xV(f, v, h, p), Xs(v, n, o, l);
  mg(f, h), PV(f, v, h, n, o), mg(f, h);
  var g = h;
  return {
    nodes: f,
    links: g
  };
}, SV = (e) => ({
  x: +e.x + +e.width / 2,
  y: +e.y + +e.height / 2
}), IV = (e) => "sourceX" in e ? {
  x: (e.sourceX + e.targetX) / 2,
  y: (e.sourceY + e.targetY) / 2
} : void 0, kV = (e, t, r) => {
  var n = e.payload;
  if (t === "node")
    return {
      payload: n,
      name: G(n, r, ""),
      value: G(n, "value")
    };
  if ("source" in n && n.source && n.target) {
    var i = G(n.source, r, ""), a = G(n.target, r, "");
    return {
      payload: n,
      name: "".concat(i, " - ").concat(a),
      value: G(n, "value")
    };
  }
}, jV = (e, t, r, n) => {
  if (!(t == null || typeof t != "string") && !(r == null || typeof r != "object")) {
    var i = t.split("-"), a = uO(i, 2), o = a[0], l = a[1], u = yt(r, "".concat(o, "s[").concat(l, "]"));
    if (u) {
      var s = kV(u, o, n);
      return s;
    }
  }
}, TV = {
  chartName: "Sankey",
  defaultTooltipEventType: "item",
  validateTooltipEventTypes: ["item"],
  tooltipPayloadSearcher: jV,
  eventEmitter: void 0
}, EV = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.nameKey, n = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, l = e.data, u = e.id, s = {
    dataDefinedOnItem: l,
    getPosition: mt,
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      dataKey: t,
      name: o,
      nameKey: r,
      hide: !1,
      type: void 0,
      color: a,
      unit: "",
      graphicalItemId: u
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: s
  });
});
function CV(e, t) {
  if (/* @__PURE__ */ ie(e))
    return /* @__PURE__ */ Ae(e, t);
  if (typeof e == "function")
    return e(t);
  var r = t.sourceX, n = t.sourceY, i = t.sourceControlX, a = t.targetX, o = t.targetY, l = t.targetControlX, u = t.linkWidth, s = lO(t, tV);
  return /* @__PURE__ */ y("path", xi({
    className: "recharts-sankey-link",
    d: `
          M`.concat(r, ",").concat(n, `
          C`).concat(i, ",").concat(n, " ").concat(l, ",").concat(o, " ").concat(a, ",").concat(o, `
        `),
    fill: "none",
    stroke: "#333",
    strokeWidth: u,
    strokeOpacity: "0.2"
  }, oe(s)));
}
var DV = (e) => {
  var t = e.link, r = e.nodes, n = e.left, i = e.top, a = e.i, o = e.linkContent, l = e.linkCurvature, u = t.sy, s = t.ty, c = t.dy, d = r[t.source], f = r[t.target];
  if (!(d == null || f == null)) {
    var v = d.x + d.dx + n, h = f.x + n, p = dV(v, h), m = p(l), g = p(1 - l), w = d.y + u + c / 2 + i, x = f.y + s + c / 2 + i, A = tr({
      sourceX: v,
      // @ts-expect-error the linkContent from below is contributing unknown props
      targetX: h,
      sourceY: w,
      // @ts-expect-error the linkContent from below is contributing unknown props
      targetY: x,
      sourceControlX: m,
      targetControlX: g,
      sourceRelativeY: u,
      targetRelativeY: s,
      linkWidth: c,
      index: a,
      payload: tr(tr({}, t), {}, {
        source: d,
        target: f
      })
    }, Tt(o));
    return A;
  }
};
function MV(e) {
  var t = e.graphicalItemId, r = e.props, n = e.i, i = e.linkContent, a = e.onMouseEnter, o = e.onMouseLeave, l = e.onClick, u = e.dataKey, s = IV(r), c = "link-".concat(n), d = ee(), f = {
    onMouseEnter: (v) => {
      d(zn({
        activeIndex: c,
        activeDataKey: u,
        activeCoordinate: s,
        activeGraphicalItemId: t
      })), a(r, v);
    },
    onMouseLeave: (v) => {
      d(Xu()), o(r, v);
    },
    onClick: (v) => {
      d(ao({
        activeIndex: c,
        activeDataKey: u,
        activeCoordinate: s,
        activeGraphicalItemId: t
      })), l(r, v);
    }
  };
  return /* @__PURE__ */ y(X, f, CV(i, r));
}
function $V(e) {
  var t = e.graphicalItemId, r = e.modifiedLinks, n = e.links, i = e.linkContent, a = e.onMouseEnter, o = e.onMouseLeave, l = e.onClick, u = e.dataKey;
  return /* @__PURE__ */ y(X, {
    className: "recharts-sankey-links",
    key: "recharts-sankey-links"
  }, n.map((s, c) => {
    var d = r[c];
    return d == null ? null : /* @__PURE__ */ y(MV, {
      graphicalItemId: t,
      key: "link-".concat(s.source, "-").concat(s.target, "-").concat(s.value),
      props: d,
      linkContent: i,
      i: c,
      onMouseEnter: a,
      onMouseLeave: o,
      onClick: l,
      dataKey: u
    });
  }));
}
function _V(e, t) {
  return /* @__PURE__ */ ie(e) ? /* @__PURE__ */ Ae(e, t) : typeof e == "function" ? e(t) : (
    // @ts-expect-error recharts radius is not compatible with SVG radius
    /* @__PURE__ */ y(ji, xi({
      className: "recharts-sankey-node",
      fill: "#0088fe",
      fillOpacity: "0.8"
    }, oe(t)))
  );
}
var NV = (e) => {
  var t = e.node, r = e.nodeContent, n = e.top, i = e.left, a = e.i, o = t.x, l = t.y, u = t.dx, s = t.dy, c = tr(tr({}, Tt(r)), {}, {
    x: o + i,
    y: l + n,
    width: u,
    height: s,
    index: a,
    payload: t
  });
  return c;
};
function LV(e) {
  var t = e.graphicalItemId, r = e.props, n = e.nodeContent, i = e.i, a = e.onMouseEnter, o = e.onMouseLeave, l = e.onClick, u = e.dataKey, s = ee(), c = SV(r), d = "node-".concat(i), f = {
    onMouseEnter: (v) => {
      s(zn({
        activeIndex: d,
        activeDataKey: u,
        activeCoordinate: c,
        activeGraphicalItemId: t
      })), a(r, v);
    },
    onMouseLeave: (v) => {
      s(Xu()), o(r, v);
    },
    onClick: (v) => {
      s(ao({
        activeIndex: d,
        activeDataKey: u,
        activeCoordinate: c,
        activeGraphicalItemId: t
      })), l(r, v);
    }
  };
  return /* @__PURE__ */ y(X, f, _V(n, r));
}
function RV(e) {
  var t = e.graphicalItemId, r = e.modifiedNodes, n = e.nodeContent, i = e.onMouseEnter, a = e.onMouseLeave, o = e.onClick, l = e.dataKey;
  return /* @__PURE__ */ y(X, {
    className: "recharts-sankey-nodes",
    key: "recharts-sankey-nodes"
  }, r.map((u, s) => /* @__PURE__ */ y(LV, {
    graphicalItemId: t,
    key: "node-".concat(u.index, "-").concat(u.x, "-").concat(u.y),
    props: u,
    nodeContent: n,
    i: s,
    onMouseEnter: i,
    onMouseLeave: a,
    onClick: o,
    dataKey: l
  })));
}
var BV = tr({
  accessibilityLayer: !0,
  align: "justify",
  dataKey: "value",
  iterations: 32,
  linkCurvature: 0.5,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  nameKey: "name",
  nodePadding: 10,
  nodeWidth: 10,
  sort: !0,
  verticalAlign: "justify"
}, Vi);
function zV(e) {
  e.className, e.style;
  var t = e.children, r = e.id, n = lO(e, rV), i = e.link, a = e.dataKey, o = e.node, l = e.onMouseEnter, u = e.onMouseLeave, s = e.onClick, c = e.data, d = e.iterations, f = e.nodeWidth, v = e.nodePadding, h = e.sort, p = e.linkCurvature, m = e.margin, g = e.verticalAlign, w = e.align, x = e.accessibilityLayer, A = e.title, P = e.desc, b = oe(n), O, I;
  typeof b.tabIndex == "number" ? O = b.tabIndex : O = x ? 0 : void 0, typeof b.role == "string" ? I = b.role : I = x ? "application" : void 0;
  var E = Ii(), j = ki(), T = xe(() => {
    var N, z, W, Z;
    if (!c || !E || !j || E <= 0 || j <= 0)
      return {
        nodes: [],
        links: [],
        modifiedLinks: [],
        modifiedNodes: []
      };
    var ne = E - ((N = m.left) !== null && N !== void 0 ? N : 0) - ((z = m.right) !== null && z !== void 0 ? z : 0), ce = j - ((W = m.top) !== null && W !== void 0 ? W : 0) - ((Z = m.bottom) !== null && Z !== void 0 ? Z : 0), ve = OV({
      data: c,
      width: ne,
      height: ce,
      iterations: d,
      nodeWidth: f,
      nodePadding: v,
      sort: h,
      verticalAlign: g,
      align: w
    }), Te = m.top || 0, Ke = m.left || 0, Fe = ve.links.map((B, U) => DV({
      link: B,
      nodes: ve.nodes,
      i: U,
      top: Te,
      left: Ke,
      linkContent: i,
      linkCurvature: p
    })).filter(rt), $t = ve.nodes.map((B, U) => NV({
      node: B,
      nodeContent: o,
      i: U,
      top: Te,
      left: Ke
    }));
    return {
      nodes: ve.nodes,
      links: ve.links,
      modifiedLinks: Fe,
      modifiedNodes: $t
    };
  }, [c, E, j, m, d, f, v, h, i, o, p, w, g]), k = T.links, _ = T.modifiedLinks, $ = T.modifiedNodes, M = ue((N, z, W) => {
    l && l(N, z, W);
  }, [l]), R = ue((N, z, W) => {
    u && u(N, z, W);
  }, [u]), K = ue((N, z, W) => {
    s && s(N, z, W);
  }, [s]);
  return !Pt(E) || !Pt(j) || !c || !c.links || !c.nodes ? null : /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(yW, {
    computedData: {
      links: _,
      nodes: $
    }
  }), /* @__PURE__ */ y(Pi, xi({}, b, {
    title: A,
    desc: P,
    role: I,
    tabIndex: O,
    width: E,
    height: j
  }), t, /* @__PURE__ */ y($V, {
    graphicalItemId: r,
    links: k,
    modifiedLinks: _,
    linkContent: i,
    dataKey: a,
    onMouseEnter: (N, z) => M(N, "link", z),
    onMouseLeave: (N, z) => R(N, "link", z),
    onClick: (N, z) => K(N, "link", z)
  }), /* @__PURE__ */ y(RV, {
    graphicalItemId: r,
    modifiedNodes: $,
    nodeContent: o,
    dataKey: a,
    onMouseEnter: (N, z) => M(N, "node", z),
    onMouseLeave: (N, z) => R(N, "node", z),
    onClick: (N, z) => K(N, "node", z)
  })));
}
function KV(e) {
  var t = re(e, BV), r = t.width, n = t.height, i = t.style, a = t.className, o = t.id, l = t.throttleDelay, u = t.throttledEvents, s = Ne(null), c = uO(s, 2), d = c[0], f = c[1];
  return /* @__PURE__ */ y(po, {
    preloadedState: {
      options: TV
    },
    reduxStoreName: a ?? "Sankey"
  }, /* @__PURE__ */ y(Dn, {
    width: r,
    height: n
  }), /* @__PURE__ */ y(xd, {
    margin: t.margin
  }), /* @__PURE__ */ y(yo, {
    throttleDelay: l,
    throttledEvents: u
  }), /* @__PURE__ */ y(ss, {
    className: a,
    style: i,
    width: r,
    height: n,
    responsive: !1,
    ref: (v) => {
      v && !d && f(v);
    },
    onMouseEnter: void 0,
    onMouseLeave: void 0,
    onClick: void 0,
    onMouseMove: void 0,
    onMouseDown: void 0,
    onMouseUp: void 0,
    onContextMenu: void 0,
    onDoubleClick: void 0,
    onTouchStart: void 0,
    onTouchMove: void 0,
    onTouchEnd: void 0
  }, /* @__PURE__ */ y(lo.Provider, {
    value: d
  }, /* @__PURE__ */ y(or, {
    id: o,
    type: "sankey"
  }, (v) => /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(EV, {
    dataKey: t.dataKey,
    nameKey: t.nameKey,
    stroke: t.stroke,
    strokeWidth: t.strokeWidth,
    fill: t.fill,
    name: t.name,
    data: t.data,
    id: v
  }), /* @__PURE__ */ y(zV, xi({}, t, {
    id: v
  })))))));
}
KV.displayName = "Sankey";
function gg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gg(Object(r), !0).forEach(function(n) {
      WV(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function WV(e, t, r) {
  return (t = FV(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FV(e) {
  var t = UV(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function UV(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var XV = ["axis"], HV = bg(bg({}, cs), {}, {
  layout: "centric",
  startAngle: 90,
  endAngle: -270
}), YV = /* @__PURE__ */ Pe((e, t) => {
  var r = re(e, HV);
  return /* @__PURE__ */ y(vv, {
    chartName: "RadarChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: XV,
    tooltipPayloadSearcher: Fr,
    categoricalChartProps: r,
    ref: t
  });
}), VV = ["item"], GV = /* @__PURE__ */ Pe((e, t) => /* @__PURE__ */ y(Gi, {
  chartName: "ScatterChart",
  defaultTooltipEventType: "item",
  validateTooltipEventTypes: VV,
  tooltipPayloadSearcher: Fr,
  categoricalChartProps: e,
  ref: t
})), qV = ["axis"], ZV = /* @__PURE__ */ Pe((e, t) => /* @__PURE__ */ y(Gi, {
  chartName: "AreaChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: qV,
  tooltipPayloadSearcher: Fr,
  categoricalChartProps: e,
  ref: t
}));
function xg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function wg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xg(Object(r), !0).forEach(function(n) {
      JV(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function JV(e, t, r) {
  return (t = QV(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QV(e) {
  var t = eG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function eG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var tG = ["axis", "item"], rG = wg(wg({}, cs), {}, {
  layout: "radial",
  startAngle: 0,
  endAngle: 360
}), nG = /* @__PURE__ */ Pe((e, t) => {
  var r = re(e, rG);
  return /* @__PURE__ */ y(vv, {
    chartName: "RadialBarChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: tG,
    tooltipPayloadSearcher: Fr,
    categoricalChartProps: r,
    ref: t
  });
}), iG = ["axis"], aG = /* @__PURE__ */ Pe((e, t) => /* @__PURE__ */ y(Gi, {
  chartName: "ComposedChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: iG,
  tooltipPayloadSearcher: Fr,
  categoricalChartProps: e,
  ref: t
}));
function oG(e, t) {
  return cG(e) || sG(e, t) || uG(e, t) || lG();
}
function lG() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function uG(e, t) {
  if (e) {
    if (typeof e == "string") return Ag(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ag(e, t) : void 0;
  }
}
function Ag(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function sG(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function cG(e) {
  if (Array.isArray(e)) return e;
}
function eu() {
  return eu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, eu.apply(null, arguments);
}
function Pg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pg(Object(r), !0).forEach(function(n) {
      dG(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function dG(e, t, r) {
  return (t = fG(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fG(e) {
  var t = vG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hG = {
  fontWeight: "bold",
  paintOrder: "stroke fill",
  fontSize: ".75rem",
  stroke: "#FFF",
  fill: "black",
  pointerEvents: "none"
};
function cO(e) {
  if (!e.children || e.children.length === 0) return 1;
  var t = e.children.map((r) => cO(r));
  return 1 + Math.max(...t);
}
var pG = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.nameKey, n = e.data, i = e.stroke, a = e.fill, o = e.positions, l = e.id, u = {
    dataDefinedOnItem: n.children,
    getPosition: (s) => o.get(s),
    // Sunburst does not support many of the properties as other charts do so there's plenty of defaults here
    settings: {
      stroke: i,
      strokeWidth: void 0,
      fill: a,
      nameKey: r,
      dataKey: t,
      // if there is a nameKey use it, otherwise make the name of the tooltip the dataKey itself
      name: r ? void 0 : t,
      hide: !1,
      type: void 0,
      color: a,
      unit: "",
      graphicalItemId: l
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: u
  });
}), yG = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, mG = (e, t) => {
  if (t != null)
    return yt(e, t);
}, gG = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "".concat(r, "children[").concat(t, "]");
}, bG = {
  options: {
    validateTooltipEventTypes: ["item"],
    defaultTooltipEventType: "item",
    chartName: "Sunburst",
    tooltipPayloadSearcher: mG,
    eventEmitter: void 0
  }
}, xG = Hc({
  padding: 2,
  dataKey: "value",
  nameKey: "name",
  ringPadding: 2,
  innerRadius: 50,
  fill: "#333",
  stroke: "#FFF",
  textOptions: hG,
  startAngle: 0,
  endAngle: 360,
  responsive: !1
}, Vi), wG = (e) => {
  var t = e.className, r = e.data, n = e.children, i = e.padding, a = e.dataKey, o = e.nameKey, l = e.ringPadding, u = e.innerRadius, s = e.fill, c = e.stroke, d = e.textOptions, f = e.outerRadius, v = e.cx, h = e.cy, p = e.startAngle, m = e.endAngle, g = e.onClick, w = e.onMouseEnter, x = e.onMouseLeave, A = e.id, P = ee(), b = Ii(), O = ki();
  if (b == null || O == null)
    return null;
  var I = f ?? Math.min(b, O) / 2, E = v ?? b / 2, j = h ?? O / 2, T = Ud([0, r[a]], [0, m]), k = cO(r), _ = (I - u) / k, $ = [], M = /* @__PURE__ */ new Map([]);
  function R(Z, ne) {
    w && w(Z, ne), P(zn({
      activeIndex: Z.tooltipIndex,
      activeDataKey: a,
      activeCoordinate: M.get(Z.name),
      activeGraphicalItemId: A
    }));
  }
  function K(Z, ne) {
    x && x(Z, ne), P(Xu());
  }
  function N(Z) {
    g && g(Z), P(ao({
      activeIndex: Z.tooltipIndex,
      activeDataKey: a,
      activeCoordinate: M.get(Z.name),
      activeGraphicalItemId: A
    }));
  }
  function z(Z, ne) {
    var ce = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, ve = ne.radius, Te = ne.innerR, Ke = ne.initialAngle, Fe = ne.childColor, $t = ne.nestedActiveTooltipIndex, B = Ke;
    Z && Z.forEach((U, q) => {
      var D, Be, ge = ce === 1 ? "[".concat(q, "]") : gG(q, $t), Y = Hc(Hc({}, U), {}, {
        tooltipIndex: ge
      }), Qe = T(U[a]), It = B, qi = (D = (Be = U?.fill) !== null && Be !== void 0 ? Be : Fe) !== null && D !== void 0 ? D : s, pv = pe(0, 0, Te + ve / 2, -(It + Qe - Qe / 2)), hO = pv.x, pO = pv.y;
      B += Qe, $.push(/* @__PURE__ */ y("g", {
        key: "sunburst-sector-".concat(U.name, "-").concat(q)
      }, /* @__PURE__ */ y(Iu, {
        onClick: () => N(Y),
        onMouseEnter: (ds) => R(Y, ds),
        onMouseLeave: (ds) => K(Y, ds),
        fill: qi,
        stroke: c,
        strokeWidth: i,
        startAngle: It,
        endAngle: It + Qe,
        innerRadius: Te,
        outerRadius: Te + ve,
        cx: E,
        cy: j
      }), /* @__PURE__ */ y(Lr, eu({}, d, {
        alignmentBaseline: "middle",
        textAnchor: "middle",
        x: hO + E,
        y: j - pO
      }), U[a])));
      var yv = pe(E, j, Te + ve / 2, It), yO = yv.x, mO = yv.y;
      return M.set(U.name, {
        x: yO,
        y: mO
      }), z(U.children, {
        radius: ve,
        innerR: Te + ve + l,
        initialAngle: It,
        childColor: qi,
        nestedActiveTooltipIndex: ge
      }, ce + 1);
    });
  }
  z(r.children, {
    radius: _,
    innerR: u,
    initialAngle: p
  });
  var W = J("recharts-sunburst", t);
  return /* @__PURE__ */ y(Pi, {
    width: b,
    height: O
  }, /* @__PURE__ */ y(X, {
    className: W
  }, $), /* @__PURE__ */ y(pG, {
    dataKey: a,
    nameKey: o,
    data: r,
    stroke: c,
    fill: s,
    positions: M,
    id: A
  }), n);
}, H6 = (e) => {
  var t = re(e, xG), r = t.className, n = t.width, i = t.height, a = t.responsive, o = t.style, l = t.id, u = t.throttleDelay, s = t.throttledEvents, c = Ne(null), d = oG(c, 2), f = d[0], v = d[1];
  return /* @__PURE__ */ y(po, {
    preloadedState: bG,
    reduxStoreName: r ?? "SunburstChart"
  }, /* @__PURE__ */ y(Dn, {
    width: n,
    height: i
  }), /* @__PURE__ */ y(xd, {
    margin: yG
  }), /* @__PURE__ */ y(yo, {
    throttleDelay: u,
    throttledEvents: s
  }), /* @__PURE__ */ y(lo.Provider, {
    value: f
  }, /* @__PURE__ */ y(ss, {
    className: r,
    width: n,
    height: i,
    responsive: a,
    style: o,
    ref: (h) => {
      f == null && h != null && v(h);
    },
    onMouseEnter: void 0,
    onMouseLeave: void 0,
    onClick: void 0,
    onMouseMove: void 0,
    onMouseDown: void 0,
    onMouseUp: void 0,
    onContextMenu: void 0,
    onDoubleClick: void 0,
    onTouchStart: void 0,
    onTouchMove: void 0,
    onTouchEnd: void 0
  }, /* @__PURE__ */ y(or, {
    id: l,
    type: "sunburst"
  }, (h) => /* @__PURE__ */ y(wG, eu({}, t, {
    id: h
  }))))));
}, Og, Sg, Ig, kg, jg;
function Tg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Eg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tg(Object(r), !0).forEach(function(n) {
      AG(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function AG(e, t, r) {
  return (t = PG(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function PG(e) {
  var t = OG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function OG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function tu() {
  return tu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tu.apply(null, arguments);
}
function SG(e, t) {
  return TG(e) || jG(e, t) || kG(e, t) || IG();
}
function IG() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kG(e, t) {
  if (e) {
    if (typeof e == "string") return Cg(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Cg(e, t) : void 0;
  }
}
function Cg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function jG(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function TG(e) {
  if (Array.isArray(e)) return e;
}
function la(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Dg = (e, t, r, n, i) => {
  var a = r - n, o;
  return o = Le(Og || (Og = la(["M ", ",", ""])), e, t), o += Le(Sg || (Sg = la(["L ", ",", ""])), e + r, t), o += Le(Ig || (Ig = la(["L ", ",", ""])), e + r - a / 2, t + i), o += Le(kg || (kg = la(["L ", ",", ""])), e + r - a / 2 - n, t + i), o += Le(jg || (jg = la(["L ", ",", " Z"])), e, t), o;
}, EG = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, CG = (e) => {
  var t = re(e, EG), r = t.x, n = t.y, i = t.upperWidth, a = t.lowerWidth, o = t.height, l = t.className, u = t.animationEasing, s = t.animationDuration, c = t.animationBegin, d = t.isUpdateAnimationActive, f = H(null), v = Ne(-1), h = SG(v, 2), p = h[0], m = h[1], g = H(i), w = H(a), x = H(o), A = H(r), P = H(n), b = Pd(e, "trapezoid-");
  if (ae(() => {
    if (f.current && f.current.getTotalLength)
      try {
        var R = f.current.getTotalLength();
        R && m(R);
      } catch {
      }
  }, []), r !== +r || n !== +n || i !== +i || a !== +a || o !== +o || i === 0 && a === 0 || o === 0)
    return null;
  var O = J("recharts-trapezoid", l);
  if (!d)
    return /* @__PURE__ */ y("g", null, /* @__PURE__ */ y("path", tu({}, $e(t), {
      className: O,
      d: Dg(r, n, i, a, o)
    })));
  var I = g.current, E = w.current, j = x.current, T = A.current, k = P.current, _ = "0px ".concat(p === -1 ? 1 : p, "px"), $ = "".concat(p, "px ").concat(p, "px"), M = Od(["strokeDasharray"], s, typeof u == "string" ? u : "ease");
  return /* @__PURE__ */ y(Ad, {
    animationId: b,
    key: b,
    canBegin: p > 0,
    duration: s,
    easing: u,
    isActive: d,
    begin: c
  }, (R) => {
    var K = V(I, i, R), N = V(E, a, R), z = V(j, o, R), W = V(T, r, R), Z = V(k, n, R);
    f.current && (g.current = K, w.current = N, x.current = z, A.current = W, P.current = Z);
    var ne = R > 0 ? {
      transition: M,
      strokeDasharray: $
    } : {
      strokeDasharray: _
    };
    return /* @__PURE__ */ y("path", tu({}, $e(t), {
      className: O,
      d: Dg(W, Z, K, N, z),
      ref: f,
      style: Eg(Eg({}, ne), t.style)
    }));
  });
}, DG = ["option"];
function MG(e, t) {
  if (e == null) return {};
  var r, n, i = $G(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function $G(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var dO = CG;
function _G(e) {
  var t = e.option, r = MG(e, DG);
  return /* @__PURE__ */ y(Jr, {
    option: t,
    DefaultShape: dO,
    shapeProps: r
  });
}
function Mg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ua(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mg(Object(r), !0).forEach(function(n) {
      NG(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function NG(e, t, r) {
  return (t = LG(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function LG(e) {
  var t = RG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function RG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var BG = (e, t) => t, zG = S([He, BG, zr], (e, t, r) => {
  var n = t.data, i = t.dataKey, a = t.nameKey, o = t.tooltipType, l = t.lastShapeType, u = t.reversed, s = t.customWidth, c = t.cells, d = t.presentationProps, f = t.id, v = r.chartData, h;
  if (n != null && n.length > 0 ? h = n : v != null && v.length > 0 && (h = v), h && h.length)
    h = h.map((p, m) => ua(ua(ua({
      payload: p
    }, d), p), c && c[m] && c[m].props));
  else if (c && c.length)
    h = c.map((p) => ua(ua({}, d), p.props));
  else
    return [];
  return u6({
    dataKey: i,
    nameKey: a,
    displayedData: h,
    tooltipType: o,
    lastShapeType: l,
    reversed: u,
    offset: e,
    customWidth: s,
    graphicalItemId: f
  });
}), KG = ["onMouseEnter", "onClick", "onMouseLeave", "shape", "activeShape"], WG = ["id"], FG = ["stroke", "fill", "legendType", "hide", "isAnimationActive", "animationBegin", "animationDuration", "animationEasing", "nameKey", "lastShapeType", "id"], UG = ["id"];
function $g(e, t) {
  return VG(e) || YG(e, t) || HG(e, t) || XG();
}
function XG() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function HG(e, t) {
  if (e) {
    if (typeof e == "string") return _g(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _g(e, t) : void 0;
  }
}
function _g(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function YG(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(u = (n = a.call(r)).done) && (l.push(n.value), l.length !== t); u = !0) ;
    } catch (c) {
      s = !0, i = c;
    } finally {
      try {
        if (!u && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function VG(e) {
  if (Array.isArray(e)) return e;
}
function _a() {
  return _a = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, _a.apply(null, arguments);
}
function ru(e, t) {
  if (e == null) return {};
  var r, n, i = GG(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function GG(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Ng(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function st(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ng(Object(r), !0).forEach(function(n) {
      qG(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ng(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qG(e, t, r) {
  return (t = ZG(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ZG(e) {
  var t = JG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var QG = /* @__PURE__ */ De((e) => {
  var t = e.dataKey, r = e.nameKey, n = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, l = e.hide, u = e.tooltipType, s = e.formatter, c = e.data, d = e.trapezoids, f = e.id, v = {
    dataDefinedOnItem: c,
    getPosition: (h) => {
      var p;
      return (p = d[Number(h)]) === null || p === void 0 ? void 0 : p.tooltipPosition;
    },
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      dataKey: t,
      name: o,
      nameKey: r,
      hide: l,
      type: u,
      color: a,
      unit: "",
      // Funnel does not have unit, why?
      formatter: s,
      graphicalItemId: f
    }
  };
  return /* @__PURE__ */ y(ar, {
    tooltipEntrySettings: v
  });
});
function e6(e) {
  var t = e.showLabels, r = e.trapezoids, n = e.children, i = xe(() => {
    if (t)
      return r?.map((a) => {
        var o = a.labelViewBox;
        return st(st({}, o), {}, {
          value: a.name,
          payload: a.payload,
          parentViewBox: a.parentViewBox,
          viewBox: o,
          fill: a.fill
        });
      });
  }, [t, r]);
  return /* @__PURE__ */ y(zi, {
    value: i
  }, n);
}
function t6(e) {
  var t = e.trapezoids, r = e.allOtherFunnelProps, n = e.animationElapsedTime, i = e.isAnimating, a = e.isEntrance, o = C((m) => Hu(m, "item", m.tooltip.settings.trigger, void 0)), l = r.onMouseEnter, u = r.onClick, s = r.onMouseLeave, c = r.shape, d = r.activeShape, f = ru(r, KG), v = Wi(l, r.dataKey, r.id), h = Fi(s), p = Ui(u, r.dataKey, r.id);
  return /* @__PURE__ */ y(le, null, t.map((m, g) => {
    var w = !!d && o === String(g), x = w ? d : c, A = st(st({}, m), {}, {
      option: x,
      isActive: w,
      stroke: m.stroke,
      animationElapsedTime: n,
      isAnimating: i,
      isEntrance: a
    });
    A.id;
    var P = ru(A, WG);
    return /* @__PURE__ */ y(X, _a({
      key: "trapezoid-".concat(m?.x, "-").concat(m?.y, "-").concat(m?.name, "-").concat(m?.value),
      className: "recharts-funnel-trapezoid"
    }, ir(f, m, g), {
      onMouseEnter: v(m, g),
      onMouseLeave: h(m, g),
      onClick: p(m, g)
    }), /* @__PURE__ */ y(_G, P));
  }));
}
var r6 = (e, t) => e == null ? [] : t === 1 ? e.flatMap((r) => r.status === "removed" ? [] : [r.next]) : e.flatMap((r) => {
  if (r.status === "removed") return [];
  if (r.status === "matched")
    return [st(st({}, r.next), {}, {
      x: V(r.prev.x, r.next.x, t),
      y: V(r.prev.y, r.next.y, t),
      upperWidth: V(r.prev.upperWidth, r.next.upperWidth, t),
      lowerWidth: V(r.prev.lowerWidth, r.next.lowerWidth, t),
      height: V(r.prev.height, r.next.height, t)
    })];
  var n = r.next;
  return [st(st({}, n), {}, {
    x: V(n.x + n.upperWidth / 2, n.x, t),
    y: V(n.y + n.height / 2, n.y, t),
    upperWidth: V(0, n.upperWidth, t),
    lowerWidth: V(0, n.lowerWidth, t),
    height: V(0, n.height, t)
  })];
});
function n6(e) {
  var t = e.previousTrapezoidsRef, r = e.props, n = r.trapezoids, i = r.isAnimationActive, a = r.animationBegin, o = r.animationDuration, l = r.animationEasing, u = r.animationInterpolateFn, s = Ua(), c = an(r.onAnimationStart, r.onAnimationEnd), d = c.isAnimating, f = c.handleAnimationStart, v = c.handleAnimationEnd;
  return s == null ? null : /* @__PURE__ */ y(e6, {
    showLabels: !d,
    trapezoids: n
  }, /* @__PURE__ */ y(on, {
    animationInput: n,
    animationIdPrefix: "recharts-funnel-",
    items: n,
    previousItemsRef: t,
    isAnimationActive: i,
    animationBegin: a,
    animationDuration: o,
    animationEasing: l,
    onAnimationStart: f,
    onAnimationEnd: v,
    animationInterpolateFn: u,
    animationMatchBy: r.animationMatchBy,
    layout: s
  }, (h, p, m) => /* @__PURE__ */ y(X, null, /* @__PURE__ */ y(t6, {
    trapezoids: h,
    allOtherFunnelProps: r,
    animationElapsedTime: p,
    isAnimating: d || p < 1,
    isEntrance: m
  }))), /* @__PURE__ */ y(rn, {
    label: r.label
  }), r.children);
}
function i6(e) {
  var t = H(void 0);
  return /* @__PURE__ */ y(n6, {
    props: e,
    previousTrapezoidsRef: t
  });
}
var a6 = (e, t) => {
  var r = t.width, n = t.height, i = t.left, a = t.top, o = lt(e, r, r);
  return {
    realWidth: o,
    realHeight: n,
    offsetX: i,
    offsetY: a
  };
}, o6 = {
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: r6,
  animationMatchBy: Xi,
  fill: "#808080",
  hide: !1,
  isAnimationActive: "auto",
  lastShapeType: "triangle",
  legendType: "rect",
  nameKey: "name",
  reversed: !1,
  shape: dO,
  stroke: "#fff"
};
function l6(e) {
  var t = fo(), r = e.stroke, n = e.fill, i = e.legendType, a = e.hide, o = e.isAnimationActive, l = e.animationBegin, u = e.animationDuration, s = e.animationEasing, c = e.nameKey, d = e.lastShapeType, f = e.id, v = ru(e, FG), h = oe(e), p = Ki(e.children, Wn), m = xe(() => ({
    dataKey: e.dataKey,
    nameKey: c,
    data: e.data,
    tooltipType: e.tooltipType,
    lastShapeType: d,
    reversed: e.reversed,
    customWidth: e.width,
    cells: p,
    presentationProps: h,
    id: f
  }), [e.dataKey, c, e.data, e.tooltipType, d, e.reversed, e.width, p, h, f]), g = C((P) => zG(P, m));
  if (a || !g || !g.length || !t)
    return null;
  var w = t.height, x = t.width, A = J("recharts-trapezoids", e.className);
  return /* @__PURE__ */ y(le, null, /* @__PURE__ */ y(QG, {
    dataKey: e.dataKey,
    nameKey: e.nameKey,
    stroke: e.stroke,
    strokeWidth: e.strokeWidth,
    fill: e.fill,
    name: e.name,
    hide: e.hide,
    tooltipType: e.tooltipType,
    formatter: e.formatter,
    data: e.data,
    trapezoids: g,
    id: f
  }), /* @__PURE__ */ y(X, {
    className: A
  }, /* @__PURE__ */ y(i6, _a({}, v, {
    id: f,
    stroke: r,
    fill: n,
    nameKey: c,
    lastShapeType: d,
    animationBegin: l,
    animationDuration: u,
    animationEasing: s,
    isAnimationActive: o,
    hide: a,
    legendType: i,
    height: w,
    width: x,
    trapezoids: g
  }))));
}
function u6(e) {
  var t = e.dataKey, r = e.nameKey, n = e.displayedData, i = e.tooltipType, a = e.lastShapeType, o = e.reversed, l = e.offset, u = e.customWidth, s = e.graphicalItemId, c = a6(u, l), d = c.realHeight, f = c.realWidth, v = c.offsetX, h = c.offsetY, p = n.map((P) => {
    var b = G(P, t, 0);
    return typeof b == "number" ? b : 0;
  }), m = Math.max.apply(null, p), g = n.length, w = d / g, x = {
    x: l.left,
    y: l.top,
    width: l.width,
    height: l.height
  }, A = n.map((P, b) => {
    var O = G(P, t, 0), I = String(G(P, r, b)), E = O, j;
    if (b !== g - 1) {
      var T = G(n[b + 1], t, 0);
      if (typeof T == "number")
        j = T;
      else if (Array.isArray(T)) {
        var k = $g(T, 2), _ = k[0], $ = k[1];
        typeof _ == "number" && (E = _), typeof $ == "number" && (j = $);
      }
    } else if (O instanceof Array && O.length === 2) {
      var M = $g(O, 2), R = M[0], K = M[1];
      typeof R == "number" && (E = R), typeof K == "number" && (j = K);
    } else a === "rectangle" ? j = E : j = 0;
    var N = m === 0 ? v : (m - E) * f / (2 * m) + v, z = w * b + h, W = m === 0 ? 0 : E / m * f, Z = m === 0 ? 0 : j / m * f, ne = [{
      name: I,
      value: E,
      payload: P,
      dataKey: t,
      type: i,
      graphicalItemId: s
    }], ce = {
      x: N + W / 2,
      y: z + w / 2
    }, ve = {
      x: N,
      y: z,
      upperWidth: W,
      lowerWidth: Z,
      width: Math.max(W, Z),
      height: w
    };
    return st(st(st({}, ve), {}, {
      name: I,
      val: E,
      tooltipPayload: ne,
      tooltipPosition: ce
    }, P != null && typeof P == "object" ? nO(P, ["width"]) : {}), {}, {
      payload: P,
      parentViewBox: x,
      labelViewBox: ve
    });
  });
  return o && (A = A.map((P, b) => {
    var O = {
      x: P.x - (P.lowerWidth - P.upperWidth) / 2,
      y: P.y - b * w + (g - 1 - b) * w,
      upperWidth: P.lowerWidth,
      lowerWidth: P.upperWidth,
      width: Math.max(P.lowerWidth, P.upperWidth),
      height: w
    };
    return st(st(st({}, P), O), {}, {
      tooltipPosition: st(st({}, P.tooltipPosition), {}, {
        y: P.y - b * w + (g - 1 - b) * w + w / 2
      }),
      labelViewBox: O
    });
  })), A;
}
function s6(e) {
  var t = re(e, o6), r = t.id, n = ru(t, UG);
  return /* @__PURE__ */ y(or, {
    id: r,
    type: "funnel"
  }, (i) => /* @__PURE__ */ y(l6, _a({}, n, {
    id: i
  })));
}
var c6 = s6;
c6.displayName = "Funnel";
var d6 = ["item"], f6 = /* @__PURE__ */ Pe((e, t) => /* @__PURE__ */ y(Gi, {
  chartName: "FunnelChart",
  defaultTooltipEventType: "item",
  validateTooltipEventTypes: d6,
  tooltipPayloadSearcher: Fr,
  categoricalChartProps: e,
  ref: t
}));
function Lg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lg(Object(r), !0).forEach(function(n) {
      v6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function v6(e, t, r) {
  return (t = h6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function h6(e) {
  var t = p6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function p6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Gr() {
  return Gr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gr.apply(null, arguments);
}
var fO = (e) => ({
  AreaChart: (t) => /* @__PURE__ */ y(ZV, Gr({}, t, {
    layout: e
  })),
  BarChart: (t) => /* @__PURE__ */ y(ZY, Gr({}, t, {
    layout: e
  })),
  LineChart: (t) => /* @__PURE__ */ y(GY, Gr({}, t, {
    layout: e
  })),
  ComposedChart: (t) => /* @__PURE__ */ y(aG, Gr({}, t, {
    layout: e
  })),
  ScatterChart: (t) => /* @__PURE__ */ y(GV, Gr({}, t, {
    layout: e
  }))
});
function Y6() {
  return function(t) {
    return nu(nu({}, fO("horizontal")), t);
  };
}
function V6() {
  return function(t) {
    return nu(nu({}, fO("vertical")), {}, {
      FunnelChart: (r) => /* @__PURE__ */ y(f6, Gr({}, r, {
        layout: "vertical"
      }))
    }, t);
  };
}
function Na() {
  return Na = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Na.apply(null, arguments);
}
function Rg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rg(Object(r), !0).forEach(function(n) {
      y6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function y6(e, t, r) {
  return (t = m6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function m6(e) {
  var t = g6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function g6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function G6() {
  return function(t) {
    return vO({
      RadarChart: (r) => /* @__PURE__ */ y(YV, Na({}, r, {
        layout: "centric"
      }))
    }, t);
  };
}
function q6() {
  return function(t) {
    return vO({
      RadialBarChart: (r) => /* @__PURE__ */ y(nG, Na({}, r, {
        layout: "radial"
      })),
      PieChart: (r) => /* @__PURE__ */ y(f5, Na({}, r, {
        layout: "radial"
      }))
    }, t);
  };
}
var Z6 = {
  grid: {
    stroke: "#3f3f46",
    fill: "none"
  }
}, J6 = {
  grid: {
    stroke: "#d6d3d1",
    fill: "none"
  }
};
export {
  S6 as AnimationControllerProvider,
  l3 as Area,
  ZV as AreaChart,
  zX as AreaRevealShape,
  mH as Bar,
  ZY as BarChart,
  U6 as BarStack,
  LW as Brush,
  iE as CSSTransitionAnimation,
  rv as CartesianAxis,
  DU as CartesianGrid,
  Wn as Cell,
  aG as ComposedChart,
  UT as Cross,
  xn as Curve,
  fR as Customized,
  lI as DefaultLegendContent,
  sT as DefaultTooltipContent,
  fe as DefaultZIndexes,
  Zu as Dot,
  G8 as ErrorBar,
  c6 as Funnel,
  f6 as FunnelChart,
  Mn as Global,
  nE as JavascriptAnimation,
  Yr as Label,
  Wo as LabelList,
  X as Layer,
  Jj as Legend,
  kX as Line,
  GY as LineChart,
  KU as LineDrawShape,
  ZB as Pie,
  f5 as PieChart,
  T2 as PolarAngleAxis,
  WR as PolarGrid,
  f2 as PolarRadiusAxis,
  Nf as Polygon,
  dK as Radar,
  YV as RadarChart,
  cW as RadialBar,
  nG as RadialBarChart,
  F6 as RechartsThemeProvider,
  ji as Rectangle,
  EF as ReferenceArea,
  wF as ReferenceDot,
  fF as ReferenceLine,
  O6 as ResponsiveContainer,
  KV as Sankey,
  JH as Scatter,
  GV as ScatterChart,
  Iu as Sector,
  H6 as SunburstChart,
  Pi as Surface,
  su as Symbols,
  Lr as Text,
  I6 as Tooltip,
  CG as Trapezoid,
  X6 as Treemap,
  v8 as XAxis,
  S8 as YAxis,
  j8 as ZAxis,
  we as ZIndexLayer,
  G6 as createCentricChart,
  Y6 as createHorizontalChart,
  q6 as createRadialChart,
  V6 as createVerticalChart,
  Z6 as darkTheme,
  up as getNiceTickValues,
  fv as getRelativeCoordinate,
  V as interpolate,
  hU as legacyTheme,
  J6 as lightTheme,
  Xi as matchAppend,
  k6 as matchByDataKey,
  co as matchByIndex,
  W6 as useActiveTooltipCoordinate,
  Tz as useActiveTooltipDataPoints,
  L6 as useActiveTooltipLabel,
  Ua as useCartesianChartLayout,
  N6 as useCartesianScale,
  ki as useChartHeight,
  Rr as useChartLayout,
  Ii as useChartWidth,
  K6 as useIsTooltipActive,
  nj as useMargin,
  R6 as useOffset,
  fo as usePlotArea,
  Xa as usePolarChartLayout,
  B6 as useXAxisDomain,
  T6 as useXAxisInverseDataSnapScale,
  j6 as useXAxisInverseScale,
  E6 as useXAxisInverseTickSnapScale,
  kz as useXAxisScale,
  $6 as useXAxisTicks,
  z6 as useYAxisDomain,
  D6 as useYAxisInverseDataSnapScale,
  C6 as useYAxisInverseScale,
  M6 as useYAxisInverseTickSnapScale,
  jz as useYAxisScale,
  _6 as useYAxisTicks
};
