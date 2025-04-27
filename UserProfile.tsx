import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phone: string;
  gender: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      address: {
        address: user.address.address,
        city: user.address.city,
        state: user.address.state,
        country: user.address.country,
        postalCode: user.address.postalCode,
      },
    },
  });

  const onSubmit = (data: User) => {
    setProfile((prev) => ({ ...prev, ...data }));
    setIsEditing(false);
    alert('Profile updated');
  };

  return (
    <div className="card mt-4 mx-auto" style={{ maxWidth: '600px' }}>
      <img src={profile.image} className="card-img-top" alt={profile.firstName} />
      <div className="card-body">
        <h5 className="card-title">
          {profile.firstName} {profile.lastName}
        </h5>
        <p className="card-text">{profile.email}</p>
        <p className="card-text">{profile.phone}</p>
        <p className="card-text">{profile.gender}</p>
        <p className="card-text">
          {profile.address.address}, {profile.address.city}, {profile.address.state},{' '}
          {profile.address.country} - {profile.address.postalCode}
        </p>

        <button className="btn btn-secondary mt-3" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>

        {isEditing && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <div className="mb-2">
              <label>First Name</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                className="form-control"
              />
              <small className="text-danger">{errors.firstName?.message}</small>
            </div>

            <div className="mb-2">
              <label>Last Name</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                className="form-control"
              />
              <small className="text-danger">{errors.lastName?.message}</small>
            </div>

            <div className="mb-2">
              <label>Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="form-control"
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>

            <div className="mb-2">
              <label>Phone</label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                className="form-control"
              />
              <small className="text-danger">{errors.phone?.message}</small>
            </div>

            <div className="mb-2">
              <label>Gender</label>
              <select {...register('gender')} className="form-control">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-2">
              <label>Address</label>
              <input
                {...register('address.address', { required: 'Address is required' })}
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label>City</label>
              <input
                {...register('address.city', { required: 'City is required' })}
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label>State</label>
              <input
                {...register('address.state', { required: 'State is required' })}
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label>Country</label>
              <input
                {...register('address.country', { required: 'Country is required' })}
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label>Postal Code</label>
              <input
                {...register('address.postalCode', { required: 'Postal Code is required' })}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
