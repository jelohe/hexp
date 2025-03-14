export function hexp(hexpEl) {
  if (isComponent(hexpEl)) return hexpComponent(hexpEl);

  const [ tag, attrs = {}, ...content ] = hexpEl;

  const domEl = document.createElement(tag.toLowerCase());
  if (!isHTML(domEl)) 
    throw new Error(`[HEXP]: \`${tag}\` is not a valid HTML element`);

  hexpAttributes(domEl, attrs);
  hexpContent(domEl, content);

  return domEl;
}

function isComponent([tag]) { return typeof(tag) === 'function'; }
function hexpComponent([tag, attrs={}, ...content]) { 
  return hexp(tag(attrs, content));
}

function isHTML(domEl) {
  const invalidHtml = "[object HTMLUnknownElement]";
  return domEl != invalidHtml;
}

function hexpAttributes(domEl, attrs) {
  Object.entries(attrs).forEach(([name, value]) => {
    const prefix = name.slice(0, 2).toLowerCase();
    const isEvent = prefix === 'on';

    if (isEvent) 
      addEvent(domEl, name, value);
    else if (isObject(value)) 
      addObjectAttr(domEl, name, value);
    else 
      domEl.setAttribute(name, value);
  });
}

function addEvent(domEl, name, value) {
  const eventName = name.slice(2).toLowerCase();
  domEl.addEventListener(eventName, value);
}

function addObjectAttr(domEl, name, value) {
  const objValue = Object.entries(value)
    .map(([k,v]) => `${k}:${v};`)
    .join('');

  domEl.setAttribute(name, objValue);
}

function hexpContent(domEl, content) {
  content.forEach(hexpChild => {
    if (isString(hexpChild)) 
      domEl.appendChild(document.createTextNode(hexpChild));
    else if (isArray(hexpChild)) {
      domEl.appendChild(hexp(hexpChild));
    }
  });
}

const isArray = maybe => Array.isArray(maybe);
const isString = maybe => typeof(maybe) === 'string';
const isObject = maybe => maybe instanceof Object;
