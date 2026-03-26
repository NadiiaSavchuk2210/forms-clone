import css from './FormsList.module.css';

interface Props {
  itemsCount?: number;
}

const FormsListSkeleton = ({ itemsCount = 6 }: Props) => {
  return (
    <ul className={css.formsList} role="list" aria-label="Loading forms">
      {Array.from({ length: itemsCount }, (_, index) => (
        <li key={index}>
          <article className={css.skeletonCard} aria-hidden="true">
            <div className={css.skeletonHeader}>
              <span className={css.skeletonHandle} />
              <span className={css.skeletonBadge} />
            </div>

            <div className={css.skeletonContent}>
              <span className={css.skeletonMeta} />
              <span className={css.skeletonTitle} />
              <span className={css.skeletonTitleShort} />
              <span className={css.skeletonLine} />
              <span className={css.skeletonLineShort} />
            </div>

            <div className={css.skeletonActions}>
              <span className={css.skeletonButton} />
              <span className={css.skeletonButton} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default FormsListSkeleton;
