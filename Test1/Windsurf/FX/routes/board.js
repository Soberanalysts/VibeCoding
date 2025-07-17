const express = require('express');
const router = express.Router();

// 임시 메모리 mock 데이터
let posts = [
  { id: 1, title: 'FX 환율 질문 1', author: 'user1', date: '2024-07-11', views: 107 },
  { id: 2, title: 'FX 환율 질문 2', author: 'user2', date: '2024-07-12', views: 114 },
  { id: 3, title: 'FX 환율 질문 3', author: 'user3', date: '2024-07-13', views: 121 },
  { id: 4, title: 'FX 환율 질문 4', author: 'user4', date: '2024-07-14', views: 128 },
  { id: 5, title: 'FX 환율 질문 5', author: 'user5', date: '2024-07-15', views: 135 },
  { id: 6, title: 'FX 환율 질문 6', author: 'user6', date: '2024-07-16', views: 142 },
  { id: 7, title: 'FX 환율 질문 7', author: 'user7', date: '2024-07-17', views: 149 },
  { id: 8, title: 'FX 환율 질문 8', author: 'user8', date: '2024-07-18', views: 156 },
];

// GET /api/board - 게시글 목록
router.get('/', (req, res) => {
  res.json(posts);
});

// POST /api/board - 새 게시글 작성
router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: '제목과 작성자를 입력하세요.' });
  }
  const newPost = {
    id: posts.length + 1,
    title,
    author,
    date: new Date().toISOString().slice(0, 10),
    views: 0,
  };
  posts = [newPost, ...posts];
  res.status(201).json(newPost);
});

// GET /api/board/:id - 게시글 상세
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  post.views++;
  res.json(post);
});

module.exports = router;
