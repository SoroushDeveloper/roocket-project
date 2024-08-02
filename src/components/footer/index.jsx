import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900 rounded p-5 m-5 flex justify-between text-gray-600 dark:text-gray-400">
                <p>
                    © Soroush Sagharichiha : 2024 - Present
                </p>
                <Link href="#" className="border-gray-400 dark:border-gray-600 border-l-2 pl-2 sm:p-0 sm:border-none">
                    License
                </Link>
            </div>
        </>
    )
}