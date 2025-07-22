import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/write.css';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) {
      setFormError('제목, 작성자, 본문을 모두 입력하세요.');
      return;
    }
    setFormError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, content })
      });
      if (!res.ok) throw new Error('등록 실패');
      navigate('/board');
    } catch {
      setFormError('등록 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fx-write-page-1440">
      <div className="fx-write-card">
        <div className="fx-write-title">게시글 작성</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="fx-write-input"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={60}
            autoFocus
          />
          <input
            type="text"
            className="fx-write-input"
            placeholder="작성자"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            maxLength={20}
          />
          <textarea
            className="fx-write-textarea"
            placeholder="본문을 입력하세요"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={10}
            maxLength={2000}
          />
          <div className="fx-write-error">{formError}</div>
          <div className="fx-write-btn-row">
            <button type="submit" className="fx-write-submit-btn" disabled={loading}>
              {loading ? '등록 중...' : '등록'}
            </button>
            <button type="button" className="fx-write-cancel-btn" onClick={()=>navigate('/board')} disabled={loading}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
