import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  const handleLogin = async () => {
        if (!username.trim()) {
            alert('아이디를 입력하세요.');
            return;
        }
        if (!password.trim()) {
            alert('비밀번호를 입력하세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.status === 'success') {
            setMessage('로그인 성공!');
            localStorage.setItem('jwt', data.token); // JWT 저장
            console.log("-------------------##")
            navigate('/home');
            } else {
            setMessage('로그인 실패: ' + data.message);
            }
        } catch (err) {
            setMessage('서버 오류: ' + err.message);
        }
    };


  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: '10px' }}>
        로그인 
      </button>

      {message && (
        <div style={{ marginTop: '20px', color: message.includes('성공') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;
