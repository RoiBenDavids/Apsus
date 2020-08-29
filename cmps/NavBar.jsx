import { Search } from "./Search.jsx"
const { NavLink,withRouter } = ReactRouterDOM

export class NavBar extends React.Component {
    state={
        envelopeClass:'envelopeN',
        clipboardClass:'clipboard',

    }

    componentDidMount() {
        // console.log(this.props.location.pathname);
       
    }
   
    animate=()=>{
        if(this.state.envelopeClass==='envelopeN downEnv')this.setState({envelopeClass:'envelopeN', clipboardClass:'clipboard'})
        else this.setState({envelopeClass:'envelopeN downEnv', clipboardClass:'clipboard downClip'})

    }

    

    render() {
       return <nav className='nav-bar flex justify-between align-center'>
            <NavLink to='/'> <div className='logo'>Luca</div></NavLink>
            <Search />
            <i className="fas fa-th"></i>
            <div className='links-container flex justify-around'>
            <div className=''><NavLink to='/keep'><i className="fas fa-clipboard"></i> </NavLink></div>
            <div className=''> <NavLink to='/mail'><i className="fas fa-envelope"></i></NavLink></div>
            <div className=''> <NavLink to='/book'><i className="fas fa-book"></i></NavLink></div>
            </div>


        </nav>
    }
}
