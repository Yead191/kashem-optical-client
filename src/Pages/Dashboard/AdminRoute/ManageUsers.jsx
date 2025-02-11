import React from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Seo from '../../../components/Seo/Seo';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()


    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    const handleRoleChange = async (id, val) => {
        // console.log(id, val);

        await toast.promise(axiosSecure.patch(`/users/${id}/${val}`), {
            loading: "Updating role...",
            success: <b>Role updated successfully!</b>,
            error: <b>Could not update.</b>,
        });
        refetch()
    }
    return (
        <div className='my-12'>
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
                                <th>Member Since</th>
                                <th className='flex justify-end'>Action</th>
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
                                    <td>{user?.createdAt}</td>
                                    <th className="flex items-center justify-end h-full">
                                        <select
                                            className="select select-bordered select-sm"
                                            defaultValue={user?.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}

                                        >
                                            <option disabled>Select Role</option>
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
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