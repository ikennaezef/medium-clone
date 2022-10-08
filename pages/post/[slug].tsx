import { GetStaticProps } from "next";
import React from "react";
import { sanityClient } from "../../lib/sanity";
import { Post } from "../../types";

interface Props {
	post: Post;
}

const PostDetail = ({ post }: Props) => {
	console.log(post);
	return <div>PostDetail</div>;
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
