import { useState } from 'react';

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
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{minHeight: '80vh'}}>
      <div className="bg-white rounded shadow-sm p-4" style={{maxWidth: 420, width: '100%'}}>
        <h2 className="fw-bold text-center mb-4 text-primary">회원가입</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">이름</label>
            <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="이름 입력" />
          </div>
          <div className="mb-3">
            <label className="form-label">이메일</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">비밀번호</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="비밀번호 입력" />
          </div>
          <div className="mb-3">
            <label className="form-label">비밀번호 확인</label>
            <input type="password" className="form-control" name="password2" value={form.password2} onChange={handleChange} placeholder="비밀번호 재입력" />
          </div>
          {error && <div className="alert alert-danger py-2 text-center mb-2">{error}</div>}
          {success && <div className="alert alert-success py-2 text-center mb-2">{success}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
}
