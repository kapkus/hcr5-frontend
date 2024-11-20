import React, { createContext, useContext, useState } from "react";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
    const [isAxesVisible, setIsAxesVisible] = useState(true);

    const toggleAxesVisibility = () => {
        setIsAxesVisible((prev) => !prev);
    }

    return (
        <SceneContext.Provider value={{ isAxesVisible, toggleAxesVisibility }} >
            { children }
        </SceneContext.Provider>
    )
}

export const useSceneContext = () => useContext(SceneContext);