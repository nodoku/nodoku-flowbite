import React, {JSX} from "react";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {ts} from "nodoku-core";
import {NdCallToAction} from "nodoku-core";
import {tsi} from "nodoku-core";
import {CarouselTheme} from "./carousel-theme";
import {defaultTheme} from "./carousel-theme";
import {NdCarouselOptions} from "./carousel-theme";
import {defaultOptions} from "./carousel-theme";
import {animationSlide} from "./carousel-theme";
import {animationFadeInFadeOut} from "./carousel-theme";
import {NodokuComponents} from "nodoku-components";
import {CarouselClientSide} from "./carousel-client-side";
import Paragraphs = NodokuComponents.Paragraphs;
import Backgrounds = NodokuComponents.Backgrounds;
import paragraphDefaultTheme = NodokuComponents.paragraphDefaultTheme;
import highlightedCodeDefaultTheme = NodokuComponents.highlightedCodeDefaultTheme;
import listCompDefaultTheme = NodokuComponents.listCompDefaultTheme;


export async function CarouselImpl(props: NdSkinComponentProps<CarouselTheme, NdCarouselOptions>): Promise<JSX.Element> {

    const {lng, i18nextTrustedHtmlProvider, imageProvider} = props;

    const {t} = await i18nextTrustedHtmlProvider(lng);

    const {
        rowIndex,
        componentIndex,
        content,
        options,
        theme,
        themes,
        defaultThemeName
    } = props;


    const effectiveTheme: CarouselTheme = mergeTheme(theme, defaultTheme);
    const effectiveOptions: NdCarouselOptions = mergeTheme(options, defaultOptions)


    // console.log("carousel effectiveTheme", effectiveTheme);
    // console.log("carousel effectiveOptions", effectiveOptions);

    const indicatorButtons: JSX.Element[] = content.map((b: NdContentBlock, slideIndex: number) => {
        const indicatorButtonId = `carousel-indicator-${slideIndex}`;
        return (
            <button id={indicatorButtonId} key={indicatorButtonId} type="button"
                    className="carousel-indicator w-3 h-3 rounded-full" aria-current="true"
                    aria-label={`Slide ${slideIndex}`}
                    data-carousel-slide-to={`${slideIndex}`}>
            </button>

        )
    });

    const carouselElementId = `carousel-${10000 * Math.random()}`;

    const slides: JSX.Element[] = await Promise.all(content.map(async (b: NdContentBlock, slideIndex: number) => {

        const slideTheme: CarouselTheme = themes.length > 0 ? themes[slideIndex % themes.length] : {};

        const effectiveSlideTheme: CarouselTheme = mergeTheme(slideTheme, effectiveTheme);

        const block: NdContentBlock = b;

        const paragraphs = await Paragraphs({
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
        });

        const backgrounds = await Backgrounds({
            lng: lng,
            defaultThemeName: defaultThemeName,
            bgColorStyle: effectiveSlideTheme.bgColorStyle,
            bgImageStyle: effectiveSlideTheme.bgImageStyle
        });


        return (
            <div id={`carousel-${carouselElementId}-item-${slideIndex}`}
                 key={`row-${rowIndex}-component-${componentIndex}-slide-${slideIndex}`}
                 className={`carousel-item ${slideIndex === 0 ? "" : "hidden"} ${ts(effectiveSlideTheme, "slideAnimation")} ${ts(effectiveSlideTheme, "containerStyle")}`}
                 data-carousel-item={""}>

                {backgrounds}

                {block.title &&
                    <div className={`${ts(effectiveTheme, "titleStyle")}`}
                         dangerouslySetInnerHTML={t(block.title)}/>
                }
                {block.subTitle &&
                    <div className={`${ts(effectiveTheme, "subTitleStyle")}`}
                         dangerouslySetInnerHTML={t(block.subTitle)}/>
                }

                {paragraphs}


                <div className={`${ts(effectiveSlideTheme, "ctaContainerStyle")}`}>
                    {block.callToActions.map((cta: NdCallToAction, i: number) => (
                        <a key={`slide-${slideIndex}-cta-${i}`}
                           href={t(cta.ctaUrl).__html as string}
                           className={`${tsi(effectiveSlideTheme, "ctaButtonStyle", i)}`}>

                            <span dangerouslySetInnerHTML={t(cta.ctaTitle || cta.ctaUrl)}/>
                            <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    ))}
                </div>
            </div>

        );
    }));


    const animation = effectiveOptions.animationType === "slide" ? animationSlide : animationFadeInFadeOut

    return (

        <div className={`relative ${ts(effectiveTheme, "carouselContainerStyle")} carousel-container-main`}>

            <div id={carouselElementId} className="relative w-full aspect-[2/4] md:aspect-square lg:aspect-[4/1.61]"
                 data-carousel="static">
                <div className="absolute inset-0">
                    {slides}
                </div>
                {effectiveOptions.showIndicators &&
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {indicatorButtons}
                    </div>
                }
                <button id={"data-carousel-prev"} type="button"
                        className="data-carousel-prev absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev={""}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button id={"data-carousel-next"} type="button"
                        className="data-carousel-next absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next={""}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <CarouselClientSide
                options={effectiveOptions}
                carouselElementId={carouselElementId}
                animation={animation}
                indicators={{
                    activeClasses: ts(effectiveTheme, "indicatorActiveClasses"),
                    inactiveClasses: ts(effectiveTheme, "indicatorInactiveClasses")
                }}/>

        </div>


    );
}