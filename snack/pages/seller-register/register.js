// pages/seller-register/register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Section from '@/components/layout/section'


const Register = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/register', { account, password });
      if (response.data.success) {
        alert('注册成功，请登录');
        router.push('/seller-login/login'); // 注册成功后导航到登录页面
      } else {
        alert(response.data.message); // 显示错误信息
      }
    } catch (error) {
      console.error('注册请求失败', error);
      alert('注册失败');
    }
  };

  return (
    <Section>
      {/* <NavbarSeller /> */}
      <div className="container mt-3">
        <h1>注册</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="account" className="form-label">账号:</label>
            <input type="text" id="account" className="form-control" value={account} onChange={(e) => setAccount(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">密码:</label>
            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">注册</button>
        </form>
      </div>
      </Section>
  );
};

export default Register;
