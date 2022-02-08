import { NextPage } from 'next';
import Link from 'next/link'

import { useState } from 'react';

import { TitleCards } from '../TitleCards/index';
import FullScreenCard from '../FullScreenCard/index';

import * as S from './style';

interface Props{
  title: string;
  apiData: any;
  searchData: string;
}

export const CardsContainer: NextPage<Props> = ({ title, apiData, searchData }) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName] = useState(!apiData[0].name ? apiData[0].title : apiData[0].name)
  let [description, setDescription] = useState(apiData[0].description)
  let [series, setSeries] = useState(apiData[0].series.items)
  let [thumbnail, setThumbnail] = useState(apiData[0].thumbnail)


  const handleScreen = () => {
    setScreenPosition(!screenPosition)
  }

  const handleProperties = (name: string, description: string, series: [], thumbnail: []) => {
    setName(name)
    setDescription(description)
    setSeries(series)
    setThumbnail(thumbnail)
  }

  return (
    <>
      <FullScreenCard
        name={name}
        description={description}
        series={series}
        thumbnail={thumbnail}
        screenPosition={screenPosition}
        handleScreen={handleScreen}
      />
      <S.MaxWidthSection>
        <TitleCards titleText={ title }/>
        <S.Container>
          {!apiData.length ? (
            <p>{`${searchData} NOT FOUND...`}</p>
          ) : (
            apiData.map((value: any) => {
              return (
                <S.Card
                  key={value.id}
                  onClick={() => {
                    handleScreen()
                    handleProperties(
                      !value.name ? value.title : value.name,
                      value.description,
                      value.series.items,
                      value.thumbnail,
                      )}}
                >
                  <img src={value.thumbnail.path + "." + value.thumbnail.extension} />
                  <span>{!value.name ? value.title : value.name}</span>
                </S.Card>
              )
            })
          )}
        </S.Container>
      </S.MaxWidthSection>
    </>
  )
}