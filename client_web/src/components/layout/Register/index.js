import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Page, Container, Button } from "components/shared/styling";

import { useAlert } from "hooks/useAlert";
import { useAuth } from "hooks/useAuth";
import EmailRegisterForm from "./EmailRegisterForm";
import LineWithText from "./LineWithText";

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
              <Button
                noBottomBorder
                className="bg-gradient-to-r from-teal-300 to-blue-600 hover:from-pink-400 hover:to-orange-400"
              >
                Try as Guest
              </Button>

              <LineWithText text="Or" width="70%" />

              <Button onClick={() => setViewEmailForm(true)}>Email</Button>
              <Button disabled noBottomBorder>
                Sign up with Gmail
                <small className="text-gray-100 font-normal">
                  {" "}
                  (Coming soon)
                </small>
              </Button>
              <Button disabled noBottomBorder>
                Sign up with Apple
                <small className="text-gray-100 font-normal">
                  {" "}
                  (Coming soon)
                </small>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
}
