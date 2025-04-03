var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from "react";
import { defaultTheme } from "./nav-header-theme";
import { mergeTheme } from "nodoku-core";
import { NavHeaderClientSide } from "./nav-header-client-side";
import { NdList } from "nodoku-core";
// import {NdLink} from "nodoku-core";
import { NdTranslatableText } from "nodoku-core";
import { extractValueFromText } from "nodoku-core";
import { ts } from "nodoku-core";
export function NavHeaderImpl(props) {
    return __awaiter(this, void 0, void 0, function () {
        var rowIndex, componentIndex, content, theme, themes, lng, i18nextTrustedHtmlProvider, defaultThemeName, clientSideComponentProvider, imageProvider, clpv, effectiveTheme, block, t, randomSuffix, mainMenuId, themeSwitchBtnId, menuContent, menuItems, brand, _i, content_1, b, brandLogo, companyName, companyNameText;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rowIndex = props.rowIndex, componentIndex = props.componentIndex, content = props.content, theme = props.theme, themes = props.themes, lng = props.lng, i18nextTrustedHtmlProvider = props.i18nextTrustedHtmlProvider, defaultThemeName = props.defaultThemeName, clientSideComponentProvider = props.clientSideComponentProvider, imageProvider = props.imageProvider;
                    clpv = function (c) {
                        return clientSideComponentProvider(c);
                    };
                    effectiveTheme = mergeTheme(theme, defaultTheme);
                    if (themes.length > 0) {
                        effectiveTheme = mergeTheme(themes[componentIndex % themes.length], effectiveTheme);
                    }
                    block = content[0];
                    return [4 /*yield*/, i18nextTrustedHtmlProvider(lng)];
                case 1:
                    t = (_b.sent()).t;
                    randomSuffix = Math.random().toString(36).substring(2, 9);
                    mainMenuId = "navbar-main-menu-" + randomSuffix;
                    themeSwitchBtnId = "theme-toggle-" + randomSuffix;
                    menuContent = block.paragraphs.find(function (p) { return p instanceof NdList; });
                    menuItems = menuContent ? menuContent.items.map(function (m, itemIndex) {
                        var title = /*m.text instanceof NdTranslatableText ? */ m.text /* : (m.text.urlText ? m.text.urlText : m.text.url)*/;
                        var key = /*m.text instanceof NdTranslatableText ? */ m.text.key /* : m.text.url.text*/;
                        if (m.subList && m.subList instanceof NdList && m.subList.items.length > 0) {
                            return (<li key={key} className={"key-".concat(key)}>
                    <button id={"btn-".concat(mainMenuId, "-dropdown-").concat(itemIndex)} data-collapse-toggle={"".concat(mainMenuId, "-dropdown-").concat(itemIndex)} className="dropdownNavbar-button flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        <span dangerouslySetInnerHTML={t(title)}/>
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <div id={"".concat(mainMenuId, "-dropdown-").concat(itemIndex)} className={"dropdownNavbar-dropdown ".concat(ts(effectiveTheme, "mainMenuDropdownContainer"))}>
                        <ul className={ts(effectiveTheme, "mainMenuDropdownList")} aria-labelledby="dropdownLargeButton">
                            {m.subList.items
                                    .map(function (si, ii) { return drawListItem(si, t, ts(effectiveTheme, "mainMenuSecondLevelItemStyle"), "".concat(key, "-sublist-").concat(ii)); })}
                        </ul>
                    </div>
                </li>);
                        }
                        else {
                            return drawListItem(m, t, ts(effectiveTheme, "mainMenuFirstLevelItemStyle"), key);
                        }
                    }) : [];
                    brand = undefined;
                    // const sections: NdContentBlock[] = [];
                    for (_i = 0, content_1 = content; _i < content_1.length; _i++) {
                        b = content_1[_i];
                        if (((_a = b.title) === null || _a === void 0 ? void 0 : _a.text) && b.title.text === "{Brand}") {
                            brand = b;
                        } /*else {
                            sections.push(b)
                        }*/
                    }
                    brandLogo = (brand && brand.images.length > 0) ? t(brand.images[0].url).__html : "icon:nd-react-icons/ci:CiCircleMinus";
                    companyName = brand === null || brand === void 0 ? void 0 : brand.paragraphs.find(function (p) { return (p instanceof NdTranslatableText) &&
                        p.text.startsWith("{companyName}"); });
                    companyNameText = extractValueFromText(companyName ? t(companyName) : undefined, "companyName");
                    return [4 /*yield*/, imageProvider({
                            url: brandLogo,
                            alt: (companyNameText === null || companyNameText === void 0 ? void 0 : companyNameText.__html) + "logo",
                            imageStyle: effectiveTheme.logoImageStyle
                        })];
                case 2: return [2 /*return*/, (<nav className={"".concat(effectiveTheme.className, " ").concat(ts(effectiveTheme, "navStyle"))}>
            <div className={"relative ".concat(ts(effectiveTheme, "navInnerContainer"))}>
                <div className={ts(effectiveTheme, "logoBlockStyle")}>
                    <a href="https://nodoku.io/" className={ts(effectiveTheme, "logoLinkStyle")}>
                        {_b.sent()}
                        <span className={ts(effectiveTheme, "logoCompanyNameStyle")} dangerouslySetInnerHTML={companyNameText}/>
                    </a>
                </div>
                <div className={ts(effectiveTheme, "rightButtonsBlock")}>
                    {themeSwitcherButton(themeSwitchBtnId)}
                    {clpv("flowbite/nav-header:language-switcher")}
                    {clpv("flowbite/nav-header:user-account")}
                    {hamburgerButton(mainMenuId)}
                </div>
                <div className={"hidden absolute md:static top-16 right-0 z-20 ".concat(ts(effectiveTheme, "mainMenuBlock"))} id={mainMenuId}>
                    <ul className={ts(effectiveTheme, "mainMenuListStyle")}>
                        {menuItems}
                    </ul>
                </div>
            </div>

            <NavHeaderClientSide themeSwitchBtnId={themeSwitchBtnId}/>
        </nav>)];
            }
        });
    });
}
var themeSwitcherButton = function (themeSwitchBtnId) {
    return (<button id={themeSwitchBtnId} type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            <svg className="theme-toggle-dark-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg className="theme-toggle-light-icon hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
        </button>);
};
var hamburgerButton = function (mainMenuId) {
    return (<button id={"btn-".concat(mainMenuId)} data-collapse-toggle={mainMenuId} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls={mainMenuId} aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>);
};
var drawListItem = function (m, t, itemClassName, key) {
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
    var mText = m.text;
    return (<li key={key}>
                <span className={itemClassName} aria-current="page" dangerouslySetInnerHTML={t(mText)}/>
            </li>);
    // }
};
//# sourceMappingURL=nav-header.jsx.map