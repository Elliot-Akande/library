const bookDisplay = document.querySelector("#book-display");
const newBookButton = document.querySelector("#new-book-button");
const newBookForm = document.querySelector("#new-book-form");
const submitNewBookButton = document.querySelector("#submit-new-book");

newBookButton.addEventListener("click", newBookPressed);
submitNewBookButton.addEventListener("click", submitNewBook);

let newBookFormDisplayed = false;
let removeBookButtons = [];
let readButtons = [];
let unreadButtons = [];
let myLibrary = [];

class Book {
    title;
    author;
    pages;
    read;

    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
    }

    setRead() {
        this.read = true;
    }

    setUnread() {
        this.read = false;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    while (bookDisplay.firstChild) bookDisplay.removeChild(bookDisplay.lastChild);
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("DIV");
        const bookDetails = document.createElement("DIV");
        const readStatus = document.createElement("DIV");

        bookCard.classList.add("book-card");
        bookDetails.classList.add("details-container");
        readStatus.classList.add("read-status");
        readStatus.classList.add('book-read', 'book-details');

        bookCard.setAttribute('data-index', index);

        const title = document.createElement("P");
        const author = document.createElement("P");
        const pages = document.createElement("P");
        const unread = document.createElement("BUTTON");
        const read = document.createElement("BUTTON");
        const remove = document.createElement("BUTTON");

        title.classList.add('book-title', 'book-details');
        author.classList.add('book-author', 'book-details');
        pages.classList.add('book-pages', 'book-details');
        remove.classList.add('book-remove', 'book-details');

        read.classList.add('read');
        unread.classList.add('unread');
        book.read ? read.classList.add('current-read-status') : unread.classList.add('current-read-status');

        title.innerText = book.title
        author.innerText = book.author
        pages.innerText = `${book.pages} pages`
        unread.innerText = "Unread"
        read.innerText = "Read"
        remove.innerText = "Remove";

        readStatus.appendChild(unread);
        readStatus.appendChild(read);

        bookDetails.appendChild(title);
        bookDetails.appendChild(author);
        bookDetails.appendChild(pages);
        bookDetails.appendChild(readStatus);
        bookDetails.appendChild(remove);

        bookCard.appendChild(bookDetails);
        bookCard.appendChild(remove);
        bookDisplay.appendChild(bookCard);

        removeBookButtons = document.querySelectorAll(".book-remove");
        readButtons = document.querySelectorAll(".read");
        unreadButtons = document.querySelectorAll(".unread");

        removeBookButtons.forEach(button => button.addEventListener("click", removeBook));
        readButtons.forEach(button => button.addEventListener("click", setRead));
        unreadButtons.forEach(button => button.addEventListener("click", setUnread));
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
        document.querySelector('#unread-radio').checked = true;
    }
}

function removeBook() {
    const index = this.parentElement.getAttribute("data-index");
    myLibrary.splice(index, 1);
    displayBooks();
}

function setRead() {
    let book = myLibrary[this.parentElement.parentElement.parentElement.getAttribute("data-index")];
    book.setRead();
    displayBooks();
}

function setUnread() {
    let book = myLibrary[this.parentElement.parentElement.parentElement.getAttribute("data-index")];
    book.setUnread();
    displayBooks();
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 295, false);
let nineteenEightyFour = new Book("1984", "George Orwell", 300, true);
let hitchhikersGuideToTheGalaxy = new Book("Hitchhiker's Guide to the Galaxy", "Douglas Adams", 420, true);
let grapesOfWrath = new Book("Grapes of Wrath", "John Steinbeck", 302, false);
let prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen", 392, false);
let animalFarm = new Book("Animal Farm", "George Orwell", 130, true);
let theOdyssey = new Book("The Odyssey", "Homer", 840, false);
let dune = new Book("Dune", "Frank Herbert", 790, true);

addBookToLibrary(theHobbit);
addBookToLibrary(nineteenEightyFour);
addBookToLibrary(hitchhikersGuideToTheGalaxy);
addBookToLibrary(grapesOfWrath);
addBookToLibrary(prideAndPrejudice);
addBookToLibrary(animalFarm);
addBookToLibrary(theOdyssey);
addBookToLibrary(dune);

displayBooks();

