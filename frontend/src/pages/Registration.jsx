import React from 'react'
import Button from '../Utils/Button.jsx'
import Input from '../Utils/Input.jsx'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useMutation } from 'react-query';



function Registration() {
 
  const RegisterUser = async (data) => {
    try {
    const response = await axios.post('/api/registeruser', {
      avatar: data.avatar[0],
      firstname : data.firstname,
      lastname : data.lastname,
      phoneNumber : data.phoneNumber,
      birthdate : data.birthdate,
      password : data.password,
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }});
    if (response.status = 200) {
      return response
    }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const {register, handleSubmit} = useForm()
  const { mutate, isLoading, isError, error , data} = useMutation(RegisterUser);
const onSubmit = (data) => {mutate(data);};

  return (
<div className=" bg-slate-300 md:h-screen flex items-center justify-center">
<div className="max-w-lg m-auto  bg-white bg-opacity-50 rounded-lg shadow-lg p-6 ">

<form onSubmit={handleSubmit(onSubmit)}>
<div className=' font-bold text-xl'>Register User</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 mb-8">
<Input label="Profile Pic : " type ="file" placeholder="Uplod Avatar"{...register("avatar", { required: true, })} />
<Input label="FirstName : " placeholder="Entery your FirstName"{...register("firstname", { required: true, })} />
<Input label="LastName : " placeholder="Entery your LastName"{...register("lastname", { required: true, })} />
<Input label="Phone Number : " type ="number" placeholder="Phone Number"{...register("phoneNumber", { required: true, })} />
<Input label="Birth-Date : " type ="date" {...register("birthdate", { required: true, })} />
<Input label="Password : " type ="password" placeholder="Enter yor Password"{...register("password", { required: true, })} />
{isError && <p>{error.message}</p>}{data && (<p className=' font-bold text-blue-700 '> {console.log(data)}User Registerd successfully !!</p>)}
{isLoading ? <p className=' font-bold text-green-700 '>Wait...Registering User..!</p> : null } 
</div>
<Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating...Account...' : 'Create account'}</Button>
</form>
</div>
    </div>
  )
}

export default Registration
