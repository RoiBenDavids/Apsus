import eventBus from '../services/event-bus-service.js'

export class Notification extends React.Component {//css type style 
    state = {
        isShown: false,
        msg: '',
        type: ''
    }
    unsubscribe;
    componentDidMount() {
        this.unsubscribe = eventBus.on('notify', (data) => {
            console.log(data);
            this.setState({ isShown: true, msg: data.msg, type: data.type })
            setTimeout(() => this.setState({ isShown: false }), 3000)
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        const { isShown, msg, type } = this.state
        return (
            
            <div className={ `notification-box ${type}` }>
                { isShown && <span onClick={ () => this.setState({ isShown: false }) }><i className="fas fa-times"></i></span> }
                { isShown && <h2>Notification - { msg }</h2> }
            </div>
        )
    }
}
