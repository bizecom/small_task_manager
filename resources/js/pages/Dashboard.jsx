import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboard } from '../api/dashboard';

function Dashboard() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await dashboard();
        console.log({ dashboardData })
        setData(dashboardData);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [navigate]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className='text-2xl underlinem my-3'>Dashboard</h1>
      <div className="flex gap-5">
      <p className='p-3 w-full bg-gray-100 flex flex-col items-center rounded-md shadow'>Total <span>{data?.total_tasks ?? 0}</span></p>
      <p className='p-3 w-full bg-gray-100 flex flex-col items-center rounded-md shadow'>Completed: <span>{data?.completed_tasks ?? 0}</span></p>
      </div>
      <div className='my-3 bg-gray-100 flex flex-col items-center rounded-md shadow p-5'>
        <p className='text-lg my-3 font-weight-bolder uppercase'>Task Group by due Date:</p>
        <div className='flex flex-wrap justify-center gap-5'>
        {data?.tasks_grouped_by_due_date?.map((task, i) => (
          <div className='flex flex-col items-center bg-gray-200 rounded-md p-3'>
            <span className='text-gray-500'>{task?.due_date}</span>
            <span className='text-xl font-weight-bolder'>{task?.task_count}</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
