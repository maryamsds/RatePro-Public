// import axios from "axios"
// import { useEffect, useState } from "react"
// import {
//     MdPerson,
//     MdSecurity,
//     MdNotifications,
//     MdEdit,
//     MdSave,
//     MdCancel,
// } from "react-icons/md"
// import { getCurrentUser, updateProfile } from "../api/auth"


// const Profile = () => {
//     const [activeTab, setActiveTab] = useState("profile")
//     const [isEditing, setIsEditing] = useState(false)
//     const [showAlert, setShowAlert] = useState(false)
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         phone: "",
//         department: "",
//         role: "",
//         bio: "",
//         timezone: "",
//         language: "",
//     })
//     const [passwordData, setPasswordData] = useState({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: ""
//     });


//     const [notifications, setNotifications] = useState({
//         emailNotifications: true,
//         pushNotifications: false,
//         surveyAlerts: true,
//         weeklyReports: true,
//         systemUpdates: false,
//     })

//     // ✅ Fetch user profile from backend
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 // const res = await axios.get("http://localhost:5000/api/auth/me", {
//                 //     withCredentials: true, // important if you're using cookies for auth
//                 // })

//                 const res = await getCurrentUser()


//                 const user = res.data.user

//                 // 👇 Split full name into first and last for UI form
//                 const [firstName, lastName] = user.name?.split(" ") || ["", ""]

//                 setFormData({
//                     firstName,
//                     lastName,
//                     phone: user.phone || "",
//                     department: user.department || "",
//                     role: user.role || "",
//                     bio: user.bio || "",
//                     timezone: user.timezone || "",
//                     language: user.language || "",
//                 })
//             } catch (err) {
//                 console.error("Failed to fetch profile:", err)
//             }
//         }

//         fetchUserProfile()
//     }, [])


//     const handleInputChange = (e) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     const handleNotificationChange = (e) => {
//         const { name, checked } = e.target
//         setNotifications((prev) => ({ ...prev, [name]: checked }))
//     }

//     const handleSave = async () => {
//         try {
//             const updatedName = `${formData.firstName} ${formData.lastName}`

//             const payload = {
//                 ...formData,
//                 name: updatedName,
//             }

//             // await axios.put("http://localhost:5000/api/v1/auth/update-profile", payload, {
//             //     withCredentials: true,
//             // })

//             await updateProfile(payload)

//             setIsEditing(false)
//             setShowAlert(true)
//             setTimeout(() => setShowAlert(false), 3000)
//         } catch (err) {
//             console.error("Failed to save profile:", err)
//         }
//     }

//     const handleCancel = () => {
//         setIsEditing(false)
//     }

//     const handlePasswordRequestOTP = async () => {
//         try {
//             const { currentPassword, newPassword, confirmPassword } = passwordData;
//             if (newPassword !== confirmPassword)
//                 return alert("New passwords do not match");

//             await axios.post("/api/auth/request-password-update", {
//                 currentPassword,
//                 newPassword,
//             }, { withCredentials: true });

//             // Redirect to EnterOTP.jsx or show modal/component
//             navigate("/enter-otp?email=" + formData.email + "&purpose=reset");
//         } catch (err) {
//             console.error("OTP Request Failed:", err);
//         }
//     };

//     const tabClass = (tab) => `nav-link ${activeTab === tab ? "active" : ""}`
//     const inputClass = "form-control"

