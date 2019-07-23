import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./views/login"

import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './Homepage';
import { LoginPage } from './views/login';
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

export default () => (

           <Router>
               <div>
                   <PrivateRoute exact path="/" component={HomePage} />
                   <Route path="/login" component={LoginPage} />
               </div>
           </Router>

);
