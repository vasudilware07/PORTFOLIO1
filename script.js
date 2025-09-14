let sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwaUm6OoPT2AEgbbENdAju9sI5e1QWrYOFKkG5xyok7lUZxUYGSc-uzStg9KFJbEIzCkw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerHTML = "Your Message is Submitted ✅";
      setTimeout(function(){
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

// Typewriter effect
document.addEventListener('DOMContentLoaded', () => {
  const headerText = document.querySelector('.header-text');
  if (!headerText) return;

  const webDeveloperEl = headerText.querySelector('p');
  const h1Elements = headerText.querySelectorAll('h1');
  if (webDeveloperEl) webDeveloperEl.style.visibility = 'visible';

  let fullText = '';
  let htmlStructure = [];

  h1Elements.forEach(el => {
    Array.from(el.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        fullText += node.textContent;
        htmlStructure.push({ type: 'text', content: node.textContent });
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
        fullText += node.textContent;
        htmlStructure.push({ type: 'span', content: node.textContent });
      }
    });
  });

  h1Elements.forEach(el => el.innerHTML = '');

  let charIndex = 0;
  let structureIndex = 0;
  let currentElement = h1Elements[0];

  function typeText() {
    if (charIndex < fullText.length) {
      const char = fullText[charIndex];

      if (structureIndex < htmlStructure.length) {
        const currentStructure = htmlStructure[structureIndex];

        if (currentStructure.type === 'text') {
          currentElement.innerHTML += char;
        } else if (currentStructure.type === 'span') {
          if (!currentElement.querySelector('span')) {
            const span = document.createElement('span');
            currentElement.appendChild(span);
          }
          currentElement.querySelector('span').textContent += char;
        }

        if (charIndex === fullText.indexOf('Dilware') - 1) {
          currentElement = h1Elements[1];
        }

        if (charIndex === currentStructure.content.length - 1 + fullText.indexOf(currentStructure.content)) {
          structureIndex++;
        }
      }

      charIndex++;
      setTimeout(typeText, 50);
    }
  }

  typeText();
});
