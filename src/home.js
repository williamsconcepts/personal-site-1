import React from 'react';
import ReactDOM from 'react-dom';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './styles/index-styles.css';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <MobileNav />
        <div className="black-layer">
          <div id="main" className="main-content">

            {/* normal header menu */}
            <Navbar />

            <div className="texts">
              <h1>I Design &amp; develop<br />
                  Modern Websites.<br />
                  For You.</h1>
              <Link to="/contact"><h4>Let's work<br />
                  Together</h4></Link>
            </div> {/* /.texts */}

            <Footer />

          </div> {/* /.main-content */}
        </div> {/* /.black-layer */}
      </div>
    );
  }
}

export default Home;
