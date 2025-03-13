import { hexp } from '../lib/hexp.js';

describe('hexp', () => {
  it('creates a simple element', () => {
    const hr = hexp(['hr']);

    expect(hr.tagName).toBe('HR');
  });

  it('creates an element without attributes', () => {
    const btn = hexp(['button', {}, 'The text']);

    expect(btn.tagName).toBe('BUTTON');
    expect(btn.textContent).toBe('The text');
  });

  it('creates an element with primitive attributes', () => {
    const h1 = hexp(
      ['h1', { class: 'myClass' }, 'The text']
    );

    expect(h1.tagName).toBe('H1');
    expect(h1.className).toBe('myClass');
    expect(h1.textContent).toBe('The text');
  });

  it('creates an element with object attributes', () => {
    const h1 = hexp(
      ['h1', { style: { color: 'red' }}]
    );

    expect(h1.tagName).toBe('H1');
    expect(h1.style.color).toBe('red');
  });

  it('creates an element with event listeners', () => {
    const mockClick = jest.fn();
    const button = hexp(
      ['button', { onClick: mockClick }, 'Click me']
    );

    button.click();
    expect(button.textContent).toBe('Click me');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('creates nested elements', () => {
    const section = hexp(
      ['section', { class: 'section-class' },
        ['h1', { 'data-text': 'n00t n00t' } , 'a text'],
        ['p', { class: 'paragraph-class', style: { display: 'none' }},
          'another text'
        ]
      ]
    );

    expect(section.tagName).toBe('SECTION');
    expect(section.className).toBe('section-class');
    expect(section.childElementCount).toBe(2);

    const h1 = section.querySelector('h1');
    expect(h1.textContent).toBe('a text');
    expect(h1.getAttribute('data-text')).toBe('n00t n00t');

    const p = section.querySelector('p');
    expect(p.className).toBe('paragraph-class');
    expect(p.textContent).toBe('another text');
  });

  describe('custom components', () => {
    it('creates a simple component', () => {
      function hexpComponent() {
        return (['p', {}, 'hello']);
      }

      const component = hexp([hexpComponent]);

      expect(component.tagName).toBe('P');
      expect(component.textContent).toBe('hello');
    });

    it('creates a component with attributes', () => {
      function hexpComponent(attrs) {
        return (['p', attrs, 'i can receive attrs']);
      }

      const component = hexp([hexpComponent, { class: 'aClass' }]);

      expect(component.tagName).toBe('P');
      expect(component.className).toBe('aClass');
      expect(component.textContent).toBe('i can receive attrs');
    });

    it('creates a component with children and attributes', () => {
      function hexpComponent(attrs, content) {
        return ['p', attrs, ...content];
      }

      const component = hexp(
        [hexpComponent, { class: 'aClass' },
          ['span', {}, 'hello'],
          ['span', {}, 'world'],
        ]
      );

      expect(component.tagName).toBe('P');
      expect(component.className).toBe('aClass');

      const [ span1, span2 ] = component.querySelectorAll('span');
      expect(span1.textContent).toBe('hello');
      expect(span2.textContent).toBe('world');
    });
  });
});
