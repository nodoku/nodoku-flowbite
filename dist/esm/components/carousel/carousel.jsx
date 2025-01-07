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
import { mergeTheme } from "nodoku-core";
import { ts } from "nodoku-core";
import { tsi } from "nodoku-core";
import { defaultTheme } from "./carousel-theme";
import { defaultOptions } from "./carousel-theme";
import { animationSlideX, animationSlideY, animationFadeInFadeOut } from "./carousel-theme";
import { NodokuComponents } from "nodoku-components";
import { CarouselClientSide } from "./carousel-client-side";
var Paragraphs = NodokuComponents.Paragraphs;
var Backgrounds = NodokuComponents.Backgrounds;
var paragraphDefaultTheme = NodokuComponents.paragraphDefaultTheme;
var highlightedCodeDefaultTheme = NodokuComponents.highlightedCodeDefaultTheme;
var listCompDefaultTheme = NodokuComponents.listCompDefaultTheme;
export function CarouselImpl(props) {
    return __awaiter(this, void 0, void 0, function () {
        var lng, i18nextTrustedHtmlProvider, imageProvider, t, rowIndex, componentIndex, content, options, theme, themes, defaultThemeName, effectiveTheme, effectiveOptions, indicatorButtons, carouselElementId, slides, animation;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lng = props.lng, i18nextTrustedHtmlProvider = props.i18nextTrustedHtmlProvider, imageProvider = props.imageProvider;
                    return [4 /*yield*/, i18nextTrustedHtmlProvider(lng)];
                case 1:
                    t = (_a.sent()).t;
                    rowIndex = props.rowIndex, componentIndex = props.componentIndex, content = props.content, options = props.options, theme = props.theme, themes = props.themes, defaultThemeName = props.defaultThemeName;
                    effectiveTheme = mergeTheme(theme, defaultTheme);
                    effectiveOptions = mergeTheme(options, defaultOptions);
                    indicatorButtons = content.map(function (b, slideIndex) {
                        var indicatorButtonId = "carousel-indicator-".concat(slideIndex);
                        return (<button id={indicatorButtonId} key={indicatorButtonId} type="button" className="carousel-indicator w-3 h-3 rounded-full" aria-current="true" aria-label={"Slide ".concat(slideIndex)} data-carousel-slide-to={"".concat(slideIndex)}>
            </button>);
                    });
                    carouselElementId = "carousel-".concat(10000 * Math.random());
                    return [4 /*yield*/, Promise.all(content.map(function (b, slideIndex) { return __awaiter(_this, void 0, void 0, function () {
                            var slideTheme, effectiveSlideTheme, block, paragraphs, backgrounds;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        slideTheme = themes.length > 0 ? themes[slideIndex % themes.length] : {};
                                        effectiveSlideTheme = mergeTheme(slideTheme, effectiveTheme);
                                        block = b;
                                        return [4 /*yield*/, Paragraphs({
                                                lng: lng,
                                                blockParagraphs: block.paragraphs,
                                                paragraphTheme: {
                                                    paragraphStyle: effectiveSlideTheme.paragraphStyle,
                                                    paragraphContainer: effectiveTheme.paragraphContainerStyle
                                                } || paragraphDefaultTheme,
                                                codeHighlightTheme: effectiveSlideTheme.codeHighlightTheme || highlightedCodeDefaultTheme,
                                                listTheme: effectiveSlideTheme.listTheme || listCompDefaultTheme,
                                                defaultThemeName: defaultThemeName,
                                                i18nextTrustedHtmlProvider: i18nextTrustedHtmlProvider
                                            })];
                                    case 1:
                                        paragraphs = _a.sent();
                                        return [4 /*yield*/, Backgrounds({
                                                lng: lng,
                                                defaultThemeName: defaultThemeName,
                                                bgColorStyle: effectiveSlideTheme.bgColorStyle,
                                                bgImageStyle: effectiveSlideTheme.bgImageStyle
                                            })];
                                    case 2:
                                        backgrounds = _a.sent();
                                        return [2 /*return*/, (<div id={"carousel-".concat(carouselElementId, "-item-").concat(slideIndex)} key={"row-".concat(rowIndex, "-component-").concat(componentIndex, "-slide-").concat(slideIndex)} className={"carousel-item ".concat(slideIndex === 0 ? "" : "hidden", " ").concat(ts(effectiveSlideTheme, "slideAnimation"), " ").concat(ts(effectiveSlideTheme, "containerStyle"))} data-carousel-item={""}>

                {backgrounds}

                {block.title &&
                                                    <div className={"".concat(ts(effectiveTheme, "titleStyle"))} dangerouslySetInnerHTML={t(block.title)}/>}
                {block.subTitle &&
                                                    <div className={"".concat(ts(effectiveTheme, "subTitleStyle"))} dangerouslySetInnerHTML={t(block.subTitle)}/>}

                {paragraphs}


                <div className={"".concat(ts(effectiveSlideTheme, "ctaContainerStyle"))}>
                    {block.callToActions.map(function (cta, i) { return (<a key={"slide-".concat(slideIndex, "-cta-").concat(i)} href={t(cta.ctaUrl).__html} className={"".concat(tsi(effectiveSlideTheme, "ctaButtonStyle", i))}>

                            <span dangerouslySetInnerHTML={t(cta.ctaTitle || cta.ctaUrl)}/>
                            <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>); })}
                </div>
            </div>)];
                                }
                            });
                        }); }))];
                case 2:
                    slides = _a.sent();
                    switch (effectiveOptions.animationType) {
                        case "slide-x":
                            animation = animationSlideX;
                            break;
                        case "slide-y":
                            animation = animationSlideY;
                            break;
                        case "fade-in-fade-out":
                            animation = animationFadeInFadeOut;
                            break;
                    }
                    return [2 /*return*/, (<div className={"relative ".concat(ts(effectiveTheme, "carouselContainerStyle"), " carousel-container-main")}>

            <div id={carouselElementId} className="relative w-full aspect-[2/4] md:aspect-square lg:aspect-[4/1.61]" data-carousel="static">
                <div className="absolute inset-0">
                    {slides}
                </div>
                {effectiveOptions.showIndicators &&
                                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {indicatorButtons}
                    </div>}
                <button id={"data-carousel-prev"} type="button" className="data-carousel-prev absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev={""}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button id={"data-carousel-next"} type="button" className="data-carousel-next absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next={""}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <CarouselClientSide options={effectiveOptions} carouselElementId={carouselElementId} animation={animation} indicators={{
                                activeClasses: ts(effectiveTheme, "indicatorActiveClasses"),
                                inactiveClasses: ts(effectiveTheme, "indicatorInactiveClasses")
                            }}/>

        </div>)];
            }
        });
    });
}
//# sourceMappingURL=carousel.jsx.map