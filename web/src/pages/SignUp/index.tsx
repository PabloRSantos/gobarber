import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import { Container, Content, Background, AnimationContainer } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getValidationErrors } from '../../utils/getValidationErrors';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: FormData): Promise<void> => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .email('Digite um email válido')
                    .required('Email obrigatório'),
                password: Yup.string().min(6, 'No mínimo 6 digitos'),
            });

            await schema.validate(data, { abortEarly: false });
        } catch (error) {
            const errors = getValidationErrors(error);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Background />

            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input icon={FiUser} name="name" placeholder="E-mail" />
                        <Input
                            icon={FiMail}
                            name="email"
                            placeholder="E-mail"
                        />
                        <Input
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="Senha"
                        />
                        <Button type="submit">Cadastrar</Button>
                    </Form>
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export { SignUp };
