import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MobileStoreButton from "react-mobile-store-button";
import axios from "axios";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBIcon,
  MDBContainer,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";
import "../index.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import CardExample from "./card";
import FooterPage from "./footer";

class FullPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: [],
      collapsed: false
    };
  }
  componentDidMount() {
    axios.get(`http://10.11.2.1:4001/api/places`).then(res => {
      res.data.map(async data => {
        var img = "http://10.11.2.1:8000" + data.image;
        const place = {
          backgroundImage: img,
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

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { PostsListOne } = this.state;
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    const iOSUrl = "https://www.apple.com/ios/app-store/";
    const androidUrl = "https://play.google.com/store/apps";
    const container = { height: 500 };
    return (
      <div id="apppage">
        <Router>
          <div>
            <MDBNavbar color="white" light expand="md" fixed="top" scrolling>
              <MDBContainer>
                <MDBNavbarBrand>
                  <div className="d-table m-auto">
                    <img
                      id="main-logo"
                      className="d-inline-block align-top mr-1"
                      style={{ maxWidth: "25px" }}
                      src={require("../images/ETIL_logo.png")}
                      alt="Shards Dashboard"
                    />

                    <span className="d-none d-md-inline ml-1">
                      {" "}
                      <img
                        id="main-logo"
                        className="d-inline-block align-top mr-1"
                        style={{ maxWidth: "80px" }}
                        src={require("../images/ETIL_logo2.png")}
                        alt="Shards Dashboard"
                      />
                    </span>
                  </div>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.handleTogglerClick} />
                <MDBCollapse isOpen={this.state.collapsed} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem>
                      <AnchorLink offset="400" className="link" href="#home">
                        Home
                      </AnchorLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <AnchorLink offset="60" className="link" href="#places">
                        Places
                      </AnchorLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <AnchorLink className="link" href="#about">
                        About
                      </AnchorLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <AnchorLink className="link" href="#contact">
                        Contact
                      </AnchorLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <MDBNavItem />
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>

        <MDBView className="bg">
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <section id="home">
              <MDBContainer>
                <MDBRow>
                  <MDBCol
                    md="6"
                    className="white-text text-center text-md-left mt-xl-5 mb-5"
                  >
                    <MDBAnimation type="fadeInLeft" delay=".3s">
                      <h1 className="h1-responsive font-weight-bold mt-sm-5">
                        Let us show you the world!
                      </h1>
                      <hr className="hr-light" />
                      <h6 className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Rem repellendus quasi fuga nesciunt dolorum nulla
                        magnam veniam sapiente, fugiat! Commodi sequi non animi
                        ea dolor molestiae iste.
                      </h6>

                      <MobileStoreButton
                        store="ios"
                        url={iOSUrl}
                        linkProps={{ title: "iOS Store Button" }}
                      />
                      <MobileStoreButton
                        store="android"
                        url={androidUrl}
                        linkProps={{ title: "iOS Store Button" }}
                      />
                    </MDBAnimation>
                  </MDBCol>

                  <MDBCol md="6" xl="5" className="mt-xl-5">
                    <MDBAnimation type="fadeInRight" delay=".3s">
                      <img
                        src={require("../images/phone.png")}
                        alt=""
                        className="img-fluid"
                      />
                    </MDBAnimation>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </MDBMask>
        </MDBView>
        <section id="places">
          <MDBContainer>
            <h1 className="h1-responsive font-weight-bold mt-sm-5">
              Places to visit
            </h1>
            <MDBRow className="py-5">
              {PostsListOne.map((post, idx) => (
                <CardExample
                  city={post.category}
                  image={post.backgroundImage}
                  title={post.title}
                  body={post.body}
                  key={idx}
                />
              ))}
            </MDBRow>
          </MDBContainer>
        </section>
        <section id="about">
          <MDBContainer style={container} className="text-left mt-5 pt-5">
            <h1 className="h1-responsive font-weight-bold mt-sm-5">About us</h1>
            <h5>Essaouira Innovation Lab</h5>
            <br />
            <h6 className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
              repellendus quasi fuga nesciunt dolorum nulla magnam veniam
              sapiente, fugiat! Commodi sequi non animi ea dolor molestiae iste.
            </h6>
          </MDBContainer>
        </section>
        <section id="contact">
          <FooterPage />
        </section>
      </div>
    );
  }
}

export default FullPage;
