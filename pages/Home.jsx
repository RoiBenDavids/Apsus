const { Link } = ReactRouterDOM
export class Home extends React.Component {

    render() {
        return (
            <section className='home'>
                <div className='envelope flex align-center justify-center'>
                <Link to='/keep'><i className="fas fa-clipboard"></i> </Link>
                <Link to='/mail'><i className="fas fa-envelope"></i></Link>
                    
                    
                </div>
            </section>
        )
    }
}