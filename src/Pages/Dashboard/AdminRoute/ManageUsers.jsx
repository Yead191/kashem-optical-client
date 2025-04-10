import React, { useEffect } from "react";
import { useQuery } from "react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Seo from "../../../components/Seo/Seo";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import Select from "react-select";
import { useState } from "react";
import {
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon, User } from "lucide-react";
import { CheckIcon } from "lucide-react";
import DashboardPagesHeader from "@/components/DashboardPagesHeader";

const roles = ["User", "Admin"];
const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedRoles, setSelectedRoles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchTerm}`);
      return res.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);
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
    return <Spinner></Spinner>;
  }
  return (
    <div className=" p-2 container mx-auto">
      <Seo title={"Users | Kashem Optical"}></Seo>
      <DashboardPagesHeader
        title={"Manage Users"}
        subtitle={"Manage Your Users and their roles!"}
        icon={User}
      />
      <div className="">
        <div className="relative flex items-center gap-2">
          <Input
            className={clsx(
              "my-3 block w-full sm:w-full md:w-56 rounded-lg border bg-black/5 py-1.5 px-3 pr-10 text-sm text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            placeholder="Search User"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              title="Clear Search"
              className="btn btn-sm text-red-500 hidden md:flex"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
          {searchTerm && (
            <button
              className="absolute right-3 md:hidden top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone no.</th>
                <th>Member Since</th>
                <th className="flex justify-end">Role</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((user, index) => (
                <tr key={user._id} className="hover ">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              user?.image
                                ? user.image
                                : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.mobile}</td>
                  <td>{user?.createdAt}</td>
                  <th className="flex items-center justify-end h-full">
                    <Listbox
                      value={selectedRoles[user._id] || user.role}
                      onChange={(role) => handleRoleChange(user._id, role)}
                    >
                      <div className="relative w-32">
                        <ListboxButton
                          className={clsx(
                            "relative w-full rounded-lg bg-base-100 border text-black py-1.5 pr-8 pl-3 text-left text-sm/6",
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
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
                            "absolute z-10   rounded-b-lg border border-white/5 bg-base-100  p-1 shadow-lg",
                            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                          )}
                        >
                          {roles.map((role, roleIndex) => (
                            <ListboxOption
                              key={roleIndex}
                              value={role}
                              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 pl-3 pr-9 select-none text-sm text-black data-[focus]:bg-black/10"
                            >
                              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                              {role}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
