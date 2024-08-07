'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Article from "@/src/models/article";
import ArticleItem from "@/src/components/articles/article-item";
import Category from "@/src/models/category";
import Categories from "@/src/components/categories";
import Footer from "@/src/components/footer";
import {useTranslations} from "next-intl";

export default function Page() {
    const t = useTranslations('Articles');
    const [articles, setArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [categorizedArticles, setCategorizedArticles] = useState<Article[]>([])
    const getArticles = async () => {
        await axios
            .get('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/all-articles')
            .then((response) => {
                setArticles(response.data.data.data);
                setCategorizedArticles(response.data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const getCategories = async () => {
        await axios
            .get('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/all-article-categories')
            .then((response) => {
                console.log(response.data.data)
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getArticles()
        getCategories()
    }, [])
    const changeCategoryHandler = (value: string) => {
        let newArticles = []
        newArticles = articles.filter(function (article) {
            return value == 'All' || (value != 'All' && article.category_label == value);
        })
        setCategorizedArticles(newArticles)
    }
    return (
        <>
            <h1 className="text-4xl text-center">
                {t('title')}
            </h1>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                <div className="flex-col items-center justify-center">
                    <Categories categories={categories} changeCategory={changeCategoryHandler}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
                    {categorizedArticles.map((article: Article, key) =>
                        <ArticleItem key={key} article={article}/>)}
                </div>
            </div>
            <Footer/>
        </>
    )
}