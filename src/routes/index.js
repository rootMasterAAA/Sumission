import HomePageContent from "../pages/HomePageContent/HomePageContent"
import LoginPage from "../pages/Login/LoginPage"
import AuthLayout from "../pages/layout/AuthLayout"
import HomeLayout from "../pages/layout/HomeLayout"
import ProfileLayout from "../pages/layout/ProfileLayout"
import MarketPlacePage from "../pages/MarketPlace"
import MarketLayout from "../pages/layout/MarketLayout"
import ProfileContent from "../pages/Profile"
import TestingLayout from "../pages/testing/TestingLayout"
import TestingContent from "../pages/testing/TestingContent"
const routes = [
    {path: "", page: HomePageContent, layout: HomeLayout, type: "public"},
    {path: "/login", page: LoginPage, layout: AuthLayout, type: "public"},
    {path: "/market-place", page: MarketPlacePage, layout: MarketLayout, type: "public"},
    {path: "/profile", page: ProfileContent, layout: ProfileLayout, type: "protect"},
    // {path: "/testing", page: TestingContent, layout: TestingLayout, type: "public"}
]
export {routes}