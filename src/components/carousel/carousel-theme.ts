import {ThemeStyle} from "nodoku-core";
import {NodokuComponents} from "nodoku-components";
import HighlightedCodeTheme = NodokuComponents.HighlightedCodeTheme;
import ListCompTheme = NodokuComponents.ListCompTheme;
import ParagraphTheme = NodokuComponents.ParagraphTheme;
import {ImageStyle} from "nodoku-core";


export type NdCarouselOptions = {

    slideInterval: number,
    showIndicators: boolean,
    animationType: "slide-x" | "slide-y" | "fade-in-fade-out"
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
    animationType: "slide-x",
}

export type CarouselTheme = {

    className?: string;

    carouselContainerStyle?: ThemeStyle;
    carouselAspectStyle?: ThemeStyle;
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
    imageContainerStyle?: ThemeStyle;
    imageStyle?: ImageStyle;
    ctaContainerStyle?: ThemeStyle;
    ctaButtonStyle?: ThemeStyle;
    codeHighlightTheme?: HighlightedCodeTheme;
    listTheme?: ListCompTheme;
}


export const animationSlideX: SlideAnimation = {
    transition: ["transition-transform"],
    left: ["-translate-x-full"],
    middle: ["translate-x-0"],
    right: ["translate-x-full"],
}

export const animationSlideY: SlideAnimation = {
    transition: ["transition-transform"],
    left: ["-translate-y-full"],
    middle: ["translate-y-0"],
    right: ["translate-y-full"],
}

export const animationFadeInFadeOut: SlideAnimation = {
    transition: ["transition-opacity"],
    left: ["opacity-0"],
    middle: ["opacity-100"],
    right: ["opacity-0"],

}

export const defaultTheme: CarouselTheme = { }

// export default CarouselTheme.defaultTheme;