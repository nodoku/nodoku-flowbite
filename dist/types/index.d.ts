import { JSX } from "react";
import { NdSkinComponentProps } from "nodoku-core";
import { CardTheme } from "./components/card/card-theme";
import { CarouselTheme } from "./components/carousel/carousel-theme";
import { HorizontalCardTheme } from "./components/horizontal-card/horizontal-card-theme";
import { JumbotronTheme } from "./components/jumbotron/jumbotron-theme";
import { CarouselOptions } from "flowbite/lib/esm/components/carousel/types";
import { NavHeaderTheme } from "./components/nav-header/nav-header-theme";
export declare namespace NodokuFlowbite {
    function Card(props: NdSkinComponentProps<CardTheme, void>): Promise<JSX.Element>;
    function HorizontalCard(props: NdSkinComponentProps<HorizontalCardTheme, void>): Promise<JSX.Element>;
    function Carousel(props: NdSkinComponentProps<CarouselTheme, CarouselOptions>): Promise<JSX.Element>;
    function Jumbotron(props: NdSkinComponentProps<JumbotronTheme, void>): Promise<JSX.Element>;
    function NavHeader(props: NdSkinComponentProps<NavHeaderTheme, void>): Promise<JSX.Element>;
}
