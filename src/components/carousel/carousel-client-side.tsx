"use client"

import {JSX} from "react";
import type {
    CarouselItem,
    CarouselOptions,
    IndicatorItem
} from "flowbite/lib/esm/components/carousel/types";
import type { InstanceOptions } from 'flowbite/lib/esm/dom/types';
import Carousel from "flowbite/lib/esm/components/carousel/index";
import {NdCarouselProps} from "./carousel-theme";
import {SlideAnimation} from "./carousel-theme";


if (typeof window !== 'undefined') {


    Carousel.prototype._rotate = function (rotationItems) {


        // @ts-ignore
        const animation: SlideAnimation = this._options.animation;

        const classesToRemove: string[] = animation.left.concat(animation.middle).concat(animation.right);
        // classesToRemove = classesToRemove.concat(["hidden", "z-10", "z-20", "z-30"])

        // reset
        this._items.map(function (item) {
            item.el.classList.add('hidden');
        });
        // Handling the case when there is only one item
        if (this._items.length === 1) {
            rotationItems.middle.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-10');
            rotationItems.middle.el.classList.add('translate-x-0', 'z-20');
            return;
        }
        // // left item (previously active)
        // rotationItems.left.el.classList  .remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-20', 'opacity-100', 'opacity-0');
        // rotationItems.left.el.classList.add('-translate-x-full', 'z-10', 'opacity-0');
        // // currently active item
        // rotationItems.middle.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-10', 'opacity-100', 'opacity-0');
        // rotationItems.middle.el.classList.add('translate-x-0', 'z-30', 'opacity-100');
        // // right item (upcoming active)
        // rotationItems.right.el.classList .remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-30', 'opacity-100', 'opacity-0');
        // rotationItems.right.el.classList.add('translate-x-full', 'z-20', 'opacity-0');

        classesToRemove.forEach(cl => {
            rotationItems.left.el.classList.remove(cl);
            rotationItems.middle.el.classList.remove(cl);
            rotationItems.right.el.classList.remove(cl);
        })
        animation.left.forEach(cl => rotationItems.left.el.classList.add(cl));
        animation.middle.forEach(cl => rotationItems.middle.el.classList.add(cl));
        animation.right.forEach(cl => rotationItems.right.el.classList.add(cl));


        rotationItems.left.el.classList.remove('hidden', 'z-20');
        rotationItems.left.el.classList.add("z-10")
        rotationItems.middle.el.classList.remove('hidden', 'z-10');
        rotationItems.middle.el.classList.add("z-30")
        rotationItems.right.el.classList.remove('hidden', 'z-30');
        rotationItems.right.el.classList.add("z-20")
    };
}

export function CarouselClientSide(props: NdCarouselProps): JSX.Element {

    const {options, carouselElementId, indicators, animation} = props;

    if (typeof window !== 'undefined') {

        const carouselElement: HTMLElement = document.getElementById(/*'default-carousel'*/carouselElementId)!;

        const slideElements: NodeListOf<HTMLElement> = carouselElement.querySelectorAll(".carousel-item")
        const indicatorElements: NodeListOf<HTMLElement> = carouselElement.querySelectorAll(".carousel-indicator")

        console.log(carouselElementId, "found ", slideElements.length, " of carousel items", slideElements)
        // console.log(carouselElementId, "found ", slideElements.length, " of indicator items", indicatorElements)

    // throw new Error("indicator error")

        const slides: CarouselItem[] = []
        const indicatorButtons: IndicatorItem[] = [];
        // let maxHeight = 100;
        for (let i = 0; i < slideElements.length; i++) {
            const slideElement = slideElements[i] as HTMLElement
            console.log("pusing carousel item for ", carouselElementId, ":  ", slideElement.id)
            slides.push({
                position: i,
                el: slideElement,
            })

            // let height = 0;
            // for (let j = 0; j < slideElement.children.length; j++) {
            //     height += slideElement.children[j].scrollHeight
            // }
            // maxHeight = Math.max(height, maxHeight);
        }

        for (let i = 0; i < indicatorElements.length; i++) {
            indicatorButtons.push({
                position: i,
                el: indicatorElements[i],
            })
        }

        // object options with default values
        const flowbiteOptions: CarouselOptions & {animation: SlideAnimation}= {
            defaultPosition: 0,
            interval: options.slideInterval,
            animation: animation,

            indicators: options.showIndicators ? {
                activeClasses: indicators.activeClasses.trim(),
                inactiveClasses: indicators.inactiveClasses.trim(),
                items: indicatorButtons,
            } : undefined,

            // callback functions
            onNext: () => {
                // console.log('next slider item is shown');
            },
            onPrev: () => {
                // console.log('previous slider item is shown');
            },
            onChange: () => {
                // console.log('new slider item has been shown');
            },
        };

        // instance options object
        const instanceOptions: InstanceOptions = {
            id: /*'default-carousel'*/carouselElement.id,
            override: true
        };




        const carousel: Carousel = new Carousel(carouselElement, slides, flowbiteOptions, instanceOptions);

        /*
         * remove default transition - transition-transform
         */
        slideElements.forEach(el => el.classList.remove("transition-transform"))
        animation.transition.forEach(cl => slideElements.forEach(el => el.classList.add(cl)));

        carousel.cycle();

        // set event listeners for prev and next buttons
        const $prevButton = carouselElement.querySelector('.data-carousel-prev')!;
        const $nextButton = carouselElement.querySelector('.data-carousel-next')!;

        $prevButton.addEventListener('click', () => {
            carousel.prev();
        });

        $nextButton.addEventListener('click', () => {
            carousel.next();
        });


    }


    return <div className={"hidden"}>carousel initialized</div>
}