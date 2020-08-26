const { NavLink } = ReactRouterDOM
export function NavBar(){

    return(
        <nav className='nav-bar flex justify-between align-center'>
            <NavLink to='/'> <div>LOGO</div></NavLink>
            <input type="text"/>
            <div className='flex'>
                <NavLink to='/mail'><h3>Mail</h3></NavLink>
                <NavLink to='/keep'><h3>Keep</h3> </NavLink>
            </div>
            
        </nav>
    )

}