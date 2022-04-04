const Header = ({ connect, currentAccount }) => {
  return (
    <header className="flex justify-between">
      <div>Logo</div>
      <div>
        {currentAccount === "" ? (
          <button onClick={connect}>Connect</button>
        ) : (
          currentAccount
        )}
      </div>
    </header>
  );
};

export default Header;
