import { useState } from 'react';
import globalStyles from './../../styles/Global.module.css';
import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';
import Topbar from '../../components/Topbar/Topbar';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loading-icons';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Button from '../../components/Button/Button';
import { signupValidation } from '../../lib/yup';
import { SignUp } from '../../ts/types/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SignUp>({
    resolver: yupResolver(signupValidation),
  });

  const [error, setError] = useState({ message: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data:SignUp) => {
    setIsLoading(true);
    setError({ isError: false, message: '' });
    clearErrors();

    try {
       await axios.post<AxiosResponse>('/api/auth/signup', data);
      router.push('/account/my-account');
      setIsLoading(false);
    } catch (error: any) {
      setError({ isError: true, message: error?.response?.data?.message });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Criar conta</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Topbar title='Criar conta' />
      <div className={globalStyles.formContainer}>
        <ErrorMessage show={error.isError} message={error.message} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading} className={globalStyles.fieldSet}>
            <div className={globalStyles.formControl}>
              <label className={globalStyles.label} htmlFor='nome'>
                Nome
              </label>
              <input
                className={`${globalStyles.input} ${
                  errors.name ? globalStyles.inputError : undefined
                } `}
                type='text'
                id='name'
                {...register('name')}
                aria-label="Seu nome"
              />
              <small>{errors?.name?.message}</small>
            </div>
            <div className={globalStyles.formControl}>
              <label className={globalStyles.label} htmlFor='email'>
                E-mail
              </label>
              <input
                className={`${globalStyles.input} ${
                  errors.email ? globalStyles.inputError : undefined
                } `}
                type='email'
                id='email'
                {...register('email')}
                aria-label="Seu email"
              />
              <small>{errors?.email?.message}</small>
            </div>
            <div className={globalStyles.formControl}>
              <label className={globalStyles.label} htmlFor='password'>
                Senha
              </label>
              <input
                className={`${globalStyles.input} ${
                  errors.password ? globalStyles.inputError : undefined
                } `}
                type='password'
                id='password'
                {...register('password')}
                aria-label="Sua senha"
              />
              <small>{errors?.password?.message}</small>
            </div>
            <Button type='submit' aria-label="Efetuar cadastro">
              {isLoading ? <ThreeDots height={9} /> : 'Cadastrar'}
            </Button>
          </fieldset>
        </form>
      </div>
    </>
  );
};
export default Signup;
