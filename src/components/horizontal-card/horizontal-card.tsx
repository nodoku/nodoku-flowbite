import React, {JSX} from "react";
import {HorizontalCardTheme} from "./horizontal-card-theme";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import Paragraphs = NodokuComponents.Paragraphs;
import Backgrounds = NodokuComponents.Backgrounds;

export async function HorizontalCardImpl(props: NdSkinComponentProps<HorizontalCardTheme, void>): Promise<JSX.Element> {


    const {
        componentIndex,
        content,
        theme,
        themes,
        lng,
        i18nextProvider,
        imageUrlProvider,
        defaultThemeName
    } = props;

    // console.log("content card ", JSON.stringify(content));
    // console.log("visual card ", JSON.stringify(theme));

    let effectiveTheme: HorizontalCardTheme = mergeTheme(theme, HorizontalCardTheme.defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];
    const {url, alt} = block.images[0];

    const {t} = await i18nextProvider(lng);

    // console.log("in horizontal card: ", JSON.stringify(await imageUrlProvider(t(url.key, url.ns))))

    const imgUrl = await imageUrlProvider(t(url))

    const paragraphs = await Paragraphs({
        lng: lng,
        blockParagraphs: block.paragraphs,
        paragraphStyle: effectiveTheme.paragraphStyle,
        codeHighlightTheme: effectiveTheme.codeHighlightTheme!,
        listTheme: effectiveTheme.listTheme!,
        defaultThemeName: defaultThemeName,
        i18nextProvider: i18nextProvider
    })

    const backgrounds = await Backgrounds({
        lng: lng,
        defaultThemeName: defaultThemeName,
        bgColorStyle: effectiveTheme.bgColorStyle,
        bgImageStyle: effectiveTheme.bgImageStyle,
        i18nextProvider: i18nextProvider,
        bgImageUrl: block.bgImageUrl,
        imageUrlProvider: imageUrlProvider
    });

    return (

        <div className={`relative ${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>

            {backgrounds}

            <img className={`${effectiveTheme.imageStyle?.base} ${effectiveTheme.imageStyle?.decoration}`}
                 src={imgUrl} alt={alt && t(alt)}></img>

            <div className={`${effectiveTheme.innerContainerStyle?.base} ${effectiveTheme.innerContainerStyle?.decoration}`}>

                {block.title &&
                    <h5 className={`${effectiveTheme.titleStyle?.base} ${effectiveTheme.titleStyle?.decoration}`}
                        dangerouslySetInnerHTML={{__html: t(block.title)}} />
                }
                {block.subTitle &&
                    <h6 className={`${effectiveTheme.subTitleStyle?.base} ${effectiveTheme.subTitleStyle?.decoration}`}
                        dangerouslySetInnerHTML={{__html: t(block.subTitle)}} />
                }

                {paragraphs}

            </div>

            {block.footer &&
                <div className={`${effectiveTheme.footerContainerStyle?.base} ${effectiveTheme.footerContainerStyle?.decoration}`}>

                    <a href="#"
                       className={`${effectiveTheme.footerButtonStyle?.base} ${effectiveTheme.footerButtonStyle?.decoration}`}>
                        {t(block.footer)}
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

}