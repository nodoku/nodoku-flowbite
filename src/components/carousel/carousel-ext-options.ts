// import {CarouselProps} from "flowbite-react/components/Carousel";
// import {ThemeStyle} from "nodoku-core";
import {CarouselOptions} from "flowbite/lib/esm/components/carousel/types";

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