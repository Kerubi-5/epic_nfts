import Head from "next/head";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Alert from "./../components/Alert";
import Header from "../components/Header";
import { ethers } from "ethers";
import abi from "../util/MyEpicNFT.json";
import Loader from "../components/Loader";

export default function Home() {
  const [modal, setModal] = useState({
    show: false,
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [nft, setNft] = useState({
    svg: "",
    link: "",
  });
  const CONTRACT_ADDRESS = "0x5BA1Bb5BB7Ea27a123dE7ea060D025D774F05857";

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

  const checkNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });

    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }
  };

  const getConnectedContract = async () => {
    const ethereum = getWallet();

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
    } else {
      setModal({ show: true, message: "Ethereum object does not exist!" });
    }
  };

  const askContractToMintNft = async () => {
    try {
      const connectedContract = await getConnectedContract();
      checkNetwork();
      let nftTxn = await connectedContract.makeAnEpicNFT();

      setLoading(true);
      await nftTxn.wait();

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getNFTS = async () => {
    const connectedContract = await getConnectedContract();

    connectedContract.on("NewEpicNFTMinted", (from, tokenId, svg) => {
      setNft({
        svg: svg,
        link: `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`,
      });
    });

    // await connectedContract.FetchTokenInfo(1)
  };

  useEffect(() => {
    connectWallet();
    getNFTS();
  }, []);

  useEffect(() => {
    checkNetwork();
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

      {loading && <Loader />}

      <div className=" bg-slate-900 min-h-screen">
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
            <div className="w-full group">
              <button
                className="py-2 px-4 gradient text-red-50 rounded-lg w-full group-hover:animate-bounce transition-all duration-300 my-5"
                onClick={askContractToMintNft}
              >
                Mint NFT
              </button>
            </div>
          </div>

          {nft.svg && nft.link && (
            <div className="shadow-sm rounded-md gradient p-4 flex flex-col items-center">
              <h3 className="text-white text-2xl text-center mb-5">
                Congrats you've minted this NFT! 🎉🎉🎉
              </h3>
              <Card data={nft} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
