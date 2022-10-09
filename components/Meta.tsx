import Head from "next/head";
import React from "react";

interface Props {
	title?: string;
	description?: string;
}

const Meta = ({ title, description }: Props) => {
	return (
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta
				name="keywords"
				content="news, information, blog, lifestyle, sports, tech, webdev"
			/>
			<meta name="description" content={description} />
			<title>{title}</title>

			{/* <!-- ### Manifest and icons ### -->
	  <!-- General --> */}
			{/* <link rel="manifest" href="/site.webmanifest" /> */}

			<meta name="theme-color" content="#ffffff" />
			<meta name="application-name" content="Medium Clone" />

			<link rel="shortcut icon" href="/medium-symbol.png" />
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/medium-symbol.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/medium-symbol.png"
			/>

			<link rel="apple-touch-icon" sizes="180x180" href="/medium-symbol.png" />
			<link rel="mask-icon" href="/medium-symbol.png" color="grey"></link>
		</Head>
	);
};

export default Meta;

Meta.defaultProps = {
	title: "Medium Clone",
	description: "",
};
