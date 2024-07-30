'use client'

import Header from "@/src/components/header";

export default function Page() {
    return (
        <>
            <Header title="Contact us"/>
            <div
                className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                Contact form
            </div>
        </>
    )
}