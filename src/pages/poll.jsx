import { useForm } from 'react-hook-form'
import { supabase } from '../api/supabaseClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Poll() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')


  // ✅ Form submit handler
  const onSubmit = async (formData) => {

    setErrorMsg('')
    setSuccessMsg('')

    const { title, desc, start_time, end_time } = formData

    const { error } = await supabase.from('polls').insert([
      {
        title,
        desc,
        start_time,
        end_time
      }
    ])

    if (error) {
      setErrorMsg(error.message)
      console.error(error)
    } else {
      setSuccessMsg('Poll created successfully!')
      reset()
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Poll</h2>

      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <label className="block mb-2 font-semibold">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        {/* Description */}
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          {...register('desc')}
          rows="3"
          className="w-full px-3 py-2 border rounded mb-4"
        />

        {/* Start Time */}
        <label className="block mb-2 font-semibold">Start Time</label>
        <input
          type="datetime-local"
          {...register('start_time', { required: 'Start time is required' })}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time.message}</p>}

        {/* End Time */}
        <label className="block mb-2 font-semibold">End Time</label>
        <input
          type="datetime-local"
          {...register('end_time', { required: 'End time is required' })}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Create Poll
        </button>
      </form>
    </div>
  )
}
