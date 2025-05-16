import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../redux/requestsSlice';
import { Link } from 'react-router-dom';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const connectionRequests = await axios.get(
        BASE_URL + '/user/requests/received',
        { withCredentials: true }
      );
      dispatch(addRequests(connectionRequests?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-8">Requests</h1>
      {!requests || requests.length === 0 ? (
        <div className="flex justify-center py-8">
          <p className="text-lg">
            No requests were received !
            <Link
              to="/"
              className="px-2 items-center inline-flex"
            >
              Connect?
              <img
                src="maximize.png"
                alt="explore"
                className="w-5 h-5 ml-1 inline-block align-middle"
              />
            </Link>
          </p>
        </div>
      ) : (
        <div>
          {requests.map((request) => {
            const { firstName, lastName, about, age, gender, photoUrl } =
              request.fromUserId;
            return (
              <div
                key={request._id}
                className="flex pt-8 justify-center"
              >
                <div className="card bg-base-300 w-5/12 shadow-sm h-28 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full shadow-lg ml-2"
                    />
                  </div>
                  <div className="-ml-16">
                    <h1 className="text-xl font-bolds">
                      {firstName + ' ' + lastName}
                    </h1>
                    <h2 className="text-md text-neutral-500">
                      {age + ', ' + gender}{' '}
                    </h2>
                    <p className="text-sm text-neutral-300 pt-2">{about}</p>
                  </div>
                  <div className="pr-5">
                    <button className="btn btn-primary mx-3">Reject</button>
                    <button className="btn btn-secondary">Accept</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
