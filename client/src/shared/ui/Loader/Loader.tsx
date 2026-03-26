import css from './Loader.module.css';
import { MdOutlineAutoAwesome } from 'react-icons/md';

const Loader = () => {
  return (
    <div className={css.backdrop} aria-live="polite" aria-busy="true">
      <div className={css.loaderCard}>
        <div className={css.orbit}>
          <span className={css.ring} />
          <span className={css.ringSecondary} />
          <span className={css.core}>
            <MdOutlineAutoAwesome className={css.coreIcon} />
          </span>
        </div>

        <div className={css.copy}>
          <p className={css.title}>Loading the page</p>
          <p className={css.text}>Getting everything ready for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
