import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Component = (props) => {
//   const codeString = '(num) => num + 1';
  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {props.data}
    </SyntaxHighlighter>
  );
};
export default Component;