'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Article from "@/src/models/article";
import ArticleItem from "@/src/components/articles/article-item";
import Header from "@/src/components/header";

export default function Page() {
    const [articles, setArticles] = useState([])
    const getArticles = async () => {
        await axios
            .get('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/all-articles')
            .then((response) => {
                setArticles(response.data.data.data);
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
            <Header title="Articles"/>
            <div
                className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {articles.map((article: Article, key) => <ArticleItem key={key} id={article.id} slug={article.slug}
                                                                      title={article.title}
                                                                      image_url={article.image_url}
                                                                      category_label={article.category_label}
                                                                      published_at={article.published_at}/>)}
            </div>
        </>
    )
}