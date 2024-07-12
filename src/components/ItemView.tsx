import { useNavigate, useLocation } from 'react-router-dom';

import { useState } from 'react';

interface Detail {
  uid: string;
  title: string;
  numberOfPages: number;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
}

const ItemView = () => {
  const location = useLocation();
  const detail = location.state as Detail;

  const navigate = useNavigate();

  console.log(detail, 'id');

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="detail-view">
      <button onClick={handleClose}>Close</button>
      <h2>{detail.title}</h2>
      <p>Pages: {detail.numberOfPages}</p>
      <p>
        Published: {detail.publishedYear}-{detail.publishedMonth}-
        {detail.publishedDay}
      </p>
    </div>
  );
};

export default ItemView;
