import { useState } from "react";

function ProgressBar ({current, total}){
    const progress = ((current + 1) / total) * 100
    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
    )
}

export default ProgressBar