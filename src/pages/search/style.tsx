import styled from 'styled-components';

export const MaxWidthSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
` 

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 40px 0;
  padding: 0 24px;
  display: flex;

  input{
    background: rgba(0, 0, 0, .3);
    color: white;
    outline: none;
    border: none;
    border-radius: 10px 0 0 10px;
    padding: 5px;
    height: 50px;
    width: 100%;
    font-weight: 700;
  }
  
    a{
      border-radius: 0 10px 10px 0;

      button{
        color: white;
        background: red;
        height: 50px;
        width: 100px;
        border-radius: 0 10px 10px 0;
        border: none;
        font-weight: 700;
        cursor: pointer;
        transition: .2s linear;
      }
    
      button:active{
        opacity: .7;
      }
    }
`
