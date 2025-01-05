"use client";
import Carousel from "flowbite/lib/esm/components/carousel/index";
if (typeof window !== 'undefined') {
    Carousel.prototype._rotate = function (rotationItems) {
        // @ts-ignore
        var animation = this._options.animation;
        var classesToRemove = animation.left.concat(animation.middle).concat(animation.right);
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
        classesToRemove.forEach(function (cl) {
            rotationItems.left.el.classList.remove(cl);
            rotationItems.middle.el.classList.remove(cl);
            rotationItems.right.el.classList.remove(cl);
        });
        animation.left.forEach(function (cl) { return rotationItems.left.el.classList.add(cl); });
        animation.middle.forEach(function (cl) { return rotationItems.middle.el.classList.add(cl); });
        animation.right.forEach(function (cl) { return rotationItems.right.el.classList.add(cl); });
        rotationItems.left.el.classList.remove('hidden', 'z-20');
        rotationItems.left.el.classList.add("z-10");
        rotationItems.middle.el.classList.remove('hidden', 'z-10');
        rotationItems.middle.el.classList.add("z-30");
        rotationItems.right.el.classList.remove('hidden', 'z-30');
        rotationItems.right.el.classList.add("z-20");
    };
}
export function CarouselClientSide(props) {
    var options = props.options, carouselElementId = props.carouselElementId, indicators = props.indicators, animation = props.animation;
    if (typeof window !== 'undefined') {
        var carouselElement = document.getElementById(/*'default-carousel'*/ carouselElementId);
        var slideElements_1 = carouselElement.querySelectorAll(".carousel-item");
        var indicatorElements = carouselElement.querySelectorAll(".carousel-indicator");
        console.log(carouselElementId, "found ", slideElements_1.length, " of carousel items", slideElements_1);
        // console.log(carouselElementId, "found ", slideElements.length, " of indicator items", indicatorElements)
        // throw new Error("indicator error")
        var slides = [];
        var indicatorButtons = [];
        // let maxHeight = 100;
        for (var i = 0; i < slideElements_1.length; i++) {
            var slideElement = slideElements_1[i];
            console.log("pusing carousel item for ", carouselElementId, ":  ", slideElement.id);
            slides.push({
                position: i,
                el: slideElement,
            });
            // let height = 0;
            // for (let j = 0; j < slideElement.children.length; j++) {
            //     height += slideElement.children[j].scrollHeight
            // }
            // maxHeight = Math.max(height, maxHeight);
        }
        for (var i = 0; i < indicatorElements.length; i++) {
            indicatorButtons.push({
                position: i,
                el: indicatorElements[i],
            });
        }
        // object options with default values
        var flowbiteOptions = {
            defaultPosition: 0,
            interval: options.slideInterval,
            animation: animation,
            indicators: options.showIndicators ? {
                activeClasses: indicators.activeClasses.trim(),
                inactiveClasses: indicators.inactiveClasses.trim(),
                items: indicatorButtons,
            } : undefined,
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
            id: /*'default-carousel'*/ carouselElement.id,
            override: true
        };
        var carousel_1 = new Carousel(carouselElement, slides, flowbiteOptions, instanceOptions);
        /*
         * remove default transition - transition-transform
         */
        slideElements_1.forEach(function (el) { return el.classList.remove("transition-transform"); });
        animation.transition.forEach(function (cl) { return slideElements_1.forEach(function (el) { return el.classList.add(cl); }); });
        carousel_1.cycle();
        // set event listeners for prev and next buttons
        var $prevButton = carouselElement.querySelector('.data-carousel-prev');
        var $nextButton = carouselElement.querySelector('.data-carousel-next');
        $prevButton.addEventListener('click', function () {
            carousel_1.prev();
        });
        $nextButton.addEventListener('click', function () {
            carousel_1.next();
        });
    }
    return <div className={"hidden"}>carousel initialized</div>;
}
//# sourceMappingURL=carousel-client-side.jsx.map