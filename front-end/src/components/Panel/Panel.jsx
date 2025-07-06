import { List } from '../List/List';
import styles from './Panel.module.css';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FilterButton } from '../FilterButton/FilterButton';
import { useEffect, useState } from 'react';

export function Panel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost3000/words')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, []);

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
