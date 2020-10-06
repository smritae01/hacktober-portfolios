import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(233,233,233,1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 70%, rgba(233,233,233,1) 100%);
  }
`;

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyles />
			<Component {...pageProps} />
		</>
	);
};

export default App;
