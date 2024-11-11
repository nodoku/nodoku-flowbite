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
import { Carousel } from "flowbite-react";
import { mergeTheme } from "nodoku-core";
import { CarouselTheme } from "./carousel-theme";
import { NodokuComponents } from "nodoku-components";
var Paragraphs = NodokuComponents.Paragraphs;
var Backgrounds = NodokuComponents.Backgrounds;
export function CarouselImpl(props) {
    return __awaiter(this, void 0, void 0, function () {
        var lng, i18nextProvider, imageUrlProvider, t, rowIndex, componentIndex, content, options, theme, themes, defaultThemeName, effectiveTheme, slides;
        var _this = this;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lng = props.lng, i18nextProvider = props.i18nextProvider, imageUrlProvider = props.imageUrlProvider;
                    return [4 /*yield*/, i18nextProvider(lng)];
                case 1:
                    t = (_c.sent()).t;
                    rowIndex = props.rowIndex, componentIndex = props.componentIndex, content = props.content, options = props.options, theme = props.theme, themes = props.themes, defaultThemeName = props.defaultThemeName;
                    effectiveTheme = mergeTheme(theme, CarouselTheme.defaultTheme);
                    return [4 /*yield*/, Promise.all(content.map(function (b, slideIndex) { return __awaiter(_this, void 0, void 0, function () {
                            var slideTheme, effectiveSlideTheme, block, paragraphs, backgrounds;
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                            return __generator(this, function (_l) {
                                switch (_l.label) {
                                    case 0:
                                        slideTheme = themes.length > 0 ? themes[slideIndex % themes.length] : {};
                                        effectiveSlideTheme = mergeTheme(slideTheme, effectiveTheme);
                                        block = b;
                                        return [4 /*yield*/, Paragraphs({
                                                lng: lng,
                                                blockParagraphs: block.paragraphs,
                                                paragraphStyle: effectiveSlideTheme.paragraphStyle,
                                                codeHighlightTheme: effectiveSlideTheme.codeHighlightTheme,
                                                listTheme: effectiveSlideTheme.listTheme,
                                                defaultThemeName: defaultThemeName,
                                                i18nextProvider: i18nextProvider
                                            })];
                                    case 1:
                                        paragraphs = _l.sent();
                                        return [4 /*yield*/, Backgrounds({
                                                lng: lng,
                                                defaultThemeName: defaultThemeName,
                                                bgColorStyle: effectiveSlideTheme.bgColorStyle,
                                                bgImageStyle: effectiveSlideTheme.bgImageStyle,
                                                i18nextProvider: i18nextProvider,
                                                bgImageUrl: block.bgImageUrl,
                                                imageUrlProvider: imageUrlProvider
                                            })];
                                    case 2:
                                        backgrounds = _l.sent();
                                        return [2 /*return*/, (<div key={"row-".concat(rowIndex, "-component-").concat(componentIndex, "-slide-").concat(slideIndex)} className={"".concat((_a = effectiveSlideTheme.slideContainerStyle) === null || _a === void 0 ? void 0 : _a.base, " ").concat((_b = effectiveSlideTheme.slideContainerStyle) === null || _b === void 0 ? void 0 : _b.decoration)}>

                {backgrounds}

                {block.title &&
                                                    <div className={"".concat((_c = effectiveTheme.titleStyle) === null || _c === void 0 ? void 0 : _c.base, " ").concat((_d = effectiveTheme.titleStyle) === null || _d === void 0 ? void 0 : _d.decoration)} dangerouslySetInnerHTML={{ __html: t(block.title) }}/>}
                {block.subTitle &&
                                                    <div className={"".concat((_e = effectiveTheme.subTitleStyle) === null || _e === void 0 ? void 0 : _e.base, " ").concat((_f = effectiveTheme.subTitleStyle) === null || _f === void 0 ? void 0 : _f.decoration)} dangerouslySetInnerHTML={{ __html: t(block.subTitle) }}/>}

                {paragraphs}


                {block.footer &&
                                                    <div className={"".concat((_g = effectiveSlideTheme.footerContainerStyle) === null || _g === void 0 ? void 0 : _g.base, " ").concat((_h = effectiveSlideTheme.footerContainerStyle) === null || _h === void 0 ? void 0 : _h.decoration)}>
                        <a href="#" className={"".concat((_j = effectiveSlideTheme.footerButtonStyle) === null || _j === void 0 ? void 0 : _j.base, " ").concat((_k = effectiveSlideTheme.footerButtonStyle) === null || _k === void 0 ? void 0 : _k.decoration)}>
                            {t(block.footer)}
                            <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>}
            </div>)];
                                }
                            });
                        }); }))];
                case 2:
                    slides = _c.sent();
                    return [2 /*return*/, (<div className={"relative ".concat((_a = effectiveTheme.containerStyle) === null || _a === void 0 ? void 0 : _a.base, " ").concat((_b = effectiveTheme.containerStyle) === null || _b === void 0 ? void 0 : _b.decoration, " carousel-container-main")}>
            <Carousel {...options}>
                {slides}
            </Carousel>
        </div>)];
            }
        });
    });
}
//# sourceMappingURL=carousel.jsx.map