import React, { useState } from "react";
import { Page, Container, Button } from "components/shared/styling";

import { useAuth } from "hooks/useAuth";

// Name
// Date of birth
// Sex
// Height
// Country

// Current Weight
// Weight Goal
// Energy Goal

// metricSystem (feet)(inches) / (Pounds) || (centimeters) / 	(kilograms)
// KJ/Cal

// Email
// Password
// Delete Account

export default function Account() {
  const [formData, setFormData] = useState({});
  const auth = useAuth();

  // TODO: working on
  return (
    <Page>
      <Container>
        <button onClick={async () => await auth.updateUser({ name: "jack" })}>
          Test to update user
        </button>
        <form>
          <h1>Account</h1>
          <fieldset>
            <legend>
              <h6>Your details</h6>
            </legend>
            <div className="flex">
              <label htmlFor="name">
                Name
                <input />
              </label>
              <label htmlFor="date of birth">
                Date of birth
                <input />
              </label>
              <label htmlFor="sex">
                Sex
                <input />
              </label>
            </div>
            <div className="flex">
              <label htmlFor="height">
                Height
                <input />
              </label>
              <label htmlFor="current weight">
                Current weight
                <input />
              </label>
            </div>
            <br />
          </fieldset>
          <fieldset>
            <legend>
              <h6>Goals</h6>
            </legend>
            <label htmlFor="weight goal">
              Weight goal
              <input />
            </label>
            <label htmlFor="energy goal">
              Energy goal
              <input />
            </label>
            <br />
          </fieldset>
          <fieldset>
            <legend>
              <h6>Preferences</h6>
            </legend>
            <label htmlFor="country">
              Country
              <input />
            </label>
            <label htmlFor="metric system">
              Metric system
              <input />
            </label>
            <label htmlFor="KJ or Cal">
              KJ or Cal
              <input />
            </label>
            <br />
          </fieldset>
          <fieldset>
            <legend>
              <h6>Account Details</h6>
            </legend>
            <label htmlFor="email">
              Email
              <input />
            </label>
            <label htmlFor="password">
              Password
              <input />
            </label>
          </fieldset>
          <fieldset className="flex justify-between">
            <button>
              <small className="text-red-600">Delete Account</small>
            </button>
            <Button className="justify-right">Save</Button>
          </fieldset>
        </form>
      </Container>
    </Page>
  );
}
