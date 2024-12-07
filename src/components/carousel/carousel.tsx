import React, {JSX} from "react";
import {Carousel, CarouselProps} from "flowbite-react";
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


export async function CarouselImpl(props: NdSkinComponentProps<CarouselTheme, CarouselProps>): Promise<JSX.Element> {

    const {lng, i18nextProvider, imageProvider} = props;

    const {t} = await i18nextProvider(lng);

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
            i18nextProvider: i18nextProvider
        });

        const backgrounds = await Backgrounds({
            lng: lng,
            defaultThemeName: defaultThemeName,
            bgColorStyle: effectiveSlideTheme.bgColorStyle,
            bgImageStyle: effectiveSlideTheme.bgImageStyle,
            i18nextProvider: i18nextProvider
        });


        return (
            <div key={`row-${rowIndex}-component-${componentIndex}-slide-${slideIndex}`}
                 className={`${ts(effectiveSlideTheme, "slideContainerStyle")}`} >

                {backgrounds}

                {block.title &&
                    <div className={`${ts(effectiveTheme, "titleStyle")}`}
                         dangerouslySetInnerHTML={{__html: t(block.title)}} />
                }
                {block.subTitle &&
                    <div className={`${ts(effectiveTheme, "subTitleStyle")}`}
                         dangerouslySetInnerHTML={{__html: t(block.subTitle)}} />
                }

                {paragraphs}


                {block.callToActions.map((cta: NdCallToAction, i: number) => (
                    <div key={`slide-${slideIndex}-cta-${i}`} className={`${ts(effectiveSlideTheme, "ctaContainerStyle")}`}>
                        <a href={t(cta.ctaUrl)}
                           className={`${ts(effectiveSlideTheme, "ctaButtonStyle")}`}>
                            <span dangerouslySetInnerHTML={{__html: t(cta.ctaTitle || cta.ctaUrl)}}/>
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
            <Carousel  {...options}>
                {slides}
            </Carousel>
        </div>

    );
}