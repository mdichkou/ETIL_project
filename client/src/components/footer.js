import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue lighten-2" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Contact us</h5>
              <MDBCol>
                <MDBRow>tel:</MDBRow>
                <MDBRow>email:</MDBRow>
                <MDBRow>Adresse:</MDBRow>
              </MDBCol>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Follow us</h5>
            <a
              href="https://www.facebook.com/Essaouira-Innovation-Lab-318585465708348/"
              className="fb-ic mr-3"
            >
              <MDBIcon fab icon="facebook-f" />
            </a>

            <a href="#!" className="tw-ic mr-3">
              <MDBIcon fab icon="twitter" />
            </a>
            <a
              href="https://www.linkedin.com/company/essaouira-innovat"
              className="li-ic mr-3"
            >
              <MDBIcon fab icon="linkedin-in" />
            </a>
            <a href="#!" className="ins-ic mr-3">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="#!" className="yt-ic mr-3">
              <MDBIcon fab icon="youtube" />
            </a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.1337.ma"> 1337 </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
