import { ChangeEvent, useRef, useState } from "react";
import "./otp.css";

const OtpInputs = () => {
    const [inputCount, setInputCount] = useState(4);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [inputs, setInputs] = useState<{ value: string }[]>(Array.from({ length: inputCount }, () => ({ value: "" })));

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputs = [...inputs];
        const value = e.target.value;

  
        if (value.length > 1 || !/^[0-9]*$/.test(value)) {
            return;
        }

        newInputs[index].value = value;
        setInputs(newInputs);

        
        if (value && index < inputs.length - 1) {
            inputRefs.current[index + 1]?.focus();
        } else if (index === inputs.length - 1) {
            e.target.blur();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const newInputs = [...inputs];


        if (e.key === "Backspace") {
            if (newInputs[index].value === "") {
              
                if (index > 0) {
                    newInputs[index - 1].value = "";
                    setInputs(newInputs);
                    inputRefs.current[index - 1]?.focus(); 
                }
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault(); 
    
        const pastedData = e.clipboardData.getData("Text");
        const newValues = pastedData.split("").slice(0, 8);
    
        const startIndex = index; 
        const newCount = Math.max(startIndex + newValues.length, inputCount);
    
        const updatedInputs = Array.from({ length: newCount }, (_, i) => ({
            value: newValues[i - startIndex] || (i < startIndex ? inputs[i].value : "") 
        }));
    
        setInputCount(newCount);
        setInputs(updatedInputs);
        inputRefs.current = Array(newCount).fill(null); 
    
        if (newValues.length > 0) {
            inputRefs.current[startIndex + newValues.length - 1]?.focus(); 
        }
    };

    const handleInputCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const count = Math.max(1, Math.min(8, Number(e.target.value))); 
        setInputCount(count);
        setInputs(Array.from({ length: count }, () => ({ value: "" }))); 
        inputRefs.current = Array(count).fill(null);
    };

    return (
        <div className="otp-container">
            <label className="input-label">Input Count:</label>
            <input 
                type="number" 
                className="count-input" 
                value={inputCount} 
                onChange={handleInputCountChange} 
                min={1} 
                max={10} 
                placeholder="Count" 
            />
            <div className="inputDivs">
                {inputs.map((input, index) => (
                    <div key={index} className="input-wrapper">
                        <input
                            ref={(inputElementReference) => {
                                inputRefs.current[index] = inputElementReference;
                            }}
                            type="number" 
                            maxLength={1} 
                            value={input.value}
                            onChange={(e) => handleChange(e, index)}
                            onPaste={(e) => handlePaste(e, index)} 
                            onKeyDown={(e) => handleKeyDown(e, index)} 
                        />
                    </div>
                ))}
            </div>
        </div>
        );
};

export default OtpInputs;
