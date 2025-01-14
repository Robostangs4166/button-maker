import ButtonLayout from './components/ButtonLayout'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center print:hidden">Button Layout Maker</h1>
        <ButtonLayout />
      </div>
    </div>
  )
}

export default App
