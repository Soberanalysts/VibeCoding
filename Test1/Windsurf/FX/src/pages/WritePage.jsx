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
      {/* 상단 헤더 */}
      <div className="fx-write-header">
        <button className="fx-write-header-btn" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="fx-write-header-title">게시글 작성</div>
        <button className="fx-write-header-btn" onClick={() => alert('미리보기 기능은 추후 지원됩니다.')}
          style={{marginLeft:'auto'}}>
          <span className="material-icons">visibility</span>
        </button>
      </div>
      <div className="fx-write-card" style={{paddingBottom:0}}>
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
        </form>
      </div>
      {/* 하단 버튼 footer */}
      <div className="fx-write-footer">
        <button type="button" className="fx-write-cancel-btn" onClick={()=>navigate('/board')} disabled={loading}>
          Cancel
        </button>
        <button type="button" className="fx-write-submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
