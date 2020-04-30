import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button `
    width: 100%;
    border: 0;
    border-radius: 4px;
    color: white;
    font-weight: 600;
    background-color: #2c3e50;
    padding: 7px 0;
    font-size: 14px;
    cursor: pointer;
`;

const Button = ({ text, onClick }) => (
    <Container onClick={onClick}>
        {text}
    </Container>
);

Button.propTypes = {
    text: PropTypes.string.isRequired
}

export default Button;