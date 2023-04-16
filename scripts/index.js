let urlSaved = [];
const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const ulEl = document.querySelector('#ul-el');
const urlFromStorage = JSON.parse(localStorage.getItem('urlSaved'));
const deleteBtn = document.querySelector('#delete-btn');
const tabBtn = document.querySelector('#tab-btn');

if (urlFromStorage) {
  urlSaved = urlFromStorage;
  renderLeads(urlSaved);
}

inputBtn.addEventListener('click', function () {
  urlSaved.push('https://' + inputEl.value);
  inputEl.value = '';
  localStorage.setItem('urlSaved', JSON.stringify(urlSaved));
  renderLeads(urlSaved);
});

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  urlSaved = [];
  renderLeads(urlSaved);
});

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    urlSaved.push(tabs[0].url);
    inputEl.value = '';
    localStorage.setItem('urlSaved', JSON.stringify(urlSaved));
    renderLeads(urlSaved);
  });
});

function renderLeads(url) {
  ulEl.innerHTML = '';
  let a;
  let li;
  for (let i = 0; i < url.length; i++) {
    a = createElementA(url[i]);
    li = createElementLi(a);
    ulEl.append(li);
  }
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
