import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const AppWrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #34495e;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  position: relative;
  height: 100dvh;

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .content-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .image-container {
      flex: 1 1 auto;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: black;
      width: 100%;
    }
  }
`;
