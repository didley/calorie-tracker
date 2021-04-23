import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string,
  textPosition: PropTypes.oneOf(["left", "right", "center"]),
  children: PropTypes.element,
  width: PropTypes.string,
};

export default function LineWithText({
  text,
  textPosition = "center",
  children,
  width = "100%",
  ...rest
}) {
  let textPositionStyle;
  if (textPosition === "left") {
    textPositionStyle = {
      padding: "0 0 0 20px",
      textAlign: "left",
    };
  } else if (textPosition === "right") {
    textPositionStyle = {
      padding: "0 20px 0 0",
      textAlign: "right",
    };
  } else {
    textPositionStyle = {
      textAlign: "center",
    };
  }

  const textComponent = children ? (
    children
  ) : (
    <small
      style={{
        background: "#fff",
        padding: "0 10px",
        fontWeight: "bold",
      }}
    >
      {text}
    </small>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: width,
          borderBottom: "1px solid #e3e5e7",
          lineHeight: "0.1em",
          margin: "15px 0 20px",
          ...textPositionStyle,
        }}
        {...rest}
      >
        {textComponent}
      </div>
    </div>
  );
}

LineWithText.propTypes = propTypes;
