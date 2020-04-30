import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.input`
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background-color: #fafafa;
    height: 35px;
    font-size: 12px;
    padding: 0 15px;
`;

const Input = ({placeholder, required = true, value, onChange, type="text", className }) => (
<Container  placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            type={type}
            className={className}
            />
            )

Input.propType = {
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default Input;