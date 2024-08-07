'use client'

import axios from "axios";
import {useForm} from "react-hook-form";
import Success from "@/src/toasts/success";
import Error from "@/src/toasts/error";
import Footer from "@/src/components/footer";
import {useTranslations} from "next-intl";

export type FormData = {
    name: string;
    email: string;
    content: string;
};

export default function Page() {
    const t = useTranslations('Contact');
    const {register, handleSubmit, reset} = useForm<FormData>();

    async function onSubmit(data: FormData) {
        await axios
            .post('https://react-camp-api.roocket.ir/api/mr.soroosh.qr@gmail.com/contact', data)
            .then((response) => {
                if (response.status == 200) {
                    Success(t('success'))
                    reset()
                }
            })
            .catch((error) => {
                Error(error.message)
            })
    }

    return (
        <>
            <h1 className="text-4xl text-center">
                {t('title')}
            </h1>
            <div
                className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-5 m-5">
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('name')}
                        </label>
                        <input type="text" id="name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Jon Smith" required
                               {...register('name', {required: true})}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('email')}
                        </label>
                        <input type="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="name@address.com" required
                               {...register('email', {required: true})}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="content"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('message')}
                        </label>
                        <textarea id="content" rows={4}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder={t('content')} {...register('content', {required: true})}></textarea>
                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {t('submit')}
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    )
}