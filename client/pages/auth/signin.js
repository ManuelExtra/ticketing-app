import axios from "axios";
import { useRouter } from 'next/router'
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const signin = () => {
    const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {doRequest, errors} = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {email, password},
    onSuccess: () => router.push('/')
  })

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest()
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default signin;
