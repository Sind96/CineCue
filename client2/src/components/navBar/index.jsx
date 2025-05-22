import styles from './index.module.css';
import { LuHome } from 'react-icons/lu';
import { FaList } from 'react-icons/fa6';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { MdOutlineLogout } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function NavBar () {
  const [ location, setLocation ] = useState('');

  const navigate = useNavigate();

  function home () {
    setLocation('/homepage');
    console.log(location);
    navigate('/homepage');
  }

  function watchlistpage () {
    setLocation('/watchlist');
    navigate('/watchlist');
  }

  function login () {
    setLocation ('/');
    navigate('/');
  }

  return (
    <div className={styles.NavBar}>
      <div>
        { location === '/homepage'  ? <LuHome onClick={home} className={styles.redIcon}/> : <LuHome onClick={home}/> }
      </div>
      <div>
        { location === '/watchlist'  ? <FaList onClick={home} className={styles.redIcon}/> : <FaList onClick={watchlistpage}/> }
      </div>
      <div>
        <MdOutlineLogout onClick={login}/>
      </div>
    </div>
  );
} 