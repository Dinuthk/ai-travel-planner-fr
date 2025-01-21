import React from 'react';

function CreateTrip() {

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>

      <h2 className='font-bold text-3xl'>Tell us your preference</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some information about your choice, then we will give some options to you.
      </p>

      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
        </div>
      </div>

    </div>
  );
};

export default CreateTrip;
