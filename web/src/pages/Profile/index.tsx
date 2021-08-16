import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { api } from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
    name: string;
    email: string;
    password: string;
    old_password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { user, updateUser } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleAvatarChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                const file = event.target.files[0];

                const data = new FormData();

                data.append('avatar', file);

                const response = await api.patch('/users/avatar', data);

                updateUser(response.data);

                addToast({
                    type: 'success',
                    title: 'Avatar atualizado',
                });
            }
        },
        [addToast, updateUser],
    );

    const handleSubmit = useCallback(
        async (data: ProfileFormData): Promise<void> => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .email('Digite um email válido')
                        .required('Email obrigatório'),
                    old_password: Yup.string(),
                    password: Yup.string().when('old_password', {
                        is: (value: string) => !!value.length,
                        then: Yup.string().required('Campo obrigatório'),
                        otherwise: Yup.string(),
                    }),
                    password_confirmation: Yup.string()
                        .when('password', {
                            is: (value: string) => !!value.length,
                            then: Yup.string().required('Campo obrigatório'),
                            otherwise: Yup.string(),
                        })
                        .oneOf(
                            [Yup.ref('password'), null],
                            'Confirmação incorreta',
                        ),
                });

                await schema.validate(data, { abortEarly: false });

                const {
                    name,
                    email,
                    password,
                    old_password,
                    password_confirmation,
                } = data;

                const formData = {
                    name,
                    email,
                    ...(old_password
                        ? {
                              password,
                              old_password,
                              password_confirmation,
                          }
                        : {}),
                };

                const response = await api.put('/profile', formData);

                updateUser(response.data);

                addToast({
                    type: 'success',
                    title: 'Perfil atualizado!',
                    description:
                        'Suas informações do perfil foram atualizadas com sucesso',
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
                    title: 'Erro na atualização',
                    description:
                        'Ocorreu um erro ao atualizar perfil, tente novamente',
                });
            }
        },
        [history, addToast, updateUser],
    );

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={{
                        name: user.name,
                        email: user.email,
                    }}
                >
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name} />
                        <label htmlFor="avatar">
                            <FiCamera />
                            <input
                                onChange={handleAvatarChange}
                                type="file"
                                id="avatar"
                            />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input icon={FiUser} name="name" placeholder="E-mail" />
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input
                        containerStyle={{ marginTop: 24 }}
                        icon={FiLock}
                        name="old_password"
                        type="password"
                        placeholder="Senha atual"
                    />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Nova senha"
                    />
                    <Input
                        icon={FiLock}
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirmar senha"
                    />
                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    );
};

export { Profile };
