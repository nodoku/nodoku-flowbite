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
import { mergeTheme } from "nodoku-core";
import { NodokuComponents } from "nodoku-components";
var Paragraphs = NodokuComponents.Paragraphs;
var Backgrounds = NodokuComponents.Backgrounds;
import { ts } from "nodoku-core";
var paragraphDefaultTheme = NodokuComponents.paragraphDefaultTheme;
var highlightedCodeDefaultTheme = NodokuComponents.highlightedCodeDefaultTheme;
var listCompDefaultTheme = NodokuComponents.listCompDefaultTheme;
export function CardImpl(props) {
    return __awaiter(this, void 0, void 0, function () {
        var componentIndex, content, theme, themes, lng, i18nextProvider, imageProvider, defaultThemeName, effectiveTheme, block, _a, url, alt, t, paragraphs, backgrounds, _b;
        var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0:
                    componentIndex = props.componentIndex, content = props.content, theme = props.theme, themes = props.themes, lng = props.lng, i18nextProvider = props.i18nextProvider, imageProvider = props.imageProvider, defaultThemeName = props.defaultThemeName;
                    effectiveTheme = mergeTheme(theme, CardTheme.defaultTheme);
                    if (themes.length > 0) {
                        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme);
                    }
                    block = content[0];
                    _a = block.images[0], url = _a.url, alt = _a.alt;
                    return [4 /*yield*/, i18nextProvider(lng)];
                case 1:
                    t = (_s.sent()).t;
                    return [4 /*yield*/, Paragraphs({
                            lng: lng,
                            blockParagraphs: block.paragraphs,
                            paragraphTheme: effectiveTheme.paragraphStyle || paragraphDefaultTheme,
                            codeHighlightTheme: effectiveTheme.codeHighlightTheme || highlightedCodeDefaultTheme,
                            listTheme: effectiveTheme.listTheme || listCompDefaultTheme,
                            defaultThemeName: defaultThemeName,
                            i18nextProvider: i18nextProvider
                        })];
                case 2:
                    paragraphs = _s.sent();
                    return [4 /*yield*/, Backgrounds({
                            lng: lng,
                            defaultThemeName: defaultThemeName,
                            bgColorStyle: effectiveTheme.bgColorStyle,
                            bgImageStyle: effectiveTheme.bgImageStyle,
                            i18nextProvider: i18nextProvider,
                            // bgImageUrl: block.bgImageUrl//,
                            // imageUrlProvider: imageUrlProvider
                        })];
                case 3:
                    backgrounds = _s.sent();
                    _b = url;
                    if (!_b) return [3 /*break*/, 5];
                    return [4 /*yield*/, imageProvider({ url: t(url), alt: alt && t(alt), imageStyle: effectiveTheme.imageStyle })];
                case 4:
                    _b = <div className={"".concat(ts(effectiveTheme, "imageContainerStyle"), " ").concat((_e = effectiveTheme.imageContainerStyle) === null || _e === void 0 ? void 0 : _e.base, " ").concat((_f = effectiveTheme.imageContainerStyle) === null || _f === void 0 ? void 0 : _f.decoration)}>
                    <a href="#" className={"inline-block"}>
                        {/*<img className={`${effectiveTheme.imageStyle?.base} ${effectiveTheme.imageStyle?.decoration}`}*/}
                        {/*     src={await imageUrlProvider(t(url))} alt={alt && t(alt)}/>*/}
                        {_s.sent()}
                    </a>
                </div>;
                    _s.label = 5;
                case 5: return [2 /*return*/, (<div className={"relative ".concat(ts(effectiveTheme, "containerStyle"), " ").concat((_c = effectiveTheme.containerStyle) === null || _c === void 0 ? void 0 : _c.base, " ").concat((_d = effectiveTheme.containerStyle) === null || _d === void 0 ? void 0 : _d.decoration)}>

            {backgrounds}

            {_b}
            <div className={"".concat(ts(effectiveTheme, "innerContainerStyle"), " ").concat((_g = effectiveTheme.innerContainerStyle) === null || _g === void 0 ? void 0 : _g.base, " ").concat((_h = effectiveTheme.innerContainerStyle) === null || _h === void 0 ? void 0 : _h.decoration)}>

                {block.title &&
                            <a href="#">
                        <h3 className={"".concat(ts(effectiveTheme, "titleStyle"), " ").concat((_j = effectiveTheme.titleStyle) === null || _j === void 0 ? void 0 : _j.base, " ").concat((_k = effectiveTheme.titleStyle) === null || _k === void 0 ? void 0 : _k.decoration)} dangerouslySetInnerHTML={{ __html: t(block.title) }}/>
                    </a>}
                {block.subTitle &&
                            <h4 className={"".concat(ts(effectiveTheme, "subTitleStyle"), " ").concat((_l = effectiveTheme.subTitleStyle) === null || _l === void 0 ? void 0 : _l.base, " ").concat((_m = effectiveTheme.subTitleStyle) === null || _m === void 0 ? void 0 : _m.decoration)} dangerouslySetInnerHTML={{ __html: t(block.subTitle) }}/>}

                {paragraphs}

            </div>

            {block.footer &&
                            <div className={"".concat(ts(effectiveTheme, "footerContainerStyle"), " ").concat((_o = effectiveTheme.footerContainerStyle) === null || _o === void 0 ? void 0 : _o.base, " ").concat((_p = effectiveTheme.footerContainerStyle) === null || _p === void 0 ? void 0 : _p.decoration)}>

                    <a href="#" className={"".concat(ts(effectiveTheme, "footerButtonStyle"), " ").concat((_q = effectiveTheme.footerButtonStyle) === null || _q === void 0 ? void 0 : _q.base, " ").concat((_r = effectiveTheme.footerButtonStyle) === null || _r === void 0 ? void 0 : _r.decoration)}>
                        <span dangerouslySetInnerHTML={{ __html: t(block.footer) }}/>
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
//# sourceMappingURL=card.jsx.map