import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Page, Container, Button } from "components/shared/styling";

import { useAlert } from "hooks/useAlert";
import { useAuth } from "hooks/useAuth";
import EmailRegisterForm from "./EmailRegisterForm";

export default function Register() {
  const [viewEmailForm, setViewEmailForm] = useState(false);

  return (
    <Page>
      <Container className="p-5">
        <h1 className="mb-10">
          Register
          <hr />
          {viewEmailForm && (
            <p>
              <button onClick={() => setViewEmailForm(false)}>
                {"< Back"}
              </button>
            </p>
          )}
        </h1>
        {viewEmailForm ? (
          <EmailRegisterForm />
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col place-content-center gap-4">
              <Button onClick={() => setViewEmailForm(true)}>Email</Button>
              <Button disabled>
                Sign up with Gmail
                <small className="text-gray-100 font-normal">
                  {" "}
                  (Coming soon)
                </small>
              </Button>
              <Button disabled>
                Sign up with Apple
                <small className="text-gray-100 font-normal">
                  {" "}
                  (Coming soon)
                </small>
              </Button>

              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "1px solid #e3e5e7",
                  lineHeight: "0.1em",
                  margin: "15px 0 15px",
                }}
              >
                <small
                  style={{
                    background: "#fff",
                    padding: "0 10px",
                    fontWeight: "bold",
                  }}
                >
                  Or
                </small>
              </div>
              <Button>Try as Guest</Button>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
}
