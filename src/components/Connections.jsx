import axios from 'axios';
import { addConnections } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h2 className="text-2xl font-bold font-mono mt-4 text-center">
        Currently there are no connections
      </h2>
    );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold font-mono mt-4">Connections</h2>
      {connections.map((connection) => {
        const { firstName, lastName, about, age, gender, photoUrl, skills } =
          connection;
        return (
          <div className="card card-side bg-base-300 shadow-sm w-1/3 px-4 m-4">
            <div className="avatar flex items-center">
              <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring-2 ring-offset-2">
                <img src={photoUrl} />
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">{firstName + ' ' + lastName}</h2>
              <p>{age + ' ' + gender}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
