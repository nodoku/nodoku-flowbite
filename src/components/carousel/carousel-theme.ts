import {ThemeStyle} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import HighlightedCodeTheme = NodokuComponents.HighlightedCodeTheme;
import ListCompTheme = NodokuComponents.ListCompTheme;
import ParagraphTheme = NodokuComponents.ParagraphTheme;


export type NdCarouselOptions = {

    slideInterval: number,
    showIndicators: boolean,
    animationType: "slide" | "fade-in-fade-out"
}

export type SlideAnimation = {
    transition: readonly string[],
    left: readonly string[],
    middle: readonly string[],
    right: readonly string[]
}

export type NdCarouselProps = {
    options: NdCarouselOptions;
    carouselElementId: string,
    indicators: {
        activeClasses: string,
        inactiveClasses: string
    },
    animation: SlideAnimation
}

export const defaultOptions: NdCarouselOptions = {
    slideInterval: 3000,
    showIndicators: true,
    animationType: "slide",
}

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
}


export const animationSlide: SlideAnimation = {
    transition: ["transition-transform"],
    left: ["-translate-x-full"],
    middle: ["translate-x-0"],
    right: ["translate-x-full"],
}

export const animationFadeInFadeOut: SlideAnimation = {
    transition: ["transition-opacity"],
    left: ["opacity-0"],
    middle: ["opacity-100"],
    right: ["opacity-0"],

}

export const defaultTheme: CarouselTheme = { }

// export default CarouselTheme.defaultTheme;