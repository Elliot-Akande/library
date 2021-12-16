const bookDisplay = document.querySelector("#book-display");
const newBookButton = document.querySelector("#new-book-button");
const newBookForm = document.querySelector("#new-book-form");
const submitNewBookButton = document.querySelector("#submit-new-book");

newBookButton.addEventListener("click", newBookPressed);
submitNewBookButton.addEventListener("click", submitNewBook);

let newBookFormDisplayed = false;
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    while (bookDisplay.firstChild) bookDisplay.removeChild(bookDisplay.lastChild);
    myLibrary.forEach(book => {
        const bookCard = document.createElement("DIV");
        bookCard.classList.add("book-card");

        const title = document.createElement("P");
        const author = document.createElement("P");
        const pages = document.createElement("P");
        const read = document.createElement("P");

        title.classList.add('book-title', 'book-details');
        author.classList.add('book-author', 'book-details');
        pages.classList.add('book-pages', 'book-details');
        read.classList.add('book-read', 'book-details');

        title.innerText = book.title
        author.innerText = book.author
        pages.innerText = `${book.pages} pages`
        read.innerText = `${book.read ? "Read" : "Unread"}`

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);

        bookDisplay.appendChild(bookCard);
    });
}

function newBookPressed() {
    !newBookFormDisplayed ? showNewBookForm() : hideNewBookForm();
}

function showNewBookForm() {
    newBookForm.setAttribute("style", "display: flex");
    newBookButton.setAttribute("style", "border-radius: 0.4rem 0.4rem 0 0")
    newBookFormDisplayed = true;
}

function hideNewBookForm() {
    newBookForm.setAttribute("style", "display: none");
    newBookButton.setAttribute("style", "border-radius: 0.4rem")
    newBookFormDisplayed = false;
}

function submitNewBook() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = (document.querySelector('input[name="isRead"]:checked').value === "true");

    if (title.length > 1 && author.length > 1 && pages > 0) {
        const book = new Book(title, author, pages, read);
        addBookToLibrary(book);
        displayBooks();

        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "0";
        document.querySelector('#unread').checked = true;
    }
}



let theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 295, false);
let nineteenEightyFour = new Book("1984", "George Orwell", 300, true);
let hitchhikersGuideToTheGalaxy = new Book("Hitchhiker's Guide to the Galaxy", "Douglas Adams", 420, true);
let grapesOfWrath = new Book("Grapes of Wrath", "John Steinbeck", 302, false);

addBookToLibrary(theHobbit);
addBookToLibrary(nineteenEightyFour);
addBookToLibrary(hitchhikersGuideToTheGalaxy);
addBookToLibrary(grapesOfWrath);

displayBooks();

