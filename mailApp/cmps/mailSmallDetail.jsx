
const { Link } = ReactRouterDOM

export function MailSmallDetail({ mail }) {
    return (
        <div className='small-detail'>
            <div className='flex justify-between'>
                <h1>{mail.subject}</h1>
                <Link to={`/mail/${mail.id}`}><i className="fas fa-external-link-alt"></i></Link>  
            </div>
            <div className='flex'>
                <h3>{mail.username}</h3>
                <h4>{'<' + mail.from + '>'}</h4>
            </div>
            <p>{mail.body}</p>
        </div>
    )

}