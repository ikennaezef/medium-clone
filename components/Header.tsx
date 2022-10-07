import Link from "next/link";
import React from "react";

const Header = () => {
	return (
		<header className="p-5 flex justify-between max-w-7xl mx-auto border-b border-gray-200">
			<div className="flex items-center space-x-5">
				<Link href="/">
					<img src="/logo.png" alt="logo" className="w-48 cursor-pointer" />
				</Link>
				<div className="hidden md:inline-flex items-center space-x-5">
					<h3>About</h3>
					<h3>Contact</h3>
					<button className="text-white bg-green-600 px-4 py-1 rounded-full">
						Follow
					</button>
				</div>
			</div>
			<div className="flex items-center space-x-5 text-green-600">
				<h3>Sign In</h3>
				<button className="border px-4 py-1 rounded-full border-green-600">
					Get Started
				</button>
			</div>
		</header>
	);
};

export default Header;
