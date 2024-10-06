import React, {JSX} from "react";
import {JumbotronTheme} from "./jumbotron-theme";
import {NdCode, NdContentBlock, NdList, NdSkinComponentProps, NdTranslatedText} from "nodoku-core";
import {mergeTheme} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import ListComp = NodokuComponents.ListComp;
import HighlightedCode = NodokuComponents.HighlightedCode;
import Paragraphs = NodokuComponents.Paragraphs;
import Backgrounds = NodokuComponents.Backgrounds;


export async function JumbotronImpl(props: NdSkinComponentProps<JumbotronTheme, void>): Promise<JSX.Element> {

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

    let effectiveTheme: JumbotronTheme = mergeTheme(theme, JumbotronTheme.defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];

    const {t} = await i18nextProvider(lng);

    // var style: React.CSSProperties = block.bgImageUrl ? {
    //     backgroundImage: `url(${await imageUrlProvider(t(block.bgImageUrl.key, block.bgImageUrl.ns))})`
    // } : (block.images && block.images.length > 0 ? {
    //     backgroundImage: `url(${await imageUrlProvider(t(block.images[0].url.key, block.images[0].url?.ns))})`
    // }: {});

    // console.log("effective theme", effectiveTheme)


    const paragraphs = await Paragraphs({
        lng: lng,
        blockParagraphs: block.paragraphs,
        paragraphStyle: effectiveTheme.paragraphStyle,
        codeHighlightTheme: effectiveTheme.codeHighlightTheme!,
        listTheme: effectiveTheme.listTheme!,
        defaultThemeName: defaultThemeName,
        i18nextProvider: i18nextProvider
    });

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
        <section className={`relative ${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>
            {/*<div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveTheme.bgImageStyle?.base} ${effectiveTheme.bgImageStyle?.decoration}`} style={style}></div>*/}
            {/*<div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveTheme.bgColorStyle?.base} ${effectiveTheme.bgColorStyle?.decoration}`}></div>*/}

            {backgrounds}

            {/*<div className={`${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>*/}
                {block.title &&
                    <h1 className={`${effectiveTheme.titleStyle?.base} ${effectiveTheme.titleStyle?.decoration}`}
                        dangerouslySetInnerHTML={{__html: t(block.title.key, block.title.ns)}} />
                }
                {block.subTitle &&
                    <h2 className={`${effectiveTheme.subTitleStyle?.base} ${effectiveTheme.subTitleStyle?.decoration}`}
                        dangerouslySetInnerHTML={{__html: t(block.subTitle.key, block.subTitle.ns)}} />
                }

                {paragraphs}

                {block.footer &&
                    <div>
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        {t(block.footer.key, block.footer.ns)}
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    </div>
                }
            {/*</div>*/}
        </section>

    );

    // return (
    //
    //
    //     // <div className={`${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>
    //         <div className={`${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>
    //             <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We
    //                 invest in the world’s potential</h1>
    //             <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here
    //                 at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value
    //                 and drive economic growth.</p>
    //             <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
    //                 <a href="#"
    //                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
    //                     Get started
    //                     <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
    //                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                               d="M1 5h12m0 0L9 1m4 4L9 9"/>
    //                     </svg>
    //                 </a>
    //                 <a href="#"
    //                    className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70">
    //                     Learn more
    //                 </a>
    //             </div>
    //         </div>
    //     // </div>
    //
    // )

}