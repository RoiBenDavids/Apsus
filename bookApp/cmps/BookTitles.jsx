import { bookService } from '../service/book-service.js'


export function BookTitles({ list, renderBook, clear }) {

    const bookList = (list.length !== 0) ? list.items.map(item => { return { id: item.id, title: item.volumeInfo.title } }) : []

    var addBook = (book) => {
        console.log(book);
        let newBook = {
            id: book.id,
            title: (book.volumeInfo && book.volumeInfo.title) ? book.volumeInfo.title : '',
            subtitle: (book.volumeInfo && book.volumeInfo.subtitle) ? book.volumeInfo.subtitle : '',
            authors: (book.volumeInfo && book.volumeInfo.authors) ? [...book.volumeInfo.authors] : [],
            publishedDate: (book.volumeInfo && book.volumeInfo.publishedDate) ? book.volumeInfo.publishedDate : '',
            description: (book.volumeInfo.description) ? book.volumeInfo.description : '',
            pageCount: (book.volumeInfo.pageCount) ? book.volumeInfo.pageCount : 0,
            thumbnail: (book.volumeInfo.imageLinks.thumbnail) ? book.volumeInfo.imageLinks.thumbnail : '',
            listPrice: {
                amount: (book.saleInfo.listPrice && book.saleInfo.listPrice.amount) ? book.saleInfo.listPrice.amount : 0,
                currencyCode: (book.saleInfo.listPrice && book.saleInfo.listPrice.currencyCode) ? book.saleInfo.listPrice.currencyCode : 'ILS',
                isOnSale: false
            }
        }
        bookService.addBook(newBook);
        renderBook();
        clear();
    }

    return (

        <div className='add-book-list'>
            {bookList.map((item, idx) => {
                return (
                    <div key={item.id} className='title'>
                        <p>{item.title}</p>
                        <button onClick={() => { addBook(list.items[idx]) }}>+</button>
                    </div>
                )
            })
            }
        </div>
    )





}