import styled from 'styled-components'

interface Props{
  screenPosition: boolean;
}

export const MaxWidthSection = styled.div<Props>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  ${({ screenPosition }) => screenPosition ? ("left: 0;") : ("left: -110%;")}
  transition: .7s linear;
  z-index: 2000;
`

export const RelativeContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
`

export const CapaCharacterImage = styled.img`
  width: 50%;
  height: 100%;
  max-height: 100vh;

  @media(max-width: 760px){
    width: 100%;
  }
`

export const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 40px;
  right: 60px;
  cursor: pointer;
`

export const InfoCharaterContainer = styled.div`
  width: 50%;
  height: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 30px 40px;
  gap: 20px;
  background: #4F4F4F;
  overflow-y: auto;

  h2{
    margin-bottom: 10px;
    font-size: 2rem;
  }

  div{

    width: 100%;
    margin-bottom: 10px;
    text-align: justify;

    h3{
      margin-bottom: 20px;
    }
  
      ul{  
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        li{
          max-width: 300px;
          list-style: square;
        }
    }
  }

  @media(max-width: 800px){
    width: 100%;
    position: absolute;
    bottom: 0;
    leftf: 0;
    max-height: 90vh;
  }
`