const WebApi = ({logs}) => {
    return(
        <section className='flex flex-col justify-center text-center lg:m-10 lg:mx-70 m-4 md:mx-40'>
        <div className='flex flex-col w-full m-10 self-center text-center p-10 border-b-4 border-blue-700 rounded-sm'>
          <h1 className='font-bold text-6xl text-blue-700'>Intruder Scanner</h1>
          <p className='text-gray-700'>Real Time Intruder System</p>
        </div>
        <div className='grid lg:grid-cols-3 gap-5'>
          <div className='flex text-center justify-center flex-col space-y-5 p-4 py-10 shadow-lg rounded-xl border border-gray-100'>
            <p className='text-gray-700 uppercase'>Total Detections</p>
            <h1 className='text-blue-600 text-2xl font-bold'>0</h1>
          </div>
          <div className='flex text-center justify-center flex-col space-y-5 p-4 py-10 shadow-lg rounded-xl border border-gray-100'>
            <p className='text-gray-700 uppercase'>Latest Distance</p>
            <h1 className='text-blue-600 text-2xl font-bold'>--</h1>
          </div>
          <div className='flex @container text-center justify-center flex-col space-y-5 p-4 py-10 shadow-lg rounded-xl border border-gray-100'>
            <p className='text-gray-700 uppercase'>Status</p>
            <h1 className='text-blue-600 @lg:text-2xl @md:text-lg font-bold uppercase'>Monitoring</h1>
          </div>
        </div>
        <div className='flex text-center justify-center flex-col space-y-5 p-4 mt-10 shadow-lg rounded-xl border border-gray-100'>
          <div className='flex justify-between p-4 border-b border-gray-200'>
            <h1 className='text-blue-600 font-bold text-2xl'>Detection Log</h1>
            <button className='p-2 px-4 text-white bg-blue-600 rounded-lg font-semibold'>Refresh</button>
          </div>
          <div className='flex flex-col'>
            {logs.length === 0 ? (
              <p className='self-center text-gray-400 lg:p-40 py-30'>No Detections Yet</p>
            ) : (logs.map((log) => (
                <div key={log.id} className='flex justify-between p-2 px-4 text-lg mb-2 rounded-lg shadow-md'>
                  <p>{log.id}</p>
                  <p>{log.sensor_type}</p>
                  <p>{log.distance} cm</p>
                  <p>{log.time_detected}</p>
                </div>
                ))
              )
            }
          </div>
        </div>
      </section>
    );
}

export default WebApi;