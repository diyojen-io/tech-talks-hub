'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import FormCard from '@/app/components/FormCard/FormCard';
import './CreateOrganisationsForm.scss';
import BaseButton from '@/app/components/BaseButton/BaseButton';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '@/config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);
interface FormData {
  name: string;
  location: string;
  description: string;
}

export default function CreateOrganisationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    description: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(DB, 'organisations'), {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        owner: '9QPvySZLp6UpHMZwIUjq0yd3FWB2',
      });

      setFormData({
        name: '',
        location: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <FormCard title="Create Company">
          <label className="form__label">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form__input"
          />

          <label className="form__label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form__input"
          />

          <label className="form__label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form__textarea"
          ></textarea>
        </FormCard>
        <BaseButton
          label="Create Kommunity"
          type="submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
