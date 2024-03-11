"use client";
import { createContext, useContext } from "react";
import { onSnapshot, getSnapshot } from "mobx-state-tree";
import { taskStore, TaskStore, updateTaskStoreWithSnapshot } from "./TaskStore";

const StoreContext = createContext({ taskStore });
if (process.browser) {
  const initialSnapshot = localStorage.getItem("taskStore");
  if (initialSnapshot) {
    updateTaskStoreWithSnapshot(JSON.parse(initialSnapshot));
  }
}
onSnapshot(taskStore, (snapshot) => {
  localStorage.setItem("taskStore", JSON.stringify(snapshot));
});

export const StoreProvider = ({ children }: any) => {
  const stores = {
    taskStore,
  };

  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
