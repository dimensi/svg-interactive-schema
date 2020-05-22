import anime from "animejs";

const iframe = document.getElementById("svg-iframe");
iframe.onload = function () {
  this.before((this.contentDocument.body || this.contentDocument).children[0]);
  this.remove();
  main();
};

const AMT = 150;

function main() {
  const svg = document.querySelector("svg");
  const pointers = Array.from(
    svg.querySelectorAll('[id^="to-"]'),
    (pointer) => ({
      to: pointer.id.replace(/to-(\w+-\d)(-\d)?/, "$1"),
      el: pointer,
    })
  );
  pointers.forEach(({ el, to }) => {
    moveTo(el, to, svg);
  });
  const element = document.getElementById("question-1");
  const s = element.getBBox();
  const newView = calcViewPosition(s);
  anime({
    targets: svg,
    viewBox: newView,
    easing: "easeOutCirc",
    duration: 2e3,
    delay: 2e3,
    complete() {
      document.body.classList.add("loaded");
    },
  });
}

const calcViewPosition = (s) =>
  `${s.x - AMT} ${s.y - AMT} ${s.width + AMT * 2} ${s.height + AMT * 2}`;

/**
 *
 * @param {Element} el
 * @param {string} to
 */
function moveTo(el, to, svg) {
  const moveTo = document.getElementById(to);
  const s = moveTo.getBBox();
  const newView = calcViewPosition(s);
  el.addEventListener("click", () => {
    anime({
      targets: svg,
      viewBox: newView,
      easing: "easeOutCirc",
      duration: 2e3,
    });
  });
}
