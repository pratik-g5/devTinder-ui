import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../redux/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  console.log(connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      //   console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-8">Connections</h1>
      {!connections || connections.length === 0 ? (
        <div className="flex justify-center py-8">
          <p className="text-lg">
            No connections yet!
            <Link
              to="/"
              className="pl-2 text-blue-300 flex items-center inline-flex"
            >
              Explore
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
          {connections.map((connection) => {
            const { firstName, lastName, about, age, gender, photoUrl } =
              connection;
            return (
              <div
                key={connection._id}
                className="flex pt-8 justify-center"
              >
                <div className="card bg-base-300 w-1/2 shadow-sm h-28 flex flex-row items-center">
                  <div className="flex items-center">
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full shadow-lg ml-2"
                    />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-xl font-bold">
                      {firstName + ' ' + lastName}
                    </h1>
                    <h2 className="text-md text-neutral-500">
                      {age + ', ' + gender}{' '}
                    </h2>
                    <p className="text-sm text-neutral-300 pt-2">{about}</p>
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

export default Connections;
