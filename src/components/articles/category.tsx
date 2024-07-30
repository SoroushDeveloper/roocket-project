export default function Category({category}: { category: string }) {
    return (
        <>
            <p className="bg-gray-300 dark:bg-gray-700 p-2 rounded-3xl text-center">
                {category}
            </p>
        </>
    )
}