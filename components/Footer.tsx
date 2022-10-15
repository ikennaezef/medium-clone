import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-black">
			<div className="max-w-7xl mx-auto px-5 py-12 text-white flex flex-col space-y-5 md:space-y-0 md:flex-row md:justify-between">
				<div className="pb-6 border-b border-gray-600 md:pb-0 md:border-none">
					<div className="flex space-x-4 items-center mb-4">
						<Link href="/">
							<img
								src="/medium-white.png"
								alt="medium-logo"
								className="w-48 cursor-pointer"
							/>
						</Link>
					</div>
					<div>
						<ul className="list-none flex space-x-5">
							<li className="cursor-pointer">About</li>
							<li className="cursor-pointer">Help</li>
							<li className="cursor-pointer">Terms</li>
							<li className="cursor-pointer">Privacy</li>
						</ul>
					</div>
				</div>
				<div>
					<p className="mb-4">Get the Medium App</p>
					<div className="flex space-x-8 items-center">
						<img
							src="/app_store.png"
							className="w-40 cursor-pointer"
							alt="app-store"
						/>
						<img
							src="/play_store.png"
							className="w-40 cursor-pointer"
							alt="play-store"
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
