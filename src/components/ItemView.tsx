import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface Detail {
  uid: string;
  title: string;
  numberOfPages: number;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
}

interface ItemProps {
  containerRef: React.RefObject<HTMLDivElement> | undefined;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemView = ({ containerRef, display, setDisplay }: ItemProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.split('/').pop();

  const [detail, setDetail] = useState<Detail | null>(null);

  const navigate = useNavigate();

  const handleViewItem = async () => {
    if (id) {
      try {
        const response: AxiosResponse<{ book: Detail }> = await axios.get(
          `https://stapi.co/api/v2/rest/book?uid=${id}`,
        );
        setDisplay(true);
        const { book } = response.data;
        setDetail(book);
      } catch (error) {
        console.error('Error searching items:', error);
      }
    }
  };

  const handleClose = () => {
    setDisplay(false);
    setDetail(null);
    navigate('/');
  };

  useEffect(() => {
    handleViewItem();
  }, [id]);

  return (
    <>
      {display ? (
        <div className="detail-view">
          <h2 className="detail-view_title">{detail && detail.title}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequuntur veniam odit tempora quibusdam nam ea. Minima quia
            adipisci consequatur, ea a illo dolore cum tempora dolorem ullam
            dicta id quibusdam beatae similique laudantium ex pariatur veniam
            ipsum voluptates. Aliquam, dicta nemo! Molestiae harum commodi
            perspiciatis ea placeat eum rerum quia.
          </p>
          <h4 className="detail-view_pages">
            Pages: {detail && detail.numberOfPages}
          </h4>
          <h3 className="detail-view_publish">
            Published: {detail && detail.publishedYear}-
            {detail && detail.publishedMonth}-{detail && detail.publishedDay}
          </h3>
          <button className="detail-view_close" onClick={handleClose}>
            Close
          </button>
        </div>
      ) : (
        <span className="displayNone"></span>
      )}
    </>
  );
};

export default ItemView;
