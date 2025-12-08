import ContainerXL from "./components/ContainerXL";
function App() {

  return (
    // Edit class 
    <ContainerXL className="flex flex-col items-center justify-center">  
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
        <h2 className="text-lg">Welcome to</h2>
        <h1 className="text-6xl font-serif">Kairo</h1>
        <p className="text-sm"> Kairo es una aplicación web de organización personal basada en la técnica Pomodoro y en la filosofía del tiempo oportuno (kairos). </p>
      </div>
    </ContainerXL>
  )
}

export default App
