import Header from '../components/Header';
import Feed from '../components/Feed';
import SearchInput from '../components/SearchInput';
import CreatePost from '../components/CreatePost';

import { dummyPosts } from '../assets/dummyData';

function HomePage(){

  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <SearchInput />
        <Feed posts={dummyPosts} />
      </main>
    </div>
  );

}

export default HomePage;