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
  CardHeader,
  FormTextarea,
  ListGroup,
  ListGroupItem,
  FormGroup,
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
  MDBSelect
} from "mdbreact";

class EditPlace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      serie: "",
      author: "mdichkou",
      city: "",
      region: "essaouira",
      image: "../images/avatars/0.jpg",
      description: ""
    };
  }
  componentDidMount() {
    const { serieID } = this.props.match.params;
    axios.get(`http://10.11.2.1:4001/api/place/` + serieID).then(res => {
      this.setState({
        name: res.data[0].name,
        address: res.data[0].address,
        serie: res.data[0].serie,
        author: "mdichkou",
        city: res.data[0].city,
        region: res.data[0].region,
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
      address,
      serie,
      author,
      city,
      region,
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
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">PLace Details</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form onSubmit={this.handleSubmit}>
                        <Row form>
                          {/* First Name */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feFirstName">Place Name</label>
                            <FormInput
                              id="feFirstName"
                              name="name"
                              value={name}
                              placeholder="Name"
                              onChange={this.handleChange}
                            />
                          </Col>
                          {/* Last Name */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feLastName">Nº de serie</label>
                            <FormInput
                              id="feLastName"
                              name="serie"
                              value={serie}
                              placeholder="Nº de serie"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <FormGroup>
                          <label htmlFor="feAddress">Address</label>
                          <FormInput
                            id="feAddress"
                            placeholder="Address"
                            name="address"
                            value={address}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <Row form>
                          {/* City */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feCity">City</label>
                              <FormSelect
                              value={city}
                              name="city"
                              onChange={this.handleChange}
                            >
                              <option>Choose City..</option>
                              <option>Essaouira</option>
                              <option>Marrakech</option>
                            </FormSelect>
                            <FormInput
                              id="feCity"
                              placeholder="City"
                              name="city"
                              value={city}
                              onChange={this.handleChange}
                            />
                          </Col>
                          {/* State */}
                          <Col md="3" className="form-group">
                          <label htmlFor="feZipCode">Latitude</label>
                            <FormInput  
                              id="feZipCode"
                              placeholder="Latitude"
                              name="latitude"
                              onChange={this.handleChange}
                            />
                          </Col>
                          {/* Zip Code */}
                          <Col md="3" className="form-group">
                            <label htmlFor="feZipCode">Longitude</label>
                            <FormInput
                              id="feZipCode"
                              placeholder="Longitude"
                              name="longitude"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <div className="custom-file mb-3">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile2"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile2"
                            >
                              Choose image...
                            </label>
                          </div>
                          <div className="custom-file mb-3">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile2"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile2"
                            >
                              Choose video 360°...
                            </label>
                          </div>
                        </Row>
                        <Row form>
                          {/* Description */}
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
                        </Row>
                        <Button type="submit" theme="accent">
                          Edit Place
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

          {/* Sidebar Widgets */}
        </Row>
      </Container>
    );
  }
}

export default EditPlace;
