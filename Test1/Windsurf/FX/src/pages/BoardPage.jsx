import { useEffect, useState } from 'react';
import '../styles/board.css';

export default function BoardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // 글쓰기 폼 상태
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [formError, setFormError] = useState('');

  // 게시글 목록 불러오기
  const fetchPosts = () => {
    setLoading(true);
    setError('');
    fetch('http://localhost:4000/api/v1/posts')
      .then(res => {
        if (!res.ok) throw new Error('게시글 조회 실패');
        return res.json();
      })
      .then(json => setPosts(json))
      .catch(() => setError('서버 연결 오류'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 글쓰기 제출 핸들러
  const handleSubmit = async () => {
    if (!title.trim() || !author.trim()) {
      setFormError('제목과 작성자를 모두 입력하세요.');
      return;
    }
    setFormError('');
    try {
      const res = await fetch('http://localhost:4000/api/v1/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });
      if (!res.ok) throw new Error('등록 실패');
      setTitle('');
      setAuthor('');
      setShowForm(false);
      fetchPosts();
    } catch {
      setFormError('등록 중 오류 발생');
    }
  };

  return (
    <div className="fx-board-page-1440">
      <div className="fx-board-header">게시판</div>
      <div className="fx-board-table-wrap">
        <table className="fx-board-table">
          <thead>
            <tr>
              <th style={{width:60}}>번호</th>
              <th>제목</th>
              <th style={{width:120}}>작성자</th>
              <th style={{width:120}}>작성일</th>
              <th style={{width:80}}>조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="fx-board-row">
                <td>{post.id}</td>
                <td className="fx-board-title">{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fx-board-footer">
        <button className="fx-board-write-btn" onClick={() => setShowForm(true)}>글쓰기</button>
      </div>

      {/* 글쓰기 폼 (간단 인라인) */}
      {showForm && (
        <div className="fx-board-write-form-bg">
          <div className="fx-board-write-form">
            <h4>게시글 작성</h4>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="fx-board-input"
              style={{marginBottom:8}}
            />
            <input
              type="text"
              placeholder="작성자"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="fx-board-input"
              style={{marginBottom:8}}
            />
            <div style={{color:'#d32f2f', minHeight:18, fontSize:13}}>{formError}</div>
            <div style={{marginTop:8, display:'flex', gap:8}}>
              <button className="fx-board-write-btn" onClick={handleSubmit}>등록</button>
              <button className="fx-board-write-btn fx-board-cancel-btn" onClick={()=>{setShowForm(false);setFormError('')}}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
