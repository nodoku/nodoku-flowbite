import { ThemeStyle } from "nodoku-core";
export type NavHeaderOptions = {
    showThemeSwitcher?: boolean;
};
export type NavHeaderTheme = {
    className?: string;
    navStyle?: ThemeStyle;
    navInnerContainer?: ThemeStyle;
    logoBlockStyle?: ThemeStyle;
    logoLinkStyle?: ThemeStyle;
    logoImageStyle?: ThemeStyle;
    logoCompanyNameStyle?: ThemeStyle;
    rightButtonsBlock?: ThemeStyle;
    mainMenuBlock?: ThemeStyle;
    mainMenuListStyle?: ThemeStyle;
    mainMenuFirstLevelItemStyle?: ThemeStyle;
    mainMenuSecondLevelItemStyle?: ThemeStyle;
    mainMenuDropdownContainer?: ThemeStyle;
    mainMenuDropdownList?: ThemeStyle;
};
export declare const defaultTheme: NavHeaderTheme;
export declare const defaultOptions: NavHeaderOptions;
