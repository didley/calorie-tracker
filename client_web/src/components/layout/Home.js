import PageContainer from "components/shared/styling/Page";
import React from "react";
import Page from "components/shared/styling/Page";
import Container from "components/shared/styling/Container";

export default function Home() {
  return (
    <Page>
      <Container>
        <h1>Welcome!</h1>
        <p>
          foodNRG.io is a calorie tracking app made to help you track how much
          you eat and for me to practice making apps.
        </p>
      </Container>
    </Page>
  );
}
