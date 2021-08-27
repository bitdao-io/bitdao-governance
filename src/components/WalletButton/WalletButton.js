import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Alert from "./Alert";
const useStyles = makeStyles(() =>
	createStyles({
		root: {
			fontFamily: "sans-serif !important",
			borderRadius: "16px",
			backgroundColor: "#EEF6FF",
			marginRight: "10px",
			padding: "20px",
			color: "#2D82B7",
			cursor: "pointer",
			flex: "none",
			fontWeight: 400,
			boxShadow: "0px 0px 20px rgba(55, 156, 206, 0.2)",
			border: "none",
		},
		onConnect: {
			backgroundColor: "#57A2D1",
			color: "#ffffff",
			fontFamily: "sans-serif !important",
			borderRadius: "16px",
			marginRight: "10px",
			padding: "20px",
			cursor: "pointer",
			flex: "none",
			boxShadow: "0px 0px 20px rgba(55, 156, 206, 0.2)",
			border: "none",
		},
	})
);
function WalletButton({
	provider,
	loadWeb3Modal,
	logoutOfWeb3Modal,
	accounts,
}) {
	const classes = useStyles();
	const [balance, setBalance] = React.useState("");

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
				// className={!provider?classes.root:classes.onConnect}
				// color="primary"
				className="bg-connectButton rounded-xl shadow-xl p-4"
				onClick={() => {
					if (!provider) {
						loadWeb3Modal();
					} else {
						setOpenAlert(true);
						// logoutOfWeb3Modal();
					}
				}}
			>
        <text className='text-blue font-mono text-2xl'>
          {!provider ? ('Connect Wallet') : (accounts.slice(0, 4) + '...' + accounts.slice(-4))}
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
