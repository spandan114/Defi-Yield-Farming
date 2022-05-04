import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react'
import { chainOrAccountChangedHandler } from '../utils/helper';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // listen for account changes
    window.ethereum.on('accountsChanged', chainOrAccountChangedHandler);
    // Listen for chain change
    window.ethereum.on('chainChanged', chainOrAccountChangedHandler);
  }, [])

  return (
    <>
      <ToastContainer/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
