const myLibrary = loadLibraryFromLocalStorage(); 
render(); 

function loadLibraryFromLocalStorage() {
  const libraryJSON = localStorage.getItem('myLibrary');
  return libraryJSON ? JSON.parse(libraryJSON) : [];
}

function saveLibraryToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
    /*     if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    } this.read = !this.read; is the same but on the sort cut
     this.read = this.read ? false : true;    */ 
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
  saveLibraryToLocalStorage();
}

function render() {
  let libraryEl = document.getElementById("library");

  libraryEl.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");

    bookEl.classList.add("book-item");

    bookEl.innerHTML = `<h1> ${book.title}</h1>
        <h3> By: ${book.author}</h3>
        <p>Pages: ${book.pages}</p>
        <p> Read: ${book.read ? "Yes" : "No yet"}</p>
        <button class="remove-btn" onclick="removeBook(${i})">Delete</button>
        <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
        `;

    libraryEl.appendChild(bookEl);
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
  saveLibraryToLocalStorage();
}

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  console.log(myLibrary);

  render(); 
  saveLibraryToLocalStorage();
}

let newBookntn = document.getElementById("new-book-btn");
newBookntn.addEventListener("click", function () {
  let newBookntn = document.getElementById("new-book-form");
  newBookntn.style.display = "block";
});



let form = document.getElementById("new-book-form")

document
  .getElementById("new-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();

    form.style.display = "none";
    
  });
