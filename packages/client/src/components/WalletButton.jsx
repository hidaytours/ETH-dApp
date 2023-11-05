import React from 'react';

import { Button } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

const truncString = account => {
  return `${account.substring(0,4)}***${account.substring(account.length - 4)}`
}

// Wallet Connect Button
export const WalletButton = ({account, handleClick}) => {
  return (
    account?
      (<Button rounded disabled style={{marginTop:"20px"}}>
        Wallet Connected: {truncString(account)}
      </Button>):
      (<Button rounded onClick={handleClick} style={{marginTop:"20px"}}>
        Connect Wallet
      </Button>)
    );
};
