import React, {JSX} from "react";
import {Carousel, CarouselProps} from "flowbite-react";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {CarouselTheme} from "./carousel-theme";
import {NodokuComponents} from "nodoku-components";
import Paragraphs = NodokuComponents.Paragraphs;
import Backgrounds = NodokuComponents.Backgrounds;


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


    const effectiveTheme: CarouselTheme = mergeTheme(theme, CarouselTheme.defaultTheme);
    // const effectiveOptions: CarouselExtOptions = mergeTheme(options, CarouselExtOptions.defaultOptions)


    // console.log("carousel effectiveTheme", effectiveTheme);

    // const slideClassNames: { className: string }[] = theme?.slides ? theme.slides : [];

    const slides: JSX.Element[] = await Promise.all(content.map(async (b: NdContentBlock, slideIndex: number) => {

        // const themeClassName = slideClassNames[slideIndex].className

        const slideTheme: CarouselTheme = themes.length > 0 ? themes[slideIndex % themes.length] : {};

        const effectiveSlideTheme: CarouselTheme = mergeTheme(slideTheme, effectiveTheme);

        const block: NdContentBlock = b;

        const paragraphs = await Paragraphs({
            lng: lng,
            blockParagraphs: block.paragraphs,
            paragraphStyle: effectiveSlideTheme.paragraphStyle,
            codeHighlightTheme: effectiveSlideTheme.codeHighlightTheme!,
            listTheme: effectiveSlideTheme.listTheme!,
            defaultThemeName: defaultThemeName,
            i18nextProvider: i18nextProvider
        });

        const backgrounds = await Backgrounds({
            lng: lng,
            defaultThemeName: defaultThemeName,
            bgColorStyle: effectiveSlideTheme.bgColorStyle,
            bgImageStyle: effectiveSlideTheme.bgImageStyle,
            i18nextProvider: i18nextProvider,
            // bgImageUrl: block.bgImageUrl//,
            // imageUrlProvider: imageUrlProvider
        });


        return (
            <div key={`row-${rowIndex}-component-${componentIndex}-slide-${slideIndex}`}
                 className={`${effectiveSlideTheme.slideContainerStyle?.base} ${effectiveSlideTheme.slideContainerStyle?.decoration}`} >

                {backgrounds}

                {block.title &&
                    <div className={`${effectiveTheme.titleStyle?.base} ${effectiveTheme.titleStyle?.decoration}`}
                         dangerouslySetInnerHTML={{__html: t(block.title)}} />
                }
                {block.subTitle &&
                    <div className={`${effectiveTheme.subTitleStyle?.base} ${effectiveTheme.subTitleStyle?.decoration}`}
                         dangerouslySetInnerHTML={{__html: t(block.subTitle)}} />
                }

                {paragraphs}


                {block.footer &&
                    <div className={`${effectiveSlideTheme.footerContainerStyle?.base} ${effectiveSlideTheme.footerContainerStyle?.decoration}`}>
                        <a href="#"
                           className={`${effectiveSlideTheme.footerButtonStyle?.base} ${effectiveSlideTheme.footerButtonStyle?.decoration}`}>
                            <span dangerouslySetInnerHTML={{__html: t(block.footer)}}/>
                            <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>

                }
            </div>

        );
    }));


    return (

        <div className={`relative ${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration} carousel-container-main`}>
            <Carousel  {...options}>
                {slides}
            </Carousel>
        </div>

    );
}