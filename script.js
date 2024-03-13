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
        <div class="display-flex">
        <h3> By: ${book.author}</h3>
        <p>Pages: ${book.pages}</p>
        </div>
        <p>  ${book.read ? "Read" : "No yet"}</p>
        <button class="toggle-read-btn" onclick="toggleRead(${i})">Read</button>
        <button class="remove-btn"  onclick="removeBook(${i})">Delete</button>
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

let newBookBtn = document.getElementById("new-book-btn");
let newBookForm = document.getElementById("new-book-form");

newBookBtn.addEventListener("click", function () {
  newBookForm.classList.toggle("show");
});

let form = document.getElementById("new-book-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addBookToLibrary();
  form.classList.remove("show");
});




function removeBook(index) {
  const bookEl = document.querySelector(`#library .book-item:nth-child(${index + 1})`);
  bookEl.classList.add('removing');

  setTimeout(() => {
      myLibrary.splice(index, 1);
      render();
      saveLibraryToLocalStorage();
  }, 900); 

}  

// function removeBook(index) {
//   // Preguntar al usuario si realmente desea eliminar el libro
//   const confirmation = confirm("¿Estás seguro de que quieres eliminar este libro?");

//   if (confirmation) {
//     const bookEl = document.querySelector(`#library .book-item:nth-child(${index + 1})`);
//     bookEl.classList.add('removing');

//     setTimeout(() => {
//       myLibrary.splice(index, 1);
//       render();
//       saveLibraryToLocalStorage();
//     }, 900);

//     alert("Libro eliminado exitosamente.");
//   } else {
//     alert("Operación de eliminación cancelada.");
//   }
// }





// THIS IS THE X TO CLOSE THE FORM 
document.querySelector('.error__close').addEventListener('click', function () {
  newBookForm.classList.remove('show');
});
