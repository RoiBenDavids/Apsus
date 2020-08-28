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
        let rate= '🌟'.repeat(num);
        rate+='⭐'.repeat(5-num)
        return rate
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
                                <button onClick={() => { this.onEditReview(review) }}><i class="fas fa-edit"></i></button>
                                <button onClick={() => { this.onDeleteReview(review) }}><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    )}
            </div>
        )
    }

}