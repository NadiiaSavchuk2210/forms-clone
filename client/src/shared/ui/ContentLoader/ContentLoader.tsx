import { ImSpinner8 } from 'react-icons/im';
import css from './ContentLoader.module.css';

interface Props {
  label?: string;
}

const ContentLoader = ({ label = 'Loading content...' }: Props) => {
  return (
    <section className={css.loadingState} aria-live="polite" aria-busy="true">
      <ImSpinner8 className={css.loadingIcon} />
      <p className={css.loadingText}>{label}</p>
    </section>
  );
};

export default ContentLoader;
