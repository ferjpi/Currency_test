import styled from "styled-components";

export const MainStyle = styled.main`
  block-size: 100vh;
  inline-size: 60%;
  margin: 0 auto;
`;

export const SectionStyle = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: #f2f3f4;
  border-radius: 8px;
  margin: 5px 0;
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;

export const PreStyle = styled.pre`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

export const InputNumberStyle = styled.input`
  block-size: 25px;

  margin-top: 4px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;

export const ButtonStyle = styled.button`
  background-color: #8db600;
  color: #000000;

  margin: 4px 0;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;
