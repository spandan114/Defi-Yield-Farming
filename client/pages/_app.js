import '../styles/globals.css'
import {useEffect} from 'react'
import { chainOrAccountChangedHandler } from '../utils/helper';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // listen for account changes
    window.ethereum.on('accountsChanged', chainOrAccountChangedHandler);
    // Listen for chain change
    window.ethereum.on('chainChanged', chainOrAccountChangedHandler);
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
