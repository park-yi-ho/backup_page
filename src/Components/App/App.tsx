import React, { Fragment, useState, useEffect } from 'react';
import Header from '../Header/Header';
import Table from '../Table/Table';
import axios from 'axios';

interface Res {
  data: string;
}

const defaultRes = {
  data: ''
}

const getRes = async (dispatch: React.Dispatch<React.SetStateAction<Res>>) => {
  const data = await axios('http://10.0.11.1:7070/');
  dispatch(data);
}

function App() {
  const date = new Date();
  const [res, setRes] = useState<Res>(defaultRes);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  useEffect(() => {
    getRes(setRes);
  }, []);

  return (
    <Fragment>
      <Header titleProps='Airs BackUp' />
      <main id="airs-content">
        <div className="airs-main-content">
          <section className="airs-head-line-section">
            <span className="airs-head-line">{year}년 {month}월 백업 기록표</span>
            <div className="airs-head-btn-box">
              <button onClick={function () {
                if ((month - 1) >= 1 && (month - 1) <= 12) {
                  setMonth(month - 1);
                }
                else {
                  setYear(year - 1);
                  setMonth(12);
                }
              }} className="airs-back-btn"></button>
              <button onClick={function () {
                if ((month + 1) >= 1 && (month + 1) <= 12) {
                  setMonth(month + 1);
                }
                else {
                  setYear(year + 1);
                  setMonth(1);
                }
              }} className="airs-forward-btn"></button>
            </div>
          </section>
          <section className="airs-backup-table-section">
            <Table res={res} curMonth={month} curYear={year}/>
          </section>
        </div>
      </main>
    </Fragment>
  );
}

export default App;

// import React from 'react';
// // import logo from '../../static/logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App바보.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
