import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";
import { userService } from './components/user.service';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
        });
    }

    render() {
        const { user, users } = this.state;
        return (
            <Router basename={process.env.REACT_APP_BASENAME || ""}>
            <div>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                );
              })}
            </div>
          </Router>
        );
    }
}

export { HomePage };