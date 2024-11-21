
function startGame(){
    useEffect( () => {
    
        const startGame = async () => {
          const symbol = await fetchSymbols();
          setSymbols(symbol);
        }
          if (timeLeft > 0 && !feedback) {
            const timer = setTimeout(() => {  //começando a contagem
              setTimeLeft(timeLeft - 1);  //diminuindo 1 seg da timeLeft
            }, 1000);    //centésims
            return () => clearTimeout(timer);
          } else if (timeLeft === 0) {
            handleFeedback(false); // Feedback de erro se o tempo acabar
          }
    
        }
    
        
    
      , [timeLeft, feedback]);

}