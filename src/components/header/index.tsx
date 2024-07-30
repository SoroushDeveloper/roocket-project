import HeaderItem from "@/src/components/header/item";
import {HomeIcon, NewspaperIcon, PhoneIcon} from "@heroicons/react/24/solid";

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
        'name': 'Contact',
        'icon': <PhoneIcon className="size-5"/>,
    }
]
export default function Header() {
    return (
        <>
            <div className="flex justify-around bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                {HeaderItems.map((item, key) => <HeaderItem key={key} link={item.link} name={item.name} icon={item.icon}/>)}
            </div>
        </>
    )
}