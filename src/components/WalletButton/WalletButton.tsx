import React from "react";
import Alert from "../Alert";

function WalletButton({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  accounts,
}: {
  provider: any;
  loadWeb3Modal: any;
  logoutOfWeb3Modal: any;
  accounts: any;
}) {
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleWalletDisconnect = () => {
    if (provider) {
      logoutOfWeb3Modal();
    }
  };

  return (
    <>
      <button
        className={
          !provider
            ? "bg-connectedButton rounded-xl shadow-xl p-4"
            : "bg-unconnectedButton rounded-xl shadow-xl py-4 px-5"
        }
        onClick={() => {
          if (!provider) {
            loadWeb3Modal();
          } else {
            setOpenAlert(true);
          }
        }}
      >
        <text
          className={
            !provider
              ? "text-blue font-mono iphone:text-2xl"
              : "text-white font-mono iphone:text-2xl"
          }
        >
          {!provider
            ? "Connect Wallet"
            : accounts.slice(0, 4) + "..." + accounts.slice(-4)}
        </text>
      </button>

      {openAlert && (
        <Alert
          open={openAlert}
          handleClose={handleClose}
          handleWalletDisconnect={handleWalletDisconnect}
        />
      )}
    </>
  );
}

export default WalletButton;
