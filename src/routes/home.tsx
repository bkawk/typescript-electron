import React from 'react';
import {Link} from 'react-router-dom';

const Home: React.FC = () => {
  return (

    <div className="home">
      <div className="home-grid">
        
        <header className="left-logo">
            <Link to={{pathname: '/state'}}>Link Test</Link>
        </header>
        <section>
      
        </section>
        <footer className="home-footer">
          © 2019 Agenix LLC.
        </footer>

      </div>
    </div>

  );
}

export default Home;
