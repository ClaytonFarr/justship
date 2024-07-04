# Converting HTML to Pug

Prompt: `convert this source code to a Svelte component using @html-to-pug-rules.md as a guide`

## Goal

- skip any preamble, comments or summary and simply return converted code without extra comments, unless something needs clarification from the user
- successfully, accurately, and comprehensively convert source markup and script content to Pug / TypeScript, following guidelines below and current best practices for SvelteKit 2 and Svelte 5
- print to fully converted source code, including all script content, to the console as a single document

## Guidelines

- Pug markup is enclosed in a `<template lang='pug'>` block
- write JavaScript as TypeScript in a `<script lang='ts'>` block that precedes the markup
- replace fixed text values with variables that can be accessed via a parent component
  - e.g. a heading `<h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Deploy to the cloud with confidence</h1>` creates an exported variable in the script block `export let headingText: string = 'Deploy to the cloud with confidence'` and uses the variable in the markup `h1.mt-10.text-4xl.font-bold.tracking-tight.text-gray-900.sm_text-6xl {headingText}`
- when using variables within the pug markup use brackets instead of equal sign
  - e.g. `h1 {headingText}`, NOT `h1=headingText`
- when using variables in attributes, wrap brackets in quotes
  - e.g. `h1(class='{headingText}')`, NOT `h1(class=headingText)`
- when using functions in attributes, wrap brackets in quotes and prefix equal sign with an exclamation point
  - e.g. `button(onclick!='{() -> variable = !variable}')`, NOT `button(onclick='{() -> variable = !variable}')`
- Svelte event handlers should use new syntax that omits colon
  - e.g. `button(onclick!='{() -> variable = !variable}')`, NOT `button(on:click!='{() -> variable = !variable}')`
- write classes in short `dot` Pug syntax, except for classes that contain periods, slashes, or brackets in the class name - these should be added as in the 'class' attribute:
  - e.g. `<div class='class-name-1.5 class-name-2/4 class-name-3 class-name-4 class-name-[10px]'>` becomes `div.class-name-3.class-name-4(class='class-name-1.5 class-name-2/4 class-name-[10px]')`
  - e.g. `<img class='w-[76rem] rounded-md' alt='alt text'>` becomes `img.rounded-md(class='w-[76rem]', alt='alt text')`
  - e.g. `<p class='px-3.5 py-2.5 font-medium'>` becomes `p.font-medium(class='px-3.5 py-2.5')`
  - e.g. `<a class='px-3.5 py-2.5 font-medium'>` becomes `a.font-medium(class='px-3.5 py-2.5')`
- any colons in Tailwind classes need to be replaced by underscores
  - e.g. `<div class='sm:text-lg hover:text-red-500'>` becomes `div.sm_text-lg.hover_text-red-500`
  - e.g. `<div class="focus-visible:outline focus-visible:outline-2">` becomes `div(class="focus-visible_outline focus-visible_:_outline-2")`
- if/else/each blocks use the Svelte Preprocess Pug syntax (no spaces, expression wrapped in parentheses and quotes)
  - e.g. `+if('variable')`, `+else`, `+elseif('variable-two')`, `+each('navItems as items')`
- each blocks are written in the syntax of 'groupName as itemName'
  - e.g. `+each('navItems as item')`, NOT `+each('items in navItems')`
- else/else if blocks must be indented under the parent if/else/each block
- separate Pug element attributes with a comma space
- replace source markup Tailwind colors for actions, text content, inputs, borders (rules), and backgrounds (surfaces) with equivalent Tailwind project colors (see tailwind.config.js excerpt below)
  - e.g. `<div class='bg-indigo-600 hover:bg-indigo-500'>` becomes `div.bg-action.hover_bg-action-hover`
  - e.g. `<p class='text-gray-800'>` becomes `p.text-content-body`
- replace svg icons with closest equivalent from Lucide icons
  - e.g. `<svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg>` adds an icon import in script block `import { ChevronRight } from 'lucide-svelte'` and replaces element with Icon element, `ChevronRight`
- replace references to logos with an image element that has a src attribute with the path to project logo
  - e.g. `<img class="h-11" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600" alt="Your Company">` becomes `img(src='logo.svg', alt='Your Company')`
- replace `href="#"` href placeholders with `href="#add"`
- as necessary convert HTML entities to their equivalent Pug syntax
  - e.g. `&amp;` becomes `&`
- only convert the existing markup and interaction, do not create or add any new elements, attributes or classes (unless they help accomplish an interaction indicated in the source)

### tailwind.config.js excerpt

```js
theme: {
    extend: {
      colors: {
        action: {
          DEFAULT: colors.sky[600],
          hover: colors.sky[500],
          active: colors.sky[400],
        },
        content: {
          heading: colors.slate[900],
          body: colors.slate[800],
          secondary: colors.slate[500],
          tertiary: colors.slate[400],
        },
        input: {
          dark: colors.slate[900],
          DEFAULT: colors.slate[300],
          light: colors.slate[200],
        },
        rule: {
          DEFAULT: colors.slate[500],
          light: colors.slate[200],
        },
        surface: {
          light: colors.slate[50],
          lightest: colors.white
        },
      },
    },
  },
}
```
