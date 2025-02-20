var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// import instances from '../../dom/instances';
// export declare interface CarouselInterface {
//     _items: CarouselItem[];
//     _indicators: IndicatorItem[];
//     _activeItem: CarouselItem;
//     _intervalDuration: number;
//     _intervalInstance?: number;
//     _options: CarouselOptions;
//
//     init(): void;
//
//     getItem(position: number): CarouselItem;
//     getActiveItem(): CarouselItem;
//
//     _setActiveItem(item: CarouselItem): void;
//
//     slideTo(position: number): void;
//
//     next(): void;
//     prev(): void;
//
//     _rotate(rotationItems: RotationItems): void;
//     cycle(): void;
//     pause(): void;
//
//     // destroy(): void;
//     // removeInstance(): void;
//     // destroyAndRemoveInstance(): void;
// }
var Default = {
    defaultPosition: 0,
    indicators: {
        items: [],
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
    },
    interval: 3000,
    onNext: function () { },
    onPrev: function () { },
    onChange: function () { },
};
var DefaultInstanceOptions = {
    id: undefined,
    override: true,
};
var Carousel = /** @class */ (function () {
    function Carousel(carouselEl, items, options, instanceOptions) {
        if (items === void 0) { items = []; }
        if (options === void 0) { options = Default; }
        if (instanceOptions === void 0) { instanceOptions = DefaultInstanceOptions; }
        this._instanceId = instanceOptions.id
            ? instanceOptions.id
            : carouselEl.id;
        this._carouselEl = carouselEl;
        this._items = items;
        this._options = __assign(__assign(__assign({}, Default), options), { indicators: __assign(__assign({}, Default.indicators), options.indicators) });
        this._activeItem = this.getItem(this._options.defaultPosition);
        this._indicators = this._options.indicators.items;
        this._intervalDuration = this._options.interval;
        this._intervalInstance = -1;
        this._initialized = false;
        this.init();
        // instances.addInstance(
        //     'Carousel',
        //     this,
        //     this._instanceId,
        //     instanceOptions.override
        // );
    }
    /**
     * initialize carousel and items based on active one
     */
    Carousel.prototype.init = function () {
        var _this = this;
        if (this._items.length && !this._initialized) {
            this._items.map(function (item) {
                item.el.classList.add('absolute', 'inset-0', 'transition-transform', 'transform');
            });
            // // if no active item is set then first position is default
            // if (this.getActiveItem()) {
            //     this.slideTo(this.getActiveItem().position);
            // } else {
            //     this.slideTo(0);
            // }
            this._indicators.forEach(function (indicator, position) {
                indicator.el.addEventListener('click', function () {
                    _this.slideTo(position);
                });
            });
            this._initialized = true;
        }
    };
    Carousel.prototype.destroy = function () {
        if (this._initialized) {
            this._initialized = false;
        }
    };
    Carousel.prototype.removeInstance = function () {
        // instances.removeInstance('Carousel', this._instanceId);
    };
    Carousel.prototype.destroyAndRemoveInstance = function () {
        this.destroy();
        this.removeInstance();
    };
    Carousel.prototype.getItem = function (position) {
        return this._items[position];
    };
    /**
     * Slide to the element based on id
     * @param {*} position
     */
    Carousel.prototype.slideTo = function (position) {
        var nextItem = this._items[position];
        var rotationItems = {
            left: nextItem.position === 0
                ? this._items[this._items.length - 1]
                : this._items[nextItem.position - 1],
            middle: nextItem,
            right: nextItem.position === this._items.length - 1
                ? this._items[0]
                : this._items[nextItem.position + 1],
        };
        this._rotate(rotationItems);
        this._setActiveItem(nextItem);
        if (this._intervalInstance) {
            this.pause();
            this.cycle();
        }
        if (this._options && this._options.onChange) {
            this._options.onChange(this);
        }
    };
    /**
     * Based on the currently active item it will go to the next position
     */
    Carousel.prototype.next = function () {
        var activeItem = this.getActiveItem();
        var nextItem = null;
        // check if last item
        if (activeItem.position === this._items.length - 1) {
            nextItem = this._items[0];
        }
        else {
            nextItem = this._items[activeItem.position + 1];
        }
        this.slideTo(nextItem.position);
        // callback function
        if (this._options && this._options.onNext) {
            this._options.onNext(this);
        }
    };
    /**
     * Based on the currently active item it will go to the previous position
     */
    Carousel.prototype.prev = function () {
        var activeItem = this.getActiveItem();
        var prevItem = null;
        // check if first item
        if (activeItem.position === 0) {
            prevItem = this._items[this._items.length - 1];
        }
        else {
            prevItem = this._items[activeItem.position - 1];
        }
        this.slideTo(prevItem.position);
        // callback function
        if (this._options && this._options.onPrev) {
            this._options.onPrev(this);
        }
    };
    /**
     * This method applies the transform classes based on the left, middle, and right rotation carousel items
     * @param {*} rotationItems
     */
    Carousel.prototype._rotate = function (rotationItems) {
        // @ts-ignore
        var animation = this._options.animation;
        var classesToRemove = animation.left.concat(animation.middle).concat(animation.right);
        // classesToRemove = classesToRemove.concat(["hidden", "z-10", "z-20", "z-30"])
        // reset
        this._items.forEach(function (item) {
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
    /**
     * Set an interval to cycle through the carousel items
     */
    Carousel.prototype.cycle = function () {
        var _this = this;
        if (typeof window !== 'undefined') {
            this._intervalInstance = window.setInterval(function () {
                _this.next();
            }, this._intervalDuration);
        }
    };
    /**
     * Clears the cycling interval
     */
    Carousel.prototype.pause = function () {
        clearInterval(this._intervalInstance);
    };
    /**
     * Get the currently active item
     */
    Carousel.prototype.getActiveItem = function () {
        return this._activeItem;
    };
    Carousel.prototype._setActiveItem = function (item) {
        var _a, _b;
        var _this = this;
        this._activeItem = item;
        var position = item.position;
        // update the indicators if available
        if (this._indicators.length) {
            this._indicators.forEach(function (indicator) {
                var _a, _b;
                indicator.el.setAttribute('aria-current', 'false');
                (_a = indicator.el.classList).remove.apply(_a, _this._options.indicators.activeClasses.split(' '));
                (_b = indicator.el.classList).add.apply(_b, _this._options.indicators.inactiveClasses.split(' '));
            });
            (_a = this._indicators[position].el.classList).add.apply(_a, this._options.indicators.activeClasses.split(' '));
            (_b = this._indicators[position].el.classList).remove.apply(_b, this._options.indicators.inactiveClasses.split(' '));
            this._indicators[position].el.setAttribute('aria-current', 'true');
        }
    };
    Carousel.prototype.updateOnNext = function (callback) {
        this._options.onNext = callback;
    };
    Carousel.prototype.updateOnPrev = function (callback) {
        this._options.onPrev = callback;
    };
    Carousel.prototype.updateOnChange = function (callback) {
        this._options.onChange = callback;
    };
    return Carousel;
}());
// export function initCarousels() {
//     document.querySelectorAll('[data-carousel]').forEach(($carouselEl) => {
//         const interval = $carouselEl.getAttribute('data-carousel-interval');
//         const slide =
//             $carouselEl.getAttribute('data-carousel') === 'slide'
//                 ? true
//                 : false;
//
//         const items: CarouselItem[] = [];
//         let defaultPosition = 0;
//         if ($carouselEl.querySelectorAll('[data-carousel-item]').length) {
//             Array.from(
//                 $carouselEl.querySelectorAll('[data-carousel-item]')
//             ).map(($carouselItemEl: HTMLElement, position: number) => {
//                 items.push({
//                     position: position,
//                     el: $carouselItemEl,
//                 });
//
//                 if (
//                     $carouselItemEl.getAttribute('data-carousel-item') ===
//                     'active'
//                 ) {
//                     defaultPosition = position;
//                 }
//             });
//         }
//
//         const indicators: IndicatorItem[] = [];
//         if ($carouselEl.querySelectorAll('[data-carousel-slide-to]').length) {
//             Array.from(
//                 $carouselEl.querySelectorAll('[data-carousel-slide-to]')
//             ).map(($indicatorEl: HTMLElement) => {
//                 indicators.push({
//                     position: parseInt(
//                         $indicatorEl.getAttribute('data-carousel-slide-to')
//                     ),
//                     el: $indicatorEl,
//                 });
//             });
//         }
//
//         const carousel = new Carousel($carouselEl as HTMLElement, items, {
//             defaultPosition: defaultPosition,
//             indicators: {
//                 items: indicators,
//             },
//             interval: interval ? interval : Default.interval,
//         } as CarouselOptions);
//
//         if (slide) {
//             carousel.cycle();
//         }
//
//         // check for controls
//         const carouselNextEl = $carouselEl.querySelector(
//             '[data-carousel-next]'
//         );
//         const carouselPrevEl = $carouselEl.querySelector(
//             '[data-carousel-prev]'
//         );
//
//         if (carouselNextEl) {
//             carouselNextEl.addEventListener('click', () => {
//                 carousel.next();
//             });
//         }
//
//         if (carouselPrevEl) {
//             carouselPrevEl.addEventListener('click', () => {
//                 carousel.prev();
//             });
//         }
//     });
// }
//
// if (typeof window !== 'undefined') {
//     window.Carousel = Carousel;
//     window.initCarousels = initCarousels;
// }
export default Carousel;
//# sourceMappingURL=flowbite-carousel-client-side.js.map