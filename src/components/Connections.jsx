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
    <div className="px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center pt-8">
        Connections
      </h1>
      {!connections || connections.length === 0 ? (
        <div className="flex justify-center py-8">
          <p className="text-base md:text-lg text-center">
            No connections yet!
            <Link
              to="/"
              className="pl-2 text-blue-300 items-center inline-flex"
            >
              Explore
              <img
                src="maximize.png"
                alt="explore"
                className="w-4 h-4 md:w-5 md:h-5 ml-1 inline-block align-middle"
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
                <div className="card bg-base-300 w-full md:w-1/2 shadow-sm h-auto md:h-28 flex flex-col md:flex-row items-center p-4 md:p-0">
                  <div className="flex items-center">
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg"
                    />
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                    <h1 className="text-lg md:text-xl font-bold">
                      {firstName + ' ' + lastName}
                    </h1>
                    <h2 className="text-sm md:text-md text-neutral-500">
                      {age + ', ' + gender}{' '}
                    </h2>
                    <p className="text-xs md:text-sm text-neutral-300 pt-2">
                      {about}
                    </p>
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
