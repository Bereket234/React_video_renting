import { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = { 
        data: {},
        error: {}
     } 
     

    validate=()=>{
        const {error} = Joi.validate(this.state.data, this.schema, {abortEarly: false})
        
        if(!error) 
            return null
        
        const errors= {}

        for (let item of error.details)
            errors[item.path[0]]= item.message

        return errors

     }
     validateProperty= ({name, value})=>{
        const obj= {[name]:value}
        const schema= {[name]:this.schema[name]}
        const {error}= Joi.validate(obj, schema)

       return error? error.details[0].message: null
    }

     handleSubmit= e=> {
         e.preventDefault()
         
        const error= this.validate()

         this.setState({error: error|| {}})

         if(error) return;
        
        this.doSubmit()
     }

     
    handleChange= ({currentTarget: input})=>{
        let error= {...this.state.error}
        const errorMessage= this.validateProperty(input)
        if(errorMessage) error[input.name]= errorMessage
        else delete error[input.name]
 
        const data= {...this.state.data}
        data[input.name]= input.value
        this.setState({data, error})
     }

     renderButton= label=>{
        return <button disabled={this.validate()} onClick={this.handleSubmit} type='submit' className="btn btn-primary">{label}</button>
     }
    
    renderInput= ( name, label, type= 'text')=> {
        const {data, error}= this.state
        return(
            <Input
                onChange={this.handleChange}
                label= {label}
                value={data[name]}
                error= {error[name]}
                name={name}
                type={type}
            />
        )
    }

    renderSelectOption= (items, label, name, id)=> {
        return(
            <Select
                onChange= {this.handleChange}
                name={name}
                id={id}
                label={label}
                items={items}
            />
        )
    }
}
 
export default Form;