import type {FC} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link} from 'react-router-dom';
import TextInput from '@/components/input/TextInput';
import {LoginRequestProps} from '@/types/auth';
import Button from '@/components/button/Button';

const Login: FC = () => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('require')
      .matches(/^(\+98|0)?9\d{9}$/, 'correctUsername')
  });
  const {handleSubmit, control, setValue} = useForm<LoginRequestProps | any>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: LoginRequestProps) => {
    // checkUser.post({
    //   username: data?.username,
    //   code: data?.code,
    //   key: data?.key,
    //   send_code: true
    // });
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
        <Button title="ورود" className="!px-6" />
      </div>
      <Link className="mt-8 text-right text-xs font-thin text-primary" to="/register">
        عضو نیستید ؟ ثبت نام کنید
      </Link>
    </form>
  );
};

export default Login;
