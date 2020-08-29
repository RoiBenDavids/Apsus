import { reviewService } from '../service/review-service.js'
import eventBus from '../../services/event-bus-service.js'
export class ReviewsList extends React.Component {

    state = {
        reviews: []
    }

    componentDidMount() {
        reviewService.getBookReviewsById(this.props.bookId)
            .then(book => {
                if (book) {
                    this.props.renderReviews(book.reviews)
                    this.setState({ reviews: book.reviews })
                } else return Promise.reject('eror')
            })

    }

    onEditReview = (review) => {
        eventBus.emit('onEdit', { id: review.id, rate: review.rate, txt: review.txt })
    }

    onDeleteReview = (review) => {
        reviewService.remove(this.props.bookId, review.id)
        reviewService.getBookReviewsById(this.props.bookId)
            .then(book => { this.props.renderReviews([...book.reviews]) })
    }

    getRate = (num) => {
        var arr = []
        var fiveMinusArr = []
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }
        for (let i = 0; i < 5 - num; i++) {
            fiveMinusArr.push(i)

        }
        return <div className='flex justify-around'>

            {arr.map((i, idx) =>
                <div key={idx}>
                    <i className="fas fa-star"></i>
                </div>
            )}
            {fiveMinusArr.map((i, idx) =>
                <div key={idx}>
                    <i className="far fa-star"></i>
                </div>
            )}
        </div>
    }

    render() {
        return (
            <div className='reviews-list'>
                {this.props.reviews &&
                    (this.props.reviews).map(review =>
                        <div key={review.id}>

                            <h4>{this.getRate(review.rate)}</h4>

                            <h4>{review.txt}</h4>
                            <div className='reviews-list-btn flex justify-around'>
                                <button onClick={() => { this.onEditReview(review) }}><i className="fas fa-edit"></i></button>
                                <button onClick={() => { this.onDeleteReview(review) }}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    )}
            </div>
        )
    }

}