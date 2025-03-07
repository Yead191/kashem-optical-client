import React from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Seo from '../../../components/Seo/Seo';
import toast from 'react-hot-toast';
import Spinner from '../../../components/Spinner/Spinner';
import Select from 'react-select';
import { useState } from 'react';


const ManageUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [selectedRoles, setSelectedRoles] = useState({});


    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    const handleRoleChange = async (id, selectedOption) => {
        const role = selectedOption.value;
        setSelectedRoles((prev) => ({ ...prev, [id]: role }));

        await toast.promise(axiosSecure.patch(`/users/${id}/${role}`), {
            loading: "Updating role...",
            success: <b>Role updated successfully!</b>,
            error: <b>Could not update.</b>,
        });

        refetch();
    }
    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div className='my-10 p-2'>
            <Seo title={'Users | Kashem Optical'}></Seo>
            <div className="mb-6 text-center">
                <h2 className="text-3xl xl:text-4xl font-bold pb-3">
                    Manage <span className="text-blue-600">Users</span>
                </h2>
            </div>
            <div className='container mx-auto'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone no.</th>
                                <th>Member Since</th>
                                <th className='flex justify-end'>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users?.map((user, index) => <tr key={user._id} className="hover ">
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.image ? user.image : 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg'}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td>
                                        {user?.mobile}
                                    </td>
                                    <td>{user?.createdAt}</td>
                                    <th className="flex items-center justify-end h-full">
                                        <Select
                                        isSearchable={false}
                                            className="w-32"
                                            value={{
                                                value: selectedRoles[user._id] || user.role,
                                                label: selectedRoles[user._id] || user.role
                                            }}
                                            onChange={(selectedOption) => handleRoleChange(user._id, selectedOption)}
                                            options={[
                                                { value: 'User', label: 'User' },
                                                { value: 'Admin', label: 'Admin' }
                                            ]}
                                        />
                                    </th>

                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default ManageUsers;