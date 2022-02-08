import { NextPage } from 'next';

import * as S from './style';

interface Props{
  titleText: string
}

export const TitleCards: NextPage<Props> = ({ titleText }) => {
  return(
    <S.titleElement>
      { titleText }
    </S.titleElement>
  )
}