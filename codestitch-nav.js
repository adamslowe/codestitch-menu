// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll
// animations with the navbar

document.addEventListener("scroll", (e) => {
    const scroll = document.documentElement.scrollTop;
    if (scroll >= 100) {
        document.querySelector("body").classList.add("scroll");
    } else {
        document.querySelector("body").classList.remove("scroll");
    }
});

/*-- --------------------------------------- -->
<---     Mobile Menu Toggle Button           -->
<--- --------------------------------------- -*/
// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener("click", function () {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    ariaExpanded("#cs-navigation .cs-toggle");
});

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll("#cs-navigation .cs-dropdown"));
for (const item of dropDowns) {
    const onClick = () => {
        item.classList.toggle("cs-active");
    };
    item.addEventListener("click", onClick);
}

/*-- --------------------------------------- -->
<---     Aria-Expanded Attributes            -->
<--- --------------------------------------- -*/
// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded(selector) {
    const csAriaExpanded = document.querySelector(selector);
    const csExpanded = csAriaExpanded.getAttribute("aria-expanded");

    if (csExpanded === "false") {
        csAriaExpanded.setAttribute("aria-expanded", "true");
    } else {
        csAriaExpanded.setAttribute("aria-expanded", "false");
    }
}

//
//
// Begin New Code Not included in CodeStitch
//
//

/*-- -------------------------------------------- -->
<---     Open dropdowns on hover, close on blur   -->
<--- -------------------------------------------- -*/

/*-- --------------------------------------- -->
<---     Escape Key to Close Expanded Items  -->
<---     Return focus to top level item      -->
<--- --------------------------------------- -*/

/*-- --------------------------------------- -->
<---     Remove aria-current if set          -->
<---     Set aria-current on focused link    -->
<--- --------------------------------------- -*/
