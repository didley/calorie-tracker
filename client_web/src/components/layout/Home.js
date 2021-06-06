import React from "react";
import { Page, Container, Button } from "components/shared/styling";
import { useHistory, Link } from "react-router-dom";
import "./Home.css";

import heroImage from "assets/heroImage.jpeg";
import diaryImg from "assets/diary.png";
import addFoodImg from "assets/addFood.png";
import LoginGuestBtn from "components/shared/LoginGuestBtn";

export default function Home() {
  const history = useHistory();
  return (
    <>
      <div
        className="row-start-2 flex justify-center relative text-center"
        id="hero"
      >
        <img
          style={{ height: "400px" }}
          src={heroImage}
          alt="Hero"
          className="object-cover md:rounded-2xl md:mt-2 w-full md:w-5/6 bg-blue-800 shadow-2xl"
        />

        <div className="absolute inset-x-0 top-0 pt-16 text-center">
          <h1 className="text-white text-5xl md:text-6xl leading-none">
            Achieve your <br />
            weight goals
          </h1>

          <p className="text-blue-200 pt-6 mx-1">
            foodNRG is a calorie counting app made to help you track{" "}
            <br className="hidden md:block" />
            what you eat so you can reach your weight goals.
          </p>

          <div className="flex justify-center gap-5 md:gap-10 pt-10 pb-10 mb-2">
            <LoginGuestBtn className="bg-gradient-to-r from-pink-400 to-orange-400 hover:from-teal-300 hover:to-blue-600 w-40 ml-2" />

            <Button
              noBottomBorder
              className="w-40 mr-2"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </div>
          <small className="text-gray-400">
            Photo by{" "}
            <a
              href="https://unsplash.com/@jimmydean?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jimmy Dean
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/s/photos/eating?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </small>
        </div>
      </div>

      <small className="absolute inset-x-0 bottom-0 text-center mb-2">
        Made with
        <span
          role="img"
          aria-label="sparkling heart"
          style={{
            fontSize: "16px",
            display: "inline-block",
            padding: "0 8px 0 4px",
          }}
        >
          💖
        </span>
        in Melbourne
      </small>
    </>
  );
}
