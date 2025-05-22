import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn () {

  const navigate = useNavigate();

  function signUpNow () {
    navigate('/signup');
  }

  function login () {
    navigate('/homepage');
  }

  return (
    <div className={styles.SignIn}>

      <div className={styles.TopHeader}>
        <p id={styles.LargeText1}>Welcome<span className={styles.redFont}>Back</span></p>
        <p>Enter your credentials to login</p>
      </div>

      <form className={styles.flexForm}>
        <input type="text" placeholder="email@domain.com"/> 
        <input type="password" placeholder="Password"/>
        <button type="submit" onClick={login}>Login</button>
      </form>

      <div className={styles.SignInExtra}>
        <p>First time?<span className={styles.redFont} onClick={signUpNow} > Sign up now!</span></p>
      </div>
    </div>
  );
}