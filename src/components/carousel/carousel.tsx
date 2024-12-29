import React, {JSX} from "react";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {CarouselTheme} from "./carousel-theme";
import {NodokuComponents} from "nodoku-components";
import Paragraphs = NodokuComponents.Paragraphs;
import Backgrounds = NodokuComponents.Backgrounds;
import {ts} from "nodoku-core";
import paragraphDefaultTheme = NodokuComponents.paragraphDefaultTheme;
import highlightedCodeDefaultTheme = NodokuComponents.highlightedCodeDefaultTheme;
import listCompDefaultTheme = NodokuComponents.listCompDefaultTheme;
import {NdCallToAction} from "nodoku-core";
import {defaultTheme} from "./carousel-theme";
import {CarouselOptions} from "flowbite/lib/esm/components/carousel/types";
import {CarouselClientSide} from "./carousel-client-side";


export async function CarouselImpl(props: NdSkinComponentProps<CarouselTheme, CarouselOptions>): Promise<JSX.Element> {

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
    // const effectiveOptions: CarouselExtOptions = mergeTheme(options, CarouselExtOptions.defaultOptions)


    // console.log("carousel effectiveTheme", effectiveTheme);

    const slides: JSX.Element[] = await Promise.all(content.map(async (b: NdContentBlock, slideIndex: number) => {

        const slideTheme: CarouselTheme = themes.length > 0 ? themes[slideIndex % themes.length] : {};

        const effectiveSlideTheme: CarouselTheme = mergeTheme(slideTheme, effectiveTheme);

        const block: NdContentBlock = b;

        const paragraphs = await Paragraphs({
            lng: lng,
            blockParagraphs: block.paragraphs,
            paragraphTheme: effectiveSlideTheme.paragraphStyle || paragraphDefaultTheme,
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
            <div key={`row-${rowIndex}-component-${componentIndex}-slide-${slideIndex}`}
                 className={`${ts(effectiveSlideTheme, "slideContainerStyle")}`}  data-carousel-item>

                {backgrounds}

                {block.title &&
                    <div className={`${ts(effectiveTheme, "titleStyle")}`}
                         dangerouslySetInnerHTML={t(block.title)} />
                }
                {block.subTitle &&
                    <div className={`${ts(effectiveTheme, "subTitleStyle")}`}
                         dangerouslySetInnerHTML={t(block.subTitle)} />
                }

                {paragraphs}


                {block.callToActions.map((cta: NdCallToAction, i: number) => (
                    <div key={`slide-${slideIndex}-cta-${i}`} className={`${ts(effectiveSlideTheme, "ctaContainerStyle")}`}>
                        <a href={t(cta.ctaUrl).__html as string}
                           className={`${ts(effectiveSlideTheme, "ctaButtonStyle")}`}>
                            <span dangerouslySetInnerHTML={t(cta.ctaTitle || cta.ctaUrl)}/>
                            <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>))
                }
            </div>

        );
    }));


    return (

        <div className={`relative ${ts(effectiveTheme, "containerStyle")} carousel-container-main`}>
            {/*<Carousel  {...options}>*/}
            {/*    {slides}*/}
            {/*</Carousel>*/}

            <div id="default-carousel" className="relative w-full" data-carousel="static">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    <div id={"carousel-item-1"} className="duration-700 ease-in-out" data-carousel-item={""}>
                        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>
                    <div id={"carousel-item-2"} className="hidden duration-700 ease-in-out" data-carousel-item={""}>
                        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>
                    <div id={"carousel-item-3"} className="hidden duration-700 ease-in-out" data-carousel-item={""}>
                        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>
                    <div id={"carousel-item-4"} className="hidden duration-700 ease-in-out" data-carousel-item={""}>
                        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>
                </div>
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button id={"carousel-indicator-1"} type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                            data-carousel-slide-to="1"></button>
                    <button id={"carousel-indicator-2"} type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                            data-carousel-slide-to="2"></button>
                    <button id={"carousel-indicator-3"} type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
                            data-carousel-slide-to="3"></button>
                    <button id={"carousel-indicator-4"} type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"
                            data-carousel-slide-to="4"></button>
                </div>
                <button id={"data-carousel-prev"} type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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
                <button id={"data-carousel-next"} type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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

            <CarouselClientSide />

        </div>


    );
}