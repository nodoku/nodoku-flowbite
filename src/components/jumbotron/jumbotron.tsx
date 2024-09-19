import React, {JSX} from "react";
import {JumbotronTheme} from "./jumbotron-theme";
import {NdCode, NdContentBlock, NdList, NdSkinComponentProps, NdTranslatedText} from "nodoku-core";
import {mergeTheme} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import ListComp = NodokuComponents.ListComp;
import HighlightedCode = NodokuComponents.HighlightedCode;


export async function JumbotronImpl(props: NdSkinComponentProps<JumbotronTheme, void>): Promise<JSX.Element> {

    const {componentIndex, content, theme, themes, lng, i18nextProvider, defaultThemeName} = props;

    // console.log("content card ", JSON.stringify(content));
    // console.log("visual card ", JSON.stringify(theme));

    let effectiveTheme: JumbotronTheme = mergeTheme(theme, JumbotronTheme.defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];

    const {t} = await i18nextProvider(lng);

    var style: React.CSSProperties = block.bgImage ? {
        backgroundImage: `url(${t(block.bgImage.url.key, block.bgImage?.url?.ns)})`
    } : {};

    // console.log("effective theme", effectiveTheme)

    return (
        <section className={`relative ${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveTheme.bgImageStyle?.base} ${effectiveTheme.bgImageStyle?.decoration}`} style={style}></div>
            <div className={`absolute top-0 left-0 right-0 bottom-0 ${effectiveTheme.bgColorStyle?.base} ${effectiveTheme.bgColorStyle?.decoration}`}></div>

            {/*<div className={`${effectiveTheme.containerStyle?.base} ${effectiveTheme.containerStyle?.decoration}`}>*/}
                {block.title &&
                    <h1 className={`${effectiveTheme.titleStyle?.base} ${effectiveTheme.titleStyle?.decoration}`}>
                        {t(block.title.key, block.title.ns)}
                    </h1>
                }
                {block.subTitle &&
                    <p className={`${effectiveTheme.subTitleStyle?.base} ${effectiveTheme.subTitleStyle?.decoration}`}>
                        {t(block.subTitle.key, block.subTitle.ns)}
                    </p>
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