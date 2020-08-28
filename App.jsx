import { Home } from './pages/Home.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { KeepApp } from './keepApp/KeepApp.jsx'
import { MailApp } from './mailApp/MailApp.jsx'
import { Notification } from './cmps/Notification.jsx'
import { Books } from './bookApp/cmps/Books.jsx'
import { BookDetailsPreview } from './bookApp/cmps/BookDetailsPreview.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
export class App extends React.Component {

    render() {
        return (
            <Router>
                <div >
                    <header>
                        <NavBar/>
                    </header>
                    <main>
                        <Switch>
                        <Route component={ BookDetailsPreview } path="/book/:bookId" />
                            <Route component={ KeepApp } path="/keep" />
                            <Route component={ MailApp } path="/mail" />
                            <Route component={ Books } path="/book" />
                            <Route component={ Home } path="/" />
                        </Switch>
                    </main>
                    <Notification/>
                </div>
            </Router>
        )
    }
}

