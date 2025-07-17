import { useState } from 'react';
import '../styles/register.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // 간단한 프론트 유효성 검사
    if (!form.name || !form.email || !form.password || !form.password2) {
      setError('모든 항목을 입력해 주세요.');
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      setError('유효한 이메일을 입력해 주세요.');
      return;
    }
    if (form.password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }
    if (form.password !== form.password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('회원가입이 완료되었습니다!');
      setForm({ name: '', email: '', password: '', password2: '' });
    }, 1000);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{minHeight: '100vh', background: '#f6f7fb'}}>
      <div className="fx-register-card mx-auto" style={{maxWidth: 420, width: '100%'}}>
        <div className="fx-register-title text-center mb-4">회원가입</div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3 position-relative">
            <span className="fx-register-icon bi bi-person" />
            <input type="text" className="form-control fx-register-input" name="name" value={form.name} onChange={handleChange} placeholder="이름" />
          </div>
          <div className="mb-3 position-relative">
            <span className="fx-register-icon bi bi-envelope" />
            <input type="email" className="form-control fx-register-input" name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
          </div>
          <div className="mb-3 position-relative">
            <span className="fx-register-icon bi bi-lock" />
            <input type="password" className="form-control fx-register-input" name="password" value={form.password} onChange={handleChange} placeholder="비밀번호" />
          </div>
          <div className="mb-3 position-relative">
            <span className="fx-register-icon bi bi-lock" />
            <input type="password" className="form-control fx-register-input" name="password2" value={form.password2} onChange={handleChange} placeholder="비밀번호 확인" />
          </div>
          {error && <div className="alert alert-danger py-2 text-center mb-2">{error}</div>}
          {success && <div className="alert alert-success py-2 text-center mb-2">{success}</div>}
          <button type="submit" className="btn btn-primary w-100 py-2 mt-2 mb-3" style={{fontWeight:600, fontSize:'1.13rem'}} disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
        <div className="text-center mt-1" style={{fontSize:'0.98rem', color:'#6a7ba2'}}>
          이미 계정이 있으신가요?{' '}
          <span className="fx-register-link" onClick={()=>window.location.href='/'}>로그인</span>
        </div>
      </div>
    </div>
  );
}
