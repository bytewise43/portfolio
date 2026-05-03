"use cache";
import { ArrowRight } from "lucide-react";
import type { FunctionComponent } from "react";
import { Separator } from "@/components/ui/separator";
import UnderlinedLink from "@/components/underlined-link/underlined-link";

const SelectedWork: FunctionComponent = async () => {
  return (
    <section>
      <div className="sm:w-full flex flex-col sm:flex-row justify-between mb-4 sm:mb-8 items-start sm:items-end">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
          Selected Work{" "}
          <em className="text-3xl md:text-4xl lg:text-5xl">- '24/'25</em>
        </h2>
        <UnderlinedLink href="/projects">
          all 12 projects <ArrowRight className="size-4 ml-2" />
        </UnderlinedLink>
      </div>
      <Separator />
    </section>
  );
};

export default SelectedWork;
