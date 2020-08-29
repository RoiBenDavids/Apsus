const { Link } = ReactRouterDOM

export function BookPreview({ book }) {

    return <Link to={`/book/${book.id}`}>
        <article className="book-preview">
            <img src={book.thumbnail} alt="book" />
            <h3>{book.title}</h3>
            <h4>{book.subtitle}</h4>
        </article>
    </Link>
}