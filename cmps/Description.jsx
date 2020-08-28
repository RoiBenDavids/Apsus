export class Description extends React.Component {

    state = {
        text: ''
    }

    componentDidMount() {
        this.setText();


    }

    setText = () => {
        // let text;
        // if (this.props.text.length < 100) {
        //     text = this.props.text;
        // } else {
        //     text = this.props.text.substring(0, 100)
        // }
        const text = (this.props.text.length < 100)? this.props.text:this.props.text.substring(0, 100);
        this.setState({ text })
    }

    readMore = () => {
        if (this.props.text !== this.state.text) this.setState({ text: this.props.text })
        else this.setText();
    }

    render() {

        return <p className="book-description">
            {this.state.text}
            {(this.props.text.length > 100) && <span onClick={this.readMore}>...</span>}
        </p >
    }

}