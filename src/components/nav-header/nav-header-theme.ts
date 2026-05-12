import {ThemeStyle} from "nodoku-core";

export type NavHeaderOptions = {
    showThemeSwitcher?: boolean;
}

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
}

export const defaultTheme: NavHeaderTheme = { }

export const defaultOptions: NavHeaderOptions = {
    showThemeSwitcher: true
}
