import { bookService } from '../service/book-service.js'
import { BookFilter } from './BookFilter.jsx'
import { BookPreview } from './BookPreview.jsx'
import { AddBook } from './AddBook.jsx'
// import eventBus from '../services/event-bus-service.js'
// import { BookDetailsPreview } from '../cmps/books-app/BookDetailsPreview.jsx'



export class Books extends React.Component {

    state = {
        filterBy: '',
        books: [],
        choosenBook: null
    }

    componentDidMount() {
        this.loadBooks();
    }


    loadBooks() {
        bookService.query()
            .then(books => {
                this.setState({ books })
            })
    }

    chooseBook = (book) => {

        this.setState({ choosenBook: book })
    }

    removeBook = (bookId) => {
        bookService.remove(bookId)
        this.loadBooks();
    }

    setFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    returnToHomePage = () => {
        this.setState({ choosenBook: null })
    }

    getBooksForDisplay() {
        const books = this.state.books.filter(book => book.title.includes(this.state.filterBy))
        return books;
    }




    render() {
        const books = this.getBooksForDisplay();
        return (
            <section className="books-app">
                <AddBook renderBook={() => this.loadBooks()} />
                <h2>Books</h2>
                <BookFilter onFilter={this.setFilter} />
                <ul className="book-list">
                    {
                        books.map(book =>
                            <li key={book.id}>
                                <BookPreview book={book} chooseBook={this.chooseBook} />
                                <button onClick={() => this.removeBook(book.id)}><i className="fas fa-trash"></i></button>
                            </li>
                        )
                    }

                </ul>
            </section>
        )
    }
}