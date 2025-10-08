import ThemeProvider from '../shared/lib/theme/ThemeProvider';
import './App.css'
import AppRouter from './providers/router/AppRouter';

function App() {
  return (
    <>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </>
  )
}

export default App;
