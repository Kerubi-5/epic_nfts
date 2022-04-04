const Header = ({ connect, currentAccount }) => {
  return (
    <header className="flex justify-between items-center bg-slate-800 shadow-md">
      <div className="text-2xl font-extrabold px-2 text-transparent bg-clip-text gradient">
        KK
      </div>
      <div className="bg-gray-500 py-2 px-4 rounded-md m-1 text-white font-semibold">
        {currentAccount === "" ? (
          <button onClick={connect}>Connect</button>
        ) : (
          <div>{currentAccount}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
