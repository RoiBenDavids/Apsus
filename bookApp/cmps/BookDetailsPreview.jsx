import { bookService } from '../service/book-service.js'
import { Description } from './Description.jsx'
import { EditReview } from './EditReview.jsx'
import { ReviewsList } from './ReviewsList.jsx'
const { Link } = ReactRouterDOM

export class BookDetailsPreview extends React.Component {


    state = {
        book: null,
        reviews: null
    }

    componentDidMount() {

        const bookId = this.props.match.params.bookId
        bookService.getBookById(bookId)
            .then(book => this.setState({ book }), () => console.log(this.state.book))
        // var book = bookService.getBookById(bookId)

    }

    getPublishAt() {
        var year = this.state.book.publishedDate
        var thisYear = new Date().getFullYear;
        if ((thisYear - year) <= 1) return `New publish at: ${year}`;
        else if (thisYear - year >= 10) return `Veteran Book publish at ${year}`
        else return `publish at ${year}`
    }

    getPages() {
        var numOfpages = this.state.book.pageCount;
        if (numOfpages > 500) return `Num of pages: ${numOfpages} long reading`
        if (numOfpages > 200) return `Num of pages: ${numOfpages} decent reading`
        return `Num of pages: ${numOfpages} light reading`
    }

    getPriceColor() {
        var price = this.state.book.listPrice.amount;
        if (price > 150) return { "color": "red" }
        if (price < 20) return { "color": "green" }
    }

    getCurr() {
        var curr = this.state.book.listPrice.currencyCode;
        switch (curr) {
            case "USD":
            case "CAD":
                return '$'
            case "EUR":
                return '€'
            case "JPY":
                return '¥'
            case "GBP":
                return '£'
            case "CHF":
                return 'Fr.'
            case "ILS":
                return '₪'
        }
    }

    setReviews = (reviews) => {
        this.setState({ reviews })
    }

    // setReviewOnInputs=(reviewId)=>{
    //     var review= this.state.reviews
    // }

    render() {

        if (!this.state.book) {
            return <h4>loading...</h4>
        }

        return <section className="book-details-preview">
            <img src={this.state.book.thumbnail} alt="book" />
            {this.state.book.isOnSale && <img src="../assets/img/sale.png" alt="book" />}
            <Link to='/book'><i className="fas fa-book"></i></Link>
            <h3>{this.state.book.title}</h3>
            <h4>{this.state.book.subtitle}</h4>
            <h4>{this.getPublishAt()}</h4>
            <h4>{this.getPages()}</h4>
            <h4 style={this.getPriceColor()}>price: {this.state.book.listPrice.amount}{this.getCurr()}</h4>
            <Description text={this.state.book.description} />
            <EditReview renderReviews={this.setReviews}  bookId={this.state.book.id} />
            <ReviewsList renderReviews={this.setReviews} bookId={this.state.book.id} reviews={this.state.reviews}  />
        </section>
    }
}