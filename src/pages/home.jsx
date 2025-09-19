import React from 'react'
import Login_Logout_Btn from '../defined_UI/login_logout_btn'
import ErrorPage from '../defined_UI/error';

function Home() {
  return (
    <>
      <h1>This is home page</h1>
      {/* <ErrorPage /> */}
      <Login_Logout_Btn />
    </>
  )
}

export default Home;
