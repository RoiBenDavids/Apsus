const { NavLink } = ReactRouterDOM
export function NavBar() {

    return (
        <nav className='nav-bar flex justify-between align-center'>
            <NavLink to='/'> <div>LOGO</div></NavLink>
            <input type="text" />
            <div className='clipboard'><NavLink to='/keep'><i className="fas fa-clipboard"></i> </NavLink></div>
            <div className='envelopeN'> <NavLink to='/mail'><i className="fas fa-envelope"></i></NavLink></div>

            <i className="fas fa-th"></i>

        </nav>
    )

}