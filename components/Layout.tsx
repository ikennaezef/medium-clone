import React from "react";
import Header from "./Header";
import Meta from "./Meta";

interface Props {
	children: any;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Header />
			<main>{children}</main>
		</>
	);
};

export default Layout;
