import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
header {
  background: ${({ theme }) => theme.header};
}  

body {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
  transition: all 0.2s linear;
}

.loginPanel {
  background: ${({ theme }) => theme.paper};
  color: ${({ theme }) => theme.text};
}

.placeholderStyle input {
  color: ${({ theme }) => theme.text};
  borderColor: ${({ theme }) => theme.borderColor};
}

.placeholderStyle label {
  color: ${({ theme }) => theme.text};
  borderColor: ${({ theme }) => theme.borderColor};
}

.placeholderStyle svg {
  color: ${({ theme }) => theme.text};
}

.MuiOutlinedInput-notchedOutline {
  border-color: ${({ theme }) => theme.borderColor1};
}

.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
  border-color: ${({ theme }) => theme.borderColor2};
}

.Mui-focused fieldset {
  border-color: ${({ theme }) => theme.borderColor3};
}

.card {
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
}

.paper {
  background: ${({ theme }) => theme.paper};
  color: ${({ theme }) => theme.text};
}`;
