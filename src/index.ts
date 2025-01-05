import {JSX} from "react";
import {CardImpl} from "./components/card/card";
import {CarouselImpl} from "./components/carousel/carousel";
import {NdSkinComponentProps} from "nodoku-core";
import {CardTheme} from "./components/card/card-theme";
import {CarouselTheme} from "./components/carousel/carousel-theme";
import {CarouselTheme as FlowbiteCarouselTheme} from "./components/flowbite-react-carousel/carousel-theme";
import {FlowbiteCarouselOptions} from "./components/flowbite-react-carousel/carousel-theme";
import {HorizontalCardImpl} from "./components/horizontal-card/horizontal-card";
import {HorizontalCardTheme} from "./components/horizontal-card/horizontal-card-theme";
import {JumbotronTheme} from "./components/jumbotron/jumbotron-theme";
import {JumbotronImpl} from "./components/jumbotron/jumbotron";
import {NavHeaderTheme} from "./components/nav-header/nav-header-theme";
import {NavHeaderImpl} from "./components/nav-header/nav-header";
import {NdCarouselOptions} from "./components/carousel/carousel-theme";


export namespace NodokuFlowbite {

    export async function Card(props: NdSkinComponentProps<CardTheme, void>): Promise<JSX.Element> {
        return CardImpl(props)
    }

    export async function HorizontalCard(props: NdSkinComponentProps<HorizontalCardTheme, void>): Promise<JSX.Element> {
        return HorizontalCardImpl(props)
    }

    export async function Carousel(props: NdSkinComponentProps<CarouselTheme, NdCarouselOptions>): Promise<JSX.Element> {
        return CarouselImpl(props)
    }

    export async function FlowbiteReactCarousel(props: NdSkinComponentProps<FlowbiteCarouselTheme, FlowbiteCarouselOptions>): Promise<JSX.Element> {
        // const FlowbiteReactCarouselImpl = (await import("./components/flowbite-react-carousel/carousel")).FlowbiteReactCarouselImpl;
        // return FlowbiteReactCarouselImpl(props)
        return CarouselImpl(props as NdSkinComponentProps<CarouselTheme, NdCarouselOptions>)
    }

    export async function Jumbotron(props: NdSkinComponentProps<JumbotronTheme, void>): Promise<JSX.Element> {
        return JumbotronImpl(props)
    }

    export async function NavHeader(props: NdSkinComponentProps<NavHeaderTheme, void>): Promise<JSX.Element> {
        return NavHeaderImpl(props)
    }
}