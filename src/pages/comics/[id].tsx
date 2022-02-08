import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { useState } from 'react';

import { Header } from '../../components/Header/index';
import { TitleCards } from '../../components/TitleCards/index';
import FullScreenCard from '../../components/FullScreenCard/index';

import * as S from './style';

import {
  api,
  time,
  publicKey,
  hash
} from '../api/axios';

function createRoutersId() {
  let arr = []
  for (let i = 1; i <= 2549; i++) {
    arr.push(i.toString())
  }
  return arr
}

export const getStaticPaths: GetStaticPaths = async () => {

  const elementsId = createRoutersId()

  const paths = elementsId.map((value: string) => {
    return {
      params: { id: value }
    }
  })

  return ({
    paths,
    fallback: false
  })
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = await context.params.id
  const response = await api.get(`comics?limit=20&offset=${(Number(id) * 20).toFixed(0)}&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const comicsData = await response.data

  return ({
    props: {
      comicsData,
      id
    },
    revalidate: 300
  })
}


const ComicsParamsPage: NextPage = ({ comicsData, id }: any) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName] = useState(comicsData.data.results[0].title)
  let [description, setDescription] = useState(comicsData.data.results[0].description)
  let [pageCount, setPageCount] = useState(comicsData.data.results[0].pageCount)
  let [thumbnail, setThumbnail] = useState(comicsData.data.results[0].thumbnail)
  let [creators, setCreators] = useState(comicsData.data.results[0].creators.items)

  const handleScreen = () => {
    setScreenPosition(!screenPosition)
  }

  const handleProperties = (name: string, description: string, thumbnail: [], pageCount: string, creators: []) => {
    setName(name)
    setDescription(description)
    setThumbnail(thumbnail)
    setPageCount(pageCount)
    setCreators(creators)
  }

  return (
    <>
      <Head>
        <title>Marvel - Comics</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FullScreenCard
        name={name}
        description={description}
        thumbnail={thumbnail}
        pageCount={pageCount}
        creators={creators}
        screenPosition={screenPosition}
        handleScreen={handleScreen}
      />
      <S.MaxWidthSection>
        <Header show={false} />
        <TitleCards titleText="Comics" />
        <S.Container>
          {comicsData.data.results.map((value: any) => {
            return (
              <S.Card
                key={value.id}
                onClick={() => {
                  handleScreen()
                  handleProperties(
                    value.title,
                    value.description,
                    value.thumbnail,
                    value.pageCount,
                    value.creators.items
                  )
                }}
              >
                <img src={value.thumbnail.path + "." + value.thumbnail.extension} />
                <span>{value.title}</span>
              </S.Card>
            )
          })}
        </S.Container>
        <S.PaginationContainer>
          {id > 1 ? <Link href={`/comics/${Number(id) - 1}`}><a className="skip-btn">Back</a></Link> : <span className="skip-btn"></span>}
          <span>{id}</span>
          {id < 2549 ? <Link href={`/comics/${Number(id) + 1}`}><a className="skip-btn">Next</a></Link> : <span className="skip-btn"></span>}
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default ComicsParamsPage