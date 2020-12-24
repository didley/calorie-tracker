import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Page, Container, Button } from "components/shared/styling";

export default function NoMatch404() {
  let location = useLocation();
  return (
    <Page>
      <Container>
        <h2>404 Error, route not found.</h2>
        <p>
          Route <code>{location.pathname}</code>
        </p>
        <Link to="/">
          <Button color="gray">Home</Button>
        </Link>
      </Container>
    </Page>
  );
}
