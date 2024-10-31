import { ChangeEvent, useRef, useState } from "react";
import "./otp.css";

const OtpInputs = () => {
    const [inputCount, setInputCount] = useState(4); // Number of inputs
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [inputs, setInputs] = useState<{ value: string }[]>(Array.from({ length: inputCount }, () => ({ value: "" })));

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputs = [...inputs];
        const value = e.target.value;

        if (e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === "deleteContentBackward") {
            newInputs[index].value = "";
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
            setInputs(newInputs);
        } else {
            newInputs[index].value = value;
            setInputs(newInputs);

            if (value && index < inputs.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault(); 

        const pastedData = e.clipboardData.getData("Text");
        const newInputs = [...inputs];
        const newValues = pastedData.split("").slice(0, inputs.length - index);

        newValues.forEach((val, i) => {
            if (index + i < inputs.length) {
                newInputs[index + i].value = val; 
            }
        });

        setInputs(newInputs);
        if (newValues.length > 0) {
            inputRefs.current[index + newValues.length - 1]?.focus(); 
        }
    };

    const handleInputCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const count = Number(e.target.value);
        setInputCount(count);
        setInputs(Array.from({ length: count }, () => ({ value: "" }))); 
        inputRefs.current = Array(count).fill(null); 
    };

    return (
        <div className="otp-container">
            <input 
                type="number" 
                value={inputCount} 
                onChange={handleInputCountChange} 
                min={1} 
                max={10} 
            />
            <div className="inputDivs">
                {inputs.map((input, index) => (
                    <input
                        ref={(inputElementReference) => {
                            inputRefs.current[index] = inputElementReference;
                        }}
                        type="number"
                        key={index}
                        onChange={(e) => handleChange(e, index)}
                        onPaste={(e) => handlePaste(e, index)} 
                        value={input.value}
                    />
                ))}
            </div>
        </div>
    );
};

export default OtpInputs;
