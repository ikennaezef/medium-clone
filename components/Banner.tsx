import React from "react";

const Banner = () => {
	return (
		<div className="bg-yellow-500 border-y border-gray-500">
			<div className="py-12 px-5 md:py-0 max-w-7xl mx-auto flex items-center justify-between">
				<div className="space-y-8 max-w-lg">
					<h2 className="font-medium text-6xl font-serif">Stay curious.</h2>
					<h4 className="text-2xl">
						Discover stories, thinking and expertise from writers on any topic.
					</h4>
					<button className="bg-black text-white text-xl py-2 px-5 rounded-full cursor-pointer">
						Start reading
					</button>
				</div>
				<div>
					<img
						src="/medium-m.png"
						alt="medium m"
						className="hidden md:inline-flex"
					/>
				</div>
			</div>
		</div>
	);
};

export default Banner;
