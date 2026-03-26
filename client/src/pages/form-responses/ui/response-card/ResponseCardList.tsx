import type { FormResponseCard } from '../../model';
import ResponseCard from './ResponseCard';
import css from '../../FormResponses.module.css';

interface Props {
  responseCards: FormResponseCard[];
}

const ResponseCardList = ({ responseCards }: Props) => (
  <ol className={css.responseStack}>
    {responseCards.map((responseCard) => (
      <ResponseCard key={responseCard.id} responseCard={responseCard} />
    ))}
  </ol>
);

export default ResponseCardList;
