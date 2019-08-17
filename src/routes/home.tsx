import React, {useContext} from "react";
import Context from '../components/context';
import {translations} from '../translations/home';
import {Link} from 'react-router-dom';



const Home: React.FC = () => {
  const { global, setGlobal } = useContext(Context) as {global: any; setGlobal: React.Dispatch<React.SetStateAction<any>>};
  const txt = translations[global.language];
  return (
    <div className="home">
      <div className="home-grid">
        
        <header className="left-logo">
            <Link to={{pathname: '/state'}}>Global: {txt.language}</Link>
            <p>{txt.language}</p>
            <button onClick={() => setGlobal({...global, language: 'en'})}>English</button>
            <button onClick={() => setGlobal({...global, language: 'cn'})}>Chinese</button>
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
