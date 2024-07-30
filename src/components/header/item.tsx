import Link from "next/link";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

interface Props {
    name: string,
    link: string,
    icon: ReactNode,
}

export default function HeaderItem({name, link, icon}: Props) {
    const path = usePathname();
    const active = path === link;
    return (
        <>
            <Link href={link}
                  className={`${active ? 'text-blue-500' : ''} text-sm hover:text-blue-500 flex items-center justify`}>
                {icon}
                <p className="ml-2">
                    {name}
                </p>
            </Link>
        </>
    )
}