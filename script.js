class quest{
    constructor(title){
        this.title = title;
    }
}

// --------------------

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    } 

    static addBookToList(book){
         const list = document.querySelector('#book-list');

         const row = document.createElement('tr');

         row.innerHTML = `
         <td>${book.title}</td>
         <td><a href="#" class="btn btn-danger btn-sm
         danger">-</a></td>
        `;

       list.appendChild(row);  
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields(){
        document.querySelector('#title').value = '';
    }
}


document.addEventListener('DOMContentLoaded', UI.displayBooks);   // Event: Display Books

// ------------------ 

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    } 

    static removeBook(title){
        const books = Store.getBooks();
 
        books.forEach((book, index) => {
            if(book.title === title){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// ---------------- 


// Event: Remove a Book
document.querySelector('#book-list').addEventListener( 'click', (e) => {
   
   // Remove book from UI
    UI.deleteBook(e.target)

   // Remove book from store 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

// Show Remove book
    UI.showAlert('Book Removed', 'success');

}); 

// --------------- 

// Event: Add a Book
document.querySelector('#book-form').addEventListener( 'submit', (e) => {
    // Prevent actual submit
    e.preventDefault();


    // Get form values
    const title = document.querySelector('#title').value;

    // Validate
    if(title === '') {
        UI.showAlert('Please fill in all fields','danger'); 
    } else {
    // Instatiate book
    const book = new quest(title);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to Store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
    }
}); 
