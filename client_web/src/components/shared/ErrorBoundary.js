import React from "react";

import { Page, Container, Button } from "components/shared/styling";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log("ErrorBoundary Error", {
      error: this.state.error,
      errorInfo: this.state.errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Container>
          <Page>
            <h1>Something went wrong.</h1>
            <a href="/">
              <Button color="gray">Home</Button>
            </a>
            <br />
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </Page>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
