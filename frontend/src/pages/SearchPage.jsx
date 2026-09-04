import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';

function SearchPage(){

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>Search</h1>
        <p>Results for: "{query}"</p>
      </main>
    </div>
  );
  
}

export default SearchPage;