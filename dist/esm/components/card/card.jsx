var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from "react";
import { CardTheme } from "./card-theme";
import { NdCode, NdTranslatedText } from "nodoku-core";
import { mergeTheme } from "nodoku-core";
import { NodokuComponents } from "nodoku-components";
var HighlightedCode = NodokuComponents.HighlightedCode;
var ListComp = NodokuComponents.ListComp;
export function CardImpl(props) {
    return __awaiter(this, void 0, void 0, function () {
        var componentIndex, content, theme, themes, lng, i18nextProvider, defaultThemeName, effectiveTheme, block, _a, url, alt, t, style, absZero;
        var _this = this;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        return __generator(this, function (_x) {
            switch (_x.label) {
                case 0:
                    componentIndex = props.componentIndex, content = props.content, theme = props.theme, themes = props.themes, lng = props.lng, i18nextProvider = props.i18nextProvider, defaultThemeName = props.defaultThemeName;
                    effectiveTheme = mergeTheme(theme, CardTheme.defaultTheme);
                    if (themes.length > 0) {
                        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme);
                    }
                    block = content[0];
                    _a = block.images[0], url = _a.url, alt = _a.alt;
                    return [4 /*yield*/, i18nextProvider(lng)];
                case 1:
                    t = (_x.sent()).t;
                    style = block.bgImage ? {
                        backgroundImage: "url(".concat(t(block.bgImage.url.key, (_c = (_b = block.bgImage) === null || _b === void 0 ? void 0 : _b.url) === null || _c === void 0 ? void 0 : _c.ns), ")")
                    } : {};
                    absZero = "absolute top-0 left-0 right-0 bottom-0";
                    return [4 /*yield*/, Promise.all(block.paragraphs.map(function (p, ip) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (p instanceof NdTranslatedText) {
                                            return [2 /*return*/, (<p key={ip} className={"".concat((_a = effectiveTheme.paragraphStyle) === null || _a === void 0 ? void 0 : _a.base, " ").concat((_b = effectiveTheme.paragraphStyle) === null || _b === void 0 ? void 0 : _b.decoration)}>
                                {p && t(p.key, p.ns)}
                            </p>)];
                                        }
                                        if (!(p instanceof NdCode)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, HighlightedCode({ code: p, theme: effectiveTheme.codeHighlightTheme, defaultThemeName: defaultThemeName })];
                                    case 1: return [2 /*return*/, _c.sent()];
                                    case 2: return [4 /*yield*/, ListComp({ list: p, lng: lng, i18nextProvider: i18nextProvider, listTheme: effectiveTheme.listTheme })
                                        // return await <ListComp list={p as NdList} lng={lng} i18nextProvider={i18nextProvider} />
                                    ];
                                    case 3: return [2 /*return*/, _c.sent()
                                        // return await <ListComp list={p as NdList} lng={lng} i18nextProvider={i18nextProvider} />
                                    ];
                                }
                            });
                        }); }))];
                case 2: return [2 /*return*/, (<div className={"relative ".concat((_d = effectiveTheme.containerStyle) === null || _d === void 0 ? void 0 : _d.base, " ").concat((_e = effectiveTheme.containerStyle) === null || _e === void 0 ? void 0 : _e.decoration)}>
            <div className={"".concat(absZero, " ").concat((_f = effectiveTheme.bgImageStyle) === null || _f === void 0 ? void 0 : _f.base, " ").concat((_g = effectiveTheme.bgImageStyle) === null || _g === void 0 ? void 0 : _g.decoration)} style={style}></div>
            <div className={"".concat(absZero, " ").concat((_h = effectiveTheme.bgColorStyle) === null || _h === void 0 ? void 0 : _h.base, " ").concat((_j = effectiveTheme.bgColorStyle) === null || _j === void 0 ? void 0 : _j.decoration)}></div>

            {url &&
                            <a href="#">
                    <img className={"".concat((_k = effectiveTheme.imageStyle) === null || _k === void 0 ? void 0 : _k.base, " ").concat((_l = effectiveTheme.imageStyle) === null || _l === void 0 ? void 0 : _l.decoration)} src={t(url.key, url.ns)} alt={alt && t(alt.key, alt.ns)}/>
                </a>}
            <div className={"".concat((_m = effectiveTheme.innerContainerStyle) === null || _m === void 0 ? void 0 : _m.base, " ").concat((_o = effectiveTheme.innerContainerStyle) === null || _o === void 0 ? void 0 : _o.decoration)}>
                {block.title &&
                            <a href="#">
                        <h5 className={"".concat((_p = effectiveTheme.titleStyle) === null || _p === void 0 ? void 0 : _p.base, " ").concat((_q = effectiveTheme.titleStyle) === null || _q === void 0 ? void 0 : _q.decoration)}>
                            {block.title && t(block.title.key, block.title.ns)}
                        </h5>
                    </a>}
                {block.subTitle &&
                            <h6 className={"".concat((_r = effectiveTheme.subTitleStyle) === null || _r === void 0 ? void 0 : _r.base, " ").concat((_s = effectiveTheme.subTitleStyle) === null || _s === void 0 ? void 0 : _s.decoration)}>
                        {block.subTitle && t(block.subTitle.key, block.subTitle.ns)}
                    </h6>}

                {_x.sent()}
            </div>

            {block.footer &&
                            <div className={"".concat((_t = effectiveTheme.footerContainerStyle) === null || _t === void 0 ? void 0 : _t.base, " ").concat((_u = effectiveTheme.footerContainerStyle) === null || _u === void 0 ? void 0 : _u.decoration)}>

                    <a href="#" className={"".concat((_v = effectiveTheme.footerButtonStyle) === null || _v === void 0 ? void 0 : _v.base, " ").concat((_w = effectiveTheme.footerButtonStyle) === null || _w === void 0 ? void 0 : _w.decoration)}>
                        {t(block.footer.key, block.footer.ns)}
                        <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>}

        </div>)];
            }
        });
    });
}
