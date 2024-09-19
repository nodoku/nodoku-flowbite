import React, {JSX} from "react";
import {Carousel} from "flowbite-react";
import {mergeTheme, NdCode, NdContentBlock, NdList, NdSkinComponentProps, NdTranslatedText} from "nodoku-core";
import {CarouselTheme} from "./carousel-theme";
import {NodokuComponents} from "nodoku-components";
import {CarouselExtOptions} from "./carousel-ext-options";
import path from "node:path";
import HighlightedCode = NodokuComponents.HighlightedCode;
import ListComp = NodokuComponents.ListComp;


export async function CarouselImpl(props: NdSkinComponentProps<CarouselTheme, CarouselExtOptions>): Promise<JSX.Element> {

    const {lng, i18nextProvider} = props;

    const {t} = await i18nextProvider(lng);

    const {rowIndex,
        componentIndex,
        content, options, theme, themes, defaultThemeName} = props;


    const effectiveTheme: CarouselTheme = mergeTheme(theme, CarouselTheme.defaultTheme);
    const effectiveOptions: CarouselExtOptions = mergeTheme(options, CarouselExtOptions.defaultOptions)

    // console.log("carousel effectiveTheme", effectiveTheme);

    // const slideClassNames: { className: string }[] = theme?.slides ? theme.slides : [];

    const slides: JSX.Element[] = await Promise.all(content.map(async (b: NdContentBlock, slideIndex: number) => {

        // const themeClassName = slideClassNames[slideIndex].className

        const slideTheme: CarouselTheme = themes.length > 0 ? themes[slideIndex % themes.length] : {};

        const effectiveSlideTheme: CarouselTheme = mergeTheme(slideTheme, effectiveTheme);

        const block: NdContentBlock = content[slideIndex];

        var style: React.CSSProperties = block.bgImage ? {
            backgroundImage: `url(${t(block.bgImage.url.key, block.bgImage?.url?.ns)})`
        } : {};

        return (
            <div key={`row-${rowIndex}-component-${componentIndex}-slide-${slideIndex}`}
                 className={`${effectiveSlideTheme.slideContainerStyle?.base} ${effectiveSlideTheme.slideContainerStyle?.decoration}`} >
                <div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveSlideTheme.bgImageStyle?.base} ${effectiveSlideTheme.bgImageStyle?.decoration}`} style={style}></div>
                <div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveSlideTheme.bgColorStyle?.base} ${effectiveSlideTheme.bgColorStyle?.decoration}`}></div>
                {block.title &&
                    <div className={`${effectiveSlideTheme.titleStyle?.base} ${effectiveSlideTheme.titleStyle?.decoration}`}>
                        {t(block.title.key, block.title.ns)}
                    </div>
                }
                {block.subTitle &&
                    <div className={`${effectiveSlideTheme.subtitleStyle?.base} ${effectiveSlideTheme.subtitleStyle?.decoration}`}>
                        {t(block.subTitle.key, block.subTitle.ns)}
                    </div>
                }
                {await Promise.all(block.paragraphs.map(async (p: NdTranslatedText | NdList | NdCode, ip: number) => {
                    if (p instanceof NdTranslatedText) {
                        return (
                            <p key={ip}
                               className={`${effectiveTheme.paragraphStyle?.base} ${effectiveTheme.paragraphStyle?.decoration}`}>
                                {p && t(p.key, p.ns)}
                            </p>
                        )
                    } if (p instanceof NdCode) {
                        return await HighlightedCode({code: p as NdCode, theme: effectiveTheme.codeHighlightTheme!, defaultThemeName: defaultThemeName})
                    } else {
                        return await ListComp({list: p as NdList, lng: lng, i18nextProvider: i18nextProvider, listTheme: effectiveTheme.listTheme!})
                        // return await <ListComp list={p as NdList} lng={lng} i18nextProvider={i18nextProvider} />
                    }
                }))}


                {block.footer &&
                    <div className={`${effectiveSlideTheme.footerContainerStyle?.base} ${effectiveSlideTheme.footerContainerStyle?.decoration}`}>
                        <a href="#" className={`${effectiveSlideTheme.footerButtonStyle?.base} ${effectiveSlideTheme.footerButtonStyle?.decoration}`}>
                            {t(block.footer.key, block.footer.ns)}
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

        <div className={`${effectiveOptions.containerStyle?.base} ${effectiveOptions.containerStyle?.decoration} carousel-start`}>
            <Carousel  {...options}>
                {slides}
            </Carousel>
        </div>

    );
}