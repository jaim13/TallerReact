import React, { useState, useRef, useEffect } from 'react';
import '../styles/Stopwatch.css'
const Stopwatch = () => {
  // Estado para almacenar el tiempo transcurrido en segundos
  const [time, setTime] = useState(0);

  // Estado para indicar si el cronómetro está en marcha o detenido
  const [isRunning, setIsRunning] = useState(false);

  // useRef para almacenar la referencia del temporizador (setInterval)
  const timerRef = useRef(null);

  // useEffect para manejar los efectos secundarios relacionados con el cronómetro
  useEffect(() => {
    // Si el cronómetro está en marcha, iniciar un intervalo
    if (isRunning) {
      timerRef.current = setInterval(() => {
        // Incrementar el tiempo cada segundo
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      // Si el cronómetro está detenido, limpiar el intervalo
      clearInterval(timerRef.current);
    }

    // Función de limpieza para limpiar el intervalo cuando el componente se desmonte
    // o cuando isRunning cambie
    return () => clearInterval(timerRef.current);
  }, [isRunning]); // Dependencia: se ejecuta cuando isRunning cambia

  // Función para iniciar el cronómetro
  const handleStart = () => {
    setIsRunning(true);
  };

  // Función para detener el cronómetro
  const handleStop = () => {
    setIsRunning(false);
  };

  // Función para reiniciar el cronómetro
  const handleReset = () => {
    setIsRunning(false); // Detener el cronómetro
    setTime(0); // Reiniciar el tiempo a 0
  };

  return (
    <div className="container">
      <h1>Stopwatch</h1>
      <p>{time}s</p>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop} disabled={!isRunning}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};


export default Stopwatch;
