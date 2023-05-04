import { getPost, getPosts } from '../../services/content-service';
import { notFound } from 'next/navigation';

type Props = {
	params: { slug: string };
};

export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
	const post = await getPost(params.slug);

	if (!post) notFound();

	return (
		<>
			<h1 className="text-3xl text-bold">{post.title}</h1>
			<p>{post.content}</p>
		</>
	);
}
