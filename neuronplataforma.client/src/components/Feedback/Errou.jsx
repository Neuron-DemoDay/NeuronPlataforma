import React, {useEffect, useRef} from "react";
import { gsap } from "gsap/gsap-core";
import '../../styles/Feedback.css'

export const Errou = ({ onAnimationComplete }) => {
    const errouRef = useRef(null);
  
    useEffect(() => {
      // Animação de fade in/out
      gsap.fromTo(errouRef.current, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: () => {
        gsap.to(errouRef.current, { opacity: 0, duration: 1, delay: 1, onComplete: onAnimationComplete });
      }});
    }, [onAnimationComplete]);
  
    return (
      <div ref={errouRef} className="feedback">
        <h2>Não foi dessa vez!</h2>
      </div>
    );
  };