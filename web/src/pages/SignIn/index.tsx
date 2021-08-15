import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getValidationErrors } from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: FormData): Promise<void> => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Digite um email válido')
                    .required('Email obrigatório'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, { abortEarly: false });
        } catch (error) {
            const errors = getValidationErrors(error);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Content>
                <img src={logo} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="signup">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>

            <Background />
        </Container>
    );
};

export { SignIn };