//     return (
//         <div className="container py-5">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                     <h2 className="fw-bold text-dark">Profile Settings</h2>
//                     <p className="text-muted small">
//                         Manage your account settings and preferences
//                     </p>
//                 </div>
//                 <div className="d-flex gap-2">
//                     {isEditing ? (
//                         <>
//                             <button onClick={handleCancel} className="btn btn-outline-secondary btn-sm">
//                                 <MdCancel className="me-1" /> Cancel
//                             </button>
//                             <button onClick={handleSave} className="btn btn-primary btn-sm">
//                                 <MdSave className="me-1" /> Save
//                             </button>
//                         </>
//                     ) : (
//                         <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-sm">
//                             <MdEdit className="me-1" /> Edit Profile
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {showAlert && (
//                 <div className="alert alert-success d-flex align-items-center" role="alert">
//                     <MdSave className="me-2" /> Profile updated successfully!
//                 </div>
//             )}

//             <div className="row g-4">
//                 <div className="col-lg-4">
//                     <div className="card text-center">
//                         <div className="card-body">
//                             <div
//                                 className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mb-3"
//                                 style={{ width: 100, height: 100, fontSize: 40 }}
//                             >
//                                 <MdPerson />
//                             </div>
//                             <h5>
//                                 {formData.firstName} {formData.lastName}
//                             </h5>
//                             <p className="text-muted small">{formData.email}</p>
//                             <span className="badge bg-primary mb-2">{formData.role}</span>
//                             <p className="small">{formData.bio}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-lg-8">
//                     <div className="card">
//                         <div className="card-body">
//                             <ul className="nav nav-tabs mb-4">
//                                 <li className="nav-item">
//                                     <button className={tabClass("profile")} onClick={() => setActiveTab("profile")}>
//                                         <MdPerson className="me-1" /> Personal Info
//                                     </button>
//                                 </li>
//                                 <li className="nav-item">
//                                     <button className={tabClass("security")} onClick={() => setActiveTab("security")}>
//                                         <MdSecurity className="me-1" /> Security
//                                     </button>
//                                 </li>
//                                 <li className="nav-item">
//                                     <button className={tabClass("notifications")} onClick={() => setActiveTab("notifications")}>
//                                         <MdNotifications className="me-1" /> Notifications
//                                     </button>
//                                 </li>
//                             </ul>

//                             {activeTab === "profile" && (
//                                 <form className="row g-3">
//                                     {[
//                                         ["First Name", "firstName"],
//                                         ["Last Name", "lastName"],
//                                         ["Email", "email"],
//                                         ["Phone", "phone"],
//                                         ["Department", "department"],
//                                     ].map(([label, name]) => (
//                                         <div className="col-md-6" key={name}>
//                                             <label className="form-label">{label}</label>
//                                             <input
//                                                 type="text"
//                                                 name={name}
//                                                 value={formData[name]}
//                                                 onChange={handleInputChange}
//                                                 disabled={!isEditing}
//                                                 className={inputClass}
//                                             />
//                                         </div>
//                                     ))}

//                                     <div className="col-md-6">
//                                         <label className="form-label">Role</label>
//                                         <input
//                                             type="text"
//                                             name="role"
//                                             value={formData.role}
//                                             className={`${inputClass} opacity-75`}
//                                             disabled
//                                         />
//                                     </div>

//                                     <div className="col-12">
//                                         <label className="form-label">Bio</label>
//                                         <textarea
//                                             name="bio"
//                                             rows="3"
//                                             className={inputClass}
//                                             onChange={handleInputChange}
//                                             disabled={!isEditing}
//                                             value={formData.bio}
//                                         ></textarea>
//                                     </div>
//                                 </form>
//                             )}

//                             {activeTab === "security" && (
//                                 <form className="row g-3">
//                                     <div className="col-md-12">
//                                         <label className="form-label">Current Password</label>
//                                         <input type="password" placeholder="Current password" onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className={inputClass} />
//                                     </div>
//                                     <div className="col-md-12">
//                                         <label className="form-label">New Password</label>
//                                         <input type="password" placeholder="New password" onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className={inputClass} />
//                                     </div>
//                                     <div className="col-md-12">
//                                         <label className="form-label">Confirm Password</label>
//                                         <input type="password" placeholder="Confirm password" onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className={inputClass} />
//                                     </div>
//                                     <div className="col-12">
//                                         <button type="button" className="btn btn-primary" onClick={handlePasswordRequestOTP}>Update Password</button>
//                                     </div>
//                                 </form>
//                             )}

//                             {activeTab === "notifications" && (
//                                 <form className="row g-3">
//                                     {Object.entries(notifications).map(([key, value]) => (
//                                         <div key={key} className="col-12 d-flex justify-content-between align-items-center">
//                                             <label className="form-check-label">
//                                                 {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
//                                             </label>
//                                             <input
//                                                 type="checkbox"
//                                                 className="form-check-input ms-2"
//                                                 name={key}
//                                                 checked={value}
//                                                 onChange={handleNotificationChange}
//                                             />
//                                         </div>
//                                     ))}
//                                     <div className="col-12">
//                                         <button type="button" className="btn btn-primary">Save Preferences</button>
//                                     </div>
//                                 </form>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profile
import axios from "axios"
import { useEffect, useState } from "react"
import {
    MdPerson,
    MdSecurity,
    MdNotifications,
    MdEdit,
    MdSave,
    MdCancel,
} from "react-icons/md"
import { getCurrentUser, updateProfile, updateUserProfile } from "../api/auth"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

const Profile = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("profile")
    const [isEditing, setIsEditing] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [userData, setUserData] = useState("");
    const [userId, setUserId] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        bio: "",
        timezone: "",
        language: "",
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [passwordErrors, setPasswordErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: false,
        surveyAlerts: true,
        weeklyReports: true,
        systemUpdates: false,
    })

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await getCurrentUser()
                const user = res.data.user
                const [firstName, lastName] = user.name?.split(" ") || ["", ""]
                setFormData({
                    firstName,
                    lastName,
                    email: user.email || "",
                    phone: user.phone || "",
                    department: user.department || "",
                    role: user.role || "",
                    bio: user.bio || "",
                    timezone: user.timezone || "",
                    language: user.language || "",
                })
                setUserId(user._id);
                setUserData(user);
            } catch (err) {
                console.error("Failed to fetch profile:", err)
            }
        }

        fetchUserProfile()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target
        setNotifications((prev) => ({ ...prev, [name]: checked }))
    }

    const handleSave = async () => {
        const updatedName = `${formData.firstName} ${formData.lastName}`.trim();
        const errors = { firstName: "", lastName: "", phone: "" };

        // 🔍 Validate First Name
        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required";
        } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.firstName)) {
            errors.firstName = "Only alphabets allowed";
        }

        // 🔍 Validate Last Name (optional)
        if (formData.lastName && !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.lastName)) {
            errors.lastName = "Only alphabets allowed";
        }

        // 🔍 Validate Phone
        if (formData.phone && !/^\+?\d+$/.test(formData.phone)) {
            errors.phone = "Only digits or + allowed";
        }

        setFormErrors(errors);
        if (Object.values(errors).some((e) => e)) return;

        try {
            // 🔄 Show loading Swal
            Swal.fire({
                title: "Saving...",
                text: "Please wait while we update your profile.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // 💾 Update profile
            await updateProfile({ name: updatedName });

            // ✅ Success Swal
            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Your changes have been saved successfully.",
                timer: 2000,
                showConfirmButton: false,
            });

            setIsEditing(false);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (err) {
            Swal.close(); // Close loader before showing error

            // ❌ Error Swal
            Swal.fire({
                icon: "error",
                title: "Failed to Save",
                text: err?.response?.data?.message || "An error occurred while saving your profile.",
            });
        }
    };


    const handleCancel = () => {
        setIsEditing(false)
    }

    // const handlePasswordRequest = async () => {
    //     const { currentPassword, newPassword, confirmPassword } = passwordData;
    //     const errors = { currentPassword: "", newPassword: "", confirmPassword: "" };

    //     // 🔐 Frontend validations
    //     if (!currentPassword) errors.currentPassword = "Current password is required";
    //     if (!newPassword) errors.newPassword = "New password is required";
    //     if (newPassword !== confirmPassword)
    //         errors.confirmPassword = "Passwords do not match";

    //     setPasswordErrors(errors);

    //     if (Object.values(errors).some((e) => e)) return;

    //     try {
    //         await axios.put(
    //             "/api/users/update-profile",
    //             { currentPassword, newPassword },
    //             { withCredentials: true }
    //         );

    //         // ✅ Success popup
    //         Swal.fire({
    //             icon: "success",
    //             title: "Password Updated",
    //             text: "Your password has been changed successfully!",
    //             timer: 2000,
    //             showConfirmButton: false,
    //         });

    //         setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    //         setPasswordErrors({ currentPassword: "", newPassword: "", confirmPassword: "" });
    //     } catch (err) {
    //         const msg = err.response?.data?.message || "Something went wrong";

    //         if (msg.toLowerCase().includes("current password")) {
    //             setPasswordErrors((prev) => ({ ...prev, currentPassword: msg }));
    //         } else {
    //             // ❌ Error popup
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Update Failed",
    //                 text: msg,
    //             });
    //         }
    //     }
    // };

    const handlePasswordRequest = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;
        const errors = { currentPassword: "", newPassword: "", confirmPassword: "" };

        // 🔐 Frontend validations
        if (!currentPassword) errors.currentPassword = "Current password is required";
        if (!newPassword) errors.newPassword = "New password is required";
        if (newPassword !== confirmPassword)
            errors.confirmPassword = "Passwords do not match";

        setPasswordErrors(errors);

        if (Object.values(errors).some((e) => e)) return;

        try {
            // 🔄 Show loading indicator
            Swal.fire({
                title: "Updating Password...",
                text: "Please wait",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // 🛠️ Send update request
            await updateUserProfile({ currentPassword, newPassword });

            // ✅ Success popup
            Swal.fire({
                icon: "success",
                title: "Password Updated",
                text: "Your password has been changed successfully!",
                timer: 2000,
                showConfirmButton: false,
            });

            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setPasswordErrors({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong";

            Swal.close(); // ⛔ close loading before showing error

            if (msg.toLowerCase().includes("current password")) {
                setPasswordErrors((prev) => ({ ...prev, currentPassword: msg }));
            } else {
                // ❌ Error popup
                Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: msg,
                });
            }
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const res = await axiosInstance.put(`/users/${userId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire("Success", "Avatar updated!", "success");
            // Optionally update avatar preview:
            setUserData(res.data.user);
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Upload failed", "error");
        }
    };

    const tabClass = (tab) => `nav-link ${activeTab === tab ? "active" : ""}`
    const inputClass = "form-control"

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark">Profile Settings</h2>
                    <p className="text-muted small">
                        Manage your account settings and preferences
                    </p>
                </div>
                <div className="d-flex gap-2">
                    {activeTab === "profile" && (
                        isEditing ? (
                            <>
                                <button onClick={handleCancel} className="btn btn-outline-secondary btn-sm">
                                    <MdCancel className="me-1" /> Cancel
                                </button>
                                <button onClick={handleSave} className="btn btn-primary btn-sm">
                                    <MdSave className="me-1" /> Save
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-sm">
                                <MdEdit className="me-1" /> Edit Profile
                            </button>
                        )
                    )}
                </div>
            </div>

            {showAlert && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <MdSave className="me-2" /> Profile updated successfully!
                </div>
            )}

            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <div
                                className="profile-avatar mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center position-relative"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    backgroundColor: "var(--primary-color)",
                                    color: "#fff",
                                    fontSize: "3rem",
                                    cursor: "pointer",
                                }}
                            >
                                {/* Avatar image or fallback initial */}
                                {userData?.avatar?.url ? (
                                    <img
                                        src={userData.avatar.url}
                                        alt="Avatar"
                                        className="rounded-circle w-100 h-100 object-fit-cover"
                                    />
                                ) : (
                                    <span>{userData?.name?.charAt(0)?.toUpperCase() || <MdPerson />}</span>
                                )}

                                {/* Hidden file input */}
                                <input
                                    className="form-control"
                                    id="avatarUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    style={{ display: "none" }}
                                />

                                {/* Edit icon trigger */}
                                <label
                                    htmlFor="avatarUpload"
                                    style={{
                                        position: "absolute",
                                        bottom: "5px",
                                        left: "5px",
                                        backgroundColor: "#fff",
                                        borderRadius: "50%",
                                        padding: "5px",
                                        cursor: "pointer",
                                        height: "26px",
                                        width: "26px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    <MdEdit size={16} color="var(--rater-pro-purple)" />
                                </label>
                            </div>
                            <h5>
                                {formData.firstName} {formData.lastName}
                            </h5>
                            <p className="text-muted small">{formData.email}</p>
                            <span className="badge bg-primary mb-2">{formData.role}</span>
                            <p className="small">{formData.bio}</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-tabs mb-4">
                                <li className="nav-item">
                                    <button className={tabClass("profile")} onClick={() => setActiveTab("profile")}>
                                        <MdPerson className="me-1" /> Personal Info
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={tabClass("security")} onClick={() => setActiveTab("security")}>
                                        <MdSecurity className="me-1" /> Security
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={tabClass("notifications")} onClick={() => setActiveTab("notifications")}>
                                        <MdNotifications className="me-1" /> Notifications
                                    </button>
                                </li>
                            </ul>

                            {activeTab === "profile" && (
                                <form className="row g-3">
                                    {[
                                        ["First Name", "firstName"],
                                        ["Last Name", "lastName"],
                                        ["Phone", "phone"],
                                        ["Department", "department"],
                                    ].map(([label, name]) => (
                                        <div className="col-md-6" key={name}>
                                            <label className="form-label">{label}</label>
                                            <input
                                                type="text"
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={inputClass}
                                            />
                                            {/* Show error only for validated fields */}
                                            {["firstName", "lastName", "phone"].includes(name) && formErrors[name] && (
                                                <small className="text-danger">{formErrors[name]}</small>
                                            )}
                                        </div>
                                    ))}

                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            className={inputClass}
                                            disabled // email is always non-editable
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            className={`${inputClass} opacity-75`}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Bio</label>
                                        <textarea
                                            name="bio"
                                            rows="3"
                                            className={inputClass}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            value={formData.bio}
                                        ></textarea>
                                    </div>
                                </form>
                            )}

                            {activeTab === "security" && (
                                <form className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Current Password</label>
                                        <input
                                            type="password"
                                            placeholder="Current password"
                                            onChange={(e) => {
                                                setPasswordData({ ...passwordData, currentPassword: e.target.value });
                                                setPasswordErrors((prev) => ({ ...prev, currentPassword: "" }));
                                            }}
                                            className={inputClass}
                                        />
                                        {passwordErrors.currentPassword && (
                                            <small className="text-danger">{passwordErrors.currentPassword}</small>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="New password"
                                            onChange={(e) => {
                                                setPasswordData({ ...passwordData, newPassword: e.target.value });
                                                setPasswordErrors((prev) => ({ ...prev, newPassword: "" }));
                                            }}
                                            className={inputClass}
                                        />
                                        {passwordErrors.newPassword && (
                                            <small className="text-danger">{passwordErrors.newPassword}</small>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm password"
                                            onChange={(e) => {
                                                setPasswordData({ ...passwordData, confirmPassword: e.target.value });
                                                setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }));
                                            }}
                                            className={inputClass}
                                        />
                                        {passwordErrors.confirmPassword && (
                                            <small className="text-danger">{passwordErrors.confirmPassword}</small>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handlePasswordRequest}
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === "notifications" && (
                                <form className="row g-3">
                                    {Object.entries(notifications).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="col-12 d-flex justify-content-between align-items-center"
                                        >
                                            <label className="form-check-label">
                                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                            </label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input ms-2"
                                                name={key}
                                                checked={value}
                                                onChange={handleNotificationChange}
                                            />
                                        </div>
                                    ))}
                                    <div className="col-12">
                                        <button type="button" className="btn btn-primary">
                                            Save Preferences
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
