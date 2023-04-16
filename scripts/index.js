let urlSaved = [];
const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const ulEl = document.querySelector('#ul-el');
const urlFromStorage = JSON.parse(localStorage.getItem('urlSaved'));
const deleteBtn = document.querySelector('#delete-btn');
const tabBtn = document.querySelector('#tab-btn');

if (urlFromStorage) {
  urlSaved = urlFromStorage;
  renderApp(urlSaved);
}

inputBtn.addEventListener('click', function () {
  urlSaved.push('https://' + inputEl.value);
  inputEl.value = '';
  localStorage.setItem('urlSaved', JSON.stringify(urlSaved));
  renderApp(urlSaved);
});

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  urlSaved = [];
  renderApp(urlSaved);
});

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    urlSaved.push(tabs[0].url);
    localStorage.setItem('urlSaved', JSON.stringify(urlSaved));
    renderApp(urlSaved);
  });
});

function renderApp(url) {
  ulEl.innerHTML = '';
  loopElements(url);
}

function createElementA(link) {
  const a = document.createElement('a');
  a.setAttribute('href', link);
  a.setAttribute('target', '_blank');
  a.textContent = link;
  return a;
}

function createElementLi(childElement) {
  const li = document.createElement('li');
  li.append(childElement);
  return li;
}

function loopElements(arr) {
  let a;
  let li;
  for (let i = 0; i < arr.length; i++) {
    a = createElementA(arr[i]);
    li = createElementLi(a);
    ulEl.append(li);
  }
}
