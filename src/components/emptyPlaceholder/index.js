import React from "react";
import {
  MainStyle,
  SectionStyle,
  ContainerStyle,
  FillEmptyStyle,
  FillEmptySmallStyle,
} from "../../assets/styles";

function EmptyPlaceholder() {
  return (
    <MainStyle>
      <SectionStyle>
        <FillEmptyStyle>...loading</FillEmptyStyle>
      </SectionStyle>
      <ContainerStyle>
        <SectionStyle>
          <FillEmptySmallStyle></FillEmptySmallStyle>
        </SectionStyle>
        <SectionStyle>
          <FillEmptySmallStyle></FillEmptySmallStyle>
        </SectionStyle>
      </ContainerStyle>
    </MainStyle>
  );
}

export default EmptyPlaceholder;
