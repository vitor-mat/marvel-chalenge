import type { NextPage } from 'next';
import Head from 'next/head'

import { Header } from '../components/Header/index';
import { Cards } from '../components/Cards/index';

const Home: NextPage = ({ data }: any) => {

  return (
    <>
      <Head>
        <title>Marvel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Cards/>
    </>
  )
}

export default Home
