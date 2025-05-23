# SASS Selectors

Phenix Design System uses SASS placeholder selectors (`%placeholders`) to create reusable style patterns without generating unnecessary CSS. These selectors are a powerful feature of SASS that allow for style inheritance without code duplication.

## Overview

Phenix's SASS selectors (placeholders) are organized into several categories:

1. **UI Resets** - Clean styling for various elements
2. **Layouts & Typography** - Common layout and text patterns
3. **Transition** - Predefined animation speeds and behaviors
4. **Position Fixes** - Positioning helpers for element alignment
5. **UI Helpers** - Miscellaneous UI utility patterns

These selectors can be extended in your own styles using the `@extend` directive.

## UI Resets

Reset selectors provide clean starting points for common elements:

```scss
/*==== UI Resets ====*/
%reset-space {
    padding: 0;
    margin: 0;
}

%reset-list {
    list-style: none;
    padding: 0;
    @include margin-block(0);
}

%reset-control {
    border: 0 none;
    padding: 0;
    &:focus {outline-width: 0;}
}

%select-reset {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
```

### Usage Example

```scss
.custom-list {
    @extend %reset-list;
    // Additional styles for your custom list
}

.clean-button {
    @extend %reset-control;
    // Custom button styles without browser defaults
}
```

## Layouts & Typography

Layout and typography selectors provide common display and text patterns:

```scss
/*==== Layouts & Typography ====*/
%inline-block {
    display: inline-block;
    vertical-align: middle;
}

%flexbox {
    display: flex;
    flex-wrap: wrap;
}

%clear-after {
    content: '';
    display: block;
    clear: both;
}

%nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

### Usage Example

```scss
.icon-with-text {
    @extend %inline-block;
    // Additional styles
}

.card-container {
    @extend %flexbox;
    // Additional flex properties
}

.truncate-text {
    @extend %nowrap;
    // Any additional text styles
}
```

## Transition

Transition selectors provide predefined animation speeds:

```scss
/*==== Transition ====*/
%fast-motion {
    transition: all 300ms ease-in-out;
}

%smooth-motion {
    transition: all 500ms linear;
}

%slow-motion {
    transition: all 1s linear;
}
```

### Usage Example

```scss
.hover-card {
    @extend %fast-motion;
    
    &:hover {
        transform: translateY(-5px);
    }
}

.fade-element {
    @extend %smooth-motion;
    // Additional styles
}
```

## Position Fixes

Position selectors provide helpers for element alignment:

```scss
/*==== Position Fixes ====*/
%position-center {
    transform: translateX(-50%) translateY(-50%);
}

%position-center-x {
    transform: translateX(-50%);
}

%position-center-y {
    transform: translateY(-50%);
}

%position-default {
    transform: translate(0);
}
```

### Usage Example

```scss
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    @extend %position-center;
}

.center-horizontally {
    position: absolute;
    left: 50%;
    @extend %position-center-x;
}
```

## UI Helpers

UI helper selectors provide miscellaneous utility patterns:

```scss
/*==== UI Helpers ====*/
%no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

%select-arrow {
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="7.008" height="4.175" viewBox="0 0 7.008 4.175"><path fill="rgb(100,100,100)" d="M3.293,164.773.052,161.558a.263.263,0,0,1,0-.372l.434-.434a.263.263,0,0,1,.372,0l2.621,2.595L6.1,160.752a.263.263,0,0,1,.372,0l.434.434a.263.263,0,0,1,0,.372l-3.241,3.215A.263.263,0,0,1,3.293,164.773Z" transform="translate(0.025 -160.675)"/></svg>');
    background-size: 20px;
    background-position: $direction-end 15px center;
}

%spinner-loader {
    background-size: 1em;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjguMDQyJSIgeTE9IjAlIiB4Mj0iNjUuNjgyJSIgeTI9IjIzLjg2NSUiIGlkPSJhIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjAlIi8+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjYzMSIgb2Zmc2V0PSI2My4xNDYlIi8+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIG9mZnNldD0iMTAwJSIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMSkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMTgiIGlkPSJPdmFsLTIiIHN0cm9rZT0idXJsKCNhKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgICAgIDxhbmltYXRlVHJhbnNmb3JtCiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIgogICAgICAgICAgICAgICAgICAgIHR5cGU9InJvdGF0ZSIKICAgICAgICAgICAgICAgICAgICBmcm9tPSIwIDE4IDE4IgogICAgICAgICAgICAgICAgICAgIHRvPSIzNjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgZHVyPSIwLjlzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L3BhdGg+CiAgICAgICAgICAgIDxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjM2IiBjeT0iMTgiIHI9IjEiPgogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIgogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgdG89IjM2MCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICBkdXI9IjAuOXMiCiAgICAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgICAgICAgICAgIDwvY2lyY2xlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==);
}

%overlay {
    --opacity: 0.75;
    position: relative;
    &::before {
        inset: 0;
        z-index: 0;
        content: '';
        display: block;
        position: absolute;
        opacity: var(--opacity);
    }
}

%backface-visibility {
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
```

### Usage Example

```scss
.prevent-selection {
    @extend %no-select;
}

.custom-select {
    @extend %select-reset;
    @extend %select-arrow;
    // Additional custom styles
}

.loading-button {
    @extend %spinner-loader;
    // Additional button styles
}

.card-with-overlay {
    @extend %overlay;
    
    &::before {
        background-color: rgba(0, 0, 0, 0.5);
    }
}

.hardware-accelerated {
    @extend %backface-visibility;
    // Additional animation styles
}
```