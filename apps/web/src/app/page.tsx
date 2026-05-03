"use cache";
import type { FunctionComponent } from "react";
import Hero from "./_components/hero/hero";
import SelectedWork from "./_components/selected-work/selected-work";

const Home: FunctionComponent = async () => {
  return (
    <>
      <Hero />
      <SelectedWork />
    </>
  );
};

export default Home;
