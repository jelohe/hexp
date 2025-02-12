# [ HEXP ]

Hexp is a lightweight library for rendering HTML elements and structures in Javascript. It uses a list structure similar to Lisp's S-expressions, making them easy to write, compose and reuse.

Because they are just arrays, you can store them in variables, return them from functions, pass them as arguments, etc.

## Insallation

Grab the minified filed inside /dist in this repo and include it in your project. No dependencies or build process required.

``` html
<script src="path/to/hexp.min.js"></script>
```


## Basic Syntax

A basic Hexp element is an array with three elements:

* Tag: The name of the HTML tag (as a string).
* Attributes: An object containing the element's attributes.
* Content: This can be plain text or hexp elements.


#### Example 1: Simple Button

```js
['button', {class: 'my-button'}, 'click me!']
```

This will generate the following HTML:

```html
<button class="my-button">click me!</button>
```

#### Example 2: Div with multiple elements

You can add as many children as you want as content:

```js
['div', {},
  ['h1', {}, 'Hello,'],
  ['h2', {}, 'World!']
]
```

Generates:

```html
<div>
  <h1>Hello,</h1>
  <h2>World!</h2>
</div>
```

## Attributes

Attributes are added as a plain object. You can include any standard HTML attributes, such as class, id, style and even event listeners like `onClick`.

```js
['button', { class: 'btn', onClick: ()=>alert('Clicked!') },
  'click me']
```

You can make complex html structures nesting hexp elements.
Get creative with the syntax and spacing.

```js
['div', { class: 'application' },
  ['main', {},
    ['p', {}, 'Hello,'],
    ['p',
      { class: 'clickable', onClick: () => console.log('clicked!')}, 
      'World']],
  ['footer',
    { class: 'auto-hide', 
      style: { 
        'background-color': '#ccc',
        position: 'absolute',
        bottom: 0}},
    ['ul', {},
      ['li', {}, 'Phone: +33 999 99 99 99'],
      ['li', {}, 'Email: my@email.com'],
      ['li', {},
        ['a', {href: 'mylink.com'}, 'Blog'],
        ['a', {href: 'github.com/mygh'}, 'Github']]]]]
```

## Components

A component is a function that returns a hexp.
You can then use the function reference as an hexp tag.

##### Definition

Receives an array:
* The first element will be the attributes.
* The second element is an array of hexp elements.

Returns a hexp structure:

```js
function hexpComponent([attrs, content]) {
  const customAttrs = { class: 'myClass', ...attrs };
  return (
    ['div', customAttrs,
      ['h4', {}, 'Welcome'],
      ['h2', {}, 'to my website'],
      ['div', {}, ...content]] // spread the content
  );
}
```

##### Usage

Use the function reference as the hexp tag:

```js
[hexpComponent, {}, 'the content']
```

## Rendering Hexp elements

Okay okay, hexp expressions are cool and all but, How do i actually render them?
The `hexp` function transform hexp trees into HTML Node elements. You can then use vanilla js to interact with it:

```js
const coolBtn = ['button', { onClick=>alert('Clicked!') }, 'Click me'];
const nodeEl = hexp(coolBtn);
document.body.appendChild(nodeEl);
```

## Notes

* Hexp is experimental, use it at your own risk.
* It's great for small projects due to its minimal and straightforward design.
* Hexp gives a lot of freedom, you can use it with most libraries or create your own framework with it.
