import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

interface GlobalStyleProps {
  theme: ThemeType;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`; 