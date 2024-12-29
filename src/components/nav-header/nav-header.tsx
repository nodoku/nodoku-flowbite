import React, {JSX} from "react";
import {NavHeaderTheme} from "./nav-header-theme";
import {defaultTheme} from "./nav-header-theme";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import Backgrounds = NodokuComponents.Backgrounds;
import {NavHeaderClientSide} from "./nav-header-client-side";
import {NdList} from "nodoku-core";
import {NdLink} from "nodoku-core";
import {NdTranslatableText} from "nodoku-core";
import {NdListItem} from "nodoku-core";
import {NdParagraph} from "nodoku-core";
import {NdTrustedHtml} from "nodoku-core";
import {extractValueFromText} from "nodoku-core";


type ClientSideComponentNameType =
    "flowbite/nav-header:language-switcher" |
    "flowbite/nav-header:user-account";

export async function NavHeaderImpl(props: NdSkinComponentProps<NavHeaderTheme, void>): Promise<JSX.Element> {

    const {
        rowIndex,
        componentIndex,
        content,
        theme,
        themes,
        lng,
        i18nextTrustedHtmlProvider,
        defaultThemeName,
        clientSideComponentProvider,
        imageProvider
    } = props;

    const clpv = (c: ClientSideComponentNameType): JSX.Element => {
        return clientSideComponentProvider(c)
    }

    // console.log("content card ", JSON.stringify(content));
    // console.log("visual card ", JSON.stringify(theme));

    let effectiveTheme: NavHeaderTheme = mergeTheme(theme, defaultTheme);
    if (themes.length > 0) {
        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme)
    }

    const block: NdContentBlock = content[0];

    const {t} = await i18nextTrustedHtmlProvider(lng);


    const backgrounds = await Backgrounds({
        lng: lng,
        defaultThemeName: defaultThemeName,
        bgColorStyle: effectiveTheme.bgColorStyle,
        bgImageStyle: effectiveTheme.bgImageStyle
    });


    const menuContent: NdList | undefined = block.paragraphs.find((p: NdParagraph) => p instanceof NdList)

    const menuItems = menuContent ? menuContent.items.map((m: NdListItem, itemIndex: number) => {

        if (m.subList && m.subList instanceof NdList && m.subList.items.length > 0) {

            const title = m.text instanceof NdTranslatableText ? m.text : (m.text.urlText ? m.text.urlText : m.text.url);

            return (
                <li>
                    <button  id={`dropdownNavbar-button-${itemIndex}`} data-dropdown-toggle={`dropdownNavbar-dropdown-${itemIndex}`}
                            className="dropdownNavbar-button flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        <span dangerouslySetInnerHTML={t(title)}/>
                        <svg
                            className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <div id={`dropdownNavbar-dropdown-${itemIndex}`}
                         className="dropdownNavbar-dropdown absolute z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400"
                            aria-labelledby="dropdownLargeButton">
                            {m.subList.items
                                .map((si: NdListItem) => drawListItem(si, t,
                                    "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"))}
                        </ul>
                    </div>
                </li>
            );


        } else {
            return drawListItem(m, t, "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent")
        }
    }) : [];

    let brand: NdContentBlock | undefined = undefined;
    const sections: NdContentBlock[] = [];
    for (const b of content) {
        if (b.title?.text && b.title.text === "{Brand}") {
            brand = b;
        } else {
            sections.push(b)
        }
    }
    const brandLogo: string = (brand && brand.images.length > 0) ? t(brand.images[0].url).__html as string : "icon:react-icons/ci:CiCircleMinus";
    const companyName: NdTranslatableText | undefined = brand?.paragraphs
        .find((p: NdParagraph) => (p instanceof NdTranslatableText) &&
            (p as NdTranslatableText).text.startsWith("{companyName}")) as NdTranslatableText | undefined;
    const companyNameText = extractValueFromText(companyName ? t(companyName) : undefined, "companyName");

    return (

        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <div className={"w-20"}>
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        {/*<img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>*/}
                        {await imageProvider({
                                url: brandLogo,
                                alt: (companyNameText?.__html as string) + "logo",
                                imageStyle: {
                                    base: "h-8", decoration: ""
                                }
                            }
                        )}
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" dangerouslySetInnerHTML={companyNameText} />
                    </a>
                </div>
                <div className="w-20 justify-end flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
                    {themeSwitcherButton()}
                    {clpv("flowbite/nav-header:language-switcher")}
                    {clpv("flowbite/nav-header:user-account")}
                    {hamburgerButton()}
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-main-menu">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {menuItems}
                    </ul>
                </div>
            </div>

            <NavHeaderClientSide />
        </nav>


    );

}

const themeSwitcherButton = function (): JSX.Element {
    return (
        <button id="theme-toggle" type="button"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            <svg id="theme-toggle-dark-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
        </button>
    );
}

const hamburgerButton = function (): JSX.Element {
    return (
        <button id={"hamburger-button"} data-collapse-toggle="navbar-main-menu" type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-main-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
    );
}

const drawListItem = function (m: NdListItem, t: (text: NdTranslatableText) => NdTrustedHtml, itemClassName: string): React.JSX.Element {
    if (m.text instanceof NdLink) {
        const link = m.text as NdLink;
        return (
            <li>
                <a href={t(link.url).__html as string}
                   className={itemClassName}
                   aria-current="page" dangerouslySetInnerHTML={link.urlText ? t(link.urlText) : t(link.url)}/>
            </li>
        )
    } else {
        const mText = m.text as NdTranslatableText;
        return (
            <li>
                    <span
                        className={itemClassName}
                        aria-current="page" dangerouslySetInnerHTML={t(mText)}/>
            </li>
        )
    }
}