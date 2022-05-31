import { css } from "react-emotion";

export const cssLoading = css`
  margin: auto;
  width: 50px;
  height: 50px;
  display: grid;
  animation: s4 4s infinite;
  ::before,
  ::after {
    content: "";
    grid-area: 1/1;
    border: 8px solid;
    border-radius: 50%;
    border-color: #fec153 #fec153 #536dfe #536dfe;
    mix-blend-mode: darken;
    animation: s4 1s infinite linear;
  }
  ::after {
    border-color: #fff #fff;
    animation-direction: reverse;
  }

  @keyframes s4 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
