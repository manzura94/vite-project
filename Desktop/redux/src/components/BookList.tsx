import './BookList.css';
import { booksApi } from '../api/booksApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store.js';
import { useContext, useEffect, useState } from 'react';
import { setItems } from '../slices/itemSlice.js';
import { setSelectedItem, removeSelectedItem, clearSelectedItem } from '../slices/selectedItems.js';
import { Book } from '../api/booksApi.js';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext.js';

export const BookList = () => {
    const currentPage = useSelector((state: RootState) => state.pagination.page);
    const dispatch = useDispatch();
    const { data, error, isLoading } = booksApi.useGetBooksQuery({ page: currentPage });
    const [selectItem, setSelectItem] = useState<string[]>([]);
    const { selectedItem } = useSelector((state: RootState) => state.selectedItems);

    const { theme } = useContext(ThemeContext) as ThemeContextType;

    const handleItemClick = (book: Book) => {
        let currentId: string = book.uid;
        if (selectItem.includes(currentId)) {
            let newArr = selectItem.filter((id) => id !== currentId);
            setSelectItem(newArr);
            dispatch(removeSelectedItem(book));
        } else {
            dispatch(setSelectedItem(book));
            setSelectItem([...selectItem, currentId]);
        }
    };

    const handleClearItems = () => {
        dispatch(clearSelectedItem());
        setSelectItem([]);
    };

    const handleDownload = () => {
        const csvHeader = 'Title,Publish Year, Pages URL\n';
        const csvRows = selectedItem.map((item) => `${item.title},${item.publishedYear},${item.numberOfPages}`).join('\n');
        const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(csvHeader + csvRows)}`;

        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', `${selectedItem.length}_books.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (data) {
            dispatch(setItems(data?.books));
        }
    }, [data, dispatch]);

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>There is an error in loading books</h1>;

    return (
        <div className='books_container'>
            {data?.books &&
                data?.books.slice(0, 12).map((item) => (
                    <div className={`books_wrapper ${theme}`} key={item.uid} onClick={() => handleItemClick(item)}>
                        <input type='checkbox' checked={selectItem.includes(item.uid)} readOnly />
                        <h3 className='books_title'>{item?.title}</h3>
                        <div className='books_date'>
                            Published date:
                            <span>{item.publishedMonth < 10 ? `0${item.publishedMonth}` : item.publishedMonth}</span>/<span>{item.publishedYear}</span>
                        </div>
                        <span className='books_page'>Number of pages:{item.numberOfPages}</span>
                    </div>
                ))}
            {selectedItem.length > 0 && (
                <div className={`flyout_container ${theme}`}>
                    <div className='flyout_items'>{`selected ${selectedItem.length} ${selectedItem.length > 1 ? 'items' : 'item'}`}</div>
                    <div className='flyout_buttons'>
                        <button className={`button ${theme}`} onClick={handleClearItems}>
                            Unselect All
                        </button>
                        <button data-testid="download-button" className={`button ${theme}`} onClick={handleDownload}>
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
