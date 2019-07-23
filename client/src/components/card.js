import React, { Component } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdbreact";

class CardExample extends Component {
  render() {
    return (
      <MDBCol>
        <MDBCard
          className="card-image"
          style={{
            backgroundImage: `url('${this.props.image}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
            <div>
              <h5 className="pink-text">
                <MDBIcon icon="map-marker-alt" /> {this.props.city}
              </h5>
              <MDBCardTitle tag="h3" className="pt-2">
                <strong>{this.props.title}</strong>
              </MDBCardTitle>
              <p>{this.props.body}</p>
              <MDBBtn href="http://10.11.2.1:8081/index.html" color="pink">
                <MDBIcon icon="clone left" /> 360° View
              </MDBBtn>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default CardExample;
