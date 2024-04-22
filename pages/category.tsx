import { TextFields } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function CategoryManager() {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Category 1",
    "Category 2",
    "Category 3",
  ]);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleEditCategory = (index: any, newName: any) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = newName;
    setCategories(updatedCategories);
  };

  const handleDeleteCategory = (index: any) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            label="New Category"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </Grid>
      </Grid>

      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={category}
                  onChange={(e: any) =>
                    handleEditCategory(index, e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteCategory(index)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;
