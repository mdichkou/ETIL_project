import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Overview from "./views/Overview";
import EditArticle from "./views/EditArticle";
import EditPlace from "./views/EditPlace";
import AddNewPost from "./views/AddNewPost";
import Places from "./views/Places";
import SignIn from "./views/login";
import AddNewPlace from "./views/AddNewPLace";
import Tables from "./views/Tables";
import Articles from "./views/Articles";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/places" />
  },
  {
    path: "/overview",
    layout: DefaultLayout,
    component: Overview
  },
  {
    path: "/EditArticle/:serieID",
    layout: DefaultLayout,
    component: EditArticle
  },
  {
    path: "/EditPlace/:serieID",
    layout: DefaultLayout,
    component: EditPlace
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/places",
    layout: DefaultLayout,
    component: Places
  },
  {
    path: "/add-new-place",
    layout: DefaultLayout,
    component: AddNewPlace
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/articles",
    layout: DefaultLayout,
    component: Articles
  }
];
