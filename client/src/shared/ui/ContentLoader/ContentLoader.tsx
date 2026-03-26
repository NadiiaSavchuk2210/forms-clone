import { MdOutlineBlurCircular, MdOutlineEditNote } from 'react-icons/md';
import css from './ContentLoader.module.css';

interface Props {
  label?: string;
}

const ContentLoader = ({ label = 'Loading content...' }: Props) => {
  return (
    <section className={css.loadingState} aria-live="polite" aria-busy="true">
      <div className={css.loaderVisual}>
        <MdOutlineBlurCircular className={css.loadingIcon} />
        <span className={css.loaderBadge}>
          <MdOutlineEditNote />
        </span>
      </div>
      <div className={css.copy}>
        <p className={css.loadingText}>{label}</p>
        <p className={css.loadingHint}>One moment while the page gets everything ready.</p>
      </div>
    </section>
  );
};

export default ContentLoader;
