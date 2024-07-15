import React, {JSX} from "react";
import {Carousel, CarouselProps} from "flowbite-react";
import {LbComponentProps, LbContentBlock, LbTranslatedText} from "nodoku-core";
import {LbCarouselVisualTheme} from "./lb-carousel-visual-theme";

export async function CoreCarousel(props: LbComponentProps<LbCarouselVisualTheme, CarouselProps>): Promise<JSX.Element> {

    const {lng, i18nextProvider} = props;

    const {t} = await i18nextProvider(lng);

    const {rowIndex, componentIndex, content, options, visual} = props;

    const slideClassNames: { className: string }[] = visual.slides;

    const slides: JSX.Element[] = content.map(((b: LbContentBlock, slideIndex: number) => {

        const themeClassName = slideClassNames[slideIndex].className
        const slideContent: LbContentBlock = content[slideIndex];

        var bgClassName: string = "";
        var style: React.CSSProperties = {};

        if (slideContent.bgImage && slideContent.bgImage.url) {

            bgClassName = "bg-cover bg-no-repeat"
            style = {
                backgroundImage: `url(${slideContent.bgImage.url && t(slideContent.bgImage.url.key, slideContent.bgImage.url.ns)})`,
                zIndex: -10
            } as React.CSSProperties;

        }

        return (
            <div key={`row-${rowIndex}-component-${componentIndex}-slide-${slideIndex}`}
                 className={`w-full flex flex-col h-full items-center justify-center text-center ${themeClassName} bg-blend-overlay blur-none `}
            >
                <div className={`absolute top-0 left-0 right-0 bottom-0 blur-sm opacity-100 ${bgClassName}`}
                     style={style}>
                </div>
                <div
                    className={"text-6xl lg:text-9xl md:text-6xl sm:text-4xl mb-6"}>{slideContent.title && t(slideContent.title.key, slideContent.title.ns)}</div>
                <div
                    className={"text-4xl lg:text-6xl md:text-4xl sm:text-2xl mb-6"}>{slideContent.subTitle && t(slideContent.subTitle.key, slideContent.subTitle.ns)}</div>
                <div className={"text-2xl lg:text-3xl md:text-2xl sm:text-1xl "}>{
                    content[slideIndex].paragraphs?.map((p: LbTranslatedText, k: number) => <p
                        key={k}>{p && t(p.key, p.ns)}</p>)}
                </div>


                {slideContent.footer &&
                    <a href="#"
                       className={"inline-flex items-center px-3 py-2 mt-10 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>
                        {slideContent.footer && t(slideContent.footer.key, slideContent.footer.ns)}
                        <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>

                }
            </div>

        );
    }));


    return (

        <div className={"aspect-square lg:aspect-carousel md:aspect-carousel sm:aspect-carousel "}>
            <Carousel  {...options}>
                {slides}
            </Carousel>
        </div>

    );
}

export default CoreCarousel;