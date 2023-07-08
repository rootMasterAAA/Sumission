import { useContext } from "react";
import ProfileContent from "../ProfileContent";
import ProfileSectionContext from "../../../context/ProfileSectionProvider";
export default function Section(){
    const {CustomSection} = useContext(ProfileSectionContext)
    return (
        <>
        {CustomSection}
        </>
    )
} 