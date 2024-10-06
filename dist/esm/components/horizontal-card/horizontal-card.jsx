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
import { HorizontalCardTheme } from "./horizontal-card-theme";
import { mergeTheme } from "nodoku-core";
import { NodokuComponents } from "nodoku-components";
var Paragraphs = NodokuComponents.Paragraphs;
export function HorizontalCardImpl(props) {
    return __awaiter(this, void 0, void 0, function () {
        var componentIndex, content, theme, themes, lng, i18nextProvider, imageUrlProvider, defaultThemeName, effectiveTheme, block, _a, url, alt, t, bgStyle, _b, _c, absZero, _d, _e, _f, _g, _h, imgUrl;
        var _j;
        var _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        return __generator(this, function (_3) {
            switch (_3.label) {
                case 0:
                    componentIndex = props.componentIndex, content = props.content, theme = props.theme, themes = props.themes, lng = props.lng, i18nextProvider = props.i18nextProvider, imageUrlProvider = props.imageUrlProvider, defaultThemeName = props.defaultThemeName;
                    effectiveTheme = mergeTheme(theme, HorizontalCardTheme.defaultTheme);
                    if (themes.length > 0) {
                        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme);
                    }
                    block = content[0];
                    _a = block.images[0], url = _a.url, alt = _a.alt;
                    return [4 /*yield*/, i18nextProvider(lng)];
                case 1:
                    t = (_3.sent()).t;
                    if (!block.bgImageUrl) return [3 /*break*/, 3];
                    _j = {};
                    _c = "url(".concat;
                    return [4 /*yield*/, imageUrlProvider(t(block.bgImageUrl.key, block.bgImageUrl.ns))];
                case 2:
                    _b = (_j.backgroundImage = _c.apply("url(", [_3.sent(), ")"]),
                        _j);
                    return [3 /*break*/, 4];
                case 3:
                    _b = {};
                    _3.label = 4;
                case 4:
                    bgStyle = _b;
                    absZero = "absolute top-0 left-0 right-0 bottom-0";
                    _e = (_d = console).log;
                    _f = ["in horizontal card: "];
                    _h = (_g = JSON).stringify;
                    return [4 /*yield*/, imageUrlProvider(t(url.key, url.ns))];
                case 5:
                    _e.apply(_d, _f.concat([_h.apply(_g, [_3.sent()])]));
                    return [4 /*yield*/, imageUrlProvider(t(url.key, url.ns))
                        // const paragraphs: JSX.Element[] = await Promise.all(block.paragraphs.map(async (p: NdTranslatedText | NdList | NdCode, ip: number): Promise<JSX.Element> => {
                        //     if (p instanceof NdTranslatedText) {
                        //         return (
                        //             <p key={ip}
                        //                className={`${effectiveTheme.paragraphStyle?.base} ${effectiveTheme.paragraphStyle?.decoration}`}
                        //                dangerouslySetInnerHTML={{__html: /*t(p.key, p.ns)*/"kaka lala"}} />
                        //         )
                        //     } else if (p instanceof NdCode) {
                        //         return await HighlightedCode({code: p as NdCode, theme: effectiveTheme.codeHighlightTheme!, defaultThemeName: defaultThemeName})
                        //     } else {
                        //         return await ListComp({list: p as NdList, lng: lng, i18nextProvider: i18nextProvider, listTheme: effectiveTheme.listTheme!})
                        //     }
                        // }));
                    ];
                case 6:
                    imgUrl = _3.sent();
                    return [4 /*yield*/, Paragraphs({
                            lng: lng,
                            blockParagraphs: block.paragraphs,
                            paragraphStyle: effectiveTheme.paragraphStyle,
                            codeHighlightTheme: effectiveTheme.codeHighlightTheme,
                            listTheme: effectiveTheme.listTheme,
                            defaultThemeName: defaultThemeName,
                            i18nextProvider: i18nextProvider
                        })];
                case 7: 
                // const paragraphs: JSX.Element[] = await Promise.all(block.paragraphs.map(async (p: NdTranslatedText | NdList | NdCode, ip: number): Promise<JSX.Element> => {
                //     if (p instanceof NdTranslatedText) {
                //         return (
                //             <p key={ip}
                //                className={`${effectiveTheme.paragraphStyle?.base} ${effectiveTheme.paragraphStyle?.decoration}`}
                //                dangerouslySetInnerHTML={{__html: /*t(p.key, p.ns)*/"kaka lala"}} />
                //         )
                //     } else if (p instanceof NdCode) {
                //         return await HighlightedCode({code: p as NdCode, theme: effectiveTheme.codeHighlightTheme!, defaultThemeName: defaultThemeName})
                //     } else {
                //         return await ListComp({list: p as NdList, lng: lng, i18nextProvider: i18nextProvider, listTheme: effectiveTheme.listTheme!})
                //     }
                // }));
                return [2 /*return*/, (<div className={"relative ".concat((_k = effectiveTheme.containerStyle) === null || _k === void 0 ? void 0 : _k.base, " ").concat((_l = effectiveTheme.containerStyle) === null || _l === void 0 ? void 0 : _l.decoration)}>
            <div className={"absolute top-0 left-0 right-0 bottom-0 ".concat((_m = effectiveTheme.bgImageStyle) === null || _m === void 0 ? void 0 : _m.base, " ").concat((_o = effectiveTheme.bgImageStyle) === null || _o === void 0 ? void 0 : _o.decoration)} style={bgStyle}></div>
            <div className={"absolute top-0 left-0 right-0 bottom-0 ".concat((_p = effectiveTheme.bgColorStyle) === null || _p === void 0 ? void 0 : _p.base, " ").concat((_q = effectiveTheme.bgColorStyle) === null || _q === void 0 ? void 0 : _q.decoration)}></div>


            <img className={"".concat((_r = effectiveTheme.imageStyle) === null || _r === void 0 ? void 0 : _r.base, " ").concat((_s = effectiveTheme.imageStyle) === null || _s === void 0 ? void 0 : _s.decoration)} src={imgUrl} alt={alt && t(alt.key, alt.ns)}></img>

            <div className={"".concat((_t = effectiveTheme.innerContainerStyle) === null || _t === void 0 ? void 0 : _t.base, " ").concat((_u = effectiveTheme.innerContainerStyle) === null || _u === void 0 ? void 0 : _u.decoration)}>

                {block.title &&
                            <h5 className={"".concat((_v = effectiveTheme.titleStyle) === null || _v === void 0 ? void 0 : _v.base, " ").concat((_w = effectiveTheme.titleStyle) === null || _w === void 0 ? void 0 : _w.decoration)} dangerouslySetInnerHTML={{ __html: t(block.title.key, block.title.ns) }}/>}
                {block.subTitle &&
                            <h6 className={"".concat((_x = effectiveTheme.subTitleStyle) === null || _x === void 0 ? void 0 : _x.base, " ").concat((_y = effectiveTheme.subTitleStyle) === null || _y === void 0 ? void 0 : _y.decoration)} dangerouslySetInnerHTML={{ __html: t(block.subTitle.key, block.subTitle.ns) }}/>}

                {_3.sent()}

            </div>

            {block.footer &&
                            <div className={"".concat((_z = effectiveTheme.footerContainerStyle) === null || _z === void 0 ? void 0 : _z.base, " ").concat((_0 = effectiveTheme.footerContainerStyle) === null || _0 === void 0 ? void 0 : _0.decoration)}>

                    <a href="#" className={"".concat((_1 = effectiveTheme.footerButtonStyle) === null || _1 === void 0 ? void 0 : _1.base, " ").concat((_2 = effectiveTheme.footerButtonStyle) === null || _2 === void 0 ? void 0 : _2.decoration)}>
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
