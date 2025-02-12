# [ hexp ]

Lightweight, Concise and Composable HTML rendering in JS inspired by Lisp's S-expressions.


## DISCLAIMER

Hexp is an **EXPERIMENTAL** library, **use it at your own risk**.
Feel free to contribute.


### Syntax

H-expressions are arrays in which the first element is the tag, the second an Object Literal containing the attributes and the rest are H-expression children or plain text.

```js
[
    'button',               // Tag
    { class: 'my-button' }, // Attributes
     'click me!',           // Content
]
```

```js
['div', {},
    ['h1', {}, 'Hello,'],  // You can add as many nodes
    ['h2', {}, 'World!'],  // as you want as children
]
```

You can create a tree just like in HTML nesting hexp inside each other.

```js
['main', { class: 'application' },
    ['div', {},
        [p, {}, 'Hello,'],
        [p, {}, 'World'],
    ],
    ['footer', { style: { 'background-color': '#ccc' }}
        ['ul', {},
            ['li', {}, 'Phone: 999 99 99 99'],
            ['li', {}, 'Email: my@email.com'],
            ['li', {},
                ['a', {href: 'mylink.com'}, 'Blog'],
                ['a', {href: 'github.com/mygh'}, 'Github'],
            ]
        ]
    ]
]
```

### Components

A component is simply a function that receives an array and returns an H-exp.
You can then use hexp function names as the first argument in a H-exp.

##### Definition

```js
// Receives an array with attributes and a lisp of hexp children (content)
function hexpComponent([attrs, content]) {
    const customAttrs = { class: 'myClass', ...attrs };
    return ['p', customAttrs, ...content];
}
```

##### Usage

```js
// use the function reference as the 'tag'
[hexpComponent, {}, 'the content']
```

