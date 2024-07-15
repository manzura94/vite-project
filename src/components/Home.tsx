import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../App.css';
import { Menu } from './Menu.js';
import axios, { AxiosResponse } from 'axios';
import ItemView from './ItemView.js';
import Layout from './Layout.js';

interface Data {
  uid: string;
  numberOfPages: number;
  title: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
}



const Home = () => {
  const [data, setData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const savedRecentSearches = useRef<string[]>(
    JSON.parse(localStorage.getItem('recentSearches') || '[]'),
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ books: Data[] }> = await axios.get(
        'https://stapi.co/api/v2/rest/book/search?pageSize=8',
      );
      const { books } = response.data;
      const data = books;
      setData(data);
    } catch (error) {
      console.log('Error fetching data');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setData]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (query.length > 0) {
        setLoading(true);
        try {
          const response: AxiosResponse<{ books: Data[] }> = await axios.post(
            `https://stapi.co/api/v2/rest/book/search?title=${query}`,
          );

          const { books } = response.data;
          const data = books;
          setData(data);
        } catch (error) {
          console.error('Error searching items:', error);
        } finally {
          setLoading(false);
        }

        if (!savedRecentSearches.current.includes(query)) {
          savedRecentSearches.current = [
            query,
            ...savedRecentSearches.current,
          ].slice(0, 10);
          localStorage.setItem(
            'recentSearches',
            JSON.stringify(savedRecentSearches.current),
          );
        }
      }
    },
    [setData, setLoading],
  );

  const handleInputFocus = () => {
    if (savedRecentSearches.current.length) {
      setShowRecentSearches(true);
    }
  };

  const handleInputBlur = () => {
    if (searchItem.length === 0) {
      setTimeout(() => setShowRecentSearches(false), 200);
    }
  };

  const handleRecentSearchClick = (query: string) => {
    handleSearch(query);
    setSearchItem(query);
  };

  const handleLeftSectionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === containerRef?.current) {
      setDisplay(false);
    }
  };

  const throwError = () => {
    setError(true);
    throw new Error('Test error!');
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {error ? (
        <h1>Something went wrong. Please try again later.</h1>
      ) : (
        <div className="wrapper">
          <button className="throw-error" onClick={throwError}>
            Throw Error
          </button>
          <Layout
            handleSearch={handleSearch}
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
            showRecentSearches={showRecentSearches}
            recentSearches={savedRecentSearches.current}
            handleRecentSearchClick={handleRecentSearchClick}
          />
          <div
            className="flex_container"
            ref={containerRef}
            onClick={handleLeftSectionClick}
          >
            <Menu
              loading={loading}
              data={data}
              setData={setData}
              setLoading={setLoading}
              containerRef={containerRef}
              setDisplay={setDisplay}
            
              handleLeftSectionClick={handleLeftSectionClick}
            />
            <ItemView
              containerRef={containerRef}
              display={display}
              setDisplay={setDisplay}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
