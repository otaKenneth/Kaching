import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Formik } from 'formik';
import * as yup from 'yup';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { CustomInput } from 'src/components/CustomComponents';
import styles from 'assets/styles';

const Login = () => {
  const auth = getAuth();

  const userLogin = (values, options) => {
    const { setErrors, setSubmitting } = options;
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error.message)
      })
  }

  return (
    <View
      style={{
        width: '90%',

      }}
    >
      <Text style={styles.h4}>Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Invalid email.')
            .required('Email is required.'),
          password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters.`)
            .required('Password is required.')
        })}
        validateOnBlur={true}
        onSubmit={(values, { setErrors, setSubmitting }) => userLogin(values, { setErrors, setSubmitting })}
      >
        {({
          handleBlur, handleChange, handleSubmit, values, errors, isValid
        }) => (
          <>
            <CustomInput
              label="Email Address"
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              error={errors.email}
            />
            <CustomInput
              label="Password"
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              error={errors.password}
            />
            <View>
              <Button
                style={styles.button}
                mode='contained'
                onPress={handleSubmit}
              >
                Login
              </Button>
              <Button
                styles={styles.button}
              >
                Register
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;