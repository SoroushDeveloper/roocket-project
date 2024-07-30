import Article from "@/src/models/article";
import Image from "next/image";
import moment from "moment";
import {useRouter} from "next/navigation";

export default function ArticleItem({id, title, image_url, slug, published_at, category_label}: Article) {
    const router = useRouter()
    const myLoader = ({src}: { src: string }) => `${src}`
    const publishedAt = moment(published_at).format('MMMM Do YYYY, h:mm:ss A');
    return (
        <>
            <div className="rounded bg-gray-300 dark:bg-gray-700 p-5 hover:shadow-2xl">
                <Image loader={myLoader} src={image_url} alt={slug} width="450" height="450" className="rounded h-56"/>
                <h3 className="text-center mt-5 text-2xl" onClick={() => router.push('/articles/' + slug)}>
                    {title}
                </h3>
                <hr className="my-5"/>
                <div className="md:flex justify-between text-sm">
                    <p className="p-2 text-center">
                        {publishedAt}
                    </p>
                    <p className="bg-gray-400 dark:bg-gray-600 p-2 rounded-3xl text-center">
                        {category_label}
                    </p>
                </div>
            </div>
        </>
    )
}