import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { firestore } from "../firebase/firebase";

const ItemCard = ({ item, update }) => {
  const addOneItem = async (itemName) => {
    try {
      const docRef = doc(collection(firestore, "items"), itemName);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await updateDoc(docRef, { quantity: quantity + 1 });
        await update();
        localStorage.removeItem("inventoryList");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const removeOneItem = async (itemName) => {
    try {
      const docRef = doc(collection(firestore, "items"), itemName);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity > 1) {
          await updateDoc(docRef, { quantity: quantity - 1 });
        } else {
          await deleteDoc(docRef);
        }
        await update();
        localStorage.removeItem("inventoryList");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="flex justify-between items-center w-96 shadow-lg border-2 rounded-md p-4">
      <h1>{item.name}</h1>
      <div className="flex rounded-md">
        <button
          onClick={() => removeOneItem(item.name)}
          className="px-1 hover:bg-slate-300 transition bg-slate-200 w-5 h-6 flex justify-center items-center duration-100"
        >
          -
        </button>
        <h1 className="border-t-1 border-b-1 border-slate-300 w-12 text-center">
          {item.quantity}
        </h1>
        <button
          onClick={() => addOneItem(item.name)}
          className="px-1 bg-slate-200 w-5 h-6 transition hover:bg-slate-300 duration-100 flex justify-center items-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
