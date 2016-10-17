import Helmet from 'react-helmet';
import React,{PropTypes} from 'react';
import config from '../../config';
import Navigation from './components/Navigation';

const App = ({children}) => (
  <div>
    <Helmet titleTemplate={`%s - ${config.meta.title}`} />
    <Navigation />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.object
};

export default App;
