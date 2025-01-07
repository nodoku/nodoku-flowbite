import { CarouselOptions, CarouselItem, IndicatorItem, RotationItems } from "flowbite/lib/esm/components/carousel/types";
import { InstanceOptions } from "flowbite/lib/esm/dom/types";
import { CarouselInterface } from "flowbite/lib/esm/components/carousel/interface";
declare class Carousel implements CarouselInterface {
    _instanceId: string;
    _carouselEl: HTMLElement;
    _items: CarouselItem[];
    _indicators: IndicatorItem[];
    _activeItem: CarouselItem;
    _intervalDuration: number;
    _intervalInstance: number;
    _options: CarouselOptions;
    _initialized: boolean;
    constructor(carouselEl: HTMLElement, items?: CarouselItem[], options?: CarouselOptions, instanceOptions?: InstanceOptions);
    /**
     * initialize carousel and items based on active one
     */
    init(): void;
    destroy(): void;
    removeInstance(): void;
    destroyAndRemoveInstance(): void;
    getItem(position: number): CarouselItem;
    /**
     * Slide to the element based on id
     * @param {*} position
     */
    slideTo(position: number): void;
    /**
     * Based on the currently active item it will go to the next position
     */
    next(): void;
    /**
     * Based on the currently active item it will go to the previous position
     */
    prev(): void;
    /**
     * This method applies the transform classes based on the left, middle, and right rotation carousel items
     * @param {*} rotationItems
     */
    _rotate(rotationItems: RotationItems): void;
    /**
     * Set an interval to cycle through the carousel items
     */
    cycle(): void;
    /**
     * Clears the cycling interval
     */
    pause(): void;
    /**
     * Get the currently active item
     */
    getActiveItem(): CarouselItem;
    _setActiveItem(item: CarouselItem): void;
    updateOnNext(callback: () => void): void;
    updateOnPrev(callback: () => void): void;
    updateOnChange(callback: () => void): void;
}
export default Carousel;
