"use client";
import Carousel from "flowbite/lib/esm/components/carousel/index";
export function CarouselClientSide() {
    if (typeof window !== 'undefined') {
        setTimeout(function () {
            var carouselElement = document.getElementById('default-carousel');
            var items = [
                {
                    position: 0,
                    el: document.getElementById('carousel-item-1'),
                },
                {
                    position: 1,
                    el: document.getElementById('carousel-item-2'),
                },
                {
                    position: 2,
                    el: document.getElementById('carousel-item-3'),
                },
                {
                    position: 3,
                    el: document.getElementById('carousel-item-4'),
                },
            ];
            // object options with default values
            var options = {
                defaultPosition: 1,
                interval: 3000,
                indicators: {
                    activeClasses: 'bg-white dark:bg-gray-800',
                    inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
                    items: [
                        {
                            position: 0,
                            el: document.getElementById('carousel-indicator-1'),
                        },
                        {
                            position: 1,
                            el: document.getElementById('carousel-indicator-2'),
                        },
                        {
                            position: 2,
                            el: document.getElementById('carousel-indicator-3'),
                        },
                        {
                            position: 3,
                            el: document.getElementById('carousel-indicator-4'),
                        },
                    ],
                },
                // callback functions
                onNext: function () {
                    // console.log('next slider item is shown');
                },
                onPrev: function () {
                    // console.log('previous slider item is shown');
                },
                onChange: function () {
                    // console.log('new slider item has been shown');
                },
            };
            // instance options object
            var instanceOptions = {
                id: 'default-carousel',
                override: true
            };
            var carousel = new Carousel(carouselElement, items, options, instanceOptions);
            carousel.cycle();
            // set event listeners for prev and next buttons
            var $prevButton = document.getElementById('data-carousel-prev');
            var $nextButton = document.getElementById('data-carousel-next');
            $prevButton.addEventListener('click', function () {
                carousel.prev();
            });
            $nextButton.addEventListener('click', function () {
                carousel.next();
            });
        }, 100);
    }
    return <div className={"hidden"}>carousel initialized</div>;
}
//# sourceMappingURL=carousel-client-side.jsx.map