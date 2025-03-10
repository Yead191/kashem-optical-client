import React from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Seo from '../../../components/Seo/Seo';
import toast from 'react-hot-toast';
import Spinner from '../../../components/Spinner/Spinner';
import Select from 'react-select';
import { useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';

const roles = ['User', 'Admin'];
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
    const handleRoleChange = async (id, selectedRole) => {
        setSelectedRoles((prev) => ({ ...prev, [id]: selectedRole }));

        await toast.promise(axiosSecure.patch(`/users/${id}/${selectedRole}`), {
            loading: "Updating role...",
            success: <b>Role updated successfully!</b>,
            error: <b>Could not update.</b>,
        });

        refetch();
    };
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
                                    <Listbox value={selectedRoles[user._id] || user.role} onChange={(role) => handleRoleChange(user._id, role)}>
                                            <div className="relative w-32">
                                                <ListboxButton
                                                    className={clsx(
                                                        'relative w-full rounded-lg bg-base-100 border text-black py-1.5 pr-8 pl-3 text-left text-sm/6',
                                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                    )}
                                                >
                                                    {selectedRoles[user._id] || user.role}
                                                    <ChevronDownIcon
                                                        className="pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                                                        aria-hidden="true"
                                                    />
                                                </ListboxButton>
                                                <ListboxOptions
                                                    anchor="bottom"
                                                    transition
                                                    className={clsx(
                                                        'absolute z-10   rounded-xl border border-white/5 bg-base-100  p-1 shadow-lg',
                                                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                                    )}
                                                >
                                                    {roles.map((role, roleIndex) => (
                                                        <ListboxOption
                                                            key={roleIndex}
                                                            value={role}
                                                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 pl-3 pr-9 select-none text-black data-[focus]:bg-black/10"
                                                        >
                                                            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                                            {role}
                                                        </ListboxOption>
                                                    ))}
                                                </ListboxOptions>
                                            </div>
                                        </Listbox>
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