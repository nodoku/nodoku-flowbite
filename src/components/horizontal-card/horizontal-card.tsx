import React, {JSX} from "react";
import {HorizontalCardTheme} from "./horizontal-card-theme";
import {NdCode, NdContentBlock, NdList, NdSkinComponentProps, NdTranslatedText} from "nodoku-core";
import {mergeTheme} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import HighlightedCode = NodokuComponents.HighlightedCode;
import ListComp = NodokuComponents.ListComp;

export async function HorizontalCardImpl(props: NdSkinComponentProps<HorizontalCardTheme, void>): Promise<JSX.Element> {


    const {componentIndex, content, theme, themes, lng, i18nextProvider, defaultThemeName} = props;

    // console.log("content card ", JSON.stringify(content));
    // console.log("visual card ", JSON.stringify(theme));

    let effectiveTheme: HorizontalCardTheme = mergeTheme(theme, HorizontalCardTheme.defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];
    const {url, alt} = block.images[0];

    const {t} = await i18nextProvider(lng);

    var style: React.CSSProperties = block.bgImage ? {
        backgroundImage: `url(${t(block.bgImage.url.key, block.bgImage?.url?.ns)})`
    } : {};

    const absZero = "absolute top-0 left-0 right-0 bottom-0";

    return (


        <div className={`relative ${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveTheme.bgImageStyle?.base} ${effectiveTheme.bgImageStyle?.decoration}`} style={style}></div>
            <div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveTheme.bgColorStyle?.base} ${effectiveTheme.bgColorStyle?.decoration}`}></div>

            <img className={`${effectiveTheme.imageStyle?.base} ${effectiveTheme.imageStyle?.decoration}`}
                 src={t(url.key, url.ns)} alt={alt && t(alt.key, alt.ns)}></img>

            <div className={`${effectiveTheme.innerContainerStyle?.base} ${effectiveTheme.innerContainerStyle?.decoration}`}>
                {block.title &&
                    <h5 className={`${effectiveTheme.titleStyle?.base} ${effectiveTheme.titleStyle?.decoration}`}>
                        {block.title && t(block.title.key, block.title.ns)}
                    </h5>
                }
                {block.subTitle &&
                    <h6 className={`${effectiveTheme.subTitleStyle?.base} ${effectiveTheme.subTitleStyle?.decoration}`}>
                        {block.subTitle && t(block.subTitle.key, block.subTitle.ns)}
                    </h6>
                }

                {await Promise.all(block.paragraphs.map(async (p: NdTranslatedText | NdList | NdCode, ip: number) => {
                    if (p instanceof NdTranslatedText) {
                        return (
                            <p className={`${effectiveTheme.paragraphStyle?.base} ${effectiveTheme.paragraphStyle?.decoration}`}>
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