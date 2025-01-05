import { ThemeStyle } from "nodoku-core";
import { NodokuComponents } from "nodoku-components";
import HighlightedCodeTheme = NodokuComponents.HighlightedCodeTheme;
import ListCompTheme = NodokuComponents.ListCompTheme;
export type NdCarouselOptions = {
    slideInterval: number;
    showIndicators: boolean;
    animationType: "slide" | "fade-in-fade-out";
};
export type SlideAnimation = {
    transition: readonly string[];
    left: readonly string[];
    middle: readonly string[];
    right: readonly string[];
};
export type NdCarouselProps = {
    options: NdCarouselOptions;
    carouselElementId: string;
    indicators: {
        activeClasses: string;
        inactiveClasses: string;
    };
    animation: SlideAnimation;
};
export declare const defaultOptions: NdCarouselOptions;
export type CarouselTheme = {
    carouselContainerStyle?: ThemeStyle;
    bgImageStyle?: ThemeStyle;
    bgColorStyle?: ThemeStyle;
    containerStyle?: ThemeStyle;
    slideAnimation?: ThemeStyle;
    indicatorActiveClasses?: ThemeStyle;
    indicatorInactiveClasses?: ThemeStyle;
    titleStyle?: ThemeStyle;
    subTitleStyle?: ThemeStyle;
    paragraphContainerStyle?: ThemeStyle;
    paragraphStyle?: ThemeStyle;
    ctaContainerStyle?: ThemeStyle;
    ctaButtonStyle?: ThemeStyle;
    codeHighlightTheme?: HighlightedCodeTheme;
    listTheme?: ListCompTheme;
};
export declare const animationSlide: SlideAnimation;
export declare const animationFadeInFadeOut: SlideAnimation;
export declare const defaultTheme: CarouselTheme;
