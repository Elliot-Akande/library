const bookDisplay = document.querySelector("#book-display");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title 
    this.author = author 
    this.pages = pages 
    this.read = read 

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach(book => {
        const bookCard = document.createElement("DIV");
        bookCard.classList.add("book-card");

        const title = document.createElement("P");
        const author = document.createElement("P");
        const pages = document.createElement("P");
        const read = document.createElement("P");

        title.classList.add("book-title");
        author.classList.add("book-author");
        pages.classList.add("book-pages");
        read.classList.add("book-read");

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

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 295, false);
let nineteenEightyFour = new Book("1984", "George Orwell", 300, true);
let hitchhikersGuideToTheGalaxy = new Book("Hitchhiker's Guide to the Galaxy", "Douglas Adams", 420, true);
let grapesOfWrath = new Book("Grapes of Wrath", "John Steinbeck", 302, false);

addBookToLibrary(theHobbit);
addBookToLibrary(nineteenEightyFour);
addBookToLibrary(hitchhikersGuideToTheGalaxy);
addBookToLibrary(grapesOfWrath);

displayBooks();

