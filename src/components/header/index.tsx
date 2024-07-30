import HeaderItem from "@/src/components/header/item";
import {HomeIcon, NewspaperIcon, PhoneIcon} from "@heroicons/react/24/solid";

interface Props {
    title: string,
}

const HeaderItems = [
    {
        'link': '/',
        'name': 'Home',
        'icon': <HomeIcon className="size-5"/>,
    },
    {
        'link': '/articles',
        'name': 'Articles',
        'icon': <NewspaperIcon className="size-5"/>,
    },
    {
        'link': '/contact',
        'name': 'Contact us',
        'icon': <PhoneIcon className="size-5"/>,
    }
]
export default function Header({title}: Props) {
    return (
        <>
            <div
                className="flex justify-around bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                {
                    HeaderItems.map((item, key) =>
                        <HeaderItem key={key} link={item.link} name={item.name} icon={item.icon}/>)
                }
            </div>
            <h1 className="text-4xl text-center">
                {title}
            </h1>
        </>
    )
}