import React from "react";
import { Page, Container, Button } from "components/shared/styling";
import { Formik, Form, Field } from "formik";
import { CountryDropdown } from "react-country-region-selector";

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
  const { user, updateUser } = useAuth();

  // TODO: working on
  return (
    <Page>
      <Container>
        <h1>Account</h1>
        <Formik initialValues={user} onSubmit={updateUser}>
          <Form>
            <fieldset>
              <legend>
                <h6>Your details</h6>
              </legend>
              <div className="flex">
                <label htmlFor="name">
                  Name
                  <Field name="name" />
                </label>
                <label htmlFor="date of birth">
                  Date of birth
                  <Field name="dateOfBirth" />
                </label>
                <label htmlFor="sex">
                  Sex
                  <Field name="sex" component="select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                </label>
              </div>
              <div className="flex">
                <label htmlFor="height">
                  Height
                  <Field name="heightCm" />
                </label>
                <label htmlFor="current weight">
                  Current weight
                  <Field name="currentWeightKg" />
                </label>
              </div>
            </fieldset>
            <br />
            <fieldset className="flex">
              <legend>
                <h6>Goals</h6>
              </legend>
              <label htmlFor="weight goal">
                Weight goal
                <Field name="goals.weightGoalKg" />
              </label>
              <label htmlFor="energy goal">
                Energy goal
                <Field name="goals.energyGoalKJ" />
              </label>
            </fieldset>
            <br />
            <fieldset className="flex">
              <legend>
                <h6>Preferences</h6>
              </legend>
              <label htmlFor="country">
                Country
                <CountryDropdown name="country" />
              </label>
              <label htmlFor="units">
                Units
                <Field name="preferences.metricSystem" component="select">
                  <option value="true">kg, cm</option>
                  <option value="false">lbs, in</option>
                </Field>
              </label>
              <label htmlFor="energy ">
                Energy
                <Field name="preferences.useKJ" component="select">
                  <option value="true">Kilojoules</option>
                  <option value="false">Calories</option>
                </Field>
              </label>
            </fieldset>
            <br />
            <fieldset className="flex">
              <legend>
                <h6>Account Details</h6>
              </legend>
              <label htmlFor="email">
                Email
                <Field name="email" />
              </label>
              <label htmlFor="password">
                Password
                <Field name="password" />
              </label>
            </fieldset>
            <br />
            <fieldset className="flex justify-between">
              <button>
                <small className="text-red-600">Delete Account</small>
              </button>
              <Button className="justify-right">Save</Button>
            </fieldset>
          </Form>
        </Formik>
      </Container>
    </Page>
  );
}
