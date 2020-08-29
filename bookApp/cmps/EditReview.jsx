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

    changeRate = (rate) => {
        this.setState({ rate })
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
                    <i onClick={() => { this.changeRate(idx + 1) }} className="fas fa-star"></i>
                </div>
            )}
            {fiveMinusArr.map((i, idx) =>
                <div key={idx}>
                    <i onClick={() => { this.changeRate(this.state.rate + idx + 1) }} className="far fa-star"></i>
                </div>
            )}
        </div>
    }

    render() {
        return (
            <div className='edit-book-container' >
                <h2>add review</h2>
                <form className='flex align-center' onSubmit={(ev) => { this.createReview(ev) }}>
                    <div className='flex align-center'>
                        {this.getRate(this.state.rate)}
                    </div>
                    <div className='flex align-center'>

                        <textarea rows='3' name="txt" value={this.state.txt}
                            placeholder="Your review" type="text"
                            onChange={ev => this.handleChange(ev.target)}
                        />
                    </div>
                    <div className='save-review-btn'>
                        <button  ><i className="far fa-save"></i></button>
                    </div>
                </form>
            </div>
        )
    }
}