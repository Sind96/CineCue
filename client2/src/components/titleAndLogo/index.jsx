import styles from '@components/titleAndLogo/index.module.css';
import { FaToggleOff } from 'react-icons/fa';
import avatar from './avatar.jpg';

export default function TitleAndLogo ( { text } ) {

  return (
    <div className={styles.TitleAndLogoContainer}>
      <div className={styles.IconsAndText}>
        <FaToggleOff className={styles.toggleIcon}/>
        <img src={avatar} className={styles.avatar} alt="Profile Picture" />
        <div className={styles.TitleOfPage}>{text}</div>
      </div>
    </div>
  );
}