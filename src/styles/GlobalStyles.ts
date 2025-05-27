import { createGlobalStyle } from 'styled-components';
import type { ThemeType } from './theme';

interface GlobalStyleProps {
  theme: ThemeType;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${({ theme }: GlobalStyleProps) => theme.body};
    color: ${({ theme }: GlobalStyleProps) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  a {
    color: ${({ theme }: GlobalStyleProps) => theme.accentColor};
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`; 