import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../redux/feedSlice';

const UserCard = ({ feed }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, photoUrl, about } = feed;

  const handleSendRequest = async (status, id) => {
    try {
      const response = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (err) {}
  };

  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="Profile"
          className="w-full h-60"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        {(age || gender) && (
          <p className="text-md text-neutral-400">{age + ', ' + gender}</p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center py-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest('ignored', _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest('interested', _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
