import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';


export default function SignUp () {
  const navigate = useNavigate();

  function login () {
    navigate('/');
  } 

  return (
    <div className={styles.SignIn}>

      <div className={styles.TopHeader}>
        <p id={styles.LargeText1}>Sign<span className={styles.redFont}>Up</span></p>
        <p>Create your account</p>
      </div>

      <form className={styles.flexForm}>
        <input type="text" placeholder="Username"/>
        <input type="text" placeholder="Email"/> 
        <input type="password" placeholder="Password"/> 
        <input type="password" placeholder="Confirm Password"/>
        <button type="submit">Sign Up</button>
      </form>

      <div className={styles.SignInExtra}>
        <p>Already have an account?<span className={styles.redFont} onClick={login}> Login</span></p>
      </div>
    </div>
  );
}