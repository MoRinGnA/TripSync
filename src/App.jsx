import { useState, useEffect } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DayTabs from "./components/DayTabs";
import ScheduleForm from "./components/ScheduleForm";
import Timeline from "./components/Timeline";
import TrashCan from "./components/TrashCan";

function App() {
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("project-p-schedule");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        day: 1,
        time: "09:00",
        title: "공항 도착 및 수하물 위탁",
        location: "인천국제공항 제1터미널",
      },
      {
        id: 2,
        day: 1,
        time: "11:30",
        title: "비행기 탑승 및 출발",
        location: "게이트 24번",
      },
      {
        id: 3,
        day: 2,
        time: "10:00",
        title: "유니버셜 스튜디오 재팬",
        location: "오사카",
      },
      {
        id: 4,
        day: 2,
        time: "19:00",
        title: "도톤보리 맛집 투어",
        location: "오사카 난바",
      },
      {
        id: 5,
        day: 3,
        time: "11:00",
        title: "숙소 체크아웃 및 공항 이동",
        location: "오사카 시내 호텔",
      },
    ];
  });

  const [days, setDays] = useState(() => {
    const saved = localStorage.getItem("project-p-days");
    if (saved) {
      return JSON.parse(saved);
    }
    return [1, 2, 3];
  });

  const [activeDay, setActiveDay] = useState(1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  useEffect(() => {
    localStorage.setItem("project-p-schedule", JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem("project-p-days", JSON.stringify(days));
  }, [days]);

  const [newItem, setNewItem] = useState({
    time: "",
    title: "",
    location: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    time: "",
    title: "",
    location: "",
  });

  const handleAddDay = () => {
    const nextDay = days.length > 0 ? Math.max(...days) + 1 : 1;
    setDays([...days, nextDay]);
    setActiveDay(nextDay);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === "trash-can") {
      const dayToDelete = active.data.current.day;

      const newDays = days
        .filter((d) => d !== dayToDelete)
        .map((d, index) => index + 1);

      const newSchedule = schedule
        .filter((item) => item.day !== dayToDelete)
        .map((item) => {
          if (item.day > dayToDelete) {
            return { ...item, day: item.day - 1 };
          }
          return item;
        });

      setDays(newDays);
      setSchedule(newSchedule);

      if (activeDay === dayToDelete) {
        setActiveDay(1);
      } else if (activeDay > dayToDelete) {
        setActiveDay(activeDay - 1);
      }
    }
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();

    const newId =
      schedule.length > 0
        ? Math.max(...schedule.map((item) => item.id)) + 1
        : 1;

    const newSchedule = [
      ...schedule,
      { id: newId, day: activeDay, ...newItem },
    ];

    newSchedule.sort((a, b) => (a.time > b.time ? 1 : -1));

    setSchedule(newSchedule);
    setNewItem({ time: "", title: "", location: "" });
  };

  const handleDelete = (id) => {
    const filteredSchedule = schedule.filter((item) => item.id !== id);
    setSchedule(filteredSchedule);
  };

  const handleEditStart = (item) => {
    setEditingId(item.id);
    setEditForm({
      time: item.time,
      title: item.title,
      location: item.location,
    });
  };

  const handleEditSave = (id) => {
    const updatedSchedule = schedule.map((item) => {
      if (item.id === id) {
        return { ...item, ...editForm };
      }
      return item;
    });

    updatedSchedule.sort((a, b) => (a.time > b.time ? 1 : -1));

    setSchedule(updatedSchedule);
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const currentDaySchedule = schedule.filter((item) => item.day === activeDay);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="app-layout">
        <div className="max-w-3xl mx-auto">
          <h1 className="header-title">Project P</h1>

          <DayTabs
            days={days}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            onAddDay={handleAddDay}
          />

          <ScheduleForm
            newItem={newItem}
            setNewItem={setNewItem}
            onAddSchedule={handleAddSchedule}
            activeDay={activeDay}
          />

          <Timeline
            schedule={currentDaySchedule}
            editingId={editingId}
            editForm={editForm}
            setEditForm={setEditForm}
            onEditStart={handleEditStart}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            onDelete={handleDelete}
          />
        </div>
        <TrashCan />
      </div>
    </DndContext>
  );
}

export default App;
