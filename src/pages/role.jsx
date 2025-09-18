import { useForm } from "react-hook-form"
import { supabase } from "../api/supabaseClient"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function RoleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)

    try {
      // ✅ get current logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) throw userError
      if (!user) throw new Error("User not logged in")

      // ✅ insert profile
      const { error: dbError } = await supabase
        .from("profiles")
        .insert({
          id: user.id, // use auth user id
          full_name: data.full_name,
          role: data.role,
          institute: data.institute,
        })
        .eq("id", user.id) // make sure update happens if already exists

      if (dbError) throw dbError

      // ✅ redirect based on role
      if (data.role === "admin") navigate("/admin/dashboard")
      else navigate("/dashboard")
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Complete Your Profile</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80"
      >
        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          {...register("full_name", { required: "Full name is required" })}
          className="border p-2 rounded"
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name.message}</p>
        )}

        {/* Role */}
        <select
          {...register("role", { required: "Please select a role" })}
          className="border rounded p-2"
        >
          <option value="">-- Select Role --</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}

        {/* Institutes */}
        <input
          type="text"
          placeholder="Institute Name"
          {...register("institute", { required: "Institute is required" })}
          className="border p-2 rounded"
        />
        {errors.institute && (
          <p className="text-red-500 text-sm">{errors.institute.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
