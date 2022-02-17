import React, { useState } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import './Calculator.css'

export default (props) => {

    const [display, setDisplay] = useState('0')
    const [clear, setClear] = useState(false)
    const [operation, setOperacao] = useState(null)
    const [values, setValues] = useState([0, 0])
    const [current, setCurrent] = useState(0)

    function clearMemory() {
        setDisplay('0')
        setClear(false)
        setOperacao(null)
        setValues([0, 0])
        setCurrent(0)
    }

    function setOperation(oper) {

        if (current === 0) {
            setOperacao(oper)
            setCurrent(1)
            setClear(true)
        } else {
            const equals = oper === '='
            const currentOperation = operation

            const NewValues = [...values]
            try {
                NewValues[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                NewValues[0] = values[0]
            }
            NewValues[1] = 0
            setDisplay(NewValues[0])
            setOperacao(equals ? null : oper)
            setCurrent(equals ? 0 : 1)
            setClear(!equals)
            setValues(NewValues)
        }
    }

    function addDigit(n) {
        //Verificar se ja existe . no display, caso já tenha,
        //o mesmo nao vai ser incluido
        if (n === '.' && display.includes('.')) {
            return
        }

        const clearDisplay = display === '0' || clear
        const currentValue = clearDisplay ? '' : display
        const displayValue = currentValue + n
        setDisplay(displayValue)
        setClear(false)

        if (n !== '.') {
            const i = current
            const newValor = parseFloat(displayValue)
            //const Newvalues = [...values]
            values[i] = newValor
            setValues(values)

        }

    }

    return (
        <div className="calculator">
            <Display value={display} />
            <Button label='AC' click={clearMemory} triple />
            <Button label='/' click={setOperation} operation />
            <Button label='7' click={addDigit} />
            <Button label='8' click={addDigit} />
            <Button label='9' click={addDigit} />
            <Button label='*' click={setOperation} operation />
            <Button label='4' click={addDigit} />
            <Button label='5' click={addDigit} />
            <Button label='6' click={addDigit} />
            <Button label='-' click={setOperation} operation />
            <Button label='1' click={addDigit} />
            <Button label='2' click={addDigit} />
            <Button label='3' click={addDigit} />
            <Button label='+' click={setOperation} operation />
            <Button label='0' click={addDigit} double />
            <Button label='.' click={addDigit} />
            <Button label='=' click={setOperation} operation />
        </div>
    )
}