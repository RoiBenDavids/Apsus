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
            <NavLink to='/'> <div className='logo'>Apsus</div></NavLink>
            <Search />
            <div className={this.state.clipboardClass}><NavLink to='/keep'><i className="fas fa-clipboard"></i> </NavLink></div>
            <div className={this.state.envelopeClass}> <NavLink to='/mail'><i className="fas fa-envelope"></i></NavLink></div>

            <i onClick={()=>this.animate()} className="fas fa-th"></i>

        </nav>
    }
}
