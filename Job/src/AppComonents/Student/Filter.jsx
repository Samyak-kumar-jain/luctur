import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select';
import React, { useState } from 'react';

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "Mern Stack developer", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [sortBy, setSortBy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handler for sort change
  const handleSortChange = (value) => {
    setSortBy(value);
    // Pass both selectedCategories and sortBy to handleFilterChange
    handleFilterChange(selectedCategories, value);
  };

  // Handler for category change (checkbox toggle)
  const handleCategoryChange = (categoryID) => {
    setSelectedCategories((prevSelected) => {
      const newCategory = prevSelected.includes(categoryID)
        ? prevSelected.filter((id) => id !== categoryID)
        : [...prevSelected, categoryID];
      // Pass both selectedCategories and sortBy to handleFilterChange
      handleFilterChange(newCategory, sortBy);
      return newCategory;
    });
  };

  return (
    <div className="w-full md:w-[30%]">
      <div className="flex items-center justify-between mb-4 border p-3 mt-3 rounded-lg">
        <h1 className="font-bold text-2xl">Filters</h1>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="ml-3 w-1/4 md:w-1/2 bg-gray-700/10 border">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700/10">
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 border p-3 space-y-4 rounded-lg">
        <h1 className="font-semibold mb-2">CATEGORY</h1>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2 my-2">
            <Checkbox
              className="space-y-2"
              id={category.id}
              checked={selectedCategories.includes(category.id)} // Set checked state
              onCheckedChange={() => handleCategoryChange(category.id)}
            />
            <Label className="text-sm font-medium leading-none">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
