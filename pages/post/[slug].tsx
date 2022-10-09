import { GetStaticProps } from "next";
import React from "react";
import { sanityClient, urlFor } from "../../lib/sanity";
import { Post } from "../../types";
import PortableText from "react-portable-text";

interface Props {
	post: Post;
}

const PostDetail = ({ post }: Props) => {
	console.log(post);
	return (
		<div className="mt-8 max-w-7xl p-5">
			<div className="flex items-center space-x-5">
				<img
					src={urlFor(post.author.image).url()}
					alt={post.author.name}
					className="w-12 h-12 rounded-full"
				/>
				<div>
					<p>
						Published by{" "}
						<span className="text-green-600">{post.author.name}</span>
					</p>
					<p className="text-gray-400">
						{new Date(post._createdAt).toLocaleDateString()}
					</p>
				</div>
			</div>
			<h2 className="my-8 font-bold text-4xl">{post.title}</h2>
			<h5 className="text-gray-500 text-xl">{post.description}</h5>
			<div className="mt-12">
				<img
					src={urlFor(post.mainImage).url()}
					alt={post.title}
					className="w-full mb-6"
				/>

				<div>
					<PortableText
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
						projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
						content={post.body}
						serializers={{
							h1: (props: any) => (
								<h1 className="text-2xl font-bold leading-loose" {...props} />
							),
							h2: (props: any) => (
								<h2 className="text-2xl font-bold leading-loose" {...props} />
							),
							li: ({ children }: any) => (
								<li className="ml-4 list-disc">{children}</li>
							),
							link: ({ href, children }: any) => (
								<a href={href} className="text-blue-500 hover:underline">
									{children}
								</a>
							),
							normal: ({ children }: any) => (
								<div className="leading-relaxed my-4">{children}</div>
							),
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type=="post" && slug.current == $slug][0]{
		_id,
		_createdAt,
		title,
		author -> {
		 name,
		 image,
		},
		description,
		mainImage,
		body,
		slug{
		 current,
	 }
	}`;

	const post = await sanityClient.fetch(query, {
		slug: params?.slug,
	});

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: { post },
		revalidate: 300,
	};
};

export const getStaticPaths = async () => {
	const query = `*[_type=="post"]{
		_id,
    slug {
      current
    }
  }`;

	const posts = await sanityClient.fetch(query);

	const paths = posts.map((post: Post) => {
		return {
			params: {
				slug: post.slug.current,
			},
		};
	});

	return {
		paths,
		fallback: "blocking",
	};
};
