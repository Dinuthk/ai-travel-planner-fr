import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions,SelectTrevelsList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    if (!formData?.location || !formData?.budget || !formData?.traveler || formData?.noOfDays > 5) {
      toast("Please fill all details");
      return;
    }

    const FINAL_PROMPT = AIP_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totslDays}', formData?.noOfDays)
      .replace('{budget}', formData?.budget)
      .replace('{traveler}', formData?.traveler);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your preference🌴🏖️</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some information about your choice, then we will give some options to you.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input
            placeholder='Ex. 3'
            type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData.budget === item.title ? 'bg-green-500 text-white' : ''}`}
              >
                <h2 className='text-xl font-medium'>{item.icon}</h2>
                <h2 className='text-xl font-medium'>{item.title}</h2>
                <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTrevelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData.traveler === item.people ? 'bg-green-500 text-white' : ''}`}
              >
                <h2 className='text-xl font-medium'>{item.icon}</h2>
                <h2 className='text-xl font-medium'>{item.title}</h2>
                <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button variant="destructive" onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
