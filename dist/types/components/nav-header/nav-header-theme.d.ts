import { ThemeStyle } from "nodoku-core";
export type NavHeaderTheme = {
    className?: string;
    bgImageStyle?: ThemeStyle;
    bgColorStyle?: ThemeStyle;
    containerStyle?: ThemeStyle;
    titleStyle?: ThemeStyle;
    subTitleStyle?: ThemeStyle;
};
export declare const defaultTheme: NavHeaderTheme;
