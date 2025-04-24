import { ReactElement } from 'react';
import styles from './landing.module.scss';
import ellipse from '../assets/elipse-item.png';
import gold from '../assets/gold.png';
import { Olympus } from '../components/olympus/olympus';
import { Promo } from '../components/promo/Promo';
import Form from '../components/form/Form';

export function LandingPage(): ReactElement {
  return (
    <div className={styles.Landing}>
      <img className={styles.Landing_elipse} src={ellipse} alt={'ellipse'} />
      <Olympus />
      <Promo />
      <img className={styles.Landing_gold} src={gold} alt={'gold'} />
      <Form />
    </div>
  );
}
