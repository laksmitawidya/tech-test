import { useContext } from "react";
import "./App.css";
import NavbarItems from "./components/Navbar";
import { ThemeContext } from "./components/ThemeContext";
import { Products } from "./components/Products";
import { useProductStore } from "./hooks/useProductStore";
import ConfirmationModal from "./components/ConfirmationModal";

function App() {
  const { theme } = useContext(ThemeContext);
  const { isCheckoutDone } = useProductStore();
  return (
    <main
      className={`${theme} text-foreground bg-background min-h-screen h-full`}
    >
      <NavbarItems />
      <Products />
      {isCheckoutDone && <ConfirmationModal />}
    </main>
  );
}

export default App;
