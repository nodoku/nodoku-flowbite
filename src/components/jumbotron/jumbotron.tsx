import React, {JSX} from "react";
import {JumbotronTheme} from "./jumbotron-theme";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import Paragraphs = NodokuComponents.Paragraphs;
import Backgrounds = NodokuComponents.Backgrounds;
import {ts} from "nodoku-core";
import paragraphDefaultTheme = NodokuComponents.paragraphDefaultTheme;
import highlightedCodeDefaultTheme = NodokuComponents.highlightedCodeDefaultTheme;
import listCompDefaultTheme = NodokuComponents.listCompDefaultTheme;


export async function JumbotronImpl(props: NdSkinComponentProps<JumbotronTheme, void>): Promise<JSX.Element> {

    const {
        componentIndex,
        content,
        theme,
        themes,
        lng,
        i18nextProvider,
        // imageProvider,
        defaultThemeName
    } = props;

    // console.log("content card ", JSON.stringify(content));
    // console.log("visual card ", JSON.stringify(theme));

    let effectiveTheme: JumbotronTheme = mergeTheme(theme, JumbotronTheme.defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];

    const {t} = await i18nextProvider(lng);

    const paragraphs = await Paragraphs({
        lng: lng,
        blockParagraphs: block.paragraphs,
        paragraphTheme: effectiveTheme.paragraphStyle || paragraphDefaultTheme,
        codeHighlightTheme: effectiveTheme.codeHighlightTheme || highlightedCodeDefaultTheme,
        listTheme: effectiveTheme.listTheme || listCompDefaultTheme,
        defaultThemeName: defaultThemeName,
        i18nextProvider: i18nextProvider
    });

    const backgrounds = await Backgrounds({
        lng: lng,
        defaultThemeName: defaultThemeName,
        bgColorStyle: effectiveTheme.bgColorStyle,
        bgImageStyle: effectiveTheme.bgImageStyle,
        i18nextProvider: i18nextProvider,
        // bgImageUrl: block.bgImageUrl,
        // imageUrlProvider: imageUrlProvider
    });

    return (
        <section className={`relative ${ts(effectiveTheme, "containerStyle")} ${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>

            {backgrounds}

            {block.title &&
                <h1 className={`${ts(effectiveTheme, "titleStyle")} ${effectiveTheme.titleStyle?.base} ${effectiveTheme.titleStyle?.decoration}`}
                    dangerouslySetInnerHTML={{__html: t(block.title)}} />
            }
            {block.subTitle &&
                <h2 className={`${ts(effectiveTheme, "subTitleStyle")} ${effectiveTheme.subTitleStyle?.base} ${effectiveTheme.subTitleStyle?.decoration}`}
                    dangerouslySetInnerHTML={{__html: t(block.subTitle)}} />
            }

            {paragraphs}

            {block.footer &&
                <div>
                    <a href="#"
                       className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        <span dangerouslySetInnerHTML={{__html: t(block.footer)}}/>
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            }

        </section>

    );

}