"use client";

import React from "react";
import AddItemForm from "./forms/AddItemForm";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "./firebase/firebase";

const page = () => {
  const [inventoryList, setInventory] = React.useState([]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "items"));
    const docs = await getDocs(snapshot);
    const itemsList = [];
    docs.forEach((doc) => {
      itemsList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(itemsList);
  };

  React.useEffect(() => {
    updateInventory();
  }, []);

  console.log(inventoryList[0]);

  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <AddItemForm update={updateInventory} itemList={inventoryList} />
      <div className="mt-12">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-96">
            <h1>Item 1</h1>
            <button>Delete</button>
          </div>
          {inventoryList.map((item) => (
            <div className="flex justify-between w-96 shadow-xl border-2 rounded-md p-4">
              <h1>{item.name}</h1>
              <button>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
