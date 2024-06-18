import React, { useState } from 'react';
import axios from 'axios';

const Add = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const handleReset = () => {
    setTitle('');
    setImage('');
    setContent('');
  };

  const handlePublish = () => {
    if (!title || !image || !content) {
      console.error('Please fill out all fields');
      return;
    }

    const newPost = {
      title,
      image,
      content,
      date: new Date().toLocaleDateString(), 
      status: true, 
    };

    axios.post('http://localhost:8080/list-post', newPost)
      .then(response => {
        onAddPost(response.data); 
        handleReset(); 
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };

  return (
    <div className="all-form">
      <div className="new-article-form">
        <div className="form-header">
          <h2>Thêm mới bài viết</h2>
          <button className="close-button">×</button>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label>Tên bài viết</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên bài viết"
            />
          </div>
          <div className="form-group">
            <label>Hình ảnh</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Nhập URL hình ảnh"
            />
          </div>
          <div className="form-group">
            <label>Nội dung</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung"
            ></textarea>
          </div>
        </div>
        <div className="form-footer">
          <button onClick={handleReset} className="reset-button">Làm mới</button>
          <button onClick={handlePublish} className="publish-button">Xuất bản</button>
        </div>
      </div>
    </div>
  );
};

export default Add;