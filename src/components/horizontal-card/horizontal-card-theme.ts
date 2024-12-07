import {ThemeStyle} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import HighlightedCodeTheme = NodokuComponents.HighlightedCodeTheme;
import ListCompTheme = NodokuComponents.ListCompTheme;
import {ImageStyle} from "nodoku-core";
import ParagraphTheme = NodokuComponents.ParagraphTheme;
import exp from "node:constants";

export type HorizontalCardTheme = {

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
    ctaContainerStyle?: ThemeStyle;
    ctaButtonStyle?: ThemeStyle;
    codeHighlightTheme?: HighlightedCodeTheme;
    listTheme?: ListCompTheme;
}

export const defaultTheme: HorizontalCardTheme = { }

// export default HorizontalCardTheme.defaultTheme;