import styled from 'styled-components';

const TextButton = styled.button`
    color: ${props => (props.type === 'danger' ? '#fff' : props.theme.btnColor)};
    height: auto;
    width: auto;
    padding: 0.3rem;
    border-radius: 6px;
    outline: none;
    border: none;
    font-weight: 500;
    cursor: pointer;
    background: ${props => (props.type === 'danger' ? '#FF3232' : props.theme.primaryColor)};
    float: ${props => props.float};

    &: hover {
        background: ${props => (props.type === 'danger' ? '#ff7878' : props.theme.btnBackgroundHover)};
    }
`;

export default TextButton;