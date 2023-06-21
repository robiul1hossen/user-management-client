import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";
import loti from "./signup.json";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [users.length]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/user/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          const newUser = { _id: data.insertedId, ...data };
          setUsers((prevUsers) => [...prevUsers, newUser]);
          reset(); // Reset the form fields after successful submission
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div>
      <div className="lg:flex p-10 my-10">
        <div className="hero  lg:w-1/2 ">
          <div className="hero-content w-3/4">
            <div className="card lg:w-full shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="name"
                    className="input input-bordered"
                  />
                  {errors.name && <span className="text-red-600">Name is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && <span className="text-red-600">Email is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone*</span>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    {...register("phone", { required: true })}
                    placeholder="phone"
                    className="input input-bordered"
                  />
                  {errors.phone && <span className="text-red-600">Phone Number is required</span>}
                </div>
                <div className="form-control mt-6">
                  <input className="btn btn-primary" type="submit" value="Create User" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <Player autoplay loop src={loti} className="w-[400px] lg:w-[600px] h-[400px] lg:h-[600px]"></Player>
        </div>
      </div>

      <section className="grid lg:grid-cols-3 w-full md:grid-cols-2 gap-5 my-10">
        {users.map((user) => (
          <div key={user._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Name : {user.name}</h2>
              <p>Email : {user.email}</p>
              <p>Phone : {user.phone}</p>
              <div className="card-actions justify-center mt-5">
                <Link to={`update/${user._id}`}>
                  <button className="btn btn-outline btn-sm btn-circle">
                    <FaEdit></FaEdit>
                  </button>
                </Link>
                <button onClick={() => handleDelete(user._id)} className="btn btn-outline btn-sm btn-circle">
                  <FaTrashAlt></FaTrashAlt>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
