import Head from "next/head";
import { Banner, Header, SinglePost, Footer } from "../components";
import { sanityClient } from "../lib/sanity";
import { Post } from "../types";

interface Props {
	posts: [Post];
}

const Home = ({ posts }: Props) => {
	return (
		<div>
			<Head>
				<title>Medium Clone</title>
			</Head>
			<Banner />
			<div className="max-w-7xl mx-auto p-2 md:p-6 grid grid-cols-1 gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<SinglePost post={post} key={post._id} />
				))}
			</div>
			<Footer />
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const query = `*[_type=="post"]{
		_id,
		slug,
		title,
		description,
		mainImage,
		author -> {
			name,
			image
		}
	}`;

	const posts = await sanityClient.fetch(query);

	return {
		props: { posts },
	};
};
