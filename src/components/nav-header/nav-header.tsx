import React, {JSX} from "react";
import {NavHeaderTheme} from "./nav-header-theme";
import {defaultTheme} from "./nav-header-theme";
import {mergeTheme, NdContentBlock, NdSkinComponentProps} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import Backgrounds = NodokuComponents.Backgrounds;
import {NavHeaderClientSide} from "./nav-header-client-side";
import {NdList} from "nodoku-core";
// import {NdLink} from "nodoku-core";
import {NdTranslatableText} from "nodoku-core";
import {NdListItem} from "nodoku-core";
import {NdParagraph} from "nodoku-core";
import {NdTrustedHtml} from "nodoku-core";
import {extractValueFromText} from "nodoku-core";
import {ts} from "nodoku-core";


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

    const randomSuffix: string = Math.random().toString(36).substring(2, 9);
    const mainMenuId: string = "navbar-main-menu-" + randomSuffix;
    const themeSwitchBtnId = "theme-toggle-" + randomSuffix;

    const menuContent: NdList | undefined = block.paragraphs.find((p: NdParagraph) => p instanceof NdList)

    const menuItems = menuContent ? menuContent.items.map((m: NdListItem, itemIndex: number) => {

        const title = /*m.text instanceof NdTranslatableText ? */m.text/* : (m.text.urlText ? m.text.urlText : m.text.url)*/;
        const key = /*m.text instanceof NdTranslatableText ? */m.text.key/* : m.text.url.text*/;

        if (m.subList && m.subList instanceof NdList && m.subList.items.length > 0) {


            return (
                <li key={key} className={`key-${key}`}>
                    <button  id={`btn-${mainMenuId}-dropdown-${itemIndex}`} data-collapse-toggle={`${mainMenuId}-dropdown-${itemIndex}`}
                            className="dropdownNavbar-button flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        <span dangerouslySetInnerHTML={t(title)}/>
                        <svg
                            className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <div id={`${mainMenuId}-dropdown-${itemIndex}`}
                         className={`dropdownNavbar-dropdown ${ts(effectiveTheme, "mainMenuDropdownContainer")}`}>
                        <ul className={ts(effectiveTheme, "mainMenuDropdownList")}
                            aria-labelledby="dropdownLargeButton">
                            {m.subList.items
                                .map((si: NdListItem, ii: number) => drawListItem(si, t, ts(effectiveTheme, "mainMenuSecondLevelItemStyle"), `${key}-sublist-${ii}`))}
                        </ul>
                    </div>
                </li>
            );


        } else {
            return drawListItem(m, t, ts(effectiveTheme, "mainMenuFirstLevelItemStyle"), key)
        }
    }) : [];

    let brand: NdContentBlock | undefined = undefined;
    // const sections: NdContentBlock[] = [];
    for (const b of content) {
        if (b.title?.text && b.title.text === "{Brand}") {
            brand = b;
        } /*else {
            sections.push(b)
        }*/
    }
    const brandLogo: string = (brand && brand.images.length > 0) ? t(brand.images[0].url).__html as string : "icon:nd-react-icons/ci:CiCircleMinus";
    const companyName: NdTranslatableText | undefined = brand?.paragraphs
        .find((p: NdParagraph) => (p instanceof NdTranslatableText) &&
            (p as NdTranslatableText).text.startsWith("{companyName}")) as NdTranslatableText | undefined;
    const companyNameText: NdTrustedHtml | undefined = extractValueFromText(companyName ? t(companyName) : undefined, "companyName");


    return (

        <nav className={`${effectiveTheme.className} ${ts(effectiveTheme, "navStyle")}`}>
            <div className={`relative ${ts(effectiveTheme, "navInnerContainer")}`}>
                <div className={ts(effectiveTheme, "logoBlockStyle")}>
                    <a href="https://nodoku.io/" className={ts(effectiveTheme, "logoLinkStyle")}>
                        {await imageProvider({
                                url: brandLogo,
                                alt: (companyNameText?.__html as string) + "logo",
                                imageStyle: effectiveTheme.logoImageStyle
                            }
                        )}
                        <span className={ts(effectiveTheme, "logoCompanyNameStyle")} dangerouslySetInnerHTML={companyNameText} />
                    </a>
                </div>
                <div className={ts(effectiveTheme, "rightButtonsBlock")}>
                    {themeSwitcherButton(themeSwitchBtnId)}
                    {clpv("flowbite/nav-header:language-switcher")}
                    {clpv("flowbite/nav-header:user-account")}
                    {hamburgerButton(mainMenuId)}
                </div>
                <div className={`hidden absolute md:static top-16 right-0 z-20 ${ts(effectiveTheme, "mainMenuBlock")}`} id={mainMenuId}>
                    <ul className={ts(effectiveTheme, "mainMenuListStyle")}>
                        {menuItems}
                    </ul>
                </div>
            </div>

            <NavHeaderClientSide themeSwitchBtnId={themeSwitchBtnId}/>
        </nav>


    );

}

const themeSwitcherButton = function(themeSwitchBtnId: string): JSX.Element {
    return (
        <button id={themeSwitchBtnId} type="button"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            <svg className="theme-toggle-dark-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg className="theme-toggle-light-icon hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
        </button>
    );
}

const hamburgerButton = function(mainMenuId: string): JSX.Element {
    return (
        <button id={`btn-${mainMenuId}`} data-collapse-toggle={mainMenuId} type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls={mainMenuId} aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
    );
}

const drawListItem = function (m: NdListItem, t: (text: NdTranslatableText) => NdTrustedHtml, itemClassName: string, key: string): React.JSX.Element {
    // if (m.text instanceof NdLink) {
    //     const link = m.text as NdLink;
    //     return (
    //         <li key={link.url.key} className={`key-${link.url.key}`}>
    //             <a href={t(link.url).__html as string}
    //                className={itemClassName}
    //                aria-current="page" dangerouslySetInnerHTML={link.urlText ? t(link.urlText) : t(link.url)}/>
    //         </li>
    //     )
    // } else {
        const mText: NdTranslatableText = m.text as NdTranslatableText;
        return (
            <li key={key}>
                <span className={itemClassName} aria-current="page" dangerouslySetInnerHTML={t(mText)}/>
            </li>
        )
    // }
}