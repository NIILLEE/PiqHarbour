/* Shariff Muhammad 23611732 */

import Header from '../components/Header';
import Feed from '../components/Feed';
import SearchInput from '../components/SearchInput';

function HomePage(){

  return (
    <div>
      <Header />
      <main className="page-main">
        <Feed />
      </main>
    </div>
  );

}

export default HomePage;