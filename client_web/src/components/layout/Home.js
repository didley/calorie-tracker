import PageContainer from "components/shared/styling/Page";
import React from "react";
import Page from "components/shared/styling/Page";
import Container from "components/shared/styling/Container";

export default function Home() {
  return (
    <Page>
      <Container>
        <h1>Welcome!</h1>
        <h2 className="text-6xl">
          <span role="img" aria-label="Cookie">
            🍪
          </span>
          <span role="img" aria-label="CrossHandsNo">
            🙅‍♀️
          </span>
          <span role="img" aria-label="NotePad">
            📝
          </span>
          <span role="img" aria-label="MoonWithSmirk">
            🌝
          </span>
        </h2>
      </Container>
    </Page>
  );
}
