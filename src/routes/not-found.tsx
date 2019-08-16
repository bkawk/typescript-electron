import React, {useEffect} from 'react';


const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Agenix - 404 Not Found';
  }, [])
  
  return (    

    <div className="home-grid page">
      <div className="logo">
        <h2 className="strapline">404 Page Not Found</h2>
      </div>
      <footer className="footer">
        © 2019 
      </footer>
    </div>

  );
}

export default NotFound;
