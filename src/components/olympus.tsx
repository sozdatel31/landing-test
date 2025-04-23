import olympus from '../assets/olympus.png';
import styles from './olympus.module.scss';
export function Olympus() {
  return (
      <img className={styles.Olympus_image} src={olympus} alt={'olympus'} />
  );
}
