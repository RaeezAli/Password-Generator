import { useState , useCallback , useEffect , useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null)

  const copyPassword = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 16);
    window.navigator.clipboard.writeText(password);
  }, [password])

  const passwordGenerator = useCallback( () => {

    let pass = "";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    if(numberAllow){
      string += "0123456789";
    }

    if(charAllow){
      string += "!@#$%^&*";
    }

    for(let i = 1; i <= length; i++){
      pass += string.charAt(Math.floor(Math.random() * string.length));
    }

    setPassword(pass);

  } , [length, numberAllow, charAllow, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordRef}
            readOnly
          />

          <button
            onClick={copyPassword}
            className='outline-none bg-blue-700 py-1 px-3 text-white hover:bg-blue-800 shrink-0'
          >Copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range"
             min={6}
             max={16}
             value={length}
             className='cursor-pointer'
             onChange={(e) => {
               setLength(e.target.value);
             }} />
             <label>Lenth: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={numberAllow}
             id='numberInput'
             className='cursor-pointer'
             onChange={() => {
               setNumberAllow((prev) => !prev);
             }} />
             <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={charAllow}
             id='charInput'
             className='cursor-pointer'
             onChange={() => {
               setCharAllow((prev) => !prev);
             }} />
             <label htmlFor='charInput'>Characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
