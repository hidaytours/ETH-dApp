import React, { useState } from 'react';

import { TextArea, Button } from 'ui-neumorphism'

import { getWavePortalContract } from '../utils/getWaveContract';

export const WaveForm = () => {
  const [textValue, setTextValue] = useState("");

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }
      const wavePortalContract = getWavePortalContract(false);
      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
      const messageValue = textValue? textValue : "👋";
      const waveTxn = await wavePortalContract.wave(messageValue, {gasLimit: 300000});
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined --", waveTxn.hash);
      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TextArea
        name="messageArea"
        placeholder="Message here!"
        type="text"
        id="message"
        width={600}
        height={100}
        style={{
          boxSizing: "border-box",
          width: "100%",
          margin: "0",
          marginTop:"20px"
        }}
        value={textValue}
        onChange={(e) => {setTextValue(e.value)}}
      />
      <Button block color='#ccc' bgColor='var(--primary)' onClick={wave}>
        Wave👋 & Send message
      </Button>
    </>
  )
};