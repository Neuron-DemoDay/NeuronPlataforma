import React, {useEffect, useRef} from "react";
import { gsap } from "gsap/gsap-core";
import './Errou&Acertou.css'

export const Acertou = ({ onAnimationComplete }) => {
    const acertouRef = useRef(null);
  
    useEffect(() => {
      // Animação de fade in/out
      gsap.fromTo(acertouRef.current, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: () => {
        gsap.to(acertouRef.current, { opacity: 0, duration: 1, delay: 1, onComplete: onAnimationComplete });
      }});
    }, [onAnimationComplete]);
  
    return (
      <div ref={acertouRef} className="feedback">
        <h2>Parabéns!</h2>
      </div>
    );
  };