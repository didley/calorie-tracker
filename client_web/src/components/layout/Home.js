import React from "react";
import { Page, Container, Button } from "components/shared/styling";
import { useHistory } from "react-router-dom";

import heroImage from "assets/heroImage.jpeg";

export default function Home() {
  const history = useHistory();
  return (
    <>
      <div className="flex justify-center relative text-center">
        <img
          style={{ height: "400px" }}
          src={heroImage}
          alt="Hero"
          className="object-cover md:rounded-xl md:mt-2 w-full md:w-5/6 bg-blue-800 shadow-xl"
        />
        <div className="absolute inset-x-0 top-0 pt-16 text-center">
          <h1 className="text-white text-5xl md:text-6xl leading-none">
            Achieve your <br />
            weight goals
          </h1>

          <p className="text-blue-200 pt-8 mx-1">
            foodNRG.io is a calorie tracking app made to help you track{" "}
            <br className="hidden md:block" />
            what you eat so you can reach your weight goals
          </p>

          <div className="flex justify-center gap-5 md:gap-10 pt-10">
            <Button
              noBottomBorder
              className="bg-gradient-to-r from-pink-400 to-orange-400 hover:from-teal-300 hover:to-blue-600 w-40 ml-2"
            >
              Try as Guest
            </Button>
            <Button
              noBottomBorder
              className="w-40 mr-2"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </div>
        </div>
        <small className="text-gray-400 absolute bottom-0">
          Photo by{" "}
          <a href="https://unsplash.com/@jimmydean?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Jimmy Dean
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/eating?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </small>
      </div>
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
    </>
  );
}
