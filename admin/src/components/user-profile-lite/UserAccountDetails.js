import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
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
class UserAccountDetails extends Component {
  state = {
    backgroundImage: "",
    lieu: "",
    categoryTheme: "",
    author: "",
    authorAvatar: "",
    title: "",
    body: "",
    date: ""
  };
  handleClick = () => {
    axios.post(`http://10.11.2.1:4001/api/add-place`, {}).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };
  handleChange = event => {
    this.setState({ name: event.target.value });
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
                  <Form>
                    <Row form>
                      {/* First Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">Place Name</label>
                        <FormInput
                          id="feFirstName"
                          placeholder="First Name"
                          onChange={this.handleChange}
                        />
                      </Col>
                      {/* Last Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">Nº de serie</label>
                        <FormInput
                          id="feLastName"
                          placeholder="Last Name"
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <FormGroup>
                      <label htmlFor="feAddress">Address</label>
                      <FormInput
                        id="feAddress"
                        placeholder="Address"
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <Row form>
                      {/* City */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feCity">City</label>
                        <FormInput
                          id="feCity"
                          placeholder="City"
                          onChange={this.handleChange}
                        />
                      </Col>
                      {/* State */}
                      <Col md="4" className="form-group">
                        <label htmlFor="feInputState">Region</label>
                        <FormSelect id="feInputState">
                          <option>Choose...</option>
                          <option>...</option>
                        </FormSelect>
                      </Col>
                      {/* Zip Code */}
                      <Col md="2" className="form-group">
                        <label htmlFor="feZipCode">Zip</label>
                        <FormInput
                          id="feZipCode"
                          placeholder="Zip"
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
                    </Row>
                    <Row form>
                      {/* Description */}
                      <Col md="12" className="form-group">
                        <label htmlFor="feDescription">Description</label>
                        <FormTextarea
                          onChange={this.handleChange}
                          id="body"
                          rows="5"
                        />
                      </Col>
                    </Row>
                    <Button theme="accent">Add Place</Button>
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

export default UserAccountDetails;
