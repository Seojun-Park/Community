import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

export default () => {
    const [ filedata, setFileData] = useState({
        fileName:'',
        fileContent: null,
        fileFormat:'',
        textName: '',
        dialog: false
    })

  return <Wrapper>test</Wrapper>;
};
