import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* ${reset} */
  
  body{
    margin:0;
    padding:0;
    background-color: #F6FEFF;
  }
`;

export default GlobalStyle;