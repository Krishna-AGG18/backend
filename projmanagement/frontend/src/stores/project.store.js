import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useProjectStore = create(
  devtools(
    persist(
      (set) => ({
        // Default selected project id null rakhenge
        currentProjectId: null,
        
        // Is function ko call karke hum current project set karenge 
        // (Jaise jab user kisi project par click karega)
        setCurrentProjectId: (projectId) => set({ currentProjectId: projectId }),
        
        // Jab logout ho toh isko clear karne ke liye
        clearProjectState: () => set({ currentProjectId: null }),
      }),
      {
        name: 'project-storage', // Ye local storage me projectId save rakhega refresh ke baad bhi
      }
    )
  )
);
