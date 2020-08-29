import { bookService } from '../service/book-service.js'
import { BookTitles } from './BookTitles.jsx'

export class AddBook extends React.Component {

    state = {
        bookName: '',
        results: []
    }

    getBookList = (bookName) => {
        bookService.getBookList(bookName)
            .then(bookList => { this.setState({ results: bookList }) })

    }

    handleChange = ({ target }) => {
        this.setState({ bookName: target.value }, () => this.getBookList(this.state.bookName))
    }

    clearSearching = () => {
        this.setState({ bookName: '', results: [] })
    }

    render() {
        return <div className='add-book-container'>
            <label htmlFor="">Add a book:</label>
            <input value={this.state.bookName} type="text" placeholder="Book name"
                onChange={this.handleChange} />
            <BookTitles clear={this.clearSearching} renderBook={this.props.renderBook} list={this.state.results} />
        </div>


    }
}