"use client"

import type {
    CarouselItem,
    CarouselOptions
} from 'flowbite/lib/esm/components/carousel/types';
import type { InstanceOptions } from 'flowbite/lib/esm/dom/types';

import Carousel from "flowbite/lib/esm/components/carousel/index";

import {JSX} from "react";


export function CarouselClientSide(): JSX.Element {

    if (typeof window !== 'undefined') {

        setTimeout(() => {

            const carouselElement: HTMLElement = document.getElementById('default-carousel')!;

            const items: CarouselItem[] = [
                {
                    position: 0,
                    el: document.getElementById('carousel-item-1')!,
                },
                {
                    position: 1,
                    el: document.getElementById('carousel-item-2')!,
                },
                {
                    position: 2,
                    el: document.getElementById('carousel-item-3')!,
                },
                {
                    position: 3,
                    el: document.getElementById('carousel-item-4')!,
                },
            ];

            // object options with default values
            const options: CarouselOptions = {
                defaultPosition: 1,
                interval: 3000,

                indicators: {
                    activeClasses: 'bg-white dark:bg-gray-800',
                    inactiveClasses:
                        'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
                    items: [
                        {
                            position: 0,
                            el: document.getElementById('carousel-indicator-1')!,
                        },
                        {
                            position: 1,
                            el: document.getElementById('carousel-indicator-2')!,
                        },
                        {
                            position: 2,
                            el: document.getElementById('carousel-indicator-3')!,
                        },
                        {
                            position: 3,
                            el: document.getElementById('carousel-indicator-4')!,
                        },
                    ],
                },

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
                id: 'default-carousel',
                override: true
            };

            const carousel: Carousel = new Carousel(carouselElement, items, options, instanceOptions);

            carousel.cycle();

// set event listeners for prev and next buttons
            const $prevButton = document.getElementById('data-carousel-prev')!;
            const $nextButton = document.getElementById('data-carousel-next')!;

            $prevButton.addEventListener('click', () => {
                carousel.prev();
            });

            $nextButton.addEventListener('click', () => {
                carousel.next();
            });



        },100);


    }


    return <div className={"hidden"}>carousel initialized</div>
}