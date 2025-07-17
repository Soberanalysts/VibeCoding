import { useState } from 'react';
import '../styles/board.css';

// mock 데이터 (게시글 목록)
const mockPosts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `FX 환율 질문 ${i + 1}`,
  author: `user${i + 1}`,
  date: `2024-07-${(i + 11).toString().padStart(2, '0')}`,
  views: 100 + i * 7,
}));

export default function BoardPage() {
  const [posts] = useState(mockPosts);
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
        <button className="fx-board-write-btn">글쓰기</button>
      </div>
    </div>
  );
}
