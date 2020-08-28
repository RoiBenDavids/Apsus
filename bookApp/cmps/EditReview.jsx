import { reviewService } from '../service/review-service.js'
import eventBus from '../../services/event-bus-service.js'
export class EditReview extends React.Component {

    state = {
        rate: 0,
        txt: ''
    }

    unsubscribe;
    componentDidMount() {
        this.unsubscribe = eventBus.on('onEdit', (review) => {
            console.log(review);
            this.setState({ ...review })

        })
    }



    createReview = (ev) => {
        ev.preventDefault();
        var review = { ...this.state };
        if (this.state.id) reviewService.editReview(this.props.bookId, review)
        else reviewService.addReview(this.props.bookId, review)
        reviewService.getBookReviewsById(this.props.bookId)
            .then(bookReviews => this.props.renderReviews([...bookReviews.reviews]))
        this.setState({ rate: 0, txt: '' })
    }

    handleChange = (target) => {
        this.setState({ [target.name]: target.value })
    }





    render() {
        return (
            <div className='edit-book-container' >
                {/* <form onSubmit={(ev) => { this.createReview(ev) }}> */}
                <form className='flex align-center' onSubmit={(ev) => { this.createReview(ev) }}>
                    <div className='flex align-center'>
                        <label htmlFor="rate">Rate:</label>
                        <input name="rate" value={this.state.rate}
                            type="range" min='1' max='5'
                            onChange={ev => this.handleChange(ev.target)}
                        />
                    </div>
                    <div className='flex align-center'>

                        <label htmlFor="txt">Your review:</label>
                        <textarea name="txt" value={this.state.txt}
                            placeholder="Your review" type="text"
                            onChange={ev => this.handleChange(ev.target)}
                        />
                    </div>
                    <div className='save-review-btn'>
                        <button  ><i class="far fa-save"></i></button>
                    </div>
                </form>
            </div>
        )
    }

}