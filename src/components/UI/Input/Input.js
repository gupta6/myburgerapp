import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;
    let inputClasses = [classes.inputElement];
   
    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    }
    
    switch(props.inputtype){
        case ('input'): 
            inputElement = <input className={inputClasses.join(' ')} 
                {...props.config}    
                value={props.value}
                onChange={props.change}/>; 
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} onChange={props.change}/>; 
            break;
        case ('select'): 
            inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.change}>
                {props.config.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
        default: inputElement = <input className={inputClasses.join(' ')} {...props} />;
    }
    return (
        <div className={classes.input}>
            <label className={classes.label}></label>
            {inputElement}
        </div>
    );
};

export default input;