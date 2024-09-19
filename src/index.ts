import {JSX} from "react";
import {CardImpl} from "./components/card/card";
import {CarouselImpl} from "./components/carousel/carousel";
import {NdSkinComponentProps} from "nodoku-core";
import {CardTheme} from "./components/card/card-theme";
import {CarouselTheme} from "./components/carousel/carousel-theme";
import {HorizontalCardImpl} from "./components/horizontal-card/horizontal-card";
import {HorizontalCardTheme} from "./components/horizontal-card/horizontal-card-theme";
import {JumbotronTheme} from "./components/jumbotron/jumbotron-theme";
import {JumbotronImpl} from "./components/jumbotron/jumbotron";
import {CarouselExtOptions} from "./components/carousel/carousel-ext-options";
import {register} from "node:module";

console.log("import.meta.url", import.meta.url)
register('./yaml-load-hooks.js', import.meta.url, {
    parentURL: import.meta.url,
    data: { name: "yaml" },
    transferList: [],
});

export namespace NodokuFlowbite {

    export async function Card(props: NdSkinComponentProps<CardTheme, void>): Promise<JSX.Element> {
        return CardImpl(props)
    }

    export async function HorizontalCard(props: NdSkinComponentProps<HorizontalCardTheme, void>): Promise<JSX.Element> {
        return HorizontalCardImpl(props)
    }

    export async function Carousel(props: NdSkinComponentProps<CarouselTheme, CarouselExtOptions>): Promise<JSX.Element> {
        return CarouselImpl(props)
    }

    export async function Jumbotron(props: NdSkinComponentProps<JumbotronTheme, void>): Promise<JSX.Element> {
        return JumbotronImpl(props)
    }
}