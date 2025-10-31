import { Button, Input, List, message, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice"; // Import your user selector
import { RootState } from "../store"; // Import your root state type
import "../User/Calendar.css"; // Calendar styles

const CalendarPage = () => {
  const user = useSelector((state: RootState) => selectUser(state)); // Fetch user data from Redux
  const userEmail = user?.email || ""; // Extract the email safely
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEventDescription, setNewEventDescription] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    if (userEmail) {
      fetchEvents();
    }
  }, [userEmail]);
  // Fetch events for the logged-in user
  const fetchEvents = async () => {
    if (!userEmail) return; // Ensure userEmail exists

    try {
      const response = await axios.get("https://bracu-study-portal.onrender.com/api/v1/events", {
        headers: { "X-User-Email": userEmail }, // Pass email in headers
      });

      const eventData = Array.isArray(response.data) ? response.data : [];
      setEvents(eventData); // Update state with fetched events
    } catch (error) {
      message.error("Failed to fetch events.");
      console.error("Error fetching events:", error);
    }
  };

  // Add a new event
  const handleAddEvent = async () => {
    if (newEventDescription.trim() && userEmail) {
      try {
        const response = await axios.post(
          "https://bracu-study-portal.onrender.com/api/v1/events",
          {
            date: date.toISOString(),
            description: newEventDescription,
            userEmail, // Include userEmail in the request body
          }
        );
        setEvents([...events, response.data]);
        setNewEventDescription("");
        setIsModalVisible(false);
        message.success("Event added successfully!");
      } catch (error) {
        message.error("Failed to add event.");
        console.error(error);
      }
    }
  };

  // Update an event
  const handleUpdateEvent = async () => {
    if (editingEvent && newEventDescription.trim() && userEmail) {
      try {
        const response = await axios.put(
          `https://bracu-study-portal.onrender.com/api/v1/events/${editingEvent._id}`, // Corrected URL
          {
            date: date.toISOString(),
            description: newEventDescription,
            userEmail, // Include userEmail in the request body
          }
        );
        setEvents(
          events.map((event) =>
            event._id === editingEvent._id ? response.data : event
          )
        );
        setNewEventDescription("");
        setEditingEvent(null);
        setIsModalVisible(false);
        message.success("Event updated successfully!");
      } catch (error) {
        message.error("Failed to update event.");
        console.error(error);
      }
    }
  };

  // Delete an event
  const handleDeleteEvent = async (id: string) => {
    if (!userEmail) return;
    try {
      await axios.delete(`https://bracu-study-portal.onrender.com/api/v1/events/${id}`, {
        data: { userEmail }, // Include userEmail in the request body
      });
      setEvents(events.filter((event) => event._id !== id));
      message.success("Event deleted successfully!");
    } catch (error) {
      message.error("Failed to delete event.");
      console.error(error);
    }
  };

  // Open modal for adding or editing an event
  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setNewEventDescription(event.description);
      setDate(new Date(event.date)); // Set the date for the modal based on the event
    } else {
      setEditingEvent(null);
      setNewEventDescription("");
    }
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEvent(null);
  };

  // Filter events for the selected date
  const filteredEvents = events.filter((event) =>
    moment(event.date).isSame(date, "day")
  );

  return (
    <div style={{ padding: "24px" }}>
      <h1>Calendar</h1>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const hasEvent = events.some((event) =>
              moment(event.date).isSame(date, "day")
            );
            return hasEvent ? "has-event" : "";
          }
          return "";
        }}
      />

      <Button
        type="primary"
        style={{ marginTop: "16px" }}
        onClick={() => handleOpenModal()}
      >
        Add Event
      </Button>

      <div style={{ marginTop: "24px" }}>
        <h2>Events on {moment(date).format("MMMM D, YYYY")}</h2>
        <List
          bordered
          dataSource={filteredEvents}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleOpenModal(item)}
                  key="edit"
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  onClick={() => handleDeleteEvent(item._id)}
                  danger
                  key="delete"
                >
                  Delete
                </Button>,
              ]}
            >
              {item.description}
            </List.Item>
          )}
        />
      </div>

      <Modal
        title={editingEvent ? "Edit Event" : "Add Event"}
        open={isModalVisible}
        onOk={editingEvent ? handleUpdateEvent : handleAddEvent}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Event description"
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
        />
        {/* Add date picker to select and update the event date */}
        <Calendar
          onChange={(date) => setDate(date)} // Update the date when the user selects a new date
          value={date} // This ensures that the calendar is in sync with the selected date
        />
      </Modal>
    </div>
  );
};

export default CalendarPage;
