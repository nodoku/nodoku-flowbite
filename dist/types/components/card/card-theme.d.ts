import { ThemeStyle } from "nodoku-core";
import { NodokuComponents } from "nodoku-components";
import HighlightedCodeTheme = NodokuComponents.HighlightedCodeTheme;
import ListCompTheme = NodokuComponents.ListCompTheme;
import { ImageStyle } from "nodoku-core";
import ParagraphTheme = NodokuComponents.ParagraphTheme;
export declare class CardTheme {
    className?: string;
    containerStyle?: ThemeStyle;
    imageContainerStyle?: ThemeStyle;
    bgImageStyle?: ThemeStyle;
    bgColorStyle?: ThemeStyle;
    imageStyle?: ImageStyle;
    innerContainerStyle?: ThemeStyle;
    titleStyle?: ThemeStyle;
    subTitleStyle?: ThemeStyle;
    paragraphStyle?: ParagraphTheme;
    footerContainerStyle?: ThemeStyle;
    footerButtonStyle?: ThemeStyle;
    codeHighlightTheme?: HighlightedCodeTheme;
    listTheme?: ListCompTheme;
    static defaultTheme: CardTheme;
}
declare const _default: CardTheme;
export default _default;
