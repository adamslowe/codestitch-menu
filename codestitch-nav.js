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

// set aria-expanded for the mobile menu button
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

/*-- --------------------------------------- -->
<---     Remove aria-current if set          -->
<---     Set aria-current on focused link    -->
<--- --------------------------------------- -*/

class DisclosureNav {
    constructor(domNode) {
        this.rootNode = domNode;
        this.controlledNodes = [];
        this.openIndex = null;

        this.topLevelNodes = [...this.rootNode.querySelectorAll("button.cs-li-link[aria-expanded][aria-controls]")];

        this.topLevelNodes.forEach((node) => {
            node.addEventListener("mouseenter", this.onButtonClick.bind(this));
            // attach event listeners for the list item top level node
            node.parentNode.addEventListener("mouseleave", this.onMenuMouseLeave.bind(this));
            // handle button + menu
            if (node.tagName.toLowerCase() === "button" && node.hasAttribute("aria-controls")) {
                const menu = node.parentNode.querySelector("ul");
                if (menu) {
                    // save ref controlled menu
                    this.controlledNodes.push(menu);

                    // collapse menus
                    node.setAttribute("aria-expanded", "false");
                    this.toggleMenu(menu, false);

                    // attach event listeners
                    menu.addEventListener("keydown", this.onMenuKeyDown.bind(this));
                    node.addEventListener("click", this.onButtonClick.bind(this));
                }
            }
        });

        this.rootNode.addEventListener("focusout", this.onBlur.bind(this));
    }

    // public function to close open menu
    close() {
        this.toggleExpand(this.openIndex, false);
    }

    onBlur(event) {
        var menuContainsFocus = this.rootNode.contains(event.relatedTarget);
        if (!menuContainsFocus && this.openIndex !== null) {
            this.toggleExpand(this.openIndex, false);
        }
    }

    onButtonClick(event) {
        var button = event.target;
        var buttonIndex = this.topLevelNodes.indexOf(button);
        var buttonExpanded = button.getAttribute("aria-expanded") === "true";
        this.toggleExpand(buttonIndex, !buttonExpanded);
    }

    onMenuMouseLeave(event) {
        this.toggleExpand(this.openIndex, false);
    }

    onMenuKeyDown(event) {
        if (this.openIndex === null) {
            return;
        }

        var menuLinks = Array.prototype.slice.call(this.controlledNodes[this.openIndex].querySelectorAll("a"));
        var currentIndex = menuLinks.indexOf(document.activeElement);

        // close on escape
        if (event.key === "Escape") {
            this.topLevelNodes[this.openIndex].focus();
            this.toggleExpand(this.openIndex, false);
        }
    }

    toggleExpand(index, expanded) {
        // close open menu, if applicable
        if (this.openIndex !== index) {
            this.toggleExpand(this.openIndex, false);
        }

        // handle menu at called index
        if (this.topLevelNodes[index]) {
            this.openIndex = expanded ? index : null;
            this.topLevelNodes[index].setAttribute("aria-expanded", expanded);
            this.toggleMenu(this.controlledNodes[index], expanded);
        }
    }

    toggleMenu(domNode, show) {
        if (domNode) {
            domNode.style.opacity = show ? 1 : 0;
            domNode.style.visibility = show ? "visible" : "hidden";
            domNode.style.transform = show ? "scaleY(1)" : "";
            // Get the list items
            let listItems = domNode.getElementsByTagName("li");

            // Loop through the list items and change their style
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].style.opacity = show ? 1 : 0;
                listItems[i].style.transform = show ? "translateY(0)" : "";
            }
        }
    }
}

/* Initialize Disclosure Menus */

window.addEventListener(
    "load",
    function () {
        var menus = document.querySelectorAll(".cs-nav");
        var disclosureMenus = [];
        for (var i = 0; i < menus.length; i++) {
            disclosureMenus[i] = new DisclosureNav(menus[i]);
        }

        // handle aria-current
        disclosureMenus.forEach((disclosureNav, i) => {
            var links = menus[i].querySelectorAll("a");
            for (var k = 0; k < links.length; k++) {
                // removes aria-current from all nav links if present
                for (var n = 0; n < links.length; n++) {
                    links[n].removeAttribute("aria-current");
                }
                // sets aria-current=page on the first link that matches the current url
                if (links[k].href == window.location.href) {
                    links[k].setAttribute("aria-current", "page");
                    links[k].className += " cs-active";
                    break;
                }
            }
        });
    },
    false
);
