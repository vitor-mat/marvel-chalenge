import { NextPage } from 'next'

import * as S from './style'

interface Props {
  name: string;
  description?: string;
  series?: [{
    name: string
  }];
  thumbnail: {
    path: string;
    extension: string;
  };
  pageCount?: string;
  creators?: [{
    name: string;
    resourceURI: string;
    role: string;
  }];
  comics?: [{
    resourceURI: string;
    name: string;
  }];
  startDate?: string;
  endDate?: string;
  screenPosition: boolean;
  handleScreen: () => void;
}

const FullScreenCard: NextPage<Props> = ({
  name,
  description,
  series,
  thumbnail,
  pageCount,
  creators,
  comics,
  startDate,
  endDate,
  screenPosition,
  handleScreen
}) => {

  return (
    <S.MaxWidthSection screenPosition={screenPosition}>
      <S.RelativeContainer>
        <S.CloseIcon
          src="/close_icon.svg"
          alt="close icon"
          onClick={handleScreen}
        />
        <S.CapaCharacterImage src={thumbnail.path + "." + thumbnail.extension} alt="capa" />
        <S.InfoCharaterContainer>
          <h2>{name}</h2>
          {!pageCount ? "" : (
            <div>
              <h3>Pages:</h3>
              <span>{pageCount}</span>
            </div>
          )}
          {!startDate ? "" : (
            <div>
              <span>{`Inicio: ${startDate}`}</span>
            </div>
          )}
          {!endDate ? "" : (
            <div>
              <span>{`Final: ${endDate}`}</span>
            </div>
          )}
          {!creators ? "" : (
            <div>
              <h3>Creators:</h3>
              <ul>
                {creators.map((value: any, index: number) => {
                  return (
                    <li key={index}>{value.role + ": " + value.name}</li>
                  )
                })}
              </ul>
            </div>
          )}
          {!comics ? "" : (
            <div>
              <h3>Comics:</h3>
              <ul>
                {comics.map((value: any, index: number) => {
                  return(
                    <li key={index}>{value.name}</li>
                  )
                })}
              </ul>
            </div>
          )}
          {!description ? "" : (
            <div>
              <h3>Descrição:</h3>
              <p>{description}</p>
            </div>
          )}
          {!series ? "" : (
            <div>
              <h3>Series:</h3>
              <ul>
                {
                  series.map((value, index) => {
                    return (
                      <li key={index}>
                        {value.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )}
        </S.InfoCharaterContainer>
      </S.RelativeContainer>

    </S.MaxWidthSection>
  )
}

export default FullScreenCard