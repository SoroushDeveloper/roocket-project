'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Article from "@/src/models/article";
import ArticleItem from "@/src/components/articles/article-item";
import Header from "@/src/components/header";
import Category from "@/src/models/category";

export default function Page() {
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
            <Header title="Articles"/>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                <div className="flex-col items-center justify-center">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category
                    </label>
                    <select id="categories" name="category"
                            onChange={(e) => changeCategoryHandler(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="All">
                            All
                        </option>
                        {categories.map((category: Category, key) =>
                            <option key={key} value={category.label}>{category.label}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
                    {categorizedArticles.map((article: Article, key) =>
                        <ArticleItem key={key} article={article}/>)}
                </div>
            </div>
        </>
    )
}