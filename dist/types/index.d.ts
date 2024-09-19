import { JSX } from "react";
import { NdSkinComponentProps } from "nodoku-core";
import { CardTheme } from "./components/card/card-theme";
import { CarouselTheme } from "./components/carousel/carousel-theme";
import { HorizontalCardTheme } from "./components/horizontal-card/horizontal-card-theme";
import { JumbotronTheme } from "./components/jumbotron/jumbotron-theme";
import { CarouselExtOptions } from "./components/carousel/carousel-ext-options";
export declare namespace NodokuFlowbite {
    function Card(props: NdSkinComponentProps<CardTheme, void>): Promise<JSX.Element>;
    function HorizontalCard(props: NdSkinComponentProps<HorizontalCardTheme, void>): Promise<JSX.Element>;
    function Carousel(props: NdSkinComponentProps<CarouselTheme, CarouselExtOptions>): Promise<JSX.Element>;
    function Jumbotron(props: NdSkinComponentProps<JumbotronTheme, void>): Promise<JSX.Element>;
}
