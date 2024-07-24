import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store.js';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext.js';
import { setPage } from '../slices/paginationSlice.js';
import './Pagination.css';

export const Pagination = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.pagination.page);
    const { theme } = useContext(ThemeContext) as ThemeContextType;

    const onPrevButton = () => {
        dispatch(setPage(currentPage - 1));
    };

    const onNextButton = () => {
        dispatch(setPage(currentPage + 1));
    };

    return (
        <div className={`button_wrapper ${theme}`}>
            <button  data-testid="prev-button" className={`button button_prev ${theme}`} onClick={onPrevButton} disabled={currentPage === 1}>
                prev
            </button>
            <span className='button_page'>{`{${currentPage}}`}</span>
            <button  data-testid="next-button" className={`button button_next ${theme}`} onClick={onNextButton} disabled={currentPage === 10}>
                next
            </button>
        </div>
    );
};
