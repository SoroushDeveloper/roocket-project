'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Header from "@/src/components/header";
import Image from "next/image";
import Link from "next/link";
import moment from "moment/moment";
import Article from "@/src/models/article";

export default function Page({params}: { params: { slug: string } }) {
    const initialValues:Article = {
        id: 0,
        slug: '',
        title: '',
        image_url: '',
        published_at: '',
        category_label: '',
    }
    const [article, setArticle] = useState<Article>(initialValues)
    const getArticle = async () => {
        await axios
            .get('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/article/' + params.slug)
            .then((response) => {
                setArticle(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getArticle()
    }, [])
    const myLoader = ({src}: { src: string }) => `${src}`
    const publishedAt = moment(article.published_at).format('MMMM Do YYYY, h:mm:ss A');
    return (
        <>
            <Header/>
            <h1 className="text-4xl text-center">
                {article.title}
            </h1>
            <div
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                <div className="flex justify-between items-center">
                    <Link href="/articles" className="rounded bg-gray-500 p-2">
                        Back
                    </Link>
                    <p>
                        {publishedAt}
                    </p>
                    <p className="bg-gray-400 dark:bg-gray-600 p-2 rounded-3xl text-center">
                        {article.category_label}
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <Image loader={myLoader} src={article.image_url} alt={article.slug} width="450" height="450"
                           className="rounded w-96"/>
                </div>
                <h4 className="text-center mt-5 text-2xl">
                    {article.description}
                </h4>
                <hr className="my-5"/>
                <p className="">
                    {article.content}
                </p>
            </div>
        </>
    )
}