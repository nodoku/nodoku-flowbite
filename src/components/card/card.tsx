import React, {JSX} from "react";
import {CardTheme} from "./card-theme";
import {NdCode, NdContentBlock, NdList, NdSkinComponentProps, NdTranslatedText} from "nodoku-core";
import {mergeTheme} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import HighlightedCode = NodokuComponents.HighlightedCode;
import ListComp = NodokuComponents.ListComp;
import Paragraphs = NodokuComponents.Paragraphs;

export async function CardImpl(props: NdSkinComponentProps<CardTheme, void>): Promise<JSX.Element> {

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
    // console.log("visual card theme", JSON.stringify(theme));
    // console.log("visual card themess", JSON.stringify(themes));


    let effectiveTheme: CardTheme = mergeTheme(theme, CardTheme.defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];
    const {url, alt} = block.images[0];

    const {t} = await i18nextProvider(lng);

    var style: React.CSSProperties = block.bgImageUrl ? {
        backgroundImage: `url(${await imageUrlProvider(t(block.bgImageUrl.key, block.bgImageUrl.ns))})`
    } : {};

    const absZero = "absolute top-0 left-0 right-0 bottom-0";

    return (

        <div className={`relative ${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>
            <div className={`${absZero} ${effectiveTheme.bgImageStyle?.base} ${effectiveTheme.bgImageStyle?.decoration}`} style={style}></div>
            <div className={`${absZero} ${effectiveTheme.bgColorStyle?.base} ${effectiveTheme.bgColorStyle?.decoration}`}></div>

            {url &&
                <a href="#" className={"inline-block"}>
                    <img className={`${effectiveTheme.imageStyle?.base} ${effectiveTheme.imageStyle?.decoration}`}
                         src={await imageUrlProvider(t(url.key, url.ns))} alt={alt && t(alt.key, alt.ns)}/>
                </a>
            }
            <div className={`${effectiveTheme.innerContainerStyle?.base} ${effectiveTheme.innerContainerStyle?.decoration}`}>
                {block.title &&
                    <a href="#">
                        <h3 className={`${effectiveTheme.titleStyle?.base} ${effectiveTheme.titleStyle?.decoration}`}
                             dangerouslySetInnerHTML={{__html: t(block.title.key, block.title.ns)}} />
                    </a>
                }
                {block.subTitle &&
                    <h4 className={`${effectiveTheme.subTitleStyle?.base} ${effectiveTheme.subTitleStyle?.decoration}`}
                        dangerouslySetInnerHTML={{__html: t(block.subTitle.key, block.subTitle.ns)}} />
                }

                {await Paragraphs({
                    lng: lng,
                    blockParagraphs: block.paragraphs,
                    paragraphStyle: effectiveTheme.paragraphStyle,
                    codeHighlightTheme: effectiveTheme.codeHighlightTheme!,
                    listTheme: effectiveTheme.listTheme!,
                    defaultThemeName: defaultThemeName,
                    i18nextProvider: i18nextProvider
                })}
            </div>

            {block.footer &&
                <div className={`${effectiveTheme.footerContainerStyle?.base} ${effectiveTheme.footerContainerStyle?.decoration}`}>

                    <a href="#"
                       className={`${effectiveTheme.footerButtonStyle?.base} ${effectiveTheme.footerButtonStyle?.decoration}`}>
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

}