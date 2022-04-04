import Head from "next/head";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Alert from "./../components/Alert";
import Header from "../components/Header";

export default function Home() {
  const [modal, setModal] = useState({
    show: false,
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");

  const getWallet = () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      setModal({ show: true, message: "Make sure you have metamask!" });
      return;
    }

    return ethereum;
  };

  const connectWallet = async () => {
    try {
      const ethereum = getWallet();

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // * sets the current account
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setModal({ show: true, message: error.message });
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <Alert modal={modal} setModal={setModal} />
      <Head>
        <title>Extremely Wicked, Shockingly Evil and Vile Weapons</title>
        <meta
          name="description"
          content="This is the place where you can collect and mint the most shockingly wicked, evil and vile weapons in the known universe"
        />
      </Head>
      <Header connect={connectWallet} currentAccount={currentAccount} />
      <div className=" bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center pt-24 pb-10">
            <h1 className="text-5xl stroke-1px text-transparent bg-clip-text gradient font-bold py-6">
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
