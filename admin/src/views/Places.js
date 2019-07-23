import React from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
  NavLink,
  NavItem
} from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

class Errors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: []
    };
  }
  componentDidMount() {
    axios.get(`http://10.11.2.1:4001/api/places`).then(res => {
      res.data.map(async data => {
        const img = process.env.PUBLIC_URL + data.image;
        const place = {
          backgroundImage: data.image,
          category: data.city,
          categoryTheme: "Dark",
          author: data.author,
          authorAvatar: require("../images/avatars/0.jpg"),
          title: data.name,
          body: data.description,
          date: data.date,
          serie: "/EditPlace/" + data.serie
        };
        this.setState(prevState => ({
          PostsListOne: [place, ...prevState.PostsListOne]
        }));
      });
    });
  }
  render() {
    const { PostsListOne } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Places"
            subtitle="All"
            className="text-sm-left"
          />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + post.backgroundImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by {post.author}
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title">
                  <NavLink tag={RouteNavLink} to={post.serie} className="text-fiord-blue">
                      {post.title}
                    </NavLink>        
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.body}</p>
                  <span className="text-muted">{post.date}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Errors;
