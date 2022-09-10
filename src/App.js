import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import { ParticlesProvider } from "./particle";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}  anchorOrigin={{ vertical: 'top', horizontal:'right' }} >
      <Main />

      </SnackbarProvider>
    </>
  );
}

export default App;
