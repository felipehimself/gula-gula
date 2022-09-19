import React, { Dispatch, useState, SetStateAction } from 'react';
import { NextPage } from 'next';
import globalStyles from './../../styles/Global.module.css';
import { useRouter } from 'next/router';
import styles from './Styles.module.css';
import { ThreeDots } from 'react-loading-icons';
import { STATES } from '../../utils/constants';
import { LoggedUser, FormUser } from '../../ts/types/types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../lib/yup';
import Button from '../Button/Button';

const { motion } = require('framer-motion');

const AccountForm: NextPage<{
  userInfo: LoggedUser;
  setEditInfo?: Dispatch<SetStateAction<boolean>>;
  editInfo?: boolean;
}> = ({ userInfo, setEditInfo, editInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ message: '', show: false });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormUser>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      additional: userInfo.address.additional,
      city: userInfo.address.city,
      district: userInfo.address.district,
      federalUnit: userInfo.address.federalUnit,
      number: userInfo.address.number,
      street: userInfo.address.street,
      zipCode: userInfo.address.zipCode,
      name: userInfo.name,
      email: userInfo.email,
    },
  });

  const onSubmit = async (data: FormUser) => {

    setIsLoading(true);
    try {
      await axios.put('/api/account', data);
      router.reload();
    } catch (error:  unknown | AxiosError) {
      setIsLoading(false);
      setIsError({ message: 'Ocorreu um erro', show: true });
    }
  };

  const handleZipcode = async (e: any) => {
    const { value } = e.target;

    const zipFormatted = value
      .replace(/\D+/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');

    setValue('zipCode', zipFormatted);

    if (zipFormatted.length === 9) {
      setIsLoading(true);
      const zipToSearch = zipFormatted.replace('-', '');

      try {
        const res = await axios.get(
          `https://viacep.com.br/ws/${zipToSearch}/json/`
        );
        const data = await res.data;

        if (data.erro) {
          setError(
            'zipCode',
            { message: 'CEP Inválido' },
            { shouldFocus: true }
          );
          setIsLoading(false);
        } else {
          setValue('street', data.logradouro);
          setValue('district', data.bairro);
          setValue('federalUnit', data.uf);
          setValue('city', data.localidade);
          clearErrors(['street', 'district', 'federalUnit', 'city', 'zipCode']);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError({ message: 'Ocorreu um erro', show: true });
      }
    }
  };

  return (
    <motion.div className={` ${styles.modal}`}>
      <motion.section
        initial={{ y: 500, opacity: 0 }}
        animate={{
          y: 50,
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        }}
        exit={{ y: 500, opacity: 0 }}
        className={`${styles.content}`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage message={isError.message} show={isError.show} />
          <fieldset disabled={isLoading} className={globalStyles.fieldSet}>
            <div className={styles.customFormControl}>
              <div className={globalStyles.formControl}>
                <label className={globalStyles.label} htmlFor='street'>
                  Rua
                </label>
                <input
                  className={`${globalStyles.input} ${
                    errors?.street?.message
                      ? globalStyles.inputError
                      : undefined
                  }`}
                  type='text'
                  id='street'
                  {...register('street')}
                />
                <small>{errors?.street?.message}</small>
              </div>
              <div className={globalStyles.formControl}>
                <label className={globalStyles.label} htmlFor='number'>
                  Número
                </label>
                <input
                  type='text'
                  id='number'
                  {...register('number')}
                  className={`${globalStyles.input} ${
                    errors?.number?.message
                      ? globalStyles.inputError
                      : undefined
                  }`}
                />
                <small>{errors?.number?.message}</small>
              </div>

              <div className={globalStyles.formControl}>
                <label className={globalStyles.label} htmlFor='zipCode'>
                  CEP
                </label>
                <input
                  type='text'
                  id='zipCode'
                  className={`${globalStyles.input} ${
                    errors?.zipCode?.message
                      ? globalStyles.inputError
                      : undefined
                  }`}
                  {...register('zipCode')}
                  onChange={handleZipcode}
                />
                <small>{errors?.zipCode?.message}</small>
              </div>
            </div>

            <div className={styles.customFormControl}>
              <div className={globalStyles.formControl}>
                <label className={globalStyles.label} htmlFor='additional'>
                  Complemento
                </label>
                <input
                  className={globalStyles.input}
                  type='text'
                  id='additional'
                  {...register('additional')}
                />
              </div>
              <div className={globalStyles.formControl}>
                <label className={globalStyles.label} htmlFor='district'>
                  Bairro
                </label>
                <input
                  type='text'
                  id='district'
                  className={`${globalStyles.input} ${
                    errors?.district?.message
                      ? globalStyles.inputError
                      : undefined
                  }`}
                  {...register('district')}
                />
                <small>{errors?.district?.message}</small>
              </div>
            </div>

            <div className={styles.customFormControl}>
              <div className={globalStyles.formControl}>
                <label className={globalStyles.label} htmlFor='city'>
                  Cidade
                </label>
                <input
                  type='text'
                  id='city'
                  className={`${globalStyles.input} ${
                    errors?.city?.message ? globalStyles.inputError : undefined
                  }`}
                  {...register('city')}
                />
                <small>{errors?.city?.message}</small>
              </div>
              <div className={globalStyles.formControl}>
                <label className={globalStyles.label} htmlFor='state'>
                  Estado
                </label>
                <select
                  id='federalUnit'
                  className={`${globalStyles.input} ${
                    errors?.federalUnit?.message
                      ? globalStyles.inputError
                      : undefined
                  }`}
                  {...register('federalUnit')}
                >
                  {STATES.map((state) => {
                    return (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
                <small>{errors?.federalUnit?.message}</small>
              </div>
            </div>

            <Button
              disabled={isLoading}
              type='submit'
            >
              {isLoading ? <ThreeDots height={9} /> : 'Concluir'}
            </Button>
                  <br />
            {editInfo && (
              <Button
                disabled={isLoading}
                type='button'
                onClick={() => setEditInfo?.(false)}
                flat
              >
                Cancelar
              </Button>
            )}
          </fieldset>
        </form>
      </motion.section>
    </motion.div>
  );
};
export default AccountForm;
