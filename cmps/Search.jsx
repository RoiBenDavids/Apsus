const { NavLink, withRouter } = ReactRouterDOM
import eventBus from '../services/event-bus-service.js'
class _Search extends React.Component {
    state = {
        page: '/'

    }

    componentDidMount() {
        console.log(this.props);
    }
    componentDidUpdate() {
        let path = this.props.location.pathname
        path = path.split('/')[1] || '/'
        if (this.state.page !== path) this.setState({ page: path })

    }
    setSearch=(ev)=>{
        this.props.history.push(`/${this.state.page}?filterBy=search&search=${ev.target.value}`)
        eventBus.emit('search', { input:ev.target.value })
    }

    render() {
        if(this.state.page==='/') return <div></div>
        return <input onChange={this.setSearch} placeholder={'search ' + this.state.page} type="text" />


    }

}
export const Search = withRouter(_Search)