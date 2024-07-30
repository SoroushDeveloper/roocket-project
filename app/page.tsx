'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Header from "@/src/components/header";
import Article from "@/src/models/article";
import ArticleItem from "@/src/components/articles/article-item";

export default function Home() {
    const [articles, setArticles] = useState([])
    const getArticles = async () => {
        await axios
            .get('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/last-articles')
            .then((response) => {
                console.log(response)
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
            <Header title="Home"/>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                <h2 className="text-center text-2xl">
                    Latest Articles
                </h2>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {articles.slice(0, 3).map((article: Article, key) =>
                        <ArticleItem key={key} article={article}/>)}
                </div>
            </div>
        </>
    )
}
