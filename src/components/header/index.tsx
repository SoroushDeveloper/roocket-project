'use client'

import HeaderItem from "@/src/components/header/item";
import {HomeIcon, NewspaperIcon, PhoneIcon} from "@heroicons/react/24/solid";

import {useTranslations} from 'next-intl';

export default function Header() {
    const t = useTranslations('Header');
    const env = useTranslations('Env');
    const HeaderItems = [
        {
            'link': '/',
            'name': t('Home'),
            'icon': <HomeIcon className="size-5"/>,
        },
        {
            'link': '/' + env('locale') + '/articles',
            'name': t('Articles'),
            'icon': <NewspaperIcon className="size-5"/>,
        },
        {
            'link': '/' + env('locale') + '/contact',
            'name': t('Contact'),
            'icon': <PhoneIcon className="size-5"/>,
        }
    ]
    return (
        <>
            <div
                className="flex justify-around bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                {
                    HeaderItems.map((item, key) =>
                        <HeaderItem key={key} link={item.link} name={item.name} icon={item.icon}/>)
                }
            </div>
        </>
    )
}