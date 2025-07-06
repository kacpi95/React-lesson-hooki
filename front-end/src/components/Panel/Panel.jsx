import { List } from '../List/List';
import styles from './Panel.module.css';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FilterButton } from '../FilterButton/FilterButton';
import { useState } from 'react';

export function Panel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
