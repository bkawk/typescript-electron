import React, {useEffect} from 'react';


const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Agenix - 404 Not Found';
  }, [])
  
  return (    

    <div className="not-found bg">
      <div className="home-grid">
        
        <div className="logo">
          <h2 className="strapline">404 Page Not Found</h2>
        </div>
        <footer className="footer">
          © 2019 
        </footer>

      </div>
    </div>

  );
}

export default NotFound;
