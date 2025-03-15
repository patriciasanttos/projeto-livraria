import MainRoutes from './routes';
import Header from './components/Header'
import HomePage from './Pages/public/HomePage/HomePage';
function App() {
  return (
    <>
      <Header />
      <HomePage />  
      <MainRoutes />
    </>
  )
}

export default App
