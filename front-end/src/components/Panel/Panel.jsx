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
    fetch('http://localhost:3000/words')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, []);

  function handleFormSubmit(formData) {
    fetch('http://localhost:3000/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setData((prev) => [...prev, res]);
      });
  }

  function onDeleteItem(id) {
    fetch(`http://localhost:3000/words/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        }
      })
      .catch((e) => {
        setError(e.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }
  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <section className={styles.section}>
        <Form onFormSubmit={handleFormSubmit} />
        <div className={styles.filters}>
          <FilterButton>Wszystkie</FilterButton>
          <FilterButton>Rzeczwoniki</FilterButton>
          <FilterButton>Czasowniki</FilterButton>
        </div>
        <List data={data} onDeleteItem={onDeleteItem} />
      </section>
    </>
  );
}
