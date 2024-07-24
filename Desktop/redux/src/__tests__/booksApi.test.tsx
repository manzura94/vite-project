
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { expect, test } from 'vitest';
import { booksApi} from '../api/booksApi.js'; 
import { store } from '../app/store.js';


const server = setupServer(
  http.get('https://stapi.co/api/v2/rest/book/search', () => {
    return HttpResponse.json({ books: [{ uid: '1', title: 'Test Book', numberOfPages: 100, publishedMonth: 1, publishedYear: 2020 }] })
  })
);




beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;


test('fetches books from API', async () => {
    const { result } = renderHook(() => booksApi.endpoints.getBooks.useQuery({ page: 1 }), {
        wrapper,
      });
    
      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });
    

      expect(result.current.data).toEqual({
        books: [
          {
            uid: '1',
            title: 'Test Book',
            numberOfPages: 100,
            publishedMonth: 1,
            publishedYear: 2020,
          },
        ],
      });
});

test('handles API error', async () => {
    server.use(
      http.get('https://stapi.co/api/v2/rest/book/search', () => {
        return new HttpResponse(null, {status: 500});
      })
    );
  
    const { result } = renderHook(() => booksApi.endpoints.getBooks.useQuery({ page: 1 }), {
      wrapper,
    });
  
    await waitFor(() => {
      expect(result.current.isError).toBeFalsy();
    });
  
    expect(result.current.error).toBeUndefined();
  });
