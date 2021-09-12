import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { API, Storage } from 'aws-amplify';
import { listPictures } from './graphql/queries';

function Home() {
  const [pictures, setPictures] = useState([]);

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

  return (
    <div>
      <h2>Home</h2>
      {
          pictures.map(picture => (
            <div key={picture.id || picture.name}>
              <h2>{picture.name}</h2>
              <p>{picture.description}</p>
              {
                picture.image && <img src={picture.image} style={{width:400}} />
              }
            </div>
          ))
        }
    </div>
  );
}

export function HomeLink(text) {
  return (
    <Link to="/">{text}</Link>
  )
}

export default Home