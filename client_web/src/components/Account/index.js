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

  const handleSubmit = (values, actions) => {
    console.log({ formOutput: values });
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 2000);
  };

  // TODO: working on
  return (
    <Page>
      <Container>
        <h1>Account</h1>
        <Formik
          initialValues={user}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,

            isSubmitting,
          }) => (
            <Form>
              <fieldset>
                <legend>
                  <h6 className="text-gray-700">Your details</h6>
                </legend>
                <div className="flex space-x-1 mb-2">
                  <label htmlFor="name">
                    Name
                    <Field
                      onChange={handleChange}
                      value={values.name || ""}
                      name="name"
                    />
                  </label>
                  <label htmlFor="date of birth">
                    Date of birth
                    <Field
                      onChange={handleChange}
                      value={values.dateOfBirth || ""}
                      name="dateOfBirth"
                      type="date"
                    />
                  </label>
                  <label htmlFor="sex">
                    Sex
                    <Field
                      onChange={handleChange}
                      value={values.sex || ""}
                      name="sex"
                      component="select"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                  </label>
                </div>
                <div className="flex space-x-1">
                  <label htmlFor="height">
                    Height
                    <Field
                      type="number"
                      onChange={handleChange}
                      value={values.heightCm || ""}
                      name="heightCm"
                    />
                  </label>
                  <label htmlFor="current weight">
                    Current weight
                    <Field
                      type="number"
                      onChange={handleChange}
                      value={values.currentWeightKg || ""}
                      name="currentWeightKg"
                    />
                  </label>
                </div>
              </fieldset>
              <br />
              <fieldset className="flex space-x-1">
                <legend>
                  <h6 className="text-gray-700">Goals</h6>
                </legend>
                <label htmlFor="weight goal">
                  Weight goal
                  <Field
                    onChange={handleChange}
                    value={values.goals.weightGoalKg || ""}
                    name="goals.weightGoalKg"
                  />
                </label>
                <label htmlFor="energy goal">
                  Energy goal
                  <Field
                    onChange={handleChange}
                    value={values.goals.energyGoalKJ || ""}
                    name="goals.energyGoalKJ"
                  />
                </label>
              </fieldset>
              <br />
              <fieldset className="flex space-x-1">
                <legend>
                  <h6 className="text-gray-700">Preferences</h6>
                </legend>
                <label htmlFor="country">
                  Country
                  <CountryDropdown
                    onChange={handleChange}
                    value={values.country || ""}
                    name="country"
                  />
                </label>
                <label htmlFor="units">
                  Units
                  <Field
                    onChange={handleChange}
                    value={values.preferences.metricSystem || ""}
                    name="preferences.metricSystem"
                    component="select"
                  >
                    <option value="true">kg, cm</option>
                    <option value="false">lbs, in</option>
                  </Field>
                </label>
                <label htmlFor="energy ">
                  Energy
                  <Field
                    onChange={handleChange}
                    value={values.preferences.useKJ || ""}
                    name="preferences.useKJ"
                    component="select"
                  >
                    <option value="true">Kilojoules</option>
                    <option value="false">Calories</option>
                  </Field>
                </label>
              </fieldset>
              <br />
              <fieldset className="flex space-x-1">
                <legend>
                  <h6 className="text-gray-700">Account Details</h6>
                </legend>
                <label htmlFor="email">
                  Email
                  <Field
                    onChange={handleChange}
                    value={values.email || ""}
                    name="email"
                    type="email"
                  />
                </label>
                <label htmlFor="password">
                  Password
                  {/* <Field placeholder="#######" /> */}
                </label>
              </fieldset>
              <br />
              <fieldset className="flex space-x-1 justify-between">
                <button>
                  <small className="text-red-600">Delete Account</small>
                </button>
                <Button
                  type="submit"
                  className="justify-right"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </fieldset>
            </Form>
          )}
        </Formik>
      </Container>
    </Page>
  );
}
