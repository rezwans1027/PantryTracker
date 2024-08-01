import React from "react";
import { Button } from "@mui/material";
import AddItemForm from "./forms/AddItemForm";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <AddItemForm />
      <div className="mt-12">
        <div className="flex justify-between w-96">
          <h1>Item 1</h1>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default page;
