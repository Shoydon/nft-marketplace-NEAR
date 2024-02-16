import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Web3 from 'web3';
// import Transaction from '../components/trxn';
import { NavLink } from 'react-router-dom';
import { useState , useEffect } from 'react';
import '../styles/navbar.css'

const Navbar = () => {
    
    const [connectedAccount, setConnectedAccount] = useState('');

    // let connectedAccount;
    const [connected, setConnected] = useState(false);
    
    async function connectWallet() {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Wallet connected");
                const accounts = await web3.eth.getAccounts()
                // connectedAccount = accounts[0];
                setConnectedAccount(accounts[0]);
                console.log(connectedAccount);
                setConnected(true);
            } else {
                alert("Please install metamask")
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    }

    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='text-body-secondary'>NFT-Marketplace</h1>
                </NavLink>
                <form class="d-flex" role="search">
                    {/* <div id="connect-button">
                        <button class="btn btn-primary m-2" type="button" onClick={connectWallet}>Connect wallet</button>
                    </div> */}
                    {!connected && <button class="btn btn-success m-2" type="button" onClick={connectWallet}>Connect wallet</button>}
                    {/* <button class="btn btn-primary m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Shopping Cart</button> */}
                    <NavLink to="mintNFT">
                        <button class="btn btn-info m-2" type="button" >Mint NFT</button>
                    </NavLink>
                </form>
            </div>
            {connected && <p className='lead m-2'> <small className='text-body-secondary'>Connected account: </small><strong className='connected-account'>{connectedAccount}</strong></p>}
        </nav>
    );
};

export default Navbar 