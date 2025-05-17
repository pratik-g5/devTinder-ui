import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, clearRequest } from '../redux/requestsSlice';
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

  const reviewRequest = async (status, id) => {
    try {
      const response = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + id,
        {},
        { withCredentials: true }
      );
      dispatch(clearRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

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
                <div className="card bg-base-300 w-7/12 shadow-sm min-h-48 flex flex-row items-center  p-4">
                  <div className="flex items-center w-1/5">
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full shadow-lg ml-2"
                    />
                  </div>
                  <div className="w-2/3">
                    <h1 className="text-xl font-bolds">
                      {firstName + ' ' + lastName}
                    </h1>
                    <h2 className="text-md text-neutral-500 1/3">
                      {age + ', ' + gender}{' '}
                    </h2>
                    <p className="text-sm text-neutral-300 pt-2 overflow-hidden overflow-ellipsis max-h-16 break-words">
                      {about}
                    </p>
                  </div>
                  <div className="pr-5 flex">
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => {
                        reviewRequest('rejected', request._id);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        reviewRequest('accepted', request._id);
                      }}
                    >
                      Accept
                    </button>
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
