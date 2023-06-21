import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const Updateuser = () => {
  const allData = useLoaderData();
  const { _id, name, email, phone } = allData;

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const updatedData = { name, email, phone };

    fetch(`https://user-management-server-sigma.vercel.app/user/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "success!",
            text: "User updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content w-full">
          <div className="card lg:w-1/2 shadow-2xl bg-base-100">
            <Link to="/">
              <button className="btn btn-outline btn-sm lg:w-1/4 w-1/2 flex justify-start">
                <FaArrowLeft></FaArrowLeft> go home
              </button>
            </Link>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  required
                  defaultValue={name}
                  name="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  required
                  defaultValue={email}
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="number"
                  required
                  defaultValue={phone}
                  name="phone"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Update" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateuser;
