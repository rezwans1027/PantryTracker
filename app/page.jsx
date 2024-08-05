"use client";

import React from "react";
import AddItemForm from "./components/AddItemForm";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "./firebase/firebase";
import ItemCard from "./components/ItemCard";
import Sort from "./components/Sort";

const Page = () => {
  const [inventoryList, setInventory] = React.useState([]);

  const updateInventory = async (sortValue = "") => {
    let querySnapshot;
    
    switch (sortValue) {
      case "az":
        querySnapshot = query(collection(firestore, "items"), orderBy("name", "asc"));
        break;
      case "za":
        querySnapshot = query(collection(firestore, "items"), orderBy("name", "desc"));
        break;
      case "highest":
        querySnapshot = query(collection(firestore, "items"), orderBy("quantity", "desc"));
        break;
      case "lowest":
        querySnapshot = query(collection(firestore, "items"), orderBy("quantity", "asc"));
        break;
      case "recent":
        querySnapshot = query(collection(firestore, "items"), orderBy("dateCreated", "desc"));
        break;
      case "early":
        querySnapshot = query(collection(firestore, "items"), orderBy("dateCreated", "asc"));
        break;
      default:
        querySnapshot = query(collection(firestore, "items"), orderBy("name", "asc"));
    }

    const docs = await getDocs(querySnapshot);
    const itemsList = [];
    docs.forEach((doc) => {
      itemsList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(itemsList);
    localStorage.setItem("inventoryList", JSON.stringify(itemsList)); // Cache the items
  };

  React.useEffect(() => {
    // const cachedItems = localStorage.getItem("inventoryList");
    // if (cachedItems) {
    //   setInventory(JSON.parse(cachedItems));
    // } else {
    //   updateInventory();
    // }

    updateInventory();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-48">
      <AddItemForm update={updateInventory} itemList={inventoryList} />
      <Sort update={updateInventory} />
      <div className="mt-4">
        <div className="flex flex-col gap-3">
          {inventoryList.map((item) => (
            <ItemCard key={item} item={item} update={updateInventory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
