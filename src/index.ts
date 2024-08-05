import {CardImpl} from "./components/card/card";
import {CarouselImpl} from "./components/carousel/carousel";
import {NdSkinComponentProps} from "nodoku-core";
import {CardTheme} from "./components/card/card-theme";
import {CarouselProps} from "flowbite-react";
import {JSX} from "react";
import {CarouselTheme} from "./components/carousel/carousel-theme";

export namespace NodokuFlowbite {

    export async function Card(props: NdSkinComponentProps<CardTheme, CarouselProps>): Promise<JSX.Element> {
        return CardImpl(props)
    }

    export async function Carousel(props: NdSkinComponentProps<CarouselTheme, CarouselProps>): Promise<JSX.Element> {
        return CarouselImpl(props)
    }
}