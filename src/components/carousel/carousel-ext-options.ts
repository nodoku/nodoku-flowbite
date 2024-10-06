import {CarouselProps} from "flowbite-react";
import {ThemeStyle} from "nodoku-core";

export class CarouselExtOptions {


    props?: CarouselProps;

    public static defaultOptions: CarouselExtOptions = {

        // containerStyle: {
        //     base: "",
        //     decoration: ""
        // },

        props: {
            slide: false,
            slideInterval: 10000
        }

    }
}