const { Link } = ReactRouterDOM
export class Home extends React.Component {

    render() {
        return (
            <section className='home'>
                <img src='https://www.schudio.com/wp-content/uploads/2018/09/homepage-background.png'></img>
                <h1>Hot apps for the hot nights</h1>
                <i href='' className="arrow fas fa-arrow-down"></i>
                <Link to='/keep'><i className="notes-home fas fa-clipboard"></i> </Link>
                <Link to='/mail'><i className="mail-home fas fa-envelope"></i></Link>
                <Link to='/book'><i className="books-home fas fa-book"></i></Link>
            </section>
        )
    }
}