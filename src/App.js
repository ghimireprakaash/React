import React, { useEffect, useState } from 'react';
import { Link, RouterProvider } from 'react-router-dom';
import route from './router';

function App() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  const getUser = async()=>{
    const response = await fetch('http://localhost:4000/users');
    setUser(await response.json());
  }

  useEffect(()=>{
    getUser();
  }, []);



  const insertData = async(e)=>{
    e.preventDefault();
    let insertData = {
      name,
      gender
    };

    await fetch('http://localhost:4000/users',
    {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(insertData)
    }).then((response)=>{
      console.log(response.json());
      getUser();
      setName('');
      setGender('');
    }).catch((err)=>{
      console.log(err);
    })
  }

  let deleteData = async(id)=>{
    await fetch(`http://localhost:4000/users/${id}`,
    {
      method:'DELETE'
    }).then(()=>{
      getUser();
    })
  }

  let updateData = async(id)=>{
    await fetch(`http://localhost:4000/users/${id}`)
    .then((response)=>{
      return response.json();
    }).then((res)=>{
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  return (
    // <div>
    //   <Link to='/'>Home</Link>
    //   <Link to='/about'>About</Link>
    // </div>
    <div>
      <form onSubmit={insertData}>
        Name:
        <input type='text' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} /> <br />
        Gender:
        <input type='radio' name='gender' value='Male' onChange={(e)=>setGender(e.target.value)} />Male
        <input type='radio' name='gender' value='Female' onChange={(e)=>setGender(e.target.value)} />Female <br />
        <button type='submit'>Submit</button>
      </form>
      <div>
        <ul>
          {user && user.map((user)=>(
            <li key={user.id}>
              {user.name} - {user.gender}
              <button onClick={()=>updateData(user.id)}>Update</button>
              <button onClick={()=>deleteData(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App