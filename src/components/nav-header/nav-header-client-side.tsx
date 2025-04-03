"use client"

import {JSX} from "react";
// import Collapse from 'flowbite/lib/esm/components/collapse/index';
// import {CollapseOptions,} from 'flowbite/lib/esm/components/collapse/types';
// import {InstanceOptions} from "flowbite/lib/esm/dom/types";
import {initCollapses} from "flowbite/lib/esm/components/collapse/index";
import instances from "flowbite/lib/esm/dom/instances";
// import {Collapse} from "flowbite";
import {CollapseInterface} from "flowbite/lib/esm/components/collapse/interface";
// import {initDropdowns} from "flowbite/lib/esm/components/dropdown/index";


// const menuCollapses: Collapse[] = []
// let hamburgerButtonCollaps: Collapse | undefined = undefined;
//
// const init = (): void => {
//     var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
//     var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
//
//     if (!themeToggleDarkIcon || !themeToggleLightIcon) {
//         // throw new Error("buttons are not yet loaded !!!")
//         return;
//     }
//
// // Change the icons inside the button based on previous settings
//     if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//         themeToggleLightIcon.classList.remove('hidden');
//     } else {
//         themeToggleDarkIcon.classList.remove('hidden');
//     }
//
//     var themeToggleBtn = document.getElementById('theme-toggle');
//
//     if (!themeToggleBtn) {
//         throw new Error("themeToggleBtn is not yet loaded !!!")
//     }
//
//     console.log("adding event listener to theme-toggle")
//
//     themeToggleBtn.addEventListener('click', function () {
//
//         if (!themeToggleDarkIcon || !themeToggleLightIcon) {
//             throw new Error("buttons are not yet loaded !!!")
//         }
//
//         // toggle icons inside button
//         themeToggleDarkIcon.classList.toggle('hidden');
//         themeToggleLightIcon.classList.toggle('hidden');
//
//         console.log("in event listener")
//
//         // if set via local storage previously
//         if (localStorage.getItem('color-theme')) {
//             if (localStorage.getItem('color-theme') === 'light') {
//                 console.log("adding theme dark 1")
//                 document.documentElement.classList.add('dark');
//                 localStorage.setItem('color-theme', 'dark');
//             } else {
//                 console.log("removing theme dark 1")
//                 document.documentElement.classList.remove('dark');
//                 localStorage.setItem('color-theme', 'light');
//             }
//
//             // if NOT set via local storage previously
//         } else {
//             if (document.documentElement.classList.contains('dark')) {
//                 console.log("removing theme dark 2")
//                 document.documentElement.classList.remove('dark');
//                 localStorage.setItem('color-theme', 'light');
//             } else {
//                 console.log("adding theme dark 2")
//                 document.documentElement.classList.add('dark');
//                 localStorage.setItem('color-theme', 'dark');
//             }
//         }
//
//     });
//
//     // set the target element that will be collapsed or expanded (eg. navbar menu)
//     const $targetEl: HTMLElement | null = document.getElementById('navbar-main-menu');
//
// // optionally set a trigger element (eg. a button, hamburger icon)
//     const $triggerEl: HTMLElement | null = document.getElementById('hamburger-button');
//
//     if (!$targetEl || !$triggerEl) {
//         throw new Error("$triggerEl and $triggerEl are not yet loaded !!!" + $targetEl + ", " + $triggerEl)
//     }
//
// // optional options with default values and callback functions
//     const options: CollapseOptions = {
//         onCollapse: () => {
//             console.log('element has been collapsed');
//         },
//         onExpand: () => {
//             console.log('element has been expanded');
//         },
//         onToggle: () => {
//             console.log('element has been toggled');
//         },
//     };
//
// // instance options object
//     const instanceOptions: InstanceOptions = {
//         id: 'navbar-main-menu',
//         override: true
//     };
//
//     /*
//      * $targetEl: required
//      * $triggerEl: optional
//      * options: optional
//      * instanceOptions: optional
//      */
//     const collapse: Collapse = new Collapse(
//         $targetEl,
//         $triggerEl,
//         options,
//         instanceOptions
//     );
//
//     hamburgerButtonCollaps = collapse;
//
//     const dropdownButtons = document.getElementsByClassName("dropdownNavbar-button")
//     const dropdownDropdowns = document.getElementsByClassName("dropdownNavbar-dropdown")
//     if (dropdownButtons && dropdownButtons.length > 0) {
//         console.log("creating collapses", dropdownButtons.length)
//         for (let i = 0; i < dropdownButtons.length; i++) {
//             console.log("creating collapse for", dropdownDropdowns.item(i)!.id)
//             menuCollapses.push(new Collapse(
//                 dropdownDropdowns.item(i) as HTMLElement,
//                 dropdownButtons.item(i) as HTMLElement,
//                 options,
//                 /*instanceOptions*/undefined
//             ))
//         }
//     }
//
//     const handleWindowClick = (event: any) => {
//
//         console.log("event.target.closest(\"button\")", event.target.closest("button")?.id);
//
//
//         let shouldCloseHamburger = true;
//         menuCollapses.forEach(cl => {
//             if (cl._triggerEl != event.target.closest("button")) {
//                 console.log("collapsing ", cl._targetEl)
//                 cl.collapse()
//             } else {
//                 shouldCloseHamburger = false;
//             }
//         });
//         if (shouldCloseHamburger && hamburgerButtonCollaps && hamburgerButtonCollaps._triggerEl != event.target.closest("button")) {
//             hamburgerButtonCollaps?.collapse()
//         }
//     }
//
//     window.addEventListener('click', handleWindowClick)
// }
//

