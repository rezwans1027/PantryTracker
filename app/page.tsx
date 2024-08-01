"use client";

import React from "react";
import AddItemForm from "./components/AddItemForm";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "./firebase/firebase";
import ItemCard from "./components/ItemCard";
import { update } from "firebase/database";

const page = () => {
  const [inventoryList, setInventory] = React.useState([]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "items"), orderBy("name", "asc"));
    const docs = await getDocs(snapshot);
    const itemsList = [];
    docs.forEach((doc) => {
      itemsList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(itemsList);
    localStorage.setItem("inventoryList", JSON.stringify(itemsList)); // Cache the items
  };

  React.useEffect(() => {
    const cachedItems = localStorage.getItem("inventoryList");
    if (cachedItems) {
      setInventory(JSON.parse(cachedItems));
    } else {
      updateInventory();
    }

    updateInventory();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <AddItemForm update={updateInventory} itemList={inventoryList} />
      <div className="mt-12">
        <div className="flex flex-col gap-3">
          {inventoryList.map((item) => (
            <ItemCard key={item} item={item} update={updateInventory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
