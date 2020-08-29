import { Search } from "./Search.jsx"
const { NavLink,withRouter } = ReactRouterDOM

export class NavBar extends React.Component {
    state={
        envelopeClass:'envelopeN',
        clipboardClass:'clipboard',
        shown:false

    }

    componentDidMount() {
        // console.log(this.props.location.pathname);
       
    }
   
    animate=()=>{
        if(this.state.envelopeClass==='envelopeN downEnv')this.setState({envelopeClass:'envelopeN', clipboardClass:'clipboard'})
        else this.setState({envelopeClass:'envelopeN downEnv', clipboardClass:'clipboard downClip'})

    }

    shown=()=>{
        if(this.state.shown)return 'links-container flex justify-around'
        return 'links-container flex justify-around unshown-navbar'
    }


    

    render() {
       return <nav className='nav-bar flex justify-between align-center'>
            <NavLink to='/'> <div className='logo'>Apsus</div></NavLink>
            <Search />
            <i onClick={()=>this.setState({shown:!this.state.shown})} className="fas fa-th"></i>
            <div className={this.shown()}>
            <div className=''><NavLink to='/keep'><i className="fas fa-clipboard"></i> </NavLink></div>
            <div className=''> <NavLink to='/mail'><i className="fas fa-envelope"></i></NavLink></div>
            <div className=''> <NavLink to='/book'><i className="fas fa-book"></i></NavLink></div>
            </div>


        </nav>
    }
}
