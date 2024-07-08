import { Component } from 'react';
import './App.css';

interface Data {
  episode_id: number;
  opening_crawl: string;
  title: string;
}

interface ChildProps {
  data: Data[] | null;

  loading: boolean;
}

class Menu extends Component<ChildProps> {
  render() {
    const { data, loading } = this.props;

    if (loading) {
      return <div className="menu_loading">Loading...</div>;
    }

    return (
      <div className="menu_container">
        {data &&
          data.map((item) => {
            return (
              <div className="menu_wrapper" key={item.episode_id}>
                <p className="menu_title">{item.title}</p>
                <p className="menu_desc">{item.opening_crawl}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Menu;
