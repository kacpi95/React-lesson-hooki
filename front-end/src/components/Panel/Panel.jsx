import { List } from '../List/List';
import styles from './Panel.module.css';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FilterButton } from '../FilterButton/FilterButton';

export function Panel() {
  return (
    <>
      <ErrorMessage></ErrorMessage>
      <section className={styles.section}>
        <Form />
        <div className={styles.filters}>
          <FilterButton>Wszystkie</FilterButton>
          <FilterButton>Rzeczwoniki</FilterButton>
          <FilterButton>Czasowniki</FilterButton>
        </div>
        <List />
      </section>
    </>
  );
}
