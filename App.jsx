import { Home } from './pages/Home.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { KeepApp } from './keepApp/KeepApp.jsx'
import { MailApp } from './mailApp/MailApp.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
export class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <header>
                        <NavBar/>
                    </header>
                    <main>
                        <Switch>
                            <Route component={ KeepApp } path="/keep" />
                            <Route component={ MailApp } path="/mail" />
                            <Route component={ Home } path="/" />
                        </Switch>
                    </main>

                </div>
            </Router>
        )
    }
}

