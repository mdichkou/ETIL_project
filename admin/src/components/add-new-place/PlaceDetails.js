import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import FileBase64 from 'react-file-base64';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import {
  MDBNav,
  MDBTabContent,
  MDBTabPane,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
} from "mdbreact";
class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      serie: "",
      author: "mdichkou",
      city: "",
      latitude: "",
      Longitude: "",
      image: "",
      image360: [],
      description: "",
      activeItem: "1"
    };

    this.readFileAsBase64 = this.readFileAsBase64.bind(this);
  }
  
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      name: "",
      address: "",
      serie: "",
      author: "mdichkou",
      city: "",
      latitude: "",
      longitude: "",
      image360: "",
      description: ""
    });
    const {
      name,
      address,
      serie,
      author,
      city,
      latitude,
      longitude,
      image,
      image360,
      description
    } = this.state;

    axios
      .post(`http://10.11.2.1:4001/api/add-place`, {
        name,
        address,
        serie,
        author,
        city,
        latitude,
      longitude,
        image,
        image360,
        description
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  readFileAsBase64 = (fileInput) => {
    const readAsDataURL = (fileInput) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        // The file's text will be printed here
        this.setState({ image: event.target.result });
      };
      return reader.readAsDataURL(fileInput);
    };
    return readAsDataURL(fileInput);
  }; 
  readFileAsBase64360 = (fileInput) => {
    const readAsDataURL = (fileInput) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        // The file's text will be printed here
        this.setState(prevState => ({
          image360: [event.target.result, ...prevState.image360]
        }));
      };
      return reader.readAsDataURL(fileInput);
    };
    return readAsDataURL(fileInput);
  }; 
  fileSelectedHandler = ({ target }) => {
    
    const img64 = this.readFileAsBase64(target.files[0])
  };
  fileSelectedHandler2 = ({ target }) => {
    var i = 0;
    while (target.files[i])
    this.readFileAsBase64360(target.files[i++]);
  };
  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };
  render() {
    return (
      <div>
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
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <Row form>
                      {/* City */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feCity">City</label>
                        <FormSelect name="city" onChange={this.handleChange}>
                        <option>Choose City..</option>
                        <option>Essaouira</option>
                        <option>Marrakech</option>
                      </FormSelect>
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
                          name="image360"
                          className="custom-file-input"
                          id="customFile2"
                          onChange={this.fileSelectedHandler}
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
                          name="image360"
                          className="custom-file-input"
                          id="customFile2"
                          onChange={this.fileSelectedHandler2}
                          multiple
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile2"
                        >
                          Choose video 360°...
                        </label>
                      </div>
                    </Row>
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
                      Add Place
                    </Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default PlaceDetails;
