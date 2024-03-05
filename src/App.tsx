import { AuthProvider } from "context/AuthContext";
import { ServiceWorkerProvider } from "context/ServiceWorkerContext";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "router/Router";
import { store } from "store/store";
import { GlobalStyles } from "theme/GlobalStyles.tsx";
import { ThemeMode } from "theme/ThemeMode.tsx";

function App() {
  return (
    <ThemeMode>
      <GlobalStyles />
      <BrowserRouter>
        <Provider store={store}>
          <ServiceWorkerProvider>
            <AuthProvider>
              <AppRouter />
              <ToastContainer />
            </AuthProvider>
          </ServiceWorkerProvider>
        </Provider>
      </BrowserRouter>
    </ThemeMode>
  );
}

export default App;
