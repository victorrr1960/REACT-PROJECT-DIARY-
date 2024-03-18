import React, { useEffect } from "react";
import { useState } from "react";
import "./entries.css";
import Modal from "../modal/Modal";

function Entries() {
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    id: null,
  });
  const [entriesData, setEntriesData] = useState([]);

  const openModal = (data) => {
    setShowModal(!showModal);
    setFormData({
      title: data.title || "",
      text: data.text || "",
      id: data.id || null,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const getEntries = async () => {
      const requestOptions = {
        method: "GET",
        headers: new Headers({
          Authorization: jwtToken,
          "Content-Type": "application/json",
        }),
      };
      try {
        const response = await fetch(
          "https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/books",
          requestOptions
        );
        const data = await response.json();

        if (data) {
          console.log(data);
          setEntriesData(data.data);
        } else {
          console.error("Error creating document");
        }
      } catch (error) {
        console.error("Error creating document:", error);
      }
    };

    getEntries();
  }, [showModal, jwtToken]);

  const deleteEntries = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: new Headers({
        Authorization: jwtToken,
        "Content-Type": "application/json",
      }),
    };
    try {
      const response = await fetch(
        "https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/books/" +
          id,
        requestOptions
      );
      const data = await response.json();

      if (data) {
        console.log(data);
        const copy = [...entriesData];
        const newCopy = copy.filter((obj) => obj._id !== id);
        setEntriesData(newCopy);
      } else {
        console.error("Error creating document");
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <>
      <div className="entries_main">
        <div className="heading">
          <h3>Entries</h3>
          <div className="form-buttons">
            <button type="button" className="btn" onClick={openModal}>
              Create entry
            </button>
          </div>
        </div>
        <div>
          <div className="entry_container">
            {entriesData.map((entry, index) => {
              return (
                <>
                  <div className="entry" key={index}>
                    <div className="entry-title_container">
                      <div>{entry.title}</div>
                    </div>
                    <div className="date_container">
                      <div>{entry.date}</div>
                    </div>
                  </div>
                  <p>
                    {entry.text}
                    <br />
                    <br />
                    <br />
                    <div className="form-buttons">
                      <button
                        className="btn error"
                        onClick={() => deleteEntries(entry._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn"
                        onClick={() =>
                          openModal({
                            title: entry.title,
                            text: entry.text,
                            id: entry._id,
                          })
                        }
                      >
                        Edit
                      </button>
                    </div>
                    <hr />
                  </p>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          title={formData.title}
          text={formData.text}
          id={formData.id}
          cancel={closeModal}
          onSubmitted={closeModal}
        />
      )}
    </>
  );
}

export default Entries;
