import { useState, useEffect } from 'react';
// import { List } from '../List/List';
// import styles from './Panel.module.css';
// import { Form } from '../Form/Form';
// import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export function Panel() {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:3000/words')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setData(res);
  //       setIsLoading(false);
  //     });
  // }, []);

  // function handleFormSubmit(formData) {
  //   fetch('http://localhost:3000/words', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setData((prev) => [...prev, res]);
  //     });
  // }
  // function handleDeleteItem(id) {
  //   fetch(`http://localhost:3000/words/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         setData((prevData) => prevData.filter((item) => item.id !== id));
  //       }
  //     })
  //     .catch((e) => {
  //       setError(e.message);
  //       setTimeout(() => {
  //         setError(null);
  //       }, 3000);
  //     });
  // }

  // if (isLoading) {
  //   return <p>Ładowanie...</p>;
  // }

  // return (
  //   <>
  //     {error && <ErrorMessage>{error}</ErrorMessage>}
  //     <section className={styles.section}>
  //       <Form onFormSubmit={handleFormSubmit} />
  //       <List data={data} onDeleteItem={handleDeleteItem} />
  //     </section>
  //   </>
  // );
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((res) => setUser(res));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        setUsername('');
      });
  }

  return (
    <>
      <h1>Dane osobowe </h1>
      <h2>Username: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Miasto: {user?.address?.city}</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Zmień nazwę'
        />
        <button disabled={username.trim().length === 0}>Zapisz</button>
      </form>
    </>
  );
}
