const elements = document.querySelectorAll('body, .title, .box, .blue, .button');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

elements.forEach(el => {
  observer.observe(el);
});


const text = "steven750MC";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("title").innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 150);
  }
}

window.addEventListener("load", type);
