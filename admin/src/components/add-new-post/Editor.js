import React, { Component } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import {
  Card,
  CardBody,
  Form,
  FormInput,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormTextarea,
  Col,
  FormSelect
} from "shards-react";
import {
  MDBNav,
  MDBTabContent,
  MDBTabPane,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
} from "mdbreact";
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      place: "",
      serie: "",
      author: "",
      audio: "test.mp3",
      image: "",
      description: "",
      activeItem: "1"
    };

    this.readFileAsBase64 = this.readFileAsBase64.bind(this);
  }
  
  handleSubmit = event => {
    event.preventDefault();
    const {
      name,
      place,
      serie,
      author,
      audio,
      image,
      description
    } = this.state;

    axios
      .post(`http://10.11.2.1:4001/api/add-article`, {
        name,
        place,
        serie,
        author,
        audio,
        image,
        description
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          name: "",
          place: "",
          serie: "",
          author: "mdichkou",
          audio: "test.mp3",
          image: ".",
          description: ""
        });
      });
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  readFileAsBase64 = (fileInput,name) => {
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
  fileSelectedHandler = ({ target }) => {
    
    this.readFileAsBase64(target.files[0])
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
      <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post" onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormSelect name="place" onChange={this.handleChange}>
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
              placeholder="Article Name"
            />
            <FormInput
              size="lg"
              name="serie"
              onChange={this.handleChange}
              className="mb-3"
              placeholder="Nº de serie"
            />
            <div className="custom-file mb-3">
              <input
                type="file"
                name="audio"
                className="custom-file-input"
                id="customFile2"
              />
              <label className="custom-file-label" htmlFor="customFile2">
                Choose audio...
              </label>
            </div>
            <div className="custom-file mb-3">
              <input
                type="file"
                name="image"
                className="custom-file-input"
                id="customFile2"
                onChange={this.fileSelectedHandler}
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
              Add Article
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default ArticleDetails;
