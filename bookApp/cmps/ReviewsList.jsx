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






render() {
    return (
        <div>
            {this.props.reviews &&
                (this.props.reviews).map(review =>
                    <div key={review.id}>
                        <h4>{review.rate}</h4>
                        <h4>{review.txt}</h4>
                        <button onClick={() => { this.onEditReview(review) }}>edit</button>
                        <button onClick={() => { this.onDeleteReview(review) }}>delete</button>
                    </div>
                )}
        </div>
    )
}

}