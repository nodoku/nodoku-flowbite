import {CarouselProps} from "flowbite-react";
import {ThemeStyle} from "nodoku-core";

export class CarouselExtOptions {

    containerStyle?: ThemeStyle;
    props?: CarouselProps;

    public static defaultOptions: CarouselExtOptions = {

        containerStyle: {
            base: "",
            decoration: ""
        },

        props: {}

    }
}