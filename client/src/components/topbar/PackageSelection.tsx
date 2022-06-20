import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../../contexts/ThemeContext";
import { themeBackGroundColors } from "../../themes";

Modal.setAppElement("#root");

const PackageSelection = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [packages, setPackages] = useState<string>(
    localStorage.getItem("packages") || ""
  );
  const theme = useTheme();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const afterOpenModal = () => {
    console.log("open modal");
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const updatePackages = () => {
    console.log(packages);
    localStorage.setItem("packages", packages);

    const id = toast.loading("Updating packages...");

    axios
      .post("http://localhost:80/update-packages", {
        packages: packages,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          console.log("Packages updated successfully");
          toast.update(id, {
            render: "Packages updated successfully!",
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });
        } else {
          console.log("Failed to update packages");
          toast.update(id, {
            render: "Invalid package list!",
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });
        }
      });

    // const sendPost = () => {
    //   return axios.post("http://localhost:80/update-packages", {
    //     packages: packages,
    //   });
    // };

    // toast
    //   .promise(sendPost, {
    //     pending: "Updating packages...",
    //     success: "Packages updated successfully!",
    //     error: "Failed to update packages",
    //   })
    //   .then(({ data }) => {
    //     if (data.status === "success") {
    //       console.log("Packages updated successfully");
    //     } else {
    //       console.log("Failed to update packages");
    //     }
    //   });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "min(900px, 60%)",
      backgroundColor: themeBackGroundColors[theme].color,
    },
    overlay: {},
  };

  return (
    <>
      <button
        className="bg-blue-400 text-white p-2 rounded-md hover:opacity-75 transition-opacity"
        onClick={openModal}
      >
        Package Manager
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Package Manager"
        closeTimeoutMS={50}
      >
        <h2 className="text-lg font-bold p-2 dark:text-white">
          Package Manager
        </h2>
        <h4 className="text-sm p-2 dark:text-white">
          Please type in the name of each package on a separate line.
          Optionally, you can put a '=VERSION_NUMBER' after the package to
          specify a certain version (same format as requirements.txt)
        </h4>
        <div className="">
          <textarea
            className="p-2 m-2"
            placeholder="Start listing packages here..."
            value={packages}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPackages(event.target.value)
            }
            style={{
              display: "block",
              width: "90%",
              height: "20ch",
              borderRadius: 4,
              border: "2px solid black",
              fontFamily: "source code pro",
            }}
          ></textarea>
          <button
            className="text-white bg-green-400 p-2 ml-2 rounded-md hover:opacity-75 transition-opacity"
            onClick={updatePackages}
          >
            Update Packages
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PackageSelection;
