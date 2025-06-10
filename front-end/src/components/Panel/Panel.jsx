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
     const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(res => setUsers(res));
    }, []);

    function handleDeleteClick(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        })
        .then((res) => res.json())
        .then(() => {
            setUsers(prevUsers => prevUsers.filter(item => item.id !== id));
        });
    }

    return (<>
        <h1>Lista osób</h1>
        <ul>
        {users.map(user => <li key={user.id}>
            {user.username} <button onClick={() => handleDeleteClick(user.id)}>X</button>
        </li>)}
        </ul>
    </>);
}
