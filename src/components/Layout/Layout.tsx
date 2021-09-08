import React from "react";
import BitDaoLogo from '../../BitDao.png';
import WalletButton from "../../components/WalletButton/WalletButton";
import Footer from '../Footer'
export default function Layout({ children, WBProvider, WBloadWeb3, WBlogout, WBaccounts }: { children: React.ReactNode, WBProvider:any, WBloadWeb3:any, WBlogout:any, WBaccounts:any}): JSX.Element {
    return (
        <div className='w-full '>
            <div className='flex flex-row'>
                <img className='w-11rem ' src={BitDaoLogo} />
                <WalletButton
                      provider={WBProvider}
                      loadWeb3Modal={WBloadWeb3}
                      logoutOfWeb3Modal={WBlogout}
                      accounts={WBaccounts}
                    />
            </div>
            <div>
                {children}
            </div>
            <footer>
            <Footer />
            </footer>
        </div>
    )
}