import { useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import '../App.css';
import { Pagination } from './Pagination.js';

interface Data {
  uid: string;
  numberOfPages: number;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
}

interface ChildProps {
  data: Data[] | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<Data[] | null>>;
  containerRef: React.RefObject<HTMLDivElement> | undefined;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  handleLeftSectionClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Menu = ({
  data,
  loading,
  setData,
  setLoading,
  containerRef,
  setDisplay,
  handleLeftSectionClick,
}: ChildProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchItems = async (page: number) => {
    setLoading(true);
    const response = await fetch(
      `https://stapi.co/api/v2/rest/book/search?pageNumber=${page}&pageSize=9`,
    );
    const data = await response.json();

    setData(data.books);
    setLoading(false);
    console.log(data, 'daya');
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    setDisplay(false);
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  return (
    <div className="menu" ref={containerRef} onClick={handleLeftSectionClick}>
      {loading ? (
        <div className="menu_loading">Loading...</div>
      ) : (
        <div
          className="menu_container"
          ref={containerRef}
          onClick={handleLeftSectionClick}
        >
          {data && data.length ? (
            data.map((item) => {
              return (
                <div className="menu_wrapper" key={item.uid}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'nav-link active-link' : 'nav-link'
                    }
                    state={item}
                    to={`/details/${item.uid}`}
                  >
                    <p className="menu_title">{item.title}</p>
                    <p className="menu_desc">{item.publishedYear}</p>
                  </NavLink>
                </div>
              );
            })
          ) : (
            <div>no result found</div>
          )}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        loading={loading}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
