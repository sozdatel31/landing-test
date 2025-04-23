import styles from './Promo.module.scss';
import promo200 from '../../assets/promo_200.png';
import promoSubtitle from '../../assets/promo_200_subtitle.png';
export function Promo() {
  return (
    <div className={styles.container}>
      <picture className={styles.image}>
        <img src={promo200} alt="200 фриспинов" />
      </picture>
      <picture className={styles.imageSubtitle}>
        <img src={promoSubtitle} alt="за регистрацию" />
      </picture>
    </div>
  );
}
