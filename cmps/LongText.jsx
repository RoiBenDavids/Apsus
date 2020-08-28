export class LongText extends React.Component {

    state = {
        text: ''
    }

    componentDidMount() {
        this.setText();


    }

    setText = () => {
        let charLength = 70;
        if (this.props.windowWidth < 630) {
            charLength = 15;
        } else if (this.props.windowWidth < 1030) {
            charLength = 30;
        } else if (this.props.windowWidth < 1200) {
            charLength = 50;
        }
        const leftOver = charLength - this.props.subject.length - 3;
        this.setState({ text: <p>{this.props.subject.length>charLength?this.props.subject.substring(0, charLength-3):this.props.subject+' - '} 
        <span>{this.props.body.substring(0,leftOver )+(leftOver<this.props.body.length?'...':'')}</span></p> })
        
    }

    readMore = () => {
        if (this.props.subject !== this.state.text) this.setState({ text: this.props.subject })
        else this.setText();
    }

    render() {

        return (
            this.state.text
        )
    }

}