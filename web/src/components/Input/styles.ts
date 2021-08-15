import styled, { css } from 'styled-components';
import Tolltip from '../Tolltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    display: flex;
    align-items: center;

    border: 2px solid #232129;
    color: #666360;

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${(props) =>
        props.isFocused &&
        css`
            color: #ff9000;
            border-color: #ff9000;
        `}

    ${(props) =>
        props.isFilled &&
        css`
            color: #ff9000;
        `}

    & + div {
        margin-top: 8px;
    }

    input {
        background: transparent;
        border: 0;
        flex: 1;
        color: #f4ede8;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tolltip)`
    height: 20px;
    margin-left: 16px;

    svg {
        margin: 0;
    }

    span {
        background-color: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
