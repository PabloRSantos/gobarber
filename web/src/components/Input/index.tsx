import { useField } from '@unform/core';
import React, {
    InputHTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi/';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    containerStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
    icon: Icon,
    name,
    containerStyle = {},
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container
            isErrored={!!error}
            isFocused={isFocused}
            isFilled={isFilled}
            style={containerStyle}
        >
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
            {error && (
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
        </Container>
    );
};

export default Input;
