import { GetStaticProps } from "next";
import React, { useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanity";
import { Post } from "../../types";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { Meta } from "../../components";

interface IForm {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

interface Props {
	post: Post;
}

const PostDetail = ({ post }: Props) => {
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IForm>();

	const onSubmit: SubmitHandler<IForm> = (data) => {
		fetch("/api/createComment", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then(() => {
				setSubmitted(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="mt-8 max-w-7xl p-5">
			<Meta title={post.title} description={post.description} />
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
			<hr className="my-8 bg-yellow-500 max-w-3xl mx-auto border-none h-[1px]" />
			<div>
				{submitted ? (
					<div className="p-6 py-10 my-10 bg-yellow-500">
						<h3 className="text-2xl font-bold mb-3">
							Thanks for leaving a comment!
						</h3>
						<p>Your comment will appear below once it has been approved.</p>
					</div>
				) : (
					<>
						<p className="text-yellow-500 text-lg">Enjoyed the post?</p>
						<h3 className="text-2xl font-semibold">Leave a comment below</h3>
						<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
							<input
								{...register("_id")}
								type="hidden"
								name="_id"
								value={post._id}
							/>
							<div className="flex flex-col space-y-2 mb-4">
								<label className="">Name</label>
								<input
									{...register("name", { required: true })}
									type="text"
									placeholder="John Doe"
									className="w-full py-2 px-3 border rounded form-input outline-none focus:ring-1 ring-yellow-500"
								/>
							</div>
							<div className="flex flex-col space-y-2 mb-4">
								<label className="">Email</label>
								<input
									{...register("email", { required: true })}
									type="email"
									placeholder="john@mail.com"
									className="w-full py-2 px-3 border rounded form-input outline-none focus:ring-1 ring-yellow-500"
								/>
							</div>
							<div className="flex flex-col space-y-2">
								<label className="">Comment</label>
								<textarea
									{...register("comment", { required: true })}
									rows={8}
									placeholder="Comment..."
									className="w-full py-2 px-3 border rounded form-textarea outline-none focus:ring-1 ring-yellow-500"
								/>
							</div>

							<div className="flex flex-col py-4">
								{errors.name && (
									<span className="text-red-500 leading-loose">
										- The name field is required
									</span>
								)}
								{errors.email && (
									<span className="text-red-500 leading-loose">
										- The email field is required
									</span>
								)}
								{errors.comment && (
									<span className="text-red-500 leading-loose">
										- The comment field is required
									</span>
								)}
							</div>

							<input
								type="submit"
								className="py-2 px-3 text-white font-bold bg-yellow-500 hover:bg-yellow-400 w-full rounded cursor-pointer"
							/>
						</form>
					</>
				)}

				<div className="my-6 p-4 shadow-xl">
					<h3 className="font-bold text-2xl mb-2">Comments</h3>
					<hr className="my-4" />
					{post.comments.length < 1 && (
						<p className="text-md font-medium">
							There are no comments on this post yet. Be the first to add a
							comment.
						</p>
					)}
					{post.comments.map((comment) => (
						<div key={comment._id}>
							<p>
								<span className="font-bold text-yellow-600">
									{comment.name}:{" "}
								</span>
								{comment.comment}
							</p>
						</div>
					))}
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
		'comments': *[
			_type == "comment" &&
			post._ref == ^._id &&
			approved == true
		],
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
