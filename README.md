# Accessibility Work for CodeStitch Menus

## Notes:

Addressing keyboard navigation problems with dropdowns and other minor accessibility issues with the CodeStitch Navigation Element.

-   Modifying [CodeStitch 1530](https://codestitch.app/app/dashboard/stitches/1530/rendered).
-   Using the [W3C Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
-   Referencing the [Example Disclosure Navigation Menu with Top-Level Links](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/)
-   It may be worth creating an alternate option for dropdown menus with no top-level links using this Example Pattern from the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
-   Similar menu I built using Alpine.js
    -   [YouTube Video Walkthrough](https://youtu.be/t4ph7z3aLMk?si=xOwzYOE-MaT5xi-X)
    -   Alpine.js [Dropdown Component](https://alpinejs.dev/component/dropdown)
    -   [GitHub Project](https://github.com/adamslowe/responsive-accessible-alpine-menu) for the Alpine.js menu

Other noted issues include:

-   Needs a skip to main link at the beginning of the page
-   Need labels for social icon links
-   Needs a span with sr-only text for social icons (some screen readers won't read the label)
-   May find other things as I look deeper...
