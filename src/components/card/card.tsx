import React, {JSX} from "react";
import {CarouselProps} from "flowbite-react";
import {CardTheme} from "./card-theme";
import {NdSkinComponentProps, NdContentBlock, LbTranslatedText} from "nodoku-core";

export async function CardImpl(props: NdSkinComponentProps<CardTheme, CarouselProps>): Promise<JSX.Element> {

    const {content, theme, lng, i18nextProvider} = props;

    console.log("content card ", JSON.stringify(content));
    console.log("visual card ", JSON.stringify(theme));

    const block: NdContentBlock = content[0];
    const {url, alt} = block.images[0];

    const {t} = await i18nextProvider(lng);

    return (


        <div
            className={"w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative pb-10"}>
            <a href="#">
                <img className={"rounded-t-lg"} src={url && t(url.key, url.ns)} alt={alt && t(alt.key, alt.ns)}/>
            </a>
            <div className="p-5">
                {block.title && <a href="#">
                    <h5 className={"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"}>
                        {block.title && t(block.title.key, block.title.ns)}
                    </h5>
                </a>}
                {block.subTitle && <h6 className={"mb-2 text-xl tracking-tight text-gray-900 dark:text-white"}>
                    {block.subTitle && t(block.subTitle.key, block.subTitle.ns)}
                </h6>}

                {block.paragraphs.map((p: LbTranslatedText, ip: number) => {
                    return (
                        <p key={ip} className={"mb-3 font-normal text-gray-700 dark:text-gray-400"}>
                            {p && t(p.key, p.ns)}
                        </p>
                    )
                })}
            </div>

            <div className={"absolute bottom-0 p-5"}>
                <a href="#"
                   className={"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>
                    {block.footer && t(block.footer.key, block.footer.ns)}
                    <svg className={"rtl:rotate-180 w-3.5 h-3.5 ms-2"} aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>

        </div>

    );

}