const { NavLink,withRouter } = ReactRouterDOM
class _Search extends React.Component {
    state={
        page:'/'

    }

    componentDidMount() {
        console.log(this.props);
    }
    componentDidUpdate() {
        console.log(this.props.location.pathname);
    }
 
    render() {
        return <div></div>
       
    }

}
export const Search = withRouter(_Search)