import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CssBaseline, Container } from "@mui/material";
// import UserForm from './components/UserForm';
import UserForm from "./component/UserForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CssBaseline />
      <Container>
        <UserForm />
      </Container>
    </>
  );
}

export default App;
