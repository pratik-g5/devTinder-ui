import { useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../redux/feedSlice';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      navigate('/login');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    feed && (
      <div className="flex justify-center py-4">
        <UserCard feed={feed[0]} />
      </div>
    )
  );
};

export default Feed;
