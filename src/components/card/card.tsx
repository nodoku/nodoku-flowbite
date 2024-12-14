import React, {JSX} from "react";
import {CardTheme} from "./card-theme";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import Paragraphs = NodokuComponents.Paragraphs;
import Backgrounds = NodokuComponents.Backgrounds;
import {ts, tsi} from "nodoku-core";
import paragraphDefaultTheme = NodokuComponents.paragraphDefaultTheme;
import highlightedCodeDefaultTheme = NodokuComponents.highlightedCodeDefaultTheme;
import listCompDefaultTheme = NodokuComponents.listCompDefaultTheme;
import {NdCallToAction} from "nodoku-core";
import {defaultTheme} from "./card-theme";


export async function CardImpl(props: NdSkinComponentProps<CardTheme, void>): Promise<JSX.Element> {

    const {
        rowIndex,
        componentIndex,
        content,
        theme,
        themes,
        lng,
        i18nextTrustedHtmlProvider,
        imageProvider,
        defaultThemeName
    } = props;

    // console.log("content card ", JSON.stringify(content));
    // console.log("visual card theme", JSON.stringify(theme));
    // console.log("visual card themess", JSON.stringify(themes));


    let effectiveTheme: CardTheme = mergeTheme(theme, defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];
    const {url, alt} = block.images[0];

    const {t} = await i18nextTrustedHtmlProvider(lng);

    const paragraphs: JSX.Element = await Paragraphs({
        lng: lng,
        blockParagraphs: block.paragraphs,
        paragraphTheme: effectiveTheme.paragraphStyle || paragraphDefaultTheme,
        codeHighlightTheme: effectiveTheme.codeHighlightTheme || highlightedCodeDefaultTheme,
        listTheme: effectiveTheme.listTheme || listCompDefaultTheme,
        defaultThemeName: defaultThemeName,
        i18nextTrustedHtmlProvider: i18nextTrustedHtmlProvider
    })

    const backgrounds: JSX.Element = await Backgrounds({
        lng: lng,
        defaultThemeName: defaultThemeName,
        bgColorStyle: effectiveTheme.bgColorStyle,
        bgImageStyle: effectiveTheme.bgImageStyle
    });

    return (

        <div key={`card-${rowIndex}-${componentIndex}`} className={`relative ${ts(effectiveTheme, "containerStyle")}`}>

            {backgrounds}

            {url &&
                <div className={`${ts(effectiveTheme, "imageContainerStyle")}`}>
                    {await imageProvider({url: t(url).__html as string, alt: alt && t(alt).__html as string, imageStyle: effectiveTheme.imageStyle })}
                </div>
            }
            <div className={`${ts(effectiveTheme, "innerContainerStyle")}`}>

                {block.title &&
                    <a href="#">
                        <h3 className={`${ts(effectiveTheme, "titleStyle")}`}
                             dangerouslySetInnerHTML={t(block.title)} />
                    </a>
                }
                {block.subTitle &&
                    <h4 className={`${ts(effectiveTheme, "subTitleStyle")}`}
                        dangerouslySetInnerHTML={t(block.subTitle)} />
                }

                {paragraphs}

            </div>

            <div className={`${ts(effectiveTheme, "ctaContainerStyle")}`}>
                {block.callToActions.map((cta: NdCallToAction, i) => (

                        <a key={`horizontal-card-${rowIndex}-${componentIndex}-cta-${i}`} href={t(cta.ctaUrl).__html as string} className={`${tsi(effectiveTheme, "ctaButtonStyle", i)}`}>
                            <span dangerouslySetInnerHTML={t(cta.ctaTitle || cta.ctaUrl)} />
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

}