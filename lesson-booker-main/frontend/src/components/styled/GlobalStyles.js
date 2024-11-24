import { createGlobalStyle} from "styled-components"
import styled from "styled-components"
// This will be used for the global styles in App.js

export const GlobalStyles = createGlobalStyle `
* {
  box-sizing: border-box;
}
body {
  background: #fff;
  color: #000;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  font-size: 1.15rem
}
p {
  opacity: 0.8;
}
`

