"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NumberInput from "./NumberInput";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function AddItemForm({ update, itemList }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(1);
  const [error, setError] = useState<string | null>(null);

  const itemNameList = itemList.map(item => item.name);

  const addItem = async (item, amount) => {
    const docRef = doc(collection(firestore, "items"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // If the item already exists, don't add
      setError(`The item "${item}" already exists in the inventory.`);
    } else {
      await setDoc(docRef, { quantity: amount });
      await update();
      setError(null);
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const itemName = formJson.itemName;
            const itemQuantity = quantity;

            if (itemNameList.includes(itemName)) {
              setError(`The item "${itemName}" already exists in the inventory.`);
            } else {
              addItem(itemName, itemQuantity);
            }
          },
        }}
      >
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What is the name of the item you would like to add?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="itemName"
            name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText className="mt-6">
            How many would you like to add?
          </DialogContentText>
          <NumberInput
            aria-label="Item quantity input"
            placeholder="Type a number…"
            value={quantity}
            className="mt-4"
            onChange={(event, val) => setQuantity(Math.max(1, val))}
            min={1}
          />
          {error && (
            <Typography color="error" className="mt-4">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
