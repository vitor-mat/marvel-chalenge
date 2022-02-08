import { GlobalStyle } from '../../styles/globalStyle'
import type { AppProps } from 'next/app'

import { SearchContext } from '../context/SearchContext';

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <SearchContext>
      <GlobalStyle />
      <Component {...pageProps} />
    </SearchContext>
  )
}

export default MyApp
