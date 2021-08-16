import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background, AnimationContainer } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignInFormData): Promise<void> => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email('Digite um email válido')
                        .required('Email obrigatório'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, { abortEarly: false });

                await signIn({
                    email: data.email,
                    password: data.password,
                });

                history.push('/dashboard');
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error);

                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description:
                        'Ocorreu um erro ao fazer login, cheque as credencias',
                });
            }
        },
        [signIn, addToast, history],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
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
                        <Button type="submit">Entrar</Button>

                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
};

export { SignIn };
