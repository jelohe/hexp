# [ hexp ]

Lightweight, Concise and Composable HTML rendering in JS inspired by Lisp's S-expressions.


## DISCLAIMER

Hexp is an **EXPERIMENTAL** library, **use it at your own risk**.
Feel free to contribute.


### Syntax

H-expressions are arrays in which the first element is the tag, the second an Object Literal containing the attributes and the rest are H-expression children or plain text.

```js
[ 'button',               // Tag
  { class: 'my-button' }, // Attributes
  'click me!',            // Content
]
```

```js
['div', {},
  ['h1', {}, 'Hello,'],  // You can add as many hexp
  ['h2', {}, 'World!'],  // as you want as content
]
```

You can make complex html structures with hexp elements.
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

### Components

A component is a function that receives an array and returns a hexp.
You can then use function name as the first argument in a hexp.

##### Definition

```js
// Receives an array with attributes and a list of hexp (content)
function hexpComponent([attrs, content]) {
  const customAttrs = { class: 'myClass', ...attrs };
  return (
    ['div', customAttrs,
      ['h4', {}, 'Welcome'],
      ['h2', {}, 'to my website'],
      ['div', {}, ...content]]
  );
}
```

##### Usage

```js
// use the function reference as the tag
[hexpComponent, {}, 'the content']
```
