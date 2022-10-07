import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/sanity";
import { Post } from "../types";

interface Props {
	post: Post;
}

const Post = ({ post }: Props) => {
	return (
		<Link href={`/post/${post.slug.current}`}>
			<div className="border border-gray-100 cursor-pointer rounded-md group overflow-hidden">
				<img
					src={urlFor(post.mainImage).url()}
					alt={post.slug.current}
					className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
				/>
				<div className="p-3">
					<h3 className="font-semibold text-xl">{post.title}</h3>
					<p className="text-md text-gray-400 mb-5">{post.description}</p>
					<div className="flex items-center space-x-5">
						<img
							src={urlFor(post.author.image).url()}
							alt="author"
							className="w-8 rounded-full"
						/>
						<h4 className="text-sm">{post.author.name}</h4>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Post;
