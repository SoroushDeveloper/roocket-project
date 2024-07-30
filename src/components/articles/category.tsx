export default function Category({category}: { category: string }) {
    return (
        <>
            <p className="text-blue-500 text-center">
                #{category}
            </p>
        </>
    )
}