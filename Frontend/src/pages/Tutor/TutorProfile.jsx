import React, { useState, useEffect } from "react";
import { tutors } from "../../assets/data/mocktutors";
import { toast } from "react-toastify";
import { IoPersonSharp, IoSchoolSharp } from "react-icons/io5";
import { MdSubject, MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../components/axiosCreds";

const TutorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tutorData, setTutorData] = useState({
    fullname: "",
    profile: "",
    subject: "",
    email: "",
  });
  const [bookingHistory, setBookingHistory] = useState([]);

  const fetchData = async () => {
    try {
      await axios.get("/profile/get").then((res) => {
        setTutorData({
          fullname: res.data.name,
          email: res.data.email,
          profile: res.data.biography || "",
          subject: res.data.courses.join(" ") || "",
        });
      })
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    const result = await axios.get("/booking/getTutorBooking")
    setBookingHistory(result.data);
    console.log(bookingHistory);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTutorData({ ...tutorData, [name]: value });
  };

  const updateTutorProfile = async (tutorData) => {
    try {
      const res = await axios.post("/profile/update/tutor", tutorData);
      console.log(res.data);
    } catch (error) {
      console.error("Error updating tutor profile:", error);
    }
  };

  const handleSave = () => {
    updateTutorProfile(tutorData);
    setIsEditing(false);
    toast.success("Submission successful");
  };

  const columns = [
    { key: "student_id", title: "Student ID" },
    { key: "subject", title: "Subject" },
    { key: "detail", title: "Detail" },
    { key: "date", title: "Date" },
    { key: "time", title: "Time" },
    { key: "status", title: "Status" },
  ];

  return (
    <motion.section
      className="bg-[#fff9ea]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 3,
        x: { duration: 1 },
      }}
    >
      <div className="container shadow-md border-[1px] bg-white rounded max-md:px-2">
        <h1 className="heading mx-auto text-center my-8">Tutor Profile</h1>
        <div
          className="text__para text-[28px] mx-4 my-8 flex flex-row gap-4 
        text-center justify-evenly max-md:block"
        >
          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <IoPersonSharp className="mx-3" />
              Name &nbsp;
            </label>

            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="text"
                  name="fullname"
                  value={tutorData.fullname}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="fullname-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="fullname-span"
                >
                  {tutorData.fullname}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <IoSchoolSharp className="mx-3" />
              Profile &nbsp;
            </label>
            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="text"
                  name="profile"
                  value={tutorData.profile}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="profile-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="profile-span"
                >
                  {tutorData.profile}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <MdSubject className="mx-3" />
              Subject &nbsp;
            </label>

            <AnimatePresence>
              {
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="subject-span"
                >
                  {tutorData.subject}
                </motion.span>
              }
            </AnimatePresence>
          </div>

          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <MdEmail className="mx-3" />
              Email &nbsp;
            </label>

            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="email"
                  name="email"
                  value={tutorData.email}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="email-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="email-span"
                >
                  {tutorData.email}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="text__para text-[28px] mx-4 my-6 flex-row gap-4 text-black">
          Booking History
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="py-3 px-4"
                    style={{ maxWidth: "200px" }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookingHistory.map((record) => (
                <tr
                  key={record.session_id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{record.student_id}</td>
                  <td className="py-3 px-4">{record.course_id}</td>
                  <td className="py-3 px-4">{record.feedback}</td>
                  <td className="py-3 px-4">{record.date}</td>
                  <td className="py-3 px-4">
                    {record.start_time} - {record.end_time}
                  </td>
                  <td
                    className={`py-3 px-4 ${record.status === "Present"
                      ? "text-green-600"
                      : "text-red-600"
                      }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mx-4 my-6">
          <AnimatePresence>
            {isEditing ? (
              <motion.button
                onClick={handleSave}
                className="btn rounded bg-primaryColor text-white text-[18px] px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                key="save-button"
              >
                Save
              </motion.button>
            ) : (
              <motion.button
                onClick={toggleEditMode}
                className="btn rounded bg-primaryColor text-white text-[18px] px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                key="edit-button"
              >
                Edit Profile
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default TutorProfile;
