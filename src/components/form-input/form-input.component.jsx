import { FormInputLabel, Input, Group} from './form-input.styles';
/*
input html element uses the properties of the otherProps object as attribute
 and the values of otherProps object to be the values for the attribute.

Use for &&
It is an operator where it means AND. It is being used to judge if we
got label passed as a value, but in our case it always will be passed.
 */


const FormInput = ({ label, ...otherProps }) => {
    //in the classname we are appending the class shrink, where if it's length is greater than cero or true
    return (
        <Group> 
            <Input {...otherProps}/>
            {label && (
                <FormInputLabel 
                    shrink={otherProps.value}
                >
                    {label}
                </FormInputLabel>                
            )}
        </Group>
    );
};

export default FormInput;