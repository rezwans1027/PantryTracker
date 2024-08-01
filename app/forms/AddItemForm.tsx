"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import NumberInput from "./NumberInput";

export default function AddItemForm() {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState<number | null>(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            console.log({ itemName, itemQuantity });
            handleClose();
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
