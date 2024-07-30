import Category from "@/src/models/category";

export default function CategoryItem({category}: { category: Category }) {
    return (
        <>
            <option value={category.label}>{category.label}</option>
        </>
    )
}