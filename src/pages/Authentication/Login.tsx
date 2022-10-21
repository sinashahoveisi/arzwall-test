import type {FC} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useNavigate} from 'react-router-dom';
import TextInput from '@/components/input/TextInput';
import {LoginRequestProps} from '@/types/auth';
import Button from '@/components/button/Button';
import {usernameRegex, passwordRegex} from '@/assets/constants/auth';
import usePost from '@/hooks/request/usePost';
import useUser from '@/hooks/user/useUser';

const Login: FC = () => {
  const user = useUser();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('ایمیل یا شماره موبایل معتبر وارد نمایید')
      .matches(usernameRegex, 'ایمیل یا شماره موبایل معتبر وارد نمایید'),
    password: yup
      .string()
      .trim()
      .required('')
      .matches(passwordRegex, 'حد اقل ۸ کاراکتر، شامل یک حرف بزرگ ، یک عدد ، یک کارکتر خاص')
  });
  const {handleSubmit, control} = useForm<LoginRequestProps>({
    resolver: yupResolver(validationSchema)
  });

  const postLoginRequest = usePost({
    url: 'auth/verify',
    onSuccess(response: any) {
      user.setUser({
        access_token: response?.data?.access_token,
        refresh_token: response?.data?.access_token,
        is_logged_in: true
      });
      navigate('/dashboard', {replace: true});
    }
  });

  const onSubmit = (data: LoginRequestProps) => {
    postLoginRequest.post(data);
  };

  return (
    <form className="flex w-full flex-col justify-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center text-base font-thin">ورود به حساب کاربری</h3>
      <TextInput name="username" label="ایمیل یا شماره همراه" control={control} />
      <TextInput name="password" type="password" label="کلمه عبور" control={control} />
      <Link className="text-center text-xs font-thin text-primary" to="/forgetPassword">
        فراموشی رمز عبور
      </Link>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button title="ورود با گوگل" />
        <Button type="submit" title="ورود" className="!px-6" isLoading={postLoginRequest?.isLoading} />
      </div>
      <Link className="mt-8 text-right text-xs font-thin text-primary" to="/register">
        عضو نیستید ؟ ثبت نام کنید
      </Link>
    </form>
  );
};

export default Login;
