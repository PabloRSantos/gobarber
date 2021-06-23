import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
    return (
        <Container>
            <Background />

            <Content>
                <img src={logo} alt="GoBarber" />

                <form>
                    <h1>Faça seu cadastro</h1>
                    <Input icon={FiUser} name="name" placeholder="E-mail" />
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Cadastrar</Button>
                </form>
                <a href="signup">
                    <FiArrowLeft />
                    Voltar para logon
                </a>
            </Content>
        </Container>
    );
};

export { SignUp };
