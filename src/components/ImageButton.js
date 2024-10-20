import styled, { keyframes, css } from 'styled-components';

const changeFloat = props => {
    if (props.right) {
        return 'right';
    } else if (props.left) {
        return 'left';
    } else {
        return 'inherit';
    }
};

const shake = keyframes`
  0%, 100%, 5%, 20%, 35%, 50%, 65%, 80% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(8deg); }
  40%, 60% { transform: rotate(-8deg); }
`;

export default styled.button`
    font-size: ${props => (props.small ? '0.9rem' : '1.4rem')};
    height: ${props => (props.small ? '25px' : 'initial')};
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColor};
    outline: none;
    overflow: hidden;
    border: none;
    float: ${changeFloat};
    ${props =>
        props.isReorderMode &&
        css`
            animation: ${shake} 2s ease-in-out infinite;
        `}

    &:hover {
        cursor: pointer;
        color: ${props => props.theme.btnBackgroundHover};
    }
`;
