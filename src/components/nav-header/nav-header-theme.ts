import {ThemeStyle} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";

export type NavHeaderTheme = {

    className?: string;
    bgImageStyle?: ThemeStyle;
    bgColorStyle?: ThemeStyle;
    containerStyle?: ThemeStyle;
    titleStyle?: ThemeStyle;
    subTitleStyle?: ThemeStyle;

}

export const defaultTheme: NavHeaderTheme = { }

// export default JumbotronTheme.defaultTheme;