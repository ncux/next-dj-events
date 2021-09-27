import '../styles/globals.css'
import { AuthState } from "../context/auth";

function MyApp({ Component, pageProps }) {
  return (
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
  );
}

export default MyApp
