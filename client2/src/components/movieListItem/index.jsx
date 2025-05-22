import styles from './index.module.css';

export default function MovieListItem ( { src, alt }) {

  return (
    <div>
      < img src={src} alt={alt} />
    </div>
  );
}