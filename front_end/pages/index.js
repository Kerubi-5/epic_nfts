import Head from "next/head";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <Head>
        <title>Extremely Wicked, Shockingly Evil and Vile Weapons</title>
        <meta
          name="description"
          content="This is the place where you can collect and mint the most shockingly wicked, evil and vile weapons in the known universe"
        />
      </Head>

      <div className=" bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center pt-24 pb-10">
            <h1 className="text-5xl stroke-1px text-transparent bg-clip-text gradient font-bold py-4">
              Extremely Wicked, Shockingly Evil and Vile Weapons
              <span className="text-neutral-50">😈🔪</span>
            </h1>

            <h2 className="text-2xl text-gray-300 font-semibold mb-2">
              This is the place where you can collect and mint the most
              shockingly evil and vile weapons
            </h2>
            <small className="text-sm text-gray-400">
              Come and mint your own evil weapons now
            </small>
          </div>

          <div className="shadow-sm rounded-md gradient p-4">
            <div className="grid grid-cols-3 gap-5">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
