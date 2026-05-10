import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ArrowRight } from "lucide-react";
import type { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";

const Hero: FunctionComponent = () => {
	return (
		<section className="flex justify-between mb-32">
			<div className="flex flex-col gap-8">
				<h1 className="text-7xl max-w-lg md:text-8xl md:max-w-2xl lg:text-9xl lg:max-w-3xl font-serif">
					I build <em className="inline-block -rotate-2">thoughtful</em>
					software for the messy web.
				</h1>
				<p className="max-w-160">
					Developer focused on shipping small, sharp tools — software that
					respects the people who use it. Currently exploring realtime systems
					and the strange middle ground between developer tools and product.
				</p>
				<div className="flex gap-4">
					<Button asChild className="h-12 w-36">
						<Link to={"/work"}>
							See the work
							<ArrowRight />
						</Link>
					</Button>
					<Button variant="secondary" className="h-12 w-36" asChild>
						<Link to={"/posts"}>Read Posts</Link>
					</Button>
				</div>
			</div>
			{/* TODO: improve image styling and change the image */}
			<div className="relative hidden w-75 h-100 xl:block">
				<Image
					className="object-cover rounded-md"
					src="/nico_benninger_q.jpg"
					alt="Me"
					sizes="18.75rem"
					width={300}
					height={400}
					priority
				/>
			</div>
		</section>
	);
};

export default Hero;
