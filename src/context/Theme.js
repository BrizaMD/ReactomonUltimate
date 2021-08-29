import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
    border: '2px solid rgba(24, 24, 24, 0.8)',
    linkColor: 'purple',
    linkHover: 'blue',
}

export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
    border: '2px solid rgba(240, 240, 240, 0.8)',
    linkColor: 'white',
    linkHover: 'turquoise',
}

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  `