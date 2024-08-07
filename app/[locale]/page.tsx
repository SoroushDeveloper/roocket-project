'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Article from "@/src/models/article";
import ArticleItem from "@/src/components/articles/article-item";

import {useTranslations} from 'next-intl';

export default function Home() {
    const t = useTranslations('HomePage');
    const [articles, setArticles] = useState([])
    const getArticles = async () => {
        await axios
            .get('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/last-articles')
            .then((response) => {
                setArticles(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getArticles()
    }, [])
    return (
        <>
            <h1 className="text-4xl text-center">
                {t('title')}
            </h1>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                <h2 className="text-center text-2xl">
                    {t('header')}
                </h2>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {articles.slice(0, 3).map((article: Article, key) =>
                        <ArticleItem key={key} article={article}/>)}
                </div>
            </div>
        </>
    )
}