const handleWindowClick = (event: any) => {

    console.log("event.target.closest(\"button\")", event.target.closest("button")?.id);

    const collapses = instances.getInstances("Collapse") as {
        [id: string]: CollapseInterface;
    }

    const targetEl = event.target.closest("button");
    const id = targetEl ? targetEl.id : "--";
    Object.keys(collapses).forEach(k => {
        // console.log("collapse id", id, "btn-" + k)
        if (id.startsWith("btn-" + k)) {
            console.log("leaving intact ", k, id, "btn-" + k)
        } else {
            console.log("collapsing ", k, id, "btn-" + k)
            collapses[k].collapse()
        }
    });

}

function handleThemeToggle(themeSwitchBtnId: string) {

    // var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    // var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    var themeToggleBtn = document.getElementById(themeSwitchBtnId);
    if (!themeToggleBtn) {
        throw new Error("buttons are not yet loaded !!!")
    }

    // var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    // var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    var themeToggleDarkIcon = themeToggleBtn.querySelector(".theme-toggle-dark-icon");
    var themeToggleLightIcon = themeToggleBtn.querySelector(".theme-toggle-light-icon");

    if (!themeToggleDarkIcon || !themeToggleLightIcon) {
        throw new Error("buttons are not yet loaded !!!")
    }

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    console.log("in event listener")

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            console.log("adding theme dark 1")
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            console.log("removing theme dark 1")
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            console.log("removing theme dark 2")
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            console.log("adding theme dark 2")
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

}

function initOnce(themeSwitchBtnId: string) {


    var themeToggleBtn = document.getElementById(themeSwitchBtnId);
    if (!themeToggleBtn) {
        throw new Error("buttons are not yet loaded !!!")
    }

    // var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    // var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    var themeToggleDarkIcon = themeToggleBtn.querySelector(".theme-toggle-dark-icon");
    var themeToggleLightIcon = themeToggleBtn.querySelector(".theme-toggle-light-icon");


    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleDarkIcon!.classList.add('hidden');
        themeToggleLightIcon!.classList.remove('hidden');
        document.documentElement.classList.add('dark');
    } else {
        themeToggleDarkIcon!.classList.remove('hidden');
        themeToggleLightIcon!.classList.add('hidden');
        document.documentElement.classList.add('light');
    }



    if (!themeToggleBtn) {
        throw new Error("themeToggleBtn is not yet loaded !!!")
    }

    console.log("adding event listener to theme-toggle")

    themeToggleBtn.addEventListener('click', () => handleThemeToggle(themeSwitchBtnId));

}

function initMe(themeSwitchBtnId: string) {

    // @ts-ignore
    if (!window.nodokuNavHeaderInitialized) {
        initCollapses();
        console.log("adding window click ")
        window.addEventListener('click', handleWindowClick)

        // @ts-ignore
        window.nodokuNavHeaderInitialized = {}
    }
    // @ts-ignore
    if (!window.nodokuNavHeaderInitialized[themeSwitchBtnId]) {
        initOnce(themeSwitchBtnId)
        // @ts-ignore
        window.nodokuNavHeaderInitialized[themeSwitchBtnId] = true;
    }

}


export function NavHeaderClientSide(props: {themeSwitchBtnId: string}): JSX.Element {

    const {themeSwitchBtnId} = props;
    // initCollapses();

    console.log("about to setTimeout to initialize carousels")
    if (typeof window !== 'undefined') {

        if (document.readyState === "complete" || document.readyState === "interactive") {
            // // call on next available tick
            // var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
            // var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
            // console.log("document state is ", document.readyState, themeToggleDarkIcon, themeToggleLightIcon)

            setTimeout(() => initMe(themeSwitchBtnId), 1);
        } else {
            document.addEventListener("DOMContentLoaded", () => initMe(themeSwitchBtnId));
        }

    }


    return <div className={"hidden"}>navbar initialized</div>
}