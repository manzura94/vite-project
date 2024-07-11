import React, { useEffect } from 'react';

import './App.css';

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
}

export const Menu = ({ data, loading }: ChildProps) => {
  return (
    <>
      {loading ? (
        <div className="menu_loading">Loading...</div>
      ) : (
        <div className="menu_container">
          {data &&
            data.map((item) => {
              return (
                <div className="menu_wrapper" key={item.uid}>
                  <p className="menu_title">{item.title}</p>
                  <p className="menu_desc">{item.publishedYear}</p>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

// class Menu extends Component<ChildProps> {
//   render() {
//     const { data, loading } = this.props;

//     if (loading) {
//       return <div className="menu_loading">Loading...</div>;
//     }

//     return (
//       <div className="menu_container">
//         {data &&
//           data.map((item) => {
//             return (
//               <div className="menu_wrapper" key={item.episode_id}>
//                 <p className="menu_title">{item.title}</p>
//                 <p className="menu_desc">{item.opening_crawl}</p>
//               </div>
//             );
//           })}
//       </div>
//     );
//   }
// }

// export default Menu;
