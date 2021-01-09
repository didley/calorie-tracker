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

  const handleSubmit = async (values, actions) => {
    await updateUser(values);
    actions.setSubmitting(false);
  };

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
            handleSubmit,
            isSubmitting,
            dirty,
          }) => (
            <Form>
              <fieldset>
                <legend>
                  <h6 className="text-gray-700">Your details</h6>
                </legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label htmlFor="name" className="col-span-2">
                    Name
                    <Field
                      onChange={handleChange}
                      value={values.name || ""}
                      name="name"
                      className="block w-full"
                    />
                  </label>
                  <label htmlFor="date of birth" className="col-span-1">
                    Date of birth
                    <Field
                      onChange={handleChange}
                      value={values.dateOfBirth || ""}
                      name="dateOfBirth"
                      type="date"
                      className="block w-full"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <label htmlFor="current weight" className="col-span-1">
                    Current weight
                    <Field
                      type="number"
                      onChange={handleChange}
                      value={values.currentWeightKg || ""}
                      name="currentWeightKg"
                      min="1"
                      max="1000"
                      className="block w-full"
                    />
                  </label>
                  <label htmlFor="height" className="col-span-1">
                    Height
                    <Field
                      type="number"
                      onChange={handleChange}
                      value={values.heightCm || ""}
                      name="heightCm"
                      min="1"
                      max="1000"
                      className="block w-full"
                    />
                  </label>
                  <label htmlFor="sex" className="col-span-1">
                    Sex
                    <Field
                      onChange={handleChange}
                      value={values.sex || ""}
                      name="sex"
                      component="select"
                      className="block w-full"
                    >
                      <option value="">Not selected</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                  </label>
                </div>
              </fieldset>
              <br />
              <div className="grid grid-cols-3 gap-3">
                <fieldset className="col-span-1">
                  <legend>
                    <h6 className="text-gray-700">Goals</h6>
                  </legend>
                  <div className="grid grid-cols-1 col-span-1 gap-3">
                    <label htmlFor="weight goal">
                      Weight goal
                      <Field
                        type="number"
                        onChange={handleChange}
                        value={values.goals.weightGoalKg || ""}
                        name="goals.weightGoalKg"
                        min="1"
                        max="1000"
                        className="block w-full"
                      />
                    </label>
                    <label htmlFor="energy goal">
                      Energy goal
                      <Field
                        type="number"
                        onChange={handleChange}
                        value={values.goals.energyGoalKJ || ""}
                        name="goals.energyGoalKJ"
                        min="1"
                        max="1000000"
                        className="block w-full"
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="col-span-2">
                  <legend>
                    <h6 className="text-gray-700">Preferences</h6>
                  </legend>
                  <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="country">
                      Country
                      <CountryDropdown
                        onChange={handleChange}
                        value={values.country || ""}
                        name="country"
                        className="block w-full col-span-1"
                      />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label htmlFor="units">
                        Units
                        <Field
                          onChange={handleChange}
                          value={values.preferences.metricSystem || ""}
                          name="preferences.metricSystem"
                          component="select"
                          className="block w-full"
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
                          className="block w-full"
                        >
                          <option value="true">Kilojoules</option>
                          <option value="false">Calories</option>
                        </Field>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <br />
              <fieldset>
                <legend>
                  <h6 className="text-gray-700">Account Details</h6>
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <label htmlFor="email">
                    Email
                    <Field
                      onChange={handleChange}
                      value={values.email || ""}
                      name="email"
                      type="email"
                      className="block w-full"
                    />
                  </label>
                  <label htmlFor="password">
                    Password
                    {/* <Field placeholder="#######" className="block w-full"/> */}
                  </label>
                </div>
              </fieldset>
              <br />
              <fieldset className="flex justify-between">
                <button>
                  <small className="text-red-600">Delete Account</small>
                </button>
                <div>
                  {dirty && !isSubmitting && (
                    <Button type="reset" color="gray">
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </Container>
    </Page>
  );
}
