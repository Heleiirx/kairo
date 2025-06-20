import ContainerXL from "./components/ContainerXL";
import ModalUserAuth from "./ui components/ModalUserAuth";
function App() {

  return (
    // Edit class 
    <ContainerXL className="flex flex-col items-center justify-center">  
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ModalUserAuth />
    </div>
    </ContainerXL>
  )
}

export default App
