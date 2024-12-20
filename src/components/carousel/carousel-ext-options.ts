// import {CarouselProps} from "flowbite-react";
import {ThemeStyle} from "nodoku-core";
import {CarouselOptions} from "flowbite";

export class CarouselExtOptions {


    props?: CarouselOptions;

    public static defaultOptions: CarouselExtOptions = {

        // containerStyle: {
        //     base: "",
        //     decoration: ""
        // },

        props: {
            // slide: false,
            // slideInterval: 10000
            interval: 10000
            // prop: 456
        }

    }
}