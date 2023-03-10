import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';


const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Hol' up</div>;
  }

  if (!user?.username) {
    return (
      <div style={{ border: '2px solid black', textAlign: 'center', marginTop: '50vh' }}>
        <h1>You need to log in to see this shit</h1>
      </div>
    );
  }


  return (
    <div style= {{ height:'500px' }}>
      <main style={{ paddingTop: '100px' }}>
      <h2>Recently Liked Items</h2>
      <div style={{border: '1px solid black', padding: '150px'}}>
      </div>
      </main>
      <main style={{ paddingTop: '100px' }}>
      <h2>Selling</h2>
    <div style={{ border: '1px solid black', padding: '150px'}}>
    <Link to="/createpost" className="floating-button">
        Create <br />
        Post
      </Link>
    </div>
    </main>
  </div>

  
  );
};

export default Profile;