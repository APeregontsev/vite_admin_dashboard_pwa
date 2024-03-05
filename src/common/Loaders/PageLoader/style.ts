import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid;
  border-color: #ff3d00 transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin: 50px auto;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { LoaderWrapper, Loader };
