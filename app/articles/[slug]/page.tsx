'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import Header from "@/src/components/header";
import Image from "next/image";
import Link from "next/link";
import moment from "moment/moment";
import Article from "@/src/models/article";
import Category from "@/src/components/articles/category";
import Hr from "@/src/components/shared/hr";
import {useForm} from "react-hook-form";
import Success from "@/src/toasts/success";
import Error from "@/src/toasts/error";

export type FormData = {
    name: string;
    content: string;
};

const initialValues: Article = {
    id: 0,
    slug: '',
    title: '',
    image_url: '',
    published_at: '',
    category_label: '',
}

export default function Page({params}: { params: { slug: string } }) {
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
    const {register, handleSubmit, reset} = useForm<FormData>();

    async function onSubmit(data: FormData) {
        await axios
            .post('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/article/' + params.slug + '/comment', data)
            .then((response) => {
                if (response.status == 200) {
                    Success('Your comment was submitted and will be published once approved')
                    reset()
                }
            })
            .catch((error) => {
                Error(error.message)
            })
    }

    return (
        <>
            <Header title={article.title}/>
            <div
                className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                <div className="flex justify-between items-center">
                    <Link href="/articles"
                          className="rounded bg-gray-300 dark:bg-gray-700 p-2 hover:bg-gray-400 hover:dark:bg-gray-600">
                        Back
                    </Link>
                    <p>
                        {'Published at : ' + publishedAt}
                    </p>
                    {article.category_label && <Category category={article.category_label}/>}
                </div>
                <div className="flex justify-center mt-5">
                    <Image loader={myLoader} src={article.image_url} alt={article.slug} width="450" height="450"
                           className="rounded w-96"/>
                </div>
                <h4 className="text-center mt-5 text-2xl">
                    {article.description}
                </h4>
                <Hr/>
                <p>
                    {article.content}
                </p>
                <div className="bg-gray-200 dark:bg-gray-800 mt-5 p-5 rounded">
                    <h2 className="text-center text-2xl">
                        Comments
                    </h2>
                    <Hr/>
                    <h3 className="text-center text-lg">
                        Leave a comment
                    </h3>
                    <form className="max-w-sm mx-auto mt-5 border-2 border-gray-300 dark:border-gray-700 rounded p-5"
                          onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Name
                            </label>
                            <input type="text" id="name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Jon Smith" required
                                   {...register('name', {required: true})}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="content"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Comment
                            </label>
                            <textarea id="content" rows={4}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Write down your comment here" {...register('content', {required: true})}></textarea>
                        </div>
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}