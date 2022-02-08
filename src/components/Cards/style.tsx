import styled from 'styled-components';

export const MaxWidthSection = styled.div`
  width: 100%;
  height: calc(100vh - 127px);
  display: flex;
  justify-content: center;
  position: relative;

  img{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .7;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding:  40px 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  background: rgba(0, 0, 0, .7);
  z-index: 1000;
  position: relative;

  img{
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 60px;
    right: 60px;
  }

`

const Card = styled.div`
  width: 200px;
  height: 70px;
  padding: 5px 10px;
  font-weight: 700;
  font-size: 1.5rem;
  background: red;
  clip-path: polygon(20% 0%, 80% 0%, 100% 0, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%);
  cursor: pointer;

  a{
    color: white;
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover{
    background: rgba(255, 0, 0, .5)
  }

  &:active{
    a{
      color: #e62429;
    }
  }
`

export const CardCharacters = styled(Card)``
export const CardComics = styled(Card)``
export const CardCreators = styled(Card)``
export const CardEvents = styled(Card)``
export const CardSeries = styled(Card)``
export const CardStories = styled(Card)``