import { createGlobalStyle } from "styled-components";
import { Fragment } from "react";

type IChildren = JSX.Element | JSX.Element[] | string;
const Style = createGlobalStyle`
* {
     padding: 0;
     margin: 0;
     list-style: none;
     text-decoration: none;
     box-sizing: border-box;
}
body{
    font-family: 'Montserrat', sans-serif;
}
`;
interface Props {
  children: IChildren;
}
const GlobalStyle: React.FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Style />
      {children}
    </Fragment>
  );
};
export default GlobalStyle;
