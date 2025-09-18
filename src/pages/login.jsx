import { useForm } from 'react-hook-form'
import { useNavigate , Link, redirect } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../api/supabaseClient'
import Signup from './signup'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [authError, setAuthError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    setAuthError('')
    const { email, password } = formData
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    navigate('/')

    if (error) {
      setAuthError(error.message)
      return
    }

    const user = data.user ?? data.session?.user

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md p-8 rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

        {authError && <p className="text-red-500 mb-4 text-center">{authError}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to='/signup' className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
