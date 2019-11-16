import React from 'react';
import PropTypes from 'prop-types';
import './profile.scss';

const Profile = (props) => {
  const {
    name,
    image,
    location,
    episodes,
    gender,
    origin,
    species,
    status,
    type
  } = props;

  return (
    <div className="info__frame">
      <h1 className="info__title">{name} ({status})</h1>
      <img src={image} alt={name} />
      <p>
        {species}
        {type &&
          ` - ${type}`
        }
      </p>
      <p>Gender: {gender}</p>

      <details>
        <summary>Location</summary>
        <p>{location.name}</p>
        {location.type &&
          <p>Type: {location.type}</p>
        }
        {location.dimension &&
          <p>Dimension: {location.dimension}</p>
        }
      </details>

      <details>
        <summary>Origin</summary>
        <p>{origin.name}</p>
        {origin.type &&
          <p>Type: {origin.type}</p>
        }
        {origin.dimension &&
          <p>Dimension: {origin.dimension}</p>
        }
      </details>

      { episodes &&
        <details>
          <summary>Episodes</summary>
          {
            episodes.map((epName) => {
              return <p key={epName}>{epName}</p>;
            })
          }
        </details>
      }
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.object,
  episodes: PropTypes.array,
  gender: PropTypes.string,
  origin: PropTypes.object,
  species: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
}

Profile.defaultProps = {
  name: "",
  image: "",
  location: {},
  episodes: [],
  gender: "",
  origin: {},
  species: "",
  status: "",
  type: "",
}

export default Profile;
