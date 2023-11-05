import React, { useEffect, useState } from 'react';

import './App.css';
import 'ui-neumorphism/dist/index.css'

import { getWavePortalContract } from './utils/getWaveContract';
import { WaveForm } from './components/WaveForm';
import { WavesList } from './components/WavesList';
import { WalletButton } from './components/WalletButton';

const App = () => {
  // ユーザのパブリックウォレットを保存する状態変数を定義
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  console.log('currentAccount: ', currentAccount);

  const getAllWaves = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }
      const wavePortalContract = getWavePortalContract(false);
      const waves = await wavePortalContract.getAllWaves();
      const wavesCleaned = waves.map(wave => {
        return {
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        };
      });
      setAllWaves(wavesCleaned);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      const newWave = {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message
      };
      setAllWaves(prevWaves => [...prevWaves, newWave]);
    };

    if (!window.ethereum)
      return;
    const wavePortalContract = getWavePortalContract();
    wavePortalContract.on("NewWave", onNewWave);
    return () => {
      if (wavePortalContract)
        wavePortalContract.off("NewWave", onNewWave);
    };
  },[]);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) {
        console.log("Make sure you have Metamask!");
        alert("Make sure you have Metamask!");
        return;
      }
      console.log("We have the ethereum object", ethereum);
  
      // ユーザのウォレットへのアクセスが許可されているか確認
      const accounts = await ethereum.request({method: "eth_accounts"});
      if (accounts.length !== 0) {
        console.log("Found an authorized account: ", accounts[0]);
        setCurrentAccount(accounts[0]);
        getAllWaves();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      getAllWaves();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="hand-wave">
            👋
          </span>{" "}
          WELCOME!
        </div>
        <div className="bio">
          Once you've connected your Ethereum wallet, wave
          <span role="img" aria-label="hand-wave">
            👋
          </span>
          and send me a message!
          <span role="img" aria-label="shine">
            ✨
          </span>
        </div>

        {currentAccount && <WaveForm account={currentAccount}/>}
        {currentAccount && <WavesList waves={allWaves} />}
        <WalletButton account={currentAccount} handleClick={connectWallet}/>
      </div>
    </div>
  );
};

export default App;
