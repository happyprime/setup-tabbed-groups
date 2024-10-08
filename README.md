# Setup Tabbed Groups

Setup a tabbed groups interface based on specific markup provided by the WordPress block editor.

Expected markup:

* Group or other container element with class `js-tabbed-groups`
  * Buttons block with one button.
  * Group block expected to appear when button is clicked.
  * Buttons block with one button.
  * Group block expected to appear when button is clicked.
  * Buttons block with one button.
  * Group block expected to appear when button is clicked.

Groups can contain any sort of content and will have a `.is-inactive` class applied when they are not the active group.

Additional CSS must be added to control the appearance of the tabbed groups.

## Usage

1. Copy and paste the script from `src/index.js` or `build/index.js` into your project.
2. Add `js-tabbed-groups` as a class to the container of any tabbed groups in the WordPress block editor.
