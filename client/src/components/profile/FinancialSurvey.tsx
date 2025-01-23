import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { useEffect, useRef, useState } from "react";
import { IFinancialSurvey } from "@/interfaces/profile.interfaces";
import { useNavigate } from "react-router";

const FinancialSurvey = () => {
  const [profileData, setProfileData] = useState<IFinancialSurvey>(defaultValues);
}