import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div
      key={item}
      className="flex justify-between items-center w-96 shadow-lg border-2 rounded-md p-4"
    >
      <h1>{item.name}</h1>
      <div className="flex gap-  rounded-md">
        <h2 className="px-1 bg-slate-200 w-5 h-6 flex justify-center items-center">
          -
        </h2>
        <h1 className="border-t-1 border-b-1 border-slate-300 w-12 text-center">
          {item.quantity}
        </h1>
        <h2 className="px-1 bg-slate-200 w-5 h-6 flex justify-center items-center">
          +
        </h2>
      </div>
    </div>
  );
};

export default ItemCard;
