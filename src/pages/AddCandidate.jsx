import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { supabase } from '../api/supabaseClient'

export default function AddCandidate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [polls, setPolls] = useState([])
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // ✅ Fetch polls created by the current admin
  useEffect(() => {
    const fetchPollsAndUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return

      setUser(user)

      const { data, error } = await supabase
        .from('polls')
        .select('id, title')
        .eq('created_by', user.id)

      if (!error) setPolls(data)
    }

    fetchPollsAndUser()
  }, [])

  // ✅ On submit, insert candidate into Supabase
  const onSubmit = async (formData) => {
    setSuccessMsg('')
    setErrorMsg('')

    const { poll_id, name, manifesto } = formData

    const { error } = await supabase.from('candidates').insert([
      {
        poll_id,
        name,
        manifesto,
        created_by: user.id
      }
    ])

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('Candidate added successfully!')
      reset()
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Candidate</h2>

      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Poll Selection */}
        <label className="block mb-2 font-semibold">Select Poll</label>
        <select
          {...register('poll_id', { required: 'Please select a poll' })}
          className="w-full px-3 py-2 border rounded mb-4"
        >
          <option value="">-- Select a Poll --</option>
          {polls.map((poll) => (
            <option key={poll.id} value={poll.id}>
              {poll.title}
            </option>
          ))}
        </select>
        {errors.poll_id && <p className="text-red-500 text-sm">{errors.poll_id.message}</p>}

        {/* Candidate Name */}
        <label className="block mb-2 font-semibold">Candidate Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        {/* Manifesto */}
        <label className="block mb-2 font-semibold">Manifesto</label>
        <textarea
          {...register('manifesto')}
          rows="4"
          className="w-full px-3 py-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Add Candidate
        </button>
      </form>
    </div>
  )
}
