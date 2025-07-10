import { List } from '../List/List';
import styles from './Panel.module.css';
import { Form } from '../Form/Form';
import { FilterButton } from '../FilterButton/FilterButton';
import { useEffect, useMemo, useState } from 'react';
import { getCategoryInfo } from '../../utils/getCategoryInfo';
import { Info } from '../Info/Info';

export function Panel({ onError }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let isCanceled = false;
    const params = selectedCategory ? `?category=${selectedCategory}` : '';
    fetch(`http://localhost:3000/words${params}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Błąd ładowania danych!');
      })
      .then((res) => {
        if (!isCanceled) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch(onError);

    return () => {
      isCanceled = true;
    };
  }, [selectedCategory, onError]);

  const categoryInfo = useMemo(
    () => getCategoryInfo(selectedCategory),
    [selectedCategory]
  );

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
      .catch(onError);
  }

  function handleFilterClick(category) {
    setSelectedCategory(category);
  }

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }
  return (
    <>
      <section className={styles.section}>
        <Info>{categoryInfo}</Info>
        <Form onFormSubmit={handleFormSubmit} />
        <div className={styles.filters}>
          <FilterButton
            active={selectedCategory === null}
            onClick={() => handleFilterClick(null)}
          >
            Wszystkie
          </FilterButton>
          <FilterButton
            active={selectedCategory === 'noun'}
            onClick={() => handleFilterClick('noun')}
          >
            Rzeczwoniki
          </FilterButton>
          <FilterButton
            active={selectedCategory === 'verb'}
            onClick={() => handleFilterClick('verb')}
          >
            Czasowniki
          </FilterButton>
        </div>
        <List data={data} onDeleteItem={onDeleteItem} />
      </section>
    </>
  );
}
