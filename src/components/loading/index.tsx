import React, { ReactElement, useState } from 'react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/DotLoader";
import { theme } from '../../theme/customTheme';

interface Props {

}

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: flex;
  margin: 150px auto;
  border-color: red;
`;
function Loading({ }: Props): ReactElement {
  return (
    <div style={{ margin: 'auto' }}>
      <div>
        <ClipLoader color={theme.color?.secondary} loading={true} css={override} size={150} />
      </div>
    </div>
  )
}

export default Loading
