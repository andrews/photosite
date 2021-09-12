import { HomeLink } from '../Home';
import React, { useState, useEffect } from 'react';
import '../App.css';
import { API, Storage } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import { createPicture as createPictureMutation, deletePicture as deletePictureMutation } from '../graphql/mutations';
import { SignOutButton } from './SignIn';

const initialFormState = { name: '', description: '' }

function Admin({ setLoginStatus }) {
  const [pictures, setPictures] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchPictures();
  }, []);

  async function fetchPictures() {
    const apiData = await API.graphql({ query: listPictures });
    const picturesFromAPI = apiData.data.listPictures.items;
    await Promise.all(picturesFromAPI.map(async picture => {
      if (picture.image) {
        const image = await Storage.get(picture.image);
        picture.image = image;
      }
      return picture;
    }))
    setPictures(apiData.data.listPictures.items);
  }

  async function createPicture() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createPictureMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setPictures([ ...pictures, formData ]);
    setFormData(initialFormState);
  }

  async function deletePicture({ id }) {
    const newPicturesArray = pictures.filter(picture => picture.id !== id);
   setPictures(newPicturesArray);
    await API.graphql({ query: deletePictureMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchPictures();
  }

  return (
    <div className="App">
      {HomeLink("View Home")}
      <h2>Admin Page</h2>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Picture name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Picture description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createPicture}>Create Picture</button>
      <div style={{marginBottom: 30}}>
        {
          pictures.map(picture => (
            <div key={picture.id || picture.name}>
              <h2>{picture.name}</h2>
              <p>{picture.description}</p>
              <button onClick={() => deletePicture(picture)}>Delete picture</button>
              {
                picture.image && <img src={picture.image} style={{width:400}} />
              }
            </div>
          ))
        }
      </div>
      <SignOutButton setLoginStatus={setLoginStatus}/>
    </div>
  );
}


export function NotFound() {
  return (
    <div>
      <h1>404 PAGE NOT FOUND</h1>
      <h3>Return to {HomeLink("home")}</h3>
    </div>
    
  )
}

export default Admin;
