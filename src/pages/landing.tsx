import { ReactElement } from 'react';
import styles from './landing.module.scss';
import bg from '../assets/main-background.png';
import ellipse from '../assets/elipse-item.png';
import gold from '../assets/gold.png';
import gold2 from '../assets/gold-2.png';
import { Olympus } from '../components/olympus';
import { Promo } from '../components/promo/Promo';
import Form from '../components/form/Form';

export function LandingPage(): ReactElement {
  return (
    <div className={styles.Landing}>
      <img className={styles.Landing_background} src={bg} alt={'background'} />
      <img className={styles.Landing_elipse} src={ellipse} alt={'ellipse'} />
      <Olympus />
      <Promo />
      <img className={styles.Landing_gold} src={gold} alt={'gold'} />
      <img className={styles.Landing_gold2} src={gold2} alt={'gold2'} />
      <Form />
    </div>
  );
}
