import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import ActionButton from './ActionButton';
import Input from './Input';
import { getBadgeColor } from '../badgeColors.js';

const baseItem = ({ className, ...props }) => {
    const color = getBadgeColor(props.index)[0];
    return (
        <div className={className} isReorderMode={props.isReorderMode}>
            {props.isReorderMode ? (
                <DragIconWrapper color={color} index={props.index}>
                    <i class="fas fa-arrows-alt"></i>
                </DragIconWrapper>
            ) : (
                <ActionButton type="delete" onClick={props.delete} disabled={props.isReorderMode} />
            )}
            <Input itemName value={props.itemName} onChange={props.itemNameChange} disabled={props.isReorderMode} />

            <Input number value={props.numberValue} onChange={props.numberChange} disabled={props.isReorderMode} />
            <ActionButton type="plus" onClick={props.increment} disabled={props.isReorderMode} />
            <ActionButton type="minus" onClick={props.decrement} disabled={props.isReorderMode} />
            <ActionButton type="undo" onClick={props.reset} disabled={props.isReorderMode} />
        </div>
    );
};

const DragIconWrapper = styled.div`
    font-size: 22px;
    width: 24px;
    height: 22px;
    margin: 0 0.2rem;
    color: ${props => (props.index < 12 ? props.color : props.theme.accentColor)};
`;

const Item = styled(baseItem)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem 0;
    background: ${props => props.theme.backgroundColor};
    background-color: ${props =>
        props.isReorderMode ? (props.darkTheme ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)') : 'transparent'};
    cursor: ${props => (props.isReorderMode ? 'move' : 'default')};
    transition: background-color 0.2s ease !important;
    position: relative;
    &:hover {
        background-color: ${props =>
            props.isReorderMode
                ? props.darkTheme
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(0, 0, 0, 0.1)'
                : 'transparent'};
    }
    ${props =>
        props.isReorderMode &&
        `
        * {
            cursor: move !important;
            pointer-events: none !important;
        }
    `}
`;

Item.propTypes = {
    numberValue: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    itemNameChange: PropTypes.func.isRequired,
    numberChange: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    darkTheme: PropTypes.bool,
};

export default Item;
