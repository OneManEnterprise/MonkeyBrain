//const addCSS = css => {document.head.appendChild(document.createElement("style")).innerHTML=css};
//const css = "outline:green solid 10px;";
//const notcss = "outline:white;";

function scrollIntoMidView(element) {
  const elementRect = element.getBoundingClientRect();
  const scrollTopOfElement = elementRect.top + elementRect.height / 2;
  const scrollY = scrollTopOfElement - (window.innerHeight / 2);
  window.scrollTo(0, scrollY);
}

function convertMS(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
};
