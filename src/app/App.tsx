
import { Provider } from "react-redux";
import { store } from "../app/providers/store/store";
import ThemeProvider from '../shared/lib/theme/ThemeProvider';
import AppRouter from '../app/providers/router/AppRouter';

function App() {
  return (

    <ThemeProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>

  );
}

export default App;