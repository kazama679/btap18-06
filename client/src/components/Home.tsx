import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; 
import Edit from './Edit'; 

interface Bai {
  id: number;
  title: string;
  image: string;
  date: string;
  status: boolean;
}

const Home: React.FC = () => {
  const [baiHoc, setBaihoc] = useState<Bai[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null); 

  const fetchData = () => {
    axios.get('http://localhost:8080/list-post')
      .then(response => {
        setBaihoc(response.data); 
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const block = (id: number) => {
    setSelectedId(id); 
    setShowModal(true); 
    setModalMessage('Bạn có chắc chắn muốn thay đổi trạng thái của bài viết không?'); 
  };
  const confirmBlock = () => {
    if (selectedId !== null) {
      axios.put(`http://localhost:8080/block-post/${selectedId}`)
        .then(res => {
          const updatedBaiHoc = baiHoc.map(bai => {
            if (bai.id === selectedId) {
              return { ...bai, status: !bai.status }; 
            }
            return bai;
          });
          setBaihoc(updatedBaiHoc); 
          setShowModal(false); 
          setSelectedId(null); 
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const cancelModal = () => {
    setShowModal(false); 
    setSelectedId(null); 
  };
  const handleEdit = (id: number) => {
    setSelectedId(id); 
    setShowModal(true);
    setModalMessage('Cập nhật bài viết'); 
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <input type="text" placeholder="Nhập từ khóa tìm kiếm" />
          <button>Lọc bài viết</button>
          <button className="add-new">Thêm mới bài viết</button>
        </div>
        <div className="table-container">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tiêu đề</th>
                  <th>Hình ảnh</th>
                  <th>Ngày viết</th>
                  <th>Trạng thái</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {baiHoc.map(bai => (
                  <tr key={bai.id}>
                    <td>{bai.id}</td>
                    <td>{bai.title}</td>
                    <td><img src={bai.image} alt={bai.title} /></td>
                    <td>{bai.date}</td>
                    <td><span className="status">{bai.status ? 'Đã xuất bản' : 'Ngừng xuất bản'}</span></td>
                    <td>
                      <button className="block" onClick={() => block(bai.id)}>Chặn</button>
                      <button className="edit" onClick={() => handleEdit(bai.id)}>Sửa</button>
                      <button className="delete">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showModal && <Modal title={modalMessage} onCancel={cancelModal}>
        <Edit id={selectedId} onSaveSuccess={() => {
          fetchData(); 
          setShowModal(false); 
          setSelectedId(null);
        }} />
      </Modal>}
    </>
  );
}

export default Home;
