import { ScaleLoader } from 'react-spinners';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <ScaleLoader color="#aa3bff" />
    </div>
  );
}
