const { NavLink,withRouter } = ReactRouterDOM
class _Search extends React.Component {
    state={

    }

    componentDidMount() {
        console.log(this.props);
    }
 
    render() {
        return <div></div>
       
    }

}
export const Search = withRouter(_Search)