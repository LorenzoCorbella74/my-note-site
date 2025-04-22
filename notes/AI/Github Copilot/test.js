// scrivi una funzione per sommare due numeri
function sum(a, b) {
    return a + b;
}

// scrivi una funzione per sottrarre due numeri
function subtract(a, b) {
    return a - b;
}

// scrivi una classe per gestire dei libri

/**
 * Represents a book with a title and an author.
 * @class
 */
class Book {
    /**
     * Create a book.
     * @param {string} title - The title of the book.
     * @param {string} author - The author of the book.
     */
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    /**
     * Get the title of the book.
     * @returns {string} The title of the book.
     */
    getTitle() {
        return this.title;
    }

    /**
     * Get the author of the book.
     * @returns {string} The author of the book.
     */
    getAuthor() {
        return this.author;
    }

    /**
     * Set a new title for the book.
     * @param {string} newTitle - The new title of the book.
     */
    setTitle(newTitle) {
        this.title = newTitle;
    }

    /**
     * Set a new author for the book.
     * @param {string} newAuthor - The new author of the book.
     */
    setAuthor(newAuthor) {
        this.author = newAuthor;
    }

    // Add a method to get the book details
    
        
}

