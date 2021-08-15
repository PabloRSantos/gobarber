import React, { HTMLAttributes } from 'react';

import { Container } from './styles';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
}

const Tolltip: React.FC<TooltipProps> = ({ title, children, ...rest }) => {
    return (
        <Container {...rest}>
            {children}
            <span>{title}</span>
        </Container>
    );
};

export default Tolltip;
