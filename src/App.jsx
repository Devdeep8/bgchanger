import React, { useCallback, useState , useEffect , useRef}  from 'react';

function App() {
  const [length , setLenght] = useState(20)
  const [password, setPassword] = useState('');
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [isNumAllowed, setIsNumAllowed] = useState(false);

  const passwordReff = useRef(null)

  const handleCopy = () => {
    window.navigator.clipboard.writeText(password);
    passwordReff.current.select()

  };
  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isNumAllowed) str += "0123456789"
    if(isCharAllowed) str += "~`!@#$%^&*()_+/-{}[]:;<>,.?"

    for (let i = 0; i < length; i++) {
     const char =  Math.floor(Math.random() * str.length + 1);
     pass += str.charAt(char)
      
    }
    setPassword(pass)
  } , [length , isCharAllowed , isNumAllowed])

  useEffect(()=>{
generatePassword()
  }, [length , isCharAllowed , isNumAllowed])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
          placeholder="Enter password"
          readOnly
          ref={passwordReff}
        />
        <div className="flex items-center gap-x-1">
          <input type="range" name="" id="" 
          min={8}
          max={25}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLenght(e.target.value)}/>
          <label htmlFor="length" >length : {length} </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isCharAllowed}
            onChange={() => setIsCharAllowed((prev) => !prev)}
            className="mr-2"
          />
          <label>Characters Allowed</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isNumAllowed}
            onChange={() => setIsNumAllowed((prev) => !prev )}
            className="mr-2"
          />
          <label>Numbers Allowed</label>
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Copy Password
        </button>
      </div>
    </div>
  );
}

export default App;
