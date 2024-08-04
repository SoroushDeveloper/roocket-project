import Article from "@/src/models/article";
import Image from "next/image";
import moment from "moment";
import {useRouter} from "next/navigation";
import Category from "@/src/components/articles/category";
import Hr from "@/src/components/shared/hr";
import {useTranslations} from "next-intl";

export default function ArticleItem({article}: { article: Article }) {
    const env = useTranslations('Env');
    const router = useRouter()
    const myLoader = ({src}: { src: string }) => `${src}`
    const publishedAt = moment(article.published_at).format('MMMM Do YYYY, h:mm:ss A');
    const link = '/' + env('locale') + '/articles/' + article.slug;
    return (
        <>
            <div className="rounded bg-gray-200 dark:bg-gray-800 p-5 hover:shadow-2xl">
                <Image loader={myLoader} src={article.image_url} alt={article.slug} width="450" height="450"
                       className="rounded h-56"/>
                <h3 className="text-center mt-5 text-2xl hover:text-blue-500 hover:cursor-pointer"
                    onClick={() => router.push(link)}>
                    {article.title}
                </h3>
                <Hr/>
                <div className="md:flex justify-between text-sm">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        {publishedAt}
                    </p>
                    {article.category_label && <Category category={article.category_label}/>}
                </div>
            </div>
        </>
    )
}