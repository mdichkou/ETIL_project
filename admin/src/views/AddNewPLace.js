import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import PlaceDetails from "../components/add-new-place/PlaceDetails";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";

const AddNewPlace = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="Add New Place"
        subtitle="Places"
        className="text-sm-left"
      />
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="2" md="12" />
      <Col lg="8" md="12">
        <PlaceDetails />
      </Col>

      {/* Sidebar Widgets */}
    </Row>
  </Container>
);

export default AddNewPlace;
