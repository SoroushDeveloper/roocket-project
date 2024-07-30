import Category from "@/src/models/category";
import CategoryItem from "@/src/components/categories/category-item";
import React, {Dispatch} from "react";

export default function Categories({categories, changeCategory}: {
    categories: Category[],
    changeCategory: Dispatch<React.SetStateAction<any>>
}) {
    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
            </label>
            <select id="categories" name="category"
                    onChange={(e) => changeCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="All">
                    All
                </option>
                {categories.map((category: Category, key) => <CategoryItem key={key} category={category}/>)}
            </select>
        </>
    )
}