import React from "react";
import { Container, Row, Col } from "shards-react";
import axios from "axios";
import PageTitle from "../components/common/PageTitle";
import ReactQuill from "react-quill";
import {
  Card,
  CardBody,
  Form,
  FormInput,
  Button,
  InputGroup,
  FormTextarea,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";
import {
  MDBNav,
  MDBTabContent,
  MDBTabPane,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";
class EditArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      place: "",
      serie: "",
      author: "mdichkou",
      audio: "test.mp3",
      image: "../images/content-management/19.jpg",
      description: "",
      activeItem: "1"
    };
  }
  componentDidMount() {
    const { serieID } = this.props.match.params;
    axios.get(`http://10.11.2.1:4001/api/article/` + serieID).then(res => {
      this.setState({
        name: res.data[0].name,
        place: res.data[0].place,
        serie: res.data[0].serie,
        author: "mdichkou",
        audio: "test.mp3",
        image: "../images/content-management/19.jpg",
        description: res.data[0].description
      });
    });
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };
  render() {
    const {
      name,
      place,
      serie,
      author,
      audio,
      image,
      description
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Edit Article"
            subtitle="Articles"
            className="text-sm-left"
          />
        </Row>

        <Row>
          {/* Editor */}
          <Col lg="2" md="12" />
          <Col lg="8" md="12">
            <Card small className="mb-3">
              <CardBody>
                <Form className="add-new-post" onSubmit={this.handleSubmit}>
                  <InputGroup className="mb-3">
                    <FormSelect
                      value={place}
                      name="place"
                      onChange={this.handleChange}
                    >
                      <option>Choose Place..</option>
                      <option>Essaouira Museum</option>
                      <option>Essaouira Mosque</option>
                    </FormSelect>
                    <InputGroupAddon type="append">
                      <InputGroupText>Place</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FormInput
                    size="lg"
                    className="mb-3"
                    name="name"
                    onChange={this.handleChange}
                    value={name}
                  />
                  <FormInput
                    size="lg"
                    name="serie"
                    onChange={this.handleChange}
                    className="mb-3"
                    value={serie}
                    placeholder="Nº de serie"
                  />
                  <div className="custom-file mb-3">
                    <input
                      type="file"
                      name="audio"
                      className="custom-file-input"
                      id="customFile2"
                      onChange={this.handleChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile2">
                      Choose audio...
                    </label>
                  </div>
                  <div className="custom-file mb-3">
                    <input
                      type="file"
                      name="image"
                      onChange={this.handleChange}
                      className="custom-file-input"
                      id="customFile2"
                    />
                    <label className="custom-file-label" htmlFor="customFile2">
                      Choose image...
                    </label>
                  </div>
                  <Col md="12" className="form-group">
                    <label htmlFor="feDescription">Description</label>
                    <MDBNav className="nav-tabs">
                              <MDBNavItem>
                                <MDBNavLink to="#" className={this.state.activeItem === "1" ? "active" : ""} onClick={this.toggle("1")} role="tab" >
                                  Anglais
                                </MDBNavLink>
                              </MDBNavItem>
                              <MDBNavItem>
                                <MDBNavLink to="#" className={this.state.activeItem === "2" ? "active" : ""} onClick={this.toggle("2")} role="tab" >
                                  Francais
                                </MDBNavLink>
                              </MDBNavItem>
                              <MDBNavItem>
                                <MDBNavLink to="#" className={this.state.activeItem === "3" ? "active" : ""} onClick={this.toggle("3")} role="tab" >
                                  Arabe
                                </MDBNavLink>
                              </MDBNavItem>
                            </MDBNav>
                            <MDBTabContent activeItem={this.state.activeItem} >
                              <MDBTabPane tabId="1" role="tabpanel">
                              <FormTextarea
                                              onChange={this.handleChange}
                                              name="description"
                                              value={description}
                                              id="body"
                                              rows="5"
                                            />
                              </MDBTabPane>
                              <MDBTabPane tabId="2" role="tabpanel">
                              <FormTextarea
                                              id="body"
                                              rows="5"
                                            />
                              </MDBTabPane>
                              <MDBTabPane tabId="3" role="tabpanel">
                              <FormTextarea
                                          id="body"
                                          rows="5"
                                            />
                              </MDBTabPane>
                            </MDBTabContent>       
                  </Col>
                  <Button type="submit" theme="accent">
                    Edit Article
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* Sidebar Widgets */}
        </Row>
      </Container>
    );
  }
}

export default EditArticle;
