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
import { JumbotronTheme } from "./jumbotron-theme";
import { NdCode, NdTranslatedText } from "nodoku-core";
import { mergeTheme } from "nodoku-core";
import { NodokuComponents } from "nodoku-components";
var ListComp = NodokuComponents.ListComp;
var HighlightedCode = NodokuComponents.HighlightedCode;
export function JumbotronImpl(props) {
    return __awaiter(this, void 0, void 0, function () {
        var componentIndex, content, theme, themes, lng, i18nextProvider, defaultThemeName, effectiveTheme, block, t, style;
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    componentIndex = props.componentIndex, content = props.content, theme = props.theme, themes = props.themes, lng = props.lng, i18nextProvider = props.i18nextProvider, defaultThemeName = props.defaultThemeName;
                    effectiveTheme = mergeTheme(theme, JumbotronTheme.defaultTheme);
                    if (themes.length > 0) {
                        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme);
                    }
                    block = content[0];
                    return [4 /*yield*/, i18nextProvider(lng)];
                case 1:
                    t = (_o.sent()).t;
                    style = block.bgImage ? {
                        backgroundImage: "url(".concat(t(block.bgImage.url.key, (_b = (_a = block.bgImage) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.ns), ")")
                    } : {};
                    return [4 /*yield*/, Promise.all(block.paragraphs.map(function (p, ip) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (p instanceof NdTranslatedText) {
                                            return [2 /*return*/, (<p className={"".concat((_a = effectiveTheme.paragraphStyle) === null || _a === void 0 ? void 0 : _a.base, " ").concat((_b = effectiveTheme.paragraphStyle) === null || _b === void 0 ? void 0 : _b.decoration)}>
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
                case 2: 
                // console.log("effective theme", effectiveTheme)
                return [2 /*return*/, (<section className={"relative ".concat((_c = effectiveTheme.containerStyle) === null || _c === void 0 ? void 0 : _c.base, " ").concat((_d = effectiveTheme.containerStyle) === null || _d === void 0 ? void 0 : _d.decoration)}>
            <div className={"absolute top-0 left-0 right-0 bottom-0 ".concat((_e = effectiveTheme.bgImageStyle) === null || _e === void 0 ? void 0 : _e.base, " ").concat((_f = effectiveTheme.bgImageStyle) === null || _f === void 0 ? void 0 : _f.decoration)} style={style}></div>
            <div className={"absolute top-0 left-0 right-0 bottom-0 ".concat((_g = effectiveTheme.bgColorStyle) === null || _g === void 0 ? void 0 : _g.base, " ").concat((_h = effectiveTheme.bgColorStyle) === null || _h === void 0 ? void 0 : _h.decoration)}></div>

            {/*<div className={`${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>*/}
                {block.title &&
                            <h1 className={"".concat((_j = effectiveTheme.titleStyle) === null || _j === void 0 ? void 0 : _j.base, " ").concat((_k = effectiveTheme.titleStyle) === null || _k === void 0 ? void 0 : _k.decoration)}>
                        {t(block.title.key, block.title.ns)}
                    </h1>}
                {block.subTitle &&
                            <p className={"".concat((_l = effectiveTheme.subTitleStyle) === null || _l === void 0 ? void 0 : _l.base, " ").concat((_m = effectiveTheme.subTitleStyle) === null || _m === void 0 ? void 0 : _m.decoration)}>
                        {t(block.subTitle.key, block.subTitle.ns)}
                    </p>}
                {_o.sent()}

                {block.footer &&
                            <div>
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        {t(block.footer.key, block.footer.ns)}
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    </div>}
            {/*</div>*/}
        </section>)];
            }
        });
    });
}
