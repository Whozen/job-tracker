import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import JobSourceList from "./components/job-source-list.component";
import JobSource from "./components/job-source.component";

function App() {
  return (
    <div className="container">
      <Router>
        <Route path="/" exact component={JobSourceList} />
        <Route path="/job-source/:id" exact component={JobSource} />
      </Router>
    </div>
  );
}

export default App;
