const WebApi = ({data}) => {
    return(
        <section className='flex flex-col justify-center text-center lg:m-10 lg:mx-70 m-4 md:mx-40'>
        <div className='flex flex-col w-full m-10 self-center text-center p-10 border-b-4 border-blue-500 rounded-sm'>
          <h1 className='font-bold text-6xl text-blue-500'>Intruder Scanner</h1>
          <p className='text-white'>WEB API PAGE</p>
        </div>

        <div className='flex text-center justify-center flex-col space-y-5 p-4 mt-10 shadow-lg shadow-blue-600 rounded-xl border border-blue-600'>
          <div className='flex justify-between p-4 border-b border-gray-200'>
            <h1 className='text-blue-500 font-bold text-2xl'>Detection Logs</h1>
          </div>
          <div className='flex justify-between p-2 px-4 text-md mt-2 font-bold rounded-lg'>
            <p>ID</p>
            <p>Sensor Type</p>
            <p>Distance</p>
            <p>Time Detected</p>
          </div>
          <div className='flex flex-col'>
            {data.length === 0 ? (
              <p className='self-center text-white lg:p-40 py-30'>No Detections Yet</p>
            ) : (data.map((d) => (
                <div key={d.id} className='flex justify-between p-2 px-4 text-lg mb-2 rounded-lg shadow-md'>
                  <p>{d.id}</p>
                  <p>{d.sensor_type}</p>
                  <p>{d.distance} cm</p>
                  <p>{d.time_detected}</p>
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