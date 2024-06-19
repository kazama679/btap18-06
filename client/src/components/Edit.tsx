import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditProps {
  id: number | null;
  onSaveSuccess: () => void;
}

const Edit: React.FC<EditProps> = ({ id, onSaveSuccess }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id !== null) {
      axios.get(`http://localhost:8080/list-post/${id}`)
        .then(response => {
          const { title, image, content } = response.data;
          setTitle(title);
          setImage(image);
          setContent(content);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  const handleUpdate = () => {
    if (!title || !image || !content) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    
    axios.put(`http://localhost:8080/list-post/${id}`, { title, image, content })
      .then(() => {
        onSaveSuccess();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    onSaveSuccess();
  };

  return (
    <div className="edit-form">
      <h2>Cập nhật bài viết</h2>
      <div className="form-group">
        <label>Tên bài viết</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Hình ảnh</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Nội dung</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
      <div className="form-actions">
        <button onClick={handleCancel}>Hủy</button>
        <button onClick={handleUpdate}>Cập nhật</button>
      </div>
    </div>
  );
};

export default Edit;