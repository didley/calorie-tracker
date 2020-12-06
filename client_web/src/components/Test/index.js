import React, { useState } from "react";
import api from "utils/api";

import { useQueryCache } from "react-query";

// TODO: working on
const Test = () => {
  const cache = useQueryCache();
  console.log({ cache });

  const [testDisplay, setTestDisplay] = useState({
    method: "",
    msg: "",
    data: "",
  });
  const [inputFields, setInputFields] = useState({ get: "", post: "" });
  async function getTest() {
    const res = await api.get("/test", `text=${inputFields.get}`);
    const { msg, params } = res.data;
    setTestDisplay({ msg, data: JSON.stringify(params), method: "get" });
  }

  async function postTest() {
    const res = await api.post("/test", { text: inputFields.post });
    const { msg, body } = res.data;
    setTestDisplay({
      msg,
      data: JSON.stringify(body),
      method: "post",
    });
  }

  return (
    <div>
      <h1>Test page</h1>
      {testDisplay.msg.length > 0 && (
        <div className="bg-gray-400">
          <h2>Test display:</h2>
          <code>{testDisplay.msg}</code>
          <br />
          <code>
            {testDisplay.method === "get" ? "Params" : "Body"}
            {": "}
            {testDisplay.data}
          </code>
        </div>
      )}
      <input
        className="m-1 border"
        type="text"
        onChange={(e) =>
          setInputFields({ ...inputFields, get: e.target.value })
        }
      />
      <button onClick={getTest}>Get</button>
      <br />
      <input
        className="m-1 border"
        type="text"
        onChange={(e) =>
          setInputFields({ ...inputFields, post: e.target.value })
        }
      />
      <button onClick={postTest}>Post</button>
    </div>
  );
};

export default Test;