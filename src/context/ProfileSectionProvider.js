import { createContext, useState } from "react";
import InformationSection from "../pages/Profile/Sections/InformationSection";
const ProfileSectionContext = createContext()
export default ProfileSectionContext
export const ProfileSectionProvider = ({ children }) => {
    const [section, setSection] = useState(InformationSection)
    const sectionContext = {
        CustomSection : section,
        setSection: setSection
    }
    return (
       <ProfileSectionContext.Provider value={sectionContext}>
            {children}
       </ProfileSectionContext.Provider> 
    )
}